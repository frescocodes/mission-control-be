const axios = require("axios");
// Resolves all relational fields on type Project
// where the name of the function is an exact match to the field

const product = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).product();

  return res;
};

const teamLead = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).teamLead();

  return res;
};
const sectionLead = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).sectionLead();

  return res;
};
const team = async (parent, args, context) => {
  const res = await axios.get(`https://swapi.co/api/people/`);
  console.log(res.data)
  // const res = context.prisma.project({ id: parent.id }).team();

  return res.data.results;
};
const character = async (parent, args, context) => {
  const { id } = parent
  const res = await axios.get(`https://swapi.co/api/people/${id}`);
  console.log(res.data)

  return res.data;
};



const projectManagers = (parent, args, context) => {
  const res = context.prisma.project({ id: parent.id }).projectManagers();

  return res;
};

const notes = (parent, args, context) => {
  const { id } = parent;
  const { orderBy } = args;
  const res = context.prisma.project({ id }).notes({ orderBy });

  return res;
};

module.exports = {
  product,
  teamLead,
  sectionLead,
  team,
  projectManagers,
  notes,
};
