const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    log("Deploying Box....")
    const box = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
    })

    const timelock = await ethers.getContract("TimeLock")
    const boxContract = await ethers.getContractAt("Box", box.address)
    const transferOwnerTx = await boxContract.transferOwnership(timelock.address)
    await transferOwnerTx.wait(1)

    console.log("You've done it")
}
module.exports.tags = ["all", "box"]
