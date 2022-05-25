import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import abi from "../utils/WavePortal.json";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "0x80B8e23d69333779D1b96974814af30125cc50dd";
  const contractAbi = abi.abi;
  const [waves, setWaves] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [message, setMessage] = useState("");

  const getAllWaves = async () => {
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

        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach((wave) => {
          wavesCleaned.push({
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message,
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask connected");
        return;
      } else {
        console.log("We have ethereum object: ", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        accounts = accounts[0];
        getAllWaves();
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

  const wave = async () => {
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

        let count = await wavePortalContract.getTotalWaves();
        console.log("Total Waves", count.toNumber());

        const waveTxn = await wavePortalContract.wave(message, {
          gasLimit: 300000,
        });

        await waveTxn.wait();

        count = await wavePortalContract.getTotalWaves();
        setWaves(count.toNumber());
        console.log("All wave counts are: ", count.toNumber());
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = () => {
    if (message.length > 0) {
      wave();
    } else {
      setErrorMessage("Kindly enter your title!");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  });
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    let wavePortalContract;

    const onNewWave = (from, timestamp, message) => {
      console.log("NewWave", from, timestamp, message);
      setAllWaves((prevState) => [
        ...prevState,
        {
          address: from,
          timestamp: new Date(timestamp * 1000),
          message: message,
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
      wavePortalContract.on("NewWave", onNewWave);
    }

    return () => {
      if (wavePortalContract) {
        wavePortalContract.off("NewWave", onNewWave);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen h-screen font-mono">
      <Head>
        <title>Memoir</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col md:flex-row h-full w-full text-center">
        {/* right div */}
        <div className="w-full p-4 h-full">
          <div className="flex flex-col items-center h-full justify-center text-left">
            <div className="flex flex-col space-y-2">
              <h1
                className="text-6xl font-semibold text-transparent bg-clip-text
               bg-gradient-to-br from-red-200 via-red-300 to-yellow-200"
              >
                Memoir
              </h1>
              <p className="text-gray-600 text-sm">
                <span className="text-gray-900 text-base">English: </span>
                /ˈmɛmwɑː/
              </p>
              <p className="text-gray-600 text-sm">
                <span className="text-gray-900 text-base">Meaning:</span>
                It's a narrative, written from the perspective of the author,
                about an important part of their life{" "}
              </p>
              <span className="text-2xl font-semibold pt-4 pb-2 text-gray-700">
                Example of a Memoir
              </span>
              <div className="text-sm text-gray-800">
                <a
                  className="text-pink-600 cursor-pointer font-semibold"
                  href="https://malala.org/malalas-story?sc=header"
                  target="_blank"
                >
                  I Am Malala
                </a>{" "}
                by Malala Yousafzai details her horrible attack by the Taliban,
                her recovery, and her decision to fight for girls’ education
                worldwide.
              </div>
            </div>

            <p></p>
            <div className="flex flex-col pt-16 text-left w-full ">
              <h3 className="text-lg font-semibold">
                If your life was a <span>Memoir</span> what could be it's title?
              </h3>
              <a href="https://umbria.network/connect/ethereum-testnet-rinkeby" target="_blank">
                <span className="text-xs italic underline cursor-pointer">Connect with Metamask to the Rinkeby Network</span>
                </a>
            </div>
          </div>
         
        </div>

        {/* left div */}
        <div
          className="w-full bg-gradient-to-br from-red-200 via-red-300 to-yellow-200
         h-full flex flex-col justify-center "
        >
          <div className="p-4 w-full h-full flex flex-col justify-center items-center space-y-2">
            <div className="w-full sticky z-50 lg:mt-40">
              <div className="flex items-center w-full justify-center">
                <h3 className="text-2xl  font-semibold">
                  Write your Memoir's title!
                </h3>
                <Image src="/emoji.png" width="50" height="50" />
              </div>

              <div className="flex flex-col items-center justify-center ">
                <h1 className="text-sm font-semibold text-red-800">
                  Total Memoir Titles: {allWaves.length}
                </h1>
              </div>
              {errorMessage && (
                <div className="bg-red-500 px-3 py-1 text-white w-52 text-xs rounded-md">
                  {errorMessage}
                </div>
              )}

               
          {!currentAccount && (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
               text-white font-bold py-2 px-4 rounded mt-5"
            >
              Connect Wallet
            </button>
          )}

              {currentAccount && (
                <div className="flex flex-col space-y-2 w-full items-center">
                  <div className="rounded-xl w-full">
                    <textarea
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="outline-none bg-red-200 rounded-lg w-full max-w-lg p-2"
                      rows={3}
                    ></textarea>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="bg-pink-800 hover:bg-pink-600
                   text-white font-bold py-2 px-4 rounded w-40"
                  >
                    Submit
                  </button>
                </div>
              )}
            </div>

            <div className="h-full overflow-scroll w-full flex flex-col space-y-2 items-center">
              {allWaves.map((wave, index) => {
                return (
                  <div
                    key={index}
                    className="p-[3px] bg-gradient-to-br from-pink-400 via-red-400 to-yellow-400 
                rounded-md shadow-sm w-full max-w-lg"
                  >
                    <div
                      className="text-gray-800 
                   bg-red-200 rounded-md p-2 text-left"
                    >
                      <div className="flex w-full space-x-3 items-center">
                      <img src={`https://avatars.dicebear.com/api/human/${index}.svg`} alt="" 
                          className=" w-10 h-10 rounded-full bg-pink-700 p-1" />
                        <p className="text-900 font-semibold">{wave.message}</p>
                      </div>
                      <div className="text-xs pt-2">
                        by <span className="font-medium">{wave.address}</span>
                      </div>
                      <div className="text-xs">
                        {" "}
                        {new Date(wave.timestamp).toDateString()}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
