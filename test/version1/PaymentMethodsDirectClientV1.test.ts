import { Descriptor, ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PaymentMethodsMemoryPersistence } from 'pip-services-paymentmethods-node';
import { PaymentMethodsController } from 'pip-services-paymentmethods-node';
import { PaymentMethodsDirectClientV1 } from '../../src/version1/PaymentMethodsDirectClientV1';
import { PaymentMethodsClientFixtureV1 } from './PaymentMethodsClientFixtureV1';

suite('PaymentMethodsDirectClientV1', () => {
    let client: PaymentMethodsDirectClientV1;
    let fixture: PaymentMethodsClientFixtureV1;

    suiteSetup((done) => {
        
        let logger = new ConsoleLogger();
        let paymentmethodsPersistence = new PaymentMethodsMemoryPersistence();

        let controller = new PaymentMethodsController();

        let references: References = References.fromTuples(
            new Descriptor('pip-services', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-paymentmethods', 'persistence', 'memory', 'default', '1.0'), paymentmethodsPersistence,
            new Descriptor('pip-services-paymentmethods', 'controller', 'default', 'default', '1.0'), controller,
        );

        paymentmethodsPersistence.setReferences(references);
        controller.setReferences(references);

        client = new PaymentMethodsDirectClientV1();
        client.setReferences(references);

        fixture = new PaymentMethodsClientFixtureV1(client);

        client.open(null, done);
    });

    suiteTeardown((done) => {
        client.close(null, done);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
