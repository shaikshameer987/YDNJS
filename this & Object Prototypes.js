// Chapter - 1 this

// function foo(num) {
//     console.log( "foo: " + num );
//     // keep track of how many times `foo` is called
//     this.count++;
// }
// foo.count = 0;

// var i;

// for (i=0; i<10; i++) {
//     if (i > 5) {
//         foo( i );
//     }
// }

// console.log(foo.count) // 0 because this.count inside foo was not refering it to foo function itlsef.4

// Another variation
// function foo(num) {
//     console.log( "foo: " + num );
//     // keep track of how many times `foo` is called
//     // Note: `this` IS actually `foo` now, based on
//     // how `foo` is called (see below)
//     this.count++;
// }
// foo.count = 0;
// var i;
// for (i=0; i<10; i++) {
//     if (i > 5) {
//     // using `call(..)`, we ensure the `this`
//     // points at the function object (`foo`) itself
//         foo.call( foo, i ); // explicit binding
//     }
// }

// console.log( foo.count ); // 4


// function foo() {
//     var a = 2;
//     this.bar();
// }
// function bar() {
//     console.log( this.a );
// }
// foo();  // undefined

// Chapter - 2 this makes sense now

// 1. Default Binding 

// function foo() {
//     console.log( this.a );
// }
// var a = 2;

// foo(); // 2

// As the foo function is called from global scope, this inside foo function will have default binding
// to window object in which a was declared, as global window has a variable, this.a will refer to
// that variable.

// 2. Implicit Binding

// function foo() {
//     console.log( this.a );
// }
// var obj = {
//     a: 2,
//     foo: foo
// };
// obj.foo(); // 2
// Here obj object conatins the reference to the foo function at the time foo is called.


// Only the top/last level of an object property reference chain matters
// to the call-site. For instance:

// function foo() {
//     console.log( this.a );
// }

// var obj2 = {
//     a: 42,
//     foo: foo
// };

// var obj1 = {
//     a: 2,
//     obj2: obj2
// };

// obj1.obj2.foo(); // 42


// function foo() {
//     console.log( this.a );
// }

// var obj = {
//     a: 2,
//     foo: foo
// };

// var bar = obj.foo; // here the bar variable is just referencing the foo function as it is not called.

// var a = "oops, global"; // `a` also property on global object
// bar(); // "oops, global" // As bar was just referencing to the foo function and foo function has 
// default binding to window object and as window object conatins a variable,
// this.a will reference to this variable


// 3. Hard Binding

// function foo() {
//     console.log( this.a );
// }

// var obj = {
//     a: 2
// };

// var bar = function() {
//     foo.call( obj );
// };
    
// bar(); // 2
    
// bar.call( window ); // 2

// We create a function bar() which, internally, manually calls foo.call(obj), thereby forcibly invoking
// foo with obj binding for this. No matter how you later invoke the function bar, it will always
//  manually invoke foo with obj. This binding is both explicit and strong, so we call it hard binding.


// function foo(something) {
//     console.log( this.a, something );
//     return this.a + something;
// }

// var obj = {
//     a: 2
// };

// var bar = function() {
//     return foo.apply( obj, arguments );
// };

// var b = bar( 3 ); // 2 3
// console.log( b ); // 5


// Since hard binding is such a common pattern, it’s provided with a builtin utility as of ES5,
// Function.prototype.bind, and it’s used like this:

// function foo(something) {
//     console.log( this.a, something );
//     return this.a + something;
// }

// var obj = {
//     a: 2
// };

// var bar = foo.bind( obj );
// var b = bar( 3 ); // 2 3
// console.log( b ); // 5

// bind(..) returns a new function that is hardcoded to call the original function
// with the this context set as you specified.

// function foo(el) {
//     console.log( el, this.id );
// }

// var obj = {
//     id: "awesome"
// };

// let arr = [1,2,3]
// // use `obj` as `this` for `foo(..)` calls
// arr.forEach( foo, obj ); // 1 awesome 2 awesome 3 awesome


// 4. new Binding

// In JS, constructors are just functions that happen to be called with the new operator in front of them.

// function foo(a) {
//     this.a = a;
// }

// var bar = new foo( 2 );
// console.log( bar.a ); // 2

// By calling foo(..) with new in front of it, we’ve constructed a new object and set
//  that new object as the this for the call of foo(..). So new is the final way that a function
//  call’s this can be bound. We’ll call this new binding.


// Which is more precedent, implicit binding or explicit binding? Let’s test it:

// function foo() {
//     console.log( this.a );
// }

// var obj1 = {
//     a: 2,
//     foo: foo
// };

// var obj2 = {
//     a: 3,
//     foo: foo
// };

// obj1.foo(); // 2
// obj2.foo(); // 3

// obj1.foo.call( obj2 ); // 3
// obj2.foo.call( obj1 ); // 2

// So, explicit binding takes precedence over implicit binding, which means you should ask first
// if explicit binding applies before checking for implicit binding.

// Now, we just need to figure out where new binding fits in the precedence:

// function foo(something) {
//     this.a = something;
// }

// var obj1 = {
//     foo: foo
// };

// var obj2 = {};

// obj1.foo( 2 );
// console.log( obj1.a ); // 2

// obj1.foo.call( obj2, 3 );
// console.log( obj2.a ); // 3

// var bar = new obj1.foo( 4 );
// console.log( obj1.a ); // 2
// console.log( bar.a ); // 4

// new binding is more precedent than implicit binding.

// But do you think new binding is more or less precedent than hard binding?

// function foo(something) {
//     this.a = something;
// }

// var obj1 = {};
// var bar = foo.bind( obj1 );

// bar( 2 );
// console.log( obj1.a ); // 2

// var baz = new bar( 3 );
// console.log( obj1.a ); // 2
// console.log( baz.a ); // 3

// new binding more precedent to hard binding.

// Determining this

// Now, we can summarize the rules for determining this from a function call’s call-site,
//  in their order of precedence. Ask these questions in this order, and stop when the first rule applies.

// 1. Is the function called with new (new binding)? If so, this is the newly constructed object.

// var bar = new foo()

// 2. Is the function called with call or apply (explicit binding), even hidden inside a bind hard binding?
//  If so, this is the explicitly specified object.

// var bar = foo.call( obj2 )

// 3. Is the function called with a context (implicit binding), otherwise known as an owning or
//  containing object? If so, this is that context object.

// var bar = obj1.foo()

// 4. Otherwise, default the this (default binding). If in strict mode, pick undefined, otherwise
// pick the global object.

// var bar = foo()

// If you pass null or undefined as a this binding parameter to call, apply, or bind,
// those values are effectively ignored, and instead the default binding rule applies to the invocation:

// function foo() {
//     console.log( this.a );
// }

// var a = 2;
// foo.call( null ); // 2


// Lexical this

// function foo() {
//     // return an arrow function
//     return (a) => {
//         // `this` here is lexically inherited from `foo()`
//         console.log( this.a );
//     };
// }

// var obj1 = {
//     a: 2
// };

// var obj2 = {
//     a: 3
// };

// var bar = foo.call( obj1 );
// bar.call( obj2 ); // 2, not 3!


// function foo() {
//     setTimeout(() => {
//         // `this` here is lexically inherited from `foo()`
//         console.log( this.a );
//     },100);
// }

// var obj = {
//     a: 2
// };
    
// foo.call( obj ); // 2


// Chapter - 3 Objects

// Objects can be created by 2 ways

// 1. By declarative literal
// let a = {
//     b: 2
// }

// 2. By constructors
// let a = new Object()

// let obj = {
//     num: 100
// }

// console.log(obj == 100)

// let num = new Number(100)

// console.log(typeof(num)) // object

// console.log(num === 100) // true

// to access object properties we have two methods

// let obj = {
//     a: 100
// }

// 1 - dot notation obj.a
// 2 - obj["a"]

// we use more offently dot notation but by using obj[".."]
//we can access any utf-8 compatible property of an object

// let obj = {
//     "Super-Fun!" : 100
// }

// console.log(obj.Super-Fun!) // this will throw error, sp here we use
//console.log(obj["Super-Fun!"])

// if we use any other datatype instead of string as property key of object
// first it will be converted to string and then it will be stored.

// var prefix = "foo";
// var myObject = {
//     [prefix + "bar"]: "hello",
//     [prefix + "baz"]: "world"
// };
// myObject["foobar"]; // hello
// myObject["foobaz"]; // world

// Arrays

// var myArray = [ "foo", 42, "bar" ];
// myArray.baz = "baz";
// myArray.length; // 3
// myArray.baz; // "baz"

// var myArray = [ "foo", 42, "bar" ];
// myArray["3"] = "baz";
// myArray.length; // 4
// myArray[3]; // "baz"

// Objects Property Descriptors

// var myObject = {
//     a: 2
// };

// console.log(Object.getOwnPropertyDescriptor( myObject, "a" ));
// {
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true
// }

// we can use Object.defineProperty(..) to add a new property, or modify an existing
// one (if it’s configurable!), with the desired characteristics.

// var myObject = {};
// Object.defineProperty( myObject, "a", {
//     value: 2,
//     writable: true,
//     configurable: true,
//     enumerable: true
// });
// myObject.a; // 2

// Writable - The ability for you to change the value of a property is controlled by writable.

// var myObject = {};
// Object.defineProperty( myObject, "a", {
//     value: 2,
//     writable: false, // not writable!
//     configurable: true,
//     enumerable: true
// });
// myObject.a = 3;
// myObject.a; // 2

//As you can see, our modification of the value silently failed. If we try in strict mode, we get an error:
// "use strict";
// var myObject = {};
// Object.defineProperty( myObject, "a", {
//     value: 2,
//     writable: false, // not writable!
//     configurable: true,
//     enumerable: true
// } );

// myObject.a = 3; // TypeError
// The TypeError tells us we cannot change a nonwritable property.

// Configurable - As long as a property is currently configurable, we can modify its descriptor
// definition, using the same defineProperty(..) utility:

// var myObject = {
//     a: 2
// };

// myObject.a = 3;
// myObject.a; // 3
// Object.defineProperty( myObject, "a", {
//     value: 4,
//     writable: true,
//     configurable: false, // not configurable!
//     enumerable: true
// } );

// myObject.a; // 4
// myObject.a = 5;
// myObject.a; // 5

// Object.defineProperty( myObject, "a", {
//     value: 6,
//     writable: true,
//     configurable: true,
//     enumerable: true
// } ); // TypeError

// The final defineProperty(..) call results in a TypeError, regardless of strict mode, if you attempt
// to change the descriptor definition of a nonconfigurable property. Be careful: as you can see, changing
// configurable to false is a one-way action, and cannot be undone!

// we also cannot able to delete a property of object if it is non-configurable.


// Enumerable

// The name probably makes it obvious, but this characteristic controls whether a property will show up
// in certain object-property enumerations, such as the for..in loop. Set enumerable to false to keep the
// property from showing up in such enumerations, even though it’s still completely accessible.
// Set it to true to include the property in enumerations.

// var myObject = {};

// Object.defineProperty(
//     myObject,
//     "a",
//     // make `a` enumerable, as normal
//     { enumerable: true, value: 2 }
// );

// Object.defineProperty(
//     myObject,
//     "b",
//     // make `b` NON-enumerable
//     { enumerable: false, value: 3 }
// );

// myObject.b; // 3

// console.log("b" in myObject); // true
// myObject.hasOwnProperty( "b" ); // true

// for (var k in myObject) {
//     console.log( k, myObject[k] );
// }
// // "a" 2

// You’ll notice that myObject.b in fact exists and has an accessible value, but it doesn’t show up in a
// for..in loop (though, surprisingly, it is revealed by the in operator existence check). That’s because
// “enumerable” basically means “will be included if the object’s properties are iterated through.”

// var myObject = { };
//     Object.defineProperty(
//     myObject,
//     "a",
//     // make `a` enumerable, as normal
//     { enumerable: true, value: 2 }
// );

// Object.defineProperty(
//     myObject,
//     "b",
//     // make `b` nonenumerable
//     { enumerable: false, value: 3 }
// );

// myObject.propertyIsEnumerable( "a" ); // true
// myObject.propertyIsEnumerable( "b" ); // false
// Object.keys( myObject ); // ["a"]
// Object.getOwnPropertyNames( myObject ); // ["a", "b"]

// propertyIsEnumerable(..) tests whether the given property name exists directly on the object
// and is also enumerable:true.

// Object.keys(..) returns an array of all enumerable properties,
//whereas Object.getOwnPropertyNames(..) returns an array of all properties, enumerable or not.

// Whereas in versus hasOwnProperty(..) differ in whether they consult the [[Prototype]] chain or not,
// Object.keys(..) and Object.getOwnPropertyNames(..) both inspect only the direct object specified.


// Immutability

// It’s important to note that all of these approaches create shallow immutability. That is, they affect
// only the object and its direct property characteristics. If an object has a reference to another object
// (array, object, function, etc.), the contents of that object are not affected and remain mutable:

// Object constant

// By combining writable:false and configurable:false, you can essentially create a constant
//  (cannot be changed, redefined, or deleted) as an object property, like:

// var myObject = {};

// Object.defineProperty( myObject, "FAVORITE_NUMBER", {
//     value: 42,
//     writable: false,
//     configurable: false
// } );

// Prevent extensions

// If you want to prevent an object from having new properties added to it, but otherwise leave the rest
// of the object’s properties alone, call Object.preventExtensions(..):

// var myObject = {
//     a: 2
// };

// Object.preventExtensions( myObject );

// myObject.b = 3;
// myObject.b; // undefined

// In non-strict mode, the creation of b fails silently. In strict mode, it throws a TypeError.

// Seal

// Object.seal(..) creates a “sealed” object, which means it takes an existing object and essentially calls
// Object.preventExtensions(..) on it, but also marks all its existing properties as configurable:false.
// So, not only can you not add any more properties, but you also cannot reconfigure or delete any existing
// properties (though you can still modify their values).


// Freeze

// Object.freeze(..) creates a frozen object, which means it takes an existing object and essentially calls
// Object.seal(..) on it, but it also marks all “data accessor” properties as writable:false, so that their
// values cannot be changed. This approach is the highest level of immutability that you can attain for an
// object itself, as it prevents any changes to the object or to any of its direct properties (though, as
// mentioned earlier, the contents of any referenced other objects are unaffected).

// You could “deep freeze” an object by calling Object.freeze(..) on the object, and then recursively
// iterating over all objects it references (which would have been unaffected thus far), and calling
// Object.freeze(..) on them as well. Be careful, though, as that could affect other (shared) objects
// you’re not intending to affect.

// Getters and Setters

// The default [[Put]] and [[Get]] operations for objects completely control how values are set to existing
// or new properties, or retrieved from existing properties, respectively.

// When you define a property to have either a getter or a setter or both, its definition becomes an
// “accessor descriptor” (as opposed to a “data descriptor”). For accessor desciptors, the value and
// writable characteristics of the descriptor are moot and ignored, and instead JS considers the set and get
// characteristics of the property (as well as configurable and enumerable).

// var myObject = {
//     // define a getter for `a`
//     get a() {
//         return 2;
//     }
// };

// Object.defineProperty(
//     myObject, // target
//     "b", // property name
//     { // descriptor
//     // define a getter for `b`
//     get: function(){ return this.a * 2 },
//     // make sure `b` shows up as an object property
//     enumerable: true
//     }
// );

// myObject.a; // 2
// myObject.b; // 4

// Either through object-literal syntax with get a() { .. } or through explicit definition with
// defineProperty(..), in both cases we created a property on the object that actually doesn’t hold a value,
// but whose access automatically results in a hidden function call to the getter function, with whatever
// value it returns being the result of the property access:

// var myObject = {
//     // define a getter for `a`
//     get a() {
//         return 2;
//     }
// };

// myObject.a = 3;
// myObject.a; // 2


// Since we only defined a getter for a, if we try to set the value of a later, the set operation won’t throw
// an error but will just silently throw the assignment away. Even if there was a valid setter, our custom
// getter is hardcoded to return only 2, so the set operation would be moot. To make this scenario more
// sensible, properties should also be defined with setters, which override the default [[Put]] operation
// (aka assignment),per-property, just as you’d expect. You will almost certainly want to always declare both
// getter and setter (having only one or the other often leads to unexpected/surprising behavior):

// var myObject = {
// // define a getter for `a`
//     get a() {
//         return this._a_;
//     },
//     // define a setter for `a`
//     set a(val) {
//         this._a_ = val * 2;
//     }
// };

// myObject.a = 2;
// console.log(myObject.a); // 4


// Existence
// We showed earlier that a property access like myObject.a may result in an undefined value if either the
// explicit undefined is stored there or the a property doesn’t exist at all. So, if the value is the same
// in both cases, how else do we distinguish them?

// We can ask an object if it has a certain property without asking to get that property’s value:

// var myObject = {
//     a: 2
// };

// console.log("a" in myObject); // true
// console.log("b" in myObject); // false

// myObject.hasOwnProperty( "a" ); // true
// myObject.hasOwnProperty( "b" ); // false

// The in operator will check to see if the property is in the object, or if it exists at any higher level
// of the [[Prototype]] chain object traversal By contrast, hasOwnProperty(..) checks to see if only myObject
// has the property or not, and will not consult the [[Prototype]] chain.

// But it’s possible to create an object that does not link to Object.prototype
// (via Object.create(null)—see Chapter 5). In this case, a method call like myOb
// ject.hasOwnProperty(..) would fail.

// In that scenario, a more robust way of performing such a check is
//Object.prototype.hasOwnProperty.call(myObject,"a"), which borrows the base hasOwnProperty(..) method and
// uses explicit binding to apply it against our myObject.


// Chapter - 4 Mixing Up Class Objects



