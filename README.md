# Belajar Alfabet Indonesia 🍎

A fun, fast, and visually engaging web application designed to help children (specifically ~2 years old) learn the Indonesian alphabet. It features bright colors, large emojis, and native browser text-to-speech audio to create an interactive learning experience.

## Features ✨
- **Full Alphabet A-Z**: Displays the uppercase letter, lowercase letter, a representative word, and a large emoji.
- **Voice-over**: Says the Indonesian letter name, then the word. Recorded clips in `assets/audio/` are used when present (see `assets/audio/README.md`); everything else is spoken by the device's Indonesian voice (Web Speech API).
- **Interactive Navigation**: 
  - Swipe left/right on touch devices (Mobile & Tablet)
  - Left/Right arrow keys on computers
  - Large, kid-friendly tapping buttons
- **Celebration Mode 🎉**: Shows confetti and gives a congratulatory audio message when the child reaches the letter 'Z'.
- **Fully Offline**: Built with 100% pure HTML, CSS, and Vanilla JavaScript. Once loaded from a web server (http/https), a service worker (`sw.js`) caches the app so it works entirely offline afterwards.

## How to Play 🎮
Because the application uses zero external frameworks, dependencies, or servers, running it is incredibly simple:

1. Double-click the `index.html` file to open it in your web browser (Chrome, Safari, Firefox, or Edge).
2. Tap **Mulai** to start. Browsers (iOS Safari especially) only allow sound after a tap, so the start button is what turns the voice on.
3. *iPhone/iPad*: the device voice needs the Indonesian voice (Damayanti), found under Settings > Accessibility > Spoken Content > Voices > Indonesian. Recorded clips don't need it.

## Code Structure 📂
The project has been refactored into clean, maintainable modules:
- `index.html`: The core HTML structure of the app.
- `css/styles.css`: All visual styling, responsive design, and CSS animations.
- `js/data.js`: The dictionary containing the A-Z data (letters, words, emojis) and the background colors. Edit this file to change words or emojis!
- `js/voice.js`: The voice-over: plays recorded clips, falling back to the device's Indonesian voice.
- `js/app.js`: The central logic, built as a modern JavaScript class (`AlphabetApp`), handling navigation, audio synthesis, and the celebration overlay.
- `sw.js`: The service worker that caches the app for offline use. Bump `CACHE_VERSION` after changing any app file so visitors get the update.
