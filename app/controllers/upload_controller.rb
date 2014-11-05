class UploadController < ApplicationController
  before_filter :authenticate_user!

  def photos
    @photo = current_user.photos.create(photo_params)

    render json: @photo
  end

  private

    def photo_params
      params.require(:photo).permit(:original)
    end
end
