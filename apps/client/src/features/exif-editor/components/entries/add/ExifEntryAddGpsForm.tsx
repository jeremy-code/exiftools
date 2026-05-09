import { useCallback, type ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";
import { LatLng } from "leaflet";

import { useExifEntryAddGpsFormOptions } from "#features/exif-editor/hooks/useExifEntryAddGpsFormOptions";
import { getCurrentPosition } from "#utils/getCurrentPosition";
import { Button } from "@exifi/ui/components2/Button";
import { NumberField } from "@exifi/ui/components2/NumberField";
import { Spinner } from "@exifi/ui/components2/Spinner";

import { ExifGpsMap } from "../../gps/ExifGpsMap";

type ExifEntryAddGpsFormProps = ComponentPropsWithRef<"div">;

const ExifEntryAddGpsForm = (props: ExifEntryAddGpsFormProps) => {
  const gpsForm = useForm(useExifEntryAddGpsFormOptions());

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
    <div {...props}>
      <Button
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
                onChange={(e) => {
                  field.handleChange(e);
                }}
                formatOptions={{
                  style: "decimal",
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
                onChange={(value) => {
                  field.handleChange(value);
                }}
                minValue={-180}
                maxValue={180}
                formatOptions={{
                  style: "decimal",
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
                onChange={(e) => {
                  field.handleChange(e);
                }}
                formatOptions={{ style: "unit", unit: "meter" }}
              />
            )}
          />
          <gpsForm.Subscribe
            selector={(state) => state.values}
            children={(values) => (
              <ExifGpsMap {...values} setCoordinate={setGpsForm} />
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
