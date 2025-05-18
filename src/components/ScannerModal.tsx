import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useHandlePayWithToken } from "../hooks/useHandlePayWithToken";
import { DEFAULT_TOKEN } from "../constants/tokens";
import { useAccount } from "wagmi";
import CustomWalletButton from "./common/CustomWalletButton";
import { Scanner } from "@yudiel/react-qr-scanner";
import { formatUnits } from "viem";

function ScannerModal({
    setIsQRModalOpen,
}: {
    setIsQRModalOpen: (value: boolean) => void;
}) {
    const [isScanned, setIsScanned] = useState(false);
    const [scannedData, setScannedData] = useState<string | null>(null);
    const { handlePayWithToken } = useHandlePayWithToken();
    const { isConnected } = useAccount();
    const scannerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!scannerRef.current || isScanned) return;

        const scanner = new Html5QrcodeScanner(
            "qr-reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
            },
            false
        );

        scanner.render(
            (decodedText) => {
                setScannedData(decodedText);
                setIsScanned(true);
                scanner.clear(); // Stop scanning after first result
            },
            (error) => {
                console.warn("QR scan error:", error);
            }
        );

        return () => {
            scanner.clear().catch(console.error);
        };
    }, [isScanned]);

    const onPay = async () => {
        const data = scannedData ? JSON.parse(scannedData) : {};
        try {
            const result = await handlePayWithToken(
                DEFAULT_TOKEN.address,
                data.sellerAddress,
                data.amount,
                {
                    productName: data.productName,
                    orderId: data.orderId,
                    quantity: data.quantity,
                }
            );
            alert(`Transaction success with hash ${result}`);
            setIsQRModalOpen(false);
        } catch (err) {
            console.error(err);
            alert("Transaction failed");
        }
    };


    const renderWalletPrompt = () => (
        <div className="flex flex-col items-center justify-center space-y-4 p-6 bg-slate-800/50 rounded-xl text-center">
            <h3 className="text-xl font-semibold text-white mb-2">Connect Your Wallet</h3>
            <p className="text-gray-400 mb-4">Please connect your wallet to proceed with the payment</p>
            <CustomWalletButton />
        </div>
    );

    const renderScannedData = (data: string) => {
        try {
            const parsedData = JSON.parse(data);
            return (
                <div className="space-y-4 bg-slate-800/50 rounded-xl p-4">
                    {!isConnected ? (
                        renderWalletPrompt()
                    ) : (
                        <>
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
                                    {Number(formatUnits(parsedData.amount as bigint, 2)).toLocaleString()} IDRX
                                </span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                                <span className="text-gray-400">Order ID</span>
                                <span className="text-white font-medium">#{parsedData.orderId}</span>
                            </div>
                            <div className="p-3 bg-slate-700/50 rounded-lg">
                                <div className="text-gray-400 mb-1">Seller Address</div>
                                <div className="text-white font-medium break-all">
                                    {parsedData.sellerAddress}
                                </div>
                            </div>
                            <button
                                onClick={onPay}
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                                Confirm Payment
                            </button>
                        </>
                    )}
                </div>
            );
        } catch (error) {
            if (error) return (
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
                    // <div id="qr-reader" ref={scannerRef} className="w-full aspect-square rounded-xl text-white" />
                    <Scanner
                        onScan={(result) => {
                            setScannedData(result[0]?.rawValue);
                        }}
                    />
                ) : (
                    renderScannedData(scannedData)
                )}
            </div>
        </div>
    );
}

export default ScannerModal;
