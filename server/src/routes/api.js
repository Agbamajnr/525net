const exec = require('child_process').exec;
var fs = require('fs');
const router = require('express').Router();
const os = require('os');
const Ip = require('../models/Ip');
var ping = require('ping');
const bodyParser = require('body-parser');
const express = require('express')

router.get('/', (req, res) => {
  Ip.find()
    .then(data => {
      res.send(data)
    })
    .catch(err => console.log(err))
})

router.post('/bare', (req, res) => {
  var ip = req.body.ip;

  var host = ip;
  console.log(host)

  const getTime = /time/;
  //bare pinging
  function puts(error, stdout, stderr) {
    if (error) {
      console.log(error);

    }
    if (stderr) {
      console.log(stderr)
    }
    if (stdout) {
      console.log(stdout);
      
    }
  }
  exec(`ping -c 1 ${host}`, puts);
})


router.post('/',(req, res) => {
    const ip = req.body.ip;

    var host = ip;


      ping.promise.probe(host)
          .then(function (response) {
              if (response.time < 400 & response.alive === true) {
                res.send(true)
              } else if(response.time > 400) {
                res.send('unstable')
              } else if(response.alive !== true) {
                res.send(false)
              } 

  });



  

  /*
        ping.sys.probe(host, function(isAlive){

            let dt = new Date();
            var pingId = dt.getMonth() + '//' + dt.getDate() + '//' + dt.getFullYear();
            var msg = isAlive ?   host + ': This server is up and running---Success' : host + ': This server is down or invalid---Failed' ;

            //const path = './logs/logs.txt';

              /*
            if(fs.existsSync(path)) {
                fs.appendFileSync(path, pingId + "---------" + msg  + os.EOL + os.EOL, 'utf-8', function(err, data){
                    if(err) {
                        console.log(err)
                    } else {
                        id= pingId;
                    }
                });
            } else {
                fs.writeFileSync(path, msg + "/r/n",  'utf-8', function(err, data){
                    if (err) {
                        console.log(err)
                    } else {
                        id= pingId;
                    }
                })
            }


            res.send(msg);

        });
        */


});

router.post('/save', (req, res) => {

  const ip = new Ip(req.body);

  ip.save()
    .then((response) => {
      res.send(response)
    })
    .catch((err) => {
      res.send(err)
    })
})

router.delete('/delete/:id', async (req, res) => {
  const id = await req.params.id;
  
  try {
    const response = await Ip.findByIdAndDelete(id);
    res.send(response)
  } catch (error) {
    res.send('error deleting ip');
  }

  

})

router.get('/logs', (req, res) => {
   fs.readFile('./logs/logs.txt', 'utf-8', (err, data) => {
     if (err) {
       console.log(err);
     } else {
       res.send(data)
     }
   });


})

router.delete('/logs/del', (req, res) => {
  if (fs.existsSync('./logs/logs.txt')) {
    fs.unlink('./logs/logs.txt', (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.send('Logs Deleted')
      }
    });
  } else {
    res.send('There are no logs to delete')
  }
})


module.exports = router;
