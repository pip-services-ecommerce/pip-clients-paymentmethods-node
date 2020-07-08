import { ConfigParams } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { CommandableHttpClient } from 'pip-services3-rpc-node';

import { IPaymentMethodsClientV1 } from './IPaymentMethodsClientV1';
import { PaymentMethodV1 } from 'pip-services-paymentmethods-node';

export class PaymentMethodsHttpClientV1 extends CommandableHttpClient implements IPaymentMethodsClientV1 {

    constructor(config?: any) {
        super('v1/payment_methods');

        if (config != null)
            this.configure(ConfigParams.fromValue(config));
    }

    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void {
        this.callCommand(
            'get_payment_methods',
            correlationId,
            {
                filter: filter,
                paging: paging
            },
            callback
        );
    }

    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        this.callCommand(
            'get_payment_method_by_id',
            correlationId,
            {
                method_id: method_id,
                customer_id: customer_id
            },
            callback
        );
    }

    createPaymentMethod(correlationId: string, method: PaymentMethodV1,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        this.callCommand(
            'create_payment_method',
            correlationId,
            {
                method: method
            },
            callback
        );
    }

    updatePaymentMethod(correlationId: string, method: PaymentMethodV1,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        this.callCommand(
            'update_payment_method',
            correlationId,
            {
                method: method
            },
            callback
        );
    }

    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        this.callCommand(
            'delete_payment_method_by_id',
            correlationId,
            {
                method_id: method_id,
                customer_id: customer_id
            },
            callback
        );
    }
}
