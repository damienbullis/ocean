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
    projectType: "library",
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
        executor: "nx:run-commands",
        outputs: [`${libRoot}/dist`],
        options: {
          commands: [
            {
              command: `tsc --project ${libRoot}/tsconfig.build.json`,
            },
          ],
        },
      },
      cli: {
        executor: "@bodhidigital/bodhi-nx:cmd",
        dependsOn: [{ target: "build", projects: "self" }],
        options: {
          command: `node ${libRoot}/dist/main.js`,
        },
      },
      test: {
        executor: "@nrwl/jest:jest",
        outputs: [`${libRoot}/reports/coverage`],
        options: {
          jestConfig: `${libRoot}/jest.config.ts`,
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
