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


    var queryUrl = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?query=" + recipe + "&fillIngredients=true&instructionsRequired=true&addRecipeInformation=true&limitLicense=true&" + offset + "=0&number=10&mashape-key=d20470ce32mshdbfd156afdd96dap16c402jsn7739274350bc";
    /*var queryUrl = "https://api.edamam.com/search?q=" + recipe + "&app_id=45939a6b&app_key=e37d7f29462257f1fa878816ec76418f&limit=10&offset=" + offset;*/
    // Creating an AJAX call for the specific search button being clicked.

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {

        debugger;


        // create a for to get the 10 elements from the data. 
        for (var i = 0; i < response.results.length; i++) {
            
            var id = response.results[i].id;

            // Showing the image when the button is clicked.
            // ensuring 'active' class is added to first item in the loop
            // if (i === 0) {
            // var showImage = $("<div class='carousel-item active' id = '"+id+"'>");
            // }
            // Showing the image when the button in clicked.
            var showImage = $("<div class='carousel-item' id = '"+id+"'>");
            // Id recipe from API
            
            // get the image from API
            var imgURL = response.results[i].image;
            // creating a element image in DOM and attributte and specift ID. 
            var image = $("<img>").attr("src", imgURL).attr("id", id);

            var showTitle = $("<div class='carousel-caption d-md-block'>");
            var nameFood = $("<h5>").text(response.results[i].title);
            
            showTitle.append(nameFood);
            
            // console.log(id);

            showImage.append(image);    
            $(showImage).append(showTitle); 
            // then add the like button / icon
            // $(".carousel-inner").append(favIcon);
            // then add the newly searched item in
            $(".carousel-inner").append(showImage);

            var descriptionOfFood = $("<h3 id = '"+id+"'>").text(response.results[i].id);
            $("#" + id).append(descriptionOfFood);
            

        }

        // var showTitle = $("<div class='carousel-caption.d-none.d-md-block'>");
        // var title = $("<h5>").text(id);

        //     // Appending images. 
        //     showTitle.append(title);
            
        //     $(".carousel-item").append(showTitle);      


        // $(label).on("click", function () {

        //     var ingredientList = $('<ol>');
        //     ingredientList.append($('<li>').text(response.hits[i].recipe.ingredientLines[i]));
        //     console.log(ingredientList);

        //     $(".list").append(ingredientList);
        // });

    });

}