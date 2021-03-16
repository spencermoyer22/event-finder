var getSearchResults = function(){
    // grab repo name from url query string
    var queryString = document.location.search;
    var searchResults = queryString.split("=")[1];
   if(searchResults) {
       // display repo name on the page
    repoNameEl.textContent = searchResults;
    
}else{
    // if no repo was given, redirect to the homepage
    document.location.replace("./index.html");
}
}

var getDirections = function (){
fetch("https://maps.googleapis.com/maps/api/directions/json?origin="
+ inputValue.value + 
"&key=AIzaSyBBlNIHoJ1O1S0XMqeTTKXXISgTn6y3rbA")
.then(response => response.json())
.then(data => console.log(data));
};