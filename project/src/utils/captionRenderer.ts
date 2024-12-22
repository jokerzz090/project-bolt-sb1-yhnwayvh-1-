// Assuming that the types.ts file has the necessary definitions for CaptionSettings and AnimationStyle

export interface AnimationStyle {
  type: 'bounce' | 'fade' | 'zoom'; // Define the types of animations
  duration: number; // Duration for the animation effect
}

export interface CaptionSettings {
  fontSize: number;
  font: string;
  color: string;
  outline?: OutlineSettings;
  animation?: AnimationStyle; // Reference the AnimationStyle here
}

export interface OutlineSettings {
  enabled: boolean;
  color: string;
  width: number;
  glow?: boolean;
}

// Your CaptionRenderer class
export class CaptionRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor(width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d')!;
  }

  async renderFrame(text: string, time: number, settings: CaptionSettings): Promise<Blob> {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Apply font settings
    this.ctx.font = `${settings.fontSize}px ${settings.font}`;
    this.ctx.fillStyle = settings.color;
    
    // Apply outline if enabled
    if (settings.outline?.enabled) {
      this.ctx.strokeStyle = settings.outline.color;
      this.ctx.lineWidth = settings.outline.width;
      if (settings.outline.glow) {
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = settings.outline.color;
      }
    }

    // Apply animation
    const animationOffset = this.calculateAnimationOffset(time, settings.animation);
    
    // Draw text with effects
    const x = this.canvas.width / 2;
    const y = this.canvas.height / 2 + animationOffset;
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    if (settings.outline?.enabled) {
      this.ctx.strokeText(text, x, y);
    }
    this.ctx.fillText(text, x, y);

    // Reset shadow settings
    this.ctx.shadowBlur = 0;
    this.ctx.shadowColor = 'transparent';

    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        resolve(blob!);
      });
    });
  }

  private calculateAnimationOffset(time: number, animation?: AnimationStyle): number {
    if (!animation) return 0;

    switch (animation.type) {
      case 'bounce':
        return Math.sin(time * 2 * Math.PI / animation.duration) * 10;
      case 'fade':
        return 0; // No offset for fade
      case 'zoom':
        return (1 - Math.cos(time * 2 * Math.PI / animation.duration)) * 5;
      default:
        return 0;
    }
  }
}
