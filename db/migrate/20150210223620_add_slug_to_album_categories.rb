class AddSlugToAlbumCategories < ActiveRecord::Migration
  def change
    add_column :album_categories, :slug, :string
  end
end
