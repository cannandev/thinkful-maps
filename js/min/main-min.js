function getImages(){var e="https://api.instagram.com/v1/users/self/media/recent?",o={client_id:"5f79be679d5a459ab4c98dfe864968d9"};$.getJSON(e,o,function(e,o){console.log("textStatus: "+o),console.log("data:"+e)})}function addMarker(e){var o=new google.maps.Marker({map:map,position:e,title:"Click for images"});o.addListener("click",function(){map.setZoom(10),map.setCenter(o.getPosition()),map.showImages()})}function codeAddress(){var e=$("#location-select").find("option:selected").text(),o={address:e};geocoder.geocode(o,function(e,o){o===google.maps.GeocoderStatus.OK?(map.setCenter(e[0].geometry.location),addMarker(e[0].geometry.location)):alert("Geocode was not successful for the following reason: "+o)})}function initMap(){var e={lat:-34.397,lng:150.644};geocoder=new google.maps.Geocoder,map=new google.maps.Map(document.getElementById("map-canvas"),{center:e,scrollwheel:!1,zoom:12,showImages:function(){console.log("here are the images...")}}),codeAddress()}var geocoder,map,images;$(document).ready(function(){initMap(),getImages(),$("#location-select").change(function(){codeAddress()})});