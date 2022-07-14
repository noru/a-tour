const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerpolicy&&(i.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?i.credentials="include":o.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}};p();var style="";const html=`<h1>Zero Dependencies One Liner Feature Tutorial Helper</h1>
<p>User Onboarding, Product Walkthrough, Feature Guide, whatever you call it, is annoying but PM likes it.</p>
<h2>Not Very Ready</h2>
<p>This thing is working in progress. Everything may change during the development. Use it at your own discretion.</p>
<h2>\u{1F449}<a href="https://noru.github.io/a-tour">Demo</a>\u{1F448}</h2>
<h2>Install</h2>
<pre><code>npm i a-tour
</code></pre>
<h2>Usage</h2>
<pre><code class="language-typescript">    new aTour({
      id: 'my-guide', // multiple guide supported
      steps: [
        {
          target: '#app &gt; div &gt; div.page-header',
          hint: 'This is an awesome page header',
          title: 'My page header',
        },
      ],
    }).start()
</code></pre>
<h2>API</h2>
<ul>
<li>
<p>new ATour(options) // options has following properties</p>
<ul>
<li>id: string // an identifier</li>
<li>container: HTMLElement | string | (() =&gt; HTMLElement)  // a HTML node, a selector or a function that returns a html node</li>
<li>steps: Step[]   // properties as below
<ul>
<li>target: string      // a css selector targeting the element you want to highlight</li>
<li>title: string</li>
<li>hint: string</li>
<li>clickTargetAsNext?: boolean // enable mouse event on target and click it as &quot;next&quot; button</li>
<li>delay?: number // a delay in milliseconds, in case the target element is not yet visible on DOM for reason like, data loading or invoking a modal</li>
<li>noPrev?: boolean // disable &quot;prev&quot; button for this step</li>
</ul>
</li>
</ul>
</li>
<li>
<p>instance.start()    // starts the guide</p>
</li>
<li>
<p>instance.stop()    // quite the guide programmatically</p>
</li>
</ul>
<h2>TODO</h2>
<ul>
<li><s>handle scroll</s></li>
<li><s>multiple guides</s></li>
<li>hint arrow</li>
<li>hyper link in hint</li>
</ul>
`;function getOffset(n,t){let e=document.body,r=document.documentElement,o=window.pageYOffset||r.scrollTop||e.scrollTop,i=window.pageXOffset||r.scrollLeft||e.scrollLeft;t=t||e;let s=n.getBoundingClientRect(),h=t.getBoundingClientRect(),u=getPropValue(t,"position"),l={width:s.width,height:s.height};return t.tagName.toLowerCase()!=="body"&&u==="relative"||u==="sticky"?Object.assign(l,{top:s.top-h.top,left:s.left-h.left}):isFixed(n)?Object.assign(l,{top:s.top,left:s.left}):Object.assign(l,{top:s.top+o,left:s.left+i})}function isFixed(n){const t=n.parentNode;return!t||t.nodeName==="HTML"?!1:getPropValue(n,"position")==="fixed"?!0:isFixed(t)}function getPropValue(n,t){let e="";return document.defaultView&&document.defaultView.getComputedStyle&&(e=document.defaultView.getComputedStyle(n,null).getPropertyValue(t)),e}function getTarget(n){return typeof n=="object"&&n.nodeType!==void 0?n:typeof n=="string"?document.querySelector(n):typeof n=="function"?n():null}function getPosition(n){let t=getOffset(n,document.body);return{x:t.left,y:t.top,w:t.width,h:t.height}}function checkBottomSpace(n,t){let{y:e,h:r}=n,o=e+r;return window.innerHeight-o>t}function getOverflowX(n,t){return{left:-n,right:t-window.innerWidth}}function setCookie(n,t,e){const r={[n]:t,path:"/"};if(e){let i=new Date;i.setTime(i.getTime()+e*24*60*60*1e3),r.expires=i.toUTCString()}let o=[];for(let i in r)o.push(`${i}=${r[i]}`);return document.cookie=o.join(";"),getCookie(n)}function getAllCookies(){let n={};return document.cookie.split(";").forEach(t=>{let[e,r]=t.split("=");n[e.trim()]=r}),n}function getCookie(n){return getAllCookies()[n]}var styles="";function scrollToViewport(n){let t=n.getBoundingClientRect(),e=t.top,r=t.bottom,o=window.innerHeight,i=20;e<0?window.scrollBy(0,e-i):r>o&&window.scrollBy(0,r-o+i)}const Template=`
<div class="a-tour-wrapper">
  <div class="a-tour-overlay"></div>
  <div class="a-tour-highlight"></div>
  <div class="a-tour-hint">
    <h1 class="a-tour-hint-title"></h1>
    <p class="a-tour-hint-text"></p>
    <div class="a-tour-actions">
      <label><input class="a-tour-dont-show-again" type="checkbox">Don't show again</label>
      <button class="a-tour-btn skip-btn">Skip</button>
      <button class="a-tour-btn prev-btn">Prev</button>
      <button class="a-tour-btn next-btn">Next</button>
    </div>
  </div>
</div>
`;class Updater{constructor(t=document.body){this.mounted=!1,this.index=-1,this.listener={},this.container=t,this.prepareDOM()}mount(t,e,r,o){this.mounted||(document.body.appendChild(this.wrapper),this.mounted=!0);let i=getTarget(e.target);if(!i)throw new Error("Target not found: "+e.target);if(scrollToViewport(i),this.wrapper.id=t,this.index=r,this.overlay.style.display=e.clickTargetAsNext?"none":"block",this.hintTitle.innerText=`(${r+1}/${o}) ${e.title}`,this.hintText.innerText=e.hint,this.prevButton.style.display=r===0?"none":"inline-block",this.skipButton.style.display=r===o-1?"none":"inline-block",e.clickTargetAsNext){this.nextButton.disabled=!0,this.nextButton.innerText="Click Target";let f=this.onClick.bind(this);i==null||i.addEventListener("click",function m(){f("next"),i==null||i.removeEventListener("click",m)})}else this.nextButton.disabled=!1,this.nextButton.innerText=r===o-1?"Done":"Next";let s=getPosition(i),{x:h,y:u,w:l,h:c}=s,a=4;this.wrapper.style.top=`${u-a}px`,this.wrapper.style.left=`${h-a}px`,this.highlight.style.minWidth=`${l+a*2}px`,this.highlight.style.maxWidth=`${l+a*2}px`,this.highlight.style.minHeight=`${c+a*2}px`,this.highlight.style.maxHeight=`${c+a*2}px`;let{x:d,y:g}=this.getHintPosition(s);this.hint.style.transform=`translate(${d}px, ${g}px)`}unmount(){document.body.removeChild(this.wrapper),this.mounted=!1}registerListener(t,e){this.listener[t]=e}onClick(t){let e=this.listener[this.wrapper.id];e&&e(t,this.dontShowAgain.checked)}prepareDOM(){let t=document.createElement("div");t.innerHTML=Template,this.wrapper=t.firstElementChild,this.overlay=this.wrapper.querySelector(".a-tour-overlay"),this.highlight=this.wrapper.querySelector(".a-tour-highlight"),this.hint=this.wrapper.querySelector(".a-tour-hint"),this.hintTitle=this.hint.querySelector(".a-tour-hint-title"),this.hintText=this.hint.querySelector(".a-tour-hint-text"),this.prevButton=this.wrapper.querySelector(".a-tour-btn.prev-btn"),this.nextButton=this.wrapper.querySelector(".a-tour-btn.next-btn"),this.skipButton=this.wrapper.querySelector(".a-tour-btn.skip-btn"),this.dontShowAgain=this.wrapper.querySelector(".a-tour-dont-show-again"),this.prevButton.addEventListener("click",()=>this.onClick("prev")),this.nextButton.addEventListener("click",()=>this.onClick("next")),this.skipButton.addEventListener("click",()=>this.onClick("close"))}getHintPosition(t){let{width:e,height:r}=this.hint.getBoundingClientRect(),o=!0;checkBottomSpace(t,r)||(o=!1);let i=(t.w-e)/2,s=getOverflowX(i+t.x,t.x+i+e);return(s.left>0||s.right>0)&&(s.left+s.right<0?i-=Math.max(s.left,s.right)*(s.left>0?-1:1):i-=(s.left+s.right)/2),{x:i,y:o?20:-r-20-t.h}}}new Updater;const updaterCache=new WeakMap;class Runner{constructor(t){this.id="default",this.current=-1,this.id=t.id,this.steps=t.steps;let e=getTarget(t.container)||document.body;updaterCache.get(e)||updaterCache.set(e,new Updater(e)),this.domUpdater=updaterCache.get(e),this.domUpdater.registerListener(this.id,this.go.bind(this))}get step(){return this.steps[this.current]}go(t,e=!1){e&&setCookie("atour_inactive_"+this.id,"true",365);let r=this.step;t==="next"?this.current++:t==="prev"?this.current--:this.current=-1,r!=null&&r.clickTargetAsNext?(this.domUpdater.unmount(),setTimeout(()=>this.show(),r.delay||1e3)):this.show()}show(){if(!this.step){this.domUpdater.unmount();return}this.domUpdater.mount(this.id,this.step,this.current,this.steps.length)}}class ATour{constructor(t={}){this.options={id:"default",container:()=>document.body,steps:[]},Object.assign(this.options,t),this._runner=new Runner(this.options)}start(){getCookie("atour_inactive_"+this.options.id)!=="true"&&this._runner.go("next")}stop(){this._runner.go("close")}}const app=document.querySelector("#app"),defaultConfig=`{
  id: 'my-app',
  container: '#app',
  steps: [
    {
      target: '#app > h1',
      title: 'Hello',
      hint: 'This is the main title',
    },
    {
      target: '#app > h2',
      title: 'Disclaimer',
      hint: 'This lib is not very ready',
    },
    {
      target: '#app > pre:nth-child(6)',
      title: 'Installation',
      hint: 'How to install this library',
    },
    {
      target: '#app > pre:nth-child(8) > code',
      title: 'Usage',
      hint: 'A minimum example of usage',
    },
    {
      target: '#app > h2:nth-child(11)',
      title: 'TODO',
      hint: 'This an element out side of the screen',
    }
  ],
}

`,config=`
<div class="config-wrapper">
  <textarea class="config-input" rows="40" cols="50">${defaultConfig}</textarea>
  <div class="btn-wrapper">
    <button id="apply-btn">Apply</button>
  </div>
</div>
`;app.innerHTML=`
  ${html}
  ${config}
`;app.querySelector("#apply-btn").addEventListener("click",()=>{document.cookie="atour_inactive_my-app=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";const configInput=app.querySelector(".config-input");try{const config=eval(`
      (function() {
        return ${configInput.value}
      })()
    `);new ATour(config).start()}catch(n){console.error(n),alert(n.message)}});
