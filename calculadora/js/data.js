function takeValue(x) {
    if (document.getElementById('screen').value.length == 0 && (x == "+" || x == "/" || x == "*")) {
        document.getElementById('screen').value = "";
    } else {
        if (document.getElementById('screen').value == 0 || document.getElementById('screen').value == "E") {
            document.getElementById('screen').value = "";
            document.getElementById('screen').value += x;
        } else {
            document.getElementById('screen').value += x;
        }
    }
}

function clearInput() {
    document.getElementById('screen').value = "";
}

function result() {
    res = document.getElementById("screen").value;
    let error = checkerrors(res);
    if (error == true) {
        document.getElementById("screen").value = "E"
    } else {
        let r = calculate(res);
        document.getElementById("screen").value = r;
    }
}

function checkerrors(characters) {
    let res = false;
    for (let i = 0; i < characters.length && res != true; i++) {
        if (isNaN(parseInt(characters[i])) && isNaN(parseInt(characters[i + 1]))) {
            res = true;
        }
    }
    if (characters[characters.length - 1 == NaN]) {
        res = true;
    }
    return res;
}

//no se como hacerlo en dos funciones pues tendria que devolver numbers y operators...
function calculate(string) {
    //primero hago un split para crear un array con todos los elementos separados uno a uno 
    //y lo guardo en el array chars 
    let chars = string.split("");
    let numbers = [];
    let operators = [];
    let index = 0;
    let lastop = true;
    numbers[index] = "";
    //separo los numeros y los signos en dos arrays distintos
    for (let i = 0; i < chars.length; i++) {
        //si char en la posicion[i] no es un numero y lastop es false
        if (i != 0 && isNaN(parseInt(chars[i]))) {
            operators[index] = chars[i];
            index++;
            numbers[index] = "";
            lastop = true;
        } else {
            numbers[index] += chars[i];
            lastop = false;
        }
    }
    //convierto el primer elemento del array numbers a float
    string = parseFloat(numbers[0]);
    for (let j = 0; j < operators.length; j++) {
        let num = parseFloat(numbers[j + 1]);
        //evaluo cada uno de los operadores  del array operators y voy cogiendo el residuo
        // de la ultima operacion(string) y haciendo la operacion necesarea(operator[j]) con el numero siguiente(num)
        switch (operators[j]) {
            case "+":
                string = string + num;
                break;
            case "-":
                string = string - num;
                break;
            case "*":
                string = string * num;
                break;
            case "/":
                string = string / num;
                break;
        }
    }
    return string;
}