# Core Java Interview Preparation for Freshers to Intermediate

## 1. Scope and Interview Focus

This preparation is focused on Core Java only. The goal is to build strong interview readiness for fresher-to-intermediate Java roles without spending time on low-value or advanced enterprise topics that are not typically expected in Java core interviews.

Primary areas:
- JVM, JDK, JRE, and Java memory model
- Core Java fundamentals
- Object-oriented programming
- Collections framework
- Exception handling
- Multithreading and concurrency
- Java 8+ features

This guide emphasizes practical understanding, common interview questions, and the reasoning behind code behavior.

---

## 2. JVM, JDK, JRE, and Memory Management

### 2.1 JVM vs JDK vs JRE

- JRE: Java Runtime Environment
  - contains JVM and runtime libraries required to run Java programs
- JDK: Java Development Kit
  - contains JRE + compiler + tools like javac, debugger, etc.
- JVM: Java Virtual Machine
  - loads and executes Java bytecode
  - provides platform independence

### Common interview answer
Java source code is compiled into bytecode. The JVM executes this bytecode on different platforms, which is why Java is platform-independent.

### 2.2 Java memory areas

Important memory regions:
- Heap: objects are created here
- Stack: method calls, local variables, reference variables
- Method Area / Metaspace: class metadata, static variables, method code
- PC Register: tracks the current instruction of a thread
- Native Method Stack: for native method execution

### 2.3 Heap vs Stack

- Stack is used for method execution and local variables
- Heap stores objects
- Primitive values usually live on stack
- Objects live on heap, referenced from stack variables

### 2.4 Garbage Collection

- Java manages memory automatically through GC
- Objects become eligible for GC when no live references remain
- GC is not deterministic; it runs when needed
- `System.gc()` is only a request, not a guarantee

### 2.5 Young Generation and Old Generation

In HotSpot JVM:
- Young Generation: Eden + Survivor spaces
- Old Generation: long-lived objects move here

Minor GC cleans young generation; major GC touches old generation.

### 2.6 Common questions
- What is the difference between JDK and JRE?
- What is the role of the JVM?
- Why is Java platform independent?
- What is garbage collection?
- What is the difference between stack and heap memory?
- What is memory leak in Java?

---

## 3. Core Java Fundamentals

### 3.1 Data types

Primitive types:
- byte, short, int, long, float, double, char, boolean

Reference types:
- String, arrays, classes, interfaces, enums

### 3.2 Variables

- Local variables: declared inside methods
- Instance variables: declared in a class, per object
- Static variables: belong to class, shared across all instances

### 3.3 Static, final, this, super

- `static`: class-level member
- `final`: cannot be changed or overridden
- `this`: current object reference
- `super`: parent class reference

### 3.4 Constructors

- Same name as class
- No return type
- Used to initialize objects
- Constructor overloading is possible

### 3.5 Method overloading vs overriding

Overloading:
- same method name, different parameter list
- compile-time polymorphism

Overriding:
- same method signature in subclass
- runtime polymorphism

### 3.6 Pass by value in Java

Java is pass by value.
- Primitive values are copied
- Object references are also copied by value
- The original object is not copied

### 3.7 String, StringBuilder, StringBuffer

- `String`: immutable
- `StringBuilder`: mutable, not thread-safe, faster
- `StringBuffer`: mutable, thread-safe, synchronized

### 3.8 Why String is immutable

- memory safety
- thread safety
- string pool optimization
- hashCode stability for collections

### 3.9 Common questions
- What is the difference between `==` and `.equals()`?
- What is method overloading?
- What is method overriding?
- What is a constructor?
- Why is Java pass by value?
- Why is String immutable?
- What is `final` keyword used for?

---

## 4. Object-Oriented Programming (OOP)

### 4.1 OOP principles

- Encapsulation: hide implementation, expose behavior
- Inheritance: reusability and specialization
- Polymorphism: same action, different behavior
- Abstraction: expose essentials, hide complexity

### 4.2 Encapsulation

Encapsulation groups data and methods together and restricts direct access using access modifiers.

### 4.3 Inheritance

A subclass inherits from a superclass.
- promotes code reuse
- supports polymorphism
- single inheritance for classes in Java

### 4.4 Polymorphism

- method overloading: compile-time polymorphism
- method overriding: runtime polymorphism

### 4.5 Abstract class vs Interface

Abstract class:
- can have concrete methods and abstract methods
- can have constructor
- used when classes share common behavior

Interface:
- contract for classes
- can have default methods and static methods from Java 8 onward
- a class can implement multiple interfaces

### 4.6 Access modifiers

- public: accessible everywhere
- protected: same package or subclasses
- default (package-private): same package only
- private: same class only

### 4.7 `instanceof`

Used to check whether an object is an instance of a given class or interface.

### 4.8 common questions
- What is encapsulation?
- What is inheritance?
- What is polymorphism?
- Difference between abstract class and interface?
- Why use interfaces?
- Can a class extend multiple classes?
- Can a class implement multiple interfaces?

---

## 5. Collections Framework

### 5.1 Collection hierarchy

Core interfaces:
- List
- Set
- Map
- Queue

### 5.2 List implementations

- ArrayList: dynamic array, fast random access, good for read-heavy operations
- LinkedList: doubly-linked list, good for frequent insertions/deletions
- Vector: synchronized legacy class
- Stack: LIFO legacy class

### 5.3 Set implementations

- HashSet: no duplicates, no order guarantee
- LinkedHashSet: insertion order
- TreeSet: sorted order

### 5.4 Map implementations

- HashMap: key-value pairs, no order guarantee, allows one null key
- LinkedHashMap: preserves insertion order
- TreeMap: sorted by keys
- Hashtable: synchronized legacy class, no null keys/values

### 5.5 Important differences

- List allows duplicates; Set does not
- Map stores key-value pairs
- ArrayList uses index-based retrieval; LinkedList is better at insert/delete in middle
- HashSet uses hashing; TreeSet uses sorting

### 5.6 Comparable vs Comparator

Comparable:
- natural ordering defined inside the class

Comparator:
- custom sorting defined externally

### 5.7 HashMap internals (important follow-up)

HashMap uses:
- bucket array
- hashCode() and equals()
- collision handling
- resizing when capacity grows

The key contract:
- if two objects are equal, their hashCode must be equal
- overwrite equals() only when hashCode() is also overridden

### 5.8 Fail-fast behavior

Iterators of many collection classes fail fast if the collection is modified structurally during iteration, except through the iterator itself.

### 5.9 Common questions
- Difference between ArrayList and LinkedList?
- Difference between HashMap and HashSet?
- Difference between HashMap and Hashtable?
- What is the difference between List, Set, and Map?
- What is Comparable vs Comparator?
- Can HashMap have duplicate keys?
- Why override hashCode and equals together?
- What is fail-fast?

---

## 6. Exception Handling

### 6.1 Exception hierarchy

`Throwable`
- `Error`
- `Exception`

`Exception`
- checked exceptions
- unchecked exceptions (`RuntimeException` and its subclasses)

### 6.2 Checked vs Unchecked exceptions

Checked exceptions:
- must be handled or declared using `throws`
- examples: `IOException`, `SQLException`

Unchecked exceptions:
- do not need explicit handling
- examples: `NullPointerException`, `ArithmeticException`

### 6.3 try, catch, finally, throw, throws

- `try`: code that may throw an exception
- `catch`: handles the exception
- `finally`: executes regardless of success/failure
- `throw`: explicitly throws an exception
- `throws`: declares possible exceptions

### 6.4 Try-with-resources

Used to auto-close resources like streams and database connections.

### 6.5 finally block behavior

`finally` usually executes even if exception occurs. It is used for cleanup.

### 6.6 Common questions
- What is the difference between checked and unchecked exceptions?
- What is the purpose of `finally`?
- Difference between `throw` and `throws`?
- What is try-with-resources?
- Can a `finally` block throw an exception?
- Why are custom exceptions used?

---

## 7. Multithreading and Concurrency

### 7.1 What is a thread?

A thread is an independent path of execution inside a program.

### 7.2 Ways to create threads

- Extend `Thread`
- Implement `Runnable`
- Use `Callable` and `ExecutorService`

### 7.3 Thread lifecycle

- New
- Runnable
- Waiting / Blocked / Timed Waiting
- Terminated

### 7.4 Synchronization

Used to prevent multiple threads from accessing shared resources simultaneously.

### 7.5 `wait()`, `notify()`, `notifyAll()`

Used for thread coordination.

- `wait()`: releases lock and waits
- `notify()`: wakes one waiting thread
- `notifyAll()`: wakes all waiting threads

### 7.6 `sleep()` vs `wait()`

- `sleep()` does not release the lock
- `wait()` releases the lock and waits until notified

### 7.7 `volatile`

Used to ensure visibility of changes across threads.

### 7.8 Deadlock, race condition, starvation

- Race condition: inconsistent result due to concurrent access
- Deadlock: two or more threads waiting on each other
- Starvation: a thread never gets CPU time or resources

### 7.9 Common questions
- Difference between `Thread` and `Runnable`?
- What is synchronization?
- What is deadlock?
- What is volatile?
- What is race condition?
- Difference between `wait()` and `sleep()`?
- Why use ExecutorService?

---

## 8. Java 8+ Features

### 8.1 Lambda expressions

Lambda is a concise way to implement functional interfaces.

Example:
```java
list.forEach(item -> System.out.println(item));
```

### 8.2 Functional interface

An interface with exactly one abstract method.
Examples:
- Runnable
- Callable
- Comparator
- Predicate
- Function
- Consumer

### 8.3 Stream API

Used to process collections in a functional style.

Common operations:
- `filter()`
- `map()`
- `sorted()`
- `reduce()`
- `collect()`

### 8.4 Optional

Represents a value that may or may not be present.
Helps avoid null-related errors.

### 8.5 Default methods in interfaces

Introduced in Java 8 to extend interfaces without breaking implementations.

### 8.6 Method references

Shorter syntax for lambda expressions.

Example:
```java
System.out::println
```

### 8.7 Date and Time API

The `java.time` package provides modern date and time classes like:
- `LocalDate`
- `LocalTime`
- `LocalDateTime`
- `DateTimeFormatter`

### 8.8 Common questions
- What is a lambda expression?
- What is a functional interface?
- What is Stream API?
- Difference between `filter()` and `map()`?
- What is Optional?
- Why are default methods useful?
- What is the benefit of `java.time` API?

---

## 9. Frequently Asked Core Java Interview Questions

1. What is the difference between JDK, JRE, and JVM?
2. Why is Java platform independent?
3. What is the difference between `String`, `StringBuilder`, and `StringBuffer`?
4. What is the difference between `==` and `.equals()`?
5. What is method overloading and overriding?
6. What is a constructor?
7. What is the difference between an abstract class and an interface?
8. What is the difference between ArrayList and LinkedList?
9. What is the difference between HashMap and Hashtable?
10. What is the difference between HashSet and TreeSet?
11. What is the difference between checked and unchecked exceptions?
12. What is the purpose of `finally`?
13. What is the difference between `throw` and `throws`?
14. What is multithreading?
15. What is synchronization?
16. What is the difference between `wait()` and `sleep()`?
17. What is deadlock?
18. What is a lambda expression?
19. What is a functional interface?
20. What is the Stream API?
21. What is Optional?
22. What is the purpose of garbage collection?
23. What is heap memory vs stack memory?
24. Why is String immutable?
25. Why do we override `hashCode()` and `equals()` together?

---

## 10. How to answer interview questions well

Strong answers are not just definitions; they show reasoning.

Good answer pattern:
1. define the concept
2. explain the practical use case
3. mention trade-offs or edge cases
4. give a small example

Example:
- Instead of: “HashMap stores key-value pairs.”
- Better: “HashMap stores data in buckets based on the hash code of the key. It provides average O(1) lookup, but ordering is not guaranteed. If you need sorted keys, use TreeMap.”

This type of answer shows actual understanding.

---

## 11. Final Revision Checklist

Before the interview, be comfortable with:
- JVM, JDK, JRE
- heap vs stack
- garbage collection
- primitives vs references
- String immutability
- method overloading and overriding
- abstract class vs interface
- List, Set, Map differences
- ArrayList vs LinkedList
- HashMap basics
- checked vs unchecked exceptions
- try-catch-finally
- thread basics
- synchronized, wait, notify
- lambda, stream, Optional

---

## 12. Final Advice

For fresher and early-intermediate Java interviews, the key is not to memorize dry definitions. The key is to explain why a concept exists, when it is used, what pitfall it avoids, and how it behaves in real code.

The strongest candidates are those who can reason about code and explain trade-offs clearly.

This preparation is sufficient for most fresher-level to intermediate-level Core Java interviews.
