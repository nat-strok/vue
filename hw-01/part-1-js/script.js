const tabs = document.querySelector('.tabs');
const navBtns = tabs.querySelector('.tabs-nav');
const styleBtns = tabs.querySelector('.tabs-style');
const tabsContent = tabs.querySelector('.tabs-content');
const itemTemplate = document.querySelector('#itemTemplate').innerHTML;
const content = [
    ['Content 1', 'Content 1...2', 'Content 1...3', 'Content 1...4'],
    ['Content 2', 'Content 2...2', 'Content 2...3', 'Content 2...4', 'Content 2...5'],
    ['Content 3', 'Content 3...2', 'Content 3...3']
];

function collectText(arr) {
    arr.forEach(el => {
        let html = itemTemplate.replace('{{text}}', el);
        tabsContent.insertAdjacentHTML('beforeend', html);
    });
}

function isActive(el) {
    return el.classList.contains('active-btn');
}

function getAllBtns(el) {
    return Array.from(el.parentNode.querySelectorAll('.tabs-btn'));
}

function changeActiveBtn(el) {
    getAllBtns(el).forEach(el => el.classList.remove('active-btn'));
    el.classList.add('active-btn');
}

function changeTab(e) {
    const el = e.target;
    const allBtns = Array.from(el.parentNode.querySelectorAll('.tabs-btn'));
    if (!isActive(el)) {
        for (let i = 0; i < allBtns.length; i++) {
            if (el === allBtns[i]) {
                tabsContent.innerHTML = '';
                collectText(content[i]);
                changeActiveBtn(el);
                el.classList.add('active-btn');
                break;
            }
        }
    }
}

function changeColor(e) {
    const el = e.target;
    if (!isActive(el)) {
        switch (true) {
            case el.classList.contains('red'):
                tabsContent.className = 'tabs-content red';
                break;
            case el.classList.contains('green'):
                tabsContent.className = 'tabs-content green';
                break;
            case el.classList.contains('blue'):
                tabsContent.className = 'tabs-content blue';
                break;
        }
        changeActiveBtn(el);
    }
}

document.addEventListener('DOMContentLoaded', () => collectText(content[0]));
navBtns.addEventListener('click', (e) => changeTab(e));
styleBtns.addEventListener('click', (e) => changeColor(e));