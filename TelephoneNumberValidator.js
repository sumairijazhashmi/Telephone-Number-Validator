function telephoneCheck(str) {
    let allowedChars = " ()-0123456789";
    let paranthesisStack = [];
    // cannot start with any -
    if(str[0] === "-")
    {
        return false;
    }
    //if (number) return false
    if(str[0] == "(" && str[str.length - 1] == ")" && str.slice(1, str.length - 1).indexOf(")") == -1)
    {
        return false;
    }
    let count = 0;
    for(let i=0; i<str.length; i++)
    {
        // if any non-numeric character or any character apart from space, (, ), - return false
        if(allowedChars.indexOf(str[i]) == -1)
        {
            return false;
        }
        // if there is a ( separating a block, then the block should be separated by ) as well, if not return false
        if(str[i] == "(" && str.slice(i, str.length - 1).indexOf(")") == -1)
        {
            return false;
        }
        // if you start with a ")" and there is no "( before it return false
        if(str[i] == "(")
        {
            paranthesisStack.push("(");
        }
        if(str[i] == ")")
        {
            let res = paranthesisStack.pop();
            if(res != "(")
            {
                return false;
            }
        }
        // count all numbers, they should be either 10 or 11 but not less not more
        if(str[i] != "(" && str[i] != ")" && str[i] != " " && str[i] != "-")
        {
            count++;
        } 
    } 
  
    if(count < 10 || count > 11)
    {
        return false;
    }

    // separate blocks
    let strArray = [];
    let current = "";
    for(let i=0; i<str.length; i++)
    {
        if(str[i] != "-" && str[i] != ")" && str[i] != "(" && str[i] != " ")
        {
            current += str[i];
        }
        else 
        {
            strArray.push(current);
            current = "";
        }
    }
    strArray.push(current);
    strArray = strArray.filter(function(item) {
        if(item == "" || item == undefined)
        {
            return false;
        }
        return true;
    })
    // if no separators then handle string:
    if(strArray.length == 1)
    {
        if(count == 11 && strArray[0][0] != '1')
        {
            return false;
        }
        if(count < 10 || count > 11)
        {
            return false;
        }
        return true;
    }
    // if 4 blocks then 1st block must be 1, otherwise false
    if(strArray.length > 4 || strArray.length < 3)
    {
        return false;
    }
    if(strArray.length == 4)
    {
        if(strArray[0] != "1")
        {
            return false;
        }
        // first char should only be 1 digit long, next 2 should be 3 and the last should be 4 otherwise false
        if(strArray[0].length != 1 || strArray[1].length != 3 || strArray[2].length != 3 || strArray[3].length != 4)
        {
            return false;
        }
    }
    if(strArray.length == 3)
    {
        // first 2 char should only be 3 digit long, and last should be 4 otherwise false
        if(strArray[0].length != 3 || strArray[1].length != 3 || strArray[2].length != 4)
        {
            return false;
        }
    }
    

    
    return true;
      
}

console.log(telephoneCheck("5555555555"));