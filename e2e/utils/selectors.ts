export const selectors = {
  home: {
    loginButton: '[data-qa-id="login-select"]',
    hudlLoginItem: '[data-qa-id="login-hudl"]',
    acceptCookiesButton: 'button:has-text("Accept all cookies")',
  },
  login: {
    emailInput: 'input#username, input#email',
    passwordInput: 'input#password',
    loginButton: 'button[data-action-button-primary="true"]',
    continueButton: 'button:has-text("Continue")',
    emailInputError: '[data-is-error="true"]',
    passwordInputError: '#error-element-password',
    forgotPasswordLink: 'a:has-text("Forgot Password")',
    editEmailLink: 'a:has-text("Edit")',
    passwordVisibilityToggle: 'button[role="switch"]',
    promptAlert: 'div#prompt-alert p',
    rateLimitError: 'h3:has-text("We are sorry, an error occurred. Please retry after a few minutes.")',
  },
  passwordReset: {
    emailInput: 'input#email, #email, input#username',
    continueButton: 'button[data-action-button-primary="true"]',
    successHeader: 'h1:has-text("Check Your Email")',
    resendEmailButton: 'button:has-text("Resend Email")',
  },
  dashboard: {
    homeNav: '[data-qa-id="webnav-globalnav-home"]',
  },
};
