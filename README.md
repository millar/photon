Photon
======

Photon is an application for managing and publishing collections of photographs.

# Screenshots
[![Album View](http://millar.github.io/photon/screenshots/album_sm.png)](http://millar.github.io/photon/screenshots/album.png)

[![Album Photo View](http://millar.github.io/photon/screenshots/album-photo_sm.png)](http://millar.github.io/photon/screenshots/album-photo.png)

[![Albums View](http://millar.github.io/photon/screenshots/albums_sm.png)](http://millar.github.io/photon/screenshots/albums.png)

[![Photo View](http://millar.github.io/photon/screenshots/photo_sm.png)](http://millar.github.io/photon/screenshots/photo.png)

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
