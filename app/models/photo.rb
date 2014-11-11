class Photo < ActiveRecord::Base
  has_attached_file :original,
    styles: {
      large_2048: "2048x2048>",
      large_1600: "1600x1600>",
      large_1024: "1024x1024>",
      medium_800: "800x800",
      medium_640: "640x640",
      medium_500: "500x500",
      small_320: "320x320",
      small_240: "240x240",
      thumb: "100x100",
      sq_600: "600x600#",
      sq_600: "600x600#",
      sq_300: "300x300#",
      sq_150: "150x150#",
      sq_75: "75x75#",
    },
    :preserve_files => "true",
    :convert_options => {
      :medium_800 => "-quality 75 -strip",
      :small_320 => "-quality 75 -strip",
      :sq_600 => "-quality 75 -strip",
      :sq_300 => "-quality 75 -strip",
      :sq_150 => "-quality 75 -strip",
      :sq_75 => "-quality 75 -strip"
    },
    :url => "/photo-img/:id/:style/:hash.:extension",
    :hash_secret => "photon-scr"
  validates_attachment_content_type :original, :content_type => /\Aimage\/.*\Z/
  validates :original, :attachment_presence => true

  acts_as_paranoid

  process_in_background :original

  belongs_to :user

  has_many :album_photos, dependent: :destroy
  has_many :albums, through: :album_photos

  before_create :save_geometry

  after_save :process

  def process
    return if self.processed
    self.save_averages
    self.save_exif
    self.save_top_colors
    self.update_attribute(:processed, true)
  end

  def save_geometry
    if self.width == nil
      geo = Paperclip::Geometry.from_file(original.queued_for_write[:original])
      self.width = geo.width
      self.height = geo.height
    end
  end

  def save_exif
    if ["image/jpeg", "image/tiff"].include? original_content_type

      if original.content_type == "image/jpeg"
        original_exifr = EXIFR::JPEG.new(original.path)
      else
        original_exifr = EXIFR::TIFF.new(original.path)
      end

      return unless original_exifr.exif?

      self.update_columns(
        exif: true,
        original_width: original_exifr.width,
        original_height: original_exifr.height,
        model: original_exifr.model,
        taken_at: original_exifr.date_time,
        exposure_time: original_exifr.exposure_time.to_s,
        f_number: original_exifr.f_number.to_f
      )

      if original_exifr.gps
        self.update_columns(
          lat: original_exifr.latitude,
          long: original_exifr.longitude
        )
      end
    end
  end

  def save_averages
    img =  Magick::Image.read(original.path).first
    pix = img.scale(1, 1)
    nw = img.crop(Magick::NorthWestGravity, self.width * 0.7, self.height * 0.7).scale(1, 1)
    se = img.crop(Magick::SouthEastGravity, self.width * 0.7, self.height * 0.7).scale(1, 1)

    columns = {}

    columns['average_hex'] = pix.to_color(pix.pixel_color(0,0))
    columns['average_nw_hex'] = nw.to_color(nw.pixel_color(0,0))
    columns['average_se_hex'] = se.to_color(se.pixel_color(0,0))


    self.update_columns(columns)
  end

  def save_top_colors
    # Photo.all.each {|photo| photo.save_top_colors}
    image = Magick::Image.read(original.path).first
    colors = []
    q = image.quantize(9, Magick::RGBColorspace)
    palette = q.color_histogram.sort {|a, b| b[1] <=> a[1]}

    palette.length.times.each do |i|
        c = palette[i][0].to_s.split(',').map {|x| x[/\d+/]}
        c.pop
        c[0], c[1], c[2] = [c[0], c[1], c[2]].map { |s|
            s = s.to_i
            if s / 255 > 0 # not all ImageMagicks are created equal....
                s = s / 255
            end
            s = s.to_s(16)
            if s.size == 1
                '0' + s
            else
                s
            end
        }
        colors << '#' + c.join('')
    end

    self.update_column(:top_colors, colors.join(','))
  end

  def top_colors
    self.read_attribute(:top_colors).split(',')
  end

  def full_description
    return unless self.description
    renderer = Redcarpet::Render::HTML.new()
    markdown = Redcarpet::Markdown.new(renderer, extensions = {})
    markdown.render(self.description)
  end

  def published
    self.albums
    !self.albums.where("albums.published_at IS NOT NULL and albums.published_at < ?", Time.now).empty?
  end
end
