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

    makeFakeTextArea();

    itemList.forEach(keyword => {
        let article = fakeTextarea.innerHTML;

        keyword.indexValue = createListOfIndex(keyword.name, article);
        keyword.frequency = keyword.indexValue.length;

        updateFrequency(itemList);
        markKeywords(article, keyword.name, keyword.indexValue);
    });

    function makeFakeTextArea() {
        seoContent.classList.add("hidden");
        fakeTextarea.classList.remove("hidden");
        fakeTextarea.textContent = seoContent.value;
    }

    function createListOfIndex (value, source) {
        let localIndexArray = [];
        let index = -1;
        let text = source.toLowerCase();
        let valueText = value.toLowerCase();
        while ((index=text.indexOf(valueText, index + 1)) >= 0) {
            localIndexArray.push(index);
        }
        return localIndexArray;
    }

    function updateFrequency(list) {
        let listOfValue = document.querySelectorAll(".keyword-frequency");
        for (let i = 0; i < listOfValue.length; i++) {
            let keywordFrequency = listOfValue[i];
            keywordFrequency.innerText = list[i].frequency;
        }  
    }

    function markKeywords(text, keywordValue, arrayOfIndex) {

        let markTagLength = 31;
        let newArticle = text;

        for(let i = 0; i < arrayOfIndex.length; i++) {
            let startIndex = arrayOfIndex[i];

            let firstPart = newArticle.slice(0, startIndex + (markTagLength * i));
            let keywordText = newArticle.slice(startIndex + (markTagLength * i), (startIndex + (markTagLength * i)) + keywordValue.length);
            let markPart = `<mark class="mark-word">${keywordText}</mark>`;
            let endPart = newArticle.slice(startIndex + keywordValue.length + (markTagLength * i));
            newArticle = firstPart + markPart + endPart; 
        }

        return fakeTextarea.innerHTML = newArticle;
    }
}







