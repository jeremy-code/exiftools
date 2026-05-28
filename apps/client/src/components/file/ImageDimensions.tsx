import { use } from "react";

import type { ImageType } from "image-dimensions";
import { useNumberFormatter } from "react-aria/useNumberFormatter";

type ImageDimensionsPromise = {
  imageDimensionsPromise: Promise<
    { width: number; height: number; type: ImageType } | undefined
  >;
};

const ImageDimensions = ({
  imageDimensionsPromise,
}: ImageDimensionsPromise) => {
  // Pixel is not a valid unit for `Intl.NumberFormat`
  const numberFormatter = useNumberFormatter();
  const imageDimensions = use(imageDimensionsPromise);

  if (imageDimensions === undefined) {
    return "Unknown";
  }

  return `${numberFormatter.format(imageDimensions.width)}px \u00d7 ${numberFormatter.format(imageDimensions.height)}px`;
};

export { ImageDimensions };
