# DADI Web sample engine interface

[![npm (scoped)](https://img.shields.io/npm/v/@dadi/web-sample-engine.svg?maxAge=10800&style=flat-square)](https://www.npmjs.com/package/@dadi/web-sample-engine)
[![coverage](https://img.shields.io/badge/coverage-0%25-red.svg?style=flat?style=flat-square)](https://github.com/dadi/web-sample-engine)
[![Build Status](https://travis-ci.org/dadi/web-sample-engine.svg?branch=master)](https://travis-ci.org/dadi/web-sample-engine)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## API

### Metadata block

All engine interfaces must have a named export called `metadata`, consisting of an object with the following properties:

- `extensions`: An array of file extensions supported by the engine (including the trailing dot);

- `handle`: A string uniquely identifying the template engine.

### Main block

The main export must be a factory function that returns a constructor for the engine. All `require()` calls **must happen inside this function**, so that dependencies are lazy-loaded and only instantiated if/when there is a template requiring this particular engine.

### Constructor

The engine constructor will be called with an `options` object, containing the following properties:

- `additionalTemplates`: An array of absolute paths to any templates found with an extension supported by this engine that haven't already been loaded due to not having a JSON schema file (i.e. are not pages). This is used by engines that wish to actively load/compile partial templates;

- `config`: A reference to the global configuration object from core;

- `pagesPath`: The absolute path to the directory containing pages/templates;

- `templates`: A hash map containing all the templates that have been loaded.

### Functions

> #### `.finishLoading()`
> **Arguments:** N/A
>
> **Returns:** Function
>
> **Required:** No

This method is fired by the core after all pages have been loaded. It can be used by engines to perform clean-up operations or to load additional templates (e.g. partials).

---

> #### `.getCore()`
> **Arguments:** N/A
>
> **Returns:** Function
>
> **Required:** Yes

Must return a reference to the core module used by the template engine.

---


> #### `.getInfo()`
> **Arguments:** N/A
>
> **Returns:** Object
>
> **Required:** Yes

Must return an object containing information about the template engine, such as name and version.

---

> #### `.initialise()`
> **Arguments:** N/A
>
> **Returns:** Promise
>
> **Required:** Yes

This method is called when the core loads a page that requires this particular template engine. Because it can return a Promise, it can do any necessary asynchronous initialisation routines and resolve when finished.

---

> #### `.register()`
> **Arguments:**
> - name: The name of the template to be registered
> - data: The content (markup) of the template
> - path: The absolute path to the template file
>
> **Returns:** Promise
>
> **Required:** Yes

This method is called when the core reads the content of a page template and wishes to register it with the engine. This is a good place to compile templates into functions. It can return a Promise, so the compilation can happen asynchronously.


---

> #### `.render()`
> **Arguments:**
> - name: The name of the template to be rendered
> - data: The content (markup) of the template
> - locals: An object with data to be passed to the template
> - options: A list of options passed by the core. Currently, it only includes a `keepWhitespace` property, which engines may wish to implement, specifying whether or not whitespace in templates should be preserved.
>
> **Returns:** Promise
>
> **Required:** Yes

This method is called when a view wishes to render a template as HTML. Depending on how the engine interface is implemented, this could involve a compile step or simply loading a function from a cache. It returns a Promise, so asynchronous operations can be executed.
