function startLevel(){
    document.body.innerHTML = document.body.innerHTML;

    const v19_2 = document.querySelector(".v19_2");
    if (v19_2) {
        v19_2.remove(); // 移除整個 v19_2 元素
    }

    if (Math.random() > 0.5){
        levelData = [data[nowLevel][0]].concat([data[nowLevel][1]]);
    }
    else{
        levelData = [data[nowLevel][1]].concat([data[nowLevel][0]]);
    }

    if (Math.random() > 0.5){
        levelData[0] = [...levelData[0]].reverse();
    }

    if (Math.random() > 0.5){
        levelData[1] = [...levelData[1]].reverse();
    }
    levelData = levelData[0].concat(levelData[1])

    let title = document.querySelector('.v17_7');
    title.textContent = `第 ${nowLevel+1} 關`;

    setGrid();
    click();
    // changeSubmarine();
    // changeNum();
}

function click(){
    let gridItems = document.querySelectorAll('.grid-item'); // 增刪 html 都會重新整理，沒有這一行會抓不到

    // 歸零
    site = []
    banSite.clear();
    subNumberTemp = {4:0, 3:0, 2:0, 1:0};

    gridItems.forEach((item, index) => {
        item.isBanSubmarine = false; // 歸零
        if (item.clickCount == 1){
            site = site.concat(index);

            for (let i = 0; i < 36; i++) {
                if (Math.abs(Math.floor(i / 6) - Math.floor(index / 6)) == 1 && Math.abs(i % 6 - index % 6) == 1){ // i 在 index 的斜角
                    banSite.add(i);
                }
            }
        }
    });

    let judge1 = changeNum(site);
    let judge2 = changeSubmarine(site);
    changeNum2();
    banSite.forEach((value) => gridItems[value].isBanSubmarine = true);

    if (judge1 && judge2){
        document.body.innerHTML += `
            <div class="v19_2">
                <buttom class="v19_6" onclick="randomLevel()"></buttom>
                <buttom class="v19_15" onclick="nextLevel()"></buttom>
                <div class="v19_19"></div>
            </div>`;
    }
}

function changeSubmarine() {
    // 記錄禁止放置潛水艇的位置
    function banSubmarine(Continue) {
        const start = Continue[0];
        const end = Continue[Continue.length - 1];
        const isHorizontal = Continue[1] - start === 1;
    
        if (isHorizontal) { 
            if (start % 6 > 0) banSite.add(start - 1);
            if (end % 6 < 5) banSite.add(end + 1);
        } else { 
            if (start > 5) banSite.add(start - 6);
            if (end < 30) banSite.add(end + 6);
        }
    }

    function drawSubmarine(Continue, isHorizontal){
        const gridContainer = document.querySelector('.grid-item');
        const rect = gridContainer.getBoundingClientRect(); // 獲取 gridItem0 的邊界及座標
        const overlayImage = document.createElement('div');
        const submarineLength = Continue.length


        // 設置 overlay-image 的 class
        overlayImage.classList.add('overlay-image');

        // 設置 CSS 樣式
        overlayImage.style.width = '50px';
        overlayImage.style.height = `${submarineLength * 54 - 4}px`;
        overlayImage.style.backgroundImage = `url('./images/submarine_0${submarineLength}.png')`;

        if (isHorizontal){
            overlayImage.style.top = `${rect.top + Math.floor(Continue[0] / 6) * 54}px`;  // 設置 top 值
            overlayImage.style.left = `${rect.left -4 + Continue[0]%6 * 54 + submarineLength*54 }px`; // 設置 left 值
            overlayImage.style.transform = 'rotate(90deg)'; // 將圖片順時針旋轉 90 度
            overlayImage.style.transformOrigin = 'top left';
        }
        else{
            overlayImage.style.top = `${rect.top + 1 + Math.floor(Continue[0] / 6) * 54}px`;  // 設置 top 值
            overlayImage.style.left = `${rect.left + Continue[0]%6 * 54 }px`; // 設置 left 值
        }

        // 將 overlay-image 插入到 grid-container 的後方
        gridContainer.insertAdjacentElement('afterend', overlayImage);
    }

    function countSubHorizontal(site, noContinue = [], Continue = []){
        if (site.includes(site[0]+1) &&
            site[1] % 6 > site[0] % 6 && // site[1] 在 site[0] 的右邊
            Continue.length < 3) { // 防止潛水艇過大
            Continue = Continue.concat(site[0]);
        }
        else{
            if (Continue.length > 0){
                Continue = Continue.concat(site[0]);
                if (Continue.length == 4) banSubmarine(Continue);
                drawSubmarine(Continue, isHorizontal = true);
                subNumberTemp[Continue.length] += 1;
                Continue = [];                
            }
            else{
                noContinue = noContinue.concat(site[0])
            }
            if (site.length < 2 ){
                return noContinue
            }
        }
        return countSubHorizontal(site.slice(1), noContinue, Continue);      
    }

    function countSubVertical(site, noContinue = [], Continue = []){
        if (site.includes(site[0]+6) &&
            Continue.length < 3) { // 防止潛水艇過大
            Continue = Continue.concat(site[0]);
            site = site.filter(item => item !== site[0]+6); // 將 site[0]+6 移動到列表第二個
            site.splice(1, 0, site[0]+6); // 將 site[0]+6 移動到列表第二個
        }
        else {
            if (Continue.length > 0){
                Continue = Continue.concat(site[0]);
                if (Continue.length == 4) banSubmarine(Continue);
                drawSubmarine(Continue, isHorizontal = false);
                subNumberTemp[Continue.length] += 1;
                Continue = [];
            }
            else{
                noContinue = noContinue.concat(site[0])
            }
            if (site.length < 2 ){
                return noContinue
            }
        }
        return countSubVertical(site.slice(1), noContinue, Continue);
    }

    // 移除舊的大潛水艇
    const overlayImages = document.querySelectorAll('.overlay-image');
    overlayImages.forEach(element => {element.remove();});

    stie = countSubHorizontal(site);
    stie = countSubVertical(stie);
    subNumberTemp[1] = (stie[0] === undefined) ? 0 : stie.length;

    if (Object.values(subNumberTemp).every(value => value === 1)){
        return true;
    }
    else{
        return false;
    }
}

function changeNum() {
    let numberItems = document.querySelectorAll('.number-item');
    let d = levelData.slice();

    site.forEach(element => {    
        d[ Math.floor(element / 6)] -= 1;
        d[ element % 6+6] -= 1;
    });

    for (let i = 0; i < 12; i++) {
        numberItems[i].textContent = d[i];
        
        if (d[i] < 0){
            numberItems[i].style.color = 'red';
        }
        else{
            numberItems[i].style.color = 'black';
        }
    }

    if (d.every(element => element === 0) ) {
        return true;
    }
    else{
        return false;
    }
}

function changeNum2() {
    const subNum = document.querySelectorAll('.v8-common1');

    for (let i = 0; i < 4; i++) {
        subNum[i].textContent = subNumberTemp[4-i]; // 輸出每個元素
        if (subNumberTemp[4-i] > 1){
            subNum[i].style.color = 'red';
        }
        else{
            subNum[i].style.color = 'white';
        }
    }
}

function setGrid() {
    let gridItems = document.querySelectorAll('.grid-item'); // 增刪 html 都會重新整理，沒有這一行會抓不到

    gridItems.forEach((item) => {
        item.clickCount = 0; // 初始化點擊次數為 0
        item.isBanSubmarine = false;
        let lst = ['sea', 'submarine', 'noSubmarine']
        item.classList.remove('sea', 'submarine', 'noSubmarine');
        item.classList.add('sea')

        item.addEventListener('click', () => {
            // 根據點擊次數改變背景
            if (!item.isBanSubmarine || item.clickCount != 0){
                item.clickCount = (item.clickCount + 1) % 2;
            }

            // 清除之前的背景類名
            item.classList.remove('sea', 'submarine', 'noSubmarine');
            item.classList.add(lst[item.clickCount]); // 第一次點擊，設置 sea

            click();
        });
    });
}

function nextLevel() {
    nowLevel = (nowLevel + 1) % 100;
    startLevel();
}

function randomLevel() {
    nowLevel = Math.floor(Math.random() * 100);
    startLevel();
}

function choseLevel() {
    let input = document.querySelector('.v17_48');
    let value = parseInt(input.value, 10); // 取得輸入框中的數字並轉為整數

    if (isNaN(value) || value <= 0 || value > 100) {
        alert(`最高100關 請輸入 1 - 100 的數字`);
        return;
    }

    nowLevel = value -1;
    startLevel();
}

function loadLevelData() {
    return fetch('https://raw.githubusercontent.com/dr-fox/blow-up-submarine/refs/heads/main/levelData.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            // console.error('There was a problem with the fetch operation:', error);
        });
}

let nowLevel = 0;
let subNumberTemp = {4:0, 3:0, 2:0, 1:0};
let site = [] // 目前有潛水艇的格子
let banSite = new Set([]); // 目前被禁止放潛水艇的格子
let data = []; // 一百關卡資料
let levelData = []; // 當前管卡資料

// 調用 loadLevelData 並獲取資料
loadLevelData().then(data_ => {
    data = data_
    startLevel()
});
