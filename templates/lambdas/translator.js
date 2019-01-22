// eslint-disable-next-line import/no-extraneous-dependencies
const sdk = require('aws-sdk');

const translate = new sdk.Translate({ region: 'eu-west-1' });

exports.handler = async (event) => {
  const { queryStringParameters: qp } = event;
  const parameters = {
    Text: (qp && qp.text) ? qp.text : '',
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
