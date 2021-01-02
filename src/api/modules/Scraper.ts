import {Page, Browser} from 'puppeteer';
import ScraperInterface from '../interfaces/Scraper';

export default class Scraper implements ScraperInterface{
  public page: Page
  public browser: Browser

  constructor(browser: Browser) {
    this.browser = browser
  }

  protected async loadPage(url: string): Promise<void>{
    try {
      const page = await this.browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      await page.goto(url, { waitUntil: "networkidle0", timeout: 0 });
      this.page = page
    } catch (error) {
      console.log(`Unable to connect to ${url} => `, error)
    }
  } 

  protected async navigate(url: string): Promise<void> {
    try{
      await this.page.goto(url, {
        waitUntil: 'networkidle0'
      })
    } catch (error) {
      console.log(`Unable to navigate to ${url} => `, error)
    }
  }
}