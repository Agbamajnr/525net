const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

//mongoose connection
const dbURI = 'mongodb+srv://agbamajnr:brainbox@learn-node.tv0ge.mongodb.net/525?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
   .then(result => {
    console.log('logged');
   })
   .catch((err) => console.log(err));
   

app.use('/api/network', apiRoutes);

app.listen(process.env.PORT || 3000), () => {
    console.log('app listening on port');
}













/*

const {exec} = require('child_process');

exec('ping 192.168.5.1', (error, stdout, stderr) => {
    if(error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if(stderr) {
        console.log(`stderr: ${stderr.message}`);
        return;
    }
    if(stdout == "request timed out") {
        console.log('working on it')
    }
    console.log('nothing happen')
});
*/
