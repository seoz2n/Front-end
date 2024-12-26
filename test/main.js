// main.js
document.addEventListener("DOMContentLoaded", () => {
    // 버튼 및 페이지 요소 가져오기
    const forHereBtn = document.getElementById("ForHere_btn");
    const toGoBtn = document.getElementById("ToGo_btn");
    const homePage = document.getElementById("main_page");
    const selectMenuPage = document.getElementById("select_menu_page");

    // 초기 상태: select_menu_page 숨기기
    selectMenuPage.style.display = "none";

    // ForHere 버튼 클릭 이벤트
    forHereBtn.addEventListener("click", () => {
        homePage.style.display = "none"; // home 숨기기
        selectMenuPage.style.display = "block"; // select_menu_page 표시
    });

    // ToGo 버튼 클릭 이벤트
    toGoBtn.addEventListener("click", () => {
        homePage.style.display = "none"; // home 숨기기
        selectMenuPage.style.display = "block"; // select_menu_page 표시
    });

    // Back to Home 버튼 추가
    const backToHomeBtn = document.createElement("button");
    backToHomeBtn.id = "back_to_home_btn";
    backToHomeBtn.textContent = "Back to Home";
    selectMenuPage.appendChild(backToHomeBtn);

    // Back to Home 버튼 클릭 이벤트
    backToHomeBtn.addEventListener("click", () => {
        selectMenuPage.style.display = "none"; // select_menu_page 숨기기
        homePage.style.display = "block"; // home 표시
    });
});
