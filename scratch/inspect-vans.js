const fetch = require('node-fetch');

const query = `
query getProductVariations($slug: ID!) {
  product(id: $slug, idType: SLUG) {
    __typename
    id
    databaseId
    slug
    name
    ... on VariableProduct {
      price
      stockStatus
      variations {
        nodes {
          id
          databaseId
          name
          price
          regularPrice
          stockStatus
          stockQuantity
          sku
          description
          attributes {
            nodes {
              name
              value
              label
            }
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
      body: JSON.stringify({
        query,
        variables: { slug: 'vans-rowan' }
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data.data.product, null, 2));
  } catch (err) {
    console.error(err);
  }
}

run();
