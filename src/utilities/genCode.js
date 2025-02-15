
const genArray=(code,count)=>{
let s=1;
const arr=[]
while(s<=count){
arr.push(code+s);
s++;
}
return arr;
}

export const genCode= (count, length = 6) => {
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
 
    let code = Array.from({ length }, () => alpha[Math.floor(Math.random() * alpha.length)]).join('');

    let codes= genArray(code,count);
    return [code,...codes]
};


