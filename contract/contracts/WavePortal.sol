// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;
    uint totalIdeas;

    event NewWave(address indexed from, uint256 timestamp, string message);

    event NewIdea(address indexed from, uint256 timestamp, string idea);

    event NewVote(address indexed from, uint256 votes);

    struct Wave {
        address waver;
        string message;
        uint256 timestamp;
    }

    struct Voter {
        address voter;
        bool voted;
    }

      struct Idea {
        address creator;
        string name; 
        uint256 timestamp;
        uint256 voteCount;
    }

    mapping(address => Voter) public voters;

    Wave[] waves;
    Idea[] public ideas;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {
        require(
            lastWavedAt[msg.sender] + 5 seconds < block.timestamp,
            "Wait 5 seconds"
        );

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;

        waves.push(Wave(msg.sender, _message, block.timestamp));

        seed = (block.timestamp + block.difficulty + seed) % 100;

        if (seed <= 50) {
            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than the contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves:", totalWaves);
        return totalWaves;
    }

    function getTotalWavesByAddress(address _addr)
        public
        view
        returns (uint256)
    {
        console.log("%s has waved %d times:", _addr, totalWaves);
        return totalWaves;
    }

    function createIdea(string memory _idea) public {
        totalIdeas += 1;

        ideas.push(Idea(msg.sender, _idea, block.timestamp, 0));
        emit NewIdea(msg.sender, block.timestamp, _idea);
    }

    function getAllIdeas() public view returns (Idea[] memory) {
        return ideas;
    }

    function vote(uint _idea) public {
        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already Voted");

        sender.voted = true;

        ideas[_idea].voteCount += 1;

        emit NewVote(msg.sender, ideas[_idea].voteCount);
    }

    function hasVoted() public view returns (bool) {
        Voter storage _voter = voters[msg.sender];
        return _voter.voted;
    }
}
