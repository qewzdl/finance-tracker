/*
================
GLOBAL VARIABLES
================
*/

// Settings
let maxDecimals = 2;

/*
=======
CLASSES
=======
*/

// Default
class Account {
    static instances = [];

    constructor(name) {
        this.name = name;
        this.balance = 0;
        this.differencePercent = 0;

        Account.instances.push(this);
    }
}

// Managers & Singletones
class AccountManager {
    constructor(account) {
        if (AccountManager.instance) {
            return AccountManager.instance;
        }

        this.currentAccount = account;

        AccountManager.instance = this;
    }
}

/*
===================
DOM CONTENT LOADING
===================
*/
document.addEventListener("DOMContentLoaded", () => {
    /*
    ===============
    CLASS INSTANCES
    ===============
    */
    let account1 = new Account("Card");
    let account2 = new Account("Wallet");
    let account3 = new Account("Crypto");

    accountManager = new AccountManager(account1);

    /*
    ============
    DOM ELEMENTS
    ============
    */
    const amountInputElement = document.getElementById('amountInput');
    const earnBtnElement = document.getElementById('earnBtn');
    const spendBtnElement = document.getElementById('spendBtn');
    const setBtnElement = document.getElementById('setBtn');

    const accountsDropdownElement = document.getElementById('accountsDropdown');

    const balanceElements = document.getElementsByClassName('balance');
    const differencePercentElements = document.getElementsByClassName('difference-percent');
    const accountNameElements = document.getElementsByClassName('account-name');

    const newAccountNameInputElement = document.getElementById('newAccountNameInput');
    const createAccountBtn = document.getElementById('createAccountBtn');

    /*
    ===============
    EVENT LISTENERS
    ===============
    */
    amountInputElement.addEventListener("input", () => {
        amountInputElement.value = amountInputElement.value.replace(/[^0-9]/g, '');
    });

    createAccountBtn.addEventListener("click", () => {
        if (newAccountNameInputElement.value.length === 0) return;

        createAccount(newAccountNameInputElement.value)

        updateInterface();
    });

    earnBtnElement.addEventListener("click", () => operateBalance('+', amountInputElement.value));
    spendBtnElement.addEventListener("click", () => operateBalance('-', amountInputElement.value));
    setBtnElement.addEventListener("click", () => setBalance(amountInputElement.value));
    accountsDropdownElement.addEventListener("change", () => changeAccountByName(accountsDropdownElement.value));

    /*
    =====
    START
    =====
    */
    updateInterface();
    
    /*
    =========
    FUNCTIONS
    =========
    */
    function modifyBalance(newBalanceCallback) {
        if (amountInputElement.value.length === 0) return;
        
        let previousBalance = accountManager.currentAccount.balance;

        newBalanceCallback();

        handleDifferencePercent(accountManager.currentAccount.balance, previousBalance);
        updateInterface();
    }

    function operateBalance(operator, value) {
        modifyBalance(() => {
            switch (operator) {
                case '+':
                    accountManager.currentAccount.balance += parseInt(value);
                    break;
                
                case  '-':
                    accountManager.currentAccount.balance -= parseInt(value);
                    break;
            }
        });
    }

    function setBalance(value) {
        modifyBalance(() => {
            accountManager.currentAccount.balance = parseInt(value);
        });
    }

    function handleDifferencePercent(part, value) {
        accountManager.currentAccount.differencePercent = (((part - value) / value) * 100).toFixed(maxDecimals);
    }

    function createAccount(name) {
        for (i = 0; i < Account.instances.length; i++) {
            if (Account.instances[i].name === name) {
                alert("Account name is duplicated!");
            }
        }

        let account = new Account(name);
    }

    function changeAccount(newAccount) {
        accountManager.currentAccount = newAccount;
    }

    function changeAccountByName(newAccountName) {
        for (i = 0; i < Account.instances.length; i++) {
            if (Account.instances[i].name === newAccountName) {
                changeAccount(Account.instances[i]);
            }
        }
        updateInterface();
    }

    // UI Update
    function updateInterface() {
        updateBalanceElements();
        updateDifferencePercentElements();
        updateAccountNameElements();
        updateAccountsDropdownElement();
    }

    function updateBalanceElements() {
        for (i = 0; i < balanceElements.length; i++) {
            balanceElements[i].innerHTML = accountManager.currentAccount.balance;
        }
    }

    function updateDifferencePercentElements() {
        for (i = 0; i < differencePercentElements.length; i++) {
            differencePercentElements[i].innerHTML = `${accountManager.currentAccount.differencePercent > 0 ? '+' : ''}${accountManager.currentAccount.differencePercent}%`;
        }
    }

    function updateAccountNameElements() {
        for (i = 0; i < accountNameElements.length; i++) {
            if (accountNameElements[i].tagName[0] === 'H') {
                accountNameElements[i].innerHTML = accountManager.currentAccount.name;
            } else {
                accountNameElements[i].innerHTML = accountManager.currentAccount.name.toLowerCase();
            }
        }
    }

    function updateAccountsDropdownElement() {
        accountsDropdownElement.innerHTML = '';

        for (i = 0; i < Account.instances.length; i++) {
            accountsDropdownElement.innerHTML += `<option value="${Account.instances[i].name}">${Account.instances[i].name}</option>`;
        }

        accountsDropdownElement.value = accountManager.currentAccount.name;
    }
});  