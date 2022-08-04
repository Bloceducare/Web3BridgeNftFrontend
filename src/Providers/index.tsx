import {
    WagmiConfig,
    createClient,
    defaultChains,
    configureChains,
    chain
} from "wagmi"

import {alchemyProvider} from "wagmi/providers/alchemy";
import {publicProvider} from "wagmi/providers/public";
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const {chains, webSocketProvider, provider} = configureChains(
    [chain.polygon, chain.polygonMumbai], 
    [alchemyProvider({apiKey:"_ksGHHmKpnCFKcMiS-TMvCPrsDfRrhCk"}), publicProvider()] 
)

const client = createClient({
    autoConnect:true,
    connectors:[
        new MetaMaskConnector({chains:[chain.polygon, chain.polygonMumbai]}),
        new WalletConnectConnector({
            chains,
            options:{
                qrcode:true
            }
        }),
        new InjectedConnector({
            chains : [chain.polygon, chain.polygonMumbai],
            options:{
                name:'Injected',
                shimDisconnect:true,
            }
        })
    ],
    provider,
    webSocketProvider
})

const Provider = ({children}:any) => {
    return(
        <>
            <WagmiConfig client={client}>
                {children}
            </WagmiConfig>
        </>
    )
}

export default Provider;

