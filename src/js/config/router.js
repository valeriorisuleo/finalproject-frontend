angular
  .module('project4')
  .config(Router);

Router.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function Router($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $stateProvider

    .state('postsIndex', {
      url: '/',
      templateUrl: 'js/views/posts/index.html',
      controller: 'PostsIndexCtrl as postsIndex'
    })
    .state('postsNew', {
      url: '/new',
      templateUrl: 'js/views/posts/new.html',
      controller: 'PostsNewCtrl as postsNew'
    })
    .state('postsShow', {
      url: '/posts/:id',
      templateUrl: 'js/views/posts/show.html',
      controller: 'PostsShowCtrl as postsShow'
    })
    .state('postsEdit', {
      url: '/posts/:id/edit',
      templateUrl: 'js/views/posts/edit.html',
      controller: 'PostsEditCtrl as postsEdit'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/auth/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/auth/register.html',
      controller: 'LoginCtrl as register'
    })
    .state('postsContentsNew', {
      url: '/posts/:id/content/new',
      templateUrl: 'js/views/posts/contentsNew.html',
      controller: 'PostsContentsNewCtrl as postsContentsNew'
    })
    .state('postsContentsEdit', {
      url: '/posts/:id/content/edit',
      templateUrl: 'js/views/posts/contentsEdit.html',
      controller: 'PostsContentsEditCtrl as postsContentsEdit'
    });


  $urlRouterProvider.otherwise('/');
}
