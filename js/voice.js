/**
 * Voice-over: plays a recorded clip when one exists, otherwise falls back to
 * the device's Indonesian text-to-speech voice.
 *
 * iOS only allows sound after a tap, so call unlock() from a tap handler
 * before the first say().
 */
class Voice {
    /**
     * @param {Array<string>} clipFiles - File names in assets/audio/ (see recordedClips in data.js)
     */
    constructor(clipFiles) {
        // "letter-a.m4a" -> { "letter-a": "assets/audio/letter-a.m4a" }
        this.clipUrls = {};
        clipFiles.forEach((file) => {
            this.clipUrls[file.replace(/\.[^.]+$/, '')] = `assets/audio/${file}`;
        });
        this.buffers = {}; // Decoded clips, filled on first use
        this.audioContext = null;
        this.currentSource = null;
        this.playId = 0; // Bumped on every stop() so stale sequences bail out

        this.voice = null;
        this.speechSupported = 'speechSynthesis' in window;
        if (this.speechSupported) {
            this.pickVoice();
            // Voices load asynchronously in most browsers
            window.speechSynthesis.addEventListener('voiceschanged', () => this.pickVoice());
        }
    }

    /**
     * Uses an Indonesian voice explicitly; setting only `lang` can leave
     * Safari on the default English voice.
     */
    pickVoice() {
        const voices = window.speechSynthesis.getVoices();
        const indonesian = voices.filter((v) => /^id([-_]|$)/i.test(v.lang));
        this.voice = indonesian.find((v) => v.localService) || indonesian[0] || null;
    }

    /**
     * Must run inside a tap handler: iOS keeps audio blocked until then.
     */
    unlock() {
        // Play through the silent switch, like a video would (Safari 16.4+)
        if (navigator.audioSession) navigator.audioSession.type = 'playback';

        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (Ctx && !this.audioContext) this.audioContext = new Ctx();
        if (this.audioContext && this.audioContext.state === 'suspended') this.audioContext.resume();

        // An empty utterance spoken during the tap unlocks speech for later
        if (this.speechSupported) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(''));
        }
    }

    /**
     * Stops whatever is playing and cancels any queued parts.
     */
    stop() {
        this.playId++;
        if (this.speechSupported) window.speechSynthesis.cancel();
        if (this.currentSource) {
            try { this.currentSource.stop(); } catch (e) { /* already stopped */ }
            this.currentSource = null;
        }
    }

    /**
     * Plays each part in order, pausing between them. A new call interrupts
     * the previous one.
     * @param {Array<{clip: string, text: string}>} parts
     */
    async say(parts, gapMs = 400) {
        this.stop();
        const id = this.playId;
        await this.wait(50); // iOS can drop speech queued right after cancel()
        for (let i = 0; i < parts.length; i++) {
            if (i > 0) await this.wait(gapMs);
            if (id !== this.playId) return;
            await this.playPart(parts[i], id);
        }
    }

    async playPart({ clip, text }, id) {
        const buffer = await this.loadClip(clip);
        if (id !== this.playId) return;
        if (buffer) return this.playBuffer(buffer);
        return this.speak(text);
    }

    /**
     * Fetches and decodes a recorded clip. Resolves null when there is no clip
     * or it can't be played, so the caller falls back to speech.
     */
    async loadClip(name) {
        const url = this.clipUrls[name];
        if (!url || !this.audioContext) return null;
        if (!(name in this.buffers)) {
            this.buffers[name] = fetch(url)
                .then((res) => {
                    if (!res.ok) throw new Error(`HTTP ${res.status}`);
                    return res.arrayBuffer();
                })
                // Callback form: older Safari doesn't return a promise here
                .then((data) => new Promise((resolve, reject) => {
                    this.audioContext.decodeAudioData(data, resolve, reject);
                }))
                .catch((err) => {
                    console.warn(`Clip ${url} unavailable, using device voice`, err);
                    delete this.buffers[name]; // Retry next time (e.g. back online)
                    return null;
                });
        }
        return this.buffers[name];
    }

    playBuffer(buffer) {
        return new Promise((resolve) => {
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.onended = () => {
                if (this.currentSource === source) this.currentSource = null;
                resolve();
            };
            this.currentSource = source;
            source.start();
        });
    }

    speak(text) {
        if (!this.speechSupported) return Promise.resolve();
        return new Promise((resolve) => {
            const msg = new SpeechSynthesisUtterance(text);
            msg.lang = 'id-ID';
            if (this.voice) msg.voice = this.voice;
            msg.rate = 0.8; // Slightly slower for kids
            msg.pitch = 1.1;

            // iOS sometimes never fires onend; don't let the sequence hang
            const timeout = setTimeout(resolve, 1500 + text.length * 200);
            msg.onend = msg.onerror = () => {
                clearTimeout(timeout);
                resolve();
            };
            window.speechSynthesis.speak(msg);
        });
    }

    wait(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
