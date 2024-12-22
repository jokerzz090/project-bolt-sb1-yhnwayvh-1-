import { useState, useEffect } from 'react'; // Import React and hooks
import { Waves, Volume2, CheckCircle } from 'lucide-react'; // Icons from lucide-react
import { QualitySettings } from '../../types'; // Import type for settings

interface Props {
  settings: QualitySettings;
  onChange: (settings: QualitySettings) => void;
}

export default function VoiceQualityControl({ settings, onChange }: Props) {
  const [error, setError] = useState<string | null>(null); // Error state for messages
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [mute, setMute] = useState<boolean>(false); // Mute state

  // Update settings in localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('voiceSettings', JSON.stringify(settings));
  }, [settings]);

  // Save settings to localStorage and handle errors
  const handleSave = () => {
    setLoading(true); // Set loading to true
    try {
      localStorage.setItem('voiceSettings', JSON.stringify(settings));
      setLoading(false); // Set loading to false once saved
      alert('Settings saved successfully!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setLoading(false);
      setError('Error saving settings. Please try again.');
    }
  };

  // Toggle mute state
  const handleMuteToggle = () => {
    setMute(prev => !prev); // Toggle mute between true and false
  };

  // Reset settings to default values
  const handleClear = () => {
    if (window.confirm('Are you sure you want to reset all settings?')) {
      onChange({
        sampleRate: '44100',
        bitDepth: 16,
        normalization: 0,
      });
      setError(null); // Reset error state on clear
    }
  };

  return (
    <div className="space-y-4 bg-gray-900 p-4 rounded-lg border border-gray-800">
      <div className="flex items-center gap-2">
        <Waves className="w-5 h-5 text-cyan-500" />
        <h3 className="font-medium text-white">Audio Quality</h3>
        {mute && <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />} {/* Display mute icon */}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-400">Sample Rate</label>
          <select
            aria-label="Sample Rate"
            value={settings.sampleRate}
            onChange={(e) => onChange({ ...settings, sampleRate: e.target.value })}
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="44100">44.1 kHz</option>
            <option value="48000">48 kHz</option>
            <option value="96000">96 kHz</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-400">Bit Depth</label>
          <select
            aria-label="Bit Depth"
            value={settings.bitDepth}
            onChange={(e) => onChange({ ...settings, bitDepth: parseInt(e.target.value) })}
            className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded text-gray-200 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="16">16-bit</option>
            <option value="24">24-bit</option>
            <option value="32">32-bit float</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-24 text-sm text-gray-400">Normalization</label>
          <div className="flex-1 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-green-500" />
            <input
              type="range"
              min="-12"
              max="0"
              value={settings.normalization}
              onChange={(e) => onChange({ ...settings, normalization: parseInt(e.target.value) })}
              className="flex-1"
              title="Normalization"
            />
            <span className="w-16 text-right text-sm text-gray-400">{settings.normalization} dB</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Loading spinner */}
      {loading && (
        <div className="text-center mt-4">
          <span>Loading...</span>
        </div>
      )}

      <div className="flex gap-4 mt-6 items-center">
        {/* Clear button */}
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Reset
        </button>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save Settings
        </button>

        {/* Mute toggle */}
        <button
          onClick={handleMuteToggle}
          className={`px-4 py-2 rounded-lg ${mute ? 'bg-gray-600' : 'bg-gray-800'} text-white`}
        >
          {mute ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </div>
  );
}
