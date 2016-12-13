var newMarker;
var map;

// Add marker(s) to map
var addAnotherMarker = function (marker) {
  var position = new google.maps.LatLng(marker.lat, marker.lng);
  var googleMarker = new google.maps.Marker({
      position: position,
      title: marker.name,
      map: map
  });

  // Bind a popup to the marker
  googleMarker.addListener("click", function () {
      var infoWindow = new google.maps.InfoWindow({
          content: "<h3>" + marker.name + "</h3>" + marker.sport + "</br>" + "Participants: " + marker.participants + "</br>" + "<a class=\"waves-effect waves-light btn\">Join</a>" + "</br>"
      });
      infoWindow.open(map, googleMarker);
  });
};

// Initiate Google Map on page
var initMap = function () {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 40.6,
            lng: -74
        },
        zoom: 10
    });

    // if brower support available, ask user for location data and set the map view
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            map.setCenter(initialLocation);
        });
    }

    // Loop through markers in database and add markers to map
    addMarkers.forEach(function (marker) {
      addAnotherMarker(marker);
    });

    // Click to add marker on map
    google.maps.event.addListener(map, 'click', function(event) {
      if (event.latLng){
        newMarker = event.latLng;
        var inst = $('[data-remodal-id=modal]').remodal();
        inst.open();

        // If OK is clicked
        $(document).on('confirmation', '.remodal', function () {

          var chosenName = $('#inputName').val();
          var chosenSport = $('#inputSport').val();
          var chosenParticipants = $('#inputParticipants').val();

          // Post request.. variables sent to controller
          $.post('http://localhost:3000/',
            {
              name: chosenName,
              sport: chosenSport,
              participants: chosenParticipants,
              lat: newMarker.lat(),
              lng: newMarker.lng()
            }
          ).done(function (marker) {
            addAnotherMarker(marker);
          });

          placeMarker(newMarker);
          $('#inputName').val('');
          $('#inputSport').val('');
          $('#inputParticipants').val('');
        });

        // If cancel is clicked
        $(document).on('cancellation', '.remodal', function () {
          newMarker = "";
          $('#inputName').val('');
          $('#inputSport').val('');
          $('#inputParticipants').val('');
        });

      }
    });

    function placeMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
};
