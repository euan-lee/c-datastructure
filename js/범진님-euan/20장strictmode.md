20장.strict mode
------------
21.1 strict mode란?
```js
fucntion foo(){
    x=10;
}
foo();
console.log(x);//?

```
x를 선언하지 않아 referenceㅇ error가 날것같지만 암묵적 전역으로 전역객체에 x프로퍼티가 동적으로 생성된다. 나중에 오류가 생길수 잇으므로 반드시 let,const,var를 사용한다.
그래도 실수가 발생할 수 있는데 이떄 strict mode를 사용하거나 eslint를 사용해보자.


20.2strict mode의 적용
--------
전역의선두 또는 함수 몸체의 선두에 'usestrict'를 추가한다.
전역의 선두에 추가하면 스크립트 전체에 strictmode가 적용된다.

```js
'usestrict'
function foo(){
    x=10;//reference error :X is not defined
}
foo();
````

```js


function foo(){

    x=10;//에러를 발생시키지 않음
'usestrict'
}
foo();
````

20.3전역에 strict mode를 적용하는것은 nono
-------------
전역에 선언시 strict mode는 스크립트 단위로 적용된다.
따라서 이렇게 쓰는 것보단 
```js
(function(){
  'usestrict';
  //do something...  
}());
```
즉시 실행 함수의 선두에 strictmode를 적용하자


20.4함수단위로 strict mode를 적용하는 것도 피하자
-----------
strict mode가 적용된 함수가 참조 할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면 이또한 문제가 발생할 수 있다.
```js
(function(){
    var let=10;//에러가 발생하지 않음
    function foo(){
        'usestrict';
        let =20;//syntex error:unexpected strict mode reserved word
    }
    foo();
}())
```
따라서 strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용한는 것이 바람직 하다.

20.5  strict mode가 발생시키는 에러
-----------




20.5.1 암묵적 전역
----

선언하지 않은 변수를 참조하여 referenceError가 발생한다.
```js
(function(){
    'usestrict';
    x=1;
    console.log(x);//reference error:X is not defined
}());
```

20.5.2변수,함수,매개변수의 삭제
--------
delete연산자로 변수 함수 매개변수를 삭제하면 syntexerror가 발생한다.

```js
(function(){
    'usestrict';
    var x=1;
    delete x;//syntexerror:Delete of an unequalified identifier in strict mode. 

    function foo(a){
        delete a;//syntexerror:Delete of an unequalified identifier in strict mode. 
    }
    delete foo;//syntexerror:Delete of an unequalified identifier in strict mode. 
}());
```

20.5.3매개변수 이름의 중복
-----
중복된 매개변수 이름을 사용하면syntex error:unexpected strict mode reserved word
```js
(function(){
    'usestrict';
    //syntexerror:Duplicate parameter name not allowed in this context
    function foo(x,x){
        return x+x;
    }
    console.log(foo(1,2));
}());
```
20.5.4with 문의 사용
-----
사용시 syntex error가 발생 with문은 사용안하는 것이 좋다.
```js
(function(){
    "usestrict";
    //syntex error:strict mode code may not include a with statement
    with({x:!}){
        console.log(x);
    }
}())
```

20.6 strict mode 적용에 의한 변화
-----------





20.6.1 일반함수의 this
--------
strict mode에서 함수를 일반함수로 호출하면 this에 undefined가 바인딩 된다.
생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 떄문이다

```js
(function(){
    "usestrict";
    function foo(){
        console.log(this);//undefined
    }
    foo();
    function Foo(){
        console.log(this);/Foo
    }
    new Foo();
}());
```

20.6.2arguments 객체
-------------
strict mode에서는 매개변수에 전달된 인수를 재할당 변경하여도 arguments객체에 반영되지 않는다.
```js
(function(a){
    'usestrict';
    a=2;
    console.log(arguments);//{0:1,length:1}
}(1));
```