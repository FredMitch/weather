//***********************************************************************************************
//
// Retrieve latest weather observation from wunderground.com and write to SQLite
// -----------------------------------------------------------------------------
//
// wunderground.com API's for Personal Weather Station contributors:
// https://docs.google.com/document/d/1eKCnKXI9xnoMGRRzOL1xPCBihNV2rOet08qpE_gArAY/edit
//
//***********************************************************************************************

"use strict";
const https = require("https");
const sqlite3 = require('sqlite3').verbose();

// Defin data fields
var data = "";
var jsondata = "";

// Setup query values
var wStationId = "IALSTO9";
var wFormat = "json";
var wUnits = "m";
var wApiKey = "a296b34180fe47c596b34180fe87c582";
var wPrecision = "decimal";

// Setup URL and query string
var myURL =
  "https://api.weather.com" +
  "/v2/pws/observations/current" +
  "?stationId=" + wStationId +
  "&format=" + wFormat +
  "&units=" + wUnits +
  "&apiKey=" + wApiKey +
  "&numericPrecision=" + wPrecision;

// Connect to SQLite database  
let db = new sqlite3.Database('weather.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        // Failed to connect to weather database
        // console.log(err.message);
    } else{
    
      // Execute HTTP get
      https.get(myURL, function (res) {

      // Write to log
      db.run(`insert into log values(?, ?, ? , ?)`, [new Date(), myURL, res.statusCode, res.statusMessage]), function(err) {
        if (err) {
          // Failed to write http.get response to log
          // console.log(err.message);
      }}

      // If HTTP get succesfull
      if (res.statusCode == 200) {
      
        // Accumulate data received
        res.on("data", function (stream) {
          data += stream;
        });

        // All data received
        res.on("end", function () {
  
        // Parse JSON data
        jsondata = JSON.parse(data);
      
        // Write date received to weather database  
        db.run(`insert or ignore into observations values(?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
          [
            jsondata.observations[0].country, 
            jsondata.observations[0].epoch, 
            jsondata.observations[0].humidity, 
            jsondata.observations[0].lat, 
            jsondata.observations[0].lon,
            jsondata.observations[0].neighborhood, 
            jsondata.observations[0].obsTimeLocal, 
            jsondata.observations[0].obsTimeUtc, 
            jsondata.observations[0].qcStatus, 
            jsondata.observations[0].realTimeFrequency,
            jsondata.observations[0].softwareType, 
            jsondata.observations[0].solarRadiation, 
            jsondata.observations[0].stationID, 
            jsondata.observations[0].uv, 
            jsondata.observations[0].winddir, 
            jsondata.observations[0].metric.dewpt, 
            jsondata.observations[0].metric.elev, 
            jsondata.observations[0].metric.heatIndex, 
            jsondata.observations[0].metric.precipRate, 
            jsondata.observations[0].metric.precipTotal,
            jsondata.observations[0].metric.pressure, 
            jsondata.observations[0].metric.temp, 
            jsondata.observations[0].metric.windChill, 
            jsondata.observations[0].metric.windGust, 
            jsondata.observations[0].metric.windSpeed
          ]
          ), function(err) {
          if (err) {
          // Write error to log
          //  console.log('** Error 1');
          //  console.log(err.message);
          }}}
        );}
      });

  // Close the SQLite database
  //db.close((err) => {
  //    if (err) {
  //        console.error(err.message);
  //    }
  //    console.log('Closed the weather database');
  //})

    }
  });