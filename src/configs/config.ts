import { http, createConfig } from '@wagmi/core'
import {
    // arbitrumSepolia,
    liskSepolia,
    // sepolia,
} from '@wagmi/core/chains'

export const config = createConfig({
    chains: [
        liskSepolia,
        // sepolia,
        // arbitrumSepolia
    ],
    transports: {
        [liskSepolia.id]: http(),
        // [sepolia.id]: http(),
        // [arbitrumSepolia.id]: http(),
    },
})