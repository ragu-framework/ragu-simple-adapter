import {RaguServerBaseConfigProps} from "ragu-server";
import {AdapterConfigFactory} from "ragu-cli/src/config/adapter-config-factory";
import {createRaguSimpleConfig} from "../config";
import {SimpleSingleComponentResolver} from "../component-resolver";


export class ConfigFactory implements AdapterConfigFactory {
  createDirectoryConfig(overrides: RaguServerBaseConfigProps) {
    return createRaguSimpleConfig(overrides) as any;
  }

  createSingleComponentConfig(overrides: RaguServerBaseConfigProps, componentPath: string, statePath?: string) {
    const config = this.createDirectoryConfig(overrides);

    config.components.resolver = new SimpleSingleComponentResolver(
        config,
        componentPath,
        statePath && statePath
    );

    return config as any;
  }
}
