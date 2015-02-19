class Config < ActiveRecord::Base
  self.table_name = 'config'

  acts_as_singleton

  validates :site_title, presence: true
  validates :blog_title, presence: true
end
