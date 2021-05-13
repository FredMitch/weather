# Get latest weather from wunderground.com

I have a personal weather station which sends data to wunderground.com, but I wanted to be able to analyse this data myself.  As there is no way to get this data directly, I wrote this app to retrieve the data from wunderground.com.

The script file "weather.js" uses HTTPS get and the wunderground.com API to retrive he latest weather data and write this to an SQLite database.  In addition, the script file "weather2.js" shows how this can be done using the wunderground package for node rather than HTTP get.

I have another project on GitHub called "Get-Temp" which shows how the same API call to wunderground.com can be called from an IBMi (aka iSeries or AS400).

This app was developed on Windows 10 and will run on any platform that supports node and sqlite.  I now run this on my RaspberryPi and have it scheduled to run every 15 minutes however, these are the steps I went through to get it to run on the RaspberryPi:

* Installed latest version of node and sqlite.
* Created directory "projects/weather" in my home directory.
* Changed to the project directory "cd /home/pi/projects/weather".
* Added files "weather.js" and "Create_DB.sql" using SSH/SFTP.
* Created database "weather.db" and created the tables.
    * "sqlite3 weather.db"
    * ".read Create_DB.sql"
* Changed "weather.js" to specify the full path to "weather.db".
    * "/home/pi/projects/weather/weather.db"
* Created the script file "weather.sh" to run the app with the full paths for node and the app:
    * "/usr/local/bin/node /home/pi/projects/weather/weather.js"
* Set permissions on "weather.js" and "weather.sh" to 744 to allow execution:
    * "chmod 744 weather.sh"
    * "chmod 744 weather.js"
* Used "crontab -e" and added the following statement to run the job every 15 minutes, every day of the year:
    * "*/15 * * * * /home/pi/projects/weather/weather.sh >> /home/pi/projects/weather/weather.log 2>&1 &"

When the cron job runs, all output from either "console.log" or "console.error" is redirected to the file "weather.log" in the project directory.

The next step is to change the DB to MySql or SQL Server running on my Windows server and to create a web page to display this information.

I have another project on GitHub called Get-Temp which shows how the same API call to wunderground.com can be called from an IBMi (aka iSeries or AS400).
