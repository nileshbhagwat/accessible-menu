/**
 * Tests for Menubar's aria compliance.
 */

import { describe, it, expect } from "vitest";
import { twoLevel } from "../../../demo/menus.js";
import Menubar from "../../../src/menubar.js";

describe("Menubar", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevel;

  // Create a new Menubar instance for testing.
  const menu = new Menubar({
    menuElement: document.querySelector("ul"),
    containerElement: document.querySelector("nav"),
    controllerElement: document.querySelector("button"),
  });

  // Test the root menu's aria-labelledby attribute.
  it("should set the root menu's aria-labelledby attribute", () => {
    expect(menu.dom.menu.getAttribute("aria-labelledby")).toBe(
      menu.dom.controller.id
    );
  });

  // Test the root menu's role attribute.
  it("should set the root menu's role attribute", () => {
    expect(menu.dom.menu.getAttribute("role")).toBe("menubar");
  });

  // Test the root menu's controller's aria-expanded attribute.
  it("should set the root menu's controller's aria-expanded attribute", () => {
    expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
  });

  // Test the root menu's controller's aria-expanded attribute when the menu is open.
  it("should set the root menu's controller's aria-expanded attribute when the menu is open", () => {
    menu.elements.controller.open();
    expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("true");
  });

  // Test the root menu's controller's aria-expanded attribute when the menu is closed.
  it("should set the root menu's controller's aria-expanded attribute when the menu is closed", () => {
    menu.elements.controller.close();
    expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
  });

  // Test each menu item for aria compliance.
  describe.each(
    menu.elements.menuItems.map((item, index) => ({ index, item }))
  )("Menu item $index", ({ index, item }) => {
    // Test the menu item's role attribute.
    it("should set the menu item's role attribute", () => {
      expect(item.dom.item.getAttribute("role")).toBe("none");
    });

    // Test the menu item's link's role attribute.
    it("should set the menu item's link's role attribute", () => {
      expect(item.dom.link.getAttribute("role")).toBe("menuitem");
    });

    // Test the menu item's link's tabindex attribute.
    const tabIndex = index === 0 ? "0" : "-1";
    it("should set the menu item's link's tabindex attribute", () => {
      expect(item.dom.link.getAttribute("tabindex")).toBe(tabIndex);
    });
  });

  // Test each submenu for aria compliance.
  describe.each(
    menu.elements.submenuToggles.map((toggle, index) => ({ index, toggle }))
  )("Submenu $index", ({ toggle }) => {
    // Test the submenu's aria-labelledby attribute.
    it("should set the submenu's aria-labelledby attribute", () => {
      expect(
        toggle.elements.controlledMenu.dom.menu.getAttribute("aria-labelledby")
      ).toBe(toggle.dom.toggle.id);
    });

    // Test the submenu's role attribute.
    it("should set the submenu's role attribute", () => {
      expect(toggle.elements.controlledMenu.dom.menu.getAttribute("role")).toBe(
        "menu"
      );
    });

    // Test the submenu toggle's aria-haspopup attribute.
    it("should set the submenu toggle's aria-haspopup attribute", () => {
      expect(toggle.dom.toggle.getAttribute("aria-haspopup")).toBe("true");
    });

    // Test the submenu toggle's aria-expanded attribute.
    it("should set the submenu toggle's aria-expanded attribute", () => {
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
    });

    // Test the submenu toggle's aria-expanded attribute when the menu is open.
    it("should set the submenu toggle's aria-expanded attribute when the menu is open", () => {
      toggle.open();
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("true");
    });

    // Test the submenu toggle's aria-expanded attribute when the menu is closed.
    it("should set the submenu toggle's aria-expanded attribute when the menu is closed", () => {
      toggle.close();
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
    });

    // Test each submenu item for aria compliance.
    describe.each(
      toggle.elements.controlledMenu.elements.menuItems.map((item, index) => ({
        index,
        item,
      }))
    )("Submenu item $index", ({ item }) => {
      // Test the submenu item's role attribute.
      it("should set the submenu item's role attribute", () => {
        expect(item.dom.item.getAttribute("role")).toBe("none");
      });

      // Test the submenu item's link's role attribute.
      it("should set the submenu item's link's role attribute", () => {
        expect(item.dom.link.getAttribute("role")).toBe("menuitem");
      });

      // Test the submenu item's link's tabindex attribute.
      it("should set the submenu item's link's tabindex attribute", () => {
        expect(item.dom.link.getAttribute("tabindex")).toBe("-1");
      });
    });
  });
});
