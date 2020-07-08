"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class PaymentMethodsDirectClientV1 extends pip_services3_rpc_node_1.DirectClient {
    constructor(config) {
        super();
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor('pip-services-paymentmethods', 'controller', '*', '*', '*'));
        if (config)
            this.configure(pip_services3_commons_node_1.ConfigParams.fromValue(config));
    }
    getPaymentMethods(correlationId, filter, paging, callback) {
        let timing = this.instrument(correlationId, 'paymentmethods.get_payment_methods');
        this._controller.getPaymentMethods(correlationId, filter, paging, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }
    getPaymentMethodById(correlationId, method_id, customer_id, callback) {
        let timing = this.instrument(correlationId, 'paymentmethods.get_payment_method_by_id');
        this._controller.getPaymentMethodById(correlationId, method_id, customer_id, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }
    createPaymentMethod(correlationId, method, callback) {
        let timing = this.instrument(correlationId, 'paymentmethods.create_payment_method');
        this._controller.createPaymentMethod(correlationId, method, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }
    updatePaymentMethod(correlationId, method, callback) {
        let timing = this.instrument(correlationId, 'paymentmethods.update_payment_method');
        this._controller.updatePaymentMethod(correlationId, method, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }
    deletePaymentMethodById(correlationId, method_id, customer_id, callback) {
        let timing = this.instrument(correlationId, 'paymentmethods.delete_payment_method_by_id');
        this._controller.deletePaymentMethodById(correlationId, method_id, customer_id, (err, payment) => {
            timing.endTiming();
            callback(err, payment);
        });
    }
}
exports.PaymentMethodsDirectClientV1 = PaymentMethodsDirectClientV1;
//# sourceMappingURL=PaymentMethodsDirectClientV1.js.map