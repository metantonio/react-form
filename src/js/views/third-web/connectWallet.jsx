import React from 'react';
import {
    ThirdwebProvider,
    ConnectWallet,
    metamaskWallet,
    coinbaseWallet,
    walletConnect,
    localWallet,
    embeddedWallet,
  } from "@thirdweb-dev/react";
  
  export default function ConnectWalletMask() {
    return (
      <ThirdwebProvider
        activeChain="mumbai"
        clientId="YOUR_CLIENT_ID"
        //locale={en()}
        supportedWallets={[
          metamaskWallet(),
          coinbaseWallet({ recommended: true }),
          walletConnect(),
          localWallet(),
          embeddedWallet({
            auth: {
              options: [
                "email",
                "google",
                "apple",
                "facebook",
              ],
            },
          }),
        ]}
      >
        <ConnectWallet
          theme={"dark"}
          modalSize={"wide"}
        />
      </ThirdwebProvider>
    );
  }