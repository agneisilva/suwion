var application = require("./config/express")();

application.listen(3000, function(){
    console.log("Server running.... on port 3000");
});

