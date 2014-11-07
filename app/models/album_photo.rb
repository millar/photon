class AlbumPhoto < ActiveRecord::Base
  belongs_to :album, counter_cache: :photo_count
  belongs_to :photo, counter_cache: :album_count
end
