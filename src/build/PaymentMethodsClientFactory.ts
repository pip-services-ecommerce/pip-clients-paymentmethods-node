import { Descriptor } from 'pip-services3-commons-node';
import { Factory } from 'pip-services3-components-node';

import { PaymentMethodsNullClientV1 } from '../version1/PaymentMethodsNullClientV1';
import { PaymentMethodsDirectClientV1 } from '../version1/PaymentMethodsDirectClientV1';
import { PaymentMethodsHttpClientV1 } from '../version1/PaymentMethodsHttpClientV1';
import { PaymentMethodsMemoryClientV1 } from '../version1/PaymentMethodsMemoryClientV1';

export class PaymentMethodsClientFactory extends Factory {
	public static Descriptor: Descriptor = new Descriptor('pip-services-paymentmethods', 'factory', 'default', 'default', '1.0');
	public static NullClientV1Descriptor = new Descriptor('pip-services-paymentmethods', 'client', 'null', 'default', '1.0');
	public static MemoryClientV1Descriptor = new Descriptor('pip-services-paymentmethods', 'client', 'memory', 'default', '1.0');
	public static DirectClientV1Descriptor = new Descriptor('pip-services-paymentmethods', 'client', 'direct', 'default', '1.0');
	public static HttpClientV1Descriptor = new Descriptor('pip-services-paymentmethods', 'client', 'http', 'default', '1.0');
	
	constructor() {
		super();

		this.registerAsType(PaymentMethodsClientFactory.NullClientV1Descriptor, PaymentMethodsNullClientV1);
		this.registerAsType(PaymentMethodsClientFactory.MemoryClientV1Descriptor, PaymentMethodsMemoryClientV1);
		this.registerAsType(PaymentMethodsClientFactory.DirectClientV1Descriptor, PaymentMethodsDirectClientV1);
		this.registerAsType(PaymentMethodsClientFactory.HttpClientV1Descriptor, PaymentMethodsHttpClientV1);
	}
	
}
