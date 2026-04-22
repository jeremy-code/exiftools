const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.origin;
  } else if (typeof import.meta.env.URL === "string") {
    return import.meta.env.URL;
  } else if (import.meta.env.BASE_URL.startsWith("http")) {
    // https://docs.netlify.com/build/configure-builds/environment-variables/#deploy-urls-and-metadata
    return import.meta.env.BASE_URL;
  }
  // Assume localhost
  return `http://localhost:${import.meta.env.PORT ?? 5173}`;
};

export { getBaseUrl };
