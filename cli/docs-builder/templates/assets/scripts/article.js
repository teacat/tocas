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

    document.querySelector("#文件內容-內容索引-回到頂部").addEventListener("click", () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    document.addEventListener("click", (e) => {

        document.querySelectorAll(".文件內容-主要欄位-工具列-項目-下拉式選單").forEach((e) => {
            e.querySelector(".文件內容-主要欄位-工具列-項目-下拉式選單-群組").classList.remove("文件內容-主要欄位-工具列-項目-下拉式選單-群組_開啟的")
        })
    })

    document.querySelectorAll(".文件內容-主要欄位-工具列-項目-下拉式選單").forEach((e) => {
        e.addEventListener("click", (e) => {
            var menu = e.target.closest(".文件內容-主要欄位-工具列-項目-下拉式選單")

            if (e.target.classList.contains("文件內容-主要欄位-工具列-項目-下拉式選單-群組-項目")) {
                let [key, value] = e.target.getAttribute("data-value").split(",")
                document.querySelector("html").setAttribute(`data-${key}`, value)
                menu.querySelectorAll(".文件內容-主要欄位-工具列-項目-下拉式選單-群組-項目").forEach((e) => {
                    e.classList.remove("文件內容-主要欄位-工具列-項目-下拉式選單-群組-項目_啟用的")
                })
                menu.querySelector(".文件內容-主要欄位-工具列-項目-下拉式選單-文字-標籤").innerText = e.target.innerText
                e.target.classList.add("文件內容-主要欄位-工具列-項目-下拉式選單-群組-項目_啟用的")
            } else {
                setTimeout(() => {
                    menu.
                        querySelector(".文件內容-主要欄位-工具列-項目-下拉式選單-群組").
                        classList.add("文件內容-主要欄位-工具列-項目-下拉式選單-群組_開啟的")
                }, 1)
            }


        });
     })

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
