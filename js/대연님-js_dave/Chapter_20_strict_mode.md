# 20. strict mode

- 추가 학습 @ https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode



## 20.1 strict mode란?


```js

function foo() {
    x = 10;
}
foo();

console.log(x); // ? -> 10

```

- foo 함수 내에서 선언하지 않은 x 변수에 값 10을 할당함
- 이 때, x 변수를 찾아야 x에 값을 할당할 수 있으므로, js 엔진은 x 변수가 어디서 선언되었는지 스코프 체인을 따라 검색 시작

<br>

- js 엔진이 foo 함수의 스코프에서 x 변수의 **선언**을 검색하기 시작함
- foo 함수 스코프에는 x 변수 선언이 없으므로 foo 함수 컨텍스트의 상위 스코프 (위 예제에서는 전역 스코프)에서 x 변수의 선언을 검색

<br>

- 전역 스코프에도 x 변수의 선언이 없으므로 ReferenceError가 발생할 것 같으나,
- js 엔진은 암묵적으로 **전역 객체에 x 프로퍼티를 동적으로 생성함**
- 이 전역 객체의 x 프로퍼티는 마치 전역 변수처럼 사용할 수 있음
- 이러한 현상이 **암묵적 전역 implicit global**

<br>

>의도적이지 않은 암묵적 전역은 오류를 발생시킬 위험이 크므로 
반드시 **[ var / let / const ] 키워드를 사용해 변수를 선언**한 다음 사용해야 함

<br>

- 잠재적인 오류를 미연에 방지하기 위한 개발 환경 측면에서의 해결책으로서 ES5 부터 **strict mode (엄격 모드)**가 추가됨
- js 문법을 보다 더 엄격하게 적용해 오류 발생 가능성이 높거나 최적화에 문제를 일으키는 코드에 대해 명시적인 에러를 발생시킴
- **ES6에서 도입된 클래스 & 모듈은 strict mode가 기본적으로 적용됨**

<br>

- ESLint 같은 린트 도구는 정적 분석을 통해 미리 잠재적인 오류까지 찾아내고 그 원인을 리포팅해줌 @ poiemaweb.com/eslint
- ESLint는 strict mode의 범위는 물론 **코딩 컨벤션을 설정 파일 형태로 정의하고 강제**할 수 있어 strict mode보다 더 유용함



## 20.2 strict mode의 적용

```js
// strict mode를 적용하려면 전역의 선두 or 함수 몸체의 선두에 아래와 같이 추가
// 전역의 선두에 추가 시, 스크립트 전체에 strict mode가 적용됨

'use strict';

function foo() {
    x = 10; // ReferenceError: x is not defined
}

foo(); 

```


```js
// 함수 몸체의 선두에 추가 시, 해당 함수 & 중첩 함수에 적용됨

function foo() {
    'use strict';
    
    x = 10; // ReferenceError: x is not defined
}

foo(); 

```



## 20.3 전역에 strict mode를 적용하는 것은 권장 X

```html
<!DOCTYPE html>
<html>
<body>

    <script>
        'use strict';
    </script>
    <script>
        x = 1; // 에러 발생 X
        console.log(x); // 1
    </script>

    <script>
        'use strict';
        
        y = 1; // ReferenceError: y is not defined
        console.log(x); 
    </script>

</body>
</html>

```

- 위와 같이 strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있음
- **외부 서드파티 라이브러리를 사용 시 해당 라이브러리가 non-strict mode인 경우**도 있으므로 [ 전역에 strict mode를 적용하는 것은 바람직하지 않음 ]
- 대신, 즉시실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고,
  즉시실행 함수의 선두에 strict mode를 적용할 수 있음

```js

(function () {
    'use strict';
    // ~~~
}());

```



## 20.4 함수 단위로 strict mode를 적용하는 것도 권장 X

- 일부 함수만 strict mode만 적용하는 것은 바람직하지 X
- 매번 모든 함수에 strict mode를 적용하는 것도 번거로움
- **strict mode는 즉시실행 함수로 감싼 <u>스크립트 단위</u>로 적용**하는 것이 바람직



## 20.5 strict mode가 발생시키는 에러



### [ 1) 암묵적 전역 ]

- 선언하지 않은 변수 참조 시 ReferenceError 발생

```js

(function () {
    'use strict';

    x = 1; 
    console.log(x); // ReferenceError: x is not defined
}());

```



### [ 2) 변수/함수/매개변수의 삭제 ]

- delete 연산자로 변수/함수/매개변수를 삭제 시 SyntaxError 발생

```js

(function () {
    'use strict';

    var x = 1;
    delete x; // SyntaxError: Delete of an unqualified identifier in strict mode.

    function foo(a) {
        delete a; // SyntaxError: Delete ~~~
    }
    delete foo; // SyntaxError: Delete ~~~
}());

```



### [ 3) 매개변수 이름의 중복 ]

- 중복된 매개변수 이름 사용 시 SyntaxError 발생

```js

(function () {
    'use strict';

    // SyntaxError: Duplicate parameter name not allowed in this context
    function foo(x, x) {
        return x + x;
    }
    console.log(foo(1, 2)); 
}());

```



### [ 4) with 문의 사용 ]

- with문은 전달된 객체를 스코프 체인에 추가함
- 동일한 객체의 프로퍼티를 반복 사용 시 객체 이름을 생략할 수 있어서 코드가 간단해지나,
  성능 & 가독성이 나빠지는 문제가 있음

- 따라서 with문은 사용하지 않는 것이 좋음
- with 문 사용 시 SyntaxError 발생

```js

(function () {
    'use strict';

    // SyntaxError: Strict mode code may not include a with statement
    with({ x: 1 }){
        console.log(x);
    }
}());

```



## 20.6 strict mode 적용에 의한 변화

- strict mode에서 함수를 일반 함수로 호출 시, this에 undefined가 바인딩됨
- 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문
- 에러는 발생 X

```js

(function () {
    'use strict';

    function foo() {
        console.log(this); // undefined
    }
    foo();
    
    function Foo() {
        console.log(this); // Foo
    }
    new Foo();
}());

```

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도
  arguments 객체에 반영되지 않음

```js

(function (a) {
    'use strict';

    // 매개변수에 전달된 인수를 재할당하여 변경
    a = 2;

    // 변경된 인수가 arguments 객체에 반영되지 않음
    console.log(arguments); // { 0: 1, length: 1 }
}(1));

```


```js

function test(test) {
    'use strict';
    console.log('Phase1 (arguments) : ', arguments);
    console.log(arguments[0]);

    console.table(test, 'Phase1 (params) : ');
    console.log(test.a + 10);

    test.a = 100;

    // 만약 주어진 인수가 객체일 경우에는, 변경된 인수가 arguments 객체에 반영됨
    console.log('Phase2 (arguments) : ', arguments);
    console.log(arguments[0]);
    
    console.table(test, 'Phase2 (params) : ');
    console.log(test.a + 10);
}

test({a:1});

```
