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

    @position = @album.photos.count - 1

    @album_photo.update(position: @position)

    render action: :show
  end

  def destroy
    @photo = Photo.find(params[:id])
    @album = Album.find(params[:album_id])

    @album_photo = AlbumPhoto.find_by!(album_id: params[:album_id], photo_id: params[:id])
    position = @album_photo.position

    @album.photos.delete(@photo) if @album.photos.include? @photo

    AlbumPhoto.where("album_id = ? and position > ?", @album.id, position).update_all("position = position - 1")

    # Fix counter deletion bugs
    Album.reset_counters(@album.id, :photos)
    Photo.reset_counters(@photo.id, :albums)

    head :no_content
  end
end
