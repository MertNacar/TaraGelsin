import { URL, API } from "react-native-dotenv";

const url = endpoint => {
  return `${URL}/${API}/${endpoint}`;
};

const get = async (endpoint, token) => {
  try {
    let res = await fetch(url(endpoint), {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json"
      }
    });
    return await res.json();
  } catch {
    return { err: false };
  }
};

const getWithoutToken = async (endpoint) => {
  try {
    let res = await fetch(url(endpoint))
    return await res.json();
  } catch {
    return { err: false };
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
    return await res.json();
  } catch {
    return { err: false };
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
    return await res.json();
  } catch {
    return { err: false };
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
    return await res.json();
  } catch {
    return { err: false };
  }
};

export { get, getWithoutToken, post, postWithoutToken, put };
