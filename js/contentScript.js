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

var threads = null;

var doAct = function()
{
    var url = location.href.split("#")[0]; // strip the anchor link if it exists
    ThreadFinder.search(url,
			function(t) {
			    threads = t;
			    chrome.runtime.sendMessage("showIcon");
			},
			function() {}
		       );
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
	if(request = "showThreads")
	{
	    document.body.appendChild(threads);
	}
    }
);

doAct();
