const url = 'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const pageUrl = 'href=http://en.wikipedia.org/?curid=${pageid}';

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultDOM = document.querySelector(".result");

formDOM.addEventListener('submit', (e)=> {
    e.preventDefault();

    const value = inputDOM.value;
    if(!value){
        resultDOM.innerHTML = 
        `<div class="error"> Please enter valid search term</div>`;
        return;
    }

    fetchPage(value);
});

const fetchPage = async (searchValue) => {
   resultDOM.innerHTML = '<div class="spinner-border text-info"></div>';

   try{
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if(results < 1){
        resultDOM.innerHTML = '<div class="error">No match, please searching in different keywords</div>';
    }
    renderResults(results);
    }catch(error){
    resultDOM.innerHTML = '<div class="error">There was an error...</div>';
   }
}

const renderResults = (list) => {
    const cardsList = list.map((item)=>{
        const {title, snippet, pageid} = item;
        return `
        <div class="col-lg-4"><article class="card mb-3" style="min-height:175px" >
        <div class="card-body">
            <a style="text-decoration:none" href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
                <h4 class="card-title">${title}</h4>
                <p class="card-text">${snippet}</p>
            </a>
            </div>
            </article></div>
        `
    }).join('');

    resultDOM.innerHTML = `${cardsList}`;
}