const baseUrl = "https://api.nasa.gov/planetary/apod?api_key=";
const apiKey = "BSXSKtTvo5bsRZzRPShA6qGgku4GTO55dulbCSIP";

var title = "";
var date = "";
var desc = "";
var url = "";

var today = new Date();

function fetchData(date) {
    try {
        fetch(baseUrl+apiKey)
        .then(response=>response.json())
        .then(json=>{
            console.log(json);
            console.log(json.title);
            displayData(json);
        });
    }catch(error){
        console.log(error);
    }
}

//fetchData(fetchDate);
fetchData("&count=1");

var isoDate = "";
for(var i=0; i < 10; i++) {
    fetchData("&count=10&");
}

function displayData(data){
    //create the elements required for one image card
    var cardEl = document.createElement("section");
    var imgEl = document.createElement("img");
    var textEl = document.createElement("div");
    var titleEl = document.createElement("h3");
    var dateEl = document.createElement("h4");
    var descEl = document.createElement("p");
    var likeSetEl = document.createElement("div");
    var likeIconEl = document.createElement("img");
    var dislikeIconEl = document.createElement("img");

    title = data.title;
    date = data.date;
    desc = data.explanation;
    url = data.url;

    cardEl.setAttribute("class","card");

    imgEl.setAttribute("class","main-image");
    imgEl.setAttribute("id","main-image");
    imgEl.setAttribute("src",url);
    imgEl.setAttribute("alt",title);

    textEl.setAttribute("class","text");

    titleEl.setAttribute("id","title");
    titleEl.textContent = title;

    dateEl.setAttribute("id","date");
    dateEl.textContent = date;

    descEl.setAttribute("id","desc");
    descEl.textContent = desc;

    likeSetEl.setAttribute("class","like-set");

    likeIconEl.setAttribute("id","like-icon");
    likeIconEl.setAttribute("src","./assets/images/arrow-down-square.svg");

    dislikeIconEl.setAttribute("id","dislike-icon");
    dislikeIconEl.setAttribute("src","./assets/images/arrow-down-square.svg");

    document.body.appendChild(cardEl);
    cardEl.appendChild(imgEl);
    cardEl.appendChild(textEl);
    textEl.appendChild(titleEl);
    textEl.appendChild(dateEl);
    textEl.appendChild(descEl);
    textEl.appendChild(likeSetEl);
    likeSetEl.appendChild(likeIconEl);
    likeSetEl.appendChild(dislikeIconEl);
}
