class Album < ActiveRecord::Base
  belongs_to :user
  belongs_to :album_category, counter_cache: true

  acts_as_paranoid

  has_many :album_photos
  has_many :photos, through: :album_photos

  belongs_to :cover, class_name: "Photo"

  validates :title, presence: true
  validates :slug, presence: true, uniqueness: {
    case_sensitive: false
  }, exclusion: { in: %w(admin photo photos album albums colors api) }

  def published
    !!(self.published_at and self.published_at < Time.now)
  end

  def full_description
    return unless self.description
    renderer = Redcarpet::Render::HTML.new()
    markdown = Redcarpet::Markdown.new(renderer, extensions = {})
    markdown.render(self.description)
  end

  def short_description
    return unless self.description
    renderer = Redcarpet::Render::HTML.new(no_links: true, no_images: true, filter_html: true)
    markdown = Redcarpet::Markdown.new(renderer, extensions = {})
    markdown.render(self.description)
  end

  def category=(new_category)
    if new_category.blank?
      self.album_category = nil
    else
      ac = AlbumCategory.find_or_create_by(name_lower: new_category.downcase)
      self.album_category = ac if ac != self.album_category

      if self.album_category.name != new_category
        self.album_category.name = new_category
        self.album_category.save
      end
    end

    self.save
  end
end
