## 19.10 instanceof 연산자 (296p)


- **객체 instanceof 생성자 함수**
- [ 오른쪽 생성자 함수의 prototype에 바인딩된 객체 ] 가 
  [ 왼쪽 객체의 프로토타입 체인 ] 상에 존재하면 true


```js

// 생성자 함수
function Person(name) {
    this.name = name;
}

// 객체
const me = new Person('Lee');


// Person.prototype이 me 객체의 프로토타입 체인 상에 존재 
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재 
console.log(me instanceof Object); // true

```


```js

// 생성자 함수
function Person(name) {
    this.name = name;
}

// 객체
const me = new Person('Lee');


// 프로토타입으로 교체할 객체
const parent = {};

// 1) 프로토타입의 교체
Object.setPrototypeOf(me, parent);

// Person 생성자 함수와 parent 객체 사이의 연결이 분리됨
console.log(Person.prototype === parent); // false
console.log(parent.constructor === Person); // false


// Person.prototype이 me 객체의 프로토타입 체인 상에 존재하지 않음
console.log(me instanceof Person); // false

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Object); // true


// 2) parent 객체를 Person 생성자 함수의 prototype 프로퍼티에 바인딩
Person.prototype = parent;


// Person.prototype이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Object); // true

```

- 위 예제에서와 같이 **instanceof** 연산자는 
  + 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수를 찾는 것이 아니라,
  + **생성자 함수의 prototype에 바인딩된 객체** 가 프로토타입 체인 상에 존재하는지 확인함


```js

// instanceof 연산자를 함수로 표현하면,

function isInstanceof(instance, constructor) {

    // 프로토타입 취득
    const prototype = Object.getPrototypeOf(instance);

    // 재귀 탈출 조건 (prototype이 null이면 프로토타입 체인의 종점에 다다른 것)
    if (prototype === null) return false;

    // 취득된 프로토타입이 생성자 함수의 prototype에 바인딩된 객체라면 true 반환
    // 그렇지 않다면 재귀 호출로 프로토타입 체인 상 사우이 프로토타입으로 이동
    return prototype === constructor.prototype || isInstanceof(prototype, constructor);

}

console.log(isInstanceof(me, Person)); // true
console.log(isInstanceof(me, Object)); // true
console.log(isInstanceof(me, Array)); // false

```


```js

// 생성자 함수에 의해 프로토타입이 교체되어 constructor 프로퍼티와 생성자 함수 간 연결이 파괴되어도,
// 생성자 함수의 prototype 프로퍼티와 프로토타입 간 연결은 파괴되지 않음
// -> instanceof는 아무런 영향을 받지 않음

const Person = (function () {
    function Person(name) {
        this.name = name;
    }

    // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입 교체
    Person.prototype = {
        sayHello() {
            console.log(`Hi! My name is ${this.name}`); 
        }
    };

    return Person;
}());


const me = new Person('Lee');


// constructor 프로퍼티와 생성자 함수 간 연결이 파괴되어도 instanceof는 아무런 영향을 받지 않음
console.log(me.constructor === Person); // false


// Person.prototype이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Person); // true

// Object.prototype이 me 객체의 프로토타입 체인 상에 존재함
console.log(me instanceof Object); // true

```



## 19.11 직접 상속



### [ 1) Object.create 기반 직접 상속 ]


- Object.create(~~~)의 params
  + 1\) **생성할 객체의 프로토타입으로 지정할 객체**
  + 2\) **(Optional) 생성할 객체의 [ 프로퍼티 키 : 프로퍼티 디스크립터 객체 ]로 이뤄진 객체 (아래 예제의 3번 예시 참고)**
     (Object.defineProperties 메서드의 두번째 인수와 동일함)


- Object.create(~~~) :
  + **명시적으로 프로토타입을 지정하여 새로운 객체 생성**
  + **첫번째 parameter에 전달된 객체의 프로토타입 체인**에 속하는 객체를 생성함
  + 즉, 객체를 생성하면서 **직접적으로 상속을 구현**하는 것
     + new 연산자 없이도 객체 생성 가능
     + 프로토타입을 지정하면서 객체 생성 가능
     + 객체 리터럴에 의해 생성된 객체도 상속받을 수 있음


```js

// 1) obj -> null : 프로토타입이 null인 객체 생성 (프로토타입 체인의 종점에 위치하게 됨)

let obj = Object.create(null);

console.log(Object.getPrototypeOf(obj) === null); // true

console.log(obj.toString()); // TypeError: obj.toString is not a function <- Object.prototype을 상속받지 못하였음 


// 2) obj -> Object.prototype -> null 
// [ obj = {}; ]와 동일함

obj = Object.create(Object.prototype);

console.log(Object.getPrototypeOf(obj) === Object.prototype); // true


// 3) obj -> Object.prototype -> null 
// [ obj = { x: 1 }; ]와 동일함

obj = Object.create(Object.prototype, {
    x : { value: 1, writable: true, enumerable: true, configurable: true } // 생성할 객체의 [ 프로퍼티 키 & 프로퍼티 디스크립터 객체 ]
});

// 위 코드는 아래와 동일함 
// obj = Object.create(Object.prototype);
// obj.x = 1; 

console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(obj.x); // 1


// 4) obj -> myProto -> Object.prototype -> null
// 임의의 객체를 직접 상속

const myProto = { x: 10 };

obj = Object.create(myProto);

console.log(Object.getPrototypeOf(obj) === myProto); // true
console.log(obj.x); // 10


// 5) obj -> Person.prototype -> Object.prototype -> null
// 생성자 함수의 프로토타입 객체를 상속

function Person(name) {
    this.name = name;
}

obj = Object.create(Person.prototype);
obj.name = 'Lee';

// 위 코드는 아래와 동일함 
// obj = new Person('Lee') 

console.log(Object.getPrototypeOf(obj) === Person.prototype); // true
console.log(obj.name); // 'Lee'

```


```js

// 아래와 같이 모든 객체의 프로토타입 체인의 종점인 Object.prototype의 메서드는 모든 객체가 상속받아 호출 가능
const obj = {a : 1};

obj.hasOwnProperty('a') // true
obj.propertyIsEnumerable('a') // true


// 그러나 ESLint에서는 위와 같이 Object.prototype의 빌트인 메서드를 객체가 직접 호출하는 것을 권장하지 않음
// 아래와 같이 Object.create 메서드로 프로토타입 체인의 종점에 위치한 객체를 생성할 수 있기 때문

const obj2 = Object.create(null);
obj2.a = 1;

console.log(Object.getPrototypeOf(obj2) === null); // true

// obj는 Object.prototype의 빌트인 메서드 사용이 불가능함
console.log(obj2.hasOwnProperty('a')); // TypeError
console.log(obj2.propertyIsEnumerable('a')); // TypeError


// 위와 같은 에러를 방지하기 위해 Object.prototype의 빌트인 메서드는 아래와 같이 간접적으로 호출 권장

const obj3 = Object.create(null);
obj3.a = 1;

console.log(Object.prototype.hasOwnProperty.call(obj, 'a')); // true
// @ 22.2.4 Function.prototype.apply/call/bind 메서드에 의한 간접 호출

```



### [ 2) 객체 리터럴 내부 __proto__ 기반 직접 상속 ]

- Object.create 메서드 사용 시, 
  + 두번째 인자로 프로퍼티를 정의하는 것은 번거로움
  + 객체 생성 후 프로퍼티를 추가하는 것도 깔끔하지 않음

- @ ES6, 
  객체 리터럴 내부에서 **__proto__ 접근자 프로퍼티**를 사용해 직접 상속 구현 가능


```js

const myProto = { x: 10 };


// 객체 리터럴에 의해 객체를 생성하면서 프로토타입을 지정해 직접 상속
const obj = { 
    y: 20,
    __proto__: myProto 
    // 객체를 직접 상속받음 
    // obj -> myProto -> Object.prototype -> null
};


/* 위 코드는 아래와 동일함
const obj = Object.create(myProto, {
    y : { value: 20, writable: true, enumerable: true, configurable: true } 
});
*/

console.log(obj.x, obj.y); //  10 20
console.log(Object.getPrototypeOf(obj) === myProto); // true

```



## 19.12 정적 프로퍼티 & 메서드


- **생성자 함수 객체**가 소유한 프로퍼티 & 메서드 (304page 이미지 참고)
- 생성자 함수로 인스턴스를 생성하지 않아도 참조/호출할 수 있는 프로퍼티 & 메서드 


```js

// 생성자 함수
function Person(name) {
    this.name = name;
}

// 프로토타입 메서드
Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`); 
};
// 위와 같은 [프로토타입 메서드]를 표기할 때, "prototype"을 "#"으로 표기하기도 함
// ex) Person.prototype.sayHello -> Person#sayHello
// ex) Object.prototype.isPrototypeOf -> Object#isPrototypeOf


// 정적 프로퍼티 <- 생성자 함수 객체가 소유한 프로퍼티 
Person.staticProp = 'static prop';

// 정적 메서드 <- 생성자 함수 객체가 소유한 메서드
Person.staticMethod = function () {
    console.log('staticMethod); 
};


const me = new Person('Lee');


// 생성자 함수에 추가한 정적 프로퍼티 & 메서드 : 생성자 함수로 참조/호출함
Person.staticMethod(); // staticMethod


// 정적 프로퍼티 & 메서드는 [ 생성자 함수가 생성한 인스턴스 ]로 참조/호출 불가능
// 인스턴스로 참조/호출할 수 있는 프로퍼티 & 메서드는 [ 프로토타입 체인 상에 존재 ]해야 함
me.staticMethod(); // TypeError

```


- **Object.create** 메서드 : **Object 생성자 함수**의 정적 메서드
  : 인스턴스(Object 생성자 함수가 생성한 객체)로 호출이 불가능

- **Object.prototype.hasOwnProperty** 메서드 : **Object.prototype**의 메서드
  : 모든 객체가 호출 가능 (모든 객체의 프로토타입 체인의 종점인 Object.prototype의 메서드이므로)


```js

const obj = Object.create( {name: 'Lee'} );

obj.hasOwnProperty('name');                 // false
obj.__proto__.hasOwnProperty('name');     // true

```


```js

function Foo() {}


// 1) 프로토타입 메서드 
Foo.prototype.x = function () {
    console.log('x'); 
}

// 프로토타입 메서드를 호출하려면 인스턴스를 생성해야만 함
const foo = new Foo();
foo.x(); // x


// 위 x 메서드와 같이 내부에서 this를 사용하지 않는 프로토타입 메서드(or 인스턴스)는 아래와 같이 정적 메서드로 변경이 가능함 
// 인스턴스가 호출한 프로토타입 메서드(or 인스턴스) 내부에서 this는 인스턴스를 가리킴
// (내부에서 this를 사용하지 않아서) 메서드 내에서 인스턴스를 참조할 필요가 없다면 정적 메서드로 변경하여도 동작함


// 2) 정적 메서드
Foo.x = function () {
    console.log('x'); 
}

// 정적 메서드는 인스턴스를 생성하지 않아도 호출이 가능
Foo.x(); // x

```



## 19.13 프로퍼티 존재 확인



### [ 1) in 연산자 ]

- 객체 내에 특정 프로퍼티가 존재하는지 여부를 확인
- `[프로퍼티 키(문자열)] in [객체(로 평가되는 표현식)]`


```js

const person = {
    name: 'Lee',
    address: 'Seoul'
};

console.log('name' in person); // true <- person 객체에 name 프로퍼티가 존재함

console.log('address' in person); // true <- person 객체에 address 프로퍼티가 존재함

console.log('age' in person); // false <- person 객체에 age 프로퍼티가 존재하지 않음

```

- in 연산자는 확인하려는 대상 객체의 프로퍼티 뿐만 아니라,
  대상 객체가 **상속받은 모든 프로토타입의 프로퍼티**까지 확인하므로 주의

```js

console.log('toString' in person); // true

// 위에서 toString 프로퍼티는 person 객체에 존재하지 않음
// toString은 Object.prototype의 메서드임 (-> person 객체가 속한 프로토타입 체인 상에 존재함)

```


```js

// @ ES6, 
// Reflect.has 메서드는 in 연산자와 동일하게 작동함
// 참고 1) https://www.zerocho.com/category/ECMAScript/post/57ce7fec2a00e600151f085c 
// 참고 2) https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Reflect

const person = { name : 'Lee' };

console.log(Reflect.has(person, 'name')); // true 
console.log(Reflect.has(person, 'toString')); // true 

```



### [ 2) Object.prototype.hasOwnProperty 메서드 ]

```js

console.log(person.hasOwnProperty('name')); // true
console.log(person.hasOwnProperty('age')); // false

// has "Own" Property 이므로,
// 프로퍼티 키가 [ 객체 고유의 프로퍼티 키 ]인 경우에만 true
// 프로퍼티 키가 [ 상속받은 프로토타입의 프로퍼티 키 ]인 경우에는 false

console.log(person.hasOwnProperty('toString')); // false

```



## 19.14 프로퍼티 열거



### [ 1) for ... in 문 ]


- 객체의 모든 프로퍼티를 순회하며 열거 enumeration
- `for (변수선언문 in 객체) { ... }`

- 순회의 대상이 되는 객체 고유의 프로퍼티 뿐만 아니라, **상속받은 프로토타입의 프로퍼티**까지 열거함 
- 다만 프로퍼티의 프로퍼티 어트리뷰트 [[Enumerable]] 값이 false일 경우 열거되지 않음

<span style='background-color:yellow; font-weight:bold;'>객체의 프로토타입 체인 상에 존재하는 모든 프로토타입의 프로퍼티 중에서,
<span style='color:red; font-weight:bold;'>프로퍼티 어트리뷰트 [[Enumerable]]의 값이 true</span>인 프로퍼티를 순회하며 열거함</span>


```js

const person = {
    name: 'Lee',
    address: 'Seoul',
    __proto__: { age: 20 }
};


for (const key in person) {
    console.log(key + ': ' + person[key] ); 
}
// name: Lee
// address: Seoul
// age: 20


console.log('toString' in person); // true 

// toString은 상속받은 프로토타입의 프로퍼티임
// 원래 for 문은 상속받은 프로토타입의 프로퍼티까지 열거하나,
// 위 for 문에서 toString은 열거되지 않았음

// 이것은 toString 메서드 자체가 열거할 수 없도록 정의된 프로퍼티이기 때문
// [ Object.prototype.string ] 프로퍼티의 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false로 되어있음
// -> 프로퍼티 어트리뷰트 [[Enumerable]]은 프로퍼티의 열거 가능 여부를 뜻하며 boolean 값임

console.log(Object.getOwnPropertyDescriptor(Object.prototype, 'toString')); // <- getOwnPropertyDescriptor() : 프로퍼티 디스크립터 객체 반환
// { value: f, writable: true, enumerable: false, configurable: true }

```


```js

// Addtional 1) 프로퍼티 키가 symbol인 프로퍼티는 열거 X

const sym = Symbol();

const obj = {
    a : 1,
    [sym]: 10
};

for (const key in obj) {
    console.log(key + ': ' + obj[key] ); 
}
// a: 1


// Addtional 2) 상속받은 프로퍼티는 제외하고 객체 자신의 프로퍼티만 열거하려면 
// Object.prototype.hasOwnProperty 메서드로 객체 자신의 프로퍼티인지 확인

const person = {
    name: 'Lee',
    address: 'Seoul',
    __proto__: { age: 20 }
};


for (const key in person) {

    if (!person.hasOwnProperty(key)) {
        continue;
    }
    console.log(key + ': ' + person[key] ); 
}
// name: Lee
// address: Seoul


// Addtional 3) 대부분의 모던브라우저는 프로퍼티 열거 시 정의된 순서를 보장하며,
// 숫자(사실은 문자열)인 프로퍼티 키에 대해서는 자동 정렬함 
// (원래 for 문은 프로퍼티 열거 시 순서를 보장하지 않으므로 유의)

const obj = {
    2: 2,
    3: 3,
    1: 1,
    b: 'b',
    a: 'a'
};

for (const key in obj) {
    if (!person.hasOwnProperty(key)) continue;
    console.log(key + ': ' + obj[key] ); 
}
// 1: 1
// 2: 2
// 3: 3
// b: b <- 프로퍼티 키가 숫자가 아닐 경우에는 정렬 X
// a: a

```


```js

// 배열은 for ... in 문 대신 아래 방법의 사용을 권장함

// - 일반적인 for 문
// - for ... of 문
// - Array.prototype.forEach 메서드 

// 배열도 객체이므로, 프로퍼티 및 상속받은 프로퍼티가 포함될 수 있음


const arr = [1, 2, 3]; // 1, 2, 3 : 배열의 "요소"

arr.x = 10; // 배열도 객체이므로, 프로퍼티를 가질 수 있음


// for ... in 문 (권장 X)
for (const i in arr) {  
    console.log(arr[i]); // 1 2 3 10 <- 프로퍼티인 x 도 출력됨 
}


// 1) 일반적인 for 문 (권장 O) 
for (let i = 0; i < arr.length; i++) { // arr.length === 3
    console.log(arr[i]); // 1 2 3 <- "요소"만 출력
}

// 2) for ... of 문 (권장 O) -> @ Chapter 34.3
// : 변수 선언문에서 선언한 변수에 "키가 아닌" 값을 할당함
for (const value of arr) {
    console.log(value); // 1 2 3 <- "요소"만 출력
}

// 3) Array.prototype.forEach 메서드 (권장 O) -> @ Chapter 27.9.2
// : forEach 메서드는 요소가 아닌 프로퍼티는 제외함
arr.forEach(v => console.log(v)); // 1 2 3 <- "요소"만 출력

```



### [ 2) Object.keys/values/entries 메서드 ]

- for ... in 문은 객체 고유의 프로퍼티 뿐만 아니라, **상속받은 프로토타입의 프로퍼티**까지 열거함 

- 객체 고유의 프로퍼티만 열거하려면 for ... in 문 대신,
  <span style='color:red; font-weight:bold;'>Object.keys/values/entries</span> 메서드 사용을 권장함


```js

const person = {
    name: 'Lee',
    address: 'Seoul',
    __proto__: { age: 20 }
};


// 1) Object.keys() : 객체 고유의 열거 가능한 [ 프로퍼티 키 ]를 배열로 반환

console.log(Object.keys(person)); // ["name", "address"]


// 2) Object.values() : 객체 고유의 열거 가능한 [ 프로퍼티 값 ]을 배열로 반환

console.log(Object.values(person)); // ["Lee", "Seoul"]


// 3) Object.entries() : 객체 고유의 열거 가능한 [ 프로퍼티 키 & 프로퍼티 값 쌍의 배열 ]을 배열에 담아 반환

console.log(Object.entries(person)); // [ ["name", "Lee"], ["address", "Seoul"] ]

Object.entries(person).forEach( ([key, value]) => console.log(key, value) );
// name Lee
// address Seoul

```