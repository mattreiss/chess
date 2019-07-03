let Languages = {};

Languages.en = {
  helloText: 'hello',
};

Languages.es = Object.assign({}, Languages.en, {
  helloText: 'hola'
});

Languages.fr = Object.assign({}, Languages.en, {
  helloText: 'bonjour'
});

Languages.it = Object.assign({}, Languages.en, {
  helloText: 'ciao'
});

export default Languages;
