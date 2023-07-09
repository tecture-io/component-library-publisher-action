import * as core from "@actions/core";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";
import * as fs from "fs";
import * as path from "path";

const token = core.getInput("github_token", { required: true });

const octokit = new Octokit({ auth: `token ${token}` });

const run = async () => {
  try {
    const { owner, repo, number: pull_number } = github.context.issue;

    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number,
    });

    // Process collections
    files.forEach((file) => {
      if (file.filename.endsWith("collection.json")) {
        const filePath = path.resolve(".", file.filename);

        const [_, category] = file.filename.split("/");

        if (file.status === "added") {
          const uid = category.replace(".json", "");
          core.info(`Added collection.json - Category: ${uid}`);

          // Read collection.json file
          const fileContent = fs.readFileSync(filePath, "utf-8");
          const jsonData = JSON.parse(fileContent) as { name: string };

          core.info("JSON Data,");
          core.info(JSON.stringify(jsonData));

          const collection = {
            uid,
            name: jsonData.name,
          };

          core.info("JSON Data");
          core.info(JSON.stringify(collection));
        } else if (file.status === "modified") {
          core.info(`Modified collection.json - Category: ${category}`);
        } else if (file.status === "removed") {
          core.info(`Removed collection.json - Category: ${category}`);
        }
      }
    });
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
