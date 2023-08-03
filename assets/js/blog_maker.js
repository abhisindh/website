// // Attach a function to the "beforeunload" event of the window
// window.addEventListener('beforeunload', function (event) {
//     // Display a confirmation dialog
//     event.returnValue = 'Are you sure you want to reload? This will lead you to the home page';
// });

function clearContainer(element){
    while (element.firstChild){
        element.removeChild(element.firstChild);
    }

}

function idToPath(cardId){
    return "blogs/"+ cardId + ".html";
}

function createframe(element, path){
    fetch(path)
        .then(response => {
            if (!response.ok){
                return "Blog unpublished";
            }return response.text();
        })
        .then(contents => {
            element.innerHTML = contents
        }).catch(error => console.error("Error : ", error));

}


export function gotoBlog(card){
    const blogPath = idToPath(card.id);
    const containerElement = document.getElementById("blogContainer");
    console.log(blogPath);
    clearContainer(containerElement);
    createframe(containerElement, blogPath);
    hljs.highlightAll();
}

