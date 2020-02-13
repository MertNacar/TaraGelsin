import { URL, API } from "react-native-dotenv";

const url = endpoint => {
  return URL + "/" + API + "/" + endpoint;
};

const get = async (endpoint, token) => {
  try {
    let res = await fetch(url(endpoint), {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    });
    if (res.status === 200) return await res.json();
    else throw new Error()
  } catch {
    return { err: true };
  }
};

const getWithoutToken = async (endpoint) => {
  try {
    let res = await fetch(url(endpoint))
    if (res.status === 200) return await res.json();
    else throw new Error()
  } catch {
    return { err: true };
  }
};

const post = async (endpoint, body = {}, token) => {
  try {
    let res = await fetch(url(endpoint), {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: body
      })
    });
    if (res.status === 200) return await res.json();
    else throw new Error()
  } catch {
    return { err: true };
  }
};

const postWithoutToken = async (endpoint, body = {}) => {
  try {
    let res = await fetch(url(endpoint), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: body
      })
    });
    if (res.status === 200) return await res.json();
    else throw new Error()
  } catch {
    return { err: true };
  }
};

const put = async (endpoint, body = {}, token) => {
  try {
    let res = await fetch(url(endpoint), {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: body
      })
    });
    if (res.status === 200) return await res.json();
    else throw new Error()
  } catch {
    return { err: true };
  }
};

export { get, getWithoutToken, post, postWithoutToken, put };
