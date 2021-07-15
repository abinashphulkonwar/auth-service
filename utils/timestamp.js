exports.unsealTimeStampHandler = (arr) => {
  const timeStamp = [];
  let unsealAccount = [];
  for (let val of arr) {
    timeStamp.push(+val);
  }

  let temp = 0;
  let current = 0;
  let incr = 0;
  unsealAccount[timeStamp.length - 1] = timeStamp[timeStamp.length - 1];

  for (let i = timeStamp.length - 2; i >= 0; i--) {
    if (i == 4) {
      current = timeStamp[i] + 30;
      if (current > 60) {
        temp = current - 60;
        unsealAccount[i] = temp;
        incr = 1;
        temp = 0;
        current = 0;
      } else {
        unsealAccount[i] = current;
        current = 0;
        temp = 0;
      }
    } else if (i == 3) {
      current = timeStamp[i] + incr;
      if (current > 24) {
        temp = current - 24;
        unsealAccount[i] = temp;
        incr = 1;
        temp = 0;
        current = 0;
      } else {
        unsealAccount[i] = current;
        current = 0;
        temp = 0;
        incr = 0;
      }
    } else if (i == 2) {
      current = timeStamp[i] + incr;

      if (current > 30) {
        temp = current - 30;
        unsealAccount[i] = temp;
        incr = 1;
        temp = 0;
        current = 0;
      } else {
        unsealAccount[i] = current;
        current = 0;
        temp = 0;
        incr = 0;
      }
    } else if (i == 1) {
      current = timeStamp[i] + incr;

      if (current > 12) {
        temp = current - 12;
        unsealAccount[i] = temp;
        incr = 1;
        temp = 0;
        current = 0;
      } else {
        unsealAccount[i] = current;
        current = 0;
        temp = 0;
        incr = 0;
      }
    } else if (i == 0) {
      current = timeStamp[i] + incr;
      unsealAccount[i] = current;
      current = 0;
      temp = 0;
      incr = 0;
    }
  }
  let unsealStamp = unsealAccount.join(":");
  return unsealStamp.toString();
};

// console.log(unsealTimeStampHandler(["2021", "07", "07", "15", "54", "20"]));
