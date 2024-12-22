import React, { useState } from 'react';
import { Subtitles, Download } from 'lucide-react'; // Just the icons that are needed
import { ExtendedCaptionSettings } from './types'; // Correct path to types
import { generateCaptions } from '../utils/captionsGenerator'; // Adjust path as needed

export default function AutomaticCaptions() {
  const [file, setFile] = useState<File | null>(null);
  const [settings, setSettings] = useState<ExtendedCaptionSettings>({
    format: 'srt',
    language: 'en',
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Arial',
    keywords: [],
    backgroundColor: '#000000',
    opacity: 1.0,
    textAlign: 'center',
    textShadow: 'none',
    border: 'none',
    borderRadius: 0,
    padding: 0,
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
      setCaptions(null); // Reset captions when new file is uploaded
    }
  };

  const handleGenerate = async () => {
    if (!file) return;

    try {
      setIsGenerating(true);
      const generatedCaptions = await generateCaptions(file, settings); // Assuming the function is available
      setCaptions(generatedCaptions); // Set generated captions
    } catch (error) {
      console.error('Error generating captions:', error);
      alert('Failed to generate captions.');
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
    a.download = `captions.${settings.format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Subtitles className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold">Automatic Captions</h2>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <input
          type="file"
          accept="video/*,audio/*"
          onChange={handleFileChange}
          title="Upload a video or audio file"
        />
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-4">
          <label className="w-24">Format</label>
          <select
            value={settings.format}
            onChange={(e) => setSettings({ ...settings, format: e.target.value as 'srt' | 'vtt' })}
            className="flex-1 p-2 border rounded"
          >
            <option value="srt">SRT</option>
            <option value="vtt">VTT</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24">Language</label>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="flex-1 p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="zh">Chinese</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24">Font Size</label>
          <input
            type="number"
            value={settings.fontSize}
            onChange={(e) => setSettings({ ...settings, fontSize: parseInt(e.target.value) })}
            className="flex-1 p-2 border rounded"
            min="12"
            max="32"
          />
        </div>
      </div>

      {captions && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Preview:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-40 text-sm">
            {captions}
          </pre>
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!file || isGenerating}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Generate Captions'}
        </button>
        {captions && (
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        )}
      </div>
    </div>
  );
}
