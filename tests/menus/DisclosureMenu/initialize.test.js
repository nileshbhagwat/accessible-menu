/**
 * Initialization tests for the DisclosureMenu class.
 *
 * These tests are mostly covered by other tests, but are here just to ensure
 * that the Disclosure class can be initialized.
 */

import {
  describe,
  it,
  expect,
  vi,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "vitest";
import { singleLevel, twoLevelDisclosure } from "../../../demo/menus.js";
import DisclosureMenu from "../../../src/disclosureMenu.js";

beforeAll(() => {
  // Mock the console.error method.
  console.error = vi.fn((error) => {
    throw new Error(error);
  });
});

afterAll(() => {
  // Restore the mocked method.
  vi.restoreAllMocks();
});

beforeEach(() => {
  // Create the test menu.
  document.body.innerHTML = twoLevelDisclosure;
});

afterEach(() => {
  // Remove the test menu.
  document.body.innerHTML = "";
});

// Test the DisclosureMenu initialization.
describe("DisclosureMenu", () => {
  // Test that the DisclosureMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if no menuElement is passed.
  it("should throw an error if no menuElement is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({});
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "undefined" given.'
    );
  });

  // Test that the DisclosureMenu will throw an error if the menuElement is invalid.
  it("should throw an error if the menuElement is invalid", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: 1,
      });
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "number" given.'
    );
  });
});

// Test the DisclosureMenu initialization for a controlled menu.
describe("DisclosureMenu (controlled)", () => {
  // Test that the DisclosureMenu will initialize if the menuElement passed.
  it("should initialize", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if no menuElement is passed.
  it("should throw an error if no menuElement is passed", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "undefined" given.'
    );
  });

  // Test that the DisclosureMenu will throw an error if the menuElement is invalid.
  it("should throw an error if the menuElement is invalid", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: 1,
        containerElement: document.querySelector("nav"),
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'menuElement must be an instance of HTMLElement. "number" given.'
    );
  });

  // Test that the DisclosureMenu will throw an error if no containerElement is passed when a controllerElement is.
  it("should throw an error if no containerElement is passed when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'containerElement must be an instance of HTMLElement. "object" given.'
    );
  });

  // Test that the DisclosureMenu will throw an error if the containerElement is invalid when a controllerElement is.
  it("should throw an error if the containerElement is invalid when a controllerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: 1,
        controllerElement: document.querySelector("button"),
      });
    }).toThrow(
      'containerElement must be an instance of HTMLElement. "number" given.'
    );
  });

  // Test that the DisclosureMenu will throw an error if no controllerElement is passed when a containerElement is.
  it("should throw an error if no controllerElement is passed when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
      });
    }).toThrow(
      'controllerElement must be an instance of HTMLElement. "object" given.'
    );
  });

  // Test that the DisclosureMenu will throw an error if the controllerElement is invalid when a containerElement is.
  it("should throw an error if the controllerElement is invalid when a containerElement is", () => {
    // Create the test menu.
    document.body.innerHTML = singleLevel;

    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        containerElement: document.querySelector("nav"),
        controllerElement: 1,
      });
    }).toThrow(
      'controllerElement must be an instance of HTMLElement. "number" given.'
    );
  });
});

// Test the DisclosureMenu initialization with custom arguments.
describe("DisclosureMenu (custom arguments)", () => {
  // Test that the DisclosureMenu will initialize if a valid menuItemSelector is passed.
  it("should initialize with a valid menuItemSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuItemSelector: ".menu-item",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid menuItemSelector is passed.
  it("should throw an error if an invalid menuItemSelector is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuItemSelector: 1,
      });
    }).toThrow('menuItemSelector must be a valid query selector. "1" given.');
  });

  // Test that the DisclosureMenu will initialize if a valid menuLinkSelector is passed.
  it("should initialize with a valid menuLinkSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuLinkSelector: ".menu-link",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid menuLinkSelector is passed.
  it("should throw an error if an invalid menuLinkSelector is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        menuLinkSelector: 1,
      });
    }).toThrow('menuLinkSelector must be a valid query selector. "1" given.');
  });

  // Test that the DisclosureMenu will initialize if a valid submenuItemSelector is passed.
  it("should initialize with a valid submenuItemSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid submenuItemSelector is passed.
  it("should throw an error if an invalid submenuItemSelector is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuItemSelector: 1,
      });
    }).toThrow(
      'submenuItemSelector must be a valid query selector. "1" given.'
    );
  });

  // Test that the DisclosureMenu will initialize if a valid submenuToggleSelector is passed when the submenuItemSelector is also passed.
  it("should initialize with a valid submenuToggleSelector and submenuItemSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuToggleSelector: ".dropdown-toggle",
        submenuItemSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid submenuToggleSelector is passed when the submenuItemSelector is also passed.
  it("should throw an error if an invalid submenuToggleSelector and submenuItemSelector", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuToggleSelector: 1,
        submenuItemSelector: ".menu-item.dropdown",
      });
    }).toThrow(
      'submenuToggleSelector must be a valid query selector. "1" given.'
    );
  });

  // Test that the DisclosureMenu will initialize if a valid submenuSelector is passed when the submenuItemSelector is also passed.
  it("should initialize with a valid submenuSelector and submenuItemSelector", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuSelector: ".dropdown-menu",
        submenuItemSelector: ".menu-item.dropdown",
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid submenuSelector is passed when the submenuItemSelector is also passed.
  it("should throw an error if an invalid submenuSelector and submenuItemSelector", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create the DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        submenuSelector: 1,
        submenuItemSelector: ".menu-item.dropdown",
      });
    }).toThrow('submenuSelector must be a valid query selector. "1" given.');
  });

  // Class list tests.
  const classLists = ["openClass", "closeClass", "transitionClass"];

  // Test that the DisclosureMenu will initialize if valid class lists are passed.
  it.each(classLists)(
    "should initialize with a valid %s class list",
    (classList) => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new DisclosureMenu instance for testing.
        new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          [classList]: "test",
        });
      }).not.toThrow();
    }
  );

  // Test that the DisclosureMenu will throw an error if an invalid class list is passed.
  it.each(classLists)(
    "should throw an error if an invalid %s class list is passed",
    (classList) => {
      // Test that the menu throws an error.
      expect(() => {
        // Create a new DisclosureMenu instance for testing.
        new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          [classList]: 1,
        });
      }).toThrow(
        `${classList} must be a string or an array of strings. "number" given.`
      );
    }
  );

  // Test that the DisclosureMenu will initialize if isTopLevel is true.
  it("should initialize if isTopLevel is true", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: true,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if isTopLevel not a boolean.
  it("should throw an error if isTopLevel is not a boolean", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: 1,
      });
    }).toThrow('isTopLevel must be a boolean. "number" given.');
  });

  // Test that the DisclosureMenu will throw an error is isTopLevel is false and no parentMenu is passed.
  it("should throw an error if isTopLevel is false and no parentMenu is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
      });
    }).toThrow("Cannot find root menu.");
  });

  // Test that the DisclosureMenu will initialize if isTopLevel is false and a parentMenu is passed.
  it("should initialize if isTopLevel is false and a parentMenu is passed", () => {
    // Create a new DisclosureMenu instance for testing.
    const parentMenu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if isTopLevel is false and an invalid parentMenu is passed.
  it("should throw an error if isTopLevel is false and an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        isTopLevel: false,
        parentMenu: 1,
      });
    }).toThrow('parentMenu must be an instance of BaseMenu. "number" given.');
  });

  // Test that the DisclosureMenu will initialize if a valid parentMenu is passed.
  it("should initialize if a valid parentMenu is passed", () => {
    // Create a new DisclosureMenu instance for testing.
    const parentMenu = new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      isTopLevel: true,
    });

    // Test that the menu initializes.
    expect(() => {
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        parentMenu,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid parentMenu is passed.
  it("should throw an error if an invalid parentMenu is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        parentMenu: 1,
      });
    }).toThrow('parentMenu must be an instance of BaseMenu. "number" given.');
  });

  // Test that the DisclosureMenu will initialize if a valid hoverType is passed.
  const hoverTypes = ["on", "off", "dynamic"];
  it.each(hoverTypes)(
    'should initialize if "%s" is passed as the hoverType',
    () => {
      // Test that the menu initializes.
      expect(() => {
        // Create a new DisclosureMenu instance for testing.
        new DisclosureMenu({
          menuElement: document.querySelector("ul"),
          hoverType: "on",
        });
      }).not.toThrow();
    }
  );

  // Test that the DisclosureMenu will throw an error if an invalid hoverType is passed.
  it("should throw an error if an invalid hoverType is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        hoverType: 1,
      });
    }).toThrow(
      'hoverType must be one of the following values: off, on, dynamic. "1" given.'
    );
  });

  // Test that the DisclosureMenu will initialize if a valid hoverDelay is passed.
  it("should initialize if a valid hoverDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        hoverDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid hoverDelay is passed.
  it("should throw an error if an invalid hoverDelay is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        hoverDelay: "1",
      });
    }).toThrow('hoverDelay must be a number. "string" given.');
  });

  // Test that the DisclosureMenu will initialize if a valid enterDelay is passed.
  it("should initialize if a valid enterDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        enterDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid enterDelay is passed.
  it("should throw an error if an invalid enterDelay is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        enterDelay: "1",
      });
    }).toThrow('enterDelay must be a number. "string" given.');
  });

  // Test that the DisclosureMenu will initialize if a valid leaveDelay is passed.
  it("should initialize if a valid leaveDelay is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        leaveDelay: 1,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid leaveDelay is passed.
  it("should throw an error if an invalid leaveDelay is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        leaveDelay: "1",
      });
    }).toThrow('leaveDelay must be a number. "string" given.');
  });

  // Test that the DisclosureMenu will initialize if a valid optionalKeySupport is passed.
  it("should initialize if a valid optionalKeySupport is passed", () => {
    // Test that the menu initializes.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        optionalKeySupport: true,
      });
    }).not.toThrow();
  });

  // Test that the DisclosureMenu will throw an error if an invalid optionalKeySupport is passed.
  it("should throw an error if an invalid optionalKeySupport is passed", () => {
    // Test that the menu throws an error.
    expect(() => {
      // Create a new DisclosureMenu instance for testing.
      new DisclosureMenu({
        menuElement: document.querySelector("ul"),
        optionalKeySupport: 1,
      });
    }).toThrow('optionalKeySupport must be a boolean. "number" given.');
  });
});

// DisclosureMenu controlled initialization tests.
describe("DisclosureMenu (controlled initialization)", () => {
  // Test that the menu will initialize if initialize is set to true.
  it("should initialize if initialize is set to true", () => {
    // Spy on the initialize method.
    vi.spyOn(DisclosureMenu.prototype, "initialize");

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: true,
    });

    // Test that the initialize method was called.
    expect(DisclosureMenu.prototype.initialize).toHaveBeenCalled();
  });

  // Test that the menu will not initialize if initialize is set to false.
  it("should not initialize if initialize is set to false", () => {
    // Spy on the initialize method.
    vi.spyOn(DisclosureMenu.prototype, "initialize");

    // Create a new DisclosureMenu instance for testing.
    new DisclosureMenu({
      menuElement: document.querySelector("ul"),
      initialize: false,
    });

    // Test that the initialize method was not called.
    expect(DisclosureMenu.prototype.initialize).not.toHaveBeenCalled();
  });
});
