import * as core from "@actions/core";
import axios from "axios/index";

/**
 * Get an auth token from the auth0 endpoint.
 */
export const getAuthToken = async () => {
    const authUrl = core.getInput("auth_url", {required: true});
    const clientId = core.getInput("client_id", {required: true});
    const clientSecret = core.getInput("client_secret", {required: true});
    const audience = core.getInput("audience", {required: true});

    const response = await axios.post(authUrl, {
            client_id: clientId,
            client_secret: clientSecret,
            audience: audience,
            grant_type: "client_credentials",
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });

    return response.data.access_token;
}
