import React from 'react';
import { Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, defaultConfig, darkTheme } from '@xellar/kit';
import {
  // arbitrumSepolia,
  liskSepolia,
  // sepolia
} from 'viem/chains';

const config = defaultConfig({
  appName: 'Xellar',
  // Required for WalletConnect
  walletConnectProjectId: import.meta.env.VITE_WC_PROJECT_ID,
  // Required for Xellar Passport
  xellarAppId: import.meta.env.VITE_XELLAR_APP_ID,
  xellarEnv: 'sandbox',
  chains: [
    liskSepolia,
    // sepolia, 
    // arbitrumSepolia
  ],
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>{children}</XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
