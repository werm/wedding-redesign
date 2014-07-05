_.templateSettings = {
  interpolate : /\{\{(.+?)\}\}/g
};



  var modalForm = '[id^=modal_form]';

  App = {
    loading: function(){
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
        $('.timeline-body p').each(function(){
          $(this).notebook();
        });
        $('.timeline li:odd').addClass('timeline-inverted');
      });
    },

    modalLoaded: function(){
      $(modalForm).each(function(){
        $(this).on('loaded.bs.modal', function(){
          Bootsy.init()
        });
      });
    },

    init: function(){
      App.loading()
      // App.loadTimeline()
      Bootsy.init()
      App.modalLoaded()
    }
  } //App

$(window).load(function(){
  App.init()
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

  $(document).on('submit', '[id^=edit_story]', function(e){
    e.preventDefault();
    var id = $('form[id^=edit_story]').attr('id');
    var storyId = id.split('_')[2];
    App.modalFormSubmit('/stories/' + storyId, 'PUT', modalForm);
    $('#timelineContainer').empty();
    App.loadTimeline()
  });

  $('.timeline-body p').each(function(){
    $(this).notebook();
  });
  $('.timeline li:odd').addClass('timeline-inverted');


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

