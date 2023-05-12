import s from "./scaner.module.scss";
import { Html5Qrcode } from "html5-qrcode";

import React, { useState } from "react";

const Scaner = () => {
  const [QRmassage, setQRmassage] = useState("");
  console.log(QRmassage);
  Html5Qrcode.getCameras()
    .then((devices) => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      if (devices && devices.length) {
        const deviceId = devices[0].id;
        const html5QrCode = new Html5Qrcode(/* element id */ "reader", true);
        const config = {
          fps: 10, // Optional frame per seconds for qr code scanning
          qrbox: 320, // Optional if you want bounded box UI
        };
        const qrCodeSuccessCallback = (message) => {
          setQRmassage(message);
          html5QrCode.stop().then((ignore) => {
            // QR Code scanning is stopped.
          });
        };
        const qrCodeFailCallback = (message) => {
          /* handle fail */
        };
        html5QrCode
          .start(deviceId, config, qrCodeSuccessCallback, qrCodeFailCallback)
          .catch((err) => {
            // Start failed, handle it.
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //   const element = document.getElementById("reader");
  //   console.log(element);
  //
  //   console.log(element.props.id);
  //
  return (
    <>
      <div id="reader" width="600px"></div>;
      <input type="file" id="qr-input-file" accept="image/*"></input>
    </>
  );
};

export default Scaner;
