document.addEventListener("DOMContentLoaded", function () {
    document
        .querySelectorAll(
            ".文件內容-主要欄位-元件-資訊標頭-動作欄位-項目_切換原始碼"
        )
        .forEach(v => {
            v.addEventListener("click", () => {
                v.closest(".文件內容-主要欄位-元件").classList.toggle(
                    "文件內容-主要欄位-元件_檢視原始碼中"
                );
            });
        });

    document
        .querySelector(".頁腳-主要內容-導航列-項目_回到頂部")
        .addEventListener("click", () => {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        });
});
