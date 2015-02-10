class AddNameLowerToAlbumCategories < ActiveRecord::Migration
  def change
    add_column :album_categories, :name_lower, :string
  end
end
