class Post < ActiveRecord::Base
  belongs_to :user

  validates :title, presence: true
  validates :raw_content, presence: true
  validates :slug, presence: true, uniqueness: {
    case_sensitive: false
  }

  def published?
    published_at and published_at < Time.now
  end
end
