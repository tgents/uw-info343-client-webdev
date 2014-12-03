// List of Seattle Traffic Cameras
// http://data.seattle.gov/resource/65fc-btcc.json

"use strict";

//put your code here to create the map, fetch the list of traffic cameras
//and add them as markers on the map
//when a user clicks on a marker, you should pan the map so that the marker
//is at the center, and open an InfoWindow that displays the latest camera
//image
//you should also write the code to filter the set of markers when the user
//types a search phrase into the search box

$(document).ready(function(){
	var mapElem = document.getElementById('map');
	var map = new google.maps.Map(mapElem, {
		center: {lat: 47.6, lng:-122.3},
		zoom: 12
	});
	var infoWindow = new google.maps.InfoWindow();
	
	$.getJSON("http://data.seattle.gov/resource/65fc-btcc.json", function(data){
			data.forEach(function(cam){
				var marker = new google.maps.Marker({
					position: {lat:Number(cam.location.latitude), lng:Number(cam.location.longitude)},
					map: map,
					animation: google.maps.Animation.DROP
				});

				google.maps.event.addListener(marker, 'click', function(){
					map.panTo(this.getPosition());
					infoWindow.setContent('<h2>'+cam.cameralabel+'</h2> <img src="'+cam.imageurl.url+'"/>');
					infoWindow.open(map, this);
				});

				$('#search').bind('search keyup', function() {
					if(cam.cameralabel.toLowerCase().indexOf($('#search').val().toLowerCase()) != -1){
						marker.setMap(map);
					}else{
						marker.setMap(null);
					}
				});

				google.maps.event.addListener(map, 'click', function() {
                   infoWindow.close();
                });
			})
		})
		.fail(function(error) {
            console.log(error);
        });
});