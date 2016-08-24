import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Service.extend({
  prompt(){
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.setAttribute("type","file");
      input.click();

      Ember.$(input).change(() => {
        if (input.files.length === 0) {
          return reject();
        }

        return resolve(input.files);
      });
    })
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
