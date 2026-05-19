import { ExifTagInfo } from "libexif-wasm";

import { RationalInput } from "#components/editor/RationalInput";
import { UserCommentTextarea } from "#components/editor/UserCommentTextarea";
import { getExifAdvancedEditor } from "#features/exif-editor/editors/advanced/getExifAdvancedEditor";
import { useExifEntryDraftContext } from "#features/exif-editor/hooks/useExifEntryDraftContext";
import { assertNever } from "#utils/assertNever";
import { NumberField } from "@exifi/ui/components/NumberField";
import { TextAreaField } from "@exifi/ui/components/TextAreaField";

const ExifEntryEditor = () => {
  const { exifEntryObject, draft, setDraft } = useExifEntryDraftContext();
  const exifAdvancedEditor = getExifAdvancedEditor(
    { ...exifEntryObject, value: draft },
    setDraft,
  );

  if (exifAdvancedEditor === null) {
    return null;
  }
  const title = ExifTagInfo.getTitleInIfd(
    exifEntryObject.tag,
    exifEntryObject.ifd,
  );
  const label = title !== "" ? title : exifEntryObject.tag;

  switch (exifAdvancedEditor.kind) {
    case "rational":
      return exifAdvancedEditor.values.map((value, index) => (
        <RationalInput
          key={index}
          aria-label={`${label} ${index + 1}`}
          initialRational={value}
          setRational={(rational) =>
            exifAdvancedEditor.onValueChange(rational, index)
          }
        />
      ));
    case "ascii":
      return (
        <TextAreaField
          aria-label={label}
          {...exifAdvancedEditor}
          onChange={(target) => exifAdvancedEditor.onValueChange(target)}
        />
      );
    case "numeric":
      return exifAdvancedEditor.values.map((value, index) => (
        <NumberField
          aria-label={`${label} ${index + 1}`}
          key={index}
          value={value}
          onChange={(value) => exifAdvancedEditor.onValueChange(value, index)}
        />
      ));
    case "userComment":
      return <UserCommentTextarea aria-label={label} {...exifAdvancedEditor} />;
    default:
      assertNever(exifAdvancedEditor);
  }
};

export { ExifEntryEditor };
