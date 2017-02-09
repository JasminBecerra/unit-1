/* custom JavaScript file by Jasmin Becerra, 2017 */

// module 2 assignment

//initialize function called when the script loads
function initialize(){
    cities();
    //initialize debugAjax
    debugAjax();
};

//function to create a table with cities and their populations
function cities(){
    //define two arrays for cities and population
    var cityPop = [
        { 
            city: 'Chicago',
            population: 2695598
        },
        {
            city: 'Los Angeles',
            population: 3971883
        },
        {
            city: 'Aguascalientes',
            population: 934424
        },
        {
            city: 'San Luis Potosi',
            population: 722772
        }
    ];

    //append the table element to the div (mydiv)
    $("#mydiv").append("<table>");

    //append a header row to the table
    $("table").append("<tr>");
    
    //add the "City" and "Population" columns to the header row
    $("tr").append("<th>City</th><th>Population</th>");
    
        // console.log("Hello World");
    //loop to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        $("table").append(rowHtml);
    };
    //calling functions addColumns and Events (exectuing) based on how we define them below
    addColumns(cityPop);
    addEvents();
};


//function to add city size as column
function addColumns(cityPop){
    
    $("tr").each(function(i){
        //for header
        if (i == 0){
            //missing p in "append"
            $(this).append("<th>City Size</th>");
        } else {
            //creates variable citySize for city size
            var citySize;
            //if the population is less than 100000, then the city size value assigned is "Small"
            if (cityPop[i-1].population < 100000){
                citySize = 'Small';
            // if less than 500000, sity size is "Medium"
            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';
                // capitalize S for consistent variable name
            //otherwise, city size value is "Large"
            } else {
                citySize = 'Large';
            };
            //needed parenthesis around "this"
            //jquery alias mehtod to add citySize as column to table
            $(this).append('<td>' + citySize + '</td>');
            //missing > in '<td>'
        };
    });
};

//when you mouse over the table content, the text will change color
function addEvents(){

    $('table').mouseover(function(){
        //sets up color as a variable
        var color = "rgb(";

        for (var i=0; i<3; i++){
            //set random as a variable
            var random = Math.round(Math.random() * 255);
            //random not in quotes
            color += random;

            if (i<2){
                color += ",";
            
            } else {
                color += ")";

        };

        //use jquery to link the mouseover function to css style rules
        $(this).css('color', color);
    };
    });
        //function that will call for an alert box when you clock on the table
    function clickme(){
        //alert "hey, you clicked me" pops up in a box
        alert('Hey, you clicked me!');
        };
    //was previously "#table", but the pound sign was not needed
    //so when we click on the table, we get the pop up/alert
    $('table').on('click', clickme);
};



//jqueryAjax function
function jQueryAjax(){
    //define a variable to hold the data in Megacities, again, could use getJSON shorthand
    var mydata = $.ajax("data/MegaCitiesMap.geojson", {
        dataType: "json",
        success: function(response){
            mydata = response;

            //checking the data
            console.log(mydata);
        }
    });

    //checking the data
    console.log(mydata);
};


// debugCallback function --- stringify the data
function debugCallback(response){
    //append mydata (stringified) to mydiv
    //the <br> breaks the data
    $("#mydiv").append('<br>GeoJSON data: <br>' + JSON.stringify(response));
}
function debugAjax(){
    //defining a variable to hold Megacities info
    var mydata = $.ajax("data/MegaCitiesMap.geojson", {
        dataType: "json",
        //call for function debugCallback, no need for "function" 
        //since it behaves as a variable
        success: debugCallback
        
    });
};

//initializes jQuery
$(document).ready(jQueryAjax);


//call the initialize function when the document has loaded
$(document).ready(initialize);

