class AddSlugSetToAlbumCategories < ActiveRecord::Migration
  def change
    add_column :album_categories, :slug_set, :boolean, default: false
  end
end
