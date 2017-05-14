function Node(){
	this.value = [];
	this.operator = null;
	this.child = [];
	this.parent = null;
}

function parse_NaN(s1, pointer) {
	var temp = "";
	for (var j in s1){
		if (!Number.isNaN(Number(s1[j]))){
			temp += s1[j]; 
		}
		else if (s1[j] === "("){
			new_node = new Node();
			new_node.parent = pointer;
			pointer.child.push(new_node);
			pointer = new_node;
		}
		else if(s1[j] === ")"){
			if(temp !== ""){
				pointer.value.push(Number(temp));
				temp = "";
			}
			pointer = pointer.parent;
			
		}
		else{
			pointer.operator = s1[j];
		}
	}
	return pointer;
}

 function calculate(n) {
 	if(n.operator === "+")
 		return (Number(n.value[0]) + Number(n.value[1]));
 	else if(n.operator === "-")
 		return (Number(n.value[0]) - Number(n.value[1]));
 	else if(n.operator === "*")
 		return (Number(n.value[0]) * Number(n.value[1]));
 	else
 		return (Number(n.value[0]) / Number(n.value[1]));
 }


function preorder(n) {
	if(n == undefined)
		return;
	
	preorder(n.child[0]);
	preorder(n.child[1]);
	if(n.value.length == 2){
		n.parent.value.push(calculate(n));
		//console.log(calculate(n));
		return;
	} 
}

function interpreter(s){
	var x = s.split(" ");
	var node = new Node();
	var pointer = node;
	node.parent = node;
	var i = 0;
	while(i < x[0].length){
		if(x[0][i] !== "("){
			node.operator = x[0][i];
		}
		i++;
	}
	for (i = 1;i < x.length; i++){
	
		if (Number.isNaN(Number(x[i]))){
			pointer = parse_NaN(x[i], pointer);
		}
		else{
			pointer.value.push(x[i]);
		}
	}
	preorder(node);
	return calculate(node);
}

module.exports = {
	interpreter
}
