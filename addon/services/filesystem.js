import Ember from 'ember';
import config from 'degenerator-ui/config/environment';

export default Ember.Controller.extend({
  filesystem: Ember.inject.service(),

  init() {
    this._super(...arguments);
    this.set('uploadFile', null);
  },

  actions:{
    selectPhoto() {
      this.get('filesystem').prompt().then((upload) => {
        this.set('uploadFile', upload);
      });
    },
    uploadImg(formValues){
      if (!this.uploadFile) {
        return alert('Yo! Upload a file!');
      }

      this.get('filesystem').fetch(`${config.DS.host}/uploads`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
        },
        body: {
          ...formValues,
          uploadFile: this.get('uploadFile'),
        },
      }).then((res) => res.json())
      .then((data) => {
        this.store.push(data);
        this.transitionToRoute('degenerator.main');
      });
    },
  }
});
