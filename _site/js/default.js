
$(document).ready(function(){
	/*! Fades in whole page on load */
	// $('#content').css('display', 'none');
	// $('#content').fadeIn('slow');
	// $('#header').css('display', 'none');
	// console.log("yo")
}); 

$(document).on('mouseover', 'a', function() {
	var links = document.getElementsByTagName('a');

	for(var i = 0, l = links.length; i < l; i++) {
		if(links[i].target === '_blank') {
			links[i].onclick = function() {
				window.open(this.href, '_blank');
				return false;
			}
		} else if(links[i].onclick != null) {
			// nothing here, just need to catch the links that open new windows built in to their element
		} else {
	  		links[i].onclick = function() {
		   		var href = this.href;
		   		// console.log(href);

			    //Load the AJAX page (this is a whole other topic)
			    loadDoc(href);

			    //Unfocus the link to make it look like you were redirected
			    this.blur();

			    //Prevent the natural HTTP redirect
			    return false;
			}
	  }
	}
})

$('#content').bind('contentchanged', function() {
	// console.log('content changed');
})

function newpage() { 
	// window.location = newLocation;
}

/*
function displayPath(url) {

	var currentItem = $("#breadcrumbs").find("[href$='" + url + "']");
	console.log(currentItem);
	var path = "home";
	$(currentItem.parents("li").get().reverse()).each(function () {
		path += " / " + $(this).children("a").text();
	});

	$("#breadcrumbs").html(path);
}
*/

function updateCrumbs() {
	// $('#breadcrumbs').
}

// ajax requests
function loadDoc(url) {
  var xhttp;
  xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
  	if (this.readyState == 4 && this.status == 200) {
  		var parser = new DOMParser();
  		var xmlDoc = parser.parseFromString(xhttp.responseText, "text/html");
  		var newContentHtml = xmlDoc.getElementById('content').innerHTML;
  		var newContentTitle = (/<title>(.*?)<\/title>/m).exec(this.responseText)[1];
  		var newCrumbs = xmlDoc.getElementById('breadcrumbs').innerHTML;

  		// update section content and animate
      	document.getElementById('content').innerHTML = newContentHtml;
      	document.getElementById('breadcrumbs').innerHTML = newCrumbs;
      	$('#content').hide().fadeIn('slow');	

      	// update breadcrumbs here
      	// displayPath(url);

      	// update address bar and history
     	window.history.pushState({"html":newContentHtml,"pageTitle":newContentTitle},"", this.responseURL);

     	// back and previous history functionality
     	window.onpopstate = function(e){
    		if(e.state){
        		document.getElementById("content").innerHTML = e.state.html;
        		document.title = e.state.pageTitle;
    		}	
		};

		// recursively add links to breadcrumbs div here?


      	// append xmlDoc.getElementById('content')

      	// append a elements to links
      	// links.add(xmlDoc.getElementsByTagName('a'));
    }
 };

  xhttp.open("GET", url, true);
  xhttp.send();
}