import React from 'react';
import FooterCustom from '@/components/custom/FooterCustom';

export const metadata = {
  title: 'Política de Protección de Datos | Mania Store',
  description: 'Conoce cómo protegemos tus datos personales en Mania Store Colombia.'
};

export default function PoliticaProteccionDatos() {
  return (
    <>
     <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">
          Política de Protección de Datos Personales
        </h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-lg text-gray-600 mb-6">
          Última actualización: {new Date().toLocaleDateString()}
        </p>

        <div className="text-gray-600">
          <p className="mb-6">
            Mania Store, en cumplimiento de la Ley 1581 de 2012 sobre Protección de Datos Personales en Colombia, ha establecido esta Política
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              RESPONSABLE DEL TRATAMIENTO
            </h2>
            <p className="mb-4">
              <strong>Razón Social:</strong> Mania Store
            </p>
            <p className="mb-4">
              <strong>Domicilio:</strong> Colombia
            </p>
            <p className="mb-4">
              <strong>Correo electrónico:</strong> contacto@maniastorecali.com
            </p>
            <p className="mb-4">
              <strong>WhatsApp:</strong> +57 315 719 0372
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              DATOS PERSONALES QUE RECOPILAMOS
            </h2>
            <p className="mb-4">
              Mania Store puede recopilar los siguientes tipos de información personal:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Datos de identificación:</strong> Nombre completo, número de documento, fecha de nacimiento</li>
              <li><strong>Datos de contacto:</strong> Dirección de correo electrónico, número de teléfono, dirección postal</li>
              <li><strong>Datos de facturación y envío:</strong> Dirección de entrega, información de pago</li>
              <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador, páginas visitadas</li>
              <li><strong>Preferencias de compra:</strong> Historial de pedidos, productos favoritos, intereses en ropa deportiva y accesorios</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              FINALIDADES DEL TRATAMIENTO
            </h2>
            <p className="mb-4">
              Los datos personales recopilados serán utilizados para las siguientes finalidades:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Procesar y gestionar pedidos de perfumes y fragancias</li>
              <li>Facilitar el proceso de pago y facturación</li>
              <li>Realizar envíos y entregas de productos a todo Colombia</li>
              <li>Brindar atención al cliente y soporte postventa</li>
              <li>Enviar comunicaciones sobre el estado de pedidos</li>
              <li>Enviar información promocional y ofertas (previo consentimiento)</li>
              <li>Realizar análisis estadísticos y estudios de mercado</li>
              <li>Mejorar nuestros productos, servicios y experiencia de usuario</li>
              <li>Cumplir con obligaciones legales en Colombia</li>
              <li>Prevenir fraudes y garantizar la seguridad de la plataforma</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              DERECHOS DE LOS TITULARES
            </h2>
            <p className="mb-4">
              Como titular de datos personales, usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Conocer, actualizar y rectificar</strong> sus datos personales frente a nosotros</li>
              <li><strong>Solicitar prueba</strong> de la autorización otorgada para el tratamiento</li>
              <li><strong>Ser informado</strong> sobre el uso que se ha dado a sus datos</li>
              <li><strong>Presentar reclamos</strong> ante la Superintendencia de Industria y Comercio</li>
              <li><strong>Revocar la autorización</strong> y solicitar la supresión de datos</li>
              <li><strong>Acceder gratuitamente</strong> a sus datos personales que poseemos</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              PROCEDIMIENTO PARA EJERCER SUS DERECHOS
            </h2>
            <p className="mb-4">
              Para ejercer sus derechos sobre datos personales, puede contactarnos a través de:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Correo electrónico: contacto@maniastorecali.com</li>
              <li>WhatsApp: +57 315 719 0372</li>
            </ul>
            <p className="mb-4">
              Su solicitud será atendida en un plazo máximo de diez (10) días hábiles contados a partir de la fecha de recepción.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              SEGURIDAD DE LA INFORMACIÓN
            </h2>
            <p className="mb-4">
              Mania Store implementa medidas técnicas, humanas y administrativas
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              CONTACTO
            </h2>
            <p className="mb-4">
              Para cualquier consulta relacionada con el tratamiento de sus datos personales:
            </p>
            <ul className="list-none mb-4 space-y-2">
              <li><strong>Email:</strong> contacto@maniastorecali.com</li>
              <li><strong>WhatsApp:</strong> +57 315 719 0372</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
      <FooterCustom />
    </>
  );
}
