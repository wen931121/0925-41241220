const riceImageCount = 8; // 飯糰圖片數量 (背面為 rice2 到 rice9)
const animalImageCount = 8; // 動物背面圖片數量（animal2 到 animal9）
let isRiceGame = true; // 初始遊戲為飯糰卡片
const imageContainer = document.getElementById('imageContainer');

// 創建一個牌組
let deck = [];

// 生成牌組的函數
function createDeck(isRice) {
    deck = [];
    const frontImage = isRice ? 'images/rice1.png' : 'images/animal1.png'; // 根據遊戲類型選擇正面圖片
    const backImageCount = isRice ? riceImageCount : animalImageCount; // 根據遊戲類型確定背面數量

    for (let i = 1; i <= backImageCount; i++) {
        // 飯糰的背面是 rice2 到 rice9
        // 動物的正面是 animal1，背面是 animal2 到 animal9
        const backImage = isRice ? `images/rice${i + 1}.png` : `images/animal${i + 1}.png`; // 飯糰卡片的背面從 rice2 開始
        deck.push({ front: frontImage, back: backImage }); // 第一組
        deck.push({ front: frontImage, back: backImage }); // 第二組
    }

    // 打亂牌組
    shuffle(deck);

    // 清空現有的圖片
    imageContainer.innerHTML = '';

    // 動態生成打亂後的圖片結構
    deck.forEach((card, index) => {
        const flipContainer = document.createElement('div');
        flipContainer.classList.add('flip-container');
        flipContainer.id = `flip${index}`;

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        const front = document.createElement('div');
        front.classList.add('front');
        const frontImg = document.createElement('img');
        frontImg.src = card.front;
        frontImg.alt = `Image Front`;
        front.appendChild(frontImg);

        const back = document.createElement('div');
        back.classList.add('back');
        const backImg = document.createElement('img');
        backImg.src = card.back;
        backImg.alt = `Image Back`;
        back.appendChild(backImg);

        flipper.appendChild(front);
        flipper.appendChild(back);
        flipContainer.appendChild(flipper);
        imageContainer.appendChild(flipContainer);

        flipContainer.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

// 初始生成飯糰牌組
createDeck(isRiceGame);

// 按鈕事件：全部翻到正面
document.getElementById('flipAllToFront').addEventListener('click', () => {
    document.querySelectorAll('.flip-container').forEach(container => {
        container.classList.remove('flipped');
    });
});

// 按鈕事件：全部翻到反面
document.getElementById('flipAllToBack').addEventListener('click', () => {
    document.querySelectorAll('.flip-container').forEach(container => {
        container.classList.add('flipped');
    });
});

// "開始"按鈕邏輯
document.getElementById('startGame').addEventListener('click', () => {
    document.querySelectorAll('.flip-container').forEach(container => {
        container.classList.add('flipped');
    });
    setTimeout(() => {
        document.querySelectorAll('.flip-container').forEach(container => {
            container.classList.remove('flipped');
        });
    }, 10000);
});

// 切換遊戲的邏輯
document.getElementById('toggleGame').addEventListener('click', () => {
    isRiceGame = !isRiceGame; // 切換遊戲狀態
    createDeck(isRiceGame); // 重新生成牌組
    const buttonText = isRiceGame ? '切換到動物卡片' : '切換到飯糰卡片';
    document.getElementById('toggleGame').innerText = buttonText; // 更新按鈕文本
});

// 洗牌函數
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // 交換元素
    }
}
