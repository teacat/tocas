document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("button").forEach(v => {
        v.addEventListener("click", () => {
            v.closest("content-component").toggleAttribute("data-active");
        });
    });
});
