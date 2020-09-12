document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".文件內容-主要欄位-元件-資訊標頭-動作欄位-項目_切換原始碼").forEach(v => {
        v.addEventListener("click", () => {
            v.closest(".文件內容-主要欄位-元件").classList.toggle("文件內容-主要欄位-元件_檢視原始碼中");
        });
    });

    document.querySelector(".頁腳-主要內容-導航列-項目_回到頂部").addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    /*document.querySelectorAll(".文件內容-主要欄位-元件-圖示組-單個圖示").forEach(v => {
        v.addEventListener("click", () => {
            window.getSelection().selectAllChildren(v.querySelector(".文件內容-主要欄位-元件-圖示組-單個圖示-標籤"));
            document.execCommand("copy");
            window.getSelection().empty();
        });
    });*/

    window.addEventListener("hashchange", rescanAnchor);

    rescanAnchor();
});

function rescanAnchor() {
    let u = document.location.hash;
    if (u.length === 0) {
        return;
    }
    document.querySelectorAll(".文件內容-主要欄位-元件-資訊標頭-標題欄位").forEach(v => {
        v.classList.remove("文件內容-主要欄位-元件-資訊標頭-標題欄位_被提及的");
    });
    document
        .querySelector(`a[id='${decodeURI(u.substring(u.indexOf("#") + 1))}']`)
        .closest(".文件內容-主要欄位-元件-資訊標頭-標題欄位")
        .classList.add("文件內容-主要欄位-元件-資訊標頭-標題欄位_被提及的");
    // window.scrollTo(window.scrollX, window.scrollY - 50);
}
