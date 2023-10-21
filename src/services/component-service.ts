import * as core from "@actions/core";
import axios from "axios";
import {Component} from "../types/component";

/**
 * Create or update a component.
 * @param collectionUid
 * @param component
 * @param authToken
 */
export const createOrUpdateComponent = async (
    collectionUid: string,
    component: Component,
    authToken: string
) => {
    const serverUrl = core.getInput("server_url", {required: true});
    await axios.post(
        `https://${serverUrl}/component-packs/${collectionUid}/components`,
        component,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
    );

    core.info(`Created or updated component - Component: ${component.uid}`);
};

/**
 * Delete a component by uid and collectionUid
 * @param collectionUid
 * @param componentUid
 * @param authToken
 */
export const deleteComponent = async (
    collectionUid: string,
    componentUid: string,
    authToken: string
) => {
    const serverUrl = core.getInput("server_url", {required: true});

    await axios.delete(
        `https://${serverUrl}/component-packs/${collectionUid}/components/${componentUid}`,
        {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        },
    );
    core.info(`Delete component - Component: ${componentUid}`);
};
