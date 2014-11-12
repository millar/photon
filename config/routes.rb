Rails.application.routes.draw do
  namespace :admin do
    get 'users/index'
  end

  scope '/api' do
    resources :albums, defaults: {format: :json}
    resources :photos, defaults: {format: :json} do
      collection do
        get 'colors', to: 'photos#colors'
      end
    end

    namespace :admin do
      resources :albums, defaults: {format: :json} do
        collection do
          get 'clients', to: 'albums#clients'
          put 'order', to: 'albums#order'
          put 'cover', to: 'albums#cover'
        end

        scope module: "albums" do
          resources :photos, defaults: {format: :json}
        end
      end

      resources :users, only: [:index], defaults: {format: :json}

      resources :photos, defaults: {format: :json} do
        collection do
          get 'unprocessed', to: 'photos#index', params: {unprocessed: true}
        end
      end
    end
  end

  scope '/admin' do
    devise_for :users, :skip => [:registrations]
    as :user do
      get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
      put 'users' => 'devise/registrations#update', :as => 'user_registration'
    end

    post 'upload(/:album_id)', to: 'upload#photos'

    get '(/*path)', to: 'site#admin'
    get '', to: 'site#admin', as: :user_root_path
  end

  get 'photo-img/(*path)', to: 'site#not_found'
  get '(*path)', to: 'site#client'

  # You can have the root of your site routed with "root"
  root 'site#user'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
