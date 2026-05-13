/**
 * Date format for Exif GPS tag DATE_STAMP
 *
 * @see {@link https://github.com/libexif/libexif/blob/c7e3330358639bed6ceb1c00f9fb74f4c794448e/libexif/exif-tag.c#L214-L218}
 */
const EXIF_DATESTAMP_FORMAT = "yyyy:MM:dd";

/**
 * Datetime format for Exif tag DATE_TIME, DATE_TIME_ORIGINAL,
 * DATE_TIME_DIGITIZED
 *
 * @see {@link https://github.com/libexif/libexif/blob/c7e3330358639bed6ceb1c00f9fb74f4c794448e/libexif/exif-entry.c#L1718-L1720}
 */
const EXIF_TIMESTAMP_FORMAT = "yyyy:MM:dd HH:mm:ss";

/**
 * Maximum value of a 32-bit unsigned integer
 */
const MAX_UINT32_VALUE = 0xffffffff;

export { EXIF_DATESTAMP_FORMAT, EXIF_TIMESTAMP_FORMAT, MAX_UINT32_VALUE };
