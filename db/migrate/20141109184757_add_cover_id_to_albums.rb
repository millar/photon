class AddCoverIdToAlbums < ActiveRecord::Migration
  def change
    add_column :albums, :cover_id, :integer
    add_index :albums, :cover_id
  end
end
