class CreateSubscription {
  constructor() {
    this.dropDownForUsers = '//select[@id="user"]';
    this.description = '#description';
    this.years = '#years';
    this.createButton = "//button[@type='submit']";
    this.cellEmail = ".//child::div[@tabulator-field='user']";
    this.cellDescription = ".//child::div[@tabulator-field='description']";
    this.cellYears = ".//child::div[@tabulator-field='years']";
    this.checkboxSuspend = '#suspend';
    this.cellSuspend = ".//child::div[@tabulator-field='suspend']";
  }

  async setPathToElementThroughSelectors(parent, child) {
    await parent.$(child).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${child} was not displayed`,
    });
    const element = parent.$(child);
    return element;
  }

  async setValue(selector, value) {
    await $(selector).waitForClickable({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not clickable`,
    });
    await $(selector).setValue(value);
  }

  async clickElement(selector) {
    await $(selector).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: ${selector} was not displayed`,
    });
    await $(selector).click();
  }

  async createSubscription(data) {
    await this.clickElement(this.dropDownForUsers);
    const dropDown = await $(this.dropDownForUsers);
    await this.clickElement(
      await this.setPathToElementThroughSelectors(
        dropDown,
        `./child::option[contains(text() , "${data.email}")]`
      )
    );
    await this.setValue(this.description, data.description);
    await this.setValue(this.years, data.years);
    if (data.suspend === 'on') {
      await this.clickElement(this.checkboxSuspend);
    }
    await this.clickElement(this.createButton);
  }

  async checkUsersSubscription(data) {
    await $(`//div[contains(text() , "${data.email}")]/..`).waitForDisplayed({
      timeout: 5000,
      timeoutMsg: `After 5 sec the element: //div[contains(text() , "${data.email}")]/.. was not displayed`,
    });
    const rowOfUser = await $(`//div[contains(text() , "${data.email}")]/..`);

    const emailUser = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellEmail
    );
    await expect(emailUser).toHaveText(data.email);

    const description = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellDescription
    );
    await expect(description).toHaveText(data.description);

    const yearsUser = await this.setPathToElementThroughSelectors(
      rowOfUser,
      this.cellYears
    );
    await expect(yearsUser).toHaveText(data.years);

    if (data.suspend === 'on') {
      const suspendUser = await this.setPathToElementThroughSelectors(
        rowOfUser,
        this.cellSuspend
      );
      await expect(suspendUser).toHaveText(data.suspend);
    }
  }
}

module.exports = { CreateSubscription: new CreateSubscription() };
