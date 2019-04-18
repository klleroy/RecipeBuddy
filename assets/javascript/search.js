$(document).on("click", "#recipe-submit", function (event) {
    event.preventDefault();
    debugger;
    displayRecipes();
});

var chooseRecipe = true;
var favorite;

function displayRecipes() {

    var offset = Math.floor((Math.random() * 100) + 1);
    var recipe = $('#recipe-value').val();
    console.log(recipe);

    /*var queryUrl = "https://api.edamam.com/search?q=" + recipe + "&app_id=45939a6b&app_key=e37d7f29462257f1fa878816ec76418f&limit=10&offset=" + offset;*/
    var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?query=" + recipe + "&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&offset=" + offset + "&number=10&mashape-key=d20470ce32mshdbfd156afdd96dap16c402jsn7739274350bc";
    // Creating an AJAX call for the specific search button being clicked.

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        debugger;
        // create a for to get the 10 elements from the data. 
        for (var i = 0; i < response.hits.length; i++) {

            // Showing the image when the button is clicked.
            // ensuring 'active' class is added to first item in the loop
            if (i === 0) {
                var showImage = $("<div class='carousel-item active'>");
            }
            var showImage = $("<div class='carousel-item'>");
            var favIcon = $(`<div class="carousel-caption-like"><i class="far fa-heart fav"></i></div>`);
            
            showImage.data('title', response.hits[i].recipe.label);

            var label = response.hits[i].recipe.label;
            var imgURL = response.hits[i].recipe.image;
            var image = $("<img>").attr("src", imgURL).attr('id', label);

            showImage.append(image);
            // empty the filler/previous li items
            $(".carousel-inner").empty();

            // then add the like button / icon
            $(".carousel-inner").append(favIcon);
            // then add the newly searched item in
            $(".carousel-inner").append(showImage);
        };

        $(label).on("click", function () {

            var ingredientList = $('<ol>');
            ingredientList.append($('<li>').text(response.hits[i].recipe.ingredientLines[i]));
            console.log(ingredientList);

            $(".list").append(ingredientList);
        });

    });

}