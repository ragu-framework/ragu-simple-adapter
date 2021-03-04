module.exports = (el, props) => {
  el.innerHTML = 'Hello, ' + props.name

  return () => {
    window.disconnectStub();
  }
}
