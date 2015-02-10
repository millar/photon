class AlbumCategory < ActiveRecord::Base
  has_many :albums

  before_create :set_position
  before_save :update_position
  after_destroy :decrement_higher_positions

  # validates :position, numericality: {integer: true}
  validates :name, uniqueness: { case_sensitive: false }

  before_save { |ac| ac.name_lower = name.downcase if ac.name_changed? }

  def set_position
    self.position = self.class.count
  end

  def update_position
    if !self.new_record? and self.position_changed?
      new_pos = self.position
      old_pos = self.position_was
      new_pos = 0 if new_pos < 0
      new_pos = self.class.count if new_pos > self.class.count


      if original_pos < new_pos
        self.class.where("position > ? and  position <= ?", original_pos, new_pos).update_all("position = position - 1")
      else
        self.class.where("position < ? and position >= ?", original_pos, new_pos).update_all("position = position + 1")
      end
    end
  end

  def decrement_higher_positions
    self.class.where("position > ?", self.position).update_all("position = position - 1")
  end
end
