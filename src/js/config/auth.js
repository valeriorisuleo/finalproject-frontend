angular
.module('project4')
.config(Auth);


Auth.$inject = ['$authProvider', 'API_URL'];
function Auth($authProvider, API_URL) {
  // whe want to tell to satellizer where we are gonna send our request to login
  $authProvider.signupUrl = `${API_URL}/register`;
  $authProvider.loginUrl = `${API_URL}/login`;

  // login with github 1a
  $authProvider.github({
    clientId: 'da646a7e69dcb7d885ec',
    url: `${API_URL}/oauth/github`
  });
}
