$(function(){

  var $thumbs = $('.thumbnailInnerWrap');
  var $mainImg = $('.bigImg');
  var thumbsLength = $thumbs[0].children.length;
  var thumbsShowing = 6;
  var thumbWidth = 65;
  var curIdx = 0;

  $('.bottomNavFrame').on('click', '.btnRight', function(evt) {
    evt.stopPropagation();
    selectNext();
  });

  $('.mainImg').on('click', '.mainNavNext', function(evt) {
    evt.stopPropagation();
    selectNext();
  })

  $('.bottomNavFrame').on('click', '.btnLeft', function(evt) {
    evt.stopPropagation();
    selectPrev();
  });

  $('.mainImg').on('click', '.mainNavPrev', function(evt) {
    evt.stopPropagation();
    selectPrev();
  });

  $('.thumbImg').on('click', function(evt) {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    curIdx = $(this).index()-1;
    selectNext();
  });

  $('.mainImg').mouseover(function() {
    $('.mainNavPrev').css('opacity', 0.65);
    $('.mainNavNext').css('opacity', 0.65);
  }).mouseout(function() {
    $('.mainNavPrev').css('opacity', 0);
    $('.mainNavNext').css('opacity', 0);
  });

  var selectNext = function() {
    $('.selected').removeClass('selected');
    if (curIdx < (thumbsLength - 1)) {
      if (curIdx < (thumbsLength - thumbsShowing)) {
        $thumbs.animate({
          'margin-left': '-'+( thumbWidth * (curIdx + 1))+'px'
        });
      }
      curIdx++;
      setMainImg();
      selectThumbnail();
    } else {
      curIdx = 0;
      $thumbs.animate({
        'margin-left': '-'+( thumbWidth * (curIdx))+'px'
      });
      setMainImg();
      selectThumbnail();
    }
  };

  var selectPrev = function() {
    $('.selected').removeClass('selected');
    if (curIdx > 0) {
      curIdx--;
      if (curIdx < (thumbsLength - thumbsShowing)) {
        $thumbs.animate({
          'margin-left': '-'+( thumbWidth * (curIdx))+'px'
        });
      }
      setMainImg();
      selectThumbnail();
    } else {
      curIdx = thumbsLength - 1;
      $thumbs.animate({
        'margin-left': '-'+( thumbWidth * (curIdx + 1  - thumbsShowing))+'px'
      });
      setMainImg();
      selectThumbnail();
    }
  };

  var setMainImg = function() {
    $($mainImg).attr('src', 'public/'+(curIdx + 1)+'-large.png');
  };

  var selectThumbnail = function() {
    $($thumbs[0].children[curIdx]).addClass('selected');
  }

});







