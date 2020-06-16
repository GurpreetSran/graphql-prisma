const users = [
  { id: '1', name: 'Ojas' },
  { id: '2', name: 'Ellie' },
  { id: '3', name: 'Rexy' },
];

const comments = [
  {
    id: '100',
    text: 'Comment 1 Ojas',
    author: '1',
    post: '10',
  },
  {
    id: '200',
    text: 'Comment 2 Ojas',
    author: '1',
    post: '20',
  },
  {
    id: '300',
    text: 'Comment 3 Rexy',
    author: '3',
    post: '30',
  },
  {
    id: '400',
    text: 'Comment 4 Ellie',
    author: '2',
    post: '40',
  },
];

const posts = [
  {
    id: '10',
    title: 'The T Rex',
    author: '1',
  },
  {
    id: '20',
    title: 'The Shotgun',
    author: '1',
  },
  {
    id: '30',
    title: 'The Crying Baby',
    author: '2',
  },
  {
    id: '40',
    title: 'The Bittie Baby',
    author: '3',
  },
];

const db = {
  comments,
  posts,
  users,
};

export default db;
