var searchEvents = function () {
    // create variables for fetch url based off input values
    var city= $("#city").val();
    var postalCode = $("#postal-code").val();
    var artist = $("#classification").val();
    var venue = $("#venue").val();

    var eventUrl = "https://app.ticketmaster.com/discovery/v2/events.json?size=10&city=" + city  + "&keyword=" + artist + "+" + venue + "&apikey=PdqnpmjqmNXoPPvjZIEJLzi7YGNzyPic";


    // fetch data from api based on input responses
    fetch(eventUrl).then(function(response) {
        if(response.ok){
            response.json()
            .then(function(data) {
                //send data array to function that will create buttons
                createButtonElements(data);
            })
        }
    })
};

var createButtonElements = function(array) {
    // if no array is created for events then say to enter proper data
    if (!array._embedded) {
        // create modal to display alert
        $("#modal-error").addClass("is-active");
        console.log("Enter correct information");

         // close modal by clicking anywhere in background
        $(".modal-background").on("click", function() {
            $(".modal").removeClass("is-active");
        }) 

        // close modal by clicking x icon
        $(".delete").on("click", function() {
            $(".modal").removeClass("is-active");
        }) 
    }

    // clear old buttons
    $("#button-container").text("");
    // create buttons based on array data
    for (var i = 0; i < array._embedded.events.length; i++) {
        // alter date variable
        var date = array._embedded.events[i].dates.start.localDate;
        
        // alter date in function
        var newDate = formatDate(date);

        // create button element
        $("<button>")
        .attr("id", i)
        .addClass("btn-event button is-light my-1 is-flex is-justify-content-space-between")
        .appendTo("#button-container");

        // create text elements for button
        $("<p>")
        .text(array._embedded.events[i]._embedded.attractions[0].name)
        .addClass("has-text-weight-bold")
        .appendTo("#" + i);

        $("<p>")
        .text(newDate)
        .appendTo("#" + i);
    }

    // open modal on event button click
    $(".btn-event").on("click", function() {
        // create event array index for modal content function
        var index = $(this).attr("id");
        var eventArray = array._embedded.events[index];

        // update modal button id to use as index when getting venue location later
        $(".modal-button").attr("index", index);

        // send index and array to modal content function
        modalContent(index, eventArray);

        // open modal by adding is-active class
        $("#modal-directions").addClass("is-active");
    })

    // close modal by clicking anywhere in background
    $(".modal-background").on("click", function() {
        $(".modal").removeClass("is-active");
    }) 

    // close modal by clicking x icon
    $(".delete").on("click", function() {
        $(".modal").removeClass("is-active");
    }) 

    // save address and venue to local storage for directions api
    $(".modal-button").on("click", function() {
    // get address from input value
    var address = $("#address").val();

    // create index from id to get correct event address
    var eventIndex = $(this).attr("index");

    //get venue name with index
    var venueLocation = array._embedded.events[eventIndex]._embedded.venues[0].name;
    
    // create object with origin and destination for directions api
    var directions = {
        origin: address,
        destination: venueLocation
    };

    // save object to localStorage
    localStorage.setItem("address", JSON.stringify(directions));

    // change to search.html page
    location.replace("search.html");
})
};

var modalContent = function(index, eventArray) {

    // give modal elements text content
    $("#event-name").text(eventArray.name);

    $("#venue-name").text(eventArray._embedded.venues[0].name);

    $("#date").text(formatDate(eventArray.dates.start.localDate));
}

var formatDate = function(date) {
    // split date into array and rearrange for correct format
    var newDate = date.split("-")
    var dateFormat = newDate[1] + "-" + newDate[2] + "-" + newDate[0];
    
    return dateFormat;
}

$("#form-button").on("click", function() {
    event.preventDefault();

    searchEvents();
})