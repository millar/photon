class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :invitable, :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :photos
  has_many :albums

  validates :username,
    uniqueness: {
      case_sensitive: false
    },
    format: { with: /\A[a-z0-9\-_]+([a-z0-9\-_ ]*[a-z0-9\-_]+)?\z/i },
    length: { in: 3..30 },
    presence: true

  def login=(login)
    @login = login
  end

  def login
    @login || self.username || self.email
  end

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["username = :value OR email = :value", { :value => login }]).first
    else
      where(conditions).first
    end
  end
end
