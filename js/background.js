chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if (request == "activateIcon")
	{
	    chrome.browserAction.setIcon(
		{
		    "path": {
			"19": "img/icon_active_small.png",
			"38": "img/icon_active_big.png"
		    },
		    "tabId":sender.tab.id
		}
	    );
	}
    }
);

chrome.browserAction.onClicked.addListener(
    function(tab)
    {
	chrome.tabs.sendMessage(tab.id, "showPanel")
    }
);
