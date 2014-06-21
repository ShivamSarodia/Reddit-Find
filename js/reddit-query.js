var redditQuery = {
    maxNum : 10, // Maximum number of threads to show
    
    searchTemplateURL : "http://www.reddit.com/api/info.json?url=%u&limit=100", //Consider changing the limit?

    parseResponse: function(response, maxNum) {
	var rtn = [];
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
	    rtn.push(threadInfo);
	}

	rtn.sort(function(a, b) { return b["raw_num_comments"] - a["raw_num_comments"];	}); //Sort by number of comments
	return rtn.slice(0, maxNum);
    },

    //URL to search for, callback is a function that takes a list of objects
    query: function(url, callback) {
	cb = callback;
	parser = this.parseResponse;
	maxNum = this.maxNum;
	doGet(this.searchTemplateURL.replace("%u", encodeURIComponent(url)),
	      function(response) {
		  cb(parser(response, maxNum));
	      });
    }
}
