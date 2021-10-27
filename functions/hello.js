exports.handler = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      name: 'yoo',
      age: 50,
      email: 'iamidlek@naver.com'
    })
  }
}
