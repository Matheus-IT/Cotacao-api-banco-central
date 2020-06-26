"use strict";

var dollar;

async function getDollar() {
  var d = new Date().getDate() - 1; // I have to take the day before the current day for insurance
  var m = new Date().getMonth() + 1;
  var y = new Date().getFullYear();
  var url = `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${m}-${d}-${y}'&$format=json`;
  
  try {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data.value[0]);
    data = data.value[0].cotacaoCompra;
    dollar = data;
  } catch(err) {
    console.log("Error:" + err);
    document.querySelector("#res").innerHTML = "Ocorreu um erro";
  }
}

function cash(val, type=1) {
  if (type === 1) return `R$${val.toFixed(2)}`;
  else if (type === 2) return `U$${val.toFixed(2)}`;
}

function convert() {
  var real = Number(document.querySelector("#real").value);
  var div_res = document.querySelector("#res");
  var r = real / dollar;

  console.log(dollar);
  
  try {
    div_res.innerHTML = `
      <h2>Cotação atual do dólar ${cash(dollar)}</h2>
      <p>${cash(real)} convertido em dólar é ${cash(r, 2)}</p>
    `;
  } catch(err) {
    console.log("Erro: " + err);
    div_res.innerHTML = "Ops ocorreu um erro...";
  }
}

window.onload = getDollar();
