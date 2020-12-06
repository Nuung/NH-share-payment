$(function() {

  $('.button-class1').click(function(){
    if( $(this).hasClass('btn-default') ) $(this).removeClass('btn-default');
    if( !$(this).hasClass('btn-primary') ) $(this).addClass('btn-primary');
    if( $('.button-class2').hasClass('btn-primary') ) $('.button-class2').removeClass('btn-primary');
    if( !$('.button-class2').hasClass('btn-default') ) $('.button-class2').addClass('btn-default');
  });
  
  $('.button-class2').click(function(){
    if( $(this).hasClass('btn-default') ) $(this).removeClass('btn-default');
    if( !$(this).hasClass('btn-primary') ) $(this).addClass('btn-primary');
    if( $('.button-class1').hasClass('btn-primary') ) $('.button-class1').removeClass('btn-primary');
    if( !$('.button-class1').hasClass('btn-default') ) $('.button-class1').addClass('btn-default');
  });

});