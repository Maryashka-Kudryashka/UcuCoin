import Web3 from "web3"

let UCUTokenContract
let UCUToken
let UCUTransferEvent

export const connectSmartContracts = () => {
  let { web3 } = window
  if (typeof web3 !== "undefined") {
    web3 = new Web3(web3.currentProvider)
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/a89d32d2485d404a89f2aeb789d502db"))
  }

  web3.eth.defaultAccount = web3.eth.accounts[0]
  UCUTokenContract = web3.eth.contract([
    {
      constant: true,
      inputs: [],
      name: "name",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "standard",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [
        {
          name: "",
          type: "address"
        }
      ],
      name: "balanceOf",
      outputs: [
        {
          name: "",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: true,
      inputs: [],
      name: "symbol",
      outputs: [
        {
          name: "",
          type: "string"
        }
      ],
      payable: false,
      stateMutability: "view",
      type: "function"
    },
    {
      constant: false,
      inputs: [
        {
          name: "_to",
          type: "address"
        },
        {
          name: "_value",
          type: "uint256"
        }
      ],
      name: "transfer",
      outputs: [
        {
          name: "success",
          type: "bool"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "function"
    },
    {
      inputs: [
        {
          name: "_initialSupply",
          type: "uint256"
        }
      ],
      payable: false,
      stateMutability: "nonpayable",
      type: "constructor"
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          name: "_from",
          type: "address"
        },
        {
          indexed: true,
          name: "_to",
          type: "address"
        },
        {
          indexed: false,
          name: "_value",
          type: "uint256"
        }
      ],
      name: "Transfer",
      type: "event"
    }
  ])

  UCUToken = UCUTokenContract.at("0x0cca8df48085ca47b311aba977c14dbfd3eae83d")

  UCUTransferEvent = UCUToken.Transfer()
}

export const getUCUToken = () => UCUToken

export const getUCUTransferEvent = () => UCUTransferEvent

export const getUCUTokenContract = () => UCUTokenContract
