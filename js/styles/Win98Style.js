import { Style } from '../base/Style.js';
import { Win98Config } from '../StyleConfig.js';
export class Win98Style extends Style {
  constructor() { super(Win98Config); }
  static get Instance() {
    var _a;
    (_a = Win98Style._instance) !== null && _a !== void 0 ? _a : (Win98Style._instance = new Win98Style());
    return Win98Style._instance;
  }
  setupCustomizeEvents() { }
  init() { }
}
Win98Style._instance = new Win98Style();
