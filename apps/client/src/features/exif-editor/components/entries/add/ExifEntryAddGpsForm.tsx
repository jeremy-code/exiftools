import { useCallback, type ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";
import { LatLng } from "leaflet";
import { cn } from "tailwind-variants";
import { useShallow } from "zustand/react/shallow";

import { addGpsEntriesFormOptions } from "#features/exif-editor/forms/addGpsEntriesForm";
import { useExifEditorStore } from "#features/exif-editor/hooks/useExifEditor";
import { getCurrentPosition } from "#utils/getCurrentPosition";
import { Button } from "@exifi/ui/components/Button";
import { NumberField } from "@exifi/ui/components/NumberField";
import { Spinner } from "@exifi/ui/components/Spinner";

import { ExifGpsMap } from "../../gps/ExifGpsMap";

type ExifEntryAddGpsFormProps = ComponentPropsWithRef<"div">;

const ExifEntryAddGpsForm = ({
  className,
  ...props
}: ExifEntryAddGpsFormProps) => {
  const { updateLatLng, exifDataObject } = useExifEditorStore(
    useShallow((state) => ({
      updateLatLng: state.updateLatLng,
      exifDataObject: state.exifDataObject,
    })),
  );
  const gpsForm = useForm({
    ...addGpsEntriesFormOptions(exifDataObject),
    onSubmit: ({ value }) => {
      if (value.latitude !== undefined && value.longitude !== undefined) {
        updateLatLng(
          new LatLng(value.latitude, value.longitude, value.altitude),
        );
      }
    },
  });

  const setGpsForm = useCallback(
    (latLng: LatLng) => {
      gpsForm.setFieldValue("latitude", latLng.lat);
      gpsForm.setFieldValue("longitude", latLng.lng);

      // Retain previous altitude if undefined
      if (latLng.alt !== undefined) {
        gpsForm.setFieldValue("altitude", latLng.alt);
      }
    },
    [gpsForm],
  );

  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <Button
        className="max-w-sm"
        type="button"
        onPress={async () => {
          const currentPosition = await getCurrentPosition();
          setGpsForm(
            new LatLng(
              currentPosition.coords.latitude,
              currentPosition.coords.longitude,
              currentPosition.coords.altitude ?? undefined,
            ),
          );
        }}
      >
        Set latitude/longitude to current position
      </Button>
      <gpsForm.Subscribe
        selector={(state) => state.values}
        children={(values) => (
          <ExifGpsMap
            coordinate={
              values.latitude !== undefined && values.longitude !== undefined ?
                new LatLng(values.latitude, values.longitude, values.altitude)
              : undefined
            }
            setCoordinate={setGpsForm}
          />
        )}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void gpsForm.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-2">
          <gpsForm.Field
            name="latitude"
            children={(field) => (
              <NumberField
                label="Latitude"
                value={field.state.value}
                onBlur={field.handleBlur}
                minValue={-90}
                maxValue={90}
                onChange={(value) => field.handleChange(value)}
                formatOptions={{
                  style: "unit",
                  unit: "degree",
                  unitDisplay: "narrow",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 6,
                }}
              />
            )}
          />
          <gpsForm.Field
            name="longitude"
            children={(field) => (
              <NumberField
                label="Longitude"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value)}
                minValue={-180}
                maxValue={180}
                formatOptions={{
                  style: "unit",
                  unit: "degree",
                  unitDisplay: "narrow",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 6,
                }}
              />
            )}
          />
          <gpsForm.Field
            name="altitude"
            children={(field) => (
              <NumberField
                label="Altitude"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value)}
                formatOptions={{ style: "unit", unit: "meter" }}
              />
            )}
          />
          <gpsForm.Subscribe
            selector={(state) => state.isSubmitting}
            children={(isSubmitting) => (
              <Button type="submit" variant="surface" isDisabled={isSubmitting}>
                {isSubmitting && <Spinner className="absolute" />}
                <span
                  className="data-[pending=true]:invisible"
                  data-pending={isSubmitting}
                >
                  Submit
                </span>
              </Button>
            )}
          />
        </div>
      </form>
    </div>
  );
};

export { ExifEntryAddGpsForm, type ExifEntryAddGpsFormProps };
