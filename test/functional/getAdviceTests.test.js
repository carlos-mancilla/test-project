import request from 'supertest';

import app from 'app';
import 'test/helpers/dbTransaction';
import nock from 'nock';
import {
  queryNullResponseJSON,
  queryResponseJSON,
} from '../../app/advice/controllers/__mocks__/getAdviceApi';

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
      const SERVER_HOST = 'https://api.adviceslip.com';
      const url = `/advice/search/${query}`;
      nock(SERVER_HOST).get(`${url}`).reply(200, queryResponseJSON);
      it('returns an advice messaje', async () => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: 'hair' });

        expect(statusCode).toBe(201);
      });
    });
    describe('if query "snake" word is passed not get an advice', () => {
      const query = 'snake';
      const SERVER_HOST = 'https://api.adviceslip.com';
      const url = `/advice/search/${query}`;
      nock(SERVER_HOST).get(`${url}`).reply(200, queryNullResponseJSON);
      it('returns an not found messaje', async () => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: 'snake' });

        expect(statusCode).toBe(404);
      });
    });
    describe('if query "long hair" words are passed get an bad request error', () => {
      it('returns an bad requets messaje', async () => {
        const { statusCode } = await request(app)
          .post('/advice')
          .send({ query: 'long hair' });

        expect(statusCode).toBe(400);
      });
    });
  });
});
