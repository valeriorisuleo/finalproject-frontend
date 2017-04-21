angular
  .module('project4')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$rootScope', '$state', '$auth', 'language'];
function MainCtrl($rootScope, $state, $auth, language) {
  const vm = this;
  vm.isAuthenticated = $auth.isAuthenticated;
  vm.languages = language.all;

  function setLanguage(code) {
    return language.set(code);
  }
  vm.setLanguage = setLanguage;

  function currentLanguage() {
    return language.get();
  }
  vm.currentLanguage = currentLanguage;

  $rootScope.$on('error', (e, err) => {
    vm.stateHasChanged = false;
    vm.message = err.data.message;
    $state.go('login');
  });

  $rootScope.$on('$stateChangeSuccess', () => {
    if(vm.stateHasChanged) vm.message = null;
    if(!vm.stateHasChanged) vm.stateHasChanged = true;
    if($auth.getPayload()) vm.currentUser = $auth.getPayload();
  });

  const protectedStates = ['postsNew'];

  $rootScope.$on('$stateChangeStart', (e, toState) => {
    if((!$auth.isAuthenticated() && protectedStates.includes(toState.name))) {
      e.preventDefault();
      $state.go('login');
      vm.message = 'You must be logged in to access this page.';
    }
    vm.pageName = toState.name;
  });

  function logout() {
    $auth.logout();
    $state.go('postsIndex');
  }
  vm.logout = logout;

}
