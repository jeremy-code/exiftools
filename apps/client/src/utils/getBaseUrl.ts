const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return window.origin;
  } else if (
    "URL" in import.meta.env &&
    typeof import.meta.env.URL === "string"
  ) {
    // https://docs.netlify.com/build/configure-builds/environment-variables/#deploy-urls-and-metadata
    return import.meta.env.URL;
  }
  // Assume localhost
  return `http://localhost:${import.meta.env.PORT ?? 5173}`;
};

export { getBaseUrl };
