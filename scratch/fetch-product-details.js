const fetch = require('node-fetch');

const query = `
query getProducts {
  products(first: 20) {
    nodes {
      __typename
      id
      databaseId
      slug
      name
      ... on VariableProduct {
        attributes {
          nodes {
            name
            options
          }
        }
        variations {
          nodes {
            id
            databaseId
            name
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
      ... on SimpleProduct {
        attributes {
          nodes {
            name
            options
          }
        }
      }
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
    const products = data.data.products.nodes;
    products.forEach(p => {
      console.log(`Product: ${p.name} (${p.slug}) - Typename: ${p.__typename}`);
      console.log(`Parent Attributes: ${JSON.stringify(p.attributes)}`);
      if (p.variations) {
        console.log(`Variations count: ${p.variations.nodes.length}`);
        p.variations.nodes.forEach(v => {
          console.log(`  Variation ${v.id} (${v.name}): ${JSON.stringify(v.attributes?.nodes)}`);
        });
      }
      console.log('----------------------------------------------------');
    });
  } catch (err) {
    console.error(err);
  }
}

run();
