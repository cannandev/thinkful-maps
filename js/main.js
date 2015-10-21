var geocoder;
var map;

function addMarker(location){
  var marker = new google.maps.Marker({
      'map': map,
      'position': location,
      'title': 'Click for images',
  });
  
  marker.addListener('click', function() {
    map.setZoom(10);
    map.setCenter(marker.getPosition());
    map.showImages();
  });
}

function codeAddress(){
	var address = $('#location-select').find('option:selected').text();
	var latLong = {
		'address': address,
	};	

	geocoder.geocode(latLong, function(results, status){
   if (status === google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
			addMarker(results[0].geometry.location);     
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }		
	});		
}

/* Below function will cause a OVER_QUERY_LIMIT error. */
// function setMarkers(){
// 	var addrs = $('#location-select option').text();
// 	for(var i=0; i<addrs.length; i++){
// 		codeAddress(addrs[i]);
// 	}
// }

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

  // setMarkers();
  codeAddress();

}

$(document).ready(function(){
	initMap();
	$('#location-select').change(function(){
		codeAddress();
	});	
});