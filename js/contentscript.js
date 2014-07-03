var doGet = function(url, responseFn) //Not really an event, but whatever
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
	    //console.log("Ready state changed");
	}
    } 
    xhr.send();
}

var url = location.href.split("#")[0]; // strip the anchor link if it exists
ThreadSearcher.searchPage(url,
			  function(object, foundThreads) {
			      
			      PanelManager.domElement = object;
			      
			      if(foundThreads) {
				  chrome.runtime.sendMessage("activateIcon");
			      }
			      
			  }
			 );
