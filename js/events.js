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
	    //alert(xhr);
	}
    } 
    xhr.send();
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if(request == "showPanel")
	{
	    if(!showingPanel)
	    {
		document.body.appendChild(DOMel);
		showingPanel = true;
		document.getElementById("com-seek-close-button").addEventListener("click", closeListener)
		document.getElementsByClassName("com-seek-domain-button")[0].addEventListener("click", searchDomain);
	    }
	    else
	    {
		var el = document.getElementById("comment-seeker-div");
		document.getElementById("com-seek-close-button").removeEventListener("click", closeListener);
		document.getElementsByClassName("com-seek-domain-button")[0].removeEventListener("click", searchDomain);
		el.parentNode.removeChild(el);
		showingPanel = false;
	    }
	}
    }
);

var closePanel = function(event) {
    var el = document.getElementById("comment-seeker-div");
    event.target.removeEventListener("click", closeListener);
    el.parentNode.removeChild(el);
    showingPanel = false;
}



var searchDomain = function(event) {
    document.getElementById("com-seek-results").style.opacity = 0.5;
    ThreadSearcher.searchSite(document.domain,
			      function(object, foundThreads)
			      {
				  document.getElementById("com-seek-results").style.opacity = 1;
				  var el = document.getElementById("comment-seeker-div");
				  document.getElementById("com-seek-close-button").removeEventListener("click", closeListener);
				  document.getElementsByClassName("com-seek-domain-button")[0].removeEventListener("click", searchDomain);
				  el.parentNode.removeChild(el);

				  document.body.appendChild(object);
				  showingPanel = true;
				  document.getElementById("com-seek-close-button").addEventListener("click", closeListener);
			      }
			     );    
}

var EventManager = {
    events: {"com-seek-close-button": ["click", closeListener, false],
	     "com-seek-domain-button-nt": ["click", searchDomain, false],
	     "com-seek-domain-button-t": ["click", searchDomain, false]
	    },

    refresh: function() {
	var that = this;
	
	for (var event in that.events) {
	    if(events.hasOwnProperty(event)){
		
		var el = document.getElementById(event);

		if( (el != null) && !events[event][3]) //if it exists, but event isn't defined
		{
		    el.addEventListener(event[0], event[1]);
		}

		else if(!el && events[event][3])
	    }
	}
    }
}

