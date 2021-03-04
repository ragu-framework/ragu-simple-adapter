
      var component = require('/Users/carlosmaniero/Projects/ragu-project/ragu-simple-adapter/testing/components/hello-world.js');
      var resolver = require('/Users/carlosmaniero/Projects/ragu-project/ragu-simple-adapter/resolvers/hydrate-resolver');

      module.exports.default = (resolver.default || resolver)(component.default || component);
    