/* eslint-disable react/react-in-jsx-scope */
import { media as wixMedia } from "@wix/sdk";

export function WixImage({ mediaIdentifier, altText, className, ...props }) {
  const wixResizedImage = mediaIdentifier
    ? wixMedia.getScaledToFillImageUrl(
        mediaIdentifier,
        props.width,
        props.height,
        {},
      )
    : null;

  return (
    <img
      src={wixResizedImage || "/assets/images/No-Image-Placeholder.png"}
      alt={altText}
      className={className || ''}
    />
  );
}
