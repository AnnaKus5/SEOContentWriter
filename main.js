const seoContent = document.querySelector("#seo-content");
const fakeTextarea = document.querySelector("#fake-textarea");
const checkBtn = document.querySelector("#check-btn");
const inputKeyword = document.querySelector("#inputkeywords");
const inputKeywordBtn = document.querySelector("#input-keyword-btn");
const keywordsList = document.querySelector("#keywords-list");
const resetKeywordsBtn = document.querySelector("#reset-keywords-btn");
const itemList = [];

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
}

function addToList(value) {
    const li = document.createElement("li");
    li.classList.add("keyword-item");
    const frequencyNumber = document.createElement("span");
    frequencyNumber.classList.add("keyword-frequency");
    li.innerText = value.name;
    frequencyNumber.innerText = value.frequency;
    li.append(frequencyNumber);
    keywordsList.append(li);
}

function removeKeywords() {
    while (keywordsList.firstElementChild)
        keywordsList.removeChild(keywordsList.firstElementChild);
}


function findKeywords() {

    makeFakeTextArea();

    itemList.forEach(keyword => {
        const article = fakeTextarea.innerHTML;

        keyword.indexValue = createListOfIndex(keyword.name, article);
        keyword.frequency = keyword.indexValue.length;

        updateFrequency(itemList);
        markKeywords(article, keyword.name, keyword.indexValue);
    });

}

function makeFakeTextArea() {
    seoContent.classList.add("hidden");
    fakeTextarea.classList.remove("hidden");
    fakeTextarea.textContent = seoContent.value;
}

function createListOfIndex(value, source) {
    const localIndexArray = [];
    let index = -1;
    const text = source.toLowerCase();
    const valueText = value.toLowerCase();
    while ((index = text.indexOf(valueText, index + 1)) >= 0) {
        localIndexArray.push(index);
    }
    return localIndexArray;
}

function updateFrequency(list) {
    const listOfValue = document.querySelectorAll("#keywords-list li");
    for (let i = 0; i < listOfValue.length; i++) {
        const keywordFrequency = listOfValue[i];
        keywordFrequency.innerText = list[i].frequency;
    }
}

function markKeywords(text, keywordValue, arrayOfIndex) {

    const markTagLength = 31;
    let newArticle = text;

    for (let i = 0; i < arrayOfIndex.length; i++) {
        const startIndex = arrayOfIndex[i];

        const firstPart = newArticle.slice(0, startIndex + (markTagLength * i));
        const keywordText = newArticle.slice(startIndex + (markTagLength * i), (startIndex + (markTagLength * i)) + keywordValue.length);
        const markPart = `<mark class="mark-word">${keywordText}</mark>`;
        const endPart = newArticle.slice(startIndex + keywordValue.length + (markTagLength * i));
        newArticle = firstPart + markPart + endPart;
    }

    return fakeTextarea.innerHTML = newArticle;
}








