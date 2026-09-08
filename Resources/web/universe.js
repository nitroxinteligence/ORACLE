(()=>{var t$="185";var e$=0,TJ=1,JZ=2;var S7=1,QZ=2,F7=3,D7=0,P8=1,t8=2,e8=0,j7=1,SJ=2,jJ=3,vJ=4,$Z=5;var O7=100,ZZ=101,WZ=102,KZ=103,HZ=104,YZ=200,XZ=201,UZ=202,GZ=203,NZ=204,EZ=205,qZ=206,FZ=207,DZ=208,OZ=209,RZ=210,kZ=211,MZ=212,LZ=213,VZ=214,BZ=0,zZ=1,IZ=2,yJ=3,_Z=4,AZ=5,CZ=6,wZ=7,PZ=0,TZ=1,SZ=2,i8=0,fJ=1,bJ=2,hJ=3,xJ=4,gJ=5,pJ=6,mJ=7;var R7=301,x9=302,V6=303,B6=304,v7=306,z6=1000,I6=1001,jZ=1002,A9=1003,vZ=1004;var y7=1005;var _8=1006,_6=1007;var g9=1008;var b8=1009,yZ=1010,fZ=1011,f7=1012,lJ=1013,C9=1014,E9=1015,q9=1016,dJ=1017,uJ=1018,k7=1020,bZ=35902,hZ=35899,xZ=1021,gZ=1022,J9=1023,p9=1026,m9=1027,A6=1028,cJ=1029,l9=1030,nJ=1031;var sJ=1033,C6=33776,w6=33777,P6=33778,T6=33779,iJ=35840,oJ=35841,aJ=35842,rJ=35843,tJ=36196,eJ=37492,JQ=37496,QQ=37488,$Q=37489,S6=37490,ZQ=37491,WQ=37808,KQ=37809,HQ=37810,YQ=37811,XQ=37812,UQ=37813,GQ=37814,NQ=37815,EQ=37816,qQ=37817,FQ=37818,DQ=37819,OQ=37820,RQ=37821,kQ=36492,MQ=36494,LQ=36495,VQ=36283,BQ=36284,j6=36285,zQ=36286;var IQ=0,pZ=1,d9="",v6="srgb",_Q="srgb-linear",AQ="linear",r0="srgb";var mZ=512,lZ=513,dZ=514,y6=515,uZ=516,cZ=517,f6=518,nZ=519;var CQ=35048;var wQ="300 es",PQ=2000;function WK(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function KK(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function T7(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function sZ(){let J=T7("canvas");return J.style.display="block",J}var w$={},q7=null;function TQ(...J){let Q="THREE."+J.shift();if(q7)q7("log",Q,...J);else console.log(Q,...J)}function iZ(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function _0(...J){J=iZ(J);let Q="THREE."+J.shift();if(q7)q7("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function w0(...J){J=iZ(J);let Q="THREE."+J.shift();if(q7)q7("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function h9(...J){let Q=J.join(" ");if(Q in w$)return;w$[Q]=!0,_0(...J)}function oZ(J,Q,$){return new Promise(function(Z,W){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:W();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:Z()}}setTimeout(K,$)})}var aZ={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class F9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let Z=$[J];if(Z!==void 0){let W=Z.indexOf(Q);if(W!==-1)Z.splice(W,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let Z=$.slice(0);for(let W=0,K=Z.length;W<K;W++)Z[W].call(this,J);J.target=null}}}var V8=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var KJ=Math.PI/180,k6=180/Math.PI;function b7(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,Z=Math.random()*4294967295|0;return(V8[J&255]+V8[J>>8&255]+V8[J>>16&255]+V8[J>>24&255]+"-"+V8[Q&255]+V8[Q>>8&255]+"-"+V8[Q>>16&15|64]+V8[Q>>24&255]+"-"+V8[$&63|128]+V8[$>>8&255]+"-"+V8[$>>16&255]+V8[$>>24&255]+V8[Z&255]+V8[Z>>8&255]+V8[Z>>16&255]+V8[Z>>24&255]).toLowerCase()}function g0(J,Q,$){return Math.max(Q,Math.min($,J))}function HK(J,Q){return(J%Q+Q)%Q}function HJ(J,Q,$){return(1-$)*J+$*Q}function I7(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function w8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class u0{static{u0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6],this.y=Z[1]*Q+Z[4]*$+Z[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(g0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=this.x-J.x,K=this.y-J.y;return this.x=W*$-K*Z+J.x,this.y=W*Z+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class D9{constructor(J=0,Q=0,$=0,Z=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=Z}static slerpFlat(J,Q,$,Z,W,K,H){let Y=$[Z+0],X=$[Z+1],U=$[Z+2],N=$[Z+3],E=W[K+0],G=W[K+1],D=W[K+2],M=W[K+3];if(N!==M||Y!==E||X!==G||U!==D){let z=Y*E+X*G+U*D+N*M;if(z<0)E=-E,G=-G,D=-D,M=-M,z=-z;let F=1-H;if(z<0.9995){let q=Math.acos(z),A=Math.sin(q);F=Math.sin(F*q)/A,H=Math.sin(H*q)/A,Y=Y*F+E*H,X=X*F+G*H,U=U*F+D*H,N=N*F+M*H}else{Y=Y*F+E*H,X=X*F+G*H,U=U*F+D*H,N=N*F+M*H;let q=1/Math.sqrt(Y*Y+X*X+U*U+N*N);Y*=q,X*=q,U*=q,N*=q}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=N}static multiplyQuaternionsFlat(J,Q,$,Z,W,K){let H=$[Z],Y=$[Z+1],X=$[Z+2],U=$[Z+3],N=W[K],E=W[K+1],G=W[K+2],D=W[K+3];return J[Q]=H*D+U*N+Y*G-X*E,J[Q+1]=Y*D+U*E+X*N-H*G,J[Q+2]=X*D+U*G+H*E-Y*N,J[Q+3]=U*D-H*N-Y*E-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,Z){return this._x=J,this._y=Q,this._z=$,this._w=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:Z,_z:W,_order:K}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(Z/2),N=H(W/2),E=Y($/2),G=Y(Z/2),D=Y(W/2);switch(K){case"XYZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"YXZ":this._x=E*U*N+X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"ZXY":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N-E*G*D;break;case"ZYX":this._x=E*U*N-X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N+E*G*D;break;case"YZX":this._x=E*U*N+X*G*D,this._y=X*G*N+E*U*D,this._z=X*U*D-E*G*N,this._w=X*U*N-E*G*D;break;case"XZY":this._x=E*U*N-X*G*D,this._y=X*G*N-E*U*D,this._z=X*U*D+E*G*N,this._w=X*U*N+E*G*D;break;default:_0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,Z=Math.sin($);return this._x=J.x*Z,this._y=J.y*Z,this._z=J.z*Z,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],Z=Q[4],W=Q[8],K=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],N=Q[10],E=$+H+N;if(E>0){let G=0.5/Math.sqrt(E+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(W-X)*G,this._z=(K-Z)*G}else if($>H&&$>N){let G=2*Math.sqrt(1+$-H-N);this._w=(U-Y)/G,this._x=0.25*G,this._y=(Z+K)/G,this._z=(W+X)/G}else if(H>N){let G=2*Math.sqrt(1+H-$-N);this._w=(W-X)/G,this._x=(Z+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+N-$-H);this._w=(K-Z)/G,this._x=(W+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(g0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let Z=Math.min(1,Q/$);return this.slerp(J,Z),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+K*H+Z*X-W*Y,this._y=Z*U+K*Y+W*H-$*X,this._z=W*U+K*X+$*Y-Z*H,this._w=K*U-$*H-Z*Y-W*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:Z,_z:W,_w:K}=J,H=this.dot(J);if(H<0)$=-$,Z=-Z,W=-W,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+Z*Q,this._z=this._z*Y+W*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),Z=Math.sqrt(1-$),W=Math.sqrt($);return this.set(Z*Math.sin(J),Z*Math.cos(J),W*Math.sin(Q),W*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class y{static{y.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(P$.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(P$.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6]*Z,this.y=W[1]*Q+W[4]*$+W[7]*Z,this.z=W[2]*Q+W[5]*$+W[8]*Z,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements,K=1/(W[3]*Q+W[7]*$+W[11]*Z+W[15]);return this.x=(W[0]*Q+W[4]*$+W[8]*Z+W[12])*K,this.y=(W[1]*Q+W[5]*$+W[9]*Z+W[13])*K,this.z=(W[2]*Q+W[6]*$+W[10]*Z+W[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,Z=this.z,W=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*Z-H*$),U=2*(H*Q-W*Z),N=2*(W*$-K*Q);return this.x=Q+Y*X+K*N-H*U,this.y=$+Y*U+H*X-W*N,this.z=Z+Y*N+W*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,Z=this.z,W=J.elements;return this.x=W[0]*Q+W[4]*$+W[8]*Z,this.y=W[1]*Q+W[5]*$+W[9]*Z,this.z=W[2]*Q+W[6]*$+W[10]*Z,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this.z=g0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this.z=g0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:Z,z:W}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=Z*Y-W*H,this.y=W*K-$*Y,this.z=$*H-Z*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return YJ.copy(this).projectOnVector(J),this.sub(YJ)}reflect(J){return this.sub(YJ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(g0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,Z=this.z-J.z;return Q*Q+$*$+Z*Z}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let Z=Math.sin(Q)*J;return this.x=Z*Math.sin($),this.y=Math.cos(Q)*J,this.z=Z*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),Z=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=Z,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var YJ=new y,P$=new D9;class P0{static{P0.prototype.isMatrix3=!0}constructor(J,Q,$,Z,W,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,X)}set(J,Q,$,Z,W,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=Z,U[2]=H,U[3]=Q,U[4]=W,U[5]=Y,U[6]=$,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],N=$[7],E=$[2],G=$[5],D=$[8],M=Z[0],z=Z[3],F=Z[6],q=Z[1],A=Z[4],w=Z[7],V=Z[2],_=Z[5],I=Z[8];return W[0]=K*M+H*q+Y*V,W[3]=K*z+H*A+Y*_,W[6]=K*F+H*w+Y*I,W[1]=X*M+U*q+N*V,W[4]=X*z+U*A+N*_,W[7]=X*F+U*w+N*I,W[2]=E*M+G*q+D*V,W[5]=E*z+G*A+D*_,W[8]=E*F+G*w+D*I,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*K*U-Q*H*X-$*W*U+$*H*Y+Z*W*X-Z*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=U*K-H*X,E=H*Y-U*W,G=X*W-K*Y,D=Q*N+$*E+Z*G;if(D===0)return this.set(0,0,0,0,0,0,0,0,0);let M=1/D;return J[0]=N*M,J[1]=(Z*X-U*$)*M,J[2]=(H*$-Z*K)*M,J[3]=E*M,J[4]=(U*Q-Z*Y)*M,J[5]=(Z*W-H*Q)*M,J[6]=G*M,J[7]=($*Y-X*Q)*M,J[8]=(K*Q-$*W)*M,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,Z,W,K,H){let Y=Math.cos(W),X=Math.sin(W);return this.set($*Y,$*X,-$*(Y*K+X*H)+K+J,-Z*X,Z*Y,-Z*(-X*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return h9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(XJ.makeScale(J,Q)),this}rotate(J){return h9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(XJ.makeRotation(-J)),this}translate(J,Q){return h9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(XJ.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<9;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var XJ=new P0,T$=new P0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),S$=new P0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function YK(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(W,K,H){if(this.enabled===!1||K===H||!K||!H)return W;if(this.spaces[K].transfer==="srgb")W.r=N9(W.r),W.g=N9(W.g),W.b=N9(W.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)W.applyMatrix3(this.spaces[K].toXYZ),W.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")W.r=E7(W.r),W.g=E7(W.g),W.b=E7(W.b);return W},workingToColorSpace:function(W,K){return this.convert(W,this.workingColorSpace,K)},colorSpaceToWorking:function(W,K){return this.convert(W,K,this.workingColorSpace)},getPrimaries:function(W){return this.spaces[W].primaries},getTransfer:function(W){if(W==="")return"linear";return this.spaces[W].transfer},getToneMappingMode:function(W){return this.spaces[W].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(W,K=this.workingColorSpace){return W.fromArray(this.spaces[K].luminanceCoefficients)},define:function(W){Object.assign(this.spaces,W)},_getMatrix:function(W,K,H){return W.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(W){return this.spaces[W].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(W=this.workingColorSpace){return this.spaces[W].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(W,K){return h9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(W,K)},toWorkingColorSpace:function(W,K){return h9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(W,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],Z=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:Z,transfer:"linear",toXYZ:T$,fromXYZ:S$,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:Z,transfer:"srgb",toXYZ:T$,fromXYZ:S$,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var h0=YK();function N9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function E7(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var e9;class SQ{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(e9===void 0)e9=T7("canvas");e9.width=J.width,e9.height=J.height;let Z=e9.getContext("2d");if(J instanceof ImageData)Z.putImageData(J,0,0);else Z.drawImage(J,0,0,J.width,J.height);$=e9}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=T7("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let Z=$.getImageData(0,0,J.width,J.height),W=Z.data;for(let K=0;K<W.length;K++)W[K]=N9(W[K]/255)*255;return $.putImageData(Z,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(N9(Q[$]/255)*255);else Q[$]=N9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return _0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var XK=0;class h7{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:XK++}),this.uuid=b7(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},Z=this.data;if(Z!==null){let W;if(Array.isArray(Z)){W=[];for(let K=0,H=Z.length;K<H;K++)if(Z[K].isDataTexture)W.push(UJ(Z[K].image));else W.push(UJ(Z[K]))}else W=UJ(Z);$.url=W}if(!Q)J.images[this.uuid]=$;return $}}function UJ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return SQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return _0("Texture: Unable to serialize Texture."),{}}var UK=0,GJ=new y;class z8 extends F9{constructor(J=z8.DEFAULT_IMAGE,Q=z8.DEFAULT_MAPPING,$=1001,Z=1001,W=1006,K=1008,H=1023,Y=1009,X=z8.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:UK++}),this.uuid=b7(),this.name="",this.source=new h7(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=Z,this.magFilter=W,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new u0(0,0),this.repeat=new u0(1,1),this.center=new u0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new P0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(GJ).x}get height(){return this.source.getSize(GJ).y}get depth(){return this.source.getSize(GJ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){_0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){_0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(Z&&$&&(Z.isVector2&&$.isVector2))Z.copy($);else if(Z&&$&&(Z.isVector3&&$.isVector3))Z.copy($);else if(Z&&$&&(Z.isMatrix3&&$.isMatrix3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}z8.DEFAULT_IMAGE=null;z8.DEFAULT_MAPPING=300;z8.DEFAULT_ANISOTROPY=1;class K8{static{K8.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,Z=1){this.x=J,this.y=Q,this.z=$,this.w=Z}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,Z){return this.x=J,this.y=Q,this.z=$,this.w=Z,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,Z=this.z,W=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*Z+K[12]*W,this.y=K[1]*Q+K[5]*$+K[9]*Z+K[13]*W,this.z=K[2]*Q+K[6]*$+K[10]*Z+K[14]*W,this.w=K[3]*Q+K[7]*$+K[11]*Z+K[15]*W,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,Z,W,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],N=Y[8],E=Y[1],G=Y[5],D=Y[9],M=Y[2],z=Y[6],F=Y[10];if(Math.abs(U-E)<0.01&&Math.abs(N-M)<0.01&&Math.abs(D-z)<0.01){if(Math.abs(U+E)<0.1&&Math.abs(N+M)<0.1&&Math.abs(D+z)<0.1&&Math.abs(X+G+F-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let A=(X+1)/2,w=(G+1)/2,V=(F+1)/2,_=(U+E)/4,I=(N+M)/4,P=(D+z)/4;if(A>w&&A>V)if(A<0.01)$=0,Z=0.707106781,W=0.707106781;else $=Math.sqrt(A),Z=_/$,W=I/$;else if(w>V)if(w<0.01)$=0.707106781,Z=0,W=0.707106781;else Z=Math.sqrt(w),$=_/Z,W=P/Z;else if(V<0.01)$=0.707106781,Z=0.707106781,W=0;else W=Math.sqrt(V),$=I/W,Z=P/W;return this.set($,Z,W,Q),this}let q=Math.sqrt((z-D)*(z-D)+(N-M)*(N-M)+(E-U)*(E-U));if(Math.abs(q)<0.001)q=1;return this.x=(z-D)/q,this.y=(N-M)/q,this.z=(E-U)/q,this.w=Math.acos((X+G+F-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=g0(this.x,J.x,Q.x),this.y=g0(this.y,J.y,Q.y),this.z=g0(this.z,J.z,Q.z),this.w=g0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=g0(this.x,J,Q),this.y=g0(this.y,J,Q),this.z=g0(this.z,J,Q),this.w=g0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(g0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class jQ extends F9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new K8(0,0,J,Q),this.scissorTest=!1,this.viewport=new K8(0,0,J,Q),this.textures=[];let Z={width:J,height:Q,depth:$.depth},W=new z8(Z),K=$.count;for(let H=0;H<K;H++)this.textures[H]=W.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let Z=0,W=this.textures.length;Z<W;Z++)if(this.textures[Z].image.width=J,this.textures[Z].image.height=Q,this.textures[Z].image.depth=$,this.textures[Z].isData3DTexture!==!0)this.textures[Z].isArrayTexture=this.textures[Z].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let Z=Object.assign({},J.textures[Q].image);this.textures[Q].source=new h7(Z)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class d8 extends jQ{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class b6 extends z8{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class vQ extends z8{constructor(J=null,Q=1,$=1,Z=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:Z},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Z8{static{Z8.prototype.isMatrix4=!0}constructor(J,Q,$,Z,W,K,H,Y,X,U,N,E,G,D,M,z){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,Z,W,K,H,Y,X,U,N,E,G,D,M,z)}set(J,Q,$,Z,W,K,H,Y,X,U,N,E,G,D,M,z){let F=this.elements;return F[0]=J,F[4]=Q,F[8]=$,F[12]=Z,F[1]=W,F[5]=K,F[9]=H,F[13]=Y,F[2]=X,F[6]=U,F[10]=N,F[14]=E,F[3]=G,F[7]=D,F[11]=M,F[15]=z,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Z8().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,Z=1/J7.setFromMatrixColumn(J,0).length(),W=1/J7.setFromMatrixColumn(J,1).length(),K=1/J7.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*Z,Q[1]=$[1]*Z,Q[2]=$[2]*Z,Q[3]=0,Q[4]=$[4]*W,Q[5]=$[5]*W,Q[6]=$[6]*W,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(Z),X=Math.sin(Z),U=Math.cos(W),N=Math.sin(W);if(J.order==="XYZ"){let E=K*U,G=K*N,D=H*U,M=H*N;Q[0]=Y*U,Q[4]=-Y*N,Q[8]=X,Q[1]=G+D*X,Q[5]=E-M*X,Q[9]=-H*Y,Q[2]=M-E*X,Q[6]=D+G*X,Q[10]=K*Y}else if(J.order==="YXZ"){let E=Y*U,G=Y*N,D=X*U,M=X*N;Q[0]=E+M*H,Q[4]=D*H-G,Q[8]=K*X,Q[1]=K*N,Q[5]=K*U,Q[9]=-H,Q[2]=G*H-D,Q[6]=M+E*H,Q[10]=K*Y}else if(J.order==="ZXY"){let E=Y*U,G=Y*N,D=X*U,M=X*N;Q[0]=E-M*H,Q[4]=-K*N,Q[8]=D+G*H,Q[1]=G+D*H,Q[5]=K*U,Q[9]=M-E*H,Q[2]=-K*X,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let E=K*U,G=K*N,D=H*U,M=H*N;Q[0]=Y*U,Q[4]=D*X-G,Q[8]=E*X+M,Q[1]=Y*N,Q[5]=M*X+E,Q[9]=G*X-D,Q[2]=-X,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let E=K*Y,G=K*X,D=H*Y,M=H*X;Q[0]=Y*U,Q[4]=M-E*N,Q[8]=D*N+G,Q[1]=N,Q[5]=K*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*N+D,Q[10]=E-M*N}else if(J.order==="XZY"){let E=K*Y,G=K*X,D=H*Y,M=H*X;Q[0]=Y*U,Q[4]=-N,Q[8]=X*U,Q[1]=E*N+M,Q[5]=K*U,Q[9]=G*N-D,Q[2]=D*N-G,Q[6]=H*U,Q[10]=M*N+E}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(GK,J,NK)}lookAt(J,Q,$){let Z=this.elements;if(j8.subVectors(J,Q),j8.lengthSq()===0)j8.z=1;if(j8.normalize(),M9.crossVectors($,j8),M9.lengthSq()===0){if(Math.abs($.z)===1)j8.x+=0.0001;else j8.z+=0.0001;j8.normalize(),M9.crossVectors($,j8)}return M9.normalize(),i7.crossVectors(j8,M9),Z[0]=M9.x,Z[4]=i7.x,Z[8]=j8.x,Z[1]=M9.y,Z[5]=i7.y,Z[9]=j8.y,Z[2]=M9.z,Z[6]=i7.z,Z[10]=j8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,Z=Q.elements,W=this.elements,K=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],N=$[5],E=$[9],G=$[13],D=$[2],M=$[6],z=$[10],F=$[14],q=$[3],A=$[7],w=$[11],V=$[15],_=Z[0],I=Z[4],P=Z[8],R=Z[12],B=Z[1],d=Z[5],C=Z[9],m=Z[13],o=Z[2],p=Z[6],n=Z[10],u=Z[14],h=Z[3],t=Z[7],e=Z[11],H0=Z[15];return W[0]=K*_+H*B+Y*o+X*h,W[4]=K*I+H*d+Y*p+X*t,W[8]=K*P+H*C+Y*n+X*e,W[12]=K*R+H*m+Y*u+X*H0,W[1]=U*_+N*B+E*o+G*h,W[5]=U*I+N*d+E*p+G*t,W[9]=U*P+N*C+E*n+G*e,W[13]=U*R+N*m+E*u+G*H0,W[2]=D*_+M*B+z*o+F*h,W[6]=D*I+M*d+z*p+F*t,W[10]=D*P+M*C+z*n+F*e,W[14]=D*R+M*m+z*u+F*H0,W[3]=q*_+A*B+w*o+V*h,W[7]=q*I+A*d+w*p+V*t,W[11]=q*P+A*C+w*n+V*e,W[15]=q*R+A*m+w*u+V*H0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],N=J[6],E=J[10],G=J[14],D=J[3],M=J[7],z=J[11],F=J[15],q=Y*G-X*E,A=H*G-X*N,w=H*E-Y*N,V=K*G-X*U,_=K*E-Y*U,I=K*N-H*U;return Q*(M*q-z*A+F*w)-$*(D*q-z*V+F*_)+Z*(D*A-M*V+F*I)-W*(D*w-M*_+z*I)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],Z=J[8],W=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(K*U-H*X)-$*(W*U-H*Y)+Z*(W*X-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let Z=this.elements;if(J.isVector3)Z[12]=J.x,Z[13]=J.y,Z[14]=J.z;else Z[12]=J,Z[13]=Q,Z[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],Z=J[2],W=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],N=J[9],E=J[10],G=J[11],D=J[12],M=J[13],z=J[14],F=J[15],q=Q*H-$*K,A=Q*Y-Z*K,w=Q*X-W*K,V=$*Y-Z*H,_=$*X-W*H,I=Z*X-W*Y,P=U*M-N*D,R=U*z-E*D,B=U*F-G*D,d=N*z-E*M,C=N*F-G*M,m=E*F-G*z,o=q*m-A*C+w*d+V*B-_*R+I*P;if(o===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let p=1/o;return J[0]=(H*m-Y*C+X*d)*p,J[1]=(Z*C-$*m-W*d)*p,J[2]=(M*I-z*_+F*V)*p,J[3]=(E*_-N*I-G*V)*p,J[4]=(Y*B-K*m-X*R)*p,J[5]=(Q*m-Z*B+W*R)*p,J[6]=(z*w-D*I-F*A)*p,J[7]=(U*I-E*w+G*A)*p,J[8]=(K*C-H*B+X*P)*p,J[9]=($*B-Q*C-W*P)*p,J[10]=(D*_-M*w+F*q)*p,J[11]=(N*w-U*_-G*q)*p,J[12]=(H*R-K*d-Y*P)*p,J[13]=(Q*d-$*R+Z*P)*p,J[14]=(M*A-D*V-z*q)*p,J[15]=(U*V-N*A+E*q)*p,this}scale(J){let Q=this.elements,$=J.x,Z=J.y,W=J.z;return Q[0]*=$,Q[4]*=Z,Q[8]*=W,Q[1]*=$,Q[5]*=Z,Q[9]*=W,Q[2]*=$,Q[6]*=Z,Q[10]*=W,Q[3]*=$,Q[7]*=Z,Q[11]*=W,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],Z=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,Z))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),Z=Math.sin(Q),W=1-$,K=J.x,H=J.y,Y=J.z,X=W*K,U=W*H;return this.set(X*K+$,X*H-Z*Y,X*Y+Z*H,0,X*H+Z*Y,U*H+$,U*Y-Z*K,0,X*Y-Z*H,U*Y+Z*K,W*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,Z,W,K){return this.set(1,$,W,0,J,1,K,0,Q,Z,1,0,0,0,0,1),this}compose(J,Q,$){let Z=this.elements,W=Q._x,K=Q._y,H=Q._z,Y=Q._w,X=W+W,U=K+K,N=H+H,E=W*X,G=W*U,D=W*N,M=K*U,z=K*N,F=H*N,q=Y*X,A=Y*U,w=Y*N,V=$.x,_=$.y,I=$.z;return Z[0]=(1-(M+F))*V,Z[1]=(G+w)*V,Z[2]=(D-A)*V,Z[3]=0,Z[4]=(G-w)*_,Z[5]=(1-(E+F))*_,Z[6]=(z+q)*_,Z[7]=0,Z[8]=(D+A)*I,Z[9]=(z-q)*I,Z[10]=(1-(E+M))*I,Z[11]=0,Z[12]=J.x,Z[13]=J.y,Z[14]=J.z,Z[15]=1,this}decompose(J,Q,$){let Z=this.elements;J.x=Z[12],J.y=Z[13],J.z=Z[14];let W=this.determinantAffine();if(W===0)return $.set(1,1,1),Q.identity(),this;let K=J7.set(Z[0],Z[1],Z[2]).length(),H=J7.set(Z[4],Z[5],Z[6]).length(),Y=J7.set(Z[8],Z[9],Z[10]).length();if(W<0)K=-K;c8.copy(this);let X=1/K,U=1/H,N=1/Y;return c8.elements[0]*=X,c8.elements[1]*=X,c8.elements[2]*=X,c8.elements[4]*=U,c8.elements[5]*=U,c8.elements[6]*=U,c8.elements[8]*=N,c8.elements[9]*=N,c8.elements[10]*=N,Q.setFromRotationMatrix(c8),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,Z,W,K,H=2000,Y=!1){let X=this.elements,U=2*W/(Q-J),N=2*W/($-Z),E=(Q+J)/(Q-J),G=($+Z)/($-Z),D,M;if(Y)D=W/(K-W),M=K*W/(K-W);else if(H===2000)D=-(K+W)/(K-W),M=-2*K*W/(K-W);else if(H===2001)D=-K/(K-W),M=-K*W/(K-W);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=E,X[12]=0,X[1]=0,X[5]=N,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=D,X[14]=M,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,Z,W,K,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),N=2/($-Z),E=-(Q+J)/(Q-J),G=-($+Z)/($-Z),D,M;if(Y)D=1/(K-W),M=K/(K-W);else if(H===2000)D=-2/(K-W),M=-(K+W)/(K-W);else if(H===2001)D=-1/(K-W),M=-W/(K-W);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=E,X[1]=0,X[5]=N,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=D,X[14]=M,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let Z=0;Z<16;Z++)if(Q[Z]!==$[Z])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var J7=new y,c8=new Z8,GK=new y(0,0,0),NK=new y(1,1,1),M9=new y,i7=new y,j8=new y,j$=new Z8,v$=new D9;class _9{constructor(J=0,Q=0,$=0,Z=_9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=Z}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,Z=this._order){return this._x=J,this._y=Q,this._z=$,this._order=Z,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let Z=J.elements,W=Z[0],K=Z[4],H=Z[8],Y=Z[1],X=Z[5],U=Z[9],N=Z[2],E=Z[6],G=Z[10];switch(Q){case"XYZ":if(this._y=Math.asin(g0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,W);else this._x=Math.atan2(E,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-g0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-N,W),this._z=0;break;case"ZXY":if(this._x=Math.asin(g0(E,-1,1)),Math.abs(E)<0.9999999)this._y=Math.atan2(-N,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,W);break;case"ZYX":if(this._y=Math.asin(-g0(N,-1,1)),Math.abs(N)<0.9999999)this._x=Math.atan2(E,G),this._z=Math.atan2(Y,W);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(g0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-N,W);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-g0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(E,X),this._y=Math.atan2(H,W);else this._x=Math.atan2(-U,G),this._y=0;break;default:_0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return j$.makeRotationFromQuaternion(J),this.setFromRotationMatrix(j$,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return v$.setFromEuler(this),this.setFromQuaternion(v$,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_9.DEFAULT_ORDER="XYZ";class h6{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var EK=0,y$=new y,Q7=new D9,K9=new Z8,o7=new y,_7=new y,qK=new y,FK=new D9,f$=new y(1,0,0),b$=new y(0,1,0),h$=new y(0,0,1),x$={type:"added"},DK={type:"removed"},$7={type:"childadded",child:null},NJ={type:"childremoved",child:null};class I8 extends F9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:EK++}),this.uuid=b7(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=I8.DEFAULT_UP.clone();let J=new y,Q=new _9,$=new D9,Z=new y(1,1,1);function W(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(W),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:Z},modelViewMatrix:{value:new Z8},normalMatrix:{value:new P0}}),this.matrix=new Z8,this.matrixWorld=new Z8,this.matrixAutoUpdate=I8.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=I8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new h6,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return Q7.setFromAxisAngle(J,Q),this.quaternion.multiply(Q7),this}rotateOnWorldAxis(J,Q){return Q7.setFromAxisAngle(J,Q),this.quaternion.premultiply(Q7),this}rotateX(J){return this.rotateOnAxis(f$,J)}rotateY(J){return this.rotateOnAxis(b$,J)}rotateZ(J){return this.rotateOnAxis(h$,J)}translateOnAxis(J,Q){return y$.copy(J).applyQuaternion(this.quaternion),this.position.add(y$.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(f$,J)}translateY(J){return this.translateOnAxis(b$,J)}translateZ(J){return this.translateOnAxis(h$,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(K9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)o7.copy(J);else o7.set(J,Q,$);let Z=this.parent;if(this.updateWorldMatrix(!0,!1),_7.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)K9.lookAt(_7,o7,this.up);else K9.lookAt(o7,_7,this.up);if(this.quaternion.setFromRotationMatrix(K9),Z)K9.extractRotation(Z.matrixWorld),Q7.setFromRotationMatrix(K9),this.quaternion.premultiply(Q7.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return w0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(x$),$7.child=J,this.dispatchEvent($7),$7.child=null;else w0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(DK),NJ.child=J,this.dispatchEvent(NJ),NJ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),K9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),K9.multiply(J.parent.matrixWorld);return J.applyMatrix4(K9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(x$),$7.child=J,this.dispatchEvent($7),$7.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,Z=this.children.length;$<Z;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let Z=this.children;for(let W=0,K=Z.length;W<K;W++)Z[W].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_7,J,qK),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(_7,FK,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:Z}=J,W=this.matrix.elements;W[12]+=Q-W[0]*Q-W[4]*$-W[8]*Z,W[13]+=$-W[1]*Q-W[5]*$-W[9]*Z,W[14]+=Z-W[2]*Q-W[6]*$-W[10]*Z}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,Z=Q.length;$<Z;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let Z=this.parent;if(J===!0&&Z!==null)Z.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let W=this.children;for(let K=0,H=W.length;K<H;K++)W[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let Z={};if(Z.uuid=this.uuid,Z.type=this.type,this.name!=="")Z.name=this.name;if(this.castShadow===!0)Z.castShadow=!0;if(this.receiveShadow===!0)Z.receiveShadow=!0;if(this.visible===!1)Z.visible=!1;if(this.frustumCulled===!1)Z.frustumCulled=!1;if(this.renderOrder!==0)Z.renderOrder=this.renderOrder;if(this.static!==!1)Z.static=this.static;if(Object.keys(this.userData).length>0)Z.userData=this.userData;if(Z.layers=this.layers.mask,Z.matrix=this.matrix.toArray(),Z.up=this.up.toArray(),this.pivot!==null)Z.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)Z.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)Z.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)Z.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(Z.type="InstancedMesh",Z.count=this.count,Z.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)Z.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(Z.type="BatchedMesh",Z.perObjectFrustumCulled=this.perObjectFrustumCulled,Z.sortObjects=this.sortObjects,Z.drawRanges=this._drawRanges,Z.reservedRanges=this._reservedRanges,Z.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),Z.instanceInfo=this._instanceInfo.map((H)=>({...H})),Z.availableInstanceIds=this._availableInstanceIds.slice(),Z.availableGeometryIds=this._availableGeometryIds.slice(),Z.nextIndexStart=this._nextIndexStart,Z.nextVertexStart=this._nextVertexStart,Z.geometryCount=this._geometryCount,Z.maxInstanceCount=this._maxInstanceCount,Z.maxVertexCount=this._maxVertexCount,Z.maxIndexCount=this._maxIndexCount,Z.geometryInitialized=this._geometryInitialized,Z.matricesTexture=this._matricesTexture.toJSON(J),Z.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)Z.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)Z.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)Z.boundingBox=this.boundingBox.toJSON()}function W(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)Z.background=this.background.toJSON();else if(this.background.isTexture)Z.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)Z.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){Z.geometry=W(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let N=Y[X];W(J.shapes,N)}else W(J.shapes,Y)}}if(this.isSkinnedMesh){if(Z.bindMode=this.bindMode,Z.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)W(J.skeletons,this.skeleton),Z.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(W(J.materials,this.material[Y]));Z.material=H}else Z.material=W(J.materials,this.material);if(this.children.length>0){Z.children=[];for(let H=0;H<this.children.length;H++)Z.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){Z.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];Z.animations.push(W(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),N=K(J.shapes),E=K(J.skeletons),G=K(J.animations),D=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(N.length>0)$.shapes=N;if(E.length>0)$.skeletons=E;if(G.length>0)$.animations=G;if(D.length>0)$.nodes=D}return $.object=Z,$;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let Z=J.children[$];this.add(Z.clone())}return this}}I8.DEFAULT_UP=new y(0,1,0);I8.DEFAULT_MATRIX_AUTO_UPDATE=!0;I8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class N7 extends I8{constructor(){super();this.isGroup=!0,this.type="Group"}}var OK={type:"move"};class x7{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new N7,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new N7,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new y;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new N7,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new y,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let Z=null,W=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let M of J.hand.values()){let z=Q.getJointPose(M,$),F=this._getHandJoint(X,M);if(z!==null)F.matrix.fromArray(z.transform.matrix),F.matrix.decompose(F.position,F.rotation,F.scale),F.matrixWorldNeedsUpdate=!0,F.jointRadius=z.radius;F.visible=z!==null}let U=X.joints["index-finger-tip"],N=X.joints["thumb-tip"],E=U.position.distanceTo(N.position),G=0.02,D=0.005;if(X.inputState.pinching&&E>G+D)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&E<=G-D)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(W=Q.getPose(J.gripSpace,$),W!==null){if(Y.matrix.fromArray(W.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,W.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(W.linearVelocity);else Y.hasLinearVelocity=!1;if(W.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(W.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(Z=Q.getPose(J.targetRaySpace,$),Z===null&&W!==null)Z=W;if(Z!==null){if(H.matrix.fromArray(Z.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,Z.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(Z.linearVelocity);else H.hasLinearVelocity=!1;if(Z.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(Z.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(OK)}}}if(H!==null)H.visible=Z!==null;if(Y!==null)Y.visible=W!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new N7;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var rZ={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},L9={h:0,s:0,l:0},a7={h:0,s:0,l:0};function EJ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class x0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let Z=J;if(Z&&Z.isColor)this.copy(Z);else if(typeof Z==="number")this.setHex(Z);else if(typeof Z==="string")this.setStyle(Z)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,h0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,Z=h0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,h0.colorSpaceToWorking(this,Z),this}setHSL(J,Q,$,Z=h0.workingColorSpace){if(J=HK(J,1),Q=g0(Q,0,1),$=g0($,0,1),Q===0)this.r=this.g=this.b=$;else{let W=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-W;this.r=EJ(K,W,J+0.3333333333333333),this.g=EJ(K,W,J),this.b=EJ(K,W,J-0.3333333333333333)}return h0.colorSpaceToWorking(this,Z),this}setStyle(J,Q="srgb"){function $(W){if(W===void 0)return;if(parseFloat(W)<1)_0("Color: Alpha component of "+J+" will be ignored.")}let Z;if(Z=/^(\w+)\(([^\)]*)\)/.exec(J)){let W,K=Z[1],H=Z[2];switch(K){case"rgb":case"rgba":if(W=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(255,parseInt(W[1],10))/255,Math.min(255,parseInt(W[2],10))/255,Math.min(255,parseInt(W[3],10))/255,Q);if(W=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setRGB(Math.min(100,parseInt(W[1],10))/100,Math.min(100,parseInt(W[2],10))/100,Math.min(100,parseInt(W[3],10))/100,Q);break;case"hsl":case"hsla":if(W=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(W[4]),this.setHSL(parseFloat(W[1])/360,parseFloat(W[2])/100,parseFloat(W[3])/100,Q);break;default:_0("Color: Unknown color model "+J)}}else if(Z=/^\#([A-Fa-f\d]+)$/.exec(J)){let W=Z[1],K=W.length;if(K===3)return this.setRGB(parseInt(W.charAt(0),16)/15,parseInt(W.charAt(1),16)/15,parseInt(W.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(W,16),Q);else _0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=rZ[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else _0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=N9(J.r),this.g=N9(J.g),this.b=N9(J.b),this}copyLinearToSRGB(J){return this.r=E7(J.r),this.g=E7(J.g),this.b=E7(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return h0.workingToColorSpace(B8.copy(this),J),Math.round(g0(B8.r*255,0,255))*65536+Math.round(g0(B8.g*255,0,255))*256+Math.round(g0(B8.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=h0.workingColorSpace){h0.workingToColorSpace(B8.copy(this),Q);let{r:$,g:Z,b:W}=B8,K=Math.max($,Z,W),H=Math.min($,Z,W),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let N=K-H;switch(X=U<=0.5?N/(K+H):N/(2-K-H),K){case $:Y=(Z-W)/N+(Z<W?6:0);break;case Z:Y=(W-$)/N+2;break;case W:Y=($-Z)/N+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=h0.workingColorSpace){return h0.workingToColorSpace(B8.copy(this),Q),J.r=B8.r,J.g=B8.g,J.b=B8.b,J}getStyle(J="srgb"){h0.workingToColorSpace(B8.copy(this),J);let{r:Q,g:$,b:Z}=B8;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${Z.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(Z*255)})`}offsetHSL(J,Q,$){return this.getHSL(L9),this.setHSL(L9.h+J,L9.s+Q,L9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(L9),J.getHSL(a7);let $=HJ(L9.h,a7.h,Q),Z=HJ(L9.s,a7.s,Q),W=HJ(L9.l,a7.l,Q);return this.setHSL($,Z,W),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,Z=this.b,W=J.elements;return this.r=W[0]*Q+W[3]*$+W[6]*Z,this.g=W[1]*Q+W[4]*$+W[7]*Z,this.b=W[2]*Q+W[5]*$+W[8]*Z,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var B8=new x0;x0.NAMES=rZ;class x6 extends I8{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _9,this.environmentIntensity=1,this.environmentRotation=new _9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var n8=new y,H9=new y,qJ=new y,Y9=new y,Z7=new y,W7=new y,g$=new y,FJ=new y,DJ=new y,OJ=new y,RJ=new K8,kJ=new K8,MJ=new K8;class l8{constructor(J=new y,Q=new y,$=new y){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,Z){Z.subVectors($,Q),n8.subVectors(J,Q),Z.cross(n8);let W=Z.lengthSq();if(W>0)return Z.multiplyScalar(1/Math.sqrt(W));return Z.set(0,0,0)}static getBarycoord(J,Q,$,Z,W){n8.subVectors(Z,Q),H9.subVectors($,Q),qJ.subVectors(J,Q);let K=n8.dot(n8),H=n8.dot(H9),Y=n8.dot(qJ),X=H9.dot(H9),U=H9.dot(qJ),N=K*X-H*H;if(N===0)return W.set(0,0,0),null;let E=1/N,G=(X*Y-H*U)*E,D=(K*U-H*Y)*E;return W.set(1-G-D,D,G)}static containsPoint(J,Q,$,Z){if(this.getBarycoord(J,Q,$,Z,Y9)===null)return!1;return Y9.x>=0&&Y9.y>=0&&Y9.x+Y9.y<=1}static getInterpolation(J,Q,$,Z,W,K,H,Y){if(this.getBarycoord(J,Q,$,Z,Y9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(W,Y9.x),Y.addScaledVector(K,Y9.y),Y.addScaledVector(H,Y9.z),Y}static getInterpolatedAttribute(J,Q,$,Z,W,K){return RJ.setScalar(0),kJ.setScalar(0),MJ.setScalar(0),RJ.fromBufferAttribute(J,Q),kJ.fromBufferAttribute(J,$),MJ.fromBufferAttribute(J,Z),K.setScalar(0),K.addScaledVector(RJ,W.x),K.addScaledVector(kJ,W.y),K.addScaledVector(MJ,W.z),K}static isFrontFacing(J,Q,$,Z){return n8.subVectors($,Q),H9.subVectors(J,Q),n8.cross(H9).dot(Z)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,Z){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[Z]),this}setFromAttributeAndIndices(J,Q,$,Z){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,Z),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return n8.subVectors(this.c,this.b),H9.subVectors(this.a,this.b),n8.cross(H9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return l8.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return l8.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,Z,W){return l8.getInterpolation(J,this.a,this.b,this.c,Q,$,Z,W)}containsPoint(J){return l8.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return l8.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,Z=this.b,W=this.c,K,H;Z7.subVectors(Z,$),W7.subVectors(W,$),FJ.subVectors(J,$);let Y=Z7.dot(FJ),X=W7.dot(FJ);if(Y<=0&&X<=0)return Q.copy($);DJ.subVectors(J,Z);let U=Z7.dot(DJ),N=W7.dot(DJ);if(U>=0&&N<=U)return Q.copy(Z);let E=Y*N-U*X;if(E<=0&&Y>=0&&U<=0)return K=Y/(Y-U),Q.copy($).addScaledVector(Z7,K);OJ.subVectors(J,W);let G=Z7.dot(OJ),D=W7.dot(OJ);if(D>=0&&G<=D)return Q.copy(W);let M=G*X-Y*D;if(M<=0&&X>=0&&D<=0)return H=X/(X-D),Q.copy($).addScaledVector(W7,H);let z=U*D-G*N;if(z<=0&&N-U>=0&&G-D>=0)return g$.subVectors(W,Z),H=(N-U)/(N-U+(G-D)),Q.copy(Z).addScaledVector(g$,H);let F=1/(z+M+E);return K=M*F,H=E*F,Q.copy($).addScaledVector(Z7,K).addScaledVector(W7,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class u9{constructor(J=new y(1/0,1/0,1/0),Q=new y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(s8.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(s8.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=s8.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let W=$.getAttribute("position");if(Q===!0&&W!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=W.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,s8);else s8.fromBufferAttribute(W,K);s8.applyMatrix4(J.matrixWorld),this.expandByPoint(s8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();r7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();r7.copy($.boundingBox)}r7.applyMatrix4(J.matrixWorld),this.union(r7)}}let Z=J.children;for(let W=0,K=Z.length;W<K;W++)this.expandByObject(Z[W],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,s8),s8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(A7),t7.subVectors(this.max,A7),K7.subVectors(J.a,A7),H7.subVectors(J.b,A7),Y7.subVectors(J.c,A7),V9.subVectors(H7,K7),B9.subVectors(Y7,H7),v9.subVectors(K7,Y7);let Q=[0,-V9.z,V9.y,0,-B9.z,B9.y,0,-v9.z,v9.y,V9.z,0,-V9.x,B9.z,0,-B9.x,v9.z,0,-v9.x,-V9.y,V9.x,0,-B9.y,B9.x,0,-v9.y,v9.x,0];if(!LJ(Q,K7,H7,Y7,t7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!LJ(Q,K7,H7,Y7,t7))return!1;return e7.crossVectors(V9,B9),Q=[e7.x,e7.y,e7.z],LJ(Q,K7,H7,Y7,t7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,s8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(s8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return X9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),X9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),X9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),X9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),X9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),X9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),X9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),X9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(X9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var X9=[new y,new y,new y,new y,new y,new y,new y,new y],s8=new y,r7=new u9,K7=new y,H7=new y,Y7=new y,V9=new y,B9=new y,v9=new y,A7=new y,t7=new y,e7=new y,y9=new y;function LJ(J,Q,$,Z,W){for(let K=0,H=J.length-3;K<=H;K+=3){y9.fromArray(J,K);let Y=W.x*Math.abs(y9.x)+W.y*Math.abs(y9.y)+W.z*Math.abs(y9.z),X=Q.dot(y9),U=$.dot(y9),N=Z.dot(y9);if(Math.max(-Math.max(X,U,N),Math.min(X,U,N))>Y)return!1}return!0}var G8=new y,J6=new u0,RK=0;class N8 extends F9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:RK++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let Z=0,W=this.itemSize;Z<W;Z++)this.array[J+Z]=Q.array[$+Z];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)J6.fromBufferAttribute(this,Q),J6.applyMatrix3(J),this.setXY(Q,J6.x,J6.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)G8.fromBufferAttribute(this,Q),G8.applyMatrix3(J),this.setXYZ(Q,G8.x,G8.y,G8.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)G8.fromBufferAttribute(this,Q),G8.applyMatrix4(J),this.setXYZ(Q,G8.x,G8.y,G8.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)G8.fromBufferAttribute(this,Q),G8.applyNormalMatrix(J),this.setXYZ(Q,G8.x,G8.y,G8.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)G8.fromBufferAttribute(this,Q),G8.transformDirection(J),this.setXYZ(Q,G8.x,G8.y,G8.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=I7($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=w8($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=I7(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=w8(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=I7(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=w8(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=I7(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=w8(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=I7(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=w8(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=w8(Q,this.array),$=w8($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,Z){if(J*=this.itemSize,this.normalized)Q=w8(Q,this.array),$=w8($,this.array),Z=w8(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this}setXYZW(J,Q,$,Z,W){if(J*=this.itemSize,this.normalized)Q=w8(Q,this.array),$=w8($,this.array),Z=w8(Z,this.array),W=w8(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=Z,this.array[J+3]=W,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class g6 extends N8{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class p6 extends N8{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class f8 extends N8{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var kK=new u9,C7=new y,VJ=new y;class c9{constructor(J=new y,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else kK.setFromPoints(J).getCenter($);let Z=0;for(let W=0,K=J.length;W<K;W++)Z=Math.max(Z,$.distanceToSquared(J[W]));return this.radius=Math.sqrt(Z),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;C7.subVectors(J,this.center);let Q=C7.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),Z=($-this.radius)*0.5;this.center.addScaledVector(C7,Z/$),this.radius+=Z}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else VJ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(C7.copy(J.center).add(VJ)),this.expandByPoint(C7.copy(J.center).sub(VJ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var MK=0,m8=new Z8,BJ=new I8,X7=new y,v8=new u9,w7=new u9,R8=new y;class M8 extends F9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:MK++}),this.uuid=b7(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((WK(J))?p6:g6)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let W=new P0().getNormalMatrix(J);$.applyNormalMatrix(W),$.needsUpdate=!0}let Z=this.attributes.tangent;if(Z!==void 0)Z.transformDirection(J),Z.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return m8.makeRotationFromQuaternion(J),this.applyMatrix4(m8),this}rotateX(J){return m8.makeRotationX(J),this.applyMatrix4(m8),this}rotateY(J){return m8.makeRotationY(J),this.applyMatrix4(m8),this}rotateZ(J){return m8.makeRotationZ(J),this.applyMatrix4(m8),this}translate(J,Q,$){return m8.makeTranslation(J,Q,$),this.applyMatrix4(m8),this}scale(J,Q,$){return m8.makeScale(J,Q,$),this.applyMatrix4(m8),this}lookAt(J){return BJ.lookAt(J),BJ.updateMatrix(),this.applyMatrix4(BJ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(X7).negate(),this.translate(X7.x,X7.y,X7.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let Z=0,W=J.length;Z<W;Z++){let K=J[Z];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new f8($,3))}else{let $=Math.min(J.length,Q.count);for(let Z=0;Z<$;Z++){let W=J[Z];Q.setXYZ(Z,W.x,W.y,W.z||0)}if(J.length>Q.count)_0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new u9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){w0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new y(-1/0,-1/0,-1/0),new y(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,Z=Q.length;$<Z;$++){let W=Q[$];if(v8.setFromBufferAttribute(W),this.morphTargetsRelative)R8.addVectors(this.boundingBox.min,v8.min),this.boundingBox.expandByPoint(R8),R8.addVectors(this.boundingBox.max,v8.max),this.boundingBox.expandByPoint(R8);else this.boundingBox.expandByPoint(v8.min),this.boundingBox.expandByPoint(v8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))w0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new c9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){w0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new y,1/0);return}if(J){let $=this.boundingSphere.center;if(v8.setFromBufferAttribute(J),Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W];if(w7.setFromBufferAttribute(H),this.morphTargetsRelative)R8.addVectors(v8.min,w7.min),v8.expandByPoint(R8),R8.addVectors(v8.max,w7.max),v8.expandByPoint(R8);else v8.expandByPoint(w7.min),v8.expandByPoint(w7.max)}v8.getCenter($);let Z=0;for(let W=0,K=J.count;W<K;W++)R8.fromBufferAttribute(J,W),Z=Math.max(Z,$.distanceToSquared(R8));if(Q)for(let W=0,K=Q.length;W<K;W++){let H=Q[W],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(R8.fromBufferAttribute(H,X),Y)X7.fromBufferAttribute(J,X),R8.add(X7);Z=Math.max(Z,$.distanceToSquared(R8))}}if(this.boundingSphere.radius=Math.sqrt(Z),isNaN(this.boundingSphere.radius))w0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){w0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:Z,uv:W}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new N8(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let P=0;P<$.count;P++)H[P]=new y,Y[P]=new y;let X=new y,U=new y,N=new y,E=new u0,G=new u0,D=new u0,M=new y,z=new y;function F(P,R,B){X.fromBufferAttribute($,P),U.fromBufferAttribute($,R),N.fromBufferAttribute($,B),E.fromBufferAttribute(W,P),G.fromBufferAttribute(W,R),D.fromBufferAttribute(W,B),U.sub(X),N.sub(X),G.sub(E),D.sub(E);let d=1/(G.x*D.y-D.x*G.y);if(!isFinite(d))return;M.copy(U).multiplyScalar(D.y).addScaledVector(N,-G.y).multiplyScalar(d),z.copy(N).multiplyScalar(G.x).addScaledVector(U,-D.x).multiplyScalar(d),H[P].add(M),H[R].add(M),H[B].add(M),Y[P].add(z),Y[R].add(z),Y[B].add(z)}let q=this.groups;if(q.length===0)q=[{start:0,count:J.count}];for(let P=0,R=q.length;P<R;++P){let B=q[P],d=B.start,C=B.count;for(let m=d,o=d+C;m<o;m+=3)F(J.getX(m+0),J.getX(m+1),J.getX(m+2))}let A=new y,w=new y,V=new y,_=new y;function I(P){V.fromBufferAttribute(Z,P),_.copy(V);let R=H[P];A.copy(R),A.sub(V.multiplyScalar(V.dot(R))).normalize(),w.crossVectors(_,R);let d=w.dot(Y[P])<0?-1:1;K.setXYZW(P,A.x,A.y,A.z,d)}for(let P=0,R=q.length;P<R;++P){let B=q[P],d=B.start,C=B.count;for(let m=d,o=d+C;m<o;m+=3)I(J.getX(m+0)),I(J.getX(m+1)),I(J.getX(m+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new N8(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let E=0,G=$.count;E<G;E++)$.setXYZ(E,0,0,0);let Z=new y,W=new y,K=new y,H=new y,Y=new y,X=new y,U=new y,N=new y;if(J)for(let E=0,G=J.count;E<G;E+=3){let D=J.getX(E+0),M=J.getX(E+1),z=J.getX(E+2);Z.fromBufferAttribute(Q,D),W.fromBufferAttribute(Q,M),K.fromBufferAttribute(Q,z),U.subVectors(K,W),N.subVectors(Z,W),U.cross(N),H.fromBufferAttribute($,D),Y.fromBufferAttribute($,M),X.fromBufferAttribute($,z),H.add(U),Y.add(U),X.add(U),$.setXYZ(D,H.x,H.y,H.z),$.setXYZ(M,Y.x,Y.y,Y.z),$.setXYZ(z,X.x,X.y,X.z)}else for(let E=0,G=Q.count;E<G;E+=3)Z.fromBufferAttribute(Q,E+0),W.fromBufferAttribute(Q,E+1),K.fromBufferAttribute(Q,E+2),U.subVectors(K,W),N.subVectors(Z,W),U.cross(N),$.setXYZ(E+0,U.x,U.y,U.z),$.setXYZ(E+1,U.x,U.y,U.z),$.setXYZ(E+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)R8.fromBufferAttribute(J,Q),R8.normalize(),J.setXYZ(Q,R8.x,R8.y,R8.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:N}=H,E=new X.constructor(Y.length*U),G=0,D=0;for(let M=0,z=Y.length;M<z;M++){if(H.isInterleavedBufferAttribute)G=Y[M]*H.data.stride+H.offset;else G=Y[M]*U;for(let F=0;F<U;F++)E[D++]=X[G++]}return new N8(E,U,N)}if(this.index===null)return _0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new M8,$=this.index.array,Z=this.attributes;for(let H in Z){let Y=Z[H],X=J(Y,$);Q.setAttribute(H,X)}let W=this.morphAttributes;for(let H in W){let Y=[],X=W[H];for(let U=0,N=X.length;U<N;U++){let E=X[U],G=J(E,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let Z={},W=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let N=0,E=X.length;N<E;N++){let G=X[N];U.push(G.toJSON(J.data))}if(U.length>0)Z[Y]=U,W=!0}if(W)J.data.morphAttributes=Z,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let Z=J.attributes;for(let X in Z){let U=Z[X];this.setAttribute(X,U.clone(Q))}let W=J.morphAttributes;for(let X in W){let U=[],N=W[X];for(let E=0,G=N.length;E<G;E++)U.push(N[E].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let N=K[X];this.addGroup(N.start,N.count,N.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var LK=0;class w9 extends F9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:LK++}),this.uuid=b7(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new x0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){_0(`Material: parameter '${Q}' has value of undefined.`);continue}let Z=this[Q];if(Z===void 0){_0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(Z&&Z.isColor)Z.set($);else if(Z&&Z.isVector2&&($&&$.isVector2)||Z&&Z.isEuler&&($&&$.isEuler)||Z&&Z.isVector3&&($&&$.isVector3))Z.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function Z(W){let K=[];for(let H in W){let Y=W[H];delete Y.metadata,K.push(Y)}return K}if(Q){let W=Z(J.textures),K=Z(J.images);if(W.length>0)$.textures=W;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new x0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new u0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new u0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let Z=Q.length;$=Array(Z);for(let W=0;W!==Z;++W)$[W]=Q[W].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var U9=new y,zJ=new y,Q6=new y,z9=new y,IJ=new y,$6=new y,_J=new y;class g7{constructor(J=new y,Q=new y(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,U9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=U9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return U9.copy(this.origin).addScaledVector(this.direction,Q),U9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,Z){zJ.copy(J).add(Q).multiplyScalar(0.5),Q6.copy(Q).sub(J).normalize(),z9.copy(this.origin).sub(zJ);let W=J.distanceTo(Q)*0.5,K=-this.direction.dot(Q6),H=z9.dot(this.direction),Y=-z9.dot(Q6),X=z9.lengthSq(),U=Math.abs(1-K*K),N,E,G,D;if(U>0)if(N=K*Y-H,E=K*H-Y,D=W*U,N>=0)if(E>=-D)if(E<=D){let M=1/U;N*=M,E*=M,G=N*(N+K*E+2*H)+E*(K*N+E+2*Y)+X}else E=W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else E=-W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;else if(E<=-D)N=Math.max(0,-(-K*W+H)),E=N>0?-W:Math.min(Math.max(-W,-Y),W),G=-N*N+E*(E+2*Y)+X;else if(E<=D)N=0,E=Math.min(Math.max(-W,-Y),W),G=E*(E+2*Y)+X;else N=Math.max(0,-(K*W+H)),E=N>0?W:Math.min(Math.max(-W,-Y),W),G=-N*N+E*(E+2*Y)+X;else E=K>0?-W:W,N=Math.max(0,-(K*E+H)),G=-N*N+E*(E+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,N);if(Z)Z.copy(zJ).addScaledVector(Q6,E);return G}intersectSphere(J,Q){U9.subVectors(J.center,this.origin);let $=U9.dot(this.direction),Z=U9.dot(U9)-$*$,W=J.radius*J.radius;if(Z>W)return null;let K=Math.sqrt(W-Z),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,Z,W,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,N=1/this.direction.z,E=this.origin;if(X>=0)$=(J.min.x-E.x)*X,Z=(J.max.x-E.x)*X;else $=(J.max.x-E.x)*X,Z=(J.min.x-E.x)*X;if(U>=0)W=(J.min.y-E.y)*U,K=(J.max.y-E.y)*U;else W=(J.max.y-E.y)*U,K=(J.min.y-E.y)*U;if($>K||W>Z)return null;if(W>$||isNaN($))$=W;if(K<Z||isNaN(Z))Z=K;if(N>=0)H=(J.min.z-E.z)*N,Y=(J.max.z-E.z)*N;else H=(J.max.z-E.z)*N,Y=(J.min.z-E.z)*N;if($>Y||H>Z)return null;if(H>$||$!==$)$=H;if(Y<Z||Z!==Z)Z=Y;if(Z<0)return null;return this.at($>=0?$:Z,Q)}intersectsBox(J){return this.intersectBox(J,U9)!==null}intersectTriangle(J,Q,$,Z,W){IJ.subVectors(Q,J),$6.subVectors($,J),_J.crossVectors(IJ,$6);let K=this.direction.dot(_J),H;if(K>0){if(Z)return null;H=1}else if(K<0)H=-1,K=-K;else return null;z9.subVectors(this.origin,J);let Y=H*this.direction.dot($6.crossVectors(z9,$6));if(Y<0)return null;let X=H*this.direction.dot(IJ.cross(z9));if(X<0)return null;if(Y+X>K)return null;let U=-H*z9.dot(_J);if(U<0)return null;return this.at(U/K,W)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class m6 extends w9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new x0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var p$=new Z8,f9=new g7,Z6=new c9,m$=new y,W6=new y,K6=new y,H6=new y,AJ=new y,Y6=new y,l$=new y,X6=new y;class h8 extends I8{constructor(J=new M8,Q=new m6){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}getVertexPosition(J,Q){let $=this.geometry,Z=$.attributes.position,W=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(Z,J);let H=this.morphTargetInfluences;if(W&&H){Y6.set(0,0,0);for(let Y=0,X=W.length;Y<X;Y++){let U=H[Y],N=W[Y];if(U===0)continue;if(AJ.fromBufferAttribute(N,J),K)Y6.addScaledVector(AJ,U);else Y6.addScaledVector(AJ.sub(Q),U)}Q.add(Y6)}return Q}raycast(J,Q){let $=this.geometry,Z=this.material,W=this.matrixWorld;if(Z===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(Z6.copy($.boundingSphere),Z6.applyMatrix4(W),f9.copy(J.ray).recast(J.near),Z6.containsPoint(f9.origin)===!1){if(f9.intersectSphere(Z6,m$)===null)return;if(f9.origin.distanceToSquared(m$)>(J.far-J.near)**2)return}if(p$.copy(W).invert(),f9.copy(J.ray).applyMatrix4(p$),$.boundingBox!==null){if(f9.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,f9)}_computeIntersections(J,Q,$){let Z,W=this.geometry,K=this.material,H=W.index,Y=W.attributes.position,X=W.attributes.uv,U=W.attributes.uv1,N=W.attributes.normal,E=W.groups,G=W.drawRange;if(H!==null)if(Array.isArray(K))for(let D=0,M=E.length;D<M;D++){let z=E[D],F=K[z.materialIndex],q=Math.max(z.start,G.start),A=Math.min(H.count,Math.min(z.start+z.count,G.start+G.count));for(let w=q,V=A;w<V;w+=3){let _=H.getX(w),I=H.getX(w+1),P=H.getX(w+2);if(Z=U6(this,F,J,$,X,U,N,_,I,P),Z)Z.faceIndex=Math.floor(w/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),M=Math.min(H.count,G.start+G.count);for(let z=D,F=M;z<F;z+=3){let q=H.getX(z),A=H.getX(z+1),w=H.getX(z+2);if(Z=U6(this,K,J,$,X,U,N,q,A,w),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}else if(Y!==void 0)if(Array.isArray(K))for(let D=0,M=E.length;D<M;D++){let z=E[D],F=K[z.materialIndex],q=Math.max(z.start,G.start),A=Math.min(Y.count,Math.min(z.start+z.count,G.start+G.count));for(let w=q,V=A;w<V;w+=3){let _=w,I=w+1,P=w+2;if(Z=U6(this,F,J,$,X,U,N,_,I,P),Z)Z.faceIndex=Math.floor(w/3),Z.face.materialIndex=z.materialIndex,Q.push(Z)}}else{let D=Math.max(0,G.start),M=Math.min(Y.count,G.start+G.count);for(let z=D,F=M;z<F;z+=3){let q=z,A=z+1,w=z+2;if(Z=U6(this,K,J,$,X,U,N,q,A,w),Z)Z.faceIndex=Math.floor(z/3),Q.push(Z)}}}}function VK(J,Q,$,Z,W,K,H,Y){let X;if(Q.side===1)X=Z.intersectTriangle(H,K,W,!0,Y);else X=Z.intersectTriangle(W,K,H,Q.side===0,Y);if(X===null)return null;X6.copy(Y),X6.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(X6);if(U<$.near||U>$.far)return null;return{distance:U,point:X6.clone(),object:J}}function U6(J,Q,$,Z,W,K,H,Y,X,U){J.getVertexPosition(Y,W6),J.getVertexPosition(X,K6),J.getVertexPosition(U,H6);let N=VK(J,Q,$,Z,W6,K6,H6,l$);if(N){let E=new y;if(l8.getBarycoord(l$,W6,K6,H6,E),W)N.uv=l8.getInterpolatedAttribute(W,Y,X,U,E,new u0);if(K)N.uv1=l8.getInterpolatedAttribute(K,Y,X,U,E,new u0);if(H){if(N.normal=l8.getInterpolatedAttribute(H,Y,X,U,E,new y),N.normal.dot(Z.direction)>0)N.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new y,materialIndex:0};l8.getNormal(W6,K6,H6,G.normal),N.face=G,N.barycoord=E}return N}class p7 extends z8{constructor(J=null,Q=1,$=1,Z,W,K,H,Y,X=1003,U=1003,N,E){super(null,K,H,Y,X,U,Z,W,N,E);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class l6 extends N8{constructor(J,Q,$,Z=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=Z}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var CJ=new y,BK=new y,zK=new P0;class G9{constructor(J=new y(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,Z){return this.normal.set(J,Q,$),this.constant=Z,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let Z=CJ.subVectors($,Q).cross(BK.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(Z,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let Z=J.delta(CJ),W=this.normal.dot(Z);if(W===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/W;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(Z,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||zK.getNormalMatrix(J),Z=this.coplanarPoint(CJ).applyMatrix4(J),W=this.normal.applyMatrix3($).normalize();return this.constant=-Z.dot(W),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var b9=new c9,IK=new u0(0.5,0.5),G6=new y;class d6{constructor(J=new G9,Q=new G9,$=new G9,Z=new G9,W=new G9,K=new G9){this.planes=[J,Q,$,Z,W,K]}set(J,Q,$,Z,W,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(Z),H[4].copy(W),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let Z=this.planes,W=J.elements,K=W[0],H=W[1],Y=W[2],X=W[3],U=W[4],N=W[5],E=W[6],G=W[7],D=W[8],M=W[9],z=W[10],F=W[11],q=W[12],A=W[13],w=W[14],V=W[15];if(Z[0].setComponents(X-K,G-U,F-D,V-q).normalize(),Z[1].setComponents(X+K,G+U,F+D,V+q).normalize(),Z[2].setComponents(X+H,G+N,F+M,V+A).normalize(),Z[3].setComponents(X-H,G-N,F-M,V-A).normalize(),$)Z[4].setComponents(Y,E,z,w).normalize(),Z[5].setComponents(X-Y,G-E,F-z,V-w).normalize();else if(Z[4].setComponents(X-Y,G-E,F-z,V-w).normalize(),Q===2000)Z[5].setComponents(X+Y,G+E,F+z,V+w).normalize();else if(Q===2001)Z[5].setComponents(Y,E,z,w).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();b9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();b9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(b9)}intersectsSprite(J){b9.center.set(0,0,0);let Q=IK.distanceTo(J.center);return b9.radius=0.7071067811865476+Q,b9.applyMatrix4(J.matrixWorld),this.intersectsSphere(b9)}intersectsSphere(J){let Q=this.planes,$=J.center,Z=-J.radius;for(let W=0;W<6;W++)if(Q[W].distanceToPoint($)<Z)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let Z=Q[$];if(G6.x=Z.normal.x>0?J.max.x:J.min.x,G6.y=Z.normal.y>0?J.max.y:J.min.y,G6.z=Z.normal.z>0?J.max.z:J.min.z,Z.distanceToPoint(G6)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yQ extends w9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new x0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var M6=new y,L6=new y,d$=new Z8,P7=new g7,N6=new c9,wJ=new y,u$=new y;class fQ extends I8{constructor(J=new M8,Q=new yQ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let Z=1,W=Q.count;Z<W;Z++)M6.fromBufferAttribute(Q,Z-1),L6.fromBufferAttribute(Q,Z),$[Z]=$[Z-1],$[Z]+=M6.distanceTo(L6);J.setAttribute("lineDistance",new f8($,1))}else _0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Line.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(N6.copy($.boundingSphere),N6.applyMatrix4(Z),N6.radius+=W,J.ray.intersectsSphere(N6)===!1)return;d$.copy(Z).invert(),P7.copy(J.ray).applyMatrix4(d$);let H=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,E=$.attributes.position;if(U!==null){let G=Math.max(0,K.start),D=Math.min(U.count,K.start+K.count);for(let M=G,z=D-1;M<z;M+=X){let F=U.getX(M),q=U.getX(M+1),A=E6(this,J,P7,Y,F,q,M);if(A)Q.push(A)}if(this.isLineLoop){let M=U.getX(D-1),z=U.getX(G),F=E6(this,J,P7,Y,M,z,D-1);if(F)Q.push(F)}}else{let G=Math.max(0,K.start),D=Math.min(E.count,K.start+K.count);for(let M=G,z=D-1;M<z;M+=X){let F=E6(this,J,P7,Y,M,M+1,M);if(F)Q.push(F)}if(this.isLineLoop){let M=E6(this,J,P7,Y,D-1,G,D-1);if(M)Q.push(M)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}}function E6(J,Q,$,Z,W,K,H){let Y=J.geometry.attributes.position;if(M6.fromBufferAttribute(Y,W),L6.fromBufferAttribute(Y,K),$.distanceSqToSegment(M6,L6,wJ,u$)>Z)return;wJ.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(wJ);if(U<Q.near||U>Q.far)return;return{distance:U,point:u$.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var c$=new y,n$=new y;class u6 extends fQ{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let Z=0,W=Q.count;Z<W;Z+=2)c$.fromBufferAttribute(Q,Z),n$.fromBufferAttribute(Q,Z+1),$[Z]=Z===0?0:$[Z-1],$[Z+1]=$[Z]+c$.distanceTo(n$);J.setAttribute("lineDistance",new f8($,1))}else _0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class bQ extends w9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new x0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var s$=new Z8,PJ=new g7,q6=new c9,F6=new y;class m7 extends I8{constructor(J=new M8,Q=new bQ){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Q){let $=this.geometry,Z=this.matrixWorld,W=J.params.Points.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(q6.copy($.boundingSphere),q6.applyMatrix4(Z),q6.radius+=W,J.ray.intersectsSphere(q6)===!1)return;s$.copy(Z).invert(),PJ.copy(J.ray).applyMatrix4(s$);let H=W/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=$.index,N=$.attributes.position;if(X!==null){let E=Math.max(0,K.start),G=Math.min(X.count,K.start+K.count);for(let D=E,M=G;D<M;D++){let z=X.getX(D);F6.fromBufferAttribute(N,z),i$(F6,z,Y,Z,J,Q,this)}}else{let E=Math.max(0,K.start),G=Math.min(N.count,K.start+K.count);for(let D=E,M=G;D<M;D++)F6.fromBufferAttribute(N,D),i$(F6,D,Y,Z,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let Z=Q[$[0]];if(Z!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let W=0,K=Z.length;W<K;W++){let H=Z[W].name||String(W);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=W}}}}}function i$(J,Q,$,Z,W,K,H){let Y=PJ.distanceSqToPoint(J);if(Y<$){let X=new y;PJ.closestPointToPoint(J,X),X.applyMatrix4(Z);let U=W.ray.origin.distanceTo(X);if(U<W.near||U>W.far)return;K.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:Q,face:null,faceIndex:null,barycoord:null,object:H})}}class c6 extends z8{constructor(J=[],Q=301,$,Z,W,K,H,Y,X,U){super(J,Q,$,Z,W,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class P9 extends z8{constructor(J,Q,$=1014,Z,W,K,H=1003,Y=1003,X,U=1026,N=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let E={width:J,height:Q,depth:N};super(E,Z,W,K,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new h7(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class hQ extends P9{constructor(J,Q=1014,$=301,Z,W,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},N=[U,U,U,U,U,U];super(J,J,Q,$,Z,W,K,H,Y,X);this.image=N,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class n6 extends z8{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class M7 extends M8{constructor(J=1,Q=1,$=1,Z=1,W=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:Z,heightSegments:W,depthSegments:K};let H=this;Z=Math.floor(Z),W=Math.floor(W),K=Math.floor(K);let Y=[],X=[],U=[],N=[],E=0,G=0;D("z","y","x",-1,-1,$,Q,J,K,W,0),D("z","y","x",1,-1,$,Q,-J,K,W,1),D("x","z","y",1,1,J,$,Q,Z,K,2),D("x","z","y",1,-1,J,$,-Q,Z,K,3),D("x","y","z",1,-1,J,Q,$,Z,W,4),D("x","y","z",-1,-1,J,Q,-$,Z,W,5),this.setIndex(Y),this.setAttribute("position",new f8(X,3)),this.setAttribute("normal",new f8(U,3)),this.setAttribute("uv",new f8(N,2));function D(M,z,F,q,A,w,V,_,I,P,R){let B=w/I,d=V/P,C=w/2,m=V/2,o=_/2,p=I+1,n=P+1,u=0,h=0,t=new y;for(let e=0;e<n;e++){let H0=e*d-m;for(let M0=0;M0<p;M0++){let k0=M0*B-C;t[M]=k0*q,t[z]=H0*A,t[F]=o,X.push(t.x,t.y,t.z),t[M]=0,t[z]=0,t[F]=_>0?1:-1,U.push(t.x,t.y,t.z),N.push(M0/I),N.push(1-e/P),u+=1}}for(let e=0;e<P;e++)for(let H0=0;H0<I;H0++){let M0=E+H0+p*e,k0=E+H0+p*(e+1),W8=E+(H0+1)+p*(e+1),i0=E+(H0+1)+p*e;Y.push(M0,k0,i0),Y.push(k0,W8,i0),h+=6}H.addGroup(G,h,R),G+=h,E+=u}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new M7(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class T9 extends M8{constructor(J=1,Q=1,$=1,Z=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:Z};let W=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(Z),X=H+1,U=Y+1,N=J/H,E=Q/Y,G=[],D=[],M=[],z=[];for(let F=0;F<U;F++){let q=F*E-K;for(let A=0;A<X;A++){let w=A*N-W;D.push(w,-q,0),M.push(0,0,1),z.push(A/H),z.push(1-F/Y)}}for(let F=0;F<Y;F++)for(let q=0;q<H;q++){let A=q+X*F,w=q+X*(F+1),V=q+1+X*(F+1),_=q+1+X*F;G.push(A,w,_),G.push(w,V,_)}this.setIndex(G),this.setAttribute("position",new f8(D,3)),this.setAttribute("normal",new f8(M,3)),this.setAttribute("uv",new f8(z,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new T9(J.width,J.height,J.widthSegments,J.heightSegments)}}function n9(J){let Q={};for(let $ in J){Q[$]={};for(let Z in J[$]){let W=J[$][Z];if(o$(W))if(W.isRenderTargetTexture)_0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][Z]=null;else Q[$][Z]=W.clone();else if(Array.isArray(W))if(o$(W[0])){let K=[];for(let H=0,Y=W.length;H<Y;H++)K[H]=W[H].clone();Q[$][Z]=K}else Q[$][Z]=W.slice();else Q[$][Z]=W}}return Q}function A8(J){let Q={};for(let $=0;$<J.length;$++){let Z=n9(J[$]);for(let W in Z)Q[W]=Z[W]}return Q}function o$(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function _K(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function xQ(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return h0.workingColorSpace}var tZ={clone:n9,merge:A8},AK=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,CK=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class T8 extends w9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=AK,this.fragmentShader=CK,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=n9(J.uniforms),this.uniformsGroups=_K(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let Z in this.uniforms){let K=this.uniforms[Z].value;if(K&&K.isTexture)Q.uniforms[Z]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[Z]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[Z]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[Z]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[Z]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[Z]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[Z]={type:"m4",value:K.toArray()};else Q.uniforms[Z]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let Z in this.extensions)if(this.extensions[Z]===!0)$[Z]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let Z=J.uniforms[$];switch(this.uniforms[$]={},Z.type){case"t":this.uniforms[$].value=Q[Z.value]||null;break;case"c":this.uniforms[$].value=new x0().setHex(Z.value);break;case"v2":this.uniforms[$].value=new u0().fromArray(Z.value);break;case"v3":this.uniforms[$].value=new y().fromArray(Z.value);break;case"v4":this.uniforms[$].value=new K8().fromArray(Z.value);break;case"m3":this.uniforms[$].value=new P0().fromArray(Z.value);break;case"m4":this.uniforms[$].value=new Z8().fromArray(Z.value);break;default:this.uniforms[$].value=Z.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class gQ extends T8{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class pQ extends w9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class mQ extends w9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function D6(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class s9{constructor(J,Q,$,Z){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=Z!==void 0?Z:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,Z=Q[$],W=Q[$-1];$:{J:{let K;Q:{Z:if(!(J<Z)){for(let H=$+2;;){if(Z===void 0){if(J<W)break Z;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(W=Z,Z=Q[++$],J<Z)break J}K=Q.length;break Q}if(!(J>=W)){let H=Q[1];if(J<H)$=2,W=H;for(let Y=$-2;;){if(W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(Z=W,W=Q[--$-1],J>=W)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(Z=Q[$],W=Q[$-1],W===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(Z===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,W,Z)}return this.interpolate_($,W,J,Z)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,Z=this.valueSize,W=J*Z;for(let K=0;K!==Z;++K)Q[K]=$[W+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class lQ extends s9{constructor(J,Q,$,Z){super(J,Q,$,Z);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let Z=this.parameterPositions,W=J-2,K=J+1,H=Z[W],Y=Z[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:W=J,H=2*Q-$;break;case 2402:W=Z.length-2,H=Q+Z[W]-Z[W+1];break;default:W=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+Z[1]-Z[0];break;default:K=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=W*U,this._offsetNext=K*U}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,N=this._offsetNext,E=this._weightPrev,G=this._weightNext,D=($-Q)/(Z-Q),M=D*D,z=M*D,F=-E*z+2*E*M-E*D,q=(1+E)*z+(-1.5-2*E)*M+(-0.5+E)*D+1,A=(-1-G)*z+(1.5+G)*M+0.5*D,w=G*z-G*M;for(let V=0;V!==H;++V)W[V]=F*K[U+V]+q*K[X+V]+A*K[Y+V]+w*K[N+V];return W}}class dQ extends s9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(Z-Q),N=1-U;for(let E=0;E!==H;++E)W[E]=K[X+E]*N+K[Y+E]*U;return W}}class uQ extends s9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J){return this.copySampleValue_(J-1)}}class cQ extends s9{interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,N=this.outTangents;if(!U||!N){let D=($-Q)/(Z-Q),M=1-D;for(let z=0;z!==H;++z)W[z]=K[X+z]*M+K[Y+z]*D;return W}let E=H*2,G=J-1;for(let D=0;D!==H;++D){let M=K[X+D],z=K[Y+D],F=G*E+D*2,q=N[F],A=N[F+1],w=J*E+D*2,V=U[w],_=U[w+1],I=($-Q)/(Z-Q),P,R,B,d,C;for(let m=0;m<8;m++){P=I*I,R=P*I,B=1-I,d=B*B,C=d*B;let p=C*Q+3*d*I*q+3*B*P*V+R*Z-$;if(Math.abs(p)<0.0000000001)break;let n=3*d*(q-Q)+6*B*I*(V-q)+3*P*(Z-V);if(Math.abs(n)<0.0000000001)break;I=I-p/n,I=Math.max(0,Math.min(1,I))}W[D]=C*M+3*d*I*A+3*B*P*_+R*z}return W}}class u8{constructor(J,Q,$,Z){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=D6(Q,this.TimeBufferType),this.values=D6($,this.ValueBufferType),this.setInterpolation(Z||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:D6(J.times,Array),values:D6(J.values,Array)};let Z=J.getInterpolation();if(Z!==J.DefaultInterpolation)$.interpolation=Z}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new uQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new dQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new lQ(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new cQ(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return _0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,Z=Q.length;$!==Z;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,Z=$.length,W=0,K=Z-1;while(W!==Z&&$[W]<J)++W;while(K!==-1&&$[K]>Q)--K;if(++K,W!==0||K!==Z){if(W>=K)K=Math.max(K,1),W=K-1;let H=this.getValueSize();this.times=$.slice(W,K),this.values=this.values.slice(W*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)w0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,Z=this.values,W=$.length;if(W===0)w0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==W;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){w0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){w0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(Z!==void 0){if(KK(Z))for(let H=0,Y=Z.length;H!==Y;++H){let X=Z[H];if(isNaN(X)){w0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),Z=this.getInterpolation()===2302,W=J.length-1,K=1;for(let H=1;H<W;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!Z){let N=H*$,E=N-$,G=N+$;for(let D=0;D!==$;++D){let M=Q[N+D];if(M!==Q[E+D]||M!==Q[G+D]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let N=H*$,E=K*$;for(let G=0;G!==$;++G)Q[E+G]=Q[N+G]}++K}}if(W>0){J[K]=J[W];for(let H=W*$,Y=K*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),Z=new this.constructor(this.name,J,Q);return Z.createInterpolant=this.createInterpolant,Z}}u8.prototype.ValueTypeName="";u8.prototype.TimeBufferType=Float32Array;u8.prototype.ValueBufferType=Float32Array;u8.prototype.DefaultInterpolation=2301;class i9 extends u8{constructor(J,Q,$){super(J,Q,$)}}i9.prototype.ValueTypeName="bool";i9.prototype.ValueBufferType=Array;i9.prototype.DefaultInterpolation=2300;i9.prototype.InterpolantFactoryMethodLinear=void 0;i9.prototype.InterpolantFactoryMethodSmooth=void 0;class nQ extends u8{constructor(J,Q,$,Z){super(J,Q,$,Z)}}nQ.prototype.ValueTypeName="color";class sQ extends u8{constructor(J,Q,$,Z){super(J,Q,$,Z)}}sQ.prototype.ValueTypeName="number";class iQ extends s9{constructor(J,Q,$,Z){super(J,Q,$,Z)}interpolate_(J,Q,$,Z){let W=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(Z-Q),X=J*H;for(let U=X+H;X!==U;X+=4)D9.slerpFlat(W,0,K,X-H,K,X,Y);return W}}class s6 extends u8{constructor(J,Q,$,Z){super(J,Q,$,Z)}InterpolantFactoryMethodLinear(J){return new iQ(this.times,this.values,this.getValueSize(),J)}}s6.prototype.ValueTypeName="quaternion";s6.prototype.InterpolantFactoryMethodSmooth=void 0;class o9 extends u8{constructor(J,Q,$){super(J,Q,$)}}o9.prototype.ValueTypeName="string";o9.prototype.ValueBufferType=Array;o9.prototype.DefaultInterpolation=2300;o9.prototype.InterpolantFactoryMethodLinear=void 0;o9.prototype.InterpolantFactoryMethodSmooth=void 0;class oQ extends u8{constructor(J,Q,$,Z){super(J,Q,$,Z)}}oQ.prototype.ValueTypeName="vector";class aQ{constructor(J,Q,$){let Z=this,W=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,W===!1){if(Z.onStart!==void 0)Z.onStart(U,K,H)}W=!0},this.itemEnd=function(U){if(K++,Z.onProgress!==void 0)Z.onProgress(U,K,H);if(K===H){if(W=!1,Z.onLoad!==void 0)Z.onLoad()}},this.itemError=function(U){if(Z.onError!==void 0)Z.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,N){return X.push(U,N),this},this.removeHandler=function(U){let N=X.indexOf(U);if(N!==-1)X.splice(N,2);return this},this.getHandler=function(U){for(let N=0,E=X.length;N<E;N+=2){let G=X[N],D=X[N+1];if(G.global)G.lastIndex=0;if(G.test(U))return D}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var eZ=new aQ;class rQ{constructor(J){if(this.manager=J!==void 0?J:eZ,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(Z,W){$.load(J,Z,Q,W)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}rQ.DEFAULT_MATERIAL_NAME="__DEFAULT";var O6=new y,R6=new D9,r8=new y;class i6 extends I8{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Z8,this.projectionMatrix=new Z8,this.projectionMatrixInverse=new Z8,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(O6,R6,r8),r8.x===1&&r8.y===1&&r8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(O6,R6,r8.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(O6,R6,r8),r8.x===1&&r8.y===1&&r8.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(O6,R6,r8.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var I9=new y,a$=new u0,r$=new u0;class y8 extends i6{constructor(J=50,Q=1,$=0.1,Z=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=Z,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=k6*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(KJ*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return k6*2*Math.atan(Math.tan(KJ*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){I9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(I9.x,I9.y).multiplyScalar(-J/I9.z),I9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(I9.x,I9.y).multiplyScalar(-J/I9.z)}getViewSize(J,Q){return this.getViewBounds(J,a$,r$),Q.subVectors(r$,a$)}setViewOffset(J,Q,$,Z,W,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(KJ*0.5*this.fov)/this.zoom,$=2*Q,Z=this.aspect*$,W=-0.5*Z,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;W+=K.offsetX*Z/Y,Q-=K.offsetY*$/X,Z*=K.width/Y,$*=K.height/X}let H=this.filmOffset;if(H!==0)W+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(W,W+Z,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class L7 extends i6{constructor(J=-1,Q=1,$=1,Z=-1,W=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=Z,this.near=W,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,Z,W,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=Z,this.view.width=W,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,Z=(this.top+this.bottom)/2,W=$-J,K=$+J,H=Z+Q,Y=Z-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;W+=X*this.view.offsetX,K=W+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(W,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class o6 extends M8{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(J){return super.copy(J),this.instanceCount=J.instanceCount,this}toJSON(){let J=super.toJSON();return J.instanceCount=this.instanceCount,J.isInstancedBufferGeometry=!0,J}}var U7=-90,G7=1;class tQ extends I8{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let Z=new y8(U7,G7,J,Q);Z.layers=this.layers,this.add(Z);let W=new y8(U7,G7,J,Q);W.layers=this.layers,this.add(W);let K=new y8(U7,G7,J,Q);K.layers=this.layers,this.add(K);let H=new y8(U7,G7,J,Q);H.layers=this.layers,this.add(H);let Y=new y8(U7,G7,J,Q);Y.layers=this.layers,this.add(Y);let X=new y8(U7,G7,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,Z,W,K,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),Z.up.set(0,1,0),Z.lookAt(-1,0,0),W.up.set(0,0,-1),W.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),Z.up.set(0,-1,0),Z.lookAt(1,0,0),W.up.set(0,0,1),W.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:Z}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[W,K,H,Y,X,U]=this.children,N=J.getRenderTarget(),E=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),D=J.xr.enabled;J.xr.enabled=!1;let M=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let z=!1;if(J.isWebGLRenderer===!0)z=J.state.buffers.depth.getReversed();else z=J.reversedDepthBuffer;if(J.setRenderTarget($,0,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,W),J.setRenderTarget($,1,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,Z),z&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=M,J.setRenderTarget($,5,Z),z&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(N,E,G),J.xr.enabled=D,$.texture.needsPMREMUpdate=!0}}class eQ extends y8{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var J$="\\[\\]\\.:\\/",wK=new RegExp("["+J$+"]","g"),Q$="[^"+J$+"]",PK="[^"+J$.replace("\\.","")+"]",TK=/((?:WC+[\/:])*)/.source.replace("WC",Q$),SK=/(WCOD+)?/.source.replace("WCOD",PK),jK=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Q$),vK=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Q$),yK=new RegExp("^"+TK+SK+jK+vK+"$"),fK=["material","materials","bones","map"];class JW{constructor(J,Q,$){let Z=$||n0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,Z)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,Z=this._bindings[$];if(Z!==void 0)Z.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let Z=this._targetGroup.nCachedObjects_,W=$.length;Z!==W;++Z)$[Z].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class n0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||n0.parseTrackName(Q),this.node=n0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new n0(J,Q,$);else return new n0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(wK,"")}static parseTrackName(J){let Q=yK.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},Z=$.nodeName&&$.nodeName.lastIndexOf(".");if(Z!==void 0&&Z!==-1){let W=$.nodeName.substring(Z+1);if(fK.indexOf(W)!==-1)$.nodeName=$.nodeName.substring(0,Z),$.objectName=W}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(W){for(let K=0;K<W.length;K++){let H=W[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},Z=$(J.children);if(Z)return Z}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)J[Q++]=$[Z]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let Z=0,W=$.length;Z!==W;++Z)$[Z]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,Z=Q.propertyName,W=Q.propertyIndex;if(!J)J=n0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){_0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){w0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){w0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){w0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){w0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){w0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){w0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){w0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[Z];if(K===void 0){let X=Q.nodeName;w0("PropertyBinding: Trying to update property for track: "+X+"."+Z+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(W!==void 0){if(Z==="morphTargetInfluences"){if(!J.geometry){w0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){w0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[W]!==void 0)W=J.morphTargetDictionary[W]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=W}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=Z;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}n0.Composite=JW;n0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};n0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};n0.prototype.GetterByBindingType=[n0.prototype._getValue_direct,n0.prototype._getValue_array,n0.prototype._getValue_arrayElement,n0.prototype._getValue_toArray];n0.prototype.SetterByBindingTypeAndVersioning=[[n0.prototype._setValue_direct,n0.prototype._setValue_direct_setNeedsUpdate,n0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[n0.prototype._setValue_array,n0.prototype._setValue_array_setNeedsUpdate,n0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[n0.prototype._setValue_arrayElement,n0.prototype._setValue_arrayElement_setNeedsUpdate,n0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[n0.prototype._setValue_fromArray,n0.prototype._setValue_fromArray_setNeedsUpdate,n0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var A5=new Float32Array(1);class $${static{$$.prototype.isMatrix2=!0}constructor(J,Q,$,Z){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,Z)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,Z){let W=this.elements;return W[0]=J,W[2]=Q,W[1]=$,W[3]=Z,this}}function Z$(J,Q,$,Z){let W=bK(Z);switch($){case 1021:return J*Q;case 1028:return J*Q/W.components*W.byteLength;case 1029:return J*Q/W.components*W.byteLength;case 1030:return J*Q*2/W.components*W.byteLength;case 1031:return J*Q*2/W.components*W.byteLength;case 1022:return J*Q*3/W.components*W.byteLength;case 1023:return J*Q*4/W.components*W.byteLength;case 1033:return J*Q*4/W.components*W.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function bK(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)_0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function zW(){let J=null,Q=!1,$=null,Z=null;function W(K,H){$(K,H),Z=J.requestAnimationFrame(W)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;Z=J.requestAnimationFrame(W),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(Z);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function hK(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:N}=Y,E=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,N),Y.onUploadCallback();let D;if(U instanceof Float32Array)D=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)D=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)D=J.HALF_FLOAT;else D=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)D=J.SHORT;else if(U instanceof Uint32Array)D=J.UNSIGNED_INT;else if(U instanceof Int32Array)D=J.INT;else if(U instanceof Int8Array)D=J.BYTE;else if(U instanceof Uint8Array)D=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)D=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:D,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:E}}function Z(Y,X,U){let{array:N,updateRanges:E}=X;if(J.bindBuffer(U,Y),E.length===0)J.bufferSubData(U,0,N);else{E.sort((D,M)=>D.start-M.start);let G=0;for(let D=1;D<E.length;D++){let M=E[G],z=E[D];if(z.start<=M.start+M.count+1)M.count=Math.max(M.count,z.start+z.count-M.start);else++G,E[G]=z}E.length=G+1;for(let D=0,M=E.length;D<M;D++){let z=E[D];J.bufferSubData(U,z.start*N.BYTES_PER_ELEMENT,N,z.start,z.count)}X.clearUpdateRanges()}X.onUploadCallback()}function W(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let N=Q.get(Y);if(!N||N.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");Z(U.buffer,Y,X),U.version=Y.version}}return{get:W,remove:K,update:H}}var xK=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gK=`#ifdef USE_ALPHAHASH
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
#endif`,pK=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mK=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,lK=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,dK=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,uK=`#ifdef USE_AOMAP
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
#endif`,cK=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nK=`#ifdef USE_BATCHING
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
#endif`,sK=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,iK=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oK=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,aK=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,rK=`#ifdef USE_IRIDESCENCE
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
#endif`,tK=`#ifdef USE_BUMPMAP
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
#endif`,eK=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,JH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,QH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$H=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ZH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,WH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,KH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,HH=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,YH=`#define PI 3.141592653589793
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
} // validated`,XH=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,UH=`vec3 transformedNormal = objectNormal;
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
#endif`,GH=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,NH=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,EH=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qH=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FH="gl_FragColor = linearToOutputTexel( gl_FragColor );",DH=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,OH=`#ifdef USE_ENVMAP
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
#endif`,RH=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,kH=`#ifdef USE_ENVMAP
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
#endif`,MH=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,LH=`#ifdef USE_ENVMAP
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
#endif`,VH=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,BH=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,zH=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,IH=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_H=`#ifdef USE_GRADIENTMAP
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
}`,AH=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,CH=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,wH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,PH=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,TH=`#ifdef USE_ENVMAP
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
#endif`,SH=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,jH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,vH=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,yH=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,fH=`PhysicalMaterial material;
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
#endif`,bH=`uniform sampler2D dfgLUT;
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
}`,hH=`
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
#endif`,xH=`#if defined( RE_IndirectDiffuse )
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
#endif`,gH=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,pH=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,mH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,lH=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,uH=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cH=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nH=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,sH=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,iH=`#if defined( USE_POINTS_UV )
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
#endif`,oH=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aH=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,rH=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,tH=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,eH=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,JY=`#ifdef USE_MORPHTARGETS
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
#endif`,QY=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,$Y=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,ZY=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,WY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,KY=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,HY=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,YY=`#ifdef USE_NORMALMAP
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
#endif`,XY=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,UY=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,GY=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,NY=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,EY=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qY=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,FY=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DY=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,OY=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,RY=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,kY=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,MY=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,LY=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,VY=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,BY=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,zY=`float getShadowMask() {
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
}`,IY=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,_Y=`#ifdef USE_SKINNING
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
#endif`,AY=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,CY=`#ifdef USE_SKINNING
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
#endif`,wY=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,PY=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,TY=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,SY=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,jY=`#ifdef USE_TRANSMISSION
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
#endif`,vY=`#ifdef USE_TRANSMISSION
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
#endif`,yY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bY=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hY=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,xY=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gY=`uniform sampler2D t2D;
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
}`,pY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mY=`#ifdef ENVMAP_TYPE_CUBE
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
}`,lY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,dY=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,uY=`#include <common>
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
}`,cY=`#if DEPTH_PACKING == 3200
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
}`,nY=`#define DISTANCE
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
}`,sY=`#define DISTANCE
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
}`,iY=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,oY=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,aY=`uniform float scale;
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
}`,rY=`uniform vec3 diffuse;
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
}`,tY=`#include <common>
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
}`,eY=`uniform vec3 diffuse;
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
}`,JX=`#define LAMBERT
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
}`,QX=`#define LAMBERT
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
}`,$X=`#define MATCAP
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
}`,ZX=`#define MATCAP
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
}`,WX=`#define NORMAL
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
}`,KX=`#define NORMAL
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
}`,HX=`#define PHONG
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
}`,YX=`#define PHONG
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
}`,XX=`#define STANDARD
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
}`,UX=`#define STANDARD
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
}`,GX=`#define TOON
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
}`,NX=`#define TOON
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
}`,EX=`uniform float size;
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
}`,qX=`uniform vec3 diffuse;
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
}`,FX=`#include <common>
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
}`,DX=`uniform vec3 color;
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
}`,OX=`uniform float rotation;
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
}`,RX=`uniform vec3 diffuse;
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
}`,j0={alphahash_fragment:xK,alphahash_pars_fragment:gK,alphamap_fragment:pK,alphamap_pars_fragment:mK,alphatest_fragment:lK,alphatest_pars_fragment:dK,aomap_fragment:uK,aomap_pars_fragment:cK,batching_pars_vertex:nK,batching_vertex:sK,begin_vertex:iK,beginnormal_vertex:oK,bsdfs:aK,iridescence_fragment:rK,bumpmap_pars_fragment:tK,clipping_planes_fragment:eK,clipping_planes_pars_fragment:JH,clipping_planes_pars_vertex:QH,clipping_planes_vertex:$H,color_fragment:ZH,color_pars_fragment:WH,color_pars_vertex:KH,color_vertex:HH,common:YH,cube_uv_reflection_fragment:XH,defaultnormal_vertex:UH,displacementmap_pars_vertex:GH,displacementmap_vertex:NH,emissivemap_fragment:EH,emissivemap_pars_fragment:qH,colorspace_fragment:FH,colorspace_pars_fragment:DH,envmap_fragment:OH,envmap_common_pars_fragment:RH,envmap_pars_fragment:kH,envmap_pars_vertex:MH,envmap_physical_pars_fragment:TH,envmap_vertex:LH,fog_vertex:VH,fog_pars_vertex:BH,fog_fragment:zH,fog_pars_fragment:IH,gradientmap_pars_fragment:_H,lightmap_pars_fragment:AH,lights_lambert_fragment:CH,lights_lambert_pars_fragment:wH,lights_pars_begin:PH,lights_toon_fragment:SH,lights_toon_pars_fragment:jH,lights_phong_fragment:vH,lights_phong_pars_fragment:yH,lights_physical_fragment:fH,lights_physical_pars_fragment:bH,lights_fragment_begin:hH,lights_fragment_maps:xH,lights_fragment_end:gH,lightprobes_pars_fragment:pH,logdepthbuf_fragment:mH,logdepthbuf_pars_fragment:lH,logdepthbuf_pars_vertex:dH,logdepthbuf_vertex:uH,map_fragment:cH,map_pars_fragment:nH,map_particle_fragment:sH,map_particle_pars_fragment:iH,metalnessmap_fragment:oH,metalnessmap_pars_fragment:aH,morphinstance_vertex:rH,morphcolor_vertex:tH,morphnormal_vertex:eH,morphtarget_pars_vertex:JY,morphtarget_vertex:QY,normal_fragment_begin:$Y,normal_fragment_maps:ZY,normal_pars_fragment:WY,normal_pars_vertex:KY,normal_vertex:HY,normalmap_pars_fragment:YY,clearcoat_normal_fragment_begin:XY,clearcoat_normal_fragment_maps:UY,clearcoat_pars_fragment:GY,iridescence_pars_fragment:NY,opaque_fragment:EY,packing:qY,premultiplied_alpha_fragment:FY,project_vertex:DY,dithering_fragment:OY,dithering_pars_fragment:RY,roughnessmap_fragment:kY,roughnessmap_pars_fragment:MY,shadowmap_pars_fragment:LY,shadowmap_pars_vertex:VY,shadowmap_vertex:BY,shadowmask_pars_fragment:zY,skinbase_vertex:IY,skinning_pars_vertex:_Y,skinning_vertex:AY,skinnormal_vertex:CY,specularmap_fragment:wY,specularmap_pars_fragment:PY,tonemapping_fragment:TY,tonemapping_pars_fragment:SY,transmission_fragment:jY,transmission_pars_fragment:vY,uv_pars_fragment:yY,uv_pars_vertex:fY,uv_vertex:bY,worldpos_vertex:hY,background_vert:xY,background_frag:gY,backgroundCube_vert:pY,backgroundCube_frag:mY,cube_vert:lY,cube_frag:dY,depth_vert:uY,depth_frag:cY,distance_vert:nY,distance_frag:sY,equirect_vert:iY,equirect_frag:oY,linedashed_vert:aY,linedashed_frag:rY,meshbasic_vert:tY,meshbasic_frag:eY,meshlambert_vert:JX,meshlambert_frag:QX,meshmatcap_vert:$X,meshmatcap_frag:ZX,meshnormal_vert:WX,meshnormal_frag:KX,meshphong_vert:HX,meshphong_frag:YX,meshphysical_vert:XX,meshphysical_frag:UX,meshtoon_vert:GX,meshtoon_frag:NX,points_vert:EX,points_frag:qX,shadow_vert:FX,shadow_frag:DX,sprite_vert:OX,sprite_frag:RX},U0={common:{diffuse:{value:new x0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new P0},alphaMap:{value:null},alphaMapTransform:{value:new P0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new P0}},envmap:{envMap:{value:null},envMapRotation:{value:new P0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new P0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new P0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new P0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new P0},normalScale:{value:new u0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new P0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new P0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new P0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new P0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new x0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new y},probesMax:{value:new y},probesResolution:{value:new y}},points:{diffuse:{value:new x0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new P0},alphaTest:{value:0},uvTransform:{value:new P0}},sprite:{diffuse:{value:new x0(16777215)},opacity:{value:1},center:{value:new u0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new P0},alphaMap:{value:null},alphaMapTransform:{value:new P0},alphaTest:{value:0}}},$9={basic:{uniforms:A8([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.fog]),vertexShader:j0.meshbasic_vert,fragmentShader:j0.meshbasic_frag},lambert:{uniforms:A8([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,U0.lights,{emissive:{value:new x0(0)},envMapIntensity:{value:1}}]),vertexShader:j0.meshlambert_vert,fragmentShader:j0.meshlambert_frag},phong:{uniforms:A8([U0.common,U0.specularmap,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,U0.lights,{emissive:{value:new x0(0)},specular:{value:new x0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:j0.meshphong_vert,fragmentShader:j0.meshphong_frag},standard:{uniforms:A8([U0.common,U0.envmap,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.roughnessmap,U0.metalnessmap,U0.fog,U0.lights,{emissive:{value:new x0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:j0.meshphysical_vert,fragmentShader:j0.meshphysical_frag},toon:{uniforms:A8([U0.common,U0.aomap,U0.lightmap,U0.emissivemap,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.gradientmap,U0.fog,U0.lights,{emissive:{value:new x0(0)}}]),vertexShader:j0.meshtoon_vert,fragmentShader:j0.meshtoon_frag},matcap:{uniforms:A8([U0.common,U0.bumpmap,U0.normalmap,U0.displacementmap,U0.fog,{matcap:{value:null}}]),vertexShader:j0.meshmatcap_vert,fragmentShader:j0.meshmatcap_frag},points:{uniforms:A8([U0.points,U0.fog]),vertexShader:j0.points_vert,fragmentShader:j0.points_frag},dashed:{uniforms:A8([U0.common,U0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:j0.linedashed_vert,fragmentShader:j0.linedashed_frag},depth:{uniforms:A8([U0.common,U0.displacementmap]),vertexShader:j0.depth_vert,fragmentShader:j0.depth_frag},normal:{uniforms:A8([U0.common,U0.bumpmap,U0.normalmap,U0.displacementmap,{opacity:{value:1}}]),vertexShader:j0.meshnormal_vert,fragmentShader:j0.meshnormal_frag},sprite:{uniforms:A8([U0.sprite,U0.fog]),vertexShader:j0.sprite_vert,fragmentShader:j0.sprite_frag},background:{uniforms:{uvTransform:{value:new P0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:j0.background_vert,fragmentShader:j0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new P0}},vertexShader:j0.backgroundCube_vert,fragmentShader:j0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:j0.cube_vert,fragmentShader:j0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:j0.equirect_vert,fragmentShader:j0.equirect_frag},distance:{uniforms:A8([U0.common,U0.displacementmap,{referencePosition:{value:new y},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:j0.distance_vert,fragmentShader:j0.distance_frag},shadow:{uniforms:A8([U0.lights,U0.fog,{color:{value:new x0(0)},opacity:{value:1}}]),vertexShader:j0.shadow_vert,fragmentShader:j0.shadow_frag}};$9.physical={uniforms:A8([$9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new P0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new P0},clearcoatNormalScale:{value:new u0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new P0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new P0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new P0},sheen:{value:0},sheenColor:{value:new x0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new P0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new P0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new P0},transmissionSamplerSize:{value:new u0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new P0},attenuationDistance:{value:0},attenuationColor:{value:new x0(0)},specularColor:{value:new x0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new P0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new P0},anisotropyVector:{value:new u0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new P0}}]),vertexShader:j0.meshphysical_vert,fragmentShader:j0.meshphysical_frag};var a6={r:0,b:0,g:0},kX=new Z8,IW=new P0;IW.set(-1,0,0,0,1,0,0,0,1);function MX(J,Q,$,Z,W,K){let H=new x0(0),Y=W===!0?0:1,X,U,N=null,E=0,G=null;function D(A){let w=A.isScene===!0?A.background:null;if(w&&w.isTexture){let V=A.backgroundBlurriness>0;w=Q.get(w,V)}return w}function M(A){let w=!1,V=D(A);if(V===null)F(H,Y);else if(V&&V.isColor)F(V,1),w=!0;let _=J.xr.getEnvironmentBlendMode();if(_==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(_==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||w)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function z(A,w){let V=D(w);if(V&&(V.isCubeTexture||V.mapping===v7)){if(U===void 0)U=new h8(new M7(1,1,1),new T8({name:"BackgroundCubeMaterial",uniforms:n9($9.backgroundCube.uniforms),vertexShader:$9.backgroundCube.vertexShader,fragmentShader:$9.backgroundCube.fragmentShader,side:P8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(_,I,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),Z.update(U);if(U.material.uniforms.envMap.value=V,U.material.uniforms.backgroundBlurriness.value=w.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(kX.makeRotationFromEuler(w.backgroundRotation)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(IW);if(U.material.toneMapped=h0.getTransfer(V.colorSpace)!==r0,N!==V||E!==V.version||G!==J.toneMapping)U.material.needsUpdate=!0,N=V,E=V.version,G=J.toneMapping;U.layers.enableAll(),A.unshift(U,U.geometry,U.material,0,0,null)}else if(V&&V.isTexture){if(X===void 0)X=new h8(new T9(2,2),new T8({name:"BackgroundMaterial",uniforms:n9($9.background.uniforms),vertexShader:$9.background.vertexShader,fragmentShader:$9.background.fragmentShader,side:D7,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),Z.update(X);if(X.material.uniforms.t2D.value=V,X.material.uniforms.backgroundIntensity.value=w.backgroundIntensity,X.material.toneMapped=h0.getTransfer(V.colorSpace)!==r0,V.matrixAutoUpdate===!0)V.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(V.matrix),N!==V||E!==V.version||G!==J.toneMapping)X.material.needsUpdate=!0,N=V,E=V.version,G=J.toneMapping;X.layers.enableAll(),A.unshift(X,X.geometry,X.material,0,0,null)}}function F(A,w){A.getRGB(a6,xQ(J)),$.buffers.color.setClear(a6.r,a6.g,a6.b,w,K)}function q(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(A,w=1){H.set(A),Y=w,F(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(A){Y=A,F(H,Y)},render:M,addToRenderList:z,dispose:q}}function LX(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),Z={},W=G(null),K=W,H=!1;function Y(C,m,o,p,n){let u=!1,h=E(C,p,o,m);if(K!==h)K=h,U(K.object);if(u=D(C,p,o,n),u)M(C,p,o,n);if(n!==null)Q.update(n,J.ELEMENT_ARRAY_BUFFER);if(u||H){if(H=!1,V(C,m,o,p),n!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(n).buffer)}}function X(){return J.createVertexArray()}function U(C){return J.bindVertexArray(C)}function N(C){return J.deleteVertexArray(C)}function E(C,m,o,p){let n=p.wireframe===!0,u=Z[m.id];if(u===void 0)u={},Z[m.id]=u;let h=C.isInstancedMesh===!0?C.id:0,t=u[h];if(t===void 0)t={},u[h]=t;let e=t[o.id];if(e===void 0)e={},t[o.id]=e;let H0=e[n];if(H0===void 0)H0=G(X()),e[n]=H0;return H0}function G(C){let m=[],o=[],p=[];for(let n=0;n<$;n++)m[n]=0,o[n]=0,p[n]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:m,enabledAttributes:o,attributeDivisors:p,object:C,attributes:{},index:null}}function D(C,m,o,p){let n=K.attributes,u=m.attributes,h=0,t=o.getAttributes();for(let e in t)if(t[e].location>=0){let M0=n[e],k0=u[e];if(k0===void 0){if(e==="instanceMatrix"&&C.instanceMatrix)k0=C.instanceMatrix;if(e==="instanceColor"&&C.instanceColor)k0=C.instanceColor}if(M0===void 0)return!0;if(M0.attribute!==k0)return!0;if(k0&&M0.data!==k0.data)return!0;h++}if(K.attributesNum!==h)return!0;if(K.index!==p)return!0;return!1}function M(C,m,o,p){let n={},u=m.attributes,h=0,t=o.getAttributes();for(let e in t)if(t[e].location>=0){let M0=u[e];if(M0===void 0){if(e==="instanceMatrix"&&C.instanceMatrix)M0=C.instanceMatrix;if(e==="instanceColor"&&C.instanceColor)M0=C.instanceColor}let k0={};if(k0.attribute=M0,M0&&M0.data)k0.data=M0.data;n[e]=k0,h++}K.attributes=n,K.attributesNum=h,K.index=p}function z(){let C=K.newAttributes;for(let m=0,o=C.length;m<o;m++)C[m]=0}function F(C){q(C,0)}function q(C,m){let{newAttributes:o,enabledAttributes:p,attributeDivisors:n}=K;if(o[C]=1,p[C]===0)J.enableVertexAttribArray(C),p[C]=1;if(n[C]!==m)J.vertexAttribDivisor(C,m),n[C]=m}function A(){let{newAttributes:C,enabledAttributes:m}=K;for(let o=0,p=m.length;o<p;o++)if(m[o]!==C[o])J.disableVertexAttribArray(o),m[o]=0}function w(C,m,o,p,n,u,h){if(h===!0)J.vertexAttribIPointer(C,m,o,n,u);else J.vertexAttribPointer(C,m,o,p,n,u)}function V(C,m,o,p){z();let n=p.attributes,u=o.getAttributes(),h=m.defaultAttributeValues;for(let t in u){let e=u[t];if(e.location>=0){let H0=n[t];if(H0===void 0){if(t==="instanceMatrix"&&C.instanceMatrix)H0=C.instanceMatrix;if(t==="instanceColor"&&C.instanceColor)H0=C.instanceColor}if(H0!==void 0){let{normalized:M0,itemSize:k0}=H0,W8=Q.get(H0);if(W8===void 0)continue;let{buffer:i0,type:i,bytesPerElement:Z0}=W8,F0=i===J.INT||i===J.UNSIGNED_INT||H0.gpuType===lJ;if(H0.isInterleavedBufferAttribute){let D0=H0.data,C0=D0.stride,p0=H0.offset;if(D0.isInstancedInterleavedBuffer){for(let y0=0;y0<e.locationSize;y0++)q(e.location+y0,D0.meshPerAttribute);if(C.isInstancedMesh!==!0&&p._maxInstanceCount===void 0)p._maxInstanceCount=D0.meshPerAttribute*D0.count}else for(let y0=0;y0<e.locationSize;y0++)F(e.location+y0);J.bindBuffer(J.ARRAY_BUFFER,i0);for(let y0=0;y0<e.locationSize;y0++)w(e.location+y0,k0/e.locationSize,i,M0,C0*Z0,(p0+k0/e.locationSize*y0)*Z0,F0)}else{if(H0.isInstancedBufferAttribute){for(let D0=0;D0<e.locationSize;D0++)q(e.location+D0,H0.meshPerAttribute);if(C.isInstancedMesh!==!0&&p._maxInstanceCount===void 0)p._maxInstanceCount=H0.meshPerAttribute*H0.count}else for(let D0=0;D0<e.locationSize;D0++)F(e.location+D0);J.bindBuffer(J.ARRAY_BUFFER,i0);for(let D0=0;D0<e.locationSize;D0++)w(e.location+D0,k0/e.locationSize,i,M0,k0*Z0,k0/e.locationSize*D0*Z0,F0)}}else if(h!==void 0){let M0=h[t];if(M0!==void 0)switch(M0.length){case 2:J.vertexAttrib2fv(e.location,M0);break;case 3:J.vertexAttrib3fv(e.location,M0);break;case 4:J.vertexAttrib4fv(e.location,M0);break;default:J.vertexAttrib1fv(e.location,M0)}}}}A()}function _(){B();for(let C in Z){let m=Z[C];for(let o in m){let p=m[o];for(let n in p){let u=p[n];for(let h in u)N(u[h].object),delete u[h];delete p[n]}}delete Z[C]}}function I(C){if(Z[C.id]===void 0)return;let m=Z[C.id];for(let o in m){let p=m[o];for(let n in p){let u=p[n];for(let h in u)N(u[h].object),delete u[h];delete p[n]}}delete Z[C.id]}function P(C){for(let m in Z){let o=Z[m];for(let p in o){let n=o[p];if(n[C.id]===void 0)continue;let u=n[C.id];for(let h in u)N(u[h].object),delete u[h];delete n[C.id]}}}function R(C){for(let m in Z){let o=Z[m],p=C.isInstancedMesh===!0?C.id:0,n=o[p];if(n===void 0)continue;for(let u in n){let h=n[u];for(let t in h)N(h[t].object),delete h[t];delete n[u]}if(delete o[p],Object.keys(o).length===0)delete Z[m]}}function B(){if(d(),H=!0,K===W)return;K=W,U(K.object)}function d(){W.geometry=null,W.program=null,W.wireframe=!1}return{setup:Y,reset:B,resetDefaultState:d,dispose:_,releaseStatesOfGeometry:I,releaseStatesOfObject:R,releaseStatesOfProgram:P,initAttributes:z,enableAttribute:F,disableUnusedAttributes:A}}function VX(J,Q,$){let Z;function W(X){Z=X}function K(X,U){J.drawArrays(Z,X,U),$.update(U,Z,1)}function H(X,U,N){if(N===0)return;J.drawArraysInstanced(Z,X,U,N),$.update(U,Z,N)}function Y(X,U,N){if(N===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(Z,X,0,U,0,N);let G=0;for(let D=0;D<N;D++)G+=U[D];$.update(G,Z,1)}this.setMode=W,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function BX(J,Q,$,Z){let W;function K(){if(W!==void 0)return W;if(Q.has("EXT_texture_filter_anisotropic")===!0){let P=Q.get("EXT_texture_filter_anisotropic");W=J.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else W=0;return W}function H(P){if(P!==J9&&Z.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(P){let R=P===q9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(P!==b8&&Z.convert(P)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==E9&&!R)return!1;return!0}function X(P){if(P==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";P="mediump"}if(P==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",N=X(U);if(N!==U)_0("WebGLRenderer:",U,"not supported, using",N,"instead."),U=N;let E=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)_0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let D=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),M=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),z=J.getParameter(J.MAX_TEXTURE_SIZE),F=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),q=J.getParameter(J.MAX_VERTEX_ATTRIBS),A=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),w=J.getParameter(J.MAX_VARYING_VECTORS),V=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),_=J.getParameter(J.MAX_SAMPLES),I=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:E,reversedDepthBuffer:G,maxTextures:D,maxVertexTextures:M,maxTextureSize:z,maxCubemapSize:F,maxAttributes:q,maxVertexUniforms:A,maxVaryings:w,maxFragmentUniforms:V,maxSamples:_,samples:I}}function zX(J){let Q=this,$=null,Z=0,W=!1,K=!1,H=new G9,Y=new P0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(E,G){let D=E.length!==0||G||Z!==0||W;return W=G,Z=E.length,D},this.beginShadows=function(){K=!0,N(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(E,G){$=N(E,G,0)},this.setState=function(E,G,D){let{clippingPlanes:M,clipIntersection:z,clipShadows:F}=E,q=J.get(E);if(!W||M===null||M.length===0||K&&!F)if(K)N(null);else U();else{let A=K?0:Z,w=A*4,V=q.clippingState||null;X.value=V,V=N(M,G,w,D);for(let _=0;_!==w;++_)V[_]=$[_];q.clippingState=V,this.numIntersection=z?this.numPlanes:0,this.numPlanes+=A}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=Z>0;Q.numPlanes=Z,Q.numIntersection=0}function N(E,G,D,M){let z=E!==null?E.length:0,F=null;if(z!==0){if(F=X.value,M!==!0||F===null){let q=D+z*4,A=G.matrixWorldInverse;if(Y.getNormalMatrix(A),F===null||F.length<q)F=new Float32Array(q);for(let w=0,V=D;w!==z;++w,V+=4)H.copy(E[w]).applyMatrix4(A,Y),H.normal.toArray(F,V),F[V+3]=H.constant}X.value=F,X.needsUpdate=!0}return Q.numPlanes=z,Q.numIntersection=0,F}}var S9=4,QW=[0.125,0.215,0.35,0.446,0.526,0.582],a9=20,IX=256,l7=new L7,$W=new x0,W$=null,K$=0,H$=0,Y$=!1,_X=new y;class G${constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,Z=100,W={}){let{size:K=256,position:H=_X}=W;W$=this._renderer.getRenderTarget(),K$=this._renderer.getActiveCubeFace(),H$=this._renderer.getActiveMipmapLevel(),Y$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,Z,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=KW(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=WW(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(W$,K$,H$),this._renderer.xr.enabled=Y$,J.scissorTest=!1,V7(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===R7||J.mapping===x9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);W$=this._renderer.getRenderTarget(),K$=this._renderer.getActiveCubeFace(),H$=this._renderer.getActiveMipmapLevel(),Y$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:_8,minFilter:_8,generateMipmaps:!1,type:q9,format:J9,colorSpace:_Q,depthBuffer:!1},Z=ZW(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=ZW(J,Q,$);let{_lodMax:W}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=AX(W)),this._blurMaterial=wX(W,J,Q),this._ggxMaterial=CX(W,J,Q)}return Z}_compileMaterial(J){let Q=new h8(new M8,J);this._renderer.compile(Q,l7)}_sceneToCubeUV(J,Q,$,Z,W){let Y=new y8(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],N=this._renderer,E=N.autoClear,G=N.toneMapping;if(N.getClearColor($W),N.toneMapping=i8,N.autoClear=!1,N.state.buffers.depth.getReversed())N.setRenderTarget(Z),N.clearDepth(),N.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new h8(new M7,new m6({name:"PMREM.Background",side:P8,depthWrite:!1,depthTest:!1}));let M=this._backgroundBox,z=M.material,F=!1,q=J.background;if(q){if(q.isColor)z.color.copy(q),J.background=null,F=!0}else z.color.copy($W),F=!0;for(let A=0;A<6;A++){let w=A%3;if(w===0)Y.up.set(0,X[A],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x+U[A],W.y,W.z);else if(w===1)Y.up.set(0,0,X[A]),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y+U[A],W.z);else Y.up.set(0,X[A],0),Y.position.set(W.x,W.y,W.z),Y.lookAt(W.x,W.y,W.z+U[A]);let V=this._cubeSize;if(V7(Z,w*V,A>2?V:0,V,V),N.setRenderTarget(Z),F)N.render(M,Y);N.render(J,Y)}N.toneMapping=G,N.autoClear=E,J.background=q}_textureToCubeUV(J,Q){let $=this._renderer,Z=J.mapping===R7||J.mapping===x9;if(Z){if(this._cubemapMaterial===null)this._cubemapMaterial=KW();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=WW();let W=Z?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=W;let H=W.uniforms;H.envMap.value=J;let Y=this._cubeSize;V7(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,l7)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let Z=this._lodMeshes.length;for(let W=1;W<Z;W++)this._applyGGXFilter(J,W-1,W);Q.autoClear=$}_applyGGXFilter(J,Q,$){let Z=this._renderer,W=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),N=Math.sqrt(X*X-U*U),E=0+X*1.25,G=N*E,{_lodMax:D}=this,M=this._sizeLods[$],z=3*M*($>D-S9?$-D+S9:0),F=4*(this._cubeSize-M);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=D-Q,V7(W,z,F,3*M,2*M),Z.setRenderTarget(W),Z.render(H,l7),Y.envMap.value=W.texture,Y.roughness.value=0,Y.mipInt.value=D-$,V7(J,z,F,3*M,2*M),Z.setRenderTarget(J),Z.render(H,l7)}_blur(J,Q,$,Z,W){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,Z,"latitudinal",W),this._halfBlur(K,J,$,$,Z,"longitudinal",W)}_halfBlur(J,Q,$,Z,W,K,H){let Y=this._renderer,X=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")w0("blur direction must be either latitudinal or longitudinal!");let U=3,N=this._lodMeshes[Z];N.material=X;let E=X.uniforms,G=this._sizeLods[$]-1,D=isFinite(W)?Math.PI/(2*G):2*Math.PI/(2*a9-1),M=W/D,z=isFinite(W)?1+Math.floor(U*M):a9;if(z>a9)_0(`sigmaRadians, ${W}, is too large and will clip, as it requested ${z} samples when the maximum is set to ${a9}`);let F=[],q=0;for(let I=0;I<a9;++I){let P=I/M,R=Math.exp(-P*P/2);if(F.push(R),I===0)q+=R;else if(I<z)q+=2*R}for(let I=0;I<F.length;I++)F[I]=F[I]/q;if(E.envMap.value=J.texture,E.samples.value=z,E.weights.value=F,E.latitudinal.value=K==="latitudinal",H)E.poleAxis.value=H;let{_lodMax:A}=this;E.dTheta.value=D,E.mipInt.value=A-$;let w=this._sizeLods[Z],V=3*w*(Z>A-S9?Z-A+S9:0),_=4*(this._cubeSize-w);V7(Q,V,_,3*w,2*w),Y.setRenderTarget(Q),Y.render(N,l7)}}function AX(J){let Q=[],$=[],Z=[],W=J,K=J-S9+1+QW.length;for(let H=0;H<K;H++){let Y=Math.pow(2,W);Q.push(Y);let X=1/Y;if(H>J-S9)X=QW[H-J+S9-1];else if(H===0)X=0;$.push(X);let U=1/(Y-2),N=-U,E=1+U,G=[N,N,E,N,E,E,N,N,E,E,N,E],D=6,M=6,z=3,F=2,q=1,A=new Float32Array(z*M*D),w=new Float32Array(F*M*D),V=new Float32Array(q*M*D);for(let I=0;I<D;I++){let P=I%3*2/3-1,R=I>2?0:-1,B=[P,R,0,P+0.6666666666666666,R,0,P+0.6666666666666666,R+1,0,P,R,0,P+0.6666666666666666,R+1,0,P,R+1,0];A.set(B,z*M*I),w.set(G,F*M*I);let d=[I,I,I,I,I,I];V.set(d,q*M*I)}let _=new M8;if(_.setAttribute("position",new N8(A,z)),_.setAttribute("uv",new N8(w,F)),_.setAttribute("faceIndex",new N8(V,q)),Z.push(new h8(_,null)),W>S9)W--}return{lodMeshes:Z,sizeLods:Q,sigmas:$}}function ZW(J,Q,$){let Z=new d8(J,Q,$);return Z.texture.mapping=v7,Z.texture.name="PMREM.cubeUv",Z.scissorTest=!0,Z}function V7(J,Q,$,Z,W){J.viewport.set(Q,$,Z,W),J.scissor.set(Q,$,Z,W)}function CX(J,Q,$){return new T8({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:IX,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:t6(),fragmentShader:`

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
		`,blending:e8,depthTest:!1,depthWrite:!1})}function wX(J,Q,$){let Z=new Float32Array(a9),W=new y(0,1,0);return new T8({name:"SphericalGaussianBlur",defines:{n:a9,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:Z},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:W}},vertexShader:t6(),fragmentShader:`

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
		`,blending:e8,depthTest:!1,depthWrite:!1})}function WW(){return new T8({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:t6(),fragmentShader:`

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
		`,blending:e8,depthTest:!1,depthWrite:!1})}function KW(){return new T8({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:t6(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:e8,depthTest:!1,depthWrite:!1})}function t6(){return`

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
	`}class q$ extends d8{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},Z=[$,$,$,$,$,$];this.texture=new c6(Z),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},Z=new M7(5,5,5),W=new T8({name:"CubemapFromEquirect",uniforms:n9($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:P8,blending:e8});W.uniforms.tEquirect.value=Q;let K=new h8(Z,W),H=Q.minFilter;if(Q.minFilter===g9)Q.minFilter=_8;return new tQ(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,Z=!0){let W=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,Z);J.setRenderTarget(W)}}function PX(J){let Q=new WeakMap,$=new WeakMap,Z=null;function W(G,D=!1){if(G===null||G===void 0)return null;if(D)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let D=G.mapping;if(D===V6||D===B6)if(Q.has(G)){let M=Q.get(G).texture;return Y(M,G.mapping)}else{let M=G.image;if(M&&M.height>0){let z=new q$(M.height);return z.fromEquirectangularTexture(J,G),Q.set(G,z),G.addEventListener("dispose",U),Y(z.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let D=G.mapping,M=D===V6||D===B6,z=D===R7||D===x9;if(M||z){let F=$.get(G),q=F!==void 0?F.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==q){if(Z===null)Z=new G$(J);return F=M?Z.fromEquirectangular(G,F):Z.fromCubemap(G,F),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),F.texture}else if(F!==void 0)return F.texture;else{let A=G.image;if(M&&A&&A.height>0||z&&A&&X(A)){if(Z===null)Z=new G$(J);return F=M?Z.fromEquirectangular(G):Z.fromCubemap(G),F.texture.pmremVersion=G.pmremVersion,$.set(G,F),G.addEventListener("dispose",N),F.texture}else return null}}}return G}function Y(G,D){if(D===V6)G.mapping=R7;else if(D===B6)G.mapping=x9;return G}function X(G){let D=0,M=6;for(let z=0;z<M;z++)if(G[z]!==void 0)D++;return D===M}function U(G){let D=G.target;D.removeEventListener("dispose",U);let M=Q.get(D);if(M!==void 0)Q.delete(D),M.dispose()}function N(G){let D=G.target;D.removeEventListener("dispose",N);let M=$.get(D);if(M!==void 0)$.delete(D),M.dispose()}function E(){if(Q=new WeakMap,$=new WeakMap,Z!==null)Z.dispose(),Z=null}return{get:W,dispose:E}}function TX(J){let Q={};function $(Z){if(Q[Z]!==void 0)return Q[Z];let W=J.getExtension(Z);return Q[Z]=W,W}return{has:function(Z){return $(Z)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(Z){let W=$(Z);if(W===null)h9("WebGLRenderer: "+Z+" extension not supported.");return W}}}function SX(J,Q,$,Z){let W={},K=new WeakMap;function H(E){let G=E.target;if(G.index!==null)Q.remove(G.index);for(let M in G.attributes)Q.remove(G.attributes[M]);G.removeEventListener("dispose",H),delete W[G.id];let D=K.get(G);if(D)Q.remove(D),K.delete(G);if(Z.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(E,G){if(W[G.id]===!0)return G;return G.addEventListener("dispose",H),W[G.id]=!0,$.memory.geometries++,G}function X(E){let G=E.attributes;for(let D in G)Q.update(G[D],J.ARRAY_BUFFER)}function U(E){let G=[],D=E.index,M=E.attributes.position,z=0;if(M===void 0)return;if(D!==null){let A=D.array;z=D.version;for(let w=0,V=A.length;w<V;w+=3){let _=A[w+0],I=A[w+1],P=A[w+2];G.push(_,I,I,P,P,_)}}else{let A=M.array;z=M.version;for(let w=0,V=A.length/3-1;w<V;w+=3){let _=w+0,I=w+1,P=w+2;G.push(_,I,I,P,P,_)}}let F=new(M.count>=65535?p6:g6)(G,1);F.version=z;let q=K.get(E);if(q)Q.remove(q);K.set(E,F)}function N(E){let G=K.get(E);if(G){let D=E.index;if(D!==null){if(G.version<D.version)U(E)}}else U(E);return K.get(E)}return{get:Y,update:X,getWireframeAttribute:N}}function jX(J,Q,$){let Z;function W(E){Z=E}let K,H;function Y(E){K=E.type,H=E.bytesPerElement}function X(E,G){J.drawElements(Z,G,K,E*H),$.update(G,Z,1)}function U(E,G,D){if(D===0)return;J.drawElementsInstanced(Z,G,K,E*H,D),$.update(G,Z,D)}function N(E,G,D){if(D===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(Z,G,0,K,E,0,D);let z=0;for(let F=0;F<D;F++)z+=G[F];$.update(z,Z,1)}this.setMode=W,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=N}function vX(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function Z(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:w0("WebGLInfo: Unknown draw mode:",H);break}}function W(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:W,update:Z}}function yX(J,Q,$){let Z=new WeakMap,W=new K8;function K(H,Y,X){let U=H.morphTargetInfluences,N=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,E=N!==void 0?N.length:0,G=Z.get(Y);if(G===void 0||G.count!==E){let B=function(){P.dispose(),Z.delete(Y),Y.removeEventListener("dispose",B)};if(G!==void 0)G.texture.dispose();let D=Y.morphAttributes.position!==void 0,M=Y.morphAttributes.normal!==void 0,z=Y.morphAttributes.color!==void 0,F=Y.morphAttributes.position||[],q=Y.morphAttributes.normal||[],A=Y.morphAttributes.color||[],w=0;if(D===!0)w=1;if(M===!0)w=2;if(z===!0)w=3;let V=Y.attributes.position.count*w,_=1;if(V>Q.maxTextureSize)_=Math.ceil(V/Q.maxTextureSize),V=Q.maxTextureSize;let I=new Float32Array(V*_*4*E),P=new b6(I,V,_,E);P.type=E9,P.needsUpdate=!0;let R=w*4;for(let d=0;d<E;d++){let C=F[d],m=q[d],o=A[d],p=V*_*4*d;for(let n=0;n<C.count;n++){let u=n*R;if(D===!0)W.fromBufferAttribute(C,n),I[p+u+0]=W.x,I[p+u+1]=W.y,I[p+u+2]=W.z,I[p+u+3]=0;if(M===!0)W.fromBufferAttribute(m,n),I[p+u+4]=W.x,I[p+u+5]=W.y,I[p+u+6]=W.z,I[p+u+7]=0;if(z===!0)W.fromBufferAttribute(o,n),I[p+u+8]=W.x,I[p+u+9]=W.y,I[p+u+10]=W.z,I[p+u+11]=o.itemSize===4?W.w:1}}G={count:E,texture:P,size:new u0(V,_)},Z.set(Y,G),Y.addEventListener("dispose",B)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let D=0;for(let z=0;z<U.length;z++)D+=U[z];let M=Y.morphTargetsRelative?1:1-D;X.getUniforms().setValue(J,"morphTargetBaseInfluence",M),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function fX(J,Q,$,Z,W){let K=new WeakMap;function H(U){let N=W.render.frame,E=U.geometry,G=Q.get(U,E);if(K.get(G)!==N)Q.update(G),K.set(G,N);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==N){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,N)}}if(U.isSkinnedMesh){let D=U.skeleton;if(K.get(D)!==N)D.update(),K.set(D,N)}return G}function Y(){K=new WeakMap}function X(U){let N=U.target;if(N.removeEventListener("dispose",X),Z.releaseStatesOfObject(N),$.remove(N.instanceMatrix),N.instanceColor!==null)$.remove(N.instanceColor)}return{update:H,dispose:Y}}var bX={[fJ]:"LINEAR_TONE_MAPPING",[bJ]:"REINHARD_TONE_MAPPING",[hJ]:"CINEON_TONE_MAPPING",[xJ]:"ACES_FILMIC_TONE_MAPPING",[pJ]:"AGX_TONE_MAPPING",[mJ]:"NEUTRAL_TONE_MAPPING",[gJ]:"CUSTOM_TONE_MAPPING"};function hX(J,Q,$,Z,W,K){let H=new d8(Q,$,{type:J,depthBuffer:W,stencilBuffer:K,samples:Z?4:0,depthTexture:W?new P9(Q,$):void 0}),Y=new d8(Q,$,{type:q9,depthBuffer:!1,stencilBuffer:!1}),X=new M8;X.setAttribute("position",new f8([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new f8([0,2,0,0,2,0],2));let U=new gQ({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),N=new h8(X,U),E=new L7(-1,1,1,-1,0,1),G=null,D=null,M=!1,z,F=null,q=[],A=!1;this.setSize=function(w,V){H.setSize(w,V),Y.setSize(w,V);for(let _=0;_<q.length;_++){let I=q[_];if(I.setSize)I.setSize(w,V)}},this.setEffects=function(w){q=w,A=q.length>0&&q[0].isRenderPass===!0;let{width:V,height:_}=H;for(let I=0;I<q.length;I++){let P=q[I];if(P.setSize)P.setSize(V,_)}},this.begin=function(w,V){if(M)return!1;if(w.toneMapping===i8&&q.length===0)return!1;if(F=V,V!==null){let{width:_,height:I}=V;if(H.width!==_||H.height!==I)this.setSize(_,I)}if(A===!1)w.setRenderTarget(H);return z=w.toneMapping,w.toneMapping=i8,!0},this.hasRenderPass=function(){return A},this.end=function(w,V){w.toneMapping=z,M=!0;let _=H,I=Y;for(let P=0;P<q.length;P++){let R=q[P];if(R.enabled===!1)continue;if(R.render(w,I,_,V),R.needsSwap!==!1){let B=_;_=I,I=B}}if(G!==w.outputColorSpace||D!==w.toneMapping){if(G=w.outputColorSpace,D=w.toneMapping,U.defines={},h0.getTransfer(G)===r0)U.defines.SRGB_TRANSFER="";let P=bX[D];if(P)U.defines[P]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=_.texture,w.setRenderTarget(F),w.render(N,E),F=null,M=!1},this.isCompositing=function(){return M},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var _W=new z8,N$=new P9(1,1),AW=new b6,CW=new vQ,wW=new c6,HW=[],YW=[],XW=new Float32Array(16),UW=new Float32Array(9),GW=new Float32Array(4);function B7(J,Q,$){let Z=J[0];if(Z<=0||Z>0)return J;let W=Q*$,K=HW[W];if(K===void 0)K=new Float32Array(W),HW[W]=K;if(Q!==0){Z.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function q8(J,Q){if(J.length!==Q.length)return!1;for(let $=0,Z=J.length;$<Z;$++)if(J[$]!==Q[$])return!1;return!0}function F8(J,Q){for(let $=0,Z=Q.length;$<Z;$++)J[$]=Q[$]}function e6(J,Q){let $=YW[Q];if($===void 0)$=new Int32Array(Q),YW[Q]=$;for(let Z=0;Z!==Q;++Z)$[Z]=J.allocateTextureUnit();return $}function xX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function gX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2fv(this.addr,Q),F8($,Q)}}function pX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(q8($,Q))return;J.uniform3fv(this.addr,Q),F8($,Q)}}function mX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4fv(this.addr,Q),F8($,Q)}}function lX(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q8($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,Z))return;GW.set(Z),J.uniformMatrix2fv(this.addr,!1,GW),F8($,Z)}}function dX(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q8($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,Z))return;UW.set(Z),J.uniformMatrix3fv(this.addr,!1,UW),F8($,Z)}}function uX(J,Q){let $=this.cache,Z=Q.elements;if(Z===void 0){if(q8($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,Z))return;XW.set(Z),J.uniformMatrix4fv(this.addr,!1,XW),F8($,Z)}}function cX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function nX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2iv(this.addr,Q),F8($,Q)}}function sX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3iv(this.addr,Q),F8($,Q)}}function iX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4iv(this.addr,Q),F8($,Q)}}function oX(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function aX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2uiv(this.addr,Q),F8($,Q)}}function rX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3uiv(this.addr,Q),F8($,Q)}}function tX(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4uiv(this.addr,Q),F8($,Q)}}function eX(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;let K;if(this.type===J.SAMPLER_2D_SHADOW)N$.compareFunction=$.isReversedDepthBuffer()?f6:y6,K=N$;else K=_W;$.setTexture2D(Q||K,W)}function JU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture3D(Q||CW,W)}function QU(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTextureCube(Q||wW,W)}function $U(J,Q,$){let Z=this.cache,W=$.allocateTextureUnit();if(Z[0]!==W)J.uniform1i(this.addr,W),Z[0]=W;$.setTexture2DArray(Q||AW,W)}function ZU(J){switch(J){case 5126:return xX;case 35664:return gX;case 35665:return pX;case 35666:return mX;case 35674:return lX;case 35675:return dX;case 35676:return uX;case 5124:case 35670:return cX;case 35667:case 35671:return nX;case 35668:case 35672:return sX;case 35669:case 35673:return iX;case 5125:return oX;case 36294:return aX;case 36295:return rX;case 36296:return tX;case 35678:case 36198:case 36298:case 36306:case 35682:return eX;case 35679:case 36299:case 36307:return JU;case 35680:case 36300:case 36308:case 36293:return QU;case 36289:case 36303:case 36311:case 36292:return $U}}function WU(J,Q){J.uniform1fv(this.addr,Q)}function KU(J,Q){let $=B7(Q,this.size,2);J.uniform2fv(this.addr,$)}function HU(J,Q){let $=B7(Q,this.size,3);J.uniform3fv(this.addr,$)}function YU(J,Q){let $=B7(Q,this.size,4);J.uniform4fv(this.addr,$)}function XU(J,Q){let $=B7(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function UU(J,Q){let $=B7(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function GU(J,Q){let $=B7(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function NU(J,Q){J.uniform1iv(this.addr,Q)}function EU(J,Q){J.uniform2iv(this.addr,Q)}function qU(J,Q){J.uniform3iv(this.addr,Q)}function FU(J,Q){J.uniform4iv(this.addr,Q)}function DU(J,Q){J.uniform1uiv(this.addr,Q)}function OU(J,Q){J.uniform2uiv(this.addr,Q)}function RU(J,Q){J.uniform3uiv(this.addr,Q)}function kU(J,Q){J.uniform4uiv(this.addr,Q)}function MU(J,Q,$){let Z=this.cache,W=Q.length,K=e6($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=N$;else H=_W;for(let Y=0;Y!==W;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function LU(J,Q,$){let Z=this.cache,W=Q.length,K=e6($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);for(let H=0;H!==W;++H)$.setTexture3D(Q[H]||CW,K[H])}function VU(J,Q,$){let Z=this.cache,W=Q.length,K=e6($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);for(let H=0;H!==W;++H)$.setTextureCube(Q[H]||wW,K[H])}function BU(J,Q,$){let Z=this.cache,W=Q.length,K=e6($,W);if(!q8(Z,K))J.uniform1iv(this.addr,K),F8(Z,K);for(let H=0;H!==W;++H)$.setTexture2DArray(Q[H]||AW,K[H])}function zU(J){switch(J){case 5126:return WU;case 35664:return KU;case 35665:return HU;case 35666:return YU;case 35674:return XU;case 35675:return UU;case 35676:return GU;case 5124:case 35670:return NU;case 35667:case 35671:return EU;case 35668:case 35672:return qU;case 35669:case 35673:return FU;case 5125:return DU;case 36294:return OU;case 36295:return RU;case 36296:return kU;case 35678:case 36198:case 36298:case 36306:case 35682:return MU;case 35679:case 36299:case 36307:return LU;case 35680:case 36300:case 36308:case 36293:return VU;case 36289:case 36303:case 36311:case 36292:return BU}}class PW{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=ZU(Q.type)}}class TW{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=zU(Q.type)}}class SW{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let Z=this.seq;for(let W=0,K=Z.length;W!==K;++W){let H=Z[W];H.setValue(J,Q[H.id],$)}}}var X$=/(\w+)(\])?(\[|\.)?/g;function NW(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function IU(J,Q,$){let Z=J.name,W=Z.length;X$.lastIndex=0;while(!0){let K=X$.exec(Z),H=X$.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===W){NW($,U===void 0?new PW(Y,J,Q):new TW(Y,J,Q));break}else{let E=$.map[Y];if(E===void 0)E=new SW(Y),NW($,E);$=E}}}class c7{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);IU(H,Y,this)}let Z=[],W=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)Z.push(K);else W.push(K);if(Z.length>0)this.seq=Z.concat(W)}setValue(J,Q,$,Z){let W=this.map[Q];if(W!==void 0)W.setValue(J,$,Z)}setOptional(J,Q,$){let Z=Q[$];if(Z!==void 0)this.setValue(J,$,Z)}static upload(J,Q,$,Z){for(let W=0,K=Q.length;W!==K;++W){let H=Q[W],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,Z)}}static seqWithValue(J,Q){let $=[];for(let Z=0,W=J.length;Z!==W;++Z){let K=J[Z];if(K.id in Q)$.push(K)}return $}}function EW(J,Q,$){let Z=J.createShader(Q);return J.shaderSource(Z,$),J.compileShader(Z),Z}var _U=37297,AU=0;function CU(J,Q){let $=J.split(`
`),Z=[],W=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=W;H<K;H++){let Y=H+1;Z.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return Z.join(`
`)}var qW=new P0;function wU(J){h0._getMatrix(qW,h0.workingColorSpace,J);let Q=`mat3( ${qW.elements.map(($)=>$.toFixed(4))} )`;switch(h0.getTransfer(J)){case AQ:return[Q,"LinearTransferOETF"];case r0:return[Q,"sRGBTransferOETF"];default:return _0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function FW(J,Q,$){let Z=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(Z&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+CU(J.getShaderSource(Q),Y)}else return K}function PU(J,Q){let $=wU(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var TU={[fJ]:"Linear",[bJ]:"Reinhard",[hJ]:"Cineon",[xJ]:"ACESFilmic",[pJ]:"AgX",[mJ]:"Neutral",[gJ]:"Custom"};function SU(J,Q){let $=TU[Q];if($===void 0)return _0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var r6=new y;function jU(){h0.getLuminanceCoefficients(r6);let J=r6.x.toFixed(4),Q=r6.y.toFixed(4),$=r6.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function vU(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(u7).join(`
`)}function yU(J){let Q=[];for(let $ in J){let Z=J[$];if(Z===!1)continue;Q.push("#define "+$+" "+Z)}return Q.join(`
`)}function fU(J,Q){let $={},Z=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let W=0;W<Z;W++){let K=J.getActiveAttrib(Q,W),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function u7(J){return J!==""}function DW(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function OW(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var bU=/^[ \t]*#include +<([\w\d./]+)>/gm;function E$(J){return J.replace(bU,xU)}var hU=new Map;function xU(J,Q){let $=j0[Q];if($===void 0){let Z=hU.get(Q);if(Z!==void 0)$=j0[Z],_0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,Z);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return E$($)}var gU=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function RW(J){return J.replace(gU,pU)}function pU(J,Q,$,Z){let W="";for(let K=parseInt(Q);K<parseInt($);K++)W+=Z.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return W}function kW(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var mU={[S7]:"SHADOWMAP_TYPE_PCF",[F7]:"SHADOWMAP_TYPE_VSM"};function lU(J){return mU[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var dU={[R7]:"ENVMAP_TYPE_CUBE",[x9]:"ENVMAP_TYPE_CUBE",[v7]:"ENVMAP_TYPE_CUBE_UV"};function uU(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return dU[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var cU={[x9]:"ENVMAP_MODE_REFRACTION"};function nU(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return cU[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var sU={[PZ]:"ENVMAP_BLENDING_MULTIPLY",[TZ]:"ENVMAP_BLENDING_MIX",[SZ]:"ENVMAP_BLENDING_ADD"};function iU(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return sU[J.combine]||"ENVMAP_BLENDING_NONE"}function oU(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,Z=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:Z,maxMip:$}}function aU(J,Q,$,Z){let W=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=lU($),U=uU($),N=nU($),E=iU($),G=oU($),D=vU($),M=yU(K),z=W.createProgram(),F,q,A=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(F=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M].filter(u7).join(`
`),F.length>0)F+=`
`;if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M].filter(u7).join(`
`),q.length>0)q+=`
`}else F=[kW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+N:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(u7).join(`
`),q=[kW($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,M,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+N:"",$.envMap?"#define "+E:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==i8?"#define TONE_MAPPING":"",$.toneMapping!==i8?j0.tonemapping_pars_fragment:"",$.toneMapping!==i8?SU("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",j0.colorspace_pars_fragment,PU("linearToOutputTexel",$.outputColorSpace),jU(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(u7).join(`
`);if(H=E$(H),H=DW(H,$),H=OW(H,$),Y=E$(Y),Y=DW(Y,$),Y=OW(Y,$),H=RW(H),Y=RW(Y),$.isRawShaderMaterial!==!0)A=`#version 300 es
`,F=[D,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+F,q=["#define varying in",$.glslVersion===wQ?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===wQ?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+q;let w=A+F+H,V=A+q+Y,_=EW(W,W.VERTEX_SHADER,w),I=EW(W,W.FRAGMENT_SHADER,V);if(W.attachShader(z,_),W.attachShader(z,I),$.index0AttributeName!==void 0)W.bindAttribLocation(z,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)W.bindAttribLocation(z,0,"position");W.linkProgram(z);function P(C){if(J.debug.checkShaderErrors){let m=W.getProgramInfoLog(z)||"",o=W.getShaderInfoLog(_)||"",p=W.getShaderInfoLog(I)||"",n=m.trim(),u=o.trim(),h=p.trim(),t=!0,e=!0;if(W.getProgramParameter(z,W.LINK_STATUS)===!1)if(t=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(W,z,_,I);else{let H0=FW(W,_,"vertex"),M0=FW(W,I,"fragment");w0("WebGLProgram: Shader Error "+W.getError()+" - VALIDATE_STATUS "+W.getProgramParameter(z,W.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+n+`
`+H0+`
`+M0)}else if(n!=="")_0("WebGLProgram: Program Info Log:",n);else if(u===""||h==="")e=!1;if(e)C.diagnostics={runnable:t,programLog:n,vertexShader:{log:u,prefix:F},fragmentShader:{log:h,prefix:q}}}W.deleteShader(_),W.deleteShader(I),R=new c7(W,z),B=fU(W,z)}let R;this.getUniforms=function(){if(R===void 0)P(this);return R};let B;this.getAttributes=function(){if(B===void 0)P(this);return B};let d=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(d===!1)d=W.getProgramParameter(z,_U);return d},this.destroy=function(){Z.releaseStatesOfProgram(this),W.deleteProgram(z),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=AU++,this.cacheKey=Q,this.usedTimes=1,this.program=z,this.vertexShader=_,this.fragmentShader=I,this}var rU=0;class jW{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let Z=this._getShaderCacheForMaterial(J);if(Z.has(Q)===!1)Z.add(Q),Q.usedTimes++;if(Z.has($)===!1)Z.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new vW(J),Q.set(J,$);return $}}class vW{constructor(J){this.id=rU++,this.code=J,this.usedTimes=0}}function tU(J){return J===l9||J===S6||J===j6}function eU(J,Q,$,Z,W,K){let H=new h6,Y=new jW,X=new Set,U=[],N=new Map,E=Z.logarithmicDepthBuffer,G=Z.precision,D={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(R){if(X.add(R),R===0)return"uv";return`uv${R}`}function z(R,B,d,C,m,o){let p=C.fog,n=m.geometry,u=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?C.environment:null,h=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap,t=Q.get(R.envMap||u,h),e=!!t&&t.mapping===v7?t.image.height:null,H0=D[R.type];if(R.precision!==null){if(G=Z.getMaxPrecision(R.precision),G!==R.precision)_0("WebGLProgram.getParameters:",R.precision,"not supported, using",G,"instead.")}let M0=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,k0=M0!==void 0?M0.length:0,W8=0;if(n.morphAttributes.position!==void 0)W8=1;if(n.morphAttributes.normal!==void 0)W8=2;if(n.morphAttributes.color!==void 0)W8=3;let i0,i,Z0,F0;if(H0){let T0=$9[H0];i0=T0.vertexShader,i=T0.fragmentShader}else{i0=R.vertexShader,i=R.fragmentShader;let T0=Y.getVertexShaderStage(R),H8=Y.getFragmentShaderStage(R);Y.update(R,T0,H8),Z0=T0.id,F0=H8.id}let D0=J.getRenderTarget(),C0=J.state.buffers.depth.getReversed(),p0=m.isInstancedMesh===!0,y0=m.isBatchedMesh===!0,f0=!!R.map,t0=!!R.matcap,m0=!!t,b0=!!R.aoMap,D8=!!R.lightMap,x8=!!R.bumpMap&&R.wireframe===!1,Q8=!!R.normalMap,k8=!!R.displacementMap,O8=!!R.emissiveMap,E8=!!R.metalnessMap,j=!!R.roughnessMap,g8=R.anisotropy>0,c0=R.clearcoat>0,$8=R.dispersion>0,L=R.iridescence>0,O=R.sheen>0,T=R.transmission>0,g=g8&&!!R.anisotropyMap,r=c0&&!!R.clearcoatMap,J0=c0&&!!R.clearcoatNormalMap,Y0=c0&&!!R.clearcoatRoughnessMap,l=L&&!!R.iridescenceMap,s=L&&!!R.iridescenceThicknessMap,E0=O&&!!R.sheenColorMap,V0=O&&!!R.sheenRoughnessMap,X0=!!R.specularMap,Q0=!!R.specularColorMap,I0=!!R.specularIntensityMap,A0=T&&!!R.transmissionMap,d0=T&&!!R.thicknessMap,S=!!R.gradientMap,$0=!!R.alphaMap,c=R.alphaTest>0,W0=!!R.alphaHash,q0=!!R.extensions,a=i8;if(R.toneMapped){if(D0===null||D0.isXRRenderTarget===!0)a=J.toneMapping}let K0={shaderID:H0,shaderType:R.type,shaderName:R.name,vertexShader:i0,fragmentShader:i,defines:R.defines,customVertexShaderID:Z0,customFragmentShaderID:F0,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:G,batching:y0,batchingColor:y0&&m._colorsTexture!==null,instancing:p0,instancingColor:p0&&m.instanceColor!==null,instancingMorph:p0&&m.morphTexture!==null,outputColorSpace:D0===null?J.outputColorSpace:D0.isXRRenderTarget===!0?D0.texture.colorSpace:h0.workingColorSpace,alphaToCoverage:!!R.alphaToCoverage,map:f0,matcap:t0,envMap:m0,envMapMode:m0&&t.mapping,envMapCubeUVHeight:e,aoMap:b0,lightMap:D8,bumpMap:x8,normalMap:Q8,displacementMap:k8,emissiveMap:O8,normalMapObjectSpace:Q8&&R.normalMapType===pZ,normalMapTangentSpace:Q8&&R.normalMapType===IQ,packedNormalMap:Q8&&R.normalMapType===IQ&&tU(R.normalMap.format),metalnessMap:E8,roughnessMap:j,anisotropy:g8,anisotropyMap:g,clearcoat:c0,clearcoatMap:r,clearcoatNormalMap:J0,clearcoatRoughnessMap:Y0,dispersion:$8,iridescence:L,iridescenceMap:l,iridescenceThicknessMap:s,sheen:O,sheenColorMap:E0,sheenRoughnessMap:V0,specularMap:X0,specularColorMap:Q0,specularIntensityMap:I0,transmission:T,transmissionMap:A0,thicknessMap:d0,gradientMap:S,opaque:R.transparent===!1&&R.blending===j7&&R.alphaToCoverage===!1,alphaMap:$0,alphaTest:c,alphaHash:W0,combine:R.combine,mapUv:f0&&M(R.map.channel),aoMapUv:b0&&M(R.aoMap.channel),lightMapUv:D8&&M(R.lightMap.channel),bumpMapUv:x8&&M(R.bumpMap.channel),normalMapUv:Q8&&M(R.normalMap.channel),displacementMapUv:k8&&M(R.displacementMap.channel),emissiveMapUv:O8&&M(R.emissiveMap.channel),metalnessMapUv:E8&&M(R.metalnessMap.channel),roughnessMapUv:j&&M(R.roughnessMap.channel),anisotropyMapUv:g&&M(R.anisotropyMap.channel),clearcoatMapUv:r&&M(R.clearcoatMap.channel),clearcoatNormalMapUv:J0&&M(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y0&&M(R.clearcoatRoughnessMap.channel),iridescenceMapUv:l&&M(R.iridescenceMap.channel),iridescenceThicknessMapUv:s&&M(R.iridescenceThicknessMap.channel),sheenColorMapUv:E0&&M(R.sheenColorMap.channel),sheenRoughnessMapUv:V0&&M(R.sheenRoughnessMap.channel),specularMapUv:X0&&M(R.specularMap.channel),specularColorMapUv:Q0&&M(R.specularColorMap.channel),specularIntensityMapUv:I0&&M(R.specularIntensityMap.channel),transmissionMapUv:A0&&M(R.transmissionMap.channel),thicknessMapUv:d0&&M(R.thicknessMap.channel),alphaMapUv:$0&&M(R.alphaMap.channel),vertexTangents:!!n.attributes.tangent&&(Q8||g8),vertexNormals:!!n.attributes.normal,vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,pointsUvs:m.isPoints===!0&&!!n.attributes.uv&&(f0||$0),fog:!!p,useFog:R.fog===!0,fogExp2:!!p&&p.isFogExp2,flatShading:R.wireframe===!1&&(R.flatShading===!0||n.attributes.normal===void 0&&Q8===!1&&(R.isMeshLambertMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isMeshPhysicalMaterial)),sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:E,reversedDepthBuffer:C0,skinning:m.isSkinnedMesh===!0,hasPositionAttribute:n.attributes.position!==void 0,morphTargets:n.morphAttributes.position!==void 0,morphNormals:n.morphAttributes.normal!==void 0,morphColors:n.morphAttributes.color!==void 0,morphTargetsCount:k0,morphTextureStride:W8,numDirLights:B.directional.length,numPointLights:B.point.length,numSpotLights:B.spot.length,numSpotLightMaps:B.spotLightMap.length,numRectAreaLights:B.rectArea.length,numHemiLights:B.hemi.length,numDirLightShadows:B.directionalShadowMap.length,numPointLightShadows:B.pointShadowMap.length,numSpotLightShadows:B.spotShadowMap.length,numSpotLightShadowsWithMaps:B.numSpotLightShadowsWithMaps,numLightProbes:B.numLightProbes,numLightProbeGrids:o.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:R.dithering,shadowMapEnabled:J.shadowMap.enabled&&d.length>0,shadowMapType:J.shadowMap.type,toneMapping:a,decodeVideoTexture:f0&&R.map.isVideoTexture===!0&&h0.getTransfer(R.map.colorSpace)===r0,decodeVideoTextureEmissive:O8&&R.emissiveMap.isVideoTexture===!0&&h0.getTransfer(R.emissiveMap.colorSpace)===r0,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===t8,flipSided:R.side===P8,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:q0&&R.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(q0&&R.extensions.multiDraw===!0||y0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return K0.vertexUv1s=X.has(1),K0.vertexUv2s=X.has(2),K0.vertexUv3s=X.has(3),X.clear(),K0}function F(R){let B=[];if(R.shaderID)B.push(R.shaderID);else B.push(R.customVertexShaderID),B.push(R.customFragmentShaderID);if(R.defines!==void 0)for(let d in R.defines)B.push(d),B.push(R.defines[d]);if(R.isRawShaderMaterial===!1)q(B,R),A(B,R),B.push(J.outputColorSpace);return B.push(R.customProgramCacheKey),B.join()}function q(R,B){R.push(B.precision),R.push(B.outputColorSpace),R.push(B.envMapMode),R.push(B.envMapCubeUVHeight),R.push(B.mapUv),R.push(B.alphaMapUv),R.push(B.lightMapUv),R.push(B.aoMapUv),R.push(B.bumpMapUv),R.push(B.normalMapUv),R.push(B.displacementMapUv),R.push(B.emissiveMapUv),R.push(B.metalnessMapUv),R.push(B.roughnessMapUv),R.push(B.anisotropyMapUv),R.push(B.clearcoatMapUv),R.push(B.clearcoatNormalMapUv),R.push(B.clearcoatRoughnessMapUv),R.push(B.iridescenceMapUv),R.push(B.iridescenceThicknessMapUv),R.push(B.sheenColorMapUv),R.push(B.sheenRoughnessMapUv),R.push(B.specularMapUv),R.push(B.specularColorMapUv),R.push(B.specularIntensityMapUv),R.push(B.transmissionMapUv),R.push(B.thicknessMapUv),R.push(B.combine),R.push(B.fogExp2),R.push(B.sizeAttenuation),R.push(B.morphTargetsCount),R.push(B.morphAttributeCount),R.push(B.numDirLights),R.push(B.numPointLights),R.push(B.numSpotLights),R.push(B.numSpotLightMaps),R.push(B.numHemiLights),R.push(B.numRectAreaLights),R.push(B.numDirLightShadows),R.push(B.numPointLightShadows),R.push(B.numSpotLightShadows),R.push(B.numSpotLightShadowsWithMaps),R.push(B.numLightProbes),R.push(B.shadowMapType),R.push(B.toneMapping),R.push(B.numClippingPlanes),R.push(B.numClipIntersection),R.push(B.depthPacking)}function A(R,B){if(H.disableAll(),B.instancing)H.enable(0);if(B.instancingColor)H.enable(1);if(B.instancingMorph)H.enable(2);if(B.matcap)H.enable(3);if(B.envMap)H.enable(4);if(B.normalMapObjectSpace)H.enable(5);if(B.normalMapTangentSpace)H.enable(6);if(B.clearcoat)H.enable(7);if(B.iridescence)H.enable(8);if(B.alphaTest)H.enable(9);if(B.vertexColors)H.enable(10);if(B.vertexAlphas)H.enable(11);if(B.vertexUv1s)H.enable(12);if(B.vertexUv2s)H.enable(13);if(B.vertexUv3s)H.enable(14);if(B.vertexTangents)H.enable(15);if(B.anisotropy)H.enable(16);if(B.alphaHash)H.enable(17);if(B.batching)H.enable(18);if(B.dispersion)H.enable(19);if(B.batchingColor)H.enable(20);if(B.gradientMap)H.enable(21);if(B.packedNormalMap)H.enable(22);if(B.vertexNormals)H.enable(23);if(R.push(H.mask),H.disableAll(),B.fog)H.enable(0);if(B.useFog)H.enable(1);if(B.flatShading)H.enable(2);if(B.logarithmicDepthBuffer)H.enable(3);if(B.reversedDepthBuffer)H.enable(4);if(B.skinning)H.enable(5);if(B.morphTargets)H.enable(6);if(B.morphNormals)H.enable(7);if(B.morphColors)H.enable(8);if(B.premultipliedAlpha)H.enable(9);if(B.shadowMapEnabled)H.enable(10);if(B.doubleSided)H.enable(11);if(B.flipSided)H.enable(12);if(B.useDepthPacking)H.enable(13);if(B.dithering)H.enable(14);if(B.transmission)H.enable(15);if(B.sheen)H.enable(16);if(B.opaque)H.enable(17);if(B.pointsUvs)H.enable(18);if(B.decodeVideoTexture)H.enable(19);if(B.decodeVideoTextureEmissive)H.enable(20);if(B.alphaToCoverage)H.enable(21);if(B.numLightProbeGrids>0)H.enable(22);if(B.hasPositionAttribute)H.enable(23);R.push(H.mask)}function w(R){let B=D[R.type],d;if(B){let C=$9[B];d=tZ.clone(C.uniforms)}else d=R.uniforms;return d}function V(R,B){let d=N.get(B);if(d!==void 0)++d.usedTimes;else d=new aU(J,B,R,W),U.push(d),N.set(B,d);return d}function _(R){if(--R.usedTimes===0){let B=U.indexOf(R);U[B]=U[U.length-1],U.pop(),N.delete(R.cacheKey),R.destroy()}}function I(R){Y.remove(R)}function P(){Y.dispose()}return{getParameters:z,getProgramCacheKey:F,getUniforms:w,acquireProgram:V,releaseProgram:_,releaseShaderCache:I,programs:U,dispose:P}}function J5(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function Z(H){J.delete(H)}function W(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:Q,get:$,remove:Z,update:W,dispose:K}}function Q5(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function MW(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function LW(){let J=[],Q=0,$=[],Z=[],W=[];function K(){Q=0,$.length=0,Z.length=0,W.length=0}function H(G){let D=0;if(G.isInstancedMesh)D+=2;if(G.isSkinnedMesh)D+=1;return D}function Y(G,D,M,z,F,q){let A=J[Q];if(A===void 0)A={id:G.id,object:G,geometry:D,material:M,materialVariant:H(G),groupOrder:z,renderOrder:G.renderOrder,z:F,group:q},J[Q]=A;else A.id=G.id,A.object=G,A.geometry=D,A.material=M,A.materialVariant=H(G),A.groupOrder=z,A.renderOrder=G.renderOrder,A.z=F,A.group=q;return Q++,A}function X(G,D,M,z,F,q){let A=Y(G,D,M,z,F,q);if(M.transmission>0)Z.push(A);else if(M.transparent===!0)W.push(A);else $.push(A)}function U(G,D,M,z,F,q){let A=Y(G,D,M,z,F,q);if(M.transmission>0)Z.unshift(A);else if(M.transparent===!0)W.unshift(A);else $.unshift(A)}function N(G,D,M){if($.length>1)$.sort(G||Q5);if(Z.length>1)Z.sort(D||MW);if(W.length>1)W.sort(D||MW);if(M)$.reverse(),Z.reverse(),W.reverse()}function E(){for(let G=Q,D=J.length;G<D;G++){let M=J[G];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:$,transmissive:Z,transparent:W,init:K,push:X,unshift:U,finish:E,sort:N}}function $5(){let J=new WeakMap;function Q(Z,W){let K=J.get(Z),H;if(K===void 0)H=new LW,J.set(Z,[H]);else if(W>=K.length)H=new LW,K.push(H);else H=K[W];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function Z5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new y,color:new x0};break;case"SpotLight":$={position:new y,direction:new y,color:new x0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new y,color:new x0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new y,skyColor:new x0,groundColor:new x0};break;case"RectAreaLight":$={color:new x0,position:new y,halfWidth:new y,halfHeight:new y};break}return J[Q.id]=$,$}}}function W5(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new u0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var K5=0;function H5(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function Y5(J){let Q=new Z5,$=W5(),Z={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)Z.probe.push(new y);let W=new y,K=new Z8,H=new Z8;function Y(U){let N=0,E=0,G=0;for(let B=0;B<9;B++)Z.probe[B].set(0,0,0);let D=0,M=0,z=0,F=0,q=0,A=0,w=0,V=0,_=0,I=0,P=0;U.sort(H5);for(let B=0,d=U.length;B<d;B++){let C=U[B],m=C.color,o=C.intensity,p=C.distance,n=null;if(C.shadow&&C.shadow.map)if(C.shadow.map.texture.format===l9)n=C.shadow.map.texture;else n=C.shadow.map.depthTexture||C.shadow.map.texture;if(C.isAmbientLight)N+=m.r*o,E+=m.g*o,G+=m.b*o;else if(C.isLightProbe){for(let u=0;u<9;u++)Z.probe[u].addScaledVector(C.sh.coefficients[u],o);P++}else if(C.isDirectionalLight){let u=Q.get(C);if(u.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){let h=C.shadow,t=$.get(C);t.shadowIntensity=h.intensity,t.shadowBias=h.bias,t.shadowNormalBias=h.normalBias,t.shadowRadius=h.radius,t.shadowMapSize=h.mapSize,Z.directionalShadow[D]=t,Z.directionalShadowMap[D]=n,Z.directionalShadowMatrix[D]=C.shadow.matrix,A++}Z.directional[D]=u,D++}else if(C.isSpotLight){let u=Q.get(C);u.position.setFromMatrixPosition(C.matrixWorld),u.color.copy(m).multiplyScalar(o),u.distance=p,u.coneCos=Math.cos(C.angle),u.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),u.decay=C.decay,Z.spot[z]=u;let h=C.shadow;if(C.map){if(Z.spotLightMap[_]=C.map,_++,h.updateMatrices(C),C.castShadow)I++}if(Z.spotLightMatrix[z]=h.matrix,C.castShadow){let t=$.get(C);t.shadowIntensity=h.intensity,t.shadowBias=h.bias,t.shadowNormalBias=h.normalBias,t.shadowRadius=h.radius,t.shadowMapSize=h.mapSize,Z.spotShadow[z]=t,Z.spotShadowMap[z]=n,V++}z++}else if(C.isRectAreaLight){let u=Q.get(C);u.color.copy(m).multiplyScalar(o),u.halfWidth.set(C.width*0.5,0,0),u.halfHeight.set(0,C.height*0.5,0),Z.rectArea[F]=u,F++}else if(C.isPointLight){let u=Q.get(C);if(u.color.copy(C.color).multiplyScalar(C.intensity),u.distance=C.distance,u.decay=C.decay,C.castShadow){let h=C.shadow,t=$.get(C);t.shadowIntensity=h.intensity,t.shadowBias=h.bias,t.shadowNormalBias=h.normalBias,t.shadowRadius=h.radius,t.shadowMapSize=h.mapSize,t.shadowCameraNear=h.camera.near,t.shadowCameraFar=h.camera.far,Z.pointShadow[M]=t,Z.pointShadowMap[M]=n,Z.pointShadowMatrix[M]=C.shadow.matrix,w++}Z.point[M]=u,M++}else if(C.isHemisphereLight){let u=Q.get(C);u.skyColor.copy(C.color).multiplyScalar(o),u.groundColor.copy(C.groundColor).multiplyScalar(o),Z.hemi[q]=u,q++}}if(F>0)if(J.has("OES_texture_float_linear")===!0)Z.rectAreaLTC1=U0.LTC_FLOAT_1,Z.rectAreaLTC2=U0.LTC_FLOAT_2;else Z.rectAreaLTC1=U0.LTC_HALF_1,Z.rectAreaLTC2=U0.LTC_HALF_2;Z.ambient[0]=N,Z.ambient[1]=E,Z.ambient[2]=G;let R=Z.hash;if(R.directionalLength!==D||R.pointLength!==M||R.spotLength!==z||R.rectAreaLength!==F||R.hemiLength!==q||R.numDirectionalShadows!==A||R.numPointShadows!==w||R.numSpotShadows!==V||R.numSpotMaps!==_||R.numLightProbes!==P)Z.directional.length=D,Z.spot.length=z,Z.rectArea.length=F,Z.point.length=M,Z.hemi.length=q,Z.directionalShadow.length=A,Z.directionalShadowMap.length=A,Z.pointShadow.length=w,Z.pointShadowMap.length=w,Z.spotShadow.length=V,Z.spotShadowMap.length=V,Z.directionalShadowMatrix.length=A,Z.pointShadowMatrix.length=w,Z.spotLightMatrix.length=V+_-I,Z.spotLightMap.length=_,Z.numSpotLightShadowsWithMaps=I,Z.numLightProbes=P,R.directionalLength=D,R.pointLength=M,R.spotLength=z,R.rectAreaLength=F,R.hemiLength=q,R.numDirectionalShadows=A,R.numPointShadows=w,R.numSpotShadows=V,R.numSpotMaps=_,R.numLightProbes=P,Z.version=K5++}function X(U,N){let E=0,G=0,D=0,M=0,z=0,F=N.matrixWorldInverse;for(let q=0,A=U.length;q<A;q++){let w=U[q];if(w.isDirectionalLight){let V=Z.directional[E];V.direction.setFromMatrixPosition(w.matrixWorld),W.setFromMatrixPosition(w.target.matrixWorld),V.direction.sub(W),V.direction.transformDirection(F),E++}else if(w.isSpotLight){let V=Z.spot[D];V.position.setFromMatrixPosition(w.matrixWorld),V.position.applyMatrix4(F),V.direction.setFromMatrixPosition(w.matrixWorld),W.setFromMatrixPosition(w.target.matrixWorld),V.direction.sub(W),V.direction.transformDirection(F),D++}else if(w.isRectAreaLight){let V=Z.rectArea[M];V.position.setFromMatrixPosition(w.matrixWorld),V.position.applyMatrix4(F),H.identity(),K.copy(w.matrixWorld),K.premultiply(F),H.extractRotation(K),V.halfWidth.set(w.width*0.5,0,0),V.halfHeight.set(0,w.height*0.5,0),V.halfWidth.applyMatrix4(H),V.halfHeight.applyMatrix4(H),M++}else if(w.isPointLight){let V=Z.point[G];V.position.setFromMatrixPosition(w.matrixWorld),V.position.applyMatrix4(F),G++}else if(w.isHemisphereLight){let V=Z.hemi[z];V.direction.setFromMatrixPosition(w.matrixWorld),V.direction.transformDirection(F),z++}}}return{setup:Y,setupView:X,state:Z}}function VW(J){let Q=new Y5(J),$=[],Z=[],W=[];function K(G){E.camera=G,$.length=0,Z.length=0,W.length=0}function H(G){$.push(G)}function Y(G){Z.push(G)}function X(G){W.push(G)}function U(){Q.setup($)}function N(G){Q.setupView($,G)}let E={lightsArray:$,shadowsArray:Z,lightProbeGridArray:W,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:E,setupLights:U,setupLightsView:N,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function X5(J){let Q=new WeakMap;function $(W,K=0){let H=Q.get(W),Y;if(H===void 0)Y=new VW(J),Q.set(W,[Y]);else if(K>=H.length)Y=new VW(J),H.push(Y);else Y=H[K];return Y}function Z(){Q=new WeakMap}return{get:$,dispose:Z}}var U5=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,G5=`uniform sampler2D shadow_pass;
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
}`,N5=[new y(1,0,0),new y(-1,0,0),new y(0,1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1)],E5=[new y(0,-1,0),new y(0,-1,0),new y(0,0,1),new y(0,0,-1),new y(0,-1,0),new y(0,-1,0)],BW=new Z8,d7=new y,U$=new y;function q5(J,Q,$){let Z=new d6,W=new u0,K=new u0,H=new K8,Y=new pQ,X=new mQ,U={},N=$.maxTextureSize,E={[D7]:P8,[P8]:D7,[t8]:t8},G=new T8({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new u0},radius:{value:4}},vertexShader:U5,fragmentShader:G5}),D=G.clone();D.defines.HORIZONTAL_PASS=1;let M=new M8;M.setAttribute("position",new N8(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let z=new h8(M,G),F=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=S7;let q=this.type;this.render=function(I,P,R){if(F.enabled===!1)return;if(F.autoUpdate===!1&&F.needsUpdate===!1)return;if(I.length===0)return;if(this.type===QZ)_0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=S7;let B=J.getRenderTarget(),d=J.getActiveCubeFace(),C=J.getActiveMipmapLevel(),m=J.state;if(m.setBlending(e8),m.buffers.depth.getReversed()===!0)m.buffers.color.setClear(0,0,0,0);else m.buffers.color.setClear(1,1,1,1);m.buffers.depth.setTest(!0),m.setScissorTest(!1);let o=q!==this.type;if(o)P.traverse(function(p){if(p.material)if(Array.isArray(p.material))p.material.forEach((n)=>n.needsUpdate=!0);else p.material.needsUpdate=!0});for(let p=0,n=I.length;p<n;p++){let u=I[p],h=u.shadow;if(h===void 0){_0("WebGLShadowMap:",u,"has no shadow.");continue}if(h.autoUpdate===!1&&h.needsUpdate===!1)continue;W.copy(h.mapSize);let t=h.getFrameExtents();if(W.multiply(t),K.copy(h.mapSize),W.x>N||W.y>N){if(W.x>N)K.x=Math.floor(N/t.x),W.x=K.x*t.x,h.mapSize.x=K.x;if(W.y>N)K.y=Math.floor(N/t.y),W.y=K.y*t.y,h.mapSize.y=K.y}let e=J.state.buffers.depth.getReversed();if(h.camera._reversedDepth=e,h.map===null||o===!0){if(h.map!==null){if(h.map.depthTexture!==null)h.map.depthTexture.dispose(),h.map.depthTexture=null;h.map.dispose()}if(this.type===F7){if(u.isPointLight){_0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}h.map=new d8(W.x,W.y,{format:l9,type:q9,minFilter:_8,magFilter:_8,generateMipmaps:!1}),h.map.texture.name=u.name+".shadowMap",h.map.depthTexture=new P9(W.x,W.y,E9),h.map.depthTexture.name=u.name+".shadowMapDepth",h.map.depthTexture.format=p9,h.map.depthTexture.compareFunction=null,h.map.depthTexture.minFilter=A9,h.map.depthTexture.magFilter=A9}else{if(u.isPointLight)h.map=new q$(W.x),h.map.depthTexture=new hQ(W.x,C9);else h.map=new d8(W.x,W.y),h.map.depthTexture=new P9(W.x,W.y,C9);if(h.map.depthTexture.name=u.name+".shadowMap",h.map.depthTexture.format=p9,this.type===S7)h.map.depthTexture.compareFunction=e?f6:y6,h.map.depthTexture.minFilter=_8,h.map.depthTexture.magFilter=_8;else h.map.depthTexture.compareFunction=null,h.map.depthTexture.minFilter=A9,h.map.depthTexture.magFilter=A9}h.camera.updateProjectionMatrix()}let H0=h.map.isWebGLCubeRenderTarget?6:1;for(let M0=0;M0<H0;M0++){if(h.map.isWebGLCubeRenderTarget)J.setRenderTarget(h.map,M0),J.clear();else{if(M0===0)J.setRenderTarget(h.map),J.clear();let k0=h.getViewport(M0);H.set(K.x*k0.x,K.y*k0.y,K.x*k0.z,K.y*k0.w),m.viewport(H)}if(u.isPointLight){let{camera:k0,matrix:W8}=h,i0=u.distance||k0.far;if(i0!==k0.far)k0.far=i0,k0.updateProjectionMatrix();d7.setFromMatrixPosition(u.matrixWorld),k0.position.copy(d7),U$.copy(k0.position),U$.add(N5[M0]),k0.up.copy(E5[M0]),k0.lookAt(U$),k0.updateMatrixWorld(),W8.makeTranslation(-d7.x,-d7.y,-d7.z),BW.multiplyMatrices(k0.projectionMatrix,k0.matrixWorldInverse),h._frustum.setFromProjectionMatrix(BW,k0.coordinateSystem,k0.reversedDepth)}else h.updateMatrices(u);Z=h.getFrustum(),V(P,R,h.camera,u,this.type)}if(h.isPointLightShadow!==!0&&this.type===F7)A(h,R);h.needsUpdate=!1}q=this.type,F.needsUpdate=!1,J.setRenderTarget(B,d,C)};function A(I,P){let R=Q.update(z);if(G.defines.VSM_SAMPLES!==I.blurSamples)G.defines.VSM_SAMPLES=I.blurSamples,D.defines.VSM_SAMPLES=I.blurSamples,G.needsUpdate=!0,D.needsUpdate=!0;if(I.mapPass===null)I.mapPass=new d8(W.x,W.y,{format:l9,type:q9});G.uniforms.shadow_pass.value=I.map.depthTexture,G.uniforms.resolution.value=I.mapSize,G.uniforms.radius.value=I.radius,J.setRenderTarget(I.mapPass),J.clear(),J.renderBufferDirect(P,null,R,G,z,null),D.uniforms.shadow_pass.value=I.mapPass.texture,D.uniforms.resolution.value=I.mapSize,D.uniforms.radius.value=I.radius,J.setRenderTarget(I.map),J.clear(),J.renderBufferDirect(P,null,R,D,z,null)}function w(I,P,R,B){let d=null,C=R.isPointLight===!0?I.customDistanceMaterial:I.customDepthMaterial;if(C!==void 0)d=C;else if(d=R.isPointLight===!0?X:Y,J.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let m=d.uuid,o=P.uuid,p=U[m];if(p===void 0)p={},U[m]=p;let n=p[o];if(n===void 0)n=d.clone(),p[o]=n,P.addEventListener("dispose",_);d=n}if(d.visible=P.visible,d.wireframe=P.wireframe,B===F7)d.side=P.shadowSide!==null?P.shadowSide:P.side;else d.side=P.shadowSide!==null?P.shadowSide:E[P.side];if(d.alphaMap=P.alphaMap,d.alphaTest=P.alphaToCoverage===!0?0.5:P.alphaTest,d.map=P.map,d.clipShadows=P.clipShadows,d.clippingPlanes=P.clippingPlanes,d.clipIntersection=P.clipIntersection,d.displacementMap=P.displacementMap,d.displacementScale=P.displacementScale,d.displacementBias=P.displacementBias,d.wireframeLinewidth=P.wireframeLinewidth,d.linewidth=P.linewidth,R.isPointLight===!0&&d.isMeshDistanceMaterial===!0){let m=J.properties.get(d);m.light=R}return d}function V(I,P,R,B,d){if(I.visible===!1)return;if(I.layers.test(P.layers)&&(I.isMesh||I.isLine||I.isPoints)){if((I.castShadow||I.receiveShadow&&d===F7)&&(!I.frustumCulled||Z.intersectsObject(I))){I.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,I.matrixWorld);let o=Q.update(I),p=I.material;if(Array.isArray(p)){let n=o.groups;for(let u=0,h=n.length;u<h;u++){let t=n[u],e=p[t.materialIndex];if(e&&e.visible){let H0=w(I,e,B,d);I.onBeforeShadow(J,I,P,R,o,H0,t),J.renderBufferDirect(R,null,o,H0,I,t),I.onAfterShadow(J,I,P,R,o,H0,t)}}}else if(p.visible){let n=w(I,p,B,d);I.onBeforeShadow(J,I,P,R,o,n,null),J.renderBufferDirect(R,null,o,n,I,null),I.onAfterShadow(J,I,P,R,o,n,null)}}}let m=I.children;for(let o=0,p=m.length;o<p;o++)V(m[o],P,R,B,d)}function _(I){I.target.removeEventListener("dispose",_);for(let R in U){let B=U[R],d=I.target.uuid;if(d in B)B[d].dispose(),delete B[d]}}}function F5(J,Q){function $(){let S=!1,$0=new K8,c=null,W0=new K8(0,0,0,0);return{setMask:function(q0){if(c!==q0&&!S)J.colorMask(q0,q0,q0,q0),c=q0},setLocked:function(q0){S=q0},setClear:function(q0,a,K0,T0,H8){if(H8===!0)q0*=T0,a*=T0,K0*=T0;if($0.set(q0,a,K0,T0),W0.equals($0)===!1)J.clearColor(q0,a,K0,T0),W0.copy($0)},reset:function(){S=!1,c=null,W0.set(-1,0,0,0)}}}function Z(){let S=!1,$0=!1,c=null,W0=null,q0=null;return{setReversed:function(a){if($0!==a){let K0=Q.get("EXT_clip_control");if(a)K0.clipControlEXT(K0.LOWER_LEFT_EXT,K0.ZERO_TO_ONE_EXT);else K0.clipControlEXT(K0.LOWER_LEFT_EXT,K0.NEGATIVE_ONE_TO_ONE_EXT);$0=a;let T0=q0;q0=null,this.setClear(T0)}},getReversed:function(){return $0},setTest:function(a){if(a)D0(J.DEPTH_TEST);else C0(J.DEPTH_TEST)},setMask:function(a){if(c!==a&&!S)J.depthMask(a),c=a},setFunc:function(a){if($0)a=aZ[a];if(W0!==a){switch(a){case BZ:J.depthFunc(J.NEVER);break;case zZ:J.depthFunc(J.ALWAYS);break;case IZ:J.depthFunc(J.LESS);break;case yJ:J.depthFunc(J.LEQUAL);break;case _Z:J.depthFunc(J.EQUAL);break;case AZ:J.depthFunc(J.GEQUAL);break;case CZ:J.depthFunc(J.GREATER);break;case wZ:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}W0=a}},setLocked:function(a){S=a},setClear:function(a){if(q0!==a){if(q0=a,$0)a=1-a;J.clearDepth(a)}},reset:function(){S=!1,c=null,W0=null,q0=null,$0=!1}}}function W(){let S=!1,$0=null,c=null,W0=null,q0=null,a=null,K0=null,T0=null,H8=null;return{setTest:function(e0){if(!S)if(e0)D0(J.STENCIL_TEST);else C0(J.STENCIL_TEST)},setMask:function(e0){if($0!==e0&&!S)J.stencilMask(e0),$0=e0},setFunc:function(e0,o8,W9){if(c!==e0||W0!==o8||q0!==W9)J.stencilFunc(e0,o8,W9),c=e0,W0=o8,q0=W9},setOp:function(e0,o8,W9){if(a!==e0||K0!==o8||T0!==W9)J.stencilOp(e0,o8,W9),a=e0,K0=o8,T0=W9},setLocked:function(e0){S=e0},setClear:function(e0){if(H8!==e0)J.clearStencil(e0),H8=e0},reset:function(){S=!1,$0=null,c=null,W0=null,q0=null,a=null,K0=null,T0=null,H8=null}}}let K=new $,H=new Z,Y=new W,X=new WeakMap,U=new WeakMap,N={},E={},G={},D=new WeakMap,M=[],z=null,F=!1,q=null,A=null,w=null,V=null,_=null,I=null,P=null,R=new x0(0,0,0),B=0,d=!1,C=null,m=null,o=null,p=null,n=null,u=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),h=!1,t=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)t=parseFloat(/^WebGL (\d)/.exec(e)[1]),h=t>=1;else if(e.indexOf("OpenGL ES")!==-1)t=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),h=t>=2;let H0=null,M0={},k0=J.getParameter(J.SCISSOR_BOX),W8=J.getParameter(J.VIEWPORT),i0=new K8().fromArray(k0),i=new K8().fromArray(W8);function Z0(S,$0,c,W0){let q0=new Uint8Array(4),a=J.createTexture();J.bindTexture(S,a),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let K0=0;K0<c;K0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D($0,0,J.RGBA,1,1,W0,0,J.RGBA,J.UNSIGNED_BYTE,q0);else J.texImage2D($0+K0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,q0);return a}let F0={};F0[J.TEXTURE_2D]=Z0(J.TEXTURE_2D,J.TEXTURE_2D,1),F0[J.TEXTURE_CUBE_MAP]=Z0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),F0[J.TEXTURE_2D_ARRAY]=Z0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),F0[J.TEXTURE_3D]=Z0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),D0(J.DEPTH_TEST),H.setFunc(yJ),x8(!1),Q8(TJ),D0(J.CULL_FACE),b0(e8);function D0(S){if(N[S]!==!0)J.enable(S),N[S]=!0}function C0(S){if(N[S]!==!1)J.disable(S),N[S]=!1}function p0(S,$0){if(G[S]!==$0){if(J.bindFramebuffer(S,$0),G[S]=$0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=$0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=$0;return!0}return!1}function y0(S,$0){let c=M,W0=!1;if(S){if(c=D.get($0),c===void 0)c=[],D.set($0,c);let q0=S.textures;if(c.length!==q0.length||c[0]!==J.COLOR_ATTACHMENT0){for(let a=0,K0=q0.length;a<K0;a++)c[a]=J.COLOR_ATTACHMENT0+a;c.length=q0.length,W0=!0}}else if(c[0]!==J.BACK)c[0]=J.BACK,W0=!0;if(W0)J.drawBuffers(c)}function f0(S){if(z!==S)return J.useProgram(S),z=S,!0;return!1}let t0={[O7]:J.FUNC_ADD,[ZZ]:J.FUNC_SUBTRACT,[WZ]:J.FUNC_REVERSE_SUBTRACT};t0[KZ]=J.MIN,t0[HZ]=J.MAX;let m0={[YZ]:J.ZERO,[XZ]:J.ONE,[UZ]:J.SRC_COLOR,[NZ]:J.SRC_ALPHA,[RZ]:J.SRC_ALPHA_SATURATE,[DZ]:J.DST_COLOR,[qZ]:J.DST_ALPHA,[GZ]:J.ONE_MINUS_SRC_COLOR,[EZ]:J.ONE_MINUS_SRC_ALPHA,[OZ]:J.ONE_MINUS_DST_COLOR,[FZ]:J.ONE_MINUS_DST_ALPHA,[kZ]:J.CONSTANT_COLOR,[MZ]:J.ONE_MINUS_CONSTANT_COLOR,[LZ]:J.CONSTANT_ALPHA,[VZ]:J.ONE_MINUS_CONSTANT_ALPHA};function b0(S,$0,c,W0,q0,a,K0,T0,H8,e0){if(S===e8){if(F===!0)C0(J.BLEND),F=!1;return}if(F===!1)D0(J.BLEND),F=!0;if(S!==$Z){if(S!==q||e0!==d){if(A!==O7||_!==O7)J.blendEquation(J.FUNC_ADD),A=O7,_=O7;if(e0)switch(S){case j7:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case SJ:J.blendFunc(J.ONE,J.ONE);break;case jJ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case vJ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:w0("WebGLState: Invalid blending: ",S);break}else switch(S){case j7:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case SJ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case jJ:w0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vJ:w0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:w0("WebGLState: Invalid blending: ",S);break}w=null,V=null,I=null,P=null,R.set(0,0,0),B=0,q=S,d=e0}return}if(q0=q0||$0,a=a||c,K0=K0||W0,$0!==A||q0!==_)J.blendEquationSeparate(t0[$0],t0[q0]),A=$0,_=q0;if(c!==w||W0!==V||a!==I||K0!==P)J.blendFuncSeparate(m0[c],m0[W0],m0[a],m0[K0]),w=c,V=W0,I=a,P=K0;if(T0.equals(R)===!1||H8!==B)J.blendColor(T0.r,T0.g,T0.b,H8),R.copy(T0),B=H8;q=S,d=!1}function D8(S,$0){S.side===t8?C0(J.CULL_FACE):D0(J.CULL_FACE);let c=S.side===P8;if($0)c=!c;x8(c),S.blending===j7&&S.transparent===!1?b0(e8):b0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),K.setMask(S.colorWrite);let W0=S.stencilWrite;if(Y.setTest(W0),W0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);O8(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?D0(J.SAMPLE_ALPHA_TO_COVERAGE):C0(J.SAMPLE_ALPHA_TO_COVERAGE)}function x8(S){if(C!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);C=S}}function Q8(S){if(S!==e$){if(D0(J.CULL_FACE),S!==m)if(S===TJ)J.cullFace(J.BACK);else if(S===JZ)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else C0(J.CULL_FACE);m=S}function k8(S){if(S!==o){if(h)J.lineWidth(S);o=S}}function O8(S,$0,c){if(S){if(D0(J.POLYGON_OFFSET_FILL),p!==$0||n!==c){if(p=$0,n=c,H.getReversed())$0=-$0;J.polygonOffset($0,c)}}else C0(J.POLYGON_OFFSET_FILL)}function E8(S){if(S)D0(J.SCISSOR_TEST);else C0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+u-1;if(H0!==S)J.activeTexture(S),H0=S}function g8(S,$0,c){if(c===void 0)if(H0===null)c=J.TEXTURE0+u-1;else c=H0;let W0=M0[c];if(W0===void 0)W0={type:void 0,texture:void 0},M0[c]=W0;if(W0.type!==S||W0.texture!==$0){if(H0!==c)J.activeTexture(c),H0=c;J.bindTexture(S,$0||F0[S]),W0.type=S,W0.texture=$0}}function c0(){let S=M0[H0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function $8(){try{J.compressedTexImage2D(...arguments)}catch(S){w0("WebGLState:",S)}}function L(){try{J.compressedTexImage3D(...arguments)}catch(S){w0("WebGLState:",S)}}function O(){try{J.texSubImage2D(...arguments)}catch(S){w0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){w0("WebGLState:",S)}}function g(){try{J.compressedTexSubImage2D(...arguments)}catch(S){w0("WebGLState:",S)}}function r(){try{J.compressedTexSubImage3D(...arguments)}catch(S){w0("WebGLState:",S)}}function J0(){try{J.texStorage2D(...arguments)}catch(S){w0("WebGLState:",S)}}function Y0(){try{J.texStorage3D(...arguments)}catch(S){w0("WebGLState:",S)}}function l(){try{J.texImage2D(...arguments)}catch(S){w0("WebGLState:",S)}}function s(){try{J.texImage3D(...arguments)}catch(S){w0("WebGLState:",S)}}function E0(S){if(E[S]!==void 0)return E[S];else return J.getParameter(S)}function V0(S,$0){if(E[S]!==$0)J.pixelStorei(S,$0),E[S]=$0}function X0(S){if(i0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),i0.copy(S)}function Q0(S){if(i.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),i.copy(S)}function I0(S,$0){let c=U.get($0);if(c===void 0)c=new WeakMap,U.set($0,c);let W0=c.get(S);if(W0===void 0)W0=J.getUniformBlockIndex($0,S.name),c.set(S,W0)}function A0(S,$0){let W0=U.get($0).get(S);if(X.get($0)!==W0)J.uniformBlockBinding($0,W0,S.__bindingPointIndex),X.set($0,W0)}function d0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),N={},E={},H0=null,M0={},G={},D=new WeakMap,M=[],z=null,F=!1,q=null,A=null,w=null,V=null,_=null,I=null,P=null,R=new x0(0,0,0),B=0,d=!1,C=null,m=null,o=null,p=null,n=null,i0.set(0,0,J.canvas.width,J.canvas.height),i.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:D0,disable:C0,bindFramebuffer:p0,drawBuffers:y0,useProgram:f0,setBlending:b0,setMaterial:D8,setFlipSided:x8,setCullFace:Q8,setLineWidth:k8,setPolygonOffset:O8,setScissorTest:E8,activeTexture:j,bindTexture:g8,unbindTexture:c0,compressedTexImage2D:$8,compressedTexImage3D:L,texImage2D:l,texImage3D:s,pixelStorei:V0,getParameter:E0,updateUBOMapping:I0,uniformBlockBinding:A0,texStorage2D:J0,texStorage3D:Y0,texSubImage2D:O,texSubImage3D:T,compressedTexSubImage2D:g,compressedTexSubImage3D:r,scissor:X0,viewport:Q0,reset:d0}}function D5(J,Q,$,Z,W,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new u0,N=new WeakMap,E=new Set,G,D=new WeakMap,M=!1;try{M=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(L){}function z(L,O){return M?new OffscreenCanvas(L,O):T7("canvas")}function F(L,O,T){let g=1,r=$8(L);if(r.width>T||r.height>T)g=T/Math.max(r.width,r.height);if(g<1)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap||typeof VideoFrame<"u"&&L instanceof VideoFrame){let J0=Math.floor(g*r.width),Y0=Math.floor(g*r.height);if(G===void 0)G=z(J0,Y0);let l=O?z(J0,Y0):G;return l.width=J0,l.height=Y0,l.getContext("2d").drawImage(L,0,0,J0,Y0),_0("WebGLRenderer: Texture has been resized from ("+r.width+"x"+r.height+") to ("+J0+"x"+Y0+")."),l}else{if("data"in L)_0("WebGLRenderer: Image in DataTexture is too big ("+r.width+"x"+r.height+").");return L}return L}function q(L){return L.generateMipmaps}function A(L){J.generateMipmap(L)}function w(L){if(L.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(L.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(L.isWebGLArrayRenderTarget||L.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function V(L,O,T,g,r,J0=!1){if(L!==null){if(J[L]!==void 0)return J[L];_0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let Y0;if(g){if(Y0=Q.get("EXT_texture_norm16"),!Y0)_0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let l=O;if(O===J.RED){if(T===J.FLOAT)l=J.R32F;if(T===J.HALF_FLOAT)l=J.R16F;if(T===J.UNSIGNED_BYTE)l=J.R8;if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.R16_EXT;if(T===J.SHORT&&Y0)l=Y0.R16_SNORM_EXT}if(O===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.R8UI;if(T===J.UNSIGNED_SHORT)l=J.R16UI;if(T===J.UNSIGNED_INT)l=J.R32UI;if(T===J.BYTE)l=J.R8I;if(T===J.SHORT)l=J.R16I;if(T===J.INT)l=J.R32I}if(O===J.RG){if(T===J.FLOAT)l=J.RG32F;if(T===J.HALF_FLOAT)l=J.RG16F;if(T===J.UNSIGNED_BYTE)l=J.RG8;if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.RG16_EXT;if(T===J.SHORT&&Y0)l=Y0.RG16_SNORM_EXT}if(O===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.RG8UI;if(T===J.UNSIGNED_SHORT)l=J.RG16UI;if(T===J.UNSIGNED_INT)l=J.RG32UI;if(T===J.BYTE)l=J.RG8I;if(T===J.SHORT)l=J.RG16I;if(T===J.INT)l=J.RG32I}if(O===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.RGB8UI;if(T===J.UNSIGNED_SHORT)l=J.RGB16UI;if(T===J.UNSIGNED_INT)l=J.RGB32UI;if(T===J.BYTE)l=J.RGB8I;if(T===J.SHORT)l=J.RGB16I;if(T===J.INT)l=J.RGB32I}if(O===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)l=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)l=J.RGBA16UI;if(T===J.UNSIGNED_INT)l=J.RGBA32UI;if(T===J.BYTE)l=J.RGBA8I;if(T===J.SHORT)l=J.RGBA16I;if(T===J.INT)l=J.RGBA32I}if(O===J.RGB){if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.RGB16_EXT;if(T===J.SHORT&&Y0)l=Y0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)l=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)l=J.R11F_G11F_B10F}if(O===J.RGBA){let s=J0?AQ:h0.getTransfer(r);if(T===J.FLOAT)l=J.RGBA32F;if(T===J.HALF_FLOAT)l=J.RGBA16F;if(T===J.UNSIGNED_BYTE)l=s===r0?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&Y0)l=Y0.RGBA16_EXT;if(T===J.SHORT&&Y0)l=Y0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)l=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)l=J.RGB5_A1}if(l===J.R16F||l===J.R32F||l===J.RG16F||l===J.RG32F||l===J.RGBA16F||l===J.RGBA32F)Q.get("EXT_color_buffer_float");return l}function _(L,O){let T;if(L){if(O===null||O===C9||O===k7)T=J.DEPTH24_STENCIL8;else if(O===E9)T=J.DEPTH32F_STENCIL8;else if(O===f7)T=J.DEPTH24_STENCIL8,_0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(O===null||O===C9||O===k7)T=J.DEPTH_COMPONENT24;else if(O===E9)T=J.DEPTH_COMPONENT32F;else if(O===f7)T=J.DEPTH_COMPONENT16;return T}function I(L,O){if(q(L)===!0||L.isFramebufferTexture&&L.minFilter!==A9&&L.minFilter!==_8)return Math.log2(Math.max(O.width,O.height))+1;else if(L.mipmaps!==void 0&&L.mipmaps.length>0)return L.mipmaps.length;else if(L.isCompressedTexture&&Array.isArray(L.image))return O.mipmaps.length;else return 1}function P(L){let O=L.target;if(O.removeEventListener("dispose",P),B(O),O.isVideoTexture)N.delete(O);if(O.isHTMLTexture)E.delete(O)}function R(L){let O=L.target;O.removeEventListener("dispose",R),C(O)}function B(L){let O=Z.get(L);if(O.__webglInit===void 0)return;let T=L.source,g=D.get(T);if(g){let r=g[O.__cacheKey];if(r.usedTimes--,r.usedTimes===0)d(L);if(Object.keys(g).length===0)D.delete(T)}Z.remove(L)}function d(L){let O=Z.get(L);J.deleteTexture(O.__webglTexture);let T=L.source,g=D.get(T);delete g[O.__cacheKey],H.memory.textures--}function C(L){let O=Z.get(L);if(L.depthTexture)L.depthTexture.dispose(),Z.remove(L.depthTexture);if(L.isWebGLCubeRenderTarget)for(let g=0;g<6;g++){if(Array.isArray(O.__webglFramebuffer[g]))for(let r=0;r<O.__webglFramebuffer[g].length;r++)J.deleteFramebuffer(O.__webglFramebuffer[g][r]);else J.deleteFramebuffer(O.__webglFramebuffer[g]);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer[g])}else{if(Array.isArray(O.__webglFramebuffer))for(let g=0;g<O.__webglFramebuffer.length;g++)J.deleteFramebuffer(O.__webglFramebuffer[g]);else J.deleteFramebuffer(O.__webglFramebuffer);if(O.__webglDepthbuffer)J.deleteRenderbuffer(O.__webglDepthbuffer);if(O.__webglMultisampledFramebuffer)J.deleteFramebuffer(O.__webglMultisampledFramebuffer);if(O.__webglColorRenderbuffer){for(let g=0;g<O.__webglColorRenderbuffer.length;g++)if(O.__webglColorRenderbuffer[g])J.deleteRenderbuffer(O.__webglColorRenderbuffer[g])}if(O.__webglDepthRenderbuffer)J.deleteRenderbuffer(O.__webglDepthRenderbuffer)}let T=L.textures;for(let g=0,r=T.length;g<r;g++){let J0=Z.get(T[g]);if(J0.__webglTexture)J.deleteTexture(J0.__webglTexture),H.memory.textures--;Z.remove(T[g])}Z.remove(L)}let m=0;function o(){m=0}function p(){return m}function n(L){m=L}function u(){let L=m;if(L>=W.maxTextures)_0("WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+W.maxTextures);return m+=1,L}function h(L){let O=[];return O.push(L.wrapS),O.push(L.wrapT),O.push(L.wrapR||0),O.push(L.magFilter),O.push(L.minFilter),O.push(L.anisotropy),O.push(L.internalFormat),O.push(L.format),O.push(L.type),O.push(L.generateMipmaps),O.push(L.premultiplyAlpha),O.push(L.flipY),O.push(L.unpackAlignment),O.push(L.colorSpace),O.join()}function t(L,O){let T=Z.get(L);if(L.isVideoTexture)g8(L);if(L.isRenderTargetTexture===!1&&L.isExternalTexture!==!0&&L.version>0&&T.__version!==L.version){let g=L.image;if(g===null)_0("WebGLRenderer: Texture marked for update but no image data found.");else if(g.complete===!1)_0("WebGLRenderer: Texture marked for update but image is incomplete");else{C0(T,L,O);return}}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+O)}function e(L,O){let T=Z.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){C0(T,L,O);return}else if(L.isExternalTexture)T.__webglTexture=L.sourceTexture?L.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+O)}function H0(L,O){let T=Z.get(L);if(L.isRenderTargetTexture===!1&&L.version>0&&T.__version!==L.version){C0(T,L,O);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+O)}function M0(L,O){let T=Z.get(L);if(L.isCubeDepthTexture!==!0&&L.version>0&&T.__version!==L.version){p0(T,L,O);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+O)}let k0={[z6]:J.REPEAT,[I6]:J.CLAMP_TO_EDGE,[jZ]:J.MIRRORED_REPEAT},W8={[A9]:J.NEAREST,[vZ]:J.NEAREST_MIPMAP_NEAREST,[y7]:J.NEAREST_MIPMAP_LINEAR,[_8]:J.LINEAR,[_6]:J.LINEAR_MIPMAP_NEAREST,[g9]:J.LINEAR_MIPMAP_LINEAR},i0={[mZ]:J.NEVER,[nZ]:J.ALWAYS,[lZ]:J.LESS,[y6]:J.LEQUAL,[dZ]:J.EQUAL,[f6]:J.GEQUAL,[uZ]:J.GREATER,[cZ]:J.NOTEQUAL};function i(L,O){if(O.type===E9&&Q.has("OES_texture_float_linear")===!1&&(O.magFilter===_8||O.magFilter===_6||O.magFilter===y7||O.magFilter===g9||O.minFilter===_8||O.minFilter===_6||O.minFilter===y7||O.minFilter===g9))_0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(L,J.TEXTURE_WRAP_S,k0[O.wrapS]),J.texParameteri(L,J.TEXTURE_WRAP_T,k0[O.wrapT]),L===J.TEXTURE_3D||L===J.TEXTURE_2D_ARRAY)J.texParameteri(L,J.TEXTURE_WRAP_R,k0[O.wrapR]);if(J.texParameteri(L,J.TEXTURE_MAG_FILTER,W8[O.magFilter]),J.texParameteri(L,J.TEXTURE_MIN_FILTER,W8[O.minFilter]),O.compareFunction)J.texParameteri(L,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(L,J.TEXTURE_COMPARE_FUNC,i0[O.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(O.magFilter===A9)return;if(O.minFilter!==y7&&O.minFilter!==g9)return;if(O.type===E9&&Q.has("OES_texture_float_linear")===!1)return;if(O.anisotropy>1||Z.get(O).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(L,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(O.anisotropy,W.getMaxAnisotropy())),Z.get(O).__currentAnisotropy=O.anisotropy}}}function Z0(L,O){let T=!1;if(L.__webglInit===void 0)L.__webglInit=!0,O.addEventListener("dispose",P);let g=O.source,r=D.get(g);if(r===void 0)r={},D.set(g,r);let J0=h(O);if(J0!==L.__cacheKey){if(r[J0]===void 0)r[J0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;r[J0].usedTimes++;let Y0=r[L.__cacheKey];if(Y0!==void 0){if(r[L.__cacheKey].usedTimes--,Y0.usedTimes===0)d(O)}L.__cacheKey=J0,L.__webglTexture=r[J0].texture}return T}function F0(L,O,T){return Math.floor(Math.floor(L/T)/O)}function D0(L,O,T,g){let J0=L.updateRanges;if(J0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,O.width,O.height,T,g,O.data);else{J0.sort((V0,X0)=>V0.start-X0.start);let Y0=0;for(let V0=1;V0<J0.length;V0++){let X0=J0[Y0],Q0=J0[V0],I0=X0.start+X0.count,A0=F0(Q0.start,O.width,4),d0=F0(X0.start,O.width,4);if(Q0.start<=I0+1&&A0===d0&&F0(Q0.start+Q0.count-1,O.width,4)===A0)X0.count=Math.max(X0.count,Q0.start+Q0.count-X0.start);else++Y0,J0[Y0]=Q0}J0.length=Y0+1;let l=$.getParameter(J.UNPACK_ROW_LENGTH),s=$.getParameter(J.UNPACK_SKIP_PIXELS),E0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,O.width);for(let V0=0,X0=J0.length;V0<X0;V0++){let Q0=J0[V0],I0=Math.floor(Q0.start/4),A0=Math.ceil(Q0.count/4),d0=I0%O.width,S=Math.floor(I0/O.width),$0=A0,c=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,d0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,d0,S,$0,1,T,g,O.data)}L.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,l),$.pixelStorei(J.UNPACK_SKIP_PIXELS,s),$.pixelStorei(J.UNPACK_SKIP_ROWS,E0)}}function C0(L,O,T){let g=J.TEXTURE_2D;if(O.isDataArrayTexture||O.isCompressedArrayTexture)g=J.TEXTURE_2D_ARRAY;if(O.isData3DTexture)g=J.TEXTURE_3D;let r=Z0(L,O),J0=O.source;$.bindTexture(g,L.__webglTexture,J.TEXTURE0+T);let Y0=Z.get(J0);if(J0.version!==Y0.__version||r===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&O.image instanceof ImageBitmap)===!1){let c=h0.getPrimaries(h0.workingColorSpace),W0=O.colorSpace===d9?null:h0.getPrimaries(O.colorSpace),q0=O.colorSpace===d9||c===W0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,q0)}$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment);let s=F(O.image,!1,W.maxTextureSize);s=c0(O,s);let E0=K.convert(O.format,O.colorSpace),V0=K.convert(O.type),X0=V(O.internalFormat,E0,V0,O.normalized,O.colorSpace,O.isVideoTexture);i(g,O);let Q0,I0=O.mipmaps,A0=O.isVideoTexture!==!0,d0=Y0.__version===void 0||r===!0,S=J0.dataReady,$0=I(O,s);if(O.isDepthTexture){if(X0=_(O.format===m9,O.type),d0)if(A0)$.texStorage2D(J.TEXTURE_2D,1,X0,s.width,s.height);else $.texImage2D(J.TEXTURE_2D,0,X0,s.width,s.height,0,E0,V0,null)}else if(O.isDataTexture)if(I0.length>0){if(A0&&d0)$.texStorage2D(J.TEXTURE_2D,$0,X0,I0[0].width,I0[0].height);for(let c=0,W0=I0.length;c<W0;c++)if(Q0=I0[c],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,E0,V0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,E0,V0,Q0.data);O.generateMipmaps=!1}else if(A0){if(d0)$.texStorage2D(J.TEXTURE_2D,$0,X0,s.width,s.height);if(S)D0(O,s,E0,V0)}else $.texImage2D(J.TEXTURE_2D,0,X0,s.width,s.height,0,E0,V0,s.data);else if(O.isCompressedTexture)if(O.isCompressedArrayTexture){if(A0&&d0)$.texStorage3D(J.TEXTURE_2D_ARRAY,$0,X0,I0[0].width,I0[0].height,s.depth);for(let c=0,W0=I0.length;c<W0;c++)if(Q0=I0[c],O.format!==J9)if(E0!==null)if(A0){if(S)if(O.layerUpdates.size>0){let q0=Z$(Q0.width,Q0.height,O.format,O.type);for(let a of O.layerUpdates){let K0=Q0.data.subarray(a*q0/Q0.data.BYTES_PER_ELEMENT,(a+1)*q0/Q0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,a,Q0.width,Q0.height,1,E0,K0)}O.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,0,Q0.width,Q0.height,s.depth,E0,Q0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,c,X0,Q0.width,Q0.height,s.depth,0,Q0.data,0,0);else _0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,c,0,0,0,Q0.width,Q0.height,s.depth,E0,V0,Q0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,c,X0,Q0.width,Q0.height,s.depth,0,E0,V0,Q0.data)}else{if(A0&&d0)$.texStorage2D(J.TEXTURE_2D,$0,X0,I0[0].width,I0[0].height);for(let c=0,W0=I0.length;c<W0;c++)if(Q0=I0[c],O.format!==J9)if(E0!==null)if(A0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,E0,Q0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,Q0.data);else _0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,Q0.width,Q0.height,E0,V0,Q0.data)}else $.texImage2D(J.TEXTURE_2D,c,X0,Q0.width,Q0.height,0,E0,V0,Q0.data)}else if(O.isDataArrayTexture)if(A0){if(d0)$.texStorage3D(J.TEXTURE_2D_ARRAY,$0,X0,s.width,s.height,s.depth);if(S)if(O.layerUpdates.size>0){let c=Z$(s.width,s.height,O.format,O.type);for(let W0 of O.layerUpdates){let q0=s.data.subarray(W0*c/s.data.BYTES_PER_ELEMENT,(W0+1)*c/s.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,W0,s.width,s.height,1,E0,V0,q0)}O.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,s.width,s.height,s.depth,E0,V0,s.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,X0,s.width,s.height,s.depth,0,E0,V0,s.data);else if(O.isData3DTexture)if(A0){if(d0)$.texStorage3D(J.TEXTURE_3D,$0,X0,s.width,s.height,s.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,s.width,s.height,s.depth,E0,V0,s.data)}else $.texImage3D(J.TEXTURE_3D,0,X0,s.width,s.height,s.depth,0,E0,V0,s.data);else if(O.isFramebufferTexture){if(d0)if(A0)$.texStorage2D(J.TEXTURE_2D,$0,X0,s.width,s.height);else{let{width:c,height:W0}=s;for(let q0=0;q0<$0;q0++)$.texImage2D(J.TEXTURE_2D,q0,X0,c,W0,0,E0,V0,null),c>>=1,W0>>=1}}else if(O.isHTMLTexture){if("texElementImage2D"in J){let c=J.canvas;if(!c.hasAttribute("layoutsubtree"))c.setAttribute("layoutsubtree","true");if(s.parentNode!==c){c.appendChild(s),E.add(O),c.onpaint=(W0)=>{let q0=W0.changedElements;for(let a of E)if(q0.includes(a.image))a.needsUpdate=!0},c.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,s);else{let{RGBA:q0,RGBA:a,UNSIGNED_BYTE:K0}=J;J.texElementImage2D(J.TEXTURE_2D,0,q0,a,K0,s)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(I0.length>0){if(A0&&d0){let c=$8(I0[0]);$.texStorage2D(J.TEXTURE_2D,$0,X0,c.width,c.height)}for(let c=0,W0=I0.length;c<W0;c++)if(Q0=I0[c],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,c,0,0,E0,V0,Q0)}else $.texImage2D(J.TEXTURE_2D,c,X0,E0,V0,Q0);O.generateMipmaps=!1}else if(A0){if(d0){let c=$8(s);$.texStorage2D(J.TEXTURE_2D,$0,X0,c.width,c.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,E0,V0,s)}else $.texImage2D(J.TEXTURE_2D,0,X0,E0,V0,s);if(q(O))A(g);if(Y0.__version=J0.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function p0(L,O,T){if(O.image.length!==6)return;let g=Z0(L,O),r=O.source;$.bindTexture(J.TEXTURE_CUBE_MAP,L.__webglTexture,J.TEXTURE0+T);let J0=Z.get(r);if(r.version!==J0.__version||g===!0){$.activeTexture(J.TEXTURE0+T);let Y0=h0.getPrimaries(h0.workingColorSpace),l=O.colorSpace===d9?null:h0.getPrimaries(O.colorSpace),s=O.colorSpace===d9||Y0===l?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,O.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,O.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,s);let E0=O.isCompressedTexture||O.image[0].isCompressedTexture,V0=O.image[0]&&O.image[0].isDataTexture,X0=[];for(let a=0;a<6;a++){if(!E0&&!V0)X0[a]=F(O.image[a],!0,W.maxCubemapSize);else X0[a]=V0?O.image[a].image:O.image[a];X0[a]=c0(O,X0[a])}let Q0=X0[0],I0=K.convert(O.format,O.colorSpace),A0=K.convert(O.type),d0=V(O.internalFormat,I0,A0,O.normalized,O.colorSpace),S=O.isVideoTexture!==!0,$0=J0.__version===void 0||g===!0,c=r.dataReady,W0=I(O,Q0);i(J.TEXTURE_CUBE_MAP,O);let q0;if(E0){if(S&&$0)$.texStorage2D(J.TEXTURE_CUBE_MAP,W0,d0,Q0.width,Q0.height);for(let a=0;a<6;a++){q0=X0[a].mipmaps;for(let K0=0;K0<q0.length;K0++){let T0=q0[K0];if(O.format!==J9)if(I0!==null)if(S){if(c)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,0,0,T0.width,T0.height,I0,T0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,d0,T0.width,T0.height,0,T0.data);else _0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,0,0,T0.width,T0.height,I0,A0,T0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0,d0,T0.width,T0.height,0,I0,A0,T0.data)}}}else{if(q0=O.mipmaps,S&&$0){if(q0.length>0)W0++;let a=$8(X0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,W0,d0,a.width,a.height)}for(let a=0;a<6;a++)if(V0){if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,0,0,X0[a].width,X0[a].height,I0,A0,X0[a].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,d0,X0[a].width,X0[a].height,0,I0,A0,X0[a].data);for(let K0=0;K0<q0.length;K0++){let H8=q0[K0].image[a].image;if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,0,0,H8.width,H8.height,I0,A0,H8.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,d0,H8.width,H8.height,0,I0,A0,H8.data)}}else{if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,0,0,I0,A0,X0[a])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,d0,I0,A0,X0[a]);for(let K0=0;K0<q0.length;K0++){let T0=q0[K0];if(S){if(c)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,0,0,I0,A0,T0.image[a])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+a,K0+1,d0,I0,A0,T0.image[a])}}}if(q(O))A(J.TEXTURE_CUBE_MAP);if(J0.__version=r.version,O.onUpdate)O.onUpdate(O)}L.__version=O.version}function y0(L,O,T,g,r,J0){let Y0=K.convert(T.format,T.colorSpace),l=K.convert(T.type),s=V(T.internalFormat,Y0,l,T.normalized,T.colorSpace),E0=Z.get(O),V0=Z.get(T);if(V0.__renderTarget=O,!E0.__hasExternalTextures){let X0=Math.max(1,O.width>>J0),Q0=Math.max(1,O.height>>J0);if(r===J.TEXTURE_3D||r===J.TEXTURE_2D_ARRAY)$.texImage3D(r,J0,s,X0,Q0,O.depth,0,Y0,l,null);else $.texImage2D(r,J0,s,X0,Q0,0,Y0,l,null)}if($.bindFramebuffer(J.FRAMEBUFFER,L),j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,g,r,V0.__webglTexture,0,E8(O));else if(r===J.TEXTURE_2D||r>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&r<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,g,r,V0.__webglTexture,J0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function f0(L,O,T){if(J.bindRenderbuffer(J.RENDERBUFFER,L),O.depthBuffer){let g=O.depthTexture,r=g&&g.isDepthTexture?g.type:null,J0=_(O.stencilBuffer,r),Y0=O.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(O),J0,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(O),J0,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,J0,O.width,O.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,Y0,J.RENDERBUFFER,L)}else{let g=O.textures;for(let r=0;r<g.length;r++){let J0=g[r],Y0=K.convert(J0.format,J0.colorSpace),l=K.convert(J0.type),s=V(J0.internalFormat,Y0,l,J0.normalized,J0.colorSpace);if(j(O))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(O),s,O.width,O.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(O),s,O.width,O.height);else J.renderbufferStorage(J.RENDERBUFFER,s,O.width,O.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function t0(L,O,T){let g=O.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,L),!(O.depthTexture&&O.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let r=Z.get(O.depthTexture);if(r.__renderTarget=O,!r.__webglTexture||O.depthTexture.image.width!==O.width||O.depthTexture.image.height!==O.height)O.depthTexture.image.width=O.width,O.depthTexture.image.height=O.height,O.depthTexture.needsUpdate=!0;if(g){if(r.__webglInit===void 0)r.__webglInit=!0,O.depthTexture.addEventListener("dispose",P);if(r.__webglTexture===void 0){r.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,r.__webglTexture),i(J.TEXTURE_CUBE_MAP,O.depthTexture);let E0=K.convert(O.depthTexture.format),V0=K.convert(O.depthTexture.type),X0;if(O.depthTexture.format===p9)X0=J.DEPTH_COMPONENT24;else if(O.depthTexture.format===m9)X0=J.DEPTH24_STENCIL8;for(let Q0=0;Q0<6;Q0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+Q0,0,X0,O.width,O.height,0,E0,V0,null)}}else t(O.depthTexture,0);let J0=r.__webglTexture,Y0=E8(O),l=g?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,s=O.depthTexture.format===m9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(O.depthTexture.format===p9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,s,l,J0,0,Y0);else J.framebufferTexture2D(J.FRAMEBUFFER,s,l,J0,0);else if(O.depthTexture.format===m9)if(j(O))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,s,l,J0,0,Y0);else J.framebufferTexture2D(J.FRAMEBUFFER,s,l,J0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function m0(L){let O=Z.get(L),T=L.isWebGLCubeRenderTarget===!0;if(O.__boundDepthTexture!==L.depthTexture){let g=L.depthTexture;if(O.__depthDisposeCallback)O.__depthDisposeCallback();if(g){let r=()=>{delete O.__boundDepthTexture,delete O.__depthDisposeCallback,g.removeEventListener("dispose",r)};g.addEventListener("dispose",r),O.__depthDisposeCallback=r}O.__boundDepthTexture=g}if(L.depthTexture&&!O.__autoAllocateDepthBuffer)if(T)for(let g=0;g<6;g++)t0(O.__webglFramebuffer[g],L,g);else{let g=L.texture.mipmaps;if(g&&g.length>0)t0(O.__webglFramebuffer[0],L,0);else t0(O.__webglFramebuffer,L,0)}else if(T){O.__webglDepthbuffer=[];for(let g=0;g<6;g++)if($.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[g]),O.__webglDepthbuffer[g]===void 0)O.__webglDepthbuffer[g]=J.createRenderbuffer(),f0(O.__webglDepthbuffer[g],L,!1);else{let r=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=O.__webglDepthbuffer[g];J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,J0)}}else{let g=L.texture.mipmaps;if(g&&g.length>0)$.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,O.__webglFramebuffer);if(O.__webglDepthbuffer===void 0)O.__webglDepthbuffer=J.createRenderbuffer(),f0(O.__webglDepthbuffer,L,!1);else{let r=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,J0=O.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,J0),J.framebufferRenderbuffer(J.FRAMEBUFFER,r,J.RENDERBUFFER,J0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function b0(L,O,T){let g=Z.get(L);if(O!==void 0)y0(g.__webglFramebuffer,L,L.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)m0(L)}function D8(L){let O=L.texture,T=Z.get(L),g=Z.get(O);L.addEventListener("dispose",R);let r=L.textures,J0=L.isWebGLCubeRenderTarget===!0,Y0=r.length>1;if(!Y0){if(g.__webglTexture===void 0)g.__webglTexture=J.createTexture();g.__version=O.version,H.memory.textures++}if(J0){T.__webglFramebuffer=[];for(let l=0;l<6;l++)if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer[l]=[];for(let s=0;s<O.mipmaps.length;s++)T.__webglFramebuffer[l][s]=J.createFramebuffer()}else T.__webglFramebuffer[l]=J.createFramebuffer()}else{if(O.mipmaps&&O.mipmaps.length>0){T.__webglFramebuffer=[];for(let l=0;l<O.mipmaps.length;l++)T.__webglFramebuffer[l]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(Y0)for(let l=0,s=r.length;l<s;l++){let E0=Z.get(r[l]);if(E0.__webglTexture===void 0)E0.__webglTexture=J.createTexture(),H.memory.textures++}if(L.samples>0&&j(L)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let l=0;l<r.length;l++){let s=r[l];T.__webglColorRenderbuffer[l]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[l]);let E0=K.convert(s.format,s.colorSpace),V0=K.convert(s.type),X0=V(s.internalFormat,E0,V0,s.normalized,s.colorSpace,L.isXRRenderTarget===!0),Q0=E8(L);J.renderbufferStorageMultisample(J.RENDERBUFFER,Q0,X0,L.width,L.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+l,J.RENDERBUFFER,T.__webglColorRenderbuffer[l])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),L.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),f0(T.__webglDepthRenderbuffer,L,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(J0){$.bindTexture(J.TEXTURE_CUBE_MAP,g.__webglTexture),i(J.TEXTURE_CUBE_MAP,O);for(let l=0;l<6;l++)if(O.mipmaps&&O.mipmaps.length>0)for(let s=0;s<O.mipmaps.length;s++)y0(T.__webglFramebuffer[l][s],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+l,s);else y0(T.__webglFramebuffer[l],L,O,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+l,0);if(q(O))A(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(Y0){for(let l=0,s=r.length;l<s;l++){let E0=r[l],V0=Z.get(E0),X0=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)X0=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(X0,V0.__webglTexture),i(X0,E0),y0(T.__webglFramebuffer,L,E0,J.COLOR_ATTACHMENT0+l,X0,0),q(E0))A(X0)}$.unbindTexture()}else{let l=J.TEXTURE_2D;if(L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)l=L.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(l,g.__webglTexture),i(l,O),O.mipmaps&&O.mipmaps.length>0)for(let s=0;s<O.mipmaps.length;s++)y0(T.__webglFramebuffer[s],L,O,J.COLOR_ATTACHMENT0,l,s);else y0(T.__webglFramebuffer,L,O,J.COLOR_ATTACHMENT0,l,0);if(q(O))A(l);$.unbindTexture()}if(L.depthBuffer)m0(L)}function x8(L){let O=L.textures;for(let T=0,g=O.length;T<g;T++){let r=O[T];if(q(r)){let J0=w(L),Y0=Z.get(r).__webglTexture;$.bindTexture(J0,Y0),A(J0),$.unbindTexture()}}}let Q8=[],k8=[];function O8(L){if(L.samples>0){if(j(L)===!1){let{textures:O,width:T,height:g}=L,r=J.COLOR_BUFFER_BIT,J0=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,Y0=Z.get(L),l=O.length>1;if(l)for(let E0=0;E0<O.length;E0++)$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,Y0.__webglMultisampledFramebuffer);let s=L.texture.mipmaps;if(s&&s.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglFramebuffer);for(let E0=0;E0<O.length;E0++){if(L.resolveDepthBuffer){if(L.depthBuffer)r|=J.DEPTH_BUFFER_BIT;if(L.stencilBuffer&&L.resolveStencilBuffer)r|=J.STENCIL_BUFFER_BIT}if(l){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,Y0.__webglColorRenderbuffer[E0]);let V0=Z.get(O[E0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,V0,0)}if(J.blitFramebuffer(0,0,T,g,0,0,T,g,r,J.NEAREST),X===!0){if(Q8.length=0,k8.length=0,Q8.push(J.COLOR_ATTACHMENT0+E0),L.depthBuffer&&L.resolveDepthBuffer===!1)Q8.push(J0),k8.push(J0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,k8);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,Q8)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),l)for(let E0=0;E0<O.length;E0++){$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.RENDERBUFFER,Y0.__webglColorRenderbuffer[E0]);let V0=Z.get(O[E0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,Y0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+E0,J.TEXTURE_2D,V0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,Y0.__webglMultisampledFramebuffer)}else if(L.depthBuffer&&L.resolveDepthBuffer===!1&&X){let O=L.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[O])}}}function E8(L){return Math.min(W.maxSamples,L.samples)}function j(L){let O=Z.get(L);return L.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&O.__useRenderToTexture!==!1}function g8(L){let O=H.render.frame;if(N.get(L)!==O)N.set(L,O),L.update()}function c0(L,O){let{colorSpace:T,format:g,type:r}=L;if(L.isCompressedTexture===!0||L.isVideoTexture===!0)return O;if(T!==_Q&&T!==d9)if(h0.getTransfer(T)===r0){if(g!==J9||r!==b8)_0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else w0("WebGLTextures: Unsupported texture color space:",T);return O}function $8(L){if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement)U.width=L.naturalWidth||L.width,U.height=L.naturalHeight||L.height;else if(typeof VideoFrame<"u"&&L instanceof VideoFrame)U.width=L.displayWidth,U.height=L.displayHeight;else U.width=L.width,U.height=L.height;return U}this.allocateTextureUnit=u,this.resetTextureUnits=o,this.getTextureUnits=p,this.setTextureUnits=n,this.setTexture2D=t,this.setTexture2DArray=e,this.setTexture3D=H0,this.setTextureCube=M0,this.rebindTextures=b0,this.setupRenderTarget=D8,this.updateRenderTargetMipmap=x8,this.updateMultisampleRenderTarget=O8,this.setupDepthRenderbuffer=m0,this.setupFrameBufferTexture=y0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function O5(J,Q){function $(Z,W=d9){let K,H=h0.getTransfer(W);if(Z===b8)return J.UNSIGNED_BYTE;if(Z===dJ)return J.UNSIGNED_SHORT_4_4_4_4;if(Z===uJ)return J.UNSIGNED_SHORT_5_5_5_1;if(Z===bZ)return J.UNSIGNED_INT_5_9_9_9_REV;if(Z===hZ)return J.UNSIGNED_INT_10F_11F_11F_REV;if(Z===yZ)return J.BYTE;if(Z===fZ)return J.SHORT;if(Z===f7)return J.UNSIGNED_SHORT;if(Z===lJ)return J.INT;if(Z===C9)return J.UNSIGNED_INT;if(Z===E9)return J.FLOAT;if(Z===q9)return J.HALF_FLOAT;if(Z===xZ)return J.ALPHA;if(Z===gZ)return J.RGB;if(Z===J9)return J.RGBA;if(Z===p9)return J.DEPTH_COMPONENT;if(Z===m9)return J.DEPTH_STENCIL;if(Z===A6)return J.RED;if(Z===cJ)return J.RED_INTEGER;if(Z===l9)return J.RG;if(Z===nJ)return J.RG_INTEGER;if(Z===sJ)return J.RGBA_INTEGER;if(Z===C6||Z===w6||Z===P6||Z===T6)if(H===r0)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(Z===C6)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(Z===w6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(Z===P6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(Z===T6)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(Z===C6)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(Z===w6)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(Z===P6)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(Z===T6)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(Z===iJ||Z===oJ||Z===aJ||Z===rJ)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(Z===iJ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(Z===oJ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(Z===aJ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(Z===rJ)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(Z===tJ||Z===eJ||Z===JQ||Z===QQ||Z===$Q||Z===S6||Z===ZQ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(Z===tJ||Z===eJ)return H===r0?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(Z===JQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(Z===QQ)return K.COMPRESSED_R11_EAC;if(Z===$Q)return K.COMPRESSED_SIGNED_R11_EAC;if(Z===S6)return K.COMPRESSED_RG11_EAC;if(Z===ZQ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(Z===WQ||Z===KQ||Z===HQ||Z===YQ||Z===XQ||Z===UQ||Z===GQ||Z===NQ||Z===EQ||Z===qQ||Z===FQ||Z===DQ||Z===OQ||Z===RQ)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(Z===WQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(Z===KQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(Z===HQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(Z===YQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(Z===XQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(Z===UQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(Z===GQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(Z===NQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(Z===EQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(Z===qQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(Z===FQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(Z===DQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(Z===OQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(Z===RQ)return H===r0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(Z===kQ||Z===MQ||Z===LQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(Z===kQ)return H===r0?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(Z===MQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(Z===LQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(Z===VQ||Z===BQ||Z===j6||Z===zQ)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(Z===VQ)return K.COMPRESSED_RED_RGTC1_EXT;if(Z===BQ)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(Z===j6)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(Z===zQ)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(Z===k7)return J.UNSIGNED_INT_24_8;return J[Z]!==void 0?J[Z]:null}return{convert:$}}var R5=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,k5=`
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

}`;class yW{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new n6(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new T8({vertexShader:R5,fragmentShader:k5,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new h8(new T9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class fW extends F9{constructor(J,Q){super();let $=this,Z=null,W=1,K=null,H="local-floor",Y=1,X=null,U=null,N=null,E=null,G=null,D=null,M=typeof XRWebGLBinding<"u",z=new yW,F={},q=Q.getContextAttributes(),A=null,w=null,V=[],_=[],I=new u0,P=null,R=new y8;R.viewport=new K8;let B=new y8;B.viewport=new K8;let d=[R,B],C=new eQ,m=null,o=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(i){let Z0=V[i];if(Z0===void 0)Z0=new x7,V[i]=Z0;return Z0.getTargetRaySpace()},this.getControllerGrip=function(i){let Z0=V[i];if(Z0===void 0)Z0=new x7,V[i]=Z0;return Z0.getGripSpace()},this.getHand=function(i){let Z0=V[i];if(Z0===void 0)Z0=new x7,V[i]=Z0;return Z0.getHandSpace()};function p(i){let Z0=_.indexOf(i.inputSource);if(Z0===-1)return;let F0=V[Z0];if(F0!==void 0)F0.update(i.inputSource,i.frame,X||K),F0.dispatchEvent({type:i.type,data:i.inputSource})}function n(){Z.removeEventListener("select",p),Z.removeEventListener("selectstart",p),Z.removeEventListener("selectend",p),Z.removeEventListener("squeeze",p),Z.removeEventListener("squeezestart",p),Z.removeEventListener("squeezeend",p),Z.removeEventListener("end",n),Z.removeEventListener("inputsourceschange",u);for(let i=0;i<V.length;i++){let Z0=_[i];if(Z0===null)continue;_[i]=null,V[i].disconnect(Z0)}m=null,o=null,z.reset();for(let i in F)delete F[i];J.setRenderTarget(A),G=null,E=null,N=null,Z=null,w=null,i0.stop(),$.isPresenting=!1,J.setPixelRatio(P),J.setSize(I.width,I.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(i){if(W=i,$.isPresenting===!0)_0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(i){if(H=i,$.isPresenting===!0)_0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(i){X=i},this.getBaseLayer=function(){return E!==null?E:G},this.getBinding=function(){if(N===null&&M)N=new XRWebGLBinding(Z,Q);return N},this.getFrame=function(){return D},this.getSession=function(){return Z},this.setSession=async function(i){if(Z=i,Z!==null){if(A=J.getRenderTarget(),Z.addEventListener("select",p),Z.addEventListener("selectstart",p),Z.addEventListener("selectend",p),Z.addEventListener("squeeze",p),Z.addEventListener("squeezestart",p),Z.addEventListener("squeezeend",p),Z.addEventListener("end",n),Z.addEventListener("inputsourceschange",u),q.xrCompatible!==!0)await Q.makeXRCompatible();if(P=J.getPixelRatio(),J.getSize(I),!(M&&("createProjectionLayer"in XRWebGLBinding.prototype))){let F0={antialias:q.antialias,alpha:!0,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:W};G=new XRWebGLLayer(Z,Q,F0),Z.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),w=new d8(G.framebufferWidth,G.framebufferHeight,{format:J9,type:b8,colorSpace:J.outputColorSpace,stencilBuffer:q.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}else{let F0=null,D0=null,C0=null;if(q.depth)C0=q.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,F0=q.stencil?m9:p9,D0=q.stencil?k7:C9;let p0={colorFormat:Q.RGBA8,depthFormat:C0,scaleFactor:W};N=this.getBinding(),E=N.createProjectionLayer(p0),Z.updateRenderState({layers:[E]}),J.setPixelRatio(1),J.setSize(E.textureWidth,E.textureHeight,!1),w=new d8(E.textureWidth,E.textureHeight,{format:J9,type:b8,depthTexture:new P9(E.textureWidth,E.textureHeight,D0,void 0,void 0,void 0,void 0,void 0,void 0,F0),stencilBuffer:q.stencil,colorSpace:J.outputColorSpace,samples:q.antialias?4:0,resolveDepthBuffer:E.ignoreDepthValues===!1,resolveStencilBuffer:E.ignoreDepthValues===!1})}w.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await Z.requestReferenceSpace(H),i0.setContext(Z),i0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(Z!==null)return Z.environmentBlendMode},this.getDepthTexture=function(){return z.getDepthTexture()};function u(i){for(let Z0=0;Z0<i.removed.length;Z0++){let F0=i.removed[Z0],D0=_.indexOf(F0);if(D0>=0)_[D0]=null,V[D0].disconnect(F0)}for(let Z0=0;Z0<i.added.length;Z0++){let F0=i.added[Z0],D0=_.indexOf(F0);if(D0===-1){for(let p0=0;p0<V.length;p0++)if(p0>=_.length){_.push(F0),D0=p0;break}else if(_[p0]===null){_[p0]=F0,D0=p0;break}if(D0===-1)break}let C0=V[D0];if(C0)C0.connect(F0)}}let h=new y,t=new y;function e(i,Z0,F0){h.setFromMatrixPosition(Z0.matrixWorld),t.setFromMatrixPosition(F0.matrixWorld);let D0=h.distanceTo(t),C0=Z0.projectionMatrix.elements,p0=F0.projectionMatrix.elements,y0=C0[14]/(C0[10]-1),f0=C0[14]/(C0[10]+1),t0=(C0[9]+1)/C0[5],m0=(C0[9]-1)/C0[5],b0=(C0[8]-1)/C0[0],D8=(p0[8]+1)/p0[0],x8=y0*b0,Q8=y0*D8,k8=D0/(-b0+D8),O8=k8*-b0;if(Z0.matrixWorld.decompose(i.position,i.quaternion,i.scale),i.translateX(O8),i.translateZ(k8),i.matrixWorld.compose(i.position,i.quaternion,i.scale),i.matrixWorldInverse.copy(i.matrixWorld).invert(),C0[10]===-1)i.projectionMatrix.copy(Z0.projectionMatrix),i.projectionMatrixInverse.copy(Z0.projectionMatrixInverse);else{let E8=y0+k8,j=f0+k8,g8=x8-O8,c0=Q8+(D0-O8),$8=t0*f0/j*E8,L=m0*f0/j*E8;i.projectionMatrix.makePerspective(g8,c0,$8,L,E8,j),i.projectionMatrixInverse.copy(i.projectionMatrix).invert()}}function H0(i,Z0){if(Z0===null)i.matrixWorld.copy(i.matrix);else i.matrixWorld.multiplyMatrices(Z0.matrixWorld,i.matrix);i.matrixWorldInverse.copy(i.matrixWorld).invert()}this.updateCamera=function(i){if(Z===null)return;let{near:Z0,far:F0}=i;if(z.texture!==null){if(z.depthNear>0)Z0=z.depthNear;if(z.depthFar>0)F0=z.depthFar}if(C.near=B.near=R.near=Z0,C.far=B.far=R.far=F0,m!==C.near||o!==C.far)Z.updateRenderState({depthNear:C.near,depthFar:C.far}),m=C.near,o=C.far;C.layers.mask=i.layers.mask|6,R.layers.mask=C.layers.mask&-5,B.layers.mask=C.layers.mask&-3;let D0=i.parent,C0=C.cameras;H0(C,D0);for(let p0=0;p0<C0.length;p0++)H0(C0[p0],D0);if(C0.length===2)e(C,R,B);else C.projectionMatrix.copy(R.projectionMatrix);M0(i,C,D0)};function M0(i,Z0,F0){if(F0===null)i.matrix.copy(Z0.matrixWorld);else i.matrix.copy(F0.matrixWorld),i.matrix.invert(),i.matrix.multiply(Z0.matrixWorld);if(i.matrix.decompose(i.position,i.quaternion,i.scale),i.updateMatrixWorld(!0),i.projectionMatrix.copy(Z0.projectionMatrix),i.projectionMatrixInverse.copy(Z0.projectionMatrixInverse),i.isPerspectiveCamera)i.fov=k6*2*Math.atan(1/i.projectionMatrix.elements[5]),i.zoom=1}this.getCamera=function(){return C},this.getFoveation=function(){if(E===null&&G===null)return;return Y},this.setFoveation=function(i){if(Y=i,E!==null)E.fixedFoveation=i;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=i},this.hasDepthSensing=function(){return z.texture!==null},this.getDepthSensingMesh=function(){return z.getMesh(C)},this.getCameraTexture=function(i){return F[i]};let k0=null;function W8(i,Z0){if(U=Z0.getViewerPose(X||K),D=Z0,U!==null){let F0=U.views;if(G!==null)J.setRenderTargetFramebuffer(w,G.framebuffer),J.setRenderTarget(w);let D0=!1;if(F0.length!==C.cameras.length)C.cameras.length=0,D0=!0;for(let f0=0;f0<F0.length;f0++){let t0=F0[f0],m0=null;if(G!==null)m0=G.getViewport(t0);else{let D8=N.getViewSubImage(E,t0);if(m0=D8.viewport,f0===0)J.setRenderTargetTextures(w,D8.colorTexture,D8.depthStencilTexture),J.setRenderTarget(w)}let b0=d[f0];if(b0===void 0)b0=new y8,b0.layers.enable(f0),b0.viewport=new K8,d[f0]=b0;if(b0.matrix.fromArray(t0.transform.matrix),b0.matrix.decompose(b0.position,b0.quaternion,b0.scale),b0.projectionMatrix.fromArray(t0.projectionMatrix),b0.projectionMatrixInverse.copy(b0.projectionMatrix).invert(),b0.viewport.set(m0.x,m0.y,m0.width,m0.height),f0===0)C.matrix.copy(b0.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale);if(D0===!0)C.cameras.push(b0)}let C0=Z.enabledFeatures;if(C0&&C0.includes("depth-sensing")&&Z.depthUsage=="gpu-optimized"&&M){N=$.getBinding();let f0=N.getDepthInformation(F0[0]);if(f0&&f0.isValid&&f0.texture)z.init(f0,Z.renderState)}if(C0&&C0.includes("camera-access")&&M){J.state.unbindTexture(),N=$.getBinding();for(let f0=0;f0<F0.length;f0++){let t0=F0[f0].camera;if(t0){let m0=F[t0];if(!m0)m0=new n6,F[t0]=m0;let b0=N.getCameraImage(t0);m0.sourceTexture=b0}}}}for(let F0=0;F0<V.length;F0++){let D0=_[F0],C0=V[F0];if(D0!==null&&C0!==void 0)C0.update(D0,Z0,X||K)}if(k0)k0(i,Z0);if(Z0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:Z0});D=null}let i0=new zW;i0.setAnimationLoop(W8),this.setAnimationLoop=function(i){k0=i},this.dispose=function(){}}}var M5=new Z8,bW=new P0;bW.set(-1,0,0,0,1,0,0,0,1);function L5(J,Q){function $(F,q){if(F.matrixAutoUpdate===!0)F.updateMatrix();q.value.copy(F.matrix)}function Z(F,q){if(q.color.getRGB(F.fogColor.value,xQ(J)),q.isFog)F.fogNear.value=q.near,F.fogFar.value=q.far;else if(q.isFogExp2)F.fogDensity.value=q.density}function W(F,q,A,w,V){if(q.isNodeMaterial)q.uniformsNeedUpdate=!1;else if(q.isMeshBasicMaterial)K(F,q);else if(q.isMeshLambertMaterial){if(K(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshToonMaterial)K(F,q),E(F,q);else if(q.isMeshPhongMaterial){if(K(F,q),N(F,q),q.envMap)F.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshStandardMaterial){if(K(F,q),G(F,q),q.isMeshPhysicalMaterial)D(F,q,V)}else if(q.isMeshMatcapMaterial)K(F,q),M(F,q);else if(q.isMeshDepthMaterial)K(F,q);else if(q.isMeshDistanceMaterial)K(F,q),z(F,q);else if(q.isMeshNormalMaterial)K(F,q);else if(q.isLineBasicMaterial){if(H(F,q),q.isLineDashedMaterial)Y(F,q)}else if(q.isPointsMaterial)X(F,q,A,w);else if(q.isSpriteMaterial)U(F,q);else if(q.isShadowMaterial)F.color.value.copy(q.color),F.opacity.value=q.opacity;else if(q.isShaderMaterial)q.uniformsNeedUpdate=!1}function K(F,q){if(F.opacity.value=q.opacity,q.color)F.diffuse.value.copy(q.color);if(q.emissive)F.emissive.value.copy(q.emissive).multiplyScalar(q.emissiveIntensity);if(q.map)F.map.value=q.map,$(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.bumpMap){if(F.bumpMap.value=q.bumpMap,$(q.bumpMap,F.bumpMapTransform),F.bumpScale.value=q.bumpScale,q.side===P8)F.bumpScale.value*=-1}if(q.normalMap){if(F.normalMap.value=q.normalMap,$(q.normalMap,F.normalMapTransform),F.normalScale.value.copy(q.normalScale),q.side===P8)F.normalScale.value.negate()}if(q.displacementMap)F.displacementMap.value=q.displacementMap,$(q.displacementMap,F.displacementMapTransform),F.displacementScale.value=q.displacementScale,F.displacementBias.value=q.displacementBias;if(q.emissiveMap)F.emissiveMap.value=q.emissiveMap,$(q.emissiveMap,F.emissiveMapTransform);if(q.specularMap)F.specularMap.value=q.specularMap,$(q.specularMap,F.specularMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest;let A=Q.get(q),w=A.envMap,V=A.envMapRotation;if(w){if(F.envMap.value=w,F.envMapRotation.value.setFromMatrix4(M5.makeRotationFromEuler(V)).transpose(),w.isCubeTexture&&w.isRenderTargetTexture===!1)F.envMapRotation.value.premultiply(bW);F.reflectivity.value=q.reflectivity,F.ior.value=q.ior,F.refractionRatio.value=q.refractionRatio}if(q.lightMap)F.lightMap.value=q.lightMap,F.lightMapIntensity.value=q.lightMapIntensity,$(q.lightMap,F.lightMapTransform);if(q.aoMap)F.aoMap.value=q.aoMap,F.aoMapIntensity.value=q.aoMapIntensity,$(q.aoMap,F.aoMapTransform)}function H(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,q.map)F.map.value=q.map,$(q.map,F.mapTransform)}function Y(F,q){F.dashSize.value=q.dashSize,F.totalSize.value=q.dashSize+q.gapSize,F.scale.value=q.scale}function X(F,q,A,w){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.size.value=q.size*A,F.scale.value=w*0.5,q.map)F.map.value=q.map,$(q.map,F.uvTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function U(F,q){if(F.diffuse.value.copy(q.color),F.opacity.value=q.opacity,F.rotation.value=q.rotation,q.map)F.map.value=q.map,$(q.map,F.mapTransform);if(q.alphaMap)F.alphaMap.value=q.alphaMap,$(q.alphaMap,F.alphaMapTransform);if(q.alphaTest>0)F.alphaTest.value=q.alphaTest}function N(F,q){F.specular.value.copy(q.specular),F.shininess.value=Math.max(q.shininess,0.0001)}function E(F,q){if(q.gradientMap)F.gradientMap.value=q.gradientMap}function G(F,q){if(F.metalness.value=q.metalness,q.metalnessMap)F.metalnessMap.value=q.metalnessMap,$(q.metalnessMap,F.metalnessMapTransform);if(F.roughness.value=q.roughness,q.roughnessMap)F.roughnessMap.value=q.roughnessMap,$(q.roughnessMap,F.roughnessMapTransform);if(q.envMap)F.envMapIntensity.value=q.envMapIntensity}function D(F,q,A){if(F.ior.value=q.ior,q.sheen>0){if(F.sheenColor.value.copy(q.sheenColor).multiplyScalar(q.sheen),F.sheenRoughness.value=q.sheenRoughness,q.sheenColorMap)F.sheenColorMap.value=q.sheenColorMap,$(q.sheenColorMap,F.sheenColorMapTransform);if(q.sheenRoughnessMap)F.sheenRoughnessMap.value=q.sheenRoughnessMap,$(q.sheenRoughnessMap,F.sheenRoughnessMapTransform)}if(q.clearcoat>0){if(F.clearcoat.value=q.clearcoat,F.clearcoatRoughness.value=q.clearcoatRoughness,q.clearcoatMap)F.clearcoatMap.value=q.clearcoatMap,$(q.clearcoatMap,F.clearcoatMapTransform);if(q.clearcoatRoughnessMap)F.clearcoatRoughnessMap.value=q.clearcoatRoughnessMap,$(q.clearcoatRoughnessMap,F.clearcoatRoughnessMapTransform);if(q.clearcoatNormalMap){if(F.clearcoatNormalMap.value=q.clearcoatNormalMap,$(q.clearcoatNormalMap,F.clearcoatNormalMapTransform),F.clearcoatNormalScale.value.copy(q.clearcoatNormalScale),q.side===P8)F.clearcoatNormalScale.value.negate()}}if(q.dispersion>0)F.dispersion.value=q.dispersion;if(q.iridescence>0){if(F.iridescence.value=q.iridescence,F.iridescenceIOR.value=q.iridescenceIOR,F.iridescenceThicknessMinimum.value=q.iridescenceThicknessRange[0],F.iridescenceThicknessMaximum.value=q.iridescenceThicknessRange[1],q.iridescenceMap)F.iridescenceMap.value=q.iridescenceMap,$(q.iridescenceMap,F.iridescenceMapTransform);if(q.iridescenceThicknessMap)F.iridescenceThicknessMap.value=q.iridescenceThicknessMap,$(q.iridescenceThicknessMap,F.iridescenceThicknessMapTransform)}if(q.transmission>0){if(F.transmission.value=q.transmission,F.transmissionSamplerMap.value=A.texture,F.transmissionSamplerSize.value.set(A.width,A.height),q.transmissionMap)F.transmissionMap.value=q.transmissionMap,$(q.transmissionMap,F.transmissionMapTransform);if(F.thickness.value=q.thickness,q.thicknessMap)F.thicknessMap.value=q.thicknessMap,$(q.thicknessMap,F.thicknessMapTransform);F.attenuationDistance.value=q.attenuationDistance,F.attenuationColor.value.copy(q.attenuationColor)}if(q.anisotropy>0){if(F.anisotropyVector.value.set(q.anisotropy*Math.cos(q.anisotropyRotation),q.anisotropy*Math.sin(q.anisotropyRotation)),q.anisotropyMap)F.anisotropyMap.value=q.anisotropyMap,$(q.anisotropyMap,F.anisotropyMapTransform)}if(F.specularIntensity.value=q.specularIntensity,F.specularColor.value.copy(q.specularColor),q.specularColorMap)F.specularColorMap.value=q.specularColorMap,$(q.specularColorMap,F.specularColorMapTransform);if(q.specularIntensityMap)F.specularIntensityMap.value=q.specularIntensityMap,$(q.specularIntensityMap,F.specularIntensityMapTransform)}function M(F,q){if(q.matcap)F.matcap.value=q.matcap}function z(F,q){let A=Q.get(q).light;F.referencePosition.value.setFromMatrixPosition(A.matrixWorld),F.nearDistance.value=A.shadow.camera.near,F.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:Z,refreshMaterialUniforms:W}}function V5(J,Q,$,Z){let W={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(V,_){let I=_.program;Z.uniformBlockBinding(V,I)}function U(V,_){let I=W[V.id];if(I===void 0)F(V),I=N(V),W[V.id]=I,V.addEventListener("dispose",A);let P=_.program;Z.updateUBOMapping(V,P);let R=Q.render.frame;if(K[V.id]!==R)G(V),K[V.id]=R}function N(V){let _=E();V.__bindingPointIndex=_;let I=J.createBuffer(),P=V.__size,R=V.usage;return J.bindBuffer(J.UNIFORM_BUFFER,I),J.bufferData(J.UNIFORM_BUFFER,P,R),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,_,I),I}function E(){for(let V=0;V<Y;V++)if(H.indexOf(V)===-1)return H.push(V),V;return w0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(V){let _=W[V.id],I=V.uniforms,P=V.__cache;J.bindBuffer(J.UNIFORM_BUFFER,_);for(let R=0,B=I.length;R<B;R++){let d=I[R];if(Array.isArray(d))for(let C=0,m=d.length;C<m;C++)D(d[C],R,C,P);else D(d,R,0,P)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function D(V,_,I,P){if(z(V,_,I,P)===!0){let{__offset:R,value:B}=V;if(Array.isArray(B)){let d=0;for(let C=0;C<B.length;C++){let m=B[C],o=q(m);if(M(m,V.__data,d),typeof m!=="number"&&typeof m!=="boolean"&&!m.isMatrix3&&!ArrayBuffer.isView(m))d+=o.storage/Float32Array.BYTES_PER_ELEMENT}}else M(B,V.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,R,V.__data)}}function M(V,_,I){if(typeof V==="number"||typeof V==="boolean")_[0]=V;else if(V.isMatrix3)_[0]=V.elements[0],_[1]=V.elements[1],_[2]=V.elements[2],_[3]=0,_[4]=V.elements[3],_[5]=V.elements[4],_[6]=V.elements[5],_[7]=0,_[8]=V.elements[6],_[9]=V.elements[7],_[10]=V.elements[8],_[11]=0;else if(ArrayBuffer.isView(V))_.set(new V.constructor(V.buffer,V.byteOffset,_.length));else V.toArray(_,I)}function z(V,_,I,P){let R=V.value,B=_+"_"+I;if(P[B]===void 0){if(typeof R==="number"||typeof R==="boolean")P[B]=R;else if(ArrayBuffer.isView(R))P[B]=R.slice();else P[B]=R.clone();return!0}else{let d=P[B];if(typeof R==="number"||typeof R==="boolean"){if(d!==R)return P[B]=R,!0}else if(ArrayBuffer.isView(R))return!0;else if(d.equals(R)===!1)return d.copy(R),!0}return!1}function F(V){let _=V.uniforms,I=0,P=16;for(let B=0,d=_.length;B<d;B++){let C=Array.isArray(_[B])?_[B]:[_[B]];for(let m=0,o=C.length;m<o;m++){let p=C[m],n=Array.isArray(p.value)?p.value:[p.value];for(let u=0,h=n.length;u<h;u++){let t=n[u],e=q(t),H0=I%P,M0=H0%e.boundary,k0=H0+M0;if(I+=M0,k0!==0&&P-k0<e.storage)I+=P-k0;p.__data=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),p.__offset=I,I+=e.storage}}}let R=I%P;if(R>0)I+=P-R;return V.__size=I,V.__cache={},this}function q(V){let _={boundary:0,storage:0};if(typeof V==="number"||typeof V==="boolean")_.boundary=4,_.storage=4;else if(V.isVector2)_.boundary=8,_.storage=8;else if(V.isVector3||V.isColor)_.boundary=16,_.storage=12;else if(V.isVector4)_.boundary=16,_.storage=16;else if(V.isMatrix3)_.boundary=48,_.storage=48;else if(V.isMatrix4)_.boundary=64,_.storage=64;else if(V.isTexture)_0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(V))_.boundary=16,_.storage=V.byteLength;else _0("WebGLRenderer: Unsupported uniform value type.",V);return _}function A(V){let _=V.target;_.removeEventListener("dispose",A);let I=H.indexOf(_.__bindingPointIndex);H.splice(I,1),J.deleteBuffer(W[_.id]),delete W[_.id],delete K[_.id]}function w(){for(let V in W)J.deleteBuffer(W[V]);H=[],W={},K={}}return{bind:X,update:U,dispose:w}}var B5=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Q9=null;function z5(){if(Q9===null)Q9=new p7(B5,16,16,l9,q9),Q9.name="DFG_LUT",Q9.minFilter=_8,Q9.magFilter=_8,Q9.wrapS=I6,Q9.wrapT=I6,Q9.generateMipmaps=!1,Q9.needsUpdate=!0;return Q9}class F${constructor(J={}){let{canvas:Q=sZ(),context:$=null,depth:Z=!0,stencil:W=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:N=!1,reversedDepthBuffer:E=!1,outputBufferType:G=b8}=J;this.isWebGLRenderer=!0;let D;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");D=$.getContextAttributes().alpha}else D=K;let M=G,z=new Set([sJ,nJ,cJ]),F=new Set([b8,C9,f7,k7,dJ,uJ]),q=new Uint32Array(4),A=new Int32Array(4),w=new y,V=null,_=null,I=[],P=[],R=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=i8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let B=this,d=!1,C=null,m=null,o=null,p=null;this._outputColorSpace=v6;let n=0,u=0,h=null,t=-1,e=null,H0=new K8,M0=new K8,k0=null,W8=new x0(0),i0=0,i=Q.width,Z0=Q.height,F0=1,D0=null,C0=null,p0=new K8(0,0,i,Z0),y0=new K8(0,0,i,Z0),f0=!1,t0=new d6,m0=!1,b0=!1,D8=new Z8,x8=new y,Q8=new K8,k8={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O8=!1;function E8(){return h===null?F0:1}let j=$;function g8(k,v){return Q.getContext(k,v)}try{let k={alpha:!0,depth:Z,stencil:W,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:N};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${t$}`);if(Q.addEventListener("webglcontextlost",T0,!1),Q.addEventListener("webglcontextrestored",H8,!1),Q.addEventListener("webglcontextcreationerror",e0,!1),j===null){if(j=g8("webgl2",k),j===null)if(g8("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(k){throw w0("WebGLRenderer: "+k.message),k}let c0,$8,L,O,T,g,r,J0,Y0,l,s,E0,V0,X0,Q0,I0,A0,d0,S,$0,c,W0,q0;function a(){if(c0=new TX(j),c0.init(),c=new O5(j,c0),$8=new BX(j,c0,J,c),L=new F5(j,c0),$8.reversedDepthBuffer&&E)L.buffers.depth.setReversed(!0);m=j.createFramebuffer(),o=j.createFramebuffer(),p=j.createFramebuffer(),O=new vX(j),T=new J5,g=new D5(j,c0,L,T,$8,c,O),r=new PX(B),J0=new hK(j),W0=new LX(j,J0),Y0=new SX(j,J0,O,W0),l=new fX(j,Y0,J0,W0,O),d0=new yX(j,$8,g),Q0=new zX(T),s=new eU(B,r,c0,$8,W0,Q0),E0=new L5(B,T),V0=new $5,X0=new X5(c0),A0=new MX(B,r,L,l,D,Y),I0=new q5(B,l,$8),q0=new V5(j,O,$8,L),S=new VX(j,c0,O),$0=new jX(j,c0,O),O.programs=s.programs,B.capabilities=$8,B.extensions=c0,B.properties=T,B.renderLists=V0,B.shadowMap=I0,B.state=L,B.info=O}if(a(),M!==b8)R=new hX(M,Q.width,Q.height,H,Z,W);let K0=new fW(B,j);this.xr=K0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let k=c0.get("WEBGL_lose_context");if(k)k.loseContext()},this.forceContextRestore=function(){let k=c0.get("WEBGL_lose_context");if(k)k.restoreContext()},this.getPixelRatio=function(){return F0},this.setPixelRatio=function(k){if(k===void 0)return;F0=k,this.setSize(i,Z0,!1)},this.getSize=function(k){return k.set(i,Z0)},this.setSize=function(k,v,x=!0){if(K0.isPresenting){_0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(i=k,Z0=v,Q.width=Math.floor(k*F0),Q.height=Math.floor(v*F0),x===!0)Q.style.width=k+"px",Q.style.height=v+"px";if(R!==null)R.setSize(Q.width,Q.height);this.setViewport(0,0,k,v)},this.getDrawingBufferSize=function(k){return k.set(i*F0,Z0*F0).floor()},this.setDrawingBufferSize=function(k,v,x){i=k,Z0=v,F0=x,Q.width=Math.floor(k*x),Q.height=Math.floor(v*x),this.setViewport(0,0,k,v)},this.setEffects=function(k){if(M===b8){w0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(k){for(let v=0;v<k.length;v++)if(k[v].isOutputPass===!0){_0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(k||[])},this.getCurrentViewport=function(k){return k.copy(H0)},this.getViewport=function(k){return k.copy(p0)},this.setViewport=function(k,v,x,f){if(k.isVector4)p0.set(k.x,k.y,k.z,k.w);else p0.set(k,v,x,f);L.viewport(H0.copy(p0).multiplyScalar(F0).round())},this.getScissor=function(k){return k.copy(y0)},this.setScissor=function(k,v,x,f){if(k.isVector4)y0.set(k.x,k.y,k.z,k.w);else y0.set(k,v,x,f);L.scissor(M0.copy(y0).multiplyScalar(F0).round())},this.getScissorTest=function(){return f0},this.setScissorTest=function(k){L.setScissorTest(f0=k)},this.setOpaqueSort=function(k){D0=k},this.setTransparentSort=function(k){C0=k},this.getClearColor=function(k){return k.copy(A0.getClearColor())},this.setClearColor=function(){A0.setClearColor(...arguments)},this.getClearAlpha=function(){return A0.getClearAlpha()},this.setClearAlpha=function(){A0.setClearAlpha(...arguments)},this.clear=function(k=!0,v=!0,x=!0){let f=0;if(k){let b=!1;if(h!==null){let N0=h.texture.format;b=z.has(N0)}if(b){let N0=h.texture.type,R0=F.has(N0),G0=A0.getClearColor(),L0=A0.getClearAlpha(),B0=G0.r,S0=G0.g,v0=G0.b;if(R0)q[0]=B0,q[1]=S0,q[2]=v0,q[3]=L0,j.clearBufferuiv(j.COLOR,0,q);else A[0]=B0,A[1]=S0,A[2]=v0,A[3]=L0,j.clearBufferiv(j.COLOR,0,A)}else f|=j.COLOR_BUFFER_BIT}if(v)f|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(x)f|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(f!==0)j.clear(f)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(k){k.setRenderer(this),C=k},this.dispose=function(){Q.removeEventListener("webglcontextlost",T0,!1),Q.removeEventListener("webglcontextrestored",H8,!1),Q.removeEventListener("webglcontextcreationerror",e0,!1),A0.dispose(),V0.dispose(),X0.dispose(),T.dispose(),r.dispose(),l.dispose(),W0.dispose(),q0.dispose(),s.dispose(),K0.dispose(),K0.removeEventListener("sessionstart",L$),K0.removeEventListener("sessionend",V$),j9.stop()};function T0(k){k.preventDefault(),TQ("WebGLRenderer: Context Lost."),d=!0}function H8(){TQ("WebGLRenderer: Context Restored."),d=!1;let k=O.autoReset,v=I0.enabled,x=I0.autoUpdate,f=I0.needsUpdate,b=I0.type;a(),O.autoReset=k,I0.enabled=v,I0.autoUpdate=x,I0.needsUpdate=f,I0.type=b}function e0(k){w0("WebGLRenderer: A WebGL context could not be created. Reason: ",k.statusMessage)}function o8(k){let v=k.target;v.removeEventListener("dispose",o8),W9(v)}function W9(k){tW(k),T.remove(k)}function tW(k){let v=T.get(k).programs;if(v!==void 0){if(v.forEach(function(x){s.releaseProgram(x)}),k.isShaderMaterial)s.releaseShaderCache(k)}}this.renderBufferDirect=function(k,v,x,f,b,N0){if(v===null)v=k8;let R0=b.isMesh&&b.matrixWorld.determinantAffine()<0,G0=QK(k,v,x,f,b);L.setMaterial(f,R0);let L0=x.index,B0=1;if(f.wireframe===!0){if(L0=Y0.getWireframeAttribute(x),L0===void 0)return;B0=2}let S0=x.drawRange,v0=x.attributes.position,z0=S0.start*B0,s0=(S0.start+S0.count)*B0;if(N0!==null)z0=Math.max(z0,N0.start*B0),s0=Math.min(s0,(N0.start+N0.count)*B0);if(L0!==null)z0=Math.max(z0,0),s0=Math.min(s0,L0.count);else if(v0!==void 0&&v0!==null)z0=Math.max(z0,0),s0=Math.min(s0,v0.count);let X8=s0-z0;if(X8<0||X8===1/0)return;W0.setup(b,f,G0,x,L0);let Y8,o0=S;if(L0!==null)Y8=J0.get(L0),o0=$0,o0.setIndex(Y8);if(b.isMesh)if(f.wireframe===!0)L.setLineWidth(f.wireframeLinewidth*E8()),o0.setMode(j.LINES);else o0.setMode(j.TRIANGLES);else if(b.isLine){let L8=f.linewidth;if(L8===void 0)L8=1;if(L.setLineWidth(L8*E8()),b.isLineSegments)o0.setMode(j.LINES);else if(b.isLineLoop)o0.setMode(j.LINE_LOOP);else o0.setMode(j.LINE_STRIP)}else if(b.isPoints)o0.setMode(j.POINTS);else if(b.isSprite)o0.setMode(j.TRIANGLES);if(b.isBatchedMesh)if(!c0.get("WEBGL_multi_draw")){let{_multiDrawStarts:L8,_multiDrawCounts:O0,_multiDrawCount:S8}=b,l0=L0?J0.get(L0).bytesPerElement:1,p8=T.get(f).currentProgram.getUniforms();for(let a8=0;a8<S8;a8++)p8.setValue(j,"_gl_DrawID",a8),o0.render(L8[a8]/l0,O0[a8])}else o0.renderMultiDraw(b._multiDrawStarts,b._multiDrawCounts,b._multiDrawCount);else if(b.isInstancedMesh)o0.renderInstances(z0,X8,b.count);else if(x.isInstancedBufferGeometry){let L8=x._maxInstanceCount!==void 0?x._maxInstanceCount:1/0,O0=Math.min(x.instanceCount,L8);o0.renderInstances(z0,X8,O0)}else o0.render(z0,X8)};function M$(k,v,x){if(k.transparent===!0&&k.side===t8&&k.forceSinglePass===!1)k.side=P8,k.needsUpdate=!0,s7(k,v,x),k.side=D7,k.needsUpdate=!0,s7(k,v,x),k.side=t8;else s7(k,v,x)}this.compile=function(k,v,x=null){if(x===null)x=k;if(_=X0.get(x),_.init(v),P.push(_),x.traverseVisible(function(b){if(b.isLight&&b.layers.test(v.layers)){if(_.pushLight(b),b.castShadow)_.pushShadow(b)}}),k!==x)k.traverseVisible(function(b){if(b.isLight&&b.layers.test(v.layers)){if(_.pushLight(b),b.castShadow)_.pushShadow(b)}});_.setupLights();let f=new Set;return k.traverse(function(b){if(!(b.isMesh||b.isPoints||b.isLine||b.isSprite))return;let N0=b.material;if(N0)if(Array.isArray(N0))for(let R0=0;R0<N0.length;R0++){let G0=N0[R0];M$(G0,x,b),f.add(G0)}else M$(N0,x,b),f.add(N0)}),_=P.pop(),f},this.compileAsync=function(k,v,x=null){let f=this.compile(k,v,x);return new Promise((b)=>{function N0(){if(f.forEach(function(R0){if(T.get(R0).currentProgram.isReady())f.delete(R0)}),f.size===0){b(k);return}setTimeout(N0,10)}if(c0.get("KHR_parallel_shader_compile")!==null)N0();else setTimeout(N0,10)})};let ZJ=null;function eW(k){if(ZJ)ZJ(k)}function L$(){j9.stop()}function V$(){j9.start()}let j9=new zW;if(j9.setAnimationLoop(eW),typeof self<"u")j9.setContext(self);this.setAnimationLoop=function(k){ZJ=k,K0.setAnimationLoop(k),k===null?j9.stop():j9.start()},K0.addEventListener("sessionstart",L$),K0.addEventListener("sessionend",V$),this.render=function(k,v){if(v!==void 0&&v.isCamera!==!0){w0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(d===!0)return;if(C!==null)C.renderStart(k,v);let x=K0.enabled===!0&&K0.isPresenting===!0,f=R!==null&&(h===null||x)&&R.begin(B,h);if(k.matrixWorldAutoUpdate===!0)k.updateMatrixWorld();if(v.parent===null&&v.matrixWorldAutoUpdate===!0)v.updateMatrixWorld();if(K0.enabled===!0&&K0.isPresenting===!0&&(R===null||R.isCompositing()===!1)){if(K0.cameraAutoUpdate===!0)K0.updateCamera(v);v=K0.getCamera()}if(k.isScene===!0)k.onBeforeRender(B,k,v,h);if(_=X0.get(k,P.length),_.init(v),_.state.textureUnits=g.getTextureUnits(),P.push(_),D8.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),t0.setFromProjectionMatrix(D8,PQ,v.reversedDepth),b0=this.localClippingEnabled,m0=Q0.init(this.clippingPlanes,b0),V=V0.get(k,I.length),V.init(),I.push(V),K0.enabled===!0&&K0.isPresenting===!0){let R0=B.xr.getDepthSensingMesh();if(R0!==null)WJ(R0,v,-1/0,B.sortObjects)}if(WJ(k,v,0,B.sortObjects),V.finish(),B.sortObjects===!0)V.sort(D0,C0,v.reversedDepth);if(O8=K0.enabled===!1||K0.isPresenting===!1||K0.hasDepthSensing()===!1,O8)A0.addToRenderList(V,k);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(m0===!0)Q0.beginShadows();let b=_.state.shadowsArray;if(I0.render(b,k,v),m0===!0)Q0.endShadows();if((f&&R.hasRenderPass())===!1){let{opaque:R0,transmissive:G0}=V;if(_.setupLights(),v.isArrayCamera){let L0=v.cameras;if(G0.length>0)for(let B0=0,S0=L0.length;B0<S0;B0++){let v0=L0[B0];z$(R0,G0,k,v0)}if(O8)A0.render(k);for(let B0=0,S0=L0.length;B0<S0;B0++){let v0=L0[B0];B$(V,k,v0,v0.viewport)}}else{if(G0.length>0)z$(R0,G0,k,v);if(O8)A0.render(k);B$(V,k,v)}}if(h!==null&&u===0)g.updateMultisampleRenderTarget(h),g.updateRenderTargetMipmap(h);if(f)R.end(B);if(k.isScene===!0)k.onAfterRender(B,k,v);if(W0.resetDefaultState(),t=-1,e=null,P.pop(),P.length>0){if(_=P[P.length-1],g.setTextureUnits(_.state.textureUnits),m0===!0)Q0.setGlobalState(B.clippingPlanes,_.state.camera)}else _=null;if(I.pop(),I.length>0)V=I[I.length-1];else V=null;if(C!==null)C.renderEnd()};function WJ(k,v,x,f){if(k.visible===!1)return;if(k.layers.test(v.layers)){if(k.isGroup)x=k.renderOrder;else if(k.isLOD){if(k.autoUpdate===!0)k.update(v)}else if(k.isLightProbeGrid)_.pushLightProbeGrid(k);else if(k.isLight){if(_.pushLight(k),k.castShadow)_.pushShadow(k)}else if(k.isSprite){if(!k.frustumCulled||t0.intersectsSprite(k)){if(f)Q8.setFromMatrixPosition(k.matrixWorld).applyMatrix4(D8);let R0=l.update(k),G0=k.material;if(G0.visible)V.push(k,R0,G0,x,Q8.z,null)}}else if(k.isMesh||k.isLine||k.isPoints){if(!k.frustumCulled||t0.intersectsObject(k)){let R0=l.update(k),G0=k.material;if(f){if(k.boundingSphere!==void 0){if(k.boundingSphere===null)k.computeBoundingSphere();Q8.copy(k.boundingSphere.center)}else{if(R0.boundingSphere===null)R0.computeBoundingSphere();Q8.copy(R0.boundingSphere.center)}Q8.applyMatrix4(k.matrixWorld).applyMatrix4(D8)}if(Array.isArray(G0)){let L0=R0.groups;for(let B0=0,S0=L0.length;B0<S0;B0++){let v0=L0[B0],z0=G0[v0.materialIndex];if(z0&&z0.visible)V.push(k,R0,z0,x,Q8.z,v0)}}else if(G0.visible)V.push(k,R0,G0,x,Q8.z,null)}}}let N0=k.children;for(let R0=0,G0=N0.length;R0<G0;R0++)WJ(N0[R0],v,x,f)}function B$(k,v,x,f){let{opaque:b,transmissive:N0,transparent:R0}=k;if(_.setupLightsView(x),m0===!0)Q0.setGlobalState(B.clippingPlanes,x);if(f)L.viewport(H0.copy(f));if(b.length>0)n7(b,v,x);if(N0.length>0)n7(N0,v,x);if(R0.length>0)n7(R0,v,x);L.buffers.depth.setTest(!0),L.buffers.depth.setMask(!0),L.buffers.color.setMask(!0),L.setPolygonOffset(!1)}function z$(k,v,x,f){if((x.isScene===!0?x.overrideMaterial:null)!==null)return;if(_.state.transmissionRenderTarget[f.id]===void 0){let z0=c0.has("EXT_color_buffer_half_float")||c0.has("EXT_color_buffer_float");_.state.transmissionRenderTarget[f.id]=new d8(1,1,{generateMipmaps:!0,type:z0?q9:b8,minFilter:g9,samples:Math.max(4,$8.samples),stencilBuffer:W,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:h0.workingColorSpace})}let N0=_.state.transmissionRenderTarget[f.id],R0=f.viewport||H0;N0.setSize(R0.z*B.transmissionResolutionScale,R0.w*B.transmissionResolutionScale);let G0=B.getRenderTarget(),L0=B.getActiveCubeFace(),B0=B.getActiveMipmapLevel();if(B.setRenderTarget(N0),B.getClearColor(W8),i0=B.getClearAlpha(),i0<1)B.setClearColor(16777215,0.5);if(B.clear(),O8)A0.render(x);let S0=B.toneMapping;B.toneMapping=i8;let v0=f.viewport;if(f.viewport!==void 0)f.viewport=void 0;if(_.setupLightsView(f),m0===!0)Q0.setGlobalState(B.clippingPlanes,f);if(n7(k,x,f),g.updateMultisampleRenderTarget(N0),g.updateRenderTargetMipmap(N0),c0.has("WEBGL_multisampled_render_to_texture")===!1){let z0=!1;for(let s0=0,X8=v.length;s0<X8;s0++){let Y8=v[s0],{object:o0,geometry:L8,material:O0,group:S8}=Y8;if(O0.side===t8&&o0.layers.test(f.layers)){let l0=O0.side;O0.side=P8,O0.needsUpdate=!0,I$(o0,x,f,L8,O0,S8),O0.side=l0,O0.needsUpdate=!0,z0=!0}}if(z0===!0)g.updateMultisampleRenderTarget(N0),g.updateRenderTargetMipmap(N0)}if(B.setRenderTarget(G0,L0,B0),B.setClearColor(W8,i0),v0!==void 0)f.viewport=v0;B.toneMapping=S0}function n7(k,v,x){let f=v.isScene===!0?v.overrideMaterial:null;for(let b=0,N0=k.length;b<N0;b++){let R0=k[b],{object:G0,geometry:L0,group:B0}=R0,S0=R0.material;if(S0.allowOverride===!0&&f!==null)S0=f;if(G0.layers.test(x.layers))I$(G0,v,x,L0,S0,B0)}}function I$(k,v,x,f,b,N0){if(k.onBeforeRender(B,v,x,f,b,N0),k.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,k.matrixWorld),k.normalMatrix.getNormalMatrix(k.modelViewMatrix),b.onBeforeRender(B,v,x,f,k,N0),b.transparent===!0&&b.side===t8&&b.forceSinglePass===!1)b.side=P8,b.needsUpdate=!0,B.renderBufferDirect(x,v,f,b,k,N0),b.side=D7,b.needsUpdate=!0,B.renderBufferDirect(x,v,f,b,k,N0),b.side=t8;else B.renderBufferDirect(x,v,f,b,k,N0);k.onAfterRender(B,v,x,f,b,N0)}function s7(k,v,x){if(v.isScene!==!0)v=k8;let f=T.get(k),b=_.state.lights,N0=_.state.shadowsArray,R0=b.state.version,G0=s.getParameters(k,b.state,N0,v,x,_.state.lightProbeGridArray),L0=s.getProgramCacheKey(G0),B0=f.programs;f.environment=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?v.environment:null,f.fog=v.fog;let S0=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap;if(f.envMap=r.get(k.envMap||f.environment,S0),f.envMapRotation=f.environment!==null&&k.envMap===null?v.environmentRotation:k.envMapRotation,B0===void 0)k.addEventListener("dispose",o8),B0=new Map,f.programs=B0;let v0=B0.get(L0);if(v0!==void 0){if(f.currentProgram===v0&&f.lightsStateVersion===R0)return A$(k,G0),v0}else{if(G0.uniforms=s.getUniforms(k),C!==null&&k.isNodeMaterial)C.build(k,x,G0);k.onBeforeCompile(G0,B),v0=s.acquireProgram(G0,L0),B0.set(L0,v0),f.uniforms=G0.uniforms}let z0=f.uniforms;if(!k.isShaderMaterial&&!k.isRawShaderMaterial||k.clipping===!0)z0.clippingPlanes=Q0.uniform;if(A$(k,G0),f.needsLights=ZK(k),f.lightsStateVersion=R0,f.needsLights)z0.ambientLightColor.value=b.state.ambient,z0.lightProbe.value=b.state.probe,z0.directionalLights.value=b.state.directional,z0.directionalLightShadows.value=b.state.directionalShadow,z0.spotLights.value=b.state.spot,z0.spotLightShadows.value=b.state.spotShadow,z0.rectAreaLights.value=b.state.rectArea,z0.ltc_1.value=b.state.rectAreaLTC1,z0.ltc_2.value=b.state.rectAreaLTC2,z0.pointLights.value=b.state.point,z0.pointLightShadows.value=b.state.pointShadow,z0.hemisphereLights.value=b.state.hemi,z0.directionalShadowMatrix.value=b.state.directionalShadowMatrix,z0.spotLightMatrix.value=b.state.spotLightMatrix,z0.spotLightMap.value=b.state.spotLightMap,z0.pointShadowMatrix.value=b.state.pointShadowMatrix;return f.lightProbeGrid=_.state.lightProbeGridArray.length>0,f.currentProgram=v0,f.uniformsList=null,v0}function _$(k){if(k.uniformsList===null){let v=k.currentProgram.getUniforms();k.uniformsList=c7.seqWithValue(v.seq,k.uniforms)}return k.uniformsList}function A$(k,v){let x=T.get(k);x.outputColorSpace=v.outputColorSpace,x.batching=v.batching,x.batchingColor=v.batchingColor,x.instancing=v.instancing,x.instancingColor=v.instancingColor,x.instancingMorph=v.instancingMorph,x.skinning=v.skinning,x.morphTargets=v.morphTargets,x.morphNormals=v.morphNormals,x.morphColors=v.morphColors,x.morphTargetsCount=v.morphTargetsCount,x.numClippingPlanes=v.numClippingPlanes,x.numIntersection=v.numClipIntersection,x.vertexAlphas=v.vertexAlphas,x.vertexTangents=v.vertexTangents,x.toneMapping=v.toneMapping}function JK(k,v){if(k.length===0)return null;if(k.length===1)return k[0].texture!==null?k[0]:null;w.setFromMatrixPosition(v.matrixWorld);for(let x=0,f=k.length;x<f;x++){let b=k[x];if(b.texture!==null&&b.boundingBox.containsPoint(w))return b}return null}function QK(k,v,x,f,b){if(v.isScene!==!0)v=k8;g.resetTextureUnits();let N0=v.fog,R0=f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial?v.environment:null,G0=h===null?B.outputColorSpace:h.isXRRenderTarget===!0?h.texture.colorSpace:h0.workingColorSpace,L0=f.isMeshStandardMaterial||f.isMeshLambertMaterial&&!f.envMap||f.isMeshPhongMaterial&&!f.envMap,B0=r.get(f.envMap||R0,L0),S0=f.vertexColors===!0&&!!x.attributes.color&&x.attributes.color.itemSize===4,v0=!!x.attributes.tangent&&(!!f.normalMap||f.anisotropy>0),z0=!!x.morphAttributes.position,s0=!!x.morphAttributes.normal,X8=!!x.morphAttributes.color,Y8=i8;if(f.toneMapped){if(h===null||h.isXRRenderTarget===!0)Y8=B.toneMapping}let o0=x.morphAttributes.position||x.morphAttributes.normal||x.morphAttributes.color,L8=o0!==void 0?o0.length:0,O0=T.get(f),S8=_.state.lights;if(m0===!0){if(b0===!0||k!==e){let J8=k===e&&f.id===t;Q0.setState(f,k,J8)}}let l0=!1;if(f.version===O0.__version){if(O0.needsLights&&O0.lightsStateVersion!==S8.state.version)l0=!0;else if(O0.outputColorSpace!==G0)l0=!0;else if(b.isBatchedMesh&&O0.batching===!1)l0=!0;else if(!b.isBatchedMesh&&O0.batching===!0)l0=!0;else if(b.isBatchedMesh&&O0.batchingColor===!0&&b.colorTexture===null)l0=!0;else if(b.isBatchedMesh&&O0.batchingColor===!1&&b.colorTexture!==null)l0=!0;else if(b.isInstancedMesh&&O0.instancing===!1)l0=!0;else if(!b.isInstancedMesh&&O0.instancing===!0)l0=!0;else if(b.isSkinnedMesh&&O0.skinning===!1)l0=!0;else if(!b.isSkinnedMesh&&O0.skinning===!0)l0=!0;else if(b.isInstancedMesh&&O0.instancingColor===!0&&b.instanceColor===null)l0=!0;else if(b.isInstancedMesh&&O0.instancingColor===!1&&b.instanceColor!==null)l0=!0;else if(b.isInstancedMesh&&O0.instancingMorph===!0&&b.morphTexture===null)l0=!0;else if(b.isInstancedMesh&&O0.instancingMorph===!1&&b.morphTexture!==null)l0=!0;else if(O0.envMap!==B0)l0=!0;else if(f.fog===!0&&O0.fog!==N0)l0=!0;else if(O0.numClippingPlanes!==void 0&&(O0.numClippingPlanes!==Q0.numPlanes||O0.numIntersection!==Q0.numIntersection))l0=!0;else if(O0.vertexAlphas!==S0)l0=!0;else if(O0.vertexTangents!==v0)l0=!0;else if(O0.morphTargets!==z0)l0=!0;else if(O0.morphNormals!==s0)l0=!0;else if(O0.morphColors!==X8)l0=!0;else if(O0.toneMapping!==Y8)l0=!0;else if(O0.morphTargetsCount!==L8)l0=!0;else if(!!O0.lightProbeGrid!==_.state.lightProbeGridArray.length>0)l0=!0}else l0=!0,O0.__version=f.version;let p8=O0.currentProgram;if(l0===!0){if(p8=s7(f,v,b),C&&f.isNodeMaterial)C.onUpdateProgram(f,p8,O0)}let a8=!1,O9=!1,r9=!1,a0=p8.getUniforms(),U8=O0.uniforms;if(L.useProgram(p8.program))a8=!0,O9=!0,r9=!0;if(f.id!==t)t=f.id,O9=!0;if(O0.needsLights){let J8=JK(_.state.lightProbeGridArray,b);if(O0.lightProbeGrid!==J8)O0.lightProbeGrid=J8,O9=!0}if(a8||e!==k){if(L.buffers.depth.getReversed()&&k.reversedDepth!==!0)k._reversedDepth=!0,k.updateProjectionMatrix();a0.setValue(j,"projectionMatrix",k.projectionMatrix),a0.setValue(j,"viewMatrix",k.matrixWorldInverse);let k9=a0.map.cameraPosition;if(k9!==void 0)k9.setValue(j,x8.setFromMatrixPosition(k.matrixWorld));if($8.logarithmicDepthBuffer)a0.setValue(j,"logDepthBufFC",2/(Math.log(k.far+1)/Math.LN2));if(f.isMeshPhongMaterial||f.isMeshToonMaterial||f.isMeshLambertMaterial||f.isMeshBasicMaterial||f.isMeshStandardMaterial||f.isShaderMaterial)a0.setValue(j,"isOrthographic",k.isOrthographicCamera===!0);if(e!==k)e=k,O9=!0,r9=!0}if(O0.needsLights){if(S8.state.directionalShadowMap.length>0)a0.setValue(j,"directionalShadowMap",S8.state.directionalShadowMap,g);if(S8.state.spotShadowMap.length>0)a0.setValue(j,"spotShadowMap",S8.state.spotShadowMap,g);if(S8.state.pointShadowMap.length>0)a0.setValue(j,"pointShadowMap",S8.state.pointShadowMap,g)}if(b.isSkinnedMesh){a0.setOptional(j,b,"bindMatrix"),a0.setOptional(j,b,"bindMatrixInverse");let J8=b.skeleton;if(J8){if(J8.boneTexture===null)J8.computeBoneTexture();a0.setValue(j,"boneTexture",J8.boneTexture,g)}}if(b.isBatchedMesh){if(a0.setOptional(j,b,"batchingTexture"),a0.setValue(j,"batchingTexture",b._matricesTexture,g),a0.setOptional(j,b,"batchingIdTexture"),a0.setValue(j,"batchingIdTexture",b._indirectTexture,g),a0.setOptional(j,b,"batchingColorTexture"),b._colorsTexture!==null)a0.setValue(j,"batchingColorTexture",b._colorsTexture,g)}let R9=x.morphAttributes;if(R9.position!==void 0||R9.normal!==void 0||R9.color!==void 0)d0.update(b,x,p8);if(O9||O0.receiveShadow!==b.receiveShadow)O0.receiveShadow=b.receiveShadow,a0.setValue(j,"receiveShadow",b.receiveShadow);if((f.isMeshStandardMaterial||f.isMeshLambertMaterial||f.isMeshPhongMaterial)&&f.envMap===null&&v.environment!==null)U8.envMapIntensity.value=v.environmentIntensity;if(U8.dfgLUT!==void 0)U8.dfgLUT.value=z5();if(O9){if(a0.setValue(j,"toneMappingExposure",B.toneMappingExposure),O0.needsLights)$K(U8,r9);if(N0&&f.fog===!0)E0.refreshFogUniforms(U8,N0);if(E0.refreshMaterialUniforms(U8,f,F0,Z0,_.state.transmissionRenderTarget[k.id]),O0.needsLights&&O0.lightProbeGrid){let J8=O0.lightProbeGrid;U8.probesSH.value=J8.texture,U8.probesMin.value.copy(J8.boundingBox.min),U8.probesMax.value.copy(J8.boundingBox.max),U8.probesResolution.value.copy(J8.resolution)}c7.upload(j,_$(O0),U8,g)}if(f.isShaderMaterial&&f.uniformsNeedUpdate===!0)c7.upload(j,_$(O0),U8,g),f.uniformsNeedUpdate=!1;if(f.isSpriteMaterial)a0.setValue(j,"center",b.center);if(a0.setValue(j,"modelViewMatrix",b.modelViewMatrix),a0.setValue(j,"normalMatrix",b.normalMatrix),a0.setValue(j,"modelMatrix",b.matrixWorld),f.uniformsGroups!==void 0){let J8=f.uniformsGroups;for(let k9=0,t9=J8.length;k9<t9;k9++){let C$=J8[k9];q0.update(C$,p8),q0.bind(C$,p8)}}return p8}function $K(k,v){k.ambientLightColor.needsUpdate=v,k.lightProbe.needsUpdate=v,k.directionalLights.needsUpdate=v,k.directionalLightShadows.needsUpdate=v,k.pointLights.needsUpdate=v,k.pointLightShadows.needsUpdate=v,k.spotLights.needsUpdate=v,k.spotLightShadows.needsUpdate=v,k.rectAreaLights.needsUpdate=v,k.hemisphereLights.needsUpdate=v}function ZK(k){return k.isMeshLambertMaterial||k.isMeshToonMaterial||k.isMeshPhongMaterial||k.isMeshStandardMaterial||k.isShadowMaterial||k.isShaderMaterial&&k.lights===!0}if(this.getActiveCubeFace=function(){return n},this.getActiveMipmapLevel=function(){return u},this.getRenderTarget=function(){return h},this.setRenderTargetTextures=function(k,v,x){let f=T.get(k);if(f.__autoAllocateDepthBuffer=k.resolveDepthBuffer===!1,f.__autoAllocateDepthBuffer===!1)f.__useRenderToTexture=!1;T.get(k.texture).__webglTexture=v,T.get(k.depthTexture).__webglTexture=f.__autoAllocateDepthBuffer?void 0:x,f.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(k,v){let x=T.get(k);x.__webglFramebuffer=v,x.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(k,v=0,x=0){h=k,n=v,u=x;let f=null,b=!1,N0=!1;if(k){let G0=T.get(k);if(G0.__useDefaultFramebuffer!==void 0){L.bindFramebuffer(j.FRAMEBUFFER,G0.__webglFramebuffer),H0.copy(k.viewport),M0.copy(k.scissor),k0=k.scissorTest,L.viewport(H0),L.scissor(M0),L.setScissorTest(k0),t=-1;return}else if(G0.__webglFramebuffer===void 0)g.setupRenderTarget(k);else if(G0.__hasExternalTextures)g.rebindTextures(k,T.get(k.texture).__webglTexture,T.get(k.depthTexture).__webglTexture);else if(k.depthBuffer){let S0=k.depthTexture;if(G0.__boundDepthTexture!==S0){if(S0!==null&&T.has(S0)&&(k.width!==S0.image.width||k.height!==S0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");g.setupDepthRenderbuffer(k)}}let L0=k.texture;if(L0.isData3DTexture||L0.isDataArrayTexture||L0.isCompressedArrayTexture)N0=!0;let B0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget){if(Array.isArray(B0[v]))f=B0[v][x];else f=B0[v];b=!0}else if(k.samples>0&&g.useMultisampledRTT(k)===!1)f=T.get(k).__webglMultisampledFramebuffer;else if(Array.isArray(B0))f=B0[x];else f=B0;H0.copy(k.viewport),M0.copy(k.scissor),k0=k.scissorTest}else H0.copy(p0).multiplyScalar(F0).floor(),M0.copy(y0).multiplyScalar(F0).floor(),k0=f0;if(x!==0)f=m;if(L.bindFramebuffer(j.FRAMEBUFFER,f))L.drawBuffers(k,f);if(L.viewport(H0),L.scissor(M0),L.setScissorTest(k0),b){let G0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+v,G0.__webglTexture,x)}else if(N0){let G0=v;for(let L0=0;L0<k.textures.length;L0++){let B0=T.get(k.textures[L0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+L0,B0.__webglTexture,x,G0)}}else if(k!==null&&x!==0){let G0=T.get(k.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,G0.__webglTexture,x)}t=-1},this.readRenderTargetPixels=function(k,v,x,f,b,N0,R0,G0=0){if(!(k&&k.isWebGLRenderTarget)){w0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let L0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)L0=L0[R0];if(L0){L.bindFramebuffer(j.FRAMEBUFFER,L0);try{let B0=k.textures[G0],S0=B0.format,v0=B0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+G0);if(!$8.textureFormatReadable(S0)){w0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!$8.textureTypeReadable(v0)){w0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(v>=0&&v<=k.width-f&&(x>=0&&x<=k.height-b))j.readPixels(v,x,f,b,c.convert(S0),c.convert(v0),N0)}finally{let B0=h!==null?T.get(h).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,B0)}}},this.readRenderTargetPixelsAsync=async function(k,v,x,f,b,N0,R0,G0=0){if(!(k&&k.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let L0=T.get(k).__webglFramebuffer;if(k.isWebGLCubeRenderTarget&&R0!==void 0)L0=L0[R0];if(L0)if(v>=0&&v<=k.width-f&&(x>=0&&x<=k.height-b)){L.bindFramebuffer(j.FRAMEBUFFER,L0);let B0=k.textures[G0],S0=B0.format,v0=B0.type;if(k.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+G0);if(!$8.textureFormatReadable(S0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!$8.textureTypeReadable(v0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let z0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,z0),j.bufferData(j.PIXEL_PACK_BUFFER,N0.byteLength,j.STREAM_READ),j.readPixels(v,x,f,b,c.convert(S0),c.convert(v0),0);let s0=h!==null?T.get(h).__webglFramebuffer:null;L.bindFramebuffer(j.FRAMEBUFFER,s0);let X8=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await oZ(j,X8,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,z0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,N0),j.deleteBuffer(z0),j.deleteSync(X8),N0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(k,v=null,x=0){let f=Math.pow(2,-x),b=Math.floor(k.image.width*f),N0=Math.floor(k.image.height*f),R0=v!==null?v.x:0,G0=v!==null?v.y:0;g.setTexture2D(k,0),j.copyTexSubImage2D(j.TEXTURE_2D,x,0,0,R0,G0,b,N0),L.unbindTexture()},this.copyTextureToTexture=function(k,v,x=null,f=null,b=0,N0=0){let R0,G0,L0,B0,S0,v0,z0,s0,X8,Y8=k.isCompressedTexture?k.mipmaps[N0]:k.image;if(x!==null)R0=x.max.x-x.min.x,G0=x.max.y-x.min.y,L0=x.isBox3?x.max.z-x.min.z:1,B0=x.min.x,S0=x.min.y,v0=x.isBox3?x.min.z:0;else{let U8=Math.pow(2,-b);if(R0=Math.floor(Y8.width*U8),G0=Math.floor(Y8.height*U8),k.isDataArrayTexture)L0=Y8.depth;else if(k.isData3DTexture)L0=Math.floor(Y8.depth*U8);else L0=1;B0=0,S0=0,v0=0}if(f!==null)z0=f.x,s0=f.y,X8=f.z;else z0=0,s0=0,X8=0;let o0=c.convert(v.format),L8=c.convert(v.type),O0;if(v.isData3DTexture)g.setTexture3D(v,0),O0=j.TEXTURE_3D;else if(v.isDataArrayTexture||v.isCompressedArrayTexture)g.setTexture2DArray(v,0),O0=j.TEXTURE_2D_ARRAY;else g.setTexture2D(v,0),O0=j.TEXTURE_2D;L.activeTexture(j.TEXTURE0),L.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,v.flipY),L.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),L.pixelStorei(j.UNPACK_ALIGNMENT,v.unpackAlignment);let S8=L.getParameter(j.UNPACK_ROW_LENGTH),l0=L.getParameter(j.UNPACK_IMAGE_HEIGHT),p8=L.getParameter(j.UNPACK_SKIP_PIXELS),a8=L.getParameter(j.UNPACK_SKIP_ROWS),O9=L.getParameter(j.UNPACK_SKIP_IMAGES);L.pixelStorei(j.UNPACK_ROW_LENGTH,Y8.width),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Y8.height),L.pixelStorei(j.UNPACK_SKIP_PIXELS,B0),L.pixelStorei(j.UNPACK_SKIP_ROWS,S0),L.pixelStorei(j.UNPACK_SKIP_IMAGES,v0);let r9=k.isDataArrayTexture||k.isData3DTexture,a0=v.isDataArrayTexture||v.isData3DTexture;if(k.isDepthTexture){let U8=T.get(k),R9=T.get(v),J8=T.get(U8.__renderTarget),k9=T.get(R9.__renderTarget);L.bindFramebuffer(j.READ_FRAMEBUFFER,J8.__webglFramebuffer),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,k9.__webglFramebuffer);for(let t9=0;t9<L0;t9++){if(r9)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(k).__webglTexture,b,v0+t9),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(v).__webglTexture,N0,X8+t9);j.blitFramebuffer(B0,S0,R0,G0,z0,s0,R0,G0,j.DEPTH_BUFFER_BIT,j.NEAREST)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(b!==0||k.isRenderTargetTexture||T.has(k)){let U8=T.get(k),R9=T.get(v);L.bindFramebuffer(j.READ_FRAMEBUFFER,o),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,p);for(let J8=0;J8<L0;J8++){if(r9)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,U8.__webglTexture,b,v0+J8);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,U8.__webglTexture,b);if(a0)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,R9.__webglTexture,N0,X8+J8);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,R9.__webglTexture,N0);if(b!==0)j.blitFramebuffer(B0,S0,R0,G0,z0,s0,R0,G0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(a0)j.copyTexSubImage3D(O0,N0,z0,s0,X8+J8,B0,S0,R0,G0);else j.copyTexSubImage2D(O0,N0,z0,s0,B0,S0,R0,G0)}L.bindFramebuffer(j.READ_FRAMEBUFFER,null),L.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(a0)if(k.isDataTexture||k.isData3DTexture)j.texSubImage3D(O0,N0,z0,s0,X8,R0,G0,L0,o0,L8,Y8.data);else if(v.isCompressedArrayTexture)j.compressedTexSubImage3D(O0,N0,z0,s0,X8,R0,G0,L0,o0,Y8.data);else j.texSubImage3D(O0,N0,z0,s0,X8,R0,G0,L0,o0,L8,Y8);else if(k.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,N0,z0,s0,R0,G0,o0,L8,Y8.data);else if(k.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,N0,z0,s0,Y8.width,Y8.height,o0,Y8.data);else j.texSubImage2D(j.TEXTURE_2D,N0,z0,s0,R0,G0,o0,L8,Y8);if(L.pixelStorei(j.UNPACK_ROW_LENGTH,S8),L.pixelStorei(j.UNPACK_IMAGE_HEIGHT,l0),L.pixelStorei(j.UNPACK_SKIP_PIXELS,p8),L.pixelStorei(j.UNPACK_SKIP_ROWS,a8),L.pixelStorei(j.UNPACK_SKIP_IMAGES,O9),N0===0&&v.generateMipmaps)j.generateMipmap(O0);L.unbindTexture()},this.initRenderTarget=function(k){if(T.get(k).__webglFramebuffer===void 0)g.setupRenderTarget(k)},this.initTexture=function(k){if(k.isCubeTexture)g.setTextureCube(k,0);else if(k.isData3DTexture)g.setTexture3D(k,0);else if(k.isDataArrayTexture||k.isCompressedArrayTexture)g.setTexture2DArray(k,0);else g.setTexture2D(k,0);L.unbindTexture()},this.resetState=function(){n=0,u=0,h=null,L.reset(),W0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return PQ}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=h0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=h0._getUnpackColorSpace()}}var D$=`
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;var hW=`
varying vec2 vUv;
uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
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
 gl_FragColor=vec4(rgb/max(body+corona+air+limb+echo+hover,.001),alpha);
}`,xW=`
attribute vec2 center;
attribute vec3 tint;
attribute vec4 nodeState;
attribute float order;
varying vec2 vUv;varying vec3 vTint;varying vec4 vState;varying float vOrder;
void main(){vUv=uv;vTint=tint;vState=nodeState;vOrder=order;
gl_Position=projectionMatrix*modelViewMatrix*vec4(position.xy*132.+center,1.,1.);}`,gW=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

varying vec2 vUv;varying vec3 vTint;varying vec4 vState;varying float vOrder;
void main(){
 vec2 p=(vUv-.5)*2.;float r=length(p),a=atan(p.y,p.x);if(r>.99)discard;
 float disk=1.-smoothstep(.582,.598,r),rim=ring(r,.592,.004);
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
 gl_FragColor=vec4(rgb/max(alpha,.001),alpha*reveal(.23+vOrder*.04,.12));
 #include <colorspace_fragment>
}`,pW=`
uniform float uScale;
attribute vec2 source;attribute vec2 target;attribute vec3 tint;attribute vec4 edgeMeta;
varying vec2 vUv;varying vec3 vTint;varying vec4 vMeta;
void main(){
 vUv=uv;vTint=tint;vMeta=edgeMeta;
 float t=uv.x,q=1.-t,b=mix(.13,.06,edgeMeta.x);
 vec2 d=target-source,n=vec2(-d.y,d.x);
 vec2 c1=source+d*.34+n*b,c2=source+d*.72+n*b*.5;
 vec2 point=q*q*q*source+3.*q*q*t*c1+3.*q*t*t*c2+t*t*t*target;
 vec2 tangent=3.*q*q*(c1-source)+6.*q*t*(c2-c1)+3.*t*t*(target-c2);
 vec2 normal=vec2(-tangent.y,tangent.x)/max(length(tangent),.001);
 // Flipping world Y below also flips winding: invert the ribbon normal to keep its front face.
 point-=normal*(uv.y-.5)*5.5/max(uScale,.001);
 gl_Position=projectionMatrix*modelViewMatrix*vec4(point.x,-point.y,0.,1.);
}`,mW=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

uniform float uSelected;uniform float uHovered;uniform float uDragged;
uniform float uSelectedLeaf;uniform float uHoveredLeaf;
uniform float uReconnect;
varying vec2 vUv;varying vec3 vTint;varying vec4 vMeta;
void main(){
 float group=vMeta.y,leaf=vMeta.w;
 float selected=1.-step(.1,abs(group-uSelected));
 float exact=(1.-step(.1,abs(leaf-uSelectedLeaf)))*vMeta.x;
 float hover=max(1.-step(.1,abs(group-uHovered)),(1.-step(.1,abs(leaf-uHoveredLeaf)))*vMeta.x);
 float drag=1.-step(.1,abs(group-uDragged));
 float dim=mix(1.,.26,step(0.,uSelected)*(1.-selected));
 float cross=abs(vUv.y-.5)*2.;
 float line=1.-smoothstep(.08,.40+selected*.13,cross);
 float phase=fract(uTime*(.075+vMeta.x*.045)-vMeta.z);
 float head=exp(-pow((vUv.x-phase)*24.,2.));
 float tail=exp(-pow((vUv.x-phase+.04)*12.,2.))*.35;
 float energy=(head+tail)*uMotion*(1.-drag*.75);
 float start=mix(.12+group*.04,.50+group*.03,vMeta.x);
 float growth=reveal(start,.18);
 float revealed=1.-smoothstep(growth-.03,growth+.01,vUv.x);
 if(uFormation>=.999)revealed=1.;
 float alpha=((.17+selected*.22+exact*.20+hover*.12+uReconnect*.12)*line+energy*.55*(1.-smoothstep(.05,.9,cross)))*dim*revealed;
 gl_FragColor=vec4(mix(vTint,vec3(.93,.92,.85),head*.3+exact*.15),alpha);
 #include <colorspace_fragment>
}`,lW=`
uniform float uDpr;
attribute vec3 tint;attribute vec4 leafMeta;
varying vec3 vTint;varying vec4 vMeta;
void main(){vTint=tint;vMeta=leafMeta;gl_PointSize=15.*uDpr;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,dW=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

uniform float uSelected;uniform float uSelectedLeaf;uniform float uHoveredLeaf;
varying vec3 vTint;varying vec4 vMeta;
void main(){
 float r=length((gl_PointCoord-.5)*2.);if(r>.99)discard;
 float chosen=1.-step(.1,abs(vMeta.z-uSelectedLeaf));
 float hover=1.-step(.1,abs(vMeta.z-uHoveredLeaf));
 float member=1.-step(.1,abs(vMeta.x-uSelected));
 float dim=mix(1.,.28,step(0.,uSelected)*(1.-member));
 float beat=.5+.5*sin(uTime*.7-vMeta.y-vMeta.x);
 float dot=1.-smoothstep(.22,.4+chosen*.08+hover*.06,r);
 float halo=exp(-r*5.)*(.17+beat*.13+chosen*.2);
 float orbit=ring(r,.73,.035)*(chosen*.65+hover*.35);
 float arrival=mix(smoothstep(0.,.32,uClock-vMeta.w),1.,1.-uMotion);
 float alpha=(dot*.85+halo+orbit)*dim*reveal(.63+vMeta.x*.03+vMeta.y*.008,.12)*arrival;
 gl_FragColor=vec4(mix(vTint,vec3(.96,.96,.92),chosen*.6),alpha);
 #include <colorspace_fragment>
}`,uW=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
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
}`,cW=`
uniform float uDpr;
attribute float seed;
varying float vSeed;
void main(){vSeed=seed;gl_PointSize=(1.0+step(.93,seed)*.6)*uDpr;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,nW=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

varying float vSeed;
void main(){float r=length(gl_PointCoord-.5)*2.;float alpha=(1.-smoothstep(.15,1.,r))*(.12+vSeed*.13+sin(uTime*.23+vSeed*45.)*.035);
gl_FragColor=vec4(vec3(.81,.81,.76),alpha*reveal(0.,.7));}`,sW=`
attribute float along;attribute float order;
varying float vAlong;varying float vOrder;
void main(){vAlong=along;vOrder=order;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,iW=`

uniform float uTime;
uniform float uClock;
uniform float uFormation;
uniform float uMotion;
uniform float uEconomy;
float reveal(float start,float duration){return smoothstep(start,start+duration,uFormation);}
float ring(float r,float radius,float width){return 1.-smoothstep(width,width+fwidth(r),abs(r-radius));}

varying float vAlong;varying float vOrder;
void main(){float glint=pow(.5+.5*cos(vAlong*6.283-uTime*.09-vOrder*2.),18.);
gl_FragColor=vec4(vec3(.57,.57,.51),(.036+glint*.06)*reveal(.05,.6));}`;var oW=(J)=>Math.min(1,Math.max(0,J)),_5=(J,Q,$)=>{let Z=oW(($-J)/(Q-J));return Z*Z*(3-2*Z)};function JJ(J,Q,$=0,Z=0){let W=Q==="sun"?0:Q==="collection"?0.23+$*0.04:0.63+$*0.03+Z*0.008;return _5(W,W+(Q==="sun"?0.2:0.12),J)}class O${constructor(){this.progress=1,this.playing=!1,this.duration=4200,this.rate=1}set({progress:J,playing:Q,duration:$,rate:Z}={}){if(Number.isFinite(J))this.progress=oW(J);if(Number.isFinite($))this.duration=Math.max(500,Math.min(60000,$));if(Number.isFinite(Z))this.rate=Math.max(0.25,Math.min(4,Z));if(typeof Q==="boolean")this.playing=Q&&this.progress<1;if(this.progress===1)this.playing=!1;return this.snapshot()}advance(J){if(this.playing)this.set({progress:this.progress+Math.max(0,J)*this.rate/this.duration});return this.progress}snapshot(){let J=this.progress;return{progress:J,playing:this.playing,duration:this.duration,rate:this.rate,phase:J<0.23?"sun":J<0.63?"collections":J<1?"skills":"complete",visualOnly:!0}}}class QJ{constructor(J=360){this.values=new Float32Array(J),this.clear()}clear(){this.count=0,this.cursor=0}add(J){this.values[this.cursor]=J,this.cursor=(this.cursor+1)%this.values.length,this.count=Math.min(this.count+1,this.values.length)}percentile(J){if(!this.count)return null;let Q=this.values.slice(0,this.count).sort();return Math.round(Q[Math.floor((this.count-1)*J)]*100)/100}}function R$(J,Q){return Math.min(Math.max(1,J||1),Q?1:1.5)}class k${constructor(){this.reset()}reset(){this.frames=0,this.slow=0,this.degraded=!1}observe(J,Q){if(this.degraded)return!1;if(this.frames++,J>52||Q>10)this.slow++;if(this.frames<90)return!1;let $=this.slow>18;return this.frames=0,this.slow=0,this.degraded=$,$}}var C8=(J)=>({value:J}),$J=(J)=>{let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)},z7=(J,Q,$,Z=!0)=>{for(let[W,K]of Object.entries(Q)){let H=Z?l6:N8;J.setAttribute(W,new H(new Float32Array($*K),K).setUsage(CQ))}},Z9=(J,Q,...$)=>{let Z=!1;for(let W=0;W<$.length;W++){let K=Q*J.itemSize+W,H=Math.fround($[W]);if(J.array[K]!==H)J.array[K]=H,Z=!0}if(Z)J.needsUpdate=!0;return Z};function aW(J=1){let Q=new T9(1,1,J,1),$=new o6;return $.index=Q.index,$.setAttribute("position",Q.attributes.position),$.setAttribute("uv",Q.attributes.uv),$.instanceCount=0,$}class rW{constructor(J){this.host=J,this.scene=new x6,this.camera=new L7(-500,500,350,-350,0.1,100),this.camera.position.z=10,this.active=!0,this.quality="balanced",this.pending=0,this.timeout=0,this.time=0,this.clock=0,this.last=0,this.renderCount=0,this.dirty=!0,this.paused=!1,this.reduced=!1,this.frameSamples=new QJ,this.costSamples=new QJ,this.governor=new k$,this.timeline=new O$,this.nodeRows=new Map,this.leafRows=new Map,this.leafBirths=new Map,this.colors=[],this.nodeCapacity=8,this.edgeCapacity=128,this.leafCapacity=128,this.nodeTargets=new Float32Array(this.nodeCapacity*4),this.receipts=new Set,this.receiptAt=-100,this.transitioning=!1,this.u={uTime:C8(0),uClock:C8(0),uFormation:C8(1),uMotion:C8(1),uEconomy:C8(0),uScale:C8(1),uDpr:C8(R$(devicePixelRatio,!1)),uSelected:C8(-2),uSelectedLeaf:C8(-2),uHovered:C8(-2),uHoveredLeaf:C8(-2),uDragged:C8(-2),uReceipt:C8(-1),uHoverCore:C8(0),uReconnect:C8(0)};let Q=document.createElement("canvas");Q.className="universe-webgl",Q.setAttribute("aria-hidden","true"),J.prepend(Q),this.canvas=Q;try{this.renderer=new F$({canvas:Q,alpha:!0,antialias:!1,powerPreference:"low-power",depth:!1,stencil:!1})}catch($){throw Q.remove(),this.active=!1,$}this.renderer.outputColorSpace=v6,this.renderer.setPixelRatio(this.u.uDpr.value),this.renderer.setClearColor(0,0),this.renderer.sortObjects=!1,this.renderer.debug.onShaderError=($,Z,W,K)=>{this.error=[$.getProgramInfoLog(Z),$.getShaderInfoLog(W),$.getShaderInfoLog(K)].filter(Boolean).join(`
`),this.failed=!0,this.cancel(),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback"),this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0)};try{this.setup()}catch($){throw this.dispose(),$}this.onLost=($)=>{$.preventDefault(),this.contextLost=!0,this.cancel(),this.last=0,this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback")},this.onRestored=()=>{if(!this.active)return;this.contextLost=!1,this.failed=!1,this.error=null,this.last=0,this.reconnectAt=this.clock,this.dirty=!0,this.host.classList.add("three-enabled"),this.host.classList.remove("svg-fallback"),this.schedule()},this.onVisibility=()=>{if(this.last=0,this.cancel(),!document.hidden)this.dirty=!0,this.schedule()},Q.addEventListener("webglcontextlost",this.onLost),Q.addEventListener("webglcontextrestored",this.onRestored),document.addEventListener("visibilitychange",this.onVisibility),J.classList.add("three-enabled")}material(J,Q){return new T8({vertexShader:J,fragmentShader:Q,uniforms:this.u,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1})}mesh(J,Q,$,Z=h8){let W=new Z(J,this.material(Q,$));return W.frustumCulled=!1,this.scene.add(W),W}setup(){let J=new Uint8Array(16384);for(let X=0;X<J.length;X++)J[X]=Math.floor($J(X+11)*255);this.noiseTexture=new p7(J,128,128,A6,b8),this.noiseTexture.minFilter=this.noiseTexture.magFilter=_8,this.noiseTexture.wrapS=this.noiseTexture.wrapT=z6,this.noiseTexture.needsUpdate=!0,this.u.uNoise=C8(this.noiseTexture),this.plane=new T9(1,1),this.galaxy=this.mesh(this.plane,D$,uW),this.galaxy.scale.set(1120,730,1);let Q=new M8,$=[],Z=[];for(let X=0;X<78;X++)$.push(($J(X+2)-0.5)*1080,($J(X+901)-0.5)*720,-1),Z.push($J(X+31));Q.setAttribute("position",new N8(new Float32Array($),3)),Q.setAttribute("seed",new N8(new Float32Array(Z),1)),this.stars=this.mesh(Q,cW,nW,m7);let W=new M8,K=[],H=[],Y=[];[[185,95],[288,156],[395,233]].forEach(([X,U],N)=>{for(let E=0;E<160;E++)for(let G of[E,E+1]){let D=G/160*Math.PI*2,M=Math.cos(D)*X,z=Math.sin(D)*U;K.push(M*0.906-z*0.423,M*0.423+z*0.906,-0.5),H.push(G/160),Y.push(N)}}),W.setAttribute("position",new N8(new Float32Array(K),3)),W.setAttribute("along",new N8(new Float32Array(H),1)),W.setAttribute("order",new N8(new Float32Array(Y),1)),this.orbits=this.mesh(W,sW,iW,u6),this.edgeGeometry=aW(24),z7(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4},this.edgeCapacity),this.edges=this.mesh(this.edgeGeometry,pW,mW),this.leafGeometry=new M8,z7(this.leafGeometry,{position:3,tint:3,leafMeta:4},this.leafCapacity,!1),this.leafGeometry.setDrawRange(0,0),this.leafPoints=this.mesh(this.leafGeometry,lW,dW,m7),this.nodeGeometry=aW(),z7(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodes=this.mesh(this.nodeGeometry,xW,gW),this.sun=this.mesh(this.plane,D$,hW),this.sun.scale.set(330,330,1)}unavailable(){return!this.active||this.contextLost||this.failed||!this.model||document.hidden||window.oracleWindowVisible===!1||this.model.data?.hidden||!this.width||!this.height}sync(J){if(!this.active)return;this.model=J;let Q=!1,$=Math.round(J.width),Z=Math.round(J.height);if(!$||!Z)return;if($!==this.width||Z!==this.height)this.width=$,this.height=Z,this.renderer.setSize($,Z,!1),Q=!0;let{x:W,y:K,k:H}=J.camera;if(Q||W!==this.cameraX||K!==this.cameraY||H!==this.cameraK)this.cameraX=W,this.cameraY=K,this.cameraK=H,this.camera.left=-W/H,this.camera.right=($-W)/H,this.camera.top=K/H,this.camera.bottom=(K-Z)/H,this.camera.updateProjectionMatrix(),this.u.uScale.value=H,Q=!0;let Y=!!J.reduced||!!this.systemReduced;if(Y!==this.reduced){if(this.reduced=Y,Q=!0,this.last=0,Y)this.setFormation({progress:1,playing:!1})}let X=!!J.data?.economy;if(this.manualEconomy!==X)this.manualEconomy=X,this.governor.reset();Q=this.setQuality(X||this.governor.degraded?"economy":"balanced")||Q,Q=this.syncGeometry(J)||Q;let U=(G)=>J.nodes.get(G)?.index??-2,N=J.hovered||J.keyboardFocus||{},E={uSelected:U(J.selected),uSelectedLeaf:this.leafRows.get(J.selectedLeaf)??-2,uHovered:U(N.category),uHoveredLeaf:this.leafRows.get(N.skill)??-2,uDragged:U(J.drag?.category||J.drag?.node?.parent),uHoverCore:N.core?1:0};for(let[G,D]of Object.entries(E))if(this.u[G].value!==D)this.u[G].value=D,Q=!0;for(let G of J.nodes.values()){let D=this.nodeRows.get(G.id),M=G.id===J.selected?1:0,z=G.id===N.category||J.leaves.get(N.skill)?.parent===G.id?1:0,F=J.drag?.node?.id===G.id?1:0,q=[M,z,F,J.selected&&!M?1:0];for(let A=0;A<4;A++)if(this.nodeTargets[D*4+A]!==q[A])this.nodeTargets[D*4+A]=q[A],this.transitioning=!0,Q=!0}if(this.paused=!!J.paused,!this.started)this.started=!0,this.setFormation({progress:this.reduced?1:0,playing:!this.reduced});if(J.data?.formation&&J.data.formation!==this.lastFormationInput)this.lastFormationInput=J.data.formation,this.setFormation(J.data.formation);if(this.dirty||=Q,Q&&this.timeout)clearTimeout(this.timeout),this.timeout=0;if(this.unavailable())this.cancel(),this.last=0;else this.schedule()}syncGeometry(J){let Q=!1;if(J.nodes.size>this.nodeCapacity)this.nodeCapacity=Math.max(J.nodes.size,this.nodeCapacity*2),this.nodeGeometry.dispose(),z7(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodeTargets=new Float32Array(this.nodeCapacity*4),Q=!0;let $=J.nodes.size+J.leaves.size;if($>this.edgeCapacity)this.edgeCapacity=$*2,this.edgeGeometry.dispose(),z7(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4},this.edgeCapacity),Q=!0;if(J.leaves.size>this.leafCapacity)this.leafCapacity=J.leaves.size*2,this.leafGeometry.dispose(),z7(this.leafGeometry,{position:3,tint:3,leafMeta:4},this.leafCapacity,!1),Q=!0;let Z=this.nodeGeometry.attributes,W=this.edgeGeometry.attributes,K=this.leafGeometry.attributes;this.nodeRows.clear(),this.leafRows.clear();let H=0,Y=0,X=(N,E,G,D,M,z,F,q,A)=>{Q=Z9(W.source,Y,N,E)||Q,Q=Z9(W.target,Y,G,D)||Q,Q=Z9(W.tint,Y,M.r,M.g,M.b)||Q,Q=Z9(W.edgeMeta,Y,z,F,q,A)||Q,Y++};for(let N of J.nodes.values()){this.nodeRows.set(N.id,H);let E=this.colors[N.index]||=new x0(J.palette[N.index]);Q=Z9(Z.center,H,N.x,-N.y)||Q,Q=Z9(Z.tint,H,E.r,E.g,E.b)||Q,Q=Z9(Z.order,H,N.index)||Q,X(0,0,N.x,N.y,E,0,N.index,N.index*0.137,-3),H++}let U=0;for(let N of J.leaves.values()){let E=J.nodes.get(N.parent);if(!E)continue;let G=this.colors[E.index];if(this.leafRows.set(N.id,U),!this.leafBirths.has(N.id))this.leafBirths.set(N.id,this.clock),this.arrivalUntil=this.clock+0.34;Q=Z9(K.position,U,N.x,-N.y,1)||Q,Q=Z9(K.tint,U,G.r,G.g,G.b)||Q,Q=Z9(K.leafMeta,U,E.index,N.index,U,this.leafBirths.get(N.id))||Q,X(E.x,E.y,N.x,N.y,G,1,E.index,E.index*0.137+N.index*0.21,U),U++}if(this.nodeGeometry.instanceCount!==H||this.edgeGeometry.instanceCount!==Y||this.leafGeometry.drawRange.count!==U)Q=!0;this.nodeGeometry.instanceCount=H,this.edgeGeometry.instanceCount=Y,this.leafGeometry.setDrawRange(0,U);for(let N of this.leafBirths.keys())if(!J.leaves.has(N))this.leafBirths.delete(N);return Q}setQuality(J){let Q=R$(devicePixelRatio,J==="economy");if(J===this.quality&&Q===this.u.uDpr.value)return!1;if(this.quality=J,this.u.uEconomy.value=J==="economy"?1:0,this.u.uDpr.value=Q,this.renderer.setPixelRatio(Q),this.width)this.renderer.setSize(this.width,this.height,!1);return this.dirty=!0,!0}setPaused(J){if(!this.active)return;this.paused=!!J,this.cancel(),this.last=0,this.schedule()}setFormation(J){if(!this.active)return this.timeline.snapshot();let Q=this.timeline.set(this.reduced||this.failed||this.contextLost?{...J,progress:1,playing:!1}:J);if(this.u.uFormation.value=Q.progress,this.dirty=!0,this.timeout)clearTimeout(this.timeout),this.timeout=0;return this.applyFormation(!0),this.schedule(),Q}getFormation(){return this.timeline.snapshot()}applyFormation(J=!1){if(!this.model)return;let Q=this.timeline.progress;if(Q!==this.lastLabelProgress||J){for(let $ of this.model.nodes.values())$.g.style.opacity=Q===1?"":String(JJ(Q,"collection",$.index));for(let $ of this.model.leaves.values())$.g.style.opacity=Q===1?"":String(JJ(Q,"skill",this.model.nodes.get($.parent)?.index??0,$.index));this.host.querySelector(".oracle-core").style.opacity=Q===1?"":String(JJ(Q,"sun")),this.lastLabelProgress=Q}if(J||Q===1&&this.lastNotifiedProgress!==1||this.clock-(this.lastNotifyAt||0)>0.2)this.lastNotifyAt=this.clock,this.lastNotifiedProgress=Q,this.host.dispatchEvent(new CustomEvent("oracle:formation",{detail:this.getFormation()}))}signalReceipt(J){if(!this.active||this.model?.data?.replay||J?.source!=="codex-hook"||!J.event_id)return!1;let Q=Date.now()-Date.parse(J.received_at);if(!Number.isFinite(Q)||Q<0||Q>8000||this.receipts.has(J.event_id))return!1;if(this.receipts.add(J.event_id),this.receipts.size>64)this.receipts.delete(this.receipts.values().next().value);return this.receiptAt=this.clock,this.dirty=!0,this.schedule(),!0}cancel(){cancelAnimationFrame(this.pending),clearTimeout(this.timeout),this.pending=0,this.timeout=0}schedule(){if(this.unavailable()||this.pending||this.timeout)return;let J=(this.transitioning||this.clock<(this.arrivalUntil||0))&&!this.reduced,Q=!this.paused&&!this.reduced;if(!this.dirty&&!Q&&!J)return;let $=()=>{this.timeout=0,this.pending=requestAnimationFrame((Z)=>{this.pending=0,this.render(Z),this.schedule()})};if(this.dirty||J)$();else{let Z=1000/(this.quality==="economy"?15:30);this.timeout=setTimeout($,Math.max(0,Z-(performance.now()-this.last)-4))}}render(J){if(this.unavailable())return;let Q=1000/(this.quality==="economy"?15:30);if(!this.dirty&&!this.transitioning&&this.clock>=(this.arrivalUntil||0)&&this.last&&J-this.last<Q-2)return;let $=performance.now(),Z=this.last?J-this.last:0,W=Math.min(Z||16.67,100);if(this.clock+=W/1000,!this.paused&&!this.reduced){if(this.time+=W/1000,Z)this.frameSamples.add(Z);if(this.timeline.playing)this.timeline.advance(W),this.u.uFormation.value=this.timeline.progress,this.applyFormation()}this.u.uTime.value=this.reduced?0:this.time,this.u.uClock.value=this.clock,this.u.uMotion.value=this.reduced?0:1;let K=(this.clock-this.receiptAt)/2.4;this.u.uReceipt.value=this.reduced||K>1?-1:K,this.u.uReconnect.value=this.reduced?0:Math.max(0,1-(this.clock-(this.reconnectAt??-100))/0.6);let H=this.nodeGeometry.attributes.nodeState,Y=this.reduced?1:1-Math.exp(-W/80);this.transitioning=!1;let X=!1;for(let N=0;N<this.nodeGeometry.instanceCount*4;N++){let E=this.nodeTargets[N]-H.array[N];if(Math.abs(E)>0.003)H.array[N]+=E*Y,this.transitioning=!0,X=!0;else if(H.array[N]!==this.nodeTargets[N])H.array[N]=this.nodeTargets[N],X=!0}if(X)H.needsUpdate=!0;this.renderer.render(this.scene,this.camera),this.renderCount++,this.last=J,this.dirty=!1;let U=performance.now()-$;if(this.costSamples.add(U),!this.paused&&!this.reduced&&!this.manualEconomy&&Z&&!this.model.drag&&!this.transitioning&&this.governor.observe(Z,U))this.setQuality("economy")}resetDiagnostics(){this.frameSamples.clear(),this.costSamples.clear()}diagnostics(){let J=this.renderer.info;return{renderer:"Three.js r185 · WebGL2 · instanced atlas",quality:this.quality,adaptiveEconomy:this.governor.degraded,buffer:[this.canvas.width,this.canvas.height],drawCalls:J.render.calls,triangles:J.render.triangles,geometries:J.memory.geometries,textures:J.memory.textures,renderCount:this.renderCount,samples:this.frameSamples.count,frameIntervalMedianMs:this.frameSamples.percentile(0.5),frameIntervalP95Ms:this.frameSamples.percentile(0.95),cpuSubmitMedianMs:this.costSamples.percentile(0.5),cpuSubmitP95Ms:this.costSamples.percentile(0.95),paused:this.paused||this.unavailable(),reduced:this.reduced,active:this.active,pendingFrames:Number(!!this.pending),pendingTimers:Number(!!this.timeout),formation:this.getFormation(),contextLost:!!this.contextLost,error:this.error||null,note:"CPU submission is not GPU time. Ambient cadence targets 30/15 Hz; input is scheduled separately. No telemetry is inferred from light."}}dispose(){if(!this.active)return;this.active=!1,this.cancel(),document.removeEventListener("visibilitychange",this.onVisibility),this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored);let J=new Set,Q=new Set;if(this.scene.traverse(($)=>{if($.geometry)J.add($.geometry);if($.material)Q.add($.material)}),J.forEach(($)=>$.dispose()),Q.forEach(($)=>$.dispose()),this.noiseTexture?.dispose(),this.renderer.dispose(),this.scene.clear(),this.nodeRows.clear(),this.leafRows.clear(),this.leafBirths.clear(),this.receipts.clear(),this.host.classList.remove("three-enabled"),this.model){for(let $ of this.model.nodes.values())$.g.style.opacity="";for(let $ of this.model.leaves.values())$.g.style.opacity=""}this.canvas.remove()}}window.OracleUniverse=rW;})();
