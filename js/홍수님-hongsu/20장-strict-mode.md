## 20장 strict mode

#### [1. strict mode 란?](#1-strict-mode-란?-1)
#### [2. strict mode의 적용](#2-strict-mode의-적용-1)
#### [3. 전역에 strict mode를 적용하는 것은 피하자](#3-전역에-strict-mode를-적용하는-것은-피하자-1)
#### [4. 함수 단위로 strict mode를 적용하는 것도 피하자](#4-함수-단위로-strict-mode를-적용하는-것도-피하자-1)
#### [5. strict mode가 발생시키는 에러](#5-strict-mode가-발생시키는-에러-1)
#### [6. strict mode 적용에 의한 변화](#6-strict-mode-적용에-의한-변화-1)

***

### 1. strict mode란?
 > (ES5) 자바스크립트 언어의 문법을 좀 더 엄격히 적용하여 오류를 발생시킬 가능성이 높거나
   자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 명시적인 에러를 발생


### 2. strict mode의 적용
 > 전역의 선두/함수 몸체의 선두에 'use strict'; 를 추가


### 3. 전역에 strict mode를 적용하는 것은 피하자
 > 전역에 적용한 strict mode는 스크립트 단위로 적용


### 4. 함수 단위로 strict mode를 적용하는 것도 피하자
 > strict mode는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직


### 5. strict mode가 발생시키는 에러

 암묵적 전역
  > 선언하지 않은 변수를 참조하면 ReferenceError 발생

 변수, 함수, 매개변수의 삭제
  > delete 연산자로 변수, 함수, 매개변수를 삭제하면 SyntaxError 발생

 매개변수 이름의 중복
  > 중복된 매개변수 이름을 사용하면 SyntaxError 발생

 with 문의 사용
  > with 문을 사용하면 SyntaxError 발생


### 6. strict mode 적용에 의한 변화

 일반 함수의 this
  > (strict mode) 일반 함수로서 호출하면 this에 undefined가 바인딩
 
 arguments 객체
  > (strict mode) 인수를 재할당하여 변경해도 arguments 객체에 반영되지 않음
