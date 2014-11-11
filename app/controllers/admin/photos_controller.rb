class Admin::PhotosController < ApplicationController
  before_filter :authenticate_user!

  def index
    @photos = Photo.includes(:user, :albums).all

    if params[:processed]
      @photos = @photos.where(processed: true)
    elsif params[:unprocessed]
      @photos = @photos.where(processed: false)
    end

    if params[:limit]
      @photos = @photos.limit(params[:limit])
    end

    if params[:order]
      @photos = @photos.order(params[:order])
    end

    if params[:offset]
      @photos = @photos.offset(params[:offset])
    end

    if params[:query]
      @photos = @photos.where("title LIKE ? or original_file_name LIKE ?", "%#{params[:query]}%", "%#{params[:query]}%")
    end

    if params[:not_in]
      @photos = @photos.where.not(id: Album.find(params[:not_in]).photos)
    end
  end

  def show
    @photo = Photo.find(params[:id])
  end

  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy

    head :no_content
  end

  def update
    @photo = Photo.find(params[:id])
    @photo.processed = true

    if @photo.update(photo_params)
      render action: :show
    end
  end

  protected

  def photo_params
    params.permit(:title, :description, :slug)
  end
end
