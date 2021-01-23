# js-deep-div

JavaScript Deep Dive

이 js branch에 모두 공부해온 내용을 합칠 예정입니다!

---

### [1] 공부해온 사람들

```
1. js 폴더를 만들고
2. 그 안에 '에린님-wfedev' 이라는 각자 '이름-브런치명'의 폴더를 만듬
3. 그리고 그 안에 날짜별 폴더를 만들고, 공부한 내용 md 파일을 넣어서
4. js 폴더를 커밋!
```


```
// PR

git branch                          현재 branch 확인
git checkout -b js                  js branch를 만들고
git add js                          커밋 할 js 폴더를 추가
git commit -m "[이름] 커밋메세지"     커밋 메세지
git push origin js                  푸쉬

git branch                          현재 branch 확인
git 각자 브랜치명                    다시 각자 브랜치로 이동해서 작업
```


### [2] 내용을 정리할 사람

```
1. git checkout js             js branch 에서
2. git checkout -p wfedev js   브랜치명 wfedev 을 가진 사람의 js 폴더만 merge 하기
   git checkout -p hongsu js
   git checkout -p Hong-ki js
   git checkout -p js_dave js
   git checkout -p ColdNight js
   git checkout -p yunseop-dev js
   git checkout -p noderboarder js

3. js branch 에서 '0123' 이라는 날짜별 폴더에
   모두가 공부해온 md 내용을 하나로 합쳐서 커밋!
```

### [3] 내용을 정리한 사람꺼를 받아서 보려면

```
git checkout -p 0123      날짜별 폴더를 받아오면 되는데
                          만약 내용이 안넘어올 경우
git merge js              js branch를 전부 merge 해서 받아옴
```

<br />

---

<br />
<br />
<br />

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
