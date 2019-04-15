let shoplist = [];
let units = ['cup', 'cp', 'pint', 'pt', 'quart', 'qt', 'gallon', 'gal', 'teaspoon', 'tablespoon', 'cups', 'cps', 'pints', 'pts', 'quarts', 'qts', 'gallons', 'gals', 'teaspoons', 'tablespoons']

parse_item("Cilantro Chile Sauce");
parse_item("2 large cloves garlic");
parse_item("1/2 cup extra virgin olive oil");
parse_item("2 tablespoons lemon juice, freshly squeezed");
parse_item("1 small bunch cilantro");
parse_item("1 green (serrano) chile, seeds removed");
parse_item("2 pinches ground cumin");
parse_item("a couple big pinches of salt");
parse_item("6 large organic eggs");
parse_item("1 tablespoon olive oil");
parse_item("1 small yellow onion, chopped");
parse_item("3 small potatoes, very very thinly sliced");
parse_item("1/2 cup yellow zucchini or cauliflower,1/2-inch pieces");
parse_item("1/4 cup goat cheese, crumbled");
parse_item("1/4 cup pumpkin seeds, toasted");
parse_item("couple pinches of salt");

function parse_item(line) {
    let item = {
        ingredient: "",
        amount: "",
        unit: "",
        location: "",
        recipe: "",
    }
    let numerator = "";
    let denomerator = "";
    let whole = "0";
    let amount = "";
    let left = "";
    let fraction = "";

    //check for a number
    if (parseInt(line.substr(0, line.indexOf(" "))) > 0) {
        //I have a number!
        amount = line.substr(0, line.indexOf(" "));
        //check for a fraction
        if (amount.indexOf("/") > -1) {
            left = amount.substr(0, amount.indexOf("/"));
            // look for a mixed number
            if (left.indexOf(" ") > -1) {
                whole = left.substr(0, left.indexOf(" "));
                numerator = left.substr(left.indexOf(",") + 1, left.length - 1)
            }
            else{
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
        line = line.substr(line.indexOf(" ") + 1, line.length - 1)
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
    insert(item);
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
        default:
            return unit;
    };
}

function get_proper_unit(item) {
    let unit = "";
    unit = item.unit;
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

    if (item.unit.trim() != "") {
        item.math_unit = math.unit(item.amount, clean_unit(item.unit));
    }
    //let posi = shoplist.indexOf(item);
    if (posi == -1) {
        //new ingrdient
        //add a math.unit element to my object

        //add the object to my array
        shoplist.push(item);
    } else {
        if (item.unit.trim() != "") {
            let new_math_unit = math.unit(item.amount, clean_unit(item.unit));
            item.math_unit = math.add(item.math_unit, new_math_unit);
            item.unit = get_proper_unit(item.math_unit);
            item.amount = math.number(item.math_unit, item.unit);
        }
    }
}

var modal = "";
// Get the modal
$(document).ready(function () {
    modal = document.getElementById('myModal');
})

/*// Get the button that opens the modal
var btn = document.getElementById("build-list");

// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
}*/

function closeModal() {
    modal.style.display = "none";
    $("td").remove();
    $("tr").remove();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

$("#myClose").on("click", function () {
    modal.style.display = "none";
})

$("#build-list").on("click", function () {
    for (var i = 0; i < shoplist.length; i++) {
        //shoplist.forEach(function (elem) {
        //make table row
        let table_row = $("<tr>");

        //make table data checkbox
        let td = $("<td>");
        td.append($("<input type='checkbox' name='chk' class='checker' value=''>"));
        table_row.append(td);

        //make table data ingredient
        td = $("<td>");
        td.text(shoplist[i].ingredient);
        table_row.append(td);


        //make table data amount
        td = $("<td>");
        td.text(shoplist[i].amount + " " + shoplist[i].unit);
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