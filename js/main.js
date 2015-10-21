function initMap() {
	var loc1 = {lat: -34.397, lng: 150.644};

  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: loc1,
    scrollwheel: false,
    zoom: 12,
  });

  // Create a marker and set its position.
  var marker = new google.maps.Marker({
    map: map,
    position: loc1,
    title: 'Click to show image',
  });

  marker.addListener('click', function() {
    map.setZoom(10);
    map.setCenter(marker.getPosition());
  });  
}

// convertLocation() converts city to long/lat
// addMarkers() builds array of markers. Pass this array to initMap(). For each marker, add listener

$(document).ready(function(){
	initMap();
});