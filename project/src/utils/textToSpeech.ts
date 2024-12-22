import { VoiceSettings } from '../types';

export const synthesizeSpeech = async (text: string, settings: VoiceSettings): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = settings.pitch;
    utterance.rate = settings.speed;
    utterance.lang = settings.language;

    // Create MediaRecorder to capture the synthesized speech
    const audioContext = new AudioContext();
    const mediaStreamDestination = audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(mediaStreamDestination.stream);
    const audioChunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      resolve(audioBlob);
    };

    utterance.onend = () => {
      mediaRecorder.stop();
      audioContext.close();
    };

    utterance.onerror = (error) => {
      reject(error);
    };

    mediaRecorder.start();
    window.speechSynthesis.speak(utterance);
  });
};