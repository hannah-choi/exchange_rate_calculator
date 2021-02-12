const addCurrencyBtn = document.querySelector(".addCurrencyBtn");
const addCurrencyLi = document.querySelector(".addCurrencyLi");

addCurrencyBtn.addEventListener("click", () => {
    addCurrencyLi.classList.toggle("open");
});
