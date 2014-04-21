    +function ($) {
	'use strict';

	/* Configurations */
	jQuery.ajaxSetup({'cache': false});

	function getCookie(name) {
	    var cookieValue = null;
	    if (document.cookie && document.cookie != '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
		    var cookie = jQuery.trim(cookies[i]);
		    // Does this cookie string begin with the name we want?
		    if (cookie.substring(0, name.length + 1) == (name + '=')) {
			cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
			break;
		    }
		}
	    }
	    return cookieValue;
	}


	function sameOrigin(url) {
	    // test that a given url is a same-origin URL
	    // url could be relative or scheme relative or absolute
	    var host = document.location.host; // host + port
	    var protocol = document.location.protocol;
	    var sr_origin = '//' + host;
	    var origin = protocol + sr_origin;
	    // Allow absolute or scheme relative URLs to same origin
	    return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
		(url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
		// or any other URL that isn't scheme relative or absolute i.e relative.
		!(/^(\/\/|http:|https:).*/.test(url));
	}


	var csrftoken = getCookie('csrftoken');

	$.ajaxSetup({
	    beforeSend: function (xhr, settings) {
		if (!/^(GET|HEAD|OPTIONS|TRACE)$/.test(settings.type) && sameOrigin(settings.url)) {
		    // Send the token to same-origin, relative URLs only.
		    // Send the token only if the method warrants CSRF protection
		    // Using the CSRFToken value acquired earlier
		    xhr.setRequestHeader("X-CSRFToken", csrftoken);
		}
	    }
	});


	$(document).ready(function() {
            $( "#submit-id-submit" ).click(function(e) {
		e.preventDefault();

		$.post("/pictures/new_ajax",
                       {name:"Donald Duck",
			city:"Duckburg"
                       },
                       function(data,status){
			   alert("Data: " + data + "\nStatus: " + status);
                       })
                    .fail(function(xhr) {
			console.log("Error: " + xhr.statusText);
                    });
		
		console.log( "Handler for .click() called." );
            });
	});
	
	
	
    }(jQuery);
