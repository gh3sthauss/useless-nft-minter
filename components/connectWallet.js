import { useState, useEffect } from "react";
import { connectWallet, getCurrentWalletConnected } from "./utils";

function ConnectWallet() {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    async function getWallet() {
      const { address, status } = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status);
    }
    getWallet();
    addWalletListener();
    chainHandler();
  }, []);

  async function chainHandler() {
    if (window.ethereum) {
      try {
        // Geçilecek ağın eklendiğini kontrol et
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x4" }], // hex chainId
          //0x38 bsc mainnet
          // 0x61 bsc testnet
        });
      } catch (error) {
        // Ağın metamaska eklenmediğini gösterir
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x38",
                  rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
                },
              ],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
        console.error(error);
      }
    } else {
      // alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
        } else {
          setWallet("");
          setStatus("Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
  const connectWalletPressed = async () => {
    if (window.ethereum) {
      const walletResponse = await connectWallet();
      setStatus(walletResponse.status);
      setWallet(walletResponse.address);
    } else {
      // alert("Please install metamask on your browser to participate in presale!")
    }
  };

  return (
    <div className="m-[10px] py-[5px] px-[40px] text-center 
    uppercase transition-[0.5s] w-min bg-auto text-white
   shadow-2xl rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-500
     border-none block">
      <button
        className=""
        onClick={connectWalletPressed}
      >
        {walletAddress.length > 0 ? (
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span className="w-full">Connect Wallet</span>
        )}
      </button>
      {/* <p id="status" style={{ color: "red" }}>
        {status}
      </p> */}
    </div>
  );
}

export default ConnectWallet;
