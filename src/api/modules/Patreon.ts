import {Browser, Page} from 'puppeteer'
import PatreonInterface, { ScrapPatreonOptions, ScrapPatreonResponse } from "../interfaces/Patreon"
import Scraper from './Scraper'


export default class Patreon extends Scraper implements PatreonInterface {
  public patreonLoginUrl: string
  public patreonProfileUrl: string

  constructor(browser: Browser) {
    super(browser)

    if(!process.env.PATREON_LOGIN_URL) {
      throw new Error ("Missing environment variable PATREON_LOGIN_URL");
    }
    this.patreonLoginUrl = process.env.PATREON_LOGIN_URL

    if(!process.env.PATREON_PROFILE_URL) {
      throw new Error ("Missing environment variable PATREON_PROFILE_URL");
    }
    this.patreonProfileUrl = process.env.PATREON_PROFILE_URL

  }

  public async scrap(options: ScrapPatreonOptions): Promise<ScrapPatreonResponse> {
    try {
      await this.loadPage(this.patreonLoginUrl)
      await this._login(this.page, options.email, options.password)

      // TODO: Add additional step to handle "Verify this device" email notifications
      await this.navigate(this.patreonProfileUrl)

      // Scrap important data
      const data = await this.page.evaluate(() => {
        const node = document.querySelectorAll("h2.sc-AxgMl.kHusHC")
        return { patrons: node[0].textContent ?
                 parseInt(node[0].textContent) : 0,
                 per_month: node[1].textContent ? parseInt(node[1].textContent.replace(/\$/g, '')): 0
                }
      })
      return data
    }catch(error) {
      throw new Error ("Could not scrap page")
    }
  }

  private async _login(page: Page, email: string, password: string): Promise<void>{
    try {
      // Type In User Login Cred.
      await page.type('input[name="email"]', email);
      await page.type('input[name="password"]', password);
  
      // Submit Form and Wait for Navigation.
      await Promise.all([
        page.click('button[type="submit"]'),
        page.waitForNavigation({ waitUntil: "load" }),
      ]);
    } catch (error) {
      console.log("Could not login to page instance => ", error);
    }
  }
}