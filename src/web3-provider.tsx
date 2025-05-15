import React from 'react';
import { Config, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { XellarKitProvider, defaultConfig, darkTheme } from '@xellar/kit';
import { liskSepolia, sepolia } from 'viem/chains';

const config = defaultConfig({
  appName: 'Xellar',
  // Required for WalletConnect
  walletConnectProjectId: "cab1de508b81cac80dfc6a2408a25144",
  // Required for Xellar Passport
  xellarAppId: "3f7748a7-2343-496a-8b8c-7acfd1837d6c",
  xellarEnv: 'sandbox',
  chains: [liskSepolia, sepolia],
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
