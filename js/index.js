var redditAPI = "http://www.reddit.com/api/info.json"; //Link to the reddit API

//Gets the reddit posts for a given URL, then calls successFunc or errorFunc
function getLinks(url, successFunc, errorFunc)
{
    var timeout = 5000; //In milliseconds
    var limit = 8; //Maximum number of results
    
    $.ajax({
	"type": "GET",
	"dataType": "json",
	"url": redditAPI,
	"data": { "url": url, "limit": limit },
	"timeout": timeout,
	"success": successFunc,
	"error": errorFunc
    });
}

//If the request was successful, 
function onSuccess(data, textStatus, jqXHR)
{
    console.log(data);

    var links = data["data"]["children"]    
    var linkLength = links.length;

    if(linkLength == 0)
    {
	$("body").append("No links!");
    }

    else
    {    
	for(var i = 0; i < linkLength; i++)
	{
	    var permalink = links[i]["data"]["permalink"];
	    var title = links[i]["data"]["title"];
	    var score = links[i]["data"]["score"];
	    var comments = links[i]["data"]["num_comments"];

	    $linkdiv = $("<div>", {"class": "links"});
	    $linkdiv.html(title);
	    $linkdiv.data({"link": "http://www.reddit.com"+permalink});

	    $datadiv = $("<div>", {"class": "data"});
	    $datadiv.html("Score: " + score + "<br>Comments: " + comments + "<br>");
	    
	    $("body").append($linkdiv);
	    $("body").append($datadiv);
	}
    }
}

//Displays error message to user
function onError(jqXHR, textStatus, errorThrown)
{
    console.log("Error!");
}

function getURL(tab)
{
    var url = tab[0].url;
    console.log(url);

    if(url === undefined)
    {
	//TODO: deal with this case
    }
    else
    {
	getLinks(url, onSuccess, onError);
    }
}

$(document).ready(function() {

    $("body").on("click", ".links", function(event) {
	chrome.tabs.create({"url": $(event.target).data("link"), "active": true});
    });

    chrome.tabs.query({currentWindow: true, active: true}, getURL);
});
