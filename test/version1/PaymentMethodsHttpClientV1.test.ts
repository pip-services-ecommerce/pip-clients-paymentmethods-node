let assert = require('chai').assert;
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PaymentMethodsMemoryPersistence } from 'pip-services-paymentmethods-node';
import { PaymentMethodsController } from 'pip-services-paymentmethods-node';
import { PaymentMethodsHttpServiceV1 } from 'pip-services-paymentmethods-node';
import { IPaymentMethodsClientV1 } from '../../src/version1/IPaymentMethodsClientV1';
import { PaymentMethodsHttpClientV1 } from '../../src/version1/PaymentMethodsHttpClientV1';
import { PaymentMethodsClientFixtureV1 } from './PaymentMethodsClientFixtureV1';

var httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('PaymentMethodsHttpClientV1', () => {
    let service: PaymentMethodsHttpServiceV1;
    let client: PaymentMethodsHttpClientV1;
    let fixture: PaymentMethodsClientFixtureV1;

    suiteSetup((done) => {

        let logger = new ConsoleLogger();
        let persistence = new PaymentMethodsMemoryPersistence();
        let controller = new PaymentMethodsController();

        service = new PaymentMethodsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-paymentmethods', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('pip-services-paymentmethods', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-paymentmethods', 'service', 'http', 'default', '1.0'), service
        );

        persistence.setReferences(references);
        controller.setReferences(references);
        service.setReferences(references);

        client = new PaymentMethodsHttpClientV1();
        client.setReferences(references);
        client.configure(httpConfig);

        fixture = new PaymentMethodsClientFixtureV1(client);

        service.open(null, (err) => {
            client.open(null, done);
        });
    });

    suiteTeardown((done) => {
        client.close(null);
        service.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
