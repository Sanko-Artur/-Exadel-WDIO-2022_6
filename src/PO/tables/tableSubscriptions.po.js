class TableSubscriptions {
  constructor() {
    this.table = $('#table');
    this.headersSelector = '.tabulator-col-content';
    this.cellSelector = '.tabulator-cell';
  }

  async headers() {
    return await this.table.$$(this.headersSelector).map(async (header) => {
      return { element: await header, name: await header.getText() };
    });
  }

  async rows(data) {
    return await $$(`//div[contains(text() , "${data.email}")]/..`);
  }

  async clickListOfSubscriptions() {
    await $('//a[text()[contains(.,"List of Subscriptions")]]').click();
  }

  async data(data) {
    await this.clickListOfSubscriptions();
    const rows = await this.rows(data);
    const result = rows.map(async (row) => {
      let result = {};
      const cells = await row.$$(this.cellSelector);
      let index = 0;
      for (const cell of cells) {
        result[(await this.headers())[index].name] = await cell.getText();
        ++index;
      }
      return result;
    });
    return await Promise.all(result);
  }
}

module.exports = { TableSubscriptions: new TableSubscriptions() };
