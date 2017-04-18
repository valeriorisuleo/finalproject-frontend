angular
.module('project4')
.factory('Content', Content);

Content.$inject = ['$resource', 'API_URL'];
function Content($resource, API_URL) {
  return new $resource(`${API_URL}/contents/:id`, { id: '@id' }, {
    update: { method: 'PUT' }
  });
}
