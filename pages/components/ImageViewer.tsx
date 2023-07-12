import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const ImageViewer = ({ imageModal, setImageModal, url }: any) => {
  return (
    <Transition appear show={imageModal || false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setImageModal(false)}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-fit h-fit flex flex-col items-center transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <img src={url} alt={url} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ImageViewer;
