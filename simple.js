$(document).ready(function() {

	var myLatlng = new google.maps.LatLng(12.9312787,77.68558830000006);
    var myOptions = {
        zoom: 13,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    }

	var map = new google.maps.Map(document.getElementById('map'), myOptions);
});