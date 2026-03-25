import * as core from "@actions/core";
import * as exec from "@actions/exec";
import {
  installNitro,
  getSourceMetadata,
} from "@chillicream/nitro-github-actions";
import pkg from "../package.json" with { type: "json" };

const nitroVersion: string = pkg.version;

async function executeCommand(): Promise<void> {
  try {
    const tag = core.getInput("tag", { required: true });
    const openapiCollectionId = core.getInput("openapi-collection-id", { required: true });
    const apiKey = core.getInput("api-key", { required: true });
    const jobId = core.getInput("job-id") || undefined;
    const sourceMetadata = JSON.stringify(getSourceMetadata(jobId));
    const cloudUrl = core.getInput("cloud-url") || null;

    const patterns = core
      .getInput("pattern", { required: true })
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const args: string[] = [
      "openapi",
      "upload",
      "--tag",
      tag,
      "--openapi-collection-id",
      openapiCollectionId,
      "--source-metadata",
      sourceMetadata,
    ];

    for (const pattern of patterns) {
      args.push("--pattern", pattern);
    }

    if (cloudUrl) {
      args.push("--cloud-url", cloudUrl);
    }

    const env = {
      ...process.env,
      NITRO_API_KEY: apiKey,
    };

    const exitCode = await exec.exec("nitro", args, { env });

    if (exitCode !== 0) {
      core.setFailed(`Nitro CLI exited with code ${exitCode}`);
    }
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error));
  }
}

async function run(): Promise<void> {
  await installNitro(nitroVersion);

  await executeCommand();
}

run();
