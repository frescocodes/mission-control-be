// Resolves projects field on User type, 1:n relations
// can be resolved with WhereUniqueInput, but n:m relations
// require the use of an additional method: some, every, etc.

const projects = (_parent, _args, context) => {
  const { prisma, user } = context;
  const { email } = user;
  const where = {
    OR: [
      { sectionLead: { email } },
      { teamLead: { email } },
      { projectManagers_some: { email } },
      { team_some: { email_in: email } },
    ],
  };
  const res = prisma.projects({
    where,
  });

  return res;
};

module.exports = {
  projects,
};
