# 17. 생성자 함수에 의한 객체 생성



## 17.1 Object 생성자 함수

```js


// 빈 객체의 생성
const person = new Object();


// 프로퍼티 or 메소드 추가
person.name = "Lee";

person.sayHello = function() {
    console.log('Hi! My name is ' + this.name);
};


console.log(person); // {name: "Lee", sayHello: f}
person.sayHello(); // Hi! My name is Lee

```

- **생성자 함수 constructor** : new 연산자와 함께 호출하여 객체(인스턴스)를 생성하는 함수
- **인스턴스 instance** : 생성자 함수에 의해 생성된 객체

>Object 생성자 함수 이외에도 아래와 같은 빌트인 생성자 함수가 있음
<span style='color:red; font-weight:bold;'>- String / Number / Boolean</span>
<span style='color:red; font-weight:bold;'>- Function / Array / Date / RegExp, Promise 등</span>


```js

const strObj = new String('Lee'); // String "객체" 생성

console.log(typeof strObj); // object (<- "String"이 아님)
console.log(strObj); // String {'Lee'}


const numObj = new Number(123); // Number "객체" 생성

console.log(typeof numObj); // object (<- "Number"가 아님)
console.log(numObj); // Number {'123'}


const boolObj = new Boolean(true); // Boolean "객체" 생성

console.log(typeof boolObj); // object (<- "Boolean"가 아님)
console.log(boolObj); // Boolean {'true'}


const func = new Function('x', 'return x * x'); // Function 객체 (함수) 생성

console.log(typeof func); // function
console.log(func); // f anonymous(x)


const arr = new Array(1, 2, 3); // Array 객체 (배열) 생성

console.log(typeof arr); // object
console.log(arr); // [1, 2, 3]


const regExp = new RegExp(/ab+c/i); // RegExp 객체 (정규표현식) 생성

console.log(typeof regExp); // object
console.log(regExp); // /ab+c/i


const date = new Date(); // Date 객체 생성

console.log(typeof date); // object
console.log(date); // Sat Mar 06 2021 02:20:20 GMT+0900 (대한민국 표준시)


```

- 객체를 생성하는 방법은 **객체 리터럴**을 사용하는 것이 더 간편함
- Object 생성자 함수를 사용한 객체 생성은 특별한 이유가 없다면 그다지 유용하지 않음



## 17.2 생성자 함수


### [ 객체 리터럴에 의한 객체 생성 방식의 문제점 ]

- **객체 리터럴에 의한 객체 생성**은 직관적이고 간편하나,
- <span style='color:red; font-weight:bold;'> 단 하나의 객체만 생성함</span>
- -> [ 동일한 프로퍼티를 갖는 객체를 여러 개 생성해야 하는 경우 ] 매번 같은 프로퍼티를 기술해야하므로 비효율적


```js

const circle1 = {
    radius : 5,
    getDiameter() { 
        return 2 * this.radius;
    }
};

console.log(circle1.getDiameter()); // 10


const circle2 = {
    radius : 10,
    getDiameter() { 
        return 2 * this.radius;
    }
};

console.log(circle2.getDiameter()); // 20

```

- 객체는 프로퍼티를 통해 고유의 상태 state를 표현
- 객체는 메서드를 통해 상태 데이터인 프로퍼티를 참조/조작하는 동작 behavior을 표현
- -> 객체마다 프로퍼티 값이 다를 수 있지만, **메서드는 내용이 동일한 경우가 일반적**


### [ 생성자 함수에 의한 객체 생성 방식의 장점 ]

: **객체(인스턴스)를 생성하기 위한 템플릿(클래스)**처럼 생성자 함수를 사용해 [ 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성 ]할 수 있음


```js

// 생성자 함수 <- 마치 클래스처럼 기능함
function Circle(radius) {
    // 생성자 함수 내부의 this == 생성자 함수가 생성할 인스턴스 그 자체
    this.radius = radius;
    this.getDiameter = function() {
        return  2 * this.radius;
    };
} // Circle 함수 자체는 별도의 return이 없음 


// 인스턴스의 생성
const circle1 = new Circle(5); 
const circle1 = new Circle(10); 

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20

```

- js의 생성자 함수는 자바 등의 다른 언어와 다르게 그 형식이 정해져 있는 것이 아니라,
- **일반 함수와 동일한 방법**으로 생성자 함수를 정의하고,
- **new 연산자와 함께 호출하면** 해당 함수가 생성자 함수로 작동함
- new 연산자 미사용 시 생성자 함수가 아닌 일반 함수로 작동하게 됨


```js

const circle3 = Circle(15); // 일반 함수로서 호출 & return 없음

// return이 없으므로 암묵적으로 undefined 반환됨
console.log(circle3); // undefined  

// 일반 함수로서 호출된 Circle 내의 this == 전역 객체
// Circle 함수 내의 this.radius = radius 로 인해 window.radius 값이 15가 되고 아래에서 출력됨
console.log(radius); // 15

```


### [ this ]

- **객체 자신**의 프로퍼티나 메서드를 참조하기 위한 자기 참조 변수 self-referencing variable
- **this가 가리키는 값 == this 바인딩**은 <u>함수 호출 방식에 따라</u> 동적으로 결정됨


|함수 호출 방식|this가 가리키는 값(this 바인딩)|
|:---|:---|
|일반 함수로서 호출|전역 객체| 
|메서드로서 호출|메서드를 호출한 객체 (마침표 앞의 객체)| 
|생성자 함수로서 호출|생성자 함수가 (미래에) 생성할 인스턴스| 


<span style='color:red; font-weight:bold;'>* 바인딩 name binding : 식별자와 값을 연결하는 과정</span>
- 변수 선언 : 변수 이름(식별자)과 확보된 메모리 공간의 주소를 바인딩하는 것
- this 바인딩 : this(키워드로 분류되나 식별자 역할을 함)와 this가 가리킬 객체를 바인딩하는 것


```js

function foo() {
    console.log(this);
}; 

// 1) 일반 함수로서 호출
// 전역 개체는 브라우저 환경에서는 window, Node.js 환경에서는 global을 가리킴
foo(); // window


const obj = { foo }; // ES6 프로퍼티 축약 표현

// 2) 메서드로서 호출
obj.foo(); // obj


// 3) 생성자 함수로서 호출
const inst = new foo(); // inst

```


### [ 생성자 함수의 인스턴스 생성 과정 ]

- 생성자 함수의 역할 : 
  **(필수) 인스턴스의 생성**
  **(옵션) 생성된 인스턴스의 초기화 (인스턴스 프로퍼티 추가 & 초기값 할당)**


```js

function Circle(radius) {
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

const circle1 = new Circle(5);

```

- 위 예제에서 실제로 **인스턴스를 생성하고 반환**하는 코드는 보이지 않음
- 이 과정은 js 엔진이 다음과 같은 과정을 거쳐 암묵적으로 처리함


```js

// 1. 인스턴스 생성과 this 바인딩

// - (함수 몸체 코드가 실행되는) 런타임 이전에 암묵적으로 빈 객체 == 인스턴스가 생성됨
// - 생성된 인스턴스가 this에 바인딩됨 (생성자 함수 내부의 this == 생성자 함수가 생성할 인스턴스)

function Circle(radius) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩됨
    console.log(this); // Circle {}

    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}


// 2. 인스턴스 초기화

// - (런타임) 생성자 함수의 코드가 한 줄씩 실행되어 this에 바인딩되어 있는 인스턴스를 초기화함 
// - 즉, 인스턴스에 프로퍼티/메서드를 추가하고
// - 생성자 함수가 인수로 전달받은 초기값을 인스턴스 프로퍼티에 할당하여 초기화하거나 고정값을 할당함

function Circle(radius) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩됨
    console.log(this); // Circle {}

    // 2. this에 바인딩되어 있는 인스턴스를 초기화함
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}


// 3. 인스턴스 반환

// - 생성자 함수 내부의 모든 처리가 끝나면
// - 완성된 인스턴스가 바인딩된 "this가 암묵적으로 반환"됨

function Circle(radius) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩됨
    console.log(this); // Circle {}

    // 2. this에 바인딩되어 있는 인스턴스를 초기화함
    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };

    // 3. 완성된 인스턴스가 바인딩된 "this가 암묵적으로 반환"됨

    // return {} ; // 만약 이처럼 명시적으로 객체 반환 시 암묵적인 this 반환이 무시되고 [ return 문에 명시한 객체가 반환됨 ]
    // return 100 ; // 만약 이처럼 명시적으로 원시값 반환 시 원시값 반환은 무시되고 [ 암묵적으로 this가 반환됨 ]
    // 위와 같은 문제가 있으므로 생성자 함수 내부에서는 [ return 문을 반드시 생략 ]
}


// 인스턴스 생성 
const circle = new Circle(1); // Circle 함수는 암묵적으로 this를 반환함 -> 반환된 this가 circle 변수에 저장됨

console.log(circle); // Circle {radius: 1, getDiameter: f}


```


### [ 내부 메서드 [[Call]] & [[Construct]] ]

- 함수 선언문 / 함수 표현식으로 정의한 함수도 [ 생성자 함수로서 호출 ]할 수 있음
- [ 생성자 함수로서 호출 ]한다는 것은 **new 연산자와 함께 호출**하여 객체를 생성하는 것을 의미
- 함수는 객체이므로 일반 객체와 동일하게 동작 가능 
  (함수 객체도 일반 객체처럼 내부 슬롯 & 내부 메서드를 모두 갖고 있음)


```js

function foo() {} // 함수는 객체

foo.prop = 10; // 함수도 객체이므로 프로퍼티 소유 가능

foo.method = function () {
    console.log(this.prop);
};

foo.method(); // 10

```

- 일반 객체는 호출할 수 없으나, 함수는 호출할 수 있음
- 함수 객체는 일반 객체가 갖고 있는 내부 슬롯 & 내부 메서드는 물론,
- 함수 객체만을 위한 
  **내부 슬롯 - [[Environment]], [[FormalParameters]]**
  **내부 메서드 - [[Call]], [[Construct]]** 
  를 추가로 갖고 있음

```js

function foo() {}

// 일반 함수로 호출 시 : 내부 메서드 [[ Call ]] 이 호출됨
// (모든 함수 객체에 구현되어 있음)
foo();

// 생성자 함수로 호출 시 : 내부 메서드 [[ Construct ]] 가 호출됨 
// (모든 함수 객체가 갖고 있는 것은 아님)
new foo();

```

- 내부 메서드 [[Call]]을 갖는 함수 객체 == **callable**
  -> 호출할 수 있는 객체, 즉 함수

- 내부 메서드 [[Construct]]를 갖는 함수 객체 == **constructor**
  -> 생성자로서 호출할 수 있는 함수

- 내부 메서드 [[Construct]]를 갖지 않는 함수 객체 == **non-constructor**
  -> 생성자 함수로서 호출할 수 없는 함수

- 이 때, 모든 함수 객체가 [[Construct]]를 갖는 것은 아님
  -> 모든 함수 객체가 constructor인 것은 아님


### [ constructor & non-constructor 의 구분 ]

- js 엔진은 함수 정의를 평가해 함수 객체 생성 시,
- **함수 정의 방식**에 따라 함수를 constructor vs non-constructor로 구분함

* constructor : <span style='background-color:yellow; font-weight:bold;'>함수 선언문 / 함수 표현식 / 클래스</span>
* non-constructor : <span style='background-color:black; color:white; font-weight:bold;'>메서드(ES6 메서드 축약 표현) / 화살표 함수</span>


```js

// 일반 함수 정의 : 함수 선언문 & 함수 표현식
function foo() {}
const bar = function () {};

// 프로퍼티 x의 값으로 할당된 것은 일반 함수로 정의된 함수이나,
// ECMAScript 사양에서는 [ 메서드로 인정하지 않는다. ]
const baz = {
    x : function () {} // 메서드 아님
};

// 일반 함수로 정의될 시 [ constructor ]
new foo(); // foo {}
new bar(); // bar {}
new baz.x(); // x {}


// 화살표 함수 정의
const arrow = () => {};

// 메서드 정의: ES6의 메서드 축약 표현만 메서드로 인정함
const obj = {
    x() {}
};

// [ non-constructor ]
new arrow(); // TypeError: arrow is not a constructor
new obj.x(); // TypeError: obj.x is not a constructor

```

- 함수를 프로퍼티 값으로 사용 시 일반적으로 메서드로 통칭하나,
- [ ECMAScript 사양에서 메서드란 ES6의 메서드 축약 표현 ] 만을 의미함 (10.9.1 참고)
- 즉 함수가 할당된 위치에 따라 메서드(non-constructor)인지 판단하는 것이 아니라 함수 정의 방식에 따라 구분함


### [ new 연산자 ]

- new 연산자와 함께 호출하는 함수는 constructor 이어야 함

```js

// 1) 생성자 함수 O
// 일반적으로 생성자 함수는 첫 문자를 대문자로(파스칼 케이스) 명명해 일반 함수와 구별
function Add(x, y){
    this.x = x
    this.y = y
}

let inst1 = new Add(3, 5);

console.log(inst1.x); // 3


// 2) 생성자 함수 X, 객체 반환 X
function add(x, y){
    return x + y;
}

let inst2 = new add(3, 5);

// 위 라인에서 함수가 객체를 반환하지 않았으므로 반환문이 무시됨
// 따라서 빈 객체가 생성되어 반환됨
console.log(inst2); // {}


// 3) 생성자 함수 X, 객체 반환 O
function createUser(name, role){
    return {name , role};
}

let inst3 = new createUser('Lee', 'admin');

// 함수가 생성한 객체를 반환함
console.log(inst3); // {name: "Lee", role: "admin"}

```


### [ new.target ]

- 생성자 함수가 new 연산자 없이 호출되는 것을 방지하기 위해 ES6 에서는 new.target을 지원함 (IE는 지원 X)
- new.target은 this와 유사하게 constructor 내부에서 **암묵적인 지역 변수**와 같이 사용되며 **메타 프로퍼티**라고 부름 
- 함수 내부에서 new.target 사용 시 new 연산자와 함께 생성자 함수로서 호출되었는지 확인 가능


\* new 연산자와 함께 생성자 함수로서 호출 시 : 함수 내부의 new.target == **함수 자신**
\* new 연산자 없이 일반 함수로서 호출 시 : 함수 내부의 new.target == **undefined**


```js

function Circle(radius){

    // 본 함수가 new 연산자 없이 호출되었다면 new.target == undefined 
    if (!new.target) {
        // new 연산자 없이 일반 함수로서 호출 되었을 시,
        // new 연산자와 함께 재귀 호출을 통해 생성자 함수로서 호출 & 생성된 인스턴스를 반환
        return new Circle(radius);
    }

    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

const circle = Circle(5); // new 연산자가 없더라도 생성자 함수로서 내부적으로 호출됨

console.log(circle.getDiameter()); // 10

```


### [ 스코프 세이프 생성자 패턴 scope-safe constructor ]

- IE에서는 new.target 사용이 불가하므로 스코프 세이프 생성자 패턴을 사용

```js

function Circle(radius){

    // 생성자 함수가 new 연산자와 함께 호출될 시,
    // 함수의 선두에서 빈 객체(인스턴스) 생성 후 this에 바인딩 
    // 이 때, this와 Circle은 프로토타입에 의해 연결됨 (Chapter 19)

    // 생성자 함수가 new 연산자와 함께 호출되지 않았을 시,
    // 현재 시점의 this는 전역 객체 window를 가리키게 됨
    // 이 때, this와 Circle은 프로토타입에 의해 연결되지 않은 상태임

    if ( !(this instanceof Circle) ) {

        return new Circle(radius);
    }

    this.radius = radius;
    this.getDiameter = function() {
        return 2 * this.radius;
    };
}

const circle = Circle(5); // new 연산자가 없더라도 생성자 함수로서 내부적으로 호출됨

console.log(circle.getDiameter()); // 10

```

- 대부분의 빌트인 생성자 함수는 new 연산자 함께 호출 여부를 확인 후 적절한 값을 반환함 
  (Object / String / Number / Boolean / Function / Array / Date / RegExp / Promise 등)
- 따라서 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 동일하게 작동함

```js

let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}


let f = new Function('x', 'return x ** x');
console.log(f); // f anonymous(x) {return x ** x}

f = Function('x', 'return x ** x');
console.log(f); // f anonymous(x) {return x ** x}


// String / Number / Boolean : 
// with "new" -> String / Number / Boolean "객체" 생성 & 반환
// without "new" -> 문자열, 숫자, 불리언 "값"을 반환 -> 이를 통해 타입 변환을 하기도 함

const str = String(123);
console.log(str, typeof str); // 123 string


const num = Number('123');
console.log(num, typeof num); // 123 number


const bool = Boolean('true');
console.log(bool, typeof bool); // true boolean

```


