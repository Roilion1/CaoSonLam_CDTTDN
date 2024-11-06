import React, { useState } from 'react';
import axios from 'axios';

const ReplyContact = ({ contactId }) => {
    const [reply, setReply] = useState(''); // Trạng thái lưu nội dung trả lời
    const [isSubmitting, setIsSubmitting] = useState(false); // Để kiểm soát trạng thái khi gửi

    const handleChange = (e) => {
        setReply(e.target.value); // Cập nhật nội dung trả lời
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Khi bắt đầu gửi, đặt trạng thái submitting

        try {
            const response = await axios.post(`http://localhost:8000/api/reply-contact/${contactId}`, {
                reply: reply // Gửi nội dung trả lời lên server
            });

            if (response.data.status) {
                alert('Trả lời thành công!');
            } else {
                alert('Có lỗi xảy ra, không thể trả lời.');
            }
        } catch (error) {
            console.error('Error while replying contact:', error);
            alert('Có lỗi xảy ra khi trả lời.');
        } finally {
            setIsSubmitting(false); // Khi gửi xong, bỏ trạng thái submitting
        }
    };

    return (
        <div className="reply-contact">
            <h3>Trả lời liên hệ</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="reply">Trả lời:</label>
                    <textarea
                        id="reply"
                        name="reply"
                        value={reply}
                        onChange={handleChange}
                        required
                        className="form-control"
                        rows="4"
                    />
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang gửi...' : 'Gửi trả lời'}
                </button>
            </form>
        </div>
    );
};

export default ReplyContact;
