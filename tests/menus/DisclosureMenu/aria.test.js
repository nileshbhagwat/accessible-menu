/**
 * Tests for DisclosureMenu's aria compliance.
 */

import { describe, it, expect } from "vitest";
import { twoLevelDisclosure } from "../../../demo/menus.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";

describe("DisclosureMenu", () => {
  // Create the test menu.
  document.body.innerHTML = twoLevelDisclosure;

  // Create a new DisclosureMenu instance for testing.
  const menu = new DisclosureMenu({
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

  // Test the root menu's controller's aria-expanded attribute.
  it("should set the root menu's controller's aria-expanded attribute", () => {
    expect(menu.dom.controller.getAttribute("aria-expanded")).toBe("false");
  });

  // Test the root menu's controller's aria-controls attribute.
  it("should set the root menu's controller's aria-controls attribute", () => {
    expect(menu.dom.controller.getAttribute("aria-controls")).toBe(
      menu.dom.menu.id
    );
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

    // Test the submenu toggle's aria-expanded attribute.
    it("should set the submenu toggle's aria-expanded attribute", () => {
      expect(toggle.dom.toggle.getAttribute("aria-expanded")).toBe("false");
    });

    // Test the submenu toggle's aria-controls attribute.
    it("should set the submenu toggle's aria-controls attribute", () => {
      expect(toggle.dom.toggle.getAttribute("aria-controls")).toBe(
        toggle.elements.controlledMenu.dom.menu.id
      );
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
  });
});
