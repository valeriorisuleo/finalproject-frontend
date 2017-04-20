angular
.module('project4')
.controller('LoginCtrl', LoginCtrl);

LoginCtrl.$inject = ['$auth'];
function LoginCtrl($auth) {
  const vm = this;
  // login with github 1b
  function authenticate(provider) {
    $auth.authenticate(provider)
      .then(user => console.log(user));
  }

  vm.authenticate = authenticate;

  function register() {
    // whe we register a user we are sending user details here:
    $auth.signup(vm.user)
      .then(user => console.log(user));
  }
  vm.register = register;
  function login() {
    $auth.login(vm.credentials)
      .then(user => console.log(user));
  }
  vm.login = login;
}
