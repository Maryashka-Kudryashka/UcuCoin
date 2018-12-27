import { getUCUToken } from "./smartContract"

const promiseBalance = address => {
  let UCUToken = getUCUToken()
  return new Promise((resolve, reject) => {
    UCUToken.balanceOf(address, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          address: address,
          value: result.c.toString()
        })
      }
    })
  })
}

export const recheckBalances = async (addreses = []) => {
  var currentBalances = []
  var currentBalances = Promise.all(addreses.map(address => promiseBalance(address)))
  return currentBalances
}

export const fetchTransaction = (adress, value) => {
  var UCUToken = getUCUToken()
  UCUToken.transfer(adress, value, function(error, result) {
    if (!error) console.log("insidecick", JSON.stringify(result))
    else console.error(error)
  })
}

export async function getData(address) {
  return await (await fetch(
    "http://api-ropsten.etherscan.io/api?module=account&action=tokentx&address=" +
      address +
      "&startblock=0&endblock=999999999&sort=asc&apikey=YourApiKeyToken"
  )).json()
}
