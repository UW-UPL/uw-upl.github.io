FROM jekyll/jekyll:pages

COPY Gemfile /srv/jekyll/

WORKDIR /srv/jekyll

RUN apk update && apk add \
  # development packages
  ruby-dev \
  gcc \
  make \
  curl \
  build-base \
  libc-dev \
  libffi-dev \
  zlib-dev \
  libxml2-dev \
  libgcrypt-dev \
  libxslt-dev \
  python \
  # pushing to git via ssh
  openssh \
  # permissions to install packages
  sudo \  
  # tab completion inside the container
  git-bash-completion

RUN bundle install && bundle update

# Set up user so that we can share ssh credentials.
ENV USERNAME=jekyll
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME\
  && chmod 0440 /etc/sudoers.d/$USERNAME

# Set up git completion.
RUN echo "source /usr/share/bash-completion/completions/git" >> /home/$USERNAME/.bashrc

EXPOSE 4000