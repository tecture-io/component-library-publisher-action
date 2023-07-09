import { Collection } from "../types/collection";
import * as core from "@actions/core";
import * as faunadb from "faunadb";

const faunaKey = core.getInput("database_key", { required: true });
const client = new faunadb.Client({ secret: faunaKey });
const q = faunadb.query;

export const createCollection = async (collection: Collection) => {
  // Create new collection on Fauna DB
  await client.query(
    q.Create(q.Collection("collections"), { data: collection }),
  );

  core.info(`Created collection - Category: ${collection.uid}`);
};

export const updateCollection = async (collection: Collection) => {
  // Update collection on Fauna DB
  core.info(`Update collection - Category: ${collection.uid}`);
};

export const deleteCollection = async (uid: string) => {
  // Delete collection on Fauna DB
  core.info(`Delete collection - Category: ${uid}`);
};
