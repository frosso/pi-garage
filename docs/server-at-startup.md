# Start the server on startup

* Create a new file for `systemctl`: `sudo vi /etc/systemd/system/pi-garage.service`
* Add the following information:

```
[Unit]
Description=Pi-Garage service

[Service]
# Change it to wherever your npm is located. You can find its location by running `which npm`
ExecStart=/usr/local/bin/npm start
# Wherever you installed this software
WorkingDirectory=/home/pi/pi-garage
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=pi-garage
User=pi

[Install]
WantedBy=multi-user.target
```
* `sudo systemctl enable pi-garage.service`
* `sudo systemctl start pi-garage`
