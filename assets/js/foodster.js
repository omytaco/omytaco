/*=============================================
Booking Form
==============================================*/

$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name            = $("input#first_name1").val() + ' ' + $("input#last_name1").val();
            var email           = $("input#email1").val();
            var phone           = $("input#phone1").val();
            var reservDate      = $('input#reserv_date1').val();
            var numGuests       = $('input#numb_guests1').val();
            var altDate         = $('input#alt_reserv_date1').val();
            var bookingTime     = $('input#time1').val();
            var message         = $("textarea#message").val();
            $.ajax({
                url: "././assets/php/mail/booking.php",
                type: "POST",
                data: {
                    name: name,
                    phone: phone,
                    email: email,
                    reservDate: reservDate,
                    numGuests: numGuests,
                    altDate: altDate,
                    bookingTime: bookingTime,
                    message: message
                },
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your booking has been submitted. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry, the mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $('#hero-carousel').on('slide.bs.carousel', function () {
        matchCarouselHeight();
    })
});

/*============================================
Contact Map
==============================================*/
    function loadGoogleMap() {
    
        var mapPoint = {
                    'lat': 53.48,
                    'lng': -2.24,
                    'zoom' : 17,
                    'infoText':'<p>55 Mosley Street\
                                <br/>Manchester\
                                <br/>M2 3HY</p>',
                    'linkText':'View on Google Maps',
                    'mapAddress':'55 Mosley Street, Manchester, M2 3HY',
                    'icon': 'assets/images/map_pin.png'
                };

        if($('#restaurant_map').length){
        
            var map;
            var mapstyles = [ { "stylers": [ { "saturation": -100 } ] } ];
            
            var infoWindow = new google.maps.InfoWindow;
            var pointLatLng = new google.maps.LatLng(mapPoint.lat, mapPoint.lng);

            var mapOptions = {
                zoom: mapPoint.zoom,
                center: pointLatLng,
                zoomControl : true,
                panControl : false,
                streetViewControl : false,
                mapTypeControl: false,
                overviewMapControl: false,
                scrollwheel: false,
                styles: mapstyles
            }
            
            map = new google.maps.Map(document.getElementById("restaurant_map"), mapOptions);
            
            var marker = new google.maps.Marker({
                position: pointLatLng, 
                map: map, 
                title:mapPoint.linkText,
                icon: mapPoint.icon
            });
            
            var mapLink = 'https://www.google.com/maps/preview?ll='+mapPoint.lat+','+mapPoint.lng+'&z=14&q='+mapPoint.mapAddress;
            
            var html = '<div class="infowin">'
                    + mapPoint.infoText
                    + '<a href="'+mapLink+'" target="_blank">'+mapPoint.linkText+'</a>'
                    + '</div>';

            google.maps.event.addListener(marker, 'mouseover', function() {
                infoWindow.setContent(html);
                infoWindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'click', function() {
                window.open(mapLink,'_blank');
            });
            
        }
    }

/*============================================
Match height of header carousel to window height
==============================================*/
function matchCarouselHeight() {
    // Adjust Header carousel .item height to same as window height
    var wH = $(window).height();
    $('#hero-carousel .item').css("height", wH);
}

/*============================================
Any JS inside the $(document).scroll function is called when the page is scrolled
==============================================*/
$(document).scroll( function() {
    if ( $(this).scrollTop()>=$('header').position().top ) {
        $('nav').addClass('navbar-shrink');
    }

    if ( $(window).scrollTop() < $('header').height() + 1 ) {
        $('nav').removeClass('navbar-shrink');
    }
});

/*====================================================================================================
Any JS inside $(window).load function is called when the window is ready and all assets are downloaded
======================================================================================================*/
$(window).load(function() {

    // Remove loading screen when window is loaded after 1.5 seconds
    setTimeout(function() {
        $('.loading-screen').fadeOut(); // fade out the loading-screen div
    },1500); // 1.5 second delay so that we avoid the 'flicker' of the loading screen showing for a split second and then hiding immediately when its not needed

    // Call function for Google Maps
    $('.restaurantPopUp').on('show.bs.modal', function (e) {
        // Call function for Google Maps when a modal is opened
        setTimeout(function() {
            loadGoogleMap();
        },300);   
    });

});

/*==================================================
Any JS inside $(function() runs when jQuery is ready
====================================================*/

$(window).resize(function() {
    matchCarouselHeight();
});

/*==================================================
Any JS inside $(function() runs when jQuery is ready
====================================================*/
$(function() {
    "use strict";

    matchCarouselHeight();

    //Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-shrink',
        offset: 85
    })

    // Closes the Responsive Menu on Menu Item Click
    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    // Smooth scrolling links - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);

        if ( $anchor.hasClass('header-scroll') ) {
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
        }
        else{
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 75
            }, 1500, 'easeInOutExpo');
        }
        event.preventDefault();
    });

    new WOW().init();
});
