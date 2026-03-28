import { db } from '../src/db/store';

console.log(
  JSON.stringify(
    {
      organizations: db.organizations.length,
      users: db.users.length,
      agents: db.agents.length,
      conversations: db.conversations.length,
      documents: db.documents.length
    },
    null,
    2
  )
);
