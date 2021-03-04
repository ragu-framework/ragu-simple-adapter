import {SimpleSingleComponentResolver} from "../component-resolver";
import {createTestConfig} from "./test-config-factory";
import * as path from "path";
import jsdom, {ConstructorOptions} from "jsdom";
import {ClientSideCompiler, RaguServerConfig} from "ragu-server";
import fs from "fs";

describe('ComponentResolver', () => {
  describe('client side config', () => {
    let compiler: ClientSideCompiler;
    let config: RaguServerConfig;
    let dom: jsdom.JSDOM;


    beforeAll(async () => {
      config = await createTestConfig();

      let componentFile = path.resolve(__dirname, 'components', 'hello-world.js');

      config.components.resolver = new SimpleSingleComponentResolver(
          config, componentFile);

      compiler = new ClientSideCompiler(config);
      await compiler.compileAll();
    });

    beforeEach(() => {
      const options: ConstructorOptions = {
        url: config.compiler.assetsPrefix,
        resources: 'usable',
        runScripts: 'dangerously',
      }
      dom = new jsdom.JSDOM(undefined, options);

      (global as any).navigator = dom.window.navigator;
      (global as any).window = dom.window;
      (global as any).document = dom.window.document;
    });

    const evalCompiledClient = async (componentName: string) => {
      const url = new URL(await compiler.getClientFileName(componentName));
      const client = fs.readFileSync(url as any).toString();
      eval(client);
    }

    it('renders a simple component', async () => {
      await evalCompiledClient('index');

      dom.window.disconnectStub = jest.fn();
      const resolvedComponent = (window as any)['test_components_index'].default;
      const div = dom.window.document.createElement('div');

      await resolvedComponent.render(div, {name: 'World'});

      expect(div.textContent).toContain('Hello, World');
      expect(dom.window.disconnectStub).not.toBeCalled();
      resolvedComponent.disconnect(div);
      expect(dom.window.disconnectStub).toBeCalled();
    });
  });
});
