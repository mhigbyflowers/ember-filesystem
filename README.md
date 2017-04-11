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

<div style="position: relative; height: 0px; overflow: hidden; max-width: 100%; padding-bottom: 56.25%;"><iframe src="https://ember-twiddle.com/06a8ed4dd62a5ae9f4ec95d46a9f7662?fullScreen=true" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"></iframe></div>

## Submitting Files

One of the hard things working with File uploads is the change between JSON body and `form-data`.
The `fetch` method provided by `ember-filesystem` helps clarify some of this.
Instead of trying to match every API with an Ember Data extension, using a wrapper around `window.fetch`, then we can use the results and pass it into Ember Data.

Here is another example that uses a small express server that grabs the meta data from a file and formats it to the JSON API spec.

See the code on [Ember Twiddle]()
