
 // 16-1
 const o = {};

 // 내부 슬롯은 자바스크립트 엔진의 내부 로직이므로 직접 접근할 수 없다.
 o.[[Prototype]] // -> Uncaught SyntaxError: Unexpected token '['
 // 단, 일부 내부 슬롯과 내부 메서드에 한하여 간접적으로 접근할 수 있는 수단을 제공하기는 한다.
 o.__proto__ // -> Object.prototype


 // 16-2
 const person = {
     name: 'Lee'
 };

 // 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
 console.log(Object.getOwnPropertyDescriptor(person, 'name'));
 // {value: "Lee", writable: true, enumerable: true, configurable: true}


 // 16-3
 const person = {
     name: 'Lee'
 };

 // 프로퍼티 동적 생성
 person.age = 20;

 // 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
 console.log(Object.getOwnPropertyDescriptors(person));
 /*
 {
    name: {value: "Lee", writable: true, enumerable: true, configurable: ture},
    age: {value: 20, writable: true, enumerable: true, configurable: true}
 }
 */


 // 16-4
 const person = {
     name: 'Lee'
 };

 // 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 취득한다.
 console.log(Object.getOwnPropertyDescriptor(person, 'name'));
 // {value: "Lee", writable: true, enumerable: true, configurable: true}


 // 16-5
 const person = {
     name: 'Lee'
 };

 // 프로퍼티 동적 생성
 person.age = 20;

 console.log(Object.getOwnPropertyDescriptors(person));
 /*
 {
    name: {value: "Lee", writable: true, enumerable: true, configurable: true},
    age: {value: "age", writable: true, enumerable: true, configurable: true}
 }
 */


 // 16-6
 const person = {
     // 데이터 프로퍼티
     firstName: 'Ungmo',
     lastName: 'Lee',

     // fullName은 접근자 함수로 구성된 접근자 프로퍼티다.
     // getter 함수
     get fullName() {
         return `${this.firstName} ${this.lastName}`;
     },
     // setter 함수
     set fullName(name) {
         // 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
         [this.firstName, this.lastName] = name.split(' ');
     }
 };

 // 데이터 프로퍼티를 통한 프로퍼티 값의 참조
 console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee

 // 접근자 프로퍼티를 통한 프로퍼티 값의 저장
 // 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
 person.fullName = 'Heegun Lee';
 console.log(person); // {firstName: "Heegun", lastName: "Lee"}

 // 접근자 프로퍼티를 통한 프로퍼티 값의 참조
 // 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
 console.log(person.fullName); // Heegun Lee

 // firstName은 데이터 프로퍼티다.
 // 데이터 프로퍼티는 [[Value]], [[Writable]], [[Enumerable]], [[Configurable]]
 // 프로퍼티 어트리뷰트를 갖는다.
 let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
 console.log(descriptor);
 // {value: "Heegun", writable: true, enumerable: true, configurable: true}

 // fullName은 접근자 프로퍼티다
 // 접근자 프로퍼티는 [[Get]], [[Set]], [[Enumerable]], [[Configurable]]
 // 프로퍼티 어트리뷰트를 갖는다.
 descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
 console.log(descriptor);
 // {get: f, set: f, enumerable: true, configurable: true}


 // 16-7
 // 일반 객체의 __proto__는 접근자 프로퍼티다.
 Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
 // {get: f, set: f, enumerable: false, configurable: true}

 // 함수 객체의 prototype은 데이터 프로퍼티다.
 Object.getOwnPropertyDescriptor(function() {}, 'prototype');
 // {value: {...}, writable: true, enumerable: false, configurable: false}





















