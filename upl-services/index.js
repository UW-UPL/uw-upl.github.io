var express = require("express");
var ping = require("ping");
var fs = require("fs");
var exec = require("child_process").exec;
var config = JSON.parse(fs.readFileSync("config.json"));
var refreshTimeMins = 1; 


var group = function (names) {
	this.total = names.length;
	this.online = 0;
	this.machines = names.map(function(name) {
		return { name : name, online : false }
	});

	this.refresh = function () {
		this.online = 0;
		var self = this;
		this.machines.forEach(function(machine) {
			ping.sys.probe(machine.name, function (online){
				machine.online = online;
				self.online++;
			});
		})
	}
}

var data =  { 
	workstations: new group(config.workstations), 
	servers : new group(config.servers)
}


var refresh = function () {
	data.workstations.refresh();
	data.servers.refresh();
}

refresh();
setInterval(refresh, refreshTimeMins * 60 * 1000);


var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/lab-status', function(req, res, next) {
	res.send( JSON.stringify(data, null, 4) );
});

//@TODO change to cam
app.get("/pos/:degree", function (req, res, next) {
	var degrees = Number(req.params.degree);
	var command = "echo \"" + degrees + "\" > /dev/ttyACM0";
	exec(command, function (error) {
		if(error) console.log('exec error: ' + error);
	});
	res.send(degrees);
	next();
})


app.listen(1312);
console.log("Server Listening On Port 1312");
