var geocoder;
var map;

function initMap() {
	var start = {lat: -34.397, lng: 150.644};
	geocoder = new google.maps.Geocoder();

  // Create a map object and specify the DOM element for display.
  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: start,
    scrollwheel: false,
    zoom: 12,
    showImages: function(){
    	console.log('here are the images...');
    },
  });

  // Create a marker and set its position.
  codeAddress();

  // var marker = new google.maps.Marker;

  // marker.addListener('click', function() {
  //   map.setZoom(10);
  //   map.setCenter(marker.getPosition());
  // });
}

function codeAddress(){
	
	var address = $('#location-select').find('option:selected').text();
	var latLong = {
		'address': address,
	};	

	geocoder.geocode(latLong, function(results, status){
   if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          'map': map,
          'position': results[0].geometry.location,
          'title': 'Click for images',
      });
      // Replace with its own function
		  marker.addListener('click', function() {
		    map.setZoom(10);
		    map.setCenter(marker.getPosition());
		    map.showImages();
		  });      
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }		
	});
}

// geocode() converts city to long/lat
// addMarkers() builds array of markers. Pass this array to initMap(). For each marker, add listener

$(document).ready(function(){
	initMap();
	$('#location-select').change(function(){
		codeAddress();
	});	
});