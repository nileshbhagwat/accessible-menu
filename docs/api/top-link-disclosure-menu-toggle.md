# Top Link Disclosure Menu Toggle

A link or button that controls the visibility of a [TopLinkDisclosureMenu](./top-link-disclosure-menu).

::: info Note

This is a subclass of [BaseMenuToggle](./base-menu-toggle).

:::

## Constructor

Constructs a new `TopLinkDisclosureMenuToggle`.

```js
new TopLinkDisclosureMenuToggle({
  menuToggleElement,
  parentElement,
  controlledMenu,
  parentMenu,
  initialize,
});
```

The constructor will call [BaseMenuToggle's constructor](./base-menu-toggle#constructor) with the provided options. It will also initialize the menu toggle if the initialize flag is set to true.

### Parameters {#constructor--parameters}

| Name | Type | Description | Default |
| --- | --- | --- | --- |
| options | `object` | The options for generating the menu toggle. | `undefined` |
| options.menuToggleElement | `HTMLElement` | The toggle element in the DOM. | `undefined` |
| options.parentElement | `HTMLElement` | The element containing the controlled menu. | `undefined` |
| options.controlledMenu | `TopLinkDisclosureMenu` | The menu controlled by this toggle. | `undefined` |
| options.parentMenu | `TopLinkDisclosureMenu`, `null` | The menu containing this toggle. | `null` |
| options.initialize | `boolean` | A flag to initialize the menu toggle immediately upon creation. | `true` |

## Initialize

The initialize method is inherited from the [BaseMenuToggle](./base-menu-toggle#initialize) class. There are no customizations for the TopLinkDisclosureMenuToggle class.

## Properties

Properties are inherited from the [BaseMenuToggle](./base-menu-toggle#properties) class. There are no custom properties for the TopLinkDisclosureMenuToggle class.

## Getters and Setters

Getters and setters are inherited from the [BaseMenuToggle](./base-menu-toggle#getters-and-setters) class. There are no custom getters and setters for the TopLinkDisclosureMenuToggle class.

## Methods

Methods are inherited from the [BaseMenuToggle](./base-menu-toggle#methods) class. The following methods are unique to or overwritten in the TopLinkDisclosureMenuToggle class.

### _setAriaAttributes <badge type="warning" text="protected" /> {#method--setAriaAttributes}

Sets the ARIA attributes on the toggle and controlled menu.

```js
TopLinkDisclosureMenuToggle._setAriaAttributes();
```

Calls the [BaseMenuToggle's _setAriaAttributes method](./base-menu-toggle#method--setAriaAttributes).

Ensures the toggle element has a `role` of "button" if it is not already a button.

Then using the toggle and menu's IDs, the toggle's `aria-controls` is set to the menu's ID.

### open <badge type="tip" text="public" /> {#method--open}

Opens and controlled menu.

```js
TopLinkDisclosureMenuToggle.open();
```

Calls the [closeSiblings (inherited) method](./base-menu-toggle#method--closesiblings) and _then_ [BaseMenuToggle's open method](./base-menu-toggle#method--open).

### preview <badge type="tip" text="public" /> {#method--preview}

Opens the controlled menu without the current focus entering it.

```js
TopLinkDisclosureMenuToggle.preview();
```

Calls the [closeSiblings (inherited) method](./base-menu-toggle#method--closesiblings) and _then_ [BaseMenuToggle's preview method](./base-menu-toggle#method--preview).

### close <badge type="tip" text="public" /> {#method--close}

Closes the controlled menu.

```js
TopLinkDisclosureMenuToggle.close();
```

Calls the [closeChildren (inherited) method](./base-menu-toggle#method--closechildren) and _then_ [BaseMenuToggle's close method](./base-menu-toggle#method--close).
