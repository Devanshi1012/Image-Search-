const accessKey = "9wlylxJ1dgSlnJ95-MHOXkNheq03eWdSH_lotkVF0wk";
const form1 = document.querySelector("form");
const input = document.querySelector("#input-text");
const searchResults = document.querySelector("#search-Results");
const showMore = document.querySelector("#showBtn");

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = input.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const resposne = await fetch(url);
    const data = await resposne.json();
    const results = data.results;
    console.log(data);

    if(page === 1){
        searchResults.innerHTML = "";
    }

    results.forEach((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const img = document.createElement("img");
        img.src = result.urls.small;
        img.alt = result.alt_description;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(img);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    })
    page++;
    if(page > 1){
        showMore.style.display = "block";
    }   
}

form1.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})
showMore.addEventListener("click",()=>{
    searchImages();
})

