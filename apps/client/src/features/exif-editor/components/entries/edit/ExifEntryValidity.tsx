import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

import type { ExifEntryObject } from "#lib/exif/interfaces";
import { getValueFromEntryObject } from "#lib/exif/utils/getValueFromEntryObject";

type ExifEntryValidityProps = {
  exifEntryObject: ExifEntryObject;
} & ComponentPropsWithRef<"span">;

const ExifEntryValidity = ({
  className,
  exifEntryObject,
  ...props
}: ExifEntryValidityProps) => {
  const expectedValue = getValueFromEntryObject(exifEntryObject);
  const isEmptyString = expectedValue === "";

  return (
    <span
      className={cn({ "text-fg-muted italic": isEmptyString }, className)}
      {...props}
    >
      {!isEmptyString ? expectedValue : "(empty)"}
    </span>
  );
};

export { ExifEntryValidity, type ExifEntryValidityProps };
