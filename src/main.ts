import * as core from "@actions/core";
import * as github from "@actions/github";
import { Octokit } from "@octokit/rest";
import * as path from "path";
import {
  createOrUpdateCollection,
  deleteCollection,
} from "./services/collection-service";
import { readJsonContent } from "./file-utils";
import {
  createOrUpdateComponent,
  deleteComponent,
} from "./services/component-service";

const token = core.getInput("github_token", { required: true });
const octokit = new Octokit({ auth: `token ${token}` });

async function getAllFiles(owner, repo, pull_number) {
  let allFiles = [];
  let page = 1;

  while (true) {
    const { data: files } = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number,
      per_page: 100, // Fetch 100 files per request
      page,
    });

    if (files.length === 0) {
      break; // Exit loop if no more files
    }

    allFiles = allFiles.concat(files);
    page++;
  }

  return allFiles;
}

const run = async () => {
  try {
    const { owner, repo, number: pull_number } = github.context.issue;

    const files = await getAllFiles(owner, repo, pull_number);

    // Create or update collections
    for (const file of files) {
      if (file.filename.endsWith("collection.json")) {
        const filePath = path.resolve(".", file.filename);
        const [uid] = file.filename.split("/");

        if (file.status === "added" || file.status === "modified") {
          const jsonData = readJsonContent(filePath);
          await createOrUpdateCollection({
            uid,
            name: jsonData.name,
          });
        }
      }
    }

    // Create, update or delete components
    for (const file of files) {
      if (file.filename.endsWith("component.json")) {
        const filePath = path.resolve(".", file.filename);
        const [collectionUid, componentUid] = file.filename.split("/");

        if (file.status === "added" || file.status === "modified") {
          const jsonData = readJsonContent(filePath);
          await createOrUpdateComponent(collectionUid, {
            uid: componentUid,
            name: jsonData.name,
            short: jsonData.short || "",
            description: jsonData.description || "",
          });
        }

        if (file.status === "removed") {
          await deleteComponent(collectionUid, componentUid);
        }
      }
    }

    // Delete collections
    for (const file of files) {
      if (file.filename.endsWith("collection.json")) {
        const [uid] = file.filename.split("/");

        if (file.status === "removed") {
          await deleteCollection(uid);
        }
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
};

run().catch(console.error);
