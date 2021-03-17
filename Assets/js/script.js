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
    console.log(array);
    // if no array is created for events then say to enter proper data
    if (!array._embedded) {
        // create modal to display alert
        console.log("Enter correct information");
    }

    // clear old buttons
    $("#button-container").text("");
    // create buttons based on array data
    for (var i = 0; i < array._embedded.events.length; i++) {
        // alter date variable
        var date = array._embedded.events[i].dates.start.localDate;
        var newDate = date.split("-")
        var dateFormat = newDate[1] + "-" + newDate[2] + "-" + newDate[0];

        console.log(array._embedded.events[i]._embedded.venues[0].name);
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
        .text(dateFormat)
        .appendTo("#" + i);
    }

    // open modal on event button click
    $(".btn-event").on("click", function() {
        // create index for modal content function
        var index = $(this).attr("id");

        // send index and array to modal content function
        modalContent(index, array);

        $(".modal").addClass("is-active");
    })

    // close modal
    $(".modal-background").on("click", function() {
        $(".modal").removeClass("is-active");
    }) 

    $(".delete").on("click", function() {
        $(".modal").removeClass("is-active");
    }) 
};

var modalContent = function(index, array) {
    console.log(index);
    console.log(array);

    // create elements to add to modal
}

$("#form-button").on("click", function() {
    event.preventDefault();

    searchEvents();
})