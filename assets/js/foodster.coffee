#=============================================
#Booking Form
#==============================================

# additional error messages or events
# prevent default submit behaviour
# get values from FORM

# Success message

#clear all fields

# Fail message

#clear all fields

#============================================
#Contact Map
#==============================================
loadGoogleMap = ->
  mapPoint =
    lat: 53.48
    lng: -2.24
    zoom: 17
    infoText: "<p>55 Mosley Street                                <br/>Manchester                                <br/>M2 3HY</p>"
    linkText: "View on Google Maps"
    mapAddress: "55 Mosley Street, Manchester, M2 3HY"
    icon: "assets/images/map_pin.png"

  if $("#restaurant_map").length
    map = undefined
    mapstyles = [stylers: [saturation: -100]]
    infoWindow = new google.maps.InfoWindow
    pointLatLng = new google.maps.LatLng(mapPoint.lat, mapPoint.lng)
    mapOptions =
      zoom: mapPoint.zoom
      center: pointLatLng
      zoomControl: true
      panControl: false
      streetViewControl: false
      mapTypeControl: false
      overviewMapControl: false
      scrollwheel: false
      styles: mapstyles

    map = new google.maps.Map(document.getElementById("restaurant_map"), mapOptions)
    marker = new google.maps.Marker(
      position: pointLatLng
      map: map
      title: mapPoint.linkText
      icon: mapPoint.icon
    )
    mapLink = "https://www.google.com/maps/preview?ll=" + mapPoint.lat + "," + mapPoint.lng + "&z=14&q=" + mapPoint.mapAddress
    html = "<div class=\"infowin\">" + mapPoint.infoText + "<a href=\"" + mapLink + "\" target=\"_blank\">" + mapPoint.linkText + "</a>" + "</div>"
    google.maps.event.addListener marker, "mouseover", ->
      infoWindow.setContent html
      infoWindow.open map, marker
      return

    google.maps.event.addListener marker, "click", ->
      window.open mapLink, "_blank"
      return

  return
  
#============================================
#Match height of header carousel to window height
#==============================================
matchCarouselHeight = ->
  
  # Adjust Header carousel .item height to same as window height
  wH = $(window).height()
  $("#hero-carousel .item").css "height", wH
  return
$ ->
  $("input,textarea").jqBootstrapValidation
    preventSubmit: true
    submitError: ($form, event, errors) ->

    submitSuccess: ($form, event) ->
      event.preventDefault()
      name = $("input#first_name1").val() + " " + $("input#last_name1").val()
      email = $("input#email1").val()
      phone = $("input#phone1").val()
      reservDate = $("input#reserv_date1").val()
      numGuests = $("input#numb_guests1").val()
      altDate = $("input#alt_reserv_date1").val()
      bookingTime = $("input#time1").val()
      message = $("textarea#message").val()
      $.ajax
        url: "././assets/php/mail/booking.php"
        type: "POST"
        data:
          name: name
          phone: phone
          email: email
          reservDate: reservDate
          numGuests: numGuests
          altDate: altDate
          bookingTime: bookingTime
          message: message

        cache: false
        success: ->
          $("#success").html "<div class='alert alert-success'>"
          $("#success > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append "</button>"
          $("#success > .alert-success").append "<strong>Your booking has been submitted. </strong>"
          $("#success > .alert-success").append "</div>"
          $("#contactForm").trigger "reset"
          return

        error: ->
          $("#success").html "<div class='alert alert-danger'>"
          $("#success > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append "</button>"
          $("#success > .alert-danger").append "<strong>Sorry, the mail server is not responding. Please try again later!"
          $("#success > .alert-danger").append "</div>"
          $("#contactForm").trigger "reset"
          return

      return

    filter: ->
      $(this).is ":visible"

  $("a[data-toggle=\"tab\"]").click (e) ->
    e.preventDefault()
    $(this).tab "show"
    return

  $("#hero-carousel").on "slide.bs.carousel", ->
    matchCarouselHeight()
    return

  return


#============================================
#Any JS inside the $(document).scroll function is called when the page is scrolled
#==============================================
$(document).scroll ->
  $("nav").addClass "navbar-shrink"  if $(this).scrollTop() >= $("header").position().top
  $("nav").removeClass "navbar-shrink"  if $(window).scrollTop() < $("header").height() + 1
  return


#====================================================================================================
#Any JS inside $(window).load function is called when the window is ready and all assets are downloaded
#======================================================================================================
$(window).load ->
  
  # Remove loading screen when window is loaded after 1.5 seconds
  setTimeout (->
    $(".loading-screen").fadeOut() # fade out the loading-screen div
    return
  ), 1500 # 1.5 second delay so that we avoid the 'flicker' of the loading screen showing for a split second and then hiding immediately when its not needed
  
  # Call function for Google Maps
  $(".restaurantPopUp").on "show.bs.modal", (e) ->
    
    # Call function for Google Maps when a modal is opened
    setTimeout (->
      loadGoogleMap()
      return
    ), 300
    return

  return


#==================================================
#Any JS inside $(function() runs when jQuery is ready
#====================================================
$(window).resize ->
  matchCarouselHeight()
  return


#==================================================
#Any JS inside $(function() runs when jQuery is ready
#====================================================
$ ->
  "use strict"
  matchCarouselHeight()
  
  #Highlight the top nav as scrolling occurs
  $("body").scrollspy
    target: ".navbar-shrink"
    offset: 85

  
  # Closes the Responsive Menu on Menu Item Click
  $(".navbar-collapse ul li a").click ->
    $(".navbar-toggle:visible").click()
    return

  
  # Smooth scrolling links - requires jQuery Easing plugin
  $("a.page-scroll").bind "click", (event) ->
    $anchor = $(this)
    if $anchor.hasClass("header-scroll")
      $("html, body").stop().animate
        scrollTop: $($anchor.attr("href")).offset().top
      , 1500, "easeInOutExpo"
    else
      $("html, body").stop().animate
        scrollTop: $($anchor.attr("href")).offset().top - 75
      , 1500, "easeInOutExpo"
    event.preventDefault()
    return

  new WOW().init()
  return
