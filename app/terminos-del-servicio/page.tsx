import React from 'react';
import FooterCustom from '@/components/custom/FooterCustom';

export const metadata = {
  title: 'Términos del Servicio | Store Desing',
  description: 'Conoce nuestros términos del servicio y condiciones de uso de Store Desing Colombia.'
};

export default function TerminosDelServicio() {
  return (
    <>
     <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Términos del Servicio
        </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="text-gray-600">
          <p className="mb-6">
            Store Desing se dedica a la comercialización de productos deportivos y accesorios a través de nuestra tienda online.
          </p>

          <p className="mb-6">
            Al usar este sitio, el usuario acepta estos términos y las leyes aplicables de Colombia.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              PROCESO DE COMPRA
            </h2>
            <p className="mb-4">
              Para realizar una compra, navega el catálogo y agrega productos al carrito. Luego confirmas el pedido a través de WhatsApp donde coordinamos el pago y envío.
            </p>
            <p className="mb-4">
              El proceso se considera perfeccionado una vez confirmado el pago. Aceptamos transferencia bancaria y otros métodos de pago.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              DERECHO DE RETRACTO
            </h2>
            <p className="mb-4">
              Tienes 5 días hábiles para ejercer el derecho de retracto desde la recepción del producto.
            </p>
            <p className="mb-4">
              El producto debe ser devuelto en su estado original, sin uso, con empaque intacto.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              ENVÍOS
            </h2>
            <p className="mb-4">
              Realizamos envíos a todo Colombia. Los tiempos de entrega varían según la ubicación.
            </p>
            <p className="mb-4">
              Al recibir el producto, verifica que esté en buenas condiciones. Cualquier anomalía debe ser reportada dentro de las 24 horas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              PROMOCIONES
            </h2>
            <p className="mb-4">
              Las promociones y su vigencia serán publicadas en la página. Los productos en promoción aplican las mismas políticas de reembolso.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              CONTACTO
            </h2>
            <ul className="list-none mb-4 space-y-2">
              <li><strong>WhatsApp:</strong> +57 319 687 2868</li>
              <li><strong>Email:</strong> contacto@forzasportcali.com</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
      <FooterCustom />
    </>
  );
}
