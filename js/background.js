chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if (request == "showIcon")
	{
	    chrome.pageAction.show(sender.tab.id);
	}
    }
);

chrome.pageAction.onClicked.addListener(
    function(tab)
    {
	chrome.tabs.sendMessage(tab.id, "showThreads")
    }
);
