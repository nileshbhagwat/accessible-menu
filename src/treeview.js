import BaseMenu from "./_baseMenu.js";
import TreeviewItem from "./treeviewItem.js";
import TreeviewToggle from "./treeviewToggle.js";
import { keyPress, preventEvent } from "./eventHandlers.js";

/**
 * An accessible treeview navigation in the DOM.
 *
 * See Navigation Treeview Example Using Computed Properties
 *
 * @extends BaseMenu
 *
 * @example
 * // Import the class.
 * import { Treeview } from "accessible-menu";
 *
 * // Select the desired menu element.
 * const menuElement = document.querySelector("nav ul");
 *
 * // Create the menu.
 * const menu = new Treeview({
 *   menuElement,
 * });
 */
class Treeview extends BaseMenu {
  /**
   * The class to use when generating submenus.
   *
   * @protected
   *
   * @type {typeof Treeview}
   */
  _MenuType = Treeview;

  /**
   * The class to use when generating menu items.
   *
   * @protected
   *
   * @type {typeof TreeviewItem}
   */
  _MenuItemType = TreeviewItem;

  /**
   * The class to use when generating submenu toggles.
   *
   * @protected
   *
   * @type {typeof TreeviewToggle}
   */
  _MenuToggleType = TreeviewToggle;

  /**
   * Constructs a new `Treeview`.
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
   * @param {?Treeview}          [options.parentMenu = null]                - The parent menu to this menu.
   * @param {string}             [options.hoverType = off]                  - The type of hoverability a menu has.
   * @param {number}             [options.hoverDelay = 250]                 - The delay for opening and closing menus if the menu is hoverable (in milliseconds).
   * @param {number}             [options.enterDelay = -1]                  - The delay for opening a menu if the menu is focusable (in milliseconds).
   * @param {number}             [options.leaveDelay = -1]                  - The delay for closing a menu if the menu is focusable (in milliseconds).
   * @param {?string}            [options.prefix = am-]                     - The prefix to use for CSS custom properties.
   * @param {boolean}            [options.initialize = true]                - A flag to initialize the menu immediately upon creation.
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
    isTopLevel = true,
    parentMenu = null,
    hoverType = "off",
    hoverDelay = 250,
    enterDelay = -1,
    leaveDelay = -1,
    prefix = "am-",
    initialize = true,
  }) {
    super({
      menuElement,
      menuItemSelector,
      menuLinkSelector,
      submenuItemSelector,
      submenuToggleSelector,
      submenuSelector,
      controllerElement,
      containerElement,
      openClass,
      closeClass,
      transitionClass,
      transitionDuration,
      isTopLevel,
      parentMenu,
      hoverType,
      hoverDelay,
      enterDelay,
      leaveDelay,
      prefix,
    });

    if (initialize) {
      this.initialize();
    }
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
   * If the menu is a root menu it's `role` will be set to "tree" and the first
   * menu item's `tabIndex` will be set to 0 in the DOM.
   *
   * If the menu is _not_ a root menu it's `role` will be set to "group".
   *
   * If the BaseMenu's initialize method throws an error,
   * this will catch it and log it to the console.
   */
  initialize() {
    try {
      super.initialize();

      if (this.isTopLevel) {
        this.dom.menu.setAttribute("role", "tree");
        this.elements.menuItems[0].dom.link.tabIndex = 0;
      } else {
        this.dom.menu.setAttribute("role", "group");
      }

      this._handleFocus();
      this._handleClick();
      this._handleHover();
      this._handleKeydown();
      this._handleKeyup();

      // Remove the aria-owns attribute from the controller.
      // It isn't needed for the root toggle.
      if (this.isTopLevel && this.elements.controller) {
        this.elements.controller.dom.toggle.removeAttribute("aria-owns");
      }
    } catch (error) {
      console.error(error);
    }
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
   * - When a `pointerleave` event triggers on the menu itself the
   *   closeChildren method will be called after a delay
   *   set by the menu's hover delay.
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

      if (this.isTopLevel) {
        this.dom.menu.addEventListener("pointerleave", (event) => {
          // Exit out of the event if it was not made by a mouse.
          if (event.pointerType === "pen" || event.pointerType === "touch") {
            return;
          }

          if (this.hoverType === "on") {
            if (this.leaveDelay > 0) {
              this._clearTimeout();
              this._setTimeout(() => {
                this.closeChildren();
                this.blur();
              }, this.leaveDelay);
            } else {
              this.closeChildren();
              this.blur();
            }
          }
        });
      }
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
   *     "*" (asterisk), and "A" through "Z".
   *   - Moves focus out if the "Tab" key is pressed.
   *
   * @protected
   */
  _handleKeydown() {
    super._handleKeydown();

    this.dom.menu.addEventListener("keydown", (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);

      if (key === "Tab") {
        // Hitting Tab:
        // - Moves focus out of the menu.
        if (this.elements.rootMenu.focusState !== "none") {
          this.elements.rootMenu.blur();
        } else {
          this.elements.rootMenu.focus();
        }
      }

      if (this.focusState === "self") {
        const keys = [
          "Space",
          "ArrowUp",
          "ArrowDown",
          "ArrowLeft",
          "Asterisk",
          "Home",
          "End",
        ];
        const submenuKeys = ["Enter", "ArrowRight"];
        const controllerKeys = ["Escape"];

        if (keys.includes(key)) {
          preventEvent(event);
        } else if (
          this.currentMenuItem.isSubmenuItem &&
          submenuKeys.includes(key)
        ) {
          preventEvent(event);
        } else if (this.elements.controller && controllerKeys.includes(key)) {
          preventEvent(event);
        }
      }
    });
  }

  /**
   * Handles keyup events throughout the menu for proper menu use.
   *
   * Adds all `keyup` listeners from BaseMenu's _handleKeyup method.
   *
   * Adds the following keybindings (explanations are taken from the
   * Navigation Treeview Example Using Computed Properties):
   *
   * | Key | Function |
   * | --- | --- |
   * | _Enter_ or _Space_ | Performs the default action (e.g. onclick event) for the focused node. |
   * | _Down arrow_ | <ul><li>Moves focus to the next node that is focusable without opening or closing a node.</li><li>If focus is on the last node, does nothing.</li></ul> |
   * | _Up arrow_ | <ul><li>Moves focus to the previous node that is focusable without opening or closing a node.</li><li>If focus is on the first node, does nothing.</li></ul> |
   * | _Right arrow_ | <ul><li>When focus is on a closed node, opens the node; focus does not move.</li><li>When focus is on a open node, moves focus to the first child node.</li><li>When focus is on an end node, does nothing.</li></ul> |
   * | _Left arrow_ | <ul><li>When focus is on an open node, closes the node.</li><li>When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.</li><li>When focus is on a root node that is also either an end node or a closed node, does nothing.</li></ul> |
   * | _Home_ | Moves focus to first node without opening or closing a node. |
   * | _End_ | Moves focus to the last node that can be focused without expanding any nodes that are closed. |
   * | _a-z_, _A-Z_ | <ul><li>Focus moves to the next node with a name that starts with the typed character.</li><li>Search wraps to first node if a matching name is not found among the nodes that follow the focused node.</li><li>Search ignores nodes that are descendants of closed nodes.</li></ul> |
   * | _* (asterisk)_ | <ul><li>Expands all closed sibling nodes that are at the same level as the focused node.</li><li>Focus does not move.</li></ul> |
   * | _Escape_ | If the root menu is collapsible, collapses the menu and focuses the menu's controlling element. |
   *
   * @protected
   */
  _handleKeyup() {
    super._handleKeyup();

    this.dom.menu.addEventListener("keyup", (event) => {
      this.currentEvent = "keyboard";

      const key = keyPress(event);
      const { altKey, crtlKey, metaKey } = event;
      const modifier = altKey || crtlKey || metaKey;

      if (key === "Character" && !modifier) {
        // Hitting Character:
        // - Focus moves to the next node with a name that starts with the typed character.
        // - Search wraps to first node if a matching name is not found among the nodes that follow the focused node.
        // - Search ignores nodes that are descendants of closed nodes.
        preventEvent(event);
        this.elements.rootMenu.currentEvent = "character";
        this.focusNextNodeWithCharacter(event.key);
      } else if (this.focusState === "self") {
        if (key === "Enter" || key === "Space") {
          // Hitting Space or Enter:
          // - Performs the default action (e.g. onclick event) for the focused node.
          // - If focus is on a closed node, opens the node; focus does not move.
          preventEvent(event);

          if (this.currentMenuItem.isSubmenuItem) {
            if (this.currentMenuItem.elements.toggle.isOpen) {
              this.currentMenuItem.elements.toggle.close();
            } else {
              this.currentMenuItem.elements.toggle.preview();
            }
          } else {
            this.currentMenuItem.dom.link.click();
          }
        } else if (key === "Escape") {
          if (
            this.isTopLevel &&
            this.elements.controller &&
            this.elements.controller.isOpen
          ) {
            this.elements.controller.close();
            this.focusController();
          }
        } else if (key === "ArrowDown") {
          // Hitting the Down Arrow:
          // - Moves focus to the next node that is focusable without opening or closing a node.
          // - If focus is on the last node, does nothing.
          preventEvent(event);

          if (
            this.currentMenuItem.isSubmenuItem &&
            this.currentMenuItem.elements.toggle.isOpen
          ) {
            this.blurCurrentChild();
            this.currentMenuItem.elements.childMenu.currentEvent =
              this.currentEvent;
            this.currentMenuItem.elements.childMenu.focusFirstChild();
          } else if (
            !this.isTopLevel &&
            this.currentChild === this.elements.menuItems.length - 1
          ) {
            this.focusParentsNextChild();
          } else {
            this.focusNextChild();
          }
        } else if (key === "ArrowUp") {
          // Hitting the Up Arrow:
          // - Moves focus to the previous node that is focusable without opening or closing a node.
          // - If focus is on the first node, does nothing.
          preventEvent(event);

          const previousMenuItem =
            this.elements.menuItems[this.currentChild - 1];

          if (
            previousMenuItem &&
            previousMenuItem.isSubmenuItem &&
            previousMenuItem.elements.toggle.isOpen
          ) {
            this.blurCurrentChild();
            this.currentChild = this.currentChild - 1;
            this.currentMenuItem.elements.childMenu.currentEvent =
              this.currentEvent;
            this.focusChildsLastNode();
          } else if (!this.isTopLevel && this.currentChild === 0) {
            this.blurCurrentChild();
            this.elements.parentMenu.currentEvent = this.currentEvent;
            this.elements.parentMenu.focusCurrentChild();
          } else {
            this.focusPreviousChild();
          }
        } else if (key === "ArrowRight") {
          // Hitting the Right Arrow:
          // - When focus is on a closed node, opens the node; focus does not move.
          // - When focus is on a open node, moves focus to the first child node.
          // - When focus is on an end node, does nothing.
          if (this.currentMenuItem.isSubmenuItem) {
            preventEvent(event);

            if (this.currentMenuItem.elements.toggle.isOpen) {
              this.blurCurrentChild();
              this.currentMenuItem.elements.childMenu.currentEvent =
                this.currentEvent;
              this.currentMenuItem.elements.childMenu.focusFirstChild();
            } else {
              this.currentMenuItem.elements.toggle.preview();
            }
          }
        } else if (key === "ArrowLeft") {
          // Hitting the Left Arrow:
          // - When focus is on an open node, closes the node.
          // - When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
          // - When focus is on a root node that is also either an end node or a closed node, does nothing.
          preventEvent(event);

          if (
            this.currentMenuItem.isSubmenuItem &&
            this.currentMenuItem.elements.toggle.isOpen
          ) {
            this.currentMenuItem.elements.childMenu.blurCurrentChild();
            this.currentMenuItem.elements.toggle.close();
          } else if (!this.isTopLevel) {
            this.blurCurrentChild();
            this.elements.parentMenu.currentEvent = this.currentEvent;
            this.elements.parentMenu.focusCurrentChild();
          }
        } else if (key === "Home") {
          // Hitting Home:
          // - Moves focus to first node without opening or closing a node.
          preventEvent(event);
          this.blurCurrentChild();
          this.elements.rootMenu.focusFirstChild();
        } else if (key === "End") {
          // Hitting End:
          // - Moves focus to the last node that can be focused without expanding any nodes that are closed.
          preventEvent(event);
          this.blurCurrentChild();
          this.elements.rootMenu.focusLastNode();
        } else if (key === "Asterisk") {
          // Hitting Asterisk:
          // - Expands all closed sibling nodes that are at the same level as the focused node.
          // - Focus does not move.
          preventEvent(event);
          this.openChildren();
        }
      }
    });
  }

  /**
   * Focus the menu's last node of the entire expanded menu.
   *
   * This includes all _open_ child menu items.
   *
   * @public
   */
  focusLastNode() {
    const numberOfItems = this.elements.menuItems.length - 1;
    const lastChild = this.elements.menuItems[numberOfItems];

    if (lastChild.isSubmenuItem && lastChild.elements.toggle.isOpen) {
      this.currentChild = numberOfItems;
      lastChild.elements.childMenu.currentEvent = this.currentEvent;
      lastChild.elements.childMenu.focusLastNode();
    } else {
      this.focusLastChild();
    }
  }

  /**
   * Open all submenu children.
   *
   * @public
   */
  openChildren() {
    this.elements.submenuToggles.forEach((toggle) => toggle.preview());
  }

  /**
   * Focus the menu's next node starting with a specific letter.
   *
   * This includes all _open_ child menu items.
   *
   * Wraps to the first node if no match is found after the current node.
   *
   * @public
   *
   * @param {string} char - The character to look for.
   */
  focusNextNodeWithCharacter(char) {
    /**
     * Gets all the menu's items and submenu's items.
     *
     * @param  {Treeview}       menu - The menu.
     * @return {TreeviewItem[]}      - The menu items.
     */
    function getOpenMenuItems(menu) {
      let menuItems = [];

      menu.elements.menuItems.forEach((menuItem) => {
        menuItems.push(menuItem);

        if (menuItem.isSubmenuItem && menuItem.elements.toggle.isOpen) {
          menuItems = [
            ...menuItems,
            ...getOpenMenuItems(
              menuItem.elements.toggle.elements.controlledMenu
            ),
          ];
        }
      });

      return menuItems;
    }

    // Ensure the character is lowercase just to be safe.
    const match = char.toLowerCase();
    // Sort the menu items so the child _after_ the current child is first to be searched.
    const menuItems = getOpenMenuItems(this.elements.rootMenu);
    const currentItem = menuItems.indexOf(this.currentMenuItem) + 1;
    const sortedMenuItems = [
      ...menuItems.slice(currentItem),
      ...menuItems.slice(0, currentItem),
    ];
    let ctr = 0;
    let found = false;

    while (!found && ctr < sortedMenuItems.length) {
      let text = "";

      // Attempt to use the browser to get proper innerText,
      // otherwise fall back to textContent.
      if (sortedMenuItems[ctr].dom.item.innerText) {
        text = sortedMenuItems[ctr].dom.item.innerText;
      } else {
        text = sortedMenuItems[ctr].dom.item.textContent;
      }

      // Remove spaces, make lowercase, and grab the first chracter of the string.
      text = text.replace(/[\s]/g, "").toLowerCase().charAt(0);

      // Focus the child if the text matches, otherwise move on.
      if (text === match) {
        found = true;
        const menu = sortedMenuItems[ctr].elements.parentMenu;
        const index = menu.elements.menuItems.indexOf(sortedMenuItems[ctr]);
        this.elements.rootMenu.blurChildren();
        menu.focusChild(index);
      }

      ctr++;
    }
  }

  /**
   * Focus the parent menu's next child.
   *
   * This will cascade up through to the root menu.
   *
   * @public
   */
  focusParentsNextChild() {
    if (!this.elements.parentMenu) return;

    this.elements.parentMenu.currentEvent = this.currentEvent;

    if (
      this.elements.parentMenu.currentChild ===
      this.elements.parentMenu.elements.menuItems.length - 1
    ) {
      this.elements.parentMenu.blurCurrentChild();
      this.elements.parentMenu.focusParentsNextChild();
    } else {
      this.blurChildren();
      this.elements.parentMenu.focusNextChild();
    }
  }

  /**
   * Focus the last child of the current child's submenu.
   *
   * This will cascade down through to the last open menu.
   *
   * @public
   */
  focusChildsLastNode() {
    this.currentMenuItem.elements.childMenu.currentEvent = this.currentEvent;
    this.currentMenuItem.elements.childMenu.focusLastChild();

    if (
      this.currentMenuItem.elements.childMenu.currentMenuItem.isSubmenuItem &&
      this.currentMenuItem.elements.childMenu.currentMenuItem.elements.toggle
        .isOpen
    ) {
      this.currentMenuItem.elements.childMenu.blurCurrentChild();
      this.currentMenuItem.elements.childMenu.focusChildsLastNode();
    }
  }
}

export default Treeview;
