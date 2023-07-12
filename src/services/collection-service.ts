import { Collection } from "../types/collection";
import * as core from "@actions/core";
import axios from "axios";

/**
 * Create or update a collection.
 * @param collection
 */
export const createOrUpdateCollection = async (collection: Collection) => {
  const serverUrl = core.getInput("server_url", { required: true });
  const apiKey = core.getInput("api_key", { required: true });
  await axios.post(`https://${serverUrl}/api/collections`, collection, {
    headers: {
      Authorization: apiKey,
    },
  });

  core.info(`Created collection - Category: ${collection.uid}`);
};

/**
 * Delete a collection by uid
 * @param uid
 */
export const deleteCollection = async (uid: string) => {
  const serverUrl = core.getInput("server_url", { required: true });
  const apiKey = core.getInput("api_key", { required: true });

  await axios.delete(`https://${serverUrl}/api/collections/${uid}`, {
    headers: {
      Authorization: apiKey,
    },
  });
  core.info(`Delete collection - Category: ${uid}`);
};
