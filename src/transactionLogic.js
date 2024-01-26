let gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
};

let add = (a, b) => {
    let num = a.num * b.den + b.num * a.den;
    let den = a.den * b.den;
    let g = gcd(num, den);
    num /= g;
    den /= g;
  return { num, den };
};
let sub = (a, b) => {
  let num = a.num * b.den - b.num * a.den;
  let den = a.den * b.den;
  let g = gcd(num, den);
  num /= g;
  den /= g;
  return { num, den };
};
let cred=(credit)=>{
  let mi = credit[0].amount;
  let ind = 0;
  for(let i=0; i<credit.length; i++){
    let am = credit[i].amount;
    if(am.num*mi.den < mi.num*am.den){
      ind = i;
      mi = am;
    }
  }
  return credit.splice(ind, 1);
}
let deb=(debit)=>{
  let ma = debit[0].amount;
  let ind = 0;
  for(let i=0; i<debit.length; i++){
    let am = debit[i].amount;
    if(am.num*ma.den > ma.num*am.den){
      ind = i;
      ma = am;
    }
  }
  return debit.splice(ind, 1);
}

// let arr = [
//   { spentBy: "a", amount: {num: 18, den: 1}, spentBws: ["c", "d", "e"] },
//   { spentBy: "b", amount: {num: 7, den: 1}, spentBws: ["a", "c", "d"] },
//   { spentBy: "a", amount: {num: 3, den: 1}, spentBws: ["a", "b", "c"] },
//   { spentBy: "e", amount: {num: 10, den: 1}, spentBws: ["a", "b", "c", "d", "e"] },
// ];
// let users = ["a", "b", "c", "d", "e"];



let tLogic = (arr, users) => {
  // array consists of objects, in which individual objects are=> {spent by, amount spent, spent between}
  let netAmount = {};
  for (let u of users) {
    netAmount[u] = { num: 0, den: 1 };
  }
  for (let i = 0; i < arr.length; i++) {
    let spenter = arr[i].spentBy;
    let amount = arr[i].amount;
    let spentBws = arr[i].spentBws;
    netAmount[spenter] = add(netAmount[spenter], amount);
    let spentBwsAmount = { num: amount.num, den: spentBws.length };

    for (let i = 0; i < spentBws.length; i++) {
      netAmount[spentBws[i]] = sub(netAmount[spentBws[i]], spentBwsAmount);
    }
  }
  let ans = [];
  for(let i in netAmount){
    ans.push({user: i, amount: netAmount[i]});
  }
  return ans;
};

let f=(arr)=>{
  let credit = [];
  let debit = [];
  let ans = [];
  for(let i=0; i<arr.length; i++){
    if(arr[i].amount.num>0) debit.push(arr[i]);
    else if(arr[i].amount.num<0) credit.push(arr[i]);
  }

  while(credit.length && debit.length){
    let c = cred(credit)[0];
    let d = deb(debit)[0];
    let final = add(c.amount, d.amount);
    if(final.num>0){
      ans.push([c.user, Math.abs(c.amount.num/c.amount.den), d.user]);
      d.amount = final;
      debit.push(d);
    }else if(final.num<0){
      ans.push([c.user, Math.abs(d.amount.num/d.amount.den), d.user]);
      c.amount = final;
      credit.push(c);
    }else{
      ans.push([c.user, Math.abs(d.amount.num/d.amount.den), d.user]);
    }
    console.log();
  }
  return ans;

}
let finalTransactions = (arr, users)=>{
  return f(tLogic(arr, users));
}

export default finalTransactions;
