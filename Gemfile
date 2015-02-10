source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.0'
# Use sqlite3 as the database for Active Record in development
gem 'sqlite3', group: :development
# Use mysql in production
gem 'mysql2', group: :production
# Use LESS for stylesheets
gem 'less-rails'

# Use SASS for some stylesheets
gem 'sass-rails'

# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
gem 'therubyracer', platforms: :ruby

# Use jQuery as the JavaScript library
gem 'jquery-rails', '~> 4.0'

# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc

# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# User authentication
gem 'devise'
# User invitation
gem 'devise_invitable'

# Bootstrap LESS framework
gem 'less-rails-bootstrap'

gem 'angular-rails-templates'

gem 'mailgun_rails'

gem 'font-awesome-rails'

gem 'acts_as_singleton'

gem 'rmagick', '2.13.2', require: 'RMagick'
gem 'paperclip', '~> 4.2'
gem 'delayed_paperclip'
gem 'exifr'
gem 'resque', '~>1'

gem "paranoia", github: "radar/paranoia", branch: "rails4"

gem 'redcarpet'

gem 'browser'

# Use unicorn as the app server
gem 'unicorn', group: :production

# Use Capistrano for deployment
gem 'capistrano-rails', group: :development
gem 'capistrano-nginx-unicorn', group: :development
gem 'capistrano-rbenv', group: :development
gem 'capistrano-bundler', group: :development
gem "capistrano-resque", "~> 0.2.1", group: :development, require: false

group :development, :test do
  # Call 'debugger' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'

  gem 'rspec-rails'

  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0.0.beta4'

  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
end
