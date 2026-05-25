import "@internationalized/date";

declare module "@internationalized/date" {
  type Formattable = Intl.Formattable;

  interface DateRangeFormatPart extends Intl.DateTimeFormatPart {
    source: "startRange" | "endRange" | "shared";
  }

  interface DateFormatter {
    format(value?: Formattable | number): string;
    formatToParts(value?: Formattable | number): Intl.DateTimeFormatPart[];
    formatRange<T extends Formattable>(start: T, end: T): string;
    formatRange(start: Date | number, end: Date | number): string;
    formatRangeToParts<T extends Formattable>(
      start: T,
      end: T,
    ): DateRangeFormatPart[];
    formatRangeToParts(
      start: Date | number,
      end: Date | number,
    ): DateRangeFormatPart[];
  }
}
