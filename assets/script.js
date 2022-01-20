const baseUrl = "https://api.nasa.gov/planetary/apod?api_key=";
const apiKey = "BSXSKtTvo5bsRZzRPShA6qGgku4GTO55dulbCSIP";

var title = "";
var date = "";
var desc = "";
var url = "";

var today = new Date();
var fetchingDate = new Date();

function fetchData(date) {
    try {
        fetch(baseUrl+apiKey+date)
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
//fetchData("&count=1");


for(var i=1; i < 11; i++) {
    fetchingDate.setDate(today.getDate()-i);
    console.log("fetching date: " + fetchingDate);
    fetchData("&date="+ fetchingDate.toISOString().slice(0,10) +"&");
}

function displayData(data){
    //create the elements required for one image card
    var cardEl = document.createElement("section");
    var imgEl;
    var textEl = document.createElement("div");
    var titleEl = document.createElement("h3");
    var dateEl = document.createElement("h4");
    var descEl = document.createElement("p");
    var likeSetEl = document.createElement("div");
    var likeIconEl = document.createElement("img");
    var dislikeIconEl = document.createElement("img");
    var shareIconEl = document.createElement("img");

    if(data.media_type=="video")
    {
        imgEl = document.createElement("iframe");
    }else
    {
        imgEl = document.createElement("img");
    }

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
    likeSetEl.setAttribute("like-state","none");

    likeIconEl.setAttribute("id","like-icon");
    likeIconEl.setAttribute("src","./assets/images/arrow-down-square.svg");

    dislikeIconEl.setAttribute("id","dislike-icon");
    dislikeIconEl.setAttribute("src","./assets/images/arrow-down-square.svg");

    shareIconEl.setAttribute("id","share-icon");
    shareIconEl.setAttribute("src","./assets/images/share.svg");
    shareIconEl.setAttribute("filled", "false");
    shareIconEl.setAttribute("thisLink", url);

    document.body.appendChild(cardEl);
    cardEl.appendChild(imgEl);
    cardEl.appendChild(textEl);
    textEl.appendChild(titleEl);
    textEl.appendChild(dateEl);
    textEl.appendChild(descEl);
    textEl.appendChild(likeSetEl);
    likeSetEl.appendChild(likeIconEl);
    likeSetEl.appendChild(dislikeIconEl);
    likeSetEl.appendChild(shareIconEl);

    likeIconEl.addEventListener("click", function(event) {
        var button = event.target;
        var likeSet = button.parentNode;
        var likeState = likeSet.getAttribute("like-state");
    
        if(likeState == "none" || likeState == "dislike")
        {
            likeSet.setAttribute("like-state","like");
            button.setAttribute("src","./assets/images/arrow-down-square-fill.svg");
            button.nextSibling.setAttribute("src","./assets/images/arrow-down-square.svg");
        }else if(likeState == "like")
        {
            likeSet.setAttribute("like-state","none");
            button.setAttribute("src","./assets/images/arrow-down-square.svg");
        }
    });

    dislikeIconEl.addEventListener("click", function(event) {
        var button = event.target;
        var likeSet = button.parentNode;
        var likeState = likeSet.getAttribute("like-state");

        if(likeState == "none" || likeState == "like")
        {
            likeSet.setAttribute("like-state","dislike");
            button.setAttribute("src","./assets/images/arrow-down-square-fill.svg");
            button.previousSibling.setAttribute("src","./assets/images/arrow-down-square.svg");
        }else if(likeState == "dislike")
        {
            likeSet.setAttribute("like-state","none");
            button.setAttribute("src","./assets/images/arrow-down-square.svg");
        }
    });

    shareIconEl.addEventListener("click", function(event) {
        console.log("share button clicked");
        var button = event.target;

        if(button.getAttribute("filled")=="false")
        {
            var linkBoxEl = document.createElement("div");
            linkBoxEl.setAttribute("class","link-box");
            linkBoxEl.textContent = button.getAttribute("thisLink");
            likeSetEl.appendChild(linkBoxEl);

            button.setAttribute("src","./assets/images/share-fill.svg");
            button.setAttribute("filled","true");
        }
        
    });
}

var likeButton = document.querySelector("#like-icon");

