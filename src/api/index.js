var application = require("./config/express")();
const port = process.env.PORT || 3100

application.listen(port, function(){
    console.log(`Server listening at http://localhost:${port}`);
});

