import React from 'react';
import FooterCustom from '@/components/custom/FooterCustom';

export const metadata = {
  title: 'Política de Envíos | Store Desing',
  description: 'Conoce nuestra política de envíos, tiempos de entrega y cobertura en Colombia.'
};

export default function PoliticaEnvios() {
  return (
    <>
     <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Política de Envíos
        </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="text-gray-600">
          <p className="mb-6">
            En Store Desing nos comprometemos a entregar tus productos de manera segura y oportuna a todo Colombia. Esta política describe nuestros tiempos de procesamiento, costos de envío y cobertura.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              COBERTURA
            </h2>
            <p className="mb-4">
              Realizamos envíos a todo Colombia, incluyendo ciudades principales y zonas rurales. No realizamos envíos internacionales en este momento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              TIEMPO DE PROCESAMIENTO
            </h2>
            <p className="mb-4">
              Una vez confirmado tu pedido y verificado el pago, el proceso de preparación y despacho toma:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Productos en stock:</strong> 1 a 2 días hábiles</li>
              <li><strong>Productos bajo pedido:</strong> 5 a 7 días hábiles</li>
              <li><strong>Temporada alta:</strong> 3 a 5 días hábiles</li>
            </ul>
            <p className="mb-4">
              Recibirás una notificación por WhatsApp o correo cuando tu pedido sea despachado, junto con el número de seguimiento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              TIEMPOS DE ENTREGA
            </h2>
            <p className="mb-4">
              Los tiempos de entrega varían según la ciudad de destino:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Ciudades principales</strong> (Bogotá, Medellín, Cali, Barranquilla): 2 a 4 días hábiles</li>
              <li><strong>Ciudades intermedias:</strong> 3 a 5 días hábiles</li>
              <li><strong>Zonas rurales y alejadas:</strong> 5 a 8 días hábiles</li>
            </ul>
            <p className="mb-4">
              Los días hábiles son de lunes a viernes, excluyendo festivos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              COSTOS DE ENVÍO
            </h2>
            <p className="mb-4">
              Los costos de envío son calculados automáticamente al momento de finalizar tu compra.
            </p>
            <p className="mb-4 bg-green-50 border-l-4 border-green-500 p-4">
              <strong>Envío Gratis:</strong> Todos los pedidos superiores a $80.000 COP califican para envío gratuito a nivel nacional.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              SEGUIMIENTO DE ENVÍO
            </h2>
            <p className="mb-4">
              Una vez tu pedido sea despachado, recibirás el número de guía para rastrear tu envío.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              RECEPCIÓN DEL PEDIDO
            </h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Verifica que el paquete esté en buenas condiciones antes de recibir</li>
              <li>Si observas daños externos, repórtalo inmediatamente</li>
              <li>Si hay algún problema, contacta nuestro servicio al cliente dentro de las 24 horas</li>
            </ul>
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
