const saveFile = async (file: File) => {
  /**
   * showSaveFilePicker is not currently (03-2026) avaliable in Safari and
   * Firefox
   *
   * @see {@link https://caniuse.com/mdn-api_window_showsavefilepicker}
   */
  if (typeof window.showSaveFilePicker === "function") {
    try {
      const fileSystemFileHandle = await showSaveFilePicker({
        suggestedName: file.name,
      });
      const writable = await fileSystemFileHandle.createWritable({
        keepExistingData: true,
      });
      await writable.write(file);
      await writable.close();
    } catch (error) {
      /**
       * Not an actual error, user cancelled download operation
       *
       * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMException#aborterror}
       */
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      throw error;
    }
  } else {
    // Fallback to using Blob URLs
    const blobUrl = URL.createObjectURL(file);
    const anchorElement = document.createElement("a");
    anchorElement.href = blobUrl;
    anchorElement.download = file.name;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    document.body.removeChild(anchorElement);
    URL.revokeObjectURL(blobUrl);
  }
};

export { saveFile };
