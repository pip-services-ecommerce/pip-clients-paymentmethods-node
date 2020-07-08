# <img src="https://github.com/pip-services/pip-services/raw/master/design/Logo.png" alt="Pip.Services Logo" style="max-width:30%"> <br/> Payments Microservice Client SDK for Node.js

This is a Node.js client SDK for [pip-services-paymentmethods-node](https://github.com/pip-services/pip-services-paymentmethods-node) microservice.
It provides an easy to use abstraction over communication protocols:

* Direct client
* HTTP client
* Seneca client (see http://www.senecajs.org)
* AWS Lambda client (see https://aws.amazon.com/lambda)

<a name="links"></a> Quick Links:

* [Development Guide](doc/Development.md)
* [API Version 1](doc/NodeClientApiV1.md)

## Install

Add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-paymentmethods-node": "^1.0.*",
        ...
    }
}
```

Then install the dependency using **npm** tool
```bash
# Install new dependencies
npm install

# Update already installed dependencies
npm update
```

## Use

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-paymentmethods-node');
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    connection: {
        protocol: 'http',
        host: 'localhost', 
        port: 8080
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.PaymentsHttpClientV1(config);

// Connect to the microservice
client.open(null, function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Make payment method
var payment_method = {
    id: '2',
    customer_id: '1',
    name: 'Visa *2780',
    type: PaymentMethodTypeV1.CreditCard,
    card: {
        brand: 'VISA',
        ccv: '921',
        expire_month: 4,
        expire_year: 2024,
        first_name: 'Steve',
        last_name: 'Jobs',
        number: '4032037578262780',
        state: CreditCardStateV1.Ok
    }
};

client.createPaymentMethod(
    null,
    paymentMethod,
    function (err, payment_method) {
        // ...
    }
);
```

## Acknowledgements

This client SDK was created and currently maintained by *Sergey Seroukhov*.

