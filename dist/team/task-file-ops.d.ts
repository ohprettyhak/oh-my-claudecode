import type { TaskFile, TaskFileUpdate, TaskFailureSidecar } from './types.js';
/** Read a single task file. Returns null if not found or malformed. */
export declare function readTask(teamName: string, taskId: string): TaskFile | null;
/**
 * Atomic update: reads full task JSON, patches specified fields, writes back.
 * Preserves unknown fields to avoid data loss.
 */
export declare function updateTask(teamName: string, taskId: string, updates: TaskFileUpdate): void;
/**
 * Find next executable task for this worker.
 * Returns first task where:
 *   - owner === workerName
 *   - status === 'pending'
 *   - all blockedBy tasks have status 'completed'
 * Sorted by ID ascending.
 *
 * Ownership guard: re-reads task after finding candidate to ensure
 * owner hasn't changed between scan and claim.
 */
export declare function findNextTask(teamName: string, workerName: string): TaskFile | null;
/** Check if all blocker task IDs have status 'completed' */
export declare function areBlockersResolved(teamName: string, blockedBy: string[]): boolean;
/**
 * Write failure sidecar for a task.
 * If sidecar already exists, increments retryCount.
 */
export declare function writeTaskFailure(teamName: string, taskId: string, error: string): void;
/** Read failure sidecar if it exists */
export declare function readTaskFailure(teamName: string, taskId: string): TaskFailureSidecar | null;
/** List all task IDs in a team directory, sorted ascending */
export declare function listTaskIds(teamName: string): string[];
//# sourceMappingURL=task-file-ops.d.ts.map