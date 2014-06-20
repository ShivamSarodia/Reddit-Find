var ThreadFinder = {

    siteQueriers : {"Reddit": redditQuery}, // just the one querier for now

    htmlTemplate : "<a href='%url'>%title</a><div class='details-cont'><span class='details'>%d1</span> <span class='details'>%d2</span> <span class='details'>%d3</span> <span class='details' title='%d5'>%d4</span></div>",
    
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
		    i = document.createElement("li");
		    
		    l=rlts[r];
		    i.innerHTML = that.htmlTemplate
			.replace("%url", l["link"])
			.replace("%title", l["title"])
			.replace("%d1", l["score"])
			.replace("%d2", l["num_comments"])
			.replace("%d3", l["subreddit"])
			.replace("%d4", l["timeago"])
			.replace("%d5", l["date"]);		    

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
