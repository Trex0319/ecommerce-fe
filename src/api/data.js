export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://10.1.104.4:5000";
