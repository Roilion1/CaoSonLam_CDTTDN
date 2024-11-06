import React, { useEffect, useState } from 'react';
import ReplyContact from '../../../components/ReplyContact';
import axios from 'axios';

const ContactDetail = ({ contactId }) => {
    const [contact, setContact] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/contact/${contactId}`);
                setContact(response.data.contact);
            } catch (error) {
                console.error('Error fetching contact details:', error);
            }
        };
        
        fetchContact();
    }, [contactId]);

    if (!contact) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Chi tiết liên hệ</h2>
            <p><strong>Tên:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Số điện thoại:</strong> {contact.phone}</p>
            <p><strong>Tiêu đề:</strong> {contact.title}</p>
            <p><strong>Nội dung:</strong> {contact.content}</p>
            <hr />
            <ReplyContact contactId={contactId} /> {/* Sử dụng form trả lời */}
        </div>
    );
};

export default ContactDetail;
