var shoplist = [];
var item1 = {
    ingredient: "olive oil",
    amount: "2",
    unit: "tbsp",
    location: "",
    recipe:"Roasted Tomato Salsa",
}
shoplist.push(item1);
var item1 = {
    ingredient: "rice",
    amount: "2",
    unit: "cups",
    location: "",
    recipe:"Roasted Tomato Salsa",
}
shoplist.push(item1);
var item1 = {
    ingredient: "salsa",
    amount: "2",
    unit: "cups",
    location: "",
    recipe:"Roasted Tomato Salsa",
}
shoplist.push(item1);
var item1 = {
    ingredient: "chicken broth",
    amount: "1.5",
    unit: "cups",
    location: "",
    recipe:"Roasted Tomato Salsa",
}
shoplist.push(item1);
var item1 = {
    ingredient: "salt",
    amount: "1",
    unit: "teaspoon",
    location: "",
    recipe:"Roasted Tomato Salsa",
}
shoplist.push(item1);
var item1 = {
    ingredient: "cilantro",
    amount: ".5",
    unit: "cup",
    location: "",
    recipe:"Roasted Tomato Salsa",
}
shoplist.push(item1);
var item1 = {
    ingredient: "cilantro",
    amount: ".25",
    unit: "cup",
    location: "",
    recipe:"Roasted Tomato Salsa",
}
shoplist.push(item1);
var item1 = {
    ingredient: "water",
    amount: ".25",
    unit: "cup",
    location: "",
    recipe:"Spanish Rice",
}
shoplist.push(item1);
var item1 = {
    ingredient: "garlic",
    amount: "3",
    unit: "cloves",
    location: "",
    recipe:"Spanish Rice",
}
shoplist.push(item1);
var item1 = {
    ingredient: "jalapeno",
    amount: "2",
    unit: "",
    location: "",
    recipe:"Spanish Rice",
}
shoplist.push(item1);
var item1 = {
    ingredient: "plum tomato",
    amount: "1.5",
    unit: "pounds",
    location: "",
    recipe:"Spanish Rice",
}
shoplist.push(item1);

function clean_unit(unit){
    return unit;
}

function insert(item){
    //get the position of the ingredient in the array
    let posi = shoplist.indexOf(item.ingredient);
    if(posi == -1){
        //new ingrdient
        //add a math.unit element to my object
        item.math_unit = math.unit(item.amount, clean_unit(item.unit));
        //add the object to my array
        shoplist.push(item);
    }else{
        let new_math_unit = math.unit(item.amount, clean_unit(item.unit));
        item.math_unit = math.add(item.math_unit, new_math_unit);
        item.unit = get_proper_unit(item.math_unit);
        item.amount = math.toNumber(item.math_unit, item.unit);
    }
}

var modal = "";
// Get the modal
$(document).ready(function(){
    modal = document.getElementById('myModal');
})

/*// Get the button that opens the modal
var btn = document.getElementById("build-list");

// When the user clicks the button, open the modal 
btn.onclick = function () {
	modal.style.display = "block";
}*/

function closeModal(){
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

$("#myClose").on("click",function(){
    modal.style.display = "none";
})

$("#build-list").on("click", function () {
     for (var i= 0; i<shoplist.length;i++){
    //shoplist.forEach(function (elem) {
        //make table row
        let table_row = $("<tr>");
        
        //make table data checkbox
        let td = $("<td>");
        td.append( $("<input type='checkbox' name='chk' class='checker' value=''>"));
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