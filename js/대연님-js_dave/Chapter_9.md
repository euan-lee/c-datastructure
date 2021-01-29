# Chapter 9. 타입 변환과 단축 평가



## 9.1 타입 변환이란?


1) **명시적 타입 변환 (explicit coercion)** or **타입 캐스팅 (type casting)** 
: 개발자가 의도적으로 값의 타입을 변환

```js
var x = 10;
var str = x.toString();

console.log(typeof str, str) // string 10
```


2) **암묵적 타입 변환 (implicit coercion)** or **타입 강제변환 (type coercion)** 
: 개발자 의도와 상관 없이 표현식을 평가하는 도중 JS 엔진에 의해 암묵적으로 타입이 자동 변환되는 것

```js
var x = 10;
var str = x + '';

console.log(typeof str, str) // string 10
```



## 9.2 암묵적 타입 변환 

ex) 
```js
// 피연산자가 모두 문자열 타입이어야 하는 문맥
'10' + 2 // '102'

// 피연산자가 모두 숫자 타입이어야 하는 문맥
5 * '10' // 50

// 피연산자가 모두 불리언 타입이어야 하는 문맥
!0 // true
if (1) { }
```



**[ 1) 문자열 타입으로 암묵적 타입 변환 ]**
: "**+**" 연산자가 **하나 이상의 string**과 함께 적용되었을 경우


ex) 
```js
`1 + 1 = ${1 + 1}` // "1 + 1 = 2"

// 숫자 타입 
0 + '' // "0"
-0 + '' // "0"
1 + '' // "1"
-1 + '' // "-1"
NaN + '' // "NaN"
Infinity + '' // "Infinity"
-Infinity + '' // "-Infinity"

// 불리언, null, undefined
true + '' // "true"
false + '' // "false"
null + '' // "null"
undefined + '' // "undefined"


// 객체 타입
({}) + '' // "[object Object]"
Math + '' // "[object Math]"

[] + '' // ""
[10, 20] + '' // "10,20"

(function(){}) + '' // "function(){}"
Array + '' // "function Array() { [native code] }"


// 불가능한 경우 (심벌 타입)
(Symbol()) + '' // TypeError: Cannot convert a Symbol value to a string
```


**[ 2) 숫자 타입으로 암묵적 타입 변환 ]**
: **"+" 이외**의 연산자 or **"+" 연산자가 string 없이** 적용되었을 경우

ex)
```js
1 - '1' // 0
1 * '10' // 10
1 / 'one' // NaN (피연산자를 숫자 타입으로 변환할 수 없는 경우 산술 연산이 불가하므로 표현식의 평가 결과가 NaN이 됨)

'1' > 0 // true

+ '' // 0
+ '0' // 0
+ '1' // 1
+ 'string' // NaN

+ true // 1 
+ false // 0

+ null // 0
+ undefined // NaN

+ [] // 0
+ {} // NaN
+ [10, 20] // NaN
+ (function(){}) // NaN

+ Symbol() // TypeError: Cannot convert a Symbol value to a number
```



**[ 3) 불리언 타입으로 암묵적 타입 변환 ]**
- '' : false  (0) 
- [] : true   (0) 
- {} : true   (NaN)


ex) 
```js
// 조건식의 평가 결과를 불리언 타입으로 암묵적으로 변환함 

if ('')     console.log('1'); // 
if (true)   console.log('2'); // 2
if (0)      console.log('3'); // 
if ('str')  console.log('4'); // 4
if (null)   console.log('5'); // 

// false, undefined, null, 0, -0, NaN, '' : false로 평가됨 
// 아래 조건문은 모두 코드블록이 실행됨 

if(!false)      console.log(undefined + ' is falsy value');
if(!undefined)  console.log(undefined + ' is falsy value');
if(!null)       console.log(undefined + ' is falsy value');
if(!0)          console.log(undefined + ' is falsy value');
if(!NaN)        console.log(undefined + ' is falsy value');
if(!'')         console.log(undefined + ' is falsy value');
```


ex) 
```js

// v 가 false 라면 true, true 라면 false 를 반환
function isFalsy(v) {
    return !v; 
}

// v 가 true 라면 true, false 라면 false 를 반환
function isTruthy(v) {
    return !v; 
}

// 모두 true 반환 

isFalsy(false);
isFalsy(undefined); // 숫자 타입 변환 불가(NaN), 불리언 타입 가능(false)
isFalsy(null);
isFalsy(0);
isFalsy(NaN); // 숫자 타입 변환 불가(NaN), 불리언 타입 가능(false)
isFalsy(''); // 숫자 타입 변환 가능(0), 불리언 타입 가능(false)

isTruthy(true);
isTruthy('0');
isTruthy({}); // 숫자 타입 변환 불가(NaN), 불리언 타입 가능(true)
isTruthy([]); // 숫자 타입 변환 가능(0), 불리언 타입 가능(true)
```



## 9.3 명시적 타입 변환 

- **표준 빌트인 생성자 함수(String, Number, Boolean)를 new 연산자 없이** 호출
- 표준 빌트인 객체의 **빌트인 메서드**를 사용
- **암묵적 타입 변환**을 이용



**[ 1) 문자열 타입으로 명시적 타입 변환 ]**

- String() (without "new")
- Object.prototype.toString()
- 문자열 연결 연산자 활용

ex) 
```js
String(1);
String(NaN);
String(Infinity);
String(true);
String(false);

(1).toString();
(NaN).toString();
(Infinity).toString();
(true).toString();
(false).toString();

1 + '';
NaN + '';
Infinity + '';
true + '';
false + '';
```



**[ 2) 숫자 타입으로 명시적 타입 변환 ]**

- Number() (without "new")
- parseInt() or parseFloat() <- string 타입만 이 함수들로 숫자 타입 변환 가능
- 단항 산술 연산자 + 활용
- 산술 연산자 * 이용

ex) 
```js
Number('0');
Number('-1');
Number('10.53');
Number(true);
Number(false);

parseInt('0');
parseInt('-1');
parseFloat('10.53');

+'0';
+'-1';
+'10.53';
+'true';
+'false';

'0' * 1;
'-1' * 1;
'10.53' * 1;
true * 1;
false * 1;
```



**[ 3) 불리언 타입으로 명시적 타입 변환 ]**

- Boolean() (without "new")
- 부정 논리 연산자 ! 를 2회 연달아 사용 (NOT 연산을 2회 연속해 적용하는 것)

ex) 
```js

Boolean('x');          // true
Boolean('');           // false
Boolean('false');      // true

Boolean(0);            // false
Boolean(1);            // true
Boolean(NaN);          // false
Boolean(Infinity);     // true

Boolean(null);         // false
Boolean(undefined);    // false

Boolean({});           // true
Boolean([]);           // true
```

ex)
```js
!!'x'; // true (NOT 을 2회 연달아 적용, 이하 동일 원리)
!!'';
!!'false';

!!0;
!!-1;
!!NaN;
!!Infinity;

!!null;
!!undefined;

!!{};
!![];
```



## 9.4 단축 평가 (Short-circuit evaluation)

- **논리 연산의 결과를 결정하는 피연산자**를 **타입 변환하지 않고 그대로** 반환하는 것
- 표현식을 평가하는 도중에 **평가 결과가 확정된 경우 나머지 평가 과정을 생략**하는 것



**[ 1) 논리 연산자 기반 단축 평가 ]**

- 논리합(||) or 논리곱(&&) 연산자 표현식은 언제나 2개의 피연산자 중 어느 한 쪽으로 평가됨
- 논리합(||) or 논리곱(&&) 연산자 표현식은 **좌항에서 우항으로** 평가가 진행됨

```js
'Cat' && 'Dog' // 'Dog'
```
- 위에서 'Cat'까지만으로는 표현식 평가가 불가능함
- 두번째 피연산자인 'Dog'까지 봐야 표현식 평가가 가능
- **논리 연산의 결과를 결정하는** 두번째 피연산자인 'Dog'를 그대로 반환함

```js
'Cat' || 'Dog' // 'Cat'
```
- 위에서는 'Cat'까지만으로도 표현식 평가가 가능함
- **논리 연산의 결과를 결정하는** 첫번째 피연산자인 'Cat'을 그대로 반환함


Summary)
```js
true || anything // true
false || anything // anything
true && anything // anything
false && anything // false (이미 앞의 false로 전체가 false라는 것이 결정되었으므로)
```

ex) 
```js
'Cat' || 'Dog' // 'Cat'
false || 'Dog' // 'Dog'
'Cat' || false // 'Cat'

'Cat' && 'Dog' // 'Dog'
false && 'Dog' // false
'Cat' && false // false


// if 문, if & else 문의 대체가 가능하다.

var done = true;
var message = '';

if (done) message = '완료';

message = done && '완료'; // done이 true라면 message에 '완료'를 할당
console.log(message); // 완료


var done = false;
var message = '';

if (!done) message = '미완료';

message = done || '미완료'; // done이 false라면 message에 '미완료'를 할당
console.log(message); // 미완료


var done = true;
var message = '';

if (done) message = '완료';
else      message = '미완료';
console.log(message); // 완료

message = done ? '완료' : '미완료'; 
console.log(message); // 완료
```


[ 단축 평가의 활용 1) **객체가 가리키기를 기대하는 변수가 null or undefined 인지 확인 후 프로퍼티를 참조**할 때 ]

- 객체는 **key & value로 구성된 프로퍼티(property)**의 집합
- 객체가 가리키기를 기대하는 변수의 값이 객체가 아니라 null or undefined인 경우 객체 프로퍼티 참조 시 타입 에러 발생 

```js
var elem = null;
var value = elem.value; // TypeError: Cannot read property 'value' of null
```

```js
// 단축 평가 적용 시 에러 발생 X
var elem = null;

// elem 이 false 일 때 (null or undefined) : elem 으로 평가됨
// elem 이 true 일 때 : elem.value 로 평가됨
var value = elem && elem.value; // null
```


[ 단축 평가의 활용 2) **함수 매개변수에 기본값을 설정**할 때 ]

- 함수 호출 시 인수를 전달하지 않으면 매개변수에 undefined 가 할당됨
- 단축 평가로 매개변수 기본값 세팅 시 이를 방지할 수 있음


ex) 
```js
function getStringLength(str) {
    str = str || ''; // str 이 true 일 경우 str 자체로, str 이 false 일 경우 ''로 
    return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2


// ES6 부터는 매개변수 기본값을 아래와 같이 직접 설정할 수 있음
function getStringLength(str = '') {
    return str.length;
}

getStringLength();     // 0
getStringLength('hi'); // 2
```



**[ 2) 옵셔널 체이닝 연산자 (optional chaining) : ?. ]** 


```js
var elem = null;

// elem이 null or undefined 0 -> undefined 반환
// elem이 null or undefined X -> 우항의 프로퍼티 참조 진행
var value = elem?.value; // elem이 null/undefined가 아닐 때 꺼낸다고 이해
console.log(value); // undefined
```

- ES11(ECMAScript2020)에서 도입
- 좌항의 피연산자가 null or undefined 일 때 : **undefined** 반환
- 좌항의 피연산자가 null or undefined 가 아닐 때 : 우항의 **프로퍼티 참조** 진행


```js
// 옵셔널 체이닝 연산자 도입 이전의 방식 (&&를 활용한 단축 평가)
// &&의 좌항이 false로 평가될 경우, 좌항 피연산자를 그대로 반환

var elem = null;

var value = elem && elem.value;
console.log(value); // null


var str = '';

var length = str && str.length; // 122p의 주석 문구는 오탈자로 판단됨
console.log(length); // ''
```


```js
// 옵셔널 체이닝 연산자는 아래와 같이 
// 좌항이 false로 평가되더라도 null or undefined가 아니라면 우항의 프로퍼티 참조를 진행함

var str = '';

var length = str?.length;
console.log(length); // 0
```



**[ 3) null 병합 연산자 (nullish coalescing) : ?? ]**


```js
// 좌항의 피연산자가 null 이므로 우항의 피연산자를 리턴
var foo = null ?? 'default string';

console.log(foo); // "default string"
```

- ES11(ECMAScript2020)에서 도입
- 좌항의 피연산자가 null or undefined 일 때 : **우항**의 피연산자 반환
- 좌항의 피연산자가 null or undefined 가 아닐 때 : **좌항**의 피연산자 반환
- **변수에 기본값을 설정할 때 유용함**


```js
// ||를 활용한 단축평가의 경우 좌항이 false로 평가될 시,
// 우항의 피연산자를 반환함 
var foo = '' || 'default string'; // ''는 false로 평가됨

console.log(foo); // "default string"


// ??를 활용한 null 병합 연산자의 경우 좌항이 false로 평가될 시에도,
// null 또는 undefined 가 아니라면 좌항의 피연산자를 그대로 반환함 
var foo = '' ?? 'default string'; // ''는 null or undefined가 아님

console.log(foo); // ""
```









