var j = Object.defineProperty;
var q = (n, e, t) => e in n ? j(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var o = (n, e, t) => q(n, typeof e != "symbol" ? e + "" : e, t);
function _(n, e) {
  n === "" || n.length === 0 || (typeof n == "string" ? e.classList.add(n) : e.classList.add(...n));
}
function y(n, e) {
  n === "" || n.length === 0 || (typeof n == "string" ? e.classList.remove(n) : e.classList.remove(...n));
}
function b(n, e) {
  try {
    if (typeof e != "object") {
      const t = typeof e;
      throw new TypeError(
        `Elements given to isValidInstance() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in e)
      if (!(e[t] instanceof n)) {
        const s = typeof e[t];
        throw new TypeError(
          `${t} must be an instance of ${n.name}. "${s}" given.`
        );
      }
    return {
      status: !0,
      error: null
    };
  } catch (t) {
    return {
      status: !1,
      error: t
    };
  }
}
function h(n, e) {
  try {
    if (typeof e != "object") {
      const t = typeof e;
      throw new TypeError(
        `Values given to isValidType() must be inside of an object. "${t}" given.`
      );
    }
    for (const t in e) {
      const s = typeof e[t];
      if (s !== n)
        throw new TypeError(`${t} must be a ${n}. "${s}" given.`);
    }
    return {
      status: !0,
      error: null
    };
  } catch (t) {
    return {
      status: !1,
      error: t
    };
  }
}
function L(n) {
  try {
    if (typeof n != "object") {
      const e = typeof n;
      throw new TypeError(
        `Values given to isQuerySelector() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in n)
      try {
        if (n[e] === null)
          throw new Error();
        document.querySelector(n[e]);
      } catch {
        throw new TypeError(
          `${e} must be a valid query selector. "${n[e]}" given.`
        );
      }
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function M(n) {
  try {
    if (typeof n != "object" || Array.isArray(n)) {
      const e = typeof n;
      throw new TypeError(
        `Values given to isValidClassList() must be inside of an object. "${e}" given.`
      );
    }
    for (const e in n) {
      const t = typeof n[e];
      if (t !== "string")
        if (Array.isArray(n[e]))
          n[e].forEach((s) => {
            if (typeof s != "string")
              throw new TypeError(
                `${e} must be a string or an array of strings. An array containing non-strings given.`
              );
          });
        else
          throw new TypeError(
            `${e} must be a string or an array of strings. "${t}" given.`
          );
      else {
        const s = {};
        s[e] = n[e], L(s);
      }
    }
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function V(n) {
  try {
    if (typeof n != "object") {
      const t = typeof n;
      throw new TypeError(
        `Values given to isValidState() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["none", "self", "child"];
    for (const t in n)
      if (!e.includes(n[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${n[t]}" given.`
        );
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function z(n) {
  try {
    if (typeof n != "object") {
      const t = typeof n;
      throw new TypeError(
        `Values given to isValidEvent() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["none", "mouse", "keyboard", "character"];
    for (const t in n)
      if (!e.includes(n[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${n[t]}" given.`
        );
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function O(n) {
  try {
    if (typeof n != "object") {
      const t = typeof n;
      throw new TypeError(
        `Values given to isValidHoverType() must be inside of an object. "${t}" given.`
      );
    }
    const e = ["off", "on", "dynamic"];
    for (const t in n)
      if (!e.includes(n[t]))
        throw new TypeError(
          `${t} must be one of the following values: ${e.join(
            ", "
          )}. "${n[t]}" given.`
        );
    return {
      status: !0,
      error: null
    };
  } catch (e) {
    return {
      status: !1,
      error: e
    };
  }
}
function H(n, e) {
  if (h("string", { tagName: n }).status && b(HTMLElement, e).status) {
    const t = n.toLowerCase();
    let s = !0;
    for (const i in e)
      e[i].tagName.toLowerCase() !== t && (s = !1);
    return s;
  } else
    return !1;
}
class x {
  /**
   * Constructs a new `BaseMenuToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {BaseMenu}    options.controlledMenu      - The menu controlled by this toggle.
   * @param {?BaseMenu}   [options.parentMenu = null] - The menu containing this toggle.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null
  }) {
    /**
     * The DOM elements within the menu toggle.
     *
     * @protected
     *
     * @type {Object<HTMLElement>}
     *
     * @property {HTMLElement} toggle - The menu toggle.
     * @property {HTMLElement} parent - The menu containing this toggle.
     */
    o(this, "_dom", {
      toggle: null,
      parent: null
    });
    /**
     * The declared accessible-menu elements within the menu toggle.
     *
     * @protected
     *
     * @type {Object<BaseMenu>}
     *
     * @property {BaseMenu} controlledMenu - The menu controlled by this toggle.
     * @property {BaseMenu} parentMenu     - The menu containing this toggle.
     */
    o(this, "_elements", {
      controlledMenu: null,
      parentMenu: null
    });
    /**
     * The open state of the menu toggle.
     *
     * @protected
     *
     * @type {boolean}
     */
    o(this, "_open", !1);
    /**
     * The event that is triggered when the menu toggle expands.
     *
     * @protected
     *
     * @event accessibleMenuExpand
     *
     * @type {CustomEvent}
     *
     * @property {boolean}                bubbles - A flag to bubble the event.
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    o(this, "_expandEvent", new CustomEvent("accessibleMenuExpand", {
      bubbles: !0,
      detail: { toggle: this }
    }));
    /**
     * The event that is triggered when the menu toggle collapses.
     *
     * @protected
     *
     * @event accessibleMenuCollapse
     *
     * @type {CustomEvent}
     *
     * @property {boolean}                bubbles - A flag to bubble the event.
     * @property {Object<BaseMenuToggle>} details - The details object containing the BaseMenuToggle itself.
     */
    o(this, "_collapseEvent", new CustomEvent("accessibleMenuCollapse", {
      bubbles: !0,
      detail: { toggle: this }
    }));
    this._dom.toggle = e, this._dom.parent = t, this._elements.controlledMenu = s, this._elements.parentMenu = i;
  }
  /**
   * Initializes the menu toggle.
   *
   * The first steps are to ensure that the toggle and controlled menu have IDs
   * using the setIds method, and to set the ARIA attributes on the toggle
   * and controlled menu using the setAriaAttributes method.
   *
   * Then the collapse method is called to make sure the submenu is closed.
   */
  initialize() {
    this._setIds(), this._setAriaAttributes(), this._collapse(!1);
  }
  /**
   * The DOM elements within the toggle.
   *
   * @readonly
   *
   * @type {Object<HTMLElement>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The declared accessible-menu elements within the toggle.
   *
   * @readonly
   *
   * @type {Object<BaseMenu>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * The open state on the toggle.
   *
   * @type {boolean}
   *
   * @see _open
   */
  get isOpen() {
    return this._open;
  }
  set isOpen(e) {
    h("boolean", { value: e }), this._open = e;
  }
  /**
   * Sets unique IDs for the toggle and controlled menu.
   *
   * If the toggle and controlled menu do not have IDs, the following steps take place:
   * - Generate a random string 1-10 characters long,
   * - Get the innerText of the toggle,
   * - Set the toggle's ID to: `menu-button-${toggle-inner-text}-${the-random-string}`
   * - Set the menu's ID to: `menu-${toggle-inner-text}-${the-random-string}`
   *
   * @protected
   */
  _setIds() {
    var e;
    if (this.dom.toggle.id === "" || this.elements.controlledMenu.dom.menu.id === "") {
      const t = Math.random().toString(36).replace(/[^a-z]+/g, "").substring(0, 10);
      let s = ((e = this.dom.toggle.innerText) == null ? void 0 : e.replace(/[^a-zA-Z0-9\s]/g, "")) || "", i = t;
      !s.replace(/\s/g, "").length && this.dom.toggle.getAttribute("aria-label") && (s = this.dom.toggle.getAttribute("aria-label").replace(/[^a-zA-Z0-9\s]/g, "")), s.replace(/\s/g, "").length > 0 && (s = s.toLowerCase().replace(/\s+/g, "-"), s.startsWith("-") && (s = s.substring(1)), s.endsWith("-") && (s = s.slice(0, -1)), i = `${s}-${i}`), this.dom.toggle.id = this.dom.toggle.id || `menu-button-${i}`, this.elements.controlledMenu.dom.menu.id = this.elements.controlledMenu.dom.menu.id || `menu-${i}`;
    }
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * The first steps are to ensure that the toggle has `aria-expanded`
   * is initially set to "false".
   *
   * Then using the toggle and menu's IDs, the menu's `aria-labelledby` is set to
   * the toggle's ID.
   *
   * @protected
   */
  _setAriaAttributes() {
    this.dom.toggle.setAttribute("aria-expanded", "false"), this.elements.controlledMenu.dom.menu.setAttribute(
      "aria-labelledby",
      this.dom.toggle.id
    );
  }
  /**
   * Expands the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "true", adds the
   * open class to the toggle's parent menu item
   * and controlled menu, and removes the closed class
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called accessibleMenuExpand
   *
   * @protected
   *
   * @fires accessibleMenuExpand
   *
   * @param {boolean} [emit = true] - A toggle to emit the expand event once expanded.
   */
  _expand(e = !0) {
    const { closeClass: t, openClass: s, transitionClass: i, openDuration: r } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "true"), this.elements.controlledMenu.elements.rootMenu.hasOpened = !0, i !== "" ? (_(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      y(t, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        _(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          setTimeout(() => {
            y(
              i,
              this.elements.controlledMenu.dom.menu
            );
          }, r);
        });
      });
    })) : (_(s, this.elements.controlledMenu.dom.menu), y(t, this.elements.controlledMenu.dom.menu)), e && this.dom.toggle.dispatchEvent(this._expandEvent);
  }
  /**
   * Collapses the controlled menu.
   *
   * Sets the toggle's `aria-expanded` to "false", adds the
   * closed class to the toggle's parent menu item
   * and controlled menu, and removes the open class
   * from the toggle's parent menu item and controlled menu.
   *
   * If `emit` is set to `true`, this will also emit a custom event
   * called accessibleMenuCollapse
   *
   * @protected
   *
   * @fires accessibleMenuCollapse
   *
   * @param {boolean} [emit = true] - A toggle to emit the collapse event once collapsed.
   */
  _collapse(e = !0) {
    const { closeClass: t, openClass: s, transitionClass: i, closeDuration: r } = this.elements.controlledMenu;
    this.dom.toggle.setAttribute("aria-expanded", "false"), i !== "" ? (_(i, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
      y(s, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
        _(t, this.elements.controlledMenu.dom.menu), requestAnimationFrame(() => {
          setTimeout(() => {
            y(
              i,
              this.elements.controlledMenu.dom.menu
            );
          }, r);
        });
      });
    })) : (_(t, this.elements.controlledMenu.dom.menu), y(s, this.elements.controlledMenu.dom.menu)), e && this.dom.toggle.dispatchEvent(this._collapseEvent);
  }
  /**
   * Opens the controlled menu.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child", calls expand,
   * and sets the isOpen value to `true`.
   *
   * @public
   */
  open() {
    this.elements.controlledMenu.focusState = "self", this.isOpen || (this._expand(), this.isOpen = !0);
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Sets the controlled menu's focus state to "self"
   * and the parent menu's focus state to "child",
   * and calls expand.
   *
   * @public
   */
  preview() {
    this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this.isOpen || (this._expand(), this.isOpen = !0);
  }
  /**
   * Closes the controlled menu.
   *
   * Sets the controlled menu's focus state to "none"
   * and the parent menu's focus state to "self", blurs the controlled menu
   * and sets it's current child index to 0,
   * calls collapse, and sets
   * the isOpen value to `false`.
   *
   * @public
   */
  close() {
    this.isOpen && (this.elements.controlledMenu.blur(), this.elements.parentMenu && (this.elements.parentMenu.focusState = "self"), this._collapse(), this.isOpen = !1);
  }
  /**
   * Toggles the open state of the controlled menu between `true` and `false`.
   *
   * @public
   */
  toggle() {
    this.isOpen ? this.close() : this.open();
  }
  /**
   * Closes all sibling menus.
   *
   * @public
   */
  closeSiblings() {
    this.elements.parentMenu && this.elements.parentMenu.elements.submenuToggles.forEach((e) => {
      e !== this && e.close();
    });
  }
  /**
   * Closes all child menus.
   *
   * @public
   */
  closeChildren() {
    this.elements.controlledMenu.elements.submenuToggles.forEach(
      (e) => e.close()
    );
  }
}
class $ {
  /**
   * Constructs a new `BaseMenuItem`.
   *
   * @param {object}          options                         - The options for generating the menu item.
   * @param {HTMLElement}     options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}     options.menuLinkElement         - The menu item's link in the DOM.
   * @param {BaseMenu}        options.parentMenu              - The parent menu.
   * @param {boolean}         [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?BaseMenu}       [options.childMenu = null]      - The child menu.
   * @param {?BaseMenuToggle} [options.toggle = null]         - The controller for the child menu.
   */
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: i = !1,
    childMenu: r = null,
    toggle: l = null
  }) {
    /**
     * The DOM elements within the menu item.
     *
     * @protected
     *
     * @type {Object<HTMLElement>}
     *
     * @property {HTMLElement} item - The menu item.
     * @property {HTMLElement} link - The menu item's link.
     */
    o(this, "_dom", {
      item: null,
      link: null
    });
    /**
     * The declared accessible-menu elements within the menu item.
     *
     * @protected
     *
     * @type {Object<BaseMenu, BaseMenuToggle>}
     *
     * @property {BaseMenu}        parentMenu - The menu containing this menu item.
     * @property {?BaseMenu}       childMenu  - The menu contained within this menu item.
     * @property {?BaseMenuToggle} toggle     - The menu toggle within this menu item that controls the `childMenu`.
     */
    o(this, "_elements", {
      parentMenu: null,
      childMenu: null,
      toggle: null
    });
    /**
     * A flag marking a submenu item.
     *
     * @protected
     *
     * @type {boolean}
     */
    o(this, "_submenu", !1);
    this._dom.item = e, this._dom.link = t, this._elements.parentMenu = s, this._elements.childMenu = r, this._elements.toggle = l, this._submenu = i;
  }
  /**
   * Initialize the menu item.
   */
  initialize() {
  }
  /**
   * The DOM elements within the menu item.
   *
   * @readonly
   *
   * @type {Object<HTMLElement>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The declared accessible-menu elements within the menu item.
   *
   * @readonly
   *
   * @type {Object<BaseMenu, BaseMenuToggle>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * A flag marking a submenu item.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _submenu
   */
  get isSubmenuItem() {
    return this._submenu;
  }
  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * @public
   */
  focus() {
    this.elements.parentMenu.shouldFocus && requestAnimationFrame(() => {
      this.dom.link.focus();
    });
  }
  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * @public
   */
  blur() {
    this.elements.parentMenu.shouldFocus && requestAnimationFrame(() => {
      this.dom.link.blur();
    });
  }
}
function E(n) {
  try {
    const e = n.key || n.keyCode, t = {
      Enter: e === "Enter" || e === 13,
      Space: e === " " || e === "Spacebar" || e === 32,
      Escape: e === "Escape" || e === "Esc" || e === 27,
      ArrowUp: e === "ArrowUp" || e === "Up" || e === 38,
      ArrowRight: e === "ArrowRight" || e === "Right" || e === 39,
      ArrowDown: e === "ArrowDown" || e === "Down" || e === 40,
      ArrowLeft: e === "ArrowLeft" || e === "Left" || e === 37,
      Home: e === "Home" || e === 36,
      End: e === "End" || e === 35,
      Character: isNaN(e) && !!e.match(/^[a-zA-Z]{1}$/),
      Tab: e === "Tab" || e === 9,
      Asterisk: e === "*" || e === 56
    };
    return Object.keys(t).find((s) => t[s] === !0) || "";
  } catch {
    return "";
  }
}
function u(n) {
  n.preventDefault(), n.stopPropagation();
}
class T {
  /**
   * Constructs a new `BaseMenu`.
   *
   * @param {object}             options                                    - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                        - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]         - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]          - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                 - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]  - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]         - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.openDuration = -1]                - The duration of the transition from "closed" to "open" states (in milliseconds).
   * @param {boolean}            [options.closeDuration = -1]               - The duration of the transition from "open" to "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = false]               - A flag to mark the root menu.
   * @param {?BaseMenu}          [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                  - The delay for opening menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                  - The delay for closing menus if the menu is hoverable (in milliseconds).
   * @param {?string}            [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   */
  constructor({
    menuElement: e,
    menuItemSelector: t = "li",
    menuLinkSelector: s = "a",
    submenuItemSelector: i = "li:has(ul)",
    submenuToggleSelector: r = "a",
    submenuSelector: l = "ul",
    controllerElement: a = null,
    containerElement: c = null,
    openClass: f = "show",
    closeClass: d = "hide",
    transitionClass: p = "transitioning",
    transitionDuration: g = 250,
    openDuration: m = -1,
    closeDuration: D = -1,
    isTopLevel: C = !0,
    parentMenu: w = null,
    hoverType: I = "off",
    hoverDelay: v = 250,
    enterDelay: k = -1,
    leaveDelay: S = -1,
    prefix: A = "am-"
  }) {
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof BaseMenu}
     */
    o(this, "_MenuType", T);
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof BaseMenuItem}
     */
    o(this, "_MenuItemType", $);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof BaseMenuToggle}
     */
    o(this, "_MenuToggleType", x);
    /**
     * The DOM elements within the menu.
     *
     * @protected
     *
     * @type {Object<HTMLElement, HTMLElement[]>}
     *
     * @property {HTMLElement}   menu           - The menu element.
     * @property {HTMLElement[]} menuItems      - An array of menu items.
     * @property {HTMLElement[]} submenuItems   - An array of menu items that also contain submenu elements.
     * @property {HTMLElement[]} submenuToggles - An array of menu links that function as submenu toggles.
     * @property {HTMLElement[]} submenus       - An array of submenu elements.
     * @property {HTMLElement}   controller     - The toggle for this menu.
     * @property {HTMLElement}   container      - The container for this menu.
     */
    o(this, "_dom", {
      menu: null,
      menuItems: [],
      submenuItems: [],
      submenuToggles: [],
      submenus: [],
      controller: null,
      container: null
    });
    /**
     * The query selectors used by the menu to populate the dom.
     *
     * @protected
     *
     * @type {Object<string>}
     *
     * @property {string} menuItems      - The query selector for menu items.
     * @property {string} menuLinks      - The query selector for menu links.
     * @property {string} submenuItems   - The query selector for menu items containing submenus.
     * @property {string} submenuToggles - The query selector for menu links that function as submenu toggles.
     * @property {string} submenus       - The query selector for for submenus.
     */
    o(this, "_selectors", {
      menuItems: "",
      menuLinks: "",
      submenuItems: "",
      submenuToggles: "",
      submenus: ""
    });
    /**
     * The declared accessible-menu elements within the menu.
     *
     * @protected
     *
     * @type {Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]>}
     *
     * @property {BaseMenuItem[]}   menuItems      - An array of menu items.
     * @property {BaseMenuToggle[]} submenuToggles - An array of menu toggles.
     * @property {?BaseMenuToggle}  controller     - A menu toggle that controls this menu.
     * @property {?BaseMenu}        parentMenu     - The parent menu.
     * @property {?BaseMenu}        rootMenu       - The root menu of the menu tree.
     */
    o(this, "_elements", {
      menuItems: [],
      submenuToggles: [],
      controller: null,
      parentMenu: null,
      rootMenu: null
    });
    /**
     * The class(es) to apply when the menu is open.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    o(this, "_openClass", "show");
    /**
     * The class(es) to apply when the menu is closed.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    o(this, "_closeClass", "hide");
    /**
     * The class(es) to apply when the menu is transitioning between states.
     *
     * @protected
     *
     * @type {string|string[]}
     */
    o(this, "_transitionClass", "transitioning");
    /**
     * The duration time (in milliseconds) for the transition between open and closed states.
     *
     * @protected
     *
     * @type {number}
     */
    o(this, "_transitionDuration", 250);
    /**
     * The duration time (in milliseconds) for the transition from closed to open states.
     *
     * @protected
     *
     * @type {number}
     */
    o(this, "_openDuration", -1);
    /**
     * The duration time (in milliseconds) for the transition from open to closed states.
     *
     * @protected
     *
     * @type {number}
     */
    o(this, "_closeDuration", -1);
    /**
     * A flag marking the root menu.
     *
     * @protected
     *
     * @type {boolean}
     */
    o(this, "_root", !0);
    /**
     * The index of the currently selected menu item in the menu.
     *
     * @protected
     *
     * @type {number}
     */
    o(this, "_currentChild", 0);
    /**
     * The current state of the menu's focus.
     *
     * @protected
     *
     * @type {string}
     */
    o(this, "_focusState", "none");
    /**
     * This last event triggered on the menu.
     *
     * @protected
     *
     * @type {string}
     */
    o(this, "_currentEvent", "none");
    /**
     * The type of hoverability for the menu.
     *
     * @protected
     *
     * @type {string}
     */
    o(this, "_hoverType", "off");
    /**
     * The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    o(this, "_hoverDelay", 250);
    /**
     * The delay time (in milliseconds) used for pointerenter events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    o(this, "_enterDelay", -1);
    /**
     * The delay time (in milliseconds) used for pointerleave events to take place.
     *
     * @protected
     *
     * @type {number}
     */
    o(this, "_leaveDelay", -1);
    /**
     * The prefix to use for CSS custom properties.
     *
     * @protected
     *
     * @type {string}
     */
    o(this, "_prefix", "am-");
    /**
     * A variable to hold the hover timeout function.
     *
     * @protected
     *
     * @type {?Function}
     */
    o(this, "_hoverTimeout", null);
    /**
     * A flag to check if the menu can dynamically hover based on if a menu has been opened already.
     *
     * @protected
     *
     * @type {boolean}
     */
    o(this, "_hasOpened", !1);
    /**
     * An array of error messages generated by the menu.
     *
     * @protected
     *
     * @type {string[]}
     */
    o(this, "_errors", []);
    this._dom.menu = e, this._dom.controller = a, this._dom.container = c, this._selectors.menuItems = t, this._selectors.menuLinks = s, this._selectors.submenuItems = i, this._selectors.submenuToggles = r, this._selectors.submenus = l, this._elements.menuItems = [], this._elements.submenuToggles = [], this._elements.controller = null, this._elements.parentMenu = w, this._elements.rootMenu = C ? this : null, this._openClass = f || "", this._closeClass = d || "", this._transitionClass = p || "", this._transitionDuration = g, this._openDuration = m, this._closeDuration = D, this._prefix = A || "", this._root = C, this._hoverType = I, this._hoverDelay = v, this._enterDelay = k, this._leaveDelay = S;
  }
  /**
   * Initializes the menu.
   *
   * The following steps will be taken to initialize the menu:
   * - Validate that the menu can initialize.
   * - Find the root menu of the menu tree if it isn't already set.
   * - Populate all DOM elements within the dom.
   * - If the current menu is the root menu _and_ has a controller, initialize
   *   the controller.
   * - Populate the menu elements within the elements.
   * - Set the transition duration custom prop for the menu.
   *
   * @public
   *
   * @throws {Error} Will throw an Error if validate returns `false`.
   */
  initialize() {
    if (!this._validate())
      throw new Error(
        `AccesibleMenu: cannot initialize menu. The following errors have been found:
 - ${this.errors.join(
          `
 - `
        )}`
      );
    if (this.elements.rootMenu === null && this._findRootMenu(this), this._setDOMElements(), this.isTopLevel && this.dom.controller && this.dom.container) {
      const e = new this._MenuToggleType({
        menuToggleElement: this.dom.controller,
        parentElement: this.dom.container,
        controlledMenu: this
      });
      H("button", { toggle: e.dom.toggle }) || e.dom.toggle.setAttribute("role", "button"), e.dom.toggle.setAttribute("aria-controls", this.dom.menu.id), this._elements.controller = e;
    }
    this._createChildElements(), this._setTransitionDurations(), this.isTopLevel && (window.AccessibleMenu = window.AccessibleMenu || {
      menus: {}
    }, window.AccessibleMenu.menus[this.dom.menu.id] = this);
  }
  /**
   * The DOM elements within the menu.
   *
   * @readonly
   *
   * @type {Object<HTMLElement, HTMLElement[]>}
   *
   * @see _dom
   */
  get dom() {
    return this._dom;
  }
  /**
   * The query selectors used by the menu to populate the dom.
   *
   * @readonly
   *
   * @type {Object<string>}
   *
   * @see _selectors
   */
  get selectors() {
    return this._selectors;
  }
  /**
   * The declared accessible-menu elements within the menu.
   *
   * @readonly
   *
   * @type {Object<BaseMenu, BaseMenuToggle, BaseMenuItem[], BaseMenuToggle[]>}
   *
   * @see _elements
   */
  get elements() {
    return this._elements;
  }
  /**
   * The flag marking the root menu.
   *
   * @readonly
   *
   * @type {boolean}
   *
   * @see _root
   */
  get isTopLevel() {
    return this._root;
  }
  /**
   * The class(es) to apply when the menu is open.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's open class(es).
   *
   * @type {string|string[]}
   *
   * @see _openClass
   */
  get openClass() {
    return this.isTopLevel ? this._openClass : this.elements.rootMenu.openClass;
  }
  /**
   * The class(es) to apply when the menu is closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's close class(es).
   *
   * @type {string|string[]}
   *
   * @see _closeClass
   */
  get closeClass() {
    return this.isTopLevel ? this._closeClass : this.elements.rootMenu.closeClass;
  }
  /**
   * The class(es) to apply when the menu is transitioning between open and closed.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's transition class(es).
   *
   * @type {string|string[]}
   *
   * @see _transitionClass
   */
  get transitionClass() {
    return this.isTopLevel ? this._transitionClass : this.elements.rootMenu.transitionClass;
  }
  /**
   * The duration time (in milliseconds) for the transition between open and closed states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's transition duration.
   *
   * Setting this value will also set the --am-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _transitionDuration
   */
  get transitionDuration() {
    return this.isTopLevel ? this._transitionDuration : this.elements.rootMenu.transitionDuration;
  }
  /**
   * The duration time (in milliseconds) for the transition from closed to open states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's openDuration.
   *
   * If openDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-open-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _openDuration
   */
  get openDuration() {
    return this._openDuration === -1 ? this.transitionDuration : this.isTopLevel ? this._openDuration : this.elements.rootMenu.openDuration;
  }
  /**
   * The duration time (in milliseconds) for the transition from open to closed states.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's closeDuration.
   *
   * If closeDuration is set to -1, the transitionDuration value will be used instead.
   *
   * Setting this value will also set the --am-close-transition-duration CSS custom property on the menu.
   *
   * @type {number}
   *
   * @see _closeDuration
   */
  get closeDuration() {
    return this._closeDuration === -1 ? this.transitionDuration : this.isTopLevel ? this._closeDuration : this.elements.rootMenu.closeDuration;
  }
  /**
   * The index of the currently selected menu item in the menu.
   *
   * - Attempting to set a value less than -1 will set the current child to -1.
   * - Attempting to set a value greater than or equal to the number of menu items
   *   will set the current child to the index of the last menu item in the menu.
   *
   * If the current menu has a parent menu _and_ the menu's
   * current event is "mouse", The parent menu
   * will have it's current child updated as well to help with transitioning
   * between mouse and keyboard naviation.
   *
   * @type {number}
   *
   * @see _currentChild
   */
  get currentChild() {
    return this._currentChild;
  }
  /**
   * The current state of the menu's focus.
   *
   * - If the menu has submenus, setting the focus state to "none" or "self" will
   *   update all child menus to have the focus state of "none".
   * - If the menu has a parent menu, setting the focus state to "self" or "child"
   *   will update all parent menus to have the focus state of "child".
   *
   * @type {string}
   *
   * @see _focusState
   */
  get focusState() {
    return this._focusState;
  }
  /**
   * The last event triggered on the menu.
   *
   * @type {string}
   *
   * @see _currentEvent
   */
  get currentEvent() {
    return this._currentEvent;
  }
  /**
   * The currently selected menu item.
   *
   * @readonly
   *
   * @type {BaseMenuItem}
   */
  get currentMenuItem() {
    return this.elements.menuItems[this.currentChild];
  }
  /**
   * The type of hoverability for the menu.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hoverability.
   *
   * @type {string}
   *
   * @see _hoverType
   */
  get hoverType() {
    return this._root ? this._hoverType : this.elements.rootMenu.hoverType;
  }
  /**
   * The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hover delay.
   *
   * @type {number}
   *
   * @see _hoverDelay
   */
  get hoverDelay() {
    return this._root ? this._hoverDelay : this.elements.rootMenu.hoverDelay;
  }
  /**
   * The delay time (in milliseconds) used for pointerenter events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's enter delay.
   *
   * If enterDelay is set to -1, the hoverDelay value will be used instead.
   *
   * @type {number}
   *
   * @see _enterDelay
   */
  get enterDelay() {
    return this._enterDelay === -1 ? this.hoverDelay : this._root ? this._enterDelay : this.elements.rootMenu.enterDelay;
  }
  /**
   * The delay time (in milliseconds) used for pointerleave events to take place.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's leave delay.
   *
   * If leaveDelay is set to -1, the hoverDelay value will be used instead.
   *
   * @type {number}
   *
   * @see _leaveDelay
   */
  get leaveDelay() {
    return this._leaveDelay === -1 ? this.hoverDelay : this._root ? this._leaveDelay : this.elements.rootMenu.leaveDelay;
  }
  /**
   * The prefix to use for CSS custom properties.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's prefix.
   *
   * @type {string}
   *
   * @see _prefix
   */
  get prefix() {
    return this._root ? this._prefix : this.elements.rootMenu.prefix;
  }
  /**
   * A flag to check if the menu's focus methods should _actually_ move the focus in the DOM.
   *
   * This will be `false` unless any of the following criteria are met:
   * - The menu's current event is "keyboard".
   * - The menu's current event is "character".
   * - The menu's current event is "mouse" _and_ the menu's
   *   hover type is "dynamic".
   *
   * @readonly
   *
   * @type {boolean}
   */
  get shouldFocus() {
    let e = !1;
    return (this.currentEvent === "keyboard" || this.currentEvent === "character") && (e = !0), this.currentEvent === "mouse" && this.hoverType === "dynamic" && (e = !0), e;
  }
  /**
   * A flag to check if the menu can dynamically hover.
   *
   * This functions differently for root vs. submenus.
   * Submenus will always inherit their root menu's hasOpened.
   *
   * @type {boolean}
   *
   * @see _hasOpened
   */
  get hasOpened() {
    return this._root ? this._hasOpened : this.elements.rootMenu.hasOpened;
  }
  /**
   * An array of error messages generated by the menu.
   *
   * @readonly
   *
   * @type {string[]}
   *
   * @see _errors
   */
  get errors() {
    return this._errors;
  }
  set openClass(e) {
    M({ openClass: e }), this._openClass !== e && (this._openClass = e);
  }
  set closeClass(e) {
    M({ closeClass: e }), this._closeClass !== e && (this._closeClass = e);
  }
  set transitionClass(e) {
    M({ transitionClass: e }), this._transitionClass !== e && (this._transitionClass = e);
  }
  set transitionDuration(e) {
    h("number", { value: e }), this._transitionDuration !== e && (this._transitionDuration = e, this._setTransitionDurations());
  }
  set openDuration(e) {
    h("number", { value: e }), this._openDuration !== e && (this._openDuration = e, this._setTransitionDurations());
  }
  set closeDuration(e) {
    h("number", { value: e }), this._closeDuration !== e && (this._closeDuration = e, this._setTransitionDurations());
  }
  set currentChild(e) {
    h("number", { value: e });
    function t(s) {
      if (["mouse", "character"].includes(s.currentEvent) && s.elements.parentMenu) {
        let r = 0, l = !1;
        for (; !l && r < s.elements.parentMenu.elements.menuItems.length; ) {
          const a = s.elements.parentMenu.elements.menuItems[r];
          a.isSubmenuItem && a.elements.toggle.elements.controlledMenu === s && (l = !0, s.elements.parentMenu.currentEvent = s.currentEvent, s.elements.parentMenu.currentChild = r), r++;
        }
      }
    }
    e < -1 ? (this._currentChild = -1, t(this)) : e >= this.elements.menuItems.length ? (this._currentChild = this.elements.menuItems.length - 1, t(this)) : this.focusChild !== e && (this._currentChild = e, t(this));
  }
  set focusState(e) {
    V({ value: e }), this._focusState !== e && (this._focusState = e), this.elements.submenuToggles.length > 0 && (e === "self" || e === "none") && this.elements.submenuToggles.forEach((t) => {
      t.elements.controlledMenu.focusState = "none";
    }), this.elements.parentMenu && (e === "self" || e === "child") && (this.elements.parentMenu.focusState = "child");
  }
  set currentEvent(e) {
    z({ value: e }), this._currentEvent !== e && (this._currentEvent = e, this.elements.submenuToggles.length > 0 && this.elements.submenuToggles.forEach((t) => {
      t.elements.controlledMenu.currentEvent = e;
    }));
  }
  set hoverType(e) {
    O({ value: e }), this._hoverType !== e && (this._hoverType = e);
  }
  set hoverDelay(e) {
    h("number", { value: e }), this._hoverDelay !== e && (this._hoverDelay = e);
  }
  set enterDelay(e) {
    h("number", { value: e }), this._enterDelay !== e && (this._enterDelay = e);
  }
  set leaveDelay(e) {
    h("number", { value: e }), this._leaveDelay !== e && (this._leaveDelay = e);
  }
  set prefix(e) {
    h("string", { value: e }), this._prefix !== e && (this._prefix = e);
  }
  set hasOpened(e) {
    h("boolean", { value: e }), this._hasOpened !== e && (this._hasOpened = e);
  }
  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let e = !0, t;
    this._dom.container !== null || this._dom.controller !== null ? t = b(HTMLElement, {
      menuElement: this._dom.menu,
      controllerElement: this._dom.controller,
      containerElement: this._dom.container
    }) : t = b(HTMLElement, {
      menuElement: this._dom.menu
    }), t.status || (this._errors.push(t.error.message), e = !1);
    let s;
    if (this._selectors.submenuItems !== "" ? s = L({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks,
      submenuItemSelector: this._selectors.submenuItems,
      submenuToggleSelector: this._selectors.submenuToggles,
      submenuSelector: this._selectors.submenus
    }) : s = L({
      menuItemSelector: this._selectors.menuItems,
      menuLinkSelector: this._selectors.menuLinks
    }), s.status || (this._errors.push(s.error.message), e = !1), this._openClass !== "") {
      const m = M({ openClass: this._openClass });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    if (this._closeClass !== "") {
      const m = M({
        closeClass: this._closeClass
      });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    if (this._transitionClass !== "") {
      const m = M({
        transitionClass: this._transitionClass
      });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    const i = h("number", {
      transitionDuration: this._transitionDuration
    });
    i.status || (this._errors.push(i.error.message), e = !1);
    const r = h("number", {
      openDuration: this._openDuration
    });
    r.status || (this._errors.push(r.error.message), e = !1);
    const l = h("number", {
      closeDuration: this._closeDuration
    });
    l.status || (this._errors.push(l.error.message), e = !1);
    const a = h("boolean", { isTopLevel: this._root });
    if (a.status || (this._errors.push(a.error.message), e = !1), this._elements.parentMenu !== null) {
      const m = b(T, {
        parentMenu: this._elements.parentMenu
      });
      m.status || (this._errors.push(m.error.message), e = !1);
    }
    const c = O({ hoverType: this._hoverType });
    c.status || (this._errors.push(c.error.message), e = !1);
    const f = h("number", {
      hoverDelay: this._hoverDelay
    });
    f.status || (this._errors.push(f.error.message), e = !1);
    const d = h("number", {
      enterDelay: this._enterDelay
    });
    d.status || (this._errors.push(d.error.message), e = !1);
    const p = h("number", {
      leaveDelay: this._leaveDelay
    });
    p.status || (this._errors.push(p.error.message), e = !1);
    const g = h("string", { prefix: this._prefix });
    return g.status || (this._errors.push(g.error.message), e = !1), e;
  }
  /**
   * Sets DOM elements within the menu.
   *
   * Elements that are not stored inside an array cannot be set through this method.
   *
   * @protected
   *
   * @param {string}      elementType            - The type of element to populate.
   * @param {HTMLElement} [base = this.dom.menu] - The element used as the base for the querySelect.
   * @param {boolean}     [overwrite = true]     - A flag to set if the existing elements will be overwritten.
   */
  _setDOMElementType(e, t = this.dom.menu, s = !0) {
    if (typeof this.selectors[e] == "string") {
      if (!Array.isArray(this.dom[e]))
        throw new Error(
          `AccessibleMenu: The "${e}" element cannot be set through _setDOMElementType.`
        );
      t !== this.dom.menu && b(HTMLElement, { base: t });
      const r = Array.from(
        t.querySelectorAll(this.selectors[e])
      ).filter(
        (l) => l.parentElement === t
      );
      s ? this._dom[e] = r : this._dom[e] = [
        ...this._dom[e],
        ...r
      ];
    } else
      throw new Error(
        `AccessibleMenu: "${e}" is not a valid element type within the menu.`
      );
  }
  /**
   * Resets DOM elements within the menu.
   *
   * Elements that are not stored inside an array cannot be reset through this method.
   *
   * @protected
   *
   * @param {string} elementType - The type of element to clear.
   */
  _resetDOMElementType(e) {
    if (typeof this.dom[e] < "u") {
      if (!Array.isArray(this.dom[e]))
        throw new Error(
          `AccessibleMenu: The "${e}" element cannot be reset through _resetDOMElementType.`
        );
      this._dom[e] = [];
    } else
      throw new Error(
        `AccessibleMenu: "${e}" is not a valid element type within the menu.`
      );
  }
  /**
   * Sets all DOM elements within the menu.
   *
   * Utiliizes _setDOMElementType and
   * _resetDOMElementType.
   *
   * @protected
   */
  _setDOMElements() {
    this._setDOMElementType("menuItems"), this.selectors.submenuItems !== "" && (this._setDOMElementType("submenuItems"), this._resetDOMElementType("submenuToggles"), this._resetDOMElementType("submenus"), this.dom.submenuItems.forEach((e) => {
      this._setDOMElementType("submenuToggles", e, !1), this._setDOMElementType("submenus", e, !1);
    }));
  }
  /**
   * Finds the root menu element.
   *
   * @protected
   *
   * @param {BaseMenu} menu - The menu to check.
   */
  _findRootMenu(e) {
    if (e.isTopLevel)
      this._elements.rootMenu = e;
    else if (e.elements.parentMenu !== null)
      this._findRootMenu(e.elements.parentMenu);
    else
      throw new Error("Cannot find root menu.");
  }
  /**
   * Creates and initializes all menu items and submenus.
   *
   * @protected
   */
  _createChildElements() {
    this.dom.menuItems.forEach((e) => {
      let t;
      if (this.dom.submenuItems.includes(e)) {
        const s = e.querySelector(this.selectors.submenuToggles), i = e.querySelector(this.selectors.submenus), r = new this._MenuType({
          menuElement: i,
          menuItemSelector: this.selectors.menuItems,
          menuLinkSelector: this.selectors.menuLinks,
          submenuItemSelector: this.selectors.submenuItems,
          submenuToggleSelector: this.selectors.submenuToggles,
          submenuSelector: this.selectors.submenus,
          openClass: this.openClass,
          closeClass: this.closeClass,
          transitionClass: this.transitionClass,
          transitionDuration: this.transitionDuration,
          openDuration: this.openDuration,
          closeDuration: this.closeDuration,
          isTopLevel: !1,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
          enterDelay: this.enterDelay,
          leaveDelay: this.leaveDelay
        }), l = new this._MenuToggleType({
          menuToggleElement: s,
          parentElement: e,
          controlledMenu: r,
          parentMenu: this
        });
        this._elements.submenuToggles.push(l), t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this,
          isSubmenuItem: !0,
          childMenu: r,
          toggle: l
        });
      } else {
        const s = e.querySelector(this.selectors.menuLinks);
        t = new this._MenuItemType({
          menuItemElement: e,
          menuLinkElement: s,
          parentMenu: this
        });
      }
      this._elements.menuItems.push(t);
    });
  }
  /**
   * Clears the hover timeout.
   *
   * @protected
   */
  _clearTimeout() {
    clearTimeout(this._hoverTimeout);
  }
  /**
   * Sets the hover timeout.
   *
   * @protected
   *
   * @param {Function} callback - The callback function to execute.
   * @param {number}   delay    - The delay time in milliseconds.
   */
  _setTimeout(e, t) {
    h("function", { callback: e }), h("number", { delay: t }), this._hoverTimeout = setTimeout(e, t);
  }
  /**
   * Handles focus events throughout the menu for proper menu use.
   *
   * - Adds a `focus` listener to every menu item so when it gains focus,
   *   it will set the item's containing menu's focus state
   *   to "self".
   *
   * @protected
   */
  _handleFocus() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("focus", () => {
        this.focusState = "self", this.currentChild = t;
      });
    });
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds a `pointerdown` listener to every menu item that will blur
   *   all menu items in the entire menu structure (starting at the root menu) and
   *   then properly focus the clicked item.
   * - Adds a `pointerup` listener to every submenu item that will properly
   *   toggle the submenu open/closed.
   * - Adds a `pointerup` listener to the menu's controller
   *   (if the menu is the root menu) so when it is clicked it will properly
   *   toggle open/closed.
   *
   * @protected
   */
  _handleClick() {
    function e(t, s, i) {
      u(i), s.toggle(), s.isOpen && (t.focusState = "self", s.elements.controlledMenu.focusState = "none");
    }
    this.elements.menuItems.forEach((t, s) => {
      t.dom.link.addEventListener(
        "pointerdown",
        () => {
          this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this._clearTimeout(), this.focusChild(s);
        },
        { passive: !0 }
      ), t.isSubmenuItem && t.elements.toggle.dom.toggle.addEventListener(
        "pointerup",
        (i) => {
          this.currentEvent = "mouse", e(this, t.elements.toggle, i);
        }
      );
    }), this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener(
      "pointerup",
      (t) => {
        this.currentEvent = "mouse", e(this, this.elements.controller, t);
      }
    ), document.addEventListener("pointerup", (t) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(t.target) && !this.dom.menu !== t.target && (this.elements.rootMenu.hasOpened = this.elements.submenuToggles.some(
        (s) => s.isOpen
      )));
    });
  }
  /**
   * Handles hover events throughout the menu for proper use.
   *
   * Adds `pointerenter` listeners to all menu items and `pointerleave` listeners
   * to all submenu items which function differently depending on
   * the menu's hover type.
   *
   * Before executing anything, the event is checked to make sure the event wasn't
   * triggered by a pen or touch.
   *
   * <strong>Hover Type "on"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *    current child value will change to that
   *   menu item.
   * - When a `pointerenter` event triggers on a submenu item the
   *   preview method for the submenu item's
   *   toggle will be called.
   * - When a `pointerleave` event triggers on an open submenu item the
   *   close method for the submenu item's toggle
   *   will be called after a delay set by the menu's hover delay.
   *
   * <strong>Hover Type "dynamic"</strong>
   * - When a `pointerenter` event triggers on any menu item the menu's
   *   current child value will change to that menu item.
   * - When a `pointerenter` event triggers on any menu item, and the menu's
   *   focus state is not "none", the menu item
   *   will be focused.
   * - When a `pointerenter` event triggers on a submenu item, and a submenu is
   *   already open, the preview method for the submenu item's toggle will be called.
   * - When a `pointerenter` event triggers on a non-submenu item, and a submenu
   *   is already open, the closeChildren method for the menu will be called.
   * - When a `pointerenter` event triggers on a submenu item, and no submenu is
   *   open, no submenu-specific methods will be called.
   * - When a `pointerleave` event triggers on an open submenu item that is not a
   *   root-level submenu item the close method for the submenu item's toggle
   *   will be called and the submenu item will be focused after a delay set by
   *   the menu's hover delay.
   * - When a `pointerleave` event triggers on an open submenu item that is a
   *   root-level submenu item no submenu-specific methods will be called.
   *
   * <strong>Hover Type "off"</strong>
   * All `pointerenter` and `pointerleave` events are ignored.
   *
   * @protected
   */
  _handleHover() {
    this.elements.menuItems.forEach((e, t) => {
      e.dom.link.addEventListener("pointerenter", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusChild(t), e.isSubmenuItem && (this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview())) : this.hoverType === "dynamic" && (this.currentChild = t, (!this.isTopLevel || this.focusState !== "none") && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild()), (!this.isTopLevel || this.hasOpened) && (this.currentEvent = "mouse", this.elements.rootMenu.blurChildren(), this.focusCurrentChild(), e.isSubmenuItem ? this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          e.elements.toggle.preview();
        }, this.enterDelay)) : e.elements.toggle.preview() : this.enterDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.closeChildren();
        }, this.enterDelay)) : this.closeChildren())));
      }), e.isSubmenuItem && (e.dom.item.addEventListener("pointerleave", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || (this.hoverType === "on" ? this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse", e.elements.toggle.close();
        }, this.leaveDelay)) : (this.currentEvent = "mouse", e.elements.toggle.close()) : this.hoverType === "dynamic" && (this.leaveDelay > 0 ? (this._clearTimeout(), this._setTimeout(() => {
          this.currentEvent = "mouse";
        }, this.leaveDelay)) : this.currentEvent = "mouse"));
      }), e.dom.item.addEventListener("pointerenter", (s) => {
        s.pointerType === "pen" || s.pointerType === "touch" || e.isSubmenuItem && (this.hoverType === "on" || this.hoverType === "dynamic") && this.leaveDelay > 0 && this._clearTimeout();
      }));
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assit the _handleKeyup method.
   *
   * - Adds a `keydown` listener to the menu's controller (if the menu is the root menu).
   *   - Blocks propagation on "Space", "Enter", and "Escape" keys.
   *
   * @protected
   */
  _handleKeydown() {
    this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener(
      "keydown",
      (e) => {
        this.currentEvent = "keyboard";
        const t = E(e);
        (t === "Space" || t === "Enter") && u(e);
      }
    );
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * - Adds a `keyup` listener to the menu's controller (if the menu is the root menu).
   *   - Toggles the menu when the user hits "Space" or "Enter".
   *
   * @protected
   */
  _handleKeyup() {
    this.isTopLevel && this.elements.controller && this.elements.controller.dom.toggle.addEventListener("keyup", (e) => {
      this.currentEvent = "keyboard";
      const t = E(e);
      (t === "Space" || t === "Enter") && (u(e), this.elements.controller.toggle(), this.elements.controller.isOpen && this.focusFirstChild());
    });
  }
  /**
   * Sets the transition durations of the menu as a CSS custom properties.
   *
   * The custom properties are:
   *   - `--am-transition-duration`,
   *   - `--am-open-transition-duration`, and
   *   - `--am-close-transition-duration`.
   *
   * The prefix of `am-` can be changed by setting the menu's prefix value.
   *
   * @protected
   */
  _setTransitionDurations() {
    this.dom.menu.style.setProperty(
      `--${this.prefix}transition-duration`,
      `${this.transitionDuration}ms`
    ), this.dom.menu.style.setProperty(
      `--${this.prefix}open-transition-duration`,
      `${this.openDuration}ms`
    ), this.dom.menu.style.setProperty(
      `--${this.prefix}close-transition-duration`,
      `${this.closeDuration}ms`
    );
  }
  /**
   * Focus the menu.
   *
   * Sets the menu's focus state to "self" and
   * focusses the menu if the menu's shouldFocus
   * value is `true`.
   *
   * @public
   */
  focus() {
    this.focusState = "self", this.shouldFocus && this.dom.menu.focus();
  }
  /**
   * Unfocus the menu.
   *
   * Sets the menu's focus state to "none"
   * and blurs the menu if the menu's shouldFocus
   * vallue is `true`.
   *
   * @public
   */
  blur() {
    this.focusState = "none", this.shouldFocus && this.dom.menu.blur();
  }
  /**
   * Focus the menu's current child.
   *
   * @public
   */
  focusCurrentChild() {
    this.focusState = "self", this.currentChild !== -1 && this.currentMenuItem.focus();
  }
  /**
   * Focuses the menu's child at a given index.
   *
   * @public
   *
   * @param {number} index - The index of the child to focus.
   */
  focusChild(e) {
    this.blurCurrentChild(), this.currentChild = e, this.focusCurrentChild();
  }
  /**
   * Focues the menu's first child.
   *
   * @public
   */
  focusFirstChild() {
    this.focusChild(0);
  }
  /**
   * Focus the menu's last child.
   *
   * @public
   */
  focusLastChild() {
    this.focusChild(this.elements.menuItems.length - 1);
  }
  /**
   * Focus the menu's next child.
   *
   * @public
   */
  focusNextChild() {
    this.currentChild < this.elements.menuItems.length - 1 ? this.focusChild(this.currentChild + 1) : this.focusCurrentChild();
  }
  /**
   * Focus the menu's previous child.
   *
   * @public
   */
  focusPreviousChild() {
    this.currentChild > 0 ? this.focusChild(this.currentChild - 1) : this.focusCurrentChild();
  }
  /**
   * Blurs the menu's current child.
   *
   * @public
   */
  blurCurrentChild() {
    this.focusState = "none", this.currentChild !== -1 && this.currentMenuItem.blur();
  }
  /**
   * Focus the menu's controller.
   *
   * @public
   */
  focusController() {
    this.dom.controller && (this.shouldFocus && this.dom.controller.focus(), this.focusState = "none");
  }
  /**
   * Focus the menu's container.
   *
   * @public
   */
  focusContainer() {
    this.dom.container && (this.shouldFocus && this.dom.container.focus(), this.focusState = "none");
  }
  /**
   * Close all submenu children.
   *
   * @public
   */
  closeChildren() {
    this.elements.submenuToggles.forEach((e) => e.close());
  }
  /**
   * Blurs all children and submenu's children.
   *
   * @public
   */
  blurChildren() {
    this.elements.menuItems.forEach((e) => {
      e.blur(), e.isSubmenuItem && e.elements.childMenu.blurChildren();
    });
  }
}
class K extends $ {
  /**
   * Constructs a new `MenubarItem`.
   *
   * @param {object}         options                         - The options for generating the menu item.
   * @param {HTMLElement}    options.menuItemElement         - The menu item in the DOM.
   * @param {HTMLElement}    options.menuLinkElement         - The menu item's link in the DOM.
   * @param {Menubar}        options.parentMenu              - The parent menu.
   * @param {boolean}        [options.isSubmenuItem = false] - A flag to mark if the menu item is controlling a submenu.
   * @param {?Menubar}       [options.childMenu = null]      - The child menu.
   * @param {?MenubarToggle} [options.toggle = null]         - The controller for the child menu.
   * @param {boolean}        [options.initialize = true]     - A flag to initialize the menu item immediately upon creation.
   */
  constructor({
    menuItemElement: e,
    menuLinkElement: t,
    parentMenu: s,
    isSubmenuItem: i = !1,
    childMenu: r = null,
    toggle: l = null,
    initialize: a = !0
  }) {
    super({
      menuItemElement: e,
      menuLinkElement: t,
      parentMenu: s,
      isSubmenuItem: i,
      childMenu: r,
      toggle: l
    }), a && this.initialize();
  }
  /**
   * Initialize the menu item.
   *
   * Initialize will call the BaseMenuItem's initialize method
   * as well as set the menu item's `role` to "none",
   * the menu link's `role` to "menuitem", and
   * the menu link's `tabIndex` to -1 in the DOM.
   */
  initialize() {
    super.initialize(), this.dom.item.setAttribute("role", "none"), this.dom.link.setAttribute("role", "menuitem"), this.dom.link.tabIndex = -1;
  }
  /**
   * Focuses the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's focus method
   * as well as set the menu link's `tabIndex` to 0 if the parent menu
   * is the root menu.
   *
   * @public
   */
  focus() {
    super.focus(), this.elements.parentMenu.isTopLevel && (this.dom.link.tabIndex = 0);
  }
  /**
   * Blurs the menu item's link if the parent menu's
   * shouldFocus value is `true`.
   *
   * This will call the BaseMenuItem's blur method
   * as well as set the menu link's `tabIndex` to -1 if the parent menu
   * is the root menu.
   *
   * @public
   */
  blur() {
    super.blur(), this.elements.parentMenu.isTopLevel && (this.dom.link.tabIndex = -1);
  }
}
class P extends x {
  /**
   * Constructs a new `MenubarToggle`.
   *
   * @param {object}      options                     - The options for generating the menu toggle.
   * @param {HTMLElement} options.menuToggleElement   - The toggle element in the DOM.
   * @param {HTMLElement} options.parentElement       - The element containing the controlled menu.
   * @param {Menubar}     options.controlledMenu      - The menu controlled by this toggle.
   * @param {?Menubar}    [options.parentMenu = null] - The menu containing this toggle.
   * @param {boolean}     [options.initialize = true] - A flag to initialize the menu toggle immediately upon creation.
   */
  constructor({
    menuToggleElement: e,
    parentElement: t,
    controlledMenu: s,
    parentMenu: i = null,
    initialize: r = !0
  }) {
    super({
      menuToggleElement: e,
      parentElement: t,
      controlledMenu: s,
      parentMenu: i
    }), r && this.initialize();
  }
  /**
   * Sets the ARIA attributes on the toggle and controlled menu.
   *
   * Calls the BaseMenuToggle's _setAriaAttributes method.
   *
   * Then sets the toggle's `aria-haspopup` attribute to "true".
   *
   * @protected
   */
  _setAriaAttributes() {
    super._setAriaAttributes(), this.dom.toggle.setAttribute("aria-haspopup", "true");
  }
  /**
   * Opens the controlled menu.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's open method.
   *
   * @public
   */
  open() {
    this.closeSiblings(), super.open();
  }
  /**
   * Opens the controlled menu without the current focus entering it.
   *
   * Calls the  closeSiblings method
   * and _then_ BaseMenuToggle's preview method.
   *
   * @public
   */
  preview() {
    this.closeSiblings(), super.preview();
  }
  /**
   * Closes the controlled menu.
   *
   * Calls the  closeChildren method
   * and _then_ BaseMenuToggle's close method.
   *
   * @public
   */
  close() {
    this.isOpen && (this.closeChildren(), this.elements.parentMenu && this.elements.parentMenu.focusCurrentChild()), super.close();
  }
}
class F extends T {
  /**
   * Constructs a new `Menubar`.
   *
   * @param {object}             options                                    - The options for generating the menu.
   * @param {HTMLElement}        options.menuElement                        - The menu element in the DOM.
   * @param {string}             [options.menuItemSelector = li]            - The query selector string for menu items.
   * @param {string}             [options.menuLinkSelector = a]             - The query selector string for menu links.
   * @param {string}             [options.submenuItemSelector = li:has(ul)] - The query selector string for menu items containing submenus.
   * @param {string}             [options.submenuToggleSelector = a]        - The query selector string for submenu toggle buttons/links.
   * @param {string}             [options.submenuSelector = ul]             - The query selector string for submenus.
   * @param {?HTMLElement}       [options.controllerElement = null]         - The element controlling the menu in the DOM.
   * @param {?HTMLElement}       [options.containerElement = null]          - The element containing the menu in the DOM.
   * @param {?(string|string[])} [options.openClass = show]                 - The class to apply when a menu is "open".
   * @param {?(string|string[])} [options.closeClass = hide]                - The class to apply when a menu is "closed".
   * @param {?(string|string[])} [options.transitionClass = transitioning]  - The class to apply when a menu is transitioning between "open" and "closed" states.
   * @param {number}             [options.transitionDuration = 250]         - The duration of the transition between "open" and "closed" states (in milliseconds).
   * @param {boolean}            [options.isTopLevel = true]                - A flag to mark the root menu.
   * @param {?Menubar}           [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                  - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                  - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {?string}            [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   * @param {boolean}            [options.initialize = true]                - A flag to initialize the menu immediately upon creation.
   */
  constructor({
    menuElement: t,
    menuItemSelector: s = "li",
    menuLinkSelector: i = "a",
    submenuItemSelector: r = "li:has(ul)",
    submenuToggleSelector: l = "a",
    submenuSelector: a = "ul",
    controllerElement: c = null,
    containerElement: f = null,
    openClass: d = "show",
    closeClass: p = "hide",
    transitionClass: g = "transitioning",
    transitionDuration: m = 250,
    isTopLevel: D = !0,
    parentMenu: C = null,
    hoverType: w = "off",
    hoverDelay: I = 250,
    enterDelay: v = -1,
    leaveDelay: k = -1,
    prefix: S = "am-",
    initialize: A = !0
  }) {
    super({
      menuElement: t,
      menuItemSelector: s,
      menuLinkSelector: i,
      submenuItemSelector: r,
      submenuToggleSelector: l,
      submenuSelector: a,
      controllerElement: c,
      containerElement: f,
      openClass: d,
      closeClass: p,
      transitionClass: g,
      transitionDuration: m,
      isTopLevel: D,
      parentMenu: C,
      hoverType: w,
      hoverDelay: I,
      enterDelay: v,
      leaveDelay: k,
      prefix: S
    });
    /**
     * The class to use when generating submenus.
     *
     * @protected
     *
     * @type {typeof Menubar}
     */
    o(this, "_MenuType", F);
    /**
     * The class to use when generating menu items.
     *
     * @protected
     *
     * @type {typeof MenubarItem}
     */
    o(this, "_MenuItemType", K);
    /**
     * The class to use when generating submenu toggles.
     *
     * @protected
     *
     * @type {typeof MenubarToggle}
     */
    o(this, "_MenuToggleType", P);
    A && this.initialize();
  }
  /**
   * Initializes the menu.
   *
   * Initialize will call the BaseMenu's initialize method
   * as well as set up focus,
   * click,
   * hover,
   * keydown, and
   * keyup events for the menu.
   *
   * This will also set the menu's `role` to "menubar" in the DOM.
   *
   * If the menu is a root menu the first menu item's `tabIndex` will be set to
   * 0 in the DOM.
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize(), this.isTopLevel ? this.dom.menu.setAttribute("role", "menubar") : this.dom.menu.setAttribute("role", "menu"), this._handleFocus(), this._handleClick(), this._handleHover(), this._handleKeydown(), this._handleKeyup(), this.isTopLevel && (this.elements.menuItems[0].dom.link.tabIndex = 0, this.elements.controller && this.elements.controller.dom.toggle.removeAttribute("aria-haspopup"));
    } catch (t) {
      console.error(t);
    }
  }
  /**
   * Handles click events throughout the menu for proper use.
   *
   * - Adds all event listeners listed in
   *   BaseMenu's _handleClick method.
   * - Adds a `pointerup` listener to the `document` so if the user
   *   clicks outside of the menu it will close if it is open.
   *
   * @protected
   */
  _handleClick() {
    super._handleClick(), document.addEventListener("pointerup", (t) => {
      this.focusState !== "none" && (this.currentEvent = "mouse", !this.dom.menu.contains(t.target) && !this.dom.menu !== t.target && (this.closeChildren(), this.blur(), this.elements.controller && this.elements.controller.close(), this.elements.rootMenu.hasOpened = !1));
    });
  }
  /**
   * Handles keydown events throughout the menu for proper menu use.
   *
   * This method exists to assist the _handleKeyup method.
   * - Adds all `keydown` listeners from BaseMenu's _handleKeydown method
   * - Adds a `keydown` listener to the menu/all submenus.
   *   - Blocks propagation on the following keys: "ArrowUp", "ArrowRight",
   *     "ArrowDown", "ArrowLeft", "Home", "End", "Space", "Enter", "Escape",
   *     and "A" through "Z".
   *   - Completely closes the menu and moves focus out if the "Tab" key is pressed.
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown(), this.dom.menu.addEventListener("keydown", (t) => {
      this.currentEvent = "keyboard";
      const s = E(t);
      if (s === "Tab" && (this.elements.rootMenu.focusState !== "none" ? (this.elements.rootMenu.blur(), this.elements.rootMenu.closeChildren()) : this.elements.rootMenu.focus()), s === "Character")
        u(t);
      else if (this.isTopLevel) {
        if (this.focusState === "self") {
          const i = ["ArrowRight", "ArrowLeft", "Home", "End"], r = ["Space", "Enter", "ArrowDown", "ArrowUp"], l = ["Escape"];
          (i.includes(s) || this.currentMenuItem.isSubmenuItem && r.includes(s) || this.elements.controller && l.includes(s)) && u(t);
        }
      } else {
        const i = [
          "Escape",
          "ArrowRight",
          "ArrowLeft",
          "ArrowDown",
          "ArrowUp",
          "Home",
          "End"
        ], r = ["Space", "Enter"];
        (i.includes(s) || this.currentMenuItem.isSubmenuItem && r.includes(s)) && u(t);
      }
    });
  }
  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * Navigation Menubar Example):
   *
   * <strong>Menubar</strong>
   *
   * | Key | Function |
   * | --- | --- |
   * | _Space_ or _Enter_ | Opens submenu and moves focus to first item in the submenu. |
   * | _Right Arrow_ | <ul><li>Moves focus to the next item in the menubar.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
   * | _Left Arrow_ | <ul><li>Moves focus to the previous item in the menubar.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
   * | _Down Arrow_ | Opens submenu and moves focus to first item in the submenu. |
   * | _Up Arrow_ | Opens submenu and moves focus to last item in the submenu. |
   * | _Home_ | Moves focus to first item in the menubar. |
   * | _End_ | Moves focus to last item in the menubar. |
   * | _Character_ | <ul><li>Moves focus to next item in the menubar having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |
   *
   * <strong>Submenu</strong>
   *
   * | Key | Function |
   * | --- | --- |
   * | _Space_ or _Enter_ | <ul><li>Activates menu item, causing the link to be activated.</li><li>NOTE: the links go to dummy pages; use the browser go-back function to return to this menubar example page.</li></ul> |
   * | _Escape_ | <ul><li>Closes submenu.</li><li>Moves focus to parent menubar item.</li></ul> |
   * | _Right Arrow_ | <ul><li>If focus is on an item with a submenu, opens the submenu and places focus on the first item.</li><li>If focus is on an item that does not have a submenu:<ul><li>Closes submenu.</li><li>Moves focus to next item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
   * | _Left Arrow_ | <ul><li>Closes submenu and moves focus to parent menu item.</li><li>If parent menu item is in the menubar, also:<ul><li>moves focus to previous item in the menubar.</li><li>Opens submenu of newly focused menubar item, keeping focus on that parent menubar item.</li></ul></li></ul> |
   * | _Down Arrow_ | <ul><li>Moves focus to the next item in the submenu.</li><li>If focus is on the last item, moves focus to the first item.</li></ul> |
   * | _Up Arrow_ | <ul><li>Moves focus to previous item in the submenu.</li><li>If focus is on the first item, moves focus to the last item.</li></ul> |
   * | Home | Moves focus to the first item in the submenu. |
   * | End | Moves focus to the last item in the submenu. |
   * | _Character_ | <ul><li>Moves focus to the next item having a name that starts with the typed character.</li><li>If none of the items have a name starting with the typed character, focus does not move.</li></ul> |
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup(), this.dom.menu.addEventListener("keyup", (t) => {
      this.currentEvent = "keyboard";
      const s = E(t), { altKey: i, crtlKey: r, metaKey: l } = t;
      if (s === "Character" && !(i || r || l))
        u(t), this.elements.rootMenu.currentEvent = "character", this.focusNextChildWithCharacter(t.key);
      else if (this.isTopLevel) {
        if (this.focusState === "self")
          if (s === "Space" || s === "Enter")
            this.currentMenuItem.isSubmenuItem ? (u(t), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            })) : this.currentMenuItem.dom.link.click();
          else if (s === "ArrowRight") {
            u(t);
            const c = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
            this.focusNextChild(), c && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.closeChildren());
          } else if (s === "ArrowLeft") {
            u(t);
            const c = this.currentMenuItem.isSubmenuItem && this.currentMenuItem.elements.toggle.isOpen;
            this.focusPreviousChild(), c && (this.currentMenuItem.isSubmenuItem ? (this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.preview()) : this.closeChildren());
          } else s === "ArrowDown" ? this.currentMenuItem.isSubmenuItem && (u(t), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
            this.currentMenuItem.elements.childMenu.focusFirstChild();
          })) : s === "ArrowUp" ? this.currentMenuItem.isSubmenuItem && (u(t), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
            this.currentMenuItem.elements.childMenu.focusLastChild();
          })) : s === "Home" ? (u(t), this.focusFirstChild()) : s === "End" ? (u(t), this.focusLastChild()) : s === "Escape" && (this.elements.submenuToggles.some(
            (f) => f.isOpen
          ) ? (u(t), this.closeChildren()) : this.isTopLevel && this.elements.controller && this.elements.controller.isOpen && (u(t), this.elements.controller.close(), this.focusController()));
      } else
        s === "Space" || s === "Enter" ? this.currentMenuItem.isSubmenuItem ? (u(t), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : this.currentMenuItem.dom.link.click() : s === "Escape" ? (u(t), this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusCurrentChild()) : s === "ArrowRight" ? this.currentMenuItem.isSubmenuItem ? (u(t), this.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.currentMenuItem.elements.toggle.open(), requestAnimationFrame(() => {
          this.currentMenuItem.elements.childMenu.focusFirstChild();
        })) : (u(t), this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusNextChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && this.elements.rootMenu.currentMenuItem.elements.toggle.preview()) : s === "ArrowLeft" ? this.elements.parentMenu.currentMenuItem.isSubmenuItem && (u(t), this.elements.parentMenu.currentMenuItem.elements.toggle.close(), this.elements.parentMenu.focusCurrentChild(), this.elements.parentMenu === this.elements.rootMenu && (this.elements.rootMenu.closeChildren(), this.elements.rootMenu.focusPreviousChild(), this.elements.rootMenu.currentMenuItem.isSubmenuItem && (this.elements.rootMenu.currentMenuItem.elements.childMenu.currentEvent = "keyboard", this.elements.rootMenu.currentMenuItem.elements.toggle.preview()))) : s === "ArrowDown" ? (u(t), this.focusNextChild()) : s === "ArrowUp" ? (u(t), this.focusPreviousChild()) : s === "Home" ? (u(t), this.focusFirstChild()) : s === "End" && (u(t), this.focusLastChild());
    });
  }
  /**
   * Focus the menu's next child.
   *
   * If the currently focussed child in the menu is the last child then this will
   * focus the first child in the menu.
   *
   * @public
   */
  focusNextChild() {
    this.currentChild === this.elements.menuItems.length - 1 ? this.focusFirstChild() : this.focusChild(this.currentChild + 1);
  }
  /**
   * Focus the menu's previous child.
   *
   * If the currently focussed child in the menu is the first child then this will
   * focus the last child in the menu.
   *
   * @public
   */
  focusPreviousChild() {
    this.currentChild === 0 ? this.focusLastChild() : this.focusChild(this.currentChild - 1);
  }
  /**
   * Focus the menu's next child starting with a specific letter.
   *
   * @public
   *
   * @param {string} char - The character to look for.
   */
  focusNextChildWithCharacter(t) {
    const s = t.toLowerCase();
    let i = this.currentChild + 1, r = !1;
    for (; !r && i < this.elements.menuItems.length; ) {
      let l = "";
      this.elements.menuItems[i].dom.item.innerText ? l = this.elements.menuItems[i].dom.item.innerText : l = this.elements.menuItems[i].dom.item.textContent, l = l.replace(/[\s]/g, "").toLowerCase().charAt(0), l === s && (r = !0, this.focusChild(i)), i++;
    }
  }
}
export {
  F as default
};
