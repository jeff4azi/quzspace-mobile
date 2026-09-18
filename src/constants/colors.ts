export const palette = {
  brand: '#242021',
  light: '#f1f1f1',
  muted: '#aeabac',
  gray: '#5d5a5b',
  darker: '#161314',
} as const;

export type PaletteColor = keyof typeof palette;

export default palette;
