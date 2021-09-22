export type User = {
  name: string;
  _id: string;
};

export type PostType = {
  _id: string,
  title: string,
  content: string,
  dateCreated: Date,
  author: string
};
