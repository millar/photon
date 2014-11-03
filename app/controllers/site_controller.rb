class SiteController < ApplicationController
  before_action :authenticate_user!, only: :admin

  def user
    render :layout => 'user'
  end

  def admin
    render :layout => 'admin'
  end
end
