require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    rinkeby : {
      url : "https://eth-rinkeby.alchemyapi.io/v2/F_VZeZaYKh_EcPLiw4ScgID-i0T5_NK0",
      accounts: ['a7f47010ba8d1bd044de6ceb2cc7b240fbc6118ef68225cc283c836e3abeeb2e']
    }
  }
};
