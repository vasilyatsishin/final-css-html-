window.addEventListener('DOMContentLoaded', () => {
  "use strict";

  const getPreviewElem = async (elem) => {
    return await document.querySelector(elem).children;
  };

  const tabs = (headerSelector, tabSelector, contentSelector) => {

    const header = document.querySelector(headerSelector),
      content = document.querySelectorAll(contentSelector),
      tab = document.querySelectorAll(tabSelector)

    const hideTab = () => {
      content.forEach(item => item.style.display = 'none');
    };

    const showTab = (i) => {
      content[i].style.display = '';
    };

    hideTab();

    header.addEventListener('click', (e) => {
      const target = e.target;

      tab.forEach((tab, i) => {
        if (target == tab || target.parentNode == tab) {
          hideTab();
          showTab(i);
        }
      })

    });

  };
  tabs('.section-btn__btns', '[data-btn]', '[data-content-item]');

  const inputAreat = (textAreaSelector, previewBoxSelector, btnSaveSelector) => {
    const textarea = document.querySelector(textAreaSelector),
      previewBlock = document.querySelector(previewBoxSelector),
      btnSave = document.querySelector(btnSaveSelector);

    previewBlock.innerHTML = `
    <p data-preview="text">Lorem ipsum dolor sit amet.</p>
    <p data-preview="text">Lorem ipsum dolor sit amet.</p>
    <p data-preview="text">Lorem ipsum dolor sit amet.</p>
    <p data-preview="text">Lorem ipsum dolor sit amet.</p>
    <p data-preview="text">Lorem ipsum dolor sit amet.</p>
    `;

    textarea.value = `
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Lorem ipsum dolor sit amet.</p>
    `;

    btnSave.addEventListener('click', (e) => {
      const target = e.target;

      previewBlock.innerHTML = textarea.value;

      for (let i = 0; i < previewBlock.children.length; i++) {
        previewBlock.children[i].setAttribute('data-preview', 'text');
      }

      target.closest('.box-editor__text').style.display = 'none';
    });

  };
  inputAreat('textarea', '.box-preview', '[data-save]');

  const fontSize = (radioSelector) => {
    const radio = document.querySelectorAll(radioSelector);

    radio.forEach(radio => {
      if (radio.getAttribute('data-size') === '16px') {
        radio.checked = true;
      }

      radio.addEventListener('click', (e) => {
        getPreviewElem('.box-preview').then(res => {
          for (let i = 0; i < res.length; i++) {
            res[i].style.fontSize = e.target.getAttribute('data-size');
          }
        });
      });

    })

  }
  fontSize('.style-group__radio [data-size]');

  const fontFamily = (selectSelector) => {
    const select = document.querySelector(selectSelector);
    const options = select.children;

    select.addEventListener('change', (e) => {
      const target = e.target;

      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          document.querySelector('.box-preview').style.fontFamily = target.value;
          document.querySelector('.box-preview').style.fontStyle = '';
        }
        if (options[i].value == 'italic') {
          document.querySelector('.box-preview').style.fontStyle = target.value;
        }
      }

    });

  };
  fontFamily('[data-family]')

  const fontStyle = (checkboxSelector) => {
    const checkboxs = document.querySelectorAll(checkboxSelector);

    checkboxs.forEach(checkbox => {
      checkbox.addEventListener('click', (e) => {
        const target = e.target;

        if (target.value === 'bold' && target.checked === false) {
          getPreviewElem('.box-preview').then(res => {
            for (let i = 0; i < res.length; i++) {
              res[i].style.fontWeight = '';
            }
          });
        } else {
          getPreviewElem('.box-preview').then(res => {
            for (let i = 0; i < res.length; i++) {
              res[i].style.fontWeight = target.value;
            }
          });
        }

        if (target.value === 'italic' && target.checked === false) {
          getPreviewElem('.box-preview').then(res => {
            for (let i = 0; i < res.length; i++) {
              res[i].style.fontStyle = '';
            }
          });
        } else {
          getPreviewElem('.box-preview').then(res => {
            for (let i = 0; i < res.length; i++) {
              res[i].style.fontStyle = target.value;
            }
          });
        }

      });
    });

  };
  fontStyle('.style-group__checkbox [data-style-text]');

  tabs('.style-group__btns', '.style-group__btns button', '.color-box');

  const colorBox = (boxSelector) => {
    const box = document.querySelectorAll(boxSelector);

    box.forEach(box => {
      box.style.background = box.getAttribute('data-color');
    });
  }
  colorBox('.box-color-text-wrapper .colors');
  colorBox('.box-bgColor-wrapper .colors');

  const styleColorText = (boxSelector) => {
    const box = document.querySelectorAll(boxSelector);

    box.forEach(box => {
      box.addEventListener('click', (e) => {
        getPreviewElem('.box-preview').then(res => {
          for (let i = 0; i < res.length; i++) {
            res[i].style.color = e.target.getAttribute('data-color');
          }
        });
      });
    });
  };
  styleColorText('.box-color-text-wrapper .colors');

  const styleColorBg = (boxSelector) => {
    const box = document.querySelectorAll(boxSelector);

    box.forEach(box => {
      box.addEventListener('click', (e) => {
        document.querySelector('.box-preview').style.background = e.target.getAttribute('data-color');
      });
    });
  };
  styleColorBg('.box-bgColor-wrapper .colors');

  let getE = (x) => document.querySelector(x);

  getE('#red-btn').addEventListener('click', function () {
    getE('.section-top').style.display = 'none';
    getE('.section-btn').style.display = 'none';
    getE('.section-bottom').style.display = 'none';
    getE('.section-radio-block').style.display = 'flex';
  });

  let f1 = document.forms['f1'];
  f1['table'].addEventListener('click', function () {
    getE('.block-table').style.display = 'flex';
    getE('.block-list').style.display = 'none';
    f1['list'].checked = false;
    f1['table'].checked;
  });

  f1['list'].addEventListener('click', function () {
    getE('.block-list').style.display = 'flex';
    getE('.block-table').style.display = 'none';
    f1['table'].checked = false;
    f1['list'].checked;
  });

  // let tableTR = getE('#tr').value;
  // console.log(tableTR);

  getE('#createTable').addEventListener('click', function () {
    let tableTR = document.querySelector('#tr').value;
    let tableTD = document.querySelector('#td').value;
    let widthTD = document.querySelector('#wtd').value;
    let heightTD = document.querySelector('#htd').value;
    let WidthOfBorder = document.querySelector('#width').value;
    let TypeOfBorder = document.querySelector('.form-selectt').value;
    let ColorOfBorder = document.querySelector('.form-selecttt').value;

    getE('.section-radio-block').style.display = 'none';
    getE('.section-top').style.display = 'flex';
    getE('.section-btn').style.display = 'flex';
    getE('.section-bottom').style.display = 'flex';

    function tableCreate() {
      const bodyteaxt = document.querySelector('.box-preview'),
        tbl = document.createElement('table');
      tbl.style.border = `${WidthOfBorder}px ${TypeOfBorder} ${ColorOfBorder}`;
      for (let i = 0; i < tableTR; i++) {
        const tr = tbl.insertRow();
        for (let j = 0; j < tableTD; j++) {
          const td = tr.insertCell();
          td.appendChild(document.createTextNode('TD'));
          td.style.width = `${widthTD}px`;
          td.style.height = `${heightTD}px`;
          td.style.border = `${WidthOfBorder}px ${TypeOfBorder} ${ColorOfBorder}`;
        }
      }
      bodyteaxt.append(tbl);
      const divka = document.createElement('div');
      divka.append(tbl)
      getE(".box-editor__textarea").value = getE(".box-editor__textarea").value + divka.innerHTML
    }
    tableCreate();
  });

  getE('#createList').addEventListener('click', function () {
    getE('.section-radio-block').style.display = 'none';
    getE('.section-top').style.display = 'flex';
    getE('.section-btn').style.display = 'flex';
    getE('.section-bottom').style.display = 'flex';

    let markType = document.querySelector("#type").value
    let liCount = document.querySelector("#li");
    function list() {
        let list = document.createElement("ul");
        for (let i = 0; i < liCount.value; i++) {
            let li = document.createElement("li");
            li.innerHTML = "li"
            list.style.listStyleType = markType;
            list.append(li)
        }
        let flexTema = document.createElement("div")
        getE("#textarea1").append(flexTema)
        flexTema.append(list)
        getE("#textarea1").append(list.innerHTML); 
        list.append(li)
        getE("#textarea1").value = getE("#textarea1").value + flexTema.innerHTML
    }

    list()

  });
});