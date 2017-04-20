angular
  .module('project4')
  .service('language', Language);

function Language() {
  let currentLanguage = 'en';

  this.all = [
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'it', name: 'Italiano' }
  ];

  this.notFound = [
    { code: 'en', body: 'No translation found.' },
    { code: 'fr', body: 'Aucune traduction trouvée' },
    { code: 'es', body: 'No se encontró ninguna traducción' },
    { code: 'it', body: 'Nessuna traduzione trovata' }
  ];

  this.set = function setLanguage(code) {
    currentLanguage = code;
  };

  this.get = function getLanguage() {
    return currentLanguage;
  };

  this.getPost = function getPost(post) {
    post.content = post.contents.find(content => content.language === this.get()) || this.notFound.find(translation => translation.code === this.get());

    return post;
  };
}
