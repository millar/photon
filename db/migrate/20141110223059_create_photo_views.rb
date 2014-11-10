class CreatePhotoViews < ActiveRecord::Migration
  def change
    create_table :photo_views do |t|
      t.references :photo, null: false
      t.references :album

      t.string :context
      t.text :context_data

      t.string :ip_address
      t.string :user_agent
      t.string :referrer

      t.string :browser_name
      t.string :browser_version

      t.boolean :mobile
      t.boolean :tablet

      t.string :platform

      t.boolean :bot
      t.boolean :search_engine

      t.string :tracking_id

      t.datetime :created_at, null: false
    end

    add_column :photos, :views_count, :integer, default: 0
  end
end
