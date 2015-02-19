class Admin::ConfigController < ApplicationController
  before_filter :authenticate_user!

  respond_to :json

  def index
    respond_with Config.instance
  end

  def update
    if Config.instance.update(params.permit(:site_title))
      respond_with Config.instance
    end
  end
end
