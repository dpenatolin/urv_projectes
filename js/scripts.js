// Para fijar el menú en la parte superior
$(window).scroll(function(){
	if ($(this).scrollTop()>70){ // número de px para que se aplique
		$('.nav-principal').addClass('nav-fixed'); // coge ('...') y ponle la clase ('.../!\sin punto')
	} else {
		$('.nav-principal').removeClass('nav-fixed'); // si no hay scroll, quitale a ('...') la clase ('.../!\sin punto')
	}
});


// Scroll suave entre enlaces
$(document).ready(function(){
	$('a[href^="#"]').on('click',function (e){
		e.preventDefault();
		var target = this.hash;
		var $target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 800, 'swing', function(){ // tiempo que dura el scroll
			window.location.hash = target;
		});
	});
});


// highlitghting nav
$(document).ready(function(){
    /*
     * This part handles the highlighting functionality.
     * We use the scroll functionality again, some array creation and 
     * manipulation, class adding and class removing, and conditional testing
     */
    var aChildren = $(".nav-principal ul li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i=0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    $(window).scroll(function(){
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();

        for (var i=0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").addClass("nav-principal_active");
            } else {
                $("a[href='" + theID + "']").removeClass("nav-principal_active");
            }
        }

        if(windowPos + windowHeight == docHeight) {
            if (!$(".nav-principal ul li:last-child a").hasClass("nav-principal_active")) {
                var navActiveCurrent = $(".nav-principal_active").attr("href");
                $("a[href='" + navActiveCurrent + "']").removeClass("nav-principal_active");
                $(".nav-principal ul li:last-child a").addClass("nav-principal_active");
            }
        }
    });
});