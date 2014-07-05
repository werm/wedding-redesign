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
      })
      .done(function(){
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
    var title = $('#story_title').val();
    var icon = $('input:radio[name=story_icon]').filter(":checked").val();
    var time = $('#story_time').val();
    var content = $('#story_content').val();
    <li><div class="timeline-badge"><i class="fa fa-<%= story.icon %>"></i></div>
      <div class="timeline-panel">
        <div class="timeline-heading">
          <h4 class="timeline-title"><%= story.title %></h4>
          <p>
            <% if user_signed_in? %>
              <%= link_to 'Edit', edit_story_path(story), class: 'btn btn-primary btn-xs', :data => {:toggle => 'modal', :target => "#modal_form_edit_story-#{story.id}"} %><%= link_to 'Destroy', story, method: :delete, data: { confirm: 'Are you sure?' } %>
            <% end %>
          </p>
          <p><small class="text-muted"><%= fa_icon "clock-o" %> <%= story.time %></small></p>
        </div>
        <div class="timeline-body">
          <!-- <p class="rest-in-place" data-url="/story/<%= story.id %>" data-formtype="textarea" data-object="story" data-attribute="content"> -->
          <p>
            <%= story.content.html_safe %>
          </p>
        </div>
      </div>
    </li>
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

