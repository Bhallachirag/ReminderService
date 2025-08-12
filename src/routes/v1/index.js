const express = require('express');
const router = express.Router();
const { BOOKING_SERVICE_PATH } = require("../../config/serverConfig");
const { sendBasicEmail } = require('../../services/email-service');
const axios = require('axios');

router.post('/send-confirmation-email', async (req, res) => {
    const { to, subject, body } = req.body;
    try {
        await sendBasicEmail('support@admin.com', to, subject, body);
        return res.status(200).json({
            success: true,
            message: 'Email sent successfully'
        });
    } catch (err) {
        console.error('Failed to send email:', err.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to send email'
        });
    }
});

router.post('/send-confirmation-from-order', async (req, res) => {
    const { orderId } = req.body;
    if (!orderId) {
        return res.status(400).json({
            success: false,
            message: 'orderId is required'
        });
    }
    try {
        const response = await axios.get(`${BOOKING_SERVICE_PATH}/api/v1/bookings/${orderId}`);
        const order = response.data.data;

        if (!order || !order.user || !order.user.email) {
            return res.status(404).json({
                success: false,
                message: 'User email not found for the given order ID'
            });
        }

        const email = order.user.email;
        const subject = 'Booking Confirmation';
        const body = `Hi,\n\nYour booking (ID: ${order.id}) has been successfully confirmed.\n\nTotal Cost: ₹${order.totalCost}\n\nThank you!`;

        console.log(`Sending email to: ${email}`);
        console.log(`Email body: ${body}`);

        await sendBasicEmail('support@admin.com', email, subject, body);

        return res.status(200).json({
            success: true,
            message: 'Confirmation email sent successfully'
        });
    } catch (error) {
        console.error('Error sending confirmation email:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Failed to send confirmation email'
        });
    }
});

module.exports = router;
