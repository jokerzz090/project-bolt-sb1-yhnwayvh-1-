import React, { useState } from 'react';
import { Subtitles, Languages, Download, Settings } from 'lucide-react';
import { CaptionSettings } from '../../types';
import CaptionAnimationControl from '../Captions/CaptionAnimationControl';
import { generateCaptions } from '../../utils/captionsGenerator';

export default function AutomaticCaptions() {
  const [file, setFile] = useState<File | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [settings, setSettings] = useState<CaptionSettings>({
    theme: 'modern',
    style: 'morph',
    duration: 0.5,
    intensity: 50,
    font: 'Inter',
    size: 24,
    color: '#FFFFFF',
    outline: {
      enabled: true,
      color: '#000000',
      width: 2,
      glow: true
    },
    emojiEnabled: true,
    highlightKeywords: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setCaptions(null);
    }
  };

  const handleGenerate = async () => {
    if (!file) return;

    try {
      setIsGenerating(true);
      const generatedCaptions = await generateCaptions(file, settings);
      setCaptions(generatedCaptions);
    } catch (error) {
      console.error('Error generating captions:', error);
      alert('Failed to generate captions. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!captions) return;

    const blob = new Blob([captions], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `captions.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Subtitles className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-semibold text-white">Automatic Captions</h2>
      </div>

      <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="video/*,audio/*"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center gap-2"
        >
          <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <Languages className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-sm text-gray-400">
            {file ? file.name : 'Drop your video or audio file here, or click to browse'}
          </span>
        </label>
      </div>

      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 px-4 py-2 mt-4 text-gray-400 hover:text-gray-200"
      >
        <Settings className="w-4 h-4" />
        {showAdvanced ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
      </button>

      {showAdvanced && (
        <div className="mt-4">
          <CaptionAnimationControl
            settings={{
              style: settings.style,
              duration: settings.duration,
              intensity: settings.intensity
            }}
            onChange={(animationSettings) => setSettings({ ...settings, ...animationSettings })}
          />
        </div>
      )}

      {captions && (
        <div className="mt-4">
          <h3 className="font-medium text-white mb-2">Preview:</h3>
          <pre className="bg-gray-800 p-4 rounded-lg overflow-auto max-h-40 text-sm text-gray-300">
            {captions}
          </pre>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          onClick={handleGenerate}
          disabled={!file || isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Languages className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Generate Captions'}
        </button>
        <button
          onClick={handleDownload}
          disabled={!captions}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-200 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          Download
        </button>
      </div>
    </div>
  );
}