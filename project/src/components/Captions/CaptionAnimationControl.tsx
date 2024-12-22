import React from 'react';
import { Play, Zap } from 'lucide-react';
import { AnimationSettings } from '../../types';

interface Props {
  settings: AnimationSettings;
  onChange: (settings: AnimationSettings) => void;
}

export default function CaptionAnimationControl({ settings, onChange }: Props) {
  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-gray-800">
      <div className="flex items-center gap-2">
        <Zap className="w-5 h-5 text-yellow-500" />
        <h3 className="font-medium text-white">Animation Effects</h3>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-400">Style</label>
          <select
            value={settings.style}
            onChange={(e) => onChange({ ...settings, style: e.target.value })}
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="morph">3D Morph</option>
            <option value="particles">Particle Effect</option>
            <option value="kinetic">Kinetic Type</option>
            <option value="wave">Wave Motion</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-400">Duration</label>
          <div className="flex-1 flex items-center gap-2">
            <Play className="w-4 h-4 text-green-500" />
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={settings.duration}
              onChange={(e) => onChange({ ...settings, duration: parseFloat(e.target.value) })}
              className="flex-1"
            />
            <span className="w-16 text-right text-sm text-gray-400">{settings.duration}s</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-400">Intensity</label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.intensity}
            onChange={(e) => onChange({ ...settings, intensity: parseInt(e.target.value) })}
            className="flex-1"
          />
          <span className="w-12 text-right text-sm text-gray-400">{settings.intensity}%</span>
        </div>
      </div>
    </div>
  );
}