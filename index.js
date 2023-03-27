const apiServ = require("./presentation/apiPres");
const port = 3001;

function main(){

    //Starts api server
    apiServ.start(port);

    //start console ul
    // apiServ.start();
}


main();