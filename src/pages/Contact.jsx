import React, { useState } from 'react';
import '../styles/pages/contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const phoneNumber = '+19832049808';

  const whatsappMessage = `Hola, soy ${name}, ${message}`;
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleClick = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert('Por favor completá ambos campos');
      return;
    }
    window.open(link, '_blank');
    setName('');
    setMessage('');
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contacto</h1>

      <div className="contact-form">
        <label className="contact-label" htmlFor="name">Nombre</label>
        <input
          className="contact-input"
          type="text"
          id="name"
          name="name"
          placeholder="Tu nombre"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <label className="contact-label" htmlFor="message">Mensaje</label>
        <textarea
          className="contact-input contact-textarea"
          id="message"
          name="message"
          placeholder="Escribe tu mensaje..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />

        <button
          className="contact-button"
          onClick={handleClick}
        >
          Contactar por WhatsApp
        </button>
      </div>

      <div className="contact-info">
        <h2>También nos podés encontrar en:</h2>
        <span className="contact-item">
          <picture className="contact-icon">
            <img src="/social-icon/whatsapp.png" alt="Whatsapp Icon Contact" />
          </picture>
          <p>
            +1 (983) 204-9808
          </p>
        </span>
        <span className="contact-item">
          <picture className="contact-icon">
            <img src="/social-icon/ig.png" alt="Instagram Icon Contact" />
          </picture>
          <p className="contact-item">
            @vault.vm
          </p>
        </span>

        <div className="contact-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3368.895183038858!2d-63.225959687688096!3d-32.395171344141765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95cc42b9d14a87ab%3A0x403acd2af8719428!2sGilli%20Mafalda%20216%2C%20X5900%20Villa%20Mar%C3%ADa%2C%20C%C3%B3rdoba!5e0!3m2!1ses-419!2sar!4v1754773469493!5m2!1ses-419!2sar"
            title="Ubicación en Villa María"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
