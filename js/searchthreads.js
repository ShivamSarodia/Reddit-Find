var ThreadSearcher = {

    maxNum : 30, //Maximum number of threads to show

    searchPageURL : "http://www.reddit.com/api/info.json?url=%u&limit=100",
    searchDomainURL : "http://www.reddit.com/search.json?q=site:%u&sort=comments&limit=25",

    search: function(domainFlag, url, callback)
    {
	var that = this;

	queryURL = domainFlag ? that.searchDomainURL : that.searchPageURL;
	doGet(queryURL.replace("%u", encodeURIComponent(url)),
	      function(response) {
		  var threadList = that.parseResponse(response);
		  var buttonText = domainFlag ? "this page" : "entire domain";
		  var headerText = domainFlag ? " - Domain" : "";
		  
		  if (threadList.length == 0)
		  {
		      var returnObject = TemplateEngine.gen("panel", {"d1":headerText});
		      returnObject.getElementsByTagName("ul")[0].appendChild(TemplateEngine.gen("no-threads",
												{
												    "d1": buttonText,
												    "d2": (domainFlag ? "-p":"-d")
												}));
		      callback(returnObject, false);
		  }
		  else
		  {
		      var returnObject = TemplateEngine.gen("panel", {"d1":headerText});

		      for (i = 0; i < threadList.length; i++)
		      {
			  var t = threadList[i];

			  returnObject.getElementsByTagName("ul")[0]
			      .appendChild(TemplateEngine.gen("thread",
							      {
								  "url": t["link"],
								  "title": t["title"],
								  "d1": t["score"],
								  "d2": t["num_comments"],
								  "d3": t["subreddit"],
								  "d4": t["timeago"],
								  "d5": t["date"]
							      }
							     ));
			  
		      }

		      returnObject.appendChild(TemplateEngine.gen("search-domain-button",
								  {
								      "d1": buttonText,
								      "d2": (domainFlag ? "-p": "-d")
								  }));
		      		      
		      callback(returnObject, true);
		  }		  
	      });
    },
    
    searchPage : function(url, callback)
    {
	this.search(false, url, callback);
    },

    searchSite : function(domain, callback)
    {
	this.search(true, domain, callback);
    },

    parseResponse : function(response, callback)
    {
	var that = this;
	
	var threadList = [];
	var o = JSON.parse(response);

	for (i in o.data.children)
	{
	    var strTimeAgo = moment.unix(o.data.children[i].data.created_utc).fromNow();
	    if(strTimeAgo.charAt(0) == "a")
	    {
		strTimeAgo = "1" + strTimeAgo.slice(1);
	    }
	    
	    var threadInfo = {
		"title": o.data.children[i].data.title,
		"link": "http://www.reddit.com" + o.data.children[i].data.permalink,
		"score": o.data.children[i].data.score + " points",
		"raw_num_comments":  o.data.children[i].data.num_comments,
		"num_comments": o.data.children[i].data.num_comments + " comments",
		"subreddit": "/r/" + o.data.children[i].data.subreddit,
		"author": o.data.children[i].data.author,
		"timeago": strTimeAgo,
		"date": moment.unix(o.data.children[i].data.created_utc).format("l")
	    }
	    threadList.push(threadInfo);
	}

	threadList.sort(function(a, b) { return b["raw_num_comments"] - a["raw_num_comments"];	}); //Sort by number of comments
	return threadList.slice(0, that.maxNum);
    }
}
