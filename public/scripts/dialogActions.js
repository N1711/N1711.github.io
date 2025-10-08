const dialog = document.querySelector("dialog");
const openButton = document.querySelector("#post-global");
const closeButton = document.querySelector("#close-btn");

closeButton.addEventListener("click", () => {
    document.getElementById("text-area-post").value = '';
    dialog.close();
});