$(document).ready(function() {

	//Time between marker refreshes
	var INTERVAL = 2000;
	
	//Used to remember markers
	var markerStore = {};
	
	var myLatlng = new google.maps.LatLng(30.2353412,-92.010498);
    var myOptions = {
        zoom: 13,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
        var icons = {
          parking: {
            icon: iconBase + 'parking_lot_maps.png'
          },
          library: {
            icon: iconBase + 'library_maps.png'
          },
          info: {
            icon: iconBase + 'info-i_maps.png'
          }
        };

	getMarkers();	

	function getMarkers() {
		console.log('getMarkers');
		$.get('/markers', {}, function(res,resp) {
			console.dir(res);
			for(var i=0, len=res.length; i<len; i++) {

				//Do we have this marker already?
				if(markerStore.hasOwnProperty(res[i].id)) {
					console.log('just funna move it...');
					markerStore[res[i].id].setPosition(new google.maps.LatLng(res[i].position.lat,res[i].position.long));
				} else {
					// var marker = new google.maps.Marker({
					// 	position: new google.maps.LatLng(res[i].position.lat,res[i].position.long),
					// 	title:res[i].name,
					// 	icon: {
					// 		path: SQUARE_PIN,
					// 		fillColor: '#00CCBB',
					// 		fillOpacity: 1,
					// 		strokeColor: '',
					// 		strokeWeight: 0
					// 	},
					// 	map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>',
					// 	map:map
					// });	
					// 
					var marker = new mapIcons.Marker({
						map: map,
						position: new google.maps.LatLng(res[i].position.lat,res[i].position.long),
						title:res[i].name,
						icon: {
							path: mapIcons.shapes.SQUARE_PIN,
							fillColor: '#00CCBB',
							fillOpacity: 1,
							strokeColor: 'red',
							strokeWeight: 0
						},
						map_icon_label: '<span class="map-icon map-icon-motobike-trail"></span>'
					});
					markerStore[res[i].id] = marker;



					console.log(marker.getTitle());
				}
			}
			window.setTimeout(getMarkers,INTERVAL);
		}, "json");
	}
	
})
