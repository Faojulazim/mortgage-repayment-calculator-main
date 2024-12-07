const form = document.querySelector("form");
const mortgageAmount = document.querySelector("[data-mortgageAmount]");
const mortgageTerm = document.querySelector("[data-mortgageTerm]");
const interestRate = document.querySelector("[data-interestRate]");
const calculateButton = document.querySelector("#calculateButton");
const radioDiv = document.querySelectorAll("[data-radioDiv]");
const mortgage = document.querySelector("#mortgage");
const mortgageOverTerm = document.querySelector("#mortgageOverTerm");
const defaultDiv = document.querySelector("#default");
const result = document.querySelector("#result");
const clearAll = document.querySelector("#clearAll");

let isChecked = false;
let typeElem = null;

//Error on condition
const error = (id) => {
  document
    .querySelector(`${[id]}`)
    .parentElement.parentElement.querySelector("p")
    .classList.remove("hidden");
  document.querySelector(`${[id]}`).classList.add("border-Red");
  document
    .querySelector(`${[id]}`)
    .classList.remove("border-Lime", "border-Slate700");
  document
    .querySelector(`${[id]}`)
    .parentElement.querySelector("[data-border]")
    .classList.add("bg-Red", "bg-Lime");
  document
    .querySelector(`${[id]}`)
    .parentElement.querySelector("[data-border]")
    .classList.remove("bg-Slate100");
  document
    .querySelector(`${[id]}`)
    .parentElement.querySelector("i")
    .classList.add("text-white");
};

//Remove Error on condition
const noerror = (id) => {
  document
    .querySelector(`${[id]}`)
    .parentElement.parentElement.querySelector("p")
    .classList.add("hidden");
  document
    .querySelector(`${[id]}`)
    .parentElement.querySelector("[data-border]")
    .classList.remove("bg-Red", "bg-Slate100");
  document
    .querySelector(`${[id]}`)
    .parentElement.querySelector("[data-border]")
    .classList.add("bg-Lime");
  document
    .querySelector(`${[id]}`)
    .parentElement.querySelector("i")
    .classList.remove("text-white");
  document.querySelector(`${[id]}`).classList.remove("border-[hsl(4_69%_50%)]");
  document
    .querySelector(`${[id]}`)
    .parentElement.querySelector("i")
    .classList.add("text-Slate900");
  document
    .querySelector(`${[id]}`)
    .classList.remove("border-Red", "border-Slate700");
  document.querySelector(`${[id]}`).classList.add("border-Lime");
};

radioDiv.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (element.classList.contains("bg-[hsl(61_70%_52%/.1)]")) {
      isChecked = false;
    } else {
      isChecked = true;
    }
    typeElem = element;
    element.querySelector("input").checked = true;
    element.querySelector("input").classList.toggle("border-[3px]");
    element.querySelector("input").classList.toggle("border-white");
    element.querySelector("input").classList.toggle("ring-2");
    element.querySelector("input").classList.toggle("ring-Lime");
    element.querySelector("input").classList.remove("bg-white");
    element.querySelector("input").classList.toggle("bg-[hsl(61_70%_52%)]");
    element.classList.toggle("border-[hsl(61_70%_52%)]");
    element.classList.toggle("border-Slate700");
    element.classList.toggle("bg-[hsl(61_70%_52%/.1)]");
    radioDiv.forEach((anotherElement) => {
      if (element !== anotherElement) {
        anotherElement.querySelector("input").checked = false;
        anotherElement.querySelector("input").classList.remove("border-[3px]");
        anotherElement.querySelector("input").classList.remove("border-white");
        anotherElement.querySelector("input").classList.add("bg-white");
        anotherElement.querySelector("input").classList.remove("ring-2");
        anotherElement.querySelector("input").classList.remove("ring-Lime");
        anotherElement
          .querySelector("input")
          .classList.remove("bg-[hsl(61_70%_52%)]");
        anotherElement.classList.add("border-Slate700");
        anotherElement.classList.remove("border-[hsl(61_70%_52%)]");
        anotherElement.classList.remove("bg-[hsl(61_70%_52%/.1)]");
      }
    });
  });
});

const validation = () => {
  let isValid = true;
  const mortgageAmountValue = document.querySelector(
    "[data-mortgageAmount]"
  ).value;
  const mortgageTermValue = document.querySelector("[data-mortgageTerm]").value;
  const interestRateValue = document.querySelector("[data-interestRate]").value;

  //mortageAmount Validation
  if (!mortgageAmountValue.length) {
    document
      .querySelector("[data-mortgageAmount]")
      .parentElement.parentElement.querySelector("p").innerText =
      "This field is required";
    isValid = false;
    error("[data-mortgageAmount]");
  } else if (mortgageAmountValue < 50) {
    document
      .querySelector("[data-mortgageAmount]")
      .parentElement.parentElement.querySelector("p").innerText =
      "Minimum Amount is 50$";

    isValid = false;
    error("[data-mortgageAmount]");
  } else {
    noerror("[data-mortgageAmount]");
  }

  //mortageTerm Validation
  if (!mortgageTermValue.length) {
    isValid = false;
    error("[data-mortgageTerm]");
  } else if (mortgageTermValue < 1) {
    isValid = false;
    error("[data-mortgageAmount]");
  } else {
    noerror("[data-mortgageTerm]");
  }

  //interestRate Validation
  if (!interestRateValue.length) {
    isValid = false;
    error("[data-interestRate]");
    document
      .querySelector("[data-interestRate]")
      .parentElement.parentElement.querySelector("p").innerText =
      "This field is required";
  } else if (interestRateValue < 1) {
    isValid = false;
    error("[data-mortgageAmount]");
  } else if (interestRateValue > 100) {
    document
      .querySelector("[data-interestRate]")
      .parentElement.parentElement.querySelector("p").innerText =
      "Invalid Interest Rate";
    isValid = false;
    error("[data-interestRate]");
  } else {
    noerror("[data-interestRate]");
  }

  //radioButton Validation
  if (isChecked) {
    document.querySelector("#radioPara").classList.add("hidden");
  } else {
    document.querySelector("#radioPara").classList.remove("hidden");
    isValid = false;
  }
  return isValid;
};

//event listener for click on calculateButton
calculateButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (validation() && typeElem == document.querySelector("#repayment")) {
    const monthly_interest_rate = interestRate.value / 100 / 12;
    const total_payments = mortgageTerm.value * 12;
    const firstEqua =
      mortgageAmount.value *
      monthly_interest_rate *
      (1 + monthly_interest_rate) ** total_payments;
    const secondEqua = (1 + monthly_interest_rate) ** total_payments - 1;
    const mortgageTotal = firstEqua / secondEqua;
    const mortgageOverTermTotal = mortgageTotal * total_payments;
    defaultDiv.classList.add("hidden");
    result.classList.remove("hidden");
    mortgage.innerText = mortgageTotal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    mortgageOverTerm.innerText = mortgageOverTermTotal.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else if (validation() && typeElem == document.querySelector("#interest")) {
    const monthly_interest_rate = parseFloat(interestRate.value / 100 / 12);
    const total_payments = parseFloat(mortgageTerm.value * 12);
    const mortgageAmountt = parseFloat(mortgageAmount.value);

    defaultDiv.classList.add("hidden");
    result.classList.remove("hidden");

    const mortgageInterest = mortgageAmountt * monthly_interest_rate;
    const totalMortgageInterest = mortgageInterest * total_payments;

    mortgage.innerText = mortgageInterest.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    mortgageOverTerm.innerText = totalMortgageInterest.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    defaultDiv.classList.remove("hidden");
    result.classList.add("hidden");
  }
});
const inputs = document.querySelectorAll("[data-input]");

//event listener for input on form
form.addEventListener("input", (e) => {
  e.preventDefault();
  validation();
});

//if clear button is clicked then everything will be set
clearAll.addEventListener("click", (e) => {
  inputs.forEach((element) => {
    element.classList.remove("border-Red");
    element.classList.add("border-Slate700");
    element.value = "";
    element.parentElement
      .querySelector("[data-border]")
      .classList.remove("bg-Red");
    element.parentElement
      .querySelector("[data-border]")
      .classList.add("bg-Slate100");
    element.parentElement.querySelector("i").classList.remove("text-white");
    element.parentElement.querySelector("i").classList.remove("text-Slate900");
    element.parentElement.querySelector("i").classList.add("text-Slate700");
    element.parentElement.parentElement
      .querySelector("p")
      .classList.add("hidden");
    document.querySelector("#radioPara").classList.add("hidden");
    if (!result.classList.contains("hidden")) {
      result.classList.add("hidden");
      defaultDiv.classList.remove("hidden");
    }
    if (typeElem) {
      typeElem.querySelector("input").checked = true;
      typeElem.querySelector("input").classList.remove("border-[3px]");
      typeElem.querySelector("input").classList.remove("border-white");
      typeElem.querySelector("input").classList.remove("ring-2");
      typeElem.querySelector("input").classList.remove("ring-Lime");
      typeElem.querySelector("input").classList.remove("bg-white");
      typeElem.querySelector("input").classList.remove("bg-[hsl(61_70%_52%)]");
      typeElem.classList.remove("border-[hsl(61_70%_52%)]");
      typeElem.classList.add("border-Slate700");
      typeElem.classList.remove("bg-[hsl(61_70%_52%/.1)]");
      isChecked = false;
    }
  });
});
