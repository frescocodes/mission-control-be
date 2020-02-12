const axios = require('axios');

// Queries must be defined to return fields of the same type
// See the Query field in the type definitions for examples

const info = () => `Hello World`;

const programs = (parent, args, context) => {
  const res = context.prisma.programs();
  return res;
};

const products = (parent, args, context) => {
  const res = context.prisma.products();
  return res;
};

const projects = (parent, args, context) => {
  const res = context.prisma.projects();
  console.log(res);
  return res;
};

const project = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.project({ id });
  return res;
};

const starwar = async (parent, args, context) => {
  try {
    const res = await axios.get(`https://swapi.co/api/people/${args.id}`);
    console.log(res.data);
    return res.data;
  } catch (e) {
    throw new Error('Internal Servor Error x_x');
  }
};

const codeClimate = (parent, args, context) => {
  axios.get("urlhere")
    .then(res => res.data)
    .catch(err => {throw new Error(err)})
}

const fires = (parent, args, context) => {
  const res = context.prisma.fires();
  console.log(res);
  return res;
};

const persons = (parent, args, context) => {
  const res = context.prisma.persons();
  return res;
};

const me = (parent, args, context) => context.user;

const note = (parent, args, context) => {
  const { id } = args;
  const res = context.prisma.note({ id });
  return res;
};

const notes = (parent, args, context) => {
  const { orderBy } = args;
  const res = context.prisma.notes({ orderBy });
  return res;
};

module.exports = {
  info,
  programs,
  products,
  projects,
  project,
  persons,
  me,
  note,
  notes,
  starwar,
  fires,
};
