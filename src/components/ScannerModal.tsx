import BarcodeScanner from "react-qr-barcode-scanner";
import { useState } from "react";
import { useHandlePayWithToken } from "../hooks/useHandlePayWithToken";
import { DEFAULT_TOKEN } from "../constants/tokens";
import { getTransaction } from "viem/actions";
import { config } from "../configs/config";

function ScannerModal({
    setIsQRModalOpen,
}: {
    setIsQRModalOpen: (value: boolean) => void;
}) {
    const [isScanned, setIsScanned] = useState(false);
    const { handlePayWithToken } = useHandlePayWithToken();
    const [qrString, setQrString] = useState("Not Found");

    const onPay = async () => {
        const data = JSON.parse(qrString)
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

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-slate-900 rounded-2xl p-6 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">
                        {isScanned ? 'Scanned Data' : 'Scan QR Code'}
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

                <div className="bg-slate-800 rounded-lg overflow-hidden">
                    {!isScanned ? (
                        <div className="aspect-square">
                            <BarcodeScanner
                                width={500}
                                height={500}
                                onUpdate={(err, result) => {
                                    alert(err)
                                    if (result) {
                                        setQrString(result.getText());
                                        setIsScanned(true);
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="p-6 space-y-4">
                            <div className="bg-slate-700 p-4 rounded-lg">
                                <h4 className="text-sm text-gray-400 mb-2">Scanned Data:</h4>
                                {/* <p className="text-white break-all"> */}
                                <pre className="text-white break-all">
                                    {JSON.stringify(JSON.parse(qrString), null, 2)}
                                </pre>
                                {/* </p> */}
                            </div>
                            <button
                                onClick={onPay}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                            >
                                Transact
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ScannerModal;