const getCurrentPosition = (options?: PositionOptions) => {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    } else {
      reject(new Error("Geolocation API is not supported in this browser"));
    }
  });
};

export { getCurrentPosition };
