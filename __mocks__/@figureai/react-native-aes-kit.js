export default {
  AesCrypto: jest.fn(() => ({
    decrypt: jest.fn()
  }))
};
