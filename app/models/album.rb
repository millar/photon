class Album < ActiveRecord::Base
  belongs_to :user

  has_many :album_photos
  has_many :photos, through: :album_photos

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: {
    case_sensitive: false
  }

  def published
    !!(self.published_at and self.published_at < Time.now)
  end

  def full_description
    renderer = Redcarpet::Render::HTML.new()
    markdown = Redcarpet::Markdown.new(renderer, extensions = {})
    markdown.render(self.description)
  end

  def short_description
    renderer = Redcarpet::Render::HTML.new(no_links: true, no_images: true, filter_html: true)
    markdown = Redcarpet::Markdown.new(renderer, extensions = {})
    markdown.render(self.description)
  end
end
