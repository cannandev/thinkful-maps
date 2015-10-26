(function () {

  var map;

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/336431628/media/recent/?access_token=829290775.5f79be6.e09d3652a36f42cea5f8426426d844f8",
    success: function(data) {
      console.log('ig loading...');
      buildList(data.data);
      for(var i=0; i<data.data.length; i++){
        var latLong = {lat: data.data[i].location.latitude, lng: data.data[i].location.longitude};
        var imageInfo = {
          url: data.data[i].images.standard_resolution.url, 
          name: data.data[i].location.name, 
          likes: data.data[i].likes.count,
          comments: data.data[i].comments.count,
          date: data.data[i].created_time,
        };        
        addThumb(data.data[i].images.thumbnail);
        addMarker(i, latLong);
        addDetails(imageInfo);      
      }
    }
    //@todo fail: error message
  });   

  function buildList(data){
    var list = document.getElementById('location-select');

    for(var i = 0; i < data.length; i++){
      var option = document.createElement('option');

      option.text = data[i].location.name;
      option.value = i;
      list.appendChild(option);
      list.addEventListener('change', centerLocation, false);
    }
    list[0].selectedIndex = 0;
  }

  function addDetails(info){
    $('.image-wrapper img').attr({'src': info.url, 'alt': info.name});
    $('.image-wrapper .likes').text(info.likes + ' likes');
    $('.image-wrapper .comments').text(info.comments + ' comments');

    var date = new Date(parseInt(info.date) * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    $('.image-wrapper .date').text('Last visited on ' + months[date.getMonth()] + ' ' + date.getDate());    
  }

  function addThumb(image){
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
      $('#map-canvas').animate({'height': 300});
      $('.details').fadeIn('slow');   
    });
  }

  function centerLocation(event, location){
    event.preventDefault();
  	// var current = $('#location-select').find('option:selected').text();
    map.setZoom(10);
    map.setCenter(location);
  }

  function initMap() {
  	var start = {lat: 34.397, lng: 150.644};

    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: start,
      scrollwheel: false,
      zoom: 3,
    });
    console.log('map initialized...');
  }

  $(document).ready(function(){
  	initMap();
  	$('#location-select').change(function(){
  		$('#map-canvas').animate({'height': 500});
  	});
  });
})();

