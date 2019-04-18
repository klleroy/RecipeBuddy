$(document).on("click", ".btn-danger", function (event) {
    event.preventDefault();
    //debugger;
    displayRecipes();
});


var
    chooseRecipe = true;
var favorite;


function displayRecipes() {

    var offset = Math.floor((Math.random() * 100) + 1);
    var recipe = $('#recipe-value').val();
    console.log(recipe);

<<<<<<< HEAD
=======

    var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?query=" + recipe + "&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&offset=" + offset + "&number=10&mashape-key=d20470ce32mshdbfd156afdd96dap16c402jsn7739274350bc";

>>>>>>> d5e169edd75a07cae8054a5228b3c77efa974978

    var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?query=" + recipe + "&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&offset=" + offset + "&number=10&mashape-key=d20470ce32mshdbfd156afdd96dap16c402jsn7739274350bc";
    /*var queryUrl = "https://api.edamam.com/search?q=" + recipe + "&app_id=45939a6b&app_key=e37d7f29462257f1fa878816ec76418f&limit=10&offset=" + offset;*/

    // Creating an AJAX call for the specific search button being clicked.

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

<<<<<<< HEAD
        //debugger;

=======
>>>>>>> d5e169edd75a07cae8054a5228b3c77efa974978
        // create a for to get the 10 elements from the data. 
        for (var i = 0; i < response.results.length; i++) {

            var id = response.results[i].id;
            // Showing the image when the button in clicked.
            var showImage = $("<div class='carousel-item' id = '" + id + "'>");
            showImage.attr('data-name', response.results[i].title);
            showImage.attr('data-index', i);
            // Id recipe from API

            // get the image from API
            var imgURL = response.results[i].image;

            var image = $("<img>").attr("src", imgURL);

            // var showTitle = $("<div class='carousel-caption d-md-block'>");
            // var nameFood = $("<h5>").text(response.results[i].title);
            // showTitle.append(nameFood);
            // console.log(id);

            showImage.append(image);
            
            var descriptionOfFood = $("<h3 id = '" + id + "'>").text(response.results[i].title);
            showImage.append(descriptionOfFood)

            //$("#" + id).append(descriptionOfFood);

            //var ingredientsP = response.results[i].missedIngredients;
            //console.log(ingredientsP);

            showImage.on("click", function () {
                
                // var idRecipe = $(this).attr('id');
                var recipeName = $(this).attr('data-name');
                $("#currentName").append(recipeName);

                var recipeIndex = $(this).attr('data-index');
                /*
                response = {"results":[ {..receta..}, {...receta..} ] }
                respose.results = [ {..receta0..}, {...receta1..} ]
                response.results[1] = {..receta1..}
                response.results[1].missedIngredients = [ {..ingredient0..}. {..ingredient1..}, ..........]
                response.results[1].missedIngredients.length = [].lenght = quantity of ingredient objects in the array
                */
               var recipe = response.results[recipeIndex];
               console.log(recipe.missedIngredients.length);
                for (var i = 0; i < recipe.missedIngredients.length; i++) {

                    var ingredientList = $("#current-recipe-list");
                    ingredientList.append($('<li>').text(recipe.missedIngredients[i].original));
                    console.log(recipe.missedIngredients[i].original);
                    $(".list").append(ingredientList);
                }
                
            });

            $(".carousel-inner").append(showImage);


        }





    });

}
