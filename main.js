let seoContent = document.querySelector("#seo-content");
let checkBtn = document.querySelector("#check-btn");
let inputKeyword = document.querySelector(".inputkeywords");
let inputKeywordBtn = document.querySelector("#input-keyword-btn");
let keywordsList = document.querySelector(".keywords-list");
let resetKeywordsBtn = document.querySelector("#reset-keywords-btn");
let itemList = [];

inputKeywordBtn.addEventListener("click", addKeyword());

function addKeyword() {
    let value = inputKeyword.value;
    itemList.push(value);
    inputKeyword.value = "";
}


console.log(itemList);




