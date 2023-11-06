export const decodedToken = (token) => {
  const [header, payload, signature] = token.split(".");
  const decodedPayload = JSON.parse(atob(payload));
  return decodedPayload;
};
