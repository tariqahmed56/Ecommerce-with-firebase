import React from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

const SocialShare = ({ productUrl, productName }) => {
  const shareUrl = productUrl;
  const title = productName;

  return (
    <div className="flex space-x-4">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={40} round />
      </FacebookShareButton>
      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={40} round />
      </TwitterShareButton>
      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={40} round />
      </WhatsappShareButton>
    </div>
  );
};

export default SocialShare;
