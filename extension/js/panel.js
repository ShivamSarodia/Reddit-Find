chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if(request == "showPanel")
	{
	    PanelManager.toggle();
	}
    }
);

var closePanel = function(event) { PanelManager.close(); }

var searchDomain = function(event) {
    document.getElementById("com-seek-results").style.opacity = 0.5;
    ThreadSearcher.searchSite(document.domain,
			      function(object, foundThreads)
			      {
				  document.getElementById("com-seek-results").style.opacity = 1;
				  PanelManager.close();
				  PanelManager.open(object);
			      }
			     );    
}

var searchPage = function(event) {
    document.getElementById("com-seek-results").style.opacity = 0.5;
    ThreadSearcher.searchPage(location.href.split("#")[0],
			      function(object, foundThreads)
			      {
				  PanelManager.domElement = object;
				  
				  document.getElementById("com-seek-results").style.opacity = 1;
				  PanelManager.close();
				  PanelManager.open();
			      }
			     );
}

var PanelManager = {
    events: {"com-seek-close-button": ["click", closePanel],
	     "com-seek-domain-button-nt-d": ["click", searchDomain],
	     "com-seek-domain-button-t-d": ["click", searchDomain],
	     "com-seek-domain-button-nt-p": ["click", searchPage],
	     "com-seek-domain-button-t-p": ["click", searchPage]
	    },

    opened: false,

    domElement: undefined, //Default DOM element for adding, unless overridden

    refreshEvents: function() {
	for (var event in this.events) {
	    if(this.events.hasOwnProperty(event)) {
		var el = document.getElementById(event);

		if(el) { el.addEventListener(this.events[event][0], this.events[event][1]); }
	    }
	}
    },

    open: function(content) {
	if(!this.opened) {
	    if(content === undefined) { content = this.domElement; }
	    
	    this.opened = true;
	    document.body.appendChild(content);
	    this.refreshEvents();
	    
	    return true;
	}
	else { return false; }
    },

    close: function() {
	if(this.opened)
	{
	    this.opened = false;
	    var el = document.getElementById("comment-seeker-div");
	    el.parentNode.removeChild(el);

	    return true;
	}
	else { return false; }
    },

    toggle: function(content) {
	if(this.opened) {
	    this.close();
	    return true;
	}

	else {
	    this.open();
	    return false;
	}
    }
}

