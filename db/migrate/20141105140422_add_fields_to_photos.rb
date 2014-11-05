class AddFieldsToPhotos < ActiveRecord::Migration
  def change
    add_column :photos, :slug, :string
    add_column :photos, :processed, :boolean, default: false

    add_column :photos, :average_nw_hex, :string
    add_column :photos, :average_se_hex, :string
  end
end
