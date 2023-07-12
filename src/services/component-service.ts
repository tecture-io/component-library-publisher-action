import * as core from "@actions/core";
import axios from "axios";
import { Component } from "../types/component";

/**
 * Create or update a component.
 * @param collectionUid
 * @param component
 */
export const createOrUpdateComponent = async (
  collectionUid: string,
  component: Component,
) => {
  const serverUrl = core.getInput("server_url", { required: true });
  const apiKey = core.getInput("api_key", { required: true });
  await axios.post(
    `https://${serverUrl}/api/collections/${collectionUid}/components`,
    component,
    {
      headers: {
        Authorization: apiKey,
      },
    },
  );

  core.info(`Created or updated component - Component: ${component.uid}`);
};

/**
 * Delete a component by uid and collectionUid
 * @param collectionUid
 * @param componentUid
 */
export const deleteComponent = async (
  collectionUid: string,
  componentUid: string,
) => {
  const serverUrl = core.getInput("server_url", { required: true });
  const apiKey = core.getInput("api_key", { required: true });

  await axios.delete(
    `https://${serverUrl}/api/collections/${collectionUid}/components/${componentUid}`,
    {
      headers: {
        Authorization: apiKey,
      },
    },
  );
  core.info(`Delete component - Component: ${componentUid}`);
};
