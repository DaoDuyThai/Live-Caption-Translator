function translateMessage(message, callback) {
    // Replace the following line with your translation logic
    // let apiUrl = `https://api.mymemory.translated.net/get?q=${message}&langpair=ko-KR|en-GB`;
    // let apiUrl = `https://translated-mymemory---translation-memory.p.rapidapi.com/get?langpair=kor%7Cen&q=${message}94&mt=1&onlyprivate=0&de=a%40b.c`;
    let apiUrl = `https://text-translator2.p.rapidapi.com/translate`;
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'fd482da7cbmshfa80bd7b6332a5fp1a2754jsn67456d6fca1c',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: 'auto',
            target_language: 'en',
            text: message
        })
    };

    fetch(apiUrl, options)
        .then((res) => res.json())
        .then((data) => {
            const translatedMessage = data.data.translatedText;
            // const translatedMessage = data.matches[0].segment;
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
                // translationDiv.append(`<span style='font-weight: bold'>${speakerName}:</span> ${translatedMessage}`);
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
