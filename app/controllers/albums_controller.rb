class AlbumsController < ApplicationController
  def index
    @albums = Album.includes(:cover, :photos).where("published_at IS NOT NULL and published_at < ?", Time.now)
  end

  def show
    @album = Album.includes(:cover, :photos, :album_photos).where("published_at IS NOT NULL and published_at < ?", Time.now).find_by!(slug: params[:id])
    @album_photos = Hash[@album.album_photos.map {|album_photo| [album_photo.photo_id, album_photo]}]
  end
end
