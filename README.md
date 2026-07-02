# Reminder Service — VaxFlow

Small, focused microservice that owns one job: sending confirmation emails once a VaxFlow booking is paid for.

## What it does

- **Confirmation emails** — `/send-confirmation-email` takes booking details and sends a formatted confirmation email via Nodemailer.
- **Order-driven emails** — `/send-confirmation-from-order` is called directly by the Booking Service after a Razorpay payment is confirmed; it fetches the order context and fires off the corresponding email without the caller needing to build the email payload itself.
- Deliberately kept as a single-purpose service, separate from the Booking Service, so email delivery (which can be slow or fail) never blocks or couples into the booking/payment flow.

## API Endpoints

| Method | Route | Description |
|---|---|---|
| POST | `/api/v1/send-confirmation-email` | Send a confirmation email with provided details |
| POST | `/api/v1/send-confirmation-from-order` | Send a confirmation email for a given order (called by the Booking Service) |

## Tech Stack

Node.js · Express 5 · Nodemailer · Sequelize · MySQL · Axios

## Getting Started

```bash
npm install
npm start
```

### Environment variables

```env
PORT=4003
EMAIL_ID=your_email@gmail.com
EMAIL_PASS=your_app_password
BOOKING_SERVICE_PATH=http://localhost:4002
```

> Note: `EMAIL_PASS` should be an app-specific password (e.g. a Gmail App Password), not your regular account password.

## Part of the VaxFlow microservices

- [Frontend](https://github.com/Bhallachirag/FinalFrontend)
- [API Gateway](https://github.com/Bhallachirag/API_Gateway)
- [Auth Service](https://github.com/Bhallachirag/Auth_Service)
- [Vaccine & Search Service](https://github.com/Bhallachirag/VaccineAndSearchService)
- [Booking Service](https://github.com/Bhallachirag/VaccineBookingService)
- **Reminder Service** (this repo)

### Author
-Chirag Bhalla
