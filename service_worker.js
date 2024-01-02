chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['content.js'],
        func: () => {
            alert('Service Worker is running!');
        },
    });
});

chrome.tabs.onCreated.addListener((tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        // tabs is an array of tab objects
        if (tabs.length > 0) {
            var currentTabUrl = tabs[0].url;
            console.log(currentTabUrl);
            if (currentTabUrl.includes('chrome://newtab/')) {
                chrome.tabs.update(tab.id, { url: '/new-tab/tab.html' });
            } else {
                console.log('Unable to retrieve tab information.');
            }
        }
    });
});
