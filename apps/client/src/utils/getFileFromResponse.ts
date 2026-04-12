import { basename } from "@std/path/basename";
import { parse as contentDispositionParse } from "content-disposition";

const getFileFromResponse = async (response: Response) => {
  // Not using original requestUrl since redirects may occur
  const responseUrlObject = new URL(response.url);

  const contentDispositionHeader = response.headers.get("Content-Disposition");
  const contentDisposition =
    contentDispositionHeader !== null ?
      contentDispositionParse(contentDispositionHeader)
    : null;

  const fileName =
    // If "Content-Disposition" header exists with "filename" parameter, use it
    (
      contentDisposition?.type === "attachment" &&
      "filename" in contentDisposition.parameters
    ) ?
      contentDisposition.parameters["filename"]
    : basename(responseUrlObject.pathname); // Otherwise, default to basename of Response;
  const contentType = response.headers.get("Content-Type");
  const lastModified = response.headers.get("Last-Modified");

  const blob = await response.blob();
  const file = new File([blob], fileName, {
    type: contentType ?? undefined,
    lastModified: lastModified !== null ? Date.parse(lastModified) : undefined,
  });
  return file;
};

export { getFileFromResponse };
