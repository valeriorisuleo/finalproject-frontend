angular
.module('project4')
.factory('Post', Post)
.factory('Content', Content);

Post.$inject = ['$resource', 'API_URL'];
function Post($resource, API_URL) {
  return new $resource(`${API_URL}/posts/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}

Content.$inject = ['$resource', 'API_URL'];
function Content($resource, API_URL) {
  return new $resource(`${API_URL}/contents/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
