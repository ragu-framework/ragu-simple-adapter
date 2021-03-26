import {SimpleSingleComponentResolver} from "../component-resolver";
import {createTestConfig} from "./test-config-factory";
import * as path from "path";
import jsdom, {ConstructorOptions} from "jsdom";
import {ComponentsCompiler, RaguServerConfig, ServerSideCompiler} from "ragu-server";
import fs from "fs";
import {ComponentRenderService} from "ragu-server/src/services/component-render-service";

describe('ComponentResolver', () => {
  describe('client side config', () => {
    let compiler: ComponentsCompiler;
    let config: RaguServerConfig;
    let dom: jsdom.JSDOM;


    beforeAll(async () => {
      config = await createTestConfig();

      let componentFile = path.resolve(__dirname, 'components', 'hello-world');

      config.components.resolver = new SimpleSingleComponentResolver(
          config, componentFile);

      compiler = new ComponentsCompiler(config);
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

    it('renders the component from server', async () => {
      config.ssrEnabled = true;
      const compiler = new ServerSideCompiler(config);
      await compiler.compileAll();

      const componentPath = compiler.compiledComponentPath('hello-world');

      const renderResult = await new ComponentRenderService(config)
          .renderComponent('hello-world', [], componentPath, "http://", {name: 'World!'}, {} as any);

      expect(renderResult.html).toContain('Hello, World!');
    });

    it('renders the component from server with a state', async () => {
      let componentFile = path.resolve(__dirname, 'components', 'hello-world-state');
      let stateFile = path.resolve(__dirname, 'components', 'state');

      config.components.resolver = new SimpleSingleComponentResolver(
          config, componentFile, stateFile);

      config.ssrEnabled = true;

      const compiler = new ServerSideCompiler(config);
      await compiler.compileAll();

      const componentPath = compiler.compiledComponentPath('hello-world-state');

      const renderResult = await new ComponentRenderService(config)
          .renderComponent('hello-world-state', [], componentPath, "http://", {toBeTranslatedName: 'World!'}, {} as any);

      expect(renderResult.html).toContain('Hello, World!');
    });

    it('renders a simple component', async () => {
      await evalCompiledClient('hello-world');

      const resolvedComponent = (window as any)['test_components_hello-world'].default;
      const div = dom.window.document.createElement('div');
      (div as any).disconnectedStub = jest.fn();
      (div as any).connectedStub = jest.fn();

      await resolvedComponent.render(div, {name: 'World'});

      expect(div.textContent).toContain('Hello, World');

      div.click();
      expect((div as any).connectedStub).toBeCalled();
      expect((div as any).disconnectedStub).not.toBeCalled();
      resolvedComponent.disconnect(div);
      expect((div as any).disconnectedStub).toBeCalled();
    });
  });
});
