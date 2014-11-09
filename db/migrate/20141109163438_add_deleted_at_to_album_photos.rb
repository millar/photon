class AddDeletedAtToAlbumPhotos < ActiveRecord::Migration
  def change
    add_column :album_photos, :deleted_at, :datetime
    add_index :album_photos, :deleted_at
  end
end
