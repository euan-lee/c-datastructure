# Chapter 7. 연산자 Operator

- Python 등의 언어와 비교했을 때 [ **연산자의 존재로 인한 암묵적 자동 타입 변환** ]이 두드러진 특징

ex) 
1 + true // 2
1 + null // 1
1 + '2' // '12'
1 + undefined; // NaN
1 + 'Hello'; // NaN


- 연산자 operator : 하나 이상의 **표현식을 대상**으로 [ 산술 / 할당 / 비교 / 논리 / 타입 / 지수 ] 등의 **연산을 수행해 하나의 값을 만듦**
- 피연산자 operand : 위 연산의 대상, **값으로 표현될 수 있는 표현식**이어야 함

-> 연산자 & 피연산자의 조합으로 이뤄진 연산자 표현식 그 자체도 값으로 표현될 수 있는 표현식



## 7.1 산술(arithmetic) 연산자


- 산술 연산이 불가할 경우 : **NaN** 반환 
- 이항 산술 연산자 : + - * / %
- 단항 산술 연산자 : ++(증가) --(감소) + -


**++ & -- 의 위치**


피연산자 앞에 위치 시
== **전위(Prefix** increment/decrement operator) 
== **피연산자의 값을 증가/감소시킨 후 다른 연산을 수행** 

ex) 
var x = 5, result;
result = ++x; // 선증가 & 후할당
console.log(result, x); // **6 6** 


피연산자 뒤에 위치 시
== **후위(Postfix** increment/decrement operator) 
== **다른 연산을 수행 후 피연산자의 값을 증가/감소**

ex) 
var x = 5, result;
result = x++; // 선할당 & 후증가
console.log(result, x); // **5 6** 


**단항 연산자로서 + 의 기능**
: 피연산자를 숫자 타입으로 변환한 값을 생성하여 반환 (원본 불변)

var x = '1';      -> +x : 숫자 타입인 1 로 타입 변환 후 반환 (원본인 x는 변화 없음)
var x = true;     -> +x : 숫자 타입인 1 로 타입 변환 후 반환 (원본인 x는 변화 없음)
var x = false;    -> +x : 숫자 타입인 0 로 타입 변환 후 반환 (원본인 x는 변화 없음)
var x = 'Hello';  -> +x : NaN 반환 (숫자 타입으로 변환이 불가능한 경우)

ex) 
var x = true;
1 + +x; // 2
1 + x; // 2


**단항 연산자로서 - 의 기능**
: 피연산자를 숫자 타입으로 변환한 후 부호를 반전한 값을 생성하여 반환 (원본 불변)

-(-10);   // 10 
-'10';    // -10
-true;    // -1
-'hello'; // NaN

ex) 
var x = true;
1 + -x; // 0
1 - x; // 0


**문자열 연결 연산자**
: 피연산자 중 하나 이상이 문자열인 경우 문자열 연결 연산자로 작동함 

- **'1' + 2;** // **12 (자동 형 변환, 에러가 발생하지 않음)**
- 1 + true; // 2
- 1 + false; // 1
- 1 + null; // 1 (**null은 0으로** 타입 변환됨)
- 1 + undefined; // NaN (undefined는 불가능)

* 위에서 확인할 수 있듯 **암묵적 타입 변환 implicit coercion**이 발생함 (== 타입 강제 변환 type coercion)



## 7.2 할당(assignment) 연산자

=
+=
-=
*=
/=
%=

- **할당문**은 **값으로 평가되는 표현식**인 문으로서 할당된 값으로 평가됨 
- 이러한 특성으로 인해 아래와 같은 **연쇄 할당**이 가능 

var a, b, c;
a = b = c = 0; // 여기서 중요한 점은 할당의 진행이 오른쪽에서 왼쪽 방향으로 이뤄짐 (<-)
console.log(a, b, c); // 0 0 0 



## 7.3 비교(comparison) 연산자


- (부)동등 비교 (loose equality) 연산자 : [ == ] , [ != ] : **값** 비교
- (불)일치 비교 (strict equality) 연산자 : [ === ] , [ !== ] : **값** & **타입** 비교

* 동등 비교 연산자(==)는 암묵적 타입 변환을 선적용 후 같은 **값**인지 비교함
* 아래와 같이 혼란스러운 여지가 많으므로 **일치 비교 연산자(===) 사용을 적극 권장**함 (==는 비권장)

// true
0 == '';
0 == '0';
false == '0';

// false
'0' == '';
false == 'false';
false == null;
false == undefined;


**NaN은 자기 자신과 일치하지 않는 유일한 값(모든 NaN은 서로 다르다)**

NaN === NaN; // **false**

어떤 숫자가 NaN인지 조사하려면? : **isNaN()**
isNaN(NaN); // true
isNaN(10); // false
isNaN(1 + undefined); // true


**양의 0과 음의 0은 동일하다**

0 === -0; // true
0 == -0; // true


**ES6 의 Object.is 는 이와 반대로 작동한다**

Object.is(-0, +0); // false
Object.is(NaN, NaN); // true



## 7.4 삼항 조건 연산자 (ternary operator)


**조건식? {조건식이 true일 때 반환할 값} : {조건식이 false일 때 반환할 값}**

ex) 
var score = 70;
**var result = score >=60 ? 'pass' : 'fail';**
console.log(result) // 'pass'

- 위에서 'pass' : (score>=60) === false 일 때
- 위에서 'fail' : (score>=60) === true 일 때

ex) 
var x = 2;
**var result = x % 2 ? '홀수' : '짝수';**
console.log(result) // '짝수'

- 삼항 조건 연산자 표현식은 **값(위에서 result 변수의 대입값)으로 평가할 수 있는 표현식**인 문이므로 매우 유용함



* 바로 직전 예시를 if & else를 활용해 표현했을 때 : 

var x = 2, result;
if (x % 2) result = '홀수';
else       result = '짝수';

console.log(result) // '짝수'



## 7.5 논리 연산자 (logical operator)


|| : OR (논리합)
&& : AND (논리곱)
! : NOT (부정)

ex)
false || true; // true
false && true; // false
!true; // false

!0; // true
!'Hello' // false



## 7.6 쉼표 연산자
: 왼쪽 연산자부터 차례대로 피연산자 평가 -> 마지막 피연산자의 평가 종료 시 **마지막 피연산자의 평가 결과를 반환**

ex) 
var x, y, z;
x = 1, y = 2, z = 3; // 3



## 7.8 typeof 연산자
: 'string', 'number', 'boolean', 'undefined', 'symbol', 'object', 'function' 중 하나를 반환

typeof ''         // 'string'
typeof 1          // 'number'
typeof NaN        // **'number'**
typeof true       // 'boolean'
typeof undefined  // 'undefined'
typeof Symbol()   // 'symbol'
typeof function() // 'function''

typeof null       // **'object'** <- null 이 아닌 object로 반환되는 것은 아직 고쳐지지 않고 있는 버그
typeof []         // 'object'
typeof {}         // 'object'
typeof new Date() // 'object'
typeof /test/gi   // 'object'


* 어떠한 값이 **null 타입인지 확인**할 때는 typeof 연산자를 쓰는 대신 일치 연산자(===)를 활용!

var foo = null;
typeof foo === null; // false <- 부적절
foo === null; // true <- 적절



## 7.9 지수 연산자

old) 
Math.pow(2, 2); // 4
Math.pow(2, -2); // 0.25

new, 가독성이 더 좋으므로 권장됨) 
2 ** 2; // 4
2 ** -2; // 0.25
(-5) ** 2; // 25



## 7.10 그 외의 연산자 (추후 각 장에서 다룰 예정)

?.         : 옵셔널 체이닝 연산자
??         : null 병합 연산자
delete     : 프로퍼티 삭제 연산자
new        : 생성자 함수를 호출할 때 사용하여 인스턴스를 생성
instanceof : 좌변의 객체가 우변의 생성자 함수와 연결된 인스턴스인지 판별
in         : 프로퍼티 존재 확인



## 7.12 연산자 우선순위

1. () : 그룹 연산자, 이 연산자로 우선순위를 명시적으로 manual하게 조절하는 것을 권장
2. new(매개변수 존재), ., (), ?.
3. new(매개변수 미존재)
4. **x++, x--**
5. !x, +x, -x, **++x, --x,** typeof, delete
6. **
7. *, /, %
8. +, -
9. <, <=, >, >=, in, instanceof
10. ==, !=, ===, !==
11. ??
12. &&
13. ||
14. ? ... : ... (삼항)
15. 할당 연산자 (=, +=, -=, ...)
16. ,



## 7.13 연산자 결합 순서

- 좌항 -> 우항 : +, -, /, %, <, <=, >, >=, &&, ||, ., [], (), ??, ?., in, instanceof
- 좌항 <- 우항 : ++, --, 할당 연산자(=, +=, -=, ...), !x, +x, -x, ++x, --x, typeof, delete, ? ... : ...


