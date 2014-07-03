//Handles HTML templates
var TemplateEngine = {                       
    
    templateURL : "html/templates.html",

    templates: {},

    //Loads the HTML templates from file.
    load: function() {
	var that = this;
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", chrome.extension.getURL(that.templateURL), false);
	xhr.send(null);

	var el = document.createElement("div");
	el.innerHTML = xhr.responseText;

	var templateList = el.getElementsByClassName("template");
	for(i = 0; i < templateList.length; i++) {
	    that.templates[templateList[i].id] = templateList[i].innerHTML;
	}
    },

    //Generates a DOM element from a template
    gen: function(templateName, data) {	
	var that = this;

	var outString = that.templates[templateName];
	if (outString === undefined)
	{
	    console.log("Bad template name: " + templateName);
	}
	else
	{	    
	    for (var key in data) {
		if (data.hasOwnProperty(key)) {
		    outString = outString.replace("%"+key, data[key]);
		}
	    }
	}

	var outEl = document.createElement("div"); //Funny business to generate a DOM element
	outEl.innerHTML = outString.trim();
	return outEl.firstChild
    }
};

TemplateEngine.load();
