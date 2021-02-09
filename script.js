const $baseCurrency = document.getElementById("baseCurrency");
const $targetCurrency = document.getElementById("targetCurrency");
const swap = document.getElementById("swap");
const baseOptions = $baseCurrency.querySelectorAll("option");
const message = document.getElementById("message");
const error = document.getElementById("error");

const baseResult = document.querySelector(".base.number");
const targetResult = document.querySelector(".target.number");

function calculate() {
    const baseCurrency = $baseCurrency.value;
    const targetCurrency = $targetCurrency.value;

    fetch(`https://api.exchangeratesapi.io/latest?base=${baseCurrency}`)
        .then(res => res.json())
        .then(result => {
            const rate =
                result.rates[targetCurrency] > 0.0001
                    ? result.rates[targetCurrency].toFixed(4)
                    : result.rates[targetCurrency];
            const showRate = `1 ${baseCurrency} = ${rate} ${targetCurrency}`;
            message.innerHTML = showRate;
            targetResult.value = baseResult.value * rate;
        });
}

$baseCurrency.addEventListener("change", calculate);
$targetCurrency.addEventListener("change", calculate);

document.addEventListener("input", ({ target }) => {
    if (target.tagName === "INPUT") {
        calculate();
    }
});

swap.addEventListener("click", () => {
    [$baseCurrency.value, $targetCurrency.value] = [
        $targetCurrency.value,
        $baseCurrency.value,
    ];
    calculate();
});

calculate();
