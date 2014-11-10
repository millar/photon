class SiteController < ApplicationController
  before_action :authenticate_user!, only: :admin

  def client
    render layout: 'client', html: ""
  end

  def admin
    render layout: 'admin', html: ""
  end

  def not_found
    head :not_found
  end
end
