let favs = [];
let recipes = [];

$(document).on("click", "#recipe-submit", function (event) {

    event.preventDefault();
    //debugger;
    displayRecipes();
});

var chooseRecipe = true;
var favorite;

function displayRecipes() {

    var offset = Math.floor((Math.random() * 100) + 1);
    var recipe = $('#recipe-value').val();
    console.log(recipe);
    var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?query=" + recipe + "&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&offset=" + offset + "&number=10&mashape-key=d20470ce32mshdbfd156afdd96dap16c402jsn7739274350bc";

    // Creating an AJAX call for the specific search button being clicked.

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        recipes = response.results;
        move_to_list(recipes[1]);

        // create a for to get the 10 elements from the data. 
        for (var i = 0; i < response.results.length; i++) {

            var id = response.results[i].id;
            var showImage = $("<div class='carousel-item' id ='" + id + "'>");

            // Showing the image when the button is clicked.
            // ensuring 'active' class is added to first item in the loop
            // if (i = 0) {
            //     showImage = "<div class='carousel-item active' id = '" + id + "'>";
            // } else {
            //     showImage = "<div class='carousel-item' id = '" + id + "'>";
            // };

            // Showing the image when the button in clicked.
            // var favIcon = `<div class="carousel-caption-like"><i class="far fa-heart fav"></i></div>`;
            // Id recipe from API

            // get the image from API
            var imgURL = response.results[i].image;
            // creating a element image in DOM and attributte and specift ID. 
            var image = $("<img>").attr("src", imgURL).attr("id", id);
            showImage.append(image);

            var showTitle = $("<div class='carousel-caption d-md-block'>");
            var nameFood = $("<h5>").text(response.results[i].title);
            showTitle.append(nameFood);

            $(showImage).append(showTitle);

            // empty the filler/previous li items
            $(".carousel-inner").empty();
            // then add the newly searched item in
            $(".carousel-inner").append(showImage);

            var descriptionOfFood = $("<h3 id = '" + id + "'>").text(response.results[i].title);
            $("#" + id).append(descriptionOfFood);


            $("#" + id).on("click", function () {

                // var idRecipe = $(this).attr('id');
                // console.log(idRecipe);

                for (var i = 0; i < response.results.length; i++) {

                    $("#currentName").append(response.results[i].title);

                    var ingredientList = $("#current-recipe-list");
                    ingredientList.append($('<li>').text(response.results[i].missedIngredients[i].original));
                    console.log(ingredientList);
                    $(".list").append(ingredientList);
                };
            });
        };
    });
};