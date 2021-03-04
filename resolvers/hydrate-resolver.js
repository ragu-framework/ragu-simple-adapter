module.exports = (component) => ({
  hydrate: function (el, props, state) {
    this.render(el, props, state);
  },
  render: function (el, props, state) {
    el.raguSimpleAdapterDisconnectCallbackFunction = component(el, props, state);
  },
  disconnect: function (el) {
    el.raguSimpleAdapterDisconnectCallbackFunction && el.raguSimpleAdapterDisconnectCallbackFunction();
  }
});
