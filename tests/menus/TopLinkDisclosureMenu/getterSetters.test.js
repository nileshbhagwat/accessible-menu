/**
 * Getter/Setter tests for the TopLinkDisclosureMenu class
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import TopLinkDisclosureMenu from "../../../src/topLinkDisclosureMenu.js";
import { twoLevelDisclosureTopLink } from "../../../demo/menus.js";
import BaseMenu from "../../../src/_baseMenu.js";
import * as validation from "../../../src/validate.js";

beforeEach(() => {
  document.body.innerHTML = twoLevelDisclosureTopLink;
});

afterEach(() => {
  document.body.innerHTML = "";
});

// Test all getter/setter methods in the TopLinkDisclosureMenu class.
describe("TopLinkDisclosureMenu getter/setters", () => {
  // Test TopLinkDisclosureMenu dom.
  describe("dom", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu dom getter.
    it("should implement the BaseMenu dom", () => {
      expect(TopLinkDisclosureMenu.prototype.dom).toBe(BaseMenu.prototype.dom);
    });
  });

  // Test TopLinkDisclosureMenu selectors.
  describe("selectors", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu selectors getter.
    it("should implement the BaseMenu selectors", () => {
      expect(TopLinkDisclosureMenu.prototype.selectors).toBe(
        BaseMenu.prototype.selectors
      );
    });
  });

  // Test TopLinkDisclosureMenu elements.
  describe("elements", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu elements getter.
    it("should implement the BaseMenu elements", () => {
      expect(TopLinkDisclosureMenu.prototype.elements).toBe(
        BaseMenu.prototype.elements
      );
    });
  });

  // Test TopLinkDisclosureMenu isTopLevel.
  describe("isTopLevel", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu isTopLevel getter.
    it("should implement the BaseMenu isTopLevel", () => {
      expect(TopLinkDisclosureMenu.prototype.isTopLevel).toBe(
        BaseMenu.prototype.isTopLevel
      );
    });
  });

  // Test BaseMenu openClass.
  // todo: Test that the open class for submenus defaults to the root menu's open class.
  describe("openClass", () => {
    // Test that openClass gets the open class name.
    it("should get the open class name", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.openClass).toBe(menu._openClass);
    });

    // Test that openClass sets the open class name.
    it("should set the open class name", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's open class name.
      menu.openClass = "test-open";

      expect(spy).toHaveBeenCalledWith({ openClass: "test-open" });
      expect(menu._openClass).toBe("test-open");
    });
  });

  // Test TopLinkDisclosureMenu closeClass.
  // todo: Test that the close class for submenus defaults to the root menu's close class.
  describe("closeClass", () => {
    // Test that closeClass gets the close class name.
    it("should get the close class name", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.closeClass).toBe(menu._closeClass);
    });

    // Test that closeClass sets the close class name.
    it("should set the close class name", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's close class name.
      menu.closeClass = "test-close";

      expect(spy).toHaveBeenCalledWith({ closeClass: "test-close" });
      expect(menu._closeClass).toBe("test-close");
    });
  });

  // Test TopLinkDisclosureMenu transitionClass.
  // todo: Test that the transition class for submenus defaults to the root menu's transition class.
  describe("transitionClass", () => {
    // Test that transitionClass gets the transition class name.
    it("should get the transition class name", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.transitionClass).toBe(menu._transitionClass);
    });

    // Test that transitionClass sets the transition class name.
    it("should set the transition class name", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidClassList");

      // Set the menu's transition class name.
      menu.transitionClass = "test-transition";

      expect(spy).toHaveBeenCalledWith({ transitionClass: "test-transition" });
      expect(menu._transitionClass).toBe("test-transition");
    });
  });

  // Test TopLinkDisclosureMenu transitionDuration.
  describe("transitionDuration", () => {
    // Test that transitionDuration gets the hover delay value.
    it("should get the hover delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.transitionDuration).toBe(menu._transitionDuration);
    });

    // Test that transitionDuration sets the hover delay value.
    it("should set the hover delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's hover delay value.
      menu.transitionDuration = 200;

      expect(spy).toHaveBeenCalledWith("number", { value: 200 });
      expect(menu._transitionDuration).toBe(200);
    });
  });

  // Test TopLinkDisclosureMenu openDuration.
  describe("openDuration", () => {
    // Test that openDuration gets the enter delay value.
    it("should get the enter delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // In this case, because we have not set the enter delay,
      // it should be the same as the hover delay.
      expect(menu.openDuration).toBe(menu._hoverDelay);
    });

    // Test that openDuration sets the enter delay value.
    it("should set the enter delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's enter delay value.
      menu.openDuration = 100;

      expect(spy).toHaveBeenCalledWith("number", { value: 100 });
      expect(menu._openDuration).toBe(100);
    });
  });

  // Test TopLinkDisclosureMenu closeDuration.
  describe("closeDuration", () => {
    // Test that closeDuration gets the leave delay value.
    it("should get the leave delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // In this case, because we have not set the leave delay,
      // it should be the same as the hover delay.
      expect(menu.closeDuration).toBe(menu._hoverDelay);
    });

    // Test that closeDuration sets the leave delay value.
    it("should set the leave delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's leave delay value.
      menu.closeDuration = 100;

      expect(spy).toHaveBeenCalledWith("number", { value: 100 });
      expect(menu._closeDuration).toBe(100);
    });
  });

  // Test TopLinkDisclosureMenu currentChild.
  describe("currentChild", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu currentChild getter.
    it("should implement the BaseMenu currentChild", () => {
      expect(TopLinkDisclosureMenu.prototype.currentChild).toBe(
        BaseMenu.prototype.currentChild
      );
    });
  });

  // Test TopLinkDisclosureMenu focusState.
  describe("focusState", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu focusState getter.
    it("should implement the BaseMenu focusState", () => {
      expect(TopLinkDisclosureMenu.prototype.focusState).toBe(
        BaseMenu.prototype.focusState
      );
    });
  });

  // Test TopLinkDisclosureMenu currentEvent.
  describe("currentEvent", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu currentEvent getter.
    it("should implement the BaseMenu currentEvent", () => {
      expect(TopLinkDisclosureMenu.prototype.currentEvent).toBe(
        BaseMenu.prototype.currentEvent
      );
    });
  });

  // Test TopLinkDisclosureMenu currentMenuItem.
  describe("currentMenuItem", () => {
    // Test that currentMenuItem gets the current menu item.
    it("should get the current menu item", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.currentMenuItem).toBe(
        menu.elements.menuItems[menu.currentChild]
      );
    });
  });

  // Test TopLinkDisclosureMenu hoverType.
  describe("hoverType", () => {
    // Test that hoverType gets the hover type.
    it("should get the hover type", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.hoverType).toBe(menu._hoverType);
    });

    // Test that hoverType sets the hover type.
    it("should set the hover type", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidHoverType");

      // Set the menu's hover type.
      menu.hoverType = "on";

      expect(spy).toHaveBeenCalledWith({ value: "on" });
      expect(menu._hoverType).toBe("on");
    });
  });

  // Test TopLinkDisclosureMenu hoverDelay.
  describe("hoverDelay", () => {
    // Test that hoverDelay gets the hover delay value.
    it("should get the hover delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.hoverDelay).toBe(menu._hoverDelay);
    });

    // Test that hoverDelay sets the hover delay value.
    it("should set the hover delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's hover delay value.
      menu.hoverDelay = 200;

      expect(spy).toHaveBeenCalledWith("number", { value: 200 });
      expect(menu._hoverDelay).toBe(200);
    });
  });

  // Test TopLinkDisclosureMenu enterDelay.
  describe("enterDelay", () => {
    // Test that enterDelay gets the enter delay value.
    it("should get the enter delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // In this case, because we have not set the enter delay,
      // it should be the same as the hover delay.
      expect(menu.enterDelay).toBe(menu._hoverDelay);
    });

    // Test that enterDelay sets the enter delay value.
    it("should set the enter delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's enter delay value.
      menu.enterDelay = 100;

      expect(spy).toHaveBeenCalledWith("number", { value: 100 });
      expect(menu._enterDelay).toBe(100);
    });
  });

  // Test TopLinkDisclosureMenu leaveDelay.
  describe("leaveDelay", () => {
    // Test that leaveDelay gets the leave delay value.
    it("should get the leave delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // In this case, because we have not set the leave delay,
      // it should be the same as the hover delay.
      expect(menu.leaveDelay).toBe(menu._hoverDelay);
    });

    // Test that leaveDelay sets the leave delay value.
    it("should set the leave delay value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's leave delay value.
      menu.leaveDelay = 100;

      expect(spy).toHaveBeenCalledWith("number", { value: 100 });
      expect(menu._leaveDelay).toBe(100);
    });
  });

  // Test TopLinkDisclosureMenu prefix.
  describe("prefix", () => {
    // Test that prefix gets the prefix value.
    it("should get the prefix value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.prefix).toBe(menu._prefix);
    });

    // Test that prefix sets the prefix value.
    it("should set the prefix value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
        prefix: "test-",
      });

      expect(menu.prefix).toBe("test-");
    });
  });

  // Test TopLinkDisclosureMenu shouldFocus.
  describe("shouldFocus", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu shouldFocus getter.
    it("should implement the BaseMenu shouldFocus", () => {
      expect(TopLinkDisclosureMenu.prototype.shouldFocus).toBe(
        BaseMenu.prototype.shouldFocus
      );
    });
  });

  // Test TopLinkDisclosureMenu errors.
  describe("errors", () => {
    // Test that TopLinkDisclosureMenu implements the BaseMenu errors getter.
    it("should implement the BaseMenu errors", () => {
      expect(TopLinkDisclosureMenu.prototype.errors).toBe(
        BaseMenu.prototype.errors
      );
    });
  });

  // Test TopLinkDisclosureMenu optionalKeySupport.
  // todo: Test that the optional key support for submenus defaults to the root menu's optional key support.
  describe("optionalKeySupport", () => {
    // Test that optionalKeySupport gets the optional key support value.
    it("should get the optional key support value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      expect(menu.optionalKeySupport).toEqual(menu._optionalSupport);
    });

    // Test that optionalKeySupport sets the optional key support value.
    it("should set the optional key support value", () => {
      // Create a new TopLinkDisclosureMenu instance for testing.
      const menu = new TopLinkDisclosureMenu({
        menuElement: document.querySelector("ul"),
      });

      // Set up to check for validation.
      const spy = vi.spyOn(validation, "isValidType");

      // Set the menu's optional key support value.
      menu.optionalKeySupport = true;

      expect(spy).toHaveBeenCalledWith("boolean", { optionalKeySupport: true });
      expect(menu._optionalSupport).toBeTruthy();
    });
  });
});
