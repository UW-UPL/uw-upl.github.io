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

To run the development server, navigate to the project directory in a shell
and type

```
$ jekyll serve --config _config.yml,_config.dev.yml
```

This will launch a local server on port 4000 -- see `_config.dev.yml` if you intend
to change this for yourself.

### Setting up a dev environment on windows

While there are ways to get jekyll working natively on windows, it's not the most reliable system in the world. This section should detail the reproducable steps necessary to get it working. These steps will rely on the windows 10 llinux subshell and native bash. For information on how to enable the linux subsystem and install bash, go [here](http://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/)

(It's assumed that you've already cloned the repo to somewhere)

1. Install ruby
  - `sudo apt-add-repository ppa:brightbox/ruby-ng`
  - `sudo apt update`
  - `sudo apt install ruby2.3 ruby2.3-dev ruby-switch`
  - `ruby-switch --set ruby2.3`
2. Install main gems
  - `gem install jekyll -v 3.1.6`
  - `sudo apt-get install libxml2`
    - This might not be necessary but I didn't want to uninstall this package to see if the installation succeeded without it.
  - `sudo apt-get install zlib1g-dev`
  - `gem install github-pages`
    - When it says "This could take a while..." it means it.
3. Install proper gem version 
  - I don't know anyway of getting around running these commands but it made mine work. Try running the last command here first and seeing if that fixes the issue.
  - `sudo gem install colorator -v 0.1`
  - `sudo gem install jekyll-mentions -v 1.1.3`
  - `sudo gem install terminal-table -v 1.6.0`
  - `sudo gem install github-pages -v 91`
4. Install node 6
  - `curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -`
  - `sudo apt-get install -y nodejs`
5. Add alias to bashrc to build and serve jekyll site
  - in `/home/$user/.bashrc` add `alias uwjekyll='bundle exec jekyll build; bundle exec jekyll serve --config _config.yml, _config.dev.yml --no-watch'`
  - You'll use this alias to build and serve the site. Until some things that jekyll uses have compatibility issues resolved this is necessary.

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
