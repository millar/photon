set :stage, :production

role :app, %w{app@pyramid.millar.io}
role :web, %w{app@pyramid.millar.io}
role :db,  %w{app@pyramid.millar.io}

set :nginx_server_name, "photon.pyramid.millar.io"

set :full_app_name, "#{fetch(:application)}_#{fetch(:stage)}"
set :deploy_to, "/var/www/#{fetch(:full_app_name)}"

set :rails_env, :production

set :unicorn_user, :app
