import { getAdviceObj, queryAdvice } from '../getAdviceApi';
import {
  queryResponseJSON,
  advice,
  expectedObj,
} from '../__mocks__/getAdviceApi';
import nock from 'nock';
import nconf from 'nconf';

describe('Get an advice object to save in BBDD', () => {
  it('getAdviceObj returns an expected object', () => {
    const response = getAdviceObj(advice);
    expect(response).toEqual(expectedObj);
  });
});

describe('Get an advice object from external api to save in BBDD', () => {
  const SERVER_HOST = nconf.get('API_URL_base');

  it('queryAdvice get an expected object from external api using "hair" word', async () => {
    const query = 'hair';
    const url = `${nconf.get('API_URL')}/${query}`;
    nock(SERVER_HOST).get(`${url}`).reply(200, queryResponseJSON);
    const response = await queryAdvice(query);
    console.log('response :>> ', response);
    expect(response).toEqual(queryResponseJSON);
  });
});
