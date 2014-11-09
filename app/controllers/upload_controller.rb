class UploadController < ApplicationController
  before_filter :authenticate_user!

  def photos
    @photo = current_user.photos.create(photo_params)

    if params[:album_id]
      @album = Album.find(params[:album_id])
      @album.photos << @photo

      @album_photo = AlbumPhoto.find_by!(album_id: params[:album_id], photo_id: @photo.id)

      @position = @album.photos.count - 1

      @album_photo.update(position: @position)
    end

    render json: @photo
  end

  private

    def photo_params
      params.require(:photo).permit(:original)
    end
end
