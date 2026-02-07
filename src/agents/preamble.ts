/**
 * Worker Preamble Protocol
 *
 * Provides standardized preamble for delegating work to worker agents.
 * This prevents agents from spawning sub-agents and ensures they execute tasks directly.
 */

export const WORKER_PREAMBLE = `CONTEXT: You are a WORKER agent, not an orchestrator.

RULES:
- Complete ONLY the task described below
- Use tools directly (Read, Write, Edit, Bash, etc.)
- Do NOT spawn sub-agents
- Do NOT call TaskCreate or TaskUpdate
- Report your results with absolute file paths

TASK:
`;

/**
 * Wraps a task description with the worker preamble
 * @param taskDescription The task to be completed by the worker agent
 * @returns The task description wrapped with worker preamble
 */
export function wrapWithPreamble(taskDescription: string): string {
  return WORKER_PREAMBLE + taskDescription;
}

/**
 * Template for prompts sent to MCP workers (Codex/Gemini CLIs).
 *
 * Unlike WORKER_PREAMBLE (for Claude agents that call tools directly),
 * MCP workers are autonomous executors with filesystem access but no team tools.
 * The bridge handles all team protocol on their behalf.
 */
export const MCP_WORKER_PROMPT_TEMPLATE = `CONTEXT: You are an autonomous code executor working on a specific task.
You have FULL filesystem access within the working directory.
You can read files, write files, run shell commands, and make code changes.

TASK:
{task_subject}

DESCRIPTION:
{task_description}

WORKING DIRECTORY: {working_directory}

{inbox_context}

INSTRUCTIONS:
- Complete the task described above
- Make all necessary code changes directly
- Run relevant verification commands (build, test, lint) to confirm your changes work
- Write a clear summary of what you did to the output file
- If you encounter blocking issues, document them clearly in your output

OUTPUT EXPECTATIONS:
- Document all files you modified
- Include verification results (build/test output)
- Note any issues or follow-up work needed
`;

/**
 * Build a concrete prompt from the template for an MCP worker task.
 */
export function buildMcpWorkerPrompt(
  taskSubject: string,
  taskDescription: string,
  workingDirectory: string,
  inboxMessages?: Array<{ content: string; timestamp: string }>
): string {
  let inboxContext = '';
  if (inboxMessages && inboxMessages.length > 0) {
    inboxContext = 'CONTEXT FROM TEAM LEAD:\n' +
      inboxMessages.map(m => `[${m.timestamp}] ${m.content}`).join('\n') + '\n';
  }

  return MCP_WORKER_PROMPT_TEMPLATE
    .replace('{task_subject}', taskSubject)
    .replace('{task_description}', taskDescription)
    .replace('{working_directory}', workingDirectory)
    .replace('{inbox_context}', inboxContext);
}
