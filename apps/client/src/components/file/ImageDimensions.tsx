import { use } from "react";

import type { ImageType } from "image-dimensions";

type ImageDimensionsPromise = {
  imageDimensionsPromise: Promise<
    { width: number; height: number; type: ImageType } | undefined
  >;
};

const ImageDimensions = ({
  imageDimensionsPromise,
}: ImageDimensionsPromise) => {
  const imageDimensions = use(imageDimensionsPromise);

  if (imageDimensions === undefined) {
    return "Unknown";
  }

  return `${imageDimensions.width}px \u00d7 ${imageDimensions.height}px`;
};

export { ImageDimensions };
