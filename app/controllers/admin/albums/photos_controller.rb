class Admin::Albums::PhotosController < ApplicationController
  before_filter :authenticate_user!

  def show
    @album_photo = AlbumPhoto.find_by!(album_id: params[:album_id], photo_id: params[:id])
  end

  def create
    @photo = Photo.find(params[:photo_id])
    @album = Album.find(params[:album_id])

    @album.photos << @photo unless @album.photos.include? @photo

    @album_photo = AlbumPhoto.find_by!(album_id: params[:album_id], photo_id: params[:photo_id])

    render action: :show
  end

  def destroy
    @photo = Photo.find(params[:id])
    @album = Album.find(params[:album_id])

    @album_photo = AlbumPhoto.find_by!(album_id: params[:album_id], photo_id: params[:id])
    @album_photo.really_destroy! if @album.photos.include? @photo

    head :no_content
  end
end
