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

    var buttonShow = '<button class="button width-100% flex justify-center js-read-more__button ' + readMore.buttonClasses + '"><span class="button__label">' + readMore.buttonShowLabel + '</span><svg class="icon icon--sm margin-left-xxxxs" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M17.29 9c.39.39.39 1.02 0 1.41L12.7 15a.996.996 0 01-1.41 0L6.7 10.41c-.38-.39-.38-1.02 0-1.41s1.02-.39 1.41 0l3.88 3.88L15.88 9c.38-.39 1.02-.38 1.41 0z" fill="currentColor"></path></svg></button>';
    var buttonHide = '<button class="button width-100% flex justify-center js-read-more__button is-hidden ' + readMore.buttonClasses + '"><span class="button__label">' + readMore.buttonHideLabel + '</span><svg class="icon icon--sm margin-left-xxxxs" viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M6.71 15a.996.996 0 010-1.41L11.3 9a.996.996 0 011.41 0l4.59 4.59A.996.996 0 1115.89 15l-3.88-3.88L8.12 15c-.39.39-1.02.38-1.41 0z" fill="currentColor"></path></svg></button>';

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