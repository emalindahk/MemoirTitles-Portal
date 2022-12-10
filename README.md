# Memoirs Title - Portal
Buildspace Memoirs is a blockchain-based web app built with Solidity, NextJS, and Tailwind CSS. The app allows users to post memoir titles, and users with a Buildspace NFT can create and vote on these ideas.

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

Node.js

NPM or Yarn

Hardhat

### Installing

Clone the repository:

```
git clone https://github.com/<your-username>/buildspace-memoirs.git
```

Install dependencies:

```
cd buildspace-memoirs
npm install
```

or

```
cd buildspace-memoirs
yarn install
```

### Run the development server:

```
npm run 
```

or

```
yarn dev
```

### Deployment
The app is currently deployed on the Rinkeby test net. To deploy your own version, follow these steps:

Create a new Rinkeby account and get some test ether from the Rinkeby faucet.

Configure your hardhat network settings in hardhat.config.js.

Compile and deploy the smart contract:

```
npm run compile
npm run deploy
```

or

```
yarn compile
yarn deploy
```

Update the contract address in the frontend code (pages/index.js).

Build and export the frontend:

```
npm run export
```

or

```
yarn export
```

Deploy the static files to a web server or hosting service like vercel

## Built With
Solidity - The programming language for the smart contract

NextJS - The web framework for the frontend

Tailwind CSS - The CSS framework for styling

Hardhat - The development environment and testing framework for the smart contract
