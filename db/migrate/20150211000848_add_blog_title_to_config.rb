class AddBlogTitleToConfig < ActiveRecord::Migration
  def change
    add_column :config, :blog_title, :string, default: 'Blog'
  end
end
