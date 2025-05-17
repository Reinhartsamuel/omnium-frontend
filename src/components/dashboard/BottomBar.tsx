import React, { useEffect, useState } from 'react';
import { Home, Wallet, Bell, Settings, QrCode } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ScannerModal from '../ScannerModal';
import { createPortal } from 'react-dom';

// interface BottomBarProps {
//     currentPath: string;
// }

function BottomBar() {
    const navigate = useNavigate();
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState('/app');
    useEffect(() => {
        const path = window.location.pathname;
        setCurrentPath(path);
        return () => {
            // Cleanup code if needed
            setCurrentPath('/');
        };
    }, [])
    const getButtonClass = (path: string) => {
        return `flex flex-col items-center ${currentPath === path ? 'text-indigo-500' : 'text-gray-400 hover:text-gray-300'}`;
    };

    const handleNavigation = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        navigate(path);
    };

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
            <div className="max-w-md mx-auto flex justify-around py-3 relative">
                <button
                    onClick={(e) => handleNavigation(e, '/app')}
                    className={getButtonClass('/app')}
                >
                    <Home className="h-6 w-6" />
                    <span className="text-xs mt-1">Home</span>
                </button>
                <button
                    onClick={(e) => handleNavigation(e, '/app/wallet')}
                    className={getButtonClass('/app/wallet')}
                >
                    <Wallet className="h-6 w-6" />
                    <span className="text-xs mt-1">Wallet</span>
                </button>

                {/* QR Scan Button */}
                <button
                    onClick={() => setIsQRModalOpen(true)}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-14 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg hover:bg-indigo-600 transition-colors"
                >
                    <QrCode className="h-8 w-8 text-white" />
                </button>

                <button
                    onClick={(e) => handleNavigation(e, '/app/activity')}
                    className={getButtonClass('/app/activity')}
                >
                    <Bell className="h-6 w-6" />
                    <span className="text-xs mt-1">Activity</span>
                </button>
                <button
                    onClick={(e) => handleNavigation(e, '/app/settings')}
                    className={getButtonClass('/app/settings')}
                >
                    <Settings className="h-6 w-6" />
                    <span className="text-xs mt-1">Settings</span>
                </button>
            </div>
            {/* QR Scanner Modal */}
            {isQRModalOpen && (
                createPortal(
                    <ScannerModal
                        setIsQRModalOpen={setIsQRModalOpen}
                    />,
                    document.body
                )
            )}
        </div>
    );
}

export default BottomBar;