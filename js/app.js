
var _root = null;
var index = 0;
var animatinClass = '';
var scroll  = 0;
var indexB = 0;
var slideOpen = false;
var lastIndexSld = 0;
var lastIndexScroll = 0;
var listH = [];
var totalHeight = 0;
var paddingT = 250;
var dark = false;


/********************************** TOOGLE DARK-LIGHT THEME STYLE **********************************************/


function changetheme() {    
    var bdy = document.getElementsByTagName('body')[0];
    if(dark){
        dark = false;
        let style = `--color-logo_:#333;--color-base--hover:#e91e63;--background--color: #f5f5f5;--colorText_: #263238;--icon--color_: #b0bec5;--tip__card--backgropund-Color--:#fff;--tab--nav-Color--:#92989b;--fill--theme--color:#666;`;
        bdy.style = style;
    }else{
        dark = true;
        let style = `--color-logo_:#fff;--color-base--hover:#e91e63;--background--color: #263238;--colorText_: #f5f5f5;--icon--color_: #b0bec5;--tip__card--backgropund-Color--:#444;--tab--nav-Color--:#fff;--fill--theme--color:#f5f5f5;`;
        bdy.style = style;
    }    
}




/********************************** UPDATE SLIDE TECHNOLOGY INDEX AND RENDERING THE COMPONENTS **********************************************/


function nextSlide() {    
    var ls = document.querySelectorAll('[data-index]');
    var i = 0;
    if(ls.length-1===index){
        i = 0;
    }else{
        i = index+1;
    }
    ls[index].setAttribute("class",``);
    ls[i].setAttribute("class",`active`);
    index = i;    
}

function prevSlide() {
    var ls = document.querySelectorAll('[data-index]');
    var i = 0;
    if(0===index){
        i = ls.length-1;
    }else{
        i = index - 1;
    }
    ls[index].setAttribute("class",``);
    ls[i].setAttribute("class",`active`);
    index = i;
}





function updSlide(i) {
    var sprit = document.querySelectorAll('[sprite-index]');    
    var ls = document.querySelectorAll('[data-index]');    
    ls[index].setAttribute("class",``);
    ls[i].setAttribute("class",`active`);
    sprit[index].setAttribute("class",``);
    sprit[i].setAttribute("class",`active`);
    index = i;
}



/********************************** TOGGLE SLIDEMENU  **********************************************/



function openSlideMenu(e) {
    var SlideMenu  = document.getElementById('SlideMenu');
    var overlay  = document.getElementById('overlay');
    if(slideOpen){
        slideOpen = false;
        SlideMenu.style.opacity=0;
        SlideMenu.style.transform=`translate3d(-110%, 0, 0)`;
        overlay.style.visibility='hidden';
       

    }
    else{
        slideOpen = true;
        SlideMenu.style.opacity=1;
        overlay.style.visibility='visible';
        SlideMenu.style.transform=`translate3d(0, 0, 0)`;
    }
}




/**********************************  NAV TABS AND INDICATOR BAR  **********************************************/


function changeIndexTab(e) {
    var Ind = null;
    var ls = document.querySelectorAll('[data-item]');
    Ind = e-1;    
    
    if(Ind>=0 && indexB !== Ind){        
        var els = document.querySelectorAll('[aria-labelledby]');
        ls[indexB].setAttribute("class",`center_Tab_Nav_Item`);
        ls[Ind].setAttribute("class",`center_Tab_Nav_Item is-active`);        
        tabIndicator(Ind)
        els[indexB].setAttribute("aria-hidden",`true`);
        els[Ind].setAttribute("aria-hidden",`false`);
        indexB = Ind;
    }    
}

function tabIndicator(i){
    var ls = document.querySelectorAll('[data-item]'); 
    var sprite  = document.getElementById('c-tabs-nav__indicator');
    sprite.style.left = `${ls[i].getBoundingClientRect().width*i}px`;
    sprite.style.width = `${ls[i].getBoundingClientRect().width}px`;  
}



function tabNavIndicator(s){
    var listTabH = [],  sumTH=0;       
    var els = document.querySelectorAll('[tabindex]');
    for(let ss in els){
        let hh = els[ss];       
        if(hh.nextSibling){            
            listTabH.push({l:sumTH,w:hh.getBoundingClientRect().width});
            sumTH+=hh.getBoundingClientRect().width;
        }      
    }
    var elsD = document.querySelectorAll('[tab-Slide-index]');
    elsD[lastIndexScroll].style.color='#92989b';
    elsD[lastIndexScroll].style.fontWeight= 'normal';
    elsD[s].style.color='var(--color-base--hover)';
    elsD[s].style.fontWeight= 600;
    let navsprite  = document.getElementById('header-tabs-nav__indicator');
    navsprite.style.left = `${listTabH[s].l}px`; 
    navsprite.style.width = `${listTabH[s].w}px`;
}


/********************************** RECALCULATE SECTION HEIGHT  **********************************************/



function reCalcSection(){
    listH = [];
    var sumH=0;
    var sctlist = document.getElementsByTagName('section');
    for(var ss in sctlist){
        var hh = sctlist[ss];       
        if(hh.nextSibling){ 
            var lastS = sumH;
            sumH+=hh.getBoundingClientRect().height;
            listH.push({s:lastS,e:sumH});
        }      
    }
}






/********************************** SCROLL 2 SECTION BY HEIGHT  **********************************************/




function ScrollIntoView(s,b) {
    tabNavIndicator(s);
    lastIndexScroll = s;
    reCalcSection();
    if(!b){
        totalHeight = (listH[listH.length-1].e/2)+paddingT;
        let rtop = listH[s].s/2;
        if(rtop>=0){
            scroll2(rtop)
        }
    } 
}   



function setBodyheight() {
    reCalcSection();
    totalHeight =  (listH[listH.length-1].e/2)+paddingT;
    _root.style.height = totalHeight+'px';
}




/********************************** ACTION EVENTS  **********************************************/


function scrollEvent() {

    scroll  =  window.pageYOffset || document.documentElement.scrollTop;   
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    if(totalHeight>scroll+windowHeight){         
        _root.style.transform = `translate3d(0px,-${scroll}px,0)`; 
        _root.style['transition-duration'] = animatinClass;
        var rt = scroll*2 + 20;
        for(var sp in listH){
            if(rt<listH[sp].e && rt>=listH[sp].s){    
                ScrollIntoView(sp*1,true)
            } 
        }
    }    
    IsInViewport()
}


function resizeEvent(e) {
    tabIndicator(indexB)
    tabNavIndicator(lastIndexScroll)
    setBodyheight()
}


function scroll2(s) {   
    animatinClass = `.52s`;
    setTimeout(()=>{
        _root.style.transform = `translate3d(0px,-${s}px,0)`;
        _root.style['transition-duration'] = animatinClass;
        window.scrollTo(0,s);
        setTimeout(()=>{
            animatinClass = `.0002s`;
        },500)       
    },5)
}

/********************************** IN VIEW PORT   **********************************************/

function IsInViewport(){
    var els = document.querySelectorAll('[is-in-viewport=false]');
    for(var ss =0;ss<els.length;ss++){
        if(isAnyPartOfElementInViewport(els[ss])){
            els[ss].setAttribute("is-in-viewport",true);
        }else{
            //els[ss].setAttribute("is-in-viewport",false);           
        }  
    }
}



function isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();    
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);
    return (vertInView && horInView);
}


/********************************** LOADING APP  **********************************************/




function loadApp(){
    _root = document.getElementById("root");
    document.addEventListener('scroll',scrollEvent)
    window.addEventListener('resize',resizeEvent)   
    changeIndexTab(indexB)
    tabIndicator(indexB)
    reCalcSection();
    setBodyheight(); 
    IsInViewport(); 
}
