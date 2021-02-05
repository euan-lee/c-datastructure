# Chapter 10. 객체 리터럴



## 10.1 객체란? 

- 원시 값을 제외한 나머지 값(**함수, 배열, 정규 표현식 등**)은 모두 객체
- 객체 타입(Object/Reference type)은 다양한 타입의 값(원시 or 객체)으로 구성됨
- 원시 값은 immutable & 객체는 mutable


```js
var person = {
    name: 'Lee',
    age: 20
}
```

- 객체는 0개 이상의 **Property**로 구성된 집합
- Property <- **Key & Value**


```js
// 객체(Object/Reference type)
var counter = {
    
    // Property <- Key: Value
    num: 0,
    
    // method (메서드) <- Property value가 function일 경우
    increase: function(){
        this.num++; // this == counter (객체 자기 자신)
    }

}
```

- Property value (프로퍼티 값) : JS에서 사용할 수 있는 모든 값이 적용 가능
- JS의 함수 역시도 일급 객체이므로 값으로 취급 가능 & 프로퍼티 값으로 사용 가능
- **Property value가 function일 경우 해당 property를 method(메서드)**라고 부름

<hr>

- **Property**의 역할 : 객체의 상태를 나타내는 값 == **data**
- **method**의 역할 : property(상태 데이터)를 참조하고 조직할 수 있는 동작 == **behavior**

<hr>



## 10.2 객체 리터럴에 의한 객체 생성


**instance (인스턴스)**

- instance == 클래스에 의해 생성되어 **메모리에 저장된 실체**
- 클래스는 instance를 생성하기 위한 템플릿
- instance는 객체가 **메모리에 저장되어 실제로 존재**하는 것에 초점을 맞춘 용어

> 이와 달리 js의 객체 리터럴은 **클래스 및 new 연산자 없이 리터럴로 바로 객체 생성**이 가능함 & 객체 생성 이후 **프로퍼티를 동적으로 추가**할 수도 있음


---

- JS는 **프로토타입 기반 객체지향 언어**
- 클래스 기반 객체지향 언어와 달리 **다양한 객체 생성 방법**을 지원함

* 객체 리터럴
* Object 생성자 함수
* 생성자 함수
* Object.create 메서드
* 클래스 (ES6)

-> 가장 일반적이고 간단한 방법은 **객체 리터럴**을 사용하는 방법

---


- literal (리터럴) : 사람이 이해할 수 있는 문자 or 약속된 기호를 사용해 값을 생성하는 표기법 
- 객체 리터럴 : 객체를 생성하기 위한 표기법 

```js
var person = {  
    name: 'Lee',
    sayHello: function() {
        console.log(`Hello! My name is ${this.name}.`); // this == person
    }
}; // 객체 리터럴의 닫는 중괄호 뒤에는 세미콜론 필수

console.log(typeof person); // object
console.log(person); // {name: "Lee", sayHello: f}
```


- 객체 리터럴의 **중괄호는 코드 블록을 의미하지 않음**
- 객체 리터럴은 **값으로 평가되는 표현식**이므로 코드 블록의 닫는 중괄호와 달리 끝에 세미콜론이 필수



## 10.3 프로퍼티 (property)

```js

var person = {
    firstName: 'Kevin', // 식별자 네이밍 규칙을 준수한 경우 key의 따옴표 생략 가능
    'last-name': 'Lee' // 그렇지 않을 경우에는 생략 불가 (- 를 연산자로 해석)
};


var obj = {}; // 객체 리터럴

var key = 'hello';
obj[key] = 'world'; // property의 key를 동적으로 생성 가능 

console.log(obj); // {hello: "world"}


// ES6에서는 아래와 같이 생성도 가능
// var obj = { [key]: 'world' }; // [key] -> 'hello'로 계산되어 들어감


var foo = {
    0: 1,
    1: 2,
    2: 3
}

console.log(foo); // {0: 1, 1: 2, 2: 3} 으로 표현되나 내부적으로 각 key는 문자열로 변환됨 

foo.1; // SyntaxError: Unexpected number
foo.'1'; // SyntaxError: Unexpected string
foo[1]; // 2  : foo[1]; -> foo['1'];
foo['1']; // 2


var foo2 = {
    name: 'Lee',
    name: 'Kim'  // property key를 중복 선언하면 덮어쓰기가 됨
}

console.log(foo2); // {name: "Kim"}

```



## 10.4 메서드 (method)

- 메서드 == **객체에 묶여 있는 함수**
- this == **객체 자신**을 가리키는 참조 변수 


```js

var circle = {
    radius: 5, // property

    getDiameter: function() {
        return 2 * this.radius; // this == circle
    }
};

console.log(circle.getDiameter()); // 10

```



## 10.5 프로퍼티 접근

- 1) 마침표 표기법 (dot notation) : 마침표 프로퍼티 접근 연산자 활용
- 2) 대괄호 표기법 (bracket notation) : 대괄호 프로퍼티 접근 연산자 활용


```js

var person = {
    name: 'Lee'
};

console.log(person.name); // 마침표 표기법
console.log(person['name']); // 대괄호 표기법


// 대괄호 프로퍼티 접근 연산자 내부에 지정하는 프로퍼티 키
// : 반드시 따옴표로 감싼 문자열

```



## 10.6 프로퍼티 값 갱신

```js
var person = {
    name: 'Lee'
};

person.name = 'Kim';

console.log(person); // {name: 'Kim'}
```



## 10.7 프로퍼티 동적 생성

```js
var person = {
    name: 'Lee'
};

person.age = 20;

console.log(person); // {name: 'Kim', age: 20}
```



## 10.8 프로퍼티 삭제

```js
var person = {
    name: 'Lee'
};

person.age = 20;

delete person.age; // age 프로퍼티의 삭제 <- delete가 함수 형태가 아님에 유의(like return & typeof)

delete person.address; // 에러가 발생하지 않고 그냥 무시됨

console.log(person); // {name: 'Kim'}
```



## 10.9 객체 리터럴의 확장 기능 @ ES6


**[ 10.7.1 프로퍼티 축약 표현 ]**

```js

// ES5
var x = 1, y = 2;

var obj = {
    x: x,
    y: y
};

console.log(obj); // {x: 1, y: 2}


// ES6
var x = 1, y = 2;

// 프로퍼티 value로 변수를 사용할 경우,
// ES6에서는 변수 이름과 프로퍼티 key가 동일할 때,
// 프로퍼티 key를 생략할 수 있다. (변수 이름으로 key가 자동 생성됨)
const obj = { x, y };

console.log(obj); // {x: 1, y: 2}
```


**[ 10.7.2 계산된 프로퍼티 이름 (computed property name) ]**

```js
// ES5
var prefix = 'prop';
var i = 0;

var obj = {};

// 문자열 or 문자열로 타입 변환 가능한 값으로 평가되는 표현식을 사용하여
// 동적으로 프로퍼티 key를 생성해낼 수 있음
// 단, 프로퍼티 key로 사용할 표현식을 대괄호로 묶어야 함 
obj[prefix + '-' + ++i] = i; // prop-1: 1
obj[prefix + '-' + ++i] = i; // prop-2: 2
obj[prefix + '-' + ++i] = i; // prop-3: 3

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}


// ES6
var prefix = 'prop';
var i = 0;

// 객체 리터럴 내부에서 계산된 프로퍼티 이름으로 key 동적 생성
const obj = {
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i,
    [`${prefix}-${++i}`]: i
};

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}
```


**[ 10.7.3 메서드 축약 표현 ]**

```js

// ES5
var obj = {
    name: 'Lee',
    sayHi: function() {
        console.log('Hi! ' + this.name); // this == obj 객체 자기자신
    }
};

obj.sayHi(); // Hi! Lee


// ES6 (메서드 정의 시 function 키워드 생략 가능)
const obj = {
    name: 'Lee',

    // 메서드 축약 표현 (이렇게 정의한 메서드는 프로퍼티에 할당한 함수와 다르게 동작하게 됨 @ 26.2절)
    sayHi() {
        console.log('Hi! ' + this.name);
    }
};

obj.sayHi(); // Hi! Lee
```


# 왜 갑자기 const?
# const를 쓰면 객체 프로퍼티 값을 바꿀 수 없게 되는 것은 아닌지?
# 스코프라면 그냥 console에 썼을 때에는 전역 스코프?