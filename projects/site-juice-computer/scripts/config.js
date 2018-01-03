$(document).ready(function() {
	var i=0;
	$( document ).on( 'click', '.btn-menu', function () {
		i+=1;
		var status = i%2;
		var menu = $('#menu-main');
		if (status) {
			menu.show()
		}else{
			menu.hide()
		}
	});

	/* config modal */
    $( document ).on( 'click', '.close', function () {
    	$('.modal').fadeOut();
    });

    $( document ).on( 'click', '.view-modal', function () {
    	var modal = $(this).attr('data-ref');
        $(modal).fadeIn();
    });

    $('#fullPage').fullpage({
    	verticalCentered: true,
    	autoScrolling: false,
    	anchors:['inicio', 'servicios','cursos','contacto'],
    	responsive: 400,
    	fitToSection: false,
		afterLoad: function(anchorLink, index){
			//var maxwidth = window.matchMedia('(max-width:1000px)').matches;
			var topBar = $('#topBar');
			var iphoneEl = $('#iphone');

			if (anchorLink == 'inicio') {
				topBar.removeClass('bar-white');
			}else if (anchorLink == 'servicios') {
				topBar.addClass('bar-white');
				iphoneEl.removeClass('animate-iphone')
			}else if (anchorLink == 'cursos') {
				topBar.addClass('bar-white');
				iphoneEl.addClass('animate-iphone')		
			}else if (anchorLink == 'contacto') {
				topBar.addClass('bar-white');
			}
		}
    });

});