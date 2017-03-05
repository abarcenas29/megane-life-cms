import 'whatwg-fetch'

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
// function parseJSON (response) {
//   return response.json()
// }

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response.json()
  }

  const error = new Error(response.statusText)
  error.response = response
  error.body = response.json()
  throw error
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request (url, options) {
  // We remove parseJson because it will only log it on console
  // our process needs have a return even error is about the connection
  // return fetch(url, options)
  //   .then(checkStatus)
  //   .then(parseJSON)

  return fetch(url, options)
    .then(checkStatus)
    .then((data) => ({ data }))
    .catch((err) => ({ err }))
}
