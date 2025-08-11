import React from 'react';
import '../../styles/methods/shippingMethods.css';

export const ShippingMethods = () => {
  return (
    <section className="shipping-methods-page" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>Métodos de Envío</h1>

      <p>Elegí la mejor forma para recibir tu pedido:</p>

      <h2>Envío a domicilio</h2>
      <p>
        Realizamos envíos a domicilio únicamente en Córdoba, Villa María y Villa Nueva. 
        Recomendamos elegir una dirección donde pueda haber una persona mayor de edad para recibir el pedido entre las 9:00 y las 20:00 hs, de lunes a sábado, exceptuando feriados nacionales.
      </p>
      <p>No es necesario que lo reciba el titular de la compra.</p>

      <h2>Envío Express</h2>
      <p>
        Ofrecemos envío express en Villa María y Villa Nueva, con entrega dentro de las 24 horas hábiles posteriores a la confirmación del pedido.
        El costo depende de la zona geográfica.
        <strong> No aplica la promoción de envío gratis</strong>.
      </p>

      <h2>Retiro en local - Vault</h2>
      <p>
        Podés optar por retirar tu pedido en nuestro local sin costo adicional.
        Al coordinar la compra mediante WhatsApp o Instagram, te informaremos la dirección, horarios y el momento exacto en que tu pedido estará listo para retirar.
      </p>

      <h2>¿Cuánto tarda en llegar mi pedido?</h2>
      <p>
        Una vez confirmado el pago, el pedido se despacha dentro de las 48 horas hábiles.
        Los tiempos de entrega pueden variar según la ubicación y otros factores externos.
      </p>
      <p>
        Si elegiste envío express, recibirás tu pedido dentro de las 24 horas hábiles.
      </p>

      <h2>¿Cuál es el costo de envío?</h2>
      <p>
        El costo varía según la zona y el método de envío. Se informará al momento de coordinar la entrega a través de nuestras redes sociales.
      </p>
      <p>
        Los envíos son <strong>gratis</strong> en compras a partir de los <strong>$100.000</strong>.
      </p>

      <h2>¿En qué horarios se efectúan las entregas?</h2>
      <p>
        Las entregas se realizan de lunes a sábado entre las 9:00 y las 20:00 hs, exceptuando feriados nacionales.
      </p>

      <h2>¿En qué zonas realizamos envíos?</h2>
      <p>
        Actualmente, realizamos envíos únicamente en Córdoba, Villa María y Villa Nueva.
      </p>

      <h2>¿Dónde puedo retirar mi pedido?</h2>
      <p>
        Contamos con un local donde podés retirar tu pedido personalmente sin costo adicional.
      </p>

      <div className="final-note" style={{ marginTop: '30px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        <p>
          <strong>Aclaración:</strong> Somos un emprendimiento en crecimiento y gestionamos cada envío de manera personalizada a través de nuestras redes sociales para brindarte la mejor atención y garantizar que tu pedido llegue rápido y en perfectas condiciones.
        </p>
      </div>
    </section>
  );
};
