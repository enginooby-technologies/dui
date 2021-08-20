import { Style } from '../base/Style.js';
import { WinXPConfig } from '../StyleConfig.js';
export class WinXPStyle extends Style {
  constructor() { super(WinXPConfig); }
  static get Instance() {
    var _a;
    (_a = WinXPStyle._instance) !== null && _a !== void 0 ? _a : (WinXPStyle._instance = new WinXPStyle());
    return WinXPStyle._instance;
  }
  setupCustomizeEvents() { }
  init() { }
  onDisable() { }
  onHighlightColorUpdated() { }
  onSchemeColorUpdated() { }
  onBaseColorUpdated() { }
}
WinXPStyle._instance = new WinXPStyle();
