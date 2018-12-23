import { getUCUToken } from "./smartContract";

export const recheckBalances = () => {
  var currentBalances = [];
  var addreses = [
    "0x68F074d6eFF2EfEDDa3dC36BeB1E238C3117c90F",
    "0x8e5F67a644f87b6226EeBB0270764661Cfbff6C4"
  ];
  var UCUToken = getUCUToken();
  addreses.map(address => {
    UCUToken.balanceOf(address, function(error, result) {
      if (!error) {
        currentBalances.push({
          adress: address,
          value: result.c.toString()
        });
      } else console.error(error);
    });
  });
  return currentBalances;
};

export const fetchTransaction = (adress, value) => {
  var UCUToken = getUCUToken();
  console.log({adress, value}, "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,")
  console.log(UCUToken);

  UCUToken.transfer(adress, value, function(
    error,
    result
  ) {
    if (!error) console.log("insidecick", JSON.stringify(result));
    else console.error(error);
  });
};
