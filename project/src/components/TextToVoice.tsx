import React, { useState } from 'react';
import { Volume2, Download, Settings, Play } from 'lucide-react';
import { VoiceSettings } from '../types';
import { synthesizeSpeech } from '../utils/textToSpeech';

export default function TextToVoice() {
  const [text, setText] = useState('');
  const [settings, setSettings] = useState<VoiceSettings>({
    pitch: 1,
    speed: 1,
    language: 'en-US'
  });
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    try {
      setIsConverting(true);
      const audioBlob = await synthesizeSpeech(text, settings);
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Error converting text to speech:', error);
      alert('Failed to convert text to speech. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'speech.wav';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Text to Voice</h2>
      </div>
      
      <textarea
        className="w-full h-32 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-4">
          <label className="w-20">Pitch</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.pitch}
            onChange={(e) => setSettings({ ...settings, pitch: parseFloat(e.target.value) })}
            className="flex-1"
          />
          <span className="w-12 text-right">{settings.pitch}x</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20">Speed</label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={settings.speed}
            onChange={(e) => setSettings({ ...settings, speed: parseFloat(e.target.value) })}
            className="flex-1"
          />
          <span className="w-12 text-right">{settings.speed}x</span>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-20">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="flex-1 p-2 border rounded"
          >
            <option value="en-US">English (US)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </select>
        </div>
      </div>

      {audioUrl && (
        <div className="mt-4">
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleConvert}
          disabled={!text || isConverting}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play className="w-4 h-4" />
          {isConverting ? 'Converting...' : 'Convert'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!audioUrl}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Settings className="w-4 h-4" />
          Advanced
        </button>
      </div>
    </div>
  );
}