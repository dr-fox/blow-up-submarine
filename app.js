function changeNum(site) {
    let d = data1.slice();
    let nowSubmarineLocation = [0,0,0,0,0,0,0,0,0,0,0,0];
    // console.log(site)
    // console.log('changeNum', d)

    // console.log('changeNum', site)
    site.forEach(element => {
        let j = Math.floor(element / 6); // 整數商
        let k = element % 6;             // 餘數
    
        nowSubmarineLocation[j]   += 1;
        nowSubmarineLocation[k+6] += 1;
    });
    // console.log('changeNum', nowSubmarineLocation)
    let numberItems = document.querySelectorAll('.number-item');
    for (let i = 0; i < 12; i++) {
        d[i] = d[i] - nowSubmarineLocation[i];
        numberItems[i].textContent = d[i];
        
        if (d[i] < 0){
            // console.log(102)
            numberItems[i].style.color = 'red';
        }
        else{
            // console.log(103)
            numberItems[i].style.color = 'black';
        }
    }

    // 檢查 d 陣列中的所有元素是否都為 0
    if (d.every(element => element === 0)) {
        // console.log('恭喜過關');

        // <buttom class="v19_15 onclick="removeCongratulation"></buttom>

        document.body.innerHTML += `
            <div class="v19_2">
                <buttom class="v19_6" onclick="randomLevel()"></buttom>
                <buttom class="v19_15" onclick="nextLevel()"></buttom>
                <div class="v19_19"></div>
            </div>`;
    }
}

function nextLevel(){
    document.body.innerHTML = document.body.innerHTML;
    // console.log('removeCongratulation -> 進入');
    const v19_2 = document.querySelector(".v19_2");
    if (v19_2) {
        // console.log('removeCongratulation -> v19_2');
        v19_2.remove(); // 移除整個 v19_2 元素
    }

    changeSubmarine([]);
    nowLevel = (nowLevel + 1) % totalLevel;

    let title = document.querySelector('.v17_7');
    title.textContent = `第 ${nowLevel+1} 關`;
   
    if (Math.random() > 0.5){
        data1 = [data[nowLevel][0]].concat([data[nowLevel][1]]);
        }
        else{
            data1 = [data[nowLevel][1]].concat([data[nowLevel][0]]);
        }

    if (Math.random() > 0.5){
        data1[0] = [...data1[0]].reverse();
    }

    if (Math.random() > 0.5){
        data1[1] = [...data1[1]].reverse();
    }
    data1 = data1[0].concat(data1[1])
    // console.log('nextLevel', data1)
    setGrid();
    const overlayImages = document.querySelectorAll('.overlay-image');
    overlayImages.forEach(element => {
        element.remove();
    });
    setNumber(data1);
}

function randomLevel() {
    document.body.innerHTML = document.body.innerHTML;
    // console.log('randomLevel -> 進入');
    const v19_2 = document.querySelector(".v19_2");
    if (v19_2) {
        // console.log('removeCongratulation -> v19_2');
        v19_2.remove(); // 移除整個 v19_2 元素
    }

    changeSubmarine([]);
    nowLevel = Math.floor(Math.random() * totalLevel);
    // console.log('randomLevel ->', nowLevel)

    let title = document.querySelector('.v17_7');
    title.textContent = `第 ${nowLevel+1} 關`;
    
    if (Math.random() > 0.5){
        data1 = [data[nowLevel][0]].concat([data[nowLevel][1]]);
        }
        else{
            data1 = [data[nowLevel][1]].concat([data[nowLevel][0]]);
        }

    if (Math.random() > 0.5){
        data1[0] = [...data1[0]].reverse();
    }

    if (Math.random() > 0.5){
        data1[1] = [...data1[1]].reverse();
    }
    data1 = data1[0].concat(data1[1])
    // console.log('nextLevel', data1)
    setGrid();
    const overlayImages = document.querySelectorAll('.overlay-image');
    overlayImages.forEach(element => {
        element.remove();
    });
    setNumber(data1);
}

function choseLevel() {
    
    // console.log('choseLevel -> 進入');
    let input = document.querySelector('.v17_48');

    // console.log(input.tagName);
    // console.log(input);
    // console.log(input.value);
    let value = parseInt(input.value, 10); // 取得輸入框中的數字並轉為整數

    console.log(value);

    changeSubmarine([]);
    // 檢查輸入是否在 1 到 totalLevel 範圍內
    if (isNaN(value) || value <= 0 || value > totalLevel) {
        alert(`最高${totalLevel}關，請輸入 1 - ${totalLevel}的數字`);
        return;
    } else {
        // console.log('選擇的關卡數：', value);
    }

    nowLevel = value -1;
    // console.log('choseLevel ->', nowLevel)

    let title = document.querySelector('.v17_7');
    title.textContent = `第 ${nowLevel+1} 關`;
    
    if (Math.random() > 0.5){
        data1 = [data[nowLevel][0]].concat([data[nowLevel][1]]);
        }
        else{
            data1 = [data[nowLevel][1]].concat([data[nowLevel][0]]);
        }

    if (Math.random() > 0.5){
        data1[0] = [...data1[0]].reverse();
    }

    if (Math.random() > 0.5){
        data1[1] = [...data1[1]].reverse();
    }
    data1 = data1[0].concat(data1[1])
    // console.log('nextLevel', data1)
    document.body.innerHTML = document.body.innerHTML;
    setGrid();
    const overlayImages = document.querySelectorAll('.overlay-image');
    overlayImages.forEach(element => {
        element.remove();
    });
    setNumber(data1);
}

function setGrid() {
    let gridItems = document.querySelectorAll('.grid-item');
    // console.log('setGrid', gridItems)
    // 為每個格子初始化點擊次數
    gridItems.forEach((item, index) => {
        item.clickCount = 0; // 初始化點擊次數為 0
        item.isBanSubmarine = false;
        let lst = ['sea', 'submarine', 'noSubmarine']
        item.classList.remove('sea', 'submarine', 'noSubmarine');
        item.classList.add(lst[0])

        item.addEventListener('click', () => {
            // 根據點擊次數改變背景
            // console.log('點擊1次')
            item.clickCount = (item.clickCount + 1) % 2; // 點擊次數在 0, 1, 2 之間循環

            if (item.isBanSubmarine && item.clickCount == 1){
                item.clickCount = (item.clickCount + 1) % 2;
            }

            // 清除之前的背景類名
            item.classList.remove('sea', 'submarine', 'noSubmarine');
            item.classList.add(lst[item.clickCount]); // 第一次點擊，設置 sea

            let site = []
            gridItems.forEach((item, index) => {
                if (item.clickCount == 1){
                    site = site.concat(index);
                }
            });

            // console.log('setGrid -> click', site)
            changeNum(site);
            changeSubmarine(site);
        });
    });
}

function resetGrid() {
    let gridItems = document.querySelectorAll('.grid-item');

    gridItems.forEach((item, index) => {
        item.clickCount = 0; // 初始化點擊次數為 0
        item.isBanSubmarine = false;
        item.classList.remove('sea', 'submarine', 'noSubmarine');
        item.classList.add('sea')
    });
    
    let site = []
    changeNum(site);
    changeSubmarine(site);
}

function setNumber(data) {
    let numberItems = document.querySelectorAll('.number-item');
    // 為每個數字初始化數字
    for (let i = 0; i < 12; i++) {
        numberItems[i].textContent = data[i]
    }
}

function changeSubmarine(site) {
    // 記錄禁止放置潛水艇的位置
    function banSubmarine (Continue){
        const banSite_ = new Set([]);

        Continue.forEach((element) => {
            for (let i = 0; i < 36; i++) {
                if (Math.abs(Math.floor(i / 6) - Math.floor(element / 6)) < 2 && Math.abs(i % 6 - element % 6) < 2){ // i 在 element 的九宮格內
                    banSite_.add(i);
                }
            }
        });
        if (Continue.length < 4){
            if (Continue[1] - Continue[0] == 1){ //橫的
                // console.log(banSite_);
                banSite_.delete(Continue[0]-1);
                banSite_.delete(Continue[Continue.length-1]+1);
                // console.log(banSite_);
            }
            else{ //直的
                banSite_.delete(Continue[0]-6);
                banSite_.delete(Continue[Continue.length-1]+6);
            }
        }
        
        // console.log(banSite_);
        banSite_.forEach((value) => banSite.add(value)); // 加入 banSite
        // console.log(banSite);
    }

    function drawSubmarineHorizontal(Continue){
        let submarineLength = Continue.length
        // 選取 grid-container 元素
        const gridContainer = document.querySelector('.grid-item');

        // 創建 overlay-image 元素
        const overlayImage = document.createElement('div');

        // 設置 overlay-image 的 class
        overlayImage.classList.add('overlay-image');

        // 設置 CSS 樣式
        overlayImage.style.width = '50px';
        overlayImage.style.height = `${submarineLength * 54 - 4}px`;
        overlayImage.style.top = `${rect.top + 1 + Math.floor(Continue[0] / 6) * 54}px`;  // 設置 top 值
        overlayImage.style.left = `${rect.left -3 + Continue[0]%6 * 54 + submarineLength*54 }px`; // 設置 left 值
        // overlayImage.style.top = `${rect.top}px`;  // 設置 top 值
        // overlayImage.style.left = `${rect.left}px`; // 設置 left 值
        overlayImage.style.backgroundImage = `url('./images/submarine_0${submarineLength}.png')`;
        overlayImage.style.transform = 'rotate(90deg)'; // 將圖片順時針旋轉 90 度
        overlayImage.style.transformOrigin = 'top left';

        // 將 overlay-image 插入到 grid-container 的後方
        gridContainer.insertAdjacentElement('afterend', overlayImage);
    }

    function drawSubmarineVertical(Continue){
        let submarineLength = Continue.length
        // 選取 grid-container 元素
        const gridContainer = document.querySelector('.grid-item');

        // 創建 overlay-image 元素
        const overlayImage = document.createElement('div');

        // 設置 overlay-image 的 class
        overlayImage.classList.add('overlay-image');

        // 設置 CSS 樣式
        overlayImage.style.width = '50px';
        overlayImage.style.height = `${submarineLength * 54 - 4}px`;
        overlayImage.style.top = `${rect.top + 1 + Math.floor(Continue[0] / 6) * 54}px`;  // 設置 top 值
        overlayImage.style.left = `${rect.left + Continue[0]%6 * 54 }px`; // 設置 left 值
        overlayImage.style.backgroundImage = `url('./images/submarine_0${submarineLength}.png')`;

        // 將 overlay-image 插入到 grid-container 的後方
        gridContainer.insertAdjacentElement('afterend', overlayImage);
    }

    function countSubHorizontal(site, noContinue = [], Continue = []){
        if (site[1] !== undefined &&
            site[1] - site[0] == 1 && // 兩個位置相差 1
            site[1] % 6 > site[0] % 6 && // site[1] 在 site[0] 的右邊
            Continue.length < 3) { // 防止潛水艇過大
            Continue = Continue.concat(site[0]);
            // console.log(Continue)
        }
        else{
            // console.log(101)
            if (Continue.length > 0){
                Continue = Continue.concat(site[0]);
                // console.log(Continue)
                // 畫出潛水艇
                banSubmarine (Continue)
                drawSubmarineHorizontal(Continue)
                subNumberTemp[Continue.length] += 1
                Continue = []
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
                    banSubmarine(Continue);
                    drawSubmarineVertical(Continue);
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

    // 找橫排
    // console.log(site.length);
    // 移除舊的大潛水艇
    let gridItems = document.querySelectorAll('.grid-item');
    const rect = gridItems[0].getBoundingClientRect(); // 獲取 gridItem0 的邊界及座標
    banSite.clear();
    // console.log(gridItems)
    // console.log(gridItems[0])
    // console.log(gridItems[0].getBoundingClientRect())
    // console.log(rect.left, rect.top)
    const overlayImages = document.querySelectorAll('.overlay-image');
    overlayImages.forEach(element => {
        element.remove();
    });

    let subNumberTemp = { ...subNumber };

    stie = countSubHorizontal(site);
    stie = countSubVertical(stie);
    // console.log(stie);

    subNumberTemp[1] = (stie[0] === undefined) ? 0 : stie.length;
    // console.log(subNumberTemp);

    // 更改圖示文字
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
    for (let i = 0; i < 36; i++) {
        gridItems[i].isBanSubmarine = false;
    }
    banSite.forEach((value) => gridItems[value].isBanSubmarine = true); // 加入 banSite
    console.log(banSite);
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

const gridItems = document.querySelectorAll('.grid-item');
const numberItems = document.querySelectorAll('.number-item');
let nowLevel = 0;
let totalLevel = 100;
let subNumber = {4:0, 3:0, 2:0, 1:0};
let banSite = new Set([]);
let data = [];
let data1 = [];

// 調用 loadLevelData 並獲取資料
loadLevelData().then(data_ => {
    data = data_

    if (Math.random() > 0.5){
        data1 = [data[0][0]].concat([data[0][1]]);
        }
        else{
            data1 = [data[0][1]].concat([data[0][0]]);
        }

    if (Math.random() > 0.5){
        data1[0] = [...data1[0]].reverse();
    }

    if (Math.random() > 0.5){
        data1[1] = [...data1[1]].reverse();
    }
    data1 = data1[0].concat(data1[1])

    setGrid();
    setNumber(data1);
    const imageUrls = [
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/sea.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/submarine_01.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/noSubmarine.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/submarine_02.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/submarine_03.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/submarine_04.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/img_001.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/img_002.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/img_003.png?raw=true',
        'https://github.com/dr-fox/blow-up-submarine/blob/main/images/img_004.png?raw=true',
        "https://github.com/dr-fox/blow-up-submarine/blob/main/images/v19_6.png?raw=true",
        "https://github.com/dr-fox/blow-up-submarine/blob/main/images/v19_15.png?raw=true",
        "https://github.com/dr-fox/blow-up-submarine/blob/main/images/v19_19.png?raw=true"
    ];
    imageUrls.forEach(url => preloadImage(url));

    function preloadImage(url) {
        const img = new Image();
        img.src = url;
    }
});
// const button = document.querySelector(".v17_37");
// button.setAttribute("onclick", "randomLevel()");

let title = document.querySelector('.v17_7');
title.textContent = `第 ${nowLevel+1} 關`;
