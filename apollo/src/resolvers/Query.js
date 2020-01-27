// Queries must be defined to return fields of the same type
// See the Query field in the type definitions for examples

const info = () => `Hello World`;

const programs = (_parent, _args, context) => {
  const res = context.prisma.programs();
  return res;
};

const products = (_parent, _args, context) => {
  const res = context.prisma.products();
  return res;
};

const projects = (_parent, _args, context) => {
  const res = context.prisma.projects();
  return res;
};

const persons = (_parent, _args, context) => {
  const res = context.prisma.persons();
  return res;
};

const me = (_parent, _args, context) => context.user;

const notes = (_parent, _args, context) => {
  const res = context.prisma.notes();
  return res;
};

module.exports = {
  info,
  programs,
  products,
  projects,
  persons,
  me,
  notes,
};
