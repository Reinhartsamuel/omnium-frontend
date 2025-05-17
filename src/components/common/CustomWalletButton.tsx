import { useConnectModal, } from "@xellar/kit";
import { useAccount, useDisconnect } from "wagmi";
import { useState } from "react";
import { createPortal } from "react-dom";

export default function CustomWalletButton() {
    const { open: openConnectModal } = useConnectModal();
    const { isConnected, address } = useAccount();
    const { disconnect } = useDisconnect();

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        if (!isConnected) {
            openConnectModal();
        } else {
            setShowModal(true);
        }
    };

    const shortAddress = address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "";

    const modal = (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 shadow-2xl w-full max-w-sm text-center">
                <h2 className="text-xl font-semibold mb-4">Connected Wallet</h2>
                <p className="text-gray-700 mb-4 break-all">{address}</p>
                <button
                    onClick={() => {
                        disconnect();
                        setShowModal(false);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition w-full mb-3"
                >
                    Disconnect
                </button>
                <button
                    onClick={() => setShowModal(false)}
                    className="text-sm text-gray-500 hover:underline"
                >
                    Close
                </button>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={handleClick}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-5 py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
                {isConnected ? shortAddress : "Connect Wallet"}
            </button>
            {showModal && createPortal(modal, document.body)}
        </>
    );
}
