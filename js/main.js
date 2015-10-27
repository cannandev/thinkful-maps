(function () {

  var map;

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/336431628/media/recent/?access_token=829290775.5f79be6.e09d3652a36f42cea5f8426426d844f8",
    success: function(data) {
      var d = data.data;
      buildList(d);
      for(var i=0; i<d.length; i++){
        var latLong = {
          lat: d[i].location.latitude, 
          lng: d[i].location.longitude
        };
        var imageInfo = {
          url: d[i].images.standard_resolution.url, 
          name: d[i].location.name, 
          likes: d[i].likes.count,
          comments: d[i].comments.count,
          date: d[i].created_time,
        };
        
        addThumb(d[i].images.thumbnail);
        addMarker(i, latLong);
        addDetails(imageInfo);      
      }
    }
    //@todo fail: error message
  });   

  function buildList(data){
    var list = document.getElementById('location-select');
    list.innerHTML = '';
    for(var i = 0; i < data.length; i++){
      var option = document.createElement('option');
      var latLong = {
        name: data[i].location.name, 
        lat: data[i].location.latitude, 
        lng: data[i].location.longitude
      };

      option.text = data[i].location.name;
      option.value = i;
      list.appendChild(option);
      $(list).on('change', latLong, centerLocation);
      /* See http://api.jquery.com/on/#passing-data */
    }
    list[0].selectedIndex = 0;
  }

  function centerLocation(event){
    var current = $('#location-select').find('option:selected').text();
    if(event.data.name === current){
      map.setZoom(10);
      map.setCenter(event.data);
      console.log(event.data);      
    }
  }  

  function addDetails(info){
    var date = new Date(parseInt(info.date) * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var detail = $('.image-wrapper.template').clone().removeClass('template');
    detail.find('img').attr({'src': info.url, 'alt': info.name});
    detail.find('.likes').text(info.likes + ' likes');
    detail.find('.comments').text(info.comments + ' comments');
    detail.find('.date').text('Last visited on ' + months[date.getMonth()] + ' ' + date.getDate());    

    $('.image-slider').append(detail);
  }

  function addThumb(image){
    //console.log('thumb: '+ image);
  }

  function addMarker(index, location){
    var marker = new google.maps.Marker({
      map: map,
      position: location,
      title: 'Click for image',
      index: index,
    });

    var details = $('.details .image-wrapper');

    marker.addListener('click', function() {
      map.setZoom(10);
      map.setCenter(marker.getPosition());
      $(details[marker.index]).addClass('active');
      $('#map-canvas').animate({'height': 300});
      $('.details').fadeIn('slow');

    });
  }

  function initMap() {
  	var start = {lat: 31.9639977, lng: 35.90654797};
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: start,
      scrollwheel: false,
      zoom: 3,
    });
  }

  $(document).ready(function(){
  	initMap();
  	$('#location-select').change(function(){
  		$('#map-canvas').animate({'height': 800});
  	});
  });
})();

