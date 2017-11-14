# Pi Garage

Just a dumb service that I use to check if my garage door is open or closed.

## Requirements

### Software

* `nodejs`
* `npm`

### Hardware

* Raspberry PI
* Magnetic door sensor

## Installation

* Install `node` and `npm` in your Raspberry PI
* Copy the project on your Raspberry PI
* Run `npm start`
* You will be able to access the service on port `3000` by default (look at `config/default.js` for more options)

## API Endpoints

* GET `/api/status`
    * Description: checks if the API is alive. Returns the current unix timestamp on the server
    * Possible statuses: `200`
    * Returns: JSON
    * Format:
    ``` 
    1 {
    2   "$schema": "http://json-schema.org/draft-04/schema#", 
    3   "definitions": {}, 
    4   "id": "http://example.com/example.json", 
    5   "properties": {
    6     "time": {
    7       "id": "/properties/time", 
    8       "type": "integer"
    9     }
    10   }, 
    11   "type": "object"
    12 }
    ```
* GET `/api/door`
    * Description: returns the list of available doors to query
    * Possible statuses: `200`
    * Returns: JSON
    * Format:
    ``` 
     1 {
     2   "$schema": "http://json-schema.org/draft-04/schema#", 
     3   "definitions": {}, 
     4   "id": "http://example.com/example.json", 
     5   "properties": {
     6     "data": {
     7       "id": "/properties/data", 
     8       "items": {
     9         "id": "/properties/data/items", 
    10         "properties": {
    11           "abilities": {
    12             "id": "/properties/data/items/properties/abilities", 
    13             "properties": {
    14               "read": {
    15                 "id": "/properties/data/items/properties/abilities/properties/read", 
    16                 "type": "boolean"
    17               }, 
    18               "write": {
    19                 "id": "/properties/data/items/properties/abilities/properties/write", 
    20                 "type": "boolean"
    21               }
    22             }, 
    23             "type": "object"
    24           }, 
    25           "id": {
    26             "id": "/properties/data/items/properties/id", 
    27             "type": "string"
    28           }
    29         }, 
    30         "type": "object"
    31       }, 
    32       "type": "array"
    33     }, 
    34     "error": {
    35       "id": "/properties/error", 
    36       "type": "boolean"
    37     }
    38   }, 
    39   "type": "object"
    40 }
    ```
* GET `/api/door/:id`
    * Description: returns details about the door `id` being passed. If the `id` is valid and the door status can be read, returns a `200` response status code. Otherwise returns `404`.
    * Possible statuses: `200`, `404`
    * Returns: JSON
    * Format:
    ``` 
      1 {
      2   "$schema": "http://json-schema.org/draft-04/schema#", 
      3   "definitions": {}, 
      4   "id": "http://example.com/example.json", 
      5   "properties": {
      6     "data": {
      7       "id": "/properties/data", 
      8       "properties": {
      9         "id": {
     10           "id": "/properties/data/properties/id", 
     11           "type": "string"
     12         }, 
     13         "status": {
     14           "id": "/properties/data/properties/status", 
     15           "type": "integer"
     16           "enum": [0, 1]
     17         }
     18       }, 
     19       "type": "object"
     20     }, 
     21     "error": {
     22       "id": "/properties/error", 
     23       "type": "boolean"
     24     }
     25   }, 
     26   "type": "object"
     27 }
    ```
* PATCH `/api/door/:id`
    * Description: opens and closes the door `id` being passed. If the `id` is valid and the door is configured to be opened, returns a `200` response status code. Otherwise returns `404`.
    * Possible statuses: `200`, `404`
    * Returns: JSON
    * Format:
    ``` 
      1 {
      2   "$schema": "http://json-schema.org/draft-04/schema#", 
      3   "definitions": {}, 
      4   "id": "http://example.com/example.json", 
      5   "properties": {
      6     "data": {
      7       "id": "/properties/data", 
      8       "properties": {
      9         "id": {
     10           "id": "/properties/data/properties/id", 
     11           "type": "string"
     12         }, 
     18       }, 
     19       "type": "object"
     20     }, 
     21     "error": {
     22       "id": "/properties/error", 
     23       "type": "boolean"
     24     }
     25   }, 
     26   "type": "object"
     27 }
    ```


## TODOs

* Log of open/closed doors (through database? or just file? don't need anything fancy at the moment, unless the controller is going to handle many doors)
* ~Integration of notification services (e.g. Pushbullet)~ Can be performed with Home Assistant integration
* Integration for Google Assistant (ask for status, ask to control door)
* Android app (in separate project)
* Schematic diagram picture in the documentation
* More detailed installation instructions
