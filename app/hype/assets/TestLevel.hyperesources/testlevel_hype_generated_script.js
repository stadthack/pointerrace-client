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
	
	var scenes = [{x:0,p:"600px",c:"#FFFFFF",v:{"170":{c:14,d:50,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"186",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"1",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:75,aL:0,b:100},"186":{k:"div",x:"visible",c:89,aD:[{type:4,javascriptOid:"205"}],aG:"lvl001",d:100,z:"4",a:93,j:"absolute",b:315},"194":{c:1280,d:720,I:"None",J:"None",K:"None",g:"#000000",L:"None",M:0,N:0,A:"#A0A0A0",x:"visible",j:"absolute",B:"#A0A0A0",P:0,k:"div",O:0,z:"1",C:"#A0A0A0",D:"#A0A0A0",a:0,b:0},"177":{c:91,d:100,I:"None",r:"inline",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"186",aI:30,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"3",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:30,a:-16,b:0},"195":{aV:8,w:"MOVE TO STARTING POINT.",a:438,x:"visible",Z:"break-word",y:"preserve",j:"absolute",r:"inline",z:"5",k:"div",b:338,aT:8,aS:8,t:32,aU:8,G:"#FFFFFF",v:"bold"},"174":{c:14,d:50,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"186",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"2",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:75,aL:0,b:-50}},n:"lvl001_warmup",T:{kTimelineDefaultIdentifier:{d:5.2,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[{f:"2",t:5.19,d:0.01,i:"b",e:0,s:-50,o:"174"},{f:"2",t:5.19,d:0.01,i:"b",e:50,s:100,o:"170"}],f:30}},o:"193"},{x:1,p:"600px",c:"#FFFFFF",v:{"136":{k:"div",x:"visible",c:343,d:184,z:"24",a:477,j:"absolute",b:273},"128":{c:14,d:50,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"168",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"1",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:75,aL:0,b:100},"149":{c:74,d:226,I:"None",J:"None",f:"5deg",K:"None",g:"#6B1A13",L:"None",M:0,aY:"0",bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"11",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:874,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:275},"140":{c:100,d:266,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"3",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:263,aL:0,b:0},"145":{c:34,d:100,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"8",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:770,aL:0,b:443},"129":{c:14,d:50,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"168",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"2",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:75,aL:0,b:-50},"141":{c:84,d:98,I:"None",J:"None",K:"None",g:"#6B1A13",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"4",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:251,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:134},"133":{aU:8,bB:2,c:252,G:"#FFFFFF",aV:8,r:"inline",d:84,bC:0,t:90,Z:"break-word",v:"bold",w:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">5</div></div>",bF:"136",j:"absolute",x:"visible",aZ:6,k:"div",y:"preserve",z:"1",aS:8,aT:8,a:38,bA:"#000000",F:"center",b:31},"125":{c:91,d:100,I:"None",r:"inline",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"168",aI:30,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"3",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:30,a:-16,b:0},"146":{c:204,d:447,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"9",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:804,aL:0,b:96},"138":{c:152,d:250,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"2",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:124,aL:0,b:232},"202":{c:89,d:35,I:"None",J:"None",K:"None",g:"#6B1A13",L:"None",M:0,bF:"204",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"1",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:0,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:0},"150":{c:74,d:268,I:"None",J:"None",f:"-5deg",K:"None",g:"#6B1A13",L:"None",M:0,aY:"0",bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"12",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:992,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:275},"142":{c:84,d:80,I:"None",J:"None",K:"None",g:"#6B1A13",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"5",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:285,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:27},"134":{c:341,d:182,I:"Solid",e:"0.300000",J:"Solid",K:"Solid",g:"#000000",L:"Solid",M:1,bF:"136",aI:20,A:"#565656",x:"visible",j:"absolute",k:"div",N:1,O:1,B:"#565656",z:"2",P:1,D:"#565656",C:"#565656",aK:20,aJ:20,a:0,aL:20,b:0},"126":{c:100,d:100,I:"None",J:"None",K:"None",g:"#FFFFFF",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"1",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:24,aL:0,b:232},"155":{k:"div",x:"visible",c:1042,d:543,z:"8",r:"inline",a:158,j:"absolute",b:83},"147":{c:138,d:424,I:"None",J:"None",K:"None",g:"#6B1A13",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"10",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:800,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:80},"203":{c:89,d:35,I:"None",J:"None",K:"None",g:"#6B1A13",L:"None",M:0,w:"",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",bF:"204",k:"div",N:0,O:0,z:"2",B:"#A0A0A0",D:"#A0A0A0",P:0,C:"#A0A0A0",aK:0,aJ:0,a:115,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:0},"168":{k:"div",x:"visible",c:89,d:100,z:"3",a:93,j:"absolute",b:315},"151":{c:74,d:226,I:"None",J:"None",f:"5deg",K:"None",g:"#6B1A13",L:"None",M:0,aY:"0",bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"13",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:874,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:275},"143":{c:84,d:226,I:"None",J:"None",K:"None",g:"#6B1A13",L:"None",M:0,bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"6",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:158,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:222},"127":{c:1280,d:725,I:"None",J:"None",aG:"game_over",K:"None",g:"#6B1A13",L:"None",M:0,w:"",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"1",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:0,aL:0,aD:[{type:4,javascriptOid:"206"}],b:0},"148":{c:130,d:130,I:"None",J:"None",aG:"finish",K:"None",g:"#FFFFFF",L:"None",M:0,N:0,aI:20,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",O:0,B:"#A0A0A0",P:0,z:"23",C:"#A0A0A0",D:"#A0A0A0",aK:20,aJ:20,a:1068,aL:20,aD:[{type:4,javascriptOid:"206"}],b:58},"204":{k:"div",x:"visible",c:204,d:35,z:"25",a:849,j:"absolute",bF:"155",b:105},"152":{c:74,d:268,I:"None",J:"None",f:"-5deg",K:"None",g:"#6B1A13",L:"None",M:0,aY:"0",bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"14",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:992,aL:0,aD:[{type:1,transition:1,sceneOid:"130"}],b:275},"144":{c:629,d:27,I:"None",J:"None",f:"45deg",K:"None",g:"#FFFFFF",L:"None",M:0,aY:"0",bF:"155",aI:0,A:"#A0A0A0",x:"visible",j:"absolute",k:"div",N:0,O:0,B:"#A0A0A0",z:"7",P:0,D:"#A0A0A0",C:"#A0A0A0",aK:0,aJ:0,a:260,aL:0,b:218}},n:"lvl001",T:{kTimelineDefaultIdentifier:{d:13.25,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[{f:"2",t:0,d:1,i:"w",e:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">4</div></div>",s:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">5</div></div>",o:"133"},{f:"2",t:1,d:1,i:"w",e:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">3</div></div>",s:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">4</div></div>",o:"133"},{f:"2",t:2,d:1,i:"w",e:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">2</div></div>",s:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">3</div></div>",o:"133"},{f:"2",t:3,d:1,i:"w",e:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">1</div></div>",s:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">2</div></div>",o:"133"},{f:"2",t:4,d:1,i:"w",e:"GO",s:"<div class=\"HYPE_InnerHTML_Div\" contenteditable=\"true\" style=\"width: 252px; height: 84px; outline-style: none; outline-width: initial; outline-color: initial; display: inline !important; \"><div style=\"display: inline !important; \">1</div></div>",o:"133"},{f:"2",t:5,d:0.06,i:"w",e:"<br>",s:"GO",o:"133"},{f:"2",t:5.05,d:0.01,i:"e",e:"0.000000",s:"0.300000",o:"134"},{f:"2",t:5.19,d:0.01,i:"b",e:0,s:-50,o:"129"},{f:"2",t:5.19,d:0.01,i:"b",e:50,s:100,o:"128"},{f:"2",t:13,d:0.12,i:"a",e:893,s:849,o:"204"},{f:"2",t:13.12,d:0.13,i:"a",e:849,s:893,o:"204"},{f:"2",t:13.25,p:2,d:0,i:"Actions",s:[{timelineIdentifier:"kTimelineDefaultIdentifier",type:9,goToTime:13}],o:"kTimelineDefaultIdentifier"}],f:30}},o:"122"},{x:2,p:"600px",c:"#FFFFFF",v:{"131":{aV:8,w:"You're out!",a:441,x:"visible",Z:"break-word",y:"preserve",j:"absolute",r:"inline",z:"1",k:"div",b:229,aT:8,aS:8,t:80,aU:8,G:"#000000",v:"bold"},"156":{b:508,z:"3",K:"Solid",c:90,L:"Solid",d:15,aS:6,M:1,bD:"none",N:1,aT:6,O:1,g:"#F0F0F0",aU:6,aG:"lvl001_warmup",P:1,aV:6,j:"absolute",k:"div",A:"#A0A0A0",B:"#A0A0A0",Z:"break-word",r:"inline",C:"#A0A0A0",aN:"156_pressed",D:"#A0A0A0",t:18,aA:[{type:4,javascriptOid:"206"}],F:"center",v:"bold",G:"#000000",aP:"pointer",w:"Try again",x:"visible",I:"Solid",a:597,y:"preserve",J:"Solid"},"132":{aV:8,w:"Loser",a:452,x:"visible",Z:"break-word",y:"preserve",j:"absolute",r:"inline",z:"2",k:"div",b:319,aT:8,aS:8,t:150,e:"0.000000",aU:8,G:"#000000",v:"bold"}},n:"game_over",T:{"156_pressed":{d:1,i:"156_pressed",n:"156_pressed",a:[{f:"2",t:0,d:1,i:"g",e:"#73B75D",s:"#F0F0F0",o:"156"}],f:30},kTimelineDefaultIdentifier:{d:0.23,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[{f:"2",t:0.17,d:0.06,i:"e",e:"1.000000",s:"0.000000",o:"132"}],f:30}},o:"130"},{x:3,p:"600px",c:"#FFFFFF",v:{"164":{aV:8,w:"Awesome",a:351,x:"visible",Z:"break-word",y:"preserve",j:"absolute",r:"inline",z:"2",k:"div",b:337,aT:8,aS:8,F:"center",e:"0.000000",t:120,aU:8,G:"#000000",v:"bold"},"163":{aV:8,w:"You won!",a:441,x:"visible",Z:"break-word",y:"preserve",j:"absolute",r:"inline",z:"1",k:"div",b:229,aT:8,aS:8,t:80,aU:8,G:"#000000",v:"bold"},"165":{b:574,z:"3",K:"Solid",c:90,L:"Solid",d:15,aS:6,M:1,bD:"none",N:1,aT:6,O:1,g:"#F0F0F0",aU:6,aG:"lvl001_warmup",P:1,aV:6,j:"absolute",k:"div",A:"#A0A0A0",B:"#A0A0A0",Z:"break-word",r:"inline",C:"#A0A0A0",aN:"165_pressed",D:"#A0A0A0",t:18,aA:[{type:4,javascriptOid:"206"}],F:"center",v:"bold",G:"#000000",aP:"pointer",w:"Yes I am",x:"visible",I:"Solid",a:577,y:"preserve",J:"Solid"}},n:"finish",T:{"165_pressed":{d:1,i:"165_pressed",n:"165_pressed",a:[{f:"2",t:0,d:1,i:"g",e:"#73B75D",s:"#F0F0F0",o:"165"}],f:30},kTimelineDefaultIdentifier:{d:0.29,i:"kTimelineDefaultIdentifier",n:"Main Timeline",a:[{f:"2",t:0.23,d:0.06,i:"e",e:"1.000000",s:"0.000000",o:"164"}],f:30}},o:"166"}];
	
	var javascripts = [{name:"showScene_crossfade",source:"function(hypeDocument, element, event) {\thypeDocument.showSceneNamed(element.title, hypeDocument.kSceneTransitionCrossfade);\n\t\n}",identifier:"205"},{name:"showScene_instant",source:"function(hypeDocument, element, event) {\thypeDocument.showSceneNamed(element.title)\n\t\n}",identifier:"206"}];
	
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

