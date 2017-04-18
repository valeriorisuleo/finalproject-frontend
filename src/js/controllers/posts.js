angular
.module('project4')
.controller('PostsIndexCtrl', PostsIndexCtrl)
.controller('PostsShowCtrl', PostsShowCtrl);


// PostsIndexCtrl.$inject = ['$http'];
// function PostsIndexCtrl($http) {
//   $http.get('http://localhost:3000/api/posts')
//   .then(data => console.log(data));
// }





PostsIndexCtrl.$inject = ['Post'];
function PostsIndexCtrl(Post) {
  const vm = this;

  vm.all = Post.query();
  console.log(vm.all);

// on button click, you want the JS to run a function that finds the language of e.g. "english" and filters the array of contents to include just that

}

PostsShowCtrl.$inject = ['Post', '$stateParams'];
function PostsShowCtrl(Post, $stateParams) {
  const vm = this;
  vm.post = Post.get($stateParams);


  function changeLanguage() {
    console.log('Post', post);
    // if query search matches contents[i].language then equals vm.filtered;

  }
  vm.changeLanguage = changeLanguage;
}
