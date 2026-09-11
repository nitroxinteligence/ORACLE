(()=>{var cK=Object.defineProperty;var P6=(J,Q)=>{for(var $ in Q)cK(J,$,{get:Q[$],enumerable:!0,configurable:!0,set:(Z)=>Q[$]=()=>Z})};var _Z="185";var CZ=0,uJ=1,AZ=2;var b6=1,PZ=2,R6=3,k6=0,w8=1,Q9=2,$9=0,h6=1,cJ=2,nJ=3,sJ=4,wZ=5;var L6=100,TZ=101,SZ=102,jZ=103,vZ=104,fZ=200,yZ=201,bZ=202,hZ=203,xZ=204,gZ=205,pZ=206,mZ=207,lZ=208,dZ=209,uZ=210,cZ=211,nZ=212,sZ=213,iZ=214,oZ=0,aZ=1,rZ=2,iJ=3,tZ=4,eZ=5,JW=6,QW=7,$W=0,ZW=1,WW=2,a8=0,oJ=1,aJ=2,rJ=3,tJ=4,eJ=5,JQ=6,QQ=7;var V6=301,p9=302,A7=303,P7=304,x6=306,w7=1000,T7=1001,KW=1002,P9=1003,HW=1004;var g6=1005;var _8=1006,S7=1007;var m9=1008;var h8=1009,YW=1010,XW=1011,p6=1012,$Q=1013,w9=1014,F9=1015,D9=1016,ZQ=1017,WQ=1018,B6=1020,UW=35902,GW=35899,NW=1021,EW=1022,Z9=1023,l9=1026,d9=1027,j7=1028,KQ=1029,u9=1030,HQ=1031;var YQ=1033,v7=33776,f7=33777,y7=33778,b7=33779,XQ=35840,UQ=35841,GQ=35842,NQ=35843,EQ=36196,qQ=37492,FQ=37496,DQ=37488,OQ=37489,h7=37490,MQ=37491,RQ=37808,kQ=37809,LQ=37810,VQ=37811,BQ=37812,zQ=37813,IQ=37814,_Q=37815,CQ=37816,AQ=37817,PQ=37818,wQ=37819,TQ=37820,SQ=37821,jQ=36492,vQ=36494,fQ=36495,yQ=36283,bQ=36284,x7=36285,hQ=36286;var xQ=0,qW=1,c9="",g7="srgb",gQ="srgb-linear",pQ="linear",e0="srgb";var FW=512,DW=513,OW=514,p7=515,MW=516,RW=517,m7=518,kW=519;var mQ=35048;var lQ="300 es",dQ=2000;function nK(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function sK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function y6(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function LW(){let J=y6("canvas");return J.style.display="block",J}var QZ={},M6=null;function uQ(...J){let Q="THREE."+J.shift();if(M6)M6("log",Q,...J);else console.log(Q,...J)}function VW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function C0(...J){J=VW(J);let Q="THREE."+J.shift();if(M6)M6("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function P0(...J){J=VW(J);let Q="THREE."+J.shift();if(M6)M6("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function g9(...J){let Q=J.join(" ");if(Q in QZ)return;QZ[Q]=!0,C0(...J)}function BW(J,Q,$){return new Promise(function(Z,W){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:Z()}}setTimeout(K,$)})}var zW={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class O9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,K=Z.length;W<K;W++)Z[W].call(this,J);J.target=null}}}var V8=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var kJ=Math.PI/180,I7=180/Math.PI;function m6(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(V8[J&255]+V8[J>>8&255]+V8[J>>16&255]+V8[J>>24&255]+"-"+V8[Q&255]+V8[Q>>8&255]+"-"+V8[Q>>16&15|64]+V8[Q>>24&255]+"-"+V8[$&63|128]+V8[$>>8&255]+"-"+V8[$>>16&255]+V8[$>>24&255]+V8[Z&255]+V8[Z>>8&255]+V8[Z>>16&255]+V8[Z>>24&255]).toLowerCase()}function m0(J,Q,$){return Math.max(Q,Math.min($,J))}function iK(J,Q){return(J%Q+Q)%Q}function LJ(J,Q,$){return(1-$)*J+$*Q}function w6(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function P8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class n0{static{n0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=m0(this.x,J.x,Q.x),this.y=m0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=m0(this.x,J,Q),this.y=m0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(m0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(m0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,K=this.y-J.y;return this.x=W*$-K*Z+J.x,this.y=W*Z+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class M9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,K,H){let Y=$[Z+0],X=$[Z+1],U=$[Z+2],E=$[Z+3],N=W[K+0],G=W[K+1],F=W[K+2],R=W[K+3];if(E!==R||Y!==N||X!==G||U!==F){let z=Y*N+X*G+U*F+E*R;if(z<0)N=-N,G=-G,F=-F,R=-R,z=-z;let D=1-H;if(z<0.9995){let q=Math.acos(z),_=Math.sin(q);D=Math.sin(D*q)/_,H=Math.sin(H*q)/_,Y=Y*D+N*H,X=X*D+G*H,U=U*D+F*H,E=E*D+R*H}else{Y=Y*D+N*H,X=X*D+G*H,U=U*D+F*H,E=E*D+R*H;let q=1/Math.sqrt(Y*Y+X*X+U*U+E*E);Y*=q,X*=q,U*=q,E*=q}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=E}static multiplyQuaternionsFlat(J,Q,$,Z,W,K){let H=$[Z],Y=$[Z+1],X=$[Z+2],U=$[Z+3],E=W[K],N=W[K+1],G=W[K+2],F=W[K+3];return J[Q]=H*F+U*E+Y*G-X*N,J[Q+1]=Y*F+U*N+X*E-H*G,J[Q+2]=X*F+U*G+H*N-Y*E,J[Q+3]=U*F-H*E-Y*N-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:K}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(Z/2),E=H(W/2),N=Y($/2),G=Y(Z/2),F=Y(W/2);switch(K){case"XYZ":this._x=N*U*E+X*G*F,this._y=X*G*E-N*U*F,this._z=X*U*F+N*G*E,this._w=X*U*E-N*G*F;break;case"YXZ":this._x=N*U*E+X*G*F,this._y=X*G*E-N*U*F,this._z=X*U*F-N*G*E,this._w=X*U*E+N*G*F;break;case"ZXY":this._x=N*U*E-X*G*F,this._y=X*G*E+N*U*F,this._z=X*U*F+N*G*E,this._w=X*U*E-N*G*F;break;case"ZYX":this._x=N*U*E-X*G*F,this._y=X*G*E+N*U*F,this._z=X*U*F-N*G*E,this._w=X*U*E+N*G*F;break;case"YZX":this._x=N*U*E+X*G*F,this._y=X*G*E+N*U*F,this._z=X*U*F-N*G*E,this._w=X*U*E-N*G*F;break;case"XZY":this._x=N*U*E-X*G*F,this._y=X*G*E-N*U*F,this._z=X*U*F+N*G*E,this._w=X*U*E+N*G*F;break;default:C0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],K=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],E=Q[10],N=$+H+E;if(N>0){let G=0.5/Math.sqrt(N+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(W-X)*G,this._z=(K-Z)*G}else if($>H&&$>E){let G=2*Math.sqrt(1+$-H-E);this._w=(U-Y)/G,this._x=0.25*G,this._y=(Z+K)/G,this._z=(W+X)/G}else if(H>E){let G=2*Math.sqrt(1+H-$-E);this._w=(W-X)/G,this._x=(Z+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+E-$-H);this._w=(K-Z)/G,this._x=(W+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(m0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+K*H+Z*X-W*Y,this._y=Z*U+K*Y+W*H-$*X,this._z=W*U+K*X+$*Y-Z*H,this._w=K*U-$*H-Z*Y-W*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=this.dot(J);if(H<0)$=-$,Z=-Z,W=-W,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class y{static{y.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion($Z.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion($Z.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,K=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*K,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*K,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*Z-H*$),U=2*(H*Q-W*Z),E=2*(W*$-K*Q);return this.x=Q+Y*X+K*E-H*U,this.y=$+Y*U+H*X-W*E,this.z=Z+Y*E+W*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=m0(this.x,J.x,Q.x),this.y=m0(this.y,J.y,Q.y),this.z=m0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=m0(this.x,J,Q),this.y=m0(this.y,J,Q),this.z=m0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(m0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=Z*Y-W*H,this.y=W*K-$*Y,this.z=$*H-Z*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return VJ.copy(this).projectOnVector(J),this.sub(VJ)}reflect(J){return this.sub(VJ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(m0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var VJ=new y,$Z=new M9;class w0{static{w0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,X)}set(J,Q,$,Z,W,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=H,U[3]=Q,U[4]=W,U[5]=Y,U[6]=$,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],E=$[7],N=$[2],G=$[5],F=$[8],R=Z[0],z=Z[3],D=Z[6],q=Z[1],_=Z[4],A=Z[7],L=Z[2],I=Z[5],C=Z[8];return W[0]=K*R+H*q+Y*L,W[3]=K*z+H*_+Y*I,W[6]=K*D+H*A+Y*C,W[1]=X*R+U*q+E*L,W[4]=X*z+U*_+E*I,W[7]=X*D+U*A+E*C,W[2]=N*R+G*q+F*L,W[5]=N*z+G*_+F*I,W[8]=N*D+G*A+F*C,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*K*U-Q*H*X-$*W*U+$*H*Y+Z*W*X-Z*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=U*K-H*X,N=H*Y-U*W,G=X*W-K*Y,F=Q*E+$*N+Z*G;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let R=1/F;return J[0]=E*R,J[1]=(Z*X-U*$)*R,J[2]=(H*$-Z*K)*R,J[3]=N*R,J[4]=(U*Q-Z*Y)*R,J[5]=(Z*W-H*Q)*R,J[6]=G*R,J[7]=($*Y-X*Q)*R,J[8]=(K*Q-$*W)*R,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,K,H){let Y=Math.cos(W),X=Math.sin(W);return this.set($*Y,$*X,-$*(Y*K+X*H)+K+J,-Z*X,Z*Y,-Z*(-X*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return g9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(BJ.makeScale(J,Q)),this}rotate(J){return g9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(BJ.makeRotation(-J)),this}translate(J,Q){return g9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(BJ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var BJ=new w0,ZZ=new w0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),WZ=new w0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function oK(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,K,H){if(this.enabled===!1||K===H||!K||!H)return W;if(this.spaces[K].transfer==="srgb")W.r=q9(W.r),W.g=q9(W.g),W.b=q9(W.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)W.applyMatrix3(this.spaces[K].toXYZ),W.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")W.r=O6(W.r),W.g=O6(W.g),W.b=O6(W.b);return W},workingToColorSpace:function(W,K){return this.convert(W,this.workingColorSpace,K)},colorSpaceToWorking:function(W,K){return this.convert(W,K,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,K=this.workingColorSpace){return W.fromArray(this.spaces[K].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,K,H){return W.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,K){return g9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,K)},toWorkingColorSpace:function(W,K){return g9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:ZZ,fromXYZ:WZ,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:ZZ,fromXYZ:WZ,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var g0=oK();function q9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function O6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var Z6;class cQ{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(Z6===void 0)Z6=y6("canvas");Z6.width=J.width,Z6.height=J.height;let Z=Z6.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=Z6}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=y6("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let K=0;K<W.length;K++)W[K]=q9(W[K]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(q9(Q[$]/255)*255);else Q[$]=q9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return C0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var aK=0;class l6{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:aK++}),this.uuid=m6(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let K=0,H=Z.length;K<H;K++)if(Z[K].isDataTexture)W.push(zJ(Z[K].image));else W.push(zJ(Z[K]))}else W=zJ(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function zJ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return cQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return C0("Texture: Unable to serialize Texture."),{}}var rK=0,IJ=new y;class z8 extends O9{constructor(J=z8.DEFAULT_IMAGE,Q=z8.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,K=1008,H=1023,Y=1009,X=z8.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:rK++}),this.uuid=m6(),this.name="",this.source=new l6(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new n0(0,0),this.repeat=new n0(1,1),this.center=new n0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new w0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(IJ).x}get height(){return this.source.getSize(IJ).y}get depth(){return this.source.getSize(IJ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){C0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){C0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}z8.DEFAULT_IMAGE=null;z8.DEFAULT_MAPPING=300;z8.DEFAULT_ANISOTROPY=1;class K8{static{K8.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z+K[12]*W,this.y=K[1]*Q+K[5]*$+K[9]*Z+K[13]*W,this.z=K[2]*Q+K[6]*$+K[10]*Z+K[14]*W,this.w=K[3]*Q+K[7]*$+K[11]*Z+K[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],E=Y[8],N=Y[1],G=Y[5],F=Y[9],R=Y[2],z=Y[6],D=Y[10];if(Math.abs(U-N)<0.01&&Math.abs(E-R)<0.01&&Math.abs(F-z)<0.01){if(Math.abs(U+N)<0.1&&Math.abs(E+R)<0.1&&Math.abs(F+z)<0.1&&Math.abs(X+G+D-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let _=(X+1)/2,A=(G+1)/2,L=(D+1)/2,I=(U+N)/4,C=(E+R)/4,w=(F+z)/4;if(_>A&&_>L)if(_<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(_),Z=I/$,W=C/$;else if(A>L)if(A<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(A),$=I/Z,W=w/Z;else if(L<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(L),$=C/W,Z=w/W;return this.set($,Z,W,Q),this}let q=Math.sqrt((z-F)*(z-F)+(E-R)*(E-R)+(N-U)*(N-U));if(Math.abs(q)<0.001)q=1;return this.x=(z-F)/q,this.y=(E-R)/q,this.z=(N-U)/q,this.w=Math.acos((X+G+D-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=m0(this.x,J.x,Q.x),this.y=m0(this.y,J.y,Q.y),this.z=m0(this.z,J.z,Q.z),this.w=m0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=m0(this.x,J,Q),this.y=m0(this.y,J,Q),this.z=m0(this.z,J,Q),this.w=m0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(m0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nQ extends O9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new K8(0,0,J,Q),this.scissorTest=!1,this.viewport=new K8(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new z8(Z),K=$.count;for(let H=0;H<K;H++)this.textures[H]=W.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new l6(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class c8 extends nQ{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class l7 extends z8{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class sQ extends z8{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class W8{static{W8.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,K,H,Y,X,U,E,N,G,F,R,z){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,X,U,E,N,G,F,R,z)}set(J,Q,$,Z,W,K,H,Y,X,U,E,N,G,F,R,z){let D=this.elements;return D[0]=J,D[4]=Q,D[8]=$,D[12]=Z,D[1]=W,D[5]=K,D[9]=H,D[13]=Y,D[2]=X,D[6]=U,D[10]=E,D[14]=N,D[3]=G,D[7]=F,D[11]=R,D[15]=z,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new W8().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/W6.setFromMatrixColumn(J,0).length(),W=1/W6.setFromMatrixColumn(J,1).length(),K=1/W6.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(Z),X=Math.sin(Z),U=Math.cos(W),E=Math.sin(W);if(J.order==="XYZ"){let N=K*U,G=K*E,F=H*U,R=H*E;Q[0]=Y*U,Q[4]=-Y*E,Q[8]=X,Q[1]=G+F*X,Q[5]=N-R*X,Q[9]=-H*Y,Q[2]=R-N*X,Q[6]=F+G*X,Q[10]=K*Y}else if(J.order==="YXZ"){let N=Y*U,G=Y*E,F=X*U,R=X*E;Q[0]=N+R*H,Q[4]=F*H-G,Q[8]=K*X,Q[1]=K*E,Q[5]=K*U,Q[9]=-H,Q[2]=G*H-F,Q[6]=R+N*H,Q[10]=K*Y}else if(J.order==="ZXY"){let N=Y*U,G=Y*E,F=X*U,R=X*E;Q[0]=N-R*H,Q[4]=-K*E,Q[8]=F+G*H,Q[1]=G+F*H,Q[5]=K*U,Q[9]=R-N*H,Q[2]=-K*X,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let N=K*U,G=K*E,F=H*U,R=H*E;Q[0]=Y*U,Q[4]=F*X-G,Q[8]=N*X+R,Q[1]=Y*E,Q[5]=R*X+N,Q[9]=G*X-F,Q[2]=-X,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let N=K*Y,G=K*X,F=H*Y,R=H*X;Q[0]=Y*U,Q[4]=R-N*E,Q[8]=F*E+G,Q[1]=E,Q[5]=K*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*E+F,Q[10]=N-R*E}else if(J.order==="XZY"){let N=K*Y,G=K*X,F=H*Y,R=H*X;Q[0]=Y*U,Q[4]=-E,Q[8]=X*U,Q[1]=N*E+R,Q[5]=K*U,Q[9]=G*E-F,Q[2]=F*E-G,Q[6]=H*U,Q[10]=R*E+N}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(tK,J,eK)}lookAt(J,Q,$){let Z=this.elements;if(v8.subVectors(J,Q),v8.lengthSq()===0)v8.z=1;if(v8.normalize(),V9.crossVectors($,v8),V9.lengthSq()===0){if(Math.abs($.z)===1)v8.x+=0.0001;else v8.z+=0.0001;v8.normalize(),V9.crossVectors($,v8)}return V9.normalize(),J7.crossVectors(v8,V9),Z[0]=V9.x,Z[4]=J7.x,Z[8]=v8.x,Z[1]=V9.y,Z[5]=J7.y,Z[9]=v8.y,Z[2]=V9.z,Z[6]=J7.z,Z[10]=v8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],E=$[5],N=$[9],G=$[13],F=$[2],R=$[6],z=$[10],D=$[14],q=$[3],_=$[7],A=$[11],L=$[15],I=Z[0],C=Z[4],w=Z[8],M=Z[12],B=Z[1],d=Z[5],P=Z[9],h=Z[13],o=Z[2],g=Z[6],c=Z[10],p=Z[14],f=Z[3],a=Z[7],e=Z[11],J0=Z[15];return W[0]=K*I+H*B+Y*o+X*f,W[4]=K*C+H*d+Y*g+X*a,W[8]=K*w+H*P+Y*c+X*e,W[12]=K*M+H*h+Y*p+X*J0,W[1]=U*I+E*B+N*o+G*f,W[5]=U*C+E*d+N*g+G*a,W[9]=U*w+E*P+N*c+G*e,W[13]=U*M+E*h+N*p+G*J0,W[2]=F*I+R*B+z*o+D*f,W[6]=F*C+R*d+z*g+D*a,W[10]=F*w+R*P+z*c+D*e,W[14]=F*M+R*h+z*p+D*J0,W[3]=q*I+_*B+A*o+L*f,W[7]=q*C+_*d+A*g+L*a,W[11]=q*w+_*P+A*c+L*e,W[15]=q*M+_*h+A*p+L*J0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],E=J[6],N=J[10],G=J[14],F=J[3],R=J[7],z=J[11],D=J[15],q=Y*G-X*N,_=H*G-X*E,A=H*N-Y*E,L=K*G-X*U,I=K*N-Y*U,C=K*E-H*U;return Q*(R*q-z*_+D*A)-$*(F*q-z*L+D*I)+Z*(F*_-R*L+D*C)-W*(F*A-R*I+z*C)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(K*U-H*X)-$*(W*U-H*Y)+Z*(W*X-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=J[9],N=J[10],G=J[11],F=J[12],R=J[13],z=J[14],D=J[15],q=Q*H-$*K,_=Q*Y-Z*K,A=Q*X-W*K,L=$*Y-Z*H,I=$*X-W*H,C=Z*X-W*Y,w=U*R-E*F,M=U*z-N*F,B=U*D-G*F,d=E*z-N*R,P=E*D-G*R,h=N*D-G*z,o=q*h-_*P+A*d+L*B-I*M+C*w;if(o===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let g=1/o;return J[0]=(H*h-Y*P+X*d)*g,J[1]=(Z*P-$*h-W*d)*g,J[2]=(R*C-z*I+D*L)*g,J[3]=(N*I-E*C-G*L)*g,J[4]=(Y*B-K*h-X*M)*g,J[5]=(Q*h-Z*B+W*M)*g,J[6]=(z*A-F*C-D*_)*g,J[7]=(U*C-N*A+G*_)*g,J[8]=(K*P-H*B+X*w)*g,J[9]=($*B-Q*P-W*w)*g,J[10]=(F*I-R*A+D*q)*g,J[11]=(E*A-U*I-G*q)*g,J[12]=(H*M-K*d-Y*w)*g,J[13]=(Q*d-$*M+Z*w)*g,J[14]=(R*_-F*L-z*q)*g,J[15]=(U*L-E*_+N*q)*g,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,K=J.x,H=J.y,Y=J.z,X=W*K,U=W*H;return this.set(X*K+$,X*H-Z*Y,X*Y+Z*H,0,X*H+Z*Y,U*H+$,U*Y-Z*K,0,X*Y-Z*H,U*Y+Z*K,W*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,K){return this.set(1,$,W,0,J,1,K,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,K=Q._y,H=Q._z,Y=Q._w,X=W+W,U=K+K,E=H+H,N=W*X,G=W*U,F=W*E,R=K*U,z=K*E,D=H*E,q=Y*X,_=Y*U,A=Y*E,L=$.x,I=$.y,C=$.z;return Z[0]=(1-(R+D))*L,Z[1]=(G+A)*L,Z[2]=(F-_)*L,Z[3]=0,Z[4]=(G-A)*I,Z[5]=(1-(N+D))*I,Z[6]=(z+q)*I,Z[7]=0,Z[8]=(F+_)*C,Z[9]=(z-q)*C,Z[10]=(1-(N+R))*C,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinantAffine();if(W===0)return $.set(1,1,1),Q.identity(),this;let K=W6.set(Z[0],Z[1],Z[2]).length(),H=W6.set(Z[4],Z[5],Z[6]).length(),Y=W6.set(Z[8],Z[9],Z[10]).length();if(W<0)K=-K;s8.copy(this);let X=1/K,U=1/H,E=1/Y;return s8.elements[0]*=X,s8.elements[1]*=X,s8.elements[2]*=X,s8.elements[4]*=U,s8.elements[5]*=U,s8.elements[6]*=U,s8.elements[8]*=E,s8.elements[9]*=E,s8.elements[10]*=E,Q.setFromRotationMatrix(s8),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,Z,W,K,H=2000,Y=!1){let X=this.elements,U=2*W/(Q-J),E=2*W/($-Z),N=(Q+J)/(Q-J),G=($+Z)/($-Z),F,R;if(Y)F=W/(K-W),R=K*W/(K-W);else if(H===2000)F=-(K+W)/(K-W),R=-2*K*W/(K-W);else if(H===2001)F=-K/(K-W),R=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=N,X[12]=0,X[1]=0,X[5]=E,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=R,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,Z,W,K,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),E=2/($-Z),N=-(Q+J)/(Q-J),G=-($+Z)/($-Z),F,R;if(Y)F=1/(K-W),R=K/(K-W);else if(H===2000)F=-2/(K-W),R=-(K+W)/(K-W);else if(H===2001)F=-1/(K-W),R=-W/(K-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=N,X[1]=0,X[5]=E,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=F,X[14]=R,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var W6=new y,s8=new W8,tK=new y(0,0,0),eK=new y(1,1,1),V9=new y,J7=new y,v8=new y,KZ=new W8,HZ=new M9;class A9{constructor(J=0,Q=0,$=0,Z=A9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],K=Z[4],H=Z[8],Y=Z[1],X=Z[5],U=Z[9],E=Z[2],N=Z[6],G=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(m0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,W);else this._x=Math.atan2(N,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-m0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-E,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(m0(N,-1,1)),Math.abs(N)<0.9999999)this._y=Math.atan2(-E,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,W);break;case"ZYX":if(this._y=Math.asin(-m0(E,-1,1)),Math.abs(E)<0.9999999)this._x=Math.atan2(N,G),this._z=Math.atan2(Y,W);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(m0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-E,W);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-m0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(N,X),this._y=Math.atan2(H,W);else this._x=Math.atan2(-U,G),this._y=0;break;default:C0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return KZ.makeRotationFromQuaternion(J),this.setFromRotationMatrix(KZ,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return HZ.setFromEuler(this),this.setFromQuaternion(HZ,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}A9.DEFAULT_ORDER="XYZ";class d7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var JH=0,YZ=new y,K6=new M9,Y9=new W8,Q7=new y,T6=new y,QH=new y,$H=new M9,XZ=new y(1,0,0),UZ=new y(0,1,0),GZ=new y(0,0,1),NZ={type:"added"},ZH={type:"removed"},H6={type:"childadded",child:null},_J={type:"childremoved",child:null};class I8 extends O9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:JH++}),this.uuid=m6(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=I8.DEFAULT_UP.clone();let J=new y,Q=new A9,$=new M9,Z=new y(1,1,1);function W(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new W8},normalMatrix:{value:new w0}}),this.matrix=new W8,this.matrixWorld=new W8,this.matrixAutoUpdate=I8.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=I8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new d7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return K6.setFromAxisAngle(J,Q),this.quaternion.multiply(K6),this}rotateOnWorldAxis(J,Q){return K6.setFromAxisAngle(J,Q),this.quaternion.premultiply(K6),this}rotateX(J){return this.rotateOnAxis(XZ,J)}rotateY(J){return this.rotateOnAxis(UZ,J)}rotateZ(J){return this.rotateOnAxis(GZ,J)}translateOnAxis(J,Q){return YZ.copy(J).applyQuaternion(this.quaternion),this.position.add(YZ.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(XZ,J)}translateY(J){return this.translateOnAxis(UZ,J)}translateZ(J){return this.translateOnAxis(GZ,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(Y9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)Q7.copy(J);else Q7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),T6.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)Y9.lookAt(T6,Q7,this.up);else Y9.lookAt(Q7,T6,this.up);if(this.quaternion.setFromRotationMatrix(Y9),Z)Y9.extractRotation(Z.matrixWorld),K6.setFromRotationMatrix(Y9),this.quaternion.premultiply(K6.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return P0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(NZ),H6.child=J,this.dispatchEvent(H6),H6.child=null;else P0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(ZH),_J.child=J,this.dispatchEvent(_J),_J.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),Y9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),Y9.multiply(J.parent.matrixWorld);return J.applyMatrix4(Y9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(NZ),H6.child=J,this.dispatchEvent(H6),H6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(T6,J,QH),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(T6,$H,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let W=this.children;for(let K=0,H=W.length;K<H;K++)W[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let E=Y[X];W(J.shapes,E)}else W(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(W(J.materials,this.material[Y]));Z.material=H}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];Z.animations.push(W(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),E=K(J.shapes),N=K(J.skeletons),G=K(J.animations),F=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(E.length>0)$.shapes=E;if(N.length>0)$.skeletons=N;if(G.length>0)$.animations=G;if(F.length>0)$.nodes=F}return $.object=Z,$;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}}I8.DEFAULT_UP=new y(0,1,0);I8.DEFAULT_MATRIX_AUTO_UPDATE=!0;I8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class D6 extends I8{constructor(){super();this.isGroup=!0,this.type="Group"}}var WH={type:"move"};class d6{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new D6,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new D6,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new y;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new D6,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new y,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let R of J.hand.values()){let z=Q.getJointPose(R,$),D=this._getHandJoint(X,R);if(z!==null)D.matrix.fromArray(z.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=z.radius;D.visible=z!==null}let U=X.joints["index-finger-tip"],E=X.joints["thumb-tip"],N=U.position.distanceTo(E.position),G=0.02,F=0.005;if(X.inputState.pinching&&N>G+F)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&N<=G-F)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(Y.matrix.fromArray(W.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,W.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(W.linearVelocity);else Y.hasLinearVelocity=!1;if(W.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(W.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(WH)}}}if(H!==null)H.visible=Z!==null;if(Y!==null)Y.visible=W!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new D6;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var IW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},B9={h:0,s:0,l:0},$7={h:0,s:0,l:0};function CJ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class p0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,g0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=g0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,g0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=g0.workingColorSpace){if(J=iK(J,1),Q=m0(Q,0,1),$=m0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-W;this.r=CJ(K,W,J+0.3333333333333333),this.g=CJ(K,W,J),this.b=CJ(K,W,J-0.3333333333333333)}return g0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)C0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Z[1],H=Z[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:C0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(W,16),Q);else C0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=IW[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else C0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=q9(J.r),this.g=q9(J.g),this.b=q9(J.b),this}copyLinearToSRGB(J){return this.r=O6(J.r),this.g=O6(J.g),this.b=O6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return g0.workingToColorSpace(B8.copy(this),J),Math.round(m0(B8.r*255,0,255))*65536+Math.round(m0(B8.g*255,0,255))*256+Math.round(m0(B8.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=g0.workingColorSpace){g0.workingToColorSpace(B8.copy(this),Q);let{r:$,g:Z,b:W}=B8,K=Math.max($,Z,W),H=Math.min($,Z,W),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let E=K-H;switch(X=U<=0.5?E/(K+H):E/(2-K-H),K){case $:Y=(Z-W)/E+(Z<W?6:0);break;case Z:Y=(W-$)/E+2;break;case W:Y=($-Z)/E+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=g0.workingColorSpace){return g0.workingToColorSpace(B8.copy(this),Q),J.r=B8.r,J.g=B8.g,J.b=B8.b,J}getStyle(J="srgb"){g0.workingToColorSpace(B8.copy(this),J);let{r:Q,g:$,b:Z}=B8;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(B9),this.setHSL(B9.h+J,B9.s+Q,B9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(B9),J.getHSL($7);let $=LJ(B9.h,$7.h,Q),Z=LJ(B9.s,$7.s,Q),W=LJ(B9.l,$7.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var B8=new p0;p0.NAMES=IW;class u7 extends I8{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new A9,this.environmentIntensity=1,this.environmentRotation=new A9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var i8=new y,X9=new y,AJ=new y,U9=new y,Y6=new y,X6=new y,EZ=new y,PJ=new y,wJ=new y,TJ=new y,SJ=new K8,jJ=new K8,vJ=new K8;class u8{constructor(J=new y,Q=new y,$=new y){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),i8.subVectors(J,Q),Z.cross(i8);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){i8.subVectors(Z,Q),X9.subVectors($,Q),AJ.subVectors(J,Q);let K=i8.dot(i8),H=i8.dot(X9),Y=i8.dot(AJ),X=X9.dot(X9),U=X9.dot(AJ),E=K*X-H*H;if(E===0)return W.set(0,0,0),null;let N=1/E,G=(X*Y-H*U)*N,F=(K*U-H*Y)*N;return W.set(1-G-F,F,G)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,U9)===null)return!1;return U9.x>=0&&U9.y>=0&&U9.x+U9.y<=1}static getInterpolation(J,Q,$,Z,W,K,H,Y){if(this.getBarycoord(J,Q,$,Z,U9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(W,U9.x),Y.addScaledVector(K,U9.y),Y.addScaledVector(H,U9.z),Y}static getInterpolatedAttribute(J,Q,$,Z,W,K){return SJ.setScalar(0),jJ.setScalar(0),vJ.setScalar(0),SJ.fromBufferAttribute(J,Q),jJ.fromBufferAttribute(J,$),vJ.fromBufferAttribute(J,Z),K.setScalar(0),K.addScaledVector(SJ,W.x),K.addScaledVector(jJ,W.y),K.addScaledVector(vJ,W.z),K}static isFrontFacing(J,Q,$,Z){return i8.subVectors($,Q),X9.subVectors(J,Q),i8.cross(X9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return i8.subVectors(this.c,this.b),X9.subVectors(this.a,this.b),i8.cross(X9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return u8.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return u8.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return u8.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return u8.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return u8.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,K,H;Y6.subVectors(Z,$),X6.subVectors(W,$),PJ.subVectors(J,$);let Y=Y6.dot(PJ),X=X6.dot(PJ);if(Y<=0&&X<=0)return Q.copy($);wJ.subVectors(J,Z);let U=Y6.dot(wJ),E=X6.dot(wJ);if(U>=0&&E<=U)return Q.copy(Z);let N=Y*E-U*X;if(N<=0&&Y>=0&&U<=0)return K=Y/(Y-U),Q.copy($).addScaledVector(Y6,K);TJ.subVectors(J,W);let G=Y6.dot(TJ),F=X6.dot(TJ);if(F>=0&&G<=F)return Q.copy(W);let R=G*X-Y*F;if(R<=0&&X>=0&&F<=0)return H=X/(X-F),Q.copy($).addScaledVector(X6,H);let z=U*F-G*E;if(z<=0&&E-U>=0&&G-F>=0)return EZ.subVectors(W,Z),H=(E-U)/(E-U+(G-F)),Q.copy(Z).addScaledVector(EZ,H);let D=1/(z+R+N);return K=R*D,H=N*D,Q.copy($).addScaledVector(Y6,K).addScaledVector(X6,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class n9{constructor(J=new y(1/0,1/0,1/0),Q=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(o8.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(o8.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=o8.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=W.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,o8);else o8.fromBufferAttribute(W,K);o8.applyMatrix4(J.matrixWorld),this.expandByPoint(o8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();Z7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();Z7.copy($.boundingBox)}Z7.applyMatrix4(J.matrixWorld),this.union(Z7)}}let Z=J.children;for(let W=0,K=Z.length;W<K;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,o8),o8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(S6),W7.subVectors(this.max,S6),U6.subVectors(J.a,S6),G6.subVectors(J.b,S6),N6.subVectors(J.c,S6),z9.subVectors(G6,U6),I9.subVectors(N6,G6),y9.subVectors(U6,N6);let Q=[0,-z9.z,z9.y,0,-I9.z,I9.y,0,-y9.z,y9.y,z9.z,0,-z9.x,I9.z,0,-I9.x,y9.z,0,-y9.x,-z9.y,z9.x,0,-I9.y,I9.x,0,-y9.y,y9.x,0];if(!fJ(Q,U6,G6,N6,W7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!fJ(Q,U6,G6,N6,W7))return!1;return K7.crossVectors(z9,I9),Q=[K7.x,K7.y,K7.z],fJ(Q,U6,G6,N6,W7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,o8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(o8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return G9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),G9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),G9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),G9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),G9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),G9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),G9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),G9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(G9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var G9=[new y,new y,new y,new y,new y,new y,new y,new y],o8=new y,Z7=new n9,U6=new y,G6=new y,N6=new y,z9=new y,I9=new y,y9=new y,S6=new y,W7=new y,K7=new y,b9=new y;function fJ(J,Q,$,Z,W){for(let K=0,H=J.length-3;K<=H;K+=3){b9.fromArray(J,K);let Y=W.x*Math.abs(b9.x)+W.y*Math.abs(b9.y)+W.z*Math.abs(b9.z),X=Q.dot(b9),U=$.dot(b9),E=Z.dot(b9);if(Math.max(-Math.max(X,U,E),Math.min(X,U,E))>Y)return!1}return!0}var N8=new y,H7=new n0,KH=0;class R8 extends O9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:KH++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)H7.fromBufferAttribute(this,Q),H7.applyMatrix3(J),this.setXY(Q,H7.x,H7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyMatrix3(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyMatrix4(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyNormalMatrix(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.transformDirection(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=w6($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=P8($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=w6(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=w6(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=w6(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=w6(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=P8(Q,this.array),$=P8($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=P8(Q,this.array),$=P8($,this.array),Z=P8(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=P8(Q,this.array),$=P8($,this.array),Z=P8(Z,this.array),W=P8(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class c7 extends R8{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class n7 extends R8{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class b8 extends R8{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var HH=new n9,j6=new y,yJ=new y;class s9{constructor(J=new y,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else HH.setFromPoints(J).getCenter($);let Z=0;for(let W=0,K=J.length;W<K;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;j6.subVectors(J,this.center);let Q=j6.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(j6,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else yJ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(j6.copy(J.center).add(yJ)),this.expandByPoint(j6.copy(J.center).sub(yJ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var YH=0,d8=new W8,bJ=new I8,E6=new y,f8=new n9,v6=new n9,M8=new y;class C8 extends O9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:YH++}),this.uuid=m6(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((nK(J))?n7:c7)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new w0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return d8.makeRotationFromQuaternion(J),this.applyMatrix4(d8),this}rotateX(J){return d8.makeRotationX(J),this.applyMatrix4(d8),this}rotateY(J){return d8.makeRotationY(J),this.applyMatrix4(d8),this}rotateZ(J){return d8.makeRotationZ(J),this.applyMatrix4(d8),this}translate(J,Q,$){return d8.makeTranslation(J,Q,$),this.applyMatrix4(d8),this}scale(J,Q,$){return d8.makeScale(J,Q,$),this.applyMatrix4(d8),this}lookAt(J){return bJ.lookAt(J),bJ.updateMatrix(),this.applyMatrix4(bJ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(E6).negate(),this.translate(E6.x,E6.y,E6.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new b8($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)C0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new n9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(f8.setFromBufferAttribute(W),this.morphTargetsRelative)M8.addVectors(this.boundingBox.min,f8.min),this.boundingBox.expandByPoint(M8),M8.addVectors(this.boundingBox.max,f8.max),this.boundingBox.expandByPoint(M8);else this.boundingBox.expandByPoint(f8.min),this.boundingBox.expandByPoint(f8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))P0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new s9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(J){let $=this.boundingSphere.center;if(f8.setFromBufferAttribute(J),Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W];if(v6.setFromBufferAttribute(H),this.morphTargetsRelative)M8.addVectors(f8.min,v6.min),f8.expandByPoint(M8),M8.addVectors(f8.max,v6.max),f8.expandByPoint(M8);else f8.expandByPoint(v6.min),f8.expandByPoint(v6.max)}f8.getCenter($);let Z=0;for(let W=0,K=J.count;W<K;W++)M8.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(M8));if(Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(M8.fromBufferAttribute(H,X),Y)E6.fromBufferAttribute(J,X),M8.add(E6);Z=Math.max(Z,$.distanceToSquared(M8))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))P0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){P0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new R8(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let w=0;w<$.count;w++)H[w]=new y,Y[w]=new y;let X=new y,U=new y,E=new y,N=new n0,G=new n0,F=new n0,R=new y,z=new y;function D(w,M,B){X.fromBufferAttribute($,w),U.fromBufferAttribute($,M),E.fromBufferAttribute($,B),N.fromBufferAttribute(W,w),G.fromBufferAttribute(W,M),F.fromBufferAttribute(W,B),U.sub(X),E.sub(X),G.sub(N),F.sub(N);let d=1/(G.x*F.y-F.x*G.y);if(!isFinite(d))return;R.copy(U).multiplyScalar(F.y).addScaledVector(E,-G.y).multiplyScalar(d),z.copy(E).multiplyScalar(G.x).addScaledVector(U,-F.x).multiplyScalar(d),H[w].add(R),H[M].add(R),H[B].add(R),Y[w].add(z),Y[M].add(z),Y[B].add(z)}let q=this.groups;if(q.length===0)q=[{start:0,count:J.count}];for(let w=0,M=q.length;w<M;++w){let B=q[w],d=B.start,P=B.count;for(let h=d,o=d+P;h<o;h+=3)D(J.getX(h+0),J.getX(h+1),J.getX(h+2))}let _=new y,A=new y,L=new y,I=new y;function C(w){L.fromBufferAttribute(Z,w),I.copy(L);let M=H[w];_.copy(M),_.sub(L.multiplyScalar(L.dot(M))).normalize(),A.crossVectors(I,M);let d=A.dot(Y[w])<0?-1:1;K.setXYZW(w,_.x,_.y,_.z,d)}for(let w=0,M=q.length;w<M;++w){let B=q[w],d=B.start,P=B.count;for(let h=d,o=d+P;h<o;h+=3)C(J.getX(h+0)),C(J.getX(h+1)),C(J.getX(h+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new R8(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let N=0,G=$.count;N<G;N++)$.setXYZ(N,0,0,0);let Z=new y,W=new y,K=new y,H=new y,Y=new y,X=new y,U=new y,E=new y;if(J)for(let N=0,G=J.count;N<G;N+=3){let F=J.getX(N+0),R=J.getX(N+1),z=J.getX(N+2);Z.fromBufferAttribute(Q,F),W.fromBufferAttribute(Q,R),K.fromBufferAttribute(Q,z),U.subVectors(K,W),E.subVectors(Z,W),U.cross(E),H.fromBufferAttribute($,F),Y.fromBufferAttribute($,R),X.fromBufferAttribute($,z),H.add(U),Y.add(U),X.add(U),$.setXYZ(F,H.x,H.y,H.z),$.setXYZ(R,Y.x,Y.y,Y.z),$.setXYZ(z,X.x,X.y,X.z)}else for(let N=0,G=Q.count;N<G;N+=3)Z.fromBufferAttribute(Q,N+0),W.fromBufferAttribute(Q,N+1),K.fromBufferAttribute(Q,N+2),U.subVectors(K,W),E.subVectors(Z,W),U.cross(E),$.setXYZ(N+0,U.x,U.y,U.z),$.setXYZ(N+1,U.x,U.y,U.z),$.setXYZ(N+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)M8.fromBufferAttribute(J,Q),M8.normalize(),J.setXYZ(Q,M8.x,M8.y,M8.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:E}=H,N=new X.constructor(Y.length*U),G=0,F=0;for(let R=0,z=Y.length;R<z;R++){if(H.isInterleavedBufferAttribute)G=Y[R]*H.data.stride+H.offset;else G=Y[R]*U;for(let D=0;D<U;D++)N[F++]=X[G++]}return new R8(N,U,E)}if(this.index===null)return C0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new C8,$=this.index.array,Z=this.attributes;for(let H in Z){let Y=Z[H],X=J(Y,$);Q.setAttribute(H,X)}let W=this.morphAttributes;for(let H in W){let Y=[],X=W[H];for(let U=0,E=X.length;U<E;U++){let N=X[U],G=J(N,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let Z={},W=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let E=0,N=X.length;E<N;E++){let G=X[E];U.push(G.toJSON(J.data))}if(U.length>0)Z[Y]=U,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let X in Z){let U=Z[X];this.setAttribute(X,U.clone(Q))}let W=J.morphAttributes;for(let X in W){let U=[],E=W[X];for(let N=0,G=E.length;N<G;N++)U.push(E[N].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let E=K[X];this.addGroup(E.start,E.count,E.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var XH=0;class T9 extends O9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:XH++}),this.uuid=m6(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new p0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){C0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){C0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let K=[];for(let H in W){let Y=W[H];delete Y.metadata,K.push(Y)}return K}if(Q){let W=Z(J.textures),K=Z(J.images);if(W.length>0)$.textures=W;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new p0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new n0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new n0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var N9=new y,hJ=new y,Y7=new y,_9=new y,xJ=new y,X7=new y,gJ=new y;class u6{constructor(J=new y,Q=new y(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,N9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=N9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return N9.copy(this.origin).addScaledVector(this.direction,Q),N9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){hJ.copy(J).add(Q).multiplyScalar(0.5),Y7.copy(Q).sub(J).normalize(),_9.copy(this.origin).sub(hJ);let W=J.distanceTo(Q)*0.5,K=-this.direction.dot(Y7),H=_9.dot(this.direction),Y=-_9.dot(Y7),X=_9.lengthSq(),U=Math.abs(1-K*K),E,N,G,F;if(U>0)if(E=K*Y-H,N=K*H-Y,F=W*U,E>=0)if(N>=-F)if(N<=F){let R=1/U;E*=R,N*=R,G=E*(E+K*N+2*H)+N*(K*E+N+2*Y)+X}else N=W,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;else N=-W,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;else if(N<=-F)E=Math.max(0,-(-K*W+H)),N=E>0?-W:Math.min(Math.max(-W,-Y),W),G=-E*E+N*(N+2*Y)+X;else if(N<=F)E=0,N=Math.min(Math.max(-W,-Y),W),G=N*(N+2*Y)+X;else E=Math.max(0,-(K*W+H)),N=E>0?W:Math.min(Math.max(-W,-Y),W),G=-E*E+N*(N+2*Y)+X;else N=K>0?-W:W,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,E);if(Z)Z.copy(hJ).addScaledVector(Y7,N);return G}intersectSphere(J,Q){N9.subVectors(J.center,this.origin);let $=N9.dot(this.direction),Z=N9.dot(N9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let K=Math.sqrt(W-Z),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,E=1/this.direction.z,N=this.origin;if(X>=0)$=(J.min.x-N.x)*X,Z=(J.max.x-N.x)*X;else $=(J.max.x-N.x)*X,Z=(J.min.x-N.x)*X;if(U>=0)W=(J.min.y-N.y)*U,K=(J.max.y-N.y)*U;else W=(J.max.y-N.y)*U,K=(J.min.y-N.y)*U;if($>K||W>Z)return null;if(W>$||isNaN($))$=W;if(K<Z||isNaN(Z))Z=K;if(E>=0)H=(J.min.z-N.z)*E,Y=(J.max.z-N.z)*E;else H=(J.max.z-N.z)*E,Y=(J.min.z-N.z)*E;if($>Y||H>Z)return null;if(H>$||$!==$)$=H;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,N9)!==null}intersectTriangle(J,Q,$,Z,W){xJ.subVectors(Q,J),X7.subVectors($,J),gJ.crossVectors(xJ,X7);let K=this.direction.dot(gJ),H;if(K>0){if(Z)return null;H=1}else if(K<0)H=-1,K=-K;else return null;_9.subVectors(this.origin,J);let Y=H*this.direction.dot(X7.crossVectors(_9,X7));if(Y<0)return null;let X=H*this.direction.dot(xJ.cross(_9));if(X<0)return null;if(Y+X>K)return null;let U=-H*_9.dot(gJ);if(U<0)return null;return this.at(U/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class s7 extends T9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new p0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new A9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var qZ=new W8,h9=new u6,U7=new s9,FZ=new y,G7=new y,N7=new y,E7=new y,pJ=new y,q7=new y,DZ=new y,F7=new y;class x8 extends I8{constructor(J=new C8,Q=new s7){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(W&&H){q7.set(0,0,0);for(let Y=0,X=W.length;Y<X;Y++){let U=H[Y],E=W[Y];if(U===0)continue;if(pJ.fromBufferAttribute(E,J),K)q7.addScaledVector(pJ,U);else q7.addScaledVector(pJ.sub(Q),U)}Q.add(q7)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(U7.copy($.boundingSphere),U7.applyMatrix4(W),h9.copy(J.ray).recast(J.near),U7.containsPoint(h9.origin)===!1){if(h9.intersectSphere(U7,FZ)===null)return;if(h9.origin.distanceToSquared(FZ)>(J.far-J.near)**2)return}if(qZ.copy(W).invert(),h9.copy(J.ray).applyMatrix4(qZ),$.boundingBox!==null){if(h9.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,h9)}_computeIntersections(J,Q,$){let Z,W=this.geometry,K=this.material,H=W.index,Y=W.attributes.position,X=W.attributes.uv,U=W.attributes.uv1,E=W.attributes.normal,N=W.groups,G=W.drawRange;if(H!==null)if(Array.isArray(K))for(let F=0,R=N.length;F<R;F++){let z=N[F],D=K[z.materialIndex],q=Math.max(z.start,G.start),_=Math.min(H.count,Math.min(z.start+z.count,G.start+G.count));for(let A=q,L=_;A<L;A+=3){let I=H.getX(A),C=H.getX(A+1),w=H.getX(A+2);if(Z=D7(this,D,J,$,X,U,E,I,C,w),Z)Z.faceIndex=Math.floor(A/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let F=Math.max(0,G.start),R=Math.min(H.count,G.start+G.count);for(let z=F,D=R;z<D;z+=3){let q=H.getX(z),_=H.getX(z+1),A=H.getX(z+2);if(Z=D7(this,K,J,$,X,U,E,q,_,A),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}else if(Y!==void 0)if(Array.isArray(K))for(let F=0,R=N.length;F<R;F++){let z=N[F],D=K[z.materialIndex],q=Math.max(z.start,G.start),_=Math.min(Y.count,Math.min(z.start+z.count,G.start+G.count));for(let A=q,L=_;A<L;A+=3){let I=A,C=A+1,w=A+2;if(Z=D7(this,D,J,$,X,U,E,I,C,w),Z)Z.faceIndex=Math.floor(A/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let F=Math.max(0,G.start),R=Math.min(Y.count,G.start+G.count);for(let z=F,D=R;z<D;z+=3){let q=z,_=z+1,A=z+2;if(Z=D7(this,K,J,$,X,U,E,q,_,A),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}}}function UH(J,Q,$,Z,W,K,H,Y){let X;if(Q.side===1)X=Z.intersectTriangle(H,K,W,!0,Y);else X=Z.intersectTriangle(W,K,H,Q.side===0,Y);if(X===null)return null;F7.copy(Y),F7.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(F7);if(U<$.near||U>$.far)return null;return{distance:U,point:F7.clone(),object:J}}function D7(J,Q,$,Z,W,K,H,Y,X,U){J.getVertexPosition(Y,G7),J.getVertexPosition(X,N7),J.getVertexPosition(U,E7);let E=UH(J,Q,$,Z,G7,N7,E7,DZ);if(E){let N=new y;if(u8.getBarycoord(DZ,G7,N7,E7,N),W)E.uv=u8.getInterpolatedAttribute(W,Y,X,U,N,new n0);if(K)E.uv1=u8.getInterpolatedAttribute(K,Y,X,U,N,new n0);if(H){if(E.normal=u8.getInterpolatedAttribute(H,Y,X,U,N,new y),E.normal.dot(Z.direction)>0)E.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new y,materialIndex:0};u8.getNormal(G7,N7,E7,G.normal),E.face=G,E.barycoord=N}return E}class c6 extends z8{constructor(J=null,Q=1,$=1,Z,W,K,H,Y,X=1003,U=1003,E,N){super(null,K,H,Y,X,U,Z,W,E,N);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class i7 extends R8{constructor(J,Q,$,Z=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var mJ=new y,GH=new y,NH=new w0;class E9{constructor(J=new y(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=mJ.subVectors($,Q).cross(GH.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(mJ),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||NH.getNormalMatrix(J),Z=this.coplanarPoint(mJ).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var x9=new s9,EH=new n0(0.5,0.5),O7=new y;class o7{constructor(J=new E9,Q=new E9,$=new E9,Z=new E9,W=new E9,K=new E9){this.planes=[J,Q,$,Z,W,K]}set(J,Q,$,Z,W,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(Z),H[4].copy(W),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,K=W[0],H=W[1],Y=W[2],X=W[3],U=W[4],E=W[5],N=W[6],G=W[7],F=W[8],R=W[9],z=W[10],D=W[11],q=W[12],_=W[13],A=W[14],L=W[15];if(Z[0].setComponents(X-K,G-U,D-F,L-q).normalize(),Z[1].setComponents(X+K,G+U,D+F,L+q).normalize(),Z[2].setComponents(X+H,G+E,D+R,L+_).normalize(),Z[3].setComponents(X-H,G-E,D-R,L-_).normalize(),$)Z[4].setComponents(Y,N,z,A).normalize(),Z[5].setComponents(X-Y,G-N,D-z,L-A).normalize();else if(Z[4].setComponents(X-Y,G-N,D-z,L-A).normalize(),Q===2000)Z[5].setComponents(X+Y,G+N,D+z,L+A).normalize();else if(Q===2001)Z[5].setComponents(Y,N,z,A).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();x9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();x9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(x9)}intersectsSprite(J){x9.center.set(0,0,0);let Q=EH.distanceTo(J.center);return x9.radius=0.7071067811865476+Q,x9.applyMatrix4(J.matrixWorld),this.intersectsSphere(x9)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(O7.x=Z.normal.x>0?J.max.x:J.min.x,O7.y=Z.normal.y>0?J.max.y:J.min.y,O7.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(O7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class iQ extends T9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new p0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var _7=new y,C7=new y,OZ=new W8,f6=new u6,M7=new s9,lJ=new y,MZ=new y;class oQ extends I8{constructor(J=new C8,Q=new iQ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,W=Q.count;Z<W;Z++)_7.fromBufferAttribute(Q,Z-1),C7.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=_7.distanceTo(C7);J.setAttribute("lineDistance",new b8($,1))}else C0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Line.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(M7.copy($.boundingSphere),M7.applyMatrix4(Z),M7.radius+=W,J.ray.intersectsSphere(M7)===!1)return;OZ.copy(Z).invert(),f6.copy(J.ray).applyMatrix4(OZ);let H=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,N=$.attributes.position;if(U!==null){let G=Math.max(0,K.start),F=Math.min(U.count,K.start+K.count);for(let R=G,z=F-1;R<z;R+=X){let D=U.getX(R),q=U.getX(R+1),_=R7(this,J,f6,Y,D,q,R);if(_)Q.push(_)}if(this.isLineLoop){let R=U.getX(F-1),z=U.getX(G),D=R7(this,J,f6,Y,R,z,F-1);if(D)Q.push(D)}}else{let G=Math.max(0,K.start),F=Math.min(N.count,K.start+K.count);for(let R=G,z=F-1;R<z;R+=X){let D=R7(this,J,f6,Y,R,R+1,R);if(D)Q.push(D)}if(this.isLineLoop){let R=R7(this,J,f6,Y,F-1,G,F-1);if(R)Q.push(R)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}}function R7(J,Q,$,Z,W,K,H){let Y=J.geometry.attributes.position;if(_7.fromBufferAttribute(Y,W),C7.fromBufferAttribute(Y,K),$.distanceSqToSegment(_7,C7,lJ,MZ)>Z)return;lJ.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(lJ);if(U<Q.near||U>Q.far)return;return{distance:U,point:MZ.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var RZ=new y,kZ=new y;class a7 extends oQ{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,W=Q.count;Z<W;Z+=2)RZ.fromBufferAttribute(Q,Z),kZ.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+RZ.distanceTo(kZ);J.setAttribute("lineDistance",new b8($,1))}else C0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class aQ extends T9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new p0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var LZ=new W8,dJ=new u6,k7=new s9,L7=new y;class r7 extends I8{constructor(J=new C8,Q=new aQ){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Points.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(k7.copy($.boundingSphere),k7.applyMatrix4(Z),k7.radius+=W,J.ray.intersectsSphere(k7)===!1)return;LZ.copy(Z).invert(),dJ.copy(J.ray).applyMatrix4(LZ);let H=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=$.index,E=$.attributes.position;if(X!==null){let N=Math.max(0,K.start),G=Math.min(X.count,K.start+K.count);for(let F=N,R=G;F<R;F++){let z=X.getX(F);L7.fromBufferAttribute(E,z),VZ(L7,z,Y,Z,J,Q,this)}}else{let N=Math.max(0,K.start),G=Math.min(E.count,K.start+K.count);for(let F=N,R=G;F<R;F++)L7.fromBufferAttribute(E,F),VZ(L7,F,Y,Z,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}}function VZ(J,Q,$,Z,W,K,H){let Y=dJ.distanceSqToPoint(J);if(Y<$){let X=new y;dJ.closestPointToPoint(J,X),X.applyMatrix4(Z);let U=W.ray.origin.distanceTo(X);if(U<W.near||U>W.far)return;K.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:Q,face:null,faceIndex:null,barycoord:null,object:H})}}class t7 extends z8{constructor(J=[],Q=301,$,Z,W,K,H,Y,X,U){super(J,Q,$,Z,W,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class S9 extends z8{constructor(J,Q,$=1014,Z,W,K,H=1003,Y=1003,X,U=1026,E=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let N={width:J,height:Q,depth:E};super(N,Z,W,K,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new l6(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class rQ extends S9{constructor(J,Q=1014,$=301,Z,W,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},E=[U,U,U,U,U,U];super(J,J,Q,$,Z,W,K,H,Y,X);this.image=E,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class e7 extends z8{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class z6 extends C8{constructor(J=1,Q=1,$=1,Z=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:K};let H=this;Z=Math.floor(Z),W=Math.floor(W),K=Math.floor(K);let Y=[],X=[],U=[],E=[],N=0,G=0;F("z","y","x",-1,-1,$,Q,J,K,W,0),F("z","y","x",1,-1,$,Q,-J,K,W,1),F("x","z","y",1,1,J,$,Q,Z,K,2),F("x","z","y",1,-1,J,$,-Q,Z,K,3),F("x","y","z",1,-1,J,Q,$,Z,W,4),F("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(Y),this.setAttribute("position",new b8(X,3)),this.setAttribute("normal",new b8(U,3)),this.setAttribute("uv",new b8(E,2));function F(R,z,D,q,_,A,L,I,C,w,M){let B=A/C,d=L/w,P=A/2,h=L/2,o=I/2,g=C+1,c=w+1,p=0,f=0,a=new y;for(let e=0;e<c;e++){let J0=e*d-h;for(let k0=0;k0<g;k0++){let D0=k0*B-P;a[R]=D0*q,a[z]=J0*_,a[D]=o,X.push(a.x,a.y,a.z),a[R]=0,a[z]=0,a[D]=I>0?1:-1,U.push(a.x,a.y,a.z),E.push(k0/C),E.push(1-e/w),p+=1}}for(let e=0;e<w;e++)for(let J0=0;J0<C;J0++){let k0=N+J0+g*e,D0=N+J0+g*(e+1),l0=N+(J0+1)+g*(e+1),u0=N+(J0+1)+g*e;Y.push(k0,D0,u0),Y.push(D0,l0,u0),f+=6}H.addGroup(G,f,M),G+=f,N+=p}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new z6(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class j9 extends C8{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(Z),X=H+1,U=Y+1,E=J/H,N=Q/Y,G=[],F=[],R=[],z=[];for(let D=0;D<U;D++){let q=D*N-K;for(let _=0;_<X;_++){let A=_*E-W;F.push(A,-q,0),R.push(0,0,1),z.push(_/H),z.push(1-D/Y)}}for(let D=0;D<Y;D++)for(let q=0;q<H;q++){let _=q+X*D,A=q+X*(D+1),L=q+1+X*(D+1),I=q+1+X*D;G.push(_,A,I),G.push(A,L,I)}this.setIndex(G),this.setAttribute("position",new b8(F,3)),this.setAttribute("normal",new b8(R,3)),this.setAttribute("uv",new b8(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new j9(J.width,J.height,J.widthSegments,J.heightSegments)}}function i9(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(BZ(W))if(W.isRenderTargetTexture)C0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(BZ(W[0])){let K=[];for(let H=0,Y=W.length;H<Y;H++)K[H]=W[H].clone();Q[$][Z]=K}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function A8(J){let Q={};for(let $=0;$<J.length;$++){let Z=i9(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function BZ(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function qH(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function tQ(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return g0.workingColorSpace}var _W={clone:i9,merge:A8},FH=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,DH=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class T8 extends T9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=FH,this.fragmentShader=DH,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=i9(J.uniforms),this.uniformsGroups=qH(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let K=this.uniforms[Z].value;if(K&&K.isTexture)Q.uniforms[Z]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[Z]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[Z]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[Z]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[Z]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[Z]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[Z]={type:"m4",value:K.toArray()};else Q.uniforms[Z]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new p0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new n0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new y().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new K8().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new w0().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new W8().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class eQ extends T8{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class J$ extends T9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class Q$ extends T9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function V7(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class o9{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];$:{J:{let K;Q:{Z:if(!(J<Z)){for(let H=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(W=Z,Z=Q[++$],J<Z)break J}K=Q.length;break Q}if(!(J>=W)){let H=Q[1];if(J<H)$=2,W=H;for(let Y=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(Z=W,W=Q[--$-1],J>=W)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let K=0;K!==Z;++K)Q[K]=$[W+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class $$ extends o9{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,K=J+1,H=Z[W],Y=Z[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,H=2*Q-$;break;case 2402:W=Z.length-2,H=Q+Z[W]-Z[W+1];break;default:W=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+Z[1]-Z[0];break;default:K=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=W*U,this._offsetNext=K*U}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,E=this._offsetNext,N=this._weightPrev,G=this._weightNext,F=($-Q)/(Z-Q),R=F*F,z=R*F,D=-N*z+2*N*R-N*F,q=(1+N)*z+(-1.5-2*N)*R+(-0.5+N)*F+1,_=(-1-G)*z+(1.5+G)*R+0.5*F,A=G*z-G*R;for(let L=0;L!==H;++L)W[L]=D*K[U+L]+q*K[X+L]+_*K[Y+L]+A*K[E+L];return W}}class Z$ extends o9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(Z-Q),E=1-U;for(let N=0;N!==H;++N)W[N]=K[X+N]*E+K[Y+N]*U;return W}}class W$ extends o9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class K$ extends o9{interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,E=this.outTangents;if(!U||!E){let F=($-Q)/(Z-Q),R=1-F;for(let z=0;z!==H;++z)W[z]=K[X+z]*R+K[Y+z]*F;return W}let N=H*2,G=J-1;for(let F=0;F!==H;++F){let R=K[X+F],z=K[Y+F],D=G*N+F*2,q=E[D],_=E[D+1],A=J*N+F*2,L=U[A],I=U[A+1],C=($-Q)/(Z-Q),w,M,B,d,P;for(let h=0;h<8;h++){w=C*C,M=w*C,B=1-C,d=B*B,P=d*B;let g=P*Q+3*d*C*q+3*B*w*L+M*Z-$;if(Math.abs(g)<0.0000000001)break;let c=3*d*(q-Q)+6*B*C*(L-q)+3*w*(Z-L);if(Math.abs(c)<0.0000000001)break;C=C-g/c,C=Math.max(0,Math.min(1,C))}W[F]=P*R+3*d*C*_+3*B*w*I+M*z}return W}}class n8{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=V7(Q,this.TimeBufferType),this.values=V7($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:V7(J.times,Array),values:V7(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new W$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new Z$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new $$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new K$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return C0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,K=Z-1;while(W!==Z&&$[W]<J)++W;while(K!==-1&&$[K]>Q)--K;if(++K,W!==0||K!==Z){if(W>=K)K=Math.max(K,1),W=K-1;let H=this.getValueSize();this.times=$.slice(W,K),this.values=this.values.slice(W*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)P0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)P0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==W;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){P0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){P0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(Z!==void 0){if(sK(Z))for(let H=0,Y=Z.length;H!==Y;++H){let X=Z[H];if(isNaN(X)){P0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,K=1;for(let H=1;H<W;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!Z){let E=H*$,N=E-$,G=E+$;for(let F=0;F!==$;++F){let R=Q[E+F];if(R!==Q[N+F]||R!==Q[G+F]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let E=H*$,N=K*$;for(let G=0;G!==$;++G)Q[N+G]=Q[E+G]}++K}}if(W>0){J[K]=J[W];for(let H=W*$,Y=K*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}n8.prototype.ValueTypeName="";n8.prototype.TimeBufferType=Float32Array;n8.prototype.ValueBufferType=Float32Array;n8.prototype.DefaultInterpolation=2301;class a9 extends n8{constructor(J,Q,$){super(J,Q,$)}}a9.prototype.ValueTypeName="bool";a9.prototype.ValueBufferType=Array;a9.prototype.DefaultInterpolation=2300;a9.prototype.InterpolantFactoryMethodLinear=void 0;a9.prototype.InterpolantFactoryMethodSmooth=void 0;class H$ extends n8{constructor(J,Q,$,Z){super(J,Q,$,Z)}}H$.prototype.ValueTypeName="color";class Y$ extends n8{constructor(J,Q,$,Z){super(J,Q,$,Z)}}Y$.prototype.ValueTypeName="number";class X$ extends o9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(Z-Q),X=J*H;for(let U=X+H;X!==U;X+=4)M9.slerpFlat(W,0,K,X-H,K,X,Y);return W}}class JJ extends n8{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new X$(this.times,this.values,this.getValueSize(),J)}}JJ.prototype.ValueTypeName="quaternion";JJ.prototype.InterpolantFactoryMethodSmooth=void 0;class r9 extends n8{constructor(J,Q,$){super(J,Q,$)}}r9.prototype.ValueTypeName="string";r9.prototype.ValueBufferType=Array;r9.prototype.DefaultInterpolation=2300;r9.prototype.InterpolantFactoryMethodLinear=void 0;r9.prototype.InterpolantFactoryMethodSmooth=void 0;class U$ extends n8{constructor(J,Q,$,Z){super(J,Q,$,Z)}}U$.prototype.ValueTypeName="vector";class G${constructor(J,Q,$){let Z=this,W=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,W===!1){if(Z.onStart!==void 0)Z.onStart(U,K,H)}W=!0},this.itemEnd=function(U){if(K++,Z.onProgress!==void 0)Z.onProgress(U,K,H);if(K===H){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,E){return X.push(U,E),this},this.removeHandler=function(U){let E=X.indexOf(U);if(E!==-1)X.splice(E,2);return this},this.getHandler=function(U){for(let E=0,N=X.length;E<N;E+=2){let G=X[E],F=X[E+1];if(G.global)G.lastIndex=0;if(G.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var CW=new G$;class N${constructor(J){if(this.manager=J!==void 0?J:CW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}N$.DEFAULT_MATERIAL_NAME="__DEFAULT";var B7=new y,z7=new M9,J9=new y;class QJ extends I8{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new W8,this.projectionMatrix=new W8,this.projectionMatrixInverse=new W8,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(B7,z7,J9),J9.x===1&&J9.y===1&&J9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(B7,z7,J9.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(B7,z7,J9),J9.x===1&&J9.y===1&&J9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(B7,z7,J9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var C9=new y,zZ=new n0,IZ=new n0;class y8 extends QJ{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=I7*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(kJ*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return I7*2*Math.atan(Math.tan(kJ*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){C9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(C9.x,C9.y).multiplyScalar(-J/C9.z),C9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(C9.x,C9.y).multiplyScalar(-J/C9.z)}getViewSize(J,Q){return this.getViewBounds(J,zZ,IZ),Q.subVectors(IZ,zZ)}setViewOffset(J,Q,$,Z,W,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(kJ*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;W+=K.offsetX*Z/Y,Q-=K.offsetY*$/X,Z*=K.width/Y,$*=K.height/X}let H=this.filmOffset;if(H!==0)W+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class I6 extends QJ{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,K=$+J,H=Z+Q,Y=Z-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=X*this.view.offsetX,K=W+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(W,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class $J extends C8{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(J){return super.copy(J),this.instanceCount=J.instanceCount,this}toJSON(){let J=super.toJSON();return J.instanceCount=this.instanceCount,J.isInstancedBufferGeometry=!0,J}}var q6=-90,F6=1;class E$ extends I8{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new y8(q6,F6,J,Q);Z.layers=this.layers,this.add(Z);let W=new y8(q6,F6,J,Q);W.layers=this.layers,this.add(W);let K=new y8(q6,F6,J,Q);K.layers=this.layers,this.add(K);let H=new y8(q6,F6,J,Q);H.layers=this.layers,this.add(H);let Y=new y8(q6,F6,J,Q);Y.layers=this.layers,this.add(Y);let X=new y8(q6,F6,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,K,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,H,Y,X,U]=this.children,E=J.getRenderTarget(),N=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let R=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let z=!1;if(J.isWebGLRenderer===!0)z=J.state.buffers.depth.getReversed();else z=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=R,J.setRenderTarget($,5,Z),z&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(E,N,G),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class q$ extends y8{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var F$="\\[\\]\\.:\\/",OH=new RegExp("["+F$+"]","g"),D$="[^"+F$+"]",MH="[^"+F$.replace("\\.","")+"]",RH=/((?:WC+[\/:])*)/.source.replace("WC",D$),kH=/(WCOD+)?/.source.replace("WCOD",MH),LH=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",D$),VH=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",D$),BH=new RegExp("^"+RH+kH+LH+VH+"$"),zH=["material","materials","bones","map"];class AW{constructor(J,Q,$){let Z=$||i0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class i0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||i0.parseTrackName(Q),this.node=i0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new i0(J,Q,$);else return new i0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(OH,"")}static parseTrackName(J){let Q=BH.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if(zH.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let K=0;K<W.length;K++){let H=W[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=i0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){C0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){P0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){P0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){P0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){P0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){P0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[Z];if(K===void 0){let X=Q.nodeName;P0("PropertyBinding: Trying to update property for track: "+X+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}i0.Composite=AW;i0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};i0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};i0.prototype.GetterByBindingType=[i0.prototype._getValue_direct,i0.prototype._getValue_array,i0.prototype._getValue_arrayElement,i0.prototype._getValue_toArray];i0.prototype.SetterByBindingTypeAndVersioning=[[i0.prototype._setValue_direct,i0.prototype._setValue_direct_setNeedsUpdate,i0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_array,i0.prototype._setValue_array_setNeedsUpdate,i0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_arrayElement,i0.prototype._setValue_arrayElement_setNeedsUpdate,i0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_fromArray,i0.prototype._setValue_fromArray_setNeedsUpdate,i0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var T1=new Float32Array(1);class O${static{O$.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}}function M$(J,Q,$,Z){let W=IH(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function IH(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)C0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function aW(){let J=null,Q=!1,$=null,Z=null;function W(K,H){$(K,H),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function _H(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:E}=Y,N=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,E),Y.onUploadCallback();let F;if(U instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)F=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)F=J.SHORT;else if(U instanceof Uint32Array)F=J.UNSIGNED_INT;else if(U instanceof Int32Array)F=J.INT;else if(U instanceof Int8Array)F=J.BYTE;else if(U instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:F,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:N}}function Z(Y,X,U){let{array:E,updateRanges:N}=X;if(J.bindBuffer(U,Y),N.length===0)J.bufferSubData(U,0,E);else{N.sort((F,R)=>F.start-R.start);let G=0;for(let F=1;F<N.length;F++){let R=N[G],z=N[F];if(z.start<=R.start+R.count+1)R.count=Math.max(R.count,z.start+z.count-R.start);else++G,N[G]=z}N.length=G+1;for(let F=0,R=N.length;F<R;F++){let z=N[F];J.bufferSubData(U,z.start*E.BYTES_PER_ELEMENT,E,z.start,z.count)}X.clearUpdateRanges()}X.onUploadCallback()}function W(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let E=Q.get(Y);if(!E||E.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,Y,X),U.version=Y.version}}return{get:W,remove:K,update:H}}var CH=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,AH=`#ifdef USE_ALPHAHASH
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
#endif`,PH=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,wH=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,TH=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,SH=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jH=`#ifdef USE_AOMAP
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
#endif`,vH=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,fH=`#ifdef USE_BATCHING
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
#endif`,yH=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bH=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,hH=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xH=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,gH=`#ifdef USE_IRIDESCENCE
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
#endif`,pH=`#ifdef USE_BUMPMAP
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
#endif`,mH=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,lH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uH=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,iH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,oH=`#define PI 3.141592653589793
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
} // validated`,aH=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rH=`vec3 transformedNormal = objectNormal;
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
#endif`,tH=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,eH=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,JY=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,QY=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$Y="gl_FragColor = linearToOutputTexel( gl_FragColor );",ZY=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,WY=`#ifdef USE_ENVMAP
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
#endif`,KY=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,HY=`#ifdef USE_ENVMAP
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
#endif`,YY=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,XY=`#ifdef USE_ENVMAP
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
#endif`,UY=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,GY=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,NY=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,EY=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qY=`#ifdef USE_GRADIENTMAP
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
}`,FY=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,DY=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,OY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,MY=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,RY=`#ifdef USE_ENVMAP
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
#endif`,kY=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,LY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,VY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,BY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,zY=`PhysicalMaterial material;
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
#endif`,IY=`uniform sampler2D dfgLUT;
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
}`,_Y=`
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
#endif`,CY=`#if defined( RE_IndirectDiffuse )
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
#endif`,AY=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,PY=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,wY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,TY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,SY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vY=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fY=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yY=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,bY=`#if defined( USE_POINTS_UV )
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
#endif`,hY=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xY=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gY=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,pY=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mY=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,lY=`#ifdef USE_MORPHTARGETS
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
#endif`,dY=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uY=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,cY=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,nY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,iY=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,oY=`#ifdef USE_NORMALMAP
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
#endif`,aY=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,rY=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tY=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,eY=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,JX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,QX=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$X=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ZX=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,WX=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,KX=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,HX=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,YX=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,XX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,UX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,GX=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,NX=`float getShadowMask() {
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
}`,EX=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qX=`#ifdef USE_SKINNING
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
#endif`,FX=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,DX=`#ifdef USE_SKINNING
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
#endif`,OX=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,MX=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,RX=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kX=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,LX=`#ifdef USE_TRANSMISSION
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
#endif`,VX=`#ifdef USE_TRANSMISSION
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
#endif`,BX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,zX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,IX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_X=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,CX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,AX=`uniform sampler2D t2D;
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
}`,PX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wX=`#ifdef ENVMAP_TYPE_CUBE
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
}`,TX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,SX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jX=`#include <common>
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
}`,vX=`#if DEPTH_PACKING == 3200
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
}`,fX=`#define DISTANCE
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
}`,yX=`#define DISTANCE
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
}`,bX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,hX=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xX=`uniform float scale;
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
}`,gX=`uniform vec3 diffuse;
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
}`,pX=`#include <common>
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
}`,mX=`uniform vec3 diffuse;
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
}`,lX=`#define LAMBERT
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
}`,dX=`#define LAMBERT
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
}`,uX=`#define MATCAP
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
}`,cX=`#define MATCAP
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
}`,nX=`#define NORMAL
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
}`,sX=`#define NORMAL
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
}`,iX=`#define PHONG
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
}`,oX=`#define PHONG
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
}`,aX=`#define STANDARD
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
}`,rX=`#define STANDARD
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
}`,tX=`#define TOON
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
}`,eX=`#define TOON
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
}`,JU=`uniform float size;
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
}`,QU=`uniform vec3 diffuse;
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
}`,$U=`#include <common>
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
}`,ZU=`uniform vec3 color;
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
}`,WU=`uniform float rotation;
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
}`,KU=`uniform vec3 diffuse;
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
}`,v0={alphahash_fragment:CH,alphahash_pars_fragment:AH,alphamap_fragment:PH,alphamap_pars_fragment:wH,alphatest_fragment:TH,alphatest_pars_fragment:SH,aomap_fragment:jH,aomap_pars_fragment:vH,batching_pars_vertex:fH,batching_vertex:yH,begin_vertex:bH,beginnormal_vertex:hH,bsdfs:xH,iridescence_fragment:gH,bumpmap_pars_fragment:pH,clipping_planes_fragment:mH,clipping_planes_pars_fragment:lH,clipping_planes_pars_vertex:dH,clipping_planes_vertex:uH,color_fragment:cH,color_pars_fragment:nH,color_pars_vertex:sH,color_vertex:iH,common:oH,cube_uv_reflection_fragment:aH,defaultnormal_vertex:rH,displacementmap_pars_vertex:tH,displacementmap_vertex:eH,emissivemap_fragment:JY,emissivemap_pars_fragment:QY,colorspace_fragment:$Y,colorspace_pars_fragment:ZY,envmap_fragment:WY,envmap_common_pars_fragment:KY,envmap_pars_fragment:HY,envmap_pars_vertex:YY,envmap_physical_pars_fragment:RY,envmap_vertex:XY,fog_vertex:UY,fog_pars_vertex:GY,fog_fragment:NY,fog_pars_fragment:EY,gradientmap_pars_fragment:qY,lightmap_pars_fragment:FY,lights_lambert_fragment:DY,lights_lambert_pars_fragment:OY,lights_pars_begin:MY,lights_toon_fragment:kY,lights_toon_pars_fragment:LY,lights_phong_fragment:VY,lights_phong_pars_fragment:BY,lights_physical_fragment:zY,lights_physical_pars_fragment:IY,lights_fragment_begin:_Y,lights_fragment_maps:CY,lights_fragment_end:AY,lightprobes_pars_fragment:PY,logdepthbuf_fragment:wY,logdepthbuf_pars_fragment:TY,logdepthbuf_pars_vertex:SY,logdepthbuf_vertex:jY,map_fragment:vY,map_pars_fragment:fY,map_particle_fragment:yY,map_particle_pars_fragment:bY,metalnessmap_fragment:hY,metalnessmap_pars_fragment:xY,morphinstance_vertex:gY,morphcolor_vertex:pY,morphnormal_vertex:mY,morphtarget_pars_vertex:lY,morphtarget_vertex:dY,normal_fragment_begin:uY,normal_fragment_maps:cY,normal_pars_fragment:nY,normal_pars_vertex:sY,normal_vertex:iY,normalmap_pars_fragment:oY,clearcoat_normal_fragment_begin:aY,clearcoat_normal_fragment_maps:rY,clearcoat_pars_fragment:tY,iridescence_pars_fragment:eY,opaque_fragment:JX,packing:QX,premultiplied_alpha_fragment:$X,project_vertex:ZX,dithering_fragment:WX,dithering_pars_fragment:KX,roughnessmap_fragment:HX,roughnessmap_pars_fragment:YX,shadowmap_pars_fragment:XX,shadowmap_pars_vertex:UX,shadowmap_vertex:GX,shadowmask_pars_fragment:NX,skinbase_vertex:EX,skinning_pars_vertex:qX,skinning_vertex:FX,skinnormal_vertex:DX,specularmap_fragment:OX,specularmap_pars_fragment:MX,tonemapping_fragment:RX,tonemapping_pars_fragment:kX,transmission_fragment:LX,transmission_pars_fragment:VX,uv_pars_fragment:BX,uv_pars_vertex:zX,uv_vertex:IX,worldpos_vertex:_X,background_vert:CX,background_frag:AX,backgroundCube_vert:PX,backgroundCube_frag:wX,cube_vert:TX,cube_frag:SX,depth_vert:jX,depth_frag:vX,distance_vert:fX,distance_frag:yX,equirect_vert:bX,equirect_frag:hX,linedashed_vert:xX,linedashed_frag:gX,meshbasic_vert:pX,meshbasic_frag:mX,meshlambert_vert:lX,meshlambert_frag:dX,meshmatcap_vert:uX,meshmatcap_frag:cX,meshnormal_vert:nX,meshnormal_frag:sX,meshphong_vert:iX,meshphong_frag:oX,meshphysical_vert:aX,meshphysical_frag:rX,meshtoon_vert:tX,meshtoon_frag:eX,points_vert:JU,points_frag:QU,shadow_vert:$U,shadow_frag:ZU,sprite_vert:WU,sprite_frag:KU},N0={common:{diffuse:{value:new p0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new w0},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new w0}},envmap:{envMap:{value:null},envMapRotation:{value:new w0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new w0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new w0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new w0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new w0},normalScale:{value:new n0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new w0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new w0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new w0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new w0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new p0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new y},probesMax:{value:new y},probesResolution:{value:new y}},points:{diffuse:{value:new p0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0},uvTransform:{value:new w0}},sprite:{diffuse:{value:new p0(16777215)},opacity:{value:1},center:{value:new n0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new w0},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0}}},K9={basic:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.fog]),vertexShader:v0.meshbasic_vert,fragmentShader:v0.meshbasic_frag},lambert:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},envMapIntensity:{value:1}}]),vertexShader:v0.meshlambert_vert,fragmentShader:v0.meshlambert_frag},phong:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},specular:{value:new p0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:v0.meshphong_vert,fragmentShader:v0.meshphong_frag},standard:{uniforms:A8([N0.common,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.roughnessmap,N0.metalnessmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag},toon:{uniforms:A8([N0.common,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.gradientmap,N0.fog,N0.lights,{emissive:{value:new p0(0)}}]),vertexShader:v0.meshtoon_vert,fragmentShader:v0.meshtoon_frag},matcap:{uniforms:A8([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,{matcap:{value:null}}]),vertexShader:v0.meshmatcap_vert,fragmentShader:v0.meshmatcap_frag},points:{uniforms:A8([N0.points,N0.fog]),vertexShader:v0.points_vert,fragmentShader:v0.points_frag},dashed:{uniforms:A8([N0.common,N0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:v0.linedashed_vert,fragmentShader:v0.linedashed_frag},depth:{uniforms:A8([N0.common,N0.displacementmap]),vertexShader:v0.depth_vert,fragmentShader:v0.depth_frag},normal:{uniforms:A8([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,{opacity:{value:1}}]),vertexShader:v0.meshnormal_vert,fragmentShader:v0.meshnormal_frag},sprite:{uniforms:A8([N0.sprite,N0.fog]),vertexShader:v0.sprite_vert,fragmentShader:v0.sprite_frag},background:{uniforms:{uvTransform:{value:new w0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:v0.background_vert,fragmentShader:v0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new w0}},vertexShader:v0.backgroundCube_vert,fragmentShader:v0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:v0.cube_vert,fragmentShader:v0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:v0.equirect_vert,fragmentShader:v0.equirect_frag},distance:{uniforms:A8([N0.common,N0.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:v0.distance_vert,fragmentShader:v0.distance_frag},shadow:{uniforms:A8([N0.lights,N0.fog,{color:{value:new p0(0)},opacity:{value:1}}]),vertexShader:v0.shadow_vert,fragmentShader:v0.shadow_frag}};K9.physical={uniforms:A8([K9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new w0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new w0},clearcoatNormalScale:{value:new n0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new w0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new w0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new w0},sheen:{value:0},sheenColor:{value:new p0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new w0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new w0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new w0},transmissionSamplerSize:{value:new n0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new w0},attenuationDistance:{value:0},attenuationColor:{value:new p0(0)},specularColor:{value:new p0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new w0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new w0},anisotropyVector:{value:new n0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new w0}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag};var ZJ={r:0,b:0,g:0},HU=new W8,rW=new w0;rW.set(-1,0,0,0,1,0,0,0,1);function YU(J,Q,$,Z,W,K){let H=new p0(0),Y=W===!0?0:1,X,U,E=null,N=0,G=null;function F(_){let A=_.isScene===!0?_.background:null;if(A&&A.isTexture){let L=_.backgroundBlurriness>0;A=Q.get(A,L)}return A}function R(_){let A=!1,L=F(_);if(L===null)D(H,Y);else if(L&&L.isColor)D(L,1),A=!0;let I=J.xr.getEnvironmentBlendMode();if(I==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(I==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||A)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function z(_,A){let L=F(A);if(L&&(L.isCubeTexture||L.mapping===x6)){if(U===void 0)U=new x8(new z6(1,1,1),new T8({name:"BackgroundCubeMaterial",uniforms:i9(K9.backgroundCube.uniforms),vertexShader:K9.backgroundCube.vertexShader,fragmentShader:K9.backgroundCube.fragmentShader,side:w8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(I,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=L,U.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(HU.makeRotationFromEuler(A.backgroundRotation)).transpose(),L.isCubeTexture&&L.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(rW);if(U.material.toneMapped=g0.getTransfer(L.colorSpace)!==e0,E!==L||N!==L.version||G!==J.toneMapping)U.material.needsUpdate=!0,E=L,N=L.version,G=J.toneMapping;U.layers.enableAll(),_.unshift(U,U.geometry,U.material,0,0,null)}else if(L&&L.isTexture){if(X===void 0)X=new x8(new j9(2,2),new T8({name:"BackgroundMaterial",uniforms:i9(K9.background.uniforms),vertexShader:K9.background.vertexShader,fragmentShader:K9.background.fragmentShader,side:k6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(X);if(X.material.uniforms.t2D.value=L,X.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,X.material.toneMapped=g0.getTransfer(L.colorSpace)!==e0,L.matrixAutoUpdate===!0)L.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(L.matrix),E!==L||N!==L.version||G!==J.toneMapping)X.material.needsUpdate=!0,E=L,N=L.version,G=J.toneMapping;X.layers.enableAll(),_.unshift(X,X.geometry,X.material,0,0,null)}}function D(_,A){_.getRGB(ZJ,tQ(J)),$.buffers.color.setClear(ZJ.r,ZJ.g,ZJ.b,A,K)}function q(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(_,A=1){H.set(_),Y=A,D(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(_){Y=_,D(H,Y)},render:R,addToRenderList:z,dispose:q}}function XU(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=G(null),K=W,H=!1;function Y(P,h,o,g,c){let p=!1,f=N(P,g,o,h);if(K!==f)K=f,U(K.object);if(p=F(P,g,o,c),p)R(P,g,o,c);if(c!==null)Q.update(c,J.ELEMENT_ARRAY_BUFFER);if(p||H){if(H=!1,L(P,h,o,g),c!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(c).buffer)}}function X(){return J.createVertexArray()}function U(P){return J.bindVertexArray(P)}function E(P){return J.deleteVertexArray(P)}function N(P,h,o,g){let c=g.wireframe===!0,p=Z[h.id];if(p===void 0)p={},Z[h.id]=p;let f=P.isInstancedMesh===!0?P.id:0,a=p[f];if(a===void 0)a={},p[f]=a;let e=a[o.id];if(e===void 0)e={},a[o.id]=e;let J0=e[c];if(J0===void 0)J0=G(X()),e[c]=J0;return J0}function G(P){let h=[],o=[],g=[];for(let c=0;c<$;c++)h[c]=0,o[c]=0,g[c]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:h,enabledAttributes:o,attributeDivisors:g,object:P,attributes:{},index:null}}function F(P,h,o,g){let c=K.attributes,p=h.attributes,f=0,a=o.getAttributes();for(let e in a)if(a[e].location>=0){let k0=c[e],D0=p[e];if(D0===void 0){if(e==="instanceMatrix"&&P.instanceMatrix)D0=P.instanceMatrix;if(e==="instanceColor"&&P.instanceColor)D0=P.instanceColor}if(k0===void 0)return!0;if(k0.attribute!==D0)return!0;if(D0&&k0.data!==D0.data)return!0;f++}if(K.attributesNum!==f)return!0;if(K.index!==g)return!0;return!1}function R(P,h,o,g){let c={},p=h.attributes,f=0,a=o.getAttributes();for(let e in a)if(a[e].location>=0){let k0=p[e];if(k0===void 0){if(e==="instanceMatrix"&&P.instanceMatrix)k0=P.instanceMatrix;if(e==="instanceColor"&&P.instanceColor)k0=P.instanceColor}let D0={};if(D0.attribute=k0,k0&&k0.data)D0.data=k0.data;c[e]=D0,f++}K.attributes=c,K.attributesNum=f,K.index=g}function z(){let P=K.newAttributes;for(let h=0,o=P.length;h<o;h++)P[h]=0}function D(P){q(P,0)}function q(P,h){let{newAttributes:o,enabledAttributes:g,attributeDivisors:c}=K;if(o[P]=1,g[P]===0)J.enableVertexAttribArray(P),g[P]=1;if(c[P]!==h)J.vertexAttribDivisor(P,h),c[P]=h}function _(){let{newAttributes:P,enabledAttributes:h}=K;for(let o=0,g=h.length;o<g;o++)if(h[o]!==P[o])J.disableVertexAttribArray(o),h[o]=0}function A(P,h,o,g,c,p,f){if(f===!0)J.vertexAttribIPointer(P,h,o,c,p);else J.vertexAttribPointer(P,h,o,g,c,p)}function L(P,h,o,g){z();let c=g.attributes,p=o.getAttributes(),f=h.defaultAttributeValues;for(let a in p){let e=p[a];if(e.location>=0){let J0=c[a];if(J0===void 0){if(a==="instanceMatrix"&&P.instanceMatrix)J0=P.instanceMatrix;if(a==="instanceColor"&&P.instanceColor)J0=P.instanceColor}if(J0!==void 0){let{normalized:k0,itemSize:D0}=J0,l0=Q.get(J0);if(l0===void 0)continue;let{buffer:u0,type:n,bytesPerElement:Z0}=l0,K0=n===J.INT||n===J.UNSIGNED_INT||J0.gpuType===$Q;if(J0.isInterleavedBufferAttribute){let H0=J0.data,L0=H0.stride,j0=J0.offset;if(H0.isInstancedInterleavedBuffer){for(let f0=0;f0<e.locationSize;f0++)q(e.location+f0,H0.meshPerAttribute);if(P.isInstancedMesh!==!0&&g._maxInstanceCount===void 0)g._maxInstanceCount=H0.meshPerAttribute*H0.count}else for(let f0=0;f0<e.locationSize;f0++)D(e.location+f0);J.bindBuffer(J.ARRAY_BUFFER,u0);for(let f0=0;f0<e.locationSize;f0++)A(e.location+f0,D0/e.locationSize,n,k0,L0*Z0,(j0+D0/e.locationSize*f0)*Z0,K0)}else{if(J0.isInstancedBufferAttribute){for(let H0=0;H0<e.locationSize;H0++)q(e.location+H0,J0.meshPerAttribute);if(P.isInstancedMesh!==!0&&g._maxInstanceCount===void 0)g._maxInstanceCount=J0.meshPerAttribute*J0.count}else for(let H0=0;H0<e.locationSize;H0++)D(e.location+H0);J.bindBuffer(J.ARRAY_BUFFER,u0);for(let H0=0;H0<e.locationSize;H0++)A(e.location+H0,D0/e.locationSize,n,k0,D0*Z0,D0/e.locationSize*H0*Z0,K0)}}else if(f!==void 0){let k0=f[a];if(k0!==void 0)switch(k0.length){case 2:J.vertexAttrib2fv(e.location,k0);break;case 3:J.vertexAttrib3fv(e.location,k0);break;case 4:J.vertexAttrib4fv(e.location,k0);break;default:J.vertexAttrib1fv(e.location,k0)}}}}_()}function I(){B();for(let P in Z){let h=Z[P];for(let o in h){let g=h[o];for(let c in g){let p=g[c];for(let f in p)E(p[f].object),delete p[f];delete g[c]}}delete Z[P]}}function C(P){if(Z[P.id]===void 0)return;let h=Z[P.id];for(let o in h){let g=h[o];for(let c in g){let p=g[c];for(let f in p)E(p[f].object),delete p[f];delete g[c]}}delete Z[P.id]}function w(P){for(let h in Z){let o=Z[h];for(let g in o){let c=o[g];if(c[P.id]===void 0)continue;let p=c[P.id];for(let f in p)E(p[f].object),delete p[f];delete c[P.id]}}}function M(P){for(let h in Z){let o=Z[h],g=P.isInstancedMesh===!0?P.id:0,c=o[g];if(c===void 0)continue;for(let p in c){let f=c[p];for(let a in f)E(f[a].object),delete f[a];delete c[p]}if(delete o[g],Object.keys(o).length===0)delete Z[h]}}function B(){if(d(),H=!0,K===W)return;K=W,U(K.object)}function d(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:d,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfObject:M,releaseStatesOfProgram:w,initAttributes:z,enableAttribute:D,disableUnusedAttributes:_}}function UU(J,Q,$){let Z;function W(X){Z=X}function K(X,U){J.drawArrays(Z,X,U),$.update(U,Z,1)}function H(X,U,E){if(E===0)return;J.drawArraysInstanced(Z,X,U,E),$.update(U,Z,E)}function Y(X,U,E){if(E===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,X,0,U,0,E);let G=0;for(let F=0;F<E;F++)G+=U[F];$.update(G,Z,1)}this.setMode=W,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function GU(J,Q,$,Z){let W;function K(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let w=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function H(w){if(w!==Z9&&Z.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(w){let M=w===D9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(w!==h8&&Z.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==F9&&!M)return!1;return!0}function X(w){if(w==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";w="mediump"}if(w==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",E=X(U);if(E!==U)C0("WebGLRenderer:",U,"not supported, using",E,"instead."),U=E;let N=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)C0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),R=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),z=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),q=J.getParameter(J.MAX_VERTEX_ATTRIBS),_=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),A=J.getParameter(J.MAX_VARYING_VECTORS),L=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),I=J.getParameter(J.MAX_SAMPLES),C=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:N,reversedDepthBuffer:G,maxTextures:F,maxVertexTextures:R,maxTextureSize:z,maxCubemapSize:D,maxAttributes:q,maxVertexUniforms:_,maxVaryings:A,maxFragmentUniforms:L,maxSamples:I,samples:C}}function NU(J){let Q=this,$=null,Z=0,W=!1,K=!1,H=new E9,Y=new w0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(N,G){let F=N.length!==0||G||Z!==0||W;return W=G,Z=N.length,F},this.beginShadows=function(){K=!0,E(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(N,G){$=E(N,G,0)},this.setState=function(N,G,F){let{clippingPlanes:R,clipIntersection:z,clipShadows:D}=N,q=J.get(N);if(!W||R===null||R.length===0||K&&!D)if(K)E(null);else U();else{let _=K?0:Z,A=_*4,L=q.clippingState||null;X.value=L,L=E(R,G,A,F);for(let I=0;I!==A;++I)L[I]=$[I];q.clippingState=L,this.numIntersection=z?this.numPlanes:0,this.numPlanes+=_}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function E(N,G,F,R){let z=N!==null?N.length:0,D=null;if(z!==0){if(D=X.value,R!==!0||D===null){let q=F+z*4,_=G.matrixWorldInverse;if(Y.getNormalMatrix(_),D===null||D.length<q)D=new Float32Array(q);for(let A=0,L=F;A!==z;++A,L+=4)H.copy(N[A]).applyMatrix4(_,Y),H.normal.toArray(D,L),D[L+3]=H.constant}X.value=D,X.needsUpdate=!0}return Q.numPlanes=z,Q.numIntersection=0,D}}var v9=4,PW=[0.125,0.215,0.35,0.446,0.526,0.582],t9=20,EU=256,n6=new I6,wW=new p0,R$=null,k$=0,L$=0,V$=!1,qU=new y;class I${constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:K=256,position:H=qU}=W;R$=this._renderer.getRenderTarget(),k$=this._renderer.getActiveCubeFace(),L$=this._renderer.getActiveMipmapLevel(),V$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=jW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=SW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(R$,k$,L$),this._renderer.xr.enabled=V$,J.scissorTest=!1,_6(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===V6||J.mapping===p9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);R$=this._renderer.getRenderTarget(),k$=this._renderer.getActiveCubeFace(),L$=this._renderer.getActiveMipmapLevel(),V$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:_8,minFilter:_8,generateMipmaps:!1,type:D9,format:Z9,colorSpace:gQ,depthBuffer:!1},Z=TW(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=TW(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=FU(W)),this._blurMaterial=OU(W,J,Q),this._ggxMaterial=DU(W,J,Q)}return Z}_compileMaterial(J){let Q=new x8(new C8,J);this._renderer.compile(Q,n6)}_sceneToCubeUV(J,Q,$,Z,W){let Y=new y8(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],E=this._renderer,N=E.autoClear,G=E.toneMapping;if(E.getClearColor(wW),E.toneMapping=a8,E.autoClear=!1,E.state.buffers.depth.getReversed())E.setRenderTarget(Z),E.clearDepth(),E.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new x8(new z6,new s7({name:"PMREM.Background",side:w8,depthWrite:!1,depthTest:!1}));let R=this._backgroundBox,z=R.material,D=!1,q=J.background;if(q){if(q.isColor)z.color.copy(q),J.background=null,D=!0}else z.color.copy(wW),D=!0;for(let _=0;_<6;_++){let A=_%3;if(A===0)Y.up.set(0,X[_],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x+U[_],W.y,W.z);else if(A===1)Y.up.set(0,0,X[_]),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y+U[_],W.z);else Y.up.set(0,X[_],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y,W.z+U[_]);let L=this._cubeSize;if(_6(Z,A*L,_>2?L:0,L,L),E.setRenderTarget(Z),D)E.render(R,Y);E.render(J,Y)}E.toneMapping=G,E.autoClear=N,J.background=q}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===V6||J.mapping===p9;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=jW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=SW();let W=Z?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=W;let H=W.uniforms;H.envMap.value=J;let Y=this._cubeSize;_6(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,n6)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),E=Math.sqrt(X*X-U*U),N=0+X*1.25,G=E*N,{_lodMax:F}=this,R=this._sizeLods[$],z=3*R*($>F-v9?$-F+v9:0),D=4*(this._cubeSize-R);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=F-Q,_6(W,z,D,3*R,2*R),Z.setRenderTarget(W),Z.render(H,n6),Y.envMap.value=W.texture,Y.roughness.value=0,Y.mipInt.value=F-$,_6(J,z,D,3*R,2*R),Z.setRenderTarget(J),Z.render(H,n6)}_blur(J,Q,$,Z,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,Z,"latitudinal",W),this._halfBlur(K,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,K,H){let Y=this._renderer,X=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")P0("blur direction must be either latitudinal or longitudinal!");let U=3,E=this._lodMeshes[Z];E.material=X;let N=X.uniforms,G=this._sizeLods[$]-1,F=isFinite(W)?Math.PI/(2*G):2*Math.PI/(2*t9-1),R=W/F,z=isFinite(W)?1+Math.floor(U*R):t9;if(z>t9)C0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${z} samples when the maximum is set to ${t9}`);let D=[],q=0;for(let C=0;C<t9;++C){let w=C/R,M=Math.exp(-w*w/2);if(D.push(M),C===0)q+=M;else if(C<z)q+=2*M}for(let C=0;C<D.length;C++)D[C]=D[C]/q;if(N.envMap.value=J.texture,N.samples.value=z,N.weights.value=D,N.latitudinal.value=K==="latitudinal",H)N.poleAxis.value=H;let{_lodMax:_}=this;N.dTheta.value=F,N.mipInt.value=_-$;let A=this._sizeLods[Z],L=3*A*(Z>_-v9?Z-_+v9:0),I=4*(this._cubeSize-A);_6(Q,L,I,3*A,2*A),Y.setRenderTarget(Q),Y.render(E,n6)}}function FU(J){let Q=[],$=[],Z=[],W=J,K=J-v9+1+PW.length;for(let H=0;H<K;H++){let Y=Math.pow(2,W);Q.push(Y);let X=1/Y;if(H>J-v9)X=PW[H-J+v9-1];else if(H===0)X=0;$.push(X);let U=1/(Y-2),E=-U,N=1+U,G=[E,E,N,E,N,N,E,E,N,N,E,N],F=6,R=6,z=3,D=2,q=1,_=new Float32Array(z*R*F),A=new Float32Array(D*R*F),L=new Float32Array(q*R*F);for(let C=0;C<F;C++){let w=C%3*2/3-1,M=C>2?0:-1,B=[w,M,0,w+0.6666666666666666,M,0,w+0.6666666666666666,M+1,0,w,M,0,w+0.6666666666666666,M+1,0,w,M+1,0];_.set(B,z*R*C),A.set(G,D*R*C);let d=[C,C,C,C,C,C];L.set(d,q*R*C)}let I=new C8;if(I.setAttribute("position",new R8(_,z)),I.setAttribute("uv",new R8(A,D)),I.setAttribute("faceIndex",new R8(L,q)),Z.push(new x8(I,null)),W>v9)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function TW(J,Q,$){let Z=new c8(J,Q,$);return Z.texture.mapping=x6,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function _6(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function DU(J,Q,$){return new T8({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:EU,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:KJ(),fragmentShader:`

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
		`,blending:$9,depthTest:!1,depthWrite:!1})}function OU(J,Q,$){let Z=new Float32Array(t9),W=new y(0,1,0);return new T8({name:"SphericalGaussianBlur",defines:{n:t9,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:KJ(),fragmentShader:`

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
		`,blending:$9,depthTest:!1,depthWrite:!1})}function SW(){return new T8({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:KJ(),fragmentShader:`

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
		`,blending:$9,depthTest:!1,depthWrite:!1})}function jW(){return new T8({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:KJ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$9,depthTest:!1,depthWrite:!1})}function KJ(){return`

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
	`}class A$ extends c8{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new t7(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new z6(5,5,5),W=new T8({name:"CubemapFromEquirect",uniforms:i9($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:w8,blending:$9});W.uniforms.tEquirect.value=Q;let K=new x8(Z,W),H=Q.minFilter;if(Q.minFilter===m9)Q.minFilter=_8;return new E$(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,Z);J.setRenderTarget(W)}}function MU(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(G,F=!1){if(G===null||G===void 0)return null;if(F)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let F=G.mapping;if(F===A7||F===P7)if(Q.has(G)){let R=Q.get(G).texture;return Y(R,G.mapping)}else{let R=G.image;if(R&&R.height>0){let z=new A$(R.height);return z.fromEquirectangularTexture(J,G),Q.set(G,z),G.addEventListener("dispose",U),Y(z.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let F=G.mapping,R=F===A7||F===P7,z=F===V6||F===p9;if(R||z){let D=$.get(G),q=D!==void 0?D.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==q){if(Z===null)Z=new I$(J);return D=R?Z.fromEquirectangular(G,D):Z.fromCubemap(G,D),D.texture.pmremVersion=G.pmremVersion,$.set(G,D),D.texture}else if(D!==void 0)return D.texture;else{let _=G.image;if(R&&_&&_.height>0||z&&_&&X(_)){if(Z===null)Z=new I$(J);return D=R?Z.fromEquirectangular(G):Z.fromCubemap(G),D.texture.pmremVersion=G.pmremVersion,$.set(G,D),G.addEventListener("dispose",E),D.texture}else return null}}}return G}function Y(G,F){if(F===A7)G.mapping=V6;else if(F===P7)G.mapping=p9;return G}function X(G){let F=0,R=6;for(let z=0;z<R;z++)if(G[z]!==void 0)F++;return F===R}function U(G){let F=G.target;F.removeEventListener("dispose",U);let R=Q.get(F);if(R!==void 0)Q.delete(F),R.dispose()}function E(G){let F=G.target;F.removeEventListener("dispose",E);let R=$.get(F);if(R!==void 0)$.delete(F),R.dispose()}function N(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:N}}function RU(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)g9("WebGLRenderer: "+Z+" extension not supported.");return W}}}function kU(J,Q,$,Z){let W={},K=new WeakMap;function H(N){let G=N.target;if(G.index!==null)Q.remove(G.index);for(let R in G.attributes)Q.remove(G.attributes[R]);G.removeEventListener("dispose",H),delete W[G.id];let F=K.get(G);if(F)Q.remove(F),K.delete(G);if(Z.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(N,G){if(W[G.id]===!0)return G;return G.addEventListener("dispose",H),W[G.id]=!0,$.memory.geometries++,G}function X(N){let G=N.attributes;for(let F in G)Q.update(G[F],J.ARRAY_BUFFER)}function U(N){let G=[],F=N.index,R=N.attributes.position,z=0;if(R===void 0)return;if(F!==null){let _=F.array;z=F.version;for(let A=0,L=_.length;A<L;A+=3){let I=_[A+0],C=_[A+1],w=_[A+2];G.push(I,C,C,w,w,I)}}else{let _=R.array;z=R.version;for(let A=0,L=_.length/3-1;A<L;A+=3){let I=A+0,C=A+1,w=A+2;G.push(I,C,C,w,w,I)}}let D=new(R.count>=65535?n7:c7)(G,1);D.version=z;let q=K.get(N);if(q)Q.remove(q);K.set(N,D)}function E(N){let G=K.get(N);if(G){let F=N.index;if(F!==null){if(G.version<F.version)U(N)}}else U(N);return K.get(N)}return{get:Y,update:X,getWireframeAttribute:E}}function LU(J,Q,$){let Z;function W(N){Z=N}let K,H;function Y(N){K=N.type,H=N.bytesPerElement}function X(N,G){J.drawElements(Z,G,K,N*H),$.update(G,Z,1)}function U(N,G,F){if(F===0)return;J.drawElementsInstanced(Z,G,K,N*H,F),$.update(G,Z,F)}function E(N,G,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,G,0,K,N,0,F);let z=0;for(let D=0;D<F;D++)z+=G[D];$.update(z,Z,1)}this.setMode=W,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=E}function VU(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:P0("WebGLInfo: Unknown draw mode:",H);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function BU(J,Q,$){let Z=new WeakMap,W=new K8;function K(H,Y,X){let U=H.morphTargetInfluences,E=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,N=E!==void 0?E.length:0,G=Z.get(Y);if(G===void 0||G.count!==N){let B=function(){w.dispose(),Z.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let F=Y.morphAttributes.position!==void 0,R=Y.morphAttributes.normal!==void 0,z=Y.morphAttributes.color!==void 0,D=Y.morphAttributes.position||[],q=Y.morphAttributes.normal||[],_=Y.morphAttributes.color||[],A=0;if(F===!0)A=1;if(R===!0)A=2;if(z===!0)A=3;let L=Y.attributes.position.count*A,I=1;if(L>Q.maxTextureSize)I=Math.ceil(L/Q.maxTextureSize),L=Q.maxTextureSize;let C=new Float32Array(L*I*4*N),w=new l7(C,L,I,N);w.type=F9,w.needsUpdate=!0;let M=A*4;for(let d=0;d<N;d++){let P=D[d],h=q[d],o=_[d],g=L*I*4*d;for(let c=0;c<P.count;c++){let p=c*M;if(F===!0)W.fromBufferAttribute(P,c),C[g+p+0]=W.x,C[g+p+1]=W.y,C[g+p+2]=W.z,C[g+p+3]=0;if(R===!0)W.fromBufferAttribute(h,c),C[g+p+4]=W.x,C[g+p+5]=W.y,C[g+p+6]=W.z,C[g+p+7]=0;if(z===!0)W.fromBufferAttribute(o,c),C[g+p+8]=W.x,C[g+p+9]=W.y,C[g+p+10]=W.z,C[g+p+11]=o.itemSize===4?W.w:1}}G={count:N,texture:w,size:new n0(L,I)},Z.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let F=0;for(let z=0;z<U.length;z++)F+=U[z];let R=Y.morphTargetsRelative?1:1-F;X.getUniforms().setValue(J,"morphTargetBaseInfluence",R),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function zU(J,Q,$,Z,W){let K=new WeakMap;function H(U){let E=W.render.frame,N=U.geometry,G=Q.get(U,N);if(K.get(G)!==E)Q.update(G),K.set(G,E);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==E){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,E)}}if(U.isSkinnedMesh){let F=U.skeleton;if(K.get(F)!==E)F.update(),K.set(F,E)}return G}function Y(){K=new WeakMap}function X(U){let E=U.target;if(E.removeEventListener("dispose",X),Z.releaseStatesOfObject(E),$.remove(E.instanceMatrix),E.instanceColor!==null)$.remove(E.instanceColor)}return{update:H,dispose:Y}}var IU={[oJ]:"LINEAR_TONE_MAPPING",[aJ]:"REINHARD_TONE_MAPPING",[rJ]:"CINEON_TONE_MAPPING",[tJ]:"ACES_FILMIC_TONE_MAPPING",[JQ]:"AGX_TONE_MAPPING",[QQ]:"NEUTRAL_TONE_MAPPING",[eJ]:"CUSTOM_TONE_MAPPING"};function _U(J,Q,$,Z,W,K){let H=new c8(Q,$,{type:J,depthBuffer:W,stencilBuffer:K,samples:Z?4:0,depthTexture:W?new S9(Q,$):void 0}),Y=new c8(Q,$,{type:D9,depthBuffer:!1,stencilBuffer:!1}),X=new C8;X.setAttribute("position",new b8([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new b8([0,2,0,0,2,0],2));let U=new eQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),E=new x8(X,U),N=new I6(-1,1,1,-1,0,1),G=null,F=null,R=!1,z,D=null,q=[],_=!1;this.setSize=function(A,L){H.setSize(A,L),Y.setSize(A,L);for(let I=0;I<q.length;I++){let C=q[I];if(C.setSize)C.setSize(A,L)}},this.setEffects=function(A){q=A,_=q.length>0&&q[0].isRenderPass===!0;let{width:L,height:I}=H;for(let C=0;C<q.length;C++){let w=q[C];if(w.setSize)w.setSize(L,I)}},this.begin=function(A,L){if(R)return!1;if(A.toneMapping===a8&&q.length===0)return!1;if(D=L,L!==null){let{width:I,height:C}=L;if(H.width!==I||H.height!==C)this.setSize(I,C)}if(_===!1)A.setRenderTarget(H);return z=A.toneMapping,A.toneMapping=a8,!0},this.hasRenderPass=function(){return _},this.end=function(A,L){A.toneMapping=z,R=!0;let I=H,C=Y;for(let w=0;w<q.length;w++){let M=q[w];if(M.enabled===!1)continue;if(M.render(A,C,I,L),M.needsSwap!==!1){let B=I;I=C,C=B}}if(G!==A.outputColorSpace||F!==A.toneMapping){if(G=A.outputColorSpace,F=A.toneMapping,U.defines={},g0.getTransfer(G)===e0)U.defines.SRGB_TRANSFER="";let w=IU[F];if(w)U.defines[w]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=I.texture,A.setRenderTarget(D),A.render(E,N),D=null,R=!1},this.isCompositing=function(){return R},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var tW=new z8,_$=new S9(1,1),eW=new l7,JK=new sQ,QK=new t7,vW=[],fW=[],yW=new Float32Array(16),bW=new Float32Array(9),hW=new Float32Array(4);function C6(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,K=vW[W];if(K===void 0)K=new Float32Array(W),vW[W]=K;if(Q!==0){Z.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function q8(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function F8(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function HJ(J,Q){let $=fW[Q];if($===void 0)$=new Int32Array(Q),fW[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function CU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function AU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2fv(this.addr,Q),F8($,Q)}}function PU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(q8($,Q))return;J.uniform3fv(this.addr,Q),F8($,Q)}}function wU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4fv(this.addr,Q),F8($,Q)}}function TU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q8($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,Z))return;hW.set(Z),J.uniformMatrix2fv(this.addr,!1,hW),F8($,Z)}}function SU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q8($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,Z))return;bW.set(Z),J.uniformMatrix3fv(this.addr,!1,bW),F8($,Z)}}function jU(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q8($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,Z))return;yW.set(Z),J.uniformMatrix4fv(this.addr,!1,yW),F8($,Z)}}function vU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function fU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2iv(this.addr,Q),F8($,Q)}}function yU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3iv(this.addr,Q),F8($,Q)}}function bU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4iv(this.addr,Q),F8($,Q)}}function hU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function xU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2uiv(this.addr,Q),F8($,Q)}}function gU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3uiv(this.addr,Q),F8($,Q)}}function pU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4uiv(this.addr,Q),F8($,Q)}}function mU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let K;if(this.type===J.SAMPLER_2D_SHADOW)_$.compareFunction=$.isReversedDepthBuffer()?m7:p7,K=_$;else K=tW;$.setTexture2D(Q||K,W)}function lU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||JK,W)}function dU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||QK,W)}function uU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||eW,W)}function cU(J){switch(J){case 5126:return CU;case 35664:return AU;case 35665:return PU;case 35666:return wU;case 35674:return TU;case 35675:return SU;case 35676:return jU;case 5124:case 35670:return vU;case 35667:case 35671:return fU;case 35668:case 35672:return yU;case 35669:case 35673:return bU;case 5125:return hU;case 36294:return xU;case 36295:return gU;case 36296:return pU;case 35678:case 36198:case 36298:case 36306:case 35682:return mU;case 35679:case 36299:case 36307:return lU;case 35680:case 36300:case 36308:case 36293:return dU;case 36289:case 36303:case 36311:case 36292:return uU}}function nU(J,Q){J.uniform1fv(this.addr,Q)}function sU(J,Q){let $=C6(Q,this.size,2);J.uniform2fv(this.addr,$)}function iU(J,Q){let $=C6(Q,this.size,3);J.uniform3fv(this.addr,$)}function oU(J,Q){let $=C6(Q,this.size,4);J.uniform4fv(this.addr,$)}function aU(J,Q){let $=C6(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function rU(J,Q){let $=C6(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function tU(J,Q){let $=C6(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function eU(J,Q){J.uniform1iv(this.addr,Q)}function J5(J,Q){J.uniform2iv(this.addr,Q)}function Q5(J,Q){J.uniform3iv(this.addr,Q)}function $5(J,Q){J.uniform4iv(this.addr,Q)}function Z5(J,Q){J.uniform1uiv(this.addr,Q)}function W5(J,Q){J.uniform2uiv(this.addr,Q)}function K5(J,Q){J.uniform3uiv(this.addr,Q)}function H5(J,Q){J.uniform4uiv(this.addr,Q)}function Y5(J,Q,$){let Z=this.cache,W=Q.length,K=HJ($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=_$;else H=tW;for(let Y=0;Y!==W;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function X5(J,Q,$){let Z=this.cache,W=Q.length,K=HJ($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);for(let H=0;H!==W;++H)$.setTexture3D(Q[H]||JK,K[H])}function U5(J,Q,$){let Z=this.cache,W=Q.length,K=HJ($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);for(let H=0;H!==W;++H)$.setTextureCube(Q[H]||QK,K[H])}function G5(J,Q,$){let Z=this.cache,W=Q.length,K=HJ($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);for(let H=0;H!==W;++H)$.setTexture2DArray(Q[H]||eW,K[H])}function N5(J){switch(J){case 5126:return nU;case 35664:return sU;case 35665:return iU;case 35666:return oU;case 35674:return aU;case 35675:return rU;case 35676:return tU;case 5124:case 35670:return eU;case 35667:case 35671:return J5;case 35668:case 35672:return Q5;case 35669:case 35673:return $5;case 5125:return Z5;case 36294:return W5;case 36295:return K5;case 36296:return H5;case 35678:case 36198:case 36298:case 36306:case 35682:return Y5;case 35679:case 36299:case 36307:return X5;case 35680:case 36300:case 36308:case 36293:return U5;case 36289:case 36303:case 36311:case 36292:return G5}}class $K{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=cU(Q.type)}}class ZK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=N5(Q.type)}}class WK{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,K=Z.length;W!==K;++W){let H=Z[W];H.setValue(J,Q[H.id],$)}}}var B$=/(\w+)(\])?(\[|\.)?/g;function xW(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function E5(J,Q,$){let Z=J.name,W=Z.length;B$.lastIndex=0;while(!0){let K=B$.exec(Z),H=B$.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===W){xW($,U===void 0?new $K(Y,J,Q):new ZK(Y,J,Q));break}else{let N=$.map[Y];if(N===void 0)N=new WK(Y),xW($,N);$=N}}}class o6{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);E5(H,Y,this)}let Z=[],W=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(K);else W.push(K);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,K=Q.length;W!==K;++W){let H=Q[W],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let K=J[Z];if(K.id in Q)$.push(K)}return $}}function gW(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var q5=37297,F5=0;function D5(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=W;H<K;H++){let Y=H+1;Z.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return Z.join(`
`)}var pW=new w0;function O5(J){g0._getMatrix(pW,g0.workingColorSpace,J);let Q=`mat3( ${pW.elements.map(($)=>$.toFixed(4))} )`;switch(g0.getTransfer(J)){case pQ:return[Q,"LinearTransferOETF"];case e0:return[Q,"sRGBTransferOETF"];default:return C0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function mW(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(Z&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+D5(J.getShaderSource(Q),Y)}else return K}function M5(J,Q){let $=O5(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var R5={[oJ]:"Linear",[aJ]:"Reinhard",[rJ]:"Cineon",[tJ]:"ACESFilmic",[JQ]:"AgX",[QQ]:"Neutral",[eJ]:"Custom"};function k5(J,Q){let $=R5[Q];if($===void 0)return C0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var WJ=new y;function L5(){g0.getLuminanceCoefficients(WJ);let J=WJ.x.toFixed(4),Q=WJ.y.toFixed(4),$=WJ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function V5(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(i6).join(`
`)}function B5(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function z5(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let K=J.getActiveAttrib(Q,W),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function i6(J){return J!==""}function lW(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function dW(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var I5=/^[ \t]*#include +<([\w\d./]+)>/gm;function C$(J){return J.replace(I5,C5)}var _5=new Map;function C5(J,Q){let $=v0[Q];if($===void 0){let Z=_5.get(Q);if(Z!==void 0)$=v0[Z],C0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return C$($)}var A5=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function uW(J){return J.replace(A5,P5)}function P5(J,Q,$,Z){let W="";for(let K=parseInt(Q);K<parseInt($);K++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function cW(J){let Q=`precision ${J.precision} float;
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
	`;if(J.precision==="highp")Q+=`
#define HIGH_PRECISION`;else if(J.precision==="mediump")Q+=`
#define MEDIUM_PRECISION`;else if(J.precision==="lowp")Q+=`
#define LOW_PRECISION`;return Q}var w5={[b6]:"SHADOWMAP_TYPE_PCF",[R6]:"SHADOWMAP_TYPE_VSM"};function T5(J){return w5[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var S5={[V6]:"ENVMAP_TYPE_CUBE",[p9]:"ENVMAP_TYPE_CUBE",[x6]:"ENVMAP_TYPE_CUBE_UV"};function j5(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return S5[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var v5={[p9]:"ENVMAP_MODE_REFRACTION"};function f5(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return v5[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var y5={[$W]:"ENVMAP_BLENDING_MULTIPLY",[ZW]:"ENVMAP_BLENDING_MIX",[WW]:"ENVMAP_BLENDING_ADD"};function b5(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return y5[J.combine]||"ENVMAP_BLENDING_NONE"}function h5(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function x5(J,Q,$,Z){let W=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=T5($),U=j5($),E=f5($),N=b5($),G=h5($),F=V5($),R=B5(K),z=W.createProgram(),D,q,_=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(i6).join(`
`),D.length>0)D+=`
`;if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R].filter(i6).join(`
`),q.length>0)q+=`
`}else D=[cW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+E:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(i6).join(`
`),q=[cW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,R,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+E:"",$.envMap?"#define "+N:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==a8?"#define TONE_MAPPING":"",$.toneMapping!==a8?v0.tonemapping_pars_fragment:"",$.toneMapping!==a8?k5("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",v0.colorspace_pars_fragment,M5("linearToOutputTexel",$.outputColorSpace),L5(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(i6).join(`
`);if(H=C$(H),H=lW(H,$),H=dW(H,$),Y=C$(Y),Y=lW(Y,$),Y=dW(Y,$),H=uW(H),Y=uW(Y),$.isRawShaderMaterial!==!0)_=`#version 300 es
`,D=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,q=["#define varying in",$.glslVersion===lQ?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===lQ?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+q;let A=_+D+H,L=_+q+Y,I=gW(W,W.VERTEX_SHADER,A),C=gW(W,W.FRAGMENT_SHADER,L);if(W.attachShader(z,I),W.attachShader(z,C),$.index0AttributeName!==void 0)W.bindAttribLocation(z,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)W.bindAttribLocation(z,0,"position");W.linkProgram(z);function w(P){if(J.debug.checkShaderErrors){let h=W.getProgramInfoLog(z)||"",o=W.getShaderInfoLog(I)||"",g=W.getShaderInfoLog(C)||"",c=h.trim(),p=o.trim(),f=g.trim(),a=!0,e=!0;if(W.getProgramParameter(z,W.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,z,I,C);else{let J0=mW(W,I,"vertex"),k0=mW(W,C,"fragment");P0("WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(z,W.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+c+`
`+J0+`
`+k0)}else if(c!=="")C0("WebGLProgram: Program Info Log:",c);else if(p===""||f==="")e=!1;if(e)P.diagnostics={runnable:a,programLog:c,vertexShader:{log:p,prefix:D},fragmentShader:{log:f,prefix:q}}}W.deleteShader(I),W.deleteShader(C),M=new o6(W,z),B=z5(W,z)}let M;this.getUniforms=function(){if(M===void 0)w(this);return M};let B;this.getAttributes=function(){if(B===void 0)w(this);return B};let d=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(d===!1)d=W.getProgramParameter(z,q5);return d},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(z),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=F5++,this.cacheKey=Q,this.usedTimes=1,this.program=z,this.vertexShader=I,this.fragmentShader=C,this}var g5=0;class KK{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new HK(J),Q.set(J,$);return $}}class HK{constructor(J){this.id=g5++,this.code=J,this.usedTimes=0}}function p5(J){return J===u9||J===h7||J===x7}function m5(J,Q,$,Z,W,K){let H=new d7,Y=new KK,X=new Set,U=[],E=new Map,N=Z.logarithmicDepthBuffer,G=Z.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(M){if(X.add(M),M===0)return"uv";return`uv${M}`}function z(M,B,d,P,h,o){let g=P.fog,c=h.geometry,p=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?P.environment:null,f=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,a=Q.get(M.envMap||p,f),e=!!a&&a.mapping===x6?a.image.height:null,J0=F[M.type];if(M.precision!==null){if(G=Z.getMaxPrecision(M.precision),G!==M.precision)C0("WebGLProgram.getParameters:",M.precision,"not supported, using",G,"instead.")}let k0=c.morphAttributes.position||c.morphAttributes.normal||c.morphAttributes.color,D0=k0!==void 0?k0.length:0,l0=0;if(c.morphAttributes.position!==void 0)l0=1;if(c.morphAttributes.normal!==void 0)l0=2;if(c.morphAttributes.color!==void 0)l0=3;let u0,n,Z0,K0;if(J0){let T0=K9[J0];u0=T0.vertexShader,n=T0.fragmentShader}else{u0=M.vertexShader,n=M.fragmentShader;let T0=Y.getVertexShaderStage(M),H8=Y.getFragmentShaderStage(M);Y.update(M,T0,H8),Z0=T0.id,K0=H8.id}let H0=J.getRenderTarget(),L0=J.state.buffers.depth.getReversed(),j0=h.isInstancedMesh===!0,f0=h.isBatchedMesh===!0,y0=!!M.map,o0=!!M.matcap,h0=!!a,x0=!!M.aoMap,D8=!!M.lightMap,p8=!!M.bumpMap&&M.wireframe===!1,$8=!!M.normalMap,k8=!!M.displacementMap,O8=!!M.emissiveMap,E8=!!M.metalnessMap,j=!!M.roughnessMap,m8=M.anisotropy>0,s0=M.clearcoat>0,Z8=M.dispersion>0,V=M.iridescence>0,O=M.sheen>0,T=M.transmission>0,l=m8&&!!M.anisotropyMap,t=s0&&!!M.clearcoatMap,Q0=s0&&!!M.clearcoatNormalMap,U0=s0&&!!M.clearcoatRoughnessMap,u=V&&!!M.iridescenceMap,i=V&&!!M.iridescenceThicknessMap,F0=O&&!!M.sheenColorMap,B0=O&&!!M.sheenRoughnessMap,G0=!!M.specularMap,$0=!!M.specularColorMap,_0=!!M.specularIntensityMap,A0=T&&!!M.transmissionMap,c0=T&&!!M.thicknessMap,S=!!M.gradientMap,W0=!!M.alphaMap,s=M.alphaTest>0,Y0=!!M.alphaHash,O0=!!M.extensions,r=a8;if(M.toneMapped){if(H0===null||H0.isXRRenderTarget===!0)r=J.toneMapping}let X0={shaderID:J0,shaderType:M.type,shaderName:M.name,vertexShader:u0,fragmentShader:n,defines:M.defines,customVertexShaderID:Z0,customFragmentShaderID:K0,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:G,batching:f0,batchingColor:f0&&h._colorsTexture!==null,instancing:j0,instancingColor:j0&&h.instanceColor!==null,instancingMorph:j0&&h.morphTexture!==null,outputColorSpace:H0===null?J.outputColorSpace:H0.isXRRenderTarget===!0?H0.texture.colorSpace:g0.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:y0,matcap:o0,envMap:h0,envMapMode:h0&&a.mapping,envMapCubeUVHeight:e,aoMap:x0,lightMap:D8,bumpMap:p8,normalMap:$8,displacementMap:k8,emissiveMap:O8,normalMapObjectSpace:$8&&M.normalMapType===qW,normalMapTangentSpace:$8&&M.normalMapType===xQ,packedNormalMap:$8&&M.normalMapType===xQ&&p5(M.normalMap.format),metalnessMap:E8,roughnessMap:j,anisotropy:m8,anisotropyMap:l,clearcoat:s0,clearcoatMap:t,clearcoatNormalMap:Q0,clearcoatRoughnessMap:U0,dispersion:Z8,iridescence:V,iridescenceMap:u,iridescenceThicknessMap:i,sheen:O,sheenColorMap:F0,sheenRoughnessMap:B0,specularMap:G0,specularColorMap:$0,specularIntensityMap:_0,transmission:T,transmissionMap:A0,thicknessMap:c0,gradientMap:S,opaque:M.transparent===!1&&M.blending===h6&&M.alphaToCoverage===!1,alphaMap:W0,alphaTest:s,alphaHash:Y0,combine:M.combine,mapUv:y0&&R(M.map.channel),aoMapUv:x0&&R(M.aoMap.channel),lightMapUv:D8&&R(M.lightMap.channel),bumpMapUv:p8&&R(M.bumpMap.channel),normalMapUv:$8&&R(M.normalMap.channel),displacementMapUv:k8&&R(M.displacementMap.channel),emissiveMapUv:O8&&R(M.emissiveMap.channel),metalnessMapUv:E8&&R(M.metalnessMap.channel),roughnessMapUv:j&&R(M.roughnessMap.channel),anisotropyMapUv:l&&R(M.anisotropyMap.channel),clearcoatMapUv:t&&R(M.clearcoatMap.channel),clearcoatNormalMapUv:Q0&&R(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U0&&R(M.clearcoatRoughnessMap.channel),iridescenceMapUv:u&&R(M.iridescenceMap.channel),iridescenceThicknessMapUv:i&&R(M.iridescenceThicknessMap.channel),sheenColorMapUv:F0&&R(M.sheenColorMap.channel),sheenRoughnessMapUv:B0&&R(M.sheenRoughnessMap.channel),specularMapUv:G0&&R(M.specularMap.channel),specularColorMapUv:$0&&R(M.specularColorMap.channel),specularIntensityMapUv:_0&&R(M.specularIntensityMap.channel),transmissionMapUv:A0&&R(M.transmissionMap.channel),thicknessMapUv:c0&&R(M.thicknessMap.channel),alphaMapUv:W0&&R(M.alphaMap.channel),vertexTangents:!!c.attributes.tangent&&($8||m8),vertexNormals:!!c.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!c.attributes.color&&c.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!c.attributes.uv&&(y0||W0),fog:!!g,useFog:M.fog===!0,fogExp2:!!g&&g.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||c.attributes.normal===void 0&&$8===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:N,reversedDepthBuffer:L0,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:c.attributes.position!==void 0,morphTargets:c.morphAttributes.position!==void 0,morphNormals:c.morphAttributes.normal!==void 0,morphColors:c.morphAttributes.color!==void 0,morphTargetsCount:D0,morphTextureStride:l0,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:o.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:M.dithering,shadowMapEnabled:J.shadowMap.enabled&&d.length>0,shadowMapType:J.shadowMap.type,toneMapping:r,decodeVideoTexture:y0&&M.map.isVideoTexture===!0&&g0.getTransfer(M.map.colorSpace)===e0,decodeVideoTextureEmissive:O8&&M.emissiveMap.isVideoTexture===!0&&g0.getTransfer(M.emissiveMap.colorSpace)===e0,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Q9,flipSided:M.side===w8,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:O0&&M.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(O0&&M.extensions.multiDraw===!0||f0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return X0.vertexUv1s=X.has(1),X0.vertexUv2s=X.has(2),X0.vertexUv3s=X.has(3),X.clear(),X0}function D(M){let B=[];if(M.shaderID)B.push(M.shaderID);else B.push(M.customVertexShaderID),B.push(M.customFragmentShaderID);if(M.defines!==void 0)for(let d in M.defines)B.push(d),B.push(M.defines[d]);if(M.isRawShaderMaterial===!1)q(B,M),_(B,M),B.push(J.outputColorSpace);return B.push(M.customProgramCacheKey),B.join()}function q(M,B){M.push(B.precision),M.push(B.outputColorSpace),M.push(B.envMapMode),M.push(B.envMapCubeUVHeight),M.push(B.mapUv),M.push(B.alphaMapUv),M.push(B.lightMapUv),M.push(B.aoMapUv),M.push(B.bumpMapUv),M.push(B.normalMapUv),M.push(B.displacementMapUv),M.push(B.emissiveMapUv),M.push(B.metalnessMapUv),M.push(B.roughnessMapUv),M.push(B.anisotropyMapUv),M.push(B.clearcoatMapUv),M.push(B.clearcoatNormalMapUv),M.push(B.clearcoatRoughnessMapUv),M.push(B.iridescenceMapUv),M.push(B.iridescenceThicknessMapUv),M.push(B.sheenColorMapUv),M.push(B.sheenRoughnessMapUv),M.push(B.specularMapUv),M.push(B.specularColorMapUv),M.push(B.specularIntensityMapUv),M.push(B.transmissionMapUv),M.push(B.thicknessMapUv),M.push(B.combine),M.push(B.fogExp2),M.push(B.sizeAttenuation),M.push(B.morphTargetsCount),M.push(B.morphAttributeCount),M.push(B.numDirLights),M.push(B.numPointLights),M.push(B.numSpotLights),M.push(B.numSpotLightMaps),M.push(B.numHemiLights),M.push(B.numRectAreaLights),M.push(B.numDirLightShadows),M.push(B.numPointLightShadows),M.push(B.numSpotLightShadows),M.push(B.numSpotLightShadowsWithMaps),M.push(B.numLightProbes),M.push(B.shadowMapType),M.push(B.toneMapping),M.push(B.numClippingPlanes),M.push(B.numClipIntersection),M.push(B.depthPacking)}function _(M,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(M.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);M.push(H.mask)}function A(M){let B=F[M.type],d;if(B){let P=K9[B];d=_W.clone(P.uniforms)}else d=M.uniforms;return d}function L(M,B){let d=E.get(B);if(d!==void 0)++d.usedTimes;else d=new x5(J,B,M,W),U.push(d),E.set(B,d);return d}function I(M){if(--M.usedTimes===0){let B=U.indexOf(M);U[B]=U[U.length-1],U.pop(),E.delete(M.cacheKey),M.destroy()}}function C(M){Y.remove(M)}function w(){Y.dispose()}return{getParameters:z,getProgramCacheKey:D,getUniforms:A,acquireProgram:L,releaseProgram:I,releaseShaderCache:C,programs:U,dispose:w}}function l5(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function Z(H){J.delete(H)}function W(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:K}}function d5(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function nW(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function sW(){let J=[],Q=0,$=[],Z=[],W=[];function K(){Q=0,$.length=0,Z.length=0,W.length=0}function H(G){let F=0;if(G.isInstancedMesh)F+=2;if(G.isSkinnedMesh)F+=1;return F}function Y(G,F,R,z,D,q){let _=J[Q];if(_===void 0)_={id:G.id,object:G,geometry:F,material:R,materialVariant:H(G),groupOrder:z,renderOrder:G.renderOrder,z:D,group:q},J[Q]=_;else _.id=G.id,_.object=G,_.geometry=F,_.material=R,_.materialVariant=H(G),_.groupOrder=z,_.renderOrder=G.renderOrder,_.z=D,_.group=q;return Q++,_}function X(G,F,R,z,D,q){let _=Y(G,F,R,z,D,q);if(R.transmission>0)Z.push(_);else if(R.transparent===!0)W.push(_);else $.push(_)}function U(G,F,R,z,D,q){let _=Y(G,F,R,z,D,q);if(R.transmission>0)Z.unshift(_);else if(R.transparent===!0)W.unshift(_);else $.unshift(_)}function E(G,F,R){if($.length>1)$.sort(G||d5);if(Z.length>1)Z.sort(F||nW);if(W.length>1)W.sort(F||nW);if(R)$.reverse(),Z.reverse(),W.reverse()}function N(){for(let G=Q,F=J.length;G<F;G++){let R=J[G];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:K,push:X,unshift:U,finish:N,sort:E}}function u5(){let J=new WeakMap;function Q(Z,W){let K=J.get(Z),H;if(K===void 0)H=new sW,J.set(Z,[H]);else if(W>=K.length)H=new sW,K.push(H);else H=K[W];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function c5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new y,color:new p0};break;case"SpotLight":$={position:new y,direction:new y,color:new p0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new y,color:new p0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new y,skyColor:new p0,groundColor:new p0};break;case"RectAreaLight":$={color:new p0,position:new y,halfWidth:new y,halfHeight:new y};break}return J[Q.id]=$,$}}}function n5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var s5=0;function i5(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function o5(J){let Q=new c5,$=n5(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new y);let W=new y,K=new W8,H=new W8;function Y(U){let E=0,N=0,G=0;for(let B=0;B<9;B++)Z.probe[B].set(0,0,0);let F=0,R=0,z=0,D=0,q=0,_=0,A=0,L=0,I=0,C=0,w=0;U.sort(i5);for(let B=0,d=U.length;B<d;B++){let P=U[B],h=P.color,o=P.intensity,g=P.distance,c=null;if(P.shadow&&P.shadow.map)if(P.shadow.map.texture.format===u9)c=P.shadow.map.texture;else c=P.shadow.map.depthTexture||P.shadow.map.texture;if(P.isAmbientLight)E+=h.r*o,N+=h.g*o,G+=h.b*o;else if(P.isLightProbe){for(let p=0;p<9;p++)Z.probe[p].addScaledVector(P.sh.coefficients[p],o);w++}else if(P.isDirectionalLight){let p=Q.get(P);if(p.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let f=P.shadow,a=$.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,Z.directionalShadow[F]=a,Z.directionalShadowMap[F]=c,Z.directionalShadowMatrix[F]=P.shadow.matrix,_++}Z.directional[F]=p,F++}else if(P.isSpotLight){let p=Q.get(P);p.position.setFromMatrixPosition(P.matrixWorld),p.color.copy(h).multiplyScalar(o),p.distance=g,p.coneCos=Math.cos(P.angle),p.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),p.decay=P.decay,Z.spot[z]=p;let f=P.shadow;if(P.map){if(Z.spotLightMap[I]=P.map,I++,f.updateMatrices(P),P.castShadow)C++}if(Z.spotLightMatrix[z]=f.matrix,P.castShadow){let a=$.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,Z.spotShadow[z]=a,Z.spotShadowMap[z]=c,L++}z++}else if(P.isRectAreaLight){let p=Q.get(P);p.color.copy(h).multiplyScalar(o),p.halfWidth.set(P.width*0.5,0,0),p.halfHeight.set(0,P.height*0.5,0),Z.rectArea[D]=p,D++}else if(P.isPointLight){let p=Q.get(P);if(p.color.copy(P.color).multiplyScalar(P.intensity),p.distance=P.distance,p.decay=P.decay,P.castShadow){let f=P.shadow,a=$.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,a.shadowCameraNear=f.camera.near,a.shadowCameraFar=f.camera.far,Z.pointShadow[R]=a,Z.pointShadowMap[R]=c,Z.pointShadowMatrix[R]=P.shadow.matrix,A++}Z.point[R]=p,R++}else if(P.isHemisphereLight){let p=Q.get(P);p.skyColor.copy(P.color).multiplyScalar(o),p.groundColor.copy(P.groundColor).multiplyScalar(o),Z.hemi[q]=p,q++}}if(D>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=N0.LTC_FLOAT_1,Z.rectAreaLTC2=N0.LTC_FLOAT_2;else Z.rectAreaLTC1=N0.LTC_HALF_1,Z.rectAreaLTC2=N0.LTC_HALF_2;Z.ambient[0]=E,Z.ambient[1]=N,Z.ambient[2]=G;let M=Z.hash;if(M.directionalLength!==F||M.pointLength!==R||M.spotLength!==z||M.rectAreaLength!==D||M.hemiLength!==q||M.numDirectionalShadows!==_||M.numPointShadows!==A||M.numSpotShadows!==L||M.numSpotMaps!==I||M.numLightProbes!==w)Z.directional.length=F,Z.spot.length=z,Z.rectArea.length=D,Z.point.length=R,Z.hemi.length=q,Z.directionalShadow.length=_,Z.directionalShadowMap.length=_,Z.pointShadow.length=A,Z.pointShadowMap.length=A,Z.spotShadow.length=L,Z.spotShadowMap.length=L,Z.directionalShadowMatrix.length=_,Z.pointShadowMatrix.length=A,Z.spotLightMatrix.length=L+I-C,Z.spotLightMap.length=I,Z.numSpotLightShadowsWithMaps=C,Z.numLightProbes=w,M.directionalLength=F,M.pointLength=R,M.spotLength=z,M.rectAreaLength=D,M.hemiLength=q,M.numDirectionalShadows=_,M.numPointShadows=A,M.numSpotShadows=L,M.numSpotMaps=I,M.numLightProbes=w,Z.version=s5++}function X(U,E){let N=0,G=0,F=0,R=0,z=0,D=E.matrixWorldInverse;for(let q=0,_=U.length;q<_;q++){let A=U[q];if(A.isDirectionalLight){let L=Z.directional[N];L.direction.setFromMatrixPosition(A.matrixWorld),W.setFromMatrixPosition(A.target.matrixWorld),L.direction.sub(W),L.direction.transformDirection(D),N++}else if(A.isSpotLight){let L=Z.spot[F];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(D),L.direction.setFromMatrixPosition(A.matrixWorld),W.setFromMatrixPosition(A.target.matrixWorld),L.direction.sub(W),L.direction.transformDirection(D),F++}else if(A.isRectAreaLight){let L=Z.rectArea[R];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(D),H.identity(),K.copy(A.matrixWorld),K.premultiply(D),H.extractRotation(K),L.halfWidth.set(A.width*0.5,0,0),L.halfHeight.set(0,A.height*0.5,0),L.halfWidth.applyMatrix4(H),L.halfHeight.applyMatrix4(H),R++}else if(A.isPointLight){let L=Z.point[G];L.position.setFromMatrixPosition(A.matrixWorld),L.position.applyMatrix4(D),G++}else if(A.isHemisphereLight){let L=Z.hemi[z];L.direction.setFromMatrixPosition(A.matrixWorld),L.direction.transformDirection(D),z++}}}return{setup:Y,setupView:X,state:Z}}function iW(J){let Q=new o5(J),$=[],Z=[],W=[];function K(G){N.camera=G,$.length=0,Z.length=0,W.length=0}function H(G){$.push(G)}function Y(G){Z.push(G)}function X(G){W.push(G)}function U(){Q.setup($)}function E(G){Q.setupView($,G)}let N={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:N,setupLights:U,setupLightsView:E,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function a5(J){let Q=new WeakMap;function $(W,K=0){let H=Q.get(W),Y;if(H===void 0)Y=new iW(J),Q.set(W,[Y]);else if(K>=H.length)Y=new iW(J),H.push(Y);else Y=H[K];return Y}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var r5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t5=`uniform sampler2D shadow_pass;
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
}`,e5=[new y(1,0,0),new y(-1,0,0),new y(0,1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1)],J1=[new y(0,-1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1),new y(0,-1,0),new y(0,-1,0)],oW=new W8,s6=new y,z$=new y;function Q1(J,Q,$){let Z=new o7,W=new n0,K=new n0,H=new K8,Y=new J$,X=new Q$,U={},E=$.maxTextureSize,N={[k6]:w8,[w8]:k6,[Q9]:Q9},G=new T8({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new n0},radius:{value:4}},vertexShader:r5,fragmentShader:t5}),F=G.clone();F.defines.HORIZONTAL_PASS=1;let R=new C8;R.setAttribute("position",new R8(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let z=new x8(R,G),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=b6;let q=this.type;this.render=function(C,w,M){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(C.length===0)return;if(this.type===PZ)C0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=b6;let B=J.getRenderTarget(),d=J.getActiveCubeFace(),P=J.getActiveMipmapLevel(),h=J.state;if(h.setBlending($9),h.buffers.depth.getReversed()===!0)h.buffers.color.setClear(0,0,0,0);else h.buffers.color.setClear(1,1,1,1);h.buffers.depth.setTest(!0),h.setScissorTest(!1);let o=q!==this.type;if(o)w.traverse(function(g){if(g.material)if(Array.isArray(g.material))g.material.forEach((c)=>c.needsUpdate=!0);else g.material.needsUpdate=!0});for(let g=0,c=C.length;g<c;g++){let p=C[g],f=p.shadow;if(f===void 0){C0("WebGLShadowMap:",p,"has no shadow.");continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;W.copy(f.mapSize);let a=f.getFrameExtents();if(W.multiply(a),K.copy(f.mapSize),W.x>E||W.y>E){if(W.x>E)K.x=Math.floor(E/a.x),W.x=K.x*a.x,f.mapSize.x=K.x;if(W.y>E)K.y=Math.floor(E/a.y),W.y=K.y*a.y,f.mapSize.y=K.y}let e=J.state.buffers.depth.getReversed();if(f.camera._reversedDepth=e,f.map===null||o===!0){if(f.map!==null){if(f.map.depthTexture!==null)f.map.depthTexture.dispose(),f.map.depthTexture=null;f.map.dispose()}if(this.type===R6){if(p.isPointLight){C0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}f.map=new c8(W.x,W.y,{format:u9,type:D9,minFilter:_8,magFilter:_8,generateMipmaps:!1}),f.map.texture.name=p.name+".shadowMap",f.map.depthTexture=new S9(W.x,W.y,F9),f.map.depthTexture.name=p.name+".shadowMapDepth",f.map.depthTexture.format=l9,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P9,f.map.depthTexture.magFilter=P9}else{if(p.isPointLight)f.map=new A$(W.x),f.map.depthTexture=new rQ(W.x,w9);else f.map=new c8(W.x,W.y),f.map.depthTexture=new S9(W.x,W.y,w9);if(f.map.depthTexture.name=p.name+".shadowMap",f.map.depthTexture.format=l9,this.type===b6)f.map.depthTexture.compareFunction=e?m7:p7,f.map.depthTexture.minFilter=_8,f.map.depthTexture.magFilter=_8;else f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=P9,f.map.depthTexture.magFilter=P9}f.camera.updateProjectionMatrix()}let J0=f.map.isWebGLCubeRenderTarget?6:1;for(let k0=0;k0<J0;k0++){if(f.map.isWebGLCubeRenderTarget)J.setRenderTarget(f.map,k0),J.clear();else{if(k0===0)J.setRenderTarget(f.map),J.clear();let D0=f.getViewport(k0);H.set(K.x*D0.x,K.y*D0.y,K.x*D0.z,K.y*D0.w),h.viewport(H)}if(p.isPointLight){let{camera:D0,matrix:l0}=f,u0=p.distance||D0.far;if(u0!==D0.far)D0.far=u0,D0.updateProjectionMatrix();s6.setFromMatrixPosition(p.matrixWorld),D0.position.copy(s6),z$.copy(D0.position),z$.add(e5[k0]),D0.up.copy(J1[k0]),D0.lookAt(z$),D0.updateMatrixWorld(),l0.makeTranslation(-s6.x,-s6.y,-s6.z),oW.multiplyMatrices(D0.projectionMatrix,D0.matrixWorldInverse),f._frustum.setFromProjectionMatrix(oW,D0.coordinateSystem,D0.reversedDepth)}else f.updateMatrices(p);Z=f.getFrustum(),L(w,M,f.camera,p,this.type)}if(f.isPointLightShadow!==!0&&this.type===R6)_(f,M);f.needsUpdate=!1}q=this.type,D.needsUpdate=!1,J.setRenderTarget(B,d,P)};function _(C,w){let M=Q.update(z);if(G.defines.VSM_SAMPLES!==C.blurSamples)G.defines.VSM_SAMPLES=C.blurSamples,F.defines.VSM_SAMPLES=C.blurSamples,G.needsUpdate=!0,F.needsUpdate=!0;if(C.mapPass===null)C.mapPass=new c8(W.x,W.y,{format:u9,type:D9});G.uniforms.shadow_pass.value=C.map.depthTexture,G.uniforms.resolution.value=C.mapSize,G.uniforms.radius.value=C.radius,J.setRenderTarget(C.mapPass),J.clear(),J.renderBufferDirect(w,null,M,G,z,null),F.uniforms.shadow_pass.value=C.mapPass.texture,F.uniforms.resolution.value=C.mapSize,F.uniforms.radius.value=C.radius,J.setRenderTarget(C.map),J.clear(),J.renderBufferDirect(w,null,M,F,z,null)}function A(C,w,M,B){let d=null,P=M.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)d=P;else if(d=M.isPointLight===!0?X:Y,J.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let h=d.uuid,o=w.uuid,g=U[h];if(g===void 0)g={},U[h]=g;let c=g[o];if(c===void 0)c=d.clone(),g[o]=c,w.addEventListener("dispose",I);d=c}if(d.visible=w.visible,d.wireframe=w.wireframe,B===R6)d.side=w.shadowSide!==null?w.shadowSide:w.side;else d.side=w.shadowSide!==null?w.shadowSide:N[w.side];if(d.alphaMap=w.alphaMap,d.alphaTest=w.alphaToCoverage===!0?0.5:w.alphaTest,d.map=w.map,d.clipShadows=w.clipShadows,d.clippingPlanes=w.clippingPlanes,d.clipIntersection=w.clipIntersection,d.displacementMap=w.displacementMap,d.displacementScale=w.displacementScale,d.displacementBias=w.displacementBias,d.wireframeLinewidth=w.wireframeLinewidth,d.linewidth=w.linewidth,M.isPointLight===!0&&d.isMeshDistanceMaterial===!0){let h=J.properties.get(d);h.light=M}return d}function L(C,w,M,B,d){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)){if((C.castShadow||C.receiveShadow&&d===R6)&&(!C.frustumCulled||Z.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,C.matrixWorld);let o=Q.update(C),g=C.material;if(Array.isArray(g)){let c=o.groups;for(let p=0,f=c.length;p<f;p++){let a=c[p],e=g[a.materialIndex];if(e&&e.visible){let J0=A(C,e,B,d);C.onBeforeShadow(J,C,w,M,o,J0,a),J.renderBufferDirect(M,null,o,J0,C,a),C.onAfterShadow(J,C,w,M,o,J0,a)}}}else if(g.visible){let c=A(C,g,B,d);C.onBeforeShadow(J,C,w,M,o,c,null),J.renderBufferDirect(M,null,o,c,C,null),C.onAfterShadow(J,C,w,M,o,c,null)}}}let h=C.children;for(let o=0,g=h.length;o<g;o++)L(h[o],w,M,B,d)}function I(C){C.target.removeEventListener("dispose",I);for(let M in U){let B=U[M],d=C.target.uuid;if(d in B)B[d].dispose(),delete B[d]}}}function $1(J,Q){function $(){let S=!1,W0=new K8,s=null,Y0=new K8(0,0,0,0);return{setMask:function(O0){if(s!==O0&&!S)J.colorMask(O0,O0,O0,O0),s=O0},setLocked:function(O0){S=O0},setClear:function(O0,r,X0,T0,H8){if(H8===!0)O0*=T0,r*=T0,X0*=T0;if(W0.set(O0,r,X0,T0),Y0.equals(W0)===!1)J.clearColor(O0,r,X0,T0),Y0.copy(W0)},reset:function(){S=!1,s=null,Y0.set(-1,0,0,0)}}}function Z(){let S=!1,W0=!1,s=null,Y0=null,O0=null;return{setReversed:function(r){if(W0!==r){let X0=Q.get("EXT_clip_control");if(r)X0.clipControlEXT(X0.LOWER_LEFT_EXT,X0.ZERO_TO_ONE_EXT);else X0.clipControlEXT(X0.LOWER_LEFT_EXT,X0.NEGATIVE_ONE_TO_ONE_EXT);W0=r;let T0=O0;O0=null,this.setClear(T0)}},getReversed:function(){return W0},setTest:function(r){if(r)H0(J.DEPTH_TEST);else L0(J.DEPTH_TEST)},setMask:function(r){if(s!==r&&!S)J.depthMask(r),s=r},setFunc:function(r){if(W0)r=zW[r];if(Y0!==r){switch(r){case oZ:J.depthFunc(J.NEVER);break;case aZ:J.depthFunc(J.ALWAYS);break;case rZ:J.depthFunc(J.LESS);break;case iJ:J.depthFunc(J.LEQUAL);break;case tZ:J.depthFunc(J.EQUAL);break;case eZ:J.depthFunc(J.GEQUAL);break;case JW:J.depthFunc(J.GREATER);break;case QW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}Y0=r}},setLocked:function(r){S=r},setClear:function(r){if(O0!==r){if(O0=r,W0)r=1-r;J.clearDepth(r)}},reset:function(){S=!1,s=null,Y0=null,O0=null,W0=!1}}}function W(){let S=!1,W0=null,s=null,Y0=null,O0=null,r=null,X0=null,T0=null,H8=null;return{setTest:function(J8){if(!S)if(J8)H0(J.STENCIL_TEST);else L0(J.STENCIL_TEST)},setMask:function(J8){if(W0!==J8&&!S)J.stencilMask(J8),W0=J8},setFunc:function(J8,t8,H9){if(s!==J8||Y0!==t8||O0!==H9)J.stencilFunc(J8,t8,H9),s=J8,Y0=t8,O0=H9},setOp:function(J8,t8,H9){if(r!==J8||X0!==t8||T0!==H9)J.stencilOp(J8,t8,H9),r=J8,X0=t8,T0=H9},setLocked:function(J8){S=J8},setClear:function(J8){if(H8!==J8)J.clearStencil(J8),H8=J8},reset:function(){S=!1,W0=null,s=null,Y0=null,O0=null,r=null,X0=null,T0=null,H8=null}}}let K=new $,H=new Z,Y=new W,X=new WeakMap,U=new WeakMap,E={},N={},G={},F=new WeakMap,R=[],z=null,D=!1,q=null,_=null,A=null,L=null,I=null,C=null,w=null,M=new p0(0,0,0),B=0,d=!1,P=null,h=null,o=null,g=null,c=null,p=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),f=!1,a=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(e)[1]),f=a>=1;else if(e.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),f=a>=2;let J0=null,k0={},D0=J.getParameter(J.SCISSOR_BOX),l0=J.getParameter(J.VIEWPORT),u0=new K8().fromArray(D0),n=new K8().fromArray(l0);function Z0(S,W0,s,Y0){let O0=new Uint8Array(4),r=J.createTexture();J.bindTexture(S,r),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let X0=0;X0<s;X0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D(W0,0,J.RGBA,1,1,Y0,0,J.RGBA,J.UNSIGNED_BYTE,O0);else J.texImage2D(W0+X0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,O0);return r}let K0={};K0[J.TEXTURE_2D]=Z0(J.TEXTURE_2D,J.TEXTURE_2D,1),K0[J.TEXTURE_CUBE_MAP]=Z0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),K0[J.TEXTURE_2D_ARRAY]=Z0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),K0[J.TEXTURE_3D]=Z0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),H0(J.DEPTH_TEST),H.setFunc(iJ),p8(!1),$8(uJ),H0(J.CULL_FACE),x0($9);function H0(S){if(E[S]!==!0)J.enable(S),E[S]=!0}function L0(S){if(E[S]!==!1)J.disable(S),E[S]=!1}function j0(S,W0){if(G[S]!==W0){if(J.bindFramebuffer(S,W0),G[S]=W0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=W0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=W0;return!0}return!1}function f0(S,W0){let s=R,Y0=!1;if(S){if(s=F.get(W0),s===void 0)s=[],F.set(W0,s);let O0=S.textures;if(s.length!==O0.length||s[0]!==J.COLOR_ATTACHMENT0){for(let r=0,X0=O0.length;r<X0;r++)s[r]=J.COLOR_ATTACHMENT0+r;s.length=O0.length,Y0=!0}}else if(s[0]!==J.BACK)s[0]=J.BACK,Y0=!0;if(Y0)J.drawBuffers(s)}function y0(S){if(z!==S)return J.useProgram(S),z=S,!0;return!1}let o0={[L6]:J.FUNC_ADD,[TZ]:J.FUNC_SUBTRACT,[SZ]:J.FUNC_REVERSE_SUBTRACT};o0[jZ]=J.MIN,o0[vZ]=J.MAX;let h0={[fZ]:J.ZERO,[yZ]:J.ONE,[bZ]:J.SRC_COLOR,[xZ]:J.SRC_ALPHA,[uZ]:J.SRC_ALPHA_SATURATE,[lZ]:J.DST_COLOR,[pZ]:J.DST_ALPHA,[hZ]:J.ONE_MINUS_SRC_COLOR,[gZ]:J.ONE_MINUS_SRC_ALPHA,[dZ]:J.ONE_MINUS_DST_COLOR,[mZ]:J.ONE_MINUS_DST_ALPHA,[cZ]:J.CONSTANT_COLOR,[nZ]:J.ONE_MINUS_CONSTANT_COLOR,[sZ]:J.CONSTANT_ALPHA,[iZ]:J.ONE_MINUS_CONSTANT_ALPHA};function x0(S,W0,s,Y0,O0,r,X0,T0,H8,J8){if(S===$9){if(D===!0)L0(J.BLEND),D=!1;return}if(D===!1)H0(J.BLEND),D=!0;if(S!==wZ){if(S!==q||J8!==d){if(_!==L6||I!==L6)J.blendEquation(J.FUNC_ADD),_=L6,I=L6;if(J8)switch(S){case h6:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case cJ:J.blendFunc(J.ONE,J.ONE);break;case nJ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case sJ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:P0("WebGLState: Invalid blending: ",S);break}else switch(S){case h6:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case cJ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case nJ:P0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case sJ:P0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:P0("WebGLState: Invalid blending: ",S);break}A=null,L=null,C=null,w=null,M.set(0,0,0),B=0,q=S,d=J8}return}if(O0=O0||W0,r=r||s,X0=X0||Y0,W0!==_||O0!==I)J.blendEquationSeparate(o0[W0],o0[O0]),_=W0,I=O0;if(s!==A||Y0!==L||r!==C||X0!==w)J.blendFuncSeparate(h0[s],h0[Y0],h0[r],h0[X0]),A=s,L=Y0,C=r,w=X0;if(T0.equals(M)===!1||H8!==B)J.blendColor(T0.r,T0.g,T0.b,H8),M.copy(T0),B=H8;q=S,d=!1}function D8(S,W0){S.side===Q9?L0(J.CULL_FACE):H0(J.CULL_FACE);let s=S.side===w8;if(W0)s=!s;p8(s),S.blending===h6&&S.transparent===!1?x0($9):x0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),K.setMask(S.colorWrite);let Y0=S.stencilWrite;if(Y.setTest(Y0),Y0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);O8(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?H0(J.SAMPLE_ALPHA_TO_COVERAGE):L0(J.SAMPLE_ALPHA_TO_COVERAGE)}function p8(S){if(P!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);P=S}}function $8(S){if(S!==CZ){if(H0(J.CULL_FACE),S!==h)if(S===uJ)J.cullFace(J.BACK);else if(S===AZ)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else L0(J.CULL_FACE);h=S}function k8(S){if(S!==o){if(f)J.lineWidth(S);o=S}}function O8(S,W0,s){if(S){if(H0(J.POLYGON_OFFSET_FILL),g!==W0||c!==s){if(g=W0,c=s,H.getReversed())W0=-W0;J.polygonOffset(W0,s)}}else L0(J.POLYGON_OFFSET_FILL)}function E8(S){if(S)H0(J.SCISSOR_TEST);else L0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+p-1;if(J0!==S)J.activeTexture(S),J0=S}function m8(S,W0,s){if(s===void 0)if(J0===null)s=J.TEXTURE0+p-1;else s=J0;let Y0=k0[s];if(Y0===void 0)Y0={type:void 0,texture:void 0},k0[s]=Y0;if(Y0.type!==S||Y0.texture!==W0){if(J0!==s)J.activeTexture(s),J0=s;J.bindTexture(S,W0||K0[S]),Y0.type=S,Y0.texture=W0}}function s0(){let S=k0[J0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function Z8(){try{J.compressedTexImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function V(){try{J.compressedTexImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function O(){try{J.texSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function l(){try{J.compressedTexSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function t(){try{J.compressedTexSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function Q0(){try{J.texStorage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function U0(){try{J.texStorage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function u(){try{J.texImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function i(){try{J.texImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function F0(S){if(N[S]!==void 0)return N[S];else return J.getParameter(S)}function B0(S,W0){if(N[S]!==W0)J.pixelStorei(S,W0),N[S]=W0}function G0(S){if(u0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),u0.copy(S)}function $0(S){if(n.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),n.copy(S)}function _0(S,W0){let s=U.get(W0);if(s===void 0)s=new WeakMap,U.set(W0,s);let Y0=s.get(S);if(Y0===void 0)Y0=J.getUniformBlockIndex(W0,S.name),s.set(S,Y0)}function A0(S,W0){let Y0=U.get(W0).get(S);if(X.get(W0)!==Y0)J.uniformBlockBinding(W0,Y0,S.__bindingPointIndex),X.set(W0,Y0)}function c0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),E={},N={},J0=null,k0={},G={},F=new WeakMap,R=[],z=null,D=!1,q=null,_=null,A=null,L=null,I=null,C=null,w=null,M=new p0(0,0,0),B=0,d=!1,P=null,h=null,o=null,g=null,c=null,u0.set(0,0,J.canvas.width,J.canvas.height),n.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:H0,disable:L0,bindFramebuffer:j0,drawBuffers:f0,useProgram:y0,setBlending:x0,setMaterial:D8,setFlipSided:p8,setCullFace:$8,setLineWidth:k8,setPolygonOffset:O8,setScissorTest:E8,activeTexture:j,bindTexture:m8,unbindTexture:s0,compressedTexImage2D:Z8,compressedTexImage3D:V,texImage2D:u,texImage3D:i,pixelStorei:B0,getParameter:F0,updateUBOMapping:_0,uniformBlockBinding:A0,texStorage2D:Q0,texStorage3D:U0,texSubImage2D:O,texSubImage3D:T,compressedTexSubImage2D:l,compressedTexSubImage3D:t,scissor:G0,viewport:$0,reset:c0}}function Z1(J,Q,$,Z,W,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new n0,E=new WeakMap,N=new Set,G,F=new WeakMap,R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(V){}function z(V,O){return R?new OffscreenCanvas(V,O):y6("canvas")}function D(V,O,T){let l=1,t=Z8(V);if(t.width>T||t.height>T)l=T/Math.max(t.width,t.height);if(l<1)if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&V instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&V instanceof ImageBitmap||typeof VideoFrame<"u"&&V instanceof VideoFrame){let Q0=Math.floor(l*t.width),U0=Math.floor(l*t.height);if(G===void 0)G=z(Q0,U0);let u=O?z(Q0,U0):G;return u.width=Q0,u.height=U0,u.getContext("2d").drawImage(V,0,0,Q0,U0),C0("WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+Q0+"x"+U0+")."),u}else{if("data"in V)C0("WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+").");return V}return V}function q(V){return V.generateMipmaps}function _(V){J.generateMipmap(V)}function A(V){if(V.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(V.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(V.isWebGLArrayRenderTarget||V.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function L(V,O,T,l,t,Q0=!1){if(V!==null){if(J[V]!==void 0)return J[V];C0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+V+"'")}let U0;if(l){if(U0=Q.get("EXT_texture_norm16"),!U0)C0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let u=O;if(O===J.RED){if(T===J.FLOAT)u=J.R32F;if(T===J.HALF_FLOAT)u=J.R16F;if(T===J.UNSIGNED_BYTE)u=J.R8;if(T===J.UNSIGNED_SHORT&&U0)u=U0.R16_EXT;if(T===J.SHORT&&U0)u=U0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.R8UI;if(T===J.UNSIGNED_SHORT)u=J.R16UI;if(T===J.UNSIGNED_INT)u=J.R32UI;if(T===J.BYTE)u=J.R8I;if(T===J.SHORT)u=J.R16I;if(T===J.INT)u=J.R32I}if(O===J.RG){if(T===J.FLOAT)u=J.RG32F;if(T===J.HALF_FLOAT)u=J.RG16F;if(T===J.UNSIGNED_BYTE)u=J.RG8;if(T===J.UNSIGNED_SHORT&&U0)u=U0.RG16_EXT;if(T===J.SHORT&&U0)u=U0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.RG8UI;if(T===J.UNSIGNED_SHORT)u=J.RG16UI;if(T===J.UNSIGNED_INT)u=J.RG32UI;if(T===J.BYTE)u=J.RG8I;if(T===J.SHORT)u=J.RG16I;if(T===J.INT)u=J.RG32I}if(O===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.RGB8UI;if(T===J.UNSIGNED_SHORT)u=J.RGB16UI;if(T===J.UNSIGNED_INT)u=J.RGB32UI;if(T===J.BYTE)u=J.RGB8I;if(T===J.SHORT)u=J.RGB16I;if(T===J.INT)u=J.RGB32I}if(O===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)u=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)u=J.RGBA16UI;if(T===J.UNSIGNED_INT)u=J.RGBA32UI;if(T===J.BYTE)u=J.RGBA8I;if(T===J.SHORT)u=J.RGBA16I;if(T===J.INT)u=J.RGBA32I}if(O===J.RGB){if(T===J.UNSIGNED_SHORT&&U0)u=U0.RGB16_EXT;if(T===J.SHORT&&U0)u=U0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)u=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)u=J.R11F_G11F_B10F}if(O===J.RGBA){let i=Q0?pQ:g0.getTransfer(t);if(T===J.FLOAT)u=J.RGBA32F;if(T===J.HALF_FLOAT)u=J.RGBA16F;if(T===J.UNSIGNED_BYTE)u=i===e0?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&U0)u=U0.RGBA16_EXT;if(T===J.SHORT&&U0)u=U0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)u=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)u=J.RGB5_A1}if(u===J.R16F||u===J.R32F||u===J.RG16F||u===J.RG32F||u===J.RGBA16F||u===J.RGBA32F)Q.get("EXT_color_buffer_float");return u}function I(V,O){let T;if(V){if(O===null||O===w9||O===B6)T=J.DEPTH24_STENCIL8;else if(O===F9)T=J.DEPTH32F_STENCIL8;else if(O===p6)T=J.DEPTH24_STENCIL8,C0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===w9||O===B6)T=J.DEPTH_COMPONENT24;else if(O===F9)T=J.DEPTH_COMPONENT32F;else if(O===p6)T=J.DEPTH_COMPONENT16;return T}function C(V,O){if(q(V)===!0||V.isFramebufferTexture&&V.minFilter!==P9&&V.minFilter!==_8)return Math.log2(Math.max(O.width,O.height))+1;else if(V.mipmaps!==void 0&&V.mipmaps.length>0)return V.mipmaps.length;else if(V.isCompressedTexture&&Array.isArray(V.image))return O.mipmaps.length;else return 1}function w(V){let O=V.target;if(O.removeEventListener("dispose",w),B(O),O.isVideoTexture)E.delete(O);if(O.isHTMLTexture)N.delete(O)}function M(V){let O=V.target;O.removeEventListener("dispose",M),P(O)}function B(V){let O=Z.get(V);if(O.__webglInit===void 0)return;let T=V.source,l=F.get(T);if(l){let t=l[O.__cacheKey];if(t.usedTimes--,t.usedTimes===0)d(V);if(Object.keys(l).length===0)F.delete(T)}Z.remove(V)}function d(V){let O=Z.get(V);J.deleteTexture(O.__webglTexture);let T=V.source,l=F.get(T);delete l[O.__cacheKey],H.memory.textures--}function P(V){let O=Z.get(V);if(V.depthTexture)V.depthTexture.dispose(),Z.remove(V.depthTexture);if(V.isWebGLCubeRenderTarget)for(let l=0;l<6;l++){if(Array.isArray(O.__webglFramebuffer[l]))for(let t=0;t<O.__webglFramebuffer[l].length;t++)J.deleteFramebuffer(O.__webglFramebuffer[l][t]);else J.deleteFramebuffer(O.__webglFramebuffer[l]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[l])}else{if(Array.isArray(O.__webglFramebuffer))for(let l=0;l<O.__webglFramebuffer.length;l++)J.deleteFramebuffer(O.__webglFramebuffer[l]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let l=0;l<O.__webglColorRenderbuffer.length;l++)if(O.__webglColorRenderbuffer[l])J.deleteRenderbuffer(O.__webglColorRenderbuffer[l])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let T=V.textures;for(let l=0,t=T.length;l<t;l++){let Q0=Z.get(T[l]);if(Q0.__webglTexture)J.deleteTexture(Q0.__webglTexture),H.memory.textures--;Z.remove(T[l])}Z.remove(V)}let h=0;function o(){h=0}function g(){return h}function c(V){h=V}function p(){let V=h;if(V>=W.maxTextures)C0("WebGLTextures: Trying to use "+V+" texture units while this GPU supports only "+W.maxTextures);return h+=1,V}function f(V){let O=[];return O.push(V.wrapS),O.push(V.wrapT),O.push(V.wrapR||0),O.push(V.magFilter),O.push(V.minFilter),O.push(V.anisotropy),O.push(V.internalFormat),O.push(V.format),O.push(V.type),O.push(V.generateMipmaps),O.push(V.premultiplyAlpha),O.push(V.flipY),O.push(V.unpackAlignment),O.push(V.colorSpace),O.join()}function a(V,O){let T=Z.get(V);if(V.isVideoTexture)m8(V);if(V.isRenderTargetTexture===!1&&V.isExternalTexture!==!0&&V.version>0&&T.__version!==V.version){let l=V.image;if(l===null)C0("WebGLRenderer: Texture marked for update but no image data found.");else if(l.complete===!1)C0("WebGLRenderer: Texture marked for update but image is incomplete");else{L0(T,V,O);return}}else if(V.isExternalTexture)T.__webglTexture=V.sourceTexture?V.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+O)}function e(V,O){let T=Z.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&T.__version!==V.version){L0(T,V,O);return}else if(V.isExternalTexture)T.__webglTexture=V.sourceTexture?V.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+O)}function J0(V,O){let T=Z.get(V);if(V.isRenderTargetTexture===!1&&V.version>0&&T.__version!==V.version){L0(T,V,O);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+O)}function k0(V,O){let T=Z.get(V);if(V.isCubeDepthTexture!==!0&&V.version>0&&T.__version!==V.version){j0(T,V,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+O)}let D0={[w7]:J.REPEAT,[T7]:J.CLAMP_TO_EDGE,[KW]:J.MIRRORED_REPEAT},l0={[P9]:J.NEAREST,[HW]:J.NEAREST_MIPMAP_NEAREST,[g6]:J.NEAREST_MIPMAP_LINEAR,[_8]:J.LINEAR,[S7]:J.LINEAR_MIPMAP_NEAREST,[m9]:J.LINEAR_MIPMAP_LINEAR},u0={[FW]:J.NEVER,[kW]:J.ALWAYS,[DW]:J.LESS,[p7]:J.LEQUAL,[OW]:J.EQUAL,[m7]:J.GEQUAL,[MW]:J.GREATER,[RW]:J.NOTEQUAL};function n(V,O){if(O.type===F9&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===_8||O.magFilter===S7||O.magFilter===g6||O.magFilter===m9||O.minFilter===_8||O.minFilter===S7||O.minFilter===g6||O.minFilter===m9))C0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(V,J.TEXTURE_WRAP_S,D0[O.wrapS]),J.texParameteri(V,J.TEXTURE_WRAP_T,D0[O.wrapT]),V===J.TEXTURE_3D||V===J.TEXTURE_2D_ARRAY)J.texParameteri(V,J.TEXTURE_WRAP_R,D0[O.wrapR]);if(J.texParameteri(V,J.TEXTURE_MAG_FILTER,l0[O.magFilter]),J.texParameteri(V,J.TEXTURE_MIN_FILTER,l0[O.minFilter]),O.compareFunction)J.texParameteri(V,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(V,J.TEXTURE_COMPARE_FUNC,u0[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===P9)return;if(O.minFilter!==g6&&O.minFilter!==m9)return;if(O.type===F9&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||Z.get(O).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(V,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,W.getMaxAnisotropy())),Z.get(O).__currentAnisotropy=O.anisotropy}}}function Z0(V,O){let T=!1;if(V.__webglInit===void 0)V.__webglInit=!0,O.addEventListener("dispose",w);let l=O.source,t=F.get(l);if(t===void 0)t={},F.set(l,t);let Q0=f(O);if(Q0!==V.__cacheKey){if(t[Q0]===void 0)t[Q0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;t[Q0].usedTimes++;let U0=t[V.__cacheKey];if(U0!==void 0){if(t[V.__cacheKey].usedTimes--,U0.usedTimes===0)d(O)}V.__cacheKey=Q0,V.__webglTexture=t[Q0].texture}return T}function K0(V,O,T){return Math.floor(Math.floor(V/T)/O)}function H0(V,O,T,l){let Q0=V.updateRanges;if(Q0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,T,l,O.data);else{Q0.sort((B0,G0)=>B0.start-G0.start);let U0=0;for(let B0=1;B0<Q0.length;B0++){let G0=Q0[U0],$0=Q0[B0],_0=G0.start+G0.count,A0=K0($0.start,O.width,4),c0=K0(G0.start,O.width,4);if($0.start<=_0+1&&A0===c0&&K0($0.start+$0.count-1,O.width,4)===A0)G0.count=Math.max(G0.count,$0.start+$0.count-G0.start);else++U0,Q0[U0]=$0}Q0.length=U0+1;let u=$.getParameter(J.UNPACK_ROW_LENGTH),i=$.getParameter(J.UNPACK_SKIP_PIXELS),F0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let B0=0,G0=Q0.length;B0<G0;B0++){let $0=Q0[B0],_0=Math.floor($0.start/4),A0=Math.ceil($0.count/4),c0=_0%O.width,S=Math.floor(_0/O.width),W0=A0,s=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,c0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,c0,S,W0,1,T,l,O.data)}V.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,u),$.pixelStorei(J.UNPACK_SKIP_PIXELS,i),$.pixelStorei(J.UNPACK_SKIP_ROWS,F0)}}function L0(V,O,T){let l=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)l=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)l=J.TEXTURE_3D;let t=Z0(V,O),Q0=O.source;$.bindTexture(l,V.__webglTexture,J.TEXTURE0+T);let U0=Z.get(Q0);if(Q0.version!==U0.__version||t===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let s=g0.getPrimaries(g0.workingColorSpace),Y0=O.colorSpace===c9?null:g0.getPrimaries(O.colorSpace),O0=O.colorSpace===c9||s===Y0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,O0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let i=D(O.image,!1,W.maxTextureSize);i=s0(O,i);let F0=K.convert(O.format,O.colorSpace),B0=K.convert(O.type),G0=L(O.internalFormat,F0,B0,O.normalized,O.colorSpace,O.isVideoTexture);n(l,O);let $0,_0=O.mipmaps,A0=O.isVideoTexture!==!0,c0=U0.__version===void 0||t===!0,S=Q0.dataReady,W0=C(O,i);if(O.isDepthTexture){if(G0=I(O.format===d9,O.type),c0)if(A0)$.texStorage2D(J.TEXTURE_2D,1,G0,i.width,i.height);else $.texImage2D(J.TEXTURE_2D,0,G0,i.width,i.height,0,F0,B0,null)}else if(O.isDataTexture)if(_0.length>0){if(A0&&c0)$.texStorage2D(J.TEXTURE_2D,W0,G0,_0[0].width,_0[0].height);for(let s=0,Y0=_0.length;s<Y0;s++)if($0=_0[s],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,s,0,0,$0.width,$0.height,F0,B0,$0.data)}else $.texImage2D(J.TEXTURE_2D,s,G0,$0.width,$0.height,0,F0,B0,$0.data);O.generateMipmaps=!1}else if(A0){if(c0)$.texStorage2D(J.TEXTURE_2D,W0,G0,i.width,i.height);if(S)H0(O,i,F0,B0)}else $.texImage2D(J.TEXTURE_2D,0,G0,i.width,i.height,0,F0,B0,i.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(A0&&c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,W0,G0,_0[0].width,_0[0].height,i.depth);for(let s=0,Y0=_0.length;s<Y0;s++)if($0=_0[s],O.format!==Z9)if(F0!==null)if(A0){if(S)if(O.layerUpdates.size>0){let O0=M$($0.width,$0.height,O.format,O.type);for(let r of O.layerUpdates){let X0=$0.data.subarray(r*O0/$0.data.BYTES_PER_ELEMENT,(r+1)*O0/$0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,r,$0.width,$0.height,1,F0,X0)}O.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,$0.width,$0.height,i.depth,F0,$0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,s,G0,$0.width,$0.height,i.depth,0,$0.data,0,0);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,s,0,0,0,$0.width,$0.height,i.depth,F0,B0,$0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,s,G0,$0.width,$0.height,i.depth,0,F0,B0,$0.data)}else{if(A0&&c0)$.texStorage2D(J.TEXTURE_2D,W0,G0,_0[0].width,_0[0].height);for(let s=0,Y0=_0.length;s<Y0;s++)if($0=_0[s],O.format!==Z9)if(F0!==null)if(A0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,s,0,0,$0.width,$0.height,F0,$0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,s,G0,$0.width,$0.height,0,$0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage2D(J.TEXTURE_2D,s,0,0,$0.width,$0.height,F0,B0,$0.data)}else $.texImage2D(J.TEXTURE_2D,s,G0,$0.width,$0.height,0,F0,B0,$0.data)}else if(O.isDataArrayTexture)if(A0){if(c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,W0,G0,i.width,i.height,i.depth);if(S)if(O.layerUpdates.size>0){let s=M$(i.width,i.height,O.format,O.type);for(let Y0 of O.layerUpdates){let O0=i.data.subarray(Y0*s/i.data.BYTES_PER_ELEMENT,(Y0+1)*s/i.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,Y0,i.width,i.height,1,F0,B0,O0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,i.width,i.height,i.depth,F0,B0,i.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,G0,i.width,i.height,i.depth,0,F0,B0,i.data);else if(O.isData3DTexture)if(A0){if(c0)$.texStorage3D(J.TEXTURE_3D,W0,G0,i.width,i.height,i.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,i.width,i.height,i.depth,F0,B0,i.data)}else $.texImage3D(J.TEXTURE_3D,0,G0,i.width,i.height,i.depth,0,F0,B0,i.data);else if(O.isFramebufferTexture){if(c0)if(A0)$.texStorage2D(J.TEXTURE_2D,W0,G0,i.width,i.height);else{let{width:s,height:Y0}=i;for(let O0=0;O0<W0;O0++)$.texImage2D(J.TEXTURE_2D,O0,G0,s,Y0,0,F0,B0,null),s>>=1,Y0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let s=J.canvas;if(!s.hasAttribute("layoutsubtree"))s.setAttribute("layoutsubtree","true");if(i.parentNode!==s){s.appendChild(i),N.add(O),s.onpaint=(Y0)=>{let O0=Y0.changedElements;for(let r of N)if(O0.includes(r.image))r.needsUpdate=!0},s.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,i);else{let{RGBA:O0,RGBA:r,UNSIGNED_BYTE:X0}=J;J.texElementImage2D(J.TEXTURE_2D,0,O0,r,X0,i)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(_0.length>0){if(A0&&c0){let s=Z8(_0[0]);$.texStorage2D(J.TEXTURE_2D,W0,G0,s.width,s.height)}for(let s=0,Y0=_0.length;s<Y0;s++)if($0=_0[s],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,s,0,0,F0,B0,$0)}else $.texImage2D(J.TEXTURE_2D,s,G0,F0,B0,$0);O.generateMipmaps=!1}else if(A0){if(c0){let s=Z8(i);$.texStorage2D(J.TEXTURE_2D,W0,G0,s.width,s.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,F0,B0,i)}else $.texImage2D(J.TEXTURE_2D,0,G0,F0,B0,i);if(q(O))_(l);if(U0.__version=Q0.version,O.onUpdate)O.onUpdate(O)}V.__version=O.version}function j0(V,O,T){if(O.image.length!==6)return;let l=Z0(V,O),t=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,V.__webglTexture,J.TEXTURE0+T);let Q0=Z.get(t);if(t.version!==Q0.__version||l===!0){$.activeTexture(J.TEXTURE0+T);let U0=g0.getPrimaries(g0.workingColorSpace),u=O.colorSpace===c9?null:g0.getPrimaries(O.colorSpace),i=O.colorSpace===c9||U0===u?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,i);let F0=O.isCompressedTexture||O.image[0].isCompressedTexture,B0=O.image[0]&&O.image[0].isDataTexture,G0=[];for(let r=0;r<6;r++){if(!F0&&!B0)G0[r]=D(O.image[r],!0,W.maxCubemapSize);else G0[r]=B0?O.image[r].image:O.image[r];G0[r]=s0(O,G0[r])}let $0=G0[0],_0=K.convert(O.format,O.colorSpace),A0=K.convert(O.type),c0=L(O.internalFormat,_0,A0,O.normalized,O.colorSpace),S=O.isVideoTexture!==!0,W0=Q0.__version===void 0||l===!0,s=t.dataReady,Y0=C(O,$0);n(J.TEXTURE_CUBE_MAP,O);let O0;if(F0){if(S&&W0)$.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,$0.width,$0.height);for(let r=0;r<6;r++){O0=G0[r].mipmaps;for(let X0=0;X0<O0.length;X0++){let T0=O0[X0];if(O.format!==Z9)if(_0!==null)if(S){if(s)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,0,0,T0.width,T0.height,_0,T0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,c0,T0.width,T0.height,0,T0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,0,0,T0.width,T0.height,_0,A0,T0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,c0,T0.width,T0.height,0,_0,A0,T0.data)}}}else{if(O0=O.mipmaps,S&&W0){if(O0.length>0)Y0++;let r=Z8(G0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,r.width,r.height)}for(let r=0;r<6;r++)if(B0){if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,G0[r].width,G0[r].height,_0,A0,G0[r].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,G0[r].width,G0[r].height,0,_0,A0,G0[r].data);for(let X0=0;X0<O0.length;X0++){let H8=O0[X0].image[r].image;if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,0,0,H8.width,H8.height,_0,A0,H8.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,c0,H8.width,H8.height,0,_0,A0,H8.data)}}else{if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,_0,A0,G0[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,_0,A0,G0[r]);for(let X0=0;X0<O0.length;X0++){let T0=O0[X0];if(S){if(s)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,0,0,_0,A0,T0.image[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,c0,_0,A0,T0.image[r])}}}if(q(O))_(J.TEXTURE_CUBE_MAP);if(Q0.__version=t.version,O.onUpdate)O.onUpdate(O)}V.__version=O.version}function f0(V,O,T,l,t,Q0){let U0=K.convert(T.format,T.colorSpace),u=K.convert(T.type),i=L(T.internalFormat,U0,u,T.normalized,T.colorSpace),F0=Z.get(O),B0=Z.get(T);if(B0.__renderTarget=O,!F0.__hasExternalTextures){let G0=Math.max(1,O.width>>Q0),$0=Math.max(1,O.height>>Q0);if(t===J.TEXTURE_3D||t===J.TEXTURE_2D_ARRAY)$.texImage3D(t,Q0,i,G0,$0,O.depth,0,U0,u,null);else $.texImage2D(t,Q0,i,G0,$0,0,U0,u,null)}if($.bindFramebuffer(J.FRAMEBUFFER,V),j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,l,t,B0.__webglTexture,0,E8(O));else if(t===J.TEXTURE_2D||t>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&t<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,l,t,B0.__webglTexture,Q0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function y0(V,O,T){if(J.bindRenderbuffer(J.RENDERBUFFER,V),O.depthBuffer){let l=O.depthTexture,t=l&&l.isDepthTexture?l.type:null,Q0=I(O.stencilBuffer,t),U0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(O),Q0,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(O),Q0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,Q0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,U0,J.RENDERBUFFER,V)}else{let l=O.textures;for(let t=0;t<l.length;t++){let Q0=l[t],U0=K.convert(Q0.format,Q0.colorSpace),u=K.convert(Q0.type),i=L(Q0.internalFormat,U0,u,Q0.normalized,Q0.colorSpace);if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(O),i,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(O),i,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,i,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function o0(V,O,T){let l=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,V),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let t=Z.get(O.depthTexture);if(t.__renderTarget=O,!t.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(l){if(t.__webglInit===void 0)t.__webglInit=!0,O.depthTexture.addEventListener("dispose",w);if(t.__webglTexture===void 0){t.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,t.__webglTexture),n(J.TEXTURE_CUBE_MAP,O.depthTexture);let F0=K.convert(O.depthTexture.format),B0=K.convert(O.depthTexture.type),G0;if(O.depthTexture.format===l9)G0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===d9)G0=J.DEPTH24_STENCIL8;for(let $0=0;$0<6;$0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+$0,0,G0,O.width,O.height,0,F0,B0,null)}}else a(O.depthTexture,0);let Q0=t.__webglTexture,U0=E8(O),u=l?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,i=O.depthTexture.format===d9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===l9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,Q0,0,U0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,Q0,0);else if(O.depthTexture.format===d9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,i,u,Q0,0,U0);else J.framebufferTexture2D(J.FRAMEBUFFER,i,u,Q0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function h0(V){let O=Z.get(V),T=V.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==V.depthTexture){let l=V.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(l){let t=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,l.removeEventListener("dispose",t)};l.addEventListener("dispose",t),O.__depthDisposeCallback=t}O.__boundDepthTexture=l}if(V.depthTexture&&!O.__autoAllocateDepthBuffer)if(T)for(let l=0;l<6;l++)o0(O.__webglFramebuffer[l],V,l);else{let l=V.texture.mipmaps;if(l&&l.length>0)o0(O.__webglFramebuffer[0],V,0);else o0(O.__webglFramebuffer,V,0)}else if(T){O.__webglDepthbuffer=[];for(let l=0;l<6;l++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[l]),O.__webglDepthbuffer[l]===void 0)O.__webglDepthbuffer[l]=J.createRenderbuffer(),y0(O.__webglDepthbuffer[l],V,!1);else{let t=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,Q0=O.__webglDepthbuffer[l];J.bindRenderbuffer(J.RENDERBUFFER,Q0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,Q0)}}else{let l=V.texture.mipmaps;if(l&&l.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),y0(O.__webglDepthbuffer,V,!1);else{let t=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,Q0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,Q0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,Q0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function x0(V,O,T){let l=Z.get(V);if(O!==void 0)f0(l.__webglFramebuffer,V,V.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)h0(V)}function D8(V){let O=V.texture,T=Z.get(V),l=Z.get(O);V.addEventListener("dispose",M);let t=V.textures,Q0=V.isWebGLCubeRenderTarget===!0,U0=t.length>1;if(!U0){if(l.__webglTexture===void 0)l.__webglTexture=J.createTexture();l.__version=O.version,H.memory.textures++}if(Q0){T.__webglFramebuffer=[];for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer[u]=[];for(let i=0;i<O.mipmaps.length;i++)T.__webglFramebuffer[u][i]=J.createFramebuffer()}else T.__webglFramebuffer[u]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer=[];for(let u=0;u<O.mipmaps.length;u++)T.__webglFramebuffer[u]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(U0)for(let u=0,i=t.length;u<i;u++){let F0=Z.get(t[u]);if(F0.__webglTexture===void 0)F0.__webglTexture=J.createTexture(),H.memory.textures++}if(V.samples>0&&j(V)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let u=0;u<t.length;u++){let i=t[u];T.__webglColorRenderbuffer[u]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[u]);let F0=K.convert(i.format,i.colorSpace),B0=K.convert(i.type),G0=L(i.internalFormat,F0,B0,i.normalized,i.colorSpace,V.isXRRenderTarget===!0),$0=E8(V);J.renderbufferStorageMultisample(J.RENDERBUFFER,$0,G0,V.width,V.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+u,J.RENDERBUFFER,T.__webglColorRenderbuffer[u])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),V.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),y0(T.__webglDepthRenderbuffer,V,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(Q0){$.bindTexture(J.TEXTURE_CUBE_MAP,l.__webglTexture),n(J.TEXTURE_CUBE_MAP,O);for(let u=0;u<6;u++)if(O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)f0(T.__webglFramebuffer[u][i],V,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,i);else f0(T.__webglFramebuffer[u],V,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+u,0);if(q(O))_(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(U0){for(let u=0,i=t.length;u<i;u++){let F0=t[u],B0=Z.get(F0),G0=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)G0=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(G0,B0.__webglTexture),n(G0,F0),f0(T.__webglFramebuffer,V,F0,J.COLOR_ATTACHMENT0+u,G0,0),q(F0))_(G0)}$.unbindTexture()}else{let u=J.TEXTURE_2D;if(V.isWebGL3DRenderTarget||V.isWebGLArrayRenderTarget)u=V.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(u,l.__webglTexture),n(u,O),O.mipmaps&&O.mipmaps.length>0)for(let i=0;i<O.mipmaps.length;i++)f0(T.__webglFramebuffer[i],V,O,J.COLOR_ATTACHMENT0,u,i);else f0(T.__webglFramebuffer,V,O,J.COLOR_ATTACHMENT0,u,0);if(q(O))_(u);$.unbindTexture()}if(V.depthBuffer)h0(V)}function p8(V){let O=V.textures;for(let T=0,l=O.length;T<l;T++){let t=O[T];if(q(t)){let Q0=A(V),U0=Z.get(t).__webglTexture;$.bindTexture(Q0,U0),_(Q0),$.unbindTexture()}}}let $8=[],k8=[];function O8(V){if(V.samples>0){if(j(V)===!1){let{textures:O,width:T,height:l}=V,t=J.COLOR_BUFFER_BIT,Q0=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,U0=Z.get(V),u=O.length>1;if(u)for(let F0=0;F0<O.length;F0++)$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,U0.__webglMultisampledFramebuffer);let i=V.texture.mipmaps;if(i&&i.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglFramebuffer);for(let F0=0;F0<O.length;F0++){if(V.resolveDepthBuffer){if(V.depthBuffer)t|=J.DEPTH_BUFFER_BIT;if(V.stencilBuffer&&V.resolveStencilBuffer)t|=J.STENCIL_BUFFER_BIT}if(u){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,U0.__webglColorRenderbuffer[F0]);let B0=Z.get(O[F0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,B0,0)}if(J.blitFramebuffer(0,0,T,l,0,0,T,l,t,J.NEAREST),X===!0){if($8.length=0,k8.length=0,$8.push(J.COLOR_ATTACHMENT0+F0),V.depthBuffer&&V.resolveDepthBuffer===!1)$8.push(Q0),k8.push(Q0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,k8);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,$8)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),u)for(let F0=0;F0<O.length;F0++){$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,U0.__webglColorRenderbuffer[F0]);let B0=Z.get(O[F0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,B0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglMultisampledFramebuffer)}else if(V.depthBuffer&&V.resolveDepthBuffer===!1&&X){let O=V.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function E8(V){return Math.min(W.maxSamples,V.samples)}function j(V){let O=Z.get(V);return V.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function m8(V){let O=H.render.frame;if(E.get(V)!==O)E.set(V,O),V.update()}function s0(V,O){let{colorSpace:T,format:l,type:t}=V;if(V.isCompressedTexture===!0||V.isVideoTexture===!0)return O;if(T!==gQ&&T!==c9)if(g0.getTransfer(T)===e0){if(l!==Z9||t!==h8)C0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else P0("WebGLTextures: Unsupported texture color space:",T);return O}function Z8(V){if(typeof HTMLImageElement<"u"&&V instanceof HTMLImageElement)U.width=V.naturalWidth||V.width,U.height=V.naturalHeight||V.height;else if(typeof VideoFrame<"u"&&V instanceof VideoFrame)U.width=V.displayWidth,U.height=V.displayHeight;else U.width=V.width,U.height=V.height;return U}this.allocateTextureUnit=p,this.resetTextureUnits=o,this.getTextureUnits=g,this.setTextureUnits=c,this.setTexture2D=a,this.setTexture2DArray=e,this.setTexture3D=J0,this.setTextureCube=k0,this.rebindTextures=x0,this.setupRenderTarget=D8,this.updateRenderTargetMipmap=p8,this.updateMultisampleRenderTarget=O8,this.setupDepthRenderbuffer=h0,this.setupFrameBufferTexture=f0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function W1(J,Q){function $(Z,W=c9){let K,H=g0.getTransfer(W);if(Z===h8)return J.UNSIGNED_BYTE;if(Z===ZQ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===WQ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===UW)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===GW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===YW)return J.BYTE;if(Z===XW)return J.SHORT;if(Z===p6)return J.UNSIGNED_SHORT;if(Z===$Q)return J.INT;if(Z===w9)return J.UNSIGNED_INT;if(Z===F9)return J.FLOAT;if(Z===D9)return J.HALF_FLOAT;if(Z===NW)return J.ALPHA;if(Z===EW)return J.RGB;if(Z===Z9)return J.RGBA;if(Z===l9)return J.DEPTH_COMPONENT;if(Z===d9)return J.DEPTH_STENCIL;if(Z===j7)return J.RED;if(Z===KQ)return J.RED_INTEGER;if(Z===u9)return J.RG;if(Z===HQ)return J.RG_INTEGER;if(Z===YQ)return J.RGBA_INTEGER;if(Z===v7||Z===f7||Z===y7||Z===b7)if(H===e0)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(Z===v7)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===f7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===y7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===b7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(Z===v7)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===f7)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===y7)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===b7)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===XQ||Z===UQ||Z===GQ||Z===NQ)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(Z===XQ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===UQ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===GQ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===NQ)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===EQ||Z===qQ||Z===FQ||Z===DQ||Z===OQ||Z===h7||Z===MQ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(Z===EQ||Z===qQ)return H===e0?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(Z===FQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(Z===DQ)return K.COMPRESSED_R11_EAC;if(Z===OQ)return K.COMPRESSED_SIGNED_R11_EAC;if(Z===h7)return K.COMPRESSED_RG11_EAC;if(Z===MQ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===RQ||Z===kQ||Z===LQ||Z===VQ||Z===BQ||Z===zQ||Z===IQ||Z===_Q||Z===CQ||Z===AQ||Z===PQ||Z===wQ||Z===TQ||Z===SQ)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(Z===RQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===kQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===LQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===VQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===BQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===zQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===IQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===_Q)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===CQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===AQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===PQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===wQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===TQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===SQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===jQ||Z===vQ||Z===fQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(Z===jQ)return H===e0?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===vQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===fQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===yQ||Z===bQ||Z===x7||Z===hQ)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(Z===yQ)return K.COMPRESSED_RED_RGTC1_EXT;if(Z===bQ)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===x7)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===hQ)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===B6)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var K1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H1=`
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

}`;class YK{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new e7(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new T8({vertexShader:K1,fragmentShader:H1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new x8(new j9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class XK extends O9{constructor(J,Q){super();let $=this,Z=null,W=1,K=null,H="local-floor",Y=1,X=null,U=null,E=null,N=null,G=null,F=null,R=typeof XRWebGLBinding<"u",z=new YK,D={},q=Q.getContextAttributes(),_=null,A=null,L=[],I=[],C=new n0,w=null,M=new y8;M.viewport=new K8;let B=new y8;B.viewport=new K8;let d=[M,B],P=new q$,h=null,o=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(n){let Z0=L[n];if(Z0===void 0)Z0=new d6,L[n]=Z0;return Z0.getTargetRaySpace()},this.getControllerGrip=function(n){let Z0=L[n];if(Z0===void 0)Z0=new d6,L[n]=Z0;return Z0.getGripSpace()},this.getHand=function(n){let Z0=L[n];if(Z0===void 0)Z0=new d6,L[n]=Z0;return Z0.getHandSpace()};function g(n){let Z0=I.indexOf(n.inputSource);if(Z0===-1)return;let K0=L[Z0];if(K0!==void 0)K0.update(n.inputSource,n.frame,X||K),K0.dispatchEvent({type:n.type,data:n.inputSource})}function c(){Z.removeEventListener("select",g),Z.removeEventListener("selectstart",g),Z.removeEventListener("selectend",g),Z.removeEventListener("squeeze",g),Z.removeEventListener("squeezestart",g),Z.removeEventListener("squeezeend",g),Z.removeEventListener("end",c),Z.removeEventListener("inputsourceschange",p);for(let n=0;n<L.length;n++){let Z0=I[n];if(Z0===null)continue;I[n]=null,L[n].disconnect(Z0)}h=null,o=null,z.reset();for(let n in D)delete D[n];J.setRenderTarget(_),G=null,N=null,E=null,Z=null,A=null,u0.stop(),$.isPresenting=!1,J.setPixelRatio(w),J.setSize(C.width,C.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(n){if(W=n,$.isPresenting===!0)C0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(n){if(H=n,$.isPresenting===!0)C0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(n){X=n},this.getBaseLayer=function(){return N!==null?N:G},this.getBinding=function(){if(E===null&&R)E=new XRWebGLBinding(Z,Q);return E},this.getFrame=function(){return F},this.getSession=function(){return Z},this.setSession=async function(n){if(Z=n,Z!==null){if(_=J.getRenderTarget(),Z.addEventListener("select",g),Z.addEventListener("selectstart",g),Z.addEventListener("selectend",g),Z.addEventListener("squeeze",g),Z.addEventListener("squeezestart",g),Z.addEventListener("squeezeend",g),Z.addEventListener("end",c),Z.addEventListener("inputsourceschange",p),q.xrCompatible!==!0)await Q.makeXRCompatible();if(w=J.getPixelRatio(),J.getSize(C),!(R&&("createProjectionLayer"in XRWebGLBinding.prototype))){let K0={antialias:q.antialias,alpha:!0,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:W};G=new XRWebGLLayer(Z,Q,K0),Z.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),A=new c8(G.framebufferWidth,G.framebufferHeight,{format:Z9,type:h8,colorSpace:J.outputColorSpace,stencilBuffer:q.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}else{let K0=null,H0=null,L0=null;if(q.depth)L0=q.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,K0=q.stencil?d9:l9,H0=q.stencil?B6:w9;let j0={colorFormat:Q.RGBA8,depthFormat:L0,scaleFactor:W};E=this.getBinding(),N=E.createProjectionLayer(j0),Z.updateRenderState({layers:[N]}),J.setPixelRatio(1),J.setSize(N.textureWidth,N.textureHeight,!1),A=new c8(N.textureWidth,N.textureHeight,{format:Z9,type:h8,depthTexture:new S9(N.textureWidth,N.textureHeight,H0,void 0,void 0,void 0,void 0,void 0,void 0,K0),stencilBuffer:q.stencil,colorSpace:J.outputColorSpace,samples:q.antialias?4:0,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await Z.requestReferenceSpace(H),u0.setContext(Z),u0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return z.getDepthTexture()};function p(n){for(let Z0=0;Z0<n.removed.length;Z0++){let K0=n.removed[Z0],H0=I.indexOf(K0);if(H0>=0)I[H0]=null,L[H0].disconnect(K0)}for(let Z0=0;Z0<n.added.length;Z0++){let K0=n.added[Z0],H0=I.indexOf(K0);if(H0===-1){for(let j0=0;j0<L.length;j0++)if(j0>=I.length){I.push(K0),H0=j0;break}else if(I[j0]===null){I[j0]=K0,H0=j0;break}if(H0===-1)break}let L0=L[H0];if(L0)L0.connect(K0)}}let f=new y,a=new y;function e(n,Z0,K0){f.setFromMatrixPosition(Z0.matrixWorld),a.setFromMatrixPosition(K0.matrixWorld);let H0=f.distanceTo(a),L0=Z0.projectionMatrix.elements,j0=K0.projectionMatrix.elements,f0=L0[14]/(L0[10]-1),y0=L0[14]/(L0[10]+1),o0=(L0[9]+1)/L0[5],h0=(L0[9]-1)/L0[5],x0=(L0[8]-1)/L0[0],D8=(j0[8]+1)/j0[0],p8=f0*x0,$8=f0*D8,k8=H0/(-x0+D8),O8=k8*-x0;if(Z0.matrixWorld.decompose(n.position,n.quaternion,n.scale),n.translateX(O8),n.translateZ(k8),n.matrixWorld.compose(n.position,n.quaternion,n.scale),n.matrixWorldInverse.copy(n.matrixWorld).invert(),L0[10]===-1)n.projectionMatrix.copy(Z0.projectionMatrix),n.projectionMatrixInverse.copy(Z0.projectionMatrixInverse);else{let E8=f0+k8,j=y0+k8,m8=p8-O8,s0=$8+(H0-O8),Z8=o0*y0/j*E8,V=h0*y0/j*E8;n.projectionMatrix.makePerspective(m8,s0,Z8,V,E8,j),n.projectionMatrixInverse.copy(n.projectionMatrix).invert()}}function J0(n,Z0){if(Z0===null)n.matrixWorld.copy(n.matrix);else n.matrixWorld.multiplyMatrices(Z0.matrixWorld,n.matrix);n.matrixWorldInverse.copy(n.matrixWorld).invert()}this.updateCamera=function(n){if(Z===null)return;let{near:Z0,far:K0}=n;if(z.texture!==null){if(z.depthNear>0)Z0=z.depthNear;if(z.depthFar>0)K0=z.depthFar}if(P.near=B.near=M.near=Z0,P.far=B.far=M.far=K0,h!==P.near||o!==P.far)Z.updateRenderState({depthNear:P.near,depthFar:P.far}),h=P.near,o=P.far;P.layers.mask=n.layers.mask|6,M.layers.mask=P.layers.mask&-5,B.layers.mask=P.layers.mask&-3;let H0=n.parent,L0=P.cameras;J0(P,H0);for(let j0=0;j0<L0.length;j0++)J0(L0[j0],H0);if(L0.length===2)e(P,M,B);else P.projectionMatrix.copy(M.projectionMatrix);k0(n,P,H0)};function k0(n,Z0,K0){if(K0===null)n.matrix.copy(Z0.matrixWorld);else n.matrix.copy(K0.matrixWorld),n.matrix.invert(),n.matrix.multiply(Z0.matrixWorld);if(n.matrix.decompose(n.position,n.quaternion,n.scale),n.updateMatrixWorld(!0),n.projectionMatrix.copy(Z0.projectionMatrix),n.projectionMatrixInverse.copy(Z0.projectionMatrixInverse),n.isPerspectiveCamera)n.fov=I7*2*Math.atan(1/n.projectionMatrix.elements[5]),n.zoom=1}this.getCamera=function(){return P},this.getFoveation=function(){if(N===null&&G===null)return;return Y},this.setFoveation=function(n){if(Y=n,N!==null)N.fixedFoveation=n;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=n},this.hasDepthSensing=function(){return z.texture!==null},this.getDepthSensingMesh=function(){return z.getMesh(P)},this.getCameraTexture=function(n){return D[n]};let D0=null;function l0(n,Z0){if(U=Z0.getViewerPose(X||K),F=Z0,U!==null){let K0=U.views;if(G!==null)J.setRenderTargetFramebuffer(A,G.framebuffer),J.setRenderTarget(A);let H0=!1;if(K0.length!==P.cameras.length)P.cameras.length=0,H0=!0;for(let y0=0;y0<K0.length;y0++){let o0=K0[y0],h0=null;if(G!==null)h0=G.getViewport(o0);else{let D8=E.getViewSubImage(N,o0);if(h0=D8.viewport,y0===0)J.setRenderTargetTextures(A,D8.colorTexture,D8.depthStencilTexture),J.setRenderTarget(A)}let x0=d[y0];if(x0===void 0)x0=new y8,x0.layers.enable(y0),x0.viewport=new K8,d[y0]=x0;if(x0.matrix.fromArray(o0.transform.matrix),x0.matrix.decompose(x0.position,x0.quaternion,x0.scale),x0.projectionMatrix.fromArray(o0.projectionMatrix),x0.projectionMatrixInverse.copy(x0.projectionMatrix).invert(),x0.viewport.set(h0.x,h0.y,h0.width,h0.height),y0===0)P.matrix.copy(x0.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale);if(H0===!0)P.cameras.push(x0)}let L0=Z.enabledFeatures;if(L0&&L0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&R){E=$.getBinding();let y0=E.getDepthInformation(K0[0]);if(y0&&y0.isValid&&y0.texture)z.init(y0,Z.renderState)}if(L0&&L0.includes("camera-access")&&R){J.state.unbindTexture(),E=$.getBinding();for(let y0=0;y0<K0.length;y0++){let o0=K0[y0].camera;if(o0){let h0=D[o0];if(!h0)h0=new e7,D[o0]=h0;let x0=E.getCameraImage(o0);h0.sourceTexture=x0}}}}for(let K0=0;K0<L.length;K0++){let H0=I[K0],L0=L[K0];if(H0!==null&&L0!==void 0)L0.update(H0,Z0,X||K)}if(D0)D0(n,Z0);if(Z0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:Z0});F=null}let u0=new aW;u0.setAnimationLoop(l0),this.setAnimationLoop=function(n){D0=n},this.dispose=function(){}}}var Y1=new W8,UK=new w0;UK.set(-1,0,0,0,1,0,0,0,1);function X1(J,Q){function $(D,q){if(D.matrixAutoUpdate===!0)D.updateMatrix();q.value.copy(D.matrix)}function Z(D,q){if(q.color.getRGB(D.fogColor.value,tQ(J)),q.isFog)D.fogNear.value=q.near,D.fogFar.value=q.far;else if(q.isFogExp2)D.fogDensity.value=q.density}function W(D,q,_,A,L){if(q.isNodeMaterial)q.uniformsNeedUpdate=!1;else if(q.isMeshBasicMaterial)K(D,q);else if(q.isMeshLambertMaterial){if(K(D,q),q.envMap)D.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshToonMaterial)K(D,q),N(D,q);else if(q.isMeshPhongMaterial){if(K(D,q),E(D,q),q.envMap)D.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshStandardMaterial){if(K(D,q),G(D,q),q.isMeshPhysicalMaterial)F(D,q,L)}else if(q.isMeshMatcapMaterial)K(D,q),R(D,q);else if(q.isMeshDepthMaterial)K(D,q);else if(q.isMeshDistanceMaterial)K(D,q),z(D,q);else if(q.isMeshNormalMaterial)K(D,q);else if(q.isLineBasicMaterial){if(H(D,q),q.isLineDashedMaterial)Y(D,q)}else if(q.isPointsMaterial)X(D,q,_,A);else if(q.isSpriteMaterial)U(D,q);else if(q.isShadowMaterial)D.color.value.copy(q.color),D.opacity.value=q.opacity;else if(q.isShaderMaterial)q.uniformsNeedUpdate=!1}function K(D,q){if(D.opacity.value=q.opacity,q.color)D.diffuse.value.copy(q.color);if(q.emissive)D.emissive.value.copy(q.emissive).multiplyScalar(q.emissiveIntensity);if(q.map)D.map.value=q.map,$(q.map,D.mapTransform);if(q.alphaMap)D.alphaMap.value=q.alphaMap,$(q.alphaMap,D.alphaMapTransform);if(q.bumpMap){if(D.bumpMap.value=q.bumpMap,$(q.bumpMap,D.bumpMapTransform),D.bumpScale.value=q.bumpScale,q.side===w8)D.bumpScale.value*=-1}if(q.normalMap){if(D.normalMap.value=q.normalMap,$(q.normalMap,D.normalMapTransform),D.normalScale.value.copy(q.normalScale),q.side===w8)D.normalScale.value.negate()}if(q.displacementMap)D.displacementMap.value=q.displacementMap,$(q.displacementMap,D.displacementMapTransform),D.displacementScale.value=q.displacementScale,D.displacementBias.value=q.displacementBias;if(q.emissiveMap)D.emissiveMap.value=q.emissiveMap,$(q.emissiveMap,D.emissiveMapTransform);if(q.specularMap)D.specularMap.value=q.specularMap,$(q.specularMap,D.specularMapTransform);if(q.alphaTest>0)D.alphaTest.value=q.alphaTest;let _=Q.get(q),A=_.envMap,L=_.envMapRotation;if(A){if(D.envMap.value=A,D.envMapRotation.value.setFromMatrix4(Y1.makeRotationFromEuler(L)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(UK);D.reflectivity.value=q.reflectivity,D.ior.value=q.ior,D.refractionRatio.value=q.refractionRatio}if(q.lightMap)D.lightMap.value=q.lightMap,D.lightMapIntensity.value=q.lightMapIntensity,$(q.lightMap,D.lightMapTransform);if(q.aoMap)D.aoMap.value=q.aoMap,D.aoMapIntensity.value=q.aoMapIntensity,$(q.aoMap,D.aoMapTransform)}function H(D,q){if(D.diffuse.value.copy(q.color),D.opacity.value=q.opacity,q.map)D.map.value=q.map,$(q.map,D.mapTransform)}function Y(D,q){D.dashSize.value=q.dashSize,D.totalSize.value=q.dashSize+q.gapSize,D.scale.value=q.scale}function X(D,q,_,A){if(D.diffuse.value.copy(q.color),D.opacity.value=q.opacity,D.size.value=q.size*_,D.scale.value=A*0.5,q.map)D.map.value=q.map,$(q.map,D.uvTransform);if(q.alphaMap)D.alphaMap.value=q.alphaMap,$(q.alphaMap,D.alphaMapTransform);if(q.alphaTest>0)D.alphaTest.value=q.alphaTest}function U(D,q){if(D.diffuse.value.copy(q.color),D.opacity.value=q.opacity,D.rotation.value=q.rotation,q.map)D.map.value=q.map,$(q.map,D.mapTransform);if(q.alphaMap)D.alphaMap.value=q.alphaMap,$(q.alphaMap,D.alphaMapTransform);if(q.alphaTest>0)D.alphaTest.value=q.alphaTest}function E(D,q){D.specular.value.copy(q.specular),D.shininess.value=Math.max(q.shininess,0.0001)}function N(D,q){if(q.gradientMap)D.gradientMap.value=q.gradientMap}function G(D,q){if(D.metalness.value=q.metalness,q.metalnessMap)D.metalnessMap.value=q.metalnessMap,$(q.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=q.roughness,q.roughnessMap)D.roughnessMap.value=q.roughnessMap,$(q.roughnessMap,D.roughnessMapTransform);if(q.envMap)D.envMapIntensity.value=q.envMapIntensity}function F(D,q,_){if(D.ior.value=q.ior,q.sheen>0){if(D.sheenColor.value.copy(q.sheenColor).multiplyScalar(q.sheen),D.sheenRoughness.value=q.sheenRoughness,q.sheenColorMap)D.sheenColorMap.value=q.sheenColorMap,$(q.sheenColorMap,D.sheenColorMapTransform);if(q.sheenRoughnessMap)D.sheenRoughnessMap.value=q.sheenRoughnessMap,$(q.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(q.clearcoat>0){if(D.clearcoat.value=q.clearcoat,D.clearcoatRoughness.value=q.clearcoatRoughness,q.clearcoatMap)D.clearcoatMap.value=q.clearcoatMap,$(q.clearcoatMap,D.clearcoatMapTransform);if(q.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=q.clearcoatRoughnessMap,$(q.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(q.clearcoatNormalMap){if(D.clearcoatNormalMap.value=q.clearcoatNormalMap,$(q.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(q.clearcoatNormalScale),q.side===w8)D.clearcoatNormalScale.value.negate()}}if(q.dispersion>0)D.dispersion.value=q.dispersion;if(q.iridescence>0){if(D.iridescence.value=q.iridescence,D.iridescenceIOR.value=q.iridescenceIOR,D.iridescenceThicknessMinimum.value=q.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=q.iridescenceThicknessRange[1],q.iridescenceMap)D.iridescenceMap.value=q.iridescenceMap,$(q.iridescenceMap,D.iridescenceMapTransform);if(q.iridescenceThicknessMap)D.iridescenceThicknessMap.value=q.iridescenceThicknessMap,$(q.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(q.transmission>0){if(D.transmission.value=q.transmission,D.transmissionSamplerMap.value=_.texture,D.transmissionSamplerSize.value.set(_.width,_.height),q.transmissionMap)D.transmissionMap.value=q.transmissionMap,$(q.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=q.thickness,q.thicknessMap)D.thicknessMap.value=q.thicknessMap,$(q.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=q.attenuationDistance,D.attenuationColor.value.copy(q.attenuationColor)}if(q.anisotropy>0){if(D.anisotropyVector.value.set(q.anisotropy*Math.cos(q.anisotropyRotation),q.anisotropy*Math.sin(q.anisotropyRotation)),q.anisotropyMap)D.anisotropyMap.value=q.anisotropyMap,$(q.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=q.specularIntensity,D.specularColor.value.copy(q.specularColor),q.specularColorMap)D.specularColorMap.value=q.specularColorMap,$(q.specularColorMap,D.specularColorMapTransform);if(q.specularIntensityMap)D.specularIntensityMap.value=q.specularIntensityMap,$(q.specularIntensityMap,D.specularIntensityMapTransform)}function R(D,q){if(q.matcap)D.matcap.value=q.matcap}function z(D,q){let _=Q.get(q).light;D.referencePosition.value.setFromMatrixPosition(_.matrixWorld),D.nearDistance.value=_.shadow.camera.near,D.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function U1(J,Q,$,Z){let W={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(L,I){let C=I.program;Z.uniformBlockBinding(L,C)}function U(L,I){let C=W[L.id];if(C===void 0)D(L),C=E(L),W[L.id]=C,L.addEventListener("dispose",_);let w=I.program;Z.updateUBOMapping(L,w);let M=Q.render.frame;if(K[L.id]!==M)G(L),K[L.id]=M}function E(L){let I=N();L.__bindingPointIndex=I;let C=J.createBuffer(),w=L.__size,M=L.usage;return J.bindBuffer(J.UNIFORM_BUFFER,C),J.bufferData(J.UNIFORM_BUFFER,w,M),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,I,C),C}function N(){for(let L=0;L<Y;L++)if(H.indexOf(L)===-1)return H.push(L),L;return P0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(L){let I=W[L.id],C=L.uniforms,w=L.__cache;J.bindBuffer(J.UNIFORM_BUFFER,I);for(let M=0,B=C.length;M<B;M++){let d=C[M];if(Array.isArray(d))for(let P=0,h=d.length;P<h;P++)F(d[P],M,P,w);else F(d,M,0,w)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(L,I,C,w){if(z(L,I,C,w)===!0){let{__offset:M,value:B}=L;if(Array.isArray(B)){let d=0;for(let P=0;P<B.length;P++){let h=B[P],o=q(h);if(R(h,L.__data,d),typeof h!=="number"&&typeof h!=="boolean"&&!h.isMatrix3&&!ArrayBuffer.isView(h))d+=o.storage/Float32Array.BYTES_PER_ELEMENT}}else R(B,L.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,M,L.__data)}}function R(L,I,C){if(typeof L==="number"||typeof L==="boolean")I[0]=L;else if(L.isMatrix3)I[0]=L.elements[0],I[1]=L.elements[1],I[2]=L.elements[2],I[3]=0,I[4]=L.elements[3],I[5]=L.elements[4],I[6]=L.elements[5],I[7]=0,I[8]=L.elements[6],I[9]=L.elements[7],I[10]=L.elements[8],I[11]=0;else if(ArrayBuffer.isView(L))I.set(new L.constructor(L.buffer,L.byteOffset,I.length));else L.toArray(I,C)}function z(L,I,C,w){let M=L.value,B=I+"_"+C;if(w[B]===void 0){if(typeof M==="number"||typeof M==="boolean")w[B]=M;else if(ArrayBuffer.isView(M))w[B]=M.slice();else w[B]=M.clone();return!0}else{let d=w[B];if(typeof M==="number"||typeof M==="boolean"){if(d!==M)return w[B]=M,!0}else if(ArrayBuffer.isView(M))return!0;else if(d.equals(M)===!1)return d.copy(M),!0}return!1}function D(L){let I=L.uniforms,C=0,w=16;for(let B=0,d=I.length;B<d;B++){let P=Array.isArray(I[B])?I[B]:[I[B]];for(let h=0,o=P.length;h<o;h++){let g=P[h],c=Array.isArray(g.value)?g.value:[g.value];for(let p=0,f=c.length;p<f;p++){let a=c[p],e=q(a),J0=C%w,k0=J0%e.boundary,D0=J0+k0;if(C+=k0,D0!==0&&w-D0<e.storage)C+=w-D0;g.__data=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),g.__offset=C,C+=e.storage}}}let M=C%w;if(M>0)C+=w-M;return L.__size=C,L.__cache={},this}function q(L){let I={boundary:0,storage:0};if(typeof L==="number"||typeof L==="boolean")I.boundary=4,I.storage=4;else if(L.isVector2)I.boundary=8,I.storage=8;else if(L.isVector3||L.isColor)I.boundary=16,I.storage=12;else if(L.isVector4)I.boundary=16,I.storage=16;else if(L.isMatrix3)I.boundary=48,I.storage=48;else if(L.isMatrix4)I.boundary=64,I.storage=64;else if(L.isTexture)C0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(L))I.boundary=16,I.storage=L.byteLength;else C0("WebGLRenderer: Unsupported uniform value type.",L);return I}function _(L){let I=L.target;I.removeEventListener("dispose",_);let C=H.indexOf(I.__bindingPointIndex);H.splice(C,1),J.deleteBuffer(W[I.id]),delete W[I.id],delete K[I.id]}function A(){for(let L in W)J.deleteBuffer(W[L]);H=[],W={},K={}}return{bind:X,update:U,dispose:A}}var G1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),W9=null;function N1(){if(W9===null)W9=new c6(G1,16,16,u9,D9),W9.name="DFG_LUT",W9.minFilter=_8,W9.magFilter=_8,W9.wrapS=T7,W9.wrapT=T7,W9.generateMipmaps=!1,W9.needsUpdate=!0;return W9}class P${constructor(J={}){let{canvas:Q=LW(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:E=!1,reversedDepthBuffer:N=!1,outputBufferType:G=h8}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=K;let R=G,z=new Set([YQ,HQ,KQ]),D=new Set([h8,w9,p6,B6,ZQ,WQ]),q=new Uint32Array(4),_=new Int32Array(4),A=new y,L=null,I=null,C=[],w=[],M=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=a8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,d=!1,P=null,h=null,o=null,g=null;this._outputColorSpace=g7;let c=0,p=0,f=null,a=-1,e=null,J0=new K8,k0=new K8,D0=null,l0=new p0(0),u0=0,n=Q.width,Z0=Q.height,K0=1,H0=null,L0=null,j0=new K8(0,0,n,Z0),f0=new K8(0,0,n,Z0),y0=!1,o0=new o7,h0=!1,x0=!1,D8=new W8,p8=new y,$8=new K8,k8={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O8=!1;function E8(){return f===null?K0:1}let j=$;function m8(k,v){return Q.getContext(k,v)}try{let k={alpha:!0,depth:Z,stencil:W,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:E};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${_Z}`);if(Q.addEventListener("webglcontextlost",T0,!1),Q.addEventListener("webglcontextrestored",H8,!1),Q.addEventListener("webglcontextcreationerror",J8,!1),j===null){if(j=m8("webgl2",k),j===null)if(m8("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(k){throw P0("WebGLRenderer: "+k.message),k}let s0,Z8,V,O,T,l,t,Q0,U0,u,i,F0,B0,G0,$0,_0,A0,c0,S,W0,s,Y0,O0;function r(){if(s0=new RU(j),s0.init(),s=new W1(j,s0),Z8=new GU(j,s0,J,s),V=new $1(j,s0),Z8.reversedDepthBuffer&&N)V.buffers.depth.setReversed(!0);h=j.createFramebuffer(),o=j.createFramebuffer(),g=j.createFramebuffer(),O=new VU(j),T=new l5,l=new Z1(j,s0,V,T,Z8,s,O),t=new MU(B),Q0=new _H(j),Y0=new XU(j,Q0),U0=new kU(j,Q0,O,Y0),u=new zU(j,U0,Q0,Y0,O),c0=new BU(j,Z8,l),$0=new NU(T),i=new m5(B,t,s0,Z8,Y0,$0),F0=new X1(B,T),B0=new u5,G0=new a5(s0),A0=new YU(B,t,V,u,F,Y),_0=new Q1(B,u,Z8),O0=new U1(j,O,Z8,V),S=new UU(j,s0,O),W0=new LU(j,s0,O),O.programs=i.programs,B.capabilities=Z8,B.extensions=s0,B.properties=T,B.renderLists=B0,B.shadowMap=_0,B.state=V,B.info=O}if(r(),R!==h8)M=new _U(R,Q.width,Q.height,H,Z,W);let X0=new XK(B,j);this.xr=X0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let k=s0.get("WEBGL_lose_context");if(k)k.loseContext()},this.forceContextRestore=function(){let k=s0.get("WEBGL_lose_context");if(k)k.restoreContext()},this.getPixelRatio=function(){return K0},this.setPixelRatio=function(k){if(k===void 0)return;K0=k,this.setSize(n,Z0,!1)},this.getSize=function(k){return k.set(n,Z0)},this.setSize=function(k,v,m=!0){if(X0.isPresenting){C0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(n=k,Z0=v,Q.width=Math.floor(k*K0),Q.height=Math.floor(v*K0),m===!0)Q.style.width=k+"px",Q.style.height=v+"px";if(M!==null)M.setSize(Q.width,Q.height);this.setViewport(0,0,k,v)},this.getDrawingBufferSize=function(k){return k.set(n*K0,Z0*K0).floor()},this.setDrawingBufferSize=function(k,v,m){n=k,Z0=v,K0=m,Q.width=Math.floor(k*m),Q.height=Math.floor(v*m),this.setViewport(0,0,k,v)},this.setEffects=function(k){if(R===h8){P0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(k){for(let v=0;v<k.length;v++)if(k[v].isOutputPass===!0){C0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(k||[])},this.getCurrentViewport=function(k){return k.copy(J0)},this.getViewport=function(k){return k.copy(j0)},this.setViewport=function(k,v,m,b){if(k.isVector4)j0.set(k.x,k.y,k.z,k.w);else j0.set(k,v,m,b);V.viewport(J0.copy(j0).multiplyScalar(K0).round())},this.getScissor=function(k){return k.copy(f0)},this.setScissor=function(k,v,m,b){if(k.isVector4)f0.set(k.x,k.y,k.z,k.w);else f0.set(k,v,m,b);V.scissor(k0.copy(f0).multiplyScalar(K0).round())},this.getScissorTest=function(){return y0},this.setScissorTest=function(k){V.setScissorTest(y0=k)},this.setOpaqueSort=function(k){H0=k},this.setTransparentSort=function(k){L0=k},this.getClearColor=function(k){return k.copy(A0.getClearColor())},this.setClearColor=function(){A0.setClearColor(...arguments)},this.getClearAlpha=function(){return A0.getClearAlpha()},this.setClearAlpha=function(){A0.setClearAlpha(...arguments)},this.clear=function(k=!0,v=!0,m=!0){let b=0;if(k){let x=!1;if(f!==null){let q0=f.texture.format;x=z.has(q0)}if(x){let q0=f.texture.type,R0=D.has(q0),E0=A0.getClearColor(),V0=A0.getClearAlpha(),z0=E0.r,S0=E0.g,b0=E0.b;if(R0)q[0]=z0,q[1]=S0,q[2]=b0,q[3]=V0,j.clearBufferuiv(j.COLOR,0,q);else _[0]=z0,_[1]=S0,_[2]=b0,_[3]=V0,j.clearBufferiv(j.COLOR,0,_)}else b|=j.COLOR_BUFFER_BIT}if(v)b|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(m)b|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(b!==0)j.clear(b)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(k){k.setRenderer(this),P=k},this.dispose=function(){Q.removeEventListener("webglcontextlost",T0,!1),Q.removeEventListener("webglcontextrestored",H8,!1),Q.removeEventListener("webglcontextcreationerror",J8,!1),A0.dispose(),B0.dispose(),G0.dispose(),T.dispose(),t.dispose(),u.dispose(),Y0.dispose(),O0.dispose(),i.dispose(),X0.dispose(),X0.removeEventListener("sessionstart",s$),X0.removeEventListener("sessionend",i$),f9.stop()};function T0(k){k.preventDefault(),uQ("WebGLRenderer: Context Lost."),d=!0}function H8(){uQ("WebGLRenderer: Context Restored."),d=!1;let k=O.autoReset,v=_0.enabled,m=_0.autoUpdate,b=_0.needsUpdate,x=_0.type;r(),O.autoReset=k,_0.enabled=v,_0.autoUpdate=m,_0.needsUpdate=b,_0.type=x}function J8(k){P0("WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function t8(k){let v=k.target;v.removeEventListener("dispose",t8),H9(v)}function H9(k){gK(k),T.remove(k)}function gK(k){let v=T.get(k).programs;if(v!==void 0){if(v.forEach(function(m){i.releaseProgram(m)}),k.isShaderMaterial)i.releaseShaderCache(k)}}this.renderBufferDirect=function(k,v,m,b,x,q0){if(v===null)v=k8;let R0=x.isMesh&&x.matrixWorld.determinantAffine()<0,E0=lK(k,v,m,b,x);V.setMaterial(b,R0);let V0=m.index,z0=1;if(b.wireframe===!0){if(V0=U0.getWireframeAttribute(m),V0===void 0)return;z0=2}let S0=m.drawRange,b0=m.attributes.position,I0=S0.start*z0,a0=(S0.start+S0.count)*z0;if(q0!==null)I0=Math.max(I0,q0.start*z0),a0=Math.min(a0,(q0.start+q0.count)*z0);if(V0!==null)I0=Math.max(I0,0),a0=Math.min(a0,V0.count);else if(b0!==void 0&&b0!==null)I0=Math.max(I0,0),a0=Math.min(a0,b0.count);let U8=a0-I0;if(U8<0||U8===1/0)return;Y0.setup(x,b,E0,m,V0);let Y8,r0=S;if(V0!==null)Y8=Q0.get(V0),r0=W0,r0.setIndex(Y8);if(x.isMesh)if(b.wireframe===!0)V.setLineWidth(b.wireframeLinewidth*E8()),r0.setMode(j.LINES);else r0.setMode(j.TRIANGLES);else if(x.isLine){let L8=b.linewidth;if(L8===void 0)L8=1;if(V.setLineWidth(L8*E8()),x.isLineSegments)r0.setMode(j.LINES);else if(x.isLineLoop)r0.setMode(j.LINE_LOOP);else r0.setMode(j.LINE_STRIP)}else if(x.isPoints)r0.setMode(j.POINTS);else if(x.isSprite)r0.setMode(j.TRIANGLES);if(x.isBatchedMesh)if(!s0.get("WEBGL_multi_draw")){let{_multiDrawStarts:L8,_multiDrawCounts:M0,_multiDrawCount:j8}=x,d0=V0?Q0.get(V0).bytesPerElement:1,l8=T.get(b).currentProgram.getUniforms();for(let e8=0;e8<j8;e8++)l8.setValue(j,"_gl_DrawID",e8),r0.render(L8[e8]/d0,M0[e8])}else r0.renderMultiDraw(x._multiDrawStarts,x._multiDrawCounts,x._multiDrawCount);else if(x.isInstancedMesh)r0.renderInstances(I0,U8,x.count);else if(m.isInstancedBufferGeometry){let L8=m._maxInstanceCount!==void 0?m._maxInstanceCount:1/0,M0=Math.min(m.instanceCount,L8);r0.renderInstances(I0,U8,M0)}else r0.render(I0,U8)};function n$(k,v,m){if(k.transparent===!0&&k.side===Q9&&k.forceSinglePass===!1)k.side=w8,k.needsUpdate=!0,e6(k,v,m),k.side=k6,k.needsUpdate=!0,e6(k,v,m),k.side=Q9;else e6(k,v,m)}this.compile=function(k,v,m=null){if(m===null)m=k;if(I=G0.get(m),I.init(v),w.push(I),m.traverseVisible(function(x){if(x.isLight&&x.layers.test(v.layers)){if(I.pushLight(x),x.castShadow)I.pushShadow(x)}}),k!==m)k.traverseVisible(function(x){if(x.isLight&&x.layers.test(v.layers)){if(I.pushLight(x),x.castShadow)I.pushShadow(x)}});I.setupLights();let b=new Set;return k.traverse(function(x){if(!(x.isMesh||x.isPoints||x.isLine||x.isSprite))return;let q0=x.material;if(q0)if(Array.isArray(q0))for(let R0=0;R0<q0.length;R0++){let E0=q0[R0];n$(E0,m,x),b.add(E0)}else n$(q0,m,x),b.add(q0)}),I=w.pop(),b},this.compileAsync=function(k,v,m=null){let b=this.compile(k,v,m);return new Promise((x)=>{function q0(){if(b.forEach(function(R0){if(T.get(R0).currentProgram.isReady())b.delete(R0)}),b.size===0){x(k);return}setTimeout(q0,10)}if(s0.get("KHR_parallel_shader_compile")!==null)q0();else setTimeout(q0,10)})};let MJ=null;function pK(k){if(MJ)MJ(k)}function s$(){f9.stop()}function i$(){f9.start()}let f9=new aW;if(f9.setAnimationLoop(pK),typeof self<"u")f9.setContext(self);this.setAnimationLoop=function(k){MJ=k,X0.setAnimationLoop(k),k===null?f9.stop():f9.start()},X0.addEventListener("sessionstart",s$),X0.addEventListener("sessionend",i$),this.render=function(k,v){if(v!==void 0&&v.isCamera!==!0){P0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;if(P!==null)P.renderStart(k,v);let m=X0.enabled===!0&&X0.isPresenting===!0,b=M!==null&&(f===null||m)&&M.begin(B,f);if(k.matrixWorldAutoUpdate===!0)k.updateMatrixWorld();if(v.parent===null&&v.matrixWorldAutoUpdate===!0)v.updateMatrixWorld();if(X0.enabled===!0&&X0.isPresenting===!0&&(M===null||M.isCompositing()===!1)){if(X0.cameraAutoUpdate===!0)X0.updateCamera(v);v=X0.getCamera()}if(k.isScene===!0)k.onBeforeRender(B,k,v,f);if(I=G0.get(k,w.length),I.init(v),I.state.textureUnits=l.getTextureUnits(),w.push(I),D8.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),o0.setFromProjectionMatrix(D8,dQ,v.reversedDepth),x0=this.localClippingEnabled,h0=$0.init(this.clippingPlanes,x0),L=B0.get(k,C.length),L.init(),C.push(L),X0.enabled===!0&&X0.isPresenting===!0){let R0=B.xr.getDepthSensingMesh();if(R0!==null)RJ(R0,v,-1/0,B.sortObjects)}if(RJ(k,v,0,B.sortObjects),L.finish(),B.sortObjects===!0)L.sort(H0,L0,v.reversedDepth);if(O8=X0.enabled===!1||X0.isPresenting===!1||X0.hasDepthSensing()===!1,O8)A0.addToRenderList(L,k);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(h0===!0)$0.beginShadows();let x=I.state.shadowsArray;if(_0.render(x,k,v),h0===!0)$0.endShadows();if((b&&M.hasRenderPass())===!1){let{opaque:R0,transmissive:E0}=L;if(I.setupLights(),v.isArrayCamera){let V0=v.cameras;if(E0.length>0)for(let z0=0,S0=V0.length;z0<S0;z0++){let b0=V0[z0];a$(R0,E0,k,b0)}if(O8)A0.render(k);for(let z0=0,S0=V0.length;z0<S0;z0++){let b0=V0[z0];o$(L,k,b0,b0.viewport)}}else{if(E0.length>0)a$(R0,E0,k,v);if(O8)A0.render(k);o$(L,k,v)}}if(f!==null&&p===0)l.updateMultisampleRenderTarget(f),l.updateRenderTargetMipmap(f);if(b)M.end(B);if(k.isScene===!0)k.onAfterRender(B,k,v);if(Y0.resetDefaultState(),a=-1,e=null,w.pop(),w.length>0){if(I=w[w.length-1],l.setTextureUnits(I.state.textureUnits),h0===!0)$0.setGlobalState(B.clippingPlanes,I.state.camera)}else I=null;if(C.pop(),C.length>0)L=C[C.length-1];else L=null;if(P!==null)P.renderEnd()};function RJ(k,v,m,b){if(k.visible===!1)return;if(k.layers.test(v.layers)){if(k.isGroup)m=k.renderOrder;else if(k.isLOD){if(k.autoUpdate===!0)k.update(v)}else if(k.isLightProbeGrid)I.pushLightProbeGrid(k);else if(k.isLight){if(I.pushLight(k),k.castShadow)I.pushShadow(k)}else if(k.isSprite){if(!k.frustumCulled||o0.intersectsSprite(k)){if(b)$8.setFromMatrixPosition(k.matrixWorld).applyMatrix4(D8);let R0=u.update(k),E0=k.material;if(E0.visible)L.push(k,R0,E0,m,$8.z,null)}}else if(k.isMesh||k.isLine||k.isPoints){if(!k.frustumCulled||o0.intersectsObject(k)){let R0=u.update(k),E0=k.material;if(b){if(k.boundingSphere!==void 0){if(k.boundingSphere===null)k.computeBoundingSphere();$8.copy(k.boundingSphere.center)}else{if(R0.boundingSphere===null)R0.computeBoundingSphere();$8.copy(R0.boundingSphere.center)}$8.applyMatrix4(k.matrixWorld).applyMatrix4(D8)}if(Array.isArray(E0)){let V0=R0.groups;for(let z0=0,S0=V0.length;z0<S0;z0++){let b0=V0[z0],I0=E0[b0.materialIndex];if(I0&&I0.visible)L.push(k,R0,I0,m,$8.z,b0)}}else if(E0.visible)L.push(k,R0,E0,m,$8.z,null)}}}let q0=k.children;for(let R0=0,E0=q0.length;R0<E0;R0++)RJ(q0[R0],v,m,b)}function o$(k,v,m,b){let{opaque:x,transmissive:q0,transparent:R0}=k;if(I.setupLightsView(m),h0===!0)$0.setGlobalState(B.clippingPlanes,m);if(b)V.viewport(J0.copy(b));if(x.length>0)t6(x,v,m);if(q0.length>0)t6(q0,v,m);if(R0.length>0)t6(R0,v,m);V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function a$(k,v,m,b){if((m.isScene===!0?m.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[b.id]===void 0){let I0=s0.has("EXT_color_buffer_half_float")||s0.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[b.id]=new c8(1,1,{generateMipmaps:!0,type:I0?D9:h8,minFilter:m9,samples:Math.max(4,Z8.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:g0.workingColorSpace})}let q0=I.state.transmissionRenderTarget[b.id],R0=b.viewport||J0;q0.setSize(R0.z*B.transmissionResolutionScale,R0.w*B.transmissionResolutionScale);let E0=B.getRenderTarget(),V0=B.getActiveCubeFace(),z0=B.getActiveMipmapLevel();if(B.setRenderTarget(q0),B.getClearColor(l0),u0=B.getClearAlpha(),u0<1)B.setClearColor(16777215,0.5);if(B.clear(),O8)A0.render(m);let S0=B.toneMapping;B.toneMapping=a8;let b0=b.viewport;if(b.viewport!==void 0)b.viewport=void 0;if(I.setupLightsView(b),h0===!0)$0.setGlobalState(B.clippingPlanes,b);if(t6(k,m,b),l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0),s0.has("WEBGL_multisampled_render_to_texture")===!1){let I0=!1;for(let a0=0,U8=v.length;a0<U8;a0++){let Y8=v[a0],{object:r0,geometry:L8,material:M0,group:j8}=Y8;if(M0.side===Q9&&r0.layers.test(b.layers)){let d0=M0.side;M0.side=w8,M0.needsUpdate=!0,r$(r0,m,b,L8,M0,j8),M0.side=d0,M0.needsUpdate=!0,I0=!0}}if(I0===!0)l.updateMultisampleRenderTarget(q0),l.updateRenderTargetMipmap(q0)}if(B.setRenderTarget(E0,V0,z0),B.setClearColor(l0,u0),b0!==void 0)b.viewport=b0;B.toneMapping=S0}function t6(k,v,m){let b=v.isScene===!0?v.overrideMaterial:null;for(let x=0,q0=k.length;x<q0;x++){let R0=k[x],{object:E0,geometry:V0,group:z0}=R0,S0=R0.material;if(S0.allowOverride===!0&&b!==null)S0=b;if(E0.layers.test(m.layers))r$(E0,v,m,V0,S0,z0)}}function r$(k,v,m,b,x,q0){if(k.onBeforeRender(B,v,m,b,x,q0),k.modelViewMatrix.multiplyMatrices(m.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),x.onBeforeRender(B,v,m,b,k,q0),x.transparent===!0&&x.side===Q9&&x.forceSinglePass===!1)x.side=w8,x.needsUpdate=!0,B.renderBufferDirect(m,v,b,x,k,q0),x.side=k6,x.needsUpdate=!0,B.renderBufferDirect(m,v,b,x,k,q0),x.side=Q9;else B.renderBufferDirect(m,v,b,x,k,q0);k.onAfterRender(B,v,m,b,x,q0)}function e6(k,v,m){if(v.isScene!==!0)v=k8;let b=T.get(k),x=I.state.lights,q0=I.state.shadowsArray,R0=x.state.version,E0=i.getParameters(k,x.state,q0,v,m,I.state.lightProbeGridArray),V0=i.getProgramCacheKey(E0),z0=b.programs;b.environment=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?v.environment:null,b.fog=v.fog;let S0=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap;if(b.envMap=t.get(k.envMap||b.environment,S0),b.envMapRotation=b.environment!==null&&k.envMap===null?v.environmentRotation:k.envMapRotation,z0===void 0)k.addEventListener("dispose",t8),z0=new Map,b.programs=z0;let b0=z0.get(V0);if(b0!==void 0){if(b.currentProgram===b0&&b.lightsStateVersion===R0)return e$(k,E0),b0}else{if(E0.uniforms=i.getUniforms(k),P!==null&&k.isNodeMaterial)P.build(k,m,E0);k.onBeforeCompile(E0,B),b0=i.acquireProgram(E0,V0),z0.set(V0,b0),b.uniforms=E0.uniforms}let I0=b.uniforms;if(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)I0.clippingPlanes=$0.uniform;if(e$(k,E0),b.needsLights=uK(k),b.lightsStateVersion=R0,b.needsLights)I0.ambientLightColor.value=x.state.ambient,I0.lightProbe.value=x.state.probe,I0.directionalLights.value=x.state.directional,I0.directionalLightShadows.value=x.state.directionalShadow,I0.spotLights.value=x.state.spot,I0.spotLightShadows.value=x.state.spotShadow,I0.rectAreaLights.value=x.state.rectArea,I0.ltc_1.value=x.state.rectAreaLTC1,I0.ltc_2.value=x.state.rectAreaLTC2,I0.pointLights.value=x.state.point,I0.pointLightShadows.value=x.state.pointShadow,I0.hemisphereLights.value=x.state.hemi,I0.directionalShadowMatrix.value=x.state.directionalShadowMatrix,I0.spotLightMatrix.value=x.state.spotLightMatrix,I0.spotLightMap.value=x.state.spotLightMap,I0.pointShadowMatrix.value=x.state.pointShadowMatrix;return b.lightProbeGrid=I.state.lightProbeGridArray.length>0,b.currentProgram=b0,b.uniformsList=null,b0}function t$(k){if(k.uniformsList===null){let v=k.currentProgram.getUniforms();k.uniformsList=o6.seqWithValue(v.seq,k.uniforms)}return k.uniformsList}function e$(k,v){let m=T.get(k);m.outputColorSpace=v.outputColorSpace,m.batching=v.batching,m.batchingColor=v.batchingColor,m.instancing=v.instancing,m.instancingColor=v.instancingColor,m.instancingMorph=v.instancingMorph,m.skinning=v.skinning,m.morphTargets=v.morphTargets,m.morphNormals=v.morphNormals,m.morphColors=v.morphColors,m.morphTargetsCount=v.morphTargetsCount,m.numClippingPlanes=v.numClippingPlanes,m.numIntersection=v.numClipIntersection,m.vertexAlphas=v.vertexAlphas,m.vertexTangents=v.vertexTangents,m.toneMapping=v.toneMapping}function mK(k,v){if(k.length===0)return null;if(k.length===1)return k[0].texture!==null?k[0]:null;A.setFromMatrixPosition(v.matrixWorld);for(let m=0,b=k.length;m<b;m++){let x=k[m];if(x.texture!==null&&x.boundingBox.containsPoint(A))return x}return null}function lK(k,v,m,b,x){if(v.isScene!==!0)v=k8;l.resetTextureUnits();let q0=v.fog,R0=b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial?v.environment:null,E0=f===null?B.outputColorSpace:f.isXRRenderTarget===!0?f.texture.colorSpace:g0.workingColorSpace,V0=b.isMeshStandardMaterial||b.isMeshLambertMaterial&&!b.envMap||b.isMeshPhongMaterial&&!b.envMap,z0=t.get(b.envMap||R0,V0),S0=b.vertexColors===!0&&!!m.attributes.color&&m.attributes.color.itemSize===4,b0=!!m.attributes.tangent&&(!!b.normalMap||b.anisotropy>0),I0=!!m.morphAttributes.position,a0=!!m.morphAttributes.normal,U8=!!m.morphAttributes.color,Y8=a8;if(b.toneMapped){if(f===null||f.isXRRenderTarget===!0)Y8=B.toneMapping}let r0=m.morphAttributes.position||m.morphAttributes.normal||m.morphAttributes.color,L8=r0!==void 0?r0.length:0,M0=T.get(b),j8=I.state.lights;if(h0===!0){if(x0===!0||k!==e){let Q8=k===e&&b.id===a;$0.setState(b,k,Q8)}}let d0=!1;if(b.version===M0.__version){if(M0.needsLights&&M0.lightsStateVersion!==j8.state.version)d0=!0;else if(M0.outputColorSpace!==E0)d0=!0;else if(x.isBatchedMesh&&M0.batching===!1)d0=!0;else if(!x.isBatchedMesh&&M0.batching===!0)d0=!0;else if(x.isBatchedMesh&&M0.batchingColor===!0&&x.colorTexture===null)d0=!0;else if(x.isBatchedMesh&&M0.batchingColor===!1&&x.colorTexture!==null)d0=!0;else if(x.isInstancedMesh&&M0.instancing===!1)d0=!0;else if(!x.isInstancedMesh&&M0.instancing===!0)d0=!0;else if(x.isSkinnedMesh&&M0.skinning===!1)d0=!0;else if(!x.isSkinnedMesh&&M0.skinning===!0)d0=!0;else if(x.isInstancedMesh&&M0.instancingColor===!0&&x.instanceColor===null)d0=!0;else if(x.isInstancedMesh&&M0.instancingColor===!1&&x.instanceColor!==null)d0=!0;else if(x.isInstancedMesh&&M0.instancingMorph===!0&&x.morphTexture===null)d0=!0;else if(x.isInstancedMesh&&M0.instancingMorph===!1&&x.morphTexture!==null)d0=!0;else if(M0.envMap!==z0)d0=!0;else if(b.fog===!0&&M0.fog!==q0)d0=!0;else if(M0.numClippingPlanes!==void 0&&(M0.numClippingPlanes!==$0.numPlanes||M0.numIntersection!==$0.numIntersection))d0=!0;else if(M0.vertexAlphas!==S0)d0=!0;else if(M0.vertexTangents!==b0)d0=!0;else if(M0.morphTargets!==I0)d0=!0;else if(M0.morphNormals!==a0)d0=!0;else if(M0.morphColors!==U8)d0=!0;else if(M0.toneMapping!==Y8)d0=!0;else if(M0.morphTargetsCount!==L8)d0=!0;else if(!!M0.lightProbeGrid!==I.state.lightProbeGridArray.length>0)d0=!0}else d0=!0,M0.__version=b.version;let l8=M0.currentProgram;if(d0===!0){if(l8=e6(b,v,x),P&&b.isNodeMaterial)P.onUpdateProgram(b,l8,M0)}let e8=!1,R9=!1,Q6=!1,t0=l8.getUniforms(),G8=M0.uniforms;if(V.useProgram(l8.program))e8=!0,R9=!0,Q6=!0;if(b.id!==a)a=b.id,R9=!0;if(M0.needsLights){let Q8=mK(I.state.lightProbeGridArray,x);if(M0.lightProbeGrid!==Q8)M0.lightProbeGrid=Q8,R9=!0}if(e8||e!==k){if(V.buffers.depth.getReversed()&&k.reversedDepth!==!0)k._reversedDepth=!0,k.updateProjectionMatrix();t0.setValue(j,"projectionMatrix",k.projectionMatrix),t0.setValue(j,"viewMatrix",k.matrixWorldInverse);let L9=t0.map.cameraPosition;if(L9!==void 0)L9.setValue(j,p8.setFromMatrixPosition(k.matrixWorld));if(Z8.logarithmicDepthBuffer)t0.setValue(j,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2));if(b.isMeshPhongMaterial||b.isMeshToonMaterial||b.isMeshLambertMaterial||b.isMeshBasicMaterial||b.isMeshStandardMaterial||b.isShaderMaterial)t0.setValue(j,"isOrthographic",k.isOrthographicCamera===!0);if(e!==k)e=k,R9=!0,Q6=!0}if(M0.needsLights){if(j8.state.directionalShadowMap.length>0)t0.setValue(j,"directionalShadowMap",j8.state.directionalShadowMap,l);if(j8.state.spotShadowMap.length>0)t0.setValue(j,"spotShadowMap",j8.state.spotShadowMap,l);if(j8.state.pointShadowMap.length>0)t0.setValue(j,"pointShadowMap",j8.state.pointShadowMap,l)}if(x.isSkinnedMesh){t0.setOptional(j,x,"bindMatrix"),t0.setOptional(j,x,"bindMatrixInverse");let Q8=x.skeleton;if(Q8){if(Q8.boneTexture===null)Q8.computeBoneTexture();t0.setValue(j,"boneTexture",Q8.boneTexture,l)}}if(x.isBatchedMesh){if(t0.setOptional(j,x,"batchingTexture"),t0.setValue(j,"batchingTexture",x._matricesTexture,l),t0.setOptional(j,x,"batchingIdTexture"),t0.setValue(j,"batchingIdTexture",x._indirectTexture,l),t0.setOptional(j,x,"batchingColorTexture"),x._colorsTexture!==null)t0.setValue(j,"batchingColorTexture",x._colorsTexture,l)}let k9=m.morphAttributes;if(k9.position!==void 0||k9.normal!==void 0||k9.color!==void 0)c0.update(x,m,l8);if(R9||M0.receiveShadow!==x.receiveShadow)M0.receiveShadow=x.receiveShadow,t0.setValue(j,"receiveShadow",x.receiveShadow);if((b.isMeshStandardMaterial||b.isMeshLambertMaterial||b.isMeshPhongMaterial)&&b.envMap===null&&v.environment!==null)G8.envMapIntensity.value=v.environmentIntensity;if(G8.dfgLUT!==void 0)G8.dfgLUT.value=N1();if(R9){if(t0.setValue(j,"toneMappingExposure",B.toneMappingExposure),M0.needsLights)dK(G8,Q6);if(q0&&b.fog===!0)F0.refreshFogUniforms(G8,q0);if(F0.refreshMaterialUniforms(G8,b,K0,Z0,I.state.transmissionRenderTarget[k.id]),M0.needsLights&&M0.lightProbeGrid){let Q8=M0.lightProbeGrid;G8.probesSH.value=Q8.texture,G8.probesMin.value.copy(Q8.boundingBox.min),G8.probesMax.value.copy(Q8.boundingBox.max),G8.probesResolution.value.copy(Q8.resolution)}o6.upload(j,t$(M0),G8,l)}if(b.isShaderMaterial&&b.uniformsNeedUpdate===!0)o6.upload(j,t$(M0),G8,l),b.uniformsNeedUpdate=!1;if(b.isSpriteMaterial)t0.setValue(j,"center",x.center);if(t0.setValue(j,"modelViewMatrix",x.modelViewMatrix),t0.setValue(j,"normalMatrix",x.normalMatrix),t0.setValue(j,"modelMatrix",x.matrixWorld),b.uniformsGroups!==void 0){let Q8=b.uniformsGroups;for(let L9=0,$6=Q8.length;L9<$6;L9++){let JZ=Q8[L9];O0.update(JZ,l8),O0.bind(JZ,l8)}}return l8}function dK(k,v){k.ambientLightColor.needsUpdate=v,k.lightProbe.needsUpdate=v,k.directionalLights.needsUpdate=v,k.directionalLightShadows.needsUpdate=v,k.pointLights.needsUpdate=v,k.pointLightShadows.needsUpdate=v,k.spotLights.needsUpdate=v,k.spotLightShadows.needsUpdate=v,k.rectAreaLights.needsUpdate=v,k.hemisphereLights.needsUpdate=v}function uK(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}if(this.getActiveCubeFace=function(){return c},this.getActiveMipmapLevel=function(){return p},this.getRenderTarget=function(){return f},this.setRenderTargetTextures=function(k,v,m){let b=T.get(k);if(b.__autoAllocateDepthBuffer=k.resolveDepthBuffer===!1,b.__autoAllocateDepthBuffer===!1)b.__useRenderToTexture=!1;T.get(k.texture).__webglTexture=v,T.get(k.depthTexture).__webglTexture=b.__autoAllocateDepthBuffer?void 0:m,b.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(k,v){let m=T.get(k);m.__webglFramebuffer=v,m.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(k,v=0,m=0){f=k,c=v,p=m;let b=null,x=!1,q0=!1;if(k){let E0=T.get(k);if(E0.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(j.FRAMEBUFFER,E0.__webglFramebuffer),J0.copy(k.viewport),k0.copy(k.scissor),D0=k.scissorTest,V.viewport(J0),V.scissor(k0),V.setScissorTest(D0),a=-1;return}else if(E0.__webglFramebuffer===void 0)l.setupRenderTarget(k);else if(E0.__hasExternalTextures)l.rebindTextures(k,T.get(k.texture).__webglTexture,T.get(k.depthTexture).__webglTexture);else if(k.depthBuffer){let S0=k.depthTexture;if(E0.__boundDepthTexture!==S0){if(S0!==null&&T.has(S0)&&(k.width!==S0.image.width||k.height!==S0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");l.setupDepthRenderbuffer(k)}}let V0=k.texture;if(V0.isData3DTexture||V0.isDataArrayTexture||V0.isCompressedArrayTexture)q0=!0;let z0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget){if(Array.isArray(z0[v]))b=z0[v][m];else b=z0[v];x=!0}else if(k.samples>0&&l.useMultisampledRTT(k)===!1)b=T.get(k).__webglMultisampledFramebuffer;else if(Array.isArray(z0))b=z0[m];else b=z0;J0.copy(k.viewport),k0.copy(k.scissor),D0=k.scissorTest}else J0.copy(j0).multiplyScalar(K0).floor(),k0.copy(f0).multiplyScalar(K0).floor(),D0=y0;if(m!==0)b=h;if(V.bindFramebuffer(j.FRAMEBUFFER,b))V.drawBuffers(k,b);if(V.viewport(J0),V.scissor(k0),V.setScissorTest(D0),x){let E0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+v,E0.__webglTexture,m)}else if(q0){let E0=v;for(let V0=0;V0<k.textures.length;V0++){let z0=T.get(k.textures[V0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+V0,z0.__webglTexture,m,E0)}}else if(k!==null&&m!==0){let E0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,E0.__webglTexture,m)}a=-1},this.readRenderTargetPixels=function(k,v,m,b,x,q0,R0,E0=0){if(!(k&&k.isWebGLRenderTarget)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)V0=V0[R0];if(V0){V.bindFramebuffer(j.FRAMEBUFFER,V0);try{let z0=k.textures[E0],S0=z0.format,b0=z0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!Z8.textureFormatReadable(S0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Z8.textureTypeReadable(b0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(v>=0&&v<=k.width-b&&(m>=0&&m<=k.height-x))j.readPixels(v,m,b,x,s.convert(S0),s.convert(b0),q0)}finally{let z0=f!==null?T.get(f).__webglFramebuffer:null;V.bindFramebuffer(j.FRAMEBUFFER,z0)}}},this.readRenderTargetPixelsAsync=async function(k,v,m,b,x,q0,R0,E0=0){if(!(k&&k.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)V0=V0[R0];if(V0)if(v>=0&&v<=k.width-b&&(m>=0&&m<=k.height-x)){V.bindFramebuffer(j.FRAMEBUFFER,V0);let z0=k.textures[E0],S0=z0.format,b0=z0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!Z8.textureFormatReadable(S0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Z8.textureTypeReadable(b0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let I0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,I0),j.bufferData(j.PIXEL_PACK_BUFFER,q0.byteLength,j.STREAM_READ),j.readPixels(v,m,b,x,s.convert(S0),s.convert(b0),0);let a0=f!==null?T.get(f).__webglFramebuffer:null;V.bindFramebuffer(j.FRAMEBUFFER,a0);let U8=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await BW(j,U8,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,I0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,q0),j.deleteBuffer(I0),j.deleteSync(U8),q0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(k,v=null,m=0){let b=Math.pow(2,-m),x=Math.floor(k.image.width*b),q0=Math.floor(k.image.height*b),R0=v!==null?v.x:0,E0=v!==null?v.y:0;l.setTexture2D(k,0),j.copyTexSubImage2D(j.TEXTURE_2D,m,0,0,R0,E0,x,q0),V.unbindTexture()},this.copyTextureToTexture=function(k,v,m=null,b=null,x=0,q0=0){let R0,E0,V0,z0,S0,b0,I0,a0,U8,Y8=k.isCompressedTexture?k.mipmaps[q0]:k.image;if(m!==null)R0=m.max.x-m.min.x,E0=m.max.y-m.min.y,V0=m.isBox3?m.max.z-m.min.z:1,z0=m.min.x,S0=m.min.y,b0=m.isBox3?m.min.z:0;else{let G8=Math.pow(2,-x);if(R0=Math.floor(Y8.width*G8),E0=Math.floor(Y8.height*G8),k.isDataArrayTexture)V0=Y8.depth;else if(k.isData3DTexture)V0=Math.floor(Y8.depth*G8);else V0=1;z0=0,S0=0,b0=0}if(b!==null)I0=b.x,a0=b.y,U8=b.z;else I0=0,a0=0,U8=0;let r0=s.convert(v.format),L8=s.convert(v.type),M0;if(v.isData3DTexture)l.setTexture3D(v,0),M0=j.TEXTURE_3D;else if(v.isDataArrayTexture||v.isCompressedArrayTexture)l.setTexture2DArray(v,0),M0=j.TEXTURE_2D_ARRAY;else l.setTexture2D(v,0),M0=j.TEXTURE_2D;V.activeTexture(j.TEXTURE0),V.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,v.flipY),V.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),V.pixelStorei(j.UNPACK_ALIGNMENT,v.unpackAlignment);let j8=V.getParameter(j.UNPACK_ROW_LENGTH),d0=V.getParameter(j.UNPACK_IMAGE_HEIGHT),l8=V.getParameter(j.UNPACK_SKIP_PIXELS),e8=V.getParameter(j.UNPACK_SKIP_ROWS),R9=V.getParameter(j.UNPACK_SKIP_IMAGES);V.pixelStorei(j.UNPACK_ROW_LENGTH,Y8.width),V.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Y8.height),V.pixelStorei(j.UNPACK_SKIP_PIXELS,z0),V.pixelStorei(j.UNPACK_SKIP_ROWS,S0),V.pixelStorei(j.UNPACK_SKIP_IMAGES,b0);let Q6=k.isDataArrayTexture||k.isData3DTexture,t0=v.isDataArrayTexture||v.isData3DTexture;if(k.isDepthTexture){let G8=T.get(k),k9=T.get(v),Q8=T.get(G8.__renderTarget),L9=T.get(k9.__renderTarget);V.bindFramebuffer(j.READ_FRAMEBUFFER,Q8.__webglFramebuffer),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,L9.__webglFramebuffer);for(let $6=0;$6<V0;$6++){if(Q6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(k).__webglTexture,x,b0+$6),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(v).__webglTexture,q0,U8+$6);j.blitFramebuffer(z0,S0,R0,E0,I0,a0,R0,E0,j.DEPTH_BUFFER_BIT,j.NEAREST)}V.bindFramebuffer(j.READ_FRAMEBUFFER,null),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(x!==0||k.isRenderTargetTexture||T.has(k)){let G8=T.get(k),k9=T.get(v);V.bindFramebuffer(j.READ_FRAMEBUFFER,o),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,g);for(let Q8=0;Q8<V0;Q8++){if(Q6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,G8.__webglTexture,x,b0+Q8);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,G8.__webglTexture,x);if(t0)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,k9.__webglTexture,q0,U8+Q8);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,k9.__webglTexture,q0);if(x!==0)j.blitFramebuffer(z0,S0,R0,E0,I0,a0,R0,E0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(t0)j.copyTexSubImage3D(M0,q0,I0,a0,U8+Q8,z0,S0,R0,E0);else j.copyTexSubImage2D(M0,q0,I0,a0,z0,S0,R0,E0)}V.bindFramebuffer(j.READ_FRAMEBUFFER,null),V.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(t0)if(k.isDataTexture||k.isData3DTexture)j.texSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,L8,Y8.data);else if(v.isCompressedArrayTexture)j.compressedTexSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,Y8.data);else j.texSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,L8,Y8);else if(k.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,q0,I0,a0,R0,E0,r0,L8,Y8.data);else if(k.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,q0,I0,a0,Y8.width,Y8.height,r0,Y8.data);else j.texSubImage2D(j.TEXTURE_2D,q0,I0,a0,R0,E0,r0,L8,Y8);if(V.pixelStorei(j.UNPACK_ROW_LENGTH,j8),V.pixelStorei(j.UNPACK_IMAGE_HEIGHT,d0),V.pixelStorei(j.UNPACK_SKIP_PIXELS,l8),V.pixelStorei(j.UNPACK_SKIP_ROWS,e8),V.pixelStorei(j.UNPACK_SKIP_IMAGES,R9),q0===0&&v.generateMipmaps)j.generateMipmap(M0);V.unbindTexture()},this.initRenderTarget=function(k){if(T.get(k).__webglFramebuffer===void 0)l.setupRenderTarget(k)},this.initTexture=function(k){if(k.isCubeTexture)l.setTextureCube(k,0);else if(k.isData3DTexture)l.setTexture3D(k,0);else if(k.isDataArrayTexture||k.isCompressedArrayTexture)l.setTexture2DArray(k,0);else l.setTexture2D(k,0);V.unbindTexture()},this.resetState=function(){c=0,p=0,f=null,V.reset(),Y0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dQ}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=g0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=g0._getUnpackColorSpace()}}var w$=`
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;var GK=`
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
}`,NK=`
uniform float uScale;uniform float uContext;
attribute vec2 center;
attribute vec3 tint;
attribute vec4 nodeState;
attribute float order;
varying vec2 vUv;varying vec3 vTint;varying vec4 vState;varying float vOrder;
void main(){vUv=uv;vTint=tint;vState=nodeState;vOrder=order;
gl_Position=projectionMatrix*modelViewMatrix*vec4(position.xy*(uContext>0.?max(86.,74./uScale):86.)+center,1.,1.);}`,EK=`

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
}`,qK=`
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
}`,FK=`

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
}`,DK=`
uniform float uDpr;
attribute vec3 tint;attribute vec4 leafMeta;attribute float leafCluster;attribute float leafLife;
varying vec3 vTint;varying vec4 vMeta;varying float vCluster;varying float vLife;
uniform float uContext;
void main(){vTint=tint;vMeta=leafMeta;vCluster=leafCluster;vLife=leafLife;gl_PointSize=(uContext>1.?23.:17.)*uDpr;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,OK=`

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
}`,MK=`

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
}`;var RK=`
attribute float along;attribute float order;
varying float vAlong;varying float vOrder;
void main(){vAlong=along;vOrder=order;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,kK=`

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
gl_FragColor=vec4(vec3(.57,.57,.51),(.036+glint*.06)*reveal(.05,.6));}`;var LK=(J)=>Math.min(1,Math.max(0,J)),q1=(J,Q,$)=>{let Z=LK(($-J)/(Q-J));return Z*Z*(3-2*Z)};function S8(J,Q,$=0,Z=0,W=7){let K=Math.min(1,Math.max(0,$)/Math.max(1,W-1)),H=Q==="sun"?0:Q==="connector"?0.18:Q==="collection"?0.23+K*0.2:Q==="group"?0.45+K*0.12:0.63+K*0.09+Math.max(0,Z)/(Math.max(0,Z)+8)*0.14;return q1(H,H+(Q==="sun"?0.2:0.12),J)}class YJ{constructor(){this.progress=1,this.playing=!1,this.duration=4200,this.rate=1}set({progress:J,playing:Q,duration:$,rate:Z}={}){if(Number.isFinite(J))this.progress=LK(J);if(Number.isFinite($))this.duration=Math.max(500,Math.min(60000,$));if(Number.isFinite(Z))this.rate=Math.max(0.25,Math.min(4,Z));if(typeof Q==="boolean")this.playing=Q&&this.progress<1;if(this.progress===1)this.playing=!1;return this.snapshot()}advance(J){if(this.playing)this.set({progress:this.progress+Math.max(0,J)*this.rate/this.duration});return this.progress}snapshot(){let J=this.progress;return{progress:J,playing:this.playing,duration:this.duration,rate:this.rate,phase:J<0.23?"sun":J<0.63?"collections":J<1?"skills":"complete",visualOnly:!0}}}class XJ{constructor(J=360){this.values=new Float32Array(J),this.clear()}clear(){this.count=0,this.cursor=0}add(J){this.values[this.cursor]=J,this.cursor=(this.cursor+1)%this.values.length,this.count=Math.min(this.count+1,this.values.length)}percentile(J){if(!this.count)return null;let Q=this.values.slice(0,this.count).sort();return Math.round(Q[Math.floor((this.count-1)*J)]*100)/100}}function T$(J,Q){return Math.min(Math.max(1,J||1),Q?1:1.5)}class S${constructor(){this.reset()}reset(){this.frames=0,this.slow=0,this.degraded=!1}observe(J,Q){if(this.degraded)return!1;if(this.frames++,J>52||Q>10)this.slow++;if(this.frames<90)return!1;let $=this.slow>18;return this.frames=0,this.slow=0,this.degraded=$,$}}function VK(J){return Math.max(105,Math.max(0,J)*5.4)}function BK(J,Q,$,Z=90,W=1,K=0){let H=Q+$*Math.PI*2/Z*W,Y=J+Math.sin($*Math.PI*2/37)*K;return{x:Math.cos(H)*Y,y:Math.sin(H)*Y,radius:Y}}var f$={};P6(f$,{visibleCount:()=>zK,skillName:()=>GJ,separateSpecialists:()=>IK,sampleGroups:()=>v$,plan:()=>M1,identity:()=>r8,identities:()=>UJ,hash:()=>e9,fitCamera:()=>D1,catalogGroups:()=>j$,boundsOf:()=>J6});var UJ={ads:{angle:-140,color:"#dba17c"},code:{angle:-43,color:"#91b5ed"},contents:{angle:3,color:"#7bc8b4"},"customer-finder":{angle:-184,color:"#d9c276"},"cyber-security":{angle:139,color:"#b29bd7"},marketing:{angle:43,color:"#92c399"},"personal-branding":{angle:92,color:"#d49cae"}};function e9(J){let Q=2166136261;for(let $ of J)Q=Math.imul(Q^$.charCodeAt(0),16777619);return Q>>>0}function r8(J){if(UJ[J])return UJ[J];let Q=e9(J)%360,$=0.38,Z=0.64,W=$*Math.min(Z,1-Z),K=(H)=>{let Y=(H+Q/30)%12;return Math.round(255*(Z-W*Math.max(-1,Math.min(Y-3,9-Y,1)))).toString(16).padStart(2,"0")};return{angle:e9(J)%360,color:`#${K(0)}${K(8)}${K(4)}`}}function zK(J,Q,$=3,Z=1){if(Z<=0.500001)return 0;let W=Math.max(0,Math.min(6,Number($)||0)-3);return Math.min(J,(Q?50:10)+W*(Q?12:4))}var F1=["A–C","D–F","G–I","J–L","M–O","P–R","S–U","V–Z","#"];function GJ(J){return J.path.split("/").at(-2).replace(/-/g," ")}function j$(J,Q){let $=`SISTEMA/skills/${J}/`,Z=new Map;for(let H of Q){if(H.directory||H.name!=="SKILL.md"||!H.path.startsWith($))continue;let Y=H.path.slice($.length).split("/"),X=Y.slice(0,-2).join("/"),U=X&&Y.at(-3)!=="skills",E=GJ(H).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().charCodeAt(0),N=E>=65&&E<=90?Math.min(7,Math.floor((E-65)/3)):8,G=U?`folder:${X}`:`alphabet:${N}`;if(!Z.has(G))Z.set(G,{id:`${J}/${G}`,parent:J,name:U?X:F1[N],kind:U?"folder":"alphabet",originPath:U?$+X:$.slice(0,-1),skills:[]});Z.get(G).skills.push(H)}let W=[...Z.values()].sort((H,Y)=>H.id.localeCompare(Y.id)),K=new Map;return W.map((H)=>{let Y=W.filter((U)=>U.name===H.name).length,X=(K.get(H.name)||0)+1;return K.set(H.name,X),{...H,name:Y>1?`${H.name} · ${X}`:H.name,skills:H.skills.sort((U,E)=>U.path.localeCompare(E.path))}})}function v$(J,Q,$=null,Z=0,W=50,K=null){let H=new Map(J.map((U)=>[U.id,[]])),Y=0;for(let U=0;Y<Q;U++){let E=!1;for(let N of J)if(Y<Q&&U<N.skills.length)H.get(N.id).push(N.skills[U]),Y++,E=!0;if(!E)break}let X=J.find((U)=>U.id===$);if(X){let U=Math.min(Z*W,Math.max(0,X.skills.length-W));H.set(X.id,X.skills.slice(U,U+W))}if(K){let U=J.find((E)=>E.skills.some((N)=>N.path===K));if(U&&!H.get(U.id).some((E)=>E.path===K))H.get(U.id).push(U.skills.find((E)=>E.path===K))}return H}function J6(J,Q=30){if(!J.length)J=[{x:0,y:0}];return{minX:Math.min(...J.map(($)=>$.x))-Q,maxX:Math.max(...J.map(($)=>$.x))+Q,minY:Math.min(...J.map(($)=>$.y))-Q,maxY:Math.max(...J.map(($)=>$.y))+Q}}function D1(J,Q,$,Z=48,W=18,K=1/0){let H=Math.max(0.025,Math.min(K,(Q-W*2)/Math.max(1,J.maxX-J.minX),($-Z-W*2)/Math.max(1,J.maxY-J.minY)));return{x:Q/2-(J.minX+J.maxX)*H/2,y:($+Z)/2-(J.minY+J.maxY)*H/2,k:H}}function IK(J,Q=250,$=168){for(let Z=0;Z<24;Z++){let W=!1;for(let K=0;K<J.length;K++)for(let H=K+1;H<J.length;H++){let Y=J[K],X=J[H],U=X.x-Y.x,E=X.y-Y.y,N=Math.hypot(U,E);if(N>=$)continue;let G=N>0.001?Math.atan2(E,U):e9(Y.id+"|"+X.id)%6283/1000,F=($-N)/2+0.05,R=Math.cos(G)*F,z=Math.sin(G)*F;Y.x-=R,Y.y-=z,X.x+=R,X.y+=z,W=!0}for(let K of J){let H=Math.hypot(K.x,K.y);if(H>=Q)continue;let Y=H>0.001?Math.atan2(K.y,K.x):r8(K.id).angle*Math.PI/180;K.x=Math.cos(Y)*Q,K.y=Math.sin(Y)*Q,W=!0}if(!W)break}for(let Z of J)Z.angle=Math.atan2(Z.y,Z.x);return J}function O1(J,Q,$){let Z=j$(J.id,Q),W={...J,x:0,y:0,angle:-Math.PI/2,color:r8(J.id).color,skills:Z.flatMap((D)=>D.skills),groups:Z},K=$.group?Z.filter((D)=>D.id===$.group):Z,H=v$(K,50,$.group,$.page||0,50);if($.leaf&&!Array.from(H.values()).flat().some((D)=>D.path===$.leaf)){let D=K.find((q)=>q.skills.some((_)=>_.path===$.leaf));if(D){let q=Array.from(H.values());if(q.flat().length>=50)q.findLast((_)=>_.length)?.pop();H.get(D.id).push(D.skills.find((_)=>_.path===$.leaf))}}let Y=K.filter((D)=>H.get(D.id).length),X=[],U=[],E=Math.PI*2,N=Math.max(180,Y.length*27),G=-Math.PI/2;for(let[D,q]of Y.entries()){let _=H.get(q.id),A=E/Math.max(1,Y.length),L=G+A/2,I=Y.length===1,C={...q,x:I?0:Math.cos(L)*N,y:I?0:Math.sin(L)*N,rootMembership:I,angle:L,index:D,focused:q.id===$.group,source:W.id,visibleCount:_.length};X.push(C);let w=0,M=0,B=N+120;for(let[d,P]of _.entries()){let h=Math.max(1,Math.floor(B*Math.max(0.08,A-0.12)/65));if(w>=h)w=0,M++,B+=85;let o=Math.max(1,Math.floor(B*Math.max(0.08,A-0.12)/65)),g=_.length-d+w,c=Math.min(o,g),p=L+(w-(c-1)/2)*(A-0.12)/Math.max(1,c);U.push({id:P.path,parent:W.id,group:q.id,source:q.id,x:Math.cos(p)*B,y:Math.sin(p)*B,custom:!1,name:GJ(P),index:U.length,localIndex:d,depth:2,route:null,angle:p,dir:Math.cos(p)>=0?1:-1}),w++}G+=A}let F=[W,...X,...U],R=Math.max(220,...F.map((D)=>Math.max(Math.abs(D.x),Math.abs(D.y))))+90,z={minX:-R,maxX:R,minY:-R,maxY:R};return{nodes:[W],groups:X,leaves:U,bounds:z,focusBounds:z,dedicated:!0}}function M1(J,Q,$,Z=3,W={},K=248,H={}){let Y=J.find((q)=>q.id===$);if(Y)return O1(Y,Q,H);let X=[...J].sort((q,_)=>r8(q.id).angle-r8(_.id).angle||q.id.localeCompare(_.id)),U=X.every((q)=>UJ[q.id])&&X.length<=7,E=Math.max(270,X.length*34,K),N=X.map((q,_)=>{let A=(U?r8(q.id).angle:-140+_*360/X.length)*Math.PI/180,L=j$(q.id,Q),I=W.nodes?.[q.id];return{...q,angle:A,color:r8(q.id).color,x:I?.x??Math.cos(A)*E,y:I?.y??Math.sin(A)*E,skills:L.flatMap((C)=>C.skills),groups:L}});IK(N,Math.max(250,E-20),Math.max(168,E*0.5));let G=[],F=[];for(let q of N){let _=q.id===$,A=zK(q.skills.length,_,Z,1),L=v$(q.groups,A,_?H.group:null,H.page||0,50,H.leaf),I=N.filter((h)=>h!==q).map((h)=>Math.abs(Math.atan2(Math.sin(h.angle-q.angle),Math.cos(h.angle-q.angle)))),C=Math.min(1.25,(I.length?Math.min(...I):1.8)*0.82),w=_?3.45:C,M=q.groups.length,B=q.groups.reduce((h,o)=>h+Math.max(2,L.get(o.id).length),0),d=-w/2,P=_?Math.max(235,M*24):E+102;q.groups.forEach((h,o)=>{let g=w*Math.max(2,L.get(h.id).length)/Math.max(1,B),c=M<2?0:o/(M-1)-0.5,p=q.angle+(_?d+g/2:c*w);d+=g;let f=h.id===H.group&&_,a=_?q.x+Math.cos(p)*P:q.x+Math.cos(p)*P-Math.cos(q.angle)*E,e=_?q.y+Math.sin(p)*P:q.y+Math.sin(p)*P-Math.sin(q.angle)*E,J0=L.get(h.id);if(f){let D0=Math.min(5,Math.max(1,Math.ceil(J0.length/8))),l0=175+(D0-1)*205+145;a=q.x+Math.cos(q.angle)*1400-l0/2,e=q.y+Math.sin(q.angle)*1400}let k0={...h,x:a,y:e,angle:p,index:o,focused:f,source:q.id,visibleCount:L.get(h.id).length};G.push(k0),J0.forEach((D0,l0)=>{let u0,n;if(f){let K0=Math.min(5,Math.max(1,Math.ceil(J0.length/8))),H0=Math.ceil(J0.length/K0),L0=Math.floor(l0/H0),j0=l0%H0;u0=a+175+L0*205,n=e+(j0-(H0-1)/2)*66}else if(_){let K0=l0,H0=0,L0=P+105,j0=Math.max(1,Math.floor(L0*Math.max(0.12,g-0.06)/43));while(K0>=j0)K0-=j0,H0++,L0+=56,j0=Math.max(1,Math.floor(L0*Math.max(0.12,g-0.06)/43));let f0=l0-K0,y0=Math.min(j0,J0.length-f0),o0=(K0-(y0-1)/2)*Math.min(43/L0,(g-0.06)/Math.max(1,y0)),h0=p+o0;u0=q.x+Math.cos(h0)*L0,n=q.y+Math.sin(h0)*L0}else{let K0=Math.max(17,Math.min(22,(E+150)*C*0.82/Math.max(1,J0.length-1))),H0=(l0-(J0.length-1)/2)*K0,L0=50+l0%2*14;u0=a+Math.cos(p)*L0-Math.sin(p)*H0,n=e+Math.sin(p)*L0+Math.cos(p)*H0}let Z0=W.leaves?.[D0.path];F.push({id:D0.path,parent:q.id,group:h.id,source:h.id,x:Z0?.x??u0,y:Z0?.y??n,custom:!!Z0,name:GJ(D0),index:F.filter((K0)=>K0.parent===q.id).length,localIndex:l0,depth:2,route:f?{column:Math.floor(l0/Math.ceil(J0.length/Math.min(5,Math.max(1,Math.ceil(J0.length/8))))),offset:34}:null,angle:p,dir:f?1:Math.cos(q.angle)>=0?1:-1})})})}for(let q=0;q<4;q++){let _=new Map,L=[...F].sort((I,C)=>Number(C.parent===$)-Number(I.parent===$)||I.id.localeCompare(C.id));for(let I of L){if(!I.custom)for(let w=0;w<3;w++){let M=Math.floor(I.x/19),B=Math.floor(I.y/19),d=!1;for(let P=M-1;P<=M+1;P++)for(let h=B-1;h<=B+1;h++)for(let o of _.get(`${P},${h}`)||[]){if(o.parent===I.parent)continue;let g=I.x-o.x,c=I.y-o.y,p=Math.hypot(g,c);if(p<19){let f=p>0.001?Math.atan2(c,g):e9(I.id)*0.001;I.x+=Math.cos(f)*(19-p+0.1),I.y+=Math.sin(f)*(19-p+0.1),d=!0}}if(!d)break}let C=`${Math.floor(I.x/19)},${Math.floor(I.y/19)}`;if(!_.has(C))_.set(C,[]);_.get(C).push(I)}}let R=[{x:-150,y:-150},{x:150,y:150}],z=J6([...R,...N,...G,...F],35),D=H.group?[...G.filter((q)=>q.id===H.group),...F.filter((q)=>q.group===H.group)]:$?[...R,...N.filter((q)=>q.id===$),...G.filter((q)=>q.parent===$),...F.filter((q)=>q.parent===$)]:[...R,...N,...G,...F];if(H.group){let q=F.filter((_)=>_.group===H.group);if(q.length)D.push({x:Math.max(...q.map((_)=>_.x))+145,y:Math.min(...q.map((_)=>_.y))-62})}return{nodes:N,groups:G,leaves:F,bounds:z,focusBounds:J6(D,H.group?42:38)}}var x$={};P6(x$,{tooltip:()=>EJ,resolve:()=>FJ,plan:()=>h$,orbitPlugins:()=>R1,orbit:()=>k1,label:()=>wK,internalConnectors:()=>_K,colorFor:()=>NJ,children:()=>PK,areas:()=>qJ,areaEntries:()=>AK,areaDefinitions:()=>CK});var _K=new Set(["connector_openai_codex_document_control","connector_openai_hotline","connector_openai_safety_settings"]);function R1(J=[]){return J.filter((Q)=>Q.status==="connected"&&!_K.has(Q.id)).sort((Q,$)=>Q.id.localeCompare($.id))}var CK=[{id:"personal",name:"Pessoal",path:"AREAS/pessoal",color:"#D4A1CC",aliases:["pessoal","personal"]},{id:"professional",name:"Profissional",path:"AREAS/profissional",color:"#83B9D7",aliases:["profissional","professional"]}],b$=(J,Q)=>J===Q||J.startsWith(Q+"/"),y$=(J)=>String(J).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();function qJ(J=[]){return CK.map((Q)=>{let $=J.filter((Y)=>Y.directory).map((Y)=>Y.path),Z=$.find((Y)=>y$(Y)===y$(Q.path)),W=$.find((Y)=>!Y.includes("/")&&Q.aliases.includes(y$(Y))),K=Z||W||Q.path,H=J.filter((Y)=>b$(Y.path,K)&&Y.path!==K);return{...Q,path:K,exists:!!Z||!!W||H.length>0,notes:H.filter((Y)=>!Y.directory).length,folders:H.filter((Y)=>Y.directory).length}})}function NJ(J){return J.color}function AK(J,Q){return J.filter(($)=>$.path!==Q.path&&b$($.path,Q.path))}function PK(J,Q){return J.filter(($)=>$.path.slice(0,$.path.lastIndexOf("/"))===Q).sort(($,Z)=>Number(Z.directory)-Number($.directory)||$.path.localeCompare(Z.path))}function wK(J){return J.name?.replace(/\.md$/i,"")||J.path.split("/").at(-1).replace(/\.md$/i,"")}function EJ(J,Q,$){let Z=J.path===Q.path?Q.name:Q.name+" › "+J.path.slice(Q.path.length+1).replace(/\.md$/i,"").split("/").join(" › ");if(J.path===Q.path&&!Q.exists)return`${Z} · Pasta ainda não criada no Obsidian`;let W=J.directory?$.filter((K)=>!K.directory&&K.path.startsWith(J.path+"/")).length:0;return`${Z} · ${J.directory?`Pasta · ${W} ${W===1?"nota":"notas"}`:"Nota"}`}function k1(J=[],Q=105){let $=qJ(J),Z=$.map((E)=>({...E,name:E.name,directory:!0,area:E.id,root:!0,color:E.color})),W=$.map((E)=>AK(J,E).sort((N,G)=>N.path.split("/").length-G.path.split("/").length||N.path.localeCompare(G.path)));for(let E=0;Z.length<50;E++){let N=!1;for(let G=0;G<$.length&&Z.length<50;G++){let F=W[G][E];if(F)Z.push({...F,area:$[G].id,color:NJ($[G],F.path)}),N=!0}if(!N)break}let K=Q+58,H=[K],Y=Z.slice(0,2).map((E,N)=>({...E,x:0,y:(N?1:-1)*K,r:10,tooltip:EJ(E,$[N],J)})),X=2,U=1;while(X<Z.length){let E=Q+58+U*38,N=Math.max(12,Math.floor(2*Math.PI*E/34)),G=Math.min(N,Z.length-X);H.push(E);for(let F=0;F<G;F++){let R=Z[X+F],z=-Math.PI/2+F*2*Math.PI/G+(U%2?0.12:0),D=$.find((q)=>q.id===R.area);Y.push({...R,x:Math.cos(z)*E,y:Math.sin(z)*E,r:R.root?10:6.5,tooltip:EJ(R,D,J)})}X+=G,U++}return{areas:$,points:Y,rings:H,radius:H.at(-1)||Q+58}}function FJ(J,Q,$=qJ(J)){let Z=$.find((Y)=>Y.id===Q.area)||$[0],W=String(Q.path||Z.path),K=b$(W,Z.path)&&!W.split("/").includes(".."),H=W===Z.path||J.some((Y)=>Y.directory&&Y.path===W);return{...Q,area:Z.id,path:K&&H?W:Z.path,page:Math.max(0,Number(Q.page)||0)}}function h$(J,Q,$=qJ(J)){let Z=FJ(J,Q,$),W=$.find((F)=>F.id===Z.area),K=PK(J,Z.path),H=Math.max(1,Math.ceil(K.length/50));Z.page=Math.min(Z.page,H-1);let Y=K.slice(Z.page*50,Z.page*50+50),X="knowledge:"+Z.path,U={id:X,name:Z.path===W.path?W.name:Z.path.split("/").at(-1),icon:"folder",x:0,y:0,angle:-Math.PI/2,color:Z.path===W.path?W.color:NJ(W,Z.path),skills:J.filter((F)=>!F.directory&&F.path.startsWith(Z.path+"/")),groups:[],knowledge:!0},E=Y.map((F,R)=>{let z=Math.floor(R/24),D=Math.min(24,Y.length-z*24),q=-Math.PI/2+R%24*Math.PI*2/D,_=260+z*105;return{id:F.path,parent:X,group:null,source:X,name:wK(F),x:Math.cos(q)*_,y:Math.sin(q)*_,angle:q,dir:Math.cos(q)>=0?1:-1,index:R,localIndex:R,depth:1,route:null,custom:!1,knowledge:!0,directory:!!F.directory,area:W.id,color:NJ(W,F.path),tooltip:EJ(F,W,J)}}),N=Math.max(260,...E.map((F)=>Math.max(Math.abs(F.x),Math.abs(F.y))))+90,G=J6([{x:-N,y:-N},{x:N,y:N}],0);return{nodes:[U],groups:[],leaves:E,bounds:G,focusBounds:G,dedicated:!0,route:Z,area:W,total:K.length,pages:H}}var m$={};P6(m$,{rootPath:()=>a6,resolve:()=>B1,plan:()=>z1,orbit:()=>V1,inventory:()=>OJ,definition:()=>DJ,contains:()=>g$});var a6="SISTEMA/prompts",DJ={id:"prompts",name:"Prompts",path:a6,color:"#CEC08B"},L1=(J)=>typeof J==="string"&&!J.startsWith("/")&&!/[\\\u0000-\u001f\u007f]/.test(J)&&!J.split("/").some((Q)=>!Q||Q===".."||Q==="."),TK=(J)=>J.normalize("NFC").toLocaleLowerCase("pt-BR"),SK=(J,Q)=>J===Q||J.startsWith(Q+"/"),g$=(J)=>L1(J)&&TK(J.split("/").slice(0,2).join("/"))===TK(a6),jK=(J)=>J.slice(0,J.lastIndexOf("/")),p$=(J,Q=a6)=>J===Q?"Prompts":J.split("/").at(-1).replace(/\.md$/i,"").replace(/[-_]+/g," "),vK=(J,Q)=>J.path.localeCompare(Q.path,"pt-BR");function OJ(J=[],Q=""){let $=new Map,Z=new Map,W=[...new Set(J.filter((G)=>g$(G.path)&&(G.directory||G.path.split("/").length>2)).map((G)=>G.path.split("/").slice(0,2).join("/")))].sort((G,F)=>G.localeCompare(F,"pt-BR")),K=W.includes(Q)?Q:W.length===1?W[0]:"",H=K||a6,Y=W.length>1&&!K,X=(G)=>{for(let F=G;SK(F,H);F=jK(F)){if(Z.has(F))break;Z.set(F,{path:F,name:p$(F,H),directory:!0})}};for(let G of J){if(Y||!g$(G.path)||!SK(G.path,H))continue;if(G.directory)X(G.path);else if(/\.md$/i.test(G.path))$.set(G.path,G),X(jK(G.path))}let U=[...Z.values()].filter((G)=>G.path!==H).sort((G,F)=>G.path.split("/").length-F.path.split("/").length||vK(G,F)),E=[...$.values()].sort(vK);return{area:{...DJ,path:H,exists:!Y&&Z.has(H),ambiguous:Y,notes:E.length,folders:U.length},roots:W,ambiguous:Y,directories:U,documents:E,entries:[...Z.values(),...E]}}function fK(J,Q){let $=Q.area.path;if(J.path===$)return`Prompts · ${Q.area.folders} pastas · ${Q.area.notes} prompts · ${$}`;let Z=J.path.slice($.length+1).replace(/\.md$/i,"").split("/").join(" › "),W=J.directory?Q.documents.filter((K)=>K.path.startsWith(J.path+"/")).length:0;return`Prompts › ${Z} · ${J.directory?`Pasta · ${W} ${W===1?"prompt":"prompts"}`:"Prompt Markdown"}`}function V1(J=[],Q=163,$=""){let Z=OJ(J,$);if(!Z.area.exists)return{area:Z.area,points:[],rings:[],radius:0,total:0,visible:0};let W=[{path:Z.area.path,name:"Prompts",directory:!0,root:!0}];for(let X=0;X<Math.max(Z.directories.length,Z.documents.length);X++){if(Z.directories[X])W.push(Z.directories[X]);if(Z.documents[X])W.push(Z.documents[X])}let K=W.slice(0,50),H=[],Y=[];for(let X=0,U=0;X<K.length;U++){let E=Q+38*(U+1),N=Math.max(12,Math.floor(2*Math.PI*E/34)),G=Math.min(N,K.length-X);Y.push(E);for(let F=0;F<G;F++){let R=K[X+F],z=-Math.PI/2+Math.PI/8+F*Math.PI*2/G;H.push({...R,area:"prompts",x:Math.cos(z)*E,y:Math.sin(z)*E,r:R.root?10:6.5,color:DJ.color,tooltip:fK(R,Z)})}X+=G}if(W.length>K.length)H[0].tooltip+=` · ${K.length-1} de ${W.length-1} itens no mapa; abra para explorar todos`;return{area:Z.area,points:H,rings:Y,radius:Y.at(-1),total:W.length-1,visible:K.length-1}}function B1(J,Q){let $=OJ(J,Q?.rootChoice);return FJ($.entries,{...Q,area:"prompts"},[$.area])}function z1(J,Q){let $=OJ(J,Q?.rootChoice),Z=h$($.entries,{...Q,area:"prompts"},[$.area]);Z.nodes[0].name=p$(Z.route.path,$.area.path);for(let W of Z.leaves)W.name=p$(W.id,$.area.path),W.color=DJ.color,W.tooltip=fK({path:W.id,directory:W.directory},$);return Z}var d$={};P6(d$,{starField:()=>I1,expandingRings:()=>_1,RING_PERIOD:()=>yK,RING_COUNT:()=>l$});var l$=7,yK=48,r6=(J)=>{let Q=e9(J);return Q=Math.imul(Q^Q>>>16,2146121005),Q=Math.imul(Q^Q>>>15,2221713035),((Q^Q>>>16)>>>0)/4294967296};function I1(J,Q){if(!Number.isFinite(J)||!Number.isFinite(Q)||J<=0||Q<=0)return[];let $=Math.max(72,Math.sqrt(J*Q/400)),Z=Math.ceil(J/$),W=Math.ceil(Q/$),K=[];for(let H=0;H<W;H++)for(let Y=0;Y<Z;Y++){let X=`oracle-star:${Y}:${H}`,U=r6(X+":bright")>0.95,E=(Y+0.1+r6(X+":x")*0.8)*$,N=(H+0.1+r6(X+":y")*0.8)*$;if(E>=J-2||N>=Q-2)continue;K.push({x:E,y:N,r:U?1.05:0.45+r6(X+":size")*0.4,opacity:U?0.47:0.13+r6(X+":opacity")*0.24})}return K}function _1(J,Q=0){let $=Number.isFinite(J)?Math.max(0,J):0,Z=Number.isFinite(Q)?Math.max(0,Q):0,W=Math.max(360,$*1.5);return Array.from({length:l$},(K,H)=>{let Y=(Z/yK+H/l$)%1,X=Math.min(1,Y/0.075);return{r:$+22+Y*W,opacity:0.075*X*X*(3-2*X)*Math.pow(1-Y,1.7)}})}var c$={};P6(c$,{plan:()=>A1,inventory:()=>bK,definitions:()=>u$});var u$=[{id:"code",name:"Código",icon:"code",color:"#91b5ed"},{id:"design",name:"Design",icon:"tool",color:"#d4a1cc"},{id:"marketing",name:"Marketing",icon:"chart",color:"#92c399"},{id:"sales",name:"Vendas",icon:"megaphone",color:"#dba17c"},{id:"research",name:"Pesquisa",icon:"search",color:"#d9c276"},{id:"content",name:"Conteúdo",icon:"note",color:"#7bc8b4"},{id:"unassigned",name:"Sem departamento",icon:"folder",color:"#afb5bf"}],C1=new Set(["code","cyber-security","cybersecurity","frontend-design","impeccable","frontend","richard-design"]);function bK(J,Q,$={}){let Z=new Set(u$.map((H)=>H.id)),W=new Set,K=J.filter((H)=>H&&typeof H.id==="string"&&!W.has(H.id)&&W.add(H.id)).map((H)=>{let Y=`SISTEMA/skills/${H.id}/`,X=[...new Map(Q.filter((E)=>!E.directory&&E.name==="SKILL.md"&&E.path.startsWith(Y)&&!E.path.split("/").includes("..")).map((E)=>[E.path,E])).values()].sort((E,N)=>E.path.localeCompare(N.path)),U=Z.has($[H.id])?$[H.id]:C1.has(H.id)?"code":"unassigned";return{...H,skills:X,departmentID:U,color:r8(H.id).color}}).sort((H,Y)=>H.id.localeCompare(Y.id));return u$.map((H)=>({...H,specialists:K.filter((Y)=>Y.departmentID===H.id)})).filter((H)=>H.specialists.length).map((H)=>({...H,skills:H.specialists.flatMap((Y)=>Y.skills)}))}function A1(J,Q,$=null,Z=0,W=330,K={}){let H=bK(J,Q,K),Y=H.find((D)=>D.id===$),X=[],U=[],E=[],N=(D,q,_,A,L,I)=>{let C={...D,id:"specialist:"+D.id,specialistID:D.id,parent:q.id,source:q.id,kind:"specialist",name:D.name||D.id,index:L,x:_,y:A,rootMembership:!1,visibleCount:I?Math.min(10,D.skills.length):0};if(U.push(C),I)for(let[w,M]of D.skills.slice(0,10).entries()){let B=w%5,d=Math.floor(w/5);E.push({id:M.path,parent:q.id,group:C.id,source:C.id,specialistID:D.id,x:_+(B-2)*34,y:A-95-d*56,name:M.path.split("/").at(-2).replace(/-/g," "),index:E.length,localIndex:w,depth:2,dir:B>=2?1:-1,route:null,custom:!1,color:D.color})}},G=1,F=0;if(Y){let D={...Y,id:"department:"+Y.id,departmentID:Y.id,x:0,y:250,angle:-Math.PI/2};X.push(D),G=Math.max(1,Math.ceil(Y.specialists.length/12)),F=Math.max(0,Math.min(G-1,Math.floor(Number(Z)||0)));let q=Y.specialists.slice(F*12,(F+1)*12),_=Math.min(4,q.length),A=Math.ceil(q.length/_);q.forEach((L,I)=>N(L,D,(I%_-(_-1)/2)*235,65-Math.floor(I/_)*260,I,!0)),D.y=250,D.totalSpecialists=Y.specialists.length}else{let D=Math.max(350,W+80,H.length*90);H.forEach((q,_)=>{let A=-Math.PI/2+_*Math.PI*2/Math.max(1,H.length),L={...q,id:"department:"+q.id,departmentID:q.id,x:Math.cos(A)*D,y:Math.sin(A)*D,angle:A};X.push(L);let I=q.specialists.slice(0,12);I.forEach((C,w)=>{let M=(w-(I.length-1)/2)*Math.min(0.105,1.05/Math.max(1,I.length-1)),B=D+105+Math.floor(w/6)*60;N(C,L,Math.cos(A+M)*B,Math.sin(A+M)*B,w,!1)})})}let R=Y?[...X,...U,...E]:[{x:-W,y:-W},{x:W,y:W},...X,...U],z=J6(R,75);return{nodes:X,groups:U,leaves:E,bounds:z,focusBounds:z,dedicated:!!Y,department:Y?.id||null,departmentCatalog:H,pages:G,page:F,total:Y?.specialists.length||H.length}}window.OracleKnowledge=x$;window.OraclePrompts=m$;window.OracleAtmosphere=d$;window.OracleDepartments=c$;window.OracleLayout=f$;window.OracleMotion={FormationTimeline:YJ,revealAt:S8,pluginOrbitRadius:VK,orbitalPosition:BK};var X8=(J)=>({value:J}),P1=(J)=>{let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)},A6=(J,Q,$,Z=!0)=>{for(let[W,K]of Object.entries(Q)){let H=Z?i7:R8;J.setAttribute(W,new H(new Float32Array($*K),K).setUsage(mQ))}},g8=(J,Q,...$)=>{let Z=!1;for(let W=0;W<$.length;W++){let K=Q*J.itemSize+W,H=Math.fround($[W]);if(J.array[K]!==H)J.array[K]=H,Z=!0}if(Z)J.needsUpdate=!0;return Z};function hK(J=1){let Q=new j9(1,1,J,1),$=new $J;return $.index=Q.index,$.setAttribute("position",Q.attributes.position),$.setAttribute("uv",Q.attributes.uv),$.instanceCount=0,$}class xK{constructor(J){this.host=J,this.scene=new u7,this.camera=new I6(-500,500,350,-350,0.1,100),this.camera.position.z=10,this.active=!0,this.quality="balanced",this.pending=0,this.timeout=0,this.time=0,this.clock=0,this.last=0,this.renderCount=0,this.dirty=!0,this.paused=!1,this.reduced=!1,this.frameSamples=new XJ,this.costSamples=new XJ,this.governor=new S$,this.timeline=new YJ,this.clusterRows=new Map,this.nodeRows=new Map,this.leafRows=new Map,this.leafBirths=new Map,this.colors=[],this.colorByID=new Map,this.nodeCapacity=8,this.edgeCapacity=128,this.leafCapacity=128,this.nodeTargets=new Float32Array(this.nodeCapacity*4),this.receipts=new Set,this.receiptAt=-100,this.transitioning=!1,this.u={uTime:X8(0),uClock:X8(0),uFormation:X8(1),uMotion:X8(1),uEconomy:X8(0),uScale:X8(1),uDpr:X8(T$(devicePixelRatio,!1)),uSpotlight:X8(-2),uSpotlightAmount:X8(0),uSelected:X8(-2),uSelectedLeaf:X8(-2),uHovered:X8(-2),uHoveredLeaf:X8(-2),uDragged:X8(-2),uReceipt:X8(-1),uHoverCore:X8(0),uReconnect:X8(0),uGroupCount:X8(7),uFocusedCluster:X8(-2),uHoveredCluster:X8(-2),uContext:X8(0)};let Q=document.createElement("canvas");Q.className="universe-webgl",Q.setAttribute("aria-hidden","true"),J.prepend(Q),this.canvas=Q;try{this.renderer=new P$({canvas:Q,alpha:!0,antialias:!1,powerPreference:"low-power",depth:!1,stencil:!1})}catch($){throw Q.remove(),this.active=!1,$}this.renderer.outputColorSpace=g7,this.renderer.setPixelRatio(this.u.uDpr.value),this.renderer.setClearColor(0,0),this.renderer.sortObjects=!1,this.renderer.debug.onShaderError=($,Z,W,K)=>{this.error=[$.getProgramInfoLog(Z),$.getShaderInfoLog(W),$.getShaderInfoLog(K)].filter(Boolean).join(`
`),this.failed=!0,this.cancel(),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback"),this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0)};try{this.setup()}catch($){throw this.dispose(),$}this.onLost=($)=>{$.preventDefault(),this.contextLost=!0,this.cancel(),this.last=0,this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback")},this.onRestored=()=>{if(!this.active)return;this.contextLost=!1,this.failed=!1,this.error=null,this.last=0,this.reconnectAt=this.clock,this.dirty=!0,this.host.classList.add("three-enabled"),this.host.classList.remove("svg-fallback"),this.schedule()},this.onVisibility=()=>{if(this.last=0,this.cancel(),!document.hidden)this.dirty=!0,this.schedule()},Q.addEventListener("webglcontextlost",this.onLost),Q.addEventListener("webglcontextrestored",this.onRestored),document.addEventListener("visibilitychange",this.onVisibility),J.classList.add("three-enabled")}material(J,Q){return new T8({vertexShader:J,fragmentShader:Q,uniforms:this.u,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1})}mesh(J,Q,$,Z=x8){let W=new Z(J,this.material(Q,$));return W.frustumCulled=!1,this.scene.add(W),W}setup(){let J=new Uint8Array(16384);for(let K=0;K<J.length;K++)J[K]=Math.floor(P1(K+11)*255);this.noiseTexture=new c6(J,128,128,j7,h8),this.noiseTexture.minFilter=this.noiseTexture.magFilter=_8,this.noiseTexture.wrapS=this.noiseTexture.wrapT=w7,this.noiseTexture.needsUpdate=!0,this.u.uNoise=X8(this.noiseTexture),this.plane=new j9(1,1),this.galaxy=this.mesh(this.plane,w$,MK),this.galaxy.scale.set(1120,730,1);let Q=new C8,$=[],Z=[],W=[];[[185,95],[288,156],[395,233]].forEach(([K,H],Y)=>{for(let X=0;X<160;X++)for(let U of[X,X+1]){let E=U/160*Math.PI*2,N=Math.cos(E)*K,G=Math.sin(E)*H;$.push(N*0.906-G*0.423,N*0.423+G*0.906,-0.5),Z.push(U/160),W.push(Y)}}),Q.setAttribute("position",new R8(new Float32Array($),3)),Q.setAttribute("along",new R8(new Float32Array(Z),1)),Q.setAttribute("order",new R8(new Float32Array(W),1)),this.orbits=this.mesh(Q,RK,kK,a7),this.edgeGeometry=hK(24),A6(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4,edgeLife:1},this.edgeCapacity),this.edges=this.mesh(this.edgeGeometry,qK,FK),this.leafGeometry=new C8,A6(this.leafGeometry,{position:3,tint:3,leafMeta:4,leafCluster:1,leafLife:1},this.leafCapacity,!1),this.leafGeometry.setDrawRange(0,0),this.leafPoints=this.mesh(this.leafGeometry,DK,OK,r7),this.nodeGeometry=hK(),A6(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodes=this.mesh(this.nodeGeometry,NK,EK),this.sun=this.mesh(this.plane,w$,GK),this.sun.scale.set(250,250,1)}unavailable(){return!this.active||this.contextLost||this.failed||!this.model||document.hidden||window.oracleWindowVisible===!1||this.model.data?.hidden||!this.width||!this.height}sync(J){if(!this.active)return;this.model=J;let Q=!J.selected&&!J.knowledge&&!J.department;if(this.leafPoints.visible=!J.knowledge,this.sun.visible!==Q)this.sun.visible=Q,this.orbits.visible=Q,this.dirty=!0;this.u.uGroupCount.value=Math.max(1,J.nodes.size);let $=!1,Z=Math.round(J.width),W=Math.round(J.height);if(!Z||!W)return;if(Z!==this.width||W!==this.height)this.width=Z,this.height=W,this.renderer.setSize(Z,W,!1),$=!0;let{x:K,y:H,k:Y}=J.camera;if($||K!==this.cameraX||H!==this.cameraY||Y!==this.cameraK)this.cameraX=K,this.cameraY=H,this.cameraK=Y,this.camera.left=-K/Y,this.camera.right=(Z-K)/Y,this.camera.top=H/Y,this.camera.bottom=(H-W)/Y,this.camera.updateProjectionMatrix(),this.u.uScale.value=Y,$=!0;let X=!!J.reduced||!!this.systemReduced;if(X!==this.reduced){if(this.reduced=X,$=!0,this.last=0,X)this.setFormation({progress:1,playing:!1})}let U=!!J.data?.economy;if(this.manualEconomy!==U)this.manualEconomy=U,this.governor.reset();$=this.setQuality(U||this.governor.degraded?"economy":"balanced")||$,$=this.syncGeometry(J)||$;let E=(z)=>J.nodes.get(z)?.index??-2,N=J.hovered||document.documentElement.dataset.inputMode!=="pointer"&&J.keyboardFocus||{},G=E(J.spotlight),F=G>=0?1:0;if(this.spotlightTarget!==F)this.spotlightTarget=F,this.transitioning=!0,$=!0;if(G>=0&&this.u.uSpotlight.value!==G)this.u.uSpotlight.value=G,$=!0;let R={uSelected:E(J.selected||(J.knowledge?[...J.nodes.keys()][0]:null)),uSelectedLeaf:this.leafRows.get(J.selectedLeaf)??-2,uHovered:E(N.category),uHoveredLeaf:this.leafRows.get(N.skill)??-2,uDragged:E(J.drag?.category||J.drag?.node?.parent),uHoverCore:N.core?1:0,uFocusedCluster:this.clusterRows.get(J.context?.group)??-2,uHoveredCluster:this.clusterRows.get(N.group||J.leaves.get(N.skill)?.group)??-2,uContext:J.department?1:["global","specialist","group","skill","knowledge"].indexOf(J.context?.kind)};for(let[z,D]of Object.entries(R))if(this.u[z].value!==D)this.u[z].value=D,$=!0;for(let z of J.nodes.values()){let D=this.nodeRows.get(z.id),q=z.id===J.selected||J.knowledge?1:0,_=z.id===N.category||J.leaves.get(N.skill)?.parent===z.id?1:0,A=J.drag?.node?.id===z.id?1:0,L=[q,_,A,J.selected&&!q?1:0];for(let I=0;I<4;I++)if(this.nodeTargets[D*4+I]!==L[I])this.nodeTargets[D*4+I]=L[I],this.transitioning=!0,$=!0}if(this.paused=!!J.paused,!this.started)this.started=!0,this.setFormation({progress:this.reduced?1:0,playing:!this.reduced});if(J.data?.formation&&J.data.formation!==this.lastFormationInput)this.lastFormationInput=J.data.formation,this.setFormation(J.data.formation);if(this.dirty||=$,$&&this.timeout)clearTimeout(this.timeout),this.timeout=0;if(this.unavailable())this.cancel(),this.last=0;else this.schedule()}syncGeometry(J){let Q=!1;if(J.nodes.size>this.nodeCapacity)this.nodeCapacity=Math.max(J.nodes.size,this.nodeCapacity*2),this.nodeGeometry.dispose(),A6(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodeTargets=new Float32Array(this.nodeCapacity*4),Q=!0;let $=J.nodes.size+J.groups.size+J.leaves.size;if($>this.edgeCapacity)this.edgeCapacity=$*2,this.edgeGeometry.dispose(),A6(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4,edgeLife:1},this.edgeCapacity),Q=!0;if(J.leaves.size>this.leafCapacity)this.leafCapacity=J.leaves.size*2,this.leafGeometry.dispose(),A6(this.leafGeometry,{position:3,tint:3,leafMeta:4,leafCluster:1,leafLife:1},this.leafCapacity,!1),Q=!0;let Z=this.nodeGeometry.attributes,W=this.edgeGeometry.attributes,K=this.leafGeometry.attributes;this.nodeRows.clear(),this.clusterRows.clear(),this.leafRows.clear();let H=0,Y=0,X=(N,G,F,R,z,D,q,_,A,L=1)=>{Q=g8(W.source,Y,N,G)||Q,Q=g8(W.target,Y,F,R)||Q,Q=g8(W.tint,Y,z.r,z.g,z.b)||Q,Q=g8(W.edgeMeta,Y,D,q,_,A)||Q,Q=g8(W.edgeLife,Y,L)||Q,Y++};for(let N of J.nodes.values()){this.nodeRows.set(N.id,H);let G=N.id+":"+(N.color||""),F=this.colorByID.get(G);if(!F)F=new p0(N.color||r8(N.id).color),this.colorByID.set(G,F);if(this.colors[N.index]=F,Q=g8(Z.center,H,N.x,-N.y)||Q,Q=g8(Z.tint,H,F.r,F.g,F.b)||Q,Q=g8(Z.order,H,N.index)||Q,!J.selected&&!J.knowledge&&!J.department)X(0,0,N.x,N.y,F,0,N.index,-1,-3);H++}let U=0;for(let N of J.groups.values()){this.clusterRows.set(N.id,U++);let G=J.nodes.get(N.parent),F=this.colors[G.index];X(G.x,G.y,N.x,N.y,F,0.5,G.index,this.clusterRows.get(N.id),-3)}let E=0;for(let N of J.leaves.values()){let G=J.nodes.get(N.parent);if(!G)continue;let F=this.colors[G.index];if(this.leafRows.set(N.id,E),!this.leafBirths.has(N.id))this.leafBirths.set(N.id,this.clock),this.arrivalUntil=this.clock+0.34;Q=g8(K.position,E,N.x,-N.y,1)||Q,Q=g8(K.tint,E,F.r,F.g,F.b)||Q,Q=g8(K.leafMeta,E,G.index,N.index,E,this.leafBirths.get(N.id))||Q,Q=g8(K.leafCluster,E,this.clusterRows.get(N.group)??-2)||Q,Q=g8(K.leafLife,E,N.life??1)||Q;let R=N.route&&!N.retiring?{x:N.x-N.route.offset,y:N.y}:J.groups.get(N.group)||G;X(R.x,R.y,N.x,N.y,F,1,G.index,this.clusterRows.get(N.group)??-2,E,(N.life??1)*(J.selected&&J.leaves.size>150?0.24:1)),E++}if(this.nodeGeometry.instanceCount!==H||this.edgeGeometry.instanceCount!==Y||this.leafGeometry.drawRange.count!==E)Q=!0;this.nodeGeometry.instanceCount=H,this.edgeGeometry.instanceCount=Y,this.leafGeometry.setDrawRange(0,E);for(let N of this.leafBirths.keys())if(!J.leaves.has(N))this.leafBirths.delete(N);return Q}setQuality(J){let Q=T$(devicePixelRatio,J==="economy");if(J===this.quality&&Q===this.u.uDpr.value)return!1;if(this.quality=J,this.u.uEconomy.value=J==="economy"?1:0,this.u.uDpr.value=Q,this.renderer.setPixelRatio(Q),this.width)this.renderer.setSize(this.width,this.height,!1);return this.dirty=!0,!0}setPaused(J){if(!this.active)return;this.paused=!!J,this.cancel(),this.last=0,this.schedule()}setFormation(J){if(!this.active)return this.timeline.snapshot();let Q=this.timeline.set(this.reduced||this.failed||this.contextLost?{...J,progress:1,playing:!1}:J);if(this.u.uFormation.value=Q.progress,this.dirty=!0,this.timeout)clearTimeout(this.timeout),this.timeout=0;return this.applyFormation(!0),this.schedule(),Q}getFormation(){return this.timeline.snapshot()}applyFormation(J=!1){if(!this.model)return;let Q=this.timeline.progress;if(Q!==this.lastLabelProgress||J){for(let $ of this.model.nodes.values())$.g.style.opacity=Q===1?"":String(S8(Q,"collection",$.index,0,this.model.nodes.size));for(let $ of this.model.groups.values()){$.bus.style.opacity=String(($.busOpacity||0)*S8(Q,"group",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size)),$.g.style.opacity=Q===1?"":String(S8(Q,"group",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size));let Z=Q===1||S8(Q,"group",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size)>0.15;$.g.style.pointerEvents=Z?"":"none",$.g.setAttribute("tabindex",Z?"0":"-1")}for(let $ of this.model.leaves.values())$.g.style.opacity=Q===1?"":String(S8(Q,"skill",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size));if(this.host.querySelector(".oracle-core").style.opacity=Q===1?"":String(S8(Q,"sun")),this.model.connectorLayer)this.model.connectorLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));if(this.model.pluginLayer)this.model.pluginLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));if(this.model.knowledgeLayer)this.model.knowledgeLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));if(this.model.promptLayer)this.model.promptLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));for(let $ of this.model.nodes.values()){let Z=Q===1||S8(Q,"collection",$.index,0,this.model.nodes.size)>0.15;$.g.style.pointerEvents=Z?"":"none",$.g.setAttribute("tabindex",Z?"0":"-1")}for(let $ of this.model.leaves.values()){let Z=!$.retiring&&(Q===1||S8(Q,"skill",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size)>0.15);$.g.style.pointerEvents=Z?"":"none",$.g.setAttribute("tabindex",Z?"0":"-1")}this.lastLabelProgress=Q}if(J||Q===1&&this.lastNotifiedProgress!==1||this.clock-(this.lastNotifyAt||0)>0.2)this.lastNotifyAt=this.clock,this.lastNotifiedProgress=Q,this.host.dispatchEvent(new CustomEvent("oracle:formation",{detail:this.getFormation()}))}signalReceipt(J){if(!this.active||this.model?.data?.replay||J?.source!=="codex-hook"||!J.event_id)return!1;let Q=Date.now()-Date.parse(J.received_at);if(!Number.isFinite(Q)||Q<0||Q>8000||this.receipts.has(J.event_id))return!1;if(this.receipts.add(J.event_id),this.receipts.size>64)this.receipts.delete(this.receipts.values().next().value);return this.receiptAt=this.clock,this.dirty=!0,this.schedule(),!0}cancel(){cancelAnimationFrame(this.pending),clearTimeout(this.timeout),this.pending=0,this.timeout=0}schedule(){if(this.unavailable()||this.pending||this.timeout)return;let J=(this.transitioning||this.clock<(this.arrivalUntil||0))&&!this.reduced,Q=!this.paused&&!this.reduced;if(!this.dirty&&!Q&&!J)return;let $=()=>{this.timeout=0,this.pending=requestAnimationFrame((Z)=>{this.pending=0,this.render(Z),this.schedule()})};if(this.dirty||J||this.timeline.playing||this.model.geometryMoving||this.model.frame)$();else{let Z=1000/(this.quality==="economy"?15:24);this.timeout=setTimeout($,Math.max(0,Z-(performance.now()-this.last)-4))}}render(J){if(this.unavailable())return;let Q=1000/(this.timeline.playing||this.model.geometryMoving||this.model.frame?60:this.quality==="economy"?15:24);if(!this.dirty&&!this.transitioning&&this.clock>=(this.arrivalUntil||0)&&this.last&&J-this.last<Q-2)return;let $=performance.now(),Z=this.last?J-this.last:0,W=Math.min(Z||16.67,100);if(this.clock+=W/1000,!this.paused&&!this.reduced){if(this.time+=W/1000,Z)this.frameSamples.add(Z);if(this.timeline.playing)this.timeline.advance(W),this.u.uFormation.value=this.timeline.progress,this.applyFormation()}this.u.uTime.value=this.reduced?0:this.time,this.u.uClock.value=this.clock,this.u.uMotion.value=this.reduced?0:1;let K=(this.clock-this.receiptAt)/2.4;this.u.uReceipt.value=this.reduced||K>1?-1:K,this.u.uReconnect.value=this.reduced?0:Math.max(0,1-(this.clock-(this.reconnectAt??-100))/0.6);let H=this.nodeGeometry.attributes.nodeState,Y=this.reduced?1:1-Math.exp(-W/80);this.transitioning=!1;let X=(this.spotlightTarget||0)-this.u.uSpotlightAmount.value;if(Math.abs(X)>0.001)this.u.uSpotlightAmount.value+=X*Y,this.transitioning=!0;else if(this.u.uSpotlightAmount.value=this.spotlightTarget||0,!this.spotlightTarget)this.u.uSpotlight.value=-2;let U=!1;for(let N=0;N<this.nodeGeometry.instanceCount*4;N++){let G=this.nodeTargets[N]-H.array[N];if(Math.abs(G)>0.003)H.array[N]+=G*Y,this.transitioning=!0,U=!0;else if(H.array[N]!==this.nodeTargets[N])H.array[N]=this.nodeTargets[N],U=!0}if(U)H.needsUpdate=!0;if(this.model.animateOrbits?.(W))this.syncGeometry(this.model);this.renderer.render(this.scene,this.camera),this.renderCount++,this.last=J,this.dirty=!1;let E=performance.now()-$;if(this.costSamples.add(E),!this.paused&&!this.reduced&&!this.manualEconomy&&Z&&!this.model.drag&&!this.transitioning&&this.governor.observe(Z,E))this.setQuality("economy")}resetDiagnostics(){this.frameSamples.clear(),this.costSamples.clear()}diagnostics(){let J=this.renderer.info;return{renderer:"Three.js r185 · WebGL2 · instanced atlas",quality:this.quality,adaptiveEconomy:this.governor.degraded,buffer:[this.canvas.width,this.canvas.height],drawCalls:J.render.calls,triangles:J.render.triangles,geometries:J.memory.geometries,textures:J.memory.textures,renderCount:this.renderCount,samples:this.frameSamples.count,frameIntervalMedianMs:this.frameSamples.percentile(0.5),frameIntervalP95Ms:this.frameSamples.percentile(0.95),cpuSubmitMedianMs:this.costSamples.percentile(0.5),cpuSubmitP95Ms:this.costSamples.percentile(0.95),paused:this.paused||this.unavailable(),reduced:this.reduced,active:this.active,pendingFrames:Number(!!this.pending),pendingTimers:Number(!!this.timeout),formation:this.getFormation(),contextLost:!!this.contextLost,error:this.error||null,note:"CPU submission is not GPU time. Interaction and formation target 60 Hz; ambient targets 24 Hz and economy 15 Hz. Input preempts ambient deadlines. No telemetry is inferred from light."}}dispose(){if(!this.active)return;this.active=!1,this.cancel(),document.removeEventListener("visibilitychange",this.onVisibility),this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored);let J=new Set,Q=new Set;if(this.scene.traverse(($)=>{if($.geometry)J.add($.geometry);if($.material)Q.add($.material)}),J.forEach(($)=>$.dispose()),Q.forEach(($)=>$.dispose()),this.noiseTexture?.dispose(),this.renderer.dispose(),this.scene.clear(),this.nodeRows.clear(),this.clusterRows.clear(),this.leafRows.clear(),this.leafBirths.clear(),this.receipts.clear(),this.host.classList.remove("three-enabled"),this.model){for(let $ of this.model.nodes.values())$.g.style.opacity="";for(let $ of this.model.leaves.values())$.g.style.opacity=""}this.canvas.remove()}}window.OracleUniverse=xK;})();
