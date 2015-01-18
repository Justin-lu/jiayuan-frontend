// there are some js helper
var Helper = {
  root: 'http://115.28.145.57:3388/',
  version: 'v1.0',
  urlWithRoot: function(url){
    return this.root + url;
  },

  apiUrl: function(url){
    return this.root + "api/"  + this.version + url;
  },

  getUrlWithId: function(id) {
    return "/#/show/" + id;
  }
}
