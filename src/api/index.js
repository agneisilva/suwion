var application = require("./config/express")();
const port = process.env.PORT || 3000

application.listen(port, function(){
    console.log(`Server listening at http://localhost:${port}`);
});

