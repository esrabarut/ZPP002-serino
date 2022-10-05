/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"comnttesrabarut/zpp002-serino/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
