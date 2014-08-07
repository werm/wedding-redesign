_.templateSettings = {
    evaluate:    /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape:      /\{\{-(.+?)\}\}/g
};

  var modalForm = '.modal';
  var biosLoaded;

  var loadingDiv = '<div class="loading"><div class="icon-container"><i class="fa fa-refresh fa-spin"></i></div></div>'

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
          // $('.loading').hide();
        });
      }
    },

    modalFormSubmit: function(url, type){
      var data = $( ":input" ).serializeArray();
      $.ajax({
        url: url,
        type: type,
        dataType: 'JSON',
        data: data,
        success: function(data){
          if(data.status === 'ok'){
            console.log(data)
            $('.modal.in').modal('hide');
          }
        }
      })
      .done(function(data){
        $('.modal-backdrop').remove()
      });
    },

    loadBios: function(){
      $.get('/biographies.json', function(bios){
        var template = $('#bioTemplate').html();
        $('#remoteBio').html(_.template(template, { bios: bios }));
        Bootsy.init()
        $('.pop').each(function(){
          $(this).popover({ 
            html: true,
            trigger: 'hover'
          });
        });
      });
    },

    loadTimeline: function(){
      if($('.timeline-badge').length < 0){
        $('#timelineRemote').empty()
      }
      $.get('/stories.json', function(stories){
        var template = $('#timelineTemplate').html();
        $('#timelineRemote').html(_.template(template, { stories: stories }));
      })
        .done(function(){
          $('.timeline li:odd').addClass('timeline-inverted');
          App.modalLoaded()
          Bootsy.init()
        });
    },

    loadDetails: function(){
      if($('#details').isOnScreen() && mapsLoaded !== true){
        Map.load()
      }
    },

    loadMail: function(){
      // $('#contact-us').load('/contacts/new');
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

    getFancy: function(){
      $('body').append('<div class="toast">' +
          '<div class="toasty"><img src="http://i.imgur.com/0Z7WPpe.gif" class="img-responsive"><br>' +
          '<button id="noFancy" class="btn btn-primary btn-lg center-block hide">Go away!</button></div></div>');
      $('#fancy, #noFancy').toggleClass('hide');
    },

    konami: function(){
      var konamiCodeArray = [],
          konamiCodeKey = '38,38,40,40,37,39,37,39,66,65';
      $(document).keydown(function(e) {
          konamiCodeArray.push(e.keyCode);
          if (konamiCodeArray.toString().indexOf(konamiCodeKey) >= 0) {
            App.getFancy()
            konamiCodeArray = [];
          }
      });
    },

    smoothScroll: function(){
      $('.smoothScroll').smoothScroll();
      $('.hotel').on('click', function() {
        $.smoothScroll({
          offset: -10,
          // scrollElement: $('div.scrollme'),
          scrollTarget: '#detailshotel'
        });
          return false;
        });
        $('.attire').on('click', function() {
          $.smoothScroll({
            offset: -10,
            // scrollElement: $('div.scrollme'),
            scrollTarget: '#details_attire'
          });
            return false;
          });
          $('.registry').on('click', function() {
            $.smoothScroll({
              offset: -10,
              // scrollElement: $('div.scrollme'),
              scrollTarget: '#details_registry'
            });
        return false;
      });
    },

    init: function(){
      // App.loading()
      App.loadBios()
      App.loadTimeline()
      Bootsy.init()
      App.loadMail()
      App.modalLoaded()
      App.svgFallback()
      App.konami()
      App.smoothScroll()
      $('.embiggen').bigtext();
    }
  } //App

Submit = {
  contact: function(){
    var contactData = $('#new_contact').serializeArray();
    $.ajax({
      url: '/contacts' + "?&authenticity_token=" + AUTH_TOKEN,
      type: 'POST',
      dataType: 'json',
      data: contactData,
      success: function(data){
        console.log(data.responseText)
        if(data.message === "success"){
          $('#new_contact fieldset').fadeOut(500);
          $('#new_contact fieldset').promise().done(function(){
            $('.successMessage').append('<img class="img-responsive" src="/assets/thanks.jpg">')
          });
        }
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR)
        console.log(textStatus)
        console.log(errorThrown)
      }
    });
  }
}

$(window).load(function(){
  App.init()
  $('#content').css({
    'opacity': '100'
  });
  $('.loading').hide();
  App.loadDetails();
});

$(window).on('scroll', function(){
  App.loadDetails();
});

var oldSrc;

$(function(){
  $('body').append(loadingDiv);
  $("img").mouseover(function(){
    oldSrc = $(this).attr('src');
    $(this).attr("src", $(this).data('newImg'));
  })
  .mouseout(function() {
     $(this).attr("src", oldSrc);
  });
});

$(document).on('click', '#noFancy', function(e){
  e.preventDefault()
  $('.toast').remove();
  $('#fancy, #noFancy').toggleClass('hide');
});

// Menu settings
$(document).on('click', '#menuToggle, .menu-close', function(){
  $('#menuToggle').toggleClass('active');
  $('body').toggleClass('body-push-toleft');
  $('#theMenu').toggleClass('menu-open');
});

var submitted = false;

$('#new_contact').submit(function(e){
  e.preventDefault();
  Submit.contact();
});

$(document).on('submit', '#new_story', function(e){
  e.preventDefault();
  App.modalFormSubmit('/stories', 'POST');
});

$(document).on('submit', '[id^="edit_story"]', function(e){
  e.preventDefault();
  id = $(this).attr('id').split('_')[2]
  App.modalFormSubmit('/stories/' + id, 'PUT');
  App.loadTimeline();
});

$(document).on('submit', '[id^="edit_biography"]', function(e){
  e.preventDefault();
  id = $(this).attr('id').split('_')[2]
  App.modalFormSubmit('/biographies/' + id, 'PUT');
  App.loadBios()
});

$('.timeline li:odd').addClass('timeline-inverted');