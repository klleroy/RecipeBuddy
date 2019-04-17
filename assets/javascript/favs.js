let favArr = [];

$(document).on('click', '.fav', function () {
    let favRec = $(this).attr('favorite');
    let recipeID;

    if (favRec === 'false') {
      $(this).removeClass('far');
      $(this).addClass('fas');
      $(this).attr('favorite', 'true');
      for (let i = 0; i < searchArr.length; i++) {
        // Need actual value from API of recipe ID
        if (recipeID === searchArr[i].id) {
          let title = searchArr[i].title;
          $('#saved-recipes').append('<li><button id="shopping-cart-btn-' + recipeID + '" class="btn card-title"><i class="far fa-list-alt"></i></button>'+ title +'</li>');
          favArr.push(searchArr[i]);
          // Need to add to Firebase
        }
      }
    } else {
      $(this).removeClass('fas');
      $(this).addClass('far');
      $(this).attr('favorite', 'false');
      $('#shopping-cart-btn-' + recipeID).remove();
    }
  });
  