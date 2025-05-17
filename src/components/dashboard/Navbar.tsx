import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import CustomWalletButton from '../common/CustomWalletButton';
// import { ConnectButton, } from '@xellar/kit';


function Navbar() {


    return (
        <nav className="bg-slate-900/95 backdrop-blur-md border-b border-slate-800 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-md mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    <img
                        src="/omniumlogohorizontal-removebg-preview.png"
                        alt="Logo"
                        className="h-12 w-auto"
                    />
                    {/* <ConnectButton /> */}
                    <CustomWalletButton />
                </div>
            </div>
        </nav>
    );
}

export default Navbar;