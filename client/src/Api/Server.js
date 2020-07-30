const baseAddress = process.env.API_URL || window.location.protocol + '//' + window.location.hostname + '/api';
const url = `${baseAddress}/messages`;

async function handleResponse(response) {
  if (response.ok) {
    try {
      return await response.json();
    } catch (error) {
      console.error(`Could not parse server response ${error}`);
      return undefined;
    }
  }
  if (response.status === 400 || response.status === 404) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error('Network response was not ok.');
}

function handleError(error) {
  // eslint-disable-next-line no-console
  throw error;
}

function apiRequestWrapper(url, method, body = undefined) {
  let requestSettings = {
    headers: {
      'Content-Type': 'application/json',
    },
    method,
    body,
  };
  if (body) requestSettings.body = JSON.stringify(body);

  return fetch(url, requestSettings).then(handleResponse).catch(handleError);
}

export function getMessages() {
  return apiRequestWrapper(`${url}`, 'GET');
}

export function postMessage(message) {
  return apiRequestWrapper(`${url}`, 'POST', message);
}
