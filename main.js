// Import responsive elements
let activeClrPrnt = document.querySelector('#active-clr-parent');
let activeTip = document.getElementById('active-tip');
let crayon = document.getElementById('crayon');
let altTip1 = document.getElementById('alt-tip-1');
let brush = document.getElementById('brush');
let altTip2 = document.getElementById('alt-tip-2');
let wand = document.getElementById('wand');
let activeErs = document.getElementById('active-ers');
let hard = document.getElementById('hard');
let altErs = document.getElementById('alt-ers');
let soft = document.getElementById('soft');
let activePlt = document.getElementById('active-plt');
let customPlt = document.getElementById('custom-plt');
let altPlt1 = document.getElementById('alt-plt-1');
let bit8 = document.getElementById('bit-8');
let altPlt2 = document.getElementById('alt-plt-2');
let bit16 = document.getElementById('bit-16');
let toolProps = document.getElementById('tool-props');
let infoBtn = document.getElementById('info');
let hero = document.querySelector('.hero');
let infoModal = document.getElementById('info-modal');
let propsModal = document.getElementById('props-modal');
let hideInfo = document.querySelector('.hide-info');
let hideModal = document.querySelector('.hide-modal');
let modalBody = document.querySelector('.mnodal-body');
let cellNum = document.getElementById('cell-counter');
let gen = document.getElementById('generate');
let clear = document.getElementById('clear');
let reset = document.getElementById('reset');
let grid = document.getElementById('grid');
let propsCont = document.querySelector('.properties-container');
let hideProps = document.querySelector('.hide-props');
let propBox = document.querySelector('.properties-box');
let shadeCnv = document.getElementById('shade-canvas');
let hueCnv = document.getElementById('hue-canvas');
let shadeCtx = shadeCnv.getContext('2d');
let hueCtx = hueCnv.getContext('2d');
let shadePicker = document.getElementById('shade-picker');
let huePicker = document.getElementById('hue-picker');
let huePickerH = document.getElementById('hue-picker-horizontal');
let shadeParent = document.getElementById('shade-parent');
let hueParent = document.getElementById('hue-parent');
let colors = ['red', '#ff0', 'lime', 'cyan', 'blue', '#f0f', 'red'];
let hexCode = document.getElementById('hex-code');
let pltCustom = document.querySelector('.palettes-custom');
let plt8bit = document.querySelector('.palettes-8-bit');
let plt16bit = document.querySelector('.palettes-16-bit');
let alerts = document.querySelector('.alerts');
let alertMsg = document.getElementById('alert-msg');
let tabletWidth = window.matchMedia('(max-width: 820px)');

// Page load functionality
window.onload = (e) => {
    pltCustom.style.display = 'flex';
    mkBtns();
    // initModal();
    // showInfo();
    // hideInfo();
    defaultTool();
    // toolSelect();
}

// Store arrays of parent buttons and image sources
let btns = {
    name: [crayon, brush, wand, hard, soft, customPlt, toolProps, info, gen, clear, reset],
    src: ['/img/crayon.svg', '/img/brush.svg', '/img/wand.svg', '/img/hard.svg', '/img/soft.svg', '/img/custom_swatch.svg', '/img/tool_properties.svg', '/img/information.svg', '/img/create.svg', '/img/clear.svg', 'img/reset.svg']
};

// Populate buttons with icons
function mkBtns() {
    for (let i = 0; i < btns.name.length; i++) {
        let img = document.createElement('img');
        btns.name[i].appendChild(img);
    }
    let btnImgs = Array.prototype.slice.call(document.querySelectorAll('img'));
    for (let j = 0; j < btnImgs.length; j++) {
        btnImgs[j].src = btns.src[j];
        btnImgs[j].setAttribute('width', 24);
    }
}

// Set crayon as default tool
function defaultTool() {
    crayon.style.background = '#b6c0ce';
}