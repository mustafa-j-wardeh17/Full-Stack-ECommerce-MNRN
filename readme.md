# ByteVault

ByteVault is a modern and efficient eCommerce platform for computers, smartphones, gaming console, accessories and anything related to them. Built with a scalable architecture using **NestJS** for the backend and **Next.js** for the frontend, ByteVault ensures seamless user experience and performance.


## Features

### Backend (NestJS)
- **Modular Design**: Organized schemas for `cart`, `license`, `order`, `products`, and `users`.
- **Global API Response Standardization**: Using `TransformationInterception` to maintain a unified response format.
- **Global Error Handling**: `AllExceptionFilter` for centralized error management.
- **Libraries Used**:
  - **Nodemailer**: For authentication codes and order notifications.
  - **Stripe**: Seamless checkout integration.
  - **Cloudinary**: Secure image uploads.
  - **Mongoose**: Database schema and model management.
  - **JsonWebToken (JWT)**: Security for authentication.
  - **Class-validator**: For input validation.

### Frontend (Next.js)
- **UI Components**: Built with [shadcn](https://shadcn.dev/) for a polished and consistent interface.
- **Animations**: Dynamic animations powered by Framer Motion.
- **Styling**: Tailwind CSS for responsive and customizable designs.
- **Dark/Light Themes**: User preference toggles for enhanced accessibility.
- **Context API**: `useUserContext` for authentication and global state management.

---

## Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT
- **Payment**: Stripe
- **Image Management**: Cloudinary
- **Mailing**: Nodemailer

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **UI**: [shadcn](https://shadcn.dev/)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion


## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB

### Clone Repository
```bash
git clone https://github.com/mustafa-j-wardeh17/mnrn-shop-backend.git
cd bytevault
```

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `config/default.json` file with the following keys:

   ```json
   {
    "port": "3100",
    "mongodbUrl": "mongodb+srv:******",
    "adminSecretToken": "******",
    "appPrefix": "/api/v1",
    "fileStoragePath": "../backend/uploads/",
    "frontendbase":"http://localhost:3000",
    "emailService": {
        "privateKey": "**********",
        "testDomain": "**********.mailgun.org",
        "publicKey": "pubkey-**************",
        "emailTemplates": {
            "forgotPassword": "forgot-password-template",
            "verifyEmail": "verify-email-template",
            "orderSuccess": "order-success"
        }
    },
    "jwtSecret": "************",
    "loginLink": "http://localhost:3000/sign-in",
    "cloudinary": {
        "cloud_name": "**********",
        "api_key": "************",
        "secret_key": "******************",
        "folder_path": "ps_store/products/",
        "publicId_prefix": "ps_store",
        "bigSize": "1200X1200"
    },
    "stripe": {
        "publishable_key": "*******",
        "secret_key": "**************",
        "successUrl": "http://localhost:3000/my-account/my-orders/success",
        "cancelUrl": "http://localhost:3000/order-cancel",
        "webhookSecret": "**********"
    },
    "nodemailer":{
        "email":"**********",
        "pass":"***********"
    }
   }
   ```

4. Start the server:
   ```bash
   npm run start:dev
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env.local` file with the following keys:
   ```env
   NEXT_PUBLIC_API_URL=your-backend-api-url
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Testing the Application
- Visit the frontend at: `http://localhost:3000`
- Backend API runs at: `http://localhost:3100`



## Key Functionality

### Backend Highlights
- **Standardized Responses**:
  ```ts
  export interface Response<T> {
      message: string;
      success: boolean;
      result: T;
      timeStamp: Date;
      statusCode: number;
      error: null;
      path: string;
  }
  ```

- **Global Exception Filter**:
  ```ts
  @Catch()
  export class AllExceptionFilter implements ExceptionFilter {
      constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

      catch(exception: any, host: ArgumentsHost) {
          const ctx = host.switchToHttp();
          const httpAdapter = this.httpAdapterHost.httpAdapter;

          const httpStatus = exception instanceof HttpException
              ? exception.getStatus()
              : HttpStatus.INTERNAL_SERVER_ERROR;

          const responseBody = {
              statusCode: httpStatus,
              timeStamp: new Date().toISOString(),
              path: httpAdapter.getRequestUrl(ctx.getRequest()),
              message: exception.message || 'Internal Server Error',
          };

          httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
      }
  }
  ```

### Frontend Highlights
- **Custom Hooks**:
  ```ts
  import { createContext, useContext, useState } from 'react';

  const UserContext = createContext(null);

  export const UserProvider = ({ children }) => {
      const [user, setUser] = useState(null);

      return (
          <UserContext.Provider value={{ user, setUser }}>
              {children}
          </UserContext.Provider>
      );
  };

  export const useUserContext = () => useContext(UserContext);
  ```

---

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m 'Add a new feature'
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For inquiries or support, please email: **mostafa.wardeh2000@gmail.com**
