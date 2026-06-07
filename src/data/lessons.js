// All Rust lessons from basic to advanced
// Each lesson has: id, title, emoji, description, content blocks, and quizzes

const lessons = [
  // ─────────────────────────────────────────
  // LESSON 1 — What is Rust?
  // ─────────────────────────────────────────
  {
    id: 1,
    title: 'What is Rust?',
    emoji: '🦀',
    description: 'Discover what Rust is, why it exists, and what makes it special.',
    content: [
      {
        type: 'text',
        text: 'Rust is a **systems programming language** focused on safety, speed, and concurrency. It was created by Graydon Hoare at Mozilla Research in 2010 and has since grown into one of the most loved languages by developers worldwide.',
      },
      {
        type: 'text',
        text: 'Before Rust, systems programming meant making a hard choice between **control** (languages like C and C++) and **safety** (languages with garbage collection). Rust gives you both — low-level control over memory and fearless concurrency, all checked at compile time.',
      },
      {
        type: 'heading',
        text: 'Zero-Cost Abstractions',
      },
      {
        type: 'text',
        text: "Rust provides high-level abstractions like closures, iterators, and generics that compile down to code as efficient as hand-written low-level code. You don't pay at runtime for features you don't use — this is called **zero-cost abstraction**.",
      },
      {
        type: 'code',
        code: `fn main() {
    println!("Hello, Rust! 🦀");
    let x = 42;
    println!("x = {x}");
}`,
      },
      {
        type: 'heading',
        text: 'Key Benefits',
      },
      {
        type: 'text',
        text: "**Memory safety without a garbage collector** — Rust's ownership system guarantees memory safety at compile time. No null pointer dereferences, no dangling pointers, no buffer overflows.",
      },
      {
        type: 'text',
        text: "**Fearless concurrency** — Rust's type system catches data races at compile time. If your code compiles, it's free of data races.",
      },
      {
        type: 'text',
        text: '**Excellent tooling** — Cargo (package manager), rustfmt (formatter), clippy (linter), and amazing documentation with the Rust Book.',
      },
      {
        type: 'tip',
        text: 'Rust has been voted the "most loved language" on Stack Overflow surveys for multiple years running. It\'s used by companies like Dropbox, Cloudflare, Figma, and Discord for performance-critical systems.',
      },
    ],
    quizzes: [
      {
        type: 'mcq',
        question: 'What was the primary problem Rust was created to solve?',
        options: [
          'Making web development easier',
          'The trade-off between high-level control and memory safety in systems programming',
          'Replacing JavaScript in the browser',
          'Creating a new operating system',
        ],
        correct: 1,
        explanation:
          'Rust was designed to give systems programmers both low-level control (like C/C++) and memory safety (usually provided by a garbage collector). Its ownership system enforces memory safety at compile time without needing a runtime GC.',
      },
      {
        type: 'mcq',
        question: 'What does "zero-cost abstraction" mean in Rust?',
        options: [
          'You pay a subscription fee to use abstractions',
          'Rust code always runs slower than hand-written C',
          'High-level abstractions compile down to efficient code with no runtime overhead',
          'Abstractions are removed automatically by the garbage collector',
        ],
        correct: 2,
        explanation:
          "Zero-cost abstractions mean you can write high-level code using features like closures, iterators, and generics, and the compiled result is just as efficient as hand-written low-level code. You don't pay at runtime for what you don't use.",
      },
      {
        type: 'mcq',
        question: 'Which of the following is NOT a promised benefit of Rust?',
        options: [
          'Memory safety without a garbage collector',
          'Guaranteed prevention of data races at compile time',
          'Automatic memory management via a tracing garbage collector',
          'Zero-cost abstractions',
        ],
        correct: 2,
        explanation:
          'Rust does NOT use a garbage collector. Its unique ownership system manages memory deterministically at compile time, without any runtime GC overhead. The other options — memory safety, data race prevention, and zero-cost abstractions — are core Rust promises.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 2 — Variables & Mutability
  // ─────────────────────────────────────────
  {
    id: 2,
    title: 'Variables & Mutability',
    emoji: '📦',
    description: 'Understand let, mut, constants, and shadowing in Rust.',
    content: [
      {
        type: 'text',
        text: "By default, variables in Rust are **immutable** — once a value is bound to a name, you cannot change it. This is one of Rust's core principles: safe defaults that you can opt out of.",
      },
      {
        type: 'code',
        code: `fn main() {
    let x = 5;
    // x = 6; // ❌ Error: cannot assign twice to immutable variable

    let mut y = 5;
    y = 6; // ✅ OK — y is mutable
    println!("y = {y}");
}`,
      },
      {
        type: 'heading',
        text: 'Using `mut`',
      },
      {
        type: 'text',
        text: 'Adding the `mut` keyword before a variable name makes it **mutable**. You should only make variables mutable when you need to change them. This helps reason about your code: seeing `mut` tells you this value changes over time.',
      },
      {
        type: 'code',
        code: `fn main() {
    let mut message = String::from("Hello");
    message.push_str(", world!"); // ✅ mutates the string
    println!("{message}");
}`,
      },
      {
        type: 'heading',
        text: 'Shadowing',
      },
      {
        type: 'text',
        text: 'Rust allows you to **shadow** a variable by declaring a new variable with the same name. The new declaration "shadows" the previous one. This is different from `mut` because it creates a new binding.',
      },
      {
        type: 'code',
        code: `fn main() {
    let x = 5;
    let x = x + 1; // shadows the previous x
    {
        let x = x * 2; // inner scope shadows outer x
        println!("Inner x: {x}"); // 12
    }
    println!("Outer x: {x}"); // 6
}`,
      },
      {
        type: 'heading',
        text: 'Constants',
      },
      {
        type: 'text',
        text: 'Constants (`const`) are always immutable and must have a type annotation. They can be declared in any scope and are inlined at compile time. Convention: use `SCREAMING_SNAKE_CASE` for constant names.',
      },
      {
        type: 'code',
        code: `const MAX_POINTS: u32 = 100_000;
const APP_NAME: &str = "RustRover";

fn main() {
    println!("{APP_NAME} — Max: {MAX_POINTS}");
}`,
      },
      {
        type: 'tip',
        text: 'Shadowing lets you reuse a name and optionally change its type: `let spaces = "   "; let spaces = spaces.len();` transforms `spaces` from a string to a number — something `mut` cannot do.',
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Add the keyword needed to make this variable mutable.',
        codePrefix: `fn main() {
    let `,
        codeSuffix: ` x = 10;
    x = 20;
    println!("{x}");
}`,
        answer: 'mut',
        explanation:
          'Variables in Rust are immutable by default. Adding `mut` before the variable name makes it mutable: `let mut x = 10;`. Only add mutability when you need to change the value.',
      },
      {
        type: 'mcq',
        question: 'What is the difference between shadowing and using `mut`?',
        options: [
          'There is no difference — they are the same thing',
          'Shadowing creates a new binding and can change the type; `mut` allows mutation of the same binding',
          'Shadowing only works with constants; `mut` works with variables',
          '`mut` is faster than shadowing',
        ],
        correct: 1,
        explanation:
          'Shadowing (`let x = ...; let x = ...;`) creates a brand new variable that shadows the old one, which means you can change its type. `mut` lets you modify the existing binding in place but you cannot change its type.',
      },
      {
        type: 'code-fill',
        question: 'Fill in the keyword to declare a constant named `VERSION` with type `&str`.',
        codePrefix: `fn main() {
    `,
        codeSuffix: ` VERSION: &str = "1.0";
    println!("v{VERSION}");
}`,
        answer: 'const',
        explanation:
          'Constants are declared with `const` and MUST include a type annotation. They are always immutable, are inlined at compile time, and follow `SCREAMING_SNAKE_CASE` naming convention.',
      },
      {
        type: 'mcq',
        question: 'Which of the following is true about shadowing?',
        options: [
          'Shadowing is not allowed in Rust — it causes a compiler error',
          "A shadowed variable's old value is destroyed and the new binding can have a different type",
          'Shadowing can only happen at module level, not inside functions',
          'Shadowed variables retain their original type',
        ],
        correct: 1,
        explanation:
          'Shadowing lets you reuse a variable name with a new `let` binding. The original value is dropped and the new binding can be of a completely different type. For example: `let x = "hello"; let x = x.len();` changes x from `&str` to `usize`.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 3 — Data Types
  // ─────────────────────────────────────────
  {
    id: 3,
    title: 'Data Types',
    emoji: '🎯',
    description: "Explore Rust's scalar and compound data types.",
    content: [
      {
        type: 'text',
        text: "Rust is a **statically typed** language — it must know the types of all variables at compile time. However, the compiler can often **infer** types based on the value and how it's used.",
      },
      {
        type: 'heading',
        text: 'Scalar Types',
      },
      {
        type: 'text',
        text: 'A **scalar** type represents a single value. Rust has four scalar types: integers, floating-point numbers, booleans, and characters.',
      },
      {
        type: 'code',
        code: `fn main() {
    // Integers (signed: i8, i16, i32, i64, i128, isize)
    //        (unsigned: u8, u16, u32, u64, u128, usize)
    let a: i32 = -42;    // 32-bit signed integer (default)
    let b: u8 = 255;     // 8-bit unsigned integer
    let c = 100_000;     // inferred as i32, underscores for readability

    // Floating point (f32, f64)
    let pi: f64 = 3.14159;  // 64-bit float (default)
    let small: f32 = 2.5;   // 32-bit float

    // Boolean
    let is_rust_awesome: bool = true;

    // Character (4 bytes, supports Unicode)
    let letter: char = 'R';
    let emoji: char = '🦀';
}`,
      },
      {
        type: 'heading',
        text: 'Compound Types',
      },
      {
        type: 'text',
        text: '**Compound** types group multiple values into one type. Rust has two primitive compound types: **tuples** and **arrays**.',
      },
      {
        type: 'code',
        code: `fn main() {
    // Tuple — fixed length, possibly different types
    let person: (&str, u32, bool) = ("Alice", 30, true);

    // Destructuring a tuple
    let (name, age, active) = person;
    println!("{name} is {age}");

    // Access by index
    println!("Active: {}", person.2);

    // Array — fixed length, same type
    let numbers: [i32; 5] = [1, 2, 3, 4, 5];
    let first = numbers[0];

    // Array with same value repeated
    let zeros = [0; 3]; // [0, 0, 0]
    println!("Length: {}", zeros.len());
}`,
      },
      {
        type: 'tip',
        text: "Rust's integer types include `isize` and `usize` which match the architecture of your machine (64-bit on modern systems). Use them when indexing collections.",
      },
    ],
    quizzes: [
      {
        type: 'mcq',
        question: 'What is the default integer type in Rust when no type annotation is given?',
        options: ['i8', 'i64', 'i32', 'isize'],
        correct: 2,
        explanation:
          'The default integer type in Rust is `i32`. It offers a good balance of performance and range. For floating-point numbers, the default is `f64`.',
      },
      {
        type: 'code-fill',
        question: 'Complete the array type annotation: an array of 3 i32 values.',
        codePrefix: `let arr: [i32; `,
        codeSuffix: `] = [10, 20, 30];`,
        answer: '3',
        explanation:
          'Array types in Rust use the syntax `[T; N]` where T is the element type and N is the compile-time length. Here `[i32; 3]` means an array of exactly 3 i32 integers.',
      },
      {
        type: 'mcq',
        question: 'What is the size of a `char` in Rust?',
        options: [
          '1 byte (like ASCII)',
          '2 bytes (like UTF-16)',
          '4 bytes',
          'It depends on the platform',
        ],
        correct: 2,
        explanation:
          "A Rust `char` is 4 bytes (32 bits). Unlike C's `char` (1 byte, ASCII), Rust's `char` holds a Unicode Scalar Value, which allows it to represent characters from any language, emoji, and special symbols.",
      },
      {
        type: 'code-fill',
        question: 'Access the first element of this tuple.',
        codePrefix: `let t = ("hello", 42);
let val = t.`,
        codeSuffix: `;`,
        answer: '0',
        explanation:
          'Tuple elements are accessed using dot notation followed by the index: `t.0` for the first element, `t.1` for the second, and so on. This is different from array indexing which uses brackets: `arr[0]`.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 4 — Functions
  // ─────────────────────────────────────────
  {
    id: 4,
    title: 'Functions',
    emoji: '🔧',
    description: 'Define and use functions with parameters and return values.',
    content: [
      {
        type: 'text',
        text: 'Functions are declared with the `fn` keyword. Rust uses **snake_case** for function and variable names. Functions can take parameters and return values.',
      },
      {
        type: 'code',
        code: `fn main() {
    greet("Alice");
    let sum = add(5, 3);
    println!("5 + 3 = {sum}");
}

// Function with a parameter
fn greet(name: &str) {
    println!("Hello, {name}!");
}

// Function with parameters and a return value
fn add(x: i32, y: i32) -> i32 {
    x + y // expression — no semicolon = return value
}`,
      },
      {
        type: 'heading',
        text: 'Statements vs Expressions',
      },
      {
        type: 'text',
        text: 'This is a crucial Rust concept. **Statements** are instructions that perform an action and do not return a value. **Expressions** evaluate to a value. Most Rust code is composed of expressions.',
      },
      {
        type: 'code',
        code: `fn main() {
    // Statement — performs an action, no return value
    let x = 5;

    // Expression — evaluates to a value
    let y = {
        let a = 2;
        let b = 3;
        a + b // no semicolon = this block evaluates to a + b
    };
    println!("y = {y}"); // 5

    // Using expressions with if
    let status = if y > 3 { "high" } else { "low" };
    println!("{status}");
}`,
      },
      {
        type: 'heading',
        text: 'Returning Values',
      },
      {
        type: 'text',
        text: 'You can return a value from a function using either the `return` keyword (for early returns) or by making the final expression a value (no semicolon). The return type is specified with `-> Type`.',
      },
      {
        type: 'code',
        code: `fn is_even(n: i32) -> bool {
    n % 2 == 0 // implicit return
}

fn factorial(n: u32) -> u32 {
    if n == 0 {
        return 1; // early return
    }
    n * factorial(n - 1) // recursive call
}

fn main() {
    println!("4 is even: {}", is_even(4));
    println!("5! = {}", factorial(5));
}`,
      },
      {
        type: 'tip',
        text: 'If a function has no `->` return type, it implicitly returns `()`, the **unit type**. This is Rust\'s equivalent of "void" — but it IS a type with exactly one value: `()`.',
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the function declaration to accept an `i32` parameter named `x`.',
        codePrefix: `fn double(`,
        codeSuffix: `: i32) -> i32 {
    x * 2
}`,
        answer: 'x',
        explanation:
          'Function parameters are written as `name: type`. Here `x: i32` declares a parameter named `x` of type `i32`. Multiple parameters are separated by commas.',
      },
      {
        type: 'mcq',
        question: 'What is the key difference between a statement and an expression in Rust?',
        options: [
          'Statements are faster than expressions',
          'Statements end with a semicolon and do not return a value; expressions evaluate to a value',
          'Expressions always need parentheses; statements never do',
          'There is no difference — they are interchangeable',
        ],
        correct: 1,
        explanation:
          'Statements perform actions and do not return a value (e.g., `let x = 5;`). Expressions evaluate to a value (e.g., `x + 1`, or a block `{ let x = 2; x + 1 }`). In Rust, the last expression in a function body is its return value.',
      },
      {
        type: 'code-fill',
        question: 'What does this function implicitly return?',
        codePrefix: `fn max(a: i32, b: i32) -> i32 {
    if a > b { a } else { b }
}

// The function returns `,
        codeSuffix: '`',
        answer: 'a or b',
        explanation:
          'The function returns the larger of `a` or `b`. The `if/else` is an expression here — both branches evaluate to a value, and that value is implicitly returned from the function (no semicolon, no `return`).',
      },
      {
        type: 'mcq',
        question: 'What does a Rust function return if it has no `-> ReturnType` annotation?',
        options: [
          'Nothing — the function produces no value',
          'The unit type `()`',
          'The last expression value',
          'An error — you must always declare a return type',
        ],
        correct: 1,
        explanation:
          'Functions without `-> ReturnType` return the unit type `()`. The unit type has exactly one value, also written `()`. It\'s Rust\'s way of saying "this function has meaningful side effects but no useful return value."',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 5 — Control Flow
  // ─────────────────────────────────────────
  {
    id: 5,
    title: 'Control Flow',
    emoji: '🔀',
    description: 'Master if/else, loops, and the powerful match expression.',
    content: [
      {
        type: 'text',
        text: 'Rust provides familiar control flow constructs like `if/else` and loops, plus the extraordinarily powerful `match` expression.',
      },
      {
        type: 'heading',
        text: 'if / else if / else',
      },
      {
        type: 'text',
        text: 'Unlike many languages, `if` in Rust is an **expression**, not a statement. It returns a value. This means you can use it on the right side of a `let` binding.',
      },
      {
        type: 'code',
        code: `fn main() {
    let number = 7;

    if number % 2 == 0 {
        println!("Even");
    } else {
        println!("Odd");
    }

    // if as an expression
    let status = if number > 5 { "big" } else { "small" };
    println!("{status}");
}`,
      },
      {
        type: 'heading',
        text: 'Loops',
      },
      {
        type: 'code',
        code: `fn main() {
    // loop — runs forever until break
    let mut counter = 0;
    let result = loop {
        counter += 1;
        if counter == 10 {
            break counter * 2; // loop can return a value
        }
    };
    println!("Result: {result}"); // 20

    // while loop
    let mut n = 3;
    while n > 0 {
        println!("{n}...");
        n -= 1;
    }
    println!("Liftoff!");

    // for loop (most common!)
    for i in 0..5 {
        println!("{i}"); // 0, 1, 2, 3, 4
    }

    // for over an array
    let arr = [10, 20, 30];
    for elem in arr {
        println!("{elem}");
    }
}`,
      },
      {
        type: 'heading',
        text: 'The `match` Expression',
      },
      {
        type: 'text',
        text: "`match` is Rust's version of a switch statement — but far more powerful. It compares a value against a series of **patterns** and executes the matching arm. Match must be **exhaustive**: every possible case must be handled.",
      },
      {
        type: 'code',
        code: `fn main() {
    let number = 3;

    match number {
        1 => println!("One!"),
        2 | 3 => println!("Two or Three!"), // multiple patterns
        4..=10 => println!("Four to Ten"),  // range pattern
        _ => println!("Something else"),    // catch-all
    }

    // match as an expression
    let grade = 'A';
    let points = match grade {
        'A' => 100,
        'B' => 85,
        'C' => 70,
        _ => 0,
    };
    println!("Grade {grade}: {points} points");
}`,
      },
      {
        type: 'tip',
        text: "The `_` (underscore) pattern matches anything. Use it as the last arm to make your match exhaustive without listing every single case. Rust's compiler will warn you if your match is not exhaustive!",
      },
    ],
    quizzes: [
      {
        type: 'mcq',
        question: 'Why can `if` be used on the right side of a `let` statement in Rust?',
        options: [
          'Because Rust allows any syntax in a let binding',
          'Because `if` is an expression that returns a value, and all branches must return the same type',
          'Because Rust automatically converts if/else blocks to variables',
          'Because the `let` keyword has special syntax for conditions',
        ],
        correct: 1,
        explanation:
          '`if` is an expression in Rust, meaning it evaluates to a value. Both the `if` and `else` branches must return values of the same type. This lets you write concise code like `let x = if cond { a } else { b };`.',
      },
      {
        type: 'code-fill',
        question: 'Complete the `for` loop to iterate from 0 to 4.',
        codePrefix: `for i in`,
        codeSuffix: ` {
    println!("{i}");
}`,
        answer: ' 0..5',
        explanation:
          'The range `0..5` (using `..` syntax) creates an exclusive range that goes from 0 to 4. For an inclusive range that includes 5, use `0..=5` (with `..=`).',
      },
      {
        type: 'mcq',
        question: 'What happens if a `match` expression does not cover all possible values?',
        options: [
          'Rust automatically adds a default case',
          'The program crashes at runtime',
          'The compiler rejects the code with a non-exhaustive match error',
          'Only the covered cases are executed; unmatched values are ignored',
        ],
        correct: 2,
        explanation:
          "Rust's match arms must be **exhaustive** — every possible value must be accounted for. The compiler checks this at compile time. To handle unlisted cases, add a catch-all arm using `_ => ...`. This eliminates a whole class of runtime bugs.",
      },
      {
        type: 'code-fill',
        question: 'Complete the loop to make it repeat indefinitely until `break`.',
        codePrefix: `let mut x = 0;
`,
        codeSuffix: ` {
    x += 1;
    if x > 5 { break; }
}`,
        answer: 'loop',
        explanation:
          'The `loop` keyword creates an infinite loop. It only stops when you explicitly use `break`. Unlike `while true`, `loop` can also return a value with `break value;`.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 6 — Ownership
  // ─────────────────────────────────────────
  {
    id: 6,
    title: 'Ownership',
    emoji: '🔑',
    description: "Understand Rust's most unique feature — the ownership system.",
    content: [
      {
        type: 'text',
        text: "**Ownership** is Rust's most unique feature, and it enables memory safety without a garbage collector. It's a set of rules that the compiler checks at compile time.",
      },
      {
        type: 'heading',
        text: 'The Three Ownership Rules',
      },
      {
        type: 'text',
        text: '**Rule 1:** Each value in Rust has an **owner**.\n**Rule 2:** There can only be **one owner** at a time.\n**Rule 3:** When the owner goes out of scope, the value is **dropped** (memory is freed).',
      },
      {
        type: 'code',
        code: `fn main() {
    // s owns the String
    let s = String::from("hello");

    // ownership moves to s2 — s is no longer valid!
    let s2 = s;

    // println!("{s}"); // ❌ Error: borrow of moved value
    println!("{s2}");   // ✅ OK

    // When s2 goes out of scope, the String is dropped
}`,
      },
      {
        type: 'heading',
        text: 'The Move Semantics',
      },
      {
        type: 'text',
        text: "When you assign a value that doesn't implement the `Copy` trait (like `String`, `Vec`), the ownership **moves** to the new variable. The old variable is no longer valid. This prevents **double-free** bugs.",
      },
      {
        type: 'code',
        code: `fn main() {
    // Simple types like i32 implement Copy
    let x = 5;
    let y = x; // x is COPIED, still valid
    println!("{x} {y}"); // ✅ both work

    // String does NOT implement Copy — it's MOVED
    let s1 = String::from("hello");
    let s2 = s1; // s1 is MOVED to s2
    // println!("{s1}"); // ❌ s1 no longer valid

    // To deep-copy, use .clone()
    let s3 = s2.clone();
    println!("{s2} {s3}"); // ✅ both valid
}`,
      },
      {
        type: 'heading',
        text: 'Ownership and Functions',
      },
      {
        type: 'text',
        text: 'Passing a value to a function **moves** or **copies** it, following the same rules. Returning a value from a function also transfers ownership.',
      },
      {
        type: 'code',
        code: `fn main() {
    let s = String::from("hello");
    take_ownership(s);
    // println!("{s}"); // ❌ s was moved into the function

    let x = 5;
    makes_copy(x); // x is Copy, so it's still valid
    println!("{x}"); // ✅ OK
}

fn take_ownership(some_string: String) {
    println!("{some_string}");
} // some_string dropped here

fn makes_copy(some_int: i32) {
    println!("{some_int}");
}`,
      },
      {
        type: 'tip',
        text: 'Types that are stored entirely on the stack (like integers, booleans, floats, and tuples of only those types) implement the `Copy` trait and are copied automatically. Heap-allocated types like `String` and `Vec` are moved.',
      },
    ],
    quizzes: [
      {
        type: 'mcq',
        question: 'What happens to a value in Rust when its owner goes out of scope?',
        options: [
          'The value continues to exist until the program ends',
          'The value is "dropped" and its memory is freed immediately',
          'The garbage collector cleans it up later',
          'The value persists in a global pool',
        ],
        correct: 1,
        explanation:
          'When the owner of a value goes out of scope, Rust automatically calls `drop()` on it, freeing its memory. This deterministic cleanup is a key advantage over garbage-collected languages — you know exactly when memory is freed.',
      },
      {
        type: 'code-fill',
        question: 'What happens if you try to use a variable after it has been moved?',
        codePrefix: `let s = String::from("hello");
let t = s;
// Using s now causes a `,
        codeSuffix: '` error',
        answer: 'compile-time',
        explanation:
          'The compiler rejects the code with an error like "borrow of moved value." This happens at compile time, not runtime. The move prevents double-free and dangling pointer bugs entirely.',
      },
      {
        type: 'mcq',
        question:
          'Which of the following types is MOVED when assigned to a new variable (not copied)?',
        options: ['i32 (integer)', 'f64 (float)', 'bool', 'String'],
        correct: 3,
        explanation:
          "`String` is allocated on the heap and does not implement the `Copy` trait, so it's moved. Simple stack-only types like integers, floats, and booleans implement `Copy` and are automatically copied on assignment.",
      },
      {
        type: 'mcq',
        question: 'How can you create a deep copy of a heap-allocated value like a String?',
        options: [
          'Use the `copy()` method',
          'Use the `clone()` method',
          'By reassigning it with `let`',
          'Heap-allocated values cannot be copied',
        ],
        correct: 1,
        explanation:
          'The `.clone()` method performs a deep copy of heap data. After `let s2 = s1.clone()`, both `s1` and `s2` have their own independent heap memory, and both remain valid. Clone is explicit and potentially expensive — Rust makes you opt in.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 7 — Borrowing & References
  // ─────────────────────────────────────────
  {
    id: 7,
    title: 'Borrowing & References',
    emoji: '🔗',
    description: 'Access values without taking ownership using references.',
    content: [
      {
        type: 'text',
        text: '**Borrowing** is the mechanism of using a value without taking ownership. Instead of passing the value itself, you pass a **reference** (`&T`) to it. This lets you access the value without transferring ownership.',
      },
      {
        type: 'code',
        code: `fn main() {
    let s = String::from("hello");

    // &s creates a reference — we borrow s, we don't own it
    let len = calculate_length(&s);

    println!("'{s}' has length {len}"); // s is still valid!
}

fn calculate_length(s: &String) -> usize {
    s.len()
} // s is NOT dropped here — it doesn't own the String
`,
      },
      {
        type: 'heading',
        text: 'Mutable References',
      },
      {
        type: 'text',
        text: "You can also create **mutable references** (`&mut T`) to modify borrowed values. But there's one big rule: you can have **either** one mutable reference **or** any number of immutable references, but not both at the same time.",
      },
      {
        type: 'code',
        code: `fn main() {
    let mut s = String::from("hello");

    change(&mut s);
    println!("{s}"); // "hello, world!"
}

fn change(s: &mut String) {
    s.push_str(", world!");
}

// These would cause compile errors:
// let r1 = &s;          // immutable ref
// let r2 = &mut s;      // ❌ can't borrow as mutable because
//                       //    immutable ref exists
// println!("{r1} {r2}");
`,
      },
      {
        type: 'heading',
        text: 'The Borrowing Rules',
      },
      {
        type: 'text',
        text: '**Rule 1:** At any time, you can have **either** one mutable reference **or** any number of immutable references.\n**Rule 2:** References must always be **valid** (never dangling).',
      },
      {
        type: 'heading',
        text: 'Slices',
      },
      {
        type: 'text',
        text: "A **slice** is a reference to a contiguous sequence of elements in a collection. Slices are a kind of reference, so they don't take ownership.",
      },
      {
        type: 'code',
        code: `fn main() {
    let s = String::from("hello world");

    let hello = &s[0..5];     // "hello"
    let world = &s[6..11];    // "world"
    let whole = &s[..];       // "hello world"

    // String slices have type &str
    let first_word = first_word(&s);
    println!("{first_word}");
}

fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();
    for (i, &byte) in bytes.iter().enumerate() {
        if byte == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}`,
      },
      {
        type: 'tip',
        text: 'A String slice `&str` is often used as a function parameter instead of `&String`. It\'s more flexible — it accepts both `&String` and `&str`. This is called "string slicing" and is considered idiomatic Rust.',
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'What symbol creates an immutable reference to a value?',
        codePrefix: `let s = String::from("hello");
let r = `,
        codeSuffix: `s; // r borrows s`,
        answer: '&',
        explanation:
          'The `&` operator creates a reference to a value. `&s` borrows `s` without taking ownership. The reference type is `&String` (or `&T` in general).',
      },
      {
        type: 'mcq',
        question: 'What is the borrowing rule about mutable and immutable references?',
        options: [
          'You can have unlimited mutable references and unlimited immutable references simultaneously',
          'You can have either one mutable reference OR any number of immutable references, but not both at the same time',
          'Mutable references are not allowed in Rust',
          'You must always use mutable references — immutable references are slower',
        ],
        correct: 1,
        explanation:
          'This is the key rule: either one mutable reference XOR any number of immutable references. This prevents data races at compile time. If a value is being read (immutable refs), no one can be writing to it (mutable ref).',
      },
      {
        type: 'mcq',
        question: 'What is the type of a string slice in Rust?',
        options: ['String', '&String', '&str', 'str'],
        correct: 2,
        explanation:
          'A string slice has type `&str` (pronounced "string slice" or "stir"). It\'s a reference to a sequence of UTF-8 bytes owned by someone else. `&str` is also the type of string literals.',
      },
      {
        type: 'code-fill',
        question: 'Complete the function parameter to accept a mutable reference to a String.',
        codePrefix: `fn append_world(s: `,
        codeSuffix: `String) {
    s.push_str(", world!");
}`,
        answer: '&mut ',
        explanation:
          '`&mut String` is a mutable reference to a String. The function can read and modify the String it borrows. Adding `&mut ` as the parameter type makes it clear this function modifies its argument.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 8 — Structs
  // ─────────────────────────────────────────
  {
    id: 8,
    title: 'Structs',
    emoji: '🏗️',
    description: 'Define custom data types with structs and methods.',
    content: [
      {
        type: 'text',
        text: 'A **struct** (short for structure) lets you group related data under one name. Each piece of data is called a **field**. Structs are the primary way to create custom data types in Rust.',
      },
      {
        type: 'code',
        code: `// Define a struct
struct User {
    username: String,
    email: String,
    sign_in_count: u64,
    active: bool,
}

fn main() {
    // Create an instance
    let mut user1 = User {
        email: String::from("alice@example.com"),
        username: String::from("alice"),
        active: true,
        sign_in_count: 1,
    };

    // Access and modify fields
    user1.email = String::from("alice@newdomain.com");
    println!("{}", user1.username);
}`,
      },
      {
        type: 'heading',
        text: 'Field Init Shorthand',
      },
      {
        type: 'text',
        text: 'If a field name matches a variable name, you can use the shorthand syntax. You can also use **struct update syntax** (`..`) to copy fields from another instance.',
      },
      {
        type: 'code',
        code: `fn build_user(email: String, username: String) -> User {
    User {
        email,     // shorthand for email: email
        username,  // shorthand for username: username
        active: true,
        sign_in_count: 1,
    }
}

fn main() {
    let user1 = build_user(
        String::from("bob@example.com"),
        String::from("bob"),
    );

    // Struct update syntax — copy all remaining fields from user1
    let user2 = User {
        email: String::from("carol@example.com"),
        ..user1  // username, active, sign_in_count from user1
    };
}`,
      },
      {
        type: 'heading',
        text: 'Tuple Structs',
      },
      {
        type: 'text',
        text: "**Tuple structs** are like named tuples — they have a name but their fields don't have names. They're useful when you want to give a tuple a distinct type.",
      },
      {
        type: 'code',
        code: `struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);

    // Destructure a tuple struct
    let Color(r, g, b) = black;
    println!("{r}, {g}, {b}");

    // Access by index
    println!("{}", origin.1);
}`,
      },
      {
        type: 'heading',
        text: 'Methods with `impl`',
      },
      {
        type: 'text',
        text: 'You can define methods on structs using an `impl` block. The first parameter is always `self` (or `&self`, `&mut self`).',
      },
      {
        type: 'code',
        code: `struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    // Method (takes &self — borrows immutably)
    fn area(&self) -> u32 {
        self.width * self.height
    }

    // Method with more parameters
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }

    // Associated function (no self) — like a static method
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let rect = Rectangle { width: 10, height: 20 };
    println!("Area: {}", rect.area());

    let square = Rectangle::square(5); // :: for associated functions
}`,
      },
      {
        type: 'tip',
        text: 'Use `impl` blocks to group behavior with your data. An associated function (no `self`) is called with `::` syntax, like `Rectangle::square(5)`. A method (has `self`) is called with `.` syntax, like `rect.area()`.',
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the code to create a struct instance.',
        codePrefix: `struct Book {
    title: String,
    pages: u32,
}

fn main() {
    let book = `,
        codeSuffix: ` {
        title: String::from("Rust Book"),
        pages: 500,
    };
}`,
        answer: 'Book',
        explanation:
          'Struct instances are created using the struct name followed by curly braces: `Book { title: ..., pages: ... }`. Each field must be assigned a value. Use the field init shorthand when the variable name matches the field name.',
      },
      {
        type: 'mcq',
        question: 'How do you call an associated function (like a constructor) on a struct?',
        options: [
          'Using the `.` operator: `rect.square(5)`',
          'Using `::` syntax: `Rectangle::square(5)`',
          'Directly: `square(5)`',
          'Via the `new` keyword: `Rectangle new square(5)`',
        ],
        correct: 1,
        explanation:
          'Associated functions (defined in `impl` blocks without a `self` parameter) are called using `::` syntax: `Rectangle::square(5)`. Methods (with `self`) are called with `.` syntax: `rect.area()`.',
      },
      {
        type: 'mcq',
        question: 'What is a tuple struct?',
        options: [
          'A struct where all fields are tuples',
          'A struct where fields are accessed by index instead of name',
          'A struct with no fields',
          'A struct that contains a tuple as its only field',
        ],
        correct: 1,
        explanation:
          'Tuple structs are named structs whose fields have no names — they are accessed by index (e.g., `struct Color(i32, i32, i32)`; `color.0`). They are useful for creating distinct types from tuples.',
      },
      {
        type: 'code-fill',
        question: 'Add the method syntax to define a method on a struct.',
        codePrefix: `struct Counter { count: u32 }

`,
        codeSuffix: ` Counter {
    fn increment(&mut self) {
        self.count += 1;
    }
}`,
        answer: 'impl',
        explanation:
          'The `impl` keyword introduces an implementation block for a struct. All methods and associated functions for the struct go inside `impl StructName { ... }`.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 9 — Enums & Pattern Matching
  // ─────────────────────────────────────────
  {
    id: 9,
    title: 'Enums & Pattern Matching',
    emoji: '🎭',
    description: 'Define types with multiple variants and match on them.',
    content: [
      {
        type: 'text',
        text: "**Enums** (enumerations) let you define a type by listing its possible **variants**. They're incredibly powerful in Rust, especially when combined with `match`.",
      },
      {
        type: 'code',
        code: `enum IpAddrKind {
    V4,
    V6,
}

// Enums can hold data — each variant can have different types!
enum Message {
    Quit,                          // no data
    Move { x: i32, y: i32 },      // named fields (like a struct)
    Write(String),                 // single String
    ChangeColor(i32, i32, i32),    // tuple
}

fn main() {
    let four = IpAddrKind::V4;
    let msg = Message::Write(String::from("hello"));
}`,
      },
      {
        type: 'heading',
        text: 'Option Enum',
      },
      {
        type: 'text',
        text: 'Rust has no `null` value. Instead, it uses the `Option<T>` enum to represent a value that might be present or absent. This eliminates null pointer errors entirely.',
      },
      {
        type: 'code',
        code: `enum Option<T> {
    Some(T),    // a value exists
    None,       // no value
}

fn main() {
    let some_number = Some(5);        // type: Option<i32>
    let some_string = Some("hello");  // type: Option<&str>
    let absent_number: Option<i32> = None; // must specify type

    // You MUST handle the None case — no null pointer exceptions!
    let x: i32 = 5;
    let y: Option<i32> = Some(10);

    // x + y // ❌ Error: can't add i32 and Option<i32>
    // You need to unwrap the Option first
}`,
      },
      {
        type: 'heading',
        text: 'match with Enums',
      },
      {
        type: 'code',
        code: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value_in_cents(coin: Coin) -> u8 {
    match coin {
        Coin::Penny => 1,
        Coin::Nickel => 5,
        Coin::Dime => 10,
        Coin::Quarter => 25,
    }
}

// match with Option<T>
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}

fn main() {
    let five = Some(5);
    let six = plus_one(five);
    let none = plus_one(None);
}`,
      },
      {
        type: 'heading',
        text: 'if let',
      },
      {
        type: 'text',
        text: "If you only care about one pattern, `if let` is a more concise alternative to `match`. It's syntactic sugar for a match with just one arm and a `_ => ()` catch-all.",
      },
      {
        type: 'code',
        code: `fn main() {
    let config_max = Some(3u8);

    // Verbose match
    match config_max {
        Some(max) => println!("Max: {max}"),
        _ => (),
    }

    // Concise if let
    if let Some(max) = config_max {
        println!("Max: {max}");
    }
}`,
      },
      {
        type: 'tip',
        text: "`Option<T>` is so fundamental that it's in the prelude (always in scope). You don't need to write `Option::Some` — just `Some` and `None` are enough.",
      },
    ],
    quizzes: [
      {
        type: 'mcq',
        question: "What problem does Rust's `Option<T>` solve?",
        options: [
          'It provides a way to make mutable references',
          'It eliminates null pointer errors by making the absence of a value explicit in the type system',
          'It allows functions to return multiple values',
          'It provides automatic error handling',
        ],
        correct: 1,
        explanation:
          'Rust has no `null` value. Instead, `Option<T>` explicitly represents the possibility of absence. The compiler forces you to handle both `Some` and `None` cases, eliminating the billion-dollar mistake of null pointer exceptions.',
      },
      {
        type: 'code-fill',
        question: 'Complete the if let to extract the value from an Option.',
        codePrefix: `let x = Some(42);

if let `,
        codeSuffix: ` = x {
    println!("value is {val}");
}`,
        answer: 'Some(val)',
        explanation:
          '`if let Some(val) = x` pattern matches against the `Some` variant, binding the inner value to `val`. If `x` is `None`, the `if` body is skipped. This is cleaner than a full `match` when you only care about one variant.',
      },
      {
        type: 'mcq',
        question:
          'Can different variants of the same enum hold different types and amounts of data?',
        options: [
          'No — all variants must have the same structure',
          'Yes — each variant can hold different types and structures',
          'Only if they all implement the same trait',
          'Yes, but only primitive types are allowed',
        ],
        correct: 1,
        explanation:
          'Rust enums are extremely flexible. Each variant can have different data: no data (`Quit`), named fields (`Move { x, y }`), a single value (`Write(String)`), or a tuple (`ChangeColor(i32, i32, i32)`). This is called a "tagged union" or "algebraic data type."',
      },
      {
        type: 'code-fill',
        question: 'Define an enum named `Status` with variants `Active` and `Inactive`.',
        codePrefix: 'enum Status {\n    Active,\n    ',
        codeSuffix: ',\n}',
        answer: 'Inactive',
        explanation:
          'Enum variants are listed inside the enum body, separated by commas. `Active` and `Inactive` are variants with no associated data — they are like simple constant values.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 10 — Strings
  // ─────────────────────────────────────────
  {
    id: 10,
    title: 'Strings',
    emoji: '📝',
    description: 'Understand String vs &str and how to work with text in Rust.',
    content: [
      {
        type: 'text',
        text: 'Rust has two main string types: `String` and `&str` (string slice). This can be confusing at first, but understanding the difference is key to Rust proficiency.',
      },
      {
        type: 'heading',
        text: 'String vs &str',
      },
      {
        type: 'code',
        code: `fn main() {
    // &str — string slice: immutable view into a string
    // String literals are &str
    let greeting: &str = "hello"; // stored in program binary

    // String — owned, growable, heap-allocated
    let mut s: String = String::from("hello");
    s.push_str(", world!"); // can grow
    println!("{s}");

    // Convert &str to String
    let from_literal = "hello".to_string();
    let from_string_literal = String::from("hello");

    // Convert String to &str
    let slice: &str = &s[..];
}`,
      },
      {
        type: 'heading',
        text: 'Common String Methods',
      },
      {
        type: 'code',
        code: `fn main() {
    let mut s = String::from("  hello world  ");

    // Length and emptiness
    println!("len: {}", s.len());        // 15
    println!("is_empty: {}", s.is_empty()); // false

    // Push and pop
    s.push('!');               // append a char
    s.push_str("!!");          // append a &str
    s.pop();                   // remove last char

    // Concatenation
    let hello = String::from("Hello, ");
    let name = String::from("Alice");
    let greeting = hello + &name; // hello is MOVED here
    // println!("{hello}"); // ❌ hello was moved

    // Better way — format! macro
    let s1 = String::from("tic");
    let s2 = String::from("tac");
    let s3 = String::from("toe");
    let result = format!("{s1}-{s2}-{s3}");
    println!("{result}"); // tic-tac-toe
    println!("{s1} {s2} {s3}"); // all still valid

    // Slicing strings (careful with multi-byte chars!)
    let s = String::from("hello");
    let slice = &s[0..2]; // "he"
    println!("{slice}");
}`,
      },
      {
        type: 'heading',
        text: 'Iterating Over Strings',
      },
      {
        type: 'text',
        text: 'You cannot index a String by position (`s[0]`) because Rust strings are UTF-8 encoded. A "character" can be multiple bytes. Instead, iterate over characters or bytes explicitly.',
      },
      {
        type: 'code',
        code: `fn main() {
    let word = String::from("café");

    // Iterate over bytes
    for b in word.bytes() {
        print!("{b} ");
    }
    // 99 97 102 195 169

    println!();

    // Iterate over characters (Unicode scalar values)
    for c in word.chars() {
        print!("{c} ");
    }
    // c a f é
}`,
      },
      {
        type: 'tip',
        text: 'In function signatures, prefer `&str` over `&String` for parameters. It\'s more flexible (accepts both types) and avoids unnecessary allocations. This is called "string slice" pattern and is idiomatic Rust.',
      },
    ],
    quizzes: [
      {
        type: 'mcq',
        question: 'What is the key difference between `String` and `&str`?',
        options: [
          '`String` is faster; `&str` is slower',
          '`String` is an owned, growable, heap-allocated type; `&str` is an immutable view into a string',
          '`&str` can only store ASCII text; `String` can store any Unicode',
          'There is no practical difference — they are interchangeable',
        ],
        correct: 1,
        explanation:
          '`String` is an owned, mutable, heap-allocated UTF-8 string. `&str` is a borrowed reference to a sequence of UTF-8 bytes. Think of `String` as owning the data and `&str` as borrowing a view of it.',
      },
      {
        type: 'code-fill',
        question: 'Complete the code to convert a &str to a String.',
        codePrefix: `let greeting = "hello";
let s: String = greeting.`,
        codeSuffix: '();',
        answer: 'to_string',
        explanation:
          'The `.to_string()` method converts a `&str` (or any type implementing `Display`) into an owned `String`. You can also use `String::from("hello")` which does the same thing.',
      },
      {
        type: 'mcq',
        question: "Why can't you index a String by position (e.g., `s[0]`) in Rust?",
        options: [
          'String indexing is not implemented for performance reasons',
          'Because Rust strings are UTF-8 encoded, a "character" may occupy multiple bytes, making indexing ambiguous',
          'You can — the syntax is `s[0]`',
          'Because String is immutable by default',
        ],
        correct: 1,
        explanation:
          'Rust strings are UTF-8 encoded. A Unicode scalar value (char) can be 1-4 bytes. Indexing by byte position might land in the middle of a multi-byte character, producing invalid data. Rust prevents this at compile time.',
      },
      {
        type: 'code-fill',
        question: 'Complete the macro call that builds a String without moving ownership.',
        codePrefix: `let s1 = String::from("a");
let s2 = String::from("b");
let combined = `,
        codeSuffix: `!("{s1}-{s2}");`,
        answer: 'format',
        explanation:
          "The `format!` macro works like `println!` but returns a `String` instead of printing. Crucially, it borrows its arguments (doesn't take ownership), so `s1` and `s2` are still valid afterwards — unlike `+` concatenation which moves the left operand.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 11 — Collections
  // ─────────────────────────────────────────
  {
    id: 11,
    title: 'Collections',
    emoji: '📚',
    description: "Work with Vec, HashMap, and HashSet — Rust's essential collections.",
    content: [
      {
        type: 'text',
        text: "Rust's standard library provides several **collections** — data structures stored on the heap that can grow and shrink dynamically. The most important are `Vec`, `HashMap`, and `HashSet`.",
      },
      {
        type: 'heading',
        text: 'Vec<T> — Dynamic Array',
      },
      {
        type: 'code',
        code: `fn main() {
    // Create a Vec
    let mut v: Vec<i32> = Vec::new();
    v.push(1);
    v.push(2);

    // Or with the vec! macro
    let mut v = vec![1, 2, 3, 4, 5];

    // Access elements
    let third: &i32 = &v[2];     // panics if out of bounds
    let third: Option<&i32> = v.get(2); // safe — returns Option

    // Iterate
    for i in &v {
        println!("{i}");
    }

    // Iterate and mutate
    for i in &mut v {
        *i *= 2;
    }

    // Pop from end
    let last = v.pop(); // Option<T>
    println!("{:?}", v); // [2, 4, 6, 8]
}`,
      },
      {
        type: 'heading',
        text: 'HashMap<K, V> — Key-Value Store',
      },
      {
        type: 'code',
        code: `use std::collections::HashMap;

fn main() {
    let mut scores = HashMap::new();
    scores.insert(String::from("Blue"), 10);
    scores.insert(String::from("Yellow"), 50);

    // Access
    let team = String::from("Blue");
    let score = scores.get(&team); // Option<&i32>

    // Iterate
    for (key, value) in &scores {
        println!("{key}: {value}");
    }

    // Insert only if key is absent
    scores.entry(String::from("Blue")).or_insert(0);
    // Blue is already 10 — no change

    // Update based on old value
    let text = "hello world hello";
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
    println!("{:?}", map); // {"hello": 2, "world": 1}
}`,
      },
      {
        type: 'heading',
        text: 'HashSet<T> — Unique Values',
      },
      {
        type: 'code',
        code: `use std::collections::HashSet;

fn main() {
    let mut set = HashSet::new();
    set.insert(1);
    set.insert(2);
    set.insert(1); // duplicate — ignored

    println!("{:?}", set); // {1, 2}

    // Check membership
    if set.contains(&1) {
        println!("Contains 1");
    }

    // Set operations
    let a: HashSet<_> = [1, 2, 3].iter().collect();
    let b: HashSet<_> = [2, 3, 4].iter().collect();

    let union: HashSet<_> = a.union(&b).collect();
    let intersection: HashSet<_> = a.intersection(&b).collect();
    let difference: HashSet<_> = a.difference(&b).collect();

    println!("Union: {:?}", union);         // {1, 2, 3, 4}
    println!("Intersection: {:?}", intersection); // {2, 3}
    println!("Difference: {:?}", difference);     // {1}
}`,
      },
      {
        type: 'tip',
        text: "Use `Vec` by default — it's the most versatile collection. Use `HashMap` for key-value lookups. Use `HashSet` when you need to check for unique values (a set). For ordered maps, see `BTreeMap` and `BTreeSet`.",
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Create a vector containing the numbers 1, 2, 3 using the vec! macro.',
        codePrefix: `let v = `,
        codeSuffix: ';',
        answer: 'vec![1, 2, 3]',
        explanation:
          'The `vec!` macro is the most convenient way to create a `Vec`. `vec![1, 2, 3]` creates a `Vec<i32>` with those three elements. You can also use `Vec::new()` and push elements.',
      },
      {
        type: 'mcq',
        question: 'What does `v.get(5)` return if vector `v` has only 3 elements?',
        options: [
          'The value at index 5 (panics at runtime)',
          'An error saying index out of bounds',
          '`None`',
          'The last element of the vector',
        ],
        correct: 2,
        explanation:
          '`v.get(index)` returns `Option<&T>`. If the index is out of bounds, it returns `None` instead of panicking. This is safer than using `&v[index]` which panics on out-of-bounds access.',
      },
      {
        type: 'code-fill',
        question: 'Complete the code to insert a value into a HashMap only if the key is absent.',
        codePrefix: `use std::collections::HashMap;

let mut map = HashMap::new();
map.insert("key", 10);
map.entry("key").`,
        codeSuffix: "(20); // won't overwrite",
        answer: 'or_insert',
        explanation:
          "`entry(key).or_insert(value)` inserts the value only if the key is not already present. If the key exists, the entry API returns the existing value without modifying it. It returns a mutable reference to the entry's value.",
      },
      {
        type: 'mcq',
        question: 'When should you use a `HashSet` instead of a `Vec`?',
        options: [
          'When you need to maintain insertion order',
          'When you need fast membership testing and unique elements',
          'When you need indexed access',
          "When performance doesn't matter",
        ],
        correct: 1,
        explanation:
          '`HashSet<T>` is optimized for fast membership testing (`.contains()`) and automatically deduplicates elements. Unlike `Vec`, it has no ordering guarantees. Use it when "is this value in the set?" is your main use case.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 12 — Error Handling
  // ─────────────────────────────────────────
  {
    id: 12,
    title: 'Error Handling',
    emoji: '⚠️',
    description: 'Handle failures gracefully with Result, Option, and the ? operator.',
    content: [
      {
        type: 'text',
        text: "Rust has two main error categories: **recoverable** errors (handled with `Result<T, E>`) and **unrecoverable** errors (handled with `panic!`). Unlike many languages, Rust doesn't have exceptions — error handling is done through types.",
      },
      {
        type: 'heading',
        text: 'panic! — Unrecoverable Errors',
      },
      {
        type: 'code',
        code: `fn main() {
    // panic! immediately stops the program and unwinds
    // Usually for bugs the programmer should fix
    // panic!("Something went horribly wrong!");

    // Common panics:
    // let v = vec![1, 2, 3];
    // v[99]; // panic: index out of bounds
}`,
      },
      {
        type: 'heading',
        text: 'Result<T, E> — Recoverable Errors',
      },
      {
        type: 'text',
        text: '`Result<T, E>` is an enum with two variants: `Ok(T)` for success and `Err(E)` for failure. Functions that can fail return a `Result`.',
      },
      {
        type: 'code',
        code: `use std::fs::File;
use std::io::ErrorKind;

fn main() {
    // Result has two variants
    let greeting_result: Result<&str, &str> = Ok("hello");
    let error_result: Result<&str, &str> = Err("something failed");

    // Opening a file returns Result<File, io::Error>
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Couldn't create: {e:?}"),
            },
            other_error => panic!("Couldn't open: {other_error:?}"),
        },
    };
}`,
      },
      {
        type: 'heading',
        text: 'The `?` Operator',
      },
      {
        type: 'text',
        text: "The `?` operator is syntactic sugar for propagating errors. If `Result` is `Ok`, it unwraps the value. If it's `Err`, it returns the error from the current function. This makes error handling concise.",
      },
      {
        type: 'code',
        code: `use std::fs;
use std::io;

// Without ?
fn read_username_from_file_long(path: &str) -> Result<String, io::Error> {
    let f = fs::File::open(path);
    let mut f = match f {
        Ok(file) => file,
        Err(e) => return Err(e),
    };
    let mut s = String::new();
    match f.read_to_string(&mut s) {
        Ok(_) => Ok(s),
        Err(e) => Err(e),
    }
}

// With ? — much cleaner!
fn read_username(path: &str) -> Result<String, io::Error> {
    let mut s = String::new();
    fs::File::open(path)?.read_to_string(&mut s)?;
    Ok(s)
}

// Even simpler — fs has a helper
fn read_username_easy(path: &str) -> Result<String, io::Error> {
    fs::read_to_string(path)
}`,
      },
      {
        type: 'heading',
        text: 'unwrap and expect',
      },
      {
        type: 'text',
        text: "`unwrap()` returns the value if `Ok`, or panics if `Err`. `expect()` does the same but with a custom error message. Use them sparingly — they're best for prototyping or when you're certain an error can't happen.",
      },
      {
        type: 'code',
        code: `fn main() {
    // unwrap — panics on error
    let f = File::open("hello.txt").unwrap();

    // expect — panics with a custom message
    let f = File::open("hello.txt")
        .expect("Failed to open hello.txt");
}`,
      },
      {
        type: 'tip',
        text: "Prefer `?` for propagating errors up to the caller. Use `unwrap()` only during prototyping or when you're absolutely certain the operation will succeed. Use `expect()` to document the assumption.",
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question:
          'Complete the function type to return a Result with String on success and io::Error on failure.',
        codePrefix: 'use std::io;\n\nfn read_file(path: &str) -> ',
        codeSuffix: ' {\n    fs::read_to_string(path)\n}',
        answer: 'Result<String, io::Error>',
        explanation:
          '`Result<String, io::Error>` is the return type. The `Ok` variant wraps a `String`, and the `Err` variant wraps an `io::Error`. The function propagates any errors from `fs::read_to_string` using `?` or manually.',
      },
      {
        type: 'mcq',
        question: 'What does the `?` operator do when used on a `Result`?',
        options: [
          'It panics if the result is an error',
          'It unwraps the `Ok` value or returns the `Err` from the current function',
          'It ignores errors and continues execution',
          'It converts the error to a string',
        ],
        correct: 1,
        explanation:
          "The `?` operator: if `Result` is `Ok(val)`, it evaluates to `val`. If it's `Err(e)`, it returns `Err(e.into())` from the current function. This enables clean, linear error propagation without nested match blocks.",
      },
      {
        type: 'mcq',
        question: 'What is the difference between `unwrap()` and `expect()`?',
        options: [
          '`unwrap()` returns the error; `expect()` panics',
          '`expect()` accepts a custom panic message; `unwrap()` uses a default message',
          '`unwrap()` can be used with Option; `expect()` only works with Result',
          'There is no difference — they are identical',
        ],
        correct: 1,
        explanation:
          'Both `unwrap()` and `expect()` return the `Ok` value or panic on `Err`. The difference is that `expect()` lets you provide a custom panic message that documents the assumption. `unwrap()` uses the default error debug message.',
      },
      {
        type: 'code-fill',
        question: 'Complete the code to propagate the error using the ? operator.',
        codePrefix: `use std::fs;

fn read_config() -> Result<String, std::io::Error> {
    let content = fs::read_to_string("config.toml")`,
        codeSuffix: ';\n    Ok(content)\n}',
        answer: '?',
        explanation:
          'Adding `?` after `fs::read_to_string(...)` propagates the error. If the file read fails, the error is returned from `read_config()` immediately. If it succeeds, the `Ok` value is unwrapped into `content`.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 13 — Traits & Generics
  // ─────────────────────────────────────────
  {
    id: 13,
    title: 'Traits & Generics',
    emoji: '🧬',
    description: 'Write flexible, reusable code with generics and traits.',
    content: [
      {
        type: 'text',
        text: '**Generics** let you write code that works with multiple types. **Traits** define shared behavior. Together, they let you write abstract, reusable code without sacrificing performance.',
      },
      {
        type: 'heading',
        text: 'Generic Functions',
      },
      {
        type: 'code',
        code: `// Generic function — works with any type T
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}

fn main() {
    let numbers = vec![34, 50, 25, 100, 65];
    let result = largest(&numbers);
    println!("Largest: {result}");

    let chars = vec!['y', 'm', 'a', 'q'];
    let result = largest(&chars);
    println!("Largest char: {result}");
}`,
      },
      {
        type: 'heading',
        text: 'Generic Structs',
      },
      {
        type: 'code',
        code: `// Generic struct with two potentially different types
struct Point<T, U> {
    x: T,
    y: U,
}

impl<T, U> Point<T, U> {
    fn x(&self) -> &T {
        &self.x
    }
}

// Implement methods only for specific type combinations
impl Point<f64, f64> {
    fn distance_from_origin(&self) -> f64 {
        (self.x.powi(2) + self.y.powi(2)).sqrt()
    }
}

fn main() {
    let int_point = Point { x: 5, y: 10 };
    let float_point = Point { x: 1.0, y: 4.0 };
    let mixed = Point { x: 5, y: 4.0 };
}`,
      },
      {
        type: 'heading',
        text: 'Defining and Implementing Traits',
      },
      {
        type: 'code',
        code: `// Define a trait
trait Summary {
    fn summarize(&self) -> String;

    // Default implementation
    fn default_summary(&self) -> String {
        String::from("(Read more...)")
    }
}

struct Article {
    headline: String,
    author: String,
}

// Implement the trait for our type
impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{} by {}", self.headline, self.author)
    }
}

fn main() {
    let article = Article {
        headline: String::from("Rust 2024 is here!"),
        author: String::from("Alice"),
    };
    println!("{}", article.summarize());
    println!("{}", article.default_summary());
}`,
      },
      {
        type: 'heading',
        text: 'Traits as Parameters',
      },
      {
        type: 'code',
        code: `// Accept any type that implements Summary
fn notify(item: &impl Summary) {
    println!("Breaking: {}", item.summarize());
}

// Trait bound syntax — equivalent to above
fn notify_bound<T: Summary>(item: &T) {
    println!("Breaking: {}", item.summarize());
}

// Multiple trait bounds
fn notify_both(item: &(impl Summary + Display)) {}

// Where clause (cleaner with many bounds)
fn complex_function<T, U>(t: &T, u: &U) -> String
where
    T: Summary + Clone,
    U: Summary + Display,
{
    format!("{} {}", t.summarize(), u.summarize())
}`,
      },
      {
        type: 'tip',
        text: "Traits are similar to interfaces in other languages, but they can include default implementations. Rust uses **trait bounds** to specify what capabilities a generic type must have — the compiler monomorphizes generics, so there's zero runtime overhead.",
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the generic struct definition with two type parameters.',
        codePrefix: 'struct Pair<',
        codeSuffix: '> {\n    first: T,\n    second: U,\n}',
        answer: 'T, U',
        explanation:
          "Generic type parameters are declared in angle brackets after the struct name: `struct Pair<T, U>`. They're typically named with single uppercase letters: T, U, V, etc.",
      },
      {
        type: 'mcq',
        question:
          'What is the difference between `fn foo(item: &impl Trait)` and `fn foo<T: Trait>(item: &T)`?',
        options: [
          'The first is for types; the second is for values',
          'The first is syntactic sugar for simple cases; the second (trait bound) is needed for more complex cases like multiple parameters of the same type',
          'The first works at runtime; the second at compile time',
          'There is no difference — they are completely identical syntax',
        ],
        correct: 1,
        explanation:
          '`impl Trait` is a concise syntax for simple cases (one parameter). The trait bound `T: Trait` is more explicit and needed when you want to enforce that multiple parameters have the same type, or for complex bounds.',
      },
      {
        type: 'mcq',
        question: 'Why do generics in Rust have zero runtime overhead?',
        options: [
          'Because Rust uses dynamic dispatch for all generics',
          "Because Rust's compiler performs monomorphization — generating specialized code for each concrete type at compile time",
          'Because generics are erased at runtime like in Java',
          'Because generics are only allowed with primitive types',
        ],
        correct: 1,
        explanation:
          'Rust uses **monomorphization**: the compiler generates a separate copy of the generic function/struct for each concrete type used. This means the generic code compiles down to type-specific code with no indirection or runtime dispatch overhead.',
      },
      {
        type: 'code-fill',
        question: 'Complete the trait definition with a method named `describe`.',
        codePrefix: 'trait Describable {\n    fn ',
        codeSuffix: '(&self) -> String;\n}',
        answer: 'describe',
        explanation:
          'Trait methods are declared without a body (unless they have a default implementation). Here `fn describe(&self) -> String;` defines a method that takes a shared reference to self and returns a String. Types implementing this trait must provide the body.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 14 — Closures & Iterators
  // ─────────────────────────────────────────
  {
    id: 14,
    title: 'Closures & Iterators',
    emoji: '⛓️',
    description: 'Write expressive code with anonymous functions and lazy iterators.',
    content: [
      {
        type: 'text',
        text: '**Closures** are anonymous functions you can save in a variable or pass as arguments. **Iterators** provide a lazy, composable way to process sequences of values.',
      },
      {
        type: 'heading',
        text: 'Closures',
      },
      {
        type: 'code',
        code: `fn main() {
    // Closure syntax: |params| body
    let add_one = |x: i32| -> i32 { x + 1 };
    println!("{}", add_one(5)); // 6

    // Type inference — types can be omitted
    let add_two = |x| x + 2;
    println!("{}", add_two(5)); // 7

    // Closures can capture variables from their environment
    let prefix = String::from("Hello, ");
    let greeter = |name| println!("{prefix}{name}");
    greeter("Alice"); // "Hello, Alice"

    // Capturing by move
    let data = vec![1, 2, 3];
    let display = move || println!("{:?}", data);
    // println!("{:?}", data); // ❌ data was moved into the closure
    display();
}`,
      },
      {
        type: 'heading',
        text: 'The Iterator Trait',
      },
      {
        type: 'code',
        code: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // Iterators are lazy — nothing happens until you consume them
    let iter = numbers.iter(); // creates iterator, no computation yet

    // Collect — consume and produce a collection
    let doubled: Vec<i32> = numbers.iter().map(|x| x * 2).collect();
    println!("{:?}", doubled); // [2, 4, 6, 8, 10]

    // Filter — keep elements matching a predicate
    let evens: Vec<&i32> = numbers.iter().filter(|x| *x % 2 == 0).collect();
    println!("{:?}", evens); // [2, 4]

    // Chain operations
    let result: i32 = numbers
        .iter()
        .filter(|x| *x % 2 == 1)     // keep odds: 1, 3, 5
        .map(|x| x * 2)              // double: 2, 6, 10
        .sum();                       // sum: 18
    println!("{result}"); // 18
}`,
      },
      {
        type: 'heading',
        text: 'Common Iterator Methods',
      },
      {
        type: 'code',
        code: `fn main() {
    let numbers = vec![1, 2, 3, 4, 5];

    // any — does any element match?
    let has_even = numbers.iter().any(|&x| x % 2 == 0);
    println!("Has even: {has_even}"); // true

    // all — do all elements match?
    let all_positive = numbers.iter().all(|&x| x > 0);
    println!("All positive: {all_positive}"); // true

    // find — find first matching element
    let first_even = numbers.iter().find(|&&x| x % 2 == 0);
    println!("{:?}", first_even); // Some(2)

    // fold — like reduce
    let sum = numbers.iter().fold(0, |acc, x| acc + x);
    println!("Sum: {sum}"); // 15

    // Chaining for complex transformations
    let words = vec!["hello", "world", "rust"];
    let shouty: Vec<String> = words
        .iter()
        .map(|w| w.to_uppercase())
        .collect();
    println!("{:?}", shouty); // ["HELLO", "WORLD", "RUST"]
}`,
      },
      {
        type: 'tip',
        text: "Iterator adapters (`map`, `filter`, etc.) are **lazy**. They don't do anything until you call a **consuming adaptor** like `collect`, `sum`, `count`, or `for` loop. This lets Rust optimize the entire chain into a single pass.",
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the closure syntax to add two numbers.',
        codePrefix: `let add = `,
        codeSuffix: '| a + b;\nprintln!("{}", add(3, 4));',
        answer: '|a, b|',
        explanation:
          'Closure parameters go inside vertical pipes `|param1, param2|`. The body follows, optionally with curly braces. `|a, b| a + b` is a closure that takes two parameters and returns their sum.',
      },
      {
        type: 'mcq',
        question: 'What does it mean that iterators in Rust are "lazy"?',
        options: [
          'They run slowly',
          "They don't perform any computation until a consuming method is called",
          'They can only be used with lazy values',
          'They automatically optimize themselves',
        ],
        correct: 1,
        explanation:
          "Iterator adapters like `.map()` and `.filter()` don't execute anything immediately. They return new iterators that store the transformation. Only consuming methods like `.collect()`, `.sum()`, `.for_each()`, or a `for` loop trigger the actual computation.",
      },
      {
        type: 'code-fill',
        question: 'Complete the iterator chain to filter even numbers and collect into a Vec.',
        codePrefix: 'let evens: Vec<i32> = numbers.into_iter()\n    .',
        codeSuffix: '(|x| x % 2 == 0)\n    .collect();',
        answer: 'filter',
        explanation:
          '`.filter()` takes a closure that returns a boolean. Elements for which the closure returns `true` are kept; the rest are discarded. Here `|x| x % 2 == 0` keeps only even numbers.',
      },
      {
        type: 'mcq',
        question: 'What happens when a closure captures a variable using the `move` keyword?',
        options: [
          'The closure takes ownership of the captured variable',
          'The closure only borrows the variable',
          'The variable becomes available to all closures',
          'The variable is copied, not moved',
        ],
        correct: 0,
        explanation:
          '`move` forces the closure to take ownership of any captured variables. This is necessary when the closure will outlive the scope where the variables were created (e.g., spawning a thread). Without `move`, closures borrow variables by default.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 15 — Concurrency
  // ─────────────────────────────────────────
  {
    id: 15,
    title: 'Concurrency',
    emoji: '⚡',
    description: 'Write safe concurrent code with threads, channels, and shared state.',
    content: [
      {
        type: 'text',
        text: "Rust's ownership system extends to concurrency. The compiler catches data races at compile time — this is called **fearless concurrency**. If your concurrent code compiles, it's free of data races.",
      },
      {
        type: 'heading',
        text: 'Threads with std::thread',
      },
      {
        type: 'code',
        code: `use std::thread;
use std::time::Duration;

fn main() {
    // Spawn a new thread
    let handle = thread::spawn(|| {
        for i in 1..5 {
            println!("Spawned thread: {i}");
            thread::sleep(Duration::from_millis(1));
        }
    });

    // Main thread work
    for i in 1..3 {
        println!("Main thread: {i}");
        thread::sleep(Duration::from_millis(1));
    }

    // Wait for the spawned thread to finish
    handle.join().unwrap();

    // With move closures
    let v = vec![1, 2, 3];
    let handle = thread::spawn(move || {
        println!("Vector: {:?}", v);
    });
    handle.join().unwrap();
    // println!("{:?}", v); // ❌ v was moved into the thread
}`,
      },
      {
        type: 'heading',
        text: 'Message Passing with Channels',
      },
      {
        type: 'text',
        text: "Channels let threads communicate by sending messages. Rust's standard library provides multi-producer, single-consumer (mpsc) channels.",
      },
      {
        type: 'code',
        code: `use std::sync::mpsc;
use std::thread;

fn main() {
    // Create a channel
    let (tx, rx) = mpsc::channel();

    // Spawn a producer thread
    thread::spawn(move || {
        let vals = vec![
            String::from("hello"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];
        for val in vals {
            tx.send(val).unwrap();
            // val is MOVED — can't use it after sending
        }
    });

    // Receive messages in main thread
    for received in rx {
        println!("Got: {received}");
    }
}`,
      },
      {
        type: 'heading',
        text: 'Shared State with Arc<Mutex<T>>',
      },
      {
        type: 'text',
        text: 'For shared mutable state across threads, use `Arc<Mutex<T>>`. `Arc` (Atomic Reference Counting) enables shared ownership across threads, and `Mutex` ensures mutual exclusion.',
      },
      {
        type: 'code',
        code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Arc = thread-safe reference counting
    // Mutex = mutual exclusion (only one thread at a time)
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap()); // 10
}`,
      },
      {
        type: 'heading',
        text: 'Send and Sync Traits',
      },
      {
        type: 'text',
        text: "**`Send`** — a type is `Send` if ownership can be transferred safely between threads. Most Rust types are `Send`, but not all (e.g., `Rc<T>` is not).\n\n**`Sync`** — a type is `Sync` if it can be shared safely between threads via reference (`&T` is `Send`). Types like `Mutex<T>` are `Sync`.\n\nThese traits are **automatically implemented** by the compiler based on a type's composition. You rarely need to implement them manually.",
      },
      {
        type: 'tip',
        text: "Use `thread::spawn(move || ...)` to send owned data into a thread. Use `Arc<Mutex<T>>` for shared mutable state. Use `mpsc::channel()` for message passing. Start with channels — they're easier to reason about than shared state.",
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the code to wait for a spawned thread to finish.',
        codePrefix: `let handle = thread::spawn(|| {
    println!("Working...");
});

handle.`,
        codeSuffix: '().unwrap();',
        answer: 'join',
        explanation:
          '`handle.join()` blocks the current thread until the spawned thread finishes. It returns a `Result` — `Ok` if the thread completed, `Err` if it panicked. This is how you synchronize thread completion.',
      },
      {
        type: 'mcq',
        question: "Why can't `Rc<T>` be sent across threads?",
        options: [
          'Because Rc is not thread-safe — its reference counting is not atomic',
          'Because Rc is only available in the standard library',
          'Because Rc requires mutable access to work',
          'Actually, Rc can be sent across threads safely',
        ],
        correct: 0,
        explanation:
          '`Rc<T>` uses non-atomic reference counting for performance. If two threads simultaneously increment/decrement the reference count, it could become inconsistent. Use `Arc<T>` (atomic reference counting) instead for thread-safe shared ownership.',
      },
      {
        type: 'mcq',
        question: "What does `mpsc` stand for in Rust's channel implementation?",
        options: [
          'Multi-Process System Communication',
          'Multi-Producer, Single-Consumer',
          'Message Passing for Safe Concurrency',
          'Memory-Pinned Synchronization Channel',
        ],
        correct: 1,
        explanation:
          '`mpsc` stands for **Multi-Producer, Single-Consumer**. You can have multiple sending ends (by cloning `tx`) but only one receiving end (`rx`). All messages from all senders arrive at the single receiver in the order they were sent.',
      },
      {
        type: 'mcq',
        question: 'What is the purpose of `Arc<T>` in concurrent Rust code?',
        options: [
          'It provides atomic operations for integers',
          'It enables thread-safe reference counting, allowing multiple threads to share ownership',
          'It automatically synchronizes access to the inner value',
          'It creates a new thread for the wrapped value',
        ],
        correct: 1,
        explanation:
          '`Arc<T>` stands for "Atomic Reference Counting." It allows multiple threads to share ownership of a value via `Arc::clone()`, which atomically increments the reference count. It\'s the thread-safe counterpart of `Rc<T>`. Combine it with `Mutex<T>` for mutable shared state.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 16 — Modules & Packages
  // ─────────────────────────────────────────
  {
    id: 16,
    title: 'Modules & Packages',
    emoji: '📦',
    description: 'Organise Rust code with modules, packages, and the module system.',
    content: [
      {
        type: 'text',
        text: "As Rust programs grow, you need to organise code into multiple files. Rust's **module system** helps you structure code, control visibility, and manage namespaces.",
      },
      {
        type: 'heading',
        text: 'Packages and Crates',
      },
      {
        type: 'text',
        text: 'A **package** is a collection of crates defined by a `Cargo.toml` file. A **crate** is the smallest compilation unit — either a **binary crate** (executable) or a **library crate** (shared code). Every crate has a root module that the compiler starts from (`src/main.rs` or `src/lib.rs`).',
      },
      {
        type: 'code',
        code: `// Cargo.toml defines the package
// [package]
// name = "my_app"
// version = "0.1.0"

// src/lib.rs — library crate root
pub fn greet(name: &str) -> String {
    format!("Hello, {name}!")
}

// src/main.rs — binary crate root
// use my_app::greet;
// fn main() {
//     println!("{}", greet("Alice"));
// }`,
      },
      {
        type: 'heading',
        text: 'Defining Modules',
      },
      {
        type: 'code',
        code: `// src/lib.rs — declare modules
pub mod greeting;
mod utils; // private module

// src/greeting.rs
pub fn hello() -> String {
    "Hello!".to_string()
}

// Or inline:
// pub mod greeting {
//     pub fn hello() -> String {
//         "Hello!".to_string()
//     }
// }`,
      },
      {
        type: 'heading',
        text: 'The `pub` Keyword',
      },
      {
        type: 'text',
        text: 'Everything in Rust is **private** by default. Use `pub` to make items visible outside their module. There are also visibility modifiers:\n- `pub(self)` — private (default)\n- `pub(super)` — visible to parent module\n- `pub(crate)` — visible within the crate\n- `pub` — fully public',
      },
      {
        type: 'code',
        code: `pub mod network {
    pub fn connect() {}        // fully public
    pub(crate) fn ping() {}    // visible within crate
    fn secret() {}             // private — only in this module

    pub mod server {
        pub fn start() {
            super::ping();     // 'super' refers to parent module
        }
    }
}

// Using items from other modules
use crate::network::server;

fn main() {
    network::connect();
    server::start();
}`,
      },
      {
        type: 'heading',
        text: 'The `use` Keyword',
      },
      {
        type: 'code',
        code: `// Bring items into scope
use std::collections::HashMap;

// Nested paths
use std::{cmp::Ordering, io::{self, Write}};

// Rename with 'as'
use std::collections::HashMap as Map;

// Re-exporting
pub use crate::network::connect;

// External crate (in Cargo.toml):
// [dependencies]
// rand = "0.8"
use rand::Rng;

fn main() {
    let mut map = HashMap::new();
    map.insert(1, 2);
    let n: u32 = rand::thread_rng().gen();
}`,
      },
      {
        type: 'tip',
        text: 'Use `cargo add <crate_name>` to add dependencies from the command line. The `use` keyword creates a short path to an item — think of it like a symlink, not a copy.',
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the code to make a function visible outside its module.',
        codePrefix: `mod helpers {
    `,
        codeSuffix: ` fn calculate() -> i32 { 42 }
}

fn main() {
    let result = helpers::calculate();
}`,
        answer: 'pub',
        explanation:
          'Items in Rust modules are private by default. Adding `pub` before `fn` makes it public and accessible from outside the module. Without `pub`, `calculate()` would only be usable inside the `helpers` module.',
      },
      {
        type: 'mcq',
        question: 'What keyword references the parent module from a child module?',
        options: ['self', 'parent', 'super', 'crate'],
        correct: 2,
        explanation:
          '`super` in a module path refers to the parent module. For example, `super::ping()` in a nested module calls `ping()` from the parent. `crate` refers to the crate root, and `self` refers to the current module.',
      },
      {
        type: 'mcq',
        question: 'What does `pub(crate)` visibility mean?',
        options: [
          'The item is only visible within the current module',
          'The item is visible anywhere within the same crate, but not outside it',
          'The item is visible only to binary crates',
          'The item is only visible in Cargo.toml',
        ],
        correct: 1,
        explanation:
          "`pub(crate)` restricts visibility to the current crate. The item is accessible from any module within the crate but cannot be accessed from external crates. This is useful for internal APIs you don't want to expose publicly.",
      },
      {
        type: 'code-fill',
        question: 'Complete the use statement to import HashMap from std::collections.',
        codePrefix: `use `,
        codeSuffix: ';',
        answer: 'std::collections::HashMap',
        explanation:
          '`use std::collections::HashMap` brings the `HashMap` type into scope so you can write `HashMap::new()` instead of `std::collections::HashMap::new()`. The path follows the module hierarchy.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 17 — Lifetimes
  // ─────────────────────────────────────────
  {
    id: 17,
    title: 'Lifetimes',
    emoji: '🔄',
    description: 'Understand lifetime annotations that ensure references are always valid.',
    content: [
      {
        type: 'text',
        text: "**Lifetimes** are Rust's way of ensuring that all references are valid for as long as they're used. Every reference in Rust has a **lifetime** — the scope for which that reference is valid. Most lifetimes are inferred by the compiler.",
      },
      {
        type: 'heading',
        text: 'Why Lifetimes Matter',
      },
      {
        type: 'code',
        code: `// This would cause a dangling reference — Rust prevents it:
// fn main() {
//     let r;
//     {
//         let x = 5;
//         r = &x; // r borrows x, but x will be dropped...
//     } // x is dropped here
//     println!("{r}"); // ❌ r is now a dangling reference
// }

// Lifetime annotations tell the compiler how references relate:
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}

fn main() {
    let s1 = String::from("long");
    let s2 = String::from("short");
    let result = longest(&s1, &s2);
    println!("Longest: {result}");
}`,
      },
      {
        type: 'heading',
        text: 'Lifetime Annotation Syntax',
      },
      {
        type: 'code',
        code: `// Lifetime parameters start with ' (tick)
// Convention: 'a, 'b, 'c, etc.

// Single lifetime: all refs must live at least as long as 'a
fn first_word<'a>(s: &'a str) -> &'a str {
    s.split_whitespace().next().unwrap_or("")
}

// Two lifetimes: input refs may have different lifetimes
fn choose<'a, 'b>(first: &'a str, second: &'b str) -> &'a str {
    first // only returns 'first', so only 'a matters
}

// Lifetime in struct definitions
struct Excerpt<'a> {
    part: &'a str, // Excerpt cannot outlive the string it references
}

fn main() {
    let novel = String::from("Call me Ishmael...");
    let excerpt = Excerpt { part: &novel };
    println!("{}", excerpt.part);
}`,
      },
      {
        type: 'heading',
        text: 'Lifetime Elision',
      },
      {
        type: 'text',
        text: "The compiler can often infer lifetimes automatically. The **elision rules** apply to function signatures:\n\n1. Each input reference gets its own lifetime parameter\n2. If there's exactly one input lifetime, it's assigned to all output references\n3. If `&self` or `&mut self`, its lifetime is assigned to all output references",
      },
      {
        type: 'code',
        code: `// These are equivalent:
fn first_elided(s: &str) -> &str { &s[..1] }
fn first_explicit<'a>(s: &'a str) -> &'a str { &s[..1] }

// Method with &self — output gets &self's lifetime
impl<'a> Excerpt<'a> {
    fn announce_and_return(&self, announcement: &str) -> &str {
        println!("{announcement}");
        self.part
    }
}
// Equivalent to:
// fn announce_and_return<'b>(&'b self, announcement: &'b str) -> &'b str`,
      },
      {
        type: 'heading',
        text: 'The Static Lifetime',
      },
      {
        type: 'text',
        text: '`\'static` is a special lifetime that lasts for the entire program. String literals (`"hello"`) have type `&\'static str`. A `\'static` constraint means "this reference is valid forever" — use it sparingly.',
      },
      {
        type: 'code',
        code: `fn main() {
    let s: &'static str = "I live forever!";

    // A 'static bound means "no borrowed data"
    // — the value must be owned or 'static
    fn print_static(input: &'static str) {
        println!("{input}");
    }

    print_static(s); // ✅ string literal

    let owned = String::from("hello");
    // print_static(&owned); // ❌ &String doesn't live long enough
}`,
      },
      {
        type: 'tip',
        text: "Most of the time, you don't need to write lifetime annotations — the compiler elides them. Add them when the compiler tells you it can't figure out the relationships. Start with the simplest annotation that works.",
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question:
          'Complete the lifetime annotation for this function that returns the longer reference.',
        codePrefix: `fn longest<`,
        codeSuffix: `>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}`,
        answer: "'a",
        explanation:
          "The lifetime parameter `'a` is declared in angle brackets after the function name. It constrains both input references and the output to share the same lifetime — ensuring the returned reference is valid as long as both inputs.",
      },
      {
        type: 'mcq',
        question: "What does the `'static` lifetime mean?",
        options: [
          'The reference is only valid within static methods',
          'The reference lives for the entire duration of the program',
          'The value cannot be mutated',
          'The value is stored on the stack',
        ],
        correct: 1,
        explanation:
          '`\'static` means the reference is valid for the entire program. String literals (`"hello"`) are `&\'static str`. A `\'static` bound on a generic means "does not contain any borrowed references" (all data is owned or lives forever).',
      },
      {
        type: 'mcq',
        question: 'What are the lifetime elision rules for function parameters?',
        options: [
          'Every reference must have an explicit lifetime annotation',
          'Each input reference gets its own lifetime; one input lifetime is assigned to outputs; &self lifetime goes to outputs',
          "All references automatically get the 'static lifetime",
          'Only the first reference needs a lifetime annotation',
        ],
        correct: 1,
        explanation:
          "The three elision rules: (1) each elided input reference gets a distinct lifetime, (2) if exactly one input lifetime, it's assigned to all elided outputs, (3) if `&self`/`&mut self`, its lifetime is assigned to output references. These cover the vast majority of cases.",
      },
      {
        type: 'code-fill',
        question: 'Complete the struct definition with a lifetime parameter.',
        codePrefix: `struct Container<`,
        codeSuffix: `> {
    value: &'a str,
}`,
        answer: "'a",
        explanation:
          "When a struct holds references, it needs a lifetime parameter. `struct Container<'a>` declares the lifetime, and `value: &'a str` uses it. The struct cannot outlive the reference it holds.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 18 — Smart Pointers
  // ─────────────────────────────────────────
  {
    id: 18,
    title: 'Smart Pointers',
    emoji: '🎯',
    description: 'Explore Box, Rc, RefCell, and the interior mutability pattern.',
    content: [
      {
        type: 'text',
        text: "**Smart pointers** are data structures that act like pointers but with additional metadata and capabilities. Rust's standard library provides several: `Box<T>`, `Rc<T>`, and `RefCell<T>` are the most commonly used.",
      },
      {
        type: 'heading',
        text: 'Box<T> — Heap Allocation',
      },
      {
        type: 'text',
        text: "`Box<T>` allocates data on the heap. The simplest smart pointer — use it when you have a type whose size can't be known at compile time (like recursive types) or when you want to transfer ownership of large data without copying.",
      },
      {
        type: 'code',
        code: `// Recursive type — must use Box to break the infinite size
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let list = Cons(1, Box::new(Cons(2, Box::new(Cons(3, Box::new(Nil))))));

    // Box also useful for large data moves
    let large_data = Box::new([0u8; 1024]); // 1KB on heap
    let moved = large_data; // cheap — just copies the pointer
}`,
      },
      {
        type: 'heading',
        text: 'Rc<T> — Reference Counting',
      },
      {
        type: 'text',
        text: '`Rc<T>` (Reference Counted) enables **multiple ownership**. It keeps a reference count; when all `Rc` clones go out of scope, the value is dropped. Use `Rc` when you want to share read-only data across multiple parts of your code.',
      },
      {
        type: 'code',
        code: `use std::rc::Rc;

enum List {
    Cons(i32, Rc<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("Count: {}", Rc::strong_count(&a)); // 1

    let b = Cons(3, Rc::clone(&a));
    println!("Count: {}", Rc::strong_count(&a)); // 2

    let c = Cons(4, Rc::clone(&a));
    println!("Count: {}", Rc::strong_count(&a)); // 3
}
// When b and c drop, count goes to 1
// When a drops, count goes to 0 — memory is freed`,
      },
      {
        type: 'heading',
        text: 'RefCell<T> — Interior Mutability',
      },
      {
        type: 'text',
        text: "`RefCell<T>` allows **interior mutability** — mutating data through an immutable reference. It enforces borrowing rules at **runtime** instead of compile time. This is useful when you need mutation but can't use `&mut`.",
      },
      {
        type: 'code',
        code: `use std::cell::RefCell;

fn main() {
    let data = RefCell::new(5);

    // borrow() gives Ref<T> — immutable borrow
    let value = data.borrow();
    println!("{value}");

    // borrow_mut() gives RefMut<T> — mutable borrow
    *data.borrow_mut() += 1;

    // Runtime check — this would panic:
    // let mut_ref = data.borrow_mut();
    // let imm_ref = data.borrow(); // panic!
    // drop(mut_ref); // fix: drop first

    println!("{}", data.borrow()); // 6
}

// Common pattern: Rc<RefCell<T>> for shared mutable state
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let shared = Rc::new(RefCell::new(42));
    let clone1 = Rc::clone(&shared);
    let clone2 = Rc::clone(&shared);

    *shared.borrow_mut() += 1; // mutate through any Rc
    println!("{}", clone1.borrow()); // 43
    println!("{}", clone2.borrow()); // 43
}`,
      },
      {
        type: 'tip',
        text: 'Choose wisely: `Box<T>` for single ownership on the heap, `Rc<T>` for shared read-only access, `RefCell<T>` for interior mutability, and `Rc<RefCell<T>>` for shared mutable state. For threads, use `Arc<Mutex<T>>` instead.',
      },
    ],
    quizzes: [
      {
        type: 'mcq',
        question: 'When would you use `Box<T>` instead of a regular stack variable?',
        options: [
          'When T is a recursive type with unknown size at compile time',
          'When you need multiple ownership of the data',
          'When you need runtime borrow checking',
          'When you want to share data across threads',
        ],
        correct: 0,
        explanation:
          "`Box<T>` is ideal for recursive types (like linked lists) where the compiler cannot determine the type's size at compile time. It's also useful for transferring ownership of large data without copying the entire value on the stack.",
      },
      {
        type: 'code-fill',
        question: 'Complete the code to clone an Rc pointer.',
        codePrefix: `use std::rc::Rc;

let a = Rc::new(42);
let b = `,
        codeSuffix: ';',
        answer: 'Rc::clone(&a)',
        explanation:
          '`Rc::clone(&a)` increments the reference count and returns a new `Rc` pointing to the same data. Rc::clone is cheap — it only copies the pointer and increments the count, not the underlying data.',
      },
      {
        type: 'mcq',
        question: 'How does `RefCell<T>` differ from `Box<T>`?',
        options: [
          'RefCell enforces borrowing rules at runtime; Box enforces them at compile time',
          'RefCell is for heap allocation; Box is not',
          'RefCell is thread-safe; Box is not',
          'There is no difference',
        ],
        correct: 0,
        explanation:
          "`Box<T>` enforces Rust's borrowing rules at **compile time** — the compiler rejects invalid code. `RefCell<T>` enforces the same rules at **runtime** — calling `borrow_mut()` while another borrow exists will panic. This enables interior mutability patterns.",
      },
      {
        type: 'mcq',
        question: "Why can't `Rc<T>` be used across threads?",
        options: [
          'Because Rc is not Send — its reference counting is not atomic',
          'Because Rc is only available in certain modules',
          'Because Rc requires mutable access to read values',
          'Rc can be used across threads safely',
        ],
        correct: 0,
        explanation:
          '`Rc<T>` uses non-atomic reference counting, which is not thread-safe. Incrementing/decrementing the count from multiple threads could cause a data race. Use `Arc<T>` (Atomic Reference Counting) for thread-safe shared ownership.',
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 19 — Macros
  // ─────────────────────────────────────────
  {
    id: 19,
    title: 'Macros',
    emoji: '🔮',
    description: "Write code that writes code with Rust's macro system.",
    content: [
      {
        type: 'text',
        text: '**Macros** are a way of writing code that writes other code, known as **metaprogramming**. A macro is expanded into source code before the compiler processes it. Rust has two main macro types: **declarative** macros (`macro_rules!`) and **procedural** macros.',
      },
      {
        type: 'heading',
        text: 'Why Macros?',
      },
      {
        type: 'text',
        text: 'Macros can reduce boilerplate, create domain-specific languages (DSLs), and implement traits. Unlike functions, macros can take a variable number of arguments and operate on the syntax level — they receive tokens, not values.',
      },
      {
        type: 'heading',
        text: 'Declarative Macros with macro_rules!',
      },
      {
        type: 'code',
        code: `// A simple macro that creates a greeting
macro_rules! greet {
    ($name:expr) => {
        format!("Hello, {}!", $name)
    };
    () => {
        String::from("Hello, world!")
    };
}

fn main() {
    println!("{}", greet!("Alice")); // "Hello, Alice!"
    println!("{}", greet!());        // "Hello, world!"
}

// vec! macro — built in, but you could write something similar:
macro_rules! my_vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}

fn main() {
    let v = my_vec![1, 2, 3];
    println!("{:?}", v); // [1, 2, 3]
}`,
      },
      {
        type: 'heading',
        text: 'Common Built-in Macros',
      },
      {
        type: 'code',
        code: `fn main() {
    // println! — formatted printing
    println!("Hello, {}!", "world");
    println!("{name} is {age}", name = "Alice", age = 30);
    println!("{:?}", vec![1, 2, 3]); // debug formatting

    // format! — returns a String
    let s = format!("x = {x}", x = 42);

    // vec! — create a Vec
    let v = vec![1, 2, 3, 4, 5];

    // assert! — testing
    assert!(true);
    assert_eq!(2 + 2, 4);

    // todo! / unimplemented! — placeholders
    fn feature_not_done() {
        todo!("Implement this later");
    }

    // dbg! — quick debugging
    let x = 42;
    let y = dbg!(x * 2); // prints: [src/main.rs:20] x * 2 = 84
    println!("{y}");

    // include_str! / include_bytes! — embed files at compile time
    let html = include_str!("template.html");
}`,
      },
      {
        type: 'heading',
        text: 'Macro Patterns',
      },
      {
        type: 'code',
        code: `// Pattern types in macro_rules!:
// expr — an expression
// ident — an identifier
// ty — a type
// stmt — a statement
// block — a block of code
// pat — a pattern
// tt — a token tree

macro_rules! create_function {
    ($name:ident) => {
        fn $name() {
            println!("Function {} was called", stringify!($name));
        }
    };
}

create_function!(foo);
create_function!(bar);

fn main() {
    foo(); // "Function foo was called"
    bar(); // "Function bar was called"
}

// Repeating patterns with + (one or more) or * (zero or more)
macro_rules! make_map {
    ($($key:expr => $val:expr),*) => {
        {
            let mut map = std::collections::HashMap::new();
            $(map.insert($key, $val);)*
            map
        }
    };
}

fn main() {
    let map = make_map!("a" => 1, "b" => 2, "c" => 3);
    println!("{:?}", map);
}`,
      },
      {
        type: 'tip',
        text: 'Macros end with `!` — this distinguishes them from function calls. `macro_rules!` is itself a macro! For complex macros, consider a procedural macro crate. When in doubt, prefer functions over macros — functions are simpler to debug.',
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the stringify! macro call to convert an identifier to a string.',
        codePrefix: `let name = "hello";
let s = `,
        codeSuffix: '(name); // "name" (the identifier, not the value)',
        answer: 'stringify!',
        explanation:
          '`stringify!($name)` converts an identifier or token tree into a string literal at compile time. Unlike `format!`, this works on the syntax level — it captures the code itself, not the runtime value.',
      },
      {
        type: 'mcq',
        question: 'What is the key difference between a macro and a function?',
        options: [
          'Macros are faster than functions',
          'Macros operate at the syntax level — they receive tokens and produce code before compilation; functions receive values at runtime',
          'Functions can take variable arguments; macros cannot',
          'There is no difference — macros are just special functions',
        ],
        correct: 1,
        explanation:
          'Macros are **metaprogramming** — they operate on Rust syntax (tokens) and produce code that is then compiled. This lets them do things functions cannot: take variable numbers of arguments, implement traits, or generate new functions.',
      },
      {
        type: 'mcq',
        question: 'What does the `vec!` macro expand to?',
        options: [
          'A fixed-size array',
          'Code that creates a Vec and pushes each element',
          'A hashmap with sequential keys',
          'A linked list',
        ],
        correct: 1,
        explanation:
          'The `vec!` macro expands into code that creates a new `Vec` and pushes each element. For example, `vec![1, 2, 3]` expands to something like `{ let mut v = Vec::new(); v.push(1); v.push(2); v.push(3); v }`.',
      },
      {
        type: 'code-fill',
        question: 'Complete the macro_rules! invocation to create a macro.',
        codePrefix: ``,
        codeSuffix: `! say_hello {
    () => {
        println!("Hello!");
    };
}`,
        answer: 'macro_rules',
        explanation:
          "`macro_rules!` is the syntax for defining a declarative macro. The exclamation mark shows it's a macro invocation itself. After the name, you write matching arms with patterns and corresponding code blocks.",
      },
    ],
  },

  // ─────────────────────────────────────────
  // LESSON 20 — Testing & Documentation
  // ─────────────────────────────────────────
  {
    id: 20,
    title: 'Testing & Documentation',
    emoji: '✅',
    description: 'Write tests and documentation to build reliable, maintainable Rust code.',
    content: [
      {
        type: 'text',
        text: 'Rust has a built-in **testing framework** and a **documentation system** (`rustdoc`). Tests run with `cargo test` and documentation is generated with `cargo doc`. Both are first-class parts of the Rust ecosystem.',
      },
      {
        type: 'heading',
        text: 'Writing Unit Tests',
      },
      {
        type: 'code',
        code: `// Tests go in a module annotated with #[cfg(test)]
#[cfg(test)]
mod tests {
    // Bring parent module items into scope
    use super::*;

    #[test]
    fn test_addition() {
        assert_eq!(2 + 2, 4);
    }

    #[test]
    fn test_string_contains() {
        let s = String::from("hello world");
        assert!(s.contains("hello"));
    }

    #[test]
    fn test_not_equal() {
        assert_ne!(10, 20);
    }

    // Test that a panic is expected
    #[test]
    #[should_panic(expected = "divide by zero")]
    fn test_divide_by_zero() {
        let _ = 1 / 0;
    }

    // Test with Result return type
    #[test]
    fn test_with_result() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("math is broken"))
        }
    }
}`,
      },
      {
        type: 'heading',
        text: 'Testing the Function Itself',
      },
      {
        type: 'code',
        code: `pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err(String::from("Cannot divide by zero"))
    } else {
        Ok(a / b)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn add_works() {
        assert_eq!(add(2, 3), 5);
        assert_eq!(add(-1, 1), 0);
    }

    #[test]
    fn divide_works() {
        assert_eq!(divide(10.0, 2.0).unwrap(), 5.0);
        assert!(divide(1.0, 0.0).is_err());
    }
}`,
      },
      {
        type: 'heading',
        text: 'Integration Tests',
      },
      {
        type: 'text',
        text: 'Integration tests are placed in a `tests/` directory at the crate root. Each file in `tests/` is compiled as a separate crate. They test your library from the outside — just like a user would.',
      },
      {
        type: 'code',
        code: `// tests/integration_test.rs
// Only works if your crate is a library (has src/lib.rs)
use my_crate;

#[test]
fn test_from_integration() {
    let result = my_crate::add(2, 2);
    assert_eq!(result, 4);
}

// Common pattern: create a tests/common/mod.rs for shared setup
// tests/common/mod.rs:
// pub fn setup() { ... }
// Then use in tests:
// mod common;
// common::setup();`,
      },
      {
        type: 'heading',
        text: 'Documentation with /// and //!',
      },
      {
        type: 'code',
        code:
          '/// Adds two numbers together.\n' +
          '///\n' +
          '/// # Examples\n' +
          '///\n' +
          '/// ```\n' +
          '/// let result = add(2, 3);\n' +
          '/// assert_eq!(result, 5);\n' +
          '/// ```\n' +
          '///\n' +
          '/// # Panics\n' +
          '///\n' +
          '/// This function does not panic.\n' +
          '///\n' +
          '/// # Errors\n' +
          '///\n' +
          '/// This function always succeeds -- it never returns a Result.\n' +
          'pub fn add(a: i32, b: i32) -> i32 {\n' +
          '    a + b\n' +
          '}\n' +
          '\n' +
          '/// Divides two numbers.\n' +
          '///\n' +
          '/// Returns an error if dividing by zero.\n' +
          '///\n' +
          '/// # Examples\n' +
          '///\n' +
          '/// ```\n' +
          '/// assert_eq!(divide(10.0, 2.0).unwrap(), 5.0);\n' +
          '/// assert!(divide(1.0, 0.0).is_err());\n' +
          '/// ```\n' +
          'pub fn divide(a: f64, b: f64) -> Result<f64, String> {\n' +
          '    if b == 0.0 {\n' +
          '        Err(String::from("Cannot divide by zero"))\n' +
          '    } else {\n' +
          '        Ok(a / b)\n' +
          '    }\n' +
          '}\n' +
          '\n' +
          '// Inner doc comments for modules and crates:\n' +
          '//! # RustRover\n' +
          '//!\n' +
          '//! rust_rover is a collection of utilities for learning Rust.\n' +
          '//! This documentation was generated with cargo doc.',
      },
      {
        type: 'heading',
        text: 'Running Tests',
      },
      {
        type: 'code',
        code: `// Run all tests
// $ cargo test

// Run a specific test by name
// $ cargo test test_addition

// Run tests, showing output:
// $ cargo test -- --nocapture

// Include ignored tests:
// $ cargo test -- --ignored

// Run only doc tests (examples in doc comments):
// $ cargo test --doc

// Build docs and open in browser:
// $ cargo doc --open`,
      },
      {
        type: 'tip',
        text: "Doc comments (`///`) support Markdown and code examples. The code examples in doc comments are run as **doc tests** during `cargo test` — ensuring your examples stay correct as your code evolves. This is one of Rust's most loved features!",
      },
    ],
    quizzes: [
      {
        type: 'code-fill',
        question: 'Complete the attribute that marks a function as a test.',
        codePrefix: `#[`,
        codeSuffix: `]
fn test_works() {
    assert!(true);
}`,
        answer: 'test',
        explanation:
          'The `#[test]` attribute marks a function as a test. The test runner (`cargo test`) discovers and runs all functions with this attribute. If the function panics, the test fails. If it completes without panicking, the test passes.',
      },
      {
        type: 'code-fill',
        question: 'Complete the assertion macro to check that two values are equal.',
        codePrefix: `#[test]
fn test_sum() {
    `,
        codeSuffix: `(2 + 2, 4);
}`,
        answer: 'assert_eq!',
        explanation:
          "`assert_eq!(left, right)` asserts that the two arguments are equal. If they're not, the macro panics with a message showing both values. It's the most common assertion in Rust tests.",
      },
      {
        type: 'mcq',
        question: 'Where do integration tests live in a Rust project?',
        options: [
          'In a `tests/` directory at the crate root',
          'Inline in the source files with #[cfg(test)]',
          'In a separate `integration_tests` crate',
          'In the Cargo.toml file',
        ],
        correct: 0,
        explanation:
          "Integration tests go in the `tests/` directory at the crate root. Each `.rs` file there is compiled as its own crate and can only access your library's public API. This tests your code from the consumer's perspective.",
      },
      {
        type: 'mcq',
        question: 'What happens to code examples in Rust doc comments during `cargo test`?',
        options: [
          'They are ignored during testing',
          'They are compiled and run as doc tests',
          'They are only checked for syntax errors',
          'They are printed as documentation, not executed',
        ],
        correct: 1,
        explanation:
          "Code examples in `///` doc comments are run as **doc tests** during `cargo test` (with `cargo test --doc`). This ensures your examples stay synchronized with your actual code — one of Rust's unique features that guarantees correct documentation.",
      },
    ],
  },
];

export default lessons;
