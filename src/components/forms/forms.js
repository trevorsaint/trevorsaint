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