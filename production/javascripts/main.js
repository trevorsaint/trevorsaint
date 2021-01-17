// Utility function
function Util () {};


/*
	Class manipulation functions
*/
Util.hasClass = function(el, className) {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
};

Util.addClass = function(el, className) {
	var classList = className.split(' ');
 	if (el.classList) el.classList.add(classList[0]);
 	else if (!Util.hasClass(el, classList[0])) el.className += " " + classList[0];
 	if (classList.length > 1) Util.addClass(el, classList.slice(1).join(' '));
};

Util.removeClass = function(el, className) {
	var classList = className.split(' ');
	if (el.classList) el.classList.remove(classList[0]);
	else if(Util.hasClass(el, classList[0])) {
		var reg = new RegExp('(\\s|^)' + classList[0] + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
	if (classList.length > 1) Util.removeClass(el, classList.slice(1).join(' '));
};

Util.toggleClass = function(el, className, bool) {
	if(bool) Util.addClass(el, className);
	else Util.removeClass(el, className);
};

Util.setAttributes = function(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
};


/*
  DOM manipulation
*/
Util.getChildrenByClassName = function(el, className) {
  var children = el.children,
    childrenByClass = [];
  for (var i = 0; i < el.children.length; i++) {
    if (Util.hasClass(el.children[i], className)) childrenByClass.push(el.children[i]);
  }
  return childrenByClass;
};

Util.is = function(elem, selector) {
  if(selector.nodeType){
    return elem === selector;
  }

  var qa = (typeof(selector) === 'string' ? document.querySelectorAll(selector) : selector),
    length = qa.length,
    returnArr = [];

  while(length--){
    if(qa[length] === elem){
      return true;
    }
  }

  return false;
};


/*
	Animate height of an element
*/
Util.setHeight = function(start, to, element, duration, cb) {
	var change = to - start,
	    currentTime = null;

  var animateHeight = function(timestamp){
    if (!currentTime) currentTime = timestamp;
    var progress = timestamp - currentTime;
    var val = parseInt((progress/duration)*change + start);
    element.style.height = val+"px";
    if(progress < duration) {
        window.requestAnimationFrame(animateHeight);
    } else {
    	cb();
    }
  };

  // Set the height of the element before starting animation -> fix bug on Safari
  element.style.height = start+"px";
  window.requestAnimationFrame(animateHeight);
};


/*
	Smooth Scroll
*/
Util.scrollTo = function(final, duration, cb, scrollEl) {
  var element = scrollEl || window;
  var start = element.scrollTop || document.documentElement.scrollTop,
    currentTime = null;

  if(!scrollEl) start = window.scrollY || document.documentElement.scrollTop;

  var animateScroll = function(timestamp){
  	if (!currentTime) currentTime = timestamp;
    var progress = timestamp - currentTime;
    if(progress > duration) progress = duration;
    var val = Math.easeInOutQuad(progress, start, final-start, duration);
    element.scrollTo(0, val);
    if(progress < duration) {
        window.requestAnimationFrame(animateScroll);
    } else {
      cb && cb();
    }
  };

  window.requestAnimationFrame(animateScroll);
};


/*
  Focus utility classes
*/

// Move focus to an element
Util.moveFocus = function (element) {
  if( !element ) element = document.getElementsByTagName("body")[0];
  element.focus();
  if (document.activeElement !== element) {
    element.setAttribute('tabindex','-1');
    element.focus();
  }
};


/*
  Misc
*/

Util.getIndexInArray = function(array, el) {
  return Array.prototype.indexOf.call(array, el);
};

Util.cssSupports = function(property, value) {
  if('CSS' in window) {
    return CSS.supports(property, value);
  } else {
    var jsProperty = property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase();});
    return jsProperty in document.body.style;
  }
};

// Merge a set of user options into plugin defaults - https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
Util.extend = function() {

  // Variables
  var extended = {};
  var deep = false;
  var i = 0;
  var length = arguments.length;

  // Check if a deep merge
  if ( Object.prototype.toString.call( arguments[0] ) === '[object Boolean]' ) {
    deep = arguments[0];
    i++;
  }

  // Merge the object into the extended object
  var merge = function (obj) {
    for ( var prop in obj ) {
      if ( Object.prototype.hasOwnProperty.call( obj, prop ) ) {

        // If deep merge and property is an object, merge properties
        if ( deep && Object.prototype.toString.call(obj[prop]) === '[object Object]' ) {
          extended[prop] = extend( true, extended[prop], obj[prop] );
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  // Loop through each object and conduct a merge
  for ( ; i < length; i++ ) {
    var obj = arguments[i];
    merge(obj);
  }

  return extended;
};

// Check if Reduced Motion is enabled
Util.osHasReducedMotion = function() {
  if(!window.matchMedia) return false;
  var matchMediaObj = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(matchMediaObj) return matchMediaObj.matches;
  return false; // Return false if not supported
};


/*
	Polyfills
*/

// Closest() method
if (!Element.prototype.matches) {
	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
	Element.prototype.closest = function(s) {
		var el = this;
		if (!document.documentElement.contains(el)) return null;
		do {
			if (el.matches(s)) return el;
			el = el.parentElement || el.parentNode;
		} while (el !== null && el.nodeType === 1);
		return null;
	};
}


// Custom Event() constructor
if ( typeof window.CustomEvent !== "function" ) {

  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    var evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
   }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}


/*
	Animation curves
*/

Math.easeInOutQuad = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t + b;
	t--;
	return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInQuart = function (t, b, c, d) {
	t /= d;
	return c*t*t*t*t + b;
};

Math.easeOutQuart = function (t, b, c, d) {
  t /= d;
	t--;
	return -c * (t*t*t*t - 1) + b;
};

Math.easeInOutQuart = function (t, b, c, d) {
	t /= d/2;
	if (t < 1) return c/2*t*t*t*t + b;
	t -= 2;
	return -c/2 * (t*t*t*t - 2) + b;
};

Math.easeOutElastic = function (t, b, c, d) {
  var s=1.70158;var p=d*0.7;var a=c;
  if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
  if (a < Math.abs(c)) { a=c; var s=p/4; }
  else var s = p/(2*Math.PI) * Math.asin (c/a);
  return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
};


/*
  JS Utility Classes
*/

(function() {

  // Make focus ring visible only for keyboard navigation (i.e., tab key)
  var focusTab = document.getElementsByClassName('js-tab-focus');
  function detectClick() {
    if(focusTab.length > 0) {
      resetFocusTabs(false);
      window.addEventListener('keydown', detectTab);
    }
    window.removeEventListener('mousedown', detectClick);
  };

  function detectTab(event) {
    if(event.keyCode !== 9) return;
    resetFocusTabs(true);
    window.removeEventListener('keydown', detectTab);
    window.addEventListener('mousedown', detectClick);
  };

  function resetFocusTabs(bool) {
    var outlineStyle = bool ? '' : 'none';
    for(var i = 0; i < focusTab.length; i++) {
      focusTab[i].style.setProperty('outline', outlineStyle);
    }
  };

  window.addEventListener('mousedown', detectClick);

})();

(function() {


  var Accordion = function(element) {
    this.element = element;
    this.items = Util.getChildrenByClassName(this.element, 'js-accordion__item');
    this.version = this.element.getAttribute('data-version') ? '-'+this.element.getAttribute('data-version') : '';
    this.showClass = 'accordion'+this.version+'__item--is-open';
    this.animateHeight = (this.element.getAttribute('data-animation') == 'on');
    this.multiItems = !(this.element.getAttribute('data-multi-items') == 'off');
    this.initAccordion();
  };


  Accordion.prototype.initAccordion = function() {
    // Set initial aria attributes
    for( var i = 0; i < this.items.length; i++) {
      var button = this.items[i].getElementsByTagName('button')[0],
        content = this.items[i].getElementsByClassName('js-accordion__panel')[0],
        isOpen = Util.hasClass(this.items[i], this.showClass) ? 'true' : 'false';
      Util.setAttributes(button, {'aria-expanded': isOpen, 'aria-controls': 'accordion-content-'+i, 'id': 'accordion-header-'+i});
      Util.addClass(button, 'js-accordion__trigger');
      Util.setAttributes(content, {'aria-labelledby': 'accordion-header-'+i, 'id': 'accordion-content-'+i});
    }

    // Listen for Accordion events
    this.initAccordionEvents();
  };


  Accordion.prototype.initAccordionEvents = function() {
    var self = this;

    this.element.addEventListener('click', function(event) {
      var trigger = event.target.closest('.js-accordion__trigger');
      // Check index to make sure the click didn't happen inside a children accordion
      if( trigger && Util.getIndexInArray(self.items, trigger.parentElement) >= 0) self.triggerAccordion(trigger);
    });
  };


  Accordion.prototype.triggerAccordion = function(trigger) {
    var self = this;
    var bool = (trigger.getAttribute('aria-expanded') === 'true');

    this.animateAccordion(trigger, bool);
  };


  Accordion.prototype.animateAccordion = function(trigger, bool) {
    var self = this;
    var item = trigger.closest('.js-accordion__item'),
      content = item.getElementsByClassName('js-accordion__panel')[0],
      ariaValue = bool ? 'false' : 'true';

    if(!bool) Util.addClass(item, this.showClass);
    trigger.setAttribute('aria-expanded', ariaValue);
    self.resetContentVisibility(item, content, bool);

    if( !this.multiItems && !bool) this.closeSiblings(item);
  };


  Accordion.prototype.resetContentVisibility = function(item, content, bool) {
    Util.toggleClass(item, this.showClass, !bool);
    content.removeAttribute('style');
    if(bool && !this.multiItems) { // Accordion item has been closed -> check if there’s one open to move inside viewport
      this.moveContent();
    }
  };


  Accordion.prototype.closeSiblings = function(item) {
    // If only one accordion can be open -> search if there’s another one open
    var index = Util.getIndexInArray(this.items, item);
    for( var i = 0; i < this.items.length; i++) {
      if(Util.hasClass(this.items[i], this.showClass) && i != index) {
        this.animateAccordion(this.items[i].getElementsByClassName('js-accordion__trigger')[0], true);
        return false;
      }
    }
  };


  Accordion.prototype.moveContent = function() { // Make sure title of the accordion just opened is inside the viewport
    var openAccordion = this.element.getElementsByClassName(this.showClass);
    if(openAccordion.length == 0) return;
    var boundingRect = openAccordion[0].getBoundingClientRect();
    if(boundingRect.top < 0 || boundingRect.top > window.innerHeight) {
      var windowScrollTop = window.scrollY || document.documentElement.scrollTop;
      window.scrollTo(0, boundingRect.top + windowScrollTop);
    }
  };


  window.Accordion = Accordion;


  // Initialize the Accordion objects
  var accordions = document.getElementsByClassName('js-accordion');
  if( accordions.length > 0 ) {
    for( var i = 0; i < accordions.length; i++) {
      (function(i){new Accordion(accordions[i]);})(i);
    }
  }


}());
(function() {


  var Form = function(element) {
    this.element = element;
    this.fields = ['name', 'email', 'message'];
    this.initForm();
  };


  Form.prototype.initForm = function() {
    this.element.setAttribute('novalidate', true); // Stop HTML5 validation, in favour of our own
    this.validateForm();
  };


  Form.prototype.validateForm = function() {

    var self = this;

    this.element.addEventListener('submit', function(event) {

      event.preventDefault();

      for( var i = 0; i < self.fields.length; i++) {
        var input = document.querySelector('#' + self.fields[i]);
        self.validateFields(input);
      }

    });

  };


  Form.prototype.validateFields = function(input) {

    var errors = document.getElementsByClassName('form__control--error');

    // Validate fields that need validating
    if (input.value.trim() === '') {
      this.setStatus(input, 'error');
    } else {
      this.setStatus(input, 'success');
    }

    // Check for a valid email address
    if (input.type === 'email') {
      var regEx = /\S+@\S+\.\S+/
      if (regEx.test(input.value)) {
        this.setStatus(input, 'success');
      } else {
        this.setStatus(input, 'error');
      }
    }

    // If no errors exist, submit form
    if( errors.length === 0 ) {
      this.element.submit();
    }

  };


  Form.prototype.setStatus = function(input, status) {

    var formGroup = input.parentElement;
    var errorMessage = input.parentElement.querySelector('.form__error-message');
    var messageID = errorMessage.id;

    if (status === 'success') {
      Util.removeClass(input, 'form__control--error');
      Util.addClass(errorMessage, 'is-hidden'); // Hide error message
      Util.removeClass(formGroup, 'form__group--error');
      input.removeAttribute('aria-describedby'); // Remove aria-describedby attribute
    }

    if (status === 'error') {
      Util.addClass(input, 'form__control--error');
      Util.removeClass(errorMessage, 'is-hidden'); // Show error message
      Util.addClass(formGroup, 'form__group--error');
      input.setAttribute('aria-describedby', messageID) // Add aria-describedby attribute to form control
    }

  };


  // Initialize the Form objects
  var form = document.getElementsByClassName('js-form');
  if( form.length > 0 ) {
    for( var i = 0; i < form.length; i++) {
      (function(i){new Form(form[i]);})(i);
    }
  }


})();
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
(function() {

  var ReadMore = function(element) {
    this.element = element;
    this.moreContent = this.element.getElementsByClassName('js-read-more__content');
    this.count = this.element.getAttribute('data-characters') || 200;
    this.counting = 0;
    this.buttonClasses = this.element.getAttribute('data-button-class');
    this.ellipsis = this.element.getAttribute('data-ellipsis') && this.element.getAttribute('data-ellipsis') == 'off' ? false : true;
    this.buttonShowLabel = 'Read more';
    this.buttonHideLabel = 'Read less';
    this.toggleOff = this.element.getAttribute('data-toggle') && this.element.getAttribute('data-toggle') == 'off' ? false : true;
    if( this.moreContent.length == 0 ) splitReadMore(this);
    setButtonLabels(this);
    initReadMore(this);
  };

  function splitReadMore(readMore) {
    splitChildren(readMore.element, readMore); // Iterate through children and hide content
  };

  function splitChildren(parent, readMore) {
    if(readMore.counting >= readMore.count) {
      Util.addClass(parent, 'js-read-more__content');
      return parent.outerHTML;
    }
    var children = parent.childNodes;
    var content = '';
    for(var i = 0; i < children.length; i++) {
      if (children[i].nodeType == Node.TEXT_NODE) {
        content = content + wrapText(children[i], readMore);
      } else {
        content = content + splitChildren(children[i], readMore);
      }
    }
    parent.innerHTML = content;
    return parent.outerHTML;
  };

  function wrapText(element, readMore) {
    var content = element.textContent;
    if(content.replace(/\s/g,'').length == 0) return ''; // Check if content is empty
    if(readMore.counting >= readMore.count) {
      return '<span class="js-read-more__content">' + content + '</span>';
    }
    if(readMore.counting + content.length < readMore.count) {
      readMore.counting = readMore.counting + content.length;
      return content;
    }
    var firstContent = content.substr(0, readMore.count - readMore.counting);
    firstContent = firstContent.substr(0, Math.min(firstContent.length, firstContent.lastIndexOf(' ')));
    var secondContent = content.substr(firstContent.length, content.length);
    readMore.counting = readMore.count;
    return firstContent + '<span class="js-read-more__content">' + secondContent + '</span>';
  };

  function setButtonLabels(readMore) { // Set custom labels for read More/Less buttons
    var buttonLabels = readMore.element.getAttribute('data-button-labels');
    if(buttonLabels) {
      var labelsArray = buttonLabels.split(',');
      readMore.buttonShowLabel = labelsArray[0].trim();
      readMore.buttonHideLabel = labelsArray[1].trim();
    }
  };

  function initReadMore(readMore) { // Add read more/read less buttons to the markup
    readMore.moreContent = readMore.element.getElementsByClassName('js-read-more__content');
    if( readMore.moreContent.length == 0 ) {
      Util.addClass(readMore.element, 'read-more--loaded');
      return;
    }

    var buttonShow = '<button class="button width-100% flex justify-center js-read-more__button ' + readMore.buttonClasses + '"><span class="button__label">' + readMore.buttonShowLabel + '</span><svg class="icon icon--sm" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M17.29 9c.39.39.39 1.02 0 1.41L12.7 15a.996.996 0 01-1.41 0L6.7 10.41c-.38-.39-.38-1.02 0-1.41s1.02-.39 1.41 0l3.88 3.88L15.88 9c.38-.39 1.02-.38 1.41 0z"/></svg></button>';
    var buttonHide = '<button class="button width-100% flex justify-center js-read-more__button is-hidden ' + readMore.buttonClasses + '"><span class="button__label">' + readMore.buttonHideLabel + '</span><svg class="icon icon--sm" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M6.71 15a.996.996 0 010-1.41L11.3 9a.996.996 0 011.41 0l4.59 4.59A.996.996 0 1115.89 15l-3.88-3.88L8.12 15c-.39.39-1.02.38-1.41 0z"/></svg></button>';

    if(readMore.ellipsis) {
      buttonShow = '<span class="js-read-more__ellipsis" aria-hidden="true">...</span>'+ buttonShow;
    }

    readMore.moreContent[readMore.moreContent.length - 1].insertAdjacentHTML('afterend', buttonHide);
    readMore.moreContent[0].insertAdjacentHTML('afterend', buttonShow);
    resetAppearance(readMore);
    initEvents(readMore);
  };

  function resetAppearance(readMore) { // Hide part of the content
    for(var i = 0; i < readMore.moreContent.length; i++) Util.addClass(readMore.moreContent[i], 'is-hidden');
    Util.addClass(readMore.element, 'read-more--loaded'); // Show entire component
  };

  function initEvents(readMore) { // Listen to the click on the read more/less button
    readMore.buttonToggle = readMore.element.getElementsByClassName('js-read-more__button');
    readMore.ellipsis = readMore.element.getElementsByClassName('js-read-more__ellipsis');

    readMore.buttonToggle[0].addEventListener('click', function(event){
      event.preventDefault();
      updateVisibility(readMore, true);
    });
    readMore.buttonToggle[1].addEventListener('click', function(event){
      event.preventDefault();
      updateVisibility(readMore, false);
    });
  };

  function updateVisibility(readMore, visibile) {
    for(var i = 0; i < readMore.moreContent.length; i++) Util.toggleClass(readMore.moreContent[i], 'is-hidden', !visibile);

    // Reset buttons appearance
    Util.toggleClass(readMore.buttonToggle[0], 'is-hidden', visibile);
    Util.toggleClass(readMore.buttonToggle[1], 'is-hidden', !visibile);
    if(readMore.ellipsis.length > 0 ) Util.toggleClass(readMore.ellipsis[0], 'is-hidden', visibile);
    if(!readMore.toggleOff) Util.addClass(readMore.button, 'is-hidden');

    // Move focus
    if(visibile) {
      var targetTabIndex = readMore.moreContent[0].getAttribute('tabindex');
      Util.moveFocus(readMore.moreContent[0]);
      resetFocusTarget(readMore.moreContent[0], targetTabIndex);
    } else {
      Util.moveFocus(readMore.buttonToggle[0]);
    }
  };

  function resetFocusTarget(target, tabindex) {
    if( parseInt(target.getAttribute('tabindex')) < 0) {
      target.style.outline = 'none';
      !tabindex && target.removeAttribute('tabindex');
    }
  };

  // Initialize the ReadMore objects
  var readMore = document.getElementsByClassName('js-read-more');

  if( readMore.length > 0 ) {
    for( var i = 0; i < readMore.length; i++) {
      (function(i){new ReadMore(readMore[i]);})(i);
    }
  };

})();
(function() {

  function initSkipLinkEvents(skipLink) {

    // Toggle class skip-link--focus if link is in focus/loses focus
    skipLink.addEventListener('focusin', function() {
      Util.addClass(skipLink, 'skip-link--focus');
    });

    skipLink.addEventListener('focusout', function() {
      Util.removeClass(skipLink, 'skip-link--focus');
    });

  };

  var skipLinks = document.getElementsByClassName('skip-link');

  if( skipLinks.length > 0 ) {
    for( var i = 0; i < skipLinks.length; i++) {
      initSkipLinkEvents(skipLinks[i]);
    }
  }

}());
(function() {

  function initSocialShare(button) {
    button.addEventListener('click', function(event){
      event.preventDefault();
      var social = button.getAttribute('data-social');
      var url = getSocialUrl(button, social);
      (social == 'mail')
        ? window.location.href = url
        : window.open(url, social+'-share-dialog', 'width=626,height=436');
    });
  };

  function getSocialUrl(button, social) {
    var params = getSocialParams(social);
    var newUrl = '';
    for(var i = 0; i < params.length; i++) {
      var paramValue = button.getAttribute('data-'+params[i]);
      if(params[i] == 'hashtags') paramValue = encodeURI(paramValue.replace(/\#| /g, ''));
      if(paramValue) {
        (social == 'facebook')
          ? newUrl = newUrl + 'u='+encodeURIComponent(paramValue)+'&'
          : newUrl = newUrl + params[i]+'='+encodeURIComponent(paramValue)+'&';
      }
    }
    if(social == 'linkedin') newUrl = 'mini=true&'+newUrl;
    return button.getAttribute('href')+'?'+newUrl;
  };

  function getSocialParams(social) {
    var params = [];
    switch (social) {
      case 'twitter':
        params = ['text', 'hashtags'];
        break;
      case 'facebook':
      case 'linkedin':
        params = ['url'];
        break;
      case 'pinterest':
        params = ['url', 'media', 'description'];
        break;
      case 'mail':
        params = ['subject', 'body'];
        break;
    }
    return params;
  };

  var socialShare = document.getElementsByClassName('js-social-share');
  if(socialShare.length > 0) {
    for( var i = 0; i < socialShare.length; i++) {
      (function(i){initSocialShare(socialShare[i])})(i);
    }
  }

})();