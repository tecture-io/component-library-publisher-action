import { Collection } from "../types/collection";
import * as core from "@actions/core";

export const createCollection = async (collection: Collection) => {
  // Create new collection on Fauna DB
  core.info(`Create collection - Category: ${collection.uid}`);
};

export const updateCollection = async (collection: Collection) => {
  // Update collection on Fauna DB
  core.info(`Update collection - Category: ${collection.uid}`);
};

export const deleteCollection = async (uid: string) => {
  // Delete collection on Fauna DB
  core.info(`Delete collection - Category: ${uid}`);
};
