// Alphabet Data Export
// `say` is the Indonesian letter name, spelled out so the device voice
// pronounces it correctly (Q = "ki", not the English "kyu").
const alphabetData = [
    { letter: "A", say: "a", word: "Apel", emoji: "🍎" },
    { letter: "B", say: "be", word: "Bola", emoji: "⚽" },
    { letter: "C", say: "ce", word: "Cicak", emoji: "🦎" },
    { letter: "D", say: "de", word: "Domba", emoji: "🐑" },
    { letter: "E", say: "e", word: "Ember", emoji: "🪣" },
    { letter: "F", say: "ef", word: "Flamingo", emoji: "🦩" },
    { letter: "G", say: "ge", word: "Gajah", emoji: "🐘" },
    { letter: "H", say: "ha", word: "Harimau", emoji: "🐯" },
    { letter: "I", say: "i", word: "Ikan", emoji: "🐟" },
    { letter: "J", say: "je", word: "Jeruk", emoji: "🍊" },
    { letter: "K", say: "ka", word: "Kucing", emoji: "🐱" },
    { letter: "L", say: "el", word: "Lebah", emoji: "🐝" },
    { letter: "M", say: "em", word: "Mangga", emoji: "🥭" },
    { letter: "N", say: "en", word: "Nanas", emoji: "🍍" },
    { letter: "O", say: "o", word: "Orang utan", emoji: "🦧" },
    { letter: "P", say: "pe", word: "Pisang", emoji: "🍌" },
    { letter: "Q", say: "ki", word: "Quran", emoji: "📖" },
    { letter: "R", say: "er", word: "Roti", emoji: "🍞" },
    { letter: "S", say: "es", word: "Sapi", emoji: "🐄" },
    { letter: "T", say: "te", word: "Topi", emoji: "🧢" },
    { letter: "U", say: "u", word: "Ular", emoji: "🐍" },
    { letter: "V", say: "fe", word: "Vespa", emoji: "🛵" },
    { letter: "W", say: "we", word: "Wortel", emoji: "🥕" },
    { letter: "X", say: "eks", word: "Xilofon", emoji: "🎵" },
    { letter: "Y", say: "ye", word: "Yoyo", emoji: "🪀" },
    { letter: "Z", say: "zet", word: "Zebra", emoji: "🦓" }
];

// Vibrant Colors (Cycles through the rainbow)
const themeColors = [
    "#FF6B6B", // Red
    "#FF9F43", // Orange
    "#F1C40F", // Yellow
    "#2ECC71", // Green
    "#1ABC9C", // Teal
    "#3498DB", // Blue
    "#9B59B6", // Purple
    "#E84393"  // Pink
];

// Recorded voice clips in assets/audio/. Add a file there, then list its name
// here; anything not listed is spoken by the device voice instead.
// Names: "letter-a.m4a" (the letter), "word-a.m4a" (the word), "hebat.m4a"
// (the celebration). Any format Safari plays works (.m4a, .mp3, .wav).
const recordedClips = [
];
