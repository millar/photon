class AddTopColorsToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :top_colors, :string
  end
end
