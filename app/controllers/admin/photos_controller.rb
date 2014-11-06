class Admin::PhotosController < ApplicationController
  before_filter :authenticate_user!

  def index
    @photos = Photo.all

    if params[:processed]
      @photos = @photos.where(processed: true)
    elsif params[:unprocessed]
      @photos = @photos.where(processed: false)
    end
  end

  def show
    @photo = Photo.find(params[:id])
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
