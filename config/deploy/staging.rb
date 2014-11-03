set :stage, :staging

role :app, %w{app@staging.millar.io}
role :web, %w{app@staging.millar.io}
role :db,  %w{app@staging.millar.io}

set :nginx_server_name, "photon.staging.millar.io"

set :full_app_name, "#{fetch(:application)}_#{fetch(:stage)}"
set :deploy_to, "/var/www/#{fetch(:full_app_name)}"

set :rails_env, :production

set :unicorn_user, :app

set :ssh_options, {
  port: 50462
}
