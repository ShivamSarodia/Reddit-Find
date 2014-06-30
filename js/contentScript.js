var doGet = function(url, responseFn)
{
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function()
    {
	if (xhr.readyState == 4){
	    responseFn(xhr.responseText);
	}
	else
	{
	    //alert(xhr);
	}
    } 
    xhr.send();
}

/////////////////////////////////////////////

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

var closeListener = function(event) {
    var el = document.getElementById("comment-seeker-div");
    event.target.removeEventListener("click", closeListener);
    el.parentNode.removeChild(el);
    showingPanel = false;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	console.log(showingPanel);
	if(request = "showPanel" && !showingPanel)
	{
	    document.body.appendChild(DOMel);
	    showingPanel = true;
	    document.getElementById("com-seek-close-button").addEventListener("click", closeListener)
	}
    }
);

doAct();
