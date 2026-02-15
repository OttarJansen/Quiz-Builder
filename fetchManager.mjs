import HTTP from "./http.mjs";

async function get(url, contentType = HTTP.contentTypes.application.json) {
    return await runRequest(HTTP.methods.GET, url, null, contentType);
}

async function post(url, data, contentType = HTTP.contentTypes.application.json) {
    return await runRequest(HTTP.methods.POST, url, data, contentType);
}

async function put(url, data, contentType = HTTP.contentTypes.application.json) {
    return await runRequest(HTTP.methods.PUT, url, data, contentType);
}

async function patch(url, data, contentType = HTTP.contentTypes.application.json) {
    return await runRequest(HTTP.methods.PATCH, url, data, contentType);
}

async function del(url, contentType = HTTP.contentTypes.application.json) {
    return await runRequest(HTTP.methods.DELETE, url, null, contentType);
}

async function runRequest(method, url, data, contentType) {
    const headers = {
        method,
        headers: {
            'Content-Type': contentType,
        }
    };

    if (data) {
        headers.body = JSON.stringify(data);
    }

    let response = await fetch(url, headers);

    if (contentType === HTTP.contentTypes.application.json) {
        response = await response.json();
    } else {
        response = await response.text();
    }

    return response;
}

export { get, post, put, patch, del };
