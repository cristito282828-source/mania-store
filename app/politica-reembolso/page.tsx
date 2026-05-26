import React from 'react';
import FooterCustom from '@/components/custom/FooterCustom';

export const metadata = {
  title: 'Política de Reembolso | Mania Store',
  description: 'Conoce nuestra política de reembolsos y devoluciones de Mania Store Colombia.'
};

export default function PoliticaReembolso() {
  return (
    <>
     <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Política de Reembolso y Devoluciones
        </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="text-gray-600">
          <p className="mb-6">
            En Mania Store nos esforzamos por garantizar tu satisfacción con cada compra. Esta política describe los términos y condiciones bajo los cuales puedes solicitar reembolsos y devoluciones.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              DERECHO DE RETRACTO
            </h2>
            <p className="mb-4">
              De acuerdo con las normas de protección al consumidor en Colombia, tienes derecho a retractarte de tu compra dentro de los cinco (5) días hábiles siguientes a la recepción del producto, sin necesidad de justificar la causa.
            </p>
            <p className="mb-4">
              Para ejercer este derecho, el producto debe estar en su estado original, sin uso, con el empaque, sellos y etiquetas intactas.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              CONDICIONES PARA DEVOLUCIÓN
            </h2>
            <p className="mb-4">
              Para que una devolución sea procesada, se deben cumplir las siguientes condiciones:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>El producto debe estar en su estado original, sin uso y con empaques intactos</li>
              <li>Debe incluirse el empaque original y accesorios si aplica</li>
              <li>La solicitud debe realizarse dentro de los 5 días hábiles siguientes a la recepción</li>
              <li>Se debe presentar comprobante de compra</li>
              <li>Fotos del estado del producto para evaluación si corresponde</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              PROCESO DE DEVOLUCIÓN
            </h2>
            <p className="mb-4">
              Para iniciar un proceso de devolución, sigue estos pasos:
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-3">
              <li>Contacta nuestro servicio al cliente a través de WhatsApp (+57 315 719 0372)</li>
              <li>Proporciona tu número de pedido y la razón de la devolución</li>
              <li>Envía fotos del estado del producto y empaque original para evaluación</li>
              <li>Nuestro equipo te enviará las instrucciones para el proceso de devolución</li>
              <li>Empaca el producto de forma segura en su empaque original</li>
            </ol>
            <p className="mb-4">
              Los costos de envío para la devolución del producto corren por cuenta del cliente, a menos que el producto presente defectos de fabricación o haya sido enviado por error.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              TIEMPO DE PROCESAMIENTO
            </h2>
            <p className="mb-4">
              Una vez recibamos tu producto devuelto:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Inspeccionaremos el producto para verificar que cumple con las condiciones (2-3 días hábiles)</li>
              <li>Si la devolución es aprobada, procesaremos el reembolso (3-5 días hábiles)</li>
              <li>El dinero será acreditado al mismo medio de pago utilizado en la compra original</li>
              <li>El tiempo que tarda el banco en reflejar el reembolso puede variar entre 5-10 días hábiles adicionales</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              PRODUCTOS DEFECTUOSOS O INCORRECTOS
            </h2>
            <p className="mb-4">
              Si recibes un producto defectuoso, dañado o incorrecto:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Contacta inmediatamente a nuestro servicio al cliente con fotos del producto y empaque</li>
              <li>Mania Store cubrirá los costos de envío de la devolución</li>
              <li>Ofreceremos reemplazo del producto o reembolso completo, según tu preferencia</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              EXCEPCIONES
            </h2>
            <p className="mb-4">
              No se aceptan devoluciones ni reembolsos en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Productos que hayan sido usados o lavados</li>
              <li>Productos sin el empaque original o sellos de seguridad rotos</li>
              <li>Productos que hayan sido alterados o manipulados</li>
              <li>Productos adquiridos fuera de nuestra tienda oficial online</li>
              <li>Solicitudes presentadas después de los 5 días hábiles establecidos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              CONTACTO
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
