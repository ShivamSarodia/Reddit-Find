var ThreadFinder = {
    siteQueriers : {"Reddit": redditQuery}, // just the one querier for now
    
    loadThreads: function(url)
    {
	var rlist=document.getElementById("results");
	for (k in this.siteQueriers)
	{
	    console.log("Got up here.");
	    this.siteQueriers[k].query(url, function(rlts){
		for (r in rlts)
		{
		    l=rlts[r];
		    var i = document.createElement("li");
		    i.innerHTML = "<a href='"+l["link"]+"'>" + l["title"] + "</a>";
		    rlist.appendChild(i);
		}
	    });
	    console.log("Got all the way here.");
	}
    }
}
