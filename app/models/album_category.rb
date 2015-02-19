require "i18n"

class AlbumCategory < ActiveRecord::Base
  has_many :albums

  before_create :set_position
  before_save :update_position
  after_destroy :decrement_higher_positions

  # validates :position, numericality: {integer: true}
  validates :name, uniqueness: { case_sensitive: false }
  validates :slug, uniqueness: { case_sensitive: false }

  before_save { |ac|
    ac.name_lower = name.downcase if ac.name_changed?

    if ac.slug_changed?
      ac.slug_set = true
    end

    if ac.name_changed? and !ac.slug_set?
      set_default_slug
    end
  }

  def set_default_slug(n=1)
    new_slug = ac.name.downcase
    new_slug = I18n.transliterate(new_slug)
    new_slug.sub!(' ', '-')
    new_slug.sub!('--', '-')

    if n > 1
      new_slug += n
    end

    ac.slug = new_slug

    unless ac.valid?
      set_default_slug(n+1)
    end
  end

  def to_param
    self.slug
  end

  def set_position
    self.position = self.class.count
  end

  def update_position
    if !self.new_record? and self.position_changed?
      new_pos = self.position
      old_pos = self.position_was
      new_pos = 0 if new_pos < 0
      new_pos = self.class.count if new_pos > self.class.count


      if old_pos < new_pos
        self.class.where("position > ? and  position <= ?", old_pos, new_pos).update_all("position = position - 1")
      else
        self.class.where("position < ? and position >= ?", old_pos, new_pos).update_all("position = position + 1")
      end
    end
  end

  def decrement_higher_positions
    self.class.where("position > ?", self.position).update_all("position = position - 1")
  end
end
