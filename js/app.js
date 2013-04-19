$(function(){

  var $thumbs = $('.thumbnailInnerWrap');
  var $mainImgs = $('.mainImgInnerWrap');
  var thumbsLength = $thumbs[0].children.length;
  var thumbsShowing = 6;
  var thumbWidth = 65;
  var mainWidth = 436;
  var curIdx = 0;

  // Nav key handlers
  $("body").on('keydown', function(e) {
    if(e.keyCode === 39) { // right
      selectNext();
    } else if(e.keyCode === 37) { // left
      selectPrev();
    }
  });

  // Nav click handlers
  $('.bottomNavFrame').on('click', '.btnRight', function(evt) {
    evt.stopPropagation();
    selectNext();
  });

  $('.mainImgFrame').on('click', '.mainNavNext', function(evt) {
    evt.stopPropagation();
    selectNext();
  });

  $('.bottomNavFrame').on('click', '.btnLeft', function(evt) {
    evt.stopPropagation();
    selectPrev();
  });

  $('.mainImgFrame').on('click', '.mainNavPrev', function(evt) {
    evt.stopPropagation();
    selectPrev();
  });

  $('.thumbImg').on('click', function(evt) {
    $('.selected').removeClass('selected');
    $(this).addClass('selected');
    curIdx = $(this).index()-1;
    selectNext();
  });

  // Photo Nav
  var selectNext = function() {
    removeSelectedClasses();
    if (curIdx < (thumbsLength - 1)) {
      animateImagesRight();
      curIdx++;
      selectThumbnail();
    } else {
      curIdx = 0;
      animateImagesToStart();
      selectThumbnail();
    }
  };

  var selectPrev = function() {
    removeSelectedClasses();
    if (curIdx > 0) {
      curIdx--;
      animateImagesLeft();
      selectThumbnail();
    } else {
      curIdx = thumbsLength - 1;
      animateImagesToEnd();
      selectThumbnail();
    }
  };

  // Photo Nav Helpers
  var removeSelectedClasses = function() {
    $('.selected').removeClass('selected');
    $('.mainSelected').removeClass('mainSelected');
  };

  var selectThumbnail = function() {
    $($thumbs[0].children[curIdx]).addClass('selected');
    $($mainImgs[0].children[curIdx]).addClass('mainSelected');
  };

  var animateImagesLeft = function() {
    if (curIdx < (thumbsLength - thumbsShowing)) {
      $thumbs.animate({
        'margin-left': '-'+( thumbWidth * (curIdx))+'px'
      });
    }
    if (curIdx >= 0) {
      $mainImgs.animate({
        'margin-left': '-'+( mainWidth * (curIdx))+'px'
      });
    }
  };

  var animateImagesRight = function() {
    if (curIdx < (thumbsLength - thumbsShowing)) {
      $thumbs.animate({
        'margin-left': '-'+( thumbWidth * (curIdx + 1))+'px'
      });
    }
    if (curIdx <= (thumbsLength - 1)) {
      $mainImgs.animate({
        'margin-left': '-'+( mainWidth * (curIdx + 1))+'px'
      });
    }
  };

  var animateImagesToStart = function() {
    $thumbs.animate({
      'margin-left': '-'+( thumbWidth * (curIdx))+'px'
    });
    if (curIdx <= (thumbsLength - 1)) {
      $mainImgs.css('margin-left', '-'+( mainWidth * (curIdx))+'px');
    }
  };

  var animateImagesToEnd = function() {
    $thumbs.animate({
      'margin-left': '-'+( thumbWidth * (curIdx + 1  - thumbsShowing))+'px'
    });
    if (curIdx === (thumbsLength - 1)) {
      $mainImgs.css('margin-left', '-'+( mainWidth * (curIdx))+'px');
    }
  };
});