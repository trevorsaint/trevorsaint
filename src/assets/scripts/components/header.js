(function() {

  var mainHeader = document.getElementsByClassName('js-header');

  if( mainHeader.length > 0 ) {
    var trigger = mainHeader[0].getElementsByClassName('js-header__trigger')[0],
      nav = mainHeader[0].getElementsByClassName('js-header__nav')[0];

    // We’ll use these to store the node that needs to receive focus when the mobile menu is closed
    var focusMenu = false;

    // Detect click on nav trigger
    trigger.addEventListener("click", function(event) {
      event.preventDefault();
      toggleNavigation(!Util.hasClass(nav, 'header__nav--is-visible'));
    });

    // Listen for key events
    window.addEventListener('keyup', function(event){
      // Listen for esc key
      if( (event.keyCode && event.keyCode == 27) || (event.key && event.key.toLowerCase() == 'escape' )) {
        // Close navigation on mobile if open
        if(trigger.getAttribute('aria-expanded') == 'true' && isVisible(trigger)) {
          focusMenu = trigger; // Move focus to menu trigger when menu is close
          trigger.click();
        }
      }
      // Listen for tab key
      if( (event.keyCode && event.keyCode == 9) || (event.key && event.key.toLowerCase() == 'tab' )) {
        // Close navigation on mobile if open when nav loses focus
        if(trigger.getAttribute('aria-expanded') == 'true' && isVisible(trigger) && !document.activeElement.closest('.js-header')) trigger.click();
      }
    });

    // Listen for resize
    var resizingId = false;
    window.addEventListener('resize', function() {
      clearTimeout(resizingId);
      resizingId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
      if( !isVisible(trigger) && Util.hasClass(mainHeader[0], 'header--expanded')) toggleNavigation(false);
    };
  }

  function isVisible(element) {
    return (element.offsetWidth || element.offsetHeight || element.getClientRects().length);
  };

  function toggleNavigation(bool) { // Toggle navigation visibility on small device
    Util.toggleClass(nav, 'header__nav--is-visible', bool);
    Util.toggleClass(mainHeader[0], 'header--expanded', bool);
    trigger.setAttribute('aria-expanded', bool);
    if(bool) { // Opening menu -> move focus to first element inside nav
      nav.querySelectorAll('[href], input:not([disabled]), button:not([disabled])')[0].focus();
    } else if(focusMenu) {
      focusMenu.focus();
      focusMenu = false;
    }
  };

})();