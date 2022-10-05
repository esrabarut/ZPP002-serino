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

				// let oBarcodeJSONModel = new JSONModel({
				// 	"JsonB1" : "",
				// 	"JsonB2" : "",
				// 	"Msg" : ""

				// });

				//var oComp = this.getOwnerComponent();
				//this. = oComp.getModel("json");


				let prefixId;
				let createId;
				let oScanResultText1;
				let oScanResultText2;
				let oScanResultText = [oScanResultText1, oScanResultText2];

				// let oScanResultTextModel = new JSONModel ({ //BUNU BİR DENE
				// 	oScanResultText1: oScanResultText1,
				// 	oScanResultText2: oScanResultText2

				// });

				prefixId = this.createId(createId);
				if (prefixId) {
					prefixId = prefixId.split("--")[0] + "--";
				} else {
					prefixId = "";
				}
				oScanResultText1 = sap.ui.getCore().byId(prefixId + 'text1');    //1. BARKODUN PREFİX IDSİ
				oScanResultText2 = sap.ui.getCore().byId(prefixId + 'text2');    //2. BARKODUN PREFİX IDSİ



			},


			onScanSuccess: function (oEvent) {       //2 PARAMETRE GÖNDERİLECEK.   $EVENT, BB1  İF ELSE



				if (oEvent.getParameter("cancelled")) {  //CANCELED OLURSA
					MessageToast.show("Scan cancelled", { duration: 1000 });
				} else {        // BARCODE UN OKUTULACAĞI ADIM
					//let barcodeNo = this.getView().byId("");     ******************************************????????????????????????????????????
					//ID İLE ALMANIN BİR YOLUNU BUL 
					/*
					 oText1 = this.getView().byId("text1");
					 oInput1 = this.getView().byId("input1");
					 oText2 = this.getView().byId("text2");
					 oInput2 = this.getView().byId("input2");
					let oText1, oInput1, oText2, oInput2;
					let BB1 = this.byId("BB1");  //bunu yapmazsam ifin içine girmiyor id yi almıyor.
					let BB2 = this.byId("BB2");  //bunu yapmazsam ifin içine girmiyor id yi almıyor./* 
					if(barcodeNo === BB1){         //1. BARKOD başarıyla tıklanmışsa   YA DA =========================  (oEvent.getParameter("text") && barcodeNo===BB1)
						this.getView().getModel("oBarcodeJSONModel").setProperty("/JsonB1", oScanResultText1); 
						oText1.setText(oEvent.getParameter("text"));  //ATAMA ANI  TEXTE (INVISIBLE)
						oInput1.setValue(oEvent.getParameter("text"));  //ATAMA ANI INPUT VALUE SU 
					}
					else if(barcodeNo === BB2 ){   //2. BARKOD başarıyla tıklanmışsa
						this.getView().getModel("oBarcodeJSONModel").setProperty("/JsonB2", oScanResultText2); 
						oText2.setText(oEvent.getParameter("text"));  //ATAMA ANI  TEXTE (INVISIBLE)
						oInput2.setValue(oEvent.getParameter("text"));  //ATAMA ANI INPUT VALUE SU 
					} 
				    
					else {
						oScanResultText[0].setText('');  //boşla
						oScanResultText[1].setText('');  //boşla
						console.log("bb1 de bb2 de taranmadı başka bir şey gelme durumu oldu");
					}
					*/

					/////////////////////////////////barkodun okutulacağı adım.
					if (oEvent.getParameter("text")) {   //okunan an
						this.getView().byId("text1").setText(oEvent.getParameter("text"));  //atama anı
						this.getView().byId("input1").setValue(oEvent.getParameter("text"));
						//this.getView().getModel("oBarcodeJSONModel").setProperty("/JsonB1", oScanResultText1);

					} else {
						oScanResultText.setText('');
					}

					/////////////////////////////////////////////


				}

			},
			onScanSuccess2: function (oEvent) {       //2 PARAMETRE GÖNDERİLECEK.   $EVENT, BB1  İF ELSE
				if (oEvent.getParameter("cancelled")) {  //CANCELED OLURSA
					MessageToast.show("Scan cancelled", { duration: 1000 });
				} else {
					/////////////////////////////////barkodun okutulacağı adım.
					if (oEvent.getParameter("text")) {   //okunan an
						this.getView().byId("text2").setText(oEvent.getParameter("text"));  //atama anı
						this.getView().byId("input2").setValue(oEvent.getParameter("text"));
						//this.getView().getModel("oBarcodeJSONModel").setProperty("/JsonB2", oScanResultText2);
					} else {
						oScanResultText.setText('');
					}
				}
			},

			onScanError: function (oEvent) {
				MessageToast.show("Scan failed: " + oEvent, { duration: 1000 });
			},
			onScanError2: function (oEvent) {
				MessageToast.show("Scan failed: " + oEvent, { duration: 1000 });
			},

			onScanLiveupdate: function (oEvent) {
				// User can implement the validation about inputting value
			},
			onScanLiveupdate2: function (oEvent) {
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

				//this.getView().setModel(oBarcodeJSONModel, "");  //servisle haberleşiyor.
				//create işlemi
				//sonucunda mesaj dönüyorsa yakala.

				let InputBebek = this.getView().byId("input1").getValue();  //xml value
				let InputBebek2 = this.getView().byId("input2").getValue();  //xmlvalue
				let oBModel = this.getView().getModel("json");   
				this.getView().getModel("json").setProperty("/bebek", InputBebek);
				this.getView().getModel("json").setProperty("/bebek2", InputBebek2);

				//let InputB1 = this.getView().getModel("oBarcodeJSONModel").setProperty("/IvBarkod1");
				//let InputB2 = this.getView().getModel("oBarcodeJSONModel").setProperty("/IvBarkod2");
				//var oScanned = oEvent.getParameter("text"); //burda bir sıkıntı var, input value larını almam lazım.
				var aData = this.getView().getModel("json").getProperty("/");
				let oServiceBind = {
					IvBarkod1: aData.bebek,
					IvBarkod2: aData.bebek2 

				};
				

				this.getView().getModel().create("/SeriNoSet", oServiceBind ,{
					async: true,
					success: function (oData) {
						// oBModel.setProperty("/bebek", oData.IvBarkod1);
						// oBModel.setProperty("/bebek2", oData.IvBarkod2);
						
						let mesaj = this.getView().getModel().getProperty("/EvMessage");    //Buraya JSON modelimin msg elementi de olurdu ancak nasıl atayacağımı bilemedim.
						sap.m.MessageBox.success(mesaj);
						// console.log(mesaj);
						// console.log(oBarcodeJSONModel > JsonB1);
						// console.log(oBarcodeJSONModel > JsonB2);
						// console.log(JsonB1);
						// console.log(JsonB2);
						//this.oBarcodeJSONModel.refresh();
					}.bind(this),
					error: function (e) {
						sap.m.MessageBox.error("BARKOD SERVISE ULAŞMADI.");
						sap.ui.core.BusyIndicator.hide();
					}
				});
				this._clearScreen();
			},
			_clearScreen: function () {
				//modeli boşalt
				that.getView().getModel("oBarcodeJSONModel").clear();
				that.getView().getModel("oBarcodeJSONModel").refresh();
			},

			onCreate: function (sSet, oData, oModel) {
				return new Promise(function (fnSuccess, fnReject) {
					const mParameters = {
						success: fnSuccess,
						error: fnReject
					};
					oModel.create(sSet, oData, mParameters);
				});
			}
			// // Reset the scan result
			// //var oScanButton = sap.ui.getCore().byId(prefixId + 'BB1');  //ndc id


			// if(barcodeNo == 'BB1'){
			// 	let oScanButton1 = sap.ui.getCore().byId(prefixId + 'BB1');  //text1 de olabilir
			// 	if (oScanButton1) {
			// 		$(oScanButton1.getDomRef()).on("click", function () {
			// 			oScanResultText1.setText('');
			// 		});
			// 	}
			// }
			// else if(barcodeNo == 'BB2'){
			// 	let oScanButton2 = sap.ui.getCore().byId(prefixId + 'BB2');  //text2 de olabilir.
			// 	if (oScanButton2) {
			// 		$(oScanButton2.getDomRef()).on("click", function () {
			// 			oScanResultText2.setText('');
			// 		});
			// 	}
			// }


			/*     onAfterRendering2: function() {
					var oScanButton = sap.ui.getCore().byId(prefixId + 'sampleBarcodeScannerButton2');  //ndc id
					if (oScanButton) {
						$(oScanButton.getDomRef()).on("click", function(){
							oScanResultText2.setText('');
						});
					}
			    
				} */


		});
	});
