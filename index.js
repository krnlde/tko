/* eslint semi: 0 */
import * as utils from 'tko.utils'

import {
    // applyExtenders,
    // arrayChangeEventName,
    // deferUpdates,
    dependencyDetection,
    extenders,
    isObservable,
    isSubscribable,
    isWriteableObservable,
    observable,
    observableArray,
    peek,
    subscribable,
    toJS,
    toJSON,
    unwrap
} from 'tko.observable'

import {
    computed,
    isComputed,
    isPureComputed,
    pureComputed
} from 'tko.computed'

import { VirtualProvider } from 'tko.provider.virtual'
import { DataBindProvider } from 'tko.provider.databind'
import { ComponentProvider } from 'tko.provider.component'
import { AttributeProvider } from 'tko.provider.attr'
import { MultiProvider } from 'tko.provider.multi'
import {
  TextMustacheProvider, AttributeMustacheProvider
} from 'tko.provider.mustache'

import {
    applyBindingAccessorsToNode,
    applyBindings,
    applyBindingsToDescendants,
    applyBindingsToNode,
    contextFor,
    dataFor,
    getBindingHandler,
    BindingHandler,
    setDomNodeChildrenFromArrayMapping
} from 'tko.bind';

import {
    bindings as coreBindings
} from 'tko.binding.core';

import {
    anonymousTemplate,
    bindings as templateBindings,
    domElement,
    nativeTemplateEngine,
    renderTemplate,
    setTemplateEngine,
    templateEngine
    // templateSources
} from 'tko.binding.template';

import {
    bindings as ifBindings
} from 'tko.binding.if';

import {
    bindings as foreachBindings
} from 'tko.binding.foreach';

import {
  filters as punchesFilters
} from 'tko.filter.punches';

import {
  bindings as componentBindings
} from 'tko.binding.component'

import components from 'tko.utils.component'

var coreUtils = {}

utils.arrayForEach([
  'extend',
  'setTimeout',
  'arrayForEach',
  'arrayFirst',
  'arrayFilter',
  'arrayGetDistinctValues',
  'arrayIndexOf',
  'arrayMap',
  'arrayPushAll',
  'arrayRemoveItem',
  'getFormFields',
  'peekObservable',
  'postJson',
  'parseJson',
  'registerEventHandler',
  'stringifyJson',
  'range',
  'toggleDomNodeCssClass',
  'triggerEvent',
  'unwrapObservable',
  'objectForEach',
  'addOrRemoveItem',
  'setTextContent',
  'domData',
  'parseHtmlFragment',
  'setHtml',
  'compareArrays',
  'setDomNodeChildrenFromArrayMapping'
], function (coreUtil) {
  coreUtils[coreUtil] = utils[coreUtil]
})

coreUtils.domNodeDisposal = {
  addDisposeCallback: utils.addDisposeCallback,
  otherNodeCleanerFunctions: utils.otherNodeCleanerFunctions,
  removeDisposeCallback: utils.removeDisposeCallback,
  removeNode: utils.removeNode
}

utils.extend(coreUtils, {
  setDomNodeChildrenFromArrayMapping: setDomNodeChildrenFromArrayMapping,
  unwrapObservable: unwrap,
  peekObservable: peek
})

// Create the binding provider and default bindings.
const provider = new MultiProvider({
  globals: utils.options.bindingGlobals,
  providers: [
    new AttributeMustacheProvider(),
    new TextMustacheProvider(),
    new ComponentProvider(),
    new DataBindProvider(),
    new VirtualProvider(),
    new AttributeProvider()
  ]
})

utils.options.bindingProviderInstance = provider

provider.bindingHandlers.set(coreBindings)
provider.bindingHandlers.set(templateBindings)
provider.bindingHandlers.set(ifBindings)
provider.bindingHandlers.set(foreachBindings)
provider.bindingHandlers.set({ each: foreachBindings.foreach })
provider.bindingHandlers.set(componentBindings)

utils.extend(utils.options.filters, punchesFilters);

// Expose the API.
export default {
    // --- Top-level ---
  version: '{{VERSION}}',
  options: utils.options,

  extenders: extenders,
  filters: utils.options.filters,

    // --- Utilities ---
  cleanNode: utils.cleanNode,
  memoization: utils.memoization,
  removeNode: utils.removeNode,
  tasks: utils.tasks,
  utils: coreUtils,
  dependencyDetection: dependencyDetection,
  ignoreDependencies: dependencyDetection.ignore,

    // -- Observable ---
  isObservable: isObservable,
  isSubscribable: isSubscribable,
  isWriteableObservable: isWriteableObservable,
  isWritableObservable: isWriteableObservable,
  observable: observable,
  observableArray: observableArray,
  peek: peek,
  subscribable: subscribable,
  unwrap: unwrap,
  toJS: toJS,
  toJSON: toJSON,

    // ... Computed ...
  computed: computed,
  isComputed: isComputed,
  isPureComputed: isPureComputed,
  pureComputed: pureComputed,

    // --- Templates ---
  nativeTemplateEngine: nativeTemplateEngine,
  renderTemplate: renderTemplate,
  setTemplateEngine: setTemplateEngine,
  templateEngine: templateEngine,
  templateSources: {
    domElement: domElement,
    anonymousTemplate: anonymousTemplate
  },

    // --- Binding ---
  applyBindingAccessorsToNode: applyBindingAccessorsToNode,
  applyBindings: applyBindings,
  applyBindingsToDescendants: applyBindingsToDescendants,
  applyBindingsToNode: applyBindingsToNode,
  bindingHandlers: provider.bindingHandlers,
  bindingProvider: provider,
  contextFor: contextFor,
  dataFor: dataFor,
  getBindingHandler: getBindingHandler,
  BindingHandler: BindingHandler,
  virtualElements: utils.virtualElements,
  domNodeDisposal: coreUtils.domNodeDisposal,

    // --- Components ---
  components: components
}
