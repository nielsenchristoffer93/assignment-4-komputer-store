// DOM Elements
const payElement = document.getElementById("pay");

// DOM Buttons
const bankButton = document.getElementById("bank-button");
const workButton = document.getElementById("work-button");
const repayLoanButton = document.getElementById("repay-loan-button");

/* ================================= */
/*           CREATE CLASS            */
/* ================================= */

class Work {

    /* ===== PRIVATE FIELDS ==== */

    #payment = 0;

    /* ======= CONSTRUCTOR ====== */

    constructor(payment) {
        this.#payment = payment;
    }

    /* ========= GETTERS ======== */

    get getPayment() {
        return this.#payment;
    }

    /* ========= SETTERS ======== */

    set setPayment(payment) {
        this.#payment = payment;
    }

    /* ======= CLASS METHODS ====== */

    increasePayment() {
        this.#payment += 100;
    }

}

/* ================================= */
/*         INITIALIZE CLASS          */
/* ================================= */

const work = new Work(200);


/**
 * Updates pay element on webpage with payment from work.
 */
function updateWorkPaymentBalanceOnPage() {
    payElement.innerText = `${work.getPayment} SEK`;
}

/**
 * Moves the payment from work into the bank. 
 * If we have a loan active, 10% of pay will be used to pay of the loan and the rest will be deposited into the bank.
 */
const movePaymentToBank = () => {

    let tenPercentOfWorkPayment = work.getPayment * 0.1;

    if (bank.loanActive) {
        
        bank.removeFromLoanBalance(tenPercentOfWorkPayment);

        // If loan balance is negative after reducing 10% add it to balance.
        // e.g. balance is loan balance is 10 and pay is 200 (10% of 200 = 20) 20 > 10
        // Since we have already reduced the loanbalance by 20 this will result in a negative value 10 - 20 = -10
        // We then add the loan balance buy multiplying with -1 for a positive number.
        if(bank.getLoanBalance <= 0) {
            bank.addToBalance(bank.getLoanBalance * -1);
            bank.setLoanBalance = 0;
            hideBankElements();
            bank.loanActive = false;
        }

        // Add the remaining payment to bank balance.
        bank.addToBalance(work.getPayment - tenPercentOfWorkPayment);
    } else {
        bank.addToBalance(work.getPayment);
    }

    work.setPayment = 0;

    

    updateAllBalances();
}

/**
 * Repay loan using salary/work payment.
 * Hides elements if loan balance is 0.
 */
const repayLoan = () => {
    if (work.getPayment > 0) {
      if (bank.getLoanBalance >= work.getPayment) {
        bank.removeFromLoanBalance(work.getPayment);
        work.setPayment = 0;
      } else {
        work.setPayment = work.getPayment - bank.getLoanBalance;
        bank.setLoanBalance = 0;
      }
    }
  
    if (bank.getLoanBalance === 0) {
      hideBankElements();
      bank.loanActive = false;
    }
  
    updateAllBalances();
  };
  

/* ================================= */
/*          EVENT LISTENERS          */
/* ================================= */

bankButton.addEventListener("click", movePaymentToBank);
workButton.addEventListener("click", function() {
    work.increasePayment();
    updateWorkPaymentBalanceOnPage();
});
repayLoanButton.addEventListener("click", repayLoan);