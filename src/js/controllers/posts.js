angular
.module('project4')
.controller('PostsIndexCtrl', PostsIndexCtrl)
.controller('PostsNewCtrl', PostsNewCtrl)
.controller('PostsShowCtrl', PostsShowCtrl)
.controller('PostsContentsNewCtrl', PostsContentsNewCtrl)
.controller('PostsContentsEditCtrl', PostsContentsEditCtrl);



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
}

PostsNewCtrl.$inject = ['Post', '$state', 'language'];
function PostsNewCtrl(Post, $state, language) {
  const vm = this;
  vm.post = { language: '' };
  vm.languages = language.all;

  function create(){
    // vm.post.user_id = 1;
    Post
      .save(vm.post)
      .$promise
      .then(() => $state.go('postsIndex'));
  }
  vm.create = create;
}

PostsContentsNewCtrl.$inject = ['Content', 'Post', '$stateParams','$state', 'language'];
function PostsContentsNewCtrl(Content, Post, $stateParams, $state, language) {
  const vm = this;
  vm.languages = language.all;
  vm.newContent = newContent;
  // DROPDOWNLIST: A language should not be available if we have a already a content written with that language
  // Step 1. We inject 'Post' in the controller beacause we have no idea of what post we are talking about
  // Step 2. We make a get request
  vm.post = Post.get($stateParams);

  vm.content = { language: '' };

  function checkLanguage(language){
  // Step 3. We loop through the 'contents' to find 1,2,3... 'content'(cause as we know a post can have many contents)
    return vm.post.contents.find((content)=>{
      return content.language === language;
    });
  }

  vm.checkLanguage = checkLanguage;

// Step 4. --> views/posts/contentsNew

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

PostsContentsEditCtrl.$inject = ['Content', 'Post', '$stateParams','$state', 'language'];
function PostsContentsEditCtrl(Content, Post, $stateParams, $state, language) {
  const vm = this;

  Post
    .get($stateParams)
    .$promise
    .then((post) => {
      vm.post = language.getPost(post);
    });

  // function postUpdate(){
  //   Post
  //   .update({id: vm.post.id, post: vm.post})
  //   .$promise
  //   .then(()=> $state.go('postsShow', {id: vm.post.id}));
  //
  // }
  // vm.update = postUpdate;

  function contentUpdate(){
    Content
      .update({id: vm.post.content.id, content: vm.post.content })
      .$promise
      .then(()=> $state.go('postsShow', { id: vm.post.id }));

  }
  vm.contentUpdate = contentUpdate;
}


PostsShowCtrl.$inject = ['Post', '$stateParams', 'language', '$state'];
function PostsShowCtrl(Post, $stateParams, language, $state) {
  const vm = this;

  vm.currentLanguage = language.get();
  vm.post = Post.get($stateParams);

  function postsDelete() {
    vm.post
    .$remove()
    .then(() => $state.go('postsIndex'));
  }

  vm.delete = postsDelete;

  function getTranslatedPost() {
    if(!vm.post.$resolved) return false;
    return language.getPost(vm.post);
  }

  vm.getTranslatedPost = getTranslatedPost;

}
