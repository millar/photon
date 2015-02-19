Photon
======

Photon is an application for managing and publishing collections photographs.

# Setup

## Installation

```sh
$ bundle install
$ bower install
```

## Running Application

The Resque worker must be running to properly handle photo uploads (requires redis to be installed).
```sh
$ rake resque:work QUEUE='*'
```
