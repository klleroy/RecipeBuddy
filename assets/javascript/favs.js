let favArr = [];
const fireDb = firebase.database();

$(document).on('click', '.fav', function () {
    let favRec = $(this).attr('favorite');
    let recipeID;

    if (favRec === 'false') {
      $(this).removeClass('far');
      $(this).addClass('fas');
      $(this).attr('favorite', 'true');
      for (let i = 0; i < recipes.length; i++) {
        // Need actual value from API of recipe ID
        if (recipeID === recipes[i].id) {
          let title = recipes[i].title;
          $('#saved-recipes').append('<li><button id="shopping-cart-btn-' + recipeID + '" class="btn card-title"><i class="far fa-list-alt"></i></button>'+ title +'</li>');
          favArr.push(recipes[i]);
          // Need to add to Firebase
          let newRec = ('favorite',JSON.stringify(favArr));
          fireDb.ref().push(newRec);
        }
      }
    } else {
      $(this).removeClass('fas');
      $(this).addClass('far');
      $(this).attr('favorite', 'false');
      $('#shopping-cart-btn-' + recipeID).remove();
    }
    let newRec = {
      rId: 'favorite',
      rTitle: JSON.stringify(favArr)
    };
    fireDb.ref().push(newRec);
  });
  