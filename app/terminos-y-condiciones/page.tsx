import React from 'react';
import Link from 'next/link';
import FooterCustom from '@/components/custom/FooterCustom';

export const metadata = {
  title: 'Términos y Condiciones | Mania Store',
  description: 'Lee los términos y condiciones de uso de la tienda online Mania Store Colombia.'
};

export default function TerminosYCondiciones() {
  return (
    <>
     <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Términos y Condiciones
        </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="text-gray-600">
          <p className="mb-6">
            Bienvenido a Mania Store. Al acceder y utilizar este sitio web y nuestros servicios, aceptas cumplir y estar sujeto a los siguientes términos y condiciones.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. ACEPTACIÓN DE TÉRMINOS
            </h2>
            <p className="mb-4">
              Al acceder a nuestro sitio y realizar una compra, aceptas estar obligado por estos Términos y Condiciones y las leyes aplicables de Colombia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. PRODUCTOS Y PRECIOS
            </h2>
            <p className="mb-4">
              Todos los productos están sujetos a disponibilidad. Los precios están expresados en pesos colombianos (COP).
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Los precios incluyen IVA cuando aplique</li>
              <li>Nos reservamos el derecho de limitar las cantidades por pedido</li>
              <li>Las imágenes son referenciales y pueden variar del producto real</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. PROCESO DE COMPRA
            </h2>
            <p className="mb-4">
              El proceso de compra se realiza por WhatsApp:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Agrega productos al carrito</li>
              <li>Completa la información de envío</li>
              <li>Confirma el pedido por WhatsApp</li>
              <li>Coordinamos el pago</li>
            </ol>
            <p className="mb-4">
              Aceptamos transferencia bancaria y otros métodos de pago.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. ENVÍOS Y ENTREGAS
            </h2>
            <p className="mb-4">
              Realizamos envíos a todo Colombia. Los tiempos de entrega son estimados.
            </p>
            <p className="mb-4">
              Para más información, consulta nuestra <Link href="/politica-envios" className="text-blue-600 hover:underline">Política de Envíos</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. DEVOLUCIONES
            </h2>
            <p className="mb-4">
              Tienes 5 días hábiles para solicitar una devolución desde la recepción del producto.
            </p>
            <p className="mb-4">
              Consulta nuestra <Link href="/politica-reembolso" className="text-blue-600 hover:underline">Política de Reembolso</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. GARANTÍA
            </h2>
            <p className="mb-4">
              Todos nuestros productos cuentan con garantía de calidad. La garantía cubre defectos de fabricación y productos incorrectos.
            </p>
            <p className="mb-4">
              La garantía NO cubre uso normal, tallas incorrectas o daños por mal uso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. PROTECCIÓN DE DATOS
            </h2>
            <p className="mb-4">
              Tu información personal está protegida bajo la Ley 1581 de 2012. Consulta nuestra <Link href="/politica-proteccion-datos" className="text-blue-600 hover:underline">Política de Protección de Datos</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. CONTACTO
            </h2>
            <ul className="list-none mb-4 space-y-2">
              <li><strong>WhatsApp:</strong> +57 315 719 0372</li>
              <li><strong>Email:</strong> contacto@maniastorecali.com</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
      <FooterCustom />
    </>
  );
}
