// var geocoder;
var map;
var locations = {
  name: [],
  latitude: [],
  longitude: [],
};
//dummy data
// var images = $.getScript ("js/imgObj.json");

var images = {
  pagination: {
    next_url: "https://api.instagram.com/v1/users/336431628/media/recent?max_id=1076860697341162914_336431628&client_id=5f79be679d5a459ab4c98dfe864968d9",
    next_max_id: "1076860697341162914_336431628"
  },
  meta: {
    code: 200
  },
  data: [
    {
      attribution: null,
      tags: [],
      location: {
        latitude: 46.559166667,
        name: "Swiss Alps",
        longitude: 8.561388889,
        id: 251375084
      },
      comments: {},
      filter: "Normal",
      created_time: "1445359136",
      link: "https://instagram.com/p/9EQAr6mXZ1/",
      likes: {},
      images: {
        low_resolution: {
          url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e35/12107517_906875396073167_730637494_n.jpg",
          width: 320,
          height: 320
        },
        thumbnail: {
          url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s150x150/e35/12107517_906875396073167_730637494_n.jpg",
          width: 150,
          height: 150
        },
        standard_resolution: {
          url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12107517_906875396073167_730637494_n.jpg",
            width: 640,
            height: 640
        }
      },
      users_in_photo: [ ],
      caption: {},
      type: "image",
      id: "1100074624883455605_336431628",
      user: {
        username: "googlemaps",
        profile_picture: "https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/s150x150/11875412_714080972057676_1731705035_a.jpg",
        id: "336431628",
        full_name: "Google Maps"
      }
    },
    {
      attribution: null,
      tags: [
      "austria",
      "googlemaps"
      ],
      location: {
        latitude: 48.3,
        name: "Linz, Austria",
        longitude: 14.3,
        id: 213122165
      },
      comments: {},
      filter: "Normal",
      created_time: "1445012921",
      link: "https://instagram.com/p/857qKtmXZ_/",
      likes: {},
      images: {
        low_resolution: {
        url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s320x320/e35/12107559_123297081359554_960441800_n.jpg",
        width: 320,
        height: 320
        },
        thumbnail: {
        url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/s150x150/e35/12107559_123297081359554_960441800_n.jpg",
        width: 150,
        height: 150
        },
        standard_resolution: {
          url: "https://scontent.cdninstagram.com/hphotos-xaf1/t51.2885-15/e35/12107559_123297081359554_960441800_n.jpg",
          width: 640,
          height: 640
        }
      },
      users_in_photo: [ ],
      caption: {},
      type: "image",
      id: "1097170366706054783_336431628",
      user: {
        username: "googlemaps",
        profile_picture: "https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/s150x150/11875412_714080972057676_1731705035_a.jpg",
        id: "336431628",
        full_name: "Google Maps"
      }
    },
    {
      attribution: null,
      tags: [
        "googlemaps",
        "barcelona"
      ],
      location: {
        latitude: 41.3833,
        name: "Barcelona, Spain",
        longitude: 2.18333,
        id: 213100244
      },
      comments: {},
      filter: "Normal",
      created_time: "1444933476",
      link: "https://instagram.com/p/83kIS5GXSG/",
      likes: {},
      images: {
        low_resolution: {
        url: "https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/s320x320/e35/10723754_1515738058747178_1141339091_n.jpg",
        width: 320,
        height: 320
        },
        thumbnail: {
        url: "https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/s150x150/e35/10723754_1515738058747178_1141339091_n.jpg",
        width: 150,
        height: 150
        },
        standard_resolution: {
        url: "https://scontent.cdninstagram.com/hphotos-xpa1/t51.2885-15/e35/10723754_1515738058747178_1141339091_n.jpg",
        width: 640,
        height: 640
        }
      },
      users_in_photo: [ ],
      caption: {},
      type: "image",
      id: "1096503934003541126_336431628",
      user: {
        username: "googlemaps",
        profile_picture: "https://igcdn-photos-e-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/s150x150/11875412_714080972057676_1731705035_a.jpg",
        id: "336431628",
        full_name: "Google Maps"
      }
    },    
  ],
};

function getImages(){
	// var url = 'https://api.instagram.com/v1/users/self/media/recent?';
	// var params = {
	// 	access_token: 'ACCESS_TOKEN',
	// };
	// $.getJSON(url, params, function(data, textStatus) {
	// 		console.log('textStatus: ' + textStatus);
	// 		console.log('data:' + data);
	// });
  console.log(images.data[0].images.standard_resolution.url);
}

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

function buildList(){
  var list = $('#location-select');

  for(var i=0; i<images.data.length; i++){
    list.append('<option value="' + i + '">' + images.data[i].location.name + '</option>');
    locations.name.push(images.data[i].location.name);
    locations.latitude.push(images.data[i].location.latitude);
    locations.longitude.push(images.data[i].location.longitude);
  }

  list[0].selectedIndex = 0;
}

function codeAddress(){
	var address = $('#location-select').find('option:selected').text();
	

//instagram locations include latLong. use instead of geocoding
// console.log('results.geometry.location: ' + results[0].geometry.location);
 //  var latLong = {
 //    'address': address,
 //  };
	// geocoder.geocode(latLong, function(results, status){
 //   if (status === google.maps.GeocoderStatus.OK) {
 //      map.setCenter(results[0].geometry.location);
	// 		addMarker(results[0].geometry.location);     
 //    } else {
 //      alert("Geocode was not successful for the following reason: " + status);
 //    }		
	// });		
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
	// geocoder = new google.maps.Geocoder();

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
  buildList();

}

$(document).ready(function(){
	initMap();
	getImages();
	$('#location-select').change(function(){
		// codeAddress();
	});	
});