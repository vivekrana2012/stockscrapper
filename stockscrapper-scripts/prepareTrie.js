const tickers = ["ABB","AEGISLOG","AMARAJABAT","AMBALALSA","TATACOMM","ABBOTINDIA"];

var json = {};

tickers.forEach((item) => {

  let array = JSON.parse(JSON.stringify(json));
  let entry = {};

  for(var counter = 0; counter < item.length; counter++ ){
    var node = {
      child: {},
      isWord: false
    };

    if(!array.hasOwnProperty(item[counter])){
      array[item[counter]] = node;
    }
    // console.log(array[item[counter]]);
    array = array[item[counter]]['child'];
  }



});

console.log(JSON.stringify(json));
