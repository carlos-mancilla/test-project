import request from 'supertest';

import app from 'app';
import 'test/helpers/dbTransaction';
import nock from 'nock';
import {
  queryNullResponseJSON,
  queryResponseJSON,
} from '../../app/advice/controllers/__mocks__/getAdviceApi';
import nconf from 'nconf';

const SERVER_HOST = nconf.get('API_URL_BASE');

describe('test local API request', () => {
  describe('POST /advice', () => {
    describe('if no query is passed', () => {
      it('returns an bad request message', async () => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: null });

        expect(statusCode).toBe(400);
      });
    });
    describe('if query "hair" word is passed get an advice', () => {
      const query = 'hair';
      const url = `${nconf.get('API_URL')}/${query}`;
      nock(SERVER_HOST).get(`${url}`).reply(200, queryResponseJSON[query]);
      it('returns an advice messaje', async () => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: 'hair' });

        expect(statusCode).toBe(201);
      });
    });
    describe('if query "snake" word is passed not get an advice', () => {
      const query = 'snake';
      const url = `${nconf.get('API_URL')}/${query}`;
      nock(SERVER_HOST).get(`${url}`).reply(200, queryNullResponseJSON);
      it('returns an not found messaje', async () => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: 'snake' });

        expect(statusCode).toBe(404);
      });
    });
    describe('if query "hair spider dog" words are passed get an advice by each one', () => {
      it('returns an array with messages and 201 status code', async () => {
        const words = 'hair spider dog'.split(' ');
        words.forEach((w) => {
          const url = `${nconf.get('API_URL')}/${w}`;
          nock(SERVER_HOST).get(`${url}`).reply(200, queryResponseJSON[w]);
        });
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: 'hair spider dog' });

        expect(statusCode).toBe(201);
      });
    });
  });
});
