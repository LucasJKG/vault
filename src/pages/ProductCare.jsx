import React from 'react';
import '../styles/productCare.css';

export const ProductCare = () => {
  return (
    <section className="product-care-page">
      <h1>Cuidado del Producto</h1>

      <p>
        En <strong>Vault</strong> sabemos lo importante que es conservar la calidad y el buen estado de tus calzados.
        Por eso, te brindamos algunos consejos para que puedas mantenerlos como nuevos por más tiempo:
      </p>

      <h2>Limpieza</h2>
      <ul>
        <li>Retirá el polvo y la suciedad con un cepillo suave o un paño húmedo después de cada uso.</li>
        <li>Para manchas más difíciles, usá productos específicos para el material de tu calzado (cuero, gamuza, tela, etc.).</li>
        <li>Evitar sumergir los zapatos en agua o usar productos abrasivos que puedan dañar la superficie.</li>
      </ul>

      <h2>Secado</h2>
      <ul>
        <li>Dejá secar tus calzados al aire libre, lejos de fuentes directas de calor como radiadores o luz solar intensa.</li>
        <li>Para evitar deformaciones, rellená el interior con papel absorbente mientras se secan.</li>
      </ul>

      <h2>Almacenamiento</h2>
      <ul>
        <li>Guardá tus zapatos en un lugar fresco, seco y ventilado para evitar la humedad y malos olores.</li>
        <li>Usá hormas o relleno para mantener la forma original del calzado.</li>
        <li>Evitar apilar los zapatos unos encima de otros para prevenir deformaciones y daños.</li>
      </ul>

      <h2>Uso</h2>
      <ul>
        <li>Alterná el uso de tus calzados para que tengan tiempo de airearse y recuperarse.</li>
        <li>Evitar usar los mismos zapatos durante varios días consecutivos para prolongar su vida útil.</li>
      </ul>

      <div className="final-note">
        <p>
          Siguiendo estas recomendaciones, vas a poder conservar tus calzados Vault en excelente estado, disfrutando su comodidad y estilo por mucho más tiempo.
        </p>
      </div>
    </section>
  );
};
