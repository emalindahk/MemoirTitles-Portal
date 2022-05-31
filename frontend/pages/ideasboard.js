import React, { useEffect, useState, useRef } from "react";
import Head from "next/head";
import Header from "../components/Header";
import axios from 'axios'

import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";
import NewIdeaModal from "../components/NewIdea";

function ideasboard() {
  const contractAddress = "0x72d03688eeD34ae20216a939Ad57E97859637BD1";
  const contractAbi = abi.abi;

  const [open, setOpen] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [idea, setIdea] = useState("");
  const [nfts, setNfts] = useState([]);
  const [allIdeas, setAllIdeas] = useState([]);
  const [errorMessage, setErrorMessage] = useState('')

  const cancelButtonRef = useRef(null);

  const openModal = () => {
    setOpen(!open);
  };

  const checkNFT = () => {
    if(buildSpaceNFT.length > 0){
      openModal()
    }else {
      setErrorMessage("You need a BuildSpace NFT to add an Idea")
    }
  }

  async function getNFTs() {
    const data = await axios
      .get(
        `https://api.rarible.org/v0.1/items/byOwner/?owner=ETHEREUM:${currentAccount}`
      )
      .then((res) => res.data.items);
    setNfts(data);
  }

  const buildSpaceNFT = [];

  nfts.forEach(nft => {
    if( nft.contract = "POLYGON:0x3cd266509d127d0eac42f4474f57d0526804b44e"){
      buildSpaceNFT.push(nft)
    }
  })

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask connected");
        return;
      } else {
        console.log("We have ethereum object!!!!!: ", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        accounts = accounts[0];
        setCurrentAccount(accounts);
      } else {
        console.log("No authorized accounts found");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get metamask");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getAllIdeas = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(ethereum);
      const wavePortalContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );

      const ideas = await wavePortalContract.getAllIdeas();

      let ideasCleaned = [];
      ideas.forEach((idea) => {
        ideasCleaned.push({
          address: idea.creator,
          timestamp: new Date(idea.timestamp * 1000),
          voteCount: idea.voteCount,
          message: idea.name,
        });
      });

      setAllIdeas(ideasCleaned);
    } catch (error) {
      console.log("no ideas", error);
    }
  };

  const addIdea = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        const voteTxn = await wavePortalContract.createIdea(idea, {
          gasLimit: 300000,
        });

        await voteTxn.wait();

      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(buildSpaceNFT.length > 0){
      addIdea();
    } else {
      setErrorMessage("You need a BuildSpace NFT to add an Idea")
    }
  }

  const vote = async (index) => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );

        const voteTxn = await wavePortalContract.vote(index, {
          gasLimit: 300000,
        });
        await voteTxn.wait();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
  const handleVoting = (i) => {
    if(buildSpaceNFT.length > 0){
      vote(i);
    } else {
      setErrorMessage("You need to have a buildspace NFT to vote.")
    }
  }

  useEffect(() => {
    getAllIdeas();
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  });

  useEffect(() => {
    checkIfWalletIsConnected();
    getNFTs();
  },[currentAccount]);

  useEffect(() => {
    let wavePortalContract;

    const onNewIdea = (from, timestamp, idea) => {
      console.log("NewWave", from, timestamp, idea);
      setAllIdeas((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: idea,
        },
      ]);
    };

    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      wavePortalContract = new ethers.Contract(
        contractAddress,
        contractAbi,
        signer
      );
      wavePortalContract.on("NewIdea", onNewIdea);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewIdea", onNewIdea);
      }
    };
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Memoir - Ideasboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-full w-full font-mono">
        <div className="w-full py-2 bg-gradient-to-r from-red-200 via-red-300 to-red-300">
          <Header />
        </div>

        <section className="max-w-7xl mx-auto p-2 w-full ">
          <div className="w-full flex justify-between items-center">
            <div className="flex flex-col space-y-3">
              <h2 className="text-6xl mt-10 text-gray-300 font-semibold">
                Voting
              </h2>
              <h3 className="text-4xl font-semibold text-gray-800">
                Open Ideas : {allIdeas.length}
              </h3>
            </div>

           
           
            <div className="">
              {!currentAccount && (
                <button
                  onClick={connectWallet}
                  className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
               text-white font-bold py-2 px-4 rounded mb-5 mt-3"
                >
                  Connect Wallet.
                </button>
              )}

              {currentAccount && (
                <button
                  onClick={checkNFT}
                  className="bg-pink-800 hover:bg-pink-600
                   text-white font-bold py-2 px-4 rounded w-40"
                >
                  New Idea
                </button>
              )}
            </div>
          </div>

          <div className="pt-4 text-sm text-gray-600 max-w-3xl">
            <p>Welcome to Memoirs DAO.</p>
            <div>
              To contribute you need to have to buildspace NFT.
              Don't worry if you dont have one.
              Head over to <a href="https://buildspace.so/" className="font-semibold underline
              text-transparent bg-clip-text
              bg-gradient-to-br from-red-400 via-red-500 to-yellow-300"> BuildSpace</a>, 
              complete one of our projects, and claim and NFT for yourself.
            </div>

            </div>

          <section className="relative py-20 2xl:py-40">
          {errorMessage && <div className="bg-red-400 text-white max-w-lg w-full py-1 px-2 rounded-lg">Error! {errorMessage}</div>}
            <div className="container px-4 pb-20 mx-auto ">
              <div className=" overflow-x-auto overflow-y-hidden">
                <div className="w-full grid grid-cols-7 border-b-2 border-gray-500 text-xl text-gray-700 font-semibold mb-3">
                  <p className="col-span-2">Created By</p>     
                  <p className="col-span-3">Description</p>  
                  <p>Votes</p>            
                </div>
               {allIdeas.map((idea, index) => (
                 <div key={index} className="grid grid-cols-7 gap-x-2 py-2 items-center">
                   <div className="col-span-2 text-xs">
                   <p className="font-semibold">{idea.address}</p>
                   <p>{new Date(idea.timestamp).toDateString()}</p>
                   </div>
                   <p className="col-span-3">{idea.message}</p>
                   <div>
                   <p>{idea?.voteCount.toNumber()}</p>
                   </div>
                  
                   
                   <button className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
               text-white font-bold py-1 px-2 w-20 rounded" onClick={() => handleVoting(index)}>Vote</button>
                 </div>
               ))}
              </div>
            </div>
          </section>
        </section>
      </main>
      <NewIdeaModal
        open={open}
        setOpen={openModal}
        innerRef={cancelButtonRef}
        message={idea}
        setMessage={setIdea}
        onClick={handleSubmit}
      />
    </div>
  );
}

export default ideasboard;
