/**
 * Features Module Exports
 */

export {
  createMagicKeywordProcessor,
  detectMagicKeywords,
  builtInMagicKeywords
} from './magic-keywords.js';

export {
  createContinuationHook,
  continuationSystemPromptAddition,
  detectCompletionSignals,
  generateVerificationPrompt
} from './continuation-enforcement.js';

export {
  // Types
  type VersionMetadata,
  type ReleaseInfo,
  type UpdateCheckResult,
  type UpdateResult,
  type SilentUpdateConfig,
  // Constants
  REPO_OWNER,
  REPO_NAME,
  GITHUB_API_URL,
  GITHUB_RAW_URL,
  CLAUDE_CONFIG_DIR,
  VERSION_FILE,
  // Functions
  getInstalledVersion,
  saveVersionMetadata,
  updateLastCheckTime,
  fetchLatestRelease,
  compareVersions,
  checkForUpdates,
  performUpdate,
  formatUpdateNotification,
  shouldCheckForUpdates,
  backgroundUpdateCheck,
  interactiveUpdate,
  // Silent auto-update
  silentAutoUpdate,
  hasPendingUpdateRestart,
  clearPendingUpdateRestart,
  getPendingUpdateVersion,
  initSilentAutoUpdate
} from './auto-update.js';
