#!/bin/bash

sudo apt-get update
sudo apt-get install -y ruby ruby-dev build-essential libxml2-dev zlib1g-dev liblzma-dev nodejs git
sudo gem install bundler
cd /vagrant
bundle install
