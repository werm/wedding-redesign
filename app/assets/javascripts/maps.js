var Map;
var mapsLoaded;

Map = {
  load: function(){
    mapsLoaded = true;

    L.Map = L.Map.extend({
      openPopup: function(popup) {
          //        this.closePopup();  // just comment this
          this._popup = popup;

          return this.addLayer(popup).fire('popupopen', {
              popup: this._popup
          });
      }
    });

    var latitude = 39.951076,
        longitude = -83.001306,
        hi_lat = 39.958724,
        hi_lon = -82.994785,
        cy_lat = 39.966107,
        cy_lon = -83.002952;

    var venueMap = L.map('venueMap', {
        center: [latitude, longitude],
        zoom: 14,
        scrollWheelZoom: false
    });

    var hotelMap = L.map('hotelsMap', {
        center: [hi_lat, hi_lon],
        zoom: 14,
        scrollWheelZoom: false
    });

    var Acetate_all = L.tileLayer('http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png', {
      attribution: '&copy;2012 Esri & Stamen, Data from OSM and Natural Earth',
      subdomains: '0123',
      scrollWheelZoom: false,
      minZoom: 2,
      maxZoom: 18
    }).addTo(venueMap);

    var Acetate_all = L.tileLayer('http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png', {
      attribution: '&copy;2012 Esri & Stamen, Data from OSM and Natural Earth',
      subdomains: '0123',
      minZoom: 2,
      maxZoom: 18
    }).addTo(hotelMap);

    var venueIcon = {
      icon: 'heart',
      prefix: 'fa',
      markerColor: 'red',
      iconColor: '#fff'
    }

    var hotelIcon = {
      icon: 'building',
      prefix: 'fa',
      markerColor: 'blue',
      iconColor: '#fff' 
    }

    var venueMarker = L.marker([latitude, longitude], {icon: L.AwesomeMarkers.icon(venueIcon)}).addTo(venueMap);
    var venueMarker2 = L.marker([latitude, longitude], {icon: L.AwesomeMarkers.icon(venueIcon)}).addTo(hotelMap);
    var hiMarker = L.marker([hi_lat, hi_lon], {icon: L.AwesomeMarkers.icon(hotelIcon)}).addTo(hotelMap);
    var cyMarker = L.marker([cy_lat, cy_lon], {icon: L.AwesomeMarkers.icon(hotelIcon)}).addTo(hotelMap);

    venueMarker.bindPopup("<strong>Vue</strong><br>95 Liberty Street<br>Columbus, Ohio 43215")
    hiMarker.bindPopup("<strong>Holiday Inn</strong><br>175 East Town Street<br>Columbus, Ohio 43215")
    cyMarker.bindPopup("<strong>Courtyard</strong><br>35 West Spring Street<br>Columbus, Ohio 43215")

    $(document).on('click', '#open_cy', function(e){
      var mapTop = ($('#hotels_map').offset().top + 10);
      $('html, body').animate(
        { scrollTop: (mapTop - 20) + 'px'},{ 
          complete : function(){
            cyMarker.fire('click')
          }
        });
    })

    $(document).on('click', '#open_hi', function(){
      var mapTop = ($('#hotels_map').offset().top + 10);
      $('html, body').animate(
        { scrollTop: (mapTop - 20) + 'px'},{ 
          complete : function(){
            hiMarker.fire('click')
          }
        });
    })
  }
}