export default {
  requestPermission: jest.fn(),
  request: jest.fn(() => Promise.resolve({}))
};
