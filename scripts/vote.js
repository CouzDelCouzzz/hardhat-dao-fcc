const { ethers, network } = require("hardhat")
const { developmentChains, proposalsFile, VOTING_PERIOD } = require("../helper-hardhat-config")
const { moveBlocks } = require("../utils/move-blocks")
const fs = require("fs")

const index = 0

async function vote(proposalIndex) {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"))
    const proposalId = proposals[network.config.chainId][proposalIndex]

    // 0 = against; 1 = for; 2 = absteint
    const voteWay = 1
    const reason = "I like the porposal "

    const governor = await ethers.getContract("GovernorContract")
    const voteTxResponse = await governor.castVoteWithReason(proposalId, voteWay, reason)
    await voteTxResponse.wait(1)

    // Speed block transactions
    if (developmentChains.includes(network.name)) {
        await moveBlocks(VOTING_PERIOD + 1)
    }

    console.log("Voted! Ready to go.")
}

vote(index)
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
