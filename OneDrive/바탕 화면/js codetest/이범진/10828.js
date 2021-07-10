// 입력을 인자로 받아 문제를 푸는 solution 함수
function solution(input) {
    const stack = [];
    let top = 0;
    let answer = "";
    const cmdObj = {
      push: (x) => (stack[top++] = x),
      pop: () => {
        if (top) {
          top--;
          return stack.splice(-1);
        }
        return -1;
      },
      size: () => top,
      empty: () => (!top ? 1 : 0),
      top: () => (top ? stack[top - 1] : -1),
    };
  
    input.slice(1).map((str) => {
      const [cmd, num] = str.split(" ");
      if (cmd === "push") cmdObj[cmd](+num);
      else answer += `${cmdObj[cmd]()}\n`;
    });
    return answer;
  }
  
  // 아래는 백준에서 여러 줄의 입력을 받는 부분이다.
  const input = [];
  require("readline")
    .createInterface(process.stdin, process.stdout)
    .on("line", (line) => {
      input.push(line);
    })
    .on("close", () => {
      console.log(solution(input));  // 이 부분에서 함수를 실행하고 정답을 출력한다.
      process.exit();
    });

    /*
    const input = ['14', 'push 1', 'push 2', 'top', 'size', 'empty', 'pop', 'pop', 'pop', 'size', 'empty', 'pop', 'push 3', 'empty', 'top'];
let stack = [];

counter = Number(input[0]);

for (i = 1; i < counter + 1; i++) {
  const comand = input[i].split(' ');
  if (comand.length == 1){
    // pop 일때 
    if (comand[0] === 'pop') {
      if (stack.length == 0) {
        console.log(-1)
      } else {
        console.log(stack.pop())
      }
    }

    // top 일때
    if (comand[0] === 'top') {
      if (stack.length == 0) {
        console.log(-1);
      } else {
        console.log(stack[stack.length -1])
      }
    }

    // empty 일때 
    if (comand[0] === 'empty') {
      if (stack.length == 0) {
        console.log(1)
      } else {
        console.log(0)
      }
    }

    // size 일때
    if (comand[0] === 'size') {
      console.log(stack.length)
    }
  } else {
    // push 일때
    x = comand[1];
    stack.push(x);
  }
  // console.log(comand[0]);
}


    */