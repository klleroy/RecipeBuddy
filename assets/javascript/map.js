var map;
var service;
var infowindow;

//function initialize() {
$("#map-btn").on("click", function () {
    debugger;
    $(".google-map-small").addClass("google-map-tall");
    $(".google-map-small").removeClass("google-map-small");

    var geocoder = new google.maps.Geocoder();
    var address = $("#address-input").val();
    var street = $("#street-input").val();
    var city = $("#city-input").val();
    var state = $("#state-input").val();
    var zip = $("#zip-input").val();

    address = address+"+"+street+"+"+city+"+"+state+"+"+zip;
    var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address="+address+"&key=AIzaSyBoFTlFdN-ElAc6fnn-M8hagD8cU0Lem38"
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway+Mountain+View,+CA&key=YOUR_API_KEY
    var center;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var lat =response.results[0].geometry.location.lat;
        var lng =response.results[0].geometry.location.lng;
        center = new google.maps.LatLng(lat, lng )
        map = new google.maps.Map(document.getElementById('googleMap'), {
            center: center,
            zoom: 12
        });

        var request = {
            location: center,
            radius: '15000',
            type: ['supermarket']
        };

        service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    });

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                createMarker(results[i]);
            }
        }
    }

    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
    }

    /*function getLatLngByZipcode(zipcode) 
    {
        var geocoder = new google.maps.Geocoder();
        var address = zipcode;
        geocoder.geocode({ 'address': address }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                alert("Latitude: " + latitude + "\nLongitude: " + longitude);
            } else {
                alert("Request failed.")
            }
        });
        return [latitude, longitude];
    }  */
});
//google.maps.event.addDomListener(window, 'load', initialize);
