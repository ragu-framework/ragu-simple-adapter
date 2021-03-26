import {createConfig, RaguServerBaseConfigProps} from "ragu-server";
import {SimpleComponentResolver} from "./component-resolver";

export const createRaguSimpleConfig = (requiredConfig: RaguServerBaseConfigProps = {}) => {
  let config = createConfig({...requiredConfig, ssrEnabled: false});

  if (!requiredConfig.components?.resolver) {
    config.components.resolver = new SimpleComponentResolver(config);
  }

  return config;
}
