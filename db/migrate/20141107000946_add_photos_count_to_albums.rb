class AddPhotosCountToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :photo_count, :integer, default: 0
    add_column :photos, :album_count, :integer, default: 0
  end
end
