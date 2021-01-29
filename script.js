// vscode 익스텐션 code runner가 설치 되어있다면
// 단축키 Ctrl + Alt + N 을 눌러서 vscode 에서 코드를 실행시켜 봅시다!



var binary = 0b01000001;  // 2진수
var octal = 0o101;        // 8진수
var hex = 0x41;           // 16진수

// 표기법만 다를 뿐 모두 같은 값으로 나옴
console.log(binary);            // 65
console.log(octal);             // 65
console.log(hex);               // 65
console.log(binary === octal);  // true
console.log(octal === hex);     // true

