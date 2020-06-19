import jwt from 'jsonwebtoken';

const getToken = (id: string) => {
  return jwt.sign({ userid: id }, 'thisisasecret', {
    expiresIn: '7 days',
  });
};

export default getToken;
