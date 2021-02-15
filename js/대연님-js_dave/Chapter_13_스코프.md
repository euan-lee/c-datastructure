# 13. 스코프 (scope, 유효범위)



## 13.1 스코프란?


```js

function add(x, y) {
    console.log(x, y);
    return x + y;
}

add(2, 5);

// 함수 매개변수의 스코프(유효범위)는 함수 몸체 내부
console.log(x, y); // ReferenceError: x is not defined
```


```js
var var1 = 1; // 코드의 가장 바깥 영역

if (true) {
    var var2 = 2; // 코드 블록 내 

    if (true) {
        var var3 = 3; // 중첩된 코드 블록 내
    }
}

// 지역 스코프는 코드 블록이 아닌 함수에 의해서만 생성됨 (var2 & var3는 전역 스코프에 포함됨)
console.log(var1); // 1
console.log(var2); // 2
console.log(var3); // 3


function foo() {
    var var4 = 4; // 함수 내

    function bar() {
        var var5 = 5; // 중첩된 함수 내 
    }
}

console.log(var4); // ReferenceError: var4 is not defined
console.log(var5); // ReferenceError: var5 is not defined
```


- 모든 식별자(변수/함수/클래스 이름 등)는 자신이 선언된 위치에 의해 
<br> 다른 코드가 식별자 자신을 참조할 수 있는 유효 범위가 결정됨 
<br> == **스코프 (식별자가 유효한 범위)**

- 스코프 == **네임스페이스** == **개체를 구분할 수 있는 범위** (하나의 이름 공간에서는 하나의 이름이 단 하나의 개체만을 가리키게 됨) 

- 위 예제에서와 같이 지역 스코프는 **코드 블록이 아닌 함수에 의해서만** 생성됨


```js
var x = 'global'; // 전역 스코프

function foo() {
    var x = 'local'; // 지역(함수 내부) 스코프 
    console.log(x);
}

foo(); // "local"

console.log(x); // "global"
```

- js 엔진은 이름이 같은 2개의 x 변수 중 어느 것을 참조해야할 지 결정해야 함 == **식별자 결정 identifier resolution**
- js 엔진은 스코프를 통해 어떤 변수를 참조해야할 것인지 결정함
- 즉, 스코프 == js 엔진이 **식별자를 검색할 때 사용하는 규칙**
- 스코프가 있기 때문에 같은 이름의 변수를 충돌 없이 활용할 수 있음 (운영체제 내 다양한 폴더에 위치한 동일 이름을 가진 파일들과 유사함)

<br>

- js 엔진은 코드를 실행할 때 코드의 문맥(코드가 어디서 실행되며 주변에 어떤 코드가 있는지)을 고려함 
- **"코드가 어디서 실행되며 주변에 어떤 코드가 있는지"** == **렉시컬 환경 lexical environment**
- 코드의 context는 렉시컬 환경으로 이뤄지며, 이를 구현한 것이 **실행 컨택스트(execution context)**
- 모든 코드는 실행 컨텍스트에서 평가되고 실행됨 (Chapter 23)


```js

function foo() {
    var x = 1;
    var x = 2; // js 엔진에 의해 var 키워드가 없는 것처럼 동작함

    console.log(x); 
}

foo(); // 2


function bar() {
    let x = 1;
    let x = 2;
}

bar(); // SyntaxError: Identifier 'x' has already been declared
```

- **var** 키워드로 선언된 변수는 **같은 스코프 내에서 중복 선언이 허용**됨
- 의도치 않게 변수값이 재할당되어 변경되는 부작용이 발생할 수 있음

- **let** & **const** 키워드로 선언된 변수는 **같은 스코프 내에서 중복 선언을 허용하지 않음**



## 13.2 스코프의 종류

- 전역 스코프 & 전역 변수 : global
- 지역 스코프 & 지역 변수 : local

<br>

- 전역 변수는 어디서든지 참조 가능
- 어디서든 -> **함수 내부에서도** 참조 가능

<br>

- 지역 변수는 **자신이 선언된 지역**과 **하위 지역(중첩 함수)**에서만 참조 가능 (자신의 지역 스코프 & 하위 지역 스코프)



## 13.3 스코프 체인

- 함수가 중첩될 수 있으므로 함수의 지역 스코프도 중첩이 가능
- 스코프는 함수의 중첩에 의해 **계층적 구조**를 갖게 됨
- 중첩 함수 입장에서, 자신을 포함하는 외부 함수의 지역 스코프 == 중첩 함수의 **상위 스코프**
- 전역 스코프 바로 아래 단계의 외부 함수 입장에서, 지역 스코프의 상위 스코프는 전역 스코프 

<br>

- 모든 지역 스코프의 최상위 스코프는 전역 스코프
- **스코프 체인 scope chain** : 스코프가 계층적으로 연결된 것 
- 변수를 참조할 때, js 엔진은 스코프 체인을 통해 [ 변수를 참조하는 코드의 스코프 ]에서 시작해 
<br> [ 상위 스코프 방향으로 이동하며 ] 선언된 변수를 검색함 (identifier resolution)
- -> 상위 스코프에서 유효한 변수는 하위 스코프에서 자유로이 참조 가능 vs <br> **하위 스코프에서 유효한 변수는 상위 스코프에서 참조 불가**

<br>

- 스코프 체인은 물리적인 실체로 존재함
- js 엔진은 코드 실행에 앞서 렉시컬 환경 lexical environment을 실제로 생성함
- 변수 선언 시, **변수 식별자가 레시컬 환경에 키 key로 등록**됨 
- 변수 할당 시, **렉시컬 환경의 변수 식별자에 해당하는 값 value을 변경**함
- 변수 검색 시, **렉시컬 환경 내에서 검색**이 이뤄짐 (변수를 참조하는 코드의 스코프에서 시작해 상위 스코프 방향으로 이동하며)

<br>


```js
function foo() {
    console.log('global foo');
}


function bar() {
    
    function foo() {
        console.log('local foo');
    }
    
    foo(); // local function 'foo' 실행 
}

bar(); // 'local foo'
```



## 13.4 함수 레벨 스코프

- 다른 언어들은 if / for / while 등의 코드 블록도 지역 스코프를 만듦 (block level scope) 
- js의 **지역 스코프**는 **코드 블록이 아닌 함수에 의해서만** 생성됨 (파이썬도 함수가 아닌 코드 블록이 지역 스코프를 만들지 않음)
- **var** 키워드로 선언된 변수는 오직 **함수의 코드 블록**만을 지역 스코프로 인정함 == function level scope
- <span style="color:red;"><b>(ES6) let & const 키워드는 블록 레벨 스코프를 지원함 </b></span>


```js
var x = 1;

if (true) { // 지역 스코프가 아닌 전역 스코프
    var x = 10; // 지역 변수가 아닌 전역 변수
}

console.log(x); // 10
```


```js
var i = 10;

for (var i = 0; i < 5; i++) {
    console.log(i); // 0 1 2 3 4 
}

console.log(i); // 5
```



## 13.5 렉시컬 스코프


```js
var x = 1;

function foo() {
    var x = 10;
    bar();
}

function bar() {
    console.log(x);
}

foo(); // 1 <- 렉시컬 스코프(정적 스코프)에 의해 함수 정의 위치가 상위 스코프를 결정함 (bar의 상위 스코프는 전역 스코프 & foo가 포함되지 않음)
bar(); // 1
```


[ 상위 스코프 결정의 기준 ]

- 1) 함수를 **어디서 호출**했는지에 따라 함수의 상위 스코프를 결정 : **동적 스코프 dynamic scope**
- 2) 함수를 **어디서 정의**했는지에 따라 함수의 상위 스코프를 결정 : **정적 스코프 static scope** or **렉시컬 스코프 lexical scope** <- js 를 비롯한 대부분의 방식

<br>

- js는 렉시컬 스코프를 따라, 함수를 어디서 정의했는지에 따라 상위 스코프를 결정함 
- **함수의 호출 위치**는 상위 스코프 결정에 **어떠한 영향도 없음**

<br>

- 함수 정의(함수 선언문 or 함수 표현식)가 실행되어 생성된 함수 객체는
위와 같이 결정된 상위 스코프를 기억함
- 함수가 호출되면 호출된 곳이 어디인지 관계없이 언제나 자신이 기억하고 있는 상위 스코프를 적용(활용)함
