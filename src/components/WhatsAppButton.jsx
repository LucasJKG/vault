import React from 'react';
import '../styles/components/whatsappButton.css';

export const WhatsAppButton = () => {
    const phoneNumber = '+19832049808';
    const message = 'Hola, quiero más información!';

    const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
                <a href={link} className="whatsapp-button" target="_blank" rel="noopener noreferrer">
                    <img src="/social-icon/whatsapp-button.png" alt="WhatsApp" />
                </a>
    );
};