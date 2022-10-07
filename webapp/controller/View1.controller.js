sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/core/UIComponent",
	"com/ntt/esrabarut/zpp002serino/controller/BaseController"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller,
		JSONModel,
		MessageToast,
		MessageBox,
		UIComponent,
		BaseController
		) {
		"use strict";

		return Controller.extend("com.ntt.esrabarut.zpp002serino.controller.View1", {

			onInit: function () {
				let oView = this.getView();
				let oServiceModel = this.getOwnerComponent().getModel();
				let oViewModel = this.getOwnerComponent().getModel("QRmodel");  //tırnak içine manifestte tanımladığın json dosyasının adı yazılır. 
				//barkod işlemleri//
				// let prefixId = this.createId("_test");
				// if (prefixId) {
				// 	prefixId = prefixId.split("--")[0] + "--";
				// } else {
				// 	prefixId = "";
				// }
				// oScanResultText1 = sap.ui.getCore().byId(prefixId + 'text1');    //1. BARKODUN PREFİX IDSİ
				// oScanResultText2 = sap.ui.getCore().byId(prefixId + 'text2');    //2. BARKODUN PREFİX IDSİ
			},
			onScanSuccess: function (oEvent) {       //2 PARAMETRE GÖNDERİLECEK.   $EVENT, BB1  İF ELSE
				var oView = this.getView();
				var oServiceModel = this.getOwnerComponent().getModel();
				var oViewModel = this.getOwnerComponent().getModel("QRmodel");

				if (oEvent.getParameter("cancelled")) {  //CANCELED OLURSA
					MessageToast.show("Scan cancelled", { duration: 1000 });
				} else {
					if (oEvent.getParameter("text")) {       //okunan an                    
						oView.byId("text1").setText(oEvent.getParameter("text"));    //taranan barcode değeri inputa yerleşiyor.
						oView.byId("input1").setValue(oEvent.getParameter("text"));
						//oViewModel.setProperty("QR1", oScanResultText1);
					} else {
						oScanResultText1.setText('');
						oScanResultText2.setText('');
					}
				}

			},
			onScanSuccess2: function (oEvent) {       
				var oView = this.getView();
				var oServiceModel = this.getOwnerComponent().getModel();
				var oViewModel = this.getOwnerComponent().getModel("QRmodel");
				if (oEvent.getParameter("cancelled")) {  
					MessageToast.show("Scan cancelled", { duration: 1000 });
				} else {
					if (oEvent.getParameter("text")) {   
						this.getView().byId("text2").setText(oEvent.getParameter("text"));  
						this.getView().byId("input2").setValue(oEvent.getParameter("text"));
						//oViewModel.setProperty("QR2", oScanResultText2);
					} else {
						oScanResultText.setText('');
					}
				}
			},
			onScanError: function (oEvent) {
				MessageToast.show("Scan failed: " + oEvent, { duration: 1000 });
			},
			onScanLiveupdate: function (oEvent) {
				// User can implement the validation about inputting value
			},
			onAfterRendering: function (oEvent) {   //2 PARAMETRE GÖNDERİLECEK.   $EVENT, BB1  İF ELSE
				// Reset the scan result
				var oScanButton1 = sap.ui.getCore().byId(prefixId + 'sampleBarcodeScannerButton1');  //ndc id
				var oScanButton2 = sap.ui.getCore().byId(prefixId + 'sampleBarcodeScannerButton2');  //ndc id
				if (oScanButton1) {
					$(oScanButton1.getDomRef()).on("click", function () {
						oScanResultText1.setText('');
					});
				} else if (oScanButton2) {
					$(oScanButton2.getDomRef()).on("click", function () {
						oScanResultText2.setText('');
					});
				}
			},
			onPressSend: function (oEvent) {
				//create işlemi
				//sonucunda mesaj dönüyorsa yakala.

				
				var oServiceModel = this.getOwnerComponent().getModel();   //burası getview.getmodel olabilir. (DENE)
	var oData = {};
				oData.IvBarkod1 = this.getView().byId("input1").getValue();
				oData.IvBarkod2 = this.getView().byId("input2").getValue();
				oServiceModel.create("/SeriNoSet", oData, {
					async: true,
					success: function (oData) {
						let exportmessage = oServiceModel.getProperty("/EvMessage");
						sap.m.MessageBox.success(exportmessage);         //servisten gelen mesaj basılır. Servisten gelen mesajı bir değişkende tutuyoruz, çünkü ekrana basacağız.
					}.bind(this),
					error: function (e) {
						sap.m.MessageBox.error("BARKOD SERVISE ULAŞMADI.");
						sap.ui.core.BusyIndicator.hide();
					}
				});

				this._clearScreen(); //temizliyorum.
			},
			_clearScreen: function () {
				//modeli boşalt
				that.getView().getModel("oViewModel").clear();      //doldurduğumuz json ımızı temizledik.
				that.getView().getModel("oViewModel").refresh();	//doldurduğumuz json ımızı temizledik.
			}

			
		});
	});