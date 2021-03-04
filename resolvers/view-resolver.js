module.exports = (component, stateResolver) => ({
  render: function () {
    throw new Error('SSR is not supported for ragu-simple-adapter');
  }
})
