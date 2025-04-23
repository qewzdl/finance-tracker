/*
=========
VARIABLES
=========
*/

// Public
let maxDecimals = 2;

// Private
let totalMoney = 0;
let difference = 0;
let differencePercent = 0;

// Elements
const amountInputElement = document.getElementById('amountInput');
const walletAmountElement = document.getElementById('walletAmount');
const differencePercentElement = document.getElementById('differencePercent');

const earnBtnElement = document.getElementById('earnBtn');
const spendBtnElement = document.getElementById('spendBtn');
const setBtnElement = document.getElementById('setBtn');

/*
=========
LISTENERS
=========
*/
amountInputElement.addEventListener("input", () => {
    amountInputElement.value = amountInputElement.value.replace(/[^0-9]/g, '');
});

earnBtnElement.addEventListener("click", () => operateMoney('+', amountInputElement.value));
spendBtnElement.addEventListener("click", () => operateMoney('-', amountInputElement.value));
setBtnElement.addEventListener("click", () => setMoney(amountInputElement.value));

/*
=========
FUNCTIONS
=========
*/
function operateMoney(operator, value) {
    if (amountInputElement.value.length === 0) return 0;

    let previousTotalMoney = totalMoney;

    switch (operator) {
        case '+':
            totalMoney += parseInt(value);
            break;
        
        case  '-':
            totalMoney -= parseInt(value);
            break;
    }

    handleDifferencePercent(totalMoney, previousTotalMoney);
    updateInterface();
}

function handleDifferencePercent(part, value) {
    differencePercent = (((part - value) / value) * 100).toFixed(maxDecimals);
}

function updateInterface() {
    if (differencePercent > 0) {
        differencePercentElement.innerHTML = '+' + differencePercent + '%';
    } else {
        differencePercentElement.innerHTML = differencePercent + '%';
    } 

    walletAmountElement.innerHTML = totalMoney;
}

function setMoney(value) {
    totalMoney = value;

    updateInterface();
}