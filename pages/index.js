import Head from "next/head";
import { ethers } from "ethers";
import NFTMinterABI from "../components/NFTMinter.json";
import { useState } from "react";
import toast, { Toaster} from "react-hot-toast";


export default function Home() {
  
  if(window.ethereum) {
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    var signer = provider.getSigner();

  } else {
    toast.error("Please install metamask!");
  }
  const [tx, setTx] = useState();
  const minterAddress = "0xD4DE3e1B0671F349991f9d1dCB2bc7171F421c1C";


  const minterContract = new ethers.Contract(
    minterAddress,
    NFTMinterABI,
    signer
  );

  const mintNFT = async() => {
    if(window.ethereum) {
      try {
        const tx = await minterContract.safeMint();
        setTx(tx.hash);
        console.log(tx);
      } catch (e) {
        console.log(e);
      }
    }
    else{
    }
  };

  return (
    <div>
      <Head>
        <title>NFT Minter</title>
        <meta name="description" content="No metadata NFTs!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div><Toaster/></div>


      <main className="bg-gray-200 h-screen flex justify-center items-center w-full flex-col">
        <button className="rounded-2xl px-8 py-4 bg-black text-white" onClick={mintNFT}>
          Mint an NFT! Any NFT!
        </button>
        <div>
          <p className="text-xs mt-8">TX: {tx}</p>
        </div>
      </main>
    </div>
  );
}
