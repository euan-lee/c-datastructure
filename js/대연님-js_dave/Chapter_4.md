# Chapter 4. 변수



## 4.1 변수란 무엇인가?


[10 + 20] 이라는 코드를 자바스크립트 엔진이 계산(평가evaluation)하려면 : 
- 10, 20, + 라는 기호(리터럴literal & 연산자operator)의 의미를 이해
- 10 + 20 이라는 식(표현식expression)의 의미를 해석(parsing)

10 & 20 이라는 값은 2진수로 변환되어 1바이트(8비트) 크기의 메모리 셀에 저장됨 (저장될 메모리 주소는 코드가 실행될 때 임의로 결정됨)
각 메모리 셀은 메모리 주소를 가지고 있음
메모리 주소는 0 부터 메모리 크기 만큼의 정수까지로 표현됨 (ex. 4GB 메모리 == 0(0x00000000) ~ 4,294,967,295(0xFFFFFFFF))

이 때, 특정 메모리 주소에 직접 접근하여 값을 얻어내는 것은 적절하지 않으며,
메모리 주소 대신 값을 저장하고 불러올 수 있는 도구로서 변수(variable)를 활용하게 됨


변수(variable) 
== 하나의 값을 저장하기 위해 확보한 메모리 공간 자체 
== 해당 메모리 공간을 식별하기 위해 붙인 이름 
== 값의 위치를 가리키는 상징적인 이름
-> 추후 프로그래밍 언어의 컴파일러or인터프리터에 의해 값이 저장된 메모리 주소로 치환되어 실행됨

ex) var result = 10 + 20;

- **할당(assignment, 대입, 저장) : 변수를 지정하여 메모리 주소에 값을 저장하는 것**
- **참조(reference) : 변수 이름과 매핑된 메모리 주소에 저장된 값을 읽어들이는 것**



## 4.2 식별자 (identifier)


- 어떤 값을 구별해서 식별할 수 있는 고유한 이름 (메모리 주소를 기억하고 있음)
- **변수, 함수, 클래스 등의 이름**을 모두 포함함



## 4.3 변수 선언 (variable declaration)


- 변수를 생성하는 것
  : 값을 저장하기 위한 메모리 공간을 확보(allocate)하고, 
    변수 이름 & 확보된 메모리 공간의 주소를 연결(name binding)해서,
    값을 저장할 수 있도록 준비하는 것.

- 변수 선언을 위한 키워드 : var -> **var / let / const**
- var 를 활용한 변수 선언은 [ 의도치 않은 전역 변수 선언 ]이 발생할 수 있음
- ES6 부터는 var 를 권장하지 않으나, ES6 역시도 ES5 를 포함한 상위 집합이므로 var의 실행은 문제없이 가능함


- **키워드(keyword)**
  자바스크립트 엔진이 수행할 **동작을 규정한 일종의 명령어**
  자바스크립트 엔진은 키워드를 만나면 자신이 수행해야 할 약속된 동작을 수행함 


var score; 와 같이 변수 선언 시,
따로 값을 할당하지 않았으나 확보된 메모리 공간에는 **undefined라는 값이 암묵적으로 할당되어 초기화**됨


- 모든 식별자는 실행 컨텍스트(execution context) 내에 등록됨
- 자바스크립트 엔진은 실행 컨텍스트를 통해 식별자 & 스코프를 관리함
- 변수의 이름 & 값은 실행 컨텍스트 내에 key & value 형식의 객체로 등록됨


- 하나의 라인에서 여러 변수를 한번에 선언하는 것은 가독성이 떨어지므로 권장 X 
- **변수 & 함수 : camelCase** 권장
- **클래스 & 생성자 함수 : PascalCase** 권장



## 4.4 변수 선언의 실행 시점 & 변수 호이스팅 


ex) 
console.log(score);
var score;
-> ReferenceError 가 발생하지 않고 undefined 가 출력됨

JS 엔진은 소스코드를 한 줄씩 실행하기에 앞서,
먼저 소스코드에 대한 평가 과정을 거치면서 소스코드 실행을 준비함 
이 때, JS 엔진은 **모든 선언문을 소스코드에서 찾아내어 먼저 실행**함 

이러한 소스코드 평가 과정이 종료된 후, 
**모든 선언문을 제외하고 소스코드를 한 줄씩 순차적으로 실행**함
이 순차 실행 시점을 런타임(runtime)이라고 함 


**[???] 모든 선언문을 실행 -> [Runtime] 선언문을 제외한 코드의 실행**

-> **(식별자) 호이스팅(identifier hoisting)** == (모든 식별자들에 대한) 선언문들이 코드 최상단으로 끌어올려진 것과 같이 먼저 실행되는 JS의 작동 방식



## 4.5 값의 할당


ex) 
console.log(score); // undefined
var score = 80;
console.log(score); // 80

- 변수 선언 : **런타임 이전**에 먼저 실행됨
- 값의 할당 : **런타임**에 실행됨 

* 값의 할당이 진행될 때에는 변수 선언 시 undefined 가 저장된 메모리 공간이 아닌 **새로운 메모리 공간을 확보 후 해당 할당 값이 저장**됨
  변수의 값을 바꾸는 **재할당 시에도 마찬가지**로 새로운 메모리 공간을 확보하여 새로이 값이 저장됨
  이 때 실제 변수는 마지막에 할당된 값이 위치한 메모리 주소만 가리키고 있으며, 
  이전에 존재했던 값들의 메모리 주소에 대해서는 주기적으로 메모리가 해제(release)됨 == Garbage collector의 기능


ex) 
console.log(score); // undefined
score = 80;
var score;
console.log(score); // 80


**JS의 예약어(reserved word) 리스트**
- for / do / while / if / else / finally
- case / switch / in / throw / try / catch / return / yield
- break / continue
- import / export / extends / implements / interface / package / super
- private / protected / public / static / void
- class / function / const / let / var
- true / false / null / this
- await / new / with / debugger / default / delete / enum / instanceof / typeof


