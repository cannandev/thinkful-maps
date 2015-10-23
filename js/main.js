(function () {
  var map;
  var locations = {
    name: [],
    latLong: [],
    images: [],
    link: [],
    likes: [],
    comments: [],
    date: [],
    setVariables: function(data){
      this.name.push(data.location.name);
      this.latLong.push({lat: data.location.latitude, lng: data.location.longitude});
      this.images.push(data.images.standard_resolution);
      this.link.push(data.link);
      this.likes.push(data.likes.count);
      this.comments.push(data.comments.count);
      this.date.push(data.created_time);      
    },
    showImages: function(index){
      $('#map-canvas').animate({'height': 300});
      $('.details').fadeIn('slow');
      $('.image-wrapper img').attr({'src': this.images[index].url, 'alt': this.name[index]});
      $('.image-wrapper .likes').text(this.likes[index] + ' likes');
      $('.image-wrapper .comments').text(this.comments[index] + ' comments');

      // var lapse = Date.now() - this.date[index];
      var date = new Date(parseInt(this.date[index]) * 1000);
      var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      $('.image-wrapper .date').text('Posted on ' + months[date.getMonth()] + ' ' + date.getDate());
    },
  };

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
        comments: {
          count: 10,
        },
        filter: "Normal",
        created_time: "1445359136",
        link: "https://instagram.com/p/9EQAr6mXZ1/",
        likes: {
          count: 2758,
        },
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
        comments: {
          count: 53,
        },
        filter: "Normal",
        created_time: "1445012921",
        link: "https://instagram.com/p/857qKtmXZ_/",
        likes: {
          count: 4559,
        },
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
        comments: {
          count: 19,
        },
        filter: "Normal",
        created_time: "1444933476",
        link: "https://instagram.com/p/83kIS5GXSG/",
        likes: {
          count: 3007,
        },
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

  // function getImages(){
  // 	var url = 'https://api.instagram.com/v1/users/336431628/media/recent/';
  // 	var params = {
  // 		access_token: '829290775.5f79be6.e09d3652a36f42cea5f8426426d844f8',
  // 	};
  // 	$.getJSON(url, params, function(data, textStatus) {
  // 			console.log('textStatus: ' + textStatus);
  // 			console.log('data:' + data);
  // 	});
  // }

  function buildList(){
    var list = $('#location-select');

    for(var i=0; i<images.data.length; i++){
      list.append('<option value="' + i + '">' + images.data[i].location.name + '</option>');
      locations.setVariables(images.data[i]);
    }

    list[0].selectedIndex = 0;
  }

  function addMarker(index, location){
    var marker = new google.maps.Marker({
        map: map,
        position: location,
        title: 'Click for images',
        index: index,
    });

    marker.addListener('click', function() {
      map.setZoom(10);
      map.setCenter(marker.getPosition());
      locations.showImages(marker.index);
    });
  }

  function codeAddress(){
  	var address = $('#location-select').find('option:selected').text();

    for (var i=0; i<locations.name.length; i++){
      if(locations.name[i] === address){
        map.setCenter(locations.latLong[i]);
        addMarker(i, locations.latLong[i]);
      }
    }
  }

  function initMap() {
  	var start = {lat: -34.397, lng: 150.644};

    // Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: start,
      scrollwheel: false,
      zoom: 6,
    });

    // getImages();
    buildList();
    codeAddress();
  }

  $(document).ready(function(){
  	initMap();
  	$('#location-select').change(function(){
  		$('#map-canvas').animate({'height': 500});
      codeAddress();
  	});	
  });
})();

