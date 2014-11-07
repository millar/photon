class Admin::AlbumsController < ApplicationController
  before_filter :authenticate_user!

  def index
    @albums = Album.all
  end

  def show
    @album = Album.find(params[:id])
  end

  def create
    @album = current_user.albums.build(album_params)

    if @album.save
      render action: :show
    end
  end

  def update
    @album = Album.find(params[:id])

    if @album.update(album_params)
      render action: :show
    end
  end

  protected

  def album_params
    params.permit(:title, :description, :client, :published_at, :slug)
  end
end
