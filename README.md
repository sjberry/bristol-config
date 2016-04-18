## bristol-config

Adds `node-config` compatibility for [Bristol](https://github.com/TomFrost/Bristol) logging. Not all features from
Bristol are reproduced in the configuration. Currently excluded are:

  * Transforms [link](https://github.com/TomFrost/Bristol#transforming-your-data-types)
  * Global values [link](https://github.com/TomFrost/Bristol#setting-global-log-values)
  * Excluding/including message filters [link](https://github.com/TomFrost/Bristol#restricting-targets-to-certain-types-of-messages)

If you need any of these features implemented, please open an issue, submit a pull request, or get in contact with me.


#### Installation

```
npm install bristol-config
npm install bristol
```

Note that `bristol` 0.3.x is a peer dependency of `bristol-config` and must be installed in your project for
everything to work. If you're using an older version of `npm`, then `bristol` may be installed automatically. Otherwise
you'll receive an `npm` notification indicating that you have a missing peer dependency.


#### Example

Sample `node-config` configuration:

```json
{
  "logging": {
    "severity": "debug",
    "targets": [
      {
        "type": "console"
      },
      {
        "severity": "error",
        "type": {
          "name": "file",
          "options": {
            "file": "/var/log/bitscoop/metric-server.log"
          }
        }
      },
      {
         "severity": "info",
         "type": {
           "module": "my-target-module-constructor",
           "options": {
             "option": "value"
           }
         }
      },
      {
        "type": {
          "module": "my-target-module-function",
          "constructor": false,
          "options": {
            "option": "value"
          }
        }
      }
    ]
}
```

Usage:

```javascript
var bristolConf = require('bristol-config');
var config = require('config'); // Requires node-config to function as indicated.

logger = bristolConf(config.logging);
```
