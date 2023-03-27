const dal = require("../data/datalayer");

//const _ = require("underscore"); 
 
const defaultNumber = 10;
const defaultPage = 1;
const maxNumber = 100;

const business = {
    getAllCustomers : function() {
        return dal.getAllCustomers();
    },

    getCustomers : function(number, page) {
      
        if(number === undefined || page === undefined){
            number = defaultNumber;
            page = defaultPage;
        }
        if(number > maxNumber){
            number = maxNumber;
        }

        //recupérer données de la DAL
        const resCustomers = dal.getCustomers(number, page);

        resCustomers.page = page;
        resCustomers.numberByPage = number;
        resCustomers.totalPages = Math.ceil(resCustomers.total / number);

      
        return resCustomers;
    },
   
    //ajouté un client à la base de données 
    addCustomer: function(last, email, first, company, country) 
    {
        return dal.addCustomer(last, email, first, company, country);
    }
    


};

module.exports = business;


