require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/MOJGx8-asMeHrjjpJkpnenGfJnXJusKx',
      accounts: ['4b44ffd701ee2c48eb754309404d49b963c2ec6d6dccb863977454fd5673f00d'],
    },
  },
};