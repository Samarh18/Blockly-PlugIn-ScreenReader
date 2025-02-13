let isEnabled = true; // Screen reader enabled by default
let speechRate = 1; // Default speech rate
let speechVolume = 1; // Default speech volume

if (!('speechSynthesis' in window)) {
    console.error('Web Speech API not supported :-(');
}

/**
 * Announce the given text using speech synthesis.
 * @param {string} text - The text to be spoken.
 */
function speak(text) {
    if (isEnabled && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speechRate;
        utterance.volume = speechVolume;
        window.speechSynthesis.speak(utterance);
    } else if (!('speechSynthesis' in window)) {
        console.error('Web Speech API not supported :-(');
    }
}

/**
 * Stop the current speech.
 */
function stopSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    }
}

/**
 * Enable or disable the screen reader.
 * @param {boolean} enabled - True to enable, false to disable.
 */
function setEnabled(enabled) {
    isEnabled = enabled;

}

/**
 * Get the current state of the screen reader.
 * @returns {boolean} True if enabled, false if disabled.
 */
function getScreenReaderState() {
    return isEnabled;
}

/**
 * Set the speech rate for the screen reader.
 * @param {number} rate - The speech rate (0.1 to 10).
 */
function setSpeechRate(rate) {
    speechRate = rate;
}

/**
 * Set the speech volume for the screen reader.
 * @param {number} volume - The speech volume (0 to 1).
 */
function setSpeechVolume(volume) {
    speechVolume = volume;
}

module.exports = {
    speak,
    stopSpeech,
    setEnabled,
    getScreenReaderState,
    setSpeechRate,
    setSpeechVolume
};