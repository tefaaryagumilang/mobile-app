module.exports = {
  open: jest.fn(),
  RNFetchBlob: jest.fn(() => ({
    fs: jest.fn(() => ({
      dirs: jest.fn(),
    }))
  }))
};
