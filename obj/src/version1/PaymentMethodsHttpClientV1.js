"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class PaymentMethodsHttpClientV1 extends pip_services3_rpc_node_1.CommandableHttpClient {
    constructor(config) {
        super('v1/payment_methods');
        if (config != null)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getPaymentMethods(correlationId, filter, paging, callback) {
        this.callCommand('get_payment_methods', correlationId, {
            filter: filter,
            paging: paging
        }, callback);
    }
    getPaymentMethodById(correlationId, method_id, customer_id, callback) {
        this.callCommand('get_payment_method_by_id', correlationId, {
            method_id: method_id,
            customer_id: customer_id
        }, callback);
    }
    createPaymentMethod(correlationId, method, callback) {
        this.callCommand('create_payment_method', correlationId, {
            method: method
        }, callback);
    }
    updatePaymentMethod(correlationId, method, callback) {
        this.callCommand('update_payment_method', correlationId, {
            method: method
        }, callback);
    }
    deletePaymentMethodById(correlationId, method_id, customer_id, callback) {
        this.callCommand('delete_payment_method_by_id', correlationId, {
            method_id: method_id,
            customer_id: customer_id
        }, callback);
    }
}
exports.PaymentMethodsHttpClientV1 = PaymentMethodsHttpClientV1;
//# sourceMappingURL=PaymentMethodsHttpClientV1.js.map