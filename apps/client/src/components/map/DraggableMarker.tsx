import { Marker as MarkerInstance, type DragEndEvent } from "leaflet";
import { Marker, type MarkerProps } from "react-leaflet";

import { icon } from "./icon";

interface MarkerDragEndEvent extends DragEndEvent {
  target: MarkerInstance;
}

type DraggableMarkerProps = MarkerProps & {
  onDragEnd?: (event: MarkerDragEndEvent) => void;
};

const DraggableMarker = ({ onDragEnd, ...props }: DraggableMarkerProps) => {
  return (
    <Marker
      {...props}
      icon={icon}
      draggable
      eventHandlers={{
        ...props.eventHandlers,
        dragend: (event: DragEndEvent) => {
          if (event.target instanceof MarkerInstance) {
            onDragEnd?.(event);
          }
        },
      }}
    />
  );
};

export { DraggableMarker, type DraggableMarkerProps };
