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
        if (d[i].location) {
          var latLong = {
            lat: d[i].location.latitude, 
            lng: d[i].location.longitude,
            name: d[i].location.name,           
          };
          // var thumb;
          var imageInfo = {
            url: d[i].images.standard_resolution.url, 
            name: d[i].location.name, 
            likes: d[i].likes.count,
            comments: d[i].comments.count,
            date: d[i].created_time,
            link: d[i].link,
          };

          buildList(i, latLong);
          thumbs.push(d[i].images.thumbnail.url);        
          addMarker(latLong);
          addDetails(imageInfo);
        }
      }
      $('.image-wrapper.template').remove();
    }
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
      openDetail(this.selectedIndex-1);
    }
  }  

  function addDetails(info){
    var date = new Date(parseInt(info.date) * 1000);
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var detail = $('.image-wrapper.template').clone().removeClass('template');
    
    detail.find('h3').text(info.name);
    detail.find('img').attr({'src': info.url, 'alt': info.name});
    detail.find('.likes').append(info.likes + ' likes');
    detail.find('.comments').append(info.comments + ' comments');
    detail.find('.date').append('Last booked on ' + months[date.getMonth()] + ' ' + date.getDate());
    detail.find('.social a').attr({'href': info.link, 'target': '_blank'});

    $('.image-slider').append(detail);
  }

  function openDetail(index){
    var details = $('.details .image-wrapper');
    $(details[index]).addClass('active').siblings().removeClass('active');
    $('.intro').fadeOut('slow');
    $('.details').fadeIn('slow');
    $('#map-canvas').animate({'height': 750});    
  }

  function closeDetail(){
    $('.intro').fadeIn('slow');
    $('.details').fadeOut('slow');
    $('#map-canvas').animate({'height': 500});
  }  

  function addMarker(location){
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      position: location,
      title: location.name,
      index: thumbs.length - 1,
    });

    var infowindow = new google.maps.InfoWindow({
      content: '<h4>' + marker.title + '</h4>' +
        '<img src="' + thumbs[marker.index] + '"/>',
      }
    );

    marker.addListener('click', function() {
      map.setCenter(marker.getPosition());
      infowindow.close();      
      openDetail(marker.index);
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
  	var start = {lat: 31.9639977, lng: 35.90654797}; // @todo: latest location
    map = new google.maps.Map(document.getElementById('map-canvas'), {
      center: start,
      scrollwheel: false,
      zoom: 3,
      mapTypeControl: false,
    });
  }

  $(document).ready(function(){
    initMap();
    $('#close-detail').click(function(){
      closeDetail();
    });
  });
})();

