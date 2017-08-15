import { browser, by, element } from 'protractor';

export class CvdbFrontendWebPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root li.active a')).getText();
  }
}
