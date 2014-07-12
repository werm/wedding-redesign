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
          $('.loading').hide();
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

    init: function(){
      // App.loading()
      App.loadBios()
      App.loadTimeline()
      Bootsy.init()
      App.modalLoaded()
      App.svgFallback()
      App.konami()
      $('.embiggen').bigtext();
    }
  } //App

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

$(function() {
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

$('#hidden_iframe').load(function(){
  if(submitted){
    $('.rsvpForm').hide();
    $('#rsvpwrap').append('<h1>Thanks!</h1>');
    // window.location='http://localhost:3000';
  }
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