import React, { useState, useRef, useEffect } from 'react';
import '../styles/faq.css';

const faqs = [
  {
    question: "¿Cuáles son los métodos de envío disponibles?",
    answer: `En Vault gestionamos los envíos de forma personalizada mediante WhatsApp o Instagram. 
    Realizamos envíos únicamente en Córdoba, Villa María y Villa Nueva. 
    También podés retirar tu pedido en nuestro local sin costo adicional.`,
  },
  {
    question: "¿Cuánto tardan en llegar los pedidos?",
    answer: `Una vez confirmado el pago, los pedidos se despachan dentro de las 48 horas hábiles. 
    El tiempo de entrega varía según la zona. 
    Si elegís envío express (disponible solo en Villa María y Villa Nueva), recibirás tu pedido dentro de las 24 horas hábiles.`,
  },
  {
    question: "¿Cuáles son los horarios de entrega?",
    answer: "Las entregas se realizan de Lunes a Sábado, entre las 9:00 y las 18:00 hs (excepto feriados nacionales).",
  },
  {
    question: "¿Cuál es el costo de envío?",
    answer: `El costo se informa al momento de coordinar la entrega a través de nuestras redes sociales. 
    Los envíos son gratis en compras superiores a $100.000.`,
  },
  {
    question: "¿Qué formas de pago aceptan?",
    answer: `Aceptamos pago en efectivo, transferencia bancaria y tarjetas de crédito con opción a 2 o 3 cuotas sin interés. 
    Si abonás en efectivo o transferencia, podrás acceder a un descuento especial.
    Por ahora, los pagos se coordinan únicamente por WhatsApp o Instagram, ya que la opción de pago online está en desarrollo.`,
  },
  {
    question: "¿Puedo cambiar o devolver mi compra?",
    answer: `Sí, podés realizar cambios y devoluciones dentro de los 30 días corridos posteriores a la recepción del producto. 
    El calzado debe estar sin uso, en perfecto estado y con la etiqueta original. 
    Para gestionar un cambio o devolución, contactanos por WhatsApp o Instagram y te guiaremos en el proceso.`,
  },
  {
    question: "¿Qué hago si el producto tiene una falla o defecto?",
    answer: `En caso de fallas, por favor contactanos por nuestras redes sociales para coordinar la devolución o cambio. 
    Los gastos logísticos en estos casos serán asumidos por Vault.`,
  },
  {
    question: "¿Dónde puedo retirar mi pedido?",
    answer: `Podés retirar tu pedido en nuestro local en Córdoba. Al coordinar la compra, te indicaremos la dirección y horarios para el retiro.`,
  },
  {
    question: "¿Cómo debo cuidar mis calzados Vault?",
    answer: `Para conservar tus calzados en óptimas condiciones, te recomendamos limpiarlos con un cepillo suave o paño húmedo, evitar el contacto con agua en exceso, dejarlos secar al aire libre alejados de fuentes de calor, y guardarlos en un lugar fresco y seco usando hormas o relleno para mantener su forma.`,
  },
];

export const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const contentRefs = useRef([]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    // Ajusta la altura del contenedor para animación (max-height)
    contentRefs.current.forEach((ref, i) => {
      if (ref) {
        if (activeIndex === i) {
          ref.style.maxHeight = ref.scrollHeight + 'px';
        } else {
          ref.style.maxHeight = '0px';
        }
      }
    });
  }, [activeIndex]);

  return (
    <section className="faq-page">
      <h1>Preguntas Frecuentes (FAQ)</h1>
      <div className="faq-list">
        {faqs.map(({ question, answer }, index) => (
          <div
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            key={index}
          >
            <button
              className="faq-question"
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {question}
              <img
                src="/flecha-abajo.png"
                alt="flecha"
                className={`arrow-icon ${activeIndex === index ? 'rotated' : ''}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-answer-${index}`}
              className="faq-answer"
              ref={(el) => (contentRefs.current[index] = el)}
              role="region"
              aria-labelledby={`faq-question-${index}`}
            >
              <p>{answer}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="final-note">
        <p>
          Si tenés alguna otra consulta, no dudes en contactarnos por WhatsApp o Instagram. En Vault estamos para ayudarte.
        </p>
      </div>
    </section>
  );
};
