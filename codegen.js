// eslint-disable-next-line @typescript-eslint/no-var-requires
const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

module.exports = {
  schema: [
    {
      'https://api.vhaus.io/v1/graphql': {
        headers: {
          'x-hasura-role': 'user',
          'x-hasura-admin-secret': `${process.env.HASURA_ADMIN_SECRET}`,
        },
      },
    },
  ],
  documents: ['./src/**/*.graphql'],
  overwrite: true,
  generates: {
    './src/generated/graphql.tsx': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        skipTypename: false,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

// plugin options
//
// generates:
//   src/generated/graphql.d.ts:
//     plugins:
//       - 'typescript'
//       - 'typescript-operations'
//       - 'typescript-react-apollo'
//       - 'typescript-graphql-files-modules'
//       - 'typescript-document-nodes'
//       - 'fragment-matcher'
//   ./graphql.schema.json:
//     plugins:
//       - 'introspection'
