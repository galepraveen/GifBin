const submitBtn = document.querySelector("#submit-btn");
const loader = document.querySelector(".loader");
const wrapper = document.querySelector(".wrapper");
const input = document.querySelector("#search-box");

const generateGif = () => {
    loader.style.display = "block";
    wrapper.style.display = "none";

    let inputVal = input.value;

    let gifCount = 12;
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputVal}&limit=${gifCount}&offset=0&rating=g&lang=en`;

    wrapper.innerHTML = "";

    fetch(url)
    .then(resp => resp.json())
    .then(info => {
        // console.log(info.data);
        const gifsData = info.data;
        gifsData.forEach(gif => {
            let container = document.createElement('div');
            container.classList.add("container");
            let img = document.createElement('img');
            img.setAttribute('src', gif.images.downsized_medium.url);
            img.onload = () => {
                gifCount--;
                if(gifCount == 0){
                    loader.style.display = "none";
                    wrapper.style.display = "grid";
                }
            };
            container.append(img);

            let copyBtn = document.createElement('button')
            copyBtn.innerText = "Copy Link";
            copyBtn.addEventListener('click', ()=>{
                let copyLink = `https://media4.giphy.com/media/${gif.id}/giphy.mp4`;

                navigator.clipboard.writeText(copyLink)
                .then(()=>{
                    alert("GIF Copied to clipboard");
                })
                .catch(()=>{
                    alert("GIF Copied to clipboard");
                    let hiddenInput = document.createElement('input');
                    hiddenInput.setAttribute('type', "text");
                    document.body.append(hiddenInput);
                    hiddenInput.value = copyLink;
                    hiddenInput.select();
                    document.execCommand("copy");
                    document.body.remove(hiddenInput);
                })
            });

            container.append(copyBtn);

            wrapper.append(container);
        });

    })

}

submitBtn.addEventListener('click', generateGif)
window.addEventListener('load', generateGif)