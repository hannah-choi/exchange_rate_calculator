const select_from = document.querySelector(".currency.from");
const select_to = document.querySelector(".currency.to");

const numberBaseCurrency = document.querySelector(".from.number");
const numberConvertCurrency = document.querySelector(".to.number");

let numbers = null;
let currencies = null;

let base_currency = "GBP";
let convert_currency = "EUR";
let howMuch = 1;

function updateNumbers() {
    numberBaseCurrency.value = getCurrency(base_currency);
    numberConvertCurrency.innerHTML = getCurrency(convert_currency);
}

function getCurrency(which) {
    return numbers[currencies.indexOf(which)] * howMuch;
}

function getData(selectedValue) {
    fetch(
        `https://v6.exchangerate-api.com/v6/98394cbbeae00d05a3ca0d4d/latest/${
            !selectedValue ? "GBP" : selectedValue
        }`
    )
        .then(res => res.json())
        .then(result => {
            numbers = Object.values(result.conversion_rates);
            currencies = Object.keys(result.conversion_rates);

            function getOptions(which) {
                return currencies.map(
                    currency =>
                        `<option ${
                            currency === which ? "selected" : ""
                        }>${currency}</option>`
                );
            }

            numbers && getCurrency(base_currency);
            numbers && getCurrency(convert_currency);

            select_from.innerHTML = getOptions(base_currency);
            select_to.innerHTML = getOptions(convert_currency);

            updateNumbers();
        });
}

document.addEventListener("change", ({ target }) => {
    switch (target.id) {
        case "select_from":
            base_currency = target.value;
            getData(select_from.value);
            break;
        case "select_to":
            convert_currency = target.value;
            getData(select_from.value);
            break;
        case "numberBaseCurrency":
            if (howMuch < 0) {
                return;
            }
            howMuch = target.value;
            getCurrency(convert_currency);
            updateNumbers();
            break;
        default:
            return;
    }
});

getData();
