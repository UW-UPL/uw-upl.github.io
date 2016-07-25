# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "debian/jessie64"

  config.vm.network "forwarded_port", guest: 8000, host: 8000

  config.vm.provider "virtualbox" do |p|
    p.name = "uw-upl.github.io"
  end

  config.vm.provision :shell, path: "provision.sh"

  config.ssh.username = "vagrant"
  config.ssh.password = "vagrant"
end
