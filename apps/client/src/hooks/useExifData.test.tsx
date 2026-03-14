import { ExifData } from "libexif-wasm";
import { getValue } from "libexif-wasm/internal/emscripten";
import { describe, it, expect, vi } from "vitest";
import { renderHook } from "vitest-browser-react";

import {
  MOCK_JPEG_EXIF_IMAGE_1,
  MOCK_JPEG_EXIF_IMAGE_2,
} from "#__mocks__/mockImages";

import { useExifData } from "./useExifData";

vi.mock("libexif-wasm", { spy: true });

const renderExifHook = (buffer: ArrayBuffer) =>
  renderHook(useExifData, { initialProps: buffer });

describe("useExifData", () => {
  describe("creation", () => {
    it("creates ExifData from the provided buffer", async () => {
      const buffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;

      const { result, unmount } = await renderExifHook(buffer);

      const exifData = result.current!;
      const freeSpy = vi.spyOn(exifData, "free");

      expect(ExifData.from).toHaveBeenCalledExactlyOnceWith(buffer);
      expect(exifData).toBeInstanceOf(ExifData);
      expect(freeSpy).not.toHaveBeenCalled();

      await unmount();
    });
  });

  describe("rerender behavior", () => {
    it("reuses the same ExifData instance when the buffer reference is unchanged", async () => {
      const buffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;

      const { result, rerender, unmount } = await renderExifHook(buffer);

      const firstResult = result.current!;
      const freeSpy = vi.spyOn(firstResult, "free");

      await rerender(buffer);

      expect(ExifData.from).toHaveBeenCalledExactlyOnceWith(buffer);
      expect(result.current).toBe(firstResult);
      expect(freeSpy).not.toHaveBeenCalled();

      /**
       * Bizarrely, if `unmount` isn't at the end of each test, test behavior
       * becomes inconsistent (e.g. duplicating the same test will pass the first
       * time and fail the second time). This seemingly involves the ExifData.free
       * spy being called more times than it should.
       */
      await unmount();

      expect(freeSpy).toHaveBeenCalledOnce();
    });

    it("recreates ExifData when the buffer reference changes", async () => {
      const firstBuffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;
      const secondBuffer = MOCK_JPEG_EXIF_IMAGE_2.buffer;

      const { result, rerender, unmount } = await renderExifHook(firstBuffer);

      const firstResult = result.current!;
      const freeSpy = vi.spyOn(firstResult, "free");

      await rerender(secondBuffer);

      expect(ExifData.from).toHaveBeenCalledTimes(2);
      expect(ExifData.from).toHaveBeenLastCalledWith(secondBuffer);
      expect(result.current!.byteOffset).not.toBe(firstResult.byteOffset);
      expect(freeSpy).toHaveBeenCalledOnce();

      await unmount();

      expect(freeSpy).toHaveBeenCalledTimes(2);
    });

    it("recreates ExifData when a new buffer with identical content is provided", async () => {
      const buffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;
      const clonedBuffer = new Uint8Array([...MOCK_JPEG_EXIF_IMAGE_1]).buffer;

      const { result, rerender, unmount } = await renderExifHook(buffer);

      const first = result.current!;
      const freeSpy = vi.spyOn(first, "free");

      await rerender(clonedBuffer);

      expect(ExifData.from).toHaveBeenCalledTimes(2);
      expect(result.current!.byteOffset).not.toBe(first.byteOffset);

      expect(freeSpy).toHaveBeenCalledOnce();

      await unmount();

      expect(freeSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe("cleanup", () => {
    it("frees ExifData on unmount", async () => {
      const buffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;
      const { result, unmount } = await renderExifHook(buffer);

      const exifData = result.current!;
      const freeSpy = vi.spyOn(exifData, "free");

      expect(freeSpy).not.toHaveBeenCalled();
      expect(getValue(exifData.byteOffset)).not.toBe(0);

      await unmount();

      expect(freeSpy).toHaveBeenCalledOnce();
      expect(getValue(exifData.byteOffset)).toBe(0);
    });
  });
});
