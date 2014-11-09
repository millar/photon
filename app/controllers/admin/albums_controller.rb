class Admin::AlbumsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @albums = Album.includes(:user, :photos, :album_photos).all

    @album_photos = {}

    @albums.each do |album|
      @album_photos[album.id] = Hash[album.album_photos.map {|album_photo| [album_photo.photo_id, album_photo]}]
    end
  end

  def show
    @album = Album.includes(:album_photos).find(params[:id])
    @album_photos = Hash[@album.album_photos.map {|album_photo| [album_photo.photo_id, album_photo]}]
  end

  def cover
    @photo = Photo.find_by(id: params[:photo_id])
    @album = Album.find(params[:album_id])
    @album.cover = @photo
    @album.save

    render action: :show
  end

  def order
    @album_photo = AlbumPhoto.includes(:album).find(params[:album_photo_id])
    original_pos = @album_photo.position
    new_pos = params[:position].to_i

    new_pos = 0 if new_pos < 0
    new_pos = @album_photo.album.photo_count if new_pos > @album_photo.album.photo_count

    if original_pos < new_pos
      AlbumPhoto.where("album_id = ? and position > ? and  position <= ?", @album_photo.album_id, original_pos, new_pos).update_all("position = position - 1")
    else
      AlbumPhoto.where("album_id = ? and position < ? and position >= ?", @album_photo.album_id, original_pos, new_pos).update_all("position = position + 1")
    end

    @album_photo.update(position: new_pos)

    head :no_content
  end

  def clients
    render json: Album.all.map(&:client).uniq.select {|c| !c.nil?}
  end

  def create
    @album = current_user.albums.build(album_params)

    if @album.save
      render action: :show
    else
      render status: 500, json: @album.errors.to_hash
    end
  end

  def update
    @album = Album.find(params[:id])

    if @album.update(album_params)
      head :no_content
    end
  end

  protected

  def album_params
    params.permit(:title, :description, :client, :published_at, :slug)
  end
end
