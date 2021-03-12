# 19. 프로토타입


- js는 멀티 패러다임 프로그래밍 언어
  + 명령형
  + 함수형
  + 프로토타입 기반
  + 객체지향 프로그래밍


- ES6의 클래스 @ Chapter 25
  + 사실 클래스도 함수
  + 클래스 & 생성자 함수는 모두 프로토타입 기반의 인스턴스를 생성
  + 그러나 정확히 동일하게 작동하지는 않음
  + **클래스는 생성자 함수보다 엄격 & 추가 기능도 제공**
  + 클래스를 **새로운 객체 생성 메커니즘**으로 보는 것이 합당함


- **원시 타입의 값**을 제외한 나머지 값들(함수, 배열, 정규표현식 등)은 모두 **객체** 



## 19.1 객체 지향 프로그래밍

- 전통적인 명령형 프로그래밍 : 절차지향적, 프로그램을 명령어 or 함수의 목록으로 이해함
- 객체지향 프로그래밍 : 프로그램을 **여러 개의 독립적 단위, 즉 객체의 집합**으로 표현함



### [ 추상화 abstraction ]

- 실체의 다양한 속성 중 **프로그램에 필요한 속성만 간추려 내어 표현**하는 것
- ex) 사람에게는 다양한 속성이 있으나, [ 이름, 주소 ] 라는 속성만 추려내어 프로그램에 구현할 수 있음

```js

const person = {
    name: 'Lee',
    address: 'Seoul
};

console.log(person); // {name: 'Lee', address: 'Seoul'}

```

- 이름과 주소 **속성**으로 표현된 **객체object**인 **person**을 다른 객체와 구별하여 인식할 수 있음
- 이처럼 속성을 통해 **여러 개의 값을 하나의 단위로 구성**한 복합적인 자료구조를 **객체**라고 함
- 객체지향 프로그래밍은 **독립적인 객체의 집합**으로 프로그램을 표현하려는 프로그래밍 패러다임


```js

const circle = {
    
    // 반지름 : 원의 상태를 나타내는 [ 데이터 ]
    radius: 5, 

    // 원의 지름/둘레/넓이를 구하는 것 : [ 동작 ]
    getDiameter() {
        return 2 * this.radius;
    },
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    },
    getArea() {
        return Math.PI * this.radius ** 2;
    }
};

console.log(circle);

```

- 객체지향 프로그래밍은 객체의 [ **상태 state**를 나타내는 데이터 ] & 
  [ 상태 데이터를 조작할 수 있는 **동작 behavior** ]을 하나의 논리적인 단위로 묶어서 생각함

- 객체 : **상태 데이터와 동작**을 하나의 논리적인 단위로 묶은 복합적인 자료구조

- 객체의 상태 데이터 == **프로퍼티 property**
- 동작 == **메서드 method**


* 각 객체는 고유의 기능을 갖는 독립적인 부품으로 볼 수 있으나,
* 자신의 고유한 기능을 수행하면서 **다른 객체와 관계성을 가질 수 있음**
* 다른 객체와 메시지를 주고받거나 데이터를 처리할 수도 있음
* 다른 객체의 상태 데이터 & 동작을 상속받아 사용하기도 함



## 19.2 상속 & 프로토타입

- 상속 : 어떤 객체의 프로퍼티 or 메서드를 **다른 객체가 상속받아 그대로 사용할 수 있는 것**
- js는 [ 프로토타입을 기반으로 상속을 구현 ]함


```js

function Circle(radius) {
    this.radius = radius;
    this.getArea = function () {
        return Math.PI * this.radius ** 2;
    }
}

const circle1 = new Circle(1);
const circle1 = new Circle(2);


console.log(circle1.getArea()); // 3.14~~~
console.log(circle2.getArea()); // 12.56~~~


console.log(circle1.getArea === circle2.getArea); // false

// 위와 같이 생성자 함수는 인스턴스를 생성할 때마다 
// getArea 메서드를 중복 생성하고, (내용이 동일한 메서드가 중복으로 생성됨) 
// 중복 생성된 메서드들을 모든 인스턴스들이 중복 소유함 (메모리 낭비)
// 10개의 인스턴스를 생성하면 내용이 동일한 메서드도 10개 생성됨
 
// getArea 메서드는 모든 인스턴스가 동일한 내용의 메서드를 사용하므로,
// 단 하나만 생성해 모든 인스턴스가 공유해 사용하는 것이 바람직함

```


```js
// 프로토타입을 기반으로 상속을 구현해 불필요한 중복을 제거


// 생성자 함수
function Circle(radius) {
    this.radius = radius;
}


// 모든 인스턴스가 공통적으로 사용할 프로퍼티 & 메서드를 프로토타입에 미리 구현
// 모든 인스턴스가 getArea 메서드를 공유해 사용할 수 있도록 [ 프로토타입에 추가 ]
// 프로토타입은 [ Circle 생성자 함수의 prototype 프로퍼티 ]에 바인딩되어 있음

// Circle 생성자 함수의 prototype 프로퍼티.getArea = ~~~    <-    getArea 메서드를 "프로토타입에 추가"
Circle.prototype.getArea = function () {
    return Math.PI * this.radius ** 2;
}


const circle1 = new Circle(1);
const circle1 = new Circle(2);


console.log(circle1.getArea()); // 3.14~~~
console.log(circle2.getArea()); // 12.56~~~


console.log(circle1.getArea === circle2.getArea); // true

// Circle 생성자 함수가 생성한 모든 인스턴스는
// [ 부모 객체 ]의 역할을 하는 프로토타입 [ Circle.prototype ]으로부터 
// getArea 메서드를 상속받음

// 즉, 모든 인스턴스가 하나의 getArea 메서드를 공유하게 됨
// + 책 263page 구조도 참고

```



## 19.3 프로토타입 객체 


- **프로토타입 객체**(이하 프로토타입)
  + 객체 간 상속을 구현하기 위해 사용됨
  + 어떤 객체의 상위(부모) 객체 역할을 하는 객체
  + 다른 객체에 **공유 프로퍼티(<u>메서드 포함</u>)**를 제공
  + 프로토타입을 상속받은 하위 객체는 상위 객체(프로토타입)의 프로퍼티를 자신의 프로퍼티처럼 자유로이 사용

<hr>

- 모든 객체는 [[Prototype]]이라는 내부 슬롯을 갖고 있음
- 해당 내부 슬롯의 값 == **프로토타입의 참조(null인 경우도 있음)**
- [[Prototype]]에 저장되는 프로토타입은 **객체 생성 방식**에 의해 결정됨
- -> 객체가 생성될 때, 객체 생성 방식에 따라, 프로토타입이 결정되고, [[Prototype]]에 저장됨

<br>

- ex) **객체 리터럴**에 의해 생성된 객체의 프로토타입 : **Object.prototype**
- ex) **생성자 함수**에 의해 생성된 객체의 프로토타입 : **생성자함수.prototype**
  (생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체)

<hr>

* **모든 객체는 하나의 프로토타입을 가짐**
* **모든 프로토타입은 생성자 함수와 연결되어 있음**

  + **생성자함수.prototype**   ->    객체의 프로토타입
  + **생성자함수.prototype.constructor**   ->   생성자 함수
  + **객체.\_\_proto\_\_**   ->   객체의 프로토타입

<hr>



### [ 1) \_\_proto\_\_ 접근자 프로퍼티 ]

* 모든 객체("직접 상속" 제외)는 \_\_proto\_\_ 접근자 프로퍼티를 통해 자신의 **프로토타입([[Prototype]] 내부 슬롯)**에 간접적으로 접근 가능

* \_\_proto\_\_ 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아님
  (Object.prototype의 프로퍼티를 상속받은 것)

* 코드 내에서 \_\_proto\_\_ 프로퍼티를 직접 사용하는 것은 권장 X
  모든 객체가 \_\_proto\_\_ 프로퍼티를 사용할 수 있는 것은 아니기 때문.
  **[직접 상속]**을 통해 Object.prototype을 상속받지 않는 객체를 생성할 수도 있음 (__proto__ 프로퍼티 사용불가)


```js

// 브라우저 콘솔에서 실행
// 교재 265page 이미지 참고

const person = { name: 'Lee' };
person

// person 객체의 프로퍼티 & 프로토타입(Object.prototype)을 확인 가능

// __proto__ 접근자 프로퍼티를 통해 
// person 객체의 [[Prototype]] 내부 슬롯이 가리키는 객체인 Object.prototype에 접근한 결과


Object.getOwnPropertyDescriptor(Object.prototype, '__proto__')
// [ Object.prototype.__proto__ ]는 접근자 프로퍼티임
// 자체적으로 값을 갖지 않음
// 접근자 함수인 [[Get]] & [[Set]] 프로퍼티 어트리뷰트로 구성되어 있음

```


```js
// __proto__ 접근자 프로퍼티를 통해 접근 시,
// __proto__ 접근자 프로퍼티의 getter 함수인 [[Get]]이 호출됨

// __proto__ 접근자 프로퍼티를 통해 새로운 프로토타입을 할당 시,
// __proto__ 접근자 프로퍼티의 setter 함수인 [[Set]]이 호출됨

const obj = {};
const parent = { x: 1};

obj.__proto__; // obj 객체의 프로토타입을 취득

obj.__proto__ = parent; // obj 객체의 프로토타입을 교체

console.log(obj.x); // 1


// 실제 코드에서는 __proto__ 프로퍼티 대신, 
// Object.getPrototypeOf (ES5+) & Object.setPrototypeOf (ES6+) 사용을 권장함

const obj2 = {};
const parent2 = { x: 1};

Object.getPrototypeOf(obj); // obj 객체의 프로토타입을 취득

Object.setPrototypeOf(obj, parent); // obj 객체의 프로토타입을 교체

console.log(obj.x); // 1

```


```js

const person = { name: 'Lee' };


console.log(person.hasOwnProperty('__proto__')); // false
// (person) 객체는 __proto__ 프로퍼티를 소유하지 않음

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// __proto__ 프로퍼티는 Object.prototype의 접근자 프로퍼티임


console.log({}.__proto__ === Object.prototype) // true
// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속(받아 사용할 수 있음)

```


### [ 2) Object.prototype ]

- 모든 객체는 프로토타입의 계층 구조인 프로토타입 체인에 묶여 있음

<br>

- js 엔진은 **객체의 프로퍼티**에 접근하려고 할 때,
  접근하려는 프로퍼티가 해당 객체에 없다면,
  __proto__ 접근자 프로퍼티가 가리키는 참조를 따라,
  자신의 **부모 역할을 하는 프로토타입의 프로퍼티**를 순차적으로 검색함

<br>

- 프로토타입 체인의 종점 == 프로토타입 체인의 최상위 객체 == **Object.prototype**
- **Object.prototype**의 프로퍼티 & 메서드는 **모든 객체에 상속**됨

<br>

- 프로토타입 체인은 단방향 링크드 리스트로 구현되어야 함
- 즉, 검색 방향이 한쪽 방향으로만 흘러가야 함
- 순환 참조하는 프로토타입 체인이 만들어지면 프로퍼티 검색에서 무한 루프가 발생 가능 (책 268p)
- 무조건적 프로토타입 교체를 방지하고자 __proto__ 접근자 프로퍼티를 통해 프로토타입 접근 & 교체가 가능하도록 구현됨



### [ 3) 함수 객체의 prototype 프로퍼티 ]

- 함수 객체만이 소유하는 [ prototype 프로퍼티 ] 
  == 생성자 함수가 **생성할 객체(인스턴스)의 프로토타입**


```js

// 함수 객체는 prototype 프로퍼티를 소유함
(function () {}).hasOwnProperty('prototype'); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않음
{}.hasOwnProperty('prototype'); // false

```


- 생성자 함수로서 호출할 수 없는 함수 (non-constructor)인 
  **화살표 함수** & **ES6 메서드 축약 표현으로 정의한 메서드**는
  prototype 프로퍼티를 소유하지 않으며 
  프로토타입 객체도 생성하지 않음


```js

// non-constructor
const Person = name => {
    this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않음
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입 객체를 생성하지도 않음
console.log(Person.prototype); // undefined


// non-constructor
const obj = {
    foo () {}
};

// non-constructor는 prototype 프로퍼티를 소유하지 않음
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입 객체를 생성하지도 않음
console.log(obj.foo.prototype); // undefined

```

<hr>


- **모든 객체**가 가지고 있는(Object.prototype으로부터 상속받은) **\_\_proto\_\_ 접근자 프로퍼티**와 
  **함수 객체**만이 가지고 있는 **prototype 프로퍼티**는 
  결국 동일한 프로토타입을 가리키나,
  각각을 사용하는 주체가 다름


#### [ \_\_proto\_\_ 접근자 프로퍼티 ]

- 모든 객체가 (상속받아) 소유
- 객체가 **자신의 프로토타입에 접근/교체**하기 위해 사용

#### [ prototype 프로퍼티 ]

- constructor(생성자 함수)가 소유
- 생성자 함수가 **자신이 생성할 객체(인스턴스)의 프로토타입을 할당**하기 위해 사용


```js

// 생성자 함수
function Person(name) {
    this.name = name;
}

// 객체
const me = new Person('Lee');


console.log(Person.prototype === me.__proto__); // true
// 함수 객체가 가지고 있는 prototype 프로퍼티 === 인스턴스 객체가 갖고 있는 __proto__ 접근자 프로퍼티 
// 책 271 page 이미지 참고

```



### [ 4) 프로토타입의 constructor 프로퍼티 & 생성자 함수 ]


```js

function Person(name) {
    this.name = name;
}

const me = new Person('Lee');


// 모든 프로토타입은 constructor 프로퍼티를 갖고 있음
// constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 생성자 함수를 가리킴
// 이 연결은 함수 객체(생성자 함수)가 생성될 때 이뤄짐

console.log(me.__proto__.constructor === Person); // true
// me 객체는 프로토타입의 constructor 프로퍼티를 통해 생성자 함수와 연결됨

console.log(Person.prototype.constructor === Person); // true
// me 객체의 프로토타입인 Person.prototype에는 constructor 프로퍼티가 있음

console.log(me.constructor === Person); // true
// 따라서 me 객체는 프로토타입인 Person.prototype의 constructor 프로퍼티를 상속받아 사용할 수 있음

```



## 19.4 [리터럴 표기법에 의해 생성된 객체]의 생성자 함수 & 프로토타입


- 생성자 함수에 의해 생성된 인스턴스 -> 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결됨
- constructor 프로퍼티가 가리키는 생성자 함수 == 인스턴스를 생성한 생성자 함수


```js

function Person(name) {
    this.name = name;
}

// me 객체를 생성한 생성자 함수 : Person
const me = new Person('Lee');
console.log(me.constructor === Person); // true


// obj 객체를 생성한 생성자 함수 : Object 
const obj = new Object();
console.log(obj.constructor === Object); // true


// add 함수 객체를 생성한 생성자 함수 : Function
const add = new Function('a', 'b', 'return a + b');
console.log(add.constructor === Function); // true

```


```js

// 명시적으로 new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하지 않는,
// [ 리터럴 표기법에 의한 객체 생성 방식 ]과 같은 객체 생성 방식도 있음


// 객체 리터럴
const obj = {}; 

// 함수 리터럴
const add = function (a, b) { return a + b; };

// 배열 리터럴
const arr = [ 1, 2, 3 ];

// 정규표현식 리터럴
const regexp = /is/ig;


// [리터럴 표기법에 의해 생성된 객체]도 프로토타입이 존재

// 그러나 [리터럴 표기법에 의해 생성된 객체]의 경우,
// 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 
// 반드시 해당 객체를 생성한 생성자 함수라고 단정할 수 없음


// obj2 객체는 Object 생성자 함수가 아닌 객체 리터럴로 생성함
const obj2 = {}; 

// 그러나 obj 객체의 생성자 함수는 Object 생성자 함수임
console.log(obj.constructor === Object); // true

```


- [객체 리터럴에 의해 생성된 객체]는 사실 Object 생성자 함수로 생성되는 것은 아닐까?
  -> Object 생성자 함수에 **[인수를 전달하지 않거나], [undefined or null을 인수로 전달하면서] 호출**하면,
  -> (내부적으로 추상 연산 OrdinaryObjectCreate를 호출하여)
  -> **Object.prototype을 프로토타입으로 갖는 빈 객체**를 생성함
  -> 사실 세부 내용(new.target의 확인, 프로퍼티 추가 처리 등)이 다르므로 **[객체 리터럴에 의해 생성된 객체]는 Object 생성자 함수로 생성된 객체가 아님**
  -> 그러나 리터럴 표기법으로 생성한 객체도 큰 틀에서는 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이가 없음


```js

let obj = new Object(); // <- 인수를 전달하지 않으면서 Object 생성자 함수 호출
console.log(obj); // {} <- Object.prototype을 프로토타입으로 갖는 빈 객체


obj = new Object(123); // <- undefined/null 이 아닌 인수를 전달하면서 호출
console.log(obj); // Number {123} <- 전달된 인수를 객체로 변환


obj = new Object('123'); // <- undefined/null 이 아닌 인수를 전달하면서 호출
console.log(obj); // String {'123'} <- 전달된 인수를 객체로 변환

```


- 함수 선언문 or 함수 표현식을 평가해 함수 객체를 생성한 것은,
  Function 생성자 함수로 함수 객체를 생성한 것이 아님

- Function 생성자 함수를 호출해 생성한 함수는,
  렉시컬 스코프를 만들지 않고,
  전역 함수인 것처럼 스코프를 생성하며,
  클로저도 만들지 않음 (@ 12.4.4)

- 그러나 constructor 프로퍼티를 통해 확인해보면 아래와 같이 결과가 출력됨

```js

// 함수 선언문, not Function()
function foo() {} 

console.log(foo.constructor === Function); // true

```

- [리터럴 표기법에 의해 생성된 객체]도 상속을 위해 프로토타입이 필요함
- 프로토타입은 생성자 함수와 더불어 생성되며 prototype & constructor 프로퍼티에 의해 연결되어 있음
- 즉, **프로토타입 & 생성자 함수**는 단독으로 존재할 수 없고 언제나 쌍으로 존재함
- 따라서 <u>[리터럴 표기법에 의해 생성된 객체]도 **가상적인 생성자 함수**를 갖게 됨</u>
- 따라서 [ 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자 함수 ] == [ 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수 ]로 생각해도 큰 무리는 없음


|리터럴 표기법|생성자 함수|프로토타입|
|:---|:---|:---|
|객체 리터럴|Object|Object.prototype|
|함수 리터럴|Function|Function.prototype|
|배열 리터럴|Array|Array.prototype|
|정규표현식 리터럴|RegExp|RegExp.prototype|



## 19.5 프로토타입의 생성 시점

- 객체를 생성하는 방법
  + 리터럴 표기법
  + 생성자 함수
  + Object.create 메서드 (@ 19.11.1 직접 상속)
  + 클래스 (@ 25 클래스)

- 위 방법으로 생성한 객체 모두 생성자 함수와 연결되어 있음

<hr>

- 프로토타입은 생성자 함수가 생성되는 시점에 더불어 생성됨
- 생성자 함수 <- 사용자 정의 생성자 함수 & 빌트인 생성자 함수



### [ 1) 사용자 정의 생성자 함수 & 프로토타입 생성 시점 ]


- [화살표 함수 & ES6 메서드 축약 표현] 이 아닌,
- 함수 선언문 / 함수 표현식으로 정의한 함수 객체 == constructor (사용자 정의 생성자 함수)
- -> **함수 정의가 평가되어 함수 객체를 생성하는 시점**에 프로토타입 객체도 생성됨
- -> 이 때, 생성된 프로토타입 객체의 프로토타입은 언제나 **Object.prototype**


```js

// 함수 선언문(constructor)은 런타임 이전에 js 엔진에 의해 먼저 실행됨 (호이스팅)
// 함수 선언문으로 정의된 Person [ 생성자 함수 ]는 가장 먼저 평가되어 [ 함수 객체 ]가 됨
// 이 때 프로토타입도 더불어 생성됨
// == 함수 정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성됨

console.log(Person.prototype); // {constructor: f}
// 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩됨
// 프로토타입도 객체이고 모든 객체는 프로토타입을 가지므로 생성된 프로토타입도 자신의 프로토타입을 가짐
// 생성된 프로토타입의 프로토타입은 Object.prototype
// -> Person.prototype.__proto__ == Object.prototype

function Person(name){
    this.name = name;
}

```



### [ 2) 빌트인 생성자 함수 & 프로토타입 생성 시점 ]


- 빌트인 생성자 함수(Object/String/Number/Function/Array/RegExp/Date/Promise)도 
  빌트인 생성자 함수가 생성되는 시점에 프로토타입이 생성됨
  모든 빌트인 생성자 함수는 **전역 객체가 생성되는 시점**에 생성됨

- 전역 객체 global object(window or global 객체)는 
  [ **표준 빌트인 객체들 / 환경에 따른 호스트 객체 / var 키워드로 선언한 전역 변수 & 전역 함수** ] 를 프로퍼티로 갖고 있음 (@ 21 빌트인 객체)
  [ **Math / Reflect / JSON** ]을 제외한 **표준 빌트인 객체**는 모두 생성자 함수 

  ```js
  
  // @ 브라우저 콘솔
  // 빌트인 객체인 Object는 전역 객체 window의 프로퍼티

  window.Object === Object // true;

  ```

- 객체가 생성되기 이전에 생성자 함수 & 프로토타입은 이미 객체화되어 존재함
- 생성자 함수 or 리터럴 표기법으로 객체 생성 시, 
- 프로토타입은 생성된 객체의 [[Prototype]] 내부 슬롯에 할당됨
- -> 이를 통해 생성된 객체는 프로토타입을 상속받게 됨



## 19.6 객체 생성 방식 & 프로토타입의 결정


```js

// 1) 객체 리터럴에 의해 생성된 객체 : Object.prototype 을 상속받음
const obj = { x: 1};

console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x')); // true


// 2) Object 생성자 함수에 의해 생성된 객체 : Object.prototype 을 상속받음
const obj2 = new Object();
obj2.x = 1;

console.log(obj2.constructor === Object); // true
console.log(obj2.hasOwnProperty('x')); // true

// 객체 리터럴과 Object 생성자 함수에 의한 객체 생성방식의 차이 : 프로퍼티를 추가하는 방식
// - 객체 리터럴 : 객체 리터럴 내부에 프로퍼티를 추가
// - Object 생성자 함수 : 빈 객체 생성 후 프로퍼티를 추가


// 3) (사용자 정의) 생성자 함수에 의해 생성된 객체 : 생성자 함수의 prototype 프로퍼티에 바인딩되어 있는 객체를 상속받음
function Person(name) {
    this.name = name;
}

// + 사용자 정의 생성자 함수에 의해 생성된 프로토타입(Person.prototype)의 프로퍼티는 constructor 뿐
//    vs Object.prototype은 hasOwnProperty 등의 다양한 빌트인 메서드를 갖고 있음
// + 프로토타입은 객체이므로, 일반 객체처럼 프로퍼티 추가/삭제가 가능 (프로토타입 체인에 즉각 반영됨)
//    -> 비교 : 284page Person.prototype vs 282page Object.prototype

Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);  
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello(); // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim

```



## 19.7 프로토타입 체인

- 프로토타입 체인 : js가 객체지향 프로그래밍의 **상속**과 **프로퍼티 검색**을 구현하는 메커니즘


```js

function Person(name) {
    this.name = name;
}

Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);  
};

const me = new Person('Lee');


console.log(me.hasOwnProperty('name')); // true
// hasOwnProperty는 Object.prototype의 메서드
// 위에서 hasOwnProperty 메서드 호출 시 프로토타입 체인을 따라 메서드 검색 (프로퍼티 참조도 마찬가지)

// 이것은 me 객체가 Person.prototype 뿐만 아니라, Object.prototype도 상속받았다는 것을 의미 
// (284p 그림에서 Person.prototype은 hasOwnProperty 메서드를 갖고 있지 않음)

// 실제로는 Object.prototype.hasOwnProperty 메서드가 호출되며, 
// 이 때 [ Object.prototype.hasOwnProperty 메서드의 this ]에는 [ me 객체 ]가 바인딩됨
// 실제 실행되는 방식 : Object.prototype.hasOwnProperty.call(me, 'name') // this 바인딩 객체(this로 사용할 객체), 인수 



// (286p 프로토타입 체인 그림과 함께 아래 코드 이해)

// me 객체의 프로토타입 : Person.prototype
Object.getPrototypeOf(me) === Person.prototype; // true

// Person.prototype의 프로토타입 : Object.prototype (프로토타입의 프로토타입은 언제나 Object.prototype)
Object.getPrototypeOf(Person.prototype) === Object.prototype; // true

// Person 생성자 "함수"의 프로토타입 : Function.prototype
Object.getPrototypeOf(Person) === Function.prototype; // true
Object.getPrototypeOf(me.constructor) === Function.prototype; // true

// Function.prototype의 프로토타입 : Object.prototype (프로토타입의 프로토타입은 언제나 Object.prototype)
Object.getPrototypeOf(Function.prototype) === Object.prototype; // true
Object.getPrototypeOf(me.constructor.prototype) === Object.prototype; // true

```


- 프로토타입 체인의 최상위 객체는 언제나 [ Object.prototype ]
- 모든 객체는 Object.prototype을 상속받음
- -> **Object.prototype** == **프로토타입 체인의 종점**
- ->> Object.prototype.__proto__ == Object.prototype의 프로토타입([[Prototype]] 내부 슬롯의 값) == **null**

```js

// Object.prototype에서도 프로퍼티 검색 실패 시, undefined가 반환됨 (에러 발생 X)

console.log(me.foo); // undefined

```


- **프로퍼티가 아닌 식별자**는 **스코프 체인**에서 검색함
- 스코프 체인은 **식별자 검색**을 위한 메커니즘 

```js

me.hasOwnProperty('name');

// 1) 'me' 식별자를 [ 스코프 체인 ]에서 검색함 (전역 스코프에서 검색됨)
// 2) 'me' 식별자 검색을 마친 뒤, 찾아진 me 객체의 [ 프로토타입 체인 ]에서 'hasOwnProperty' 메서드를 검색함
// -> 즉, [ 스코프 체인 ] & [ 프로토타입 체인 ] 은 서로 협력하여 [ 식별자 & 프로퍼티 ] 를 검색하는 데 사용됨

```



## 19.8 오버라이딩 & 프로퍼티 섀도잉


```js

const Person = (function () {
    
    // 생성자 함수
    function Person(name) {
        this.name = name;
    }

    // 프로토타입 메서드 (프로토타입이 소유한 프로퍼티 == 프로토타입 프로퍼티)
    Person.prototype.sayHello = function () {
        console.log(`Hi! My name is ${this.name}`);  
    };

    // 생성자 함수를 반환
    return Person;

}());


const me = new Person('Lee');

// 인스턴스 메서드 (인스턴스가 소유한 프로퍼티 == 인스턴스 프로퍼티)
me.sayHello = function () {
    console.log(`Hey! My name is ${this.name}`);  // Hi -> Hey
};

me.sayHello(); // Hey! ~~~

// 인스턴스 메서드가 호출됨         <- 메서드 오버라이딩
// 프로토타입 메서드는 가려짐      <- 프로퍼티 섀도잉 shadowing

// 289page 그림처럼,
// 기존의 프로토타입 메서드는 "덮어쓰여지는" 것이 아니라 
// 인스턴스 자체에 "새로이 추가된" 인스턴스 메서드에 의해 "가려짐"



// 인스턴스 메서드의 삭제
delete me.sayHello; 

// 프로토타입 메서드를 가리고 있던 인스턴스 메서드가 삭제되어,
// 가려져 있던 프로토타입 메서드가 호출됨
me.sayHello(); // Hi ~~~ 


// (인스턴스를 통한) 프로토타입 메서드의 삭제 시도
delete me.sayHello; 

// 프로토타입 메서드 삭제는 불가
// 하위 객체를 통해 프로토타입의 프로퍼티를 변경/삭제하는 것은 불가능 (get 만 가능)
me.sayHello(); // Hi ~~~ 



// 프로토타입 프로퍼티 변경/삭제는 [ 프로토타입에 직접 접근 ]해야 함
Person.prototype.sayHello = function () {
    console.log(`Whooa! My name is ${this.name}`);  
};

me.sayHello(); // Whooa! ~~~


// (직접) 프로토타입 메서드의 삭제 시도
delete Person.prototype.sayHello;

me.sayHello(); // TypeError: me.sayHello is not a function


```

- 오버로딩 : 함수의 이름은 동일하나, 매개변수의 타입 or 개수가 다른 메서드를 구현 -> 매개변수에 의해 메서드를 구별하여 호출하는 것
- js는 오버로딩을 지원하지 않으나, arguments 객체를 사용해 구현할 수 있음



## 19.9 프로토타입의 교체

- 부모 객체인 프로토타입을 동적으로 변경 가능
- 객체 간의 상속 관계를 동적으로 변경 가능
- 프로토타입은 **생성자 함수** or **인스턴스**에 의해 교체 가능

* 그러나 프로토타입 교체로 상속 관계를 변경하는 것은 많이 번거로움
  따라서 **프로토타입은 직접 교체하지 않는 것이 좋음**
  아래 내용 대신, [ 19.11 **직접 상속** ]의 방법이 더 편리 & 안전함
  
  -> [ ES6 클래스 ] 사용 시 더 간편하고 직관적으로 상속 관계 구현 가능



### [ 1) 생성자 함수에 의한 프로토타입 교체 ]


```js

const Person = (function () {

    function Person(name) {
        this.name = name;
    }

    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입 교체
    Person.prototype = {
        // Person 생성자 함수가 생성할 객체의 프로토타입을 [객체 리터럴]로 교체
        sayHello() {
            console.log(`Hi! My name is ${this.name}`);  
        }
    };

    return Person;

}());


const me = new Person('Lee');


// 프로토타입을 객체 리터럴로 교체 시,
// 객체 리터럴에는 constructor 프로퍼티가 없으므로 (원래 js엔진이 프로토타입 생성 시 암묵적으로 추가)
// me 객체의 생성자 함수를 검색하면 Person이 아닌 Object가 나오게 됨

// constructor 프로퍼티와 생성자 함수 간 연결 파괴됨
console.log(me.constructor === Person); // false

// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색됨
console.log(me.constructor === Object); // true



// 아래와 같이 교체될 객체 리터럴에 constructor 프로퍼티를 추가하여 프로토타입의 constructor 프로퍼티를 되살릴 수 있음
const Person = (function () {
    function Person(name) {
        this.name = name;
    }

    Person.prototype = {
        
        constructor: Person, // 추가된 라인, 교체될 프로토타입의 constructor 프로퍼티와 생성자 함수 간 연결을 설정
        
        sayHello() {
            console.log(`Hi! My name is ${this.name}`);  
        }
    };
    return Person;
}());


const me = new Person('Lee');

console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false


```



### [ 2) 인스턴스에 의한 프로토타입 교체 ]


- 프로토타입은 [ 생성자 함수의 prototype 프로퍼티 ] 뿐만 아니라,
- [ **인스턴스의 __proto__ 접근자 프로퍼티 (Object.getPrototypeOf 메서드)** ] 로 접근할 수도 있음


* [ 생성자 함수의 prototype 프로퍼티 ] 에 다른 객체를 바인딩 
  : **미래에 생성할 인스턴스**의 프로토타입을 교체하는 것 

* [ 인스턴스의 __proto__ 접근자 프로퍼티 (Object.getPrototypeOf 메서드) ] 
  : **이미 생성된 객체**의 프로토타입을 교체하는 것 



```js

function Person(name) {
    this.name = name;
}

const me = new Person('Lee');


// 프로토타입으로 교체될 객체
const parent = {

    // (유의) constructor 프로퍼티와 생성자 함수 간의 연결을 설정 
    constructor: Person,

    sayHello() {
        console.log(`Hi! My name is ${this.name}`);  
    }
};


// (유의) 생성자 함수의 prototype 프로퍼티와 프로토타입 간 연결을 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체
Object.setPrototypeOf(me, parent); // me.__proto__ = parent;  와 동일


me.sayHello(); // Hi ~~~


console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false


// (유의 2건 덕분에) 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리키게 됨
console.log(Person.prototype === Object.getPrototypeOf(me)); // true

```


