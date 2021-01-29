# Chapter 8. 제어문 (control flow statement)


- 제어문은 코드의 흐름을 이해하기 어렵게 만들어 가독성을 해치는 단점이 있음
- **forEach, map, filter, reduce** 같은 고차 함수를 활용한 **함수형 프로그래밍** 기법에서는 제어문의 사용을 억제해 복잡성을 줄일 수 있음



## 8.1 블록문

- 0개 이상의 문을 중괄호로 묶은 것 
- 문의 끝에는 세미콜론을 붙이나, 블록문은 자체 종결성을 가지므로 세미콜론 X

ex)
```js
{
    var foo = 10;
}

var x = 1;
if (x < 10) {
    x++;
}

function sum(a, b){
    return a + b;
}
```



## 8.2 조건문 (conditional statement)
- if & else
- switch


### if & else 문

```js
if (조건식1) {
    ~~~
} else if (조건식2) {
    ~~~
} else {
    ~~~
}
```


ex) 
```js
var num = 2;
var kind;

**if (num > 0)** {
    kind = '양수';
} **else if (num < 0 )** {
    kind = '음수';
} **else** {
    kind = '영';
}
console.log(kind); // 양수 
```


* 코드 블록 내의 문이 하나뿐이라면 중괄호를 생략할 수 있음

ex) 
```js
var num = 2;
var kind;

if (num > 0)      kind = '양수'; // 코드 블록 내 문이 하나뿐
else if (num < 0) kind = '음수';
else              kind = '영';

console.log(kind); // 양수
```


* 위와 같이 경우의 수가 3일 때에도 삼항 조건 연산자로 표현이 가능함

ex) 
```js
var num = 2;

var kind = num ? (num > 0 ? '양수' : '음수') : '영';

console.log(kind); // 양수
```


### switch 문

- 주어진 표현식을 평가해 그 값과 일치하는 표현식을 갖는 case문으로 실행 흐름을 옮김
- switch 문의 표현식과 **일치하는 case 문이 없다면 실행 순서는 default 문으로 이동**
- default 문은 선택사항으로 사용할 수도 & 사용하지 않을 수도 있음

```js
switch (표현식) {
    case 표현식 1:
        {switch 문의 표현식과 표현식 1이 일치하면 실행}
        break;
    case 표현식 2:
        {switch 문의 표현식과 표현식 2이 일치하면 실행}
        break;
    default:
        {switch 문의 표현식과 일치하는 case 문이 없을 때 실행}
}
```


ex) 
```js
var month = 11;
var monthName;

switch (month) {
    case 1: monthName = 'January'; // month의 값이 1과 일치할 때
    case 2: monthName = 'February';
    case 3: monthName = 'March';
    ...
    case 11: monthName = 'November';
    case 12: monthName = 'December';
    
    default: monthName = 'Invalid month'; // month의 값이 1~12 중 어느 것도 아닐 때 
}

console.log(monthName); // **Invalid month**
```

- 위에서는 case 문 내부로 들어와 [ monthName = 'November'; ]을 실행하였으나,
- **break 로 switch 문을 탈출하지 않았으므로** 모든 case문 & default문을 실행하였음 (폴스루, fall through)
- 따라서 **매 case 문마다 break를 추가**해줘야 함


ex)
```js
var month = 11;
var monthName;

switch (month) {
    case 1: monthName = 'January'; // month의 값이 1과 일치할 때
        break;
    case 2: monthName = 'February';
        break;
    case 3: monthName = 'March';
        break;
    ...
    case 11: monthName = 'November';
        break;
    case 12: monthName = 'December';
        break;
    
    default: monthName = 'Invalid month'; // break가 필요하지 않음 (생략이 일반적)
}

console.log(monthName); // **Invalid month**
```


ex)
```js
// 폴스루가 유용한 경우 (여러 개의 case 문을 하나의 조건으로 사용)
var year = 2000;
var month = 2;
var days = 0;

switch (month) {
    case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        days = 31;
        break;
    case 4: case 6: case 9: case 11:  
        days = 30;
        break;
    case 2:
        days = ( (year % 4 === 0 && year % 100 !==0) || (year % 400 === 0) ) ? 29 : 28; // 윤년 계산 알고리즘 (p.100)
        break;
    default:
        console.log('Invaild month');
}

console.log(days); // 29
```


## 8.3 반복문 (loop statement)

- for / while / do & while 
- 반복문을 대체할 수 있는 다양한 JS의 기능 
  - forEach (배열의 순회)
  - for & in (객체 내 프로퍼티의 열거)
  - for & of (이터러블의 순회, ES6)


**[ for 문 ]**


```js
for (변수 선언문 or 할당문; 조건식; 증감식) {
    조건식이 참인 경우 반복 실행될 문;
}
```

- 조건식이 참일 때, **코드 블록이 먼저 실행된 후 증감문이 마지막에 실행**됨
- 변수 선언문 or 할당문, 조건식, 증감식 모두 옵션이나 **하나라도 선언하지 않으면 무한루프**가 됨


ex) 
```js
for (var i = 0; i < 2; i++){ 
    console.log(i); // i -> 0, 1
}

for (var i = 1; i >= 0; i--){
    console.log(i); // i -> 1, 0
}
```

ex) 
```js
// 이중 중첩 for 문 (2개 주사위 각각의 눈의 합이 6이 되는 모든 경우의 수 출력)

for (var i = 1; i <= 6; i++){
    for (var j = 1; j <= 6; j++){
        if (i + j === 6) {
            console.log(`[${i}, ${j}]`);
        }
    }
}
```


**[ while 문 ]**


```js
var count = 0;

while (count < 3) {
    console.log(count);
    count++;
}


// 무한루프
while (true) { ... }


// 무한루프 & 탈출
var count = 0;

while (true) {
    console.log(count);
    count++;

    if (count ===3) break;
}

```

**[ do & while 문 ]**

- **코드 블록을 먼저 실행 -> 조건식을 평가**
- 코드 블록이 **무조건 1회 이상 실행**됨

ex)
```js
var count = 0;

do {
    console.log(count);
    count++;
} while (count < 3);
```



## 8.4 레이블 문(label statement) & break 문

- break 문 : **레이블 문, 반복문, switch 문**의 코드 블록을 탈출
- break 문 활용 불가 : **if 문**에 적용 시 SyntaxError 발생


**[ 레이블 문(label statement) ]**

- 식별자가 붙은 문 
- **프로그램의 실행 순서를 제어**하기 위해 활용 
- switch 문의 case & default도 레이블 문
- 레이블 문을 탈출하려면 break 문에 레이블 식별자 사용

ex) 
```js
// foo 라는 식별자가 붙은 레이블 블록문
foo : {
    console.log(1);
    break foo; // foo 레이블 블록문 탈출
    console.log(2);
}
console.log('done');
// output : 1 & done
```


ex) 
```js
// outer 라는 식별자가 붙은 레이블 for 문
outer: for (var i = 0; i < 3; i++){
    for (var j = 0; j < 3; j++){
        if (i + j === 3) {
            break outer; // i + j === 3 이면 outer 레이블 for 문을 탈출
        }
        console.log(`inner [${i}, ${j}]`);
    }
}
console.log('Done!');

// output :
// inner [0, 0]
// inner [0, 1]
// inner [0, 2]
// inner [1, 0]
// inner [1, 1]
// Done!
```

- 중첩된 for 문의 내부 for 문에서 break 실행 시 : 내부 for 문을 탈출해 외부 for 문으로 진입
- 이 때 내부 for 문이 아닌 **외부 for 문을 탈출하려면 레이블 문을 활용**


ex)
```js
var string = 'Hello World.';
var search = 'l';
var index;

for (var i = 0; i < string.length; i++){
    if (string[i] === search){
        index = i;
        break;
    }
}
console.log(index); // 2
```

ex) 위와 완벽히 동일한 결과를 출력
```js
var string = 'Hello World.';
var search = 'l';

console.log(string.indexOf(search)); // 2
```



## 8.5 continue 문

: 반복문의 코드 블록 실행을 현 지점에서 중단 & **반복문의 증감식**으로 실행 흐름을 이동


ex)
```js
var string = 'Hello World.';
var search = 'l';
var count = 0;

for (var i = 0; i < string.length; i++){
    if (string[i] !== search){
        continue; // 'l'이 아니면 현 지점에서 실행 중단 & 증감식으로 이동
    }
    count++; // continue 문 실행 시 무시됨
}

console.log(count); // 3
```


ex) 위와 완벽히 동일한 결과를 출력
```js
var string = 'Hello World.';
var search = 'l';
var count = 0;

for (var i = 0; i < string.length; i++){
    if (string[i] === search){
        count++; // continue 문을 사용하지 않으면 if 문 내에 코드를 직접 작성해야 함 
    }
}

console.log(count); // 3
```


ex) 위와 완벽히 동일한 결과를 출력
```js
var string = 'Hello World.';
var search = 'l';

const regexp = new RegExp(search, 'g');

console.log(string.match(regexp).length); // 3
```






