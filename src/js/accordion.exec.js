function expandCheck() {
  // on load and resize
  $('*[class*="u-expand-section"]').forEach(function($el) {
    var $expandSectionBox = $('.u-expand-box', $el)[0]; 
    if($expandSectionBox) {
      var enabled = getComputedStyle($el, ':before').getPropertyValue('content');
      if(enabled.indexOf('enabled') !== -1) {
        addClass($el, 'enabled');
        if(hasClass($el, 'active')) {
          $expandSectionBox.style.height = $expandSectionBox.firstElementChild.scrollHeight + 'px';
          addClass($el, 'active');
          addClass($expandSectionBox, 'active');
          //addClass($('.u-expand-trigger', $el)[0], 'active');
        } else {
          $expandSectionBox.style.height = 0;
          removeClass($el, 'active');
          //removeClass($expandSectionBox, 'active');
          //removeClass($('.u-expand-trigger', $el)[0], 'active');
        }
      } else {
        removeClass($el, 'enabled');
        removeClass($el, 'active');
        //removeClass($('.u-expand-trigger', $el)[0], 'active');
        //removeClass($('.u-expand-box', $el)[0], 'active');
        $expandSectionBox.style.height = 'auto';
      }
    } else {
      console.log('u-expand-box missing');
    }
  });
}

function expandCloseBase($expandSection) {
  console.log('Expand: Close');
  if(hasClass($expandSection, 'enabled')) {
    var $expandSectionBox = $('.u-expand-box', $expandSection)[0];
    if($expandSectionBox) {
      if($expandSectionBox.firstElementChild) {
        if(hasClass($expandSectionBox, 'active')) {
          var $expandSectionBox = $('.u-expand-box', $expandSection)[0];
          $expandSectionBox.style.height = '0px';
          removeClass($expandSection, 'active');
          //removeClass($('.u-expand-trigger', $expandSection)[0], 'active');
          //removeClass($expandSectionBox, 'active');
          /*var $expandArrow = $('[class*="u-expand-arrow"]', $expandSection)[0];
          if($expandArrow) {
            removeClass($expandArrow, 'active');
          }*/
        }
      } else {
        console.log('Missing u-expand-box child div for height measure');
      }
    } else {
      console.log('Missing u-expand-box w/child');
    }
  }
}

function expandClose($expandSection) {
  if($expandSection == null) {
    var $expandSections = $('*[class*="u-expand-section"]');
    if($expandSections) {
      $expandSections.forEach(function($el) { expandCloseBase($el) });
    }
  } else {
    expandCloseBase($expandSection);
  }
}

var $expandSections = $('*[class*="u-expand-section"]');
if($expandSections) {

  expandCheck();

  var timer;
  window.addEventListener('resize', function () {
    clearTimeout(timer);
    timer = setTimeout(expandCheck, 200);
  });

  $expandSections.forEach(function($el) { 
    var $expandSectionTrigger = $('.u-expand-trigger', $el)[0];
    if($expandSectionTrigger) {
      $expandSectionTrigger.addEventListener('click', e => {
        var $this = e.target;
        if(hasClass($this, 'active')) {
          expandClose($el);
        } else {
          console.log('Expand: Open');
          if(hasClass($el, 'enabled')) {
            var $expandSectionBox = $('.u-expand-box', $el)[0];
            if($expandSectionBox) {
              if($expandSectionBox.firstElementChild) {
                if(!hasClass($expandSectionBox, 'active')) {
                  var $expandSectionBox = $('.u-expand-box', $el)[0];
                  $expandSectionBox.style.height = $expandSectionBox.firstElementChild.scrollHeight + 'px';
                  addClass($el, 'active');
                  //addClass($expandSectionBox, 'active');
                  if(hasClass($this, 'expanded-hide')) {
                    $this.style.height = '0px';
                  } else {
                    addClass($this, 'active');
                  }
                  var $expandArrow = $('[class*="u-expand-arrow"]', $el)[0];
                  /*if($expandArrow) {
                    addClass($expandArrow, 'active');
                  }*/
                }
              } else {
                console.log('Missing u-expand-box child div for height measure');
              }
            } else {
              console.log('Missing u-expand-box w/child');
            }
          }
        }
      });
    }
  });
}