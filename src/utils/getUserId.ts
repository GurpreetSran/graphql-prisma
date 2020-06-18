import { ContextParameters } from 'graphql-yoga/dist/types';
import { verify } from 'jsonwebtoken';

interface UserId {
  userid: string;
}

const getUserId = (request: ContextParameters): string => {
  const header = request.request.headers.authorization;

  if (!header) {
    throw new Error('Authentication required');
  }

  const token = header.replace('Bearer ', '');

  const decoded = verify(token, 'thisisasecret') as UserId;

  return decoded.userid;
};

export default getUserId;
