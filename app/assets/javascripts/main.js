_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};

  var modalForm = '[id^=modal_form]';

  App = {
    loading: function(){
      if($('img').length === 0){
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
      }
    },

    modalFormSubmit: function(url, type, el){
      var data = $( ":input" ).serializeArray();
      $.ajax({
        url: url,
        type: type,
        dataType: 'JSON',
        data: data,
        success: function(data){
          $(el).modal('hide');
        }
      });
      return false;
    },

    loadTimeline: function(){
      $('#timelineContainer').load('/stories', function(){
        $('.timeline li:odd').addClass('timeline-inverted');
        $(modalForm).on('loaded.bs.modal', function(){
          Bootsy.init()
        });
        Bootsy.init()
      });
    },

    modalLoaded: function(){
      $(modalForm).each(function(){
        $(this).on('loaded.bs.modal', function(){
          Bootsy.init()
        });
      });
    },

    svgFallback: function(){
      if (!Modernizr.svg) {
        console.log("No SVG");
        $('img[src$=".svg"]').each(function() {
          $(this).attr('src', $(this).data('fallbackImage'));
        });
      } else {
        console.log("Has SVG");
      }
    },

    init: function(){
      App.loading()
      App.loadTimeline()
      Bootsy.init()
      App.modalLoaded()
      App.svgFallback()
      $('.embiggen').bigtext();
    }
  } //App

$(window).load(function(){
  App.init()
  $('#content').css({
    'opacity': '100'
  });
  $('.loading').hide();
});

  // Menu settings
  $(document).on('click', '#menuToggle, .menu-close', function(){
    $('#menuToggle').toggleClass('active');
    $('body').toggleClass('body-push-toleft');
    $('#theMenu').toggleClass('menu-open');
  });

  $(document).on('submit', '#new_story', function(e){
    e.preventDefault();
    App.modalFormSubmit('/stories', 'POST', '#new_story');
  });

  // $('.timeline-body p').each(function(){
  //   $(this).notebook();
  // });
  $('.timeline li:odd').addClass('timeline-inverted');
    

// handler = Gmaps.build('Google');
// handler.buildMap({ provider: {
//   scrollwheel: false
// },
//  internal: {id: 'map'}}, function(){
//   markers = handler.addMarkers([
//     {
//       "lat": 39.951076,
//       "lng":  -83.001306,
//       "picture": {
//         "url": "/assets/map_marker.png",
//         "width":  24,
//         "height": 21
//       },
//       "infowindow": "hello!"
//     }
//   ]);
//   handler.bounds.extendWith(markers);
//   // handler.map.centerOnMarker();
//   handler.fitMapToBounds();
//   handler.getMap().setZoom(13);
// });

