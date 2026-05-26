const fetch = require('node-fetch');

const query = `
query GetAllTaxonomies {
  taxonomies {
    nodes {
      name
      graphqlSingleName
      graphqlPluralName
    }
  }
}
`;

async function run() {
  try {
    const res = await fetch('https://dev-mania-store.pantheonsite.io/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    console.log(JSON.stringify(data.data.taxonomies.nodes, null, 2));
  } catch (err) {
    console.error(err);
  }
}

run();
