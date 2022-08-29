let seoContent = document.querySelector("#seo-content");
let checkBtn = document.querySelector("#check-btn");
let inputKeyword = document.querySelector(".inputkeywords");
let inputKeywordBtn = document.querySelector("#input-keyword-btn");
let keywordsList = document.querySelector(".keywords-list");
let resetKeywordsBtn = document.querySelector("#reset-keywords-btn");
let itemList = [];

inputKeywordBtn.addEventListener("click", addKeyword);

function addKeyword() {
    let value = inputKeyword.value;
    itemList.push(value);
    addToList(value);
    inputKeyword.value = "";
}

function addToList(value) {
    let li = document.createElement("li");
    li.classList.add("keyword-item");
    li.innerText = value;
    let frequencyNumber = document.createElement("span");
    frequencyNumber.classList.add("keyword-frequency");
    frequencyNumber.innerText = 0;
    li.append(frequencyNumber);
    keywordsList.append(li);
}

resetKeywordsBtn.addEventListener("click", removeKeywords);

function removeKeywords() {
    while (keywordsList.firstElementChild)
        keywordsList.removeChild(keywordsList.firstElementChild);
}






