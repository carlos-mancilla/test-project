const queryResponseJSON = {
  total_results: '4',
  query: 'hair',
  slips: [
    {
      id: 31,
      advice: 'Never let your Mother cut your hair.',
      date: '2015-11-24',
    },
    {
      id: 97,
      advice:
        'If you are ever in doubt about whether or not to wash your hair: Wash it.',
      date: '2017-02-08',
    },
    {
      id: 139,
      advice:
        "If you're going bald, don't comb your hair over your bald patch.",
      date: '2017-03-27',
    },
    {
      id: 140,
      advice:
        'If your hair is thinning, try dying your hair a similar tone to your scalp.',
      date: '2015-12-12',
    },
  ],
};

const expectedObj = {
  api_id: 31,
  advice: 'Never let your Mother cut your hair.',
};

const advice = {
  id: 31,
  advice: 'Never let your Mother cut your hair.',
  date: '2015-11-24',
};

const queryNullResponseJSON = {
  message: {
    type: 'notice',
    text: 'No advice slips found matching that search term.',
  },
};

module.exports = {
  queryResponseJSON,
  advice,
  expectedObj,
  queryNullResponseJSON,
};
