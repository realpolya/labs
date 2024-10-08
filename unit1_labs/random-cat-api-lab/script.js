const randomButtonEl = document.querySelector(".randomButton")
const searchButtonEl = document.querySelector(".searchButton")
const randomImgEl = document.querySelector(".randomCatImage")
const categoryCatImgEl = document.querySelector(".categoryCatImage")
const inputEl = document.querySelector("input");
const breedEl = document.querySelector(".breed");

// API Key
const headers = {
    "x-api-key": "live_e5tOUzoWeRLKOZXWAze104nxtJhRTloNTckaxNzGU0d0nk3nb3cBoDnswgBjX2zI" 
};

randomButtonEl.addEventListener("click", () => {
    let url ="https://api.thecatapi.com/v1/images/search";

    console.log("clicked");

    fetch(url)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            randomImgEl.src = res[0].url;
        });
});

searchButtonEl.addEventListener("click", () => {
    console.log("clicked");
    let url = "https://api.thecatapi.com/v1/images/search?has_breeds=1&";
    let api_key="&api_key=";
    const inputValue = inputEl.value;
    let breedUrl = "?breed_ids="

    let newUrl = `${url}${breedUrl}${inputValue}${api_key}`;
    let catInfoUrl = "https://api.thecatapi.com/v1/images/"

    fetch(newUrl, headers)
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            categoryCatImgEl.src = res[0].url;
            console.log(res[0].id);
            fetch(`${catInfoUrl}${res[0].id}`)
                .then((response) => response.json())
                .then((response) => {
                    console.log("here", response.breeds[0]);
                    breedEl.innerHTML = `<ul>
                        <li><strong>Breed id</strong>: ${response.breeds[0].id}</li>
                        <li><strong>Name</strong>: ${response.breeds[0].name}</li>
                        <li><strong>Description</strong>: ${response.breeds[0].description}</li>
                        <li><strong>Affection level</strong>: ${response.breeds[0].affection_level}</li>
                    </ul>
                    `
                })
        });
});
