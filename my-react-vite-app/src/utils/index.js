import axios from "axios";

//! env not loading variables
const tmdbApiKey = "d1df4024678d5579405a85ef7d474ae7";

// create an instance of axioscall
export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: tmdbApiKey, // Add API key as a parameter for authentication
  },
});

// Function to fetch authentication token from themoviedb.org
export const fetchToken = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    // Fetch new authentication token
    const { data } = await moviesApi.get("/authentication/token/new");

    console.log({ data });
    // Extract token from response data
    const token = data.request_token;

    // If token retrieval is successful
    if (data.success) {
      // Store token in local storage for later use
      localStorage.setItem("request_token", token);

      console.log(window.location.origin);
      console.log('grenn')
      // Redirect user to authentication page with the obtained token
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}/approved`;
    }
  } catch (error) {
    // Handle any errors that occur during token retrieval
    throw error;
  }
};

export const createSessionId = async () => {
  const token = localStorage.getItem("request_token");

  if (token) {
    // eslint-disable-next-line no-useless-catch
    try {
      const {
        data: { session_id },
      } = await moviesApi.post("authentication/session/new", {
        request_token: token,
      });
      localStorage.setItem("session_id", session_id);

      return session_id;
    } catch (error) {
      throw error;
    }
  }
};
