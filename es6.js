//Implement ES6 features into the object
const john = {
    name: "John Doe",
    balance: 1500,
    deduct(amount) {
        this.balance = this.balance - amount;
        return new Promise(resolve => setTimeout(() => resolve(`${this.name}  has a balance of ${this.balance}`), 2000)); // pause for 2 seconds (2000 milliseconds)
    },
};

(async () => {
    console.time('Total Time')
    console.log(await john.deduct(200))
    console.timeEnd('Total Time')
})();