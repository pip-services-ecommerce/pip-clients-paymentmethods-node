let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { IPaymentMethodsClientV1 } from '../../src/version1/IPaymentMethodsClientV1';
import { TestModel } from '../data/TestModel';
import { PaymentMethodV1 } from 'pip-services-paymentmethods-node';
import { PagingParams } from 'pip-services3-commons-node';

var now = new Date();

let PAYMENT_METHOD1: PaymentMethodV1 = TestModel.createPaymentMethod1();
let PAYMENT_METHOD2: PaymentMethodV1 = TestModel.createPaymentMethod2();

export class PaymentMethodsClientFixtureV1 {
    private _client: IPaymentMethodsClientV1;

    constructor(client: IPaymentMethodsClientV1) {
        this._client = client;
    }

    testCrudOperations(done) {
        let paymentMethod1, paymentMethod2: PaymentMethodV1;

        async.series([
            // Create one payment method
            (callback) => {
                this._client.createPaymentMethod(
                    null,
                    PAYMENT_METHOD1,
                    (err, paymentMethod) => {
                        assert.isNull(err);

                        assert.isObject(paymentMethod);
                        TestModel.assertEqualPaymentMethod(paymentMethod, PAYMENT_METHOD1);

                        paymentMethod1 = paymentMethod;

                        callback();
                    }
                );
            },
            // Create another credit_card
            (callback) => {
                this._client.createPaymentMethod(
                    null,
                    PAYMENT_METHOD2,
                    (err, paymentMethod) => {
                        assert.isNull(err);

                        assert.isObject(paymentMethod);
                        TestModel.assertEqualPaymentMethod(paymentMethod, PAYMENT_METHOD2);

                        paymentMethod2 = paymentMethod;

                        callback();
                    }
                );
            },
            // Get all payment methods
            (callback) => {
                this._client.getPaymentMethods(
                    null,
                    null,
                    new PagingParams(0, 5, false),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.isTrue(page.data.length >= 2);

                        callback();
                    }
                );
            },
            // Update the payment method
            (callback) => {
                paymentMethod1.name = 'Updated Card 1';

                this._client.updatePaymentMethod(
                    null,
                    paymentMethod1,
                    (err, paymentMethod) => {
                        assert.isNull(err);

                        assert.isObject(paymentMethod);
                        assert.equal(paymentMethod.name, 'Updated Card 1');
                        assert.equal(paymentMethod.id, PAYMENT_METHOD1.id);

                        paymentMethod1 = paymentMethod;

                        callback();
                    }
                );
            },
            // Delete payment method
            (callback) => {
                this._client.deletePaymentMethodById(
                    null,
                    paymentMethod1.id,
                    paymentMethod1.customer_id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
            // Try to get deleted payment method
            (callback) => {
                this._client.getPaymentMethodById(
                    null,
                    paymentMethod1.id,
                    paymentMethod1.customer_id,
                    (err, paymentMethod) => {
                        assert.isNull(err);

                        assert.isNull(paymentMethod || null);

                        callback();
                    }
                );
            }
        ], done);
    }
}
