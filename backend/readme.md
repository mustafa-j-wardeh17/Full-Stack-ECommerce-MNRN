# E-Commerce NestJS Backend

Welcome to the E-Commerce Backend application. This project is a robust and scalable backend for modern e-commerce platforms, built using the NestJS framework. It supports dynamic product configurations, role-based access, and secure payment integrations, making it ideal for businesses looking to streamline their digital operations.


## **Features**

- **Authentication & Authorization**: Secure user authentication with role-based access control.
- **Product Management**: Flexible SKU configurations and category management.
- **Order Processing**: Efficient tracking and management of orders, including digital license handling.
- **Payment Integration**: Seamless integration with Stripe for secure payments.
- **Exception Handling**: Global error management for consistent responses.
- **API Documentation**: Ready-to-use Postman collection for endpoint testing.


## **Getting Started**

Follow these steps to set up and run the application:

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) instance
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- Stripe API keys
- Cloudinary account credentials

### **Installation**

1. Clone the repository:
   ```bash
   git clone https://github.com/mustafa-j-wardeh17/Full-Stack-ECommerce-MNRN.git
   cd Full-Stack-ECommerce-MNRN/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure settings::
   - Update the `config/default.json` file with your specific configurations. Below is an example of the required structure:
   <details>
    <summary>default.json</summary>

      ```json
      {
          "port": "3100",
          "mongodbUrl": "<your-mongodb-uri>",
          "adminSecretToken": "<your-admin-secret-token>",
          "appPrefix": "/api/v1",
          "fileStoragePath": "../uploads/",
          "emailService": {
              "privateKey": "<your-private-key>",
              "testDomain": "<your-test-domain>.mailgun.org",
              "publicKey": "pubkey-<your-public-key>",
              "emailTemplates": {
                  "forgotPassword": "forgot-password-template",
                  "verifyEmail": "verify-email-template",
                  "orderSuccess": "order-success"
              }
          },
          "jwtSecret": "<your-jwt-secret>",
          "loginLink": "http://localhost:3000/auth",
          "cloudinary": {
              "cloud_name": "<your-cloudinary-cloud-name>",
              "api_key": "<your-cloudinary-api-key>",
              "secret_key": "<your-cloudinary-secret-key>",
              "folder_path": "ps_store/products/",
              "publicId_prefix": "ps_store",
              "bigSize": "400X400"
          },
          "stripe": {
              "publishable_key": "pk_<your-publishable-key>",
              "secret_key": "sk-<your-secret-key>",
              "successUrl": "http://localhost:3000/order-success",
              "cancelUrl": "http://localhost:3000/order-cancel",
              "webhookSecret": "whsec_<your-webhook-secret>"
          }
      }
      ```


   </details>

<br/>

4. Start the application:
   ```bash
   npm run start:dev
   ```

5. Access the API at `http://localhost:3100`.


## **Custom Implementations**

### **Global Exception Filter**

The `AllExceptionFilter` ensures uniform error responses by catching both HTTP-specific and generic exceptions.

<details>
<summary>Code Example</summary>

```typescript
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;
        const ctx = host.switchToHttp();

        const httpStatus = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const exceptionResponse = exception instanceof HttpException
            ? exception.getResponse()
            : String(exception);

        const responseBody = {
            statusCode: httpStatus,
            timeStamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: exceptionResponse.message || 'Something went wrong!',
            errorResponse: exceptionResponse
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
```

</details>

### **Response Transformation Interceptor**

Ensures all API responses follow a structured format with additional metadata.

<details>
<summary>Code Example</summary>

```typescript
export class TransformationInterception<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Response<T>> {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        const path = context.switchToHttp().getRequest().url;
        return next.handle().pipe(
            map((data) => ({
                message: data.message,
                success: data.success,
                result: data.result,
                timeStamp: new Date(),
                statusCode,
                path,
                error: null
            }))
        );
    }
}
```

</details>

### **Authentication Middleware**

Custom middleware validates tokens and injects user data into requests.

<details>
<summary>Code Example</summary>

```typescript
@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(@Inject(UserRepository) private readonly userDB: UserRepository) {}

    async use(req: Request | any, res: Response, next: NextFunction) {
        try {
            if (req.path === '/api/v1/orders/webhook') {
                return next();
            }

            const token = req.cookies._digi_auth_token;
            if (!token) throw new UnauthorizedException('Missing auth token');

            const decodedData: any = decodeAuthToken(token);
            const user = await this.userDB.findById(decodedData?.id);
            if (!user) throw new UnauthorizedException('Unauthorized');

            req.user = { ...user, password: undefined };
            next();
        } catch (error) {
            throw new UnauthorizedException(error.message);
        }
    }
}
```

</details>


## **Schemas**

Details about schemas like **Users**, **Orders**, **Products**, and more are provided in the documentation. Each schema is tailored for MongoDB with Mongoose and includes features like references, enums, and validation.

### Example - **Users Schema**:

- **Fields**:
  - `name`: Full name (string, required).
  - `email`: Unique email (string, required, unique).
  - `password`: Hashed password (string, required).
  - `type`: Role (`admin`, `customer`, required).
  - `isVerified`: Email verification status (boolean, default: `false`).


## **E-Commerce API Postman Collection**

### **How to Use**

1. Download the collection: [E-Commerce.postman_collection.json](./E-Commerce.postman_collection.json).
2. Import it into Postman.
3. Configure required variables like API tokens.
4. Explore and test endpoints, including authentication, product management, and order processing.


## **Contributing**

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

For significant changes, please open an issue to discuss the proposed feature.


## **License**

This project is licensed under the MIT License. See the `LICENSE` file for details.

