((window) => {
  window.env = window.env || {};

  // Environment variables
  window['env']['clientId'] = '${CLIENT_ID}';
})(this);
