var Map;
var mapsLoaded;

Map = {
  load: function(){
    mapsLoaded = true;
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();

    //set your google maps parameters
    var latitude = 39.951076,
      longitude = -83.001306,
      map_zoom = 14;

    var hi_lat = 39.958724,
        hi_lon = -82.994785;

    //google map custom marker icon - .png fallback for IE11
    var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
    var marker_url = ( is_internetExplorer11 ) ? 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/447/cd-icon-location.png' : 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/447/cd-icon-location.svg';
      
    //define the basic color of your map, plus a value for saturation and brightness
    var main_color = '#2d313f',
      saturation_value= -20,
      brightness_value= 5;

    //we define here the style of the map

    var style= [ 
      {
        //set saturation for the labels on the map
        elementType: "labels",
        stylers: [
          {saturation: saturation_value}
        ]
      },  
        { //poi stands for point of interest - don't show these lables on the map 
        featureType: "poi",
        elementType: "labels",
        stylers: [
          {visibility: "off"}
        ]
      },
      {
        //don't show highways lables on the map
            featureType: 'road.highway',
            elementType: 'labels',
            stylers: [
                {visibility: "off"}
            ]
        }, 
      {   
        //don't show local road lables on the map
        featureType: "road.local", 
        elementType: "labels.icon", 
        stylers: [
          {visibility: "off"} 
        ] 
      },
      { 
        //don't show arterial road lables on the map
        featureType: "road.arterial", 
        elementType: "labels.icon", 
        stylers: [
          {visibility: "off"}
        ] 
      },
      {
        //don't show road lables on the map
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {visibility: "off"}
        ]
      }, 
      //style different elements on the map
      { 
        featureType: "transit", 
        elementType: "geometry.fill", 
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      }, 
      {
        featureType: "poi",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.government",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.sport_complex",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.attraction",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "poi.business",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "transit",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "transit.station",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "landscape",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
        
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.fill",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      }, 
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [
          { hue: main_color },
          { visibility: "on" }, 
          { lightness: brightness_value }, 
          { saturation: saturation_value }
        ]
      }
    ];
      
    directionsDisplay = new google.maps.DirectionsRenderer();
    
    //set google map options
    var map_options = {
          center: new google.maps.LatLng(latitude, longitude),
          zoom: map_zoom,
          panControl: false,
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          scrollwheel: false,
          styles: style
      }
      var hotels_map_options = {
            center: new google.maps.LatLng(hi_lat, hi_lon),
            zoom: map_zoom,
            panControl: false,
            zoomControl: false,
            mapTypeControl: false,
            streetViewControl: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false,
            styles: style
        }
      //inizialize the map
    var map = new google.maps.Map(document.getElementById('google-container'), map_options);

    var hotels_map = new google.maps.Map(document.getElementById('hotels_map_container'), map_options);
    //add a custom marker to the map        
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        visible: true,
        icon: marker_url
    });

    var hi_marker = new google.maps.Marker({
        position: new google.maps.LatLng(hi_lat, hi_lon),
        map: hotels_map,
        visible: true,
        icon: marker_url
    });

    var directionsLink = 'https://www.google.com/maps/dir//95+Liberty+St,+Columbus,+OH+43215/@39.95109,-83.0013082,17z/data=!4m13!1m4!3m3!1s0x88388f48e6434935:0xff30eef6acf4b7f8!2s95+Liberty+St!3b1!4m7!1m0!1m5!1m1!1s0x88388f48e6434935:0xff30eef6acf4b7f8!2m2!1d-83.0013082!2d39.95109'
    var infoContent = '<h4>Vue</h4>' +
      '<p>95 Liberty Street<br>' +
      'Columbus, OH 43215</p>' +
      '<a href="' + directionsLink + '" target="_blank">Directions</a>'

    var infowindow = new google.maps.InfoWindow({
      content: infoContent
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map, marker)
    });

    //add custom buttons for the zoom-in/zoom-out on the map
    function VenueZoomControl(controlDiv, map) {
      //grap the zoom elements from the DOM and insert them in the map 
        var controlUIzoomIn = document.getElementById('venue-zoom-in'),
        controlUIzoomOut = document.getElementById('venue-zoom-out');
        controlDiv.appendChild(controlUIzoomIn);
        controlDiv.appendChild(controlUIzoomOut);

      // Setup the click event listeners and zoom-in or out according to the clicked element
      google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
          map.setZoom(map.getZoom()+1)
      });
      google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
          map.setZoom(map.getZoom()-1)
      });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new CustomZoomControl(zoomControlDiv, map);

      //insert the zoom div on the top left of the map
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
    }
  }