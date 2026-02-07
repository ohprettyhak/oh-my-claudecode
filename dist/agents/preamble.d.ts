/**
 * Worker Preamble Protocol
 *
 * Provides standardized preamble for delegating work to worker agents.
 * This prevents agents from spawning sub-agents and ensures they execute tasks directly.
 */
export declare const WORKER_PREAMBLE = "CONTEXT: You are a WORKER agent, not an orchestrator.\n\nRULES:\n- Complete ONLY the task described below\n- Use tools directly (Read, Write, Edit, Bash, etc.)\n- Do NOT spawn sub-agents\n- Do NOT call TaskCreate or TaskUpdate\n- Report your results with absolute file paths\n\nTASK:\n";
/**
 * Wraps a task description with the worker preamble
 * @param taskDescription The task to be completed by the worker agent
 * @returns The task description wrapped with worker preamble
 */
export declare function wrapWithPreamble(taskDescription: string): string;
/**
 * Template for prompts sent to MCP workers (Codex/Gemini CLIs).
 *
 * Unlike WORKER_PREAMBLE (for Claude agents that call tools directly),
 * MCP workers are autonomous executors with filesystem access but no team tools.
 * The bridge handles all team protocol on their behalf.
 */
export declare const MCP_WORKER_PROMPT_TEMPLATE = "CONTEXT: You are an autonomous code executor working on a specific task.\nYou have FULL filesystem access within the working directory.\nYou can read files, write files, run shell commands, and make code changes.\n\nTASK:\n{task_subject}\n\nDESCRIPTION:\n{task_description}\n\nWORKING DIRECTORY: {working_directory}\n\n{inbox_context}\n\nINSTRUCTIONS:\n- Complete the task described above\n- Make all necessary code changes directly\n- Run relevant verification commands (build, test, lint) to confirm your changes work\n- Write a clear summary of what you did to the output file\n- If you encounter blocking issues, document them clearly in your output\n\nOUTPUT EXPECTATIONS:\n- Document all files you modified\n- Include verification results (build/test output)\n- Note any issues or follow-up work needed\n";
/**
 * Build a concrete prompt from the template for an MCP worker task.
 */
export declare function buildMcpWorkerPrompt(taskSubject: string, taskDescription: string, workingDirectory: string, inboxMessages?: Array<{
    content: string;
    timestamp: string;
}>): string;
//# sourceMappingURL=preamble.d.ts.map