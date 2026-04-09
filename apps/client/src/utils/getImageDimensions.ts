type ImageDimensions = {
  height: number;
  width: number;
};

const getImageDimensions = async (file: File) => {
  const objectUrl = URL.createObjectURL(file);

  return new Promise<ImageDimensions>((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = (
      event: Event | string,
      source?: string,
      lineno?: number,
      colno?: number,
      error?: Error,
    ) => {
      reject(
        error !== undefined ? error
        : typeof event === "string" ? new Error(event)
        : new Error("There was a problem getting the dimensions of the image."),
      );
    };
    image.src = objectUrl;
  });
};

export { getImageDimensions, type ImageDimensions };
