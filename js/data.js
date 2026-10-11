// Alphabet Data Export
// `say` is the Indonesian letter name, spelled out so the device voice
// pronounces it correctly (Q = "ki", not the English "kyu").
// `words` are the picture words for the letter; each time the card is shown
// one is picked at random (never the same one twice in a row).
const alphabetData = [
    { letter: "A", say: "a", words: [
        { word: "Apel", emoji: "🍎" }, { word: "Anjing", emoji: "🐶" }, { word: "Ayam", emoji: "🐔" },
        { word: "Anggur", emoji: "🍇" }, { word: "Awan", emoji: "☁️" }] },
    { letter: "B", say: "be", words: [
        { word: "Bola", emoji: "⚽" }, { word: "Bebek", emoji: "🦆" }, { word: "Buku", emoji: "📚" },
        { word: "Bunga", emoji: "🌸" }, { word: "Bus", emoji: "🚌" }] },
    { letter: "C", say: "ce", words: [
        { word: "Cicak", emoji: "🦎" }, { word: "Cokelat", emoji: "🍫" }, { word: "Ceri", emoji: "🍒" },
        { word: "Celana", emoji: "👖" }, { word: "Cangkir", emoji: "☕" }] },
    { letter: "D", say: "de", words: [
        { word: "Domba", emoji: "🐑" }, { word: "Donat", emoji: "🍩" }, { word: "Dinosaurus", emoji: "🦕" },
        { word: "Daun", emoji: "🍃" }, { word: "Dompet", emoji: "👛" }] },
    { letter: "E", say: "e", words: [
        { word: "Ember", emoji: "🪣" }, { word: "Elang", emoji: "🦅" }, { word: "Es krim", emoji: "🍦" },
        { word: "Es batu", emoji: "🧊" }, { word: "Empat", emoji: "4️⃣" }] },
    { letter: "F", say: "ef", words: [
        { word: "Flamingo", emoji: "🦩" }, { word: "Foto", emoji: "📸" }, { word: "Feri", emoji: "⛴️" },
        { word: "Fajar", emoji: "🌅" }, { word: "Film", emoji: "🎬" }] },
    { letter: "G", say: "ge", words: [
        { word: "Gajah", emoji: "🐘" }, { word: "Gorila", emoji: "🦍" }, { word: "Gurita", emoji: "🐙" },
        { word: "Gigi", emoji: "🦷" }, { word: "Gelas", emoji: "🥛" }] },
    { letter: "H", say: "ha", words: [
        { word: "Harimau", emoji: "🐯" }, { word: "Helikopter", emoji: "🚁" }, { word: "Hujan", emoji: "🌧️" },
        { word: "Hati", emoji: "❤️" }, { word: "Hiu", emoji: "🦈" }] },
    { letter: "I", say: "i", words: [
        { word: "Ikan", emoji: "🐟" }, { word: "Ibu", emoji: "👩" }, { word: "Istana", emoji: "🏰" },
        { word: "Itik", emoji: "🐥" }, { word: "Iguana", emoji: "🦎" }] },
    { letter: "J", say: "je", words: [
        { word: "Jeruk", emoji: "🍊" }, { word: "Jagung", emoji: "🌽" }, { word: "Jerapah", emoji: "🦒" },
        { word: "Jam", emoji: "⏰" }, { word: "Jamur", emoji: "🍄" }] },
    { letter: "K", say: "ka", words: [
        { word: "Kucing", emoji: "🐱" }, { word: "Kelinci", emoji: "🐰" }, { word: "Kupu-kupu", emoji: "🦋" },
        { word: "Kereta", emoji: "🚂" }, { word: "Kuda", emoji: "🐴" }] },
    { letter: "L", say: "el", words: [
        { word: "Lebah", emoji: "🐝" }, { word: "Lampu", emoji: "💡" }, { word: "Lemon", emoji: "🍋" },
        { word: "Lumba-lumba", emoji: "🐬" }, { word: "Labu", emoji: "🎃" }] },
    { letter: "M", say: "em", words: [
        { word: "Mangga", emoji: "🥭" }, { word: "Mobil", emoji: "🚗" }, { word: "Monyet", emoji: "🐵" },
        { word: "Matahari", emoji: "☀️" }, { word: "Mata", emoji: "👀" }] },
    { letter: "N", say: "en", words: [
        { word: "Nanas", emoji: "🍍" }, { word: "Nasi", emoji: "🍚" }, { word: "Nenek", emoji: "👵" },
        { word: "Naga", emoji: "🐉" }, { word: "Nyamuk", emoji: "🦟" }] },
    { letter: "O", say: "o", words: [
        { word: "Orang utan", emoji: "🦧" }, { word: "Ombak", emoji: "🌊" }, { word: "Opa", emoji: "👴" },
        { word: "Oma", emoji: "👵" }, { word: "Oranye", emoji: "🟠" }] },
    { letter: "P", say: "pe", words: [
        { word: "Pisang", emoji: "🍌" }, { word: "Pesawat", emoji: "✈️" }, { word: "Payung", emoji: "☂️" },
        { word: "Pinguin", emoji: "🐧" }, { word: "Pizza", emoji: "🍕" }] },
    { letter: "Q", say: "ki", words: [
        { word: "Quran", emoji: "📖" }, { word: "Qurban", emoji: "🐐" }, { word: "Qatar", emoji: "🇶🇦" }] },
    { letter: "R", say: "er", words: [
        { word: "Roti", emoji: "🍞" }, { word: "Rumah", emoji: "🏠" }, { word: "Roket", emoji: "🚀" },
        { word: "Rusa", emoji: "🦌" }, { word: "Robot", emoji: "🤖" }] },
    { letter: "S", say: "es", words: [
        { word: "Sapi", emoji: "🐄" }, { word: "Sepeda", emoji: "🚲" }, { word: "Semangka", emoji: "🍉" },
        { word: "Singa", emoji: "🦁" }, { word: "Sepatu", emoji: "👟" }] },
    { letter: "T", say: "te", words: [
        { word: "Topi", emoji: "🧢" }, { word: "Tomat", emoji: "🍅" }, { word: "Telur", emoji: "🥚" },
        { word: "Tikus", emoji: "🐭" }, { word: "Truk", emoji: "🚚" }] },
    { letter: "U", say: "u", words: [
        { word: "Ular", emoji: "🐍" }, { word: "Udang", emoji: "🦐" }, { word: "Unta", emoji: "🐪" },
        { word: "Ubur-ubur", emoji: "🪼" }, { word: "Ulat", emoji: "🐛" }] },
    { letter: "V", say: "fe", words: [
        { word: "Vespa", emoji: "🛵" }, { word: "Violin", emoji: "🎻" }, { word: "Voli", emoji: "🏐" },
        { word: "Van", emoji: "🚐" }, { word: "Vas", emoji: "🏺" }] },
    { letter: "W", say: "we", words: [
        { word: "Wortel", emoji: "🥕" }, { word: "Wafel", emoji: "🧇" }, { word: "Wajan", emoji: "🍳" },
        { word: "Wajah", emoji: "😊" }, { word: "Warna", emoji: "🌈" }] },
    { letter: "X", say: "eks", words: [
        { word: "Xilofon", emoji: "🎵" }] },
    { letter: "Y", say: "ye", words: [
        { word: "Yoyo", emoji: "🪀" }, { word: "Yuyu", emoji: "🦀" }, { word: "Yoghurt", emoji: "🥛" }] },
    { letter: "Z", say: "zet", words: [
        { word: "Zebra", emoji: "🦓" }, { word: "Zaitun", emoji: "🫒" }, { word: "Zamrud", emoji: "💎" }] }
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
// Names: "letter-a.m4a" (the letter), "word-a-1.m4a" (the first word in the
// letter's list, "word-a-2.m4a" the second, ...), "hebat.m4a" (the celebration).
// Any format Safari plays works (.m4a, .mp3, .wav).
const recordedClips = [
];
