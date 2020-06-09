export default (
  endpoint: RequestInfo,
  method = "GET",
  body: RequestInit["body"],
  headers: RequestInit["headers"]
) => {
  console.log("fetching", endpoint, body);
  let options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body,
  };

  return fetch(endpoint, options).then((res) => res.json());
};
