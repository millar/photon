class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout :layout_mapper

  before_action :configure_permitted_parameters, if: :devise_controller?
  after_filter :set_csrf_cookie_for_ng
  before_filter :set_tracking_cookie

  # respond_to :json

  protected

  def after_accept_path_for(user)
    user_root_path
  end

  def after_invite_path_for(user)
    "/admin/users"
  end

  def after_sign_out_path_for(user)
    root_path
  end

  def set_tracking_cookie
    cookies.permanent[:user_uuid] = SecureRandom.uuid unless cookies[:user_uuid]
  end

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def layout_mapper
    if devise_controller?
      return "admin"
    end
    "client"
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password, :remember_me) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password) }
    devise_parameter_sanitizer.for(:accept_invitation).concat [:username, :email]
  end
end
