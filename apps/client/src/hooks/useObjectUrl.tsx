import { useEffect, useState } from "react";

const objectUrlMap = new WeakMap<Blob | MediaSource, string>();

// Could simplify with .getOrInsertComputed
const getObjectUrl = (obj: Blob | MediaSource) => {
  const prevObjectUrl = objectUrlMap.get(obj);
  if (prevObjectUrl === undefined) {
    const objectUrl = URL.createObjectURL(obj);
    objectUrlMap.set(obj, objectUrl);
    return objectUrl;
  }

  return prevObjectUrl;
};

/**
 * Since MDN describes freeing object URLs too early as an "anti-pattern", this
 * hook caches object URLs in a WeakMap and only revokes them when the component
 * unmounts or the blob changes.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/blob#memory_management}
 */
const useObjectUrl = (obj: Blob | MediaSource) => {
  const [objectUrl, setObjectUrl] = useState(() => getObjectUrl(obj));

  useEffect(() => {
    const currObjectUrl = getObjectUrl(obj);
    /**
     * To ensure the symmetric behavior of `createObjectURL` and
     * `revokeObjectURL`, an object URL should be created. Since `objectUrl`
     * must be state due to being used in rendering, this also implies it should
     * be set in an effect. Otherwise, the object URL would be revoked
     * immediately in <StrictMode>. Since object URLs are cached and are
     * strings, a re-render won't be triggered on the first render, though it
     * will be triggered when the blob changes.
     */
    // eslint-disable-next-line react-hooks/set-state-in-effect, @eslint-react/hooks-extra/no-direct-set-state-in-use-effect
    setObjectUrl(currObjectUrl);

    return () => {
      URL.revokeObjectURL(currObjectUrl);
      if (objectUrlMap.get(obj) === currObjectUrl) {
        objectUrlMap.delete(obj);
      }
    };
  }, [obj]);

  return objectUrl;
};

export { useObjectUrl };
