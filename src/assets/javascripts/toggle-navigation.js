var Toggle = function(container) {
  this.container = container;
  this.mq = '(min-width: 46.24em)';
  this.keys = { esc: 27, tab: 9 };
  this.navigation = container.find('.navigation');
  this.createToggleButton();
  this.firstNavigationItem = this.navigation.find('.navigation__link').first();
  this.lastNavigationItem = this.navigation.find('.navigation__link').last();
  this.setupResponsiveChecks();
};


Toggle.prototype.setupResponsiveChecks = function() {
  this.mql = window.matchMedia(this.mq);
  this.mql.addListener($.proxy(this, 'checkMode'));
  this.checkMode(this.mql);
};


Toggle.prototype.checkMode = function(mql) {
  if(mql.matches) {
    this.enableBigMode();
  } else {
    this.enableSmallMode();
  }
};


// Toggle.prototype.enableSmallMode = function() {
//   this.hideNavigation();

//   this.events = {
//     onNavigationLinkFirstKeyDown: $.proxy(this, 'onNavigationLinkFirstKeyDown'),
//     onNavigationLinkLastKeyDown: $.proxy(this, 'onNavigationLinkLastKeyDown'),
//     onNavigationLinkKeyDown: $.proxy(this, 'onNavigationLinkKeyDown')
//   };

//   this.firstNavigationItem.on('keydown', this.events.onNavigationLinkFirstKeyDown);
//   this.lastNavigationItem.on('keydown', this.events.onNavigationLinkLastKeyDown);
//   this.navigation.on('keydown', '.navigation__link', this.events.onNavigationLinkKeyDown);
  
// };


Toggle.prototype.enableSmallMode = function() {
  this.hideNavigation();
  this.firstNavigationItem.on('keydown', $.proxy(this, 'onNavigationLinkFirstKeyDown'));
  this.lastNavigationItem.on('keydown', $.proxy(this, 'onNavigationLinkLastKeyDown'));
  this.navigation.on('keydown', '.navigation__link', $.proxy(this, 'onNavigationLinkKeyDown'));  
};


Toggle.prototype.enableBigMode = function() {
  this.showNavigation();
  this.firstNavigationItem.off('keydown', $.proxy(this, 'onNavigationLinkFirstKeyDown'));
  this.lastNavigationItem.off('keydown',  $.proxy(this, 'onNavigationLinkLastKeyDown'));
  this.navigation.off('keydown', '.navigation__link', $.proxy(this, 'onNavigationLinkKeyDown'));
};


Toggle.prototype.onNavigationLinkKeyDown = function(e) {
  if(e.keyCode === this.keys.esc) {
    this.hideNavigation();
  }
};


Toggle.prototype.onNavigationLinkFirstKeyDown = function(e) {
  if(e.keyCode === this.keys.tab && e.shiftKey) {
    e.preventDefault();
    this.lastNavigationItem.focus();
  }
};


Toggle.prototype.onNavigationLinkLastKeyDown = function(e) {
  if(e.keyCode === this.keys.tab && !e.shiftKey) {
    e.preventDefault();
    this.firstNavigationItem.focus();
  }
};


Toggle.prototype.createToggleButton = function() {
  this.toggleButton = $('<button class="toggle" aria-expanded="false" aria-controls="nav"><span class="visually-hidden">Show </span>menu</button>');
  this.container.prepend(this.toggleButton);
  this.toggleButton.on('click', $.proxy(this, 'onButtonToggleClick'));
};


Toggle.prototype.showNavigation = function() {
  this.navigation.removeClass('hidden');
  this.toggleButton.attr('aria-expanded', 'true');
  this.toggleButton.find('span').text('Hide ');
};


Toggle.prototype.hideNavigation = function() {
  this.navigation.addClass('hidden');
  this.toggleButton.attr('aria-expanded', 'false');
  this.toggleButton.find('span').text('Show ');
};


Toggle.prototype.toggle = function() {

  if (this.toggleButton.attr('aria-expanded') === 'false') {
    this.showNavigation();
  } else {
    this.hideNavigation();
  }

};


Toggle.prototype.onButtonToggleClick = function() {
  this.toggle();
};