const $baseCurrency = document.getElementById("baseCurrency");
const $targetCurrency = document.getElementById("targetCurrency");
const swap = document.getElementById("swap");
let baseAmount = 1;
let targetAmount = 1;

const baseResult = document.querySelector(".base.number");
const targetResult = document.querySelector(".target.number");

function calculate() {
    const baseCurrency = $baseCurrency.value;
    const targetCurrency = $targetCurrency.value;

    fetch(`https://api.exchangeratesapi.io/latest?base=${currency_one}`)
        .then(res => res.json())
        .then(result => {
            //const rates = result.conversion_rates[targetCurrency];
            baseResult.value =
                result.conversion_rates[baseCurrency] * baseAmount;
            targetResult.value =
                result.conversion_rates[targetCurrency] * targetAmount;
        });
}

document.addEventListener("change", ({ target }) => {
    if (target.tagName !== "SELECT") {
        return;
    }
    calculate();
});

document.addEventListener("input", ({ target }) => {
    if (target.tagName !== "INPUT") {
        return;
    }
    baseAmount = baseResult.value;
    targetAmount = targetResult.value;
    calculate();
});

swap.addEventListener("click", () => {
    [$baseCurrency.value, $targetCurrency.value] = [
        $targetCurrency.value,
        $baseCurrency.value,
    ];
    calculate();
});

calculate();
