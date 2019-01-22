exports.handler = (event, context, callback) => {
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      posts: [
        {
          id: 0,
          team: 'GDG',
          content: 'This is a post',
        },
        {
          id: 1,
          team: 'Coffee talk',
          content: 'Here we are',
        },
      ],
    }),
    isBase64Encoded: false,
  });
};
