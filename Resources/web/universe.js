(()=>{var JH=Object.defineProperty;var S6=(J,Q)=>{for(var $ in Q)JH(J,$,{get:Q[$],enumerable:!0,configurable:!0,set:(W)=>Q[$]=()=>W})};var vW="185";var fW=0,sJ=1,yW=2;var g6=1,bW=2,V6=3,B6=0,w8=1,$9=2,W9=0,p6=1,iJ=2,oJ=3,aJ=4,hW=5;var z6=100,xW=101,gW=102,pW=103,mW=104,lW=200,dW=201,uW=202,cW=203,nW=204,sW=205,iW=206,oW=207,aW=208,rW=209,tW=210,eW=211,JZ=212,QZ=213,$Z=214,WZ=0,ZZ=1,KZ=2,rJ=3,HZ=4,YZ=5,XZ=6,UZ=7,GZ=0,NZ=1,EZ=2,a8=0,tJ=1,eJ=2,JQ=3,QQ=4,$Q=5,WQ=6,ZQ=7;var I6=301,l9=302,T7=303,S7=304,m6=306,j7=1000,v7=1001,qZ=1002,T9=1003,FZ=1004;var l6=1005;var _8=1006,f7=1007;var d9=1008;var h8=1009,DZ=1010,OZ=1011,d6=1012,KQ=1013,S9=1014,D9=1015,O9=1016,HQ=1017,YQ=1018,_6=1020,MZ=35902,RZ=35899,kZ=1021,LZ=1022,Z9=1023,u9=1026,c9=1027,y7=1028,XQ=1029,n9=1030,UQ=1031;var GQ=1033,b7=33776,h7=33777,x7=33778,g7=33779,NQ=35840,EQ=35841,qQ=35842,FQ=35843,DQ=36196,OQ=37492,MQ=37496,RQ=37488,kQ=37489,p7=37490,LQ=37491,VQ=37808,BQ=37809,zQ=37810,IQ=37811,_Q=37812,CQ=37813,AQ=37814,PQ=37815,wQ=37816,TQ=37817,SQ=37818,jQ=37819,vQ=37820,fQ=37821,yQ=36492,bQ=36494,hQ=36495,xQ=36283,gQ=36284,m7=36285,pQ=36286;var mQ=0,VZ=1,s9="",l7="srgb",lQ="srgb-linear",dQ="linear",e0="srgb";var BZ=512,zZ=513,IZ=514,d7=515,_Z=516,CZ=517,u7=518,AZ=519;var uQ=35048;var cQ="300 es",nQ=2000;function QH(J){for(let Q=J.length-1;Q>=0;--Q)if(J[Q]>=65535)return!0;return!1}function $H(J){return ArrayBuffer.isView(J)&&!(J instanceof DataView)}function x6(J){return document.createElementNS("http://www.w3.org/1999/xhtml",J)}function PZ(){let J=x6("canvas");return J.style.display="block",J}var UW={},L6=null;function sQ(...J){let Q="THREE."+J.shift();if(L6)L6("log",Q,...J);else console.log(Q,...J)}function wZ(J){let Q=J[0];if(typeof Q==="string"&&Q.startsWith("TSL:")){let $=J[1];if($&&$.isStackTrace)J[0]+=" "+$.getLocation();else J[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return J}function C0(...J){J=wZ(J);let Q="THREE."+J.shift();if(L6)L6("warn",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.warn($.getError(Q));else console.warn(Q,...J)}}function P0(...J){J=wZ(J);let Q="THREE."+J.shift();if(L6)L6("error",Q,...J);else{let $=J[0];if($&&$.isStackTrace)console.error($.getError(Q));else console.error(Q,...J)}}function m9(...J){let Q=J.join(" ");if(Q in UW)return;UW[Q]=!0,C0(...J)}function TZ(J,Q,$){return new Promise(function(W,Z){function K(){switch(J.clientWaitSync(Q,J.SYNC_FLUSH_COMMANDS_BIT,0)){case J.WAIT_FAILED:Z();break;case J.TIMEOUT_EXPIRED:setTimeout(K,$);break;default:W()}}setTimeout(K,$)})}var SZ={[0]:1,[2]:6,[4]:7,[3]:5,[1]:0,[6]:2,[7]:4,[5]:3};class M9{addEventListener(J,Q){if(this._listeners===void 0)this._listeners={};let $=this._listeners;if($[J]===void 0)$[J]=[];if($[J].indexOf(Q)===-1)$[J].push(Q)}hasEventListener(J,Q){let $=this._listeners;if($===void 0)return!1;return $[J]!==void 0&&$[J].indexOf(Q)!==-1}removeEventListener(J,Q){let $=this._listeners;if($===void 0)return;let W=$[J];if(W!==void 0){let Z=W.indexOf(Q);if(Z!==-1)W.splice(Z,1)}}dispatchEvent(J){let Q=this._listeners;if(Q===void 0)return;let $=Q[J.type];if($!==void 0){J.target=this;let W=$.slice(0);for(let Z=0,K=W.length;Z<K;Z++)W[Z].call(this,J);J.target=null}}}var V8=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];var BJ=Math.PI/180,A7=180/Math.PI;function u6(){let J=Math.random()*4294967295|0,Q=Math.random()*4294967295|0,$=Math.random()*4294967295|0,W=Math.random()*4294967295|0;return(V8[J&255]+V8[J>>8&255]+V8[J>>16&255]+V8[J>>24&255]+"-"+V8[Q&255]+V8[Q>>8&255]+"-"+V8[Q>>16&15|64]+V8[Q>>24&255]+"-"+V8[$&63|128]+V8[$>>8&255]+"-"+V8[$>>16&255]+V8[$>>24&255]+V8[W&255]+V8[W>>8&255]+V8[W>>16&255]+V8[W>>24&255]).toLowerCase()}function m0(J,Q,$){return Math.max(Q,Math.min($,J))}function WH(J,Q){return(J%Q+Q)%Q}function zJ(J,Q,$){return(1-$)*J+$*Q}function j6(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return J/4294967295;case Uint16Array:return J/65535;case Uint8Array:return J/255;case Int32Array:return Math.max(J/2147483647,-1);case Int16Array:return Math.max(J/32767,-1);case Int8Array:return Math.max(J/127,-1);default:throw Error("THREE.MathUtils: Invalid component type.")}}function P8(J,Q){switch(Q.constructor){case Float32Array:return J;case Uint32Array:return Math.round(J*4294967295);case Uint16Array:return Math.round(J*65535);case Uint8Array:return Math.round(J*255);case Int32Array:return Math.round(J*2147483647);case Int16Array:return Math.round(J*32767);case Int8Array:return Math.round(J*127);default:throw Error("THREE.MathUtils: Invalid component type.")}}class n0{static{n0.prototype.isVector2=!0}constructor(J=0,Q=0){this.x=J,this.y=Q}get width(){return this.x}set width(J){this.x=J}get height(){return this.y}set height(J){this.y=J}set(J,Q){return this.x=J,this.y=Q,this}setScalar(J){return this.x=J,this.y=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;default:throw Error("THREE.Vector2: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;default:throw Error("THREE.Vector2: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y)}copy(J){return this.x=J.x,this.y=J.y,this}add(J){return this.x+=J.x,this.y+=J.y,this}addScalar(J){return this.x+=J,this.y+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this}subScalar(J){return this.x-=J,this.y-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this}multiply(J){return this.x*=J.x,this.y*=J.y,this}multiplyScalar(J){return this.x*=J,this.y*=J,this}divide(J){return this.x/=J.x,this.y/=J.y,this}divideScalar(J){return this.multiplyScalar(1/J)}applyMatrix3(J){let Q=this.x,$=this.y,W=J.elements;return this.x=W[0]*Q+W[3]*$+W[6],this.y=W[1]*Q+W[4]*$+W[7],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this}clamp(J,Q){return this.x=m0(this.x,J.x,Q.x),this.y=m0(this.y,J.y,Q.y),this}clampScalar(J,Q){return this.x=m0(this.x,J,Q),this.y=m0(this.y,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(m0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(J){return this.x*J.x+this.y*J.y}cross(J){return this.x*J.y-this.y*J.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(m0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y;return Q*Q+$*$}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this}equals(J){return J.x===this.x&&J.y===this.y}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this}rotateAround(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=this.x-J.x,K=this.y-J.y;return this.x=Z*$-K*W+J.x,this.y=Z*W+K*$+J.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class R9{constructor(J=0,Q=0,$=0,W=1){this.isQuaternion=!0,this._x=J,this._y=Q,this._z=$,this._w=W}static slerpFlat(J,Q,$,W,Z,K,H){let Y=$[W+0],X=$[W+1],U=$[W+2],E=$[W+3],N=Z[K+0],G=Z[K+1],F=Z[K+2],O=Z[K+3];if(E!==O||Y!==N||X!==G||U!==F){let V=Y*N+X*G+U*F+E*O;if(V<0)N=-N,G=-G,F=-F,O=-O,V=-V;let D=1-H;if(V<0.9995){let q=Math.acos(V),_=Math.sin(q);D=Math.sin(D*q)/_,H=Math.sin(H*q)/_,Y=Y*D+N*H,X=X*D+G*H,U=U*D+F*H,E=E*D+O*H}else{Y=Y*D+N*H,X=X*D+G*H,U=U*D+F*H,E=E*D+O*H;let q=1/Math.sqrt(Y*Y+X*X+U*U+E*E);Y*=q,X*=q,U*=q,E*=q}}J[Q]=Y,J[Q+1]=X,J[Q+2]=U,J[Q+3]=E}static multiplyQuaternionsFlat(J,Q,$,W,Z,K){let H=$[W],Y=$[W+1],X=$[W+2],U=$[W+3],E=Z[K],N=Z[K+1],G=Z[K+2],F=Z[K+3];return J[Q]=H*F+U*E+Y*G-X*N,J[Q+1]=Y*F+U*N+X*E-H*G,J[Q+2]=X*F+U*G+H*N-Y*E,J[Q+3]=U*F-H*E-Y*N-X*G,J}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get w(){return this._w}set w(J){this._w=J,this._onChangeCallback()}set(J,Q,$,W){return this._x=J,this._y=Q,this._z=$,this._w=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(J){return this._x=J.x,this._y=J.y,this._z=J.z,this._w=J.w,this._onChangeCallback(),this}setFromEuler(J,Q=!0){let{_x:$,_y:W,_z:Z,_order:K}=J,H=Math.cos,Y=Math.sin,X=H($/2),U=H(W/2),E=H(Z/2),N=Y($/2),G=Y(W/2),F=Y(Z/2);switch(K){case"XYZ":this._x=N*U*E+X*G*F,this._y=X*G*E-N*U*F,this._z=X*U*F+N*G*E,this._w=X*U*E-N*G*F;break;case"YXZ":this._x=N*U*E+X*G*F,this._y=X*G*E-N*U*F,this._z=X*U*F-N*G*E,this._w=X*U*E+N*G*F;break;case"ZXY":this._x=N*U*E-X*G*F,this._y=X*G*E+N*U*F,this._z=X*U*F+N*G*E,this._w=X*U*E-N*G*F;break;case"ZYX":this._x=N*U*E-X*G*F,this._y=X*G*E+N*U*F,this._z=X*U*F-N*G*E,this._w=X*U*E+N*G*F;break;case"YZX":this._x=N*U*E+X*G*F,this._y=X*G*E+N*U*F,this._z=X*U*F-N*G*E,this._w=X*U*E-N*G*F;break;case"XZY":this._x=N*U*E-X*G*F,this._y=X*G*E-N*U*F,this._z=X*U*F+N*G*E,this._w=X*U*E+N*G*F;break;default:C0("Quaternion: .setFromEuler() encountered an unknown order: "+K)}if(Q===!0)this._onChangeCallback();return this}setFromAxisAngle(J,Q){let $=Q/2,W=Math.sin($);return this._x=J.x*W,this._y=J.y*W,this._z=J.z*W,this._w=Math.cos($),this._onChangeCallback(),this}setFromRotationMatrix(J){let Q=J.elements,$=Q[0],W=Q[4],Z=Q[8],K=Q[1],H=Q[5],Y=Q[9],X=Q[2],U=Q[6],E=Q[10],N=$+H+E;if(N>0){let G=0.5/Math.sqrt(N+1);this._w=0.25/G,this._x=(U-Y)*G,this._y=(Z-X)*G,this._z=(K-W)*G}else if($>H&&$>E){let G=2*Math.sqrt(1+$-H-E);this._w=(U-Y)/G,this._x=0.25*G,this._y=(W+K)/G,this._z=(Z+X)/G}else if(H>E){let G=2*Math.sqrt(1+H-$-E);this._w=(Z-X)/G,this._x=(W+K)/G,this._y=0.25*G,this._z=(Y+U)/G}else{let G=2*Math.sqrt(1+E-$-H);this._w=(K-W)/G,this._x=(Z+X)/G,this._y=(Y+U)/G,this._z=0.25*G}return this._onChangeCallback(),this}setFromUnitVectors(J,Q){let $=J.dot(Q)+1;if($<0.00000001)if($=0,Math.abs(J.x)>Math.abs(J.z))this._x=-J.y,this._y=J.x,this._z=0,this._w=$;else this._x=0,this._y=-J.z,this._z=J.y,this._w=$;else this._x=J.y*Q.z-J.z*Q.y,this._y=J.z*Q.x-J.x*Q.z,this._z=J.x*Q.y-J.y*Q.x,this._w=$;return this.normalize()}angleTo(J){return 2*Math.acos(Math.abs(m0(this.dot(J),-1,1)))}rotateTowards(J,Q){let $=this.angleTo(J);if($===0)return this;let W=Math.min(1,Q/$);return this.slerp(J,W),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(J){return this._x*J._x+this._y*J._y+this._z*J._z+this._w*J._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let J=this.length();if(J===0)this._x=0,this._y=0,this._z=0,this._w=1;else J=1/J,this._x=this._x*J,this._y=this._y*J,this._z=this._z*J,this._w=this._w*J;return this._onChangeCallback(),this}multiply(J){return this.multiplyQuaternions(this,J)}premultiply(J){return this.multiplyQuaternions(J,this)}multiplyQuaternions(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=Q._x,Y=Q._y,X=Q._z,U=Q._w;return this._x=$*U+K*H+W*X-Z*Y,this._y=W*U+K*Y+Z*H-$*X,this._z=Z*U+K*X+$*Y-W*H,this._w=K*U-$*H-W*Y-Z*X,this._onChangeCallback(),this}slerp(J,Q){let{_x:$,_y:W,_z:Z,_w:K}=J,H=this.dot(J);if(H<0)$=-$,W=-W,Z=-Z,K=-K,H=-H;let Y=1-Q;if(H<0.9995){let X=Math.acos(H),U=Math.sin(X);Y=Math.sin(Y*X)/U,Q=Math.sin(Q*X)/U,this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this._onChangeCallback()}else this._x=this._x*Y+$*Q,this._y=this._y*Y+W*Q,this._z=this._z*Y+Z*Q,this._w=this._w*Y+K*Q,this.normalize();return this}slerpQuaternions(J,Q,$){return this.copy(J).slerp(Q,$)}random(){let J=2*Math.PI*Math.random(),Q=2*Math.PI*Math.random(),$=Math.random(),W=Math.sqrt(1-$),Z=Math.sqrt($);return this.set(W*Math.sin(J),W*Math.cos(J),Z*Math.sin(Q),Z*Math.cos(Q))}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._w===this._w}fromArray(J,Q=0){return this._x=J[Q],this._y=J[Q+1],this._z=J[Q+2],this._w=J[Q+3],this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._w,J}fromBufferAttribute(J,Q){return this._x=J.getX(Q),this._y=J.getY(Q),this._z=J.getZ(Q),this._w=J.getW(Q),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class h{static{h.prototype.isVector3=!0}constructor(J=0,Q=0,$=0){this.x=J,this.y=Q,this.z=$}set(J,Q,$){if($===void 0)$=this.z;return this.x=J,this.y=Q,this.z=$,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;default:throw Error("THREE.Vector3: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("THREE.Vector3: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this}multiplyVectors(J,Q){return this.x=J.x*Q.x,this.y=J.y*Q.y,this.z=J.z*Q.z,this}applyEuler(J){return this.applyQuaternion(GW.setFromEuler(J))}applyAxisAngle(J,Q){return this.applyQuaternion(GW.setFromAxisAngle(J,Q))}applyMatrix3(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[3]*$+Z[6]*W,this.y=Z[1]*Q+Z[4]*$+Z[7]*W,this.z=Z[2]*Q+Z[5]*$+Z[8]*W,this}applyNormalMatrix(J){return this.applyMatrix3(J).normalize()}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements,K=1/(Z[3]*Q+Z[7]*$+Z[11]*W+Z[15]);return this.x=(Z[0]*Q+Z[4]*$+Z[8]*W+Z[12])*K,this.y=(Z[1]*Q+Z[5]*$+Z[9]*W+Z[13])*K,this.z=(Z[2]*Q+Z[6]*$+Z[10]*W+Z[14])*K,this}applyQuaternion(J){let Q=this.x,$=this.y,W=this.z,Z=J.x,K=J.y,H=J.z,Y=J.w,X=2*(K*W-H*$),U=2*(H*Q-Z*W),E=2*(Z*$-K*Q);return this.x=Q+Y*X+K*E-H*U,this.y=$+Y*U+H*X-Z*E,this.z=W+Y*E+Z*U-K*X,this}project(J){return this.applyMatrix4(J.matrixWorldInverse).applyMatrix4(J.projectionMatrix)}unproject(J){return this.applyMatrix4(J.projectionMatrixInverse).applyMatrix4(J.matrixWorld)}transformDirection(J){let Q=this.x,$=this.y,W=this.z,Z=J.elements;return this.x=Z[0]*Q+Z[4]*$+Z[8]*W,this.y=Z[1]*Q+Z[5]*$+Z[9]*W,this.z=Z[2]*Q+Z[6]*$+Z[10]*W,this.normalize()}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this}divideScalar(J){return this.multiplyScalar(1/J)}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this}clamp(J,Q){return this.x=m0(this.x,J.x,Q.x),this.y=m0(this.y,J.y,Q.y),this.z=m0(this.z,J.z,Q.z),this}clampScalar(J,Q){return this.x=m0(this.x,J,Q),this.y=m0(this.y,J,Q),this.z=m0(this.z,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(m0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this}cross(J){return this.crossVectors(this,J)}crossVectors(J,Q){let{x:$,y:W,z:Z}=J,K=Q.x,H=Q.y,Y=Q.z;return this.x=W*Y-Z*H,this.y=Z*K-$*Y,this.z=$*H-W*K,this}projectOnVector(J){let Q=J.lengthSq();if(Q===0)return this.set(0,0,0);let $=J.dot(this)/Q;return this.copy(J).multiplyScalar($)}projectOnPlane(J){return IJ.copy(this).projectOnVector(J),this.sub(IJ)}reflect(J){return this.sub(IJ.copy(J).multiplyScalar(2*this.dot(J)))}angleTo(J){let Q=Math.sqrt(this.lengthSq()*J.lengthSq());if(Q===0)return Math.PI/2;let $=this.dot(J)/Q;return Math.acos(m0($,-1,1))}distanceTo(J){return Math.sqrt(this.distanceToSquared(J))}distanceToSquared(J){let Q=this.x-J.x,$=this.y-J.y,W=this.z-J.z;return Q*Q+$*$+W*W}manhattanDistanceTo(J){return Math.abs(this.x-J.x)+Math.abs(this.y-J.y)+Math.abs(this.z-J.z)}setFromSpherical(J){return this.setFromSphericalCoords(J.radius,J.phi,J.theta)}setFromSphericalCoords(J,Q,$){let W=Math.sin(Q)*J;return this.x=W*Math.sin($),this.y=Math.cos(Q)*J,this.z=W*Math.cos($),this}setFromCylindrical(J){return this.setFromCylindricalCoords(J.radius,J.theta,J.y)}setFromCylindricalCoords(J,Q,$){return this.x=J*Math.sin(Q),this.y=$,this.z=J*Math.cos(Q),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this}setFromMatrixScale(J){let Q=this.setFromMatrixColumn(J,0).length(),$=this.setFromMatrixColumn(J,1).length(),W=this.setFromMatrixColumn(J,2).length();return this.x=Q,this.y=$,this.z=W,this}setFromMatrixColumn(J,Q){return this.fromArray(J.elements,Q*4)}setFromMatrix3Column(J,Q){return this.fromArray(J.elements,Q*3)}setFromEuler(J){return this.x=J._x,this.y=J._y,this.z=J._z,this}setFromColor(J){return this.x=J.r,this.y=J.g,this.z=J.b,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let J=Math.random()*Math.PI*2,Q=Math.random()*2-1,$=Math.sqrt(1-Q*Q);return this.x=$*Math.cos(J),this.y=Q,this.z=$*Math.sin(J),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}var IJ=new h,GW=new R9;class w0{static{w0.prototype.isMatrix3=!0}constructor(J,Q,$,W,Z,K,H,Y,X){if(this.elements=[1,0,0,0,1,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X)}set(J,Q,$,W,Z,K,H,Y,X){let U=this.elements;return U[0]=J,U[1]=W,U[2]=H,U[3]=Q,U[4]=Z,U[5]=Y,U[6]=$,U[7]=K,U[8]=X,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],this}extractBasis(J,Q,$){return J.setFromMatrix3Column(this,0),Q.setFromMatrix3Column(this,1),$.setFromMatrix3Column(this,2),this}setFromMatrix4(J){let Q=J.elements;return this.set(Q[0],Q[4],Q[8],Q[1],Q[5],Q[9],Q[2],Q[6],Q[10]),this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[3],Y=$[6],X=$[1],U=$[4],E=$[7],N=$[2],G=$[5],F=$[8],O=W[0],V=W[3],D=W[6],q=W[1],_=W[4],A=W[7],k=W[2],I=W[5],C=W[8];return Z[0]=K*O+H*q+Y*k,Z[3]=K*V+H*_+Y*I,Z[6]=K*D+H*A+Y*C,Z[1]=X*O+U*q+E*k,Z[4]=X*V+U*_+E*I,Z[7]=X*D+U*A+E*C,Z[2]=N*O+G*q+F*k,Z[5]=N*V+G*_+F*I,Z[8]=N*D+G*A+F*C,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[3]*=J,Q[6]*=J,Q[1]*=J,Q[4]*=J,Q[7]*=J,Q[2]*=J,Q[5]*=J,Q[8]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8];return Q*K*U-Q*H*X-$*Z*U+$*H*Y+W*Z*X-W*K*Y}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=U*K-H*X,N=H*Y-U*Z,G=X*Z-K*Y,F=Q*E+$*N+W*G;if(F===0)return this.set(0,0,0,0,0,0,0,0,0);let O=1/F;return J[0]=E*O,J[1]=(W*X-U*$)*O,J[2]=(H*$-W*K)*O,J[3]=N*O,J[4]=(U*Q-W*Y)*O,J[5]=(W*Z-H*Q)*O,J[6]=G*O,J[7]=($*Y-X*Q)*O,J[8]=(K*Q-$*Z)*O,this}transpose(){let J,Q=this.elements;return J=Q[1],Q[1]=Q[3],Q[3]=J,J=Q[2],Q[2]=Q[6],Q[6]=J,J=Q[5],Q[5]=Q[7],Q[7]=J,this}getNormalMatrix(J){return this.setFromMatrix4(J).invert().transpose()}transposeIntoArray(J){let Q=this.elements;return J[0]=Q[0],J[1]=Q[3],J[2]=Q[6],J[3]=Q[1],J[4]=Q[4],J[5]=Q[7],J[6]=Q[2],J[7]=Q[5],J[8]=Q[8],this}setUvTransform(J,Q,$,W,Z,K,H){let Y=Math.cos(Z),X=Math.sin(Z);return this.set($*Y,$*X,-$*(Y*K+X*H)+K+J,-W*X,W*Y,-W*(-X*K+Y*H)+H+Q,0,0,1),this}scale(J,Q){return m9("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_J.makeScale(J,Q)),this}rotate(J){return m9("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_J.makeRotation(-J)),this}translate(J,Q){return m9("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_J.makeTranslation(J,Q)),this}makeTranslation(J,Q){if(J.isVector2)this.set(1,0,J.x,0,1,J.y,0,0,1);else this.set(1,0,J,0,1,Q,0,0,1);return this}makeRotation(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,$,Q,0,0,0,1),this}makeScale(J,Q){return this.set(J,0,0,0,Q,0,0,0,1),this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<9;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<9;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J}clone(){return new this.constructor().fromArray(this.elements)}}var _J=new w0,NW=new w0().set(0.4123908,0.3575843,0.1804808,0.212639,0.7151687,0.0721923,0.0193308,0.1191948,0.9505322),EW=new w0().set(3.2409699,-1.5373832,-0.4986108,-0.9692436,1.8759675,0.0415551,0.0556301,-0.203977,1.0569715);function ZH(){let J={enabled:!0,workingColorSpace:"srgb-linear",spaces:{},convert:function(Z,K,H){if(this.enabled===!1||K===H||!K||!H)return Z;if(this.spaces[K].transfer==="srgb")Z.r=F9(Z.r),Z.g=F9(Z.g),Z.b=F9(Z.b);if(this.spaces[K].primaries!==this.spaces[H].primaries)Z.applyMatrix3(this.spaces[K].toXYZ),Z.applyMatrix3(this.spaces[H].fromXYZ);if(this.spaces[H].transfer==="srgb")Z.r=k6(Z.r),Z.g=k6(Z.g),Z.b=k6(Z.b);return Z},workingToColorSpace:function(Z,K){return this.convert(Z,this.workingColorSpace,K)},colorSpaceToWorking:function(Z,K){return this.convert(Z,K,this.workingColorSpace)},getPrimaries:function(Z){return this.spaces[Z].primaries},getTransfer:function(Z){if(Z==="")return"linear";return this.spaces[Z].transfer},getToneMappingMode:function(Z){return this.spaces[Z].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(Z,K=this.workingColorSpace){return Z.fromArray(this.spaces[K].luminanceCoefficients)},define:function(Z){Object.assign(this.spaces,Z)},_getMatrix:function(Z,K,H){return Z.copy(this.spaces[K].toXYZ).multiply(this.spaces[H].fromXYZ)},_getDrawingBufferColorSpace:function(Z){return this.spaces[Z].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(Z=this.workingColorSpace){return this.spaces[Z].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(Z,K){return m9("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),J.workingToColorSpace(Z,K)},toWorkingColorSpace:function(Z,K){return m9("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),J.colorSpaceToWorking(Z,K)}},Q=[0.64,0.33,0.3,0.6,0.15,0.06],$=[0.2126,0.7152,0.0722],W=[0.3127,0.329];return J.define({["srgb-linear"]:{primaries:Q,whitePoint:W,transfer:"linear",toXYZ:NW,fromXYZ:EW,luminanceCoefficients:$,workingColorSpaceConfig:{unpackColorSpace:"srgb"},outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}},["srgb"]:{primaries:Q,whitePoint:W,transfer:"srgb",toXYZ:NW,fromXYZ:EW,luminanceCoefficients:$,outputColorSpaceConfig:{drawingBufferColorSpace:"srgb"}}}),J}var g0=ZH();function F9(J){return J<0.04045?J*0.0773993808:Math.pow(J*0.9478672986+0.0521327014,2.4)}function k6(J){return J<0.0031308?J*12.92:1.055*Math.pow(J,0.41666)-0.055}var H6;class iQ{static getDataURL(J,Q="image/png"){if(/^data:/i.test(J.src))return J.src;if(typeof HTMLCanvasElement>"u")return J.src;let $;if(J instanceof HTMLCanvasElement)$=J;else{if(H6===void 0)H6=x6("canvas");H6.width=J.width,H6.height=J.height;let W=H6.getContext("2d");if(J instanceof ImageData)W.putImageData(J,0,0);else W.drawImage(J,0,0,J.width,J.height);$=H6}return $.toDataURL(Q)}static sRGBToLinear(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap){let Q=x6("canvas");Q.width=J.width,Q.height=J.height;let $=Q.getContext("2d");$.drawImage(J,0,0,J.width,J.height);let W=$.getImageData(0,0,J.width,J.height),Z=W.data;for(let K=0;K<Z.length;K++)Z[K]=F9(Z[K]/255)*255;return $.putImageData(W,0,0),Q}else if(J.data){let Q=J.data.slice(0);for(let $=0;$<Q.length;$++)if(Q instanceof Uint8Array||Q instanceof Uint8ClampedArray)Q[$]=Math.floor(F9(Q[$]/255)*255);else Q[$]=F9(Q[$]);return{data:Q,width:J.width,height:J.height}}else return C0("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),J}}var KH=0;class c6{constructor(J=null){this.isSource=!0,Object.defineProperty(this,"id",{value:KH++}),this.uuid=u6(),this.data=J,this.dataReady=!0,this.version=0}getSize(J){let Q=this.data;if(typeof HTMLVideoElement<"u"&&Q instanceof HTMLVideoElement)J.set(Q.videoWidth,Q.videoHeight,0);else if(typeof VideoFrame<"u"&&Q instanceof VideoFrame)J.set(Q.displayWidth,Q.displayHeight,0);else if(Q!==null)J.set(Q.width,Q.height,Q.depth||0);else J.set(0,0,0);return J}set needsUpdate(J){if(J===!0)this.version++}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.images[this.uuid]!==void 0)return J.images[this.uuid];let $={uuid:this.uuid,url:""},W=this.data;if(W!==null){let Z;if(Array.isArray(W)){Z=[];for(let K=0,H=W.length;K<H;K++)if(W[K].isDataTexture)Z.push(CJ(W[K].image));else Z.push(CJ(W[K]))}else Z=CJ(W);$.url=Z}if(!Q)J.images[this.uuid]=$;return $}}function CJ(J){if(typeof HTMLImageElement<"u"&&J instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&J instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&J instanceof ImageBitmap)return iQ.getDataURL(J);else if(J.data)return{data:Array.from(J.data),width:J.width,height:J.height,type:J.data.constructor.name};else return C0("Texture: Unable to serialize Texture."),{}}var HH=0,AJ=new h;class z8 extends M9{constructor(J=z8.DEFAULT_IMAGE,Q=z8.DEFAULT_MAPPING,$=1001,W=1001,Z=1006,K=1008,H=1023,Y=1009,X=z8.DEFAULT_ANISOTROPY,U=""){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:HH++}),this.uuid=u6(),this.name="",this.source=new c6(J),this.mipmaps=[],this.mapping=Q,this.channel=0,this.wrapS=$,this.wrapT=W,this.magFilter=Z,this.minFilter=K,this.anisotropy=X,this.format=H,this.internalFormat=null,this.type=Y,this.offset=new n0(0,0),this.repeat=new n0(1,1),this.center=new n0(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new w0,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=U,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=J&&J.depth&&J.depth>1?!0:!1,this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(AJ).x}get height(){return this.source.getSize(AJ).y}get depth(){return this.source.getSize(AJ).z}get image(){return this.source.data}set image(J){this.source.data=J}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(J){return this.name=J.name,this.source=J.source,this.mipmaps=J.mipmaps.slice(0),this.mapping=J.mapping,this.channel=J.channel,this.wrapS=J.wrapS,this.wrapT=J.wrapT,this.magFilter=J.magFilter,this.minFilter=J.minFilter,this.anisotropy=J.anisotropy,this.format=J.format,this.internalFormat=J.internalFormat,this.type=J.type,this.normalized=J.normalized,this.offset.copy(J.offset),this.repeat.copy(J.repeat),this.center.copy(J.center),this.rotation=J.rotation,this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrix.copy(J.matrix),this.generateMipmaps=J.generateMipmaps,this.premultiplyAlpha=J.premultiplyAlpha,this.flipY=J.flipY,this.unpackAlignment=J.unpackAlignment,this.colorSpace=J.colorSpace,this.renderTarget=J.renderTarget,this.isRenderTargetTexture=J.isRenderTargetTexture,this.isArrayTexture=J.isArrayTexture,this.userData=JSON.parse(JSON.stringify(J.userData)),this.needsUpdate=!0,this}setValues(J){for(let Q in J){let $=J[Q];if($===void 0){C0(`Texture.setValues(): parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){C0(`Texture.setValues(): property '${Q}' does not exist.`);continue}if(W&&$&&(W.isVector2&&$.isVector2))W.copy($);else if(W&&$&&(W.isVector3&&$.isVector3))W.copy($);else if(W&&$&&(W.isMatrix3&&$.isMatrix3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(!Q&&J.textures[this.uuid]!==void 0)return J.textures[this.uuid];let $={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(J).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};if(Object.keys(this.userData).length>0)$.userData=this.userData;if(!Q)J.textures[this.uuid]=$;return $}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(J){if(this.mapping!==300)return J;if(J.applyMatrix3(this.matrix),J.x<0||J.x>1)switch(this.wrapS){case 1000:J.x=J.x-Math.floor(J.x);break;case 1001:J.x=J.x<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.x)%2)===1)J.x=Math.ceil(J.x)-J.x;else J.x=J.x-Math.floor(J.x);break}if(J.y<0||J.y>1)switch(this.wrapT){case 1000:J.y=J.y-Math.floor(J.y);break;case 1001:J.y=J.y<0?0:1;break;case 1002:if(Math.abs(Math.floor(J.y)%2)===1)J.y=Math.ceil(J.y)-J.y;else J.y=J.y-Math.floor(J.y);break}if(this.flipY)J.y=1-J.y;return J}set needsUpdate(J){if(J===!0)this.version++,this.source.needsUpdate=!0}set needsPMREMUpdate(J){if(J===!0)this.pmremVersion++}}z8.DEFAULT_IMAGE=null;z8.DEFAULT_MAPPING=300;z8.DEFAULT_ANISOTROPY=1;class K8{static{K8.prototype.isVector4=!0}constructor(J=0,Q=0,$=0,W=1){this.x=J,this.y=Q,this.z=$,this.w=W}get width(){return this.z}set width(J){this.z=J}get height(){return this.w}set height(J){this.w=J}set(J,Q,$,W){return this.x=J,this.y=Q,this.z=$,this.w=W,this}setScalar(J){return this.x=J,this.y=J,this.z=J,this.w=J,this}setX(J){return this.x=J,this}setY(J){return this.y=J,this}setZ(J){return this.z=J,this}setW(J){return this.w=J,this}setComponent(J,Q){switch(J){case 0:this.x=Q;break;case 1:this.y=Q;break;case 2:this.z=Q;break;case 3:this.w=Q;break;default:throw Error("THREE.Vector4: index is out of range: "+J)}return this}getComponent(J){switch(J){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error("THREE.Vector4: index is out of range: "+J)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(J){return this.x=J.x,this.y=J.y,this.z=J.z,this.w=J.w!==void 0?J.w:1,this}add(J){return this.x+=J.x,this.y+=J.y,this.z+=J.z,this.w+=J.w,this}addScalar(J){return this.x+=J,this.y+=J,this.z+=J,this.w+=J,this}addVectors(J,Q){return this.x=J.x+Q.x,this.y=J.y+Q.y,this.z=J.z+Q.z,this.w=J.w+Q.w,this}addScaledVector(J,Q){return this.x+=J.x*Q,this.y+=J.y*Q,this.z+=J.z*Q,this.w+=J.w*Q,this}sub(J){return this.x-=J.x,this.y-=J.y,this.z-=J.z,this.w-=J.w,this}subScalar(J){return this.x-=J,this.y-=J,this.z-=J,this.w-=J,this}subVectors(J,Q){return this.x=J.x-Q.x,this.y=J.y-Q.y,this.z=J.z-Q.z,this.w=J.w-Q.w,this}multiply(J){return this.x*=J.x,this.y*=J.y,this.z*=J.z,this.w*=J.w,this}multiplyScalar(J){return this.x*=J,this.y*=J,this.z*=J,this.w*=J,this}applyMatrix4(J){let Q=this.x,$=this.y,W=this.z,Z=this.w,K=J.elements;return this.x=K[0]*Q+K[4]*$+K[8]*W+K[12]*Z,this.y=K[1]*Q+K[5]*$+K[9]*W+K[13]*Z,this.z=K[2]*Q+K[6]*$+K[10]*W+K[14]*Z,this.w=K[3]*Q+K[7]*$+K[11]*W+K[15]*Z,this}divide(J){return this.x/=J.x,this.y/=J.y,this.z/=J.z,this.w/=J.w,this}divideScalar(J){return this.multiplyScalar(1/J)}setAxisAngleFromQuaternion(J){this.w=2*Math.acos(J.w);let Q=Math.sqrt(1-J.w*J.w);if(Q<0.0001)this.x=1,this.y=0,this.z=0;else this.x=J.x/Q,this.y=J.y/Q,this.z=J.z/Q;return this}setAxisAngleFromRotationMatrix(J){let Q,$,W,Z,K=0.01,H=0.1,Y=J.elements,X=Y[0],U=Y[4],E=Y[8],N=Y[1],G=Y[5],F=Y[9],O=Y[2],V=Y[6],D=Y[10];if(Math.abs(U-N)<0.01&&Math.abs(E-O)<0.01&&Math.abs(F-V)<0.01){if(Math.abs(U+N)<0.1&&Math.abs(E+O)<0.1&&Math.abs(F+V)<0.1&&Math.abs(X+G+D-3)<0.1)return this.set(1,0,0,0),this;Q=Math.PI;let _=(X+1)/2,A=(G+1)/2,k=(D+1)/2,I=(U+N)/4,C=(E+O)/4,w=(F+V)/4;if(_>A&&_>k)if(_<0.01)$=0,W=0.707106781,Z=0.707106781;else $=Math.sqrt(_),W=I/$,Z=C/$;else if(A>k)if(A<0.01)$=0.707106781,W=0,Z=0.707106781;else W=Math.sqrt(A),$=I/W,Z=w/W;else if(k<0.01)$=0.707106781,W=0.707106781,Z=0;else Z=Math.sqrt(k),$=C/Z,W=w/Z;return this.set($,W,Z,Q),this}let q=Math.sqrt((V-F)*(V-F)+(E-O)*(E-O)+(N-U)*(N-U));if(Math.abs(q)<0.001)q=1;return this.x=(V-F)/q,this.y=(E-O)/q,this.z=(N-U)/q,this.w=Math.acos((X+G+D-1)/2),this}setFromMatrixPosition(J){let Q=J.elements;return this.x=Q[12],this.y=Q[13],this.z=Q[14],this.w=Q[15],this}min(J){return this.x=Math.min(this.x,J.x),this.y=Math.min(this.y,J.y),this.z=Math.min(this.z,J.z),this.w=Math.min(this.w,J.w),this}max(J){return this.x=Math.max(this.x,J.x),this.y=Math.max(this.y,J.y),this.z=Math.max(this.z,J.z),this.w=Math.max(this.w,J.w),this}clamp(J,Q){return this.x=m0(this.x,J.x,Q.x),this.y=m0(this.y,J.y,Q.y),this.z=m0(this.z,J.z,Q.z),this.w=m0(this.w,J.w,Q.w),this}clampScalar(J,Q){return this.x=m0(this.x,J,Q),this.y=m0(this.y,J,Q),this.z=m0(this.z,J,Q),this.w=m0(this.w,J,Q),this}clampLength(J,Q){let $=this.length();return this.divideScalar($||1).multiplyScalar(m0($,J,Q))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(J){return this.x*J.x+this.y*J.y+this.z*J.z+this.w*J.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(J){return this.normalize().multiplyScalar(J)}lerp(J,Q){return this.x+=(J.x-this.x)*Q,this.y+=(J.y-this.y)*Q,this.z+=(J.z-this.z)*Q,this.w+=(J.w-this.w)*Q,this}lerpVectors(J,Q,$){return this.x=J.x+(Q.x-J.x)*$,this.y=J.y+(Q.y-J.y)*$,this.z=J.z+(Q.z-J.z)*$,this.w=J.w+(Q.w-J.w)*$,this}equals(J){return J.x===this.x&&J.y===this.y&&J.z===this.z&&J.w===this.w}fromArray(J,Q=0){return this.x=J[Q],this.y=J[Q+1],this.z=J[Q+2],this.w=J[Q+3],this}toArray(J=[],Q=0){return J[Q]=this.x,J[Q+1]=this.y,J[Q+2]=this.z,J[Q+3]=this.w,J}fromBufferAttribute(J,Q){return this.x=J.getX(Q),this.y=J.getY(Q),this.z=J.getZ(Q),this.w=J.getW(Q),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class oQ extends M9{constructor(J=1,Q=1,$={}){super();$=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:1006,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},$),this.isRenderTarget=!0,this.width=J,this.height=Q,this.depth=$.depth,this.scissor=new K8(0,0,J,Q),this.scissorTest=!1,this.viewport=new K8(0,0,J,Q),this.textures=[];let W={width:J,height:Q,depth:$.depth},Z=new z8(W),K=$.count;for(let H=0;H<K;H++)this.textures[H]=Z.clone(),this.textures[H].isRenderTargetTexture=!0,this.textures[H].renderTarget=this;this._setTextureOptions($),this.depthBuffer=$.depthBuffer,this.stencilBuffer=$.stencilBuffer,this.resolveDepthBuffer=$.resolveDepthBuffer,this.resolveStencilBuffer=$.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=$.depthTexture,this.samples=$.samples,this.multiview=$.multiview,this.useArrayDepthTexture=$.useArrayDepthTexture}_setTextureOptions(J={}){let Q={minFilter:1006,generateMipmaps:!1,flipY:!1,internalFormat:null};if(J.mapping!==void 0)Q.mapping=J.mapping;if(J.wrapS!==void 0)Q.wrapS=J.wrapS;if(J.wrapT!==void 0)Q.wrapT=J.wrapT;if(J.wrapR!==void 0)Q.wrapR=J.wrapR;if(J.magFilter!==void 0)Q.magFilter=J.magFilter;if(J.minFilter!==void 0)Q.minFilter=J.minFilter;if(J.format!==void 0)Q.format=J.format;if(J.type!==void 0)Q.type=J.type;if(J.anisotropy!==void 0)Q.anisotropy=J.anisotropy;if(J.colorSpace!==void 0)Q.colorSpace=J.colorSpace;if(J.flipY!==void 0)Q.flipY=J.flipY;if(J.generateMipmaps!==void 0)Q.generateMipmaps=J.generateMipmaps;if(J.internalFormat!==void 0)Q.internalFormat=J.internalFormat;for(let $=0;$<this.textures.length;$++)this.textures[$].setValues(Q)}get texture(){return this.textures[0]}set texture(J){this.textures[0]=J}set depthTexture(J){if(this._depthTexture!==null)this._depthTexture.renderTarget=null;if(J!==null)J.renderTarget=this;this._depthTexture=J}get depthTexture(){return this._depthTexture}setSize(J,Q,$=1){if(this.width!==J||this.height!==Q||this.depth!==$){this.width=J,this.height=Q,this.depth=$;for(let W=0,Z=this.textures.length;W<Z;W++)if(this.textures[W].image.width=J,this.textures[W].image.height=Q,this.textures[W].image.depth=$,this.textures[W].isData3DTexture!==!0)this.textures[W].isArrayTexture=this.textures[W].image.depth>1;this.dispose()}this.viewport.set(0,0,J,Q),this.scissor.set(0,0,J,Q)}clone(){return new this.constructor().copy(this)}copy(J){this.width=J.width,this.height=J.height,this.depth=J.depth,this.scissor.copy(J.scissor),this.scissorTest=J.scissorTest,this.viewport.copy(J.viewport),this.textures.length=0;for(let Q=0,$=J.textures.length;Q<$;Q++){this.textures[Q]=J.textures[Q].clone(),this.textures[Q].isRenderTargetTexture=!0,this.textures[Q].renderTarget=this;let W=Object.assign({},J.textures[Q].image);this.textures[Q].source=new c6(W)}if(this.depthBuffer=J.depthBuffer,this.stencilBuffer=J.stencilBuffer,this.resolveDepthBuffer=J.resolveDepthBuffer,this.resolveStencilBuffer=J.resolveStencilBuffer,J.depthTexture!==null)this.depthTexture=J.depthTexture.clone();return this.samples=J.samples,this.multiview=J.multiview,this.useArrayDepthTexture=J.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class c8 extends oQ{constructor(J=1,Q=1,$={}){super(J,Q,$);this.isWebGLRenderTarget=!0}}class c7 extends z8{constructor(J=null,Q=1,$=1,W=1){super(null);this.isDataArrayTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(J){this.layerUpdates.add(J)}clearLayerUpdates(){this.layerUpdates.clear()}}class aQ extends z8{constructor(J=null,Q=1,$=1,W=1){super(null);this.isData3DTexture=!0,this.image={data:J,width:Q,height:$,depth:W},this.magFilter=1003,this.minFilter=1003,this.wrapR=1001,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Z8{static{Z8.prototype.isMatrix4=!0}constructor(J,Q,$,W,Z,K,H,Y,X,U,E,N,G,F,O,V){if(this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],J!==void 0)this.set(J,Q,$,W,Z,K,H,Y,X,U,E,N,G,F,O,V)}set(J,Q,$,W,Z,K,H,Y,X,U,E,N,G,F,O,V){let D=this.elements;return D[0]=J,D[4]=Q,D[8]=$,D[12]=W,D[1]=Z,D[5]=K,D[9]=H,D[13]=Y,D[2]=X,D[6]=U,D[10]=E,D[14]=N,D[3]=G,D[7]=F,D[11]=O,D[15]=V,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Z8().fromArray(this.elements)}copy(J){let Q=this.elements,$=J.elements;return Q[0]=$[0],Q[1]=$[1],Q[2]=$[2],Q[3]=$[3],Q[4]=$[4],Q[5]=$[5],Q[6]=$[6],Q[7]=$[7],Q[8]=$[8],Q[9]=$[9],Q[10]=$[10],Q[11]=$[11],Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],Q[15]=$[15],this}copyPosition(J){let Q=this.elements,$=J.elements;return Q[12]=$[12],Q[13]=$[13],Q[14]=$[14],this}setFromMatrix3(J){let Q=J.elements;return this.set(Q[0],Q[3],Q[6],0,Q[1],Q[4],Q[7],0,Q[2],Q[5],Q[8],0,0,0,0,1),this}extractBasis(J,Q,$){if(this.determinantAffine()===0)return J.set(1,0,0),Q.set(0,1,0),$.set(0,0,1),this;return J.setFromMatrixColumn(this,0),Q.setFromMatrixColumn(this,1),$.setFromMatrixColumn(this,2),this}makeBasis(J,Q,$){return this.set(J.x,Q.x,$.x,0,J.y,Q.y,$.y,0,J.z,Q.z,$.z,0,0,0,0,1),this}extractRotation(J){if(J.determinantAffine()===0)return this.identity();let Q=this.elements,$=J.elements,W=1/Y6.setFromMatrixColumn(J,0).length(),Z=1/Y6.setFromMatrixColumn(J,1).length(),K=1/Y6.setFromMatrixColumn(J,2).length();return Q[0]=$[0]*W,Q[1]=$[1]*W,Q[2]=$[2]*W,Q[3]=0,Q[4]=$[4]*Z,Q[5]=$[5]*Z,Q[6]=$[6]*Z,Q[7]=0,Q[8]=$[8]*K,Q[9]=$[9]*K,Q[10]=$[10]*K,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromEuler(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z,K=Math.cos($),H=Math.sin($),Y=Math.cos(W),X=Math.sin(W),U=Math.cos(Z),E=Math.sin(Z);if(J.order==="XYZ"){let N=K*U,G=K*E,F=H*U,O=H*E;Q[0]=Y*U,Q[4]=-Y*E,Q[8]=X,Q[1]=G+F*X,Q[5]=N-O*X,Q[9]=-H*Y,Q[2]=O-N*X,Q[6]=F+G*X,Q[10]=K*Y}else if(J.order==="YXZ"){let N=Y*U,G=Y*E,F=X*U,O=X*E;Q[0]=N+O*H,Q[4]=F*H-G,Q[8]=K*X,Q[1]=K*E,Q[5]=K*U,Q[9]=-H,Q[2]=G*H-F,Q[6]=O+N*H,Q[10]=K*Y}else if(J.order==="ZXY"){let N=Y*U,G=Y*E,F=X*U,O=X*E;Q[0]=N-O*H,Q[4]=-K*E,Q[8]=F+G*H,Q[1]=G+F*H,Q[5]=K*U,Q[9]=O-N*H,Q[2]=-K*X,Q[6]=H,Q[10]=K*Y}else if(J.order==="ZYX"){let N=K*U,G=K*E,F=H*U,O=H*E;Q[0]=Y*U,Q[4]=F*X-G,Q[8]=N*X+O,Q[1]=Y*E,Q[5]=O*X+N,Q[9]=G*X-F,Q[2]=-X,Q[6]=H*Y,Q[10]=K*Y}else if(J.order==="YZX"){let N=K*Y,G=K*X,F=H*Y,O=H*X;Q[0]=Y*U,Q[4]=O-N*E,Q[8]=F*E+G,Q[1]=E,Q[5]=K*U,Q[9]=-H*U,Q[2]=-X*U,Q[6]=G*E+F,Q[10]=N-O*E}else if(J.order==="XZY"){let N=K*Y,G=K*X,F=H*Y,O=H*X;Q[0]=Y*U,Q[4]=-E,Q[8]=X*U,Q[1]=N*E+O,Q[5]=K*U,Q[9]=G*E-F,Q[2]=F*E-G,Q[6]=H*U,Q[10]=O*E+N}return Q[3]=0,Q[7]=0,Q[11]=0,Q[12]=0,Q[13]=0,Q[14]=0,Q[15]=1,this}makeRotationFromQuaternion(J){return this.compose(YH,J,XH)}lookAt(J,Q,$){let W=this.elements;if(v8.subVectors(J,Q),v8.lengthSq()===0)v8.z=1;if(v8.normalize(),z9.crossVectors($,v8),z9.lengthSq()===0){if(Math.abs($.z)===1)v8.x+=0.0001;else v8.z+=0.0001;v8.normalize(),z9.crossVectors($,v8)}return z9.normalize(),W7.crossVectors(v8,z9),W[0]=z9.x,W[4]=W7.x,W[8]=v8.x,W[1]=z9.y,W[5]=W7.y,W[9]=v8.y,W[2]=z9.z,W[6]=W7.z,W[10]=v8.z,this}multiply(J){return this.multiplyMatrices(this,J)}premultiply(J){return this.multiplyMatrices(J,this)}multiplyMatrices(J,Q){let $=J.elements,W=Q.elements,Z=this.elements,K=$[0],H=$[4],Y=$[8],X=$[12],U=$[1],E=$[5],N=$[9],G=$[13],F=$[2],O=$[6],V=$[10],D=$[14],q=$[3],_=$[7],A=$[11],k=$[15],I=W[0],C=W[4],w=W[8],R=W[12],z=W[1],p=W[5],P=W[9],y=W[13],c=W[2],b=W[6],u=W[10],m=W[14],f=W[3],a=W[7],e=W[11],J0=W[15];return Z[0]=K*I+H*z+Y*c+X*f,Z[4]=K*C+H*p+Y*b+X*a,Z[8]=K*w+H*P+Y*u+X*e,Z[12]=K*R+H*y+Y*m+X*J0,Z[1]=U*I+E*z+N*c+G*f,Z[5]=U*C+E*p+N*b+G*a,Z[9]=U*w+E*P+N*u+G*e,Z[13]=U*R+E*y+N*m+G*J0,Z[2]=F*I+O*z+V*c+D*f,Z[6]=F*C+O*p+V*b+D*a,Z[10]=F*w+O*P+V*u+D*e,Z[14]=F*R+O*y+V*m+D*J0,Z[3]=q*I+_*z+A*c+k*f,Z[7]=q*C+_*p+A*b+k*a,Z[11]=q*w+_*P+A*u+k*e,Z[15]=q*R+_*y+A*m+k*J0,this}multiplyScalar(J){let Q=this.elements;return Q[0]*=J,Q[4]*=J,Q[8]*=J,Q[12]*=J,Q[1]*=J,Q[5]*=J,Q[9]*=J,Q[13]*=J,Q[2]*=J,Q[6]*=J,Q[10]*=J,Q[14]*=J,Q[3]*=J,Q[7]*=J,Q[11]*=J,Q[15]*=J,this}determinant(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[12],K=J[1],H=J[5],Y=J[9],X=J[13],U=J[2],E=J[6],N=J[10],G=J[14],F=J[3],O=J[7],V=J[11],D=J[15],q=Y*G-X*N,_=H*G-X*E,A=H*N-Y*E,k=K*G-X*U,I=K*N-Y*U,C=K*E-H*U;return Q*(O*q-V*_+D*A)-$*(F*q-V*k+D*I)+W*(F*_-O*k+D*C)-Z*(F*A-O*I+V*C)}determinantAffine(){let J=this.elements,Q=J[0],$=J[4],W=J[8],Z=J[1],K=J[5],H=J[9],Y=J[2],X=J[6],U=J[10];return Q*(K*U-H*X)-$*(Z*U-H*Y)+W*(Z*X-K*Y)}transpose(){let J=this.elements,Q;return Q=J[1],J[1]=J[4],J[4]=Q,Q=J[2],J[2]=J[8],J[8]=Q,Q=J[6],J[6]=J[9],J[9]=Q,Q=J[3],J[3]=J[12],J[12]=Q,Q=J[7],J[7]=J[13],J[13]=Q,Q=J[11],J[11]=J[14],J[14]=Q,this}setPosition(J,Q,$){let W=this.elements;if(J.isVector3)W[12]=J.x,W[13]=J.y,W[14]=J.z;else W[12]=J,W[13]=Q,W[14]=$;return this}invert(){let J=this.elements,Q=J[0],$=J[1],W=J[2],Z=J[3],K=J[4],H=J[5],Y=J[6],X=J[7],U=J[8],E=J[9],N=J[10],G=J[11],F=J[12],O=J[13],V=J[14],D=J[15],q=Q*H-$*K,_=Q*Y-W*K,A=Q*X-Z*K,k=$*Y-W*H,I=$*X-Z*H,C=W*X-Z*Y,w=U*O-E*F,R=U*V-N*F,z=U*D-G*F,p=E*V-N*O,P=E*D-G*O,y=N*D-G*V,c=q*y-_*P+A*p+k*z-I*R+C*w;if(c===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/c;return J[0]=(H*y-Y*P+X*p)*b,J[1]=(W*P-$*y-Z*p)*b,J[2]=(O*C-V*I+D*k)*b,J[3]=(N*I-E*C-G*k)*b,J[4]=(Y*z-K*y-X*R)*b,J[5]=(Q*y-W*z+Z*R)*b,J[6]=(V*A-F*C-D*_)*b,J[7]=(U*C-N*A+G*_)*b,J[8]=(K*P-H*z+X*w)*b,J[9]=($*z-Q*P-Z*w)*b,J[10]=(F*I-O*A+D*q)*b,J[11]=(E*A-U*I-G*q)*b,J[12]=(H*R-K*p-Y*w)*b,J[13]=(Q*p-$*R+W*w)*b,J[14]=(O*_-F*k-V*q)*b,J[15]=(U*k-E*_+N*q)*b,this}scale(J){let Q=this.elements,$=J.x,W=J.y,Z=J.z;return Q[0]*=$,Q[4]*=W,Q[8]*=Z,Q[1]*=$,Q[5]*=W,Q[9]*=Z,Q[2]*=$,Q[6]*=W,Q[10]*=Z,Q[3]*=$,Q[7]*=W,Q[11]*=Z,this}getMaxScaleOnAxis(){let J=this.elements,Q=J[0]*J[0]+J[1]*J[1]+J[2]*J[2],$=J[4]*J[4]+J[5]*J[5]+J[6]*J[6],W=J[8]*J[8]+J[9]*J[9]+J[10]*J[10];return Math.sqrt(Math.max(Q,$,W))}makeTranslation(J,Q,$){if(J.isVector3)this.set(1,0,0,J.x,0,1,0,J.y,0,0,1,J.z,0,0,0,1);else this.set(1,0,0,J,0,1,0,Q,0,0,1,$,0,0,0,1);return this}makeRotationX(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(1,0,0,0,0,Q,-$,0,0,$,Q,0,0,0,0,1),this}makeRotationY(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,0,$,0,0,1,0,0,-$,0,Q,0,0,0,0,1),this}makeRotationZ(J){let Q=Math.cos(J),$=Math.sin(J);return this.set(Q,-$,0,0,$,Q,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(J,Q){let $=Math.cos(Q),W=Math.sin(Q),Z=1-$,K=J.x,H=J.y,Y=J.z,X=Z*K,U=Z*H;return this.set(X*K+$,X*H-W*Y,X*Y+W*H,0,X*H+W*Y,U*H+$,U*Y-W*K,0,X*Y-W*H,U*Y+W*K,Z*Y*Y+$,0,0,0,0,1),this}makeScale(J,Q,$){return this.set(J,0,0,0,0,Q,0,0,0,0,$,0,0,0,0,1),this}makeShear(J,Q,$,W,Z,K){return this.set(1,$,Z,0,J,1,K,0,Q,W,1,0,0,0,0,1),this}compose(J,Q,$){let W=this.elements,Z=Q._x,K=Q._y,H=Q._z,Y=Q._w,X=Z+Z,U=K+K,E=H+H,N=Z*X,G=Z*U,F=Z*E,O=K*U,V=K*E,D=H*E,q=Y*X,_=Y*U,A=Y*E,k=$.x,I=$.y,C=$.z;return W[0]=(1-(O+D))*k,W[1]=(G+A)*k,W[2]=(F-_)*k,W[3]=0,W[4]=(G-A)*I,W[5]=(1-(N+D))*I,W[6]=(V+q)*I,W[7]=0,W[8]=(F+_)*C,W[9]=(V-q)*C,W[10]=(1-(N+O))*C,W[11]=0,W[12]=J.x,W[13]=J.y,W[14]=J.z,W[15]=1,this}decompose(J,Q,$){let W=this.elements;J.x=W[12],J.y=W[13],J.z=W[14];let Z=this.determinantAffine();if(Z===0)return $.set(1,1,1),Q.identity(),this;let K=Y6.set(W[0],W[1],W[2]).length(),H=Y6.set(W[4],W[5],W[6]).length(),Y=Y6.set(W[8],W[9],W[10]).length();if(Z<0)K=-K;s8.copy(this);let X=1/K,U=1/H,E=1/Y;return s8.elements[0]*=X,s8.elements[1]*=X,s8.elements[2]*=X,s8.elements[4]*=U,s8.elements[5]*=U,s8.elements[6]*=U,s8.elements[8]*=E,s8.elements[9]*=E,s8.elements[10]*=E,Q.setFromRotationMatrix(s8),$.x=K,$.y=H,$.z=Y,this}makePerspective(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2*Z/(Q-J),E=2*Z/($-W),N=(Q+J)/(Q-J),G=($+W)/($-W),F,O;if(Y)F=Z/(K-Z),O=K*Z/(K-Z);else if(H===2000)F=-(K+Z)/(K-Z),O=-2*K*Z/(K-Z);else if(H===2001)F=-K/(K-Z),O=-K*Z/(K-Z);else throw Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=N,X[12]=0,X[1]=0,X[5]=E,X[9]=G,X[13]=0,X[2]=0,X[6]=0,X[10]=F,X[14]=O,X[3]=0,X[7]=0,X[11]=-1,X[15]=0,this}makeOrthographic(J,Q,$,W,Z,K,H=2000,Y=!1){let X=this.elements,U=2/(Q-J),E=2/($-W),N=-(Q+J)/(Q-J),G=-($+W)/($-W),F,O;if(Y)F=1/(K-Z),O=K/(K-Z);else if(H===2000)F=-2/(K-Z),O=-(K+Z)/(K-Z);else if(H===2001)F=-1/(K-Z),O=-Z/(K-Z);else throw Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+H);return X[0]=U,X[4]=0,X[8]=0,X[12]=N,X[1]=0,X[5]=E,X[9]=0,X[13]=G,X[2]=0,X[6]=0,X[10]=F,X[14]=O,X[3]=0,X[7]=0,X[11]=0,X[15]=1,this}equals(J){let Q=this.elements,$=J.elements;for(let W=0;W<16;W++)if(Q[W]!==$[W])return!1;return!0}fromArray(J,Q=0){for(let $=0;$<16;$++)this.elements[$]=J[$+Q];return this}toArray(J=[],Q=0){let $=this.elements;return J[Q]=$[0],J[Q+1]=$[1],J[Q+2]=$[2],J[Q+3]=$[3],J[Q+4]=$[4],J[Q+5]=$[5],J[Q+6]=$[6],J[Q+7]=$[7],J[Q+8]=$[8],J[Q+9]=$[9],J[Q+10]=$[10],J[Q+11]=$[11],J[Q+12]=$[12],J[Q+13]=$[13],J[Q+14]=$[14],J[Q+15]=$[15],J}}var Y6=new h,s8=new Z8,YH=new h(0,0,0),XH=new h(1,1,1),z9=new h,W7=new h,v8=new h,qW=new Z8,FW=new R9;class w9{constructor(J=0,Q=0,$=0,W=w9.DEFAULT_ORDER){this.isEuler=!0,this._x=J,this._y=Q,this._z=$,this._order=W}get x(){return this._x}set x(J){this._x=J,this._onChangeCallback()}get y(){return this._y}set y(J){this._y=J,this._onChangeCallback()}get z(){return this._z}set z(J){this._z=J,this._onChangeCallback()}get order(){return this._order}set order(J){this._order=J,this._onChangeCallback()}set(J,Q,$,W=this._order){return this._x=J,this._y=Q,this._z=$,this._order=W,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(J){return this._x=J._x,this._y=J._y,this._z=J._z,this._order=J._order,this._onChangeCallback(),this}setFromRotationMatrix(J,Q=this._order,$=!0){let W=J.elements,Z=W[0],K=W[4],H=W[8],Y=W[1],X=W[5],U=W[9],E=W[2],N=W[6],G=W[10];switch(Q){case"XYZ":if(this._y=Math.asin(m0(H,-1,1)),Math.abs(H)<0.9999999)this._x=Math.atan2(-U,G),this._z=Math.atan2(-K,Z);else this._x=Math.atan2(N,X),this._z=0;break;case"YXZ":if(this._x=Math.asin(-m0(U,-1,1)),Math.abs(U)<0.9999999)this._y=Math.atan2(H,G),this._z=Math.atan2(Y,X);else this._y=Math.atan2(-E,Z),this._z=0;break;case"ZXY":if(this._x=Math.asin(m0(N,-1,1)),Math.abs(N)<0.9999999)this._y=Math.atan2(-E,G),this._z=Math.atan2(-K,X);else this._y=0,this._z=Math.atan2(Y,Z);break;case"ZYX":if(this._y=Math.asin(-m0(E,-1,1)),Math.abs(E)<0.9999999)this._x=Math.atan2(N,G),this._z=Math.atan2(Y,Z);else this._x=0,this._z=Math.atan2(-K,X);break;case"YZX":if(this._z=Math.asin(m0(Y,-1,1)),Math.abs(Y)<0.9999999)this._x=Math.atan2(-U,X),this._y=Math.atan2(-E,Z);else this._x=0,this._y=Math.atan2(H,G);break;case"XZY":if(this._z=Math.asin(-m0(K,-1,1)),Math.abs(K)<0.9999999)this._x=Math.atan2(N,X),this._y=Math.atan2(H,Z);else this._x=Math.atan2(-U,G),this._y=0;break;default:C0("Euler: .setFromRotationMatrix() encountered an unknown order: "+Q)}if(this._order=Q,$===!0)this._onChangeCallback();return this}setFromQuaternion(J,Q,$){return qW.makeRotationFromQuaternion(J),this.setFromRotationMatrix(qW,Q,$)}setFromVector3(J,Q=this._order){return this.set(J.x,J.y,J.z,Q)}reorder(J){return FW.setFromEuler(this),this.setFromQuaternion(FW,J)}equals(J){return J._x===this._x&&J._y===this._y&&J._z===this._z&&J._order===this._order}fromArray(J){if(this._x=J[0],this._y=J[1],this._z=J[2],J[3]!==void 0)this._order=J[3];return this._onChangeCallback(),this}toArray(J=[],Q=0){return J[Q]=this._x,J[Q+1]=this._y,J[Q+2]=this._z,J[Q+3]=this._order,J}_onChange(J){return this._onChangeCallback=J,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}w9.DEFAULT_ORDER="XYZ";class n7{constructor(){this.mask=1}set(J){this.mask=(1<<J|0)>>>0}enable(J){this.mask|=1<<J|0}enableAll(){this.mask=-1}toggle(J){this.mask^=1<<J|0}disable(J){this.mask&=~(1<<J|0)}disableAll(){this.mask=0}test(J){return(this.mask&J.mask)!==0}isEnabled(J){return(this.mask&(1<<J|0))!==0}}var UH=0,DW=new h,X6=new R9,X9=new Z8,Z7=new h,v6=new h,GH=new h,NH=new R9,OW=new h(1,0,0),MW=new h(0,1,0),RW=new h(0,0,1),kW={type:"added"},EH={type:"removed"},U6={type:"childadded",child:null},PJ={type:"childremoved",child:null};class I8 extends M9{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:UH++}),this.uuid=u6(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=I8.DEFAULT_UP.clone();let J=new h,Q=new w9,$=new R9,W=new h(1,1,1);function Z(){$.setFromEuler(Q,!1)}function K(){Q.setFromQuaternion($,void 0,!1)}Q._onChange(Z),$._onChange(K),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:J},rotation:{configurable:!0,enumerable:!0,value:Q},quaternion:{configurable:!0,enumerable:!0,value:$},scale:{configurable:!0,enumerable:!0,value:W},modelViewMatrix:{value:new Z8},normalMatrix:{value:new w0}}),this.matrix=new Z8,this.matrixWorld=new Z8,this.matrixAutoUpdate=I8.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=I8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new n7,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(J){if(this.matrixAutoUpdate)this.updateMatrix();this.matrix.premultiply(J),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(J){return this.quaternion.premultiply(J),this}setRotationFromAxisAngle(J,Q){this.quaternion.setFromAxisAngle(J,Q)}setRotationFromEuler(J){this.quaternion.setFromEuler(J,!0)}setRotationFromMatrix(J){this.quaternion.setFromRotationMatrix(J)}setRotationFromQuaternion(J){this.quaternion.copy(J)}rotateOnAxis(J,Q){return X6.setFromAxisAngle(J,Q),this.quaternion.multiply(X6),this}rotateOnWorldAxis(J,Q){return X6.setFromAxisAngle(J,Q),this.quaternion.premultiply(X6),this}rotateX(J){return this.rotateOnAxis(OW,J)}rotateY(J){return this.rotateOnAxis(MW,J)}rotateZ(J){return this.rotateOnAxis(RW,J)}translateOnAxis(J,Q){return DW.copy(J).applyQuaternion(this.quaternion),this.position.add(DW.multiplyScalar(Q)),this}translateX(J){return this.translateOnAxis(OW,J)}translateY(J){return this.translateOnAxis(MW,J)}translateZ(J){return this.translateOnAxis(RW,J)}localToWorld(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(this.matrixWorld)}worldToLocal(J){return this.updateWorldMatrix(!0,!1),J.applyMatrix4(X9.copy(this.matrixWorld).invert())}lookAt(J,Q,$){if(J.isVector3)Z7.copy(J);else Z7.set(J,Q,$);let W=this.parent;if(this.updateWorldMatrix(!0,!1),v6.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight)X9.lookAt(v6,Z7,this.up);else X9.lookAt(Z7,v6,this.up);if(this.quaternion.setFromRotationMatrix(X9),W)X9.extractRotation(W.matrixWorld),X6.setFromRotationMatrix(X9),this.quaternion.premultiply(X6.invert())}add(J){if(arguments.length>1){for(let Q=0;Q<arguments.length;Q++)this.add(arguments[Q]);return this}if(J===this)return P0("Object3D.add: object can't be added as a child of itself.",J),this;if(J&&J.isObject3D)J.removeFromParent(),J.parent=this,this.children.push(J),J.dispatchEvent(kW),U6.child=J,this.dispatchEvent(U6),U6.child=null;else P0("Object3D.add: object not an instance of THREE.Object3D.",J);return this}remove(J){if(arguments.length>1){for(let $=0;$<arguments.length;$++)this.remove(arguments[$]);return this}let Q=this.children.indexOf(J);if(Q!==-1)J.parent=null,this.children.splice(Q,1),J.dispatchEvent(EH),PJ.child=J,this.dispatchEvent(PJ),PJ.child=null;return this}removeFromParent(){let J=this.parent;if(J!==null)J.remove(this);return this}clear(){return this.remove(...this.children)}attach(J){if(this.updateWorldMatrix(!0,!1),X9.copy(this.matrixWorld).invert(),J.parent!==null)J.parent.updateWorldMatrix(!0,!1),X9.multiply(J.parent.matrixWorld);return J.applyMatrix4(X9),J.removeFromParent(),J.parent=this,this.children.push(J),J.updateWorldMatrix(!1,!0),J.dispatchEvent(kW),U6.child=J,this.dispatchEvent(U6),U6.child=null,this}getObjectById(J){return this.getObjectByProperty("id",J)}getObjectByName(J){return this.getObjectByProperty("name",J)}getObjectByProperty(J,Q){if(this[J]===Q)return this;for(let $=0,W=this.children.length;$<W;$++){let K=this.children[$].getObjectByProperty(J,Q);if(K!==void 0)return K}return}getObjectsByProperty(J,Q,$=[]){if(this[J]===Q)$.push(this);let W=this.children;for(let Z=0,K=W.length;Z<K;Z++)W[Z].getObjectsByProperty(J,Q,$);return $}getWorldPosition(J){return this.updateWorldMatrix(!0,!1),J.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(v6,J,GH),J}getWorldScale(J){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(v6,NH,J),J}getWorldDirection(J){this.updateWorldMatrix(!0,!1);let Q=this.matrixWorld.elements;return J.set(Q[8],Q[9],Q[10]).normalize()}raycast(){}traverse(J){J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverse(J)}traverseVisible(J){if(this.visible===!1)return;J(this);let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].traverseVisible(J)}traverseAncestors(J){let Q=this.parent;if(Q!==null)J(Q),Q.traverseAncestors(J)}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let J=this.pivot;if(J!==null){let{x:Q,y:$,z:W}=J,Z=this.matrix.elements;Z[12]+=Q-Z[0]*Q-Z[4]*$-Z[8]*W,Z[13]+=$-Z[1]*Q-Z[5]*$-Z[9]*W,Z[14]+=W-Z[2]*Q-Z[6]*$-Z[10]*W}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(J){if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||J){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,J=!0}let Q=this.children;for(let $=0,W=Q.length;$<W;$++)Q[$].updateMatrixWorld(J)}updateWorldMatrix(J,Q,$=!1){let W=this.parent;if(J===!0&&W!==null)W.updateWorldMatrix(!0,!1);if(this.matrixAutoUpdate)this.updateMatrix();if(this.matrixWorldNeedsUpdate||$){if(this.matrixWorldAutoUpdate===!0)if(this.parent===null)this.matrixWorld.copy(this.matrix);else this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix);this.matrixWorldNeedsUpdate=!1,$=!0}if(Q===!0){let Z=this.children;for(let K=0,H=Z.length;K<H;K++)Z[K].updateWorldMatrix(!1,!0,$)}}toJSON(J){let Q=J===void 0||typeof J==="string",$={};if(Q)J={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},$.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"};let W={};if(W.uuid=this.uuid,W.type=this.type,this.name!=="")W.name=this.name;if(this.castShadow===!0)W.castShadow=!0;if(this.receiveShadow===!0)W.receiveShadow=!0;if(this.visible===!1)W.visible=!1;if(this.frustumCulled===!1)W.frustumCulled=!1;if(this.renderOrder!==0)W.renderOrder=this.renderOrder;if(this.static!==!1)W.static=this.static;if(Object.keys(this.userData).length>0)W.userData=this.userData;if(W.layers=this.layers.mask,W.matrix=this.matrix.toArray(),W.up=this.up.toArray(),this.pivot!==null)W.pivot=this.pivot.toArray();if(this.matrixAutoUpdate===!1)W.matrixAutoUpdate=!1;if(this.morphTargetDictionary!==void 0)W.morphTargetDictionary=Object.assign({},this.morphTargetDictionary);if(this.morphTargetInfluences!==void 0)W.morphTargetInfluences=this.morphTargetInfluences.slice();if(this.isInstancedMesh){if(W.type="InstancedMesh",W.count=this.count,W.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null)W.instanceColor=this.instanceColor.toJSON()}if(this.isBatchedMesh){if(W.type="BatchedMesh",W.perObjectFrustumCulled=this.perObjectFrustumCulled,W.sortObjects=this.sortObjects,W.drawRanges=this._drawRanges,W.reservedRanges=this._reservedRanges,W.geometryInfo=this._geometryInfo.map((H)=>({...H,boundingBox:H.boundingBox?H.boundingBox.toJSON():void 0,boundingSphere:H.boundingSphere?H.boundingSphere.toJSON():void 0})),W.instanceInfo=this._instanceInfo.map((H)=>({...H})),W.availableInstanceIds=this._availableInstanceIds.slice(),W.availableGeometryIds=this._availableGeometryIds.slice(),W.nextIndexStart=this._nextIndexStart,W.nextVertexStart=this._nextVertexStart,W.geometryCount=this._geometryCount,W.maxInstanceCount=this._maxInstanceCount,W.maxVertexCount=this._maxVertexCount,W.maxIndexCount=this._maxIndexCount,W.geometryInitialized=this._geometryInitialized,W.matricesTexture=this._matricesTexture.toJSON(J),W.indirectTexture=this._indirectTexture.toJSON(J),this._colorsTexture!==null)W.colorsTexture=this._colorsTexture.toJSON(J);if(this.boundingSphere!==null)W.boundingSphere=this.boundingSphere.toJSON();if(this.boundingBox!==null)W.boundingBox=this.boundingBox.toJSON()}function Z(H,Y){if(H[Y.uuid]===void 0)H[Y.uuid]=Y.toJSON(J);return Y.uuid}if(this.isScene){if(this.background){if(this.background.isColor)W.background=this.background.toJSON();else if(this.background.isTexture)W.background=this.background.toJSON(J).uuid}if(this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0)W.environment=this.environment.toJSON(J).uuid}else if(this.isMesh||this.isLine||this.isPoints){W.geometry=Z(J.geometries,this.geometry);let H=this.geometry.parameters;if(H!==void 0&&H.shapes!==void 0){let Y=H.shapes;if(Array.isArray(Y))for(let X=0,U=Y.length;X<U;X++){let E=Y[X];Z(J.shapes,E)}else Z(J.shapes,Y)}}if(this.isSkinnedMesh){if(W.bindMode=this.bindMode,W.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0)Z(J.skeletons,this.skeleton),W.skeleton=this.skeleton.uuid}if(this.material!==void 0)if(Array.isArray(this.material)){let H=[];for(let Y=0,X=this.material.length;Y<X;Y++)H.push(Z(J.materials,this.material[Y]));W.material=H}else W.material=Z(J.materials,this.material);if(this.children.length>0){W.children=[];for(let H=0;H<this.children.length;H++)W.children.push(this.children[H].toJSON(J).object)}if(this.animations.length>0){W.animations=[];for(let H=0;H<this.animations.length;H++){let Y=this.animations[H];W.animations.push(Z(J.animations,Y))}}if(Q){let H=K(J.geometries),Y=K(J.materials),X=K(J.textures),U=K(J.images),E=K(J.shapes),N=K(J.skeletons),G=K(J.animations),F=K(J.nodes);if(H.length>0)$.geometries=H;if(Y.length>0)$.materials=Y;if(X.length>0)$.textures=X;if(U.length>0)$.images=U;if(E.length>0)$.shapes=E;if(N.length>0)$.skeletons=N;if(G.length>0)$.animations=G;if(F.length>0)$.nodes=F}return $.object=W,$;function K(H){let Y=[];for(let X in H){let U=H[X];delete U.metadata,Y.push(U)}return Y}}clone(J){return new this.constructor().copy(this,J)}copy(J,Q=!0){if(this.name=J.name,this.up.copy(J.up),this.position.copy(J.position),this.rotation.order=J.rotation.order,this.quaternion.copy(J.quaternion),this.scale.copy(J.scale),this.pivot=J.pivot!==null?J.pivot.clone():null,this.matrix.copy(J.matrix),this.matrixWorld.copy(J.matrixWorld),this.matrixAutoUpdate=J.matrixAutoUpdate,this.matrixWorldAutoUpdate=J.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=J.matrixWorldNeedsUpdate,this.layers.mask=J.layers.mask,this.visible=J.visible,this.castShadow=J.castShadow,this.receiveShadow=J.receiveShadow,this.frustumCulled=J.frustumCulled,this.renderOrder=J.renderOrder,this.static=J.static,this.animations=J.animations.slice(),this.userData=JSON.parse(JSON.stringify(J.userData)),Q===!0)for(let $=0;$<J.children.length;$++){let W=J.children[$];this.add(W.clone())}return this}}I8.DEFAULT_UP=new h(0,1,0);I8.DEFAULT_MATRIX_AUTO_UPDATE=!0;I8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class R6 extends I8{constructor(){super();this.isGroup=!0,this.type="Group"}}var qH={type:"move"};class n6{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){if(this._hand===null)this._hand=new R6,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1};return this._hand}getTargetRaySpace(){if(this._targetRay===null)this._targetRay=new R6,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new h,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new h;return this._targetRay}getGripSpace(){if(this._grip===null)this._grip=new R6,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new h,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new h,this._grip.eventsEnabled=!1;return this._grip}dispatchEvent(J){if(this._targetRay!==null)this._targetRay.dispatchEvent(J);if(this._grip!==null)this._grip.dispatchEvent(J);if(this._hand!==null)this._hand.dispatchEvent(J);return this}connect(J){if(J&&J.hand){let Q=this._hand;if(Q)for(let $ of J.hand.values())this._getHandJoint(Q,$)}return this.dispatchEvent({type:"connected",data:J}),this}disconnect(J){if(this.dispatchEvent({type:"disconnected",data:J}),this._targetRay!==null)this._targetRay.visible=!1;if(this._grip!==null)this._grip.visible=!1;if(this._hand!==null)this._hand.visible=!1;return this}update(J,Q,$){let W=null,Z=null,K=null,H=this._targetRay,Y=this._grip,X=this._hand;if(J&&Q.session.visibilityState!=="visible-blurred"){if(X&&J.hand){K=!0;for(let O of J.hand.values()){let V=Q.getJointPose(O,$),D=this._getHandJoint(X,O);if(V!==null)D.matrix.fromArray(V.transform.matrix),D.matrix.decompose(D.position,D.rotation,D.scale),D.matrixWorldNeedsUpdate=!0,D.jointRadius=V.radius;D.visible=V!==null}let U=X.joints["index-finger-tip"],E=X.joints["thumb-tip"],N=U.position.distanceTo(E.position),G=0.02,F=0.005;if(X.inputState.pinching&&N>G+F)X.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:J.handedness,target:this});else if(!X.inputState.pinching&&N<=G-F)X.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:J.handedness,target:this})}else if(Y!==null&&J.gripSpace){if(Z=Q.getPose(J.gripSpace,$),Z!==null){if(Y.matrix.fromArray(Z.transform.matrix),Y.matrix.decompose(Y.position,Y.rotation,Y.scale),Y.matrixWorldNeedsUpdate=!0,Z.linearVelocity)Y.hasLinearVelocity=!0,Y.linearVelocity.copy(Z.linearVelocity);else Y.hasLinearVelocity=!1;if(Z.angularVelocity)Y.hasAngularVelocity=!0,Y.angularVelocity.copy(Z.angularVelocity);else Y.hasAngularVelocity=!1;if(Y.eventsEnabled)Y.dispatchEvent({type:"gripUpdated",data:J,target:this})}}if(H!==null){if(W=Q.getPose(J.targetRaySpace,$),W===null&&Z!==null)W=Z;if(W!==null){if(H.matrix.fromArray(W.transform.matrix),H.matrix.decompose(H.position,H.rotation,H.scale),H.matrixWorldNeedsUpdate=!0,W.linearVelocity)H.hasLinearVelocity=!0,H.linearVelocity.copy(W.linearVelocity);else H.hasLinearVelocity=!1;if(W.angularVelocity)H.hasAngularVelocity=!0,H.angularVelocity.copy(W.angularVelocity);else H.hasAngularVelocity=!1;this.dispatchEvent(qH)}}}if(H!==null)H.visible=W!==null;if(Y!==null)Y.visible=Z!==null;if(X!==null)X.visible=K!==null;return this}_getHandJoint(J,Q){if(J.joints[Q.jointName]===void 0){let $=new R6;$.matrixAutoUpdate=!1,$.visible=!1,J.joints[Q.jointName]=$,J.add($)}return J.joints[Q.jointName]}}var jZ={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},I9={h:0,s:0,l:0},K7={h:0,s:0,l:0};function wJ(J,Q,$){if($<0)$+=1;if($>1)$-=1;if($<0.16666666666666666)return J+(Q-J)*6*$;if($<0.5)return Q;if($<0.6666666666666666)return J+(Q-J)*6*(0.6666666666666666-$);return J}class p0{constructor(J,Q,$){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(J,Q,$)}set(J,Q,$){if(Q===void 0&&$===void 0){let W=J;if(W&&W.isColor)this.copy(W);else if(typeof W==="number")this.setHex(W);else if(typeof W==="string")this.setStyle(W)}else this.setRGB(J,Q,$);return this}setScalar(J){return this.r=J,this.g=J,this.b=J,this}setHex(J,Q="srgb"){return J=Math.floor(J),this.r=(J>>16&255)/255,this.g=(J>>8&255)/255,this.b=(J&255)/255,g0.colorSpaceToWorking(this,Q),this}setRGB(J,Q,$,W=g0.workingColorSpace){return this.r=J,this.g=Q,this.b=$,g0.colorSpaceToWorking(this,W),this}setHSL(J,Q,$,W=g0.workingColorSpace){if(J=WH(J,1),Q=m0(Q,0,1),$=m0($,0,1),Q===0)this.r=this.g=this.b=$;else{let Z=$<=0.5?$*(1+Q):$+Q-$*Q,K=2*$-Z;this.r=wJ(K,Z,J+0.3333333333333333),this.g=wJ(K,Z,J),this.b=wJ(K,Z,J-0.3333333333333333)}return g0.colorSpaceToWorking(this,W),this}setStyle(J,Q="srgb"){function $(Z){if(Z===void 0)return;if(parseFloat(Z)<1)C0("Color: Alpha component of "+J+" will be ignored.")}let W;if(W=/^(\w+)\(([^\)]*)\)/.exec(J)){let Z,K=W[1],H=W[2];switch(K){case"rgb":case"rgba":if(Z=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(255,parseInt(Z[1],10))/255,Math.min(255,parseInt(Z[2],10))/255,Math.min(255,parseInt(Z[3],10))/255,Q);if(Z=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setRGB(Math.min(100,parseInt(Z[1],10))/100,Math.min(100,parseInt(Z[2],10))/100,Math.min(100,parseInt(Z[3],10))/100,Q);break;case"hsl":case"hsla":if(Z=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(H))return $(Z[4]),this.setHSL(parseFloat(Z[1])/360,parseFloat(Z[2])/100,parseFloat(Z[3])/100,Q);break;default:C0("Color: Unknown color model "+J)}}else if(W=/^\#([A-Fa-f\d]+)$/.exec(J)){let Z=W[1],K=Z.length;if(K===3)return this.setRGB(parseInt(Z.charAt(0),16)/15,parseInt(Z.charAt(1),16)/15,parseInt(Z.charAt(2),16)/15,Q);else if(K===6)return this.setHex(parseInt(Z,16),Q);else C0("Color: Invalid hex color "+J)}else if(J&&J.length>0)return this.setColorName(J,Q);return this}setColorName(J,Q="srgb"){let $=jZ[J.toLowerCase()];if($!==void 0)this.setHex($,Q);else C0("Color: Unknown color "+J);return this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(J){return this.r=J.r,this.g=J.g,this.b=J.b,this}copySRGBToLinear(J){return this.r=F9(J.r),this.g=F9(J.g),this.b=F9(J.b),this}copyLinearToSRGB(J){return this.r=k6(J.r),this.g=k6(J.g),this.b=k6(J.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(J="srgb"){return g0.workingToColorSpace(B8.copy(this),J),Math.round(m0(B8.r*255,0,255))*65536+Math.round(m0(B8.g*255,0,255))*256+Math.round(m0(B8.b*255,0,255))}getHexString(J="srgb"){return("000000"+this.getHex(J).toString(16)).slice(-6)}getHSL(J,Q=g0.workingColorSpace){g0.workingToColorSpace(B8.copy(this),Q);let{r:$,g:W,b:Z}=B8,K=Math.max($,W,Z),H=Math.min($,W,Z),Y,X,U=(H+K)/2;if(H===K)Y=0,X=0;else{let E=K-H;switch(X=U<=0.5?E/(K+H):E/(2-K-H),K){case $:Y=(W-Z)/E+(W<Z?6:0);break;case W:Y=(Z-$)/E+2;break;case Z:Y=($-W)/E+4;break}Y/=6}return J.h=Y,J.s=X,J.l=U,J}getRGB(J,Q=g0.workingColorSpace){return g0.workingToColorSpace(B8.copy(this),Q),J.r=B8.r,J.g=B8.g,J.b=B8.b,J}getStyle(J="srgb"){g0.workingToColorSpace(B8.copy(this),J);let{r:Q,g:$,b:W}=B8;if(J!=="srgb")return`color(${J} ${Q.toFixed(3)} ${$.toFixed(3)} ${W.toFixed(3)})`;return`rgb(${Math.round(Q*255)},${Math.round($*255)},${Math.round(W*255)})`}offsetHSL(J,Q,$){return this.getHSL(I9),this.setHSL(I9.h+J,I9.s+Q,I9.l+$)}add(J){return this.r+=J.r,this.g+=J.g,this.b+=J.b,this}addColors(J,Q){return this.r=J.r+Q.r,this.g=J.g+Q.g,this.b=J.b+Q.b,this}addScalar(J){return this.r+=J,this.g+=J,this.b+=J,this}sub(J){return this.r=Math.max(0,this.r-J.r),this.g=Math.max(0,this.g-J.g),this.b=Math.max(0,this.b-J.b),this}multiply(J){return this.r*=J.r,this.g*=J.g,this.b*=J.b,this}multiplyScalar(J){return this.r*=J,this.g*=J,this.b*=J,this}lerp(J,Q){return this.r+=(J.r-this.r)*Q,this.g+=(J.g-this.g)*Q,this.b+=(J.b-this.b)*Q,this}lerpColors(J,Q,$){return this.r=J.r+(Q.r-J.r)*$,this.g=J.g+(Q.g-J.g)*$,this.b=J.b+(Q.b-J.b)*$,this}lerpHSL(J,Q){this.getHSL(I9),J.getHSL(K7);let $=zJ(I9.h,K7.h,Q),W=zJ(I9.s,K7.s,Q),Z=zJ(I9.l,K7.l,Q);return this.setHSL($,W,Z),this}setFromVector3(J){return this.r=J.x,this.g=J.y,this.b=J.z,this}applyMatrix3(J){let Q=this.r,$=this.g,W=this.b,Z=J.elements;return this.r=Z[0]*Q+Z[3]*$+Z[6]*W,this.g=Z[1]*Q+Z[4]*$+Z[7]*W,this.b=Z[2]*Q+Z[5]*$+Z[8]*W,this}equals(J){return J.r===this.r&&J.g===this.g&&J.b===this.b}fromArray(J,Q=0){return this.r=J[Q],this.g=J[Q+1],this.b=J[Q+2],this}toArray(J=[],Q=0){return J[Q]=this.r,J[Q+1]=this.g,J[Q+2]=this.b,J}fromBufferAttribute(J,Q){return this.r=J.getX(Q),this.g=J.getY(Q),this.b=J.getZ(Q),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}var B8=new p0;p0.NAMES=jZ;class s7 extends I8{constructor(){super();if(this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new w9,this.environmentIntensity=1,this.environmentRotation=new w9,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(J,Q){if(super.copy(J,Q),J.background!==null)this.background=J.background.clone();if(J.environment!==null)this.environment=J.environment.clone();if(J.fog!==null)this.fog=J.fog.clone();if(this.backgroundBlurriness=J.backgroundBlurriness,this.backgroundIntensity=J.backgroundIntensity,this.backgroundRotation.copy(J.backgroundRotation),this.environmentIntensity=J.environmentIntensity,this.environmentRotation.copy(J.environmentRotation),J.overrideMaterial!==null)this.overrideMaterial=J.overrideMaterial.clone();return this.matrixAutoUpdate=J.matrixAutoUpdate,this}toJSON(J){let Q=super.toJSON(J);if(this.fog!==null)Q.object.fog=this.fog.toJSON();if(this.backgroundBlurriness>0)Q.object.backgroundBlurriness=this.backgroundBlurriness;if(this.backgroundIntensity!==1)Q.object.backgroundIntensity=this.backgroundIntensity;if(Q.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1)Q.object.environmentIntensity=this.environmentIntensity;return Q.object.environmentRotation=this.environmentRotation.toArray(),Q}}var i8=new h,U9=new h,TJ=new h,G9=new h,G6=new h,N6=new h,LW=new h,SJ=new h,jJ=new h,vJ=new h,fJ=new K8,yJ=new K8,bJ=new K8;class u8{constructor(J=new h,Q=new h,$=new h){this.a=J,this.b=Q,this.c=$}static getNormal(J,Q,$,W){W.subVectors($,Q),i8.subVectors(J,Q),W.cross(i8);let Z=W.lengthSq();if(Z>0)return W.multiplyScalar(1/Math.sqrt(Z));return W.set(0,0,0)}static getBarycoord(J,Q,$,W,Z){i8.subVectors(W,Q),U9.subVectors($,Q),TJ.subVectors(J,Q);let K=i8.dot(i8),H=i8.dot(U9),Y=i8.dot(TJ),X=U9.dot(U9),U=U9.dot(TJ),E=K*X-H*H;if(E===0)return Z.set(0,0,0),null;let N=1/E,G=(X*Y-H*U)*N,F=(K*U-H*Y)*N;return Z.set(1-G-F,F,G)}static containsPoint(J,Q,$,W){if(this.getBarycoord(J,Q,$,W,G9)===null)return!1;return G9.x>=0&&G9.y>=0&&G9.x+G9.y<=1}static getInterpolation(J,Q,$,W,Z,K,H,Y){if(this.getBarycoord(J,Q,$,W,G9)===null){if(Y.x=0,Y.y=0,"z"in Y)Y.z=0;if("w"in Y)Y.w=0;return null}return Y.setScalar(0),Y.addScaledVector(Z,G9.x),Y.addScaledVector(K,G9.y),Y.addScaledVector(H,G9.z),Y}static getInterpolatedAttribute(J,Q,$,W,Z,K){return fJ.setScalar(0),yJ.setScalar(0),bJ.setScalar(0),fJ.fromBufferAttribute(J,Q),yJ.fromBufferAttribute(J,$),bJ.fromBufferAttribute(J,W),K.setScalar(0),K.addScaledVector(fJ,Z.x),K.addScaledVector(yJ,Z.y),K.addScaledVector(bJ,Z.z),K}static isFrontFacing(J,Q,$,W){return i8.subVectors($,Q),U9.subVectors(J,Q),i8.cross(U9).dot(W)<0}set(J,Q,$){return this.a.copy(J),this.b.copy(Q),this.c.copy($),this}setFromPointsAndIndices(J,Q,$,W){return this.a.copy(J[Q]),this.b.copy(J[$]),this.c.copy(J[W]),this}setFromAttributeAndIndices(J,Q,$,W){return this.a.fromBufferAttribute(J,Q),this.b.fromBufferAttribute(J,$),this.c.fromBufferAttribute(J,W),this}clone(){return new this.constructor().copy(this)}copy(J){return this.a.copy(J.a),this.b.copy(J.b),this.c.copy(J.c),this}getArea(){return i8.subVectors(this.c,this.b),U9.subVectors(this.a,this.b),i8.cross(U9).length()*0.5}getMidpoint(J){return J.addVectors(this.a,this.b).add(this.c).multiplyScalar(0.3333333333333333)}getNormal(J){return u8.getNormal(this.a,this.b,this.c,J)}getPlane(J){return J.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(J,Q){return u8.getBarycoord(J,this.a,this.b,this.c,Q)}getInterpolation(J,Q,$,W,Z){return u8.getInterpolation(J,this.a,this.b,this.c,Q,$,W,Z)}containsPoint(J){return u8.containsPoint(J,this.a,this.b,this.c)}isFrontFacing(J){return u8.isFrontFacing(this.a,this.b,this.c,J)}intersectsBox(J){return J.intersectsTriangle(this)}closestPointToPoint(J,Q){let $=this.a,W=this.b,Z=this.c,K,H;G6.subVectors(W,$),N6.subVectors(Z,$),SJ.subVectors(J,$);let Y=G6.dot(SJ),X=N6.dot(SJ);if(Y<=0&&X<=0)return Q.copy($);jJ.subVectors(J,W);let U=G6.dot(jJ),E=N6.dot(jJ);if(U>=0&&E<=U)return Q.copy(W);let N=Y*E-U*X;if(N<=0&&Y>=0&&U<=0)return K=Y/(Y-U),Q.copy($).addScaledVector(G6,K);vJ.subVectors(J,Z);let G=G6.dot(vJ),F=N6.dot(vJ);if(F>=0&&G<=F)return Q.copy(Z);let O=G*X-Y*F;if(O<=0&&X>=0&&F<=0)return H=X/(X-F),Q.copy($).addScaledVector(N6,H);let V=U*F-G*E;if(V<=0&&E-U>=0&&G-F>=0)return LW.subVectors(Z,W),H=(E-U)/(E-U+(G-F)),Q.copy(W).addScaledVector(LW,H);let D=1/(V+O+N);return K=O*D,H=N*D,Q.copy($).addScaledVector(G6,K).addScaledVector(N6,H)}equals(J){return J.a.equals(this.a)&&J.b.equals(this.b)&&J.c.equals(this.c)}}class i9{constructor(J=new h(1/0,1/0,1/0),Q=new h(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=J,this.max=Q}set(J,Q){return this.min.copy(J),this.max.copy(Q),this}setFromArray(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q+=3)this.expandByPoint(o8.fromArray(J,Q));return this}setFromBufferAttribute(J){this.makeEmpty();for(let Q=0,$=J.count;Q<$;Q++)this.expandByPoint(o8.fromBufferAttribute(J,Q));return this}setFromPoints(J){this.makeEmpty();for(let Q=0,$=J.length;Q<$;Q++)this.expandByPoint(J[Q]);return this}setFromCenterAndSize(J,Q){let $=o8.copy(Q).multiplyScalar(0.5);return this.min.copy(J).sub($),this.max.copy(J).add($),this}setFromObject(J,Q=!1){return this.makeEmpty(),this.expandByObject(J,Q)}clone(){return new this.constructor().copy(this)}copy(J){return this.min.copy(J.min),this.max.copy(J.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(J){return this.isEmpty()?J.set(0,0,0):J.addVectors(this.min,this.max).multiplyScalar(0.5)}getSize(J){return this.isEmpty()?J.set(0,0,0):J.subVectors(this.max,this.min)}expandByPoint(J){return this.min.min(J),this.max.max(J),this}expandByVector(J){return this.min.sub(J),this.max.add(J),this}expandByScalar(J){return this.min.addScalar(-J),this.max.addScalar(J),this}expandByObject(J,Q=!1){J.updateWorldMatrix(!1,!1);let $=J.geometry;if($!==void 0){let Z=$.getAttribute("position");if(Q===!0&&Z!==void 0&&J.isInstancedMesh!==!0)for(let K=0,H=Z.count;K<H;K++){if(J.isMesh===!0)J.getVertexPosition(K,o8);else o8.fromBufferAttribute(Z,K);o8.applyMatrix4(J.matrixWorld),this.expandByPoint(o8)}else{if(J.boundingBox!==void 0){if(J.boundingBox===null)J.computeBoundingBox();H7.copy(J.boundingBox)}else{if($.boundingBox===null)$.computeBoundingBox();H7.copy($.boundingBox)}H7.applyMatrix4(J.matrixWorld),this.union(H7)}}let W=J.children;for(let Z=0,K=W.length;Z<K;Z++)this.expandByObject(W[Z],Q);return this}containsPoint(J){return J.x>=this.min.x&&J.x<=this.max.x&&J.y>=this.min.y&&J.y<=this.max.y&&J.z>=this.min.z&&J.z<=this.max.z}containsBox(J){return this.min.x<=J.min.x&&J.max.x<=this.max.x&&this.min.y<=J.min.y&&J.max.y<=this.max.y&&this.min.z<=J.min.z&&J.max.z<=this.max.z}getParameter(J,Q){return Q.set((J.x-this.min.x)/(this.max.x-this.min.x),(J.y-this.min.y)/(this.max.y-this.min.y),(J.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(J){return J.max.x>=this.min.x&&J.min.x<=this.max.x&&J.max.y>=this.min.y&&J.min.y<=this.max.y&&J.max.z>=this.min.z&&J.min.z<=this.max.z}intersectsSphere(J){return this.clampPoint(J.center,o8),o8.distanceToSquared(J.center)<=J.radius*J.radius}intersectsPlane(J){let Q,$;if(J.normal.x>0)Q=J.normal.x*this.min.x,$=J.normal.x*this.max.x;else Q=J.normal.x*this.max.x,$=J.normal.x*this.min.x;if(J.normal.y>0)Q+=J.normal.y*this.min.y,$+=J.normal.y*this.max.y;else Q+=J.normal.y*this.max.y,$+=J.normal.y*this.min.y;if(J.normal.z>0)Q+=J.normal.z*this.min.z,$+=J.normal.z*this.max.z;else Q+=J.normal.z*this.max.z,$+=J.normal.z*this.min.z;return Q<=-J.constant&&$>=-J.constant}intersectsTriangle(J){if(this.isEmpty())return!1;this.getCenter(f6),Y7.subVectors(this.max,f6),E6.subVectors(J.a,f6),q6.subVectors(J.b,f6),F6.subVectors(J.c,f6),_9.subVectors(q6,E6),C9.subVectors(F6,q6),h9.subVectors(E6,F6);let Q=[0,-_9.z,_9.y,0,-C9.z,C9.y,0,-h9.z,h9.y,_9.z,0,-_9.x,C9.z,0,-C9.x,h9.z,0,-h9.x,-_9.y,_9.x,0,-C9.y,C9.x,0,-h9.y,h9.x,0];if(!hJ(Q,E6,q6,F6,Y7))return!1;if(Q=[1,0,0,0,1,0,0,0,1],!hJ(Q,E6,q6,F6,Y7))return!1;return X7.crossVectors(_9,C9),Q=[X7.x,X7.y,X7.z],hJ(Q,E6,q6,F6,Y7)}clampPoint(J,Q){return Q.copy(J).clamp(this.min,this.max)}distanceToPoint(J){return this.clampPoint(J,o8).distanceTo(J)}getBoundingSphere(J){if(this.isEmpty())J.makeEmpty();else this.getCenter(J.center),J.radius=this.getSize(o8).length()*0.5;return J}intersect(J){if(this.min.max(J.min),this.max.min(J.max),this.isEmpty())this.makeEmpty();return this}union(J){return this.min.min(J.min),this.max.max(J.max),this}applyMatrix4(J){if(this.isEmpty())return this;return N9[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(J),N9[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(J),N9[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(J),N9[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(J),N9[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(J),N9[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(J),N9[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(J),N9[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(J),this.setFromPoints(N9),this}translate(J){return this.min.add(J),this.max.add(J),this}equals(J){return J.min.equals(this.min)&&J.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(J){return this.min.fromArray(J.min),this.max.fromArray(J.max),this}}var N9=[new h,new h,new h,new h,new h,new h,new h,new h],o8=new h,H7=new i9,E6=new h,q6=new h,F6=new h,_9=new h,C9=new h,h9=new h,f6=new h,Y7=new h,X7=new h,x9=new h;function hJ(J,Q,$,W,Z){for(let K=0,H=J.length-3;K<=H;K+=3){x9.fromArray(J,K);let Y=Z.x*Math.abs(x9.x)+Z.y*Math.abs(x9.y)+Z.z*Math.abs(x9.z),X=Q.dot(x9),U=$.dot(x9),E=W.dot(x9);if(Math.max(-Math.max(X,U,E),Math.min(X,U,E))>Y)return!1}return!0}var N8=new h,U7=new n0,FH=0;class R8 extends M9{constructor(J,Q,$=!1){super();if(Array.isArray(J))throw TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:FH++}),this.name="",this.array=J,this.itemSize=Q,this.count=J!==void 0?J.length/Q:0,this.normalized=$,this.usage=35044,this.updateRanges=[],this.gpuType=1015,this.version=0}onUploadCallback(){}set needsUpdate(J){if(J===!0)this.version++}setUsage(J){return this.usage=J,this}addUpdateRange(J,Q){this.updateRanges.push({start:J,count:Q})}clearUpdateRanges(){this.updateRanges.length=0}copy(J){return this.name=J.name,this.array=new J.array.constructor(J.array),this.itemSize=J.itemSize,this.count=J.count,this.normalized=J.normalized,this.usage=J.usage,this.gpuType=J.gpuType,this}copyAt(J,Q,$){J*=this.itemSize,$*=Q.itemSize;for(let W=0,Z=this.itemSize;W<Z;W++)this.array[J+W]=Q.array[$+W];return this}copyArray(J){return this.array.set(J),this}applyMatrix3(J){if(this.itemSize===2)for(let Q=0,$=this.count;Q<$;Q++)U7.fromBufferAttribute(this,Q),U7.applyMatrix3(J),this.setXY(Q,U7.x,U7.y);else if(this.itemSize===3)for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyMatrix3(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}applyMatrix4(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyMatrix4(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}applyNormalMatrix(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.applyNormalMatrix(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}transformDirection(J){for(let Q=0,$=this.count;Q<$;Q++)N8.fromBufferAttribute(this,Q),N8.transformDirection(J),this.setXYZ(Q,N8.x,N8.y,N8.z);return this}set(J,Q=0){return this.array.set(J,Q),this}getComponent(J,Q){let $=this.array[J*this.itemSize+Q];if(this.normalized)$=j6($,this.array);return $}setComponent(J,Q,$){if(this.normalized)$=P8($,this.array);return this.array[J*this.itemSize+Q]=$,this}getX(J){let Q=this.array[J*this.itemSize];if(this.normalized)Q=j6(Q,this.array);return Q}setX(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize]=Q,this}getY(J){let Q=this.array[J*this.itemSize+1];if(this.normalized)Q=j6(Q,this.array);return Q}setY(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize+1]=Q,this}getZ(J){let Q=this.array[J*this.itemSize+2];if(this.normalized)Q=j6(Q,this.array);return Q}setZ(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize+2]=Q,this}getW(J){let Q=this.array[J*this.itemSize+3];if(this.normalized)Q=j6(Q,this.array);return Q}setW(J,Q){if(this.normalized)Q=P8(Q,this.array);return this.array[J*this.itemSize+3]=Q,this}setXY(J,Q,$){if(J*=this.itemSize,this.normalized)Q=P8(Q,this.array),$=P8($,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this}setXYZ(J,Q,$,W){if(J*=this.itemSize,this.normalized)Q=P8(Q,this.array),$=P8($,this.array),W=P8(W,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this}setXYZW(J,Q,$,W,Z){if(J*=this.itemSize,this.normalized)Q=P8(Q,this.array),$=P8($,this.array),W=P8(W,this.array),Z=P8(Z,this.array);return this.array[J+0]=Q,this.array[J+1]=$,this.array[J+2]=W,this.array[J+3]=Z,this}onUpload(J){return this.onUploadCallback=J,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let J={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};if(this.name!=="")J.name=this.name;if(this.usage!==35044)J.usage=this.usage;return J}dispose(){this.dispatchEvent({type:"dispose"})}}class i7 extends R8{constructor(J,Q,$){super(new Uint16Array(J),Q,$)}}class o7 extends R8{constructor(J,Q,$){super(new Uint32Array(J),Q,$)}}class b8 extends R8{constructor(J,Q,$){super(new Float32Array(J),Q,$)}}var DH=new i9,y6=new h,xJ=new h;class o9{constructor(J=new h,Q=-1){this.isSphere=!0,this.center=J,this.radius=Q}set(J,Q){return this.center.copy(J),this.radius=Q,this}setFromPoints(J,Q){let $=this.center;if(Q!==void 0)$.copy(Q);else DH.setFromPoints(J).getCenter($);let W=0;for(let Z=0,K=J.length;Z<K;Z++)W=Math.max(W,$.distanceToSquared(J[Z]));return this.radius=Math.sqrt(W),this}copy(J){return this.center.copy(J.center),this.radius=J.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(J){return J.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(J){return J.distanceTo(this.center)-this.radius}intersectsSphere(J){let Q=this.radius+J.radius;return J.center.distanceToSquared(this.center)<=Q*Q}intersectsBox(J){return J.intersectsSphere(this)}intersectsPlane(J){return Math.abs(J.distanceToPoint(this.center))<=this.radius}clampPoint(J,Q){let $=this.center.distanceToSquared(J);if(Q.copy(J),$>this.radius*this.radius)Q.sub(this.center).normalize(),Q.multiplyScalar(this.radius).add(this.center);return Q}getBoundingBox(J){if(this.isEmpty())return J.makeEmpty(),J;return J.set(this.center,this.center),J.expandByScalar(this.radius),J}applyMatrix4(J){return this.center.applyMatrix4(J),this.radius=this.radius*J.getMaxScaleOnAxis(),this}translate(J){return this.center.add(J),this}expandByPoint(J){if(this.isEmpty())return this.center.copy(J),this.radius=0,this;y6.subVectors(J,this.center);let Q=y6.lengthSq();if(Q>this.radius*this.radius){let $=Math.sqrt(Q),W=($-this.radius)*0.5;this.center.addScaledVector(y6,W/$),this.radius+=W}return this}union(J){if(J.isEmpty())return this;if(this.isEmpty())return this.copy(J),this;if(this.center.equals(J.center)===!0)this.radius=Math.max(this.radius,J.radius);else xJ.subVectors(J.center,this.center).setLength(J.radius),this.expandByPoint(y6.copy(J.center).add(xJ)),this.expandByPoint(y6.copy(J.center).sub(xJ));return this}equals(J){return J.center.equals(this.center)&&J.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(J){return this.radius=J.radius,this.center.fromArray(J.center),this}}var OH=0,d8=new Z8,gJ=new I8,D6=new h,f8=new i9,b6=new i9,M8=new h;class C8 extends M9{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:OH++}),this.uuid=u6(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(J){if(Array.isArray(J))this.index=new((QH(J))?o7:i7)(J,1);else this.index=J;return this}setIndirect(J,Q=0){return this.indirect=J,this.indirectOffset=Q,this}getIndirect(){return this.indirect}getAttribute(J){return this.attributes[J]}setAttribute(J,Q){return this.attributes[J]=Q,this}deleteAttribute(J){return delete this.attributes[J],this}hasAttribute(J){return this.attributes[J]!==void 0}addGroup(J,Q,$=0){this.groups.push({start:J,count:Q,materialIndex:$})}clearGroups(){this.groups=[]}setDrawRange(J,Q){this.drawRange.start=J,this.drawRange.count=Q}applyMatrix4(J){let Q=this.attributes.position;if(Q!==void 0)Q.applyMatrix4(J),Q.needsUpdate=!0;let $=this.attributes.normal;if($!==void 0){let Z=new w0().getNormalMatrix(J);$.applyNormalMatrix(Z),$.needsUpdate=!0}let W=this.attributes.tangent;if(W!==void 0)W.transformDirection(J),W.needsUpdate=!0;if(this.boundingBox!==null)this.computeBoundingBox();if(this.boundingSphere!==null)this.computeBoundingSphere();return this._transformed=!0,this}applyQuaternion(J){return d8.makeRotationFromQuaternion(J),this.applyMatrix4(d8),this}rotateX(J){return d8.makeRotationX(J),this.applyMatrix4(d8),this}rotateY(J){return d8.makeRotationY(J),this.applyMatrix4(d8),this}rotateZ(J){return d8.makeRotationZ(J),this.applyMatrix4(d8),this}translate(J,Q,$){return d8.makeTranslation(J,Q,$),this.applyMatrix4(d8),this}scale(J,Q,$){return d8.makeScale(J,Q,$),this.applyMatrix4(d8),this}lookAt(J){return gJ.lookAt(J),gJ.updateMatrix(),this.applyMatrix4(gJ.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(D6).negate(),this.translate(D6.x,D6.y,D6.z),this}setFromPoints(J){let Q=this.getAttribute("position");if(Q===void 0){let $=[];for(let W=0,Z=J.length;W<Z;W++){let K=J[W];$.push(K.x,K.y,K.z||0)}this.setAttribute("position",new b8($,3))}else{let $=Math.min(J.length,Q.count);for(let W=0;W<$;W++){let Z=J[W];Q.setXYZ(W,Z.x,Z.y,Z.z||0)}if(J.length>Q.count)C0("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.");Q.needsUpdate=!0}return this}computeBoundingBox(){if(this.boundingBox===null)this.boundingBox=new i9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new h(-1/0,-1/0,-1/0),new h(1/0,1/0,1/0));return}if(J!==void 0){if(this.boundingBox.setFromBufferAttribute(J),Q)for(let $=0,W=Q.length;$<W;$++){let Z=Q[$];if(f8.setFromBufferAttribute(Z),this.morphTargetsRelative)M8.addVectors(this.boundingBox.min,f8.min),this.boundingBox.expandByPoint(M8),M8.addVectors(this.boundingBox.max,f8.max),this.boundingBox.expandByPoint(M8);else this.boundingBox.expandByPoint(f8.min),this.boundingBox.expandByPoint(f8.max)}}else this.boundingBox.makeEmpty();if(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))P0('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){if(this.boundingSphere===null)this.boundingSphere=new o9;let J=this.attributes.position,Q=this.morphAttributes.position;if(J&&J.isGLBufferAttribute){P0("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new h,1/0);return}if(J){let $=this.boundingSphere.center;if(f8.setFromBufferAttribute(J),Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z];if(b6.setFromBufferAttribute(H),this.morphTargetsRelative)M8.addVectors(f8.min,b6.min),f8.expandByPoint(M8),M8.addVectors(f8.max,b6.max),f8.expandByPoint(M8);else f8.expandByPoint(b6.min),f8.expandByPoint(b6.max)}f8.getCenter($);let W=0;for(let Z=0,K=J.count;Z<K;Z++)M8.fromBufferAttribute(J,Z),W=Math.max(W,$.distanceToSquared(M8));if(Q)for(let Z=0,K=Q.length;Z<K;Z++){let H=Q[Z],Y=this.morphTargetsRelative;for(let X=0,U=H.count;X<U;X++){if(M8.fromBufferAttribute(H,X),Y)D6.fromBufferAttribute(J,X),M8.add(D6);W=Math.max(W,$.distanceToSquared(M8))}}if(this.boundingSphere.radius=Math.sqrt(W),isNaN(this.boundingSphere.radius))P0('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let J=this.index,Q=this.attributes;if(J===null||Q.position===void 0||Q.normal===void 0||Q.uv===void 0){P0("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let{position:$,normal:W,uv:Z}=Q,K=this.getAttribute("tangent");if(K===void 0||K.count!==$.count)K=new R8(new Float32Array(4*$.count),4),this.setAttribute("tangent",K);let H=[],Y=[];for(let w=0;w<$.count;w++)H[w]=new h,Y[w]=new h;let X=new h,U=new h,E=new h,N=new n0,G=new n0,F=new n0,O=new h,V=new h;function D(w,R,z){X.fromBufferAttribute($,w),U.fromBufferAttribute($,R),E.fromBufferAttribute($,z),N.fromBufferAttribute(Z,w),G.fromBufferAttribute(Z,R),F.fromBufferAttribute(Z,z),U.sub(X),E.sub(X),G.sub(N),F.sub(N);let p=1/(G.x*F.y-F.x*G.y);if(!isFinite(p))return;O.copy(U).multiplyScalar(F.y).addScaledVector(E,-G.y).multiplyScalar(p),V.copy(E).multiplyScalar(G.x).addScaledVector(U,-F.x).multiplyScalar(p),H[w].add(O),H[R].add(O),H[z].add(O),Y[w].add(V),Y[R].add(V),Y[z].add(V)}let q=this.groups;if(q.length===0)q=[{start:0,count:J.count}];for(let w=0,R=q.length;w<R;++w){let z=q[w],p=z.start,P=z.count;for(let y=p,c=p+P;y<c;y+=3)D(J.getX(y+0),J.getX(y+1),J.getX(y+2))}let _=new h,A=new h,k=new h,I=new h;function C(w){k.fromBufferAttribute(W,w),I.copy(k);let R=H[w];_.copy(R),_.sub(k.multiplyScalar(k.dot(R))).normalize(),A.crossVectors(I,R);let p=A.dot(Y[w])<0?-1:1;K.setXYZW(w,_.x,_.y,_.z,p)}for(let w=0,R=q.length;w<R;++w){let z=q[w],p=z.start,P=z.count;for(let y=p,c=p+P;y<c;y+=3)C(J.getX(y+0)),C(J.getX(y+1)),C(J.getX(y+2))}this._transformed=!0}computeVertexNormals(){let J=this.index,Q=this.getAttribute("position");if(Q!==void 0){let $=this.getAttribute("normal");if($===void 0||$.count!==Q.count)$=new R8(new Float32Array(Q.count*3),3),this.setAttribute("normal",$);else for(let N=0,G=$.count;N<G;N++)$.setXYZ(N,0,0,0);let W=new h,Z=new h,K=new h,H=new h,Y=new h,X=new h,U=new h,E=new h;if(J)for(let N=0,G=J.count;N<G;N+=3){let F=J.getX(N+0),O=J.getX(N+1),V=J.getX(N+2);W.fromBufferAttribute(Q,F),Z.fromBufferAttribute(Q,O),K.fromBufferAttribute(Q,V),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),H.fromBufferAttribute($,F),Y.fromBufferAttribute($,O),X.fromBufferAttribute($,V),H.add(U),Y.add(U),X.add(U),$.setXYZ(F,H.x,H.y,H.z),$.setXYZ(O,Y.x,Y.y,Y.z),$.setXYZ(V,X.x,X.y,X.z)}else for(let N=0,G=Q.count;N<G;N+=3)W.fromBufferAttribute(Q,N+0),Z.fromBufferAttribute(Q,N+1),K.fromBufferAttribute(Q,N+2),U.subVectors(K,Z),E.subVectors(W,Z),U.cross(E),$.setXYZ(N+0,U.x,U.y,U.z),$.setXYZ(N+1,U.x,U.y,U.z),$.setXYZ(N+2,U.x,U.y,U.z);this.normalizeNormals(),$.needsUpdate=!0}}normalizeNormals(){let J=this.attributes.normal;for(let Q=0,$=J.count;Q<$;Q++)M8.fromBufferAttribute(J,Q),M8.normalize(),J.setXYZ(Q,M8.x,M8.y,M8.z)}toNonIndexed(){function J(H,Y){let{array:X,itemSize:U,normalized:E}=H,N=new X.constructor(Y.length*U),G=0,F=0;for(let O=0,V=Y.length;O<V;O++){if(H.isInterleavedBufferAttribute)G=Y[O]*H.data.stride+H.offset;else G=Y[O]*U;for(let D=0;D<U;D++)N[F++]=X[G++]}return new R8(N,U,E)}if(this.index===null)return C0("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let Q=new C8,$=this.index.array,W=this.attributes;for(let H in W){let Y=W[H],X=J(Y,$);Q.setAttribute(H,X)}let Z=this.morphAttributes;for(let H in Z){let Y=[],X=Z[H];for(let U=0,E=X.length;U<E;U++){let N=X[U],G=J(N,$);Y.push(G)}Q.morphAttributes[H]=Y}Q.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;for(let H=0,Y=K.length;H<Y;H++){let X=K[H];Q.addGroup(X.start,X.count,X.materialIndex)}return Q}toJSON(){let J={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(J.uuid=this.uuid,J.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!=="")J.name=this.name;if(Object.keys(this.userData).length>0)J.userData=this.userData;if(this.parameters!==void 0&&this._transformed!==!0){let Y=this.parameters;for(let X in Y)if(Y[X]!==void 0)J[X]=Y[X];return J}J.data={attributes:{}};let Q=this.index;if(Q!==null)J.data.index={type:Q.array.constructor.name,array:Array.prototype.slice.call(Q.array)};let $=this.attributes;for(let Y in $){let X=$[Y];J.data.attributes[Y]=X.toJSON(J.data)}let W={},Z=!1;for(let Y in this.morphAttributes){let X=this.morphAttributes[Y],U=[];for(let E=0,N=X.length;E<N;E++){let G=X[E];U.push(G.toJSON(J.data))}if(U.length>0)W[Y]=U,Z=!0}if(Z)J.data.morphAttributes=W,J.data.morphTargetsRelative=this.morphTargetsRelative;let K=this.groups;if(K.length>0)J.data.groups=JSON.parse(JSON.stringify(K));let H=this.boundingSphere;if(H!==null)J.data.boundingSphere=H.toJSON();return J}clone(){return new this.constructor().copy(this)}copy(J){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let Q={};this.name=J.name;let $=J.index;if($!==null)this.setIndex($.clone());let W=J.attributes;for(let X in W){let U=W[X];this.setAttribute(X,U.clone(Q))}let Z=J.morphAttributes;for(let X in Z){let U=[],E=Z[X];for(let N=0,G=E.length;N<G;N++)U.push(E[N].clone(Q));this.morphAttributes[X]=U}this.morphTargetsRelative=J.morphTargetsRelative;let K=J.groups;for(let X=0,U=K.length;X<U;X++){let E=K[X];this.addGroup(E.start,E.count,E.materialIndex)}let H=J.boundingBox;if(H!==null)this.boundingBox=H.clone();let Y=J.boundingSphere;if(Y!==null)this.boundingSphere=Y.clone();return this.drawRange.start=J.drawRange.start,this.drawRange.count=J.drawRange.count,this.userData=J.userData,this._transformed=J._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}var MH=0;class j9 extends M9{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:MH++}),this.uuid=u6(),this.name="",this.type="Material",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new p0(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=7680,this.stencilZFail=7680,this.stencilZPass=7680,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(J){if(this._alphaTest>0!==J>0)this.version++;this._alphaTest=J}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(J){if(J===void 0)return;for(let Q in J){let $=J[Q];if($===void 0){C0(`Material: parameter '${Q}' has value of undefined.`);continue}let W=this[Q];if(W===void 0){C0(`Material: '${Q}' is not a property of THREE.${this.type}.`);continue}if(W&&W.isColor)W.set($);else if(W&&W.isVector2&&($&&$.isVector2)||W&&W.isEuler&&($&&$.isEuler)||W&&W.isVector3&&($&&$.isVector3))W.copy($);else this[Q]=$}}toJSON(J){let Q=J===void 0||typeof J==="string";if(Q)J={textures:{},images:{}};let $={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};if($.uuid=this.uuid,$.type=this.type,this.name!=="")$.name=this.name;if(this.color&&this.color.isColor)$.color=this.color.getHex();if(this.roughness!==void 0)$.roughness=this.roughness;if(this.metalness!==void 0)$.metalness=this.metalness;if(this.sheen!==void 0)$.sheen=this.sheen;if(this.sheenColor&&this.sheenColor.isColor)$.sheenColor=this.sheenColor.getHex();if(this.sheenRoughness!==void 0)$.sheenRoughness=this.sheenRoughness;if(this.emissive&&this.emissive.isColor)$.emissive=this.emissive.getHex();if(this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1)$.emissiveIntensity=this.emissiveIntensity;if(this.specular&&this.specular.isColor)$.specular=this.specular.getHex();if(this.specularIntensity!==void 0)$.specularIntensity=this.specularIntensity;if(this.specularColor&&this.specularColor.isColor)$.specularColor=this.specularColor.getHex();if(this.shininess!==void 0)$.shininess=this.shininess;if(this.clearcoat!==void 0)$.clearcoat=this.clearcoat;if(this.clearcoatRoughness!==void 0)$.clearcoatRoughness=this.clearcoatRoughness;if(this.clearcoatMap&&this.clearcoatMap.isTexture)$.clearcoatMap=this.clearcoatMap.toJSON(J).uuid;if(this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture)$.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(J).uuid;if(this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture)$.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(J).uuid,$.clearcoatNormalScale=this.clearcoatNormalScale.toArray();if(this.sheenColorMap&&this.sheenColorMap.isTexture)$.sheenColorMap=this.sheenColorMap.toJSON(J).uuid;if(this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture)$.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(J).uuid;if(this.dispersion!==void 0)$.dispersion=this.dispersion;if(this.iridescence!==void 0)$.iridescence=this.iridescence;if(this.iridescenceIOR!==void 0)$.iridescenceIOR=this.iridescenceIOR;if(this.iridescenceThicknessRange!==void 0)$.iridescenceThicknessRange=this.iridescenceThicknessRange;if(this.iridescenceMap&&this.iridescenceMap.isTexture)$.iridescenceMap=this.iridescenceMap.toJSON(J).uuid;if(this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture)$.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(J).uuid;if(this.anisotropy!==void 0)$.anisotropy=this.anisotropy;if(this.anisotropyRotation!==void 0)$.anisotropyRotation=this.anisotropyRotation;if(this.anisotropyMap&&this.anisotropyMap.isTexture)$.anisotropyMap=this.anisotropyMap.toJSON(J).uuid;if(this.map&&this.map.isTexture)$.map=this.map.toJSON(J).uuid;if(this.matcap&&this.matcap.isTexture)$.matcap=this.matcap.toJSON(J).uuid;if(this.alphaMap&&this.alphaMap.isTexture)$.alphaMap=this.alphaMap.toJSON(J).uuid;if(this.lightMap&&this.lightMap.isTexture)$.lightMap=this.lightMap.toJSON(J).uuid,$.lightMapIntensity=this.lightMapIntensity;if(this.aoMap&&this.aoMap.isTexture)$.aoMap=this.aoMap.toJSON(J).uuid,$.aoMapIntensity=this.aoMapIntensity;if(this.bumpMap&&this.bumpMap.isTexture)$.bumpMap=this.bumpMap.toJSON(J).uuid,$.bumpScale=this.bumpScale;if(this.normalMap&&this.normalMap.isTexture)$.normalMap=this.normalMap.toJSON(J).uuid,$.normalMapType=this.normalMapType,$.normalScale=this.normalScale.toArray();if(this.displacementMap&&this.displacementMap.isTexture)$.displacementMap=this.displacementMap.toJSON(J).uuid,$.displacementScale=this.displacementScale,$.displacementBias=this.displacementBias;if(this.roughnessMap&&this.roughnessMap.isTexture)$.roughnessMap=this.roughnessMap.toJSON(J).uuid;if(this.metalnessMap&&this.metalnessMap.isTexture)$.metalnessMap=this.metalnessMap.toJSON(J).uuid;if(this.emissiveMap&&this.emissiveMap.isTexture)$.emissiveMap=this.emissiveMap.toJSON(J).uuid;if(this.specularMap&&this.specularMap.isTexture)$.specularMap=this.specularMap.toJSON(J).uuid;if(this.specularIntensityMap&&this.specularIntensityMap.isTexture)$.specularIntensityMap=this.specularIntensityMap.toJSON(J).uuid;if(this.specularColorMap&&this.specularColorMap.isTexture)$.specularColorMap=this.specularColorMap.toJSON(J).uuid;if(this.envMap&&this.envMap.isTexture){if($.envMap=this.envMap.toJSON(J).uuid,this.combine!==void 0)$.combine=this.combine}if(this.envMapRotation!==void 0)$.envMapRotation=this.envMapRotation.toArray();if(this.envMapIntensity!==void 0)$.envMapIntensity=this.envMapIntensity;if(this.reflectivity!==void 0)$.reflectivity=this.reflectivity;if(this.refractionRatio!==void 0)$.refractionRatio=this.refractionRatio;if(this.gradientMap&&this.gradientMap.isTexture)$.gradientMap=this.gradientMap.toJSON(J).uuid;if(this.transmission!==void 0)$.transmission=this.transmission;if(this.transmissionMap&&this.transmissionMap.isTexture)$.transmissionMap=this.transmissionMap.toJSON(J).uuid;if(this.thickness!==void 0)$.thickness=this.thickness;if(this.thicknessMap&&this.thicknessMap.isTexture)$.thicknessMap=this.thicknessMap.toJSON(J).uuid;if(this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0)$.attenuationDistance=this.attenuationDistance;if(this.attenuationColor!==void 0)$.attenuationColor=this.attenuationColor.getHex();if(this.size!==void 0)$.size=this.size;if(this.shadowSide!==null)$.shadowSide=this.shadowSide;if(this.sizeAttenuation!==void 0)$.sizeAttenuation=this.sizeAttenuation;if(this.blending!==1)$.blending=this.blending;if(this.side!==0)$.side=this.side;if(this.vertexColors===!0)$.vertexColors=!0;if(this.opacity<1)$.opacity=this.opacity;if(this.transparent===!0)$.transparent=!0;if(this.blendSrc!==204)$.blendSrc=this.blendSrc;if(this.blendDst!==205)$.blendDst=this.blendDst;if(this.blendEquation!==100)$.blendEquation=this.blendEquation;if(this.blendSrcAlpha!==null)$.blendSrcAlpha=this.blendSrcAlpha;if(this.blendDstAlpha!==null)$.blendDstAlpha=this.blendDstAlpha;if(this.blendEquationAlpha!==null)$.blendEquationAlpha=this.blendEquationAlpha;if(this.blendColor&&this.blendColor.isColor)$.blendColor=this.blendColor.getHex();if(this.blendAlpha!==0)$.blendAlpha=this.blendAlpha;if(this.depthFunc!==3)$.depthFunc=this.depthFunc;if(this.depthTest===!1)$.depthTest=this.depthTest;if(this.depthWrite===!1)$.depthWrite=this.depthWrite;if(this.colorWrite===!1)$.colorWrite=this.colorWrite;if(this.stencilWriteMask!==255)$.stencilWriteMask=this.stencilWriteMask;if(this.stencilFunc!==519)$.stencilFunc=this.stencilFunc;if(this.stencilRef!==0)$.stencilRef=this.stencilRef;if(this.stencilFuncMask!==255)$.stencilFuncMask=this.stencilFuncMask;if(this.stencilFail!==7680)$.stencilFail=this.stencilFail;if(this.stencilZFail!==7680)$.stencilZFail=this.stencilZFail;if(this.stencilZPass!==7680)$.stencilZPass=this.stencilZPass;if(this.stencilWrite===!0)$.stencilWrite=this.stencilWrite;if(this.rotation!==void 0&&this.rotation!==0)$.rotation=this.rotation;if(this.polygonOffset===!0)$.polygonOffset=!0;if(this.polygonOffsetFactor!==0)$.polygonOffsetFactor=this.polygonOffsetFactor;if(this.polygonOffsetUnits!==0)$.polygonOffsetUnits=this.polygonOffsetUnits;if(this.linewidth!==void 0&&this.linewidth!==1)$.linewidth=this.linewidth;if(this.dashSize!==void 0)$.dashSize=this.dashSize;if(this.gapSize!==void 0)$.gapSize=this.gapSize;if(this.scale!==void 0)$.scale=this.scale;if(this.dithering===!0)$.dithering=!0;if(this.alphaTest>0)$.alphaTest=this.alphaTest;if(this.alphaHash===!0)$.alphaHash=!0;if(this.alphaToCoverage===!0)$.alphaToCoverage=!0;if(this.premultipliedAlpha===!0)$.premultipliedAlpha=!0;if(this.forceSinglePass===!0)$.forceSinglePass=!0;if(this.allowOverride===!1)$.allowOverride=!1;if(this.wireframe===!0)$.wireframe=!0;if(this.wireframeLinewidth>1)$.wireframeLinewidth=this.wireframeLinewidth;if(this.wireframeLinecap!=="round")$.wireframeLinecap=this.wireframeLinecap;if(this.wireframeLinejoin!=="round")$.wireframeLinejoin=this.wireframeLinejoin;if(this.flatShading===!0)$.flatShading=!0;if(this.visible===!1)$.visible=!1;if(this.toneMapped===!1)$.toneMapped=!1;if(this.fog===!1)$.fog=!1;if(Object.keys(this.userData).length>0)$.userData=this.userData;function W(Z){let K=[];for(let H in Z){let Y=Z[H];delete Y.metadata,K.push(Y)}return K}if(Q){let Z=W(J.textures),K=W(J.images);if(Z.length>0)$.textures=Z;if(K.length>0)$.images=K}return $}fromJSON(J,Q){if(J.uuid!==void 0)this.uuid=J.uuid;if(J.name!==void 0)this.name=J.name;if(J.color!==void 0&&this.color!==void 0)this.color.setHex(J.color);if(J.roughness!==void 0)this.roughness=J.roughness;if(J.metalness!==void 0)this.metalness=J.metalness;if(J.sheen!==void 0)this.sheen=J.sheen;if(J.sheenColor!==void 0)this.sheenColor=new p0().setHex(J.sheenColor);if(J.sheenRoughness!==void 0)this.sheenRoughness=J.sheenRoughness;if(J.emissive!==void 0&&this.emissive!==void 0)this.emissive.setHex(J.emissive);if(J.specular!==void 0&&this.specular!==void 0)this.specular.setHex(J.specular);if(J.specularIntensity!==void 0)this.specularIntensity=J.specularIntensity;if(J.specularColor!==void 0&&this.specularColor!==void 0)this.specularColor.setHex(J.specularColor);if(J.shininess!==void 0)this.shininess=J.shininess;if(J.clearcoat!==void 0)this.clearcoat=J.clearcoat;if(J.clearcoatRoughness!==void 0)this.clearcoatRoughness=J.clearcoatRoughness;if(J.dispersion!==void 0)this.dispersion=J.dispersion;if(J.iridescence!==void 0)this.iridescence=J.iridescence;if(J.iridescenceIOR!==void 0)this.iridescenceIOR=J.iridescenceIOR;if(J.iridescenceThicknessRange!==void 0)this.iridescenceThicknessRange=J.iridescenceThicknessRange;if(J.transmission!==void 0)this.transmission=J.transmission;if(J.thickness!==void 0)this.thickness=J.thickness;if(J.attenuationDistance!==void 0)this.attenuationDistance=J.attenuationDistance;if(J.attenuationColor!==void 0&&this.attenuationColor!==void 0)this.attenuationColor.setHex(J.attenuationColor);if(J.anisotropy!==void 0)this.anisotropy=J.anisotropy;if(J.anisotropyRotation!==void 0)this.anisotropyRotation=J.anisotropyRotation;if(J.fog!==void 0)this.fog=J.fog;if(J.flatShading!==void 0)this.flatShading=J.flatShading;if(J.blending!==void 0)this.blending=J.blending;if(J.combine!==void 0)this.combine=J.combine;if(J.side!==void 0)this.side=J.side;if(J.shadowSide!==void 0)this.shadowSide=J.shadowSide;if(J.opacity!==void 0)this.opacity=J.opacity;if(J.transparent!==void 0)this.transparent=J.transparent;if(J.alphaTest!==void 0)this.alphaTest=J.alphaTest;if(J.alphaHash!==void 0)this.alphaHash=J.alphaHash;if(J.depthFunc!==void 0)this.depthFunc=J.depthFunc;if(J.depthTest!==void 0)this.depthTest=J.depthTest;if(J.depthWrite!==void 0)this.depthWrite=J.depthWrite;if(J.colorWrite!==void 0)this.colorWrite=J.colorWrite;if(J.blendSrc!==void 0)this.blendSrc=J.blendSrc;if(J.blendDst!==void 0)this.blendDst=J.blendDst;if(J.blendEquation!==void 0)this.blendEquation=J.blendEquation;if(J.blendSrcAlpha!==void 0)this.blendSrcAlpha=J.blendSrcAlpha;if(J.blendDstAlpha!==void 0)this.blendDstAlpha=J.blendDstAlpha;if(J.blendEquationAlpha!==void 0)this.blendEquationAlpha=J.blendEquationAlpha;if(J.blendColor!==void 0&&this.blendColor!==void 0)this.blendColor.setHex(J.blendColor);if(J.blendAlpha!==void 0)this.blendAlpha=J.blendAlpha;if(J.stencilWriteMask!==void 0)this.stencilWriteMask=J.stencilWriteMask;if(J.stencilFunc!==void 0)this.stencilFunc=J.stencilFunc;if(J.stencilRef!==void 0)this.stencilRef=J.stencilRef;if(J.stencilFuncMask!==void 0)this.stencilFuncMask=J.stencilFuncMask;if(J.stencilFail!==void 0)this.stencilFail=J.stencilFail;if(J.stencilZFail!==void 0)this.stencilZFail=J.stencilZFail;if(J.stencilZPass!==void 0)this.stencilZPass=J.stencilZPass;if(J.stencilWrite!==void 0)this.stencilWrite=J.stencilWrite;if(J.wireframe!==void 0)this.wireframe=J.wireframe;if(J.wireframeLinewidth!==void 0)this.wireframeLinewidth=J.wireframeLinewidth;if(J.wireframeLinecap!==void 0)this.wireframeLinecap=J.wireframeLinecap;if(J.wireframeLinejoin!==void 0)this.wireframeLinejoin=J.wireframeLinejoin;if(J.rotation!==void 0)this.rotation=J.rotation;if(J.linewidth!==void 0)this.linewidth=J.linewidth;if(J.dashSize!==void 0)this.dashSize=J.dashSize;if(J.gapSize!==void 0)this.gapSize=J.gapSize;if(J.scale!==void 0)this.scale=J.scale;if(J.polygonOffset!==void 0)this.polygonOffset=J.polygonOffset;if(J.polygonOffsetFactor!==void 0)this.polygonOffsetFactor=J.polygonOffsetFactor;if(J.polygonOffsetUnits!==void 0)this.polygonOffsetUnits=J.polygonOffsetUnits;if(J.dithering!==void 0)this.dithering=J.dithering;if(J.alphaToCoverage!==void 0)this.alphaToCoverage=J.alphaToCoverage;if(J.premultipliedAlpha!==void 0)this.premultipliedAlpha=J.premultipliedAlpha;if(J.forceSinglePass!==void 0)this.forceSinglePass=J.forceSinglePass;if(J.allowOverride!==void 0)this.allowOverride=J.allowOverride;if(J.visible!==void 0)this.visible=J.visible;if(J.toneMapped!==void 0)this.toneMapped=J.toneMapped;if(J.userData!==void 0)this.userData=J.userData;if(J.vertexColors!==void 0)if(typeof J.vertexColors==="number")this.vertexColors=J.vertexColors>0;else this.vertexColors=J.vertexColors;if(J.size!==void 0)this.size=J.size;if(J.sizeAttenuation!==void 0)this.sizeAttenuation=J.sizeAttenuation;if(J.map!==void 0)this.map=Q[J.map]||null;if(J.matcap!==void 0)this.matcap=Q[J.matcap]||null;if(J.alphaMap!==void 0)this.alphaMap=Q[J.alphaMap]||null;if(J.bumpMap!==void 0)this.bumpMap=Q[J.bumpMap]||null;if(J.bumpScale!==void 0)this.bumpScale=J.bumpScale;if(J.normalMap!==void 0)this.normalMap=Q[J.normalMap]||null;if(J.normalMapType!==void 0)this.normalMapType=J.normalMapType;if(J.normalScale!==void 0){let $=J.normalScale;if(Array.isArray($)===!1)$=[$,$];this.normalScale=new n0().fromArray($)}if(J.displacementMap!==void 0)this.displacementMap=Q[J.displacementMap]||null;if(J.displacementScale!==void 0)this.displacementScale=J.displacementScale;if(J.displacementBias!==void 0)this.displacementBias=J.displacementBias;if(J.roughnessMap!==void 0)this.roughnessMap=Q[J.roughnessMap]||null;if(J.metalnessMap!==void 0)this.metalnessMap=Q[J.metalnessMap]||null;if(J.emissiveMap!==void 0)this.emissiveMap=Q[J.emissiveMap]||null;if(J.emissiveIntensity!==void 0)this.emissiveIntensity=J.emissiveIntensity;if(J.specularMap!==void 0)this.specularMap=Q[J.specularMap]||null;if(J.specularIntensityMap!==void 0)this.specularIntensityMap=Q[J.specularIntensityMap]||null;if(J.specularColorMap!==void 0)this.specularColorMap=Q[J.specularColorMap]||null;if(J.envMap!==void 0)this.envMap=Q[J.envMap]||null;if(J.envMapRotation!==void 0)this.envMapRotation.fromArray(J.envMapRotation);if(J.envMapIntensity!==void 0)this.envMapIntensity=J.envMapIntensity;if(J.reflectivity!==void 0)this.reflectivity=J.reflectivity;if(J.refractionRatio!==void 0)this.refractionRatio=J.refractionRatio;if(J.lightMap!==void 0)this.lightMap=Q[J.lightMap]||null;if(J.lightMapIntensity!==void 0)this.lightMapIntensity=J.lightMapIntensity;if(J.aoMap!==void 0)this.aoMap=Q[J.aoMap]||null;if(J.aoMapIntensity!==void 0)this.aoMapIntensity=J.aoMapIntensity;if(J.gradientMap!==void 0)this.gradientMap=Q[J.gradientMap]||null;if(J.clearcoatMap!==void 0)this.clearcoatMap=Q[J.clearcoatMap]||null;if(J.clearcoatRoughnessMap!==void 0)this.clearcoatRoughnessMap=Q[J.clearcoatRoughnessMap]||null;if(J.clearcoatNormalMap!==void 0)this.clearcoatNormalMap=Q[J.clearcoatNormalMap]||null;if(J.clearcoatNormalScale!==void 0)this.clearcoatNormalScale=new n0().fromArray(J.clearcoatNormalScale);if(J.iridescenceMap!==void 0)this.iridescenceMap=Q[J.iridescenceMap]||null;if(J.iridescenceThicknessMap!==void 0)this.iridescenceThicknessMap=Q[J.iridescenceThicknessMap]||null;if(J.transmissionMap!==void 0)this.transmissionMap=Q[J.transmissionMap]||null;if(J.thicknessMap!==void 0)this.thicknessMap=Q[J.thicknessMap]||null;if(J.anisotropyMap!==void 0)this.anisotropyMap=Q[J.anisotropyMap]||null;if(J.sheenColorMap!==void 0)this.sheenColorMap=Q[J.sheenColorMap]||null;if(J.sheenRoughnessMap!==void 0)this.sheenRoughnessMap=Q[J.sheenRoughnessMap]||null;return this}clone(){return new this.constructor().copy(this)}copy(J){this.name=J.name,this.blending=J.blending,this.side=J.side,this.vertexColors=J.vertexColors,this.opacity=J.opacity,this.transparent=J.transparent,this.blendSrc=J.blendSrc,this.blendDst=J.blendDst,this.blendEquation=J.blendEquation,this.blendSrcAlpha=J.blendSrcAlpha,this.blendDstAlpha=J.blendDstAlpha,this.blendEquationAlpha=J.blendEquationAlpha,this.blendColor.copy(J.blendColor),this.blendAlpha=J.blendAlpha,this.depthFunc=J.depthFunc,this.depthTest=J.depthTest,this.depthWrite=J.depthWrite,this.stencilWriteMask=J.stencilWriteMask,this.stencilFunc=J.stencilFunc,this.stencilRef=J.stencilRef,this.stencilFuncMask=J.stencilFuncMask,this.stencilFail=J.stencilFail,this.stencilZFail=J.stencilZFail,this.stencilZPass=J.stencilZPass,this.stencilWrite=J.stencilWrite;let Q=J.clippingPlanes,$=null;if(Q!==null){let W=Q.length;$=Array(W);for(let Z=0;Z!==W;++Z)$[Z]=Q[Z].clone()}return this.clippingPlanes=$,this.clipIntersection=J.clipIntersection,this.clipShadows=J.clipShadows,this.shadowSide=J.shadowSide,this.colorWrite=J.colorWrite,this.precision=J.precision,this.polygonOffset=J.polygonOffset,this.polygonOffsetFactor=J.polygonOffsetFactor,this.polygonOffsetUnits=J.polygonOffsetUnits,this.dithering=J.dithering,this.alphaTest=J.alphaTest,this.alphaHash=J.alphaHash,this.alphaToCoverage=J.alphaToCoverage,this.premultipliedAlpha=J.premultipliedAlpha,this.forceSinglePass=J.forceSinglePass,this.allowOverride=J.allowOverride,this.visible=J.visible,this.toneMapped=J.toneMapped,this.userData=JSON.parse(JSON.stringify(J.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(J){if(J===!0)this.version++}}var E9=new h,pJ=new h,G7=new h,A9=new h,mJ=new h,N7=new h,lJ=new h;class s6{constructor(J=new h,Q=new h(0,0,-1)){this.origin=J,this.direction=Q}set(J,Q){return this.origin.copy(J),this.direction.copy(Q),this}copy(J){return this.origin.copy(J.origin),this.direction.copy(J.direction),this}at(J,Q){return Q.copy(this.origin).addScaledVector(this.direction,J)}lookAt(J){return this.direction.copy(J).sub(this.origin).normalize(),this}recast(J){return this.origin.copy(this.at(J,E9)),this}closestPointToPoint(J,Q){Q.subVectors(J,this.origin);let $=Q.dot(this.direction);if($<0)return Q.copy(this.origin);return Q.copy(this.origin).addScaledVector(this.direction,$)}distanceToPoint(J){return Math.sqrt(this.distanceSqToPoint(J))}distanceSqToPoint(J){let Q=E9.subVectors(J,this.origin).dot(this.direction);if(Q<0)return this.origin.distanceToSquared(J);return E9.copy(this.origin).addScaledVector(this.direction,Q),E9.distanceToSquared(J)}distanceSqToSegment(J,Q,$,W){pJ.copy(J).add(Q).multiplyScalar(0.5),G7.copy(Q).sub(J).normalize(),A9.copy(this.origin).sub(pJ);let Z=J.distanceTo(Q)*0.5,K=-this.direction.dot(G7),H=A9.dot(this.direction),Y=-A9.dot(G7),X=A9.lengthSq(),U=Math.abs(1-K*K),E,N,G,F;if(U>0)if(E=K*Y-H,N=K*H-Y,F=Z*U,E>=0)if(N>=-F)if(N<=F){let O=1/U;E*=O,N*=O,G=E*(E+K*N+2*H)+N*(K*E+N+2*Y)+X}else N=Z,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;else N=-Z,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;else if(N<=-F)E=Math.max(0,-(-K*Z+H)),N=E>0?-Z:Math.min(Math.max(-Z,-Y),Z),G=-E*E+N*(N+2*Y)+X;else if(N<=F)E=0,N=Math.min(Math.max(-Z,-Y),Z),G=N*(N+2*Y)+X;else E=Math.max(0,-(K*Z+H)),N=E>0?Z:Math.min(Math.max(-Z,-Y),Z),G=-E*E+N*(N+2*Y)+X;else N=K>0?-Z:Z,E=Math.max(0,-(K*N+H)),G=-E*E+N*(N+2*Y)+X;if($)$.copy(this.origin).addScaledVector(this.direction,E);if(W)W.copy(pJ).addScaledVector(G7,N);return G}intersectSphere(J,Q){E9.subVectors(J.center,this.origin);let $=E9.dot(this.direction),W=E9.dot(E9)-$*$,Z=J.radius*J.radius;if(W>Z)return null;let K=Math.sqrt(Z-W),H=$-K,Y=$+K;if(Y<0)return null;if(H<0)return this.at(Y,Q);return this.at(H,Q)}intersectsSphere(J){if(J.radius<0)return!1;return this.distanceSqToPoint(J.center)<=J.radius*J.radius}distanceToPlane(J){let Q=J.normal.dot(this.direction);if(Q===0){if(J.distanceToPoint(this.origin)===0)return 0;return null}let $=-(this.origin.dot(J.normal)+J.constant)/Q;return $>=0?$:null}intersectPlane(J,Q){let $=this.distanceToPlane(J);if($===null)return null;return this.at($,Q)}intersectsPlane(J){let Q=J.distanceToPoint(this.origin);if(Q===0)return!0;if(J.normal.dot(this.direction)*Q<0)return!0;return!1}intersectBox(J,Q){let $,W,Z,K,H,Y,X=1/this.direction.x,U=1/this.direction.y,E=1/this.direction.z,N=this.origin;if(X>=0)$=(J.min.x-N.x)*X,W=(J.max.x-N.x)*X;else $=(J.max.x-N.x)*X,W=(J.min.x-N.x)*X;if(U>=0)Z=(J.min.y-N.y)*U,K=(J.max.y-N.y)*U;else Z=(J.max.y-N.y)*U,K=(J.min.y-N.y)*U;if($>K||Z>W)return null;if(Z>$||isNaN($))$=Z;if(K<W||isNaN(W))W=K;if(E>=0)H=(J.min.z-N.z)*E,Y=(J.max.z-N.z)*E;else H=(J.max.z-N.z)*E,Y=(J.min.z-N.z)*E;if($>Y||H>W)return null;if(H>$||$!==$)$=H;if(Y<W||W!==W)W=Y;if(W<0)return null;return this.at($>=0?$:W,Q)}intersectsBox(J){return this.intersectBox(J,E9)!==null}intersectTriangle(J,Q,$,W,Z){mJ.subVectors(Q,J),N7.subVectors($,J),lJ.crossVectors(mJ,N7);let K=this.direction.dot(lJ),H;if(K>0){if(W)return null;H=1}else if(K<0)H=-1,K=-K;else return null;A9.subVectors(this.origin,J);let Y=H*this.direction.dot(N7.crossVectors(A9,N7));if(Y<0)return null;let X=H*this.direction.dot(mJ.cross(A9));if(X<0)return null;if(Y+X>K)return null;let U=-H*A9.dot(lJ);if(U<0)return null;return this.at(U/K,Z)}applyMatrix4(J){return this.origin.applyMatrix4(J),this.direction.transformDirection(J),this}equals(J){return J.origin.equals(this.origin)&&J.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class a7 extends j9{constructor(J){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new p0(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new w9,this.combine=0,this.reflectivity=1,this.refractionRatio=0.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.lightMap=J.lightMap,this.lightMapIntensity=J.lightMapIntensity,this.aoMap=J.aoMap,this.aoMapIntensity=J.aoMapIntensity,this.specularMap=J.specularMap,this.alphaMap=J.alphaMap,this.envMap=J.envMap,this.envMapRotation.copy(J.envMapRotation),this.combine=J.combine,this.reflectivity=J.reflectivity,this.refractionRatio=J.refractionRatio,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.wireframeLinecap=J.wireframeLinecap,this.wireframeLinejoin=J.wireframeLinejoin,this.fog=J.fog,this}}var VW=new Z8,g9=new s6,E7=new o9,BW=new h,q7=new h,F7=new h,D7=new h,dJ=new h,O7=new h,zW=new h,M7=new h;class x8 extends I8{constructor(J=new C8,Q=new a7){super();this.isMesh=!0,this.type="Mesh",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(J,Q){if(super.copy(J,Q),J.morphTargetInfluences!==void 0)this.morphTargetInfluences=J.morphTargetInfluences.slice();if(J.morphTargetDictionary!==void 0)this.morphTargetDictionary=Object.assign({},J.morphTargetDictionary);return this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}getVertexPosition(J,Q){let $=this.geometry,W=$.attributes.position,Z=$.morphAttributes.position,K=$.morphTargetsRelative;Q.fromBufferAttribute(W,J);let H=this.morphTargetInfluences;if(Z&&H){O7.set(0,0,0);for(let Y=0,X=Z.length;Y<X;Y++){let U=H[Y],E=Z[Y];if(U===0)continue;if(dJ.fromBufferAttribute(E,J),K)O7.addScaledVector(dJ,U);else O7.addScaledVector(dJ.sub(Q),U)}Q.add(O7)}return Q}raycast(J,Q){let $=this.geometry,W=this.material,Z=this.matrixWorld;if(W===void 0)return;if($.boundingSphere===null)$.computeBoundingSphere();if(E7.copy($.boundingSphere),E7.applyMatrix4(Z),g9.copy(J.ray).recast(J.near),E7.containsPoint(g9.origin)===!1){if(g9.intersectSphere(E7,BW)===null)return;if(g9.origin.distanceToSquared(BW)>(J.far-J.near)**2)return}if(VW.copy(Z).invert(),g9.copy(J.ray).applyMatrix4(VW),$.boundingBox!==null){if(g9.intersectsBox($.boundingBox)===!1)return}this._computeIntersections(J,Q,g9)}_computeIntersections(J,Q,$){let W,Z=this.geometry,K=this.material,H=Z.index,Y=Z.attributes.position,X=Z.attributes.uv,U=Z.attributes.uv1,E=Z.attributes.normal,N=Z.groups,G=Z.drawRange;if(H!==null)if(Array.isArray(K))for(let F=0,O=N.length;F<O;F++){let V=N[F],D=K[V.materialIndex],q=Math.max(V.start,G.start),_=Math.min(H.count,Math.min(V.start+V.count,G.start+G.count));for(let A=q,k=_;A<k;A+=3){let I=H.getX(A),C=H.getX(A+1),w=H.getX(A+2);if(W=R7(this,D,J,$,X,U,E,I,C,w),W)W.faceIndex=Math.floor(A/3),W.face.materialIndex=V.materialIndex,Q.push(W)}}else{let F=Math.max(0,G.start),O=Math.min(H.count,G.start+G.count);for(let V=F,D=O;V<D;V+=3){let q=H.getX(V),_=H.getX(V+1),A=H.getX(V+2);if(W=R7(this,K,J,$,X,U,E,q,_,A),W)W.faceIndex=Math.floor(V/3),Q.push(W)}}else if(Y!==void 0)if(Array.isArray(K))for(let F=0,O=N.length;F<O;F++){let V=N[F],D=K[V.materialIndex],q=Math.max(V.start,G.start),_=Math.min(Y.count,Math.min(V.start+V.count,G.start+G.count));for(let A=q,k=_;A<k;A+=3){let I=A,C=A+1,w=A+2;if(W=R7(this,D,J,$,X,U,E,I,C,w),W)W.faceIndex=Math.floor(A/3),W.face.materialIndex=V.materialIndex,Q.push(W)}}else{let F=Math.max(0,G.start),O=Math.min(Y.count,G.start+G.count);for(let V=F,D=O;V<D;V+=3){let q=V,_=V+1,A=V+2;if(W=R7(this,K,J,$,X,U,E,q,_,A),W)W.faceIndex=Math.floor(V/3),Q.push(W)}}}}function RH(J,Q,$,W,Z,K,H,Y){let X;if(Q.side===1)X=W.intersectTriangle(H,K,Z,!0,Y);else X=W.intersectTriangle(Z,K,H,Q.side===0,Y);if(X===null)return null;M7.copy(Y),M7.applyMatrix4(J.matrixWorld);let U=$.ray.origin.distanceTo(M7);if(U<$.near||U>$.far)return null;return{distance:U,point:M7.clone(),object:J}}function R7(J,Q,$,W,Z,K,H,Y,X,U){J.getVertexPosition(Y,q7),J.getVertexPosition(X,F7),J.getVertexPosition(U,D7);let E=RH(J,Q,$,W,q7,F7,D7,zW);if(E){let N=new h;if(u8.getBarycoord(zW,q7,F7,D7,N),Z)E.uv=u8.getInterpolatedAttribute(Z,Y,X,U,N,new n0);if(K)E.uv1=u8.getInterpolatedAttribute(K,Y,X,U,N,new n0);if(H){if(E.normal=u8.getInterpolatedAttribute(H,Y,X,U,N,new h),E.normal.dot(W.direction)>0)E.normal.multiplyScalar(-1)}let G={a:Y,b:X,c:U,normal:new h,materialIndex:0};u8.getNormal(q7,F7,D7,G.normal),E.face=G,E.barycoord=N}return E}class i6 extends z8{constructor(J=null,Q=1,$=1,W,Z,K,H,Y,X=1003,U=1003,E,N){super(null,K,H,Y,X,U,W,Z,E,N);this.isDataTexture=!0,this.image={data:J,width:Q,height:$},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class r7 extends R8{constructor(J,Q,$,W=1){super(J,Q,$);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=W}copy(J){return super.copy(J),this.meshPerAttribute=J.meshPerAttribute,this}toJSON(){let J=super.toJSON();return J.meshPerAttribute=this.meshPerAttribute,J.isInstancedBufferAttribute=!0,J}}var uJ=new h,kH=new h,LH=new w0;class q9{constructor(J=new h(1,0,0),Q=0){this.isPlane=!0,this.normal=J,this.constant=Q}set(J,Q){return this.normal.copy(J),this.constant=Q,this}setComponents(J,Q,$,W){return this.normal.set(J,Q,$),this.constant=W,this}setFromNormalAndCoplanarPoint(J,Q){return this.normal.copy(J),this.constant=-Q.dot(this.normal),this}setFromCoplanarPoints(J,Q,$){let W=uJ.subVectors($,Q).cross(kH.subVectors(J,Q)).normalize();return this.setFromNormalAndCoplanarPoint(W,J),this}copy(J){return this.normal.copy(J.normal),this.constant=J.constant,this}normalize(){let J=1/this.normal.length();return this.normal.multiplyScalar(J),this.constant*=J,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(J){return this.normal.dot(J)+this.constant}distanceToSphere(J){return this.distanceToPoint(J.center)-J.radius}projectPoint(J,Q){return Q.copy(J).addScaledVector(this.normal,-this.distanceToPoint(J))}intersectLine(J,Q,$=!0){let W=J.delta(uJ),Z=this.normal.dot(W);if(Z===0){if(this.distanceToPoint(J.start)===0)return Q.copy(J.start);return null}let K=-(J.start.dot(this.normal)+this.constant)/Z;if($===!0&&(K<0||K>1))return null;return Q.copy(J.start).addScaledVector(W,K)}intersectsLine(J){let Q=this.distanceToPoint(J.start),$=this.distanceToPoint(J.end);return Q<0&&$>0||$<0&&Q>0}intersectsBox(J){return J.intersectsPlane(this)}intersectsSphere(J){return J.intersectsPlane(this)}coplanarPoint(J){return J.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(J,Q){let $=Q||LH.getNormalMatrix(J),W=this.coplanarPoint(uJ).applyMatrix4(J),Z=this.normal.applyMatrix3($).normalize();return this.constant=-W.dot(Z),this}translate(J){return this.constant-=J.dot(this.normal),this}equals(J){return J.normal.equals(this.normal)&&J.constant===this.constant}clone(){return new this.constructor().copy(this)}}var p9=new o9,VH=new n0(0.5,0.5),k7=new h;class t7{constructor(J=new q9,Q=new q9,$=new q9,W=new q9,Z=new q9,K=new q9){this.planes=[J,Q,$,W,Z,K]}set(J,Q,$,W,Z,K){let H=this.planes;return H[0].copy(J),H[1].copy(Q),H[2].copy($),H[3].copy(W),H[4].copy(Z),H[5].copy(K),this}copy(J){let Q=this.planes;for(let $=0;$<6;$++)Q[$].copy(J.planes[$]);return this}setFromProjectionMatrix(J,Q=2000,$=!1){let W=this.planes,Z=J.elements,K=Z[0],H=Z[1],Y=Z[2],X=Z[3],U=Z[4],E=Z[5],N=Z[6],G=Z[7],F=Z[8],O=Z[9],V=Z[10],D=Z[11],q=Z[12],_=Z[13],A=Z[14],k=Z[15];if(W[0].setComponents(X-K,G-U,D-F,k-q).normalize(),W[1].setComponents(X+K,G+U,D+F,k+q).normalize(),W[2].setComponents(X+H,G+E,D+O,k+_).normalize(),W[3].setComponents(X-H,G-E,D-O,k-_).normalize(),$)W[4].setComponents(Y,N,V,A).normalize(),W[5].setComponents(X-Y,G-N,D-V,k-A).normalize();else if(W[4].setComponents(X-Y,G-N,D-V,k-A).normalize(),Q===2000)W[5].setComponents(X+Y,G+N,D+V,k+A).normalize();else if(Q===2001)W[5].setComponents(Y,N,V,A).normalize();else throw Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+Q);return this}intersectsObject(J){if(J.boundingSphere!==void 0){if(J.boundingSphere===null)J.computeBoundingSphere();p9.copy(J.boundingSphere).applyMatrix4(J.matrixWorld)}else{let Q=J.geometry;if(Q.boundingSphere===null)Q.computeBoundingSphere();p9.copy(Q.boundingSphere).applyMatrix4(J.matrixWorld)}return this.intersectsSphere(p9)}intersectsSprite(J){p9.center.set(0,0,0);let Q=VH.distanceTo(J.center);return p9.radius=0.7071067811865476+Q,p9.applyMatrix4(J.matrixWorld),this.intersectsSphere(p9)}intersectsSphere(J){let Q=this.planes,$=J.center,W=-J.radius;for(let Z=0;Z<6;Z++)if(Q[Z].distanceToPoint($)<W)return!1;return!0}intersectsBox(J){let Q=this.planes;for(let $=0;$<6;$++){let W=Q[$];if(k7.x=W.normal.x>0?J.max.x:J.min.x,k7.y=W.normal.y>0?J.max.y:J.min.y,k7.z=W.normal.z>0?J.max.z:J.min.z,W.distanceToPoint(k7)<0)return!1}return!0}containsPoint(J){let Q=this.planes;for(let $=0;$<6;$++)if(Q[$].distanceToPoint(J)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class rQ extends j9{constructor(J){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new p0(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.linewidth=J.linewidth,this.linecap=J.linecap,this.linejoin=J.linejoin,this.fog=J.fog,this}}var P7=new h,w7=new h,IW=new Z8,h6=new s6,L7=new o9,cJ=new h,_W=new h;class tQ extends I8{constructor(J=new C8,Q=new rQ){super();this.isLine=!0,this.type="Line",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[0];for(let W=1,Z=Q.count;W<Z;W++)P7.fromBufferAttribute(Q,W-1),w7.fromBufferAttribute(Q,W),$[W]=$[W-1],$[W]+=P7.distanceTo(w7);J.setAttribute("lineDistance",new b8($,1))}else C0("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(J,Q){let $=this.geometry,W=this.matrixWorld,Z=J.params.Line.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(L7.copy($.boundingSphere),L7.applyMatrix4(W),L7.radius+=Z,J.ray.intersectsSphere(L7)===!1)return;IW.copy(W).invert(),h6.copy(J.ray).applyMatrix4(IW);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=this.isLineSegments?2:1,U=$.index,N=$.attributes.position;if(U!==null){let G=Math.max(0,K.start),F=Math.min(U.count,K.start+K.count);for(let O=G,V=F-1;O<V;O+=X){let D=U.getX(O),q=U.getX(O+1),_=V7(this,J,h6,Y,D,q,O);if(_)Q.push(_)}if(this.isLineLoop){let O=U.getX(F-1),V=U.getX(G),D=V7(this,J,h6,Y,O,V,F-1);if(D)Q.push(D)}}else{let G=Math.max(0,K.start),F=Math.min(N.count,K.start+K.count);for(let O=G,V=F-1;O<V;O+=X){let D=V7(this,J,h6,Y,O,O+1,O);if(D)Q.push(D)}if(this.isLineLoop){let O=V7(this,J,h6,Y,F-1,G,F-1);if(O)Q.push(O)}}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function V7(J,Q,$,W,Z,K,H){let Y=J.geometry.attributes.position;if(P7.fromBufferAttribute(Y,Z),w7.fromBufferAttribute(Y,K),$.distanceSqToSegment(P7,w7,cJ,_W)>W)return;cJ.applyMatrix4(J.matrixWorld);let U=Q.ray.origin.distanceTo(cJ);if(U<Q.near||U>Q.far)return;return{distance:U,point:_W.clone().applyMatrix4(J.matrixWorld),index:H,face:null,faceIndex:null,barycoord:null,object:J}}var CW=new h,AW=new h;class e7 extends tQ{constructor(J,Q){super(J,Q);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let J=this.geometry;if(J.index===null){let Q=J.attributes.position,$=[];for(let W=0,Z=Q.count;W<Z;W+=2)CW.fromBufferAttribute(Q,W),AW.fromBufferAttribute(Q,W+1),$[W]=W===0?0:$[W-1],$[W+1]=$[W]+CW.distanceTo(AW);J.setAttribute("lineDistance",new b8($,1))}else C0("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class eQ extends j9{constructor(J){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new p0(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(J)}copy(J){return super.copy(J),this.color.copy(J.color),this.map=J.map,this.alphaMap=J.alphaMap,this.size=J.size,this.sizeAttenuation=J.sizeAttenuation,this.fog=J.fog,this}}var PW=new Z8,nJ=new s6,B7=new o9,z7=new h;class JJ extends I8{constructor(J=new C8,Q=new eQ){super();this.isPoints=!0,this.type="Points",this.geometry=J,this.material=Q,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(J,Q){return super.copy(J,Q),this.material=Array.isArray(J.material)?J.material.slice():J.material,this.geometry=J.geometry,this}raycast(J,Q){let $=this.geometry,W=this.matrixWorld,Z=J.params.Points.threshold,K=$.drawRange;if($.boundingSphere===null)$.computeBoundingSphere();if(B7.copy($.boundingSphere),B7.applyMatrix4(W),B7.radius+=Z,J.ray.intersectsSphere(B7)===!1)return;PW.copy(W).invert(),nJ.copy(J.ray).applyMatrix4(PW);let H=Z/((this.scale.x+this.scale.y+this.scale.z)/3),Y=H*H,X=$.index,E=$.attributes.position;if(X!==null){let N=Math.max(0,K.start),G=Math.min(X.count,K.start+K.count);for(let F=N,O=G;F<O;F++){let V=X.getX(F);z7.fromBufferAttribute(E,V),wW(z7,V,Y,W,J,Q,this)}}else{let N=Math.max(0,K.start),G=Math.min(E.count,K.start+K.count);for(let F=N,O=G;F<O;F++)z7.fromBufferAttribute(E,F),wW(z7,F,Y,W,J,Q,this)}}updateMorphTargets(){let Q=this.geometry.morphAttributes,$=Object.keys(Q);if($.length>0){let W=Q[$[0]];if(W!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let Z=0,K=W.length;Z<K;Z++){let H=W[Z].name||String(Z);this.morphTargetInfluences.push(0),this.morphTargetDictionary[H]=Z}}}}}function wW(J,Q,$,W,Z,K,H){let Y=nJ.distanceSqToPoint(J);if(Y<$){let X=new h;nJ.closestPointToPoint(J,X),X.applyMatrix4(W);let U=Z.ray.origin.distanceTo(X);if(U<Z.near||U>Z.far)return;K.push({distance:U,distanceToRay:Math.sqrt(Y),point:X,index:Q,face:null,faceIndex:null,barycoord:null,object:H})}}class QJ extends z8{constructor(J=[],Q=301,$,W,Z,K,H,Y,X,U){super(J,Q,$,W,Z,K,H,Y,X,U);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(J){this.image=J}}class v9 extends z8{constructor(J,Q,$=1014,W,Z,K,H=1003,Y=1003,X,U=1026,E=1){if(U!==1026&&U!==1027)throw Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let N={width:J,height:Q,depth:E};super(N,W,Z,K,H,Y,U,$,X);this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(J){return super.copy(J),this.source=new c6(Object.assign({},J.image)),this.compareFunction=J.compareFunction,this}toJSON(J){let Q=super.toJSON(J);if(this.compareFunction!==null)Q.compareFunction=this.compareFunction;return Q}}class J$ extends v9{constructor(J,Q=1014,$=301,W,Z,K=1003,H=1003,Y,X=1026){let U={width:J,height:J,depth:1},E=[U,U,U,U,U,U];super(J,J,Q,$,W,Z,K,H,Y,X);this.image=E,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(J){this.image=J}}class $J extends z8{constructor(J=null){super();this.sourceTexture=J,this.isExternalTexture=!0}copy(J){return super.copy(J),this.sourceTexture=J.sourceTexture,this}}class C6 extends C8{constructor(J=1,Q=1,$=1,W=1,Z=1,K=1){super();this.type="BoxGeometry",this.parameters={width:J,height:Q,depth:$,widthSegments:W,heightSegments:Z,depthSegments:K};let H=this;W=Math.floor(W),Z=Math.floor(Z),K=Math.floor(K);let Y=[],X=[],U=[],E=[],N=0,G=0;F("z","y","x",-1,-1,$,Q,J,K,Z,0),F("z","y","x",1,-1,$,Q,-J,K,Z,1),F("x","z","y",1,1,J,$,Q,W,K,2),F("x","z","y",1,-1,J,$,-Q,W,K,3),F("x","y","z",1,-1,J,Q,$,W,Z,4),F("x","y","z",-1,-1,J,Q,-$,W,Z,5),this.setIndex(Y),this.setAttribute("position",new b8(X,3)),this.setAttribute("normal",new b8(U,3)),this.setAttribute("uv",new b8(E,2));function F(O,V,D,q,_,A,k,I,C,w,R){let z=A/C,p=k/w,P=A/2,y=k/2,c=I/2,b=C+1,u=w+1,m=0,f=0,a=new h;for(let e=0;e<u;e++){let J0=e*p-y;for(let k0=0;k0<b;k0++){let D0=k0*z-P;a[O]=D0*q,a[V]=J0*_,a[D]=c,X.push(a.x,a.y,a.z),a[O]=0,a[V]=0,a[D]=I>0?1:-1,U.push(a.x,a.y,a.z),E.push(k0/C),E.push(1-e/w),m+=1}}for(let e=0;e<w;e++)for(let J0=0;J0<C;J0++){let k0=N+J0+b*e,D0=N+J0+b*(e+1),l0=N+(J0+1)+b*(e+1),u0=N+(J0+1)+b*e;Y.push(k0,D0,u0),Y.push(D0,l0,u0),f+=6}H.addGroup(G,f,R),G+=f,N+=m}}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new C6(J.width,J.height,J.depth,J.widthSegments,J.heightSegments,J.depthSegments)}}class f9 extends C8{constructor(J=1,Q=1,$=1,W=1){super();this.type="PlaneGeometry",this.parameters={width:J,height:Q,widthSegments:$,heightSegments:W};let Z=J/2,K=Q/2,H=Math.floor($),Y=Math.floor(W),X=H+1,U=Y+1,E=J/H,N=Q/Y,G=[],F=[],O=[],V=[];for(let D=0;D<U;D++){let q=D*N-K;for(let _=0;_<X;_++){let A=_*E-Z;F.push(A,-q,0),O.push(0,0,1),V.push(_/H),V.push(1-D/Y)}}for(let D=0;D<Y;D++)for(let q=0;q<H;q++){let _=q+X*D,A=q+X*(D+1),k=q+1+X*(D+1),I=q+1+X*D;G.push(_,A,I),G.push(A,k,I)}this.setIndex(G),this.setAttribute("position",new b8(F,3)),this.setAttribute("normal",new b8(O,3)),this.setAttribute("uv",new b8(V,2))}copy(J){return super.copy(J),this.parameters=Object.assign({},J.parameters),this}static fromJSON(J){return new f9(J.width,J.height,J.widthSegments,J.heightSegments)}}function a9(J){let Q={};for(let $ in J){Q[$]={};for(let W in J[$]){let Z=J[$][W];if(TW(Z))if(Z.isRenderTargetTexture)C0("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),Q[$][W]=null;else Q[$][W]=Z.clone();else if(Array.isArray(Z))if(TW(Z[0])){let K=[];for(let H=0,Y=Z.length;H<Y;H++)K[H]=Z[H].clone();Q[$][W]=K}else Q[$][W]=Z.slice();else Q[$][W]=Z}}return Q}function A8(J){let Q={};for(let $=0;$<J.length;$++){let W=a9(J[$]);for(let Z in W)Q[Z]=W[Z]}return Q}function TW(J){return J&&(J.isColor||J.isMatrix3||J.isMatrix4||J.isVector2||J.isVector3||J.isVector4||J.isTexture||J.isQuaternion)}function BH(J){let Q=[];for(let $=0;$<J.length;$++)Q.push(J[$].clone());return Q}function Q$(J){let Q=J.getRenderTarget();if(Q===null)return J.outputColorSpace;if(Q.isXRRenderTarget===!0)return Q.texture.colorSpace;return g0.workingColorSpace}var vZ={clone:a9,merge:A8},zH=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,IH=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class T8 extends j9{constructor(J){super();if(this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=zH,this.fragmentShader=IH,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,J!==void 0)this.setValues(J)}copy(J){return super.copy(J),this.fragmentShader=J.fragmentShader,this.vertexShader=J.vertexShader,this.uniforms=a9(J.uniforms),this.uniformsGroups=BH(J.uniformsGroups),this.defines=Object.assign({},J.defines),this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this.fog=J.fog,this.lights=J.lights,this.clipping=J.clipping,this.extensions=Object.assign({},J.extensions),this.glslVersion=J.glslVersion,this.defaultAttributeValues=Object.assign({},J.defaultAttributeValues),this.index0AttributeName=J.index0AttributeName,this.uniformsNeedUpdate=J.uniformsNeedUpdate,this}toJSON(J){let Q=super.toJSON(J);Q.glslVersion=this.glslVersion,Q.uniforms={};for(let W in this.uniforms){let K=this.uniforms[W].value;if(K&&K.isTexture)Q.uniforms[W]={type:"t",value:K.toJSON(J).uuid};else if(K&&K.isColor)Q.uniforms[W]={type:"c",value:K.getHex()};else if(K&&K.isVector2)Q.uniforms[W]={type:"v2",value:K.toArray()};else if(K&&K.isVector3)Q.uniforms[W]={type:"v3",value:K.toArray()};else if(K&&K.isVector4)Q.uniforms[W]={type:"v4",value:K.toArray()};else if(K&&K.isMatrix3)Q.uniforms[W]={type:"m3",value:K.toArray()};else if(K&&K.isMatrix4)Q.uniforms[W]={type:"m4",value:K.toArray()};else Q.uniforms[W]={value:K}}if(Object.keys(this.defines).length>0)Q.defines=this.defines;Q.vertexShader=this.vertexShader,Q.fragmentShader=this.fragmentShader,Q.lights=this.lights,Q.clipping=this.clipping;let $={};for(let W in this.extensions)if(this.extensions[W]===!0)$[W]=!0;if(Object.keys($).length>0)Q.extensions=$;return Q}fromJSON(J,Q){if(super.fromJSON(J,Q),J.uniforms!==void 0)for(let $ in J.uniforms){let W=J.uniforms[$];switch(this.uniforms[$]={},W.type){case"t":this.uniforms[$].value=Q[W.value]||null;break;case"c":this.uniforms[$].value=new p0().setHex(W.value);break;case"v2":this.uniforms[$].value=new n0().fromArray(W.value);break;case"v3":this.uniforms[$].value=new h().fromArray(W.value);break;case"v4":this.uniforms[$].value=new K8().fromArray(W.value);break;case"m3":this.uniforms[$].value=new w0().fromArray(W.value);break;case"m4":this.uniforms[$].value=new Z8().fromArray(W.value);break;default:this.uniforms[$].value=W.value}}if(J.defines!==void 0)this.defines=J.defines;if(J.vertexShader!==void 0)this.vertexShader=J.vertexShader;if(J.fragmentShader!==void 0)this.fragmentShader=J.fragmentShader;if(J.glslVersion!==void 0)this.glslVersion=J.glslVersion;if(J.extensions!==void 0)for(let $ in J.extensions)this.extensions[$]=J.extensions[$];if(J.lights!==void 0)this.lights=J.lights;if(J.clipping!==void 0)this.clipping=J.clipping;return this}}class $$ extends T8{constructor(J){super(J);this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class W$ extends j9{constructor(J){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(J)}copy(J){return super.copy(J),this.depthPacking=J.depthPacking,this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this.wireframe=J.wireframe,this.wireframeLinewidth=J.wireframeLinewidth,this}}class Z$ extends j9{constructor(J){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(J)}copy(J){return super.copy(J),this.map=J.map,this.alphaMap=J.alphaMap,this.displacementMap=J.displacementMap,this.displacementScale=J.displacementScale,this.displacementBias=J.displacementBias,this}}function I7(J,Q){if(!J||J.constructor===Q)return J;if(typeof Q.BYTES_PER_ELEMENT==="number")return new Q(J);return Array.prototype.slice.call(J)}class r9{constructor(J,Q,$,W){this.parameterPositions=J,this._cachedIndex=0,this.resultBuffer=W!==void 0?W:new Q.constructor($),this.sampleValues=Q,this.valueSize=$,this.settings=null,this.DefaultSettings_={}}evaluate(J){let Q=this.parameterPositions,$=this._cachedIndex,W=Q[$],Z=Q[$-1];$:{J:{let K;Q:{W:if(!(J<W)){for(let H=$+2;;){if(W===void 0){if(J<Z)break W;return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}if($===H)break;if(Z=W,W=Q[++$],J<W)break J}K=Q.length;break Q}if(!(J>=Z)){let H=Q[1];if(J<H)$=2,Z=H;for(let Y=$-2;;){if(Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if($===Y)break;if(W=Z,Z=Q[--$-1],J>=Z)break J}K=$,$=0;break Q}break $}while($<K){let H=$+K>>>1;if(J<Q[H])K=H;else $=H+1}if(W=Q[$],Z=Q[$-1],Z===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(W===void 0)return $=Q.length,this._cachedIndex=$,this.copySampleValue_($-1)}this._cachedIndex=$,this.intervalChanged_($,Z,W)}return this.interpolate_($,Z,J,W)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(J){let Q=this.resultBuffer,$=this.sampleValues,W=this.valueSize,Z=J*W;for(let K=0;K!==W;++K)Q[K]=$[Z+K];return Q}interpolate_(){throw Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class K$ extends r9{constructor(J,Q,$,W){super(J,Q,$,W);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:2400,endingEnd:2400}}intervalChanged_(J,Q,$){let W=this.parameterPositions,Z=J-2,K=J+1,H=W[Z],Y=W[K];if(H===void 0)switch(this.getSettings_().endingStart){case 2401:Z=J,H=2*Q-$;break;case 2402:Z=W.length-2,H=Q+W[Z]-W[Z+1];break;default:Z=J,H=$}if(Y===void 0)switch(this.getSettings_().endingEnd){case 2401:K=J,Y=2*$-Q;break;case 2402:K=1,Y=$+W[1]-W[0];break;default:K=J-1,Y=Q}let X=($-Q)*0.5,U=this.valueSize;this._weightPrev=X/(Q-H),this._weightNext=X/(Y-$),this._offsetPrev=Z*U,this._offsetNext=K*U}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this._offsetPrev,E=this._offsetNext,N=this._weightPrev,G=this._weightNext,F=($-Q)/(W-Q),O=F*F,V=O*F,D=-N*V+2*N*O-N*F,q=(1+N)*V+(-1.5-2*N)*O+(-0.5+N)*F+1,_=(-1-G)*V+(1.5+G)*O+0.5*F,A=G*V-G*O;for(let k=0;k!==H;++k)Z[k]=D*K[U+k]+q*K[X+k]+_*K[Y+k]+A*K[E+k];return Z}}class H$ extends r9{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=($-Q)/(W-Q),E=1-U;for(let N=0;N!==H;++N)Z[N]=K[X+N]*E+K[Y+N]*U;return Z}}class Y$ extends r9{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J){return this.copySampleValue_(J-1)}}class X$ extends r9{interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=J*H,X=Y-H,U=this.inTangents,E=this.outTangents;if(!U||!E){let F=($-Q)/(W-Q),O=1-F;for(let V=0;V!==H;++V)Z[V]=K[X+V]*O+K[Y+V]*F;return Z}let N=H*2,G=J-1;for(let F=0;F!==H;++F){let O=K[X+F],V=K[Y+F],D=G*N+F*2,q=E[D],_=E[D+1],A=J*N+F*2,k=U[A],I=U[A+1],C=($-Q)/(W-Q),w,R,z,p,P;for(let y=0;y<8;y++){w=C*C,R=w*C,z=1-C,p=z*z,P=p*z;let b=P*Q+3*p*C*q+3*z*w*k+R*W-$;if(Math.abs(b)<0.0000000001)break;let u=3*p*(q-Q)+6*z*C*(k-q)+3*w*(W-k);if(Math.abs(u)<0.0000000001)break;C=C-b/u,C=Math.max(0,Math.min(1,C))}Z[F]=P*O+3*p*C*_+3*z*w*I+R*V}return Z}}class n8{constructor(J,Q,$,W){if(J===void 0)throw Error("THREE.KeyframeTrack: track name is undefined");if(Q===void 0||Q.length===0)throw Error("THREE.KeyframeTrack: no keyframes in track named "+J);this.name=J,this.times=I7(Q,this.TimeBufferType),this.values=I7($,this.ValueBufferType),this.setInterpolation(W||this.DefaultInterpolation)}static toJSON(J){let Q=J.constructor,$;if(Q.toJSON!==this.toJSON)$=Q.toJSON(J);else{$={name:J.name,times:I7(J.times,Array),values:I7(J.values,Array)};let W=J.getInterpolation();if(W!==J.DefaultInterpolation)$.interpolation=W}return $.type=J.ValueTypeName,$}InterpolantFactoryMethodDiscrete(J){return new Y$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodLinear(J){return new H$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodSmooth(J){return new K$(this.times,this.values,this.getValueSize(),J)}InterpolantFactoryMethodBezier(J){let Q=new X$(this.times,this.values,this.getValueSize(),J);if(this.settings)Q.inTangents=this.settings.inTangents,Q.outTangents=this.settings.outTangents;return Q}setInterpolation(J){let Q;switch(J){case 2300:Q=this.InterpolantFactoryMethodDiscrete;break;case 2301:Q=this.InterpolantFactoryMethodLinear;break;case 2302:Q=this.InterpolantFactoryMethodSmooth;break;case 2303:Q=this.InterpolantFactoryMethodBezier;break}if(Q===void 0){let $="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(J!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error($);return C0("KeyframeTrack:",$),this}return this.createInterpolant=Q,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302;case this.InterpolantFactoryMethodBezier:return 2303}}getValueSize(){return this.values.length/this.times.length}shift(J){if(J!==0){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]+=J}return this}scale(J){if(J!==1){let Q=this.times;for(let $=0,W=Q.length;$!==W;++$)Q[$]*=J}return this}trim(J,Q){let $=this.times,W=$.length,Z=0,K=W-1;while(Z!==W&&$[Z]<J)++Z;while(K!==-1&&$[K]>Q)--K;if(++K,Z!==0||K!==W){if(Z>=K)K=Math.max(K,1),Z=K-1;let H=this.getValueSize();this.times=$.slice(Z,K),this.values=this.values.slice(Z*H,K*H)}return this}validate(){let J=!0,Q=this.getValueSize();if(Q-Math.floor(Q)!==0)P0("KeyframeTrack: Invalid value size in track.",this),J=!1;let $=this.times,W=this.values,Z=$.length;if(Z===0)P0("KeyframeTrack: Track is empty.",this),J=!1;let K=null;for(let H=0;H!==Z;H++){let Y=$[H];if(typeof Y==="number"&&isNaN(Y)){P0("KeyframeTrack: Time is not a valid number.",this,H,Y),J=!1;break}if(K!==null&&K>Y){P0("KeyframeTrack: Out of order keys.",this,H,Y,K),J=!1;break}K=Y}if(W!==void 0){if($H(W))for(let H=0,Y=W.length;H!==Y;++H){let X=W[H];if(isNaN(X)){P0("KeyframeTrack: Value is not a valid number.",this,H,X),J=!1;break}}}return J}optimize(){let J=this.times.slice(),Q=this.values.slice(),$=this.getValueSize(),W=this.getInterpolation()===2302,Z=J.length-1,K=1;for(let H=1;H<Z;++H){let Y=!1,X=J[H],U=J[H+1];if(X!==U&&(H!==1||X!==J[0]))if(!W){let E=H*$,N=E-$,G=E+$;for(let F=0;F!==$;++F){let O=Q[E+F];if(O!==Q[N+F]||O!==Q[G+F]){Y=!0;break}}}else Y=!0;if(Y){if(H!==K){J[K]=J[H];let E=H*$,N=K*$;for(let G=0;G!==$;++G)Q[N+G]=Q[E+G]}++K}}if(Z>0){J[K]=J[Z];for(let H=Z*$,Y=K*$,X=0;X!==$;++X)Q[Y+X]=Q[H+X];++K}if(K!==J.length)this.times=J.slice(0,K),this.values=Q.slice(0,K*$);else this.times=J,this.values=Q;return this}clone(){let J=this.times.slice(),Q=this.values.slice(),W=new this.constructor(this.name,J,Q);return W.createInterpolant=this.createInterpolant,W}}n8.prototype.ValueTypeName="";n8.prototype.TimeBufferType=Float32Array;n8.prototype.ValueBufferType=Float32Array;n8.prototype.DefaultInterpolation=2301;class t9 extends n8{constructor(J,Q,$){super(J,Q,$)}}t9.prototype.ValueTypeName="bool";t9.prototype.ValueBufferType=Array;t9.prototype.DefaultInterpolation=2300;t9.prototype.InterpolantFactoryMethodLinear=void 0;t9.prototype.InterpolantFactoryMethodSmooth=void 0;class U$ extends n8{constructor(J,Q,$,W){super(J,Q,$,W)}}U$.prototype.ValueTypeName="color";class G$ extends n8{constructor(J,Q,$,W){super(J,Q,$,W)}}G$.prototype.ValueTypeName="number";class N$ extends r9{constructor(J,Q,$,W){super(J,Q,$,W)}interpolate_(J,Q,$,W){let Z=this.resultBuffer,K=this.sampleValues,H=this.valueSize,Y=($-Q)/(W-Q),X=J*H;for(let U=X+H;X!==U;X+=4)R9.slerpFlat(Z,0,K,X-H,K,X,Y);return Z}}class WJ extends n8{constructor(J,Q,$,W){super(J,Q,$,W)}InterpolantFactoryMethodLinear(J){return new N$(this.times,this.values,this.getValueSize(),J)}}WJ.prototype.ValueTypeName="quaternion";WJ.prototype.InterpolantFactoryMethodSmooth=void 0;class e9 extends n8{constructor(J,Q,$){super(J,Q,$)}}e9.prototype.ValueTypeName="string";e9.prototype.ValueBufferType=Array;e9.prototype.DefaultInterpolation=2300;e9.prototype.InterpolantFactoryMethodLinear=void 0;e9.prototype.InterpolantFactoryMethodSmooth=void 0;class E$ extends n8{constructor(J,Q,$,W){super(J,Q,$,W)}}E$.prototype.ValueTypeName="vector";class q${constructor(J,Q,$){let W=this,Z=!1,K=0,H=0,Y=void 0,X=[];this.onStart=void 0,this.onLoad=J,this.onProgress=Q,this.onError=$,this._abortController=null,this.itemStart=function(U){if(H++,Z===!1){if(W.onStart!==void 0)W.onStart(U,K,H)}Z=!0},this.itemEnd=function(U){if(K++,W.onProgress!==void 0)W.onProgress(U,K,H);if(K===H){if(Z=!1,W.onLoad!==void 0)W.onLoad()}},this.itemError=function(U){if(W.onError!==void 0)W.onError(U)},this.resolveURL=function(U){if(U=U.normalize("NFC"),Y)return Y(U);return U},this.setURLModifier=function(U){return Y=U,this},this.addHandler=function(U,E){return X.push(U,E),this},this.removeHandler=function(U){let E=X.indexOf(U);if(E!==-1)X.splice(E,2);return this},this.getHandler=function(U){for(let E=0,N=X.length;E<N;E+=2){let G=X[E],F=X[E+1];if(G.global)G.lastIndex=0;if(G.test(U))return F}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){if(!this._abortController)this._abortController=new AbortController;return this._abortController}}var fZ=new q$;class F${constructor(J){if(this.manager=J!==void 0?J:fZ,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(J,Q){let $=this;return new Promise(function(W,Z){$.load(J,W,Q,Z)})}parse(){}setCrossOrigin(J){return this.crossOrigin=J,this}setWithCredentials(J){return this.withCredentials=J,this}setPath(J){return this.path=J,this}setResourcePath(J){return this.resourcePath=J,this}setRequestHeader(J){return this.requestHeader=J,this}abort(){return this}}F$.DEFAULT_MATERIAL_NAME="__DEFAULT";var _7=new h,C7=new R9,Q9=new h;class ZJ extends I8{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Z8,this.projectionMatrix=new Z8,this.projectionMatrixInverse=new Z8,this.coordinateSystem=2000,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(J,Q){return super.copy(J,Q),this.matrixWorldInverse.copy(J.matrixWorldInverse),this.projectionMatrix.copy(J.projectionMatrix),this.projectionMatrixInverse.copy(J.projectionMatrixInverse),this.coordinateSystem=J.coordinateSystem,this}getWorldDirection(J){return super.getWorldDirection(J).negate()}updateMatrixWorld(J){if(super.updateMatrixWorld(J),this.matrixWorld.decompose(_7,C7,Q9),Q9.x===1&&Q9.y===1&&Q9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(_7,C7,Q9.set(1,1,1)).invert()}updateWorldMatrix(J,Q,$=!1){if(super.updateWorldMatrix(J,Q,$),this.matrixWorld.decompose(_7,C7,Q9),Q9.x===1&&Q9.y===1&&Q9.z===1)this.matrixWorldInverse.copy(this.matrixWorld).invert();else this.matrixWorldInverse.compose(_7,C7,Q9.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}var P9=new h,SW=new n0,jW=new n0;class y8 extends ZJ{constructor(J=50,Q=1,$=0.1,W=2000){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=J,this.zoom=1,this.near=$,this.far=W,this.focus=10,this.aspect=Q,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.fov=J.fov,this.zoom=J.zoom,this.near=J.near,this.far=J.far,this.focus=J.focus,this.aspect=J.aspect,this.view=J.view===null?null:Object.assign({},J.view),this.filmGauge=J.filmGauge,this.filmOffset=J.filmOffset,this}setFocalLength(J){let Q=0.5*this.getFilmHeight()/J;this.fov=A7*2*Math.atan(Q),this.updateProjectionMatrix()}getFocalLength(){let J=Math.tan(BJ*0.5*this.fov);return 0.5*this.getFilmHeight()/J}getEffectiveFOV(){return A7*2*Math.atan(Math.tan(BJ*0.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(J,Q,$){P9.set(-1,-1,0.5).applyMatrix4(this.projectionMatrixInverse),Q.set(P9.x,P9.y).multiplyScalar(-J/P9.z),P9.set(1,1,0.5).applyMatrix4(this.projectionMatrixInverse),$.set(P9.x,P9.y).multiplyScalar(-J/P9.z)}getViewSize(J,Q){return this.getViewBounds(J,SW,jW),Q.subVectors(jW,SW)}setViewOffset(J,Q,$,W,Z,K){if(this.aspect=J/Q,this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=this.near,Q=J*Math.tan(BJ*0.5*this.fov)/this.zoom,$=2*Q,W=this.aspect*$,Z=-0.5*W,K=this.view;if(this.view!==null&&this.view.enabled){let{fullWidth:Y,fullHeight:X}=K;Z+=K.offsetX*W/Y,Q-=K.offsetY*$/X,W*=K.width/Y,$*=K.height/X}let H=this.filmOffset;if(H!==0)Z+=J*H/this.getFilmWidth();this.projectionMatrix.makePerspective(Z,Z+W,Q,Q-$,J,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.fov=this.fov,Q.object.zoom=this.zoom,Q.object.near=this.near,Q.object.far=this.far,Q.object.focus=this.focus,Q.object.aspect=this.aspect,this.view!==null)Q.object.view=Object.assign({},this.view);return Q.object.filmGauge=this.filmGauge,Q.object.filmOffset=this.filmOffset,Q}}class A6 extends ZJ{constructor(J=-1,Q=1,$=1,W=-1,Z=0.1,K=2000){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=J,this.right=Q,this.top=$,this.bottom=W,this.near=Z,this.far=K,this.updateProjectionMatrix()}copy(J,Q){return super.copy(J,Q),this.left=J.left,this.right=J.right,this.top=J.top,this.bottom=J.bottom,this.near=J.near,this.far=J.far,this.zoom=J.zoom,this.view=J.view===null?null:Object.assign({},J.view),this}setViewOffset(J,Q,$,W,Z,K){if(this.view===null)this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1};this.view.enabled=!0,this.view.fullWidth=J,this.view.fullHeight=Q,this.view.offsetX=$,this.view.offsetY=W,this.view.width=Z,this.view.height=K,this.updateProjectionMatrix()}clearViewOffset(){if(this.view!==null)this.view.enabled=!1;this.updateProjectionMatrix()}updateProjectionMatrix(){let J=(this.right-this.left)/(2*this.zoom),Q=(this.top-this.bottom)/(2*this.zoom),$=(this.right+this.left)/2,W=(this.top+this.bottom)/2,Z=$-J,K=$+J,H=W+Q,Y=W-Q;if(this.view!==null&&this.view.enabled){let X=(this.right-this.left)/this.view.fullWidth/this.zoom,U=(this.top-this.bottom)/this.view.fullHeight/this.zoom;Z+=X*this.view.offsetX,K=Z+X*this.view.width,H-=U*this.view.offsetY,Y=H-U*this.view.height}this.projectionMatrix.makeOrthographic(Z,K,H,Y,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(J){let Q=super.toJSON(J);if(Q.object.zoom=this.zoom,Q.object.left=this.left,Q.object.right=this.right,Q.object.top=this.top,Q.object.bottom=this.bottom,Q.object.near=this.near,Q.object.far=this.far,this.view!==null)Q.object.view=Object.assign({},this.view);return Q}}class KJ extends C8{constructor(){super();this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(J){return super.copy(J),this.instanceCount=J.instanceCount,this}toJSON(){let J=super.toJSON();return J.instanceCount=this.instanceCount,J.isInstancedBufferGeometry=!0,J}}var O6=-90,M6=1;class D$ extends I8{constructor(J,Q,$){super();this.type="CubeCamera",this.renderTarget=$,this.coordinateSystem=null,this.activeMipmapLevel=0;let W=new y8(O6,M6,J,Q);W.layers=this.layers,this.add(W);let Z=new y8(O6,M6,J,Q);Z.layers=this.layers,this.add(Z);let K=new y8(O6,M6,J,Q);K.layers=this.layers,this.add(K);let H=new y8(O6,M6,J,Q);H.layers=this.layers,this.add(H);let Y=new y8(O6,M6,J,Q);Y.layers=this.layers,this.add(Y);let X=new y8(O6,M6,J,Q);X.layers=this.layers,this.add(X)}updateCoordinateSystem(){let J=this.coordinateSystem,Q=this.children.concat(),[$,W,Z,K,H,Y]=Q;for(let X of Q)this.remove(X);if(J===2000)$.up.set(0,1,0),$.lookAt(1,0,0),W.up.set(0,1,0),W.lookAt(-1,0,0),Z.up.set(0,0,-1),Z.lookAt(0,1,0),K.up.set(0,0,1),K.lookAt(0,-1,0),H.up.set(0,1,0),H.lookAt(0,0,1),Y.up.set(0,1,0),Y.lookAt(0,0,-1);else if(J===2001)$.up.set(0,-1,0),$.lookAt(-1,0,0),W.up.set(0,-1,0),W.lookAt(1,0,0),Z.up.set(0,0,1),Z.lookAt(0,1,0),K.up.set(0,0,-1),K.lookAt(0,-1,0),H.up.set(0,-1,0),H.lookAt(0,0,1),Y.up.set(0,-1,0),Y.lookAt(0,0,-1);else throw Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+J);for(let X of Q)this.add(X),X.updateMatrixWorld()}update(J,Q){if(this.parent===null)this.updateMatrixWorld();let{renderTarget:$,activeMipmapLevel:W}=this;if(this.coordinateSystem!==J.coordinateSystem)this.coordinateSystem=J.coordinateSystem,this.updateCoordinateSystem();let[Z,K,H,Y,X,U]=this.children,E=J.getRenderTarget(),N=J.getActiveCubeFace(),G=J.getActiveMipmapLevel(),F=J.xr.enabled;J.xr.enabled=!1;let O=$.texture.generateMipmaps;$.texture.generateMipmaps=!1;let V=!1;if(J.isWebGLRenderer===!0)V=J.state.buffers.depth.getReversed();else V=J.reversedDepthBuffer;if(J.setRenderTarget($,0,W),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Z),J.setRenderTarget($,1,W),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,K),J.setRenderTarget($,2,W),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,H),J.setRenderTarget($,3,W),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,Y),J.setRenderTarget($,4,W),V&&J.autoClear===!1)J.clearDepth();if(J.render(Q,X),$.texture.generateMipmaps=O,J.setRenderTarget($,5,W),V&&J.autoClear===!1)J.clearDepth();J.render(Q,U),J.setRenderTarget(E,N,G),J.xr.enabled=F,$.texture.needsPMREMUpdate=!0}}class O$ extends y8{constructor(J=[]){super();this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=J}}var M$="\\[\\]\\.:\\/",_H=new RegExp("["+M$+"]","g"),R$="[^"+M$+"]",CH="[^"+M$.replace("\\.","")+"]",AH=/((?:WC+[\/:])*)/.source.replace("WC",R$),PH=/(WCOD+)?/.source.replace("WCOD",CH),wH=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",R$),TH=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",R$),SH=new RegExp("^"+AH+PH+wH+TH+"$"),jH=["material","materials","bones","map"];class yZ{constructor(J,Q,$){let W=$||i0.parseTrackName(Q);this._targetGroup=J,this._bindings=J.subscribe_(Q,W)}getValue(J,Q){this.bind();let $=this._targetGroup.nCachedObjects_,W=this._bindings[$];if(W!==void 0)W.getValue(J,Q)}setValue(J,Q){let $=this._bindings;for(let W=this._targetGroup.nCachedObjects_,Z=$.length;W!==Z;++W)$[W].setValue(J,Q)}bind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].bind()}unbind(){let J=this._bindings;for(let Q=this._targetGroup.nCachedObjects_,$=J.length;Q!==$;++Q)J[Q].unbind()}}class i0{constructor(J,Q,$){this.path=Q,this.parsedPath=$||i0.parseTrackName(Q),this.node=i0.findNode(J,this.parsedPath.nodeName),this.rootNode=J,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(J,Q,$){if(!(J&&J.isAnimationObjectGroup))return new i0(J,Q,$);else return new i0.Composite(J,Q,$)}static sanitizeNodeName(J){return J.replace(/\s/g,"_").replace(_H,"")}static parseTrackName(J){let Q=SH.exec(J);if(Q===null)throw Error("THREE.PropertyBinding: Cannot parse trackName: "+J);let $={nodeName:Q[2],objectName:Q[3],objectIndex:Q[4],propertyName:Q[5],propertyIndex:Q[6]},W=$.nodeName&&$.nodeName.lastIndexOf(".");if(W!==void 0&&W!==-1){let Z=$.nodeName.substring(W+1);if(jH.indexOf(Z)!==-1)$.nodeName=$.nodeName.substring(0,W),$.objectName=Z}if($.propertyName===null||$.propertyName.length===0)throw Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+J);return $}static findNode(J,Q){if(Q===void 0||Q===""||Q==="."||Q===-1||Q===J.name||Q===J.uuid)return J;if(J.skeleton){let $=J.skeleton.getBoneByName(Q);if($!==void 0)return $}if(J.children){let $=function(Z){for(let K=0;K<Z.length;K++){let H=Z[K];if(H.name===Q||H.uuid===Q)return H;let Y=$(H.children);if(Y)return Y}return null},W=$(J.children);if(W)return W}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(J,Q){J[Q]=this.targetObject[this.propertyName]}_getValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)J[Q++]=$[W]}_getValue_arrayElement(J,Q){J[Q]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(J,Q){this.resolvedProperty.toArray(J,Q)}_setValue_direct(J,Q){this.targetObject[this.propertyName]=J[Q]}_setValue_direct_setNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(J,Q){this.targetObject[this.propertyName]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++]}_setValue_array_setNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(J,Q){let $=this.resolvedProperty;for(let W=0,Z=$.length;W!==Z;++W)$[W]=J[Q++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q]}_setValue_arrayElement_setNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty[this.propertyIndex]=J[Q],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(J,Q){this.resolvedProperty.fromArray(J,Q)}_setValue_fromArray_setNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(J,Q){this.resolvedProperty.fromArray(J,Q),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(J,Q){this.bind(),this.getValue(J,Q)}_setValue_unbound(J,Q){this.bind(),this.setValue(J,Q)}bind(){let J=this.node,Q=this.parsedPath,$=Q.objectName,W=Q.propertyName,Z=Q.propertyIndex;if(!J)J=i0.findNode(this.rootNode,Q.nodeName),this.node=J;if(this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!J){C0("PropertyBinding: No target node found for track: "+this.path+".");return}if($){let X=Q.objectIndex;switch($){case"materials":if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.materials){P0("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}J=J.material.materials;break;case"bones":if(!J.skeleton){P0("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}J=J.skeleton.bones;for(let U=0;U<J.length;U++)if(J[U].name===X){X=U;break}break;case"map":if("map"in J){J=J.map;break}if(!J.material){P0("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!J.material.map){P0("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}J=J.material.map;break;default:if(J[$]===void 0){P0("PropertyBinding: Can not bind to objectName of node undefined.",this);return}J=J[$]}if(X!==void 0){if(J[X]===void 0){P0("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,J);return}J=J[X]}}let K=J[W];if(K===void 0){let X=Q.nodeName;P0("PropertyBinding: Trying to update property for track: "+X+"."+W+" but it wasn't found.",J);return}let H=this.Versioning.None;if(this.targetObject=J,J.isMaterial===!0)H=this.Versioning.NeedsUpdate;else if(J.isObject3D===!0)H=this.Versioning.MatrixWorldNeedsUpdate;let Y=this.BindingType.Direct;if(Z!==void 0){if(W==="morphTargetInfluences"){if(!J.geometry){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!J.geometry.morphAttributes){P0("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}if(J.morphTargetDictionary[Z]!==void 0)Z=J.morphTargetDictionary[Z]}Y=this.BindingType.ArrayElement,this.resolvedProperty=K,this.propertyIndex=Z}else if(K.fromArray!==void 0&&K.toArray!==void 0)Y=this.BindingType.HasFromToArray,this.resolvedProperty=K;else if(Array.isArray(K))Y=this.BindingType.EntireArray,this.resolvedProperty=K;else this.propertyName=W;this.getValue=this.GetterByBindingType[Y],this.setValue=this.SetterByBindingTypeAndVersioning[Y][H]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}i0.Composite=yZ;i0.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};i0.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};i0.prototype.GetterByBindingType=[i0.prototype._getValue_direct,i0.prototype._getValue_array,i0.prototype._getValue_arrayElement,i0.prototype._getValue_toArray];i0.prototype.SetterByBindingTypeAndVersioning=[[i0.prototype._setValue_direct,i0.prototype._setValue_direct_setNeedsUpdate,i0.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_array,i0.prototype._setValue_array_setNeedsUpdate,i0.prototype._setValue_array_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_arrayElement,i0.prototype._setValue_arrayElement_setNeedsUpdate,i0.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[i0.prototype._setValue_fromArray,i0.prototype._setValue_fromArray_setNeedsUpdate,i0.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var m1=new Float32Array(1);class k${static{k$.prototype.isMatrix2=!0}constructor(J,Q,$,W){if(this.elements=[1,0,0,1],J!==void 0)this.set(J,Q,$,W)}identity(){return this.set(1,0,0,1),this}fromArray(J,Q=0){for(let $=0;$<4;$++)this.elements[$]=J[$+Q];return this}set(J,Q,$,W){let Z=this.elements;return Z[0]=J,Z[2]=Q,Z[1]=$,Z[3]=W,this}}function L$(J,Q,$,W){let Z=vH(W);switch($){case 1021:return J*Q;case 1028:return J*Q/Z.components*Z.byteLength;case 1029:return J*Q/Z.components*Z.byteLength;case 1030:return J*Q*2/Z.components*Z.byteLength;case 1031:return J*Q*2/Z.components*Z.byteLength;case 1022:return J*Q*3/Z.components*Z.byteLength;case 1023:return J*Q*4/Z.components*Z.byteLength;case 1033:return J*Q*4/Z.components*Z.byteLength;case 33776:case 33777:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 33778:case 33779:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 35841:case 35843:return Math.max(J,16)*Math.max(Q,8)/4;case 35840:case 35842:return Math.max(J,8)*Math.max(Q,8)/2;case 36196:case 37492:case 37488:case 37489:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*8;case 37496:case 37490:case 37491:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37808:return Math.floor((J+3)/4)*Math.floor((Q+3)/4)*16;case 37809:return Math.floor((J+4)/5)*Math.floor((Q+3)/4)*16;case 37810:return Math.floor((J+4)/5)*Math.floor((Q+4)/5)*16;case 37811:return Math.floor((J+5)/6)*Math.floor((Q+4)/5)*16;case 37812:return Math.floor((J+5)/6)*Math.floor((Q+5)/6)*16;case 37813:return Math.floor((J+7)/8)*Math.floor((Q+4)/5)*16;case 37814:return Math.floor((J+7)/8)*Math.floor((Q+5)/6)*16;case 37815:return Math.floor((J+7)/8)*Math.floor((Q+7)/8)*16;case 37816:return Math.floor((J+9)/10)*Math.floor((Q+4)/5)*16;case 37817:return Math.floor((J+9)/10)*Math.floor((Q+5)/6)*16;case 37818:return Math.floor((J+9)/10)*Math.floor((Q+7)/8)*16;case 37819:return Math.floor((J+9)/10)*Math.floor((Q+9)/10)*16;case 37820:return Math.floor((J+11)/12)*Math.floor((Q+9)/10)*16;case 37821:return Math.floor((J+11)/12)*Math.floor((Q+11)/12)*16;case 36492:case 36494:case 36495:return Math.ceil(J/4)*Math.ceil(Q/4)*16;case 36283:case 36284:return Math.ceil(J/4)*Math.ceil(Q/4)*8;case 36285:case 36286:return Math.ceil(J/4)*Math.ceil(Q/4)*16}throw Error(`Unable to determine texture byte length for ${$} format.`)}function vH(J){switch(J){case 1009:case 1010:return{byteLength:1,components:1};case 1012:case 1011:case 1016:return{byteLength:2,components:1};case 1017:case 1018:return{byteLength:2,components:4};case 1014:case 1013:case 1015:return{byteLength:4,components:1};case 35902:case 35899:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${J}.`)}if(typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"185"}}));if(typeof window<"u")if(window.__THREE__)C0("WARNING: Multiple instances of Three.js being imported.");else window.__THREE__="185";function ZK(){let J=null,Q=!1,$=null,W=null;function Z(K,H){$(K,H),W=J.requestAnimationFrame(Z)}return{start:function(){if(Q===!0)return;if($===null)return;if(J===null)return;W=J.requestAnimationFrame(Z),Q=!0},stop:function(){if(J!==null)J.cancelAnimationFrame(W);Q=!1},setAnimationLoop:function(K){$=K},setContext:function(K){J=K}}}function fH(J){let Q=new WeakMap;function $(Y,X){let{array:U,usage:E}=Y,N=U.byteLength,G=J.createBuffer();J.bindBuffer(X,G),J.bufferData(X,U,E),Y.onUploadCallback();let F;if(U instanceof Float32Array)F=J.FLOAT;else if(typeof Float16Array<"u"&&U instanceof Float16Array)F=J.HALF_FLOAT;else if(U instanceof Uint16Array)if(Y.isFloat16BufferAttribute)F=J.HALF_FLOAT;else F=J.UNSIGNED_SHORT;else if(U instanceof Int16Array)F=J.SHORT;else if(U instanceof Uint32Array)F=J.UNSIGNED_INT;else if(U instanceof Int32Array)F=J.INT;else if(U instanceof Int8Array)F=J.BYTE;else if(U instanceof Uint8Array)F=J.UNSIGNED_BYTE;else if(U instanceof Uint8ClampedArray)F=J.UNSIGNED_BYTE;else throw Error("THREE.WebGLAttributes: Unsupported buffer data format: "+U);return{buffer:G,type:F,bytesPerElement:U.BYTES_PER_ELEMENT,version:Y.version,size:N}}function W(Y,X,U){let{array:E,updateRanges:N}=X;if(J.bindBuffer(U,Y),N.length===0)J.bufferSubData(U,0,E);else{N.sort((F,O)=>F.start-O.start);let G=0;for(let F=1;F<N.length;F++){let O=N[G],V=N[F];if(V.start<=O.start+O.count+1)O.count=Math.max(O.count,V.start+V.count-O.start);else++G,N[G]=V}N.length=G+1;for(let F=0,O=N.length;F<O;F++){let V=N[F];J.bufferSubData(U,V.start*E.BYTES_PER_ELEMENT,E,V.start,V.count)}X.clearUpdateRanges()}X.onUploadCallback()}function Z(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;return Q.get(Y)}function K(Y){if(Y.isInterleavedBufferAttribute)Y=Y.data;let X=Q.get(Y);if(X)J.deleteBuffer(X.buffer),Q.delete(Y)}function H(Y,X){if(Y.isInterleavedBufferAttribute)Y=Y.data;if(Y.isGLBufferAttribute){let E=Q.get(Y);if(!E||E.version<Y.version)Q.set(Y,{buffer:Y.buffer,type:Y.type,bytesPerElement:Y.elementSize,version:Y.version});return}let U=Q.get(Y);if(U===void 0)Q.set(Y,$(Y,X));else if(U.version<Y.version){if(U.size!==Y.array.byteLength)throw Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");W(U.buffer,Y,X),U.version=Y.version}}return{get:Z,remove:K,update:H}}var yH=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bH=`#ifdef USE_ALPHAHASH
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
#endif`,hH=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xH=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gH=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pH=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mH=`#ifdef USE_AOMAP
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
#endif`,lH=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dH=`#ifdef USE_BATCHING
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
#endif`,uH=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cH=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,nH=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sH=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iH=`#ifdef USE_IRIDESCENCE
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
#endif`,oH=`#ifdef USE_BUMPMAP
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
#endif`,aH=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,rH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,tH=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,eH=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,JY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,QY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,$Y=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,WY=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ZY=`#define PI 3.141592653589793
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
} // validated`,KY=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,HY=`vec3 transformedNormal = objectNormal;
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
#endif`,YY=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,XY=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,UY=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,GY=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,NY="gl_FragColor = linearToOutputTexel( gl_FragColor );",EY=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qY=`#ifdef USE_ENVMAP
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
#endif`,FY=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,DY=`#ifdef USE_ENVMAP
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
#endif`,OY=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,MY=`#ifdef USE_ENVMAP
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
#endif`,RY=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,kY=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,LY=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,VY=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,BY=`#ifdef USE_GRADIENTMAP
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
}`,zY=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,IY=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_Y=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,CY=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,AY=`#ifdef USE_ENVMAP
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
#endif`,PY=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,wY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,TY=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,SY=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jY=`PhysicalMaterial material;
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
#endif`,vY=`uniform sampler2D dfgLUT;
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
}`,fY=`
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
#endif`,yY=`#if defined( RE_IndirectDiffuse )
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
#endif`,bY=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hY=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,xY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,gY=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mY=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lY=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dY=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uY=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cY=`#if defined( USE_POINTS_UV )
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
#endif`,nY=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,sY=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,iY=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,oY=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,aY=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rY=`#ifdef USE_MORPHTARGETS
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
#endif`,tY=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,eY=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,JX=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,QX=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$X=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,WX=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ZX=`#ifdef USE_NORMALMAP
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
#endif`,KX=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,HX=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,YX=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,XX=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,UX=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,GX=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,NX=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,EX=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qX=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,FX=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,DX=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,OX=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,MX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,RX=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kX=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,LX=`float getShadowMask() {
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
}`,VX=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,BX=`#ifdef USE_SKINNING
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
#endif`,zX=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,IX=`#ifdef USE_SKINNING
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
#endif`,_X=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,CX=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,AX=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,PX=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,wX=`#ifdef USE_TRANSMISSION
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
#endif`,TX=`#ifdef USE_TRANSMISSION
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
#endif`,SX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vX=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fX=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,yX=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,bX=`uniform sampler2D t2D;
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
}`,hX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xX=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pX=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,mX=`#include <common>
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
}`,lX=`#if DEPTH_PACKING == 3200
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
}`,dX=`#define DISTANCE
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
}`,uX=`#define DISTANCE
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
}`,cX=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nX=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sX=`uniform float scale;
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
}`,iX=`uniform vec3 diffuse;
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
}`,oX=`#include <common>
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
}`,aX=`uniform vec3 diffuse;
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
}`,rX=`#define LAMBERT
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
}`,tX=`#define LAMBERT
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
}`,eX=`#define MATCAP
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
}`,JU=`#define MATCAP
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
}`,QU=`#define NORMAL
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
}`,$U=`#define NORMAL
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
}`,WU=`#define PHONG
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
}`,ZU=`#define PHONG
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
}`,KU=`#define STANDARD
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
}`,HU=`#define STANDARD
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
}`,YU=`#define TOON
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
}`,XU=`#define TOON
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
}`,UU=`uniform float size;
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
}`,GU=`uniform vec3 diffuse;
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
}`,NU=`#include <common>
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
}`,EU=`uniform vec3 color;
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
}`,qU=`uniform float rotation;
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
}`,FU=`uniform vec3 diffuse;
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
}`,v0={alphahash_fragment:yH,alphahash_pars_fragment:bH,alphamap_fragment:hH,alphamap_pars_fragment:xH,alphatest_fragment:gH,alphatest_pars_fragment:pH,aomap_fragment:mH,aomap_pars_fragment:lH,batching_pars_vertex:dH,batching_vertex:uH,begin_vertex:cH,beginnormal_vertex:nH,bsdfs:sH,iridescence_fragment:iH,bumpmap_pars_fragment:oH,clipping_planes_fragment:aH,clipping_planes_pars_fragment:rH,clipping_planes_pars_vertex:tH,clipping_planes_vertex:eH,color_fragment:JY,color_pars_fragment:QY,color_pars_vertex:$Y,color_vertex:WY,common:ZY,cube_uv_reflection_fragment:KY,defaultnormal_vertex:HY,displacementmap_pars_vertex:YY,displacementmap_vertex:XY,emissivemap_fragment:UY,emissivemap_pars_fragment:GY,colorspace_fragment:NY,colorspace_pars_fragment:EY,envmap_fragment:qY,envmap_common_pars_fragment:FY,envmap_pars_fragment:DY,envmap_pars_vertex:OY,envmap_physical_pars_fragment:AY,envmap_vertex:MY,fog_vertex:RY,fog_pars_vertex:kY,fog_fragment:LY,fog_pars_fragment:VY,gradientmap_pars_fragment:BY,lightmap_pars_fragment:zY,lights_lambert_fragment:IY,lights_lambert_pars_fragment:_Y,lights_pars_begin:CY,lights_toon_fragment:PY,lights_toon_pars_fragment:wY,lights_phong_fragment:TY,lights_phong_pars_fragment:SY,lights_physical_fragment:jY,lights_physical_pars_fragment:vY,lights_fragment_begin:fY,lights_fragment_maps:yY,lights_fragment_end:bY,lightprobes_pars_fragment:hY,logdepthbuf_fragment:xY,logdepthbuf_pars_fragment:gY,logdepthbuf_pars_vertex:pY,logdepthbuf_vertex:mY,map_fragment:lY,map_pars_fragment:dY,map_particle_fragment:uY,map_particle_pars_fragment:cY,metalnessmap_fragment:nY,metalnessmap_pars_fragment:sY,morphinstance_vertex:iY,morphcolor_vertex:oY,morphnormal_vertex:aY,morphtarget_pars_vertex:rY,morphtarget_vertex:tY,normal_fragment_begin:eY,normal_fragment_maps:JX,normal_pars_fragment:QX,normal_pars_vertex:$X,normal_vertex:WX,normalmap_pars_fragment:ZX,clearcoat_normal_fragment_begin:KX,clearcoat_normal_fragment_maps:HX,clearcoat_pars_fragment:YX,iridescence_pars_fragment:XX,opaque_fragment:UX,packing:GX,premultiplied_alpha_fragment:NX,project_vertex:EX,dithering_fragment:qX,dithering_pars_fragment:FX,roughnessmap_fragment:DX,roughnessmap_pars_fragment:OX,shadowmap_pars_fragment:MX,shadowmap_pars_vertex:RX,shadowmap_vertex:kX,shadowmask_pars_fragment:LX,skinbase_vertex:VX,skinning_pars_vertex:BX,skinning_vertex:zX,skinnormal_vertex:IX,specularmap_fragment:_X,specularmap_pars_fragment:CX,tonemapping_fragment:AX,tonemapping_pars_fragment:PX,transmission_fragment:wX,transmission_pars_fragment:TX,uv_pars_fragment:SX,uv_pars_vertex:jX,uv_vertex:vX,worldpos_vertex:fX,background_vert:yX,background_frag:bX,backgroundCube_vert:hX,backgroundCube_frag:xX,cube_vert:gX,cube_frag:pX,depth_vert:mX,depth_frag:lX,distance_vert:dX,distance_frag:uX,equirect_vert:cX,equirect_frag:nX,linedashed_vert:sX,linedashed_frag:iX,meshbasic_vert:oX,meshbasic_frag:aX,meshlambert_vert:rX,meshlambert_frag:tX,meshmatcap_vert:eX,meshmatcap_frag:JU,meshnormal_vert:QU,meshnormal_frag:$U,meshphong_vert:WU,meshphong_frag:ZU,meshphysical_vert:KU,meshphysical_frag:HU,meshtoon_vert:YU,meshtoon_frag:XU,points_vert:UU,points_frag:GU,shadow_vert:NU,shadow_frag:EU,sprite_vert:qU,sprite_frag:FU},N0={common:{diffuse:{value:new p0(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new w0},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new w0}},envmap:{envMap:{value:null},envMapRotation:{value:new w0},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:0.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new w0}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new w0}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new w0},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new w0},normalScale:{value:new n0(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new w0},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new w0}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new w0}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new w0}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:0.00025},fogNear:{value:1},fogFar:{value:2000},fogColor:{value:new p0(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new h},probesMax:{value:new h},probesResolution:{value:new h}},points:{diffuse:{value:new p0(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0},uvTransform:{value:new w0}},sprite:{diffuse:{value:new p0(16777215)},opacity:{value:1},center:{value:new n0(0.5,0.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new w0},alphaMap:{value:null},alphaMapTransform:{value:new w0},alphaTest:{value:0}}},H9={basic:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.fog]),vertexShader:v0.meshbasic_vert,fragmentShader:v0.meshbasic_frag},lambert:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},envMapIntensity:{value:1}}]),vertexShader:v0.meshlambert_vert,fragmentShader:v0.meshlambert_frag},phong:{uniforms:A8([N0.common,N0.specularmap,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},specular:{value:new p0(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:v0.meshphong_vert,fragmentShader:v0.meshphong_frag},standard:{uniforms:A8([N0.common,N0.envmap,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.roughnessmap,N0.metalnessmap,N0.fog,N0.lights,{emissive:{value:new p0(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag},toon:{uniforms:A8([N0.common,N0.aomap,N0.lightmap,N0.emissivemap,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.gradientmap,N0.fog,N0.lights,{emissive:{value:new p0(0)}}]),vertexShader:v0.meshtoon_vert,fragmentShader:v0.meshtoon_frag},matcap:{uniforms:A8([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,N0.fog,{matcap:{value:null}}]),vertexShader:v0.meshmatcap_vert,fragmentShader:v0.meshmatcap_frag},points:{uniforms:A8([N0.points,N0.fog]),vertexShader:v0.points_vert,fragmentShader:v0.points_frag},dashed:{uniforms:A8([N0.common,N0.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:v0.linedashed_vert,fragmentShader:v0.linedashed_frag},depth:{uniforms:A8([N0.common,N0.displacementmap]),vertexShader:v0.depth_vert,fragmentShader:v0.depth_frag},normal:{uniforms:A8([N0.common,N0.bumpmap,N0.normalmap,N0.displacementmap,{opacity:{value:1}}]),vertexShader:v0.meshnormal_vert,fragmentShader:v0.meshnormal_frag},sprite:{uniforms:A8([N0.sprite,N0.fog]),vertexShader:v0.sprite_vert,fragmentShader:v0.sprite_frag},background:{uniforms:{uvTransform:{value:new w0},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:v0.background_vert,fragmentShader:v0.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new w0}},vertexShader:v0.backgroundCube_vert,fragmentShader:v0.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:v0.cube_vert,fragmentShader:v0.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:v0.equirect_vert,fragmentShader:v0.equirect_frag},distance:{uniforms:A8([N0.common,N0.displacementmap,{referencePosition:{value:new h},nearDistance:{value:1},farDistance:{value:1000}}]),vertexShader:v0.distance_vert,fragmentShader:v0.distance_frag},shadow:{uniforms:A8([N0.lights,N0.fog,{color:{value:new p0(0)},opacity:{value:1}}]),vertexShader:v0.shadow_vert,fragmentShader:v0.shadow_frag}};H9.physical={uniforms:A8([H9.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new w0},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new w0},clearcoatNormalScale:{value:new n0(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new w0},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new w0},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new w0},sheen:{value:0},sheenColor:{value:new p0(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new w0},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new w0},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new w0},transmissionSamplerSize:{value:new n0},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new w0},attenuationDistance:{value:0},attenuationColor:{value:new p0(0)},specularColor:{value:new p0(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new w0},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new w0},anisotropyVector:{value:new n0},anisotropyMap:{value:null},anisotropyMapTransform:{value:new w0}}]),vertexShader:v0.meshphysical_vert,fragmentShader:v0.meshphysical_frag};var HJ={r:0,b:0,g:0},DU=new Z8,KK=new w0;KK.set(-1,0,0,0,1,0,0,0,1);function OU(J,Q,$,W,Z,K){let H=new p0(0),Y=Z===!0?0:1,X,U,E=null,N=0,G=null;function F(_){let A=_.isScene===!0?_.background:null;if(A&&A.isTexture){let k=_.backgroundBlurriness>0;A=Q.get(A,k)}return A}function O(_){let A=!1,k=F(_);if(k===null)D(H,Y);else if(k&&k.isColor)D(k,1),A=!0;let I=J.xr.getEnvironmentBlendMode();if(I==="additive")$.buffers.color.setClear(0,0,0,1,K);else if(I==="alpha-blend")$.buffers.color.setClear(0,0,0,0,K);if(J.autoClear||A)$.buffers.depth.setTest(!0),$.buffers.depth.setMask(!0),$.buffers.color.setMask(!0),J.clear(J.autoClearColor,J.autoClearDepth,J.autoClearStencil)}function V(_,A){let k=F(A);if(k&&(k.isCubeTexture||k.mapping===m6)){if(U===void 0)U=new x8(new C6(1,1,1),new T8({name:"BackgroundCubeMaterial",uniforms:a9(H9.backgroundCube.uniforms),vertexShader:H9.backgroundCube.vertexShader,fragmentShader:H9.backgroundCube.fragmentShader,side:w8,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),U.geometry.deleteAttribute("normal"),U.geometry.deleteAttribute("uv"),U.onBeforeRender=function(I,C,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(U.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),W.update(U);if(U.material.uniforms.envMap.value=k,U.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,U.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,U.material.uniforms.backgroundRotation.value.setFromMatrix4(DU.makeRotationFromEuler(A.backgroundRotation)).transpose(),k.isCubeTexture&&k.isRenderTargetTexture===!1)U.material.uniforms.backgroundRotation.value.premultiply(KK);if(U.material.toneMapped=g0.getTransfer(k.colorSpace)!==e0,E!==k||N!==k.version||G!==J.toneMapping)U.material.needsUpdate=!0,E=k,N=k.version,G=J.toneMapping;U.layers.enableAll(),_.unshift(U,U.geometry,U.material,0,0,null)}else if(k&&k.isTexture){if(X===void 0)X=new x8(new f9(2,2),new T8({name:"BackgroundMaterial",uniforms:a9(H9.background.uniforms),vertexShader:H9.background.vertexShader,fragmentShader:H9.background.fragmentShader,side:B6,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),X.geometry.deleteAttribute("normal"),Object.defineProperty(X.material,"map",{get:function(){return this.uniforms.t2D.value}}),W.update(X);if(X.material.uniforms.t2D.value=k,X.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,X.material.toneMapped=g0.getTransfer(k.colorSpace)!==e0,k.matrixAutoUpdate===!0)k.updateMatrix();if(X.material.uniforms.uvTransform.value.copy(k.matrix),E!==k||N!==k.version||G!==J.toneMapping)X.material.needsUpdate=!0,E=k,N=k.version,G=J.toneMapping;X.layers.enableAll(),_.unshift(X,X.geometry,X.material,0,0,null)}}function D(_,A){_.getRGB(HJ,Q$(J)),$.buffers.color.setClear(HJ.r,HJ.g,HJ.b,A,K)}function q(){if(U!==void 0)U.geometry.dispose(),U.material.dispose(),U=void 0;if(X!==void 0)X.geometry.dispose(),X.material.dispose(),X=void 0}return{getClearColor:function(){return H},setClearColor:function(_,A=1){H.set(_),Y=A,D(H,Y)},getClearAlpha:function(){return Y},setClearAlpha:function(_){Y=_,D(H,Y)},render:O,addToRenderList:V,dispose:q}}function MU(J,Q){let $=J.getParameter(J.MAX_VERTEX_ATTRIBS),W={},Z=G(null),K=Z,H=!1;function Y(P,y,c,b,u){let m=!1,f=N(P,b,c,y);if(K!==f)K=f,U(K.object);if(m=F(P,b,c,u),m)O(P,b,c,u);if(u!==null)Q.update(u,J.ELEMENT_ARRAY_BUFFER);if(m||H){if(H=!1,k(P,y,c,b),u!==null)J.bindBuffer(J.ELEMENT_ARRAY_BUFFER,Q.get(u).buffer)}}function X(){return J.createVertexArray()}function U(P){return J.bindVertexArray(P)}function E(P){return J.deleteVertexArray(P)}function N(P,y,c,b){let u=b.wireframe===!0,m=W[y.id];if(m===void 0)m={},W[y.id]=m;let f=P.isInstancedMesh===!0?P.id:0,a=m[f];if(a===void 0)a={},m[f]=a;let e=a[c.id];if(e===void 0)e={},a[c.id]=e;let J0=e[u];if(J0===void 0)J0=G(X()),e[u]=J0;return J0}function G(P){let y=[],c=[],b=[];for(let u=0;u<$;u++)y[u]=0,c[u]=0,b[u]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:y,enabledAttributes:c,attributeDivisors:b,object:P,attributes:{},index:null}}function F(P,y,c,b){let u=K.attributes,m=y.attributes,f=0,a=c.getAttributes();for(let e in a)if(a[e].location>=0){let k0=u[e],D0=m[e];if(D0===void 0){if(e==="instanceMatrix"&&P.instanceMatrix)D0=P.instanceMatrix;if(e==="instanceColor"&&P.instanceColor)D0=P.instanceColor}if(k0===void 0)return!0;if(k0.attribute!==D0)return!0;if(D0&&k0.data!==D0.data)return!0;f++}if(K.attributesNum!==f)return!0;if(K.index!==b)return!0;return!1}function O(P,y,c,b){let u={},m=y.attributes,f=0,a=c.getAttributes();for(let e in a)if(a[e].location>=0){let k0=m[e];if(k0===void 0){if(e==="instanceMatrix"&&P.instanceMatrix)k0=P.instanceMatrix;if(e==="instanceColor"&&P.instanceColor)k0=P.instanceColor}let D0={};if(D0.attribute=k0,k0&&k0.data)D0.data=k0.data;u[e]=D0,f++}K.attributes=u,K.attributesNum=f,K.index=b}function V(){let P=K.newAttributes;for(let y=0,c=P.length;y<c;y++)P[y]=0}function D(P){q(P,0)}function q(P,y){let{newAttributes:c,enabledAttributes:b,attributeDivisors:u}=K;if(c[P]=1,b[P]===0)J.enableVertexAttribArray(P),b[P]=1;if(u[P]!==y)J.vertexAttribDivisor(P,y),u[P]=y}function _(){let{newAttributes:P,enabledAttributes:y}=K;for(let c=0,b=y.length;c<b;c++)if(y[c]!==P[c])J.disableVertexAttribArray(c),y[c]=0}function A(P,y,c,b,u,m,f){if(f===!0)J.vertexAttribIPointer(P,y,c,u,m);else J.vertexAttribPointer(P,y,c,b,u,m)}function k(P,y,c,b){V();let u=b.attributes,m=c.getAttributes(),f=y.defaultAttributeValues;for(let a in m){let e=m[a];if(e.location>=0){let J0=u[a];if(J0===void 0){if(a==="instanceMatrix"&&P.instanceMatrix)J0=P.instanceMatrix;if(a==="instanceColor"&&P.instanceColor)J0=P.instanceColor}if(J0!==void 0){let{normalized:k0,itemSize:D0}=J0,l0=Q.get(J0);if(l0===void 0)continue;let{buffer:u0,type:s,bytesPerElement:W0}=l0,K0=s===J.INT||s===J.UNSIGNED_INT||J0.gpuType===KQ;if(J0.isInterleavedBufferAttribute){let H0=J0.data,L0=H0.stride,j0=J0.offset;if(H0.isInstancedInterleavedBuffer){for(let f0=0;f0<e.locationSize;f0++)q(e.location+f0,H0.meshPerAttribute);if(P.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=H0.meshPerAttribute*H0.count}else for(let f0=0;f0<e.locationSize;f0++)D(e.location+f0);J.bindBuffer(J.ARRAY_BUFFER,u0);for(let f0=0;f0<e.locationSize;f0++)A(e.location+f0,D0/e.locationSize,s,k0,L0*W0,(j0+D0/e.locationSize*f0)*W0,K0)}else{if(J0.isInstancedBufferAttribute){for(let H0=0;H0<e.locationSize;H0++)q(e.location+H0,J0.meshPerAttribute);if(P.isInstancedMesh!==!0&&b._maxInstanceCount===void 0)b._maxInstanceCount=J0.meshPerAttribute*J0.count}else for(let H0=0;H0<e.locationSize;H0++)D(e.location+H0);J.bindBuffer(J.ARRAY_BUFFER,u0);for(let H0=0;H0<e.locationSize;H0++)A(e.location+H0,D0/e.locationSize,s,k0,D0*W0,D0/e.locationSize*H0*W0,K0)}}else if(f!==void 0){let k0=f[a];if(k0!==void 0)switch(k0.length){case 2:J.vertexAttrib2fv(e.location,k0);break;case 3:J.vertexAttrib3fv(e.location,k0);break;case 4:J.vertexAttrib4fv(e.location,k0);break;default:J.vertexAttrib1fv(e.location,k0)}}}}_()}function I(){z();for(let P in W){let y=W[P];for(let c in y){let b=y[c];for(let u in b){let m=b[u];for(let f in m)E(m[f].object),delete m[f];delete b[u]}}delete W[P]}}function C(P){if(W[P.id]===void 0)return;let y=W[P.id];for(let c in y){let b=y[c];for(let u in b){let m=b[u];for(let f in m)E(m[f].object),delete m[f];delete b[u]}}delete W[P.id]}function w(P){for(let y in W){let c=W[y];for(let b in c){let u=c[b];if(u[P.id]===void 0)continue;let m=u[P.id];for(let f in m)E(m[f].object),delete m[f];delete u[P.id]}}}function R(P){for(let y in W){let c=W[y],b=P.isInstancedMesh===!0?P.id:0,u=c[b];if(u===void 0)continue;for(let m in u){let f=u[m];for(let a in f)E(f[a].object),delete f[a];delete u[m]}if(delete c[b],Object.keys(c).length===0)delete W[y]}}function z(){if(p(),H=!0,K===Z)return;K=Z,U(K.object)}function p(){Z.geometry=null,Z.program=null,Z.wireframe=!1}return{setup:Y,reset:z,resetDefaultState:p,dispose:I,releaseStatesOfGeometry:C,releaseStatesOfObject:R,releaseStatesOfProgram:w,initAttributes:V,enableAttribute:D,disableUnusedAttributes:_}}function RU(J,Q,$){let W;function Z(X){W=X}function K(X,U){J.drawArrays(W,X,U),$.update(U,W,1)}function H(X,U,E){if(E===0)return;J.drawArraysInstanced(W,X,U,E),$.update(U,W,E)}function Y(X,U,E){if(E===0)return;Q.get("WEBGL_multi_draw").multiDrawArraysWEBGL(W,X,0,U,0,E);let G=0;for(let F=0;F<E;F++)G+=U[F];$.update(G,W,1)}this.setMode=Z,this.render=K,this.renderInstances=H,this.renderMultiDraw=Y}function kU(J,Q,$,W){let Z;function K(){if(Z!==void 0)return Z;if(Q.has("EXT_texture_filter_anisotropic")===!0){let w=Q.get("EXT_texture_filter_anisotropic");Z=J.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else Z=0;return Z}function H(w){if(w!==Z9&&W.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_FORMAT))return!1;return!0}function Y(w){let R=w===O9&&(Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float"));if(w!==h8&&W.convert(w)!==J.getParameter(J.IMPLEMENTATION_COLOR_READ_TYPE)&&w!==D9&&!R)return!1;return!0}function X(w){if(w==="highp"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.HIGH_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.HIGH_FLOAT).precision>0)return"highp";w="mediump"}if(w==="mediump"){if(J.getShaderPrecisionFormat(J.VERTEX_SHADER,J.MEDIUM_FLOAT).precision>0&&J.getShaderPrecisionFormat(J.FRAGMENT_SHADER,J.MEDIUM_FLOAT).precision>0)return"mediump"}return"lowp"}let U=$.precision!==void 0?$.precision:"highp",E=X(U);if(E!==U)C0("WebGLRenderer:",U,"not supported, using",E,"instead."),U=E;let N=$.logarithmicDepthBuffer===!0,G=$.reversedDepthBuffer===!0&&Q.has("EXT_clip_control");if($.reversedDepthBuffer===!0&&G===!1)C0("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let F=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),O=J.getParameter(J.MAX_VERTEX_TEXTURE_IMAGE_UNITS),V=J.getParameter(J.MAX_TEXTURE_SIZE),D=J.getParameter(J.MAX_CUBE_MAP_TEXTURE_SIZE),q=J.getParameter(J.MAX_VERTEX_ATTRIBS),_=J.getParameter(J.MAX_VERTEX_UNIFORM_VECTORS),A=J.getParameter(J.MAX_VARYING_VECTORS),k=J.getParameter(J.MAX_FRAGMENT_UNIFORM_VECTORS),I=J.getParameter(J.MAX_SAMPLES),C=J.getParameter(J.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:K,getMaxPrecision:X,textureFormatReadable:H,textureTypeReadable:Y,precision:U,logarithmicDepthBuffer:N,reversedDepthBuffer:G,maxTextures:F,maxVertexTextures:O,maxTextureSize:V,maxCubemapSize:D,maxAttributes:q,maxVertexUniforms:_,maxVaryings:A,maxFragmentUniforms:k,maxSamples:I,samples:C}}function LU(J){let Q=this,$=null,W=0,Z=!1,K=!1,H=new q9,Y=new w0,X={value:null,needsUpdate:!1};this.uniform=X,this.numPlanes=0,this.numIntersection=0,this.init=function(N,G){let F=N.length!==0||G||W!==0||Z;return Z=G,W=N.length,F},this.beginShadows=function(){K=!0,E(null)},this.endShadows=function(){K=!1},this.setGlobalState=function(N,G){$=E(N,G,0)},this.setState=function(N,G,F){let{clippingPlanes:O,clipIntersection:V,clipShadows:D}=N,q=J.get(N);if(!Z||O===null||O.length===0||K&&!D)if(K)E(null);else U();else{let _=K?0:W,A=_*4,k=q.clippingState||null;X.value=k,k=E(O,G,A,F);for(let I=0;I!==A;++I)k[I]=$[I];q.clippingState=k,this.numIntersection=V?this.numPlanes:0,this.numPlanes+=_}};function U(){if(X.value!==$)X.value=$,X.needsUpdate=W>0;Q.numPlanes=W,Q.numIntersection=0}function E(N,G,F,O){let V=N!==null?N.length:0,D=null;if(V!==0){if(D=X.value,O!==!0||D===null){let q=F+V*4,_=G.matrixWorldInverse;if(Y.getNormalMatrix(_),D===null||D.length<q)D=new Float32Array(q);for(let A=0,k=F;A!==V;++A,k+=4)H.copy(N[A]).applyMatrix4(_,Y),H.normal.toArray(D,k),D[k+3]=H.constant}X.value=D,X.needsUpdate=!0}return Q.numPlanes=V,Q.numIntersection=0,D}}var y9=4,bZ=[0.125,0.215,0.35,0.446,0.526,0.582],J6=20,VU=256,o6=new A6,hZ=new p0,V$=null,B$=0,z$=0,I$=!1,BU=new h;class A${constructor(J){this._renderer=J,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(J,Q=0,$=0.1,W=100,Z={}){let{size:K=256,position:H=BU}=Z;V$=this._renderer.getRenderTarget(),B$=this._renderer.getActiveCubeFace(),z$=this._renderer.getActiveMipmapLevel(),I$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(K);let Y=this._allocateTargets();if(Y.depthBuffer=!0,this._sceneToCubeUV(J,$,W,Y,H),Q>0)this._blur(Y,0,0,Q);return this._applyPMREM(Y),this._cleanup(Y),Y}fromEquirectangular(J,Q=null){return this._fromTexture(J,Q)}fromCubemap(J,Q=null){return this._fromTexture(J,Q)}compileCubemapShader(){if(this._cubemapMaterial===null)this._cubemapMaterial=pZ(),this._compileMaterial(this._cubemapMaterial)}compileEquirectangularShader(){if(this._equirectMaterial===null)this._equirectMaterial=gZ(),this._compileMaterial(this._equirectMaterial)}dispose(){if(this._dispose(),this._cubemapMaterial!==null)this._cubemapMaterial.dispose();if(this._equirectMaterial!==null)this._equirectMaterial.dispose();if(this._backgroundBox!==null)this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose()}_setSize(J){this._lodMax=Math.floor(Math.log2(J)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){if(this._blurMaterial!==null)this._blurMaterial.dispose();if(this._ggxMaterial!==null)this._ggxMaterial.dispose();if(this._pingPongRenderTarget!==null)this._pingPongRenderTarget.dispose();for(let J=0;J<this._lodMeshes.length;J++)this._lodMeshes[J].geometry.dispose()}_cleanup(J){this._renderer.setRenderTarget(V$,B$,z$),this._renderer.xr.enabled=I$,J.scissorTest=!1,P6(J,0,0,J.width,J.height)}_fromTexture(J,Q){if(J.mapping===I6||J.mapping===l9)this._setSize(J.image.length===0?16:J.image[0].width||J.image[0].image.width);else this._setSize(J.image.width/4);V$=this._renderer.getRenderTarget(),B$=this._renderer.getActiveCubeFace(),z$=this._renderer.getActiveMipmapLevel(),I$=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let $=Q||this._allocateTargets();return this._textureToCubeUV(J,$),this._applyPMREM($),this._cleanup($),$}_allocateTargets(){let J=3*Math.max(this._cubeSize,112),Q=4*this._cubeSize,$={magFilter:_8,minFilter:_8,generateMipmaps:!1,type:O9,format:Z9,colorSpace:lQ,depthBuffer:!1},W=xZ(J,Q,$);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==J||this._pingPongRenderTarget.height!==Q){if(this._pingPongRenderTarget!==null)this._dispose();this._pingPongRenderTarget=xZ(J,Q,$);let{_lodMax:Z}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=zU(Z)),this._blurMaterial=_U(Z,J,Q),this._ggxMaterial=IU(Z,J,Q)}return W}_compileMaterial(J){let Q=new x8(new C8,J);this._renderer.compile(Q,o6)}_sceneToCubeUV(J,Q,$,W,Z){let Y=new y8(90,1,Q,$),X=[1,-1,1,1,1,1],U=[1,1,1,-1,-1,-1],E=this._renderer,N=E.autoClear,G=E.toneMapping;if(E.getClearColor(hZ),E.toneMapping=a8,E.autoClear=!1,E.state.buffers.depth.getReversed())E.setRenderTarget(W),E.clearDepth(),E.setRenderTarget(null);if(this._backgroundBox===null)this._backgroundBox=new x8(new C6,new a7({name:"PMREM.Background",side:w8,depthWrite:!1,depthTest:!1}));let O=this._backgroundBox,V=O.material,D=!1,q=J.background;if(q){if(q.isColor)V.color.copy(q),J.background=null,D=!0}else V.color.copy(hZ),D=!0;for(let _=0;_<6;_++){let A=_%3;if(A===0)Y.up.set(0,X[_],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x+U[_],Z.y,Z.z);else if(A===1)Y.up.set(0,0,X[_]),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y+U[_],Z.z);else Y.up.set(0,X[_],0),Y.position.set(Z.x,Z.y,Z.z),Y.lookAt(Z.x,Z.y,Z.z+U[_]);let k=this._cubeSize;if(P6(W,A*k,_>2?k:0,k,k),E.setRenderTarget(W),D)E.render(O,Y);E.render(J,Y)}E.toneMapping=G,E.autoClear=N,J.background=q}_textureToCubeUV(J,Q){let $=this._renderer,W=J.mapping===I6||J.mapping===l9;if(W){if(this._cubemapMaterial===null)this._cubemapMaterial=pZ();this._cubemapMaterial.uniforms.flipEnvMap.value=J.isRenderTargetTexture===!1?-1:1}else if(this._equirectMaterial===null)this._equirectMaterial=gZ();let Z=W?this._cubemapMaterial:this._equirectMaterial,K=this._lodMeshes[0];K.material=Z;let H=Z.uniforms;H.envMap.value=J;let Y=this._cubeSize;P6(Q,0,0,3*Y,2*Y),$.setRenderTarget(Q),$.render(K,o6)}_applyPMREM(J){let Q=this._renderer,$=Q.autoClear;Q.autoClear=!1;let W=this._lodMeshes.length;for(let Z=1;Z<W;Z++)this._applyGGXFilter(J,Z-1,Z);Q.autoClear=$}_applyGGXFilter(J,Q,$){let W=this._renderer,Z=this._pingPongRenderTarget,K=this._ggxMaterial,H=this._lodMeshes[$];H.material=K;let Y=K.uniforms,X=$/(this._lodMeshes.length-1),U=Q/(this._lodMeshes.length-1),E=Math.sqrt(X*X-U*U),N=0+X*1.25,G=E*N,{_lodMax:F}=this,O=this._sizeLods[$],V=3*O*($>F-y9?$-F+y9:0),D=4*(this._cubeSize-O);Y.envMap.value=J.texture,Y.roughness.value=G,Y.mipInt.value=F-Q,P6(Z,V,D,3*O,2*O),W.setRenderTarget(Z),W.render(H,o6),Y.envMap.value=Z.texture,Y.roughness.value=0,Y.mipInt.value=F-$,P6(J,V,D,3*O,2*O),W.setRenderTarget(J),W.render(H,o6)}_blur(J,Q,$,W,Z){let K=this._pingPongRenderTarget;this._halfBlur(J,K,Q,$,W,"latitudinal",Z),this._halfBlur(K,J,$,$,W,"longitudinal",Z)}_halfBlur(J,Q,$,W,Z,K,H){let Y=this._renderer,X=this._blurMaterial;if(K!=="latitudinal"&&K!=="longitudinal")P0("blur direction must be either latitudinal or longitudinal!");let U=3,E=this._lodMeshes[W];E.material=X;let N=X.uniforms,G=this._sizeLods[$]-1,F=isFinite(Z)?Math.PI/(2*G):2*Math.PI/(2*J6-1),O=Z/F,V=isFinite(Z)?1+Math.floor(U*O):J6;if(V>J6)C0(`sigmaRadians, ${Z}, is too large and will clip, as it requested ${V} samples when the maximum is set to ${J6}`);let D=[],q=0;for(let C=0;C<J6;++C){let w=C/O,R=Math.exp(-w*w/2);if(D.push(R),C===0)q+=R;else if(C<V)q+=2*R}for(let C=0;C<D.length;C++)D[C]=D[C]/q;if(N.envMap.value=J.texture,N.samples.value=V,N.weights.value=D,N.latitudinal.value=K==="latitudinal",H)N.poleAxis.value=H;let{_lodMax:_}=this;N.dTheta.value=F,N.mipInt.value=_-$;let A=this._sizeLods[W],k=3*A*(W>_-y9?W-_+y9:0),I=4*(this._cubeSize-A);P6(Q,k,I,3*A,2*A),Y.setRenderTarget(Q),Y.render(E,o6)}}function zU(J){let Q=[],$=[],W=[],Z=J,K=J-y9+1+bZ.length;for(let H=0;H<K;H++){let Y=Math.pow(2,Z);Q.push(Y);let X=1/Y;if(H>J-y9)X=bZ[H-J+y9-1];else if(H===0)X=0;$.push(X);let U=1/(Y-2),E=-U,N=1+U,G=[E,E,N,E,N,N,E,E,N,N,E,N],F=6,O=6,V=3,D=2,q=1,_=new Float32Array(V*O*F),A=new Float32Array(D*O*F),k=new Float32Array(q*O*F);for(let C=0;C<F;C++){let w=C%3*2/3-1,R=C>2?0:-1,z=[w,R,0,w+0.6666666666666666,R,0,w+0.6666666666666666,R+1,0,w,R,0,w+0.6666666666666666,R+1,0,w,R+1,0];_.set(z,V*O*C),A.set(G,D*O*C);let p=[C,C,C,C,C,C];k.set(p,q*O*C)}let I=new C8;if(I.setAttribute("position",new R8(_,V)),I.setAttribute("uv",new R8(A,D)),I.setAttribute("faceIndex",new R8(k,q)),W.push(new x8(I,null)),Z>y9)Z--}return{lodMeshes:W,sizeLods:Q,sigmas:$}}function xZ(J,Q,$){let W=new c8(J,Q,$);return W.texture.mapping=m6,W.texture.name="PMREM.cubeUv",W.scissorTest=!0,W}function P6(J,Q,$,W,Z){J.viewport.set(Q,$,W,Z),J.scissor.set(Q,$,W,Z)}function IU(J,Q,$){return new T8({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:VU,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:XJ(),fragmentShader:`

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
		`,blending:W9,depthTest:!1,depthWrite:!1})}function _U(J,Q,$){let W=new Float32Array(J6),Z=new h(0,1,0);return new T8({name:"SphericalGaussianBlur",defines:{n:J6,CUBEUV_TEXEL_WIDTH:1/Q,CUBEUV_TEXEL_HEIGHT:1/$,CUBEUV_MAX_MIP:`${J}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:W},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:Z}},vertexShader:XJ(),fragmentShader:`

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
		`,blending:W9,depthTest:!1,depthWrite:!1})}function gZ(){return new T8({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:XJ(),fragmentShader:`

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
		`,blending:W9,depthTest:!1,depthWrite:!1})}function pZ(){return new T8({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:XJ(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:W9,depthTest:!1,depthWrite:!1})}function XJ(){return`

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
	`}class T$ extends c8{constructor(J=1,Q={}){super(J,J,Q);this.isWebGLCubeRenderTarget=!0;let $={width:J,height:J,depth:1},W=[$,$,$,$,$,$];this.texture=new QJ(W),this._setTextureOptions(Q),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(J,Q){this.texture.type=Q.type,this.texture.colorSpace=Q.colorSpace,this.texture.generateMipmaps=Q.generateMipmaps,this.texture.minFilter=Q.minFilter,this.texture.magFilter=Q.magFilter;let $={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},W=new C6(5,5,5),Z=new T8({name:"CubemapFromEquirect",uniforms:a9($.uniforms),vertexShader:$.vertexShader,fragmentShader:$.fragmentShader,side:w8,blending:W9});Z.uniforms.tEquirect.value=Q;let K=new x8(W,Z),H=Q.minFilter;if(Q.minFilter===d9)Q.minFilter=_8;return new D$(1,10,this).update(J,K),Q.minFilter=H,K.geometry.dispose(),K.material.dispose(),this}clear(J,Q=!0,$=!0,W=!0){let Z=J.getRenderTarget();for(let K=0;K<6;K++)J.setRenderTarget(this,K),J.clear(Q,$,W);J.setRenderTarget(Z)}}function CU(J){let Q=new WeakMap,$=new WeakMap,W=null;function Z(G,F=!1){if(G===null||G===void 0)return null;if(F)return H(G);return K(G)}function K(G){if(G&&G.isTexture){let F=G.mapping;if(F===T7||F===S7)if(Q.has(G)){let O=Q.get(G).texture;return Y(O,G.mapping)}else{let O=G.image;if(O&&O.height>0){let V=new T$(O.height);return V.fromEquirectangularTexture(J,G),Q.set(G,V),G.addEventListener("dispose",U),Y(V.texture,G.mapping)}else return null}}return G}function H(G){if(G&&G.isTexture){let F=G.mapping,O=F===T7||F===S7,V=F===I6||F===l9;if(O||V){let D=$.get(G),q=D!==void 0?D.texture.pmremVersion:0;if(G.isRenderTargetTexture&&G.pmremVersion!==q){if(W===null)W=new A$(J);return D=O?W.fromEquirectangular(G,D):W.fromCubemap(G,D),D.texture.pmremVersion=G.pmremVersion,$.set(G,D),D.texture}else if(D!==void 0)return D.texture;else{let _=G.image;if(O&&_&&_.height>0||V&&_&&X(_)){if(W===null)W=new A$(J);return D=O?W.fromEquirectangular(G):W.fromCubemap(G),D.texture.pmremVersion=G.pmremVersion,$.set(G,D),G.addEventListener("dispose",E),D.texture}else return null}}}return G}function Y(G,F){if(F===T7)G.mapping=I6;else if(F===S7)G.mapping=l9;return G}function X(G){let F=0,O=6;for(let V=0;V<O;V++)if(G[V]!==void 0)F++;return F===O}function U(G){let F=G.target;F.removeEventListener("dispose",U);let O=Q.get(F);if(O!==void 0)Q.delete(F),O.dispose()}function E(G){let F=G.target;F.removeEventListener("dispose",E);let O=$.get(F);if(O!==void 0)$.delete(F),O.dispose()}function N(){if(Q=new WeakMap,$=new WeakMap,W!==null)W.dispose(),W=null}return{get:Z,dispose:N}}function AU(J){let Q={};function $(W){if(Q[W]!==void 0)return Q[W];let Z=J.getExtension(W);return Q[W]=Z,Z}return{has:function(W){return $(W)!==null},init:function(){$("EXT_color_buffer_float"),$("WEBGL_clip_cull_distance"),$("OES_texture_float_linear"),$("EXT_color_buffer_half_float"),$("WEBGL_multisampled_render_to_texture"),$("WEBGL_render_shared_exponent")},get:function(W){let Z=$(W);if(Z===null)m9("WebGLRenderer: "+W+" extension not supported.");return Z}}}function PU(J,Q,$,W){let Z={},K=new WeakMap;function H(N){let G=N.target;if(G.index!==null)Q.remove(G.index);for(let O in G.attributes)Q.remove(G.attributes[O]);G.removeEventListener("dispose",H),delete Z[G.id];let F=K.get(G);if(F)Q.remove(F),K.delete(G);if(W.releaseStatesOfGeometry(G),G.isInstancedBufferGeometry===!0)delete G._maxInstanceCount;$.memory.geometries--}function Y(N,G){if(Z[G.id]===!0)return G;return G.addEventListener("dispose",H),Z[G.id]=!0,$.memory.geometries++,G}function X(N){let G=N.attributes;for(let F in G)Q.update(G[F],J.ARRAY_BUFFER)}function U(N){let G=[],F=N.index,O=N.attributes.position,V=0;if(O===void 0)return;if(F!==null){let _=F.array;V=F.version;for(let A=0,k=_.length;A<k;A+=3){let I=_[A+0],C=_[A+1],w=_[A+2];G.push(I,C,C,w,w,I)}}else{let _=O.array;V=O.version;for(let A=0,k=_.length/3-1;A<k;A+=3){let I=A+0,C=A+1,w=A+2;G.push(I,C,C,w,w,I)}}let D=new(O.count>=65535?o7:i7)(G,1);D.version=V;let q=K.get(N);if(q)Q.remove(q);K.set(N,D)}function E(N){let G=K.get(N);if(G){let F=N.index;if(F!==null){if(G.version<F.version)U(N)}}else U(N);return K.get(N)}return{get:Y,update:X,getWireframeAttribute:E}}function wU(J,Q,$){let W;function Z(N){W=N}let K,H;function Y(N){K=N.type,H=N.bytesPerElement}function X(N,G){J.drawElements(W,G,K,N*H),$.update(G,W,1)}function U(N,G,F){if(F===0)return;J.drawElementsInstanced(W,G,K,N*H,F),$.update(G,W,F)}function E(N,G,F){if(F===0)return;Q.get("WEBGL_multi_draw").multiDrawElementsWEBGL(W,G,0,K,N,0,F);let V=0;for(let D=0;D<F;D++)V+=G[D];$.update(V,W,1)}this.setMode=Z,this.setIndex=Y,this.render=X,this.renderInstances=U,this.renderMultiDraw=E}function TU(J){let Q={geometries:0,textures:0},$={frame:0,calls:0,triangles:0,points:0,lines:0};function W(K,H,Y){switch($.calls++,H){case J.TRIANGLES:$.triangles+=Y*(K/3);break;case J.LINES:$.lines+=Y*(K/2);break;case J.LINE_STRIP:$.lines+=Y*(K-1);break;case J.LINE_LOOP:$.lines+=Y*K;break;case J.POINTS:$.points+=Y*K;break;default:P0("WebGLInfo: Unknown draw mode:",H);break}}function Z(){$.calls=0,$.triangles=0,$.points=0,$.lines=0}return{memory:Q,render:$,programs:null,autoReset:!0,reset:Z,update:W}}function SU(J,Q,$){let W=new WeakMap,Z=new K8;function K(H,Y,X){let U=H.morphTargetInfluences,E=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,N=E!==void 0?E.length:0,G=W.get(Y);if(G===void 0||G.count!==N){let z=function(){w.dispose(),W.delete(Y),Y.removeEventListener("dispose",z)};if(G!==void 0)G.texture.dispose();let F=Y.morphAttributes.position!==void 0,O=Y.morphAttributes.normal!==void 0,V=Y.morphAttributes.color!==void 0,D=Y.morphAttributes.position||[],q=Y.morphAttributes.normal||[],_=Y.morphAttributes.color||[],A=0;if(F===!0)A=1;if(O===!0)A=2;if(V===!0)A=3;let k=Y.attributes.position.count*A,I=1;if(k>Q.maxTextureSize)I=Math.ceil(k/Q.maxTextureSize),k=Q.maxTextureSize;let C=new Float32Array(k*I*4*N),w=new c7(C,k,I,N);w.type=D9,w.needsUpdate=!0;let R=A*4;for(let p=0;p<N;p++){let P=D[p],y=q[p],c=_[p],b=k*I*4*p;for(let u=0;u<P.count;u++){let m=u*R;if(F===!0)Z.fromBufferAttribute(P,u),C[b+m+0]=Z.x,C[b+m+1]=Z.y,C[b+m+2]=Z.z,C[b+m+3]=0;if(O===!0)Z.fromBufferAttribute(y,u),C[b+m+4]=Z.x,C[b+m+5]=Z.y,C[b+m+6]=Z.z,C[b+m+7]=0;if(V===!0)Z.fromBufferAttribute(c,u),C[b+m+8]=Z.x,C[b+m+9]=Z.y,C[b+m+10]=Z.z,C[b+m+11]=c.itemSize===4?Z.w:1}}G={count:N,texture:w,size:new n0(k,I)},W.set(Y,G),Y.addEventListener("dispose",z)}if(H.isInstancedMesh===!0&&H.morphTexture!==null)X.getUniforms().setValue(J,"morphTexture",H.morphTexture,$);else{let F=0;for(let V=0;V<U.length;V++)F+=U[V];let O=Y.morphTargetsRelative?1:1-F;X.getUniforms().setValue(J,"morphTargetBaseInfluence",O),X.getUniforms().setValue(J,"morphTargetInfluences",U)}X.getUniforms().setValue(J,"morphTargetsTexture",G.texture,$),X.getUniforms().setValue(J,"morphTargetsTextureSize",G.size)}return{update:K}}function jU(J,Q,$,W,Z){let K=new WeakMap;function H(U){let E=Z.render.frame,N=U.geometry,G=Q.get(U,N);if(K.get(G)!==E)Q.update(G),K.set(G,E);if(U.isInstancedMesh){if(U.hasEventListener("dispose",X)===!1)U.addEventListener("dispose",X);if(K.get(U)!==E){if($.update(U.instanceMatrix,J.ARRAY_BUFFER),U.instanceColor!==null)$.update(U.instanceColor,J.ARRAY_BUFFER);K.set(U,E)}}if(U.isSkinnedMesh){let F=U.skeleton;if(K.get(F)!==E)F.update(),K.set(F,E)}return G}function Y(){K=new WeakMap}function X(U){let E=U.target;if(E.removeEventListener("dispose",X),W.releaseStatesOfObject(E),$.remove(E.instanceMatrix),E.instanceColor!==null)$.remove(E.instanceColor)}return{update:H,dispose:Y}}var vU={[tJ]:"LINEAR_TONE_MAPPING",[eJ]:"REINHARD_TONE_MAPPING",[JQ]:"CINEON_TONE_MAPPING",[QQ]:"ACES_FILMIC_TONE_MAPPING",[WQ]:"AGX_TONE_MAPPING",[ZQ]:"NEUTRAL_TONE_MAPPING",[$Q]:"CUSTOM_TONE_MAPPING"};function fU(J,Q,$,W,Z,K){let H=new c8(Q,$,{type:J,depthBuffer:Z,stencilBuffer:K,samples:W?4:0,depthTexture:Z?new v9(Q,$):void 0}),Y=new c8(Q,$,{type:O9,depthBuffer:!1,stencilBuffer:!1}),X=new C8;X.setAttribute("position",new b8([-1,3,0,-1,-1,0,3,-1,0],3)),X.setAttribute("uv",new b8([0,2,0,0,2,0],2));let U=new $$({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),E=new x8(X,U),N=new A6(-1,1,1,-1,0,1),G=null,F=null,O=!1,V,D=null,q=[],_=!1;this.setSize=function(A,k){H.setSize(A,k),Y.setSize(A,k);for(let I=0;I<q.length;I++){let C=q[I];if(C.setSize)C.setSize(A,k)}},this.setEffects=function(A){q=A,_=q.length>0&&q[0].isRenderPass===!0;let{width:k,height:I}=H;for(let C=0;C<q.length;C++){let w=q[C];if(w.setSize)w.setSize(k,I)}},this.begin=function(A,k){if(O)return!1;if(A.toneMapping===a8&&q.length===0)return!1;if(D=k,k!==null){let{width:I,height:C}=k;if(H.width!==I||H.height!==C)this.setSize(I,C)}if(_===!1)A.setRenderTarget(H);return V=A.toneMapping,A.toneMapping=a8,!0},this.hasRenderPass=function(){return _},this.end=function(A,k){A.toneMapping=V,O=!0;let I=H,C=Y;for(let w=0;w<q.length;w++){let R=q[w];if(R.enabled===!1)continue;if(R.render(A,C,I,k),R.needsSwap!==!1){let z=I;I=C,C=z}}if(G!==A.outputColorSpace||F!==A.toneMapping){if(G=A.outputColorSpace,F=A.toneMapping,U.defines={},g0.getTransfer(G)===e0)U.defines.SRGB_TRANSFER="";let w=vU[F];if(w)U.defines[w]="";U.needsUpdate=!0}U.uniforms.tDiffuse.value=I.texture,A.setRenderTarget(D),A.render(E,N),D=null,O=!1},this.isCompositing=function(){return O},this.dispose=function(){if(H.depthTexture)H.depthTexture.dispose();H.dispose(),Y.dispose(),X.dispose(),U.dispose()}}var HK=new z8,P$=new v9(1,1),YK=new c7,XK=new aQ,UK=new QJ,mZ=[],lZ=[],dZ=new Float32Array(16),uZ=new Float32Array(9),cZ=new Float32Array(4);function w6(J,Q,$){let W=J[0];if(W<=0||W>0)return J;let Z=Q*$,K=mZ[Z];if(K===void 0)K=new Float32Array(Z),mZ[Z]=K;if(Q!==0){W.toArray(K,0);for(let H=1,Y=0;H!==Q;++H)Y+=$,J[H].toArray(K,Y)}return K}function q8(J,Q){if(J.length!==Q.length)return!1;for(let $=0,W=J.length;$<W;$++)if(J[$]!==Q[$])return!1;return!0}function F8(J,Q){for(let $=0,W=Q.length;$<W;$++)J[$]=Q[$]}function UJ(J,Q){let $=lZ[Q];if($===void 0)$=new Int32Array(Q),lZ[Q]=$;for(let W=0;W!==Q;++W)$[W]=J.allocateTextureUnit();return $}function yU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1f(this.addr,Q),$[0]=Q}function bU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2f(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2fv(this.addr,Q),F8($,Q)}}function hU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3f(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else if(Q.r!==void 0){if($[0]!==Q.r||$[1]!==Q.g||$[2]!==Q.b)J.uniform3f(this.addr,Q.r,Q.g,Q.b),$[0]=Q.r,$[1]=Q.g,$[2]=Q.b}else{if(q8($,Q))return;J.uniform3fv(this.addr,Q),F8($,Q)}}function xU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4f(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4fv(this.addr,Q),F8($,Q)}}function gU(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(q8($,Q))return;J.uniformMatrix2fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,W))return;cZ.set(W),J.uniformMatrix2fv(this.addr,!1,cZ),F8($,W)}}function pU(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(q8($,Q))return;J.uniformMatrix3fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,W))return;uZ.set(W),J.uniformMatrix3fv(this.addr,!1,uZ),F8($,W)}}function mU(J,Q){let $=this.cache,W=Q.elements;if(W===void 0){if(q8($,Q))return;J.uniformMatrix4fv(this.addr,!1,Q),F8($,Q)}else{if(q8($,W))return;dZ.set(W),J.uniformMatrix4fv(this.addr,!1,dZ),F8($,W)}}function lU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1i(this.addr,Q),$[0]=Q}function dU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2i(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2iv(this.addr,Q),F8($,Q)}}function uU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3i(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3iv(this.addr,Q),F8($,Q)}}function cU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4i(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4iv(this.addr,Q),F8($,Q)}}function nU(J,Q){let $=this.cache;if($[0]===Q)return;J.uniform1ui(this.addr,Q),$[0]=Q}function sU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y)J.uniform2ui(this.addr,Q.x,Q.y),$[0]=Q.x,$[1]=Q.y}else{if(q8($,Q))return;J.uniform2uiv(this.addr,Q),F8($,Q)}}function iU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z)J.uniform3ui(this.addr,Q.x,Q.y,Q.z),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z}else{if(q8($,Q))return;J.uniform3uiv(this.addr,Q),F8($,Q)}}function oU(J,Q){let $=this.cache;if(Q.x!==void 0){if($[0]!==Q.x||$[1]!==Q.y||$[2]!==Q.z||$[3]!==Q.w)J.uniform4ui(this.addr,Q.x,Q.y,Q.z,Q.w),$[0]=Q.x,$[1]=Q.y,$[2]=Q.z,$[3]=Q.w}else{if(q8($,Q))return;J.uniform4uiv(this.addr,Q),F8($,Q)}}function aU(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;let K;if(this.type===J.SAMPLER_2D_SHADOW)P$.compareFunction=$.isReversedDepthBuffer()?u7:d7,K=P$;else K=HK;$.setTexture2D(Q||K,Z)}function rU(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture3D(Q||XK,Z)}function tU(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTextureCube(Q||UK,Z)}function eU(J,Q,$){let W=this.cache,Z=$.allocateTextureUnit();if(W[0]!==Z)J.uniform1i(this.addr,Z),W[0]=Z;$.setTexture2DArray(Q||YK,Z)}function J5(J){switch(J){case 5126:return yU;case 35664:return bU;case 35665:return hU;case 35666:return xU;case 35674:return gU;case 35675:return pU;case 35676:return mU;case 5124:case 35670:return lU;case 35667:case 35671:return dU;case 35668:case 35672:return uU;case 35669:case 35673:return cU;case 5125:return nU;case 36294:return sU;case 36295:return iU;case 36296:return oU;case 35678:case 36198:case 36298:case 36306:case 35682:return aU;case 35679:case 36299:case 36307:return rU;case 35680:case 36300:case 36308:case 36293:return tU;case 36289:case 36303:case 36311:case 36292:return eU}}function Q5(J,Q){J.uniform1fv(this.addr,Q)}function $5(J,Q){let $=w6(Q,this.size,2);J.uniform2fv(this.addr,$)}function W5(J,Q){let $=w6(Q,this.size,3);J.uniform3fv(this.addr,$)}function Z5(J,Q){let $=w6(Q,this.size,4);J.uniform4fv(this.addr,$)}function K5(J,Q){let $=w6(Q,this.size,4);J.uniformMatrix2fv(this.addr,!1,$)}function H5(J,Q){let $=w6(Q,this.size,9);J.uniformMatrix3fv(this.addr,!1,$)}function Y5(J,Q){let $=w6(Q,this.size,16);J.uniformMatrix4fv(this.addr,!1,$)}function X5(J,Q){J.uniform1iv(this.addr,Q)}function U5(J,Q){J.uniform2iv(this.addr,Q)}function G5(J,Q){J.uniform3iv(this.addr,Q)}function N5(J,Q){J.uniform4iv(this.addr,Q)}function E5(J,Q){J.uniform1uiv(this.addr,Q)}function q5(J,Q){J.uniform2uiv(this.addr,Q)}function F5(J,Q){J.uniform3uiv(this.addr,Q)}function D5(J,Q){J.uniform4uiv(this.addr,Q)}function O5(J,Q,$){let W=this.cache,Z=Q.length,K=UJ($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);let H;if(this.type===J.SAMPLER_2D_SHADOW)H=P$;else H=HK;for(let Y=0;Y!==Z;++Y)$.setTexture2D(Q[Y]||H,K[Y])}function M5(J,Q,$){let W=this.cache,Z=Q.length,K=UJ($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);for(let H=0;H!==Z;++H)$.setTexture3D(Q[H]||XK,K[H])}function R5(J,Q,$){let W=this.cache,Z=Q.length,K=UJ($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);for(let H=0;H!==Z;++H)$.setTextureCube(Q[H]||UK,K[H])}function k5(J,Q,$){let W=this.cache,Z=Q.length,K=UJ($,Z);if(!q8(W,K))J.uniform1iv(this.addr,K),F8(W,K);for(let H=0;H!==Z;++H)$.setTexture2DArray(Q[H]||YK,K[H])}function L5(J){switch(J){case 5126:return Q5;case 35664:return $5;case 35665:return W5;case 35666:return Z5;case 35674:return K5;case 35675:return H5;case 35676:return Y5;case 5124:case 35670:return X5;case 35667:case 35671:return U5;case 35668:case 35672:return G5;case 35669:case 35673:return N5;case 5125:return E5;case 36294:return q5;case 36295:return F5;case 36296:return D5;case 35678:case 36198:case 36298:case 36306:case 35682:return O5;case 35679:case 36299:case 36307:return M5;case 35680:case 36300:case 36308:case 36293:return R5;case 36289:case 36303:case 36311:case 36292:return k5}}class GK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.setValue=J5(Q.type)}}class NK{constructor(J,Q,$){this.id=J,this.addr=$,this.cache=[],this.type=Q.type,this.size=Q.size,this.setValue=L5(Q.type)}}class EK{constructor(J){this.id=J,this.seq=[],this.map={}}setValue(J,Q,$){let W=this.seq;for(let Z=0,K=W.length;Z!==K;++Z){let H=W[Z];H.setValue(J,Q[H.id],$)}}}var _$=/(\w+)(\])?(\[|\.)?/g;function nZ(J,Q){J.seq.push(Q),J.map[Q.id]=Q}function V5(J,Q,$){let W=J.name,Z=W.length;_$.lastIndex=0;while(!0){let K=_$.exec(W),H=_$.lastIndex,Y=K[1],X=K[2]==="]",U=K[3];if(X)Y=Y|0;if(U===void 0||U==="["&&H+2===Z){nZ($,U===void 0?new GK(Y,J,Q):new NK(Y,J,Q));break}else{let N=$.map[Y];if(N===void 0)N=new EK(Y),nZ($,N);$=N}}}class t6{constructor(J,Q){this.seq=[],this.map={};let $=J.getProgramParameter(Q,J.ACTIVE_UNIFORMS);for(let K=0;K<$;++K){let H=J.getActiveUniform(Q,K),Y=J.getUniformLocation(Q,H.name);V5(H,Y,this)}let W=[],Z=[];for(let K of this.seq)if(K.type===J.SAMPLER_2D_SHADOW||K.type===J.SAMPLER_CUBE_SHADOW||K.type===J.SAMPLER_2D_ARRAY_SHADOW)W.push(K);else Z.push(K);if(W.length>0)this.seq=W.concat(Z)}setValue(J,Q,$,W){let Z=this.map[Q];if(Z!==void 0)Z.setValue(J,$,W)}setOptional(J,Q,$){let W=Q[$];if(W!==void 0)this.setValue(J,$,W)}static upload(J,Q,$,W){for(let Z=0,K=Q.length;Z!==K;++Z){let H=Q[Z],Y=$[H.id];if(Y.needsUpdate!==!1)H.setValue(J,Y.value,W)}}static seqWithValue(J,Q){let $=[];for(let W=0,Z=J.length;W!==Z;++W){let K=J[W];if(K.id in Q)$.push(K)}return $}}function sZ(J,Q,$){let W=J.createShader(Q);return J.shaderSource(W,$),J.compileShader(W),W}var B5=37297,z5=0;function I5(J,Q){let $=J.split(`
`),W=[],Z=Math.max(Q-6,0),K=Math.min(Q+6,$.length);for(let H=Z;H<K;H++){let Y=H+1;W.push(`${Y===Q?">":" "} ${Y}: ${$[H]}`)}return W.join(`
`)}var iZ=new w0;function _5(J){g0._getMatrix(iZ,g0.workingColorSpace,J);let Q=`mat3( ${iZ.elements.map(($)=>$.toFixed(4))} )`;switch(g0.getTransfer(J)){case dQ:return[Q,"LinearTransferOETF"];case e0:return[Q,"sRGBTransferOETF"];default:return C0("WebGLProgram: Unsupported color space: ",J),[Q,"LinearTransferOETF"]}}function oZ(J,Q,$){let W=J.getShaderParameter(Q,J.COMPILE_STATUS),K=(J.getShaderInfoLog(Q)||"").trim();if(W&&K==="")return"";let H=/ERROR: 0:(\d+)/.exec(K);if(H){let Y=parseInt(H[1]);return $.toUpperCase()+`

`+K+`

`+I5(J.getShaderSource(Q),Y)}else return K}function C5(J,Q){let $=_5(Q);return[`vec4 ${J}( vec4 value ) {`,`	return ${$[1]}( vec4( value.rgb * ${$[0]}, value.a ) );`,"}"].join(`
`)}var A5={[tJ]:"Linear",[eJ]:"Reinhard",[JQ]:"Cineon",[QQ]:"ACESFilmic",[WQ]:"AgX",[ZQ]:"Neutral",[$Q]:"Custom"};function P5(J,Q){let $=A5[Q];if($===void 0)return C0("WebGLProgram: Unsupported toneMapping:",Q),"vec3 "+J+"( vec3 color ) { return LinearToneMapping( color ); }";return"vec3 "+J+"( vec3 color ) { return "+$+"ToneMapping( color ); }"}var YJ=new h;function w5(){g0.getLuminanceCoefficients(YJ);let J=YJ.x.toFixed(4),Q=YJ.y.toFixed(4),$=YJ.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${J}, ${Q}, ${$} );`,"\treturn dot( weights, rgb );","}"].join(`
`)}function T5(J){return[J.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",J.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(r6).join(`
`)}function S5(J){let Q=[];for(let $ in J){let W=J[$];if(W===!1)continue;Q.push("#define "+$+" "+W)}return Q.join(`
`)}function j5(J,Q){let $={},W=J.getProgramParameter(Q,J.ACTIVE_ATTRIBUTES);for(let Z=0;Z<W;Z++){let K=J.getActiveAttrib(Q,Z),H=K.name,Y=1;if(K.type===J.FLOAT_MAT2)Y=2;if(K.type===J.FLOAT_MAT3)Y=3;if(K.type===J.FLOAT_MAT4)Y=4;$[H]={type:K.type,location:J.getAttribLocation(Q,H),locationSize:Y}}return $}function r6(J){return J!==""}function aZ(J,Q){let $=Q.numSpotLightShadows+Q.numSpotLightMaps-Q.numSpotLightShadowsWithMaps;return J.replace(/NUM_DIR_LIGHTS/g,Q.numDirLights).replace(/NUM_SPOT_LIGHTS/g,Q.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,Q.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,$).replace(/NUM_RECT_AREA_LIGHTS/g,Q.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,Q.numPointLights).replace(/NUM_HEMI_LIGHTS/g,Q.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,Q.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,Q.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,Q.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,Q.numPointLightShadows)}function rZ(J,Q){return J.replace(/NUM_CLIPPING_PLANES/g,Q.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,Q.numClippingPlanes-Q.numClipIntersection)}var v5=/^[ \t]*#include +<([\w\d./]+)>/gm;function w$(J){return J.replace(v5,y5)}var f5=new Map;function y5(J,Q){let $=v0[Q];if($===void 0){let W=f5.get(Q);if(W!==void 0)$=v0[W],C0('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',Q,W);else throw Error("THREE.WebGLProgram: Can not resolve #include <"+Q+">")}return w$($)}var b5=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tZ(J){return J.replace(b5,h5)}function h5(J,Q,$,W){let Z="";for(let K=parseInt(Q);K<parseInt($);K++)Z+=W.replace(/\[\s*i\s*\]/g,"[ "+K+" ]").replace(/UNROLLED_LOOP_INDEX/g,K);return Z}function eZ(J){let Q=`precision ${J.precision} float;
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
#define LOW_PRECISION`;return Q}var x5={[g6]:"SHADOWMAP_TYPE_PCF",[V6]:"SHADOWMAP_TYPE_VSM"};function g5(J){return x5[J.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var p5={[I6]:"ENVMAP_TYPE_CUBE",[l9]:"ENVMAP_TYPE_CUBE",[m6]:"ENVMAP_TYPE_CUBE_UV"};function m5(J){if(J.envMap===!1)return"ENVMAP_TYPE_CUBE";return p5[J.envMapMode]||"ENVMAP_TYPE_CUBE"}var l5={[l9]:"ENVMAP_MODE_REFRACTION"};function d5(J){if(J.envMap===!1)return"ENVMAP_MODE_REFLECTION";return l5[J.envMapMode]||"ENVMAP_MODE_REFLECTION"}var u5={[GZ]:"ENVMAP_BLENDING_MULTIPLY",[NZ]:"ENVMAP_BLENDING_MIX",[EZ]:"ENVMAP_BLENDING_ADD"};function c5(J){if(J.envMap===!1)return"ENVMAP_BLENDING_NONE";return u5[J.combine]||"ENVMAP_BLENDING_NONE"}function n5(J){let Q=J.envMapCubeUVHeight;if(Q===null)return null;let $=Math.log2(Q)-2,W=1/Q;return{texelWidth:1/(3*Math.max(Math.pow(2,$),112)),texelHeight:W,maxMip:$}}function s5(J,Q,$,W){let Z=J.getContext(),K=$.defines,H=$.vertexShader,Y=$.fragmentShader,X=g5($),U=m5($),E=d5($),N=c5($),G=n5($),F=T5($),O=S5(K),V=Z.createProgram(),D,q,_=$.glslVersion?"#version "+$.glslVersion+`
`:"";if($.isRawShaderMaterial){if(D=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O].filter(r6).join(`
`),D.length>0)D+=`
`;if(q=["#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O].filter(r6).join(`
`),q.length>0)q+=`
`}else D=[eZ($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O,$.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",$.batching?"#define USE_BATCHING":"",$.batchingColor?"#define USE_BATCHING_COLOR":"",$.instancing?"#define USE_INSTANCING":"",$.instancingColor?"#define USE_INSTANCING_COLOR":"",$.instancingMorph?"#define USE_INSTANCING_MORPH":"",$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.map?"#define USE_MAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+E:"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.displacementMap?"#define USE_DISPLACEMENTMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.mapUv?"#define MAP_UV "+$.mapUv:"",$.alphaMapUv?"#define ALPHAMAP_UV "+$.alphaMapUv:"",$.lightMapUv?"#define LIGHTMAP_UV "+$.lightMapUv:"",$.aoMapUv?"#define AOMAP_UV "+$.aoMapUv:"",$.emissiveMapUv?"#define EMISSIVEMAP_UV "+$.emissiveMapUv:"",$.bumpMapUv?"#define BUMPMAP_UV "+$.bumpMapUv:"",$.normalMapUv?"#define NORMALMAP_UV "+$.normalMapUv:"",$.displacementMapUv?"#define DISPLACEMENTMAP_UV "+$.displacementMapUv:"",$.metalnessMapUv?"#define METALNESSMAP_UV "+$.metalnessMapUv:"",$.roughnessMapUv?"#define ROUGHNESSMAP_UV "+$.roughnessMapUv:"",$.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+$.anisotropyMapUv:"",$.clearcoatMapUv?"#define CLEARCOATMAP_UV "+$.clearcoatMapUv:"",$.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+$.clearcoatNormalMapUv:"",$.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+$.clearcoatRoughnessMapUv:"",$.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+$.iridescenceMapUv:"",$.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+$.iridescenceThicknessMapUv:"",$.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+$.sheenColorMapUv:"",$.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+$.sheenRoughnessMapUv:"",$.specularMapUv?"#define SPECULARMAP_UV "+$.specularMapUv:"",$.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+$.specularColorMapUv:"",$.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+$.specularIntensityMapUv:"",$.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+$.transmissionMapUv:"",$.thicknessMapUv?"#define THICKNESSMAP_UV "+$.thicknessMapUv:"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexNormals?"#define HAS_NORMAL":"",$.vertexColors?"#define USE_COLOR":"",$.vertexAlphas?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.flatShading?"#define FLAT_SHADED":"",$.skinning?"#define USE_SKINNING":"",$.morphTargets?"#define USE_MORPHTARGETS":"",$.morphNormals&&$.flatShading===!1?"#define USE_MORPHNORMALS":"",$.morphColors?"#define USE_MORPHCOLORS":"",$.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+$.morphTextureStride:"",$.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+$.morphTargetsCount:"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.sizeAttenuation?"#define USE_SIZEATTENUATION":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","\tattribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","\tattribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","\tuniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","\tattribute vec2 uv1;","#endif","#ifdef USE_UV2","\tattribute vec2 uv2;","#endif","#ifdef USE_UV3","\tattribute vec2 uv3;","#endif","#ifdef USE_TANGENT","\tattribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","\tattribute vec4 color;","#elif defined( USE_COLOR )","\tattribute vec3 color;","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif",`
`].filter(r6).join(`
`),q=[eZ($),"#define SHADER_TYPE "+$.shaderType,"#define SHADER_NAME "+$.shaderName,O,$.useFog&&$.fog?"#define USE_FOG":"",$.useFog&&$.fogExp2?"#define FOG_EXP2":"",$.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",$.map?"#define USE_MAP":"",$.matcap?"#define USE_MATCAP":"",$.envMap?"#define USE_ENVMAP":"",$.envMap?"#define "+U:"",$.envMap?"#define "+E:"",$.envMap?"#define "+N:"",G?"#define CUBEUV_TEXEL_WIDTH "+G.texelWidth:"",G?"#define CUBEUV_TEXEL_HEIGHT "+G.texelHeight:"",G?"#define CUBEUV_MAX_MIP "+G.maxMip+".0":"",$.lightMap?"#define USE_LIGHTMAP":"",$.aoMap?"#define USE_AOMAP":"",$.bumpMap?"#define USE_BUMPMAP":"",$.normalMap?"#define USE_NORMALMAP":"",$.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",$.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",$.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",$.emissiveMap?"#define USE_EMISSIVEMAP":"",$.anisotropy?"#define USE_ANISOTROPY":"",$.anisotropyMap?"#define USE_ANISOTROPYMAP":"",$.clearcoat?"#define USE_CLEARCOAT":"",$.clearcoatMap?"#define USE_CLEARCOATMAP":"",$.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",$.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",$.dispersion?"#define USE_DISPERSION":"",$.iridescence?"#define USE_IRIDESCENCE":"",$.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",$.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",$.specularMap?"#define USE_SPECULARMAP":"",$.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",$.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",$.roughnessMap?"#define USE_ROUGHNESSMAP":"",$.metalnessMap?"#define USE_METALNESSMAP":"",$.alphaMap?"#define USE_ALPHAMAP":"",$.alphaTest?"#define USE_ALPHATEST":"",$.alphaHash?"#define USE_ALPHAHASH":"",$.sheen?"#define USE_SHEEN":"",$.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",$.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",$.transmission?"#define USE_TRANSMISSION":"",$.transmissionMap?"#define USE_TRANSMISSIONMAP":"",$.thicknessMap?"#define USE_THICKNESSMAP":"",$.vertexTangents&&$.flatShading===!1?"#define USE_TANGENT":"",$.vertexColors||$.instancingColor?"#define USE_COLOR":"",$.vertexAlphas||$.batchingColor?"#define USE_COLOR_ALPHA":"",$.vertexUv1s?"#define USE_UV1":"",$.vertexUv2s?"#define USE_UV2":"",$.vertexUv3s?"#define USE_UV3":"",$.pointsUvs?"#define USE_POINTS_UV":"",$.gradientMap?"#define USE_GRADIENTMAP":"",$.flatShading?"#define FLAT_SHADED":"",$.doubleSided?"#define DOUBLE_SIDED":"",$.flipSided?"#define FLIP_SIDED":"",$.shadowMapEnabled?"#define USE_SHADOWMAP":"",$.shadowMapEnabled?"#define "+X:"",$.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",$.numLightProbes>0?"#define USE_LIGHT_PROBES":"",$.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",$.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",$.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",$.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",$.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",$.toneMapping!==a8?"#define TONE_MAPPING":"",$.toneMapping!==a8?v0.tonemapping_pars_fragment:"",$.toneMapping!==a8?P5("toneMapping",$.toneMapping):"",$.dithering?"#define DITHERING":"",$.opaque?"#define OPAQUE":"",v0.colorspace_pars_fragment,C5("linearToOutputTexel",$.outputColorSpace),w5(),$.useDepthPacking?"#define DEPTH_PACKING "+$.depthPacking:"",`
`].filter(r6).join(`
`);if(H=w$(H),H=aZ(H,$),H=rZ(H,$),Y=w$(Y),Y=aZ(Y,$),Y=rZ(Y,$),H=tZ(H),Y=tZ(Y),$.isRawShaderMaterial!==!0)_=`#version 300 es
`,D=[F,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+D,q=["#define varying in",$.glslVersion===cQ?"":"layout(location = 0) out highp vec4 pc_fragColor;",$.glslVersion===cQ?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+q;let A=_+D+H,k=_+q+Y,I=sZ(Z,Z.VERTEX_SHADER,A),C=sZ(Z,Z.FRAGMENT_SHADER,k);if(Z.attachShader(V,I),Z.attachShader(V,C),$.index0AttributeName!==void 0)Z.bindAttribLocation(V,0,$.index0AttributeName);else if($.hasPositionAttribute===!0)Z.bindAttribLocation(V,0,"position");Z.linkProgram(V);function w(P){if(J.debug.checkShaderErrors){let y=Z.getProgramInfoLog(V)||"",c=Z.getShaderInfoLog(I)||"",b=Z.getShaderInfoLog(C)||"",u=y.trim(),m=c.trim(),f=b.trim(),a=!0,e=!0;if(Z.getProgramParameter(V,Z.LINK_STATUS)===!1)if(a=!1,typeof J.debug.onShaderError==="function")J.debug.onShaderError(Z,V,I,C);else{let J0=oZ(Z,I,"vertex"),k0=oZ(Z,C,"fragment");P0("WebGLProgram: Shader Error "+Z.getError()+" - VALIDATE_STATUS "+Z.getProgramParameter(V,Z.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+u+`
`+J0+`
`+k0)}else if(u!=="")C0("WebGLProgram: Program Info Log:",u);else if(m===""||f==="")e=!1;if(e)P.diagnostics={runnable:a,programLog:u,vertexShader:{log:m,prefix:D},fragmentShader:{log:f,prefix:q}}}Z.deleteShader(I),Z.deleteShader(C),R=new t6(Z,V),z=j5(Z,V)}let R;this.getUniforms=function(){if(R===void 0)w(this);return R};let z;this.getAttributes=function(){if(z===void 0)w(this);return z};let p=$.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){if(p===!1)p=Z.getProgramParameter(V,B5);return p},this.destroy=function(){W.releaseStatesOfProgram(this),Z.deleteProgram(V),this.program=void 0},this.type=$.shaderType,this.name=$.shaderName,this.id=z5++,this.cacheKey=Q,this.usedTimes=1,this.program=V,this.vertexShader=I,this.fragmentShader=C,this}var i5=0;class qK{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(J,Q,$){let W=this._getShaderCacheForMaterial(J);if(W.has(Q)===!1)W.add(Q),Q.usedTimes++;if(W.has($)===!1)W.add($),$.usedTimes++;return this}remove(J){let Q=this.materialCache.get(J);for(let $ of Q)if($.usedTimes--,$.usedTimes===0)this.shaderCache.delete($.code);return this.materialCache.delete(J),this}getVertexShaderStage(J){return this._getShaderStage(J.vertexShader)}getFragmentShaderStage(J){return this._getShaderStage(J.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(J){let Q=this.materialCache,$=Q.get(J);if($===void 0)$=new Set,Q.set(J,$);return $}_getShaderStage(J){let Q=this.shaderCache,$=Q.get(J);if($===void 0)$=new FK(J),Q.set(J,$);return $}}class FK{constructor(J){this.id=i5++,this.code=J,this.usedTimes=0}}function o5(J){return J===n9||J===p7||J===m7}function a5(J,Q,$,W,Z,K){let H=new n7,Y=new qK,X=new Set,U=[],E=new Map,N=W.logarithmicDepthBuffer,G=W.precision,F={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function O(R){if(X.add(R),R===0)return"uv";return`uv${R}`}function V(R,z,p,P,y,c){let b=P.fog,u=y.geometry,m=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?P.environment:null,f=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap,a=Q.get(R.envMap||m,f),e=!!a&&a.mapping===m6?a.image.height:null,J0=F[R.type];if(R.precision!==null){if(G=W.getMaxPrecision(R.precision),G!==R.precision)C0("WebGLProgram.getParameters:",R.precision,"not supported, using",G,"instead.")}let k0=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,D0=k0!==void 0?k0.length:0,l0=0;if(u.morphAttributes.position!==void 0)l0=1;if(u.morphAttributes.normal!==void 0)l0=2;if(u.morphAttributes.color!==void 0)l0=3;let u0,s,W0,K0;if(J0){let T0=H9[J0];u0=T0.vertexShader,s=T0.fragmentShader}else{u0=R.vertexShader,s=R.fragmentShader;let T0=Y.getVertexShaderStage(R),H8=Y.getFragmentShaderStage(R);Y.update(R,T0,H8),W0=T0.id,K0=H8.id}let H0=J.getRenderTarget(),L0=J.state.buffers.depth.getReversed(),j0=y.isInstancedMesh===!0,f0=y.isBatchedMesh===!0,y0=!!R.map,o0=!!R.matcap,h0=!!a,x0=!!R.aoMap,D8=!!R.lightMap,p8=!!R.bumpMap&&R.wireframe===!1,$8=!!R.normalMap,k8=!!R.displacementMap,O8=!!R.emissiveMap,E8=!!R.metalnessMap,j=!!R.roughnessMap,m8=R.anisotropy>0,s0=R.clearcoat>0,W8=R.dispersion>0,B=R.iridescence>0,M=R.sheen>0,T=R.transmission>0,d=m8&&!!R.anisotropyMap,t=s0&&!!R.clearcoatMap,Q0=s0&&!!R.clearcoatNormalMap,U0=s0&&!!R.clearcoatRoughnessMap,n=B&&!!R.iridescenceMap,o=B&&!!R.iridescenceThicknessMap,F0=M&&!!R.sheenColorMap,B0=M&&!!R.sheenRoughnessMap,G0=!!R.specularMap,$0=!!R.specularColorMap,_0=!!R.specularIntensityMap,A0=T&&!!R.transmissionMap,c0=T&&!!R.thicknessMap,S=!!R.gradientMap,Z0=!!R.alphaMap,i=R.alphaTest>0,Y0=!!R.alphaHash,O0=!!R.extensions,r=a8;if(R.toneMapped){if(H0===null||H0.isXRRenderTarget===!0)r=J.toneMapping}let X0={shaderID:J0,shaderType:R.type,shaderName:R.name,vertexShader:u0,fragmentShader:s,defines:R.defines,customVertexShaderID:W0,customFragmentShaderID:K0,isRawShaderMaterial:R.isRawShaderMaterial===!0,glslVersion:R.glslVersion,precision:G,batching:f0,batchingColor:f0&&y._colorsTexture!==null,instancing:j0,instancingColor:j0&&y.instanceColor!==null,instancingMorph:j0&&y.morphTexture!==null,outputColorSpace:H0===null?J.outputColorSpace:H0.isXRRenderTarget===!0?H0.texture.colorSpace:g0.workingColorSpace,alphaToCoverage:!!R.alphaToCoverage,map:y0,matcap:o0,envMap:h0,envMapMode:h0&&a.mapping,envMapCubeUVHeight:e,aoMap:x0,lightMap:D8,bumpMap:p8,normalMap:$8,displacementMap:k8,emissiveMap:O8,normalMapObjectSpace:$8&&R.normalMapType===VZ,normalMapTangentSpace:$8&&R.normalMapType===mQ,packedNormalMap:$8&&R.normalMapType===mQ&&o5(R.normalMap.format),metalnessMap:E8,roughnessMap:j,anisotropy:m8,anisotropyMap:d,clearcoat:s0,clearcoatMap:t,clearcoatNormalMap:Q0,clearcoatRoughnessMap:U0,dispersion:W8,iridescence:B,iridescenceMap:n,iridescenceThicknessMap:o,sheen:M,sheenColorMap:F0,sheenRoughnessMap:B0,specularMap:G0,specularColorMap:$0,specularIntensityMap:_0,transmission:T,transmissionMap:A0,thicknessMap:c0,gradientMap:S,opaque:R.transparent===!1&&R.blending===p6&&R.alphaToCoverage===!1,alphaMap:Z0,alphaTest:i,alphaHash:Y0,combine:R.combine,mapUv:y0&&O(R.map.channel),aoMapUv:x0&&O(R.aoMap.channel),lightMapUv:D8&&O(R.lightMap.channel),bumpMapUv:p8&&O(R.bumpMap.channel),normalMapUv:$8&&O(R.normalMap.channel),displacementMapUv:k8&&O(R.displacementMap.channel),emissiveMapUv:O8&&O(R.emissiveMap.channel),metalnessMapUv:E8&&O(R.metalnessMap.channel),roughnessMapUv:j&&O(R.roughnessMap.channel),anisotropyMapUv:d&&O(R.anisotropyMap.channel),clearcoatMapUv:t&&O(R.clearcoatMap.channel),clearcoatNormalMapUv:Q0&&O(R.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:U0&&O(R.clearcoatRoughnessMap.channel),iridescenceMapUv:n&&O(R.iridescenceMap.channel),iridescenceThicknessMapUv:o&&O(R.iridescenceThicknessMap.channel),sheenColorMapUv:F0&&O(R.sheenColorMap.channel),sheenRoughnessMapUv:B0&&O(R.sheenRoughnessMap.channel),specularMapUv:G0&&O(R.specularMap.channel),specularColorMapUv:$0&&O(R.specularColorMap.channel),specularIntensityMapUv:_0&&O(R.specularIntensityMap.channel),transmissionMapUv:A0&&O(R.transmissionMap.channel),thicknessMapUv:c0&&O(R.thicknessMap.channel),alphaMapUv:Z0&&O(R.alphaMap.channel),vertexTangents:!!u.attributes.tangent&&($8||m8),vertexNormals:!!u.attributes.normal,vertexColors:R.vertexColors,vertexAlphas:R.vertexColors===!0&&!!u.attributes.color&&u.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!u.attributes.uv&&(y0||Z0),fog:!!b,useFog:R.fog===!0,fogExp2:!!b&&b.isFogExp2,flatShading:R.wireframe===!1&&(R.flatShading===!0||u.attributes.normal===void 0&&$8===!1&&(R.isMeshLambertMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isMeshPhysicalMaterial)),sizeAttenuation:R.sizeAttenuation===!0,logarithmicDepthBuffer:N,reversedDepthBuffer:L0,skinning:y.isSkinnedMesh===!0,hasPositionAttribute:u.attributes.position!==void 0,morphTargets:u.morphAttributes.position!==void 0,morphNormals:u.morphAttributes.normal!==void 0,morphColors:u.morphAttributes.color!==void 0,morphTargetsCount:D0,morphTextureStride:l0,numDirLights:z.directional.length,numPointLights:z.point.length,numSpotLights:z.spot.length,numSpotLightMaps:z.spotLightMap.length,numRectAreaLights:z.rectArea.length,numHemiLights:z.hemi.length,numDirLightShadows:z.directionalShadowMap.length,numPointLightShadows:z.pointShadowMap.length,numSpotLightShadows:z.spotShadowMap.length,numSpotLightShadowsWithMaps:z.numSpotLightShadowsWithMaps,numLightProbes:z.numLightProbes,numLightProbeGrids:c.length,numClippingPlanes:K.numPlanes,numClipIntersection:K.numIntersection,dithering:R.dithering,shadowMapEnabled:J.shadowMap.enabled&&p.length>0,shadowMapType:J.shadowMap.type,toneMapping:r,decodeVideoTexture:y0&&R.map.isVideoTexture===!0&&g0.getTransfer(R.map.colorSpace)===e0,decodeVideoTextureEmissive:O8&&R.emissiveMap.isVideoTexture===!0&&g0.getTransfer(R.emissiveMap.colorSpace)===e0,premultipliedAlpha:R.premultipliedAlpha,doubleSided:R.side===$9,flipSided:R.side===w8,useDepthPacking:R.depthPacking>=0,depthPacking:R.depthPacking||0,index0AttributeName:R.index0AttributeName,extensionClipCullDistance:O0&&R.extensions.clipCullDistance===!0&&$.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(O0&&R.extensions.multiDraw===!0||f0)&&$.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:$.has("KHR_parallel_shader_compile"),customProgramCacheKey:R.customProgramCacheKey()};return X0.vertexUv1s=X.has(1),X0.vertexUv2s=X.has(2),X0.vertexUv3s=X.has(3),X.clear(),X0}function D(R){let z=[];if(R.shaderID)z.push(R.shaderID);else z.push(R.customVertexShaderID),z.push(R.customFragmentShaderID);if(R.defines!==void 0)for(let p in R.defines)z.push(p),z.push(R.defines[p]);if(R.isRawShaderMaterial===!1)q(z,R),_(z,R),z.push(J.outputColorSpace);return z.push(R.customProgramCacheKey),z.join()}function q(R,z){R.push(z.precision),R.push(z.outputColorSpace),R.push(z.envMapMode),R.push(z.envMapCubeUVHeight),R.push(z.mapUv),R.push(z.alphaMapUv),R.push(z.lightMapUv),R.push(z.aoMapUv),R.push(z.bumpMapUv),R.push(z.normalMapUv),R.push(z.displacementMapUv),R.push(z.emissiveMapUv),R.push(z.metalnessMapUv),R.push(z.roughnessMapUv),R.push(z.anisotropyMapUv),R.push(z.clearcoatMapUv),R.push(z.clearcoatNormalMapUv),R.push(z.clearcoatRoughnessMapUv),R.push(z.iridescenceMapUv),R.push(z.iridescenceThicknessMapUv),R.push(z.sheenColorMapUv),R.push(z.sheenRoughnessMapUv),R.push(z.specularMapUv),R.push(z.specularColorMapUv),R.push(z.specularIntensityMapUv),R.push(z.transmissionMapUv),R.push(z.thicknessMapUv),R.push(z.combine),R.push(z.fogExp2),R.push(z.sizeAttenuation),R.push(z.morphTargetsCount),R.push(z.morphAttributeCount),R.push(z.numDirLights),R.push(z.numPointLights),R.push(z.numSpotLights),R.push(z.numSpotLightMaps),R.push(z.numHemiLights),R.push(z.numRectAreaLights),R.push(z.numDirLightShadows),R.push(z.numPointLightShadows),R.push(z.numSpotLightShadows),R.push(z.numSpotLightShadowsWithMaps),R.push(z.numLightProbes),R.push(z.shadowMapType),R.push(z.toneMapping),R.push(z.numClippingPlanes),R.push(z.numClipIntersection),R.push(z.depthPacking)}function _(R,z){if(H.disableAll(),z.instancing)H.enable(0);if(z.instancingColor)H.enable(1);if(z.instancingMorph)H.enable(2);if(z.matcap)H.enable(3);if(z.envMap)H.enable(4);if(z.normalMapObjectSpace)H.enable(5);if(z.normalMapTangentSpace)H.enable(6);if(z.clearcoat)H.enable(7);if(z.iridescence)H.enable(8);if(z.alphaTest)H.enable(9);if(z.vertexColors)H.enable(10);if(z.vertexAlphas)H.enable(11);if(z.vertexUv1s)H.enable(12);if(z.vertexUv2s)H.enable(13);if(z.vertexUv3s)H.enable(14);if(z.vertexTangents)H.enable(15);if(z.anisotropy)H.enable(16);if(z.alphaHash)H.enable(17);if(z.batching)H.enable(18);if(z.dispersion)H.enable(19);if(z.batchingColor)H.enable(20);if(z.gradientMap)H.enable(21);if(z.packedNormalMap)H.enable(22);if(z.vertexNormals)H.enable(23);if(R.push(H.mask),H.disableAll(),z.fog)H.enable(0);if(z.useFog)H.enable(1);if(z.flatShading)H.enable(2);if(z.logarithmicDepthBuffer)H.enable(3);if(z.reversedDepthBuffer)H.enable(4);if(z.skinning)H.enable(5);if(z.morphTargets)H.enable(6);if(z.morphNormals)H.enable(7);if(z.morphColors)H.enable(8);if(z.premultipliedAlpha)H.enable(9);if(z.shadowMapEnabled)H.enable(10);if(z.doubleSided)H.enable(11);if(z.flipSided)H.enable(12);if(z.useDepthPacking)H.enable(13);if(z.dithering)H.enable(14);if(z.transmission)H.enable(15);if(z.sheen)H.enable(16);if(z.opaque)H.enable(17);if(z.pointsUvs)H.enable(18);if(z.decodeVideoTexture)H.enable(19);if(z.decodeVideoTextureEmissive)H.enable(20);if(z.alphaToCoverage)H.enable(21);if(z.numLightProbeGrids>0)H.enable(22);if(z.hasPositionAttribute)H.enable(23);R.push(H.mask)}function A(R){let z=F[R.type],p;if(z){let P=H9[z];p=vZ.clone(P.uniforms)}else p=R.uniforms;return p}function k(R,z){let p=E.get(z);if(p!==void 0)++p.usedTimes;else p=new s5(J,z,R,Z),U.push(p),E.set(z,p);return p}function I(R){if(--R.usedTimes===0){let z=U.indexOf(R);U[z]=U[U.length-1],U.pop(),E.delete(R.cacheKey),R.destroy()}}function C(R){Y.remove(R)}function w(){Y.dispose()}return{getParameters:V,getProgramCacheKey:D,getUniforms:A,acquireProgram:k,releaseProgram:I,releaseShaderCache:C,programs:U,dispose:w}}function r5(){let J=new WeakMap;function Q(H){return J.has(H)}function $(H){let Y=J.get(H);if(Y===void 0)Y={},J.set(H,Y);return Y}function W(H){J.delete(H)}function Z(H,Y,X){J.get(H)[Y]=X}function K(){J=new WeakMap}return{has:Q,get:$,remove:W,update:Z,dispose:K}}function t5(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.material.id!==Q.material.id)return J.material.id-Q.material.id;else if(J.materialVariant!==Q.materialVariant)return J.materialVariant-Q.materialVariant;else if(J.z!==Q.z)return J.z-Q.z;else return J.id-Q.id}function JK(J,Q){if(J.groupOrder!==Q.groupOrder)return J.groupOrder-Q.groupOrder;else if(J.renderOrder!==Q.renderOrder)return J.renderOrder-Q.renderOrder;else if(J.z!==Q.z)return Q.z-J.z;else return J.id-Q.id}function QK(){let J=[],Q=0,$=[],W=[],Z=[];function K(){Q=0,$.length=0,W.length=0,Z.length=0}function H(G){let F=0;if(G.isInstancedMesh)F+=2;if(G.isSkinnedMesh)F+=1;return F}function Y(G,F,O,V,D,q){let _=J[Q];if(_===void 0)_={id:G.id,object:G,geometry:F,material:O,materialVariant:H(G),groupOrder:V,renderOrder:G.renderOrder,z:D,group:q},J[Q]=_;else _.id=G.id,_.object=G,_.geometry=F,_.material=O,_.materialVariant=H(G),_.groupOrder=V,_.renderOrder=G.renderOrder,_.z=D,_.group=q;return Q++,_}function X(G,F,O,V,D,q){let _=Y(G,F,O,V,D,q);if(O.transmission>0)W.push(_);else if(O.transparent===!0)Z.push(_);else $.push(_)}function U(G,F,O,V,D,q){let _=Y(G,F,O,V,D,q);if(O.transmission>0)W.unshift(_);else if(O.transparent===!0)Z.unshift(_);else $.unshift(_)}function E(G,F,O){if($.length>1)$.sort(G||t5);if(W.length>1)W.sort(F||JK);if(Z.length>1)Z.sort(F||JK);if(O)$.reverse(),W.reverse(),Z.reverse()}function N(){for(let G=Q,F=J.length;G<F;G++){let O=J[G];if(O.id===null)break;O.id=null,O.object=null,O.geometry=null,O.material=null,O.group=null}}return{opaque:$,transmissive:W,transparent:Z,init:K,push:X,unshift:U,finish:N,sort:E}}function e5(){let J=new WeakMap;function Q(W,Z){let K=J.get(W),H;if(K===void 0)H=new QK,J.set(W,[H]);else if(Z>=K.length)H=new QK,K.push(H);else H=K[Z];return H}function $(){J=new WeakMap}return{get:Q,dispose:$}}function J1(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={direction:new h,color:new p0};break;case"SpotLight":$={position:new h,direction:new h,color:new p0,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":$={position:new h,color:new p0,distance:0,decay:0};break;case"HemisphereLight":$={direction:new h,skyColor:new p0,groundColor:new p0};break;case"RectAreaLight":$={color:new p0,position:new h,halfWidth:new h,halfHeight:new h};break}return J[Q.id]=$,$}}}function Q1(){let J={};return{get:function(Q){if(J[Q.id]!==void 0)return J[Q.id];let $;switch(Q.type){case"DirectionalLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0};break;case"SpotLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0};break;case"PointLight":$={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new n0,shadowCameraNear:1,shadowCameraFar:1000};break}return J[Q.id]=$,$}}}var $1=0;function W1(J,Q){return(Q.castShadow?2:0)-(J.castShadow?2:0)+(Q.map?1:0)-(J.map?1:0)}function Z1(J){let Q=new J1,$=Q1(),W={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let U=0;U<9;U++)W.probe.push(new h);let Z=new h,K=new Z8,H=new Z8;function Y(U){let E=0,N=0,G=0;for(let z=0;z<9;z++)W.probe[z].set(0,0,0);let F=0,O=0,V=0,D=0,q=0,_=0,A=0,k=0,I=0,C=0,w=0;U.sort(W1);for(let z=0,p=U.length;z<p;z++){let P=U[z],y=P.color,c=P.intensity,b=P.distance,u=null;if(P.shadow&&P.shadow.map)if(P.shadow.map.texture.format===n9)u=P.shadow.map.texture;else u=P.shadow.map.depthTexture||P.shadow.map.texture;if(P.isAmbientLight)E+=y.r*c,N+=y.g*c,G+=y.b*c;else if(P.isLightProbe){for(let m=0;m<9;m++)W.probe[m].addScaledVector(P.sh.coefficients[m],c);w++}else if(P.isDirectionalLight){let m=Q.get(P);if(m.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let f=P.shadow,a=$.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,W.directionalShadow[F]=a,W.directionalShadowMap[F]=u,W.directionalShadowMatrix[F]=P.shadow.matrix,_++}W.directional[F]=m,F++}else if(P.isSpotLight){let m=Q.get(P);m.position.setFromMatrixPosition(P.matrixWorld),m.color.copy(y).multiplyScalar(c),m.distance=b,m.coneCos=Math.cos(P.angle),m.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),m.decay=P.decay,W.spot[V]=m;let f=P.shadow;if(P.map){if(W.spotLightMap[I]=P.map,I++,f.updateMatrices(P),P.castShadow)C++}if(W.spotLightMatrix[V]=f.matrix,P.castShadow){let a=$.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,W.spotShadow[V]=a,W.spotShadowMap[V]=u,k++}V++}else if(P.isRectAreaLight){let m=Q.get(P);m.color.copy(y).multiplyScalar(c),m.halfWidth.set(P.width*0.5,0,0),m.halfHeight.set(0,P.height*0.5,0),W.rectArea[D]=m,D++}else if(P.isPointLight){let m=Q.get(P);if(m.color.copy(P.color).multiplyScalar(P.intensity),m.distance=P.distance,m.decay=P.decay,P.castShadow){let f=P.shadow,a=$.get(P);a.shadowIntensity=f.intensity,a.shadowBias=f.bias,a.shadowNormalBias=f.normalBias,a.shadowRadius=f.radius,a.shadowMapSize=f.mapSize,a.shadowCameraNear=f.camera.near,a.shadowCameraFar=f.camera.far,W.pointShadow[O]=a,W.pointShadowMap[O]=u,W.pointShadowMatrix[O]=P.shadow.matrix,A++}W.point[O]=m,O++}else if(P.isHemisphereLight){let m=Q.get(P);m.skyColor.copy(P.color).multiplyScalar(c),m.groundColor.copy(P.groundColor).multiplyScalar(c),W.hemi[q]=m,q++}}if(D>0)if(J.has("OES_texture_float_linear")===!0)W.rectAreaLTC1=N0.LTC_FLOAT_1,W.rectAreaLTC2=N0.LTC_FLOAT_2;else W.rectAreaLTC1=N0.LTC_HALF_1,W.rectAreaLTC2=N0.LTC_HALF_2;W.ambient[0]=E,W.ambient[1]=N,W.ambient[2]=G;let R=W.hash;if(R.directionalLength!==F||R.pointLength!==O||R.spotLength!==V||R.rectAreaLength!==D||R.hemiLength!==q||R.numDirectionalShadows!==_||R.numPointShadows!==A||R.numSpotShadows!==k||R.numSpotMaps!==I||R.numLightProbes!==w)W.directional.length=F,W.spot.length=V,W.rectArea.length=D,W.point.length=O,W.hemi.length=q,W.directionalShadow.length=_,W.directionalShadowMap.length=_,W.pointShadow.length=A,W.pointShadowMap.length=A,W.spotShadow.length=k,W.spotShadowMap.length=k,W.directionalShadowMatrix.length=_,W.pointShadowMatrix.length=A,W.spotLightMatrix.length=k+I-C,W.spotLightMap.length=I,W.numSpotLightShadowsWithMaps=C,W.numLightProbes=w,R.directionalLength=F,R.pointLength=O,R.spotLength=V,R.rectAreaLength=D,R.hemiLength=q,R.numDirectionalShadows=_,R.numPointShadows=A,R.numSpotShadows=k,R.numSpotMaps=I,R.numLightProbes=w,W.version=$1++}function X(U,E){let N=0,G=0,F=0,O=0,V=0,D=E.matrixWorldInverse;for(let q=0,_=U.length;q<_;q++){let A=U[q];if(A.isDirectionalLight){let k=W.directional[N];k.direction.setFromMatrixPosition(A.matrixWorld),Z.setFromMatrixPosition(A.target.matrixWorld),k.direction.sub(Z),k.direction.transformDirection(D),N++}else if(A.isSpotLight){let k=W.spot[F];k.position.setFromMatrixPosition(A.matrixWorld),k.position.applyMatrix4(D),k.direction.setFromMatrixPosition(A.matrixWorld),Z.setFromMatrixPosition(A.target.matrixWorld),k.direction.sub(Z),k.direction.transformDirection(D),F++}else if(A.isRectAreaLight){let k=W.rectArea[O];k.position.setFromMatrixPosition(A.matrixWorld),k.position.applyMatrix4(D),H.identity(),K.copy(A.matrixWorld),K.premultiply(D),H.extractRotation(K),k.halfWidth.set(A.width*0.5,0,0),k.halfHeight.set(0,A.height*0.5,0),k.halfWidth.applyMatrix4(H),k.halfHeight.applyMatrix4(H),O++}else if(A.isPointLight){let k=W.point[G];k.position.setFromMatrixPosition(A.matrixWorld),k.position.applyMatrix4(D),G++}else if(A.isHemisphereLight){let k=W.hemi[V];k.direction.setFromMatrixPosition(A.matrixWorld),k.direction.transformDirection(D),V++}}}return{setup:Y,setupView:X,state:W}}function $K(J){let Q=new Z1(J),$=[],W=[],Z=[];function K(G){N.camera=G,$.length=0,W.length=0,Z.length=0}function H(G){$.push(G)}function Y(G){W.push(G)}function X(G){Z.push(G)}function U(){Q.setup($)}function E(G){Q.setupView($,G)}let N={lightsArray:$,shadowsArray:W,lightProbeGridArray:Z,camera:null,lights:Q,transmissionRenderTarget:{},textureUnits:0};return{init:K,state:N,setupLights:U,setupLightsView:E,pushLight:H,pushShadow:Y,pushLightProbeGrid:X}}function K1(J){let Q=new WeakMap;function $(Z,K=0){let H=Q.get(Z),Y;if(H===void 0)Y=new $K(J),Q.set(Z,[Y]);else if(K>=H.length)Y=new $K(J),H.push(Y);else Y=H[K];return Y}function W(){Q=new WeakMap}return{get:$,dispose:W}}var H1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Y1=`uniform sampler2D shadow_pass;
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
}`,X1=[new h(1,0,0),new h(-1,0,0),new h(0,1,0),new h(0,-1,0),new h(0,0,1),new h(0,0,-1)],U1=[new h(0,-1,0),new h(0,-1,0),new h(0,0,1),new h(0,0,-1),new h(0,-1,0),new h(0,-1,0)],WK=new Z8,a6=new h,C$=new h;function G1(J,Q,$){let W=new t7,Z=new n0,K=new n0,H=new K8,Y=new W$,X=new Z$,U={},E=$.maxTextureSize,N={[B6]:w8,[w8]:B6,[$9]:$9},G=new T8({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new n0},radius:{value:4}},vertexShader:H1,fragmentShader:Y1}),F=G.clone();F.defines.HORIZONTAL_PASS=1;let O=new C8;O.setAttribute("position",new R8(new Float32Array([-1,-1,0.5,3,-1,0.5,-1,3,0.5]),3));let V=new x8(O,G),D=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=g6;let q=this.type;this.render=function(C,w,R){if(D.enabled===!1)return;if(D.autoUpdate===!1&&D.needsUpdate===!1)return;if(C.length===0)return;if(this.type===bW)C0("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=g6;let z=J.getRenderTarget(),p=J.getActiveCubeFace(),P=J.getActiveMipmapLevel(),y=J.state;if(y.setBlending(W9),y.buffers.depth.getReversed()===!0)y.buffers.color.setClear(0,0,0,0);else y.buffers.color.setClear(1,1,1,1);y.buffers.depth.setTest(!0),y.setScissorTest(!1);let c=q!==this.type;if(c)w.traverse(function(b){if(b.material)if(Array.isArray(b.material))b.material.forEach((u)=>u.needsUpdate=!0);else b.material.needsUpdate=!0});for(let b=0,u=C.length;b<u;b++){let m=C[b],f=m.shadow;if(f===void 0){C0("WebGLShadowMap:",m,"has no shadow.");continue}if(f.autoUpdate===!1&&f.needsUpdate===!1)continue;Z.copy(f.mapSize);let a=f.getFrameExtents();if(Z.multiply(a),K.copy(f.mapSize),Z.x>E||Z.y>E){if(Z.x>E)K.x=Math.floor(E/a.x),Z.x=K.x*a.x,f.mapSize.x=K.x;if(Z.y>E)K.y=Math.floor(E/a.y),Z.y=K.y*a.y,f.mapSize.y=K.y}let e=J.state.buffers.depth.getReversed();if(f.camera._reversedDepth=e,f.map===null||c===!0){if(f.map!==null){if(f.map.depthTexture!==null)f.map.depthTexture.dispose(),f.map.depthTexture=null;f.map.dispose()}if(this.type===V6){if(m.isPointLight){C0("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}f.map=new c8(Z.x,Z.y,{format:n9,type:O9,minFilter:_8,magFilter:_8,generateMipmaps:!1}),f.map.texture.name=m.name+".shadowMap",f.map.depthTexture=new v9(Z.x,Z.y,D9),f.map.depthTexture.name=m.name+".shadowMapDepth",f.map.depthTexture.format=u9,f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=T9,f.map.depthTexture.magFilter=T9}else{if(m.isPointLight)f.map=new T$(Z.x),f.map.depthTexture=new J$(Z.x,S9);else f.map=new c8(Z.x,Z.y),f.map.depthTexture=new v9(Z.x,Z.y,S9);if(f.map.depthTexture.name=m.name+".shadowMap",f.map.depthTexture.format=u9,this.type===g6)f.map.depthTexture.compareFunction=e?u7:d7,f.map.depthTexture.minFilter=_8,f.map.depthTexture.magFilter=_8;else f.map.depthTexture.compareFunction=null,f.map.depthTexture.minFilter=T9,f.map.depthTexture.magFilter=T9}f.camera.updateProjectionMatrix()}let J0=f.map.isWebGLCubeRenderTarget?6:1;for(let k0=0;k0<J0;k0++){if(f.map.isWebGLCubeRenderTarget)J.setRenderTarget(f.map,k0),J.clear();else{if(k0===0)J.setRenderTarget(f.map),J.clear();let D0=f.getViewport(k0);H.set(K.x*D0.x,K.y*D0.y,K.x*D0.z,K.y*D0.w),y.viewport(H)}if(m.isPointLight){let{camera:D0,matrix:l0}=f,u0=m.distance||D0.far;if(u0!==D0.far)D0.far=u0,D0.updateProjectionMatrix();a6.setFromMatrixPosition(m.matrixWorld),D0.position.copy(a6),C$.copy(D0.position),C$.add(X1[k0]),D0.up.copy(U1[k0]),D0.lookAt(C$),D0.updateMatrixWorld(),l0.makeTranslation(-a6.x,-a6.y,-a6.z),WK.multiplyMatrices(D0.projectionMatrix,D0.matrixWorldInverse),f._frustum.setFromProjectionMatrix(WK,D0.coordinateSystem,D0.reversedDepth)}else f.updateMatrices(m);W=f.getFrustum(),k(w,R,f.camera,m,this.type)}if(f.isPointLightShadow!==!0&&this.type===V6)_(f,R);f.needsUpdate=!1}q=this.type,D.needsUpdate=!1,J.setRenderTarget(z,p,P)};function _(C,w){let R=Q.update(V);if(G.defines.VSM_SAMPLES!==C.blurSamples)G.defines.VSM_SAMPLES=C.blurSamples,F.defines.VSM_SAMPLES=C.blurSamples,G.needsUpdate=!0,F.needsUpdate=!0;if(C.mapPass===null)C.mapPass=new c8(Z.x,Z.y,{format:n9,type:O9});G.uniforms.shadow_pass.value=C.map.depthTexture,G.uniforms.resolution.value=C.mapSize,G.uniforms.radius.value=C.radius,J.setRenderTarget(C.mapPass),J.clear(),J.renderBufferDirect(w,null,R,G,V,null),F.uniforms.shadow_pass.value=C.mapPass.texture,F.uniforms.resolution.value=C.mapSize,F.uniforms.radius.value=C.radius,J.setRenderTarget(C.map),J.clear(),J.renderBufferDirect(w,null,R,F,V,null)}function A(C,w,R,z){let p=null,P=R.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(P!==void 0)p=P;else if(p=R.isPointLight===!0?X:Y,J.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let y=p.uuid,c=w.uuid,b=U[y];if(b===void 0)b={},U[y]=b;let u=b[c];if(u===void 0)u=p.clone(),b[c]=u,w.addEventListener("dispose",I);p=u}if(p.visible=w.visible,p.wireframe=w.wireframe,z===V6)p.side=w.shadowSide!==null?w.shadowSide:w.side;else p.side=w.shadowSide!==null?w.shadowSide:N[w.side];if(p.alphaMap=w.alphaMap,p.alphaTest=w.alphaToCoverage===!0?0.5:w.alphaTest,p.map=w.map,p.clipShadows=w.clipShadows,p.clippingPlanes=w.clippingPlanes,p.clipIntersection=w.clipIntersection,p.displacementMap=w.displacementMap,p.displacementScale=w.displacementScale,p.displacementBias=w.displacementBias,p.wireframeLinewidth=w.wireframeLinewidth,p.linewidth=w.linewidth,R.isPointLight===!0&&p.isMeshDistanceMaterial===!0){let y=J.properties.get(p);y.light=R}return p}function k(C,w,R,z,p){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)){if((C.castShadow||C.receiveShadow&&p===V6)&&(!C.frustumCulled||W.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,C.matrixWorld);let c=Q.update(C),b=C.material;if(Array.isArray(b)){let u=c.groups;for(let m=0,f=u.length;m<f;m++){let a=u[m],e=b[a.materialIndex];if(e&&e.visible){let J0=A(C,e,z,p);C.onBeforeShadow(J,C,w,R,c,J0,a),J.renderBufferDirect(R,null,c,J0,C,a),C.onAfterShadow(J,C,w,R,c,J0,a)}}}else if(b.visible){let u=A(C,b,z,p);C.onBeforeShadow(J,C,w,R,c,u,null),J.renderBufferDirect(R,null,c,u,C,null),C.onAfterShadow(J,C,w,R,c,u,null)}}}let y=C.children;for(let c=0,b=y.length;c<b;c++)k(y[c],w,R,z,p)}function I(C){C.target.removeEventListener("dispose",I);for(let R in U){let z=U[R],p=C.target.uuid;if(p in z)z[p].dispose(),delete z[p]}}}function N1(J,Q){function $(){let S=!1,Z0=new K8,i=null,Y0=new K8(0,0,0,0);return{setMask:function(O0){if(i!==O0&&!S)J.colorMask(O0,O0,O0,O0),i=O0},setLocked:function(O0){S=O0},setClear:function(O0,r,X0,T0,H8){if(H8===!0)O0*=T0,r*=T0,X0*=T0;if(Z0.set(O0,r,X0,T0),Y0.equals(Z0)===!1)J.clearColor(O0,r,X0,T0),Y0.copy(Z0)},reset:function(){S=!1,i=null,Y0.set(-1,0,0,0)}}}function W(){let S=!1,Z0=!1,i=null,Y0=null,O0=null;return{setReversed:function(r){if(Z0!==r){let X0=Q.get("EXT_clip_control");if(r)X0.clipControlEXT(X0.LOWER_LEFT_EXT,X0.ZERO_TO_ONE_EXT);else X0.clipControlEXT(X0.LOWER_LEFT_EXT,X0.NEGATIVE_ONE_TO_ONE_EXT);Z0=r;let T0=O0;O0=null,this.setClear(T0)}},getReversed:function(){return Z0},setTest:function(r){if(r)H0(J.DEPTH_TEST);else L0(J.DEPTH_TEST)},setMask:function(r){if(i!==r&&!S)J.depthMask(r),i=r},setFunc:function(r){if(Z0)r=SZ[r];if(Y0!==r){switch(r){case WZ:J.depthFunc(J.NEVER);break;case ZZ:J.depthFunc(J.ALWAYS);break;case KZ:J.depthFunc(J.LESS);break;case rJ:J.depthFunc(J.LEQUAL);break;case HZ:J.depthFunc(J.EQUAL);break;case YZ:J.depthFunc(J.GEQUAL);break;case XZ:J.depthFunc(J.GREATER);break;case UZ:J.depthFunc(J.NOTEQUAL);break;default:J.depthFunc(J.LEQUAL)}Y0=r}},setLocked:function(r){S=r},setClear:function(r){if(O0!==r){if(O0=r,Z0)r=1-r;J.clearDepth(r)}},reset:function(){S=!1,i=null,Y0=null,O0=null,Z0=!1}}}function Z(){let S=!1,Z0=null,i=null,Y0=null,O0=null,r=null,X0=null,T0=null,H8=null;return{setTest:function(J8){if(!S)if(J8)H0(J.STENCIL_TEST);else L0(J.STENCIL_TEST)},setMask:function(J8){if(Z0!==J8&&!S)J.stencilMask(J8),Z0=J8},setFunc:function(J8,e8,Y9){if(i!==J8||Y0!==e8||O0!==Y9)J.stencilFunc(J8,e8,Y9),i=J8,Y0=e8,O0=Y9},setOp:function(J8,e8,Y9){if(r!==J8||X0!==e8||T0!==Y9)J.stencilOp(J8,e8,Y9),r=J8,X0=e8,T0=Y9},setLocked:function(J8){S=J8},setClear:function(J8){if(H8!==J8)J.clearStencil(J8),H8=J8},reset:function(){S=!1,Z0=null,i=null,Y0=null,O0=null,r=null,X0=null,T0=null,H8=null}}}let K=new $,H=new W,Y=new Z,X=new WeakMap,U=new WeakMap,E={},N={},G={},F=new WeakMap,O=[],V=null,D=!1,q=null,_=null,A=null,k=null,I=null,C=null,w=null,R=new p0(0,0,0),z=0,p=!1,P=null,y=null,c=null,b=null,u=null,m=J.getParameter(J.MAX_COMBINED_TEXTURE_IMAGE_UNITS),f=!1,a=0,e=J.getParameter(J.VERSION);if(e.indexOf("WebGL")!==-1)a=parseFloat(/^WebGL (\d)/.exec(e)[1]),f=a>=1;else if(e.indexOf("OpenGL ES")!==-1)a=parseFloat(/^OpenGL ES (\d)/.exec(e)[1]),f=a>=2;let J0=null,k0={},D0=J.getParameter(J.SCISSOR_BOX),l0=J.getParameter(J.VIEWPORT),u0=new K8().fromArray(D0),s=new K8().fromArray(l0);function W0(S,Z0,i,Y0){let O0=new Uint8Array(4),r=J.createTexture();J.bindTexture(S,r),J.texParameteri(S,J.TEXTURE_MIN_FILTER,J.NEAREST),J.texParameteri(S,J.TEXTURE_MAG_FILTER,J.NEAREST);for(let X0=0;X0<i;X0++)if(S===J.TEXTURE_3D||S===J.TEXTURE_2D_ARRAY)J.texImage3D(Z0,0,J.RGBA,1,1,Y0,0,J.RGBA,J.UNSIGNED_BYTE,O0);else J.texImage2D(Z0+X0,0,J.RGBA,1,1,0,J.RGBA,J.UNSIGNED_BYTE,O0);return r}let K0={};K0[J.TEXTURE_2D]=W0(J.TEXTURE_2D,J.TEXTURE_2D,1),K0[J.TEXTURE_CUBE_MAP]=W0(J.TEXTURE_CUBE_MAP,J.TEXTURE_CUBE_MAP_POSITIVE_X,6),K0[J.TEXTURE_2D_ARRAY]=W0(J.TEXTURE_2D_ARRAY,J.TEXTURE_2D_ARRAY,1,1),K0[J.TEXTURE_3D]=W0(J.TEXTURE_3D,J.TEXTURE_3D,1,1),K.setClear(0,0,0,1),H.setClear(1),Y.setClear(0),H0(J.DEPTH_TEST),H.setFunc(rJ),p8(!1),$8(sJ),H0(J.CULL_FACE),x0(W9);function H0(S){if(E[S]!==!0)J.enable(S),E[S]=!0}function L0(S){if(E[S]!==!1)J.disable(S),E[S]=!1}function j0(S,Z0){if(G[S]!==Z0){if(J.bindFramebuffer(S,Z0),G[S]=Z0,S===J.DRAW_FRAMEBUFFER)G[J.FRAMEBUFFER]=Z0;if(S===J.FRAMEBUFFER)G[J.DRAW_FRAMEBUFFER]=Z0;return!0}return!1}function f0(S,Z0){let i=O,Y0=!1;if(S){if(i=F.get(Z0),i===void 0)i=[],F.set(Z0,i);let O0=S.textures;if(i.length!==O0.length||i[0]!==J.COLOR_ATTACHMENT0){for(let r=0,X0=O0.length;r<X0;r++)i[r]=J.COLOR_ATTACHMENT0+r;i.length=O0.length,Y0=!0}}else if(i[0]!==J.BACK)i[0]=J.BACK,Y0=!0;if(Y0)J.drawBuffers(i)}function y0(S){if(V!==S)return J.useProgram(S),V=S,!0;return!1}let o0={[z6]:J.FUNC_ADD,[xW]:J.FUNC_SUBTRACT,[gW]:J.FUNC_REVERSE_SUBTRACT};o0[pW]=J.MIN,o0[mW]=J.MAX;let h0={[lW]:J.ZERO,[dW]:J.ONE,[uW]:J.SRC_COLOR,[nW]:J.SRC_ALPHA,[tW]:J.SRC_ALPHA_SATURATE,[aW]:J.DST_COLOR,[iW]:J.DST_ALPHA,[cW]:J.ONE_MINUS_SRC_COLOR,[sW]:J.ONE_MINUS_SRC_ALPHA,[rW]:J.ONE_MINUS_DST_COLOR,[oW]:J.ONE_MINUS_DST_ALPHA,[eW]:J.CONSTANT_COLOR,[JZ]:J.ONE_MINUS_CONSTANT_COLOR,[QZ]:J.CONSTANT_ALPHA,[$Z]:J.ONE_MINUS_CONSTANT_ALPHA};function x0(S,Z0,i,Y0,O0,r,X0,T0,H8,J8){if(S===W9){if(D===!0)L0(J.BLEND),D=!1;return}if(D===!1)H0(J.BLEND),D=!0;if(S!==hW){if(S!==q||J8!==p){if(_!==z6||I!==z6)J.blendEquation(J.FUNC_ADD),_=z6,I=z6;if(J8)switch(S){case p6:J.blendFuncSeparate(J.ONE,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case iJ:J.blendFunc(J.ONE,J.ONE);break;case oJ:J.blendFuncSeparate(J.ZERO,J.ONE_MINUS_SRC_COLOR,J.ZERO,J.ONE);break;case aJ:J.blendFuncSeparate(J.DST_COLOR,J.ONE_MINUS_SRC_ALPHA,J.ZERO,J.ONE);break;default:P0("WebGLState: Invalid blending: ",S);break}else switch(S){case p6:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE_MINUS_SRC_ALPHA,J.ONE,J.ONE_MINUS_SRC_ALPHA);break;case iJ:J.blendFuncSeparate(J.SRC_ALPHA,J.ONE,J.ONE,J.ONE);break;case oJ:P0("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case aJ:P0("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:P0("WebGLState: Invalid blending: ",S);break}A=null,k=null,C=null,w=null,R.set(0,0,0),z=0,q=S,p=J8}return}if(O0=O0||Z0,r=r||i,X0=X0||Y0,Z0!==_||O0!==I)J.blendEquationSeparate(o0[Z0],o0[O0]),_=Z0,I=O0;if(i!==A||Y0!==k||r!==C||X0!==w)J.blendFuncSeparate(h0[i],h0[Y0],h0[r],h0[X0]),A=i,k=Y0,C=r,w=X0;if(T0.equals(R)===!1||H8!==z)J.blendColor(T0.r,T0.g,T0.b,H8),R.copy(T0),z=H8;q=S,p=!1}function D8(S,Z0){S.side===$9?L0(J.CULL_FACE):H0(J.CULL_FACE);let i=S.side===w8;if(Z0)i=!i;p8(i),S.blending===p6&&S.transparent===!1?x0(W9):x0(S.blending,S.blendEquation,S.blendSrc,S.blendDst,S.blendEquationAlpha,S.blendSrcAlpha,S.blendDstAlpha,S.blendColor,S.blendAlpha,S.premultipliedAlpha),H.setFunc(S.depthFunc),H.setTest(S.depthTest),H.setMask(S.depthWrite),K.setMask(S.colorWrite);let Y0=S.stencilWrite;if(Y.setTest(Y0),Y0)Y.setMask(S.stencilWriteMask),Y.setFunc(S.stencilFunc,S.stencilRef,S.stencilFuncMask),Y.setOp(S.stencilFail,S.stencilZFail,S.stencilZPass);O8(S.polygonOffset,S.polygonOffsetFactor,S.polygonOffsetUnits),S.alphaToCoverage===!0?H0(J.SAMPLE_ALPHA_TO_COVERAGE):L0(J.SAMPLE_ALPHA_TO_COVERAGE)}function p8(S){if(P!==S){if(S)J.frontFace(J.CW);else J.frontFace(J.CCW);P=S}}function $8(S){if(S!==fW){if(H0(J.CULL_FACE),S!==y)if(S===sJ)J.cullFace(J.BACK);else if(S===yW)J.cullFace(J.FRONT);else J.cullFace(J.FRONT_AND_BACK)}else L0(J.CULL_FACE);y=S}function k8(S){if(S!==c){if(f)J.lineWidth(S);c=S}}function O8(S,Z0,i){if(S){if(H0(J.POLYGON_OFFSET_FILL),b!==Z0||u!==i){if(b=Z0,u=i,H.getReversed())Z0=-Z0;J.polygonOffset(Z0,i)}}else L0(J.POLYGON_OFFSET_FILL)}function E8(S){if(S)H0(J.SCISSOR_TEST);else L0(J.SCISSOR_TEST)}function j(S){if(S===void 0)S=J.TEXTURE0+m-1;if(J0!==S)J.activeTexture(S),J0=S}function m8(S,Z0,i){if(i===void 0)if(J0===null)i=J.TEXTURE0+m-1;else i=J0;let Y0=k0[i];if(Y0===void 0)Y0={type:void 0,texture:void 0},k0[i]=Y0;if(Y0.type!==S||Y0.texture!==Z0){if(J0!==i)J.activeTexture(i),J0=i;J.bindTexture(S,Z0||K0[S]),Y0.type=S,Y0.texture=Z0}}function s0(){let S=k0[J0];if(S!==void 0&&S.type!==void 0)J.bindTexture(S.type,null),S.type=void 0,S.texture=void 0}function W8(){try{J.compressedTexImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function B(){try{J.compressedTexImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function M(){try{J.texSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function T(){try{J.texSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function d(){try{J.compressedTexSubImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function t(){try{J.compressedTexSubImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function Q0(){try{J.texStorage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function U0(){try{J.texStorage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function n(){try{J.texImage2D(...arguments)}catch(S){P0("WebGLState:",S)}}function o(){try{J.texImage3D(...arguments)}catch(S){P0("WebGLState:",S)}}function F0(S){if(N[S]!==void 0)return N[S];else return J.getParameter(S)}function B0(S,Z0){if(N[S]!==Z0)J.pixelStorei(S,Z0),N[S]=Z0}function G0(S){if(u0.equals(S)===!1)J.scissor(S.x,S.y,S.z,S.w),u0.copy(S)}function $0(S){if(s.equals(S)===!1)J.viewport(S.x,S.y,S.z,S.w),s.copy(S)}function _0(S,Z0){let i=U.get(Z0);if(i===void 0)i=new WeakMap,U.set(Z0,i);let Y0=i.get(S);if(Y0===void 0)Y0=J.getUniformBlockIndex(Z0,S.name),i.set(S,Y0)}function A0(S,Z0){let Y0=U.get(Z0).get(S);if(X.get(Z0)!==Y0)J.uniformBlockBinding(Z0,Y0,S.__bindingPointIndex),X.set(Z0,Y0)}function c0(){J.disable(J.BLEND),J.disable(J.CULL_FACE),J.disable(J.DEPTH_TEST),J.disable(J.POLYGON_OFFSET_FILL),J.disable(J.SCISSOR_TEST),J.disable(J.STENCIL_TEST),J.disable(J.SAMPLE_ALPHA_TO_COVERAGE),J.blendEquation(J.FUNC_ADD),J.blendFunc(J.ONE,J.ZERO),J.blendFuncSeparate(J.ONE,J.ZERO,J.ONE,J.ZERO),J.blendColor(0,0,0,0),J.colorMask(!0,!0,!0,!0),J.clearColor(0,0,0,0),J.depthMask(!0),J.depthFunc(J.LESS),H.setReversed(!1),J.clearDepth(1),J.stencilMask(4294967295),J.stencilFunc(J.ALWAYS,0,4294967295),J.stencilOp(J.KEEP,J.KEEP,J.KEEP),J.clearStencil(0),J.cullFace(J.BACK),J.frontFace(J.CCW),J.polygonOffset(0,0),J.activeTexture(J.TEXTURE0),J.bindFramebuffer(J.FRAMEBUFFER,null),J.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),J.bindFramebuffer(J.READ_FRAMEBUFFER,null),J.useProgram(null),J.lineWidth(1),J.scissor(0,0,J.canvas.width,J.canvas.height),J.viewport(0,0,J.canvas.width,J.canvas.height),J.pixelStorei(J.PACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_ALIGNMENT,4),J.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,!1),J.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),J.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,J.BROWSER_DEFAULT_WEBGL),J.pixelStorei(J.PACK_ROW_LENGTH,0),J.pixelStorei(J.PACK_SKIP_PIXELS,0),J.pixelStorei(J.PACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_ROW_LENGTH,0),J.pixelStorei(J.UNPACK_IMAGE_HEIGHT,0),J.pixelStorei(J.UNPACK_SKIP_PIXELS,0),J.pixelStorei(J.UNPACK_SKIP_ROWS,0),J.pixelStorei(J.UNPACK_SKIP_IMAGES,0),E={},N={},J0=null,k0={},G={},F=new WeakMap,O=[],V=null,D=!1,q=null,_=null,A=null,k=null,I=null,C=null,w=null,R=new p0(0,0,0),z=0,p=!1,P=null,y=null,c=null,b=null,u=null,u0.set(0,0,J.canvas.width,J.canvas.height),s.set(0,0,J.canvas.width,J.canvas.height),K.reset(),H.reset(),Y.reset()}return{buffers:{color:K,depth:H,stencil:Y},enable:H0,disable:L0,bindFramebuffer:j0,drawBuffers:f0,useProgram:y0,setBlending:x0,setMaterial:D8,setFlipSided:p8,setCullFace:$8,setLineWidth:k8,setPolygonOffset:O8,setScissorTest:E8,activeTexture:j,bindTexture:m8,unbindTexture:s0,compressedTexImage2D:W8,compressedTexImage3D:B,texImage2D:n,texImage3D:o,pixelStorei:B0,getParameter:F0,updateUBOMapping:_0,uniformBlockBinding:A0,texStorage2D:Q0,texStorage3D:U0,texSubImage2D:M,texSubImage3D:T,compressedTexSubImage2D:d,compressedTexSubImage3D:t,scissor:G0,viewport:$0,reset:c0}}function E1(J,Q,$,W,Z,K,H){let Y=Q.has("WEBGL_multisampled_render_to_texture")?Q.get("WEBGL_multisampled_render_to_texture"):null,X=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),U=new n0,E=new WeakMap,N=new Set,G,F=new WeakMap,O=!1;try{O=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch(B){}function V(B,M){return O?new OffscreenCanvas(B,M):x6("canvas")}function D(B,M,T){let d=1,t=W8(B);if(t.width>T||t.height>T)d=T/Math.max(t.width,t.height);if(d<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){let Q0=Math.floor(d*t.width),U0=Math.floor(d*t.height);if(G===void 0)G=V(Q0,U0);let n=M?V(Q0,U0):G;return n.width=Q0,n.height=U0,n.getContext("2d").drawImage(B,0,0,Q0,U0),C0("WebGLRenderer: Texture has been resized from ("+t.width+"x"+t.height+") to ("+Q0+"x"+U0+")."),n}else{if("data"in B)C0("WebGLRenderer: Image in DataTexture is too big ("+t.width+"x"+t.height+").");return B}return B}function q(B){return B.generateMipmaps}function _(B){J.generateMipmap(B)}function A(B){if(B.isWebGLCubeRenderTarget)return J.TEXTURE_CUBE_MAP;if(B.isWebGL3DRenderTarget)return J.TEXTURE_3D;if(B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture)return J.TEXTURE_2D_ARRAY;return J.TEXTURE_2D}function k(B,M,T,d,t,Q0=!1){if(B!==null){if(J[B]!==void 0)return J[B];C0("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let U0;if(d){if(U0=Q.get("EXT_texture_norm16"),!U0)C0("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension")}let n=M;if(M===J.RED){if(T===J.FLOAT)n=J.R32F;if(T===J.HALF_FLOAT)n=J.R16F;if(T===J.UNSIGNED_BYTE)n=J.R8;if(T===J.UNSIGNED_SHORT&&U0)n=U0.R16_EXT;if(T===J.SHORT&&U0)n=U0.R16_SNORM_EXT}if(M===J.RED_INTEGER){if(T===J.UNSIGNED_BYTE)n=J.R8UI;if(T===J.UNSIGNED_SHORT)n=J.R16UI;if(T===J.UNSIGNED_INT)n=J.R32UI;if(T===J.BYTE)n=J.R8I;if(T===J.SHORT)n=J.R16I;if(T===J.INT)n=J.R32I}if(M===J.RG){if(T===J.FLOAT)n=J.RG32F;if(T===J.HALF_FLOAT)n=J.RG16F;if(T===J.UNSIGNED_BYTE)n=J.RG8;if(T===J.UNSIGNED_SHORT&&U0)n=U0.RG16_EXT;if(T===J.SHORT&&U0)n=U0.RG16_SNORM_EXT}if(M===J.RG_INTEGER){if(T===J.UNSIGNED_BYTE)n=J.RG8UI;if(T===J.UNSIGNED_SHORT)n=J.RG16UI;if(T===J.UNSIGNED_INT)n=J.RG32UI;if(T===J.BYTE)n=J.RG8I;if(T===J.SHORT)n=J.RG16I;if(T===J.INT)n=J.RG32I}if(M===J.RGB_INTEGER){if(T===J.UNSIGNED_BYTE)n=J.RGB8UI;if(T===J.UNSIGNED_SHORT)n=J.RGB16UI;if(T===J.UNSIGNED_INT)n=J.RGB32UI;if(T===J.BYTE)n=J.RGB8I;if(T===J.SHORT)n=J.RGB16I;if(T===J.INT)n=J.RGB32I}if(M===J.RGBA_INTEGER){if(T===J.UNSIGNED_BYTE)n=J.RGBA8UI;if(T===J.UNSIGNED_SHORT)n=J.RGBA16UI;if(T===J.UNSIGNED_INT)n=J.RGBA32UI;if(T===J.BYTE)n=J.RGBA8I;if(T===J.SHORT)n=J.RGBA16I;if(T===J.INT)n=J.RGBA32I}if(M===J.RGB){if(T===J.UNSIGNED_SHORT&&U0)n=U0.RGB16_EXT;if(T===J.SHORT&&U0)n=U0.RGB16_SNORM_EXT;if(T===J.UNSIGNED_INT_5_9_9_9_REV)n=J.RGB9_E5;if(T===J.UNSIGNED_INT_10F_11F_11F_REV)n=J.R11F_G11F_B10F}if(M===J.RGBA){let o=Q0?dQ:g0.getTransfer(t);if(T===J.FLOAT)n=J.RGBA32F;if(T===J.HALF_FLOAT)n=J.RGBA16F;if(T===J.UNSIGNED_BYTE)n=o===e0?J.SRGB8_ALPHA8:J.RGBA8;if(T===J.UNSIGNED_SHORT&&U0)n=U0.RGBA16_EXT;if(T===J.SHORT&&U0)n=U0.RGBA16_SNORM_EXT;if(T===J.UNSIGNED_SHORT_4_4_4_4)n=J.RGBA4;if(T===J.UNSIGNED_SHORT_5_5_5_1)n=J.RGB5_A1}if(n===J.R16F||n===J.R32F||n===J.RG16F||n===J.RG32F||n===J.RGBA16F||n===J.RGBA32F)Q.get("EXT_color_buffer_float");return n}function I(B,M){let T;if(B){if(M===null||M===S9||M===_6)T=J.DEPTH24_STENCIL8;else if(M===D9)T=J.DEPTH32F_STENCIL8;else if(M===d6)T=J.DEPTH24_STENCIL8,C0("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")}else if(M===null||M===S9||M===_6)T=J.DEPTH_COMPONENT24;else if(M===D9)T=J.DEPTH_COMPONENT32F;else if(M===d6)T=J.DEPTH_COMPONENT16;return T}function C(B,M){if(q(B)===!0||B.isFramebufferTexture&&B.minFilter!==T9&&B.minFilter!==_8)return Math.log2(Math.max(M.width,M.height))+1;else if(B.mipmaps!==void 0&&B.mipmaps.length>0)return B.mipmaps.length;else if(B.isCompressedTexture&&Array.isArray(B.image))return M.mipmaps.length;else return 1}function w(B){let M=B.target;if(M.removeEventListener("dispose",w),z(M),M.isVideoTexture)E.delete(M);if(M.isHTMLTexture)N.delete(M)}function R(B){let M=B.target;M.removeEventListener("dispose",R),P(M)}function z(B){let M=W.get(B);if(M.__webglInit===void 0)return;let T=B.source,d=F.get(T);if(d){let t=d[M.__cacheKey];if(t.usedTimes--,t.usedTimes===0)p(B);if(Object.keys(d).length===0)F.delete(T)}W.remove(B)}function p(B){let M=W.get(B);J.deleteTexture(M.__webglTexture);let T=B.source,d=F.get(T);delete d[M.__cacheKey],H.memory.textures--}function P(B){let M=W.get(B);if(B.depthTexture)B.depthTexture.dispose(),W.remove(B.depthTexture);if(B.isWebGLCubeRenderTarget)for(let d=0;d<6;d++){if(Array.isArray(M.__webglFramebuffer[d]))for(let t=0;t<M.__webglFramebuffer[d].length;t++)J.deleteFramebuffer(M.__webglFramebuffer[d][t]);else J.deleteFramebuffer(M.__webglFramebuffer[d]);if(M.__webglDepthbuffer)J.deleteRenderbuffer(M.__webglDepthbuffer[d])}else{if(Array.isArray(M.__webglFramebuffer))for(let d=0;d<M.__webglFramebuffer.length;d++)J.deleteFramebuffer(M.__webglFramebuffer[d]);else J.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer)J.deleteRenderbuffer(M.__webglDepthbuffer);if(M.__webglMultisampledFramebuffer)J.deleteFramebuffer(M.__webglMultisampledFramebuffer);if(M.__webglColorRenderbuffer){for(let d=0;d<M.__webglColorRenderbuffer.length;d++)if(M.__webglColorRenderbuffer[d])J.deleteRenderbuffer(M.__webglColorRenderbuffer[d])}if(M.__webglDepthRenderbuffer)J.deleteRenderbuffer(M.__webglDepthRenderbuffer)}let T=B.textures;for(let d=0,t=T.length;d<t;d++){let Q0=W.get(T[d]);if(Q0.__webglTexture)J.deleteTexture(Q0.__webglTexture),H.memory.textures--;W.remove(T[d])}W.remove(B)}let y=0;function c(){y=0}function b(){return y}function u(B){y=B}function m(){let B=y;if(B>=Z.maxTextures)C0("WebGLTextures: Trying to use "+B+" texture units while this GPU supports only "+Z.maxTextures);return y+=1,B}function f(B){let M=[];return M.push(B.wrapS),M.push(B.wrapT),M.push(B.wrapR||0),M.push(B.magFilter),M.push(B.minFilter),M.push(B.anisotropy),M.push(B.internalFormat),M.push(B.format),M.push(B.type),M.push(B.generateMipmaps),M.push(B.premultiplyAlpha),M.push(B.flipY),M.push(B.unpackAlignment),M.push(B.colorSpace),M.join()}function a(B,M){let T=W.get(B);if(B.isVideoTexture)m8(B);if(B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&T.__version!==B.version){let d=B.image;if(d===null)C0("WebGLRenderer: Texture marked for update but no image data found.");else if(d.complete===!1)C0("WebGLRenderer: Texture marked for update but image is incomplete");else{L0(T,B,M);return}}else if(B.isExternalTexture)T.__webglTexture=B.sourceTexture?B.sourceTexture:null;$.bindTexture(J.TEXTURE_2D,T.__webglTexture,J.TEXTURE0+M)}function e(B,M){let T=W.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&T.__version!==B.version){L0(T,B,M);return}else if(B.isExternalTexture)T.__webglTexture=B.sourceTexture?B.sourceTexture:null;$.bindTexture(J.TEXTURE_2D_ARRAY,T.__webglTexture,J.TEXTURE0+M)}function J0(B,M){let T=W.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&T.__version!==B.version){L0(T,B,M);return}$.bindTexture(J.TEXTURE_3D,T.__webglTexture,J.TEXTURE0+M)}function k0(B,M){let T=W.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&T.__version!==B.version){j0(T,B,M);return}$.bindTexture(J.TEXTURE_CUBE_MAP,T.__webglTexture,J.TEXTURE0+M)}let D0={[j7]:J.REPEAT,[v7]:J.CLAMP_TO_EDGE,[qZ]:J.MIRRORED_REPEAT},l0={[T9]:J.NEAREST,[FZ]:J.NEAREST_MIPMAP_NEAREST,[l6]:J.NEAREST_MIPMAP_LINEAR,[_8]:J.LINEAR,[f7]:J.LINEAR_MIPMAP_NEAREST,[d9]:J.LINEAR_MIPMAP_LINEAR},u0={[BZ]:J.NEVER,[AZ]:J.ALWAYS,[zZ]:J.LESS,[d7]:J.LEQUAL,[IZ]:J.EQUAL,[u7]:J.GEQUAL,[_Z]:J.GREATER,[CZ]:J.NOTEQUAL};function s(B,M){if(M.type===D9&&Q.has("OES_texture_float_linear")===!1&&(M.magFilter===_8||M.magFilter===f7||M.magFilter===l6||M.magFilter===d9||M.minFilter===_8||M.minFilter===f7||M.minFilter===l6||M.minFilter===d9))C0("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.");if(J.texParameteri(B,J.TEXTURE_WRAP_S,D0[M.wrapS]),J.texParameteri(B,J.TEXTURE_WRAP_T,D0[M.wrapT]),B===J.TEXTURE_3D||B===J.TEXTURE_2D_ARRAY)J.texParameteri(B,J.TEXTURE_WRAP_R,D0[M.wrapR]);if(J.texParameteri(B,J.TEXTURE_MAG_FILTER,l0[M.magFilter]),J.texParameteri(B,J.TEXTURE_MIN_FILTER,l0[M.minFilter]),M.compareFunction)J.texParameteri(B,J.TEXTURE_COMPARE_MODE,J.COMPARE_REF_TO_TEXTURE),J.texParameteri(B,J.TEXTURE_COMPARE_FUNC,u0[M.compareFunction]);if(Q.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===T9)return;if(M.minFilter!==l6&&M.minFilter!==d9)return;if(M.type===D9&&Q.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||W.get(M).__currentAnisotropy){let T=Q.get("EXT_texture_filter_anisotropic");J.texParameterf(B,T.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,Z.getMaxAnisotropy())),W.get(M).__currentAnisotropy=M.anisotropy}}}function W0(B,M){let T=!1;if(B.__webglInit===void 0)B.__webglInit=!0,M.addEventListener("dispose",w);let d=M.source,t=F.get(d);if(t===void 0)t={},F.set(d,t);let Q0=f(M);if(Q0!==B.__cacheKey){if(t[Q0]===void 0)t[Q0]={texture:J.createTexture(),usedTimes:0},H.memory.textures++,T=!0;t[Q0].usedTimes++;let U0=t[B.__cacheKey];if(U0!==void 0){if(t[B.__cacheKey].usedTimes--,U0.usedTimes===0)p(M)}B.__cacheKey=Q0,B.__webglTexture=t[Q0].texture}return T}function K0(B,M,T){return Math.floor(Math.floor(B/T)/M)}function H0(B,M,T,d){let Q0=B.updateRanges;if(Q0.length===0)$.texSubImage2D(J.TEXTURE_2D,0,0,0,M.width,M.height,T,d,M.data);else{Q0.sort((B0,G0)=>B0.start-G0.start);let U0=0;for(let B0=1;B0<Q0.length;B0++){let G0=Q0[U0],$0=Q0[B0],_0=G0.start+G0.count,A0=K0($0.start,M.width,4),c0=K0(G0.start,M.width,4);if($0.start<=_0+1&&A0===c0&&K0($0.start+$0.count-1,M.width,4)===A0)G0.count=Math.max(G0.count,$0.start+$0.count-G0.start);else++U0,Q0[U0]=$0}Q0.length=U0+1;let n=$.getParameter(J.UNPACK_ROW_LENGTH),o=$.getParameter(J.UNPACK_SKIP_PIXELS),F0=$.getParameter(J.UNPACK_SKIP_ROWS);$.pixelStorei(J.UNPACK_ROW_LENGTH,M.width);for(let B0=0,G0=Q0.length;B0<G0;B0++){let $0=Q0[B0],_0=Math.floor($0.start/4),A0=Math.ceil($0.count/4),c0=_0%M.width,S=Math.floor(_0/M.width),Z0=A0,i=1;$.pixelStorei(J.UNPACK_SKIP_PIXELS,c0),$.pixelStorei(J.UNPACK_SKIP_ROWS,S),$.texSubImage2D(J.TEXTURE_2D,0,c0,S,Z0,1,T,d,M.data)}B.clearUpdateRanges(),$.pixelStorei(J.UNPACK_ROW_LENGTH,n),$.pixelStorei(J.UNPACK_SKIP_PIXELS,o),$.pixelStorei(J.UNPACK_SKIP_ROWS,F0)}}function L0(B,M,T){let d=J.TEXTURE_2D;if(M.isDataArrayTexture||M.isCompressedArrayTexture)d=J.TEXTURE_2D_ARRAY;if(M.isData3DTexture)d=J.TEXTURE_3D;let t=W0(B,M),Q0=M.source;$.bindTexture(d,B.__webglTexture,J.TEXTURE0+T);let U0=W.get(Q0);if(Q0.version!==U0.__version||t===!0){if($.activeTexture(J.TEXTURE0+T),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){let i=g0.getPrimaries(g0.workingColorSpace),Y0=M.colorSpace===s9?null:g0.getPrimaries(M.colorSpace),O0=M.colorSpace===s9||i===Y0?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,O0)}$.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment);let o=D(M.image,!1,Z.maxTextureSize);o=s0(M,o);let F0=K.convert(M.format,M.colorSpace),B0=K.convert(M.type),G0=k(M.internalFormat,F0,B0,M.normalized,M.colorSpace,M.isVideoTexture);s(d,M);let $0,_0=M.mipmaps,A0=M.isVideoTexture!==!0,c0=U0.__version===void 0||t===!0,S=Q0.dataReady,Z0=C(M,o);if(M.isDepthTexture){if(G0=I(M.format===c9,M.type),c0)if(A0)$.texStorage2D(J.TEXTURE_2D,1,G0,o.width,o.height);else $.texImage2D(J.TEXTURE_2D,0,G0,o.width,o.height,0,F0,B0,null)}else if(M.isDataTexture)if(_0.length>0){if(A0&&c0)$.texStorage2D(J.TEXTURE_2D,Z0,G0,_0[0].width,_0[0].height);for(let i=0,Y0=_0.length;i<Y0;i++)if($0=_0[i],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,i,0,0,$0.width,$0.height,F0,B0,$0.data)}else $.texImage2D(J.TEXTURE_2D,i,G0,$0.width,$0.height,0,F0,B0,$0.data);M.generateMipmaps=!1}else if(A0){if(c0)$.texStorage2D(J.TEXTURE_2D,Z0,G0,o.width,o.height);if(S)H0(M,o,F0,B0)}else $.texImage2D(J.TEXTURE_2D,0,G0,o.width,o.height,0,F0,B0,o.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){if(A0&&c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,G0,_0[0].width,_0[0].height,o.depth);for(let i=0,Y0=_0.length;i<Y0;i++)if($0=_0[i],M.format!==Z9)if(F0!==null)if(A0){if(S)if(M.layerUpdates.size>0){let O0=L$($0.width,$0.height,M.format,M.type);for(let r of M.layerUpdates){let X0=$0.data.subarray(r*O0/$0.data.BYTES_PER_ELEMENT,(r+1)*O0/$0.data.BYTES_PER_ELEMENT);$.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,i,0,0,r,$0.width,$0.height,1,F0,X0)}M.clearLayerUpdates()}else $.compressedTexSubImage3D(J.TEXTURE_2D_ARRAY,i,0,0,0,$0.width,$0.height,o.depth,F0,$0.data)}else $.compressedTexImage3D(J.TEXTURE_2D_ARRAY,i,G0,$0.width,$0.height,o.depth,0,$0.data,0,0);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage3D(J.TEXTURE_2D_ARRAY,i,0,0,0,$0.width,$0.height,o.depth,F0,B0,$0.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,i,G0,$0.width,$0.height,o.depth,0,F0,B0,$0.data)}else{if(A0&&c0)$.texStorage2D(J.TEXTURE_2D,Z0,G0,_0[0].width,_0[0].height);for(let i=0,Y0=_0.length;i<Y0;i++)if($0=_0[i],M.format!==Z9)if(F0!==null)if(A0){if(S)$.compressedTexSubImage2D(J.TEXTURE_2D,i,0,0,$0.width,$0.height,F0,$0.data)}else $.compressedTexImage2D(J.TEXTURE_2D,i,G0,$0.width,$0.height,0,$0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else if(A0){if(S)$.texSubImage2D(J.TEXTURE_2D,i,0,0,$0.width,$0.height,F0,B0,$0.data)}else $.texImage2D(J.TEXTURE_2D,i,G0,$0.width,$0.height,0,F0,B0,$0.data)}else if(M.isDataArrayTexture)if(A0){if(c0)$.texStorage3D(J.TEXTURE_2D_ARRAY,Z0,G0,o.width,o.height,o.depth);if(S)if(M.layerUpdates.size>0){let i=L$(o.width,o.height,M.format,M.type);for(let Y0 of M.layerUpdates){let O0=o.data.subarray(Y0*i/o.data.BYTES_PER_ELEMENT,(Y0+1)*i/o.data.BYTES_PER_ELEMENT);$.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,Y0,o.width,o.height,1,F0,B0,O0)}M.clearLayerUpdates()}else $.texSubImage3D(J.TEXTURE_2D_ARRAY,0,0,0,0,o.width,o.height,o.depth,F0,B0,o.data)}else $.texImage3D(J.TEXTURE_2D_ARRAY,0,G0,o.width,o.height,o.depth,0,F0,B0,o.data);else if(M.isData3DTexture)if(A0){if(c0)$.texStorage3D(J.TEXTURE_3D,Z0,G0,o.width,o.height,o.depth);if(S)$.texSubImage3D(J.TEXTURE_3D,0,0,0,0,o.width,o.height,o.depth,F0,B0,o.data)}else $.texImage3D(J.TEXTURE_3D,0,G0,o.width,o.height,o.depth,0,F0,B0,o.data);else if(M.isFramebufferTexture){if(c0)if(A0)$.texStorage2D(J.TEXTURE_2D,Z0,G0,o.width,o.height);else{let{width:i,height:Y0}=o;for(let O0=0;O0<Z0;O0++)$.texImage2D(J.TEXTURE_2D,O0,G0,i,Y0,0,F0,B0,null),i>>=1,Y0>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in J){let i=J.canvas;if(!i.hasAttribute("layoutsubtree"))i.setAttribute("layoutsubtree","true");if(o.parentNode!==i){i.appendChild(o),N.add(M),i.onpaint=(Y0)=>{let O0=Y0.changedElements;for(let r of N)if(O0.includes(r.image))r.needsUpdate=!0},i.requestPaint();return}if(J.texElementImage2D.length===3)J.texElementImage2D(J.TEXTURE_2D,J.RGBA8,o);else{let{RGBA:O0,RGBA:r,UNSIGNED_BYTE:X0}=J;J.texElementImage2D(J.TEXTURE_2D,0,O0,r,X0,o)}J.texParameteri(J.TEXTURE_2D,J.TEXTURE_MIN_FILTER,J.LINEAR),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_S,J.CLAMP_TO_EDGE),J.texParameteri(J.TEXTURE_2D,J.TEXTURE_WRAP_T,J.CLAMP_TO_EDGE)}}else if(_0.length>0){if(A0&&c0){let i=W8(_0[0]);$.texStorage2D(J.TEXTURE_2D,Z0,G0,i.width,i.height)}for(let i=0,Y0=_0.length;i<Y0;i++)if($0=_0[i],A0){if(S)$.texSubImage2D(J.TEXTURE_2D,i,0,0,F0,B0,$0)}else $.texImage2D(J.TEXTURE_2D,i,G0,F0,B0,$0);M.generateMipmaps=!1}else if(A0){if(c0){let i=W8(o);$.texStorage2D(J.TEXTURE_2D,Z0,G0,i.width,i.height)}if(S)$.texSubImage2D(J.TEXTURE_2D,0,0,0,F0,B0,o)}else $.texImage2D(J.TEXTURE_2D,0,G0,F0,B0,o);if(q(M))_(d);if(U0.__version=Q0.version,M.onUpdate)M.onUpdate(M)}B.__version=M.version}function j0(B,M,T){if(M.image.length!==6)return;let d=W0(B,M),t=M.source;$.bindTexture(J.TEXTURE_CUBE_MAP,B.__webglTexture,J.TEXTURE0+T);let Q0=W.get(t);if(t.version!==Q0.__version||d===!0){$.activeTexture(J.TEXTURE0+T);let U0=g0.getPrimaries(g0.workingColorSpace),n=M.colorSpace===s9?null:g0.getPrimaries(M.colorSpace),o=M.colorSpace===s9||U0===n?J.NONE:J.BROWSER_DEFAULT_WEBGL;$.pixelStorei(J.UNPACK_FLIP_Y_WEBGL,M.flipY),$.pixelStorei(J.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),$.pixelStorei(J.UNPACK_ALIGNMENT,M.unpackAlignment),$.pixelStorei(J.UNPACK_COLORSPACE_CONVERSION_WEBGL,o);let F0=M.isCompressedTexture||M.image[0].isCompressedTexture,B0=M.image[0]&&M.image[0].isDataTexture,G0=[];for(let r=0;r<6;r++){if(!F0&&!B0)G0[r]=D(M.image[r],!0,Z.maxCubemapSize);else G0[r]=B0?M.image[r].image:M.image[r];G0[r]=s0(M,G0[r])}let $0=G0[0],_0=K.convert(M.format,M.colorSpace),A0=K.convert(M.type),c0=k(M.internalFormat,_0,A0,M.normalized,M.colorSpace),S=M.isVideoTexture!==!0,Z0=Q0.__version===void 0||d===!0,i=t.dataReady,Y0=C(M,$0);s(J.TEXTURE_CUBE_MAP,M);let O0;if(F0){if(S&&Z0)$.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,$0.width,$0.height);for(let r=0;r<6;r++){O0=G0[r].mipmaps;for(let X0=0;X0<O0.length;X0++){let T0=O0[X0];if(M.format!==Z9)if(_0!==null)if(S){if(i)$.compressedTexSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,0,0,T0.width,T0.height,_0,T0.data)}else $.compressedTexImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,c0,T0.width,T0.height,0,T0.data);else C0("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");else if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,0,0,T0.width,T0.height,_0,A0,T0.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0,c0,T0.width,T0.height,0,_0,A0,T0.data)}}}else{if(O0=M.mipmaps,S&&Z0){if(O0.length>0)Y0++;let r=W8(G0[0]);$.texStorage2D(J.TEXTURE_CUBE_MAP,Y0,c0,r.width,r.height)}for(let r=0;r<6;r++)if(B0){if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,G0[r].width,G0[r].height,_0,A0,G0[r].data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,G0[r].width,G0[r].height,0,_0,A0,G0[r].data);for(let X0=0;X0<O0.length;X0++){let H8=O0[X0].image[r].image;if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,0,0,H8.width,H8.height,_0,A0,H8.data)}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,c0,H8.width,H8.height,0,_0,A0,H8.data)}}else{if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,0,0,_0,A0,G0[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,c0,_0,A0,G0[r]);for(let X0=0;X0<O0.length;X0++){let T0=O0[X0];if(S){if(i)$.texSubImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,0,0,_0,A0,T0.image[r])}else $.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+r,X0+1,c0,_0,A0,T0.image[r])}}}if(q(M))_(J.TEXTURE_CUBE_MAP);if(Q0.__version=t.version,M.onUpdate)M.onUpdate(M)}B.__version=M.version}function f0(B,M,T,d,t,Q0){let U0=K.convert(T.format,T.colorSpace),n=K.convert(T.type),o=k(T.internalFormat,U0,n,T.normalized,T.colorSpace),F0=W.get(M),B0=W.get(T);if(B0.__renderTarget=M,!F0.__hasExternalTextures){let G0=Math.max(1,M.width>>Q0),$0=Math.max(1,M.height>>Q0);if(t===J.TEXTURE_3D||t===J.TEXTURE_2D_ARRAY)$.texImage3D(t,Q0,o,G0,$0,M.depth,0,U0,n,null);else $.texImage2D(t,Q0,o,G0,$0,0,U0,n,null)}if($.bindFramebuffer(J.FRAMEBUFFER,B),j(M))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,d,t,B0.__webglTexture,0,E8(M));else if(t===J.TEXTURE_2D||t>=J.TEXTURE_CUBE_MAP_POSITIVE_X&&t<=J.TEXTURE_CUBE_MAP_NEGATIVE_Z)J.framebufferTexture2D(J.FRAMEBUFFER,d,t,B0.__webglTexture,Q0);$.bindFramebuffer(J.FRAMEBUFFER,null)}function y0(B,M,T){if(J.bindRenderbuffer(J.RENDERBUFFER,B),M.depthBuffer){let d=M.depthTexture,t=d&&d.isDepthTexture?d.type:null,Q0=I(M.stencilBuffer,t),U0=M.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(j(M))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(M),Q0,M.width,M.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(M),Q0,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,Q0,M.width,M.height);J.framebufferRenderbuffer(J.FRAMEBUFFER,U0,J.RENDERBUFFER,B)}else{let d=M.textures;for(let t=0;t<d.length;t++){let Q0=d[t],U0=K.convert(Q0.format,Q0.colorSpace),n=K.convert(Q0.type),o=k(Q0.internalFormat,U0,n,Q0.normalized,Q0.colorSpace);if(j(M))Y.renderbufferStorageMultisampleEXT(J.RENDERBUFFER,E8(M),o,M.width,M.height);else if(T)J.renderbufferStorageMultisample(J.RENDERBUFFER,E8(M),o,M.width,M.height);else J.renderbufferStorage(J.RENDERBUFFER,o,M.width,M.height)}}J.bindRenderbuffer(J.RENDERBUFFER,null)}function o0(B,M,T){let d=M.isWebGLCubeRenderTarget===!0;if($.bindFramebuffer(J.FRAMEBUFFER,B),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let t=W.get(M.depthTexture);if(t.__renderTarget=M,!t.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0;if(d){if(t.__webglInit===void 0)t.__webglInit=!0,M.depthTexture.addEventListener("dispose",w);if(t.__webglTexture===void 0){t.__webglTexture=J.createTexture(),$.bindTexture(J.TEXTURE_CUBE_MAP,t.__webglTexture),s(J.TEXTURE_CUBE_MAP,M.depthTexture);let F0=K.convert(M.depthTexture.format),B0=K.convert(M.depthTexture.type),G0;if(M.depthTexture.format===u9)G0=J.DEPTH_COMPONENT24;else if(M.depthTexture.format===c9)G0=J.DEPTH24_STENCIL8;for(let $0=0;$0<6;$0++)J.texImage2D(J.TEXTURE_CUBE_MAP_POSITIVE_X+$0,0,G0,M.width,M.height,0,F0,B0,null)}}else a(M.depthTexture,0);let Q0=t.__webglTexture,U0=E8(M),n=d?J.TEXTURE_CUBE_MAP_POSITIVE_X+T:J.TEXTURE_2D,o=M.depthTexture.format===c9?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;if(M.depthTexture.format===u9)if(j(M))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,n,Q0,0,U0);else J.framebufferTexture2D(J.FRAMEBUFFER,o,n,Q0,0);else if(M.depthTexture.format===c9)if(j(M))Y.framebufferTexture2DMultisampleEXT(J.FRAMEBUFFER,o,n,Q0,0,U0);else J.framebufferTexture2D(J.FRAMEBUFFER,o,n,Q0,0);else throw Error("THREE.WebGLTextures: Unknown depthTexture format.")}function h0(B){let M=W.get(B),T=B.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==B.depthTexture){let d=B.depthTexture;if(M.__depthDisposeCallback)M.__depthDisposeCallback();if(d){let t=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,d.removeEventListener("dispose",t)};d.addEventListener("dispose",t),M.__depthDisposeCallback=t}M.__boundDepthTexture=d}if(B.depthTexture&&!M.__autoAllocateDepthBuffer)if(T)for(let d=0;d<6;d++)o0(M.__webglFramebuffer[d],B,d);else{let d=B.texture.mipmaps;if(d&&d.length>0)o0(M.__webglFramebuffer[0],B,0);else o0(M.__webglFramebuffer,B,0)}else if(T){M.__webglDepthbuffer=[];for(let d=0;d<6;d++)if($.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer[d]),M.__webglDepthbuffer[d]===void 0)M.__webglDepthbuffer[d]=J.createRenderbuffer(),y0(M.__webglDepthbuffer[d],B,!1);else{let t=B.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,Q0=M.__webglDepthbuffer[d];J.bindRenderbuffer(J.RENDERBUFFER,Q0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,Q0)}}else{let d=B.texture.mipmaps;if(d&&d.length>0)$.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer[0]);else $.bindFramebuffer(J.FRAMEBUFFER,M.__webglFramebuffer);if(M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=J.createRenderbuffer(),y0(M.__webglDepthbuffer,B,!1);else{let t=B.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,Q0=M.__webglDepthbuffer;J.bindRenderbuffer(J.RENDERBUFFER,Q0),J.framebufferRenderbuffer(J.FRAMEBUFFER,t,J.RENDERBUFFER,Q0)}}$.bindFramebuffer(J.FRAMEBUFFER,null)}function x0(B,M,T){let d=W.get(B);if(M!==void 0)f0(d.__webglFramebuffer,B,B.texture,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,0);if(T!==void 0)h0(B)}function D8(B){let M=B.texture,T=W.get(B),d=W.get(M);B.addEventListener("dispose",R);let t=B.textures,Q0=B.isWebGLCubeRenderTarget===!0,U0=t.length>1;if(!U0){if(d.__webglTexture===void 0)d.__webglTexture=J.createTexture();d.__version=M.version,H.memory.textures++}if(Q0){T.__webglFramebuffer=[];for(let n=0;n<6;n++)if(M.mipmaps&&M.mipmaps.length>0){T.__webglFramebuffer[n]=[];for(let o=0;o<M.mipmaps.length;o++)T.__webglFramebuffer[n][o]=J.createFramebuffer()}else T.__webglFramebuffer[n]=J.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){T.__webglFramebuffer=[];for(let n=0;n<M.mipmaps.length;n++)T.__webglFramebuffer[n]=J.createFramebuffer()}else T.__webglFramebuffer=J.createFramebuffer();if(U0)for(let n=0,o=t.length;n<o;n++){let F0=W.get(t[n]);if(F0.__webglTexture===void 0)F0.__webglTexture=J.createTexture(),H.memory.textures++}if(B.samples>0&&j(B)===!1){T.__webglMultisampledFramebuffer=J.createFramebuffer(),T.__webglColorRenderbuffer=[],$.bindFramebuffer(J.FRAMEBUFFER,T.__webglMultisampledFramebuffer);for(let n=0;n<t.length;n++){let o=t[n];T.__webglColorRenderbuffer[n]=J.createRenderbuffer(),J.bindRenderbuffer(J.RENDERBUFFER,T.__webglColorRenderbuffer[n]);let F0=K.convert(o.format,o.colorSpace),B0=K.convert(o.type),G0=k(o.internalFormat,F0,B0,o.normalized,o.colorSpace,B.isXRRenderTarget===!0),$0=E8(B);J.renderbufferStorageMultisample(J.RENDERBUFFER,$0,G0,B.width,B.height),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+n,J.RENDERBUFFER,T.__webglColorRenderbuffer[n])}if(J.bindRenderbuffer(J.RENDERBUFFER,null),B.depthBuffer)T.__webglDepthRenderbuffer=J.createRenderbuffer(),y0(T.__webglDepthRenderbuffer,B,!0);$.bindFramebuffer(J.FRAMEBUFFER,null)}}if(Q0){$.bindTexture(J.TEXTURE_CUBE_MAP,d.__webglTexture),s(J.TEXTURE_CUBE_MAP,M);for(let n=0;n<6;n++)if(M.mipmaps&&M.mipmaps.length>0)for(let o=0;o<M.mipmaps.length;o++)f0(T.__webglFramebuffer[n][o],B,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+n,o);else f0(T.__webglFramebuffer[n],B,M,J.COLOR_ATTACHMENT0,J.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);if(q(M))_(J.TEXTURE_CUBE_MAP);$.unbindTexture()}else if(U0){for(let n=0,o=t.length;n<o;n++){let F0=t[n],B0=W.get(F0),G0=J.TEXTURE_2D;if(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)G0=B.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(G0,B0.__webglTexture),s(G0,F0),f0(T.__webglFramebuffer,B,F0,J.COLOR_ATTACHMENT0+n,G0,0),q(F0))_(G0)}$.unbindTexture()}else{let n=J.TEXTURE_2D;if(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)n=B.isWebGL3DRenderTarget?J.TEXTURE_3D:J.TEXTURE_2D_ARRAY;if($.bindTexture(n,d.__webglTexture),s(n,M),M.mipmaps&&M.mipmaps.length>0)for(let o=0;o<M.mipmaps.length;o++)f0(T.__webglFramebuffer[o],B,M,J.COLOR_ATTACHMENT0,n,o);else f0(T.__webglFramebuffer,B,M,J.COLOR_ATTACHMENT0,n,0);if(q(M))_(n);$.unbindTexture()}if(B.depthBuffer)h0(B)}function p8(B){let M=B.textures;for(let T=0,d=M.length;T<d;T++){let t=M[T];if(q(t)){let Q0=A(B),U0=W.get(t).__webglTexture;$.bindTexture(Q0,U0),_(Q0),$.unbindTexture()}}}let $8=[],k8=[];function O8(B){if(B.samples>0){if(j(B)===!1){let{textures:M,width:T,height:d}=B,t=J.COLOR_BUFFER_BIT,Q0=B.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT,U0=W.get(B),n=M.length>1;if(n)for(let F0=0;F0<M.length;F0++)$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,null),$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,null,0);$.bindFramebuffer(J.READ_FRAMEBUFFER,U0.__webglMultisampledFramebuffer);let o=B.texture.mipmaps;if(o&&o.length>0)$.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglFramebuffer[0]);else $.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglFramebuffer);for(let F0=0;F0<M.length;F0++){if(B.resolveDepthBuffer){if(B.depthBuffer)t|=J.DEPTH_BUFFER_BIT;if(B.stencilBuffer&&B.resolveStencilBuffer)t|=J.STENCIL_BUFFER_BIT}if(n){J.framebufferRenderbuffer(J.READ_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.RENDERBUFFER,U0.__webglColorRenderbuffer[F0]);let B0=W.get(M[F0]).__webglTexture;J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0,J.TEXTURE_2D,B0,0)}if(J.blitFramebuffer(0,0,T,d,0,0,T,d,t,J.NEAREST),X===!0){if($8.length=0,k8.length=0,$8.push(J.COLOR_ATTACHMENT0+F0),B.depthBuffer&&B.resolveDepthBuffer===!1)$8.push(Q0),k8.push(Q0),J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,k8);J.invalidateFramebuffer(J.READ_FRAMEBUFFER,$8)}}if($.bindFramebuffer(J.READ_FRAMEBUFFER,null),$.bindFramebuffer(J.DRAW_FRAMEBUFFER,null),n)for(let F0=0;F0<M.length;F0++){$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglMultisampledFramebuffer),J.framebufferRenderbuffer(J.FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.RENDERBUFFER,U0.__webglColorRenderbuffer[F0]);let B0=W.get(M[F0]).__webglTexture;$.bindFramebuffer(J.FRAMEBUFFER,U0.__webglFramebuffer),J.framebufferTexture2D(J.DRAW_FRAMEBUFFER,J.COLOR_ATTACHMENT0+F0,J.TEXTURE_2D,B0,0)}$.bindFramebuffer(J.DRAW_FRAMEBUFFER,U0.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.resolveDepthBuffer===!1&&X){let M=B.stencilBuffer?J.DEPTH_STENCIL_ATTACHMENT:J.DEPTH_ATTACHMENT;J.invalidateFramebuffer(J.DRAW_FRAMEBUFFER,[M])}}}function E8(B){return Math.min(Z.maxSamples,B.samples)}function j(B){let M=W.get(B);return B.samples>0&&Q.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function m8(B){let M=H.render.frame;if(E.get(B)!==M)E.set(B,M),B.update()}function s0(B,M){let{colorSpace:T,format:d,type:t}=B;if(B.isCompressedTexture===!0||B.isVideoTexture===!0)return M;if(T!==lQ&&T!==s9)if(g0.getTransfer(T)===e0){if(d!==Z9||t!==h8)C0("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.")}else P0("WebGLTextures: Unsupported texture color space:",T);return M}function W8(B){if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement)U.width=B.naturalWidth||B.width,U.height=B.naturalHeight||B.height;else if(typeof VideoFrame<"u"&&B instanceof VideoFrame)U.width=B.displayWidth,U.height=B.displayHeight;else U.width=B.width,U.height=B.height;return U}this.allocateTextureUnit=m,this.resetTextureUnits=c,this.getTextureUnits=b,this.setTextureUnits=u,this.setTexture2D=a,this.setTexture2DArray=e,this.setTexture3D=J0,this.setTextureCube=k0,this.rebindTextures=x0,this.setupRenderTarget=D8,this.updateRenderTargetMipmap=p8,this.updateMultisampleRenderTarget=O8,this.setupDepthRenderbuffer=h0,this.setupFrameBufferTexture=f0,this.useMultisampledRTT=j,this.isReversedDepthBuffer=function(){return $.buffers.depth.getReversed()}}function q1(J,Q){function $(W,Z=s9){let K,H=g0.getTransfer(Z);if(W===h8)return J.UNSIGNED_BYTE;if(W===HQ)return J.UNSIGNED_SHORT_4_4_4_4;if(W===YQ)return J.UNSIGNED_SHORT_5_5_5_1;if(W===MZ)return J.UNSIGNED_INT_5_9_9_9_REV;if(W===RZ)return J.UNSIGNED_INT_10F_11F_11F_REV;if(W===DZ)return J.BYTE;if(W===OZ)return J.SHORT;if(W===d6)return J.UNSIGNED_SHORT;if(W===KQ)return J.INT;if(W===S9)return J.UNSIGNED_INT;if(W===D9)return J.FLOAT;if(W===O9)return J.HALF_FLOAT;if(W===kZ)return J.ALPHA;if(W===LZ)return J.RGB;if(W===Z9)return J.RGBA;if(W===u9)return J.DEPTH_COMPONENT;if(W===c9)return J.DEPTH_STENCIL;if(W===y7)return J.RED;if(W===XQ)return J.RED_INTEGER;if(W===n9)return J.RG;if(W===UQ)return J.RG_INTEGER;if(W===GQ)return J.RGBA_INTEGER;if(W===b7||W===h7||W===x7||W===g7)if(H===e0)if(K=Q.get("WEBGL_compressed_texture_s3tc_srgb"),K!==null){if(W===b7)return K.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(W===h7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(W===x7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(W===g7)return K.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(K=Q.get("WEBGL_compressed_texture_s3tc"),K!==null){if(W===b7)return K.COMPRESSED_RGB_S3TC_DXT1_EXT;if(W===h7)return K.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(W===x7)return K.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(W===g7)return K.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(W===NQ||W===EQ||W===qQ||W===FQ)if(K=Q.get("WEBGL_compressed_texture_pvrtc"),K!==null){if(W===NQ)return K.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(W===EQ)return K.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(W===qQ)return K.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(W===FQ)return K.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(W===DQ||W===OQ||W===MQ||W===RQ||W===kQ||W===p7||W===LQ)if(K=Q.get("WEBGL_compressed_texture_etc"),K!==null){if(W===DQ||W===OQ)return H===e0?K.COMPRESSED_SRGB8_ETC2:K.COMPRESSED_RGB8_ETC2;if(W===MQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:K.COMPRESSED_RGBA8_ETC2_EAC;if(W===RQ)return K.COMPRESSED_R11_EAC;if(W===kQ)return K.COMPRESSED_SIGNED_R11_EAC;if(W===p7)return K.COMPRESSED_RG11_EAC;if(W===LQ)return K.COMPRESSED_SIGNED_RG11_EAC}else return null;if(W===VQ||W===BQ||W===zQ||W===IQ||W===_Q||W===CQ||W===AQ||W===PQ||W===wQ||W===TQ||W===SQ||W===jQ||W===vQ||W===fQ)if(K=Q.get("WEBGL_compressed_texture_astc"),K!==null){if(W===VQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:K.COMPRESSED_RGBA_ASTC_4x4_KHR;if(W===BQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:K.COMPRESSED_RGBA_ASTC_5x4_KHR;if(W===zQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:K.COMPRESSED_RGBA_ASTC_5x5_KHR;if(W===IQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:K.COMPRESSED_RGBA_ASTC_6x5_KHR;if(W===_Q)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:K.COMPRESSED_RGBA_ASTC_6x6_KHR;if(W===CQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:K.COMPRESSED_RGBA_ASTC_8x5_KHR;if(W===AQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:K.COMPRESSED_RGBA_ASTC_8x6_KHR;if(W===PQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:K.COMPRESSED_RGBA_ASTC_8x8_KHR;if(W===wQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:K.COMPRESSED_RGBA_ASTC_10x5_KHR;if(W===TQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:K.COMPRESSED_RGBA_ASTC_10x6_KHR;if(W===SQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:K.COMPRESSED_RGBA_ASTC_10x8_KHR;if(W===jQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:K.COMPRESSED_RGBA_ASTC_10x10_KHR;if(W===vQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:K.COMPRESSED_RGBA_ASTC_12x10_KHR;if(W===fQ)return H===e0?K.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:K.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(W===yQ||W===bQ||W===hQ)if(K=Q.get("EXT_texture_compression_bptc"),K!==null){if(W===yQ)return H===e0?K.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:K.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(W===bQ)return K.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(W===hQ)return K.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(W===xQ||W===gQ||W===m7||W===pQ)if(K=Q.get("EXT_texture_compression_rgtc"),K!==null){if(W===xQ)return K.COMPRESSED_RED_RGTC1_EXT;if(W===gQ)return K.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(W===m7)return K.COMPRESSED_RED_GREEN_RGTC2_EXT;if(W===pQ)return K.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;if(W===_6)return J.UNSIGNED_INT_24_8;return J[W]!==void 0?J[W]:null}return{convert:$}}var F1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,D1=`
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

}`;class DK{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(J,Q){if(this.texture===null){let $=new $J(J.texture);if(J.depthNear!==Q.depthNear||J.depthFar!==Q.depthFar)this.depthNear=J.depthNear,this.depthFar=J.depthFar;this.texture=$}}getMesh(J){if(this.texture!==null){if(this.mesh===null){let Q=J.cameras[0].viewport,$=new T8({vertexShader:F1,fragmentShader:D1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:Q.z},depthHeight:{value:Q.w}}});this.mesh=new x8(new f9(20,20),$)}}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class OK extends M9{constructor(J,Q){super();let $=this,W=null,Z=1,K=null,H="local-floor",Y=1,X=null,U=null,E=null,N=null,G=null,F=null,O=typeof XRWebGLBinding<"u",V=new DK,D={},q=Q.getContextAttributes(),_=null,A=null,k=[],I=[],C=new n0,w=null,R=new y8;R.viewport=new K8;let z=new y8;z.viewport=new K8;let p=[R,z],P=new O$,y=null,c=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(s){let W0=k[s];if(W0===void 0)W0=new n6,k[s]=W0;return W0.getTargetRaySpace()},this.getControllerGrip=function(s){let W0=k[s];if(W0===void 0)W0=new n6,k[s]=W0;return W0.getGripSpace()},this.getHand=function(s){let W0=k[s];if(W0===void 0)W0=new n6,k[s]=W0;return W0.getHandSpace()};function b(s){let W0=I.indexOf(s.inputSource);if(W0===-1)return;let K0=k[W0];if(K0!==void 0)K0.update(s.inputSource,s.frame,X||K),K0.dispatchEvent({type:s.type,data:s.inputSource})}function u(){W.removeEventListener("select",b),W.removeEventListener("selectstart",b),W.removeEventListener("selectend",b),W.removeEventListener("squeeze",b),W.removeEventListener("squeezestart",b),W.removeEventListener("squeezeend",b),W.removeEventListener("end",u),W.removeEventListener("inputsourceschange",m);for(let s=0;s<k.length;s++){let W0=I[s];if(W0===null)continue;I[s]=null,k[s].disconnect(W0)}y=null,c=null,V.reset();for(let s in D)delete D[s];J.setRenderTarget(_),G=null,N=null,E=null,W=null,A=null,u0.stop(),$.isPresenting=!1,J.setPixelRatio(w),J.setSize(C.width,C.height,!1),$.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(s){if(Z=s,$.isPresenting===!0)C0("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(s){if(H=s,$.isPresenting===!0)C0("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return X||K},this.setReferenceSpace=function(s){X=s},this.getBaseLayer=function(){return N!==null?N:G},this.getBinding=function(){if(E===null&&O)E=new XRWebGLBinding(W,Q);return E},this.getFrame=function(){return F},this.getSession=function(){return W},this.setSession=async function(s){if(W=s,W!==null){if(_=J.getRenderTarget(),W.addEventListener("select",b),W.addEventListener("selectstart",b),W.addEventListener("selectend",b),W.addEventListener("squeeze",b),W.addEventListener("squeezestart",b),W.addEventListener("squeezeend",b),W.addEventListener("end",u),W.addEventListener("inputsourceschange",m),q.xrCompatible!==!0)await Q.makeXRCompatible();if(w=J.getPixelRatio(),J.getSize(C),!(O&&("createProjectionLayer"in XRWebGLBinding.prototype))){let K0={antialias:q.antialias,alpha:!0,depth:q.depth,stencil:q.stencil,framebufferScaleFactor:Z};G=new XRWebGLLayer(W,Q,K0),W.updateRenderState({baseLayer:G}),J.setPixelRatio(1),J.setSize(G.framebufferWidth,G.framebufferHeight,!1),A=new c8(G.framebufferWidth,G.framebufferHeight,{format:Z9,type:h8,colorSpace:J.outputColorSpace,stencilBuffer:q.stencil,resolveDepthBuffer:G.ignoreDepthValues===!1,resolveStencilBuffer:G.ignoreDepthValues===!1})}else{let K0=null,H0=null,L0=null;if(q.depth)L0=q.stencil?Q.DEPTH24_STENCIL8:Q.DEPTH_COMPONENT24,K0=q.stencil?c9:u9,H0=q.stencil?_6:S9;let j0={colorFormat:Q.RGBA8,depthFormat:L0,scaleFactor:Z};E=this.getBinding(),N=E.createProjectionLayer(j0),W.updateRenderState({layers:[N]}),J.setPixelRatio(1),J.setSize(N.textureWidth,N.textureHeight,!1),A=new c8(N.textureWidth,N.textureHeight,{format:Z9,type:h8,depthTexture:new v9(N.textureWidth,N.textureHeight,H0,void 0,void 0,void 0,void 0,void 0,void 0,K0),stencilBuffer:q.stencil,colorSpace:J.outputColorSpace,samples:q.antialias?4:0,resolveDepthBuffer:N.ignoreDepthValues===!1,resolveStencilBuffer:N.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(Y),X=null,K=await W.requestReferenceSpace(H),u0.setContext(W),u0.start(),$.isPresenting=!0,$.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(W!==null)return W.environmentBlendMode},this.getDepthTexture=function(){return V.getDepthTexture()};function m(s){for(let W0=0;W0<s.removed.length;W0++){let K0=s.removed[W0],H0=I.indexOf(K0);if(H0>=0)I[H0]=null,k[H0].disconnect(K0)}for(let W0=0;W0<s.added.length;W0++){let K0=s.added[W0],H0=I.indexOf(K0);if(H0===-1){for(let j0=0;j0<k.length;j0++)if(j0>=I.length){I.push(K0),H0=j0;break}else if(I[j0]===null){I[j0]=K0,H0=j0;break}if(H0===-1)break}let L0=k[H0];if(L0)L0.connect(K0)}}let f=new h,a=new h;function e(s,W0,K0){f.setFromMatrixPosition(W0.matrixWorld),a.setFromMatrixPosition(K0.matrixWorld);let H0=f.distanceTo(a),L0=W0.projectionMatrix.elements,j0=K0.projectionMatrix.elements,f0=L0[14]/(L0[10]-1),y0=L0[14]/(L0[10]+1),o0=(L0[9]+1)/L0[5],h0=(L0[9]-1)/L0[5],x0=(L0[8]-1)/L0[0],D8=(j0[8]+1)/j0[0],p8=f0*x0,$8=f0*D8,k8=H0/(-x0+D8),O8=k8*-x0;if(W0.matrixWorld.decompose(s.position,s.quaternion,s.scale),s.translateX(O8),s.translateZ(k8),s.matrixWorld.compose(s.position,s.quaternion,s.scale),s.matrixWorldInverse.copy(s.matrixWorld).invert(),L0[10]===-1)s.projectionMatrix.copy(W0.projectionMatrix),s.projectionMatrixInverse.copy(W0.projectionMatrixInverse);else{let E8=f0+k8,j=y0+k8,m8=p8-O8,s0=$8+(H0-O8),W8=o0*y0/j*E8,B=h0*y0/j*E8;s.projectionMatrix.makePerspective(m8,s0,W8,B,E8,j),s.projectionMatrixInverse.copy(s.projectionMatrix).invert()}}function J0(s,W0){if(W0===null)s.matrixWorld.copy(s.matrix);else s.matrixWorld.multiplyMatrices(W0.matrixWorld,s.matrix);s.matrixWorldInverse.copy(s.matrixWorld).invert()}this.updateCamera=function(s){if(W===null)return;let{near:W0,far:K0}=s;if(V.texture!==null){if(V.depthNear>0)W0=V.depthNear;if(V.depthFar>0)K0=V.depthFar}if(P.near=z.near=R.near=W0,P.far=z.far=R.far=K0,y!==P.near||c!==P.far)W.updateRenderState({depthNear:P.near,depthFar:P.far}),y=P.near,c=P.far;P.layers.mask=s.layers.mask|6,R.layers.mask=P.layers.mask&-5,z.layers.mask=P.layers.mask&-3;let H0=s.parent,L0=P.cameras;J0(P,H0);for(let j0=0;j0<L0.length;j0++)J0(L0[j0],H0);if(L0.length===2)e(P,R,z);else P.projectionMatrix.copy(R.projectionMatrix);k0(s,P,H0)};function k0(s,W0,K0){if(K0===null)s.matrix.copy(W0.matrixWorld);else s.matrix.copy(K0.matrixWorld),s.matrix.invert(),s.matrix.multiply(W0.matrixWorld);if(s.matrix.decompose(s.position,s.quaternion,s.scale),s.updateMatrixWorld(!0),s.projectionMatrix.copy(W0.projectionMatrix),s.projectionMatrixInverse.copy(W0.projectionMatrixInverse),s.isPerspectiveCamera)s.fov=A7*2*Math.atan(1/s.projectionMatrix.elements[5]),s.zoom=1}this.getCamera=function(){return P},this.getFoveation=function(){if(N===null&&G===null)return;return Y},this.setFoveation=function(s){if(Y=s,N!==null)N.fixedFoveation=s;if(G!==null&&G.fixedFoveation!==void 0)G.fixedFoveation=s},this.hasDepthSensing=function(){return V.texture!==null},this.getDepthSensingMesh=function(){return V.getMesh(P)},this.getCameraTexture=function(s){return D[s]};let D0=null;function l0(s,W0){if(U=W0.getViewerPose(X||K),F=W0,U!==null){let K0=U.views;if(G!==null)J.setRenderTargetFramebuffer(A,G.framebuffer),J.setRenderTarget(A);let H0=!1;if(K0.length!==P.cameras.length)P.cameras.length=0,H0=!0;for(let y0=0;y0<K0.length;y0++){let o0=K0[y0],h0=null;if(G!==null)h0=G.getViewport(o0);else{let D8=E.getViewSubImage(N,o0);if(h0=D8.viewport,y0===0)J.setRenderTargetTextures(A,D8.colorTexture,D8.depthStencilTexture),J.setRenderTarget(A)}let x0=p[y0];if(x0===void 0)x0=new y8,x0.layers.enable(y0),x0.viewport=new K8,p[y0]=x0;if(x0.matrix.fromArray(o0.transform.matrix),x0.matrix.decompose(x0.position,x0.quaternion,x0.scale),x0.projectionMatrix.fromArray(o0.projectionMatrix),x0.projectionMatrixInverse.copy(x0.projectionMatrix).invert(),x0.viewport.set(h0.x,h0.y,h0.width,h0.height),y0===0)P.matrix.copy(x0.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale);if(H0===!0)P.cameras.push(x0)}let L0=W.enabledFeatures;if(L0&&L0.includes("depth-sensing")&&W.depthUsage=="gpu-optimized"&&O){E=$.getBinding();let y0=E.getDepthInformation(K0[0]);if(y0&&y0.isValid&&y0.texture)V.init(y0,W.renderState)}if(L0&&L0.includes("camera-access")&&O){J.state.unbindTexture(),E=$.getBinding();for(let y0=0;y0<K0.length;y0++){let o0=K0[y0].camera;if(o0){let h0=D[o0];if(!h0)h0=new $J,D[o0]=h0;let x0=E.getCameraImage(o0);h0.sourceTexture=x0}}}}for(let K0=0;K0<k.length;K0++){let H0=I[K0],L0=k[K0];if(H0!==null&&L0!==void 0)L0.update(H0,W0,X||K)}if(D0)D0(s,W0);if(W0.detectedPlanes)$.dispatchEvent({type:"planesdetected",data:W0});F=null}let u0=new ZK;u0.setAnimationLoop(l0),this.setAnimationLoop=function(s){D0=s},this.dispose=function(){}}}var O1=new Z8,MK=new w0;MK.set(-1,0,0,0,1,0,0,0,1);function M1(J,Q){function $(D,q){if(D.matrixAutoUpdate===!0)D.updateMatrix();q.value.copy(D.matrix)}function W(D,q){if(q.color.getRGB(D.fogColor.value,Q$(J)),q.isFog)D.fogNear.value=q.near,D.fogFar.value=q.far;else if(q.isFogExp2)D.fogDensity.value=q.density}function Z(D,q,_,A,k){if(q.isNodeMaterial)q.uniformsNeedUpdate=!1;else if(q.isMeshBasicMaterial)K(D,q);else if(q.isMeshLambertMaterial){if(K(D,q),q.envMap)D.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshToonMaterial)K(D,q),N(D,q);else if(q.isMeshPhongMaterial){if(K(D,q),E(D,q),q.envMap)D.envMapIntensity.value=q.envMapIntensity}else if(q.isMeshStandardMaterial){if(K(D,q),G(D,q),q.isMeshPhysicalMaterial)F(D,q,k)}else if(q.isMeshMatcapMaterial)K(D,q),O(D,q);else if(q.isMeshDepthMaterial)K(D,q);else if(q.isMeshDistanceMaterial)K(D,q),V(D,q);else if(q.isMeshNormalMaterial)K(D,q);else if(q.isLineBasicMaterial){if(H(D,q),q.isLineDashedMaterial)Y(D,q)}else if(q.isPointsMaterial)X(D,q,_,A);else if(q.isSpriteMaterial)U(D,q);else if(q.isShadowMaterial)D.color.value.copy(q.color),D.opacity.value=q.opacity;else if(q.isShaderMaterial)q.uniformsNeedUpdate=!1}function K(D,q){if(D.opacity.value=q.opacity,q.color)D.diffuse.value.copy(q.color);if(q.emissive)D.emissive.value.copy(q.emissive).multiplyScalar(q.emissiveIntensity);if(q.map)D.map.value=q.map,$(q.map,D.mapTransform);if(q.alphaMap)D.alphaMap.value=q.alphaMap,$(q.alphaMap,D.alphaMapTransform);if(q.bumpMap){if(D.bumpMap.value=q.bumpMap,$(q.bumpMap,D.bumpMapTransform),D.bumpScale.value=q.bumpScale,q.side===w8)D.bumpScale.value*=-1}if(q.normalMap){if(D.normalMap.value=q.normalMap,$(q.normalMap,D.normalMapTransform),D.normalScale.value.copy(q.normalScale),q.side===w8)D.normalScale.value.negate()}if(q.displacementMap)D.displacementMap.value=q.displacementMap,$(q.displacementMap,D.displacementMapTransform),D.displacementScale.value=q.displacementScale,D.displacementBias.value=q.displacementBias;if(q.emissiveMap)D.emissiveMap.value=q.emissiveMap,$(q.emissiveMap,D.emissiveMapTransform);if(q.specularMap)D.specularMap.value=q.specularMap,$(q.specularMap,D.specularMapTransform);if(q.alphaTest>0)D.alphaTest.value=q.alphaTest;let _=Q.get(q),A=_.envMap,k=_.envMapRotation;if(A){if(D.envMap.value=A,D.envMapRotation.value.setFromMatrix4(O1.makeRotationFromEuler(k)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1)D.envMapRotation.value.premultiply(MK);D.reflectivity.value=q.reflectivity,D.ior.value=q.ior,D.refractionRatio.value=q.refractionRatio}if(q.lightMap)D.lightMap.value=q.lightMap,D.lightMapIntensity.value=q.lightMapIntensity,$(q.lightMap,D.lightMapTransform);if(q.aoMap)D.aoMap.value=q.aoMap,D.aoMapIntensity.value=q.aoMapIntensity,$(q.aoMap,D.aoMapTransform)}function H(D,q){if(D.diffuse.value.copy(q.color),D.opacity.value=q.opacity,q.map)D.map.value=q.map,$(q.map,D.mapTransform)}function Y(D,q){D.dashSize.value=q.dashSize,D.totalSize.value=q.dashSize+q.gapSize,D.scale.value=q.scale}function X(D,q,_,A){if(D.diffuse.value.copy(q.color),D.opacity.value=q.opacity,D.size.value=q.size*_,D.scale.value=A*0.5,q.map)D.map.value=q.map,$(q.map,D.uvTransform);if(q.alphaMap)D.alphaMap.value=q.alphaMap,$(q.alphaMap,D.alphaMapTransform);if(q.alphaTest>0)D.alphaTest.value=q.alphaTest}function U(D,q){if(D.diffuse.value.copy(q.color),D.opacity.value=q.opacity,D.rotation.value=q.rotation,q.map)D.map.value=q.map,$(q.map,D.mapTransform);if(q.alphaMap)D.alphaMap.value=q.alphaMap,$(q.alphaMap,D.alphaMapTransform);if(q.alphaTest>0)D.alphaTest.value=q.alphaTest}function E(D,q){D.specular.value.copy(q.specular),D.shininess.value=Math.max(q.shininess,0.0001)}function N(D,q){if(q.gradientMap)D.gradientMap.value=q.gradientMap}function G(D,q){if(D.metalness.value=q.metalness,q.metalnessMap)D.metalnessMap.value=q.metalnessMap,$(q.metalnessMap,D.metalnessMapTransform);if(D.roughness.value=q.roughness,q.roughnessMap)D.roughnessMap.value=q.roughnessMap,$(q.roughnessMap,D.roughnessMapTransform);if(q.envMap)D.envMapIntensity.value=q.envMapIntensity}function F(D,q,_){if(D.ior.value=q.ior,q.sheen>0){if(D.sheenColor.value.copy(q.sheenColor).multiplyScalar(q.sheen),D.sheenRoughness.value=q.sheenRoughness,q.sheenColorMap)D.sheenColorMap.value=q.sheenColorMap,$(q.sheenColorMap,D.sheenColorMapTransform);if(q.sheenRoughnessMap)D.sheenRoughnessMap.value=q.sheenRoughnessMap,$(q.sheenRoughnessMap,D.sheenRoughnessMapTransform)}if(q.clearcoat>0){if(D.clearcoat.value=q.clearcoat,D.clearcoatRoughness.value=q.clearcoatRoughness,q.clearcoatMap)D.clearcoatMap.value=q.clearcoatMap,$(q.clearcoatMap,D.clearcoatMapTransform);if(q.clearcoatRoughnessMap)D.clearcoatRoughnessMap.value=q.clearcoatRoughnessMap,$(q.clearcoatRoughnessMap,D.clearcoatRoughnessMapTransform);if(q.clearcoatNormalMap){if(D.clearcoatNormalMap.value=q.clearcoatNormalMap,$(q.clearcoatNormalMap,D.clearcoatNormalMapTransform),D.clearcoatNormalScale.value.copy(q.clearcoatNormalScale),q.side===w8)D.clearcoatNormalScale.value.negate()}}if(q.dispersion>0)D.dispersion.value=q.dispersion;if(q.iridescence>0){if(D.iridescence.value=q.iridescence,D.iridescenceIOR.value=q.iridescenceIOR,D.iridescenceThicknessMinimum.value=q.iridescenceThicknessRange[0],D.iridescenceThicknessMaximum.value=q.iridescenceThicknessRange[1],q.iridescenceMap)D.iridescenceMap.value=q.iridescenceMap,$(q.iridescenceMap,D.iridescenceMapTransform);if(q.iridescenceThicknessMap)D.iridescenceThicknessMap.value=q.iridescenceThicknessMap,$(q.iridescenceThicknessMap,D.iridescenceThicknessMapTransform)}if(q.transmission>0){if(D.transmission.value=q.transmission,D.transmissionSamplerMap.value=_.texture,D.transmissionSamplerSize.value.set(_.width,_.height),q.transmissionMap)D.transmissionMap.value=q.transmissionMap,$(q.transmissionMap,D.transmissionMapTransform);if(D.thickness.value=q.thickness,q.thicknessMap)D.thicknessMap.value=q.thicknessMap,$(q.thicknessMap,D.thicknessMapTransform);D.attenuationDistance.value=q.attenuationDistance,D.attenuationColor.value.copy(q.attenuationColor)}if(q.anisotropy>0){if(D.anisotropyVector.value.set(q.anisotropy*Math.cos(q.anisotropyRotation),q.anisotropy*Math.sin(q.anisotropyRotation)),q.anisotropyMap)D.anisotropyMap.value=q.anisotropyMap,$(q.anisotropyMap,D.anisotropyMapTransform)}if(D.specularIntensity.value=q.specularIntensity,D.specularColor.value.copy(q.specularColor),q.specularColorMap)D.specularColorMap.value=q.specularColorMap,$(q.specularColorMap,D.specularColorMapTransform);if(q.specularIntensityMap)D.specularIntensityMap.value=q.specularIntensityMap,$(q.specularIntensityMap,D.specularIntensityMapTransform)}function O(D,q){if(q.matcap)D.matcap.value=q.matcap}function V(D,q){let _=Q.get(q).light;D.referencePosition.value.setFromMatrixPosition(_.matrixWorld),D.nearDistance.value=_.shadow.camera.near,D.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:W,refreshMaterialUniforms:Z}}function R1(J,Q,$,W){let Z={},K={},H=[],Y=J.getParameter(J.MAX_UNIFORM_BUFFER_BINDINGS);function X(k,I){let C=I.program;W.uniformBlockBinding(k,C)}function U(k,I){let C=Z[k.id];if(C===void 0)D(k),C=E(k),Z[k.id]=C,k.addEventListener("dispose",_);let w=I.program;W.updateUBOMapping(k,w);let R=Q.render.frame;if(K[k.id]!==R)G(k),K[k.id]=R}function E(k){let I=N();k.__bindingPointIndex=I;let C=J.createBuffer(),w=k.__size,R=k.usage;return J.bindBuffer(J.UNIFORM_BUFFER,C),J.bufferData(J.UNIFORM_BUFFER,w,R),J.bindBuffer(J.UNIFORM_BUFFER,null),J.bindBufferBase(J.UNIFORM_BUFFER,I,C),C}function N(){for(let k=0;k<Y;k++)if(H.indexOf(k)===-1)return H.push(k),k;return P0("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function G(k){let I=Z[k.id],C=k.uniforms,w=k.__cache;J.bindBuffer(J.UNIFORM_BUFFER,I);for(let R=0,z=C.length;R<z;R++){let p=C[R];if(Array.isArray(p))for(let P=0,y=p.length;P<y;P++)F(p[P],R,P,w);else F(p,R,0,w)}J.bindBuffer(J.UNIFORM_BUFFER,null)}function F(k,I,C,w){if(V(k,I,C,w)===!0){let{__offset:R,value:z}=k;if(Array.isArray(z)){let p=0;for(let P=0;P<z.length;P++){let y=z[P],c=q(y);if(O(y,k.__data,p),typeof y!=="number"&&typeof y!=="boolean"&&!y.isMatrix3&&!ArrayBuffer.isView(y))p+=c.storage/Float32Array.BYTES_PER_ELEMENT}}else O(z,k.__data,0);J.bufferSubData(J.UNIFORM_BUFFER,R,k.__data)}}function O(k,I,C){if(typeof k==="number"||typeof k==="boolean")I[0]=k;else if(k.isMatrix3)I[0]=k.elements[0],I[1]=k.elements[1],I[2]=k.elements[2],I[3]=0,I[4]=k.elements[3],I[5]=k.elements[4],I[6]=k.elements[5],I[7]=0,I[8]=k.elements[6],I[9]=k.elements[7],I[10]=k.elements[8],I[11]=0;else if(ArrayBuffer.isView(k))I.set(new k.constructor(k.buffer,k.byteOffset,I.length));else k.toArray(I,C)}function V(k,I,C,w){let R=k.value,z=I+"_"+C;if(w[z]===void 0){if(typeof R==="number"||typeof R==="boolean")w[z]=R;else if(ArrayBuffer.isView(R))w[z]=R.slice();else w[z]=R.clone();return!0}else{let p=w[z];if(typeof R==="number"||typeof R==="boolean"){if(p!==R)return w[z]=R,!0}else if(ArrayBuffer.isView(R))return!0;else if(p.equals(R)===!1)return p.copy(R),!0}return!1}function D(k){let I=k.uniforms,C=0,w=16;for(let z=0,p=I.length;z<p;z++){let P=Array.isArray(I[z])?I[z]:[I[z]];for(let y=0,c=P.length;y<c;y++){let b=P[y],u=Array.isArray(b.value)?b.value:[b.value];for(let m=0,f=u.length;m<f;m++){let a=u[m],e=q(a),J0=C%w,k0=J0%e.boundary,D0=J0+k0;if(C+=k0,D0!==0&&w-D0<e.storage)C+=w-D0;b.__data=new Float32Array(e.storage/Float32Array.BYTES_PER_ELEMENT),b.__offset=C,C+=e.storage}}}let R=C%w;if(R>0)C+=w-R;return k.__size=C,k.__cache={},this}function q(k){let I={boundary:0,storage:0};if(typeof k==="number"||typeof k==="boolean")I.boundary=4,I.storage=4;else if(k.isVector2)I.boundary=8,I.storage=8;else if(k.isVector3||k.isColor)I.boundary=16,I.storage=12;else if(k.isVector4)I.boundary=16,I.storage=16;else if(k.isMatrix3)I.boundary=48,I.storage=48;else if(k.isMatrix4)I.boundary=64,I.storage=64;else if(k.isTexture)C0("WebGLRenderer: Texture samplers can not be part of an uniforms group.");else if(ArrayBuffer.isView(k))I.boundary=16,I.storage=k.byteLength;else C0("WebGLRenderer: Unsupported uniform value type.",k);return I}function _(k){let I=k.target;I.removeEventListener("dispose",_);let C=H.indexOf(I.__bindingPointIndex);H.splice(C,1),J.deleteBuffer(Z[I.id]),delete Z[I.id],delete K[I.id]}function A(){for(let k in Z)J.deleteBuffer(Z[k]);H=[],Z={},K={}}return{bind:X,update:U,dispose:A}}var k1=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),K9=null;function L1(){if(K9===null)K9=new i6(k1,16,16,n9,O9),K9.name="DFG_LUT",K9.minFilter=_8,K9.magFilter=_8,K9.wrapS=v7,K9.wrapT=v7,K9.generateMipmaps=!1,K9.needsUpdate=!0;return K9}class S${constructor(J={}){let{canvas:Q=PZ(),context:$=null,depth:W=!0,stencil:Z=!1,alpha:K=!1,antialias:H=!1,premultipliedAlpha:Y=!0,preserveDrawingBuffer:X=!1,powerPreference:U="default",failIfMajorPerformanceCaveat:E=!1,reversedDepthBuffer:N=!1,outputBufferType:G=h8}=J;this.isWebGLRenderer=!0;let F;if($!==null){if(typeof WebGLRenderingContext<"u"&&$ instanceof WebGLRenderingContext)throw Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");F=$.getContextAttributes().alpha}else F=K;let O=G,V=new Set([GQ,UQ,XQ]),D=new Set([h8,S9,d6,_6,HQ,YQ]),q=new Uint32Array(4),_=new Int32Array(4),A=new h,k=null,I=null,C=[],w=[],R=null;this.domElement=Q,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=a8,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let z=this,p=!1,P=null,y=null,c=null,b=null;this._outputColorSpace=l7;let u=0,m=0,f=null,a=-1,e=null,J0=new K8,k0=new K8,D0=null,l0=new p0(0),u0=0,s=Q.width,W0=Q.height,K0=1,H0=null,L0=null,j0=new K8(0,0,s,W0),f0=new K8(0,0,s,W0),y0=!1,o0=new t7,h0=!1,x0=!1,D8=new Z8,p8=new h,$8=new K8,k8={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},O8=!1;function E8(){return f===null?K0:1}let j=$;function m8(L,v){return Q.getContext(L,v)}try{let L={alpha:!0,depth:W,stencil:Z,antialias:H,premultipliedAlpha:Y,preserveDrawingBuffer:X,powerPreference:U,failIfMajorPerformanceCaveat:E};if("setAttribute"in Q)Q.setAttribute("data-engine",`three.js r${vW}`);if(Q.addEventListener("webglcontextlost",T0,!1),Q.addEventListener("webglcontextrestored",H8,!1),Q.addEventListener("webglcontextcreationerror",J8,!1),j===null){if(j=m8("webgl2",L),j===null)if(m8("webgl2"))throw Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.");else throw Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(L){throw P0("WebGLRenderer: "+L.message),L}let s0,W8,B,M,T,d,t,Q0,U0,n,o,F0,B0,G0,$0,_0,A0,c0,S,Z0,i,Y0,O0;function r(){if(s0=new AU(j),s0.init(),i=new q1(j,s0),W8=new kU(j,s0,J,i),B=new N1(j,s0),W8.reversedDepthBuffer&&N)B.buffers.depth.setReversed(!0);y=j.createFramebuffer(),c=j.createFramebuffer(),b=j.createFramebuffer(),M=new TU(j),T=new r5,d=new E1(j,s0,B,T,W8,i,M),t=new CU(z),Q0=new fH(j),Y0=new MU(j,Q0),U0=new PU(j,Q0,M,Y0),n=new jU(j,U0,Q0,Y0,M),c0=new SU(j,W8,d),$0=new LU(T),o=new a5(z,t,s0,W8,Y0,$0),F0=new M1(z,T),B0=new e5,G0=new K1(s0),A0=new OU(z,t,B,n,F,Y),_0=new G1(z,n,W8),O0=new R1(j,M,W8,B),S=new RU(j,s0,M),Z0=new wU(j,s0,M),M.programs=o.programs,z.capabilities=W8,z.extensions=s0,z.properties=T,z.renderLists=B0,z.shadowMap=_0,z.state=B,z.info=M}if(r(),O!==h8)R=new fU(O,Q.width,Q.height,H,W,Z);let X0=new OK(z,j);this.xr=X0,this.getContext=function(){return j},this.getContextAttributes=function(){return j.getContextAttributes()},this.forceContextLoss=function(){let L=s0.get("WEBGL_lose_context");if(L)L.loseContext()},this.forceContextRestore=function(){let L=s0.get("WEBGL_lose_context");if(L)L.restoreContext()},this.getPixelRatio=function(){return K0},this.setPixelRatio=function(L){if(L===void 0)return;K0=L,this.setSize(s,W0,!1)},this.getSize=function(L){return L.set(s,W0)},this.setSize=function(L,v,l=!0){if(X0.isPresenting){C0("WebGLRenderer: Can't change size while VR device is presenting.");return}if(s=L,W0=v,Q.width=Math.floor(L*K0),Q.height=Math.floor(v*K0),l===!0)Q.style.width=L+"px",Q.style.height=v+"px";if(R!==null)R.setSize(Q.width,Q.height);this.setViewport(0,0,L,v)},this.getDrawingBufferSize=function(L){return L.set(s*K0,W0*K0).floor()},this.setDrawingBufferSize=function(L,v,l){s=L,W0=v,K0=l,Q.width=Math.floor(L*l),Q.height=Math.floor(v*l),this.setViewport(0,0,L,v)},this.setEffects=function(L){if(O===h8){P0("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(L){for(let v=0;v<L.length;v++)if(L[v].isOutputPass===!0){C0("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(L||[])},this.getCurrentViewport=function(L){return L.copy(J0)},this.getViewport=function(L){return L.copy(j0)},this.setViewport=function(L,v,l,x){if(L.isVector4)j0.set(L.x,L.y,L.z,L.w);else j0.set(L,v,l,x);B.viewport(J0.copy(j0).multiplyScalar(K0).round())},this.getScissor=function(L){return L.copy(f0)},this.setScissor=function(L,v,l,x){if(L.isVector4)f0.set(L.x,L.y,L.z,L.w);else f0.set(L,v,l,x);B.scissor(k0.copy(f0).multiplyScalar(K0).round())},this.getScissorTest=function(){return y0},this.setScissorTest=function(L){B.setScissorTest(y0=L)},this.setOpaqueSort=function(L){H0=L},this.setTransparentSort=function(L){L0=L},this.getClearColor=function(L){return L.copy(A0.getClearColor())},this.setClearColor=function(){A0.setClearColor(...arguments)},this.getClearAlpha=function(){return A0.getClearAlpha()},this.setClearAlpha=function(){A0.setClearAlpha(...arguments)},this.clear=function(L=!0,v=!0,l=!0){let x=0;if(L){let g=!1;if(f!==null){let q0=f.texture.format;g=V.has(q0)}if(g){let q0=f.texture.type,R0=D.has(q0),E0=A0.getClearColor(),V0=A0.getClearAlpha(),z0=E0.r,S0=E0.g,b0=E0.b;if(R0)q[0]=z0,q[1]=S0,q[2]=b0,q[3]=V0,j.clearBufferuiv(j.COLOR,0,q);else _[0]=z0,_[1]=S0,_[2]=b0,_[3]=V0,j.clearBufferiv(j.COLOR,0,_)}else x|=j.COLOR_BUFFER_BIT}if(v)x|=j.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0);if(l)x|=j.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295);if(x!==0)j.clear(x)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(L){L.setRenderer(this),P=L},this.dispose=function(){Q.removeEventListener("webglcontextlost",T0,!1),Q.removeEventListener("webglcontextrestored",H8,!1),Q.removeEventListener("webglcontextcreationerror",J8,!1),A0.dispose(),B0.dispose(),G0.dispose(),T.dispose(),t.dispose(),n.dispose(),Y0.dispose(),O0.dispose(),o.dispose(),X0.dispose(),X0.removeEventListener("sessionstart",QW),X0.removeEventListener("sessionend",$W),b9.stop()};function T0(L){L.preventDefault(),sQ("WebGLRenderer: Context Lost."),p=!0}function H8(){sQ("WebGLRenderer: Context Restored."),p=!1;let L=M.autoReset,v=_0.enabled,l=_0.autoUpdate,x=_0.needsUpdate,g=_0.type;r(),M.autoReset=L,_0.enabled=v,_0.autoUpdate=l,_0.needsUpdate=x,_0.type=g}function J8(L){P0("WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function e8(L){let v=L.target;v.removeEventListener("dispose",e8),Y9(v)}function Y9(L){iK(L),T.remove(L)}function iK(L){let v=T.get(L).programs;if(v!==void 0){if(v.forEach(function(l){o.releaseProgram(l)}),L.isShaderMaterial)o.releaseShaderCache(L)}}this.renderBufferDirect=function(L,v,l,x,g,q0){if(v===null)v=k8;let R0=g.isMesh&&g.matrixWorld.determinantAffine()<0,E0=rK(L,v,l,x,g);B.setMaterial(x,R0);let V0=l.index,z0=1;if(x.wireframe===!0){if(V0=U0.getWireframeAttribute(l),V0===void 0)return;z0=2}let S0=l.drawRange,b0=l.attributes.position,I0=S0.start*z0,a0=(S0.start+S0.count)*z0;if(q0!==null)I0=Math.max(I0,q0.start*z0),a0=Math.min(a0,(q0.start+q0.count)*z0);if(V0!==null)I0=Math.max(I0,0),a0=Math.min(a0,V0.count);else if(b0!==void 0&&b0!==null)I0=Math.max(I0,0),a0=Math.min(a0,b0.count);let U8=a0-I0;if(U8<0||U8===1/0)return;Y0.setup(g,x,E0,l,V0);let Y8,r0=S;if(V0!==null)Y8=Q0.get(V0),r0=Z0,r0.setIndex(Y8);if(g.isMesh)if(x.wireframe===!0)B.setLineWidth(x.wireframeLinewidth*E8()),r0.setMode(j.LINES);else r0.setMode(j.TRIANGLES);else if(g.isLine){let L8=x.linewidth;if(L8===void 0)L8=1;if(B.setLineWidth(L8*E8()),g.isLineSegments)r0.setMode(j.LINES);else if(g.isLineLoop)r0.setMode(j.LINE_LOOP);else r0.setMode(j.LINE_STRIP)}else if(g.isPoints)r0.setMode(j.POINTS);else if(g.isSprite)r0.setMode(j.TRIANGLES);if(g.isBatchedMesh)if(!s0.get("WEBGL_multi_draw")){let{_multiDrawStarts:L8,_multiDrawCounts:M0,_multiDrawCount:j8}=g,d0=V0?Q0.get(V0).bytesPerElement:1,l8=T.get(x).currentProgram.getUniforms();for(let J9=0;J9<j8;J9++)l8.setValue(j,"_gl_DrawID",J9),r0.render(L8[J9]/d0,M0[J9])}else r0.renderMultiDraw(g._multiDrawStarts,g._multiDrawCounts,g._multiDrawCount);else if(g.isInstancedMesh)r0.renderInstances(I0,U8,g.count);else if(l.isInstancedBufferGeometry){let L8=l._maxInstanceCount!==void 0?l._maxInstanceCount:1/0,M0=Math.min(l.instanceCount,L8);r0.renderInstances(I0,U8,M0)}else r0.render(I0,U8)};function JW(L,v,l){if(L.transparent===!0&&L.side===$9&&L.forceSinglePass===!1)L.side=w8,L.needsUpdate=!0,$7(L,v,l),L.side=B6,L.needsUpdate=!0,$7(L,v,l),L.side=$9;else $7(L,v,l)}this.compile=function(L,v,l=null){if(l===null)l=L;if(I=G0.get(l),I.init(v),w.push(I),l.traverseVisible(function(g){if(g.isLight&&g.layers.test(v.layers)){if(I.pushLight(g),g.castShadow)I.pushShadow(g)}}),L!==l)L.traverseVisible(function(g){if(g.isLight&&g.layers.test(v.layers)){if(I.pushLight(g),g.castShadow)I.pushShadow(g)}});I.setupLights();let x=new Set;return L.traverse(function(g){if(!(g.isMesh||g.isPoints||g.isLine||g.isSprite))return;let q0=g.material;if(q0)if(Array.isArray(q0))for(let R0=0;R0<q0.length;R0++){let E0=q0[R0];JW(E0,l,g),x.add(E0)}else JW(q0,l,g),x.add(q0)}),I=w.pop(),x},this.compileAsync=function(L,v,l=null){let x=this.compile(L,v,l);return new Promise((g)=>{function q0(){if(x.forEach(function(R0){if(T.get(R0).currentProgram.isReady())x.delete(R0)}),x.size===0){g(L);return}setTimeout(q0,10)}if(s0.get("KHR_parallel_shader_compile")!==null)q0();else setTimeout(q0,10)})};let LJ=null;function oK(L){if(LJ)LJ(L)}function QW(){b9.stop()}function $W(){b9.start()}let b9=new ZK;if(b9.setAnimationLoop(oK),typeof self<"u")b9.setContext(self);this.setAnimationLoop=function(L){LJ=L,X0.setAnimationLoop(L),L===null?b9.stop():b9.start()},X0.addEventListener("sessionstart",QW),X0.addEventListener("sessionend",$W),this.render=function(L,v){if(v!==void 0&&v.isCamera!==!0){P0("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(p===!0)return;if(P!==null)P.renderStart(L,v);let l=X0.enabled===!0&&X0.isPresenting===!0,x=R!==null&&(f===null||l)&&R.begin(z,f);if(L.matrixWorldAutoUpdate===!0)L.updateMatrixWorld();if(v.parent===null&&v.matrixWorldAutoUpdate===!0)v.updateMatrixWorld();if(X0.enabled===!0&&X0.isPresenting===!0&&(R===null||R.isCompositing()===!1)){if(X0.cameraAutoUpdate===!0)X0.updateCamera(v);v=X0.getCamera()}if(L.isScene===!0)L.onBeforeRender(z,L,v,f);if(I=G0.get(L,w.length),I.init(v),I.state.textureUnits=d.getTextureUnits(),w.push(I),D8.multiplyMatrices(v.projectionMatrix,v.matrixWorldInverse),o0.setFromProjectionMatrix(D8,nQ,v.reversedDepth),x0=this.localClippingEnabled,h0=$0.init(this.clippingPlanes,x0),k=B0.get(L,C.length),k.init(),C.push(k),X0.enabled===!0&&X0.isPresenting===!0){let R0=z.xr.getDepthSensingMesh();if(R0!==null)VJ(R0,v,-1/0,z.sortObjects)}if(VJ(L,v,0,z.sortObjects),k.finish(),z.sortObjects===!0)k.sort(H0,L0,v.reversedDepth);if(O8=X0.enabled===!1||X0.isPresenting===!1||X0.hasDepthSensing()===!1,O8)A0.addToRenderList(k,L);if(this.info.render.frame++,this.info.autoReset===!0)this.info.reset();if(h0===!0)$0.beginShadows();let g=I.state.shadowsArray;if(_0.render(g,L,v),h0===!0)$0.endShadows();if((x&&R.hasRenderPass())===!1){let{opaque:R0,transmissive:E0}=k;if(I.setupLights(),v.isArrayCamera){let V0=v.cameras;if(E0.length>0)for(let z0=0,S0=V0.length;z0<S0;z0++){let b0=V0[z0];ZW(R0,E0,L,b0)}if(O8)A0.render(L);for(let z0=0,S0=V0.length;z0<S0;z0++){let b0=V0[z0];WW(k,L,b0,b0.viewport)}}else{if(E0.length>0)ZW(R0,E0,L,v);if(O8)A0.render(L);WW(k,L,v)}}if(f!==null&&m===0)d.updateMultisampleRenderTarget(f),d.updateRenderTargetMipmap(f);if(x)R.end(z);if(L.isScene===!0)L.onAfterRender(z,L,v);if(Y0.resetDefaultState(),a=-1,e=null,w.pop(),w.length>0){if(I=w[w.length-1],d.setTextureUnits(I.state.textureUnits),h0===!0)$0.setGlobalState(z.clippingPlanes,I.state.camera)}else I=null;if(C.pop(),C.length>0)k=C[C.length-1];else k=null;if(P!==null)P.renderEnd()};function VJ(L,v,l,x){if(L.visible===!1)return;if(L.layers.test(v.layers)){if(L.isGroup)l=L.renderOrder;else if(L.isLOD){if(L.autoUpdate===!0)L.update(v)}else if(L.isLightProbeGrid)I.pushLightProbeGrid(L);else if(L.isLight){if(I.pushLight(L),L.castShadow)I.pushShadow(L)}else if(L.isSprite){if(!L.frustumCulled||o0.intersectsSprite(L)){if(x)$8.setFromMatrixPosition(L.matrixWorld).applyMatrix4(D8);let R0=n.update(L),E0=L.material;if(E0.visible)k.push(L,R0,E0,l,$8.z,null)}}else if(L.isMesh||L.isLine||L.isPoints){if(!L.frustumCulled||o0.intersectsObject(L)){let R0=n.update(L),E0=L.material;if(x){if(L.boundingSphere!==void 0){if(L.boundingSphere===null)L.computeBoundingSphere();$8.copy(L.boundingSphere.center)}else{if(R0.boundingSphere===null)R0.computeBoundingSphere();$8.copy(R0.boundingSphere.center)}$8.applyMatrix4(L.matrixWorld).applyMatrix4(D8)}if(Array.isArray(E0)){let V0=R0.groups;for(let z0=0,S0=V0.length;z0<S0;z0++){let b0=V0[z0],I0=E0[b0.materialIndex];if(I0&&I0.visible)k.push(L,R0,I0,l,$8.z,b0)}}else if(E0.visible)k.push(L,R0,E0,l,$8.z,null)}}}let q0=L.children;for(let R0=0,E0=q0.length;R0<E0;R0++)VJ(q0[R0],v,l,x)}function WW(L,v,l,x){let{opaque:g,transmissive:q0,transparent:R0}=L;if(I.setupLightsView(l),h0===!0)$0.setGlobalState(z.clippingPlanes,l);if(x)B.viewport(J0.copy(x));if(g.length>0)Q7(g,v,l);if(q0.length>0)Q7(q0,v,l);if(R0.length>0)Q7(R0,v,l);B.buffers.depth.setTest(!0),B.buffers.depth.setMask(!0),B.buffers.color.setMask(!0),B.setPolygonOffset(!1)}function ZW(L,v,l,x){if((l.isScene===!0?l.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[x.id]===void 0){let I0=s0.has("EXT_color_buffer_half_float")||s0.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[x.id]=new c8(1,1,{generateMipmaps:!0,type:I0?O9:h8,minFilter:d9,samples:Math.max(4,W8.samples),stencilBuffer:Z,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:g0.workingColorSpace})}let q0=I.state.transmissionRenderTarget[x.id],R0=x.viewport||J0;q0.setSize(R0.z*z.transmissionResolutionScale,R0.w*z.transmissionResolutionScale);let E0=z.getRenderTarget(),V0=z.getActiveCubeFace(),z0=z.getActiveMipmapLevel();if(z.setRenderTarget(q0),z.getClearColor(l0),u0=z.getClearAlpha(),u0<1)z.setClearColor(16777215,0.5);if(z.clear(),O8)A0.render(l);let S0=z.toneMapping;z.toneMapping=a8;let b0=x.viewport;if(x.viewport!==void 0)x.viewport=void 0;if(I.setupLightsView(x),h0===!0)$0.setGlobalState(z.clippingPlanes,x);if(Q7(L,l,x),d.updateMultisampleRenderTarget(q0),d.updateRenderTargetMipmap(q0),s0.has("WEBGL_multisampled_render_to_texture")===!1){let I0=!1;for(let a0=0,U8=v.length;a0<U8;a0++){let Y8=v[a0],{object:r0,geometry:L8,material:M0,group:j8}=Y8;if(M0.side===$9&&r0.layers.test(x.layers)){let d0=M0.side;M0.side=w8,M0.needsUpdate=!0,KW(r0,l,x,L8,M0,j8),M0.side=d0,M0.needsUpdate=!0,I0=!0}}if(I0===!0)d.updateMultisampleRenderTarget(q0),d.updateRenderTargetMipmap(q0)}if(z.setRenderTarget(E0,V0,z0),z.setClearColor(l0,u0),b0!==void 0)x.viewport=b0;z.toneMapping=S0}function Q7(L,v,l){let x=v.isScene===!0?v.overrideMaterial:null;for(let g=0,q0=L.length;g<q0;g++){let R0=L[g],{object:E0,geometry:V0,group:z0}=R0,S0=R0.material;if(S0.allowOverride===!0&&x!==null)S0=x;if(E0.layers.test(l.layers))KW(E0,v,l,V0,S0,z0)}}function KW(L,v,l,x,g,q0){if(L.onBeforeRender(z,v,l,x,g,q0),L.modelViewMatrix.multiplyMatrices(l.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),g.onBeforeRender(z,v,l,x,L,q0),g.transparent===!0&&g.side===$9&&g.forceSinglePass===!1)g.side=w8,g.needsUpdate=!0,z.renderBufferDirect(l,v,x,g,L,q0),g.side=B6,g.needsUpdate=!0,z.renderBufferDirect(l,v,x,g,L,q0),g.side=$9;else z.renderBufferDirect(l,v,x,g,L,q0);L.onAfterRender(z,v,l,x,g,q0)}function $7(L,v,l){if(v.isScene!==!0)v=k8;let x=T.get(L),g=I.state.lights,q0=I.state.shadowsArray,R0=g.state.version,E0=o.getParameters(L,g.state,q0,v,l,I.state.lightProbeGridArray),V0=o.getProgramCacheKey(E0),z0=x.programs;x.environment=L.isMeshStandardMaterial||L.isMeshLambertMaterial||L.isMeshPhongMaterial?v.environment:null,x.fog=v.fog;let S0=L.isMeshStandardMaterial||L.isMeshLambertMaterial&&!L.envMap||L.isMeshPhongMaterial&&!L.envMap;if(x.envMap=t.get(L.envMap||x.environment,S0),x.envMapRotation=x.environment!==null&&L.envMap===null?v.environmentRotation:L.envMapRotation,z0===void 0)L.addEventListener("dispose",e8),z0=new Map,x.programs=z0;let b0=z0.get(V0);if(b0!==void 0){if(x.currentProgram===b0&&x.lightsStateVersion===R0)return YW(L,E0),b0}else{if(E0.uniforms=o.getUniforms(L),P!==null&&L.isNodeMaterial)P.build(L,l,E0);L.onBeforeCompile(E0,z),b0=o.acquireProgram(E0,V0),z0.set(V0,b0),x.uniforms=E0.uniforms}let I0=x.uniforms;if(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)I0.clippingPlanes=$0.uniform;if(YW(L,E0),x.needsLights=eK(L),x.lightsStateVersion=R0,x.needsLights)I0.ambientLightColor.value=g.state.ambient,I0.lightProbe.value=g.state.probe,I0.directionalLights.value=g.state.directional,I0.directionalLightShadows.value=g.state.directionalShadow,I0.spotLights.value=g.state.spot,I0.spotLightShadows.value=g.state.spotShadow,I0.rectAreaLights.value=g.state.rectArea,I0.ltc_1.value=g.state.rectAreaLTC1,I0.ltc_2.value=g.state.rectAreaLTC2,I0.pointLights.value=g.state.point,I0.pointLightShadows.value=g.state.pointShadow,I0.hemisphereLights.value=g.state.hemi,I0.directionalShadowMatrix.value=g.state.directionalShadowMatrix,I0.spotLightMatrix.value=g.state.spotLightMatrix,I0.spotLightMap.value=g.state.spotLightMap,I0.pointShadowMatrix.value=g.state.pointShadowMatrix;return x.lightProbeGrid=I.state.lightProbeGridArray.length>0,x.currentProgram=b0,x.uniformsList=null,b0}function HW(L){if(L.uniformsList===null){let v=L.currentProgram.getUniforms();L.uniformsList=t6.seqWithValue(v.seq,L.uniforms)}return L.uniformsList}function YW(L,v){let l=T.get(L);l.outputColorSpace=v.outputColorSpace,l.batching=v.batching,l.batchingColor=v.batchingColor,l.instancing=v.instancing,l.instancingColor=v.instancingColor,l.instancingMorph=v.instancingMorph,l.skinning=v.skinning,l.morphTargets=v.morphTargets,l.morphNormals=v.morphNormals,l.morphColors=v.morphColors,l.morphTargetsCount=v.morphTargetsCount,l.numClippingPlanes=v.numClippingPlanes,l.numIntersection=v.numClipIntersection,l.vertexAlphas=v.vertexAlphas,l.vertexTangents=v.vertexTangents,l.toneMapping=v.toneMapping}function aK(L,v){if(L.length===0)return null;if(L.length===1)return L[0].texture!==null?L[0]:null;A.setFromMatrixPosition(v.matrixWorld);for(let l=0,x=L.length;l<x;l++){let g=L[l];if(g.texture!==null&&g.boundingBox.containsPoint(A))return g}return null}function rK(L,v,l,x,g){if(v.isScene!==!0)v=k8;d.resetTextureUnits();let q0=v.fog,R0=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?v.environment:null,E0=f===null?z.outputColorSpace:f.isXRRenderTarget===!0?f.texture.colorSpace:g0.workingColorSpace,V0=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,z0=t.get(x.envMap||R0,V0),S0=x.vertexColors===!0&&!!l.attributes.color&&l.attributes.color.itemSize===4,b0=!!l.attributes.tangent&&(!!x.normalMap||x.anisotropy>0),I0=!!l.morphAttributes.position,a0=!!l.morphAttributes.normal,U8=!!l.morphAttributes.color,Y8=a8;if(x.toneMapped){if(f===null||f.isXRRenderTarget===!0)Y8=z.toneMapping}let r0=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,L8=r0!==void 0?r0.length:0,M0=T.get(x),j8=I.state.lights;if(h0===!0){if(x0===!0||L!==e){let Q8=L===e&&x.id===a;$0.setState(x,L,Q8)}}let d0=!1;if(x.version===M0.__version){if(M0.needsLights&&M0.lightsStateVersion!==j8.state.version)d0=!0;else if(M0.outputColorSpace!==E0)d0=!0;else if(g.isBatchedMesh&&M0.batching===!1)d0=!0;else if(!g.isBatchedMesh&&M0.batching===!0)d0=!0;else if(g.isBatchedMesh&&M0.batchingColor===!0&&g.colorTexture===null)d0=!0;else if(g.isBatchedMesh&&M0.batchingColor===!1&&g.colorTexture!==null)d0=!0;else if(g.isInstancedMesh&&M0.instancing===!1)d0=!0;else if(!g.isInstancedMesh&&M0.instancing===!0)d0=!0;else if(g.isSkinnedMesh&&M0.skinning===!1)d0=!0;else if(!g.isSkinnedMesh&&M0.skinning===!0)d0=!0;else if(g.isInstancedMesh&&M0.instancingColor===!0&&g.instanceColor===null)d0=!0;else if(g.isInstancedMesh&&M0.instancingColor===!1&&g.instanceColor!==null)d0=!0;else if(g.isInstancedMesh&&M0.instancingMorph===!0&&g.morphTexture===null)d0=!0;else if(g.isInstancedMesh&&M0.instancingMorph===!1&&g.morphTexture!==null)d0=!0;else if(M0.envMap!==z0)d0=!0;else if(x.fog===!0&&M0.fog!==q0)d0=!0;else if(M0.numClippingPlanes!==void 0&&(M0.numClippingPlanes!==$0.numPlanes||M0.numIntersection!==$0.numIntersection))d0=!0;else if(M0.vertexAlphas!==S0)d0=!0;else if(M0.vertexTangents!==b0)d0=!0;else if(M0.morphTargets!==I0)d0=!0;else if(M0.morphNormals!==a0)d0=!0;else if(M0.morphColors!==U8)d0=!0;else if(M0.toneMapping!==Y8)d0=!0;else if(M0.morphTargetsCount!==L8)d0=!0;else if(!!M0.lightProbeGrid!==I.state.lightProbeGridArray.length>0)d0=!0}else d0=!0,M0.__version=x.version;let l8=M0.currentProgram;if(d0===!0){if(l8=$7(x,v,g),P&&x.isNodeMaterial)P.onUpdateProgram(x,l8,M0)}let J9=!1,L9=!1,Z6=!1,t0=l8.getUniforms(),G8=M0.uniforms;if(B.useProgram(l8.program))J9=!0,L9=!0,Z6=!0;if(x.id!==a)a=x.id,L9=!0;if(M0.needsLights){let Q8=aK(I.state.lightProbeGridArray,g);if(M0.lightProbeGrid!==Q8)M0.lightProbeGrid=Q8,L9=!0}if(J9||e!==L){if(B.buffers.depth.getReversed()&&L.reversedDepth!==!0)L._reversedDepth=!0,L.updateProjectionMatrix();t0.setValue(j,"projectionMatrix",L.projectionMatrix),t0.setValue(j,"viewMatrix",L.matrixWorldInverse);let B9=t0.map.cameraPosition;if(B9!==void 0)B9.setValue(j,p8.setFromMatrixPosition(L.matrixWorld));if(W8.logarithmicDepthBuffer)t0.setValue(j,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2));if(x.isMeshPhongMaterial||x.isMeshToonMaterial||x.isMeshLambertMaterial||x.isMeshBasicMaterial||x.isMeshStandardMaterial||x.isShaderMaterial)t0.setValue(j,"isOrthographic",L.isOrthographicCamera===!0);if(e!==L)e=L,L9=!0,Z6=!0}if(M0.needsLights){if(j8.state.directionalShadowMap.length>0)t0.setValue(j,"directionalShadowMap",j8.state.directionalShadowMap,d);if(j8.state.spotShadowMap.length>0)t0.setValue(j,"spotShadowMap",j8.state.spotShadowMap,d);if(j8.state.pointShadowMap.length>0)t0.setValue(j,"pointShadowMap",j8.state.pointShadowMap,d)}if(g.isSkinnedMesh){t0.setOptional(j,g,"bindMatrix"),t0.setOptional(j,g,"bindMatrixInverse");let Q8=g.skeleton;if(Q8){if(Q8.boneTexture===null)Q8.computeBoneTexture();t0.setValue(j,"boneTexture",Q8.boneTexture,d)}}if(g.isBatchedMesh){if(t0.setOptional(j,g,"batchingTexture"),t0.setValue(j,"batchingTexture",g._matricesTexture,d),t0.setOptional(j,g,"batchingIdTexture"),t0.setValue(j,"batchingIdTexture",g._indirectTexture,d),t0.setOptional(j,g,"batchingColorTexture"),g._colorsTexture!==null)t0.setValue(j,"batchingColorTexture",g._colorsTexture,d)}let V9=l.morphAttributes;if(V9.position!==void 0||V9.normal!==void 0||V9.color!==void 0)c0.update(g,l,l8);if(L9||M0.receiveShadow!==g.receiveShadow)M0.receiveShadow=g.receiveShadow,t0.setValue(j,"receiveShadow",g.receiveShadow);if((x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial)&&x.envMap===null&&v.environment!==null)G8.envMapIntensity.value=v.environmentIntensity;if(G8.dfgLUT!==void 0)G8.dfgLUT.value=L1();if(L9){if(t0.setValue(j,"toneMappingExposure",z.toneMappingExposure),M0.needsLights)tK(G8,Z6);if(q0&&x.fog===!0)F0.refreshFogUniforms(G8,q0);if(F0.refreshMaterialUniforms(G8,x,K0,W0,I.state.transmissionRenderTarget[L.id]),M0.needsLights&&M0.lightProbeGrid){let Q8=M0.lightProbeGrid;G8.probesSH.value=Q8.texture,G8.probesMin.value.copy(Q8.boundingBox.min),G8.probesMax.value.copy(Q8.boundingBox.max),G8.probesResolution.value.copy(Q8.resolution)}t6.upload(j,HW(M0),G8,d)}if(x.isShaderMaterial&&x.uniformsNeedUpdate===!0)t6.upload(j,HW(M0),G8,d),x.uniformsNeedUpdate=!1;if(x.isSpriteMaterial)t0.setValue(j,"center",g.center);if(t0.setValue(j,"modelViewMatrix",g.modelViewMatrix),t0.setValue(j,"normalMatrix",g.normalMatrix),t0.setValue(j,"modelMatrix",g.matrixWorld),x.uniformsGroups!==void 0){let Q8=x.uniformsGroups;for(let B9=0,K6=Q8.length;B9<K6;B9++){let XW=Q8[B9];O0.update(XW,l8),O0.bind(XW,l8)}}return l8}function tK(L,v){L.ambientLightColor.needsUpdate=v,L.lightProbe.needsUpdate=v,L.directionalLights.needsUpdate=v,L.directionalLightShadows.needsUpdate=v,L.pointLights.needsUpdate=v,L.pointLightShadows.needsUpdate=v,L.spotLights.needsUpdate=v,L.spotLightShadows.needsUpdate=v,L.rectAreaLights.needsUpdate=v,L.hemisphereLights.needsUpdate=v}function eK(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}if(this.getActiveCubeFace=function(){return u},this.getActiveMipmapLevel=function(){return m},this.getRenderTarget=function(){return f},this.setRenderTargetTextures=function(L,v,l){let x=T.get(L);if(x.__autoAllocateDepthBuffer=L.resolveDepthBuffer===!1,x.__autoAllocateDepthBuffer===!1)x.__useRenderToTexture=!1;T.get(L.texture).__webglTexture=v,T.get(L.depthTexture).__webglTexture=x.__autoAllocateDepthBuffer?void 0:l,x.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(L,v){let l=T.get(L);l.__webglFramebuffer=v,l.__useDefaultFramebuffer=v===void 0},this.setRenderTarget=function(L,v=0,l=0){f=L,u=v,m=l;let x=null,g=!1,q0=!1;if(L){let E0=T.get(L);if(E0.__useDefaultFramebuffer!==void 0){B.bindFramebuffer(j.FRAMEBUFFER,E0.__webglFramebuffer),J0.copy(L.viewport),k0.copy(L.scissor),D0=L.scissorTest,B.viewport(J0),B.scissor(k0),B.setScissorTest(D0),a=-1;return}else if(E0.__webglFramebuffer===void 0)d.setupRenderTarget(L);else if(E0.__hasExternalTextures)d.rebindTextures(L,T.get(L.texture).__webglTexture,T.get(L.depthTexture).__webglTexture);else if(L.depthBuffer){let S0=L.depthTexture;if(E0.__boundDepthTexture!==S0){if(S0!==null&&T.has(S0)&&(L.width!==S0.image.width||L.height!==S0.image.height))throw Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");d.setupDepthRenderbuffer(L)}}let V0=L.texture;if(V0.isData3DTexture||V0.isDataArrayTexture||V0.isCompressedArrayTexture)q0=!0;let z0=T.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget){if(Array.isArray(z0[v]))x=z0[v][l];else x=z0[v];g=!0}else if(L.samples>0&&d.useMultisampledRTT(L)===!1)x=T.get(L).__webglMultisampledFramebuffer;else if(Array.isArray(z0))x=z0[l];else x=z0;J0.copy(L.viewport),k0.copy(L.scissor),D0=L.scissorTest}else J0.copy(j0).multiplyScalar(K0).floor(),k0.copy(f0).multiplyScalar(K0).floor(),D0=y0;if(l!==0)x=y;if(B.bindFramebuffer(j.FRAMEBUFFER,x))B.drawBuffers(L,x);if(B.viewport(J0),B.scissor(k0),B.setScissorTest(D0),g){let E0=T.get(L.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_CUBE_MAP_POSITIVE_X+v,E0.__webglTexture,l)}else if(q0){let E0=v;for(let V0=0;V0<L.textures.length;V0++){let z0=T.get(L.textures[V0]);j.framebufferTextureLayer(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0+V0,z0.__webglTexture,l,E0)}}else if(L!==null&&l!==0){let E0=T.get(L.texture);j.framebufferTexture2D(j.FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,E0.__webglTexture,l)}a=-1},this.readRenderTargetPixels=function(L,v,l,x,g,q0,R0,E0=0){if(!(L&&L.isWebGLRenderTarget)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let V0=T.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&R0!==void 0)V0=V0[R0];if(V0){B.bindFramebuffer(j.FRAMEBUFFER,V0);try{let z0=L.textures[E0],S0=z0.format,b0=z0.type;if(L.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!W8.textureFormatReadable(S0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!W8.textureTypeReadable(b0)){P0("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}if(v>=0&&v<=L.width-x&&(l>=0&&l<=L.height-g))j.readPixels(v,l,x,g,i.convert(S0),i.convert(b0),q0)}finally{let z0=f!==null?T.get(f).__webglFramebuffer:null;B.bindFramebuffer(j.FRAMEBUFFER,z0)}}},this.readRenderTargetPixelsAsync=async function(L,v,l,x,g,q0,R0,E0=0){if(!(L&&L.isWebGLRenderTarget))throw Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let V0=T.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&R0!==void 0)V0=V0[R0];if(V0)if(v>=0&&v<=L.width-x&&(l>=0&&l<=L.height-g)){B.bindFramebuffer(j.FRAMEBUFFER,V0);let z0=L.textures[E0],S0=z0.format,b0=z0.type;if(L.textures.length>1)j.readBuffer(j.COLOR_ATTACHMENT0+E0);if(!W8.textureFormatReadable(S0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!W8.textureTypeReadable(b0))throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let I0=j.createBuffer();j.bindBuffer(j.PIXEL_PACK_BUFFER,I0),j.bufferData(j.PIXEL_PACK_BUFFER,q0.byteLength,j.STREAM_READ),j.readPixels(v,l,x,g,i.convert(S0),i.convert(b0),0);let a0=f!==null?T.get(f).__webglFramebuffer:null;B.bindFramebuffer(j.FRAMEBUFFER,a0);let U8=j.fenceSync(j.SYNC_GPU_COMMANDS_COMPLETE,0);return j.flush(),await TZ(j,U8,4),j.bindBuffer(j.PIXEL_PACK_BUFFER,I0),j.getBufferSubData(j.PIXEL_PACK_BUFFER,0,q0),j.deleteBuffer(I0),j.deleteSync(U8),q0}else throw Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(L,v=null,l=0){let x=Math.pow(2,-l),g=Math.floor(L.image.width*x),q0=Math.floor(L.image.height*x),R0=v!==null?v.x:0,E0=v!==null?v.y:0;d.setTexture2D(L,0),j.copyTexSubImage2D(j.TEXTURE_2D,l,0,0,R0,E0,g,q0),B.unbindTexture()},this.copyTextureToTexture=function(L,v,l=null,x=null,g=0,q0=0){let R0,E0,V0,z0,S0,b0,I0,a0,U8,Y8=L.isCompressedTexture?L.mipmaps[q0]:L.image;if(l!==null)R0=l.max.x-l.min.x,E0=l.max.y-l.min.y,V0=l.isBox3?l.max.z-l.min.z:1,z0=l.min.x,S0=l.min.y,b0=l.isBox3?l.min.z:0;else{let G8=Math.pow(2,-g);if(R0=Math.floor(Y8.width*G8),E0=Math.floor(Y8.height*G8),L.isDataArrayTexture)V0=Y8.depth;else if(L.isData3DTexture)V0=Math.floor(Y8.depth*G8);else V0=1;z0=0,S0=0,b0=0}if(x!==null)I0=x.x,a0=x.y,U8=x.z;else I0=0,a0=0,U8=0;let r0=i.convert(v.format),L8=i.convert(v.type),M0;if(v.isData3DTexture)d.setTexture3D(v,0),M0=j.TEXTURE_3D;else if(v.isDataArrayTexture||v.isCompressedArrayTexture)d.setTexture2DArray(v,0),M0=j.TEXTURE_2D_ARRAY;else d.setTexture2D(v,0),M0=j.TEXTURE_2D;B.activeTexture(j.TEXTURE0),B.pixelStorei(j.UNPACK_FLIP_Y_WEBGL,v.flipY),B.pixelStorei(j.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),B.pixelStorei(j.UNPACK_ALIGNMENT,v.unpackAlignment);let j8=B.getParameter(j.UNPACK_ROW_LENGTH),d0=B.getParameter(j.UNPACK_IMAGE_HEIGHT),l8=B.getParameter(j.UNPACK_SKIP_PIXELS),J9=B.getParameter(j.UNPACK_SKIP_ROWS),L9=B.getParameter(j.UNPACK_SKIP_IMAGES);B.pixelStorei(j.UNPACK_ROW_LENGTH,Y8.width),B.pixelStorei(j.UNPACK_IMAGE_HEIGHT,Y8.height),B.pixelStorei(j.UNPACK_SKIP_PIXELS,z0),B.pixelStorei(j.UNPACK_SKIP_ROWS,S0),B.pixelStorei(j.UNPACK_SKIP_IMAGES,b0);let Z6=L.isDataArrayTexture||L.isData3DTexture,t0=v.isDataArrayTexture||v.isData3DTexture;if(L.isDepthTexture){let G8=T.get(L),V9=T.get(v),Q8=T.get(G8.__renderTarget),B9=T.get(V9.__renderTarget);B.bindFramebuffer(j.READ_FRAMEBUFFER,Q8.__webglFramebuffer),B.bindFramebuffer(j.DRAW_FRAMEBUFFER,B9.__webglFramebuffer);for(let K6=0;K6<V0;K6++){if(Z6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(L).__webglTexture,g,b0+K6),j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,T.get(v).__webglTexture,q0,U8+K6);j.blitFramebuffer(z0,S0,R0,E0,I0,a0,R0,E0,j.DEPTH_BUFFER_BIT,j.NEAREST)}B.bindFramebuffer(j.READ_FRAMEBUFFER,null),B.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(g!==0||L.isRenderTargetTexture||T.has(L)){let G8=T.get(L),V9=T.get(v);B.bindFramebuffer(j.READ_FRAMEBUFFER,c),B.bindFramebuffer(j.DRAW_FRAMEBUFFER,b);for(let Q8=0;Q8<V0;Q8++){if(Z6)j.framebufferTextureLayer(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,G8.__webglTexture,g,b0+Q8);else j.framebufferTexture2D(j.READ_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,G8.__webglTexture,g);if(t0)j.framebufferTextureLayer(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,V9.__webglTexture,q0,U8+Q8);else j.framebufferTexture2D(j.DRAW_FRAMEBUFFER,j.COLOR_ATTACHMENT0,j.TEXTURE_2D,V9.__webglTexture,q0);if(g!==0)j.blitFramebuffer(z0,S0,R0,E0,I0,a0,R0,E0,j.COLOR_BUFFER_BIT,j.NEAREST);else if(t0)j.copyTexSubImage3D(M0,q0,I0,a0,U8+Q8,z0,S0,R0,E0);else j.copyTexSubImage2D(M0,q0,I0,a0,z0,S0,R0,E0)}B.bindFramebuffer(j.READ_FRAMEBUFFER,null),B.bindFramebuffer(j.DRAW_FRAMEBUFFER,null)}else if(t0)if(L.isDataTexture||L.isData3DTexture)j.texSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,L8,Y8.data);else if(v.isCompressedArrayTexture)j.compressedTexSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,Y8.data);else j.texSubImage3D(M0,q0,I0,a0,U8,R0,E0,V0,r0,L8,Y8);else if(L.isDataTexture)j.texSubImage2D(j.TEXTURE_2D,q0,I0,a0,R0,E0,r0,L8,Y8.data);else if(L.isCompressedTexture)j.compressedTexSubImage2D(j.TEXTURE_2D,q0,I0,a0,Y8.width,Y8.height,r0,Y8.data);else j.texSubImage2D(j.TEXTURE_2D,q0,I0,a0,R0,E0,r0,L8,Y8);if(B.pixelStorei(j.UNPACK_ROW_LENGTH,j8),B.pixelStorei(j.UNPACK_IMAGE_HEIGHT,d0),B.pixelStorei(j.UNPACK_SKIP_PIXELS,l8),B.pixelStorei(j.UNPACK_SKIP_ROWS,J9),B.pixelStorei(j.UNPACK_SKIP_IMAGES,L9),q0===0&&v.generateMipmaps)j.generateMipmap(M0);B.unbindTexture()},this.initRenderTarget=function(L){if(T.get(L).__webglFramebuffer===void 0)d.setupRenderTarget(L)},this.initTexture=function(L){if(L.isCubeTexture)d.setTextureCube(L,0);else if(L.isData3DTexture)d.setTexture3D(L,0);else if(L.isDataArrayTexture||L.isCompressedArrayTexture)d.setTexture2DArray(L,0);else d.setTexture2D(L,0);B.unbindTexture()},this.resetState=function(){u=0,m=0,f=null,B.reset(),Y0.reset()},typeof __THREE_DEVTOOLS__<"u")__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return nQ}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(J){this._outputColorSpace=J;let Q=this.getContext();Q.drawingBufferColorSpace=g0._getDrawingBufferColorSpace(J),Q.unpackColorSpace=g0._getUnpackColorSpace()}}var j$=`
varying vec2 vUv;
void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;var RK=`
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
}`,kK=`
uniform float uScale;uniform float uContext;
attribute vec2 center;
attribute vec3 tint;
attribute vec4 nodeState;
attribute float order;
varying vec2 vUv;varying vec3 vTint;varying vec4 vState;varying float vOrder;
void main(){vUv=uv;vTint=tint;vState=nodeState;vOrder=order;
gl_Position=projectionMatrix*modelViewMatrix*vec4(position.xy*(uContext>0.?max(86.,74./uScale):86.)+center,1.,1.);}`,LK=`

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
}`,VK=`
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
}`,BK=`

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
}`,zK=`
uniform float uDpr;
attribute vec3 tint;attribute vec4 leafMeta;attribute float leafCluster;attribute float leafLife;
varying vec3 vTint;varying vec4 vMeta;varying float vCluster;varying float vLife;
uniform float uContext;
void main(){vTint=tint;vMeta=leafMeta;vCluster=leafCluster;vLife=leafLife;gl_PointSize=(uContext>1.?23.:17.)*uDpr;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,IK=`

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
}`,_K=`

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
}`;var CK=`
attribute float along;attribute float order;
varying float vAlong;varying float vOrder;
void main(){vAlong=along;vOrder=order;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,AK=`

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
gl_FragColor=vec4(vec3(.57,.57,.51),(.036+glint*.06)*reveal(.05,.6));}`;var PK=(J)=>Math.min(1,Math.max(0,J)),B1=(J,Q,$)=>{let W=PK(($-J)/(Q-J));return W*W*(3-2*W)};function S8(J,Q,$=0,W=0,Z=7){let K=Math.min(1,Math.max(0,$)/Math.max(1,Z-1)),H=Q==="sun"?0:Q==="connector"?0.18:Q==="collection"?0.23+K*0.2:Q==="group"?0.45+K*0.12:0.63+K*0.09+Math.max(0,W)/(Math.max(0,W)+8)*0.14;return B1(H,H+(Q==="sun"?0.2:0.12),J)}class GJ{constructor(){this.progress=1,this.playing=!1,this.duration=4200,this.rate=1}set({progress:J,playing:Q,duration:$,rate:W}={}){if(Number.isFinite(J))this.progress=PK(J);if(Number.isFinite($))this.duration=Math.max(500,Math.min(60000,$));if(Number.isFinite(W))this.rate=Math.max(0.25,Math.min(4,W));if(typeof Q==="boolean")this.playing=Q&&this.progress<1;if(this.progress===1)this.playing=!1;return this.snapshot()}advance(J){if(this.playing)this.set({progress:this.progress+Math.max(0,J)*this.rate/this.duration});return this.progress}snapshot(){let J=this.progress;return{progress:J,playing:this.playing,duration:this.duration,rate:this.rate,phase:J<0.23?"sun":J<0.63?"collections":J<1?"skills":"complete",visualOnly:!0}}}class NJ{constructor(J=360){this.values=new Float32Array(J),this.clear()}clear(){this.count=0,this.cursor=0}add(J){this.values[this.cursor]=J,this.cursor=(this.cursor+1)%this.values.length,this.count=Math.min(this.count+1,this.values.length)}percentile(J){if(!this.count)return null;let Q=this.values.slice(0,this.count).sort();return Math.round(Q[Math.floor((this.count-1)*J)]*100)/100}}function v$(J,Q){return Math.min(Math.max(1,J||1),Q?1:1.5)}class f${constructor(){this.reset()}reset(){this.frames=0,this.slow=0,this.degraded=!1}observe(J,Q){if(this.degraded)return!1;if(this.frames++,J>52||Q>10)this.slow++;if(this.frames<90)return!1;let $=this.slow>18;return this.frames=0,this.slow=0,this.degraded=$,$}}function wK(J){return Math.max(105,Math.max(0,J)*5.4)}function TK(J,Q,$,W=90,Z=1,K=0){let H=Q+$*Math.PI*2/W*Z,Y=J+Math.sin($*Math.PI*2/37)*K;return{x:Math.cos(H)*Y,y:Math.sin(H)*Y,radius:Y}}var h$={};S6(h$,{visibleCount:()=>SK,skillName:()=>W6,separateSpecialists:()=>b$,sampleGroups:()=>y$,plan:()=>C1,identity:()=>r8,identities:()=>EJ,hierarchyPlan:()=>_1,hash:()=>Q6,fitCamera:()=>I1,catalogGroups:()=>e6,boundsOf:()=>$6});var EJ={ads:{angle:-140,color:"#dba17c"},code:{angle:-43,color:"#91b5ed"},contents:{angle:3,color:"#7bc8b4"},"customer-finder":{angle:-184,color:"#d9c276"},"cyber-security":{angle:139,color:"#b29bd7"},marketing:{angle:43,color:"#92c399"},"personal-branding":{angle:92,color:"#d49cae"}};function Q6(J){let Q=2166136261;for(let $ of J)Q=Math.imul(Q^$.charCodeAt(0),16777619);return Q>>>0}function r8(J){if(Object.prototype.hasOwnProperty.call(EJ,J))return EJ[J];let Q=Q6(J)%360,$=0.38,W=0.64,Z=$*Math.min(W,1-W),K=(H)=>{let Y=(H+Q/30)%12;return Math.round(255*(W-Z*Math.max(-1,Math.min(Y-3,9-Y,1)))).toString(16).padStart(2,"0")};return{angle:Q6(J)%360,color:`#${K(0)}${K(8)}${K(4)}`}}function SK(J,Q,$=3,W=1){if(W<=0.500001)return 0;let Z=Math.max(0,Math.min(6,Number($)||0)-3);return Math.min(J,(Q?50:10)+Z*(Q?12:4))}var z1=["A–C","D–F","G–I","J–L","M–O","P–R","S–U","V–Z","#"];function W6(J){return J.path.split("/").at(-2).replace(/-/g," ")}function e6(J,Q){let $=`SISTEMA/skills/${J}/`,W=new Map;for(let H of Q){if(H.directory||H.name!=="SKILL.md"||!H.path.startsWith($))continue;let Y=H.path.slice($.length).split("/"),X=Y.slice(0,-2).join("/"),U=X&&Y.at(-3)!=="skills",E=W6(H).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toUpperCase().charCodeAt(0),N=E>=65&&E<=90?Math.min(7,Math.floor((E-65)/3)):8,G=U?`folder:${X}`:`alphabet:${N}`;if(!W.has(G))W.set(G,{id:`${J}/${G}`,parent:J,name:U?X:z1[N],kind:U?"folder":"alphabet",originPath:U?$+X:$.slice(0,-1),skills:[]});W.get(G).skills.push(H)}let Z=[...W.values()].sort((H,Y)=>H.id.localeCompare(Y.id)),K=new Map;return Z.map((H)=>{let Y=Z.filter((U)=>U.name===H.name).length,X=(K.get(H.name)||0)+1;return K.set(H.name,X),{...H,name:Y>1?`${H.name} · ${X}`:H.name,skills:H.skills.sort((U,E)=>U.path.localeCompare(E.path))}})}function y$(J,Q,$=null,W=0,Z=50,K=null){let H=new Map(J.map((U)=>[U.id,[]])),Y=0;for(let U=0;Y<Q;U++){let E=!1;for(let N of J)if(Y<Q&&U<N.skills.length)H.get(N.id).push(N.skills[U]),Y++,E=!0;if(!E)break}let X=J.find((U)=>U.id===$);if(X){let U=Math.min(W*Z,Math.max(0,X.skills.length-Z));H.set(X.id,X.skills.slice(U,U+Z))}if(K){let U=J.find((E)=>E.skills.some((N)=>N.path===K));if(U&&!H.get(U.id).some((E)=>E.path===K))H.get(U.id).push(U.skills.find((E)=>E.path===K))}return H}function $6(J,Q=30){if(!J.length)J=[{x:0,y:0}];return{minX:Math.min(...J.map(($)=>$.x))-Q,maxX:Math.max(...J.map(($)=>$.x))+Q,minY:Math.min(...J.map(($)=>$.y))-Q,maxY:Math.max(...J.map(($)=>$.y))+Q}}function I1(J,Q,$,W=48,Z=18,K=1/0){let H=Math.max(0.025,Math.min(K,(Q-Z*2)/Math.max(1,J.maxX-J.minX),($-W-Z*2)/Math.max(1,J.maxY-J.minY)));return{x:Q/2-(J.minX+J.maxX)*H/2,y:($+W)/2-(J.minY+J.maxY)*H/2,k:H}}function b$(J,Q=250,$=168){for(let W=0;W<24;W++){let Z=!1;for(let K=0;K<J.length;K++)for(let H=K+1;H<J.length;H++){let Y=J[K],X=J[H],U=X.x-Y.x,E=X.y-Y.y,N=Math.hypot(U,E);if(N>=$)continue;let G=N>0.001?Math.atan2(E,U):Q6(Y.id+"|"+X.id)%6283/1000,F=($-N)/2+0.05,O=Math.cos(G)*F,V=Math.sin(G)*F;Y.x-=O,Y.y-=V,X.x+=O,X.y+=V,Z=!0}for(let K of J){let H=Math.hypot(K.x,K.y);if(H>=Q)continue;let Y=H>0.001?Math.atan2(K.y,K.x):r8(K.id).angle*Math.PI/180;K.x=Math.cos(Y)*Q,K.y=Math.sin(Y)*Q,Z=!0}if(!Z)break}for(let W of J)W.angle=Math.atan2(W.y,W.x);return J}function jK(J,Q,$){let W=e6(J.id,Q),Z={...J,x:0,y:0,angle:-Math.PI/2,color:r8(J.id).color,skills:W.flatMap((k)=>k.skills),groups:W},K=$.group?W.filter((k)=>k.id===$.group):W,H=$.group?K.flatMap((k)=>k.skills):(J.skills||Z.skills).slice().sort((k,I)=>k.path<I.path?-1:k.path>I.path?1:0),Y=Math.max(1,Math.ceil(H.length/50)),X=Math.min(Y-1,Math.max(0,Number.isFinite(Number($.page))?Math.floor(Number($.page)):0)),U=new Set(H.slice(X*50,(X+1)*50).map((k)=>k.path)),E=$.fullCatalog?new Map(K.map((k)=>[k.id,k.skills.filter((I)=>U.has(I.path))])):y$(K,50,$.group,$.page||0,50);if($.leaf&&!Array.from(E.values()).flat().some((k)=>k.path===$.leaf)){let k=K.find((I)=>I.skills.some((C)=>C.path===$.leaf));if(k){let I=Array.from(E.values());if(I.flat().length>=50)I.findLast((C)=>C.length)?.pop();E.get(k.id).push(k.skills.find((C)=>C.path===$.leaf))}}let N=K.filter((k)=>E.get(k.id).length),G=[],F=[],O=Math.PI*2,V=Math.max(180,N.length*27),D=-Math.PI/2;for(let[k,I]of N.entries()){let C=E.get(I.id),w=O/Math.max(1,N.length),R=D+w/2,z=N.length===1,p={...I,x:z?0:Math.cos(R)*V,y:z?0:Math.sin(R)*V,rootMembership:z,angle:R,index:k,focused:I.id===$.group,source:Z.id,visibleCount:C.length};G.push(p);let P=0,y=0,c=V+120;for(let[b,u]of C.entries()){let m=Math.max(1,Math.floor(c*Math.max(0.08,w-0.12)/65));if(P>=m)P=0,y++,c+=85;let f=Math.max(1,Math.floor(c*Math.max(0.08,w-0.12)/65)),a=C.length-b+P,e=Math.min(f,a),J0=R+(P-(e-1)/2)*(w-0.12)/Math.max(1,e);F.push({id:u.path,parent:Z.id,group:I.id,source:I.id,x:Math.cos(J0)*c,y:Math.sin(J0)*c,custom:!1,name:W6(u),index:F.length,localIndex:b,depth:2,route:null,angle:J0,dir:Math.cos(J0)>=0?1:-1}),P++}D+=w}let q=[Z,...G,...F],_=Math.max(220,...q.map((k)=>Math.max(Math.abs(k.x),Math.abs(k.y))))+90,A={minX:-_,maxX:_,minY:-_,maxY:_};return{nodes:[Z],groups:G,leaves:F,bounds:A,focusBounds:A,dedicated:!0,total:H.length,pages:Y,page:X}}function _1(J,Q={},$={},W=248){let Z=J.specialistByID.get(Q.specialist);if(Z){let _=jK(Z,Z.skills,{...Q,fullCatalog:!0});return Object.assign(_.nodes[0],{kind:"specialist",department:Z.department,parent:null,empty:Z.empty,state:Z.state}),{..._,hierarchy:!0,route:{...Q,page:_.page}}}let K=J.departmentByID.get(Q.department),H=[],Y=[],X=(_,A,k,I=null)=>({..._,x:A,y:k,angle:Math.atan2(k,A),parent:I,groups:_.groups||[]}),U=(_)=>{let A=$.nodes?.[_];return A&&Number.isFinite(A.x)&&Number.isFinite(A.y)?A:null};if(!K){let _=J.departments.filter((w)=>!w.fallback||w.specialistCount||J.departments.length===1),A=_.reduce((w,R)=>w+Math.max(2,R.specialistCount),0),k=Math.max(300,W,_.length*85),I=-Math.PI;for(let w of _){let R=Math.PI*2*Math.max(2,w.specialistCount)/Math.max(1,A),z=I+R/2;I+=R;let p=U(w.id),P=X(w,p?.x??Math.cos(z)*k,p?.y??Math.sin(z)*k);P.angle=z,H.push(P);let y=0,c=0;while(y<w.specialists.length){let b=k+155+c*135,u=Math.min(Math.PI*1.5,R*0.84),m=Math.max(1,Math.floor(b*u/125)),f=Math.min(m,w.specialists.length-y);for(let a=0;a<f;a++){let e=w.specialists[y+a],J0=z+(a-(f-1)/2)*u/f,k0=U(e.id);H.push(X(e,k0?.x??Math.cos(J0)*b,k0?.y??Math.sin(J0)*b,w.id))}y+=f,c++}}b$(H,Math.max(250,k-20),112);let C=$6([{x:-150,y:-150},{x:150,y:150},...H],70);return{nodes:H,groups:[],leaves:[],bounds:C,focusBounds:C,dedicated:!1,hierarchy:!0,route:{kind:"global",department:null,specialist:null,group:null,leaf:null,page:0},total:J.skillCount,pages:1,page:0}}let E=K.skills.length,N=Math.max(1,Math.ceil(E/50)),G=Math.min(N-1,Math.max(0,Number.isFinite(Number(Q.page))?Math.floor(Number(Q.page)):0)),F=K.skills.slice(G*50,(G+1)*50),O=K.specialists;H.push(X(K,0,0));let V=Math.max(260,O.length*70),D=Math.PI*2;for(let[_,A]of O.entries()){let k=-Math.PI/2+_*D/Math.max(1,O.length),I=X(A,Math.cos(k)*V,Math.sin(k)*V,K.id);H.push(I);let C=F.filter((p)=>J.skillByPath.get(p.path)?.specialist===A.id),w=Math.min(1.7,D/Math.max(1,O.length)*0.84),R=0,z=0;while(R<C.length){let p=V+145+z*85,P=Math.max(1,Math.floor(p*w/70)),y=Math.min(P,C.length-R);for(let c=0;c<y;c++){let b=C[R+c],u=k+(c-(y-1)/2)*w/y;Y.push({id:b.path,parent:A.id,department:K.id,group:null,source:A.id,x:Math.cos(u)*p,y:Math.sin(u)*p,angle:u,dir:Math.cos(u)>=0?1:-1,name:W6(b),index:Y.length,localIndex:R+c,depth:2,route:null,custom:!1})}R+=y,z++}}let q=$6(H.concat(Y),90);return{nodes:H,groups:[],leaves:Y,bounds:q,focusBounds:q,dedicated:!0,hierarchy:!0,route:{...Q,page:G},department:K,total:E,pages:N,page:G}}function C1(J,Q,$,W=3,Z={},K=248,H={}){let Y=J.find((q)=>q.id===$);if(Y)return jK(Y,Q,H);let X=[...J].sort((q,_)=>r8(q.id).angle-r8(_.id).angle||q.id.localeCompare(_.id)),U=X.every((q)=>Object.prototype.hasOwnProperty.call(EJ,q.id))&&X.length<=7,E=Math.max(270,X.length*34,K),N=X.map((q,_)=>{let A=(U?r8(q.id).angle:-140+_*360/X.length)*Math.PI/180,k=e6(q.id,Q),I=Z.nodes?.[q.id];return{...q,angle:A,color:r8(q.id).color,x:I?.x??Math.cos(A)*E,y:I?.y??Math.sin(A)*E,skills:k.flatMap((C)=>C.skills),groups:k}});b$(N,Math.max(250,E-20),Math.max(168,E*0.5));let G=[],F=[];for(let q of N){let _=q.id===$,A=SK(q.skills.length,_,W,1),k=y$(q.groups,A,_?H.group:null,H.page||0,50,H.leaf),I=N.filter((y)=>y!==q).map((y)=>Math.abs(Math.atan2(Math.sin(y.angle-q.angle),Math.cos(y.angle-q.angle)))),C=Math.min(1.25,(I.length?Math.min(...I):1.8)*0.82),w=_?3.45:C,R=q.groups.length,z=q.groups.reduce((y,c)=>y+Math.max(2,k.get(c.id).length),0),p=-w/2,P=_?Math.max(235,R*24):E+102;q.groups.forEach((y,c)=>{let b=w*Math.max(2,k.get(y.id).length)/Math.max(1,z),u=R<2?0:c/(R-1)-0.5,m=q.angle+(_?p+b/2:u*w);p+=b;let f=y.id===H.group&&_,a=_?q.x+Math.cos(m)*P:q.x+Math.cos(m)*P-Math.cos(q.angle)*E,e=_?q.y+Math.sin(m)*P:q.y+Math.sin(m)*P-Math.sin(q.angle)*E,J0=k.get(y.id);if(f){let D0=Math.min(5,Math.max(1,Math.ceil(J0.length/8))),l0=175+(D0-1)*205+145;a=q.x+Math.cos(q.angle)*1400-l0/2,e=q.y+Math.sin(q.angle)*1400}let k0={...y,x:a,y:e,angle:m,index:c,focused:f,source:q.id,visibleCount:k.get(y.id).length};G.push(k0),J0.forEach((D0,l0)=>{let u0,s;if(f){let K0=Math.min(5,Math.max(1,Math.ceil(J0.length/8))),H0=Math.ceil(J0.length/K0),L0=Math.floor(l0/H0),j0=l0%H0;u0=a+175+L0*205,s=e+(j0-(H0-1)/2)*66}else if(_){let K0=l0,H0=0,L0=P+105,j0=Math.max(1,Math.floor(L0*Math.max(0.12,b-0.06)/43));while(K0>=j0)K0-=j0,H0++,L0+=56,j0=Math.max(1,Math.floor(L0*Math.max(0.12,b-0.06)/43));let f0=l0-K0,y0=Math.min(j0,J0.length-f0),o0=(K0-(y0-1)/2)*Math.min(43/L0,(b-0.06)/Math.max(1,y0)),h0=m+o0;u0=q.x+Math.cos(h0)*L0,s=q.y+Math.sin(h0)*L0}else{let K0=Math.max(17,Math.min(22,(E+150)*C*0.82/Math.max(1,J0.length-1))),H0=(l0-(J0.length-1)/2)*K0,L0=50+l0%2*14;u0=a+Math.cos(m)*L0-Math.sin(m)*H0,s=e+Math.sin(m)*L0+Math.cos(m)*H0}let W0=Z.leaves?.[D0.path];F.push({id:D0.path,parent:q.id,group:y.id,source:y.id,x:W0?.x??u0,y:W0?.y??s,custom:!!W0,name:W6(D0),index:F.filter((K0)=>K0.parent===q.id).length,localIndex:l0,depth:2,route:f?{column:Math.floor(l0/Math.ceil(J0.length/Math.min(5,Math.max(1,Math.ceil(J0.length/8))))),offset:34}:null,angle:m,dir:f?1:Math.cos(q.angle)>=0?1:-1})})})}for(let q=0;q<4;q++){let _=new Map,k=[...F].sort((I,C)=>Number(C.parent===$)-Number(I.parent===$)||I.id.localeCompare(C.id));for(let I of k){if(!I.custom)for(let w=0;w<3;w++){let R=Math.floor(I.x/19),z=Math.floor(I.y/19),p=!1;for(let P=R-1;P<=R+1;P++)for(let y=z-1;y<=z+1;y++)for(let c of _.get(`${P},${y}`)||[]){if(c.parent===I.parent)continue;let b=I.x-c.x,u=I.y-c.y,m=Math.hypot(b,u);if(m<19){let f=m>0.001?Math.atan2(u,b):Q6(I.id)*0.001;I.x+=Math.cos(f)*(19-m+0.1),I.y+=Math.sin(f)*(19-m+0.1),p=!0}}if(!p)break}let C=`${Math.floor(I.x/19)},${Math.floor(I.y/19)}`;if(!_.has(C))_.set(C,[]);_.get(C).push(I)}}let O=[{x:-150,y:-150},{x:150,y:150}],V=$6([...O,...N,...G,...F],35),D=H.group?[...G.filter((q)=>q.id===H.group),...F.filter((q)=>q.group===H.group)]:$?[...O,...N.filter((q)=>q.id===$),...G.filter((q)=>q.parent===$),...F.filter((q)=>q.parent===$)]:[...O,...N,...G,...F];if(H.group){let q=F.filter((_)=>_.group===H.group);if(q.length)D.push({x:Math.max(...q.map((_)=>_.x))+145,y:Math.min(...q.map((_)=>_.y))-62})}return{nodes:N,groups:G,leaves:F,bounds:V,focusBounds:$6(D,H.group?42:38)}}var m$={};S6(m$,{tooltip:()=>FJ,resolve:()=>OJ,plan:()=>p$,orbitPlugins:()=>A1,orbit:()=>P1,label:()=>hK,internalConnectors:()=>vK,colorFor:()=>qJ,children:()=>bK,areas:()=>DJ,areaEntries:()=>yK,areaDefinitions:()=>fK});var vK=new Set(["connector_openai_codex_document_control","connector_openai_hotline","connector_openai_safety_settings"]);function A1(J=[]){return J.filter((Q)=>Q.status==="connected"&&!vK.has(Q.id)).sort((Q,$)=>Q.id.localeCompare($.id))}var fK=[{id:"personal",name:"Pessoal",path:"AREAS/pessoal",color:"#D4A1CC",aliases:["pessoal","personal"]},{id:"professional",name:"Profissional",path:"AREAS/profissional",color:"#83B9D7",aliases:["profissional","professional"]}],g$=(J,Q)=>J===Q||J.startsWith(Q+"/"),x$=(J)=>String(J).normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();function DJ(J=[]){return fK.map((Q)=>{let $=J.filter((Y)=>Y.directory).map((Y)=>Y.path),W=$.find((Y)=>x$(Y)===x$(Q.path)),Z=$.find((Y)=>!Y.includes("/")&&Q.aliases.includes(x$(Y))),K=W||Z||Q.path,H=J.filter((Y)=>g$(Y.path,K)&&Y.path!==K);return{...Q,path:K,exists:!!W||!!Z||H.length>0,notes:H.filter((Y)=>!Y.directory).length,folders:H.filter((Y)=>Y.directory).length}})}function qJ(J){return J.color}function yK(J,Q){return J.filter(($)=>$.path!==Q.path&&g$($.path,Q.path))}function bK(J,Q){return J.filter(($)=>$.path.slice(0,$.path.lastIndexOf("/"))===Q).sort(($,W)=>Number(W.directory)-Number($.directory)||$.path.localeCompare(W.path))}function hK(J){return J.name?.replace(/\.md$/i,"")||J.path.split("/").at(-1).replace(/\.md$/i,"")}function FJ(J,Q,$){let W=J.path===Q.path?Q.name:Q.name+" › "+J.path.slice(Q.path.length+1).replace(/\.md$/i,"").split("/").join(" › ");if(J.path===Q.path&&!Q.exists)return`${W} · Pasta ainda não criada no Obsidian`;let Z=J.directory?$.filter((K)=>!K.directory&&K.path.startsWith(J.path+"/")).length:0;return`${W} · ${J.directory?`Pasta · ${Z} ${Z===1?"nota":"notas"}`:"Nota"}`}function P1(J=[],Q=105){let $=DJ(J),W=$.map((E)=>({...E,name:E.name,directory:!0,area:E.id,root:!0,color:E.color})),Z=$.map((E)=>yK(J,E).sort((N,G)=>N.path.split("/").length-G.path.split("/").length||N.path.localeCompare(G.path)));for(let E=0;W.length<50;E++){let N=!1;for(let G=0;G<$.length&&W.length<50;G++){let F=Z[G][E];if(F)W.push({...F,area:$[G].id,color:qJ($[G],F.path)}),N=!0}if(!N)break}let K=Q+58,H=[K],Y=W.slice(0,2).map((E,N)=>({...E,x:0,y:(N?1:-1)*K,r:10,tooltip:FJ(E,$[N],J)})),X=2,U=1;while(X<W.length){let E=Q+58+U*38,N=Math.max(12,Math.floor(2*Math.PI*E/34)),G=Math.min(N,W.length-X);H.push(E);for(let F=0;F<G;F++){let O=W[X+F],V=-Math.PI/2+F*2*Math.PI/G+(U%2?0.12:0),D=$.find((q)=>q.id===O.area);Y.push({...O,x:Math.cos(V)*E,y:Math.sin(V)*E,r:O.root?10:6.5,tooltip:FJ(O,D,J)})}X+=G,U++}return{areas:$,points:Y,rings:H,radius:H.at(-1)||Q+58}}function OJ(J,Q,$=DJ(J)){let W=$.find((Y)=>Y.id===Q.area)||$[0],Z=String(Q.path||W.path),K=g$(Z,W.path)&&!Z.split("/").includes(".."),H=Z===W.path||J.some((Y)=>Y.directory&&Y.path===Z);return{...Q,area:W.id,path:K&&H?Z:W.path,page:Math.max(0,Number(Q.page)||0)}}function p$(J,Q,$=DJ(J)){let W=OJ(J,Q,$),Z=$.find((F)=>F.id===W.area),K=bK(J,W.path),H=Math.max(1,Math.ceil(K.length/50));W.page=Math.min(W.page,H-1);let Y=K.slice(W.page*50,W.page*50+50),X="knowledge:"+W.path,U={id:X,name:W.path===Z.path?Z.name:W.path.split("/").at(-1),icon:"folder",x:0,y:0,angle:-Math.PI/2,color:W.path===Z.path?Z.color:qJ(Z,W.path),skills:J.filter((F)=>!F.directory&&F.path.startsWith(W.path+"/")),groups:[],knowledge:!0},E=Y.map((F,O)=>{let V=Math.floor(O/24),D=Math.min(24,Y.length-V*24),q=-Math.PI/2+O%24*Math.PI*2/D,_=260+V*105;return{id:F.path,parent:X,group:null,source:X,name:hK(F),x:Math.cos(q)*_,y:Math.sin(q)*_,angle:q,dir:Math.cos(q)>=0?1:-1,index:O,localIndex:O,depth:1,route:null,custom:!1,knowledge:!0,directory:!!F.directory,area:Z.id,color:qJ(Z,F.path),tooltip:FJ(F,Z,J)}}),N=Math.max(260,...E.map((F)=>Math.max(Math.abs(F.x),Math.abs(F.y))))+90,G=$6([{x:-N,y:-N},{x:N,y:N}],0);return{nodes:[U],groups:[],leaves:E,bounds:G,focusBounds:G,dedicated:!0,route:W,area:Z,total:K.length,pages:H}}var u$={};S6(u$,{rootPath:()=>t8,resolve:()=>T1,plan:()=>S1,orbit:()=>w1,inventory:()=>RJ,definition:()=>MJ,contains:()=>l$});var t8="SISTEMA/prompts",MJ={id:"prompts",name:"Prompts",path:t8,color:"#CEC08B"},l$=(J)=>typeof J==="string"&&(J===t8||J.startsWith(t8+"/"))&&!J.split("/").some((Q)=>Q===".."||Q==="."),xK=(J)=>J.slice(0,J.lastIndexOf("/")),d$=(J)=>J===t8?"Prompts":J.split("/").at(-1).replace(/\.md$/i,"").replace(/[-_]+/g," "),gK=(J,Q)=>J.path.localeCompare(Q.path,"pt-BR");function RJ(J=[]){let Q=new Map,$=new Map,W=(Y)=>{for(let X=Y;l$(X);X=xK(X)){if($.has(X))break;$.set(X,{path:X,name:d$(X),directory:!0})}};for(let Y of J){if(!l$(Y.path))continue;if(Y.directory)W(Y.path);else if(/\.md$/i.test(Y.path))Q.set(Y.path,Y),W(xK(Y.path))}let Z=[...$.values()].filter((Y)=>Y.path!==t8).sort((Y,X)=>Y.path.split("/").length-X.path.split("/").length||gK(Y,X)),K=[...Q.values()].sort(gK);return{area:{...MJ,exists:$.has(t8),notes:K.length,folders:Z.length},directories:Z,documents:K,entries:[...$.values(),...K]}}function pK(J,Q){if(J.path===t8)return`Prompts · ${Q.area.folders} pastas · ${Q.area.notes} prompts · ${t8}`;let $=J.path.slice(t8.length+1).replace(/\.md$/i,"").split("/").join(" › "),W=J.directory?Q.documents.filter((Z)=>Z.path.startsWith(J.path+"/")).length:0;return`Prompts › ${$} · ${J.directory?`Pasta · ${W} ${W===1?"prompt":"prompts"}`:"Prompt Markdown"}`}function w1(J=[],Q=163){let $=RJ(J);if(!$.area.exists)return{area:$.area,points:[],rings:[],radius:0,total:0,visible:0};let W=[{path:t8,name:"Prompts",directory:!0,root:!0}];for(let Y=0;Y<Math.max($.directories.length,$.documents.length);Y++){if($.directories[Y])W.push($.directories[Y]);if($.documents[Y])W.push($.documents[Y])}let Z=W.slice(0,50),K=[],H=[];for(let Y=0,X=0;Y<Z.length;X++){let U=Q+38*(X+1),E=Math.max(12,Math.floor(2*Math.PI*U/34)),N=Math.min(E,Z.length-Y);H.push(U);for(let G=0;G<N;G++){let F=Z[Y+G],O=-Math.PI/2+Math.PI/8+G*Math.PI*2/N;K.push({...F,area:"prompts",x:Math.cos(O)*U,y:Math.sin(O)*U,r:F.root?10:6.5,color:MJ.color,tooltip:pK(F,$)})}Y+=N}if(W.length>Z.length)K[0].tooltip+=` · ${Z.length-1} de ${W.length-1} itens no mapa; abra para explorar todos`;return{area:$.area,points:K,rings:H,radius:H.at(-1),total:W.length-1,visible:Z.length-1}}function T1(J,Q){let $=RJ(J);return OJ($.entries,{...Q,area:"prompts"},[$.area])}function S1(J,Q){let $=RJ(J),W=p$($.entries,{...Q,area:"prompts"},[$.area]);W.nodes[0].name=d$(W.route.path);for(let Z of W.leaves)Z.name=d$(Z.id),Z.color=MJ.color,Z.tooltip=pK({path:Z.id,directory:Z.directory},$);return W}var n$={};S6(n$,{starField:()=>j1,expandingRings:()=>v1,RING_PERIOD:()=>mK,RING_COUNT:()=>c$});var c$=7,mK=48,J7=(J)=>{let Q=Q6(J);return Q=Math.imul(Q^Q>>>16,2146121005),Q=Math.imul(Q^Q>>>15,2221713035),((Q^Q>>>16)>>>0)/4294967296};function j1(J,Q){if(!Number.isFinite(J)||!Number.isFinite(Q)||J<=0||Q<=0)return[];let $=Math.max(72,Math.sqrt(J*Q/400)),W=Math.ceil(J/$),Z=Math.ceil(Q/$),K=[];for(let H=0;H<Z;H++)for(let Y=0;Y<W;Y++){let X=`oracle-star:${Y}:${H}`,U=J7(X+":bright")>0.95,E=(Y+0.1+J7(X+":x")*0.8)*$,N=(H+0.1+J7(X+":y")*0.8)*$;if(E>=J-2||N>=Q-2)continue;K.push({x:E,y:N,r:U?1.05:0.45+J7(X+":size")*0.4,opacity:U?0.47:0.13+J7(X+":opacity")*0.24})}return K}function v1(J,Q=0){let $=Number.isFinite(J)?Math.max(0,J):0,W=Number.isFinite(Q)?Math.max(0,Q):0,Z=Math.max(360,$*1.5);return Array.from({length:c$},(K,H)=>{let Y=(W/mK+H/c$)%1,X=Math.min(1,Y/0.075);return{r:$+22+Y*Z,opacity:0.075*X*X*(3-2*X)*Math.pow(1-Y,1.7)}})}var e$={};S6(e$,{validateManifest:()=>o$,selectionForSkill:()=>h1,search:()=>b1,resolveSelection:()=>uK,paginate:()=>t$,normalize:()=>k9,createCatalog:()=>y1,collectionForEntry:()=>dK,PAGE_SIZE:()=>kJ,FALLBACK_MANIFEST:()=>s$});var kJ=50,s$=Object.freeze({schema_version:1,fallback_department:"department/other",departments:Object.freeze([Object.freeze({id:"department/other",name:"Outros especialistas",icon:"tool",color:"#a6adb8",collection_ids:Object.freeze([]),aliases:Object.freeze([])})])}),a$=(J)=>typeof J==="string"&&!!J.trim()&&!/[\u0000-\u001f\u007f]/.test(J),r$=(J)=>a$(J)&&J!=="."&&J!==".."&&!/[\\/]/.test(J),k9=(J)=>String(J??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim().replace(/[\s_-]+/g," "),i$=(J,Q)=>J<Q?-1:J>Q?1:0,lK=(J)=>Number.isFinite(Number(J))?Math.max(0,Math.floor(Number(J))):0;function o$(J){let Q=[],$=new Set,W=new Map;if(!J||typeof J!=="object"||Array.isArray(J))return{valid:!1,errors:["Manifest must be an object."],manifest:null};if(J.schema_version!==1)Q.push("Unsupported department schema_version; expected 1.");if(!Array.isArray(J.departments)||!J.departments.length)Q.push("departments must be a nonempty array.");let Z=[];for(let[K,H]of(Array.isArray(J.departments)?J.departments:[]).entries()){let Y=`departments[${K}]`;if(!H||typeof H!=="object"||Array.isArray(H)){Q.push(`${Y} must be an object.`);continue}if(typeof H.id!=="string"||!/^department\/[a-z0-9][a-z0-9-]*$/.test(H.id))Q.push(`${Y}.id must use the department/<slug> namespace.`);if($.has(H.id))Q.push(`${Y}.id is duplicated: ${H.id}.`);if($.add(H.id),!a$(H.name))Q.push(`${Y}.name must be a nonempty label.`);if(H.icon!==void 0&&(typeof H.icon!=="string"||!/^[a-z][a-z0-9-]*$/i.test(H.icon)))Q.push(`${Y}.icon is invalid.`);if(H.color!==void 0&&(typeof H.color!=="string"||!/^#[0-9a-f]{6}$/i.test(H.color)))Q.push(`${Y}.color must be #RRGGBB.`);for(let X of["collection_ids","aliases"]){if(!Array.isArray(H[X])){Q.push(`${Y}.${X} must be an array.`);continue}for(let U of H[X]){if(!r$(U)){Q.push(`${Y}.${X} contains an invalid selector.`);continue}let E=k9(U),N=W.get(E);if(N&&N!==H.id)Q.push(`Ambiguous selector ${U}: ${N} and ${H.id}.`);W.set(E,H.id)}}Z.push({id:H.id,name:H.name,icon:H.icon||"folder",color:H.color||"#a6adb8",collection_ids:Array.isArray(H.collection_ids)?[...new Set(H.collection_ids)]:[],aliases:Array.isArray(H.aliases)?[...new Set(H.aliases)]:[]})}if(!$.has(J.fallback_department))Q.push("fallback_department must reference a declared department.");return{valid:!Q.length,errors:Q,manifest:Q.length?null:{schema_version:1,fallback_department:J.fallback_department,departments:Z}}}function dK(J){if(!J||typeof J.path!=="string")return null;let Q=J.path.split("/");if(Q.length<3||Q[0]!=="SISTEMA"||Q[1]!=="skills"||!Q.every(r$))return null;if(Q.length===3&&!J.directory)return null;return Q[2]}function f1(J){let Q=[],$=J.filter((W)=>W.skills.length);for(let W=0;$.length;W++){let Z=[];for(let K of $)if(Q.push(K.skills[W]),K.skills.length>W+1)Z.push(K);$=Z}return Q}function y1(J=[],Q=[],$=s$){let W=o$($),Z=W.manifest||o$(s$).manifest,K=new Map,H=new Map,Y=new Map,X=new Map;for(let O of Z.departments){for(let V of O.collection_ids)K.set(V,O.id);for(let V of[...O.collection_ids,...O.aliases])H.set(k9(V),O.id)}for(let O of J)if(O&&r$(O.id)&&!Y.has(O.id))Y.set(O.id,O);for(let O of Q){let V=dK(O);if(!V)continue;if(!X.has(V))X.set(V,new Map);if(!O.directory&&O.name==="SKILL.md"&&O.path.endsWith("/SKILL.md"))X.get(V).set(O.path,O)}let U=[...X].sort(([O],[V])=>i$(O,V)).map(([O,V])=>{let D=Y.get(O),q=a$(D?.name)?D.name:O.replace(/[-_]/g," "),_=e6(O,[...V.values()]),A=K.get(O)||H.get(k9(O))||H.get(k9(q))||Z.fallback_department,k=[...V.values()].sort((I,C)=>i$(I.path,C.path));return{id:O,name:q,icon:D?.icon||"tool",color:r8(O).color,kind:"specialist",department:A,originPath:`SISTEMA/skills/${O}`,groups:_,skills:k,skillCount:k.length,empty:!k.length,state:k.length?"ready":"empty",assignment:K.has(O)?"manifest-id":H.has(k9(O))||H.has(k9(q))?"manifest-alias":"fallback"}}),E=Z.departments.map((O)=>{let V=U.filter((q)=>q.department===O.id),D=f1(V);return{...O,kind:"department",specialists:V,skills:D,skillCount:D.length,specialistCount:V.length,empty:!V.length,state:!V.length?"empty":!D.length?"no-skills":"ready",fallback:O.id===Z.fallback_department}}),N=new Map(U.map((O)=>[O.id,O])),G=new Map(E.map((O)=>[O.id,O])),F=new Map;for(let O of U)for(let V of O.skills)F.set(V.path,{entry:V,path:V.path,name:W6(V),specialist:O.id,department:O.department});return{schema_version:1,departments:E,specialists:U,specialistByID:N,departmentByID:G,skillByPath:F,skillCount:F.size,manifestValid:W.valid,manifestErrors:W.errors}}function t$(J,Q=0,$=kJ){let W=Math.min(200,Math.max(1,lK($)||kJ)),Z=Math.max(1,Math.ceil(J.length/W)),K=Math.min(lK(Q),Z-1);return{rows:J.slice(K*W,(K+1)*W),total:J.length,pages:Z,page:K,pageSize:W}}function b1(J,Q="",$={}){let W=k9(Q).split(" ").filter(Boolean),Z=[...J.skillByPath.values()].filter((K)=>{if($.department&&K.department!==$.department||$.specialist&&K.specialist!==$.specialist)return!1;let H=k9([K.name,K.path,J.specialistByID.get(K.specialist).name,J.departmentByID.get(K.department).name].join(" "));return W.every((Y)=>H.includes(Y))}).sort((K,H)=>i$(K.path,H.path));return t$(Z,$.page,$.pageSize)}function uK(J,Q={}){let $=J.specialistByID.get(Q.specialist??Q.category??Q.selected),W=J.skillByPath.get(Q.leaf??Q.selectedLeaf);if(W)$=J.specialistByID.get(W.specialist);let Z=$?.department||(J.departmentByID.has(Q.department)?Q.department:null),K=$?.groups.find((X)=>X.id===Q.group)||null,H=K?.skills||$?.skills||J.departmentByID.get(Z)?.skills||[],Y=Q.page;if(W)K=$.groups.find((X)=>X.skills.some((U)=>U.path===W.path)),H=K.skills,Y=Math.floor(H.findIndex((X)=>X.path===W.path)/kJ);return{kind:W?"skill":K?"group":$?"specialist":Z?"department":"global",department:Z,specialist:$?.id||null,leaf:W?.path||null,group:K?.id||null,page:t$(H,Y).page}}function h1(J,Q){return J.skillByPath.has(Q)?uK(J,{leaf:Q}):null}var cK={schema_version:1,fallback_department:"department/other",departments:[{id:"department/code",name:"Código",icon:"code",color:"#91b5ed",collection_ids:["code","cyber-security","cybersecurity","frontend-design","impeccable","frontend","richard-design"],aliases:["Código","Cybersecurity","Cyber Security","Frontend Design","Impeccable","Frontend","Richard Design"]},{id:"department/marketing",name:"Marketing",icon:"chart",color:"#92c399",collection_ids:["ads","marketing","personal-branding"],aliases:["Ads","Marketing","Personal Branding"]},{id:"department/content",name:"Conteúdo",icon:"note",color:"#7bc8b4",collection_ids:["contents"],aliases:["Contents"]},{id:"department/sales",name:"Vendas",icon:"search",color:"#d9c276",collection_ids:["customer-finder"],aliases:["Customer Finder"]},{id:"department/other",name:"Outros especialistas",icon:"tool",color:"#a6adb8",collection_ids:[],aliases:[]}]};window.OracleDepartments=e$;window.OracleDepartmentManifest=cK;window.OracleKnowledge=m$;window.OraclePrompts=u$;window.OracleAtmosphere=n$;window.OracleLayout=h$;window.OracleMotion={FormationTimeline:GJ,revealAt:S8,pluginOrbitRadius:wK,orbitalPosition:TK};var X8=(J)=>({value:J}),g1=(J)=>{let Q=Math.sin(J*127.1+311.7)*43758.5453;return Q-Math.floor(Q)},T6=(J,Q,$,W=!0)=>{for(let[Z,K]of Object.entries(Q)){let H=W?r7:R8;J.setAttribute(Z,new H(new Float32Array($*K),K).setUsage(uQ))}},g8=(J,Q,...$)=>{let W=!1;for(let Z=0;Z<$.length;Z++){let K=Q*J.itemSize+Z,H=Math.fround($[Z]);if(J.array[K]!==H)J.array[K]=H,W=!0}if(W)J.needsUpdate=!0;return W};function nK(J=1){let Q=new f9(1,1,J,1),$=new KJ;return $.index=Q.index,$.setAttribute("position",Q.attributes.position),$.setAttribute("uv",Q.attributes.uv),$.instanceCount=0,$}class sK{constructor(J){this.host=J,this.scene=new s7,this.camera=new A6(-500,500,350,-350,0.1,100),this.camera.position.z=10,this.active=!0,this.quality="balanced",this.pending=0,this.timeout=0,this.time=0,this.clock=0,this.last=0,this.renderCount=0,this.dirty=!0,this.paused=!1,this.reduced=!1,this.frameSamples=new NJ,this.costSamples=new NJ,this.governor=new f$,this.timeline=new GJ,this.clusterRows=new Map,this.nodeRows=new Map,this.leafRows=new Map,this.leafBirths=new Map,this.colors=[],this.colorByID=new Map,this.nodeCapacity=8,this.edgeCapacity=128,this.leafCapacity=128,this.nodeTargets=new Float32Array(this.nodeCapacity*4),this.receipts=new Set,this.receiptAt=-100,this.transitioning=!1,this.u={uTime:X8(0),uClock:X8(0),uFormation:X8(1),uMotion:X8(1),uEconomy:X8(0),uScale:X8(1),uDpr:X8(v$(devicePixelRatio,!1)),uSpotlight:X8(-2),uSpotlightAmount:X8(0),uSelected:X8(-2),uSelectedLeaf:X8(-2),uHovered:X8(-2),uHoveredLeaf:X8(-2),uDragged:X8(-2),uReceipt:X8(-1),uHoverCore:X8(0),uReconnect:X8(0),uGroupCount:X8(7),uFocusedCluster:X8(-2),uHoveredCluster:X8(-2),uContext:X8(0)};let Q=document.createElement("canvas");Q.className="universe-webgl",Q.setAttribute("aria-hidden","true"),J.prepend(Q),this.canvas=Q;try{this.renderer=new S$({canvas:Q,alpha:!0,antialias:!1,powerPreference:"low-power",depth:!1,stencil:!1})}catch($){throw Q.remove(),this.active=!1,$}this.renderer.outputColorSpace=l7,this.renderer.setPixelRatio(this.u.uDpr.value),this.renderer.setClearColor(0,0),this.renderer.sortObjects=!1,this.renderer.debug.onShaderError=($,W,Z,K)=>{this.error=[$.getProgramInfoLog(W),$.getShaderInfoLog(Z),$.getShaderInfoLog(K)].filter(Boolean).join(`
`),this.failed=!0,this.cancel(),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback"),this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0)};try{this.setup()}catch($){throw this.dispose(),$}this.onLost=($)=>{$.preventDefault(),this.contextLost=!0,this.cancel(),this.last=0,this.timeline.set({progress:1,playing:!1}),this.applyFormation(!0),this.host.classList.remove("three-enabled"),this.host.classList.add("svg-fallback")},this.onRestored=()=>{if(!this.active)return;this.contextLost=!1,this.failed=!1,this.error=null,this.last=0,this.reconnectAt=this.clock,this.dirty=!0,this.host.classList.add("three-enabled"),this.host.classList.remove("svg-fallback"),this.schedule()},this.onVisibility=()=>{if(this.last=0,this.cancel(),!document.hidden)this.dirty=!0,this.schedule()},Q.addEventListener("webglcontextlost",this.onLost),Q.addEventListener("webglcontextrestored",this.onRestored),document.addEventListener("visibilitychange",this.onVisibility),J.classList.add("three-enabled")}material(J,Q){return new T8({vertexShader:J,fragmentShader:Q,uniforms:this.u,transparent:!0,depthTest:!1,depthWrite:!1,toneMapped:!1})}mesh(J,Q,$,W=x8){let Z=new W(J,this.material(Q,$));return Z.frustumCulled=!1,this.scene.add(Z),Z}setup(){let J=new Uint8Array(16384);for(let K=0;K<J.length;K++)J[K]=Math.floor(g1(K+11)*255);this.noiseTexture=new i6(J,128,128,y7,h8),this.noiseTexture.minFilter=this.noiseTexture.magFilter=_8,this.noiseTexture.wrapS=this.noiseTexture.wrapT=j7,this.noiseTexture.needsUpdate=!0,this.u.uNoise=X8(this.noiseTexture),this.plane=new f9(1,1),this.galaxy=this.mesh(this.plane,j$,_K),this.galaxy.scale.set(1120,730,1);let Q=new C8,$=[],W=[],Z=[];[[185,95],[288,156],[395,233]].forEach(([K,H],Y)=>{for(let X=0;X<160;X++)for(let U of[X,X+1]){let E=U/160*Math.PI*2,N=Math.cos(E)*K,G=Math.sin(E)*H;$.push(N*0.906-G*0.423,N*0.423+G*0.906,-0.5),W.push(U/160),Z.push(Y)}}),Q.setAttribute("position",new R8(new Float32Array($),3)),Q.setAttribute("along",new R8(new Float32Array(W),1)),Q.setAttribute("order",new R8(new Float32Array(Z),1)),this.orbits=this.mesh(Q,CK,AK,e7),this.edgeGeometry=nK(24),T6(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4,edgeLife:1},this.edgeCapacity),this.edges=this.mesh(this.edgeGeometry,VK,BK),this.leafGeometry=new C8,T6(this.leafGeometry,{position:3,tint:3,leafMeta:4,leafCluster:1,leafLife:1},this.leafCapacity,!1),this.leafGeometry.setDrawRange(0,0),this.leafPoints=this.mesh(this.leafGeometry,zK,IK,JJ),this.nodeGeometry=nK(),T6(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodes=this.mesh(this.nodeGeometry,kK,LK),this.sun=this.mesh(this.plane,j$,RK),this.sun.scale.set(250,250,1)}unavailable(){return!this.active||this.contextLost||this.failed||!this.model||document.hidden||window.oracleWindowVisible===!1||this.model.data?.hidden||!this.width||!this.height}sync(J){if(!this.active)return;this.model=J;let Q=!J.selected&&!J.department&&!J.knowledge;if(this.leafPoints.visible=!J.knowledge,this.sun.visible!==Q)this.sun.visible=Q,this.orbits.visible=Q,this.dirty=!0;this.u.uGroupCount.value=Math.max(1,J.nodes.size);let $=!1,W=Math.round(J.width),Z=Math.round(J.height);if(!W||!Z)return;if(W!==this.width||Z!==this.height)this.width=W,this.height=Z,this.renderer.setSize(W,Z,!1),$=!0;let{x:K,y:H,k:Y}=J.camera;if($||K!==this.cameraX||H!==this.cameraY||Y!==this.cameraK)this.cameraX=K,this.cameraY=H,this.cameraK=Y,this.camera.left=-K/Y,this.camera.right=(W-K)/Y,this.camera.top=H/Y,this.camera.bottom=(H-Z)/Y,this.camera.updateProjectionMatrix(),this.u.uScale.value=Y,$=!0;let X=!!J.reduced||!!this.systemReduced;if(X!==this.reduced){if(this.reduced=X,$=!0,this.last=0,X)this.setFormation({progress:1,playing:!1})}let U=!!J.data?.economy;if(this.manualEconomy!==U)this.manualEconomy=U,this.governor.reset();$=this.setQuality(U||this.governor.degraded?"economy":"balanced")||$,$=this.syncGeometry(J)||$;let E=(V)=>J.nodes.get(V)?.index??-2,N=J.hovered||document.documentElement.dataset.inputMode!=="pointer"&&J.keyboardFocus||{},G=E(J.spotlight),F=G>=0?1:0;if(this.spotlightTarget!==F)this.spotlightTarget=F,this.transitioning=!0,$=!0;if(G>=0&&this.u.uSpotlight.value!==G)this.u.uSpotlight.value=G,$=!0;let O={uSelected:E(J.selected||(J.knowledge?[...J.nodes.keys()][0]:null)),uSelectedLeaf:this.leafRows.get(J.selectedLeaf)??-2,uHovered:E(N.category),uHoveredLeaf:this.leafRows.get(N.skill)??-2,uDragged:E(J.drag?.category||J.drag?.node?.parent),uHoverCore:N.core?1:0,uFocusedCluster:this.clusterRows.get(J.context?.group)??-2,uHoveredCluster:this.clusterRows.get(N.group||J.leaves.get(N.skill)?.group)??-2,uContext:["global","specialist","group","skill","knowledge","department"].indexOf(J.context?.kind)};for(let[V,D]of Object.entries(O))if(this.u[V].value!==D)this.u[V].value=D,$=!0;for(let V of J.nodes.values()){let D=this.nodeRows.get(V.id),q=V.id===J.selected||J.knowledge||V.kind==="department"&&V.id===J.department&&!J.selected?1:0,_=V.id===N.category||J.leaves.get(N.skill)?.parent===V.id?1:0,A=J.drag?.node?.id===V.id?1:0,k=[q,_,A,J.selected&&!q?1:0];for(let I=0;I<4;I++)if(this.nodeTargets[D*4+I]!==k[I])this.nodeTargets[D*4+I]=k[I],this.transitioning=!0,$=!0}if(this.paused=!!J.paused,!this.started)this.started=!0,this.setFormation({progress:this.reduced?1:0,playing:!this.reduced});if(J.data?.formation&&J.data.formation!==this.lastFormationInput)this.lastFormationInput=J.data.formation,this.setFormation(J.data.formation);if(this.dirty||=$,$&&this.timeout)clearTimeout(this.timeout),this.timeout=0;if(this.unavailable())this.cancel(),this.last=0;else this.schedule()}syncGeometry(J){let Q=!1;if(J.nodes.size>this.nodeCapacity)this.nodeCapacity=Math.max(J.nodes.size,this.nodeCapacity*2),this.nodeGeometry.dispose(),T6(this.nodeGeometry,{center:2,tint:3,nodeState:4,order:1},this.nodeCapacity),this.nodeTargets=new Float32Array(this.nodeCapacity*4),Q=!0;let $=J.nodes.size+J.groups.size+J.leaves.size;if($>this.edgeCapacity)this.edgeCapacity=$*2,this.edgeGeometry.dispose(),T6(this.edgeGeometry,{source:2,target:2,tint:3,edgeMeta:4,edgeLife:1},this.edgeCapacity),Q=!0;if(J.leaves.size>this.leafCapacity)this.leafCapacity=J.leaves.size*2,this.leafGeometry.dispose(),T6(this.leafGeometry,{position:3,tint:3,leafMeta:4,leafCluster:1,leafLife:1},this.leafCapacity,!1),Q=!0;let W=this.nodeGeometry.attributes,Z=this.edgeGeometry.attributes,K=this.leafGeometry.attributes;this.nodeRows.clear(),this.clusterRows.clear(),this.leafRows.clear();let H=0,Y=0,X=(N,G,F,O,V,D,q,_,A,k=1)=>{Q=g8(Z.source,Y,N,G)||Q,Q=g8(Z.target,Y,F,O)||Q,Q=g8(Z.tint,Y,V.r,V.g,V.b)||Q,Q=g8(Z.edgeMeta,Y,D,q,_,A)||Q,Q=g8(Z.edgeLife,Y,k)||Q,Y++};for(let N of J.nodes.values()){this.nodeRows.set(N.id,H);let G=N.id+":"+(N.color||""),F=this.colorByID.get(G);if(!F)F=new p0(N.color||r8(N.id).color),this.colorByID.set(G,F);this.colors[N.index]=F,Q=g8(W.center,H,N.x,-N.y)||Q,Q=g8(W.tint,H,F.r,F.g,F.b)||Q,Q=g8(W.order,H,N.index)||Q;let O=J.nodes.get(N.parent);if(O)X(O.x,O.y,N.x,N.y,F,0,N.index,-1,-3);else if(!J.selected&&!J.department&&!J.knowledge)X(0,0,N.x,N.y,F,0,N.index,-1,-3);H++}let U=0;for(let N of J.groups.values()){this.clusterRows.set(N.id,U++);let G=J.nodes.get(N.parent),F=this.colors[G.index];X(G.x,G.y,N.x,N.y,F,0.5,G.index,this.clusterRows.get(N.id),-3)}let E=0;for(let N of J.leaves.values()){let G=J.nodes.get(N.parent);if(!G)continue;let F=this.colors[G.index];if(this.leafRows.set(N.id,E),!this.leafBirths.has(N.id))this.leafBirths.set(N.id,this.clock),this.arrivalUntil=this.clock+0.34;Q=g8(K.position,E,N.x,-N.y,1)||Q,Q=g8(K.tint,E,F.r,F.g,F.b)||Q,Q=g8(K.leafMeta,E,G.index,N.index,E,this.leafBirths.get(N.id))||Q,Q=g8(K.leafCluster,E,this.clusterRows.get(N.group)??-2)||Q,Q=g8(K.leafLife,E,N.life??1)||Q;let O=N.route&&!N.retiring?{x:N.x-N.route.offset,y:N.y}:J.groups.get(N.group)||G;X(O.x,O.y,N.x,N.y,F,1,G.index,this.clusterRows.get(N.group)??-2,E,(N.life??1)*(J.selected&&J.leaves.size>150?0.24:1)),E++}if(this.nodeGeometry.instanceCount!==H||this.edgeGeometry.instanceCount!==Y||this.leafGeometry.drawRange.count!==E)Q=!0;this.nodeGeometry.instanceCount=H,this.edgeGeometry.instanceCount=Y,this.leafGeometry.setDrawRange(0,E);for(let N of this.leafBirths.keys())if(!J.leaves.has(N))this.leafBirths.delete(N);return Q}setQuality(J){let Q=v$(devicePixelRatio,J==="economy");if(J===this.quality&&Q===this.u.uDpr.value)return!1;if(this.quality=J,this.u.uEconomy.value=J==="economy"?1:0,this.u.uDpr.value=Q,this.renderer.setPixelRatio(Q),this.width)this.renderer.setSize(this.width,this.height,!1);return this.dirty=!0,!0}setPaused(J){if(!this.active)return;this.paused=!!J,this.cancel(),this.last=0,this.schedule()}setFormation(J){if(!this.active)return this.timeline.snapshot();let Q=this.timeline.set(this.reduced||this.failed||this.contextLost?{...J,progress:1,playing:!1}:J);if(this.u.uFormation.value=Q.progress,this.dirty=!0,this.timeout)clearTimeout(this.timeout),this.timeout=0;return this.applyFormation(!0),this.schedule(),Q}getFormation(){return this.timeline.snapshot()}applyFormation(J=!1){if(!this.model)return;let Q=this.timeline.progress;if(Q!==this.lastLabelProgress||J){for(let $ of this.model.nodes.values())$.g.style.opacity=Q===1?"":String(S8(Q,"collection",$.index,0,this.model.nodes.size));for(let $ of this.model.groups.values()){$.bus.style.opacity=String(($.busOpacity||0)*S8(Q,"group",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size)),$.g.style.opacity=Q===1?"":String(S8(Q,"group",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size));let W=Q===1||S8(Q,"group",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size)>0.15;$.g.style.pointerEvents=W?"":"none",$.g.setAttribute("tabindex",W?"0":"-1")}for(let $ of this.model.leaves.values())$.g.style.opacity=Q===1?"":String(S8(Q,"skill",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size));if(this.host.querySelector(".oracle-core").style.opacity=Q===1?"":String(S8(Q,"sun")),this.model.connectorLayer)this.model.connectorLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));if(this.model.pluginLayer)this.model.pluginLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));if(this.model.knowledgeLayer)this.model.knowledgeLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));if(this.model.promptLayer)this.model.promptLayer.style.opacity=Q===1?"":String(S8(Q,"connector"));for(let $ of this.model.nodes.values()){let W=Q===1||S8(Q,"collection",$.index,0,this.model.nodes.size)>0.15;$.g.style.pointerEvents=W?"":"none",$.g.setAttribute("tabindex",W?"0":"-1")}for(let $ of this.model.leaves.values()){let W=!$.retiring&&(Q===1||S8(Q,"skill",this.model.nodes.get($.parent)?.index??0,$.index,this.model.nodes.size)>0.15);$.g.style.pointerEvents=W?"":"none",$.g.setAttribute("tabindex",W?"0":"-1")}this.lastLabelProgress=Q}if(J||Q===1&&this.lastNotifiedProgress!==1||this.clock-(this.lastNotifyAt||0)>0.2)this.lastNotifyAt=this.clock,this.lastNotifiedProgress=Q,this.host.dispatchEvent(new CustomEvent("oracle:formation",{detail:this.getFormation()}))}signalReceipt(J){if(!this.active||this.model?.data?.replay||J?.source!=="codex-hook"||!J.event_id)return!1;let Q=Date.now()-Date.parse(J.received_at);if(!Number.isFinite(Q)||Q<0||Q>8000||this.receipts.has(J.event_id))return!1;if(this.receipts.add(J.event_id),this.receipts.size>64)this.receipts.delete(this.receipts.values().next().value);return this.receiptAt=this.clock,this.dirty=!0,this.schedule(),!0}cancel(){cancelAnimationFrame(this.pending),clearTimeout(this.timeout),this.pending=0,this.timeout=0}schedule(){if(this.unavailable()||this.pending||this.timeout)return;let J=(this.transitioning||this.clock<(this.arrivalUntil||0))&&!this.reduced,Q=!this.paused&&!this.reduced;if(!this.dirty&&!Q&&!J)return;let $=()=>{this.timeout=0,this.pending=requestAnimationFrame((W)=>{this.pending=0,this.render(W),this.schedule()})};if(this.dirty||J||this.timeline.playing||this.model.geometryMoving||this.model.frame)$();else{let W=1000/(this.quality==="economy"?15:24);this.timeout=setTimeout($,Math.max(0,W-(performance.now()-this.last)-4))}}render(J){if(this.unavailable())return;let Q=1000/(this.timeline.playing||this.model.geometryMoving||this.model.frame?60:this.quality==="economy"?15:24);if(!this.dirty&&!this.transitioning&&this.clock>=(this.arrivalUntil||0)&&this.last&&J-this.last<Q-2)return;let $=performance.now(),W=this.last?J-this.last:0,Z=Math.min(W||16.67,100);if(this.clock+=Z/1000,!this.paused&&!this.reduced){if(this.time+=Z/1000,W)this.frameSamples.add(W);if(this.timeline.playing)this.timeline.advance(Z),this.u.uFormation.value=this.timeline.progress,this.applyFormation()}this.u.uTime.value=this.reduced?0:this.time,this.u.uClock.value=this.clock,this.u.uMotion.value=this.reduced?0:1;let K=(this.clock-this.receiptAt)/2.4;this.u.uReceipt.value=this.reduced||K>1?-1:K,this.u.uReconnect.value=this.reduced?0:Math.max(0,1-(this.clock-(this.reconnectAt??-100))/0.6);let H=this.nodeGeometry.attributes.nodeState,Y=this.reduced?1:1-Math.exp(-Z/80);this.transitioning=!1;let X=(this.spotlightTarget||0)-this.u.uSpotlightAmount.value;if(Math.abs(X)>0.001)this.u.uSpotlightAmount.value+=X*Y,this.transitioning=!0;else if(this.u.uSpotlightAmount.value=this.spotlightTarget||0,!this.spotlightTarget)this.u.uSpotlight.value=-2;let U=!1;for(let N=0;N<this.nodeGeometry.instanceCount*4;N++){let G=this.nodeTargets[N]-H.array[N];if(Math.abs(G)>0.003)H.array[N]+=G*Y,this.transitioning=!0,U=!0;else if(H.array[N]!==this.nodeTargets[N])H.array[N]=this.nodeTargets[N],U=!0}if(U)H.needsUpdate=!0;if(this.model.animateOrbits?.(Z))this.syncGeometry(this.model);this.renderer.render(this.scene,this.camera),this.renderCount++,this.last=J,this.dirty=!1;let E=performance.now()-$;if(this.costSamples.add(E),!this.paused&&!this.reduced&&!this.manualEconomy&&W&&!this.model.drag&&!this.transitioning&&this.governor.observe(W,E))this.setQuality("economy")}resetDiagnostics(){this.frameSamples.clear(),this.costSamples.clear()}diagnostics(){let J=this.renderer.info;return{renderer:"Three.js r185 · WebGL2 · instanced atlas",quality:this.quality,adaptiveEconomy:this.governor.degraded,buffer:[this.canvas.width,this.canvas.height],drawCalls:J.render.calls,triangles:J.render.triangles,geometries:J.memory.geometries,textures:J.memory.textures,renderCount:this.renderCount,samples:this.frameSamples.count,frameIntervalMedianMs:this.frameSamples.percentile(0.5),frameIntervalP95Ms:this.frameSamples.percentile(0.95),cpuSubmitMedianMs:this.costSamples.percentile(0.5),cpuSubmitP95Ms:this.costSamples.percentile(0.95),paused:this.paused||this.unavailable(),reduced:this.reduced,active:this.active,pendingFrames:Number(!!this.pending),pendingTimers:Number(!!this.timeout),formation:this.getFormation(),contextLost:!!this.contextLost,error:this.error||null,note:"CPU submission is not GPU time. Interaction and formation target 60 Hz; ambient targets 24 Hz and economy 15 Hz. Input preempts ambient deadlines. No telemetry is inferred from light."}}dispose(){if(!this.active)return;this.active=!1,this.cancel(),document.removeEventListener("visibilitychange",this.onVisibility),this.canvas.removeEventListener("webglcontextlost",this.onLost),this.canvas.removeEventListener("webglcontextrestored",this.onRestored);let J=new Set,Q=new Set;if(this.scene.traverse(($)=>{if($.geometry)J.add($.geometry);if($.material)Q.add($.material)}),J.forEach(($)=>$.dispose()),Q.forEach(($)=>$.dispose()),this.noiseTexture?.dispose(),this.renderer.dispose(),this.scene.clear(),this.nodeRows.clear(),this.clusterRows.clear(),this.leafRows.clear(),this.leafBirths.clear(),this.receipts.clear(),this.host.classList.remove("three-enabled"),this.model){for(let $ of this.model.nodes.values())$.g.style.opacity="";for(let $ of this.model.leaves.values())$.g.style.opacity=""}this.canvas.remove()}}window.OracleUniverse=sK;})();
