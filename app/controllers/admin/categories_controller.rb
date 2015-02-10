class Admin::CategoriesController < ApplicationController
  respond_to :json

  before_filter :authenticate_user!

  def index
    @categories = AlbumCategory.order(id: :desc)

    if params[:limit]
      @categories = @categories.limit(params[:limit])
    end

    if params[:name]
      @categories = @categories.where("name_lower LIKE ?", "%#{params[:name].downcase}%")
    end

    respond_with @categories
  end
end
