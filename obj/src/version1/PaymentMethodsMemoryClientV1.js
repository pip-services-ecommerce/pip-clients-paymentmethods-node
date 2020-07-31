"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
class PaymentMethodsMemoryClientV1 {
    constructor(...paymentMethods) {
        this._maxPageSize = 100;
        this._paymentMethods = paymentMethods;
    }
    getPaymentMethods(correlationId, filter, paging, callback) {
        let filterCurl = this.composeFilter(filter);
        let paymentMethods = _.filter(this._paymentMethods, filterCurl);
        // Extract a page
        paging = paging != null ? paging : new pip_services3_commons_node_2.PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);
        let total = null;
        if (paging.total)
            total = paymentMethods.length;
        if (skip > 0)
            paymentMethods = _.slice(paymentMethods, skip);
        paymentMethods = _.take(paymentMethods, take);
        let page = new pip_services3_commons_node_3.DataPage(paymentMethods, total);
        if (callback)
            callback(null, page);
    }
    getPaymentMethodById(correlationId, method_id, customer_id, callback) {
        let paymentMethods = this._paymentMethods.filter((x) => x.id == method_id && x.customer_id == customer_id);
        let method = paymentMethods.length > 0 ? paymentMethods[0] : null;
        if (callback)
            callback(null, method);
    }
    createPaymentMethod(correlationId, method, callback) {
        if (method == null) {
            if (callback)
                callback(null, null);
            return;
        }
        method = _.clone(method);
        method.id = method.id || pip_services3_commons_node_4.IdGenerator.nextLong();
        this._paymentMethods.push(method);
        if (callback)
            callback(null, method);
    }
    updatePaymentMethod(correlationId, method, callback) {
        let index = this._paymentMethods.map((x) => { return x.id; }).indexOf(method.id);
        if (index < 0) {
            callback(null, null);
            return;
        }
        method = _.clone(method);
        this._paymentMethods[index] = method;
        if (callback)
            callback(null, method);
    }
    deletePaymentMethodById(correlationId, method_id, customer_id, callback) {
        var index = this._paymentMethods.map((x) => { return x.id; }).indexOf(method_id);
        var item = this._paymentMethods[index];
        if (index < 0) {
            callback(null, null);
            return;
        }
        this._paymentMethods.splice(index, 1);
        if (callback)
            callback(null, item);
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_node_1.FilterParams();
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
exports.PaymentMethodsMemoryClientV1 = PaymentMethodsMemoryClientV1;
//# sourceMappingURL=PaymentMethodsMemoryClientV1.js.map