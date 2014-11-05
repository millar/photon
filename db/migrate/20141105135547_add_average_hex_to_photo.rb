class AddAverageHexToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :average_hex, :string
  end
end
