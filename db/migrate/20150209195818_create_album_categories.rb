class CreateAlbumCategories < ActiveRecord::Migration
  def change
    create_table :album_categories do |t|
      t.string :name
      t.boolean :visible, default: false
      t.integer :albums_count, default: 0
      t.integer :position
    end

    add_column :albums, :album_category_id, :integer

    add_index :albums, :album_category_id
    add_index :album_categories, :position
  end
end
