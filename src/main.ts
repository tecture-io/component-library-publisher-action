import * as core from "@actions/core";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";
import * as path from "path";
import {
  createCollection,
  deleteCollection,
  updateCollection,
} from "./services/collection-service";
import { readJsonContent } from "./file-utils";

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
    for (const file of files) {
      if (file.filename.endsWith("collection.json")) {
        const filePath = path.resolve(".", file.filename);
        const [uid] = file.filename.split("/");

        if (file.status === "added") {
          const jsonData = readJsonContent(filePath);
          await createCollection({
            uid,
            name: jsonData.name,
          });
        } else if (file.status === "modified") {
          const jsonData = readJsonContent(filePath);
          await updateCollection({
            uid,
            name: jsonData.name,
          });
        } else if (file.status === "removed") {
          await deleteCollection(uid);
        }
      }
    }

    // Process components
  } catch (error) {
    core.setFailed(error.message);
  }
};

run();
