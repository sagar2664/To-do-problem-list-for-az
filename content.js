//This variable is used as a key for storing and retrieving data in
//Chrome's storage.
let problemListKey = "algozenith_problems";
newBookmark = window.location.href;

//When the page finishes loading, the
//addBookmarkButton() function will be executed
window.addEventListener("load", () => {
  addBookmarkButton();
});

//addBookmarkButton function will be responsible
//for adding bookmark button to the webpage
function addBookmarkButton() {
  const bookmarkBtn = document.createElement("img");
  bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
  bookmarkBtn.className = "btn_ref";
  bookmarkBtn.title = "Click to bookmark current timestamp";
  bookmarkBtn.style.height = "30px";
  bookmarkBtn.style.width = "30px";

  //Retriving an element with the CSS classes
  //"btn", "btn_ref", "text_white", and "ml-1".
  //Then assigning the parent elements of that
  //element to the azAskDoubt variable.
  azAskDoubt = document.getElementsByClassName("btn btn_ref text_white ml-1")[0]
    .parentElement.parentElement;

  //appending the bookmarkBtn image element to the
  //azAskDoubt
  azAskDoubt.appendChild(bookmarkBtn);

  //adding event listener to bookmarkBtn
  bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
}

//when we click bookmarkBtn then this funtion performs
//bookmarking functionalities
const addNewBookmarkEventHandler = async () => {
  currentProblemBookmarks = await fetchBookmarks();

  //finding the problemname in html
  problemName =
    document.getElementsByClassName("col-8 my-auto")[0].lastChild.textContent;

  //crating the newBookmark
  const newBookmarkObj = {
    url: newBookmark,
    desc: problemName,
  };

  //If bookmark is already done then we will ignore
  //and if not done then we will add bookmark
  let addNewToBookmark = true;
  //iterating to every bookmark to find match of our current bookmark
  for (let i = 0; i < currentProblemBookmarks.length; i++) {
    if (currentProblemBookmarks[i].url == newBookmark) {
      addNewToBookmark = false;
    }
  }
  if (addNewToBookmark) {
    chrome.storage.sync.set({
      [problemListKey]: JSON.stringify([
        ...currentProblemBookmarks,
        newBookmarkObj,
      ]),
    });
  }
};

//The fetchBookmarks() function allows retrieving 
//the stored bookmarks for further use in the extension.
const fetchBookmarks = () => {
	return new Promise((resolve) => {
		chrome.storage.sync.get([problemListKey], (obj) => {
			resolve(obj[problemListKey] ? JSON.parse(obj[problemListKey]) : []);
		});
	});
};

