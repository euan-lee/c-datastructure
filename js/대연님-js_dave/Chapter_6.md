# Chapter 6. 데이터 타입


[ ES6 ]

* [ Primitive type (원시 타입) ]

- number
- string
- boolean
- undefined
- null
- symbol (ES6)

* [ Object/Reference type (객체 타입) ]

- 객체
- 함수
- 배열 
- etc.


[ 데이터 타입의 의의 ]

* JS 엔진은 데이터 타입(값의 종류)에 따라 정해진 크기의 메모리 공간을 확보함
* 즉, 변수에 할당되는 값의 데이터 타입에 따라 **확보할 메모리의 크기**와 추후 **메모리에서 읽어들인 2진수의 해석 방식**이 결정됨
* 이 때, string & number 외 데이터 타입의 메모리 크기는 정해져있지 않으며 JS 엔진 제조사의 구현에 따라 달라짐
* 변수의 값을 읽어낼 때에도 사전에 해당 데이터 타입이 차지하는 메모리 크기가 정해져 있으므로 그 만큼의 메모리 셀을 읽어들임으로써 훼손 없이 값을 불러올 수 있음


[ 변수에 할당된 값의 데이터 타입을 확인 : **typeof 연산자(함수X)**를 활용 ]

ex)
foo = 3;
console.log(typeof foo); // number 


[ 변수 사용 시 권장 사항 ]

- 변수의 스코프(유효 범위)는 최대한 좁게 만든다.
- 전역 변수는 최대한 사용하지 않는다.
- const를 적극 활용한다.



## 6.1 number (숫자 타입)


- **number** : 정수/실수 구분 없음 & Double-precision **floating-point** (only **10진수 실수**)
-> 추가로 [ Infinity / -Infinity / NaN ] 존재



## 6.2 string (문자열 타입)


- **변경 불가능(immutable)**한 원시(primitive) 타입 <- 문자의 배열 X / 객체 X 
- 16 bit 유니코드 (UTF-16)


* Escape sequence 

- \0 : Null
- \b : 백스페이스 
- \t : 탭 
- \uXXXX : 유니코드 

- \n : LF (Line Feed) == 개행 == 다음 행으로 이동
- \r : CR (Carriage Return) == 개행 == 커서를 처음으로 이동 
-> 과거 타자기에서 CR+LF 방식으로 커서를 처음으로 이동 후 종이를 한 줄 올려 줄을 개행을 하였었음



## 6.3 template literal (ES6, 템플릿 리터럴)


template literal : `~` (백틱)으로 문자열을 감싸서 만듦

- 멀티라인 문자열 가능
- **${표현식}** 으로 문자열 내 표현식(변수 등) 삽입 가능 : `My name is ${first} ${last}.` / `1 + 2 = ${1 + 2}`



## 6.5 undefined + 6.6 null


- 개발자가 의도적으로 undefined 를 할당하는 것을 권장하지 않음 (변수 초기화 시에만 JS 엔진이 할당)

- **변수에 값이 없다**는 것을 명시하고 싶을 때에는 **null** 을 할당 
- null의 할당 == 이전에 할당되어있던 값에 대한 **참조를 명시적으로 제거**하는 것

* 특정 **함수가 유효한 값을 반환할 수 없는 경우 null 을 반환**하기도 함 



## 6.7 symbol (심벌 타입)


- 리터럴을 통해 생성하는 다른 원시 값들과 달리 Symbol 함수를 호출해 생성함
- 주로 이름이 충돌할 위험이 없는 [ 객체의 유일한 프로퍼티 키 ]를 만들기 위해 사용 (이해 불가, 33장에서 추후 학습)



## 6.8 Object/Reference type (객체 타입)


- number / string / undefined / null / boolean / symbol 까지의 **6가지 primitive type 외 모든 값**들은 **객체 타입**
- 자바스크립트는 객체 기반의 언어 & 자바스크립트를 이루고 있는 거의 모든 것은 객체


