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

    // // 将字符串按照标点符号的位置分割成多段
    let strArr = [];
    (function split(text) {
        let index = text.search(regex);
        if (index === -1) {
            strArr.push(text);
        } else {
            let extract = text.substring(0, index + 1);
            strArr.push(extract);
            let restStr = text.substring(index + 1);
            split(restStr);
        }
    })(text)


    let result = "";
    for (let i = 0; i < strArr.length; i++) {
        let str = strArr[i];
        // 如果内容较短或者是标点符号则不必乱序，以免造成阅读困难。
        if (str.length < 3) {
            result += str;
            continue;
        }
        // 将内容打乱
        for (let j = 1; j < str.length; j++) {
            if (j % 3 === 0) {
                let swap = str[j - 1];
                str = str.replace(swap, str[j - 2]);
                str = str.replace(str[j - 2], swap);
            }
        }
        result += str;
    }
    return result;
}
