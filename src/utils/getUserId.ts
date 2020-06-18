import { ContextParameters } from 'graphql-yoga/dist/types';
import { verify } from 'jsonwebtoken';

interface UserId {
  userid: string;
}

const getUserId = (
  request: ContextParameters,
  requireAuth = true
): string | null => {
  const header = request.request.headers.authorization;

  if (header) {
    const token = header.replace('Bearer ', '');
    const decoded = verify(token, 'thisisasecret') as UserId;
    return decoded.userid;
  }

  if (requireAuth) {
    throw new Error('Authentication required');
  }

  return null;
};

export default getUserId;
