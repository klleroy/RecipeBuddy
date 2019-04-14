$(document).on('click', '.fav', function () {
    let favRec = $(this).attr('favorite');
  
    if (favRec === 'false') {
      $(this).removeClass('far');
      $(this).addClass('fas');
      $(this).attr('favorite', 'true');
    } else {
      $(this).removeClass('fas');
      $(this).addClass('far');
      $(this).attr('favorite', 'false');
    }
  });