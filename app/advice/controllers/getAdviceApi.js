import axios from 'axios';
import { insertAdvice } from '../index';

async function queryAdvice(query) {
  const advice = await axios.get(
    `https://api.adviceslip.com/advice/search/${query}`,
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
  let adviceAPI;
  try {
    if (query) {
      if (!(query.split(' ').length > 1)) {
        adviceAPI = await queryAdvice(query);
        if (adviceAPI.slips) {
          const advice = getAdviceObj(adviceAPI.slips[0]);
          await insertAdvice(advice);
          res.status(201).send(advice.advice);
        } else {
          res.status(404).send(adviceAPI);
        }
      } else {
        res.status(400).send({ message: 'only one word is allowed' });
      }
    } else {
      res.status(400).send({ message: 'null query' });
    }
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).send('Opps, There is an error');
  }
}

module.exports = {
  getAdvice,
  queryAdvice,
  getAdviceObj,
};
