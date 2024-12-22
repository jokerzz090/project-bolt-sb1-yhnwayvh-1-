import { useState } from 'react'; // Adjusted to only import useState, since React 17+ no longer requires React import
import { Volume2, Download, Settings, Play } from 'lucide-react';
import { VoiceSettings } from '../../types';
import VoiceEmotionControl from './VoiceEmotionControl';
import VoiceQualityControl from './VoiceQualityControl';
import { synthesizeSpeech } from '../../utils/textToSpeech'; // Ensure this is the correct import

export default function TextToVoice() {
  const [text, setText] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState<VoiceSettings>({
    language: 'en-US',
    accent: 'neutral',
    pitch: 1,
    speed: 1,
    baseEmotion: 'neutral',
    intensity: 50,
    dynamism: 50,
    sampleRate: '48000',
    bitDepth: 24,
    normalization: -3
  });
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleConvert = async () => {
    try {
      setIsConverting(true);
      // Ensure synthesizeSpeech is being used to generate the audio blob
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
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Volume2 className="w-6 h-6 text-blue-500" />
        <h2 className="text-xl font-semibold text-white">Text to Voice</h2>
      </div>
      
      <textarea
        className="w-full h-32 p-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-20 text-gray-400">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
          </select>
        </div>

        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-gray-200"
        >
          <Settings className="w-4 h-4" />
          {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
        </button>

        {showAdvanced && (
          <div className="space-y-4">
            <VoiceEmotionControl
              settings={{
                baseEmotion: settings.baseEmotion,
                intensity: settings.intensity,
                dynamism: settings.dynamism
              }}
              onChange={(emotionSettings) => setSettings({ ...settings, ...emotionSettings })}
            />
            <VoiceQualityControl
              settings={{
                sampleRate: settings.sampleRate,
                bitDepth: settings.bitDepth,
                normalization: settings.normalization
              }}
              onChange={(qualitySettings) => setSettings({ ...settings, ...qualitySettings })}
            />
          </div>
        )}
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
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}
