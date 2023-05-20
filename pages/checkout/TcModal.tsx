import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

const TcModal = ({ tcModal, setTcModal }: any) => {
  return (
    <Transition appear show={tcModal || false} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setTcModal(!tcModal)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <h1 className="text-center uppercase text-lg font-medium mb-4">
                  Điều khoản sử dụng
                </h1>
                <div className="text-sm text-justify leading-loose">
                  <p className="font-medium">HƯỚNG DẪN MUA HÀNG:</p>
                  <p>
                    Bước 1: Truy cập website và lựa chọn sản phẩm cần mua để mua
                    hàng
                  </p>
                  <p>
                    Bước 2: Click và sản phẩm muốn mua, màn hình hiển thị ra pop
                    up với các lựa chọn sau:
                  </p>
                  <p className="indent-8">
                    - Nếu bạn muốn tiếp tục mua hàng: Bấm vào phần tiếp tục mua
                    hàng để lựa chọn thêm sản phẩm vào giỏ hàng
                  </p>
                  <p className="indent-8">
                    - Nếu bạn muốn xem giỏ hàng để cập nhật sản phẩm: Bấm vào xem
                    giỏ hàng
                  </p>
                  <p className="indent-8">
                    - Nếu bạn muốn đặt hàng và thanh toán cho sản phẩm này vui
                    lòng bấm vào: Đặt hàng và thanh toán
                  </p>
                  <p>Bước 3: Lựa chọn thông tin tài khoản thanh toán</p>
                  <p className="indent-8">
                    - Nếu bạn đã có tài khoản vui lòng nhập thông tin tên đăng
                    nhập là email và mật khẩu vào mục đã có tài khoản trên hệ
                    thống
                  </p>
                  <p className="indent-8">
                    - Nếu bạn chưa có tài khoản và muốn đăng ký tài khoản vui lòng
                    điền các thông tin cá nhân để tiếp tục đăng ký tài khoản.
                    Khi có tài khoản bạn sẽ dễ dàng theo dõi được đơn hàng của
                    mình
                  </p>
                  <p className="indent-8">
                    - Nếu bạn muốn mua hàng mà không cần tài khoản vui lòng nhấp
                    chuột vào mục đặt hàng không cần tài khoản
                  </p>
                  <p>
                    Bước 4: Điền các thông tin của bạn để nhận đơn hàng, lựa
                    chọn hình thức thanh toán và vận chuyển cho đơn hàng của
                    mình
                  </p>
                  <p>
                    Bước 5: Xem lại thông tin đặt hàng, điền chú thích và gửi
                    đơn hàng Sau khi nhận được đơn hàng bạn gửi chúng tôi sẽ
                    liên hệ bằng cách gọi điện lại để xác nhận lại đơn hàng và
                    địa chỉ của bạn. Trân trọng cảm ơn.
                  </p>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TcModal;
