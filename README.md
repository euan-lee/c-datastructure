# js-deep-div
JavaScript Deep Dive

이 js branch에 모두 공부해온 내용을 합칠 예정입니다!

***

각자 이름이 적힌 폴더에 md 파일을 추가하고 커밋하면  
'git merge 브랜치명' 으로 다른 branch를 머지하고  
js 폴더에 받아온 파일을 하나로 합칠 예정!

예제)

[1] 공부해온 사람들

1. js 폴더를 만들고 그 안에 '에린님-wfedev' 이라는 각자 이름의 폴더를 만듬
2. 그리고 그 안에 공부한 내용 md 파일을 넣어서 js 폴더를 커밋!

[2] 내용을 정리할 사람

1. git checkout js             js branch 에서
2. git checkout -p wfedev js   브랜치명 wfedev 을 가진 사람의 js 폴더만 merge 하기
git checkout -p js_dave js
git checkout -p ColdNight js
git checkout -p yunseop-dev js
git checkout -p noderboarder js
git checkout -p Hong-ki js
git checkout -p hongsu js

3. '0123' 이라는 날짜별 폴더에 md 내용을 하나로 합쳐서 커밋!


```
git checkout -p 는 --patch 옵션이라서 아래와 같은 질문이 나옴 (y 누르면 됨)
Apply addition to index and worktree [y,n,q,a,d,?]? 의 의미는

y - stage this hunk
n - do not stage this hunk
q - quit; do not stage this hunk nor any of the remaining ones
a - stage this hunk and all later hunks in the file
d - do not stage this hunk nor any of the later hunks in the file
? - print help

g - select a hunk to go to
/ - search for a hunk matching the given regex
j - leave this hunk undecided, see next undecided hunk
J - leave this hunk undecided, see next hunk
k - leave this hunk undecided, see previous undecided hunk
K - leave this hunk undecided, see previous hunk
s - split the current hunk into smaller hunks
e - manually edit the current hunk
```

***

내용을 정리한 사람꺼를 받아서 보려면
git checkout -p js 0123 으로 날짜별 폴더를 받아오면 됨

