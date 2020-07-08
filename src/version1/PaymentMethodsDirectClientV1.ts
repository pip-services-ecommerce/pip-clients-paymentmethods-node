import { ConfigParams } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { DirectClient } from 'pip-services3-rpc-node';

import { IPaymentMethodsClientV1 } from './IPaymentMethodsClientV1';
import { PaymentMethodV1 } from 'pip-services-paymentmethods-node';

export class PaymentMethodsDirectClientV1 extends DirectClient<any> implements IPaymentMethodsClientV1 {

    public constructor(config?: any) {
        super();
        this._dependencyResolver.put('controller', new Descriptor('pip-services-paymentmethods', 'controller', '*', '*', '*'));

        if (config)
            this.configure(ConfigParams.fromValue(config));
    }

    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void {
        let timing = this.instrument(correlationId, 'paymentmethods.get_payment_methods');
        this._controller.getPaymentMethods(correlationId, filter, paging, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }

    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        let timing = this.instrument(correlationId, 'paymentmethods.get_payment_method_by_id');
        this._controller.getPaymentMethodById(correlationId, method_id, customer_id, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }

    createPaymentMethod(correlationId: string, method: PaymentMethodV1,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        let timing = this.instrument(correlationId, 'paymentmethods.create_payment_method');
        this._controller.createPaymentMethod(correlationId, method, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }

    updatePaymentMethod(correlationId: string, method: PaymentMethodV1,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        let timing = this.instrument(correlationId, 'paymentmethods.update_payment_method');
        this._controller.updatePaymentMethod(correlationId, method, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }

    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void {
        let timing = this.instrument(correlationId, 'paymentmethods.delete_payment_method_by_id');
        this._controller.deletePaymentMethodById(correlationId, method_id, customer_id, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }
}