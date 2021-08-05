// DOM Elements
const balanceElement = document.getElementById("balance");
const loanElement = document.getElementById("loan");

// DOM Buttons
const loanButton = document.getElementById("get-loan-button");

/* ================================= */
/*           CREATE CLASS            */
/* ================================= */

class Bank {
  /* ===== PRIVATE FIELDS ==== */

  #balance = 0;
  #loanBalance = 0;
  #loanActive = false;

  /* ======= CONSTRUCTOR ====== */

  constructor(balance) {
    this.#balance = balance;
  }

  /* ========= GETTERS ======== */

  get getBalance() {
    return this.#balance;
  }

  get getLoanBalance() {
    return this.#loanBalance;
  }

  get loanActive() {
    return this.#loanActive;
  }

  /* ========= SETTERS ======== */

  set setBalance(balance) {
    this.#balance = balance;
  }

  set setLoanBalance(loan) {
    this.#loanBalance = loan;
  }

  set loanActive(loanActive) {
    this.#loanActive = loanActive;
  }

  /* ======= CLASS METHODS ====== */

  addToBalance(amount) {
    this.#balance += amount;
  }

  removeFromBalance(amount) {
    this.#balance -= amount;
  }

  removeFromLoanBalance(amount) {
    this.#loanBalance -= amount;
  }
}

/* ================================= */
/*         INITIALIZE CLASS          */
/* ================================= */

let bank = new Bank(500);

/**
 * Updates balance element on webpage with balance from bank.
 */
function updateBankBalanceOnPage() {
  balanceElement.innerText = `${bank.getBalance} SEK`;
}

/**
 * Updates loan balance element on webpage with loan balance from bank.
 */
function updateBankLoanBalanceOnPage() {
  loanElement.innerText = `${bank.getLoanBalance} SEK`;
}

/**
 * Updates all the different balances. BankBalance, BankLoanBalance and WorkPaymentBalance.
 */
function updateAllBalances() {
  updateBankBalanceOnPage();
  updateBankLoanBalanceOnPage();

  // Can be found in work.js
  updateWorkPaymentBalanceOnPage();
}

/**
 * Prompts user for a loan, checks if user canceled prompt, if loan amount is not a number, if it's blank or less than 0.
 * Displays alert according to the error user has made.
 * If no errors, a loan will be created and added to bank balance.
 * Hides loan button and displays loan balance and repay loan button.
 *
 * @returns Doesn't return anything, used for quick returns.
 */
const promptForLoan = () => {
  let maxLoan = bank.getBalance * 2;
  let loanAmount = prompt("How much do you want to loan? Your current max loan is:", maxLoan);

  // If we press cancel in prompt, loanAmount will be null and we will return immediately.
  if (loanAmount === null) {
    return;
  }

  // Check that loanAmount is a number and not null/blank or that it's less than or equal to 0.
  if (isNaN(loanAmount) || isBlank(loanAmount) || loanAmount <= 0) {
    alert("Please enter a valid NUMBER");
    return;
  }

  loanAmount = parseInt(loanAmount);
  if (loanAmount <= maxLoan) {
    bank.setLoanBalance = loanAmount;

    // Increase bank balance by loanamount.
    bank.addToBalance(loanAmount);
    bank.loanActive = true;
    updateAllBalances();
    hideBankElements();
  } else {
    alert("You cannot loan more than twice your balance.");
  }
};

/**
 * Checks wheter a string is blank or not.
 *
 * @param {*} string String to check if its blank
 * @returns true if string is blank, false if it isn't.
 */
function isBlank(string) {
  return !string || /^\s*$/.test(string);
}

/**
 * Hides get loan button and displays loan balance and repay loan button.
 */
function hideBankElements() {
  hideElement("loan-balance");
  hideElement("get-loan-item");
  hideElement("repay-loan-item");
}

/**
 * Hides an element by appending class "hide" to element classList.
 *
 * @param {*} idToHide Id of element to hide.
 */
function hideElement(idToHide) {
  var element = document.getElementById(idToHide);
  if (!element.classList.contains("hide")) {
    element.classList.add("hide");
  } else {
    element.classList.remove("hide");
  }
}

/* ================================= */
/*          EVENT LISTENERS          */
/* ================================= */

loanButton.addEventListener("click", promptForLoan);
