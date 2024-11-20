const inputArea = document.querySelector('#input-area');
const outputArea = document.querySelector('#output-area');

inputArea.value = "研究表明，汉字顺序并不一定影响阅读。";
outputArea.value = reorder(inputArea.value);

inputArea.addEventListener('input', () => {
    outputArea.value = reorder(inputArea.value);

})

function reorder(text) {
    // 匹配标点符号和空格字符
    const regex = /[\p{P}\s]/u;
    let textArr = text.split('');

    let stringArr = [];
    let temp = "";
    // 将字符串按照标点符号的位置分割成多段
    textArr.forEach(char => {
        temp += char;
        if(regex.test(char)) {
            stringArr.push(temp);
            temp = "";
        }
    })
    stringArr.push(temp);

    let buffer = "";
    for (let i = 0; i < stringArr.length; i++) {
        const str = stringArr[i];
        // 如果内容较短或者是标点符号则不必乱序，以免造成阅读困难。
        if (str.length < 3) {
            buffer += str;
            continue;
        }
        // 将内容打乱
        let charArr = str.split("");
        for (let j = 0; j < charArr.length; j++) {
            if (j % 3 === 0) {
                let swap = charArr[j - 1];
                charArr[j - 1] = charArr[j - 2];
                charArr[j - 2] = swap;
            }
        }
        buffer += charArr.join("");
    }
    return buffer;
}
