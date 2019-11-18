# Processing.py (for skulpt)

This is a package for [skulpt] or on [github]. It implements as much of the Processing.py functions as possible. It is based on Processing.js.

## Instalation

When skulpt looks for `processing/__init__.js` return `skulpt_module/__init__.js`. Make sure that at that time `processing-sk.js` or `processing-sk-min.js` is loaded.

There are a few things you can configure before running processing in skulpt. After you've loaded `processing-sk(-min).js`. You can call `ProcessingSk.initProcessing` with a suspensionHandler, a breakHandler, and a eventPredicate. These things are:

- `suspensionHandler`: if you specify one in skulpt it makes sense to specify the same here. It gives you a way to handle suspensions differently or do something when a suspension is being handled it is an object with the suspension type and a function. Something like this:

```
{
    '*': function() {
        // do something here
    }
}
```

- `breakHandler`: a break handler is needed to be able to stop processing.sk. Because processing.sk has a run loop outside skulpt you might want to implement a way to stop processing. The breakHandler is a function that gets called every run loop, so it should do as little as possible. You could have a global interrupt variable and throw an error when it's truthy. Something like this:

```
function () {
    if (window.InterruptProcessing) {
        throw new Error('interrupt');
    }
}
```

- `eventPredicate`: a function that filters which events should be handled by processing.sk. Processing reacts to all global events that bubble up to the window. So if you want to filter out events that control your application for example key press events on your editor. This is where you do that. It'll look something like this:

```
var editor = document.getElementById('editor');

function(event) {
    if (editor.contains(e.target)) {
        return false
    }
}


[skulpt]: http://skulpt.org
[github]: http://github.com/skulpt/skulpt
```
