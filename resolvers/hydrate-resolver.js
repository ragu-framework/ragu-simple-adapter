module.exports = (component) => ({
  hydrate: function (el, props, state) {
    this.render(el, props, state);
  },
  render: function (element, params, state) {
    element.raguSimpleAdapterData = component({element, params, state, isServer: false});

    if (!element.raguSimpleAdapterData) {
      return;
    }

    if (element.raguSimpleAdapterData.html) {
      element.innerHTML = element.raguSimpleAdapterData.html;
    }

    if (element.raguSimpleAdapterData.connectedCallback) {
      element.raguSimpleAdapterData.connectedCallback();
    }
  },
  disconnect: function (el) {
    el.raguSimpleAdapterData &&
    el.raguSimpleAdapterData.disconnectedCallback &&
    el.raguSimpleAdapterData.disconnectedCallback();

    delete el.raguSimpleAdapterData;
  }
});
