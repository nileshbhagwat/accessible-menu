# Supported Hover Types

All menus provided by Accessible Menu support three types of hover: **off**, **on**, and **dynamic**.

## Hover Off

Hover **off** is the default hover type. All `pointerenter` and `pointerleave` events triggered on menu toggles are ignored, and submenus will only open or closed when the user clicks on the menu toggles.

```js
// DisclosureMenu is used in this example, but all menus support the hover delay.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "off", // Default: "off".
});
```

## Hover On

Hover **on** is the standard way a hoverable menu is expected to act. It will show the a menu when a `pointerenter` event is triggered on a menu toggle, and close the menu when a `pointerleave` event is triggered on the menu toggle or the menu itself.

```js
// DisclosureMenu is used in this example, but all menus support the hover delay.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "on", // Default: "off".
});
```

### Treeviews and Hover On

When using a treeview menu with hover **on**, `pointerenter` events are triggered as expected, however `pointerleave` events are handled differently. Leaving a menu item that is open will _not_ close that menu in a treeview. The only way a `pointerleave` event will close a menu item is if the root menu itself is left. This is to prevent a lot of visual confusion when hovering/unhovering menu items in a treeview.

## Hover Dynamic

Hover **dynamic** is a hybrid of hover **off** and hover **on**. The menu will function as if it is in hover **off** mode until the user clicks a menu toggle to open a submenu. Once a submenu is open, the menu will function as if it is in hover **on** mode until the user clicks outside of the menu to close all submenus.

```js
// DisclosureMenu is used in this example, but all menus support the hover delay.
new DisclosureMenu({
  menuElement: document.querySelector("nav ul"),
  hoverType: "dynamic", // Default: "off".
});
```

### Treeviews and Hover Dynamic

When using a treeview menu with hover **dynamic**, `pointerenter` events are triggered as expected, however `pointerleave` events are handled differently. Leaving a menu item that is open will _not_ close that menu in a treeview. A menu must be manually closed through clicking it's toggle to close it.
