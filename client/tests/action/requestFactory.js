import fixtures from './fixtures.json';

const setPayload = {
  set: () => ({
    end: (cb) => {
      const res = {
        body: {
          message: 'Success',
          document: fixtures.document,
        }
      };
      cb(null, res);
    },
  }),
};


const requestFactory = {
  default: jest.fn(() => 'default'),
  get: () => setPayload,
  post: () => ({
    send: () => setPayload,
  }),
  put: () => ({
    send: () => setPayload,
  }),
};


export default requestFactory;
