function navbar() {
window.addEventListener("scroll",function () {
    let header = document.querySelector("header");
    header.classList.toggle("down",window.scrollY > 0); 
})
}
export default navbar