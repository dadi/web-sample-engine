const ENGINE = {
  extensions: ['.pug'],
  handle: 'pug'
}

module.exports = () => {
  const debug = require('debug')('web:templates:pug')
  const pug = require('pug')

  const EnginePug = function (options) {
    debug('Starting Pug.js engine...')

    this.config = options.config
    this.helpers = options.helpers
    this.pagesPath = options.pagesPath
    this.templates = {}
  }

  /**
    * Returns the engine core module.
    *
    * @return {function} The engine core module.
    */
  EnginePug.prototype.getCore = function () {
    return pug
  }

  /**
    * Returns information about the engine.
    *
    * @return {object} An object containing the engine name and version.
    */
  EnginePug.prototype.getInfo = function () {
    return {
      engine: ENGINE.handle
    }
  }

  /**
    * Initialises the engine.
    *
    * @return {Promise} A Promise that resolves when the engine is fully loaded.
    */
  EnginePug.prototype.initialise = function () {
    debug('Pug initialised')
  }

  /**
    * Registers the template with markup.
    *
    * @return {Promise} A Promise that resolves with the loaded data.
    */
  EnginePug.prototype.register = function (name, data, path) {
    this.templates[name] = pug.compile(data, {
      basedir: this.pagesPath,
      filename: path
    })
  }

  /**
    * Renders a template.
    *
    * @param {string} name The name of the template.
    * @param {string} data The template content.
    * @param {object} locals The variables to add to the context.
    * @param {object} options Additional render options.
    *
    * @return {Promise} A Promise that resolves with the render result.
    */
  EnginePug.prototype.render = function (name, data, locals, options) {
    return Promise.resolve(this.templates[name](locals))
  }

  return EnginePug
}

module.exports.metadata = ENGINE
