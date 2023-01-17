// Chapter 1 - TYPES

// In Javascript variables dont have types instead values have type

// 1.1 Data Types of values
// 1. number
// 2. String
// 3. Boolean
// 4. Object
// 5. Undefined
// 6. Symbol
// 7. BigInt
// 8. function


// 1.2 typeof operator returns the type of a variable
// typeof 2  === 'number'               // true
// typeof "2" === 'string'              // true
// typeof true === 'boolean'            // true
// typeof null === 'object'             // true
// typeof undefined === 'undefined'     // true
// typeof Symbol("Basha") === 'symbol'  // true
// typeof { num: 2 } === 'object'       // true
// typeof [1,2,3] === 'object'          // true


// 1.3 Undefined Vs Undeclared
// let a;
// console.log(a)   // here the variable is declared the value is not assigned, So its value is undefined
// consoel.log(b)   // here the variable is undeclared so it throws error of not defined

// typeof not defined variable is also undefined.


// Chapter 2 - VALUES

// 2.1 Arrays
// Arrays have 0 (number) based indexing
// strings can also be added as keys for arrays but it will not affect length of array
// let arr = [1]
// arr["dkjsb"] = 5000
// arr.length === 1        // true
// arr["dkjsb"] === 5000   // true
// But if number is used as string for array indexing then corecion will happen and string will
// be changed to number datatype and it will affect length of array
// arr["55"] = 200
// arr.length === 56 // true as "55" will be coerced to number datatype as 55.


// 2.2 Array-Likes
// Example of arraylike values are {0 : "sdsd", 1 : "scakj"} or a set or a map
// or arguments object inside a function 
// To convert arraylike objects to pure arrays we use Array.from(variablename)

// function foo() {
//     let ss = new Set()
//     ss.add(200)
//     ss.add(500)
//     var arr = Array.from(ss)
//     return arr
// }
// let temp = foo("bar", "baz")
// console.log(temp)


// 2.3 Strings
// string somewhat behave like arrays as Few methods which are in arrays are also used in strings 
// like length, indexOf(), concat() etc but strings are immutable where arrays are mutable.
// but string methods return new strings but where as arrays work in in-place.


// 2.4 Numbers
// Example - 100, 0.25, 5e+10, NaN, Infinity, -Infinity
// Maxumim number = 2^53 -1 = 9007199254740991 = Number.Max_SAFE_INTEGER
// Minimum number = -9007199254740991 = NUmber.MAX_SAFE_INTEGER
// 0.1 + 0.2 === 0.3 will be false as addition of 0.1 and 0.2 will be close to 3.0000000000000004
// NaN === NaN     // false
//Infinity / Infinity = NaN


// 2.5 void
// void keyword will always return undefined value no matter what the value is
// void("dksbc") === undefined     // true
// void (500 - 250) === undefined    // true


// Chapter 3 - NATIVES

// 3.1 The built in Constructors are called Natives in Javascript
// String()
// Number()
// Boolean()
// Array()
// Object()
// Function()
// RegExp()
// Date()
// Error()
// Sumbol()

// let ss = new String("Shaik")  // it is stored as String {0 : "S,"" 1 : "h", 2 : "a", 3 : "i", 4 : "k"}
// typeof ss === "object"  // true

// 3.2 Internal [[Class]]
// Values that are not created from constructors also additionally contains an internal class property

// let arr = [1,2,3] // internal class value is Array
// let str = "Shameer"
// let num = 100

// Object.prototype.toString.call(arr) //  [object Array]
// Object.prototype.toString.call(str) //  [object String]
// Object.prototype.toString.call(num) //  [object Number] etc.

// In most cases the internal class value refers to the built-in native constructor.
// But there are no Null and Undefined built-in constructors but still for null and undefined values the internal class 
// is Null and undefined respectively.

// let aa = null
// Object.prototype.toString.call(aa) // [object Null]
// let ss = undefined
// Object.prototype.toString.call(ss) // [object Undefined]

// Its better to not use Constructors to initialize variables with primitive type values

//let bool = new Boolean(false)

//if(!bool) console.log("print me")
 // this statement will never execute because as we have created a boolean with constructor, the boolean is wrapped by obejct wrapper
 // which is always a true value so it will never execute.

 // To remove object wrapper(unboxing) and get primitive value inside it we can use .valueOf() method
 
//  let str = new String('Shameer')
//  str.valueOf() === "Shameer"  // true

// unboxing can also happen implicitly by coercion

// let a = new String("abc")
// var b = a + ""
// b === "abc"     // true

// 3.3 Natives as Consructors

// 3.3.1 Arrays

// Arrays constructors does not need new keyword infront of it, it behaves same way doesnt care for new keyword

// If the Array constructor get more than 1 arguements it will pass them as agguments into the array
// let arr = Array(1,2,3)
// console.log(arr)  //    [1,2,3]

// but if there is only one arguments then it will be taken as length of the array
// let arr = Array(3)
// console.log(arr)   //   [ <3 empty items> ]


// Chapter 4 - Coercion

// The coversion of a value from one type to another is called as type coercion.

// 4.1 Abstract Operations

// 4.1.1 toString()

// console.log("22" + [1,2,[1,2,4]])    //  221,2,1,2,4
// Arrays get stingified with all its elements and nested array element seperated by ",".
// console.log(typeof 44..toString())  // string
// if the + operator has one operator as number and other as object then they will be coerced to string

// 4.1.2 JSON Stringification
// For most values JSON Stringification behaves same as toString()

// console.log(JSON.stringify(42))      // "42"
// console.log(JSON.stringify("42"))    // ""42"" (a string with a quoted string value in it)
// console.log(JSON.stringify(null))    // "null"
// console.log(JSON.stringify(true))    // "true"

// Only JSON-safe values can be stringified using JSON.stringify()
// Some of the values that are not JSON-safe are undefined, functions, symbols,
// objects with circular referencing.
// JSON.stringify() just automatically omits nonsafe values when it comes across them.
// If a non JSON-safe value is found in an array it will replace with null.
// if any property has a non-safe value to it in a  object that property will be ignored.

// console.log(JSON.stringify(undefined))                      //  undefined
// console.log(JSON.stringify(function () {}))                 //  undefined
// console.log(JSON.stringify([1,undefined, function() {}]))   //  [1,null,null]
// console.log(JSON.stringify({a : 100, b : function() {}}))   //  {a : 100}

// JSON.stringify will throw an error for a circular reference object

// let obj = {
//     a : 100
// }
// obj.b = obj
//console.log(JSON.stringify(obj))  // this will throw an error as obj has circular reference

// let o = {} 
// let a = {
//     b : 42,
//     c: o,
//     d: function() {}
// }
// o.e = a

//console.log(JSON.stringify(a))  // thows error

// If we pass an object to JSON.stringify() which has toJSON() is automatically called
// to coerce the value to be JSON-safe before stringification.

// defining a custom JSON value serialization
// a.toJSON = function() {
//     // if we want only b property to be included in serialization
//     return {b : this.b}
// }

// console.log(JSON.stringify(a))  //  {"b":42}

// the second argument that is passed in JSON.stringify() is called replacer.
// This argument can either be an array or function.

// If replacer is an array it should consists of strings each of which will specify a property name 
// that is allowed to be included in the serialization of the object. If a property exists 
// that isnt in the list, it will be skipped.

// If a replacer is a function, it will be called once for the object itself and then once for
// the each property of the object and each time is passed two arguments, key and value.
// To skip a key in the serialization return undefined. Otherwise return the value provided.

// var a = {
//     b: 42,
//     c: "42",
//     d: [1,2,undefined]
// }
// console.log(JSON.stringify(a, ["b","c"]))      //  {"b":42,"c":"42"}
// console.log(JSON.stringify(a, function(k, v){ if(k !== "c") return v }))   // {"b":42,"d":[1,2,null]}

// here Stringification is recursive so the array has values 1,2,undefined passed as v and indexes 
// 0,1,2 as k, so the undefined value is replaced by null.

// there is a third argument option in JSON.stringify() called space which is used for
// indentation, space can be positive integer or a string.

// var a = {
//     b: 42,
//     c: "42",
//     d: [1,2,3]
// }
// console.log(JSON.stringify(a))
// console.log(JSON.stringify(a, null, 5))
// console.log(JSON.stringify(a, null, "-----"))


// 4.1.3 ToNumber

// If any non number value is used in a mathematical operation that it requires it to be a number, the ToNumber()
// abstract operation is used

// console.log(Number(true))         //    1
// console.log(Number(false))        //    0
// console.log(Number(undefined))    //    NaN
// console.log(Number(null))         //    0
// console.log(Number("+524dkjf"))   //    NaN

// If there are object they will be first converted to primitive values equivalent by ToPrimitive() abstract operation 
// and resulting value will be coerced to number according to the ToNumber().

// ToPrimitive will check the value if it has a valueOf() method, if this method returns a primitive value,
// then that value is used for coercion. If not, toString() will provide value for the coercion if present.
// If neither opoerations can provide a primitive value a TypeError is thrown.

// let a = {
//     valueOf : function() {
//         return "42"
//     }
// }
// let b = {
//     toString : function(){
//         return "42"
//     }
// }
// let c = {
//     toString : function(){
//         return "200"
//     },
//     valueOf : function() {
//         return "100"
//     }
// }
// let d = {
//     valueOf : function() {
//         return "100"
//     },
//     toString : function(){
//         return "200"
//     }
// }
// console.log(Number(a))       //  42
// console.log(Number(b))       //  42
// console.log(Number(c))       //  100
// console.log(Number(d))       //  100
// console.log(Number(""))      //  0
// console.log(Number([]))      //  0
// console.log(Number("abc"))   //  NaN

// In the c and d objects it is evident that first to convert it to a primitive first valueOf() method is called,
// if valueOf()  doesnt exist then toString() will be called. If both doesnt exist it will return NaN.


// 4.1.4 ToBoolean

// Falsy values
// All of javascript values can be divided into two categories
// 1. Values that will become false when coerced to boolean, they are called falsy values.
// 2. Everything else which will coerce to true.

// Falsy Values
// undefined
// null
// false
// +0, -0 and NaN
// ""

// console.log(Boolean("false" && "0" && "''"))  // true as strings are not falsy except empty strings.
//console.log(Boolean({} && [] && function(){}))  // true as they are not in falsy values list mentioned.


// 4.2 Explicit Coercion 
// coercion intentionally by the developer 

// 4.2.1 Strings <---> Numbers 

// let a = 42
// let b = String(a)
// console.log(b)   // "42"
// typeof b === 'string'    // true

// let c = "3.14"
// let d = +c
// + is a unary operator here which converts values to number types.
// console.log(d)   // 3.14

// 4.2.2 Date ---> Number
// Another common usage of + unary operator is to coerce a date object to a number

// let d = new Date("Wed, 19 Oct 2022 02:42:06 PM")
// let timestamp = new Date()
// console.log(+timestamp)
// console.log(+d)  // 1666170726000

// let tts = new Date().getTime()
// let ts = Date.now()
// console.log(ts)

// "~" operator (bitwise NOT)

// let x = 100
// console.log(~x === -(x+1))  // true
// when indexOf() method is used on a string to find the substring index in it, it returns the index if present
// else it will return -1

// let str = "Shaik Shameer"
// console.log(str.indexOf("hamee"))  // 7
// console.log(str.indexOf("djkf"))   // -1
// console.log(~-1 === 0)  // true

// when we use "~" operator on -1 value it will be coerced to falsy value as it will be -(-1+1) = -0 
// So if we use this in idexOf() method we can coerce the return value -1 to falsy value 0.

// if(!~str.indexOf("dfbdks")){
//     console.log("Not Found")
// }


// Parsing non-strings
// For parsing a string to a numeric value parseInt should be used.
// If a numeric value is used for parsing then parseInt will first convert it to a string i.e, toString() method
// will be called on it and the the parsing continues.


// let a = {
//     num : 21,
//     toString : function() {
//         return String(this.num * 2)
//     }
// }
// console.log(parseInt(a))  // 42


//console.log(parseInt(1/0, 19))  // 18
// now why is the above statement is parsing to 18 ?????
// as the above input is a numberic value which is Infinity, toString() method will be called on it which will
// convert it to "Infinity"
// Now for base - 19 the valid numeric charecters are 0 - 9 and a - i(case insensitive).
// So the starting character "I" in Inifnity has the value 18 in base-19, so it will be converted to 18 and when the
// next letter n is eccountered there is no n character in base-19 so parsing will stop and 
// the parseInt method will return value 18. 

// some other examples
// let x = 0.0000008
// console.log(parseInt(x))  //  8
//x will be converted to exponential form "8e-7" as string then 8 will be coerced and when e is read if returns 8.


// NonBoolean ---> Boolean
// All the falsy values will get coerced to false
// and remaining all non falsy value will get coerced to true.


// 4.1 Implict Coercion 
// coercion occuring by JS itslef 
// let a = 42
// let b = a + ""
// typeof b === 'string'    // true
// this conversion occuring due to the + operation combined with any one operand being string
// will result in string concactenation.

// console.log({a : 100} + "22")        //  [object Object]22
// console.log(undefined + "22")        //  undefined22
// console.log("22" + null)             //  22null

// 4.1.1 Strings <---> Numbers
// + operator is used to serve the purpose of numbers addition, string cocatenation, change value type to number by coercion etc

// let a = "42"
// let b = "0"
// console.log(a+b)  // 420

// let c = 42
// let d = 0
// console.log(c+d)  // 42

// It is partially true that if any one operand in + operation is string then it will reuslt in string conatenantion

// let a = [1,2]
// let b = [3,4]

// here anyone of the operand is not a string but it will result in string cocatenantion
// because a & b are object, if + operator recieves an object as operand first it will call valueOf() method on it 
// if it will return a number value and other object also returns a number value then addition of both those numbers 
// will be done, but if the object doesnt return any value then toString() method will be called on it and string will be
// returned which will result in string concatenation.

// console.log(a+b)   // "1,23,4"

// let a = [] + {}

// console.log(a) // "[object Object]" 
// here [] is a object so valueOf() doesnt return anything, tostring() on it will return empty string ""
// and when toString() is called on {}, it will return [object Object] which will result in 
// "" + "[object Object]"  = "[object Object]" 

// {} + []  // when this is executed empty curly braces will be treated as empty JS expression which will be ignored
// and will be left with + [] , so we know that + operator is also used to convert to a value to number type
// so [] will be coverted to "" as toString will be called on it and "" is a falsy value which will be coerced to 0.

// let a = {
//     valueOf : function() {return "42"},
//     toString : function() {return 4}
// }
// console.log(a + "")     // "42"
// console.log(String(a))  // "4"

// when a object is Explicitly convert to string then the internal toString() will be called on it.


// But when other operators like - , * , / is used then again valueOf() will be called on non number value if it returns number 
// value then operation will  continue, if valueOf() returns string it will try to convert string to number if it is converted
// then operation will continue else it will result in NaN, if valueOf() doesnt return anything then toString() will be called
// and if the return value can be converted to number type then operation will continue else results in NaN.

// let a = "3.15"
// let b = 0
// let c = {a : 100}
// let d = {
//     valueOf : function() {return "2"}
// }

// console.log(a - b)  // "3.15" will be coerced to 3.15 number type
// console.log(a - c)  // NaN is returned as object doesnt return a number value valueOf() & toString() is called.
// console.log(a - d)  // 1.15 as d object returns "2" when valueOf() is called then "3.15" and "2" will be
// // converted to number types

// 4.1.2 ---> Boolean

// few of the expressions operations which require a boolean coercion
// 1. if(...) statement
// 2. for(let i = 0; i < 10; i++) in loops the condiditional statement requires boolean coercion, here i < 10.
// 3. while(...) loop
// 4. Ternary operators
// 5. == && === operators

// any values which are used in above contexts will be coerced to boolean values either true ot false

// let a = 42
// let b = "abc"
// let c = null
// if(a)  console.log(true)                       // true
// b ? console.log(true) : console.log(false)     // true
// console.log(a === 42 && b === "abc")              // true

// but || and && operator behaves differently in javascript
// The || operator returns leftside operand if it is a truthy value
// else it returns rightside operand.
// The && operator returns the value of the first falsy operand encountered when evaluating
// from left to right, or the value of the last operand if they are all truthy

// console.log(a || b)  // 42  ===  a ? a : b
// console.log(a && b)  // "abc" === a ? b : a
// console.log(c || b)  // "abc" === c ? c : b
// console.log(c && b)  // null === c ? b : c


// 4.1.3 Symbol coercion

// Explicit coercion of symbol to string is allowed but implicit coercion is disallowed and throws error
// let s = Symbol("Shaik")
// console.log(String(s))  // Symbol(Shaik)
// console.log(s + "")  // throws error

// Symbols cannot be coerced neither explicitly not implicity to a number type
// but they can be coerced to boolean type both implcitly and explicitly and results in always true.


// 4.1.4 Loose Equals (==) versus Strict Equals (===)
// A common misconception is that == checks for values for equality and === checks for both values and types for equality
// but the correct description is == allows coercion in the equality and === disallows coercion.

// let a = 42
// let b = "42"

// console.log(a === b)  // false as no coercion is allowed and 42 and "42" are not same
// console.log(a == b)  // true as coercion is allowed but which operand will get coerced, here "42" will get coerced.

// If the value on leftside has number type and rightside value has string type then the rightside value which is string
// will get coerced to number
// but if lefside value is string and rightside value is a number then leftside value will get coerced as number.

// 4.1.4 Comparing anything to boolean

// let a = "42"
// let b = true
// console.log(a == b) // false
// // when anything is campared to a booelan using == operator the boolean value will get coerced to number
// // so they will get cconverted to "42" == 1 then again string value get coerced to number 
// // so 42 == 1 will result in false


// 4.1.5 Comparing nulls to undefined
// when null and undefined are compared no matter which side the operands are they always result in true
// console.log(null == undefined)  // true
// console.log(undefined == null)  // true

// 4.1.6 Comparing objects to Non Objects
// If any object/function/array is compared to a simple primitive value  then first the object will try to get
// changed to primitive value

// let a = 42
// let b = [42]

//console.log(a == b) // true
// b will return "42" as valueOf() doesnt return anything and tostring() will return "42" therefore it will lead to 42 == "42"
// which will then "42" will get coerced to 42, so 42 == 42 will return true

// let a = 42
// let b = String(42)
// console.log(a == b) // true as valueOf() method on b will return 42

// but if we create object using null and undefined its not possible as they have no object wrapper equivalent
// so it will always return false and NaN will be never equals to itslef.


// Edge Cases
// Avoid modification in the builtin constructors prototype because it will lead to inconsistency and many errors in the code
// Number.prototype.valueOf = function() {
//     return 3
// }
// let a = new Number(2)
// console.log(a == 2)  // false as a needs to get coverted to primitive, valueOf() will be called and it will return 3
// // So 3 == 2 is false

// Falsy comparisions
// "0" == null         // false as "0" will be coerced to 0 and 0 is not equal to null
// "0" == undefined    // false
// "0" == false        // true because boolean false will get coerced to number 0 and then string "0" will get coverted to number 0
// "0" == NaN          // false as nothing is equals to NaN, not even itself
// "0" == 0            // true
// "0" == ""           // false as they both are strings and no coercion happens

// false == null       // false
// false == undefined  // false
// false == NaN        // false
// false == 0          // true as boolean false coerces to 0
// false == ""         // true as false coerces to 0 and "" coerces to number 0
// false == []         // true as valueOf() doesnt return anything and toString() returns "" which will then coerces to 0.
// false == {}         // false as toString() of {} returns [object Object] 

// "" == null          // false
// "" == undefined     // false
// "" == NaN           // false
// "" == 0             // true
// "" == []            // true
// "" == {}            // false

// 0 == null           // false
// 0 == undefined      // false
// 0 == NaN            // false
//               // true
// 0 == {}             // false

// console.log([] == ![])  // true
// in the above statement before euality check is done the ! unary operator tries to coerce [] to a boolean value
// so as [] is not a falsy value it will get coerced to true and then false because of ! operator, and then 
// get coerced to 0 as boolean gets coerced to number in equality check, now the left operator gets converted to ""
// and then to 0, so 0 == 0 is true.

// console.log(2 == [2])      // true
// console.log("" == [null])  // true
// console.log(![null].toString()) // true as toString() on [null] will get coerced to "" then to false and !false is true.


// Abstract Relational Comparision
// Abstract Relational Comparision algorithm divides itself into two parts
// 1. If comparision involves both string values, or anthing else
// The algorithm is only defined for a < b, So a > b is handled as b < a.
// It retuns undefined if any of the operand is NaN

// The algorithm first calls Toprimitive coercion on both values and if either of the values doesnt return string, then
// both are coerced to numbers and compared.

// let a = [42]
// let b = ["43"]

// console.log(a < b)  // true as value of a return "42" and b returns "43", now as both are strings they get compared lexographically
// 4 is equal to 4, it moves to next letters 2 < 3 is true sp returns true
// console.log(b < a)  // false

// let a = {b: 42}
// let b = {b : 43}

// console.log(a < b)    // false  
// console.log(a == b)   // false
// console.log(a > b)    // false

// console.log(a <= b)   // true
// console.log(a >= b)   // true

// As per specification for a <= b, it will treat it as !(a > b) then check is b < a which is false and negation will return true
// same fpr a >= b, it will be treated as !(a < b), a < b is false then negation will return true


// Chapter 5 - Grammar
// 5.1 Statements and Expressions
// let a = 3 * 6
// let b = a
// b

// In the above code 3 * 6 is an expression (evaluates to value 18), but a on the second line is also expression. as is b on the third
// line, the expressions all evaluates to a value which will be stored in the variables.
// Each of those three lines are called statements, containing exxpressions. var a = 3 * 6, var b = a are called declaration statements
// a = 3 * 6, b = a without let are called assignment expressions.
// The third line which just contains b expression is also a statement all by itself, it is called expression statement


// 5.2 Statament Completion Values
// In Javascript all statements have completion values(even if the value is just undefined)
// when we type var a = 18, 18 value will be assigned to a and var statament itslef results in undefined value because var
// statements are declared that way in the specifications. (refer ES5 section 12.2 "Variable Statement")

// if we type var a = 42 and run the program it results in undefined.
// it results in the completion value of the last statement executed in the browser

// var b
// if(true) b = 4 + 38
// in the above statements the browser will return value 42 as 42 is the completion value of the last statement of the if block.

// 5.3 Expression Side Effects
// Most expressions dont have side effects 
// let a = 2
// let b = a + 3
// The expression  a + 3 did not change the value of the a variable, it only adds value of a and 3 and store in b.

// let a = 42
// let b = a++
// console.log(a)     // 43
// console.llog(b)    // 42

// In the above expression b = a++, a++ is having effect on the a variable itself. The ++ operator first returns the value of the a
// then it changes the value of a itslef by increment by one.

// ++a++ is not a legal syntax, it will throw reference error as first a++ part is evaluated due to operator precedence which 
// returns the value 42 then ++42 is not a valid expression as it cannot directly increment on a number.

// let obj = {
//     a: 42
// }
// when we use delete operator on objects or object likes, the delete operator will result in true if operation is valid
// and in false or error otherwise
// console.log(delete obj.a)  // true as a property exists in obj, but side effect is it removes a property from obj.

// 5.4 Contextual rules

// 5.4.1 Curly Braces
// The two main purpose of the curly barces is first used in an object literal 

// let a = {
//     foo: bar()
// }

// we know that above statement is a object literal as {..} is a value assigning to a variable.

// 5.4.2 Lables

// {foo : bar()}
// this is just a normal code block as we use in a if statement or in while or for loop.

// So the syntax foo : bar() is a valid one which are called labelled statements. foo is a label for bar() statament.
// labelled stataments can be used with break and continue statements

// loop1 : for(let i = 0; i < 10; i++){
//     loop2 : for(let j = 1; j < 10; j++){
//         if(j === 2){
//             continue loop1
//         }
//         console.log(j)
//     }
// }

// In the above code we used loop1 label for outer loop and loop2 lable for inner loop, we are going back to the outer loop (loop1)
// if the value of j inside inner loop (loop2) is 2. So labels can be used as goto stataemnts with break and continue statements.

// function foo() {
//     bar : {
//         console.log("hello")
//         break bar
//         console.log("Dont print me")
//     }
//     console.log("World")
// }

// foo()  // prints hello and world
// so break can also be used in non loop statements.

// 5.4.3 Blocks

// [] + {}    // "[object Object]"
// {} + []    // 0

// In the first statement it will result in "[object Object]"
// but the second statement is executed the {} at the start is considered as block statement and as it is empty it does nothing
// then in + [], + will be treated as unary operator and connvrt it to a number value which is 0.


// 5.5 Object Destructuring
// let obj = {
//     a : 42,
//     b: "foo"
// }

// let {a,b} = obj
// console.log(a,b)  // 42 and "foo"

// It can also be used for named function arguments

// function foo({a, b, c}){
//     console.log(a,b,c)
// }
// foo({c: [1,2,3], a: 42, b: "foo"})  // 42, :"foo", [1,2,3]


// 5.6 Operator Precedence
// let a = 42, b
// b = (a++, a)
// console.log(a) // 43
// console.log(b) // 43

// but if we remove ( ) from b = (a++, a) then
// let a = 42, b
// b = a++, a
// console.log(a) // 43
// console.log(b) // 42

// b has value 42 because , operator has lower precedence than = operator
// So it will be interpreted as (b = a++),  a

// if(str && (matches = trivia)) {

//}

// In the above code () around matches = trivia is necessary, because without it it will
// interpret as (str && matches) = trivia 


// let a = 42
// let b = "foo"
// let c = [1,2,3]

// console.log(a && b || c ? c || b ? a : c && b : a)   // 42

// The && operator is evaluated first then || operator


// 5.7 Short Circuited

// For && and || operators, the rightside operand will not be evaluated, if the leftside 
// operand is sufficient to determine the outcome of the operation.

// For example in a && b, b is not evaluated if a is falsy, because the result of && operation
// is certain, Likewise in a || b, if a is truthy b will not be checked

// function doSomething(obj) {
//     if(obj && obj.cool){

//     }
// }
// when obj is evaluated first if obj is undefined or has a falsy value then it will not check for
// obj.cool which will throw error( if obj is not object), so && will act as guard to remove error.

// 5.8 Associavity

// The && and || operators bind first and then ? : operator

// a && b && c will be treated as (a && b) && c, same for || operator.

// a ? b : c ? d : e will be treated as a ? b : (c ? d : e)

// ? : is right associative. 
// console.log(true ? false : (true ? true : true)) // false

// let a = b = c = 20
// above stataement is also right associative as 20 is assigned to c first then to b and to a.

// 5.9 Automatic Semicolon
// ASI (Automatic Semicolon Insertion) is when JS assumes a ; in certain places in program
// even it is not there.
// Semicolons are not inserted in the middle of a line.

// 5.10 Errors
// There are different subtypes of errors in javascript
// TypeError, ReferenceError, SyntaxError etc and grammar also defines certain errors to be 
// enforced at compile time as compared to all others that happen during runtime.

// 5.11 Function Arguments

// let b = 10

// function foo(a = 100, b = a + b + 20){
//     console.log(a,b)
// }
// foo()
// In the above function arguments b references in temporal dead zone, it does not refer to
// the outer variablr b.

// function foo(a = 42, b = a  + 1){
//     console.log(a,b)
// }

// foo()                // 42 43
// foo(undefined)       // 42 43
// foo(void 0, 7)       // 42  7
// foo(null)            // null  1

// function foo( a = 42, b = a + 1 ) {
//     console.log(
//     arguments.length, a, b,
//     arguments[0], arguments[1]
//     );
// }
// foo();                   // 0 42 43 undefined undefined
// foo( 10 );               // 1 10 11 10 undefined
// foo( 10, undefined );    // 2 10 11 10 undefined
// foo( 10, null );         // 2 10 null 10 null


// function foo(a) {
//     a = 42;
//     console.log( arguments[0] );
// }
// foo( 2 );     // 42 (linked)
// foo();        // undefined (not linked)
// when an argument is passed the argument slot and the named variable are linked to have
// always the same value. If no arguments is passed, no linkage exists. but in strict mode
// the linkage doesnt exist regardless.


// 5.12 try..finally

// function foo() {
//     try{
//         return 42
//     }finally{
//         console.log("Hello")
//     }
//     console.log("never runs")
// }
// console.log(foo())   //   Hello 42

// the code in the finally clause always runs no matter what,and it always runs after try
// (and catch if present) before any other code runs    
// the return value sets to 42 when try clause is executed, then finally clasue is executed.
// then the foo function returns the value 42 to execute.

// Same behaviour for throw in try clause


// function foo() {
//     try{
//         throw 42
//     }finally{
//         console.log("Hello")
//     }
//     console.log("never runs")
// }
// console.log(foo())

// but if an exception is thrown inside a finally clause it will override as primary completion
// of the function. and even if there is return value, it will be abondened.
// function foo() {
//     try {
//         return 42;
//     }
//     finally {
//         throw "Oops!";
//     }
//     console.log( "never runs" );
// }
// console.log( foo() );

// Other control statements like break and continue will exhibit similar behaviour to
// return and throw.
// for (var i=0; i<10; i++) {
//     try {
//         continue;
//     }
//     finally {
//         console.log( i );
//     }
// }
// 0 1 2 3 4 5 6 7 8 9

// A return inside a finally clause has the special ability to override a  previous return from
// try or catch clause, but only if return is explicitly called.

// function foo() {
//     try {
//         return 42;
//     }
//     finally {
//         // no `return ..` here, so no override
//     }
// }
// foo() // 42

// function bar() {
//     try {
//         return 42;
//     }
//     finally {
//     // override previous `return 42`
//         return;
//     }
// }
// bar() // undefined

// function baz() {
//     try {
//         return 42;
//     }
//     finally {
//         // override previous `return 42`
//         return "Hello";
//     }
// }
// baz() // "Hello"

// finally can also be used with labeled break

// function foo() {
//     bar: {
//         try {
//             return 42;
//         }
//         finally {
//             // break out of `bar` labeled block
//             break bar;
//         }
//     }
//     console.log( "Crazy" );
//     return "Hello";
// }
// console.log( foo() );  // Crazy Hello
// In the above function when break bar label is executed inside finally, it break out of bar 
// and ignores the return value of 42 inside try and starts executing the code after bar label.

// 5.13 switch
// It is the short form of if..elseif..else chain

// switch(a) {
//     case 2: 
//         console.log(2)
//         break
//     case 42: 
//         console.log(42)
//         break
//     default:
//         console.log("default")
// }
// In the switch, a is evaluated then matches the value with all the cases, if match is found
// it will start executing the code untill  return is reached or the end of switch block.
// The matching happens in case is identical to === operator.


// case clause can also evaluate expressions in it
// var a = "42";
// switch (true) {
//     case a == 10:
//         console.log( "10 or '10'" );
//         break;
//     case a == 42:
//         console.log( "42 or '42'" );
//         break;
//     default:
// never gets here
// }
// 42 or '42'
// since 42 =="42" is true it matches with switch and executes it and it will only work if
// the case expression evaluates strictly to true and not for all truthy values.

// var a = 10;
// switch (a) {
//     case 1:
//     case 2:
//         // never gets here
//     default:
//         console.log( "default" );
//     case 3:
//         console.log( "3" );
//         break;
//     case 4:
//         console.log( "4" );
// }
// "default" "3" is printed  and break inside a case clause can also be labelled.


