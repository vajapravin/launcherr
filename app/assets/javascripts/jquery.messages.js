/* jquery messages V 1.0 by Paulo Regina (www.pauloreg.com) */

$(document).ready(function() {
	
	$.base_url = '';
	
	// Scroll
	$("ul#messages-stack-list, #text-messages-request, #text-messages").niceScroll({
		cursorcolor: "#2f2e2e",
		cursoropacitymax: 0.6,
		boxzoom: false,
		touchbehavior: true
	});
		
	 // Autogrow Textareas
	 $("textarea").live('mousemove', function(e) {
		var myPos = $(this).offset();
		myPos.bottom = $(this).offset().top + $(this).outerHeight();
		myPos.right = $(this).offset().left + $(this).outerWidth();
		if (myPos.bottom > e.pageY && e.pageY > myPos.bottom - 16 && myPos.right > e.pageX && e.pageX > myPos.right - 16) {
			$(this).css({
				cursor: "nw-resize"
			});
		} else {
			$(this).css({
				cursor: ""
			});
		}
		}).live('keyup', function(e) {
		while ($(this).outerHeight() < this.scrollHeight + parseFloat($(this).css("borderTopWidth")) + parseFloat($(this).css("borderBottomWidth"))) {
			$(this).height($(this).height() + 1);
		};
	});

	// Messages System
	$('li.prepare-message').live("click", function(){
		var ID = $(this).attr("id");
		var URL = $.base_url + 'ajax/request_chat_ajax.php';
		var R_URL = $.base_url + 'ajax/refresh_unreadMessages_ajax.php';
		var dataString = 'id='+ID;
		$.ajax({
            type: "POST",
            url: URL,
            data: dataString,
            cache: false,
            success: function(html) {
				$(".active-message").removeClass("active-message");
				$("li#"+ID+".prepare-message").focus().addClass("active-message");
				$("#text-messages-request").html(html);
				update_unMsg_counter(R_URL, dataString, ID);
            }
        });
		return false;
	})
	
	// Messages System - type message, send
	$('textarea.type-a-message-box').live("click", function() {
		var ID = $(this).attr("id");
		var URL = $.base_url + 'ajax/add_chat_ajax.php';

		$('div.message-btn-target').html('<a href="#" id="'+ID+'" class="btn btn-default btn-sm send-message"><i class="glyphicon glyphicon-send"></i> Send</a>');
		$('#type-a-message').remove();	
		
		//$("a#"+ID+".send-message").on("click", function() { IE don't recognize this
		$("a.send-message").on("click", function() {
			// var textarea = $('textarea#'+ID+'.type-a-message-box').val(); IE also don't recognize this
			var textarea = $('textarea.type-a-message-box').val();
			var dataString = 'id='+ID+'&message='+textarea;
			if ($.trim(textarea).length == 0) 
			{
				alert('Please write something to send');
			} else {
				$.ajax({
					type: "POST",
					url: URL,
					data: dataString,
					cache: false,
					success: function(html) {
						$("p.no-messages").remove();
						$("#text-messages-request").html(html);
					}
				});
			}
		});		
		return false;		
	})
	
	// Messages System - load more messages
	$('.load-more-messages').off('click').live("click", function() {
		var ID = $(this).attr("id");
		var UID = $(this).attr("rel");
		var URL = $.base_url + 'ajax/chat_more_ajax.php';
		var R_URL = $.base_url + 'ajax/refresh_unreadMessages_ajax.php';
		var dataString = "lastid=" + ID + "&uid="+UID;
		if (ID) {
			$.ajax({
				type: "POST",
				url: URL,
				data: dataString,
				cache: false,
				beforeSend: function() {
					$("#more" + ID).html('<img src="img/ajaxloader.gif" />');
				},
				success: function(html) {
					$("div#more"+ID+".more-messages-parent").remove();
					$("#text-messages").append(html);
					update_unMsg_counter(R_URL, dataString, UID);
				}
			});
		} else {
			$("#more").html('No Messages'); // no results
		}
		return false;
	});
	
	// Messages System - filter
	$("#contacts-search-input").live("click", function() {
		var oldhtml = $("ul#messages-stack-list").html();
		$(this).keyup(function() {
			var filterbox = $(this).val();
			var dataString = 'filterword=' + filterbox;
			var URL = $.base_url + 'ajax/chat_filter_ajax.php';
			if ($.trim(filterbox).length > 0) {
				$.ajax({
					type: "POST",
					url: URL,
					data: dataString,
					cache: false,
					success: function(html) {
						$("ul#messages-stack-list").html(html).show();
					}
				});
			}
			return false;
		});
		$("ul#messages-stack-list").mouseup(function() {
			return false
		});
		$(document).mouseup(function() {
			$("ul#messages-stack-list").html(oldhtml);
			$('#contacts-search-input').val("");
		});
	});
	
	// Messages System - remove
	$(".remove-message").off("click").live("click", function(){
		var ID = $(this).attr("id");
		var UID = $(this).data("user");
		var URL = $.base_url + 'ajax/chat_remove_ajax.php';
		var dataString = "id="+ID+"&uid="+UID;
		$.ajax({
				type: "POST",
				url: URL,
				data: dataString,
				cache: false,
				success: function(html) {
					$("#u_msg"+ID).remove();
					var value = parseInt($('span#count-old-messages').text());
					$('span#count-old-messages').html(value-1);
					if(value == 1)
					{
						$(".more-messages-parent").fadeOut(300).remove();
					}
				}
			});
		return false;
	})
	
	// loadings on ajax requests
	$('#loadingDiv')
		.hide()  // hide it initially
		.ajaxStart(function() {
			$(this).show();
		})
		.ajaxStop(function() {
			$(this).hide();
		});
	  
});

function update_unMsg_counter(R_URL, dataString, ID)
{
	$.post(R_URL, dataString, function(response) 
	{
		$("#unreader-count-"+ID).html(response);
		var counter = $("#unreader-count-"+ID).text();
		if(counter.length == 0) 
		{
			$("#unreader-counter"+ID).fadeOut(300).remove();		
		}
	});		
}