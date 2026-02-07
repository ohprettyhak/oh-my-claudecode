---
name: team
description: Manage MCP team workers (Codex/Gemini bridge daemons)
---

# Team Skill - MCP Worker Management

Manage persistent MCP workers (Codex/Gemini CLI bridge daemons) that run as tmux sessions and participate in Claude Code teams.

## Architecture

```
Team Lead (Claude Code)
  ├─ Claude Agents (Task tool - normal teammates)
  └─ MCP Workers (bridge daemons in tmux)
       ├─ Codex Worker (codex CLI in --full-auto mode)
       └─ Gemini Worker (gemini CLI in --yolo mode)
```

### Bridge Daemon Lifecycle

1. **Spawn**: Lead creates tmux session, writes config file, starts bridge-entry.js
2. **Register**: Bridge registers itself in team config.json (or shadow registry)
3. **Poll Loop**: Bridge polls task files for assigned work
4. **Execute**: When assigned task found, builds prompt, spawns CLI, captures output
5. **Report**: Writes task completion/failure to outbox JSONL
6. **Heartbeat**: Writes heartbeat file every poll cycle
7. **Shutdown**: On signal, cleans up and exits

### File Layout

| Path | Purpose |
|------|---------|
| `~/.claude/teams/{team}/config.json` | Team member registry |
| `~/.claude/tasks/{team}/{id}.json` | Task files |
| `~/.claude/teams/{team}/inbox/{worker}.jsonl` | Lead → worker messages |
| `~/.claude/teams/{team}/outbox/{worker}.jsonl` | Worker → lead messages |
| `~/.claude/teams/{team}/signals/{worker}.shutdown` | Shutdown signals |
| `.omc/state/team-bridge/{team}/{worker}.heartbeat.json` | Worker heartbeats |
| `.omc/state/team-mcp-workers.json` | Shadow member registry |

## Usage

### Spawning an MCP Worker

The team lead (orchestrator) spawns workers by:
1. Writing a BridgeConfig JSON to a temp file
2. Creating a tmux session
3. Running `node bridge/team-bridge.cjs --config /path/to/config.json` in the session
4. Registering the worker in the team

### Monitoring Workers

- Check heartbeat files at `.omc/state/team-bridge/{team}/`
- Read outbox JSONL for task completion reports
- Use `tmux list-sessions` to see active sessions

### Shutting Down Workers

Write a shutdown signal file, or use `/oh-my-claudecode:cancel` which handles cleanup.

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Worker not picking up tasks | Check task owner matches worker name |
| Worker quarantined | Check outbox for error details, fix issue, restart |
| Stale tmux session | `tmux kill-session -t omc-team-{team}-{worker}` |
| Shadow registry stale | Delete `.omc/state/team-mcp-workers.json` |
