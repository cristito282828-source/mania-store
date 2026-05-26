const fetch = require('node-fetch');

const query = `
query IntrospectProductAttributes {
  __schema {
    types {
      name
      kind
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
    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return;
    }
    const types = data.data.__schema.types;
    console.log('Available Types matching Product or Variable:');
    types.forEach(t => {
      if (t.name && (t.name.includes('Product') || t.name.includes('Variable'))) {
        console.log(`- ${t.name} (${t.kind})`);
      }
    });
  } catch (err) {
    console.error(err);
  }
}

run();
