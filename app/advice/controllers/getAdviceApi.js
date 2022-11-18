import axios from 'axios';
import { insertAdvice } from '../index';
import nconf from 'nconf';

async function queryAdvice(query) {
  const advice = await axios.get(
    `${nconf.get('API_URL_BASE')}${nconf.get('API_URL')}/${query}`,
  );
  return advice.data;
}

function getAdviceObj(advice) {
  return {
    api_id: advice.id,
    advice: advice.advice,
  };
}

async function getAdvice(req, res) {
  const { query } = req.body;
  try {
    if (query) {
      const words = query.split(' ');
      const advices = [];
      const advicesRequest = [];
      words.forEach((w) => {
        advicesRequest.push(queryAdvice(w));
      });
      const advicesGroup = await Promise.allSettled(advicesRequest);
      for (let adviceAPI of advicesGroup) {
        if (adviceAPI.status === 'fulfilled' && adviceAPI.value.slips) {
          const advice = getAdviceObj(adviceAPI.value.slips[0]);
          await insertAdvice(advice);
          advices.push(advice.advice);
        }
      }
      if (advices.length > 0) {
        res.status(201).send(advices);
      } else {
        res.status(404).send('No found any advice');
      }
    } else {
      res.status(400).send({ message: 'null query' });
    }
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).send('Oops, There is an error');
  }
}

module.exports = {
  getAdvice,
  queryAdvice,
  getAdviceObj,
};
