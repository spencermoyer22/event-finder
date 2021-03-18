var directions = document.querySelector("#directions-element");

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    // var directionsLeg = new google.maps.DirectionsLeg;
    //map options 
    var map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 33.428, lng: -111.936 },
      //localStorage.getItem( "", ""),
      zoom: 10
    });

    directionsDisplay.setMap(map);

    var onChangeHandler = function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
     
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        // directionsLeg.route({
        //     distance: "text",
        //     duration: "text"
        // })
        directionsService.route({
            origin: document.getElementById('start').value,
            destination: document.getElementById('end').value,
            travelMode: 'DRIVING'
        }, function (response, status){
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            }else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
