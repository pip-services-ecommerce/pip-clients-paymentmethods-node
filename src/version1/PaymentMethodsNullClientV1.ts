import { IPaymentMethodsClientV1 } from './IPaymentMethodsClientV1';

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { PaymentMethodV1 } from 'pip-services-paymentmethods-node';

export class PaymentMethodsNullClientV1 implements IPaymentMethodsClientV1 {
    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void {
        callback(null, null);
    }
    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        callback(null, null);
    }
    createPaymentMethod(correlationId: string, method: PaymentMethodV1,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        callback(null, null);
    }
    updatePaymentMethod(correlationId: string, method: PaymentMethodV1,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        callback(null, null);
    }
    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        callback(null, null);
    }
}