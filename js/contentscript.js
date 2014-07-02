var DOMel = ""; //store the DOM element for later, when we display it
var showingPanel = false;

var doAct = function()
{
    var url = location.href.split("#")[0]; // strip the anchor link if it exists
    ThreadSearcher.searchPage(url,
			      function(object, foundThreads) {
				  
				  DOMel = object;
				  
				  if(foundThreads) {
				      chrome.runtime.sendMessage("activateIcon");
				  }
				  
			      }
			     );
}

doAct();
