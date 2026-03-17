import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import createCheckoutSession from './Routes/createCheckoutSession';
import webhookHandler from './Routes/webhook';
import refundHandler from './Routes/Refund';
import approveHandler from './Routes/approve';
import supabaseWebhookHandler from './Routes/supabaseWebhook';
import userRouter from './Routes/user';
import testPaymentHandler from './Routes/testPayment';
import healthCheck from './Routes/health';
import adminRouter from './Routes/admin';
import applicationsRouter from './Routes/applications';
import { requireUser } from './middleware/requireUser';

dotenv.config();

const app = express();

// Security headers
app.use(helmet());

// CORS configuration
const allowedOrigins = (
  process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL, 'https://zanc-membership-app.vercel.app']
    : ['http://localhost:5173']
).filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (no Origin) and allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle OPTIONS preflight for all routes
app.options('*', cors());

// Logging
app.use(morgan('combined'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Request logging middleware
// ...existing code...

// Serve static files for webhook simulator
app.use('/static', express.static('public'));

// Raw middleware for webhook endpoints (before express.json())
app.post('/api/webhook', express.raw({ type: 'application/json' }), webhookHandler);
app.post('/api/supabase-webhook', express.json(), supabaseWebhookHandler);

// JSON middleware for other endpoints
app.use(express.json());

// Development webhook endpoint (after express.json())
app.post('/api/webhook-dev', webhookHandler);

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Health check endpoint
app.get('/api/health', healthCheck);

app.post('/api/create-checkout-session', requireUser, createCheckoutSession);
app.post('/api/refund', requireUser, refundHandler);
app.post('/api/approve', requireUser, approveHandler);
app.post('/api/test-payment', testPaymentHandler);
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/applications', applicationsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
