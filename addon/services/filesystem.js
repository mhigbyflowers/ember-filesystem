import Ember from 'ember';
import fetch from 'ember-network/fetch';

export default Ember.Service.extend({
  init() {
    this._super(...arguments);
    this.input = $('<input type="file">');
  },

  prompt(){
    return new Promise((resolve, reject) => {
      this.input.click();

      this.input.change(function () {
        if (this.files.length === 0) {
          return reject();
        }

        return resolve(this.files);
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
