# Undergraduate Projects Lab Website

Found at [uw-upl.github.io](http://uw-upl.github.io) and
[upl.cs.wisc.edu](http://upl.cs.wisc.edu)

This website is powered by [jekyll](http://jekyllrb.com). Contributions and
issue reports are welcomed!

## Dependencies

<!-- This should be fleshed out more -->

- Ruby
- Bundler

To install Jekyll and the other dependencies, navigate to the project directory
in a shell and type

```
$ bundle install
```

## Development

To run the development server, navigate to the project directory in a shell
and type

```
$ jekyll serve -H 0.0.0.0 -P 8000
```

### Vagrant

If you prefer, you can use [Vagrant](http://vagrantup.com) to create a virtual
development environment with all the dependencies. You can initialize a virtual
machine using our provided Vagrantfile by navigating to the project directory
in a shell and typing

```
$ vagrant up
```

You can then `ssh` into this machine to launch a server.

You should refer to the Vagrant docs if you have any questions. If things don't work
as expected, you are not alone.

**NOTE**: You will need to have rsync watch for changes in the project directory
for this to work. Open up another shell and type

```
$ vagrant rsync-auto
```

## How to do common things

### Data changes

By far, the most common kind of change is one you make to the site's data. This
includes:

- Changing your office hours
- Adding a project or an event
- Adding or changing an image
- Changing your favorite emoji (coords only!)

All of these can be done by modifying the respective files in `_data/`, with
one exception: images are located in `images/`. Both of these locations follow
standard Jekyll practices.

### Changing page layout

Each page has a corresponding `.html` or `.md` file in the top-level project directory.
If you want to change the templates used to make these pages, start here.

### Adding client-side scripting

For the most part, the site's content is fully static -- that is, never changing after
the site has been generated. However, some things cannot be generated like this --
for example, the lab status page needs to make an AJAX call to a remote service. The
principle we follow now is to make the template define an incomplete version of the
page statically and to embellish it with a script. `lab.html` is an example of this.
