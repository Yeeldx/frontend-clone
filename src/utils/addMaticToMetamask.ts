const addMaticToMetamask: () => void = () => {
  const { ethereum } = window as any;
  if (ethereum) {
    ethereum
      .request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      })
      .catch((err: any) => {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          ethereum
            .request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13881',
                  chainName: 'Mumbai Testnet',
                  rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                  iconUrls: [
                    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0/logo.png',
                  ],
                  blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                  nativeCurrency: {
                    name: 'Matic Token',
                    symbol: 'MATIC',
                    decimals: 18,
                  },
                },
              ], // you must have access to the specified account
            })
            .catch((error: any) => {
              if (error.code === 4001) {
                console.log('We can encrypt anything without the key.');
              } else {
                console.error(error);
              }
            });
        }
      });
  }
};

export default addMaticToMetamask;
