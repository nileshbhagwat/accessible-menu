// eslint-disable-next-line no-unused-vars
/* global DisclosureMenu, Menubar, TopLinkDisclosureMenu, Treeview */

import BaseMenuToggle from "./_baseMenuToggle.js";
import BaseMenuItem from "./_baseMenuItem.js";
import {
  isValidInstance,
  isValidType,
  isQuerySelector,
  isValidClassList,
  isValidState,
  isValidEvent,
  isValidHoverType,
  isTag,
} from "./validate.js";
import { preventEvent, keyPress } from "./eventHandlers.js";

/**
 * An accessible navigation element in the DOM.
 *
 * This is intended to be used as a "base" to other menus and not to be used on
 * it's own in the DOM.
 */
class BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof BaseMenu}
   */
  _MenuType = BaseMenu;

  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof BaseMenuItem}
   */
  _MenuItemType = BaseMenuItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof BaseMenuToggle}
   */
  _MenuToggleType = BaseMenuToggle;

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
  _dom = {
    menu: null,
    menuItems: [],
    submenuItems: [],
    submenuToggles: [],
    submenus: [],
    controller: null,
    container: null,
  };

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
  _selectors = {
    menuItems: "",
    menuLinks: "",
    submenuItems: "",
    submenuToggles: "",
    submenus: "",
  };

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
  _elements = {
    menuItems: [],
    submenuToggles: [],
    controller: null,
    parentMenu: null,
    rootMenu: null,
  };

  /**
   * The class(es) to apply when the menu is open.
   *
   * @protected
   *
   * @type {string|string[]}
   */
  _openClass = "show";

  /**
   * The class(es) to apply when the menu is closed.
   *
   * @protected
   *
   * @type {string|string[]}
   */
  _closeClass = "hide";

  /**
   * The class(es) to apply when the menu is transitioning between states.
   *
   * @protected
   *
   * @type {string|string[]}
   */
  _transitionClass = "transitioning";

  /**
   * The duration time (in milliseconds) for the transition between open and closed states.
   *
   * @protected
   *
   * @type {number}
   */
  _transitionDuration = 250;

  /**
   * The duration time (in milliseconds) for the transition from closed to open states.
   *
   * @protected
   *
   * @type {number}
   */
  _openDuration = -1;

  /**
   * The duration time (in milliseconds) for the transition from open to closed states.
   *
   * @protected
   *
   * @type {number}
   */
  _closeDuration = -1;

  /**
   * A flag marking the root menu.
   *
   * @protected
   *
   * @type {boolean}
   */
  _root = true;

  /**
   * The index of the currently selected menu item in the menu.
   *
   * @protected
   *
   * @type {number}
   */
  _currentChild = 0;

  /**
   * The current state of the menu's focus.
   *
   * @protected
   *
   * @type {string}
   */
  _focusState = "none";

  /**
   * This last event triggered on the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _currentEvent = "none";

  /**
   * The type of hoverability for the menu.
   *
   * @protected
   *
   * @type {string}
   */
  _hoverType = "off";

  /**
   * The delay time (in milliseconds) used for pointerenter/pointerleave events to take place.
   *
   * @protected
   *
   * @type {number}
   */
  _hoverDelay = 250;

  /**
   * The delay time (in milliseconds) used for pointerenter events to take place.
   *
   * @protected
   *
   * @type {number}
   */
  _enterDelay = -1;

  /**
   * The delay time (in milliseconds) used for pointerleave events to take place.
   *
   * @protected
   *
   * @type {number}
   */
  _leaveDelay = -1;

  /**
   * The prefix to use for CSS custom properties.
   *
   * @protected
   *
   * @type {string}
   */
  _prefix = "am-";

  /**
   * A variable to hold the hover timeout function.
   *
   * @protected
   *
   * @type {?Function}
   */
  _hoverTimeout = null;

  /**
   * A flag to check if the menu can dynamically hover based on if a menu has been opened already.
   *
   * @protected
   *
   * @type {boolean}
   */
  _hasOpened = false;

  /**
   * An array of error messages generated by the menu.
   *
   * @protected
   *
   * @type {string[]}
   */
  _errors = [];

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
    menuElement,
    menuItemSelector = "li",
    menuLinkSelector = "a",
    submenuItemSelector = "li:has(ul)",
    submenuToggleSelector = "a",
    submenuSelector = "ul",
    controllerElement = null,
    containerElement = null,
    openClass = "show",
    closeClass = "hide",
    transitionClass = "transitioning",
    transitionDuration = 250,
    openDuration = -1,
    closeDuration = -1,
    isTopLevel = true,
    parentMenu = null,
    hoverType = "off",
    hoverDelay = 250,
    enterDelay = -1,
    leaveDelay = -1,
    prefix = "am-",
  }) {
    // Set DOM elements.
    this._dom.menu = menuElement;
    this._dom.controller = controllerElement;
    this._dom.container = containerElement;

    // Set DOM selectors.
    this._selectors.menuItems = menuItemSelector;
    this._selectors.menuLinks = menuLinkSelector;
    this._selectors.submenuItems = submenuItemSelector;
    this._selectors.submenuToggles = submenuToggleSelector;
    this._selectors.submenus = submenuSelector;

    // Set menu elements.
    this._elements.menuItems = [];
    this._elements.submenuToggles = [];
    this._elements.controller = null;
    this._elements.parentMenu = parentMenu;
    this._elements.rootMenu = isTopLevel ? this : null;

    // Set open/close classes.
    this._openClass = openClass || "";
    this._closeClass = closeClass || "";
    this._transitionClass = transitionClass || "";

    // Set transition duration.
    this._transitionDuration = transitionDuration;
    this._openDuration = openDuration;
    this._closeDuration = closeDuration;

    // Set prefix.
    this._prefix = prefix || "";

    // Set root.
    this._root = isTopLevel;

    // Set hover settings.
    this._hoverType = hoverType;
    this._hoverDelay = hoverDelay;
    this._enterDelay = enterDelay;
    this._leaveDelay = leaveDelay;
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
    if (!this._validate()) {
      throw new Error(
        `AccesibleMenu: cannot initialize menu. The following errors have been found:\n - ${this.errors.join(
          "\n - "
        )}`
      );
    }

    // Get the root menu if it doesn't exist.
    if (this.elements.rootMenu === null) this._findRootMenu(this);

    // Set all of the DOM elements.
    this._setDOMElements();

    if (this.isTopLevel) {
      if (this.dom.controller && this.dom.container) {
        // Create a new BaseMenuToggle to control the menu.
        const toggle = new this._MenuToggleType({
          menuToggleElement: this.dom.controller,
          parentElement: this.dom.container,
          controlledMenu: this,
        });

        // If the toggle isn't a button, add the approriate role to let
        // screen readers know it should act like a button.
        if (!isTag("button", { toggle: toggle.dom.toggle })) {
          toggle.dom.toggle.setAttribute("role", "button");
        }

        // Set the controller's aria attributes.
        // These aren't necessarily the same as the standard menu toggle.
        toggle.dom.toggle.setAttribute("aria-controls", this.dom.menu.id);

        this._elements.controller = toggle;
      }
    }

    this._createChildElements();
    this._setTransitionDurations();

    // Add the menu to a globally accessible list of menus.
    if (this.isTopLevel) {
      window.AccessibleMenu = window.AccessibleMenu || {
        menus: {},
      };

      window.AccessibleMenu.menus[this.dom.menu.id] = this;
    }
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
    return this.isTopLevel
      ? this._closeClass
      : this.elements.rootMenu.closeClass;
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
    return this.isTopLevel
      ? this._transitionClass
      : this.elements.rootMenu.transitionClass;
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
    return this.isTopLevel
      ? this._transitionDuration
      : this.elements.rootMenu.transitionDuration;
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
    if (this._openDuration === -1) return this.transitionDuration;

    return this.isTopLevel
      ? this._openDuration
      : this.elements.rootMenu.openDuration;
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
    if (this._closeDuration === -1) return this.transitionDuration;

    return this.isTopLevel
      ? this._closeDuration
      : this.elements.rootMenu.closeDuration;
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
    if (this._enterDelay === -1) return this.hoverDelay;

    return this._root ? this._enterDelay : this.elements.rootMenu.enterDelay;
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
    if (this._leaveDelay === -1) return this.hoverDelay;

    return this._root ? this._leaveDelay : this.elements.rootMenu.leaveDelay;
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
    let check = false;

    if (this.currentEvent === "keyboard" || this.currentEvent === "character") {
      check = true;
    }

    if (this.currentEvent === "mouse" && this.hoverType === "dynamic") {
      check = true;
    }

    return check;
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

  set openClass(value) {
    isValidClassList({ openClass: value });

    if (this._openClass !== value) {
      this._openClass = value;
    }
  }

  set closeClass(value) {
    isValidClassList({ closeClass: value });

    if (this._closeClass !== value) {
      this._closeClass = value;
    }
  }

  set transitionClass(value) {
    isValidClassList({ transitionClass: value });

    if (this._transitionClass !== value) {
      this._transitionClass = value;
    }
  }

  set transitionDuration(value) {
    isValidType("number", { value });

    if (this._transitionDuration !== value) {
      this._transitionDuration = value;
      this._setTransitionDurations();
    }
  }

  set openDuration(value) {
    isValidType("number", { value });

    if (this._openDuration !== value) {
      this._openDuration = value;
      this._setTransitionDurations();
    }
  }

  set closeDuration(value) {
    isValidType("number", { value });

    if (this._closeDuration !== value) {
      this._closeDuration = value;
      this._setTransitionDurations();
    }
  }

  set currentChild(value) {
    isValidType("number", { value });

    /**
     * Update the parent menu's current child to make sure clicks
     * and other jumps don't interfere with keyboard navigation.
     *
     * @param {BaseMenu} menu - The initial menu.
     */
    function setParentChild(menu) {
      const updateEvents = ["mouse", "character"];

      if (
        updateEvents.includes(menu.currentEvent) &&
        menu.elements.parentMenu
      ) {
        let index = 0;
        let found = false;

        while (
          !found &&
          index < menu.elements.parentMenu.elements.menuItems.length
        ) {
          const menuItem = menu.elements.parentMenu.elements.menuItems[index];

          if (
            menuItem.isSubmenuItem &&
            menuItem.elements.toggle.elements.controlledMenu === menu
          ) {
            found = true;

            menu.elements.parentMenu.currentEvent = menu.currentEvent;
            menu.elements.parentMenu.currentChild = index;
          }

          index++;
        }
      }
    }

    if (value < -1) {
      this._currentChild = -1;
      setParentChild(this);
    } else if (value >= this.elements.menuItems.length) {
      this._currentChild = this.elements.menuItems.length - 1;
      setParentChild(this);
    } else if (this.focusChild !== value) {
      this._currentChild = value;
      setParentChild(this);
    }
  }

  set focusState(value) {
    isValidState({ value });

    if (this._focusState !== value) {
      this._focusState = value;
    }

    if (
      this.elements.submenuToggles.length > 0 &&
      (value === "self" || value === "none")
    ) {
      this.elements.submenuToggles.forEach((toggle) => {
        toggle.elements.controlledMenu.focusState = "none";
      });
    }

    if (this.elements.parentMenu && (value === "self" || value === "child")) {
      this.elements.parentMenu.focusState = "child";
    }
  }

  set currentEvent(value) {
    isValidEvent({ value });

    if (this._currentEvent !== value) {
      this._currentEvent = value;

      if (this.elements.submenuToggles.length > 0) {
        this.elements.submenuToggles.forEach((submenuToggle) => {
          submenuToggle.elements.controlledMenu.currentEvent = value;
        });
      }
    }
  }

  set hoverType(value) {
    isValidHoverType({ value });

    if (this._hoverType !== value) {
      this._hoverType = value;
    }
  }

  set hoverDelay(value) {
    isValidType("number", { value });

    if (this._hoverDelay !== value) {
      this._hoverDelay = value;
    }
  }

  set enterDelay(value) {
    isValidType("number", { value });

    if (this._enterDelay !== value) {
      this._enterDelay = value;
    }
  }

  set leaveDelay(value) {
    isValidType("number", { value });

    if (this._leaveDelay !== value) {
      this._leaveDelay = value;
    }
  }

  set prefix(value) {
    isValidType("string", { value });

    if (this._prefix !== value) {
      this._prefix = value;
    }
  }

  set hasOpened(value) {
    isValidType("boolean", { value });

    if (this._hasOpened !== value) {
      this._hasOpened = value;
    }
  }

  /**
   * Validates all aspects of the menu to ensure proper functionality.
   *
   * @protected
   *
   * @return {boolean} - The result of the validation.
   */
  _validate() {
    let check = true;

    // HTML element checks.
    let htmlElementChecks;

    if (this._dom.container !== null || this._dom.controller !== null) {
      htmlElementChecks = isValidInstance(HTMLElement, {
        menuElement: this._dom.menu,
        controllerElement: this._dom.controller,
        containerElement: this._dom.container,
      });
    } else {
      htmlElementChecks = isValidInstance(HTMLElement, {
        menuElement: this._dom.menu,
      });
    }

    if (!htmlElementChecks.status) {
      this._errors.push(htmlElementChecks.error.message);
      check = false;
    }

    // Query selector checks.
    let querySelectorChecks;

    if (this._selectors.submenuItems !== "") {
      querySelectorChecks = isQuerySelector({
        menuItemSelector: this._selectors.menuItems,
        menuLinkSelector: this._selectors.menuLinks,
        submenuItemSelector: this._selectors.submenuItems,
        submenuToggleSelector: this._selectors.submenuToggles,
        submenuSelector: this._selectors.submenus,
      });
    } else {
      querySelectorChecks = isQuerySelector({
        menuItemSelector: this._selectors.menuItems,
        menuLinkSelector: this._selectors.menuLinks,
      });
    }

    if (!querySelectorChecks.status) {
      this._errors.push(querySelectorChecks.error.message);
      check = false;
    }

    // Class list checks.
    if (this._openClass !== "") {
      const openClassCheck = isValidClassList({ openClass: this._openClass });

      if (!openClassCheck.status) {
        this._errors.push(openClassCheck.error.message);
        check = false;
      }
    }

    if (this._closeClass !== "") {
      const closeClassCheck = isValidClassList({
        closeClass: this._closeClass,
      });

      if (!closeClassCheck.status) {
        this._errors.push(closeClassCheck.error.message);
        check = false;
      }
    }

    if (this._transitionClass !== "") {
      const transitionClassCheck = isValidClassList({
        transitionClass: this._transitionClass,
      });

      if (!transitionClassCheck.status) {
        this._errors.push(transitionClassCheck.error.message);
        check = false;
      }
    }

    // Transition duration check.
    const transitionDurationCheck = isValidType("number", {
      transitionDuration: this._transitionDuration,
    });

    if (!transitionDurationCheck.status) {
      this._errors.push(transitionDurationCheck.error.message);
      check = false;
    }

    // Open duration check.
    const openDurationCheck = isValidType("number", {
      openDuration: this._openDuration,
    });

    if (!openDurationCheck.status) {
      this._errors.push(openDurationCheck.error.message);
      check = false;
    }

    // Close duration check.
    const closeDurationCheck = isValidType("number", {
      closeDuration: this._closeDuration,
    });

    if (!closeDurationCheck.status) {
      this._errors.push(closeDurationCheck.error.message);
      check = false;
    }

    // Top level check.
    const topLevelCheck = isValidType("boolean", { isTopLevel: this._root });

    if (!topLevelCheck.status) {
      this._errors.push(topLevelCheck.error.message);
      check = false;
    }

    // Parent menu check.
    if (this._elements.parentMenu !== null) {
      const parentCheck = isValidInstance(BaseMenu, {
        parentMenu: this._elements.parentMenu,
      });

      if (!parentCheck.status) {
        this._errors.push(parentCheck.error.message);
        check = false;
      }
    }

    // Hover type check.
    const hoverTypeCheck = isValidHoverType({ hoverType: this._hoverType });

    if (!hoverTypeCheck.status) {
      this._errors.push(hoverTypeCheck.error.message);
      check = false;
    }

    // Hover delay check.
    const hoverDelayCheck = isValidType("number", {
      hoverDelay: this._hoverDelay,
    });

    if (!hoverDelayCheck.status) {
      this._errors.push(hoverDelayCheck.error.message);
      check = false;
    }

    // Enter delay check.
    const enterDelayCheck = isValidType("number", {
      enterDelay: this._enterDelay,
    });

    if (!enterDelayCheck.status) {
      this._errors.push(enterDelayCheck.error.message);
      check = false;
    }

    // Leave delay check.
    const leaveDelayCheck = isValidType("number", {
      leaveDelay: this._leaveDelay,
    });

    if (!leaveDelayCheck.status) {
      this._errors.push(leaveDelayCheck.error.message);
      check = false;
    }

    // Prefix check.
    const prefixCheck = isValidType("string", { prefix: this._prefix });

    if (!prefixCheck.status) {
      this._errors.push(prefixCheck.error.message);
      check = false;
    }

    return check;
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
  _setDOMElementType(elementType, base = this.dom.menu, overwrite = true) {
    if (typeof this.selectors[elementType] === "string") {
      if (!Array.isArray(this.dom[elementType])) {
        throw new Error(
          `AccessibleMenu: The "${elementType}" element cannot be set through _setDOMElementType.`
        );
      }

      if (base !== this.dom.menu) isValidInstance(HTMLElement, { base });

      // Get the all elements matching the selector in the base.
      const domElements = Array.from(
        base.querySelectorAll(this.selectors[elementType])
      );

      // Filter the elements so only direct children of the base are kept.
      const filteredElements = domElements.filter(
        (item) => item.parentElement === base
      );

      if (overwrite) {
        this._dom[elementType] = filteredElements;
      } else {
        this._dom[elementType] = [
          ...this._dom[elementType],
          ...filteredElements,
        ];
      }
    } else {
      throw new Error(
        `AccessibleMenu: "${elementType}" is not a valid element type within the menu.`
      );
    }
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
  _resetDOMElementType(elementType) {
    if (typeof this.dom[elementType] !== "undefined") {
      if (!Array.isArray(this.dom[elementType])) {
        throw new Error(
          `AccessibleMenu: The "${elementType}" element cannot be reset through _resetDOMElementType.`
        );
      }

      this._dom[elementType] = [];
    } else {
      throw new Error(
        `AccessibleMenu: "${elementType}" is not a valid element type within the menu.`
      );
    }
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
    this._setDOMElementType("menuItems");

    if (this.selectors.submenuItems !== "") {
      this._setDOMElementType("submenuItems");

      this._resetDOMElementType("submenuToggles");
      this._resetDOMElementType("submenus");

      this.dom.submenuItems.forEach((item) => {
        this._setDOMElementType("submenuToggles", item, false);
        this._setDOMElementType("submenus", item, false);
      });
    }
  }

  /**
   * Finds the root menu element.
   *
   * @protected
   *
   * @param {BaseMenu} menu - The menu to check.
   */
  _findRootMenu(menu) {
    if (menu.isTopLevel) {
      this._elements.rootMenu = menu;
    } else if (menu.elements.parentMenu !== null) {
      this._findRootMenu(menu.elements.parentMenu);
    } else {
      throw new Error("Cannot find root menu.");
    }
  }

  /**
   * Creates and initializes all menu items and submenus.
   *
   * @protected
   */
  _createChildElements() {
    this.dom.menuItems.forEach((element) => {
      let menuItem;

      if (this.dom.submenuItems.includes(element)) {
        // The menu's toggle controller DOM element.
        const toggler = element.querySelector(this.selectors.submenuToggles);
        // The actual menu DOM element.
        const submenu = element.querySelector(this.selectors.submenus);

        // Create the new menu and initialize it.
        const menu = new this._MenuType({
          menuElement: submenu,
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
          isTopLevel: false,
          parentMenu: this,
          hoverType: this.hoverType,
          hoverDelay: this.hoverDelay,
          enterDelay: this.enterDelay,
          leaveDelay: this.leaveDelay,
        });

        // Create the new menu toggle.
        const toggle = new this._MenuToggleType({
          menuToggleElement: toggler,
          parentElement: element,
          controlledMenu: menu,
          parentMenu: this,
        });

        // Add the toggle to the list of toggles.
        this._elements.submenuToggles.push(toggle);

        // Create a new menu item.
        menuItem = new this._MenuItemType({
          menuItemElement: element,
          menuLinkElement: toggler,
          parentMenu: this,
          isSubmenuItem: true,
          childMenu: menu,
          toggle,
        });
      } else {
        const link = element.querySelector(this.selectors.menuLinks);

        // Create a new menu item.
        menuItem = new this._MenuItemType({
          menuItemElement: element,
          menuLinkElement: link,
          parentMenu: this,
        });
      }

      this._elements.menuItems.push(menuItem);
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
  _setTimeout(callback, delay) {
    isValidType("function", { callback });
    isValidType("number", { delay });

    this._hoverTimeout = setTimeout(callback, delay);
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
    this.elements.menuItems.forEach((menuItem, index) => {
      menuItem.dom.link.addEventListener("focus", () => {
        this.focusState = "self";
        this.currentChild = index;
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
    /**
     * Toggles a toggle element.
     *
     * @param {BaseMenu}       menu   - This menu.
     * @param {BaseMenuToggle} toggle - The menu toggle
     * @param {Event}          event  - A Javascript event.
     */
    function toggleToggle(menu, toggle, event) {
      preventEvent(event);

      if (event.button !== 0) {
        return;
      }

      toggle.toggle();

      if (toggle.isOpen) {
        menu.focusState = "self";
        toggle.elements.controlledMenu.focusState = "none";
      }
    }

    this.elements.menuItems.forEach((item, index) => {
      // Properly focus the current menu item.
      item.dom.link.addEventListener(
        "pointerdown",
        () => {
          this.currentEvent = "mouse";
          this.elements.rootMenu.blurChildren();
          this._clearTimeout();
          this.focusChild(index);
        },
        { passive: true }
      );

      // Properly toggle submenus open and closed.
      if (item.isSubmenuItem) {
        item.elements.toggle.dom.toggle.addEventListener(
          "pointerup",
          (event) => {
            this.currentEvent = "mouse";
            toggleToggle(this, item.elements.toggle, event);
          }
        );
      }
    });

    // Open the this menu if it's controller is clicked.
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener(
        "pointerup",
        (event) => {
          this.currentEvent = "mouse";
          toggleToggle(this, this.elements.controller, event);
        }
      );
    }

    // If the menu has no open children, set hasOpened to false.
    document.addEventListener("pointerup", (event) => {
      if (this.focusState !== "none") {
        this.currentEvent = "mouse";

        if (
          !this.dom.menu.contains(event.target) &&
          !this.dom.menu !== event.target
        ) {
          this.elements.rootMenu.hasOpened = this.elements.submenuToggles.some(
            (toggle) => toggle.isOpen
          );
        }
      }
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
    this.elements.menuItems.forEach((menuItem, index) => {
      menuItem.dom.link.addEventListener("pointerenter", (event) => {
        // Exit out of the event if it was not made by a mouse.
        if (event.pointerType === "pen" || event.pointerType === "touch") {
          return;
        }

        if (this.hoverType === "on") {
          this.currentEvent = "mouse";
          this.elements.rootMenu.blurChildren();
          this.focusChild(index);

          if (menuItem.isSubmenuItem) {
            if (this.enterDelay > 0) {
              this._clearTimeout();
              this._setTimeout(() => {
                menuItem.elements.toggle.preview();
              }, this.enterDelay);
            } else {
              menuItem.elements.toggle.preview();
            }
          }
        } else if (this.hoverType === "dynamic") {
          this.currentChild = index;

          if (!this.isTopLevel || this.focusState !== "none") {
            this.currentEvent = "mouse";
            this.elements.rootMenu.blurChildren();
            this.focusCurrentChild();
          }

          if (!this.isTopLevel || this.hasOpened) {
            this.currentEvent = "mouse";
            this.elements.rootMenu.blurChildren();
            this.focusCurrentChild();

            if (menuItem.isSubmenuItem) {
              if (this.enterDelay > 0) {
                this._clearTimeout();
                this._setTimeout(() => {
                  menuItem.elements.toggle.preview();
                }, this.enterDelay);
              } else {
                menuItem.elements.toggle.preview();
              }
            } else {
              if (this.enterDelay > 0) {
                this._clearTimeout();
                this._setTimeout(() => {
                  this.closeChildren();
                }, this.enterDelay);
              } else {
                this.closeChildren();
              }
            }
          }
        }
      });

      if (menuItem.isSubmenuItem) {
        menuItem.dom.item.addEventListener("pointerleave", (event) => {
          // Exit out of the event if it was not made by a mouse.
          if (event.pointerType === "pen" || event.pointerType === "touch") {
            return;
          }

          if (this.hoverType === "on") {
            if (this.leaveDelay > 0) {
              this._clearTimeout();
              this._setTimeout(() => {
                this.currentEvent = "mouse";
                menuItem.elements.toggle.close();
              }, this.leaveDelay);
            } else {
              this.currentEvent = "mouse";
              menuItem.elements.toggle.close();
            }
          } else if (this.hoverType === "dynamic") {
            if (this.leaveDelay > 0) {
              this._clearTimeout();
              this._setTimeout(() => {
                this.currentEvent = "mouse";
              }, this.leaveDelay);
            } else {
              this.currentEvent = "mouse";
            }
          }
        });

        // Clear hover timeouts any time the mouse enters an item with a submenu. This prevents the
        // menu from closing if the mouse leaves but then re-enters before leaveDelay has elapsed.
        menuItem.dom.item.addEventListener("pointerenter", (event) => {
          // Exit out of the event if it was not made by a mouse.
          if (event.pointerType === "pen" || event.pointerType === "touch") {
            return;
          }
          if (
            menuItem.isSubmenuItem &&
            (this.hoverType === "on" || this.hoverType === "dynamic") &&
            this.leaveDelay > 0
          ) {
            this._clearTimeout();
          }
        });
      }
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
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener(
        "keydown",
        (event) => {
          this.currentEvent = "keyboard";

          const key = keyPress(event);

          if (key === "Space" || key === "Enter") {
            preventEvent(event);
          }
        }
      );
    }
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
    if (this.isTopLevel && this.elements.controller) {
      this.elements.controller.dom.toggle.addEventListener("keyup", (event) => {
        this.currentEvent = "keyboard";

        const key = keyPress(event);

        if (key === "Space" || key === "Enter") {
          preventEvent(event);
          this.elements.controller.toggle();

          // If the menu is open, focus the first child.
          if (this.elements.controller.isOpen) {
            this.focusFirstChild();
          }
        }
      });
    }
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
    );

    this.dom.menu.style.setProperty(
      `--${this.prefix}open-transition-duration`,
      `${this.openDuration}ms`
    );

    this.dom.menu.style.setProperty(
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
    this.focusState = "self";

    if (this.shouldFocus) {
      this.dom.menu.focus();
    }
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
    this.focusState = "none";

    if (this.shouldFocus) {
      this.dom.menu.blur();
    }
  }

  /**
   * Focus the menu's current child.
   *
   * @public
   */
  focusCurrentChild() {
    this.focusState = "self";

    if (this.currentChild !== -1) {
      this.currentMenuItem.focus();
    }
  }

  /**
   * Focuses the menu's child at a given index.
   *
   * @public
   *
   * @param {number} index - The index of the child to focus.
   */
  focusChild(index) {
    this.blurCurrentChild();
    this.currentChild = index;
    this.focusCurrentChild();
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
    if (this.currentChild < this.elements.menuItems.length - 1) {
      this.focusChild(this.currentChild + 1);
    } else {
      this.focusCurrentChild();
    }
  }

  /**
   * Focus the menu's previous child.
   *
   * @public
   */
  focusPreviousChild() {
    if (this.currentChild > 0) {
      this.focusChild(this.currentChild - 1);
    } else {
      this.focusCurrentChild();
    }
  }

  /**
   * Blurs the menu's current child.
   *
   * @public
   */
  blurCurrentChild() {
    this.focusState = "none";

    if (this.currentChild !== -1) {
      this.currentMenuItem.blur();
    }
  }

  /**
   * Focus the menu's controller.
   *
   * @public
   */
  focusController() {
    if (this.dom.controller) {
      if (this.shouldFocus) {
        this.dom.controller.focus();
      }

      this.focusState = "none";
    }
  }

  /**
   * Focus the menu's container.
   *
   * @public
   */
  focusContainer() {
    if (this.dom.container) {
      if (this.shouldFocus) {
        this.dom.container.focus();
      }

      this.focusState = "none";
    }
  }

  /**
   * Close all submenu children.
   *
   * @public
   */
  closeChildren() {
    this.elements.submenuToggles.forEach((toggle) => toggle.close());
  }

  /**
   * Blurs all children and submenu's children.
   *
   * @public
   */
  blurChildren() {
    this.elements.menuItems.forEach((menuItem) => {
      menuItem.blur();

      if (menuItem.isSubmenuItem) {
        menuItem.elements.childMenu.blurChildren();
      }
    });
  }
}

export default BaseMenu;
