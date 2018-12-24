import { getUCUToken } from "./smartContract";

const promiseBalance = (address) => {
  let UCUToken = getUCUToken();
  return new Promise((resolve, reject) => {
    UCUToken.balanceOf(address, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve({
          address: address,
          value: result.c.toString()
        });
      }
    });
  })
}

export const recheckBalances = async (addreses = []) => {
  var currentBalances = [];
  // var addreses = [
  //   "0x68F074d6eFF2EfEDDa3dC36BeB1E238C3117c90F",
  //   "0x8e5F67a644f87b6226EeBB0270764661Cfbff6C4",
  //   "0x70AF8FD7Ff04BaF7473d213817D86805391E1Daf"
  // ];
  var UCUToken = getUCUToken();
  var currentBalances = Promise.all(addreses.map(address => promiseBalance(address)));
  // addreses.map(address => {
  //   console.log(UCUToken.balanceOf(address), 'fn');
  //   // UCUToken.balanceOf(address, function(error, result) {
      // if (!error) {
      //   currentBalances.push({
      //     adress: address,
      //     value: result.c.toString()
      //   });
  //   //   } else console.error(error);
  //   // });
  // });
  return currentBalances;
};

export const fetchTransaction = (adress, value) => {
  var UCUToken = getUCUToken();
  UCUToken.transfer(adress, value, function(error, result) {
    if (!error) console.log("insidecick", JSON.stringify(result));
    else console.error(error);
  });
};
