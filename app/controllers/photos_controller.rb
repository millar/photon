class PhotosController < ApplicationController
  def index
    @photos = Photo.joins(:albums).merge!(Album.where("albums.published_at IS NOT NULL and albums.published_at < ?", Time.now))
  end

  def show
    @photo = Photo.includes(:albums).joins(:albums).merge!(Album.where("albums.published_at IS NOT NULL and albums.published_at < ?", Time.now)).find(params[:id])
  end
end
