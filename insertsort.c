/*
알고리즘 설명
1.인덱스1 부터 시작한다. 인덱스0은 이미 정렬된것으로 볼수 있다.
2.현재 삽입될 숫자인 i변째 정술를 key 변수로 복사
3.현재 정렬된 배열은 i-1까지이므로 i-1번쨰 부터 역순으로 조사한다.
4.j값이 음수가 아니어야 되고 key값보다 정렬된 배열에 있는 값이 크면
5.j번째를 j+1번째로 이동한다.
6.j번쨰 정수가 key보다 작으므로 j+1번째가 key값이 들어갈 위치이다.
*/
void insert_sort(int list[],int n){
    int i,j,key;
    for(i=1;i<n;i++){
        key=list[i];
        for(j=i-1;j>=0&&list[j]>key;j--)
            list[j+1]=list[j];
        list[j+1]=key;
    }
}