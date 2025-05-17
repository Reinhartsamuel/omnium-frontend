import BarcodeScanner from "react-qr-barcode-scanner";
import { useEffect, useRef, useState } from "react";
import { useHandlePayWithToken } from "../hooks/useHandlePayWithToken";
import { DEFAULT_TOKEN } from "../constants/tokens";
import { getTransaction } from "viem/actions";
import { config } from "../configs/config";
import { BrowserMultiFormatReader } from "@zxing/browser";

function ScannerModal({
    setIsQRModalOpen,
}: {
    setIsQRModalOpen: (value: boolean) => void;
}) {
    const [isScanned, setIsScanned] = useState(false);
    const { handlePayWithToken } = useHandlePayWithToken();
    // const [qrString, setQrString] = useState("Not Found");
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [stopScanner, setStopScanner] = useState<(() => void) | null>(null);

    const videoRef = useRef<HTMLVideoElement | null>(null);
    const onPay = async () => {
        const data = scannedData ? JSON.parse(scannedData) : {};
        console.log(data, 'data');
        // const data = JSON.parse(qrString)
        console.log(data);
        try {
            const result = await handlePayWithToken(
                DEFAULT_TOKEN.address, // IDRX token
                data.sellerAddress, // seller
                data.amount, // amount
                {
                    productName: data.productName,
                    orderId: data.orderId,
                    quantity: data.quantity,
                }
            )
            console.log(result, 'result')
            // const transaction = await getTransaction(config, {
            //     hash: result,
            //   })
            alert(`Transaction success with hash ${result}`)
            setIsQRModalOpen(false);
        } catch (err) {
            console.error(err)
            alert('Transaction failed')
        }
    }




    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
    
        const initCamera = async () => {
          try {
            const devices = await BrowserMultiFormatReader.listVideoInputDevices();
            console.log("Cameras found:", devices);
    
            const backCamera = devices.find(d =>
              d.label.toLowerCase().includes("back") ||
              d.label.toLowerCase().includes("environment")
            );
    
            const selectedDeviceId = backCamera?.deviceId || devices[0]?.deviceId;
            if (!selectedDeviceId) {
              alert("No camera devices found");
              return;
            }
    
            const controls = await codeReader.decodeFromVideoDevice(
              selectedDeviceId,
              videoRef.current!,
              (result, error, controls) => {
                if (result) {
                  setScannedData(result.getText());
                  controls.stop();
                  setStopScanner(() => controls.stop);
                }
    
                if (error) {
                  console.warn("Scan error", error);
                }
              }
            );
          } catch (err) {
            console.error("Camera init error:", err);
            alert("Could not start camera: " + err.message);
          }
        };
    
        initCamera();
    
        return () => {
          if (stopScanner) stopScanner();
        };
      }, []);


    const formatAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const renderScannedData = (data: string) => {
        try {
            const parsedData = JSON.parse(data);
            return (
                <div className="space-y-4 bg-slate-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Product</span>
                        <span className="text-white font-medium">{parsedData.productName}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Quantity</span>
                        <span className="text-white font-medium">{parsedData.quantity} units</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Amount</span>
                        <span className="text-white font-medium">
                            {(parsedData.amount / 1000000).toLocaleString()} IDRX
                        </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <span className="text-gray-400">Order ID</span>
                        <span className="text-white font-medium">#{parsedData.orderId}</span>
                    </div>

                    <div className="p-3 bg-slate-700/50 rounded-lg">
                        <div className="text-gray-400 mb-1">Seller Address</div>
                        <div className="text-white font-medium break-all">
                            {/* {formatAddress(parsedData.sellerAddress)} */}
                            {parsedData.sellerAddress}
                        </div>
                    </div>

                    <button
                        onClick={onPay}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                        Confirm Payment
                    </button>
                </div>
            );
        } catch (error) {
            return (
                <div className="text-red-400 p-4 bg-red-500/10 rounded-lg">
                    Invalid QR code data
                </div>
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">
                        {scannedData ? 'Payment Details' : 'Scan QR Code'}
                    </h3>
                    <button
                        onClick={() => setIsQRModalOpen(false)}
                        className="text-gray-400 hover:text-white"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {!scannedData ? (
                    <>
                    <video ref={videoRef} className="w-full aspect-square rounded-xl" />
                    </>
                ) : (
                    renderScannedData(scannedData)
                )}
            </div>
        </div>
    );
}

export default ScannerModal;