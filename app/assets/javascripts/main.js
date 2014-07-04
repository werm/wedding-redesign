_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

$(function(){

  $('#content').css({
    'opacity': '0'
  });

  imagesLoaded('#content', function() {
    console.log("Images loaded.");
    $('#content').css({
      'opacity': '100'
    });
    $('.loading').hide();
  });

  $('.timeline-body p').each(function(){
    $(this).notebook();
  });

  // Menu settings
  $(document).on('click', '#menuToggle, .menu-close', function(){
    $('#menuToggle').toggleClass('active');
    $('body').toggleClass('body-push-toleft');
    $('#theMenu').toggleClass('menu-open');
  });

  $('.timeline li:odd').addClass('timeline-inverted');
});
//   $(document).on('click', '#submitTimeline', function(){
//     var story = {
//       icon: $('.icon').val(),
//       title: $('.title').val(),
//       time: $('.time').val(),
//       content: $('.content').val()
//     }
//     $.ajax({
//       url: '/timeline/create',
//       type: 'POST',
//       data: story,
//       dataType: 'JSON',
//       success: function(data){
//         console.log("success");
//         $('.story-form input').each(function(){
//           $(this).val('');
//         });
//       },
//       error: function(jqXHR, status, thrownError) {
//         var responseText = jQuery.parseJSON(jqXHR.responseText);
//         console.log(responseText);
//       }
//     });
//   });

//   $(document).on('click', '#submitUser', function(){
//     var user = {
//       username: $('.username').val(),
//       email: $('.email').val(),
//       password: $('.password').val()
//     }
//     $.ajax({
//       url: '/user/create',
//       type: 'POST',
//       data: user,
//       dataType: 'JSON',
//       success: function(data){
//         console.log("success");
//         $('.user-form input').each(function(){
//           $(this).val('');
//         });
//       },
//       error: function(jqXHR, status, thrownError) {
//         var responseText = jQuery.parseJSON(jqXHR.responseText);
//         console.log(responseText);
//       }
//     });
//   });

//   $(document).on('click', '.deleteStory', function(){
//     var storyId = $(this).data('story-id');
//     $.ajax({
//       url: '/timeline/delete/' + storyId,
//       type: 'DELETE',
//       success: function(){
//         console.log("Deleted");
//       },
//       error: function(jqXHR, status, thrownError) {
//         var responseText = jQuery.parseJSON(jqXHR.responseText);
//         console.log(responseText);
//       }
//     });
//   });

handler = Gmaps.build('Google');
handler.buildMap({ provider: {
  scrollwheel: false
},
 internal: {id: 'map'}}, function(){
  markers = handler.addMarkers([
    {
      "lat": 39.951076,
      "lng":  -83.001306,
      "picture": {
        "url": "/assets/map_marker.png",
        "width":  24,
        "height": 21
      },
      "infowindow": "hello!"
    }
  ]);
  handler.bounds.extendWith(markers);
  // handler.map.centerOnMarker();
  handler.fitMapToBounds();
  handler.getMap().setZoom(13);
});

//   var mapOptions = {
//     zoom: 10,
//     center: new google.maps.LatLng(39.951076, -83.001306),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//   // Draw the map
//   var mapObject = new google.maps.Map(document.getElementById("map"), mapOptions);
  
//   var marker = new google.maps.Marker({
//     position: new google.maps.LatLng(39.951076, -83.001306),
//     map: mapObject,
//     title:"Hello World!"
//   });

//   marker.setMap(mapObject);


// })(jQuery)

// $(window).load(function(){

//   var calendarTemplate = _.template( $('#template-calendar').html() );

//   $('#calendar').clndr({
//     render: function(data) {
//       return calendarTemplate(data);
//     },
//     startWithMonth: "2015-05-01",
//     events: [
//         { date: '2015-05-09', title: 'WEDDING!' }
//       ],
//   });

//   $.stellar({
//     horizontalScrolling: false,
//     verticalOffset: 40
//   });
// });