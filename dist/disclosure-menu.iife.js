var DisclosureMenu=function(){"use strict";var z=Object.defineProperty;var H=(m,a,f)=>a in m?z(m,a,{enumerable:!0,configurable:!0,writable:!0,value:f}):m[a]=f;var r=(m,a,f)=>H(m,typeof a!="symbol"?a+"":a,f);function m(n,e){typeof n=="string"?e.classList.add(n):e.classList.add(...n)}function a(n,e){typeof n=="string"?e.classList.remove(n):e.classList.remove(...n)}function f(n,e){try{if(typeof e!="object"){const t=typeof e;throw new TypeError(`Elements given to isValidInstance() must be inside of an object. "${t}" given.`)}for(const t in e)if(!(e[t]instanceof n)){const s=typeof e[t];throw new TypeError(`${t} must be an instance of ${n.name}. "${s}" given.`)}return{status:!0,error:null}}catch(t){return{status:!1,error:t}}}function u(n,e){try{if(typeof e!="object"){const t=typeof e;throw new TypeError(`Values given to isValidType() must be inside of an object. "${t}" given.`)}for(const t in e){const s=typeof e[t];if(s!==n)throw new TypeError(`${t} must be a ${n}. "${s}" given.`)}return{status:!0,error:null}}catch(t){return{status:!1,error:t}}}function C(n){try{if(typeof n!="object"){const e=typeof n;throw new TypeError(`Values given to isQuerySelector() must be inside of an object. "${e}" given.`)}for(const e in n)try{if(n[e]===null)throw new Error;document.querySelector(n[e])}catch{throw new TypeError(`${e} must be a valid query selector. "${n[e]}" given.`)}return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function p(n){try{if(typeof n!="object"||Array.isArray(n)){const e=typeof n;throw new TypeError(`Values given to isValidClassList() must be inside of an object. "${e}" given.`)}for(const e in n){const t=typeof n[e];if(t!=="string")if(Array.isArray(n[e]))n[e].forEach(s=>{if(typeof s!="string")throw new TypeError(`${e} must be a string or an array of strings. An array containing non-strings given.`)});else throw new TypeError(`${e} must be a string or an array of strings. "${t}" given.`);else{const s={};s[e]=n[e],C(s)}}return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function $(n){try{if(typeof n!="object"){const t=typeof n;throw new TypeError(`Values given to isValidState() must be inside of an object. "${t}" given.`)}const e=["none","self","child"];for(const t in n)if(!e.includes(n[t]))throw new TypeError(`${t} must be one of the following values: ${e.join(", ")}. "${n[t]}" given.`);return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function F(n){try{if(typeof n!="object"){const t=typeof n;throw new TypeError(`Values given to isValidEvent() must be inside of an object. "${t}" given.`)}const e=["none","mouse","keyboard","character"];for(const t in n)if(!e.includes(n[t]))throw new TypeError(`${t} must be one of the following values: ${e.join(", ")}. "${n[t]}" given.`);return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function I(n){try{if(typeof n!="object"){const t=typeof n;throw new TypeError(`Values given to isValidHoverType() must be inside of an object. "${t}" given.`)}const e=["off","on","dynamic"];for(const t in n)if(!e.includes(n[t]))throw new TypeError(`${t} must be one of the following values: ${e.join(", ")}. "${n[t]}" given.`);return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function A(n,e){if(u("string",{tagName:n}).status&&f(HTMLElement,e).status){const t=n.toLowerCase();let s=!0;for(const i in e)e[i].tagName.toLowerCase()!==t&&(s=!1);return s}else return!1}class L{constructor({menuToggleElement:e,parentElement:t,controlledMenu:s,parentMenu:i=null}){r(this,"_dom",{toggle:null,parent:null});r(this,"_elements",{controlledMenu:null,parentMenu:null});r(this,"_open",!1);r(this,"_expandEvent",new CustomEvent("accessibleMenuExpand",{bubbles:!0,detail:{toggle:this}}));r(this,"_collapseEvent",new CustomEvent("accessibleMenuCollapse",{bubbles:!0,detail:{toggle:this}}));this._dom.toggle=e,this._dom.parent=t,this._elements.controlledMenu=s,this._elements.parentMenu=i}initialize(){this._setIds(),this._setAriaAttributes(),this._collapse(!1)}get dom(){return this._dom}get elements(){return this._elements}get isOpen(){return this._open}set isOpen(e){u("boolean",{value:e}),this._open=e}_setIds(){var e;if(this.dom.toggle.id===""||this.elements.controlledMenu.dom.menu.id===""){const t=Math.random().toString(36).replace(/[^a-z]+/g,"").substring(0,10);let s=((e=this.dom.toggle.innerText)==null?void 0:e.replace(/[^a-zA-Z0-9\s]/g,""))||"",i=t;!s.replace(/\s/g,"").length&&this.dom.toggle.getAttribute("aria-label")&&(s=this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g,"")),s.replace(/\s/g,"").length>0&&(s=s.toLowerCase().replace(/\s+/g,"-"),s.startsWith("-")&&(s=s.substring(1)),s.endsWith("-")&&(s=s.slice(0,-1)),i=`${s}-${i}`),this.dom.toggle.id=this.dom.toggle.id||`menu-button-${i}`,this.elements.controlledMenu.dom.menu.id=this.elements.controlledMenu.dom.menu.id||`menu-${i}`}}_setAriaAttributes(){this.dom.toggle.setAttribute("aria-expanded","false"),this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby",this.dom.toggle.id)}_expand(e=!0){const{closeClass:t,openClass:s,transitionClass:i}=this.elements.controlledMenu;this.dom.toggle.setAttribute("aria-expanded","true"),this.elements.controlledMenu.elements.rootMenu.hasOpened=!0,i!==""?(m(i,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{t!==""&&a(t,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{s!==""&&m(s,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{a(i,this.elements.controlledMenu.dom.menu)})})})):(s!==""&&m(s,this.elements.controlledMenu.dom.menu),t!==""&&a(t,this.elements.controlledMenu.dom.menu)),e&&this.dom.toggle.dispatchEvent(this._expandEvent)}_collapse(e=!0){const{closeClass:t,openClass:s,transitionClass:i}=this.elements.controlledMenu;this.dom.toggle.setAttribute("aria-expanded","false"),i!==""?(m(i,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{s!==""&&a(s,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{t!==""&&m(t,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{a(i,this.elements.controlledMenu.dom.menu)})})})):(t!==""&&m(t,this.elements.controlledMenu.dom.menu),s!==""&&a(s,this.elements.controlledMenu.dom.menu)),e&&this.dom.toggle.dispatchEvent(this._collapseEvent)}open(){this.elements.controlledMenu.focusState="self",this.isOpen||(this._expand(),this.isOpen=!0)}preview(){this.elements.parentMenu&&(this.elements.parentMenu.focusState="self"),this.isOpen||(this._expand(),this.isOpen=!0)}close(){this.isOpen&&(this.elements.controlledMenu.blur(),this.elements.parentMenu&&(this.elements.parentMenu.focusState="self"),this._collapse(),this.isOpen=!1)}toggle(){this.isOpen?this.close():this.open()}closeSiblings(){this.elements.parentMenu&&this.elements.parentMenu.elements.submenuToggles.forEach(e=>{e!==this&&e.close()})}closeChildren(){this.elements.controlledMenu.elements.submenuToggles.forEach(e=>e.close())}}class O{constructor({menuItemElement:e,menuLinkElement:t,parentMenu:s,isSubmenuItem:i=!1,childMenu:o=null,toggle:l=null}){r(this,"_dom",{item:null,link:null});r(this,"_elements",{parentMenu:null,childMenu:null,toggle:null});r(this,"_submenu",!1);this._dom.item=e,this._dom.link=t,this._elements.parentMenu=s,this._elements.childMenu=o,this._elements.toggle=l,this._submenu=i}initialize(){}get dom(){return this._dom}get elements(){return this._elements}get isSubmenuItem(){return this._submenu}focus(){this.elements.parentMenu.shouldFocus&&requestAnimationFrame(()=>{this.dom.link.focus()})}blur(){this.elements.parentMenu.shouldFocus&&requestAnimationFrame(()=>{this.dom.link.blur()})}}function _(n){try{const e=n.key||n.keyCode,t={Enter:e==="Enter"||e===13,Space:e===" "||e==="Spacebar"||e===32,Escape:e==="Escape"||e==="Esc"||e===27,ArrowUp:e==="ArrowUp"||e==="Up"||e===38,ArrowRight:e==="ArrowRight"||e==="Right"||e===39,ArrowDown:e==="ArrowDown"||e==="Down"||e===40,ArrowLeft:e==="ArrowLeft"||e==="Left"||e===37,Home:e==="Home"||e===36,End:e==="End"||e===35,Character:isNaN(e)&&!!e.match(/^[a-zA-Z]{1}$/),Tab:e==="Tab"||e===9,Asterisk:e==="*"||e===56};return Object.keys(t).find(s=>t[s]===!0)||""}catch{return""}}function c(n){n.preventDefault(),n.stopPropagation()}class y{constructor({menuElement:e,menuItemSelector:t="li",menuLinkSelector:s="a",submenuItemSelector:i="li:has(ul)",submenuToggleSelector:o="a",submenuSelector:l="ul",controllerElement:d=null,containerElement:g=null,openClass:h="show",closeClass:M="hide",transitionClass:T="transitioning",isTopLevel:b=!0,parentMenu:v=null,hoverType:w="off",hoverDelay:S=250,enterDelay:D=-1,leaveDelay:k=-1}){r(this,"_MenuType",y);r(this,"_MenuItemType",O);r(this,"_MenuToggleType",L);r(this,"_dom",{menu:null,menuItems:[],submenuItems:[],submenuToggles:[],submenus:[],controller:null,container:null});r(this,"_selectors",{menuItems:"",menuLinks:"",submenuItems:"",submenuToggles:"",submenus:""});r(this,"_elements",{menuItems:[],submenuToggles:[],controller:null,parentMenu:null,rootMenu:null});r(this,"_openClass","show");r(this,"_closeClass","hide");r(this,"_transitionClass","transitioning");r(this,"_root",!0);r(this,"_currentChild",0);r(this,"_focusState","none");r(this,"_currentEvent","none");r(this,"_hoverType","off");r(this,"_hoverDelay",250);r(this,"_enterDelay",-1);r(this,"_leaveDelay",-1);r(this,"_hoverTimeout",null);r(this,"_hasOpened",!1);r(this,"_errors",[]);this._dom.menu=e,this._dom.controller=d,this._dom.container=g,this._selectors.menuItems=t,this._selectors.menuLinks=s,this._selectors.submenuItems=i,this._selectors.submenuToggles=o,this._selectors.submenus=l,this._elements.menuItems=[],this._elements.submenuToggles=[],this._elements.controller=null,this._elements.parentMenu=v,this._elements.rootMenu=b?this:null,this._openClass=h||"",this._closeClass=M||"",this._transitionClass=T||"",this._root=b,this._hoverType=w,this._hoverDelay=S,this._enterDelay=D,this._leaveDelay=k}initialize(){if(!this._validate())throw new Error(`AccesibleMenu: cannot initialize menu. The following errors have been found:
 - ${this.errors.join(`
 - `)}`);if(this.elements.rootMenu===null&&this._findRootMenu(this),this._setDOMElements(),this.isTopLevel&&this.dom.controller&&this.dom.container){const e=new this._MenuToggleType({menuToggleElement:this.dom.controller,parentElement:this.dom.container,controlledMenu:this});A("button",{toggle:e.dom.toggle})||e.dom.toggle.setAttribute("role","button"),e.dom.toggle.setAttribute("aria-controls",this.dom.menu.id),this._elements.controller=e}this._createChildElements()}get dom(){return this._dom}get selectors(){return this._selectors}get elements(){return this._elements}get isTopLevel(){return this._root}get openClass(){return this.isTopLevel?this._openClass:this.elements.rootMenu.openClass}get closeClass(){return this.isTopLevel?this._closeClass:this.elements.rootMenu.closeClass}get transitionClass(){return this.isTopLevel?this._transitionClass:this.elements.rootMenu.transitionClass}get currentChild(){return this._currentChild}get focusState(){return this._focusState}get currentEvent(){return this._currentEvent}get currentMenuItem(){return this.elements.menuItems[this.currentChild]}get hoverType(){return this._root?this._hoverType:this.elements.rootMenu.hoverType}get hoverDelay(){return this._root?this._hoverDelay:this.elements.rootMenu.hoverDelay}get enterDelay(){return this._enterDelay===-1?this.hoverDelay:this._root?this._enterDelay:this.elements.rootMenu.enterDelay}get leaveDelay(){return this._leaveDelay===-1?this.hoverDelay:this._root?this._leaveDelay:this.elements.rootMenu.leaveDelay}get shouldFocus(){let e=!1;return(this.currentEvent==="keyboard"||this.currentEvent==="character")&&(e=!0),this.currentEvent==="mouse"&&this.hoverType==="dynamic"&&(e=!0),e}get hasOpened(){return this._root?this._hasOpened:this.elements.rootMenu.hasOpened}get errors(){return this._errors}set openClass(e){p({openClass:e}),this._openClass!==e&&(this._openClass=e)}set closeClass(e){p({closeClass:e}),this._closeClass!==e&&(this._closeClass=e)}set transitionClass(e){p({transitionClass:e}),this._transitionClass!==e&&(this._transitionClass=e)}set currentChild(e){u("number",{value:e});function t(s){if(["mouse","character"].includes(s.currentEvent)&&s.elements.parentMenu){let o=0,l=!1;for(;!l&&o<s.elements.parentMenu.elements.menuItems.length;){const d=s.elements.parentMenu.elements.menuItems[o];d.isSubmenuItem&&d.elements.toggle.elements.controlledMenu===s&&(l=!0,s.elements.parentMenu.currentEvent=s.currentEvent,s.elements.parentMenu.currentChild=o),o++}}}e<-1?(this._currentChild=-1,t(this)):e>=this.elements.menuItems.length?(this._currentChild=this.elements.menuItems.length-1,t(this)):this.focusChild!==e&&(this._currentChild=e,t(this))}set focusState(e){$({value:e}),this._focusState!==e&&(this._focusState=e),this.elements.submenuToggles.length>0&&(e==="self"||e==="none")&&this.elements.submenuToggles.forEach(t=>{t.elements.controlledMenu.focusState="none"}),this.elements.parentMenu&&(e==="self"||e==="child")&&(this.elements.parentMenu.focusState="child")}set currentEvent(e){F({value:e}),this._currentEvent!==e&&(this._currentEvent=e,this.elements.submenuToggles.length>0&&this.elements.submenuToggles.forEach(t=>{t.elements.controlledMenu.currentEvent=e}))}set hoverType(e){I({value:e}),this._hoverType!==e&&(this._hoverType=e)}set hoverDelay(e){u("number",{value:e}),this._hoverDelay!==e&&(this._hoverDelay=e)}set enterDelay(e){u("number",{value:e}),this._enterDelay!==e&&(this._enterDelay=e)}set leaveDelay(e){u("number",{value:e}),this._leaveDelay!==e&&(this._leaveDelay=e)}set hasOpened(e){u("boolean",{value:e}),this._hasOpened!==e&&(this._hasOpened=e)}_validate(){let e=!0,t;this._dom.container!==null||this._dom.controller!==null?t=f(HTMLElement,{menuElement:this._dom.menu,controllerElement:this._dom.controller,containerElement:this._dom.container}):t=f(HTMLElement,{menuElement:this._dom.menu}),t.status||(this._errors.push(t.error.message),e=!1);let s;if(this._selectors.submenuItems!==""?s=C({menuItemSelector:this._selectors.menuItems,menuLinkSelector:this._selectors.menuLinks,submenuItemSelector:this._selectors.submenuItems,submenuToggleSelector:this._selectors.submenuToggles,submenuSelector:this._selectors.submenus}):s=C({menuItemSelector:this._selectors.menuItems,menuLinkSelector:this._selectors.menuLinks}),s.status||(this._errors.push(s.error.message),e=!1),this._openClass!==""){const h=p({openClass:this._openClass});h.status||(this._errors.push(h.error.message),e=!1)}if(this._closeClass!==""){const h=p({closeClass:this._closeClass});h.status||(this._errors.push(h.error.message),e=!1)}if(this._transitionClass!==""){const h=p({transitionClass:this._transitionClass});h.status||(this._errors.push(h.error.message),e=!1)}const i=u("boolean",{isTopLevel:this._root});if(i.status||(this._errors.push(i.error.message),e=!1),this._elements.parentMenu!==null){const h=f(y,{parentMenu:this._elements.parentMenu});h.status||(this._errors.push(h.error.message),e=!1)}const o=I({hoverType:this._hoverType});o.status||(this._errors.push(o.error.message),e=!1);const l=u("number",{hoverDelay:this._hoverDelay});l.status||(this._errors.push(l.error.message),e=!1);const d=u("number",{enterDelay:this._enterDelay});d.status||(this._errors.push(d.error.message),e=!1);const g=u("number",{leaveDelay:this._leaveDelay});return g.status||(this._errors.push(g.error.message),e=!1),e}_setDOMElementType(e,t=this.dom.menu,s=!0){if(typeof this.selectors[e]=="string"){if(!Array.isArray(this.dom[e]))throw new Error(`AccessibleMenu: The "${e}" element cannot be set through _setDOMElementType.`);t!==this.dom.menu&&f(HTMLElement,{base:t});const o=Array.from(t.querySelectorAll(this.selectors[e])).filter(l=>l.parentElement===t);s?this._dom[e]=o:this._dom[e]=[...this._dom[e],...o]}else throw new Error(`AccessibleMenu: "${e}" is not a valid element type within the menu.`)}_resetDOMElementType(e){if(typeof this.dom[e]<"u"){if(!Array.isArray(this.dom[e]))throw new Error(`AccessibleMenu: The "${e}" element cannot be reset through _resetDOMElementType.`);this._dom[e]=[]}else throw new Error(`AccessibleMenu: "${e}" is not a valid element type within the menu.`)}_setDOMElements(){this._setDOMElementType("menuItems"),this.selectors.submenuItems!==""&&(this._setDOMElementType("submenuItems"),this._resetDOMElementType("submenuToggles"),this._resetDOMElementType("submenus"),this.dom.submenuItems.forEach(e=>{this._setDOMElementType("submenuToggles",e,!1),this._setDOMElementType("submenus",e,!1)}))}_findRootMenu(e){if(e.isTopLevel)this._elements.rootMenu=e;else if(e.elements.parentMenu!==null)this._findRootMenu(e.elements.parentMenu);else throw new Error("Cannot find root menu.")}_createChildElements(){this.dom.menuItems.forEach(e=>{let t;if(this.dom.submenuItems.includes(e)){const s=e.querySelector(this.selectors.submenuToggles),i=e.querySelector(this.selectors.submenus),o=new this._MenuType({menuElement:i,menuItemSelector:this.selectors.menuItems,menuLinkSelector:this.selectors.menuLinks,submenuItemSelector:this.selectors.submenuItems,submenuToggleSelector:this.selectors.submenuToggles,submenuSelector:this.selectors.submenus,openClass:this.openClass,closeClass:this.closeClass,transitionClass:this.transitionClass,isTopLevel:!1,parentMenu:this,hoverType:this.hoverType,hoverDelay:this.hoverDelay,enterDelay:this.enterDelay,leaveDelay:this.leaveDelay}),l=new this._MenuToggleType({menuToggleElement:s,parentElement:e,controlledMenu:o,parentMenu:this});this._elements.submenuToggles.push(l),t=new this._MenuItemType({menuItemElement:e,menuLinkElement:s,parentMenu:this,isSubmenuItem:!0,childMenu:o,toggle:l})}else{const s=e.querySelector(this.selectors.menuLinks);t=new this._MenuItemType({menuItemElement:e,menuLinkElement:s,parentMenu:this})}this._elements.menuItems.push(t)})}_clearTimeout(){clearTimeout(this._hoverTimeout)}_setTimeout(e,t){u("function",{callback:e}),u("number",{delay:t}),this._hoverTimeout=setTimeout(e,t)}_handleFocus(){this.elements.menuItems.forEach((e,t)=>{e.dom.link.addEventListener("focus",()=>{this.focusState="self",this.currentChild=t})})}_handleClick(){function e(t,s,i){c(i),s.toggle(),s.isOpen&&(t.focusState="self",s.elements.controlledMenu.focusState="none")}this.elements.menuItems.forEach((t,s)=>{t.dom.link.addEventListener("pointerdown",()=>{this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this._clearTimeout(),this.focusChild(s)},{passive:!0}),t.isSubmenuItem&&t.elements.toggle.dom.toggle.addEventListener("pointerup",i=>{this.currentEvent="mouse",e(this,t.elements.toggle,i)})}),this.isTopLevel&&this.elements.controller&&this.elements.controller.dom.toggle.addEventListener("pointerup",t=>{this.currentEvent="mouse",e(this,this.elements.controller,t)}),document.addEventListener("pointerup",t=>{this.focusState!=="none"&&(this.currentEvent="mouse",!this.dom.menu.contains(t.target)&&!this.dom.menu!==t.target&&(this.elements.rootMenu.hasOpened=this.elements.submenuToggles.some(s=>s.isOpen)))})}_handleHover(){this.elements.menuItems.forEach((e,t)=>{e.dom.link.addEventListener("pointerenter",s=>{s.pointerType==="pen"||s.pointerType==="touch"||(this.hoverType==="on"?(this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this.focusChild(t),e.isSubmenuItem&&(this.enterDelay>0?(this._clearTimeout(),this._setTimeout(()=>{e.elements.toggle.preview()},this.enterDelay)):e.elements.toggle.preview())):this.hoverType==="dynamic"&&(this.currentChild=t,(!this.isTopLevel||this.focusState!=="none")&&(this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this.focusCurrentChild()),(!this.isTopLevel||this.hasOpened)&&(this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this.focusCurrentChild(),e.isSubmenuItem?this.enterDelay>0?(this._clearTimeout(),this._setTimeout(()=>{e.elements.toggle.preview()},this.enterDelay)):e.elements.toggle.preview():this.enterDelay>0?(this._clearTimeout(),this._setTimeout(()=>{this.closeChildren()},this.enterDelay)):this.closeChildren())))}),e.isSubmenuItem&&(e.dom.item.addEventListener("pointerleave",s=>{s.pointerType==="pen"||s.pointerType==="touch"||(this.hoverType==="on"?this.leaveDelay>0?(this._clearTimeout(),this._setTimeout(()=>{this.currentEvent="mouse",e.elements.toggle.close()},this.leaveDelay)):(this.currentEvent="mouse",e.elements.toggle.close()):this.hoverType==="dynamic"&&(this.leaveDelay>0?(this._clearTimeout(),this._setTimeout(()=>{this.currentEvent="mouse"},this.leaveDelay)):this.currentEvent="mouse"))}),e.dom.item.addEventListener("pointerenter",s=>{s.pointerType==="pen"||s.pointerType==="touch"||e.isSubmenuItem&&(this.hoverType==="on"||this.hoverType==="dynamic")&&this.leaveDelay>0&&this._clearTimeout()}))})}_handleKeydown(){this.isTopLevel&&this.elements.controller&&this.elements.controller.dom.toggle.addEventListener("keydown",e=>{this.currentEvent="keyboard";const t=_(e);(t==="Space"||t==="Enter")&&c(e)})}_handleKeyup(){this.isTopLevel&&this.elements.controller&&this.elements.controller.dom.toggle.addEventListener("keyup",e=>{this.currentEvent="keyboard";const t=_(e);(t==="Space"||t==="Enter")&&(c(e),this.elements.controller.toggle(),this.elements.controller.isOpen&&this.focusFirstChild())})}focus(){this.focusState="self",this.shouldFocus&&this.dom.menu.focus()}blur(){this.focusState="none",this.shouldFocus&&this.dom.menu.blur()}focusCurrentChild(){this.focusState="self",this.currentChild!==-1&&this.currentMenuItem.focus()}focusChild(e){this.blurCurrentChild(),this.currentChild=e,this.focusCurrentChild()}focusFirstChild(){this.focusChild(0)}focusLastChild(){this.focusChild(this.elements.menuItems.length-1)}focusNextChild(){this.currentChild<this.elements.menuItems.length-1?this.focusChild(this.currentChild+1):this.focusCurrentChild()}focusPreviousChild(){this.currentChild>0?this.focusChild(this.currentChild-1):this.focusCurrentChild()}blurCurrentChild(){this.focusState="none",this.currentChild!==-1&&this.currentMenuItem.blur()}focusController(){this.dom.controller&&(this.shouldFocus&&this.dom.controller.focus(),this.focusState="none")}focusContainer(){this.dom.container&&(this.shouldFocus&&this.dom.container.focus(),this.focusState="none")}closeChildren(){this.elements.submenuToggles.forEach(e=>e.close())}blurChildren(){this.elements.menuItems.forEach(e=>{e.blur(),e.isSubmenuItem&&e.elements.childMenu.blurChildren()})}}class j extends O{constructor({menuItemElement:e,menuLinkElement:t,parentMenu:s,isSubmenuItem:i=!1,childMenu:o=null,toggle:l=null,initialize:d=!0}){super({menuItemElement:e,menuLinkElement:t,parentMenu:s,isSubmenuItem:i,childMenu:o,toggle:l}),d&&this.initialize()}}class K extends L{constructor({menuToggleElement:e,parentElement:t,controlledMenu:s,parentMenu:i=null,initialize:o=!0}){super({menuToggleElement:e,parentElement:t,controlledMenu:s,parentMenu:i}),o&&this.initialize()}_setAriaAttributes(){super._setAriaAttributes(),A("button",{toggle:this.dom.toggle})||this.dom.toggle.setAttribute("role","button"),this.dom.toggle.setAttribute("aria-controls",this.elements.controlledMenu.dom.menu.id)}open(){this.closeSiblings(),super.open()}preview(){this.closeSiblings(),super.preview()}close(){this.isOpen&&this.closeChildren(),super.close()}}class E extends y{constructor({menuElement:t,menuItemSelector:s="li",menuLinkSelector:i="a",submenuItemSelector:o="li:has(ul)",submenuToggleSelector:l="button",submenuSelector:d="ul",controllerElement:g=null,containerElement:h=null,openClass:M="show",closeClass:T="hide",transitionClass:b="transitioning",isTopLevel:v=!0,parentMenu:w=null,hoverType:S="off",hoverDelay:D=250,enterDelay:k=-1,leaveDelay:V=-1,optionalKeySupport:q=!1,initialize:x=!0}){super({menuElement:t,menuItemSelector:s,menuLinkSelector:i,submenuItemSelector:o,submenuToggleSelector:l,submenuSelector:d,controllerElement:g,containerElement:h,openClass:M,closeClass:T,transitionClass:b,isTopLevel:v,parentMenu:w,hoverType:S,hoverDelay:D,enterDelay:k,leaveDelay:V});r(this,"_MenuType",E);r(this,"_MenuItemType",j);r(this,"_MenuToggleType",K);r(this,"_currentChild",-1);r(this,"_optionalSupport",!1);this._optionalSupport=q,x&&this.initialize()}initialize(){try{super.initialize(),this._handleFocus(),this._handleClick(),this._handleHover(),this._handleKeydown(),this._handleKeyup()}catch(t){console.error(t)}}get optionalKeySupport(){return this.isTopLevel?this._optionalSupport:this.elements.rootMenu.optionalKeySupport}set optionalKeySupport(t){u("boolean",{optionalKeySupport:t}),this._optionalSupport=t}_validate(){let t=super._validate();const s=u("boolean",{optionalKeySupport:this._optionalSupport});return s.status||(this._errors.push(s.error.message),t=!1),t}_handleClick(){super._handleClick(),document.addEventListener("pointerup",t=>{this.focusState!=="none"&&(this.currentEvent="mouse",!this.dom.menu.contains(t.target)&&!this.dom.menu!==t.target&&(this.closeChildren(),this.blur(),this.elements.controller&&this.elements.controller.close(),this.elements.rootMenu.hasOpened=!1))})}_handleKeydown(){super._handleKeydown(),this.dom.menu.addEventListener("keydown",t=>{this.currentEvent="keyboard";const s=_(t);if(this.focusState==="self"){const i=["Space","Enter"],o=["Escape"],l=["Escape"];this.optionalKeySupport?["ArrowUp","ArrowRight","ArrowDown","ArrowLeft","Home","End"].includes(s)&&c(t):(this.currentMenuItem.isSubmenuItem&&i.includes(s)||this.elements.controller&&o.includes(s)||this.elements.parentMenu&&l.includes(s))&&c(t)}})}_handleKeyup(){super._handleKeyup(),this.dom.menu.addEventListener("keyup",t=>{this.currentEvent="keyboard";const s=_(t);this.focusState==="self"&&(s==="Space"||s==="Enter"?this.currentMenuItem.isSubmenuItem?(c(t),this.currentMenuItem.elements.toggle.isOpen?this.currentMenuItem.elements.toggle.close():this.currentMenuItem.elements.toggle.preview()):this.currentMenuItem.dom.link.click():s==="Escape"?this.elements.submenuToggles.some(o=>o.isOpen)?(c(t),this.closeChildren()):this.elements.parentMenu?(c(t),this.elements.parentMenu.currentEvent=this.currentEvent,this.elements.parentMenu.closeChildren(),this.elements.parentMenu.focusCurrentChild()):this.isTopLevel&&this.elements.controller&&this.elements.controller.isOpen&&(this.elements.controller.close(),this.focusController()):this.optionalKeySupport&&(s==="ArrowDown"||s==="ArrowRight"?(c(t),this.currentMenuItem.isSubmenuItem&&this.currentMenuItem.elements.toggle.isOpen?(this.currentMenuItem.elements.childMenu.currentEvent="keyboard",this.currentMenuItem.elements.childMenu.focusFirstChild()):this.focusNextChild()):s==="ArrowUp"||s==="ArrowLeft"?(c(t),this.focusPreviousChild()):s==="Home"?(c(t),this.focusFirstChild()):s==="End"&&(c(t),this.focusLastChild())))})}}return E}();
