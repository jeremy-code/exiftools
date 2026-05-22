import { describe, test, expect, vi, afterEach } from "vitest";
import { renderHook } from "vitest-browser-react";

import { useFileHash } from "./useFileHash";

const SHA256 = {
  empty: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  hello: "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  world: "486ea46224d1bb4fb680f34f7c9ad96a8f24ec88be73ea8e5a6c65260e9cb8a7",
  foo: "2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae",
} as const;

describe("useFileHash", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test.for([
    ["empty", new File([], "empty.txt"), SHA256.empty],
    ["world", new File(["world"], "world.txt"), SHA256.world],
    ["foo", new File(["foo"], "foo.txt"), SHA256.foo],
  ] as const)(
    "returns the correct sha256 for a file with content %s",
    async ([, file, expectedHash]) => {
      const { result } = await renderHook(
        (initialProps) => useFileHash(initialProps!),
        { initialProps: file },
      );
      expect(result.current).toBe(expectedHash);
    },
  );

  test("produces distinct hashes for files with different content", async () => {
    const file1 = new File(["hello"], "a.txt");
    const file2 = new File(["world"], "b.txt");
    const { rerender, result } = await renderHook(
      (initialProps) => useFileHash(initialProps!),
      { initialProps: file1 },
    );

    expect(result.current).toBe(SHA256.hello);
    await rerender(file2);
    expect(result.current).toBe(SHA256.world);
  });

  test("produces the same hash for two different File instances", async () => {
    const file1 = new File(["foo"], "x.txt");
    const file2 = new File(["foo"], "y.txt");
    const { rerender, result } = await renderHook(
      (initialProps) => useFileHash(initialProps!),
      { initialProps: file1 },
    );

    expect(result.current).toBe(SHA256.foo);
    await rerender(file2);
    expect(result.current).toBe(SHA256.foo);
  });

  test("calls file.arrayBuffer() once for the same File reference", async () => {
    const file = new File(["cached"], "cached.txt");
    const arrayBufferSpy = vi.spyOn(file, "arrayBuffer");

    const { rerender } = await renderHook(
      (initialProps) => useFileHash(initialProps!),
      { initialProps: file },
    );

    expect(arrayBufferSpy).toHaveBeenCalledOnce();
    await rerender(file);
    expect(arrayBufferSpy).toHaveBeenCalledOnce();
  });

  test("calls arrayBuffer() independently for two different File instances", async () => {
    const fileA = new File(["data"], "a.txt");
    const fileB = new File(["data"], "b.txt");
    const spyA = vi.spyOn(fileA, "arrayBuffer");
    const spyB = vi.spyOn(fileB, "arrayBuffer");

    const { rerender } = await renderHook(
      (initialProps) => useFileHash(initialProps!),
      { initialProps: fileA },
    );

    expect(spyA).toHaveBeenCalledOnce();
    await rerender(fileB);
    expect(spyA).toHaveBeenCalledOnce();
    expect(spyB).toHaveBeenCalledOnce();
  });
});
