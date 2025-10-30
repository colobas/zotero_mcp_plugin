import { config } from "../package.json";
import hooks from "./hooks";
import { createZToolkit } from "./utils/ztoolkit";

type LocalizationMessageAttribute = {
  name: string;
  value: string;
};

type LocalizationMessage = {
  value?: string;
  attributes?: LocalizationMessageAttribute[];
};

type LocalizationWrapper = {
  formatMessagesSync(
    messages: Array<{ id: string; args?: Record<string, unknown> }>,
  ): LocalizationMessage[];
};

export type LocaleData = {
  current: LocalizationWrapper;
};

class Addon {
  public data: {
    alive: boolean;
    config: typeof config;
    // Env type, see build.js
    env: "development" | "production";
    initialized: boolean;
    ztoolkit: ZToolkit;
    locale?: LocaleData;
  };
  // Lifecycle hooks
  public hooks: typeof hooks;
  // APIs
  public api: object;

  constructor() {
    this.data = {
      alive: true,
      config,
      env: __env__,
      initialized: false,
      ztoolkit: createZToolkit(),
    };
    this.hooks = hooks;
    this.api = {};
  }
}

export default Addon;
