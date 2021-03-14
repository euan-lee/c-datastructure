
 // [예제 19-1]
 // 이름과 주소 속성을 갖는 객체
 const person = {
    name: 'Lee',
    address: 'Seoul'
 };

 console.log(person); // {name: "Lee", address: "Seoul"}


 // [예제 19-2]
 const circle = {
     radius: 5, // 반지름

     // 원의 지름: 2r
     getDiameter() {
         return 2 * this.radius;
     },

     // 원의 둘레: 2파이r
     getPerimeter() {
         return 2 * Math.PI * this.radius;
     },

     // 원의 넓이: 파이rr
     getArea() {
         return Math.PI * this.radius ** 2;
     }
 };

 console.log(circle);
 // {radius: 5, getDiameter: f, getPerimeter: f, getArea: f}

 console.log(circle.getDiameter()); // 10
 console.log(circle.getPerimeter()); // 31.41592653589793
 console.log(circle.getArea()); // 78.53981633974483


 // [예제 19-3]
 // 생성자 함수
 function Circle(radius) {
     this.radius = radius;
     this.getArea = function () {
         // Math.PI는 원주율을 나타내는 상수다.
         return Math.PI * this.radius ** 2;
     };
 }

 // 반지름이 1인 인스턴스 생성
 const circle1 = new Circle(1);
 // 반지름이 2인 인스턴스 생성
 const circle2 = new Circle(2);

 // Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
 // getArea 메서드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
 // getArea 메서드는 하나만 생성하여 모든 인스턴스가 공유해서 사용하는 것이 바람직하다.
 console.log(circle1.getArea === circle2.getArea); // false

 console.log(circle1.getArea()); // 3.141592653589793
 console.log(circle2.getArea()); // 12.566370614359172


 // [예제 19-4]
 // 생성자 함수
 function Circle(radius) {
     this.radius = radius;
 }

 // Circle 생성자 함수가 생성한 모든 인스턴스가 getArea 메서드를
 // 공유해서 사용할 수 있도록 프로토타입에 추가한다.
 // 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
 Circle.prototype.getArea = function () {
     return Math.PI * this.radius **2;
 };


 // 인스턴스 생성
 const circle1 = new Circle(1);
 const circle2 = new Circle(2);

 // Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
 // 프로토타입 Circle.prototype으로부터 getArea 메서드를 상속받는다.
 // 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메서드를 공유한다.
 console.log(circle1.getArea === circle2.getArea); // true

 console.log(circle1.getArea()); // 3.141592653589793
 console.log(circle2.getArea()); // 12.566370614359172


 // [예제 19-5]
 const person = { name: 'Lee' };


 // [예제 19-6]
 const obj = {};
 const parent = { x: 1 };

 // getter 함수인 get.__proto__가 호출되어 obj 객체의 프로토타입을 취득
 obj.__proto__;

 // setter 함수의 set.__proto__가 호출되어 obj 객체의 프로토타입을 교체
 obj.__proto__ = parent;

 console.log(obj.x); // 1


 // [예제 19-7]
 const person = { name: 'Lee' };

 // person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
 console.log(person.hasOwnProperty('__proto__')); // false

 // __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티다.
 console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
 // {get: f, set: f, enumerable: false, configurable: true}

 // 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
 console.log({}.__proto__ === Object.prototype); // true


 // [예제 19-8]
 const parent = {};
 const child = {};

 // child의 프로토타입을 parent로 설정
 child.__proto__ = parent;
 // parent의 프로토타입을 child로 설정
 parent.__proto__ = child; // TypeError: Cyclic__proto__value


 // [예제 19-9]
 // obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
 const obj = Object.create(null);

 // obj는 Object.__proto__를 상속받을 수 없다.
 console.log(obj.__proto__); // undefined

 // 따라서 __proto__보다 Object.getPrototypeOf 메서드를 사용하는 편이 좋다.
 console.log(Object.getPrototypeOf(obj)); // null


 // [예제 19-10]
 const obj = {};
 const parent = { x: 1 };

 // obj 객체의 프로토타입을 취득
 Object.getPrototypeOf(obj); // obj.__proto__;
 // obj 객체의 프로토타입을 교체
 Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

 console.log(obj.x); // 1


 // [예제 19-11]
 // 함수 객체는 prototype 프로퍼티를 소유한다.
 (function () {}).hasOwnProperty('prototype'); // -> true

 // 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
 ({}).hasOwnProperty('prototype'); // -> false


 // [예제 19-12]
 // 화살표 함수는 non-constructor다.
 const Person = name => {
     this.name = name;
 };

 // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
 console.log(Person.hasOwnProperty('prototype')); // false

 // non-constructor는 프로토타입을 생성하지 않는다.
 console.log(Person.prototype); // undefined

 // ES6의 메서드 축약 표현으로 정의한 메서드는 non-constructor다.
 const obj = {
     foo() {}
 };

 // non-constructor는 prototype 프로퍼티를 소유하지 않는다.
 console.log(obj.foo.hasOwnProperty('prototype')); // false

 // non-constructor는 프로토타입을 생성하지 않는다.
 console.log(obj.foo.prototype); // undefined


 // [예제 19-13]
 // 생성자 함수
 function Person(name) {
     this.name = name;
 }

 const me = new Person('Lee');

 // 결국 Person.prototype과 me.__proto__는 결국 동일한 프로토타입을 가리킨다.


 // [예제 19-14]
 // 생성자 함수
 function Person(name) {
     this.name = name;
 }

 const me = new Person('Lee');
 // me 객체의 생성자 함수는 Person이다.
 console.log(me.constructor === Person); // true


 // [예제 19-15]
 // obj 객체를 생성한 생성자 함수는 Object다.
 const obj = new Object();
 console.log(obj.constructor === Object); // true

 // add 함수 객체를 생성한 생성자 함수는 Function이다.
 const add = new Function('a', 'b', 'return a + b');
 console.log(add.constructor === Function); // true

 // 생성자 함수
 function Person(name) {
     this.name = name;
 }

 // me 객체를 생성한 생성자 함수는 Person이다.
 const me = new Person('Lee');
 console.log(me.constructor === Person); // true


 // [예제 19-16]
 // 객체 리터럴
 const obj = {};

 // 함수 리터럴
 const add = function (a, b) { return a + b; };

 // 배열 리터럴
 const arr = [1, 2, 3];

 // 정규 표현식 리터럴
 const regexp = /is/ig;


 // [예제 19-17]
 // obj 객체는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성했다.
 const obj = {};

 // 하지만 obj 객체의 생성자 함수는 Object 생성자 함수다.
 console.log(obj.constructor === Object); // true


 // [예제 19-18]
 // 2. Object 생성자 함수에 의한 객체 생성
 // 인수가 전달되지 않았을 때 추상 연산 OrdinaryObjectCreate를 호출하여 빈 객체를 생성한다.
 let obj  = new Object();
 console.log(obj); // {}

 // 1. new.target이 undefined나 Object가 아닌 경우
 // 인스턴스 -> Foo.prototype -> Object.prototype 순으로 프로토타입 체인이 생성된다.
 class Foo extends Object {}
 new Foo(); // Foo {}

 // 3. 인수가 전달된 경우에는 인수를 객체로 변환한다.
 // Number 객체 생성
 obj = new Object(123);
 console.log(obj); // Number {123}

 // String 객체 생성
 obj = new Objecdt('123');
 console.log(obj); // String {123}


 // [예제 19-19]
 // foo 함수는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성했다.
 function foo() {}

 // 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수다.
 console.log(foo.constructor === Function); // true


 // [예제 19-20]
 // 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
 console.log(Person.prototype); // {constructor: f}

 // 생성자 함수
 function Person(name) {
     this.name = name;
 }


 // [예제 19-21]
 // 화살표 함수는 non-constructor다.
 const Person = name => {
     this.name = name;
 };

 // non-constructor는 프로토타입이 생성되지 않는다.
 console.log(Person.prototype); // undefined


 // [예제 19-22]
 // 전역 객체 window는 브라우저에 종속적이므로 아래 코드는 브라우저 환경에서 실행해야 한다.
 // 빌트인 객체인 Object는 전역 객체 window의 프로퍼티다.
 Window.Object === Object // true


 // [예제 19-23]
 const obj = { x: 1 };


 // [예제 19-24]
 const obj = { x: 1 };

 // 객체 리터럴에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
 console.log(obj.constructor === Object); // true
 console.log(obj.hasOwnProperty('x')); // true


 // [예제 19-25]
 const obj = new Object();
 obj.x = 1;


 // [예제 19-26]
 const obj = new Object();
 obj.x = 1;

 // Object 생성자 함수에 의해 생성된 obj 객체는 Object.prototype을 상속받는다.
 console.log(obj.constructor === Object); // true
 console.log(obj.hasOwnProperty('x')); // true


 // [예제 19-27]
 function Person(name) {
     this.name = name;
 }

 const me = new Person('Lee');


 // [예제 19-28]
 function Person(name) {
     this.name = name;
 }

 // 프로토타입 메서드
 Person.prototype.sayHello = function () {
     console.log(`Hi! My name is ${this.name}`);
 };

 const me = new Person('Lee');
 const you = new Person('Kim');

 me.sayHello(); // Hi! My name is Lee
 you.sayHello(); // Hi! My name is Kim


 // [예제 19-29]
 function Person(name) {
     this.name = name;
 }

 // 프로토타입 메서드
 Person.prototype.sayHello = function () {
     console.log(`Hi! My name is ${this.name}`);
 };

 const me = new Person('Lee');

 // hasOwnProperty는 Object.prototype의 메서드다.
 console.log(me.hasOwnProperty('name')); // true


 // [예제 19-30]
 Object.getPrototypeOf(me) === Person.prototype // -> true


 // [예제 19-31]
 Object.getPrototypeOf(Person.prototype) === Object.prototype; // -> true


 // [예제 19-32]
 // hasOwnProperty는 Object.prototype의 메서드다.
 // me 객체는 프로토타입 체인을 따라 hasOwnProperty 메서드를 검색하여 사용한다.
 me.hasOwnProperty('name'); // -> true


 // [예제 19-33]
 Object.prototype.hasOwnProperty.call(me, 'name');


 // [예제 19-34]
 console.log(me.foo); // undefined


 // [예제 19-35]
 me.hasOwnProperty('name');


 // [예제 19-36]
 const Person = (function () {
     // 생성자 함수
     function Person(name) {
         this.name = name;
     }

     // 프로토타입 메서드
     Person.prototype.sayHello = function () {
         console.log(`Hi! My name is ${this.name}`);
     };

     // 생성자 함수를 반환
     return Person;
 }());

 const me = new Person('Lee');

 // 인스턴스 메서드
 me.sayHello = function () {
     console.log(`Hey! My name is ${this.name}`);
 };

 // 인스턴스 메서드가 호출된다. 프로토타입 메서드는 인스턴스 메서드에 의해 가려진다.
 me.sayHello(); // Hey! My name is Lee


 // [예제 19-37]
 // 인스턴스 메서드를 삭제한다.
 delete me.sayHello;
 // 인스턴스에는 sayHello 메서드가 없으므로 프로토타입 메서드가 호출된다.
 me.sayHello(); // Hi! My name is Lee


 // [예제 19-38]
 // 프로토타입 체인을 통해 프로토타입 메서드가 삭제되지 않는다.
 delete me.sayHello;
 // 프로토타입 메서드가 호출된다.
 me.sayHello(); // Hi! My name is Lee


 // [예제 19-39]
 // 프로토타입 메서드 변경
 Person.prototype.sayHello = function () {
     console.log(`Hey! My name is ${this.name}`);
 };
 me.sayHello(); // Hey! My name is Lee

 // 프로토타입 메서드 삭제
 delete Person.prototype.sayHello;
 me.sayHello(); // TypeError: me.sayHello is not a function


 // [예제 19-40]
 const Person = (function () {
     function Person(name) {
         this.name = name;
     }

     // 1 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
     Person.prototype = {
         sayHello() {
             console.log(`Hi! My name is ${this.name}`);
         }
     };

     return Person;
 }());

 const me = new Person('Lee');


 // [예제 19-41]
 // 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
 console.log(me.constructor === Person); // false
 // 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
 console.log(me.constructor === Object); // true


 // [예제 19-42]
 const Person = (function () {
     function Person(name) {
         this.name = name;
     }

     // 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
     Person.prototype = {
         // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
         constructor: Person,
         sayHello() {
             console.log(`Hi! My name is ${this.name}`);
         }
     };

     return Person;
 }());

 const me = new Person('Lee');

 // constructor 프로퍼티가 생성자 함수를 가리킨다.
 console.log(me.constructor === Person); // true
 console.log(me.consturctor === Object); // false


 // [예제 19-43]
 function Person(name) {
     this.name = name;
 }

 const me = new Person('Lee');

 // 프로토타입으로 교체할 객체
 const parent = {
     sayHello() {
         console.log(`Hi! My name is ${this.name}`);
     }
 };

 // 1 me 객체의 프로토타입을 parent 객체로 교체한다.
 Object.setPrototypeOf(me, parent);
 // 위 코드는 아래이 코드와 동일하게 동작한다.
 // me.__proto__ = parent;

 me.sayHello(); // Hi! My name is Lee


 // [예제 19-44]
 // 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 연결이 파괴된다.
 console.log(me.constructor === Person); // false
 // 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
 console.log(me.constructor === Object); // true


 // [예제 19-45]
 function Person(name) {
     this.name = name;
 }

 const me = new Person('Lee');

 // 프로토타입으로 교체할 객체
 const parent = {
   // constructor 프로퍼티와 생성자 함수 간의 연결을 설정
   constructor: Person,
   sayHello() {
       console.log(`Hi! My name is ${this.name}`);
   }
 };

 // 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 연결을 설정
 Person.prototype = parent;

 // me 객체의 프로토타입을 parent 객체로 교체한다.
 Object.setPrototypeOf(me, parent);
 // 위 코드는 아래의 코드와 동일하게 동작한다.
 // me.__proto__ = parent;

 me.sayHello(); // Hi! My name is Lee

 // constructor 프로퍼티가 생성자 함수를 가리킨다
 console.log(me.constructor === Person); // true
 console.log(me.constructor === Object); // false

 // 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
 console.log(Person.prototype === Object.getPrototypeOf(me)); // true











