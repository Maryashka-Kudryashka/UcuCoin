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
