"use client";

import { Modal } from "flowbite-react";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
export default function ProductShareButton({ urlToShare }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button onClick={() => setOpenModal(true)} className="">
        <Share2 />
      </button>
      <Modal
        show={openModal}
        onClose={() => setOpenModal(false)}
        className="max-w-7xl mx-auto"
      >
        <Modal.Header>Share this product with others.</Modal.Header>
        <Modal.Body>
          <div className="flex gap-4">
            <FacebookShareButton
              url={urlToShare}
              className="Demo__some-network__share-button"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={urlToShare}
              title="twitter"
              className="Demo__some-network__share-button"
            >
              <XIcon size={32} round />
            </TwitterShareButton>
            <TelegramShareButton
              url={urlToShare}
              title="telegram"
              className="Demo__some-network__share-button"
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={urlToShare}
              title="whatsapp"
              separator=":: "
              className="Demo__some-network__share-button"
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={urlToShare}
              subject="email"
              body="body"
              className="Demo__some-network__share-button"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
