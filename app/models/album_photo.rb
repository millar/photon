class AlbumPhoto < ActiveRecord::Base
  belongs_to :album, counter_cache: :photo_count
  belongs_to :photo, counter_cache: :album_count

  acts_as_paranoid

  before_create :set_position
  before_restore :set_position
  after_destroy :increment_higher_positions

  def set_position
    self.position = self.album.photos.count
    unless self.new_record?
      Album.increment_counter(:photo_count, self.album_id)
      self.save
    end
  end

  def increment_higher_positions
    AlbumPhoto.where("album_id = ? and position > ?", self.album_id, self.position).update_all("position = position - 1")

    # Fix counter deletion bugs
    Album.reset_counters(self.album_id, :photos)
    Photo.reset_counters(self.photo_id, :albums)
  end
end
