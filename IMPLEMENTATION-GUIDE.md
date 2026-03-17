# ZANC Comprehensive Form System Implementation

## Overview
This implementation provides a complete form system for ZANC (Zambian Association of North Carolina) that allows users to:
1. Select membership and/or insurance services
2. Complete comprehensive application forms
3. Make secure payments through Stripe
4. Automatically generate and email PDFs to admin

## System Architecture

### Frontend Components Created:
- `ApplicationFlow.tsx` - Main coordinator component that manages the entire flow
- `ServiceSelection.tsx` - Updated to handle service selection with pricing
- `InsuranceForm.tsx` - Comprehensive insurance application form
- `MembershipApplicationForm.tsx` - Detailed membership application form
- `PaymentSuccess.tsx` - Success page after payment completion
- `PaymentCancelled.tsx` - Cancellation page if payment is cancelled

### Backend Components Created:
- `Routes/applications.ts` - API routes for form submissions and payments
- `services/pdfGenerator.ts` - PDF generation service for applications
- `services/emailService.ts` - Email service for sending PDFs to admin
- Updated `Routes/webhook.ts` - Enhanced webhook handler for application processing

### Database Schema Extensions:
- `InsuranceApplication` model - Stores insurance form data
- `MembershipApplication` model - Stores membership form data
- `CombinedOrder` model - Tracks service selections and form completion

## Implementation Flow

### User Experience:
1. **Service Selection**: User selects membership and/or insurance options with real-time total calculation
2. **Forms**: User completes application forms based on selected services
3. **Payment**: Stripe checkout session with secure payment processing
4. **Confirmation**: Success page with order details and next steps

### Backend Processing:
1. **Order Creation**: Creates CombinedOrder record when service is selected
2. **Form Submission**: Stores form data in respective application tables
3. **Payment Processing**: Creates Stripe checkout session with order metadata
4. **Webhook Processing**: Upon successful payment:
   - Updates order status to COMPLETED
   - Generates PDFs for submitted applications
   - Sends email to admin with PDF attachments
   - Sends confirmation email to user

## Key Features

### Form System:
- **Insurance Form**: Personal info, address, employment, beneficiary, health info, emergency contact, dependent info
- **Membership Form**: Personal info, professional info, Zambian background, volunteer interests, references
- **Validation**: Required field validation and form state management
- **Navigation**: Back/forward navigation with form data persistence

### Payment Integration:
- **Stripe Checkout**: Secure payment processing
- **Order Tracking**: Links payments to form submissions
- **Success/Cancel Pages**: Proper handling of payment outcomes

### PDF Generation:
- **Dynamic PDFs**: Generated from form data using PDFKit
- **Professional Layout**: Formatted with sections and proper styling
- **Automatic Generation**: Triggered after successful payment

### Email System:
- **Admin Notifications**: Detailed email with application PDFs attached
- **User Confirmations**: Thank you email with order details
- **Error Handling**: Graceful handling of email failures

## Environment Variables Required

### Backend (.env):
```
DATABASE_URL=your_supabase_postgres_url
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@domain.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@zanc.org
ADMIN_EMAIL=admin@zanc.org
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env):
```
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## Setup Instructions

### 1. Database Setup:
```bash
cd Backend
npx prisma generate
npx prisma db push
```

### 2. Install Dependencies:
```bash
# Backend
cd Backend
npm install pdfkit @types/pdfkit

# Frontend dependencies should already be installed
```

### 3. Update App Routes:
Add these routes to your React Router configuration:
```tsx
<Route path="/payment-success" element={<PaymentSuccess />} />
<Route path="/payment-cancelled" element={<PaymentCancelled />} />
```

### 4. Update GetInvolved Page:
The GetInvolved page has been updated to integrate the ApplicationFlow component.

### 5. Start Services:
```bash
# Backend
cd Backend
npm run dev

# Frontend
cd Frontend
npm run dev
```

## API Endpoints

### Applications API:
- `POST /api/applications/create-order` - Create new order
- `POST /api/applications/submit-insurance` - Submit insurance application
- `POST /api/applications/submit-membership` - Submit membership application
- `POST /api/applications/create-checkout-session` - Create Stripe session
- `GET /api/applications/order/:id` - Get order details

## Testing

### Email Testing:
The system includes a test email function that can be called to verify email configuration:
```javascript
await EmailService.sendTestEmail();
```

### Payment Testing:
Use Stripe test cards for payment testing:
- Success: 4242424242424242
- Declined: 4000000000000002

## Security Considerations

1. **Input Validation**: All form inputs are validated both client and server-side
2. **Stripe Security**: Payment processing handled entirely by Stripe
3. **Database Security**: Prisma ORM prevents SQL injection
4. **Environment Variables**: Sensitive data stored in environment variables

## Customization Options

### PDF Styling:
Modify `services/pdfGenerator.ts` to customize PDF layout, colors, and formatting.

### Email Templates:
Update `services/emailService.ts` to customize email content and styling.

### Form Fields:
Add or remove fields in form components and update corresponding database models.

### Pricing:
Update pricing in `ServiceSelection.tsx` component.

## Error Handling

The system includes comprehensive error handling:
- Form validation errors
- Payment processing errors
- PDF generation failures
- Email delivery issues
- Database connection problems

All errors are logged and displayed appropriately to users while protecting sensitive information.

## Deployment Considerations

1. **Database**: Ensure Supabase connection is stable in production
2. **Stripe**: Use production Stripe keys for live payments
3. **Email**: Configure production email service (Gmail, SendGrid, etc.)
4. **Environment**: Set all required environment variables
5. **HTTPS**: Ensure HTTPS for Stripe webhook endpoints

This implementation provides a complete, production-ready form system for ZANC that handles the entire user journey from service selection to payment completion and admin notification.

# ZANC Membership App: Production Deployment Guide

This guide covers deploying both the frontend (Vite/React) and backend (Express/Node.js) for the ZANC Membership App.

---

## 1. Prerequisites
- Node.js (v18+ recommended)
- Git
- Supabase project (with credentials)
- Stripe account (with API keys)
- Gmail or SMTP credentials for Nodemailer
- Railway or Render account (for backend)
- Vercel account (for frontend)

---

## 2. Prepare Environment Variables

### Backend (`Backend/.env`)
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_ANON_KEY
- STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET
- ADMIN_EMAIL
- FRONTEND_URL (your deployed frontend URL)
- SUCCESS_URL (e.g., https://yourdomain.com/success)
- CANCEL_URL (e.g., https://yourdomain.com/cancel)

**Never commit `.env` files to public repos.**

---

## 3. Backend Deployment (Railway or Render)

### Railway
1. Sign up at [Railway](https://railway.app/)
2. Create a new project → "Deploy from GitHub" or "Blank Project"
3. Link your repo or upload code
4. Set environment variables in Railway dashboard
5. Set build command: `npm install`
6. Set start command: `npm run build && npm start` (or your custom start script)
7. Deploy
8. Note the backend URL (e.g., `https://zanc-backend.up.railway.app`)

### Render
1. Sign up at [Render](https://render.com/)
2. Create a new Web Service → "From GitHub" or "Manual Deploy"
3. Set environment variables in Render dashboard
4. Set build command: `npm install`
5. Set start command: `npm run build && npm start`
6. Deploy
7. Note the backend URL

---

## 4. Frontend Deployment (Vercel)

1. Sign up at [Vercel](https://vercel.com/)
2. Import your repo or upload code
3. Set environment variables if needed (e.g., VITE_API_URL)
4. Deploy
5. Note the frontend URL (e.g., `https://zanc-membership.vercel.app`)

---

## 5. Update API URLs
- In your frontend `.env` or config, set the API base URL to your backend deployment (e.g., `VITE_API_URL=https://zanc-backend.up.railway.app`)
- In your backend `.env`, set `FRONTEND_URL` to your Vercel frontend URL

---

## 6. Stripe Webhook Setup
- In Stripe dashboard, set webhook endpoint to your backend `/api/webhook` URL
- Use your backend deployment URL (e.g., `https://zanc-backend.up.railway.app/api/webhook`)
- Add the webhook secret to your backend `.env`

---

## 7. Test Production
- Submit membership/insurance forms
- Test Stripe and manual payments
- Check PDF generation and email delivery
- Verify admin dashboard access and security
- Confirm CORS and HTTPS are working

---

## 8. Final Checklist
- [ ] All environment variables set
- [ ] No secrets in code
- [ ] HTTPS enabled
- [ ] Stripe webhook working
- [ ] Emails sent successfully
- [ ] Admin routes protected
- [ ] CORS configured for production
- [ ] Logging and rate limiting enabled

---

## 9. Troubleshooting
- Check Railway/Render/Vercel build logs for errors
- Check environment variable spelling and values
- Use browser dev tools to check network/API errors
- Review backend logs for issues

---

## 10. Maintenance
- Monitor logs and error reports
- Update dependencies regularly
- Rotate secrets/keys as needed

---

For questions or help, contact your developer or platform support.
