# Client API (version 1) <br/> PaymentMethods Microservices Client SDK for Node.js

Node.js client API for PaymentMethods microservice is a thin layer on the top of
communication protocols. It hides details related to specific protocol implementation
and provides high-level API to access the microservice for simple and productive development.

* [IPaymentMethodsClientV1 interface](#interface)
    - [getPaymentMethods()](#operation1)
    - [getPaymentMethodById()](#operation2)
    - [createPaymentMethod()](#operation3)
    - [updatePaymentMethod()](#operation4)
    - [deletePaymentMethodById()](#operation5)
* [PaymentMethodsHttpClientV1 class](#client_http)
* [PaymentMethodsDirectClientV1 class](#client_direct)
* [PaymentMethodsNullClientV1 class](#client_null)

## <a name="interface"></a> IPaymentMethodsClientV1 interface

If you are using Typescript, you can use IPaymentMethodsClientV1 as a common interface across all client implementations. 
If you are using plain typescript, you shall not worry about IPaymentMethodsClientV1 interface. You can just expect that
all methods defined in this interface are implemented by all client classes.

```typescript
interface IPaymentMethodsClientV1 {
    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void;

    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void;

    createPaymentMethod(correlationId: string, method: PaymentMethodV1, 
        callback: (err: any, method: PaymentMethodV1) => void): void;

    updatePaymentMethod(correlationId: string, method: PaymentMethodV1, 
        callback: (err: any, method: PaymentMethodV1) => void): void;

    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string,
        callback: (err: any, method: PaymentMethodV1) => void): void;
}
```

### <a name="operation1"></a> getPaymentMethods(correlationId, filter, paging, callback)

Get payment methods by filter

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- filter: Object
  - id: string - (optional) unique method id
  - ids: string - (optional) list of unique method ids 
  - type: string - (optional) method type (PaymentMethodTypeV1)
  - customer_id: string - (optional) method reference customer id
  - default: boolean (optional) true if you need to get default payment methods
- paging: Object
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
Page with retrieved payment methods

### <a name="operation2"></a> getPaymentMethodById(correlationId, method_id, customer_id, callback)

Get method by id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- method_id: string - method id
- customer_id: string - method reference customer id

**Response body:**
- method: PaymentMethodV1 - finded method 

### <a name="operation3"></a> createPaymentMethod(correlationId, method, callback)

Add new method

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- method: PaymentMethodV1 - params for creates new method

**Response body:**
- method: PaymentMethodV1 - created new method

### <a name="operation4"></a> updatePaymentMethod(correlationId, method, callback)

Update existed method

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- method: PaymentMethodV1 - params for update existed method

**Returns:**
- err: Error - occured error or null for success
- method: PaymentMethodV1 - updated method 

### <a name="operation5"></a> deletePaymentMethodById(correlationId, method_id, customer_id, callback)

Delete method by id

**Arguments:** 
- correlationId: string - id that uniquely identifies transaction
- method_id: string - method id for delete
- customer_id: string - customer id in the method to be deleted

**Returns:**
- err: Error - occured error or null for success
- method: PaymentMethodV1 - deleted method 


## <a name="client_http"></a> PaymentMethodsHttpClientV1 class

PaymentMethodsHttpClientV1 is a client that implements HTTP protocol

```typescript
class PaymentMethodsHttpClientV1 extends CommandableHttpClient implements IPaymentMethodsClientV1 {
    constructor(config?: any);
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void;
    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void;
    createPaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void;
    updatePaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void;
    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void;
}
```

**Constructor config properties:** 
- connection: object - HTTP transport configuration options
  - protocol: string - HTTP protocol - 'http' or 'https' (default is 'http')
  - host: string - IP address/hostname binding (default is '0.0.0.0')
  - port: number - HTTP port number

## <a name="client_direct"></a> PaymentMethodsDirectClientV1 class

PaymentMethodsDirectClientV1 is a dummy client calls controller from the same container. 
It can be used in monolytic deployments.

```typescript
class PaymentMethodsDirectClientV1 extends DirectClient<any> implements IPaymentMethodsClientV1 {
    constructor();
    setReferences(references);
    open(correlationId, callback);
    close(correlationId, callback);
    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void;
    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void;
    createPaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void;
    updatePaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void;
    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void;
}
```

## <a name="client_null"></a> PaymentMethodsNullClientV1 class

PaymentMethodsNullClientV1 is a dummy client that mimics the real client but doesn't call a microservice. 
It can be useful in testing scenarios to cut dependencies on external microservices.

```typescript
class PaymentMethodsNullClientV1 implements IPaymentMethodsClientV1 {
    constructor();
    getPaymentMethods(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<PaymentMethodV1>) => void): void;
    getPaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void;
    createPaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void;
    updatePaymentMethod(correlationId: string, method: PaymentMethodV1, callback: (err: any, method: PaymentMethodV1) => void): void;
    deletePaymentMethodById(correlationId: string, method_id: string, customer_id: string, callback: (err: any, method: PaymentMethodV1) => void): void;
}
```