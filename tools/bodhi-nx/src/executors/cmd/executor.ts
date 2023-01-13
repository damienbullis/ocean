import { commandSync } from "execa";

export default async function buildExecutor(options: {
  command: string;
  cwd?: string;
  env: Record<string, string>;
}) {
  console.info(`Executing workspace:run-command...`);

  const overrides = JSON.parse(process.argv[2]).overrides
    .__overrides_unparsed__;

  commandSync(`${options.command} ${overrides.join(" ")}`, {
    cwd: options.cwd,
    env: options.env,
    stdio: [process.stdin, process.stdout, "pipe"],
  });

  return { success: true };
}
