const { workspaceRoot } = require('nx/src/utils/workspace-root');
const { registerTsProject } = require('nx/src/utils/register');

registerTsProject(workspaceRoot, 'tsconfig.json');

module.exports = require('./generator.ts');
