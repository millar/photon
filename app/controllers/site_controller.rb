class SiteController < ApplicationController
  def user
    render :layout => 'user'
  end

  def admin
    render :layout => 'admin'
  end
end
