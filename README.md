# 🛍️ MERN E-Commerce Platform

A full-featured e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js). This platform includes user authentication, product management, shopping cart, payment processing with Stripe, coupon system, and comprehensive analytics dashboard.

## ✨ Features

### 👤 User Features

- **Authentication**: Secure signup, login, and logout with JWT
- **User Profile**: Manage personal information and view order history
- **Shopping Cart**: Add/remove items, update quantities, and clear cart
- **Coupon System**: Apply discount coupons and view available coupons
- **Order Tracking**: View order status and history

### 🛍️ Admin Features

- **Product Management**: Create, read, update, and delete products
- **Featured Products**: Toggle product featured status
- **Order Management**: View and manage customer orders
- **Analytics Dashboard**: Track sales, revenue, users, and products
- **Coupon Management**: Create and manage discount coupons

### 💳 Payment Integration

- **Stripe Integration**: Secure payment processing
- **Checkout Sessions**: Create and manage Stripe checkout sessions
- **Payment Success**: Handle successful payments and order creation
- **Cancel Handling**: Graceful cancellation flow

### 📊 Analytics

- **Dashboard**: Key metrics overview
- **Sales Reports**: Daily, weekly, and monthly sales data
- **Revenue Tracking**: Real-time revenue monitoring
- **User Analytics**: Total users and user growth
- **Product Performance**: Track product sales and popularity

## 🚀 Tech Stack

### Frontend

- **React 18** - UI library
- **React Router v6** - Routing and navigation
- **Zustand** - State management
- **Tailwind CSS** - Styling framework
- **Framer Motion** - Animations
- **Flowbite React** - UI components
- **Recharts** - Data visualization
- **Swiper** - Product carousels
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Stripe** - Payment processing
- **Cloudinary** - Image upload and management
- **Redis** - Caching and session management
- **JWT** - Authentication
- **Multer** - File uploads

## 📁 Project Structure

### Backend Structure

```
backend/
├── config/
│   ├── cloudinary.js      # Cloudinary configuration
│   ├── constants.js       # Application constants
│   └── envVars.js         # Environment variables
├── controllers/
│   ├── analytics.controller.js
│   ├── auth.controller.js
│   ├── cart.controller.js
│   ├── coupon.controller.js
│   ├── payment.controller.js
│   └── product.controller.js
├── lib/
│   ├── db.js              # Database connection
│   ├── redis.js           # Redis configuration
│   └── stripe.js          # Stripe configuration
├── middlewares/
│   ├── authRoute.middleware.js
│   ├── error.middleware.js
│   ├── notFound.middleware.js
│   └── upload.middleware.js
├── models/
│   ├── coupon.model.js
│   ├── order.model.js
│   ├── product.model.js
│   └── user.model.js
├── routes/
│   ├── analytics.routes.js
│   ├── auth.routes.js
│   ├── cart.routes.js
│   ├── coupon.routes.js
│   ├── payment.routes.js
│   └── product.routes.js
├── services/
│   ├── analytics.service.js
│   ├── auth.service.js
│   ├── cart.service.js
│   ├── coupon.service.js
│   ├── payment.service.js
│   └── product.service.js
└── utils/
    ├── apiError.js
    ├── asyncHandler.js
    ├── formatProductName.js
    ├── generateToken.js
    ├── getDatesInRange.js
    ├── getRandomProfile.js
    ├── imageUpload.js
    ├── recommendations.js
    ├── sanitizeUser.js
    ├── setCookies.js
    ├── storeFeaturedProducts.js
    └── storeRefreshToken.js
```

### Frontend Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AnalyticsCard.jsx
│   │   ├── Carousel.jsx
│   │   ├── CartItem.jsx
│   │   ├── CategoryItem.jsx
│   │   ├── CouponCard.jsx
│   │   ├── DeleteModal.jsx
│   │   ├── Filter.jsx
│   │   ├── Footer.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── MiniSpinner.jsx
│   │   ├── Navbar.jsx
│   │   ├── NavLinkWrapper.jsx
│   │   ├── OrderSummary.jsx
│   │   ├── Pagination.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductPopover.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── QuantityToggle.jsx
│   │   └── RecommendedProducts.jsx
│   ├── hooks/
│   │   ├── useQuantityToggle.js
│   ├── lib/
│   │   ├── axios.js       # Axios configuration
│   │   └── stripe.js      # Stripe configuration
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── SigninPage.jsx
│   │   │   └── SignupPage.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── Homepage.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── PurchaseCancelPage.jsx
│   │   └── PurchaseSuccessPage.jsx
│   ├── store/
│   │   ├── useAnalyticsStore.js
│   │   ├── useCartStore.js
│   │   ├── usePaymentStore.js
│   │   ├── useProductStore.js
│   │   └── useUserStore.js
│   └── utils/
│       ├── constants.js
│       └── formatProductName.js
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## 🎯 Key Features Explained

### Authentication System

- JWT-based authentication with access and refresh tokens
- Secure password hashing with bcrypt
- Protected routes and role-based access control
- Cookie-based session management
- Automatic token refresh with axios interceptors

### Shopping Cart

- Add/remove items with quantity controls
- Real-time cart total calculation
- Persistent cart across sessions
- Clear cart functionality

### Payment Processing

- Stripe Checkout integration
- Secure payment flow
- Webhook handling for payment confirmation
- Order creation on successful payment

### Coupon System

- Generate discount coupons
- Apply coupons to orders
- Automatic coupon deactivation after use
- Coupon validation and expiry handling

### Admin Dashboard

- Product CRUD operations
- Featured product management
- Order management
- Analytics and reporting
- User management

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB
- Redis (optional for caching)
- Stripe account
- Cloudinary account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/CabutinBenciel0425/e-commerce.git
cd e-commerce
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd frontend
npm install
```

4. **Environment Variables**

Create `.env` files in both `backend` and `frontend` directories.

**Backend `.env`:**

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
REDIS_URL=your_redis_url
REFRESH_TOKEN_SECRET_KEY=your_refresh_token_secret
ACCESS_TOKEN_SECRET_KEY=your_access_token_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
RANDOM_PROFILE_URL=https://ui-avatars.com/api/
```

**Frontend `.env`:**

```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

5. **Run the application**

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **CORS**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Environment Variables**: Sensitive data stored in .env files
- **HTTP Only Cookies**: Secure token storage
- **Role-Based Access**: Admin and user role separation
- **Token Refresh**: Secure token refresh mechanism

## 📦 API Endpoints

### Authentication Routes

- `POST /api/v1/auth/sign-up` - User registration
- `POST /api/v1/auth/sign-in` - User login
- `POST /api/v1/auth/sign-out` - User logout
- `POST /api/v1/auth/recreate-access-token` - Refresh access token
- `GET /api/v1/auth/profile` - Get user profile

### Product Routes

- `GET /api/v1/products` - Get all products (with pagination)
- `POST /api/v1/products/create` - Create product (admin)
- `GET /api/v1/products/featured` - Get featured products
- `GET /api/v1/products/recommendations` - Get recommended products
- `GET /api/v1/products/category/:category` - Get products by category
- `PATCH /api/v1/products/featured/:productId` - Toggle featured (admin)
- `DELETE /api/v1/products/:productId` - Delete product (admin)

### Cart Routes

- `GET /api/v1/cart` - Get cart items
- `POST /api/v1/cart/:productId` - Add to cart
- `PATCH /api/v1/cart/:productId` - Update quantity
- `DELETE /api/v1/cart/:productId` - Remove from cart
- `DELETE /api/v1/cart` - Clear cart

### Payment Routes

- `POST /api/v1/payment/create-checkout-session` - Create checkout session
- `POST /api/v1/payment/checkout-success` - Handle successful payment
- `POST /api/v1/payment/checkout-cancel` - Handle cancelled payment

### Coupon Routes

- `GET /api/v1/coupon` - Get user's coupon
- `POST /api/v1/coupon/validate` - Validate coupon

### Analytics Routes

- `GET /api/v1/analytics` - Get analytics data (admin)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Stripe](https://stripe.com/)
- [Cloudinary](https://cloudinary.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Flowbite React](https://flowbite-react.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://github.com/pmndrs/zustand)

## 📧 Contact

**Cabutin Benciel** - [Cabutinb@gmail.com](mailto:Cabutinb@gmail.com)

Project Link: [https://github.com/CabutinBenciel0425](https://github.com/CabutinBenciel0425)

---

**Built with ❤️ using the MERN Stack**
