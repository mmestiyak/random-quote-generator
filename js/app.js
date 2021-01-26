const quoteContainer = document.querySelector('.quote-container');
const quoteText = quoteContainer.querySelector('.quote');
const authorText = quoteContainer.querySelector('.author');
const twitterBtn = quoteContainer.querySelector('.btn-twitter');
const addNewQuoteBtn = quoteContainer.querySelector('.btn-new-quote');
const loaded = document.querySelector('.loader');

function loading(){
  loaded.hidden = false;
  quoteContainer.hidden = true;
}

function loadingCompleted(){
  if(!loaded.hidden){
     loaded.hidden = true;
     quoteContainer.hidden = false; 
  }
}



// Get Quote From API

async function getQuote(){
  const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
  const proxyUrl = "https://ancient-retreat-67660.herokuapp.com/";
  try {
    loading()
    const response = await fetch(proxyUrl + apiURL);
    const data = await response.json();
    if(data.quoteText.length > 120 ){
        quoteText.classList.add('long-quote')
    }else {
        quoteText.classList.remove('long-quote'); 
    }
    quoteText.innerText = data.quoteText;
    if(data.quotAuthor === ''){
      authorText.innerText = 'Unknown';
    }else {
      authorText.innerText = data.quoteAuthor;

    }
    loadingCompleted()
  }catch(err){
    getQuote()
  }
}
addNewQuoteBtn.addEventListener('click', getQuote)

function twitterBtnHandler(){
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const tweet = `https://twitter.com/intent/tweet?text=${quote} \n —— ${author}
  `;
  window.open(tweet,'_blank');
}
twitterBtn.addEventListener('click', twitterBtnHandler)

// load Quote
getQuote()