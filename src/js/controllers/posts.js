angular
.module('project4')
.controller('PostsIndexCtrl', PostsIndexCtrl)
.controller('PostsNewCtrl', PostsNewCtrl)
.controller('PostsContentsNewCtrl', PostsContentsNewCtrl)
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

PostsNewCtrl.$inject = ['Post', '$state', 'language'];
function PostsNewCtrl(Post, $state, language) {
  const vm = this;
  vm.post = { language: '' };
  vm.languages = language.all;

// function create must take the content and push it into the array of the post and then create it maybe?

  function create(){
    // vm.post.user_id = 1;
    Post
      .save(vm.post)
      .$promise
      .then(() => $state.go('postsIndex'));
  }
  vm.create = create;
}

PostsContentsNewCtrl.$inject = ['Content', '$stateParams','$state', 'language'];
function PostsContentsNewCtrl(Content, $stateParams, $state, language) {
  const vm = this;
  vm.languages = language.all;
  vm.newContent = newContent;

  vm.content = { language: '' };

  function newContent() {
    vm.content.post_id = $stateParams.id;
    Content
      .save(vm.content)
      .$promise
      // .then((response) => console.log(response));
      .then(() => $state.go('postsShow', $stateParams));
  }
  vm.newContent = newContent;
}

PostsShowCtrl.$inject = ['Post', '$stateParams', 'language'];
function PostsShowCtrl(Post, $stateParams, language) {
  const vm = this;
  vm.post = Post.get($stateParams);

  function getTranslatedPost() {
    if(!vm.post.$resolved) return false;
    return language.getPost(vm.post);
  }

  vm.getTranslatedPost = getTranslatedPost;

}
