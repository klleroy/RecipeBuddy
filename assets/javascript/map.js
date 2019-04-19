var map;
var service;
var infowindow;

//function initialize() {
$("#map-btn").on("click", function () {
    var msg = "Please fix errors in: "
    var err = false;
    $("#zip-input").removeClass("input-issue");
    $("#state-input").removeClass("input-issue");
    $("#city-input").removeClass("input-issue");
    $("#err-msg").remove();


    var geocoder = new google.maps.Geocoder();
    var address = $("#address-input").val();
    if (address == "") {
        //$("#city-input").addClass("input-issue");
        msg = msg + "address ";
        err = true;
    }

    var street = $("#street-input").val();
    if (street == "") {
        //$("#city-input").addClass("input-issue");
        msg = msg + "street ";
        err = true;
    }

    var city = $("#city-input").val();
    if (!char_input(city)||city =="") {
        //$("#city-input").addClass("input-issue");
        msg = msg + "city ";
        err = true;
    }

    var state = $("#state-input").val();
    if (!is_state(state)) {
        //$("#state-input").addClass("input-issue");
        msg = msg + "state ";
        err = true;
    }

    var zip = $("#zip-input").val();
    if (!numeric_input(zip)||zip.length != 5) {
        //$("#zip-input").addClass("input-issue");
        msg = msg + "zip ";
        err = true;
    }

    if(err){
        $(".form-group").append("<h4 class='card-title' id='err-msg'>"+ msg+ "</h4>");
        return false;
    }
    
    $(".google-map-small").addClass("google-map-tall");
    $(".google-map-small").removeClass("google-map-small");
    address = address + "+" + street + "+" + city + "+" + state + "+" + zip;
    var queryUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyBoFTlFdN-ElAc6fnn-M8hagD8cU0Lem38"
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway+Mountain+View,+CA&key=YOUR_API_KEY
    var center;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var lat = response.results[0].geometry.location.lat;
        var lng = response.results[0].geometry.location.lng;
        center = new google.maps.LatLng(lat, lng)
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

    function numeric_input(this_number) {
        value = true;
        var i = 0;

        for (i = 0; i < this_number.length; i++) {
            if (isNaN(parseInt(this_number[i]))) {
                value = false;
                break;
            }
        }
        return value;
    }

    function is_state(this_state) {
        var states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL","GA","HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH","OK","OR","PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI", "VA", "WA", "WV", "WI", "WY"]
        if (states.indexOf(this_state.toUpperCase()) > -1) {
            return true;
        } else {
            return false;
        }
    }

    function char_input(this_char) {
        value = true;
        var i = 0;

        for (i = 0; i < this_char.length; i++) {
            if (parseInt(this_char[i])> -1) {
                value = false;
                break;
            }
        }
        return value;
    }

});
//google.maps.event.addDomListener(window, 'load', initialize);
