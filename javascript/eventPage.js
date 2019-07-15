// noinspection JSDeprecatedSymbols
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.todo == "showPageAction") {
        const {tabs} = chrome;
        tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.pageAction.show(tabs[0].id)
        });


        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
            let url = tabs[0].url;
            console.log(url)
        });
    }
});



var menuItem = {
    "id": "Speak",
    "title": "Speak",
    "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
    if (clickData.menuItemId == "Speak" && clickData.selectionText) {
        chrome.tts.speak(clickData.selectionText,
            {
                'rate': 0.7
            });
    }
});



