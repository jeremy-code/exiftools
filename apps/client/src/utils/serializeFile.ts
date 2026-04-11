const serializeFile = (file: File) => {
  return {
    lastModified: file.lastModified,
    name: file.name,
    webkitRelativePath: file.webkitRelativePath,
    size: file.size,
    type: file.type,
  };
};

export { serializeFile };
