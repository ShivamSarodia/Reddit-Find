var ThreadFinder = {

    siteQueriers : {"Reddit": redditQuery}, // just the one querier for now
    
    loadThreads: function(url)
    {
	var numQueries = 0; //Number of queries sent out; used to determine when loading is done
	var rlist=document.getElementById("results");
	for (k in this.siteQueriers)
	{
	    numQueries += 1;
	    var that = this;
	    this.siteQueriers[k].query(url, function(rlts) {
		for (r in rlts)
		{
		    l=rlts[r];
		    var i = document.createElement("li");
		    i.innerHTML = "<a href='"+l["link"]+"'>" + l["title"] + "</a>";
		    rlist.appendChild(i);
		}

		if (--numQueries == 0) //Once we finished the last query, be done
		{
		    that.afterLoad();
		}
	    });
	}
    },

    afterLoad: function()
    {
	var results = document.getElementById("results").getElementsByTagName("a")
	var textDiv = document.getElementById("loading");
	
	if (results.length == 0) //If there's no threads
	{
	    textDiv.innerHTML = "No threads";
	}
	
	else //If there are threads
	{
	    textDiv.style.display = "none";
	    for (var i = 0; i < results.length; i++)
	    {
		results[i].addEventListener("click", onLinkClick);
	    }
	}	
    }
}
