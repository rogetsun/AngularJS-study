describe("", function() {
  var rootEl;
  beforeEach(function() {
    rootEl = browser.rootEl;
    browser.get("examples/example-example55/01.html");
  });
  
  it('should toggle open', function() {
    expect(element(by.id('details')).getAttribute('open')).toBeFalsy();
    element(by.model('open')).click();
    expect(element(by.id('details')).getAttribute('open')).toBeTruthy();
  });
});