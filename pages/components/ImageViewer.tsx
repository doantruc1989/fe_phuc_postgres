import { Modal } from "flowbite-react";
import React from "react";

const ImageViewer = ({ imageModal, setImageModal, url }: any) => {
  return (
    <Modal
      show={imageModal}
      size="2xl"
      position="center"
      onClose={() => setImageModal(false)}
    >
      <Modal.Body className="w-full">
        <img className="h-full w-full mx-auto" src={url} alt={url} />
      </Modal.Body>
    </Modal>
  );
};

export default ImageViewer;
