document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("button").forEach(v => {
        v.addEventListener("click", () => {
            v.closest("content-component").toggleAttribute("data-active");
        });
    });

    document
        .querySelector("a[data-backtotop]")
        .addEventListener("click", () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
});
