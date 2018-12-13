function FormValidator(form) {
  this.form = form;
  this.errors = [];
  this.validators = [];
  $(this.form).on('submit', $.proxy(this, 'onSubmit'));
  this.summary = $('.error-summary');
  this.summary.on('click', 'a', $.proxy(this, 'onErrorClick'));
  this.originalTitle = document.title;
};

FormValidator.entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;'
  };

FormValidator.escapeHtml = function(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
      return FormValidator.entityMap[s];
    });
};

FormValidator.prototype.onErrorClick = function(e) {
  e.preventDefault();
  var href = e.target.href;
  var id = href.substring(href.indexOf('#'), href.length);
  $(id).focus();
};

FormValidator.prototype.resetTitle = function() {
  document.title = this.originalTitle;
};

FormValidator.prototype.updateTitle = function() {
  var word = (this.errors.length > 1) ? ' errors' : ' error';
  document.title = this.errors.length + word + ' - ' + document.title;
};

FormValidator.prototype.showSummary = function () {
  this.summary.html(this.getSummaryHtml());
  this.summary.removeClass('hidden');
  this.summary.focus();
};

FormValidator.prototype.getSummaryHtml = function() {
  var html = '<h2 class="error-summary__title">There is a problem</h2>';
  html += '<div class="error-summary__body">';
    html += '<ul class="list error-summary__list">';
    for (var i = 0, j = this.errors.length; i < j; i++) {
      var error = this.errors[i];
      html += '<li class="list error-summary__list-item">';
      html +=   '<a class="error-summary__link" href="#' + FormValidator.escapeHtml(error.fieldName) + '">';
      html +=     FormValidator.escapeHtml(error.message);
      html +=   '</a>';
      html += '</li>';
    }
    html += '</ul>';
  html += '</div>';
  return html;
};

FormValidator.prototype.hideSummary = function() {
    this.summary.addClass('hidden');
};

FormValidator.prototype.onSubmit = function (e) {
  this.removeInlineErrors();
  this.hideSummary();
  this.resetTitle();
  if(!this.validate()) {
    e.preventDefault();
    this.updateTitle();
    this.showSummary();
    this.showInlineErrors();
  }
};

FormValidator.prototype.showInlineErrors = function() {
  for (var i = 0, j = this.errors.length; i < j; i++) {
    this.showInlineError(this.errors[i]);
  }
};

FormValidator.prototype.showInlineError = function (error) {
  var errorId = error.fieldName + '-error';
  var errorSpan = '<span class="error-message" id="' + errorId + '">' + FormValidator.escapeHtml(error.message) + '</span>';
  var control = $('#' + error.fieldName);
  var fieldContainer = control.parents('.form-group');
  var label = fieldContainer.find('label');
  var legend = fieldContainer.find('legend');
  fieldContainer.find('.error-message').remove();
  fieldContainer.addClass('form-group--error');
  if(legend.length) {
    legend.append(errorSpan);
    fieldContainer.attr('aria-invalid', 'true');
  } else {
    label.after(errorSpan);
    control.attr('aria-invalid', 'true');

    if(control[0].nodeName.toLowerCase() === 'textarea') {
      control.addClass('textarea--error');
    } else {
      control.addClass('input--error');
    }

    control.attr('aria-describedby', errorId);

  }
};

FormValidator.prototype.removeInlineErrors = function () {
  $(this.form).find('.error-message').remove();
  $(this.form).find('.form-group--error').removeClass('form-group--error');
  $(this.form).find('.input--error').removeClass('input--error');
  $(this.form).find('.textarea--error').removeClass('textarea--error');
  $(this.form).find('[aria-invalid]').attr('aria-invalid', 'false');
  $(this.form).find('[aria-describedby]').removeAttr('aria-describedby');
};

FormValidator.prototype.addValidator = function(fieldName, rules) {
  this.validators.push({
    fieldName: fieldName,
    rules: rules,
    field: this.form.elements[fieldName]
  });
};

FormValidator.prototype.validate = function() {
  this.errors = [];
  var validator = null,
    validatorValid = true,
    i,
    j;
  for (i = 0; i < this.validators.length; i++) {
    validator = this.validators[i];
    for (j = 0; j < validator.rules.length; j++) {
      validatorValid = validator.rules[j].method(validator.field,
        validator.rules[j].params);
      if (!validatorValid) {
        this.errors.push({
          fieldName: validator.fieldName,
          message: validator.rules[j].message
        });
        break;
      }
    }
  }
  return this.errors.length === 0;
};
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