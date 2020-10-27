env = document.getElementById('env')
let blocks = [], blox = []
for(i=0;i<9;i++){
    blocks.push(document.getElementById(String(i)))
    if(document.getElementById(String(i).innerHTML) === null)
        blox.push(" ")
    else
        blox.push(document.getElementById(String(i).innerHTML))
}
let originalBlocks = [...blocks], originalBlox = [...blox]


//DECIDING WHO GETS O AND X
let user, comp, turn;
let toss = Math.floor(Math.random()*10)%2
if(toss){
    user = 'X';
    comp = 'O'
}
else{
    user = 'O';
    comp = 'X'
}

info = document.getElementById('info')
info.innerHTML = `User is ${user}, and AI is ${comp}`
//TURN TRUE MEANS COMP PLAYS FIRST, FALSE MEANS USER DOES
toss = Math.floor(Math.random()*10)%2
if(toss){
    turn  = true;
}
else turn = false;


//ACTUAL GAMEPLAY
if(turn){
    console.log("Computer begins first!")
    m = minimax(blox, true)[0]
    blox[m] = comp
    write(blox)
}

function write(blox){
    for(let x in blox){
        blocks[x].innerHTML = blox[x]
        if(blox[x] === user || blox[x] === comp)
            blocks[x].disabled = 'true'
        // else
        //     blocks[x].disabled = 'false'
    }
}


function userInput(x){
    console.log("comes here")
    blox[x] = user;
    write(blox)
    if(checkResult(blox) === 0.5){
        m = minimax(blox, true)[0]
        blox[m] = comp
        write(blox)
        if(checkResult(blox) != 0.5){
            stop(checkResult(blox))
        }
    }
    else
        stop(checkResult(blox, user))
}


//STOPS THE GAME FROM PROGRESSING
function stop(result){
    if(result == -1){
        blocks.forEach(g => {
            g.style.border = "1px solid red";
            g.style.color = "red"
            g.disabled = "true"
        })
        info.innerHTML = "YOU WIN!"
    }
    else if(result == 1){        
        blocks.forEach(g => {
            g.style.border = "1px solid green";
            g.style.color = "green"
            g.disabled = "true"
        })
        info.innerHTML = "AI WINS!"
    }    
    else if(result == 0){        
        blocks.forEach(g => {
            g.style.border = "1px solid grey";
            g.style.color = "grey"
            g.disabled = "true"
        })
        info.innerHTML = "TIE!"
    }
}


//RETURNS WHO WINS IN THE CURRENT ALGORITHM
function checkResult(blox){
    for(let i = 0; i < 3; i++){
        //COLS
        if(blox[i] === blox[i+3] &&  blox[i+3] === blox[i+6]){
            if(blox[i] === user)
                return -1
            else if(blox[i] === comp)
                return +1
        }

        //row
        if(blox[i*3] === blox[i*3+1] &&  blox[i*3+1] === blox[i*3+2]){
            if(blox[i*3] === user)
                return -1
            else if(blox[i*3] === comp)
                return +1
        }
    }

    if(blox[0] === blox[4] &&  blox[4] === blox[8]){
        if(blox[4] === user)
            return -1
        else if(blox[4] === comp)
            return +1
    }

    if(blox[2] === blox[4] &&  blox[4] === blox[6]){
        if(blox[2] === user)
            return -1
        else if(blox[2] === comp)
            return +1
    }

    let done = blox.every(e => {
        if(e === user || e === comp)
            return true;
         return false;
    })
    if(done)
        return 0;
    else
        return 0.5;

}

//RANDOM FUNCTION
function computerOutputRandom(blox){
    done = false
    while(!done){
        x = Math.floor(Math.random()*8)
        if(blox[x] === ' '){
            blox[x] = comp;
            done = true
        } 
    }
    return blox;
}

function minimax(blox, isMax){
   // console.log(`${isMax} + ${blox}`)
    let blockFut = [...blox], values = []
    let bestPlace = -1, bestScore = (isMax)?-Infinity: Infinity;
    for(let i = 0; i < 9; i++){
        if(blockFut[i] == ' '){
            blockFut[i] = isMax?comp:user;
            if(checkResult(blockFut) !== 0.5)
                return [i, checkResult(blockFut)]
            else{
                values.push([i, minimax(blockFut, !isMax)[1]])
                blockFut[i] = ' '
            }
        }
    }
    if(isMax){
        //return values.indexOf(Math.max(values))
        for(let x in values){
            if(values[x][1] > bestScore){
                bestScore = values[x][1]
                bestPlace = values[x][0]
            }
        }
    }
    else{
        //return values.indexOf(Math.min(values))
        for(let x in values){
            if(values[x][1] < bestScore){
                bestScore = values[x][1]
                bestPlace = values[x][0]
            }
        }
    }
    return [bestPlace, bestScore]
}



