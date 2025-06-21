let boxes=document.querySelectorAll(".box")
let turn0 = true;
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
const winPatterns=[
    [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]
];
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        console.log("box was clicked");
        if(turn0){
            box.innerText="0"
            turn0 = false;
        }
        else{
            box.innerText="X"
            turn0 = true;
        }
        check();
    });
});
const showWinner=(winner)=>{
    msg.innerText=`Congartulation , Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const check = () => {
    for(let pattern of winPatterns){
    let pos1Val=boxes[pattern[0]].innerText;
    let pos2Val=boxes[pattern[1]].innerText;
    let pos3Val=boxes[pattern[2]].innerText;
    if(pos1Val !=""&&pos2Val !=""&&pos3Val !="" ){
        if(pos1Val==pos2Val && pos2Val==pos3Val){
            console.log("winner")
            showWinner(pos1Val);
        }
    }
    }
};
