// Voice Types
export interface EmotionSettings {
  baseEmotion: 'neutral' | 'happy' | 'sad' | 'excited' | 'serious';
  intensity: number;
  dynamism: number;
}

export interface QualitySettings {
  sampleRate: string;
  bitDepth: number;
  normalization: number;
}

export interface VoiceSettings extends EmotionSettings, QualitySettings {
  language: string;
  accent: string;
  pitch: number;
  speed: number;
}

// Caption Types
export interface AnimationSettings {
  style: string;
  duration: number;
  intensity: number;
}

export interface StyleSettings {
  font: string;
  size: number;
  color: string;
  outline: {
    enabled: boolean;
    color: string;
    width: number;
    glow: boolean;
  };
}

export interface CaptionSettings extends AnimationSettings, StyleSettings {
  fontSize: number;
  animation(time: number, animation: any): unknown;
  format(currentTime: number, text: string, format: any): unknown;
  theme: string;
  emojiEnabled: boolean;
  highlightKeywords: boolean;
}