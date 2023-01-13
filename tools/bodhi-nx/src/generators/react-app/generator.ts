import {
  type Tree,
  type ProjectConfiguration,
  formatFiles,
  installPackagesTask,
  joinPathFragments,
  generateFiles,
  addProjectConfiguration,
  workspaceLayout,
} from "@nrwl/devkit";

export interface NodeCLIGeneratorOptions {
  name: string;
}

export default async function (
  tree: Tree,
  schema: NodeCLIGeneratorOptions
): Promise<() => void> {
  const libName = `${schema.name}`;

  const { appsDir } = workspaceLayout();

  const libRoot = joinPathFragments(appsDir, libName);

  generateFiles(tree, joinPathFragments(__dirname, "./files"), libRoot, {
    libRoot,
    libName,
    version: "0.0.1",
    template: "",
  });

  const projectConfiguration: ProjectConfiguration = {
    root: libRoot,
    sourceRoot: joinPathFragments(libRoot, "src"),
    projectType: "application",
    targets: {
      lint: {
        executor: "@nrwl/linter:eslint",
        outputs: ["{options.outputFile}"],
        options: {
          lintFilePatterns: [`${libRoot}/**/*.{ts,tsx,js,jsx}`],
          ignorePath: `${libRoot}/.eslintignore`,
        },
      },
      build: {
        executor: "@nrwl/vite:build",
        outputs: ["{options.outputPath}"],
        defaultConfiguration: "production",
        options: {
          outputPath: `${libRoot}/dist`,
        },
        configurations: {
          development: {},
          production: {},
        },
      },
      serve: {
        executor: "@nrwl/vite:dev-server",
        defaultConfiguration: "development",
        options: {
          buildTarget: `${libName}:build`,
        },
        configurations: {
          development: {
            buildTarget: `${libName}:build:development`,
            hmr: true,
          },
          production: {
            buildTarget: `${libName}:build:production`,
            hmr: false,
          },
        },
      },
      test: {
        executor: "@nrwl/vite:test",
        outputs: ["{projectRoot}/coverage"],
        options: {
          passWithNoTests: true,
        },
      },
    },
    tags: [],
  };

  addProjectConfiguration(tree, libName, projectConfiguration, true);

  await formatFiles(tree);

  return async (): Promise<void> => {
    installPackagesTask(tree, true);
  };
}
