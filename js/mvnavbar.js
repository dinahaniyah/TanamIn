$(window).scroll(function(){
  var x = $(this).scrollTop(),
      transY = (x * 0.5), scale = 1 + (x * 0.0003),
      transform = 'translateY('+transY+'px) scale('+scale+') translate3d(0,0,0)';
  $('#demo .demo-bg').css({
    opacity: 1 - (x * 0.0008),
    WebkitTransform: transform,
    MozTransform: transform,
    msTransform: transform,
    transform: transform
  });
});
