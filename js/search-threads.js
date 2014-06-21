var ThreadFinder = {

    siteQueriers : {"Reddit": redditQuery}, // just the one querier for now

    htmlTemplate : "<a target='_blank' href='%url'>%title</a><div class='details-cont'><span class='details'>%d1</span> <span class='details'>%d2</span> <span class='details'>%d3</span> <span class='details' title='%d5'>%d4</span></div>",
    outElement : null,
    
    search: function(url, foundThreads, noThreads)
    {
	var that = this;
	
	var numThreads = 0; //Number of threads found
	var numQueries = 0; //Number of queries sent out; used to determine when loading is done

	that.outElement = document.createElement("div");
	that.outElement.id = "comment-seeker-div";
	var child = document.createElement("ul");
	child.id = "results";
	child.innerHTML = "<li>&nbsp;<div id='com-seek-title'>Comment Seeker</div><div id='com-seek-close-button'></div></li>";

	for (k in that.siteQueriers)
	{    
	    numQueries += 1;
	    
	    that.siteQueriers[k].query(url, function(rlts) {
		for (r in rlts)
		{
		    numThreads += 1;
		    
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

		    child.appendChild(i); 
		}

		if (--numQueries == 0) //Once we finished the last query, be done
		{
		    if (numThreads == 0) //If there's no threads
		    {
			noThreads();
		    }
		    
		    else //If there are threads
		    {
			that.outElement.appendChild(child);
			foundThreads(that.outElement);
		    }
		}
	    });
	}
    }
}
