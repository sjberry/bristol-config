'use strict';

var Bristol = require('bristol').Bristol;


function configure(config) {
	var i, inst, item, logger, mod, severity, target;

	config = config || {};

	severity = config.severity || 'debug';
	logger = new Bristol();

	if (config.hasOwnProperty('targets')) {
		for (i = 0; i < config.targets.length; i++) {
			item = config.targets[i];

			if (typeof item.type === 'string') {
				target = logger.addTarget(item.type);
			}
			else {
				if (item.type.hasOwnProperty('module')) {
					mod = require(item.type.module);
					inst = (item.type.constructor !== false) ? new mod(item.type.options) : mod;
					target = logger.addTarget(inst);
				}
				else {
					target = logger.addTarget(item.type.name, item.type.options);
				}
			}

			if (typeof item.formatter === 'string') {
				target.withFormatter(item.formatter);
			}
			else {
				if (item.formatter.hasOwnProperty('module')) {
					mod = require(item.formatter.module);
					inst = (item.formatter.constructor !== false) ? new mod(item.formatter.options) : mod;
					target.withFormatter(inst);
				}
				else {
					target.withFormatter(item.formatter.name, item.formatter.options);
				}
			}

			target.withLowestSeverity(item.severity || severity);
		}
	}

	return logger;
}


module.exports = configure;
