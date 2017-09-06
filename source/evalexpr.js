'use strict';

Array.prototype.clean = function (deleteValue) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

var parser = {
    priorities: [
        {
            sign: ")",
            val: 0
        },
        {
            sign: "(",
            val: 1
        },
        {
            sign: "+",
            val: 2
        },
        {
            sign: "-",
            val: 2
        },
        {
            sign: "*",
            val: 3
        },
        {
            sign: "/",
            val: 3
        },
        {
            sign: "@",
            val: 4
        }],
    add: function (str) {

        /*if(!this.isValid(str)){
            return undefined;
        }*/
        //delete whitespace
        if(!isNaN(+str))
            return +str;
        var result = "";
        for (var i = 0; i < str.length; i++) {
            if (str[i] !== ' ') {
                result += str[i];
            }
        }
        if(!this.isValid(result)){
            return undefined;
        }
        //replace to unarnyi minus
        var tempRes = "";
        if (result[0] === '-') {
            tempRes += '@';
        } else {
            tempRes += result[0];
        }
        for (var i = 1; i < result.length; i++) {
            if (result[i] == '-') {
                if (isNaN(+result[i - 1])) {
                    if (result[i - 1] != ')') {
                        tempRes += "@";
                    } else {
                        tempRes += result[i];
                    }
                } else {
                    tempRes += result[i];
                }
            } else {
                tempRes += result[i];
            }
        }
        result = tempRes;


        var separators = "@*/-+()";
        tempRes = "";

        //add whitespace for split;
        for (var i = 0; i < result.length; i++) {
            if (separators.indexOf(result[i]) != -1) {
                tempRes += ' ' + result[i] + ' ';
            } else {
                tempRes += result[i];
            }
        }
        result = tempRes;
        var mathArray = result.split(' ');
        mathArray.clean("");

        //приводимо до типу {type:[opetation/digit], val: value}
        var mathString = [];
        for (var i = 0; i < mathArray.length; i++) {
            if (separators.indexOf(mathArray[i]) != -1) {
                mathString.push({
                    type: "operation",
                    val: mathArray[i]
                });
            } else {
                mathString.push({
                    type: "digit",
                    val: mathArray[i]
                });
            }
        }
        //poliz creator
        var stack = [];
        var outPut = [];
        while (mathString.length > 0) {
            var item = mathString.shift();
            if (item.type == "digit")
                outPut.push(item);
            else {
                if (stack.length == 0 || item.val=='(')
                    stack.push(item);
                else {
                    if (item.val=='/'&&stack[stack.length-1].val=='/'){
                        outPut.push(item);
                        continue;
                    }
                    while ((stack.length > 0) && (this.getPriority(item.val) < this.getPriority(stack[stack.length - 1].val))) {
                        if ((stack[stack.length - 1].val == '(') && (item.val == ')')) {
                            stack.pop();
                            break;
                        }
                        outPut.push(stack.pop());
                    }

                    if (item.val != ')') {
                        stack.push(item);
                    }
                }
            }
        }
        if (stack.length > 0) {
            while (stack.length > 0) {
                outPut.push(stack.pop());
            }
        }
        stack = [];
        while(outPut.length>0){
            if (outPut[0].type=='digit')
                stack.push(outPut.shift());
            else{
                if (outPut[0].val=="@"){
                    var temp = stack.pop();
                    var tempVal = +temp.val;
                    tempVal = -tempVal;
                    temp.val=tempVal;
                    stack.push(temp);
                }else if(outPut[0].val=="+"){
                    var temp1 = stack.pop();
                    var temp2 = stack.pop();
                    var tempVal1 = +temp1.val;
                    var tempVal2 = +temp2.val;
                    var res = tempVal1+tempVal2;
                    stack.push({type:"digit", val:res});
                }else if(outPut[0].val=="-"){
                    var temp1 = stack.pop();
                    var temp2 = stack.pop();
                    var tempVal1 = +temp1.val;
                    var tempVal2 = +temp2.val;
                    var res = tempVal2 - tempVal1;
                    stack.push({type:"digit", val:res});
                }else if(outPut[0].val=="*"){
                    var temp1 = stack.pop();
                    var temp2 = stack.pop();
                    var tempVal1 = +temp1.val;
                    var tempVal2 = +temp2.val;
                    var res = tempVal1*tempVal2;
                    stack.push({type:"digit", val:res});
                }else if(outPut[0].val=="/"){
                    var temp1 = stack.pop();
                    var temp2 = stack.pop();
                    var tempVal1 = +temp1.val;
                    var tempVal2 = +temp2.val;
                    var res = tempVal2 / tempVal1;
                    stack.push({type:"digit", val:res});
                }
                outPut.shift();
            }
        }
        var result = Math.round(stack.pop().val*100)/100;
        return result;
    },

    getPriority: function (sign) {
        return this.priorities.find(o => o.sign == sign).val;
    },

    isValid: function(str){
        if (!isNaN(+str))
            return true;
        var k=0;
        var allowSymbol = "1234567890.()/*-+";
        for(var i=0;i<str.length;i++){
            if(str[i]=='(')
                k++;
            else if (str[i]==')')
                k--;
            else{
                if (allowSymbol.indexOf(str[i])==-1)
                    return false;
            }
        }
        if(k==0)
            return true;
    }
};

module.exports=parser;