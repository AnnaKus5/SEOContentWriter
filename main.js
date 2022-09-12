let seoContent = document.querySelector("#seo-content");
let fakeTextarea = document.querySelector(".fake-textarea");
let checkBtn = document.querySelector("#check-btn");
let inputKeyword = document.querySelector(".inputkeywords");
let inputKeywordBtn = document.querySelector("#input-keyword-btn");
let keywordsList = document.querySelector(".keywords-list");
let resetKeywordsBtn = document.querySelector("#reset-keywords-btn");
let itemList = [];

inputKeywordBtn.addEventListener("click", addKeyword);
resetKeywordsBtn.addEventListener("click", removeKeywords);
checkBtn.addEventListener("click", findKeywords);


function addKeyword() {
    if (inputKeyword.value !== "") {
        let value = {
            name: inputKeyword.value,
            frequency: 0
        }
        itemList.push(value);
        addToList(value);
        inputKeyword.value = "";
    }

    function addToList(value) {
        let li = document.createElement("li");
        li.classList.add("keyword-item");
        let frequencyNumber = document.createElement("span");
        frequencyNumber.classList.add("keyword-frequency");
        li.innerText = value.name;
        frequencyNumber.innerText = value.frequency;
        li.append(frequencyNumber);
        keywordsList.append(li);
    }
}


function removeKeywords() {
    while (keywordsList.firstElementChild)
        keywordsList.removeChild(keywordsList.firstElementChild);
}


function findKeywords() {
    itemList.forEach(el => {
        el.indexValue = createListOfIndex(el.name, seoContent.value);
        el.frequency = el.indexValue.length;
    })

    function createListOfIndex (value, source) {
        let localIndexArray = [];
        let index = -1;
        while ((index=source.indexOf(value, index + 1)) >= 0) {
            // localIndexArray.push([index, index + value.length]);
            // utworzenie tablicy tylko z indexami startowymi
            localIndexArray.push(index);
        }
        return localIndexArray;
    }

    updateFrequency(itemList);

    function updateFrequency(list) {
        let listOfValue = document.querySelectorAll(".keyword-frequency");
        for (let i = 0; i < listOfValue.length; i++) {
            let keywordFrequency = listOfValue[i];
            keywordFrequency.innerText = list[i].frequency;
        }  
    }

    markKeywords(itemList);

}

function markKeywords(list) {

    seoContent.classList.add("hidden");
    fakeTextarea.classList.remove("hidden");

    fakeTextarea.textContent = seoContent.value;

    
    let markTagLength = 31;
    // let j = 0; // ilość tagów w poprzednich iteracjach forEach


    list.forEach(keyword => {
        let article = fakeTextarea.innerHTML;
        let value = keyword.name;
        let indexOfKeyword = keyword.indexValue;

        //działa z jednym keywordsem
        for(let i = 0; i < indexOfKeyword.length; i++) {
            let startIndex = indexOfKeyword[i];
            console.log(startIndex);

            let firstPart = article.slice(0, startIndex + (markTagLength * i));
            let markPart = `<mark class="mark-word">${value}</mark>`;
            let endPart = article.slice(startIndex + value.length + (markTagLength * i));
            article = firstPart + markPart + endPart; 
        }

        fakeTextarea.innerHTML = article;
        // j += indexOfKeyword.length;
    })


    // schemat działania:
    // --------------------
    // let value = "piana";
    // let article = fakeTextarea.textContent;
    // let markTagLength = 31;

    // let startIndex = 20;
    // let nextIndex = 59;

    // let firstPart = article.slice(0, startIndex);
    // let markPart = `<mark class="mark-word">${value}</mark>`;
    // let endPart = article.slice(startIndex + value.length);

    // let newArticle = firstPart + markPart + endPart;

    // // wyszukanie drugiego indexu

    // firstPart = newArticle.slice(0, nextIndex + markTagLength);
    // markPart = `<mark class="mark-word">${value}</mark>`;
    // endPart = newArticle.slice(nextIndex + markTagLength + value.length);

    // newArticle = firstPart + markPart + endPart;

    // fakeTextarea.innerHTML = newArticle;


    // list.forEach(keyword => {

    // })


}






