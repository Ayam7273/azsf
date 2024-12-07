let getvalue = (id) => {
    let value = document.getElementById(id).value;
    if (value == "" || isNaN(value)) {
      return 0;
    } else {
      return parseFloat(value);
    }
  };
  
  
  let calculate = () => {
    let amt_nisab = 866827.25;
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
    let amt_eligible = 0;
  
  
    if (amt_assets_net > amt_nisab) {
      amt_eligible = Math.ceil(amt_assets_net);
    }
  
    let amt_zakat = Math.ceil(amt_eligible * 0.025);
  
    let formatter = new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    });
  
  
    document.getElementById("amount_eligible").value =
      formatter.format(amt_eligible);
    document.getElementById("amount_zakat").value = formatter.format(amt_zakat);
  
    if (amt_zakat > 0) {
      document.getElementById("donate_button").innerText =
        formatter.format(amt_zakat) + " Zakat";
      document.getElementById("donate_button").dataset.amount = amt_zakat;
    } else {
      document.getElementById("donate_button").text = "Donate Now";
      document.getElementById("donate_button").dataset.amount = 50;
    }
  };
  
  
  window.funraise.push("create", { form: 2426 });