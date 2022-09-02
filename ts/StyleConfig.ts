// centralized config for all styles

export interface StyleConfig {
  name: string, // must be same as CSS selector
  defaultOuterBackground?: string, // default: 'none-bg'
  defaultInnerBackground?: string,  // default: 'none-bg'
  defaultFont?: string,
  defaultCursor?: string,
  defaultBorderRadius?: number,
}

export const FlatConfig: StyleConfig = {
  name: 'flat-style',
  defaultFont: 'Agency FB'
}

export const NeuConfig: StyleConfig = {
  name: 'neu-style',
  defaultFont: 'Agency FB'
}

export const NesConfig: StyleConfig = {
  name: 'nes-style',
  defaultOuterBackground: 'wintery-sunburst-bg',
  defaultFont: 'Press Start 2P'
}

export const Win98Config: StyleConfig = {
  name: 'win98-style',
  defaultOuterBackground: 'windows98-bg',
  defaultBorderRadius: 0,
  defaultFont: 'Agency FB'
}

export const WinXPConfig: StyleConfig = {
  name: 'winxp-style',
  defaultOuterBackground: 'windowsxp-bg',
  defaultFont: 'Agency FB'
}

export const GlassConfig: StyleConfig = {
  name: 'glass-style',
  defaultOuterBackground: 'animated-gradient-bg',
  defaultFont: 'Agency FB'
}