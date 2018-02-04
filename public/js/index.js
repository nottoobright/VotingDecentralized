//Integrate ethereum blockchain with web3
if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    console.log("current provider selected");
} else {
    // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://" + window.location.hostname + ":8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

let VotingContract = web3.eth.contract([
    {
        "constant": true,
        "inputs": [
            {
                "name": "state",
                "type": "string"
            }
        ],
        "name": "getStateResult",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "result",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "party",
                "type": "string"
            },
            {
                "name": "state",
                "type": "string"
            },
            {
                "name": "number",
                "type": "uint256"
            }
        ],
        "name": "dummyData",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            },
            {
                "name": "party",
                "type": "string"
            },
            {
                "name": "state",
                "type": "string"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getTotalVotes",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "a",
                "type": "string"
            },
            {
                "name": "b",
                "type": "string"
            }
        ],
        "name": "compareStrings",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "account",
                "type": "address"
            },
            {
                "name": "_voted",
                "type": "bool"
            }
        ],
        "name": "challenge",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "account",
                "type": "address"
            }
        ],
        "name": "LastVotedInfo",
        "type": "event"
    }
]);

let Voting = VotingContract.at('0x8646674be281d0762c4debaaf393c61b88338bb9');

console.log(Voting)


let VotingEvent = Voting.LastVotedInfo({}, 'latest');
VotingEvent.watch(function(error, result) {
    if (result) {console.log(result.blockHash);
    }
});