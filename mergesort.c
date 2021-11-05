#define MAX_SIZE 10  

int sorted[MAX_SIZE];
void merge(int list[],int left,int mid,int right){

    
    int i,j,k,l;
    i=left;
    j=mid+1;
    k=left;
    /*분할 정렬된 list의 합병 정렬*/
    while(i<mid&&j<=right){
        if(list[i]<=list[j]){
            sorted[k++]=list[i++];
        }
        else{
            sorted[k++]=list[j++];
        }
    if(i>mid)
        for(l=i;l<=right;l++)
        sorted[k++]=list[l];
    for(l=left;l<=right;l++){
        list[l]=sorted[l];
    }
   
    }
    
}

 void merge_sort(int list[],int left,int right){
     int mid;
     if(left<right){
         mid=(left+right)/2;
         merge_sort(list,left,mid);
         merge_sort(list,mid+1,right);
         merge(list,left,mid,right);
     }
 }