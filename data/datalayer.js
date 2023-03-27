const fs = require("fs");
// const proc = require("process");

// require("dotenv").config();
const filename = "./data/customers.json";

let datalayer = {
    getAllCustomers: function () {
        //read json file
        const data = fs.readFileSync(filename);

        //parse to object
        const customers = JSON.parse(data);

        //return customers
        return customers;
    },

    //addCustomers=
    getCustomers: function (number, page) {
        {


            //read json file
            let rawdata = fs.readFileSync(filename);

            //parse to object
            let customers = JSON.parse(rawdata);

            const total = customers.length;

            //filter by number and page
            if (number && page) {
                customers = customers.slice((page - 1) * number, page*number);
            }

            const result = {
                total: total,
                result: customers
            };

            return result;

        }
    },

    addCustomer: function(last, email, first,company,country) {
        // read existing customer data
        const data = fs.readFileSync(filename);
        const customers = JSON.parse(data);
    
        // create new customer object
        const newCustomer = {
            name: last,
            email: email,
            first: first,
            country:country,
            company:company
        };
    
        // add new customer to array
        customers.push(newCustomer);
    
        // save updated customer data to file
        const customerContent = JSON.stringify(customers);
        fs.writeFileSync(filename, customerContent);
    
        return newCustomer;
    },
    
}

module.exports = datalayer;