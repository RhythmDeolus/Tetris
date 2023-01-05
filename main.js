canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.setLineDash([5, 3]);
display = document.getElementById("display");
debugger;
gameDim = [10,24];
borderSize = 2;
blockWidth = (canvas.height/gameDim[1]);
startPos = (canvas.width - ((blockWidth)*gameDim[0]))/2;
blockWidth2 = (startPos/7);
startPos2 =(canvas.width + ((blockWidth)*gameDim[0]))/2;
borderSize2 = blockWidth2/blockWidth*borderSize;
destroyArr = [];
tempObj = [];
tempi = 0;
holdObj = 0;
score = 0;
l = 20;
r = 0;
r2 = 0;
holdvalue = true;
let dir = 0;
let downdir = 0;
let standBy = false;
display.innerHTML = "Score : " + score;
let getColor = function(num){
	if(num - Math.floor(num) != 0){
		num = num - Math.floor(num);
		while(num.toFixed(5) - Math.floor(num.toFixed(5)) != 0){
			num *= 10;
		}
		return +num.toFixed(5);
	}
	else{
		return num - 1;
	}
}
colors = ["blue", "red", "yellow", "magenta", "green", "orange", "cyan"]
function mainCreate(){
	let i = 0;
	let temp = []
	while(i < (gameDim[0])*gameDim[1]){
		temp.push(0);
		i++;
	}
	return temp;
}
function mainDraw(arr){
	let i = 0;
	ctx.strokeStyle = "grey";
	for(let i = 0; i < gameDim[0] - 1; i++){
		ctx.beginPath();
		ctx.moveTo(startPos + (i+1)*blockWidth,0);
		ctx.lineTo(startPos + (i+1)*blockWidth, gameDim[1]*blockWidth);
		ctx.stroke();
	}
	for(let i = 0; i < gameDim[1] - 1; i++){
		ctx.beginPath();
		ctx.moveTo(startPos, (i+1)*blockWidth);
		ctx.lineTo(startPos + gameDim[0]*blockWidth, (i+1)*blockWidth);
		ctx.stroke();
	}
	ctx.strokeStyle = "black";
	while(i < gameDim[1]){
		let j = 0;
		while(j < gameDim[0]){
			if(arr[i*gameDim[0] + j] != 0){
				drawPixl([j, i], colors[getColor(arr[i*gameDim[0] + j])]);
			}
			j++;
		}
		i++;
	}
	for(let k = 0; k < tempObj.length - 1; k++){
		ctx.fillStyle = "white";
		ctx.fillRect(startPos2 + blockWidth2, blockWidth2*(6*k +0.5), 5*blockWidth2, 5*blockWidth2);
		ctx.fillStyle = "black";
	}
	ctx.strokeStyle = "grey";
	for(let i = 0; i < 4; i++){
		ctx.beginPath();
		ctx.moveTo(startPos2 + (i+2)*blockWidth2, 0);
		ctx.lineTo(startPos2 + (i+2)*blockWidth2, gameDim[1]*blockWidth2);
		ctx.stroke();
	}
	for(let i = 0; i < 4*(tempObj.length - 1); i++){
		ctx.beginPath();
		ctx.moveTo(startPos2, (1.5  + i + 2*Math.floor((i/(tempObj.length-1))))*blockWidth2);
		ctx.lineTo(startPos2 + 6*blockWidth, (1.5  + i + 2*Math.floor((i/(tempObj.length-1))))*blockWidth2);
		ctx.stroke();
	}
	ctx.clearRect((startPos - 5*blockWidth2)/2, (gameDim[1]*blockWidth - 5*blockWidth2)/2,
				5*blockWidth2, 5*blockWidth2);
	for(let i = 0; i < 4; i++){
		ctx.beginPath();
		ctx.moveTo((startPos - 5*blockWidth2)/2 + (i+1)*blockWidth2, (gameDim[1]*blockWidth - 5*blockWidth2)/2);
		ctx.lineTo((startPos - 5*blockWidth2)/2 + (i+1)*blockWidth2, (gameDim[1]*blockWidth + 5*blockWidth2)/2);
		ctx.stroke();
	}
	for(let i = 0; i < 4; i++){
		ctx.beginPath();
		ctx.moveTo((startPos - 5*blockWidth2)/2 , (gameDim[1]*blockWidth - 5*blockWidth2)/2 + (i+1)*blockWidth2);
		ctx.lineTo((startPos + 5*blockWidth2)/2 , (gameDim[1]*blockWidth - 5*blockWidth2)/2 + (i+1)*blockWidth2);
		ctx.stroke();
	}
	ctx.strokeStyle = "black";
	for(let k = 0; k < tempObj.length - 1; k++){
		let i = 0;
		while(i < tempObj[(tempi + k)%tempObj.length].dim[0]){
			let j = 0;
			while(j < tempObj[(tempi + k)%tempObj.length].dim[1]){
				if(tempObj[(tempi + k)%tempObj.length].main[i*tempObj[(tempi + k)%tempObj.length].dim[1] + j]){
					drawPixl([1 + Math.floor((5 - tempObj[(tempi + k)%tempObj.length].dim[1])/2) + j, 6*k + 0.5 + Math.floor((5 - tempObj[(tempi + k)%tempObj.length].dim[0])/2) +  i],
					tempObj[(tempi + k)%tempObj.length].color, blockWidth2, borderSize2, startPos2);
				}
				j++;
			}
			i++;
		}
	}
	if(holdObj){
		let i = 0;
		while(i < holdObj.dim[0]){
			let j = 0;
			while(j < holdObj.dim[1]){
				if(holdObj.main[i*holdObj.dim[1] + j]){
					drawPixl([1 + Math.floor((5 - holdObj.dim[1])/2) + j,(gameDim[1] - 5)/2 + Math.floor((5 - holdObj.dim[0])/2) +  i],
					holdObj.color, blockWidth2, borderSize2, 0);
				}
				j++;
			}
			i++;
		}
	}
}
mainBody = mainCreate();
function drawPixl(arr,color, width = blockWidth, bordsize = borderSize, startP = startPos){
	if(color != "white"){
		ctx.fillStyle = "black";
	}
	else{
		ctx.fillStyle = "grey";
	}
	ctx.fillRect(startP + (arr[0]*width), arr[1]*width, width, width);
	ctx.fillStyle = color;
	ctx.fillRect(startP + (arr[0]*width) + bordsize,(arr[1]*width) + bordsize,
				 width - 2*bordsize,width - 2*bordsize);
	ctx.fillStyle = "rgb(229, 231, 234)";
	ctx.fillRect(startP + (arr[0]*width) + 3/2*bordsize, (arr[1]*width) + 3/2*bordsize, 3*bordsize, 3*bordsize);
	ctx.fillRect(startP + (arr[0]*width) + 9/2*bordsize, (arr[1]*width) + 9/2*bordsize, 3/2*bordsize, 3/2*bordsize);
	ctx.fillStyle = color;
	ctx.fillRect(startP + (arr[0]*width) + 3/2*bordsize, (arr[1]*width) + 3/2*bordsize, 3/2*bordsize, 3/2*bordsize);
	ctx.fillStyle = "black";
}
objects = {
	square(){
		return {
			main  : [1,1,1,1],
			dim : [2,2],
			pos : [gameDim[0]/2 -2,0],
			color : "blue",
		}
	},
	rect(){
		return {
			main : [1.1,1.1,1.1,1.1],
			dim : [1,4],
			pos : [gameDim[0]/2,0],
			color : "red",
		}
	},
	rightL(){
		return {
			main : [1.2,0,1.2,0,1.2,1.2],
			dim : [3, 2],
			pos : [gameDim[0]/2 -2,0],
			color : "yellow",
		}
	},
	leftL(){
		return {
			main : [0,1.3,0,1.3,1.3,1.3],
			dim : [3, 2],
			pos : [gameDim[0]/2 -2,0],
			color : "magenta",
		}
	},
	onlyT(){
		return {
			main : [1.4,1.4,1.4,0,1.4,0],
			dim : [2, 3],
			pos : [gameDim[0]/2 - 1,0],
			color : "green",
		}
	},
	leftZ(){
		return {
			main : [1.5,1.5,0,0,1.5,1.5],
			dim : [2, 3],
			pos : [gameDim[0]/2 - 1,0],
			color : "orange",
		}
	},
	rightZ(){
		return {
			main : [0,1.6,1.6,1.6,1.6,0],
			dim : [2, 3],
			pos : [gameDim[0]/2 - 1,0],
			color : "cyan",
		}
	},
	draw(givenObj, color = ""){
		if(!color){
			color = givenObj.color;
		}
		if(givenObj != null){
		let i = 0;
		while(i < givenObj.dim[0]){
			let j = 0;
			while(j < givenObj.dim[1]){
				if(givenObj.main[i*givenObj.dim[1] + j]){
					drawPixl([givenObj.pos[0] + j, givenObj.pos[1] +  i], color);
				}
				j++;
			}
			i++;
		}
		}
	},
}
function rotate(obj){
	let temp = [obj.dim[1], obj.dim[0]];
	let temp2 = obj.dim;
	let temp3 = obj.main;
	obj.dim = temp;
	temp = []
	let i = 0;
	while(i < obj.dim[0]){
		let j = 0;
		while(j < obj.dim[1]){
			temp.push(obj.main[obj.dim[0] - 1 - i + obj.dim[0]*j]);
			j++;
		}
		i++;
	}
	obj.main = temp;
	if(obj.pos[0] + obj.dim[1] > gameDim[0]){
		obj.pos[0] = gameDim[0] - obj.dim[1];
	}
	i = 0;
	while(i < obj.dim[0]){
		let j = 0;
		while(j < obj.dim[1]){
			if(obj.main[i*obj.dim[1] + j] != 0){
				if(mainBody[obj.pos[0] + j + (obj.pos[1] + i )*gameDim[0]] != 0){
					obj.main = temp3;
					obj.dim = temp2;
					return null;
				}
			}
			j++;
		}
		i++;
	}
	return null;
}
function clear(){
	ctx.fillStyle = "grey";
	ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.fillRect(0,0, startPos, canvas.height);
	ctx.fillRect((blockWidth)*gameDim[0] + startPos, 0, canvas.width, canvas.height);
}
var currentObj = choose();
document.addEventListener("keydown", function(event){
	if(currentObj != null){
	if(event.key == "ArrowLeft" && currentObj.pos[0] >= 0){
		dir = -1;
	}
	else if(event.key == "ArrowRight" && currentObj.pos[0] <= gameDim[0]){
		dir = 1;
	}
	else{
		dir  = 0;
	}
	if(event.key == "ArrowDown" && currentObj.pos[1] + currentObj.dim[0] < gameDim[1]){
		downdir	= 1;
	}
	if(event.key == "ArrowUp"){
		rotate(currentObj);
	}
	}
});
document.addEventListener("keypress", function(event){
	if(event.key == " " && currentObj){
		while(true){
			if(check(currentObj) == "false"){
				currentObj.pos[1]++;
			}
			else{
				let i = 0;
				while(i < currentObj.dim[0]){
					let j = 0;
					while(j < currentObj.dim[1]){
						if(currentObj.main[i*currentObj.dim[1] + j] != 0){
							mainBody[currentObj.pos[0] + j + (currentObj.pos[1] + i )*gameDim[0]] =
								currentObj.main[i*currentObj.dim[1] + j];
						}
						j++;
					}
					i++;
				}
				if(currentObj.pos[1] > 1){
					currentObj = choose();
				}
				else{
					currentObj = null;
				}
				check2();
				break;
			}
		}
	}
	if(event.key == "ArrowLeft" && currentObj.pos[0] > 0){
		currentObj.pos[0]--;
		r2 = 0;
	}
	if(event.key == "ArrowRight" && currentObj.pos[0] + currentObj.dim[1] <= gameDim[0]){
		currentObj.pos[0]++;
		r2 = 0;
	}
	if(event.key == "c" && holdvalue){
		let something = currentObj;
		if(!holdObj){
			holdObj = currentObj;
			currentObj = choose();
			holdObj.pos[1] = 0;
		}
		else{
			currentObj = holdObj;
			holdObj = something;
			holdObj.pos[1] = 0;
		}
		holdvalue = false;
	}
});
document.addEventListener("keyup", function(event){
	if(event.key == "ArrowLeft"){
		dir = 0;
	}
	else if(event.key == "ArrowRight"){
		dir = 0;
	}
	if(event.key == "ArrowDown"){
		downdir = 0;
	}
})
function print(){
	clear();
	mainDraw(mainBody);
	objects.draw(currentObj);
	if(check(currentObj) != "false"){
		let i = 0;
		while(i < currentObj.dim[0]){
			let j = 0;
			while(j < currentObj.dim[1]){
				if(currentObj.main[i*currentObj.dim[1] + j] != 0){
					mainBody[currentObj.pos[0] + j + (currentObj.pos[1] + i )*gameDim[0]] =
						currentObj.main[i*currentObj.dim[1] + j];
				}
				j++;
			}
			i++;
		}
		currentObj = choose();
	}
}
function check(obj){
	if(obj != null){
	if(obj.pos[1] + obj.dim[0] == gameDim[1]){
		return "first";
	}
	obj.pos[1]++;
	let i = 0;
	while(i < obj.dim[0]){
		let j = 0;
		while(j < obj.dim[1]){
			if(obj.main[i*obj.dim[1] + j] != 0){
				if(mainBody[obj.pos[0] + j + (obj.pos[1] + i )*gameDim[0]] != 0){
					obj.pos[1]--;
					return "second";
				}
			}
			j++;
		}
		i++;
	}
	obj.pos[1]--;
	return "false";
	}
	else{
		return "false";
	}
}
function inside(item, arr){
	let i = 0;
	while(i < arr.length){
		if(arr[i] == item){
			return true;
		}
		i++;
	}
	return false;
}
function destroy(arr){
	let temp = [];
	let i = 0;
	while(i < arr.length*gameDim[0]){
		temp.push(0);
		i++;
	}
	i = 0;
	while(i < mainBody.length){
		if(!inside(Math.floor(i/gameDim[0]),arr)){
			temp.push(mainBody[i]);
		}
		i++;
	}
	if(arr.length == 1){
		score += 40;
	}
	else if(arr.length == 2){
		score += 100;
	}
	else if(arr.length == 3){
		score += 300;
	}
	else if(arr.length == 4){
		score += 1200;
	}
	display.innerHTML = "Score : " + score;
	mainBody = temp;
}
function check2(){
	let i = 0;
	let temp = [];
	while(i < gameDim[1]){
		let j = 0;
		while(j < gameDim[0]){
			if(mainBody[i*gameDim[0] + j] == 0){
				break;
			}
			if(j == gameDim[0] -1){
				temp.push(i);
			}
			j++;
		}
		i++;
	}
	if(temp != 0){
		destroyArr = temp;
		standBy = true;
	}
}
function choose(){
	let z = 0;
	if(tempObj.length == 0){
		z = 5
	}
	else{
		let i = Math.floor(Math.random()*7);
		switch(i){
			case 0:
				tempObj[(tempi + tempObj.length - 1 )%tempObj.length] = objects.square();
				break;
			case 1:
				tempObj[(tempi + tempObj.length - 1 )%tempObj.length] = objects.rect();
				break;
			case 2:
				tempObj[(tempi + tempObj.length - 1 )%tempObj.length] = objects.leftL();
				break;
			case 3:
				tempObj[(tempi + tempObj.length - 1 )%tempObj.length] = objects.rightL();
				break;
			case 4:
				tempObj[(tempi + tempObj.length - 1 )%tempObj.length] = objects.onlyT();
				break;
			case 5:
				tempObj[(tempi + tempObj.length - 1 )%tempObj.length] = objects.rightZ();
				break;
			case 6:
				tempObj[(tempi + tempObj.length - 1 )%tempObj.length] = objects.leftZ();
				break;
			default:
				break;
		}
	}
	for(let j = 0; j < z; j++){
		let i = Math.floor(Math.random()*7);
		switch(i){
			case 0:
				tempObj.push(objects.square());
				break;
			case 1:
				tempObj.push(objects.rect());
				break;
			case 2:
				tempObj.push(objects.leftL());
				break;
			case 3:
				tempObj.push(objects.rightL());
				break;
			case 4:
				tempObj.push(objects.onlyT());
				break;
			case 5:
				tempObj.push(objects.rightZ());
				break;
			case 6:
				tempObj.push(objects.leftZ());
				break;
			default:
				break;
		}
	}
	holdvalue = true;
	let something = tempi;
	tempi++;
	tempi %= tempObj.length;
	return tempObj[something];
}
function gameOver(){
	ctx.font = "80px Arial";
	ctx.fillStyle = "red";
	let textbox = ctx.measureText(`GAME OVER`);
	ctx.fillText("GAME OVER",canvas.width/2 - textbox.width/2,canvas.height/2 - 30);
}
mainLoop = setInterval(function(){
	if(!standBy){
	if( (((check(currentObj) == "first" && r == 0) || (check(currentObj) == "second" && r == 0)))&&
		check(currentObj) != "false" ){
		let i = 0;
		while(i < currentObj.dim[0]){
			let j = 0;
			while(j < currentObj.dim[1]){
				if(currentObj.main[i*currentObj.dim[1] + j] != 0){
					mainBody[currentObj.pos[0] + j + (currentObj.pos[1] + i )*gameDim[0]] =
						currentObj.main[i*currentObj.dim[1] + j];
				}
				j++;
			}
			i++;
		}
		if(currentObj.pos[1] > 1){
			currentObj = choose();
		}
		else{
			currentObj = null;
		}
		check2();
	}
	else if(currentObj == null){
		gameOver();
	}
	else{
		if(r == 0){
			currentObj.pos[1]++;
		}
		else{
			if(currentObj.pos[1] + currentObj.dim[0] < gameDim[1] && check(currentObj) == "false"){
				currentObj.pos[1] += downdir;
			}
		}
		r++;
		r %= l;
		r2++;
		r2 %= 2;
		if(dir < 0 && currentObj.pos[0] <= 0){
		}
		else if(dir >= 0 && currentObj.pos[0] + currentObj.dim[1] >= gameDim[0]){
		}
		else if(r2 == 1){
			currentObj.pos[0] += dir;
			let i = 0;
			while(i < currentObj.dim[0]){
				let j = 0;
				while(j < currentObj.dim[1]){
					if(currentObj.main[i*currentObj.dim[1] + j] != 0){
						if(mainBody[currentObj.pos[0] + j + (currentObj.pos[1] + i )*gameDim[0]] != 0){
							currentObj.pos[0] -= dir;
							i = currentObj.dim[0];
							j = currentObj.dim[1];
						}
					}
					j++;
				}
				i++;
			}
		}
	}
	if(currentObj){
		clear();
		mainDraw(mainBody);
		let ij = currentObj.pos[1];
		while(true){
			if(check(currentObj) == "false"){
				currentObj.pos[1]++;
			}
			else{
				objects.draw(currentObj, "white");
				currentObj.pos[1] = ij;
				break;
			}
		}
		objects.draw(currentObj);
	}
	}
	else{
		let i = 0;
		while(mainBody[i + destroyArr[0]*gameDim[0]] == 0 && i < gameDim[0] ){
			i++;
		}
		if(i == gameDim[0]){
			destroy(destroyArr);
			standBy = false;
		}
		else{
			for(let item of destroyArr){
				mainBody[item*gameDim[0] + i] = 0;
			}
		}
		clear();
		mainDraw(mainBody);
	}
},1000/l);