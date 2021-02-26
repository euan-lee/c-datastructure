# 16. 프로퍼티 어트리뷰트 (<- Object type)



## 16.1 내부 슬롯 internal slot 과 내부 메서드 internal method 


- js 엔진의 구현 알고리즘을 설명하기 위해 ECMA Script 사양에서 사용하는 의사 프로퍼티/메소드
- js 엔진의 내부 로직이므로 원칙적으로 직접 접근하거나 호출할 수 있는 방법을 제공하지 X
- 간접적으로 접근할 수 있는 수단은 제공


```js

const o = {};

// 내부 슬롯은 직접 접근 불가
o.[[Prototype]] // Uncaught SyntaxError: Unexpected token '['

// 간접적인 접근 수단은 제공
o.__proto__ // Object.prototype

```



## 16.2 프로퍼티 어트리뷰트 PropertAttribute & 프로퍼티 디스크립터 PropertyDescriptor 

- js 엔진은 프로퍼티를 생성 시, 
- 프로퍼티의 상태(프로퍼티의 값, 값의 갱신 가능 여부, 열거 가능여부, 재정의 가능 여부)를 나타내는 **프로퍼티 어트리뷰트**를 기본값으로 자동 정의
- 프로퍼티 어트리뷰트 : js 엔진이 관리하는 내부 상태 값(meta-property)인 **[[Value]], [[Writable]], [[Enumerable]], [[Configurable]]** 
                               -> **Object.getOwnPropertyDescriptor** 메서드로 간접적인 확인 가능


```js

const person ={ 
    name: 'Lee'
};


// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 리턴

console.log(Object.getOwnPropertyDescriptor(person, 'name')) // 객체의 참조, property key를 문자열로 
// {value: "Lee", writable: true, enumerable: true, configurable: true}


// 프로퍼티 동적 생성
person.age = 20;


// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 리턴

console.log(Object.getOwnPropertyDescriptors(person)) // 

// age: {value: 20, writable: true, enumerable: true, configurable: true}
// name: {value: "Lee", writable: true, enumerable: true, configurable: true}


```



## 16.3 데이터 프로퍼티 & 접근자 프로퍼티 accessor property


### [ 1) 데이터 프로퍼티 ]

- 키 & 값으로 구성된 일반적인 프로퍼티
- 지금까지 살펴본 모든 프로퍼티


**[[Value]] -> value**

- 프로퍼티 키를 통해 **프로퍼티 값에 접근하면 반환되는 값**
- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당함  
  이 때 프로퍼티가 없으면, 프로퍼티를 동적 생성하고 생성된 프로퍼티의 [[Value]]에 값을 저장함


**[[Writable]] -> writable**

- **프로퍼티 값의 변경 가능 여부**, boolean
- false인 경우, 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 **읽기 전용 프로퍼티**가 됨


**[[Enumerable]] -> enumerable**

- **프로퍼티의 열거 가능 여부**, boolean
- false인 경우, 해당 프로퍼티는 **for...in 문이나 Object.keys 메서드 등으로 열거할 수 없음**


**[[Configurable]] -> configurable** 

- **프로퍼티의 재정의 가능 여부**, boolean   
- false인 경우, **해당 프로퍼티의 삭제 & 프로퍼티 어트리뷰트 값의 변경이 금지**됨 
  단 [[Writable]]이 true인 경우, **[[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용**됨


```js

const person ={ 
    name: 'Lee'
};

console.log(Object.getOwnPropertyDescriptor(person, 'name')) 
// {value: "Lee", writable: true, enumerable: true, configurable: true}

// 프로퍼티 생성 시, 
// [[Value]]의 값은 프로퍼티 값으로 초기화됨
// [[Writable]], [[Enumerable]], [[Configurable]]의 값은 true로 초기화됨
// -> 프로퍼티를 동적으로 추가해도 마찬가지로 작동함

```


<hr>


### [ 2) 접근자 프로퍼티 accessor property ]

- 자체적으로 값을 갖지 않고, 
- 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 **접근자 함수 accessor function**로 구성된 프로퍼티
- 접근자 프로퍼티는 getter & setter 함수를 모두 정의할 수 있고 하나만 정의할 수도 있음


**[[Get]] -> get -> getter 함수**

- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 읽을 때 호출되는 **접근자 함수** 
- 접근자 프로퍼티 키로 프로퍼티 값에 접근하면, 
  프로퍼티 어트리뷰트 [[Get]]의 값 == **getter 함수**가 호출되고, 
  그 결과가 프로퍼티 값으로 반환됨


**[[Set]] -> set -> setter 함수**

- 접근자 프로퍼티를 통해 데이터 프로퍼티의 값을 저장할 때 호출되는 **접근자 함수** 
- 접근자 프로퍼티 키로 프로퍼티 값을 저장하면, 
  프로퍼티 어트리뷰트 [[Set]]의 값 == **setter 함수**가 호출되고 
  그 결과가 프로퍼티 값으로 저장됨


**[[Enumerable]] -> enumerable**
- 데이터 프로퍼티와 같음


**[[Configurable]] -> configurable**
- 데이터 프로퍼티와 같음


```js

const person = {
    
    firstName: 'Dave', // 데이터 프로퍼티
    lastName: 'Jo', // 데이터 프로퍼티


    // 접근자 함수로 구성된 접근자 프로퍼티
    // 접근자 프로퍼티는 자체적으로 값을 가지지 않으며, 데이터 프로퍼티의 값을 읽거나 저장할 때에만 관여함
    
    get fullName() { // getter 함수 (fullName == 접근자 프로퍼티)
        return `${this.firstName} ${this.lastName}`;
    },

    set fullName(name) { // getter 함수 (fullName == 접근자 프로퍼티)
        [this.firstName, this.lastName] = name.split(' '); // 31.1 배열 리스트럭처링 할당
    }

};


// 데이터 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.firstName + ' ' + person.lastName); // Dave Jo


// 1) 접근자 프로퍼티를 통한 프로퍼티 값의 저장
person.fullName = 'Dave Kim'; // <- fullName == 접근자 프로퍼티에 값 저장 시, setter 함수가 자동 호출됨

console.log(person); // {firstName: "Dave", lastName: "Kim"}


// 2) 접근자 프로퍼티를 통한 프로퍼티 값의 참조
console.log(person.fullName); // Dave Kim // <- fullName == 접근자 프로퍼티에 값 접근 시, getter 함수가 자동 호출됨


// firstName & lastName == (일반적인) 데이터 프로퍼티 
// -> [[Value]], [[Writable]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖고 있음

let descriptor = Object.getOwnPeopertyDescriptor(person, 'firstName');
console.log(descriptor); // {value: "Dave", writable: true, enumerable: true, configurable: true}


// fullName == 접근자 프로퍼티
// -> [[Get]], [[Set]], [[Enumerable]], [[Configurable]] 프로퍼티 어트리뷰트를 갖고 있음

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor); // {enumerable: true, configurable: true, get: ƒ, set: ƒ}


// 접근자 프로퍼티 fullName으로 프로퍼티 값에 접근하면,
// 내부적으로 [[Get]] 내부 메서드가 호출되어 다음과 같이 동작함

// 1. 프로퍼티 키가 유효한지 확인함 (문자열 or 심벌)
// 2. 프로퍼티 키로 프로토타입 체인에서 프로퍼티를 검색 (person 객체의 fullName 프로퍼티가 존재)
// 3. 검색된 fullName 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인 (fullName 프로퍼티는 접근자 프로퍼티)
// 4. 접근자 프로퍼티 fullName의 프로퍼티 어트리뷰트 [[Get]]의 값 == getter 함수를 호출하여 그 결과를 반환

```


<hr>


### 프로토타입

- **어떤 객체의 상위(부모) 객체의 역할**을 하는 **객체**
- 프로토타입은 하위(자식) 객체에게 **자신의 프로퍼티와 메서드**를 상속함  
- 상속받은 하위 객체는 **자신의 프로퍼티 또는 메서드인 것처럼 자유롭게 사용**할수 있음


### 프로토타입 체인 

- 프로토타입이 단방향 링크드 리스트 형태로 연결되어 있는 **상속 구조**  
- 객체의 프로퍼티나 메서드에 접근하려고 할 때, 
  해당 객체에 접근하려는 프로퍼티 또는 메서드가 없다면, 
  **프로토타입 체인을 따라 프로토타입의 프로퍼티나 메서드를 차례대로 검색**함


<hr>


### 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법


```js

// 일반 객체의 __proto__는 접근자 프로퍼티 (get, set, enumerable, configurable)
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {enumerable: false, configurable: true, get: ƒ, set: ƒ}


// 함수 객체의 prototype는 데이터 프로퍼티 (value, writable, enumerable, configurable)
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}


```



## 16.4. 프로퍼티 정의 & 재정의


- 새로운 프로퍼티를 추가하면서 **프로퍼티 어트리뷰트를 명시적으로 정의**하거나,
- 기존의 프로퍼티의 **프로퍼티 어트리뷰트를 재정의**하는 것

ex) 프로퍼티 값의 [ 갱신 가능 여부, 열거 가능 여부, 재정의 가능 여부 ] 등을 정의해줄 수 있음 -> **객체의 프로퍼티가 어떻게 동작해야하는지 명확히 정의 가능**


```js

const person = {};

// 인수 : 1) 객체의 참조, 2) 데이터 프로퍼티의 키 (문자열), 3) 프로퍼티 디스크립터 객체
Object.defineProperty(person, 'firstName', {
    value: 'Dave',
    writable: true,
    enumerable: true,
    configurable: true
});

Object.defineProperty(person, 'lastName', {
    value: 'Jo'
});


let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Dave", writable: true, enumerable: true, configurable: true}


descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// firstName {value: "Jo", writable: false, enumerable: false, configurable: false} <- 디스크립터 객체의 프로퍼티 누락 시, undefined & false가 기본값


// 열거
console.log(Object.keys(person)); // ['firstName'] <- lastName 프로퍼티는 [[Enumerable]]의 값이 false이므로 열거되지 않음


// 변경
person.lastName = 'Lee'; // 에러 발생 없이 무시됨 <- lastName 프로퍼티는 [[Writable]]의 값이 false이므로 변경 불가


// 삭제
delete person.lastName; // 에러 발생 없이 무시됨 <- lastName 프로퍼티는 [[Configurable]]의 값이 false이므로 삭제 불가


// 재정의
// Object.definedProperty(person, 'lastName', {enumerable: true}); // Uncaught TypeError: Cannot redefine property <- [[Configurable]]의 값이 false이므로 재정의 불가



// 접근자 프로퍼티 정의
Object.definedProperty(person, 'fullName' {
    
    // getter 함수 정의
    get() { 
        return `${this.firstName} ${this.lastName}`;
    },
    
    // setter 함수 정의
    set(name) {
        [this.firstName, this.lastName] = name.split(' ');
    },

    enumerable: true,
    configrable: true
});


descriptor = Object.getOwnPropertyDescript(person, 'fullName');
console.log('fullName', descriptor);
// fullName {enumerable: true, configurable: true, get: ƒ, set: ƒ}


person.fullName = 'Kevin Choi';
console.log(person); // {firstName: 'Kevin', lastName: 'Choi'}

```


### Object.definedProperty로 프로퍼티를 정의할 때, 프로퍼티 디스크립터 객체의 프로퍼티를 일부 생략할 수 있음


- **프로퍼티 디스크립터 객체의 프로퍼티 / 생략했을 때의 기본값**
- value             / undefined
- get               / undefined
- set               / undefined
- writable         / false
- enumerable    / false
- configurable   / false


<hr>


<span style='color:red; font-weight:bold;'>Object.definedPropert<u>y</u> 메서드는 <u>한번에 하나의 프로퍼티만 정의</u>할 수 있음</span>
<span style='color:red; font-weight:bold;'>Object.definedPropert<u>ies</u> 메서드를 사용하면 <u>여러 개의 프로퍼티를 한번에 정의</u> 가능</span>


```js

const person = {};

Object.definedProperties(person, {
    
    // 데이터 프로퍼티 정의
    firstName: {
        value: 'Kevin',
        writable: true,
        enumerable: true,
        configurable: true
    },

    // 데이터 프로퍼티 정의
    lastName: {
        value: 'Choi',
        writable: true,
        enumerable: true,
        configurable: true        
    },

    // 접근자 프로퍼티 정의
    fullName: {

        // getter 함수 정의
        get() {
            return `${this.firstName} ${this.lastName}`;
        },

        // setter 함수 정의
        set(name) {
            [this.firstName, this.lastName] = name.split(' ');
        },

        enumerable: true,
        configrable: true
    }
});

person.fullName = 'Dave Jo';
console.log(person); // {firstName: 'Dave', lastName: 'Jo'}

```



## 16.5 객체 변경 방지

- 객체는 변경 가능한 값이므로 재할당 없이 직접 변경 가능
- **프로퍼티 추가/삭제, 프로퍼티 값 갱신, 프로퍼티 어트리뷰트 재정의(Object.definedProperty(-ies))** 가능

- js는 **객체의 변경을 방지**하는 다양한 메서드를 제공함
- 각 **객체 변경 방지 메서드**들은 객체의 **변경을 금지하는 강도**가 다름


<hr>

1) 객체 **확장 금지** Object.**preventExtensions**

- **새로운 프로퍼티 추가만 금지**됨
- 가능 : 프로퍼티 삭제 / 프로퍼티 값 읽기 & 쓰기 / 프로퍼티 어트리뷰트 재정의


2) 객체 **밀봉** Object.**seal**

- **프로퍼티 값 읽기 & 쓰기**만 가능
- 불가능 : 프로퍼티 추가 / 프로퍼티 삭제 / 프로퍼티 어트리뷰트 재정의


3) 객체 **동결** Object.**freeze**

- **프로퍼티 값 읽기**만 가능
- 불가능 : 프로퍼티 추가 / 프로퍼티 삭제 / 프로퍼티 어트리뷰트 재정의 / 프로퍼티 값 쓰기



<hr>



### [ 1) 객체 확장 금지 Object.preventExtensions ] <- Object.isExtensible

- 객체의 확장을 금지 == **프로퍼티 추가 금지**
- [ 프로퍼티 동적 추가 ] & [ Object.defineProperty ] 모두 금지됨


```js

const person = { name: 'Lee' };


console.log(Object.isExtensible(person)); // true

Object.preventExtensions(person); // 객체 확장 금지 (프로퍼티 추가 금지)

console.log(Object.isExtensible(person)); // false


// 프로퍼티 추가 금지
person.age = 20; // 무시, strict mode에서는 에러 발생
console.log(person); // {name: "Lee"} 


// 프로퍼티 삭제는 가능
delete person.name;
console.log(person); // {}


// 프로퍼티 추가 금지 
Object.defineProperty(person, 'age', { value: 20 });
// TypeError: Cannot define property age, object is not extensible

```


### [ 2) 객체 밀봉 Object.seal ] <- Object.isSealed

- 객체를 밀봉 == **읽기와 쓰기만 가능**


```js

const person = { name: "Lee" };


console.log(Object.isSealed(person)); // false

Object.seal(person); // 객체 밀봉 (프로퍼티 추가/삭제/재정의 금지)

console.log(Object.isSealed(person)); // true


// 밀봉된 객체는 configurable == false
console.log(Object.getOwnPropertyDescriptors(person)); 
// name: {value: "Lee", writable: true, enumerable: true, configurable: false}


// 프로퍼티 추가 금지
person.age = 20; // 무시, strict mode에서는 에러 발생
console.log(person); //  {name: "Lee"}

// 프로퍼티 삭제 금지
delete person.name; // 무시, strict mode에서는 에러 발생
console.log(person); //  {name: "Lee"}


// 프로퍼티 값 갱신(변경)은 가능
person.name = "Kim";
console.log(person); //  {name: "Kim"}


// 프로퍼티 어트리뷰트 재정의 금지
Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name

```


### [ 3) 객체 동결 Object.freeze ] <- Object.isFrozen

- 객체를 동결 == **읽기만 가능**


```js

const person = { name: "Lee" };


console.log(Object.isFrozen(person)); // false

Object.freeze(person);  // 객체 동결 (프로퍼티 추가/삭제/재정의/쓰기 금지)

console.log(Object.isFrozen(person)); // true


// 밀봉된 객체는 configurable & writable == false
console.log(Object.getOwnPropertyDescriptors(person)); 
// name: {value: "Lee", writable: false, enumerable: true, configurable: false}


// 프로퍼티 추가 금지
person.age = 20; // 무시, strict mode에서는 에러 발생
console.log(person); //  {name: "Lee"}

// 프로퍼티 삭제 금지
delete person.name; // 무시, strict mode에서는 에러 발생
console.log(person); //  {name: "Lee"}

// 프로퍼티 값 갱신(변경) 금지
person.name = "Kim"; // 무시, strict mode에서는 에러 발생
console.log(person); //  {name: "Lee"}

// 프로퍼티 어트리뷰트 재정의 금지
Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name

```



### [ +) 불변 객체 ]

- 위까지의 변경 방지 메서드 == **얕은 변경 방지 shallow only**
- **직속** 프로퍼티만 변경이 방지됨 & **중첩 객체는 영향을 주지 못함**


```js

const person = {
    name: 'Lee',
    address: { city: 'Seoul' }
};


Object.freeze(person); // 객체 동결


// 직속 프로퍼티는 동결됨
console.log(Object.isFrozen(person)); // true

// 중첩 객체는 동결하지 못함
console.log(Object.isFrozen(person.address)); // false


person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Busan"}}


```

#### 중첩 객체까지 동결하여 [ 읽기 전용의 불변 객체 ]를 구현하려면
: <span style='color:red; font-weight:bold;'>객체를 값으로 갖는 모든 프로퍼티에 대해 <u>재귀적으로</u> Object.freeze 메서드를 호출</span>


```js

function deepFreeze(target) {
    
    // 객체가 아니거나 동결된 객체는 무시 -> 동결되지 않은 객체만 동결
    if (target && typeof target === 'object' && !Object.isFrozen(target)) {

        Object.freeze(target);
        
        Object.keys(target).forEach(key => deepFreeze(target[key]));
        // 모든 프로퍼티를 순회하며 재귀적으로 동결
        // Object.keys 메서드는 [ 객체 자신의 열거 가능한 프로퍼티 키 ]를 배열로 반환
        // forEach 메서드는 [ 배열을 순회하며 배열의 각 요소에 대하여 콜백 함수를 실행 ]

    }
    return target;
}


const person = {
    name: 'Lee',
    address: { city: 'Seoul' }
}

deepFreeze(person); // 깊은 객체 동결


console.log(Object.isFrozen(person)); // true

console.log(Object.isFrozen(person.address)); // true <- 중첩 객체까지 동결됨


person.address.city = "Busan"
console.log(person); // {name: "Lee", address: {city: "Seoul"}} <- city(address) 변경되지 않음

```
