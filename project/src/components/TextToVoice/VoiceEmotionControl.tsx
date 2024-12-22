import { useEffect, useState } from 'react';
import { Heart, Activity, RefreshCcw, Sun, Moon, Save, FileText } from 'lucide-react';
import { EmotionSettings } from '../../types';
import { motion } from 'framer-motion';

interface Props {
  settings: EmotionSettings;
  onChange: (settings: EmotionSettings) => void;
}

export default function VoiceEmotionControl({ settings, onChange }: Props) {
  const [loading, setLoading] = useState(false); // The loading state
  const [darkMode, setDarkMode] = useState(true);
  const [previewing, setPreviewing] = useState(false);
  const [profileName, setProfileName] = useState<string>('My Voice Profile');
  const [error, setError] = useState<string | null>(null);
  const [savedProfiles, setSavedProfiles] = useState<{ name: string; settings: EmotionSettings }[]>([]);

  useEffect(() => {
    const savedSettings = localStorage.getItem('voiceSettings');
    if (savedSettings) {
      onChange(JSON.parse(savedSettings));
    }

    const profiles = JSON.parse(localStorage.getItem('voiceProfiles') || '[]');
    setSavedProfiles(profiles);
  }, [onChange]);

  useEffect(() => {
    localStorage.setItem('voiceSettings', JSON.stringify(settings));
  }, [settings]);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to reset all settings?')) {
      onChange({
        baseEmotion: 'neutral',
        intensity: 50,
        dynamism: 50,
      });
      setError(null);
    }
  };

  const handleModeToggle = () => setDarkMode((prev) => !prev);

  const handleSaveProfile = () => {
    if (!profileName.trim()) {
      setError('Please provide a name for your profile.');
      return;
    }

    setLoading(true); // Set loading state to true before async operation

    try {
      const updatedProfiles = [...savedProfiles, { name: profileName, settings }];
      localStorage.setItem('voiceProfiles', JSON.stringify(updatedProfiles));
      setSavedProfiles(updatedProfiles);
      setError(null);
      alert('Profile saved successfully!');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError('Error saving profile. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after async operation
    }
  };

  const handleLoadProfile = (profileName: string) => {
    setLoading(true); // Set loading state to true before async operation
    try {
      const profile = savedProfiles.find((profile) => profile.name === profileName);
      if (profile) {
        onChange(profile.settings);
      } else {
        setError(`Profile named "${profileName}" not found.`);
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      setError('Error loading profile. Please try again.');
    } finally {
      setLoading(false); // Set loading state to false after async operation
    }
  };

  const handlePreview = () => {
    setPreviewing(true);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance('Previewing voice with current settings');
    utterance.voice = synth.getVoices().find((voice) => voice.lang === 'en-US') ?? null;
    utterance.pitch = settings.intensity / 100;
    utterance.rate = settings.dynamism / 100;

    utterance.onend = () => {
      setPreviewing(false);
      alert('Voice preview complete.');
    };

    synth.speak(utterance);
  };

  return (
    <div className={`space-y-4 p-6 rounded-lg border shadow-lg ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-pink-500" />
        <h3 className="font-medium">Emotional Intelligence</h3>
        <motion.button
          onClick={handleModeToggle}
          className="ml-auto p-2 rounded-full hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
        >
          {darkMode ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
        </motion.button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <label htmlFor="baseEmotion" className="w-24 text-sm">Base Emotion</label>
          <select
            id="baseEmotion"
            value={settings.baseEmotion}
            onChange={(e) => onChange({ ...settings, baseEmotion: e.target.value as EmotionSettings['baseEmotion'] })}
            className="flex-1 p-2 bg-gray-800 border rounded text-white text-sm"
          >
            <option value="neutral">Neutral</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="excited">Excited</option>
            <option value="serious">Serious</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="intensity" className="w-24 text-sm">Intensity</label>
          <input
            id="intensity"
            type="range"
            min="0"
            max="100"
            value={settings.intensity}
            onChange={(e) => onChange({ ...settings, intensity: parseInt(e.target.value) })}
            className="flex-1"
          />
          <span className="w-12 text-right">{settings.intensity}%</span>
        </div>

        <div className="flex items-center gap-4">
          <label htmlFor="dynamism" className="w-24 text-sm">Dynamism</label>
          <div className="flex-1 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <input
              id="dynamism"
              type="range"
              min="0"
              max="100"
              value={settings.dynamism}
              onChange={(e) => onChange({ ...settings, dynamism: parseInt(e.target.value) })}
              className="flex-1"
            />
            <span className="w-12 text-right">{settings.dynamism}%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 items-center">
        <motion.button
          onClick={handleClear}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          whileHover={{ scale: 1.1 }}
        >
          <RefreshCcw className="w-4 h-4 mr-2" />
          Reset
        </motion.button>

        <div className="flex items-center gap-4">
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg"
            placeholder="Profile Name"
          />
          <motion.button
            onClick={handleSaveProfile}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            whileHover={{ scale: 1.1 }}
          >
            <Save className="w-4 h-4 mr-2" />
            Save Profile
          </motion.button>
        </div>

        <motion.button
          onClick={() => handleLoadProfile(profileName)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
        >
          <FileText className="w-4 h-4 mr-2" />
          Load Profile
        </motion.button>

        <motion.button
          onClick={handlePreview}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
          whileHover={{ scale: 1.1 }}
          disabled={previewing}
        >
          {previewing ? 'Previewing...' : 'Preview Voice'}
        </motion.button>
      </div>

      {error && <div className="text-red-500 mt-4">{error}</div>}

      {/* Display loading state */}
      {loading && (
        <div className="text-center mt-4">
          <span>Loading...</span>
        </div>
      )}
    </div>
  );
}
