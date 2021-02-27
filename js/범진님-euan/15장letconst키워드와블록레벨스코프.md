15장
15.1 var 키워드로 선언한 변수의 문제점
----
----- 
15.1.1변수중복선언의 허용
--------


var 선언 변수는 중복선언이 가능하다.
```js
var x=1;
var y=1;

 var x=100;

 var y;
 console.log(x);///100
 console.log(y);///1
```

15.1.2함수레벨 스코프
--------
var 키워드로 선언한 변수는 오직 함수의 코드블록만을 지역 스코프로 인정한다.

```js
var x=1;
if(true){
    vara x=10;
}
console.log(x);//10
```
for문의 변수 선언문에서 var 선언 변수도 전역변수가 된다.

```js
var i=10;

for(var i=0;i<5;i++){
    console.log(i);
}
console.log(i);//5
```

15.1.3 변수 호이스팅
--------
var 키워드로 변수를 선언하면 변수 호이스팅으로 인해 변수선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다.
```js
console.log(foo);
foo=123;
console.log(foo);//123
var foo;
```

15.2 let 키워드
---------
----------

15.2.1변수 중복 선언 금지
------
var는  중복선언시 에러가 발생하지 않지만 let은 같은이름으로 중복선언시 문법에러가 발생한다.

```js
var foo=123;
var foo=456;
let bar=123;
let bar =456;//SyntexError:Identifier 'bar' has already been defined
```


15.2.2블록 레벨 스코프
-----------
-----------
let은 var와 다르게 함수레벨 뿐만 아니라 모든 블록 레벨 스코프를 지역 스코프로 인정한다.

```js
let foo=1;//전역변수
{
    let foo=2;
    let bat =3;
}
console.log(foo);//1
console.log(bar);//ReferenceError:bar is not defined
```
15.2.3변수 호이스팅
let은  var와 다르게 변수호이스팅이 발생하지 않는것처럼 동작한다.

```js
console.log(foo)//reference error
let foo;
```
반면 var의 경우
```js
console.log(foo);//undefined
var foo;
console.log(foo);//undefined
foo=1;
console.log(foo);//1
```
즉 var는 선언단계와 초기화단계가 같이 진행된다.
반면 let은 선언단계와 초기화 단계가 분리되어 진행된다.
초기화 단계는 변수선언문에 도달하였을 때 실행된다.(선언문 과 선언 단계는 다른것인가?) 
그리고 선언단계와 초기화 단계의 구간에 변수를 참조하려하면 reference error가 나오는데 이구간을 tdz(temporal dead zone)(일시적 사각지대) 라고한다.예시를 보도록하자

```js
console.log(foo);//referenceerror:foo is not defined
let foo;
console.log(foo);//undefined
foo=1;
console.log(foo);//1
```
그럼 변수 호이스팅이 없다고 생각하면 되는가?
그렇지 않다.
```js
let foo=1;//전역변수
{
    console.log(foo);//reference error cannot access 'foo' before initialization
    let foo=2;//지역변수
}

///이것과 같은가?
```js
let foo=1;//전역변수
{
    let foo;
    console.log(foo);//->undefined나옴
    foo=2;//지역변수
}
```
선언단계란?:변수이름을 들록하여 js엔진에 변수의 존재를 알린다.만약 엔진이 모른다면 uncatched refernece error가 나온다.


초기화 단계:값을 저장하기 위한 메모리공간을 확보하고 암묵적으로 undefined를 할당해 초기화 한다.
reference error는  식별자를 통해 값을 참조하려 했지만 js엔진이 식별자를 찾을수 없을때 나온다


15.2.4 전역 객체와 let
----
----- 
var로 선언한 전역변수 ,전역함수는 window의 객체가 되며 window는 생략할 수 있다.(암묵적 전역)

```js
var x=1;
y=2;

function foo(){}
console.log(window.x);//1
console.log(x);//1
console.log(window.y);//2
console.log(y);//2
console.log(window.foo);//foo(){}
console.log(foo);//foo(){}
```
반면에 let으로 설정한 전역변수는 전역 객체의 프로퍼티가 아니다.
let전역변수는 보이지않는 개념적인 블록내에 존재하게 된다.

```js
let x=1;

console.log(window.x);//undefined
console.log(x);//1
```

15.3 const 키워드
-----
------
const 키워드는 상수를 선언하기 위해 사용된다.
but 상수이외에도 사용할 수 있다.
let과 비슷한 점이 많으므로 서로의 차이점을 비교해보자

15.3.1선언과 초기화
------
const는 선언과 동시에 초기화를 해야한다.

```js
const foo=1;
```
이렇게 하지 않으면 에러가 난다.

```js
const foo;//syntex error :missing initializer in const declaration
```
const 키워드는 let키워드로 선언한 변수와 마찬가지로 블록 레벨 스코프를 가지며 변수 호이스팅이 발생하지 않는것 처럼 동작
```js
{
    console.log(foo);//reference error:cannot access 'foo' before initialization
    const foo=1;
    console.log(foo);//1
}
console.log(foo)//js엔진이 foo변수를 아는가? 모른다고 예상 uncatched reference error 예상;;
```
15.4.3재할당 금지
----
const 는 한번만 할당

```js
const foo=1;
foo=2;
```
15.3.3상수
-----
변수의 반대 개념 재할당 금지
상태유지와 가독성,유지보수의 편의를 위해 적극적으로 사용 

15.3.4 const키워드와 객체 
--------------
const 키워드로 선언된 변수에 원시값을 할당한 경우 값을 변경할 수 없다.but 객체는 변경 가능하다.

```js
const person={
    name:'lee'
};
person.name='kim'
console.log(person);//{name:"kim"}
```
const는 재할당이 금지이지 불변을 의미하지 않는다.

15.4 var vs let vs const 
----
----
es6부터는 var 키워드 사용하지 않음
const 쓰다가 let으로 바꾸는거 추천


최종질문
-선언문 과 선언단계는 다른것인가?(예상 :예)
https://freestrokes.tistory.com/101



-js엔진에서 변수인식이 안되었을떄 즉 선언단계에서 인식이 안되었을 때 나오는 에러가 다르다.



reference error foo is not defined

Uncaught ReferenceError: fox is not defined 
이 둘의 차이는??