import { NextRequest, NextResponse } from 'next/server';
import minimax from '@/lib/minimax';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: string;
  regularPrice: string;
  salePrice: string;
  stockStatus: string;
  categories: { nodes: { name: string }[] };
  image: { sourceUrl: string; altText: string } | null;
}

const SYSTEM_PROMPT = `Eres un asistente de ventas especializado en perfumería y productos de belleza. Tu nombre es "Asistente Manía Store".

REGLAS IMPORTANTES:
1. Solo recomiendas productos que estén disponibles en la tienda
2. Hablas en español de manera amigable y profesional
3. Mencionas el precio cuando recomiendas productos
4. Preguntas sobre preferencias del cliente (tipo de fragancia, ocasión, presupuesto)
5. No inventas productos que no existan en el catálogo
6. Si no tienes información sobre un producto, di que no tienes esa información
7. Puedes ayudar con recomendaciones basadas en descripciones de productos

Cuando recomiendes un producto, incluye:
- Nombre del producto
- Precio (si está disponible)
- Una breve descripción de por qué es bueno

FORMATO DE RESPUESTA:
- Sé conciso pero informativo
- Usa emojis sutilmente para hacer la conversación más amigable
- Pregunta si necesitan más información o ayuda`;

async function fetchGraphQL(query: string, variables: Record<string, unknown> = {}) {
  const endpoint = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL
    ? `${process.env.NEXT_PUBLIC_WOOCOMMERCE_URL}/graphql`
    : '';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 }
  });

  return response.json();
}

const PRODUCTS_QUERY = `
query getProductsForChatbot {
  products(first: 100) {
    nodes {
      id
      name
      description
      shortDescription
      ... on SimpleProduct {
        price
        regularPrice
        salePrice
        stockStatus
      }
      ... on VariableProduct {
        price
        regularPrice
        salePrice
        stockStatus
      }
      categories {
        nodes {
          name
        }
      }
      image {
        sourceUrl
        altText
      }
    }
  }
}
`;

async function getProducts(): Promise<Product[]> {
  try {
    const data = await fetchGraphQL(PRODUCTS_QUERY);

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return [];
    }

    return data.data?.products?.nodes || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json() as { messages: Message[] };

    // Obtener productos del catálogo
    const products = await getProducts();

    // Crear contexto con productos disponibles
    const productosContext = products.length > 0
      ? `PRODUCTOS DISPONIBLES EN LA TIENDA:\n${products.map(p => {
          const price = p.regularPrice || p.price || '';
          const category = p.categories?.nodes?.[0]?.name || 'Sin categoría';
          const desc = (p.shortDescription || p.description || '').replace(/<[^>]*>/g, '').substring(0, 150);
          return `- ${p.name} | ${category} | $${price} | ${desc}...`;
        }).join('\n')}`
      : 'No hay productos disponibles en este momento';

    // Crear mensaje del sistema con contexto de productos
    const systemMessageWithContext = `${SYSTEM_PROMPT}\n\n${productosContext}`;

    // Agregar el prompt del sistema al inicio
    const messagesWithSystem = [
      { role: 'system' as const, content: systemMessageWithContext },
      ...messages.map(m => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }))
    ];

    const response = await minimax.chat.completions.create({
      model: 'MiniMax-Text-01',
      messages: messagesWithSystem,
      max_tokens: 1000,
      temperature: 0.7
    });

    const assistantMessage = response.choices[0]?.message?.content || 'Lo siento, no pude generar una respuesta.';

    return NextResponse.json({
      message: assistantMessage,
      productsCount: products.length
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    );
  }
}