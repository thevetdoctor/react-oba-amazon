export const amountFormat = (t: number | string) => {
    const totalValueToString = t.toString();
    const tvalue = totalValueToString.split("");
    const decimalIndex = tvalue.findIndex(x => x === ".");
    let tvalueJoined;
    let decimateJoined;
    if(decimalIndex >= 0) {
      const decimate = tvalue.splice(decimalIndex);
      for(let i = decimalIndex; i >= 0;) {
        tvalue.splice(i, 0, ",");
        i -= 3;
      }
      tvalue.pop();
      if((tvalue.length % 4) === 0) {
        tvalue.shift();
      }
      tvalueJoined = tvalue.join("");
      decimateJoined = decimate.join("");
      return (decimate.length < 3) ? 
      `${tvalueJoined}${decimateJoined}0` :
      `${tvalueJoined}${decimateJoined}`;
    } else {

      for(let i = tvalue.length; i >= 0;) {
        tvalue.splice(i, 0, ",");
        i -= 3;
      }
      tvalue.pop();
      if((totalValueToString.length % 3) === 0) {
        tvalue.shift();
      }
      tvalueJoined = tvalue.join("");
      return `${tvalueJoined}.00`;

    }
  }