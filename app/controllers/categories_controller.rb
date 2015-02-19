class CategoriesController < ApplicationController
  def show
    @category = AlbumCategory.includes(:albums).where("visible = ? and albums_count > 0", true).find_by!(slug: params[:id])
  end
end
