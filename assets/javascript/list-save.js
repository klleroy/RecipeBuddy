let shoplist = [];
let selected_recipe_list = [];
let units = ['cup', 'cp', 'pint', 'pt', 'quart', 'qt', 'gallon', 'gal', 'teaspoon', 'tablespoon', 'cups', 'cps', 'pints', 'pts', 'quarts', 'qts', 'gallons', 'gals', 'teaspoons', 'tablespoons', "ounce", "ounces", "pound", "pounds",]
$("li").remove();
/*let missedIngredients = [
    {
        id: 10023567,
        amount: 1,
        unit: "pounds",
        unitLong: "pound",
        unitShort: "lb",
        aisle: "Meat",
        name: "ground sirloin",
        original: "1 pound(s) ground sirloin",
        originalString: "1 pound(s) ground sirloin",
        originalName: "pound(s) ground sirloin",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/fresh-ground-beef.jpg"
    },
    {
        id: 10023567,
        amount: 0.5,
        unit: "pound",
        unitLong: "pounds",
        unitShort: "lb",
        aisle: "Meat",
        name: "ground sirloin",
        original: "1/2 pound ground Sirloin",
        originalString: "1/2 pound ground Sirloin",
        originalName: "ground Sirloin",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/fresh-ground-beef.jpg"
    },
    {
        id: 18079,
        amount: 0.25,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Pasta and Rice",
        name: "dry bread crumbs",
        original: "1/4 cup dry bread Crumbs",
        originalString: "1/4 cup dry bread Crumbs",
        originalName: "dry bread Crumbs",
        metaInformation: ["dry"],
        "image": "https://spoonacular.com/cdn/ingredients_100x100/breadcrumbs.jpg"
    },
    {
        id: 27048,
        amount: 0.5,
        unit: "cup",
        unitLong: "cups",
        unitShort: "cup",
        aisle: "Condiments",
        name: "steak sauce",
        original: "1/2 cup steak sauce",
        originalString: "1/2 cup steak sauce",
        originalName: "steak sauce",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/dark-sauce.jpg"
    },
    {
        id: 1123,
        amount: 1,
        unit: "large",
        unitLong: "large",
        unitShort: "large",
        aisle: "Milk, Eggs, Other Dairy",
        name: "egg",
        original: "1 large egg",
        originalString: "1 large egg",
        originalName: "egg",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/egg.png"
    },
    {
        id: 18350,
        amount: 4,
        unit: "",
        unitLong: "",
        unitShort: "",
        aisle: "Bakery/Bread",
        name: "hamburger buns",
        original: "4 hamburger buns",
        originalString: "4 hamburger buns",
        originalName: "hamburger buns",
        metaInformation: [],
        image: "https://spoonacular.com/cdn/ingredients_100x100/hamburger-bun.jpg"
    },
    {
        id: 1004,
        amount: 4,
        unit: "ounces",
        unitLong: "ounces",
        unitShort: "oz",
        aisle: "Cheese",
        name: "blue cheese",
        original: "4 ounces sliced blue cheese",
        originalString: "4 ounces sliced blue cheese",
        originalName: "sliced blue cheese",
        metaInformation: ["blue", "sliced"],
        image: "https://spoonacular.com/cdn/ingredients_100x100/blue-cheese.png"
    }
]
parse_item(missedIngredients, "Burger");*/
function parse_item(ingredient_list, title) {

    ingredient_list.forEach(function (elem) {
        let item = {
            ingredient: "",
            amount: "",
            unit: "",
            location: "",
            recipe: "",
            math_unit: ""
        }
        item.ingredient = elem.name;
        item.amount = elem.amount;
        item.unit = elem.unit;
        item.location = elem.aisle;
        item.recipe = title;
        item.clean_unit = clean_unit(elem.unit)
        /*item.recipe = elem*/
        if (item.clean_unit != "") {
            item.math_unit = math.unit(elem.amount, item.clean_unit)
        }
        insert(item);

    });
    //with a spoonacular aPI we do not need this code
    /*    let numerator = "";
        let denomerator = "";
        let whole = "0";
        let amount = "";
        let left = "";
        let fraction = "";
        let endnum = 0;
        
        //check for a number
        if (parseInt(line.substr(0, line.indexOf(" "))) > 0) {
            //I have a number!
            if(line.indexOf("/") > -1){
                endnum = line.indexOf(" ",line.indexOf("/"));
            }else{   
                endnum = line.indexOf(" ");
            }
            amount = line.substr(0, endnum);
    
            //check for a fraction
            if (amount.indexOf("/") > -1) {
                left = amount.substr(0, amount.indexOf("/"));
                // look for a mixed number
                if (left.indexOf(" ") > -1) {
                    whole = left.substr(0, left.indexOf(" "));
                    numerator = left.substr(left.indexOf(",") + 1, left.length - 1)
                }
                else {
                    //just a fraction no whole number
                    numerator = left;
                }
                denomerator = amount.substr(amount.indexOf("/") + 1, amount.length - 1);
                fraction = math.fraction(numerator, denomerator);
                item.amount = parseInt(whole) + math.number(fraction);
    
            } else {
                item.amount = line.substr(0, line.indexOf(" "));
                //perhaps we have a fraction or mxed number
            }
            line = line.substr(endnum + 1, line.length - 1)
        }
        //check for a unit
        if (units.indexOf(line.substr(0, line.indexOf(" "))) > -1) {
            //I have a unit!
            item.unit = line.substr(0, line.indexOf(" "));
            line = line.substr(line.indexOf(" ") + 1, line.length - 1)
        }
    
        //look for instructions to remove
        if (line.indexOf(",") > -1) {
            item.ingredient = line.substr(0, line.indexOf(","));
        } else {
            item.ingredient = line;
        }
    insert(item);*/
}

function clean_unit(unit) {
    switch (unit) {
        case "tbsp":
            return "tablespoon";
            break;
        case "tsp":
            return "teaspoon";
            break;
        case "cup":
            return "cp";
            break;
        case "pint":
            return "pt";
            break;
        case "quart":
            return "qt";
            break;
        case "gallon":
            return "gal";
            break;
        case "ounce":
            return "floz";
            break;
        case "pound":
        case "pounds":
            return "lb";
            break;
        default:
            return "";
    };
}

function get_proper_unit(item) {
    let unit_names = ['gal', 'L', 'qt', 'pt', 'cp', 'floz', 'tablespoon', 'teaspoon']
    let unit = item.unit;
    let math_unit = item.math_unit;
    unit_names.forEach(function (elem) {
        if (math.number(math_unit, elem) > 1) {
            unit = elem;
            return;
        }
    });
    return unit;
}

function insert(item) {
    //get the position of the ingredient in the array
    let posi = -1;
    for (let i = 0; i < shoplist.length; i++) {
        if (shoplist[i].ingredient === item.ingredient) {
            posi = i;
            i = shoplist.length;
        }
    }

    /*    if (item.unit.trim() != "") {
            item.math_unit = math.unit(item.amount, clean_unit(item.unit));
        }*/
    //let posi = shoplist.indexOf(item);
    if (posi == -1) {
        //new ingrdient
        //add a math.unit element to my object

        //add the object to my array
        //shoplist.push(item);
        if (shoplist.length != 0) {
            for (var i = 0; i < shoplist.length; i++) {
                if (item.location < shoplist[i].location) {
                    shoplist.splice(i, 0, item);
                    break;
                }
            }
            if (i === shoplist.length) {
                shoplist[i] = item;
            }
        } else {
            shoplist[0] = item;
        }
    } else {
        if (item.unit.trim() != "") {
            if (item.clean_unit != "") {
                shoplist[posi].math_unit = math.add(item.math_unit, shoplist[posi].math_unit);
                shoplist[posi].amount = math.number(shoplist[posi].math_unit, clean_unit(shoplist[posi].unit));
            } else {
                shoplist[posi].amount = parseInt(shoplist[posi].amount) + parseInt(item.amount);
            }
        }
    }
}

var modal = "";
// Get the modal
$(document).ready(function () {
    modal = document.getElementById('myModal');
    return false;
})

/*// Get the button that opens the modal
var btn = document.getElementById("build-list");

// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
}*/

function clearModal() {
    $("td").remove();
    $("tr").remove();
}

function closeModal() {
    clearModal();
    modal.style.display = "none";
}


//code taken from 
// http://jonisalonen.com/2012/converting-decimal-numbers-to-ratios/
function decimal_to_fraction(x) {
    var tolerance = 1.0E-6;
    var h1 = 1; var h2 = 0;
    var k1 = 0; var k2 = 1;
    var b = x;
    do {
        var a = Math.floor(b);
        var aux = h1; h1 = a * h1 + h2; h2 = aux;
        aux = k1; k1 = a * k1 + k2; k2 = aux;
        b = 1 / (b - a);
    } while (Math.abs(x - h1 / k1) > x * tolerance);

    return h1 + "/" + k1;
}


function format_amount(amount) {

    let return_val = "";
    let whole = math.floor(amount);
    let remainder = amount % 1;
    if (whole != 0) {
        return_val = whole.toString();
    }
    if (remainder != 0) {
        return_val = return_val.trim() + " " + decimal_to_fraction(remainder);
    }
    return return_val.trim();
}

function move_to_list(recipe) {
    //console.log(recipe);
    let ingredients = [];
    let list_item;
    let i = 0;
    let found = false;

    for (i = 0; i < selected_recipe_list.length; i++) {
        if (selected_recipe_list[i].id === recipe.id) {
            found = true;
            i = selected_recipe_list.length;
        }
    }

    if (!found) {
        //list_item = $("<li id='" + recipe.id + "'>"+recipe.title+"</li>");
        list_item = $("<li id='" + recipe.id + "'><button id='shopping-list-trash-btn' data-id = '" + recipe.id + "' class='btn card-title jerky'><i class='far fa-trash-alt jerky' data-id ='" + recipe.id + "'></i></button>" + recipe.title + "</li>");
        $("#saved-shopping-list-").append(list_item);
        parse_item(recipe.missedIngredients, recipe.title);
        selected_recipe_list.push(recipe);
    } else
        alert(recipe.title + " is already on the list");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

//$(document.body).on("click", ".giphyButton", function () {

$(document.body).on("click", ".jerky", function () {
    //$("#shopping-list-trash-btn").on("click", function(){
    let i = 0;
    let recipe = "";

    //loop through selected recipe list and remove
    for (i = 0; i < selected_recipe_list.length; i++) {
        console.log(selected_recipe_list[i].id + " - " + $(this).attr("data-id"))
        if (selected_recipe_list[i].id == $(this).attr("data-id")) {
            $("#" + selected_recipe_list[i].id).remove();
            recipe = selected_recipe_list[i].title;
            selected_recipe_list.splice(i, 1);
            i = selected_recipe_list.length;
        }
    };

    //loop through shoplist and remove ingredients for this recipe 
    for (i = 0; i < shoplist.length; i++) {
        console.log(shoplist[i].recipe + " - " + recipe)
        if (shoplist[i].recipe == recipe) {
            shoplist.splice(i, 1);
        }
    }
});

$("#shopping-trash-btn").on("click", function () {
    let i = 0;
    for (i = 0; i < selected_recipe_list.length; i++) {
        $("#" + selected_recipe_list[i].id).remove();
    }
    selected_recipe_list = "";
    shoplist = "";
});

$("#myClose").on("click", function () {
    modal.style.display = "none";
})

$("#add-current-recipe-btn").on("click", function () {
    for (let i = 0; i < recipes.length; i++) {
        if (recipes[i].id === parseInt(currentId)) {
            console.log("recipes[i].id" + recipes[i].id + "currentId" + currentId);
            move_to_list(recipes[i]);
        }
    }
}
)

$("#build-list").on("click", function () {
    let i = 0;
    clearModal();
    for (i = 0; i < shoplist.length; i++) {
        //shoplist.forEach(function (elem) {
        //make table row
        let table_row = $("<tr>");

        //make table data checkbox
        let td = $("<td>");
        td.append($("<input type='checkbox' name='chk' class='checker' value=''>"));
        table_row.append(td);

        //make table data amount
        td = $("<td>");
        td.text(format_amount(shoplist[i].amount) + " " + shoplist[i].unit);
        table_row.append(td);


        //make table data ingredient
        td = $("<td>");
        td.text(shoplist[i].ingredient);
        table_row.append(td);



        //make table data location
        td = $("<td>");
        td.text(shoplist[i].location);
        table_row.append(td);


        //make table data recipe
        td = $("<td>");
        td.text(shoplist[i].recipe);
        table_row.append(td);


        //append table row to the table
        $("#list").append(table_row);
    };

    modal.style.display = "block";
});