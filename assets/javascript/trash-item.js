$(document).on('click', '.fa-trash-alt', function () {
    let trashItem = $(this).attr('list');
  
    if (trashItem === 'false') {
      $(this).removeClass('far');
      $(this).addClass('fas');
      $(this).attr('list', 'true');
    } else {
      $(this).removeClass('fas');
      $(this).addClass('far');
      $(this).attr('list', 'false');
    }
  });