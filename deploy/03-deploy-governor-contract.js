const { network, ethers } = require("hardhat")
const {
    developmentChains,
    networkConfig,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUORUM_PERCENTAGE,
} = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const governanceToken = await ethers.getContract("GovernanceToken")
    const timelock = await ethers.getContract("TimeLock")

    console.log("Deploying Governor")
    const governor = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timelock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE,
        ],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })
}

module.exports.tags = ["all", "govenor"]
