module.exports = (component, stateResolver) => ({
  render: function (props) {
    return stateResolver(props).then((state) => {
      var result = component({...props, state});

      return {
        html: result.html,
        state
      }
    })
  }
})
