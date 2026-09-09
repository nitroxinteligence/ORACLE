(()=>{var wK=Object.defineProperty;var lQ=(J,$)=>{for(var Q in $)wK(J,Q,{get:$[Q],enumerable:!0,configurable:!0,set:(W)=>$[Q]=()=>W})};var qW="185";var FW=0,gJ=1,DW=2;var f6=1,OW=2,M6=3,R6=0,w8=1,J9=2,$9=0,y6=1,pJ=2,mJ=3,lJ=4,MW=5;var k6=100,RW=101,kW=102,LW=103,VW=104,BW=200,zW=201,IW=202,CW=203,_W=204,AW=205,PW=206,wW=207,TW=208,SW=209,jW=210,vW=211,fW=212,yW=213,hW=214,bW=0,xW=1,gW=2,dJ=3,pW=4,mW=5,lW=6,dW=7,uW=0,cW=1,nW=2,a8=0,uJ=1,cJ=2,nJ=3,sJ=4,iJ=5,oJ=6,aJ=7;var L6=301,p9=302,_7=303,A7=304,h6=306,P7=1000,w7=1001,sW=1002,P9=1003,iW=1004;var b6=1005;var _8=1006,T7=1007;var m9=1008;var h8=1009,oW=1010,aW=1011,x6=1012,rJ=1013,w9=1014,q9=1015,F9=1016,tJ=1017,eJ=1018,V6=1020,rW=35902,tW=35899,eW=1021,JZ=1022,Q9=1023,l9=1026,d9=1027,S7=1028,J$=1029,u9=1030,$$=1031;var Q$=1033,j7=33776,v7=33777,f7=33778,y7=33779,W$=35840,Z$=35841,K$=35842,H$=35843,Y$=36196,X$=37492,U$=37496,G$=37488,N$=37489,h7=37490,E$=37491,q$=37808,F$=37809,D$=37810,O$=37811,M$=37812,R$=37813,k$=37814,L$=37815,V$=37816,B$=37817,z$=37818,I$=37819,C$=37820,_$=37821,A$=36492,P$=36494,w$=36495,T$=36283,S$=36284,b7=36285,j$=36286;var v$=0,$Z=1,c9="",x7="srgb",f$="srgb-linear",y$="linear",e0="srgb";var QZ=512,WZ=513,ZZ=514,g7=515,KZ=516,HZ=517,p7=518,YZ=519;var h$=35048;var b$="300 es",x$=2000;function TK(J){for(let $=J.length-1;$>=0;--$)if(J[$]>=65535)return!0;return!1}function SK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function v6(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function XZ(){let J=v6("canvas");return J.style.display="block",J}var dQ={},O6=null;function g$(...J){let $="THREE."+J.shift();if(O6)O6("log",$,...J);else console.log($,...J)}function UZ(J){let $=J[0];if(typeof $==="string"&&$.startsWith("TSL:")){let Q=J[1];if(Q&&Q.isStackTrace)J[0]+=" "+Q.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function _0(...J){J=UZ(J);let $="THREE."+J.shift();if(O6)O6("warn",$,...J);else{let Q=J[0];if(Q&&Q.isStackTrace)console.warn(Q.getError($));else console.warn($,...J)}}function P0(...J){J=UZ(J);let $="THREE."+J.shift();if(O6)O6("error",$,...J);else{let Q=J[0];if(Q&&Q.isStackTrace)console.error(Q.getError($));else console.error($,...J)}}function g9(...J){let $=J.join(" ");if($ in dQ)return;dQ[$]=!0,_0(...J)}function GZ(J,$,Q){return new Promise(function(W,Z){function K(){switch(J.clientWaitSync($,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:Z();break;case J.TIMEOUT_EXPIRED:setTimeout(K,Q);break;default:W()}}setTimeout(K,Q)})}var NZ={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class D9{addEventListener(J,$){if(this._listeners===void 0)this._listeners={};let Q=this._listeners;if(Q[J]===void 0)Q[J]=[];if(Q[J].indexOf($)===-1)Q[J].push($)}hasEventListener(J,$){let Q=this._listeners;if(Q===void 0)return!1;return Q[J]!==void 0&&Q[J].indexOf($)!==-1}removeEventListener(J,$){let Q=this._listeners;if(Q===void 0)return;let W=Q[J];if(W!==void 0){let Z=W.indexOf($);if(Z!==-1)W.splice(Z,1)}}dispatchEvent(J){let $=this._listeners;if($===void 0)return;let Q=$[J.type];if(Q!==void 0){J.target=this;let W=Q.slice(0);for(let Z=0,K=W.length;Z<K;Z++)W[Z].call(this,J);J.target=null}}}var B8=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var FJ=Math.PI/180,z7=180/Math.PI;function g6(){let J=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,W=Math.random()*4294967295|0;return(B8[J&255]+B8[J>>8&255]+B8[J>>16&255]+B8[J>>24&255]+"-"+B8[$&255]+B8[$>>8&255]+"-"+B8[$>>16&15|64]+B8[$>>24&255]+"-"+B8[Q&63|128]+B8[Q>>8&255]+"-"+B8[Q>>16&255]+B8[Q>>24&255]+B8[W&255]+B8[W>>8&255]+B8[W>>16&255]+B8[W>>24&255]).toLowerCase()}function m0(J,$,Q){return Math.max($,Math.min(Q,J))}function jK(J,$){return(J%$+$)%$}function DJ(J,$,Q){return(1-Q)*J+Q*$}function A6(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function P8(J,$){switch($.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class n0{static{n0.prototype.isVector2=!0}constructor(J=0,$=0){this.x=J,this.y=$}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,$){return this.x=J,this.y=$,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let $=this.x,Q=this.y,W=J.elements;return this.x=W[0]*$+W[3]*Q+W[6],this.y=W[1]*$+W[4]*Q+W[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,$){return this.x=m0(this.x,J.x,$.x),this.y=m0(this.y,J.y,$.y),this}clampScalar(J,$){return this.x=m0(this.x,J,$),this.y=m0(this.y,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(m0(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(m0(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y;return $*$+Q*Q}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this}rotateAround(J,$){let Q=Math.cos($),W=Math.sin($),Z=this.x-J.x,K=this.y-J.y;return this.x=Z*Q-K*W+J.x,this.y=Z*W+K*Q+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class O9{constructor(J=0,$=0,Q=0,W=1){this.isQuaternion=!0,this._x=J,this._y=$,this._z=Q,this._w=W}static slerpFlat(J,$,Q,W,Z,K,H){let Y=Q[W+0],X=Q[W+1],U=Q[W+2],E=Q[W+3],N=Z[K+0],G=Z[K+1],D=Z[K+2],R=Z[K+3];if(E!==R||Y!==N||X!==G||U!==D){let z=Y*N+X*G+U*D+E*R;if(z<0)N=-N,G=-G,D=-D,R=-R,z=-z;let F=1-H;if(z<0.9995){let q=Math.acos(z),C=Math.sin(q);F=Math.sin(F*q)/C,H=Math.sin(H*q)/C,Y=Y*F+N*H,X=X*F+G*H,U=U*F+D*H,E=E*F+R*H}else{Y=Y*F+N*H,X=X*F+G*H,U=U*F+D*H,E=E*F+R*H;let q=1/Math.sqrt(Y*Y+X*X+U*U+E*E);Y*=q,X*=q,U*=q,E*=q}}J[$]=Y,J[$+1]=X,J[$+2]=U,J[$+3]=E}static multiplyQuaternionsFlat(J,$,Q,W,Z,K){let H=Q[W],Y=Q[W+1],X=Q[W+2],U=Q[W+3],E=Z[K],N=Z[K+1],G=Z[K+2],D=Z[K+3];return J[$]=H*D+U*E+Y*G-X*N,J[$+1]=Y*D+U*N+X*E-H*G,J[$+2]=X*D+U*G+H*N-Y*E,J[$+3]=U*D-H*E-Y*N-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,$,Q,W){return this._x=J,this._y=$,this._z=Q,this._w=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,$=!0){let{_x:Q,_y:W,_z:Z,_order:K}=J,H=Math.cos,Y=Math.sin,X=H(Q/2),U=H(W/2),E=H(Z/2),N=Y(Q/2),G=Y(W/2),D=Y(Z/2);switch(K){case"XYZ":this._x=N*U*E+X*G*D,this._y=X*G*E-N*U*D,this._z=X*U*D+N*G*E,this._w=X*U*E-N*G*D;break;case"YXZ":this._x=N*U*E+X*G*D,this._y=X*G*E-N*U*D,this._z=X*U*D-N*G*E,this._w=X*U*E+N*G*D;break;case"ZXY":this._x=N*U*E-X*G*D,this._y=X*G*E+N*U*D,this._z=X*U*D+N*G*E,this._w=X*U*E-N*G*D;break;case"ZYX":this._x=N*U*E-X*G*D,this._y=X*G*E+N*U*D,this._z=X*U*D-N*G*E,this._w=X*U*E+N*G*D;break;case"YZX":this._x=N*U*E+X*G*D,this._y=X*G*E+N*U*D,this._z=X*U*D-N*G*E,this._w=X*U*E-N*G*D;break;case"XZY":this._x=N*U*E-X*G*D,this._y=X*G*E-N*U*D,this._z=X*U*D+N*G*E,this._w=X*U*E+N*G*D;break;default:_0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if($===!0)this._onChangeCallback();return this}setFromAxisAngle(J,$){let Q=$/2,W=Math.sin(Q);return this._x=J.x*W,this._y=J.y*W,this._z=J.z*W,this._w=Math.cos(Q),this._onChangeCallback(),this}setFromRotationMatrix(J){let $=J.elements,Q=$[0],W=$[4],Z=$[8],K=$[1],H=$[5],Y=$[9],X=$[2],U=$[6],E=$[10],N=Q+H+E;if(N>0){let G=0.5/Math.sqrt(N+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(Z-X)*G,this._z=(K-W)*G}else if(Q>H&&Q>E){let G=2*Math.sqrt(1+Q-H-E);this._w=(U-Y)/G,this._x=0.25*G,this._y=(W+K)/G,this._z=(Z+X)/G}else if(H>E){let G=2*Math.sqrt(1+H-Q-E);this._w=(Z-X)/G,this._x=(W+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+E-Q-H);this._w=(K-W)/G,this._x=(Z+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,$){let Q=J.dot($)+1;if(Q<0.00000001)if(Q=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=Q;else this._x=0,this._y=-J.z,this._z=J.y,this._w=Q;else this._x=J.y*$.z-J.z*$.y,this._y=J.z*$.x-J.x*$.z,this._z=J.x*$.y-J.y*$.x,this._w=Q;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(m0(this.dot(J),-1,1)))}rotateTowards(J,$){let Q=this.angleTo(J);if(Q===0)return this;let W=Math.min(1,$/Q);return this.slerp(J,W),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,$){let{_x:Q,_y:W,_z:Z,_w:K}=J,H=$._x,Y=$._y,X=$._z,U=$._w;return this._x=Q*U+K*H+W*X-Z*Y,this._y=W*U+K*Y+Z*H-Q*X,this._z=Z*U+K*X+Q*Y-W*H,this._w=K*U-Q*H-W*Y-Z*X,this._onChangeCallback(),this}slerp(J,$){let{_x:Q,_y:W,_z:Z,_w:K}=J,H=this.dot(J);if(H<0)Q=-Q,W=-W,Z=-Z,K=-K,H=-H;let Y=1-$;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,$=Math.sin($*X)/U,this._x=this._x*Y+Q*$,this._y=this._y*Y+W*$,this._z=this._z*Y+Z*$,this._w=this._w*Y+K*$,this._onChangeCallback()}else this._x=this._x*Y+Q*$,this._y=this._y*Y+W*$,this._z=this._z*Y+Z*$,this._w=this._w*Y+K*$,this.normalize();return this}slerpQuaternions(J,$,Q){return this.copy(J).slerp($,Q)}random(){let J=2*Math.PI*Math.random(),$=2*Math.PI*Math.random(),Q=Math.random(),W=Math.sqrt(1-Q),Z=Math.sqrt(Q);return this.set(W*Math.sin(J),W*Math.cos(J),Z*Math.sin($),Z*Math.cos($))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,$=0){return this._x=J[$],this._y=J[$+1],this._z=J[$+2],this._w=J[$+3],this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._w,J}fromBufferAttribute(J,$){return this._x=J.getX($),this._y=J.getY($),this._z=J.getZ($),this._w=J.getW($),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class y{static{y.prototype.isVector3=!0}constructor(J=0,$=0,Q=0){this.x=J,this.y=$,this.z=Q}set(J,$,Q){if(Q===void 0)Q=this.z;return this.x=J,this.y=$,this.z=Q,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,$){return this.x=J.x*$.x,this.y=J.y*$.y,this.z=J.z*$.z,this}applyEuler(J){return this.applyQuaternion(uQ.setFromEuler(J))}applyAxisAngle(J,$){return this.applyQuaternion(uQ.setFromAxisAngle(J,$))}applyMatrix3(J){let $=this.x,Q=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*$+Z[3]*Q+Z[6]*W,this.y=Z[1]*$+Z[4]*Q+Z[7]*W,this.z=Z[2]*$+Z[5]*Q+Z[8]*W,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let $=this.x,Q=this.y,W=this.z,Z=J.elements,K=1/(Z[3]*$+Z[7]*Q+Z[11]*W+Z[15]);return this.x=(Z[0]*$+Z[4]*Q+Z[8]*W+Z[12])*K,this.y=(Z[1]*$+Z[5]*Q+Z[9]*W+Z[13])*K,this.z=(Z[2]*$+Z[6]*Q+Z[10]*W+Z[14])*K,this}applyQuaternion(J){let $=this.x,Q=this.y,W=this.z,Z=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*W-H*Q),U=2*(H*$-Z*W),E=2*(Z*Q-K*$);return this.x=$+Y*X+K*E-H*U,this.y=Q+Y*U+H*X-Z*E,this.z=W+Y*E+Z*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let $=this.x,Q=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*$+Z[4]*Q+Z[8]*W,this.y=Z[1]*$+Z[5]*Q+Z[9]*W,this.z=Z[2]*$+Z[6]*Q+Z[10]*W,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,$){return this.x=m0(this.x,J.x,$.x),this.y=m0(this.y,J.y,$.y),this.z=m0(this.z,J.z,$.z),this}clampScalar(J,$){return this.x=m0(this.x,J,$),this.y=m0(this.y,J,$),this.z=m0(this.z,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(m0(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,$){let{x:Q,y:W,z:Z}=J,K=$.x,H=$.y,Y=$.z;return this.x=W*Y-Z*H,this.y=Z*K-Q*Y,this.z=Q*H-W*K,this}projectOnVector(J){let $=J.lengthSq();if($===0)return this.set(0,0,0);let Q=J.dot(this)/$;return this.copy(J).multiplyScalar(Q)}projectOnPlane(J){return OJ.copy(this).projectOnVector(J),this.sub(OJ)}reflect(J){return this.sub(OJ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let $=Math.sqrt(this.lengthSq()*J.lengthSq());if($===0)return Math.PI/2;let Q=this.dot(J)/$;return Math.acos(m0(Q,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let $=this.x-J.x,Q=this.y-J.y,W=this.z-J.z;return $*$+Q*Q+W*W}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,$,Q){let W=Math.sin($)*J;return this.x=W*Math.sin(Q),this.y=Math.cos($)*J,this.z=W*Math.cos(Q),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,$,Q){return this.x=J*Math.sin($),this.y=Q,this.z=J*Math.cos($),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this}setFromMatrixScale(J){let $=this.setFromMatrixColumn(J,0).length(),Q=this.setFromMatrixColumn(J,1).length(),W=this.setFromMatrixColumn(J,2).length();return this.x=$,this.y=Q,this.z=W,this}setFromMatrixColumn(J,$){return this.fromArray(J.elements,$*4)}setFromMatrix3Column(J,$){return this.fromArray(J.elements,$*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,$=Math.random()*2-1,Q=Math.sqrt(1-$*$);return this.x=Q*Math.cos(J),this.y=$,this.z=Q*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var OJ=new y,uQ=new O9;class w0{static{w0.prototype.isMatrix3=!0}constructor(J,$,Q,W,Z,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,$,Q,W,Z,K,H,Y,X)}set(J,$,Q,W,Z,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=W,U[2]=H,U[3]=$,U[4]=Z,U[5]=Y,U[6]=Q,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],this}extractBasis(J,$,Q){return J.setFromMatrix3Column(this,0),$.setFromMatrix3Column(this,1),Q.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let $=J.elements;return this.set($[0],$[4],$[8],$[1],$[5],$[9],$[2],$[6],$[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,W=$.elements,Z=this.elements,K=Q[0],H=Q[3],Y=Q[6],X=Q[1],U=Q[4],E=Q[7],N=Q[2],G=Q[5],D=Q[8],R=W[0],z=W[3],F=W[6],q=W[1],C=W[4],A=W[7],V=W[2],I=W[5],_=W[8];return Z[0]=K*R+H*q+Y*V,Z[3]=K*z+H*C+Y*I,Z[6]=K*F+H*A+Y*_,Z[1]=X*R+U*q+E*V,Z[4]=X*z+U*C+E*I,Z[7]=X*F+U*A+E*_,Z[2]=N*R+G*q+D*V,Z[5]=N*z+G*C+D*I,Z[8]=N*F+G*A+D*_,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[3]*=J,$[6]*=J,$[1]*=J,$[4]*=J,$[7]*=J,$[2]*=J,$[5]*=J,$[8]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return $*K*U-$*H*X-Q*Z*U+Q*H*Y+W*Z*X-W*K*Y}invert(){let J=this.elements,$=J[0],Q=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=U*K-H*X,N=H*Y-U*Z,G=X*Z-K*Y,D=$*E+Q*N+W*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/D;return J[0]=E*R,J[1]=(W*X-U*Q)*R,J[2]=(H*Q-W*K)*R,J[3]=N*R,J[4]=(U*$-W*Y)*R,J[5]=(W*Z-H*$)*R,J[6]=G*R,J[7]=(Q*Y-X*$)*R,J[8]=(K*$-Q*Z)*R,this}transpose(){let J,$=this.elements;return J=$[1],$[1]=$[3],$[3]=J,J=$[2],$[2]=$[6],$[6]=J,J=$[5],$[5]=$[7],$[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let $=this.elements;return J[0]=$[0],J[1]=$[3],J[2]=$[6],J[3]=$[1],J[4]=$[4],J[5]=$[7],J[6]=$[2],J[7]=$[5],J[8]=$[8],this}setUvTransform(J,$,Q,W,Z,K,H){let Y=Math.cos(Z),X=Math.sin(Z);return this.set(Q*Y,Q*X,-Q*(Y*K+X*H)+K+J,-W*X,W*Y,-W*(-X*K+Y*H)+H+$,0,0,1),this}scale(J,$){return g9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(MJ.makeScale(J,$)),this}rotate(J){return g9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(MJ.makeRotation(-J)),this}translate(J,$){return g9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(MJ.makeTranslation(J,$)),this}makeTranslation(J,$){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,$,0,0,1);return this}makeRotation(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,Q,$,0,0,0,1),this}makeScale(J,$){return this.set(J,0,0,0,$,0,0,0,1),this}equals(J){let $=this.elements,Q=J.elements;for(let W=0;W<9;W++)if($[W]!==Q[W])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<9;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var MJ=new w0,cQ=new w0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),nQ=new w0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function vK(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(Z,K,H){if(this.enabled===!1||K===H||!K||!H)return Z;if(this.spaces[K].transfer==="srgb")Z.r=E9(Z.r),Z.g=E9(Z.g),Z.b=E9(Z.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)Z.applyMatrix3(this.spaces[K].toXYZ),Z.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")Z.r=D6(Z.r),Z.g=D6(Z.g),Z.b=D6(Z.b);return Z},workingToColorSpace:function(Z,K){return this.convert(Z,this.workingColorSpace,K)},colorSpaceToWorking:function(Z,K){return this.convert(Z,K,this.workingColorSpace)},getPrimaries:function(Z){return this.spaces[Z].primaries},getTransfer:function(Z){if(Z==="")return"linear";return this.spaces[Z].transfer},getToneMappingMode:function(Z){return this.spaces[Z].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(Z,K=this.workingColorSpace){return Z.fromArray(this.spaces[K].luminanceCoefficients)},define:function(Z){Object.assign(this.spaces,Z)},_getMatrix:function(Z,K,H){return Z.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(Z){return this.spaces[Z].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(Z=this.workingColorSpace){return this.spaces[Z].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(Z,K){return g9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(Z,K)},toWorkingColorSpace:function(Z,K){return g9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(Z,K)}},$=[0.64,0.33,0.3,0.6,0.15,0.06],Q=[0.2126,0.7152,0.0722],W=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:$,whitePoint:W,transfer:"linear",toXYZ:cQ,fromXYZ:nQ,luminanceCoefficients:Q,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:$,whitePoint:W,transfer:"srgb",toXYZ:cQ,fromXYZ:nQ,luminanceCoefficients:Q,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var g0=vK();function E9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function D6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var Q6;class p${static getDataURL(J,$="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let Q;if(J instanceof HTMLCanvasElement)Q=J;else{if(Q6===void 0)Q6=v6("canvas");Q6.width=J.width,Q6.height=J.height;let W=Q6.getContext("2d");if(J instanceof ImageData)W.putImageData(J,0,0);else W.drawImage(J,0,0,J.width,J.height);Q=Q6}return Q.toDataURL($)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let $=v6("canvas");$.width=J.width,$.height=J.height;let Q=$.getContext("2d");Q.drawImage(J,0,0,J.width,J.height);let W=Q.getImageData(0,0,J.width,J.height),Z=W.data;for(let K=0;K<Z.length;K++)Z[K]=E9(Z[K]/255)*255;return Q.putImageData(W,0,0),$}else if(J.data){let $=J.data.slice(0);for(let Q=0;Q<$.length;Q++)if($ instanceof Uint8Array||$ instanceof Uint8ClampedArray)$[Q]=Math.floor(E9($[Q]/255)*255);else $[Q]=E9($[Q]);return{data:$,width:J.width,height:J.height}}else return _0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var fK=0;class p6{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fK++}),this.uuid=g6(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let $=this.data;if(typeof HTMLVideoElement<"u"&&$ instanceof HTMLVideoElement)J.set($.videoWidth,$.videoHeight,0);else if(typeof VideoFrame<"u"&&$ instanceof VideoFrame)J.set($.displayWidth,$.displayHeight,0);else if($!==null)J.set($.width,$.height,$.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let Q={uuid:this.uuid,url:""},W=this.data;if(W!==null){let Z;if(Array.isArray(W)){Z=[];for(let K=0,H=W.length;K<H;K++)if(W[K].isDataTexture)Z.push(RJ(W[K].image));else Z.push(RJ(W[K]))}else Z=RJ(W);Q.url=Z}if(!$)J.images[this.uuid]=Q;return Q}}function RJ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return p$.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return _0("Texture: Unable to serialize Texture."),{}}var yK=0,kJ=new y;class I8 extends D9{constructor(J=I8.DEFAULT_IMAGE,$=I8.DEFAULT_MAPPING,Q=1001,W=1001,Z=1006,K=1008,H=1023,Y=1009,X=I8.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:yK++}),this.uuid=g6(),this.name="",this.source=new p6(J),this.mipmaps=[],this.mapping=$,this.channel=0,this.wrapS=Q,this.wrapT=W,this.magFilter=Z,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new n0(0,0),this.repeat=new n0(1,1),this.center=new n0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new w0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(kJ).x}get height(){return this.source.getSize(kJ).y}get depth(){return this.source.getSize(kJ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let $ in J){let Q=J[$];if(Q===void 0){_0(`Texture.setValues(): parameter '${$}' has value of undefined.`);continue}let W=this[$];if(W===void 0){_0(`Texture.setValues(): property '${$}' does not exist.`);continue}if(W&&Q&&(W.isVector2&&Q.isVector2))W.copy(Q);else if(W&&Q&&(W.isVector3&&Q.isVector3))W.copy(Q);else if(W&&Q&&(W.isMatrix3&&Q.isMatrix3))W.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if(!$&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let Q={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)Q.userData=this.userData;if(!$)J.textures[this.uuid]=Q;return Q}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}I8.DEFAULT_IMAGE=null;I8.DEFAULT_MAPPING=300;I8.DEFAULT_ANISOTROPY=1;class K8{static{K8.prototype.isVector4=!0}constructor(J=0,$=0,Q=0,W=1){this.x=J,this.y=$,this.z=Q,this.w=W}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,$,Q,W){return this.x=J,this.y=$,this.z=Q,this.w=W,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,$){switch(J){case 0:this.x=$;break;case 1:this.y=$;break;case 2:this.z=$;break;case 3:this.w=$;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,$){return this.x=J.x+$.x,this.y=J.y+$.y,this.z=J.z+$.z,this.w=J.w+$.w,this}addScaledVector(J,$){return this.x+=J.x*$,this.y+=J.y*$,this.z+=J.z*$,this.w+=J.w*$,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,$){return this.x=J.x-$.x,this.y=J.y-$.y,this.z=J.z-$.z,this.w=J.w-$.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let $=this.x,Q=this.y,W=this.z,Z=this.w,K=J.elements;return this.x=K[0]*$+K[4]*Q+K[8]*W+K[12]*Z,this.y=K[1]*$+K[5]*Q+K[9]*W+K[13]*Z,this.z=K[2]*$+K[6]*Q+K[10]*W+K[14]*Z,this.w=K[3]*$+K[7]*Q+K[11]*W+K[15]*Z,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let $=Math.sqrt(1-J.w*J.w);if($<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/$,this.y=J.y/$,this.z=J.z/$;return this}setAxisAngleFromRotationMatrix(J){let $,Q,W,Z,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],E=Y[8],N=Y[1],G=Y[5],D=Y[9],R=Y[2],z=Y[6],F=Y[10];if(Math.abs(U-N)<0.01&&Math.abs(E-R)<0.01&&Math.abs(D-z)<0.01){if(Math.abs(U+N)<0.1&&Math.abs(E+R)<0.1&&Math.abs(D+z)<0.1&&Math.abs(X+G+F-3)<0.1)return this.set(1,0,0,0),this;$=Math.PI;let C=(X+1)/2,A=(G+1)/2,V=(F+1)/2,I=(U+N)/4,_=(E+R)/4,w=(D+z)/4;if(C>A&&C>V)if(C<0.01)Q=0,W=0.707106781,Z=0.707106781;else Q=Math.sqrt(C),W=I/Q,Z=_/Q;else if(A>V)if(A<0.01)Q=0.707106781,W=0,Z=0.707106781;else W=Math.sqrt(A),Q=I/W,Z=w/W;else if(V<0.01)Q=0.707106781,W=0.707106781,Z=0;else Z=Math.sqrt(V),Q=_/Z,W=w/Z;return this.set(Q,W,Z,$),this}let q=Math.sqrt((z-D)*(z-D)+(E-R)*(E-R)+(N-U)*(N-U));if(Math.abs(q)<0.001)q=1;return this.x=(z-D)/q,this.y=(E-R)/q,this.z=(N-U)/q,this.w=Math.acos((X+G+F-1)/2),this}setFromMatrixPosition(J){let $=J.elements;return this.x=$[12],this.y=$[13],this.z=$[14],this.w=$[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,$){return this.x=m0(this.x,J.x,$.x),this.y=m0(this.y,J.y,$.y),this.z=m0(this.z,J.z,$.z),this.w=m0(this.w,J.w,$.w),this}clampScalar(J,$){return this.x=m0(this.x,J,$),this.y=m0(this.y,J,$),this.z=m0(this.z,J,$),this.w=m0(this.w,J,$),this}clampLength(J,$){let Q=this.length();return this.divideScalar(Q||1).multiplyScalar(m0(Q,J,$))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,$){return this.x+=(J.x-this.x)*$,this.y+=(J.y-this.y)*$,this.z+=(J.z-this.z)*$,this.w+=(J.w-this.w)*$,this}lerpVectors(J,$,Q){return this.x=J.x+($.x-J.x)*Q,this.y=J.y+($.y-J.y)*Q,this.z=J.z+($.z-J.z)*Q,this.w=J.w+($.w-J.w)*Q,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,$=0){return this.x=J[$],this.y=J[$+1],this.z=J[$+2],this.w=J[$+3],this}toArray(J=[],$=0){return J[$]=this.x,J[$+1]=this.y,J[$+2]=this.z,J[$+3]=this.w,J}fromBufferAttribute(J,$){return this.x=J.getX($),this.y=J.getY($),this.z=J.getZ($),this.w=J.getW($),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class m$ extends D9{constructor(J=1,$=1,Q={}){super();Q=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},Q),this.isRenderTarget=!0,this.width=J,this.height=$,this.depth=Q.depth,this.scissor=new K8(0,0,J,$),this.scissorTest=!1,this.viewport=new K8(0,0,J,$),this.textures=[];let W={width:J,height:$,depth:Q.depth},Z=new I8(W),K=Q.count;for(let H=0;H<K;H++)this.textures[H]=Z.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions(Q),this.depthBuffer=Q.depthBuffer,this.stencilBuffer=Q.stencilBuffer,this.resolveDepthBuffer=Q.resolveDepthBuffer,this.resolveStencilBuffer=Q.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=Q.depthTexture,this.samples=Q.samples,this.multiview=Q.multiview,this.useArrayDepthTexture=Q.useArrayDepthTexture}_setTextureOptions(J={}){let $={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)$.mapping=J.mapping;if(J.wrapS!==void 0)$.wrapS=J.wrapS;if(J.wrapT!==void 0)$.wrapT=J.wrapT;if(J.wrapR!==void 0)$.wrapR=J.wrapR;if(J.magFilter!==void 0)$.magFilter=J.magFilter;if(J.minFilter!==void 0)$.minFilter=J.minFilter;if(J.format!==void 0)$.format=J.format;if(J.type!==void 0)$.type=J.type;if(J.anisotropy!==void 0)$.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)$.colorSpace=J.colorSpace;if(J.flipY!==void 0)$.flipY=J.flipY;if(J.generateMipmaps!==void 0)$.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)$.internalFormat=J.internalFormat;for(let Q=0;Q<this.textures.length;Q++)this.textures[Q].setValues($)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,$,Q=1){if(this.width!==J||this.height!==$||this.depth!==Q){this.width=J,this.height=$,this.depth=Q;for(let W=0,Z=this.textures.length;W<Z;W++)if(this.textures[W].image.width=J,this.textures[W].image.height=$,this.textures[W].image.depth=Q,this.textures[W].isData3DTexture!==!0)this.textures[W].isArrayTexture=this.textures[W].image.depth>1;this.dispose()}this.viewport.set(0,0,J,$),this.scissor.set(0,0,J,$)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let $=0,Q=J.textures.length;$<Q;$++){this.textures[$]=J.textures[$].clone(),this.textures[$].isRenderTargetTexture=!0,this.textures[$].renderTarget=this;let W=Object.assign({},J.textures[$].image);this.textures[$].source=new p6(W)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class c8 extends m${constructor(J=1,$=1,Q={}){super(J,$,Q);this.isWebGLRenderTarget=!0}}class m7 extends I8{constructor(J=null,$=1,Q=1,W=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:$,height:Q,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class l$ extends I8{constructor(J=null,$=1,Q=1,W=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:$,height:Q,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Z8{static{Z8.prototype.isMatrix4=!0}constructor(J,$,Q,W,Z,K,H,Y,X,U,E,N,G,D,R,z){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,$,Q,W,Z,K,H,Y,X,U,E,N,G,D,R,z)}set(J,$,Q,W,Z,K,H,Y,X,U,E,N,G,D,R,z){let F=this.elements;return F[0]=J,F[4]=$,F[8]=Q,F[12]=W,F[1]=Z,F[5]=K,F[9]=H,F[13]=Y,F[2]=X,F[6]=U,F[10]=E,F[14]=N,F[3]=G,F[7]=D,F[11]=R,F[15]=z,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Z8().fromArray(this.elements)}copy(J){let $=this.elements,Q=J.elements;return $[0]=Q[0],$[1]=Q[1],$[2]=Q[2],$[3]=Q[3],$[4]=Q[4],$[5]=Q[5],$[6]=Q[6],$[7]=Q[7],$[8]=Q[8],$[9]=Q[9],$[10]=Q[10],$[11]=Q[11],$[12]=Q[12],$[13]=Q[13],$[14]=Q[14],$[15]=Q[15],this}copyPosition(J){let $=this.elements,Q=J.elements;return $[12]=Q[12],$[13]=Q[13],$[14]=Q[14],this}setFromMatrix3(J){let $=J.elements;return this.set($[0],$[3],$[6],0,$[1],$[4],$[7],0,$[2],$[5],$[8],0,0,0,0,1),this}extractBasis(J,$,Q){if(this.determinantAffine()===0)return J.set(1,0,0),$.set(0,1,0),Q.set(0,0,1),this;return J.setFromMatrixColumn(this,0),$.setFromMatrixColumn(this,1),Q.setFromMatrixColumn(this,2),this}makeBasis(J,$,Q){return this.set(J.x,$.x,Q.x,0,J.y,$.y,Q.y,0,J.z,$.z,Q.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let $=this.elements,Q=J.elements,W=1/W6.setFromMatrixColumn(J,0).length(),Z=1/W6.setFromMatrixColumn(J,1).length(),K=1/W6.setFromMatrixColumn(J,2).length();return $[0]=Q[0]*W,$[1]=Q[1]*W,$[2]=Q[2]*W,$[3]=0,$[4]=Q[4]*Z,$[5]=Q[5]*Z,$[6]=Q[6]*Z,$[7]=0,$[8]=Q[8]*K,$[9]=Q[9]*K,$[10]=Q[10]*K,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromEuler(J){let $=this.elements,Q=J.x,W=J.y,Z=J.z,K=Math.cos(Q),H=Math.sin(Q),Y=Math.cos(W),X=Math.sin(W),U=Math.cos(Z),E=Math.sin(Z);if(J.order==="XYZ"){let N=K*U,G=K*E,D=H*U,R=H*E;$[0]=Y*U,$[4]=-Y*E,$[8]=X,$[1]=G+D*X,$[5]=N-R*X,$[9]=-H*Y,$[2]=R-N*X,$[6]=D+G*X,$[10]=K*Y}else if(J.order==="YXZ"){let N=Y*U,G=Y*E,D=X*U,R=X*E;$[0]=N+R*H,$[4]=D*H-G,$[8]=K*X,$[1]=K*E,$[5]=K*U,$[9]=-H,$[2]=G*H-D,$[6]=R+N*H,$[10]=K*Y}else if(J.order==="ZXY"){let N=Y*U,G=Y*E,D=X*U,R=X*E;$[0]=N-R*H,$[4]=-K*E,$[8]=D+G*H,$[1]=G+D*H,$[5]=K*U,$[9]=R-N*H,$[2]=-K*X,$[6]=H,$[10]=K*Y}else if(J.order==="ZYX"){let N=K*U,G=K*E,D=H*U,R=H*E;$[0]=Y*U,$[4]=D*X-G,$[8]=N*X+R,$[1]=Y*E,$[5]=R*X+N,$[9]=G*X-D,$[2]=-X,$[6]=H*Y,$[10]=K*Y}else if(J.order==="YZX"){let N=K*Y,G=K*X,D=H*Y,R=H*X;$[0]=Y*U,$[4]=R-N*E,$[8]=D*E+G,$[1]=E,$[5]=K*U,$[9]=-H*U,$[2]=-X*U,$[6]=G*E+D,$[10]=N-R*E}else if(J.order==="XZY"){let N=K*Y,G=K*X,D=H*Y,R=H*X;$[0]=Y*U,$[4]=-E,$[8]=X*U,$[1]=N*E+R,$[5]=K*U,$[9]=G*E-D,$[2]=D*E-G,$[6]=H*U,$[10]=R*E+N}return $[3]=0,$[7]=0,$[11]=0,$[12]=0,$[13]=0,$[14]=0,$[15]=1,this}makeRotationFromQuaternion(J){return this.compose(hK,J,bK)}lookAt(J,$,Q){let W=this.elements;if(j8.subVectors(J,$),j8.lengthSq()===0)j8.z=1;if(j8.normalize(),V9.crossVectors(Q,j8),V9.lengthSq()===0){if(Math.abs(Q.z)===1)j8.x+=0.0001;else j8.z+=0.0001;j8.normalize(),V9.crossVectors(Q,j8)}return V9.normalize(),e6.crossVectors(j8,V9),W[0]=V9.x,W[4]=e6.x,W[8]=j8.x,W[1]=V9.y,W[5]=e6.y,W[9]=j8.y,W[2]=V9.z,W[6]=e6.z,W[10]=j8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,$){let Q=J.elements,W=$.elements,Z=this.elements,K=Q[0],H=Q[4],Y=Q[8],X=Q[12],U=Q[1],E=Q[5],N=Q[9],G=Q[13],D=Q[2],R=Q[6],z=Q[10],F=Q[14],q=Q[3],C=Q[7],A=Q[11],V=Q[15],I=W[0],_=W[4],w=W[8],M=W[12],B=W[1],d=W[5],P=W[9],b=W[13],o=W[2],g=W[6],c=W[10],p=W[14],f=W[3],a=W[7],e=W[11],J0=W[15];return Z[0]=K*I+H*B+Y*o+X*f,Z[4]=K*_+H*d+Y*g+X*a,Z[8]=K*w+H*P+Y*c+X*e,Z[12]=K*M+H*b+Y*p+X*J0,Z[1]=U*I+E*B+N*o+G*f,Z[5]=U*_+E*d+N*g+G*a,Z[9]=U*w+E*P+N*c+G*e,Z[13]=U*M+E*b+N*p+G*J0,Z[2]=D*I+R*B+z*o+F*f,Z[6]=D*_+R*d+z*g+F*a,Z[10]=D*w+R*P+z*c+F*e,Z[14]=D*M+R*b+z*p+F*J0,Z[3]=q*I+C*B+A*o+V*f,Z[7]=q*_+C*d+A*g+V*a,Z[11]=q*w+C*P+A*c+V*e,Z[15]=q*M+C*b+A*p+V*J0,this}multiplyScalar(J){let $=this.elements;return $[0]*=J,$[4]*=J,$[8]*=J,$[12]*=J,$[1]*=J,$[5]*=J,$[9]*=J,$[13]*=J,$[2]*=J,$[6]*=J,$[10]*=J,$[14]*=J,$[3]*=J,$[7]*=J,$[11]*=J,$[15]*=J,this}determinant(){let J=this.elements,$=J[0],Q=J[4],W=J[8],Z=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],E=J[6],N=J[10],G=J[14],D=J[3],R=J[7],z=J[11],F=J[15],q=Y*G-X*N,C=H*G-X*E,A=H*N-Y*E,V=K*G-X*U,I=K*N-Y*U,_=K*E-H*U;return $*(R*q-z*C+F*A)-Q*(D*q-z*V+F*I)+W*(D*C-R*V+F*_)-Z*(D*A-R*I+z*_)}determinantAffine(){let J=this.elements,$=J[0],Q=J[4],W=J[8],Z=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return $*(K*U-H*X)-Q*(Z*U-H*Y)+W*(Z*X-K*Y)}transpose(){let J=this.elements,$;return $=J[1],J[1]=J[4],J[4]=$,$=J[2],J[2]=J[8],J[8]=$,$=J[6],J[6]=J[9],J[9]=$,$=J[3],J[3]=J[12],J[12]=$,$=J[7],J[7]=J[13],J[13]=$,$=J[11],J[11]=J[14],J[14]=$,this}setPosition(J,$,Q){let W=this.elements;if(J.isVector3)W[12]=J.x,W[13]=J.y,W[14]=J.z;else W[12]=J,W[13]=$,W[14]=Q;return this}invert(){let J=this.elements,$=J[0],Q=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=J[9],N=J[10],G=J[11],D=J[12],R=J[13],z=J[14],F=J[15],q=$*H-Q*K,C=$*Y-W*K,A=$*X-Z*K,V=Q*Y-W*H,I=Q*X-Z*H,_=W*X-Z*Y,w=U*R-E*D,M=U*z-N*D,B=U*F-G*D,d=E*z-N*R,P=E*F-G*R,b=N*F-G*z,o=q*b-C*P+A*d+V*B-I*M+_*w;if(o===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let g=1/o;return J[0]=(H*b-Y*P+X*d)*g,J[1]=(W*P-Q*b-Z*d)*g,J[2]=(R*_-z*I+F*V)*g,J[3]=(N*I-E*_-G*V)*g,J[4]=(Y*B-K*b-X*M)*g,J[5]=($*b-W*B+Z*M)*g,J[6]=(z*A-D*_-F*C)*g,J[7]=(U*_-N*A+G*C)*g,J[8]=(K*P-H*B+X*w)*g,J[9]=(Q*B-$*P-Z*w)*g,J[10]=(D*I-R*A+F*q)*g,J[11]=(E*A-U*I-G*q)*g,J[12]=(H*M-K*d-Y*w)*g,J[13]=($*d-Q*M+W*w)*g,J[14]=(R*C-D*V-z*q)*g,J[15]=(U*V-E*C+N*q)*g,this}scale(J){let $=this.elements,Q=J.x,W=J.y,Z=J.z;return $[0]*=Q,$[4]*=W,$[8]*=Z,$[1]*=Q,$[5]*=W,$[9]*=Z,$[2]*=Q,$[6]*=W,$[10]*=Z,$[3]*=Q,$[7]*=W,$[11]*=Z,this}getMaxScaleOnAxis(){let J=this.elements,$=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],Q=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],W=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max($,Q,W))}makeTranslation(J,$,Q){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,$,0,0,1,Q,0,0,0,1);return this}makeRotationX(J){let $=Math.cos(J),Q=Math.sin(J);return this.set(1,0,0,0,0,$,-Q,0,0,Q,$,0,0,0,0,1),this}makeRotationY(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,0,Q,0,0,1,0,0,-Q,0,$,0,0,0,0,1),this}makeRotationZ(J){let $=Math.cos(J),Q=Math.sin(J);return this.set($,-Q,0,0,Q,$,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,$){let Q=Math.cos($),W=Math.sin($),Z=1-Q,K=J.x,H=J.y,Y=J.z,X=Z*K,U=Z*H;return this.set(X*K+Q,X*H-W*Y,X*Y+W*H,0,X*H+W*Y,U*H+Q,U*Y-W*K,0,X*Y-W*H,U*Y+W*K,Z*Y*Y+Q,0,0,0,0,1),this}makeScale(J,$,Q){return this.set(J,0,0,0,0,$,0,0,0,0,Q,0,0,0,0,1),this}makeShear(J,$,Q,W,Z,K){return this.set(1,Q,Z,0,J,1,K,0,$,W,1,0,0,0,0,1),this}compose(J,$,Q){let W=this.elements,Z=$._x,K=$._y,H=$._z,Y=$._w,X=Z+Z,U=K+K,E=H+H,N=Z*X,G=Z*U,D=Z*E,R=K*U,z=K*E,F=H*E,q=Y*X,C=Y*U,A=Y*E,V=Q.x,I=Q.y,_=Q.z;return W[0]=(1-(R+F))*V,W[1]=(G+A)*V,W[2]=(D-C)*V,W[3]=0,W[4]=(G-A)*I,W[5]=(1-(N+F))*I,W[6]=(z+q)*I,W[7]=0,W[8]=(D+C)*_,W[9]=(z-q)*_,W[10]=(1-(N+R))*_,W[11]=0,W[12]=J.x,W[13]=J.y,W[14]=J.z,W[15]=1,this}decompose(J,$,Q){let W=this.elements;J.x=W[12],J.y=W[13],J.z=W[14];let Z=this.determinantAffine();if(Z===0)return Q.set(1,1,1),$.identity(),this;let K=W6.set(W[0],W[1],W[2]).length(),H=W6.set(W[4],W[5],W[6]).length(),Y=W6.set(W[8],W[9],W[10]).length();if(Z<0)K=-K;s8.copy(this);let X=1/K,U=1/H,E=1/Y;return s8.elements[0]*=X,s8.elements[1]*=X,s8.elements[2]*=X,s8.elements[4]*=U,s8.elements[5]*=U,s8.elements[6]*=U,s8.elements[8]*=E,s8.elements[9]*=E,s8.elements[10]*=E,$.setFromRotationMatrix(s8),Q.x=K,Q.y=H,Q.z=Y,this}makePerspective(J,$,Q,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2*Z/($-J),E=2*Z/(Q-W),N=($+J)/($-J),G=(Q+W)/(Q-W),D,R;if(Y)D=Z/(K-Z),R=K*Z/(K-Z);else if(H===2000)D=-(K+Z)/(K-Z),R=-2*K*Z/(K-Z);else if(H===2001)D=-K/(K-Z),R=-K*Z/(K-Z);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=N,X[12]=0,X[1]=0,X[5]=E,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=D,X[14]=R,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,$,Q,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2/($-J),E=2/(Q-W),N=-($+J)/($-J),G=-(Q+W)/(Q-W),D,R;if(Y)D=1/(K-Z),R=K/(K-Z);else if(H===2000)D=-2/(K-Z),R=-(K+Z)/(K-Z);else if(H===2001)D=-1/(K-Z),R=-Z/(K-Z);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=N,X[1]=0,X[5]=E,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=D,X[14]=R,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let $=this.elements,Q=J.elements;for(let W=0;W<16;W++)if($[W]!==Q[W])return!1;return!0}fromArray(J,$=0){for(let Q=0;Q<16;Q++)this.elements[Q]=J[Q+$];return this}toArray(J=[],$=0){let Q=this.elements;return J[$]=Q[0],J[$+1]=Q[1],J[$+2]=Q[2],J[$+3]=Q[3],J[$+4]=Q[4],J[$+5]=Q[5],J[$+6]=Q[6],J[$+7]=Q[7],J[$+8]=Q[8],J[$+9]=Q[9],J[$+10]=Q[10],J[$+11]=Q[11],J[$+12]=Q[12],J[$+13]=Q[13],J[$+14]=Q[14],J[$+15]=Q[15],J}}var W6=new y,s8=new Z8,hK=new y(0,0,0),bK=new y(1,1,1),V9=new y,e6=new y,j8=new y,sQ=new Z8,iQ=new O9;class A9{constructor(J=0,$=0,Q=0,W=A9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=$,this._z=Q,this._order=W}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,$,Q,W=this._order){return this._x=J,this._y=$,this._z=Q,this._order=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,$=this._order,Q=!0){let W=J.elements,Z=W[0],K=W[4],H=W[8],Y=W[1],X=W[5],U=W[9],E=W[2],N=W[6],G=W[10];switch($){case"XYZ":if(this._y=Math.asin(m0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,Z);else this._x=Math.atan2(N,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-m0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-E,Z),this._z=0;break;case"ZXY":if(this._x=Math.asin(m0(N,-1,1)),Math.abs(N)<0.9999999)this._y=Math.atan2(-E,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,Z);break;case"ZYX":if(this._y=Math.asin(-m0(E,-1,1)),Math.abs(E)<0.9999999)this._x=Math.atan2(N,G),this._z=Math.atan2(Y,Z);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(m0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-E,Z);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-m0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(N,X),this._y=Math.atan2(H,Z);else this._x=Math.atan2(-U,G),this._y=0;break;default:_0("Euler: .setFromRotationMatrix() encountered an unknown order: "+$)}if(this._order=$,Q===!0)this._onChangeCallback();return this}setFromQuaternion(J,$,Q){return sQ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(sQ,$,Q)}setFromVector3(J,$=this._order){return this.set(J.x,J.y,J.z,$)}reorder(J){return iQ.setFromEuler(this),this.setFromQuaternion(iQ,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],$=0){return J[$]=this._x,J[$+1]=this._y,J[$+2]=this._z,J[$+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}A9.DEFAULT_ORDER="XYZ";class l7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var xK=0,oQ=new y,Z6=new O9,H9=new Z8,J7=new y,P6=new y,gK=new y,pK=new O9,aQ=new y(1,0,0),rQ=new y(0,1,0),tQ=new y(0,0,1),eQ={type:"added"},mK={type:"removed"},K6={type:"childadded",child:null},LJ={type:"childremoved",child:null};class C8 extends D9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:xK++}),this.uuid=g6(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=C8.DEFAULT_UP.clone();let J=new y,$=new A9,Q=new O9,W=new y(1,1,1);function Z(){Q.setFromEuler($,!1)}function K(){$.setFromQuaternion(Q,void 0,!1)}$._onChange(Z),Q._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:$},quaternion:{configurable:!0,enumerable:!0,value:Q},scale:{configurable:!0,enumerable:!0,value:W},modelViewMatrix:{value:new Z8},normalMatrix:{value:new w0}}),this.matrix=new Z8,this.matrixWorld=new Z8,this.matrixAutoUpdate=C8.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=C8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new l7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,$){this.quaternion.setFromAxisAngle(J,$)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,$){return Z6.setFromAxisAngle(J,$),this.quaternion.multiply(Z6),this}rotateOnWorldAxis(J,$){return Z6.setFromAxisAngle(J,$),this.quaternion.premultiply(Z6),this}rotateX(J){return this.rotateOnAxis(aQ,J)}rotateY(J){return this.rotateOnAxis(rQ,J)}rotateZ(J){return this.rotateOnAxis(tQ,J)}translateOnAxis(J,$){return oQ.copy(J).applyQuaternion(this.quaternion),this.position.add(oQ.multiplyScalar($)),this}translateX(J){return this.translateOnAxis(aQ,J)}translateY(J){return this.translateOnAxis(rQ,J)}translateZ(J){return this.translateOnAxis(tQ,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(H9.copy(this.matrixWorld).invert())}lookAt(J,$,Q){if(J.isVector3)J7.copy(J);else J7.set(J,$,Q);let W=this.parent;if(this.updateWorldMatrix(!0,!1),P6.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)H9.lookAt(P6,J7,this.up);else H9.lookAt(J7,P6,this.up);if(this.quaternion.setFromRotationMatrix(H9),W)H9.extractRotation(W.matrixWorld),Z6.setFromRotationMatrix(H9),this.quaternion.premultiply(Z6.invert())}add(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.add(arguments[$]);return this}if(J===this)return P0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(eQ),K6.child=J,this.dispatchEvent(K6),K6.child=null;else P0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.remove(arguments[Q]);return this}let $=this.children.indexOf(J);if($!==-1)J.parent=null,this.children.splice($,1),J.dispatchEvent(mK),LJ.child=J,this.dispatchEvent(LJ),LJ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),H9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),H9.multiply(J.parent.matrixWorld);return J.applyMatrix4(H9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(eQ),K6.child=J,this.dispatchEvent(K6),K6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,$){if(this[J]===$)return this;for(let Q=0,W=this.children.length;Q<W;Q++){let K=this.children[Q].getObjectByProperty(J,$);if(K!==void 0)return K}return}getObjectsByProperty(J,$,Q=[]){if(this[J]===$)Q.push(this);let W=this.children;for(let Z=0,K=W.length;Z<K;Z++)W[Z].getObjectsByProperty(J,$,Q);return Q}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(P6,J,gK),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(P6,pK,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let $=this.matrixWorld.elements;return J.set($[8],$[9],$[10]).normalize()}raycast(){}traverse(J){J(this);let $=this.children;for(let Q=0,W=$.length;Q<W;Q++)$[Q].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let $=this.children;for(let Q=0,W=$.length;Q<W;Q++)$[Q].traverseVisible(J)}traverseAncestors(J){let $=this.parent;if($!==null)J($),$.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:$,y:Q,z:W}=J,Z=this.matrix.elements;Z[12]+=$-Z[0]*$-Z[4]*Q-Z[8]*W,Z[13]+=Q-Z[1]*$-Z[5]*Q-Z[9]*W,Z[14]+=W-Z[2]*$-Z[6]*Q-Z[10]*W}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let $=this.children;for(let Q=0,W=$.length;Q<W;Q++)$[Q].updateMatrixWorld(J)}updateWorldMatrix(J,$,Q=!1){let W=this.parent;if(J===!0&&W!==null)W.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||Q){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,Q=!0}if($===!0){let Z=this.children;for(let K=0,H=Z.length;K<H;K++)Z[K].updateWorldMatrix(!1,!0,Q)}}toJSON(J){let $=J===void 0||typeof J==="string",Q={};if($)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},Q.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let W={};if(W.uuid=this.uuid,W.type=this.type,this.name!=="")W.name=this.name;if(this.castShadow===!0)W.castShadow=!0;if(this.receiveShadow===!0)W.receiveShadow=!0;if(this.visible===!1)W.visible=!1;if(this.frustumCulled===!1)W.frustumCulled=!1;if(this.renderOrder!==0)W.renderOrder=this.renderOrder;if(this.static!==!1)W.static=this.static;if(Object.keys(this.userData).length>0)W.userData=this.userData;if(W.layers=this.layers.mask,W.matrix=this.matrix.toArray(),W.up=this.up.toArray(),this.pivot!==null)W.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)W.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)W.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)W.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(W.type="InstancedMesh",W.count=this.count,W.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)W.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(W.type="BatchedMesh",W.perObjectFrustumCulled=this.perObjectFrustumCulled,W.sortObjects=this.sortObjects,W.drawRanges=this._drawRanges,W.reservedRanges=this._reservedRanges,W.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),W.instanceInfo=this._instanceInfo.map((H)=>({...H})),W.availableInstanceIds=this._availableInstanceIds.slice(),W.availableGeometryIds=this._availableGeometryIds.slice(),W.nextIndexStart=this._nextIndexStart,W.nextVertexStart=this._nextVertexStart,W.geometryCount=this._geometryCount,W.maxInstanceCount=this._maxInstanceCount,W.maxVertexCount=this._maxVertexCount,W.maxIndexCount=this._maxIndexCount,W.geometryInitialized=this._geometryInitialized,W.matricesTexture=this._matricesTexture.toJSON(J),W.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)W.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)W.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)W.boundingBox=this.boundingBox.toJSON()}function Z(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)W.background=this.background.toJSON();else if(this.background.isTexture)W.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)W.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){W.geometry=Z(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let E=Y[X];Z(J.shapes,E)}else Z(J.shapes,Y)}}if(this.isSkinnedMesh){if(W.bindMode=this.bindMode,W.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)Z(J.skeletons,this.skeleton),W.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(Z(J.materials,this.material[Y]));W.material=H}else W.material=Z(J.materials,this.material);if(this.children.length>0){W.children=[];for(let H=0;H<this.children.length;H++)W.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){W.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];W.animations.push(Z(J.animations,Y))}}if($){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),E=K(J.shapes),N=K(J.skeletons),G=K(J.animations),D=K(J.nodes);if(H.length>0)Q.geometries=H;if(Y.length>0)Q.materials=Y;if(X.length>0)Q.textures=X;if(U.length>0)Q.images=U;if(E.length>0)Q.shapes=E;if(N.length>0)Q.skeletons=N;if(G.length>0)Q.animations=G;if(D.length>0)Q.nodes=D}return Q.object=W,Q;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,$=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),$===!0)for(let Q=0;Q<J.children.length;Q++){let W=J.children[Q];this.add(W.clone())}return this}}C8.DEFAULT_UP=new y(0,1,0);C8.DEFAULT_MATRIX_AUTO_UPDATE=!0;C8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class F6 extends C8{constructor(){super();this.isGroup=!0,this.type="Group"}}var lK={type:"move"};class m6{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new F6,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new F6,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new y;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new F6,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new y,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let $=this._hand;if($)for(let Q of J.hand.values())this._getHandJoint($,Q)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,$,Q){let W=null,Z=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&$.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let R of J.hand.values()){let z=$.getJointPose(R,Q),F=this._getHandJoint(X,R);if(z!==null)F.matrix.fromArray(z.transform.matrix),F.matrix.decompose(F.position,F.rotation,F.scale),F.matrixWorldNeedsUpdate=!0,F.jointRadius=z.radius;F.visible=z!==null}let U=X.joints["index-finger-tip"],E=X.joints["thumb-tip"],N=U.position.distanceTo(E.position),G=0.02,D=0.005;if(X.inputState.pinching&&N>G+D)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&N<=G-D)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(Z=$.getPose(J.gripSpace,Q),Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(W=$.getPose(J.targetRaySpace,Q),W===null&&Z!==null)W=Z;if(W!==null){if(H.matrix.fromArray(W.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,W.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(W.linearVelocity);else H.hasLinearVelocity=!1;if(W.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(W.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(lK)}}}if(H!==null)H.visible=W!==null;if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,$){if(J.joints[$.jointName]===void 0){let Q=new F6;Q.matrixAutoUpdate=!1,Q.visible=!1,J.joints[$.jointName]=Q,J.add(Q)}return J.joints[$.jointName]}}var EZ={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},B9={h:0,s:0,l:0},$7={h:0,s:0,l:0};function VJ(J,$,Q){if(Q<0)Q+=1;if(Q>1)Q-=1;if(Q<0.16666666666666666)return J+($-J)*6*Q;if(Q<0.5)return $;if(Q<0.6666666666666666)return J+($-J)*6*(0.6666666666666666-Q);return J}class p0{constructor(J,$,Q){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,$,Q)}set(J,$,Q){if($===void 0&&Q===void 0){let W=J;if(W&&W.isColor)this.copy(W);else if(typeof W==="number")this.setHex(W);else if(typeof W==="string")this.setStyle(W)}else this.setRGB(J,$,Q);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,$="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,g0.colorSpaceToWorking(this,$),this}setRGB(J,$,Q,W=g0.workingColorSpace){return this.r=J,this.g=$,this.b=Q,g0.colorSpaceToWorking(this,W),this}setHSL(J,$,Q,W=g0.workingColorSpace){if(J=jK(J,1),$=m0($,0,1),Q=m0(Q,0,1),$===0)this.r=this.g=this.b=Q;else{let Z=Q<=0.5?Q*(1+$):Q+$-Q*$,K=2*Q-Z;this.r=VJ(K,Z,J+0.3333333333333333),this.g=VJ(K,Z,J),this.b=VJ(K,Z,J-0.3333333333333333)}return g0.colorSpaceToWorking(this,W),this}setStyle(J,$="srgb"){function Q(Z){if(Z===void 0)return;if(parseFloat(Z)<1)_0("Color: Alpha component of "+J+" will be ignored.")}let W;if(W=/^(\w+)\(([^\)]*)\)/.exec(J)){let Z,K=W[1],H=W[2];switch(K){case"rgb":case"rgba":if(Z=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(Z[4]),this.setRGB(Math.min(255,parseInt(Z[1],10))/255,Math.min(255,parseInt(Z[2],10))/255,Math.min(255,parseInt(Z[3],10))/255,$);if(Z=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(Z[4]),this.setRGB(Math.min(100,parseInt(Z[1],10))/100,Math.min(100,parseInt(Z[2],10))/100,Math.min(100,parseInt(Z[3],10))/100,$);break;case"hsl":case"hsla":if(Z=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return Q(Z[4]),this.setHSL(parseFloat(Z[1])/360,parseFloat(Z[2])/100,parseFloat(Z[3])/100,$);break;default:_0("Color: Unknown color model "+J)}}else if(W=/^\#([A-Fa-f\d]+)$/.exec(J)){let Z=W[1],K=Z.length;if(K===3)return this.setRGB(parseInt(Z.charAt(0),16)/15,parseInt(Z.charAt(1),16)/15,parseInt(Z.charAt(2),16)/15,$);else if(K===6)return this.setHex(parseInt(Z,16),$);else _0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,$);return this}setColorName(J,$="srgb"){let Q=EZ[J.toLowerCase()];if(Q!==void 0)this.setHex(Q,$);else _0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=E9(J.r),this.g=E9(J.g),this.b=E9(J.b),this}copyLinearToSRGB(J){return this.r=D6(J.r),this.g=D6(J.g),this.b=D6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return g0.workingToColorSpace(z8.copy(this),J),Math.round(m0(z8.r*255,0,255))*65536+Math.round(m0(z8.g*255,0,255))*256+Math.round(m0(z8.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,$=g0.workingColorSpace){g0.workingToColorSpace(z8.copy(this),$);let{r:Q,g:W,b:Z}=z8,K=Math.max(Q,W,Z),H=Math.min(Q,W,Z),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let E=K-H;switch(X=U<=0.5?E/(K+H):E/(2-K-H),K){case Q:Y=(W-Z)/E+(W<Z?6:0);break;case W:Y=(Z-Q)/E+2;break;case Z:Y=(Q-W)/E+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,$=g0.workingColorSpace){return g0.workingToColorSpace(z8.copy(this),$),J.r=z8.r,J.g=z8.g,J.b=z8.b,J}getStyle(J="srgb"){g0.workingToColorSpace(z8.copy(this),J);let{r:$,g:Q,b:W}=z8;if(J!=="srgb")return`color(${J} ${$.toFixed(3)} ${Q.toFixed(3)} ${W.toFixed(3)})`;return`rgb(${Math.round($*255)},${Math.round(Q*255)},${Math.round(W*255)})`}offsetHSL(J,$,Q){return this.getHSL(B9),this.setHSL(B9.h+J,B9.s+$,B9.l+Q)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,$){return this.r=J.r+$.r,this.g=J.g+$.g,this.b=J.b+$.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,$){return this.r+=(J.r-this.r)*$,this.g+=(J.g-this.g)*$,this.b+=(J.b-this.b)*$,this}lerpColors(J,$,Q){return this.r=J.r+($.r-J.r)*Q,this.g=J.g+($.g-J.g)*Q,this.b=J.b+($.b-J.b)*Q,this}lerpHSL(J,$){this.getHSL(B9),J.getHSL($7);let Q=DJ(B9.h,$7.h,$),W=DJ(B9.s,$7.s,$),Z=DJ(B9.l,$7.l,$);return this.setHSL(Q,W,Z),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let $=this.r,Q=this.g,W=this.b,Z=J.elements;return this.r=Z[0]*$+Z[3]*Q+Z[6]*W,this.g=Z[1]*$+Z[4]*Q+Z[7]*W,this.b=Z[2]*$+Z[5]*Q+Z[8]*W,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,$=0){return this.r=J[$],this.g=J[$+1],this.b=J[$+2],this}toArray(J=[],$=0){return J[$]=this.r,J[$+1]=this.g,J[$+2]=this.b,J}fromBufferAttribute(J,$){return this.r=J.getX($),this.g=J.getY($),this.b=J.getZ($),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var z8=new p0;p0.NAMES=EZ;class d7 extends C8{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new A9,this.environmentIntensity=1,this.environmentRotation=new A9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,$){if(super.copy(J,$),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let $=super.toJSON(J);if(this.fog!==null)$.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)$.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)$.object.backgroundIntensity=this.backgroundIntensity;if($.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)$.object.environmentIntensity=this.environmentIntensity;return $.object.environmentRotation=this.environmentRotation.toArray(),$}}var i8=new y,Y9=new y,BJ=new y,X9=new y,H6=new y,Y6=new y,JW=new y,zJ=new y,IJ=new y,CJ=new y,_J=new K8,AJ=new K8,PJ=new K8;class u8{constructor(J=new y,$=new y,Q=new y){this.a=J,this.b=$,this.c=Q}static getNormal(J,$,Q,W){W.subVectors(Q,$),i8.subVectors(J,$),W.cross(i8);let Z=W.lengthSq();if(Z>0)return W.multiplyScalar(1/Math.sqrt(Z));return W.set(0,0,0)}static getBarycoord(J,$,Q,W,Z){i8.subVectors(W,$),Y9.subVectors(Q,$),BJ.subVectors(J,$);let K=i8.dot(i8),H=i8.dot(Y9),Y=i8.dot(BJ),X=Y9.dot(Y9),U=Y9.dot(BJ),E=K*X-H*H;if(E===0)return Z.set(0,0,0),null;let N=1/E,G=(X*Y-H*U)*N,D=(K*U-H*Y)*N;return Z.set(1-G-D,D,G)}static containsPoint(J,$,Q,W){if(this.getBarycoord(J,$,Q,W,X9)===null)return!1;return X9.x>=0&&X9.y>=0&&X9.x+X9.y<=1}static getInterpolation(J,$,Q,W,Z,K,H,Y){if(this.getBarycoord(J,$,Q,W,X9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(Z,X9.x),Y.addScaledVector(K,X9.y),Y.addScaledVector(H,X9.z),Y}static getInterpolatedAttribute(J,$,Q,W,Z,K){return _J.setScalar(0),AJ.setScalar(0),PJ.setScalar(0),_J.fromBufferAttribute(J,$),AJ.fromBufferAttribute(J,Q),PJ.fromBufferAttribute(J,W),K.setScalar(0),K.addScaledVector(_J,Z.x),K.addScaledVector(AJ,Z.y),K.addScaledVector(PJ,Z.z),K}static isFrontFacing(J,$,Q,W){return i8.subVectors(Q,$),Y9.subVectors(J,$),i8.cross(Y9).dot(W)<0}set(J,$,Q){return this.a.copy(J),this.b.copy($),this.c.copy(Q),this}setFromPointsAndIndices(J,$,Q,W){return this.a.copy(J[$]),this.b.copy(J[Q]),this.c.copy(J[W]),this}setFromAttributeAndIndices(J,$,Q,W){return this.a.fromBufferAttribute(J,$),this.b.fromBufferAttribute(J,Q),this.c.fromBufferAttribute(J,W),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return i8.subVectors(this.c,this.b),Y9.subVectors(this.a,this.b),i8.cross(Y9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return u8.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,$){return u8.getBarycoord(J,this.a,this.b,this.c,$)}getInterpolation(J,$,Q,W,Z){return u8.getInterpolation(J,this.a,this.b,this.c,$,Q,W,Z)}containsPoint(J){return u8.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return u8.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,$){let Q=this.a,W=this.b,Z=this.c,K,H;H6.subVectors(W,Q),Y6.subVectors(Z,Q),zJ.subVectors(J,Q);let Y=H6.dot(zJ),X=Y6.dot(zJ);if(Y<=0&&X<=0)return $.copy(Q);IJ.subVectors(J,W);let U=H6.dot(IJ),E=Y6.dot(IJ);if(U>=0&&E<=U)return $.copy(W);let N=Y*E-U*X;if(N<=0&&Y>=0&&U<=0)return K=Y/(Y-U),$.copy(Q).addScaledVector(H6,K);CJ.subVectors(J,Z);let G=H6.dot(CJ),D=Y6.dot(CJ);if(D>=0&&G<=D)return $.copy(Z);let R=G*X-Y*D;if(R<=0&&X>=0&&D<=0)return H=X/(X-D),$.copy(Q).addScaledVector(Y6,H);let z=U*D-G*E;if(z<=0&&E-U>=0&&G-D>=0)return JW.subVectors(Z,W),H=(E-U)/(E-U+(G-D)),$.copy(W).addScaledVector(JW,H);let F=1/(z+R+N);return K=R*F,H=N*F,$.copy(Q).addScaledVector(H6,K).addScaledVector(Y6,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class n9{constructor(J=new y(1/0,1/0,1/0),$=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=$}set(J,$){return this.min.copy(J),this.max.copy($),this}setFromArray(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$+=3)this.expandByPoint(o8.fromArray(J,$));return this}setFromBufferAttribute(J){this.makeEmpty();for(let $=0,Q=J.count;$<Q;$++)this.expandByPoint(o8.fromBufferAttribute(J,$));return this}setFromPoints(J){this.makeEmpty();for(let $=0,Q=J.length;$<Q;$++)this.expandByPoint(J[$]);return this}setFromCenterAndSize(J,$){let Q=o8.copy($).multiplyScalar(0.5);return this.min.copy(J).sub(Q),this.max.copy(J).add(Q),this}setFromObject(J,$=!1){return this.makeEmpty(),this.expandByObject(J,$)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,$=!1){J.updateWorldMatrix(!1,!1);let Q=J.geometry;if(Q!==void 0){let Z=Q.getAttribute("position");if($===!0&&Z!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=Z.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,o8);else o8.fromBufferAttribute(Z,K);o8.applyMatrix4(J.matrixWorld),this.expandByPoint(o8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();Q7.copy(J.boundingBox)}else{if(Q.boundingBox===null)Q.computeBoundingBox();Q7.copy(Q.boundingBox)}Q7.applyMatrix4(J.matrixWorld),this.union(Q7)}}let W=J.children;for(let Z=0,K=W.length;Z<K;Z++)this.expandByObject(W[Z],$);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,$){return $.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,o8),o8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let $,Q;if(J.normal.x>0)$=J.normal.x*this.min.x,Q=J.normal.x*this.max.x;else $=J.normal.x*this.max.x,Q=J.normal.x*this.min.x;if(J.normal.y>0)$+=J.normal.y*this.min.y,Q+=J.normal.y*this.max.y;else $+=J.normal.y*this.max.y,Q+=J.normal.y*this.min.y;if(J.normal.z>0)$+=J.normal.z*this.min.z,Q+=J.normal.z*this.max.z;else $+=J.normal.z*this.max.z,Q+=J.normal.z*this.min.z;return $<=-J.constant&&Q>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(w6),W7.subVectors(this.max,w6),X6.subVectors(J.a,w6),U6.subVectors(J.b,w6),G6.subVectors(J.c,w6),z9.subVectors(U6,X6),I9.subVectors(G6,U6),y9.subVectors(X6,G6);let $=[0,-z9.z,z9.y,0,-I9.z,I9.y,0,-y9.z,y9.y,z9.z,0,-z9.x,I9.z,0,-I9.x,y9.z,0,-y9.x,-z9.y,z9.x,0,-I9.y,I9.x,0,-y9.y,y9.x,0];if(!wJ($,X6,U6,G6,W7))return!1;if($=[1,0,0,0,1,0,0,0,1],!wJ($,X6,U6,G6,W7))return!1;return Z7.crossVectors(z9,I9),$=[Z7.x,Z7.y,Z7.z],wJ($,X6,U6,G6,W7)}clampPoint(J,$){return $.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,o8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(o8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return U9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),U9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),U9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),U9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),U9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),U9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),U9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),U9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(U9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var U9=[new y,new y,new y,new y,new y,new y,new y,new y],o8=new y,Q7=new n9,X6=new y,U6=new y,G6=new y,z9=new y,I9=new y,y9=new y,w6=new y,W7=new y,Z7=new y,h9=new y;function wJ(J,$,Q,W,Z){for(let K=0,H=J.length-3;K<=H;K+=3){h9.fromArray(J,K);let Y=Z.x*Math.abs(h9.x)+Z.y*Math.abs(h9.y)+Z.z*Math.abs(h9.z),X=$.dot(h9),U=Q.dot(h9),E=W.dot(h9);if(Math.max(-Math.max(X,U,E),Math.min(X,U,E))>Y)return!1}return!0}var N8=new y,K7=new n0,dK=0;class E8 extends D9{constructor(J,$,Q=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:dK++}),this.name="",this.array=J,this.itemSize=$,this.count=J!==void 0?J.length/$:0,this.normalized=Q,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,$){this.updateRanges.push({start:J,count:$})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,$,Q){J*=this.itemSize,Q*=$.itemSize;for(let W=0,Z=this.itemSize;W<Z;W++)this.array[J+W]=$.array[Q+W];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let $=0,Q=this.count;$<Q;$++)K7.fromBufferAttribute(this,$),K7.applyMatrix3(J),this.setXY($,K7.x,K7.y);else if(this.itemSize===3)for(let $=0,Q=this.count;$<Q;$++)N8.fromBufferAttribute(this,$),N8.applyMatrix3(J),this.setXYZ($,N8.x,N8.y,N8.z);return this}applyMatrix4(J){for(let $=0,Q=this.count;$<Q;$++)N8.fromBufferAttribute(this,$),N8.applyMatrix4(J),this.setXYZ($,N8.x,N8.y,N8.z);return this}applyNormalMatrix(J){for(let $=0,Q=this.count;$<Q;$++)N8.fromBufferAttribute(this,$),N8.applyNormalMatrix(J),this.setXYZ($,N8.x,N8.y,N8.z);return this}transformDirection(J){for(let $=0,Q=this.count;$<Q;$++)N8.fromBufferAttribute(this,$),N8.transformDirection(J),this.setXYZ($,N8.x,N8.y,N8.z);return this}set(J,$=0){return this.array.set(J,$),this}getComponent(J,$){let Q=this.array[J*this.itemSize+$];if(this.normalized)Q=A6(Q,this.array);return Q}setComponent(J,$,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize+$]=Q,this}getX(J){let $=this.array[J*this.itemSize];if(this.normalized)$=A6($,this.array);return $}setX(J,$){if(this.normalized)$=P8($,this.array);return this.array[J*this.itemSize]=$,this}getY(J){let $=this.array[J*this.itemSize+1];if(this.normalized)$=A6($,this.array);return $}setY(J,$){if(this.normalized)$=P8($,this.array);return this.array[J*this.itemSize+1]=$,this}getZ(J){let $=this.array[J*this.itemSize+2];if(this.normalized)$=A6($,this.array);return $}setZ(J,$){if(this.normalized)$=P8($,this.array);return this.array[J*this.itemSize+2]=$,this}getW(J){let $=this.array[J*this.itemSize+3];if(this.normalized)$=A6($,this.array);return $}setW(J,$){if(this.normalized)$=P8($,this.array);return this.array[J*this.itemSize+3]=$,this}setXY(J,$,Q){if(J*=this.itemSize,this.normalized)$=P8($,this.array),Q=P8(Q,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this}setXYZ(J,$,Q,W){if(J*=this.itemSize,this.normalized)$=P8($,this.array),Q=P8(Q,this.array),W=P8(W,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=W,this}setXYZW(J,$,Q,W,Z){if(J*=this.itemSize,this.normalized)$=P8($,this.array),Q=P8(Q,this.array),W=P8(W,this.array),Z=P8(Z,this.array);return this.array[J+0]=$,this.array[J+1]=Q,this.array[J+2]=W,this.array[J+3]=Z,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class u7 extends E8{constructor(J,$,Q){super(new Uint16Array(J),$,Q)}}class c7 extends E8{constructor(J,$,Q){super(new Uint32Array(J),$,Q)}}class y8 extends E8{constructor(J,$,Q){super(new Float32Array(J),$,Q)}}var uK=new n9,T6=new y,TJ=new y;class s9{constructor(J=new y,$=-1){this.isSphere=!0,this.center=J,this.radius=$}set(J,$){return this.center.copy(J),this.radius=$,this}setFromPoints(J,$){let Q=this.center;if($!==void 0)Q.copy($);else uK.setFromPoints(J).getCenter(Q);let W=0;for(let Z=0,K=J.length;Z<K;Z++)W=Math.max(W,Q.distanceToSquared(J[Z]));return this.radius=Math.sqrt(W),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let $=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=$*$}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,$){let Q=this.center.distanceToSquared(J);if($.copy(J),Q>this.radius*this.radius)$.sub(this.center).normalize(),$.multiplyScalar(this.radius).add(this.center);return $}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;T6.subVectors(J,this.center);let $=T6.lengthSq();if($>this.radius*this.radius){let Q=Math.sqrt($),W=(Q-this.radius)*0.5;this.center.addScaledVector(T6,W/Q),this.radius+=W}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else TJ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(T6.copy(J.center).add(TJ)),this.expandByPoint(T6.copy(J.center).sub(TJ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var cK=0,d8=new Z8,SJ=new C8,N6=new y,v8=new n9,S6=new n9,R8=new y;class L8 extends D9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cK++}),this.uuid=g6(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((TK(J))?c7:u7)(J,1);else this.index=J;return this}setIndirect(J,$=0){return this.indirect=J,this.indirectOffset=$,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,$){return this.attributes[J]=$,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,$,Q=0){this.groups.push({start:J,count:$,materialIndex:Q})}clearGroups(){this.groups=[]}setDrawRange(J,$){this.drawRange.start=J,this.drawRange.count=$}applyMatrix4(J){let $=this.attributes.position;if($!==void 0)$.applyMatrix4(J),$.needsUpdate=!0;let Q=this.attributes.normal;if(Q!==void 0){let Z=new w0().getNormalMatrix(J);Q.applyNormalMatrix(Z),Q.needsUpdate=!0}let W=this.attributes.tangent;if(W!==void 0)W.transformDirection(J),W.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return d8.makeRotationFromQuaternion(J),this.applyMatrix4(d8),this}rotateX(J){return d8.makeRotationX(J),this.applyMatrix4(d8),this}rotateY(J){return d8.makeRotationY(J),this.applyMatrix4(d8),this}rotateZ(J){return d8.makeRotationZ(J),this.applyMatrix4(d8),this}translate(J,$,Q){return d8.makeTranslation(J,$,Q),this.applyMatrix4(d8),this}scale(J,$,Q){return d8.makeScale(J,$,Q),this.applyMatrix4(d8),this}lookAt(J){return SJ.lookAt(J),SJ.updateMatrix(),this.applyMatrix4(SJ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(N6).negate(),this.translate(N6.x,N6.y,N6.z),this}setFromPoints(J){let $=this.getAttribute("position");if($===void 0){let Q=[];for(let W=0,Z=J.length;W<Z;W++){let K=J[W];Q.push(K.x,K.y,K.z||0)}this.setAttribute("position",new y8(Q,3))}else{let Q=Math.min(J.length,$.count);for(let W=0;W<Q;W++){let Z=J[W];$.setXYZ(W,Z.x,Z.y,Z.z||0)}if(J.length>$.count)_0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");$.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new n9;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),$)for(let Q=0,W=$.length;Q<W;Q++){let Z=$[Q];if(v8.setFromBufferAttribute(Z),this.morphTargetsRelative)R8.addVectors(this.boundingBox.min,v8.min),this.boundingBox.expandByPoint(R8),R8.addVectors(this.boundingBox.max,v8.max),this.boundingBox.expandByPoint(R8);else this.boundingBox.expandByPoint(v8.min),this.boundingBox.expandByPoint(v8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))P0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new s9;let J=this.attributes.position,$=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(J){let Q=this.boundingSphere.center;if(v8.setFromBufferAttribute(J),$)for(let Z=0,K=$.length;Z<K;Z++){let H=$[Z];if(S6.setFromBufferAttribute(H),this.morphTargetsRelative)R8.addVectors(v8.min,S6.min),v8.expandByPoint(R8),R8.addVectors(v8.max,S6.max),v8.expandByPoint(R8);else v8.expandByPoint(S6.min),v8.expandByPoint(S6.max)}v8.getCenter(Q);let W=0;for(let Z=0,K=J.count;Z<K;Z++)R8.fromBufferAttribute(J,Z),W=Math.max(W,Q.distanceToSquared(R8));if($)for(let Z=0,K=$.length;Z<K;Z++){let H=$[Z],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(R8.fromBufferAttribute(H,X),Y)N6.fromBufferAttribute(J,X),R8.add(N6);W=Math.max(W,Q.distanceToSquared(R8))}}if(this.boundingSphere.radius=Math.sqrt(W),isNaN(this.boundingSphere.radius))P0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,$=this.attributes;if(J===null||$.position===void 0||$.normal===void 0||$.uv===void 0){P0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:Q,normal:W,uv:Z}=$,K=this.getAttribute("tangent");if(K===void 0||K.count!==Q.count)K=new E8(new Float32Array(4*Q.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let w=0;w<Q.count;w++)H[w]=new y,Y[w]=new y;let X=new y,U=new y,E=new y,N=new n0,G=new n0,D=new n0,R=new y,z=new y;function F(w,M,B){X.fromBufferAttribute(Q,w),U.fromBufferAttribute(Q,M),E.fromBufferAttribute(Q,B),N.fromBufferAttribute(Z,w),G.fromBufferAttribute(Z,M),D.fromBufferAttribute(Z,B),U.sub(X),E.sub(X),G.sub(N),D.sub(N);let d=1/(G.x*D.y-D.x*G.y);if(!isFinite(d))return;R.copy(U).multiplyScalar(D.y).addScaledVector(E,-G.y).multiplyScalar(d),z.copy(E).multiplyScalar(G.x).addScaledVector(U,-D.x).multiplyScalar(d),H[w].add(R),H[M].add(R),H[B].add(R),Y[w].add(z),Y[M].add(z),Y[B].add(z)}let q=this.groups;if(q.length===0)q=[{start:0,count:J.count}];for(let w=0,M=q.length;w<M;++w){let B=q[w],d=B.start,P=B.count;for(let b=d,o=d+P;b<o;b+=3)F(J.getX(b+0),J.getX(b+1),J.getX(b+2))}let C=new y,A=new y,V=new y,I=new y;function _(w){V.fromBufferAttribute(W,w),I.copy(V);let M=H[w];C.copy(M),C.sub(V.multiplyScalar(V.dot(M))).normalize(),A.crossVectors(I,M);let d=A.dot(Y[w])<0?-1:1;K.setXYZW(w,C.x,C.y,C.z,d)}for(let w=0,M=q.length;w<M;++w){let B=q[w],d=B.start,P=B.count;for(let b=d,o=d+P;b<o;b+=3)_(J.getX(b+0)),_(J.getX(b+1)),_(J.getX(b+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,$=this.getAttribute("position");if($!==void 0){let Q=this.getAttribute("normal");if(Q===void 0||Q.count!==$.count)Q=new E8(new Float32Array($.count*3),3),this.setAttribute("normal",Q);else for(let N=0,G=Q.count;N<G;N++)Q.setXYZ(N,0,0,0);let W=new y,Z=new y,K=new y,H=new y,Y=new y,X=new y,U=new y,E=new y;if(J)for(let N=0,G=J.count;N<G;N+=3){let D=J.getX(N+0),R=J.getX(N+1),z=J.getX(N+2);W.fromBufferAttribute($,D),Z.fromBufferAttribute($,R),K.fromBufferAttribute($,z),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),H.fromBufferAttribute(Q,D),Y.fromBufferAttribute(Q,R),X.fromBufferAttribute(Q,z),H.add(U),Y.add(U),X.add(U),Q.setXYZ(D,H.x,H.y,H.z),Q.setXYZ(R,Y.x,Y.y,Y.z),Q.setXYZ(z,X.x,X.y,X.z)}else for(let N=0,G=$.count;N<G;N+=3)W.fromBufferAttribute($,N+0),Z.fromBufferAttribute($,N+1),K.fromBufferAttribute($,N+2),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),Q.setXYZ(N+0,U.x,U.y,U.z),Q.setXYZ(N+1,U.x,U.y,U.z),Q.setXYZ(N+2,U.x,U.y,U.z);this.normalizeNormals(),Q.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let $=0,Q=J.count;$<Q;$++)R8.fromBufferAttribute(J,$),R8.normalize(),J.setXYZ($,R8.x,R8.y,R8.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:E}=H,N=new X.constructor(Y.length*U),G=0,D=0;for(let R=0,z=Y.length;R<z;R++){if(H.isInterleavedBufferAttribute)G=Y[R]*H.data.stride+H.offset;else G=Y[R]*U;for(let F=0;F<U;F++)N[D++]=X[G++]}return new E8(N,U,E)}if(this.index===null)return _0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let $=new L8,Q=this.index.array,W=this.attributes;for(let H in W){let Y=W[H],X=J(Y,Q);$.setAttribute(H,X)}let Z=this.morphAttributes;for(let H in Z){let Y=[],X=Z[H];for(let U=0,E=X.length;U<E;U++){let N=X[U],G=J(N,Q);Y.push(G)}$.morphAttributes[H]=Y}$.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];$.addGroup(X.start,X.count,X.materialIndex)}return $}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let $=this.index;if($!==null)J.data.index={type:$.array.constructor.name,array:Array.prototype.slice.call($.array)};let Q=this.attributes;for(let Y in Q){let X=Q[Y];J.data.attributes[Y]=X.toJSON(J.data)}let W={},Z=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let E=0,N=X.length;E<N;E++){let G=X[E];U.push(G.toJSON(J.data))}if(U.length>0)W[Y]=U,Z=!0}if(Z)J.data.morphAttributes=W,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let $={};this.name=J.name;let Q=J.index;if(Q!==null)this.setIndex(Q.clone());let W=J.attributes;for(let X in W){let U=W[X];this.setAttribute(X,U.clone($))}let Z=J.morphAttributes;for(let X in Z){let U=[],E=Z[X];for(let N=0,G=E.length;N<G;N++)U.push(E[N].clone($));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let E=K[X];this.addGroup(E.start,E.count,E.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var nK=0;class T9 extends D9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:nK++}),this.uuid=g6(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new p0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let $ in J){let Q=J[$];if(Q===void 0){_0(`Material: parameter '${$}' has value of undefined.`);continue}let W=this[$];if(W===void 0){_0(`Material: '${$}' is not a property of THREE.${this.type}.`);continue}if(W&&W.isColor)W.set(Q);else if(W&&W.isVector2&&(Q&&Q.isVector2)||W&&W.isEuler&&(Q&&Q.isEuler)||W&&W.isVector3&&(Q&&Q.isVector3))W.copy(Q);else this[$]=Q}}toJSON(J){let $=J===void 0||typeof J==="string";if($)J={textures:{},images:{}};let Q={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if(Q.uuid=this.uuid,Q.type=this.type,this.name!=="")Q.name=this.name;if(this.color&&this.color.isColor)Q.color=this.color.getHex();if(this.roughness!==void 0)Q.roughness=this.roughness;if(this.metalness!==void 0)Q.metalness=this.metalness;if(this.sheen!==void 0)Q.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)Q.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)Q.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)Q.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)Q.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)Q.specular=this.specular.getHex();if(this.specularIntensity!==void 0)Q.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)Q.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)Q.shininess=this.shininess;if(this.clearcoat!==void 0)Q.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)Q.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)Q.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)Q.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)Q.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,Q.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)Q.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)Q.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)Q.dispersion=this.dispersion;if(this.iridescence!==void 0)Q.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)Q.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)Q.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)Q.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)Q.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)Q.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)Q.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)Q.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)Q.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)Q.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)Q.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)Q.lightMap=this.lightMap.toJSON(J).uuid,Q.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)Q.aoMap=this.aoMap.toJSON(J).uuid,Q.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)Q.bumpMap=this.bumpMap.toJSON(J).uuid,Q.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)Q.normalMap=this.normalMap.toJSON(J).uuid,Q.normalMapType=this.normalMapType,Q.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)Q.displacementMap=this.displacementMap.toJSON(J).uuid,Q.displacementScale=this.displacementScale,Q.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)Q.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)Q.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)Q.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)Q.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)Q.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)Q.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if(Q.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)Q.combine=this.combine}if(this.envMapRotation!==void 0)Q.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)Q.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)Q.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)Q.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)Q.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)Q.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)Q.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)Q.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)Q.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)Q.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)Q.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)Q.size=this.size;if(this.shadowSide!==null)Q.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)Q.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)Q.blending=this.blending;if(this.side!==0)Q.side=this.side;if(this.vertexColors===!0)Q.vertexColors=!0;if(this.opacity<1)Q.opacity=this.opacity;if(this.transparent===!0)Q.transparent=!0;if(this.blendSrc!==204)Q.blendSrc=this.blendSrc;if(this.blendDst!==205)Q.blendDst=this.blendDst;if(this.blendEquation!==100)Q.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)Q.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)Q.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)Q.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)Q.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)Q.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)Q.depthFunc=this.depthFunc;if(this.depthTest===!1)Q.depthTest=this.depthTest;if(this.depthWrite===!1)Q.depthWrite=this.depthWrite;if(this.colorWrite===!1)Q.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)Q.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)Q.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)Q.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)Q.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)Q.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)Q.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)Q.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)Q.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)Q.rotation=this.rotation;if(this.polygonOffset===!0)Q.polygonOffset=!0;if(this.polygonOffsetFactor!==0)Q.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)Q.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)Q.linewidth=this.linewidth;if(this.dashSize!==void 0)Q.dashSize=this.dashSize;if(this.gapSize!==void 0)Q.gapSize=this.gapSize;if(this.scale!==void 0)Q.scale=this.scale;if(this.dithering===!0)Q.dithering=!0;if(this.alphaTest>0)Q.alphaTest=this.alphaTest;if(this.alphaHash===!0)Q.alphaHash=!0;if(this.alphaToCoverage===!0)Q.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)Q.premultipliedAlpha=!0;if(this.forceSinglePass===!0)Q.forceSinglePass=!0;if(this.allowOverride===!1)Q.allowOverride=!1;if(this.wireframe===!0)Q.wireframe=!0;if(this.wireframeLinewidth>1)Q.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")Q.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")Q.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)Q.flatShading=!0;if(this.visible===!1)Q.visible=!1;if(this.toneMapped===!1)Q.toneMapped=!1;if(this.fog===!1)Q.fog=!1;if(Object.keys(this.userData).length>0)Q.userData=this.userData;function W(Z){let K=[];for(let H in Z){let Y=Z[H];delete Y.metadata,K.push(Y)}return K}if($){let Z=W(J.textures),K=W(J.images);if(Z.length>0)Q.textures=Z;if(K.length>0)Q.images=K}return Q}fromJSON(J,$){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new p0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=$[J.map]||null;if(J.matcap!==void 0)this.matcap=$[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=$[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=$[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=$[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let Q=J.normalScale;if(Array.isArray(Q)===!1)Q=[Q,Q];this.normalScale=new n0().fromArray(Q)}if(J.displacementMap!==void 0)this.displacementMap=$[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=$[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=$[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=$[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=$[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=$[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=$[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=$[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=$[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=$[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=$[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=$[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=$[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=$[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new n0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=$[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=$[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=$[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=$[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=$[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=$[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=$[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let $=J.clippingPlanes,Q=null;if($!==null){let W=$.length;Q=Array(W);for(let Z=0;Z!==W;++Z)Q[Z]=$[Z].clone()}return this.clippingPlanes=Q,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var G9=new y,jJ=new y,H7=new y,C9=new y,vJ=new y,Y7=new y,fJ=new y;class l6{constructor(J=new y,$=new y(0,0,-1)){this.origin=J,this.direction=$}set(J,$){return this.origin.copy(J),this.direction.copy($),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,$){return $.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,G9)),this}closestPointToPoint(J,$){$.subVectors(J,this.origin);let Q=$.dot(this.direction);if(Q<0)return $.copy(this.origin);return $.copy(this.origin).addScaledVector(this.direction,Q)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let $=G9.subVectors(J,this.origin).dot(this.direction);if($<0)return this.origin.distanceToSquared(J);return G9.copy(this.origin).addScaledVector(this.direction,$),G9.distanceToSquared(J)}distanceSqToSegment(J,$,Q,W){jJ.copy(J).add($).multiplyScalar(0.5),H7.copy($).sub(J).normalize(),C9.copy(this.origin).sub(jJ);let Z=J.distanceTo($)*0.5,K=-this.direction.dot(H7),H=C9.dot(this.direction),Y=-C9.dot(H7),X=C9.lengthSq(),U=Math.abs(1-K*K),E,N,G,D;if(U>0)if(E=K*Y-H,N=K*H-Y,D=Z*U,E>=0)if(N>=-D)if(N<=D){let R=1/U;E*=R,N*=R,G=E*(E+K*N+2*H)+N*(K*E+N+2*Y)+X}else N=Z,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;else N=-Z,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;else if(N<=-D)E=Math.max(0,-(-K*Z+H)),N=E>0?-Z:Math.min(Math.max(-Z,-Y),Z),G=-E*E+N*(N+2*Y)+X;else if(N<=D)E=0,N=Math.min(Math.max(-Z,-Y),Z),G=N*(N+2*Y)+X;else E=Math.max(0,-(K*Z+H)),N=E>0?Z:Math.min(Math.max(-Z,-Y),Z),G=-E*E+N*(N+2*Y)+X;else N=K>0?-Z:Z,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;if(Q)Q.copy(this.origin).addScaledVector(this.direction,E);if(W)W.copy(jJ).addScaledVector(H7,N);return G}intersectSphere(J,$){G9.subVectors(J.center,this.origin);let Q=G9.dot(this.direction),W=G9.dot(G9)-Q*Q,Z=J.radius*J.radius;if(W>Z)return null;let K=Math.sqrt(Z-W),H=Q-K,Y=Q+K;if(Y<0)return null;if(H<0)return this.at(Y,$);return this.at(H,$)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let $=J.normal.dot(this.direction);if($===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let Q=-(this.origin.dot(J.normal)+J.constant)/$;return Q>=0?Q:null}intersectPlane(J,$){let Q=this.distanceToPlane(J);if(Q===null)return null;return this.at(Q,$)}intersectsPlane(J){let $=J.distanceToPoint(this.origin);if($===0)return!0;if(J.normal.dot(this.direction)*$<0)return!0;return!1}intersectBox(J,$){let Q,W,Z,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,E=1/this.direction.z,N=this.origin;if(X>=0)Q=(J.min.x-N.x)*X,W=(J.max.x-N.x)*X;else Q=(J.max.x-N.x)*X,W=(J.min.x-N.x)*X;if(U>=0)Z=(J.min.y-N.y)*U,K=(J.max.y-N.y)*U;else Z=(J.max.y-N.y)*U,K=(J.min.y-N.y)*U;if(Q>K||Z>W)return null;if(Z>Q||isNaN(Q))Q=Z;if(K<W||isNaN(W))W=K;if(E>=0)H=(J.min.z-N.z)*E,Y=(J.max.z-N.z)*E;else H=(J.max.z-N.z)*E,Y=(J.min.z-N.z)*E;if(Q>Y||H>W)return null;if(H>Q||Q!==Q)Q=H;if(Y<W||W!==W)W=Y;if(W<0)return null;return this.at(Q>=0?Q:W,$)}intersectsBox(J){return this.intersectBox(J,G9)!==null}intersectTriangle(J,$,Q,W,Z){vJ.subVectors($,J),Y7.subVectors(Q,J),fJ.crossVectors(vJ,Y7);let K=this.direction.dot(fJ),H;if(K>0){if(W)return null;H=1}else if(K<0)H=-1,K=-K;else return null;C9.subVectors(this.origin,J);let Y=H*this.direction.dot(Y7.crossVectors(C9,Y7));if(Y<0)return null;let X=H*this.direction.dot(vJ.cross(C9));if(X<0)return null;if(Y+X>K)return null;let U=-H*C9.dot(fJ);if(U<0)return null;return this.at(U/K,Z)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class n7 extends T9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new p0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new A9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var $W=new Z8,b9=new l6,X7=new s9,QW=new y,U7=new y,G7=new y,N7=new y,yJ=new y,E7=new y,WW=new y,q7=new y;class b8 extends C8{constructor(J=new L8,$=new n7){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,$){if(super.copy(J,$),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let W=$[Q[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}getVertexPosition(J,$){let Q=this.geometry,W=Q.attributes.position,Z=Q.morphAttributes.position,K=Q.morphTargetsRelative;$.fromBufferAttribute(W,J);let H=this.morphTargetInfluences;if(Z&&H){E7.set(0,0,0);for(let Y=0,X=Z.length;Y<X;Y++){let U=H[Y],E=Z[Y];if(U===0)continue;if(yJ.fromBufferAttribute(E,J),K)E7.addScaledVector(yJ,U);else E7.addScaledVector(yJ.sub($),U)}$.add(E7)}return $}raycast(J,$){let Q=this.geometry,W=this.material,Z=this.matrixWorld;if(W===void 0)return;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(X7.copy(Q.boundingSphere),X7.applyMatrix4(Z),b9.copy(J.ray).recast(J.near),X7.containsPoint(b9.origin)===!1){if(b9.intersectSphere(X7,QW)===null)return;if(b9.origin.distanceToSquared(QW)>(J.far-J.near)**2)return}if($W.copy(Z).invert(),b9.copy(J.ray).applyMatrix4($W),Q.boundingBox!==null){if(b9.intersectsBox(Q.boundingBox)===!1)return}this._computeIntersections(J,$,b9)}_computeIntersections(J,$,Q){let W,Z=this.geometry,K=this.material,H=Z.index,Y=Z.attributes.position,X=Z.attributes.uv,U=Z.attributes.uv1,E=Z.attributes.normal,N=Z.groups,G=Z.drawRange;if(H!==null)if(Array.isArray(K))for(let D=0,R=N.length;D<R;D++){let z=N[D],F=K[z.materialIndex],q=Math.max(z.start,G.start),C=Math.min(H.count,Math.min(z.start+z.count,G.start+G.count));for(let A=q,V=C;A<V;A+=3){let I=H.getX(A),_=H.getX(A+1),w=H.getX(A+2);if(W=F7(this,F,J,Q,X,U,E,I,_,w),W)W.faceIndex=Math.floor(A/3),W.face.materialIndex=z.materialIndex,$.push(W)}}else{let D=Math.max(0,G.start),R=Math.min(H.count,G.start+G.count);for(let z=D,F=R;z<F;z+=3){let q=H.getX(z),C=H.getX(z+1),A=H.getX(z+2);if(W=F7(this,K,J,Q,X,U,E,q,C,A),W)W.faceIndex=Math.floor(z/3),$.push(W)}}else if(Y!==void 0)if(Array.isArray(K))for(let D=0,R=N.length;D<R;D++){let z=N[D],F=K[z.materialIndex],q=Math.max(z.start,G.start),C=Math.min(Y.count,Math.min(z.start+z.count,G.start+G.count));for(let A=q,V=C;A<V;A+=3){let I=A,_=A+1,w=A+2;if(W=F7(this,F,J,Q,X,U,E,I,_,w),W)W.faceIndex=Math.floor(A/3),W.face.materialIndex=z.materialIndex,$.push(W)}}else{let D=Math.max(0,G.start),R=Math.min(Y.count,G.start+G.count);for(let z=D,F=R;z<F;z+=3){let q=z,C=z+1,A=z+2;if(W=F7(this,K,J,Q,X,U,E,q,C,A),W)W.faceIndex=Math.floor(z/3),$.push(W)}}}}function sK(J,$,Q,W,Z,K,H,Y){let X;if($.side===1)X=W.intersectTriangle(H,K,Z,!0,Y);else X=W.intersectTriangle(Z,K,H,$.side===0,Y);if(X===null)return null;q7.copy(Y),q7.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(q7);if(U<Q.near||U>Q.far)return null;return{distance:U,point:q7.clone(),object:J}}function F7(J,$,Q,W,Z,K,H,Y,X,U){J.getVertexPosition(Y,U7),J.getVertexPosition(X,G7),J.getVertexPosition(U,N7);let E=sK(J,$,Q,W,U7,G7,N7,WW);if(E){let N=new y;if(u8.getBarycoord(WW,U7,G7,N7,N),Z)E.uv=u8.getInterpolatedAttribute(Z,Y,X,U,N,new n0);if(K)E.uv1=u8.getInterpolatedAttribute(K,Y,X,U,N,new n0);if(H){if(E.normal=u8.getInterpolatedAttribute(H,Y,X,U,N,new y),E.normal.dot(W.direction)>0)E.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new y,materialIndex:0};u8.getNormal(U7,G7,N7,G.normal),E.face=G,E.barycoord=N}return E}class d6 extends I8{constructor(J=null,$=1,Q=1,W,Z,K,H,Y,X=1003,U=1003,E,N){super(null,K,H,Y,X,U,W,Z,E,N);this.isDataTexture=!0,this.image={data:J,width:$,height:Q},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class s7 extends E8{constructor(J,$,Q,W=1){super(J,$,Q);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=W}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var hJ=new y,iK=new y,oK=new w0;class N9{constructor(J=new y(1,0,0),$=0){this.isPlane=!0,this.normal=J,this.constant=$}set(J,$){return this.normal.copy(J),this.constant=$,this}setComponents(J,$,Q,W){return this.normal.set(J,$,Q),this.constant=W,this}setFromNormalAndCoplanarPoint(J,$){return this.normal.copy(J),this.constant=-$.dot(this.normal),this}setFromCoplanarPoints(J,$,Q){let W=hJ.subVectors(Q,$).cross(iK.subVectors(J,$)).normalize();return this.setFromNormalAndCoplanarPoint(W,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,$){return $.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,$,Q=!0){let W=J.delta(hJ),Z=this.normal.dot(W);if(Z===0){if(this.distanceToPoint(J.start)===0)return $.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Z;if(Q===!0&&(K<0||K>1))return null;return $.copy(J.start).addScaledVector(W,K)}intersectsLine(J){let $=this.distanceToPoint(J.start),Q=this.distanceToPoint(J.end);return $<0&&Q>0||Q<0&&$>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,$){let Q=$||oK.getNormalMatrix(J),W=this.coplanarPoint(hJ).applyMatrix4(J),Z=this.normal.applyMatrix3(Q).normalize();return this.constant=-W.dot(Z),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var x9=new s9,aK=new n0(0.5,0.5),D7=new y;class i7{constructor(J=new N9,$=new N9,Q=new N9,W=new N9,Z=new N9,K=new N9){this.planes=[J,$,Q,W,Z,K]}set(J,$,Q,W,Z,K){let H=this.planes;return H[0].copy(J),H[1].copy($),H[2].copy(Q),H[3].copy(W),H[4].copy(Z),H[5].copy(K),this}copy(J){let $=this.planes;for(let Q=0;Q<6;Q++)$[Q].copy(J.planes[Q]);return this}setFromProjectionMatrix(J,$=2000,Q=!1){let W=this.planes,Z=J.elements,K=Z[0],H=Z[1],Y=Z[2],X=Z[3],U=Z[4],E=Z[5],N=Z[6],G=Z[7],D=Z[8],R=Z[9],z=Z[10],F=Z[11],q=Z[12],C=Z[13],A=Z[14],V=Z[15];if(W[0].setComponents(X-K,G-U,F-D,V-q).normalize(),W[1].setComponents(X+K,G+U,F+D,V+q).normalize(),W[2].setComponents(X+H,G+E,F+R,V+C).normalize(),W[3].setComponents(X-H,G-E,F-R,V-C).normalize(),Q)W[4].setComponents(Y,N,z,A).normalize(),W[5].setComponents(X-Y,G-N,F-z,V-A).normalize();else if(W[4].setComponents(X-Y,G-N,F-z,V-A).normalize(),$===2000)W[5].setComponents(X+Y,G+N,F+z,V+A).normalize();else if($===2001)W[5].setComponents(Y,N,z,A).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+$);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();x9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let $=J.geometry;if($.boundingSphere===null)$.computeBoundingSphere();x9.copy($.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(x9)}intersectsSprite(J){x9.center.set(0,0,0);let $=aK.distanceTo(J.center);return x9.radius=0.7071067811865476+$,x9.applyMatrix4(J.matrixWorld),this.intersectsSphere(x9)}intersectsSphere(J){let $=this.planes,Q=J.center,W=-J.radius;for(let Z=0;Z<6;Z++)if($[Z].distanceToPoint(Q)<W)return!1;return!0}intersectsBox(J){let $=this.planes;for(let Q=0;Q<6;Q++){let W=$[Q];if(D7.x=W.normal.x>0?J.max.x:J.min.x,D7.y=W.normal.y>0?J.max.y:J.min.y,D7.z=W.normal.z>0?J.max.z:J.min.z,W.distanceToPoint(D7)<0)return!1}return!0}containsPoint(J){let $=this.planes;for(let Q=0;Q<6;Q++)if($[Q].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class d$ extends T9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new p0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var I7=new y,C7=new y,ZW=new Z8,j6=new l6,O7=new s9,bJ=new y,KW=new y;class u$ extends C8{constructor(J=new L8,$=new d$){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[0];for(let W=1,Z=$.count;W<Z;W++)I7.fromBufferAttribute($,W-1),C7.fromBufferAttribute($,W),Q[W]=Q[W-1],Q[W]+=I7.distanceTo(C7);J.setAttribute("lineDistance",new y8(Q,1))}else _0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,$){let Q=this.geometry,W=this.matrixWorld,Z=J.params.Line.threshold,K=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(O7.copy(Q.boundingSphere),O7.applyMatrix4(W),O7.radius+=Z,J.ray.intersectsSphere(O7)===!1)return;ZW.copy(W).invert(),j6.copy(J.ray).applyMatrix4(ZW);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=Q.index,N=Q.attributes.position;if(U!==null){let G=Math.max(0,K.start),D=Math.min(U.count,K.start+K.count);for(let R=G,z=D-1;R<z;R+=X){let F=U.getX(R),q=U.getX(R+1),C=M7(this,J,j6,Y,F,q,R);if(C)$.push(C)}if(this.isLineLoop){let R=U.getX(D-1),z=U.getX(G),F=M7(this,J,j6,Y,R,z,D-1);if(F)$.push(F)}}else{let G=Math.max(0,K.start),D=Math.min(N.count,K.start+K.count);for(let R=G,z=D-1;R<z;R+=X){let F=M7(this,J,j6,Y,R,R+1,R);if(F)$.push(F)}if(this.isLineLoop){let R=M7(this,J,j6,Y,D-1,G,D-1);if(R)$.push(R)}}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let W=$[Q[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function M7(J,$,Q,W,Z,K,H){let Y=J.geometry.attributes.position;if(I7.fromBufferAttribute(Y,Z),C7.fromBufferAttribute(Y,K),Q.distanceSqToSegment(I7,C7,bJ,KW)>W)return;bJ.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(bJ);if(U<$.near||U>$.far)return;return{distance:U,point:KW.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var HW=new y,YW=new y;class o7 extends u${constructor(J,$){super(J,$);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let $=J.attributes.position,Q=[];for(let W=0,Z=$.count;W<Z;W+=2)HW.fromBufferAttribute($,W),YW.fromBufferAttribute($,W+1),Q[W]=W===0?0:Q[W-1],Q[W+1]=Q[W]+HW.distanceTo(YW);J.setAttribute("lineDistance",new y8(Q,1))}else _0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class c$ extends T9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new p0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var XW=new Z8,xJ=new l6,R7=new s9,k7=new y;class u6 extends C8{constructor(J=new L8,$=new c$){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=$,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,$){return super.copy(J,$),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,$){let Q=this.geometry,W=this.matrixWorld,Z=J.params.Points.threshold,K=Q.drawRange;if(Q.boundingSphere===null)Q.computeBoundingSphere();if(R7.copy(Q.boundingSphere),R7.applyMatrix4(W),R7.radius+=Z,J.ray.intersectsSphere(R7)===!1)return;XW.copy(W).invert(),xJ.copy(J.ray).applyMatrix4(XW);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=Q.index,E=Q.attributes.position;if(X!==null){let N=Math.max(0,K.start),G=Math.min(X.count,K.start+K.count);for(let D=N,R=G;D<R;D++){let z=X.getX(D);k7.fromBufferAttribute(E,z),UW(k7,z,Y,W,J,$,this)}}else{let N=Math.max(0,K.start),G=Math.min(E.count,K.start+K.count);for(let D=N,R=G;D<R;D++)k7.fromBufferAttribute(E,D),UW(k7,D,Y,W,J,$,this)}}updateMorphTargets(){let $=this.geometry.morphAttributes,Q=Object.keys($);if(Q.length>0){let W=$[Q[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function UW(J,$,Q,W,Z,K,H){let Y=xJ.distanceSqToPoint(J);if(Y<Q){let X=new y;xJ.closestPointToPoint(J,X),X.applyMatrix4(W);let U=Z.ray.origin.distanceTo(X);if(U<Z.near||U>Z.far)return;K.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:$,face:null,faceIndex:null,barycoord:null,object:H})}}class a7 extends I8{constructor(J=[],$=301,Q,W,Z,K,H,Y,X,U){super(J,$,Q,W,Z,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class S9 extends I8{constructor(J,$,Q=1014,W,Z,K,H=1003,Y=1003,X,U=1026,E=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let N={width:J,height:$,depth:E};super(N,W,Z,K,H,Y,U,Q,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new p6(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let $=super.toJSON(J);if(this.compareFunction!==null)$.compareFunction=this.compareFunction;return $}}class n$ extends S9{constructor(J,$=1014,Q=301,W,Z,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},E=[U,U,U,U,U,U];super(J,J,$,Q,W,Z,K,H,Y,X);this.image=E,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class r7 extends I8{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class B6 extends L8{constructor(J=1,$=1,Q=1,W=1,Z=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:$,depth:Q,widthSegments:W,heightSegments:Z,depthSegments:K};let H=this;W=Math.floor(W),Z=Math.floor(Z),K=Math.floor(K);let Y=[],X=[],U=[],E=[],N=0,G=0;D("z","y","x",-1,-1,Q,$,J,K,Z,0),D("z","y","x",1,-1,Q,$,-J,K,Z,1),D("x","z","y",1,1,J,Q,$,W,K,2),D("x","z","y",1,-1,J,Q,-$,W,K,3),D("x","y","z",1,-1,J,$,Q,W,Z,4),D("x","y","z",-1,-1,J,$,-Q,W,Z,5),this.setIndex(Y),this.setAttribute("position",new y8(X,3)),this.setAttribute("normal",new y8(U,3)),this.setAttribute("uv",new y8(E,2));function D(R,z,F,q,C,A,V,I,_,w,M){let B=A/_,d=V/w,P=A/2,b=V/2,o=I/2,g=_+1,c=w+1,p=0,f=0,a=new y;for(let e=0;e<c;e++){let J0=e*d-b;for(let k0=0;k0<g;k0++){let D0=k0*B-P;a[R]=D0*q,a[z]=J0*C,a[F]=o,X.push(a.x,a.y,a.z),a[R]=0,a[z]=0,a[F]=I>0?1:-1,U.push(a.x,a.y,a.z),E.push(k0/_),E.push(1-e/w),p+=1}}for(let e=0;e<w;e++)for(let J0=0;J0<_;J0++){let k0=N+J0+g*e,D0=N+J0+g*(e+1),l0=N+(J0+1)+g*(e+1),u0=N+(J0+1)+g*e;Y.push(k0,D0,u0),Y.push(D0,l0,u0),f+=6}H.addGroup(G,f,M),G+=f,N+=p}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new B6(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class j9 extends L8{constructor(J=1,$=1,Q=1,W=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:$,widthSegments:Q,heightSegments:W};let Z=J/2,K=$/2,H=Math.floor(Q),Y=Math.floor(W),X=H+1,U=Y+1,E=J/H,N=$/Y,G=[],D=[],R=[],z=[];for(let F=0;F<U;F++){let q=F*N-K;for(let C=0;C<X;C++){let A=C*E-Z;D.push(A,-q,0),R.push(0,0,1),z.push(C/H),z.push(1-F/Y)}}for(let F=0;F<Y;F++)for(let q=0;q<H;q++){let C=q+X*F,A=q+X*(F+1),V=q+1+X*(F+1),I=q+1+X*F;G.push(C,A,I),G.push(A,V,I)}this.setIndex(G),this.setAttribute("position",new y8(D,3)),this.setAttribute("normal",new y8(R,3)),this.setAttribute("uv",new y8(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new j9(J.width,J.height,J.widthSegments,J.heightSegments)}}function i9(J){let $={};for(let Q in J){$[Q]={};for(let W in J[Q]){let Z=J[Q][W];if(GW(Z))if(Z.isRenderTargetTexture)_0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),$[Q][W]=null;else $[Q][W]=Z.clone();else if(Array.isArray(Z))if(GW(Z[0])){let K=[];for(let H=0,Y=Z.length;H<Y;H++)K[H]=Z[H].clone();$[Q][W]=K}else $[Q][W]=Z.slice();else $[Q][W]=Z}}return $}function A8(J){let $={};for(let Q=0;Q<J.length;Q++){let W=i9(J[Q]);for(let Z in W)$[Z]=W[Z]}return $}function GW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function rK(J){let $=[];for(let Q=0;Q<J.length;Q++)$.push(J[Q].clone());return $}function s$(J){let $=J.getRenderTarget();if($===null)return J.outputColorSpace;if($.isXRRenderTarget===!0)return $.texture.colorSpace;return g0.workingColorSpace}var qZ={clone:i9,merge:A8},tK=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,eK=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class T8 extends T9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=tK,this.fragmentShader=eK,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=i9(J.uniforms),this.uniformsGroups=rK(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let $=super.toJSON(J);$.glslVersion=this.glslVersion,$.uniforms={};for(let W in this.uniforms){let K=this.uniforms[W].value;if(K&&K.isTexture)$.uniforms[W]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)$.uniforms[W]={type:"c",value:K.getHex()};else if(K&&K.isVector2)$.uniforms[W]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)$.uniforms[W]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)$.uniforms[W]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)$.uniforms[W]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)$.uniforms[W]={type:"m4",value:K.toArray()};else $.uniforms[W]={value:K}}if(Object.keys(this.defines).length>0)$.defines=this.defines;$.vertexShader=this.vertexShader,$.fragmentShader=this.fragmentShader,$.lights=this.lights,$.clipping=this.clipping;let Q={};for(let W in this.extensions)if(this.extensions[W]===!0)Q[W]=!0;if(Object.keys(Q).length>0)$.extensions=Q;return $}fromJSON(J,$){if(super.fromJSON(J,$),J.uniforms!==void 0)for(let Q in J.uniforms){let W=J.uniforms[Q];switch(this.uniforms[Q]={},W.type){case"t":this.uniforms[Q].value=$[W.value]||null;break;case"c":this.uniforms[Q].value=new p0().setHex(W.value);break;case"v2":this.uniforms[Q].value=new n0().fromArray(W.value);break;case"v3":this.uniforms[Q].value=new y().fromArray(W.value);break;case"v4":this.uniforms[Q].value=new K8().fromArray(W.value);break;case"m3":this.uniforms[Q].value=new w0().fromArray(W.value);break;case"m4":this.uniforms[Q].value=new Z8().fromArray(W.value);break;default:this.uniforms[Q].value=W.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let Q in J.extensions)this.extensions[Q]=J.extensions[Q];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class i$ extends T8{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class o$ extends T9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class a$ extends T9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function L7(J,$){if(!J||J.constructor===$)return J;if(typeof $.BYTES_PER_ELEMENT==="number")return new $(J);return Array.prototype.slice.call(J)}class o9{constructor(J,$,Q,W){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=W!==void 0?W:new $.constructor(Q),this.sampleValues=$,this.valueSize=Q,this.settings=null,this.DefaultSettings_={}}evaluate(J){let $=this.parameterPositions,Q=this._cachedIndex,W=$[Q],Z=$[Q-1];Q:{J:{let K;$:{W:if(!(J<W)){for(let H=Q+2;;){if(W===void 0){if(J<Z)break W;return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}if(Q===H)break;if(Z=W,W=$[++Q],J<W)break J}K=$.length;break $}if(!(J>=Z)){let H=$[1];if(J<H)Q=2,Z=H;for(let Y=Q-2;;){if(Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Q===Y)break;if(W=Z,Z=$[--Q-1],J>=Z)break J}K=Q,Q=0;break $}break Q}while(Q<K){let H=Q+K>>>1;if(J<$[H])K=H;else Q=H+1}if(W=$[Q],Z=$[Q-1],Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===void 0)return Q=$.length,this._cachedIndex=Q,this.copySampleValue_(Q-1)}this._cachedIndex=Q,this.intervalChanged_(Q,Z,W)}return this.interpolate_(Q,Z,J,W)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let $=this.resultBuffer,Q=this.sampleValues,W=this.valueSize,Z=J*W;for(let K=0;K!==W;++K)$[K]=Q[Z+K];return $}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class r$ extends o9{constructor(J,$,Q,W){super(J,$,Q,W);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,$,Q){let W=this.parameterPositions,Z=J-2,K=J+1,H=W[Z],Y=W[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:Z=J,H=2*$-Q;break;case 2402:Z=W.length-2,H=$+W[Z]-W[Z+1];break;default:Z=J,H=Q}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*Q-$;break;case 2402:K=1,Y=Q+W[1]-W[0];break;default:K=J-1,Y=$}let X=(Q-$)*0.5,U=this.valueSize;this._weightPrev=X/($-H),this._weightNext=X/(Y-Q),this._offsetPrev=Z*U,this._offsetNext=K*U}interpolate_(J,$,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,E=this._offsetNext,N=this._weightPrev,G=this._weightNext,D=(Q-$)/(W-$),R=D*D,z=R*D,F=-N*z+2*N*R-N*D,q=(1+N)*z+(-1.5-2*N)*R+(-0.5+N)*D+1,C=(-1-G)*z+(1.5+G)*R+0.5*D,A=G*z-G*R;for(let V=0;V!==H;++V)Z[V]=F*K[U+V]+q*K[X+V]+C*K[Y+V]+A*K[E+V];return Z}}class t$ extends o9{constructor(J,$,Q,W){super(J,$,Q,W)}interpolate_(J,$,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=(Q-$)/(W-$),E=1-U;for(let N=0;N!==H;++N)Z[N]=K[X+N]*E+K[Y+N]*U;return Z}}class e$ extends o9{constructor(J,$,Q,W){super(J,$,Q,W)}interpolate_(J){return this.copySampleValue_(J-1)}}class JQ extends o9{interpolate_(J,$,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,E=this.outTangents;if(!U||!E){let D=(Q-$)/(W-$),R=1-D;for(let z=0;z!==H;++z)Z[z]=K[X+z]*R+K[Y+z]*D;return Z}let N=H*2,G=J-1;for(let D=0;D!==H;++D){let R=K[X+D],z=K[Y+D],F=G*N+D*2,q=E[F],C=E[F+1],A=J*N+D*2,V=U[A],I=U[A+1],_=(Q-$)/(W-$),w,M,B,d,P;for(let b=0;b<8;b++){w=_*_,M=w*_,B=1-_,d=B*B,P=d*B;let g=P*$+3*d*_*q+3*B*w*V+M*W-Q;if(Math.abs(g)<0.0000000001)break;let c=3*d*(q-$)+6*B*_*(V-q)+3*w*(W-V);if(Math.abs(c)<0.0000000001)break;_=_-g/c,_=Math.max(0,Math.min(1,_))}Z[D]=P*R+3*d*_*C+3*B*w*I+M*z}return Z}}class n8{constructor(J,$,Q,W){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if($===void 0||$.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=L7($,this.TimeBufferType),this.values=L7(Q,this.ValueBufferType),this.setInterpolation(W||this.DefaultInterpolation)}static toJSON(J){let $=J.constructor,Q;if($.toJSON!==this.toJSON)Q=$.toJSON(J);else{Q={name:J.name,times:L7(J.times,Array),values:L7(J.values,Array)};let W=J.getInterpolation();if(W!==J.DefaultInterpolation)Q.interpolation=W}return Q.type=J.ValueTypeName,Q}InterpolantFactoryMethodDiscrete(J){return new e$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new t$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new r$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let $=new JQ(this.times,this.values,this.getValueSize(),J);if(this.settings)$.inTangents=this.settings.inTangents,$.outTangents=this.settings.outTangents;return $}setInterpolation(J){let $;switch(J){case 2300:$=this.InterpolantFactoryMethodDiscrete;break;case 2301:$=this.InterpolantFactoryMethodLinear;break;case 2302:$=this.InterpolantFactoryMethodSmooth;break;case 2303:$=this.InterpolantFactoryMethodBezier;break}if($===void 0){let Q="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(Q);return _0("KeyframeTrack:",Q),this}return this.createInterpolant=$,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let $=this.times;for(let Q=0,W=$.length;Q!==W;++Q)$[Q]+=J}return this}scale(J){if(J!==1){let $=this.times;for(let Q=0,W=$.length;Q!==W;++Q)$[Q]*=J}return this}trim(J,$){let Q=this.times,W=Q.length,Z=0,K=W-1;while(Z!==W&&Q[Z]<J)++Z;while(K!==-1&&Q[K]>$)--K;if(++K,Z!==0||K!==W){if(Z>=K)K=Math.max(K,1),Z=K-1;let H=this.getValueSize();this.times=Q.slice(Z,K),this.values=this.values.slice(Z*H,K*H)}return this}validate(){let J=!0,$=this.getValueSize();if($-Math.floor($)!==0)P0("KeyframeTrack: Invalid value size in track.",this),J=!1;let Q=this.times,W=this.values,Z=Q.length;if(Z===0)P0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==Z;H++){let Y=Q[H];if(typeof Y==="number"&&isNaN(Y)){P0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){P0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(W!==void 0){if(SK(W))for(let H=0,Y=W.length;H!==Y;++H){let X=W[H];if(isNaN(X)){P0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),$=this.values.slice(),Q=this.getValueSize(),W=this.getInterpolation()===2302,Z=J.length-1,K=1;for(let H=1;H<Z;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!W){let E=H*Q,N=E-Q,G=E+Q;for(let D=0;D!==Q;++D){let R=$[E+D];if(R!==$[N+D]||R!==$[G+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let E=H*Q,N=K*Q;for(let G=0;G!==Q;++G)$[N+G]=$[E+G]}++K}}if(Z>0){J[K]=J[Z];for(let H=Z*Q,Y=K*Q,X=0;X!==Q;++X)$[Y+X]=$[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=$.slice(0,K*Q);else this.times=J,this.values=$;return this}clone(){let J=this.times.slice(),$=this.values.slice(),W=new this.constructor(this.name,J,$);return W.createInterpolant=this.createInterpolant,W}}n8.prototype.ValueTypeName="";n8.prototype.TimeBufferType=Float32Array;n8.prototype.ValueBufferType=Float32Array;n8.prototype.DefaultInterpolation=2301;class a9 extends n8{constructor(J,$,Q){super(J,$,Q)}}a9.prototype.ValueTypeName="bool";a9.prototype.ValueBufferType=Array;a9.prototype.DefaultInterpolation=2300;a9.prototype.InterpolantFactoryMethodLinear=void 0;a9.prototype.InterpolantFactoryMethodSmooth=void 0;class $Q extends n8{constructor(J,$,Q,W){super(J,$,Q,W)}}$Q.prototype.ValueTypeName="color";class QQ extends n8{constructor(J,$,Q,W){super(J,$,Q,W)}}QQ.prototype.ValueTypeName="number";class WQ extends o9{constructor(J,$,Q,W){super(J,$,Q,W)}interpolate_(J,$,Q,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=(Q-$)/(W-$),X=J*H;for(let U=X+H;X!==U;X+=4)O9.slerpFlat(Z,0,K,X-H,K,X,Y);return Z}}class t7 extends n8{constructor(J,$,Q,W){super(J,$,Q,W)}InterpolantFactoryMethodLinear(J){return new WQ(this.times,this.values,this.getValueSize(),J)}}t7.prototype.ValueTypeName="quaternion";t7.prototype.InterpolantFactoryMethodSmooth=void 0;class r9 extends n8{constructor(J,$,Q){super(J,$,Q)}}r9.prototype.ValueTypeName="string";r9.prototype.ValueBufferType=Array;r9.prototype.DefaultInterpolation=2300;r9.prototype.InterpolantFactoryMethodLinear=void 0;r9.prototype.InterpolantFactoryMethodSmooth=void 0;class ZQ extends n8{constructor(J,$,Q,W){super(J,$,Q,W)}}ZQ.prototype.ValueTypeName="vector";class KQ{constructor(J,$,Q){let W=this,Z=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=$,this.onError=Q,this._abortController=null,this.itemStart=function(U){if(H++,Z===!1){if(W.onStart!==void 0)W.onStart(U,K,H)}Z=!0},this.itemEnd=function(U){if(K++,W.onProgress!==void 0)W.onProgress(U,K,H);if(K===H){if(Z=!1,W.onLoad!==void 0)W.onLoad()}},this.itemError=function(U){if(W.onError!==void 0)W.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,E){return X.push(U,E),this},this.removeHandler=function(U){let E=X.indexOf(U);if(E!==-1)X.splice(E,2);return this},this.getHandler=function(U){for(let E=0,N=X.length;E<N;E+=2){let G=X[E],D=X[E+1];if(G.global)G.lastIndex=0;if(G.test(U))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var FZ=new KQ;class HQ{constructor(J){if(this.manager=J!==void 0?J:FZ,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,$){let Q=this;return new Promise(function(W,Z){Q.load(J,W,$,Z)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}HQ.DEFAULT_MATERIAL_NAME="__DEFAULT";var V7=new y,B7=new O9,e8=new y;class e7 extends C8{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Z8,this.projectionMatrix=new Z8,this.projectionMatrixInverse=new Z8,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,$){return super.copy(J,$),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(V7,B7,e8),e8.x===1&&e8.y===1&&e8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(V7,B7,e8.set(1,1,1)).invert()}updateWorldMatrix(J,$,Q=!1){if(super.updateWorldMatrix(J,$,Q),this.matrixWorld.decompose(V7,B7,e8),e8.x===1&&e8.y===1&&e8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(V7,B7,e8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var _9=new y,NW=new n0,EW=new n0;class f8 extends e7{constructor(J=50,$=1,Q=0.1,W=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=Q,this.far=W,this.focus=10,this.aspect=$,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let $=0.5*this.getFilmHeight()/J;this.fov=z7*2*Math.atan($),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(FJ*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return z7*2*Math.atan(Math.tan(FJ*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,$,Q){_9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(_9.x,_9.y).multiplyScalar(-J/_9.z),_9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(_9.x,_9.y).multiplyScalar(-J/_9.z)}getViewSize(J,$){return this.getViewBounds(J,NW,EW),$.subVectors(EW,NW)}setViewOffset(J,$,Q,W,Z,K){if(this.aspect=J/$,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,$=J*Math.tan(FJ*0.5*this.fov)/this.zoom,Q=2*$,W=this.aspect*Q,Z=-0.5*W,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;Z+=K.offsetX*W/Y,$-=K.offsetY*Q/X,W*=K.width/Y,Q*=K.height/X}let H=this.filmOffset;if(H!==0)Z+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(Z,Z+W,$,$-Q,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.fov=this.fov,$.object.zoom=this.zoom,$.object.near=this.near,$.object.far=this.far,$.object.focus=this.focus,$.object.aspect=this.aspect,this.view!==null)$.object.view=Object.assign({},this.view);return $.object.filmGauge=this.filmGauge,$.object.filmOffset=this.filmOffset,$}}class z6 extends e7{constructor(J=-1,$=1,Q=1,W=-1,Z=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=$,this.top=Q,this.bottom=W,this.near=Z,this.far=K,this.updateProjectionMatrix()}copy(J,$){return super.copy(J,$),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,$,Q,W,Z,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=$,this.view.offsetX=Q,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),$=(this.top-this.bottom)/(2*this.zoom),Q=(this.right+this.left)/2,W=(this.top+this.bottom)/2,Z=Q-J,K=Q+J,H=W+$,Y=W-$;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;Z+=X*this.view.offsetX,K=Z+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(Z,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let $=super.toJSON(J);if($.object.zoom=this.zoom,$.object.left=this.left,$.object.right=this.right,$.object.top=this.top,$.object.bottom=this.bottom,$.object.near=this.near,$.object.far=this.far,this.view!==null)$.object.view=Object.assign({},this.view);return $}}class JJ extends L8{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(J){return super.copy(J),this.instanceCount=J.instanceCount,this}toJSON(){let J=super.toJSON();return J.instanceCount=this.instanceCount,J.isInstancedBufferGeometry=!0,J}}var E6=-90,q6=1;class YQ extends C8{constructor(J,$,Q){super();this.type="CubeCamera",this.renderTarget=Q,this.coordinateSystem=null,this.activeMipmapLevel=0;let W=new f8(E6,q6,J,$);W.layers=this.layers,this.add(W);let Z=new f8(E6,q6,J,$);Z.layers=this.layers,this.add(Z);let K=new f8(E6,q6,J,$);K.layers=this.layers,this.add(K);let H=new f8(E6,q6,J,$);H.layers=this.layers,this.add(H);let Y=new f8(E6,q6,J,$);Y.layers=this.layers,this.add(Y);let X=new f8(E6,q6,J,$);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,$=this.children.concat(),[Q,W,Z,K,H,Y]=$;for(let X of $)this.remove(X);if(J===2000)Q.up.set(0,1,0),Q.lookAt(1,0,0),W.up.set(0,1,0),W.lookAt(-1,0,0),Z.up.set(0,0,-1),Z.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)Q.up.set(0,-1,0),Q.lookAt(-1,0,0),W.up.set(0,-1,0),W.lookAt(1,0,0),Z.up.set(0,0,1),Z.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of $)this.add(X),X.updateMatrixWorld()}update(J,$){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:Q,activeMipmapLevel:W}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[Z,K,H,Y,X,U]=this.children,E=J.getRenderTarget(),N=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let R=Q.texture.generateMipmaps;Q.texture.generateMipmaps=!1;let z=!1;if(J.isWebGLRenderer===!0)z=J.state.buffers.depth.getReversed();else z=J.reversedDepthBuffer;if(J.setRenderTarget(Q,0,W),z&&J.autoClear===!1)J.clearDepth();if(J.render($,Z),J.setRenderTarget(Q,1,W),z&&J.autoClear===!1)J.clearDepth();if(J.render($,K),J.setRenderTarget(Q,2,W),z&&J.autoClear===!1)J.clearDepth();if(J.render($,H),J.setRenderTarget(Q,3,W),z&&J.autoClear===!1)J.clearDepth();if(J.render($,Y),J.setRenderTarget(Q,4,W),z&&J.autoClear===!1)J.clearDepth();if(J.render($,X),Q.texture.generateMipmaps=R,J.setRenderTarget(Q,5,W),z&&J.autoClear===!1)J.clearDepth();J.render($,U),J.setRenderTarget(E,N,G),J.xr.enabled=D,Q.texture.needsPMREMUpdate=!0}}class XQ extends f8{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var UQ="\\[\\]\\.:\\/",JH=new RegExp("["+UQ+"]","g"),GQ="[^"+UQ+"]",$H="[^"+UQ.replace("\\.","")+"]",QH=/((?:WC+[\/:])*)/.source.replace("WC",GQ),WH=/(WCOD+)?/.source.replace("WCOD",$H),ZH=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",GQ),KH=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",GQ),HH=new RegExp("^"+QH+WH+ZH+KH+"$"),YH=["material","materials","bones","map"];class DZ{constructor(J,$,Q){let W=Q||i0.parseTrackName($);this._targetGroup=J,this._bindings=J.subscribe_($,W)}getValue(J,$){this.bind();let Q=this._targetGroup.nCachedObjects_,W=this._bindings[Q];if(W!==void 0)W.getValue(J,$)}setValue(J,$){let Q=this._bindings;for(let W=this._targetGroup.nCachedObjects_,Z=Q.length;W!==Z;++W)Q[W].setValue(J,$)}bind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].bind()}unbind(){let J=this._bindings;for(let $=this._targetGroup.nCachedObjects_,Q=J.length;$!==Q;++$)J[$].unbind()}}class i0{constructor(J,$,Q){this.path=$,this.parsedPath=Q||i0.parseTrackName($),this.node=i0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,$,Q){if(!(J&&J.isAnimationObjectGroup))return new i0(J,$,Q);else return new i0.Composite(J,$,Q)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(JH,"")}static parseTrackName(J){let $=HH.exec(J);if($===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let Q={nodeName:$[2],objectName:$[3],objectIndex:$[4],propertyName:$[5],propertyIndex:$[6]},W=Q.nodeName&&Q.nodeName.lastIndexOf(".");if(W!==void 0&&W!==-1){let Z=Q.nodeName.substring(W+1);if(YH.indexOf(Z)!==-1)Q.nodeName=Q.nodeName.substring(0,W),Q.objectName=Z}if(Q.propertyName===null||Q.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return Q}static findNode(J,$){if($===void 0||$===""||$==="."||$===-1||$===J.name||$===J.uuid)return J;if(J.skeleton){let Q=J.skeleton.getBoneByName($);if(Q!==void 0)return Q}if(J.children){let Q=function(Z){for(let K=0;K<Z.length;K++){let H=Z[K];if(H.name===$||H.uuid===$)return H;let Y=Q(H.children);if(Y)return Y}return null},W=Q(J.children);if(W)return W}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,$){J[$]=this.targetObject[this.propertyName]}_getValue_array(J,$){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)J[$++]=Q[W]}_getValue_arrayElement(J,$){J[$]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,$){this.resolvedProperty.toArray(J,$)}_setValue_direct(J,$){this.targetObject[this.propertyName]=J[$]}_setValue_direct_setNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,$){this.targetObject[this.propertyName]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,$){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)Q[W]=J[$++]}_setValue_array_setNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)Q[W]=J[$++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,$){let Q=this.resolvedProperty;for(let W=0,Z=Q.length;W!==Z;++W)Q[W]=J[$++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,$){this.resolvedProperty[this.propertyIndex]=J[$]}_setValue_arrayElement_setNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty[this.propertyIndex]=J[$],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,$){this.resolvedProperty.fromArray(J,$)}_setValue_fromArray_setNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,$){this.resolvedProperty.fromArray(J,$),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,$){this.bind(),this.getValue(J,$)}_setValue_unbound(J,$){this.bind(),this.setValue(J,$)}bind(){let J=this.node,$=this.parsedPath,Q=$.objectName,W=$.propertyName,Z=$.propertyIndex;if(!J)J=i0.findNode(this.rootNode,$.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){_0("PropertyBinding: No target node found for track: "+this.path+".");return}if(Q){let X=$.objectIndex;switch(Q){case"materials":if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){P0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){P0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){P0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[Q]===void 0){P0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[Q]}if(X!==void 0){if(J[X]===void 0){P0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[W];if(K===void 0){let X=$.nodeName;P0("PropertyBinding: Trying to update property for track: "+X+"."+W+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(Z!==void 0){if(W==="morphTargetInfluences"){if(!J.geometry){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[Z]!==void 0)Z=J.morphTargetDictionary[Z]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=Z}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=W;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}i0.Composite=DZ;i0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};i0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};i0.prototype.GetterByBindingType=[i0.prototype._getValue_direct,i0.prototype._getValue_array,i0.prototype._getValue_arrayElement,i0.prototype._getValue_toArray];i0.prototype.SetterByBindingTypeAndVersioning=[[i0.prototype._setValue_direct,i0.prototype._setValue_direct_setNeedsUpdate,i0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_array,i0.prototype._setValue_array_setNeedsUpdate,i0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_arrayElement,i0.prototype._setValue_arrayElement_setNeedsUpdate,i0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_fromArray,i0.prototype._setValue_fromArray_setNeedsUpdate,i0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var H1=new Float32Array(1);class NQ{static{NQ.prototype.isMatrix2=!0}constructor(J,$,Q,W){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,$,Q,W)}identity(){return this.set(1,0,0,1),this}fromArray(J,$=0){for(let Q=0;Q<4;Q++)this.elements[Q]=J[Q+$];return this}set(J,$,Q,W){let Z=this.elements;return Z[0]=J,Z[2]=$,Z[1]=Q,Z[3]=W,this}}function EQ(J,$,Q,W){let Z=XH(W);switch(Q){case 1021:return J*$;case 1028:return J*$/Z.components*Z.byteLength;case 1029:return J*$/Z.components*Z.byteLength;case 1030:return J*$*2/Z.components*Z.byteLength;case 1031:return J*$*2/Z.components*Z.byteLength;case 1022:return J*$*3/Z.components*Z.byteLength;case 1023:return J*$*4/Z.components*Z.byteLength;case 1033:return J*$*4/Z.components*Z.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max($,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max($,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor(($+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor(($+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor(($+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor(($+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor(($+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor(($+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor(($+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor(($+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor(($+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor(($+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor(($+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor(($+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor(($+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor(($+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil($/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil($/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil($/4)*16}throw Error(`Unable to determine texture byte length for ${Q} format.`)}function XH(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)_0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function xZ(){let J=null,$=!1,Q=null,W=null;function Z(K,H){Q(K,H),W=J.requestAnimationFrame(Z)}return{start:function(){if($===!0)return;if(Q===null)return;if(J===null)return;W=J.requestAnimationFrame(Z),$=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(W);$=!1},setAnimationLoop:function(K){Q=K},setContext:function(K){J=K}}}function UH(J){let $=new WeakMap;function Q(Y,X){let{array:U,usage:E}=Y,N=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,E),Y.onUploadCallback();let D;if(U instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)D=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)D=J.SHORT;else if(U instanceof Uint32Array)D=J.UNSIGNED_INT;else if(U instanceof Int32Array)D=J.INT;else if(U instanceof Int8Array)D=J.BYTE;else if(U instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:D,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:N}}function W(Y,X,U){let{array:E,updateRanges:N}=X;if(J.bindBuffer(U,Y),N.length===0)J.bufferSubData(U,0,E);else{N.sort((D,R)=>D.start-R.start);let G=0;for(let D=1;D<N.length;D++){let R=N[G],z=N[D];if(z.start<=R.start+R.count+1)R.count=Math.max(R.count,z.start+z.count-R.start);else++G,N[G]=z}N.length=G+1;for(let D=0,R=N.length;D<R;D++){let z=N[D];J.bufferSubData(U,z.start*E.BYTES_PER_ELEMENT,E,z.start,z.count)}X.clearUpdateRanges()}X.onUploadCallback()}function Z(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return $.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=$.get(Y);if(X)J.deleteBuffer(X.buffer),$.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let E=$.get(Y);if(!E||E.version<Y.version)$.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=$.get(Y);if(U===void 0)$.set(Y,Q(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(U.buffer,Y,X),U.version=Y.version}}return{get:Z,remove:K,update:H}}var GH=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,NH=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,EH=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qH=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,FH=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,DH=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,OH=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,MH=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,RH=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,kH=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,LH=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,VH=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,BH=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,zH=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,IH=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,CH=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,_H=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,PH=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,TH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,SH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,jH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vH=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,fH=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yH=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,hH=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,bH=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,xH=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,gH=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pH="gl_FragColor = linearToOutputTexel( gl_FragColor );",mH=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lH=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,dH=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,uH=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cH=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,nH=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,sH=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,iH=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,oH=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,aH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,rH=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tH=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,eH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,JY=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$Y=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,QY=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,WY=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ZY=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,KY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,HY=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,YY=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,XY=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,UY=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,GY=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,NY=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,EY=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,qY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,FY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,DY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,MY=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,RY=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,kY=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,LY=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,VY=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,BY=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zY=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,IY=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,CY=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_Y=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,AY=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,PY=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,wY=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,TY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,jY=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vY=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,fY=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yY=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,hY=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bY=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,xY=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,gY=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,pY=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,mY=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,lY=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dY=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,uY=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,cY=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,nY=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,sY=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,iY=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,oY=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,aY=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rY=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,tY=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,eY=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,JX=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$X=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,QX=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,WX=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZX=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KX=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,HX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,YX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,XX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,UX=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,GX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,NX=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,EX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qX=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,OX=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,MX=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,RX=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kX=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,LX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,VX=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BX=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zX=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,IX=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,CX=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_X=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,AX=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,PX=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wX=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TX=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,SX=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jX=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vX=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fX=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,yX=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hX=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bX=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xX=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,gX=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,pX=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,mX=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lX=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,dX=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,v0={alphahash_fragment:GH,alphahash_pars_fragment:NH,alphamap_fragment:EH,alphamap_pars_fragment:qH,alphatest_fragment:FH,alphatest_pars_fragment:DH,aomap_fragment:OH,aomap_pars_fragment:MH,batching_pars_vertex:RH,batching_vertex:kH,begin_vertex:LH,beginnormal_vertex:VH,bsdfs:BH,iridescence_fragment:zH,bumpmap_pars_fragment:IH,clipping_planes_fragment:CH,clipping_planes_pars_fragment:_H,clipping_planes_pars_vertex:AH,clipping_planes_vertex:PH,color_fragment:wH,color_pars_fragment:TH,color_pars_vertex:SH,color_vertex:jH,common:vH,cube_uv_reflection_fragment:fH,defaultnormal_vertex:yH,displacementmap_pars_vertex:hH,displacementmap_vertex:bH,emissivemap_fragment:xH,emissivemap_pars_fragment:gH,colorspace_fragment:pH,colorspace_pars_fragment:mH,envmap_fragment:lH,envmap_common_pars_fragment:dH,envmap_pars_fragment:uH,envmap_pars_vertex:cH,envmap_physical_pars_fragment:QY,envmap_vertex:nH,fog_vertex:sH,fog_pars_vertex:iH,fog_fragment:oH,fog_pars_fragment:aH,gradientmap_pars_fragment:rH,lightmap_pars_fragment:tH,lights_lambert_fragment:eH,lights_lambert_pars_fragment:JY,lights_pars_begin:$Y,lights_toon_fragment:WY,lights_toon_pars_fragment:ZY,lights_phong_fragment:KY,lights_phong_pars_fragment:HY,lights_physical_fragment:YY,lights_physical_pars_fragment:XY,lights_fragment_begin:UY,lights_fragment_maps:GY,lights_fragment_end:NY,lightprobes_pars_fragment:EY,logdepthbuf_fragment:qY,logdepthbuf_pars_fragment:FY,logdepthbuf_pars_vertex:DY,logdepthbuf_vertex:OY,map_fragment:MY,map_pars_fragment:RY,map_particle_fragment:kY,map_particle_pars_fragment:LY,metalnessmap_fragment:VY,metalnessmap_pars_fragment:BY,morphinstance_vertex:zY,morphcolor_vertex:IY,morphnormal_vertex:CY,morphtarget_pars_vertex:_Y,morphtarget_vertex:AY,normal_fragment_begin:PY,normal_fragment_maps:wY,normal_pars_fragment:TY,normal_pars_vertex:SY,normal_vertex:jY,normalmap_pars_fragment:vY,clearcoat_normal_fragment_begin:fY,clearcoat_normal_fragment_maps:yY,clearcoat_pars_fragment:hY,iridescence_pars_fragment:bY,opaque_fragment:xY,packing:gY,premultiplied_alpha_fragment:pY,project_vertex:mY,dithering_fragment:lY,dithering_pars_fragment:dY,roughnessmap_fragment:uY,roughnessmap_pars_fragment:cY,shadowmap_pars_fragment:nY,shadowmap_pars_vertex:sY,shadowmap_vertex:iY,shadowmask_pars_fragment:oY,skinbase_vertex:aY,skinning_pars_vertex:rY,skinning_vertex:tY,skinnormal_vertex:eY,specularmap_fragment:JX,specularmap_pars_fragment:$X,tonemapping_fragment:QX,tonemapping_pars_fragment:WX,transmission_fragment:ZX,transmission_pars_fragment:KX,uv_pars_fragment:HX,uv_pars_vertex:YX,uv_vertex:XX,worldpos_vertex:UX,background_vert:GX,background_frag:NX,backgroundCube_vert:EX,backgroundCube_frag:qX,cube_vert:FX,cube_frag:DX,depth_vert:OX,depth_frag:MX,distance_vert:RX,distance_frag:kX,equirect_vert:LX,equirect_frag:VX,linedashed_vert:BX,linedashed_frag:zX,meshbasic_vert:IX,meshbasic_frag:CX,meshlambert_vert:_X,meshlambert_frag:AX,meshmatcap_vert:PX,meshmatcap_frag:wX,meshnormal_vert:TX,meshnormal_frag:SX,meshphong_vert:jX,meshphong_frag:vX,meshphysical_vert:fX,meshphysical_frag:yX,meshtoon_vert:hX,meshtoon_frag:bX,points_vert:xX,points_frag:gX,shadow_vert:pX,shadow_frag:mX,sprite_vert:lX,sprite_frag:dX},N0={common:{diffuse:{value:new p0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new w0},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new w0}},envmap:{envMap:{value:null},envMapRotation:{value:new w0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new w0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new w0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new w0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new w0},normalScale:{value:new n0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new w0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new w0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new w0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new w0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new p0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new y},probesMax:{value:new y},probesResolution:{value:new y}},points:{diffuse:{value:new p0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0},uvTransform:{value:new w0}},sprite:{diffuse:{value:new p0(16777215)},opacity:{value:1},center:{value:new n0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new w0},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0}}},Z9={basic:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.fog]),vertexShader:v0.meshbasic_vert,fragmentShader:v0.meshbasic_frag},lambert:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},envMapIntensity:{value:1}}]),vertexShader:v0.meshlambert_vert,fragmentShader:v0.meshlambert_frag},phong:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},specular:{value:new p0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:v0.meshphong_vert,fragmentShader:v0.meshphong_frag},standard:{uniforms:A8([N0.common,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.roughnessmap,N0.metalnessmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag},toon:{uniforms:A8([N0.common,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.gradientmap,N0.fog,N0.lights,{emissive:{value:new p0(0)}}]),vertexShader:v0.meshtoon_vert,fragmentShader:v0.meshtoon_frag},matcap:{uniforms:A8([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,{matcap:{value:null}}]),vertexShader:v0.meshmatcap_vert,fragmentShader:v0.meshmatcap_frag},points:{uniforms:A8([N0.points,N0.fog]),vertexShader:v0.points_vert,fragmentShader:v0.points_frag},dashed:{uniforms:A8([N0.common,N0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:v0.linedashed_vert,fragmentShader:v0.linedashed_frag},depth:{uniforms:A8([N0.common,N0.displacementmap]),vertexShader:v0.depth_vert,fragmentShader:v0.depth_frag},normal:{uniforms:A8([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,{opacity:{value:1}}]),vertexShader:v0.meshnormal_vert,fragmentShader:v0.meshnormal_frag},sprite:{uniforms:A8([N0.sprite,N0.fog]),vertexShader:v0.sprite_vert,fragmentShader:v0.sprite_frag},background:{uniforms:{uvTransform:{value:new w0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:v0.background_vert,fragmentShader:v0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new w0}},vertexShader:v0.backgroundCube_vert,fragmentShader:v0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:v0.cube_vert,fragmentShader:v0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:v0.equirect_vert,fragmentShader:v0.equirect_frag},distance:{uniforms:A8([N0.common,N0.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:v0.distance_vert,fragmentShader:v0.distance_frag},shadow:{uniforms:A8([N0.lights,N0.fog,{color:{value:new p0(0)},opacity:{value:1}}]),vertexShader:v0.shadow_vert,fragmentShader:v0.shadow_frag}};Z9.physical={uniforms:A8([Z9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new w0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new w0},clearcoatNormalScale:{value:new n0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new w0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new w0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new w0},sheen:{value:0},sheenColor:{value:new p0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new w0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new w0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new w0},transmissionSamplerSize:{value:new n0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new w0},attenuationDistance:{value:0},attenuationColor:{value:new p0(0)},specularColor:{value:new p0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new w0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new w0},anisotropyVector:{value:new n0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new w0}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag};var $J={r:0,b:0,g:0},uX=new Z8,gZ=new w0;gZ.set(-1,0,0,0,1,0,0,0,1);function cX(J,$,Q,W,Z,K){let H=new p0(0),Y=Z===!0?0:1,X,U,E=null,N=0,G=null;function D(C){let A=C.isScene===!0?C.background:null;if(A&&A.isTexture){let V=C.backgroundBlurriness>0;A=$.get(A,V)}return A}function R(C){let A=!1,V=D(C);if(V===null)F(H,Y);else if(V&&V.isColor)F(V,1),A=!0;let I=J.xr.getEnvironmentBlendMode();if(I==="additive")Q.buffers.color.setClear(0,0,0,1,K);else if(I==="alpha-blend")Q.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||A)Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function z(C,A){let V=D(A);if(V&&(V.isCubeTexture||V.mapping===h6)){if(U===void 0)U=new b8(new B6(1,1,1),new T8({name:"BackgroundCubeMaterial",uniforms:i9(Z9.backgroundCube.uniforms),vertexShader:Z9.backgroundCube.vertexShader,fragmentShader:Z9.backgroundCube.fragmentShader,side:w8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(I,_,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(U);if(U.material.uniforms.envMap.value=V,U.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(uX.makeRotationFromEuler(A.backgroundRotation)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(gZ);if(U.material.toneMapped=g0.getTransfer(V.colorSpace)!==e0,E!==V||N!==V.version||G!==J.toneMapping)U.material.needsUpdate=!0,E=V,N=V.version,G=J.toneMapping;U.layers.enableAll(),C.unshift(U,U.geometry,U.material,0,0,null)}else if(V&&V.isTexture){if(X===void 0)X=new b8(new j9(2,2),new T8({name:"BackgroundMaterial",uniforms:i9(Z9.background.uniforms),vertexShader:Z9.background.vertexShader,fragmentShader:Z9.background.fragmentShader,side:R6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(X);if(X.material.uniforms.t2D.value=V,X.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,X.material.toneMapped=g0.getTransfer(V.colorSpace)!==e0,V.matrixAutoUpdate===!0)V.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(V.matrix),E!==V||N!==V.version||G!==J.toneMapping)X.material.needsUpdate=!0,E=V,N=V.version,G=J.toneMapping;X.layers.enableAll(),C.unshift(X,X.geometry,X.material,0,0,null)}}function F(C,A){C.getRGB($J,s$(J)),Q.buffers.color.setClear($J.r,$J.g,$J.b,A,K)}function q(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(C,A=1){H.set(C),Y=A,F(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(C){Y=C,F(H,Y)},render:R,addToRenderList:z,dispose:q}}function nX(J,$){let Q=J.getParameter(J.MAX_VERTEX_ATTRIBS),W={},Z=G(null),K=Z,H=!1;function Y(P,b,o,g,c){let p=!1,f=N(P,g,o,b);if(K!==f)K=f,U(K.object);if(p=D(P,g,o,c),p)R(P,g,o,c);if(c!==null)$.update(c,J.ELEMENT_ARRAY_BUFFER);if(p||H){if(H=!1,V(P,b,o,g),c!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,$.get(c).buffer)}}function X(){return J.createVertexArray()}function U(P){return J.bindVertexArray(P)}function E(P){return J.deleteVertexArray(P)}function N(P,b,o,g){let c=g.wireframe===!0,p=W[b.id];if(p===void 0)p={},W[b.id]=p;let f=P.isInstancedMesh===!0?P.id:0,a=p[f];if(a===void 0)a={},p[f]=a;let e=a[o.id];if(e===void 0)e={},a[o.id]=e;let J0=e[c];if(J0===void 0)J0=G(X()),e[c]=J0;return J0}function G(P){let b=[],o=[],g=[];for(let c=0;c<Q;c++)b[c]=0,o[c]=0,g[c]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:o,attributeDivisors:g,object:P,attributes:{},index:null}}function D(P,b,o,g){let c=K.attributes,p=b.attributes,f=0,a=o.getAttributes();for(let e in a)if(a[e].location>=0){let k0=c[e],D0=p[e];if(D0===void 0){if(e==="instanceMatrix"&&P.instanceMatrix)D0=P.instanceMatrix;if(e==="instanceColor"&&P.instanceColor)D0=P.instanceColor}if(k0===void 0)return!0;if(k0.attribute!==D0)return!0;if(D0&&k0.data!==D0.data)return!0;f++}if(K.attributesNum!==f)return!0;if(K.index!==g)return!0;return!1}function R(P,b,o,g){let c={},p=b.attributes,f=0,a=o.getAttributes();for(let e in a)if(a[e].location>=0){let k0=p[e];if(k0===void 0){if(e==="instanceMatrix"&&P.instanceMatrix)k0=P.instanceMatrix;if(e==="instanceColor"&&P.instanceColor)k0=P.instanceColor}let D0={};if(D0.attribute=k0,k0&&k0.data)D0.data=k0.data;c[e]=D0,f++}K.attributes=c,K.attributesNum=f,K.index=g}function z(){let P=K.newAttributes;for(let b=0,o=P.length;b<o;b++)P[b]=0}function F(P){q(P,0)}function q(P,b){let{newAttributes:o,enabledAttributes:g,attributeDivisors:c}=K;if(o[P]=1,g[P]===0)J.enableVertexAttribArray(P),g[P]=1;if(c[P]!==b)J.vertexAttribDivisor(P,b),c[P]=b}function C(){let{newAttributes:P,enabledAttributes:b}=K;for(let o=0,g=b.length;o<g;o++)if(b[o]!==P[o])J.disableVertexAttribArray(o),b[o]=0}function A(P,b,o,g,c,p,f){if(f===!0)J.vertexAttribIPointer(P,b,o,c,p);else J.vertexAttribPointer(P,b,o,g,c,p)}function V(P,b,o,g){z();let c=g.attributes,p=o.getAttributes(),f=b.defaultAttributeValues;for(let a in p){let e=p[a];if(e.location>=0){let J0=c[a];if(J0===void 0){if(a==="instanceMatrix"&&P.instanceMatrix)J0=P.instanceMatrix;if(a==="instanceColor"&&P.instanceColor)J0=P.instanceColor}if(J0!==void 0){let{normalized:k0,itemSize:D0}=J0,l0=$.get(J0);if(l0===void 0)continue;let{buffer:u0,type:n,bytesPerElement:W0}=l0,K0=n===J.INT||n===J.UNSIGNED_INT||J0.gpuType===rJ;if(J0.isInterleavedBufferAttribute){let H0=J0.data,L0=H0.stride,j0=J0.offset;if(H0.isInstancedInterleavedBuffer){for(let f0=0;f0<e.locationSize;f0++)q(e.location+f0,H0.meshPerAttribute);if(P.isInstancedMesh!==!0&&g._maxInstanceCount===void 0)g._maxInstanceCount=H0.meshPerAttribute*H0.count}else for(let f0=0;f0<e.locationSize;f0++)F(e.location+f0);J.bindBuffer(J.ARRAY_BUFFER,u0);for(let f0=0;f0<e.locationSize;f0++)A(e.location+f0,D0/e.locationSize,n,k0,L0*W0,(j0+D0/e.locationSize*f0)*W0,K0)}else{if(J0.isInstancedBufferAttribute){for(let H0=0;H0<e.locationSize;H0++)q(e.location+H0,J0.meshPerAttribute);if(P.isInstancedMesh!==!0&&g._maxInstanceCount===void 0)g._maxInstanceCount=J0.meshPerAttribute*J0.count}else for(let H0=0;H0<e.locationSize;H0++)F(e.location+H0);J.bindBuffer(J.ARRAY_BUFFER,u0);for(let H0=0;H0<e.locationSize;H0++)A(e.location+H0,D0/e.locationSize,n,k0,D0*W0,D0/e.locationSize*H0*W0,K0)}}else if(f!==void 0){let k0=f[a];if(k0!==void 0)switch(k0.length){case 2:J.vertexAttrib2fv(e.location,k0);break;case 3:J.vertexAttrib3fv(e.location,k0);break;case 4:J.vertexAttrib4fv(e.location,k0);break;default:J.vertexAttrib1fv(e.location,k0)}}}}C()}function I(){B();for(let P in W){let b=W[P];for(let o in b){let g=b[o];for(let c in g){let p=g[c];for(let f in p)E(p[f].object),delete p[f];delete g[c]}}delete W[P]}}function _(P){if(W[P.id]===void 0)return;let b=W[P.id];for(let o in b){let g=b[o];for(let c in g){let p=g[c];for(let f in p)E(p[f].object),delete p[f];delete g[c]}}delete W[P.id]}function w(P){for(let b in W){let o=W[b];for(let g in o){let c=o[g];if(c[P.id]===void 0)continue;let p=c[P.id];for(let f in p)E(p[f].object),delete p[f];delete c[P.id]}}}function M(P){for(let b in W){let o=W[b],g=P.isInstancedMesh===!0?P.id:0,c=o[g];if(c===void 0)continue;for(let p in c){let f=c[p];for(let a in f)E(f[a].object),delete f[a];delete c[p]}if(delete o[g],Object.keys(o).length===0)delete W[b]}}function B(){if(d(),H=!0,K===Z)return;K=Z,U(K.object)}function d(){Z.geometry=null,Z.program=null,Z.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:d,dispose:I,releaseStatesOfGeometry:_,releaseStatesOfObject:M,releaseStatesOfProgram:w,initAttributes:z,enableAttribute:F,disableUnusedAttributes:C}}function sX(J,$,Q){let W;function Z(X){W=X}function K(X,U){J.drawArrays(W,X,U),Q.update(U,W,1)}function H(X,U,E){if(E===0)return;J.drawArraysInstanced(W,X,U,E),Q.update(U,W,E)}function Y(X,U,E){if(E===0)return;$.get("WEBGL_multi_draw").multiDrawArraysWEBGL(W,X,0,U,0,E);let G=0;for(let D=0;D<E;D++)G+=U[D];Q.update(G,W,1)}this.setMode=Z,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function iX(J,$,Q,W){let Z;function K(){if(Z!==void 0)return Z;if($.has("EXT_texture_filter_anisotropic")===!0){let w=$.get("EXT_texture_filter_anisotropic");Z=J.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Z=0;return Z}function H(w){if(w!==Q9&&W.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(w){let M=w===F9&&($.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float"));if(w!==h8&&W.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==q9&&!M)return!1;return!0}function X(w){if(w==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";w="mediump"}if(w==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=Q.precision!==void 0?Q.precision:"highp",E=X(U);if(E!==U)_0("WebGLRenderer:",U,"not supported, using",E,"instead."),U=E;let N=Q.logarithmicDepthBuffer===!0,G=Q.reversedDepthBuffer===!0&&$.has("EXT_clip_control");if(Q.reversedDepthBuffer===!0&&G===!1)_0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),z=J.getParameter(J.MAX_TEXTURE_SIZE),F=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),q=J.getParameter(J.MAX_VERTEX_ATTRIBS),C=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),A=J.getParameter(J.MAX_VARYING_VECTORS),V=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),I=J.getParameter(J.MAX_SAMPLES),_=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:N,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:R,maxTextureSize:z,maxCubemapSize:F,maxAttributes:q,maxVertexUniforms:C,maxVaryings:A,maxFragmentUniforms:V,maxSamples:I,samples:_}}function oX(J){let $=this,Q=null,W=0,Z=!1,K=!1,H=new N9,Y=new w0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(N,G){let D=N.length!==0||G||W!==0||Z;return Z=G,W=N.length,D},this.beginShadows=function(){K=!0,E(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(N,G){Q=E(N,G,0)},this.setState=function(N,G,D){let{clippingPlanes:R,clipIntersection:z,clipShadows:F}=N,q=J.get(N);if(!Z||R===null||R.length===0||K&&!F)if(K)E(null);else U();else{let C=K?0:W,A=C*4,V=q.clippingState||null;X.value=V,V=E(R,G,A,D);for(let I=0;I!==A;++I)V[I]=Q[I];q.clippingState=V,this.numIntersection=z?this.numPlanes:0,this.numPlanes+=C}};function U(){if(X.value!==Q)X.value=Q,X.needsUpdate=W>0;$.numPlanes=W,$.numIntersection=0}function E(N,G,D,R){let z=N!==null?N.length:0,F=null;if(z!==0){if(F=X.value,R!==!0||F===null){let q=D+z*4,C=G.matrixWorldInverse;if(Y.getNormalMatrix(C),F===null||F.length<q)F=new Float32Array(q);for(let A=0,V=D;A!==z;++A,V+=4)H.copy(N[A]).applyMatrix4(C,Y),H.normal.toArray(F,V),F[V+3]=H.constant}X.value=F,X.needsUpdate=!0}return $.numPlanes=z,$.numIntersection=0,F}}var v9=4,OZ=[0.125,0.215,0.35,0.446,0.526,0.582],t9=20,aX=256,c6=new z6,MZ=new p0,qQ=null,FQ=0,DQ=0,OQ=!1,rX=new y;class kQ{constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,$=0,Q=0.1,W=100,Z={}){let{size:K=256,position:H=rX}=Z;qQ=this._renderer.getRenderTarget(),FQ=this._renderer.getActiveCubeFace(),DQ=this._renderer.getActiveMipmapLevel(),OQ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,Q,W,Y,H),$>0)this._blur(Y,0,0,$);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,$=null){return this._fromTexture(J,$)}fromCubemap(J,$=null){return this._fromTexture(J,$)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=LZ(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=kZ(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(qQ,FQ,DQ),this._renderer.xr.enabled=OQ,J.scissorTest=!1,I6(J,0,0,J.width,J.height)}_fromTexture(J,$){if(J.mapping===L6||J.mapping===p9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);qQ=this._renderer.getRenderTarget(),FQ=this._renderer.getActiveCubeFace(),DQ=this._renderer.getActiveMipmapLevel(),OQ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let Q=$||this._allocateTargets();return this._textureToCubeUV(J,Q),this._applyPMREM(Q),this._cleanup(Q),Q}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),$=4*this._cubeSize,Q={magFilter:_8,minFilter:_8,generateMipmaps:!1,type:F9,format:Q9,colorSpace:f$,depthBuffer:!1},W=RZ(J,$,Q);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==$){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=RZ(J,$,Q);let{_lodMax:Z}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tX(Z)),this._blurMaterial=JU(Z,J,$),this._ggxMaterial=eX(Z,J,$)}return W}_compileMaterial(J){let $=new b8(new L8,J);this._renderer.compile($,c6)}_sceneToCubeUV(J,$,Q,W,Z){let Y=new f8(90,1,$,Q),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],E=this._renderer,N=E.autoClear,G=E.toneMapping;if(E.getClearColor(MZ),E.toneMapping=a8,E.autoClear=!1,E.state.buffers.depth.getReversed())E.setRenderTarget(W),E.clearDepth(),E.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new b8(new B6,new n7({name:"PMREM.Background",side:w8,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,z=R.material,F=!1,q=J.background;if(q){if(q.isColor)z.color.copy(q),J.background=null,F=!0}else z.color.copy(MZ),F=!0;for(let C=0;C<6;C++){let A=C%3;if(A===0)Y.up.set(0,X[C],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x+U[C],Z.y,Z.z);else if(A===1)Y.up.set(0,0,X[C]),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y+U[C],Z.z);else Y.up.set(0,X[C],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y,Z.z+U[C]);let V=this._cubeSize;if(I6(W,A*V,C>2?V:0,V,V),E.setRenderTarget(W),F)E.render(R,Y);E.render(J,Y)}E.toneMapping=G,E.autoClear=N,J.background=q}_textureToCubeUV(J,$){let Q=this._renderer,W=J.mapping===L6||J.mapping===p9;if(W){if(this._cubemapMaterial===null)this._cubemapMaterial=LZ();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=kZ();let Z=W?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=Z;let H=Z.uniforms;H.envMap.value=J;let Y=this._cubeSize;I6($,0,0,3*Y,2*Y),Q.setRenderTarget($),Q.render(K,c6)}_applyPMREM(J){let $=this._renderer,Q=$.autoClear;$.autoClear=!1;let W=this._lodMeshes.length;for(let Z=1;Z<W;Z++)this._applyGGXFilter(J,Z-1,Z);$.autoClear=Q}_applyGGXFilter(J,$,Q){let W=this._renderer,Z=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[Q];H.material=K;let Y=K.uniforms,X=Q/(this._lodMeshes.length-1),U=$/(this._lodMeshes.length-1),E=Math.sqrt(X*X-U*U),N=0+X*1.25,G=E*N,{_lodMax:D}=this,R=this._sizeLods[Q],z=3*R*(Q>D-v9?Q-D+v9:0),F=4*(this._cubeSize-R);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=D-$,I6(Z,z,F,3*R,2*R),W.setRenderTarget(Z),W.render(H,c6),Y.envMap.value=Z.texture,Y.roughness.value=0,Y.mipInt.value=D-Q,I6(J,z,F,3*R,2*R),W.setRenderTarget(J),W.render(H,c6)}_blur(J,$,Q,W,Z){let K=this._pingPongRenderTarget;this._halfBlur(J,K,$,Q,W,"latitudinal",Z),this._halfBlur(K,J,Q,Q,W,"longitudinal",Z)}_halfBlur(J,$,Q,W,Z,K,H){let Y=this._renderer,X=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")P0("blur direction must be either latitudinal or longitudinal!");let U=3,E=this._lodMeshes[W];E.material=X;let N=X.uniforms,G=this._sizeLods[Q]-1,D=isFinite(Z)?Math.PI/(2*G):2*Math.PI/(2*t9-1),R=Z/D,z=isFinite(Z)?1+Math.floor(U*R):t9;if(z>t9)_0(`sigmaRadians, ${Z}, is too large and will clip, as it requested ${z} samples when the maximum is set to ${t9}`);let F=[],q=0;for(let _=0;_<t9;++_){let w=_/R,M=Math.exp(-w*w/2);if(F.push(M),_===0)q+=M;else if(_<z)q+=2*M}for(let _=0;_<F.length;_++)F[_]=F[_]/q;if(N.envMap.value=J.texture,N.samples.value=z,N.weights.value=F,N.latitudinal.value=K==="latitudinal",H)N.poleAxis.value=H;let{_lodMax:C}=this;N.dTheta.value=D,N.mipInt.value=C-Q;let A=this._sizeLods[W],V=3*A*(W>C-v9?W-C+v9:0),I=4*(this._cubeSize-A);I6($,V,I,3*A,2*A),Y.setRenderTarget($),Y.render(E,c6)}}function tX(J){let $=[],Q=[],W=[],Z=J,K=J-v9+1+OZ.length;for(let H=0;H<K;H++){let Y=Math.pow(2,Z);$.push(Y);let X=1/Y;if(H>J-v9)X=OZ[H-J+v9-1];else if(H===0)X=0;Q.push(X);let U=1/(Y-2),E=-U,N=1+U,G=[E,E,N,E,N,N,E,E,N,N,E,N],D=6,R=6,z=3,F=2,q=1,C=new Float32Array(z*R*D),A=new Float32Array(F*R*D),V=new Float32Array(q*R*D);for(let _=0;_<D;_++){let w=_%3*2/3-1,M=_>2?0:-1,B=[w,M,0,w+0.6666666666666666,M,0,w+0.6666666666666666,M+1,0,w,M,0,w+0.6666666666666666,M+1,0,w,M+1,0];C.set(B,z*R*_),A.set(G,F*R*_);let d=[_,_,_,_,_,_];V.set(d,q*R*_)}let I=new L8;if(I.setAttribute("position",new E8(C,z)),I.setAttribute("uv",new E8(A,F)),I.setAttribute("faceIndex",new E8(V,q)),W.push(new b8(I,null)),Z>v9)Z--}return{lodMeshes:W,sizeLods:$,sigmas:Q}}function RZ(J,$,Q){let W=new c8(J,$,Q);return W.texture.mapping=h6,W.texture.name="PMREM.cubeUv",W.scissorTest=!0,W}function I6(J,$,Q,W,Z){J.viewport.set($,Q,W,Z),J.scissor.set($,Q,W,Z)}function eX(J,$,Q){return new T8({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:aX,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:WJ(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:$9,depthTest:!1,depthWrite:!1})}function JU(J,$,Q){let W=new Float32Array(t9),Z=new y(0,1,0);return new T8({name:"SphericalGaussianBlur",defines:{n:t9,CUBEUV_TEXEL_WIDTH:1/$,CUBEUV_TEXEL_HEIGHT:1/Q,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:W},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:Z}},vertexShader:WJ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$9,depthTest:!1,depthWrite:!1})}function kZ(){return new T8({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:WJ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$9,depthTest:!1,depthWrite:!1})}function LZ(){return new T8({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:WJ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$9,depthTest:!1,depthWrite:!1})}function WJ(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class BQ extends c8{constructor(J=1,$={}){super(J,J,$);this.isWebGLCubeRenderTarget=!0;let Q={width:J,height:J,depth:1},W=[Q,Q,Q,Q,Q,Q];this.texture=new a7(W),this._setTextureOptions($),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,$){this.texture.type=$.type,this.texture.colorSpace=$.colorSpace,this.texture.generateMipmaps=$.generateMipmaps,this.texture.minFilter=$.minFilter,this.texture.magFilter=$.magFilter;let Q={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},W=new B6(5,5,5),Z=new T8({name:"CubemapFromEquirect",uniforms:i9(Q.uniforms),vertexShader:Q.vertexShader,fragmentShader:Q.fragmentShader,side:w8,blending:$9});Z.uniforms.tEquirect.value=$;let K=new b8(W,Z),H=$.minFilter;if($.minFilter===m9)$.minFilter=_8;return new YQ(1,10,this).update(J,K),$.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,$=!0,Q=!0,W=!0){let Z=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear($,Q,W);J.setRenderTarget(Z)}}function $U(J){let $=new WeakMap,Q=new WeakMap,W=null;function Z(G,D=!1){if(G===null||G===void 0)return null;if(D)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let D=G.mapping;if(D===_7||D===A7)if($.has(G)){let R=$.get(G).texture;return Y(R,G.mapping)}else{let R=G.image;if(R&&R.height>0){let z=new BQ(R.height);return z.fromEquirectangularTexture(J,G),$.set(G,z),G.addEventListener("dispose",U),Y(z.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let D=G.mapping,R=D===_7||D===A7,z=D===L6||D===p9;if(R||z){let F=Q.get(G),q=F!==void 0?F.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==q){if(W===null)W=new kQ(J);return F=R?W.fromEquirectangular(G,F):W.fromCubemap(G,F),F.texture.pmremVersion=G.pmremVersion,Q.set(G,F),F.texture}else if(F!==void 0)return F.texture;else{let C=G.image;if(R&&C&&C.height>0||z&&C&&X(C)){if(W===null)W=new kQ(J);return F=R?W.fromEquirectangular(G):W.fromCubemap(G),F.texture.pmremVersion=G.pmremVersion,Q.set(G,F),G.addEventListener("dispose",E),F.texture}else return null}}}return G}function Y(G,D){if(D===_7)G.mapping=L6;else if(D===A7)G.mapping=p9;return G}function X(G){let D=0,R=6;for(let z=0;z<R;z++)if(G[z]!==void 0)D++;return D===R}function U(G){let D=G.target;D.removeEventListener("dispose",U);let R=$.get(D);if(R!==void 0)$.delete(D),R.dispose()}function E(G){let D=G.target;D.removeEventListener("dispose",E);let R=Q.get(D);if(R!==void 0)Q.delete(D),R.dispose()}function N(){if($=new WeakMap,Q=new WeakMap,W!==null)W.dispose(),W=null}return{get:Z,dispose:N}}function QU(J){let $={};function Q(W){if($[W]!==void 0)return $[W];let Z=J.getExtension(W);return $[W]=Z,Z}return{has:function(W){return Q(W)!==null},init:function(){Q("EXT_color_buffer_float"),Q("WEBGL_clip_cull_distance"),Q("OES_texture_float_linear"),Q("EXT_color_buffer_half_float"),Q("WEBGL_multisampled_render_to_texture"),Q("WEBGL_render_shared_exponent")},get:function(W){let Z=Q(W);if(Z===null)g9("WebGLRenderer: "+W+" extension not supported.");return Z}}}function WU(J,$,Q,W){let Z={},K=new WeakMap;function H(N){let G=N.target;if(G.index!==null)$.remove(G.index);for(let R in G.attributes)$.remove(G.attributes[R]);G.removeEventListener("dispose",H),delete Z[G.id];let D=K.get(G);if(D)$.remove(D),K.delete(G);if(W.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;Q.memory.geometries--}function Y(N,G){if(Z[G.id]===!0)return G;return G.addEventListener("dispose",H),Z[G.id]=!0,Q.memory.geometries++,G}function X(N){let G=N.attributes;for(let D in G)$.update(G[D],J.ARRAY_BUFFER)}function U(N){let G=[],D=N.index,R=N.attributes.position,z=0;if(R===void 0)return;if(D!==null){let C=D.array;z=D.version;for(let A=0,V=C.length;A<V;A+=3){let I=C[A+0],_=C[A+1],w=C[A+2];G.push(I,_,_,w,w,I)}}else{let C=R.array;z=R.version;for(let A=0,V=C.length/3-1;A<V;A+=3){let I=A+0,_=A+1,w=A+2;G.push(I,_,_,w,w,I)}}let F=new(R.count>=65535?c7:u7)(G,1);F.version=z;let q=K.get(N);if(q)$.remove(q);K.set(N,F)}function E(N){let G=K.get(N);if(G){let D=N.index;if(D!==null){if(G.version<D.version)U(N)}}else U(N);return K.get(N)}return{get:Y,update:X,getWireframeAttribute:E}}function ZU(J,$,Q){let W;function Z(N){W=N}let K,H;function Y(N){K=N.type,H=N.bytesPerElement}function X(N,G){J.drawElements(W,G,K,N*H),Q.update(G,W,1)}function U(N,G,D){if(D===0)return;J.drawElementsInstanced(W,G,K,N*H,D),Q.update(G,W,D)}function E(N,G,D){if(D===0)return;$.get("WEBGL_multi_draw").multiDrawElementsWEBGL(W,G,0,K,N,0,D);let z=0;for(let F=0;F<D;F++)z+=G[F];Q.update(z,W,1)}this.setMode=Z,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=E}function KU(J){let $={geometries:0,textures:0},Q={frame:0,calls:0,triangles:0,points:0,lines:0};function W(K,H,Y){switch(Q.calls++,H){case J.TRIANGLES:Q.triangles+=Y*(K/3);break;case J.LINES:Q.lines+=Y*(K/2);break;case J.LINE_STRIP:Q.lines+=Y*(K-1);break;case J.LINE_LOOP:Q.lines+=Y*K;break;case J.POINTS:Q.points+=Y*K;break;default:P0("WebGLInfo: Unknown draw mode:",H);break}}function Z(){Q.calls=0,Q.triangles=0,Q.points=0,Q.lines=0}return{memory:$,render:Q,programs:null,autoReset:!0,reset:Z,update:W}}function HU(J,$,Q){let W=new WeakMap,Z=new K8;function K(H,Y,X){let U=H.morphTargetInfluences,E=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,N=E!==void 0?E.length:0,G=W.get(Y);if(G===void 0||G.count!==N){let B=function(){w.dispose(),W.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let D=Y.morphAttributes.position!==void 0,R=Y.morphAttributes.normal!==void 0,z=Y.morphAttributes.color!==void 0,F=Y.morphAttributes.position||[],q=Y.morphAttributes.normal||[],C=Y.morphAttributes.color||[],A=0;if(D===!0)A=1;if(R===!0)A=2;if(z===!0)A=3;let V=Y.attributes.position.count*A,I=1;if(V>$.maxTextureSize)I=Math.ceil(V/$.maxTextureSize),V=$.maxTextureSize;let _=new Float32Array(V*I*4*N),w=new m7(_,V,I,N);w.type=q9,w.needsUpdate=!0;let M=A*4;for(let d=0;d<N;d++){let P=F[d],b=q[d],o=C[d],g=V*I*4*d;for(let c=0;c<P.count;c++){let p=c*M;if(D===!0)Z.fromBufferAttribute(P,c),_[g+p+0]=Z.x,_[g+p+1]=Z.y,_[g+p+2]=Z.z,_[g+p+3]=0;if(R===!0)Z.fromBufferAttribute(b,c),_[g+p+4]=Z.x,_[g+p+5]=Z.y,_[g+p+6]=Z.z,_[g+p+7]=0;if(z===!0)Z.fromBufferAttribute(o,c),_[g+p+8]=Z.x,_[g+p+9]=Z.y,_[g+p+10]=Z.z,_[g+p+11]=o.itemSize===4?Z.w:1}}G={count:N,texture:w,size:new n0(V,I)},W.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,Q);else{let D=0;for(let z=0;z<U.length;z++)D+=U[z];let R=Y.morphTargetsRelative?1:1-D;X.getUniforms().setValue(J,"morphTargetBaseInfluence",R),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,Q),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function YU(J,$,Q,W,Z){let K=new WeakMap;function H(U){let E=Z.render.frame,N=U.geometry,G=$.get(U,N);if(K.get(G)!==E)$.update(G),K.set(G,E);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==E){if(Q.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)Q.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,E)}}if(U.isSkinnedMesh){let D=U.skeleton;if(K.get(D)!==E)D.update(),K.set(D,E)}return G}function Y(){K=new WeakMap}function X(U){let E=U.target;if(E.removeEventListener("dispose",X),W.releaseStatesOfObject(E),Q.remove(E.instanceMatrix),E.instanceColor!==null)Q.remove(E.instanceColor)}return{update:H,dispose:Y}}var XU={[uJ]:"LINEAR_TONE_MAPPING",[cJ]:"REINHARD_TONE_MAPPING",[nJ]:"CINEON_TONE_MAPPING",[sJ]:"ACES_FILMIC_TONE_MAPPING",[oJ]:"AGX_TONE_MAPPING",[aJ]:"NEUTRAL_TONE_MAPPING",[iJ]:"CUSTOM_TONE_MAPPING"};function UU(J,$,Q,W,Z,K){let H=new c8($,Q,{type:J,depthBuffer:Z,stencilBuffer:K,samples:W?4:0,depthTexture:Z?new S9($,Q):void 0}),Y=new c8($,Q,{type:F9,depthBuffer:!1,stencilBuffer:!1}),X=new L8;X.setAttribute("position",new y8([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new y8([0,2,0,0,2,0],2));let U=new i$({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),E=new b8(X,U),N=new z6(-1,1,1,-1,0,1),G=null,D=null,R=!1,z,F=null,q=[],C=!1;this.setSize=function(A,V){H.setSize(A,V),Y.setSize(A,V);for(let I=0;I<q.length;I++){let _=q[I];if(_.setSize)_.setSize(A,V)}},this.setEffects=function(A){q=A,C=q.length>0&&q[0].isRenderPass===!0;let{width:V,height:I}=H;for(let _=0;_<q.length;_++){let w=q[_];if(w.setSize)w.setSize(V,I)}},this.begin=function(A,V){if(R)return!1;if(A.toneMapping===a8&&q.length===0)return!1;if(F=V,V!==null){let{width:I,height:_}=V;if(H.width!==I||H.height!==_)this.setSize(I,_)}if(C===!1)A.setRenderTarget(H);return z=A.toneMapping,A.toneMapping=a8,!0},this.hasRenderPass=function(){return C},this.end=function(A,V){A.toneMapping=z,R=!0;let I=H,_=Y;for(let w=0;w<q.length;w++){let M=q[w];if(M.enabled===!1)continue;if(M.render(A,_,I,V),M.needsSwap!==!1){let B=I;I=_,_=B}}if(G!==A.outputColorSpace||D!==A.toneMapping){if(G=A.outputColorSpace,D=A.toneMapping,U.defines={},g0.getTransfer(G)===e0)U.defines.SRGB_TRANSFER="";let w=XU[D];if(w)U.defines[w]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=I.texture,A.setRenderTarget(F),A.render(E,N),F=null,R=!1},this.isCompositing=function(){return R},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var pZ=new I8,LQ=new S9(1,1),mZ=new m7,lZ=new l$,dZ=new a7,VZ=[],BZ=[],zZ=new Float32Array(16),IZ=new Float32Array(9),CZ=new Float32Array(4);function C6(J,$,Q){let W=J[0];if(W<=0||W>0)return J;let Z=$*Q,K=VZ[Z];if(K===void 0)K=new Float32Array(Z),VZ[Z]=K;if($!==0){W.toArray(K,0);for(let H=1,Y=0;H!==$;++H)Y+=Q,J[H].toArray(K,Y)}return K}function F8(J,$){if(J.length!==$.length)return!1;for(let Q=0,W=J.length;Q<W;Q++)if(J[Q]!==$[Q])return!1;return!0}function D8(J,$){for(let Q=0,W=$.length;Q<W;Q++)J[Q]=$[Q]}function ZJ(J,$){let Q=BZ[$];if(Q===void 0)Q=new Int32Array($),BZ[$]=Q;for(let W=0;W!==$;++W)Q[W]=J.allocateTextureUnit();return Q}function GU(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1f(this.addr,$),Q[0]=$}function NU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2f(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(F8(Q,$))return;J.uniform2fv(this.addr,$),D8(Q,$)}}function EU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3f(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else if($.r!==void 0){if(Q[0]!==$.r||Q[1]!==$.g||Q[2]!==$.b)J.uniform3f(this.addr,$.r,$.g,$.b),Q[0]=$.r,Q[1]=$.g,Q[2]=$.b}else{if(F8(Q,$))return;J.uniform3fv(this.addr,$),D8(Q,$)}}function qU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4f(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(F8(Q,$))return;J.uniform4fv(this.addr,$),D8(Q,$)}}function FU(J,$){let Q=this.cache,W=$.elements;if(W===void 0){if(F8(Q,$))return;J.uniformMatrix2fv(this.addr,!1,$),D8(Q,$)}else{if(F8(Q,W))return;CZ.set(W),J.uniformMatrix2fv(this.addr,!1,CZ),D8(Q,W)}}function DU(J,$){let Q=this.cache,W=$.elements;if(W===void 0){if(F8(Q,$))return;J.uniformMatrix3fv(this.addr,!1,$),D8(Q,$)}else{if(F8(Q,W))return;IZ.set(W),J.uniformMatrix3fv(this.addr,!1,IZ),D8(Q,W)}}function OU(J,$){let Q=this.cache,W=$.elements;if(W===void 0){if(F8(Q,$))return;J.uniformMatrix4fv(this.addr,!1,$),D8(Q,$)}else{if(F8(Q,W))return;zZ.set(W),J.uniformMatrix4fv(this.addr,!1,zZ),D8(Q,W)}}function MU(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1i(this.addr,$),Q[0]=$}function RU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2i(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(F8(Q,$))return;J.uniform2iv(this.addr,$),D8(Q,$)}}function kU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3i(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(F8(Q,$))return;J.uniform3iv(this.addr,$),D8(Q,$)}}function LU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4i(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(F8(Q,$))return;J.uniform4iv(this.addr,$),D8(Q,$)}}function VU(J,$){let Q=this.cache;if(Q[0]===$)return;J.uniform1ui(this.addr,$),Q[0]=$}function BU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y)J.uniform2ui(this.addr,$.x,$.y),Q[0]=$.x,Q[1]=$.y}else{if(F8(Q,$))return;J.uniform2uiv(this.addr,$),D8(Q,$)}}function zU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z)J.uniform3ui(this.addr,$.x,$.y,$.z),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z}else{if(F8(Q,$))return;J.uniform3uiv(this.addr,$),D8(Q,$)}}function IU(J,$){let Q=this.cache;if($.x!==void 0){if(Q[0]!==$.x||Q[1]!==$.y||Q[2]!==$.z||Q[3]!==$.w)J.uniform4ui(this.addr,$.x,$.y,$.z,$.w),Q[0]=$.x,Q[1]=$.y,Q[2]=$.z,Q[3]=$.w}else{if(F8(Q,$))return;J.uniform4uiv(this.addr,$),D8(Q,$)}}function CU(J,$,Q){let W=this.cache,Z=Q.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;let K;if(this.type===J.SAMPLER_2D_SHADOW)LQ.compareFunction=Q.isReversedDepthBuffer()?p7:g7,K=LQ;else K=pZ;Q.setTexture2D($||K,Z)}function _U(J,$,Q){let W=this.cache,Z=Q.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;Q.setTexture3D($||lZ,Z)}function AU(J,$,Q){let W=this.cache,Z=Q.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;Q.setTextureCube($||dZ,Z)}function PU(J,$,Q){let W=this.cache,Z=Q.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;Q.setTexture2DArray($||mZ,Z)}function wU(J){switch(J){case 5126:return GU;case 35664:return NU;case 35665:return EU;case 35666:return qU;case 35674:return FU;case 35675:return DU;case 35676:return OU;case 5124:case 35670:return MU;case 35667:case 35671:return RU;case 35668:case 35672:return kU;case 35669:case 35673:return LU;case 5125:return VU;case 36294:return BU;case 36295:return zU;case 36296:return IU;case 35678:case 36198:case 36298:case 36306:case 35682:return CU;case 35679:case 36299:case 36307:return _U;case 35680:case 36300:case 36308:case 36293:return AU;case 36289:case 36303:case 36311:case 36292:return PU}}function TU(J,$){J.uniform1fv(this.addr,$)}function SU(J,$){let Q=C6($,this.size,2);J.uniform2fv(this.addr,Q)}function jU(J,$){let Q=C6($,this.size,3);J.uniform3fv(this.addr,Q)}function vU(J,$){let Q=C6($,this.size,4);J.uniform4fv(this.addr,Q)}function fU(J,$){let Q=C6($,this.size,4);J.uniformMatrix2fv(this.addr,!1,Q)}function yU(J,$){let Q=C6($,this.size,9);J.uniformMatrix3fv(this.addr,!1,Q)}function hU(J,$){let Q=C6($,this.size,16);J.uniformMatrix4fv(this.addr,!1,Q)}function bU(J,$){J.uniform1iv(this.addr,$)}function xU(J,$){J.uniform2iv(this.addr,$)}function gU(J,$){J.uniform3iv(this.addr,$)}function pU(J,$){J.uniform4iv(this.addr,$)}function mU(J,$){J.uniform1uiv(this.addr,$)}function lU(J,$){J.uniform2uiv(this.addr,$)}function dU(J,$){J.uniform3uiv(this.addr,$)}function uU(J,$){J.uniform4uiv(this.addr,$)}function cU(J,$,Q){let W=this.cache,Z=$.length,K=ZJ(Q,Z);if(!F8(W,K))J.uniform1iv(this.addr,K),D8(W,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=LQ;else H=pZ;for(let Y=0;Y!==Z;++Y)Q.setTexture2D($[Y]||H,K[Y])}function nU(J,$,Q){let W=this.cache,Z=$.length,K=ZJ(Q,Z);if(!F8(W,K))J.uniform1iv(this.addr,K),D8(W,K);for(let H=0;H!==Z;++H)Q.setTexture3D($[H]||lZ,K[H])}function sU(J,$,Q){let W=this.cache,Z=$.length,K=ZJ(Q,Z);if(!F8(W,K))J.uniform1iv(this.addr,K),D8(W,K);for(let H=0;H!==Z;++H)Q.setTextureCube($[H]||dZ,K[H])}function iU(J,$,Q){let W=this.cache,Z=$.length,K=ZJ(Q,Z);if(!F8(W,K))J.uniform1iv(this.addr,K),D8(W,K);for(let H=0;H!==Z;++H)Q.setTexture2DArray($[H]||mZ,K[H])}function oU(J){switch(J){case 5126:return TU;case 35664:return SU;case 35665:return jU;case 35666:return vU;case 35674:return fU;case 35675:return yU;case 35676:return hU;case 5124:case 35670:return bU;case 35667:case 35671:return xU;case 35668:case 35672:return gU;case 35669:case 35673:return pU;case 5125:return mU;case 36294:return lU;case 36295:return dU;case 36296:return uU;case 35678:case 36198:case 36298:case 36306:case 35682:return cU;case 35679:case 36299:case 36307:return nU;case 35680:case 36300:case 36308:case 36293:return sU;case 36289:case 36303:case 36311:case 36292:return iU}}class uZ{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.setValue=wU($.type)}}class cZ{constructor(J,$,Q){this.id=J,this.addr=Q,this.cache=[],this.type=$.type,this.size=$.size,this.setValue=oU($.type)}}class nZ{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,$,Q){let W=this.seq;for(let Z=0,K=W.length;Z!==K;++Z){let H=W[Z];H.setValue(J,$[H.id],Q)}}}var MQ=/(\w+)(\])?(\[|\.)?/g;function _Z(J,$){J.seq.push($),J.map[$.id]=$}function aU(J,$,Q){let W=J.name,Z=W.length;MQ.lastIndex=0;while(!0){let K=MQ.exec(W),H=MQ.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===Z){_Z(Q,U===void 0?new uZ(Y,J,$):new cZ(Y,J,$));break}else{let N=Q.map[Y];if(N===void 0)N=new nZ(Y),_Z(Q,N);Q=N}}}class i6{constructor(J,$){this.seq=[],this.map={};let Q=J.getProgramParameter($,J.ACTIVE_UNIFORMS);for(let K=0;K<Q;++K){let H=J.getActiveUniform($,K),Y=J.getUniformLocation($,H.name);aU(H,Y,this)}let W=[],Z=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)W.push(K);else Z.push(K);if(W.length>0)this.seq=W.concat(Z)}setValue(J,$,Q,W){let Z=this.map[$];if(Z!==void 0)Z.setValue(J,Q,W)}setOptional(J,$,Q){let W=$[Q];if(W!==void 0)this.setValue(J,Q,W)}static upload(J,$,Q,W){for(let Z=0,K=$.length;Z!==K;++Z){let H=$[Z],Y=Q[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,W)}}static seqWithValue(J,$){let Q=[];for(let W=0,Z=J.length;W!==Z;++W){let K=J[W];if(K.id in $)Q.push(K)}return Q}}function AZ(J,$,Q){let W=J.createShader($);return J.shaderSource(W,Q),J.compileShader(W),W}var rU=37297,tU=0;function eU(J,$){let Q=J.split(`
`),W=[],Z=Math.max($-6,0),K=Math.min($+6,Q.length);for(let H=Z;H<K;H++){let Y=H+1;W.push(`${Y===$?">":" "} ${Y}: ${Q[H]}`)}return W.join(`
`)}var PZ=new w0;function J5(J){g0._getMatrix(PZ,g0.workingColorSpace,J);let $=`mat3( ${PZ.elements.map((Q)=>Q.toFixed(4))} )`;switch(g0.getTransfer(J)){case y$:return[$,"LinearTransferOETF"];case e0:return[$,"sRGBTransferOETF"];default:return _0("WebGLProgram: Unsupported color space: ",J),[$,"LinearTransferOETF"]}}function wZ(J,$,Q){let W=J.getShaderParameter($,J.COMPILE_STATUS),K=(J.getShaderInfoLog($)||"").trim();if(W&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return Q.toUpperCase()+`

`+K+`

`+eU(J.getShaderSource($),Y)}else return K}function $5(J,$){let Q=J5($);return[`vec4 ${J}( vec4 value ) {`,`	return ${Q[1]}( vec4( value.rgb * ${Q[0]}, value.a ) );`,"}"].join(`
`)}var Q5={[uJ]:"Linear",[cJ]:"Reinhard",[nJ]:"Cineon",[sJ]:"ACESFilmic",[oJ]:"AgX",[aJ]:"Neutral",[iJ]:"Custom"};function W5(J,$){let Q=Q5[$];if(Q===void 0)return _0("WebGLProgram: Unsupported toneMapping:",$),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+Q+"ToneMapping( color ); }"}var QJ=new y;function Z5(){g0.getLuminanceCoefficients(QJ);let J=QJ.x.toFixed(4),$=QJ.y.toFixed(4),Q=QJ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${$}, ${Q} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function K5(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(s6).join(`
`)}function H5(J){let $=[];for(let Q in J){let W=J[Q];if(W===!1)continue;$.push("#define "+Q+" "+W)}return $.join(`
`)}function Y5(J,$){let Q={},W=J.getProgramParameter($,J.ACTIVE_ATTRIBUTES);for(let Z=0;Z<W;Z++){let K=J.getActiveAttrib($,Z),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;Q[H]={type:K.type,location:J.getAttribLocation($,H),locationSize:Y}}return Q}function s6(J){return J!==""}function TZ(J,$){let Q=$.numSpotLightShadows+$.numSpotLightMaps-$.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,$.numDirLights).replace(/NUM_SPOT_LIGHTS/g,$.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,$.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,Q).replace(/NUM_RECT_AREA_LIGHTS/g,$.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,$.numPointLights).replace(/NUM_HEMI_LIGHTS/g,$.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,$.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,$.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,$.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,$.numPointLightShadows)}function SZ(J,$){return J.replace(/NUM_CLIPPING_PLANES/g,$.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,$.numClippingPlanes-$.numClipIntersection)}var X5=/^[ \t]*#include +<([\w\d./]+)>/gm;function VQ(J){return J.replace(X5,G5)}var U5=new Map;function G5(J,$){let Q=v0[$];if(Q===void 0){let W=U5.get($);if(W!==void 0)Q=v0[W],_0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',$,W);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+$+">")}return VQ(Q)}var N5=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function jZ(J){return J.replace(N5,E5)}function E5(J,$,Q,W){let Z="";for(let K=parseInt($);K<parseInt(Q);K++)Z+=W.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return Z}function vZ(J){let $=`precision ${J.precision} float;
	precision ${J.precision} int;
	precision ${J.precision} sampler2D;
	precision ${J.precision} samplerCube;
	precision ${J.precision} sampler3D;
	precision ${J.precision} sampler2DArray;
	precision ${J.precision} sampler2DShadow;
	precision ${J.precision} samplerCubeShadow;
	precision ${J.precision} sampler2DArrayShadow;
	precision ${J.precision} isampler2D;
	precision ${J.precision} isampler3D;
	precision ${J.precision} isamplerCube;
	precision ${J.precision} isampler2DArray;
	precision ${J.precision} usampler2D;
	precision ${J.precision} usampler3D;
	precision ${J.precision} usamplerCube;
	precision ${J.precision} usampler2DArray;
	`;if(J.precision==="highp")$+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")$+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")$+=`
#define LOW_PRECISION`;return $}var q5={[f6]:"SHADOWMAP_TYPE_PCF",[M6]:"SHADOWMAP_TYPE_VSM"};function F5(J){return q5[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var D5={[L6]:"ENVMAP_TYPE_CUBE",[p9]:"ENVMAP_TYPE_CUBE",[h6]:"ENVMAP_TYPE_CUBE_UV"};function O5(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return D5[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var M5={[p9]:"ENVMAP_MODE_REFRACTION"};function R5(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return M5[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var k5={[uW]:"ENVMAP_BLENDING_MULTIPLY",[cW]:"ENVMAP_BLENDING_MIX",[nW]:"ENVMAP_BLENDING_ADD"};function L5(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return k5[J.combine]||"ENVMAP_BLENDING_NONE"}function V5(J){let $=J.envMapCubeUVHeight;if($===null)return null;let Q=Math.log2($)-2,W=1/$;return{texelWidth:1/(3*Math.max(Math.pow(2,Q),112)),texelHeight:W,maxMip:Q}}function B5(J,$,Q,W){let Z=J.getContext(),K=Q.defines,H=Q.vertexShader,Y=Q.fragmentShader,X=F5(Q),U=O5(Q),E=R5(Q),N=L5(Q),G=V5(Q),D=K5(Q),R=H5(K),z=Z.createProgram(),F,q,C=Q.glslVersion?"#version "+Q.glslVersion+`
`:"";if(Q.isRawShaderMaterial){if(F=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R].filter(s6).join(`
`),F.length>0)F+=`
`;if(q=["#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R].filter(s6).join(`
`),q.length>0)q+=`
`}else F=[vZ(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R,Q.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",Q.batching?"#define USE_BATCHING":"",Q.batchingColor?"#define USE_BATCHING_COLOR":"",Q.instancing?"#define USE_INSTANCING":"",Q.instancingColor?"#define USE_INSTANCING_COLOR":"",Q.instancingMorph?"#define USE_INSTANCING_MORPH":"",Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.map?"#define USE_MAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+E:"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.displacementMap?"#define USE_DISPLACEMENTMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.mapUv?"#define MAP_UV "+Q.mapUv:"",Q.alphaMapUv?"#define ALPHAMAP_UV "+Q.alphaMapUv:"",Q.lightMapUv?"#define LIGHTMAP_UV "+Q.lightMapUv:"",Q.aoMapUv?"#define AOMAP_UV "+Q.aoMapUv:"",Q.emissiveMapUv?"#define EMISSIVEMAP_UV "+Q.emissiveMapUv:"",Q.bumpMapUv?"#define BUMPMAP_UV "+Q.bumpMapUv:"",Q.normalMapUv?"#define NORMALMAP_UV "+Q.normalMapUv:"",Q.displacementMapUv?"#define DISPLACEMENTMAP_UV "+Q.displacementMapUv:"",Q.metalnessMapUv?"#define METALNESSMAP_UV "+Q.metalnessMapUv:"",Q.roughnessMapUv?"#define ROUGHNESSMAP_UV "+Q.roughnessMapUv:"",Q.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+Q.anisotropyMapUv:"",Q.clearcoatMapUv?"#define CLEARCOATMAP_UV "+Q.clearcoatMapUv:"",Q.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+Q.clearcoatNormalMapUv:"",Q.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+Q.clearcoatRoughnessMapUv:"",Q.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+Q.iridescenceMapUv:"",Q.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+Q.iridescenceThicknessMapUv:"",Q.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+Q.sheenColorMapUv:"",Q.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+Q.sheenRoughnessMapUv:"",Q.specularMapUv?"#define SPECULARMAP_UV "+Q.specularMapUv:"",Q.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+Q.specularColorMapUv:"",Q.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+Q.specularIntensityMapUv:"",Q.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+Q.transmissionMapUv:"",Q.thicknessMapUv?"#define THICKNESSMAP_UV "+Q.thicknessMapUv:"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexNormals?"#define HAS_NORMAL":"",Q.vertexColors?"#define USE_COLOR":"",Q.vertexAlphas?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.flatShading?"#define FLAT_SHADED":"",Q.skinning?"#define USE_SKINNING":"",Q.morphTargets?"#define USE_MORPHTARGETS":"",Q.morphNormals&&Q.flatShading===!1?"#define USE_MORPHNORMALS":"",Q.morphColors?"#define USE_MORPHCOLORS":"",Q.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+Q.morphTextureStride:"",Q.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+Q.morphTargetsCount:"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+X:"",Q.sizeAttenuation?"#define USE_SIZEATTENUATION":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Q.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(s6).join(`
`),q=[vZ(Q),"#define SHADER_TYPE "+Q.shaderType,"#define SHADER_NAME "+Q.shaderName,R,Q.useFog&&Q.fog?"#define USE_FOG":"",Q.useFog&&Q.fogExp2?"#define FOG_EXP2":"",Q.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",Q.map?"#define USE_MAP":"",Q.matcap?"#define USE_MATCAP":"",Q.envMap?"#define USE_ENVMAP":"",Q.envMap?"#define "+U:"",Q.envMap?"#define "+E:"",Q.envMap?"#define "+N:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",Q.lightMap?"#define USE_LIGHTMAP":"",Q.aoMap?"#define USE_AOMAP":"",Q.bumpMap?"#define USE_BUMPMAP":"",Q.normalMap?"#define USE_NORMALMAP":"",Q.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",Q.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",Q.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",Q.emissiveMap?"#define USE_EMISSIVEMAP":"",Q.anisotropy?"#define USE_ANISOTROPY":"",Q.anisotropyMap?"#define USE_ANISOTROPYMAP":"",Q.clearcoat?"#define USE_CLEARCOAT":"",Q.clearcoatMap?"#define USE_CLEARCOATMAP":"",Q.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",Q.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",Q.dispersion?"#define USE_DISPERSION":"",Q.iridescence?"#define USE_IRIDESCENCE":"",Q.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",Q.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",Q.specularMap?"#define USE_SPECULARMAP":"",Q.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",Q.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",Q.roughnessMap?"#define USE_ROUGHNESSMAP":"",Q.metalnessMap?"#define USE_METALNESSMAP":"",Q.alphaMap?"#define USE_ALPHAMAP":"",Q.alphaTest?"#define USE_ALPHATEST":"",Q.alphaHash?"#define USE_ALPHAHASH":"",Q.sheen?"#define USE_SHEEN":"",Q.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",Q.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",Q.transmission?"#define USE_TRANSMISSION":"",Q.transmissionMap?"#define USE_TRANSMISSIONMAP":"",Q.thicknessMap?"#define USE_THICKNESSMAP":"",Q.vertexTangents&&Q.flatShading===!1?"#define USE_TANGENT":"",Q.vertexColors||Q.instancingColor?"#define USE_COLOR":"",Q.vertexAlphas||Q.batchingColor?"#define USE_COLOR_ALPHA":"",Q.vertexUv1s?"#define USE_UV1":"",Q.vertexUv2s?"#define USE_UV2":"",Q.vertexUv3s?"#define USE_UV3":"",Q.pointsUvs?"#define USE_POINTS_UV":"",Q.gradientMap?"#define USE_GRADIENTMAP":"",Q.flatShading?"#define FLAT_SHADED":"",Q.doubleSided?"#define DOUBLE_SIDED":"",Q.flipSided?"#define FLIP_SIDED":"",Q.shadowMapEnabled?"#define USE_SHADOWMAP":"",Q.shadowMapEnabled?"#define "+X:"",Q.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",Q.numLightProbes>0?"#define USE_LIGHT_PROBES":"",Q.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",Q.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",Q.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",Q.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",Q.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",Q.toneMapping!==a8?"#define TONE_MAPPING":"",Q.toneMapping!==a8?v0.tonemapping_pars_fragment:"",Q.toneMapping!==a8?W5("toneMapping",Q.toneMapping):"",Q.dithering?"#define DITHERING":"",Q.opaque?"#define OPAQUE":"",v0.colorspace_pars_fragment,$5("linearToOutputTexel",Q.outputColorSpace),Z5(),Q.useDepthPacking?"#define DEPTH_PACKING "+Q.depthPacking:"",`
`].filter(s6).join(`
`);if(H=VQ(H),H=TZ(H,Q),H=SZ(H,Q),Y=VQ(Y),Y=TZ(Y,Q),Y=SZ(Y,Q),H=jZ(H),Y=jZ(Y),Q.isRawShaderMaterial!==!0)C=`#version 300 es
`,F=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+F,q=["#define varying in",Q.glslVersion===b$?"":"layout(location = 0) out highp vec4 pc_fragColor;",Q.glslVersion===b$?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+q;let A=C+F+H,V=C+q+Y,I=AZ(Z,Z.VERTEX_SHADER,A),_=AZ(Z,Z.FRAGMENT_SHADER,V);if(Z.attachShader(z,I),Z.attachShader(z,_),Q.index0AttributeName!==void 0)Z.bindAttribLocation(z,0,Q.index0AttributeName);else if(Q.hasPositionAttribute===!0)Z.bindAttribLocation(z,0,"position");Z.linkProgram(z);function w(P){if(J.debug.checkShaderErrors){let b=Z.getProgramInfoLog(z)||"",o=Z.getShaderInfoLog(I)||"",g=Z.getShaderInfoLog(_)||"",c=b.trim(),p=o.trim(),f=g.trim(),a=!0,e=!0;if(Z.getProgramParameter(z,Z.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(Z,z,I,_);else{let J0=wZ(Z,I,"vertex"),k0=wZ(Z,_,"fragment");P0("WebGLProgram: Shader Error "+Z.getError()+" - VALIDATE_STATUS "+Z.getProgramParameter(z,Z.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+c+`
`+J0+`
`+k0)}else if(c!=="")_0("WebGLProgram: Program Info Log:",c);else if(p===""||f==="")e=!1;if(e)P.diagnostics={runnable:a,programLog:c,vertexShader:{log:p,prefix:F},fragmentShader:{log:f,prefix:q}}}Z.deleteShader(I),Z.deleteShader(_),M=new i6(Z,z),B=Y5(Z,z)}let M;this.getUniforms=function(){if(M===void 0)w(this);return M};let B;this.getAttributes=function(){if(B===void 0)w(this);return B};let d=Q.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(d===!1)d=Z.getProgramParameter(z,rU);return d},this.destroy=function(){W.releaseStatesOfProgram(this),Z.deleteProgram(z),this.program=void 0},this.type=Q.shaderType,this.name=Q.shaderName,this.id=tU++,this.cacheKey=$,this.usedTimes=1,this.program=z,this.vertexShader=I,this.fragmentShader=_,this}var z5=0;class sZ{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,$,Q){let W=this._getShaderCacheForMaterial(J);if(W.has($)===!1)W.add($),$.usedTimes++;if(W.has(Q)===!1)W.add(Q),Q.usedTimes++;return this}remove(J){let $=this.materialCache.get(J);for(let Q of $)if(Q.usedTimes--,Q.usedTimes===0)this.shaderCache.delete(Q.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let $=this.materialCache,Q=$.get(J);if(Q===void 0)Q=new Set,$.set(J,Q);return Q}_getShaderStage(J){let $=this.shaderCache,Q=$.get(J);if(Q===void 0)Q=new iZ(J),$.set(J,Q);return Q}}class iZ{constructor(J){this.id=z5++,this.code=J,this.usedTimes=0}}function I5(J){return J===u9||J===h7||J===b7}function C5(J,$,Q,W,Z,K){let H=new l7,Y=new sZ,X=new Set,U=[],E=new Map,N=W.logarithmicDepthBuffer,G=W.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(M){if(X.add(M),M===0)return"uv";return`uv${M}`}function z(M,B,d,P,b,o){let g=P.fog,c=b.geometry,p=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,f=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,a=$.get(M.envMap||p,f),e=!!a&&a.mapping===h6?a.image.height:null,J0=D[M.type];if(M.precision!==null){if(G=W.getMaxPrecision(M.precision),G!==M.precision)_0("WebGLProgram.getParameters:",M.precision,"not supported, using",G,"instead.")}let k0=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,D0=k0!==void 0?k0.length:0,l0=0;if(c.morphAttributes.position!==void 0)l0=1;if(c.morphAttributes.normal!==void 0)l0=2;if(c.morphAttributes.color!==void 0)l0=3;let u0,n,W0,K0;if(J0){let T0=Z9[J0];u0=T0.vertexShader,n=T0.fragmentShader}else{u0=M.vertexShader,n=M.fragmentShader;let T0=Y.getVertexShaderStage(M),H8=Y.getFragmentShaderStage(M);Y.update(M,T0,H8),W0=T0.id,K0=H8.id}let H0=J.getRenderTarget(),L0=J.state.buffers.depth.getReversed(),j0=b.isInstancedMesh===!0,f0=b.isBatchedMesh===!0,y0=!!M.map,o0=!!M.matcap,b0=!!a,x0=!!M.aoMap,O8=!!M.lightMap,p8=!!M.bumpMap&&M.wireframe===!1,Q8=!!M.normalMap,k8=!!M.displacementMap,M8=!!M.emissiveMap,q8=!!M.metalnessMap,j=!!M.roughnessMap,m8=M.anisotropy>0,s0=M.clearcoat>0,W8=M.dispersion>0,L=M.iridescence>0,O=M.sheen>0,T=M.transmission>0,l=m8&&!!M.anisotropyMap,t=s0&&!!M.clearcoatMap,$0=s0&&!!M.clearcoatNormalMap,U0=s0&&!!M.clearcoatRoughnessMap,u=L&&!!M.iridescenceMap,i=L&&!!M.iridescenceThicknessMap,F0=O&&!!M.sheenColorMap,B0=O&&!!M.sheenRoughnessMap,G0=!!M.specularMap,Q0=!!M.specularColorMap,C0=!!M.specularIntensityMap,A0=T&&!!M.transmissionMap,c0=T&&!!M.thicknessMap,S=!!M.gradientMap,Z0=!!M.alphaMap,s=M.alphaTest>0,Y0=!!M.alphaHash,O0=!!M.extensions,r=a8;if(M.toneMapped){if(H0===null||H0.isXRRenderTarget===!0)r=J.toneMapping}let X0={shaderID:J0,shaderType:M.type,shaderName:M.name,vertexShader:u0,fragmentShader:n,defines:M.defines,customVertexShaderID:W0,customFragmentShaderID:K0,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:G,batching:f0,batchingColor:f0&&b._colorsTexture!==null,instancing:j0,instancingColor:j0&&b.instanceColor!==null,instancingMorph:j0&&b.morphTexture!==null,outputColorSpace:H0===null?J.outputColorSpace:H0.isXRRenderTarget===!0?H0.texture.colorSpace:g0.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:y0,matcap:o0,envMap:b0,envMapMode:b0&&a.mapping,envMapCubeUVHeight:e,aoMap:x0,lightMap:O8,bumpMap:p8,normalMap:Q8,displacementMap:k8,emissiveMap:M8,normalMapObjectSpace:Q8&&M.normalMapType===$Z,normalMapTangentSpace:Q8&&M.normalMapType===v$,packedNormalMap:Q8&&M.normalMapType===v$&&I5(M.normalMap.format),metalnessMap:q8,roughnessMap:j,anisotropy:m8,anisotropyMap:l,clearcoat:s0,clearcoatMap:t,clearcoatNormalMap:$0,clearcoatRoughnessMap:U0,dispersion:W8,iridescence:L,iridescenceMap:u,iridescenceThicknessMap:i,sheen:O,sheenColorMap:F0,sheenRoughnessMap:B0,specularMap:G0,specularColorMap:Q0,specularIntensityMap:C0,transmission:T,transmissionMap:A0,thicknessMap:c0,gradientMap:S,opaque:M.transparent===!1&&M.blending===y6&&M.alphaToCoverage===!1,alphaMap:Z0,alphaTest:s,alphaHash:Y0,combine:M.combine,mapUv:y0&&R(M.map.channel),aoMapUv:x0&&R(M.aoMap.channel),lightMapUv:O8&&R(M.lightMap.channel),bumpMapUv:p8&&R(M.bumpMap.channel),normalMapUv:Q8&&R(M.normalMap.channel),displacementMapUv:k8&&R(M.displacementMap.channel),emissiveMapUv:M8&&R(M.emissiveMap.channel),metalnessMapUv:q8&&R(M.metalnessMap.channel),roughnessMapUv:j&&R(M.roughnessMap.channel),anisotropyMapUv:l&&R(M.anisotropyMap.channel),clearcoatMapUv:t&&R(M.clearcoatMap.channel),clearcoatNormalMapUv:$0&&R(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U0&&R(M.clearcoatRoughnessMap.channel),iridescenceMapUv:u&&R(M.iridescenceMap.channel),iridescenceThicknessMapUv:i&&R(M.iridescenceThicknessMap.channel),sheenColorMapUv:F0&&R(M.sheenColorMap.channel),sheenRoughnessMapUv:B0&&R(M.sheenRoughnessMap.channel),specularMapUv:G0&&R(M.specularMap.channel),specularColorMapUv:Q0&&R(M.specularColorMap.channel),specularIntensityMapUv:C0&&R(M.specularIntensityMap.channel),transmissionMapUv:A0&&R(M.transmissionMap.channel),thicknessMapUv:c0&&R(M.thicknessMap.channel),alphaMapUv:Z0&&R(M.alphaMap.channel),vertexTangents:!!c.attributes.tangent&&(Q8||m8),vertexNormals:!!c.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!c.attributes.color&&c.attributes.color.itemSize===4,pointsUvs:b.isPoints===!0&&!!c.attributes.uv&&(y0||Z0),fog:!!g,useFog:M.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||c.attributes.normal===void 0&&Q8===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:N,reversedDepthBuffer:L0,skinning:b.isSkinnedMesh===!0,hasPositionAttribute:c.attributes.position!==void 0,morphTargets:c.morphAttributes.position!==void 0,morphNormals:c.morphAttributes.normal!==void 0,morphColors:c.morphAttributes.color!==void 0,morphTargetsCount:D0,morphTextureStride:l0,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:o.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:M.dithering,shadowMapEnabled:J.shadowMap.enabled&&d.length>0,shadowMapType:J.shadowMap.type,toneMapping:r,decodeVideoTexture:y0&&M.map.isVideoTexture===!0&&g0.getTransfer(M.map.colorSpace)===e0,decodeVideoTextureEmissive:M8&&M.emissiveMap.isVideoTexture===!0&&g0.getTransfer(M.emissiveMap.colorSpace)===e0,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===J9,flipSided:M.side===w8,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:O0&&M.extensions.clipCullDistance===!0&&Q.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(O0&&M.extensions.multiDraw===!0||f0)&&Q.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:Q.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return X0.vertexUv1s=X.has(1),X0.vertexUv2s=X.has(2),X0.vertexUv3s=X.has(3),X.clear(),X0}function F(M){let B=[];if(M.shaderID)B.push(M.shaderID);else B.push(M.customVertexShaderID),B.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let d in M.defines)B.push(d),B.push(M.defines[d]);if(M.isRawShaderMaterial===!1)q(B,M),C(B,M),B.push(J.outputColorSpace);return B.push(M.customProgramCacheKey),B.join()}function q(M,B){M.push(B.precision),M.push(B.outputColorSpace),M.push(B.envMapMode),M.push(B.envMapCubeUVHeight),M.push(B.mapUv),M.push(B.alphaMapUv),M.push(B.lightMapUv),M.push(B.aoMapUv),M.push(B.bumpMapUv),M.push(B.normalMapUv),M.push(B.displacementMapUv),M.push(B.emissiveMapUv),M.push(B.metalnessMapUv),M.push(B.roughnessMapUv),M.push(B.anisotropyMapUv),M.push(B.clearcoatMapUv),M.push(B.clearcoatNormalMapUv),M.push(B.clearcoatRoughnessMapUv),M.push(B.iridescenceMapUv),M.push(B.iridescenceThicknessMapUv),M.push(B.sheenColorMapUv),M.push(B.sheenRoughnessMapUv),M.push(B.specularMapUv),M.push(B.specularColorMapUv),M.push(B.specularIntensityMapUv),M.push(B.transmissionMapUv),M.push(B.thicknessMapUv),M.push(B.combine),M.push(B.fogExp2),M.push(B.sizeAttenuation),M.push(B.morphTargetsCount),M.push(B.morphAttributeCount),M.push(B.numDirLights),M.push(B.numPointLights),M.push(B.numSpotLights),M.push(B.numSpotLightMaps),M.push(B.numHemiLights),M.push(B.numRectAreaLights),M.push(B.numDirLightShadows),M.push(B.numPointLightShadows),M.push(B.numSpotLightShadows),M.push(B.numSpotLightShadowsWithMaps),M.push(B.numLightProbes),M.push(B.shadowMapType),M.push(B.toneMapping),M.push(B.numClippingPlanes),M.push(B.numClipIntersection),M.push(B.depthPacking)}function C(M,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(M.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);M.push(H.mask)}function A(M){let B=D[M.type],d;if(B){let P=Z9[B];d=qZ.clone(P.uniforms)}else d=M.uniforms;return d}function V(M,B){let d=E.get(B);if(d!==void 0)++d.usedTimes;else d=new B5(J,B,M,Z),U.push(d),E.set(B,d);return d}function I(M){if(--M.usedTimes===0){let B=U.indexOf(M);U[B]=U[U.length-1],U.pop(),E.delete(M.cacheKey),M.destroy()}}function _(M){Y.remove(M)}function w(){Y.dispose()}return{getParameters:z,getProgramCacheKey:F,getUniforms:A,acquireProgram:V,releaseProgram:I,releaseShaderCache:_,programs:U,dispose:w}}function _5(){let J=new WeakMap;function $(H){return J.has(H)}function Q(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function W(H){J.delete(H)}function Z(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:$,get:Q,remove:W,update:Z,dispose:K}}function A5(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.material.id!==$.material.id)return J.material.id-$.material.id;else if(J.materialVariant!==$.materialVariant)return J.materialVariant-$.materialVariant;else if(J.z!==$.z)return J.z-$.z;else return J.id-$.id}function fZ(J,$){if(J.groupOrder!==$.groupOrder)return J.groupOrder-$.groupOrder;else if(J.renderOrder!==$.renderOrder)return J.renderOrder-$.renderOrder;else if(J.z!==$.z)return $.z-J.z;else return J.id-$.id}function yZ(){let J=[],$=0,Q=[],W=[],Z=[];function K(){$=0,Q.length=0,W.length=0,Z.length=0}function H(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Y(G,D,R,z,F,q){let C=J[$];if(C===void 0)C={id:G.id,object:G,geometry:D,material:R,materialVariant:H(G),groupOrder:z,renderOrder:G.renderOrder,z:F,group:q},J[$]=C;else C.id=G.id,C.object=G,C.geometry=D,C.material=R,C.materialVariant=H(G),C.groupOrder=z,C.renderOrder=G.renderOrder,C.z=F,C.group=q;return $++,C}function X(G,D,R,z,F,q){let C=Y(G,D,R,z,F,q);if(R.transmission>0)W.push(C);else if(R.transparent===!0)Z.push(C);else Q.push(C)}function U(G,D,R,z,F,q){let C=Y(G,D,R,z,F,q);if(R.transmission>0)W.unshift(C);else if(R.transparent===!0)Z.unshift(C);else Q.unshift(C)}function E(G,D,R){if(Q.length>1)Q.sort(G||A5);if(W.length>1)W.sort(D||fZ);if(Z.length>1)Z.sort(D||fZ);if(R)Q.reverse(),W.reverse(),Z.reverse()}function N(){for(let G=$,D=J.length;G<D;G++){let R=J[G];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:Q,transmissive:W,transparent:Z,init:K,push:X,unshift:U,finish:N,sort:E}}function P5(){let J=new WeakMap;function $(W,Z){let K=J.get(W),H;if(K===void 0)H=new yZ,J.set(W,[H]);else if(Z>=K.length)H=new yZ,K.push(H);else H=K[Z];return H}function Q(){J=new WeakMap}return{get:$,dispose:Q}}function w5(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"DirectionalLight":Q={direction:new y,color:new p0};break;case"SpotLight":Q={position:new y,direction:new y,color:new p0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":Q={position:new y,color:new p0,distance:0,decay:0};break;case"HemisphereLight":Q={direction:new y,skyColor:new p0,groundColor:new p0};break;case"RectAreaLight":Q={color:new p0,position:new y,halfWidth:new y,halfHeight:new y};break}return J[$.id]=Q,Q}}}function T5(){let J={};return{get:function($){if(J[$.id]!==void 0)return J[$.id];let Q;switch($.type){case"DirectionalLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0};break;case"SpotLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0};break;case"PointLight":Q={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[$.id]=Q,Q}}}var S5=0;function j5(J,$){return($.castShadow?2:0)-(J.castShadow?2:0)+($.map?1:0)-(J.map?1:0)}function v5(J){let $=new w5,Q=T5(),W={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)W.probe.push(new y);let Z=new y,K=new Z8,H=new Z8;function Y(U){let E=0,N=0,G=0;for(let B=0;B<9;B++)W.probe[B].set(0,0,0);let D=0,R=0,z=0,F=0,q=0,C=0,A=0,V=0,I=0,_=0,w=0;U.sort(j5);for(let B=0,d=U.length;B<d;B++){let P=U[B],b=P.color,o=P.intensity,g=P.distance,c=null;if(P.shadow&&P.shadow.map)if(P.shadow.map.texture.format===u9)c=P.shadow.map.texture;else c=P.shadow.map.depthTexture||P.shadow.map.texture;if(P.isAmbientLight)E+=b.r*o,N+=b.g*o,G+=b.b*o;else if(P.isLightProbe){for(let p=0;p<9;p++)W.probe[p].addScaledVector(P.sh.coefficients[p],o);w++}else if(P.isDirectionalLight){let p=$.get(P);if(p.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let f=P.shadow,a=Q.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,W.directionalShadow[D]=a,W.directionalShadowMap[D]=c,W.directionalShadowMatrix[D]=P.shadow.matrix,C++}W.directional[D]=p,D++}else if(P.isSpotLight){let p=$.get(P);p.position.setFromMatrixPosition(P.matrixWorld),p.color.copy(b).multiplyScalar(o),p.distance=g,p.coneCos=Math.cos(P.angle),p.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),p.decay=P.decay,W.spot[z]=p;let f=P.shadow;if(P.map){if(W.spotLightMap[I]=P.map,I++,f.updateMatrices(P),P.castShadow)_++}if(W.spotLightMatrix[z]=f.matrix,P.castShadow){let a=Q.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,W.spotShadow[z]=a,W.spotShadowMap[z]=c,V++}z++}else if(P.isRectAreaLight){let p=$.get(P);p.color.copy(b).multiplyScalar(o),p.halfWidth.set(P.width*0.5,0,0),p.halfHeight.set(0,P.height*0.5,0),W.rectArea[F]=p,F++}else if(P.isPointLight){let p=$.get(P);if(p.color.copy(P.color).multiplyScalar(P.intensity),p.distance=P.distance,p.decay=P.decay,P.castShadow){let f=P.shadow,a=Q.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,a.shadowCameraNear=f.camera.near,a.shadowCameraFar=f.camera.far,W.pointShadow[R]=a,W.pointShadowMap[R]=c,W.pointShadowMatrix[R]=P.shadow.matrix,A++}W.point[R]=p,R++}else if(P.isHemisphereLight){let p=$.get(P);p.skyColor.copy(P.color).multiplyScalar(o),p.groundColor.copy(P.groundColor).multiplyScalar(o),W.hemi[q]=p,q++}}if(F>0)if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=N0.LTC_FLOAT_1,W.rectAreaLTC2=N0.LTC_FLOAT_2;else W.rectAreaLTC1=N0.LTC_HALF_1,W.rectAreaLTC2=N0.LTC_HALF_2;W.ambient[0]=E,W.ambient[1]=N,W.ambient[2]=G;let M=W.hash;if(M.directionalLength!==D||M.pointLength!==R||M.spotLength!==z||M.rectAreaLength!==F||M.hemiLength!==q||M.numDirectionalShadows!==C||M.numPointShadows!==A||M.numSpotShadows!==V||M.numSpotMaps!==I||M.numLightProbes!==w)W.directional.length=D,W.spot.length=z,W.rectArea.length=F,W.point.length=R,W.hemi.length=q,W.directionalShadow.length=C,W.directionalShadowMap.length=C,W.pointShadow.length=A,W.pointShadowMap.length=A,W.spotShadow.length=V,W.spotShadowMap.length=V,W.directionalShadowMatrix.length=C,W.pointShadowMatrix.length=A,W.spotLightMatrix.length=V+I-_,W.spotLightMap.length=I,W.numSpotLightShadowsWithMaps=_,W.numLightProbes=w,M.directionalLength=D,M.pointLength=R,M.spotLength=z,M.rectAreaLength=F,M.hemiLength=q,M.numDirectionalShadows=C,M.numPointShadows=A,M.numSpotShadows=V,M.numSpotMaps=I,M.numLightProbes=w,W.version=S5++}function X(U,E){let N=0,G=0,D=0,R=0,z=0,F=E.matrixWorldInverse;for(let q=0,C=U.length;q<C;q++){let A=U[q];if(A.isDirectionalLight){let V=W.directional[N];V.direction.setFromMatrixPosition(A.matrixWorld),Z.setFromMatrixPosition(A.target.matrixWorld),V.direction.sub(Z),V.direction.transformDirection(F),N++}else if(A.isSpotLight){let V=W.spot[D];V.position.setFromMatrixPosition(A.matrixWorld),V.position.applyMatrix4(F),V.direction.setFromMatrixPosition(A.matrixWorld),Z.setFromMatrixPosition(A.target.matrixWorld),V.direction.sub(Z),V.direction.transformDirection(F),D++}else if(A.isRectAreaLight){let V=W.rectArea[R];V.position.setFromMatrixPosition(A.matrixWorld),V.position.applyMatrix4(F),H.identity(),K.copy(A.matrixWorld),K.premultiply(F),H.extractRotation(K),V.halfWidth.set(A.width*0.5,0,0),V.halfHeight.set(0,A.height*0.5,0),V.halfWidth.applyMatrix4(H),V.halfHeight.applyMatrix4(H),R++}else if(A.isPointLight){let V=W.point[G];V.position.setFromMatrixPosition(A.matrixWorld),V.position.applyMatrix4(F),G++}else if(A.isHemisphereLight){let V=W.hemi[z];V.direction.setFromMatrixPosition(A.matrixWorld),V.direction.transformDirection(F),z++}}}return{setup:Y,setupView:X,state:W}}function hZ(J){let $=new v5(J),Q=[],W=[],Z=[];function K(G){N.camera=G,Q.length=0,W.length=0,Z.length=0}function H(G){Q.push(G)}function Y(G){W.push(G)}function X(G){Z.push(G)}function U(){$.setup(Q)}function E(G){$.setupView(Q,G)}let N={lightsArray:Q,shadowsArray:W,lightProbeGridArray:Z,camera:null,lights:$,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:N,setupLights:U,setupLightsView:E,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function f5(J){let $=new WeakMap;function Q(Z,K=0){let H=$.get(Z),Y;if(H===void 0)Y=new hZ(J),$.set(Z,[Y]);else if(K>=H.length)Y=new hZ(J),H.push(Y);else Y=H[K];return Y}function W(){$=new WeakMap}return{get:Q,dispose:W}}var y5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,h5=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,b5=[new y(1,0,0),new y(-1,0,0),new y(0,1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1)],x5=[new y(0,-1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1),new y(0,-1,0),new y(0,-1,0)],bZ=new Z8,n6=new y,RQ=new y;function g5(J,$,Q){let W=new i7,Z=new n0,K=new n0,H=new K8,Y=new o$,X=new a$,U={},E=Q.maxTextureSize,N={[R6]:w8,[w8]:R6,[J9]:J9},G=new T8({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new n0},radius:{value:4}},vertexShader:y5,fragmentShader:h5}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let R=new L8;R.setAttribute("position",new E8(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let z=new b8(R,G),F=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=f6;let q=this.type;this.render=function(_,w,M){if(F.enabled===!1)return;if(F.autoUpdate===!1&&F.needsUpdate===!1)return;if(_.length===0)return;if(this.type===OW)_0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=f6;let B=J.getRenderTarget(),d=J.getActiveCubeFace(),P=J.getActiveMipmapLevel(),b=J.state;if(b.setBlending($9),b.buffers.depth.getReversed()===!0)b.buffers.color.setClear(0,0,0,0);else b.buffers.color.setClear(1,1,1,1);b.buffers.depth.setTest(!0),b.setScissorTest(!1);let o=q!==this.type;if(o)w.traverse(function(g){if(g.material)if(Array.isArray(g.material))g.material.forEach((c)=>c.needsUpdate=!0);else g.material.needsUpdate=!0});for(let g=0,c=_.length;g<c;g++){let p=_[g],f=p.shadow;if(f===void 0){_0("WebGLShadowMap:",p,"has no shadow.");continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;Z.copy(f.mapSize);let a=f.getFrameExtents();if(Z.multiply(a),K.copy(f.mapSize),Z.x>E||Z.y>E){if(Z.x>E)K.x=Math.floor(E/a.x),Z.x=K.x*a.x,f.mapSize.x=K.x;if(Z.y>E)K.y=Math.floor(E/a.y),Z.y=K.y*a.y,f.mapSize.y=K.y}let e=J.state.buffers.depth.getReversed();if(f.camera._reversedDepth=e,f.map===null||o===!0){if(f.map!==null){if(f.map.depthTexture!==null)f.map.depthTexture.dispose(),f.map.depthTexture=null;f.map.dispose()}if(this.type===M6){if(p.isPointLight){_0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}f.map=new c8(Z.x,Z.y,{format:u9,type:F9,minFilter:_8,magFilter:_8,generateMipmaps:!1}),f.map.texture.name=p.name+".shadowMap",f.map.depthTexture=new S9(Z.x,Z.y,q9),f.map.depthTexture.name=p.name+".shadowMapDepth",f.map.depthTexture.format=l9,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P9,f.map.depthTexture.magFilter=P9}else{if(p.isPointLight)f.map=new BQ(Z.x),f.map.depthTexture=new n$(Z.x,w9);else f.map=new c8(Z.x,Z.y),f.map.depthTexture=new S9(Z.x,Z.y,w9);if(f.map.depthTexture.name=p.name+".shadowMap",f.map.depthTexture.format=l9,this.type===f6)f.map.depthTexture.compareFunction=e?p7:g7,f.map.depthTexture.minFilter=_8,f.map.depthTexture.magFilter=_8;else f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P9,f.map.depthTexture.magFilter=P9}f.camera.updateProjectionMatrix()}let J0=f.map.isWebGLCubeRenderTarget?6:1;for(let k0=0;k0<J0;k0++){if(f.map.isWebGLCubeRenderTarget)J.setRenderTarget(f.map,k0),J.clear();else{if(k0===0)J.setRenderTarget(f.map),J.clear();let D0=f.getViewport(k0);H.set(K.x*D0.x,K.y*D0.y,K.x*D0.z,K.y*D0.w),b.viewport(H)}if(p.isPointLight){let{camera:D0,matrix:l0}=f,u0=p.distance||D0.far;if(u0!==D0.far)D0.far=u0,D0.updateProjectionMatrix();n6.setFromMatrixPosition(p.matrixWorld),D0.position.copy(n6),RQ.copy(D0.position),RQ.add(b5[k0]),D0.up.copy(x5[k0]),D0.lookAt(RQ),D0.updateMatrixWorld(),l0.makeTranslation(-n6.x,-n6.y,-n6.z),bZ.multiplyMatrices(D0.projectionMatrix,D0.matrixWorldInverse),f._frustum.setFromProjectionMatrix(bZ,D0.coordinateSystem,D0.reversedDepth)}else f.updateMatrices(p);W=f.getFrustum(),V(w,M,f.camera,p,this.type)}if(f.isPointLightShadow!==!0&&this.type===M6)C(f,M);f.needsUpdate=!1}q=this.type,F.needsUpdate=!1,J.setRenderTarget(B,d,P)};function C(_,w){let M=$.update(z);if(G.defines.VSM_SAMPLES!==_.blurSamples)G.defines.VSM_SAMPLES=_.blurSamples,D.defines.VSM_SAMPLES=_.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(_.mapPass===null)_.mapPass=new c8(Z.x,Z.y,{format:u9,type:F9});G.uniforms.shadow_pass.value=_.map.depthTexture,G.uniforms.resolution.value=_.mapSize,G.uniforms.radius.value=_.radius,J.setRenderTarget(_.mapPass),J.clear(),J.renderBufferDirect(w,null,M,G,z,null),D.uniforms.shadow_pass.value=_.mapPass.texture,D.uniforms.resolution.value=_.mapSize,D.uniforms.radius.value=_.radius,J.setRenderTarget(_.map),J.clear(),J.renderBufferDirect(w,null,M,D,z,null)}function A(_,w,M,B){let d=null,P=M.isPointLight===!0?_.customDistanceMaterial:_.customDepthMaterial;if(P!==void 0)d=P;else if(d=M.isPointLight===!0?X:Y,J.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let b=d.uuid,o=w.uuid,g=U[b];if(g===void 0)g={},U[b]=g;let c=g[o];if(c===void 0)c=d.clone(),g[o]=c,w.addEventListener("dispose",I);d=c}if(d.visible=w.visible,d.wireframe=w.wireframe,B===M6)d.side=w.shadowSide!==null?w.shadowSide:w.side;else d.side=w.shadowSide!==null?w.shadowSide:N[w.side];if(d.alphaMap=w.alphaMap,d.alphaTest=w.alphaToCoverage===!0?0.5:w.alphaTest,d.map=w.map,d.clipShadows=w.clipShadows,d.clippingPlanes=w.clippingPlanes,d.clipIntersection=w.clipIntersection,d.displacementMap=w.displacementMap,d.displacementScale=w.displacementScale,d.displacementBias=w.displacementBias,d.wireframeLinewidth=w.wireframeLinewidth,d.linewidth=w.linewidth,M.isPointLight===!0&&d.isMeshDistanceMaterial===!0){let b=J.properties.get(d);b.light=M}return d}function V(_,w,M,B,d){if(_.visible===!1)return;if(_.layers.test(w.layers)&&(_.isMesh||_.isLine||_.isPoints)){if((_.castShadow||_.receiveShadow&&d===M6)&&(!_.frustumCulled||W.intersectsObject(_))){_.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,_.matrixWorld);let o=$.update(_),g=_.material;if(Array.isArray(g)){let c=o.groups;for(let p=0,f=c.length;p<f;p++){let a=c[p],e=g[a.materialIndex];if(e&&e.visible){let J0=A(_,e,B,d);_.onBeforeShadow(J,_,w,M,o,J0,a),J.renderBufferDirect(M,null,o,J0,_,a),_.onAfterShadow(J,_,w,M,o,J0,a)}}}else if(g.visible){let c=A(_,g,B,d);_.onBeforeShadow(J,_,w,M,o,c,null),J.renderBufferDirect(M,null,o,c,_,null),_.onAfterShadow(J,_,w,M,o,c,null)}}}let b=_.children;for(let o=0,g=b.length;o<g;o++)V(b[o],w,M,B,d)}function I(_){_.target.removeEventListener("dispose",I);for(let M in U){let B=U[M],d=_.target.uuid;if(d in B)B[d].dispose(),delete B[d]}}}function p5(J,$){function Q(){let S=!1,Z0=new K8,s=null,Y0=new K8(0,0,0,0);return{setMask:function(O0){if(s!==O0&&!S)J.colorMask(O0,O0,O0,O0),s=O0},setLocked:function(O0){S=O0},setClear:function(O0,r,X0,T0,H8){if(H8===!0)O0*=T0,r*=T0,X0*=T0;if(Z0.set(O0,r,X0,T0),Y0.equals(Z0)===!1)J.clearColor(O0,r,X0,T0),Y0.copy(Z0)},reset:function(){S=!1,s=null,Y0.set(-1,0,0,0)}}}function W(){let S=!1,Z0=!1,s=null,Y0=null,O0=null;return{setReversed:function(r){if(Z0!==r){let X0=$.get("EXT_clip_control");if(r)X0.clipControlEXT(X0.LOWER_LEFT_EXT,X0.ZERO_TO_ONE_EXT);else X0.clipControlEXT(X0.LOWER_LEFT_EXT,X0.NEGATIVE_ONE_TO_ONE_EXT);Z0=r;let T0=O0;O0=null,this.setClear(T0)}},getReversed:function(){return Z0},setTest:function(r){if(r)H0(J.DEPTH_TEST);else L0(J.DEPTH_TEST)},setMask:function(r){if(s!==r&&!S)J.depthMask(r),s=r},setFunc:function(r){if(Z0)r=NZ[r];if(Y0!==r){switch(r){case bW:J.depthFunc(J.NEVER);break;case xW:J.depthFunc(J.ALWAYS);break;case gW:J.depthFunc(J.LESS);break;case dJ:J.depthFunc(J.LEQUAL);break;case pW:J.depthFunc(J.EQUAL);break;case mW:J.depthFunc(J.GEQUAL);break;case lW:J.depthFunc(J.GREATER);break;case dW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}Y0=r}},setLocked:function(r){S=r},setClear:function(r){if(O0!==r){if(O0=r,Z0)r=1-r;J.clearDepth(r)}},reset:function(){S=!1,s=null,Y0=null,O0=null,Z0=!1}}}function Z(){let S=!1,Z0=null,s=null,Y0=null,O0=null,r=null,X0=null,T0=null,H8=null;return{setTest:function(J8){if(!S)if(J8)H0(J.STENCIL_TEST);else L0(J.STENCIL_TEST)},setMask:function(J8){if(Z0!==J8&&!S)J.stencilMask(J8),Z0=J8},setFunc:function(J8,r8,K9){if(s!==J8||Y0!==r8||O0!==K9)J.stencilFunc(J8,r8,K9),s=J8,Y0=r8,O0=K9},setOp:function(J8,r8,K9){if(r!==J8||X0!==r8||T0!==K9)J.stencilOp(J8,r8,K9),r=J8,X0=r8,T0=K9},setLocked:function(J8){S=J8},setClear:function(J8){if(H8!==J8)J.clearStencil(J8),H8=J8},reset:function(){S=!1,Z0=null,s=null,Y0=null,O0=null,r=null,X0=null,T0=null,H8=null}}}let K=new Q,H=new W,Y=new Z,X=new WeakMap,U=new WeakMap,E={},N={},G={},D=new WeakMap,R=[],z=null,F=!1,q=null,C=null,A=null,V=null,I=null,_=null,w=null,M=new p0(0,0,0),B=0,d=!1,P=null,b=null,o=null,g=null,c=null,p=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),f=!1,a=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(e)[1]),f=a>=1;else if(e.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),f=a>=2;let J0=null,k0={},D0=J.getParameter(J.SCISSOR_BOX),l0=J.getParameter(J.VIEWPORT),u0=new K8().fromArray(D0),n=new K8().fromArray(l0);function W0(S,Z0,s,Y0){let O0=new Uint8Array(4),r=J.createTexture();J.bindTexture(S,r),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let X0=0;X0<s;X0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D(Z0,0,J.RGBA,1,1,Y0,0,J.RGBA,J.UNSIGNED_BYTE,O0);else J.texImage2D(Z0+X0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,O0);return r}let K0={};K0[J.TEXTURE_2D]=W0(J.TEXTURE_2D,J.TEXTURE_2D,1),K0[J.TEXTURE_CUBE_MAP]=W0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),K0[J.TEXTURE_2D_ARRAY]=W0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),K0[J.TEXTURE_3D]=W0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),H0(J.DEPTH_TEST),H.setFunc(dJ),p8(!1),Q8(gJ),H0(J.CULL_FACE),x0($9);function H0(S){if(E[S]!==!0)J.enable(S),E[S]=!0}function L0(S){if(E[S]!==!1)J.disable(S),E[S]=!1}function j0(S,Z0){if(G[S]!==Z0){if(J.bindFramebuffer(S,Z0),G[S]=Z0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=Z0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=Z0;return!0}return!1}function f0(S,Z0){let s=R,Y0=!1;if(S){if(s=D.get(Z0),s===void 0)s=[],D.set(Z0,s);let O0=S.textures;if(s.length!==O0.length||s[0]!==J.COLOR_ATTACHMENT0){for(let r=0,X0=O0.length;r<X0;r++)s[r]=J.COLOR_ATTACHMENT0+r;s.length=O0.length,Y0=!0}}else if(s[0]!==J.BACK)s[0]=J.BACK,Y0=!0;if(Y0)J.drawBuffers(s)}function y0(S){if(z!==S)return J.useProgram(S),z=S,!0;return!1}let o0={[k6]:J.FUNC_ADD,[RW]:J.FUNC_SUBTRACT,[kW]:J.FUNC_REVERSE_SUBTRACT};o0[LW]=J.MIN,o0[VW]=J.MAX;let b0={[BW]:J.ZERO,[zW]:J.ONE,[IW]:J.SRC_COLOR,[_W]:J.SRC_ALPHA,[jW]:J.SRC_ALPHA_SATURATE,[TW]:J.DST_COLOR,[PW]:J.DST_ALPHA,[CW]:J.ONE_MINUS_SRC_COLOR,[AW]:J.ONE_MINUS_SRC_ALPHA,[SW]:J.ONE_MINUS_DST_COLOR,[wW]:J.ONE_MINUS_DST_ALPHA,[vW]:J.CONSTANT_COLOR,[fW]:J.ONE_MINUS_CONSTANT_COLOR,[yW]:J.CONSTANT_ALPHA,[hW]:J.ONE_MINUS_CONSTANT_ALPHA};function x0(S,Z0,s,Y0,O0,r,X0,T0,H8,J8){if(S===$9){if(F===!0)L0(J.BLEND),F=!1;return}if(F===!1)H0(J.BLEND),F=!0;if(S!==MW){if(S!==q||J8!==d){if(C!==k6||I!==k6)J.blendEquation(J.FUNC_ADD),C=k6,I=k6;if(J8)switch(S){case y6:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case pJ:J.blendFunc(J.ONE,J.ONE);break;case mJ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case lJ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:P0("WebGLState: Invalid blending: ",S);break}else switch(S){case y6:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case pJ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case mJ:P0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lJ:P0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:P0("WebGLState: Invalid blending: ",S);break}A=null,V=null,_=null,w=null,M.set(0,0,0),B=0,q=S,d=J8}return}if(O0=O0||Z0,r=r||s,X0=X0||Y0,Z0!==C||O0!==I)J.blendEquationSeparate(o0[Z0],o0[O0]),C=Z0,I=O0;if(s!==A||Y0!==V||r!==_||X0!==w)J.blendFuncSeparate(b0[s],b0[Y0],b0[r],b0[X0]),A=s,V=Y0,_=r,w=X0;if(T0.equals(M)===!1||H8!==B)J.blendColor(T0.r,T0.g,T0.b,H8),M.copy(T0),B=H8;q=S,d=!1}function O8(S,Z0){S.side===J9?L0(J.CULL_FACE):H0(J.CULL_FACE);let s=S.side===w8;if(Z0)s=!s;p8(s),S.blending===y6&&S.transparent===!1?x0($9):x0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),K.setMask(S.colorWrite);let Y0=S.stencilWrite;if(Y.setTest(Y0),Y0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);M8(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?H0(J.SAMPLE_ALPHA_TO_COVERAGE):L0(J.SAMPLE_ALPHA_TO_COVERAGE)}function p8(S){if(P!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);P=S}}function Q8(S){if(S!==FW){if(H0(J.CULL_FACE),S!==b)if(S===gJ)J.cullFace(J.BACK);else if(S===DW)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else L0(J.CULL_FACE);b=S}function k8(S){if(S!==o){if(f)J.lineWidth(S);o=S}}function M8(S,Z0,s){if(S){if(H0(J.POLYGON_OFFSET_FILL),g!==Z0||c!==s){if(g=Z0,c=s,H.getReversed())Z0=-Z0;J.polygonOffset(Z0,s)}}else L0(J.POLYGON_OFFSET_FILL)}function q8(S){if(S)H0(J.SCISSOR_TEST);else L0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+p-1;if(J0!==S)J.activeTexture(S),J0=S}function m8(S,Z0,s){if(s===void 0)if(J0===null)s=J.TEXTURE0+p-1;else s=J0;let Y0=k0[s];if(Y0===void 0)Y0={type:void 0,texture:void 0},k0[s]=Y0;if(Y0.type!==S||Y0.texture!==Z0){if(J0!==s)J.activeTexture(s),J0=s;J.bindTexture(S,Z0||K0[S]),Y0.type=S,Y0.texture=Z0}}function s0(){let S=k0[J0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function W8(){try{J.compressedTexImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function L(){try{J.compressedTexImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function O(){try{J.texSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function l(){try{J.compressedTexSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function t(){try{J.compressedTexSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function $0(){try{J.texStorage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function U0(){try{J.texStorage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function u(){try{J.texImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function i(){try{J.texImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function F0(S){if(N[S]!==void 0)return N[S];else return J.getParameter(S)}function B0(S,Z0){if(N[S]!==Z0)J.pixelStorei(S,Z0),N[S]=Z0}function G0(S){if(u0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),u0.copy(S)}function Q0(S){if(n.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),n.copy(S)}function C0(S,Z0){let s=U.get(Z0);if(s===void 0)s=new WeakMap,U.set(Z0,s);let Y0=s.get(S);if(Y0===void 0)Y0=J.getUniformBlockIndex(Z0,S.name),s.set(S,Y0)}function A0(S,Z0){let Y0=U.get(Z0).get(S);if(X.get(Z0)!==Y0)J.uniformBlockBinding(Z0,Y0,S.__bindingPointIndex),X.set(Z0,Y0)}function c0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),E={},N={},J0=null,k0={},G={},D=new WeakMap,R=[],z=null,F=!1,q=null,C=null,A=null,V=null,I=null,_=null,w=null,M=new p0(0,0,0),B=0,d=!1,P=null,b=null,o=null,g=null,c=null,u0.set(0,0,J.canvas.width,J.canvas.height),n.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:H0,disable:L0,bindFramebuffer:j0,drawBuffers:f0,useProgram:y0,setBlending:x0,setMaterial:O8,setFlipSided:p8,setCullFace:Q8,setLineWidth:k8,setPolygonOffset:M8,setScissorTest:q8,activeTexture:j,bindTexture:m8,unbindTexture:s0,compressedTexImage2D:W8,compressedTexImage3D:L,texImage2D:u,texImage3D:i,pixelStorei:B0,getParameter:F0,updateUBOMapping:C0,uniformBlockBinding:A0,texStorage2D:$0,texStorage3D:U0,texSubImage2D:O,texSubImage3D:T,compressedTexSubImage2D:l,compressedTexSubImage3D:t,scissor:G0,viewport:Q0,reset:c0}}function m5(J,$,Q,W,Z,K,H){let Y=$.has("WEBGL_multisampled_render_to_texture")?$.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new n0,E=new WeakMap,N=new Set,G,D=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(L){}function z(L,O){return R?new OffscreenCanvas(L,O):v6("canvas")}function F(L,O,T){let l=1,t=W8(L);if(t.width>T||t.height>T)l=T/Math.max(t.width,t.height);if(l<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let $0=Math.floor(l*t.width),U0=Math.floor(l*t.height);if(G===void 0)G=z($0,U0);let u=O?z($0,U0):G;return u.width=$0,u.height=U0,u.getContext("2d").drawImage(L,0,0,$0,U0),_0("WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+$0+"x"+U0+")."),u}else{if("data"in L)_0("WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+").");return L}return L}function q(L){return L.generateMipmaps}function C(L){J.generateMipmap(L)}function A(L){if(L.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(L.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function V(L,O,T,l,t,$0=!1){if(L!==null){if(J[L]!==void 0)return J[L];_0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let U0;if(l){if(U0=$.get("EXT_texture_norm16"),!U0)_0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let u=O;if(O===J.RED){if(T===J.FLOAT)u=J.R32F;if(T===J.HALF_FLOAT)u=J.R16F;if(T===J.UNSIGNED_BYTE)u=J.R8;if(T===J.UNSIGNED_SHORT&&U0)u=U0.R16_EXT;if(T===J.SHORT&&U0)u=U0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.R8UI;if(T===J.UNSIGNED_SHORT)u=J.R16UI;if(T===J.UNSIGNED_INT)u=J.R32UI;if(T===J.BYTE)u=J.R8I;if(T===J.SHORT)u=J.R16I;if(T===J.INT)u=J.R32I}if(O===J.RG){if(T===J.FLOAT)u=J.RG32F;if(T===J.HALF_FLOAT)u=J.RG16F;if(T===J.UNSIGNED_BYTE)u=J.RG8;if(T===J.UNSIGNED_SHORT&&U0)u=U0.RG16_EXT;if(T===J.SHORT&&U0)u=U0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.RG8UI;if(T===J.UNSIGNED_SHORT)u=J.RG16UI;if(T===J.UNSIGNED_INT)u=J.RG32UI;if(T===J.BYTE)u=J.RG8I;if(T===J.SHORT)u=J.RG16I;if(T===J.INT)u=J.RG32I}if(O===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.RGB8UI;if(T===J.UNSIGNED_SHORT)u=J.RGB16UI;if(T===J.UNSIGNED_INT)u=J.RGB32UI;if(T===J.BYTE)u=J.RGB8I;if(T===J.SHORT)u=J.RGB16I;if(T===J.INT)u=J.RGB32I}if(O===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)u=J.RGBA16UI;if(T===J.UNSIGNED_INT)u=J.RGBA32UI;if(T===J.BYTE)u=J.RGBA8I;if(T===J.SHORT)u=J.RGBA16I;if(T===J.INT)u=J.RGBA32I}if(O===J.RGB){if(T===J.UNSIGNED_SHORT&&U0)u=U0.RGB16_EXT;if(T===J.SHORT&&U0)u=U0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)u=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)u=J.R11F_G11F_B10F}if(O===J.RGBA){let i=$0?y$:g0.getTransfer(t);if(T===J.FLOAT)u=J.RGBA32F;if(T===J.HALF_FLOAT)u=J.RGBA16F;if(T===J.UNSIGNED_BYTE)u=i===e0?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&U0)u=U0.RGBA16_EXT;if(T===J.SHORT&&U0)u=U0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)u=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)u=J.RGB5_A1}if(u===J.R16F||u===J.R32F||u===J.RG16F||u===J.RG32F||u===J.RGBA16F||u===J.RGBA32F)$.get("EXT_color_buffer_float");return u}function I(L,O){let T;if(L){if(O===null||O===w9||O===V6)T=J.DEPTH24_STENCIL8;else if(O===q9)T=J.DEPTH32F_STENCIL8;else if(O===x6)T=J.DEPTH24_STENCIL8,_0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===w9||O===V6)T=J.DEPTH_COMPONENT24;else if(O===q9)T=J.DEPTH_COMPONENT32F;else if(O===x6)T=J.DEPTH_COMPONENT16;return T}function _(L,O){if(q(L)===!0||L.isFramebufferTexture&&L.minFilter!==P9&&L.minFilter!==_8)return Math.log2(Math.max(O.width,O.height))+1;else if(L.mipmaps!==void 0&&L.mipmaps.length>0)return L.mipmaps.length;else if(L.isCompressedTexture&&Array.isArray(L.image))return O.mipmaps.length;else return 1}function w(L){let O=L.target;if(O.removeEventListener("dispose",w),B(O),O.isVideoTexture)E.delete(O);if(O.isHTMLTexture)N.delete(O)}function M(L){let O=L.target;O.removeEventListener("dispose",M),P(O)}function B(L){let O=W.get(L);if(O.__webglInit===void 0)return;let T=L.source,l=D.get(T);if(l){let t=l[O.__cacheKey];if(t.usedTimes--,t.usedTimes===0)d(L);if(Object.keys(l).length===0)D.delete(T)}W.remove(L)}function d(L){let O=W.get(L);J.deleteTexture(O.__webglTexture);let T=L.source,l=D.get(T);delete l[O.__cacheKey],H.memory.textures--}function P(L){let O=W.get(L);if(L.depthTexture)L.depthTexture.dispose(),W.remove(L.depthTexture);if(L.isWebGLCubeRenderTarget)for(let l=0;l<6;l++){if(Array.isArray(O.__webglFramebuffer[l]))for(let t=0;t<O.__webglFramebuffer[l].length;t++)J.deleteFramebuffer(O.__webglFramebuffer[l][t]);else J.deleteFramebuffer(O.__webglFramebuffer[l]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[l])}else{if(Array.isArray(O.__webglFramebuffer))for(let l=0;l<O.__webglFramebuffer.length;l++)J.deleteFramebuffer(O.__webglFramebuffer[l]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let l=0;l<O.__webglColorRenderbuffer.length;l++)if(O.__webglColorRenderbuffer[l])J.deleteRenderbuffer(O.__webglColorRenderbuffer[l])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let T=L.textures;for(let l=0,t=T.length;l<t;l++){let $0=W.get(T[l]);if($0.__webglTexture)J.deleteTexture($0.__webglTexture),H.memory.textures--;W.remove(T[l])}W.remove(L)}let b=0;function o(){b=0}function g(){return b}function c(L){b=L}function p(){let L=b;if(L>=Z.maxTextures)_0("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+Z.maxTextures);return b+=1,L}function f(L){let O=[];return O.push(L.wrapS),O.push(L.wrapT),O.push(L.wrapR||0),O.push(L.magFilter),O.push(L.minFilter),O.push(L.anisotropy),O.push(L.internalFormat),O.push(L.format),O.push(L.type),O.push(L.generateMipmaps),O.push(L.premultiplyAlpha),O.push(L.flipY),O.push(L.unpackAlignment),O.push(L.colorSpace),O.join()}function a(L,O){let T=W.get(L);if(L.isVideoTexture)m8(L);if(L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&T.__version!==L.version){let l=L.image;if(l===null)_0("WebGLRenderer: Texture marked for update but no image data found.");else if(l.complete===!1)_0("WebGLRenderer: Texture marked for update but image is incomplete");else{L0(T,L,O);return}}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;Q.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+O)}function e(L,O){let T=W.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){L0(T,L,O);return}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;Q.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+O)}function J0(L,O){let T=W.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){L0(T,L,O);return}Q.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+O)}function k0(L,O){let T=W.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&T.__version!==L.version){j0(T,L,O);return}Q.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+O)}let D0={[P7]:J.REPEAT,[w7]:J.CLAMP_TO_EDGE,[sW]:J.MIRRORED_REPEAT},l0={[P9]:J.NEAREST,[iW]:J.NEAREST_MIPMAP_NEAREST,[b6]:J.NEAREST_MIPMAP_LINEAR,[_8]:J.LINEAR,[T7]:J.LINEAR_MIPMAP_NEAREST,[m9]:J.LINEAR_MIPMAP_LINEAR},u0={[QZ]:J.NEVER,[YZ]:J.ALWAYS,[WZ]:J.LESS,[g7]:J.LEQUAL,[ZZ]:J.EQUAL,[p7]:J.GEQUAL,[KZ]:J.GREATER,[HZ]:J.NOTEQUAL};function n(L,O){if(O.type===q9&&$.has("OES_texture_float_linear")===!1&&(O.magFilter===_8||O.magFilter===T7||O.magFilter===b6||O.magFilter===m9||O.minFilter===_8||O.minFilter===T7||O.minFilter===b6||O.minFilter===m9))_0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(L,J.TEXTURE_WRAP_S,D0[O.wrapS]),J.texParameteri(L,J.TEXTURE_WRAP_T,D0[O.wrapT]),L===J.TEXTURE_3D||L===J.TEXTURE_2D_ARRAY)J.texParameteri(L,J.TEXTURE_WRAP_R,D0[O.wrapR]);if(J.texParameteri(L,J.TEXTURE_MAG_FILTER,l0[O.magFilter]),J.texParameteri(L,J.TEXTURE_MIN_FILTER,l0[O.minFilter]),O.compareFunction)J.texParameteri(L,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(L,J.TEXTURE_COMPARE_FUNC,u0[O.compareFunction]);if($.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===P9)return;if(O.minFilter!==b6&&O.minFilter!==m9)return;if(O.type===q9&&$.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||W.get(O).__currentAnisotropy){let T=$.get("EXT_texture_filter_anisotropic");J.texParameterf(L,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,Z.getMaxAnisotropy())),W.get(O).__currentAnisotropy=O.anisotropy}}}function W0(L,O){let T=!1;if(L.__webglInit===void 0)L.__webglInit=!0,O.addEventListener("dispose",w);let l=O.source,t=D.get(l);if(t===void 0)t={},D.set(l,t);let $0=f(O);if($0!==L.__cacheKey){if(t[$0]===void 0)t[$0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;t[$0].usedTimes++;let U0=t[L.__cacheKey];if(U0!==void 0){if(t[L.__cacheKey].usedTimes--,U0.usedTimes===0)d(O)}L.__cacheKey=$0,L.__webglTexture=t[$0].texture}return T}function K0(L,O,T){return Math.floor(Math.floor(L/T)/O)}function H0(L,O,T,l){let $0=L.updateRanges;if($0.length===0)Q.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,T,l,O.data);else{$0.sort((B0,G0)=>B0.start-G0.start);let U0=0;for(let B0=1;B0<$0.length;B0++){let G0=$0[U0],Q0=$0[B0],C0=G0.start+G0.count,A0=K0(Q0.start,O.width,4),c0=K0(G0.start,O.width,4);if(Q0.start<=C0+1&&A0===c0&&K0(Q0.start+Q0.count-1,O.width,4)===A0)G0.count=Math.max(G0.count,Q0.start+Q0.count-G0.start);else++U0,$0[U0]=Q0}$0.length=U0+1;let u=Q.getParameter(J.UNPACK_ROW_LENGTH),i=Q.getParameter(J.UNPACK_SKIP_PIXELS),F0=Q.getParameter(J.UNPACK_SKIP_ROWS);Q.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let B0=0,G0=$0.length;B0<G0;B0++){let Q0=$0[B0],C0=Math.floor(Q0.start/4),A0=Math.ceil(Q0.count/4),c0=C0%O.width,S=Math.floor(C0/O.width),Z0=A0,s=1;Q.pixelStorei(J.UNPACK_SKIP_PIXELS,c0),Q.pixelStorei(J.UNPACK_SKIP_ROWS,S),Q.texSubImage2D(J.TEXTURE_2D,0,c0,S,Z0,1,T,l,O.data)}L.clearUpdateRanges(),Q.pixelStorei(J.UNPACK_ROW_LENGTH,u),Q.pixelStorei(J.UNPACK_SKIP_PIXELS,i),Q.pixelStorei(J.UNPACK_SKIP_ROWS,F0)}}function L0(L,O,T){let l=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)l=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)l=J.TEXTURE_3D;let t=W0(L,O),$0=O.source;Q.bindTexture(l,L.__webglTexture,J.TEXTURE0+T);let U0=W.get($0);if($0.version!==U0.__version||t===!0){if(Q.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let s=g0.getPrimaries(g0.workingColorSpace),Y0=O.colorSpace===c9?null:g0.getPrimaries(O.colorSpace),O0=O.colorSpace===c9||s===Y0?J.NONE:J.BROWSER_DEFAULT_WEBGL;Q.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),Q.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),Q.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,O0)}Q.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let i=F(O.image,!1,Z.maxTextureSize);i=s0(O,i);let F0=K.convert(O.format,O.colorSpace),B0=K.convert(O.type),G0=V(O.internalFormat,F0,B0,O.normalized,O.colorSpace,O.isVideoTexture);n(l,O);let Q0,C0=O.mipmaps,A0=O.isVideoTexture!==!0,c0=U0.__version===void 0||t===!0,S=$0.dataReady,Z0=_(O,i);if(O.isDepthTexture){if(G0=I(O.format===d9,O.type),c0)if(A0)Q.texStorage2D(J.TEXTURE_2D,1,G0,i.width,i.height);else Q.texImage2D(J.TEXTURE_2D,0,G0,i.width,i.height,0,F0,B0,null)}else if(O.isDataTexture)if(C0.length>0){if(A0&&c0)Q.texStorage2D(J.TEXTURE_2D,Z0,G0,C0[0].width,C0[0].height);for(let s=0,Y0=C0.length;s<Y0;s++)if(Q0=C0[s],A0){if(S)Q.texSubImage2D(J.TEXTURE_2D,s,0,0,Q0.width,Q0.height,F0,B0,Q0.data)}else Q.texImage2D(J.TEXTURE_2D,s,G0,Q0.width,Q0.height,0,F0,B0,Q0.data);O.generateMipmaps=!1}else if(A0){if(c0)Q.texStorage2D(J.TEXTURE_2D,Z0,G0,i.width,i.height);if(S)H0(O,i,F0,B0)}else Q.texImage2D(J.TEXTURE_2D,0,G0,i.width,i.height,0,F0,B0,i.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(A0&&c0)Q.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,G0,C0[0].width,C0[0].height,i.depth);for(let s=0,Y0=C0.length;s<Y0;s++)if(Q0=C0[s],O.format!==Q9)if(F0!==null)if(A0){if(S)if(O.layerUpdates.size>0){let O0=EQ(Q0.width,Q0.height,O.format,O.type);for(let r of O.layerUpdates){let X0=Q0.data.subarray(r*O0/Q0.data.BYTES_PER_ELEMENT,(r+1)*O0/Q0.data.BYTES_PER_ELEMENT);Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,r,Q0.width,Q0.height,1,F0,X0)}O.clearLayerUpdates()}else Q.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,Q0.width,Q0.height,i.depth,F0,Q0.data)}else Q.compressedTexImage3D(J.TEXTURE_2D_ARRAY,s,G0,Q0.width,Q0.height,i.depth,0,Q0.data,0,0);else _0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)Q.texSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,Q0.width,Q0.height,i.depth,F0,B0,Q0.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,s,G0,Q0.width,Q0.height,i.depth,0,F0,B0,Q0.data)}else{if(A0&&c0)Q.texStorage2D(J.TEXTURE_2D,Z0,G0,C0[0].width,C0[0].height);for(let s=0,Y0=C0.length;s<Y0;s++)if(Q0=C0[s],O.format!==Q9)if(F0!==null)if(A0){if(S)Q.compressedTexSubImage2D(J.TEXTURE_2D,s,0,0,Q0.width,Q0.height,F0,Q0.data)}else Q.compressedTexImage2D(J.TEXTURE_2D,s,G0,Q0.width,Q0.height,0,Q0.data);else _0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)Q.texSubImage2D(J.TEXTURE_2D,s,0,0,Q0.width,Q0.height,F0,B0,Q0.data)}else Q.texImage2D(J.TEXTURE_2D,s,G0,Q0.width,Q0.height,0,F0,B0,Q0.data)}else if(O.isDataArrayTexture)if(A0){if(c0)Q.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,G0,i.width,i.height,i.depth);if(S)if(O.layerUpdates.size>0){let s=EQ(i.width,i.height,O.format,O.type);for(let Y0 of O.layerUpdates){let O0=i.data.subarray(Y0*s/i.data.BYTES_PER_ELEMENT,(Y0+1)*s/i.data.BYTES_PER_ELEMENT);Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,Y0,i.width,i.height,1,F0,B0,O0)}O.clearLayerUpdates()}else Q.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,i.width,i.height,i.depth,F0,B0,i.data)}else Q.texImage3D(J.TEXTURE_2D_ARRAY,0,G0,i.width,i.height,i.depth,0,F0,B0,i.data);else if(O.isData3DTexture)if(A0){if(c0)Q.texStorage3D(J.TEXTURE_3D,Z0,G0,i.width,i.height,i.depth);if(S)Q.texSubImage3D(J.TEXTURE_3D,0,0,0,0,i.width,i.height,i.depth,F0,B0,i.data)}else Q.texImage3D(J.TEXTURE_3D,0,G0,i.width,i.height,i.depth,0,F0,B0,i.data);else if(O.isFramebufferTexture){if(c0)if(A0)Q.texStorage2D(J.TEXTURE_2D,Z0,G0,i.width,i.height);else{let{width:s,height:Y0}=i;for(let O0=0;O0<Z0;O0++)Q.texImage2D(J.TEXTURE_2D,O0,G0,s,Y0,0,F0,B0,null),s>>=1,Y0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let s=J.canvas;if(!s.hasAttribute("layoutsubtree"))s.setAttribute("layoutsubtree","true");if(i.parentNode!==s){s.appendChild(i),N.add(O),s.onpaint=(Y0)=>{let O0=Y0.changedElements;for(let r of N)if(O0.includes(r.image))r.needsUpdate=!0},s.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,i);else{let{RGBA:O0,RGBA:r,UNSIGNED_BYTE:X0}=J;J.texElementImage2D(J.TEXTURE_2D,0,O0,r,X0,i)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(C0.length>0){if(A0&&c0){let s=W8(C0[0]);Q.texStorage2D(J.TEXTURE_2D,Z0,G0,s.width,s.height)}for(let s=0,Y0=C0.length;s<Y0;s++)if(Q0=C0[s],A0){if(S)Q.texSubImage2D(J.TEXTURE_2D,s,0,0,F0,B0,Q0)}else Q.texImage2D(J.TEXTURE_2D,s,G0,F0,B0,Q0);O.generateMipmaps=!1}else if(A0){if(c0){let s=W8(i);Q.texStorage2D(J.TEXTURE_2D,Z0,G0,s.width,s.height)}if(S)Q.texSubImage2D(J.TEXTURE_2D,0,0,0,F0,B0,i)}else Q.texImage2D(J.TEXTURE_2D,0,G0,F0,B0,i);if(q(O))C(l);if(U0.__version=$0.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function j0(L,O,T){if(O.image.length!==6)return;let l=W0(L,O),t=O.source;Q.bindTexture(J.TEXTURE_CUBE_MAP,L.__webglTexture,J.TEXTURE0+T);let $0=W.get(t);if(t.version!==$0.__version||l===!0){Q.activeTexture(J.TEXTURE0+T);let U0=g0.getPrimaries(g0.workingColorSpace),u=O.colorSpace===c9?null:g0.getPrimaries(O.colorSpace),i=O.colorSpace===c9||U0===u?J.NONE:J.BROWSER_DEFAULT_WEBGL;Q.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),Q.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),Q.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),Q.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,i);let F0=O.isCompressedTexture||O.image[0].isCompressedTexture,B0=O.image[0]&&O.image[0].isDataTexture,G0=[];for(let r=0;r<6;r++){if(!F0&&!B0)G0[r]=F(O.image[r],!0,Z.maxCubemapSize);else G0[r]=B0?O.image[r].image:O.image[r];G0[r]=s0(O,G0[r])}let Q0=G0[0],C0=K.convert(O.format,O.colorSpace),A0=K.convert(O.type),c0=V(O.internalFormat,C0,A0,O.normalized,O.colorSpace),S=O.isVideoTexture!==!0,Z0=$0.__version===void 0||l===!0,s=t.dataReady,Y0=_(O,Q0);n(J.TEXTURE_CUBE_MAP,O);let O0;if(F0){if(S&&Z0)Q.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,Q0.width,Q0.height);for(let r=0;r<6;r++){O0=G0[r].mipmaps;for(let X0=0;X0<O0.length;X0++){let T0=O0[X0];if(O.format!==Q9)if(C0!==null)if(S){if(s)Q.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,0,0,T0.width,T0.height,C0,T0.data)}else Q.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,c0,T0.width,T0.height,0,T0.data);else _0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(s)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,0,0,T0.width,T0.height,C0,A0,T0.data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,c0,T0.width,T0.height,0,C0,A0,T0.data)}}}else{if(O0=O.mipmaps,S&&Z0){if(O0.length>0)Y0++;let r=W8(G0[0]);Q.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,r.width,r.height)}for(let r=0;r<6;r++)if(B0){if(S){if(s)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,G0[r].width,G0[r].height,C0,A0,G0[r].data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,G0[r].width,G0[r].height,0,C0,A0,G0[r].data);for(let X0=0;X0<O0.length;X0++){let H8=O0[X0].image[r].image;if(S){if(s)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,0,0,H8.width,H8.height,C0,A0,H8.data)}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,c0,H8.width,H8.height,0,C0,A0,H8.data)}}else{if(S){if(s)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,C0,A0,G0[r])}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,C0,A0,G0[r]);for(let X0=0;X0<O0.length;X0++){let T0=O0[X0];if(S){if(s)Q.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,0,0,C0,A0,T0.image[r])}else Q.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,c0,C0,A0,T0.image[r])}}}if(q(O))C(J.TEXTURE_CUBE_MAP);if($0.__version=t.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function f0(L,O,T,l,t,$0){let U0=K.convert(T.format,T.colorSpace),u=K.convert(T.type),i=V(T.internalFormat,U0,u,T.normalized,T.colorSpace),F0=W.get(O),B0=W.get(T);if(B0.__renderTarget=O,!F0.__hasExternalTextures){let G0=Math.max(1,O.width>>$0),Q0=Math.max(1,O.height>>$0);if(t===J.TEXTURE_3D||t===J.TEXTURE_2D_ARRAY)Q.texImage3D(t,$0,i,G0,Q0,O.depth,0,U0,u,null);else Q.texImage2D(t,$0,i,G0,Q0,0,U0,u,null)}if(Q.bindFramebuffer(J.FRAMEBUFFER,L),j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,l,t,B0.__webglTexture,0,q8(O));else if(t===J.TEXTURE_2D||t>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&t<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,l,t,B0.__webglTexture,$0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}function y0(L,O,T){if(J.bindRenderbuffer(J.RENDERBUFFER,L),O.depthBuffer){let l=O.depthTexture,t=l&&l.isDepthTexture?l.type:null,$0=I(O.stencilBuffer,t),U0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,q8(O),$0,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,q8(O),$0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,$0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,U0,J.RENDERBUFFER,L)}else{let l=O.textures;for(let t=0;t<l.length;t++){let $0=l[t],U0=K.convert($0.format,$0.colorSpace),u=K.convert($0.type),i=V($0.internalFormat,U0,u,$0.normalized,$0.colorSpace);if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,q8(O),i,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,q8(O),i,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,i,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function o0(L,O,T){let l=O.isWebGLCubeRenderTarget===!0;if(Q.bindFramebuffer(J.FRAMEBUFFER,L),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let t=W.get(O.depthTexture);if(t.__renderTarget=O,!t.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(l){if(t.__webglInit===void 0)t.__webglInit=!0,O.depthTexture.addEventListener("dispose",w);if(t.__webglTexture===void 0){t.__webglTexture=J.createTexture(),Q.bindTexture(J.TEXTURE_CUBE_MAP,t.__webglTexture),n(J.TEXTURE_CUBE_MAP,O.depthTexture);let F0=K.convert(O.depthTexture.format),B0=K.convert(O.depthTexture.type),G0;if(O.depthTexture.format===l9)G0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===d9)G0=J.DEPTH24_STENCIL8;for(let Q0=0;Q0<6;Q0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,G0,O.width,O.height,0,F0,B0,null)}}else a(O.depthTexture,0);let $0=t.__webglTexture,U0=q8(O),u=l?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,i=O.depthTexture.format===d9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===l9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,$0,0,U0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,$0,0);else if(O.depthTexture.format===d9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,$0,0,U0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,$0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function b0(L){let O=W.get(L),T=L.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==L.depthTexture){let l=L.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(l){let t=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,l.removeEventListener("dispose",t)};l.addEventListener("dispose",t),O.__depthDisposeCallback=t}O.__boundDepthTexture=l}if(L.depthTexture&&!O.__autoAllocateDepthBuffer)if(T)for(let l=0;l<6;l++)o0(O.__webglFramebuffer[l],L,l);else{let l=L.texture.mipmaps;if(l&&l.length>0)o0(O.__webglFramebuffer[0],L,0);else o0(O.__webglFramebuffer,L,0)}else if(T){O.__webglDepthbuffer=[];for(let l=0;l<6;l++)if(Q.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[l]),O.__webglDepthbuffer[l]===void 0)O.__webglDepthbuffer[l]=J.createRenderbuffer(),y0(O.__webglDepthbuffer[l],L,!1);else{let t=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,$0=O.__webglDepthbuffer[l];J.bindRenderbuffer(J.RENDERBUFFER,$0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,$0)}}else{let l=L.texture.mipmaps;if(l&&l.length>0)Q.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else Q.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),y0(O.__webglDepthbuffer,L,!1);else{let t=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,$0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,$0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,$0)}}Q.bindFramebuffer(J.FRAMEBUFFER,null)}function x0(L,O,T){let l=W.get(L);if(O!==void 0)f0(l.__webglFramebuffer,L,L.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)b0(L)}function O8(L){let O=L.texture,T=W.get(L),l=W.get(O);L.addEventListener("dispose",M);let t=L.textures,$0=L.isWebGLCubeRenderTarget===!0,U0=t.length>1;if(!U0){if(l.__webglTexture===void 0)l.__webglTexture=J.createTexture();l.__version=O.version,H.memory.textures++}if($0){T.__webglFramebuffer=[];for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer[u]=[];for(let i=0;i<O.mipmaps.length;i++)T.__webglFramebuffer[u][i]=J.createFramebuffer()}else T.__webglFramebuffer[u]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer=[];for(let u=0;u<O.mipmaps.length;u++)T.__webglFramebuffer[u]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(U0)for(let u=0,i=t.length;u<i;u++){let F0=W.get(t[u]);if(F0.__webglTexture===void 0)F0.__webglTexture=J.createTexture(),H.memory.textures++}if(L.samples>0&&j(L)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],Q.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let u=0;u<t.length;u++){let i=t[u];T.__webglColorRenderbuffer[u]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[u]);let F0=K.convert(i.format,i.colorSpace),B0=K.convert(i.type),G0=V(i.internalFormat,F0,B0,i.normalized,i.colorSpace,L.isXRRenderTarget===!0),Q0=q8(L);J.renderbufferStorageMultisample(J.RENDERBUFFER,Q0,G0,L.width,L.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u,J.RENDERBUFFER,T.__webglColorRenderbuffer[u])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),L.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),y0(T.__webglDepthRenderbuffer,L,!0);Q.bindFramebuffer(J.FRAMEBUFFER,null)}}if($0){Q.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture),n(J.TEXTURE_CUBE_MAP,O);for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)f0(T.__webglFramebuffer[u][i],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,i);else f0(T.__webglFramebuffer[u],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,0);if(q(O))C(J.TEXTURE_CUBE_MAP);Q.unbindTexture()}else if(U0){for(let u=0,i=t.length;u<i;u++){let F0=t[u],B0=W.get(F0),G0=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)G0=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Q.bindTexture(G0,B0.__webglTexture),n(G0,F0),f0(T.__webglFramebuffer,L,F0,J.COLOR_ATTACHMENT0+u,G0,0),q(F0))C(G0)}Q.unbindTexture()}else{let u=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)u=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if(Q.bindTexture(u,l.__webglTexture),n(u,O),O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)f0(T.__webglFramebuffer[i],L,O,J.COLOR_ATTACHMENT0,u,i);else f0(T.__webglFramebuffer,L,O,J.COLOR_ATTACHMENT0,u,0);if(q(O))C(u);Q.unbindTexture()}if(L.depthBuffer)b0(L)}function p8(L){let O=L.textures;for(let T=0,l=O.length;T<l;T++){let t=O[T];if(q(t)){let $0=A(L),U0=W.get(t).__webglTexture;Q.bindTexture($0,U0),C($0),Q.unbindTexture()}}}let Q8=[],k8=[];function M8(L){if(L.samples>0){if(j(L)===!1){let{textures:O,width:T,height:l}=L,t=J.COLOR_BUFFER_BIT,$0=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,U0=W.get(L),u=O.length>1;if(u)for(let F0=0;F0<O.length;F0++)Q.bindFramebuffer(J.FRAMEBUFFER,U0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,null),Q.bindFramebuffer(J.FRAMEBUFFER,U0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,null,0);Q.bindFramebuffer(J.READ_FRAMEBUFFER,U0.__webglMultisampledFramebuffer);let i=L.texture.mipmaps;if(i&&i.length>0)Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglFramebuffer[0]);else Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglFramebuffer);for(let F0=0;F0<O.length;F0++){if(L.resolveDepthBuffer){if(L.depthBuffer)t|=J.DEPTH_BUFFER_BIT;if(L.stencilBuffer&&L.resolveStencilBuffer)t|=J.STENCIL_BUFFER_BIT}if(u){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,U0.__webglColorRenderbuffer[F0]);let B0=W.get(O[F0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,B0,0)}if(J.blitFramebuffer(0,0,T,l,0,0,T,l,t,J.NEAREST),X===!0){if(Q8.length=0,k8.length=0,Q8.push(J.COLOR_ATTACHMENT0+F0),L.depthBuffer&&L.resolveDepthBuffer===!1)Q8.push($0),k8.push($0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,k8);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,Q8)}}if(Q.bindFramebuffer(J.READ_FRAMEBUFFER,null),Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),u)for(let F0=0;F0<O.length;F0++){Q.bindFramebuffer(J.FRAMEBUFFER,U0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,U0.__webglColorRenderbuffer[F0]);let B0=W.get(O[F0]).__webglTexture;Q.bindFramebuffer(J.FRAMEBUFFER,U0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,B0,0)}Q.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&X){let O=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function q8(L){return Math.min(Z.maxSamples,L.samples)}function j(L){let O=W.get(L);return L.samples>0&&$.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function m8(L){let O=H.render.frame;if(E.get(L)!==O)E.set(L,O),L.update()}function s0(L,O){let{colorSpace:T,format:l,type:t}=L;if(L.isCompressedTexture===!0||L.isVideoTexture===!0)return O;if(T!==f$&&T!==c9)if(g0.getTransfer(T)===e0){if(l!==Q9||t!==h8)_0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else P0("WebGLTextures: Unsupported texture color space:",T);return O}function W8(L){if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement)U.width=L.naturalWidth||L.width,U.height=L.naturalHeight||L.height;else if(typeof VideoFrame<"u"&&L instanceof VideoFrame)U.width=L.displayWidth,U.height=L.displayHeight;else U.width=L.width,U.height=L.height;return U}this.allocateTextureUnit=p,this.resetTextureUnits=o,this.getTextureUnits=g,this.setTextureUnits=c,this.setTexture2D=a,this.setTexture2DArray=e,this.setTexture3D=J0,this.setTextureCube=k0,this.rebindTextures=x0,this.setupRenderTarget=O8,this.updateRenderTargetMipmap=p8,this.updateMultisampleRenderTarget=M8,this.setupDepthRenderbuffer=b0,this.setupFrameBufferTexture=f0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return Q.buffers.depth.getReversed()}}function l5(J,$){function Q(W,Z=c9){let K,H=g0.getTransfer(Z);if(W===h8)return J.UNSIGNED_BYTE;if(W===tJ)return J.UNSIGNED_SHORT_4_4_4_4;if(W===eJ)return J.UNSIGNED_SHORT_5_5_5_1;if(W===rW)return J.UNSIGNED_INT_5_9_9_9_REV;if(W===tW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(W===oW)return J.BYTE;if(W===aW)return J.SHORT;if(W===x6)return J.UNSIGNED_SHORT;if(W===rJ)return J.INT;if(W===w9)return J.UNSIGNED_INT;if(W===q9)return J.FLOAT;if(W===F9)return J.HALF_FLOAT;if(W===eW)return J.ALPHA;if(W===JZ)return J.RGB;if(W===Q9)return J.RGBA;if(W===l9)return J.DEPTH_COMPONENT;if(W===d9)return J.DEPTH_STENCIL;if(W===S7)return J.RED;if(W===J$)return J.RED_INTEGER;if(W===u9)return J.RG;if(W===$$)return J.RG_INTEGER;if(W===Q$)return J.RGBA_INTEGER;if(W===j7||W===v7||W===f7||W===y7)if(H===e0)if(K=$.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(W===j7)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===v7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===f7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===y7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=$.get("WEBGL_compressed_texture_s3tc"),K!==null){if(W===j7)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===v7)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===f7)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===y7)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===W$||W===Z$||W===K$||W===H$)if(K=$.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(W===W$)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===Z$)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===K$)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===H$)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===Y$||W===X$||W===U$||W===G$||W===N$||W===h7||W===E$)if(K=$.get("WEBGL_compressed_texture_etc"),K!==null){if(W===Y$||W===X$)return H===e0?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(W===U$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(W===G$)return K.COMPRESSED_R11_EAC;if(W===N$)return K.COMPRESSED_SIGNED_R11_EAC;if(W===h7)return K.COMPRESSED_RG11_EAC;if(W===E$)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(W===q$||W===F$||W===D$||W===O$||W===M$||W===R$||W===k$||W===L$||W===V$||W===B$||W===z$||W===I$||W===C$||W===_$)if(K=$.get("WEBGL_compressed_texture_astc"),K!==null){if(W===q$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===F$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===D$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===O$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===M$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===R$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===k$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===L$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===V$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===B$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===z$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===I$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===C$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===_$)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===A$||W===P$||W===w$)if(K=$.get("EXT_texture_compression_bptc"),K!==null){if(W===A$)return H===e0?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===P$)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===w$)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===T$||W===S$||W===b7||W===j$)if(K=$.get("EXT_texture_compression_rgtc"),K!==null){if(W===T$)return K.COMPRESSED_RED_RGTC1_EXT;if(W===S$)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===b7)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===j$)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===V6)return J.UNSIGNED_INT_24_8;return J[W]!==void 0?J[W]:null}return{convert:Q}}var d5=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,u5=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class oZ{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,$){if(this.texture===null){let Q=new r7(J.texture);if(J.depthNear!==$.depthNear||J.depthFar!==$.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=Q}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let $=J.cameras[0].viewport,Q=new T8({vertexShader:d5,fragmentShader:u5,uniforms:{depthColor:{value:this.texture},depthWidth:{value:$.z},depthHeight:{value:$.w}}});this.mesh=new b8(new j9(20,20),Q)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class aZ extends D9{constructor(J,$){super();let Q=this,W=null,Z=1,K=null,H="local-floor",Y=1,X=null,U=null,E=null,N=null,G=null,D=null,R=typeof XRWebGLBinding<"u",z=new oZ,F={},q=$.getContextAttributes(),C=null,A=null,V=[],I=[],_=new n0,w=null,M=new f8;M.viewport=new K8;let B=new f8;B.viewport=new K8;let d=[M,B],P=new XQ,b=null,o=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(n){let W0=V[n];if(W0===void 0)W0=new m6,V[n]=W0;return W0.getTargetRaySpace()},this.getControllerGrip=function(n){let W0=V[n];if(W0===void 0)W0=new m6,V[n]=W0;return W0.getGripSpace()},this.getHand=function(n){let W0=V[n];if(W0===void 0)W0=new m6,V[n]=W0;return W0.getHandSpace()};function g(n){let W0=I.indexOf(n.inputSource);if(W0===-1)return;let K0=V[W0];if(K0!==void 0)K0.update(n.inputSource,n.frame,X||K),K0.dispatchEvent({type:n.type,data:n.inputSource})}function c(){W.removeEventListener("select",g),W.removeEventListener("selectstart",g),W.removeEventListener("selectend",g),W.removeEventListener("squeeze",g),W.removeEventListener("squeezestart",g),W.removeEventListener("squeezeend",g),W.removeEventListener("end",c),W.removeEventListener("inputsourceschange",p);for(let n=0;n<V.length;n++){let W0=I[n];if(W0===null)continue;I[n]=null,V[n].disconnect(W0)}b=null,o=null,z.reset();for(let n in F)delete F[n];J.setRenderTarget(C),G=null,N=null,E=null,W=null,A=null,u0.stop(),Q.isPresenting=!1,J.setPixelRatio(w),J.setSize(_.width,_.height,!1),Q.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(n){if(Z=n,Q.isPresenting===!0)_0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(n){if(H=n,Q.isPresenting===!0)_0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(n){X=n},this.getBaseLayer=function(){return N!==null?N:G},this.getBinding=function(){if(E===null&&R)E=new XRWebGLBinding(W,$);return E},this.getFrame=function(){return D},this.getSession=function(){return W},this.setSession=async function(n){if(W=n,W!==null){if(C=J.getRenderTarget(),W.addEventListener("select",g),W.addEventListener("selectstart",g),W.addEventListener("selectend",g),W.addEventListener("squeeze",g),W.addEventListener("squeezestart",g),W.addEventListener("squeezeend",g),W.addEventListener("end",c),W.addEventListener("inputsourceschange",p),q.xrCompatible!==!0)await $.makeXRCompatible();if(w=J.getPixelRatio(),J.getSize(_),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let K0={antialias:q.antialias,alpha:!0,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:Z};G=new XRWebGLLayer(W,$,K0),W.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),A=new c8(G.framebufferWidth,G.framebufferHeight,{format:Q9,type:h8,colorSpace:J.outputColorSpace,stencilBuffer:q.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}else{let K0=null,H0=null,L0=null;if(q.depth)L0=q.stencil?$.DEPTH24_STENCIL8:$.DEPTH_COMPONENT24,K0=q.stencil?d9:l9,H0=q.stencil?V6:w9;let j0={colorFormat:$.RGBA8,depthFormat:L0,scaleFactor:Z};E=this.getBinding(),N=E.createProjectionLayer(j0),W.updateRenderState({layers:[N]}),J.setPixelRatio(1),J.setSize(N.textureWidth,N.textureHeight,!1),A=new c8(N.textureWidth,N.textureHeight,{format:Q9,type:h8,depthTexture:new S9(N.textureWidth,N.textureHeight,H0,void 0,void 0,void 0,void 0,void 0,void 0,K0),stencilBuffer:q.stencil,colorSpace:J.outputColorSpace,samples:q.antialias?4:0,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await W.requestReferenceSpace(H),u0.setContext(W),u0.start(),Q.isPresenting=!0,Q.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(W!==null)return W.environmentBlendMode},this.getDepthTexture=function(){return z.getDepthTexture()};function p(n){for(let W0=0;W0<n.removed.length;W0++){let K0=n.removed[W0],H0=I.indexOf(K0);if(H0>=0)I[H0]=null,V[H0].disconnect(K0)}for(let W0=0;W0<n.added.length;W0++){let K0=n.added[W0],H0=I.indexOf(K0);if(H0===-1){for(let j0=0;j0<V.length;j0++)if(j0>=I.length){I.push(K0),H0=j0;break}else if(I[j0]===null){I[j0]=K0,H0=j0;break}if(H0===-1)break}let L0=V[H0];if(L0)L0.connect(K0)}}let f=new y,a=new y;function e(n,W0,K0){f.setFromMatrixPosition(W0.matrixWorld),a.setFromMatrixPosition(K0.matrixWorld);let H0=f.distanceTo(a),L0=W0.projectionMatrix.elements,j0=K0.projectionMatrix.elements,f0=L0[14]/(L0[10]-1),y0=L0[14]/(L0[10]+1),o0=(L0[9]+1)/L0[5],b0=(L0[9]-1)/L0[5],x0=(L0[8]-1)/L0[0],O8=(j0[8]+1)/j0[0],p8=f0*x0,Q8=f0*O8,k8=H0/(-x0+O8),M8=k8*-x0;if(W0.matrixWorld.decompose(n.position,n.quaternion,n.scale),n.translateX(M8),n.translateZ(k8),n.matrixWorld.compose(n.position,n.quaternion,n.scale),n.matrixWorldInverse.copy(n.matrixWorld).invert(),L0[10]===-1)n.projectionMatrix.copy(W0.projectionMatrix),n.projectionMatrixInverse.copy(W0.projectionMatrixInverse);else{let q8=f0+k8,j=y0+k8,m8=p8-M8,s0=Q8+(H0-M8),W8=o0*y0/j*q8,L=b0*y0/j*q8;n.projectionMatrix.makePerspective(m8,s0,W8,L,q8,j),n.projectionMatrixInverse.copy(n.projectionMatrix).invert()}}function J0(n,W0){if(W0===null)n.matrixWorld.copy(n.matrix);else n.matrixWorld.multiplyMatrices(W0.matrixWorld,n.matrix);n.matrixWorldInverse.copy(n.matrixWorld).invert()}this.updateCamera=function(n){if(W===null)return;let{near:W0,far:K0}=n;if(z.texture!==null){if(z.depthNear>0)W0=z.depthNear;if(z.depthFar>0)K0=z.depthFar}if(P.near=B.near=M.near=W0,P.far=B.far=M.far=K0,b!==P.near||o!==P.far)W.updateRenderState({depthNear:P.near,depthFar:P.far}),b=P.near,o=P.far;P.layers.mask=n.layers.mask|6,M.layers.mask=P.layers.mask&-5,B.layers.mask=P.layers.mask&-3;let H0=n.parent,L0=P.cameras;J0(P,H0);for(let j0=0;j0<L0.length;j0++)J0(L0[j0],H0);if(L0.length===2)e(P,M,B);else P.projectionMatrix.copy(M.projectionMatrix);k0(n,P,H0)};function k0(n,W0,K0){if(K0===null)n.matrix.copy(W0.matrixWorld);else n.matrix.copy(K0.matrixWorld),n.matrix.invert(),n.matrix.multiply(W0.matrixWorld);if(n.matrix.decompose(n.position,n.quaternion,n.scale),n.updateMatrixWorld(!0),n.projectionMatrix.copy(W0.projectionMatrix),n.projectionMatrixInverse.copy(W0.projectionMatrixInverse),n.isPerspectiveCamera)n.fov=z7*2*Math.atan(1/n.projectionMatrix.elements[5]),n.zoom=1}this.getCamera=function(){return P},this.getFoveation=function(){if(N===null&&G===null)return;return Y},this.setFoveation=function(n){if(Y=n,N!==null)N.fixedFoveation=n;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=n},this.hasDepthSensing=function(){return z.texture!==null},this.getDepthSensingMesh=function(){return z.getMesh(P)},this.getCameraTexture=function(n){return F[n]};let D0=null;function l0(n,W0){if(U=W0.getViewerPose(X||K),D=W0,U!==null){let K0=U.views;if(G!==null)J.setRenderTargetFramebuffer(A,G.framebuffer),J.setRenderTarget(A);let H0=!1;if(K0.length!==P.cameras.length)P.cameras.length=0,H0=!0;for(let y0=0;y0<K0.length;y0++){let o0=K0[y0],b0=null;if(G!==null)b0=G.getViewport(o0);else{let O8=E.getViewSubImage(N,o0);if(b0=O8.viewport,y0===0)J.setRenderTargetTextures(A,O8.colorTexture,O8.depthStencilTexture),J.setRenderTarget(A)}let x0=d[y0];if(x0===void 0)x0=new f8,x0.layers.enable(y0),x0.viewport=new K8,d[y0]=x0;if(x0.matrix.fromArray(o0.transform.matrix),x0.matrix.decompose(x0.position,x0.quaternion,x0.scale),x0.projectionMatrix.fromArray(o0.projectionMatrix),x0.projectionMatrixInverse.copy(x0.projectionMatrix).invert(),x0.viewport.set(b0.x,b0.y,b0.width,b0.height),y0===0)P.matrix.copy(x0.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale);if(H0===!0)P.cameras.push(x0)}let L0=W.enabledFeatures;if(L0&&L0.includes("depth-sensing")&&W.depthUsage=="gpu-optimized"&&R){E=Q.getBinding();let y0=E.getDepthInformation(K0[0]);if(y0&&y0.isValid&&y0.texture)z.init(y0,W.renderState)}if(L0&&L0.includes("camera-access")&&R){J.state.unbindTexture(),E=Q.getBinding();for(let y0=0;y0<K0.length;y0++){let o0=K0[y0].camera;if(o0){let b0=F[o0];if(!b0)b0=new r7,F[o0]=b0;let x0=E.getCameraImage(o0);b0.sourceTexture=x0}}}}for(let K0=0;K0<V.length;K0++){let H0=I[K0],L0=V[K0];if(H0!==null&&L0!==void 0)L0.update(H0,W0,X||K)}if(D0)D0(n,W0);if(W0.detectedPlanes)Q.dispatchEvent({type:"planesdetected",data:W0});D=null}let u0=new xZ;u0.setAnimationLoop(l0),this.setAnimationLoop=function(n){D0=n},this.dispose=function(){}}}var c5=new Z8,rZ=new w0;rZ.set(-1,0,0,0,1,0,0,0,1);function n5(J,$){function Q(F,q){if(F.matrixAutoUpdate===!0)F.updateMatrix();q.value.copy(F.matrix)}function W(F,q){if(q.color.getRGB(F.fogColor.value,s$(J)),q.isFog)F.fogNear.value=q.near,F.fogFar.value=q.far;else if(q.isFogExp2)F.fogDensity.value=q.density}function Z(F,q,C,A,V){if(q.isNodeMaterial)q.uniformsNeedUpdate=!1;else if(q.isMeshBasicMaterial)K(F,q);else if(q.isMeshLambertMaterial){if(K(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshToonMaterial)K(F,q),N(F,q);else if(q.isMeshPhongMaterial){if(K(F,q),E(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshStandardMaterial){if(K(F,q),G(F,q),q.isMeshPhysicalMaterial)D(F,q,V)}else if(q.isMeshMatcapMaterial)K(F,q),R(F,q);else if(q.isMeshDepthMaterial)K(F,q);else if(q.isMeshDistanceMaterial)K(F,q),z(F,q);else if(q.isMeshNormalMaterial)K(F,q);else if(q.isLineBasicMaterial){if(H(F,q),q.isLineDashedMaterial)Y(F,q)}else if(q.isPointsMaterial)X(F,q,C,A);else if(q.isSpriteMaterial)U(F,q);else if(q.isShadowMaterial)F.color.value.copy(q.color),F.opacity.value=q.opacity;else if(q.isShaderMaterial)q.uniformsNeedUpdate=!1}function K(F,q){if(F.opacity.value=q.opacity,q.color)F.diffuse.value.copy(q.color);if(q.emissive)F.emissive.value.copy(q.emissive).multiplyScalar(q.emissiveIntensity);if(q.map)F.map.value=q.map,Q(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,Q(q.alphaMap,F.alphaMapTransform);if(q.bumpMap){if(F.bumpMap.value=q.bumpMap,Q(q.bumpMap,F.bumpMapTransform),F.bumpScale.value=q.bumpScale,q.side===w8)F.bumpScale.value*=-1}if(q.normalMap){if(F.normalMap.value=q.normalMap,Q(q.normalMap,F.normalMapTransform),F.normalScale.value.copy(q.normalScale),q.side===w8)F.normalScale.value.negate()}if(q.displacementMap)F.displacementMap.value=q.displacementMap,Q(q.displacementMap,F.displacementMapTransform),F.displacementScale.value=q.displacementScale,F.displacementBias.value=q.displacementBias;if(q.emissiveMap)F.emissiveMap.value=q.emissiveMap,Q(q.emissiveMap,F.emissiveMapTransform);if(q.specularMap)F.specularMap.value=q.specularMap,Q(q.specularMap,F.specularMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest;let C=$.get(q),A=C.envMap,V=C.envMapRotation;if(A){if(F.envMap.value=A,F.envMapRotation.value.setFromMatrix4(c5.makeRotationFromEuler(V)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1)F.envMapRotation.value.premultiply(rZ);F.reflectivity.value=q.reflectivity,F.ior.value=q.ior,F.refractionRatio.value=q.refractionRatio}if(q.lightMap)F.lightMap.value=q.lightMap,F.lightMapIntensity.value=q.lightMapIntensity,Q(q.lightMap,F.lightMapTransform);if(q.aoMap)F.aoMap.value=q.aoMap,F.aoMapIntensity.value=q.aoMapIntensity,Q(q.aoMap,F.aoMapTransform)}function H(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,q.map)F.map.value=q.map,Q(q.map,F.mapTransform)}function Y(F,q){F.dashSize.value=q.dashSize,F.totalSize.value=q.dashSize+q.gapSize,F.scale.value=q.scale}function X(F,q,C,A){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.size.value=q.size*C,F.scale.value=A*0.5,q.map)F.map.value=q.map,Q(q.map,F.uvTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,Q(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function U(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.rotation.value=q.rotation,q.map)F.map.value=q.map,Q(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,Q(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function E(F,q){F.specular.value.copy(q.specular),F.shininess.value=Math.max(q.shininess,0.0001)}function N(F,q){if(q.gradientMap)F.gradientMap.value=q.gradientMap}function G(F,q){if(F.metalness.value=q.metalness,q.metalnessMap)F.metalnessMap.value=q.metalnessMap,Q(q.metalnessMap,F.metalnessMapTransform);if(F.roughness.value=q.roughness,q.roughnessMap)F.roughnessMap.value=q.roughnessMap,Q(q.roughnessMap,F.roughnessMapTransform);if(q.envMap)F.envMapIntensity.value=q.envMapIntensity}function D(F,q,C){if(F.ior.value=q.ior,q.sheen>0){if(F.sheenColor.value.copy(q.sheenColor).multiplyScalar(q.sheen),F.sheenRoughness.value=q.sheenRoughness,q.sheenColorMap)F.sheenColorMap.value=q.sheenColorMap,Q(q.sheenColorMap,F.sheenColorMapTransform);if(q.sheenRoughnessMap)F.sheenRoughnessMap.value=q.sheenRoughnessMap,Q(q.sheenRoughnessMap,F.sheenRoughnessMapTransform)}if(q.clearcoat>0){if(F.clearcoat.value=q.clearcoat,F.clearcoatRoughness.value=q.clearcoatRoughness,q.clearcoatMap)F.clearcoatMap.value=q.clearcoatMap,Q(q.clearcoatMap,F.clearcoatMapTransform);if(q.clearcoatRoughnessMap)F.clearcoatRoughnessMap.value=q.clearcoatRoughnessMap,Q(q.clearcoatRoughnessMap,F.clearcoatRoughnessMapTransform);if(q.clearcoatNormalMap){if(F.clearcoatNormalMap.value=q.clearcoatNormalMap,Q(q.clearcoatNormalMap,F.clearcoatNormalMapTransform),F.clearcoatNormalScale.value.copy(q.clearcoatNormalScale),q.side===w8)F.clearcoatNormalScale.value.negate()}}if(q.dispersion>0)F.dispersion.value=q.dispersion;if(q.iridescence>0){if(F.iridescence.value=q.iridescence,F.iridescenceIOR.value=q.iridescenceIOR,F.iridescenceThicknessMinimum.value=q.iridescenceThicknessRange[0],F.iridescenceThicknessMaximum.value=q.iridescenceThicknessRange[1],q.iridescenceMap)F.iridescenceMap.value=q.iridescenceMap,Q(q.iridescenceMap,F.iridescenceMapTransform);if(q.iridescenceThicknessMap)F.iridescenceThicknessMap.value=q.iridescenceThicknessMap,Q(q.iridescenceThicknessMap,F.iridescenceThicknessMapTransform)}if(q.transmission>0){if(F.transmission.value=q.transmission,F.transmissionSamplerMap.value=C.texture,F.transmissionSamplerSize.value.set(C.width,C.height),q.transmissionMap)F.transmissionMap.value=q.transmissionMap,Q(q.transmissionMap,F.transmissionMapTransform);if(F.thickness.value=q.thickness,q.thicknessMap)F.thicknessMap.value=q.thicknessMap,Q(q.thicknessMap,F.thicknessMapTransform);F.attenuationDistance.value=q.attenuationDistance,F.attenuationColor.value.copy(q.attenuationColor)}if(q.anisotropy>0){if(F.anisotropyVector.value.set(q.anisotropy*Math.cos(q.anisotropyRotation),q.anisotropy*Math.sin(q.anisotropyRotation)),q.anisotropyMap)F.anisotropyMap.value=q.anisotropyMap,Q(q.anisotropyMap,F.anisotropyMapTransform)}if(F.specularIntensity.value=q.specularIntensity,F.specularColor.value.copy(q.specularColor),q.specularColorMap)F.specularColorMap.value=q.specularColorMap,Q(q.specularColorMap,F.specularColorMapTransform);if(q.specularIntensityMap)F.specularIntensityMap.value=q.specularIntensityMap,Q(q.specularIntensityMap,F.specularIntensityMapTransform)}function R(F,q){if(q.matcap)F.matcap.value=q.matcap}function z(F,q){let C=$.get(q).light;F.referencePosition.value.setFromMatrixPosition(C.matrixWorld),F.nearDistance.value=C.shadow.camera.near,F.farDistance.value=C.shadow.camera.far}return{refreshFogUniforms:W,refreshMaterialUniforms:Z}}function s5(J,$,Q,W){let Z={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(V,I){let _=I.program;W.uniformBlockBinding(V,_)}function U(V,I){let _=Z[V.id];if(_===void 0)F(V),_=E(V),Z[V.id]=_,V.addEventListener("dispose",C);let w=I.program;W.updateUBOMapping(V,w);let M=$.render.frame;if(K[V.id]!==M)G(V),K[V.id]=M}function E(V){let I=N();V.__bindingPointIndex=I;let _=J.createBuffer(),w=V.__size,M=V.usage;return J.bindBuffer(J.UNIFORM_BUFFER,_),J.bufferData(J.UNIFORM_BUFFER,w,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,I,_),_}function N(){for(let V=0;V<Y;V++)if(H.indexOf(V)===-1)return H.push(V),V;return P0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(V){let I=Z[V.id],_=V.uniforms,w=V.__cache;J.bindBuffer(J.UNIFORM_BUFFER,I);for(let M=0,B=_.length;M<B;M++){let d=_[M];if(Array.isArray(d))for(let P=0,b=d.length;P<b;P++)D(d[P],M,P,w);else D(d,M,0,w)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(V,I,_,w){if(z(V,I,_,w)===!0){let{__offset:M,value:B}=V;if(Array.isArray(B)){let d=0;for(let P=0;P<B.length;P++){let b=B[P],o=q(b);if(R(b,V.__data,d),typeof b!=="number"&&typeof b!=="boolean"&&!b.isMatrix3&&!ArrayBuffer.isView(b))d+=o.storage/Float32Array.BYTES_PER_ELEMENT}}else R(B,V.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,M,V.__data)}}function R(V,I,_){if(typeof V==="number"||typeof V==="boolean")I[0]=V;else if(V.isMatrix3)I[0]=V.elements[0],I[1]=V.elements[1],I[2]=V.elements[2],I[3]=0,I[4]=V.elements[3],I[5]=V.elements[4],I[6]=V.elements[5],I[7]=0,I[8]=V.elements[6],I[9]=V.elements[7],I[10]=V.elements[8],I[11]=0;else if(ArrayBuffer.isView(V))I.set(new V.constructor(V.buffer,V.byteOffset,I.length));else V.toArray(I,_)}function z(V,I,_,w){let M=V.value,B=I+"_"+_;if(w[B]===void 0){if(typeof M==="number"||typeof M==="boolean")w[B]=M;else if(ArrayBuffer.isView(M))w[B]=M.slice();else w[B]=M.clone();return!0}else{let d=w[B];if(typeof M==="number"||typeof M==="boolean"){if(d!==M)return w[B]=M,!0}else if(ArrayBuffer.isView(M))return!0;else if(d.equals(M)===!1)return d.copy(M),!0}return!1}function F(V){let I=V.uniforms,_=0,w=16;for(let B=0,d=I.length;B<d;B++){let P=Array.isArray(I[B])?I[B]:[I[B]];for(let b=0,o=P.length;b<o;b++){let g=P[b],c=Array.isArray(g.value)?g.value:[g.value];for(let p=0,f=c.length;p<f;p++){let a=c[p],e=q(a),J0=_%w,k0=J0%e.boundary,D0=J0+k0;if(_+=k0,D0!==0&&w-D0<e.storage)_+=w-D0;g.__data=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),g.__offset=_,_+=e.storage}}}let M=_%w;if(M>0)_+=w-M;return V.__size=_,V.__cache={},this}function q(V){let I={boundary:0,storage:0};if(typeof V==="number"||typeof V==="boolean")I.boundary=4,I.storage=4;else if(V.isVector2)I.boundary=8,I.storage=8;else if(V.isVector3||V.isColor)I.boundary=16,I.storage=12;else if(V.isVector4)I.boundary=16,I.storage=16;else if(V.isMatrix3)I.boundary=48,I.storage=48;else if(V.isMatrix4)I.boundary=64,I.storage=64;else if(V.isTexture)_0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(V))I.boundary=16,I.storage=V.byteLength;else _0("WebGLRenderer: Unsupported uniform value type.",V);return I}function C(V){let I=V.target;I.removeEventListener("dispose",C);let _=H.indexOf(I.__bindingPointIndex);H.splice(_,1),J.deleteBuffer(Z[I.id]),delete Z[I.id],delete K[I.id]}function A(){for(let V in Z)J.deleteBuffer(Z[V]);H=[],Z={},K={}}return{bind:X,update:U,dispose:A}}var i5=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),W9=null;function o5(){if(W9===null)W9=new d6(i5,16,16,u9,F9),W9.name="DFG_LUT",W9.minFilter=_8,W9.magFilter=_8,W9.wrapS=w7,W9.wrapT=w7,W9.generateMipmaps=!1,W9.needsUpdate=!0;return W9}class zQ{constructor(J={}){let{canvas:$=XZ(),context:Q=null,depth:W=!0,stencil:Z=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:E=!1,reversedDepthBuffer:N=!1,outputBufferType:G=h8}=J;this.isWebGLRenderer=!0;let D;if(Q!==null){if(typeof WebGLRenderingContext<"u"&&Q instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=Q.getContextAttributes().alpha}else D=K;let R=G,z=new Set([Q$,$$,J$]),F=new Set([h8,w9,x6,V6,tJ,eJ]),q=new Uint32Array(4),C=new Int32Array(4),A=new y,V=null,I=null,_=[],w=[],M=null;this.domElement=$,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=a8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,d=!1,P=null,b=null,o=null,g=null;this._outputColorSpace=x7;let c=0,p=0,f=null,a=-1,e=null,J0=new K8,k0=new K8,D0=null,l0=new p0(0),u0=0,n=$.width,W0=$.height,K0=1,H0=null,L0=null,j0=new K8(0,0,n,W0),f0=new K8(0,0,n,W0),y0=!1,o0=new i7,b0=!1,x0=!1,O8=new Z8,p8=new y,Q8=new K8,k8={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},M8=!1;function q8(){return f===null?K0:1}let j=Q;function m8(k,v){return $.getContext(k,v)}try{let k={alpha:!0,depth:W,stencil:Z,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:E};if("setAttribute"in $)$.setAttribute("data-engine",`three.js r${qW}`);if($.addEventListener("webglcontextlost",T0,!1),$.addEventListener("webglcontextrestored",H8,!1),$.addEventListener("webglcontextcreationerror",J8,!1),j===null){if(j=m8("webgl2",k),j===null)if(m8("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(k){throw P0("WebGLRenderer: "+k.message),k}let s0,W8,L,O,T,l,t,$0,U0,u,i,F0,B0,G0,Q0,C0,A0,c0,S,Z0,s,Y0,O0;function r(){if(s0=new QU(j),s0.init(),s=new l5(j,s0),W8=new iX(j,s0,J,s),L=new p5(j,s0),W8.reversedDepthBuffer&&N)L.buffers.depth.setReversed(!0);b=j.createFramebuffer(),o=j.createFramebuffer(),g=j.createFramebuffer(),O=new KU(j),T=new _5,l=new m5(j,s0,L,T,W8,s,O),t=new $U(B),$0=new UH(j),Y0=new nX(j,$0),U0=new WU(j,$0,O,Y0),u=new YU(j,U0,$0,Y0,O),c0=new HU(j,W8,l),Q0=new oX(T),i=new C5(B,t,s0,W8,Y0,Q0),F0=new n5(B,T),B0=new P5,G0=new f5(s0),A0=new cX(B,t,L,u,D,Y),C0=new g5(B,u,W8),O0=new s5(j,O,W8,L),S=new sX(j,s0,O),Z0=new ZU(j,s0,O),O.programs=i.programs,B.capabilities=W8,B.extensions=s0,B.properties=T,B.renderLists=B0,B.shadowMap=C0,B.state=L,B.info=O}if(r(),R!==h8)M=new UU(R,$.width,$.height,H,W,Z);let X0=new aZ(B,j);this.xr=X0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let k=s0.get("WEBGL_lose_context");if(k)k.loseContext()},this.forceContextRestore=function(){let k=s0.get("WEBGL_lose_context");if(k)k.restoreContext()},this.getPixelRatio=function(){return K0},this.setPixelRatio=function(k){if(k===void 0)return;K0=k,this.setSize(n,W0,!1)},this.getSize=function(k){return k.set(n,W0)},this.setSize=function(k,v,m=!0){if(X0.isPresenting){_0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(n=k,W0=v,$.width=Math.floor(k*K0),$.height=Math.floor(v*K0),m===!0)$.style.width=k+"px",$.style.height=v+"px";if(M!==null)M.setSize($.width,$.height);this.setViewport(0,0,k,v)},this.getDrawingBufferSize=function(k){return k.set(n*K0,W0*K0).floor()},this.setDrawingBufferSize=function(k,v,m){n=k,W0=v,K0=m,$.width=Math.floor(k*m),$.height=Math.floor(v*m),this.setViewport(0,0,k,v)},this.setEffects=function(k){if(R===h8){P0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(k){for(let v=0;v<k.length;v++)if(k[v].isOutputPass===!0){_0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(k||[])},this.getCurrentViewport=function(k){return k.copy(J0)},this.getViewport=function(k){return k.copy(j0)},this.setViewport=function(k,v,m,h){if(k.isVector4)j0.set(k.x,k.y,k.z,k.w);else j0.set(k,v,m,h);L.viewport(J0.copy(j0).multiplyScalar(K0).round())},this.getScissor=function(k){return k.copy(f0)},this.setScissor=function(k,v,m,h){if(k.isVector4)f0.set(k.x,k.y,k.z,k.w);else f0.set(k,v,m,h);L.scissor(k0.copy(f0).multiplyScalar(K0).round())},this.getScissorTest=function(){return y0},this.setScissorTest=function(k){L.setScissorTest(y0=k)},this.setOpaqueSort=function(k){H0=k},this.setTransparentSort=function(k){L0=k},this.getClearColor=function(k){return k.copy(A0.getClearColor())},this.setClearColor=function(){A0.setClearColor(...arguments)},this.getClearAlpha=function(){return A0.getClearAlpha()},this.setClearAlpha=function(){A0.setClearAlpha(...arguments)},this.clear=function(k=!0,v=!0,m=!0){let h=0;if(k){let x=!1;if(f!==null){let q0=f.texture.format;x=z.has(q0)}if(x){let q0=f.texture.type,R0=F.has(q0),E0=A0.getClearColor(),V0=A0.getClearAlpha(),z0=E0.r,S0=E0.g,h0=E0.b;if(R0)q[0]=z0,q[1]=S0,q[2]=h0,q[3]=V0,j.clearBufferuiv(j.COLOR,0,q);else C[0]=z0,C[1]=S0,C[2]=h0,C[3]=V0,j.clearBufferiv(j.COLOR,0,C)}else h|=j.COLOR_BUFFER_BIT}if(v)h|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(m)h|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(h!==0)j.clear(h)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(k){k.setRenderer(this),P=k},this.dispose=function(){$.removeEventListener("webglcontextlost",T0,!1),$.removeEventListener("webglcontextrestored",H8,!1),$.removeEventListener("webglcontextcreationerror",J8,!1),A0.dispose(),B0.dispose(),G0.dispose(),T.dispose(),t.dispose(),u.dispose(),Y0.dispose(),O0.dispose(),i.dispose(),X0.dispose(),X0.removeEventListener("sessionstart",fQ),X0.removeEventListener("sessionend",yQ),f9.stop()};function T0(k){k.preventDefault(),g$("WebGLRenderer: Context Lost."),d=!0}function H8(){g$("WebGLRenderer: Context Restored."),d=!1;let k=O.autoReset,v=C0.enabled,m=C0.autoUpdate,h=C0.needsUpdate,x=C0.type;r(),O.autoReset=k,C0.enabled=v,C0.autoUpdate=m,C0.needsUpdate=h,C0.type=x}function J8(k){P0("WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function r8(k){let v=k.target;v.removeEventListener("dispose",r8),K9(v)}function K9(k){zK(k),T.remove(k)}function zK(k){let v=T.get(k).programs;if(v!==void 0){if(v.forEach(function(m){i.releaseProgram(m)}),k.isShaderMaterial)i.releaseShaderCache(k)}}this.renderBufferDirect=function(k,v,m,h,x,q0){if(v===null)v=k8;let R0=x.isMesh&&x.matrixWorld.determinantAffine()<0,E0=_K(k,v,m,h,x);L.setMaterial(h,R0);let V0=m.index,z0=1;if(h.wireframe===!0){if(V0=U0.getWireframeAttribute(m),V0===void 0)return;z0=2}let S0=m.drawRange,h0=m.attributes.position,I0=S0.start*z0,a0=(S0.start+S0.count)*z0;if(q0!==null)I0=Math.max(I0,q0.start*z0),a0=Math.min(a0,(q0.start+q0.count)*z0);if(V0!==null)I0=Math.max(I0,0),a0=Math.min(a0,V0.count);else if(h0!==void 0&&h0!==null)I0=Math.max(I0,0),a0=Math.min(a0,h0.count);let U8=a0-I0;if(U8<0||U8===1/0)return;Y0.setup(x,h,E0,m,V0);let Y8,r0=S;if(V0!==null)Y8=$0.get(V0),r0=Z0,r0.setIndex(Y8);if(x.isMesh)if(h.wireframe===!0)L.setLineWidth(h.wireframeLinewidth*q8()),r0.setMode(j.LINES);else r0.setMode(j.TRIANGLES);else if(x.isLine){let V8=h.linewidth;if(V8===void 0)V8=1;if(L.setLineWidth(V8*q8()),x.isLineSegments)r0.setMode(j.LINES);else if(x.isLineLoop)r0.setMode(j.LINE_LOOP);else r0.setMode(j.LINE_STRIP)}else if(x.isPoints)r0.setMode(j.POINTS);else if(x.isSprite)r0.setMode(j.TRIANGLES);if(x.isBatchedMesh)if(!s0.get("WEBGL_multi_draw")){let{_multiDrawStarts:V8,_multiDrawCounts:M0,_multiDrawCount:S8}=x,d0=V0?$0.get(V0).bytesPerElement:1,l8=T.get(h).currentProgram.getUniforms();for(let t8=0;t8<S8;t8++)l8.setValue(j,"_gl_DrawID",t8),r0.render(V8[t8]/d0,M0[t8])}else r0.renderMultiDraw(x._multiDrawStarts,x._multiDrawCounts,x._multiDrawCount);else if(x.isInstancedMesh)r0.renderInstances(I0,U8,x.count);else if(m.isInstancedBufferGeometry){let V8=m._maxInstanceCount!==void 0?m._maxInstanceCount:1/0,M0=Math.min(m.instanceCount,V8);r0.renderInstances(I0,U8,M0)}else r0.render(I0,U8)};function vQ(k,v,m){if(k.transparent===!0&&k.side===J9&&k.forceSinglePass===!1)k.side=w8,k.needsUpdate=!0,t6(k,v,m),k.side=R6,k.needsUpdate=!0,t6(k,v,m),k.side=J9;else t6(k,v,m)}this.compile=function(k,v,m=null){if(m===null)m=k;if(I=G0.get(m),I.init(v),w.push(I),m.traverseVisible(function(x){if(x.isLight&&x.layers.test(v.layers)){if(I.pushLight(x),x.castShadow)I.pushShadow(x)}}),k!==m)k.traverseVisible(function(x){if(x.isLight&&x.layers.test(v.layers)){if(I.pushLight(x),x.castShadow)I.pushShadow(x)}});I.setupLights();let h=new Set;return k.traverse(function(x){if(!(x.isMesh||x.isPoints||x.isLine||x.isSprite))return;let q0=x.material;if(q0)if(Array.isArray(q0))for(let R0=0;R0<q0.length;R0++){let E0=q0[R0];vQ(E0,m,x),h.add(E0)}else vQ(q0,m,x),h.add(q0)}),I=w.pop(),h},this.compileAsync=function(k,v,m=null){let h=this.compile(k,v,m);return new Promise((x)=>{function q0(){if(h.forEach(function(R0){if(T.get(R0).currentProgram.isReady())h.delete(R0)}),h.size===0){x(k);return}setTimeout(q0,10)}if(s0.get("KHR_parallel_shader_compile")!==null)q0();else setTimeout(q0,10)})};let EJ=null;function IK(k){if(EJ)EJ(k)}function fQ(){f9.stop()}function yQ(){f9.start()}let f9=new xZ;if(f9.setAnimationLoop(IK),typeof self<"u")f9.setContext(self);this.setAnimationLoop=function(k){EJ=k,X0.setAnimationLoop(k),k===null?f9.stop():f9.start()},X0.addEventListener("sessionstart",fQ),X0.addEventListener("sessionend",yQ),this.render=function(k,v){if(v!==void 0&&v.isCamera!==!0){P0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;if(P!==null)P.renderStart(k,v);let m=X0.enabled===!0&&X0.isPresenting===!0,h=M!==null&&(f===null||m)&&M.begin(B,f);if(k.matrixWorldAutoUpdate===!0)k.updateMatrixWorld();if(v.parent===null&&v.matrixWorldAutoUpdate===!0)v.updateMatrixWorld();if(X0.enabled===!0&&X0.isPresenting===!0&&(M===null||M.isCompositing()===!1)){if(X0.cameraAutoUpdate===!0)X0.updateCamera(v);v=X0.getCamera()}if(k.isScene===!0)k.onBeforeRender(B,k,v,f);if(I=G0.get(k,w.length),I.init(v),I.state.textureUnits=l.getTextureUnits(),w.push(I),O8.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),o0.setFromProjectionMatrix(O8,x$,v.reversedDepth),x0=this.localClippingEnabled,b0=Q0.init(this.clippingPlanes,x0),V=B0.get(k,_.length),V.init(),_.push(V),X0.enabled===!0&&X0.isPresenting===!0){let R0=B.xr.getDepthSensingMesh();if(R0!==null)qJ(R0,v,-1/0,B.sortObjects)}if(qJ(k,v,0,B.sortObjects),V.finish(),B.sortObjects===!0)V.sort(H0,L0,v.reversedDepth);if(M8=X0.enabled===!1||X0.isPresenting===!1||X0.hasDepthSensing()===!1,M8)A0.addToRenderList(V,k);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(b0===!0)Q0.beginShadows();let x=I.state.shadowsArray;if(C0.render(x,k,v),b0===!0)Q0.endShadows();if((h&&M.hasRenderPass())===!1){let{opaque:R0,transmissive:E0}=V;if(I.setupLights(),v.isArrayCamera){let V0=v.cameras;if(E0.length>0)for(let z0=0,S0=V0.length;z0<S0;z0++){let h0=V0[z0];bQ(R0,E0,k,h0)}if(M8)A0.render(k);for(let z0=0,S0=V0.length;z0<S0;z0++){let h0=V0[z0];hQ(V,k,h0,h0.viewport)}}else{if(E0.length>0)bQ(R0,E0,k,v);if(M8)A0.render(k);hQ(V,k,v)}}if(f!==null&&p===0)l.updateMultisampleRenderTarget(f),l.updateRenderTargetMipmap(f);if(h)M.end(B);if(k.isScene===!0)k.onAfterRender(B,k,v);if(Y0.resetDefaultState(),a=-1,e=null,w.pop(),w.length>0){if(I=w[w.length-1],l.setTextureUnits(I.state.textureUnits),b0===!0)Q0.setGlobalState(B.clippingPlanes,I.state.camera)}else I=null;if(_.pop(),_.length>0)V=_[_.length-1];else V=null;if(P!==null)P.renderEnd()};function qJ(k,v,m,h){if(k.visible===!1)return;if(k.layers.test(v.layers)){if(k.isGroup)m=k.renderOrder;else if(k.isLOD){if(k.autoUpdate===!0)k.update(v)}else if(k.isLightProbeGrid)I.pushLightProbeGrid(k);else if(k.isLight){if(I.pushLight(k),k.castShadow)I.pushShadow(k)}else if(k.isSprite){if(!k.frustumCulled||o0.intersectsSprite(k)){if(h)Q8.setFromMatrixPosition(k.matrixWorld).applyMatrix4(O8);let R0=u.update(k),E0=k.material;if(E0.visible)V.push(k,R0,E0,m,Q8.z,null)}}else if(k.isMesh||k.isLine||k.isPoints){if(!k.frustumCulled||o0.intersectsObject(k)){let R0=u.update(k),E0=k.material;if(h){if(k.boundingSphere!==void 0){if(k.boundingSphere===null)k.computeBoundingSphere();Q8.copy(k.boundingSphere.center)}else{if(R0.boundingSphere===null)R0.computeBoundingSphere();Q8.copy(R0.boundingSphere.center)}Q8.applyMatrix4(k.matrixWorld).applyMatrix4(O8)}if(Array.isArray(E0)){let V0=R0.groups;for(let z0=0,S0=V0.length;z0<S0;z0++){let h0=V0[z0],I0=E0[h0.materialIndex];if(I0&&I0.visible)V.push(k,R0,I0,m,Q8.z,h0)}}else if(E0.visible)V.push(k,R0,E0,m,Q8.z,null)}}}let q0=k.children;for(let R0=0,E0=q0.length;R0<E0;R0++)qJ(q0[R0],v,m,h)}function hQ(k,v,m,h){let{opaque:x,transmissive:q0,transparent:R0}=k;if(I.setupLightsView(m),b0===!0)Q0.setGlobalState(B.clippingPlanes,m);if(h)L.viewport(J0.copy(h));if(x.length>0)r6(x,v,m);if(q0.length>0)r6(q0,v,m);if(R0.length>0)r6(R0,v,m);L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function bQ(k,v,m,h){if((m.isScene===!0?m.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[h.id]===void 0){let I0=s0.has("EXT_color_buffer_half_float")||s0.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[h.id]=new c8(1,1,{generateMipmaps:!0,type:I0?F9:h8,minFilter:m9,samples:Math.max(4,W8.samples),stencilBuffer:Z,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:g0.workingColorSpace})}let q0=I.state.transmissionRenderTarget[h.id],R0=h.viewport||J0;q0.setSize(R0.z*B.transmissionResolutionScale,R0.w*B.transmissionResolutionScale);let E0=B.getRenderTarget(),V0=B.getActiveCubeFace(),z0=B.getActiveMipmapLevel();if(B.setRenderTarget(q0),B.getClearColor(l0),u0=B.getClearAlpha(),u0<1)B.setClearColor(16777215,0.5);if(B.clear(),M8)A0.render(m);let S0=B.toneMapping;B.toneMapping=a8;let h0=h.viewport;if(h.viewport!==void 0)h.viewport=void 0;if(I.setupLightsView(h),b0===!0)Q0.setGlobalState(B.clippingPlanes,h);if(r6(k,m,h),l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0),s0.has("WEBGL_multisampled_render_to_texture")===!1){let I0=!1;for(let a0=0,U8=v.length;a0<U8;a0++){let Y8=v[a0],{object:r0,geometry:V8,material:M0,group:S8}=Y8;if(M0.side===J9&&r0.layers.test(h.layers)){let d0=M0.side;M0.side=w8,M0.needsUpdate=!0,xQ(r0,m,h,V8,M0,S8),M0.side=d0,M0.needsUpdate=!0,I0=!0}}if(I0===!0)l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0)}if(B.setRenderTarget(E0,V0,z0),B.setClearColor(l0,u0),h0!==void 0)h.viewport=h0;B.toneMapping=S0}function r6(k,v,m){let h=v.isScene===!0?v.overrideMaterial:null;for(let x=0,q0=k.length;x<q0;x++){let R0=k[x],{object:E0,geometry:V0,group:z0}=R0,S0=R0.material;if(S0.allowOverride===!0&&h!==null)S0=h;if(E0.layers.test(m.layers))xQ(E0,v,m,V0,S0,z0)}}function xQ(k,v,m,h,x,q0){if(k.onBeforeRender(B,v,m,h,x,q0),k.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),x.onBeforeRender(B,v,m,h,k,q0),x.transparent===!0&&x.side===J9&&x.forceSinglePass===!1)x.side=w8,x.needsUpdate=!0,B.renderBufferDirect(m,v,h,x,k,q0),x.side=R6,x.needsUpdate=!0,B.renderBufferDirect(m,v,h,x,k,q0),x.side=J9;else B.renderBufferDirect(m,v,h,x,k,q0);k.onAfterRender(B,v,m,h,x,q0)}function t6(k,v,m){if(v.isScene!==!0)v=k8;let h=T.get(k),x=I.state.lights,q0=I.state.shadowsArray,R0=x.state.version,E0=i.getParameters(k,x.state,q0,v,m,I.state.lightProbeGridArray),V0=i.getProgramCacheKey(E0),z0=h.programs;h.environment=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?v.environment:null,h.fog=v.fog;let S0=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap;if(h.envMap=t.get(k.envMap||h.environment,S0),h.envMapRotation=h.environment!==null&&k.envMap===null?v.environmentRotation:k.envMapRotation,z0===void 0)k.addEventListener("dispose",r8),z0=new Map,h.programs=z0;let h0=z0.get(V0);if(h0!==void 0){if(h.currentProgram===h0&&h.lightsStateVersion===R0)return pQ(k,E0),h0}else{if(E0.uniforms=i.getUniforms(k),P!==null&&k.isNodeMaterial)P.build(k,m,E0);k.onBeforeCompile(E0,B),h0=i.acquireProgram(E0,V0),z0.set(V0,h0),h.uniforms=E0.uniforms}let I0=h.uniforms;if(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)I0.clippingPlanes=Q0.uniform;if(pQ(k,E0),h.needsLights=PK(k),h.lightsStateVersion=R0,h.needsLights)I0.ambientLightColor.value=x.state.ambient,I0.lightProbe.value=x.state.probe,I0.directionalLights.value=x.state.directional,I0.directionalLightShadows.value=x.state.directionalShadow,I0.spotLights.value=x.state.spot,I0.spotLightShadows.value=x.state.spotShadow,I0.rectAreaLights.value=x.state.rectArea,I0.ltc_1.value=x.state.rectAreaLTC1,I0.ltc_2.value=x.state.rectAreaLTC2,I0.pointLights.value=x.state.point,I0.pointLightShadows.value=x.state.pointShadow,I0.hemisphereLights.value=x.state.hemi,I0.directionalShadowMatrix.value=x.state.directionalShadowMatrix,I0.spotLightMatrix.value=x.state.spotLightMatrix,I0.spotLightMap.value=x.state.spotLightMap,I0.pointShadowMatrix.value=x.state.pointShadowMatrix;return h.lightProbeGrid=I.state.lightProbeGridArray.length>0,h.currentProgram=h0,h.uniformsList=null,h0}function gQ(k){if(k.uniformsList===null){let v=k.currentProgram.getUniforms();k.uniformsList=i6.seqWithValue(v.seq,k.uniforms)}return k.uniformsList}function pQ(k,v){let m=T.get(k);m.outputColorSpace=v.outputColorSpace,m.batching=v.batching,m.batchingColor=v.batchingColor,m.instancing=v.instancing,m.instancingColor=v.instancingColor,m.instancingMorph=v.instancingMorph,m.skinning=v.skinning,m.morphTargets=v.morphTargets,m.morphNormals=v.morphNormals,m.morphColors=v.morphColors,m.morphTargetsCount=v.morphTargetsCount,m.numClippingPlanes=v.numClippingPlanes,m.numIntersection=v.numClipIntersection,m.vertexAlphas=v.vertexAlphas,m.vertexTangents=v.vertexTangents,m.toneMapping=v.toneMapping}function CK(k,v){if(k.length===0)return null;if(k.length===1)return k[0].texture!==null?k[0]:null;A.setFromMatrixPosition(v.matrixWorld);for(let m=0,h=k.length;m<h;m++){let x=k[m];if(x.texture!==null&&x.boundingBox.containsPoint(A))return x}return null}function _K(k,v,m,h,x){if(v.isScene!==!0)v=k8;l.resetTextureUnits();let q0=v.fog,R0=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?v.environment:null,E0=f===null?B.outputColorSpace:f.isXRRenderTarget===!0?f.texture.colorSpace:g0.workingColorSpace,V0=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,z0=t.get(h.envMap||R0,V0),S0=h.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,h0=!!m.attributes.tangent&&(!!h.normalMap||h.anisotropy>0),I0=!!m.morphAttributes.position,a0=!!m.morphAttributes.normal,U8=!!m.morphAttributes.color,Y8=a8;if(h.toneMapped){if(f===null||f.isXRRenderTarget===!0)Y8=B.toneMapping}let r0=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,V8=r0!==void 0?r0.length:0,M0=T.get(h),S8=I.state.lights;if(b0===!0){if(x0===!0||k!==e){let $8=k===e&&h.id===a;Q0.setState(h,k,$8)}}let d0=!1;if(h.version===M0.__version){if(M0.needsLights&&M0.lightsStateVersion!==S8.state.version)d0=!0;else if(M0.outputColorSpace!==E0)d0=!0;else if(x.isBatchedMesh&&M0.batching===!1)d0=!0;else if(!x.isBatchedMesh&&M0.batching===!0)d0=!0;else if(x.isBatchedMesh&&M0.batchingColor===!0&&x.colorTexture===null)d0=!0;else if(x.isBatchedMesh&&M0.batchingColor===!1&&x.colorTexture!==null)d0=!0;else if(x.isInstancedMesh&&M0.instancing===!1)d0=!0;else if(!x.isInstancedMesh&&M0.instancing===!0)d0=!0;else if(x.isSkinnedMesh&&M0.skinning===!1)d0=!0;else if(!x.isSkinnedMesh&&M0.skinning===!0)d0=!0;else if(x.isInstancedMesh&&M0.instancingColor===!0&&x.instanceColor===null)d0=!0;else if(x.isInstancedMesh&&M0.instancingColor===!1&&x.instanceColor!==null)d0=!0;else if(x.isInstancedMesh&&M0.instancingMorph===!0&&x.morphTexture===null)d0=!0;else if(x.isInstancedMesh&&M0.instancingMorph===!1&&x.morphTexture!==null)d0=!0;else if(M0.envMap!==z0)d0=!0;else if(h.fog===!0&&M0.fog!==q0)d0=!0;else if(M0.numClippingPlanes!==void 0&&(M0.numClippingPlanes!==Q0.numPlanes||M0.numIntersection!==Q0.numIntersection))d0=!0;else if(M0.vertexAlphas!==S0)d0=!0;else if(M0.vertexTangents!==h0)d0=!0;else if(M0.morphTargets!==I0)d0=!0;else if(M0.morphNormals!==a0)d0=!0;else if(M0.morphColors!==U8)d0=!0;else if(M0.toneMapping!==Y8)d0=!0;else if(M0.morphTargetsCount!==V8)d0=!0;else if(!!M0.lightProbeGrid!==I.state.lightProbeGridArray.length>0)d0=!0}else d0=!0,M0.__version=h.version;let l8=M0.currentProgram;if(d0===!0){if(l8=t6(h,v,x),P&&h.isNodeMaterial)P.onUpdateProgram(h,l8,M0)}let t8=!1,R9=!1,J6=!1,t0=l8.getUniforms(),G8=M0.uniforms;if(L.useProgram(l8.program))t8=!0,R9=!0,J6=!0;if(h.id!==a)a=h.id,R9=!0;if(M0.needsLights){let $8=CK(I.state.lightProbeGridArray,x);if(M0.lightProbeGrid!==$8)M0.lightProbeGrid=$8,R9=!0}if(t8||e!==k){if(L.buffers.depth.getReversed()&&k.reversedDepth!==!0)k._reversedDepth=!0,k.updateProjectionMatrix();t0.setValue(j,"projectionMatrix",k.projectionMatrix),t0.setValue(j,"viewMatrix",k.matrixWorldInverse);let L9=t0.map.cameraPosition;if(L9!==void 0)L9.setValue(j,p8.setFromMatrixPosition(k.matrixWorld));if(W8.logarithmicDepthBuffer)t0.setValue(j,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2));if(h.isMeshPhongMaterial||h.isMeshToonMaterial||h.isMeshLambertMaterial||h.isMeshBasicMaterial||h.isMeshStandardMaterial||h.isShaderMaterial)t0.setValue(j,"isOrthographic",k.isOrthographicCamera===!0);if(e!==k)e=k,R9=!0,J6=!0}if(M0.needsLights){if(S8.state.directionalShadowMap.length>0)t0.setValue(j,"directionalShadowMap",S8.state.directionalShadowMap,l);if(S8.state.spotShadowMap.length>0)t0.setValue(j,"spotShadowMap",S8.state.spotShadowMap,l);if(S8.state.pointShadowMap.length>0)t0.setValue(j,"pointShadowMap",S8.state.pointShadowMap,l)}if(x.isSkinnedMesh){t0.setOptional(j,x,"bindMatrix"),t0.setOptional(j,x,"bindMatrixInverse");let $8=x.skeleton;if($8){if($8.boneTexture===null)$8.computeBoneTexture();t0.setValue(j,"boneTexture",$8.boneTexture,l)}}if(x.isBatchedMesh){if(t0.setOptional(j,x,"batchingTexture"),t0.setValue(j,"batchingTexture",x._matricesTexture,l),t0.setOptional(j,x,"batchingIdTexture"),t0.setValue(j,"batchingIdTexture",x._indirectTexture,l),t0.setOptional(j,x,"batchingColorTexture"),x._colorsTexture!==null)t0.setValue(j,"batchingColorTexture",x._colorsTexture,l)}let k9=m.morphAttributes;if(k9.position!==void 0||k9.normal!==void 0||k9.color!==void 0)c0.update(x,m,l8);if(R9||M0.receiveShadow!==x.receiveShadow)M0.receiveShadow=x.receiveShadow,t0.setValue(j,"receiveShadow",x.receiveShadow);if((h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial)&&h.envMap===null&&v.environment!==null)G8.envMapIntensity.value=v.environmentIntensity;if(G8.dfgLUT!==void 0)G8.dfgLUT.value=o5();if(R9){if(t0.setValue(j,"toneMappingExposure",B.toneMappingExposure),M0.needsLights)AK(G8,J6);if(q0&&h.fog===!0)F0.refreshFogUniforms(G8,q0);if(F0.refreshMaterialUniforms(G8,h,K0,W0,I.state.transmissionRenderTarget[k.id]),M0.needsLights&&M0.lightProbeGrid){let $8=M0.lightProbeGrid;G8.probesSH.value=$8.texture,G8.probesMin.value.copy($8.boundingBox.min),G8.probesMax.value.copy($8.boundingBox.max),G8.probesResolution.value.copy($8.resolution)}i6.upload(j,gQ(M0),G8,l)}if(h.isShaderMaterial&&h.uniformsNeedUpdate===!0)i6.upload(j,gQ(M0),G8,l),h.uniformsNeedUpdate=!1;if(h.isSpriteMaterial)t0.setValue(j,"center",x.center);if(t0.setValue(j,"modelViewMatrix",x.modelViewMatrix),t0.setValue(j,"normalMatrix",x.normalMatrix),t0.setValue(j,"modelMatrix",x.matrixWorld),h.uniformsGroups!==void 0){let $8=h.uniformsGroups;for(let L9=0,$6=$8.length;L9<$6;L9++){let mQ=$8[L9];O0.update(mQ,l8),O0.bind(mQ,l8)}}return l8}function AK(k,v){k.ambientLightColor.needsUpdate=v,k.lightProbe.needsUpdate=v,k.directionalLights.needsUpdate=v,k.directionalLightShadows.needsUpdate=v,k.pointLights.needsUpdate=v,k.pointLightShadows.needsUpdate=v,k.spotLights.needsUpdate=v,k.spotLightShadows.needsUpdate=v,k.rectAreaLights.needsUpdate=v,k.hemisphereLights.needsUpdate=v}function PK(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}if(this.getActiveCubeFace=function(){return c},this.getActiveMipmapLevel=function(){return p},this.getRenderTarget=function(){return f},this.setRenderTargetTextures=function(k,v,m){let h=T.get(k);if(h.__autoAllocateDepthBuffer=k.resolveDepthBuffer===!1,h.__autoAllocateDepthBuffer===!1)h.__useRenderToTexture=!1;T.get(k.texture).__webglTexture=v,T.get(k.depthTexture).__webglTexture=h.__autoAllocateDepthBuffer?void 0:m,h.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(k,v){let m=T.get(k);m.__webglFramebuffer=v,m.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(k,v=0,m=0){f=k,c=v,p=m;let h=null,x=!1,q0=!1;if(k){let E0=T.get(k);if(E0.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(j.FRAMEBUFFER,E0.__webglFramebuffer),J0.copy(k.viewport),k0.copy(k.scissor),D0=k.scissorTest,L.viewport(J0),L.scissor(k0),L.setScissorTest(D0),a=-1;return}else if(E0.__webglFramebuffer===void 0)l.setupRenderTarget(k);else if(E0.__hasExternalTextures)l.rebindTextures(k,T.get(k.texture).__webglTexture,T.get(k.depthTexture).__webglTexture);else if(k.depthBuffer){let S0=k.depthTexture;if(E0.__boundDepthTexture!==S0){if(S0!==null&&T.has(S0)&&(k.width!==S0.image.width||k.height!==S0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");l.setupDepthRenderbuffer(k)}}let V0=k.texture;if(V0.isData3DTexture||V0.isDataArrayTexture||V0.isCompressedArrayTexture)q0=!0;let z0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget){if(Array.isArray(z0[v]))h=z0[v][m];else h=z0[v];x=!0}else if(k.samples>0&&l.useMultisampledRTT(k)===!1)h=T.get(k).__webglMultisampledFramebuffer;else if(Array.isArray(z0))h=z0[m];else h=z0;J0.copy(k.viewport),k0.copy(k.scissor),D0=k.scissorTest}else J0.copy(j0).multiplyScalar(K0).floor(),k0.copy(f0).multiplyScalar(K0).floor(),D0=y0;if(m!==0)h=b;if(L.bindFramebuffer(j.FRAMEBUFFER,h))L.drawBuffers(k,h);if(L.viewport(J0),L.scissor(k0),L.setScissorTest(D0),x){let E0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+v,E0.__webglTexture,m)}else if(q0){let E0=v;for(let V0=0;V0<k.textures.length;V0++){let z0=T.get(k.textures[V0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+V0,z0.__webglTexture,m,E0)}}else if(k!==null&&m!==0){let E0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,E0.__webglTexture,m)}a=-1},this.readRenderTargetPixels=function(k,v,m,h,x,q0,R0,E0=0){if(!(k&&k.isWebGLRenderTarget)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)V0=V0[R0];if(V0){L.bindFramebuffer(j.FRAMEBUFFER,V0);try{let z0=k.textures[E0],S0=z0.format,h0=z0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!W8.textureFormatReadable(S0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!W8.textureTypeReadable(h0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(v>=0&&v<=k.width-h&&(m>=0&&m<=k.height-x))j.readPixels(v,m,h,x,s.convert(S0),s.convert(h0),q0)}finally{let z0=f!==null?T.get(f).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,z0)}}},this.readRenderTargetPixelsAsync=async function(k,v,m,h,x,q0,R0,E0=0){if(!(k&&k.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)V0=V0[R0];if(V0)if(v>=0&&v<=k.width-h&&(m>=0&&m<=k.height-x)){L.bindFramebuffer(j.FRAMEBUFFER,V0);let z0=k.textures[E0],S0=z0.format,h0=z0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!W8.textureFormatReadable(S0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!W8.textureTypeReadable(h0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let I0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,I0),j.bufferData(j.PIXEL_PACK_BUFFER,q0.byteLength,j.STREAM_READ),j.readPixels(v,m,h,x,s.convert(S0),s.convert(h0),0);let a0=f!==null?T.get(f).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,a0);let U8=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await GZ(j,U8,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,I0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,q0),j.deleteBuffer(I0),j.deleteSync(U8),q0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(k,v=null,m=0){let h=Math.pow(2,-m),x=Math.floor(k.image.width*h),q0=Math.floor(k.image.height*h),R0=v!==null?v.x:0,E0=v!==null?v.y:0;l.setTexture2D(k,0),j.copyTexSubImage2D(j.TEXTURE_2D,m,0,0,R0,E0,x,q0),L.unbindTexture()},this.copyTextureToTexture=function(k,v,m=null,h=null,x=0,q0=0){let R0,E0,V0,z0,S0,h0,I0,a0,U8,Y8=k.isCompressedTexture?k.mipmaps[q0]:k.image;if(m!==null)R0=m.max.x-m.min.x,E0=m.max.y-m.min.y,V0=m.isBox3?m.max.z-m.min.z:1,z0=m.min.x,S0=m.min.y,h0=m.isBox3?m.min.z:0;else{let G8=Math.pow(2,-x);if(R0=Math.floor(Y8.width*G8),E0=Math.floor(Y8.height*G8),k.isDataArrayTexture)V0=Y8.depth;else if(k.isData3DTexture)V0=Math.floor(Y8.depth*G8);else V0=1;z0=0,S0=0,h0=0}if(h!==null)I0=h.x,a0=h.y,U8=h.z;else I0=0,a0=0,U8=0;let r0=s.convert(v.format),V8=s.convert(v.type),M0;if(v.isData3DTexture)l.setTexture3D(v,0),M0=j.TEXTURE_3D;else if(v.isDataArrayTexture||v.isCompressedArrayTexture)l.setTexture2DArray(v,0),M0=j.TEXTURE_2D_ARRAY;else l.setTexture2D(v,0),M0=j.TEXTURE_2D;L.activeTexture(j.TEXTURE0),L.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,v.flipY),L.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),L.pixelStorei(j.UNPACK_ALIGNMENT,v.unpackAlignment);let S8=L.getParameter(j.UNPACK_ROW_LENGTH),d0=L.getParameter(j.UNPACK_IMAGE_HEIGHT),l8=L.getParameter(j.UNPACK_SKIP_PIXELS),t8=L.getParameter(j.UNPACK_SKIP_ROWS),R9=L.getParameter(j.UNPACK_SKIP_IMAGES);L.pixelStorei(j.UNPACK_ROW_LENGTH,Y8.width),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Y8.height),L.pixelStorei(j.UNPACK_SKIP_PIXELS,z0),L.pixelStorei(j.UNPACK_SKIP_ROWS,S0),L.pixelStorei(j.UNPACK_SKIP_IMAGES,h0);let J6=k.isDataArrayTexture||k.isData3DTexture,t0=v.isDataArrayTexture||v.isData3DTexture;if(k.isDepthTexture){let G8=T.get(k),k9=T.get(v),$8=T.get(G8.__renderTarget),L9=T.get(k9.__renderTarget);L.bindFramebuffer(j.READ_FRAMEBUFFER,$8.__webglFramebuffer),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,L9.__webglFramebuffer);for(let $6=0;$6<V0;$6++){if(J6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(k).__webglTexture,x,h0+$6),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(v).__webglTexture,q0,U8+$6);j.blitFramebuffer(z0,S0,R0,E0,I0,a0,R0,E0,j.DEPTH_BUFFER_BIT,j.NEAREST)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(x!==0||k.isRenderTargetTexture||T.has(k)){let G8=T.get(k),k9=T.get(v);L.bindFramebuffer(j.READ_FRAMEBUFFER,o),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,g);for(let $8=0;$8<V0;$8++){if(J6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,G8.__webglTexture,x,h0+$8);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,G8.__webglTexture,x);if(t0)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,k9.__webglTexture,q0,U8+$8);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,k9.__webglTexture,q0);if(x!==0)j.blitFramebuffer(z0,S0,R0,E0,I0,a0,R0,E0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(t0)j.copyTexSubImage3D(M0,q0,I0,a0,U8+$8,z0,S0,R0,E0);else j.copyTexSubImage2D(M0,q0,I0,a0,z0,S0,R0,E0)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(t0)if(k.isDataTexture||k.isData3DTexture)j.texSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,V8,Y8.data);else if(v.isCompressedArrayTexture)j.compressedTexSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,Y8.data);else j.texSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,V8,Y8);else if(k.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,q0,I0,a0,R0,E0,r0,V8,Y8.data);else if(k.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,q0,I0,a0,Y8.width,Y8.height,r0,Y8.data);else j.texSubImage2D(j.TEXTURE_2D,q0,I0,a0,R0,E0,r0,V8,Y8);if(L.pixelStorei(j.UNPACK_ROW_LENGTH,S8),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,d0),L.pixelStorei(j.UNPACK_SKIP_PIXELS,l8),L.pixelStorei(j.UNPACK_SKIP_ROWS,t8),L.pixelStorei(j.UNPACK_SKIP_IMAGES,R9),q0===0&&v.generateMipmaps)j.generateMipmap(M0);L.unbindTexture()},this.initRenderTarget=function(k){if(T.get(k).__webglFramebuffer===void 0)l.setupRenderTarget(k)},this.initTexture=function(k){if(k.isCubeTexture)l.setTextureCube(k,0);else if(k.isData3DTexture)l.setTexture3D(k,0);else if(k.isDataArrayTexture||k.isCompressedArrayTexture)l.setTexture2DArray(k,0);else l.setTexture2D(k,0);L.unbindTexture()},this.resetState=function(){c=0,p=0,f=null,L.reset(),Y0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return x$}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let $=this.getContext();$.drawingBufferColorSpace=g0._getDrawingBufferColorSpace(J),$.unpackColorSpace=g0._getUnpackColorSpace()}}var IQ=`
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;var tZ=`
varying vec2 vUv;
uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
uniform float uGroupCount;
uniform float uFocusedCluster;uniform float uHoveredCluster;uniform float uContext;
float groupPhase(float index){return clamp(index/max(1.,uGroupCount-1.),0.,1.);}
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

uniform sampler2D uNoise;
uniform float uReceipt;
uniform float uHoverCore;
float n(vec2 p){return texture2D(uNoise,p/128.).r;}
float field(vec2 p){return n(p)*.57+n(p*2.03+17.)*.28+n(p*4.09-9.)*.15;}
void main(){
 vec2 p=(vUv-.5)*2.;float r=length(p);if(r>.99)discard;
 float a=atan(p.y,p.x), t=uTime*.07, radius=.425;
 float body=1.-smoothstep(radius-fwidth(r),radius+fwidth(r),r);
 vec2 q=p/radius;float sphere=sqrt(max(0.,1.-dot(q,q)));
 // Curl-like advection from a small, seeded noise tile, sampled only over the sun.
 vec3 surface=vec3(0.);
 if(r<radius+.01){
   vec2 domain=q*19.+vec2(t*1.3,-t*.7);
   vec2 warp=vec2(field(domain*.47+7.),field(domain*.47+29.));
   float cells=field(domain+warp*7.);
   float ridges=1.-abs(2.*field(domain*.8+warp*11.+t)-1.);
   float heat=smoothstep(.24,.82,cells*.75+ridges*.35);
   surface=mix(vec3(.68,.20,.026),vec3(1.,.86,.51),heat);
   surface+=vec3(.16,.12,.05)*sphere;
 }
 float outside=max(0.,r-radius);
 float threads=.5+.5*sin(a*17.+sin(a*7.-t)*2.2+sin(a*3.+t*.4)*3.);
 float filaments=pow(threads,5.)*exp(-outside*18.);
 float prominenceRadius=radius+.028+.035*pow(.5+.5*sin(a*5.+t*.8),4.);
 float prominence=exp(-abs(r-prominenceRadius)*180.)*pow(.5+.5*sin(a*3.-t*.7),12.);
 float corona=(exp(-outside*15.)*.20+filaments*.24+prominence*.20)*(1.-body);
 float air=exp(-outside*6.8)*.045*(1.-body)*(1.-smoothstep(.8,.99,r));
 float limb=exp(-abs(r-radius)*210.)*.55;
 float breathe=1.+sin(uTime*.42)*.025;
 vec3 light=vec3(1.,.59,.20)*(corona+air)+vec3(1.,.87,.55)*limb;
 // A receipt is a bounded, neutral double-ring; it never accelerates ambient energy.
 float receipt=step(0.,uReceipt)*(1.-smoothstep(.15,1.,uReceipt));
 float echo=(ring(r,.48+uReceipt*.28,.002)+ring(r,.50+uReceipt*.28,.001))*receipt*.55;
 float hover=ring(r,.47,.002)*uHoverCore*.28;
 float alpha=clamp(body+corona+air+limb+echo+hover,0.,1.)*reveal(0.,.2);
 vec3 rgb=surface*body+light*breathe+vec3(.85,.89,.87)*(echo+hover);
 gl_FragColor=vec4(rgb/max(body+corona+air+limb+echo+hover,.001),alpha*mix(1.,.42,uSpotlightAmount));
}`,eZ=`
uniform float uScale;uniform float uContext;
attribute vec2 center;
attribute vec3 tint;
attribute vec4 nodeState;
attribute float order;
varying vec2 vUv;varying vec3 vTint;varying vec4 vState;varying float vOrder;
void main(){vUv=uv;vTint=tint;vState=nodeState;vOrder=order;
gl_Position=projectionMatrix*modelViewMatrix*vec4(position.xy*(uContext>0.?max(86.,74./uScale):86.)+center,1.,1.);}`,JK=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
uniform float uGroupCount;
uniform float uFocusedCluster;uniform float uHoveredCluster;uniform float uContext;
float groupPhase(float index){return clamp(index/max(1.,uGroupCount-1.),0.,1.);}
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

varying vec2 vUv;varying vec3 vTint;varying vec4 vState;varying float vOrder;
void main(){
 vec2 p=(vUv-.5)*2.;float r=length(p),a=atan(p.y,p.x);if(r>.99)discard;
 float soft=spotlightBlur(vOrder);
 float disk=1.-smoothstep(.582-soft*.10,.598+soft*.12,r),rim=mix(ring(r,.592,.004),exp(-pow((r-.592)/.10,2.))*.15,soft);
 float selected=vState.x,hover=vState.y,drag=vState.z,dim=vState.w;
 float light=pow(max(0.,dot(normalize(vec3(p,.6)),normalize(vec3(-.6,.8,.8)))),3.);
 vec3 surface=vec3(.018,.022,.024)+vTint*(.05+light*.12);
 float caustic=pow(.5+.5*cos(a*2.-uTime*.16-vOrder),12.)*.12;
 float atmosphere=exp(-abs(r-.60)*30.)*(.06+selected*.09+hover*.08);
 float arcGate=smoothstep(.35,.95,cos(a-uTime*.19-vOrder*.9));
 float arc=ring(r,.68,.0025)*arcGate*(.18+selected*.38+hover*.28);
 float focus=ring(r,.723,.003)*selected*.50;
 float grip=ring(r,.78,.004)*drag*(.45+.25*sin(a*8.));
 float alpha=clamp(disk+rim*.6+atmosphere+arc+focus+grip,0.,1.);
 vec3 rgb=surface*disk+vTint*(rim*(.28+caustic+hover*.35)+atmosphere+arc+focus+grip);
 rgb*=mix(1.,.48,dim);
 gl_FragColor=vec4(rgb/max(alpha,.001),alpha*reveal(.23+groupPhase(vOrder)*.20,.12)*mix(1.,.4,soft));
 #include <colorspace_fragment>
}`,$K=`
uniform float uScale;uniform float uTime;uniform float uMotion;uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
attribute vec2 source;attribute vec2 target;attribute vec3 tint;attribute vec4 edgeMeta;attribute float edgeLife;
varying vec2 vUv;varying vec3 vTint;varying vec4 vMeta;varying float vLife;
void main(){
 vUv=uv;vTint=tint;vMeta=edgeMeta;vLife=edgeLife;
 float t=uv.x,q=1.-t,b=.035;
 vec2 d=target-source,n=vec2(-d.y,d.x);
 vec2 c1=source+d*.34+n*b,c2=source+d*.72+n*b*.5;
 vec2 point=q*q*q*source+3.*q*q*t*c1+3.*q*t*t*c2+t*t*t*target;
 vec2 tangent=3.*q*q*(c1-source)+6.*q*t*(c2-c1)+3.*t*t*(target-c2);
 vec2 normal=vec2(-tangent.y,tangent.x)/max(length(tangent),.001);
 point+=normal*sin(t*3.14159265)*sin(uTime*.55+t*5.-edgeMeta.z*2.)*.35*uMotion*(1.-uEconomy*.7);
 // Flipping world Y below also flips winding: invert the ribbon normal to keep its front face.
 point-=normal*(uv.y-.5)*5.5/max(uScale,.001);
 gl_Position=projectionMatrix*modelViewMatrix*vec4(point.x,-point.y,0.,1.);
}`,QK=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
uniform float uGroupCount;
uniform float uFocusedCluster;uniform float uHoveredCluster;uniform float uContext;
float groupPhase(float index){return clamp(index/max(1.,uGroupCount-1.),0.,1.);}
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

uniform float uSelected;uniform float uHovered;uniform float uDragged;
uniform float uSelectedLeaf;uniform float uHoveredLeaf;
uniform float uReconnect;
varying vec2 vUv;varying vec3 vTint;varying vec4 vMeta;varying float vLife;
void main(){
 float group=vMeta.y,leaf=vMeta.w;
 float selected=1.-step(.1,abs(group-uSelected));
 float exact=(1.-step(.1,abs(leaf-uSelectedLeaf)))*step(.9,vMeta.x);
 float cluster=1.-step(.1,abs(vMeta.z-uFocusedCluster));
 float hover=max(1.-step(.1,abs(group-uHovered)),max((1.-step(.1,abs(leaf-uHoveredLeaf)))*step(.9,vMeta.x),(1.-step(.1,abs(vMeta.z-uHoveredCluster)))*(1.-step(.9,vMeta.x))));
 float drag=1.-step(.1,abs(group-uDragged));
 float dim=mix(1.,.18,step(0.,uSelected)*(1.-selected))*mix(1.,.16,step(0.,uFocusedCluster)*(1.-cluster)*step(.1,vMeta.x));
 float cross=abs(vUv.y-.5)*2.;
 float soft=spotlightBlur(group);
 float line=mix(1.-smoothstep(.08,.40+selected*.13,cross),exp(-cross*cross*4.)*.45,soft);
 float phase=fract(uTime*(.075+vMeta.x*.045)-vMeta.z*.137-vMeta.w*.21);
 float head=exp(-pow((vUv.x-phase)*24.,2.));
 float tail=exp(-pow((vUv.x-phase+.04)*12.,2.))*.35;
 float energy=(head+tail)*uMotion*(1.-drag*.75);
 float start=vMeta.x<.1?.18+groupPhase(group)*.20:vMeta.x<.9?.43+groupPhase(group)*.12:.60+groupPhase(group)*.09;
 float growth=reveal(start,.18);
 float revealed=1.-smoothstep(growth-.03,growth+.01,vUv.x);
 if(uFormation>=.999)revealed=1.;
 float alpha=((.15+selected*.12+exact*.25+hover*.22+uReconnect*.12)*line+energy*.14*(1.-smoothstep(.05,.9,cross)))*dim*revealed*vLife*mix(1.,.4,soft);
 gl_FragColor=vec4(mix(vTint,vec3(.93,.92,.85),head*.3+exact*.15),alpha);
 #include <colorspace_fragment>
}`,WK=`
uniform float uDpr;
attribute vec3 tint;attribute vec4 leafMeta;attribute float leafCluster;attribute float leafLife;
varying vec3 vTint;varying vec4 vMeta;varying float vCluster;varying float vLife;
uniform float uContext;
void main(){vTint=tint;vMeta=leafMeta;vCluster=leafCluster;vLife=leafLife;gl_PointSize=(uContext>1.?23.:17.)*uDpr;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,ZK=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
uniform float uGroupCount;
uniform float uFocusedCluster;uniform float uHoveredCluster;uniform float uContext;
float groupPhase(float index){return clamp(index/max(1.,uGroupCount-1.),0.,1.);}
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

uniform float uSelected;uniform float uSelectedLeaf;uniform float uHoveredLeaf;
varying vec3 vTint;varying vec4 vMeta;varying float vCluster;varying float vLife;
void main(){
 float r=length((gl_PointCoord-.5)*2.);if(r>.99)discard;
 float chosen=1.-step(.1,abs(vMeta.z-uSelectedLeaf));
 float hover=1.-step(.1,abs(vMeta.z-uHoveredLeaf));
 float member=1.-step(.1,abs(vMeta.x-uSelected));
 float cluster=1.-step(.1,abs(vCluster-uFocusedCluster));
 float dim=mix(1.,.18,step(0.,uSelected)*(1.-member))*mix(1.,.15,step(0.,uFocusedCluster)*(1.-cluster));
 float beat=.5+.5*sin(uTime*.7-vMeta.y-vMeta.x);
 float soft=spotlightBlur(vMeta.x);
 float dot=mix(1.-smoothstep(.22,.4+chosen*.08+hover*.06,r),exp(-r*r*5.)*.55,soft);
 float halo=exp(-r*5.)*(.08+beat*.035+chosen*.1);
 if(uContext>1.)dot=(1.-smoothstep(.61,.7,r))*.15+ring(r,.66,.025)*.7;
 float orbit=ring(r,.73,.035)*(chosen*.65+hover*.35);
 float arrival=mix(smoothstep(0.,.32,uClock-vMeta.w),1.,1.-uMotion);
 float alpha=(dot*.85+halo+orbit)*dim*reveal(.63+groupPhase(vMeta.x)*.09+vMeta.y/(vMeta.y+8.)*.14,.12)*arrival*vLife*mix(1.,.4,soft);
 gl_FragColor=vec4(mix(vTint,vec3(.96,.96,.92),chosen*.6),alpha);
 #include <colorspace_fragment>
}`,KK=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
uniform float uGroupCount;
uniform float uFocusedCluster;uniform float uHoveredCluster;uniform float uContext;
float groupPhase(float index){return clamp(index/max(1.,uGroupCount-1.),0.,1.);}
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

varying vec2 vUv;
void main(){
 vec2 p=(vUv-.5)*2.;p.x*=1.55;
 float r=length(p),a=atan(p.y,p.x);
 float disk=exp(-abs(p.y+p.x*.27)*9.)*exp(-r*2.5);
 float curl=pow(.5+.5*cos(a*2.+r*5.-uTime*.014),4.)*exp(-r*3.);
 float halo=exp(-r*5.);
 float alpha=(disk*.035+curl*.018+halo*.035)*(1.-smoothstep(.6,1.2,r));
 gl_FragColor=vec4(mix(vec3(.49,.43,.36),vec3(.35,.37,.40),clamp(r,0.,1.)),alpha*reveal(0.,.6));
}`,HK=`
uniform float uDpr;
attribute float seed;
varying float vSeed;
void main(){vSeed=seed;gl_PointSize=(1.0+step(.93,seed)*.6)*uDpr;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,YK=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
uniform float uGroupCount;
uniform float uFocusedCluster;uniform float uHoveredCluster;uniform float uContext;
float groupPhase(float index){return clamp(index/max(1.,uGroupCount-1.),0.,1.);}
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

varying float vSeed;
void main(){float r=length(gl_PointCoord-.5)*2.;float alpha=(1.-smoothstep(.15,1.,r))*(.12+vSeed*.13+sin(uTime*.23+vSeed*45.)*.035);
gl_FragColor=vec4(vec3(.81,.81,.76),alpha*reveal(0.,.7));}`,XK=`
attribute float along;attribute float order;
varying float vAlong;varying float vOrder;
void main(){vAlong=along;vOrder=order;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,UK=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
uniform float uSpotlight;uniform float uSpotlightAmount;
float spotlightBlur(float group){return uSpotlightAmount*step(0.,uSpotlight)*step(.1,abs(group-uSpotlight));}
uniform float uGroupCount;
uniform float uFocusedCluster;uniform float uHoveredCluster;uniform float uContext;
float groupPhase(float index){return clamp(index/max(1.,uGroupCount-1.),0.,1.);}
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

varying float vAlong;varying float vOrder;
void main(){float glint=pow(.5+.5*cos(vAlong*6.283-uTime*.09-vOrder*2.),18.);
gl_FragColor=vec4(vec3(.57,.57,.51),(.036+glint*.06)*reveal(.05,.6));}`;var GK=(J)=>Math.min(1,Math.max(0,J)),r5=(J,$,Q)=>{let W=GK((Q-J)/($-J));return W*W*(3-2*W)};function x8(J,$,Q=0,W=0,Z=7){let K=Math.min(1,Math.max(0,Q)/Math.max(1,Z-1)),H=$==="sun"?0:$==="connector"?0.18:$==="collection"?0.23+K*0.2:$==="group"?0.45+K*0.12:0.63+K*0.09+Math.max(0,W)/(Math.max(0,W)+8)*0.14;return r5(H,H+($==="sun"?0.2:0.12),J)}class KJ{constructor(){this.progress=1,this.playing=!1,this.duration=4200,this.rate=1}set({progress:J,playing:$,duration:Q,rate:W}={}){if(Number.isFinite(J))this.progress=GK(J);if(Number.isFinite(Q))this.duration=Math.max(500,Math.min(60000,Q));if(Number.isFinite(W))this.rate=Math.max(0.25,Math.min(4,W));if(typeof $==="boolean")this.playing=$&&this.progress<1;if(this.progress===1)this.playing=!1;return this.snapshot()}advance(J){if(this.playing)this.set({progress:this.progress+Math.max(0,J)*this.rate/this.duration});return this.progress}snapshot(){let J=this.progress;return{progress:J,playing:this.playing,duration:this.duration,rate:this.rate,phase:J<0.23?"sun":J<0.63?"collections":J<1?"skills":"complete",visualOnly:!0}}}class HJ{constructor(J=360){this.values=new Float32Array(J),this.clear()}clear(){this.count=0,this.cursor=0}add(J){this.values[this.cursor]=J,this.cursor=(this.cursor+1)%this.values.length,this.count=Math.min(this.count+1,this.values.length)}percentile(J){if(!this.count)return null;let $=this.values.slice(0,this.count).sort();return Math.round($[Math.floor((this.count-1)*J)]*100)/100}}function CQ(J,$){return Math.min(Math.max(1,J||1),$?1:1.5)}class _Q{constructor(){this.reset()}reset(){this.frames=0,this.slow=0,this.degraded=!1}observe(J,$){if(this.degraded)return!1;if(this.frames++,J>52||$>10)this.slow++;if(this.frames<90)return!1;let Q=this.slow>18;return this.frames=0,this.slow=0,this.degraded=Q,Q}}function NK(J){return Math.max(105,Math.max(0,J)*5.4)}function EK(J,$,Q,W=90,Z=1,K=0){let H=$+Q*Math.PI*2/W*Z,Y=J+Math.sin(Q*Math.PI*2/37)*K;return{x:Math.cos(H)*Y,y:Math.sin(H)*Y,radius:Y}}var wQ={};lQ(wQ,{visibleCount:()=>qK,skillName:()=>XJ,separateSpecialists:()=>FK,sampleGroups:()=>PQ,plan:()=>$1,identity:()=>M9,identities:()=>YJ,hash:()=>e9,fitCamera:()=>e5,catalogGroups:()=>AQ,boundsOf:()=>o6});var YJ={ads:{angle:-140,color:"#dba17c"},code:{angle:-43,color:"#91b5ed"},contents:{angle:3,color:"#7bc8b4"},"customer-finder":{angle:-184,color:"#d9c276"},"cyber-security":{angle:139,color:"#b29bd7"},marketing:{angle:43,color:"#92c399"},"personal-branding":{angle:92,color:"#d49cae"}};function e9(J){let $=2166136261;for(let Q of J)$=Math.imul($^Q.charCodeAt(0),16777619);return $>>>0}function M9(J){if(YJ[J])return YJ[J];let $=e9(J)%360,Q=0.38,W=0.64,Z=Q*Math.min(W,1-W),K=(H)=>{let Y=(H+$/30)%12;return Math.round(255*(W-Z*Math.max(-1,Math.min(Y-3,9-Y,1)))).toString(16).padStart(2,"0")};return{angle:e9(J)%360,color:`#${K(0)}${K(8)}${K(4)}`}}function qK(J,$,Q=3,W=1){if(W<=0.500001)return 0;let Z=Math.max(0,Math.min(6,Number(Q)||0)-3);return Math.min(J,($?50:10)+Z*($?12:4))}var t5=["A–C","D–F","G–I","J–L","M–O","P–R","S–U","V–Z","#"];function XJ(J){return J.path.split("/").at(-2).replace(/-/g," ")}function AQ(J,$){let Q=`SISTEMA/skills/${J}/`,W=new Map;for(let H of $){if(H.directory||H.name!=="SKILL.md"||!H.path.startsWith(Q))continue;let Y=H.path.slice(Q.length).split("/"),X=Y.slice(0,-2).join("/"),U=X&&Y.at(-3)!=="skills",E=XJ(H).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().charCodeAt(0),N=E>=65&&E<=90?Math.min(7,Math.floor((E-65)/3)):8,G=U?`folder:${X}`:`alphabet:${N}`;if(!W.has(G))W.set(G,{id:`${J}/${G}`,parent:J,name:U?X:t5[N],kind:U?"folder":"alphabet",originPath:U?Q+X:Q.slice(0,-1),skills:[]});W.get(G).skills.push(H)}let Z=[...W.values()].sort((H,Y)=>H.id.localeCompare(Y.id)),K=new Map;return Z.map((H)=>{let Y=Z.filter((U)=>U.name===H.name).length,X=(K.get(H.name)||0)+1;return K.set(H.name,X),{...H,name:Y>1?`${H.name} · ${X}`:H.name,skills:H.skills.sort((U,E)=>U.path.localeCompare(E.path))}})}function PQ(J,$,Q=null,W=0,Z=50,K=null){let H=new Map(J.map((U)=>[U.id,[]])),Y=0;for(let U=0;Y<$;U++){let E=!1;for(let N of J)if(Y<$&&U<N.skills.length)H.get(N.id).push(N.skills[U]),Y++,E=!0;if(!E)break}let X=J.find((U)=>U.id===Q);if(X){let U=Math.min(W*Z,Math.max(0,X.skills.length-Z));H.set(X.id,X.skills.slice(U,U+Z))}if(K){let U=J.find((E)=>E.skills.some((N)=>N.path===K));if(U&&!H.get(U.id).some((E)=>E.path===K))H.get(U.id).push(U.skills.find((E)=>E.path===K))}return H}function o6(J,$=30){if(!J.length)J=[{x:0,y:0}];return{minX:Math.min(...J.map((Q)=>Q.x))-$,maxX:Math.max(...J.map((Q)=>Q.x))+$,minY:Math.min(...J.map((Q)=>Q.y))-$,maxY:Math.max(...J.map((Q)=>Q.y))+$}}function e5(J,$,Q,W=48,Z=18,K=1/0){let H=Math.max(0.025,Math.min(K,($-Z*2)/Math.max(1,J.maxX-J.minX),(Q-W-Z*2)/Math.max(1,J.maxY-J.minY)));return{x:$/2-(J.minX+J.maxX)*H/2,y:(Q+W)/2-(J.minY+J.maxY)*H/2,k:H}}function FK(J,$=250,Q=168){for(let W=0;W<24;W++){let Z=!1;for(let K=0;K<J.length;K++)for(let H=K+1;H<J.length;H++){let Y=J[K],X=J[H],U=X.x-Y.x,E=X.y-Y.y,N=Math.hypot(U,E);if(N>=Q)continue;let G=N>0.001?Math.atan2(E,U):e9(Y.id+"|"+X.id)%6283/1000,D=(Q-N)/2+0.05,R=Math.cos(G)*D,z=Math.sin(G)*D;Y.x-=R,Y.y-=z,X.x+=R,X.y+=z,Z=!0}for(let K of J){let H=Math.hypot(K.x,K.y);if(H>=$)continue;let Y=H>0.001?Math.atan2(K.y,K.x):M9(K.id).angle*Math.PI/180;K.x=Math.cos(Y)*$,K.y=Math.sin(Y)*$,Z=!0}if(!Z)break}for(let W of J)W.angle=Math.atan2(W.y,W.x);return J}function J1(J,$,Q){let W=AQ(J.id,$),Z={...J,x:0,y:0,angle:-Math.PI/2,color:M9(J.id).color,skills:W.flatMap((F)=>F.skills),groups:W},K=Q.group?W.filter((F)=>F.id===Q.group):W,H=PQ(K,50,Q.group,Q.page||0,50);if(Q.leaf&&!Array.from(H.values()).flat().some((F)=>F.path===Q.leaf)){let F=K.find((q)=>q.skills.some((C)=>C.path===Q.leaf));if(F){let q=Array.from(H.values());if(q.flat().length>=50)q.findLast((C)=>C.length)?.pop();H.get(F.id).push(F.skills.find((C)=>C.path===Q.leaf))}}let Y=K.filter((F)=>H.get(F.id).length),X=[],U=[],E=Math.PI*2,N=Math.max(180,Y.length*27),G=-Math.PI/2;for(let[F,q]of Y.entries()){let C=H.get(q.id),A=E/Math.max(1,Y.length),V=G+A/2,I=Y.length===1,_={...q,x:I?0:Math.cos(V)*N,y:I?0:Math.sin(V)*N,rootMembership:I,angle:V,index:F,focused:q.id===Q.group,source:Z.id,visibleCount:C.length};X.push(_);let w=0,M=0,B=N+120;for(let[d,P]of C.entries()){let b=Math.max(1,Math.floor(B*Math.max(0.08,A-0.12)/65));if(w>=b)w=0,M++,B+=85;let o=Math.max(1,Math.floor(B*Math.max(0.08,A-0.12)/65)),g=C.length-d+w,c=Math.min(o,g),p=V+(w-(c-1)/2)*(A-0.12)/Math.max(1,c);U.push({id:P.path,parent:Z.id,group:q.id,source:q.id,x:Math.cos(p)*B,y:Math.sin(p)*B,custom:!1,name:XJ(P),index:U.length,localIndex:d,depth:2,route:null,angle:p,dir:Math.cos(p)>=0?1:-1}),w++}G+=A}let D=[Z,...X,...U],R=Math.max(220,...D.map((F)=>Math.max(Math.abs(F.x),Math.abs(F.y))))+90,z={minX:-R,maxX:R,minY:-R,maxY:R};return{nodes:[Z],groups:X,leaves:U,bounds:z,focusBounds:z,dedicated:!0}}function $1(J,$,Q,W=3,Z={},K=248,H={}){let Y=J.find((q)=>q.id===Q);if(Y)return J1(Y,$,H);let X=[...J].sort((q,C)=>M9(q.id).angle-M9(C.id).angle||q.id.localeCompare(C.id)),U=X.every((q)=>YJ[q.id])&&X.length<=7,E=Math.max(270,X.length*34,K),N=X.map((q,C)=>{let A=(U?M9(q.id).angle:-140+C*360/X.length)*Math.PI/180,V=AQ(q.id,$),I=Z.nodes?.[q.id];return{...q,angle:A,color:M9(q.id).color,x:I?.x??Math.cos(A)*E,y:I?.y??Math.sin(A)*E,skills:V.flatMap((_)=>_.skills),groups:V}});FK(N,Math.max(250,E-20),Math.max(168,E*0.5));let G=[],D=[];for(let q of N){let C=q.id===Q,A=qK(q.skills.length,C,W,1),V=PQ(q.groups,A,C?H.group:null,H.page||0,50,H.leaf),I=N.filter((b)=>b!==q).map((b)=>Math.abs(Math.atan2(Math.sin(b.angle-q.angle),Math.cos(b.angle-q.angle)))),_=Math.min(1.25,(I.length?Math.min(...I):1.8)*0.82),w=C?3.45:_,M=q.groups.length,B=q.groups.reduce((b,o)=>b+Math.max(2,V.get(o.id).length),0),d=-w/2,P=C?Math.max(235,M*24):E+102;q.groups.forEach((b,o)=>{let g=w*Math.max(2,V.get(b.id).length)/Math.max(1,B),c=M<2?0:o/(M-1)-0.5,p=q.angle+(C?d+g/2:c*w);d+=g;let f=b.id===H.group&&C,a=C?q.x+Math.cos(p)*P:q.x+Math.cos(p)*P-Math.cos(q.angle)*E,e=C?q.y+Math.sin(p)*P:q.y+Math.sin(p)*P-Math.sin(q.angle)*E,J0=V.get(b.id);if(f){let D0=Math.min(5,Math.max(1,Math.ceil(J0.length/8))),l0=175+(D0-1)*205+145;a=q.x+Math.cos(q.angle)*1400-l0/2,e=q.y+Math.sin(q.angle)*1400}let k0={...b,x:a,y:e,angle:p,index:o,focused:f,source:q.id,visibleCount:V.get(b.id).length};G.push(k0),J0.forEach((D0,l0)=>{let u0,n;if(f){let K0=Math.min(5,Math.max(1,Math.ceil(J0.length/8))),H0=Math.ceil(J0.length/K0),L0=Math.floor(l0/H0),j0=l0%H0;u0=a+175+L0*205,n=e+(j0-(H0-1)/2)*66}else if(C){let K0=l0,H0=0,L0=P+105,j0=Math.max(1,Math.floor(L0*Math.max(0.12,g-0.06)/43));while(K0>=j0)K0-=j0,H0++,L0+=56,j0=Math.max(1,Math.floor(L0*Math.max(0.12,g-0.06)/43));let f0=l0-K0,y0=Math.min(j0,J0.length-f0),o0=(K0-(y0-1)/2)*Math.min(43/L0,(g-0.06)/Math.max(1,y0)),b0=p+o0;u0=q.x+Math.cos(b0)*L0,n=q.y+Math.sin(b0)*L0}else{let K0=Math.max(17,Math.min(22,(E+150)*_*0.82/Math.max(1,J0.length-1))),H0=(l0-(J0.length-1)/2)*K0,L0=50+l0%2*14;u0=a+Math.cos(p)*L0-Math.sin(p)*H0,n=e+Math.sin(p)*L0+Math.cos(p)*H0}let W0=Z.leaves?.[D0.path];D.push({id:D0.path,parent:q.id,group:b.id,source:b.id,x:W0?.x??u0,y:W0?.y??n,custom:!!W0,name:XJ(D0),index:D.filter((K0)=>K0.parent===q.id).length,localIndex:l0,depth:2,route:f?{column:Math.floor(l0/Math.ceil(J0.length/Math.min(5,Math.max(1,Math.ceil(J0.length/8))))),offset:34}:null,angle:p,dir:f?1:Math.cos(q.angle)>=0?1:-1})})})}for(let q=0;q<4;q++){let C=new Map,V=[...D].sort((I,_)=>Number(_.parent===Q)-Number(I.parent===Q)||I.id.localeCompare(_.id));for(let I of V){if(!I.custom)for(let w=0;w<3;w++){let M=Math.floor(I.x/19),B=Math.floor(I.y/19),d=!1;for(let P=M-1;P<=M+1;P++)for(let b=B-1;b<=B+1;b++)for(let o of C.get(`${P},${b}`)||[]){if(o.parent===I.parent)continue;let g=I.x-o.x,c=I.y-o.y,p=Math.hypot(g,c);if(p<19){let f=p>0.001?Math.atan2(c,g):e9(I.id)*0.001;I.x+=Math.cos(f)*(19-p+0.1),I.y+=Math.sin(f)*(19-p+0.1),d=!0}}if(!d)break}let _=`${Math.floor(I.x/19)},${Math.floor(I.y/19)}`;if(!C.has(_))C.set(_,[]);C.get(_).push(I)}}let R=[{x:-150,y:-150},{x:150,y:150}],z=o6([...R,...N,...G,...D],35),F=H.group?[...G.filter((q)=>q.id===H.group),...D.filter((q)=>q.group===H.group)]:Q?[...R,...N.filter((q)=>q.id===Q),...G.filter((q)=>q.parent===Q),...D.filter((q)=>q.parent===Q)]:[...R,...N,...G,...D];if(H.group){let q=D.filter((C)=>C.group===H.group);if(q.length)F.push({x:Math.max(...q.map((C)=>C.x))+145,y:Math.min(...q.map((C)=>C.y))-62})}return{nodes:N,groups:G,leaves:D,bounds:z,focusBounds:o6(F,H.group?42:38)}}var jQ={};lQ(jQ,{tooltip:()=>GJ,resolve:()=>LK,plan:()=>Z1,orbitPlugins:()=>Q1,orbit:()=>W1,label:()=>kK,internalConnectors:()=>DK,colorFor:()=>UJ,children:()=>RK,areas:()=>a6,areaEntries:()=>MK,areaDefinitions:()=>OK});var DK=new Set(["connector_openai_codex_document_control","connector_openai_hotline","connector_openai_safety_settings"]);function Q1(J=[]){return J.filter(($)=>$.status==="connected"&&!DK.has($.id)).sort(($,Q)=>$.id.localeCompare(Q.id))}var OK=[{id:"personal",name:"Pessoal",path:"AREAS/pessoal",color:"#D4A1CC",aliases:["pessoal","personal"],palette:["#D4A1CC","#B4A0E5","#DDB08D","#A2C7B4"]},{id:"professional",name:"Profissional",path:"AREAS/profissional",color:"#83B9D7",aliases:["profissional","professional"],palette:["#83B9D7","#A2AFE4","#CEC08B","#8CBFAA"]}],SQ=(J,$)=>J===$||J.startsWith($+"/"),TQ=(J)=>String(J).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();function a6(J=[]){return OK.map(($)=>{let Q=J.filter((Y)=>Y.directory).map((Y)=>Y.path),W=Q.find((Y)=>TQ(Y)===TQ($.path)),Z=Q.find((Y)=>!Y.includes("/")&&$.aliases.includes(TQ(Y))),K=W||Z||$.path,H=J.filter((Y)=>SQ(Y.path,K)&&Y.path!==K);return{...$,path:K,exists:!!W||!!Z||H.length>0,notes:H.filter((Y)=>!Y.directory).length,folders:H.filter((Y)=>Y.directory).length}})}function UJ(J,$){return J.palette[e9($)%J.palette.length]}function MK(J,$){return J.filter((Q)=>Q.path!==$.path&&SQ(Q.path,$.path))}function RK(J,$){return J.filter((Q)=>Q.path.slice(0,Q.path.lastIndexOf("/"))===$).sort((Q,W)=>Number(W.directory)-Number(Q.directory)||Q.path.localeCompare(W.path))}function kK(J){return J.name?.replace(/\.md$/i,"")||J.path.split("/").at(-1).replace(/\.md$/i,"")}function GJ(J,$,Q){let W=J.path===$.path?$.name:$.name+" › "+J.path.slice($.path.length+1).replace(/\.md$/i,"").split("/").join(" › ");if(J.path===$.path&&!$.exists)return`${W} · Pasta ainda não criada no Obsidian`;let Z=J.directory?Q.filter((K)=>!K.directory&&K.path.startsWith(J.path+"/")).length:0;return`${W} · ${J.directory?`Pasta · ${Z} ${Z===1?"nota":"notas"}`:"Nota"}`}function W1(J=[],$=105){let Q=a6(J),W=Q.map((E)=>({...E,name:E.name,directory:!0,area:E.id,root:!0,color:E.color})),Z=Q.map((E)=>MK(J,E).sort((N,G)=>N.path.split("/").length-G.path.split("/").length||N.path.localeCompare(G.path)));for(let E=0;W.length<50;E++){let N=!1;for(let G=0;G<Q.length&&W.length<50;G++){let D=Z[G][E];if(D)W.push({...D,area:Q[G].id,color:UJ(Q[G],D.path)}),N=!0}if(!N)break}let K=$+58,H=[K],Y=W.slice(0,2).map((E,N)=>({...E,x:0,y:(N?1:-1)*K,r:10,tooltip:GJ(E,Q[N],J)})),X=2,U=1;while(X<W.length){let E=$+58+U*38,N=Math.max(12,Math.floor(2*Math.PI*E/34)),G=Math.min(N,W.length-X);H.push(E);for(let D=0;D<G;D++){let R=W[X+D],z=-Math.PI/2+D*2*Math.PI/G+(U%2?0.12:0),F=Q.find((q)=>q.id===R.area);Y.push({...R,x:Math.cos(z)*E,y:Math.sin(z)*E,r:R.root?10:6.5,tooltip:GJ(R,F,J)})}X+=G,U++}return{areas:Q,points:Y,rings:H,radius:H.at(-1)||$+58}}function LK(J,$){let Q=a6(J).find((H)=>H.id===$.area)||a6(J)[0],W=String($.path||Q.path),Z=SQ(W,Q.path)&&!W.split("/").includes(".."),K=W===Q.path||J.some((H)=>H.directory&&H.path===W);return{...$,area:Q.id,path:Z&&K?W:Q.path,page:Math.max(0,Number($.page)||0)}}function Z1(J,$){let Q=LK(J,$),W=a6(J).find((G)=>G.id===Q.area),Z=RK(J,Q.path),K=Math.max(1,Math.ceil(Z.length/50));Q.page=Math.min(Q.page,K-1);let H=Z.slice(Q.page*50,Q.page*50+50),Y="knowledge:"+Q.path,X={id:Y,name:Q.path===W.path?W.name:Q.path.split("/").at(-1),icon:"folder",x:0,y:0,angle:-Math.PI/2,color:Q.path===W.path?W.color:UJ(W,Q.path),skills:J.filter((G)=>!G.directory&&G.path.startsWith(Q.path+"/")),groups:[],knowledge:!0},U=H.map((G,D)=>{let R=Math.floor(D/24),z=Math.min(24,H.length-R*24),F=-Math.PI/2+D%24*Math.PI*2/z,q=260+R*105;return{id:G.path,parent:Y,group:null,source:Y,name:kK(G),x:Math.cos(F)*q,y:Math.sin(F)*q,angle:F,dir:Math.cos(F)>=0?1:-1,index:D,localIndex:D,depth:1,route:null,custom:!1,knowledge:!0,directory:!!G.directory,area:W.id,color:UJ(W,G.path),tooltip:GJ(G,W,J)}}),E=Math.max(260,...U.map((G)=>Math.max(Math.abs(G.x),Math.abs(G.y))))+90,N=o6([{x:-E,y:-E},{x:E,y:E}],0);return{nodes:[X],groups:[],leaves:U,bounds:N,focusBounds:N,dedicated:!0,route:Q,area:W,total:Z.length,pages:K}}window.OracleKnowledge=jQ;window.OracleLayout=wQ;window.OracleMotion={FormationTimeline:KJ,revealAt:x8,pluginOrbitRadius:NK,orbitalPosition:EK};var X8=(J)=>({value:J}),NJ=(J)=>{let $=Math.sin(J*127.1+311.7)*43758.5453;return $-Math.floor($)},_6=(J,$,Q,W=!0)=>{for(let[Z,K]of Object.entries($)){let H=W?s7:E8;J.setAttribute(Z,new H(new Float32Array(Q*K),K).setUsage(h$))}},g8=(J,$,...Q)=>{let W=!1;for(let Z=0;Z<Q.length;Z++){let K=$*J.itemSize+Z,H=Math.fround(Q[Z]);if(J.array[K]!==H)J.array[K]=H,W=!0}if(W)J.needsUpdate=!0;return W};function VK(J=1){let $=new j9(1,1,J,1),Q=new JJ;return Q.index=$.index,Q.setAttribute("position",$.attributes.position),Q.setAttribute("uv",$.attributes.uv),Q.instanceCount=0,Q}class BK{constructor(J){this.host=J,this.scene=new d7,this.camera=new z6(-500,500,350,-350,0.1,100),this.camera.position.z=10,this.active=!0,this.quality="balanced",this.pending=0,this.timeout=0,this.time=0,this.clock=0,this.last=0,this.renderCount=0,this.dirty=!0,this.paused=!1,this.reduced=!1,this.frameSamples=new HJ,this.costSamples=new HJ,this.governor=new _Q,this.timeline=new KJ,this.clusterRows=new Map,this.nodeRows=new Map,this.leafRows=new Map,this.leafBirths=new Map,this.colors=[],this.colorByID=new Map,this.nodeCapacity=8,this.edgeCapacity=128,this.leafCapacity=128,this.nodeTargets=new Float32Array(this.nodeCapacity*4),this.receipts=new Set,this.receiptAt=-100,this.transitioning=!1,this.u={uTime:X8(0),uClock:X8(0),uFormation:X8(1),uMotion:X8(1),uEconomy:X8(0),uScale:X8(1),uDpr:X8(CQ(devicePixelRatio,!1)),uSpotlight:X8(-2),uSpotlightAmount:X8(0),uSelected:X8(-2),uSelectedLeaf:X8(-2),uHovered:X8(-2),uHoveredLeaf:X8(-2),uDragged:X8(-2),uReceipt:X8(-1),uHoverCore:X8(0),uReconnect:X8(0),uGroupCount:X8(7),uFocusedCluster:X8(-2),uHoveredCluster:X8(-2),uContext:X8(0)};let $=document.createElement("canvas");$.className="universe-webgl",$.setAttribute("aria-hidden","true"),J.prepend($),this.canvas=$;try{this.renderer=new zQ({canvas:$,alpha:!0,antialias:!1,powerPreference:"low-power",depth:!1,stencil:!1})}catch(Q){throw $.remove(),this.active=!1,Q}this.renderer.outputColorSpace=x7,this.renderer.setPixelRatio(this.u.uDpr.value),this.renderer.setClearColor(0,0),this.renderer.sortObjects=!1,this.renderer.debug.onShaderError=(Q,W,Z,K)=>{this.error=[Q.getProgramInfoLog(W),Q.getShaderInfoLog(Z),Q.getShaderInfoLog(K)].filter(Boolean).join(`
`),this.failed=!0,this.cancel(),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback"),this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0)};try{this.setup()}catch(Q){throw this.dispose(),Q}this.onLost=(Q)=>{Q.preventDefault(),this.contextLost=!0,this.cancel(),this.last=0,this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback")},this.onRestored=()=>{if(!this.active)return;this.contextLost=!1,this.failed=!1,this.error=null,this.last=0,this.reconnectAt=this.clock,this.dirty=!0,this.host.classList.add("three-enabled"),this.host.classList.remove("svg-fallback"),this.schedule()},this.onVisibility=()=>{if(this.last=0,this.cancel(),!document.hidden)this.dirty=!0,this.schedule()},$.addEventListener("webglcontextlost",this.onLost),$.addEventListener("webglcontextrestored",this.onRestored),document.addEventListener("visibilitychange",this.onVisibility),J.classList.add("three-enabled")}material(J,$){return new T8({vertexShader:J,fragmentShader:$,uniforms:this.u,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1})}mesh(J,$,Q,W=b8){let Z=new W(J,this.material($,Q));return Z.frustumCulled=!1,this.scene.add(Z),Z}setup(){let J=new Uint8Array(16384);for(let X=0;X<J.length;X++)J[X]=Math.floor(NJ(X+11)*255);this.noiseTexture=new d6(J,128,128,S7,h8),this.noiseTexture.minFilter=this.noiseTexture.magFilter=_8,this.noiseTexture.wrapS=this.noiseTexture.wrapT=P7,this.noiseTexture.needsUpdate=!0,this.u.uNoise=X8(this.noiseTexture),this.plane=new j9(1,1),this.galaxy=this.mesh(this.plane,IQ,KK),this.galaxy.scale.set(1120,730,1);let $=new L8,Q=[],W=[];for(let X=0;X<78;X++)Q.push((NJ(X+2)-0.5)*1080,(NJ(X+901)-0.5)*720,-1),W.push(NJ(X+31));$.setAttribute("position",new E8(new Float32Array(Q),3)),$.setAttribute("seed",new E8(new Float32Array(W),1)),this.stars=this.mesh($,HK,YK,u6);let Z=new L8,K=[],H=[],Y=[];[[185,95],[288,156],[395,233]].forEach(([X,U],E)=>{for(let N=0;N<160;N++)for(let G of[N,N+1]){let D=G/160*Math.PI*2,R=Math.cos(D)*X,z=Math.sin(D)*U;K.push(R*0.906-z*0.423,R*0.423+z*0.906,-0.5),H.push(G/160),Y.push(E)}}),Z.setAttribute("position",new E8(new Float32Array(K),3)),Z.setAttribute("along",new E8(new Float32Array(H),1)),Z.setAttribute("order",new E8(new Float32Array(Y),1)),this.orbits=this.mesh(Z,XK,UK,o7),this.edgeGeometry=VK(24),_6(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4,edgeLife:1},this.edgeCapacity),this.edges=this.mesh(this.edgeGeometry,$K,QK),this.leafGeometry=new L8,_6(this.leafGeometry,{position:3,tint:3,leafMeta:4,leafCluster:1,leafLife:1},this.leafCapacity,!1),this.leafGeometry.setDrawRange(0,0),this.leafPoints=this.mesh(this.leafGeometry,WK,ZK,u6),this.nodeGeometry=VK(),_6(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodes=this.mesh(this.nodeGeometry,eZ,JK),this.sun=this.mesh(this.plane,IQ,tZ),this.sun.scale.set(250,250,1)}unavailable(){return!this.active||this.contextLost||this.failed||!this.model||document.hidden||window.oracleWindowVisible===!1||this.model.data?.hidden||!this.width||!this.height}sync(J){if(!this.active)return;this.model=J;let $=!J.selected&&!J.knowledge;if(this.leafPoints.visible=!J.knowledge,this.sun.visible!==$)this.sun.visible=$,this.orbits.visible=$,this.dirty=!0;this.u.uGroupCount.value=Math.max(1,J.nodes.size);let Q=!1,W=Math.round(J.width),Z=Math.round(J.height);if(!W||!Z)return;if(W!==this.width||Z!==this.height)this.width=W,this.height=Z,this.renderer.setSize(W,Z,!1),Q=!0;let{x:K,y:H,k:Y}=J.camera;if(Q||K!==this.cameraX||H!==this.cameraY||Y!==this.cameraK)this.cameraX=K,this.cameraY=H,this.cameraK=Y,this.camera.left=-K/Y,this.camera.right=(W-K)/Y,this.camera.top=H/Y,this.camera.bottom=(H-Z)/Y,this.camera.updateProjectionMatrix(),this.u.uScale.value=Y,Q=!0;let X=!!J.reduced||!!this.systemReduced;if(X!==this.reduced){if(this.reduced=X,Q=!0,this.last=0,X)this.setFormation({progress:1,playing:!1})}let U=!!J.data?.economy;if(this.manualEconomy!==U)this.manualEconomy=U,this.governor.reset();Q=this.setQuality(U||this.governor.degraded?"economy":"balanced")||Q,Q=this.syncGeometry(J)||Q;let E=(z)=>J.nodes.get(z)?.index??-2,N=J.hovered||document.documentElement.dataset.inputMode!=="pointer"&&J.keyboardFocus||{},G=E(J.spotlight),D=G>=0?1:0;if(this.spotlightTarget!==D)this.spotlightTarget=D,this.transitioning=!0,Q=!0;if(G>=0&&this.u.uSpotlight.value!==G)this.u.uSpotlight.value=G,Q=!0;let R={uSelected:E(J.selected||(J.knowledge?[...J.nodes.keys()][0]:null)),uSelectedLeaf:this.leafRows.get(J.selectedLeaf)??-2,uHovered:E(N.category),uHoveredLeaf:this.leafRows.get(N.skill)??-2,uDragged:E(J.drag?.category||J.drag?.node?.parent),uHoverCore:N.core?1:0,uFocusedCluster:this.clusterRows.get(J.context?.group)??-2,uHoveredCluster:this.clusterRows.get(N.group||J.leaves.get(N.skill)?.group)??-2,uContext:["global","specialist","group","skill","knowledge"].indexOf(J.context?.kind)};for(let[z,F]of Object.entries(R))if(this.u[z].value!==F)this.u[z].value=F,Q=!0;for(let z of J.nodes.values()){let F=this.nodeRows.get(z.id),q=z.id===J.selected||J.knowledge?1:0,C=z.id===N.category||J.leaves.get(N.skill)?.parent===z.id?1:0,A=J.drag?.node?.id===z.id?1:0,V=[q,C,A,J.selected&&!q?1:0];for(let I=0;I<4;I++)if(this.nodeTargets[F*4+I]!==V[I])this.nodeTargets[F*4+I]=V[I],this.transitioning=!0,Q=!0}if(this.paused=!!J.paused,!this.started)this.started=!0,this.setFormation({progress:this.reduced?1:0,playing:!this.reduced});if(J.data?.formation&&J.data.formation!==this.lastFormationInput)this.lastFormationInput=J.data.formation,this.setFormation(J.data.formation);if(this.dirty||=Q,Q&&this.timeout)clearTimeout(this.timeout),this.timeout=0;if(this.unavailable())this.cancel(),this.last=0;else this.schedule()}syncGeometry(J){let $=!1;if(J.nodes.size>this.nodeCapacity)this.nodeCapacity=Math.max(J.nodes.size,this.nodeCapacity*2),this.nodeGeometry.dispose(),_6(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodeTargets=new Float32Array(this.nodeCapacity*4),$=!0;let Q=J.nodes.size+J.groups.size+J.leaves.size;if(Q>this.edgeCapacity)this.edgeCapacity=Q*2,this.edgeGeometry.dispose(),_6(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4,edgeLife:1},this.edgeCapacity),$=!0;if(J.leaves.size>this.leafCapacity)this.leafCapacity=J.leaves.size*2,this.leafGeometry.dispose(),_6(this.leafGeometry,{position:3,tint:3,leafMeta:4,leafCluster:1,leafLife:1},this.leafCapacity,!1),$=!0;let W=this.nodeGeometry.attributes,Z=this.edgeGeometry.attributes,K=this.leafGeometry.attributes;this.nodeRows.clear(),this.clusterRows.clear(),this.leafRows.clear();let H=0,Y=0,X=(N,G,D,R,z,F,q,C,A,V=1)=>{$=g8(Z.source,Y,N,G)||$,$=g8(Z.target,Y,D,R)||$,$=g8(Z.tint,Y,z.r,z.g,z.b)||$,$=g8(Z.edgeMeta,Y,F,q,C,A)||$,$=g8(Z.edgeLife,Y,V)||$,Y++};for(let N of J.nodes.values()){this.nodeRows.set(N.id,H);let G=N.id+":"+(N.color||""),D=this.colorByID.get(G);if(!D)D=new p0(N.color||M9(N.id).color),this.colorByID.set(G,D);if(this.colors[N.index]=D,$=g8(W.center,H,N.x,-N.y)||$,$=g8(W.tint,H,D.r,D.g,D.b)||$,$=g8(W.order,H,N.index)||$,!J.selected&&!J.knowledge)X(0,0,N.x,N.y,D,0,N.index,-1,-3);H++}let U=0;for(let N of J.groups.values()){this.clusterRows.set(N.id,U++);let G=J.nodes.get(N.parent),D=this.colors[G.index];X(G.x,G.y,N.x,N.y,D,0.5,G.index,this.clusterRows.get(N.id),-3)}let E=0;for(let N of J.leaves.values()){let G=J.nodes.get(N.parent);if(!G)continue;let D=this.colors[G.index];if(this.leafRows.set(N.id,E),!this.leafBirths.has(N.id))this.leafBirths.set(N.id,this.clock),this.arrivalUntil=this.clock+0.34;$=g8(K.position,E,N.x,-N.y,1)||$,$=g8(K.tint,E,D.r,D.g,D.b)||$,$=g8(K.leafMeta,E,G.index,N.index,E,this.leafBirths.get(N.id))||$,$=g8(K.leafCluster,E,this.clusterRows.get(N.group)??-2)||$,$=g8(K.leafLife,E,N.life??1)||$;let R=N.route&&!N.retiring?{x:N.x-N.route.offset,y:N.y}:J.groups.get(N.group)||G;X(R.x,R.y,N.x,N.y,D,1,G.index,this.clusterRows.get(N.group)??-2,E,(N.life??1)*(J.selected&&J.leaves.size>150?0.24:1)),E++}if(this.nodeGeometry.instanceCount!==H||this.edgeGeometry.instanceCount!==Y||this.leafGeometry.drawRange.count!==E)$=!0;this.nodeGeometry.instanceCount=H,this.edgeGeometry.instanceCount=Y,this.leafGeometry.setDrawRange(0,E);for(let N of this.leafBirths.keys())if(!J.leaves.has(N))this.leafBirths.delete(N);return $}setQuality(J){let $=CQ(devicePixelRatio,J==="economy");if(J===this.quality&&$===this.u.uDpr.value)return!1;if(this.quality=J,this.u.uEconomy.value=J==="economy"?1:0,this.u.uDpr.value=$,this.renderer.setPixelRatio($),this.width)this.renderer.setSize(this.width,this.height,!1);return this.dirty=!0,!0}setPaused(J){if(!this.active)return;this.paused=!!J,this.cancel(),this.last=0,this.schedule()}setFormation(J){if(!this.active)return this.timeline.snapshot();let $=this.timeline.set(this.reduced||this.failed||this.contextLost?{...J,progress:1,playing:!1}:J);if(this.u.uFormation.value=$.progress,this.dirty=!0,this.timeout)clearTimeout(this.timeout),this.timeout=0;return this.applyFormation(!0),this.schedule(),$}getFormation(){return this.timeline.snapshot()}applyFormation(J=!1){if(!this.model)return;let $=this.timeline.progress;if($!==this.lastLabelProgress||J){for(let Q of this.model.nodes.values())Q.g.style.opacity=$===1?"":String(x8($,"collection",Q.index,0,this.model.nodes.size));for(let Q of this.model.groups.values()){Q.bus.style.opacity=String((Q.busOpacity||0)*x8($,"group",this.model.nodes.get(Q.parent)?.index??0,Q.index,this.model.nodes.size)),Q.g.style.opacity=$===1?"":String(x8($,"group",this.model.nodes.get(Q.parent)?.index??0,Q.index,this.model.nodes.size));let W=$===1||x8($,"group",this.model.nodes.get(Q.parent)?.index??0,Q.index,this.model.nodes.size)>0.15;Q.g.style.pointerEvents=W?"":"none",Q.g.setAttribute("tabindex",W?"0":"-1")}for(let Q of this.model.leaves.values())Q.g.style.opacity=$===1?"":String(x8($,"skill",this.model.nodes.get(Q.parent)?.index??0,Q.index,this.model.nodes.size));if(this.host.querySelector(".oracle-core").style.opacity=$===1?"":String(x8($,"sun")),this.model.connectorLayer)this.model.connectorLayer.style.opacity=$===1?"":String(x8($,"connector"));if(this.model.pluginLayer)this.model.pluginLayer.style.opacity=$===1?"":String(x8($,"connector"));if(this.model.knowledgeLayer)this.model.knowledgeLayer.style.opacity=$===1?"":String(x8($,"connector"));for(let Q of this.model.nodes.values()){let W=$===1||x8($,"collection",Q.index,0,this.model.nodes.size)>0.15;Q.g.style.pointerEvents=W?"":"none",Q.g.setAttribute("tabindex",W?"0":"-1")}for(let Q of this.model.leaves.values()){let W=!Q.retiring&&($===1||x8($,"skill",this.model.nodes.get(Q.parent)?.index??0,Q.index,this.model.nodes.size)>0.15);Q.g.style.pointerEvents=W?"":"none",Q.g.setAttribute("tabindex",W?"0":"-1")}this.lastLabelProgress=$}if(J||$===1&&this.lastNotifiedProgress!==1||this.clock-(this.lastNotifyAt||0)>0.2)this.lastNotifyAt=this.clock,this.lastNotifiedProgress=$,this.host.dispatchEvent(new CustomEvent("oracle:formation",{detail:this.getFormation()}))}signalReceipt(J){if(!this.active||this.model?.data?.replay||J?.source!=="codex-hook"||!J.event_id)return!1;let $=Date.now()-Date.parse(J.received_at);if(!Number.isFinite($)||$<0||$>8000||this.receipts.has(J.event_id))return!1;if(this.receipts.add(J.event_id),this.receipts.size>64)this.receipts.delete(this.receipts.values().next().value);return this.receiptAt=this.clock,this.dirty=!0,this.schedule(),!0}cancel(){cancelAnimationFrame(this.pending),clearTimeout(this.timeout),this.pending=0,this.timeout=0}schedule(){if(this.unavailable()||this.pending||this.timeout)return;let J=(this.transitioning||this.clock<(this.arrivalUntil||0))&&!this.reduced,$=!this.paused&&!this.reduced;if(!this.dirty&&!$&&!J)return;let Q=()=>{this.timeout=0,this.pending=requestAnimationFrame((W)=>{this.pending=0,this.render(W),this.schedule()})};if(this.dirty||J||this.timeline.playing||this.model.geometryMoving||this.model.frame)Q();else{let W=1000/(this.quality==="economy"?15:24);this.timeout=setTimeout(Q,Math.max(0,W-(performance.now()-this.last)-4))}}render(J){if(this.unavailable())return;let $=1000/(this.timeline.playing||this.model.geometryMoving||this.model.frame?60:this.quality==="economy"?15:24);if(!this.dirty&&!this.transitioning&&this.clock>=(this.arrivalUntil||0)&&this.last&&J-this.last<$-2)return;let Q=performance.now(),W=this.last?J-this.last:0,Z=Math.min(W||16.67,100);if(this.clock+=Z/1000,!this.paused&&!this.reduced){if(this.time+=Z/1000,W)this.frameSamples.add(W);if(this.timeline.playing)this.timeline.advance(Z),this.u.uFormation.value=this.timeline.progress,this.applyFormation()}this.u.uTime.value=this.reduced?0:this.time,this.u.uClock.value=this.clock,this.u.uMotion.value=this.reduced?0:1;let K=(this.clock-this.receiptAt)/2.4;this.u.uReceipt.value=this.reduced||K>1?-1:K,this.u.uReconnect.value=this.reduced?0:Math.max(0,1-(this.clock-(this.reconnectAt??-100))/0.6);let H=this.nodeGeometry.attributes.nodeState,Y=this.reduced?1:1-Math.exp(-Z/80);this.transitioning=!1;let X=(this.spotlightTarget||0)-this.u.uSpotlightAmount.value;if(Math.abs(X)>0.001)this.u.uSpotlightAmount.value+=X*Y,this.transitioning=!0;else if(this.u.uSpotlightAmount.value=this.spotlightTarget||0,!this.spotlightTarget)this.u.uSpotlight.value=-2;let U=!1;for(let N=0;N<this.nodeGeometry.instanceCount*4;N++){let G=this.nodeTargets[N]-H.array[N];if(Math.abs(G)>0.003)H.array[N]+=G*Y,this.transitioning=!0,U=!0;else if(H.array[N]!==this.nodeTargets[N])H.array[N]=this.nodeTargets[N],U=!0}if(U)H.needsUpdate=!0;if(this.model.animateOrbits?.(Z))this.syncGeometry(this.model);this.renderer.render(this.scene,this.camera),this.renderCount++,this.last=J,this.dirty=!1;let E=performance.now()-Q;if(this.costSamples.add(E),!this.paused&&!this.reduced&&!this.manualEconomy&&W&&!this.model.drag&&!this.transitioning&&this.governor.observe(W,E))this.setQuality("economy")}resetDiagnostics(){this.frameSamples.clear(),this.costSamples.clear()}diagnostics(){let J=this.renderer.info;return{renderer:"Three.js r185 · WebGL2 · instanced atlas",quality:this.quality,adaptiveEconomy:this.governor.degraded,buffer:[this.canvas.width,this.canvas.height],drawCalls:J.render.calls,triangles:J.render.triangles,geometries:J.memory.geometries,textures:J.memory.textures,renderCount:this.renderCount,samples:this.frameSamples.count,frameIntervalMedianMs:this.frameSamples.percentile(0.5),frameIntervalP95Ms:this.frameSamples.percentile(0.95),cpuSubmitMedianMs:this.costSamples.percentile(0.5),cpuSubmitP95Ms:this.costSamples.percentile(0.95),paused:this.paused||this.unavailable(),reduced:this.reduced,active:this.active,pendingFrames:Number(!!this.pending),pendingTimers:Number(!!this.timeout),formation:this.getFormation(),contextLost:!!this.contextLost,error:this.error||null,note:"CPU submission is not GPU time. Interaction and formation target 60 Hz; ambient targets 24 Hz and economy 15 Hz. Input preempts ambient deadlines. No telemetry is inferred from light."}}dispose(){if(!this.active)return;this.active=!1,this.cancel(),document.removeEventListener("visibilitychange",this.onVisibility),this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored);let J=new Set,$=new Set;if(this.scene.traverse((Q)=>{if(Q.geometry)J.add(Q.geometry);if(Q.material)$.add(Q.material)}),J.forEach((Q)=>Q.dispose()),$.forEach((Q)=>Q.dispose()),this.noiseTexture?.dispose(),this.renderer.dispose(),this.scene.clear(),this.nodeRows.clear(),this.clusterRows.clear(),this.leafRows.clear(),this.leafBirths.clear(),this.receipts.clear(),this.host.classList.remove("three-enabled"),this.model){for(let Q of this.model.nodes.values())Q.g.style.opacity="";for(let Q of this.model.leaves.values())Q.g.style.opacity=""}this.canvas.remove()}}window.OracleUniverse=BK;})();
