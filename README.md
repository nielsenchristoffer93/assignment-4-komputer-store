# Assignment 4 Komputer Store

A dynamic webpage using "vanilla" JavaScript.  
You can add balance to your bank by working as well as taking a loan for purchasing a laptop.

![Komputer-Store.png](/komputer-store.png)

The select element (drop-down list) containing the different computers is fetched from a API:  
https://noroff-komputer-store-api.herokuapp.com/computers

Project is available as a github-page:  
https://nielsenchristoffer93.github.io/assignment-4-komputer-store/

## The Bank 💰

The bank will display your balance, and a button for taking a loan.  
If you have a active loan, a loan balance will appear.

To increase bank with custom amount (in this case 100 000) use:  

```javascript
bank.setBalance = 100000;
```

The balance will then be updated but not the webpage. For the webpage to update use:

```javascript
updateBankBalanceOnPage();
```

## Working ⛏

The work section will display your total pay, which will increase by 100 every time you click the "work" button.  
The "bank" button will deposit the pay into the bank balance. If you have a active loan 10% will be automatically deducted from the total pay to be able to repay the dept. You can also choose to immediately repay the loan using the "repay loan" button, which will deduct the loan balance by the total pay.

## Laptop 💻

By selecting a different laptop from the drop-down, the information on the page will update.
You can also choose to purchase a laptop by clicking the "buy now" button, which will reduce your balance by the price of the computer and reduce stock of computer by 1.

