# 15. let, const 키워드와 블록 레벨 스코프



## 15.1 var 키워드로 선언한 변수의 문제점 

- var : ES5 까지 변수를 선언할 수 있었던 유일한 방법


### [ 1) 변수 중복 선언 허용 ]

```js
var x = 1;
var y = 1;

var x = 100; // 의도치 않게 먼저 선언된 변수 값이 변경될 수 있음
var y; // 초기화 문이 없는 변수 선언문은 무시됨

console.log(x); // 100
console.log(y); // 1
```

- var 키워드로 중복 선언 시 : 초기화문(변수 선언과 동시에 초기값을 할당하는 문)의 유무에 따라 다르게 동작함
- 초기화 문이 있는 경우 : js 엔진에 의해 var 키워드가 없는 것처럼 동작
- 초기화 문이 없는 경우 : 무시됨 & 에러 발생 X



### [ 2) 함수 레벨 스코프 (함수의 코드 블록만을 지역 스코프로 인정) ]

- var 키워드로 선언한 변수는 **함수의 코드 블록**만을 **지역 스코프**로 인정함
- 함수 외부에서 var 키워드로 선언한 변수는 코드 블록 내에서 선언해도 모두 전역 변수가 됨
- **의도치 않게 전역 변수가 중복 선언될 수 있음**

```js
var x = 1;

if (true) {
    var x = 10; // 전역 변수
}

console.log(x); // 10
```

```js
var i = 10;

for (var i = 0; i < 5; i++ ) { // for 문에서 선언한 i도 전역 변수
    console.log(i); // 0 1 2 3 4 
}

console.log(i); // 5
```


### [ 3) 변수 호이스팅 ]

- 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조 가능
- 할당문 이전에 변수 참조시 undefined 반환

```js
// 첫 라인 실행 전 이미 foo 변수는 선언되고 undefined로 초기화됨
console.log(foo); // undefined

foo = 123;

console.log(foo); // 123

var foo; // 이 변수 선언문이 최상단까지 끌어올려진 것처럼 작동하게 되는 것

// 위와 같이 프로그램의 흐름 상 맞지 않고 가독성을 떨어뜨리게 됨
```



## 15.2 let 키워드 (ES6)

- let 명칭의 어원에 대하여 @ https://likejirak.tistory.com/182


### [ 1) 변수 중복 선언 금지 ]

- let & const 키워드로 선언된 변수는 **같은 스코프 내에서 중복 선언을 허용하지 않음**

```js
let bar = 123;

let bar = 456; // SyntaxError : Indentifier 'bar' has already been declared
```


### [ 2) 블록 레벨 스코프 (모든 코드 블록을 지역 스코프로 인정) ]

- let 키워드로 선언한 변수는 모든 코드 블록(**함수, if, for, while, try/catch 등**)을 **지역 스코프로 인정**하는 블록 레벨 스코프를 따름

```js
let foo = 1; // 전역 변수

{ 
    let foo = 2; // 지역 변수
    let bar = 3; // 지역 변수
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

```js
let i = 10;

function foo() {
    let i = 100;

    for (let i = 1; i < 3; i++) {
        console.log(i); // 1 2
    }

    console.log(i); // 100
}

foo(); 

console.log(i); // 10
```


### [ 3) 변수 호이스팅 ]

```js
// let 키워드로 선언한 변수는 변수 호이스팅이 발생하지 않는 것처럼 보임

console.log(foo); // ReferenceError: foo is not defined

let foo;
```

- let 키워드로 선언한 변수는 [ 선언 단계 ] & [ 초기화 단계 ]가 분리되어 실행됨
- [ 선언 단계 ] : 런타임 이전에 js 엔진에 의해 암묵적으로 실행됨 
- [ 초기화 단계 ] : **변수 선언문에 도달했을 때 실행** (var의 경우는 선언 단계와 동시에 진행)

> 이 때, 스코프의 시작 지점부터 let 초기화 지점까지 변수를 참조할 수 없는 구간을 **일시적 사각 지대 Temporal Dead Zone TDZ**라고 부른다

```js
// 아래 라인 실행 전 이미 선언은 마쳐진 상태가 됨
console.log(foo); // ReferenceError: foo is not defined
// 위 라인은 일시적 사각지대에 놓여 있음

let foo; // 초기화문
console.log(foo); // undefined

foo = 1; // 할당문
console.log(foo); // 1
```

```js
let foo = 1;

{ 
    console.log(foo); // 1
}


let foo2 = 1; // 전역 변수

{ 
    console.log(foo2); // ReferenceError: Cannot access 'foo' before initialization
    let foo2 = 2; // 지역 변수
}
```

- let 키워드로 선언한 변수도 사실 여전히 호이스팅이 발생해 위 두번째 예시에서 참조 에러가 발생함
- ES6에서 도입된 let, const, class를 사용한 선언문은 호이스팅이 발생하지 않는 것처럼 작동하나,
- 사실 js는 let, const를 포함해 모든 선언(**var let const function function* class 등**)을 모두 호이스팅함


### [ 4) 전역 객체와 let ]

- 1) [ var 키워드로 선언한 전역 변수 & 전역 함수 ] + 2) [ 선언하지 않은 변수에 값을 할당한 암묵적 전역 ] 은 **전역 객체 window의 프로퍼티**가 된다 (@ 브라우저 환경)
- 전역 객체의 프로퍼티 참조 시 **window를 생략**할 수 있다.

```js
// 아래 예제는 브라우저 환경에서 작동함

var x = 1; // 전역 변수
y = 2; // 암묵적 전역
function foo() {} // 전역 함수

console.log(window.x); // 1
console.log(x); // 1 <- 전역 객체 window의 프로퍼티는 전역 변수처럼 사용 가능

console.log(window.y); // 2
console.log(y); // 2 <- 전역 객체 window의 프로퍼티는 전역 변수처럼 사용 가능

console.log(window.foo); // f foo() {}
console.log(foo); // f foo() {} <- 전역 객체 window의 프로퍼티는 전역 변수처럼 사용 가능
```

- let 키워드로 선언한 전역 변수는 **전역 객체의 프로퍼티가 아니다**
- 즉 window.foo 와 같이 **접근할 수 없다**.
- **let 전역 변수**는 **보이지 않는 개념적인 블록** 내에 존재하게 됨 
<br>(전역 렉시컬 환경의 선언적 환경 레코드 @ 23장 실행 컨텍스트)

```js
// 아래 예제는 브라우저 환경에서 작동함

let x = 1;

console.log(window.x); // undefined
console.log(x); // 1
```



## 15.3 const 키워드 (ES6)

- const 키워드는 상수를 선언하기 위해 사용하나,
- 상수만을 위해 사용하지는 않는다.
- 대부분 let 과 유사하므로 다른 점을 중심으로 살펴보기로 함


### [ 1) 선언과 초기화 ]

- const 키워드로 선언하는 변수는 반드시 **선언과 동시에 초기화**해야 한다.

```js

const foo = 1; // 선언과 동시에 초기화

const bar; // SyntaxError: Missing initializer in const declaration
```

- let과 마찬가지로 **블록 레벨 스코프**를 가지며 & **호이스팅이 발생하지 않는 것처럼 동작**함 

```js
{
    console.log(foo); // ReferenceError: Cannot access 'foo' before initialization
    
    const foo = 1;
    console.log(foo); // 1
}

console.log(foo); //  ReferenceError: foo is not defined
```


### [ 2) 재할당 금지 ]

```js
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.

// const 키워드로 선언한 변수는 재할당이 금지됨
```


### [ 3) 상수 ]

- const 키워드로 선언한 변수에 **원시 값을 할당한 경우** 변수 값 변경이 불가능
- 원시 값은 변경 불가능한 값이므로 재할당 없이 값을 변경할 수 없기 때문

<br>

- 상수도 결국 값을 저장하기 위한 메모리 공간이 필요하므로 변수라고 할 수 있으나,
- 상수는 **재할당이 금지**되어 있음

<br>

- 상수는 **상태 유지 / 가독성 / 유지보수의 편의**를 위해 적극적인 사용을 권장
- 일반적으로 상수는 **대문자로 선언**하여 상수임을 표시함
- 여러 단어로 구성될 시 **스네이크 케이스** 활용

```js
let preTaxPrice = 100;

let afterTaxPrice = preTaxPrice + ( preTaxPrice * 0.1 );
// 위에서 "0.1"의 의미를 명확히 알기 어려우므로 가독성이 좋지 않음
// 위에서 "0.1"처럼 쉽게 바뀌지 않을 값이며 프로그램 전체에서 고정된 값을 사용해야할 경우 상수로 정의 

console.log(afterTaxPrice); // 110
```

```js
const TAX_RATE = 0.1;

let preTaxPrice = 100;

let afterTaxPrice = preTaxPrice + ( preTaxPrice * TAX_RATE );

console.log(afterTaxPrice); // 110
```


### [ 4) const 키워드와 객체 ]

- const 키워드로 선언된 변수에 [ 원시 값 할당 시 ] : 값 변경 불가능
- const 키워드로 선언된 변수에 [ 객체 할당 시 ] : 값 변경 가능

```js
const person = {
    name: 'Lee'
};

person.name = 'Kim';

console.log(person); // {name: 'Kim'}
```

- const 키워드는 재할당을 금지할 뿐 **불변을 의미하지는 않음**
- 새로운 값의 할당은 불가능하나,
- [ 프로퍼티 동적 생성, 삭제, 프로퍼티 값의 변경을 통해 객체를 변경하는 것 ]은 가능함 (객체가 변경되더라도 변수에 할당된 참조 값은 변경되지 않음)



## 15.4 var vs let vs const 

- 변수 선언에는 **기본적으로 const를 사용**
- **재할당이 필요한 경우에 let**을 한정적으로 사용

  1) ES6 사용 시 **var 사용 X**
  2) **재할당이 필요**한 경우에 한정해 **let** 사용 (변수의 스코프는 최대한 좁게)
  3) **변경 X & 읽기 전용으로 사용**하는 원시 값 & 객체에는 **const** 사용 

- 변수를 선언하는 시점에는 재할당이 필요할지 판단하기 어려울 수 있음
- 객체는 의외로 재할당하는 경우가 적음
- 따라서 변수를 선언할 때에는 일단 const 사용 
- -> **반드시 재할당이 필요할 경우에 const를 let로 변경해도 ok**



## 추가 학습자료

- 변수의 유효범위와 클로저 (렉시컬 환경 관련 상세한 설명) @ https://ko.javascript.info/closure#ref-2866
- var & const Hoisting 시각화 @ https://dev.to/lydiahallie/javascript-visualized-hoisting-478h 