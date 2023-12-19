import { Locator, Page } from "@playwright/test";

export default class LoginPage {
  // Define your base variables for playwright
  readonly page: Page;
  readonly url: string;

  //#region Locators
  // Login Form Locators
  readonly usernameLabel: Locator;
  readonly usernameField: Locator;
  readonly passwordLabel: Locator;
  readonly passwordField: Locator;
  readonly submitButton: Locator;
  readonly loginError: Locator;

  // Logged In Locators
  readonly loginSuccessHeader: Locator;
  readonly loginSuccessMessage: Locator;
  readonly logoutButton: Locator;
  //#endregion

  // LoginPage's constructor
  // This will define how a new LoginPage object will be
  // created. Once created, you will be able to access all
  // of this class's functions and variables in another place.
  constructor(page: Page) {
    // Set the playwright page object
    this.page = page;

    // Set the route for the page
    this.url = "/practice-test-login";

    // Set the locators based on how they will be found in the page
    // Login Form Locators
    this.usernameLabel = page.getByText("Username", { exact: true });
    this.usernameField = page.getByLabel("Username");
    this.passwordLabel = page.getByText("Password", { exact: true });
    this.passwordField = page.getByLabel("Password");
    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.loginError = page.locator("#error");

    // Logged In Locators
    this.loginSuccessHeader = page.getByText("Logged In Successfully");
    this.loginSuccessMessage = page.getByText(
      "Congratulations student. You successfully logged in!"
    );
    this.logoutButton = page.getByRole("link", { name: "Log out" });
  }

  // To avoid going to along URL each time, configure the
  // playwright.config.ts to have a base URL and set the route
  // for the page in the constructor
  async goto() {
    // This will effectively go to `${config.baseUrl}${this.url}`
    // Notice the lack of a '/' between those variables in the above comment...
    await this.page.goto(this.url);
  }

  // To avoid repeating code in tests, create functions...
  // For ease of use, the tester can pass "login()" to log in
  // with valid credentials.
  async login(username: string = "student", password: string = "Password123") {
    // TODO: Don't store credentials in code that will be
    // committed into the repo. This should be extracted into
    // a different file and grabbed here instead.
    
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.submitButton.click();
  }
}
