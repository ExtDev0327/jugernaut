/*! Socket.IO.js build:0.8.6, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
(function(a,b){var c=a;c.version="0.8.6";c.protocol=1;c.transports=[];c.j=[];c.sockets={};c.connect=function(h,f){var g=c.util.parseUri(h),i,d;if(b&&b.location){g.protocol=g.protocol||b.location.protocol.slice(0,-1);g.host=g.host||(b.document?b.document.domain:b.location.hostname);g.port=g.port||b.location.port}i=c.util.uniqueUri(g);var e={host:g.host,secure:"https"==g.protocol,port:g.port||("https"==g.protocol?443:80),query:g.query||""};c.util.merge(e,f);if(e["force new connection"]||!c.sockets[i]){d=new c.Socket(e)}if(!e["force new connection"]&&d){c.sockets[i]=d}d=d||c.sockets[i];return d.of(g.path.length>1?g.path:"")}})("object"===typeof module?module.exports:(this.io={}),this);(function(b,d){var a=b.util={};var c=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;var e=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];a.parseUri=function(l){var h=c.exec(l||""),k={},j=14;while(j--){k[e[j]]=h[j]||""}return k};a.uniqueUri=function(j){var k=j.protocol,i=j.host,h=j.port;if("document" in d){i=i||document.domain;h=h||(k=="https"&&document.location.protocol!=="https:"?443:document.location.port)}else{i=i||"localhost";if(!h&&k=="https"){h=443}}return(k||"http")+"://"+i+":"+(h||80)};a.query=function(l,h){var k=a.chunkQuery(l||""),j=[];a.merge(k,a.chunkQuery(h||""));for(var i in k){if(k.hasOwnProperty(i)){j.push(i+"="+k[i])}}return j.length?"?"+j.join("&"):""};a.chunkQuery=function(h){var n={},o=h.split("&"),k=0,j=o.length,m;for(;k<j;++k){m=o[k].split("=");if(m[0]){n[m[0]]=decodeURIComponent(m[1])}}return n};var f=false;a.load=function(h){if("document" in d&&document.readyState==="complete"||f){return h()}a.on(d,"load",h,false)};a.on=function(i,k,j,h){if(i.attachEvent){i.attachEvent("on"+k,j)}else{if(i.addEventListener){i.addEventListener(k,j,h)}}};a.request=function(h){if(h&&"undefined"!=typeof XDomainRequest){return new XDomainRequest()}if("undefined"!=typeof XMLHttpRequest&&(!h||a.ua.hasCORS)){return new XMLHttpRequest()}if(!h){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(i){}}return null};if("undefined"!=typeof window){a.load(function(){f=true})}a.defer=function(h){if(!a.ua.webkit||"undefined"!=typeof importScripts){return h()}a.load(function(){setTimeout(h,100)})};a.merge=function g(l,h,i,k){var j=k||[],m=typeof i=="undefined"?2:i,n;for(n in h){if(h.hasOwnProperty(n)&&a.indexOf(j,n)<0){if(typeof l[n]!=="object"||!m){l[n]=h[n];j.push(h[n])}else{a.merge(l[n],h[n],m-1,j)}}}return l};a.mixin=function(i,h){a.merge(i.prototype,h.prototype)};a.inherit=function(i,h){function j(){}j.prototype=h.prototype;i.prototype=new j};a.isArray=Array.isArray||function(h){return Object.prototype.toString.call(h)==="[object Array]"};a.intersect=function(h,k){var m=[],o=h.length>k.length?h:k,p=h.length>k.length?k:h;for(var n=0,j=p.length;n<j;n++){if(~a.indexOf(o,p[n])){m.push(p[n])}}return m};a.indexOf=function(h,m,l){if(Array.prototype.indexOf){return Array.prototype.indexOf.call(h,m,l)}for(var k=h.length,l=l<0?l+k<0?0:l+k:l||0;l<k&&h[l]!==m;l++){}return k<=l?-1:l};a.toArray=function(m){var h=[];for(var k=0,j=m.length;k<j;k++){h.push(m[k])}return h};a.ua={};a.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&(function(){try{var h=new XMLHttpRequest()}catch(i){return false}return h.withCredentials!=undefined})();a.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent)})("undefined"!=typeof io?io:module.exports,this);(function(a,c){a.EventEmitter=b;function b(){}b.prototype.on=function(d,e){if(!this.$events){this.$events={}}if(!this.$events[d]){this.$events[d]=e}else{if(c.util.isArray(this.$events[d])){this.$events[d].push(e)}else{this.$events[d]=[this.$events[d],e]}}return this};b.prototype.addListener=b.prototype.on;b.prototype.once=function(f,g){var e=this;function d(){e.removeListener(f,d);g.apply(this,arguments)}d.listener=g;this.on(f,d);return this};b.prototype.removeListener=function(e,g){if(this.$events&&this.$events[e]){var h=this.$events[e];if(c.util.isArray(h)){var j=-1;for(var f=0,d=h.length;f<d;f++){if(h[f]===g||(h[f].listener&&h[f].listener===g)){j=f;break}}if(j<0){return this}h.splice(j,1);if(!h.length){delete this.$events[e]}}else{if(h===g||(h.listener&&h.listener===g)){delete this.$events[e]}}}return this};b.prototype.removeAllListeners=function(d){if(this.$events&&this.$events[d]){this.$events[d]=null}return this};b.prototype.listeners=function(d){if(!this.$events){this.$events={}}if(!this.$events[d]){this.$events[d]=[]}if(!c.util.isArray(this.$events[d])){this.$events[d]=[this.$events[d]]}return this.$events[d]};b.prototype.emit=function(f){if(!this.$events){return false}var j=this.$events[f];if(!j){return false}var e=Array.prototype.slice.call(arguments,1);if("function"==typeof j){j.apply(this,e)}else{if(c.util.isArray(j)){var h=j.slice();for(var g=0,d=h.length;g<d;g++){h[g].apply(this,e)}}else{return false}}return true}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(exports,nativeJSON){if(nativeJSON&&nativeJSON.parse){return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify}}var JSON=exports.JSON={};function f(n){return n<10?"0"+n:n}function date(d,key){return isFinite(d.valueOf())?d.getUTCFullYear()+"-"+f(d.getUTCMonth()+1)+"-"+f(d.getUTCDate())+"T"+f(d.getUTCHours())+":"+f(d.getUTCMinutes())+":"+f(d.getUTCSeconds())+"Z":null}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value instanceof Date){value=date(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){if(typeof rep[i]==="string"){k=rep[i];v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})};JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.prototype.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}})("undefined"!=typeof io?io:module.exports,typeof JSON!=="undefined"?JSON:undefined);(function(d,g){var a=d.parser={};var e=a.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"];var b=a.reasons=["transport not supported","client not handshaken","unauthorized"];var c=a.advice=["reconnect"];var i=g.JSON,h=g.util.indexOf;a.encodePacket=function(k){var p=h(e,k.type),j=k.id||"",r=k.endpoint||"",s=k.ack,n=null;switch(k.type){case"error":var o=k.reason?h(b,k.reason):"",l=k.advice?h(c,k.advice):"";if(o!==""||l!==""){n=o+(l!==""?("+"+l):"")}break;case"message":if(k.data!==""){n=k.data}break;case"event":var q={name:k.name};if(k.args&&k.args.length){q.args=k.args}n=i.stringify(q);break;case"json":n=i.stringify(k.data);break;case"connect":if(k.qs){n=k.qs}break;case"ack":n=k.ackId+(k.args&&k.args.length?"+"+i.stringify(k.args):"");break}var m=[p,j+(s=="data"?"+":""),r];if(n!==null&&n!==undefined){m.push(n)}return m.join(":")};a.encodePayload=function(o){var k="";if(o.length==1){return o[0]}for(var m=0,j=o.length;m<j;m++){var n=o[m];k+="\ufffd"+n.length+"\ufffd"+o[m]}return k};var f=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;a.decodePacket=function(l){var k=l.match(f);if(!k){return{}}var o=k[2]||"",l=k[5]||"",n={type:e[k[1]],endpoint:k[4]||""};if(o){n.id=o;if(k[3]){n.ack="data"}else{n.ack=true}}switch(n.type){case"error":var k=l.split("+");n.reason=b[k[0]]||"";n.advice=c[k[1]]||"";break;case"message":n.data=l||"";break;case"event":try{var j=i.parse(l);n.name=j.name;n.args=j.args}catch(m){}n.args=n.args||[];break;case"json":try{n.data=i.parse(l)}catch(m){}break;case"connect":n.qs=l||"";break;case"ack":var k=l.match(/^([0-9]+)(\+)?(.*)/);if(k){n.ackId=k[1];n.args=[];if(k[3]){try{n.args=k[3]?i.parse(k[3]):[]}catch(m){}}}break;case"disconnect":case"heartbeat":break}return n};a.decodePayload=function(m){if(m.charAt(0)=="\ufffd"){var j=[];for(var k=1,l="";k<m.length;k++){if(m.charAt(k)=="\ufffd"){j.push(a.decodePacket(m.substr(k+1).substr(0,l)));k+=Number(l)+1;l=""}else{l+=m.charAt(k)}}return j}else{return[a.decodePacket(m)]}}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(a,c){a.Transport=b;function b(d,e){this.socket=d;this.sessid=e}c.util.mixin(b,c.EventEmitter);b.prototype.onData=function(g){this.clearCloseTimeout();if(this.connected||this.connecting||this.reconnecting){this.setCloseTimeout()}if(g!==""){var f=c.parser.decodePayload(g);if(f&&f.length){for(var e=0,d=f.length;e<d;e++){this.onPacket(f[e])}}}return this};b.prototype.onPacket=function(d){if(d.type=="heartbeat"){return this.onHeartbeat()}if(d.type=="connect"&&d.endpoint==""){this.onConnect()}this.socket.onPacket(d);return this};b.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var d=this;this.closeTimeout=setTimeout(function(){d.onDisconnect()},this.socket.closeTimeout)}};b.prototype.onDisconnect=function(){if(this.close&&this.open){this.close()}this.clearTimeouts();this.socket.onDisconnect();return this};b.prototype.onConnect=function(){this.socket.onConnect();return this};b.prototype.clearCloseTimeout=function(){if(this.closeTimeout){clearTimeout(this.closeTimeout);this.closeTimeout=null}};b.prototype.clearTimeouts=function(){this.clearCloseTimeout();if(this.reopenTimeout){clearTimeout(this.reopenTimeout)}};b.prototype.packet=function(d){this.send(c.parser.encodePacket(d))};b.prototype.onHeartbeat=function(d){this.packet({type:"heartbeat"})};b.prototype.onOpen=function(){this.open=true;this.clearCloseTimeout();this.socket.onOpen()};b.prototype.onClose=function(){var d=this;this.open=false;this.socket.onClose();this.onDisconnect()};b.prototype.prepareUrl=function(){var d=this.socket.options;return this.scheme()+"://"+d.host+":"+d.port+"/"+d.resource+"/"+c.protocol+"/"+this.name+"/"+this.sessid};b.prototype.ready=function(d,e){e.call(this)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(b,e,c){b.Socket=a;function a(g){this.options={port:80,secure:false,document:"document" in c?document:false,resource:"socket.io",transports:e.transports,"connect timeout":10000,"try multiple transports":true,reconnect:true,"reconnection delay":500,"reconnection limit":Infinity,"reopen delay":3000,"max reconnection attempts":10,"sync disconnect on unload":true,"auto connect":true,"flash policy port":10843};e.util.merge(this.options,g);this.connected=false;this.open=false;this.connecting=false;this.reconnecting=false;this.namespaces={};this.buffer=[];this.doBuffer=false;if(this.options["sync disconnect on unload"]&&(!this.isXDomain()||e.util.ua.hasCORS)){var f=this;e.util.on(c,"beforeunload",function(){f.disconnectSync()},false)}if(this.options["auto connect"]){this.connect()}}e.util.mixin(a,e.EventEmitter);a.prototype.of=function(f){if(!this.namespaces[f]){this.namespaces[f]=new e.SocketNamespace(this,f);if(f!==""){this.namespaces[f].packet({type:"connect"})}}return this.namespaces[f]};a.prototype.publish=function(){this.emit.apply(this,arguments);var g;for(var f in this.namespaces){if(this.namespaces.hasOwnProperty(f)){g=this.of(f);g.$emit.apply(g,arguments)}}};function d(){}a.prototype.handshake=function(l){var h=this,j=this.options;function f(n){if(n instanceof Error){h.onError(n.message)}else{l.apply(null,n.split(":"))}}var i=["http"+(j.secure?"s":"")+":/",j.host+":"+j.port,j.resource,e.protocol,e.util.query(this.options.query,"t="+ +new Date)].join("/");if(this.isXDomain()&&!e.util.ua.hasCORS){var k=document.getElementsByTagName("script")[0],g=document.createElement("script");g.src=i+"&jsonp="+e.j.length;k.parentNode.insertBefore(g,k);e.j.push(function(n){f(n);g.parentNode.removeChild(g)})}else{var m=e.util.request();m.open("GET",i,true);m.onreadystatechange=function(){if(m.readyState==4){m.onreadystatechange=d;if(m.status==200){f(m.responseText)}else{!h.reconnecting&&h.onError(m.responseText)}}};m.send(null)}};a.prototype.getTransport=function(j){var f=j||this.transports,g;for(var h=0,k;k=f[h];h++){if(e.Transport[k]&&e.Transport[k].check(this)&&(!this.isXDomain()||e.Transport[k].xdomainCheck())){return new e.Transport[k](this,this.sessionid)}}return null};a.prototype.connect=function(g){if(this.connecting){return this}var f=this;this.handshake(function(h,k,l,j){f.sessionid=h;f.closeTimeout=l*1000;f.heartbeatTimeout=k*1000;f.transports=e.util.intersect(j.split(","),f.options.transports);function i(m){if(f.transport){f.transport.clearTimeouts()}f.transport=f.getTransport(m);if(!f.transport){return f.publish("connect_failed")}f.transport.ready(f,function(){f.connecting=true;f.publish("connecting",f.transport.name);f.transport.open();if(f.options["connect timeout"]){f.connectTimeoutTimer=setTimeout(function(){if(!f.connected){f.connecting=false;if(f.options["try multiple transports"]){if(!f.remainingTransports){f.remainingTransports=f.transports.slice(0)}var n=f.remainingTransports;while(n.length>0&&n.splice(0,1)[0]!=f.transport.name){}if(n.length){i(n)}else{f.publish("connect_failed")}}}},f.options["connect timeout"])}})}i();f.once("connect",function(){clearTimeout(f.connectTimeoutTimer);g&&typeof g=="function"&&g()})});return this};a.prototype.packet=function(f){if(this.connected&&!this.doBuffer){this.transport.packet(f)}else{this.buffer.push(f)}return this};a.prototype.setBuffer=function(f){this.doBuffer=f;if(!f&&this.connected&&this.buffer.length){this.transport.payload(this.buffer);this.buffer=[]}};a.prototype.disconnect=function(){if(this.connected){if(this.open){this.of("").packet({type:"disconnect"})}this.onDisconnect("booted")}return this};a.prototype.disconnectSync=function(){var g=e.util.request(),f=this.resource+"/"+e.protocol+"/"+this.sessionid;g.open("GET",f,true);this.onDisconnect("booted")};a.prototype.isXDomain=function(){var f=c.location.port||("https:"==c.location.protocol?443:80);return this.options.host!==c.location.hostname||this.options.port!=f};a.prototype.onConnect=function(){if(!this.connected){this.connected=true;this.connecting=false;if(!this.doBuffer){this.setBuffer(false)}this.emit("connect")}};a.prototype.onOpen=function(){this.open=true};a.prototype.onClose=function(){this.open=false};a.prototype.onPacket=function(f){this.of(f.endpoint).onPacket(f)};a.prototype.onError=function(f){if(f&&f.advice){if(f.advice==="reconnect"&&this.connected){this.disconnect();this.reconnect()}}this.publish("error",f&&f.reason?f.reason:f)};a.prototype.onDisconnect=function(g){var f=this.connected;this.connected=false;this.connecting=false;this.open=false;if(f){this.transport.close();this.transport.clearTimeouts();this.publish("disconnect",g);if("booted"!=g&&this.options.reconnect&&!this.reconnecting){this.reconnect()}}};a.prototype.reconnect=function(){this.reconnecting=true;this.reconnectionAttempts=0;this.reconnectionDelay=this.options["reconnection delay"];var i=this,h=this.options["max reconnection attempts"],f=this.options["try multiple transports"],g=this.options["reconnection limit"];function j(){if(i.connected){for(var l in i.namespaces){if(i.namespaces.hasOwnProperty(l)&&""!==l){i.namespaces[l].packet({type:"connect"})}}i.publish("reconnect",i.transport.name,i.reconnectionAttempts)}i.removeListener("connect_failed",k);i.removeListener("connect",k);i.reconnecting=false;delete i.reconnectionAttempts;delete i.reconnectionDelay;delete i.reconnectionTimer;delete i.redoTransports;i.options["try multiple transports"]=f}function k(){if(!i.reconnecting){return}if(i.connected){return j()}if(i.connecting&&i.reconnecting){return i.reconnectionTimer=setTimeout(k,1000)}if(i.reconnectionAttempts++>=h){if(!i.redoTransports){i.on("connect_failed",k);i.options["try multiple transports"]=true;i.transport=i.getTransport();i.redoTransports=true;i.connect()}else{i.publish("reconnect_failed");j()}}else{if(i.reconnectionDelay<g){i.reconnectionDelay*=2}i.connect();i.publish("reconnecting",i.reconnectionDelay,i.reconnectionAttempts);i.reconnectionTimer=setTimeout(k,i.reconnectionDelay)}}this.options["try multiple transports"]=false;this.reconnectionTimer=setTimeout(k,this.reconnectionDelay);this.on("connect",k)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(a,d){a.SocketNamespace=b;function b(e,f){this.socket=e;this.name=f||"";this.flags={};this.json=new c(this,"json");this.ackPackets=0;this.acks={}}d.util.mixin(b,d.EventEmitter);b.prototype.$emit=d.EventEmitter.prototype.emit;b.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)};b.prototype.packet=function(e){e.endpoint=this.name;this.socket.packet(e);this.flags={};return this};b.prototype.send=function(f,e){var g={type:this.flags.json?"json":"message",data:f};if("function"==typeof e){g.id=++this.ackPackets;g.ack=true;this.acks[g.id]=e}return this.packet(g)};b.prototype.emit=function(f){var e=Array.prototype.slice.call(arguments,1),h=e[e.length-1],g={type:"event",name:f};if("function"==typeof h){g.id=++this.ackPackets;g.ack="data";this.acks[g.id]=h;e=e.slice(0,e.length-1)}g.args=e;return this.packet(g)};b.prototype.disconnect=function(){if(this.name===""){this.socket.disconnect()}else{this.packet({type:"disconnect"});this.$emit("disconnect")}return this};b.prototype.onPacket=function(f){var e=this;function h(){e.packet({type:"ack",args:d.util.toArray(arguments),ackId:f.id})}switch(f.type){case"connect":this.$emit("connect");break;case"disconnect":if(this.name===""){this.socket.onDisconnect(f.reason||"booted")}else{this.$emit("disconnect",f.reason)}break;case"message":case"json":var g=["message",f.data];if(f.ack=="data"){g.push(h)}else{if(f.ack){this.packet({type:"ack",ackId:f.id})}}this.$emit.apply(this,g);break;case"event":var g=[f.name].concat(f.args);if(f.ack=="data"){g.push(h)}this.$emit.apply(this,g);break;case"ack":if(this.acks[f.ackId]){this.acks[f.ackId].apply(this,f.args);delete this.acks[f.ackId]}break;case"error":if(f.advice){this.socket.onError(f)}else{if(f.reason=="unauthorized"){this.$emit("connect_failed",f.reason)}else{this.$emit("error",f.reason)}}break}};function c(f,e){this.namespace=f;this.name=e}c.prototype.send=function(){this.namespace.flags[this.name]=true;this.namespace.send.apply(this.namespace,arguments)};c.prototype.emit=function(){this.namespace.flags[this.name]=true;this.namespace.emit.apply(this.namespace,arguments)}})("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(b,d,c){b.websocket=a;function a(e){d.Transport.apply(this,arguments)}d.util.inherit(a,d.Transport);a.prototype.name="websocket";a.prototype.open=function(){var g=d.util.query(this.socket.options.query),f=this,e;if(!e){e=c.MozWebSocket||c.WebSocket}this.websocket=new e(this.prepareUrl()+g);this.websocket.onopen=function(){f.onOpen();f.socket.setBuffer(false)};this.websocket.onmessage=function(h){f.onData(h.data)};this.websocket.onclose=function(){f.onClose();f.socket.setBuffer(true)};this.websocket.onerror=function(h){f.onError(h)};return this};a.prototype.send=function(e){this.websocket.send(e);return this};a.prototype.payload=function(e){for(var g=0,f=e.length;g<f;g++){this.packet(e[g])}return this};a.prototype.close=function(){this.websocket.close();return this};a.prototype.onError=function(f){this.socket.onError(f)};a.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"};a.check=function(){return("WebSocket" in c&&!("__addTask" in WebSocket))||"MozWebSocket" in c};a.xdomainCheck=function(){return true};d.transports.push("websocket")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(a,e,c){a.XHR=b;function b(f){if(!f){return}e.Transport.apply(this,arguments);this.sendBuffer=[]}e.util.inherit(b,e.Transport);b.prototype.open=function(){this.socket.setBuffer(false);this.onOpen();this.get();this.setCloseTimeout();return this};b.prototype.payload=function(j){var h=[];for(var g=0,f=j.length;g<f;g++){h.push(e.parser.encodePacket(j[g]))}this.send(e.parser.encodePayload(h))};b.prototype.send=function(f){this.post(f);return this};function d(){}b.prototype.post=function(h){var g=this;this.socket.setBuffer(true);function f(){if(this.readyState==4){this.onreadystatechange=d;g.posting=false;if(this.status==200){g.socket.setBuffer(false)}else{g.onClose()}}}function i(){this.onload=d;g.socket.setBuffer(false)}this.sendXHR=this.request("POST");if(c.XDomainRequest&&this.sendXHR instanceof XDomainRequest){this.sendXHR.onload=this.sendXHR.onerror=i}else{this.sendXHR.onreadystatechange=f}this.sendXHR.send(h)};b.prototype.close=function(){this.onClose();return this};b.prototype.request=function(i){var f=e.util.request(this.socket.isXDomain()),g=e.util.query(this.socket.options.query,"t="+ +new Date);f.open(i||"GET",this.prepareUrl()+g,true);if(i=="POST"){try{if(f.setRequestHeader){f.setRequestHeader("Content-type","text/plain;charset=UTF-8")}else{f.contentType="text/plain"}}catch(h){}}return f};b.prototype.scheme=function(){return this.socket.options.secure?"https":"http"};b.check=function(f,g){try{if(e.util.request(g)){return true}}catch(h){}return false};b.xdomainCheck=function(){return b.check(null,true)}})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(a,c){a.htmlfile=b;function b(d){c.Transport.XHR.apply(this,arguments)}c.util.inherit(b,c.Transport.XHR);b.prototype.name="htmlfile";b.prototype.get=function(){this.doc=new ActiveXObject("htmlfile");this.doc.open();this.doc.write("<html></html>");this.doc.close();this.doc.parentWindow.s=this;var d=this.doc.createElement("div");d.className="socketio";this.doc.body.appendChild(d);this.iframe=this.doc.createElement("iframe");d.appendChild(this.iframe);var e=this,f=c.util.query(this.socket.options.query,"t="+ +new Date);this.iframe.src=this.prepareUrl()+f;c.util.on(window,"unload",function(){e.destroy()})};b.prototype._=function(f,h){this.onData(f);try{var d=h.getElementsByTagName("script")[0];d.parentNode.removeChild(d)}catch(g){}};b.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(d){}this.doc=null;this.iframe.parentNode.removeChild(this.iframe);this.iframe=null;CollectGarbage()}};b.prototype.close=function(){this.destroy();return c.Transport.XHR.prototype.close.call(this)};b.check=function(){if("ActiveXObject" in window){try{var d=new ActiveXObject("htmlfile");return d&&c.Transport.XHR.check()}catch(f){}}return false};b.xdomainCheck=function(){return false};c.transports.push("htmlfile")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports);(function(a,e,b){a["xhr-polling"]=d;function d(){e.Transport.XHR.apply(this,arguments)}e.util.inherit(d,e.Transport.XHR);e.util.merge(d,e.Transport.XHR);d.prototype.name="xhr-polling";d.prototype.open=function(){var f=this;e.Transport.XHR.prototype.open.call(f);return false};function c(){}d.prototype.get=function(){if(!this.open){return}var g=this;function f(){if(this.readyState==4){this.onreadystatechange=c;if(this.status==200){g.onData(this.responseText);g.get()}else{g.onClose()}}}function h(){this.onload=c;g.onData(this.responseText);g.get()}this.xhr=this.request();if(b.XDomainRequest&&this.xhr instanceof XDomainRequest){this.xhr.onload=this.xhr.onerror=h}else{this.xhr.onreadystatechange=f}this.xhr.send(null)};d.prototype.onClose=function(){e.Transport.XHR.prototype.onClose.call(this);if(this.xhr){this.xhr.onreadystatechange=this.xhr.onload=c;try{this.xhr.abort()}catch(f){}this.xhr=null}};d.prototype.ready=function(f,h){var g=this;e.util.defer(function(){h.call(g)})};e.transports.push("xhr-polling")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);(function(b,e,d){var a=d.document&&"MozAppearance" in d.document.documentElement.style;b["jsonp-polling"]=c;function c(f){e.Transport["xhr-polling"].apply(this,arguments);this.index=e.j.length;var g=this;e.j.push(function(h){g._(h)})}e.util.inherit(c,e.Transport["xhr-polling"]);c.prototype.name="jsonp-polling";c.prototype.post=function(l){var o=this,n=e.util.query(this.socket.options.query,"t="+(+new Date)+"&i="+this.index);if(!this.form){var g=document.createElement("form"),h=document.createElement("textarea"),f=this.iframeId="socketio_iframe_"+this.index,k;g.className="socketio";g.style.position="absolute";g.style.top="-1000px";g.style.left="-1000px";g.target=f;g.method="POST";g.setAttribute("accept-charset","utf-8");h.name="d";g.appendChild(h);document.body.appendChild(g);this.form=g;this.area=h}this.form.action=this.prepareUrl()+n;function i(){j();o.socket.setBuffer(false)}function j(){if(o.iframe){o.form.removeChild(o.iframe)}try{k=document.createElement('<iframe name="'+o.iframeId+'">')}catch(p){k=document.createElement("iframe");k.name=o.iframeId}k.id=o.iframeId;o.form.appendChild(k);o.iframe=k}j();this.area.value=e.JSON.stringify(l);try{this.form.submit()}catch(m){}if(this.iframe.attachEvent){k.onreadystatechange=function(){if(o.iframe.readyState=="complete"){i()}}}else{this.iframe.onload=i}this.socket.setBuffer(true)};c.prototype.get=function(){var g=this,f=document.createElement("script"),i=e.util.query(this.socket.options.query,"t="+(+new Date)+"&i="+this.index);if(this.script){this.script.parentNode.removeChild(this.script);this.script=null}f.async=true;f.src=this.prepareUrl()+i;f.onerror=function(){g.onClose()};var h=document.getElementsByTagName("script")[0];h.parentNode.insertBefore(f,h);this.script=f;if(a){setTimeout(function(){var j=document.createElement("iframe");document.body.appendChild(j);document.body.removeChild(j)},100)}};c.prototype._=function(f){this.onData(f);if(this.open){this.get()}return this};c.prototype.ready=function(f,h){var g=this;if(!a){return h.call(this)}e.util.load(function(){h.call(g)})};c.check=function(){return"document" in d};c.xdomainCheck=function(){return true};e.transports.push("jsonp-polling")})("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this);var Juggernaut=function(a){this.options=a||{};this.options.host=this.options.host||window.location.hostname;this.options.port=this.options.port||8080;this.handlers={};this.meta=this.options.meta;this.io=io.connect(this.options.host,this.options);this.io.on("connect",this.proxy(this.onconnect));this.io.on("message",this.proxy(this.onmessage));this.io.on("disconnect",this.proxy(this.ondisconnect));this.on("connect",this.proxy(this.writeMeta))};Juggernaut.fn=Juggernaut.prototype;Juggernaut.fn.proxy=function(b){var a=this;return(function(){return b.apply(a,arguments)})};Juggernaut.fn.on=function(a,b){if(!a||!b){return}if(!this.handlers[a]){this.handlers[a]=[]}this.handlers[a].push(b)};Juggernaut.fn.bind=Juggernaut.fn.on;Juggernaut.fn.unbind=function(a){if(!this.handlers){return}delete this.handlers[a]};Juggernaut.fn.write=function(a){if(typeof a.toJSON=="function"){a=a.toJSON()}this.io.send(a)};Juggernaut.fn.subscribe=function(b,c){if(!b){throw"Must provide a channel"}this.on(b+":data",c);var a=this.proxy(function(){var d=new Juggernaut.Message;d.type="subscribe";d.channel=b;this.write(d)});if(this.io.socket.connected){a()}else{this.on("connect",a)}};Juggernaut.fn.unsubscribe=function(b){if(!b){throw"Must provide a channel"}this.unbind(b+":data");var a=new Juggernaut.Message;a.type="unsubscribe";a.channel=b;this.write(a)};Juggernaut.fn.trigger=function(){var c=[];for(var g=0;g<arguments.length;g++){c.push(arguments[g])}var b=c.shift();var e=this.handlers[b];if(!e){return}for(var d=0,a=e.length;d<a;d++){e[d].apply(this,c)}};Juggernaut.fn.writeMeta=function(){if(!this.meta){return}var a=new Juggernaut.Message;a.type="meta";a.data=this.meta;this.write(a)};Juggernaut.fn.onconnect=function(){this.sessionID=this.io.socket.sessionid;this.trigger("connect")};Juggernaut.fn.ondisconnect=function(){this.trigger("disconnect")};Juggernaut.fn.onmessage=function(b){var a=Juggernaut.Message.fromJSON(b);this.trigger("message",a);this.trigger("data",a.channel,a.data);this.trigger(a.channel+":data",a.data)};Juggernaut.Message=function(b){for(var a in b){this[a]=b[a]}};Juggernaut.Message.fromJSON=function(a){return(new this(JSON.parse(a)))};Juggernaut.Message.prototype.toJSON=function(){var a={};for(var b in this){if(typeof this[b]!="function"){a[b]=this[b]}}return(JSON.stringify(a))};if(typeof module!="undefined"){module.exports=Juggernaut};