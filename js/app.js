class AlphabetApp {
    /**
     * @param {Array} data - The alphabet data containing letters, words, and emojis
     * @param {Array} colors - An array of hex colors for the background themes
     */
    constructor(data, colors) {
        this.data = data;
        this.colors = colors;
        this.currentIndex = 0;
        this.wordIndex = 0; // Which of the current letter's words is showing
        this.lastWordIndex = {}; // Last word shown per letter, to avoid repeats
        this.voice = new Voice(recordedClips);
        this.started = false; // Sound stays off until the first tap (iOS rule)
        
        // DOM Elements
        this.elements = {
            letterDisplay: document.getElementById('letter-display'),
            emojiDisplay: document.getElementById('emoji-display'),
            wordDisplay: document.getElementById('word-display'),
            cardContainer: document.getElementById('card-container'),
            prevBtn: document.getElementById('prev-btn'),
            nextBtn: document.getElementById('next-btn'),
            replayBtn: document.getElementById('replay-btn'),
            progressContainer: document.getElementById('progress-container'),
            celebrationScreen: document.getElementById('celebration-screen'),
            restartBtn: document.getElementById('restart-btn'),
            startScreen: document.getElementById('start-screen'),
            startBtn: document.getElementById('start-btn'),
            mainArea: document.getElementById('main-area')
        };
        
        this.init();
    }

    /**
     * Core initialization routine
     */
    init() {
        this.createProgressDots();
        this.setupEventListeners();
        this.updateCard();
    }

    /**
     * Dynamically creates progress dots based on the data length
     */
    createProgressDots() {
        this.data.forEach((item, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.title = item.letter; // Show letter on hover
            
            // Allow parents to click dots to jump to specific letters
            dot.addEventListener('click', () => {
                this.currentIndex = index;
                this.updateCard();
            });
            
            this.elements.progressContainer.appendChild(dot);
        });
    }

    /**
     * Wires up all UI event handlers (clicks, swipes, keyboard)
     */
    setupEventListeners() {
        this.elements.startBtn.addEventListener('click', () => this.start());
        this.elements.prevBtn.addEventListener('click', () => this.navigate(-1));
        this.elements.nextBtn.addEventListener('click', () => this.navigate(1));
        this.elements.replayBtn.addEventListener('click', () => this.playAudio());
        this.elements.restartBtn.addEventListener('click', () => this.restartApp());
        
        // Keyboard navigation (desktop use)
        document.addEventListener('keydown', (e) => {
            if (!this.started) {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    this.start();
                }
                return;
            }
            if (e.key === 'ArrowLeft') this.navigate(-1);
            else if (e.key === 'ArrowRight') this.navigate(1);
            else if (e.key === ' ' || e.key === 'Enter') this.playAudio();
        });

        // Swipe support (mobile/tablet use)
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.elements.mainArea.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.elements.mainArea.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        }, { passive: true });
    }

    /**
     * Hides the start screen and turns sound on. Runs from a tap, which is
     * what iOS needs before it allows audio.
     */
    start() {
        if (this.started) return;
        this.started = true;
        this.voice.unlock();
        this.elements.startScreen.classList.add('hidden');
        this.playAudio();
    }

    /**
     * Logic to determine swipe direction
     */
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        if (endX < startX - swipeThreshold) this.navigate(1); // Swipe left = next card
        if (endX > startX + swipeThreshold) this.navigate(-1); // Swipe right = previous card
    }

    /**
     * Changes the current index and triggers updates
     * @param {number} dir - Direction (-1 for prev, +1 for next)
     */
    navigate(dir) {
        const newIndex = this.currentIndex + dir;
        
        // Show celebration screen if passed 'Z'
        if (newIndex >= this.data.length) {
            this.showCelebration();
            return;
        }
        
        // Prevent going before 'A'
        if (newIndex < 0) return;
        
        this.currentIndex = newIndex;
        this.updateCard();
    }

    /**
     * Picks one of the letter's words at random, never the one shown last time
     */
    pickWord(index) {
        const count = this.data[index].words.length;
        const last = this.lastWordIndex[index];
        let pick = Math.floor(Math.random() * count);
        if (count > 1 && pick === last) {
            pick = (pick + 1 + Math.floor(Math.random() * (count - 1))) % count;
        }
        this.lastWordIndex[index] = pick;
        return pick;
    }

    /**
     * Renders the current state (letter, emoji, word, background) into the DOM
     */
    updateCard() {
        const currentData = this.data[this.currentIndex];
        this.wordIndex = this.pickWord(this.currentIndex);
        const currentWord = currentData.words[this.wordIndex];
        const el = this.elements;
        
        // Re-trigger CSS animation for the card container
        el.cardContainer.style.animation = 'none';
        el.cardContainer.offsetHeight; // Force reflow
        el.cardContainer.style.animation = 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        
        // Update textual contents
        el.letterDisplay.innerHTML = `
            <span class="uppercase">${currentData.letter}</span>
            <span class="lowercase">${currentData.letter.toLowerCase()}</span>
        `;
        el.emojiDisplay.textContent = currentWord.emoji;
        el.wordDisplay.textContent = currentWord.word;
        
        // Update button operational states
        el.prevBtn.disabled = (this.currentIndex === 0);
        el.nextBtn.disabled = (this.currentIndex === this.data.length - 1);
        
        // Update body background color by cycling through the theme array
        document.body.style.backgroundColor = this.colors[this.currentIndex % this.colors.length];
        
        // Update progress dots visibility
        const dots = el.progressContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Play phonetic voice sound
        this.playAudio();
    }

    /**
     * Says the letter name, then the word
     */
    playAudio() {
        if (!this.started) return;
        const data = this.data[this.currentIndex];
        const key = data.letter.toLowerCase();
        const word = data.words[this.wordIndex];
        this.voice.say([
            { clip: `letter-${key}`, text: data.say },
            { clip: `word-${key}-${this.wordIndex + 1}`, text: word.word }
        ]);
    }

    /**
     * Triggers the celebration end overlay
     */
    showCelebration() {
        const el = this.elements;
        el.celebrationScreen.classList.add('active');
        
        // Form a confetti explosion
        const emojisContainer = ['🌟', '🎈', '🎉', '🎊', '✨', '👏'];
        for (let i = 0; i < 50; i++) {
            const conf = document.createElement('div');
            conf.classList.add('confetti');
            conf.textContent = emojisContainer[Math.floor(Math.random() * emojisContainer.length)];
            
            // Randomize trajectory sizes
            conf.style.left = Math.random() * 100 + 'vw';
            conf.style.animationDuration = (Math.random() * 2 + 2) + 's';
            conf.style.animationDelay = (Math.random() * 2) + 's';
            conf.style.fontSize = (Math.random() * 20 + 20) + 'px';
            
            el.celebrationScreen.appendChild(conf);
        }
        
        // Play congratulatory Indonesian message
        this.voice.say([{ clip: 'hebat', text: 'Hebat! Kamu sudah hafal semua huruf!' }]);
    }

    /**
     * Resets the entire application back to A
     */
    restartApp() {
        const el = this.elements;
        el.celebrationScreen.classList.remove('active');
        
        // Clean up DOM confetti to prevent memory bloat over restarts
        el.celebrationScreen.querySelectorAll('.confetti').forEach(conf => conf.remove());
        
        // Reset index
        this.currentIndex = 0;
        this.updateCard();
    }
}

// Belt and braces for the CSS rules: no long-press menu, text selection or dragging anywhere
['contextmenu', 'selectstart', 'dragstart'].forEach(type => {
    document.addEventListener(type, e => e.preventDefault());
});

// Instantiate App when the Document completely loads
document.addEventListener('DOMContentLoaded', () => {
    // Utilize the variables from data.js
    new AlphabetApp(alphabetData, themeColors);
});
