module.exports = (component) => ({
  hydrate: function (element, params, state) {
    element.raguSimpleAdapterData = component({element, params, state, isServer: false});

    if (element.raguSimpleAdapterData && element.raguSimpleAdapterData.connectedCallback) {
      element.raguSimpleAdapterData.connectedCallback();
    }
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
