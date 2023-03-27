var express = require("express");
const business = require("../business/business");
var app = express();
const cors=require("cors");
const apiServ = {
    start: function(port) {
        app.use(express.json());
        app.use(cors({
            origin: '*'
        }));

        app.get("/test", function(req, res){
            const testObj = {
                test: "test"
            };

            console.log("call done");
            res.json(testObj);
        });

        app.get("/api/customers", function(req, res){

            const number = req.query.number;
            const page = req.query.page;

            // get customers from business layer
            // const customers = business.getAllCustomers();
            const resCustomers = business.getCustomers(number, page);

            // res.json(customers);
            res.json(resCustomers);
        });


        //ajouter un client à l'aide du formulaire 
        app.post("/api/customers", function(req, res){
            const reqAddCustomer={
                email: req.query.email,
                last : req.query.last,
                first : req.query.first,
                company: req.query.company,
                country:req.query.country,
            }
            const formulaire= business.addCustomer(reqAddCustomer)
            res.json(formulaire);

        });

        app.listen(port, function(){
            console.log("Server running on port " + port);
        });
    
    }
}

module.exports = apiServ;