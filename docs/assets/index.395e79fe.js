const p=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function e(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=e(o);fetch(o.href,n)}};p();var style="";const html=`<h1>Zero Dependencies One Liner Feature Tutorial Helper</h1>
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
<li><s>hyper link in hint</s></li>
</ul>
`;function getOffset(i,t){let e=document.body,r=document.documentElement,o=window.pageYOffset||r.scrollTop||e.scrollTop,n=window.pageXOffset||r.scrollLeft||e.scrollLeft;t=t||e;let s=i.getBoundingClientRect(),a=t.getBoundingClientRect(),u=getPropValue(t,"position"),h={width:s.width,height:s.height};return t.tagName.toLowerCase()!=="body"&&u==="relative"||u==="sticky"?Object.assign(h,{top:s.top-a.top,left:s.left-a.left}):isFixed(i)?Object.assign(h,{top:s.top,left:s.left}):Object.assign(h,{top:s.top+o,left:s.left+n})}function isFixed(i){const t=i.parentNode;return!t||t.nodeName==="HTML"?!1:getPropValue(i,"position")==="fixed"?!0:isFixed(t)}function getPropValue(i,t){let e="";return document.defaultView&&document.defaultView.getComputedStyle&&(e=document.defaultView.getComputedStyle(i,null).getPropertyValue(t)),e}function getTarget(i){return typeof i=="object"&&i.nodeType!==void 0?i:typeof i=="string"?document.querySelector(i):typeof i=="function"?i():null}function getPosition(i){let t=getOffset(i,document.body);return{x:t.left,y:t.top,w:t.width,h:t.height}}function checkBottomSpace(i,t){let{y:e,h:r}=i,o=e+r;return window.innerHeight-o>t}function getOverflowX(i,t){return{left:-i,right:t-window.innerWidth}}function setCookie(i,t,e){const r={[i]:t,path:"/"};if(e){let n=new Date;n.setTime(n.getTime()+e*24*60*60*1e3),r.expires=n.toUTCString()}let o=[];for(let n in r)o.push(`${n}=${r[n]}`);return document.cookie=o.join(";"),getCookie(i)}function getAllCookies(){let i={};return document.cookie.split(";").forEach(t=>{let[e,r]=t.split("=");i[e.trim()]=r}),i}function getCookie(i){return getAllCookies()[i]}var styles="";function scrollToViewport(i){let t=i.getBoundingClientRect(),e=t.top,r=t.bottom,o=window.innerHeight,n=20;e<0?window.scrollBy(0,e-n):r>o&&window.scrollBy(0,r-o+n)}function replaceLink(i){let t=/https?:\/\/w{0,3}\w*?\.(\w*?\.)?\w{2,3}\S*|www\.(\w*?\.)?\w*?\.\w{2,3}\S*|(\w*?\.)?\w*?\.\w{2,3}[\/\?]\S*/g;return i.replace(t,e=>`<a href="${e}" target="__blank">${e}</a>`)}const Template=`
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
`;class Updater{constructor(t=document.body){this.mounted=!1,this.index=-1,this.listener={},this.container=t,this.prepareDOM()}mount(t,e,r,o){this.mounted||(document.body.appendChild(this.wrapper),this.mounted=!0);let n=getTarget(e.target);if(!n)throw alert("Target not found: "+e.target),new Error("Target not found: "+e.target);scrollToViewport(n);let s=r===o-1;if(this.wrapper.id=t,this.index=r,this.overlay.style.display=e.clickTargetAsNext?"none":"block",this.hintTitle.innerText=`(${r+1}/${o}) ${e.title}`,this.hintText.innerHTML=replaceLink(e.hint),this.prevButton.style.display=r===0?"none":"inline-block",this.skipButton.style.display=s?"none":"inline-block",e.clickTargetAsNext){this.nextButton.disabled=!0,this.nextButton.innerText="Click Target";let m=this.onClick.bind(this);n==null||n.addEventListener("click",function y(){m("next"),n==null||n.removeEventListener("click",y)})}else this.nextButton.disabled=!1,this.nextButton.innerText=s?"Done":"Next";let a=getPosition(n),{x:u,y:h,w:c,h:d}=a,l=4;this.wrapper.style.top=`${h-l}px`,this.wrapper.style.left=`${u-l}px`,this.highlight.style.minWidth=`${c+l*2}px`,this.highlight.style.maxWidth=`${c+l*2}px`,this.highlight.style.minHeight=`${d+l*2}px`,this.highlight.style.maxHeight=`${d+l*2}px`;let{x:g,y:f}=this.getHintPosition(a);this.hint.style.transform=`translate(${g}px, ${f}px)`}unmount(){document.body.removeChild(this.wrapper),this.mounted=!1}registerListener(t,e){this.listener[t]=e}onClick(t){let e=this.listener[this.wrapper.id];e&&e(t,this.dontShowAgain.checked)}prepareDOM(){let t=document.createElement("div");t.innerHTML=Template,this.wrapper=t.firstElementChild,this.overlay=this.wrapper.querySelector(".a-tour-overlay"),this.highlight=this.wrapper.querySelector(".a-tour-highlight"),this.hint=this.wrapper.querySelector(".a-tour-hint"),this.hintTitle=this.hint.querySelector(".a-tour-hint-title"),this.hintText=this.hint.querySelector(".a-tour-hint-text"),this.prevButton=this.wrapper.querySelector(".a-tour-btn.prev-btn"),this.nextButton=this.wrapper.querySelector(".a-tour-btn.next-btn"),this.skipButton=this.wrapper.querySelector(".a-tour-btn.skip-btn"),this.dontShowAgain=this.wrapper.querySelector(".a-tour-dont-show-again"),this.prevButton.addEventListener("click",()=>this.onClick("prev")),this.nextButton.addEventListener("click",()=>this.onClick("next")),this.skipButton.addEventListener("click",()=>this.onClick("close"))}getHintPosition(t){let{width:e,height:r}=this.hint.getBoundingClientRect(),o=!0;checkBottomSpace(t,r)||(o=!1);let n=(t.w-e)/2,s=getOverflowX(n+t.x,t.x+n+e);return(s.left>0||s.right>0)&&(s.left+s.right<0?n-=Math.max(s.left,s.right)*(s.left>0?-1:1):n-=(s.left+s.right)/2),{x:n,y:o?20:-r-20-t.h}}}new Updater;const updaterCache=new WeakMap;class Runner{constructor(t){this.id="default",this.current=-1,this.id=t.id,this.steps=t.steps;let e=getTarget(t.container)||document.body;updaterCache.get(e)||updaterCache.set(e,new Updater(e)),this.domUpdater=updaterCache.get(e),this.domUpdater.registerListener(this.id,this.go.bind(this))}get step(){return this.steps[this.current]}go(t,e=!1){e&&setCookie("atour_inactive_"+this.id,"true",365);let r=this.step;t==="next"?this.current++:t==="prev"?this.current--:this.current=-1,r!=null&&r.delay?(this.domUpdater.unmount(),setTimeout(()=>this.show(),r.delay||1e3)):this.show()}show(){if(!this.step){this.domUpdater.unmount();return}this.domUpdater.mount(this.id,this.step,this.current,this.steps.length)}}class ATour{constructor(t={}){this.options={id:"default",container:()=>document.body,steps:[]},Object.assign(this.options,t),this._runner=new Runner(this.options)}start(){getCookie("atour_inactive_"+this.options.id)!=="true"&&this._runner.go("next")}stop(){this._runner.go("close")}}const app=document.querySelector("#app"),defaultConfig=`{
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
      target: '#app > pre:first-of-type',
      title: 'Installation',
      hint: 'How to install this library. Please go to https://www.google.com.hk/search?q=npmjs+%22a-tour%22 for more information',
      delay: 1000
    },
    {
      target: '#app > pre:nth-of-type(2) > code',
      title: 'Usage',
      hint: 'A minimum example of usage',
    },
    {
      target: '#app > h2:nth-of-type(6)',
      title: 'TODO items',
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
    `);new ATour(config).start()}catch(i){console.error(i),alert(i.message)}});
