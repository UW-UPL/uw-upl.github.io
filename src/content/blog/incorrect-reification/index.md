---
title: "Incorrect Reification: An Anti-Pattern"
pubDate: "2022-02-25"
description: AWS offers free lessons for developers who want to learn about their products. Just be careful when following the lab tutorial and use software that is not free. 
author: Phoenix Kahlo
---

For better or for worse, what entices me in creating software is less the prospect of engineering a working thing and more the structural elegance of a well-architectured system fitting together neatly. I tend to dive into some vastly ambitious project of creating a framework or engine of some sort, typically with self-awareness that I’ll get bored and move on once I’ve gotten a sense of what does and doesn’t work elegantly about the approach.

There’s a certain design anti-pattern I’ve noticed sometimes emerging in these projects and I’d like to discuss it. I call it incorrect reification, and essentially it’s when you implement something as an API when it should merely be a pattern.

#### “Reification”

Reification refers to creating a concrete representation for something abstract. It’s a general term but is used in specific ways within software [[wikipedia: _Reification (computer science)_]](https://en.wikipedia.org/wiki/Reification_(computer_science)).

I'll use Java's reflection API as an example. In Java, classes exists in an abstract sense. The language specification describes abstractly what classes are and what properties they can have, the syntax for declaring them, what restraints there are on the forms a class can take, how a class should behave (see [[_Java Lang SE 17 Spec_, ch. 8]](https://docs.oracle.com/javase/specs/jls/se17/jls17.pdf#%5B%7B%22num%22%3A5138%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C72%2C590%2Cnull%5D)). The VM specification describes the bytecode form of class files, and how a VM should load, link, and interpret them (see [[_Java VM SE 17 Spec_, ch. 4]](https://docs.oracle.com/javase/specs/jvms/se17/jvms17.pdf#%5B%7B%22num%22%3A376%2C%22gen%22%3A0%7D%2C%7B%22name%22%3A%22XYZ%22%7D%2C72%2C590%2Cnull%5D)).

However, Java also has the `java.lang.Class` class. Instances of `java.lang.Class` are reified forms of java classes. For example, consider the following java code:

```java
import java.lang.Class;
import java.lang.reflect.Method;

Class c = String.class;
for (Method m : c.getMethods()) {
    System.out.println(m.getName());
}
```

The variable `c` will hold an object representing the class `String`. The for loop will iterate through an array of objects representing `String`’s methods (such as `charAt`, `equals`, etc.) and print the name of each. `c` is an instance of `java.lang.Class`, a concrete object standing for the otherwise abstract concept of a class, which can be passed around as data and probed to reveal and manipulate properties of that class. As such we can describe this as reification.

#### Frameworks as Reification

Reification is also a decent way to frame a type of thing that happens when designing software frameworks.

One could conceive of a pure library that provides raw functionality with no presumption of how that functionality will be used. For example, a fast Fourier transform library (eg. [[rustfft docs]](https://docs.rs/rustfft/latest/rustfft/)) provides functionality with precisely and abstractly defined mathematical behavior and time complexity,  while making nearly no presumption of which of the many conceivable applications the FFT will be applied to.

On the other hand, consider a web framework.

In web frameworks, a "route" abstractly refers to some site of behavior or code that a client can hit at a particular path with some particular set of parameters, like GETing an HTML document or POSTing to some `/newuser` path. As such, any web framework will provide faculties to implement the pattern of “routes.” Consider the rocket framework’s explanation of how it achieves this: [[rocket.rs overview]](https://rocket.rs/v0.5-rc/overview/).

```rust
#[macro_use]
extern crate rocket;

#[get("/hello/<name>/<age>")]
fn hello(name: &str, age: u8) -> String {
    format!("Hello, {} year old named {}!", age, name)
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![hello])
}
```

By annotating a function with `get` and then using the `routes` macro, the code is packaged into an instance of the `Route` struct (see [[docs for `rocket::Route`]](https://docs.rs/rocket/latest/rocket/struct.Route.html)), which can then be treated as data and loaded into the web server. In rocket, routes aren’t merely a design pattern; rocket reifies routes, providing an explicit `Route` struct that concretely and directly corresponds to the abstract design pattern of a route.

#### Incorrect Reification

So, when I’m trying to design a framework (web framework, actor framework, game engine, graphics engine, etc) quite naturally I’ll often intuitively gravitate toward an approach of:

1. Think of how things should be done.
2. Reify those concepts.

For example, when designing an actor framework:

1. Conclude that there should be “actors”, which process “messages”, and which can send each other messages via their “mailboxes.” (Futher concepts not described here.)
2. Create a trait for actors, and a trait for being able to process a message, and a struct for mailboxes with a particular message type. (Further API constructs not described here)

That example is real. I spent some time working on creating an actor framework called reflex ([[gitlab link]](https://gitlab.com/gretchenfrage/reflex)) from August 2019 to January 2020, at which point I basically abandoned it. It’s sitting there at 975 lines of code (lines of actual code counted with `cloc`), organized into a system of modules containing structs like `ActorState` and `ActorGuard` and `MsgQueue`, connected by all sorts of enums and macros and careful management of concurrency and mindful documentation of the necessary invariants to maintain the validity of such.

It was fun. It was impressive. It was complicated. It was stressful to add to. It was inelegant and verbose to use. And it began to feel, intuitively, like I was taking fundamentally the wrong approach.

A couple years later, one day in Nov 2021, the insights from that experience had distilled to the point where I sat down and typed up [“the simplest possible actor thing that could possible work” [playground link]](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=975d5a3a6ddd0e46196a96ec0b3bd65a) (see also: [[c2: _Do The Simplest Thing That Can Possibly Work_](http://wiki.c2.com/?DoTheSimplestThingThatCouldPossiblyWork)). In 44 lines of code, it achieved spinning up an actor, sending it messages, and having it process those messages.

Then, expanding on that prototype, I typed up [“nano actor framework” [playground link]](https://play.rust-lang.org/?version=stable&mode=debug&edition=2021&gist=b9ec2d8eb40a67de374481a4b9f7c08c). It efficiently provided the means to achieve all the necessary parts of the actor pattern: spinning up actors, sending messages to actors, having actors processing the messages, handling up-propagation of actor failure, and handling down-propagation of actor failure. It was simple and concise to use—much more-so than reflex. And it was 101 lines of code.

And here’s the thing. It didn’t have any sort of struct called “actor.”

It didn’t reify it.

It just let the pattern be a pattern.

It let the abstract concept be an abstract concept that existed in the user’s mind, with no directly corresponding API construct. It just provided the necessary API and functionality for the developer to efficiently and composably implement that pattern.

#### Why Ever Reify? (Some Reification is OK)

Now, I’m not actually saying that reification is always wrong. Rocket seems to be a pretty great and well-designed framework, and Java, although rightly so fading into the void of history and legacy systems, enables some pretty useful patterns through its reflection APIs. It’s contextual. There are times when reification is natural, and it’s useful and helpful, and other times where some reification does not naturally flow into the architecture, and it becomes maladaptive and encumbering.

For example, rocket having the `Route` struct works out pretty naturally. It’s difficult to concisely give a satisfying conceptual explanation of why, but if you look at the system and think about how it works and think about conceivable alternative ways it could work, the approach they chose works out pretty elegantly and alternative approaches would work out less elegantly.

#### Reification to Enable Middleware

One example of a place where reification may be natural would be in the case of dynamically loading in middleware. Consider a situation where:

- Throughout your program, some category of thing occurs. For example, in a web server, responding to an HTTP request. Or perhaps, in a game engine, having an entity be “damaged.”
- There’s some code that you want to run whenever that thing happens. For example, in a web server, keeping statistics on how many of each type of HTTP request occurs (see: [rocket documentation of how to do that exact thing](https://rocket.rs/v0.5-rc/guide/fairings/#example)). Or perhaps, in a game engine, nullifying n% of damage done to any entity if that damage is “fire type” damage and the entity is under some sort of “n% fire damage resistance effect.”
- The exact set and sites of those operations you want to occur aren’t necessarily known ahead of time, perhaps are loaded in dynamically, or the source of truth for the set of them lies in a different part of the code-base from where the original thing is performed.

In web frameworks, this sort of thing would generally be called “middleware.” And this is a case where some sort of reification of the operation you want to be able to instrument becomes useful and natural. In a general sense, when you want some sort of abstract structure in your program’s architecture, such as “handling HTTP requests” or “damaging game entities,” to be manipulated in a way wherein the details of how it’s manipulated aren’t the responsibility of the piece of code actually implementing that structure, then reifying that structure may be a good solution to that.

#### Smelling Incorrect Reification

So, let’s say you’re designing an actor framework, and your thought process goes:

1. How should things be done? Actors can receive and process messages.
2. Now to reify this. I’ll create some sort of `ProcessMsg<M>` trait that actors can implement for being able to process that message.
3. Now, when I want my actor type to be able to process a message type, I’ll just implement `ProcessMsg`.

Well, I think one decent sanity check for this sort of thought process is to ask yourself, “what advantage is conferred to the user by doing it this way? As opposed to whatever the ‘default’ way would be to achieve this thing without any sort of framework?”

In some cases you may find a perfectly valid reason. For example, when a rocket user constructs a `Route` struct for the HTTP route they want to add to their web server, they essentially get the free and easy incorporation of their handler into a broader system involving middleware and path matching and such.

However, in other cases, it might just seem like needless complexity. You might suspect that a user, in pursuit of efficiently implementing their program with little care for your vision, may simply find no actual benefit to going through the structure you’ve created, and implement the thing your own way. And that likely indicates you’ve chosen the wrong structure, that you've reified parts of the abstraction that should instead arise emergently.

When writing reflex, I created an abstraction roughly equivalent to the example outlined above, but it required a variety of complicated and clumsy trait tricks and macro invocations to get the data flowing through it properly, and I was realizing that I couldn’t really come up with a good answer to “why not just implement these as methods directly?” And, after spending enough time away from it, I realized there was a way to create an API that facilitated doing exactly that.

And as such, whereas reflex involved a significant amount of code that achieved very little reduction in code or complexity for the user, that nano actor framework prototype I typed up involved a tiny amount of code that facilitated implementing actor systems in a very simple and efficient way for the user.

Anyways, that's my two cents.
