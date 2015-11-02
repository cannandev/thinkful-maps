(function () {

  var map;
  var thumbs = [];

  $.ajax({
    type: "GET",
    dataType: "jsonp",
    cache: false,
    url: "https://api.instagram.com/v1/users/336431628/media/recent/?access_token=829290775.5f79be6.e09d3652a36f42cea5f8426426d844f8",
    success: function(data) {
      var d = data.data;
      for(var i=0; i<d.length; i++){
        var latLong = {
          lat: d[i].location.latitude, 
          lng: d[i].location.longitude,
          name: d[i].location.name,           
        };
        var imageInfo = {
          url: d[i].images.standard_resolution.url, 
          name: d[i].location.name, 
          likes: d[i].likes.count,
          comments: d[i].comments.count,
          date: d[i].created_time,
        };

        buildList(i, latLong);
        thumbs.push(d[i].images.thumbnail.url);        
        addMarker(i, latLong);
        addDetails(imageInfo);      
      }
      $('.image-wrapper.template').remove();
    }
    //@todo fail: error message
  });   

  function buildList(index, location){
    var list = document.getElementById('location-select');
    var option = document.createElement('option');

    option.text = location.name;
    option.value = index;
    list.appendChild(option);
    list.selectedIndex = 0;

    $(list).on('change', location, centerLocation);
    /* See http://api.jquery.com/on/#passing-data */
    
  }

  function centerLocation(event){
    var current = $('#location-select').find('option:selected').text();
    if(event.data.name === current){
      map.setCenter(event.data);
    }
  }  

  function addDetails(info){
    var date = new Date(parseInt(info.date) * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var detail = $('.image-wrapper.template').clone().removeClass('template');
    detail.find('img').attr({'src': info.url, 'alt': info.name});
    detail.find('.likes').text(info.likes + ' likes');
    detail.find('.comments').text(info.comments + ' comments');
    detail.find('.date').text('Last booked on ' + months[date.getMonth()] + ' ' + date.getDate());    

    $('.image-slider').append(detail);
  }

  function addMarker(index, location){
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      position: location,
      title: location.name,
      index: index,
    });

    var infowindow = new google.maps.InfoWindow({
      content: '<h4>' + marker.title + '</h4>' +
        '<img src="' + thumbs[marker.index] + '"/>',
      }
    );

    marker.addListener('click', function() {
      var details = $('.details .image-wrapper');      
      map.setCenter(marker.getPosition());
      infowindow.close();      
      $(details[marker.index]).addClass('active').siblings().removeClass('active');
      $('#map-canvas').animate({'height': 300});
      $('.image-slider').fadeIn('slow');
    });
    marker.addListener('mouseover', function(){
      infowindow.setZIndex(1000);
      infowindow.open(map, marker);
    });
    marker.addListener('mouseout', function(){
      infowindow.close();
    });
  }

  function initMap() {
  	var start = {lat: 31.9639977, lng: 35.90654797};
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: start,
      scrollwheel: false,
      zoom: 3,
      mapTypeControl: false,
    });
    // map.addListener('bounds_changed', 'resize');
  }

  $(document).ready(function(){
  	initMap();
  	$('#location-select').change(function(){
  		$('#map-canvas').animate({'height': 800});
  	});
    $('.image-slider-arrows.right').click(function(){
      $('.image-wrapper.active').removeClass('active').next().addClass('active');
    });
    $('.image-slider-arrows.left').click(function(){
      $('.image-wrapper.active').removeClass('active').prev().addClass('active');
    });    
  });
})();

