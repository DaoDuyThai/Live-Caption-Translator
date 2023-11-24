function translateMessage(message, callback) {
    // Replace the following line with your translation logic
    let apiUrl = `https://api.mymemory.translated.net/get?q=${message}&langpair=en-GB|ko-KR`;

    fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
            const translatedMessage = data.responseData.translatedText;
            callback(translatedMessage);
        })
        .catch(error => {
            console.error('Error translating message:', error);
            callback(message); // If translation fails, use the original message
        });
}

function getChatMessages() {
    const translationDiv = document.querySelector('#translation');
    //clear console log
    console.clear();

    // Get the parent div with class "iOzk7"
    const parentDiv = document.querySelector('.iOzk7');

    // Store chat messages to check for duplicates
    const existingMessages = [];

    // Check if parent div exists
    if (parentDiv) {
        // Get all child divs with class "TBMuR" and "bj4p3b" within the parent div
        const chatMessages = parentDiv.querySelectorAll('.TBMuR.bj4p3b');

        // Loop through each chat message
        chatMessages.forEach(message => {
            // Get the speaker's name
            const speakerName = message.querySelector('.zs7s8d.jxFHg').textContent;

            // Get the chat message
            const chatMessage = message.querySelector('.iTTPOb.VbkSUe').textContent;

            // Check if the message is already present
            const isDuplicate = existingMessages.some(existingMessage => {
                return existingMessage.speaker === speakerName && existingMessage.message === chatMessage;
            });


            // Translate the chat message
            translateMessage(chatMessage, (translatedMessage) => {
                // Log the results (you can do anything you want with the data)
                console.log(`${speakerName}: ${translatedMessage}`);
                translationDiv.append(`<span style='font-weight: bold'>${speakerName}:</span> ${translatedMessage}`);
            });

        });
    } else {
        console.log('No chat messages found.');
    }
}

function onElementChange(callback) {
    const observer = new MutationObserver(() => {
        // Call the callback when there is any change in the document
        callback();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
}

// Execute getChatMessages whenever an element is changed
onElementChange(getChatMessages);
