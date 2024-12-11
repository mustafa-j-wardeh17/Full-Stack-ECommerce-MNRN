import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";


export interface HttpExceptionResponse {
    statusCode: number;
    message: string;
    error: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    constructor(private readonly httpAdapterHost: HttpAdapterHost) {
        // Dependency injection of the HttpAdapterHost, which provides access
        // to the underlying HTTP server for handling requests and responses.
    }

    /**
     * The catch method is triggered when an exception is thrown.
     */
    catch(exception: any, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost; // Access the underlying HTTP adapter.
        const ctx = host.switchToHttp(); // Switch the context to HTTP to get the request and response.

        const httpStatus = exception instanceof HttpException
            ? exception.getStatus() // Use the status code from the HttpException.
            : HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 


        // Determine the response body of the exception.
        const exceptionResponse = exception instanceof HttpException
            ? exception.getResponse() // Extract the response from the HttpException.
            : String(exception); // Otherwise, use the exception as a string.

        // Prepare the response body to be sent back to the client.
        const responseBody = {
            statusCode: httpStatus,
            timeStamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message:
                (exceptionResponse as HttpExceptionResponse).error ||   // Or fallback to the `error` field.
                (exceptionResponse as HttpExceptionResponse).message || // Use the `message` from the exception, if available.
                exceptionResponse ||                                    // Or use the raw exception response.
                'Something went wrong!',                                // Default message if no details are available.
            errorResponse: exceptionResponse // Include the raw exception for debugging purposes.
        };

        // Send the prepared response body back to the client.
        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
