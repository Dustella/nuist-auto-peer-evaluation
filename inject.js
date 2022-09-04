// ==UserScript==
// @name         南信带同学互评自动填写
// @version      1.0.0
// @author       特菈 Dustella
// @description  南信带同学互评自动填写，支持随机数
// @match        https://client.vpn.nuist.edu.cn/http/*
// @match        http://stu.nuist.edu.cn/*
// @grant        window.onurlchange
// @grant        unsafeWindow
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://github.com/XIU2/UserScript
// @supportURL   https://github.com/XIU2/UserScript
// @homepageURL  https://github.com/XIU2/UserScript
// ==/UserScript==

(() => {
  const getLabelElements = () =>
    document
      .querySelector("#r_3_3")
      .contentWindow.document.querySelector("#MyDataGrid").firstElementChild;

  const genValue = (min, max) => () =>
    min === max
      ? min
      : Math.round(Math.random() * (max - min) * 10 + min * 10) / 10;

  const fillValue = (form, genValue) => {
    for (const row of form.children) {
      let cnt = 0;
      for (const { firstElementChild: item } of row.children) {
        try {
          item.value = ++cnt === 8 ? genValue() - 1 : genValue();
        } catch {}
      }
    }
  };

  const toggleHelper = () => {
    document
      .querySelector("#r_3_3")
      .insertAdjacentHTML(
        "beforebegin",
        `<div class="toggle-helper">生成随机数并填写<input type="text" class="innum" /><input type="text" class="innum" /><button id='laing'>一键填写</button></div>`
      );
    document.querySelector("#laing").addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const [{ value: min }, { value: max }] =
        document.getElementsByClassName("innum");
      const table = getLabelElements();
      fillValue(table, genValue(min, max));
    });
  };
  toggleHelper();
})();
