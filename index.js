let balance = 500.00;

class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0
    for (let t of this.transactions) {
      balance += t.value;
    }
    return balance
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {

    if(!this.isAllowed()) return false

    // keep track of transaction time
    this.time = new Date();

    // add transaction to account
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction{
  // commit() {
  //   this.account.balance -= this.amount;
  // }

  get value() {
    return -this.amount;
  }

  isAllowed() {
    console.log(this.account.balance, "balance");
    if (this.account.balance + this.value > 0) {
      return (this.account.balance - this.amount >= 0);
    }

  }

}

class Deposit extends Transaction {
  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

const myAccount = new Account('snow-patrol');

console.log('Starting Balance:', myAccount.balance);

t1 = new Withdrawal(50.25, myAccount);
t1.commit();
console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
console.log('Transaction 2:', t2);

t3 = new Deposit(120.00, myAccount);
t3.commit();
console.log('Transaction 3:', t3);

console.log('Balance:', myAccount.balance);
