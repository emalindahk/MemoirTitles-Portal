
const main = async () => {
    const [_, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy({
      value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log("Contract deployed to: ", waveContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
      waveContract.address
    );
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let waveCount;
    waveCount = await waveContract.getTotalWaves();

    const waveTxn = await waveContract.wave("This is wave #1");
  await waveTxn.wait();

  const waveTxn2 = await waveContract.wave("This is wave #2");
  await waveTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log(
      "Contract balance:",
      hre.ethers.utils.formatEther(contractBalance)
    );

    let wavesByAddress;
    wavesByAddress = await waveContract.getTotalWavesByAddress(randomPerson.address);


  let allWaves = await waveContract.getAllWaves();

  let ideaTxn = await waveContract.createIdea("This is an idea no 1");
  await ideaTxn.wait();

  ideaTxn = await waveContract.createIdea("This is an idea no 2");
  await ideaTxn.wait();


  const voteTxn = await waveContract.vote(0);
  await voteTxn.wait();

  let allIdeas = await waveContract.getAllIdeas();
  console.log(allIdeas)

  let voter = await waveContract.hasVoted();
  console.log(voter)
  };


const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();