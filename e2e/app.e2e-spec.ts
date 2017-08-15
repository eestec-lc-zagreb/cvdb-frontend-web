import { CvdbFrontendWebPage } from './app.po';

describe('cvdb-frontend-web App', () => {
  let page: CvdbFrontendWebPage;

  beforeEach(() => {
    page = new CvdbFrontendWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('O nama');
  });
});
