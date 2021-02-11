# Chapter 12. 함수



## 12.1 함수란?


함수와 관련이 있는 개념들
- 스코프, 실행 컨텍스트, 클로저
- 생성자 함수에 의한 객체 생성
- 메서드, this, 프로토타입, 모듈화


```js
// 함수 선언문을 통한 함수의 정의
function add(x, y){ 
    return x + y;
}

// 함수의 호출 (function call/invoke)
var result = add(2, 5); 
console.log(result); // 7
```

- 매개변수 parameter : **함수 내부로 입력을 전달받는 변수**
- 인수 argument : **입력 값**
- 반환값 return value : **출력 값**
- \* 함수 역시도 **값**



## 12.3 함수 리터럴

- JS의 함수는 **객체 타입**의 **값**
- 숫자 리터럴 -> 숫자 값, 객체 리터럴 -> 객체, **함수 리터럴 -> 함수**
- 함수 리터럴은 평가되어 값을 생성하며 이 값은 객체 -> **함수는 객체다**
+ 일반 객체는 호출 불가 vs 함수는 호출 가능
+ 일반 객체에는 없는 함수 객체 만의 고유한 프로퍼티를 갖게 됨

> \* 리터럴 : 사람이 이해할 수 있는 문자 또는 약속된 기호를 사용해 값을 생성하는 표기 방식 (**값을 생성하기 위한 표기법**)


```js
// 변수 f에 함수 리터럴을 할당
var f = function add(x, y) { 
    return x + y;
}; // 세미콜론 유의
```


1) 함수 이름 
- 식별자 (네이밍 규칙 준수)
- **함수 몸체 내에서만 참조할 수 있는** 식별자(위 예시에서 "add")
- 생략 가능 -> 기명 함수 vs 무명/익명 함수

2) 매개변수 목록 
- 0개 이상의 매개변수
- 매개변수 목록의 순서는 의미를 지니게 됨
- 매개변수도 식별자로서 네이밍 규칙 준수 

3) 함수 몸체 
- 함수 호출 시 일괄적으로 실행될 문들
- 함수 호출에 의해 실행됨



## 12.4 함수 정의


### 1) **함수 선언문** 활용 (표현식이 아닌 문)

```js
function add(x, y) {
    return x + y;
} // 세미콜론 불필요
```


### 2) **함수 리터럴 표현식** 활용 (표현식인 문)

```js
var add = function(x, y) {
    return x + y;
}; // 세미콜론 유의
```


### 3) **Function 생성자 함수** 활용

```js
var add = new Function('x', 'y', 'return x + y');
```


### 4) **화살표 함수** 활용 (ES6)

```js
var add = (x, y) => x + y;

// 키워드 function 사라짐
// 중괄호 사라짐
// return 사라짐 
```

<hr>


### 1) **함수 선언문** 활용 (**표현식이 아닌** 문)


```js
// 함수 선언문에서는 함수 이름 생략 불가 
function add(x, y){
    return x + y;
}


// console.dir은 console.log와 달리 함수 객체의 프로퍼티까지 출력
// (node.js 환경에서는 console.log와 같은 결과 출력)
console.dir(add); // f add(x, y)

console.log(add(2, 5)); // 7
```


#### \* [ 함수 선언문의 리터럴로서의 해석 ]

```js
// 함수 선언문은 표현식이 아닌 문이므로 변수에 할당 불가
// 그러나 함수 선언문이 변수에 할당되는 것처럼 보임

var add = function add(x, y){
    return x + y;
};
```

- **{ }** 은 **블록문**일 수도 있고 **객체 리터럴**일 수도 있음 (중의적 표현)
- 이처럼 중의적인 코드는 코드의 문맥에 따라 해석이 달라짐
- { }이 단독으로 존재 시 : JS 엔진이 { }을 **블록문**으로 해석
- { }이 값으로 평가되어야 할 문맥에 존재 시 : JS 엔진이 { }을 **객체 리터럴**로 해석

<br>

- 함수 이름이 있는 **기명 함수 리터럴**은 함수 선언문 or 함수 리터럴 표현식으로 해석될 가능성이 있음
- 기명 함수 리터럴을 단독으로 사용 시 : **함수 선언문**으로 해석
- 기명 함수 리터럴이 값으로 평가되어야 하는 문맥에 사용 시 : **함수 리터럴 표현식**으로 해석 

<hr>


```js
// 1) 함수 리터럴 표현식으로 해석
(function bar() { console.log('bar'); });
bar(); // ReferenceError: bar is not defined
```

- 위 함수 리터럴 표현식으로 생성된 "bar" 는 호출이 불가능
- 아래 예시에서 **함수 이름(bar)은 함수 몸체 내에서만 참조할 수 있는 식별자**
- 함수 몸체 외부에서는 함수 이름(bar)로 함수를 호출할 수 없음

```js
// 변수 f에 함수 리터럴을 할당
var f = function bar() { 
    console.log('bar');
}; // 세미콜론 유의
```


```js
// 2) 함수 선언문으로 해석
function foo() { console.log('foo'); }
foo(); // foo
```

- 위 함수 선언문으로 정의된 "foo"는 함수 정의 시 <br> **1) JS 엔진이 암묵적으로 함수 이름과 동일한 이름의 foo라는 식별자를 생성**하고, <br> **2) 해당 식별자에 함수 객체를 할당**하므로 호출이 가능
- 이러한 흐름을 의사 코드로 표현하면 아래와 같음

```js
// 함수 이름과 동일한 이름의 foo라는 식별자를 생성하고
// 해당 식별자에 함수 객체를 할당
var foo = function foo() {
    console.log('foo');
};

// 실제로 아래 라인에서 호출되는 foo 는 함수 이름이 아닌 식별자 foo (@ 좌항)
console.log(foo()); // foo
```

- 함수는 함수 이름이 아닌 **함수 객체를 가리키는 식별자**로 **호출**
- 사실 함수 선언문으로 생성한 함수 호출 == **함수 이름 foo 가 아니라** JS 엔진이 암묵적으로 생성한 식별자 foo 를 호출한 것

<hr>


### 2) **함수 (리터럴) 표현식 function expression** 활용 (표현식인 문)

- js에서 함수는 **객체 타입의 값**
- js에서 함수는 **변수에 할당** 가능, **프로퍼티 값** 될 수 있음, **배열의 요소** 될 수 있음
- 이처럼 **값의 성질을 갖는 객체** == **일급 객체** -> js에서 함수는 **일급 객체** -> 함수를 값처럼 자유롭게 사용 가능

```js
var add = function (x, y) {
    return x + y;
};

console.log(add(2, 5)); // 7
```

- 함수 리터럴의 함수 이름은 생략 가능 (-> 익명 함수)
- 함수를 호출할 때에는 함수 이름이 아니라 **함수 객체를 가리키는 식별자**를 사용

```js
// 기명 함수 표현식
var add = function foo (x, y) {
    return x + y;
};

console.log(add(2, 5)); // 7
console.log(foo(2, 5)); // ReferenceError: foo is not defined
```

<hr>


#### \* [ 함수 생성 시점과 함수 호이스팅 ]


```js
// 함수 참조
console.dir(add); // f add(x, y)
console.dir(sub); // undefined

// 함수 호출 
console.log(add(2, 5)); // 7
console.log(sub(2, 5)); // TypeError: sub is not a function

// 함수 선언문 -> 함수 호이스팅 발생 O (이를 피하기 위해 더글라스 크락포트는 함수 표현식 사용을 권장함)
function add(x, y){ 
    return x + y;
}

// 함수 표현식 -> 함수 호이스팅 발생 X
var sub = function (x, y){ // var 키워드를 활용한 "변수 할당문"
    return x - y;
};
```

- **함수 선언문**으로 정의한 함수는 함수 선언문 **이전**에 **호출 가능**
- **함수 표현식**으로 정의한 함수는 함수 표현식 **이전**에 **호출 불가능**
- -> 함수 선언문 정의 함수와 함수 표현식 정의 함수의 **생성 시점이 다르기 때문**

<br>

- 모든 선언문처럼 함수 선언문도 **런타임(코드가 한 줄씩 순차적으로 실행되는 시점) 이전**에 js 엔진에 의해 먼저 실행됨
- 런타임에는 이미 [ 함수 객체가 생성 ]되어 있고 & [ 함수 이름과 동일한 식별자에 할당 ]까지 완료된 상태
- -> 이처럼 **함수 선언문이 코드의 선두로 끌어 올려진 것처럼 작동**하는 것을 **함수 호이스팅 fucntion hoisting** 이라고 함

<br>

- 함수 호이스팅과 변수 호이스팅은 차이가 있음
- var 키워드를 사용한 변수 선언문도 런타임 이전에 실행되어 **식별자를 생성**하지만,
- var 키워드로 선언된 변수는 **undefined로 초기화**되고 vs 함수 선언문으로 (암묵적) 생성된 식별자는 **함수 객체로 초기화**됨
- 따라서 위 예시에서 sub는 변수 선언문 이전에 변수를 참조하여 undefined로 평가된 것
- **변수 할당문의 값은 할당문이 실행되는 시점(런타임)에 평가됨**


<hr>


### 3) Function 생성자 함수 활용

- **일반적이지 않으며 바람직하지 않음** (클로저를 생성하지 않는 등 선언문 or 표현식으로 생성한 함수와 다르게 동작함)
- js 기본 빌트인 함수인 Function **생성자 함수(객체를 생성하는 함수)**를 활용 
- 매개변수 목록 & 함수 몸체를 **문자열**로 전달하면서 호출 시, 함수 객체를 생성해 반환함

```js
// new 연산자가 없어도 결과는 동일함
var add = new Function('x', 'y', 'return x + y');

console.log(add(2, 5)); // 7
```

```js
var add1 = (function() { 
    var a = 10;
    return function (x, y) { // x <- 1, y <- 2
        return x + y + a;
    };
}());

console.log(add1(1, 2)); // 13


// 클로저를 생성하지 않음 (추후 다뤄질 내용)
var add2 = (function() {
    var a = 10;
    return new Function('x', 'y', 'return x + y +a;');
}());

console.log(add2(1, 2)); // ReferenceError: a is not defined
```


<hr>


### 4) 화살표 함수 arrow function 활용 (ES6) 

- ES6에서 도입
- function 키워드 대신 **화살표 (=>, fat arrow)**를 사용해 함수를 선언
- 화살표 함수는 항상 **익명 함수**로 정의

```js
const add = (x, y) => x + y;
// 키워드 function 사라짐
// 중괄호 사라짐
// return 사라짐 

console.log(add(2, 5)); // 7
```

- 기존의 함수 선언문 or 함수 표현식을 완전히 대체하기 위해 디자인된 것은 아님
- 26.3절 화살표 함수에서 추가로 다뤄질 예정 [ 생성자 함수로 사용 불가, 기존 함수와 this 바인딩 방식이 다름, prototype 프로퍼티가 없음, arguments 객체를 생성하지 않음 ]



## 12.5 함수 호출

- foo(x, y) <- **() : 함수 호출 연산자**
- 함수 호출 시 현재의 실행 흐름을 중단 & 호출된 함수로 실행 흐름을 옮김
- 매개변수에 인수가 순서대로 할당됨 & 함수 몸체의 문들의 실행이 시작됨

<br>

- 함수가 호출되면 함수 몸체 내에서 암묵적으로 매개변수가 생성됨
- 일반 변수와 마찬가지로 undefined로 초기화된 후 인수가 순서대로 할당됨
- 매개변수는 함수 몸체 내부에서만 참조 가능함 
- **매개변수의 스코프(유효 범위)**는 **함수 내부**

```js
function add(x, y) {
    console.log(x, y); // 2, 5
    return x + y;
}

add(2, 5);

console.log(x, y); // ReferenceError: x is not defined
```

<hr>

- [ 매개변수의 개수 vs 인수의 개수 ]에 대하여 일치 여부를 체크하지 않음
- 인수가 부족하여 **인수가 할당되지 않은 매개변수**의 값 === **undefined**
- 인수가 초과될 경우 매개변수보다 더 많은 인수는 무시됨

```js
function add(x, y) {
    return x + y; // 2 + undefined -> NaN
}

console.log(add(2)); // NaN

console.log(add(2, 5)); // 7

console.log(add(2, 5, 10)); // 7, 초과된 인수는 무시
```


- 초과된 인수 : 그냥 버려지는 것이 아니라, 암묵적으로 **arguments 객체의 프로퍼티**로 보관됨
- arguments 객체는 [ 함수 정의 시 매개변수 개수를 확정할 수 없는 ] **가변 인자 함수**를 구현할 때 유용함 (Chapter 18)

```js
function add(x, y) {
    console.log(arguments); // Arguments(3) [2, 5, 10, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    return x + y; 
}

add(2, 5, 10);
```

<hr>


#### \* [ 인수 확인 ]

```js
function add(x, y) {
    return x + y;
}

console.log(add(2)); // NaN
console.log(add('a', 'b')); // 'ab'
```

```js
function add(x, y) {
    
    // x 혹은 y 둘 중 하나라도 number 타입이 아닐 경우
    if (typeof x !== 'number' || typeof y !== 'number') {
        
        // raise TypeError
        throw new TypeError('인수는 모두 숫자 값이어야 함');
    }

    return x + y;
}

console.log(add(2));         // TypeError: 인수는 모두 숫자 값이어야 함
console.log(add('a', 'b'));  // TypeError: 인수는 모두 숫자 값이어야 함
```

- 위와 같이 처리하더라도 부적절한 호출을 사전에 방지할 수 없음
- **타입스크립트**와 같이 **정적 타입 선언**이 가능한 js의 상위 확장 도입도 가능 

<hr>

```js
function add(a, b, c) {
    
    // 단축 평가를 활용한 매개변수 기본값 할당
    a = a || 0;
    b = b || 0;
    c = c || 0; 
    
    return a + b + c;
}

console.log(add(1, 2, 3)) // 6
console.log(add(1, 2)) // 3
console.log(add(1)) // 1
console.log(add()) // 0


// (ES6) 매개변수 기본값을 활용한 인수 체크 & 초기화 
// 기본값 적용 범위 : 매개변수에 인수를 전달하지 않았을 경우 or undefined를 전달한 경우

function add(a = 0, b = 0, c = 0) { // 인수가 nothing or undefined인 경우
    return a + b + c;
}

console.log(add(1, 2, 3)) // 6
console.log(add(1, 2)) // 3
console.log(add(1)) // 1
console.log(add()) // 0
```


#### \* [ 매개변수의 개수 ]

- 이상적인 매개변수 개수는 0개, 적을수록 좋음
- 최대 3개까지만 권장, 그 이상의 경우 [ 하나의 매개변수를 선언 & 객체를 인수로 전달 ]
- 주의할 점 : **함수 내부로 전달한 객체를 함수 내부에서 변경 시, 함수 외부의 객체가 변경**되는 부수 효과가 발생할 수 있음 

```js
$.ajax({
    method: 'POST',
    url: '/user',
    data: { id: 1, name: 'Lee' }, // jQuery의 ajax 메서드에 [ 객체를 인수로 전달 ]하는 예시
    cache: false
});
```


#### \* [ 반환문 ]

```js
function multiply(x, y) {
    return x * y;

    // 반환문 이후의 다른 문은 실행되지 않고 무시됨
    console.log('실행되지 않는다');
}

console.log(multiply(3, 5)); // 15


function foo() {
    return; // 반환값을 위한 표현식을 명시적으로 지정하지 않으면 undefined 반환
}

console.log(foo()); // undefined


function foo() {
    // 반환문 생략 시 암묵적으로 undefined 반환
}

console.log(foo()); // undefined

 
function multiply(x, y) {
    return  // 세미콜론 자동 삽입 기능(ASI)에 의해 세미콜론 자동 추가됨
    x * y; // 무시됨
}

console.log(multiply(3, 5)); // undefined
```



## 12.6 참조에 의한 전달 & 외부 상태의 변경

- 원시 값 : 값에 의한 전달 pass by value
- 객체 : 참조에 의한 전달 pass by reference
- -> 매개변수도 타입에 따라 값에 의한 전달 & 참조에 의한 전달 방식을 그대로 따름


```js

function changeVal(primitive, obj) {
    primitive += 100; // 재할당을 통해 할당된 원시값을 새로운 원시값으로 교체
    obj.name = 'Kim'; // 재할당 없이 직접 할당된 객체를 변경
}

var num = 100; 
var person = { name: 'Lee' };

console.log(num); // 100
console.log(person); // {name: "Lee"}


changeVal(num, person);
// primitive는 원시 값을 전달받음 : 값 자체가 복사되어 전달됨 
// obj는 객체를 전달받음 : 참조 값이 복사되어 전달됨

console.log(num); // 100 <- 원시 값은 원본이 훼손되지 않음
console.log(person); // {name: "Kim"} <- 객체는 원본이 훼손됨
```

- 이러한 문제의 해결 방법 중 하나는 객체를 immutable object로 만들어 사용하는 것
- 객체를 마치 원시 값처럼 변경 불가능한 값으로 동작하게 만드는 것
- 객체의 상태 변경이 필요한 경우, 객체의 방어적 복사(defensive copy)를 통해 원본 객체를 완전히 복제(깊은 복사 deep-copy)하여 새로운 객체를 생성하고 재할당을 통해 교체함 

<hr>

### [ 함수형 프로그래밍 ]

- **순수 함수** : <u>외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는</u> 함수 (@ 12.7.5절)
- **함수형 프로그래밍** : 순수 함수를 통해 부수효과를 최대한 억제하여 오류를 피하고, 프로그램의 안정성을 높이려는 프로그래밍 패러다임 

<hr>



## 12.7 다양한 함수의 형태


### [ 1) 즉시 실행 함수 ]

- **IIFE**, Immediately Invoked Function Expression
- 함수 정의와 동시에 즉시 호출되는 함수


```js
(function() {
    var a = 3;
    var b = 5;
    return a * b;
}());
```

- 즉시실행 함수는 익명 함수를 사용하는 것이 일반적
- 위에서 **그룹 연산자 (...)로 함수를 묶은 이유**는 [ 내부의 익명/기명 함수가 **함수 리터럴로 평가되어 함수 객체를 생성**하기 위함 ]
- 기명 즉시실행 함수도 가능하나 그룹연산자 () 내의 기명함수는 함수 리터럴로 평가되므로 (마찬가지로) 다시 호출할 수 없음

```js
(function foo() {
    var a = 3;
    var b = 5;
    return a * b;
}());

foo(); // ReferenceError: foo is not defined
```


```js

// 즉시실행 함수는 반드시 그룹 연산자 (...) 로 감싸줘야 함
// 함수 선언문은 함수 이름을 생략할 수 없기 때문
function () { // SyntaxError: Function statements require a function name
    // ...
}(); 

// 아래에서는 js 엔진이 코드블록 닫는 중괄호 뒤에 세미콜론을 자동삽입하기 때문에 에러 발생
function foo() {
    // ... 
}(); // SyntaxError: Unexpected token ')'

function foo() {}(); // => function foo() {};();
// 위에서 함수 선언문 뒤의 () 가 함수 호출 연산자가 아닌 그룹 연산자로 해석됨
// 이 때, 그룹 연산자 내에 피연산자가 없으므로 아래와 동일한 에러가 발생하는 것

(); // SyntaxError: Unexpected token ')'

// 그룹 연산자의 피연산자는 값으로 평가되므로,
// 기명 OR 무명 함수를 그룹 연산자로 감싸면 함수 리터럴로 평가되어 함수 객체가 됨
console.log(typeof ( function f(){} )); // function
console.log(typeof ( function  (){} )); // function
```


```js
// 먼저 함수 리터럴로 평가해서 함수 객체를 생성할 수 있다면 다음과 같이 다른 연산자를 사용해도 ok
// 다만 가장 일반적인 방법은 전체를 그룹 연산자로 감싸는 첫번째 방식

(function (){
    // ...    
}()); // [ 함수 실행 연산자까지 ] 그룹 연산자 안에 넣어준다

(function (){
    // ...
})();

!function() {
    // ...
}();

+function() {
    //...
}();
```


```js

// 즉시실행 함수도 일반 함수처럼 값을 반환할 수 있음
var res = (function() {
    var a = 3;
    var b = 5;
    return a * b;
}());

console.log(res); // 15


// 즉시실행 함수에도 일반 함수처럼 인수 전달이 가능
res = (function (a, b) {
    return a * b;
}(3, 5));

console.log(res); // 15
```

<hr>


### [ 2) 재귀 함수 ]

- 재귀 호출 recursive call : 함수가 자기 자신을 호출하는 것
- 재귀 함수 recursive function : 자기 자신을 호출하는 함수, 반복되는 처리를 위해 사용함
- 재귀 함수는 반복문을 사용하는 것보다 더 직관적으로 이해하기 쉬울 때만 한정적으로 사용


```js

// 반복문을 사용하는 방법
function countdown(n) {
    for (var i = n; i >= 0; i--) {
        console.log(i);
    };
}

countdown(10); 


// 재귀 함수를 사용하는 방법
function countdown(n) {
    if (n < 0) {
        return;
    }
    console.log(n);
    countdown(n - 1); // 재귀 호출
}

countdown(10);
```


```js
// 팩토리얼 : 1부터 자기 자신까지의 모든 양의 정수의 곱
// n! = 1 * 2 * ... * (n-1) * n
// exceptionally, 0! = 1


// 1) 반복문을 사용하는 경우
fucntion factorial(n) {
    
    if (n <= 1) {
        return 1;
    }
    
    var res = n;
    while (--n) { // --n 의 결과 값이 0이 되는 순간 stop
        res *= n;
    }
    
    return res;
}


// 2) 함수 선언식을 활용하는 경우
function factorial(n) {
    
    // 탈출 조건 (없을 시 함수가 무한 호출되어 스택 오버플로 stack overflow 발생)
    if (n <= 1) { 
        return 1;
    }
    
    return n * factorial(n - 1);
    // 위 라인에서 활용된 식별자 factorial은 함수 이름
    // 함수 이름은 함수 몸체 내부에서는 유효하므로, 
    // 함수 내부에서는 함수 이름을 통해 함수를 호출할 수 있음
}

console.log(factorial(0)); // 0! = 1
console.log(factorial(1)); // 1! = 1
console.log(factorial(2)); // 2! = 2 * 1 = 2
console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6


// 3) 함수 표현식을 활용하는 경우
var factorial = function foo(n) {
    
    if (n <= 1) {
        return 1;
    }
    
    return n * factorial(n - 1); // 함수를 가리키는 식별자로 함수 호출

    // console.log(factorial === foo); // true
    // return n * foo(n - 1); // 함수 이름으로 자기 자신을 호출할 수도 있음
};

console.log(factorial(3)); // 3! = 3 * 2 * 1 = 6
```


<hr>


### [ 3) 중첩 함수 nested function (내부 함수 inner function) ] 

- 함수 내부에 정의된 함수
- 중첩 함수를 포함하는 함수 = 외부 함수 outer function
- 중첩 함수는 **외부 함수 내부**에서만 호출 가능
- 중첩 함수는 **자기 자신을 포함한 외부 함수를 돕는 헬퍼 함수** 역할을 함
- [ 중첩 함수는 **스코프** 및 **클로저**와 깊은 관련이 있음 ]


```js
function outer() {
    var x = 1;
    
    // 중첩 함수
    function inner() {
        var y = 2;

        // 외부 함수의 변수를 참조 가능
        console.log(x + y); // 3
    }

    inner();
}

outer(); // -> 내부의 inner() 를 통해 console.log(x + y) 실행됨
```


<hr>


### [ 4) 콜백 함수 ]

```js

function repeat(n) {
    
    // 단순히 i를 출력함
    for (var i = 0; i < n; i++) {
        console.log(i);
    }    
}

repeat(5); // 0 1 2 3 4

```

- 위와 같이 어떤 일을 반복 수행하는 함수가 있을 때,
- repeat 함수는 console.log(i)에 강하게 의존하고 있어 다른 작업이 불가능함
- 만약 repeat 함수의 반복문 내부에서 다른 작업을 하려면 함수를 새로이 정의해야 함

```js

function repeat1(n) {
    
    // 단순히 i를 출력함
    for (var i = 0; i < n; i++) {
        console.log(i);
    }    
}

repeat1(5); // 0 1 2 3 4


function repeat2(n) {
    
    // i가 홀수일 때에만 i를 출력함
    for (var i = 0; i < n; i++) {
        if (i % 2) { // i % 2 = 0 or 1 -> 1일 때에만 코드블록이 실행됨
            console.log(i);
        }
    }    
}

repeat2(5); // 1 3
```

- 위와 같이 반복하는 대상은 동일하나 반복하며 하는 작업은 다른 경우,
- 함수를 매번 새로이 정의하는 대신 **함수를 합성**하는 것으로 해결 가능

<br>

- 함수의 변하지 않는 공통 로직은 미리 정의
- **경우에 따라 변경되는 로직은 추상화**하여 **함수 외부에서 함수 내부로** 전달


```js

function repeat(n, f) { // 고차 함수 
    for (var i = 0; i < n; i++) {
        
        f(i); 
        // i를 전달하며 함수 f를 호출
        // 경우에 따라 변경되는 일을 함수 f로 추상화함
        // 이를 외부에서 전달받음
    }
}


var logAll = function(i) { // 콜백 함수
    console.log(i); 
};

repeat(5, logAll); // 반복 호출할 A 함수를 인수로 함께 전달
// js의 함수는 일급 객체이므로 [ 함수의 매개변수를 통해 함수 자체를 전달 가능 ]
// 고차 함수(repeat)에게 콜백 함수(logAll)를 전달할 때에는 콜백 함수를 호출하지 않고 함수 자체를 전달해야 함 (함수 호출 연산자 ()가 없음에 유의)


var logOdds = function(i){ // 콜백 함수
    if (i % 2) {
        console.log(i);
    }
};

repeat(5, loggOdds); // 반복 호출할 B 함수를 인수로 함께 전달
```

- **콜백 함수 callback function** : 함수의 매개변수를 통해 **다른 함수의 내부로 전달되는 함수** (내부에서 다시back 불러와짐call) <- 위에서 [ logAll & logOdds ] 
- **고차 함수 Higher-Order function HOF** : 매개 변수를 통해 **함수의 외부에서 콜백 함수를 전달받은 함수** (타 함수를 활용하는 입장의 더 상위의 함수) <- 위에서 [ repeat ]

<br>

- [ 1) 매개변수를 통해 함수를 전달받거나 2) 반환값으로 함수를 반환하는 함수 ]를 함수형 프로그래밍에서 고차 함수라고 함

<br>

- 중첩 함수는 외부 함수를 돕는 헬퍼 함수 <- 중첩 함수는 고정되어 있어 교체가 어려움
- 콜백 함수는 고차 함수를 돕는 헬퍼 함수 <- 콜백 함수는 고차 함수 외부에서 자유로이 교체 가능
- -> **고차 함수는 콜백 함수를 자신의 일부분으로 합성**함

<br>

- 고차 함수는 콜백 함수의 호출 시점을 결정하여 호출함
- 콜백 함수는 고차 함수에 의해 호출되며, 고차 함수는 필요에 따라 콜백 함수에 인수를 전달함 (다만 **모든 콜백 함수가 고차 함수에 의해 호출되는 것은 아님**)
- 고차 함수에게 콜백 함수를 전달할 때에는 **콜백 함수를 호출하지 않고 함수 자체를 전달**해야 함 (함수 호출 연산자 ()가 없음에 유의)
- 콜백 함수가 고차 함수 내부에만 호출될 시, 콜백 함수를 익명 함수 리터럴로 정의하면서 바로 고차 함수에 전달할 수 있음


```js
// 익명 함수 리터럴을 콜백 함수로 고차 함수에 전달

repeat(5, function(i) {
    if (i % 2) {
        console.log(i);
    }
}); // 1 3
```

- 콜백 함수를 다른 곳에서도 호출할 필요가 있거나,
- 콜백 함수를 전달받는 함수가 자주 호출된다면,
- 함수 외부에서 콜백 함수를 정의하고 함수 참조를 고차 함수에 전달하는 편이 효율적 (앞서 다뤄진 logAll & logOdds에 해당)

<br>

- 콜백 함수는 함수형 프로그래밍 패러다임 뿐만 아니라,
- **비동기 처리(이벤트 처리, Ajax 통신, 타이머 함수 등)**에 활용되는 중요한 패턴

```js
// 콜백 함수를 활용한 이벤트 처리

document.getElementById('myButton').addEventListener('click', function() {
    console.log('button clicked!');
});
// addEventListener : 고차 함수
// 익명 함수 리터럴 : 콜백 함수


// 콜백 함수를 사용한 비동기 처리

setTimeout(function () {
    console.log('1초 경과'); 
}, 1000);
// setTimeout : 고차 함수 
// 익명 함수 리터럴 : 콜백 함수
```


```js
// 배열 고차 함수에서도 활용되는 콜백 함수

var res = [1, 2, 3].map(function (item) {
    return item * 2;
});
// map : 고차 함수 
// 익명 함수 리터럴 : 콜백 함수

console.log(res); // [2, 4, 6]


var res = [1, 2, 3].filter(function (item) {
    return item % 2;
});
// filter : 고차 함수 
// 익명 함수 리터럴 : 콜백 함수

console.log(res); // [1, 3]


var res = [1, 2, 3].reduce(function (acc, cur) { // 누적값, 현재값
    return acc + cur;
}, 0); // reduce 함수의 초기값
// reduce : 고차 함수 
// 익명 함수 리터럴 : 콜백 함수

console.log(res); // 6

// acc 0 cur 1
// acc 1 cur 2
// acc 3 cur 3 -> return 3 + 3
// map, reduce 활용하기 @ https://j.mp/2OkNnlU


var res = [1, 2, 3].reduce(function (acc, cur) {
    acc.push(cur % 2 ? '홀수' : '짝수');
    return acc;
}, []); 

console.log(res); // ['홀수', '짝수', '홀수']
// 위와 같이 sort, every, some, find, findIndex, includes도 다 reduce로 구현 가능함
```


<hr>


### [ 5) 순수 함수 & 비순수 함수 (@ 함수형 프로그래밍)] 


- **순수 함수 pure function** : <u>외부 상태를 변경하지 않고 외부 상태에 의존하지도 않는</u> 함수 (부수 효과 X)
- **비순수 함수 impure function** : <u>외부 상태를 변경하거나 외부 상태에 의존하는</u> 함수 (부수 효과 O)

<br>

- 순수 함수는 동일한 인수 전달 시 언제나 동일한 값을 반환
- 어떤 외부 상태에도 의존하지 않고, **오직 매개변수를 통해 함수 내부로 전달된 인수에게만 의존**해 반환값을 만듦
- 만약 외부 상태에 의존하는 함수라면, **외부 상태에 따라 반환값이 달라질 수 있음**


```js
var count = 0;

// 순수 함수
function increase(n) {
    return ++n; 
}

count = increase(count); 
console.log(count); // 1


count = increase(count);
console.log(count); // 2
```


- 비순수 함수는 **외부 상태에 따라** 반환값이 달라지게 됨
- 함수의 외부 상태를 변경하는 부수 효과도 있음


```js
var count = 0;

// 비순수 함수
function increase() { // no params 
    return ++count; // 외부 상태에 의존 & 외부 상태를 변경
}

increase();
console.log(count); // 1

increase();
console.log(count); // 2

// 외부 상태(count)를 변경함 & 상태 변화를 추적하기 어려움
```

- 함수 내부에서 외부 상태를 직접 참조하면 외부 상태에 의존하게 되어 반환값이 변하게 됨
- 함수 내부에서 외부 상태를 직접 참조하지 않더라도 **매개변수를 통해 <u>객체</u>를 전달받으면** 비순수 함수가 됨 (12.6 참조에 의한 전달 & 외부 상태의 변경)
- 함수 외부 상태의 변경을 지양하는 순수 함수를 사용하는 것이 좋음

<br>

- **함수형 프로그래밍**은,
- 순수 함수와 보조 함수의 조합을 통해 외부 상태를 변경하는 부수 효과를 최소화하여 불변성을 지향함
- 로직 내에 존재하는 조건문 & 반복문을 제거하여 복잡성 해결 (가독성 향상)
- 변수 사용을 억제 or 변수의 생명 주기를 최소화하여 상태 변경을 피해 오류를 최소화 (오류 발생의 근본적 원인을 해결)
