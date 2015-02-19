class Admin::CategoriesController < ApplicationController
  respond_to :json

  before_filter :authenticate_user!

  def index
    AlbumCategory.destroy_all("albums_count <= 0")

    @categories = AlbumCategory.order(:position).where("albums_count > 0")

    if params[:limit]
      @categories = @categories.limit(params[:limit])
    end

    if params[:name]
      @categories = @categories.where("name_lower LIKE ?", "%#{params[:name].downcase}%")
    end

    respond_with @categories
  end

  def update
    @category = AlbumCategory.find(params[:id])

    if @category.update(category_params)
      respond_with @category
    else
      render status: 500, json: @category.errors.to_hash
    end
  end

  private

  def category_params
    params.permit(:name, :visible, :position, :slug)
  end
end
