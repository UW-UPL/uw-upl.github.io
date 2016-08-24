# Undergraduate Projects Lab Website

Found at [uw-upl.github.io](http://uw-upl.github.io) and
[upl.cs.wisc.edu](http://upl.cs.wisc.edu)

This website is powered by [jekyll](http://jekyllrb.com). Contributions and
issue reports are welcomed!

## Dependencies

This project uses the official [GitHub Pages gem](https://github.com/github/pages-gem).
This manages all of the project dependencies for you, as long as you have a working
version of Ruby and Bundler.

On a Unix-like OS, I recommend using [rbenv](https://github.com/rbenv/rbenv) to install
a new version of Ruby. Follow the instructions in that README and then enter the following:

```
$ gem install bundler
```

To install Jekyll and the other dependencies, navigate to the project directory
in a shell and type

```
$ bundle install
```

## Development

### Do all development work on the "develop" branch. To deploy changes to the live site, merge into master.

To run the development server, navigate to the project directory in a shell
and type

```
$ jekyll serve
```

This will launch a local server (by default on port 4000 -- see `_config.yml` if you intend
to change this!)

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
