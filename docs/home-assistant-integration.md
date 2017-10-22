# Home Assistant Integration

For my house I've been using Hass.io on my Raspberry PI 3. You can follow the instructions on how to install Home Assistant on a Raspberry PI at this address: https://home-assistant.io/hassio/installation/

## Detecting the status of one door - Configuring the sensor

If you have access to read the status of your door, you can add the following to your `configuration.yml` file of your home assistant

```
binary_sensor:
  - platform: command_line
    name: Garage door
    device_class: opening
    command: python3 -c "import requests; print(requests.get('http://<address-of-your-pi-garage-installation>/api/door/<door-id>').text)"
    scan_interval: 5
    payload_on: 1
    payload_off: 0
    value_template: '{{ value_json.data.status }}'
```

Where:
* `<address-of-your-pi-garage-installation>` is the IP address of the raspberry PI where you're running your pi-garage
* `<door-id>` is the `id` property you configured for the door in the file in the `/config` directory. You can also see a list of available doors by opening your browser at `http://<address-of-your-pi-garage-installation>/api/door`

## Opening / Closing one door

If you have the ability to control one of your doors, you can add the following to your `configuration.yml` file of your home assistant

```
switch:
  - platform: rest
    resource: http://<address-of-your-pi-garage-installation>/api/door/<door-id>
    name: Garage rest toggle
    method: post
    body_on: '{"_method": "patch"}'
    body_off: '{"_method": "patch"}'
    hidden: true
  - platform: template
    switches:
      garage_door:
        friendly_name: Garage door
        value_template: "{{ is_state('binary_sensor.garage_door', 'on') }}"
        turn_on:
          service: switch.toggle
          data:
            entity_id: switch.garage_rest_toggle
        turn_off:
          service: switch.toggle
          data:
            entity_id: switch.garage_rest_toggle
        icon_template: >-
          {% if is_state('binary_sensor.garage_door', 'on') %}
            mdi:garage-open
          {% else %}
            mdi:garage
          {% endif %}
```

This will create a switch component with the name of "Garage door" in your home assistant dashboard.

Please be aware that by the time the door closes/opens, the status of the switch might be temporarily incorrect. The delay is due to the fact that Home Assistant needs to pull the status of the door via the `binary_sensor`, which takes some time.
