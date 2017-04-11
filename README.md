# Ember-filesystem

A simple addon for working with File uploads and inputs.

## Installation

* `ember install ember-filesystem`

## Use

`ember-filesystem` provides a `filesystem` service with two functions:

* `prompt` - Opens a file picker using a hidden `input` and returns a promise that resolves with the selected files (or rejects if the user cancels)
* `fetch` - Allows use of the `window.fetch` API while formatting input data to be properly encoded.

### Prompt for File Inputs

To see this in action, we'll make a component called `file-picker`:

```js
// components/file-picker.js
import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  filesystem: Ember.inject.service(),

  actions: {
    openDialog() {
      this.get('filesystem').prompt().then((files) => {
        // Triggers the action the current component passing the files that were selected
        // Converts from FileList to JS Array
        this.action(Array.from(files));
      });
    }
  }
});
```

Here is the template for this component, we'll just make a simple button that triggers the `openDialog` action:

```htmlbars
<button {{action "openDialog"}}>Upload a file</button>
```

Let's see how this could be used in action with the `mut` helper to modify values in a form.

```htmlbars
{{#each selectedFiles as |file|}}
  <p>{{file.name}}</p>
{{/each}}

{{log selectedFiles}}

{{file-picker action=(action (mut selectedFiles))}}
```

See this example in [Ember Twiddle](https://ember-twiddle.com/06a8ed4dd62a5ae9f4ec95d46a9f7662).

## Submitting Files

One of the hard things working with File uploads is the change between JSON body and `form-data`.
The `fetch` method provided by `ember-filesystem` helps clarify some of this.
Instead of trying to match every API with an Ember Data extension, using a wrapper around `window.fetch`, then we can use the results and pass it into Ember Data.

Here is another example that uses a small express server that grabs the meta data from a file and formats it to the JSON API spec.


```js
import Ember from 'ember';

export default Ember.Controller.extend({
  filesystem: Ember.inject.service(),
  selectedFiles: [],

  actions: {
    upload(file) {
      const fetch = this.get('filesystem.fetch');

      fetch('https://arcane-stream-63735.herokuapp.com/upload', {
          method: 'POST',
          headers: {
            accept: 'application/json',
          },
          body: { 'profile-image': file[0] },
        }).then(res => res.json())
        .then((data) => {
          const upload = this.store.pushPayload(data);
        });
    },
  }
});
```

Notice that we send the file from our file upload, then we call `filesystem.fetch` like a regular `window.fetch` request.
But, under the hood Ember Filesystem is setting headers and formatting the `body` to fit file uploads (making it easier to work with files without forgetting the edge cases).

See the code on [Ember Twiddle](https://ember-twiddle.com/06a8ed4dd62a5ae9f4ec95d46a9f7662?openFiles=controllers.application.js%2C)
