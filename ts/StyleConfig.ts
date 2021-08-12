// centralized config for all styles

export interface StyleConfig {
        name: string, // must be same as CSS selector
        outerBackground?: string, // default: 'none-bg'
        innerBackground?: string,  // default: 'none-bg'
        font?: string,
        cursor?: string
}

export const FlatConfig: StyleConfig = {
        name: 'flat-style'
}
export const NeuConfig: StyleConfig = {
        name: 'neu-style'
}
export const NesConfig: StyleConfig = {
        name: 'nes-style',
        outerBackground: 'wintery-sunburst-bg',
        font: 'Press Start 2P'
}
export const Win98Config: StyleConfig = {
        name: 'win98-style',
        outerBackground: 'windows98-bg'
}
export const WinXPConfig: StyleConfig = {
        name: 'winxp-style',
        outerBackground: 'windowsxp-bg'
}
export const GlassConfig: StyleConfig = {
        name: 'glass-style',
        outerBackground: 'animated-gradient-bg'
}

