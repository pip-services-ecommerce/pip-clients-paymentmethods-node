import { Descriptor, ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { PaymentMethodsMemoryClientV1 } from '../../src/version1/PaymentMethodsMemoryClientV1';
import { PaymentMethodsClientFixtureV1 } from './PaymentMethodsClientFixtureV1';

suite('PaymentMethodsMemoryClientV1', () => {
    let client: PaymentMethodsMemoryClientV1;
    let fixture: PaymentMethodsClientFixtureV1;

    suiteSetup(() => {
        client = new PaymentMethodsMemoryClientV1();

        fixture = new PaymentMethodsClientFixtureV1(client);
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

});
