# Belajar Alfabet Indonesia 🍎

A fun, fast, and visually engaging web application designed to help children (specifically ~2 years old) learn the Indonesian alphabet. It features bright colors, large emojis, and native browser text-to-speech audio to create an interactive learning experience.

## Features ✨
- **Full Alphabet A-Z**: Displays the uppercase letter, lowercase letter, a representative word, and a large emoji.
- **Native Audio**: Uses the Web Speech API (`SpeechSynthesis`) to pronounce the phonetic letter sound and the word in Indonesian. No audio files needed!
- **Interactive Navigation**: 
  - Swipe left/right on touch devices (Mobile & Tablet)
  - Left/Right arrow keys on computers
  - Large, kid-friendly tapping buttons
- **Celebration Mode 🎉**: Shows confetti and gives a congratulatory audio message when the child reaches the letter 'Z'.
- **Fully Offline**: Built with 100% pure HTML, CSS, and Vanilla JavaScript. Once loaded, it can be used entirely offline.

## How to Play 🎮
Because the application uses zero external frameworks, dependencies, or servers, running it is incredibly simple:

1. Double-click the `index.html` file to open it in your web browser (Chrome, Safari, Firefox, or Edge).
2. *Note on Audio*: Browsers prevent websites from playing audio automatically until the user interacts with the page. Tap anywhere on the screen, use the arrow buttons, or tap the "🔊 Dengar" (Listen) button to start the audio engine.

## Code Structure 📂
The project has been refactored into clean, maintainable modules:
- `index.html`: The core HTML structure of the app.
- `css/styles.css`: All visual styling, responsive design, and CSS animations.
- `js/data.js`: The dictionary containing the A-Z data (letters, words, emojis) and the background colors. Edit this file to change words or emojis!
- `js/app.js`: The central logic, built as a modern JavaScript class (`AlphabetApp`), handling navigation, audio synthesis, and the celebration overlay.
