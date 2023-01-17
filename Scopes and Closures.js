// Chapter - 1 What is Scope ?

// Compiler Theory
// The compilation process typically will undergo three steps before the code is executed.

// 1. Tokenizing
// Breaking up of strings of characters into meaningfull chunks called Tokens.
// Ex:- var a = 2;
// The above example will broken into var, a, =, 2 and ; tokens

// 2. Parsing
// taking a stream (array) of tokens and turning into a tree of nested elements which repersents 
// the structure of the program, This tree is called Abstract Syntax Tree (AST)

// 3. Code Generation
// The process of taking an AST and turning it into executable code.

// The javascript code has to be compiled just before it is executed (JIT compilation).

// Scopes - Nested Scopes
// Scope is a set or rules that determines where and how a variable can be looked up either in its
// current scope or in any nested scopes its contained within.

// function nested() {
//     function foo(a) {
//         console.log( a );
//         b = 2;
//     }
//     foo( 10 );
// }
// nested()
// console.log(b)

// when the engine reaches b = 2 assignment in function foo it finds there is not b variable declared 
// so scope declares a new variable b in global scope.


// Chapter - 2 Lexical Scope
// Lexical Scope means that scope is defined by author-time decisions of where functions are declared
// There are two predominant models for how scope works.
// 1. Lexical Scope.
// 2. Dynamic Scope.

// function foo(str, a) {
//     eval( str ); // cheating!
//     console.log( a, b );
// }
// var b = 2;
// foo( "var b = 3;", 1 ); // 1, 3

// In the above example the eval function creates a variable b in the scope of foo function which 
// is going to shadow the outer scope variable b.


// Chapter - 3 Functions versus Block Scope

// Chapter - 4 Hoisting
// The variable and function declarations are moved to the top of the code, This phenomenon is Hoisting. 
// But functions are declared first and then variables.

// Chapter - 5 Scope Closure
// Closure is when a function can remember and access its lexical scope even
//  when that function is executing outside its lexical scope.

// for (var i=1; i<=5; i++) {
//     function closure(){
//         var j = i
//         setTimeout( function timer(){
//             console.log( j );
//         }, i*1000 );
//     }
//     closure()
// }

// for (let i=1; i<=5; i++) {
//     setTimeout( function timer(){
//         console.log( i );
//     }, i*1000 );
// }