var ThreadFinder = {

    siteQueriers : {"Reddit": redditQuery}, // just the one querier for now
    
    loadThreads: function(url)
    {
	var numThreads = 0; //Number of threads in total
	var numQueries = 0; //Number of queries sent out; used to determine when loading is done
	var rlist=document.getElementById("results");
	for (k in this.siteQueriers)
	{
	    numQueries += 1;
	    var that = this;
	    this.siteQueriers[k].query(url, function(rlts) {
		for (r in rlts)
		{
		    numThreads += 1;
		    l=rlts[r];
		    var i = document.createElement("li");
		    i.innerHTML = "<a href='"+l["link"]+"'>" + l["title"] + "</a>";
		    rlist.appendChild(i);
		}

		if (--numQueries == 0) //Once we finished the last query, be done
		{
		    that.afterLoad(numThreads);
		}
	    });
	}
    },

    afterLoad: function(numThreads)
    {
	var results = document.getElementById("results").getElementsByTagName("a")
	if (numThreads == 0)
	{
	    var rlist=document.getElementById("results");
	    rlist.innerHTML = "No threads";
	}
	else
	{
	    for (var i = 0; i < results.length; i++)
	    {
		results[i].addEventListener("click", onLinkClick);
	    }
	}	
    }
}
