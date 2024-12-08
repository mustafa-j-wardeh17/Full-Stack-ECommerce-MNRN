import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T> {
    message: string,
    success: boolean,
    result: any,
    timeStamp: Date,
    statusCode: number,
    error: null,
    path: any
}


/**
 * An interceptor to transform and standardize API responses globally.
 * 
 * This interceptor ensures that all responses conform to a consistent structure
 * by modifying the response payload returned by controllers.
 */
export class TransformationInterception<T> implements NestInterceptor<T,Response<T>> {

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
        )
    }

}