import React from 'react';
import { Sparkles } from 'lucide-react';
import TextToVoice from './components/TextToVoice';
import AutomaticCaptions from './components/AutomaticCaptions';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Bolt AI Platform
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <TextToVoice />
          <AutomaticCaptions />
        </div>

        <div className="mt-12 bg-gray-900 rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-4 text-white">Features & Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-medium text-blue-400">Text-to-Voice</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Ultra-realistic neural voices</li>
                <li>• Emotional intelligence</li>
                <li>• 100+ languages & accents</li>
                <li>• Studio-grade audio (96kHz)</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-purple-400">Automatic Captions</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Dynamic 3D animations</li>
                <li>• Smart word highlighting</li>
                <li>• Custom themes & effects</li>
                <li>• AI-powered emoji sync</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-cyan-400">Performance</h3>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>• Ultra-low latency (≤50ms)</li>
                <li>• Edge computing</li>
                <li>• Real-time processing</li>
                <li>• Multi-platform export</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;