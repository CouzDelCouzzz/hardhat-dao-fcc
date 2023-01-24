const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const governor = await ethers.getContract("GovernorContract", deployer)
    const timelock = await ethers.getContract("TimeLock", deployer) // Means we want the contract and to attach the deployer on it. Si that when we call the contract, it's "from" the deployr

    console.log("Setting up roles....")

    const proposerRole = await timelock.PROPOSER_ROLE()
    const executorRole = await timelock.EXECUTOR_ROLE()
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE()

    const proposerTx = await timelock.grantRole(proposerRole, governor.address)
    await proposerTx.wait(1)
    const executorTx = await timelock.grantRole(executorRole, ethers.constants.AddressZero)
    await executorTx.wait(1)
    const revokeTx = await timelock.revokeRole(adminRole, deployer)
    await revokeTx.wait(1)
}

module.exports.tags = ["all", "setup"]
