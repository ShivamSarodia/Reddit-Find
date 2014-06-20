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

var doAct = function()
{
    chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {
	if(tabs[0].url === undefined)
	{
	    console.log("Undefined url");
	    //StackOverflow said this may happen, so we should deal with it to be safe.
	}
	else
	{
	    var url = tabs[0].url.split("#")[0]; // strip the anchor link if it exists
	    ThreadFinder.loadThreads(url);
	}
   });
}

var onLinkClick = function()
{
    chrome.tabs.create({
	"url": this.href,
	"active": true
    });
    return false;
}

document.addEventListener('DOMContentLoaded', doAct);
