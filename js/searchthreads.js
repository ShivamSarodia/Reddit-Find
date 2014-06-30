var ThreadSearcher = {

    maxNum : 30, //Maximum number of threads to show

    searchPageURL : "http://www.reddit.com/api/info.json?url=%u&limit=100",
    searchDomainURL : "http://www.reddit.com/search.json?q=site:%u&sort=comments&limit=25",
    
    searchPage : function(url, callback)
    {
	var that = this;

	doGet(this.searchPageURL.replace("%u", encodeURIComponent(url)),
	      function(response) {
		  var threadList = that.parseResponse(response);

		  if (threadList.length == 0)
		  {
		      var returnObject = TemplateEngine.gen("panel");
		      
		      returnObject.getElementsByTagName("ul")[0].appendChild(TemplateEngine.gen("no-threads"));
		      callback(returnObject, false);
		  }
		  else
		  {
		      var returnObject = TemplateEngine.gen("panel");

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

		      returnObject.appendChild(TemplateEngine.gen("search-domain-button"));
		      
		      callback(returnObject, true);
		  }		  
	      });
    },

    searchSite : function(domain, callback)
    {
	var that = this;

	doGet(this.searchDomainURL.replace("%u", encodeURIComponent(domain)),
	      function(response) {
		  var threadList = that.parseResponse(response);

		  if (threadList.length == 0)
		  {
		      callback(undefined, false);
		  }
		  else
		  {
		      //Do HTML stuff
		  }
	      });
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
