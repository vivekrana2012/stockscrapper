/*
  getting required modules.
*/
const express = require('express');
const bodyParser=require('body-parser');
const Joi=require('joi');
const app = express();
/*
  Initializing application port.
*/
const port = 5000;

/*
  Initializing variables to hold registered services, their names and details.
*/
services = {};
serviceNames = [];

/*
  Parsing the request body as json object otherwise decline.
*/
app.use(bodyParser.json());

/*
  Handling post request which registers a service, adds name in serviceNames and details in services.
*/
app.post('/discovery', function(request, response){

  /*
    Validating the request parameters using Joi. If error send status as 400('bad request') else continue.
  */
  const schema = Joi.object().keys({
                    name: Joi.string().required(),
                    mapping: Joi.string().required(),
                    host: Joi.string().required(),
                    port: Joi.number().integer().required()
                  });

  Joi.validate(request.body, schema, (error, value) => {
    if(error){
      response.status(400).send(error['details'][0]['message']);
      return;
    }
    else {
      /*
        Clone the json object in service and check if the name exists in serviceNames.
      */
      let service = Object.assign({}, request.body);
      let index = serviceNames.indexOf(service['name']);

      // Added timestamp
      service['timestamp'] = new Date();

      /*
        If index is -1 add the new object in services and serviceNames. else update the existing one with new timestamp.
      */
      if(index === -1){
        serviceNames.push(service['name']);
        services[service['name']] = service;
        delete service['name'];
        response.send({"status": "Added"});
      }else {
        services[service['name']] = service;
        response.send({"status": "Updated"});
      }
      return;
    }});
});

/*
  Handling get request for the complete url of the service. I think there is no need of validation as in case type or eventName
  is not there it will not be mapped to this request.
*/
app.get('/discovery/api/events/:eventName', function(request, response){
  /*
    Setting required variables. getting index of service, if -1 then service is not available and replying accordingly.
  */
  const mapping = '/api/events/' + request.params.eventName;
  const serviceName = request.params.eventName;
  const index = serviceNames.indexOf(serviceName);

  if(index === -1){
    response.status(502).send({'status': 'Not Available'});
    return;
  }else {
    const service = services[serviceName];
    response.send(service.host+':'+service.port+mapping);
    return;
  }
});

/*
  Every 1000ms iterate in the service records and clear non responding services.
*/
setInterval(() => {
  for(var counter = 0; counter < serviceNames.length; counter++){
    const item = services[serviceNames[counter]];
    if(new Date() - new Date(item['timestamp']) > 1000){
      console.log(serviceNames[counter]+' just went down @ '+new Date());
      delete services[serviceNames[counter]];
      serviceNames.splice(counter, 1);
    }
  }
}, 2000);

/*
  Starting the server on port.
*/
app.listen(port, function(){
  console.log('Discovery server started on port: '+port+' at '+new Date()+' hours.');
});
