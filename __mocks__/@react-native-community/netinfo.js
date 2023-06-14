export default {
  Netinfo: jest.fn(() => ({
    fetch: jest.fn(),
    isConnected: jest.fn(() => ({
      addEventListener: jest.fn(),
      fetch: jest.fn(),
    })),
  })),
  fetch: jest.fn(() => Promise.resolve(true))
};
