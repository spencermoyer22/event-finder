var searchEvents = function () {
    var city= $("#city").val();
    var artist = $("#classification").val();
    var eventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=5&city=" + city + "&keyword=" + artist + "&apikey=PdqnpmjqmNXoPPvjZIEJLzi7YGNzyPic";


    fetch(eventUrl).then(function(response) {
        if(response.ok){
            response.json()
            .then(function(data) {
                console.log(data);

            })
        }
    })
}

$("#form-button").on("click", function() {
    event.preventDefault();

    searchEvents();
})