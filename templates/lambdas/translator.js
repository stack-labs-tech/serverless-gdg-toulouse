const handler = async (event) => {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  const { Translate } = require('aws-sdk');

  const translate = new Translate({ region: 'eu-west-1' });

  const { queryStringParameters: qp } = event;
  const parameters = {
    Text: qp && qp.text ? qp.text : '',
    SourceLanguageCode: 'fr',
    TargetLanguageCode: 'en',
  };

  const data = await translate.translateText(parameters).promise();
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(data),
    isBase64Encoded: false,
  };
  return response;
};

module.exports = {
  handler,
};
