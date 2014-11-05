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

  def edit
  end
end