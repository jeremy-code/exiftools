/**
 * @see {@link https://evilmartians.com/chronicles/how-to-detect-safari-and-ios-versions-with-ease}
 * @see {@link https://developer.apple.com/documentation/webkitjs/domwindow/1629257-ongesturechange}
 */
const isMobileWebKit = () => "ongesturechange" in window;

export { isMobileWebKit };
