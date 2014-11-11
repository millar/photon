class AlbumsController < ApplicationController
  def index
    @albums = Album.includes(:cover, :photos).where("published_at IS NOT NULL and published_at < ?", Time.now)
  end

  def show
    @album = Album.includes(:cover, :photos).where("published_at IS NOT NULL and published_at < ?", Time.now).find(params[:id])
  end
end
