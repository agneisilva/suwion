var application = require("./config/express")();
const port = process.env.PORT || 30000

application.listen(port, function(){
    console.log(`Server listening at http://localhost:${port}`);
});

