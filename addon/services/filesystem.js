import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Service.extend({
  prompt(){
    const input = document.createElement('input');
    input.setAttribute("type","file");
    input.click();
    return input.files;
  },

  fetch(url, options){
    var data = new FormData();
    for (var key in options.body) {
      if (options.body.hasOwnProperty(key)) {
        data.append(key, options.body[key]);
      }
    }

    return fetch(url,{...options, body: data});
  }
});
