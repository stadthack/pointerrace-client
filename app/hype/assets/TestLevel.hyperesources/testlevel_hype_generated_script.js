//	HYPE.documents["TestLevel"]

(function HYPE_DocumentLoader() {
	var resourcesFolderName = "TestLevel.hyperesources";
	var documentName = "TestLevel";
	var documentLoaderFilename = "testlevel_hype_generated_script.js";
	var mainContainerID = "testlevel_hype_container";

	// find the URL for this script's absolute path and set as the resourceFolderName
	try {
		var scripts = document.getElementsByTagName('script');
		for(var i = 0; i < scripts.length; i++) {
			var scriptSrc = scripts[i].src;
			if(scriptSrc != null && scriptSrc.indexOf(documentLoaderFilename) != -1) {
				resourcesFolderName = scriptSrc.substr(0, scriptSrc.lastIndexOf("/"));
				break;
			}
		}
	} catch(err) {	}

	// Legacy support
	if (typeof window.HYPE_DocumentsToLoad == "undefined") {
		window.HYPE_DocumentsToLoad = new Array();
	}
 
	// load HYPE.js if it hasn't been loaded yet
	if(typeof HYPE_160 == "undefined") {
		if(typeof window.HYPE_160_DocumentsToLoad == "undefined") {
			window.HYPE_160_DocumentsToLoad = new Array();
			window.HYPE_160_DocumentsToLoad.push(HYPE_DocumentLoader);

			var headElement = document.getElementsByTagName('head')[0];
			var scriptElement = document.createElement('script');
			scriptElement.type= 'text/javascript';
			scriptElement.src = resourcesFolderName + '/' + 'HYPE.js?hype_version=160';
			headElement.appendChild(scriptElement);
		} else {
			window.HYPE_160_DocumentsToLoad.push(HYPE_DocumentLoader);
		}
		return;
	}
	
	// handle attempting to load multiple times
	if(HYPE.documents[documentName] != null) {
		var index = 1;
		var originalDocumentName = documentName;
		do {
			documentName = "" + originalDocumentName + "-" + (index++);
		} while(HYPE.documents[documentName] != null);
		
		var allDivs = document.getElementsByTagName("div");
		var foundEligibleContainer = false;
		for(var i = 0; i < allDivs.length; i++) {
			if(allDivs[i].id == mainContainerID && allDivs[i].getAttribute("HYPE_documentName") == null) {
				var index = 1;
				var originalMainContainerID = mainContainerID;
				do {
					mainContainerID = "" + originalMainContainerID + "-" + (index++);
				} while(document.getElementById(mainContainerID) != null);
				
				allDivs[i].id = mainContainerID;
				foundEligibleContainer = true;
				break;
			}
		}
		
		if(foundEligibleContainer == false) {
			return;
		}
	}
	
	var hypeDoc = new HYPE_160();
	
	var attributeTransformerMapping = {b:"i",c:"i",bC:"i",d:"i",aS:"i",M:"i",e:"f",aT:"i",N:"i",f:"d",O:"i",g:"c",aU:"i",P:"i",Q:"i",aV:"i",R:"c",bG:"f",aW:"f",aI:"i",S:"i",bH:"d",l:"d",aX:"i",T:"i",m:"c",bI:"f",aJ:"i",n:"c",aK:"i",bJ:"f",X:"i",aL:"i",A:"c",aZ:"i",Y:"bM",B:"c",bK:"f",bL:"f",C:"c",D:"c",t:"i",E:"i",G:"c",bA:"c",a:"i",bB:"i"};
	
	var resources = {};
	
	var scenes = [{x:0,p:"600px",c:"#FFFFFF",v:{"13":{c:28,d:28,I:"Solid",J:"Solid",K:"Solid",g:"#DDEEFF",L:"Solid",M:1,N:1,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",P:1,k:"div",O:1,z:"7",C:"#A0A0A0",D:"#A0A0A0",a:63,aD:[{type:4,javascriptOid:"14"}],b:117},"3":{c:23,d:190,I:"Solid",r:"inline",J:"Solid",K:"Solid",g:"#DDEEFF",L:"Solid",M:1,N:1,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",k:"div",O:1,P:1,z:"3",C:"#A0A0A0",D:"#A0A0A0",a:173,b:36},"8":{c:28,d:28,I:"Solid",J:"Solid",aG:"hover=>Action",K:"Solid",g:"#BFFD62",L:"Solid",M:1,w:"",N:1,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",k:"div",O:1,P:1,z:"4",C:"#A0A0A0",D:"#A0A0A0",a:127,aD:[{type:4,javascriptOid:"12"}],b:117},"4":{c:343,d:282,I:"Solid",J:"Solid",K:"Solid",g:"#FF3F2C",L:"Solid",M:1,N:1,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",P:1,k:"div",O:1,z:"1",C:"#A0A0A0",D:"#A0A0A0",a:0,aD:[{type:1,transition:1,sceneSymbol:1}],b:0},"9":{c:150,d:42,I:"Solid",J:"Solid",K:"Solid",g:"#DDEEFF",L:"Solid",M:1,N:1,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",P:1,k:"div",O:1,z:"5",C:"#A0A0A0",D:"#A0A0A0",a:198,b:110},"10":{c:28,d:28,I:"Solid",J:"Solid",aG:"over:Action",K:"Solid",g:"#BFFD62",L:"Solid",M:1,N:1,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",k:"div",O:1,P:1,z:"6",C:"#A0A0A0",D:"#A0A0A0",a:214,aD:[{type:4,javascriptOid:"11"}],b:117},"2":{c:177,d:42,I:"Solid",J:"Solid",K:"Solid",g:"#DDEEFF",L:"Solid",M:1,N:1,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",P:1,k:"div",O:1,z:"2",C:"#A0A0A0",D:"#A0A0A0",a:-6,b:110}},n:"Untitled Scene",T:{"7":{d:2.04,i:"7",n:"Action",a:[{f:"2",t:0,d:1.02,i:"b",e:169,s:36,o:"3"},{f:"2",t:1.02,d:1.02,i:"b",e:36,s:169,o:"3"},{f:"2",t:2.04,p:2,d:0,i:"Actions",s:[{type:4,javascriptOid:"11"}],o:"7"}],f:30},kTimelineDefaultIdentifier:{d:0,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[],f:30}},o:"1"},{x:1,p:"600px",c:"#FFFFFF",v:{"6":{aV:8,w:"Game over",a:254,x:"visible",Z:"break-word",y:"preserve",j:"absolute",r:"inline",z:"1",k:"div",b:181,aT:8,aS:8,t:16,aU:8,G:"#000000"}},n:"Untitled Scene 2",T:{kTimelineDefaultIdentifier:{d:0,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[],f:30}},o:"5"}];
	
	var javascripts = [{name:"startTimeline_Action",source:"function(hypeDocument, element, event) {\thypeDocument.startTimelineNamed('Action');\n\t\n}",identifier:"11"},{name:"pauseTimeline_Action",source:"function(hypeDocument, element, event) {\thypeDocument.pauseTimelineNamed(\"Action\");\n}",identifier:"12"},{name:"continueTimeline_Action",source:"function(hypeDocument, element, event) {\thypeDocument.startTimelineNamed('Action');\n\t\n}",identifier:"14"}];
	
	var functions = {};
	var javascriptMapping = {};
	for(var i = 0; i < javascripts.length; i++) {
		try {
			javascriptMapping[javascripts[i].identifier] = javascripts[i].name;
			eval("functions." + javascripts[i].name + " = " + javascripts[i].source);
		} catch (e) {
			hypeDoc.log(e);
			functions[javascripts[i].name] = (function () {});
		}
	}
	
	hypeDoc.setAttributeTransformerMapping(attributeTransformerMapping);
	hypeDoc.setResources(resources);
	hypeDoc.setScenes(scenes);
	hypeDoc.setJavascriptMapping(javascriptMapping);
	hypeDoc.functions = functions;
	hypeDoc.setCurrentSceneIndex(0);
	hypeDoc.setMainContentContainerID(mainContainerID);
	hypeDoc.setResourcesFolderName(resourcesFolderName);
	hypeDoc.setShowHypeBuiltWatermark(0);
	hypeDoc.setShowLoadingPage(false);
	hypeDoc.setDrawSceneBackgrounds(true);
	hypeDoc.setGraphicsAcceleration(true);
	hypeDoc.setDocumentName(documentName);

	HYPE.documents[documentName] = hypeDoc.API;
	document.getElementById(mainContainerID).setAttribute("HYPE_documentName", documentName);

	hypeDoc.documentLoad(this.body);
}());

