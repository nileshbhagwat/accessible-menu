var Treeview=function(){"use strict";var N=Object.defineProperty;var q=(d,a,y)=>a in d?N(d,a,{enumerable:!0,configurable:!0,writable:!0,value:y}):d[a]=y;var o=(d,a,y)=>q(d,typeof a!="symbol"?a+"":a,y);function d(n,e){typeof n=="string"?e.classList.add(n):e.classList.add(...n)}function a(n,e){typeof n=="string"?e.classList.remove(n):e.classList.remove(...n)}function y(n,e){try{if(typeof e!="object"){const t=typeof e;throw new TypeError(`Elements given to isValidInstance() must be inside of an object. "${t}" given.`)}for(const t in e)if(!(e[t]instanceof n)){const s=typeof e[t];throw new TypeError(`${t} must be an instance of ${n.name}. "${s}" given.`)}return{status:!0,error:null}}catch(t){return{status:!1,error:t}}}function _(n,e){try{if(typeof e!="object"){const t=typeof e;throw new TypeError(`Values given to isValidType() must be inside of an object. "${t}" given.`)}for(const t in e){const s=typeof e[t];if(s!==n)throw new TypeError(`${t} must be a ${n}. "${s}" given.`)}return{status:!0,error:null}}catch(t){return{status:!1,error:t}}}function E(n){try{if(typeof n!="object"){const e=typeof n;throw new TypeError(`Values given to isQuerySelector() must be inside of an object. "${e}" given.`)}for(const e in n)try{if(n[e]===null)throw new Error;document.querySelector(n[e])}catch{throw new TypeError(`${e} must be a valid query selector. "${n[e]}" given.`)}return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function b(n){try{if(typeof n!="object"||Array.isArray(n)){const e=typeof n;throw new TypeError(`Values given to isValidClassList() must be inside of an object. "${e}" given.`)}for(const e in n){const t=typeof n[e];if(t!=="string")if(Array.isArray(n[e]))n[e].forEach(s=>{if(typeof s!="string")throw new TypeError(`${e} must be a string or an array of strings. An array containing non-strings given.`)});else throw new TypeError(`${e} must be a string or an array of strings. "${t}" given.`);else{const s={};s[e]=n[e],E(s)}}return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function $(n){try{if(typeof n!="object"){const t=typeof n;throw new TypeError(`Values given to isValidState() must be inside of an object. "${t}" given.`)}const e=["none","self","child"];for(const t in n)if(!e.includes(n[t]))throw new TypeError(`${t} must be one of the following values: ${e.join(", ")}. "${n[t]}" given.`);return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function x(n){try{if(typeof n!="object"){const t=typeof n;throw new TypeError(`Values given to isValidEvent() must be inside of an object. "${t}" given.`)}const e=["none","mouse","keyboard","character"];for(const t in n)if(!e.includes(n[t]))throw new TypeError(`${t} must be one of the following values: ${e.join(", ")}. "${n[t]}" given.`);return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function A(n){try{if(typeof n!="object"){const t=typeof n;throw new TypeError(`Values given to isValidHoverType() must be inside of an object. "${t}" given.`)}const e=["off","on","dynamic"];for(const t in n)if(!e.includes(n[t]))throw new TypeError(`${t} must be one of the following values: ${e.join(", ")}. "${n[t]}" given.`);return{status:!0,error:null}}catch(e){return{status:!1,error:e}}}function D(n,e){if(_("string",{tagName:n}).status&&y(HTMLElement,e).status){const t=n.toLowerCase();let s=!0;for(const i in e)e[i].tagName.toLowerCase()!==t&&(s=!1);return s}else return!1}class L{constructor({menuToggleElement:e,parentElement:t,controlledMenu:s,parentMenu:i=null}){o(this,"_dom",{toggle:null,parent:null});o(this,"_elements",{controlledMenu:null,parentMenu:null});o(this,"_open",!1);o(this,"_expandEvent",new CustomEvent("accessibleMenuExpand",{bubbles:!0,detail:{toggle:this}}));o(this,"_collapseEvent",new CustomEvent("accessibleMenuCollapse",{bubbles:!0,detail:{toggle:this}}));this._dom.toggle=e,this._dom.parent=t,this._elements.controlledMenu=s,this._elements.parentMenu=i}initialize(){this._setIds(),this._setAriaAttributes(),this._collapse(!1)}get dom(){return this._dom}get elements(){return this._elements}get isOpen(){return this._open}set isOpen(e){_("boolean",{value:e}),this._open=e}_setIds(){var e;if(this.dom.toggle.id===""||this.elements.controlledMenu.dom.menu.id===""){const t=Math.random().toString(36).replace(/[^a-z]+/g,"").substring(0,10);let s=((e=this.dom.toggle.innerText)==null?void 0:e.replace(/[^a-zA-Z0-9\s]/g,""))||"",i=t;!s.replace(/\s/g,"").length&&this.dom.toggle.getAttribute("aria-label")&&(s=this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g,"")),s.replace(/\s/g,"").length>0&&(s=s.toLowerCase().replace(/\s+/g,"-"),s.startsWith("-")&&(s=s.substring(1)),s.endsWith("-")&&(s=s.slice(0,-1)),i=`${s}-${i}`),this.dom.toggle.id=this.dom.toggle.id||`menu-button-${i}`,this.elements.controlledMenu.dom.menu.id=this.elements.controlledMenu.dom.menu.id||`menu-${i}`}}_setAriaAttributes(){this.dom.toggle.setAttribute("aria-haspopup","true"),this.dom.toggle.setAttribute("aria-expanded","false"),D("button",{toggle:this.dom.toggle})||this.dom.toggle.setAttribute("role","button"),this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby",this.dom.toggle.id),this.dom.toggle.setAttribute("aria-controls",this.elements.controlledMenu.dom.menu.id)}_expand(e=!0){const{closeClass:t,openClass:s,transitionClass:i}=this.elements.controlledMenu;this.dom.toggle.setAttribute("aria-expanded","true"),i!==""?(d(i,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{t!==""&&a(t,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{s!==""&&d(s,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{a(i,this.elements.controlledMenu.dom.menu)})})})):(s!==""&&d(s,this.elements.controlledMenu.dom.menu),t!==""&&a(t,this.elements.controlledMenu.dom.menu)),e&&this.dom.toggle.dispatchEvent(this._expandEvent)}_collapse(e=!0){const{closeClass:t,openClass:s,transitionClass:i}=this.elements.controlledMenu;this.dom.toggle.setAttribute("aria-expanded","false"),i!==""?(d(i,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{s!==""&&a(s,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{t!==""&&d(t,this.elements.controlledMenu.dom.menu),requestAnimationFrame(()=>{a(i,this.elements.controlledMenu.dom.menu)})})})):(t!==""&&d(t,this.elements.controlledMenu.dom.menu),s!==""&&a(s,this.elements.controlledMenu.dom.menu)),e&&this.dom.toggle.dispatchEvent(this._collapseEvent)}open(){this.elements.controlledMenu.focusState="self",this.isOpen||(this._expand(),this.isOpen=!0)}preview(){this.elements.parentMenu&&(this.elements.parentMenu.focusState="self"),this.isOpen||(this._expand(),this.isOpen=!0)}close(){this.isOpen&&(this.elements.controlledMenu.blur(),this.elements.parentMenu&&(this.elements.parentMenu.focusState="self"),this._collapse(),this.isOpen=!1)}toggle(){this.isOpen?this.close():this.open()}closeSiblings(){this.elements.parentMenu&&this.elements.parentMenu.elements.submenuToggles.forEach(e=>{e!==this&&e.close()})}closeChildren(){this.elements.controlledMenu.elements.submenuToggles.forEach(e=>e.close())}}class O{constructor({menuItemElement:e,menuLinkElement:t,parentMenu:s,isSubmenuItem:i=!1,childMenu:r=null,toggle:l=null}){o(this,"_dom",{item:null,link:null});o(this,"_elements",{parentMenu:null,childMenu:null,toggle:null});o(this,"_submenu",!1);this._dom.item=e,this._dom.link=t,this._elements.parentMenu=s,this._elements.childMenu=r,this._elements.toggle=l,this._submenu=i}initialize(){}get dom(){return this._dom}get elements(){return this._elements}get isSubmenuItem(){return this._submenu}focus(){this.elements.parentMenu.shouldFocus&&this.dom.link.focus()}blur(){this.elements.parentMenu.shouldFocus&&this.dom.link.blur()}}function C(n){try{const e=n.key||n.keyCode,t={Enter:e==="Enter"||e===13,Space:e===" "||e==="Spacebar"||e===32,Escape:e==="Escape"||e==="Esc"||e===27,ArrowUp:e==="ArrowUp"||e==="Up"||e===38,ArrowRight:e==="ArrowRight"||e==="Right"||e===39,ArrowDown:e==="ArrowDown"||e==="Down"||e===40,ArrowLeft:e==="ArrowLeft"||e==="Left"||e===37,Home:e==="Home"||e===36,End:e==="End"||e===35,Character:isNaN(e)&&!!e.match(/^[a-zA-Z]{1}$/),Tab:e==="Tab"||e===9,Asterisk:e==="*"||e===56};return Object.keys(t).find(s=>t[s]===!0)||""}catch{return""}}function c(n){n.preventDefault(),n.stopPropagation()}class M{constructor({menuElement:e,menuItemSelector:t="li",menuLinkSelector:s="a",submenuItemSelector:i="",submenuToggleSelector:r="a",submenuSelector:l="ul",controllerElement:u=null,containerElement:h=null,openClass:m="show",closeClass:f="hide",transitionClass:p="transitioning",isTopLevel:g=!0,parentMenu:v=null,hoverType:w="off",hoverDelay:I=250,enterDelay:k=-1,leaveDelay:S=-1}){o(this,"_MenuType",M);o(this,"_MenuItemType",O);o(this,"_MenuToggleType",L);o(this,"_dom",{menu:null,menuItems:[],submenuItems:[],submenuToggles:[],submenus:[],controller:null,container:null});o(this,"_selectors",{menuItems:"",menuLinks:"",submenuItems:"",submenuToggles:"",submenus:""});o(this,"_elements",{menuItems:[],submenuToggles:[],controller:null,parentMenu:null,rootMenu:null});o(this,"_openClass","show");o(this,"_closeClass","hide");o(this,"_transitionClass","transitioning");o(this,"_root",!0);o(this,"_currentChild",0);o(this,"_focusState","none");o(this,"_currentEvent","none");o(this,"_hoverType","off");o(this,"_hoverDelay",250);o(this,"_enterDelay",-1);o(this,"_leaveDelay",-1);o(this,"_hoverTimeout",null);o(this,"_errors",[]);this._dom.menu=e,this._dom.controller=u,this._dom.container=h,this._selectors.menuItems=t,this._selectors.menuLinks=s,this._selectors.submenuItems=i,this._selectors.submenuToggles=r,this._selectors.submenus=l,this._elements.menuItems=[],this._elements.submenuToggles=[],this._elements.controller=null,this._elements.parentMenu=v,this._elements.rootMenu=g?this:null,this._openClass=m||"",this._closeClass=f||"",this._transitionClass=p||"",this._root=g,this._hoverType=w,this._hoverDelay=I,this._enterDelay=k,this._leaveDelay=S}initialize(){if(!this._validate())throw new Error(`AccesibleMenu: cannot initialize menu. The following errors have been found:
 - ${this.errors.join(`
 - `)}`);if(this.elements.rootMenu===null&&this._findRootMenu(this),this._setDOMElements(),this.isTopLevel&&this.dom.controller&&this.dom.container){const e=new this._MenuToggleType({menuToggleElement:this.dom.controller,parentElement:this.dom.container,controlledMenu:this});this._elements.controller=e}this._createChildElements()}get dom(){return this._dom}get selectors(){return this._selectors}get elements(){return this._elements}get isTopLevel(){return this._root}get openClass(){return this.isTopLevel?this._openClass:this.elements.rootMenu.openClass}get closeClass(){return this.isTopLevel?this._closeClass:this.elements.rootMenu.closeClass}get transitionClass(){return this.isTopLevel?this._transitionClass:this.elements.rootMenu.transitionClass}get currentChild(){return this._currentChild}get focusState(){return this._focusState}get currentEvent(){return this._currentEvent}get currentMenuItem(){return this.elements.menuItems[this.currentChild]}get hoverType(){return this._root?this._hoverType:this.elements.rootMenu.hoverType}get hoverDelay(){return this._root?this._hoverDelay:this.elements.rootMenu.hoverDelay}get enterDelay(){return this._enterDelay===-1?this.hoverDelay:this._root?this._enterDelay:this.elements.rootMenu.enterDelay}get leaveDelay(){return this._leaveDelay===-1?this.hoverDelay:this._root?this._leaveDelay:this.elements.rootMenu.leaveDelay}get shouldFocus(){let e=!1;return(this.currentEvent==="keyboard"||this.currentEvent==="character")&&(e=!0),this.currentEvent==="mouse"&&this.hoverType==="dynamic"&&(e=!0),e}get errors(){return this._errors}set openClass(e){b({openClass:e}),this._openClass!==e&&(this._openClass=e)}set closeClass(e){b({closeClass:e}),this._closeClass!==e&&(this._closeClass=e)}set transitionClass(e){b({transitionClass:e}),this._transitionClass!==e&&(this._transitionClass=e)}set currentChild(e){_("number",{value:e});function t(s){if(["mouse","character"].includes(s.currentEvent)&&s.elements.parentMenu){let r=0,l=!1;for(;!l&&r<s.elements.parentMenu.elements.menuItems.length;){const u=s.elements.parentMenu.elements.menuItems[r];u.isSubmenuItem&&u.elements.toggle.elements.controlledMenu===s&&(l=!0,s.elements.parentMenu.currentEvent=s.currentEvent,s.elements.parentMenu.currentChild=r),r++}}}e<-1?(this._currentChild=-1,t(this)):e>=this.elements.menuItems.length?(this._currentChild=this.elements.menuItems.length-1,t(this)):this.focusChild!==e&&(this._currentChild=e,t(this))}set focusState(e){$({value:e}),this._focusState!==e&&(this._focusState=e),this.elements.submenuToggles.length>0&&(e==="self"||e==="none")&&this.elements.submenuToggles.forEach(t=>{t.elements.controlledMenu.focusState="none"}),this.elements.parentMenu&&(e==="self"||e==="child")&&(this.elements.parentMenu.focusState="child")}set currentEvent(e){x({value:e}),this._currentEvent!==e&&(this._currentEvent=e,this.elements.submenuToggles.length>0&&this.elements.submenuToggles.forEach(t=>{t.elements.controlledMenu.currentEvent=e}))}set hoverType(e){A({value:e}),this._hoverType!==e&&(this._hoverType=e)}set hoverDelay(e){_("number",{value:e}),this._hoverDelay!==e&&(this._hoverDelay=e)}set enterDelay(e){_("number",{value:e}),this._enterDelay!==e&&(this._enterDelay=e)}set leaveDelay(e){_("number",{value:e}),this._leaveDelay!==e&&(this._leaveDelay=e)}_validate(){let e=!0,t;this._dom.container!==null||this._dom.controller!==null?t=y(HTMLElement,{menuElement:this._dom.menu,controllerElement:this._dom.controller,containerElement:this._dom.container}):t=y(HTMLElement,{menuElement:this._dom.menu}),t.status||(this._errors.push(t.error.message),e=!1);let s;if(this._selectors.submenuItems!==""?s=E({menuItemSelector:this._selectors.menuItems,menuLinkSelector:this._selectors.menuLinks,submenuItemSelector:this._selectors.submenuItems,submenuToggleSelector:this._selectors.submenuToggles,submenuSelector:this._selectors.submenus}):s=E({menuItemSelector:this._selectors.menuItems,menuLinkSelector:this._selectors.menuLinks}),s.status||(this._errors.push(s.error.message),e=!1),this._openClass!==""){const m=b({openClass:this._openClass});m.status||(this._errors.push(m.error.message),e=!1)}if(this._closeClass!==""){const m=b({closeClass:this._closeClass});m.status||(this._errors.push(m.error.message),e=!1)}if(this._transitionClass!==""){const m=b({transitionClass:this._transitionClass});m.status||(this._errors.push(m.error.message),e=!1)}const i=_("boolean",{isTopLevel:this._root});if(i.status||(this._errors.push(i.error.message),e=!1),this._elements.parentMenu!==null){const m=y(M,{parentMenu:this._elements.parentMenu});m.status||(this._errors.push(m.error.message),e=!1)}const r=A({hoverType:this._hoverType});r.status||(this._errors.push(r.error.message),e=!1);const l=_("number",{hoverDelay:this._hoverDelay});l.status||(this._errors.push(l.error.message),e=!1);const u=_("number",{enterDelay:this._enterDelay});u.status||(this._errors.push(u.error.message),e=!1);const h=_("number",{leaveDelay:this._leaveDelay});return h.status||(this._errors.push(h.error.message),e=!1),e}_setDOMElementType(e,t=this.dom.menu,s=!0){if(typeof this.selectors[e]=="string"){if(!Array.isArray(this.dom[e]))throw new Error(`AccessibleMenu: The "${e}" element cannot be set through _setDOMElementType.`);t!==this.dom.menu&&y(HTMLElement,{base:t});const r=Array.from(t.querySelectorAll(this.selectors[e])).filter(l=>l.parentElement===t);s?this._dom[e]=r:this._dom[e]=[...this._dom[e],...r]}else throw new Error(`AccessibleMenu: "${e}" is not a valid element type within the menu.`)}_resetDOMElementType(e){if(typeof this.dom[e]<"u"){if(!Array.isArray(this.dom[e]))throw new Error(`AccessibleMenu: The "${e}" element cannot be reset through _resetDOMElementType.`);this._dom[e]=[]}else throw new Error(`AccessibleMenu: "${e}" is not a valid element type within the menu.`)}_setDOMElements(){this._setDOMElementType("menuItems"),this.selectors.submenuItems!==""&&(this._setDOMElementType("submenuItems"),this._resetDOMElementType("submenuToggles"),this._resetDOMElementType("submenus"),this.dom.submenuItems.forEach(e=>{this._setDOMElementType("submenuToggles",e,!1),this._setDOMElementType("submenus",e,!1)}))}_findRootMenu(e){if(e.isTopLevel)this._elements.rootMenu=e;else if(e.elements.parentMenu!==null)this._findRootMenu(e.elements.parentMenu);else throw new Error("Cannot find root menu.")}_createChildElements(){this.dom.menuItems.forEach(e=>{let t;if(this.dom.submenuItems.includes(e)){const s=e.querySelector(this.selectors.submenuToggles),i=e.querySelector(this.selectors.submenus),r=new this._MenuType({menuElement:i,menuItemSelector:this.selectors.menuItems,menuLinkSelector:this.selectors.menuLinks,submenuItemSelector:this.selectors.submenuItems,submenuToggleSelector:this.selectors.submenuToggles,submenuSelector:this.selectors.submenus,openClass:this.openClass,closeClass:this.closeClass,transitionClass:this.transitionClass,isTopLevel:!1,parentMenu:this,hoverType:this.hoverType,hoverDelay:this.hoverDelay,enterDelay:this.enterDelay,leaveDelay:this.leaveDelay}),l=new this._MenuToggleType({menuToggleElement:s,parentElement:e,controlledMenu:r,parentMenu:this});this._elements.submenuToggles.push(l),t=new this._MenuItemType({menuItemElement:e,menuLinkElement:s,parentMenu:this,isSubmenuItem:!0,childMenu:r,toggle:l})}else{const s=e.querySelector(this.selectors.menuLinks);t=new this._MenuItemType({menuItemElement:e,menuLinkElement:s,parentMenu:this})}this._elements.menuItems.push(t)})}_clearTimeout(){clearTimeout(this._hoverTimeout)}_setTimeout(e,t){this._hoverTimeout=setTimeout(e,t)}_handleFocus(){this.elements.menuItems.forEach((e,t)=>{e.dom.link.addEventListener("focus",()=>{this.focusState="self",this.currentChild=t})})}_handleClick(){function e(t,s,i){c(i),s.toggle(),s.isOpen&&(t.focusState="self",s.elements.controlledMenu.focusState="none")}this.elements.menuItems.forEach((t,s)=>{t.dom.link.addEventListener("pointerdown",()=>{this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this._clearTimeout(),this.focusChild(s)},{passive:!0}),t.isSubmenuItem&&t.elements.toggle.dom.toggle.addEventListener("pointerup",i=>{this.currentEvent="mouse",e(this,t.elements.toggle,i)})}),this.isTopLevel&&this.elements.controller&&this.elements.controller.dom.toggle.addEventListener("pointerup",t=>{this.currentEvent="mouse",e(this,this.elements.controller,t)})}_handleHover(){this.elements.menuItems.forEach((e,t)=>{e.dom.link.addEventListener("pointerenter",s=>{if(!(s.pointerType==="pen"||s.pointerType==="touch")){if(this.hoverType==="on")this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this.focusChild(t),e.isSubmenuItem&&(this.enterDelay>0?(this._clearTimeout(),this._setTimeout(()=>{e.elements.toggle.preview()},this.enterDelay)):e.elements.toggle.preview());else if(this.hoverType==="dynamic"){const i=this.elements.submenuToggles.some(r=>r.isOpen);this.currentChild=t,(!this.isTopLevel||this.focusState!=="none")&&(this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this.focusCurrentChild()),e.isSubmenuItem&&(!this.isTopLevel||i)&&(this.currentEvent="mouse",this.elements.rootMenu.blurChildren(),this.focusCurrentChild(),this.enterDelay>0?(this._clearTimeout(),this._setTimeout(()=>{e.elements.toggle.preview()},this.enterDelay)):e.elements.toggle.preview())}}}),e.isSubmenuItem&&(e.dom.item.addEventListener("pointerleave",s=>{s.pointerType==="pen"||s.pointerType==="touch"||(this.hoverType==="on"?this.leaveDelay>0?(this._clearTimeout(),this._setTimeout(()=>{this.currentEvent="mouse",e.elements.toggle.close()},this.leaveDelay)):(this.currentEvent="mouse",e.elements.toggle.close()):this.hoverType==="dynamic"&&(this.isTopLevel||(this.leaveDelay>0?(this._clearTimeout(),this._setTimeout(()=>{this.currentEvent="mouse",e.elements.toggle.close(),this.focusCurrentChild()},this.leaveDelay)):(this.currentEvent="mouse",e.elements.toggle.close(),this.focusCurrentChild()))))}),e.dom.item.addEventListener("pointerenter",s=>{s.pointerType==="pen"||s.pointerType==="touch"||e.isSubmenuItem&&(this.hoverType==="on"||this.hoverType==="dynamic")&&this.leaveDelay>0&&this._clearTimeout()}))})}_handleKeydown(){this.isTopLevel&&this.elements.controller&&this.elements.controller.dom.toggle.addEventListener("keydown",e=>{this.currentEvent="keyboard";const t=C(e);(t==="Space"||t==="Enter")&&c(e)})}_handleKeyup(){this.isTopLevel&&this.elements.controller&&this.elements.controller.dom.toggle.addEventListener("keyup",e=>{this.currentEvent="keyboard";const t=C(e);(t==="Space"||t==="Enter")&&(c(e),this.elements.controller.toggle(),this.elements.controller.isOpen&&this.focusFirstChild())})}focus(){this.focusState="self",this.shouldFocus&&this.dom.menu.focus()}blur(){this.focusState="none",this.shouldFocus&&this.dom.menu.blur()}focusCurrentChild(){this.focusState="self",this.currentChild!==-1&&this.currentMenuItem.focus()}focusChild(e){this.blurCurrentChild(),this.currentChild=e,this.focusCurrentChild()}focusFirstChild(){this.focusChild(0)}focusLastChild(){this.focusChild(this.elements.menuItems.length-1)}focusNextChild(){this.currentChild<this.elements.menuItems.length-1?this.focusChild(this.currentChild+1):this.focusCurrentChild()}focusPreviousChild(){this.currentChild>0?this.focusChild(this.currentChild-1):this.focusCurrentChild()}blurCurrentChild(){this.focusState="none",this.currentChild!==-1&&this.currentMenuItem.blur()}focusController(){this.dom.controller&&(this.shouldFocus&&this.dom.controller.focus(),this.focusState="none")}focusContainer(){this.dom.container&&(this.shouldFocus&&this.dom.container.focus(),this.focusState="none")}closeChildren(){this.elements.submenuToggles.forEach(e=>e.close())}blurChildren(){this.elements.menuItems.forEach(e=>{e.blur(),e.isSubmenuItem&&e.elements.childMenu.blurChildren()})}}class j extends O{constructor({menuItemElement:e,menuLinkElement:t,parentMenu:s,isSubmenuItem:i=!1,childMenu:r=null,toggle:l=null,initialize:u=!0}){super({menuItemElement:e,menuLinkElement:t,parentMenu:s,isSubmenuItem:i,childMenu:r,toggle:l}),u&&this.initialize()}initialize(){super.initialize(),this.dom.item.setAttribute("role","none"),this.dom.link.setAttribute("role","treeitem"),this.dom.link.tabIndex=-1}focus(){super.focus(),this.dom.link.tabIndex=0}blur(){super.blur(),this.dom.link.tabIndex=-1}}class F extends L{constructor({menuToggleElement:e,parentElement:t,controlledMenu:s,parentMenu:i=null,initialize:r=!0}){super({menuToggleElement:e,parentElement:t,controlledMenu:s,parentMenu:i}),r&&this.initialize()}initialize(){this._setIds(),this._setAriaAttributes(),this.dom.toggle.getAttribute("aria-expanded")==="true"?this.open():this._collapse(!1)}_setAriaAttributes(){this.dom.toggle.setAttribute("aria-haspopup","true"),this.dom.toggle.getAttribute("aria-expanded")!=="true"&&this.dom.toggle.setAttribute("aria-expanded","false"),D("button",{toggle:this.dom.toggle})||this.dom.toggle.setAttribute("role","button"),this.elements.controlledMenu.dom.menu.setAttribute("aria-labelledby",this.dom.toggle.id),this.dom.toggle.setAttribute("aria-controls",this.elements.controlledMenu.dom.menu.id)}}class T extends M{constructor({menuElement:t,menuItemSelector:s="li",menuLinkSelector:i="a",submenuItemSelector:r="",submenuToggleSelector:l="a",submenuSelector:u="ul",controllerElement:h=null,containerElement:m=null,openClass:f="show",closeClass:p="hide",transitionClass:g="transitioning",isTopLevel:v=!0,parentMenu:w=null,hoverType:I="off",hoverDelay:k=250,enterDelay:S=-1,leaveDelay:V=-1,initialize:z=!0}){super({menuElement:t,menuItemSelector:s,menuLinkSelector:i,submenuItemSelector:r,submenuToggleSelector:l,submenuSelector:u,controllerElement:h,containerElement:m,openClass:f,closeClass:p,transitionClass:g,isTopLevel:v,parentMenu:w,hoverType:I,hoverDelay:k,enterDelay:S,leaveDelay:V});o(this,"_MenuType",T);o(this,"_MenuItemType",j);o(this,"_MenuToggleType",F);z&&this.initialize()}initialize(){try{super.initialize(),this.isTopLevel?(this.dom.menu.setAttribute("role","tree"),this.elements.menuItems[0].dom.link.tabIndex=0):this.dom.menu.setAttribute("role","group"),this._handleFocus(),this._handleClick(),this._handleHover(),this._handleKeydown(),this._handleKeyup()}catch(t){console.error(t)}}_handleKeydown(){super._handleKeydown(),this.dom.menu.addEventListener("keydown",t=>{this.currentEvent="keyboard";const s=C(t);if(s==="Tab"&&(this.elements.rootMenu.focusState!=="none"?this.elements.rootMenu.blur():this.elements.rootMenu.focus()),this.focusState==="self"){const i=["Space","ArrowUp","ArrowDown","ArrowLeft","Asterisk","Home","End"],r=["Enter","ArrowRight"],l=["Escape"];(i.includes(s)||this.currentMenuItem.isSubmenuItem&&r.includes(s)||this.elements.controller&&l.includes(s))&&c(t)}})}_handleKeyup(){super._handleKeyup(),this.dom.menu.addEventListener("keyup",t=>{this.currentEvent="keyboard";const s=C(t),{altKey:i,crtlKey:r,metaKey:l}=t;if(s==="Character"&&!(i||r||l))c(t),this.elements.rootMenu.currentEvent="character",this.focusNextNodeWithCharacter(t.key);else if(this.focusState==="self")if(s==="Enter"||s==="Space")c(t),this.currentMenuItem.isSubmenuItem?this.currentMenuItem.elements.toggle.isOpen?this.currentMenuItem.elements.toggle.close():this.currentMenuItem.elements.toggle.preview():this.currentMenuItem.dom.link.click();else if(s==="Escape")this.isTopLevel&&this.elements.controller&&this.elements.controller.isOpen&&(this.elements.controller.close(),this.focusController());else if(s==="ArrowDown")c(t),this.currentMenuItem.isSubmenuItem&&this.currentMenuItem.elements.toggle.isOpen?(this.blurCurrentChild(),this.currentMenuItem.elements.childMenu.currentEvent=this.currentEvent,this.currentMenuItem.elements.childMenu.focusFirstChild()):!this.isTopLevel&&this.currentChild===this.elements.menuItems.length-1?this.focusParentsNextChild():this.focusNextChild();else if(s==="ArrowUp"){c(t);const h=this.elements.menuItems[this.currentChild-1];h&&h.isSubmenuItem&&h.elements.toggle.isOpen?(this.blurCurrentChild(),this.currentChild=this.currentChild-1,this.currentMenuItem.elements.childMenu.currentEvent=this.currentEvent,this.focusChildsLastNode()):!this.isTopLevel&&this.currentChild===0?(this.blurCurrentChild(),this.elements.parentMenu.currentEvent=this.currentEvent,this.elements.parentMenu.focusCurrentChild()):this.focusPreviousChild()}else s==="ArrowRight"?this.currentMenuItem.isSubmenuItem&&(c(t),this.currentMenuItem.elements.toggle.isOpen?(this.blurCurrentChild(),this.currentMenuItem.elements.childMenu.currentEvent=this.currentEvent,this.currentMenuItem.elements.childMenu.focusFirstChild()):this.currentMenuItem.elements.toggle.preview()):s==="ArrowLeft"?(c(t),this.currentMenuItem.isSubmenuItem&&this.currentMenuItem.elements.toggle.isOpen?(this.currentMenuItem.elements.childMenu.blurCurrentChild(),this.currentMenuItem.elements.toggle.close()):this.isTopLevel||(this.blurCurrentChild(),this.elements.parentMenu.currentEvent=this.currentEvent,this.elements.parentMenu.focusCurrentChild())):s==="Home"?(c(t),this.blurCurrentChild(),this.elements.rootMenu.focusFirstChild()):s==="End"?(c(t),this.blurCurrentChild(),this.elements.rootMenu.focusLastNode()):s==="Asterisk"&&(c(t),this.openChildren())})}focusLastNode(){const t=this.elements.menuItems.length-1,s=this.elements.menuItems[t];s.isSubmenuItem&&s.elements.toggle.isOpen?(this.currentChild=t,s.elements.childMenu.currentEvent=this.currentEvent,s.elements.childMenu.focusLastNode()):this.focusLastChild()}openChildren(){this.elements.submenuToggles.forEach(t=>t.preview())}focusNextNodeWithCharacter(t){function s(f){let p=[];return f.elements.menuItems.forEach(g=>{p.push(g),g.isSubmenuItem&&g.elements.toggle.isOpen&&(p=[...p,...s(g.elements.toggle.elements.controlledMenu)])}),p}const i=t.toLowerCase(),r=s(this.elements.rootMenu),l=r.indexOf(this.currentMenuItem)+1,u=[...r.slice(l),...r.slice(0,l)];let h=0,m=!1;for(;!m&&h<u.length;){let f="";if(u[h].dom.item.innerText?f=u[h].dom.item.innerText:f=u[h].dom.item.textContent,f=f.replace(/[\s]/g,"").toLowerCase().charAt(0),f===i){m=!0;const p=u[h].elements.parentMenu,g=p.elements.menuItems.indexOf(u[h]);this.elements.rootMenu.blurChildren(),p.focusChild(g)}h++}}focusParentsNextChild(){this.elements.parentMenu&&(this.elements.parentMenu.currentEvent=this.currentEvent,this.elements.parentMenu.currentChild===this.elements.parentMenu.elements.menuItems.length-1?(this.elements.parentMenu.blurCurrentChild(),this.elements.parentMenu.focusParentsNextChild()):(this.blurChildren(),this.elements.parentMenu.focusNextChild()))}focusChildsLastNode(){this.currentMenuItem.elements.childMenu.currentEvent=this.currentEvent,this.currentMenuItem.elements.childMenu.focusLastChild(),this.currentMenuItem.elements.childMenu.currentMenuItem.isSubmenuItem&&this.currentMenuItem.elements.childMenu.currentMenuItem.elements.toggle.isOpen&&(this.currentMenuItem.elements.childMenu.blurCurrentChild(),this.currentMenuItem.elements.childMenu.focusChildsLastNode())}}return T}();
