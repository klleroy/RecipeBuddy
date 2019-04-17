$(document).on('click', '.fa-list-alt', function () {
    let shopList = $(this).attr('list');
  
    if (shopList === 'false') {
      $(this).removeClass('far');
      $(this).addClass('fas');
      $(this).attr('list', 'true');
    } else {
      $(this).removeClass('fas');
      $(this).addClass('far');
      $(this).attr('list', 'false');
    }
  });