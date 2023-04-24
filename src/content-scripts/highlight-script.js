'use strict';

(async () => {
  // imports
  const DOMParserSrc = chrome.runtime.getURL('src/classes/dom-parser.js');
  const { DOMParser } = await import(DOMParserSrc);

  const parser = new DOMParser(document);

  const textareaList = Array.from(parser.getElementsByTagName('textarea'));

  const handleTextareaChange = (event, textarea) => {
    let divTextarea = document.createElement('div');
    divTextarea.innerHTML = textarea.value;
    divTextarea.setAttribute('contenteditable', 'true');

    for (let i = 0; i < textarea.attributes.length; i++) {
      let attr = textarea.attributes[i];
      if (attr.name !== 'value') {
        divTextarea.setAttribute(attr.name, attr.value);
      }
    }
    divTextarea.style.cssText = textarea.style.cssText;

    textarea.replaceWith(divTextarea);

    const searchText = 'text';
    const textareaValue = event.target.value;
    const highlightedValue = textareaValue.replace(
      new RegExp(searchText, 'gi'),
      '<span style="text-decoration: underline;">$&</span>'
    );

    divTextarea.innerHTML = highlightedValue;

    // Add input event to divTextarea to simulate the behavior of textarea
    divTextarea.addEventListener('input', (event) => {
      textarea.value = divTextarea.innerText;
    });
  };

  // add eventListener for every textarea
  textareaList.forEach((textarea) => {
    textarea.addEventListener('input', (event) =>
      handleTextareaChange(event, textarea)
    );
  });
})();
