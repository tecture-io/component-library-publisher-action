import {Collection} from "../types/collection";
import * as core from "@actions/core";
import axios from "axios";

/**
 * Create or update a collection.
 * @param collection
 * @param authToken
 */
export const createOrUpdateCollection = async (collection: Collection, authToken: string) => {
    const serverUrl = core.getInput("server_url", {required: true});
    await axios.post(`https://${serverUrl}/component-packs`, collection, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });

    core.info(`Created collection - Category: ${collection.uid}`);
};

/**
 * Delete a collection by uid
 * @param uid
 * @param authToken
 */
export const deleteCollection = async (uid: string, authToken: string) => {
    const serverUrl = core.getInput("server_url", {required: true});

    await axios.delete(`https://${serverUrl}/component-packs/${uid}`, {
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
    });
    core.info(`Delete collection - Category: ${uid}`);
};
