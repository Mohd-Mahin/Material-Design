const getTextArea = document.getElementById("select_campaign_test");
const getData = document.getElementsByClassName('header_nav');
const getBackButton = document.getElementById('back_btn');
const styleForNextChildFirst = "background:#00BCD4;transition: all 1s cubic-bezier(0.23, 1, 0.32, 1) .2s;";
const styleForNextChildSecond = "color: rgba(0, 0, 0, 0.87); font-weight: 500;transition: all 1s cubic-bezier(0.23, 1, 0.32, 1) .1s;";
let elements = document.querySelectorAll('.enable_ripple');
let dropDownMenu = document.querySelectorAll('.enable_ripple_dropdown');
let getRippleDropDownlistEffect = document.querySelectorAll('.ripple_dropdown_list');
let dropdownItem = document.getElementsByClassName("dropdown_menu")[0];
let numData = 0;
let store = "";
let ctr = 0;
let rippleElement;
let currentEl = null;
let rippleEl = null;
let max= null;

changeContentHelperFunction = (textContent) => {
  getTextArea.innerHTML = textContent;
  getData[numData + 1].children[0].setAttribute("style", styleForNextChildFirst);
  getData[numData].children[0].innerHTML = '&#x2714';
  getData[numData + 1].children[1].setAttribute("style", styleForNextChildSecond);
}

changeContent = (event) => {
    let textWrapper = '';
    if (numData == 0) {
        textWrapper = "Ad group status is different than the statuses for campaigns, ads, and keywords, though the statuses can affect each other. Ad groups are contained within a campaign, and each campaign can have one";
        getBackButton.disabled = false;
        changeContentHelperFunction(textWrapper);
        getBackButton.style.color = 'black';
        numData++;    
    } else if (numData == 1) {
        textWrapper = "Within each ad group are ads, keywords, and bids.Something something whatever cool, Ad group status is different than the statuses for campaigns, ads, and keywords."
        changeContentHelperFunction(textWrapper);
        numData++;
        event.innerHTML = "Finish";
    } else if (numData == 2) {
        document.getElementById('hidden_item').style.display = "initial";
        getTextArea.style.display ='none';
        getData[numData].children[0].innerHTML = '&#x2714';
        document.getElementsByClassName('button_group')[0].style.display = 'none';
    }
}

moveBackHelperFunction = (backTextContent, numberValue) => {
  getTextArea.innerHTML = backTextContent;
  getData[numData].children[0].setAttribute("style", "background: #9E9E9E;transition: all 1s cubic-bezier(0.23, 1, 0.32, 1) 0.2s;");
  getData[numData].children[1].setAttribute("style", "color: rgba(0, 0, 0, 0.87); font-weight: 500;transition: all 1s cubic-bezier(0.23, 1, 0.32, 1) .1s;");
  numData--;
  getData[numData].children[0].innerHTML = numberValue;
}

moveBack = () => {
    let textContent = "";
    if (numData == 2) {
        textContent = "Ad group status is different than the statuses for campaigns, ads, and keywords, though the statuses can affect each other. Ad groups are contained within a campaign, and each campaign can have one";
        document.querySelector(".button_group").children[1].innerHTML = "Next";
        moveBackHelperFunction(textContent, '2');
    } else if (numData == 1) {  
        getBackButton.disabled = true;
        getBackButton.style.color = '#B2B2B2';
        textContent = "Select campaign settings. Campaign settings can include your budget, network, bidding options and adjustments, location targeting, campaign end date, and other settings that affect an entire.";  
        moveBackHelperFunction(textContent, '1');
    }
}

openNeverDropdownHelperFunction = (styleValue) => {
    dropdownItem.setAttribute("style", styleValue);
    document.getElementById('dropdown_menu').style.height = 200 + 'px';
}

openNeverDropdown = (event) => {
  let styleValues = '';
  document.getElementById('dropdown_menu').style.height = 0;
  setTimeout(() => {
      if (event.id == 1) {
          styleValues = 'display: block; bottom: 234px; transition: all .7s';
          openNeverDropdownHelperFunction(styleValues);
      } else if (event.id == 2) {
          ctr = 0;
          return false;
      } else if (event.id == 3) {
          styleValues = 'display: block; bottom: 124px; transition: all .7s';
          openNeverDropdownHelperFunction(styleValues);
      } else if (event.id == 4) {
          styleValues = 'display: block; bottom: 70px; transition: all .7s';
          openNeverDropdownHelperFunction(styleValues);
      }     
  }, 400);
    ctr = 1;   
}

remove_list = () => {       
    if (ctr == 2) {
        setTimeout( function() {
            dropdownItem.style.display = 'none';
        },1000);
    } else {
        ctr++;
    }
}

Array.prototype.forEach.call(dropDownMenu, function(button) {
    button.addEventListener('click', rippleEffectDropdown)
});

Array.prototype.forEach.call(elements, function(button) {
    button.addEventListener('click', ripple);
});

Array.prototype.forEach.call(getRippleDropDownlistEffect, function(btn) {
    btn.addEventListener('click', rippleDropdownListEffect);
});

rippleHelperFunction = (addClassName) => {
    if(!rippleEl) {
        rippleEl = document.createElement('span');
    }
    currentEl.appendChild(rippleEl);
    max = Math.max(currentEl.offsetWidth, currentEl.offsetHeight);
    rippleEl.style.width = rippleEl.style.height = max + 'px';
    rippleEl.classList.add(addClassName);
}

function ripple(event) {
    currentEl = event.currentTarget;
    rippleEl = document.querySelector('span.ripple');    
    rippleHelperFunction('ripple');
    rippleEl.style.top = (max/5) +'px';
};

function rippleEffectDropdown(rippleEvent) {
    currentEl = rippleEvent.currentTarget;
    rippleEl = document.querySelector('span.rippleEffectDropdown');
    rippleHelperFunction('rippleEffectDropdown');
    let rect = currentEl.getBoundingClientRect();
    rippleEl.style.left = event.clientX - rect.left - (max/1.5) + 'px';
    rippleEl.style.top = event.clientY - rect.top - (max/1.5) + 'px';
    openNeverDropdownHelperFunction("display: block; bottom: 100px; transition: all .4s")
};

function rippleDropdownListEffect(passEvent) {
    currentEl = event.currentTarget;
    rippleEl = document.querySelector('span.dropdownListRippleEffect');
    rippleHelperFunction('dropdownListRippleEffect');
    rippleEl.style.top = (max/5) +'px';
    setTimeout(function() {
        rippleEl.classList.remove('dropdownListRippleEffect');
      }, 1100
    );  
} 