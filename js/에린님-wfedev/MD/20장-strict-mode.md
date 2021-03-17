## 20장 strict mode

#### [1. strict mode 란?](#1-strict-mode-란?-1)
#### [2. strict mode의 적용](#2-strict-mode의-적용-1)
#### [3. 전역에 strict mode를 적용하는 것은 피하자](#3-전역에-strict-mode를-적용하는-것은-피하자-1)
#### [4. 함수 단위로 strict mode를 적용하는 것도 피하자](#4-함수-단위로-strict-mode를-적용하는-것도-피하자-1)
#### [5. strict mode가 발생시키는 에러](#5-strict-mode가-발생시키는-에러-1)
#### [6. strict mode 적용에 의한 변화](#6-strict-mode-적용에-의한-변화-1)

***

### 1. strict mode 란?

```js
function foo() {
    x = 10;
}
foo();
console.log(x); // 실행 결과는 무엇일까요?
```

- foo 함수 내에서 선언하지 않은 x 변수에 값 10을 할당했습니다.
> 이 때, x 변수를 찾아야 x에 값을 할당할 수 있으므로
> 자바스크립트 엔진은 x 변수가 어디서 선언되었는지
> 스코프 체인을 따라 검색을 시작합니다.

- 전역 스코프에도 x 변수의 선언이 존재하지 않기 때문에
> ReferenceError를 발생시킬 것 같지만
> 암묵적으로 전역 객체에 x 프로퍼티를 동적으로 생성합니다.
> 전역 객체의 x 프로퍼티는 마치 전역변수 처럼 사용할수 있습니다.
> 이런 현상을 `암묵적 전역` 이라 부릅니다.

- 암묵적 전역은 오류를 발생시키는 원인이 될 가능성이 큽니다.
> 반드시 var, let, const 키워드를 사용하여 변수를 선언한 다음 사용해야 합니다.

- 안정적인 코드를 생산하기 위해서는 `근본적인 접근`이 필요합니다.
> 잠재적인 오류를 발생시키기 어려운 개발 환경을 만들고
> 그 환경에서 개발하는 것이 근본적인 해결책 입니다.

- 이를 지원하기 위해 ES5 부터 strict mode(엄격모드)가 추가되었습니다.
> `Strict mode`는 자바스크립트의 문법을 좀 더 염격히 적용하여
> `오류를 발생시킬 가능성`이 높거나
> 자바스크립트 엔진의 `최적화 작업`에 `문제를 일으킬 수 있는 코드`에 대해
> `명시적인 에러`를 `발생`시킵니다.

- ESLint 같은 린트 도구를 사용해도 strict mode와 유사한 효과를 얻을 수 있습니다.
> 린트 도구는 정적분석 기능을 통해
> 소스코드를 실행하기 전에 스캔하여
> 문법적 오류만이 아니라 잠재적 오류까지 찾아내고
> 오류의 원인을 리포팅 해주는 유용한 도구입니다.

![](img/20-1.png)

- 린트 도구는
> strict mode가 제한하는 오류는 물론
> 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있습니다.
> strict mode 보다는 린트 도구의 사용을 추천합니다.

- ESLint를 설치 및 사용하는 방법은 아래에서 참고
> https://poiemaweb.com/eslint

- ES6에서 도입된 클래스와 모듈은
> 기본적으로 strict mode가 적용됩니다.


### 2. strict mode의 적용

- strict mode를 적용하려면
> 전역의 선두 또는 함수 몸체의 선두에 'use strict'를 추가 합니다.
> 전역의 선두에 추가 시, 스크립트 전체에 strict mode가 적용됩니다.

```js
'use strict';
function foo() {
    x = 10; // ReferenceError: x is not defined
}
foo(); 
```

- 함수 몸체의 선두에 추가 시, 해당 함수와 중첩 함수에 적용됩니다.

```js
function foo() {
    'use strict';
    x = 10; // ReferenceError: x is not defined
//  'use strict'; - 코드의 선두에 위치시키지 않으면 strict mode가 제대로 동작하지 않습니다.
}
foo(); 
```

### 3. 전역에 strict mode를 적용하는 것은 피하자

```html
<!DOCTYPE html>
<html>
<body>

    <script>
      'use strict';
    </script>
    <script>
      x = 1; // 에러가 발생하지 않습니다.
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

- 스크립트 단위로 적용된 strict mode는
> 다른 스크립트에 영향을 주지 않고 해당 스크립트에 한정되어 적용됩니다.

- strict mode 스크립트와 non-strict mode 스크립트를 혼용하는 것은 오류를 발생시킬 수 있습니다.

- `외부 서드파티 라이브러리를 사용 시
> 해당 라이브러리가 non-strict mode인 경우도 있으므로
> 전역에 strict mode를 적용하는 것은 바람직하지 않습니다.
> 이럴경우 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고,
> 즉시실행 함수의 선두에 strict mode를 적용하면 됩니다.

```js
// 즉시실행 함수의 선두에 strict mode를 적용
(function () {
    'use strict';
    // ~~~
}());
```

### 4. 함수 단위로 strict mode를 적용하는 것도 피하자

- 일부 함수만 strict mode만 적용하는 것은 바람직하지 않습니다.
> 매번 모든 함수에 strict mode를 적용하는 것도 번거롭습니다.
> strict mode가 적용된 함수가
> 참조할 함수 외부의 컨텍스트에 strict mode를 적용하지 않는다면
> 이 또한 문제가 발생할 수 있습니다.

- 따라서 strict mode는 즉시실행 함수로 감싼 `스크립트 단위로 적용`하는 것이 바람직합니다.

### 5. strict mode가 발생시키는 에러

- 다음은 strict mode를 적용했을 때 에러가 발생하는 대표적인 사례입니다.

#### 20.5.1 암묵적 전역

```js
// 선언하지 않은 변수를 참조하면
// ReferenceError가 발생합니다.
(function () {
    'use strict';
    x = 1;
    console.log(x); // ReferenceError: x is not defined
}());
```

#### 20.5.2 변수, 함수, 매개변수의 삭제

```js
// delete 연산자로 변수, 함수, 매개변수를 삭제하면
// SyntaxError가 발생합니다.
(function () {
    'use strict';
    var x = 1;
    delete x;           // SyntaxError
    function foo(a) {
      delete a;         // SyntaxError
    }
    delete foo;         // SyntaxError
}());
```

#### 20.5.3 매개변수 이름의 중복

```js
// 중복된 매개변수 이름을 사용하면 SyntaxError가 발생합니다.
(function () {
    'use strict';
    function foo(x, x) {
     return x + x;
    }
    console.log(foo(1, 2));
}());
```

#### 20.5.4 with 문의 사용

```js
// with문을 사용하면 SyntaxError가 발생합니다.
// with문은 전달된 객체를 스코프 체인에 추가합니다.
// with문은 동일한 객체의 프로퍼티를 반복해서 사용할 때
// 객체 이름을 생략할 수 있어서 코드가 간단해지는 효과가 있지만
// 성능과 가독성이 나빠지는 문제가 있습니다.
// with문은 사용하지 않는 것이 좋습니다.
(function () {
    'use strict';
    // SyntaxError: Strict mode code may not include a with statement
    with({ x: 1 }) {
      console.log(x);
    }
}());
```

### 6. strict mode 적용에 의한 변화

#### 20.6.1 일반 함수의 this

- strict mode에서 함수를 일반 함수로 호출 시
> this에 undefined가 바인딩 됩니다.
> 생성자 함수가 아닌 일반 함수 내부에서는 this를 사용할 필요가 없기 때문입니다.
> 이 때, 에러는 발생하지 않습니다.

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

#### 20.6.2 arguments 객체

- strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경해도
>  arguments 객체에 반영되지 않습니다.

```js
(function (a) {
    'use strict';
    // 매개변수에 전달된 인수를 재할당하여 변경
    a = 2;

    // 변경된 인수가 arguments 객체에 반영되지 않습니다.
    console.log(arguments); // { 0: 1, length: 1 }
}(1));
```

