import { ClassroomPage } from './app.po';

describe('classroom App', () => {
  let page: ClassroomPage;

  beforeEach(() => {
    page = new ClassroomPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
