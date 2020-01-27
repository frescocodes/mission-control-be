const author = (parent, _args, context) => {
  const res = context.prisma.note({ id: parent.id }).author();
  return res;
};

const attendedBy = (parent, _args, context) => {
  const res = context.prisma.note({ id: parent.id }).attendedBy();
  return res;
};

module.exports = {
  author,
  attendedBy,
};
