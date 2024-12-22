export const voicePresets = {
  storytelling: {
    pitch: 1.05,
    speed: 0.95,
    emotion: 'neutral',
    tone: 0.85,
    intonation: 1.1,
    breathIntensity: 0.7
  },
  corporate: {
    pitch: 1,
    speed: 1.05,
    emotion: 'serious',
    tone: 0.95,
    intonation: 0.9,
    breathIntensity: 0.4
  },
  motivational: {
    pitch: 1.1,
    speed: 1.1,
    emotion: 'energetic',
    tone: 1.1,
    intonation: 1.3,
    breathIntensity: 0.75
  }
} as const;

export const fonts = [
  { name: 'TikTok', value: 'sf-pro-display' },
  { name: 'YouTube', value: 'roboto' },
  { name: 'Cinematic', value: 'montserrat' },
  { name: 'Playful', value: 'comic-sans-ms' }
] as const;

export const captionThemes = {
  tiktok: {
    font: 'sf-pro-display',
    animation: { type: 'bounce', duration: 0.3, delay: 0.1 },
    outline: { enabled: true, color: '#000000', width: 2, glow: true }
  },
  youtube: {
    font: 'roboto',
    animation: { type: 'fade', duration: 0.2, delay: 0 },
    outline: { enabled: true, color: '#000000', width: 1, glow: false }
  },
  cinematic: {
    font: 'montserrat',
    animation: { type: 'zoom', duration: 0.5, delay: 0.2 },
    outline: { enabled: true, color: '#000000', width: 2, glow: true }
  }
} as const;