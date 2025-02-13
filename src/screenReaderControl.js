const { speak, stopSpeech, setEnabled, getScreenReaderState } = require('./announcer');

function initializeScreenReaderControls() {
    // Add event listener for the Space key to stop speech
    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            stopSpeech();
        }
    });

    // Add event listener for the Shift + S key combination to toggle screen reader
    document.addEventListener('keydown', function (event) {
        if (event.code === 'KeyS' && event.shiftKey) {
            const checkbox = document.getElementById('checkScreenReader');
            if (checkbox && checkbox instanceof HTMLInputElement) {
                const newEnabled = !checkbox.checked;
                checkbox.checked = newEnabled; // Update checkbox state

                setEnabled(newEnabled); // Update screen reader state

                const text = `Screen reader ${newEnabled ? 'enabled' : 'disabled'}`;
                const utterance = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(utterance);
                console.log(`Screen reader ${checkbox.checked ? 'enabled' : 'disabled'} KeyS`); // Debug log
            }
        }
    });

    // Create and add a checkbox to toggle the screen reader
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'checkScreenReader';
    checkbox.checked = getScreenReaderState();
    checkbox.style.width = '20px';
    checkbox.style.height = '20px';

    checkbox.addEventListener('change', function () {
        // Check the current state before setting the new state
        const currentState = getScreenReaderState();
        if (checkbox.checked !== currentState) {
            const newEnabled = checkbox.checked;
            setEnabled(newEnabled); // Update screen reader state

            const text = `Screen reader ${newEnabled ? 'enabled' : 'disabled'}`;
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
            console.log(`Screen reader ${checkbox.checked ? 'enabled' : 'disabled'} change`); // Debug log
        }
    });

    const label = document.createElement('label');
    label.htmlFor = 'checkScreenReader';
    label.appendChild(document.createTextNode('Check to enable screen reader'));
    label.style.fontSize = '20px';

    const container = document.createElement('div');
    container.appendChild(checkbox);
    container.appendChild(label);
    container.style.position = 'relative'; // Positioned relative to other elements
    container.style.backgroundColor = 'white';
    container.style.padding = '5px';
    container.style.border = '1px solid black';
    container.style.borderRadius = '5px';
    container.style.zIndex = '1000'; // Ensure it is above other elements

    // Add an absolute position wrapper to maintain the fixed position relative to the container
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '15px';
    wrapper.style.right = '670px';
    wrapper.style.width = '18%';

    wrapper.appendChild(container);
    document.body.appendChild(wrapper);
}

module.exports = {
    initializeScreenReaderControls
};