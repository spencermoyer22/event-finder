var directions = document.querySelector("#directions-element");
// var currentLocation = document.querySelector(".your-location");
// var eventLocation = document.querySelector(".event-location");
// var inputValue = document.querySelector(".input-value");
// var inputValueSecond = document.querySelector(".input-value-second");

// var getSearchResults = function(){
//     // grab repo name from url query string
//     localStorage.getItem("", "")
    
//    if(searchResults) {
       
//     repoNameEl.textContent = searchResults;
    
// }else{
//     // if no repo was given, redirect to the homepage
//     document.location.replace("./index.html");
// }
// }


function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
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
// var getDirections = function (){
//     var tucson = "Tucson";
//     var montreal = "Benson";
// fetch("http://maps.googleapis.com/maps/api/directions/json?origin=" + tucson + "&destination=" + montreal + "&key=AIzaSyBBlNIHoJ1O1S0XMqeTTKXXISgTn6y3rbA")
// .then(function(response){
//     response.json().then(function(data){
//         console.log(data);
//     });
// });

// };

// getDirections();


// //Create the script tag, set the appropriate attributes
// var script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/directions/json?origin=toronto&destination=montreal&key=AIzaSyBBlNIHoJ1O1S0XMqeTTKXXISgTn6y3rbA';
// script.async = true;
// // Attach your callback function to the `window` object
// window.initMap = function() {
//   // JS API is loaded and available
  
// };

// // Append the 'script' element to 'head'
// document.body.appendChild(script);