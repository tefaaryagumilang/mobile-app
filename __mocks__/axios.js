import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// added axios-mock-adapter for mocking the request for tests
export const mock = new MockAdapter(axios);
export default axios;
