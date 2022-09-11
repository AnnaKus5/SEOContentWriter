let seoContent = document.querySelector("#seo-content");
let checkBtn = document.querySelector("#check-btn");
let inputKeyword = document.querySelector(".inputkeywords");
let inputKeywordBtn = document.querySelector("#input-keyword-btn");
let keywordsList = document.querySelector(".keywords-list");
let resetKeywordsBtn = document.querySelector("#reset-keywords-btn");
let itemList = [];

inputKeywordBtn.addEventListener("click", addKeyword);

function addKeyword() {
    //możliwość dodania pustego stringa - poprawić
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
    li.innerText = value.name;
    let frequencyNumber = document.createElement("span");
    frequencyNumber.classList.add("keyword-frequency");
    frequencyNumber.innerText = value.frequency;
    li.append(frequencyNumber);
    keywordsList.append(li);
}


resetKeywordsBtn.addEventListener("click", removeKeywords);

function removeKeywords() {
    while (keywordsList.firstElementChild)
        keywordsList.removeChild(keywordsList.firstElementChild);
}

checkBtn.addEventListener("click", findKeywords);

function findKeywords() {
    itemList.forEach(el => {
        el.indexValue = createListOfIndex(el.name, seoContent.value);
        console.log(el.indexValue);
        el.frequency = el.indexValue.length;
    })

    function createListOfIndex (value, source) {

        let localIndexArray = [];
        let index = -1;

        while ((index=source.indexOf(value, index + 1)) >= 0) {
            localIndexArray.push([index, index + value.length]);
        }

        return localIndexArray;

    }

}






