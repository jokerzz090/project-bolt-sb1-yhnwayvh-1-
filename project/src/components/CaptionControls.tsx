import React from 'react';
import { Palette, Type } from 'lucide-react';
import { CaptionSettings } from '../types';
import { fonts, captionThemes } from '../utils/voicePresets';

interface Props {
  settings: CaptionSettings;
  onChange: (settings: CaptionSettings) => void;
}

export default function CaptionControls({ settings, onChange }: Props) {
  const handleThemeChange = (theme: string) => {
    onChange({ ...settings, ...captionThemes[theme as keyof typeof captionThemes] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="w-5 h-5 text-purple-600" />
        <h3 className="font-medium">Caption Themes</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Object.keys(captionThemes).map(theme => (
          <button
            key={theme}
            onClick={() => handleThemeChange(theme)}
            className={`px-3 py-2 rounded-lg text-sm ${
              settings.theme === theme
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {theme.charAt(0).toUpperCase() + theme.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-6 mb-4">
        <Type className="w-5 h-5 text-purple-600" />
        <h3 className="font-medium">Style Controls</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Font</label>
          <select
            value={settings.font}
            onChange={(e) => onChange({ ...settings, font: e.target.value })}
            className="flex-1 p-2 border rounded text-sm"
          >
            {fonts.map(font => (
              <option key={font.value} value={font.value}>
                {font.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Animation</label>
          <select
            value={settings.animation.type}
            onChange={(e) => onChange({
              ...settings,
              animation: { ...settings.animation, type: e.target.value as any }
            })}
            className="flex-1 p-2 border rounded text-sm"
          >
            <option value="none">None</option>
            <option value="bounce">Bounce</option>
            <option value="fade">Fade</option>
            <option value="wave">Wave</option>
            <option value="zoom">Zoom</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Outline</label>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.outline.enabled}
              onChange={(e) => onChange({
                ...settings,
                outline: { ...settings.outline, enabled: e.target.checked }
              })}
            />
            {settings.outline.enabled && (
              <>
                <input
                  type="color"
                  value={settings.outline.color}
                  onChange={(e) => onChange({
                    ...settings,
                    outline: { ...settings.outline, color: e.target.value }
                  })}
                  className="w-8 h-8"
                />
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={settings.outline.width}
                  onChange={(e) => onChange({
                    ...settings,
                    outline: { ...settings.outline, width: parseInt(e.target.value) }
                  })}
                  className="flex-1"
                />
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Emphasis</label>
          <div className="flex-1 flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.emphasis.enabled}
              onChange={(e) => onChange({
                ...settings,
                emphasis: { ...settings.emphasis, enabled: e.target.checked }
              })}
            />
            {settings.emphasis.enabled && (
              <>
                <input
                  type="color"
                  value={settings.emphasis.color}
                  onChange={(e) => onChange({
                    ...settings,
                    emphasis: { ...settings.emphasis, color: e.target.value }
                  })}
                  className="w-8 h-8"
                />
                <input
                  type="range"
                  min="1"
                  max="2"
                  step="0.1"
                  value={settings.emphasis.scale}
                  onChange={(e) => onChange({
                    ...settings,
                    emphasis: { ...settings.emphasis, scale: parseFloat(e.target.value) }
                  })}
                  className="flex-1"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}