// Define CaptionSettings interface with 'language' and 'format' properties
interface CaptionSettings {
  language: string;
  format: 'srt' | 'vtt'; // Define caption format (either 'srt' or 'vtt')
}

// Interface for handling webkitSpeechRecognition or SpeechRecognition
interface ExtendedWindow extends Window {
  webkitSpeechRecognition?: any;
  SpeechRecognition?: any;
}

declare const window: ExtendedWindow;

// The generateCaptions function that handles audio-to-text conversion and caption formatting
export const generateCaptions = async (file: File, settings: CaptionSettings): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Ensure SpeechRecognition or webkitSpeechRecognition is available
    const SpeechRecognitionClass = (window as any).webkitSpeechRecognition || window.SpeechRecognition;
    if (!SpeechRecognitionClass) {
      reject(new Error('Speech recognition is not supported in this browser.'));
      return;
    }

    const recognition = new SpeechRecognitionClass();
    recognition.interimResults = true; // Set to true to get intermediate results (live captions)
    recognition.lang = settings.language || 'en-US'; // Default to 'en-US' if not provided
    recognition.maxAlternatives = 1;  // Get the best transcription result

    let captions = '';  // Store the generated captions
    let startTime = 0;   // Track the start time of audio playback

    // Handle results from the speech recognition
    recognition.onresult = (event: { resultIndex: number; results: SpeechRecognitionResultList }) => {
      const currentTime = (Date.now() - startTime) / 1000; // Calculate time in seconds
      const text = event.results[event.resultIndex][0].transcript;  // Get the transcribed text
      captions += formatCaption(currentTime, text, settings.format);  // Format and add to captions
    };

    // Handle errors in speech recognition
    recognition.onerror = (error: any) => {
      reject(error);
    };

    // Handle when the recognition session ends
    recognition.onend = () => {
      resolve(captions); // Resolve with the generated captions
    };

    // Create audio element to play the file
    const audio = new Audio(URL.createObjectURL(file));
    
    // Once the audio is loaded, play it
    audio.onloadeddata = () => {
      audio.play();
    };

    // Start speech recognition when audio begins playing
    audio.onplay = () => {
      startTime = Date.now(); // Track when audio starts playing
      recognition.start();    // Start speech recognition
    };

    // Stop recognition when audio finishes
    audio.onended = () => {
      recognition.stop();    // Stop the recognition when the audio ends
    };
  });
};

// Function to format the caption with time and styled text
const formatCaption = (time: number, text: string, format: string): string => {
  // Helper function to format time into SRT/WebVTT format
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 1000);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
  };

  // Basic caption styling with font and background
  const styledText = `<span style="font-family: 'Roboto', sans-serif; font-size: 24px; color: #FFFFFF; background-color: #000000; padding: 2px 4px; border-radius: 4px; animation: fadeIn 0.5s;">${text}</span>`;

  // Return formatted captions in the specified format (SRT or WebVTT)
  if (format === 'srt') {
    return `1
${formatTime(time)} --> ${formatTime(time + 2)}
${styledText}

`;
  }

  return `WEBVTT

${formatTime(time).replace(',', '.')} --> ${formatTime(time + 2).replace(',', '.')}
${styledText}

`;
};
