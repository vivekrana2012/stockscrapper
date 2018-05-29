var app = angular.module("app" , []);
app.controller("appController", function($scope, $http){
  $scope.searchValue = "";
  $scope.availableTickers = ["TCS"];

  $http.get('http://localhost:3001/api/events/tickers')
    .then(function(result){
      var tickers = [];

      for(item in result){
        tickers.push(item["Security Id"]);
      }

      $('#search').autocomplete({source: tickers});
    });

  createFixedCharts();

  $scope.keydown = function(e){
      if(e.keyCode == 13){
        if($scope.availableTickers.indexOf($scope.searchValue.toUpperCase()) !== -1){
          document.getElementById("tickerCharts").style.display = "block";

		  createTickerCharts();

        }else{
          document.getElementById("tickerCharts").style.display = "none";
        }
      }
  };
});

function createTickerCharts(){
	createChart("stockPriceChart", ['02-May-18', '03-May-18', '04-May-18', '07-May-18', '08-May-18', '09-May-18', '10-May-18', '11-May-18', '14-May-18'],
		'TCS', [3497.8, 3482.65, 3480.85, 3427.7, 3441.05, 3489.05, 3452.75, 3460.6, 3436.75], "#87cefa");

	createChart("volumeChart", ['02-May-18', '03-May-18', '04-May-18', '07-May-18', '08-May-18', '09-May-18', '10-May-18', '11-May-18', '14-May-18'],
		'TCS Volume Traded', [64856, 72522, 46996, 63422, 101282, 49793, 61821, 35168, 301896], "#99ff99");
}

function createFixedCharts(){
	createChart("currencyExchangeChart", ['02-May-18', '03-May-18', '04-May-18', '07-May-18', '08-May-18', '09-May-18', '10-May-18', '11-May-18', '14-May-18'],
		"USD Exchange Rate", [66.680024, 66.658997, 66.808998, 67.128998, 67.199997, 67.344002, 67.238998, 67.38904, 67.549004], "#FF9999");

	createChart("sensexChart", ['02-May-18', '03-May-18', '04-May-18', '07-May-18', '08-May-18', '09-May-18', '10-May-18', '11-May-18', '14-May-18'],
		'Sensex', [35556.71, 35535.79, 35246.27, 35319.35, 35216.32, 35208.14, 34915.38, 35103.14, 35176.42], "#ffcc99");
}

function createChart(chartName, xaxisLabels, chartLabel, chartData, color){
  var ctx = document.getElementById(chartName).getContext('2d');
  var data = {labels: xaxisLabels,
    datasets: [{label: chartLabel, data: chartData, backgroundColor: color, fill: false, borderColor: color}]};

  var chart = new Chart(ctx, {
    type: 'line',
    data: data
  });
}
