import React from 'react';
import { Sliders, Wand2 } from 'lucide-react';
import { VoiceSettings } from '../types';
import { voicePresets } from '../utils/voicePresets';

interface Props {
  settings: VoiceSettings;
  onChange: (settings: VoiceSettings) => void;
}

export default function VoiceControls({ settings, onChange }: Props) {
  const handlePresetChange = (preset: string) => {
    onChange({ ...settings, ...voicePresets[preset as keyof typeof voicePresets] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Wand2 className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium">Voice Presets</h3>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {Object.keys(voicePresets).map(preset => (
          <button
            key={preset}
            onClick={() => handlePresetChange(preset)}
            className={`px-3 py-2 rounded-lg text-sm ${
              settings.preset === preset
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {preset.charAt(0).toUpperCase() + preset.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-6 mb-4">
        <Sliders className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium">Advanced Controls</h3>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Emotion</label>
          <select
            value={settings.emotion}
            onChange={(e) => onChange({ ...settings, emotion: e.target.value as any })}
            className="flex-1 p-2 border rounded text-sm"
          >
            <option value="neutral">Neutral</option>
            <option value="happy">Happy</option>
            <option value="serious">Serious</option>
            <option value="energetic">Energetic</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Tone</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.tone}
            onChange={(e) => onChange({ ...settings, tone: parseFloat(e.target.value) })}
            className="flex-1"
          />
          <span className="w-12 text-right text-sm">{settings.tone}x</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Breathing</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={settings.breathIntensity}
            onChange={(e) => onChange({ ...settings, breathIntensity: parseFloat(e.target.value) })}
            className="flex-1"
          />
          <span className="w-12 text-right text-sm">{settings.breathIntensity}x</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm">Quality</label>
          <select
            value={settings.quality}
            onChange={(e) => onChange({ ...settings, quality: e.target.value as any })}
            className="flex-1 p-2 border rounded text-sm"
          >
            <option value="32khz">32 kHz</option>
            <option value="44.1khz">44.1 kHz</option>
            <option value="48khz">48 kHz</option>
          </select>
        </div>
      </div>
    </div>
  );
}