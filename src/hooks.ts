import { initializeMcpRuntime, McpRuntime } from "./mcp/runtime";

let mcpRuntime: McpRuntime | null = null;

async function onStartup() {
  await Promise.all([
    Zotero.initializationPromise,
    Zotero.unlockPromise,
    Zotero.uiReadyPromise,
  ]);

  mcpRuntime = await initializeMcpRuntime();
  addon.data.initialized = true;
}

async function onMainWindowLoad(_win: _ZoteroTypes.MainWindow): Promise<void> {}

async function onMainWindowUnload(win: Window): Promise<void> {
  void win;
}

function onShutdown(): void {
  if (mcpRuntime) {
    void mcpRuntime.shutdown();
    mcpRuntime = null;
  }

  ztoolkit.unregisterAll();
  addon.data.initialized = false;
  // Remove addon object
  addon.data.alive = false;
  // @ts-expect-error - Plugin instance is not typed
  delete Zotero[addon.data.config.addonInstance];
}

export default {
  onStartup,
  onShutdown,
  onMainWindowLoad,
  onMainWindowUnload,
};
