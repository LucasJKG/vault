import React from 'react';
import '../../styles/methods/paymentMethods.css';

export const PaymentMethods = () => {
  return (
    <section className="payment-methods-page" >
      <h1>Formas de Pago</h1>

      <p>
        En <strong>Vault</strong>, entendemos la importancia de ofrecer opciones de pago seguras, flexibles y accesibles para todos nuestros clientes. Por eso, actualmente contamos con varias alternativas que se gestionan directamente a través de nuestras redes sociales (<strong>WhatsApp</strong> e <strong>Instagram</strong>), mientras seguimos trabajando para habilitar la opción de pago online en nuestra página web.
      </p>

      <h2>Medios de Pago Disponibles</h2>
      <ul>
        <li>
          <strong>Efectivo:</strong> Podés abonar tu compra en efectivo, ya sea al retirar el producto en nuestro local o mediante indicaciones específicas que te proporcionaremos para pagos presenciales.
        </li>
        <li>
          <strong>Transferencia Bancaria:</strong> Ofrecemos la posibilidad de realizar el pago mediante transferencia bancaria, brindándote toda la información necesaria para que la operación sea rápida y segura.
        </li>
        <li>
          <strong>Tarjetas de Crédito:</strong> Aceptamos tarjetas de crédito con la opción de abonar en 2 o 3 cuotas sin interés, facilitando así la adquisición de tus calzados preferidos de manera cómoda y sin cargos adicionales.
        </li>
      </ul>

      <h2>Beneficios por Forma de Pago</h2>
      <p>
        Para premiar tu confianza y preferencia, ofrecemos un <strong>descuento especial</strong> para pagos realizados en efectivo o mediante transferencia bancaria. Esta promoción te permite ahorrar mientras accedes a productos de calidad.
      </p>

      <h2>Gestión del Pago</h2>
      <p>
        Dado que somos un emprendimiento en crecimiento, la coordinación de los pagos se realiza de forma personalizada a través de nuestras redes sociales. De este modo, podemos acompañarte en cada paso, resolver tus dudas y asegurarnos de que la operación sea segura y transparente.
      </p>
      <p>
        Próximamente, habilitaremos la opción de pago directo en nuestra página web para brindarte aún más comodidad.
      </p>

      <h2>Seguridad y Confianza</h2>
      <p>
        En Vault priorizamos la seguridad de tus datos y transacciones. Por eso, recomendamos siempre realizar las gestiones de pago a través de nuestros canales oficiales y evitar compartir información sensible en plataformas no autorizadas.
      </p>

      <div className="final-note">
        <p>
          <strong>Aclaración:</strong> Somos un emprendimiento comprometido con la calidad y la satisfacción de nuestros clientes. Cada pago es gestionado con atención personalizada para garantizar la mejor experiencia de compra.
        </p>
      </div>
    </section>
  );
};
