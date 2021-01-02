import  {launch, Browser} from 'puppeteer';

export default async function launchBrowser(): Promise<Browser>{
  try{
    return launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      "ignoreHTTPSErrors": true,
    });
  }catch(error){
    throw new Error('Unable to launch new browser instance')
  }
}