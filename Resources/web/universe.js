(()=>{var g$="185";var p$=0,wJ=1,m$=2;var j9=1,l$=2,q9=3,F9=0,P8=1,r8=2,t8=0,y9=1,IJ=2,AJ=3,CJ=4,d$=5;var D9=100,u$=101,c$=102,n$=103,s$=104,i$=200,o$=201,a$=202,r$=203,t$=204,e$=205,JW=206,QW=207,$W=208,WW=209,ZW=210,KW=211,HW=212,YW=213,XW=214,UW=0,GW=1,NW=2,_J=3,EW=4,qW=5,FW=6,DW=7,OW=0,RW=1,kW=2,n8=0,PJ=1,TJ=2,SJ=3,jJ=4,yJ=5,vJ=6,hJ=7;var O9=301,f6=302,L7=303,V7=304,v9=306,MW=1000,B7=1001,LW=1002,w6=1003,VW=1004;var h9=1005;var T8=1006,z7=1007;var b6=1008;var s8=1009,BW=1010,zW=1011,f9=1012,fJ=1013,I6=1014,G6=1015,N6=1016,bJ=1017,xJ=1018,R9=1020,wW=35902,IW=35899,AW=1021,CW=1022,e8=1023,x6=1026,g6=1027,_W=1028,gJ=1029,p6=1030,pJ=1031;var mJ=1033,w7=33776,I7=33777,A7=33778,C7=33779,lJ=35840,dJ=35841,uJ=35842,cJ=35843,nJ=36196,sJ=37492,iJ=37496,oJ=37488,aJ=37489,_7=37490,rJ=37491,tJ=37808,eJ=37809,JQ=37810,QQ=37811,$Q=37812,WQ=37813,ZQ=37814,KQ=37815,HQ=37816,YQ=37817,XQ=37818,UQ=37819,GQ=37820,NQ=37821,EQ=36492,qQ=36494,FQ=36495,DQ=36283,OQ=36284,P7=36285,RQ=36286;var kQ=0,PW=1,m6="",T7="srgb",MQ="srgb-linear",LQ="linear",r0="srgb";var TW=512,SW=513,jW=514,S7=515,yW=516,vW=517,j7=518,hW=519;var VQ="300 es",BQ=2000;function vZ(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function hZ(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function S9(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function fW(){let J=S9("canvas");return J.style.display="block",J}var D$={},E9=null;function zQ(...J){let Q="THREE."+J.shift();if(E9)E9("log",Q,...J);else console.log(Q,...J)}function bW(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function I0(...J){J=bW(J);let Q="THREE."+J.shift();if(E9)E9("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function _0(...J){J=bW(J);let Q="THREE."+J.shift();if(E9)E9("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function h6(...J){let Q=J.join(" ");if(Q in D$)return;D$[Q]=!0,I0(...J)}function xW(J,Q,$){return new Promise(function(W,Z){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:Z();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:W()}}setTimeout(K,$)})}var gW={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class E6{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let W=$[J];if(W!==void 0){let Z=W.indexOf(Q);if(Z!==-1)W.splice(Z,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let W=$.slice(0);for(let Z=0,K=W.length;Z<K;Z++)W[Z].call(this,J);J.target=null}}}var B8=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var e7=Math.PI/180,R7=180/Math.PI;function b9(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,W=Math.random()*4294967295|0;return(B8[J&255]+B8[J>>8&255]+B8[J>>16&255]+B8[J>>24&255]+"-"+B8[Q&255]+B8[Q>>8&255]+"-"+B8[Q>>16&15|64]+B8[Q>>24&255]+"-"+B8[$&63|128]+B8[$>>8&255]+"-"+B8[$>>16&255]+B8[$>>24&255]+B8[W&255]+B8[W>>8&255]+B8[W>>16&255]+B8[W>>24&255]).toLowerCase()}function g0(J,Q,$){return Math.max(Q,Math.min($,J))}function fZ(J,Q){return(J%Q+Q)%Q}function JJ(J,Q,$){return(1-$)*J+$*Q}function I9(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function _8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class u0{static{u0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6],this.y=W[1]*Q+W[4]*$+W[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(g0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=this.x-J.x,K=this.y-J.y;return this.x=Z*$-K*W+J.x,this.y=Z*W+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class q6{constructor(J=0,Q=0,$=0,W=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=W}static slerpFlat(J,Q,$,W,Z,K,H){let Y=$[W+0],X=$[W+1],U=$[W+2],N=$[W+3],E=Z[K+0],G=Z[K+1],D=Z[K+2],M=Z[K+3];if(N!==M||Y!==E||X!==G||U!==D){let z=Y*E+X*G+U*D+N*M;if(z<0)E=-E,G=-G,D=-D,M=-M,z=-z;let F=1-H;if(z<0.9995){let q=Math.acos(z),_=Math.sin(q);F=Math.sin(F*q)/_,H=Math.sin(H*q)/_,Y=Y*F+E*H,X=X*F+G*H,U=U*F+D*H,N=N*F+M*H}else{Y=Y*F+E*H,X=X*F+G*H,U=U*F+D*H,N=N*F+M*H;let q=1/Math.sqrt(Y*Y+X*X+U*U+N*N);Y*=q,X*=q,U*=q,N*=q}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,W,Z,K){let H=$[W],Y=$[W+1],X=$[W+2],U=$[W+3],N=Z[K],E=Z[K+1],G=Z[K+2],D=Z[K+3];return J[Q]=H*D+U*N+Y*G-X*E,J[Q+1]=Y*D+U*E+X*N-H*G,J[Q+2]=X*D+U*G+H*E-Y*N,J[Q+3]=U*D-H*N-Y*E-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,W){return this._x=J,this._y=Q,this._z=$,this._w=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:W,_z:Z,_order:K}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(W/2),N=H(Z/2),E=Y($/2),G=Y(W/2),D=Y(Z/2);switch(K){case"XYZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"YXZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"ZXY":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"ZYX":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"YZX":this._x=E*U*N+X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N-E*G*D;break;case"XZY":this._x=E*U*N-X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N+E*G*D;break;default:I0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,W=Math.sin($);return this._x=J.x*W,this._y=J.y*W,this._z=J.z*W,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],W=Q[4],Z=Q[8],K=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],N=Q[10],E=$+H+N;if(E>0){let G=0.5/Math.sqrt(E+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(Z-X)*G,this._z=(K-W)*G}else if($>H&&$>N){let G=2*Math.sqrt(1+$-H-N);this._w=(U-Y)/G,this._x=0.25*G,this._y=(W+K)/G,this._z=(Z+X)/G}else if(H>N){let G=2*Math.sqrt(1+H-$-N);this._w=(Z-X)/G,this._x=(W+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+N-$-H);this._w=(K-W)/G,this._x=(Z+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(g0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let W=Math.min(1,Q/$);return this.slerp(J,W),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+K*H+W*X-Z*Y,this._y=W*U+K*Y+Z*H-$*X,this._z=Z*U+K*X+$*Y-W*H,this._w=K*U-$*H-W*Y-Z*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=this.dot(J);if(H<0)$=-$,W=-W,Z=-Z,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),W=Math.sqrt(1-$),Z=Math.sqrt($);return this.set(W*Math.sin(J),W*Math.cos(J),Z*Math.sin(Q),Z*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class v{static{v.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(O$.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(O$.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6]*W,this.y=Z[1]*Q+Z[4]*$+Z[7]*W,this.z=Z[2]*Q+Z[5]*$+Z[8]*W,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements,K=1/(Z[3]*Q+Z[7]*$+Z[11]*W+Z[15]);return this.x=(Z[0]*Q+Z[4]*$+Z[8]*W+Z[12])*K,this.y=(Z[1]*Q+Z[5]*$+Z[9]*W+Z[13])*K,this.z=(Z[2]*Q+Z[6]*$+Z[10]*W+Z[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,W=this.z,Z=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*W-H*$),U=2*(H*Q-Z*W),N=2*(Z*$-K*Q);return this.x=Q+Y*X+K*N-H*U,this.y=$+Y*U+H*X-Z*N,this.z=W+Y*N+Z*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[4]*$+Z[8]*W,this.y=Z[1]*Q+Z[5]*$+Z[9]*W,this.z=Z[2]*Q+Z[6]*$+Z[10]*W,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this.z=g0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this.z=g0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:W,z:Z}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=W*Y-Z*H,this.y=Z*K-$*Y,this.z=$*H-W*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return QJ.copy(this).projectOnVector(J),this.sub(QJ)}reflect(J){return this.sub(QJ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(g0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,W=this.z-J.z;return Q*Q+$*$+W*W}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let W=Math.sin(Q)*J;return this.x=W*Math.sin($),this.y=Math.cos(Q)*J,this.z=W*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),W=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=W,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var QJ=new v,O$=new q6;class P0{static{P0.prototype.isMatrix3=!0}constructor(J,Q,$,W,Z,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X)}set(J,Q,$,W,Z,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=W,U[2]=H,U[3]=Q,U[4]=Z,U[5]=Y,U[6]=$,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],N=$[7],E=$[2],G=$[5],D=$[8],M=W[0],z=W[3],F=W[6],q=W[1],_=W[4],C=W[7],V=W[2],I=W[5],w=W[8];return Z[0]=K*M+H*q+Y*V,Z[3]=K*z+H*_+Y*I,Z[6]=K*F+H*C+Y*w,Z[1]=X*M+U*q+N*V,Z[4]=X*z+U*_+N*I,Z[7]=X*F+U*C+N*w,Z[2]=E*M+G*q+D*V,Z[5]=E*z+G*_+D*I,Z[8]=E*F+G*C+D*w,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*K*U-Q*H*X-$*Z*U+$*H*Y+W*Z*X-W*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=U*K-H*X,E=H*Y-U*Z,G=X*Z-K*Y,D=Q*N+$*E+W*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/D;return J[0]=N*M,J[1]=(W*X-U*$)*M,J[2]=(H*$-W*K)*M,J[3]=E*M,J[4]=(U*Q-W*Y)*M,J[5]=(W*Z-H*Q)*M,J[6]=G*M,J[7]=($*Y-X*Q)*M,J[8]=(K*Q-$*Z)*M,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,W,Z,K,H){let Y=Math.cos(Z),X=Math.sin(Z);return this.set($*Y,$*X,-$*(Y*K+X*H)+K+J,-W*X,W*Y,-W*(-X*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return h6("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($J.makeScale(J,Q)),this}rotate(J){return h6("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($J.makeRotation(-J)),this}translate(J,Q){return h6("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($J.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<9;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var $J=new P0,R$=new P0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),k$=new P0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function bZ(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(Z,K,H){if(this.enabled===!1||K===H||!K||!H)return Z;if(this.spaces[K].transfer==="srgb")Z.r=U6(Z.r),Z.g=U6(Z.g),Z.b=U6(Z.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)Z.applyMatrix3(this.spaces[K].toXYZ),Z.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")Z.r=N9(Z.r),Z.g=N9(Z.g),Z.b=N9(Z.b);return Z},workingToColorSpace:function(Z,K){return this.convert(Z,this.workingColorSpace,K)},colorSpaceToWorking:function(Z,K){return this.convert(Z,K,this.workingColorSpace)},getPrimaries:function(Z){return this.spaces[Z].primaries},getTransfer:function(Z){if(Z==="")return"linear";return this.spaces[Z].transfer},getToneMappingMode:function(Z){return this.spaces[Z].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(Z,K=this.workingColorSpace){return Z.fromArray(this.spaces[K].luminanceCoefficients)},define:function(Z){Object.assign(this.spaces,Z)},_getMatrix:function(Z,K,H){return Z.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(Z){return this.spaces[Z].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(Z=this.workingColorSpace){return this.spaces[Z].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(Z,K){return h6("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(Z,K)},toWorkingColorSpace:function(Z,K){return h6("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(Z,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],W=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:W,transfer:"linear",toXYZ:R$,fromXYZ:k$,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:W,transfer:"srgb",toXYZ:R$,fromXYZ:k$,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var x0=bZ();function U6(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function N9(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var t6;class wQ{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(t6===void 0)t6=S9("canvas");t6.width=J.width,t6.height=J.height;let W=t6.getContext("2d");if(J instanceof ImageData)W.putImageData(J,0,0);else W.drawImage(J,0,0,J.width,J.height);$=t6}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=S9("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let W=$.getImageData(0,0,J.width,J.height),Z=W.data;for(let K=0;K<Z.length;K++)Z[K]=U6(Z[K]/255)*255;return $.putImageData(W,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(U6(Q[$]/255)*255);else Q[$]=U6(Q[$]);return{data:Q,width:J.width,height:J.height}}else return I0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var xZ=0;class x9{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:xZ++}),this.uuid=b9(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},W=this.data;if(W!==null){let Z;if(Array.isArray(W)){Z=[];for(let K=0,H=W.length;K<H;K++)if(W[K].isDataTexture)Z.push(WJ(W[K].image));else Z.push(WJ(W[K]))}else Z=WJ(W);$.url=Z}if(!Q)J.images[this.uuid]=$;return $}}function WJ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return wQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return I0("Texture: Unable to serialize Texture."),{}}var gZ=0,ZJ=new v;class L8 extends E6{constructor(J=L8.DEFAULT_IMAGE,Q=L8.DEFAULT_MAPPING,$=1001,W=1001,Z=1006,K=1008,H=1023,Y=1009,X=L8.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:gZ++}),this.uuid=b9(),this.name="",this.source=new x9(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=W,this.magFilter=Z,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new u0(0,0),this.repeat=new u0(1,1),this.center=new u0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new P0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ZJ).x}get height(){return this.source.getSize(ZJ).y}get depth(){return this.source.getSize(ZJ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){I0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){I0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(W&&$&&(W.isVector2&&$.isVector2))W.copy($);else if(W&&$&&(W.isVector3&&$.isVector3))W.copy($);else if(W&&$&&(W.isMatrix3&&$.isMatrix3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}L8.DEFAULT_IMAGE=null;L8.DEFAULT_MAPPING=300;L8.DEFAULT_ANISOTROPY=1;class H8{static{H8.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,W=1){this.x=J,this.y=Q,this.z=$,this.w=W}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,W){return this.x=J,this.y=Q,this.z=$,this.w=W,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*W+K[12]*Z,this.y=K[1]*Q+K[5]*$+K[9]*W+K[13]*Z,this.z=K[2]*Q+K[6]*$+K[10]*W+K[14]*Z,this.w=K[3]*Q+K[7]*$+K[11]*W+K[15]*Z,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,W,Z,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],N=Y[8],E=Y[1],G=Y[5],D=Y[9],M=Y[2],z=Y[6],F=Y[10];if(Math.abs(U-E)<0.01&&Math.abs(N-M)<0.01&&Math.abs(D-z)<0.01){if(Math.abs(U+E)<0.1&&Math.abs(N+M)<0.1&&Math.abs(D+z)<0.1&&Math.abs(X+G+F-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let _=(X+1)/2,C=(G+1)/2,V=(F+1)/2,I=(U+E)/4,w=(N+M)/4,P=(D+z)/4;if(_>C&&_>V)if(_<0.01)$=0,W=0.707106781,Z=0.707106781;else $=Math.sqrt(_),W=I/$,Z=w/$;else if(C>V)if(C<0.01)$=0.707106781,W=0,Z=0.707106781;else W=Math.sqrt(C),$=I/W,Z=P/W;else if(V<0.01)$=0.707106781,W=0.707106781,Z=0;else Z=Math.sqrt(V),$=w/Z,W=P/Z;return this.set($,W,Z,Q),this}let q=Math.sqrt((z-D)*(z-D)+(N-M)*(N-M)+(E-U)*(E-U));if(Math.abs(q)<0.001)q=1;return this.x=(z-D)/q,this.y=(N-M)/q,this.z=(E-U)/q,this.w=Math.acos((X+G+F-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this.z=g0(this.z,J.z,Q.z),this.w=g0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this.z=g0(this.z,J,Q),this.w=g0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class IQ extends E6{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new H8(0,0,J,Q),this.scissorTest=!1,this.viewport=new H8(0,0,J,Q),this.textures=[];let W={width:J,height:Q,depth:$.depth},Z=new L8(W),K=$.count;for(let H=0;H<K;H++)this.textures[H]=Z.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let W=0,Z=this.textures.length;W<Z;W++)if(this.textures[W].image.width=J,this.textures[W].image.height=Q,this.textures[W].image.depth=$,this.textures[W].isData3DTexture!==!0)this.textures[W].isArrayTexture=this.textures[W].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let W=Object.assign({},J.textures[Q].image);this.textures[Q].source=new x9(W)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class m8 extends IQ{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class y7 extends L8{constructor(J=null,Q=1,$=1,W=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class AQ extends L8{constructor(J=null,Q=1,$=1,W=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class W8{static{W8.prototype.isMatrix4=!0}constructor(J,Q,$,W,Z,K,H,Y,X,U,N,E,G,D,M,z){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X,U,N,E,G,D,M,z)}set(J,Q,$,W,Z,K,H,Y,X,U,N,E,G,D,M,z){let F=this.elements;return F[0]=J,F[4]=Q,F[8]=$,F[12]=W,F[1]=Z,F[5]=K,F[9]=H,F[13]=Y,F[2]=X,F[6]=U,F[10]=N,F[14]=E,F[3]=G,F[7]=D,F[11]=M,F[15]=z,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new W8().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,W=1/e6.setFromMatrixColumn(J,0).length(),Z=1/e6.setFromMatrixColumn(J,1).length(),K=1/e6.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*W,Q[1]=$[1]*W,Q[2]=$[2]*W,Q[3]=0,Q[4]=$[4]*Z,Q[5]=$[5]*Z,Q[6]=$[6]*Z,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(W),X=Math.sin(W),U=Math.cos(Z),N=Math.sin(Z);if(J.order==="XYZ"){let E=K*U,G=K*N,D=H*U,M=H*N;Q[0]=Y*U,Q[4]=-Y*N,Q[8]=X,Q[1]=G+D*X,Q[5]=E-M*X,Q[9]=-H*Y,Q[2]=M-E*X,Q[6]=D+G*X,Q[10]=K*Y}else if(J.order==="YXZ"){let E=Y*U,G=Y*N,D=X*U,M=X*N;Q[0]=E+M*H,Q[4]=D*H-G,Q[8]=K*X,Q[1]=K*N,Q[5]=K*U,Q[9]=-H,Q[2]=G*H-D,Q[6]=M+E*H,Q[10]=K*Y}else if(J.order==="ZXY"){let E=Y*U,G=Y*N,D=X*U,M=X*N;Q[0]=E-M*H,Q[4]=-K*N,Q[8]=D+G*H,Q[1]=G+D*H,Q[5]=K*U,Q[9]=M-E*H,Q[2]=-K*X,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let E=K*U,G=K*N,D=H*U,M=H*N;Q[0]=Y*U,Q[4]=D*X-G,Q[8]=E*X+M,Q[1]=Y*N,Q[5]=M*X+E,Q[9]=G*X-D,Q[2]=-X,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let E=K*Y,G=K*X,D=H*Y,M=H*X;Q[0]=Y*U,Q[4]=M-E*N,Q[8]=D*N+G,Q[1]=N,Q[5]=K*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*N+D,Q[10]=E-M*N}else if(J.order==="XZY"){let E=K*Y,G=K*X,D=H*Y,M=H*X;Q[0]=Y*U,Q[4]=-N,Q[8]=X*U,Q[1]=E*N+M,Q[5]=K*U,Q[9]=G*N-D,Q[2]=D*N-G,Q[6]=H*U,Q[10]=M*N+E}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(pZ,J,mZ)}lookAt(J,Q,$){let W=this.elements;if(j8.subVectors(J,Q),j8.lengthSq()===0)j8.z=1;if(j8.normalize(),R6.crossVectors($,j8),R6.lengthSq()===0){if(Math.abs($.z)===1)j8.x+=0.0001;else j8.z+=0.0001;j8.normalize(),R6.crossVectors($,j8)}return R6.normalize(),s9.crossVectors(j8,R6),W[0]=R6.x,W[4]=s9.x,W[8]=j8.x,W[1]=R6.y,W[5]=s9.y,W[9]=j8.y,W[2]=R6.z,W[6]=s9.z,W[10]=j8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],N=$[5],E=$[9],G=$[13],D=$[2],M=$[6],z=$[10],F=$[14],q=$[3],_=$[7],C=$[11],V=$[15],I=W[0],w=W[4],P=W[8],R=W[12],B=W[1],d=W[5],A=W[9],m=W[13],o=W[2],p=W[6],n=W[10],u=W[14],b=W[3],t=W[7],e=W[11],H0=W[15];return Z[0]=K*I+H*B+Y*o+X*b,Z[4]=K*w+H*d+Y*p+X*t,Z[8]=K*P+H*A+Y*n+X*e,Z[12]=K*R+H*m+Y*u+X*H0,Z[1]=U*I+N*B+E*o+G*b,Z[5]=U*w+N*d+E*p+G*t,Z[9]=U*P+N*A+E*n+G*e,Z[13]=U*R+N*m+E*u+G*H0,Z[2]=D*I+M*B+z*o+F*b,Z[6]=D*w+M*d+z*p+F*t,Z[10]=D*P+M*A+z*n+F*e,Z[14]=D*R+M*m+z*u+F*H0,Z[3]=q*I+_*B+C*o+V*b,Z[7]=q*w+_*d+C*p+V*t,Z[11]=q*P+_*A+C*n+V*e,Z[15]=q*R+_*m+C*u+V*H0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],N=J[6],E=J[10],G=J[14],D=J[3],M=J[7],z=J[11],F=J[15],q=Y*G-X*E,_=H*G-X*N,C=H*E-Y*N,V=K*G-X*U,I=K*E-Y*U,w=K*N-H*U;return Q*(M*q-z*_+F*C)-$*(D*q-z*V+F*I)+W*(D*_-M*V+F*w)-Z*(D*C-M*I+z*w)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(K*U-H*X)-$*(Z*U-H*Y)+W*(Z*X-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let W=this.elements;if(J.isVector3)W[12]=J.x,W[13]=J.y,W[14]=J.z;else W[12]=J,W[13]=Q,W[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=J[9],E=J[10],G=J[11],D=J[12],M=J[13],z=J[14],F=J[15],q=Q*H-$*K,_=Q*Y-W*K,C=Q*X-Z*K,V=$*Y-W*H,I=$*X-Z*H,w=W*X-Z*Y,P=U*M-N*D,R=U*z-E*D,B=U*F-G*D,d=N*z-E*M,A=N*F-G*M,m=E*F-G*z,o=q*m-_*A+C*d+V*B-I*R+w*P;if(o===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let p=1/o;return J[0]=(H*m-Y*A+X*d)*p,J[1]=(W*A-$*m-Z*d)*p,J[2]=(M*w-z*I+F*V)*p,J[3]=(E*I-N*w-G*V)*p,J[4]=(Y*B-K*m-X*R)*p,J[5]=(Q*m-W*B+Z*R)*p,J[6]=(z*C-D*w-F*_)*p,J[7]=(U*w-E*C+G*_)*p,J[8]=(K*A-H*B+X*P)*p,J[9]=($*B-Q*A-Z*P)*p,J[10]=(D*I-M*C+F*q)*p,J[11]=(N*C-U*I-G*q)*p,J[12]=(H*R-K*d-Y*P)*p,J[13]=(Q*d-$*R+W*P)*p,J[14]=(M*_-D*V-z*q)*p,J[15]=(U*V-N*_+E*q)*p,this}scale(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z;return Q[0]*=$,Q[4]*=W,Q[8]*=Z,Q[1]*=$,Q[5]*=W,Q[9]*=Z,Q[2]*=$,Q[6]*=W,Q[10]*=Z,Q[3]*=$,Q[7]*=W,Q[11]*=Z,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],W=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,W))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=1-$,K=J.x,H=J.y,Y=J.z,X=Z*K,U=Z*H;return this.set(X*K+$,X*H-W*Y,X*Y+W*H,0,X*H+W*Y,U*H+$,U*Y-W*K,0,X*Y-W*H,U*Y+W*K,Z*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,W,Z,K){return this.set(1,$,Z,0,J,1,K,0,Q,W,1,0,0,0,0,1),this}compose(J,Q,$){let W=this.elements,Z=Q._x,K=Q._y,H=Q._z,Y=Q._w,X=Z+Z,U=K+K,N=H+H,E=Z*X,G=Z*U,D=Z*N,M=K*U,z=K*N,F=H*N,q=Y*X,_=Y*U,C=Y*N,V=$.x,I=$.y,w=$.z;return W[0]=(1-(M+F))*V,W[1]=(G+C)*V,W[2]=(D-_)*V,W[3]=0,W[4]=(G-C)*I,W[5]=(1-(E+F))*I,W[6]=(z+q)*I,W[7]=0,W[8]=(D+_)*w,W[9]=(z-q)*w,W[10]=(1-(E+M))*w,W[11]=0,W[12]=J.x,W[13]=J.y,W[14]=J.z,W[15]=1,this}decompose(J,Q,$){let W=this.elements;J.x=W[12],J.y=W[13],J.z=W[14];let Z=this.determinantAffine();if(Z===0)return $.set(1,1,1),Q.identity(),this;let K=e6.set(W[0],W[1],W[2]).length(),H=e6.set(W[4],W[5],W[6]).length(),Y=e6.set(W[8],W[9],W[10]).length();if(Z<0)K=-K;d8.copy(this);let X=1/K,U=1/H,N=1/Y;return d8.elements[0]*=X,d8.elements[1]*=X,d8.elements[2]*=X,d8.elements[4]*=U,d8.elements[5]*=U,d8.elements[6]*=U,d8.elements[8]*=N,d8.elements[9]*=N,d8.elements[10]*=N,Q.setFromRotationMatrix(d8),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2*Z/(Q-J),N=2*Z/($-W),E=(Q+J)/(Q-J),G=($+W)/($-W),D,M;if(Y)D=Z/(K-Z),M=K*Z/(K-Z);else if(H===2000)D=-(K+Z)/(K-Z),M=-2*K*Z/(K-Z);else if(H===2001)D=-K/(K-Z),M=-K*Z/(K-Z);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=E,X[12]=0,X[1]=0,X[5]=N,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=D,X[14]=M,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),N=2/($-W),E=-(Q+J)/(Q-J),G=-($+W)/($-W),D,M;if(Y)D=1/(K-Z),M=K/(K-Z);else if(H===2000)D=-2/(K-Z),M=-(K+Z)/(K-Z);else if(H===2001)D=-1/(K-Z),M=-Z/(K-Z);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=E,X[1]=0,X[5]=N,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=D,X[14]=M,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<16;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var e6=new v,d8=new W8,pZ=new v(0,0,0),mZ=new v(1,1,1),R6=new v,s9=new v,j8=new v,M$=new W8,L$=new q6;class z6{constructor(J=0,Q=0,$=0,W=z6.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=W}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,W=this._order){return this._x=J,this._y=Q,this._z=$,this._order=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let W=J.elements,Z=W[0],K=W[4],H=W[8],Y=W[1],X=W[5],U=W[9],N=W[2],E=W[6],G=W[10];switch(Q){case"XYZ":if(this._y=Math.asin(g0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,Z);else this._x=Math.atan2(E,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-g0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-N,Z),this._z=0;break;case"ZXY":if(this._x=Math.asin(g0(E,-1,1)),Math.abs(E)<0.9999999)this._y=Math.atan2(-N,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,Z);break;case"ZYX":if(this._y=Math.asin(-g0(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(E,G),this._z=Math.atan2(Y,Z);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(g0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-N,Z);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-g0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(E,X),this._y=Math.atan2(H,Z);else this._x=Math.atan2(-U,G),this._y=0;break;default:I0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return M$.makeRotationFromQuaternion(J),this.setFromRotationMatrix(M$,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return L$.setFromEuler(this),this.setFromQuaternion(L$,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}z6.DEFAULT_ORDER="XYZ";class v7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var lZ=0,V$=new v,J9=new q6,W6=new W8,i9=new v,A9=new v,dZ=new v,uZ=new q6,B$=new v(1,0,0),z$=new v(0,1,0),w$=new v(0,0,1),I$={type:"added"},cZ={type:"removed"},Q9={type:"childadded",child:null},KJ={type:"childremoved",child:null};class w8 extends E6{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:lZ++}),this.uuid=b9(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=w8.DEFAULT_UP.clone();let J=new v,Q=new z6,$=new q6,W=new v(1,1,1);function Z(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(Z),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:W},modelViewMatrix:{value:new W8},normalMatrix:{value:new P0}}),this.matrix=new W8,this.matrixWorld=new W8,this.matrixAutoUpdate=w8.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=w8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new v7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return J9.setFromAxisAngle(J,Q),this.quaternion.multiply(J9),this}rotateOnWorldAxis(J,Q){return J9.setFromAxisAngle(J,Q),this.quaternion.premultiply(J9),this}rotateX(J){return this.rotateOnAxis(B$,J)}rotateY(J){return this.rotateOnAxis(z$,J)}rotateZ(J){return this.rotateOnAxis(w$,J)}translateOnAxis(J,Q){return V$.copy(J).applyQuaternion(this.quaternion),this.position.add(V$.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(B$,J)}translateY(J){return this.translateOnAxis(z$,J)}translateZ(J){return this.translateOnAxis(w$,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(W6.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)i9.copy(J);else i9.set(J,Q,$);let W=this.parent;if(this.updateWorldMatrix(!0,!1),A9.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)W6.lookAt(A9,i9,this.up);else W6.lookAt(i9,A9,this.up);if(this.quaternion.setFromRotationMatrix(W6),W)W6.extractRotation(W.matrixWorld),J9.setFromRotationMatrix(W6),this.quaternion.premultiply(J9.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return _0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(I$),Q9.child=J,this.dispatchEvent(Q9),Q9.child=null;else _0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(cZ),KJ.child=J,this.dispatchEvent(KJ),KJ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),W6.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),W6.multiply(J.parent.matrixWorld);return J.applyMatrix4(W6),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(I$),Q9.child=J,this.dispatchEvent(Q9),Q9.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,W=this.children.length;$<W;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let W=this.children;for(let Z=0,K=W.length;Z<K;Z++)W[Z].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(A9,J,dZ),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(A9,uZ,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:W}=J,Z=this.matrix.elements;Z[12]+=Q-Z[0]*Q-Z[4]*$-Z[8]*W,Z[13]+=$-Z[1]*Q-Z[5]*$-Z[9]*W,Z[14]+=W-Z[2]*Q-Z[6]*$-Z[10]*W}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let W=this.parent;if(J===!0&&W!==null)W.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let Z=this.children;for(let K=0,H=Z.length;K<H;K++)Z[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let W={};if(W.uuid=this.uuid,W.type=this.type,this.name!=="")W.name=this.name;if(this.castShadow===!0)W.castShadow=!0;if(this.receiveShadow===!0)W.receiveShadow=!0;if(this.visible===!1)W.visible=!1;if(this.frustumCulled===!1)W.frustumCulled=!1;if(this.renderOrder!==0)W.renderOrder=this.renderOrder;if(this.static!==!1)W.static=this.static;if(Object.keys(this.userData).length>0)W.userData=this.userData;if(W.layers=this.layers.mask,W.matrix=this.matrix.toArray(),W.up=this.up.toArray(),this.pivot!==null)W.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)W.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)W.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)W.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(W.type="InstancedMesh",W.count=this.count,W.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)W.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(W.type="BatchedMesh",W.perObjectFrustumCulled=this.perObjectFrustumCulled,W.sortObjects=this.sortObjects,W.drawRanges=this._drawRanges,W.reservedRanges=this._reservedRanges,W.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),W.instanceInfo=this._instanceInfo.map((H)=>({...H})),W.availableInstanceIds=this._availableInstanceIds.slice(),W.availableGeometryIds=this._availableGeometryIds.slice(),W.nextIndexStart=this._nextIndexStart,W.nextVertexStart=this._nextVertexStart,W.geometryCount=this._geometryCount,W.maxInstanceCount=this._maxInstanceCount,W.maxVertexCount=this._maxVertexCount,W.maxIndexCount=this._maxIndexCount,W.geometryInitialized=this._geometryInitialized,W.matricesTexture=this._matricesTexture.toJSON(J),W.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)W.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)W.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)W.boundingBox=this.boundingBox.toJSON()}function Z(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)W.background=this.background.toJSON();else if(this.background.isTexture)W.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)W.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){W.geometry=Z(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let N=Y[X];Z(J.shapes,N)}else Z(J.shapes,Y)}}if(this.isSkinnedMesh){if(W.bindMode=this.bindMode,W.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)Z(J.skeletons,this.skeleton),W.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(Z(J.materials,this.material[Y]));W.material=H}else W.material=Z(J.materials,this.material);if(this.children.length>0){W.children=[];for(let H=0;H<this.children.length;H++)W.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){W.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];W.animations.push(Z(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),N=K(J.shapes),E=K(J.skeletons),G=K(J.animations),D=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(N.length>0)$.shapes=N;if(E.length>0)$.skeletons=E;if(G.length>0)$.animations=G;if(D.length>0)$.nodes=D}return $.object=W,$;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let W=J.children[$];this.add(W.clone())}return this}}w8.DEFAULT_UP=new v(0,1,0);w8.DEFAULT_MATRIX_AUTO_UPDATE=!0;w8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class G9 extends w8{constructor(){super();this.isGroup=!0,this.type="Group"}}var nZ={type:"move"};class g9{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new G9,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new G9,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new v,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new v;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new G9,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new v,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new v,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let W=null,Z=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let M of J.hand.values()){let z=Q.getJointPose(M,$),F=this._getHandJoint(X,M);if(z!==null)F.matrix.fromArray(z.transform.matrix),F.matrix.decompose(F.position,F.rotation,F.scale),F.matrixWorldNeedsUpdate=!0,F.jointRadius=z.radius;F.visible=z!==null}let U=X.joints["index-finger-tip"],N=X.joints["thumb-tip"],E=U.position.distanceTo(N.position),G=0.02,D=0.005;if(X.inputState.pinching&&E>G+D)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&E<=G-D)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(Z=Q.getPose(J.gripSpace,$),Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(W=Q.getPose(J.targetRaySpace,$),W===null&&Z!==null)W=Z;if(W!==null){if(H.matrix.fromArray(W.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,W.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(W.linearVelocity);else H.hasLinearVelocity=!1;if(W.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(W.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(nZ)}}}if(H!==null)H.visible=W!==null;if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new G9;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var pW={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},k6={h:0,s:0,l:0},o9={h:0,s:0,l:0};function HJ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class v0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let W=J;if(W&&W.isColor)this.copy(W);else if(typeof W==="number")this.setHex(W);else if(typeof W==="string")this.setStyle(W)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,x0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,W=x0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,x0.colorSpaceToWorking(this,W),this}setHSL(J,Q,$,W=x0.workingColorSpace){if(J=fZ(J,1),Q=g0(Q,0,1),$=g0($,0,1),Q===0)this.r=this.g=this.b=$;else{let Z=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-Z;this.r=HJ(K,Z,J+0.3333333333333333),this.g=HJ(K,Z,J),this.b=HJ(K,Z,J-0.3333333333333333)}return x0.colorSpaceToWorking(this,W),this}setStyle(J,Q="srgb"){function $(Z){if(Z===void 0)return;if(parseFloat(Z)<1)I0("Color: Alpha component of "+J+" will be ignored.")}let W;if(W=/^(\w+)\(([^\)]*)\)/.exec(J)){let Z,K=W[1],H=W[2];switch(K){case"rgb":case"rgba":if(Z=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(255,parseInt(Z[1],10))/255,Math.min(255,parseInt(Z[2],10))/255,Math.min(255,parseInt(Z[3],10))/255,Q);if(Z=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(100,parseInt(Z[1],10))/100,Math.min(100,parseInt(Z[2],10))/100,Math.min(100,parseInt(Z[3],10))/100,Q);break;case"hsl":case"hsla":if(Z=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setHSL(parseFloat(Z[1])/360,parseFloat(Z[2])/100,parseFloat(Z[3])/100,Q);break;default:I0("Color: Unknown color model "+J)}}else if(W=/^\#([A-Fa-f\d]+)$/.exec(J)){let Z=W[1],K=Z.length;if(K===3)return this.setRGB(parseInt(Z.charAt(0),16)/15,parseInt(Z.charAt(1),16)/15,parseInt(Z.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(Z,16),Q);else I0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=pW[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else I0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=U6(J.r),this.g=U6(J.g),this.b=U6(J.b),this}copyLinearToSRGB(J){return this.r=N9(J.r),this.g=N9(J.g),this.b=N9(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return x0.workingToColorSpace(z8.copy(this),J),Math.round(g0(z8.r*255,0,255))*65536+Math.round(g0(z8.g*255,0,255))*256+Math.round(g0(z8.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=x0.workingColorSpace){x0.workingToColorSpace(z8.copy(this),Q);let{r:$,g:W,b:Z}=z8,K=Math.max($,W,Z),H=Math.min($,W,Z),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let N=K-H;switch(X=U<=0.5?N/(K+H):N/(2-K-H),K){case $:Y=(W-Z)/N+(W<Z?6:0);break;case W:Y=(Z-$)/N+2;break;case Z:Y=($-W)/N+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=x0.workingColorSpace){return x0.workingToColorSpace(z8.copy(this),Q),J.r=z8.r,J.g=z8.g,J.b=z8.b,J}getStyle(J="srgb"){x0.workingToColorSpace(z8.copy(this),J);let{r:Q,g:$,b:W}=z8;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${W.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(W*255)})`}offsetHSL(J,Q,$){return this.getHSL(k6),this.setHSL(k6.h+J,k6.s+Q,k6.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(k6),J.getHSL(o9);let $=JJ(k6.h,o9.h,Q),W=JJ(k6.s,o9.s,Q),Z=JJ(k6.l,o9.l,Q);return this.setHSL($,W,Z),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,W=this.b,Z=J.elements;return this.r=Z[0]*Q+Z[3]*$+Z[6]*W,this.g=Z[1]*Q+Z[4]*$+Z[7]*W,this.b=Z[2]*Q+Z[5]*$+Z[8]*W,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var z8=new v0;v0.NAMES=pW;class h7 extends w8{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new z6,this.environmentIntensity=1,this.environmentRotation=new z6,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var u8=new v,Z6=new v,YJ=new v,K6=new v,$9=new v,W9=new v,A$=new v,XJ=new v,UJ=new v,GJ=new v,NJ=new H8,EJ=new H8,qJ=new H8;class g8{constructor(J=new v,Q=new v,$=new v){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,W){W.subVectors($,Q),u8.subVectors(J,Q),W.cross(u8);let Z=W.lengthSq();if(Z>0)return W.multiplyScalar(1/Math.sqrt(Z));return W.set(0,0,0)}static getBarycoord(J,Q,$,W,Z){u8.subVectors(W,Q),Z6.subVectors($,Q),YJ.subVectors(J,Q);let K=u8.dot(u8),H=u8.dot(Z6),Y=u8.dot(YJ),X=Z6.dot(Z6),U=Z6.dot(YJ),N=K*X-H*H;if(N===0)return Z.set(0,0,0),null;let E=1/N,G=(X*Y-H*U)*E,D=(K*U-H*Y)*E;return Z.set(1-G-D,D,G)}static containsPoint(J,Q,$,W){if(this.getBarycoord(J,Q,$,W,K6)===null)return!1;return K6.x>=0&&K6.y>=0&&K6.x+K6.y<=1}static getInterpolation(J,Q,$,W,Z,K,H,Y){if(this.getBarycoord(J,Q,$,W,K6)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(Z,K6.x),Y.addScaledVector(K,K6.y),Y.addScaledVector(H,K6.z),Y}static getInterpolatedAttribute(J,Q,$,W,Z,K){return NJ.setScalar(0),EJ.setScalar(0),qJ.setScalar(0),NJ.fromBufferAttribute(J,Q),EJ.fromBufferAttribute(J,$),qJ.fromBufferAttribute(J,W),K.setScalar(0),K.addScaledVector(NJ,Z.x),K.addScaledVector(EJ,Z.y),K.addScaledVector(qJ,Z.z),K}static isFrontFacing(J,Q,$,W){return u8.subVectors($,Q),Z6.subVectors(J,Q),u8.cross(Z6).dot(W)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,W){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[W]),this}setFromAttributeAndIndices(J,Q,$,W){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,W),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return u8.subVectors(this.c,this.b),Z6.subVectors(this.a,this.b),u8.cross(Z6).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return g8.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return g8.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,W,Z){return g8.getInterpolation(J,this.a,this.b,this.c,Q,$,W,Z)}containsPoint(J){return g8.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return g8.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,W=this.b,Z=this.c,K,H;$9.subVectors(W,$),W9.subVectors(Z,$),XJ.subVectors(J,$);let Y=$9.dot(XJ),X=W9.dot(XJ);if(Y<=0&&X<=0)return Q.copy($);UJ.subVectors(J,W);let U=$9.dot(UJ),N=W9.dot(UJ);if(U>=0&&N<=U)return Q.copy(W);let E=Y*N-U*X;if(E<=0&&Y>=0&&U<=0)return K=Y/(Y-U),Q.copy($).addScaledVector($9,K);GJ.subVectors(J,Z);let G=$9.dot(GJ),D=W9.dot(GJ);if(D>=0&&G<=D)return Q.copy(Z);let M=G*X-Y*D;if(M<=0&&X>=0&&D<=0)return H=X/(X-D),Q.copy($).addScaledVector(W9,H);let z=U*D-G*N;if(z<=0&&N-U>=0&&G-D>=0)return A$.subVectors(Z,W),H=(N-U)/(N-U+(G-D)),Q.copy(W).addScaledVector(A$,H);let F=1/(z+M+E);return K=M*F,H=E*F,Q.copy($).addScaledVector($9,K).addScaledVector(W9,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class l6{constructor(J=new v(1/0,1/0,1/0),Q=new v(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(c8.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(c8.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=c8.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let Z=$.getAttribute("position");if(Q===!0&&Z!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=Z.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,c8);else c8.fromBufferAttribute(Z,K);c8.applyMatrix4(J.matrixWorld),this.expandByPoint(c8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();a9.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();a9.copy($.boundingBox)}a9.applyMatrix4(J.matrixWorld),this.union(a9)}}let W=J.children;for(let Z=0,K=W.length;Z<K;Z++)this.expandByObject(W[Z],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,c8),c8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(C9),r9.subVectors(this.max,C9),Z9.subVectors(J.a,C9),K9.subVectors(J.b,C9),H9.subVectors(J.c,C9),M6.subVectors(K9,Z9),L6.subVectors(H9,K9),S6.subVectors(Z9,H9);let Q=[0,-M6.z,M6.y,0,-L6.z,L6.y,0,-S6.z,S6.y,M6.z,0,-M6.x,L6.z,0,-L6.x,S6.z,0,-S6.x,-M6.y,M6.x,0,-L6.y,L6.x,0,-S6.y,S6.x,0];if(!FJ(Q,Z9,K9,H9,r9))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!FJ(Q,Z9,K9,H9,r9))return!1;return t9.crossVectors(M6,L6),Q=[t9.x,t9.y,t9.z],FJ(Q,Z9,K9,H9,r9)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,c8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(c8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return H6[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),H6[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),H6[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),H6[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),H6[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),H6[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),H6[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),H6[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(H6),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var H6=[new v,new v,new v,new v,new v,new v,new v,new v],c8=new v,a9=new l6,Z9=new v,K9=new v,H9=new v,M6=new v,L6=new v,S6=new v,C9=new v,r9=new v,t9=new v,j6=new v;function FJ(J,Q,$,W,Z){for(let K=0,H=J.length-3;K<=H;K+=3){j6.fromArray(J,K);let Y=Z.x*Math.abs(j6.x)+Z.y*Math.abs(j6.y)+Z.z*Math.abs(j6.z),X=Q.dot(j6),U=$.dot(j6),N=W.dot(j6);if(Math.max(-Math.max(X,U,N),Math.min(X,U,N))>Y)return!1}return!0}var N8=new v,e9=new u0,sZ=0;class p8 extends E6{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sZ++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let W=0,Z=this.itemSize;W<Z;W++)this.array[J+W]=Q.array[$+W];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)e9.fromBufferAttribute(this,Q),e9.applyMatrix3(J),this.setXY(Q,e9.x,e9.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyMatrix3(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyMatrix4(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyNormalMatrix(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.transformDirection(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=I9($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=_8($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=I9(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=_8(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=I9(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=_8(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=I9(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=_8(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=I9(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=_8(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=_8(Q,this.array),$=_8($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,W){if(J*=this.itemSize,this.normalized)Q=_8(Q,this.array),$=_8($,this.array),W=_8(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this}setXYZW(J,Q,$,W,Z){if(J*=this.itemSize,this.normalized)Q=_8(Q,this.array),$=_8($,this.array),W=_8(W,this.array),Z=_8(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this.array[J+3]=Z,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class f7 extends p8{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class b7 extends p8{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class K8 extends p8{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var iZ=new l6,_9=new v,DJ=new v;class d6{constructor(J=new v,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else iZ.setFromPoints(J).getCenter($);let W=0;for(let Z=0,K=J.length;Z<K;Z++)W=Math.max(W,$.distanceToSquared(J[Z]));return this.radius=Math.sqrt(W),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;_9.subVectors(J,this.center);let Q=_9.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),W=($-this.radius)*0.5;this.center.addScaledVector(_9,W/$),this.radius+=W}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else DJ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(_9.copy(J.center).add(DJ)),this.expandByPoint(_9.copy(J.center).sub(DJ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var oZ=0,x8=new W8,OJ=new w8,Y9=new v,y8=new l6,P9=new l6,R8=new v;class k8 extends E6{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:oZ++}),this.uuid=b9(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((vZ(J))?b7:f7)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let Z=new P0().getNormalMatrix(J);$.applyNormalMatrix(Z),$.needsUpdate=!0}let W=this.attributes.tangent;if(W!==void 0)W.transformDirection(J),W.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return x8.makeRotationFromQuaternion(J),this.applyMatrix4(x8),this}rotateX(J){return x8.makeRotationX(J),this.applyMatrix4(x8),this}rotateY(J){return x8.makeRotationY(J),this.applyMatrix4(x8),this}rotateZ(J){return x8.makeRotationZ(J),this.applyMatrix4(x8),this}translate(J,Q,$){return x8.makeTranslation(J,Q,$),this.applyMatrix4(x8),this}scale(J,Q,$){return x8.makeScale(J,Q,$),this.applyMatrix4(x8),this}lookAt(J){return OJ.lookAt(J),OJ.updateMatrix(),this.applyMatrix4(OJ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Y9).negate(),this.translate(Y9.x,Y9.y,Y9.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let W=0,Z=J.length;W<Z;W++){let K=J[W];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new K8($,3))}else{let $=Math.min(J.length,Q.count);for(let W=0;W<$;W++){let Z=J[W];Q.setXYZ(W,Z.x,Z.y,Z.z||0)}if(J.length>Q.count)I0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new l6;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){_0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new v(-1/0,-1/0,-1/0),new v(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,W=Q.length;$<W;$++){let Z=Q[$];if(y8.setFromBufferAttribute(Z),this.morphTargetsRelative)R8.addVectors(this.boundingBox.min,y8.min),this.boundingBox.expandByPoint(R8),R8.addVectors(this.boundingBox.max,y8.max),this.boundingBox.expandByPoint(R8);else this.boundingBox.expandByPoint(y8.min),this.boundingBox.expandByPoint(y8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))_0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new d6;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){_0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new v,1/0);return}if(J){let $=this.boundingSphere.center;if(y8.setFromBufferAttribute(J),Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z];if(P9.setFromBufferAttribute(H),this.morphTargetsRelative)R8.addVectors(y8.min,P9.min),y8.expandByPoint(R8),R8.addVectors(y8.max,P9.max),y8.expandByPoint(R8);else y8.expandByPoint(P9.min),y8.expandByPoint(P9.max)}y8.getCenter($);let W=0;for(let Z=0,K=J.count;Z<K;Z++)R8.fromBufferAttribute(J,Z),W=Math.max(W,$.distanceToSquared(R8));if(Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(R8.fromBufferAttribute(H,X),Y)Y9.fromBufferAttribute(J,X),R8.add(Y9);W=Math.max(W,$.distanceToSquared(R8))}}if(this.boundingSphere.radius=Math.sqrt(W),isNaN(this.boundingSphere.radius))_0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){_0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:W,uv:Z}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new p8(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let P=0;P<$.count;P++)H[P]=new v,Y[P]=new v;let X=new v,U=new v,N=new v,E=new u0,G=new u0,D=new u0,M=new v,z=new v;function F(P,R,B){X.fromBufferAttribute($,P),U.fromBufferAttribute($,R),N.fromBufferAttribute($,B),E.fromBufferAttribute(Z,P),G.fromBufferAttribute(Z,R),D.fromBufferAttribute(Z,B),U.sub(X),N.sub(X),G.sub(E),D.sub(E);let d=1/(G.x*D.y-D.x*G.y);if(!isFinite(d))return;M.copy(U).multiplyScalar(D.y).addScaledVector(N,-G.y).multiplyScalar(d),z.copy(N).multiplyScalar(G.x).addScaledVector(U,-D.x).multiplyScalar(d),H[P].add(M),H[R].add(M),H[B].add(M),Y[P].add(z),Y[R].add(z),Y[B].add(z)}let q=this.groups;if(q.length===0)q=[{start:0,count:J.count}];for(let P=0,R=q.length;P<R;++P){let B=q[P],d=B.start,A=B.count;for(let m=d,o=d+A;m<o;m+=3)F(J.getX(m+0),J.getX(m+1),J.getX(m+2))}let _=new v,C=new v,V=new v,I=new v;function w(P){V.fromBufferAttribute(W,P),I.copy(V);let R=H[P];_.copy(R),_.sub(V.multiplyScalar(V.dot(R))).normalize(),C.crossVectors(I,R);let d=C.dot(Y[P])<0?-1:1;K.setXYZW(P,_.x,_.y,_.z,d)}for(let P=0,R=q.length;P<R;++P){let B=q[P],d=B.start,A=B.count;for(let m=d,o=d+A;m<o;m+=3)w(J.getX(m+0)),w(J.getX(m+1)),w(J.getX(m+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new p8(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let E=0,G=$.count;E<G;E++)$.setXYZ(E,0,0,0);let W=new v,Z=new v,K=new v,H=new v,Y=new v,X=new v,U=new v,N=new v;if(J)for(let E=0,G=J.count;E<G;E+=3){let D=J.getX(E+0),M=J.getX(E+1),z=J.getX(E+2);W.fromBufferAttribute(Q,D),Z.fromBufferAttribute(Q,M),K.fromBufferAttribute(Q,z),U.subVectors(K,Z),N.subVectors(W,Z),U.cross(N),H.fromBufferAttribute($,D),Y.fromBufferAttribute($,M),X.fromBufferAttribute($,z),H.add(U),Y.add(U),X.add(U),$.setXYZ(D,H.x,H.y,H.z),$.setXYZ(M,Y.x,Y.y,Y.z),$.setXYZ(z,X.x,X.y,X.z)}else for(let E=0,G=Q.count;E<G;E+=3)W.fromBufferAttribute(Q,E+0),Z.fromBufferAttribute(Q,E+1),K.fromBufferAttribute(Q,E+2),U.subVectors(K,Z),N.subVectors(W,Z),U.cross(N),$.setXYZ(E+0,U.x,U.y,U.z),$.setXYZ(E+1,U.x,U.y,U.z),$.setXYZ(E+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)R8.fromBufferAttribute(J,Q),R8.normalize(),J.setXYZ(Q,R8.x,R8.y,R8.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:N}=H,E=new X.constructor(Y.length*U),G=0,D=0;for(let M=0,z=Y.length;M<z;M++){if(H.isInterleavedBufferAttribute)G=Y[M]*H.data.stride+H.offset;else G=Y[M]*U;for(let F=0;F<U;F++)E[D++]=X[G++]}return new p8(E,U,N)}if(this.index===null)return I0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new k8,$=this.index.array,W=this.attributes;for(let H in W){let Y=W[H],X=J(Y,$);Q.setAttribute(H,X)}let Z=this.morphAttributes;for(let H in Z){let Y=[],X=Z[H];for(let U=0,N=X.length;U<N;U++){let E=X[U],G=J(E,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let W={},Z=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let N=0,E=X.length;N<E;N++){let G=X[N];U.push(G.toJSON(J.data))}if(U.length>0)W[Y]=U,Z=!0}if(Z)J.data.morphAttributes=W,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let W=J.attributes;for(let X in W){let U=W[X];this.setAttribute(X,U.clone(Q))}let Z=J.morphAttributes;for(let X in Z){let U=[],N=Z[X];for(let E=0,G=N.length;E<G;E++)U.push(N[E].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let N=K[X];this.addGroup(N.start,N.count,N.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var aZ=0;class A6 extends E6{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:aZ++}),this.uuid=b9(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new v0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){I0(`Material: parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){I0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(W&&W.isColor)W.set($);else if(W&&W.isVector2&&($&&$.isVector2)||W&&W.isEuler&&($&&$.isEuler)||W&&W.isVector3&&($&&$.isVector3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function W(Z){let K=[];for(let H in Z){let Y=Z[H];delete Y.metadata,K.push(Y)}return K}if(Q){let Z=W(J.textures),K=W(J.images);if(Z.length>0)$.textures=Z;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new v0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new u0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new u0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let W=Q.length;$=Array(W);for(let Z=0;Z!==W;++Z)$[Z]=Q[Z].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var Y6=new v,RJ=new v,J7=new v,V6=new v,kJ=new v,Q7=new v,MJ=new v;class p9{constructor(J=new v,Q=new v(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,Y6)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=Y6.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return Y6.copy(this.origin).addScaledVector(this.direction,Q),Y6.distanceToSquared(J)}distanceSqToSegment(J,Q,$,W){RJ.copy(J).add(Q).multiplyScalar(0.5),J7.copy(Q).sub(J).normalize(),V6.copy(this.origin).sub(RJ);let Z=J.distanceTo(Q)*0.5,K=-this.direction.dot(J7),H=V6.dot(this.direction),Y=-V6.dot(J7),X=V6.lengthSq(),U=Math.abs(1-K*K),N,E,G,D;if(U>0)if(N=K*Y-H,E=K*H-Y,D=Z*U,N>=0)if(E>=-D)if(E<=D){let M=1/U;N*=M,E*=M,G=N*(N+K*E+2*H)+E*(K*N+E+2*Y)+X}else E=Z,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else E=-Z,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else if(E<=-D)N=Math.max(0,-(-K*Z+H)),E=N>0?-Z:Math.min(Math.max(-Z,-Y),Z),G=-N*N+E*(E+2*Y)+X;else if(E<=D)N=0,E=Math.min(Math.max(-Z,-Y),Z),G=E*(E+2*Y)+X;else N=Math.max(0,-(K*Z+H)),E=N>0?Z:Math.min(Math.max(-Z,-Y),Z),G=-N*N+E*(E+2*Y)+X;else E=K>0?-Z:Z,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(W)W.copy(RJ).addScaledVector(J7,E);return G}intersectSphere(J,Q){Y6.subVectors(J.center,this.origin);let $=Y6.dot(this.direction),W=Y6.dot(Y6)-$*$,Z=J.radius*J.radius;if(W>Z)return null;let K=Math.sqrt(Z-W),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,W,Z,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,N=1/this.direction.z,E=this.origin;if(X>=0)$=(J.min.x-E.x)*X,W=(J.max.x-E.x)*X;else $=(J.max.x-E.x)*X,W=(J.min.x-E.x)*X;if(U>=0)Z=(J.min.y-E.y)*U,K=(J.max.y-E.y)*U;else Z=(J.max.y-E.y)*U,K=(J.min.y-E.y)*U;if($>K||Z>W)return null;if(Z>$||isNaN($))$=Z;if(K<W||isNaN(W))W=K;if(N>=0)H=(J.min.z-E.z)*N,Y=(J.max.z-E.z)*N;else H=(J.max.z-E.z)*N,Y=(J.min.z-E.z)*N;if($>Y||H>W)return null;if(H>$||$!==$)$=H;if(Y<W||W!==W)W=Y;if(W<0)return null;return this.at($>=0?$:W,Q)}intersectsBox(J){return this.intersectBox(J,Y6)!==null}intersectTriangle(J,Q,$,W,Z){kJ.subVectors(Q,J),Q7.subVectors($,J),MJ.crossVectors(kJ,Q7);let K=this.direction.dot(MJ),H;if(K>0){if(W)return null;H=1}else if(K<0)H=-1,K=-K;else return null;V6.subVectors(this.origin,J);let Y=H*this.direction.dot(Q7.crossVectors(V6,Q7));if(Y<0)return null;let X=H*this.direction.dot(kJ.cross(V6));if(X<0)return null;if(Y+X>K)return null;let U=-H*V6.dot(MJ);if(U<0)return null;return this.at(U/K,Z)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class k9 extends A6{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new v0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new z6,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var C$=new W8,y6=new p9,$7=new d6,_$=new v,W7=new v,Z7=new v,K7=new v,LJ=new v,H7=new v,P$=new v,Y7=new v;class A8 extends w8{constructor(J=new k8,Q=new k9){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}getVertexPosition(J,Q){let $=this.geometry,W=$.attributes.position,Z=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(W,J);let H=this.morphTargetInfluences;if(Z&&H){H7.set(0,0,0);for(let Y=0,X=Z.length;Y<X;Y++){let U=H[Y],N=Z[Y];if(U===0)continue;if(LJ.fromBufferAttribute(N,J),K)H7.addScaledVector(LJ,U);else H7.addScaledVector(LJ.sub(Q),U)}Q.add(H7)}return Q}raycast(J,Q){let $=this.geometry,W=this.material,Z=this.matrixWorld;if(W===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if($7.copy($.boundingSphere),$7.applyMatrix4(Z),y6.copy(J.ray).recast(J.near),$7.containsPoint(y6.origin)===!1){if(y6.intersectSphere($7,_$)===null)return;if(y6.origin.distanceToSquared(_$)>(J.far-J.near)**2)return}if(C$.copy(Z).invert(),y6.copy(J.ray).applyMatrix4(C$),$.boundingBox!==null){if(y6.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,y6)}_computeIntersections(J,Q,$){let W,Z=this.geometry,K=this.material,H=Z.index,Y=Z.attributes.position,X=Z.attributes.uv,U=Z.attributes.uv1,N=Z.attributes.normal,E=Z.groups,G=Z.drawRange;if(H!==null)if(Array.isArray(K))for(let D=0,M=E.length;D<M;D++){let z=E[D],F=K[z.materialIndex],q=Math.max(z.start,G.start),_=Math.min(H.count,Math.min(z.start+z.count,G.start+G.count));for(let C=q,V=_;C<V;C+=3){let I=H.getX(C),w=H.getX(C+1),P=H.getX(C+2);if(W=X7(this,F,J,$,X,U,N,I,w,P),W)W.faceIndex=Math.floor(C/3),W.face.materialIndex=z.materialIndex,Q.push(W)}}else{let D=Math.max(0,G.start),M=Math.min(H.count,G.start+G.count);for(let z=D,F=M;z<F;z+=3){let q=H.getX(z),_=H.getX(z+1),C=H.getX(z+2);if(W=X7(this,K,J,$,X,U,N,q,_,C),W)W.faceIndex=Math.floor(z/3),Q.push(W)}}else if(Y!==void 0)if(Array.isArray(K))for(let D=0,M=E.length;D<M;D++){let z=E[D],F=K[z.materialIndex],q=Math.max(z.start,G.start),_=Math.min(Y.count,Math.min(z.start+z.count,G.start+G.count));for(let C=q,V=_;C<V;C+=3){let I=C,w=C+1,P=C+2;if(W=X7(this,F,J,$,X,U,N,I,w,P),W)W.faceIndex=Math.floor(C/3),W.face.materialIndex=z.materialIndex,Q.push(W)}}else{let D=Math.max(0,G.start),M=Math.min(Y.count,G.start+G.count);for(let z=D,F=M;z<F;z+=3){let q=z,_=z+1,C=z+2;if(W=X7(this,K,J,$,X,U,N,q,_,C),W)W.faceIndex=Math.floor(z/3),Q.push(W)}}}}function rZ(J,Q,$,W,Z,K,H,Y){let X;if(Q.side===1)X=W.intersectTriangle(H,K,Z,!0,Y);else X=W.intersectTriangle(Z,K,H,Q.side===0,Y);if(X===null)return null;Y7.copy(Y),Y7.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(Y7);if(U<$.near||U>$.far)return null;return{distance:U,point:Y7.clone(),object:J}}function X7(J,Q,$,W,Z,K,H,Y,X,U){J.getVertexPosition(Y,W7),J.getVertexPosition(X,Z7),J.getVertexPosition(U,K7);let N=rZ(J,Q,$,W,W7,Z7,K7,P$);if(N){let E=new v;if(g8.getBarycoord(P$,W7,Z7,K7,E),Z)N.uv=g8.getInterpolatedAttribute(Z,Y,X,U,E,new u0);if(K)N.uv1=g8.getInterpolatedAttribute(K,Y,X,U,E,new u0);if(H){if(N.normal=g8.getInterpolatedAttribute(H,Y,X,U,E,new v),N.normal.dot(W.direction)>0)N.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new v,materialIndex:0};g8.getNormal(W7,Z7,K7,G.normal),N.face=G,N.barycoord=E}return N}class CQ extends L8{constructor(J=null,Q=1,$=1,W,Z,K,H,Y,X=1003,U=1003,N,E){super(null,K,H,Y,X,U,W,Z,N,E);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}var VJ=new v,tZ=new v,eZ=new P0;class X6{constructor(J=new v(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,W){return this.normal.set(J,Q,$),this.constant=W,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let W=VJ.subVectors($,Q).cross(tZ.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(W,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let W=J.delta(VJ),Z=this.normal.dot(W);if(Z===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Z;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(W,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||eZ.getNormalMatrix(J),W=this.coplanarPoint(VJ).applyMatrix4(J),Z=this.normal.applyMatrix3($).normalize();return this.constant=-W.dot(Z),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var v6=new d6,JK=new u0(0.5,0.5),U7=new v;class x7{constructor(J=new X6,Q=new X6,$=new X6,W=new X6,Z=new X6,K=new X6){this.planes=[J,Q,$,W,Z,K]}set(J,Q,$,W,Z,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(W),H[4].copy(Z),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let W=this.planes,Z=J.elements,K=Z[0],H=Z[1],Y=Z[2],X=Z[3],U=Z[4],N=Z[5],E=Z[6],G=Z[7],D=Z[8],M=Z[9],z=Z[10],F=Z[11],q=Z[12],_=Z[13],C=Z[14],V=Z[15];if(W[0].setComponents(X-K,G-U,F-D,V-q).normalize(),W[1].setComponents(X+K,G+U,F+D,V+q).normalize(),W[2].setComponents(X+H,G+N,F+M,V+_).normalize(),W[3].setComponents(X-H,G-N,F-M,V-_).normalize(),$)W[4].setComponents(Y,E,z,C).normalize(),W[5].setComponents(X-Y,G-E,F-z,V-C).normalize();else if(W[4].setComponents(X-Y,G-E,F-z,V-C).normalize(),Q===2000)W[5].setComponents(X+Y,G+E,F+z,V+C).normalize();else if(Q===2001)W[5].setComponents(Y,E,z,C).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();v6.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();v6.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(v6)}intersectsSprite(J){v6.center.set(0,0,0);let Q=JK.distanceTo(J.center);return v6.radius=0.7071067811865476+Q,v6.applyMatrix4(J.matrixWorld),this.intersectsSphere(v6)}intersectsSphere(J){let Q=this.planes,$=J.center,W=-J.radius;for(let Z=0;Z<6;Z++)if(Q[Z].distanceToPoint($)<W)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let W=Q[$];if(U7.x=W.normal.x>0?J.max.x:J.min.x,U7.y=W.normal.y>0?J.max.y:J.min.y,U7.z=W.normal.z>0?J.max.z:J.min.z,W.distanceToPoint(U7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class M9 extends A6{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new v0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var k7=new v,M7=new v,T$=new W8,T9=new p9,G7=new d6,BJ=new v,S$=new v;class g7 extends w8{constructor(J=new k8,Q=new M9){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let W=1,Z=Q.count;W<Z;W++)k7.fromBufferAttribute(Q,W-1),M7.fromBufferAttribute(Q,W),$[W]=$[W-1],$[W]+=k7.distanceTo(M7);J.setAttribute("lineDistance",new K8($,1))}else I0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let $=this.geometry,W=this.matrixWorld,Z=J.params.Line.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(G7.copy($.boundingSphere),G7.applyMatrix4(W),G7.radius+=Z,J.ray.intersectsSphere(G7)===!1)return;T$.copy(W).invert(),T9.copy(J.ray).applyMatrix4(T$);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,E=$.attributes.position;if(U!==null){let G=Math.max(0,K.start),D=Math.min(U.count,K.start+K.count);for(let M=G,z=D-1;M<z;M+=X){let F=U.getX(M),q=U.getX(M+1),_=N7(this,J,T9,Y,F,q,M);if(_)Q.push(_)}if(this.isLineLoop){let M=U.getX(D-1),z=U.getX(G),F=N7(this,J,T9,Y,M,z,D-1);if(F)Q.push(F)}}else{let G=Math.max(0,K.start),D=Math.min(E.count,K.start+K.count);for(let M=G,z=D-1;M<z;M+=X){let F=N7(this,J,T9,Y,M,M+1,M);if(F)Q.push(F)}if(this.isLineLoop){let M=N7(this,J,T9,Y,D-1,G,D-1);if(M)Q.push(M)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function N7(J,Q,$,W,Z,K,H){let Y=J.geometry.attributes.position;if(k7.fromBufferAttribute(Y,Z),M7.fromBufferAttribute(Y,K),$.distanceSqToSegment(k7,M7,BJ,S$)>W)return;BJ.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(BJ);if(U<Q.near||U>Q.far)return;return{distance:U,point:S$.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var j$=new v,y$=new v;class p7 extends g7{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let W=0,Z=Q.count;W<Z;W+=2)j$.fromBufferAttribute(Q,W),y$.fromBufferAttribute(Q,W+1),$[W]=W===0?0:$[W-1],$[W+1]=$[W]+j$.distanceTo(y$);J.setAttribute("lineDistance",new K8($,1))}else I0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class m7 extends g7{constructor(J,Q){super(J,Q);this.isLineLoop=!0,this.type="LineLoop"}}class u6 extends A6{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new v0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var v$=new W8,zJ=new p9,E7=new d6,q7=new v;class L9 extends w8{constructor(J=new k8,Q=new u6){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Q){let $=this.geometry,W=this.matrixWorld,Z=J.params.Points.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(E7.copy($.boundingSphere),E7.applyMatrix4(W),E7.radius+=Z,J.ray.intersectsSphere(E7)===!1)return;v$.copy(W).invert(),zJ.copy(J.ray).applyMatrix4(v$);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=$.index,N=$.attributes.position;if(X!==null){let E=Math.max(0,K.start),G=Math.min(X.count,K.start+K.count);for(let D=E,M=G;D<M;D++){let z=X.getX(D);q7.fromBufferAttribute(N,z),h$(q7,z,Y,W,J,Q,this)}}else{let E=Math.max(0,K.start),G=Math.min(N.count,K.start+K.count);for(let D=E,M=G;D<M;D++)q7.fromBufferAttribute(N,D),h$(q7,D,Y,W,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function h$(J,Q,$,W,Z,K,H){let Y=zJ.distanceSqToPoint(J);if(Y<$){let X=new v;zJ.closestPointToPoint(J,X),X.applyMatrix4(W);let U=Z.ray.origin.distanceTo(X);if(U<Z.near||U>Z.far)return;K.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:Q,face:null,faceIndex:null,barycoord:null,object:H})}}class l7 extends L8{constructor(J=[],Q=301,$,W,Z,K,H,Y,X,U){super(J,Q,$,W,Z,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class d7 extends L8{constructor(J,Q,$,W,Z,K,H,Y,X){super(J,Q,$,W,Z,K,H,Y,X);this.isCanvasTexture=!0,this.needsUpdate=!0}}class C6 extends L8{constructor(J,Q,$=1014,W,Z,K,H=1003,Y=1003,X,U=1026,N=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let E={width:J,height:Q,depth:N};super(E,W,Z,K,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new x9(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class _Q extends C6{constructor(J,Q=1014,$=301,W,Z,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},N=[U,U,U,U,U,U];super(J,J,Q,$,W,Z,K,H,Y,X);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class u7 extends L8{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class V9 extends k8{constructor(J=1,Q=1,$=1,W=1,Z=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:W,heightSegments:Z,depthSegments:K};let H=this;W=Math.floor(W),Z=Math.floor(Z),K=Math.floor(K);let Y=[],X=[],U=[],N=[],E=0,G=0;D("z","y","x",-1,-1,$,Q,J,K,Z,0),D("z","y","x",1,-1,$,Q,-J,K,Z,1),D("x","z","y",1,1,J,$,Q,W,K,2),D("x","z","y",1,-1,J,$,-Q,W,K,3),D("x","y","z",1,-1,J,Q,$,W,Z,4),D("x","y","z",-1,-1,J,Q,-$,W,Z,5),this.setIndex(Y),this.setAttribute("position",new K8(X,3)),this.setAttribute("normal",new K8(U,3)),this.setAttribute("uv",new K8(N,2));function D(M,z,F,q,_,C,V,I,w,P,R){let B=C/w,d=V/P,A=C/2,m=V/2,o=I/2,p=w+1,n=P+1,u=0,b=0,t=new v;for(let e=0;e<n;e++){let H0=e*d-m;for(let M0=0;M0<p;M0++){let k0=M0*B-A;t[M]=k0*q,t[z]=H0*_,t[F]=o,X.push(t.x,t.y,t.z),t[M]=0,t[z]=0,t[F]=I>0?1:-1,U.push(t.x,t.y,t.z),N.push(M0/w),N.push(1-e/P),u+=1}}for(let e=0;e<P;e++)for(let H0=0;H0<w;H0++){let M0=E+H0+p*e,k0=E+H0+p*(e+1),Z8=E+(H0+1)+p*(e+1),i0=E+(H0+1)+p*e;Y.push(M0,k0,i0),Y.push(k0,Z8,i0),b+=6}H.addGroup(G,b,R),G+=b,E+=u}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new V9(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class _6 extends k8{constructor(J=1,Q=1,$=1,W=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:W};let Z=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(W),X=H+1,U=Y+1,N=J/H,E=Q/Y,G=[],D=[],M=[],z=[];for(let F=0;F<U;F++){let q=F*E-K;for(let _=0;_<X;_++){let C=_*N-Z;D.push(C,-q,0),M.push(0,0,1),z.push(_/H),z.push(1-F/Y)}}for(let F=0;F<Y;F++)for(let q=0;q<H;q++){let _=q+X*F,C=q+X*(F+1),V=q+1+X*(F+1),I=q+1+X*F;G.push(_,C,I),G.push(C,V,I)}this.setIndex(G),this.setAttribute("position",new K8(D,3)),this.setAttribute("normal",new K8(M,3)),this.setAttribute("uv",new K8(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new _6(J.width,J.height,J.widthSegments,J.heightSegments)}}function c6(J){let Q={};for(let $ in J){Q[$]={};for(let W in J[$]){let Z=J[$][W];if(f$(Z))if(Z.isRenderTargetTexture)I0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][W]=null;else Q[$][W]=Z.clone();else if(Array.isArray(Z))if(f$(Z[0])){let K=[];for(let H=0,Y=Z.length;H<Y;H++)K[H]=Z[H].clone();Q[$][W]=K}else Q[$][W]=Z.slice();else Q[$][W]=Z}}return Q}function I8(J){let Q={};for(let $=0;$<J.length;$++){let W=c6(J[$]);for(let Z in W)Q[Z]=W[Z]}return Q}function f$(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function QK(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function PQ(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return x0.workingColorSpace}var mW={clone:c6,merge:I8},$K=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,WK=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class C8 extends A6{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$K,this.fragmentShader=WK,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=c6(J.uniforms),this.uniformsGroups=QK(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let W in this.uniforms){let K=this.uniforms[W].value;if(K&&K.isTexture)Q.uniforms[W]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[W]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[W]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[W]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[W]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[W]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[W]={type:"m4",value:K.toArray()};else Q.uniforms[W]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let W in this.extensions)if(this.extensions[W]===!0)$[W]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let W=J.uniforms[$];switch(this.uniforms[$]={},W.type){case"t":this.uniforms[$].value=Q[W.value]||null;break;case"c":this.uniforms[$].value=new v0().setHex(W.value);break;case"v2":this.uniforms[$].value=new u0().fromArray(W.value);break;case"v3":this.uniforms[$].value=new v().fromArray(W.value);break;case"v4":this.uniforms[$].value=new H8().fromArray(W.value);break;case"m3":this.uniforms[$].value=new P0().fromArray(W.value);break;case"m4":this.uniforms[$].value=new W8().fromArray(W.value);break;default:this.uniforms[$].value=W.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class TQ extends C8{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class SQ extends A6{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class jQ extends A6{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function F7(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class n6{constructor(J,Q,$,W){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=W!==void 0?W:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,W=Q[$],Z=Q[$-1];$:{J:{let K;Q:{W:if(!(J<W)){for(let H=$+2;;){if(W===void 0){if(J<Z)break W;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(Z=W,W=Q[++$],J<W)break J}K=Q.length;break Q}if(!(J>=Z)){let H=Q[1];if(J<H)$=2,Z=H;for(let Y=$-2;;){if(Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(W=Z,Z=Q[--$-1],J>=Z)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(W=Q[$],Z=Q[$-1],Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,Z,W)}return this.interpolate_($,Z,J,W)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,W=this.valueSize,Z=J*W;for(let K=0;K!==W;++K)Q[K]=$[Z+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class yQ extends n6{constructor(J,Q,$,W){super(J,Q,$,W);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let W=this.parameterPositions,Z=J-2,K=J+1,H=W[Z],Y=W[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:Z=J,H=2*Q-$;break;case 2402:Z=W.length-2,H=Q+W[Z]-W[Z+1];break;default:Z=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+W[1]-W[0];break;default:K=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=Z*U,this._offsetNext=K*U}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,N=this._offsetNext,E=this._weightPrev,G=this._weightNext,D=($-Q)/(W-Q),M=D*D,z=M*D,F=-E*z+2*E*M-E*D,q=(1+E)*z+(-1.5-2*E)*M+(-0.5+E)*D+1,_=(-1-G)*z+(1.5+G)*M+0.5*D,C=G*z-G*M;for(let V=0;V!==H;++V)Z[V]=F*K[U+V]+q*K[X+V]+_*K[Y+V]+C*K[N+V];return Z}}class vQ extends n6{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(W-Q),N=1-U;for(let E=0;E!==H;++E)Z[E]=K[X+E]*N+K[Y+E]*U;return Z}}class hQ extends n6{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J){return this.copySampleValue_(J-1)}}class fQ extends n6{interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,N=this.outTangents;if(!U||!N){let D=($-Q)/(W-Q),M=1-D;for(let z=0;z!==H;++z)Z[z]=K[X+z]*M+K[Y+z]*D;return Z}let E=H*2,G=J-1;for(let D=0;D!==H;++D){let M=K[X+D],z=K[Y+D],F=G*E+D*2,q=N[F],_=N[F+1],C=J*E+D*2,V=U[C],I=U[C+1],w=($-Q)/(W-Q),P,R,B,d,A;for(let m=0;m<8;m++){P=w*w,R=P*w,B=1-w,d=B*B,A=d*B;let p=A*Q+3*d*w*q+3*B*P*V+R*W-$;if(Math.abs(p)<0.0000000001)break;let n=3*d*(q-Q)+6*B*w*(V-q)+3*P*(W-V);if(Math.abs(n)<0.0000000001)break;w=w-p/n,w=Math.max(0,Math.min(1,w))}Z[D]=A*M+3*d*w*_+3*B*P*I+R*z}return Z}}class l8{constructor(J,Q,$,W){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=F7(Q,this.TimeBufferType),this.values=F7($,this.ValueBufferType),this.setInterpolation(W||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:F7(J.times,Array),values:F7(J.values,Array)};let W=J.getInterpolation();if(W!==J.DefaultInterpolation)$.interpolation=W}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new hQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new vQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new yQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new fQ(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return I0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,W=$.length,Z=0,K=W-1;while(Z!==W&&$[Z]<J)++Z;while(K!==-1&&$[K]>Q)--K;if(++K,Z!==0||K!==W){if(Z>=K)K=Math.max(K,1),Z=K-1;let H=this.getValueSize();this.times=$.slice(Z,K),this.values=this.values.slice(Z*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)_0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,W=this.values,Z=$.length;if(Z===0)_0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==Z;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){_0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){_0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(W!==void 0){if(hZ(W))for(let H=0,Y=W.length;H!==Y;++H){let X=W[H];if(isNaN(X)){_0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),W=this.getInterpolation()===2302,Z=J.length-1,K=1;for(let H=1;H<Z;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!W){let N=H*$,E=N-$,G=N+$;for(let D=0;D!==$;++D){let M=Q[N+D];if(M!==Q[E+D]||M!==Q[G+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let N=H*$,E=K*$;for(let G=0;G!==$;++G)Q[E+G]=Q[N+G]}++K}}if(Z>0){J[K]=J[Z];for(let H=Z*$,Y=K*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),W=new this.constructor(this.name,J,Q);return W.createInterpolant=this.createInterpolant,W}}l8.prototype.ValueTypeName="";l8.prototype.TimeBufferType=Float32Array;l8.prototype.ValueBufferType=Float32Array;l8.prototype.DefaultInterpolation=2301;class s6 extends l8{constructor(J,Q,$){super(J,Q,$)}}s6.prototype.ValueTypeName="bool";s6.prototype.ValueBufferType=Array;s6.prototype.DefaultInterpolation=2300;s6.prototype.InterpolantFactoryMethodLinear=void 0;s6.prototype.InterpolantFactoryMethodSmooth=void 0;class bQ extends l8{constructor(J,Q,$,W){super(J,Q,$,W)}}bQ.prototype.ValueTypeName="color";class xQ extends l8{constructor(J,Q,$,W){super(J,Q,$,W)}}xQ.prototype.ValueTypeName="number";class gQ extends n6{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(W-Q),X=J*H;for(let U=X+H;X!==U;X+=4)q6.slerpFlat(Z,0,K,X-H,K,X,Y);return Z}}class c7 extends l8{constructor(J,Q,$,W){super(J,Q,$,W)}InterpolantFactoryMethodLinear(J){return new gQ(this.times,this.values,this.getValueSize(),J)}}c7.prototype.ValueTypeName="quaternion";c7.prototype.InterpolantFactoryMethodSmooth=void 0;class i6 extends l8{constructor(J,Q,$){super(J,Q,$)}}i6.prototype.ValueTypeName="string";i6.prototype.ValueBufferType=Array;i6.prototype.DefaultInterpolation=2300;i6.prototype.InterpolantFactoryMethodLinear=void 0;i6.prototype.InterpolantFactoryMethodSmooth=void 0;class pQ extends l8{constructor(J,Q,$,W){super(J,Q,$,W)}}pQ.prototype.ValueTypeName="vector";class mQ{constructor(J,Q,$){let W=this,Z=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,Z===!1){if(W.onStart!==void 0)W.onStart(U,K,H)}Z=!0},this.itemEnd=function(U){if(K++,W.onProgress!==void 0)W.onProgress(U,K,H);if(K===H){if(Z=!1,W.onLoad!==void 0)W.onLoad()}},this.itemError=function(U){if(W.onError!==void 0)W.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,N){return X.push(U,N),this},this.removeHandler=function(U){let N=X.indexOf(U);if(N!==-1)X.splice(N,2);return this},this.getHandler=function(U){for(let N=0,E=X.length;N<E;N+=2){let G=X[N],D=X[N+1];if(G.global)G.lastIndex=0;if(G.test(U))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var lW=new mQ;class lQ{constructor(J){if(this.manager=J!==void 0?J:lW,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(W,Z){$.load(J,W,Q,Z)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}lQ.DEFAULT_MATERIAL_NAME="__DEFAULT";var D7=new v,O7=new q6,a8=new v;class n7 extends w8{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new W8,this.projectionMatrix=new W8,this.projectionMatrixInverse=new W8,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(D7,O7,a8),a8.x===1&&a8.y===1&&a8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(D7,O7,a8.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(D7,O7,a8),a8.x===1&&a8.y===1&&a8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(D7,O7,a8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var B6=new v,b$=new u0,x$=new u0;class v8 extends n7{constructor(J=50,Q=1,$=0.1,W=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=W,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=R7*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(e7*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return R7*2*Math.atan(Math.tan(e7*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){B6.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(B6.x,B6.y).multiplyScalar(-J/B6.z),B6.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(B6.x,B6.y).multiplyScalar(-J/B6.z)}getViewSize(J,Q){return this.getViewBounds(J,b$,x$),Q.subVectors(x$,b$)}setViewOffset(J,Q,$,W,Z,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(e7*0.5*this.fov)/this.zoom,$=2*Q,W=this.aspect*$,Z=-0.5*W,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;Z+=K.offsetX*W/Y,Q-=K.offsetY*$/X,W*=K.width/Y,$*=K.height/X}let H=this.filmOffset;if(H!==0)Z+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(Z,Z+W,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class B9 extends n7{constructor(J=-1,Q=1,$=1,W=-1,Z=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=W,this.near=Z,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,W,Z,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,W=(this.top+this.bottom)/2,Z=$-J,K=$+J,H=W+Q,Y=W-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;Z+=X*this.view.offsetX,K=Z+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(Z,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}var X9=-90,U9=1;class dQ extends w8{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let W=new v8(X9,U9,J,Q);W.layers=this.layers,this.add(W);let Z=new v8(X9,U9,J,Q);Z.layers=this.layers,this.add(Z);let K=new v8(X9,U9,J,Q);K.layers=this.layers,this.add(K);let H=new v8(X9,U9,J,Q);H.layers=this.layers,this.add(H);let Y=new v8(X9,U9,J,Q);Y.layers=this.layers,this.add(Y);let X=new v8(X9,U9,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,W,Z,K,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),W.up.set(0,1,0),W.lookAt(-1,0,0),Z.up.set(0,0,-1),Z.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),W.up.set(0,-1,0),W.lookAt(1,0,0),Z.up.set(0,0,1),Z.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:W}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[Z,K,H,Y,X,U]=this.children,N=J.getRenderTarget(),E=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let M=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let z=!1;if(J.isWebGLRenderer===!0)z=J.state.buffers.depth.getReversed();else z=J.reversedDepthBuffer;if(J.setRenderTarget($,0,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Z),J.setRenderTarget($,1,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,W),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=M,J.setRenderTarget($,5,W),z&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(N,E,G),J.xr.enabled=D,$.texture.needsPMREMUpdate=!0}}class uQ extends v8{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var cQ="\\[\\]\\.:\\/",ZK=new RegExp("["+cQ+"]","g"),nQ="[^"+cQ+"]",KK="[^"+cQ.replace("\\.","")+"]",HK=/((?:WC+[\/:])*)/.source.replace("WC",nQ),YK=/(WCOD+)?/.source.replace("WCOD",KK),XK=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",nQ),UK=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",nQ),GK=new RegExp("^"+HK+YK+XK+UK+"$"),NK=["material","materials","bones","map"];class dW{constructor(J,Q,$){let W=$||n0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,W)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,W=this._bindings[$];if(W!==void 0)W.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let W=this._targetGroup.nCachedObjects_,Z=$.length;W!==Z;++W)$[W].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class n0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||n0.parseTrackName(Q),this.node=n0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new n0(J,Q,$);else return new n0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(ZK,"")}static parseTrackName(J){let Q=GK.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},W=$.nodeName&&$.nodeName.lastIndexOf(".");if(W!==void 0&&W!==-1){let Z=$.nodeName.substring(W+1);if(NK.indexOf(Z)!==-1)$.nodeName=$.nodeName.substring(0,W),$.objectName=Z}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(Z){for(let K=0;K<Z.length;K++){let H=Z[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},W=$(J.children);if(W)return W}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)J[Q++]=$[W]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,W=Q.propertyName,Z=Q.propertyIndex;if(!J)J=n0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){I0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){_0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){_0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){_0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){_0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){_0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){_0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){_0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[W];if(K===void 0){let X=Q.nodeName;_0("PropertyBinding: Trying to update property for track: "+X+"."+W+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(Z!==void 0){if(W==="morphTargetInfluences"){if(!J.geometry){_0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){_0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[Z]!==void 0)Z=J.morphTargetDictionary[Z]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=Z}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=W;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}n0.Composite=dW;n0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};n0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};n0.prototype.GetterByBindingType=[n0.prototype._getValue_direct,n0.prototype._getValue_array,n0.prototype._getValue_arrayElement,n0.prototype._getValue_toArray];n0.prototype.SetterByBindingTypeAndVersioning=[[n0.prototype._setValue_direct,n0.prototype._setValue_direct_setNeedsUpdate,n0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[n0.prototype._setValue_array,n0.prototype._setValue_array_setNeedsUpdate,n0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[n0.prototype._setValue_arrayElement,n0.prototype._setValue_arrayElement_setNeedsUpdate,n0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[n0.prototype._setValue_fromArray,n0.prototype._setValue_fromArray_setNeedsUpdate,n0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var W5=new Float32Array(1);class sQ{static{sQ.prototype.isMatrix2=!0}constructor(J,Q,$,W){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,W)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,W){let Z=this.elements;return Z[0]=J,Z[2]=Q,Z[1]=$,Z[3]=W,this}}function iQ(J,Q,$,W){let Z=EK(W);switch($){case 1021:return J*Q;case 1028:return J*Q/Z.components*Z.byteLength;case 1029:return J*Q/Z.components*Z.byteLength;case 1030:return J*Q*2/Z.components*Z.byteLength;case 1031:return J*Q*2/Z.components*Z.byteLength;case 1022:return J*Q*3/Z.components*Z.byteLength;case 1023:return J*Q*4/Z.components*Z.byteLength;case 1033:return J*Q*4/Z.components*Z.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function EK(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)I0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function EZ(){let J=null,Q=!1,$=null,W=null;function Z(K,H){$(K,H),W=J.requestAnimationFrame(Z)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;W=J.requestAnimationFrame(Z),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(W);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function qK(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:N}=Y,E=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,N),Y.onUploadCallback();let D;if(U instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)D=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)D=J.SHORT;else if(U instanceof Uint32Array)D=J.UNSIGNED_INT;else if(U instanceof Int32Array)D=J.INT;else if(U instanceof Int8Array)D=J.BYTE;else if(U instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:D,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:E}}function W(Y,X,U){let{array:N,updateRanges:E}=X;if(J.bindBuffer(U,Y),E.length===0)J.bufferSubData(U,0,N);else{E.sort((D,M)=>D.start-M.start);let G=0;for(let D=1;D<E.length;D++){let M=E[G],z=E[D];if(z.start<=M.start+M.count+1)M.count=Math.max(M.count,z.start+z.count-M.start);else++G,E[G]=z}E.length=G+1;for(let D=0,M=E.length;D<M;D++){let z=E[D];J.bufferSubData(U,z.start*N.BYTES_PER_ELEMENT,N,z.start,z.count)}X.clearUpdateRanges()}X.onUploadCallback()}function Z(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let N=Q.get(Y);if(!N||N.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(U.buffer,Y,X),U.version=Y.version}}return{get:Z,remove:K,update:H}}var FK=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,DK=`#ifdef USE_ALPHAHASH
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
#endif`,OK=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,RK=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kK=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,MK=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,LK=`#ifdef USE_AOMAP
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
#endif`,VK=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,BK=`#ifdef USE_BATCHING
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
#endif`,zK=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wK=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,IK=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,AK=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,CK=`#ifdef USE_IRIDESCENCE
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
#endif`,_K=`#ifdef USE_BUMPMAP
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
#endif`,PK=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,TK=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,SK=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,jK=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,yK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,vK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,hK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,fK=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,bK=`#define PI 3.141592653589793
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
} // validated`,xK=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,gK=`vec3 transformedNormal = objectNormal;
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
#endif`,pK=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,mK=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,lK=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dK=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uK="gl_FragColor = linearToOutputTexel( gl_FragColor );",cK=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nK=`#ifdef USE_ENVMAP
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
#endif`,sK=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,iK=`#ifdef USE_ENVMAP
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
#endif`,oK=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,aK=`#ifdef USE_ENVMAP
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
#endif`,rK=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,tK=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,eK=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,JH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,QH=`#ifdef USE_GRADIENTMAP
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
}`,$H=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,WH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ZH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,KH=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,HH=`#ifdef USE_ENVMAP
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
#endif`,YH=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,XH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,UH=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,GH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,NH=`PhysicalMaterial material;
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
#endif`,EH=`uniform sampler2D dfgLUT;
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
}`,qH=`
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
#endif`,FH=`#if defined( RE_IndirectDiffuse )
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
#endif`,DH=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,OH=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,RH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,MH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,LH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,VH=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BH=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,zH=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,wH=`#if defined( USE_POINTS_UV )
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
#endif`,IH=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,AH=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,CH=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_H=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,PH=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TH=`#ifdef USE_MORPHTARGETS
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
#endif`,SH=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jH=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,yH=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,vH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hH=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,fH=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,bH=`#ifdef USE_NORMALMAP
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
#endif`,xH=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,gH=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,pH=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,mH=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,lH=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,dH=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,uH=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,cH=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nH=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sH=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,iH=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,oH=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,aH=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,rH=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tH=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,eH=`float getShadowMask() {
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
}`,JY=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,QY=`#ifdef USE_SKINNING
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
#endif`,$Y=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,WY=`#ifdef USE_SKINNING
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
#endif`,ZY=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,KY=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,HY=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,YY=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,XY=`#ifdef USE_TRANSMISSION
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
#endif`,UY=`#ifdef USE_TRANSMISSION
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
#endif`,GY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,NY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,EY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qY=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,FY=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,DY=`uniform sampler2D t2D;
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
}`,OY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,RY=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,MY=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,LY=`#include <common>
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
}`,VY=`#if DEPTH_PACKING == 3200
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
}`,BY=`#define DISTANCE
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
}`,zY=`#define DISTANCE
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
}`,wY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,IY=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,AY=`uniform float scale;
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
}`,CY=`uniform vec3 diffuse;
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
}`,_Y=`#include <common>
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
}`,PY=`uniform vec3 diffuse;
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
}`,TY=`#define LAMBERT
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
}`,SY=`#define LAMBERT
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
}`,jY=`#define MATCAP
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
}`,yY=`#define MATCAP
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
}`,vY=`#define NORMAL
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
}`,hY=`#define NORMAL
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
}`,fY=`#define PHONG
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
}`,bY=`#define PHONG
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
}`,xY=`#define STANDARD
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
}`,gY=`#define STANDARD
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
}`,pY=`#define TOON
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
}`,mY=`#define TOON
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
}`,lY=`uniform float size;
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
}`,dY=`uniform vec3 diffuse;
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
}`,uY=`#include <common>
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
}`,cY=`uniform vec3 color;
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
}`,nY=`uniform float rotation;
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
}`,sY=`uniform vec3 diffuse;
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
}`,j0={alphahash_fragment:FK,alphahash_pars_fragment:DK,alphamap_fragment:OK,alphamap_pars_fragment:RK,alphatest_fragment:kK,alphatest_pars_fragment:MK,aomap_fragment:LK,aomap_pars_fragment:VK,batching_pars_vertex:BK,batching_vertex:zK,begin_vertex:wK,beginnormal_vertex:IK,bsdfs:AK,iridescence_fragment:CK,bumpmap_pars_fragment:_K,clipping_planes_fragment:PK,clipping_planes_pars_fragment:TK,clipping_planes_pars_vertex:SK,clipping_planes_vertex:jK,color_fragment:yK,color_pars_fragment:vK,color_pars_vertex:hK,color_vertex:fK,common:bK,cube_uv_reflection_fragment:xK,defaultnormal_vertex:gK,displacementmap_pars_vertex:pK,displacementmap_vertex:mK,emissivemap_fragment:lK,emissivemap_pars_fragment:dK,colorspace_fragment:uK,colorspace_pars_fragment:cK,envmap_fragment:nK,envmap_common_pars_fragment:sK,envmap_pars_fragment:iK,envmap_pars_vertex:oK,envmap_physical_pars_fragment:HH,envmap_vertex:aK,fog_vertex:rK,fog_pars_vertex:tK,fog_fragment:eK,fog_pars_fragment:JH,gradientmap_pars_fragment:QH,lightmap_pars_fragment:$H,lights_lambert_fragment:WH,lights_lambert_pars_fragment:ZH,lights_pars_begin:KH,lights_toon_fragment:YH,lights_toon_pars_fragment:XH,lights_phong_fragment:UH,lights_phong_pars_fragment:GH,lights_physical_fragment:NH,lights_physical_pars_fragment:EH,lights_fragment_begin:qH,lights_fragment_maps:FH,lights_fragment_end:DH,lightprobes_pars_fragment:OH,logdepthbuf_fragment:RH,logdepthbuf_pars_fragment:kH,logdepthbuf_pars_vertex:MH,logdepthbuf_vertex:LH,map_fragment:VH,map_pars_fragment:BH,map_particle_fragment:zH,map_particle_pars_fragment:wH,metalnessmap_fragment:IH,metalnessmap_pars_fragment:AH,morphinstance_vertex:CH,morphcolor_vertex:_H,morphnormal_vertex:PH,morphtarget_pars_vertex:TH,morphtarget_vertex:SH,normal_fragment_begin:jH,normal_fragment_maps:yH,normal_pars_fragment:vH,normal_pars_vertex:hH,normal_vertex:fH,normalmap_pars_fragment:bH,clearcoat_normal_fragment_begin:xH,clearcoat_normal_fragment_maps:gH,clearcoat_pars_fragment:pH,iridescence_pars_fragment:mH,opaque_fragment:lH,packing:dH,premultiplied_alpha_fragment:uH,project_vertex:cH,dithering_fragment:nH,dithering_pars_fragment:sH,roughnessmap_fragment:iH,roughnessmap_pars_fragment:oH,shadowmap_pars_fragment:aH,shadowmap_pars_vertex:rH,shadowmap_vertex:tH,shadowmask_pars_fragment:eH,skinbase_vertex:JY,skinning_pars_vertex:QY,skinning_vertex:$Y,skinnormal_vertex:WY,specularmap_fragment:ZY,specularmap_pars_fragment:KY,tonemapping_fragment:HY,tonemapping_pars_fragment:YY,transmission_fragment:XY,transmission_pars_fragment:UY,uv_pars_fragment:GY,uv_pars_vertex:NY,uv_vertex:EY,worldpos_vertex:qY,background_vert:FY,background_frag:DY,backgroundCube_vert:OY,backgroundCube_frag:RY,cube_vert:kY,cube_frag:MY,depth_vert:LY,depth_frag:VY,distance_vert:BY,distance_frag:zY,equirect_vert:wY,equirect_frag:IY,linedashed_vert:AY,linedashed_frag:CY,meshbasic_vert:_Y,meshbasic_frag:PY,meshlambert_vert:TY,meshlambert_frag:SY,meshmatcap_vert:jY,meshmatcap_frag:yY,meshnormal_vert:vY,meshnormal_frag:hY,meshphong_vert:fY,meshphong_frag:bY,meshphysical_vert:xY,meshphysical_frag:gY,meshtoon_vert:pY,meshtoon_frag:mY,points_vert:lY,points_frag:dY,shadow_vert:uY,shadow_frag:cY,sprite_vert:nY,sprite_frag:sY},U0={common:{diffuse:{value:new v0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new P0},alphaMap:{value:null},alphaMapTransform:{value:new P0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new P0}},envmap:{envMap:{value:null},envMapRotation:{value:new P0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new P0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new P0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new P0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new P0},normalScale:{value:new u0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new P0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new P0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new P0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new P0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new v0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new v},probesMax:{value:new v},probesResolution:{value:new v}},points:{diffuse:{value:new v0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new P0},alphaTest:{value:0},uvTransform:{value:new P0}},sprite:{diffuse:{value:new v0(16777215)},opacity:{value:1},center:{value:new u0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new P0},alphaMap:{value:null},alphaMapTransform:{value:new P0},alphaTest:{value:0}}},Q6={basic:{uniforms:I8([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.fog]),vertexShader:j0.meshbasic_vert,fragmentShader:j0.meshbasic_frag},lambert:{uniforms:I8([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,U0.lights,{emissive:{value:new v0(0)},envMapIntensity:{value:1}}]),vertexShader:j0.meshlambert_vert,fragmentShader:j0.meshlambert_frag},phong:{uniforms:I8([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,U0.lights,{emissive:{value:new v0(0)},specular:{value:new v0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:j0.meshphong_vert,fragmentShader:j0.meshphong_frag},standard:{uniforms:I8([U0.common,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.roughnessmap,U0.metalnessmap,U0.fog,U0.lights,{emissive:{value:new v0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:j0.meshphysical_vert,fragmentShader:j0.meshphysical_frag},toon:{uniforms:I8([U0.common,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.gradientmap,U0.fog,U0.lights,{emissive:{value:new v0(0)}}]),vertexShader:j0.meshtoon_vert,fragmentShader:j0.meshtoon_frag},matcap:{uniforms:I8([U0.common,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,{matcap:{value:null}}]),vertexShader:j0.meshmatcap_vert,fragmentShader:j0.meshmatcap_frag},points:{uniforms:I8([U0.points,U0.fog]),vertexShader:j0.points_vert,fragmentShader:j0.points_frag},dashed:{uniforms:I8([U0.common,U0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:j0.linedashed_vert,fragmentShader:j0.linedashed_frag},depth:{uniforms:I8([U0.common,U0.displacementmap]),vertexShader:j0.depth_vert,fragmentShader:j0.depth_frag},normal:{uniforms:I8([U0.common,U0.bumpmap,U0.normalmap,U0.displacementmap,{opacity:{value:1}}]),vertexShader:j0.meshnormal_vert,fragmentShader:j0.meshnormal_frag},sprite:{uniforms:I8([U0.sprite,U0.fog]),vertexShader:j0.sprite_vert,fragmentShader:j0.sprite_frag},background:{uniforms:{uvTransform:{value:new P0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:j0.background_vert,fragmentShader:j0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new P0}},vertexShader:j0.backgroundCube_vert,fragmentShader:j0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:j0.cube_vert,fragmentShader:j0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:j0.equirect_vert,fragmentShader:j0.equirect_frag},distance:{uniforms:I8([U0.common,U0.displacementmap,{referencePosition:{value:new v},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:j0.distance_vert,fragmentShader:j0.distance_frag},shadow:{uniforms:I8([U0.lights,U0.fog,{color:{value:new v0(0)},opacity:{value:1}}]),vertexShader:j0.shadow_vert,fragmentShader:j0.shadow_frag}};Q6.physical={uniforms:I8([Q6.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new P0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new P0},clearcoatNormalScale:{value:new u0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new P0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new P0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new P0},sheen:{value:0},sheenColor:{value:new v0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new P0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new P0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new P0},transmissionSamplerSize:{value:new u0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new P0},attenuationDistance:{value:0},attenuationColor:{value:new v0(0)},specularColor:{value:new v0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new P0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new P0},anisotropyVector:{value:new u0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new P0}}]),vertexShader:j0.meshphysical_vert,fragmentShader:j0.meshphysical_frag};var s7={r:0,b:0,g:0},iY=new W8,qZ=new P0;qZ.set(-1,0,0,0,1,0,0,0,1);function oY(J,Q,$,W,Z,K){let H=new v0(0),Y=Z===!0?0:1,X,U,N=null,E=0,G=null;function D(_){let C=_.isScene===!0?_.background:null;if(C&&C.isTexture){let V=_.backgroundBlurriness>0;C=Q.get(C,V)}return C}function M(_){let C=!1,V=D(_);if(V===null)F(H,Y);else if(V&&V.isColor)F(V,1),C=!0;let I=J.xr.getEnvironmentBlendMode();if(I==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(I==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||C)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function z(_,C){let V=D(C);if(V&&(V.isCubeTexture||V.mapping===v9)){if(U===void 0)U=new A8(new V9(1,1,1),new C8({name:"BackgroundCubeMaterial",uniforms:c6(Q6.backgroundCube.uniforms),vertexShader:Q6.backgroundCube.vertexShader,fragmentShader:Q6.backgroundCube.fragmentShader,side:P8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(I,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(U);if(U.material.uniforms.envMap.value=V,U.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(iY.makeRotationFromEuler(C.backgroundRotation)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(qZ);if(U.material.toneMapped=x0.getTransfer(V.colorSpace)!==r0,N!==V||E!==V.version||G!==J.toneMapping)U.material.needsUpdate=!0,N=V,E=V.version,G=J.toneMapping;U.layers.enableAll(),_.unshift(U,U.geometry,U.material,0,0,null)}else if(V&&V.isTexture){if(X===void 0)X=new A8(new _6(2,2),new C8({name:"BackgroundMaterial",uniforms:c6(Q6.background.uniforms),vertexShader:Q6.background.vertexShader,fragmentShader:Q6.background.fragmentShader,side:F9,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(X);if(X.material.uniforms.t2D.value=V,X.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,X.material.toneMapped=x0.getTransfer(V.colorSpace)!==r0,V.matrixAutoUpdate===!0)V.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(V.matrix),N!==V||E!==V.version||G!==J.toneMapping)X.material.needsUpdate=!0,N=V,E=V.version,G=J.toneMapping;X.layers.enableAll(),_.unshift(X,X.geometry,X.material,0,0,null)}}function F(_,C){_.getRGB(s7,PQ(J)),$.buffers.color.setClear(s7.r,s7.g,s7.b,C,K)}function q(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(_,C=1){H.set(_),Y=C,F(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(_){Y=_,F(H,Y)},render:M,addToRenderList:z,dispose:q}}function aY(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),W={},Z=G(null),K=Z,H=!1;function Y(A,m,o,p,n){let u=!1,b=E(A,p,o,m);if(K!==b)K=b,U(K.object);if(u=D(A,p,o,n),u)M(A,p,o,n);if(n!==null)Q.update(n,J.ELEMENT_ARRAY_BUFFER);if(u||H){if(H=!1,V(A,m,o,p),n!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(n).buffer)}}function X(){return J.createVertexArray()}function U(A){return J.bindVertexArray(A)}function N(A){return J.deleteVertexArray(A)}function E(A,m,o,p){let n=p.wireframe===!0,u=W[m.id];if(u===void 0)u={},W[m.id]=u;let b=A.isInstancedMesh===!0?A.id:0,t=u[b];if(t===void 0)t={},u[b]=t;let e=t[o.id];if(e===void 0)e={},t[o.id]=e;let H0=e[n];if(H0===void 0)H0=G(X()),e[n]=H0;return H0}function G(A){let m=[],o=[],p=[];for(let n=0;n<$;n++)m[n]=0,o[n]=0,p[n]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:o,attributeDivisors:p,object:A,attributes:{},index:null}}function D(A,m,o,p){let n=K.attributes,u=m.attributes,b=0,t=o.getAttributes();for(let e in t)if(t[e].location>=0){let M0=n[e],k0=u[e];if(k0===void 0){if(e==="instanceMatrix"&&A.instanceMatrix)k0=A.instanceMatrix;if(e==="instanceColor"&&A.instanceColor)k0=A.instanceColor}if(M0===void 0)return!0;if(M0.attribute!==k0)return!0;if(k0&&M0.data!==k0.data)return!0;b++}if(K.attributesNum!==b)return!0;if(K.index!==p)return!0;return!1}function M(A,m,o,p){let n={},u=m.attributes,b=0,t=o.getAttributes();for(let e in t)if(t[e].location>=0){let M0=u[e];if(M0===void 0){if(e==="instanceMatrix"&&A.instanceMatrix)M0=A.instanceMatrix;if(e==="instanceColor"&&A.instanceColor)M0=A.instanceColor}let k0={};if(k0.attribute=M0,M0&&M0.data)k0.data=M0.data;n[e]=k0,b++}K.attributes=n,K.attributesNum=b,K.index=p}function z(){let A=K.newAttributes;for(let m=0,o=A.length;m<o;m++)A[m]=0}function F(A){q(A,0)}function q(A,m){let{newAttributes:o,enabledAttributes:p,attributeDivisors:n}=K;if(o[A]=1,p[A]===0)J.enableVertexAttribArray(A),p[A]=1;if(n[A]!==m)J.vertexAttribDivisor(A,m),n[A]=m}function _(){let{newAttributes:A,enabledAttributes:m}=K;for(let o=0,p=m.length;o<p;o++)if(m[o]!==A[o])J.disableVertexAttribArray(o),m[o]=0}function C(A,m,o,p,n,u,b){if(b===!0)J.vertexAttribIPointer(A,m,o,n,u);else J.vertexAttribPointer(A,m,o,p,n,u)}function V(A,m,o,p){z();let n=p.attributes,u=o.getAttributes(),b=m.defaultAttributeValues;for(let t in u){let e=u[t];if(e.location>=0){let H0=n[t];if(H0===void 0){if(t==="instanceMatrix"&&A.instanceMatrix)H0=A.instanceMatrix;if(t==="instanceColor"&&A.instanceColor)H0=A.instanceColor}if(H0!==void 0){let{normalized:M0,itemSize:k0}=H0,Z8=Q.get(H0);if(Z8===void 0)continue;let{buffer:i0,type:i,bytesPerElement:W0}=Z8,F0=i===J.INT||i===J.UNSIGNED_INT||H0.gpuType===fJ;if(H0.isInterleavedBufferAttribute){let D0=H0.data,C0=D0.stride,p0=H0.offset;if(D0.isInstancedInterleavedBuffer){for(let h0=0;h0<e.locationSize;h0++)q(e.location+h0,D0.meshPerAttribute);if(A.isInstancedMesh!==!0&&p._maxInstanceCount===void 0)p._maxInstanceCount=D0.meshPerAttribute*D0.count}else for(let h0=0;h0<e.locationSize;h0++)F(e.location+h0);J.bindBuffer(J.ARRAY_BUFFER,i0);for(let h0=0;h0<e.locationSize;h0++)C(e.location+h0,k0/e.locationSize,i,M0,C0*W0,(p0+k0/e.locationSize*h0)*W0,F0)}else{if(H0.isInstancedBufferAttribute){for(let D0=0;D0<e.locationSize;D0++)q(e.location+D0,H0.meshPerAttribute);if(A.isInstancedMesh!==!0&&p._maxInstanceCount===void 0)p._maxInstanceCount=H0.meshPerAttribute*H0.count}else for(let D0=0;D0<e.locationSize;D0++)F(e.location+D0);J.bindBuffer(J.ARRAY_BUFFER,i0);for(let D0=0;D0<e.locationSize;D0++)C(e.location+D0,k0/e.locationSize,i,M0,k0*W0,k0/e.locationSize*D0*W0,F0)}}else if(b!==void 0){let M0=b[t];if(M0!==void 0)switch(M0.length){case 2:J.vertexAttrib2fv(e.location,M0);break;case 3:J.vertexAttrib3fv(e.location,M0);break;case 4:J.vertexAttrib4fv(e.location,M0);break;default:J.vertexAttrib1fv(e.location,M0)}}}}_()}function I(){B();for(let A in W){let m=W[A];for(let o in m){let p=m[o];for(let n in p){let u=p[n];for(let b in u)N(u[b].object),delete u[b];delete p[n]}}delete W[A]}}function w(A){if(W[A.id]===void 0)return;let m=W[A.id];for(let o in m){let p=m[o];for(let n in p){let u=p[n];for(let b in u)N(u[b].object),delete u[b];delete p[n]}}delete W[A.id]}function P(A){for(let m in W){let o=W[m];for(let p in o){let n=o[p];if(n[A.id]===void 0)continue;let u=n[A.id];for(let b in u)N(u[b].object),delete u[b];delete n[A.id]}}}function R(A){for(let m in W){let o=W[m],p=A.isInstancedMesh===!0?A.id:0,n=o[p];if(n===void 0)continue;for(let u in n){let b=n[u];for(let t in b)N(b[t].object),delete b[t];delete n[u]}if(delete o[p],Object.keys(o).length===0)delete W[m]}}function B(){if(d(),H=!0,K===Z)return;K=Z,U(K.object)}function d(){Z.geometry=null,Z.program=null,Z.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:d,dispose:I,releaseStatesOfGeometry:w,releaseStatesOfObject:R,releaseStatesOfProgram:P,initAttributes:z,enableAttribute:F,disableUnusedAttributes:_}}function rY(J,Q,$){let W;function Z(X){W=X}function K(X,U){J.drawArrays(W,X,U),$.update(U,W,1)}function H(X,U,N){if(N===0)return;J.drawArraysInstanced(W,X,U,N),$.update(U,W,N)}function Y(X,U,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(W,X,0,U,0,N);let G=0;for(let D=0;D<N;D++)G+=U[D];$.update(G,W,1)}this.setMode=Z,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function tY(J,Q,$,W){let Z;function K(){if(Z!==void 0)return Z;if(Q.has("EXT_texture_filter_anisotropic")===!0){let P=Q.get("EXT_texture_filter_anisotropic");Z=J.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Z=0;return Z}function H(P){if(P!==e8&&W.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(P){let R=P===N6&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(P!==s8&&W.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==G6&&!R)return!1;return!0}function X(P){if(P==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";P="mediump"}if(P==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",N=X(U);if(N!==U)I0("WebGLRenderer:",U,"not supported, using",N,"instead."),U=N;let E=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)I0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),M=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),z=J.getParameter(J.MAX_TEXTURE_SIZE),F=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),q=J.getParameter(J.MAX_VERTEX_ATTRIBS),_=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),C=J.getParameter(J.MAX_VARYING_VECTORS),V=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),I=J.getParameter(J.MAX_SAMPLES),w=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:E,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:M,maxTextureSize:z,maxCubemapSize:F,maxAttributes:q,maxVertexUniforms:_,maxVaryings:C,maxFragmentUniforms:V,maxSamples:I,samples:w}}function eY(J){let Q=this,$=null,W=0,Z=!1,K=!1,H=new X6,Y=new P0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(E,G){let D=E.length!==0||G||W!==0||Z;return Z=G,W=E.length,D},this.beginShadows=function(){K=!0,N(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(E,G){$=N(E,G,0)},this.setState=function(E,G,D){let{clippingPlanes:M,clipIntersection:z,clipShadows:F}=E,q=J.get(E);if(!Z||M===null||M.length===0||K&&!F)if(K)N(null);else U();else{let _=K?0:W,C=_*4,V=q.clippingState||null;X.value=V,V=N(M,G,C,D);for(let I=0;I!==C;++I)V[I]=$[I];q.clippingState=V,this.numIntersection=z?this.numPlanes:0,this.numPlanes+=_}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=W>0;Q.numPlanes=W,Q.numIntersection=0}function N(E,G,D,M){let z=E!==null?E.length:0,F=null;if(z!==0){if(F=X.value,M!==!0||F===null){let q=D+z*4,_=G.matrixWorldInverse;if(Y.getNormalMatrix(_),F===null||F.length<q)F=new Float32Array(q);for(let C=0,V=D;C!==z;++C,V+=4)H.copy(E[C]).applyMatrix4(_,Y),H.normal.toArray(F,V),F[V+3]=H.constant}X.value=F,X.needsUpdate=!0}return Q.numPlanes=z,Q.numIntersection=0,F}}var P6=4,uW=[0.125,0.215,0.35,0.446,0.526,0.582],o6=20,JX=256,m9=new B9,cW=new v0,oQ=null,aQ=0,rQ=0,tQ=!1,QX=new v;class Q${constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,W=100,Z={}){let{size:K=256,position:H=QX}=Z;oQ=this._renderer.getRenderTarget(),aQ=this._renderer.getActiveCubeFace(),rQ=this._renderer.getActiveMipmapLevel(),tQ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,W,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=iW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=sW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(oQ,aQ,rQ),this._renderer.xr.enabled=tQ,J.scissorTest=!1,z9(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===O9||J.mapping===f6)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);oQ=this._renderer.getRenderTarget(),aQ=this._renderer.getActiveCubeFace(),rQ=this._renderer.getActiveMipmapLevel(),tQ=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:T8,minFilter:T8,generateMipmaps:!1,type:N6,format:e8,colorSpace:MQ,depthBuffer:!1},W=nW(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=nW(J,Q,$);let{_lodMax:Z}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=$X(Z)),this._blurMaterial=ZX(Z,J,Q),this._ggxMaterial=WX(Z,J,Q)}return W}_compileMaterial(J){let Q=new A8(new k8,J);this._renderer.compile(Q,m9)}_sceneToCubeUV(J,Q,$,W,Z){let Y=new v8(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],N=this._renderer,E=N.autoClear,G=N.toneMapping;if(N.getClearColor(cW),N.toneMapping=n8,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(W),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new A8(new V9,new k9({name:"PMREM.Background",side:P8,depthWrite:!1,depthTest:!1}));let M=this._backgroundBox,z=M.material,F=!1,q=J.background;if(q){if(q.isColor)z.color.copy(q),J.background=null,F=!0}else z.color.copy(cW),F=!0;for(let _=0;_<6;_++){let C=_%3;if(C===0)Y.up.set(0,X[_],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x+U[_],Z.y,Z.z);else if(C===1)Y.up.set(0,0,X[_]),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y+U[_],Z.z);else Y.up.set(0,X[_],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y,Z.z+U[_]);let V=this._cubeSize;if(z9(W,C*V,_>2?V:0,V,V),N.setRenderTarget(W),F)N.render(M,Y);N.render(J,Y)}N.toneMapping=G,N.autoClear=E,J.background=q}_textureToCubeUV(J,Q){let $=this._renderer,W=J.mapping===O9||J.mapping===f6;if(W){if(this._cubemapMaterial===null)this._cubemapMaterial=iW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=sW();let Z=W?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=Z;let H=Z.uniforms;H.envMap.value=J;let Y=this._cubeSize;z9(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,m9)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let W=this._lodMeshes.length;for(let Z=1;Z<W;Z++)this._applyGGXFilter(J,Z-1,Z);Q.autoClear=$}_applyGGXFilter(J,Q,$){let W=this._renderer,Z=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),N=Math.sqrt(X*X-U*U),E=0+X*1.25,G=N*E,{_lodMax:D}=this,M=this._sizeLods[$],z=3*M*($>D-P6?$-D+P6:0),F=4*(this._cubeSize-M);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=D-Q,z9(Z,z,F,3*M,2*M),W.setRenderTarget(Z),W.render(H,m9),Y.envMap.value=Z.texture,Y.roughness.value=0,Y.mipInt.value=D-$,z9(J,z,F,3*M,2*M),W.setRenderTarget(J),W.render(H,m9)}_blur(J,Q,$,W,Z){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,W,"latitudinal",Z),this._halfBlur(K,J,$,$,W,"longitudinal",Z)}_halfBlur(J,Q,$,W,Z,K,H){let Y=this._renderer,X=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")_0("blur direction must be either latitudinal or longitudinal!");let U=3,N=this._lodMeshes[W];N.material=X;let E=X.uniforms,G=this._sizeLods[$]-1,D=isFinite(Z)?Math.PI/(2*G):2*Math.PI/(2*o6-1),M=Z/D,z=isFinite(Z)?1+Math.floor(U*M):o6;if(z>o6)I0(`sigmaRadians, ${Z}, is too large and will clip, as it requested ${z} samples when the maximum is set to ${o6}`);let F=[],q=0;for(let w=0;w<o6;++w){let P=w/M,R=Math.exp(-P*P/2);if(F.push(R),w===0)q+=R;else if(w<z)q+=2*R}for(let w=0;w<F.length;w++)F[w]=F[w]/q;if(E.envMap.value=J.texture,E.samples.value=z,E.weights.value=F,E.latitudinal.value=K==="latitudinal",H)E.poleAxis.value=H;let{_lodMax:_}=this;E.dTheta.value=D,E.mipInt.value=_-$;let C=this._sizeLods[W],V=3*C*(W>_-P6?W-_+P6:0),I=4*(this._cubeSize-C);z9(Q,V,I,3*C,2*C),Y.setRenderTarget(Q),Y.render(N,m9)}}function $X(J){let Q=[],$=[],W=[],Z=J,K=J-P6+1+uW.length;for(let H=0;H<K;H++){let Y=Math.pow(2,Z);Q.push(Y);let X=1/Y;if(H>J-P6)X=uW[H-J+P6-1];else if(H===0)X=0;$.push(X);let U=1/(Y-2),N=-U,E=1+U,G=[N,N,E,N,E,E,N,N,E,E,N,E],D=6,M=6,z=3,F=2,q=1,_=new Float32Array(z*M*D),C=new Float32Array(F*M*D),V=new Float32Array(q*M*D);for(let w=0;w<D;w++){let P=w%3*2/3-1,R=w>2?0:-1,B=[P,R,0,P+0.6666666666666666,R,0,P+0.6666666666666666,R+1,0,P,R,0,P+0.6666666666666666,R+1,0,P,R+1,0];_.set(B,z*M*w),C.set(G,F*M*w);let d=[w,w,w,w,w,w];V.set(d,q*M*w)}let I=new k8;if(I.setAttribute("position",new p8(_,z)),I.setAttribute("uv",new p8(C,F)),I.setAttribute("faceIndex",new p8(V,q)),W.push(new A8(I,null)),Z>P6)Z--}return{lodMeshes:W,sizeLods:Q,sigmas:$}}function nW(J,Q,$){let W=new m8(J,Q,$);return W.texture.mapping=v9,W.texture.name="PMREM.cubeUv",W.scissorTest=!0,W}function z9(J,Q,$,W,Z){J.viewport.set(Q,$,W,Z),J.scissor.set(Q,$,W,Z)}function WX(J,Q,$){return new C8({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:JX,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:o7(),fragmentShader:`

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
		`,blending:t8,depthTest:!1,depthWrite:!1})}function ZX(J,Q,$){let W=new Float32Array(o6),Z=new v(0,1,0);return new C8({name:"SphericalGaussianBlur",defines:{n:o6,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:W},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:Z}},vertexShader:o7(),fragmentShader:`

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
		`,blending:t8,depthTest:!1,depthWrite:!1})}function sW(){return new C8({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:o7(),fragmentShader:`

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
		`,blending:t8,depthTest:!1,depthWrite:!1})}function iW(){return new C8({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:o7(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:t8,depthTest:!1,depthWrite:!1})}function o7(){return`

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
	`}class Z$ extends m8{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},W=[$,$,$,$,$,$];this.texture=new l7(W),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},W=new V9(5,5,5),Z=new C8({name:"CubemapFromEquirect",uniforms:c6($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:P8,blending:t8});Z.uniforms.tEquirect.value=Q;let K=new A8(W,Z),H=Q.minFilter;if(Q.minFilter===b6)Q.minFilter=T8;return new dQ(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,W=!0){let Z=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,W);J.setRenderTarget(Z)}}function KX(J){let Q=new WeakMap,$=new WeakMap,W=null;function Z(G,D=!1){if(G===null||G===void 0)return null;if(D)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let D=G.mapping;if(D===L7||D===V7)if(Q.has(G)){let M=Q.get(G).texture;return Y(M,G.mapping)}else{let M=G.image;if(M&&M.height>0){let z=new Z$(M.height);return z.fromEquirectangularTexture(J,G),Q.set(G,z),G.addEventListener("dispose",U),Y(z.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let D=G.mapping,M=D===L7||D===V7,z=D===O9||D===f6;if(M||z){let F=$.get(G),q=F!==void 0?F.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==q){if(W===null)W=new Q$(J);return F=M?W.fromEquirectangular(G,F):W.fromCubemap(G,F),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),F.texture}else if(F!==void 0)return F.texture;else{let _=G.image;if(M&&_&&_.height>0||z&&_&&X(_)){if(W===null)W=new Q$(J);return F=M?W.fromEquirectangular(G):W.fromCubemap(G),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),G.addEventListener("dispose",N),F.texture}else return null}}}return G}function Y(G,D){if(D===L7)G.mapping=O9;else if(D===V7)G.mapping=f6;return G}function X(G){let D=0,M=6;for(let z=0;z<M;z++)if(G[z]!==void 0)D++;return D===M}function U(G){let D=G.target;D.removeEventListener("dispose",U);let M=Q.get(D);if(M!==void 0)Q.delete(D),M.dispose()}function N(G){let D=G.target;D.removeEventListener("dispose",N);let M=$.get(D);if(M!==void 0)$.delete(D),M.dispose()}function E(){if(Q=new WeakMap,$=new WeakMap,W!==null)W.dispose(),W=null}return{get:Z,dispose:E}}function HX(J){let Q={};function $(W){if(Q[W]!==void 0)return Q[W];let Z=J.getExtension(W);return Q[W]=Z,Z}return{has:function(W){return $(W)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(W){let Z=$(W);if(Z===null)h6("WebGLRenderer: "+W+" extension not supported.");return Z}}}function YX(J,Q,$,W){let Z={},K=new WeakMap;function H(E){let G=E.target;if(G.index!==null)Q.remove(G.index);for(let M in G.attributes)Q.remove(G.attributes[M]);G.removeEventListener("dispose",H),delete Z[G.id];let D=K.get(G);if(D)Q.remove(D),K.delete(G);if(W.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(E,G){if(Z[G.id]===!0)return G;return G.addEventListener("dispose",H),Z[G.id]=!0,$.memory.geometries++,G}function X(E){let G=E.attributes;for(let D in G)Q.update(G[D],J.ARRAY_BUFFER)}function U(E){let G=[],D=E.index,M=E.attributes.position,z=0;if(M===void 0)return;if(D!==null){let _=D.array;z=D.version;for(let C=0,V=_.length;C<V;C+=3){let I=_[C+0],w=_[C+1],P=_[C+2];G.push(I,w,w,P,P,I)}}else{let _=M.array;z=M.version;for(let C=0,V=_.length/3-1;C<V;C+=3){let I=C+0,w=C+1,P=C+2;G.push(I,w,w,P,P,I)}}let F=new(M.count>=65535?b7:f7)(G,1);F.version=z;let q=K.get(E);if(q)Q.remove(q);K.set(E,F)}function N(E){let G=K.get(E);if(G){let D=E.index;if(D!==null){if(G.version<D.version)U(E)}}else U(E);return K.get(E)}return{get:Y,update:X,getWireframeAttribute:N}}function XX(J,Q,$){let W;function Z(E){W=E}let K,H;function Y(E){K=E.type,H=E.bytesPerElement}function X(E,G){J.drawElements(W,G,K,E*H),$.update(G,W,1)}function U(E,G,D){if(D===0)return;J.drawElementsInstanced(W,G,K,E*H,D),$.update(G,W,D)}function N(E,G,D){if(D===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(W,G,0,K,E,0,D);let z=0;for(let F=0;F<D;F++)z+=G[F];$.update(z,W,1)}this.setMode=Z,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=N}function UX(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function W(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:_0("WebGLInfo: Unknown draw mode:",H);break}}function Z(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:Z,update:W}}function GX(J,Q,$){let W=new WeakMap,Z=new H8;function K(H,Y,X){let U=H.morphTargetInfluences,N=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,E=N!==void 0?N.length:0,G=W.get(Y);if(G===void 0||G.count!==E){let B=function(){P.dispose(),W.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let D=Y.morphAttributes.position!==void 0,M=Y.morphAttributes.normal!==void 0,z=Y.morphAttributes.color!==void 0,F=Y.morphAttributes.position||[],q=Y.morphAttributes.normal||[],_=Y.morphAttributes.color||[],C=0;if(D===!0)C=1;if(M===!0)C=2;if(z===!0)C=3;let V=Y.attributes.position.count*C,I=1;if(V>Q.maxTextureSize)I=Math.ceil(V/Q.maxTextureSize),V=Q.maxTextureSize;let w=new Float32Array(V*I*4*E),P=new y7(w,V,I,E);P.type=G6,P.needsUpdate=!0;let R=C*4;for(let d=0;d<E;d++){let A=F[d],m=q[d],o=_[d],p=V*I*4*d;for(let n=0;n<A.count;n++){let u=n*R;if(D===!0)Z.fromBufferAttribute(A,n),w[p+u+0]=Z.x,w[p+u+1]=Z.y,w[p+u+2]=Z.z,w[p+u+3]=0;if(M===!0)Z.fromBufferAttribute(m,n),w[p+u+4]=Z.x,w[p+u+5]=Z.y,w[p+u+6]=Z.z,w[p+u+7]=0;if(z===!0)Z.fromBufferAttribute(o,n),w[p+u+8]=Z.x,w[p+u+9]=Z.y,w[p+u+10]=Z.z,w[p+u+11]=o.itemSize===4?Z.w:1}}G={count:E,texture:P,size:new u0(V,I)},W.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let D=0;for(let z=0;z<U.length;z++)D+=U[z];let M=Y.morphTargetsRelative?1:1-D;X.getUniforms().setValue(J,"morphTargetBaseInfluence",M),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function NX(J,Q,$,W,Z){let K=new WeakMap;function H(U){let N=Z.render.frame,E=U.geometry,G=Q.get(U,E);if(K.get(G)!==N)Q.update(G),K.set(G,N);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==N){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,N)}}if(U.isSkinnedMesh){let D=U.skeleton;if(K.get(D)!==N)D.update(),K.set(D,N)}return G}function Y(){K=new WeakMap}function X(U){let N=U.target;if(N.removeEventListener("dispose",X),W.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:H,dispose:Y}}var EX={[PJ]:"LINEAR_TONE_MAPPING",[TJ]:"REINHARD_TONE_MAPPING",[SJ]:"CINEON_TONE_MAPPING",[jJ]:"ACES_FILMIC_TONE_MAPPING",[vJ]:"AGX_TONE_MAPPING",[hJ]:"NEUTRAL_TONE_MAPPING",[yJ]:"CUSTOM_TONE_MAPPING"};function qX(J,Q,$,W,Z,K){let H=new m8(Q,$,{type:J,depthBuffer:Z,stencilBuffer:K,samples:W?4:0,depthTexture:Z?new C6(Q,$):void 0}),Y=new m8(Q,$,{type:N6,depthBuffer:!1,stencilBuffer:!1}),X=new k8;X.setAttribute("position",new K8([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new K8([0,2,0,0,2,0],2));let U=new TQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),N=new A8(X,U),E=new B9(-1,1,1,-1,0,1),G=null,D=null,M=!1,z,F=null,q=[],_=!1;this.setSize=function(C,V){H.setSize(C,V),Y.setSize(C,V);for(let I=0;I<q.length;I++){let w=q[I];if(w.setSize)w.setSize(C,V)}},this.setEffects=function(C){q=C,_=q.length>0&&q[0].isRenderPass===!0;let{width:V,height:I}=H;for(let w=0;w<q.length;w++){let P=q[w];if(P.setSize)P.setSize(V,I)}},this.begin=function(C,V){if(M)return!1;if(C.toneMapping===n8&&q.length===0)return!1;if(F=V,V!==null){let{width:I,height:w}=V;if(H.width!==I||H.height!==w)this.setSize(I,w)}if(_===!1)C.setRenderTarget(H);return z=C.toneMapping,C.toneMapping=n8,!0},this.hasRenderPass=function(){return _},this.end=function(C,V){C.toneMapping=z,M=!0;let I=H,w=Y;for(let P=0;P<q.length;P++){let R=q[P];if(R.enabled===!1)continue;if(R.render(C,w,I,V),R.needsSwap!==!1){let B=I;I=w,w=B}}if(G!==C.outputColorSpace||D!==C.toneMapping){if(G=C.outputColorSpace,D=C.toneMapping,U.defines={},x0.getTransfer(G)===r0)U.defines.SRGB_TRANSFER="";let P=EX[D];if(P)U.defines[P]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=I.texture,C.setRenderTarget(F),C.render(N,E),F=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var FZ=new L8,$$=new C6(1,1),DZ=new y7,OZ=new AQ,RZ=new l7,oW=[],aW=[],rW=new Float32Array(16),tW=new Float32Array(9),eW=new Float32Array(4);function w9(J,Q,$){let W=J[0];if(W<=0||W>0)return J;let Z=Q*$,K=oW[Z];if(K===void 0)K=new Float32Array(Z),oW[Z]=K;if(Q!==0){W.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function q8(J,Q){if(J.length!==Q.length)return!1;for(let $=0,W=J.length;$<W;$++)if(J[$]!==Q[$])return!1;return!0}function F8(J,Q){for(let $=0,W=Q.length;$<W;$++)J[$]=Q[$]}function a7(J,Q){let $=aW[Q];if($===void 0)$=new Int32Array(Q),aW[Q]=$;for(let W=0;W!==Q;++W)$[W]=J.allocateTextureUnit();return $}function FX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function DX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2fv(this.addr,Q),F8($,Q)}}function OX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(q8($,Q))return;J.uniform3fv(this.addr,Q),F8($,Q)}}function RX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4fv(this.addr,Q),F8($,Q)}}function kX(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(q8($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,W))return;eW.set(W),J.uniformMatrix2fv(this.addr,!1,eW),F8($,W)}}function MX(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(q8($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,W))return;tW.set(W),J.uniformMatrix3fv(this.addr,!1,tW),F8($,W)}}function LX(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(q8($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,W))return;rW.set(W),J.uniformMatrix4fv(this.addr,!1,rW),F8($,W)}}function VX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function BX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2iv(this.addr,Q),F8($,Q)}}function zX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3iv(this.addr,Q),F8($,Q)}}function wX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4iv(this.addr,Q),F8($,Q)}}function IX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function AX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2uiv(this.addr,Q),F8($,Q)}}function CX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3uiv(this.addr,Q),F8($,Q)}}function _X(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4uiv(this.addr,Q),F8($,Q)}}function PX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;let K;if(this.type===J.SAMPLER_2D_SHADOW)$$.compareFunction=$.isReversedDepthBuffer()?j7:S7,K=$$;else K=FZ;$.setTexture2D(Q||K,Z)}function TX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture3D(Q||OZ,Z)}function SX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTextureCube(Q||RZ,Z)}function jX(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture2DArray(Q||DZ,Z)}function yX(J){switch(J){case 5126:return FX;case 35664:return DX;case 35665:return OX;case 35666:return RX;case 35674:return kX;case 35675:return MX;case 35676:return LX;case 5124:case 35670:return VX;case 35667:case 35671:return BX;case 35668:case 35672:return zX;case 35669:case 35673:return wX;case 5125:return IX;case 36294:return AX;case 36295:return CX;case 36296:return _X;case 35678:case 36198:case 36298:case 36306:case 35682:return PX;case 35679:case 36299:case 36307:return TX;case 35680:case 36300:case 36308:case 36293:return SX;case 36289:case 36303:case 36311:case 36292:return jX}}function vX(J,Q){J.uniform1fv(this.addr,Q)}function hX(J,Q){let $=w9(Q,this.size,2);J.uniform2fv(this.addr,$)}function fX(J,Q){let $=w9(Q,this.size,3);J.uniform3fv(this.addr,$)}function bX(J,Q){let $=w9(Q,this.size,4);J.uniform4fv(this.addr,$)}function xX(J,Q){let $=w9(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function gX(J,Q){let $=w9(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function pX(J,Q){let $=w9(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function mX(J,Q){J.uniform1iv(this.addr,Q)}function lX(J,Q){J.uniform2iv(this.addr,Q)}function dX(J,Q){J.uniform3iv(this.addr,Q)}function uX(J,Q){J.uniform4iv(this.addr,Q)}function cX(J,Q){J.uniform1uiv(this.addr,Q)}function nX(J,Q){J.uniform2uiv(this.addr,Q)}function sX(J,Q){J.uniform3uiv(this.addr,Q)}function iX(J,Q){J.uniform4uiv(this.addr,Q)}function oX(J,Q,$){let W=this.cache,Z=Q.length,K=a7($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=$$;else H=FZ;for(let Y=0;Y!==Z;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function aX(J,Q,$){let W=this.cache,Z=Q.length,K=a7($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);for(let H=0;H!==Z;++H)$.setTexture3D(Q[H]||OZ,K[H])}function rX(J,Q,$){let W=this.cache,Z=Q.length,K=a7($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);for(let H=0;H!==Z;++H)$.setTextureCube(Q[H]||RZ,K[H])}function tX(J,Q,$){let W=this.cache,Z=Q.length,K=a7($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);for(let H=0;H!==Z;++H)$.setTexture2DArray(Q[H]||DZ,K[H])}function eX(J){switch(J){case 5126:return vX;case 35664:return hX;case 35665:return fX;case 35666:return bX;case 35674:return xX;case 35675:return gX;case 35676:return pX;case 5124:case 35670:return mX;case 35667:case 35671:return lX;case 35668:case 35672:return dX;case 35669:case 35673:return uX;case 5125:return cX;case 36294:return nX;case 36295:return sX;case 36296:return iX;case 35678:case 36198:case 36298:case 36306:case 35682:return oX;case 35679:case 36299:case 36307:return aX;case 35680:case 36300:case 36308:case 36293:return rX;case 36289:case 36303:case 36311:case 36292:return tX}}class kZ{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=yX(Q.type)}}class MZ{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=eX(Q.type)}}class LZ{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let W=this.seq;for(let Z=0,K=W.length;Z!==K;++Z){let H=W[Z];H.setValue(J,Q[H.id],$)}}}var eQ=/(\w+)(\])?(\[|\.)?/g;function JZ(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function JU(J,Q,$){let W=J.name,Z=W.length;eQ.lastIndex=0;while(!0){let K=eQ.exec(W),H=eQ.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===Z){JZ($,U===void 0?new kZ(Y,J,Q):new MZ(Y,J,Q));break}else{let E=$.map[Y];if(E===void 0)E=new LZ(Y),JZ($,E);$=E}}}class u9{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);JU(H,Y,this)}let W=[],Z=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)W.push(K);else Z.push(K);if(W.length>0)this.seq=W.concat(Z)}setValue(J,Q,$,W){let Z=this.map[Q];if(Z!==void 0)Z.setValue(J,$,W)}setOptional(J,Q,$){let W=Q[$];if(W!==void 0)this.setValue(J,$,W)}static upload(J,Q,$,W){for(let Z=0,K=Q.length;Z!==K;++Z){let H=Q[Z],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,W)}}static seqWithValue(J,Q){let $=[];for(let W=0,Z=J.length;W!==Z;++W){let K=J[W];if(K.id in Q)$.push(K)}return $}}function QZ(J,Q,$){let W=J.createShader(Q);return J.shaderSource(W,$),J.compileShader(W),W}var QU=37297,$U=0;function WU(J,Q){let $=J.split(`
`),W=[],Z=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=Z;H<K;H++){let Y=H+1;W.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return W.join(`
`)}var $Z=new P0;function ZU(J){x0._getMatrix($Z,x0.workingColorSpace,J);let Q=`mat3( ${$Z.elements.map(($)=>$.toFixed(4))} )`;switch(x0.getTransfer(J)){case LQ:return[Q,"LinearTransferOETF"];case r0:return[Q,"sRGBTransferOETF"];default:return I0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function WZ(J,Q,$){let W=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(W&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+WU(J.getShaderSource(Q),Y)}else return K}function KU(J,Q){let $=ZU(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var HU={[PJ]:"Linear",[TJ]:"Reinhard",[SJ]:"Cineon",[jJ]:"ACESFilmic",[vJ]:"AgX",[hJ]:"Neutral",[yJ]:"Custom"};function YU(J,Q){let $=HU[Q];if($===void 0)return I0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var i7=new v;function XU(){x0.getLuminanceCoefficients(i7);let J=i7.x.toFixed(4),Q=i7.y.toFixed(4),$=i7.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function UU(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(d9).join(`
`)}function GU(J){let Q=[];for(let $ in J){let W=J[$];if(W===!1)continue;Q.push("#define "+$+" "+W)}return Q.join(`
`)}function NU(J,Q){let $={},W=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let Z=0;Z<W;Z++){let K=J.getActiveAttrib(Q,Z),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function d9(J){return J!==""}function ZZ(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function KZ(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var EU=/^[ \t]*#include +<([\w\d./]+)>/gm;function W$(J){return J.replace(EU,FU)}var qU=new Map;function FU(J,Q){let $=j0[Q];if($===void 0){let W=qU.get(Q);if(W!==void 0)$=j0[W],I0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,W);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return W$($)}var DU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function HZ(J){return J.replace(DU,OU)}function OU(J,Q,$,W){let Z="";for(let K=parseInt(Q);K<parseInt($);K++)Z+=W.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return Z}function YZ(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var RU={[j9]:"SHADOWMAP_TYPE_PCF",[q9]:"SHADOWMAP_TYPE_VSM"};function kU(J){return RU[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var MU={[O9]:"ENVMAP_TYPE_CUBE",[f6]:"ENVMAP_TYPE_CUBE",[v9]:"ENVMAP_TYPE_CUBE_UV"};function LU(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return MU[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var VU={[f6]:"ENVMAP_MODE_REFRACTION"};function BU(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return VU[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var zU={[OW]:"ENVMAP_BLENDING_MULTIPLY",[RW]:"ENVMAP_BLENDING_MIX",[kW]:"ENVMAP_BLENDING_ADD"};function wU(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return zU[J.combine]||"ENVMAP_BLENDING_NONE"}function IU(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,W=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:W,maxMip:$}}function AU(J,Q,$,W){let Z=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=kU($),U=LU($),N=BU($),E=wU($),G=IU($),D=UU($),M=GU(K),z=Z.createProgram(),F,q,_=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(F=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M].filter(d9).join(`
`),F.length>0)F+=`
`;if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M].filter(d9).join(`
`),q.length>0)q+=`
`}else F=[YZ($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(d9).join(`
`),q=[YZ($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+N:"",$.envMap?"#define "+E:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==n8?"#define TONE_MAPPING":"",$.toneMapping!==n8?j0.tonemapping_pars_fragment:"",$.toneMapping!==n8?YU("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",j0.colorspace_pars_fragment,KU("linearToOutputTexel",$.outputColorSpace),XU(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(d9).join(`
`);if(H=W$(H),H=ZZ(H,$),H=KZ(H,$),Y=W$(Y),Y=ZZ(Y,$),Y=KZ(Y,$),H=HZ(H),Y=HZ(Y),$.isRawShaderMaterial!==!0)_=`#version 300 es
`,F=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+F,q=["#define varying in",$.glslVersion===VQ?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===VQ?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+q;let C=_+F+H,V=_+q+Y,I=QZ(Z,Z.VERTEX_SHADER,C),w=QZ(Z,Z.FRAGMENT_SHADER,V);if(Z.attachShader(z,I),Z.attachShader(z,w),$.index0AttributeName!==void 0)Z.bindAttribLocation(z,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)Z.bindAttribLocation(z,0,"position");Z.linkProgram(z);function P(A){if(J.debug.checkShaderErrors){let m=Z.getProgramInfoLog(z)||"",o=Z.getShaderInfoLog(I)||"",p=Z.getShaderInfoLog(w)||"",n=m.trim(),u=o.trim(),b=p.trim(),t=!0,e=!0;if(Z.getProgramParameter(z,Z.LINK_STATUS)===!1)if(t=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(Z,z,I,w);else{let H0=WZ(Z,I,"vertex"),M0=WZ(Z,w,"fragment");_0("WebGLProgram: Shader Error "+Z.getError()+" - VALIDATE_STATUS "+Z.getProgramParameter(z,Z.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+n+`
`+H0+`
`+M0)}else if(n!=="")I0("WebGLProgram: Program Info Log:",n);else if(u===""||b==="")e=!1;if(e)A.diagnostics={runnable:t,programLog:n,vertexShader:{log:u,prefix:F},fragmentShader:{log:b,prefix:q}}}Z.deleteShader(I),Z.deleteShader(w),R=new u9(Z,z),B=NU(Z,z)}let R;this.getUniforms=function(){if(R===void 0)P(this);return R};let B;this.getAttributes=function(){if(B===void 0)P(this);return B};let d=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(d===!1)d=Z.getProgramParameter(z,QU);return d},this.destroy=function(){W.releaseStatesOfProgram(this),Z.deleteProgram(z),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=$U++,this.cacheKey=Q,this.usedTimes=1,this.program=z,this.vertexShader=I,this.fragmentShader=w,this}var CU=0;class VZ{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let W=this._getShaderCacheForMaterial(J);if(W.has(Q)===!1)W.add(Q),Q.usedTimes++;if(W.has($)===!1)W.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new BZ(J),Q.set(J,$);return $}}class BZ{constructor(J){this.id=CU++,this.code=J,this.usedTimes=0}}function _U(J){return J===p6||J===_7||J===P7}function PU(J,Q,$,W,Z,K){let H=new v7,Y=new VZ,X=new Set,U=[],N=new Map,E=W.logarithmicDepthBuffer,G=W.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(R){if(X.add(R),R===0)return"uv";return`uv${R}`}function z(R,B,d,A,m,o){let p=A.fog,n=m.geometry,u=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?A.environment:null,b=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap,t=Q.get(R.envMap||u,b),e=!!t&&t.mapping===v9?t.image.height:null,H0=D[R.type];if(R.precision!==null){if(G=W.getMaxPrecision(R.precision),G!==R.precision)I0("WebGLProgram.getParameters:",R.precision,"not supported, using",G,"instead.")}let M0=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,k0=M0!==void 0?M0.length:0,Z8=0;if(n.morphAttributes.position!==void 0)Z8=1;if(n.morphAttributes.normal!==void 0)Z8=2;if(n.morphAttributes.color!==void 0)Z8=3;let i0,i,W0,F0;if(H0){let T0=Q6[H0];i0=T0.vertexShader,i=T0.fragmentShader}else{i0=R.vertexShader,i=R.fragmentShader;let T0=Y.getVertexShaderStage(R),Y8=Y.getFragmentShaderStage(R);Y.update(R,T0,Y8),W0=T0.id,F0=Y8.id}let D0=J.getRenderTarget(),C0=J.state.buffers.depth.getReversed(),p0=m.isInstancedMesh===!0,h0=m.isBatchedMesh===!0,f0=!!R.map,t0=!!R.matcap,m0=!!t,b0=!!R.aoMap,D8=!!R.lightMap,h8=!!R.bumpMap&&R.wireframe===!1,Q8=!!R.normalMap,M8=!!R.displacementMap,O8=!!R.emissiveMap,E8=!!R.metalnessMap,j=!!R.roughnessMap,f8=R.anisotropy>0,c0=R.clearcoat>0,$8=R.dispersion>0,L=R.iridescence>0,O=R.sheen>0,T=R.transmission>0,g=f8&&!!R.anisotropyMap,r=c0&&!!R.clearcoatMap,J0=c0&&!!R.clearcoatNormalMap,Y0=c0&&!!R.clearcoatRoughnessMap,l=L&&!!R.iridescenceMap,s=L&&!!R.iridescenceThicknessMap,E0=O&&!!R.sheenColorMap,V0=O&&!!R.sheenRoughnessMap,X0=!!R.specularMap,Q0=!!R.specularColorMap,w0=!!R.specularIntensityMap,A0=T&&!!R.transmissionMap,d0=T&&!!R.thicknessMap,S=!!R.gradientMap,$0=!!R.alphaMap,c=R.alphaTest>0,Z0=!!R.alphaHash,q0=!!R.extensions,a=n8;if(R.toneMapped){if(D0===null||D0.isXRRenderTarget===!0)a=J.toneMapping}let K0={shaderID:H0,shaderType:R.type,shaderName:R.name,vertexShader:i0,fragmentShader:i,defines:R.defines,customVertexShaderID:W0,customFragmentShaderID:F0,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:G,batching:h0,batchingColor:h0&&m._colorsTexture!==null,instancing:p0,instancingColor:p0&&m.instanceColor!==null,instancingMorph:p0&&m.morphTexture!==null,outputColorSpace:D0===null?J.outputColorSpace:D0.isXRRenderTarget===!0?D0.texture.colorSpace:x0.workingColorSpace,alphaToCoverage:!!R.alphaToCoverage,map:f0,matcap:t0,envMap:m0,envMapMode:m0&&t.mapping,envMapCubeUVHeight:e,aoMap:b0,lightMap:D8,bumpMap:h8,normalMap:Q8,displacementMap:M8,emissiveMap:O8,normalMapObjectSpace:Q8&&R.normalMapType===PW,normalMapTangentSpace:Q8&&R.normalMapType===kQ,packedNormalMap:Q8&&R.normalMapType===kQ&&_U(R.normalMap.format),metalnessMap:E8,roughnessMap:j,anisotropy:f8,anisotropyMap:g,clearcoat:c0,clearcoatMap:r,clearcoatNormalMap:J0,clearcoatRoughnessMap:Y0,dispersion:$8,iridescence:L,iridescenceMap:l,iridescenceThicknessMap:s,sheen:O,sheenColorMap:E0,sheenRoughnessMap:V0,specularMap:X0,specularColorMap:Q0,specularIntensityMap:w0,transmission:T,transmissionMap:A0,thicknessMap:d0,gradientMap:S,opaque:R.transparent===!1&&R.blending===y9&&R.alphaToCoverage===!1,alphaMap:$0,alphaTest:c,alphaHash:Z0,combine:R.combine,mapUv:f0&&M(R.map.channel),aoMapUv:b0&&M(R.aoMap.channel),lightMapUv:D8&&M(R.lightMap.channel),bumpMapUv:h8&&M(R.bumpMap.channel),normalMapUv:Q8&&M(R.normalMap.channel),displacementMapUv:M8&&M(R.displacementMap.channel),emissiveMapUv:O8&&M(R.emissiveMap.channel),metalnessMapUv:E8&&M(R.metalnessMap.channel),roughnessMapUv:j&&M(R.roughnessMap.channel),anisotropyMapUv:g&&M(R.anisotropyMap.channel),clearcoatMapUv:r&&M(R.clearcoatMap.channel),clearcoatNormalMapUv:J0&&M(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y0&&M(R.clearcoatRoughnessMap.channel),iridescenceMapUv:l&&M(R.iridescenceMap.channel),iridescenceThicknessMapUv:s&&M(R.iridescenceThicknessMap.channel),sheenColorMapUv:E0&&M(R.sheenColorMap.channel),sheenRoughnessMapUv:V0&&M(R.sheenRoughnessMap.channel),specularMapUv:X0&&M(R.specularMap.channel),specularColorMapUv:Q0&&M(R.specularColorMap.channel),specularIntensityMapUv:w0&&M(R.specularIntensityMap.channel),transmissionMapUv:A0&&M(R.transmissionMap.channel),thicknessMapUv:d0&&M(R.thicknessMap.channel),alphaMapUv:$0&&M(R.alphaMap.channel),vertexTangents:!!n.attributes.tangent&&(Q8||f8),vertexNormals:!!n.attributes.normal,vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!n.attributes.uv&&(f0||$0),fog:!!p,useFog:R.fog===!0,fogExp2:!!p&&p.isFogExp2,flatShading:R.wireframe===!1&&(R.flatShading===!0||n.attributes.normal===void 0&&Q8===!1&&(R.isMeshLambertMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isMeshPhysicalMaterial)),sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:E,reversedDepthBuffer:C0,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:n.attributes.position!==void 0,morphTargets:n.morphAttributes.position!==void 0,morphNormals:n.morphAttributes.normal!==void 0,morphColors:n.morphAttributes.color!==void 0,morphTargetsCount:k0,morphTextureStride:Z8,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:o.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:R.dithering,shadowMapEnabled:J.shadowMap.enabled&&d.length>0,shadowMapType:J.shadowMap.type,toneMapping:a,decodeVideoTexture:f0&&R.map.isVideoTexture===!0&&x0.getTransfer(R.map.colorSpace)===r0,decodeVideoTextureEmissive:O8&&R.emissiveMap.isVideoTexture===!0&&x0.getTransfer(R.emissiveMap.colorSpace)===r0,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===r8,flipSided:R.side===P8,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:q0&&R.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(q0&&R.extensions.multiDraw===!0||h0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return K0.vertexUv1s=X.has(1),K0.vertexUv2s=X.has(2),K0.vertexUv3s=X.has(3),X.clear(),K0}function F(R){let B=[];if(R.shaderID)B.push(R.shaderID);else B.push(R.customVertexShaderID),B.push(R.customFragmentShaderID);if(R.defines!==void 0)for(let d in R.defines)B.push(d),B.push(R.defines[d]);if(R.isRawShaderMaterial===!1)q(B,R),_(B,R),B.push(J.outputColorSpace);return B.push(R.customProgramCacheKey),B.join()}function q(R,B){R.push(B.precision),R.push(B.outputColorSpace),R.push(B.envMapMode),R.push(B.envMapCubeUVHeight),R.push(B.mapUv),R.push(B.alphaMapUv),R.push(B.lightMapUv),R.push(B.aoMapUv),R.push(B.bumpMapUv),R.push(B.normalMapUv),R.push(B.displacementMapUv),R.push(B.emissiveMapUv),R.push(B.metalnessMapUv),R.push(B.roughnessMapUv),R.push(B.anisotropyMapUv),R.push(B.clearcoatMapUv),R.push(B.clearcoatNormalMapUv),R.push(B.clearcoatRoughnessMapUv),R.push(B.iridescenceMapUv),R.push(B.iridescenceThicknessMapUv),R.push(B.sheenColorMapUv),R.push(B.sheenRoughnessMapUv),R.push(B.specularMapUv),R.push(B.specularColorMapUv),R.push(B.specularIntensityMapUv),R.push(B.transmissionMapUv),R.push(B.thicknessMapUv),R.push(B.combine),R.push(B.fogExp2),R.push(B.sizeAttenuation),R.push(B.morphTargetsCount),R.push(B.morphAttributeCount),R.push(B.numDirLights),R.push(B.numPointLights),R.push(B.numSpotLights),R.push(B.numSpotLightMaps),R.push(B.numHemiLights),R.push(B.numRectAreaLights),R.push(B.numDirLightShadows),R.push(B.numPointLightShadows),R.push(B.numSpotLightShadows),R.push(B.numSpotLightShadowsWithMaps),R.push(B.numLightProbes),R.push(B.shadowMapType),R.push(B.toneMapping),R.push(B.numClippingPlanes),R.push(B.numClipIntersection),R.push(B.depthPacking)}function _(R,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(R.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);R.push(H.mask)}function C(R){let B=D[R.type],d;if(B){let A=Q6[B];d=mW.clone(A.uniforms)}else d=R.uniforms;return d}function V(R,B){let d=N.get(B);if(d!==void 0)++d.usedTimes;else d=new AU(J,B,R,Z),U.push(d),N.set(B,d);return d}function I(R){if(--R.usedTimes===0){let B=U.indexOf(R);U[B]=U[U.length-1],U.pop(),N.delete(R.cacheKey),R.destroy()}}function w(R){Y.remove(R)}function P(){Y.dispose()}return{getParameters:z,getProgramCacheKey:F,getUniforms:C,acquireProgram:V,releaseProgram:I,releaseShaderCache:w,programs:U,dispose:P}}function TU(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function W(H){J.delete(H)}function Z(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:Q,get:$,remove:W,update:Z,dispose:K}}function SU(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function XZ(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function UZ(){let J=[],Q=0,$=[],W=[],Z=[];function K(){Q=0,$.length=0,W.length=0,Z.length=0}function H(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Y(G,D,M,z,F,q){let _=J[Q];if(_===void 0)_={id:G.id,object:G,geometry:D,material:M,materialVariant:H(G),groupOrder:z,renderOrder:G.renderOrder,z:F,group:q},J[Q]=_;else _.id=G.id,_.object=G,_.geometry=D,_.material=M,_.materialVariant=H(G),_.groupOrder=z,_.renderOrder=G.renderOrder,_.z=F,_.group=q;return Q++,_}function X(G,D,M,z,F,q){let _=Y(G,D,M,z,F,q);if(M.transmission>0)W.push(_);else if(M.transparent===!0)Z.push(_);else $.push(_)}function U(G,D,M,z,F,q){let _=Y(G,D,M,z,F,q);if(M.transmission>0)W.unshift(_);else if(M.transparent===!0)Z.unshift(_);else $.unshift(_)}function N(G,D,M){if($.length>1)$.sort(G||SU);if(W.length>1)W.sort(D||XZ);if(Z.length>1)Z.sort(D||XZ);if(M)$.reverse(),W.reverse(),Z.reverse()}function E(){for(let G=Q,D=J.length;G<D;G++){let M=J[G];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:$,transmissive:W,transparent:Z,init:K,push:X,unshift:U,finish:E,sort:N}}function jU(){let J=new WeakMap;function Q(W,Z){let K=J.get(W),H;if(K===void 0)H=new UZ,J.set(W,[H]);else if(Z>=K.length)H=new UZ,K.push(H);else H=K[Z];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function yU(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new v,color:new v0};break;case"SpotLight":$={position:new v,direction:new v,color:new v0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new v,color:new v0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new v,skyColor:new v0,groundColor:new v0};break;case"RectAreaLight":$={color:new v0,position:new v,halfWidth:new v,halfHeight:new v};break}return J[Q.id]=$,$}}}function vU(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var hU=0;function fU(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function bU(J){let Q=new yU,$=vU(),W={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)W.probe.push(new v);let Z=new v,K=new W8,H=new W8;function Y(U){let N=0,E=0,G=0;for(let B=0;B<9;B++)W.probe[B].set(0,0,0);let D=0,M=0,z=0,F=0,q=0,_=0,C=0,V=0,I=0,w=0,P=0;U.sort(fU);for(let B=0,d=U.length;B<d;B++){let A=U[B],m=A.color,o=A.intensity,p=A.distance,n=null;if(A.shadow&&A.shadow.map)if(A.shadow.map.texture.format===p6)n=A.shadow.map.texture;else n=A.shadow.map.depthTexture||A.shadow.map.texture;if(A.isAmbientLight)N+=m.r*o,E+=m.g*o,G+=m.b*o;else if(A.isLightProbe){for(let u=0;u<9;u++)W.probe[u].addScaledVector(A.sh.coefficients[u],o);P++}else if(A.isDirectionalLight){let u=Q.get(A);if(u.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){let b=A.shadow,t=$.get(A);t.shadowIntensity=b.intensity,t.shadowBias=b.bias,t.shadowNormalBias=b.normalBias,t.shadowRadius=b.radius,t.shadowMapSize=b.mapSize,W.directionalShadow[D]=t,W.directionalShadowMap[D]=n,W.directionalShadowMatrix[D]=A.shadow.matrix,_++}W.directional[D]=u,D++}else if(A.isSpotLight){let u=Q.get(A);u.position.setFromMatrixPosition(A.matrixWorld),u.color.copy(m).multiplyScalar(o),u.distance=p,u.coneCos=Math.cos(A.angle),u.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),u.decay=A.decay,W.spot[z]=u;let b=A.shadow;if(A.map){if(W.spotLightMap[I]=A.map,I++,b.updateMatrices(A),A.castShadow)w++}if(W.spotLightMatrix[z]=b.matrix,A.castShadow){let t=$.get(A);t.shadowIntensity=b.intensity,t.shadowBias=b.bias,t.shadowNormalBias=b.normalBias,t.shadowRadius=b.radius,t.shadowMapSize=b.mapSize,W.spotShadow[z]=t,W.spotShadowMap[z]=n,V++}z++}else if(A.isRectAreaLight){let u=Q.get(A);u.color.copy(m).multiplyScalar(o),u.halfWidth.set(A.width*0.5,0,0),u.halfHeight.set(0,A.height*0.5,0),W.rectArea[F]=u,F++}else if(A.isPointLight){let u=Q.get(A);if(u.color.copy(A.color).multiplyScalar(A.intensity),u.distance=A.distance,u.decay=A.decay,A.castShadow){let b=A.shadow,t=$.get(A);t.shadowIntensity=b.intensity,t.shadowBias=b.bias,t.shadowNormalBias=b.normalBias,t.shadowRadius=b.radius,t.shadowMapSize=b.mapSize,t.shadowCameraNear=b.camera.near,t.shadowCameraFar=b.camera.far,W.pointShadow[M]=t,W.pointShadowMap[M]=n,W.pointShadowMatrix[M]=A.shadow.matrix,C++}W.point[M]=u,M++}else if(A.isHemisphereLight){let u=Q.get(A);u.skyColor.copy(A.color).multiplyScalar(o),u.groundColor.copy(A.groundColor).multiplyScalar(o),W.hemi[q]=u,q++}}if(F>0)if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=U0.LTC_FLOAT_1,W.rectAreaLTC2=U0.LTC_FLOAT_2;else W.rectAreaLTC1=U0.LTC_HALF_1,W.rectAreaLTC2=U0.LTC_HALF_2;W.ambient[0]=N,W.ambient[1]=E,W.ambient[2]=G;let R=W.hash;if(R.directionalLength!==D||R.pointLength!==M||R.spotLength!==z||R.rectAreaLength!==F||R.hemiLength!==q||R.numDirectionalShadows!==_||R.numPointShadows!==C||R.numSpotShadows!==V||R.numSpotMaps!==I||R.numLightProbes!==P)W.directional.length=D,W.spot.length=z,W.rectArea.length=F,W.point.length=M,W.hemi.length=q,W.directionalShadow.length=_,W.directionalShadowMap.length=_,W.pointShadow.length=C,W.pointShadowMap.length=C,W.spotShadow.length=V,W.spotShadowMap.length=V,W.directionalShadowMatrix.length=_,W.pointShadowMatrix.length=C,W.spotLightMatrix.length=V+I-w,W.spotLightMap.length=I,W.numSpotLightShadowsWithMaps=w,W.numLightProbes=P,R.directionalLength=D,R.pointLength=M,R.spotLength=z,R.rectAreaLength=F,R.hemiLength=q,R.numDirectionalShadows=_,R.numPointShadows=C,R.numSpotShadows=V,R.numSpotMaps=I,R.numLightProbes=P,W.version=hU++}function X(U,N){let E=0,G=0,D=0,M=0,z=0,F=N.matrixWorldInverse;for(let q=0,_=U.length;q<_;q++){let C=U[q];if(C.isDirectionalLight){let V=W.directional[E];V.direction.setFromMatrixPosition(C.matrixWorld),Z.setFromMatrixPosition(C.target.matrixWorld),V.direction.sub(Z),V.direction.transformDirection(F),E++}else if(C.isSpotLight){let V=W.spot[D];V.position.setFromMatrixPosition(C.matrixWorld),V.position.applyMatrix4(F),V.direction.setFromMatrixPosition(C.matrixWorld),Z.setFromMatrixPosition(C.target.matrixWorld),V.direction.sub(Z),V.direction.transformDirection(F),D++}else if(C.isRectAreaLight){let V=W.rectArea[M];V.position.setFromMatrixPosition(C.matrixWorld),V.position.applyMatrix4(F),H.identity(),K.copy(C.matrixWorld),K.premultiply(F),H.extractRotation(K),V.halfWidth.set(C.width*0.5,0,0),V.halfHeight.set(0,C.height*0.5,0),V.halfWidth.applyMatrix4(H),V.halfHeight.applyMatrix4(H),M++}else if(C.isPointLight){let V=W.point[G];V.position.setFromMatrixPosition(C.matrixWorld),V.position.applyMatrix4(F),G++}else if(C.isHemisphereLight){let V=W.hemi[z];V.direction.setFromMatrixPosition(C.matrixWorld),V.direction.transformDirection(F),z++}}}return{setup:Y,setupView:X,state:W}}function GZ(J){let Q=new bU(J),$=[],W=[],Z=[];function K(G){E.camera=G,$.length=0,W.length=0,Z.length=0}function H(G){$.push(G)}function Y(G){W.push(G)}function X(G){Z.push(G)}function U(){Q.setup($)}function N(G){Q.setupView($,G)}let E={lightsArray:$,shadowsArray:W,lightProbeGridArray:Z,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:E,setupLights:U,setupLightsView:N,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function xU(J){let Q=new WeakMap;function $(Z,K=0){let H=Q.get(Z),Y;if(H===void 0)Y=new GZ(J),Q.set(Z,[Y]);else if(K>=H.length)Y=new GZ(J),H.push(Y);else Y=H[K];return Y}function W(){Q=new WeakMap}return{get:$,dispose:W}}var gU=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,pU=`uniform sampler2D shadow_pass;
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
}`,mU=[new v(1,0,0),new v(-1,0,0),new v(0,1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1)],lU=[new v(0,-1,0),new v(0,-1,0),new v(0,0,1),new v(0,0,-1),new v(0,-1,0),new v(0,-1,0)],NZ=new W8,l9=new v,J$=new v;function dU(J,Q,$){let W=new x7,Z=new u0,K=new u0,H=new H8,Y=new SQ,X=new jQ,U={},N=$.maxTextureSize,E={[F9]:P8,[P8]:F9,[r8]:r8},G=new C8({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new u0},radius:{value:4}},vertexShader:gU,fragmentShader:pU}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let M=new k8;M.setAttribute("position",new p8(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let z=new A8(M,G),F=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=j9;let q=this.type;this.render=function(w,P,R){if(F.enabled===!1)return;if(F.autoUpdate===!1&&F.needsUpdate===!1)return;if(w.length===0)return;if(this.type===l$)I0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=j9;let B=J.getRenderTarget(),d=J.getActiveCubeFace(),A=J.getActiveMipmapLevel(),m=J.state;if(m.setBlending(t8),m.buffers.depth.getReversed()===!0)m.buffers.color.setClear(0,0,0,0);else m.buffers.color.setClear(1,1,1,1);m.buffers.depth.setTest(!0),m.setScissorTest(!1);let o=q!==this.type;if(o)P.traverse(function(p){if(p.material)if(Array.isArray(p.material))p.material.forEach((n)=>n.needsUpdate=!0);else p.material.needsUpdate=!0});for(let p=0,n=w.length;p<n;p++){let u=w[p],b=u.shadow;if(b===void 0){I0("WebGLShadowMap:",u,"has no shadow.");continue}if(b.autoUpdate===!1&&b.needsUpdate===!1)continue;Z.copy(b.mapSize);let t=b.getFrameExtents();if(Z.multiply(t),K.copy(b.mapSize),Z.x>N||Z.y>N){if(Z.x>N)K.x=Math.floor(N/t.x),Z.x=K.x*t.x,b.mapSize.x=K.x;if(Z.y>N)K.y=Math.floor(N/t.y),Z.y=K.y*t.y,b.mapSize.y=K.y}let e=J.state.buffers.depth.getReversed();if(b.camera._reversedDepth=e,b.map===null||o===!0){if(b.map!==null){if(b.map.depthTexture!==null)b.map.depthTexture.dispose(),b.map.depthTexture=null;b.map.dispose()}if(this.type===q9){if(u.isPointLight){I0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}b.map=new m8(Z.x,Z.y,{format:p6,type:N6,minFilter:T8,magFilter:T8,generateMipmaps:!1}),b.map.texture.name=u.name+".shadowMap",b.map.depthTexture=new C6(Z.x,Z.y,G6),b.map.depthTexture.name=u.name+".shadowMapDepth",b.map.depthTexture.format=x6,b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=w6,b.map.depthTexture.magFilter=w6}else{if(u.isPointLight)b.map=new Z$(Z.x),b.map.depthTexture=new _Q(Z.x,I6);else b.map=new m8(Z.x,Z.y),b.map.depthTexture=new C6(Z.x,Z.y,I6);if(b.map.depthTexture.name=u.name+".shadowMap",b.map.depthTexture.format=x6,this.type===j9)b.map.depthTexture.compareFunction=e?j7:S7,b.map.depthTexture.minFilter=T8,b.map.depthTexture.magFilter=T8;else b.map.depthTexture.compareFunction=null,b.map.depthTexture.minFilter=w6,b.map.depthTexture.magFilter=w6}b.camera.updateProjectionMatrix()}let H0=b.map.isWebGLCubeRenderTarget?6:1;for(let M0=0;M0<H0;M0++){if(b.map.isWebGLCubeRenderTarget)J.setRenderTarget(b.map,M0),J.clear();else{if(M0===0)J.setRenderTarget(b.map),J.clear();let k0=b.getViewport(M0);H.set(K.x*k0.x,K.y*k0.y,K.x*k0.z,K.y*k0.w),m.viewport(H)}if(u.isPointLight){let{camera:k0,matrix:Z8}=b,i0=u.distance||k0.far;if(i0!==k0.far)k0.far=i0,k0.updateProjectionMatrix();l9.setFromMatrixPosition(u.matrixWorld),k0.position.copy(l9),J$.copy(k0.position),J$.add(mU[M0]),k0.up.copy(lU[M0]),k0.lookAt(J$),k0.updateMatrixWorld(),Z8.makeTranslation(-l9.x,-l9.y,-l9.z),NZ.multiplyMatrices(k0.projectionMatrix,k0.matrixWorldInverse),b._frustum.setFromProjectionMatrix(NZ,k0.coordinateSystem,k0.reversedDepth)}else b.updateMatrices(u);W=b.getFrustum(),V(P,R,b.camera,u,this.type)}if(b.isPointLightShadow!==!0&&this.type===q9)_(b,R);b.needsUpdate=!1}q=this.type,F.needsUpdate=!1,J.setRenderTarget(B,d,A)};function _(w,P){let R=Q.update(z);if(G.defines.VSM_SAMPLES!==w.blurSamples)G.defines.VSM_SAMPLES=w.blurSamples,D.defines.VSM_SAMPLES=w.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(w.mapPass===null)w.mapPass=new m8(Z.x,Z.y,{format:p6,type:N6});G.uniforms.shadow_pass.value=w.map.depthTexture,G.uniforms.resolution.value=w.mapSize,G.uniforms.radius.value=w.radius,J.setRenderTarget(w.mapPass),J.clear(),J.renderBufferDirect(P,null,R,G,z,null),D.uniforms.shadow_pass.value=w.mapPass.texture,D.uniforms.resolution.value=w.mapSize,D.uniforms.radius.value=w.radius,J.setRenderTarget(w.map),J.clear(),J.renderBufferDirect(P,null,R,D,z,null)}function C(w,P,R,B){let d=null,A=R.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(A!==void 0)d=A;else if(d=R.isPointLight===!0?X:Y,J.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let m=d.uuid,o=P.uuid,p=U[m];if(p===void 0)p={},U[m]=p;let n=p[o];if(n===void 0)n=d.clone(),p[o]=n,P.addEventListener("dispose",I);d=n}if(d.visible=P.visible,d.wireframe=P.wireframe,B===q9)d.side=P.shadowSide!==null?P.shadowSide:P.side;else d.side=P.shadowSide!==null?P.shadowSide:E[P.side];if(d.alphaMap=P.alphaMap,d.alphaTest=P.alphaToCoverage===!0?0.5:P.alphaTest,d.map=P.map,d.clipShadows=P.clipShadows,d.clippingPlanes=P.clippingPlanes,d.clipIntersection=P.clipIntersection,d.displacementMap=P.displacementMap,d.displacementScale=P.displacementScale,d.displacementBias=P.displacementBias,d.wireframeLinewidth=P.wireframeLinewidth,d.linewidth=P.linewidth,R.isPointLight===!0&&d.isMeshDistanceMaterial===!0){let m=J.properties.get(d);m.light=R}return d}function V(w,P,R,B,d){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)){if((w.castShadow||w.receiveShadow&&d===q9)&&(!w.frustumCulled||W.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,w.matrixWorld);let o=Q.update(w),p=w.material;if(Array.isArray(p)){let n=o.groups;for(let u=0,b=n.length;u<b;u++){let t=n[u],e=p[t.materialIndex];if(e&&e.visible){let H0=C(w,e,B,d);w.onBeforeShadow(J,w,P,R,o,H0,t),J.renderBufferDirect(R,null,o,H0,w,t),w.onAfterShadow(J,w,P,R,o,H0,t)}}}else if(p.visible){let n=C(w,p,B,d);w.onBeforeShadow(J,w,P,R,o,n,null),J.renderBufferDirect(R,null,o,n,w,null),w.onAfterShadow(J,w,P,R,o,n,null)}}}let m=w.children;for(let o=0,p=m.length;o<p;o++)V(m[o],P,R,B,d)}function I(w){w.target.removeEventListener("dispose",I);for(let R in U){let B=U[R],d=w.target.uuid;if(d in B)B[d].dispose(),delete B[d]}}}function uU(J,Q){function $(){let S=!1,$0=new H8,c=null,Z0=new H8(0,0,0,0);return{setMask:function(q0){if(c!==q0&&!S)J.colorMask(q0,q0,q0,q0),c=q0},setLocked:function(q0){S=q0},setClear:function(q0,a,K0,T0,Y8){if(Y8===!0)q0*=T0,a*=T0,K0*=T0;if($0.set(q0,a,K0,T0),Z0.equals($0)===!1)J.clearColor(q0,a,K0,T0),Z0.copy($0)},reset:function(){S=!1,c=null,Z0.set(-1,0,0,0)}}}function W(){let S=!1,$0=!1,c=null,Z0=null,q0=null;return{setReversed:function(a){if($0!==a){let K0=Q.get("EXT_clip_control");if(a)K0.clipControlEXT(K0.LOWER_LEFT_EXT,K0.ZERO_TO_ONE_EXT);else K0.clipControlEXT(K0.LOWER_LEFT_EXT,K0.NEGATIVE_ONE_TO_ONE_EXT);$0=a;let T0=q0;q0=null,this.setClear(T0)}},getReversed:function(){return $0},setTest:function(a){if(a)D0(J.DEPTH_TEST);else C0(J.DEPTH_TEST)},setMask:function(a){if(c!==a&&!S)J.depthMask(a),c=a},setFunc:function(a){if($0)a=gW[a];if(Z0!==a){switch(a){case UW:J.depthFunc(J.NEVER);break;case GW:J.depthFunc(J.ALWAYS);break;case NW:J.depthFunc(J.LESS);break;case _J:J.depthFunc(J.LEQUAL);break;case EW:J.depthFunc(J.EQUAL);break;case qW:J.depthFunc(J.GEQUAL);break;case FW:J.depthFunc(J.GREATER);break;case DW:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}Z0=a}},setLocked:function(a){S=a},setClear:function(a){if(q0!==a){if(q0=a,$0)a=1-a;J.clearDepth(a)}},reset:function(){S=!1,c=null,Z0=null,q0=null,$0=!1}}}function Z(){let S=!1,$0=null,c=null,Z0=null,q0=null,a=null,K0=null,T0=null,Y8=null;return{setTest:function(e0){if(!S)if(e0)D0(J.STENCIL_TEST);else C0(J.STENCIL_TEST)},setMask:function(e0){if($0!==e0&&!S)J.stencilMask(e0),$0=e0},setFunc:function(e0,i8,$6){if(c!==e0||Z0!==i8||q0!==$6)J.stencilFunc(e0,i8,$6),c=e0,Z0=i8,q0=$6},setOp:function(e0,i8,$6){if(a!==e0||K0!==i8||T0!==$6)J.stencilOp(e0,i8,$6),a=e0,K0=i8,T0=$6},setLocked:function(e0){S=e0},setClear:function(e0){if(Y8!==e0)J.clearStencil(e0),Y8=e0},reset:function(){S=!1,$0=null,c=null,Z0=null,q0=null,a=null,K0=null,T0=null,Y8=null}}}let K=new $,H=new W,Y=new Z,X=new WeakMap,U=new WeakMap,N={},E={},G={},D=new WeakMap,M=[],z=null,F=!1,q=null,_=null,C=null,V=null,I=null,w=null,P=null,R=new v0(0,0,0),B=0,d=!1,A=null,m=null,o=null,p=null,n=null,u=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),b=!1,t=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)t=parseFloat(/^WebGL (\d)/.exec(e)[1]),b=t>=1;else if(e.indexOf("OpenGL ES")!==-1)t=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),b=t>=2;let H0=null,M0={},k0=J.getParameter(J.SCISSOR_BOX),Z8=J.getParameter(J.VIEWPORT),i0=new H8().fromArray(k0),i=new H8().fromArray(Z8);function W0(S,$0,c,Z0){let q0=new Uint8Array(4),a=J.createTexture();J.bindTexture(S,a),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let K0=0;K0<c;K0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D($0,0,J.RGBA,1,1,Z0,0,J.RGBA,J.UNSIGNED_BYTE,q0);else J.texImage2D($0+K0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,q0);return a}let F0={};F0[J.TEXTURE_2D]=W0(J.TEXTURE_2D,J.TEXTURE_2D,1),F0[J.TEXTURE_CUBE_MAP]=W0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),F0[J.TEXTURE_2D_ARRAY]=W0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),F0[J.TEXTURE_3D]=W0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),D0(J.DEPTH_TEST),H.setFunc(_J),h8(!1),Q8(wJ),D0(J.CULL_FACE),b0(t8);function D0(S){if(N[S]!==!0)J.enable(S),N[S]=!0}function C0(S){if(N[S]!==!1)J.disable(S),N[S]=!1}function p0(S,$0){if(G[S]!==$0){if(J.bindFramebuffer(S,$0),G[S]=$0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=$0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=$0;return!0}return!1}function h0(S,$0){let c=M,Z0=!1;if(S){if(c=D.get($0),c===void 0)c=[],D.set($0,c);let q0=S.textures;if(c.length!==q0.length||c[0]!==J.COLOR_ATTACHMENT0){for(let a=0,K0=q0.length;a<K0;a++)c[a]=J.COLOR_ATTACHMENT0+a;c.length=q0.length,Z0=!0}}else if(c[0]!==J.BACK)c[0]=J.BACK,Z0=!0;if(Z0)J.drawBuffers(c)}function f0(S){if(z!==S)return J.useProgram(S),z=S,!0;return!1}let t0={[D9]:J.FUNC_ADD,[u$]:J.FUNC_SUBTRACT,[c$]:J.FUNC_REVERSE_SUBTRACT};t0[n$]=J.MIN,t0[s$]=J.MAX;let m0={[i$]:J.ZERO,[o$]:J.ONE,[a$]:J.SRC_COLOR,[t$]:J.SRC_ALPHA,[ZW]:J.SRC_ALPHA_SATURATE,[$W]:J.DST_COLOR,[JW]:J.DST_ALPHA,[r$]:J.ONE_MINUS_SRC_COLOR,[e$]:J.ONE_MINUS_SRC_ALPHA,[WW]:J.ONE_MINUS_DST_COLOR,[QW]:J.ONE_MINUS_DST_ALPHA,[KW]:J.CONSTANT_COLOR,[HW]:J.ONE_MINUS_CONSTANT_COLOR,[YW]:J.CONSTANT_ALPHA,[XW]:J.ONE_MINUS_CONSTANT_ALPHA};function b0(S,$0,c,Z0,q0,a,K0,T0,Y8,e0){if(S===t8){if(F===!0)C0(J.BLEND),F=!1;return}if(F===!1)D0(J.BLEND),F=!0;if(S!==d$){if(S!==q||e0!==d){if(_!==D9||I!==D9)J.blendEquation(J.FUNC_ADD),_=D9,I=D9;if(e0)switch(S){case y9:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case IJ:J.blendFunc(J.ONE,J.ONE);break;case AJ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case CJ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:_0("WebGLState: Invalid blending: ",S);break}else switch(S){case y9:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case IJ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case AJ:_0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case CJ:_0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:_0("WebGLState: Invalid blending: ",S);break}C=null,V=null,w=null,P=null,R.set(0,0,0),B=0,q=S,d=e0}return}if(q0=q0||$0,a=a||c,K0=K0||Z0,$0!==_||q0!==I)J.blendEquationSeparate(t0[$0],t0[q0]),_=$0,I=q0;if(c!==C||Z0!==V||a!==w||K0!==P)J.blendFuncSeparate(m0[c],m0[Z0],m0[a],m0[K0]),C=c,V=Z0,w=a,P=K0;if(T0.equals(R)===!1||Y8!==B)J.blendColor(T0.r,T0.g,T0.b,Y8),R.copy(T0),B=Y8;q=S,d=!1}function D8(S,$0){S.side===r8?C0(J.CULL_FACE):D0(J.CULL_FACE);let c=S.side===P8;if($0)c=!c;h8(c),S.blending===y9&&S.transparent===!1?b0(t8):b0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),K.setMask(S.colorWrite);let Z0=S.stencilWrite;if(Y.setTest(Z0),Z0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);O8(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?D0(J.SAMPLE_ALPHA_TO_COVERAGE):C0(J.SAMPLE_ALPHA_TO_COVERAGE)}function h8(S){if(A!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);A=S}}function Q8(S){if(S!==p$){if(D0(J.CULL_FACE),S!==m)if(S===wJ)J.cullFace(J.BACK);else if(S===m$)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else C0(J.CULL_FACE);m=S}function M8(S){if(S!==o){if(b)J.lineWidth(S);o=S}}function O8(S,$0,c){if(S){if(D0(J.POLYGON_OFFSET_FILL),p!==$0||n!==c){if(p=$0,n=c,H.getReversed())$0=-$0;J.polygonOffset($0,c)}}else C0(J.POLYGON_OFFSET_FILL)}function E8(S){if(S)D0(J.SCISSOR_TEST);else C0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+u-1;if(H0!==S)J.activeTexture(S),H0=S}function f8(S,$0,c){if(c===void 0)if(H0===null)c=J.TEXTURE0+u-1;else c=H0;let Z0=M0[c];if(Z0===void 0)Z0={type:void 0,texture:void 0},M0[c]=Z0;if(Z0.type!==S||Z0.texture!==$0){if(H0!==c)J.activeTexture(c),H0=c;J.bindTexture(S,$0||F0[S]),Z0.type=S,Z0.texture=$0}}function c0(){let S=M0[H0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function $8(){try{J.compressedTexImage2D(...arguments)}catch(S){_0("WebGLState:",S)}}function L(){try{J.compressedTexImage3D(...arguments)}catch(S){_0("WebGLState:",S)}}function O(){try{J.texSubImage2D(...arguments)}catch(S){_0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){_0("WebGLState:",S)}}function g(){try{J.compressedTexSubImage2D(...arguments)}catch(S){_0("WebGLState:",S)}}function r(){try{J.compressedTexSubImage3D(...arguments)}catch(S){_0("WebGLState:",S)}}function J0(){try{J.texStorage2D(...arguments)}catch(S){_0("WebGLState:",S)}}function Y0(){try{J.texStorage3D(...arguments)}catch(S){_0("WebGLState:",S)}}function l(){try{J.texImage2D(...arguments)}catch(S){_0("WebGLState:",S)}}function s(){try{J.texImage3D(...arguments)}catch(S){_0("WebGLState:",S)}}function E0(S){if(E[S]!==void 0)return E[S];else return J.getParameter(S)}function V0(S,$0){if(E[S]!==$0)J.pixelStorei(S,$0),E[S]=$0}function X0(S){if(i0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),i0.copy(S)}function Q0(S){if(i.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),i.copy(S)}function w0(S,$0){let c=U.get($0);if(c===void 0)c=new WeakMap,U.set($0,c);let Z0=c.get(S);if(Z0===void 0)Z0=J.getUniformBlockIndex($0,S.name),c.set(S,Z0)}function A0(S,$0){let Z0=U.get($0).get(S);if(X.get($0)!==Z0)J.uniformBlockBinding($0,Z0,S.__bindingPointIndex),X.set($0,Z0)}function d0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},E={},H0=null,M0={},G={},D=new WeakMap,M=[],z=null,F=!1,q=null,_=null,C=null,V=null,I=null,w=null,P=null,R=new v0(0,0,0),B=0,d=!1,A=null,m=null,o=null,p=null,n=null,i0.set(0,0,J.canvas.width,J.canvas.height),i.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:D0,disable:C0,bindFramebuffer:p0,drawBuffers:h0,useProgram:f0,setBlending:b0,setMaterial:D8,setFlipSided:h8,setCullFace:Q8,setLineWidth:M8,setPolygonOffset:O8,setScissorTest:E8,activeTexture:j,bindTexture:f8,unbindTexture:c0,compressedTexImage2D:$8,compressedTexImage3D:L,texImage2D:l,texImage3D:s,pixelStorei:V0,getParameter:E0,updateUBOMapping:w0,uniformBlockBinding:A0,texStorage2D:J0,texStorage3D:Y0,texSubImage2D:O,texSubImage3D:T,compressedTexSubImage2D:g,compressedTexSubImage3D:r,scissor:X0,viewport:Q0,reset:d0}}function cU(J,Q,$,W,Z,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new u0,N=new WeakMap,E=new Set,G,D=new WeakMap,M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(L){}function z(L,O){return M?new OffscreenCanvas(L,O):S9("canvas")}function F(L,O,T){let g=1,r=$8(L);if(r.width>T||r.height>T)g=T/Math.max(r.width,r.height);if(g<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let J0=Math.floor(g*r.width),Y0=Math.floor(g*r.height);if(G===void 0)G=z(J0,Y0);let l=O?z(J0,Y0):G;return l.width=J0,l.height=Y0,l.getContext("2d").drawImage(L,0,0,J0,Y0),I0("WebGLRenderer: Texture has been resized from ("+r.width+"x"+r.height+") to ("+J0+"x"+Y0+")."),l}else{if("data"in L)I0("WebGLRenderer: Image in DataTexture is too big ("+r.width+"x"+r.height+").");return L}return L}function q(L){return L.generateMipmaps}function _(L){J.generateMipmap(L)}function C(L){if(L.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(L.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function V(L,O,T,g,r,J0=!1){if(L!==null){if(J[L]!==void 0)return J[L];I0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Y0;if(g){if(Y0=Q.get("EXT_texture_norm16"),!Y0)I0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let l=O;if(O===J.RED){if(T===J.FLOAT)l=J.R32F;if(T===J.HALF_FLOAT)l=J.R16F;if(T===J.UNSIGNED_BYTE)l=J.R8;if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.R16_EXT;if(T===J.SHORT&&Y0)l=Y0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.R8UI;if(T===J.UNSIGNED_SHORT)l=J.R16UI;if(T===J.UNSIGNED_INT)l=J.R32UI;if(T===J.BYTE)l=J.R8I;if(T===J.SHORT)l=J.R16I;if(T===J.INT)l=J.R32I}if(O===J.RG){if(T===J.FLOAT)l=J.RG32F;if(T===J.HALF_FLOAT)l=J.RG16F;if(T===J.UNSIGNED_BYTE)l=J.RG8;if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.RG16_EXT;if(T===J.SHORT&&Y0)l=Y0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.RG8UI;if(T===J.UNSIGNED_SHORT)l=J.RG16UI;if(T===J.UNSIGNED_INT)l=J.RG32UI;if(T===J.BYTE)l=J.RG8I;if(T===J.SHORT)l=J.RG16I;if(T===J.INT)l=J.RG32I}if(O===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.RGB8UI;if(T===J.UNSIGNED_SHORT)l=J.RGB16UI;if(T===J.UNSIGNED_INT)l=J.RGB32UI;if(T===J.BYTE)l=J.RGB8I;if(T===J.SHORT)l=J.RGB16I;if(T===J.INT)l=J.RGB32I}if(O===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)l=J.RGBA16UI;if(T===J.UNSIGNED_INT)l=J.RGBA32UI;if(T===J.BYTE)l=J.RGBA8I;if(T===J.SHORT)l=J.RGBA16I;if(T===J.INT)l=J.RGBA32I}if(O===J.RGB){if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.RGB16_EXT;if(T===J.SHORT&&Y0)l=Y0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)l=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)l=J.R11F_G11F_B10F}if(O===J.RGBA){let s=J0?LQ:x0.getTransfer(r);if(T===J.FLOAT)l=J.RGBA32F;if(T===J.HALF_FLOAT)l=J.RGBA16F;if(T===J.UNSIGNED_BYTE)l=s===r0?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.RGBA16_EXT;if(T===J.SHORT&&Y0)l=Y0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)l=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)l=J.RGB5_A1}if(l===J.R16F||l===J.R32F||l===J.RG16F||l===J.RG32F||l===J.RGBA16F||l===J.RGBA32F)Q.get("EXT_color_buffer_float");return l}function I(L,O){let T;if(L){if(O===null||O===I6||O===R9)T=J.DEPTH24_STENCIL8;else if(O===G6)T=J.DEPTH32F_STENCIL8;else if(O===f9)T=J.DEPTH24_STENCIL8,I0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===I6||O===R9)T=J.DEPTH_COMPONENT24;else if(O===G6)T=J.DEPTH_COMPONENT32F;else if(O===f9)T=J.DEPTH_COMPONENT16;return T}function w(L,O){if(q(L)===!0||L.isFramebufferTexture&&L.minFilter!==w6&&L.minFilter!==T8)return Math.log2(Math.max(O.width,O.height))+1;else if(L.mipmaps!==void 0&&L.mipmaps.length>0)return L.mipmaps.length;else if(L.isCompressedTexture&&Array.isArray(L.image))return O.mipmaps.length;else return 1}function P(L){let O=L.target;if(O.removeEventListener("dispose",P),B(O),O.isVideoTexture)N.delete(O);if(O.isHTMLTexture)E.delete(O)}function R(L){let O=L.target;O.removeEventListener("dispose",R),A(O)}function B(L){let O=W.get(L);if(O.__webglInit===void 0)return;let T=L.source,g=D.get(T);if(g){let r=g[O.__cacheKey];if(r.usedTimes--,r.usedTimes===0)d(L);if(Object.keys(g).length===0)D.delete(T)}W.remove(L)}function d(L){let O=W.get(L);J.deleteTexture(O.__webglTexture);let T=L.source,g=D.get(T);delete g[O.__cacheKey],H.memory.textures--}function A(L){let O=W.get(L);if(L.depthTexture)L.depthTexture.dispose(),W.remove(L.depthTexture);if(L.isWebGLCubeRenderTarget)for(let g=0;g<6;g++){if(Array.isArray(O.__webglFramebuffer[g]))for(let r=0;r<O.__webglFramebuffer[g].length;r++)J.deleteFramebuffer(O.__webglFramebuffer[g][r]);else J.deleteFramebuffer(O.__webglFramebuffer[g]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[g])}else{if(Array.isArray(O.__webglFramebuffer))for(let g=0;g<O.__webglFramebuffer.length;g++)J.deleteFramebuffer(O.__webglFramebuffer[g]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let g=0;g<O.__webglColorRenderbuffer.length;g++)if(O.__webglColorRenderbuffer[g])J.deleteRenderbuffer(O.__webglColorRenderbuffer[g])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let T=L.textures;for(let g=0,r=T.length;g<r;g++){let J0=W.get(T[g]);if(J0.__webglTexture)J.deleteTexture(J0.__webglTexture),H.memory.textures--;W.remove(T[g])}W.remove(L)}let m=0;function o(){m=0}function p(){return m}function n(L){m=L}function u(){let L=m;if(L>=Z.maxTextures)I0("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+Z.maxTextures);return m+=1,L}function b(L){let O=[];return O.push(L.wrapS),O.push(L.wrapT),O.push(L.wrapR||0),O.push(L.magFilter),O.push(L.minFilter),O.push(L.anisotropy),O.push(L.internalFormat),O.push(L.format),O.push(L.type),O.push(L.generateMipmaps),O.push(L.premultiplyAlpha),O.push(L.flipY),O.push(L.unpackAlignment),O.push(L.colorSpace),O.join()}function t(L,O){let T=W.get(L);if(L.isVideoTexture)f8(L);if(L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&T.__version!==L.version){let g=L.image;if(g===null)I0("WebGLRenderer: Texture marked for update but no image data found.");else if(g.complete===!1)I0("WebGLRenderer: Texture marked for update but image is incomplete");else{C0(T,L,O);return}}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+O)}function e(L,O){let T=W.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){C0(T,L,O);return}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+O)}function H0(L,O){let T=W.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){C0(T,L,O);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+O)}function M0(L,O){let T=W.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&T.__version!==L.version){p0(T,L,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+O)}let k0={[MW]:J.REPEAT,[B7]:J.CLAMP_TO_EDGE,[LW]:J.MIRRORED_REPEAT},Z8={[w6]:J.NEAREST,[VW]:J.NEAREST_MIPMAP_NEAREST,[h9]:J.NEAREST_MIPMAP_LINEAR,[T8]:J.LINEAR,[z7]:J.LINEAR_MIPMAP_NEAREST,[b6]:J.LINEAR_MIPMAP_LINEAR},i0={[TW]:J.NEVER,[hW]:J.ALWAYS,[SW]:J.LESS,[S7]:J.LEQUAL,[jW]:J.EQUAL,[j7]:J.GEQUAL,[yW]:J.GREATER,[vW]:J.NOTEQUAL};function i(L,O){if(O.type===G6&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===T8||O.magFilter===z7||O.magFilter===h9||O.magFilter===b6||O.minFilter===T8||O.minFilter===z7||O.minFilter===h9||O.minFilter===b6))I0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(L,J.TEXTURE_WRAP_S,k0[O.wrapS]),J.texParameteri(L,J.TEXTURE_WRAP_T,k0[O.wrapT]),L===J.TEXTURE_3D||L===J.TEXTURE_2D_ARRAY)J.texParameteri(L,J.TEXTURE_WRAP_R,k0[O.wrapR]);if(J.texParameteri(L,J.TEXTURE_MAG_FILTER,Z8[O.magFilter]),J.texParameteri(L,J.TEXTURE_MIN_FILTER,Z8[O.minFilter]),O.compareFunction)J.texParameteri(L,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(L,J.TEXTURE_COMPARE_FUNC,i0[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===w6)return;if(O.minFilter!==h9&&O.minFilter!==b6)return;if(O.type===G6&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||W.get(O).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(L,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,Z.getMaxAnisotropy())),W.get(O).__currentAnisotropy=O.anisotropy}}}function W0(L,O){let T=!1;if(L.__webglInit===void 0)L.__webglInit=!0,O.addEventListener("dispose",P);let g=O.source,r=D.get(g);if(r===void 0)r={},D.set(g,r);let J0=b(O);if(J0!==L.__cacheKey){if(r[J0]===void 0)r[J0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;r[J0].usedTimes++;let Y0=r[L.__cacheKey];if(Y0!==void 0){if(r[L.__cacheKey].usedTimes--,Y0.usedTimes===0)d(O)}L.__cacheKey=J0,L.__webglTexture=r[J0].texture}return T}function F0(L,O,T){return Math.floor(Math.floor(L/T)/O)}function D0(L,O,T,g){let J0=L.updateRanges;if(J0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,T,g,O.data);else{J0.sort((V0,X0)=>V0.start-X0.start);let Y0=0;for(let V0=1;V0<J0.length;V0++){let X0=J0[Y0],Q0=J0[V0],w0=X0.start+X0.count,A0=F0(Q0.start,O.width,4),d0=F0(X0.start,O.width,4);if(Q0.start<=w0+1&&A0===d0&&F0(Q0.start+Q0.count-1,O.width,4)===A0)X0.count=Math.max(X0.count,Q0.start+Q0.count-X0.start);else++Y0,J0[Y0]=Q0}J0.length=Y0+1;let l=$.getParameter(J.UNPACK_ROW_LENGTH),s=$.getParameter(J.UNPACK_SKIP_PIXELS),E0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let V0=0,X0=J0.length;V0<X0;V0++){let Q0=J0[V0],w0=Math.floor(Q0.start/4),A0=Math.ceil(Q0.count/4),d0=w0%O.width,S=Math.floor(w0/O.width),$0=A0,c=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,d0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,d0,S,$0,1,T,g,O.data)}L.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,l),$.pixelStorei(J.UNPACK_SKIP_PIXELS,s),$.pixelStorei(J.UNPACK_SKIP_ROWS,E0)}}function C0(L,O,T){let g=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)g=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)g=J.TEXTURE_3D;let r=W0(L,O),J0=O.source;$.bindTexture(g,L.__webglTexture,J.TEXTURE0+T);let Y0=W.get(J0);if(J0.version!==Y0.__version||r===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let c=x0.getPrimaries(x0.workingColorSpace),Z0=O.colorSpace===m6?null:x0.getPrimaries(O.colorSpace),q0=O.colorSpace===m6||c===Z0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,q0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let s=F(O.image,!1,Z.maxTextureSize);s=c0(O,s);let E0=K.convert(O.format,O.colorSpace),V0=K.convert(O.type),X0=V(O.internalFormat,E0,V0,O.normalized,O.colorSpace,O.isVideoTexture);i(g,O);let Q0,w0=O.mipmaps,A0=O.isVideoTexture!==!0,d0=Y0.__version===void 0||r===!0,S=J0.dataReady,$0=w(O,s);if(O.isDepthTexture){if(X0=I(O.format===g6,O.type),d0)if(A0)$.texStorage2D(J.TEXTURE_2D,1,X0,s.width,s.height);else $.texImage2D(J.TEXTURE_2D,0,X0,s.width,s.height,0,E0,V0,null)}else if(O.isDataTexture)if(w0.length>0){if(A0&&d0)$.texStorage2D(J.TEXTURE_2D,$0,X0,w0[0].width,w0[0].height);for(let c=0,Z0=w0.length;c<Z0;c++)if(Q0=w0[c],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,E0,V0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,E0,V0,Q0.data);O.generateMipmaps=!1}else if(A0){if(d0)$.texStorage2D(J.TEXTURE_2D,$0,X0,s.width,s.height);if(S)D0(O,s,E0,V0)}else $.texImage2D(J.TEXTURE_2D,0,X0,s.width,s.height,0,E0,V0,s.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(A0&&d0)$.texStorage3D(J.TEXTURE_2D_ARRAY,$0,X0,w0[0].width,w0[0].height,s.depth);for(let c=0,Z0=w0.length;c<Z0;c++)if(Q0=w0[c],O.format!==e8)if(E0!==null)if(A0){if(S)if(O.layerUpdates.size>0){let q0=iQ(Q0.width,Q0.height,O.format,O.type);for(let a of O.layerUpdates){let K0=Q0.data.subarray(a*q0/Q0.data.BYTES_PER_ELEMENT,(a+1)*q0/Q0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,a,Q0.width,Q0.height,1,E0,K0)}O.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,0,Q0.width,Q0.height,s.depth,E0,Q0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,c,X0,Q0.width,Q0.height,s.depth,0,Q0.data,0,0);else I0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,0,Q0.width,Q0.height,s.depth,E0,V0,Q0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,c,X0,Q0.width,Q0.height,s.depth,0,E0,V0,Q0.data)}else{if(A0&&d0)$.texStorage2D(J.TEXTURE_2D,$0,X0,w0[0].width,w0[0].height);for(let c=0,Z0=w0.length;c<Z0;c++)if(Q0=w0[c],O.format!==e8)if(E0!==null)if(A0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,E0,Q0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,Q0.data);else I0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,E0,V0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,E0,V0,Q0.data)}else if(O.isDataArrayTexture)if(A0){if(d0)$.texStorage3D(J.TEXTURE_2D_ARRAY,$0,X0,s.width,s.height,s.depth);if(S)if(O.layerUpdates.size>0){let c=iQ(s.width,s.height,O.format,O.type);for(let Z0 of O.layerUpdates){let q0=s.data.subarray(Z0*c/s.data.BYTES_PER_ELEMENT,(Z0+1)*c/s.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,Z0,s.width,s.height,1,E0,V0,q0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,s.width,s.height,s.depth,E0,V0,s.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,X0,s.width,s.height,s.depth,0,E0,V0,s.data);else if(O.isData3DTexture)if(A0){if(d0)$.texStorage3D(J.TEXTURE_3D,$0,X0,s.width,s.height,s.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,s.width,s.height,s.depth,E0,V0,s.data)}else $.texImage3D(J.TEXTURE_3D,0,X0,s.width,s.height,s.depth,0,E0,V0,s.data);else if(O.isFramebufferTexture){if(d0)if(A0)$.texStorage2D(J.TEXTURE_2D,$0,X0,s.width,s.height);else{let{width:c,height:Z0}=s;for(let q0=0;q0<$0;q0++)$.texImage2D(J.TEXTURE_2D,q0,X0,c,Z0,0,E0,V0,null),c>>=1,Z0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let c=J.canvas;if(!c.hasAttribute("layoutsubtree"))c.setAttribute("layoutsubtree","true");if(s.parentNode!==c){c.appendChild(s),E.add(O),c.onpaint=(Z0)=>{let q0=Z0.changedElements;for(let a of E)if(q0.includes(a.image))a.needsUpdate=!0},c.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,s);else{let{RGBA:q0,RGBA:a,UNSIGNED_BYTE:K0}=J;J.texElementImage2D(J.TEXTURE_2D,0,q0,a,K0,s)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(w0.length>0){if(A0&&d0){let c=$8(w0[0]);$.texStorage2D(J.TEXTURE_2D,$0,X0,c.width,c.height)}for(let c=0,Z0=w0.length;c<Z0;c++)if(Q0=w0[c],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,E0,V0,Q0)}else $.texImage2D(J.TEXTURE_2D,c,X0,E0,V0,Q0);O.generateMipmaps=!1}else if(A0){if(d0){let c=$8(s);$.texStorage2D(J.TEXTURE_2D,$0,X0,c.width,c.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,E0,V0,s)}else $.texImage2D(J.TEXTURE_2D,0,X0,E0,V0,s);if(q(O))_(g);if(Y0.__version=J0.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function p0(L,O,T){if(O.image.length!==6)return;let g=W0(L,O),r=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,L.__webglTexture,J.TEXTURE0+T);let J0=W.get(r);if(r.version!==J0.__version||g===!0){$.activeTexture(J.TEXTURE0+T);let Y0=x0.getPrimaries(x0.workingColorSpace),l=O.colorSpace===m6?null:x0.getPrimaries(O.colorSpace),s=O.colorSpace===m6||Y0===l?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let E0=O.isCompressedTexture||O.image[0].isCompressedTexture,V0=O.image[0]&&O.image[0].isDataTexture,X0=[];for(let a=0;a<6;a++){if(!E0&&!V0)X0[a]=F(O.image[a],!0,Z.maxCubemapSize);else X0[a]=V0?O.image[a].image:O.image[a];X0[a]=c0(O,X0[a])}let Q0=X0[0],w0=K.convert(O.format,O.colorSpace),A0=K.convert(O.type),d0=V(O.internalFormat,w0,A0,O.normalized,O.colorSpace),S=O.isVideoTexture!==!0,$0=J0.__version===void 0||g===!0,c=r.dataReady,Z0=w(O,Q0);i(J.TEXTURE_CUBE_MAP,O);let q0;if(E0){if(S&&$0)$.texStorage2D(J.TEXTURE_CUBE_MAP,Z0,d0,Q0.width,Q0.height);for(let a=0;a<6;a++){q0=X0[a].mipmaps;for(let K0=0;K0<q0.length;K0++){let T0=q0[K0];if(O.format!==e8)if(w0!==null)if(S){if(c)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,0,0,T0.width,T0.height,w0,T0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,d0,T0.width,T0.height,0,T0.data);else I0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,0,0,T0.width,T0.height,w0,A0,T0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,d0,T0.width,T0.height,0,w0,A0,T0.data)}}}else{if(q0=O.mipmaps,S&&$0){if(q0.length>0)Z0++;let a=$8(X0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,Z0,d0,a.width,a.height)}for(let a=0;a<6;a++)if(V0){if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,0,0,X0[a].width,X0[a].height,w0,A0,X0[a].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,d0,X0[a].width,X0[a].height,0,w0,A0,X0[a].data);for(let K0=0;K0<q0.length;K0++){let Y8=q0[K0].image[a].image;if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,0,0,Y8.width,Y8.height,w0,A0,Y8.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,d0,Y8.width,Y8.height,0,w0,A0,Y8.data)}}else{if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,0,0,w0,A0,X0[a])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,d0,w0,A0,X0[a]);for(let K0=0;K0<q0.length;K0++){let T0=q0[K0];if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,0,0,w0,A0,T0.image[a])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,d0,w0,A0,T0.image[a])}}}if(q(O))_(J.TEXTURE_CUBE_MAP);if(J0.__version=r.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function h0(L,O,T,g,r,J0){let Y0=K.convert(T.format,T.colorSpace),l=K.convert(T.type),s=V(T.internalFormat,Y0,l,T.normalized,T.colorSpace),E0=W.get(O),V0=W.get(T);if(V0.__renderTarget=O,!E0.__hasExternalTextures){let X0=Math.max(1,O.width>>J0),Q0=Math.max(1,O.height>>J0);if(r===J.TEXTURE_3D||r===J.TEXTURE_2D_ARRAY)$.texImage3D(r,J0,s,X0,Q0,O.depth,0,Y0,l,null);else $.texImage2D(r,J0,s,X0,Q0,0,Y0,l,null)}if($.bindFramebuffer(J.FRAMEBUFFER,L),j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,g,r,V0.__webglTexture,0,E8(O));else if(r===J.TEXTURE_2D||r>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&r<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,g,r,V0.__webglTexture,J0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function f0(L,O,T){if(J.bindRenderbuffer(J.RENDERBUFFER,L),O.depthBuffer){let g=O.depthTexture,r=g&&g.isDepthTexture?g.type:null,J0=I(O.stencilBuffer,r),Y0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(O),J0,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(O),J0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,J0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,Y0,J.RENDERBUFFER,L)}else{let g=O.textures;for(let r=0;r<g.length;r++){let J0=g[r],Y0=K.convert(J0.format,J0.colorSpace),l=K.convert(J0.type),s=V(J0.internalFormat,Y0,l,J0.normalized,J0.colorSpace);if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(O),s,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(O),s,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,s,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function t0(L,O,T){let g=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,L),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let r=W.get(O.depthTexture);if(r.__renderTarget=O,!r.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(g){if(r.__webglInit===void 0)r.__webglInit=!0,O.depthTexture.addEventListener("dispose",P);if(r.__webglTexture===void 0){r.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,r.__webglTexture),i(J.TEXTURE_CUBE_MAP,O.depthTexture);let E0=K.convert(O.depthTexture.format),V0=K.convert(O.depthTexture.type),X0;if(O.depthTexture.format===x6)X0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===g6)X0=J.DEPTH24_STENCIL8;for(let Q0=0;Q0<6;Q0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,X0,O.width,O.height,0,E0,V0,null)}}else t(O.depthTexture,0);let J0=r.__webglTexture,Y0=E8(O),l=g?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,s=O.depthTexture.format===g6?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===x6)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,s,l,J0,0,Y0);else J.framebufferTexture2D(J.FRAMEBUFFER,s,l,J0,0);else if(O.depthTexture.format===g6)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,s,l,J0,0,Y0);else J.framebufferTexture2D(J.FRAMEBUFFER,s,l,J0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function m0(L){let O=W.get(L),T=L.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==L.depthTexture){let g=L.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(g){let r=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,g.removeEventListener("dispose",r)};g.addEventListener("dispose",r),O.__depthDisposeCallback=r}O.__boundDepthTexture=g}if(L.depthTexture&&!O.__autoAllocateDepthBuffer)if(T)for(let g=0;g<6;g++)t0(O.__webglFramebuffer[g],L,g);else{let g=L.texture.mipmaps;if(g&&g.length>0)t0(O.__webglFramebuffer[0],L,0);else t0(O.__webglFramebuffer,L,0)}else if(T){O.__webglDepthbuffer=[];for(let g=0;g<6;g++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[g]),O.__webglDepthbuffer[g]===void 0)O.__webglDepthbuffer[g]=J.createRenderbuffer(),f0(O.__webglDepthbuffer[g],L,!1);else{let r=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=O.__webglDepthbuffer[g];J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,J0)}}else{let g=L.texture.mipmaps;if(g&&g.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),f0(O.__webglDepthbuffer,L,!1);else{let r=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,J0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function b0(L,O,T){let g=W.get(L);if(O!==void 0)h0(g.__webglFramebuffer,L,L.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)m0(L)}function D8(L){let O=L.texture,T=W.get(L),g=W.get(O);L.addEventListener("dispose",R);let r=L.textures,J0=L.isWebGLCubeRenderTarget===!0,Y0=r.length>1;if(!Y0){if(g.__webglTexture===void 0)g.__webglTexture=J.createTexture();g.__version=O.version,H.memory.textures++}if(J0){T.__webglFramebuffer=[];for(let l=0;l<6;l++)if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer[l]=[];for(let s=0;s<O.mipmaps.length;s++)T.__webglFramebuffer[l][s]=J.createFramebuffer()}else T.__webglFramebuffer[l]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer=[];for(let l=0;l<O.mipmaps.length;l++)T.__webglFramebuffer[l]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(Y0)for(let l=0,s=r.length;l<s;l++){let E0=W.get(r[l]);if(E0.__webglTexture===void 0)E0.__webglTexture=J.createTexture(),H.memory.textures++}if(L.samples>0&&j(L)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let l=0;l<r.length;l++){let s=r[l];T.__webglColorRenderbuffer[l]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[l]);let E0=K.convert(s.format,s.colorSpace),V0=K.convert(s.type),X0=V(s.internalFormat,E0,V0,s.normalized,s.colorSpace,L.isXRRenderTarget===!0),Q0=E8(L);J.renderbufferStorageMultisample(J.RENDERBUFFER,Q0,X0,L.width,L.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+l,J.RENDERBUFFER,T.__webglColorRenderbuffer[l])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),L.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),f0(T.__webglDepthRenderbuffer,L,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(J0){$.bindTexture(J.TEXTURE_CUBE_MAP,g.__webglTexture),i(J.TEXTURE_CUBE_MAP,O);for(let l=0;l<6;l++)if(O.mipmaps&&O.mipmaps.length>0)for(let s=0;s<O.mipmaps.length;s++)h0(T.__webglFramebuffer[l][s],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+l,s);else h0(T.__webglFramebuffer[l],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+l,0);if(q(O))_(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(Y0){for(let l=0,s=r.length;l<s;l++){let E0=r[l],V0=W.get(E0),X0=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)X0=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(X0,V0.__webglTexture),i(X0,E0),h0(T.__webglFramebuffer,L,E0,J.COLOR_ATTACHMENT0+l,X0,0),q(E0))_(X0)}$.unbindTexture()}else{let l=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)l=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(l,g.__webglTexture),i(l,O),O.mipmaps&&O.mipmaps.length>0)for(let s=0;s<O.mipmaps.length;s++)h0(T.__webglFramebuffer[s],L,O,J.COLOR_ATTACHMENT0,l,s);else h0(T.__webglFramebuffer,L,O,J.COLOR_ATTACHMENT0,l,0);if(q(O))_(l);$.unbindTexture()}if(L.depthBuffer)m0(L)}function h8(L){let O=L.textures;for(let T=0,g=O.length;T<g;T++){let r=O[T];if(q(r)){let J0=C(L),Y0=W.get(r).__webglTexture;$.bindTexture(J0,Y0),_(J0),$.unbindTexture()}}}let Q8=[],M8=[];function O8(L){if(L.samples>0){if(j(L)===!1){let{textures:O,width:T,height:g}=L,r=J.COLOR_BUFFER_BIT,J0=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,Y0=W.get(L),l=O.length>1;if(l)for(let E0=0;E0<O.length;E0++)$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,Y0.__webglMultisampledFramebuffer);let s=L.texture.mipmaps;if(s&&s.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglFramebuffer);for(let E0=0;E0<O.length;E0++){if(L.resolveDepthBuffer){if(L.depthBuffer)r|=J.DEPTH_BUFFER_BIT;if(L.stencilBuffer&&L.resolveStencilBuffer)r|=J.STENCIL_BUFFER_BIT}if(l){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,Y0.__webglColorRenderbuffer[E0]);let V0=W.get(O[E0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,V0,0)}if(J.blitFramebuffer(0,0,T,g,0,0,T,g,r,J.NEAREST),X===!0){if(Q8.length=0,M8.length=0,Q8.push(J.COLOR_ATTACHMENT0+E0),L.depthBuffer&&L.resolveDepthBuffer===!1)Q8.push(J0),M8.push(J0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,M8);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,Q8)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),l)for(let E0=0;E0<O.length;E0++){$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.RENDERBUFFER,Y0.__webglColorRenderbuffer[E0]);let V0=W.get(O[E0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.TEXTURE_2D,V0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&X){let O=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function E8(L){return Math.min(Z.maxSamples,L.samples)}function j(L){let O=W.get(L);return L.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function f8(L){let O=H.render.frame;if(N.get(L)!==O)N.set(L,O),L.update()}function c0(L,O){let{colorSpace:T,format:g,type:r}=L;if(L.isCompressedTexture===!0||L.isVideoTexture===!0)return O;if(T!==MQ&&T!==m6)if(x0.getTransfer(T)===r0){if(g!==e8||r!==s8)I0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else _0("WebGLTextures: Unsupported texture color space:",T);return O}function $8(L){if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement)U.width=L.naturalWidth||L.width,U.height=L.naturalHeight||L.height;else if(typeof VideoFrame<"u"&&L instanceof VideoFrame)U.width=L.displayWidth,U.height=L.displayHeight;else U.width=L.width,U.height=L.height;return U}this.allocateTextureUnit=u,this.resetTextureUnits=o,this.getTextureUnits=p,this.setTextureUnits=n,this.setTexture2D=t,this.setTexture2DArray=e,this.setTexture3D=H0,this.setTextureCube=M0,this.rebindTextures=b0,this.setupRenderTarget=D8,this.updateRenderTargetMipmap=h8,this.updateMultisampleRenderTarget=O8,this.setupDepthRenderbuffer=m0,this.setupFrameBufferTexture=h0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function nU(J,Q){function $(W,Z=m6){let K,H=x0.getTransfer(Z);if(W===s8)return J.UNSIGNED_BYTE;if(W===bJ)return J.UNSIGNED_SHORT_4_4_4_4;if(W===xJ)return J.UNSIGNED_SHORT_5_5_5_1;if(W===wW)return J.UNSIGNED_INT_5_9_9_9_REV;if(W===IW)return J.UNSIGNED_INT_10F_11F_11F_REV;if(W===BW)return J.BYTE;if(W===zW)return J.SHORT;if(W===f9)return J.UNSIGNED_SHORT;if(W===fJ)return J.INT;if(W===I6)return J.UNSIGNED_INT;if(W===G6)return J.FLOAT;if(W===N6)return J.HALF_FLOAT;if(W===AW)return J.ALPHA;if(W===CW)return J.RGB;if(W===e8)return J.RGBA;if(W===x6)return J.DEPTH_COMPONENT;if(W===g6)return J.DEPTH_STENCIL;if(W===_W)return J.RED;if(W===gJ)return J.RED_INTEGER;if(W===p6)return J.RG;if(W===pJ)return J.RG_INTEGER;if(W===mJ)return J.RGBA_INTEGER;if(W===w7||W===I7||W===A7||W===C7)if(H===r0)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(W===w7)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===I7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===A7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===C7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(W===w7)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===I7)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===A7)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===C7)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===lJ||W===dJ||W===uJ||W===cJ)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(W===lJ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===dJ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===uJ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===cJ)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===nJ||W===sJ||W===iJ||W===oJ||W===aJ||W===_7||W===rJ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(W===nJ||W===sJ)return H===r0?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(W===iJ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(W===oJ)return K.COMPRESSED_R11_EAC;if(W===aJ)return K.COMPRESSED_SIGNED_R11_EAC;if(W===_7)return K.COMPRESSED_RG11_EAC;if(W===rJ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(W===tJ||W===eJ||W===JQ||W===QQ||W===$Q||W===WQ||W===ZQ||W===KQ||W===HQ||W===YQ||W===XQ||W===UQ||W===GQ||W===NQ)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(W===tJ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===eJ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===JQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===QQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===$Q)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===WQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===ZQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===KQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===HQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===YQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===XQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===UQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===GQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===NQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===EQ||W===qQ||W===FQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(W===EQ)return H===r0?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===qQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===FQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===DQ||W===OQ||W===P7||W===RQ)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(W===DQ)return K.COMPRESSED_RED_RGTC1_EXT;if(W===OQ)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===P7)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===RQ)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===R9)return J.UNSIGNED_INT_24_8;return J[W]!==void 0?J[W]:null}return{convert:$}}var sU=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iU=`
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

}`;class zZ{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new u7(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new C8({vertexShader:sU,fragmentShader:iU,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new A8(new _6(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class wZ extends E6{constructor(J,Q){super();let $=this,W=null,Z=1,K=null,H="local-floor",Y=1,X=null,U=null,N=null,E=null,G=null,D=null,M=typeof XRWebGLBinding<"u",z=new zZ,F={},q=Q.getContextAttributes(),_=null,C=null,V=[],I=[],w=new u0,P=null,R=new v8;R.viewport=new H8;let B=new v8;B.viewport=new H8;let d=[R,B],A=new uQ,m=null,o=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let W0=V[i];if(W0===void 0)W0=new g9,V[i]=W0;return W0.getTargetRaySpace()},this.getControllerGrip=function(i){let W0=V[i];if(W0===void 0)W0=new g9,V[i]=W0;return W0.getGripSpace()},this.getHand=function(i){let W0=V[i];if(W0===void 0)W0=new g9,V[i]=W0;return W0.getHandSpace()};function p(i){let W0=I.indexOf(i.inputSource);if(W0===-1)return;let F0=V[W0];if(F0!==void 0)F0.update(i.inputSource,i.frame,X||K),F0.dispatchEvent({type:i.type,data:i.inputSource})}function n(){W.removeEventListener("select",p),W.removeEventListener("selectstart",p),W.removeEventListener("selectend",p),W.removeEventListener("squeeze",p),W.removeEventListener("squeezestart",p),W.removeEventListener("squeezeend",p),W.removeEventListener("end",n),W.removeEventListener("inputsourceschange",u);for(let i=0;i<V.length;i++){let W0=I[i];if(W0===null)continue;I[i]=null,V[i].disconnect(W0)}m=null,o=null,z.reset();for(let i in F)delete F[i];J.setRenderTarget(_),G=null,E=null,N=null,W=null,C=null,i0.stop(),$.isPresenting=!1,J.setPixelRatio(P),J.setSize(w.width,w.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(Z=i,$.isPresenting===!0)I0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if(H=i,$.isPresenting===!0)I0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(i){X=i},this.getBaseLayer=function(){return E!==null?E:G},this.getBinding=function(){if(N===null&&M)N=new XRWebGLBinding(W,Q);return N},this.getFrame=function(){return D},this.getSession=function(){return W},this.setSession=async function(i){if(W=i,W!==null){if(_=J.getRenderTarget(),W.addEventListener("select",p),W.addEventListener("selectstart",p),W.addEventListener("selectend",p),W.addEventListener("squeeze",p),W.addEventListener("squeezestart",p),W.addEventListener("squeezeend",p),W.addEventListener("end",n),W.addEventListener("inputsourceschange",u),q.xrCompatible!==!0)await Q.makeXRCompatible();if(P=J.getPixelRatio(),J.getSize(w),!(M&&("createProjectionLayer"in XRWebGLBinding.prototype))){let F0={antialias:q.antialias,alpha:!0,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:Z};G=new XRWebGLLayer(W,Q,F0),W.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),C=new m8(G.framebufferWidth,G.framebufferHeight,{format:e8,type:s8,colorSpace:J.outputColorSpace,stencilBuffer:q.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}else{let F0=null,D0=null,C0=null;if(q.depth)C0=q.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,F0=q.stencil?g6:x6,D0=q.stencil?R9:I6;let p0={colorFormat:Q.RGBA8,depthFormat:C0,scaleFactor:Z};N=this.getBinding(),E=N.createProjectionLayer(p0),W.updateRenderState({layers:[E]}),J.setPixelRatio(1),J.setSize(E.textureWidth,E.textureHeight,!1),C=new m8(E.textureWidth,E.textureHeight,{format:e8,type:s8,depthTexture:new C6(E.textureWidth,E.textureHeight,D0,void 0,void 0,void 0,void 0,void 0,void 0,F0),stencilBuffer:q.stencil,colorSpace:J.outputColorSpace,samples:q.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}C.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await W.requestReferenceSpace(H),i0.setContext(W),i0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(W!==null)return W.environmentBlendMode},this.getDepthTexture=function(){return z.getDepthTexture()};function u(i){for(let W0=0;W0<i.removed.length;W0++){let F0=i.removed[W0],D0=I.indexOf(F0);if(D0>=0)I[D0]=null,V[D0].disconnect(F0)}for(let W0=0;W0<i.added.length;W0++){let F0=i.added[W0],D0=I.indexOf(F0);if(D0===-1){for(let p0=0;p0<V.length;p0++)if(p0>=I.length){I.push(F0),D0=p0;break}else if(I[p0]===null){I[p0]=F0,D0=p0;break}if(D0===-1)break}let C0=V[D0];if(C0)C0.connect(F0)}}let b=new v,t=new v;function e(i,W0,F0){b.setFromMatrixPosition(W0.matrixWorld),t.setFromMatrixPosition(F0.matrixWorld);let D0=b.distanceTo(t),C0=W0.projectionMatrix.elements,p0=F0.projectionMatrix.elements,h0=C0[14]/(C0[10]-1),f0=C0[14]/(C0[10]+1),t0=(C0[9]+1)/C0[5],m0=(C0[9]-1)/C0[5],b0=(C0[8]-1)/C0[0],D8=(p0[8]+1)/p0[0],h8=h0*b0,Q8=h0*D8,M8=D0/(-b0+D8),O8=M8*-b0;if(W0.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(O8),i.translateZ(M8),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),C0[10]===-1)i.projectionMatrix.copy(W0.projectionMatrix),i.projectionMatrixInverse.copy(W0.projectionMatrixInverse);else{let E8=h0+M8,j=f0+M8,f8=h8-O8,c0=Q8+(D0-O8),$8=t0*f0/j*E8,L=m0*f0/j*E8;i.projectionMatrix.makePerspective(f8,c0,$8,L,E8,j),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function H0(i,W0){if(W0===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices(W0.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(W===null)return;let{near:W0,far:F0}=i;if(z.texture!==null){if(z.depthNear>0)W0=z.depthNear;if(z.depthFar>0)F0=z.depthFar}if(A.near=B.near=R.near=W0,A.far=B.far=R.far=F0,m!==A.near||o!==A.far)W.updateRenderState({depthNear:A.near,depthFar:A.far}),m=A.near,o=A.far;A.layers.mask=i.layers.mask|6,R.layers.mask=A.layers.mask&-5,B.layers.mask=A.layers.mask&-3;let D0=i.parent,C0=A.cameras;H0(A,D0);for(let p0=0;p0<C0.length;p0++)H0(C0[p0],D0);if(C0.length===2)e(A,R,B);else A.projectionMatrix.copy(R.projectionMatrix);M0(i,A,D0)};function M0(i,W0,F0){if(F0===null)i.matrix.copy(W0.matrixWorld);else i.matrix.copy(F0.matrixWorld),i.matrix.invert(),i.matrix.multiply(W0.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy(W0.projectionMatrix),i.projectionMatrixInverse.copy(W0.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=R7*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return A},this.getFoveation=function(){if(E===null&&G===null)return;return Y},this.setFoveation=function(i){if(Y=i,E!==null)E.fixedFoveation=i;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=i},this.hasDepthSensing=function(){return z.texture!==null},this.getDepthSensingMesh=function(){return z.getMesh(A)},this.getCameraTexture=function(i){return F[i]};let k0=null;function Z8(i,W0){if(U=W0.getViewerPose(X||K),D=W0,U!==null){let F0=U.views;if(G!==null)J.setRenderTargetFramebuffer(C,G.framebuffer),J.setRenderTarget(C);let D0=!1;if(F0.length!==A.cameras.length)A.cameras.length=0,D0=!0;for(let f0=0;f0<F0.length;f0++){let t0=F0[f0],m0=null;if(G!==null)m0=G.getViewport(t0);else{let D8=N.getViewSubImage(E,t0);if(m0=D8.viewport,f0===0)J.setRenderTargetTextures(C,D8.colorTexture,D8.depthStencilTexture),J.setRenderTarget(C)}let b0=d[f0];if(b0===void 0)b0=new v8,b0.layers.enable(f0),b0.viewport=new H8,d[f0]=b0;if(b0.matrix.fromArray(t0.transform.matrix),b0.matrix.decompose(b0.position,b0.quaternion,b0.scale),b0.projectionMatrix.fromArray(t0.projectionMatrix),b0.projectionMatrixInverse.copy(b0.projectionMatrix).invert(),b0.viewport.set(m0.x,m0.y,m0.width,m0.height),f0===0)A.matrix.copy(b0.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale);if(D0===!0)A.cameras.push(b0)}let C0=W.enabledFeatures;if(C0&&C0.includes("depth-sensing")&&W.depthUsage=="gpu-optimized"&&M){N=$.getBinding();let f0=N.getDepthInformation(F0[0]);if(f0&&f0.isValid&&f0.texture)z.init(f0,W.renderState)}if(C0&&C0.includes("camera-access")&&M){J.state.unbindTexture(),N=$.getBinding();for(let f0=0;f0<F0.length;f0++){let t0=F0[f0].camera;if(t0){let m0=F[t0];if(!m0)m0=new u7,F[t0]=m0;let b0=N.getCameraImage(t0);m0.sourceTexture=b0}}}}for(let F0=0;F0<V.length;F0++){let D0=I[F0],C0=V[F0];if(D0!==null&&C0!==void 0)C0.update(D0,W0,X||K)}if(k0)k0(i,W0);if(W0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:W0});D=null}let i0=new EZ;i0.setAnimationLoop(Z8),this.setAnimationLoop=function(i){k0=i},this.dispose=function(){}}}var oU=new W8,IZ=new P0;IZ.set(-1,0,0,0,1,0,0,0,1);function aU(J,Q){function $(F,q){if(F.matrixAutoUpdate===!0)F.updateMatrix();q.value.copy(F.matrix)}function W(F,q){if(q.color.getRGB(F.fogColor.value,PQ(J)),q.isFog)F.fogNear.value=q.near,F.fogFar.value=q.far;else if(q.isFogExp2)F.fogDensity.value=q.density}function Z(F,q,_,C,V){if(q.isNodeMaterial)q.uniformsNeedUpdate=!1;else if(q.isMeshBasicMaterial)K(F,q);else if(q.isMeshLambertMaterial){if(K(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshToonMaterial)K(F,q),E(F,q);else if(q.isMeshPhongMaterial){if(K(F,q),N(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshStandardMaterial){if(K(F,q),G(F,q),q.isMeshPhysicalMaterial)D(F,q,V)}else if(q.isMeshMatcapMaterial)K(F,q),M(F,q);else if(q.isMeshDepthMaterial)K(F,q);else if(q.isMeshDistanceMaterial)K(F,q),z(F,q);else if(q.isMeshNormalMaterial)K(F,q);else if(q.isLineBasicMaterial){if(H(F,q),q.isLineDashedMaterial)Y(F,q)}else if(q.isPointsMaterial)X(F,q,_,C);else if(q.isSpriteMaterial)U(F,q);else if(q.isShadowMaterial)F.color.value.copy(q.color),F.opacity.value=q.opacity;else if(q.isShaderMaterial)q.uniformsNeedUpdate=!1}function K(F,q){if(F.opacity.value=q.opacity,q.color)F.diffuse.value.copy(q.color);if(q.emissive)F.emissive.value.copy(q.emissive).multiplyScalar(q.emissiveIntensity);if(q.map)F.map.value=q.map,$(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.bumpMap){if(F.bumpMap.value=q.bumpMap,$(q.bumpMap,F.bumpMapTransform),F.bumpScale.value=q.bumpScale,q.side===P8)F.bumpScale.value*=-1}if(q.normalMap){if(F.normalMap.value=q.normalMap,$(q.normalMap,F.normalMapTransform),F.normalScale.value.copy(q.normalScale),q.side===P8)F.normalScale.value.negate()}if(q.displacementMap)F.displacementMap.value=q.displacementMap,$(q.displacementMap,F.displacementMapTransform),F.displacementScale.value=q.displacementScale,F.displacementBias.value=q.displacementBias;if(q.emissiveMap)F.emissiveMap.value=q.emissiveMap,$(q.emissiveMap,F.emissiveMapTransform);if(q.specularMap)F.specularMap.value=q.specularMap,$(q.specularMap,F.specularMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest;let _=Q.get(q),C=_.envMap,V=_.envMapRotation;if(C){if(F.envMap.value=C,F.envMapRotation.value.setFromMatrix4(oU.makeRotationFromEuler(V)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1)F.envMapRotation.value.premultiply(IZ);F.reflectivity.value=q.reflectivity,F.ior.value=q.ior,F.refractionRatio.value=q.refractionRatio}if(q.lightMap)F.lightMap.value=q.lightMap,F.lightMapIntensity.value=q.lightMapIntensity,$(q.lightMap,F.lightMapTransform);if(q.aoMap)F.aoMap.value=q.aoMap,F.aoMapIntensity.value=q.aoMapIntensity,$(q.aoMap,F.aoMapTransform)}function H(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,q.map)F.map.value=q.map,$(q.map,F.mapTransform)}function Y(F,q){F.dashSize.value=q.dashSize,F.totalSize.value=q.dashSize+q.gapSize,F.scale.value=q.scale}function X(F,q,_,C){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.size.value=q.size*_,F.scale.value=C*0.5,q.map)F.map.value=q.map,$(q.map,F.uvTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function U(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.rotation.value=q.rotation,q.map)F.map.value=q.map,$(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function N(F,q){F.specular.value.copy(q.specular),F.shininess.value=Math.max(q.shininess,0.0001)}function E(F,q){if(q.gradientMap)F.gradientMap.value=q.gradientMap}function G(F,q){if(F.metalness.value=q.metalness,q.metalnessMap)F.metalnessMap.value=q.metalnessMap,$(q.metalnessMap,F.metalnessMapTransform);if(F.roughness.value=q.roughness,q.roughnessMap)F.roughnessMap.value=q.roughnessMap,$(q.roughnessMap,F.roughnessMapTransform);if(q.envMap)F.envMapIntensity.value=q.envMapIntensity}function D(F,q,_){if(F.ior.value=q.ior,q.sheen>0){if(F.sheenColor.value.copy(q.sheenColor).multiplyScalar(q.sheen),F.sheenRoughness.value=q.sheenRoughness,q.sheenColorMap)F.sheenColorMap.value=q.sheenColorMap,$(q.sheenColorMap,F.sheenColorMapTransform);if(q.sheenRoughnessMap)F.sheenRoughnessMap.value=q.sheenRoughnessMap,$(q.sheenRoughnessMap,F.sheenRoughnessMapTransform)}if(q.clearcoat>0){if(F.clearcoat.value=q.clearcoat,F.clearcoatRoughness.value=q.clearcoatRoughness,q.clearcoatMap)F.clearcoatMap.value=q.clearcoatMap,$(q.clearcoatMap,F.clearcoatMapTransform);if(q.clearcoatRoughnessMap)F.clearcoatRoughnessMap.value=q.clearcoatRoughnessMap,$(q.clearcoatRoughnessMap,F.clearcoatRoughnessMapTransform);if(q.clearcoatNormalMap){if(F.clearcoatNormalMap.value=q.clearcoatNormalMap,$(q.clearcoatNormalMap,F.clearcoatNormalMapTransform),F.clearcoatNormalScale.value.copy(q.clearcoatNormalScale),q.side===P8)F.clearcoatNormalScale.value.negate()}}if(q.dispersion>0)F.dispersion.value=q.dispersion;if(q.iridescence>0){if(F.iridescence.value=q.iridescence,F.iridescenceIOR.value=q.iridescenceIOR,F.iridescenceThicknessMinimum.value=q.iridescenceThicknessRange[0],F.iridescenceThicknessMaximum.value=q.iridescenceThicknessRange[1],q.iridescenceMap)F.iridescenceMap.value=q.iridescenceMap,$(q.iridescenceMap,F.iridescenceMapTransform);if(q.iridescenceThicknessMap)F.iridescenceThicknessMap.value=q.iridescenceThicknessMap,$(q.iridescenceThicknessMap,F.iridescenceThicknessMapTransform)}if(q.transmission>0){if(F.transmission.value=q.transmission,F.transmissionSamplerMap.value=_.texture,F.transmissionSamplerSize.value.set(_.width,_.height),q.transmissionMap)F.transmissionMap.value=q.transmissionMap,$(q.transmissionMap,F.transmissionMapTransform);if(F.thickness.value=q.thickness,q.thicknessMap)F.thicknessMap.value=q.thicknessMap,$(q.thicknessMap,F.thicknessMapTransform);F.attenuationDistance.value=q.attenuationDistance,F.attenuationColor.value.copy(q.attenuationColor)}if(q.anisotropy>0){if(F.anisotropyVector.value.set(q.anisotropy*Math.cos(q.anisotropyRotation),q.anisotropy*Math.sin(q.anisotropyRotation)),q.anisotropyMap)F.anisotropyMap.value=q.anisotropyMap,$(q.anisotropyMap,F.anisotropyMapTransform)}if(F.specularIntensity.value=q.specularIntensity,F.specularColor.value.copy(q.specularColor),q.specularColorMap)F.specularColorMap.value=q.specularColorMap,$(q.specularColorMap,F.specularColorMapTransform);if(q.specularIntensityMap)F.specularIntensityMap.value=q.specularIntensityMap,$(q.specularIntensityMap,F.specularIntensityMapTransform)}function M(F,q){if(q.matcap)F.matcap.value=q.matcap}function z(F,q){let _=Q.get(q).light;F.referencePosition.value.setFromMatrixPosition(_.matrixWorld),F.nearDistance.value=_.shadow.camera.near,F.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:W,refreshMaterialUniforms:Z}}function rU(J,Q,$,W){let Z={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(V,I){let w=I.program;W.uniformBlockBinding(V,w)}function U(V,I){let w=Z[V.id];if(w===void 0)F(V),w=N(V),Z[V.id]=w,V.addEventListener("dispose",_);let P=I.program;W.updateUBOMapping(V,P);let R=Q.render.frame;if(K[V.id]!==R)G(V),K[V.id]=R}function N(V){let I=E();V.__bindingPointIndex=I;let w=J.createBuffer(),P=V.__size,R=V.usage;return J.bindBuffer(J.UNIFORM_BUFFER,w),J.bufferData(J.UNIFORM_BUFFER,P,R),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,I,w),w}function E(){for(let V=0;V<Y;V++)if(H.indexOf(V)===-1)return H.push(V),V;return _0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(V){let I=Z[V.id],w=V.uniforms,P=V.__cache;J.bindBuffer(J.UNIFORM_BUFFER,I);for(let R=0,B=w.length;R<B;R++){let d=w[R];if(Array.isArray(d))for(let A=0,m=d.length;A<m;A++)D(d[A],R,A,P);else D(d,R,0,P)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(V,I,w,P){if(z(V,I,w,P)===!0){let{__offset:R,value:B}=V;if(Array.isArray(B)){let d=0;for(let A=0;A<B.length;A++){let m=B[A],o=q(m);if(M(m,V.__data,d),typeof m!=="number"&&typeof m!=="boolean"&&!m.isMatrix3&&!ArrayBuffer.isView(m))d+=o.storage/Float32Array.BYTES_PER_ELEMENT}}else M(B,V.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,R,V.__data)}}function M(V,I,w){if(typeof V==="number"||typeof V==="boolean")I[0]=V;else if(V.isMatrix3)I[0]=V.elements[0],I[1]=V.elements[1],I[2]=V.elements[2],I[3]=0,I[4]=V.elements[3],I[5]=V.elements[4],I[6]=V.elements[5],I[7]=0,I[8]=V.elements[6],I[9]=V.elements[7],I[10]=V.elements[8],I[11]=0;else if(ArrayBuffer.isView(V))I.set(new V.constructor(V.buffer,V.byteOffset,I.length));else V.toArray(I,w)}function z(V,I,w,P){let R=V.value,B=I+"_"+w;if(P[B]===void 0){if(typeof R==="number"||typeof R==="boolean")P[B]=R;else if(ArrayBuffer.isView(R))P[B]=R.slice();else P[B]=R.clone();return!0}else{let d=P[B];if(typeof R==="number"||typeof R==="boolean"){if(d!==R)return P[B]=R,!0}else if(ArrayBuffer.isView(R))return!0;else if(d.equals(R)===!1)return d.copy(R),!0}return!1}function F(V){let I=V.uniforms,w=0,P=16;for(let B=0,d=I.length;B<d;B++){let A=Array.isArray(I[B])?I[B]:[I[B]];for(let m=0,o=A.length;m<o;m++){let p=A[m],n=Array.isArray(p.value)?p.value:[p.value];for(let u=0,b=n.length;u<b;u++){let t=n[u],e=q(t),H0=w%P,M0=H0%e.boundary,k0=H0+M0;if(w+=M0,k0!==0&&P-k0<e.storage)w+=P-k0;p.__data=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),p.__offset=w,w+=e.storage}}}let R=w%P;if(R>0)w+=P-R;return V.__size=w,V.__cache={},this}function q(V){let I={boundary:0,storage:0};if(typeof V==="number"||typeof V==="boolean")I.boundary=4,I.storage=4;else if(V.isVector2)I.boundary=8,I.storage=8;else if(V.isVector3||V.isColor)I.boundary=16,I.storage=12;else if(V.isVector4)I.boundary=16,I.storage=16;else if(V.isMatrix3)I.boundary=48,I.storage=48;else if(V.isMatrix4)I.boundary=64,I.storage=64;else if(V.isTexture)I0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(V))I.boundary=16,I.storage=V.byteLength;else I0("WebGLRenderer: Unsupported uniform value type.",V);return I}function _(V){let I=V.target;I.removeEventListener("dispose",_);let w=H.indexOf(I.__bindingPointIndex);H.splice(w,1),J.deleteBuffer(Z[I.id]),delete Z[I.id],delete K[I.id]}function C(){for(let V in Z)J.deleteBuffer(Z[V]);H=[],Z={},K={}}return{bind:X,update:U,dispose:C}}var tU=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),J6=null;function eU(){if(J6===null)J6=new CQ(tU,16,16,p6,N6),J6.name="DFG_LUT",J6.minFilter=T8,J6.magFilter=T8,J6.wrapS=B7,J6.wrapT=B7,J6.generateMipmaps=!1,J6.needsUpdate=!0;return J6}class K${constructor(J={}){let{canvas:Q=fW(),context:$=null,depth:W=!0,stencil:Z=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:E=!1,outputBufferType:G=s8}=J;this.isWebGLRenderer=!0;let D;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=$.getContextAttributes().alpha}else D=K;let M=G,z=new Set([mJ,pJ,gJ]),F=new Set([s8,I6,f9,R9,bJ,xJ]),q=new Uint32Array(4),_=new Int32Array(4),C=new v,V=null,I=null,w=[],P=[],R=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=n8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,d=!1,A=null,m=null,o=null,p=null;this._outputColorSpace=T7;let n=0,u=0,b=null,t=-1,e=null,H0=new H8,M0=new H8,k0=null,Z8=new v0(0),i0=0,i=Q.width,W0=Q.height,F0=1,D0=null,C0=null,p0=new H8(0,0,i,W0),h0=new H8(0,0,i,W0),f0=!1,t0=new x7,m0=!1,b0=!1,D8=new W8,h8=new v,Q8=new H8,M8={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O8=!1;function E8(){return b===null?F0:1}let j=$;function f8(k,y){return Q.getContext(k,y)}try{let k={alpha:!0,depth:W,stencil:Z,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${g$}`);if(Q.addEventListener("webglcontextlost",T0,!1),Q.addEventListener("webglcontextrestored",Y8,!1),Q.addEventListener("webglcontextcreationerror",e0,!1),j===null){if(j=f8("webgl2",k),j===null)if(f8("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(k){throw _0("WebGLRenderer: "+k.message),k}let c0,$8,L,O,T,g,r,J0,Y0,l,s,E0,V0,X0,Q0,w0,A0,d0,S,$0,c,Z0,q0;function a(){if(c0=new HX(j),c0.init(),c=new nU(j,c0),$8=new tY(j,c0,J,c),L=new uU(j,c0),$8.reversedDepthBuffer&&E)L.buffers.depth.setReversed(!0);m=j.createFramebuffer(),o=j.createFramebuffer(),p=j.createFramebuffer(),O=new UX(j),T=new TU,g=new cU(j,c0,L,T,$8,c,O),r=new KX(B),J0=new qK(j),Z0=new aY(j,J0),Y0=new YX(j,J0,O,Z0),l=new NX(j,Y0,J0,Z0,O),d0=new GX(j,$8,g),Q0=new eY(T),s=new PU(B,r,c0,$8,Z0,Q0),E0=new aU(B,T),V0=new jU,X0=new xU(c0),A0=new oY(B,r,L,l,D,Y),w0=new dU(B,l,$8),q0=new rU(j,O,$8,L),S=new rY(j,c0,O),$0=new XX(j,c0,O),O.programs=s.programs,B.capabilities=$8,B.extensions=c0,B.properties=T,B.renderLists=V0,B.shadowMap=w0,B.state=L,B.info=O}if(a(),M!==s8)R=new qX(M,Q.width,Q.height,H,W,Z);let K0=new wZ(B,j);this.xr=K0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let k=c0.get("WEBGL_lose_context");if(k)k.loseContext()},this.forceContextRestore=function(){let k=c0.get("WEBGL_lose_context");if(k)k.restoreContext()},this.getPixelRatio=function(){return F0},this.setPixelRatio=function(k){if(k===void 0)return;F0=k,this.setSize(i,W0,!1)},this.getSize=function(k){return k.set(i,W0)},this.setSize=function(k,y,x=!0){if(K0.isPresenting){I0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(i=k,W0=y,Q.width=Math.floor(k*F0),Q.height=Math.floor(y*F0),x===!0)Q.style.width=k+"px",Q.style.height=y+"px";if(R!==null)R.setSize(Q.width,Q.height);this.setViewport(0,0,k,y)},this.getDrawingBufferSize=function(k){return k.set(i*F0,W0*F0).floor()},this.setDrawingBufferSize=function(k,y,x){i=k,W0=y,F0=x,Q.width=Math.floor(k*x),Q.height=Math.floor(y*x),this.setViewport(0,0,k,y)},this.setEffects=function(k){if(M===s8){_0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(k){for(let y=0;y<k.length;y++)if(k[y].isOutputPass===!0){I0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(k||[])},this.getCurrentViewport=function(k){return k.copy(H0)},this.getViewport=function(k){return k.copy(p0)},this.setViewport=function(k,y,x,h){if(k.isVector4)p0.set(k.x,k.y,k.z,k.w);else p0.set(k,y,x,h);L.viewport(H0.copy(p0).multiplyScalar(F0).round())},this.getScissor=function(k){return k.copy(h0)},this.setScissor=function(k,y,x,h){if(k.isVector4)h0.set(k.x,k.y,k.z,k.w);else h0.set(k,y,x,h);L.scissor(M0.copy(h0).multiplyScalar(F0).round())},this.getScissorTest=function(){return f0},this.setScissorTest=function(k){L.setScissorTest(f0=k)},this.setOpaqueSort=function(k){D0=k},this.setTransparentSort=function(k){C0=k},this.getClearColor=function(k){return k.copy(A0.getClearColor())},this.setClearColor=function(){A0.setClearColor(...arguments)},this.getClearAlpha=function(){return A0.getClearAlpha()},this.setClearAlpha=function(){A0.setClearAlpha(...arguments)},this.clear=function(k=!0,y=!0,x=!0){let h=0;if(k){let f=!1;if(b!==null){let N0=b.texture.format;f=z.has(N0)}if(f){let N0=b.texture.type,R0=F.has(N0),G0=A0.getClearColor(),L0=A0.getClearAlpha(),B0=G0.r,S0=G0.g,y0=G0.b;if(R0)q[0]=B0,q[1]=S0,q[2]=y0,q[3]=L0,j.clearBufferuiv(j.COLOR,0,q);else _[0]=B0,_[1]=S0,_[2]=y0,_[3]=L0,j.clearBufferiv(j.COLOR,0,_)}else h|=j.COLOR_BUFFER_BIT}if(y)h|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(x)h|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(h!==0)j.clear(h)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(k){k.setRenderer(this),A=k},this.dispose=function(){Q.removeEventListener("webglcontextlost",T0,!1),Q.removeEventListener("webglcontextrestored",Y8,!1),Q.removeEventListener("webglcontextcreationerror",e0,!1),A0.dispose(),V0.dispose(),X0.dispose(),T.dispose(),r.dispose(),l.dispose(),Z0.dispose(),q0.dispose(),s.dispose(),K0.dispose(),K0.removeEventListener("sessionstart",Y$),K0.removeEventListener("sessionend",X$),T6.stop()};function T0(k){k.preventDefault(),zQ("WebGLRenderer: Context Lost."),d=!0}function Y8(){zQ("WebGLRenderer: Context Restored."),d=!1;let k=O.autoReset,y=w0.enabled,x=w0.autoUpdate,h=w0.needsUpdate,f=w0.type;a(),O.autoReset=k,w0.enabled=y,w0.autoUpdate=x,w0.needsUpdate=h,w0.type=f}function e0(k){_0("WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function i8(k){let y=k.target;y.removeEventListener("dispose",i8),$6(y)}function $6(k){_Z(k),T.remove(k)}function _Z(k){let y=T.get(k).programs;if(y!==void 0){if(y.forEach(function(x){s.releaseProgram(x)}),k.isShaderMaterial)s.releaseShaderCache(k)}}this.renderBufferDirect=function(k,y,x,h,f,N0){if(y===null)y=M8;let R0=f.isMesh&&f.matrixWorld.determinantAffine()<0,G0=SZ(k,y,x,h,f);L.setMaterial(h,R0);let L0=x.index,B0=1;if(h.wireframe===!0){if(L0=Y0.getWireframeAttribute(x),L0===void 0)return;B0=2}let S0=x.drawRange,y0=x.attributes.position,z0=S0.start*B0,s0=(S0.start+S0.count)*B0;if(N0!==null)z0=Math.max(z0,N0.start*B0),s0=Math.min(s0,(N0.start+N0.count)*B0);if(L0!==null)z0=Math.max(z0,0),s0=Math.min(s0,L0.count);else if(y0!==void 0&&y0!==null)z0=Math.max(z0,0),s0=Math.min(s0,y0.count);let U8=s0-z0;if(U8<0||U8===1/0)return;Z0.setup(f,h,G0,x,L0);let X8,o0=S;if(L0!==null)X8=J0.get(L0),o0=$0,o0.setIndex(X8);if(f.isMesh)if(h.wireframe===!0)L.setLineWidth(h.wireframeLinewidth*E8()),o0.setMode(j.LINES);else o0.setMode(j.TRIANGLES);else if(f.isLine){let V8=h.linewidth;if(V8===void 0)V8=1;if(L.setLineWidth(V8*E8()),f.isLineSegments)o0.setMode(j.LINES);else if(f.isLineLoop)o0.setMode(j.LINE_LOOP);else o0.setMode(j.LINE_STRIP)}else if(f.isPoints)o0.setMode(j.POINTS);else if(f.isSprite)o0.setMode(j.TRIANGLES);if(f.isBatchedMesh)if(!c0.get("WEBGL_multi_draw")){let{_multiDrawStarts:V8,_multiDrawCounts:O0,_multiDrawCount:S8}=f,l0=L0?J0.get(L0).bytesPerElement:1,b8=T.get(h).currentProgram.getUniforms();for(let o8=0;o8<S8;o8++)b8.setValue(j,"_gl_DrawID",o8),o0.render(V8[o8]/l0,O0[o8])}else o0.renderMultiDraw(f._multiDrawStarts,f._multiDrawCounts,f._multiDrawCount);else if(f.isInstancedMesh)o0.renderInstances(z0,U8,f.count);else if(x.isInstancedBufferGeometry){let V8=x._maxInstanceCount!==void 0?x._maxInstanceCount:1/0,O0=Math.min(x.instanceCount,V8);o0.renderInstances(z0,U8,O0)}else o0.render(z0,U8)};function H$(k,y,x){if(k.transparent===!0&&k.side===r8&&k.forceSinglePass===!1)k.side=P8,k.needsUpdate=!0,n9(k,y,x),k.side=F9,k.needsUpdate=!0,n9(k,y,x),k.side=r8;else n9(k,y,x)}this.compile=function(k,y,x=null){if(x===null)x=k;if(I=X0.get(x),I.init(y),P.push(I),x.traverseVisible(function(f){if(f.isLight&&f.layers.test(y.layers)){if(I.pushLight(f),f.castShadow)I.pushShadow(f)}}),k!==x)k.traverseVisible(function(f){if(f.isLight&&f.layers.test(y.layers)){if(I.pushLight(f),f.castShadow)I.pushShadow(f)}});I.setupLights();let h=new Set;return k.traverse(function(f){if(!(f.isMesh||f.isPoints||f.isLine||f.isSprite))return;let N0=f.material;if(N0)if(Array.isArray(N0))for(let R0=0;R0<N0.length;R0++){let G0=N0[R0];H$(G0,x,f),h.add(G0)}else H$(N0,x,f),h.add(N0)}),I=P.pop(),h},this.compileAsync=function(k,y,x=null){let h=this.compile(k,y,x);return new Promise((f)=>{function N0(){if(h.forEach(function(R0){if(T.get(R0).currentProgram.isReady())h.delete(R0)}),h.size===0){f(k);return}setTimeout(N0,10)}if(c0.get("KHR_parallel_shader_compile")!==null)N0();else setTimeout(N0,10)})};let r7=null;function PZ(k){if(r7)r7(k)}function Y$(){T6.stop()}function X$(){T6.start()}let T6=new EZ;if(T6.setAnimationLoop(PZ),typeof self<"u")T6.setContext(self);this.setAnimationLoop=function(k){r7=k,K0.setAnimationLoop(k),k===null?T6.stop():T6.start()},K0.addEventListener("sessionstart",Y$),K0.addEventListener("sessionend",X$),this.render=function(k,y){if(y!==void 0&&y.isCamera!==!0){_0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;if(A!==null)A.renderStart(k,y);let x=K0.enabled===!0&&K0.isPresenting===!0,h=R!==null&&(b===null||x)&&R.begin(B,b);if(k.matrixWorldAutoUpdate===!0)k.updateMatrixWorld();if(y.parent===null&&y.matrixWorldAutoUpdate===!0)y.updateMatrixWorld();if(K0.enabled===!0&&K0.isPresenting===!0&&(R===null||R.isCompositing()===!1)){if(K0.cameraAutoUpdate===!0)K0.updateCamera(y);y=K0.getCamera()}if(k.isScene===!0)k.onBeforeRender(B,k,y,b);if(I=X0.get(k,P.length),I.init(y),I.state.textureUnits=g.getTextureUnits(),P.push(I),D8.multiplyMatrices(y.projectionMatrix,y.matrixWorldInverse),t0.setFromProjectionMatrix(D8,BQ,y.reversedDepth),b0=this.localClippingEnabled,m0=Q0.init(this.clippingPlanes,b0),V=V0.get(k,w.length),V.init(),w.push(V),K0.enabled===!0&&K0.isPresenting===!0){let R0=B.xr.getDepthSensingMesh();if(R0!==null)t7(R0,y,-1/0,B.sortObjects)}if(t7(k,y,0,B.sortObjects),V.finish(),B.sortObjects===!0)V.sort(D0,C0,y.reversedDepth);if(O8=K0.enabled===!1||K0.isPresenting===!1||K0.hasDepthSensing()===!1,O8)A0.addToRenderList(V,k);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(m0===!0)Q0.beginShadows();let f=I.state.shadowsArray;if(w0.render(f,k,y),m0===!0)Q0.endShadows();if((h&&R.hasRenderPass())===!1){let{opaque:R0,transmissive:G0}=V;if(I.setupLights(),y.isArrayCamera){let L0=y.cameras;if(G0.length>0)for(let B0=0,S0=L0.length;B0<S0;B0++){let y0=L0[B0];G$(R0,G0,k,y0)}if(O8)A0.render(k);for(let B0=0,S0=L0.length;B0<S0;B0++){let y0=L0[B0];U$(V,k,y0,y0.viewport)}}else{if(G0.length>0)G$(R0,G0,k,y);if(O8)A0.render(k);U$(V,k,y)}}if(b!==null&&u===0)g.updateMultisampleRenderTarget(b),g.updateRenderTargetMipmap(b);if(h)R.end(B);if(k.isScene===!0)k.onAfterRender(B,k,y);if(Z0.resetDefaultState(),t=-1,e=null,P.pop(),P.length>0){if(I=P[P.length-1],g.setTextureUnits(I.state.textureUnits),m0===!0)Q0.setGlobalState(B.clippingPlanes,I.state.camera)}else I=null;if(w.pop(),w.length>0)V=w[w.length-1];else V=null;if(A!==null)A.renderEnd()};function t7(k,y,x,h){if(k.visible===!1)return;if(k.layers.test(y.layers)){if(k.isGroup)x=k.renderOrder;else if(k.isLOD){if(k.autoUpdate===!0)k.update(y)}else if(k.isLightProbeGrid)I.pushLightProbeGrid(k);else if(k.isLight){if(I.pushLight(k),k.castShadow)I.pushShadow(k)}else if(k.isSprite){if(!k.frustumCulled||t0.intersectsSprite(k)){if(h)Q8.setFromMatrixPosition(k.matrixWorld).applyMatrix4(D8);let R0=l.update(k),G0=k.material;if(G0.visible)V.push(k,R0,G0,x,Q8.z,null)}}else if(k.isMesh||k.isLine||k.isPoints){if(!k.frustumCulled||t0.intersectsObject(k)){let R0=l.update(k),G0=k.material;if(h){if(k.boundingSphere!==void 0){if(k.boundingSphere===null)k.computeBoundingSphere();Q8.copy(k.boundingSphere.center)}else{if(R0.boundingSphere===null)R0.computeBoundingSphere();Q8.copy(R0.boundingSphere.center)}Q8.applyMatrix4(k.matrixWorld).applyMatrix4(D8)}if(Array.isArray(G0)){let L0=R0.groups;for(let B0=0,S0=L0.length;B0<S0;B0++){let y0=L0[B0],z0=G0[y0.materialIndex];if(z0&&z0.visible)V.push(k,R0,z0,x,Q8.z,y0)}}else if(G0.visible)V.push(k,R0,G0,x,Q8.z,null)}}}let N0=k.children;for(let R0=0,G0=N0.length;R0<G0;R0++)t7(N0[R0],y,x,h)}function U$(k,y,x,h){let{opaque:f,transmissive:N0,transparent:R0}=k;if(I.setupLightsView(x),m0===!0)Q0.setGlobalState(B.clippingPlanes,x);if(h)L.viewport(H0.copy(h));if(f.length>0)c9(f,y,x);if(N0.length>0)c9(N0,y,x);if(R0.length>0)c9(R0,y,x);L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function G$(k,y,x,h){if((x.isScene===!0?x.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[h.id]===void 0){let z0=c0.has("EXT_color_buffer_half_float")||c0.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[h.id]=new m8(1,1,{generateMipmaps:!0,type:z0?N6:s8,minFilter:b6,samples:Math.max(4,$8.samples),stencilBuffer:Z,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:x0.workingColorSpace})}let N0=I.state.transmissionRenderTarget[h.id],R0=h.viewport||H0;N0.setSize(R0.z*B.transmissionResolutionScale,R0.w*B.transmissionResolutionScale);let G0=B.getRenderTarget(),L0=B.getActiveCubeFace(),B0=B.getActiveMipmapLevel();if(B.setRenderTarget(N0),B.getClearColor(Z8),i0=B.getClearAlpha(),i0<1)B.setClearColor(16777215,0.5);if(B.clear(),O8)A0.render(x);let S0=B.toneMapping;B.toneMapping=n8;let y0=h.viewport;if(h.viewport!==void 0)h.viewport=void 0;if(I.setupLightsView(h),m0===!0)Q0.setGlobalState(B.clippingPlanes,h);if(c9(k,x,h),g.updateMultisampleRenderTarget(N0),g.updateRenderTargetMipmap(N0),c0.has("WEBGL_multisampled_render_to_texture")===!1){let z0=!1;for(let s0=0,U8=y.length;s0<U8;s0++){let X8=y[s0],{object:o0,geometry:V8,material:O0,group:S8}=X8;if(O0.side===r8&&o0.layers.test(h.layers)){let l0=O0.side;O0.side=P8,O0.needsUpdate=!0,N$(o0,x,h,V8,O0,S8),O0.side=l0,O0.needsUpdate=!0,z0=!0}}if(z0===!0)g.updateMultisampleRenderTarget(N0),g.updateRenderTargetMipmap(N0)}if(B.setRenderTarget(G0,L0,B0),B.setClearColor(Z8,i0),y0!==void 0)h.viewport=y0;B.toneMapping=S0}function c9(k,y,x){let h=y.isScene===!0?y.overrideMaterial:null;for(let f=0,N0=k.length;f<N0;f++){let R0=k[f],{object:G0,geometry:L0,group:B0}=R0,S0=R0.material;if(S0.allowOverride===!0&&h!==null)S0=h;if(G0.layers.test(x.layers))N$(G0,y,x,L0,S0,B0)}}function N$(k,y,x,h,f,N0){if(k.onBeforeRender(B,y,x,h,f,N0),k.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),f.onBeforeRender(B,y,x,h,k,N0),f.transparent===!0&&f.side===r8&&f.forceSinglePass===!1)f.side=P8,f.needsUpdate=!0,B.renderBufferDirect(x,y,h,f,k,N0),f.side=F9,f.needsUpdate=!0,B.renderBufferDirect(x,y,h,f,k,N0),f.side=r8;else B.renderBufferDirect(x,y,h,f,k,N0);k.onAfterRender(B,y,x,h,f,N0)}function n9(k,y,x){if(y.isScene!==!0)y=M8;let h=T.get(k),f=I.state.lights,N0=I.state.shadowsArray,R0=f.state.version,G0=s.getParameters(k,f.state,N0,y,x,I.state.lightProbeGridArray),L0=s.getProgramCacheKey(G0),B0=h.programs;h.environment=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?y.environment:null,h.fog=y.fog;let S0=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap;if(h.envMap=r.get(k.envMap||h.environment,S0),h.envMapRotation=h.environment!==null&&k.envMap===null?y.environmentRotation:k.envMapRotation,B0===void 0)k.addEventListener("dispose",i8),B0=new Map,h.programs=B0;let y0=B0.get(L0);if(y0!==void 0){if(h.currentProgram===y0&&h.lightsStateVersion===R0)return q$(k,G0),y0}else{if(G0.uniforms=s.getUniforms(k),A!==null&&k.isNodeMaterial)A.build(k,x,G0);k.onBeforeCompile(G0,B),y0=s.acquireProgram(G0,L0),B0.set(L0,y0),h.uniforms=G0.uniforms}let z0=h.uniforms;if(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)z0.clippingPlanes=Q0.uniform;if(q$(k,G0),h.needsLights=yZ(k),h.lightsStateVersion=R0,h.needsLights)z0.ambientLightColor.value=f.state.ambient,z0.lightProbe.value=f.state.probe,z0.directionalLights.value=f.state.directional,z0.directionalLightShadows.value=f.state.directionalShadow,z0.spotLights.value=f.state.spot,z0.spotLightShadows.value=f.state.spotShadow,z0.rectAreaLights.value=f.state.rectArea,z0.ltc_1.value=f.state.rectAreaLTC1,z0.ltc_2.value=f.state.rectAreaLTC2,z0.pointLights.value=f.state.point,z0.pointLightShadows.value=f.state.pointShadow,z0.hemisphereLights.value=f.state.hemi,z0.directionalShadowMatrix.value=f.state.directionalShadowMatrix,z0.spotLightMatrix.value=f.state.spotLightMatrix,z0.spotLightMap.value=f.state.spotLightMap,z0.pointShadowMatrix.value=f.state.pointShadowMatrix;return h.lightProbeGrid=I.state.lightProbeGridArray.length>0,h.currentProgram=y0,h.uniformsList=null,y0}function E$(k){if(k.uniformsList===null){let y=k.currentProgram.getUniforms();k.uniformsList=u9.seqWithValue(y.seq,k.uniforms)}return k.uniformsList}function q$(k,y){let x=T.get(k);x.outputColorSpace=y.outputColorSpace,x.batching=y.batching,x.batchingColor=y.batchingColor,x.instancing=y.instancing,x.instancingColor=y.instancingColor,x.instancingMorph=y.instancingMorph,x.skinning=y.skinning,x.morphTargets=y.morphTargets,x.morphNormals=y.morphNormals,x.morphColors=y.morphColors,x.morphTargetsCount=y.morphTargetsCount,x.numClippingPlanes=y.numClippingPlanes,x.numIntersection=y.numClipIntersection,x.vertexAlphas=y.vertexAlphas,x.vertexTangents=y.vertexTangents,x.toneMapping=y.toneMapping}function TZ(k,y){if(k.length===0)return null;if(k.length===1)return k[0].texture!==null?k[0]:null;C.setFromMatrixPosition(y.matrixWorld);for(let x=0,h=k.length;x<h;x++){let f=k[x];if(f.texture!==null&&f.boundingBox.containsPoint(C))return f}return null}function SZ(k,y,x,h,f){if(y.isScene!==!0)y=M8;g.resetTextureUnits();let N0=y.fog,R0=h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial?y.environment:null,G0=b===null?B.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:x0.workingColorSpace,L0=h.isMeshStandardMaterial||h.isMeshLambertMaterial&&!h.envMap||h.isMeshPhongMaterial&&!h.envMap,B0=r.get(h.envMap||R0,L0),S0=h.vertexColors===!0&&!!x.attributes.color&&x.attributes.color.itemSize===4,y0=!!x.attributes.tangent&&(!!h.normalMap||h.anisotropy>0),z0=!!x.morphAttributes.position,s0=!!x.morphAttributes.normal,U8=!!x.morphAttributes.color,X8=n8;if(h.toneMapped){if(b===null||b.isXRRenderTarget===!0)X8=B.toneMapping}let o0=x.morphAttributes.position||x.morphAttributes.normal||x.morphAttributes.color,V8=o0!==void 0?o0.length:0,O0=T.get(h),S8=I.state.lights;if(m0===!0){if(b0===!0||k!==e){let J8=k===e&&h.id===t;Q0.setState(h,k,J8)}}let l0=!1;if(h.version===O0.__version){if(O0.needsLights&&O0.lightsStateVersion!==S8.state.version)l0=!0;else if(O0.outputColorSpace!==G0)l0=!0;else if(f.isBatchedMesh&&O0.batching===!1)l0=!0;else if(!f.isBatchedMesh&&O0.batching===!0)l0=!0;else if(f.isBatchedMesh&&O0.batchingColor===!0&&f.colorTexture===null)l0=!0;else if(f.isBatchedMesh&&O0.batchingColor===!1&&f.colorTexture!==null)l0=!0;else if(f.isInstancedMesh&&O0.instancing===!1)l0=!0;else if(!f.isInstancedMesh&&O0.instancing===!0)l0=!0;else if(f.isSkinnedMesh&&O0.skinning===!1)l0=!0;else if(!f.isSkinnedMesh&&O0.skinning===!0)l0=!0;else if(f.isInstancedMesh&&O0.instancingColor===!0&&f.instanceColor===null)l0=!0;else if(f.isInstancedMesh&&O0.instancingColor===!1&&f.instanceColor!==null)l0=!0;else if(f.isInstancedMesh&&O0.instancingMorph===!0&&f.morphTexture===null)l0=!0;else if(f.isInstancedMesh&&O0.instancingMorph===!1&&f.morphTexture!==null)l0=!0;else if(O0.envMap!==B0)l0=!0;else if(h.fog===!0&&O0.fog!==N0)l0=!0;else if(O0.numClippingPlanes!==void 0&&(O0.numClippingPlanes!==Q0.numPlanes||O0.numIntersection!==Q0.numIntersection))l0=!0;else if(O0.vertexAlphas!==S0)l0=!0;else if(O0.vertexTangents!==y0)l0=!0;else if(O0.morphTargets!==z0)l0=!0;else if(O0.morphNormals!==s0)l0=!0;else if(O0.morphColors!==U8)l0=!0;else if(O0.toneMapping!==X8)l0=!0;else if(O0.morphTargetsCount!==V8)l0=!0;else if(!!O0.lightProbeGrid!==I.state.lightProbeGridArray.length>0)l0=!0}else l0=!0,O0.__version=h.version;let b8=O0.currentProgram;if(l0===!0){if(b8=n9(h,y,f),A&&h.isNodeMaterial)A.onUpdateProgram(h,b8,O0)}let o8=!1,F6=!1,a6=!1,a0=b8.getUniforms(),G8=O0.uniforms;if(L.useProgram(b8.program))o8=!0,F6=!0,a6=!0;if(h.id!==t)t=h.id,F6=!0;if(O0.needsLights){let J8=TZ(I.state.lightProbeGridArray,f);if(O0.lightProbeGrid!==J8)O0.lightProbeGrid=J8,F6=!0}if(o8||e!==k){if(L.buffers.depth.getReversed()&&k.reversedDepth!==!0)k._reversedDepth=!0,k.updateProjectionMatrix();a0.setValue(j,"projectionMatrix",k.projectionMatrix),a0.setValue(j,"viewMatrix",k.matrixWorldInverse);let O6=a0.map.cameraPosition;if(O6!==void 0)O6.setValue(j,h8.setFromMatrixPosition(k.matrixWorld));if($8.logarithmicDepthBuffer)a0.setValue(j,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2));if(h.isMeshPhongMaterial||h.isMeshToonMaterial||h.isMeshLambertMaterial||h.isMeshBasicMaterial||h.isMeshStandardMaterial||h.isShaderMaterial)a0.setValue(j,"isOrthographic",k.isOrthographicCamera===!0);if(e!==k)e=k,F6=!0,a6=!0}if(O0.needsLights){if(S8.state.directionalShadowMap.length>0)a0.setValue(j,"directionalShadowMap",S8.state.directionalShadowMap,g);if(S8.state.spotShadowMap.length>0)a0.setValue(j,"spotShadowMap",S8.state.spotShadowMap,g);if(S8.state.pointShadowMap.length>0)a0.setValue(j,"pointShadowMap",S8.state.pointShadowMap,g)}if(f.isSkinnedMesh){a0.setOptional(j,f,"bindMatrix"),a0.setOptional(j,f,"bindMatrixInverse");let J8=f.skeleton;if(J8){if(J8.boneTexture===null)J8.computeBoneTexture();a0.setValue(j,"boneTexture",J8.boneTexture,g)}}if(f.isBatchedMesh){if(a0.setOptional(j,f,"batchingTexture"),a0.setValue(j,"batchingTexture",f._matricesTexture,g),a0.setOptional(j,f,"batchingIdTexture"),a0.setValue(j,"batchingIdTexture",f._indirectTexture,g),a0.setOptional(j,f,"batchingColorTexture"),f._colorsTexture!==null)a0.setValue(j,"batchingColorTexture",f._colorsTexture,g)}let D6=x.morphAttributes;if(D6.position!==void 0||D6.normal!==void 0||D6.color!==void 0)d0.update(f,x,b8);if(F6||O0.receiveShadow!==f.receiveShadow)O0.receiveShadow=f.receiveShadow,a0.setValue(j,"receiveShadow",f.receiveShadow);if((h.isMeshStandardMaterial||h.isMeshLambertMaterial||h.isMeshPhongMaterial)&&h.envMap===null&&y.environment!==null)G8.envMapIntensity.value=y.environmentIntensity;if(G8.dfgLUT!==void 0)G8.dfgLUT.value=eU();if(F6){if(a0.setValue(j,"toneMappingExposure",B.toneMappingExposure),O0.needsLights)jZ(G8,a6);if(N0&&h.fog===!0)E0.refreshFogUniforms(G8,N0);if(E0.refreshMaterialUniforms(G8,h,F0,W0,I.state.transmissionRenderTarget[k.id]),O0.needsLights&&O0.lightProbeGrid){let J8=O0.lightProbeGrid;G8.probesSH.value=J8.texture,G8.probesMin.value.copy(J8.boundingBox.min),G8.probesMax.value.copy(J8.boundingBox.max),G8.probesResolution.value.copy(J8.resolution)}u9.upload(j,E$(O0),G8,g)}if(h.isShaderMaterial&&h.uniformsNeedUpdate===!0)u9.upload(j,E$(O0),G8,g),h.uniformsNeedUpdate=!1;if(h.isSpriteMaterial)a0.setValue(j,"center",f.center);if(a0.setValue(j,"modelViewMatrix",f.modelViewMatrix),a0.setValue(j,"normalMatrix",f.normalMatrix),a0.setValue(j,"modelMatrix",f.matrixWorld),h.uniformsGroups!==void 0){let J8=h.uniformsGroups;for(let O6=0,r6=J8.length;O6<r6;O6++){let F$=J8[O6];q0.update(F$,b8),q0.bind(F$,b8)}}return b8}function jZ(k,y){k.ambientLightColor.needsUpdate=y,k.lightProbe.needsUpdate=y,k.directionalLights.needsUpdate=y,k.directionalLightShadows.needsUpdate=y,k.pointLights.needsUpdate=y,k.pointLightShadows.needsUpdate=y,k.spotLights.needsUpdate=y,k.spotLightShadows.needsUpdate=y,k.rectAreaLights.needsUpdate=y,k.hemisphereLights.needsUpdate=y}function yZ(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}if(this.getActiveCubeFace=function(){return n},this.getActiveMipmapLevel=function(){return u},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(k,y,x){let h=T.get(k);if(h.__autoAllocateDepthBuffer=k.resolveDepthBuffer===!1,h.__autoAllocateDepthBuffer===!1)h.__useRenderToTexture=!1;T.get(k.texture).__webglTexture=y,T.get(k.depthTexture).__webglTexture=h.__autoAllocateDepthBuffer?void 0:x,h.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(k,y){let x=T.get(k);x.__webglFramebuffer=y,x.__useDefaultFramebuffer=y===void 0},this.setRenderTarget=function(k,y=0,x=0){b=k,n=y,u=x;let h=null,f=!1,N0=!1;if(k){let G0=T.get(k);if(G0.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(j.FRAMEBUFFER,G0.__webglFramebuffer),H0.copy(k.viewport),M0.copy(k.scissor),k0=k.scissorTest,L.viewport(H0),L.scissor(M0),L.setScissorTest(k0),t=-1;return}else if(G0.__webglFramebuffer===void 0)g.setupRenderTarget(k);else if(G0.__hasExternalTextures)g.rebindTextures(k,T.get(k.texture).__webglTexture,T.get(k.depthTexture).__webglTexture);else if(k.depthBuffer){let S0=k.depthTexture;if(G0.__boundDepthTexture!==S0){if(S0!==null&&T.has(S0)&&(k.width!==S0.image.width||k.height!==S0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");g.setupDepthRenderbuffer(k)}}let L0=k.texture;if(L0.isData3DTexture||L0.isDataArrayTexture||L0.isCompressedArrayTexture)N0=!0;let B0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget){if(Array.isArray(B0[y]))h=B0[y][x];else h=B0[y];f=!0}else if(k.samples>0&&g.useMultisampledRTT(k)===!1)h=T.get(k).__webglMultisampledFramebuffer;else if(Array.isArray(B0))h=B0[x];else h=B0;H0.copy(k.viewport),M0.copy(k.scissor),k0=k.scissorTest}else H0.copy(p0).multiplyScalar(F0).floor(),M0.copy(h0).multiplyScalar(F0).floor(),k0=f0;if(x!==0)h=m;if(L.bindFramebuffer(j.FRAMEBUFFER,h))L.drawBuffers(k,h);if(L.viewport(H0),L.scissor(M0),L.setScissorTest(k0),f){let G0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+y,G0.__webglTexture,x)}else if(N0){let G0=y;for(let L0=0;L0<k.textures.length;L0++){let B0=T.get(k.textures[L0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+L0,B0.__webglTexture,x,G0)}}else if(k!==null&&x!==0){let G0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,G0.__webglTexture,x)}t=-1},this.readRenderTargetPixels=function(k,y,x,h,f,N0,R0,G0=0){if(!(k&&k.isWebGLRenderTarget)){_0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let L0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)L0=L0[R0];if(L0){L.bindFramebuffer(j.FRAMEBUFFER,L0);try{let B0=k.textures[G0],S0=B0.format,y0=B0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+G0);if(!$8.textureFormatReadable(S0)){_0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$8.textureTypeReadable(y0)){_0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(y>=0&&y<=k.width-h&&(x>=0&&x<=k.height-f))j.readPixels(y,x,h,f,c.convert(S0),c.convert(y0),N0)}finally{let B0=b!==null?T.get(b).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,B0)}}},this.readRenderTargetPixelsAsync=async function(k,y,x,h,f,N0,R0,G0=0){if(!(k&&k.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let L0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)L0=L0[R0];if(L0)if(y>=0&&y<=k.width-h&&(x>=0&&x<=k.height-f)){L.bindFramebuffer(j.FRAMEBUFFER,L0);let B0=k.textures[G0],S0=B0.format,y0=B0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+G0);if(!$8.textureFormatReadable(S0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$8.textureTypeReadable(y0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let z0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,z0),j.bufferData(j.PIXEL_PACK_BUFFER,N0.byteLength,j.STREAM_READ),j.readPixels(y,x,h,f,c.convert(S0),c.convert(y0),0);let s0=b!==null?T.get(b).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,s0);let U8=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await xW(j,U8,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,z0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,N0),j.deleteBuffer(z0),j.deleteSync(U8),N0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(k,y=null,x=0){let h=Math.pow(2,-x),f=Math.floor(k.image.width*h),N0=Math.floor(k.image.height*h),R0=y!==null?y.x:0,G0=y!==null?y.y:0;g.setTexture2D(k,0),j.copyTexSubImage2D(j.TEXTURE_2D,x,0,0,R0,G0,f,N0),L.unbindTexture()},this.copyTextureToTexture=function(k,y,x=null,h=null,f=0,N0=0){let R0,G0,L0,B0,S0,y0,z0,s0,U8,X8=k.isCompressedTexture?k.mipmaps[N0]:k.image;if(x!==null)R0=x.max.x-x.min.x,G0=x.max.y-x.min.y,L0=x.isBox3?x.max.z-x.min.z:1,B0=x.min.x,S0=x.min.y,y0=x.isBox3?x.min.z:0;else{let G8=Math.pow(2,-f);if(R0=Math.floor(X8.width*G8),G0=Math.floor(X8.height*G8),k.isDataArrayTexture)L0=X8.depth;else if(k.isData3DTexture)L0=Math.floor(X8.depth*G8);else L0=1;B0=0,S0=0,y0=0}if(h!==null)z0=h.x,s0=h.y,U8=h.z;else z0=0,s0=0,U8=0;let o0=c.convert(y.format),V8=c.convert(y.type),O0;if(y.isData3DTexture)g.setTexture3D(y,0),O0=j.TEXTURE_3D;else if(y.isDataArrayTexture||y.isCompressedArrayTexture)g.setTexture2DArray(y,0),O0=j.TEXTURE_2D_ARRAY;else g.setTexture2D(y,0),O0=j.TEXTURE_2D;L.activeTexture(j.TEXTURE0),L.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,y.flipY),L.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),L.pixelStorei(j.UNPACK_ALIGNMENT,y.unpackAlignment);let S8=L.getParameter(j.UNPACK_ROW_LENGTH),l0=L.getParameter(j.UNPACK_IMAGE_HEIGHT),b8=L.getParameter(j.UNPACK_SKIP_PIXELS),o8=L.getParameter(j.UNPACK_SKIP_ROWS),F6=L.getParameter(j.UNPACK_SKIP_IMAGES);L.pixelStorei(j.UNPACK_ROW_LENGTH,X8.width),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,X8.height),L.pixelStorei(j.UNPACK_SKIP_PIXELS,B0),L.pixelStorei(j.UNPACK_SKIP_ROWS,S0),L.pixelStorei(j.UNPACK_SKIP_IMAGES,y0);let a6=k.isDataArrayTexture||k.isData3DTexture,a0=y.isDataArrayTexture||y.isData3DTexture;if(k.isDepthTexture){let G8=T.get(k),D6=T.get(y),J8=T.get(G8.__renderTarget),O6=T.get(D6.__renderTarget);L.bindFramebuffer(j.READ_FRAMEBUFFER,J8.__webglFramebuffer),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,O6.__webglFramebuffer);for(let r6=0;r6<L0;r6++){if(a6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(k).__webglTexture,f,y0+r6),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(y).__webglTexture,N0,U8+r6);j.blitFramebuffer(B0,S0,R0,G0,z0,s0,R0,G0,j.DEPTH_BUFFER_BIT,j.NEAREST)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(f!==0||k.isRenderTargetTexture||T.has(k)){let G8=T.get(k),D6=T.get(y);L.bindFramebuffer(j.READ_FRAMEBUFFER,o),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,p);for(let J8=0;J8<L0;J8++){if(a6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,G8.__webglTexture,f,y0+J8);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,G8.__webglTexture,f);if(a0)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,D6.__webglTexture,N0,U8+J8);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,D6.__webglTexture,N0);if(f!==0)j.blitFramebuffer(B0,S0,R0,G0,z0,s0,R0,G0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(a0)j.copyTexSubImage3D(O0,N0,z0,s0,U8+J8,B0,S0,R0,G0);else j.copyTexSubImage2D(O0,N0,z0,s0,B0,S0,R0,G0)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(a0)if(k.isDataTexture||k.isData3DTexture)j.texSubImage3D(O0,N0,z0,s0,U8,R0,G0,L0,o0,V8,X8.data);else if(y.isCompressedArrayTexture)j.compressedTexSubImage3D(O0,N0,z0,s0,U8,R0,G0,L0,o0,X8.data);else j.texSubImage3D(O0,N0,z0,s0,U8,R0,G0,L0,o0,V8,X8);else if(k.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,N0,z0,s0,R0,G0,o0,V8,X8.data);else if(k.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,N0,z0,s0,X8.width,X8.height,o0,X8.data);else j.texSubImage2D(j.TEXTURE_2D,N0,z0,s0,R0,G0,o0,V8,X8);if(L.pixelStorei(j.UNPACK_ROW_LENGTH,S8),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,l0),L.pixelStorei(j.UNPACK_SKIP_PIXELS,b8),L.pixelStorei(j.UNPACK_SKIP_ROWS,o8),L.pixelStorei(j.UNPACK_SKIP_IMAGES,F6),N0===0&&y.generateMipmaps)j.generateMipmap(O0);L.unbindTexture()},this.initRenderTarget=function(k){if(T.get(k).__webglFramebuffer===void 0)g.setupRenderTarget(k)},this.initTexture=function(k){if(k.isCubeTexture)g.setTextureCube(k,0);else if(k.isData3DTexture)g.setTexture3D(k,0);else if(k.isDataArrayTexture||k.isCompressedArrayTexture)g.setTexture2DArray(k,0);else g.setTexture2D(k,0);L.unbindTexture()},this.resetState=function(){n=0,u=0,b=null,L.reset(),Z0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return BQ}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=x0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=x0._getUnpackColorSpace()}}var AZ="varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}",J5="float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453123);}float noise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash(i),hash(i+vec2(1.,0.)),u.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),u.x),u.y);}float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*noise(p);p=mat2(.8,-.6,.6,.8)*p*2.02+vec2(2.5);a*=.5;}return v;}",Q5=`varying vec2 vUv;uniform float time;${J5}
void main(){vec2 p=(vUv-.5)*2.;float r=length(p),a=atan(p.y,p.x);float radius=.425;float t=time*.055;
vec2 uv=p/radius;float sphere=sqrt(max(0.,1.-dot(uv,uv)));vec2 warp=vec2(fbm(uv*4.+vec2(t,-t*.4)),fbm(uv*4.-vec2(t*.2,t)));
float granules=fbm(uv*14.+warp*3.+vec2(t,t*.7));float filaments=fbm(uv*7.+warp*5.-vec2(t*.6,t*.3));
float body=1.-smoothstep(radius-.005,radius+.006,r);float limb=pow(max(0.,r/radius),5.);float heat=.46+granules*.50+filaments*.25;
vec3 surface=mix(vec3(.83,.235,.028),vec3(1.,.78,.40),smoothstep(.48,.97,heat));surface+=vec3(.16,.12,.06)*sphere;surface+=vec3(.08,.06,.015)*limb;
float turbulence=fbm(vec2(a*4.,r*14.-t*2.));float rays=pow(.5+.5*sin(a*13.+t*.8+fbm(p*5.+t)*5.),4.);
float corona=exp(-max(0.,r-radius)*14.)*(.18+turbulence*.18+rays*.12)*(1.-body);float outer=exp(-max(0.,r-radius)*5.5)*.045*(1.-body);
float rim=exp(-abs(r-radius)*190.)*.8;vec3 glow=vec3(1.,.53,.14)*(corona+outer)+vec3(1.,.78,.36)*rim;
float alpha=clamp(body+corona+outer+rim,0.,1.);vec3 rgb=body*surface+glow;rgb*=.96+.025*sin(time*.6);gl_FragColor=vec4(rgb/max(alpha,.001),alpha);}`,$5=`varying vec2 vUv;uniform vec3 color;uniform float time;uniform float selected;uniform float subdued;uniform float seed;
void main(){vec2 p=(vUv-.5)*2.;float r=length(p);float a=atan(p.y,p.x);float disk=1.-smoothstep(.635,.655,r);float halo=exp(-abs(r-.65)*24.)*.075;float rim=exp(-abs(r-.647)*180.);float light=.045+.045*max(0.,dot(normalize(vec3(p,.7)),normalize(vec3(-.5,.8,.9))));vec3 surface=mix(vec3(.023,.026,.028),color*.28,light*5.);
float band=exp(-abs(p.y*.7+p.x*.24+sin(p.x*3.+seed)*.05)*28.)*.025;surface+=color*band;
float accent=(.36+.45*pow(max(0.,cos(a-2.2)),4.))*rim;float orbit=exp(-abs(r-.81)*120.)*(.5+.5*sin(a*2.+time*.15+seed))*.15*selected;
vec3 c=surface*disk+color*(accent+halo+orbit)+vec3(.45)*rim*.10;float alpha=clamp(disk+halo+rim*.35+orbit,0.,1.);c*=mix(1.,.57,subdued);gl_FragColor=vec4(c,alpha);
#include <colorspace_fragment>
}`;class CZ{constructor(J){this.host=J,this.scene=new h7,this.camera=new B9(-500,500,350,-350,0.1,100),this.camera.position.z=10,this.nodeMeshes=new Map,this.frames=[],this.costs=[],this.last=0,this.time=0,this.active=!0,this.quality="balanced",this.pending=0,this.timeout=0,this.lastGeometry="",this.metrics={renderer:"Three.js r185 · WebGL2",drawCalls:0,triangles:0};let Q=document.createElement("canvas");Q.className="universe-webgl",Q.setAttribute("aria-hidden","true"),J.prepend(Q),this.canvas=Q;try{this.renderer=new K$({canvas:Q,alpha:!0,antialias:!1,powerPreference:"low-power",depth:!1,stencil:!1}),this.renderer.setPixelRatio(Math.min(devicePixelRatio,1.5)),this.renderer.outputColorSpace=T7,this.renderer.setClearColor(0,0),this.renderer.sortObjects=!1}catch($){throw Q.remove(),this.active=!1,$}this.plane=new _6(1,1),this.sunMaterial=new C8({vertexShader:AZ,fragmentShader:Q5,uniforms:{time:{value:0}},transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1}),this.sun=new A8(this.plane,this.sunMaterial),this.sun.scale.set(330,330,1),this.sun.position.z=2,this.sun.renderOrder=3,this.setupGalaxy(),this.setupOrbits(),this.edgeGeometry=new k8,this.edgeMaterial=new M9({vertexColors:!0,transparent:!0,opacity:0.55,depthTest:!1}),this.edges=new p7(this.edgeGeometry,this.edgeMaterial),this.scene.add(this.edges),this.leafGeometry=new k8,this.leafMaterial=new u6({size:3.6,sizeAttenuation:!1,vertexColors:!0,transparent:!0,opacity:0.8,depthTest:!1}),this.leafPoints=new L9(this.leafGeometry,this.leafMaterial),this.scene.add(this.leafPoints),this.pulseGeometry=new k8,this.pulseGeometry.setAttribute("position",new K8(new Float32Array(12),3)),this.pulseGeometry.setAttribute("color",new K8(new Float32Array(12).fill(0.7),3)),this.pulseMaterial=new u6({size:2.8,sizeAttenuation:!1,vertexColors:!0,transparent:!0,opacity:0.5,depthTest:!1}),this.pulses=new L9(this.pulseGeometry,this.pulseMaterial),this.pulses.frustumCulled=!1,this.scene.add(this.pulses,this.sun),Q.addEventListener("webglcontextlost",($)=>{$.preventDefault(),this.setPaused(!0),J.classList.remove("three-enabled"),this.metrics.error="WebGL context lost; SVG fallback active"}),Q.addEventListener("webglcontextrestored",()=>{J.classList.add("three-enabled"),this.setPaused(!1)}),J.classList.add("three-enabled"),this.schedule()}setupGalaxy(){let J=document.createElement("canvas");J.width=768,J.height=384;let Q=J.getContext("2d"),$=Q.createRadialGradient(380,195,10,380,195,320);$.addColorStop(0,"rgba(146,130,113,.10)"),$.addColorStop(0.25,"rgba(137,135,134,.035)"),$.addColorStop(0.65,"rgba(91,93,113,.02)"),$.addColorStop(1,"rgba(0,0,0,0)"),Q.fillStyle=$,Q.fillRect(0,0,768,384),Q.save(),Q.translate(384,192),Q.rotate(-0.15),Q.scale(1,0.25);let W=Q.createRadialGradient(0,0,0,0,0,320);W.addColorStop(0,"rgba(204,182,144,.07)"),W.addColorStop(0.38,"rgba(181,174,166,.05)"),W.addColorStop(0.75,"rgba(125,124,147,.035)"),W.addColorStop(1,"rgba(0,0,0,0)"),Q.fillStyle=W,Q.fillRect(-380,-380,760,760),Q.restore(),this.nebulaTexture=new d7(J),this.nebula=new A8(new _6(1120,690),new k9({map:this.nebulaTexture,transparent:!0,opacity:0.85,depthTest:!1,depthWrite:!1})),this.nebula.rotation.z=0.38,this.nebula.position.z=-2,this.scene.add(this.nebula);let Z=[],K=[];for(let Y=0;Y<130;Y++){let X=(G)=>{let D=Math.sin(G*127.1+311.7)*43758.5453;return D-Math.floor(D)},U=(X(Y+2)-0.5)*1050,N=(X(Y+901)-0.5)*690;Z.push(U,N,-1);let E=0.12+X(Y+20)*0.22;K.push(E*0.92,E*0.95,E)}let H=new k8;H.setAttribute("position",new K8(Z,3)),H.setAttribute("color",new K8(K,3)),this.stars=new L9(H,new u6({size:1.1,sizeAttenuation:!1,vertexColors:!0,transparent:!0,opacity:0.8,depthTest:!1})),this.scene.add(this.stars)}setupOrbits(){this.orbits=[];for(let[J,Q]of[[185,95],[288,156],[395,233]]){let $=[];for(let K=0;K<160;K++){let H=K/160*Math.PI*2,Y=Math.cos(H)*J,X=Math.sin(H)*Q;$.push(Y*0.906-X*0.423,Y*0.423+X*0.906,-0.5)}let W=new k8;W.setAttribute("position",new K8($,3));let Z=new m7(W,new M9({color:10199206,transparent:!0,opacity:0.09,depthTest:!1}));this.orbits.push(Z),this.scene.add(Z)}}sync(J){this.model=J;let Q=Math.round(J.width),$=Math.round(J.height);if(!Q||!$)return;if(this.width!==Q||this.height!==$)this.width=Q,this.height=$,this.renderer.setSize(Q,$,!1);let{x:W,y:Z,k:K}=J.camera;this.camera.left=-W/K,this.camera.right=(Q-W)/K,this.camera.top=Z/K,this.camera.bottom=(Z-$)/K,this.camera.updateProjectionMatrix();let H=J.selected+"|"+J.selectedLeaf;for(let Y of J.nodes.values()){H+=`|${Y.id}:${Y.x.toFixed(2)},${Y.y.toFixed(2)}`;let X=this.nodeMeshes.get(Y.id);if(!X){let U=new v0(J.palette[Y.index]),N=new C8({vertexShader:AZ,fragmentShader:$5,uniforms:{color:{value:U},time:{value:0},selected:{value:0},subdued:{value:0},seed:{value:Y.index*3.7}},transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1});X=new A8(this.plane,N),X.scale.set(121,121,1),X.position.z=1,this.scene.add(X),this.nodeMeshes.set(Y.id,X)}X.position.x=Y.x,X.position.y=-Y.y,X.material.uniforms.selected.value=J.selected===Y.id?1:0,X.material.uniforms.subdued.value=J.selected&&J.selected!==Y.id?1:0}for(let Y of J.leaves.values())H+=`|${Y.id}:${Y.x.toFixed(2)},${Y.y.toFixed(2)}`;if(H!==this.lastGeometry)this.lastGeometry=H,this.updateGeometry(J);if(this.previousManualEconomy!==!!J.data?.economy)this.previousManualEconomy=!!J.data?.economy,this.adaptiveEconomy=!1;if(this.setQuality(J.data?.economy||this.adaptiveEconomy?"economy":"balanced"),this.reduced=J.reduced,this.setPaused(J.paused),window.oracleWindowVisible!==!1&&!document.hidden)this.render(performance.now(),!0)}curve(J,Q,$,W,Z,K=0.13){let H=$-J,Y=W-Q,X=J+H*0.34-Y*K,U=Q+Y*0.34+H*K,N=J+H*0.72-Y*K*0.5,E=Q+Y*0.72+H*K*0.5,G=1-Z;return{x:G*G*G*J+3*G*G*Z*X+3*G*Z*Z*N+Z*Z*Z*$,y:G*G*G*Q+3*G*G*Z*U+3*G*Z*Z*E+Z*Z*Z*W}}updateGeometry(J){let Q=[],$=[],W=[],Z=[],K=(H,Y,X,U,N,E=0.13)=>{let G=this.curve(H,Y,X,U,0,E);for(let D=1;D<=24;D++){let M=this.curve(H,Y,X,U,D/24,E);Q.push(G.x,-G.y,0,M.x,-M.y,0),$.push(N.r,N.g,N.b,N.r,N.g,N.b),G=M}};for(let H of J.nodes.values()){let Y=new v0(J.palette[H.index]);Y.multiplyScalar(J.selected?H.id===J.selected?1.2:0.25:0.6),K(0,0,H.x,H.y,Y)}for(let H of J.leaves.values()){let Y=J.nodes.get(H.parent),X=new v0(J.palette[Y.index]);X.multiplyScalar(J.selectedLeaf===H.id?1.3:J.selected===H.parent?0.75:J.selected?0.2:0.4),K(Y.x,Y.y,H.x,H.y,X,0.06),W.push(H.x,-H.y,1),Z.push(X.r,X.g,X.b)}this.edgeGeometry.setAttribute("position",new K8(Q,3)),this.edgeGeometry.setAttribute("color",new K8($,3)),this.edgeGeometry.computeBoundingSphere(),this.leafGeometry.setAttribute("position",new K8(W,3)),this.leafGeometry.setAttribute("color",new K8(Z,3)),this.leafGeometry.computeBoundingSphere()}setQuality(J){if(this.quality===J)return;if(this.quality=J,this.frames=[],this.costs=[],this.last=0,this.renderer.setPixelRatio(J==="economy"?1:Math.min(devicePixelRatio,1.5)),this.width)this.renderer.setSize(this.width,this.height,!1)}setPaused(J){let Q=this.paused;if(this.paused=!!J,this.paused)this.last=0;if(this.paused||this.reduced){if(cancelAnimationFrame(this.pending),clearTimeout(this.timeout),this.pending=0,this.timeout=0,!this.paused&&this.reduced)this.render(performance.now(),!0)}else if(Q||!this.pending&&!this.timeout)this.schedule()}schedule(){if(this.paused||this.reduced||!this.active)return;this.timeout=setTimeout(()=>{this.timeout=0,this.pending=requestAnimationFrame((J)=>{this.pending=0,this.render(J),this.schedule()})},this.quality==="economy"?64:24)}render(J,Q=!1){if(!this.model||this.paused&&!Q)return;let $=performance.now();if(!Q){let Y=this.last?J-this.last:33;if(this.time+=Math.min(Y,100)/1000,this.frames.push(Y),this.frames.length>360)this.frames.shift();this.last=J}let W=this.reduced?0:this.time;this.orbits.forEach((Y,X)=>Y.material.opacity=0.065+Math.sin(W*0.13+X)*0.018),this.nebula.rotation.z=0.38+Math.sin(W*0.017)*0.018,this.sunMaterial.uniforms.time.value=W;for(let Y of this.nodeMeshes.values())Y.material.uniforms.time.value=W;let Z=this.pulseGeometry.attributes.position,K=this.pulseGeometry.attributes.color,H=[...this.model.nodes.values()];for(let Y=0;Y<4;Y++){let X=this.model.selected?this.model.nodes.get(this.model.selected):H[(Y*2+1)%H.length];if(!X)continue;let U=(W/(12+Y*3)+Y*0.27)%1,N=this.curve(0,0,X.x,X.y,U);if(Y>1&&this.model.selected){let G=[...this.model.leaves.values()].filter((D)=>D.parent===X.id)[Y-2];if(G)N=this.curve(X.x,X.y,G.x,G.y,U,0.06)}Z.setXYZ(Y,N.x,-N.y,1.1);let E=new v0(this.model.palette[X.index]);K.setXYZ(Y,E.r,E.g,E.b)}if(Z.needsUpdate=!0,K.needsUpdate=!0,this.pulses.visible=!this.reduced,this.pulseMaterial.opacity=this.host.classList.contains("real-event")?0.95:0.36,this.pulseMaterial.size=this.host.classList.contains("real-event")?4.5:2.3,this.renderer.render(this.scene,this.camera),this.renderCount=(this.renderCount||0)+1,this.costs.push(performance.now()-$),!this.reduced&&this.quality==="balanced"&&!this.model.data?.economy&&this.frames.length>=180&&!this.adaptiveEconomy){let Y=this.frames.slice(-120).sort((X,U)=>X-U);if(Y[Math.floor(Y.length*0.95)]>52)this.adaptiveEconomy=!0,this.setQuality("economy")}if(this.costs.length>360)this.costs.shift();this.metrics={...this.metrics,drawCalls:this.renderer.info.render.calls,triangles:this.renderer.info.render.triangles,geometries:this.renderer.info.memory.geometries,textures:this.renderer.info.memory.textures,buffer:[this.canvas.width,this.canvas.height],quality:this.quality,adaptiveEconomy:!!this.adaptiveEconomy,paused:this.paused,reduced:!!this.reduced}}diagnostics(){let J=(Q,$)=>{if(!Q.length)return null;let W=[...Q].sort((Z,K)=>Z-K);return Number(W[Math.floor((W.length-1)*$)].toFixed(2))};return{...this.metrics,paused:!!this.paused,reduced:!!this.reduced,renderCount:this.renderCount||0,samples:this.frames.length,frameIntervalMedianMs:J(this.frames,0.5),frameIntervalP95Ms:J(this.frames,0.95),cpuSubmitMedianMs:J(this.costs,0.5),cpuSubmitP95Ms:J(this.costs,0.95),note:"CPU submission time is not GPU frame time; idle render cadence is deliberately capped."}}dispose(){this.setPaused(!0),this.scene.traverse((J)=>{if(J.geometry?.dispose(),J.material)J.material.dispose()}),this.nebulaTexture.dispose(),this.renderer.dispose(),this.canvas.remove()}}window.OracleUniverse=CZ;})();
