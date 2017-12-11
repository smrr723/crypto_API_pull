var makeRequest = function(url, callback){
// create a new XHR - XML, HTTP Request
   var request = new XMLHttpRequest();
   // open the request, passing the HTTP type and URL in
   request.open('GET', url);
   // write an event listener for the request
   request.addEventListener('load', callback);
   // GO!
   request.send();
}

var generateListingHTML = function(currency, buyAmount, rate){
   var listing = document.createElement('div');
   listing.setAttribute('class', 'listing');
   var tab = document.createElement('div');
   tab.setAttribute('class', 'tab');
   var topSplit = document.createElement('div');
   topSplit.setAttribute('class', 'top-split');
   var holding = document.createElement('div');
   holding.setAttribute('class','holding');
   var pctChange = document.createElement('div');
   pctChange.setAttribute('class', 'pct-change');
   var bttmSplit = document.createElement('div');
   bttmSplit.setAttribute('class', 'bttm-split');
   var currPrice = document.createElement('div');
   currPrice.setAttribute('class', 'current-price');
   var onehchange = document.createElement('div');
   onehchange.setAttribute('class', '1h-change');
   var twfourhchange = document.createElement('div');
   twfourhchange.setAttribute('class', '24h-change');
   var sevendchange = document.createElement('div');
   sevendchange.setAttribute('class', '7d-change');
   listing.appendChild(topSplit);
   listing.appendChild(bttmSplit);
   listing.appendChild(tab);
   topSplit.appendChild(holding);
   topSplit.appendChild(pctChange);
   bttmSplit.appendChild(currPrice);
   bttmSplit.appendChild(onehchange);
   bttmSplit.appendChild(twfourhchange);
   bttmSplit.appendChild(sevendchange);
   var main = document.querySelector('main');
   main.appendChild(listing);
   holding.innerText = "$" + Math.round(buyAmount * (currency.price_usd / rate));
   pctChange.innerText = Math.round(((currency.price_usd - rate)/rate) * 100) + "%";
   currPrice.innerText = "$" + Math.round(currency.price_usd);
   tab.innerText = currency.name;
   onehchange.innerText = currency.percent_change_1h + "%";
   twfourhchange.innerText = currency.percent_change_24h + "%";
   sevendchange.innerText = currency.percent_change_7d + "%";
}

var addListing = function(){
   console.log('Add Listing Initiated');
   var dropDown = document.querySelector('select');
   var currencyName = dropDown.value;
   var amountInput = document.getElementById('amount');
   var buyAmount = amountInput.value;
   var rateInput = document.getElementById('rate');
   var rate = rateInput.value;
   for (currency of currencyData){
      if(currency.name === currencyName){
         generateListingHTML(currency, buyAmount, rate);
      }
   }
}

var populateDropDown = function(currencyData){
   var dropDown = document.querySelector("select");
      for (var currency of currencyData){
         var option = document.createElement('option');
         option.innerText = currency.name;
         dropDown.appendChild(option);
      }
}

var requestComplete = function(){
   console.log("requestComplete running");
   // debugger;
   if(this.status !== 200) return;
   var jsonString = this.responseText;
   currencyData = JSON.parse(jsonString);
   var currency = currencyData[0].name;
   var currency2 = currencyData[1].name;
   addListing(currency, 1000, 0.5);
   addListing(currency2, 4000, 0.7);
   populateDropDown(currencyData);
   var addButton = document.querySelector('button');
   addButton.addEventListener('click', addListing);
}

var app = function(){
   console.log("app running");
   // debugger;
   var url = "https://api.coinmarketcap.com/v1/ticker/";
   makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
