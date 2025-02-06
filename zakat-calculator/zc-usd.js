let getvalue = (id) => {
  let value = document.getElementById(id).value;
  if (value === "" || isNaN(value)) {
      return 0;
  } else {
      return parseFloat(value);
  }
};

let fetchExchangeRate = async () => {
  try {
      const response = await fetch(
          "https://api.exchangerate-api.com/v4/latest/GBP"
      ); // Fetch the latest exchange rates for GBP
      const data = await response.json();
      const rateUSD = data.rates.USD; // Get the rate for GBP to USD
      return rateUSD;
  } catch (error) {
      console.error("Error fetching exchange rate:", error);
      return 1.3; // Fallback rate if API fails
  }
};

let updateNisabDisplay = async () => {
  const nisabGBP = 430.70; // Nisab value in GBP
  const rateUSD = await fetchExchangeRate();
  const nisabUSD = (nisabGBP * rateUSD).toFixed(2); // Convert to USD
  document.querySelector("p").innerHTML = `Today's Nisab is: $${nisabUSD}`;
};

let calculate = () => {
  let amt_nisab = 430.70; // Nisab threshold in GBP
  let amt_home = getvalue("amount_home");
  let amt_bank = getvalue("amount_bank");
  let amt_shares = getvalue("amount_shares");
  let amt_merchandise = getvalue("amount_merchandise");
  let amt_gold = getvalue("amount_gold");
  let amt_property = getvalue("amount_property");
  let amt_other = getvalue("amount_other");
  let amt_debts = getvalue("amount_debts");
  let amt_expenses = getvalue("amount_expenses");

  let amt_assets_gross =
      amt_home +
      amt_bank +
      amt_shares +
      amt_merchandise +
      amt_gold +
      amt_property +
      amt_other;

  let amt_assets_net = amt_assets_gross - amt_debts - amt_expenses;
  let amt_eligible = amt_assets_net > amt_nisab ? Math.ceil(amt_assets_net) : 0;
  let amt_zakat = amt_eligible > 0 ? Math.ceil(amt_eligible * 0.025) : 0;

  let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
  });

  // Update Eligible Amount and Zakat Amount Fields
  document.getElementById("amount_eligible").value =
      amt_eligible > 0 ? formatter.format(amt_eligible) : "Ineligible";
  document.getElementById("amount_zakat").value =
      amt_eligible > 0 ? formatter.format(amt_zakat) : "Ineligible";

  // Update CTA Button Behavior
  const donateButton = document.getElementById("donate_button");
  if (amt_eligible > 0) {
      donateButton.innerText = "Pay Now";
      donateButton.dataset.amount = amt_zakat;
      donateButton.href = "/https://donate.stripe.com/7sI03XbLPaP2bew6oo"; // Direct to donation page
      donateButton.classList.add("active-cta");
  } else {
      donateButton.innerText = "Calculate";
      donateButton.removeAttribute("href"); // Remove link if ineligible
      donateButton.classList.remove("active-cta");
  }
};

// Reset All Input Fields
let resetFields = () => {
  const inputs = document.querySelectorAll(".login__input-text");
  inputs.forEach((input) => {
      input.value = "";
  });
  document.getElementById("amount_eligible").value = "Ineligible";
  document.getElementById("amount_zakat").value = "Ineligible";

  const donateButton = document.getElementById("donate_button");
  donateButton.innerText = "Calculate";
  donateButton.removeAttribute("href");
  donateButton.classList.remove("active-cta");
};

// Event Listener to Update Results on Input Change
const inputs = document.querySelectorAll(".login__input-text");
inputs.forEach((input) => {
  input.addEventListener("input", calculate);
});

// Update Nisab Display on Page Load
updateNisabDisplay();

// Re-run exchange rate fetch every 10 minutes to keep it fresh
setInterval(updateNisabDisplay, 600000);
