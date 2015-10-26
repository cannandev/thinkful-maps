(function () {

  var map;

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/336431628/media/recent/?access_token=829290775.5f79be6.e09d3652a36f42cea5f8426426d844f8",
    success: function(data) {
      buildList(data.data);
      console.log('building list...');
    }
    //@todo fail: error message
  });   

  function showDetail(){
    $('#map-canvas').animate({'height': 300});
    $('.details').fadeIn('slow');
  }

  function buildList(data){
    var list = $('#location-select');
    for(var i = 0; i < data.length; i++){
      list.append('<option value="' + i + '">' + data[i].location.name + '</option>');
      var latLong = {lat: data[i].location.latitude, lng: data[i].location.longitude};
      var thumb = data[i].images.thumbnail;
      var imageInfo = {
        url: data[i].images.standard_resolution.url, 
        name: data[i].location.name, 
        likes: data[i].likes.count,
        comments: data[i].comments.count,
        date: data[i].created_time,
      };
      addMarker(i, latLong);
      addThumb(i, thumb);
      addDetails(i, imageInfo);
    }
    list[0].selectedIndex = 0;
  }

  function addDetails(index, info){
    $('.image-wrapper img').attr({'src': info.url, 'alt': info.name});
    $('.image-wrapper .likes').text(info.likes + ' likes');
    $('.image-wrapper .comments').text(info.comments + ' comments');

    // var lapse = Date.now() - this.date[index];
    var date = new Date(parseInt(info.date) * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $('.image-wrapper .date').text('Last visited on ' + months[date.getMonth()] + ' ' + date.getDate());    
  }

  function addThumb(index, image){
    //console.log('thumb: '+ image);
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
      showDetail();
    });
  }

  function codeAddress(){
    var locations = $('#location-select').length;
  	var current = $('#location-select').find('option:selected').text();

    for (var i=0; i<locations; i++){
      if(locations.name[i] === current){
        map.setCenter(locations.latLong[i]);
        showDetail();
      }
    }
  }

  function initMap() {
  	var start = {lat: -34.397, lng: 150.644};

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: start,
      scrollwheel: false,
      zoom: 2,
    });
    console.log('map initialized...');
  }

  $(document).ready(function(){
  	initMap();
  	$('#location-select').change(function(){
  		$('#map-canvas').animate({'height': 500});
      codeAddress();
  	});	
  });
})();

