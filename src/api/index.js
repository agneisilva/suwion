var application = require("./config/express")();

application.listen(80, function(){
    console.log("Server running.... on port 80");
});

