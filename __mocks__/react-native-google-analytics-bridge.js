module.exports = {
  GoogleAnalyticsTracker: jest.fn(() => {
    const trackerMock = {
      trackEvent: jest.fn(),
      trackScreenView: jest.fn()
    };
    return trackerMock;
  }),
  GoogleAnalyticsSettings: {
    setDispatchInterval: jest.fn()
  }
};
