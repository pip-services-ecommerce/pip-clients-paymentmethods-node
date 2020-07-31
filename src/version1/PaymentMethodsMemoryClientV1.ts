let _ = require('lodash');

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdGenerator } from 'pip-services3-commons-node';

import { IPaymentMethodsClientV1 } from "./IPaymentMethodsClientV1";
import { PaymentMethodV1 } from 'pip-services-paymentmethods-node';

export class PaymentMethodsMemoryClientV1 implements IPaymentMethodsClientV1 {
    private _maxPageSize: number = 100;
    private _paymentMethods: PaymentMethodV1[];

    public constructor(...paymentMethods: PaymentMethodV1[]) {
        this._paymentMethods = paymentMethods;
    }

    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void {
        let filterCurl = this.composeFilter(filter);
        let paymentMethods = _.filter(this._paymentMethods, filterCurl);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = paymentMethods.length;

        if (skip > 0)
            paymentMethods = _.slice(paymentMethods, skip);
        paymentMethods = _.take(paymentMethods, take);

        let page = new DataPage<PaymentMethodV1>(paymentMethods, total);
        if (callback) callback(null, page);
    }

    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void {
        let paymentMethods = this._paymentMethods.filter((x) => x.id == method_id && x.customer_id == customer_id);
        let method = paymentMethods.length > 0 ? paymentMethods[0] : null;

        if (callback) callback(null, method);
    }

    createPaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void {
        if (method == null) {
            if (callback) callback(null, null);
            return;
        }

        method = _.clone(method);
        method.id = method.id || IdGenerator.nextLong();

        this._paymentMethods.push(method);

        if (callback) callback(null, method)
    }

    updatePaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void {
        let index = this._paymentMethods.map((x) => { return x.id; }).indexOf(method.id);

        if (index < 0) {
            callback(null, null);
            return;
        }

        method = _.clone(method);
        this._paymentMethods[index] = method;

        if (callback) callback(null, method)
    }

    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void {
        var index = this._paymentMethods.map((x) => { return x.id; }).indexOf(method_id);
        var item = this._paymentMethods[index];

        if (index < 0) {
            callback(null, null);
            return;
        }

        this._paymentMethods.splice(index, 1);

        if (callback) callback(null, item)
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

        let id = filter.getAsNullableString('id');
        let type = filter.getAsNullableString('type');
        let customerId = filter.getAsNullableString('customer_id');
        let _default = filter.getAsNullableBoolean('default');
        let ids = filter.getAsObject('ids');
        let payout = filter.getAsNullableBoolean('payout');

        // Process ids filter
        if (_.isString(ids))
            ids = ids.split(',');
        if (!_.isArray(ids))
            ids = null;

        return (item) => {
            if (id && item.id != id)
                return false;
            if (ids && _.indexOf(ids, item.id) < 0)
                return false;
            if (type && item.type != type)
                return false;
            if (_default && item.default != _default)
                return false;
            if (customerId && item.customer_id != customerId)
                return false;
            if (payout && item.payout != payout)
                return false;

            return true;
        };
    }

}