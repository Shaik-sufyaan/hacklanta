export const queries = {
  organizations: 'SELECT * FROM organizations',
  usersByOrganization: 'SELECT * FROM users WHERE organization_id = $1',
  agentsByOrganization: 'SELECT * FROM agents WHERE organization_id = $1',
  conversationsByOrganization: 'SELECT * FROM conversations WHERE organization_id = $1',
  documentsByOrganization: 'SELECT * FROM documents WHERE organization_id = $1'
};
